"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";

export function Header() {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (headerRef.current) {
      ScrollTrigger.create({
        trigger: "body",
        start: "top -50",
        end: "bottom top", 
        toggleClass: { className: "glass-panel-dark", targets: headerRef.current },
      });
    }
  }, []);

  return (
    <header 
      ref={headerRef} 
      className="fixed top-0 left-0 w-full z-[100] py-5 px-6 md:px-12 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold text-white font-heading tracking-tight">
          CodeBlib<span className="text-[var(--brand-teal)]">.</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-10 text-[var(--brand-offwhite)] font-sans font-semibold tracking-wide">
          <a href="#about" className="hover:text-[var(--brand-light-teal)] transition-colors duration-300">Audit Process</a>
          <a href="#services" className="hover:text-[var(--brand-light-teal)] transition-colors duration-300">Capabilities</a>
          <a href="#results" className="hover:text-[var(--brand-light-teal)] transition-colors duration-300">Case Studies</a>
        </nav>

        <div>
          <Button variant="primary" className="text-[var(--brand-midnight)]! font-black hover:text-white! px-8">
            Free Audit
          </Button>
        </div>
      </div>
    </header>
  );
}
