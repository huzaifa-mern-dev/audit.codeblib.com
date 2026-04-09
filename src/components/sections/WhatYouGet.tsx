"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const pillars = [
  {
    id: 1,
    icon: (
      <svg className="w-6 h-6 text-[#16A085]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    title: "Intent Alignment",
    subtitle: "Are the wrong people landing, or the right people confused?",
    bullets: [
      "Ad-to-page message match — are Solar leads seeing Solar headlines?",
      "Keyword scent continuity across the full enquiry funnel",
      "Above-fold promise vs. CTA coherence — first impression audit",
      "Landing page relevance score vs. competitor benchmarks",
    ],
  },
  {
    id: 2,
    icon: (
      <svg className="w-6 h-6 text-[#16A085]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Wrong Jobs Enquiring",
    subtitle: "Poor-fit leads wasting your quote time and ops budget.",
    bullets: [
      "Value proposition audit — are you attracting tyre-kickers or buyers?",
      "Messaging specificity check — does copy filter for ideal job size?",
      "Trust signal hierarchy — credibility signals driving better-fit enquiries",
      "Benefit-led framing aligned to high-LTV residential/commercial jobs",
    ],
  },
  {
    id: 3,
    icon: (
      <svg className="w-6 h-6 text-[#16A085]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Visitors Not Reaching Contact",
    subtitle: "Identifying every friction point stopping a phone call or form submit.",
    bullets: [
      "Click-to-call friction audit — how many taps to reach you on mobile?",
      "Form field fatigue analysis — drop-off mapped per field",
      "CTA placement and contrast — is your number above the fold on mobile?",
      "Load time per page section — pinpointing the 3-second abandonment cliff",
    ],
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function WhatYouGet() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 36 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 70, damping: 16 },
    },
  };

  return (
    <section className="relative w-full py-32 px-6 md:px-12 bg-[#0F1923] overflow-hidden">
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
        >
          <div className="mb-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#16A085]/10 text-sm font-semibold tracking-wide text-[#16A085] border border-[#16A085]/20">
            Revenue Leak Mapping™
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.12] tracking-[-0.04em] mb-5">
            What Your Audit{" "}
            <span className="text-gradient-brand">Actually Covers</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            A forensic three-pillar diagnostic that maps every point where enquiries drop before reaching your phone or email.
          </p>
        </motion.div>

        {/* 3-column grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.id}
              variants={cardVariants}
              className="group relative flex flex-col p-8 rounded-2xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06] hover:border-[#16A085]/30 transition-all duration-400 overflow-hidden"
            >
              {/* Hover teal glow */}
              <div className="absolute inset-0 bg-[#16A085]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

              {/* Top accent line */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#16A085]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Pillar number */}
              <span className="absolute top-6 right-6 text-[48px] font-black text-white/[0.04] leading-none select-none">
                {String(pillar.id).padStart(2, "0")}
              </span>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-[#16A085]/10 border border-[#16A085]/20 flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-[#16A085]/20 relative z-10">
                {pillar.icon}
              </div>

              {/* Title & subtitle */}
              <h3 className="text-xl font-bold text-white tracking-tight mb-2 relative z-10">
                {pillar.title}
              </h3>
              <p className="text-[#16A085] text-sm font-medium leading-snug mb-6 relative z-10">
                {pillar.subtitle}
              </p>

              {/* Divider */}
              <div className="w-full h-px bg-white/[0.06] mb-6 relative z-10" />

              {/* Bullets */}
              <ul className="flex flex-col gap-3 relative z-10">
                {pillar.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg
                      className="w-4 h-4 text-[#16A085] flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-400 text-sm font-medium leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom trust note */}
        <motion.p
          className="text-center text-gray-600 text-sm mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Delivered as a{" "}
          <span className="text-gray-400 font-semibold">prioritised Loom + PDF report</span>{" "}
          via the Codeblib Revenue Leak Mapping™ system within 48 hours. Zero fluff. Actionable from page one.
        </motion.p>
      </div>
    </section>
  );
}
