"use client";

import { AlertCircle, RefreshCcw, Sparkles } from "lucide-react";
import { memo, useMemo } from "react";

import { FeedCard } from "@/components/feed-card";
import { SectionIntro } from "@/components/section-intro";
import { Button } from "@/components/ui/button";
import type { Post } from "@/lib/api";

export type FeedSectionProps = {
  posts: Post[];
  loading: boolean;
  error: string;
  onRetry: () => void;
};

export const FeedSection = memo(function FeedSection({
  posts,
  loading,
  error,
  onRetry,
}: FeedSectionProps) {
  const visiblePosts = useMemo(
    () => posts.filter((post) => Boolean(post.media_url && post.media_type)),
    [posts]
  );

  return (
    <section id="feed" className="relative z-10 py-16 sm:py-20 lg:py-24">
      <SectionIntro eyebrow="Flux en direct" title="Capsules studio immersives, pensées pour défiler.">
        Campagnes, films runway et détails de production se déploient dans
        une grille mode fluide, visuelle et pensée pour l’exploration.
      </SectionIntro>

      <div className="mx-auto max-w-[92rem] px-3 sm:px-5 lg:px-8 xl:px-10">
        {loading ? <FeedSkeleton /> : null}

        {!loading && error ? <FeedError message={error} onRetry={onRetry} /> : null}

        {!loading && !error && visiblePosts.length === 0 ? <FeedEmpty /> : null}

        {!loading && !error && visiblePosts.length > 0 ? (
          <div className="columns-2 gap-3 sm:columns-2 sm:gap-4 lg:columns-3 xl:columns-4 2xl:columns-5">
            {visiblePosts.map((post, index) => (
              <FeedCard
                key={post.id}
                index={index}
                postId={post.id}
                modelName={post.model_name || post.title || "Mannequin JMV"}
                mediaUrl={post.media_url || ""}
                mediaType={post.media_type === "video" ? "video" : "image"}
                title={post.title}
                description={post.description || undefined}
                category={post.category || "Éditorial"}
                location={post.photographer || post.stylist || "Studio JMV"}
                photographer={post.photographer || undefined}
                stylist={post.stylist || undefined}
                tags={normalizeTags(post.tags)}
                likesCount={post.likes_count ?? post.likes ?? 0}
                commentsCount={post.comments_count ?? 0}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
});

function FeedSkeleton() {
  return (
    <div className="columns-2 gap-3 sm:gap-4 lg:columns-3 xl:columns-4 2xl:columns-5" aria-label="Chargement des publications">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="mb-3 break-inside-avoid animate-pulse overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.055] sm:mb-4"
        >
          <div className={index % 3 === 0 ? "h-64 bg-white/[0.075] sm:h-80" : "h-52 bg-white/[0.075] sm:h-72"} />
          <div className="space-y-3 p-4">
            <div className="h-3 w-24 bg-white/12" />
            <div className="h-4 w-40 bg-white/12" />
          </div>
        </div>
      ))}
    </div>
  );
}

function FeedError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="mx-auto grid max-w-2xl gap-5 border border-red-300/20 bg-red-500/10 p-6 text-center backdrop-blur-xl">
      <AlertCircle className="mx-auto size-8 text-red-200" />
      <div>
        <h3 className="text-2xl font-semibold">Signal du flux interrompu</h3>
        <p className="mt-2 text-sm leading-6 text-white/58">{message}</p>
      </div>
      <Button
        type="button"
        onClick={onRetry}
        className="mx-auto h-11 rounded-full bg-white px-5 text-black hover:bg-[#d9b166]"
      >
        Relancer le flux
        <RefreshCcw className="size-4" />
      </Button>
    </div>
  );
}

function FeedEmpty() {
  return (
    <div className="mx-auto grid max-w-2xl gap-4 border border-white/12 bg-white/[0.055] p-7 text-center backdrop-blur-xl">
      <Sparkles className="mx-auto size-8 text-[#d9b166]" />
      <h3 className="text-2xl font-semibold">Aucune publication en direct pour l’instant</h3>
      <p className="text-sm leading-6 text-white/55">
        Publiez le premier contenu et il apparaîtra ici automatiquement.
      </p>
    </div>
  );
}

function normalizeTags(tags: Post["tags"]): string[] {
  if (Array.isArray(tags)) {
    return tags.filter(Boolean);
  }

  if (typeof tags === "string") {
    try {
      const parsed = JSON.parse(tags) as unknown;
      return Array.isArray(parsed) ? parsed.filter((tag): tag is string => typeof tag === "string") : [];
    } catch {
      return tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
    }
  }

  return [];
}
