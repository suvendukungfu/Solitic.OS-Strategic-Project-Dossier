'use client';

import Image from "next/image";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface TeamMemberStat {
  label: string;
  value: string;
}

interface TeamMemberCardProps {
  name: string;
  role: string;
  initials: string;
  bioParagraphs: string[];
  highlightText: string;
  imageSrc?: string;
  imageAlt?: string;
  stats?: TeamMemberStat[];
  expertise?: string[];
  className?: string;
  imagePosition?: string;
  aspectRatio?: string;
  objectFit?: string;
}

export function TeamMemberCard({
  name,
  role,
  initials,
  bioParagraphs,
  highlightText,
  imageSrc,
  imageAlt,
  stats,
  expertise,
  className,
  imagePosition = "center",
  aspectRatio = "aspect-[4/5]",
  objectFit = "cover",
}: TeamMemberCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-500 md:p-8",
        "shadow-[0_20px_60px_-36px_rgba(194,164,109,0.4)] hover:border-gold/25",
        className,
      )}
    >
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/[0.05] to-transparent
                   -translate-x-full transition-transform duration-1000 ease-out group-hover:translate-x-full"
      />

      <div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <div className={cn("relative overflow-hidden rounded-xl border border-white/10 bg-[#0d1118]", aspectRatio)}>
            {imageSrc ? (
              <>
                <Image
                  src={imageSrc}
                  alt={imageAlt ?? `${name} portrait`}
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className={cn(
                    "transition-transform duration-700 group-hover:scale-[1.03]",
                    objectFit === "cover" ? "object-cover" : "object-contain"
                  )}
                  style={{ objectPosition: imagePosition }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(194,164,109,0.2),transparent_58%)]" />
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-gold/35 bg-gold/10 shadow-[0_0_40px_rgba(194,164,109,0.18)]">
                  <span className="font-display text-3xl font-bold text-gold">{initials}</span>
                </div>
                <p className="relative mt-6 font-body text-[11px] uppercase tracking-[0.35em] text-off-white/45">
                  Leadership Portrait
                </p>
              </div>
            )}

            <div className="absolute left-5 top-5 h-16 w-16 rounded-full bg-gold/[0.08] blur-2xl" />
            <div className="absolute bottom-5 right-5 h-20 w-20 rounded-full bg-gold/[0.05] blur-3xl" />
          </div>
        </div>

        <div className="min-w-0">
          <p className="font-body text-[11px] font-medium uppercase tracking-[0.35em] text-gold">
            {role}
          </p>
          <h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-off-white md:text-4xl">
            {name}
          </h3>

          <div className="mt-6 space-y-4">
            {bioParagraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-xl font-body text-base leading-8 text-off-white/65"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-6 max-w-xl rounded-r-lg border-l-2 border-gold/45 bg-gold/[0.04] py-3 pl-5 pr-4">
            <p className="font-body text-base leading-7 text-off-white/82">{highlightText}</p>
          </div>

          {stats?.length ? (
            <div className="mt-8 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
              {stats.map((stat) => (
                <div
                  key={`${stat.label}-${stat.value}`}
                  className="rounded-lg border border-white/10 bg-black/20 px-4 py-4 transition-colors duration-300 group-hover:border-gold/20"
                >
                  <p className="font-display text-lg font-semibold text-off-white">{stat.value}</p>
                  <p className="mt-1 font-body text-[11px] uppercase tracking-[0.25em] text-off-white/45">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          ) : null}

          {expertise?.length ? (
            <div className="mt-8 flex max-w-xl flex-wrap gap-3">
              {expertise.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-gold/20 bg-gold/[0.08] px-4 py-2 font-body text-sm text-off-white/78 transition-all duration-300 group-hover:border-gold/35 group-hover:bg-gold/[0.12]"
                >
                  {item}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
