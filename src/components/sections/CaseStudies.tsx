"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

export function CaseStudies() {
  const containerRef = useRef<HTMLElement>(null);
  const roasRef = useRef<HTMLSpanElement>(null);
  const convRef = useRef<HTMLSpanElement>(null);
  const lhStartRef = useRef<HTMLSpanElement>(null);
  const lhEndRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          // ROAS counter
          gsap.to({ val: 0 }, {
            val: 288,
            duration: 2.5,
            ease: "power3.out",
            onUpdate: function () {
              if (roasRef.current) roasRef.current.innerText = Math.round(this.targets()[0].val).toString();
            }
          });

          // Conversion counter
          gsap.to({ val: 0 }, {
            val: 136,
            duration: 2.5,
            ease: "power3.out",
            delay: 0.2,
            onUpdate: function () {
              if (convRef.current) convRef.current.innerText = Math.round(this.targets()[0].val).toString();
            }
          });

          // Lighthouse Start counter
          gsap.to({ val: 0 }, {
            val: 32,
            duration: 1.5,
            ease: "power2.out",
            delay: 0.4,
            onUpdate: function () {
              if (lhStartRef.current) lhStartRef.current.innerText = Math.round(this.targets()[0].val).toString();
            }
          });

          // Lighthouse End counter
          gsap.to({ val: 0 }, {
            val: 99,
            duration: 2.5,
            ease: "power2.out",
            delay: 0.6,
            onUpdate: function () {
              if (lhEndRef.current) lhEndRef.current.innerText = Math.round(this.targets()[0].val).toString();
            }
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-32 px-6 md:px-12 bg-[#0A111A] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A252F] to-[#0A111A] opacity-50 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center relative z-10">
        
        {/* Left Side: Commercial Impact Data */}
        <motion.div 
          className="w-full lg:w-5/12 flex flex-col"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-sm font-semibold tracking-wide text-gray-300 border border-white/10 w-fit">
            Commercial Impact
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 text-white leading-[1.1] tracking-[-0.04em]">
            Proof of <br className="hidden md:block"/>
            <span className="text-[var(--brand-teal)]">Excellence.</span>
          </h2>
          
          <div className="flex flex-col gap-10 mt-4">
            
            {/* Metric 1 */}
            <div className="flex flex-col border-l-2 border-[var(--brand-teal)]/30 pl-6 relative">
               <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-[var(--brand-teal)]" />
             <h3 className="text-6xl md:text-7xl font-heading font-bold text-white tracking-tight flex items-baseline" style={{ textShadow: "0 0 30px rgba(22,160,133,0.35)" }}>
                 +<span ref={roasRef}>0</span>%
               </h3>
               <p className="text-gray-400 text-lg mt-2 font-medium">ROAS Improvement</p>
            </div>

            {/* Metric 2 */}
            <div className="flex flex-col border-l-2 border-[var(--brand-blue)]/50 pl-6 relative">
               <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-[var(--brand-blue)]" />
               <h3 className="text-6xl md:text-7xl font-heading font-bold text-white tracking-tight flex items-baseline" style={{ textShadow: "0 0 30px rgba(52,152,219,0.35)" }}>
                 +<span ref={convRef}>0</span>%
               </h3>
               <p className="text-gray-400 text-lg mt-2 font-medium">Conversion Increase</p>
            </div>

            {/* Metric 3 */}
            <div className="flex flex-col border-l-2 border-green-500/50 pl-6 relative">
               <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-green-500" />
               <div className="flex items-center gap-4 text-6xl md:text-7xl font-heading font-bold text-white tracking-tight" style={{ textShadow: "0 0 30px rgba(74,222,128,0.3)" }}>
                 <span ref={lhStartRef} className="text-red-400">0</span>
                 <span className="text-3xl text-gray-600 block translate-y-[-5px]">&rarr;</span>
                 <span ref={lhEndRef} className="text-green-400">0</span><span className="text-green-400 text-4xl">+</span>
               </div>
               <p className="text-gray-400 text-lg mt-2 font-medium">Lighthouse Core Vitals</p>
            </div>

          </div>
        </motion.div>

        {/* Right Side: Gigantic Image Canvas Placeholder */}
        <motion.div 
          className="w-full lg:w-7/12"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.2 }}
        >
          <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-video rounded-3xl border border-[rgba(255,255,255,0.07)] shadow-2xl overflow-hidden bg-[#0D1720] flex flex-col">
             {/* Top accent stripe */}
             <div className="h-1 w-full bg-gradient-to-r from-[#16A085] via-[#1ABC9C] to-transparent flex-shrink-0" />

             <div className="flex flex-col h-full p-7 md:p-8 relative overflow-hidden">
               {/* Background glow */}
               <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#16A085]/8 rounded-full blur-[80px] pointer-events-none" />

               {/* Card header */}
               <div className="flex items-start justify-between mb-5 relative z-10">
                 <div>
                   <div className="flex items-center gap-2 mb-2">
                     <span className="text-[10px] font-bold tracking-widest uppercase text-[#16A085] bg-[#16A085]/10 border border-[#16A085]/25 px-2.5 py-1 rounded-full">Project Spotlight</span>
                     <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Renewable Energy</span>
                   </div>
                   <h4 className="text-xl md:text-2xl font-black text-white tracking-[-0.03em] leading-snug">
                     QLD Solar: Scaling<br />Residential Installs.
                   </h4>
                 </div>
                 <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#16A085]/10 border border-[#16A085]/20 flex items-center justify-center">
                   <svg className="w-5 h-5 text-[#16A085]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                   </svg>
                 </div>
               </div>

               {/* Primary metric — with baseline for magnitude */}
               <div className="mb-5 relative z-10">
                 <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                   Previously averaging <span className="text-gray-400">11 enquiries/mo.</span> &rarr; Now:
                 </p>
                 <div className="flex items-baseline gap-2">
                   <span className="text-5xl md:text-6xl font-black text-white tracking-tight" style={{ textShadow: "0 0 30px rgba(22,160,133,0.4)" }}>+41</span>
                   <div className="flex flex-col">
                     <span className="text-[#16A085] font-bold text-sm leading-tight">booked site</span>
                     <span className="text-[#16A085] font-bold text-sm leading-tight">assessments</span>
                   </div>
                 </div>
                 <p className="text-gray-500 text-xs font-medium mt-1 tracking-wide">in 90 days post-audit &middot; Zero additional ad spend</p>
               </div>

               {/* Before / After table */}
               <div className="relative z-10 flex-1 flex flex-col justify-end">
                 <div className="grid grid-cols-3 gap-1 mb-2">
                   <span className="text-[9px] text-gray-600 uppercase tracking-widest font-semibold">Metric</span>
                   <span className="text-[9px] text-gray-600 uppercase tracking-widest font-semibold text-center">Before</span>
                   <span className="text-[9px] text-[#16A085] uppercase tracking-widest font-semibold text-center">After</span>
                 </div>
                 {[
                   { label: "LCP", before: "4.1s", after: "0.9s" },
                   { label: "Form CVR", before: "1.2%", after: "4.7%" },
                   { label: "Mobile Bounce", before: "71%", after: "28%" },
                   { label: "Installs/mo.", before: "11", after: "+41" },
                 ].map((row) => (
                   <div key={row.label} className="grid grid-cols-3 gap-1 py-2 border-t border-white/[0.04]">
                     <span className="text-xs font-semibold text-gray-400">{row.label}</span>
                     <span className="text-xs font-medium text-red-400/80 text-center">{row.before}</span>
                     <span className="text-xs font-bold text-[#16A085] text-center">{row.after}</span>
                   </div>
                 ))}

                 {/* Economic translation */}
                 <div className="mt-3 pt-3 border-t border-[#16A085]/20 flex flex-col gap-1">
                   <div className="flex items-center justify-between">
                     <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Economic Impact</span>
                     <span className="text-[10px] text-gray-600 font-medium">90-day window</span>
                   </div>
                   <div className="flex items-baseline justify-between mt-1">
                     <span className="text-xs font-semibold text-white">+30 additional installs/mo.</span>
                     <span className="text-[10px] font-bold text-[#16A085]">Est. $120K–$240K/mo.</span>
                   </div>
                   <p className="text-[9px] text-gray-600 font-medium tracking-wide">in recovered revenue potential &middot; avg. $4K–$8K install value</p>
                 </div>
               </div>
             </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
