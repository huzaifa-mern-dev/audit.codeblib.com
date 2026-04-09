"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CustomSelectProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label: string;
  id: string;
}

export function CustomSelect({ options, value, onChange, placeholder = "Select...", label, id }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-1.5 w-full relative" ref={containerRef}>
      <label htmlFor={id} className="text-[11px] font-bold text-gray-300 uppercase tracking-widest pl-1 border-l-2 border-[var(--brand-teal)] leading-none py-0.5">
        {label}
      </label>
      
      <button
        type="button"
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-left bg-[#1A252F] border border-[#2C3E50] rounded-xl px-4 py-3 text-sm focus:outline-none transition-all shadow-inner flex justify-between items-center z-10 ${
          isOpen ? "ring-0 border-[var(--brand-teal)] shadow-[0_0_12px_rgba(22,160,133,0.4)]" : ""
        }`}
      >
        <span className={selectedOption ? "text-white" : "text-gray-500"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg 
          className={`w-4 h-4 text-[var(--brand-teal)] transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} 
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[100%] left-0 w-full mt-2 bg-[#1A252F] border border-[#2C3E50] rounded-xl overflow-hidden glass-panel-dark z-50 shadow-2xl font-sans"
          >
            <ul className="flex flex-col py-1">
              {options.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm font-medium tracking-tight transition-colors hover:bg-[#16A085]/10 hover:text-white ${
                      value === option.value ? "text-[var(--brand-teal)] bg-[#16A085]/5" : "text-gray-300"
                    }`}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
