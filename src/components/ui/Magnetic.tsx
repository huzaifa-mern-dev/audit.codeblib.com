"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface MagneticProps {
  children: React.ReactElement;
  intensity?: number;
}

export function Magnetic({ children, intensity = 0.5 }: MagneticProps) {
  const magneticRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = magneticRef.current;
    if (!el) return;
    
    const xTo = gsap.quickTo(el, "x", { duration: 1.2, ease: "elastic.out(1.2, 0.2)" });
    const yTo = gsap.quickTo(el, "y", { duration: 1.2, ease: "elastic.out(1.2, 0.2)" });

    const mouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * intensity);
      yTo(y * intensity);
    };

    const mouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", mouseMove);
    el.addEventListener("mouseleave", mouseLeave);

    return () => {
      el.removeEventListener("mousemove", mouseMove);
      el.removeEventListener("mouseleave", mouseLeave);
    };
  }, [intensity]);

  return (
    <div ref={magneticRef} className="inline-flex relative z-10 w-fit cursor-pointer">
      {children}
    </div>
  );
}
