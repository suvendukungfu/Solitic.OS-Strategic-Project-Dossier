'use client';
import { AnimatedSection } from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { Target, Heart, Award, ArrowUpRight } from "lucide-react";

const cards = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "At Solitic Consulting, we're here for those who feel lost in legal and business complexities. We offer honest, end-to-end guidance to help you move forward — because no one should feel stuck just because they don't know where to begin.",
    tag: "PURPOSE"
  },
  {
    icon: Heart,
    title: "Our Values",
    description:
      "We stand for integrity, honesty, confidentiality, and accountability in everything we do. We treat our clients with the same respect and responsibility we hold ourselves to — as trusted partners on every step of their journey.",
    tag: "CULTURE"
  },
  {
    icon: Award,
    title: "Our Credentials",
    description:
      "In just six months, Solitic has served 10+ clients and led multiple high-stakes transactions. Our team blends expertise from Company Secretaries, CAs, Advocates, and Marketing Professionals.",
    tag: "PROWESS"
  },
];

export function MissionSection() {
  const title = "Purpose. Values. Expertise.";

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative localized glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-[60]">
        <AnimatedSection className="text-center mb-20 md:mb-24">
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            className="font-body text-xs font-black text-gold uppercase tracking-[0.3em] mb-6 block"
          >
            What Drives Us
          </motion.span>
          
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mt-4 tracking-tighter">
            {title.split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block mr-[0.3em] last:mr-0"
              >
                {word}
              </motion.span>
            ))}
          </h2>
          
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            className="h-1 bg-gold mx-auto mt-10 rounded-full"
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {cards.map((card, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <motion.div 
                whileHover={{ y: -12 }}
                className="group h-full p-8 md:p-10 bg-card rounded-[2rem] border border-border/50 relative overflow-hidden transition-all duration-700 hover:border-gold/30 hover:shadow-[0_40px_80px_-20px_rgba(201,166,70,0.12)]"
              >
                {/* Background Glass effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-gold/5 flex items-center justify-center border border-gold/10 group-hover:bg-gold/10 group-hover:scale-110 transition-all duration-500">
                      <card.icon className="w-8 h-8 text-gold" />
                    </div>
                    <span className="text-[10px] font-black text-white/20 tracking-[0.3em] group-hover:text-gold transition-colors">{card.tag}</span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-foreground mb-6 group-hover:text-gold transition-colors duration-300">
                    {card.title}
                  </h3>
                  
                  <p className="font-body text-muted-foreground leading-relaxed text-base italic group-hover:text-foreground/80 transition-colors">
                    "{card.description}"
                  </p>

                  <div className="mt-12 flex items-center gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gold">Read Insight</span>
                    <ArrowUpRight className="w-4 h-4 text-gold" />
                  </div>
                </div>

                {/* Corner light flare */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gold/5 blur-3xl rounded-full translate-x-16 translate-y-16 group-hover:bg-gold/10 transition-all duration-700" />
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
