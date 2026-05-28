"use client";

import { useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { forwardRef } from "react";

import { FeedSection } from "@/components/feed-section";
import type { Post } from "@/lib/api";
import { fetchPostsPage } from "@/lib/api";

const ITEMS_PER_PAGE = 12;

export type FeedContainerHandle = {
  refetch: () => Promise<void>;
};

export const FeedContainer = forwardRef<FeedContainerHandle>(function FeedContainer(_, ref) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const loadPosts = useCallback(async (pageNum: number = 1, append: boolean = false) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      if (!append) {
        setLoading(true);
      } else {
        setIsLoadingMore(true);
      }
      setError("");

      const response = await fetchPostsPage({
        page: pageNum,
        per_page: ITEMS_PER_PAGE,
        signal: controller.signal,
      });
      const newPosts = response.data;
      const totalPages = response.pagination?.total_pages;

      setPosts((prev) => (append ? mergePosts(prev, newPosts) : newPosts));
      setHasMore(typeof totalPages === "number" ? pageNum < totalPages : newPosts.length === ITEMS_PER_PAGE);
      setPage(pageNum);
    } catch (err) {
      if (controller.signal.aborted) return;

      const message =
        err && typeof err === "object" && "message" in err
          ? String((err as { message?: string }).message)
          : "Impossible de charger les publications. Vérifiez votre connexion.";
      setError(message);
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
        setIsLoadingMore(false);
      }
    }
  }, []);

  useImperativeHandle(ref, () => ({
    refetch: async () => {
      setPosts([]);
      setPage(1);
      setHasMore(true);
      await loadPosts(1);
    },
  }), [loadPosts]);

  useEffect(() => {
    loadPosts(1);

    return () => {
      abortRef.current?.abort();
    };
  }, [loadPosts]);

  useEffect(() => {
    if (!observerTarget.current || !hasMore || isLoadingMore || loading) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore && !loading) {
          loadPosts(page + 1, true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(observerTarget.current);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, isLoadingMore, loading, page, loadPosts]);

  const handleRetry = useCallback(() => {
    setPosts([]);
    setPage(1);
    setHasMore(true);
    loadPosts(1);
  }, [loadPosts]);

  return (
    <>
      <FeedSection posts={posts} loading={loading} error={error} onRetry={handleRetry} />

      {/* Déclencheur du scroll infini */}
      {hasMore && posts.length > 0 && (
        <div
          ref={observerTarget}
          className="py-12"
          aria-label="Charger plus de publications"
          role="status"
          aria-live="polite"
        >
          {isLoadingMore && (
            <div className="mx-auto max-w-7xl text-center text-white/50">
              <p className="text-sm">Chargement de nouvelles silhouettes...</p>
            </div>
          )}
        </div>
      )}
    </>
  );
});

function mergePosts(currentPosts: Post[], incomingPosts: Post[]): Post[] {
  const seen = new Set(currentPosts.map((post) => post.id));
  return [...currentPosts, ...incomingPosts.filter((post) => !seen.has(post.id))];
}
