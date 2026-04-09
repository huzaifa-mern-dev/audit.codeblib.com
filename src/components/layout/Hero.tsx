"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { PerformanceDiagnosticCard } from "@/components/ui/PerformanceDiagnosticCard";
import { AuditForm } from "@/components/ui/AuditForm";
import { TrustBar } from "@/components/ui/TrustBar";

export function Hero() {
  const leftColVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    show: { 
      opacity: 1, 
      x: 0, 
      transition: { type: "spring", stiffness: 70, damping: 15 } 
    },
  };

  return (
    <section className="relative w-full min-h-[100vh] pt-32 pb-4 lg:pb-8 px-6 md:px-12 flex flex-col justify-between overflow-hidden z-10 bg-[var(--brand-midnight)]">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-20">
        <div className="absolute top-[-5%] left-[-5%] w-[400px] h-[400px] bg-white/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full flex-grow grid grid-cols-1 lg:grid-cols-2 lg:gap-16 items-center z-10 pt-10">
        
        {/* Left Side: Hook & Proof */}
        <motion.div 
          className="flex flex-col items-start text-left w-full pb-12 lg:pb-0"
          variants={leftColVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants} className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-sm font-semibold tracking-wide text-gray-200 border border-white/10 backdrop-blur-sm self-start shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Solar &amp; Construction CRO Specialists
          </motion.div>

          <motion.h1 
            variants={itemVariants} 
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 text-white leading-[1.12] tracking-[-0.03em]"
          >
            Every week your site is slow, a competitor books{" "}
            <span className="text-gradient-brand">the job you quoted.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-sm font-semibold text-[var(--brand-teal)] tracking-wide mb-5 uppercase"
          >
            Trusted by Solar &amp; Construction businesses across Australia.
          </motion.p>

          <motion.p 
            variants={itemVariants} 
            className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed font-medium max-w-lg"
          >
            Right now, your site is losing{" "}
            <span className="text-white font-semibold">10–30% of enquiries</span>{" "}
            — that’s missed site visits, lost tenders, and jobs going to competitors with faster pages.
          </motion.p>
          
          <motion.div variants={itemVariants} className="w-full hidden lg:flex">
             <PerformanceDiagnosticCard />
          </motion.div>
        </motion.div>

        {/* Right Side: Direct Audit Form */}
        <div id="hero-form" className="w-full h-full flex items-center justify-center lg:justify-end relative">
          <AuditForm />
        </div>

      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-8 lg:mt-0"
      >
        <TrustBar />
      </motion.div>
    </section>
  );
}
