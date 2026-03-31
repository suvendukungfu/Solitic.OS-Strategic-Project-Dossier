'use client';
import { AnimatedSection } from "@/components/AnimatedSection";
import { Target, Heart, Award } from "lucide-react";

const cards = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "At Solitic Consulting, we're here for those who feel lost in legal and business complexities. We offer honest, end-to-end guidance to help you move forward — because no one should feel stuck just because they don't know where to begin.",
  },
  {
    icon: Heart,
    title: "Our Values",
    description:
      "We stand for integrity, honesty, confidentiality, and accountability in everything we do. We treat our clients with the same respect and responsibility we hold ourselves to — as trusted partners on every step of their journey.",
  },
  {
    icon: Award,
    title: "Our Credentials",
    description:
      "In just six months, Solitic has served 10+ clients and led multiple high-stakes transactions. Our team blends expertise from Company Secretaries, CAs, Advocates, and Marketing Professionals.",
  },
];

export function MissionSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="font-body text-sm font-medium text-gold uppercase tracking-wider">
            What Drives Us
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-4">
            Purpose. Values. Expertise.
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <AnimatedSection key={index} delay={index * 0.15}>
              <div className="group h-full p-8 bg-card rounded-lg border border-border hover:border-gold/50 transition-all duration-500 hover:shadow-gold">
                <div className="w-14 h-14 rounded-lg bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors duration-300">
                  <card.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                  {card.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
