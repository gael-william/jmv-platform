"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  Clapperboard,
  Eclipse,
  Globe2,
  Layers3,
  Play,
  RadioTower,
  ScanFace,
  Sparkles,
  Timer,
  X,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UniverseTransitionLink } from "@/components/universe-transition";
import { cn } from "@/lib/utils";

const videos = [
  {
    title: "Obsidian Walk",
    type: "Runway nocturne à Paris",
    runtime: "01:48",
    image:
      "/images/c1.jpeg",
    videoUrl:
      "/videos/luffy.mp4",
  },
  {
    title: "Crimson Lens",
    type: "Film campagne",
    runtime: "02:16",
    image:
      "/images/c13.jpeg",
    videoUrl:
      "/videos/chrome.mp4",
  },
  {
    title: "Atelier cyber",
    type: "Séquence fittings",
    runtime: "00:58",
    image:
      "/images/c6.jpeg",
    videoUrl:
      "/videos/afterdark.mp4",
  },
];

const archives = [
  {
    year: "2026",
    title: "Éditorial chrome à Tokyo",
    body: "Une campagne rouge lumière construite autour d’un tailoring cinétique.",
    signal: "Scan couture neural",
    image: "/images/c9.jpeg",
  },
  {
    year: "2025",
    title: "Couture digitale à Milan",
    body: "Luffy inaugure une installation fashion week assistée par IA.",
    signal: "Runway hologramme",
    image: "/images/c12.jpeg",
  },
  {
    year: "2024",
    title: "Cover afterdark à Paris",
    body: "Couverture internationale avec styling monochrome cinématique.",
    signal: "Archive éditoriale luxe",
    image: "/images/c13.jpeg",
  },
  {
    year: "2023",
    title: "Ignition runway à Séoul",
    body: "Premier booking luxe international et début runway en streaming.",
    signal: "Transmission genesis",
    image: "/images/c11.jpeg",
  },
];

const castingSignals = [
  { label: "Runway global", value: "42" },
  { label: "Covers luxe", value: "18" },
  { label: "Fit marché", value: "96%" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 },
};

