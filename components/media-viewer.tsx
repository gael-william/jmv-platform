"use client";

/* eslint-disable @next/next/no-img-element */

import { AnimatePresence, motion } from "framer-motion";
import { type ReactNode, useMemo, useRef, useState } from "react";
import { Heart, Maximize2, Play, Send, Sparkles, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { addComment, fetchComments, likePost, type ApiError, type Comment } from "@/lib/api";
import { cn } from "@/lib/utils";

export type MediaViewerProps = {
  mediaUrl: string;
  mediaType?: "image" | "video";
  modelName: string;
  title?: string;
  description?: string;
  category?: string;
  photographer?: string;
  location?: string;
  likes?: number | string;
  comments?: number | string;
  postId?: number;
  trigger?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
};

export function MediaViewer({
  mediaUrl,
  mediaType = "image",
  modelName,
  title = "Aperçu mode cinématique",
  description = "Un aperçu média premium issu de l’archive mode JMV Vision.",
  category = "Éditorial",
  photographer = "Studio JMV",
  location = "Monde",
  likes = "24.8K",
  comments = "1.2K",
  postId,
  trigger,
  open,
  onOpenChange,
  className,
}: MediaViewerProps) {
  const isVideo = mediaType === "video";
  const parsedLikes = useMemo(() => parseCount(likes), [likes]);
  const parsedComments = useMemo(() => parseCount(comments), [comments]);
  const [likesState, setLikesState] = useState(parsedLikes);
  const [commentsState, setCommentsState] = useState(parsedComments);
  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentThread, setCommentThread] = useState<Comment[]>([]);
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentError, setCommentError] = useState("");
  const [likeAnimating, setLikeAnimating] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);

  const formattedLikes = useMemo(() => formatCount(likesState), [likesState]);
  const formattedComments = useMemo(() => formatCount(commentsState), [commentsState]);

  function handleDialogOpenChange(isOpen: boolean) {
    if (isOpen && typeof postId === "number") {
      setLoadingComments(true);
      fetchComments(postId)
        .then((loaded) => {
          setCommentThread(loaded);
          setCommentsState((prev) => Math.max(prev, loaded.length));
        })
        .catch(() => {})
        .finally(() => setLoadingComments(false));
    }
    onOpenChange?.(isOpen);
  }

  async function handleLike() {
    if (liked) return;

    const previousLikes = likesState;
    setLiked(true);
    setLikeAnimating(true);
    setLikesState((count) => count + 1);

    if (typeof postId === "number") {
      try {
        const response = await likePost(postId);
        if (typeof response.likes_count === "number") {
          setLikesState(response.likes_count);
        }
      } catch (error) {
        const apiError = error as ApiError;
        if (apiError?.status === 400) {
          // Déjà aimé: on garde l’état aimé sans double compteur.
          setLiked(true);
          setLikesState(previousLikes);
        } else {
          setLiked(false);
          setLikesState(previousLikes);
          console.error("Échec de l’enregistrement du like:", error);
        }
      }
    }

    window.setTimeout(() => setLikeAnimating(false), 280);
  }

  async function handleCommentSubmit(event: { preventDefault(): void }) {
    event.preventDefault();
    setCommentError("");

    const trimmed = commentText.trim();
    if (!trimmed || isCommenting) return;

    const optimisticComment: Comment = {
      id: Date.now(),
      post_id: postId ?? 0,
      body: trimmed,
      comment: trimmed,
      user_name: "Studio",
      username: "Studio",
      created_at: new Date().toISOString(),
    };

    setCommentThread((prev) => [optimisticComment, ...prev]);
    setCommentsState((count) => count + 1);
    setCommentText("");
    setIsCommenting(true);

    if (typeof postId === "number") {
      try {
        const response = await addComment(postId, {
          body: trimmed,
          user_name: "Studio",
        });
        setCommentThread((prev) =>
          prev.map((comment) => (comment.id === optimisticComment.id ? response : comment))
        );
      } catch (error) {
        setCommentError("Impossible de publier le commentaire. Réessayez.");
        setCommentThread((prev) => prev.filter((comment) => comment.id !== optimisticComment.id));
        setCommentsState((count) => Math.max(count - 1, 0));
        console.error("Échec de l’enregistrement du commentaire:", error);
      }
    }

    setIsCommenting(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      {trigger ? (
        <DialogTrigger asChild>{trigger}</DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button className="rounded-full border border-white/15 bg-white/10 text-white hover:bg-white hover:text-black">
            <Maximize2 className="size-4" />
            Aperçu
          </Button>
        </DialogTrigger>
      )}

      <DialogContent
        showCloseButton={false}
        className={cn(
          "h-[100svh] max-h-[100svh] w-screen max-w-[100vw] overflow-hidden rounded-none border-0 bg-black/94 p-0 text-white ring-0 backdrop-blur-2xl sm:h-[calc(100svh-1.5rem)] sm:max-h-[calc(100svh-1.5rem)] sm:w-[calc(100vw-1.5rem)] sm:max-w-[calc(100vw-1.5rem)] sm:rounded-[8px] sm:border sm:border-white/12 sm:ring-1 sm:ring-white/10 xl:w-[min(118rem,calc(100vw-2rem))] xl:max-w-[calc(100vw-2rem)]",
          className
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(217,177,102,0.18),transparent_34%),radial-gradient(circle_at_86%_4%,rgba(255,255,255,0.1),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_24%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.8),rgba(217,177,102,0.9),transparent)]" />

        <DialogClose asChild>
          <Button
            size="icon"
            variant="outline"
            className="absolute right-3 top-3 z-30 rounded-full border-white/15 bg-black/45 text-white shadow-[0_0_28px_rgba(0,0,0,0.35)] backdrop-blur-xl hover:bg-white hover:text-black sm:right-4 sm:top-4"
            aria-label="Fermer le viewer média"
          >
            <X className="size-4" />
          </Button>
        </DialogClose>

        <AnimatePresence mode="wait">
          <motion.div
            key={mediaUrl}
            initial={{ opacity: 0, scale: 0.96, filter: "blur(14px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(12px)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid h-full min-h-0 min-w-0 grid-rows-[minmax(16rem,46svh)_minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_minmax(22rem,28rem)] lg:grid-rows-1 xl:grid-cols-[minmax(0,1fr)_minmax(25rem,32rem)]"
          >
            <section className="relative min-h-0 min-w-0 overflow-hidden bg-black">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
                className="relative flex h-full min-h-0 items-center justify-center overflow-hidden"
              >
                <ViewerMedia
                  mediaUrl={mediaUrl}
                  mediaType={mediaType}
                  modelName={modelName}
                  className="h-full w-full object-contain"
                />
              </motion.div>

              <div className="pointer-events-none absolute left-3 top-3 z-20 flex max-w-[calc(100%-5.5rem)] items-center gap-2 rounded-full border border-white/12 bg-black/35 px-3 py-2 text-[0.65rem] uppercase tracking-[0.2em] text-white/60 backdrop-blur-xl sm:left-5 sm:top-5 sm:text-xs">
                <Play className="size-3.5 fill-current text-[#d9b166]" />
                {isVideo ? "Fichier motion" : "Image éditoriale"}
              </div>
            </section>

            <motion.aside
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.48, delay: 0.12, ease: "easeOut" }}
              className="relative flex min-h-0 min-w-0 flex-col overflow-hidden border-t border-white/10 bg-white/[0.055] backdrop-blur-2xl lg:border-l lg:border-t-0"
            >
              <div className="z-20 border-b border-white/10 bg-black/35 px-4 py-4 backdrop-blur-xl lg:px-6 xl:px-7">
                <DialogHeader>
                  <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#d9b166]">
                    <Sparkles className="size-3.5" />
                    Vision plein écran
                  </p>
                <DialogTitle className="mt-2 text-2xl font-semibold leading-tight sm:text-3xl">
                  {modelName}
                </DialogTitle>
                <DialogDescription className="mt-2 text-sm text-white/52">
                  {title}
                </DialogDescription>
              </DialogHeader>
              </div>

              <div className="jmv-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 pr-3 text-sm sm:pr-4 lg:px-6 xl:px-7">
                <div className="space-y-5 pb-28 lg:pb-32">
                  <p className="text-sm leading-7 text-white/58">{description}</p>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      ["Catégorie", category],
                      ["Lieu", location],
                      ["Photographe", photographer],
                      ["Média", isVideo ? "Vidéo cinématique" : "Image éditoriale"],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-[8px] border border-white/10 bg-black/30 p-4">
                        <p className="text-xs uppercase tracking-[0.22em] text-white/35">{label}</p>
                        <p className="mt-2 text-sm text-white/78">{value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      type="button"
                      onClick={handleLike}
                      whileTap={{ scale: 0.96 }}
                      className={cn(
                        "flex items-center justify-between gap-3 rounded-[8px] border px-4 py-4 text-left transition",
                        liked
                          ? "border-[#d9b166]/60 bg-[#d9b166]/10 text-[#d9b166]"
                          : "border-white/10 bg-white/5 text-white/80 hover:border-[#d9b166]/60 hover:bg-white/5"
                      )}
                    >
                      <span className={cn("inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em]", likeAnimating ? "animate-pulse text-[#d9b166]" : "")}>
                        <Heart className={cn("size-4", liked && "fill-current")} />
                        Aimer
                      </span>
                      <span className="text-lg font-semibold">{formattedLikes}</span>
                    </motion.button>

                    <div className="rounded-[8px] border border-white/10 bg-black/30 p-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-white/35">Commentaires</p>
                      <p className="mt-3 text-2xl font-semibold text-white">{formattedComments}</p>
                    </div>
                  </div>

                  <div className="rounded-[8px] border border-white/10 bg-black/25 p-4 backdrop-blur-xl">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.26em] text-[#d9b166]">Commentaires live</p>
                        <p className="mt-1 text-sm text-white/60">Les nouvelles notes entrent dans le fil avec fluidité.</p>
                      </div>
                      <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/45">
                        {formattedComments}
                      </span>
                    </div>

                    <div className="max-h-[30rem] min-h-[10rem] overflow-y-auto pr-1 pt-4">
                      {loadingComments ? (
                        <div className="rounded-[8px] border border-white/10 bg-white/[0.035] p-4 text-sm leading-6 text-white/42">
                          Chargement des commentaires...
                        </div>
                      ) : (
                        <AnimatePresence initial={false}>
                          {commentThread.map((comment) => (
                            <motion.div
                              key={comment.id ?? comment.body ?? comment.comment}
                              initial={{ opacity: 0, y: 16 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.35, ease: "easeOut" }}
                              className="mb-3 rounded-[8px] border border-white/10 bg-white/5 p-4 text-sm text-white/80"
                            >
                              <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.2em] text-white/40">
                                <span>{comment.user_name || comment.username || "Studio"}</span>
                                <span>{formatCommentTime(comment.created_at)}</span>
                              </div>
                              <p className="mt-3 leading-6 text-white/90">{comment.body || comment.comment}</p>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      )}

                      {!loadingComments && commentThread.length === 0 ? (
                        <div className="rounded-[8px] border border-white/10 bg-white/[0.035] p-4 text-sm leading-6 text-white/42">
                          Aucun commentaire pour l’instant. Lancez le fil studio.
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>

              <form
                onSubmit={handleCommentSubmit}
                className="absolute inset-x-0 bottom-0 z-20 border-t border-white/10 bg-black/72 p-3 backdrop-blur-2xl sm:p-4 lg:p-5"
              >
                <div className="flex items-end gap-2">
                  <Textarea
                    value={commentText}
                    onChange={(event) => setCommentText(event.target.value)}
                    placeholder="Écrire un commentaire..."
                    className="min-h-11 resize-none rounded-[8px] border border-white/10 bg-white/5 px-3 py-3 text-sm text-white placeholder:text-white/35 focus:border-[#d9b166]/60 focus:ring-[#d9b166]/20 sm:min-h-12"
                    disabled={isCommenting}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={isCommenting || !commentText.trim()}
                    className="size-11 shrink-0 rounded-full bg-[#d9b166] text-black transition hover:bg-[#e2c071] disabled:cursor-not-allowed disabled:opacity-50 sm:size-12"
                    aria-label="Publier le commentaire"
                  >
                    {isCommenting ? (
                      <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                        <Sparkles className="size-4" />
                      </motion.span>
                    ) : (
                      <Send className="size-4" />
                    )}
                  </Button>
                </div>
                {commentError ? <p className="mt-2 text-sm text-red-300">{commentError}</p> : null}
              </form>
            </motion.aside>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

function ViewerMedia({
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
  const videoRef = useRef<HTMLVideoElement>(null);

  if (mediaType === "video") {
    return (
      <video
        ref={videoRef}
        src={mediaUrl}
        className={className}
        controls
        autoPlay
        muted
        playsInline
        preload="metadata"
      />
    );
  }

  return (
    <img
      src={mediaUrl}
      alt={`Aperçu plein écran du média mode de ${modelName}`}
      className={className}
      decoding="async"
    />
  );
}

function parseCount(value: number | string): number {
  if (typeof value === "number") return value;
  const lower = value.toLowerCase();
  const numeric = Number(lower.replace(/[^\d.]/g, ""));
  if (!Number.isFinite(numeric)) return 0;
  if (lower.includes("m")) return Math.round(numeric * 1_000_000);
  if (lower.includes("k")) return Math.round(numeric * 1_000);
  return Math.round(numeric);
}

function formatCount(value: number): string {
  return new Intl.NumberFormat("fr", {
    notation: value >= 10000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);
}

function formatCommentTime(value?: string): string {
  return new Date(value ?? 0).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}
