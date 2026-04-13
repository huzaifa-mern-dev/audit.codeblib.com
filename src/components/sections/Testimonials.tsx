"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

const testimonials = [
  {
    company: "Apex Solar Group",
    quote: "The technical latency audit stripped 2.4 seconds off our LCP. Our Google Ads CVR surged 34% in the first month — the ROI paid for itself in week one. They don't just build sites; they engineer conversion physics.",
    name: "Marcus Reyes",
    role: "Managing Director",
    industry: "Commercial Solar",
    location: "Queensland, AU",
    result: "+34% CVR in 30 days",
  },
  {
    company: "BuildCorp Australia",
    quote: "Every agency promised 'more leads.' Codeblib found the actual leak. Eradicating layout shift and form friction alone produced a 4× return on ad spend within 90 days. Concrete, measurable, irreversible.",
    name: "Sarah Jenkins",
    role: "Chief Marketing Officer",
    industry: "Construction & Development",
    location: "New South Wales, AU",
    result: "4× ROAS in 90 days",
  },
  {
    company: "Nova Renewables",
    quote: "We were bleeding 60% of top-of-funnel traffic through hidden mobile friction points. The architectural rebuild was seamless — and we secured 41 new site assessments in the following quarter.",
    name: "Daniel Cho",
    role: "Head of Digital Operations",
    industry: "Renewable Energy",
    location: "Victoria, AU",
    result: "+41 site assessments / Qtr",
  },
];

export function Testimonials() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 15 } },
  };

  return (
    <section className="relative w-full py-32 px-6 md:px-12 bg-[#1A252F] overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Header */}
        <motion.div 
          className="w-full flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-white leading-[1.1] tracking-[-0.04em]">
            Built for <span className="text-[var(--brand-teal)]">Technical Operators.</span>
          </h2>
          <p className="text-gray-400 font-medium max-w-xl mx-auto">
            We don&apos;t sell &apos;pretty&apos; interfaces. We engineer high-velocity lead-generation systems that mathematically guarantee results.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div 
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              className="glass-panel-dark p-10 rounded-2xl flex flex-col border border-slate-800/50 shadow-[0_8px_30px_rgb(0,0,0,0.2)] relative bg-[#0D141C]/50 group hover:border-slate-700/60 transition-colors duration-300"
            >
              {/* Verified badge */}
              <div className="absolute top-6 right-6 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#16A085]/10 border border-[#16A085]/25">
                <svg className="w-3 h-3 text-[#16A085]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-[10px] font-bold text-[#16A085] tracking-wide">VERIFIED CLIENT</span>
              </div>

              {/* Stars */}
              <div className="mb-5 flex items-center gap-1.5">
                {[...Array(5)].map((_, starIdx) => (
                  <svg key={starIdx} className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <polygon
                      points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                      fill="#D4AF6E"
                      stroke="#D4AF6E"
                      strokeWidth="0.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                ))}
              </div>

              {/* Result pill */}
              <div className="mb-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] w-fit">
                <div className="w-1.5 h-1.5 rounded-full bg-[#16A085]" />
                <span className="text-[#16A085] text-[11px] font-bold tracking-wide">{t.result}</span>
              </div>

              <p className="text-gray-300 text-base leading-relaxed font-medium mb-8 flex-grow relative z-10">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex flex-col border-t border-white/[0.05] pt-6 mt-auto gap-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-bold text-white tracking-tight">{t.name}</h4>
                    <p className="text-[var(--brand-teal)] text-[12px] font-semibold tracking-wide mt-0.5">{t.role} · {t.company}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">{t.industry}</span>
                    <span className="text-[10px] text-gray-600 mt-0.5">{t.location}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
