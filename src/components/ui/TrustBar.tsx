"use client";

import React from "react";

export function TrustBar() {
  return (
    <div className="w-full py-8 mt-16 md:mt-24 mb-4 border-y border-[rgba(255,255,255,0.05)] flex items-center justify-center opacity-90 relative z-20">
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 md:gap-12">
        <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 whitespace-nowrap">
          Trusted By Experts
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="font-heading font-bold text-lg text-white flex items-center gap-2">
            <span className="text-[var(--brand-teal)] text-2xl">★</span> Upwork Top-Rated
          </div>
          <div className="font-heading font-bold text-xl text-white flex items-center gap-2">
            <span className="text-[var(--brand-blue)] font-black text-2xl">G</span> Google Partner
          </div>
          <div className="font-heading font-bold text-lg text-gray-200 flex items-center gap-2 tracking-tight">
            High-Stakes Digital Teams
          </div>
        </div>
      </div>
    </div>
  );
}
