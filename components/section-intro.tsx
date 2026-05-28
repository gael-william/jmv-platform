"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { fadeUp } from "@/components/home-data";

type SectionIntroProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
};

export function SectionIntro({ eyebrow, title, children }: SectionIntroProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="mx-auto mb-10 max-w-7xl px-5 sm:px-8 lg:px-12"
    >
      <p className="text-xs uppercase tracking-[0.34em] text-[#d9b166]">{eyebrow}</p>
      <div className="mt-4 grid gap-5 lg:grid-cols-[0.8fr_0.6fr] lg:items-end">
        <h2 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl">
          {title}
        </h2>
        <p className="max-w-xl text-sm leading-7 text-white/55 sm:text-base">{children}</p>
      </div>
    </motion.div>
  );
}
