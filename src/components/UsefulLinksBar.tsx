'use client';
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const usefulLinks = [
  { name: "MCA", url: "https://www.mca.gov.in" },
  { name: "RBI", url: "https://www.rbi.org.in" },
  { name: "SEBI", url: "https://www.sebi.gov.in" },
  { name: "IRDAI", url: "https://www.irdai.gov.in" },
  { name: "ICSI", url: "https://www.icsi.edu" },
  { name: "IBBI", url: "https://www.ibbi.gov.in" },
];

export function UsefulLinksBar() {
  return (
    <section className="bg-blue py-4 border-t border-blue-dark/20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <span className="font-body text-sm font-semibold text-off-white/90 uppercase tracking-wider">
            Useful Links:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            {usefulLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-off-white/10 hover:bg-off-white/20 border border-off-white/20 hover:border-gold/50 transition-all duration-300 group"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="font-body text-sm font-medium text-off-white group-hover:text-gold transition-colors duration-300">
                  {link.name}
                </span>
                <ExternalLink className="w-3 h-3 text-off-white/60 group-hover:text-gold transition-colors duration-300" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
