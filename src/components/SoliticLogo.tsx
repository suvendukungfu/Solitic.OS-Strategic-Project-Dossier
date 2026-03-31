'use client';
import { motion } from "framer-motion";
import soliticLogo from "@/assets/solitic-logo.png";

interface SoliticLogoProps {
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  showText?: boolean;
}

export function SoliticLogo({ size = "md", animated = true, showText = true }: SoliticLogoProps) {
  const sizeClasses = {
    sm: "h-8",
    md: "h-12",
    lg: "h-20",
  };

  const logoSrc = typeof soliticLogo === "object" && "src" in soliticLogo 
    ? (soliticLogo as { src: string }).src 
    : soliticLogo;

  return (
    <motion.div
      className="flex items-center gap-3 group cursor-pointer relative"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <motion.img
        src={logoSrc as string}
        alt="Solitic Consulting"
        className={`${sizeClasses[size]} w-auto`}
        initial={animated ? { opacity: 0, scale: 0.8 } : {}}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
}
