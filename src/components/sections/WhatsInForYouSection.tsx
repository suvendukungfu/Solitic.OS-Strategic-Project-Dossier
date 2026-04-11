'use client';
import { AnimatedSection } from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { Building2, Scale, Calculator, ArrowRight } from "lucide-react";
import { GlitterEffect } from "@/components/GlitterEffect";

const clientTypes = [
  {
    icon: Scale,
    title: "Law Firms + Solitic",
    subtitle: "Corporate clients often need more than litigation or traditional legal services.",
    challenges: [
      "Lack of in-house expertise in Company Law, LLP Law, TOPA, SOGA, or allied commercial regulations",
      "Losing mandates because of limited corporate advisory bandwidth",
      "Needing support for drafting, structuring, or compliance-heavy matters",
    ],
    solution: "With Solitic, you get a reliable corporate law partner to fill those gaps — so you can retain and serve your clients more holistically without compromising quality.",
  },
  {
    icon: Building2,
    title: "Business Houses + Solitic",
    subtitle: "Running a business is demanding — and compliance often takes a back seat.",
    challenges: [
      "Your consultants lack updated knowledge of corporate laws",
      "Your internal team is stretched thin or focused on core operations",
      "Non-compliances pile up unnoticed, risking penalties and delays",
    ],
    solution: "With Solitic, you get a dependable legal partner ensuring every contract, compliance, and filing is handled proactively — so you can focus on scaling your business.",
  },
  {
    icon: Calculator,
    title: "CA Firms + Solitic",
    subtitle: "Many CA firms miss out on valuable opportunities due to limited legal support.",
    challenges: [
      "You have clients needing services like company incorporations, FEMA filings, NCLT appearances, or drafting of contracts/petitions",
      "You may lack the personnel or time to cater to these needs",
      "You risk losing clients to full-service firms",
    ],
    solution: "With Solitic, you gain an invisible legal backend — extending your service offerings without adding to your workload or disclosing external support.",
  },
];

export function WhatsInForYouSection() {
  return (
    <section className="relative py-24 bg-background overflow-hidden">
      <GlitterEffect count={15} className="opacity-30" />
      
      <div className="container mx-auto px-6 relative z-[60]">
        <AnimatedSection className="text-center mb-16">
          <span className="font-body text-sm font-medium text-gold uppercase tracking-wider">
            Who We Serve
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-4">
            What's In It For{" "}
            <span className="relative inline-block">
              <span className="text-gold">You</span>
              <motion.svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 100 20"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <motion.path
                  d="M0 15 Q25 5 50 15 T100 15"
                  stroke="hsl(42, 52%, 54%)"
                  strokeWidth="3"
                  fill="none"
                />
              </motion.svg>
            </span>
            ?
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clientTypes.map((client, index) => (
            <AnimatedSection key={index} delay={index * 0.15}>
              <motion.div
                className="group h-full flex flex-col p-8 bg-card rounded-2xl border border-border relative overflow-hidden
                           backdrop-blur-sm
                           hover:border-gold/30
                           hover:shadow-[0_20px_48px_-12px_hsla(42,52%,54%,0.15)]
                           transition-all duration-500 ease-out"
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.04] to-transparent
                                opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6 relative z-10 flex-shrink-0
                                group-hover:bg-gold/20 transition-colors duration-300">
                  <client.icon className="w-7 h-7 text-gold" />
                </div>

                {/* Content — flex-1 so it fills the space */}
                <div className="relative z-10 flex flex-col flex-1">
                  <h3 className="font-display text-xl font-bold text-foreground mb-2
                                 group-hover:text-gold transition-colors duration-300">
                    {client.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mb-5">
                    {client.subtitle}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    <p className="font-body text-xs text-gold uppercase tracking-wider font-medium">Challenges you may face:</p>
                    <ul className="space-y-2">
                      {client.challenges.map((challenge, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + idx * 0.1 }}
                        >
                          <ArrowRight className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                          <span>{challenge}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Solution pushed to bottom with mt-auto */}
                  <p className="font-body text-sm text-foreground/80 border-t border-border pt-4 mt-auto">
                    {client.solution}
                  </p>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gold/[0.06] to-transparent rounded-bl-full
                                opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
