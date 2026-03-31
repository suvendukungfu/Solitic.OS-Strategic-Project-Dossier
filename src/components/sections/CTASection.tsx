'use client';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Calendar, FileSearch, FileSignature, Users } from "lucide-react";

const steps = [
  { icon: Calendar, label: "Schedule a Meeting" },
  { icon: FileSearch, label: "Evaluate Your Needs" },
  { icon: FileSignature, label: "Sign Contract" },
  { icon: Users, label: "Initiate Onboarding" },
];

export function CTASection() {
  return (
    <section className="py-24 bg-charcoal relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-off-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="font-body text-lg text-off-white/70 max-w-2xl mx-auto mb-12">
            By partnering with us, you gain a trusted legal and strategic ally — without overheads, delays, or confusion. Let's build something that works — legally, commercially, and practically.
          </p>

          {/* Steps */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-4 rounded-lg border border-off-white/10 bg-off-white/5"
              >
                <step.icon className="w-6 h-6 text-gold mx-auto mb-2" />
                <p className="font-body text-sm text-off-white/80">{step.label}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <Button variant="gold" size="xl" asChild>
            <Link href="/contact" className="flex items-center gap-2">
              Let's Connect
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
