"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
}

export function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center font-semibold overflow-hidden rounded-lg px-6 py-3 transition-colors duration-300";
  
  const variants = {
    primary: "bg-[var(--brand-teal)] text-white shadow-lg hover:bg-[var(--brand-midnight)] hover:shadow-xl",
    secondary: "bg-[var(--brand-blue)] text-white shadow-lg hover:bg-[var(--brand-midnight)] hover:shadow-xl",
    outline: "border-2 border-[var(--brand-teal)] text-[var(--brand-teal)] hover:bg-[var(--brand-teal)] hover:text-white"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
