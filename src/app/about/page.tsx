'use client';

import { Fragment } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import { TeamMemberCard } from "@/components/TeamMemberCard";
import { motion } from "framer-motion";
import { Target, Heart, Award, Users, CheckCircle } from "lucide-react";
import patternGold from "@/assets/pattern-gold.jpg";
import siddhDhingra from "@/app/about/picture/siddhdingra.jpeg";
import ashishTiwari from "@/app/about/picture/ashishtiwari.jpeg";


const values = [
  { icon: Target, title: "Integrity", description: "We do what's right, even when no one is watching." },
  { icon: Heart, title: "Honesty", description: "Transparent communication is the foundation of trust." },
  { icon: Award, title: "Accountability", description: "We own our work and stand by our commitments." },
  { icon: Users, title: "Confidentiality", description: "Your business secrets are safe with us." },
];

const outcomes = [
  {
    icon: CheckCircle,
    title: "Reduced Compliance Risks",
    description: "Stay ahead of regulatory requirements with timely filings and proactive legal checks.",
  },
  {
    icon: CheckCircle,
    title: "Stronger Contracts, Safer Deals",
    description: "Well-drafted agreements that protect your interests and minimize future disputes.",
  },
  {
    icon: CheckCircle,
    title: "Expanded Capabilities",
    description: "Access legal expertise without expanding your in-house team — gain more, spend less.",
  },
  {
    icon: CheckCircle,
    title: "Faster Turnaround, Clearer Processes",
    description: "Efficient execution, responsive communication, and no legal jargon — just actionable advice.",
  },
  {
    icon: CheckCircle,
    title: "Tailored Legal Solutions",
    description: "Every recommendation is built around your business model, objectives, and industry realities.",
  },
  {
    icon: CheckCircle,
    title: "Peace of Mind",
    description: "With Solitic, legal doesn't stay a bottleneck — it becomes a business enabler.",
  },
];

