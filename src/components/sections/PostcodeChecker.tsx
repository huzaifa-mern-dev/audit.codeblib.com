"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Simulated postcode data — in production, connect to a real exclusivity API
const LOCKED_POSTCODES: Record<string, string> = {
  "4000": "Brisbane CBD",
  "2000": "Sydney CBD",
  "3000": "Melbourne CBD",
};

export function PostcodeChecker() {
  const [postcode, setPostcode] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "available" | "locked">("idle");

  const check = () => {
    if (postcode.length < 4) return;
    setStatus("checking");
    // Simulate async lookup
    setTimeout(() => {
      setStatus(LOCKED_POSTCODES[postcode] ? "locked" : "available");
    }, 900);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") check();
  };

  return (
    <section className="relative w-full py-20 md:py-24 px-6 md:px-12 bg-[#070E15] overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#16A085]/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="flex flex-col items-center text-center"
        >
          {/* Eyebrow */}
          <div className="mb-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-sm font-semibold tracking-wide text-red-400 border border-red-500/20">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Postcode Exclusivity Lock
          </div>

          {/* Headline */}
          <h2
            className="text-3xl md:text-4xl font-black text-white leading-[1.1] tracking-[-0.03em] mb-4"
            style={{ letterSpacing: "-0.03em" }}
          >
            We only work with{" "}
            <span className="text-gradient-brand">one business per postcode.</span>
          </h2>

          {/* Sub-copy */}
          <p className="text-gray-400 text-base max-w-xl mx-auto leading-relaxed mb-8 font-medium">
            To maintain a competitive edge, once we onboard a Solar or Construction client in your area, we{" "}
            <span className="text-white font-semibold">permanently reject their competitors</span>.
            Check if your postcode is still available.
          </p>

          {/* Input row */}
          <div className="w-full max-w-sm flex gap-3">
            <input
              type="text"
              value={postcode}
              onChange={(e) => {
                setPostcode(e.target.value.replace(/\D/g, "").slice(0, 4));
                setStatus("idle");
              }}
              onKeyDown={handleKeyDown}
              placeholder="Enter postcode (e.g. 4000)"
              maxLength={4}
              className="flex-1 bg-[#0D1720] border border-[#2C3E50] focus:border-[#16A085] focus:shadow-[0_0_12px_rgba(22,160,133,0.35)] rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm font-medium focus:outline-none transition-all shadow-inner"
            />
            <button
              onClick={check}
              disabled={postcode.length < 4 || status === "checking"}
              className="flex-shrink-0 px-5 py-3 rounded-xl bg-[#16A085] text-white text-sm font-bold tracking-wide hover:bg-[#1abc9c] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-[0_4px_16px_rgba(22,160,133,0.3)]"
            >
              {status === "checking" ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : "Check"}
            </button>
          </div>

          {/* Status output */}
          <AnimatePresence mode="wait">
            {status === "available" && (
              <motion.div
                key="available"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="mt-4 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#16A085]/10 border border-[#16A085]/30 text-sm text-[#16A085] font-semibold"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>
                  Postcode <span className="text-white">{postcode}</span> is available.{" "}
                  <span className="text-gray-300 font-medium">Claim your exclusivity now.</span>
                </span>
              </motion.div>
            )}
            {status === "locked" && (
              <motion.div
                key="locked"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="mt-4 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/25 text-sm text-red-400 font-semibold"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>
                  <span className="text-white">{postcode}</span> ({LOCKED_POSTCODES[postcode]}) is{" "}
                  <span className="text-red-300 font-bold">locked</span> — a competitor already has exclusivity in this area.
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trust footnote */}
          <p className="mt-6 text-[11px] text-gray-600 font-medium max-w-sm mx-auto leading-relaxed">
            Exclusivity is enforced by written contract. Once your postcode is claimed, we permanently decline enquiries from competing businesses in the same category.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
