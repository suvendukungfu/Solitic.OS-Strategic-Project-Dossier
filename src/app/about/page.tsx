'use client';

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { Target, Heart, Award, Users, CheckCircle } from "lucide-react";
import patternGold from "@/assets/pattern-gold.jpg";

const values = [
  { icon: Target, title: "Integrity", description: "We do what's right, even when no one is watching." },
  { icon: Heart, title: "Honesty", description: "Transparent communication is the foundation of trust." },
  { icon: Award, title: "Accountability", description: "We own our work and stand by our commitments." },
  { icon: Users, title: "Confidentiality", description: "Your business secrets are safe with us." },
];

const outcomes = [
  "Reduced Compliance Risks",
  "Stronger Contracts, Safer Deals",
  "Expanded Capabilities",
  "Faster Turnaround, Clearer Processes",
  "Tailored Legal Solutions",
  "Peace of Mind",
];

export default function AboutPage() {
  const bgImg = typeof patternGold === "object" && "src" in patternGold ? (patternGold as { src: string }).src : patternGold;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 bg-charcoal relative overflow-hidden">
          <div
            className="absolute right-0 top-0 w-96 h-96 opacity-10"
            style={{
              backgroundImage: `url(${bgImg})`,
              backgroundSize: "cover",
            }}
          />
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <span className="font-body text-sm font-medium text-gold uppercase tracking-wider">
                About Us
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-off-white mt-4 mb-6 leading-tight">
                Building Trust Through{" "}
                <span className="text-gold italic">Legal Excellence.</span>
              </h1>
              <p className="font-body text-lg text-off-white/70 leading-relaxed max-w-2xl">
                At Solitic Consulting, we're here for those who feel lost in legal and business complexities. 
                We offer honest, end-to-end guidance to help you move forward — because no one should feel 
                stuck just because they don't know where to begin.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-16">
              <span className="font-body text-sm font-medium text-gold uppercase tracking-wider">
                Our Core Values
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-4">
                What We Stand For
              </h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div className="text-center p-8 bg-card rounded-2xl border border-border hover:border-gold/30 transition-all duration-300">
                    <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                      <value.icon className="w-8 h-8 text-gold" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Founder */}
        <section className="py-24 bg-secondary">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <AnimatedSection direction="left">
                <div className="aspect-square max-w-md mx-auto lg:mx-0 rounded-xl bg-charcoal p-12 flex items-center justify-center shadow-golden-glow">
                  <div className="text-center">
                    <div className="w-40 h-40 rounded-full bg-gold/20 border-4 border-gold flex items-center justify-center mx-auto mb-8">
                      <span className="font-display text-6xl font-bold text-gold">SD</span>
                    </div>
                    <h3 className="font-display text-3xl font-bold text-off-white mb-2">
                      Siddh Dhingra
                    </h3>
                    <p className="font-body text-gold uppercase tracking-widest text-sm">Founder & Lead Consultant</p>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="right">
                <span className="font-body text-sm font-medium text-gold uppercase tracking-wider">
                  Meet Our Founder
                </span>
                <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-4 mb-8">
                  Expertise Meets Execution
                </h2>
                <div className="space-y-6">
                  <p className="font-body text-muted-foreground text-lg leading-relaxed">
                    With a strong foundation in corporate law, regulatory compliance, and strategic advisory, 
                    Siddh Dhingra founded Solitic Consulting to bridge the gap between legal complexity and business clarity.
                  </p>
                  <p className="font-body text-muted-foreground text-lg leading-relaxed border-l-4 border-gold pl-6 py-2 bg-gold/5 rounded-r-lg">
                    Our team blends expertise from Company Secretaries, CAs, Advocates, and Marketing Professionals, 
                    offering practical, end-to-end solutions with integrity and insight.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Expected Outcomes */}
        <section className="py-24 bg-charcoal">
          <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-16">
              <span className="font-body text-sm font-medium text-gold uppercase tracking-wider">
                Expected Outcomes
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-off-white mt-4">
                What You Can Expect
              </h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {outcomes.map((outcome, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div className="flex items-center gap-4 p-6 rounded-xl border border-off-white/10 bg-off-white/5 hover:bg-off-white/10 transition-colors duration-300">
                    <CheckCircle className="w-6 h-6 text-gold flex-shrink-0" />
                    <span className="font-body text-off-white text-lg">{outcome}</span>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
