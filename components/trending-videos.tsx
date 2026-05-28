"use client";

/* eslint-disable @next/next/no-img-element */

import { AnimatePresence, motion } from "framer-motion";
import { Play, Sparkles, X } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { fashionVideos } from "@/components/home-data";
import { SectionIntro } from "@/components/section-intro";
import { cn } from "@/lib/utils";

export function TrendingVideos() {
  return (
    <section id="videos" className="relative z-10 py-24">
      <SectionIntro eyebrow="Vidéos en tendance" title="Reels runway avec une pulsation cinéma de minuit.">
        Des surfaces vidéo premium pour castings, éditoriaux courts et previews créateurs.
      </SectionIntro>

      <div className="mx-auto grid max-w-7xl gap-4 px-5 sm:px-8 lg:grid-cols-3 lg:px-12">
        {fashionVideos.map((video, index) => (
          <VideoCard key={video.title} video={video} index={index} />
        ))}
      </div>
    </section>
  );
}

function VideoCard({
  video,
  index,
}: {
  video: { title: string; meta: string; image: string; videoUrl: string };
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: "easeOut" }}
      className={cn(
        "group relative min-h-80 overflow-hidden rounded-[8px] border border-white/12 bg-white/7",
        index === 0 && "lg:col-span-2"
      )}
    >
      <img
        src={video.image}
        alt={`Aperçu vidéo mode ${video.title}`}
        className="absolute inset-0 h-full w-full object-cover opacity-75 grayscale transition duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0.82))]" />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            className="absolute left-5 top-5 grid size-14 place-items-center rounded-full border border-white/20 bg-white/12 text-white shadow-[0_0_35px_rgba(255,255,255,0.18)] backdrop-blur-xl transition group-hover:scale-110 group-hover:bg-white group-hover:text-black"
            aria-label={`Lire ${video.title}`}
          >
            <Play className="ml-0.5 size-5 fill-current" />
          </button>
        </DialogTrigger>

        <DialogContent
          showCloseButton={false}
          className="h-[100svh] max-h-[100svh] w-screen max-w-[100vw] overflow-hidden rounded-none border-0 bg-black/96 p-0 text-white ring-0 sm:h-[min(46rem,calc(100svh-2rem))] sm:max-h-[calc(100svh-2rem)] sm:w-[min(72rem,calc(100vw-2rem))] sm:max-w-[calc(100vw-2rem)] sm:rounded-[8px] sm:border sm:border-white/12"
        >
          <DialogTitle className="sr-only">{video.title}</DialogTitle>
          <DialogDescription className="sr-only">
            Aperçu vidéo cinématique en plein écran pour {video.title}.
          </DialogDescription>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.8),rgba(217,177,102,0.9),transparent)]" />

          <DialogClose asChild>
            <Button
              size="icon"
              variant="outline"
              className="absolute right-3 top-3 z-30 rounded-full border-white/15 bg-black/45 text-white shadow-[0_0_28px_rgba(0,0,0,0.35)] backdrop-blur-xl hover:bg-white hover:text-black sm:right-4 sm:top-4"
              aria-label="Fermer la vidéo"
            >
              <X className="size-4" />
            </Button>
          </DialogClose>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, scale: 0.97, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="grid h-full min-h-0 grid-rows-[minmax(0,1fr)_auto]"
              >
                <VideoPlayer src={video.videoUrl} open={open} />

                <div className="shrink-0 border-t border-white/10 bg-black/60 px-5 py-4 backdrop-blur-xl">
                  <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.26em] text-[#d9b166]">
                    <Sparkles className="size-3" />
                    {video.meta}
                  </p>
                  <h3 className="mt-1.5 text-xl font-semibold">{video.title}</h3>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>

      <div className="absolute inset-x-5 bottom-5">
        <p className="text-xs uppercase tracking-[0.26em] text-white/50">
          {video.meta}
        </p>
        <h3 className="mt-2 text-3xl font-semibold">{video.title}</h3>
      </div>
    </motion.article>
  );
}

function VideoPlayer({ src, open }: { src: string; open: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="relative min-h-0 w-full overflow-hidden bg-black">
      <video
        ref={videoRef}
        key={open ? src : undefined}
        src={src}
        className="h-full w-full object-contain"
        controls
        autoPlay
        muted
        playsInline
        preload="metadata"
      />
    </div>
  );
}