const teamMembers = [
  {
    name: "Siddh Dhingra",
    role: "Founder & Lead Consultant",
    initials: "SD",
    bioParagraphs: [
      "Siddh Dhingra is a Company Secretary and Corporate Fixer based in Moradabad.",
      "With experience across multinational clients, cross-border FEMA transactions, and complex corporate structuring, he leads mandates where legal depth and business execution need to move together.",
    ],
    imageSrc: ashishTiwari.src,
    imageAlt: "Siddh Dhingra - Founder & Lead Consultant",
    highlightText:
      "He founded Solitic Consulting to build something tier-2 cities have never had - a full-stack business advisory ecosystem under one roof.",
    stats: [
      { value: "$100M+", label: "FEMA Transactions Advised" },
      { value: "Jewar Airport", label: "Compliance Audit" },
      { value: "Multinational", label: "Client Experience" },
      { value: "CS + LLB", label: "Practitioner & Law Enthusiast" },
    ],
    imagePosition: "top",
    objectFit: "cover",
    aspectRatio: "aspect-[4/5]",
  },
  {
    name: "CA Ashish Tiwari",
    role: "Finance Advisor & CFO Consultant",
    initials: "AT",
    bioParagraphs: [
      "Numbers tell a story. Most people just do not know how to read them.",
      "Ashish Tiwari is a Chartered Accountant with deep expertise in accounting, taxation, and financial strategy. But more than compliance, he thinks like a CFO.",
      "He helps businesses understand not just where their money is, but where it should be going.",
    ],
    imageSrc: siddhDhingra.src,
    imageAlt: "CA Ashish Tiwari - Finance Advisor",
    highlightText:
      "From tax optimisation to financial structuring and CFO-level decision making, Ashish brings the kind of financial intelligence that turns a business's numbers into its biggest competitive advantage.",
    expertise: ["Accounting", "Taxation", "Financial Strategy", "CFO Advisory"],
    imagePosition: "top",
    objectFit: "cover",
    aspectRatio: "aspect-[4/5]",
  },
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <motion.div
                    className="group h-full flex flex-col text-center p-8 bg-card rounded-2xl border border-border overflow-hidden relative
                               backdrop-blur-sm
                               hover:border-gold/30
                               hover:shadow-[0_12px_36px_-8px_hsla(42,52%,54%,0.12)]
                               transition-all duration-500 ease-out"
                    whileHover={{ y: -4, scale: 1.03 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {/* Shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/[0.04] to-transparent
                                    -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

                    <div className="relative z-10 flex flex-col items-center flex-1">
                      <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6 flex-shrink-0
                                      group-hover:bg-gold/20 transition-colors duration-300">
                        <value.icon className="w-8 h-8 text-gold" />
                      </div>
                      <h3 className="font-display text-xl font-semibold text-foreground mb-3
                                     group-hover:text-gold transition-colors duration-300">
                        {value.title}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="relative overflow-hidden bg-charcoal py-24">
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `url(${bgImg})`,
              backgroundSize: "320px 320px",
            }}
          />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

          <div className="container mx-auto px-6 relative z-10">
            <AnimatedSection className="mb-16 max-w-3xl">
              <span className="font-body text-sm font-medium uppercase tracking-wider text-gold">
                Leadership / Core Team
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold text-off-white md:text-5xl">
                The People Leading{" "}
                <span className="text-gold italic">Strategic Execution</span>
              </h2>
              <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-off-white/60">
                Solitic brings legal, regulatory, and financial decision-making into one advisory layer designed for businesses that need clarity, control, and high-conviction execution.
              </p>
            </AnimatedSection>

            <div className="flex flex-col gap-8 lg:gap-10">
              {teamMembers.map((member, index) => (
                <Fragment key={member.name}>
                  <AnimatedSection direction={index % 2 === 0 ? "left" : "right"} delay={index * 0.12}>
                    <TeamMemberCard {...member} />
                  </AnimatedSection>

                  {index < teamMembers.length - 1 ? (
                    <div className="mx-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent lg:mx-8" />
                  ) : null}
                </Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* Expected Outcomes */}
        <section className="relative py-24 bg-charcoal overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, hsl(42, 52%, 54%) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }} />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <AnimatedSection className="text-center mb-16">
              <span className="font-body text-sm font-medium text-gold uppercase tracking-wider">
                Expected Outcomes
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-off-white mt-4">
                What You Can{" "}
                <span className="text-gold italic">Expect</span>
              </h2>
              <p className="font-body text-off-white/60 max-w-2xl mx-auto mt-4">
                When you partner with Solitic, you can expect:
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
              {outcomes.map((outcome, index) => (
                <AnimatedSection key={index} delay={index * 0.08}>
                  <motion.div
                    className="group relative h-full flex flex-col p-6 rounded-2xl border border-off-white/[0.08] overflow-hidden
                               bg-gradient-to-br from-off-white/[0.06] to-off-white/[0.02]
                               backdrop-blur-sm
                               hover:border-gold/30
                               hover:shadow-[0_8px_32px_-8px_hsla(42,52%,54%,0.15)]
                               transition-all duration-500 ease-out"
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {/* Shimmer on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/[0.06] to-transparent
                                    -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

                    {/* Content */}
                    <div className="relative z-10 flex items-start gap-4 flex-1">
                      <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5
                                      group-hover:bg-gold/20 transition-colors duration-300">
                        <outcome.icon className="w-5 h-5 text-gold" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-base font-semibold text-off-white mb-2
                                       group-hover:text-gold transition-colors duration-300 leading-snug">
                          {outcome.title}
                        </h3>
                        <p className="font-body text-sm text-off-white/50 leading-relaxed">
                          {outcome.description}
                        </p>
                      </div>
                    </div>

                    {/* Decorative corner glow */}
                    <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-gold/[0.05] to-transparent
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>
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
