"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const interactiveSelector =
  "a, button, input, textarea, select, [role='button'], [data-cursor='interactive']";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const smoothX = useSpring(cursorX, { stiffness: 520, damping: 42, mass: 0.4 });
  const smoothY = useSpring(cursorY, { stiffness: 520, damping: 42, mass: 0.4 });
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const canUseCursor =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!canUseCursor) {
      return;
    }

    function handlePointerMove(event: PointerEvent) {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);

      const target = event.target;
      setHovering(
        target instanceof Element && Boolean(target.closest(interactiveSelector))
      );
    }

    function handlePointerDown() {
      setPressed(true);
    }

    function handlePointerUp() {
      setPressed(false);
    }

    function handlePointerLeave() {
      cursorX.set(-100);
      cursorY.set(-100);
      setHovering(false);
      setPressed(false);
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, [cursorX, cursorY]);

  const size = hovering ? 54 : 18;
  const auraSize = hovering ? 112 : 72;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden mix-blend-screen motion-reduce:hidden md:[@media(pointer:fine)]:block">
      <motion.div
        className="absolute rounded-full border border-[#d9b166]/70 bg-white/10 shadow-[0_0_28px_rgba(217,177,102,0.55)] backdrop-blur-sm"
        style={{
          x: smoothX,
          y: smoothY,
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
        }}
        animate={{
          scale: pressed ? 0.74 : 1,
          opacity: hovering ? 0.92 : 0.78,
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      />
      <motion.div
        className="absolute rounded-full bg-[radial-gradient(circle,rgba(217,177,102,0.28),rgba(255,255,255,0.08)_38%,transparent_68%)]"
        style={{
          x: smoothX,
          y: smoothY,
          width: auraSize,
          height: auraSize,
          marginLeft: -auraSize / 2,
          marginTop: -auraSize / 2,
        }}
        animate={{
          scale: hovering ? 1.12 : 1,
          opacity: pressed ? 0.35 : 0.68,
        }}
        transition={{ duration: 0.24, ease: "easeOut" }}
      />
      <motion.div
        className="absolute h-px w-8 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.8),transparent)]"
        style={{
          x: smoothX,
          y: smoothY,
          marginLeft: -16,
          marginTop: 0,
        }}
        animate={{ rotate: hovering ? 180 : 0, opacity: hovering ? 1 : 0.42 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
      />
    </div>
  );
}
