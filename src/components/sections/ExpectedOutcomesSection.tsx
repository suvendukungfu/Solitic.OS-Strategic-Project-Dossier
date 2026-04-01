'use client';
import { AnimatedSection } from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  FileCheck, 
  Expand, 
  Zap, 
  Target, 
  Heart 
} from "lucide-react";

const outcomes = [
  {
    icon: ShieldCheck,
    title: "Reduced Compliance Risks",
    description: "Stay ahead of regulatory requirements with timely filings and proactive legal checks.",
  },
  {
    icon: FileCheck,
    title: "Stronger Contracts, Safer Deals",
    description: "Well-drafted agreements that protect your interests and minimize future disputes.",
  },
  {
    icon: Expand,
    title: "Expanded Capabilities",
    description: "Access legal expertise without expanding your in-house team — gain more, spend less.",
  },
  {
    icon: Zap,
    title: "Faster Turnaround, Clearer Processes",
    description: "Efficient execution, responsive communication, and no legal jargon — just actionable advice.",
  },
  {
    icon: Target,
    title: "Tailored Legal Solutions",
    description: "Every recommendation is built around your business model, objectives, and industry realities.",
  },
  {
    icon: Heart,
    title: "Peace of Mind",
    description: "With Solitic, legal doesn't stay a bottleneck — it becomes a business enabler.",
  },
];

export function ExpectedOutcomesSection() {
  return (
    <section className="relative py-24 bg-charcoal overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(42, 52%, 54%) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }} />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <span className="font-body text-sm font-medium text-gold uppercase tracking-wider">
            Results You Can Expect
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-off-white mt-4">
            <span className="relative inline-block">
              <span className="text-gold">Expected</span>
              {/* Animated circle around "Expected" */}
              <motion.svg
                className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)]"
                viewBox="0 0 200 60"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.3 }}
              >
                <motion.ellipse
                  cx="100"
                  cy="30"
                  rx="95"
                  ry="25"
                  stroke="hsl(42, 52%, 54%)"
                  strokeWidth="2"
                  fill="none"
                />
              </motion.svg>
            </span>{" "}
            Outcomes.
          </h2>
          <p className="font-body text-off-white/60 max-w-2xl mx-auto mt-4">
            When you partner with Solitic, you can expect:
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {outcomes.map((outcome, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <motion.div
                className="group relative p-6 rounded-xl border border-off-white/10 bg-off-white/5 overflow-hidden"
                whileHover={{ 
                  borderColor: "hsla(42, 52%, 54%, 0.5)",
                  y: -4,
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Shimmer on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                />
                
                <div className="relative z-10 flex items-start gap-4">
                  <motion.div
                    className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <outcome.icon className="w-6 h-6 text-gold" />
                  </motion.div>
                  
                  <div>
                    <h3 className="font-display text-lg font-semibold text-off-white mb-2 group-hover:text-gold transition-colors duration-300">
                      {outcome.title}
                    </h3>
                    <p className="font-body text-sm text-off-white/60 leading-relaxed">
                      {outcome.description}
                    </p>
                  </div>
                </div>
                
                {/* Decorative corner */}
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
