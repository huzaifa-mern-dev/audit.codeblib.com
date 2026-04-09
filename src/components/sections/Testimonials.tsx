"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

const testimonials = [
  {
    company: "Apex Solar Group",
    quote: "The technical latency audit stripped 2.4 seconds off our LCP. Our campaign CVR surged by 34% within the first month. They don't just build sites; they engineer conversion physics.",
    name: "Marcus Reyes",
    role: "Managing Director",
    industry: "Commercial Solar",
  },
  {
    company: "BuildCorp Australia",
    quote: "Every agency promised us 'more leads', but Codeblib found the actual leak in our infrastructure. Eradicating layout shift alone resulted in a 4x return on ad spend within 90 days.",
    name: "Sarah Jenkins",
    role: "Chief Marketing Officer",
    industry: "Construction & Development",
  },
  {
    company: "Nova Renewables",
    quote: "We were bleeding 60% of our top-of-funnel traffic due to hidden mobile friction. The architectural rebuild was practically flawlessly transitioned, securing our technical moating.",
    name: "Daniel Cho",
    role: "Head of Digital Operations",
    industry: "Renewable Energy",
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
    <section className="relative w-full py-24 px-6 md:px-12 bg-[#1A252F] overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Header */}
        <motion.div 
          className="w-full flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-white leading-[1.1] tracking-tight">
            Built for <span className="text-[var(--brand-teal)]">Technical Operators.</span>
          </h2>
          <p className="text-gray-400 font-medium max-w-xl mx-auto">
            We don't sell 'pretty' interfaces. We engineer high-velocity lead-generation systems that mathematically guarantee results.
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
              className="glass-panel-dark p-8 md:p-10 rounded-2xl flex flex-col border border-[rgba(255,255,255,0.05)] shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative bg-[#0D141C]/50"
            >
              {/* Quote Mark */}
              <div className="text-[var(--brand-teal)] opacity-20 text-7xl font-heading font-black absolute top-6 right-6 leading-none pointer-events-none">
                "
              </div>
              
              <div className="mb-6 flex items-center gap-2">
                {[...Array(5)].map((_, starIdx) => (
                  <svg key={starIdx} className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-gray-300 text-base leading-relaxed font-medium mb-10 flex-grow relative z-10">
                "{t.quote}"
              </p>

              <div className="flex flex-col border-t border-[rgba(255,255,255,0.05)] pt-6 mt-auto">
                <h4 className="text-lg font-heading font-bold text-white tracking-tight">{t.name}</h4>
                <p className="text-[var(--brand-teal)] text-[13px] font-bold tracking-wide mt-1 uppercase">{t.role}</p>
                <p className="text-gray-500 text-xs font-semibold tracking-wider mt-1.5">{t.company}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
