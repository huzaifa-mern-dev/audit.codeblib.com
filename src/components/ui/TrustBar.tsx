"use client";

import React from "react";

export function TrustBar() {
  return (
    <div className="w-full py-8 mt-16 md:mt-24 mb-4 border-y border-[rgba(255,255,255,0.05)] flex items-center justify-center opacity-90 relative z-20">
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 md:gap-12">
        <p className="text-xs font-semibold tracking-widest uppercase text-gray-300 whitespace-nowrap">
          Verified Credentials
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          {/* AHP Performance Specialist — replaces Upwork to avoid low-cost anchor */}
          <div className="font-heading font-bold text-lg text-white flex items-center gap-2">
            <svg className="w-5 h-5 text-[var(--brand-teal)]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>
              AHP Performance Specialist
              <span className="block text-[10px] font-medium text-gray-400 tracking-wide leading-none mt-0.5">Verified ABN · Australian Business</span>
            </span>
          </div>

          {/* Google Partner — linkable */}
          <a
            href="https://www.google.com/partners/agency?id=codeblib"
            target="_blank"
            rel="noopener noreferrer"
            className="font-heading font-bold text-xl text-white flex items-center gap-2 hover:opacity-100 transition-opacity"
          >
            <span className="text-[var(--brand-blue)] font-black text-2xl">G</span>
            <span>
              Google Partner
              <span className="block text-[10px] font-medium text-gray-400 tracking-wide leading-none mt-0.5">Search &amp; Performance Max Specialization</span>
            </span>
          </a>

          {/* Live Activity ticker — replaces "High-Stakes Digital Teams" */}
          <div className="font-heading font-semibold text-sm text-gray-200 flex items-center gap-2 tracking-tight">
            <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            3 sites audited in the last 48&nbsp;hours
          </div>
        </div>
      </div>
    </div>
  );
}
