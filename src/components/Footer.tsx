'use client';

import Link from "next/link";
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import soliticLogo from "@/assets/solitic-logo.png";

export function Footer() {
  const logoImg = typeof soliticLogo === "object" && "src" in soliticLogo ? (soliticLogo as { src: string }).src : soliticLogo;

  return (
    <footer className="bg-charcoal text-off-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(42, 52%, 54%) 1px, transparent 0)`,
          backgroundSize: "60px 60px",
        }} />
      </div>
      
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-6">
               <img 
                src={logoImg as string} 
                alt="Solitic Consulting" 
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-off-white/70 font-body text-sm leading-relaxed">
              Your trusted partner in legal and strategic advisory. Building bridges between complexity and clarity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-gold">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "About", "Blog", "Contact", "Admin"].map((item, idx) => (
                <motion.li 
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    href={item === "Home" ? "/" : item === "Admin" ? "/admin/login" : `/${item.toLowerCase()}`}
                    className="font-body text-sm text-off-white/70 hover:text-gold transition-colors duration-300 inline-block relative group"
                  >
                    <span>{item}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-gold">Services</h4>
            <ul className="space-y-3">
              {[
                "Corporate Advisory",
                "Contract Drafting",
                "GST Advisory",
                "Income Tax",
                "Startup Advisory",
              ].map((item, idx) => (
                <motion.li 
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <span className="font-body text-sm text-off-white/70">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-gold">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 group text-off-white/70">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center"
                >
                  <Phone className="w-4 h-4 text-gold" />
                </motion.div>
                <a href="tel:+919760825111" className="font-body text-sm group-hover:text-gold transition-colors duration-300">+91-9760825111</a>
              </li>
              <li className="flex items-center gap-3 group text-off-white/70">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center"
                >
                  <Mail className="w-4 h-4 text-gold" />
                </motion.div>
                <a href="mailto:contact@solitic.in" className="font-body text-sm group-hover:text-gold transition-colors duration-300">contact@solitic.in</a>
              </li>
              <li className="flex items-start gap-3 group text-off-white/70">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0"
                >
                  <MapPin className="w-4 h-4 text-gold" />
                </motion.div>
                <span className="font-body text-sm group-hover:text-gold transition-colors duration-300">www.solitic.in</span>
              </li>
            </ul>

            {/* Social */}
            <div className="flex gap-4 mt-6">
              {[Linkedin, Twitter, Instagram].map((Icon, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  className="w-10 h-10 rounded-full border border-off-white/20 flex items-center justify-center hover:border-gold hover:bg-gold/10 transition-all duration-300 relative overflow-hidden group"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4 relative z-10" />
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ filter: "blur(8px)" }}
                  />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <motion.div 
          className="mt-16 pt-8 border-t border-off-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-body text-sm text-off-white/50">
            © 2024 Solitic Consulting. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <a
                key={item}
                href="#"
                className="font-body text-sm text-off-white/50 hover:text-gold transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
