"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ChevronRight, Menu, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { navItems } from "@/components/home-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState(navItems[0]?.href ?? "#models");
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 28);
  });

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection?.target.id) {
          setActiveHref(`#${visibleSection.target.id}`);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.18, 0.35, 0.6] }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6"
    >
      <motion.nav
        animate={{
          backgroundColor: isScrolled ? "rgba(0,0,0,0.78)" : "rgba(0,0,0,0.18)",
          borderColor: isScrolled ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.1)",
          boxShadow: isScrolled
            ? "0 18px 90px rgba(0,0,0,0.58), 0 0 34px rgba(217,177,102,0.08)"
            : "0 18px 80px rgba(0,0,0,0.28)",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative mx-auto flex max-w-7xl items-center justify-between overflow-visible border px-4 py-3 text-white backdrop-blur-2xl"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(217,177,102,0.75),transparent)] opacity-70" />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-[linear-gradient(90deg,rgba(255,255,255,0.09),transparent)]"
          animate={{ x: isScrolled ? ["-120%", "520%"] : "-120%" }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        />

        <Link href="/" className="flex items-center gap-3" aria-label="Accueil JMV Vision">
          <motion.span
            className="grid size-9 place-items-center border border-white/20 bg-white/10"
            animate={{ rotate: isScrolled ? 45 : 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <Sparkles className="size-4 text-[#d9b166]" />
          </motion.span>
          <span className="text-sm font-semibold uppercase tracking-[0.32em]">
            JMV Vision
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              href={item.href}
              label={item.label}
              active={activeHref === item.href}
            />
          ))}
        </div>

        <Button
          variant="outline"
          className="hidden h-9 rounded-full border-white/15 bg-white/8 px-4 text-white hover:bg-white hover:text-black md:inline-flex"
        >
          Accès studio
          <ChevronRight className="size-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="relative z-10 border-white/15 bg-white/8 text-white hover:bg-white/15 md:hidden"
          aria-label={mobileOpen ? "Fermer la navigation" : "Ouvrir la navigation"}
          onClick={() => setMobileOpen((value) => !value)}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>

        <AnimatePresence>
          {mobileOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -12, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(10px)" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute inset-x-2 top-[calc(100%+0.75rem)] border border-white/12 bg-black/90 p-3 shadow-[0_28px_90px_rgba(0,0,0,0.7)] backdrop-blur-2xl md:hidden"
            >
              <div className="grid gap-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.22, delay: index * 0.04 }}
                    onClick={() => {
                      setActiveHref(item.href);
                      setMobileOpen(false);
                    }}
                    className={cn(
                      "group flex items-center justify-between border px-4 py-3 text-xs uppercase tracking-[0.26em] transition",
                      activeHref === item.href
                        ? "border-[#d9b166]/45 bg-[#d9b166]/12 text-white"
                        : "border-white/10 bg-white/[0.045] text-white/55 hover:border-white/25 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    {item.label}
                    <ChevronRight className="size-4 text-[#d9b166] transition group-hover:translate-x-1" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.nav>
    </motion.header>
  );
}

function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group relative py-2 text-xs uppercase tracking-[0.24em] transition",
        active
          ? "text-white drop-shadow-[0_0_14px_rgba(217,177,102,0.45)]"
          : "text-white/55 hover:text-white hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.75)]"
      )}
    >
      {label}
      <span
        className={cn(
          "absolute -bottom-1 left-0 h-px bg-[linear-gradient(90deg,rgba(217,177,102,0),rgba(217,177,102,0.95),rgba(217,177,102,0))] transition-all duration-300",
          active ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
        )}
      />
      <span
        className={cn(
          "absolute left-1/2 top-1/2 -z-10 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d9b166]/10 blur-xl transition",
          active ? "opacity-100" : "opacity-0 group-hover:opacity-70"
        )}
      />
    </a>
  );
}
