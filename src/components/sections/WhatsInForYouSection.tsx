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
      
      <div className="container mx-auto px-6 relative z-10">
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

        <div className="grid lg:grid-cols-3 gap-8">
          {clientTypes.map((client, index) => (
            <AnimatedSection key={index} delay={index * 0.15}>
              <motion.div
                className="group h-full p-8 bg-card rounded-xl border border-border relative overflow-hidden"
                whileHover={{ 
                  y: -8,
                  boxShadow: "0 25px 50px -12px hsla(42, 52%, 54%, 0.2)",
                }}
                transition={{ duration: 0.4 }}
              >
                {/* Hover glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                {/* Icon */}
                <motion.div
                  className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6 relative z-10"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <client.icon className="w-7 h-7 text-gold" />
                </motion.div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold text-foreground mb-2 relative z-10">
                  {client.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-4 relative z-10">
                  {client.subtitle}
                </p>
                
                <div className="space-y-2 mb-6 relative z-10">
                  <p className="font-body text-xs text-gold uppercase tracking-wider">Challenges you may face:</p>
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

                <p className="font-body text-sm text-foreground/80 border-t border-border pt-4 relative z-10">
                  {client.solution}
                </p>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gold/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
