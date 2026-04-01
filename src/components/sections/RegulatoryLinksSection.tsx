'use client';
import { motion } from "framer-motion";
import { ExternalLink, Landmark, ShieldCheck, Gavel, Briefcase, FileText, Scale } from "lucide-react";

const regulatoryLinks = [
  { 
    name: "MCA.gov.in", 
    href: "https://www.mca.gov.in", 
    description: "Ministry of Corporate Affairs",
    icon: Building2Icon 
  },
  { 
    name: "RBI", 
    href: "https://www.rbi.org.in", 
    description: "Reserve Bank of India",
    icon: Landmark 
  },
  { 
    name: "SEBI", 
    href: "https://www.sebi.gov.in", 
    description: "Securities and Exchange Board of India",
    icon: ShieldCheck 
  },
  { 
    name: "IRDAI", 
    href: "https://www.irdai.gov.in", 
    description: "Insurance Regulatory and Development Authority",
    icon: Gavel 
  },
  { 
    name: "ICSI", 
    href: "https://www.icsi.edu", 
    description: "Institute of Company Secretaries of India",
    icon: Briefcase 
  },
  { 
    name: "IBBI", 
    href: "https://www.ibbi.gov.in", 
    description: "Insolvency and Bankruptcy Board of India",
    icon: Scale 
  },
];

function Building2Icon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}

export function RegulatoryLinksSection() {
  return (
    <section className="py-20 bg-[#16191E] border-t border-[#2A2F38]">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center md:justify-start gap-3 mb-4"
            >
              <div className="w-1 h-5 bg-[#C2A46D] rounded-full" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#6B7280]">Official Portals</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-3xl md:text-4xl font-bold text-[#E6EAF0] mb-4"
            >
              Useful Regulatory <span className="text-[#9AA4B2] italic">Links.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-body text-[#6B7280] text-sm md:text-base max-w-2xl"
            >
              Quick access to official regulatory and compliance platforms for statutory transparency and institutional verification.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {regulatoryLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="group p-5 rounded-xl border border-[#2A2F38] bg-[#171A20] hover:bg-[#1F232B] hover:border-[#3F444D] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#0F1115] border border-[#2A2F38] flex items-center justify-center group-hover:border-[#C2A46D]/30 transition-colors">
                      <link.icon className="w-5 h-5 text-[#6B7280] group-hover:text-[#C2A46D] transition-colors" />
                    </div>
                    <ExternalLink className="w-3 h-3 text-[#2A2F38] group-hover:text-[#C2A46D] transition-colors" />
                  </div>
                  <h3 className="text-sm font-bold text-[#E6EAF0] mb-1 group-hover:text-white transition-colors">{link.name}</h3>
                  <p className="text-[11px] text-[#6B7280] leading-relaxed group-hover:text-[#9AA4B2] transition-colors italic">{link.description}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
