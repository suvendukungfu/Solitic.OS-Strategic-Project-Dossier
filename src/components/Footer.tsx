'use client';

import Link from "next/link";
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import { SoliticLogo } from "./SoliticLogo";

export function Footer() {

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-8">
               <SoliticLogo size="md" variant="full" />
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
                  <svg 
                    viewBox="0 0 24 24" 
                    className="w-4 h-4 text-gold fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </motion.div>
                <a href="https://wa.me/919760825111" target="_blank" rel="noopener noreferrer" className="font-body text-sm group-hover:text-gold transition-colors duration-300">+91 97608 25111</a>
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
              {[
                { Icon: Linkedin, href: "https://www.linkedin.com/company/solitic-consulting/" },
                { Icon: Instagram, href: "https://www.instagram.com/solitic.consulting?igsh=MW85OXBhbnh6anlpOQ%3D%3D&utm_source=qr" },
                { 
                  Icon: (props: any) => (
                    <svg viewBox="0 0 24 24" className={props.className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  )
                , href: "https://wa.me/919760825111" }
              ].map(({ Icon, href }, idx) => (
                <motion.a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
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
            © 2026 Solitic Consulting. All rights reserved.
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
