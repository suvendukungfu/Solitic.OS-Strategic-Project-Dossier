'use client';
import { AnimatedSection } from "@/components/AnimatedSection";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Understand & Analyse",
    description:
      "We begin by sitting down with our clients to understand their business, operations, and concerns. This step is about listening, identifying gaps, and analyzing their current legal and strategic standing.",
  },
  {
    number: "02",
    title: "Evaluate Fit",
    description:
      "We don't chase every mandate. We carefully assess whether we're the right fit for the client's needs. If we aren't, we openly communicate that — and refer them to someone who can serve them better.",
  },
  {
    number: "03",
    title: "Curate & Solve",
    description:
      "Once aligned, we move into action. We tap into our legal expertise, industry experience, and network of professionals to craft tailored, effective solutions — ensuring real results.",
  },
];

export function ApproachSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="font-body text-sm font-medium text-gold uppercase tracking-wider">
            Our Approach
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-4">
            Three Steps to Success
          </h2>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <AnimatedSection
              key={index}
              delay={index * 0.2}
              direction="left"
            >
              <div className="flex flex-col sm:flex-row gap-8 mb-12 last:mb-0">
                {/* Number */}
                <div className="flex-shrink-0 mb-4 sm:mb-0">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-gold flex items-center justify-center"
                  >
                    <span className="font-display text-2xl md:text-3xl font-bold text-charcoal">
                      {step.number}
                    </span>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="font-body text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                  
                  {/* Divider line */}
                  {index < steps.length - 1 && (
                    <div className="mt-8 h-px bg-border" />
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
