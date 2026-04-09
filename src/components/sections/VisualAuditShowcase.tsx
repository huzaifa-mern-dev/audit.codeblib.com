"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface Annotation {
  id: number;
  label: string;
  description: string;
  hotspot: { top: string; left: string };
  pathData: string;
  calloutSide: "left" | "right";
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const ANNOTATIONS: Annotation[] = [
  {
    id: 1,
    label: "Generic Headline",
    description: "Doesn't communicate ROI.",
    hotspot: { top: "22%", left: "32%" },
    pathData: "M 32 22 L 12 14",
    calloutSide: "left",
  },
  {
    id: 2,
    label: "Cognitive Overload",
    description: "Too much text killing visitor focus.",
    hotspot: { top: "52%", left: "55%" },
    pathData: "M 55 52 L 74 44",
    calloutSide: "right",
  },
  {
    id: 3,
    label: "Weak Trust Signals",
    description: "Hidden below the fold.",
    hotspot: { top: "74%", left: "74%" },
    pathData: "M 74 74 L 88 82",
    calloutSide: "right",
  },
  {
    id: 4,
    label: "Technical Friction",
    description: "LCP > 2.5s causing bounce.",
    hotspot: { top: "14%", left: "82%" },
    pathData: "M 82 14 L 92 8",
    calloutSide: "right",
  },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function Hotspot({ annotation, index }: { annotation: Annotation; index: number }) {
  const [hovered, setHovered] = useState(false);

  const calloutVariants: Variants = {
    hidden: { opacity: 0, scale: 0.88, y: 6 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 320, damping: 22 },
    },
    exit: { opacity: 0, scale: 0.88, y: 6, transition: { duration: 0.15 } },
  };

  const isRight = annotation.calloutSide === "right";

  return (
    <div
      id={`hotspot-wrapper-${index}`}
      className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
      style={{ top: annotation.hotspot.top, left: annotation.hotspot.left }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Pulsing outer ring */}
      <motion.span
        className="absolute inset-0 rounded-full bg-[#16A085]/30"
        animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ borderRadius: "50%" }}
      />

      {/* Core dot */}
      <motion.button
        className="relative w-7 h-7 rounded-full bg-[#16A085] border-2 border-white/80 shadow-[0_0_0_3px_rgba(22,160,133,0.35)] flex items-center justify-center text-white cursor-crosshair"
        whileHover={{ scale: 1.25 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        aria-label={annotation.label}
      >
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </motion.button>

      {/* Callout card */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute z-40 top-1/2 -translate-y-1/2 w-56 pointer-events-none"
            style={isRight ? { left: "calc(100% + 14px)" } : { right: "calc(100% + 14px)" }}
            variants={calloutVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="bg-[#0D1821]/95 backdrop-blur-md border border-[#16A085]/40 rounded-xl p-4 shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
              {/* Connector nub */}
              <span
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-[#16A085] rotate-45"
                style={isRight ? { left: "-5px" } : { right: "-5px" }}
              />
              <p className="text-[#16A085] text-[11px] font-bold uppercase tracking-[0.1em] mb-1">
                Issue #{annotation.id}
              </p>
              <p className="text-white text-sm font-semibold leading-snug mb-1">
                {annotation.label}
              </p>
              <p className="text-gray-400 text-xs leading-relaxed">{annotation.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Generic Service Website Mockup — pure JSX skeleton
function GenericSiteMockup() {
  return (
    <div className="relative w-full h-full overflow-hidden select-none pointer-events-none">
      {/* Mockup nav */}
      <div className="h-10 bg-white flex items-center px-5 gap-6 border-b border-gray-200">
        <div className="w-20 h-3 bg-gray-400 rounded-full" />
        <div className="flex gap-4 ml-auto">
          {[60, 48, 52, 40].map((w, i) => (
            <div key={i} className="h-2.5 rounded-full bg-gray-300" style={{ width: w }} />
          ))}
          <div className="w-16 h-6 rounded bg-orange-400 flex items-center justify-center">
            <div className="w-8 h-2 rounded-full bg-white/70" />
          </div>
        </div>
      </div>

      {/* Hero area */}
      <div className="bg-gradient-to-br from-slate-700 to-slate-900 px-8 pt-8 pb-6">
        <div className="w-1/2 h-3 bg-white/30 rounded-full mb-3" />
        <div className="w-2/3 h-7 bg-white/50 rounded mb-2" />
        <div className="w-3/5 h-7 bg-white/40 rounded mb-5" />
        <div className="flex gap-2 mb-2">
          {[180, 120].map((w, i) => (
            <div key={i} className="h-3 rounded-full bg-white/25" style={{ width: w }} />
          ))}
        </div>
        <div className="flex gap-3 mt-4">
          <div className="w-28 h-9 rounded bg-orange-400/80" />
          <div className="w-28 h-9 rounded border border-white/30" />
        </div>
      </div>

      {/* Body copy block */}
      <div className="bg-gray-50 px-8 py-6">
        <div className="w-40 h-5 bg-gray-400 rounded mb-3" />
        <div className="flex flex-col gap-2">
          {[100, 90, 95, 85, 100, 70].map((w, i) => (
            <div key={i} className="h-2.5 rounded-full bg-gray-300" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4 mt-5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="bg-white rounded-lg p-3 border border-gray-200 flex flex-col gap-2 shadow-sm">
              <div className="w-6 h-6 rounded bg-orange-200" />
              <div className="h-3 w-3/4 bg-gray-300 rounded-full" />
              <div className="h-2 w-full bg-gray-200 rounded-full" />
              <div className="h-2 w-4/5 bg-gray-200 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Trust logos / below fold */}
      <div className="bg-white px-8 py-4 border-t border-gray-100">
        <div className="w-32 h-3 bg-gray-300 rounded-full mb-3 mx-auto" />
        <div className="flex justify-center gap-6">
          {[48, 56, 44, 60, 40].map((w, i) => (
            <div key={i} className="h-5 rounded bg-gray-200" style={{ width: w }} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-slate-800 flex items-center px-6 gap-4">
        {[60, 48, 52].map((w, i) => (
          <div key={i} className="h-2 rounded-full bg-white/20" style={{ width: w }} />
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export function VisualAuditShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      lineRefs.current.forEach((line, i) => {
        if (!line) return;

        const length = line.getTotalLength();
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });

        gsap.to(line, {
          strokeDashoffset: 0,
          duration: 1.0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
          delay: i * 0.22,
          onComplete: () => {
            // Floating physics per hotspot after line is drawn
            const hotspotId = `hotspot-wrapper-${i}`;
            const el = document.getElementById(hotspotId);
            if (!el) return;
            gsap.to(el, {
              y: gsap.utils.random(-6, 6),
              x: gsap.utils.random(-3, 3),
              duration: gsap.utils.random(2.2, 3.4),
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            });
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-32 px-6 md:px-12 bg-[#0A111A] overflow-hidden"
    >
      {/* Ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#16A085]/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        {/* Section header */}
        <motion.div
          className="text-center mb-14"
          variants={headerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="mb-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#16A085]/10 text-sm font-semibold tracking-wide text-[#16A085] border border-[#16A085]/20">
            Visual Audit
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.12] tracking-[-0.04em] mb-5">
            This Is What a{" "}
            <span className="text-gradient-brand">Leaking Website</span> Looks Like
          </h2>
          <p className="text-gray-400 text-lg max-w-4xl mx-auto leading-relaxed">
            Hover the hotspots to reveal the exact conversion killers we identify and fix in every audit.
          </p>
        </motion.div>

        {/* Browser chrome container */}
        <motion.div
          className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.7)] border border-white/10"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, type: "spring", stiffness: 80, damping: 18 }}
        >
          {/* Browser chrome bar */}
          <div className="bg-[#1C2631] h-11 flex items-center px-4 gap-3 border-b border-white/5 flex-shrink-0">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <span className="w-3 h-3 rounded-full bg-[#28C840]" />
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-[#0D1720] rounded-md h-6 flex items-center px-3 gap-2">
                <svg className="w-3 h-3 text-gray-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                <span className="text-gray-500 text-xs font-mono truncate">genericservices.com.au</span>
                <div className="ml-auto flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-red-400 text-[10px] font-semibold">LCP 3.8s</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content area — mockup + SVG overlay */}
          <div className="relative" style={{ height: 440 }}>
            {/* Dimmed/blurred mockup — darkened for hotspot visibility */}
            <div className="absolute inset-0 overflow-hidden" style={{ filter: "brightness(0.2) blur(0.5px)", transform: "scale(1.01)" }}>
              <GenericSiteMockup />
            </div>

            {/* SVG line-draw layer */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-20"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L6,3 z" fill="#16A085" />
                </marker>
              </defs>
              {ANNOTATIONS.map((ann, i) => (
                <path
                  key={ann.id}
                  ref={(el) => { lineRefs.current[i] = el; }}
                  d={ann.pathData}
                  fill="none"
                  stroke="#16A085"
                  strokeWidth="0.4"
                  strokeLinecap="round"
                  markerEnd="url(#arrowhead)"
                  opacity="0.7"
                />
              ))}
            </svg>

            {/* Hotspot layer */}
            <div className="absolute inset-0 z-30">
              {ANNOTATIONS.map((ann, i) => (
                <Hotspot key={ann.id} annotation={ann} index={i} />
              ))}
            </div>
          </div>

          {/* Status bar */}
          <div className="bg-[#1C2631] h-7 flex items-center px-4 gap-4 border-t border-white/5">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span className="text-[10px] text-red-400 font-mono">Performance: 31/100</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
              <span className="text-[10px] text-yellow-400 font-mono">CLS: 0.28 (Poor)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span className="text-[10px] text-red-400 font-mono">Bounce Rate: 74%</span>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#16A085] animate-pulse" />
              <span className="text-[10px] text-[#16A085] font-mono font-bold">4 Issues Detected</span>
            </div>
          </div>
        </motion.div>

        {/* Annotation legend below */}
        <motion.div
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {ANNOTATIONS.map((ann) => (
            <div
              key={ann.id}
              className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[#16A085]/30 transition-colors duration-300"
            >
              <div className="w-6 h-6 rounded-full bg-[#16A085] flex-shrink-0 flex items-center justify-center text-white text-[10px] font-black mt-0.5">
                {ann.id}
              </div>
              <div>
                <p className="text-white text-sm font-semibold leading-snug">{ann.label}</p>
                <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{ann.description}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
