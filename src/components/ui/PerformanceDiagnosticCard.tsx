"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export function PerformanceDiagnosticCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="glass-panel-dark relative w-auto inline-flex items-center gap-4 rounded-xl px-5 py-4 border-t border-[rgba(255,255,255,0.15)] shadow-xl mt-4"
    >
      <motion.div style={{ translateZ: 20 }} className="flex-shrink-0 w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/30">
         <span className="text-green-400 font-black tracking-tighter text-xl">99</span>
      </motion.div>

      <motion.div style={{ translateZ: 30 }} className="flex flex-col mr-4">
        <p className="text-[var(--brand-offwhite)] font-bold text-[15px] tracking-wide m-0 leading-tight">
          Optimized by Codeblib
        </p>
        <p className="text-gray-400 text-xs font-medium mt-0.5 m-0 leading-tight">
          Zero Layout Shift &bull; Sub-1s LCP
        </p>
      </motion.div>
    </motion.div>
  );
}
