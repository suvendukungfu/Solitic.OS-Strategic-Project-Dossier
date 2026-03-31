'use client';
import { AnimatedSection } from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import {
  FileText,
  Building2,
  Briefcase,
  Scale,
  Rocket,
  BookOpen,
  ArrowRight,
  Receipt,
  Calculator,
} from "lucide-react";
import { GlitterEffect } from "@/components/GlitterEffect";

const services = [
  {
    icon: Building2,
    title: "Corporate Transaction & Advisory",
    description:
      "Business structuring, corporate restructuring, joint ventures, and foreign collaborations tailored to your goals.",
    details: [
      "Business structuring (Inbound/Outbound)",
      "Corporate restructuring & takeovers",
      "Joint ventures & foreign collaborations",
      "Contract drafting & negotiation (JVs, franchising, licensing, etc.)",
      "Supply, distribution & manufacturing agreements",
      "Asset, loan & software licensing deals",
    ],
  },
  {
    icon: FileText,
    title: "Contract Drafting & Negotiation",
    description:
      "Every commercial agreement carries legal, financial, and operational weight.",
    details: [
      "Draft, review, and negotiate commercial agreements",
      "Ensure alignment with your business model & risk appetite",
      "Anticipate potential issues and close gaps",
      "Tailor clauses to serve your unique commercial objectives",
    ],
  },
  {
    icon: BookOpen,
    title: "Company Law & Secretarial Compliances",
    description:
      "We ensure that your business stays compliant with the Companies Act — without the hassle.",
    details: [
      "Incorporation & governance setup",
      "ROC filings & annual compliances",
      "Board & shareholder meeting support",
      "Maintenance of statutory registers and records",
      "Event-based filings (allotments, resignations, share transfers)",
      "Advisory on related party transactions & corporate actions",
    ],
  },
  {
    icon: Receipt,
    title: "GST Advisory & Compliance",
    description:
      "Comprehensive GST advisory, registration, filing, and compliance management for businesses.",
    details: [
      "GST registration & amendments",
      "Monthly/Quarterly return filing (GSTR-1, GSTR-3B)",
      "Annual return & reconciliation",
      "Input tax credit optimization",
      "GST audit support & assessments",
      "E-way bill compliance",
    ],
  },
  {
    icon: Calculator,
    title: "Income Tax Advisory",
    description:
      "Strategic income tax planning, compliance, and representation services for individuals and businesses.",
    details: [
      "Tax planning & optimization strategies",
      "ITR filing for individuals & businesses",
      "Advance tax computation & payment",
      "TDS/TCS compliance & returns",
      "Assessment & appeal representation",
      "Tax audit & certification",
    ],
  },
  {
    icon: Scale,
    title: "Trademark Advisory",
    description:
      "Comprehensive trademark registration, protection, and enforcement services.",
    details: [
      "Trademark registration & protection",
      "Brand identity enforcement",
      "IP portfolio management",
    ],
  },
  {
    icon: Rocket,
    title: "Startup Advisory",
    description:
      "Funding strategies, business setup, and strategic decision-making for emerging ventures.",
    details: [
      "Funding, Setting-up and Strategic Decision making",
      "Legal structuring for startups",
      "Investor documentation & negotiations",
    ],
  },
  {
    icon: Briefcase,
    title: "KPO & BPO Services",
    description:
      "Knowledge and business process outsourcing for CA firms and law practices.",
    details: [
      "Specialized legal support services",
      "Document processing & management",
      "Research & analysis support",
    ],
  },
];

export function ServicesSection() {
  return (
    <section className="relative py-24 bg-charcoal overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <GlitterEffect count={20} className="opacity-20" />
      
      {/* Gradient orbs */}
      <motion.div
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-blue/5 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <span className="font-body text-sm font-medium text-gold uppercase tracking-wider">
            Our Services
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-off-white mt-4">
            Proposed{" "}
            <span className="relative inline-block">
              <span className="text-glitter">Services</span>
              <motion.svg
                className="absolute -bottom-2 left-0 w-full h-4"
                viewBox="0 0 100 15"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <motion.path
                  d="M0 10 Q25 0 50 10 T100 10"
                  stroke="hsl(42, 52%, 54%)"
                  strokeWidth="2"
                  fill="none"
                />
              </motion.svg>
            </span>
          </h2>
          <p className="font-body text-off-white/60 max-w-2xl mx-auto mt-4">
            From complex transactions to day-to-day advisory, we ensure every move is compliant, efficient, and aligned with your business vision.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <motion.div 
                className="group h-full p-6 bg-off-white/5 rounded-xl border border-off-white/10 relative overflow-hidden"
                whileHover={{ 
                  borderColor: "hsla(42, 52%, 54%, 0.5)",
                  y: -8,
                }}
                transition={{ duration: 0.4 }}
              >
                {/* Shimmer effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                />
                
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex flex-col items-start gap-4 relative z-10">
                  <motion.div 
                    className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0"
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: 5,
                      boxShadow: "0 0 30px hsla(42, 52%, 54%, 0.3)",
                    }}
                  >
                    <service.icon className="w-7 h-7 text-gold" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-semibold text-off-white mb-2 group-hover:text-gold transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="font-body text-sm text-off-white/60 leading-relaxed mb-4">
                      {service.description}
                    </p>
                    
                    {/* Details list */}
                    <ul className="space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-h-0 group-hover:max-h-[200px] overflow-hidden">
                      {service.details.slice(0, 3).map((detail, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-start gap-2 text-xs text-off-white/50"
                          initial={{ x: -10, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <ArrowRight className="w-3 h-3 text-gold flex-shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tl-full" />
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
