'use client';
import { AnimatedSection } from "@/components/AnimatedSection";
import { Building2, Users, Briefcase } from "lucide-react";

const clients = [
  {
    icon: Building2,
    title: "Business Houses",
    subtitle: "Business Houses + Solitic",
    description:
      "Running a business is demanding — and compliance often takes a back seat. We step in where your consultants lack updated knowledge, your internal team is stretched thin, or non-compliances pile up unnoticed.",
    benefit:
      "With Solitic, you get a dependable legal partner ensuring every contract, compliance, and filing is handled proactively.",
  },
  {
    icon: Briefcase,
    title: "Law Firms",
    subtitle: "Law Firms + Solitic",
    description:
      "Corporate clients often need more than litigation or traditional legal services. Challenges include lack of in-house expertise in Company Law, LLP Law, or allied commercial regulations.",
    benefit:
      "With Solitic, you get a reliable corporate law partner to fill those gaps — retaining and serving clients more holistically.",
  },
  {
    icon: Users,
    title: "CA Firms",
    subtitle: "CA Firms + Solitic",
    description:
      "Many CA firms miss out on valuable opportunities due to limited legal support. Clients need services like company incorporations, FEMA filings, or drafting of contracts.",
    benefit:
      "With Solitic, you gain an invisible legal backend — extending service offerings without adding to your workload.",
  },
];

export function ClientsSection() {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="font-body text-sm font-medium text-gold uppercase tracking-wider">
            Who We Serve
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-4">
            Your Success, Our Priority
          </h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-3 gap-8">
          {clients.map((client, index) => (
            <AnimatedSection key={index} delay={index * 0.15}>
              <div className="group h-full bg-card rounded-xl p-8 border border-border hover:border-gold/50 transition-all duration-500 hover:shadow-gold">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-charcoal dark:bg-gold/10 flex items-center justify-center mb-6">
                  <client.icon className="w-7 h-7 text-gold" />
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  {client.title}
                </h3>
                <p className="font-body text-sm text-gold mb-4">{client.subtitle}</p>

                {/* Description */}
                <p className="font-body text-muted-foreground text-sm leading-relaxed mb-6">
                  {client.description}
                </p>

                {/* Benefit */}
                <div className="pt-6 border-t border-border">
                  <p className="font-body text-sm text-foreground leading-relaxed">
                    {client.benefit}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
