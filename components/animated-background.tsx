"use client";

import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <motion.div
        aria-hidden="true"
        className="absolute -top-32 left-1/2 h-[34rem] w-[68rem] -translate-x-1/2 bg-[radial-gradient(circle_at_center,rgba(232,234,241,0.18),rgba(170,122,44,0.08)_35%,transparent_68%)] blur-3xl"
        animate={{ x: [-35, 35, -35], opacity: [0.45, 0.8, 0.45] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute bottom-[-18rem] right-[-14rem] h-[42rem] w-[42rem] bg-[conic-gradient(from_130deg,transparent,rgba(43,194,211,0.16),rgba(178,29,69,0.2),transparent)] blur-3xl"
        animate={{ rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