export function LuffyUniverseExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [introOpen, setIntroOpen] = useState(true);
  const { scrollYProgress } = useScroll();
  const heroDrift = useTransform(scrollYProgress, [0, 0.35], [0, -120]);
  const signalScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.18]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.to(".luffy-scanline", {
        yPercent: 85,
        opacity: 0.7,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".luffy-orbit", {
        rotate: 360,
        duration: 28,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".dimension-light", {
        scaleX: 1.22,
        opacity: 0.92,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".runway-line", {
        yPercent: -28,
        opacity: 0.72,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
      });

      gsap.utils.toArray<HTMLElement>(".luffy-panel").forEach((panel) => {
        gsap.fromTo(
          panel,
          { opacity: 0, y: 70, filter: "blur(12px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 82%",
              end: "bottom 50%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, rootRef);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroOpen(false), 2100);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main
      ref={rootRef}
      className="relative min-h-screen overflow-hidden bg-[#030000] text-white"
    >
      <IntroTransition show={introOpen} />
      <AnimatedAtmosphere />

      <section
        ref={heroRef}
        className="relative isolate flex min-h-screen items-end overflow-hidden px-5 pb-16 pt-28 sm:px-8 lg:px-12"
      >
        <motion.img
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1800&q=90"
          alt="Éditorial haute couture cinématique de Luffy"
          className="absolute inset-0 h-full w-full object-cover opacity-38 grayscale"
          style={{ scale: signalScale }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(142,0,25,0.42),transparent_34%),linear-gradient(90deg,rgba(3,0,0,0.97),rgba(3,0,0,0.55)_48%,rgba(3,0,0,0.96)),linear-gradient(180deg,rgba(0,0,0,0.08),#030000_94%)]" />
        <motion.div
          className="luffy-orbit absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#b7142d]/20"
          style={{ y: heroDrift }}
        >
          <div className="absolute left-1/2 top-0 size-3 -translate-x-1/2 rounded-full bg-[#ff244b] shadow-[0_0_28px_#ff244b]" />
          <div className="absolute bottom-9 right-12 size-2 rounded-full bg-white shadow-[0_0_22px_white]" />
        </motion.div>
        <div className="dimension-light absolute left-1/2 top-1/2 h-px w-[84vw] -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,36,75,0.92),rgba(255,255,255,0.72),transparent)] shadow-[0_0_44px_rgba(255,36,75,0.8)]" />
        <div className="absolute bottom-0 left-1/2 h-[52vh] w-[42rem] max-w-[88vw] -translate-x-1/2 overflow-hidden opacity-50">
          {[0, 1, 2, 3, 4].map((line) => (
            <span
              key={line}
              className="runway-line absolute bottom-0 h-full w-px bg-[linear-gradient(180deg,transparent,rgba(255,36,75,0.72),transparent)]"
              style={{ left: `${18 + line * 16}%` }}
            />
          ))}
        </div>
        <div className="luffy-scanline absolute left-0 top-20 h-32 w-full bg-[linear-gradient(180deg,transparent,rgba(255,36,75,0.16),transparent)] blur-sm" />

        <motion.nav
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-x-0 top-0 z-40 px-4 py-4 sm:px-6"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between border border-[#ff244b]/18 bg-black/35 px-4 py-3 backdrop-blur-2xl">
            <UniverseTransitionLink
              href="/"
              className="flex items-center gap-3"
              ariaLabel="Retour vers JMV Vision"
            >
              <span className="grid size-9 place-items-center border border-[#ff244b]/25 bg-[#ff244b]/10">
                <Eclipse className="size-4 text-[#ff244b]" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.32em]">
                Univers Luffy
              </span>
            </UniverseTransitionLink>
            <div className="hidden items-center gap-6 text-xs uppercase tracking-[0.24em] text-white/50 md:flex">
              <a href="#films" className="transition hover:text-white">
                Films
              </a>
              <a href="#archives" className="transition hover:text-white">
                Archives
              </a>
              <a href="#casting" className="transition hover:text-white">
                Casting
              </a>
            </div>
            <Button className="h-9 rounded-full border border-[#ff244b]/30 bg-[#ff244b] px-4 text-white shadow-[0_0_30px_rgba(255,36,75,0.28)] hover:bg-white hover:text-black">
              Signal en direct
              <RadioTower className="size-4" />
            </Button>
          </div>
        </motion.nav>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.14, delayChildren: 0.18 } },
          }}
          className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end"
        >
          <div>
            <motion.p
              variants={fadeUp}
              className="mb-5 inline-flex items-center gap-2 border border-[#ff244b]/25 bg-[#ff244b]/10 px-3 py-2 text-xs uppercase tracking-[0.32em] text-[#ff8aa0] backdrop-blur-xl"
            >
              <Sparkles className="size-3.5" />
              Protocole mannequin international
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="max-w-5xl text-balance text-6xl font-semibold leading-[0.88] sm:text-7xl lg:text-8xl xl:text-9xl"
            >
              Luffy dans le futur rouge.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-lg leading-8 text-white/62 sm:text-xl"
            >
              Un univers cyber mode pour Luffy: films cinématiques, transmissions
              d’archives et intelligence casting enveloppées de verre noir et de lumière cramoisie.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">
              <Button className="h-12 rounded-full border border-[#ff244b]/35 bg-[#ff244b] px-6 text-white shadow-[0_0_52px_rgba(255,36,75,0.34)] hover:bg-white hover:text-black">
                Lancer la transmission
                <ArrowUpRight className="size-4" />
              </Button>
              <Button
                variant="outline"
                className="h-12 rounded-full border-white/15 bg-black/35 px-6 text-white backdrop-blur-xl hover:bg-white/10 hover:text-white"
              >
                Voir l’intro
                <Play className="size-4 fill-white" />
              </Button>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            className="luffy-panel border border-white/10 bg-white/[0.055] p-4 shadow-[0_0_80px_rgba(255,36,75,0.1)] backdrop-blur-2xl"
          >
            <div className="relative aspect-[4/5] overflow-hidden border border-[#ff244b]/20">
              <img
                src="/images/c2.jpeg" alt="Profil mode futuriste de Luffy"
                className="h-full w-full object-cover grayscale"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(3,0,0,0.72)),radial-gradient(circle_at_70%_20%,rgba(255,36,75,0.25),transparent_35%)]" />
              <div className="absolute bottom-4 left-4 right-4 border border-white/12 bg-black/50 p-4 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.28em] text-[#ff8aa0]">
                  Aura casting en direct
                </p>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {castingSignals.map((signal) => (
                    <div key={signal.label} className="border border-white/10 p-3">
                      <p className="text-xl font-semibold">{signal.value}</p>
                      <p className="mt-1 text-[0.63rem] uppercase tracking-[0.16em] text-white/42">
                        {signal.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <FilmsSection />
      <DimensionArchive />
      <ArchivesTimeline />
      <CastingSection />
      <FooterSignal />
    </main>
  );
}

function IntroTransition({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center overflow-hidden bg-[#030000]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: "blur(14px)" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,36,75,0.28),transparent_34%),linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)]"
            animate={{ scale: [0.9, 1.12, 1.42], opacity: [0.35, 0.95, 0.35] }}
            transition={{ duration: 1.9, ease: "easeInOut" }}
          />
          <motion.div
            className="relative grid place-items-center text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <motion.div
              className="mb-6 grid size-24 place-items-center rounded-full border border-[#ff244b]/30 bg-[#ff244b]/10 shadow-[0_0_70px_rgba(255,36,75,0.45)]"
              animate={{ rotate: 360, scale: [1, 1.08, 1] }}
              transition={{
                rotate: { duration: 2.2, ease: "linear", repeat: Infinity },
                scale: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <Eclipse className="size-9 text-[#ff244b]" />
            </motion.div>
            <p className="text-xs uppercase tracking-[0.44em] text-[#ff8aa0]">
              ouverture du runway dimensionnel
            </p>
            <h2 className="mt-4 text-4xl font-semibold uppercase tracking-[0.22em] sm:text-6xl">
              Luffy
            </h2>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function AnimatedAtmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute -left-40 top-24 h-[34rem] w-[34rem] bg-[radial-gradient(circle,rgba(255,36,75,0.26),transparent_66%)] blur-3xl"
        animate={{ x: [0, 80, 0], y: [0, 40, 0], opacity: [0.45, 0.85, 0.45] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-18rem] right-[-16rem] h-[48rem] w-[48rem] bg-[conic-gradient(from_80deg,transparent,rgba(255,36,75,0.24),rgba(255,255,255,0.1),transparent)] blur-3xl"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,36,75,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,36,75,0.035)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[54rem] w-[54rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ff244b]/10"
        animate={{ scale: [0.84, 1.08, 0.84], opacity: [0.12, 0.32, 0.12] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
      />
      {Array.from({ length: 58 }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full bg-[#ff244b] shadow-[0_0_14px_#ff244b]"
          style={{
            left: `${(index * 29) % 100}%`,
            top: `${(index * 47) % 100}%`,
            width: `${index % 5 === 0 ? 3 : 2}px`,
            height: `${index % 5 === 0 ? 3 : 2}px`,
          }}
          animate={{
            x: [-8, 12, -8],
            y: [-24, 24, -24],
            opacity: [0.08, 0.9, 0.08],
            scale: [0.8, 1.35, 0.8],
          }}
          transition={{
            duration: 3.4 + (index % 9) * 0.55,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.08,
          }}
        />
      ))}
    </div>
  );
}

function SectionIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-90px" }}
      variants={fadeUp}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="mx-auto mb-10 max-w-7xl px-5 sm:px-8 lg:px-12"
    >
      <p className="text-xs uppercase tracking-[0.34em] text-[#ff244b]">{eyebrow}</p>
      <div className="mt-4 grid gap-5 lg:grid-cols-[0.85fr_0.55fr] lg:items-end">
        <h2 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl">
          {title}
        </h2>
        <p className="max-w-xl text-sm leading-7 text-white/55 sm:text-base">{children}</p>
      </div>
    </motion.div>
  );
}

function FilmsSection() {
  return (
    <section id="films" className="relative z-10 py-24">
      <SectionIntro eyebrow="Reels vidéo immersifs" title="Transmissions runway venues d’une autre dimension.">
        Films runway nocturnes, fragments campagne et séquences cyber atelier
        réunis dans un portail motion premium aux signaux cramoisis.
      </SectionIntro>
      <div className="mx-auto grid max-w-7xl gap-4 px-5 sm:px-8 lg:grid-cols-3 lg:px-12">
        {videos.map((video, index) => (
          <LuffyVideoCard key={video.title} video={video} index={index} />
        ))}
      </div>
    </section>
  );
}

function LuffyVideoCard({
  video,
  index,
}: {
  video: { title: string; type: string; runtime: string; image: string; videoUrl: string };
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.article
      whileHover={{ y: -8 }}
      className={cn(
        "luffy-panel group relative min-h-[24rem] overflow-hidden border border-white/10 bg-white/[0.055] shadow-[0_0_70px_rgba(255,36,75,0.08)]",
        index === 0 && "lg:col-span-2"
      )}
    >
      <img
        src={video.image}
        alt={`Film mode ${video.title}`}
        className="absolute inset-0 h-full w-full object-cover opacity-70 grayscale transition duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,0,0,0.08),rgba(3,0,0,0.88)),radial-gradient(circle_at_30%_18%,rgba(255,36,75,0.24),transparent_34%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,36,75,0.95),transparent)] opacity-0 transition duration-700 group-hover:opacity-100" />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            className="absolute left-5 top-5 grid size-14 place-items-center rounded-full border border-[#ff244b]/30 bg-[#ff244b]/16 text-white backdrop-blur-xl transition group-hover:bg-[#ff244b]"
            aria-label={`Lire ${video.title}`}
          >
            <Play className="ml-0.5 size-5 fill-current" />
          </button>
        </DialogTrigger>

        <DialogContent
          showCloseButton={false}
          className="h-[100svh] max-h-[100svh] w-screen max-w-[100vw] overflow-hidden rounded-none border-0 bg-[#030000]/97 p-0 text-white ring-0 sm:h-[min(46rem,calc(100svh-2rem))] sm:max-h-[calc(100svh-2rem)] sm:w-[min(72rem,calc(100vw-2rem))] sm:max-w-[calc(100vw-2rem)] sm:rounded-[8px] sm:border sm:border-[#ff244b]/20"
        >
          <DialogTitle className="sr-only">{video.title}</DialogTitle>
          <DialogDescription className="sr-only">
            Reel vidéo plein écran de l’univers Luffy pour {video.title}.
          </DialogDescription>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,36,75,0.95),transparent)]" />

          <DialogClose asChild>
            <button
              className="absolute right-4 top-4 z-30 grid size-10 place-items-center rounded-full border border-[#ff244b]/30 bg-black/45 text-white backdrop-blur-xl transition hover:bg-[#ff244b]"
              aria-label="Fermer la vidéo"
            >
              <X className="size-4" />
            </button>
          </DialogClose>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, scale: 0.97, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="grid h-full min-h-0 grid-rows-[minmax(0,1fr)_auto]"
              >
                <div className="relative min-h-0 w-full overflow-hidden bg-black">
                  <video
                    key={video.videoUrl}
                    src={video.videoUrl}
                    className="h-full w-full object-contain"
                    controls
                    autoPlay
                    muted
                    playsInline
                    preload="metadata"
                  />
                </div>

                <div className="shrink-0 border-t border-[#ff244b]/20 bg-black/70 px-5 py-4 backdrop-blur-xl">
                  <div className="flex items-center justify-between gap-4">
                    <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[#ff8aa0]">
                      <Sparkles className="size-3" />
                      {video.type}
                    </p>
                    <p className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-white/45">
                      <Timer className="size-3.5" />
                      {video.runtime}
                    </p>
                  </div>
                  <h3 className="mt-1.5 text-xl font-semibold">{video.title}</h3>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>

      <div className="absolute inset-x-5 bottom-5">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[#ff8aa0]">
            {video.type}
          </p>
          <p className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-white/45">
            <Timer className="size-3.5" />
            {video.runtime}
          </p>
        </div>
        <h3 className="mt-2 text-3xl font-semibold">{video.title}</h3>
        <div className="mt-4 h-1 overflow-hidden bg-white/10">
          <motion.span
            className="block h-full bg-[#ff244b]"
            initial={{ width: "18%" }}
            whileInView={{ width: `${52 + index * 16}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.article>
  );
}

function DimensionArchive() {
  return (
    <section className="relative z-10 px-5 py-20 sm:px-8 lg:px-12">
      <div className="luffy-panel mx-auto grid max-w-7xl gap-8 overflow-hidden border border-[#ff244b]/18 bg-[radial-gradient(circle_at_22%_18%,rgba(255,36,75,0.22),transparent_32%),rgba(255,255,255,0.045)] p-6 backdrop-blur-2xl sm:p-10 lg:grid-cols-[0.75fr_1fr] lg:p-12">
        <div>
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.34em] text-[#ff8aa0]">
            <Layers3 className="size-4" />
            Archive dimensionnelle
          </p>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-tight sm:text-5xl">
            Une chambre d’archives premium pour chaque signal runway.
          </h2>
          <p className="mt-5 text-sm leading-7 text-white/54">
            Chaque capsule conserve une identité cinématique: lumière rouge,
            verre noir, couture neurale et tension feutrée du luxe global.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: "Runway", value: "42 fichiers", icon: Zap },
            { label: "Éditorial", value: "18 couvertures", icon: Sparkles },
            { label: "Motion", value: "76 films", icon: Play },
          ].map(({ label, value, icon: Icon }) => (
            <motion.div
              key={label}
              whileHover={{ y: -8, scale: 1.02 }}
              className="border border-white/10 bg-black/35 p-5 shadow-[0_0_44px_rgba(255,36,75,0.06)]"
            >
              <Icon className="size-5 text-[#ff244b]" />
              <p className="mt-8 text-2xl font-semibold">{label}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.22em] text-white/38">
                {value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArchivesTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeArchive = archives[activeIndex];

  return (
    <section id="archives" className="relative z-10 py-24">
      <SectionIntro eyebrow="Chronologie interactive" title="Touchez les nœuds d’archives et changez de dimension.">
        Chaque nœud capture un marché, une humeur et une évolution visuelle dans
        l’histoire internationale de Luffy.
      </SectionIntro>
      <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 lg:grid-cols-[0.8fr_1fr] lg:px-12">
        <motion.div
          key={activeArchive.year}
          initial={{ opacity: 0, scale: 0.96, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.42, ease: "easeOut" }}
          className="luffy-panel relative min-h-[31rem] overflow-hidden border border-white/10 bg-white/[0.055]"
        >
          <img
            src={activeArchive.image}
            alt={`Aperçu archive ${activeArchive.title}`}
            className="absolute inset-0 h-full w-full object-cover opacity-70 grayscale"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,0,0,0.05),rgba(3,0,0,0.86)),radial-gradient(circle_at_20%_16%,rgba(255,36,75,0.28),transparent_34%)]" />
          <div className="absolute inset-x-5 bottom-5 border border-white/12 bg-black/45 p-5 backdrop-blur-2xl">
            <p className="text-xs uppercase tracking-[0.28em] text-[#ff8aa0]">
              {activeArchive.signal}
            </p>
            <h3 className="mt-3 text-3xl font-semibold">{activeArchive.title}</h3>
            <p className="mt-3 text-sm leading-7 text-white/55">{activeArchive.body}</p>
          </div>
        </motion.div>

        <div className="relative border-l border-[#ff244b]/25 pl-6 sm:pl-10">
          {archives.map((archive, index) => {
            const active = activeIndex === index;

            return (
              <motion.button
                key={archive.year}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "luffy-panel relative mb-4 w-full border p-5 text-left backdrop-blur-xl transition last:mb-0 sm:p-6",
                  active
                    ? "border-[#ff244b]/45 bg-[#ff244b]/12 shadow-[0_0_60px_rgba(255,36,75,0.12)]"
                    : "border-white/10 bg-white/[0.055] hover:border-white/24 hover:bg-white/[0.08]"
                )}
                whileHover={{ x: 8 }}
              >
                <span
                  className={cn(
                    "absolute -left-[2.1rem] top-6 grid size-4 place-items-center rounded-full shadow-[0_0_26px_rgba(255,36,75,0.9)] sm:-left-[3.1rem]",
                    active ? "bg-white" : "bg-[#ff244b]"
                  )}
                />
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[#ff8aa0]">
                      <CalendarDays className="size-3.5" />
                      {archive.year}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold">{archive.title}</h3>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-white/54">
                      {archive.body}
                    </p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] text-white/32">
                    nœud 0{index + 1}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CastingSection() {
  return (
    <section id="casting" className="relative z-10 px-5 py-24 sm:px-8 lg:px-12">
      <div className="luffy-panel mx-auto grid max-w-7xl gap-8 overflow-hidden border border-[#ff244b]/18 bg-[linear-gradient(135deg,rgba(255,36,75,0.18),rgba(255,255,255,0.045))] p-6 backdrop-blur-2xl sm:p-10 lg:grid-cols-[0.9fr_0.7fr] lg:p-14">
        <div>
          <p className="text-xs uppercase tracking-[0.34em] text-[#ff8aa0]">
            Espace casting
          </p>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-tight sm:text-6xl">
            Booker Luffy pour campagnes couture, lancements runway et films futuristes.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/58">
            Une surface de casting premium pour maisons internationales en quête
            d’une présence visuelle précise, éditoriale et cyber-luxe.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button className="h-12 rounded-full bg-white px-6 text-black hover:bg-[#ff244b] hover:text-white">
              Demander un casting
              <ScanFace className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-full border-white/15 bg-black/30 px-6 text-white hover:bg-white/10 hover:text-white"
            >
              Télécharger le dossier
              <Clapperboard className="size-4" />
            </Button>
          </div>
        </div>
        <Card className="rounded-[8px] border-white/10 bg-black/35 p-5 text-white ring-white/10">
          <div className="grid gap-3">
            {[
              ["Amplitude éditoriale", "Luxe, avant-garde, commercial"],
              ["Marchés", "Paris, Milan, Tokyo, New York"],
              ["Disponibilité", "Bookings internationaux ouverts"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-start gap-3 border border-white/10 bg-white/[0.045] p-4"
              >
                <BadgeCheck className="mt-0.5 size-5 text-[#ff244b]" />
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="mt-1 text-sm text-white/45">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}

function FooterSignal() {
  return (
    <footer className="relative z-10 border-t border-white/10 px-5 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="flex items-center gap-2 text-lg font-semibold uppercase tracking-[0.28em]">
            <Globe2 className="size-5 text-[#ff244b]" />
            Univers Luffy
          </p>
          <p className="mt-3 text-sm text-white/45">
            Atmosphère cyber mode pour le casting international.
          </p>
        </div>
        <p className="text-xs uppercase tracking-[0.24em] text-white/35">
          Transmission JMV Vision
        </p>
      </div>
    </footer>
  );
}
