"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring, Variants } from "framer-motion";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface Hotspot {
  id: string;
  x: string;
  y: string;
  label: string;
  sublabel: string;
  align: "left" | "right";
}

interface Metric {
  label: string;
  before: string;
  after: string;
}

interface CaseStudy {
  id: number;
  badge: string;
  category: string;
  title: string;
  subtitle: string;
  domain: string;
  imageSrc: string;
  imageAlt: string;
  /** Extra CSS filter applied to the screenshot — used to de-emphasize logos */
  imageFilter?: string;
  hotspots: Hotspot[];
  metrics: Metric[];
  economicLabel: string;
  economicValue: string;
  iconPath: string;
  accentColor: string; // teal | blue | violet
}

// ---------------------------------------------------------------------------
// Case study data — all three active
// ---------------------------------------------------------------------------
const CASE_STUDIES: CaseStudy[] = [
  {
    id: 1,
    badge: "Live Audit",
    category: "eCommerce · Multi-State",
    title: "High-Volume Technical\nInfrastructure",
    subtitle:
      "Performance audit and revenue recovery for a multi-state distribution system.",
    domain: "private-client-1.com.au",
    imageSrc: "/case-studies/nutrifeel-audit.png",
    imageAlt: "eCommerce performance audit — high-volume technical infrastructure",
    hotspots: [
      {
        id: "A",
        x: "22%",
        y: "28%",
        label: "Core Web Vital: Zero CLS Achieved",
        sublabel: "LCP optimised 3.2s → 0.8s · No layout shift",
        align: "right",
      },
      {
        id: "B",
        x: "62%",
        y: "58%",
        label: "Conversion Friction: Removed at Entry",
        sublabel: "Add-to-cart flow rebuilt · Mobile thumb-zone optimised",
        align: "left",
      },
    ],
    metrics: [
      { label: "LCP", before: "3.2s", after: "0.8s" },
      { label: "Enquiries/mo.", before: "—", after: "+41" },
      { label: "Bounce", before: "74%", after: "29%" },
    ],
    economicLabel: "+41 Booked Enquiries/mo.",
    economicValue: "≈ $140,000",
    iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
    accentColor: "#16A085",
  },
  {
    id: 2,
    badge: "Sector Audit",
    category: "Construction · NSW",
    title: "NSW Construction Workforce\nSafety Initiative",
    subtitle:
      "Mobile performance and click-to-call optimisation for on-site workforce training.",
    domain: "private-client-2.com.au",
    imageSrc: "/case-studies/riseup-audit.png",
    imageAlt: "NSW Construction workforce training performance audit",
    // Partial desaturate + darken to de-emphasize the fitness brand logo
    imageFilter: "saturate(0.35) brightness(0.7) contrast(1.1)",
    hotspots: [
      {
        id: "A",
        x: "30%",
        y: "22%",
        label: "Mobile Bounce: Eliminated at Source",
        sublabel: "3.8s → 1.2s load · Job-site signal optimised",
        align: "right",
      },
      {
        id: "B",
        x: "68%",
        y: "55%",
        label: "Click-to-Call: +112% Lift",
        sublabel: "CTA restructure for thumb reach on Android",
        align: "left",
      },
    ],
    metrics: [
      { label: "Mobile Load", before: "3.8s", after: "1.2s" },
      { label: "Click-to-Call", before: "—", after: "+112%" },
      { label: "Bounce", before: "81%", after: "31%" },
    ],
    economicLabel: "Tender Pipeline Unlocked",
    economicValue: "≈ $1.2M",
    iconPath:
      "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    accentColor: "#3498DB",
  },
  {
    id: 3,
    badge: "Sector Audit",
    category: "Architecture · VIC",
    title: "VIC Architectural Finishes\n& Logistics Hub",
    subtitle:
      "Cognitive load reduction and intent alignment for a complex professional services funnel.",
    domain: "private-client-3.com.au",
    imageSrc: "/case-studies/skinsanctuary-audit.png",
    imageAlt: "VIC architectural finishes logistics hub audit",
    // Desaturate to a near-grayscale to anonymize the beauty brand aesthetics
    imageFilter: "saturate(0.2) brightness(0.65) contrast(1.15)",
    hotspots: [
      {
        id: "A",
        x: "28%",
        y: "25%",
        label: "Cognitive Load: Reduced by 68%",
        sublabel: "Navigation restructured · Decision path clarified",
        align: "right",
      },
      {
        id: "B",
        x: "65%",
        y: "52%",
        label: "Form Abandonment: Eliminated",
        sublabel: "Intent-aligned fields · Junk enquiries filtered",
        align: "left",
      },
    ],
    metrics: [
      { label: "Junk Enquiries", before: "High", after: "−68%" },
      { label: "Form CVR", before: "1.4%", after: "4.9%" },
      { label: "Bounce", before: "69%", after: "24%" },
    ],
    economicLabel: "Service Contract Optimised",
    economicValue: "≈ $45k/mo",
    iconPath:
      "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    accentColor: "#8E44AD",
  },
];

