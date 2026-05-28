"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Gem, Play } from "lucide-react";

import { fadeUp } from "@/components/home-data";
import { Button } from "@/components/ui/button";

const heroStats = [
  ["24K", "scans casting"],
  ["8.9M", "vues films"],
  ["162", "villes couture"],
];

export function HeroSection() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, -110]);
  const runwayScale = useTransform(scrollYProgress, [0, 0.35], [1, 1.15]);

  return (
    <section className="relative isolate min-h-screen overflow-hidden">
      <motion.img
        src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1800&q=90"
        alt="Mannequin mode cinématique dans un décor éditorial de luxe"
        className="absolute inset-0 h-full w-full object-cover opacity-48 grayscale"
        style={{ scale: runwayScale }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.94),rgba(0,0,0,0.48)_48%,rgba(0,0,0,0.88)),linear-gradient(180deg,rgba(0,0,0,0.35),rgba(0,0,0,0.92))]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(180deg,transparent,#000)]" />
      <motion.div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 h-[62vh] w-[34vw] min-w-64 -translate-x-1/2 border-x border-white/15 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.09),transparent)]"
        style={{ y: heroY }}
      />

      <motion.div
        className="relative z-10 flex min-h-screen items-end px-5 pb-20 pt-28 sm:px-8 lg:px-12"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
        }}
      >
        <div className="grid w-full items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-5xl">
            <motion.div
              variants={fadeUp}
              className="mb-5 inline-flex items-center gap-2 border border-white/15 bg-white/8 px-3 py-2 text-xs uppercase tracking-[0.35em] text-white/70 backdrop-blur-xl"
            >
              <Gem className="size-3.5 text-[#d9b166]" />
              Atelier casting futuriste
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="max-w-5xl text-balance text-6xl font-semibold leading-[0.92] text-white sm:text-7xl lg:text-8xl xl:text-9xl"
            >
              JMV Vision
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl"
            >
              Une plateforme cinématique où portfolios mode, films runway et
              signaux de casting prestige avancent avec une précision chrome.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">
              <Button className="h-12 rounded-full border border-white/20 bg-white px-6 text-sm uppercase tracking-[0.18em] text-black shadow-[0_0_45px_rgba(255,255,255,0.32)] hover:bg-[#e8e8e8]">
                Explorer les mannequins
                <ArrowUpRight className="size-4" />
              </Button>
              <Button
                variant="outline"
                className="h-12 rounded-full border-white/18 bg-black/30 px-6 text-white backdrop-blur-xl hover:bg-white/10 hover:text-white"
              >
                Voir le runway
                <Play className="size-4 fill-white" />
              </Button>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            className="hidden border border-white/12 bg-white/8 p-4 shadow-[0_0_70px_rgba(255,255,255,0.08)] backdrop-blur-2xl lg:block"
          >
            <div className="grid grid-cols-3 gap-3 text-center">
              {heroStats.map(([value, label]) => (
                <div key={label} className="border border-white/10 bg-black/35 p-5">
                  <div className="text-3xl font-semibold">{value}</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.22em] text-white/45">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
