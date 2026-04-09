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
            <div className="relative min-h-[360px]">
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
                    className="flex flex-col gap-6 absolute inset-0"
                  >
                    <div>
                      <h3 className="text-lg font-heading font-bold text-white mb-1">Website Diagnostic</h3>
                      <p className="text-gray-400 text-[11px] font-medium tracking-wide">Where are you dropping users?</p>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="url" className="text-[11px] font-bold text-gray-300 uppercase tracking-widest pl-1 border-l-2 border-[var(--brand-teal)]/50 leading-none py-0.5">Page URL</label>
                      <input 
                        type="url" 
                        id="url"
                        value={formData.url}
                        onChange={(e) => setFormData({...formData, url: e.target.value})}
                        placeholder="https://mysolarcompany.com.au" 
                        className="w-full bg-[#1A252F] border border-[#2C3E50] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--brand-teal)] focus:ring-0 focus:shadow-[0_0_12px_rgba(22,160,133,0.4)] transition-all shadow-inner text-sm"
                      />
                    </div>

                    <CustomSelect 
                      id="goal"
                      label="Primary Goal"
                      value={formData.goal}
                      onChange={(val) => setFormData({...formData, goal: val as GoalType})}
                      placeholder="Select an objective"
                      options={[
                        { label: "Generate Leads", value: "Generate Leads" },
                        { label: "Increase Sales", value: "Increase Sales" },
                        { label: "Brand Awareness", value: "Brand Awareness" }
                      ]}
                    />

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
                        className="w-full bg-[#1A252F] border border-[#2C3E50] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--brand-teal)] focus:ring-0 focus:shadow-[0_0_12px_rgba(22,160,133,0.4)] transition-all shadow-inner text-sm"
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
                        className="w-full bg-[#1A252F] border border-[#2C3E50] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--brand-teal)] focus:ring-0 focus:shadow-[0_0_12px_rgba(22,160,133,0.4)] transition-all shadow-inner text-sm"
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
                        className="w-full bg-[#1A252F] border border-[#2C3E50] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--brand-teal)] focus:ring-0 focus:shadow-[0_0_12px_rgba(22,160,133,0.4)] transition-all shadow-inner text-sm"
                      />
                    </div>

                    <div className="mt-auto flex flex-col gap-3">
                      <Magnetic intensity={0.1}>
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
