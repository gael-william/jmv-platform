"use client";

/* eslint-disable @next/next/no-img-element */

import { motion } from "framer-motion";
import { ArrowUpRight, Eye, Heart, MessageCircle, Play, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

import { MediaViewer } from "@/components/media-viewer";
import { likePost } from "@/lib/api";
import type { ApiError } from "@/lib/api";
import { cn } from "@/lib/utils";

export type FeedCardProps = {
  postId: number;
  modelName: string;
  mediaUrl: string;
  mediaType?: "image" | "video";
  title?: string;
  description?: string;
  category?: string;
  location?: string;
  photographer?: string;
  stylist?: string;
  tags?: string[];
  likesCount?: number;
  commentsCount?: number;
  className?: string;
  index?: number;
};

const aspectPool = ["aspect-[4/5]", "aspect-[3/4]", "aspect-[5/7]", "aspect-[1/1]", "aspect-[4/6]"];

export function FeedCard({
  postId,
  modelName,
  mediaUrl,
  mediaType = "image",
  title = "Éditorial chrome de minuit",
  description,
  category = "Vision runway",
  location = "Paris",
  photographer,
  tags = [],
  likesCount = 0,
  commentsCount = 0,
  className,
  index = 0,
}: FeedCardProps) {
  const isVideo = mediaType === "video";
  const [currentLikes, setCurrentLikes] = useState<number>(likesCount);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const aspectClass = aspectPool[index % aspectPool.length];
  const formattedLikes = useMemo(() => formatCount(currentLikes), [currentLikes]);
  const formattedComments = useMemo(() => formatCount(commentsCount), [commentsCount]);

  async function handleLikeClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (isLiking || hasLiked) return;

    setIsLiking(true);
    setHasLiked(true);
    const previousLikes = currentLikes;
    setCurrentLikes((value) => value + 1);

    try {
      const response = await likePost(postId);
      if (typeof response.likes_count === "number") {
        setCurrentLikes(response.likes_count);
      }
    } catch (error) {
      const apiError = error as ApiError;
      if (apiError?.status === 400) {
        // Post was already liked (e.g. after page refresh) — mark liked, don't double-count
        setHasLiked(true);
        setCurrentLikes(previousLikes);
      } else {
        setCurrentLikes(previousLikes);
        setHasLiked(false);
        console.error("Échec de mise à jour du like:", error);
      }
    } finally {
      setIsLiking(false);
    }
  }

  return (
    <MediaViewer
      postId={postId}
      mediaUrl={mediaUrl}
      mediaType={mediaType}
      modelName={modelName}
      title={title}
      description={description}
      category={category}
      photographer={photographer || "Studio JMV"}
      location={location}
      likes={currentLikes}
      comments={commentsCount}
      trigger={
        <motion.article
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.62, delay: Math.min(index * 0.025, 0.2), ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -6 }}
          className={cn(
            "group relative mb-4 break-inside-avoid overflow-hidden rounded-[8px] border border-white/12 bg-white/[0.055] text-white shadow-[0_24px_90px_rgba(0,0,0,0.34)] backdrop-blur-2xl sm:mb-5",
            "touch-manipulation transition-colors hover:border-[#d9b166]/42 hover:bg-white/[0.075]",
            className
          )}
        >
          <div className={cn("relative overflow-hidden bg-black", aspectClass)}>
            <FeedMedia
              mediaUrl={mediaUrl}
              mediaType={mediaType}
              modelName={modelName}
              className="h-full w-full object-cover opacity-90 grayscale transition duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.03),rgba(0,0,0,0.2)_42%,rgba(0,0,0,0.94)),radial-gradient(circle_at_70%_8%,rgba(255,255,255,0.15),transparent_30%)]" />
            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.8),transparent)] opacity-60" />

            <div className="absolute left-2 top-2 flex items-center gap-1.5 sm:left-3 sm:top-3 sm:gap-2">
              {isVideo ? (
                <span className="grid size-8 place-items-center rounded-full border border-white/20 bg-black/35 text-white shadow-[0_0_32px_rgba(255,255,255,0.16)] backdrop-blur-xl sm:size-10">
                  <Play className="ml-0.5 size-3.5 fill-current sm:size-4" />
                </span>
              ) : null}
              <span className="inline-flex max-w-[8rem] items-center gap-1 rounded-full border border-white/12 bg-black/35 px-2 py-1.5 text-[0.52rem] uppercase tracking-[0.14em] text-white/70 backdrop-blur-xl sm:max-w-[11rem] sm:gap-1.5 sm:px-3 sm:py-2 sm:text-[0.65rem] sm:tracking-[0.18em]">
                <Sparkles className="size-2.5 text-[#d9b166] sm:size-3" />
                {category}
              </span>
            </div>

            <div className="absolute right-3 top-3 hidden rounded-full border border-white/16 bg-white/12 px-3 py-2 text-xs text-white opacity-0 shadow-[0_0_35px_rgba(255,255,255,0.16)] backdrop-blur-xl transition group-hover:opacity-100 sm:inline-flex">
              <Eye className="mr-1.5 size-3.5" />
              Aperçu
            </div>

            <div className="absolute inset-x-2 bottom-2 sm:inset-x-3 sm:bottom-3">
              <div className="border border-white/10 bg-black/38 p-2.5 backdrop-blur-2xl sm:border-white/12 sm:bg-black/46 sm:p-4">
                <div className="flex items-center justify-between gap-2 sm:gap-3">
                  <p className="truncate text-[0.55rem] uppercase tracking-[0.16em] text-[#d9b166] sm:text-[0.65rem] sm:tracking-[0.22em]">
                    {location}
                  </p>
                  <ArrowUpRight className="size-3.5 shrink-0 text-white/52 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:size-4" />
                </div>
                <h3 className="mt-1 line-clamp-2 text-base font-semibold leading-[1.08] sm:mt-2 sm:text-2xl sm:leading-tight">
                  {modelName}
                </h3>
                <p className="mt-1 hidden line-clamp-2 text-xs leading-5 text-white/56 sm:block sm:text-sm">{title}</p>
                {tags.length ? (
                  <div className="mt-3 hidden flex-wrap gap-1.5 sm:flex">
                    {tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="rounded-full bg-white/10 px-2.5 py-1 text-[0.65rem] text-white/62">
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 border-t border-white/10 px-2.5 py-2 sm:gap-3 sm:px-4 sm:py-3">
            <button
              type="button"
              onClick={handleLikeClick}
              disabled={isLiking || hasLiked}
              aria-label={hasLiked ? `${modelName} déjà aimé` : `Aimer ${modelName}`}
              className={cn(
                "inline-flex min-w-0 items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs transition sm:px-3 sm:py-2 sm:text-sm",
                hasLiked
                  ? "border-[#d9b166]/40 bg-[#d9b166]/10 text-[#d9b166]"
                  : "border-white/12 bg-white/7 text-white/82 hover:border-[#d9b166]/70 hover:bg-[#d9b166]/12"
              )}
            >
              <Heart className={cn("size-3.5 sm:size-4", hasLiked && "fill-current")} />
              <span>{formattedLikes}</span>
            </button>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/25 px-2.5 py-1.5 text-xs text-white/58 sm:px-3 sm:py-2 sm:text-sm">
              <MessageCircle className="size-3.5 sm:size-4" />
              {formattedComments}
            </span>
          </div>
        </motion.article>
      }
    />
  );
}

function FeedMedia({
  mediaUrl,
  mediaType,
  modelName,
  className,
}: {
  mediaUrl: string;
  mediaType: "image" | "video";
  modelName: string;
  className?: string;
}) {
  if (mediaType === "video") {
    return (
      <video
        src={mediaUrl}
        className={className}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    );
  }

  return (
    <img
      src={mediaUrl}
      alt={`Média mode premium de ${modelName}`}
      className={className}
      loading="lazy"
      decoding="async"
    />
  );
}

function formatCount(value: number): string {
  return new Intl.NumberFormat("fr", {
    notation: value >= 10000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);
}