// ---------------------------------------------------------------------------
// Hotspot marker
// ---------------------------------------------------------------------------
function HotspotMarker({ spot }: { spot: Hotspot }) {
  const [active, setActive] = useState(false);

  const calloutVariants: Variants = {
    hidden: { opacity: 0, scale: 0.88, y: 6 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 260, damping: 22 },
    },
  };

  return (
    <div
      className="absolute z-20"
      style={{ left: spot.x, top: spot.y, transform: "translate(-50%, -50%)" }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {/* Ping rings */}
      <span className="absolute inset-0 rounded-full bg-[#16A085] opacity-30 animate-ping" />
      <span className="absolute inset-0 scale-150 rounded-full bg-[#16A085] opacity-10 animate-ping [animation-delay:0.4s]" />

      {/* Dot */}
      <div className="relative w-5 h-5 rounded-full bg-[#16A085] border-2 border-white/20 shadow-[0_0_14px_rgba(22,160,133,0.7)] cursor-pointer flex items-center justify-center">
        <span className="text-[8px] font-black text-white leading-none">{spot.id}</span>
      </div>

      {/* Callout tooltip */}
      <AnimatePresence>
        {active && (
          <motion.div
            key={spot.id}
            variants={calloutVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={`absolute top-7 z-30 w-52 rounded-xl border border-[#16A085]/30 bg-[#0D1720]/95 backdrop-blur-md p-3 shadow-2xl pointer-events-none ${
              spot.align === "right" ? "left-0" : "right-0"
            }`}
          >
            {/* Connector caret */}
            <div
              className={`absolute -top-1.5 w-3 h-3 rotate-45 bg-[#0D1720] border-t border-l border-[#16A085]/30 ${
                spot.align === "right" ? "left-3" : "right-3"
              }`}
            />
            <div className="flex items-start gap-2">
              <svg
                className="w-3.5 h-3.5 text-[#16A085] flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="text-white text-[11px] font-bold leading-snug">
                  {spot.label}
                </p>
                <p className="text-gray-400 text-[10px] font-medium mt-0.5 leading-snug">
                  {spot.sublabel}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Safari browser frame — parameterised per card
// ---------------------------------------------------------------------------
function BrowserFrame({
  study,
}: {
  study: CaseStudy;
}) {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.55)] bg-[#1C2733]">
      {/* Chrome bar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#1C2733] border-b border-white/[0.06]">
        {/* Traffic lights */}
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57] shadow-[0_0_5px_rgba(255,95,87,0.5)]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] shadow-[0_0_5px_rgba(255,189,46,0.5)]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C941] shadow-[0_0_5px_rgba(40,201,65,0.5)]" />

        {/* Address bar */}
        <div className="flex-1 mx-2 flex items-center gap-1.5 bg-[#0D1720] rounded px-2 py-0.5 border border-white/[0.05]">
          <svg
            className="w-2.5 h-2.5 text-gray-600 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-[9px] text-gray-600 font-medium truncate tracking-wide">
            {study.domain}
          </span>
        </div>

        {/* Reload + share */}
        {[
          "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
          "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z",
        ].map((d, i) => (
          <svg
            key={i}
            className="w-3 h-3 text-gray-700 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={d} />
          </svg>
        ))}
      </div>

      {/* Screenshot viewport */}
      <div className="relative w-full" style={{ aspectRatio: "16/10" }}>
        {/* Anonymisation tint / blur overlay */}
        <div className="absolute inset-0 bg-[#050D14]/20 z-10 pointer-events-none" />

        <Image
          src={study.imageSrc}
          alt={study.imageAlt}
          fill
          priority={study.id === 1}
          className="object-cover object-top"
          style={study.imageFilter ? { filter: study.imageFilter } : undefined}
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        {/* Hotspots */}
        {study.hotspots.map((spot) => (
          <HotspotMarker key={spot.id} spot={spot} />
        ))}

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0D1118] to-transparent z-10 pointer-events-none" />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Magnetic wrapper — pure CSS spring via Framer Motion useSpring
// ---------------------------------------------------------------------------
function MagneticCard({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 120, damping: 18, mass: 0.6 });
  const springY = useSpring(rawY, { stiffness: 120, damping: 18, mass: 0.6 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rawX.set((e.clientX - cx) * 0.06);
    rawY.set((e.clientY - cy) * 0.06);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY, ...style }}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Case study card
// ---------------------------------------------------------------------------
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 55,
      damping: 17,
      delay: i * 0.13,
    },
  }),
};

