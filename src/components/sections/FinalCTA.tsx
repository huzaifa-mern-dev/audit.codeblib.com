"use client";

import React, { useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";
import gsap from "gsap";
import { useLenis } from "lenis/react";
import { Magnetic } from "@/components/ui/Magnetic";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function FinalCTA() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const lenis = useLenis();

  function scrollToHeroForm() {
    const target = document.getElementById("hero-form");
    if (!target) return;
    if (lenis) {
      lenis.scrollTo(target, { offset: -80, duration: 1.6, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  // GSAP shimmer sweep on the button
  useEffect(() => {
    if (!btnRef.current) return;

    const shimmer = btnRef.current.querySelector<HTMLElement>(".btn-shimmer");
    if (!shimmer) return;

    gsap.to(shimmer, {
      x: "260%",
      duration: 1.6,
      ease: "power2.inOut",
      repeat: -1,
      repeatDelay: 3.5,
    });
  }, []);

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 32 },
    show: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full py-32 px-6 md:px-12 bg-[#2C3E50] overflow-hidden"
    >
      {/* Layered ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary teal orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#16A085]/12 rounded-full blur-[140px]" />
        {/* Top-left subtle light */}
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-white/[0.03] rounded-full blur-[80px]" />
        {/* Bottom-right accent */}
        <div className="absolute bottom-0 right-0 w-[250px] h-[250px] bg-[#16A085]/8 rounded-full blur-[100px]" />
      </div>

      {/* Noise grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center">
        {/* Eyebrow label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          custom={0}
          viewport={{ once: true, margin: "-60px" }}
          className="mb-8 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#16A085]/15 text-sm font-semibold tracking-[0.06em] text-[#16A085] border border-[#16A085]/30 uppercase"
        >
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16A085] opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16A085]" />
          </span>
          Free Audit — Limited Spots
        </motion.div>

        {/* Main headline — -0.03em tracking strictly enforced */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          custom={0.1}
          viewport={{ once: true, margin: "-60px" }}
          style={{ letterSpacing: "-0.03em" }}
          className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.06] mb-7"
        >
          Ready to Plug Your{" "}
          <span className="text-gradient-brand">Conversion Leaks?</span>
        </motion.h2>

        {/* Sub-headline */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          custom={0.2}
          viewport={{ once: true, margin: "-60px" }}
          className="text-xl text-gray-300 leading-relaxed max-w-2xl mb-6 font-medium"
        >
          Get a custom, prioritised performance roadmap for your Solar or Construction business.{" "}
          <span className="text-white font-semibold">100% Free.</span>{" "}
          <span className="text-gray-400">No Obligation.</span>
        </motion.p>

        {/* Scarcity signal */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          custom={0.25}
          viewport={{ once: true, margin: "-60px" }}
          className="mb-8 w-full max-w-sm mx-auto px-5 py-3.5 rounded-xl border border-amber-500/20 bg-amber-500/5 flex items-start gap-3"
        >
          <svg className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p className="text-amber-300 text-[12px] font-semibold leading-snug">
            We limit reviews to <span className="text-white">4 businesses per month</span> to ensure depth.{" "}
            <span className="text-amber-300 font-bold">2 spots remaining for April.</span>
          </p>
        </motion.div>

        {/* Magnetic CTA button */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          custom={0.3}
          viewport={{ once: true, margin: "-60px" }}
        >
          <Magnetic intensity={0.5}>
            <button
              ref={btnRef}
              onClick={scrollToHeroForm}
              className="relative group inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-[#16A085] text-white text-lg font-bold overflow-hidden shadow-[0_0_50px_rgba(22,160,133,0.4)] hover:shadow-[0_0_70px_rgba(22,160,133,0.6)] transition-shadow duration-500"
            >
              {/* Shimmer sweep */}
              <span className="btn-shimmer absolute top-0 left-[-65%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-20deg] pointer-events-none" />

              {/* Icon */}
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>

              <span className="relative z-10">Get My Free Performance Audit</span>

              {/* Inner highlight */}
              <span className="absolute inset-0 rounded-2xl ring-1 ring-white/20 pointer-events-none" />
            </button>
          </Magnetic>
        </motion.div>

        {/* Human escape hatch — captures high-intent buyers who want direct contact */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          custom={0.38}
          viewport={{ once: true, margin: "-60px" }}
          className="mt-4"
        >
          <a
            href="https://cal.com/codeblib/15min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors duration-200 font-medium group"
          >
            <svg className="w-4 h-4 text-gray-500 group-hover:text-[#16A085] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Prefer to talk? Book a 15-min discovery call
            <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>

        {/* Social proof micro-copy */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          custom={0.45}
          viewport={{ once: true, margin: "-60px" }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-sm text-gray-500"
        >
          {[
            "No credit card required",
            "Delivered in 48 hours",
            "Actionable from page one",
          ].map((item, i) => (
            <span key={i} className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-[#16A085]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {item}
              {i < 2 && <span className="hidden sm:block text-gray-700 ml-4">·</span>}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
