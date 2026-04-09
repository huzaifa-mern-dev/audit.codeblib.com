"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { Magnetic } from "@/components/ui/Magnetic";
import { Button } from "@/components/ui/Button";
import { CustomSelect } from "@/components/ui/CustomSelect";

type GoalType = "Generate Leads" | "Increase Sales" | "Brand Awareness" | "";
type AdSpendType = "<$2k" | "$2k-$10k" | "$10k+" | "";

interface FormData {
  url: string;
  goal: GoalType;
  adSpend: AdSpendType;
  competitor: string;
  email: string;
  company: string;
}

export function AuditForm() {
  const [step, setStep] = useState(1);
  const [isShaking, setIsShaking] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    url: "",
    goal: "",
    adSpend: "",
    competitor: "",
    email: "",
    company: "",
  });

  const scoreRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP Trust Anchor initialization
  useEffect(() => {
    const ctx = gsap.context(() => {
      const counter = { val: 0 };
      gsap.to(counter, {
        val: 99,
        duration: 2.5,
        ease: "power2.out",
        delay: 0.6,
        onUpdate: () => {
          if (scoreRef.current) {
            scoreRef.current.innerText = Math.round(counter.val).toString();
            const progress = counter.val / 100;
            let color = "#E74C3C"; 
            if (progress > 0.5) color = "#F1C40F"; 
            if (progress > 0.8) color = "#16A085"; 
            scoreRef.current.style.color = color;
            scoreRef.current.style.textShadow = `0 0 ${progress * 10}px ${color}`;
          }
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 400);
  };

  const isStep1Valid = formData.url.length > 5 && formData.url.includes(".");
  const isStep2Valid = true; 
  const isStep3Valid = formData.email.includes("@") && formData.email.includes(".") && formData.company.length > 1;

  const handleNext = () => {
    if (step === 1 && !isStep1Valid) return triggerShake();
    if (step === 2 && !isStep2Valid) return triggerShake();
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 3 && !isStep3Valid) return triggerShake();
    console.log("Form payload:", formData);
  };

  // Animation variants
  const variants = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  const progressPercentage = (step / 3) * 100;

  return (
    <div className="relative w-full max-w-md mx-auto perspective-1000">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] bg-[var(--brand-teal)]/20 blur-[100px] -z-10 rounded-full" />
      
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : { opacity: 1, scale: 1, y: 0, x: 0 }}
        transition={isShaking ? { duration: 0.4 } : { duration: 0.8, delay: 0.3, type: "spring", bounce: 0.3 }}
        className="glass-panel-dark relative w-full p-0 rounded-3xl border border-[rgba(255,255,255,0.1)] shadow-2xl z-20 overflow-hidden"
        style={{ background: "linear-gradient(145deg, rgba(44, 62, 80, 0.7) 0%, rgba(20, 30, 40, 0.9) 100%)" }}
      >
        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-[#0a111a]/50">
          <motion.div 
            className="h-full bg-[var(--brand-teal)] origin-left"
            initial={{ width: "33%" }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ ease: "easeInOut", duration: 0.4 }}
          />
        </div>

        <div className="p-7 md:p-8">
          {/* GSAP Trust Anchor */}
          <div className="flex items-center gap-4 mb-8 bg-white/5 border border-white/10 rounded-xl p-3 shadow-inner">
            <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-[var(--brand-teal)]/50 shadow-[0_0_15px_rgba(22,160,133,0.3)] bg-[#101b26] flex-shrink-0">
               <span ref={scoreRef} className="text-xl font-bold font-heading tabular-nums text-red-500 tracking-tighter">0</span>
            </div>
            <div>
              <p className="text-white text-[13px] font-bold tracking-wide m-0 leading-tight">Target Metric Frame</p>
              <p className="text-gray-400 text-[11px] m-0 mt-0.5 leading-tight">Unlock your conversion ceiling.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="relative min-h-[460px]">
              <AnimatePresence mode="wait">
                
                {/* STEP 1 */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex flex-col gap-4 absolute inset-0"
                  >
                    <div>
                      <h3 className="text-lg font-heading font-bold text-white mb-1">Your Website URL</h3>
                      <p className="text-gray-400 text-[11px] font-medium tracking-wide">We&apos;ll scan it for conversion leaks — free.</p>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="url" className="text-[11px] font-bold text-gray-300 uppercase tracking-widest pl-1 border-l-2 border-[var(--brand-teal)]/50 leading-none py-0.5">Page URL</label>
                      <input 
                        type="url" 
                        id="url"
                        value={formData.url}
                        onChange={(e) => setFormData({...formData, url: e.target.value})}
                        placeholder="https://mysolarcompany.com.au" 
                        className={`w-full bg-[#1A252F] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-all shadow-inner text-sm border ${
                          isStep1Valid
                            ? "border-[#16A085] shadow-[0_0_16px_rgba(22,160,133,0.45)]"
                            : "border-[#2C3E50] focus:border-[var(--brand-teal)] focus:shadow-[0_0_12px_rgba(22,160,133,0.4)]"
                        }`}
                      />
                    </div>

                    {/* Guarantee blocks — Standalone + Pitch Filter + Delivery */}
                    <div className="flex flex-col gap-2 px-1">
                      {[
                        { icon: "shield", text: "No sales calls. This audit is a standalone technical document. No follow-up unless you request it." },
                        { icon: "filter", text: "If no clear revenue loss is identified, we won't pitch our services. We only work where we can prove massive upside." },
                        { icon: "clock", text: "Delivered as a prioritised PDF report within 2 business days via the Revenue Leak Mapping\u2122 system." },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <div className="flex-shrink-0 w-5 h-5 rounded-md bg-[#16A085]/10 border border-[#16A085]/20 flex items-center justify-center mt-[1px]">
                            {item.icon === "shield" && (
                              <svg className="w-3 h-3 text-[#16A085]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                            )}
                            {item.icon === "filter" && (
                              <svg className="w-3 h-3 text-[#16A085]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                            )}
                            {item.icon === "clock" && (
                              <svg className="w-3 h-3 text-[#16A085]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            )}
                          </div>
                          <p className="text-[10.5px] text-gray-500 font-medium leading-snug">{item.text}</p>
                        </div>
                      ))}
                    </div>

                    <CustomSelect 
                      id="goal"
                      label="Primary Goal"
                      value={formData.goal}
                      onChange={(val) => setFormData({...formData, goal: val as GoalType})}
                      placeholder="Select an objective"
                      options={[
                        { label: "Generate Enquiries", value: "Generate Leads" },
                        { label: "Win More Jobs / Tenders", value: "Increase Sales" },
                        { label: "Brand Awareness", value: "Brand Awareness" }
                      ]}
                    />

                    <div className="mt-auto flex flex-col gap-3">
                      <Magnetic intensity={0.15}>
                        <div className="w-full cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform">
                          <Button 
                            type="button" 
                            onClick={handleNext}
                            variant="primary" 
                            className="w-full px-8 py-3.5 shadow-[0_4px_20px_rgba(22,160,133,0.3)] font-bold tracking-wide"
                          >
                            Next Step &rarr;
                          </Button>
                        </div>
                      </Magnetic>

                      {/* Sample Audit Thumbnail Card */}
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        aria-label="Unlock a sample performance audit report (PDF)"
                        className="group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06] hover:border-[#16A085]/30 transition-all duration-200 p-2.5 overflow-hidden"
                      >
                        {/* Diagnostic Fragment thumbnail */}
                        <div className="relative flex-shrink-0 w-14 h-10 rounded-lg overflow-hidden bg-[#0D1720] border border-white/10">
                          <div className="absolute inset-0 flex flex-col gap-1 p-1.5">
                            <div className="h-1.5 w-full rounded bg-[#16A085]/40" />
                            <div className="h-1 w-3/4 rounded bg-white/20" />
                            <div className="h-1 w-full rounded bg-white/10" />
                            <div className="h-1 w-5/6 rounded bg-white/10" />
                            <div className="grid grid-cols-2 gap-1 mt-0.5">
                              <div className="h-2.5 rounded bg-red-500/25" />
                              <div className="h-2.5 rounded bg-white/10" />
                            </div>
                          </div>
                          {/* Red annotation badges */}
                          <div className="absolute top-0.5 right-0.5 flex flex-col gap-0.5">
                            <div className="flex items-center gap-0.5 bg-red-500/90 rounded px-0.5 py-px">
                              <span className="text-[5px] font-bold text-white leading-none whitespace-nowrap">3.2s delay</span>
                            </div>
                            <div className="flex items-center gap-0.5 bg-red-500/80 rounded px-0.5 py-px">
                              <span className="text-[5px] font-bold text-white leading-none whitespace-nowrap">Lost here</span>
                            </div>
                          </div>
                          <div className="absolute inset-0 bg-[#0D1720]/30 backdrop-blur-[1px]" />
                        </div>
                        {/* Label */}
                        <div className="flex flex-col">
                          <span className="text-[#16A085] text-[11px] font-bold tracking-wide leading-none">Unlock Sample Audit (PDF)</span>
                          <span className="text-gray-500 text-[10px] font-medium mt-0.5 leading-none">See what we deliver on day one</span>
                        </div>
                        <svg className="w-3.5 h-3.5 text-gray-600 group-hover:text-[#16A085] ml-auto flex-shrink-0 transition-all duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex flex-col gap-6 absolute inset-0"
                  >
                    <div>
                      <h3 className="text-lg font-heading font-bold text-white mb-1">Business Context</h3>
                      <p className="text-gray-400 text-[11px] font-medium tracking-wide">Help us benchmark against your industry.</p>
                    </div>

                    <CustomSelect 
                      id="adSpend"
                      label="Monthly Ad Spend (Optional)"
                      value={formData.adSpend}
                      onChange={(val) => setFormData({...formData, adSpend: val as AdSpendType})}
                      placeholder="Select budget range"
                      options={[
                        { label: "< $2,000", value: "<$2k" },
                        { label: "$2,000 - $10,000", value: "$2k-$10k" },
                        { label: "$10,000+", value: "$10k+" }
                      ]}
                    />

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="competitor" className="text-[11px] font-bold text-gray-300 uppercase tracking-widest pl-1 border-l-2 border-[var(--brand-teal)]/50 leading-none py-0.5">Primary Competitor URL</label>
                      <input 
                        type="url" 
                        id="competitor"
                        value={formData.competitor}
                        onChange={(e) => setFormData({...formData, competitor: e.target.value})}
                        placeholder="https://theirwebsite.com.au" 
                        className={`w-full bg-[#1A252F] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-all shadow-inner text-sm border ${
                          formData.competitor.length > 5 && formData.competitor.includes(".")
                            ? "border-[#16A085] shadow-[0_0_16px_rgba(22,160,133,0.45)]"
                            : "border-[#2C3E50] focus:border-[var(--brand-teal)] focus:shadow-[0_0_12px_rgba(22,160,133,0.4)]"
                        }`}
                      />
                    </div>

                    <div className="mt-auto flex flex-col gap-3">
                      <Magnetic intensity={0.1}>
                        <div className="w-full cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform">
                          <Button 
                            type="button" 
                            onClick={handleNext}
                            variant="primary" 
                            className="w-full px-8 py-3.5 shadow-[0_4px_20px_rgba(22,160,133,0.3)] font-bold tracking-wide"
                          >
                            Next Step &rarr;
                          </Button>
                        </div>
                      </Magnetic>
                      <button 
                        type="button" 
                        onClick={handleBack}
                        className="text-gray-400 text-[12px] font-semibold hover:text-white transition-colors uppercase tracking-wider mx-auto"
                      >
                        &larr; Back
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex flex-col gap-6 absolute inset-0"
                  >
                    <div>
                      <h3 className="text-lg font-heading font-bold text-white mb-2">Lead Info & Delivery</h3>
                      
                      <div className="bg-[#16A085]/10 border border-[#16A085]/30 rounded-xl p-3 flex gap-3 items-start shadow-inner">
                         <svg className="w-5 h-5 text-[var(--brand-teal)] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                         </svg>
                         <p className="text-[var(--brand-teal)] text-[11px] font-semibold tracking-wide leading-relaxed m-0">
                           Your custom Performance Audit (PDF) will be evaluated and delivered directly to your work email in 2 business days.
                         </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 mt-2">
                      <label htmlFor="company" className="text-[11px] font-bold text-gray-300 uppercase tracking-widest pl-1 border-l-2 border-[var(--brand-teal)]/50 leading-none py-0.5">Company Name</label>
                      <input 
                        type="text" 
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        placeholder="Solar Co." 
                        className={`w-full bg-[#1A252F] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-all shadow-inner text-sm border ${
                          formData.company.length > 1
                            ? "border-[#16A085] shadow-[0_0_16px_rgba(22,160,133,0.45)]"
                            : "border-[#2C3E50] focus:border-[var(--brand-teal)] focus:shadow-[0_0_12px_rgba(22,160,133,0.4)]"
                        }`}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-[11px] font-bold text-gray-300 uppercase tracking-widest pl-1 border-l-2 border-[var(--brand-teal)]/50 leading-none py-0.5">Work Email</label>
                      <input 
                        type="email" 
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="you@company.com.au" 
                        className={`w-full bg-[#1A252F] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-all shadow-inner text-sm border ${
                          formData.email.includes("@") && formData.email.includes(".")
                            ? "border-[#16A085] shadow-[0_0_16px_rgba(22,160,133,0.45)]"
                            : "border-[#2C3E50] focus:border-[var(--brand-teal)] focus:shadow-[0_0_12px_rgba(22,160,133,0.4)]"
                        }`}
                      />
                    </div>

                    <div className="mt-auto flex flex-col gap-3">
                      <Magnetic intensity={0.15}>
                        <div className="w-full cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform">
                          <Button 
                            type="submit" 
                            variant="primary" 
                            className="w-full px-6 py-3.5 shadow-[0_4px_20px_rgba(22,160,133,0.3)] text-[14px] font-bold tracking-wide"
                          >
                            Get Free Review
                          </Button>
                        </div>
                      </Magnetic>

                      {/* Human escape hatch */}
                      <a
                        href="https://cal.com/codeblib/15min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 text-[11px] text-gray-500 hover:text-[#16A085] transition-colors duration-200 font-medium mx-auto group"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Prefer to talk? Book a 15-min call
                        <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                      <button 
                        type="button" 
                        onClick={handleBack}
                        className="text-gray-400 text-[12px] font-semibold hover:text-white transition-colors uppercase tracking-wider mx-auto"
                      >
                        &larr; Back
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