function CaseCard({ study }: { study: CaseStudy }) {
  return (
    <MagneticCard>
      <motion.div
        variants={cardVariants}
        custom={study.id - 1}
        className="relative rounded-2xl border border-white/[0.07] overflow-hidden flex flex-col h-full"
        style={{
          background:
            "linear-gradient(145deg, rgba(44,62,80,0.50) 0%, rgba(10,17,26,0.94) 100%)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      >
        {/* Top accent stripe — colour varies per card */}
        <div
          className="h-[3px] w-full flex-shrink-0"
          style={{
            background: `linear-gradient(90deg, ${study.accentColor} 0%, ${study.accentColor}55 60%, transparent 100%)`,
          }}
        />

        <div className="p-5 flex flex-col gap-4 flex-1">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span
                  className="text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full border"
                  style={{
                    color: study.accentColor,
                    backgroundColor: `${study.accentColor}18`,
                    borderColor: `${study.accentColor}40`,
                  }}
                >
                  {study.badge}
                </span>
                <span className="text-[9px] font-semibold text-gray-600 uppercase tracking-wider">
                  {study.category}
                </span>
              </div>
              <h3
                className="text-sm font-bold text-white leading-snug"
                style={{ letterSpacing: "-0.02em" }}
              >
                {study.title.split("\n").map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < study.title.split("\n").length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h3>
              <p className="text-gray-500 text-[10px] font-medium mt-1 leading-snug">
                {study.subtitle}
              </p>
            </div>

            {/* Icon */}
            <div
              className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center border"
              style={{
                backgroundColor: `${study.accentColor}15`,
                borderColor: `${study.accentColor}30`,
              }}
            >
              <svg
                className="w-4 h-4"
                style={{ color: study.accentColor }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={study.iconPath}
                />
              </svg>
            </div>
          </div>

          {/* Browser mockup */}
          <BrowserFrame study={study} />

          {/* Metrics row */}
          <div className="grid grid-cols-3 gap-1.5">
            {study.metrics.map((m) => (
              <div
                key={m.label}
                className="flex flex-col items-center rounded-lg bg-white/[0.03] border border-white/[0.05] py-2 px-1 gap-1"
              >
                <span className="text-[7px] text-gray-600 font-semibold uppercase tracking-widest text-center leading-none">
                  {m.label}
                </span>
                <div className="flex items-center gap-0.5">
                  <span className="text-[9px] font-medium text-red-400/70 line-through">
                    {m.before}
                  </span>
                  <svg
                    className="w-2 h-2 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span
                    className="text-[10px] font-bold"
                    style={{ color: study.accentColor }}
                  >
                    {m.after}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Economic impact */}
          <div
            className="flex items-center justify-between rounded-xl px-4 py-3 mt-auto border"
            style={{
              backgroundColor: `${study.accentColor}08`,
              borderColor: `${study.accentColor}25`,
            }}
          >
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                Economic Impact
              </span>
              <span className="text-white text-[11px] font-bold mt-0.5">
                {study.economicLabel}
              </span>
            </div>
            <div className="text-right">
              <span
                className="text-sm font-black"
                style={{ color: study.accentColor }}
              >
                {study.economicValue}
              </span>
              <span className="block text-[9px] text-gray-500 font-medium">
                /mo. optimised
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </MagneticCard>
  );
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.13, delayChildren: 0.05 },
  },
};

export function ProofOfExcellence() {
  return (
    <section className="relative w-full py-32 px-6 md:px-12 bg-[#08111A] overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-[#16A085]/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Noise grain texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
        >
          <div>
            <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#16A085]/10 text-sm font-semibold tracking-wide text-[#16A085] border border-[#16A085]/20">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Revenue Leak Mapping™ — Category Authority
            </div>
            <h2
              className="text-4xl md:text-5xl font-black text-white leading-[1.08]"
              style={{ letterSpacing: "-0.04em" }}
            >
              Proof of{" "}
              <span className="text-gradient-brand">Excellence.</span>
            </h2>
            <p className="text-gray-400 text-base font-medium mt-3 max-w-xl leading-relaxed">
              Three sectors. Three infrastructure audits. Every result maps exactly where
              enquiries dropped before reaching a phone or inbox.
            </p>
          </div>

          {/* Published counter */}
          <div className="flex-shrink-0 flex items-center gap-3 px-5 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="flex gap-1.5">
              {CASE_STUDIES.map((cs) => (
                <span
                  key={cs.id}
                  className="w-2.5 h-2.5 rounded-full shadow-sm"
                  style={{
                    backgroundColor: cs.accentColor,
                    boxShadow: `0 0 6px ${cs.accentColor}99`,
                  }}
                />
              ))}
            </div>
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">
              3 of 3 published
            </span>
          </div>
        </motion.div>

        {/* 3-column grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {CASE_STUDIES.map((study) => (
            <CaseCard key={study.id} study={study} />
          ))}
        </motion.div>

        {/* Footnote */}
        <motion.p
          className="text-center text-gray-700 text-[11px] font-medium mt-10 tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Client identities anonymised by default · Full case studies available on NDA
          request · All economic figures are revenue potential estimates
        </motion.p>
      </div>
    </section>
  );
}
