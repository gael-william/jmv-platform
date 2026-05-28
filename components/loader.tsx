"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

type LoaderProps = {
  show?: boolean;
  duration?: number;
  onComplete?: () => void;
};

export function Loader({ show = true, duration = 2200, onComplete }: LoaderProps) {
  const [dismissed, setDismissed] = useState(false);
  const visible = show && !dismissed;

  useEffect(() => {
    if (!visible || !onComplete) {
      return;
    }

    const timer = window.setTimeout(() => {
      setDismissed(true);
      onComplete();
    }, duration);

    return () => window.clearTimeout(timer);
  }, [duration, onComplete, visible]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[120] grid place-items-center overflow-hidden bg-black text-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(18px)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Chargement JMV Vision"
          role="status"
        >
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(217,177,102,0.2),transparent_30%),radial-gradient(circle_at_72%_18%,rgba(255,255,255,0.1),transparent_26%),linear-gradient(90deg,rgba(0,0,0,0.98),rgba(16,16,18,0.82),rgba(0,0,0,0.98))]"
            animate={{ scale: [1, 1.06, 1], opacity: [0.78, 1, 0.78] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(217,177,102,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-60" />
          <motion.div
            className="absolute left-1/2 top-1/2 h-px w-[86vw] -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(217,177,102,0.95),rgba(255,255,255,0.8),transparent)] shadow-[0_0_52px_rgba(217,177,102,0.7)]"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: [0, 1, 0.65], opacity: [0, 1, 0.6] }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />

          <motion.div
            className="relative grid place-items-center text-center"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
          >
            <motion.div
              className="relative grid size-32 place-items-center rounded-full border border-[#d9b166]/35 bg-white/[0.045] shadow-[0_0_90px_rgba(217,177,102,0.22)] backdrop-blur-2xl sm:size-40"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                className="absolute inset-0 rounded-full border-t border-[#d9b166]"
                animate={{ rotate: 360 }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-5 rounded-full border border-white/12"
                animate={{ rotate: -360 }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              />
              <Sparkles className="size-9 text-[#d9b166] sm:size-11" />
            </motion.div>

            <motion.p
              className="mt-8 text-xs uppercase tracking-[0.48em] text-[#d9b166]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28 }}
            >
              interface mode de luxe
            </motion.p>
            <motion.h1
              className="mt-4 text-4xl font-semibold uppercase tracking-[0.24em] text-white sm:text-6xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.42 }}
            >
              JMV Vision
            </motion.h1>

            <div className="mt-8 h-px w-64 overflow-hidden bg-white/12 sm:w-80">
              <motion.span
                className="block h-full bg-[linear-gradient(90deg,transparent,#d9b166,white,#d9b166,transparent)]"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
