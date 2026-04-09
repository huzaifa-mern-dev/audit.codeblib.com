"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

const leakagePoints = [
  {
    title: "The Latency Tax",
    description: "Slow load times are killing 40% of your visitor intent.",
    Icon: (
      <svg className="w-8 h-8 text-[var(--brand-teal)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Mobile Frustration",
    description: "Cluttered mobile UI degrades clarity on 4G networks.",
    Icon: (
      <svg className="w-8 h-8 text-[var(--brand-teal)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Friction in Plain Sight",
    description: "Complex forms and ambiguous steps hide conversion leaks.",
    Icon: (
      <svg className="w-8 h-8 text-[var(--brand-teal)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
  },
  {
    title: "Technical Debt",
    description: "Bloated WordPress/Wix sites compound revenue loss daily.",
    Icon: (
      <svg className="w-8 h-8 text-[var(--brand-teal)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
];

export function WhySitesLeak() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 15 } },
  };

  return (
    <section className="relative w-full py-32 px-6 md:px-12 bg-[#1A252F] overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        
        {/* Left Side: Context / Hook */}
        <motion.div 
          className="w-full lg:w-1/3 flex flex-col"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--brand-teal)]/10 text-sm font-semibold tracking-wide text-[var(--brand-teal)] border border-[var(--brand-teal)]/20 w-fit">
            The Problem
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-white leading-[1.15] tracking-[-0.04em]">
            Why High-Traffic Sites <span className="text-gradient-brand">Leak Revenue</span>
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed font-medium">
            Acquiring high-intent traffic is only half the battle. If your infrastructure introduces millisecond delays, you burn capital natively.
          </p>
        </motion.div>

        {/* Right Side: The Grid */}
        <motion.div 
          className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {leakagePoints.map((point, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              className="glass-panel-dark p-8 rounded-2xl flex flex-col gap-4 border border-[rgba(255,255,255,0.05)] shadow-xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--brand-teal)]/5 rounded-full blur-[50px] -mr-10 -mt-10 transition-opacity opacity-0 group-hover:opacity-100" />
              
              <div className="w-14 h-14 rounded-xl bg-[#141E28] border border-[#2C3E50] flex items-center justify-center flex-shrink-0 shadow-inner">
                {point.Icon}
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold text-white mb-2 tracking-tight">{point.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{point.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
