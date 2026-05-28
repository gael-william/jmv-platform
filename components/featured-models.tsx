"use client";

/* eslint-disable @next/next/no-img-element */

import { motion } from "framer-motion";

import { featuredModels } from "@/components/home-data";
import { SectionIntro } from "@/components/section-intro";
import { Card } from "@/components/ui/card";

export function FeaturedModels() {
  return (
    <section id="models" className="relative z-10 py-24">
      <SectionIntro eyebrow="Mannequins en vedette" title="Des visages chrome, prêts pour les campagnes internationales.">
        Découvrez des profils pensés pour les directeurs de casting, les maisons de luxe
        et les portfolios orientés mouvement.
      </SectionIntro>

      <div className="mx-auto grid max-w-7xl gap-4 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-12">
        {featuredModels.map((model, index) => (
          <motion.div
            key={model.name}
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.65, delay: index * 0.08, ease: "easeOut" }}
            whileHover={{ y: -8 }}
          >
            <Card className="group relative h-[30rem] overflow-hidden rounded-[8px] border-white/12 bg-white/7 p-0 text-white ring-white/10 backdrop-blur-xl">
              <img
                src={model.image}
                alt={`Portfolio mode de ${model.name}`}
                className="absolute inset-0 h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.88))]" />
              <div className="absolute inset-x-4 bottom-4 border border-white/12 bg-black/42 p-4 backdrop-blur-2xl">
                <p className="text-xs uppercase tracking-[0.26em] text-white/50">
                  {model.city}
                </p>
                <h3 className="mt-2 text-2xl font-semibold">{model.name}</h3>
                <p className="mt-3 text-sm text-[#d9b166]">{model.signal}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
