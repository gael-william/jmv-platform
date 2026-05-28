"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { categories } from "@/components/home-data";
import { SectionIntro } from "@/components/section-intro";

export function Categories() {
  return (
    <section id="runway" className="relative z-10 py-24">
      <SectionIntro eyebrow="Catégories" title="Des univers de découverte pour chaque intention de booking.">
        Passez du repérage campagne au casting runway avec des parcours talent
        élégants, précis et hautement visuels.
      </SectionIntro>

      <div className="mx-auto grid max-w-7xl gap-3 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-12">
        {categories.map((category, index) => {
          const Icon = category.icon;

          return (
            <motion.a
              key={category.label}
              href="#models"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="group border border-white/12 bg-white/7 p-5 backdrop-blur-xl transition hover:border-white/35 hover:bg-white/12 hover:shadow-[0_0_45px_rgba(255,255,255,0.1)]"
            >
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center border border-white/15 bg-black/30">
                  <Icon className="size-5 text-[#d9b166]" />
                </span>
                <ArrowUpRight className="size-4 text-white/35 transition group-hover:text-white" />
              </div>
              <h3 className="mt-8 text-2xl font-semibold">{category.label}</h3>
              <p className="mt-2 text-sm text-white/45">{category.count} profils curatés</p>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
