"use client";

import gsap from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  MouseEvent,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type UniverseTransitionContextValue = {
  startTransition: (href: string) => void;
  active: boolean;
};

const UniverseTransitionContext = createContext<UniverseTransitionContextValue | null>(
  null
);

export function UniverseTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [targetHref, setTargetHref] = useState<string | null>(null);
  const [navigating, setNavigating] = useState(false);

  const startTransition = useCallback(
    (href: string) => {
      if (active || href === pathname) {
        return;
      }

      setTargetHref(href);
      setNavigating(false);
      setActive(true);
    },
    [active, pathname]
  );

  useEffect(() => {
    if (!active || !targetHref || !overlayRef.current || !ringRef.current || !beamRef.current) {
      return;
    }

    const timeline = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        setNavigating(true);
        router.push(targetHref);
      },
    });

    timeline
      .set(overlayRef.current, { opacity: 1, pointerEvents: "auto" })
      .fromTo(
        ringRef.current,
        { scale: 0.24, rotate: -22, opacity: 0 },
        { scale: 1.08, rotate: 32, opacity: 1, duration: 0.72 }
      )
      .fromTo(
        beamRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.42 },
        "-=0.4"
      )
      .to(ringRef.current, { scale: 1.36, duration: 0.36, ease: "power2.inOut" }, "-=0.1");

    return () => {
      timeline.kill();
    };
  }, [active, router, targetHref]);

  useEffect(() => {
    if (!active || !navigating || !targetHref || pathname !== targetHref) {
      return;
    }

    const timeline = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => {
        setActive(false);
        setTargetHref(null);
        setNavigating(false);
      },
    });

    timeline
      .to(beamRef.current, { opacity: 0, scaleX: 0.12, duration: 0.32 })
      .to(ringRef.current, { scale: 2.4, opacity: 0, filter: "blur(18px)", duration: 0.52 }, "-=0.22")
      .to(overlayRef.current, { opacity: 0, duration: 0.35 }, "-=0.2");

    return () => {
      timeline.kill();
    };
  }, [active, navigating, pathname, targetHref]);

  const value = useMemo(
    () => ({ startTransition, active }),
    [active, startTransition]
  );

  return (
    <UniverseTransitionContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {active ? (
          <motion.div
            ref={overlayRef}
            className="fixed inset-0 z-[90] grid place-items-center overflow-hidden bg-black/92 opacity-0 backdrop-blur-xl"
            initial={false}
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,177,102,0.22),transparent_28%),radial-gradient(circle_at_50%_58%,rgba(255,36,75,0.26),transparent_32%),linear-gradient(90deg,rgba(0,0,0,0.92),rgba(0,0,0,0.42),rgba(0,0,0,0.92))]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(217,177,102,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(217,177,102,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-70" />
            <div
              ref={beamRef}
              className="absolute left-1/2 top-1/2 h-px w-[88vw] origin-center -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(217,177,102,0.98),rgba(255,255,255,0.88),rgba(255,36,75,0.92),transparent)] opacity-0 shadow-[0_0_54px_rgba(217,177,102,0.85)]"
            />
            <div
              ref={ringRef}
              className="relative grid size-[18rem] place-items-center rounded-full border border-[#d9b166]/35 bg-[radial-gradient(circle,rgba(255,255,255,0.12),rgba(217,177,102,0.06)_42%,transparent_66%)] shadow-[0_0_110px_rgba(217,177,102,0.28)] sm:size-[28rem]"
            >
              <div className="absolute inset-8 rounded-full border border-[#ff244b]/25" />
              <div className="absolute inset-16 rounded-full border border-white/12" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-t border-[#ff244b]/80"
              />
              <div className="grid text-center">
                <Sparkles className="mx-auto size-8 text-[#d9b166]" />
                <p className="mt-5 text-xs uppercase tracking-[0.42em] text-white/58">
                  passage dimensionnel
                </p>
                <p className="mt-3 text-2xl font-semibold uppercase tracking-[0.2em] text-white sm:text-4xl">
                  portail ouvert
                </p>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </UniverseTransitionContext.Provider>
  );
}

export function useUniverseTransition() {
  const context = useContext(UniverseTransitionContext);

  if (!context) {
    throw new Error("useUniverseTransition doit être utilisé dans UniverseTransitionProvider");
  }

  return context;
}

export function UniverseTransitionLink({
  href,
  children,
  className,
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  const { startTransition } = useUniverseTransition();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    event.preventDefault();
    startTransition(href);
  }

  return (
    <a href={href} className={className} aria-label={ariaLabel} onClick={handleClick}>
      {children}
    </a>
  );
}
