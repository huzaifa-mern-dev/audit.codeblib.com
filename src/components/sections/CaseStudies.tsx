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
    <section ref={containerRef} className="relative w-full py-24 px-6 md:px-12 bg-[#0A111A] overflow-hidden">
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 text-white leading-[1.1] tracking-tight">
            Proof of <br className="hidden md:block"/>
            <span className="text-[var(--brand-teal)]">Excellence.</span>
          </h2>
          
          <div className="flex flex-col gap-10 mt-4">
            
            {/* Metric 1 */}
            <div className="flex flex-col border-l-2 border-[var(--brand-teal)]/30 pl-6 relative">
               <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-[var(--brand-teal)]" />
               <h3 className="text-5xl md:text-6xl font-heading font-bold text-white tracking-tight flex items-baseline">
                 +<span ref={roasRef}>0</span>%
               </h3>
               <p className="text-gray-400 text-lg mt-2 font-medium">ROAS Improvement</p>
            </div>

            {/* Metric 2 */}
            <div className="flex flex-col border-l-2 border-[var(--brand-blue)]/50 pl-6 relative">
               <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-[var(--brand-blue)]" />
               <h3 className="text-5xl md:text-6xl font-heading font-bold text-white tracking-tight flex items-baseline">
                 +<span ref={convRef}>0</span>%
               </h3>
               <p className="text-gray-400 text-lg mt-2 font-medium">Conversion Increase</p>
            </div>

            {/* Metric 3 */}
            <div className="flex flex-col border-l-2 border-green-500/50 pl-6 relative">
               <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-green-500" />
               <div className="flex items-center gap-4 text-5xl md:text-6xl font-heading font-bold text-white tracking-tight">
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
          <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-video rounded-3xl glass-panel-dark border border-[rgba(255,255,255,0.05)] shadow-2xl flex flex-col items-center justify-center p-8 text-center group overflow-hidden bg-white/5">
             <div className="absolute inset-0 bg-[var(--brand-teal)]/10 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
             
             {/* Wireframe Placeholder Visual */}
             <div className="w-16 h-16 rounded-2xl bg-[#1A252F] border border-[#2C3E50] shadow-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[var(--brand-teal)]/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
             </div>
             <h4 className="text-2xl font-bold text-gray-300 font-heading tracking-tight mb-2">High-Res Project Canvas</h4>
             <p className="text-gray-500 text-sm max-w-sm">Replace this block inside layout with real-world technical charts, lighthouse graphs, or heatmaps demonstrating the outcome.</p>
             
             {/* Faux UI Skeleton inside placeholder */}
             <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[80%] h-[40%] bg-[#121A23] rounded-t-2xl border-t border-x border-[#2C3E50]/50 shadow-2xl opacity-50 flex gap-4 p-6 pointer-events-none">
                 <div className="h-full w-1/3 bg-gray-600/20 rounded-lg" />
                 <div className="flex flex-col gap-3 flex-1">
                    <div className="h-4 w-full bg-gray-600/20 rounded-full" />
                    <div className="h-4 w-3/4 bg-gray-600/20 rounded-full" />
                 </div>
             </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
