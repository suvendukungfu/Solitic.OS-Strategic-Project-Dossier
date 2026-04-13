'use client';
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface SoliticLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  variant?: "icon" | "full" | "mark";
  priority?: boolean;
  className?: string;
}

export function SoliticLogo({ 
  size = "md", 
  animated = true, 
  variant = "full",
  priority = false,
  className
}: SoliticLogoProps) {
  const sizeClasses = {
    sm: "h-10 w-10",
    md: "h-14 w-14",
    lg: "h-24 w-24",
    xl: "h-36 w-36",
  };

  // The institutional logo asset is square (1850x1780).
  // We apply institutional-grade filters to ensure the gold branding "pops" 
  // and the "CONSULTING" subtext remains legible against dark editorial backgrounds.
  
  return (
    <motion.div
      className={cn("flex items-center justify-center group cursor-pointer relative", className)}
      whileHover={animated ? { scale: 1.05 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <div className={cn(
        "relative flex items-center justify-center",
        sizeClasses[size]
      )}>
        <Image
          src="/logo.png"
          alt="Solitic Consulting"
          fill
          priority={priority}
          className={cn(
            "object-contain transition-all duration-300",
            "brightness-[1.15] contrast-[1.05] saturate-[1.1]",
            "drop-shadow-[0_0_8px_rgba(255,255,255,0.08)]"
          )}
          sizes="(max-width: 768px) 100vw, 120px"
        />
      </div>
    </motion.div>
  );
}
