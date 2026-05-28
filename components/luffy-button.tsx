"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { UniverseTransitionLink } from "@/components/universe-transition";

export function LuffyButton() {
  return (
    <section id="studios" className="relative z-10 px-5 py-28 sm:px-8 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-90px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto max-w-7xl overflow-hidden rounded-[8px] border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.04))] p-6 shadow-[0_0_120px_rgba(255,255,255,0.08)] backdrop-blur-2xl sm:p-10 lg:p-14"
      >
        <div className="grid gap-10 lg:grid-cols-[0.9fr_0.6fr] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-[#d9b166]">
              Portail immersif
            </p>
            <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">
              Entrer dans l’univers Luffy
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/58">
              Ouvrez une chambre digitale où films de mannequins, drops créateurs
              et moodboards campagne gravitent dans un espace premium.
            </p>
          </div>

          <motion.div
            className="flex justify-start lg:justify-end"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Button
              asChild
              className="h-16 rounded-full border border-white/25 bg-white px-7 text-black shadow-[0_0_60px_rgba(217,177,102,0.35)] hover:bg-[#d9b166]"
            >
              <UniverseTransitionLink href="/luffy-universe">
                Entrer dans l’univers Luffy
                <Sparkles className="size-5" />
              </UniverseTransitionLink>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
