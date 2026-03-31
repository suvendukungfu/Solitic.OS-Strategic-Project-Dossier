'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AnimatedSection } from '@/components/AnimatedSection';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    website: '', // Honeypot
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to send message');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '', website: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      value: '+91-9760825111',
      description: 'Mon–Sat, 10am–7pm IST',
      href: 'tel:+919760825111',
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'contact@solitic.in',
      description: 'We respond within 24 hours',
      href: 'mailto:contact@solitic.in',
    },
    {
      icon: MapPin,
      title: 'Website',
      value: 'www.solitic.in',
      description: 'Visit us online',
      href: 'https://www.solitic.in',
    },
    {
      icon: Clock,
      title: 'Working Hours',
      value: 'Mon – Sat',
      description: '10:00 AM – 7:00 PM IST',
      href: null,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-charcoal">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <span className="font-body text-sm font-medium text-gold uppercase tracking-wider">
                Get In Touch
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-off-white mt-4 mb-6 leading-tight">
                Let&apos;s Build Something{' '}
                <span className="text-gold italic">Meaningful.</span>
              </h1>
              <p className="font-body text-lg text-off-white/70 max-w-xl">
                Ready to navigate legal complexities with clarity? We&apos;re here to help you execute with confidence.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <div className="lg:col-span-1">
                <AnimatedSection>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-8">
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    {contactInfo.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border shadow-sm hover:border-gold/30 transition-colors"
                      >
                        <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-5 h-5 text-gold" />
                        </div>
                        <div>
                          <h3 className="font-body font-bold text-foreground text-sm tracking-tight">
                            {item.title}
                          </h3>
                          {item.href ? (
                            <a
                              href={item.href}
                              className="font-body text-sm text-gold font-medium mt-0.5 block hover:text-gold/80 transition-colors"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="font-body text-sm text-gold font-medium mt-0.5">{item.value}</p>
                          )}
                          <p className="font-body text-xs text-muted-foreground mt-1.5 opacity-70">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <AnimatedSection delay={0.2}>
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-card border border-border rounded-3xl p-8 md:p-12 text-center flex flex-col items-center gap-6"
                    >
                      <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
                        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                      </div>
                      <div>
                        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                          Message Received!
                        </h2>
                        <p className="font-body text-muted-foreground max-w-sm">
                          Thank you for reaching out. Our team will review your message and get back to you within 24 business hours.
                        </p>
                        <p className="font-body text-sm text-gold mt-4 font-medium">
                          A confirmation has been sent to your email.
                        </p>
                      </div>
                      <Button
                        variant="gold"
                        onClick={() => setSubmitted(false)}
                        className="mt-2"
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-golden-soft">
                      <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                        Send Us a Message
                      </h2>
                      <p className="font-body text-sm text-muted-foreground mb-8">
                        Your message will be delivered to <span className="text-gold font-medium">contact@solitic.in</span>
                      </p>

                      {error && (
                        <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 font-body text-sm">
                          {error}
                        </div>
                      )}

                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Honeypot field (hidden from humans) */}
                        <div className="hidden" aria-hidden="true">
                          <input
                            type="text"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            tabIndex={-1}
                            autoComplete="off"
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="block font-body text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              onBlur={(e) => setFormData(prev => ({ ...prev, name: e.target.value.trim() }))}
                              required
                              className="w-full px-5 py-4 rounded-xl border border-border bg-background/50 font-body text-foreground focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all text-sm"
                              placeholder="Your full name"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block font-body text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="w-full px-5 py-4 rounded-xl border border-border bg-background/50 font-body text-foreground focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all text-sm"
                              placeholder="your@email.com"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="block font-body text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full px-5 py-4 rounded-xl border border-border bg-background/50 font-body text-foreground focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all text-sm"
                              placeholder="+91 XXXXX XXXXX"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block font-body text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                              Company Name
                            </label>
                            <input
                              type="text"
                              name="company"
                              value={formData.company}
                              onChange={handleChange}
                              className="w-full px-5 py-4 rounded-xl border border-border bg-background/50 font-body text-foreground focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all text-sm"
                              placeholder="Your company"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block font-body text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                            Subject *
                          </label>
                          <div className="relative">
                            <select
                              name="subject"
                              value={formData.subject}
                              onChange={handleChange}
                              required
                              className="w-full px-5 py-4 rounded-xl border border-border bg-background/50 font-body text-foreground focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all appearance-none cursor-pointer text-sm"
                            >
                              <option value="">Select a subject</option>
                              <option value="Corporate Advisory">Corporate Advisory</option>
                              <option value="Contract Drafting">Contract Drafting</option>
                              <option value="Compliance Support">Compliance Support</option>
                              <option value="Startup Advisory">Startup Advisory</option>
                              <option value="IP Rights">Intellectual Property Rights</option>
                              <option value="General Inquiry">General Inquiry</option>
                              <option value="Other">Other</option>
                            </select>
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                                <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block font-body text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                            Message *
                          </label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="w-full px-5 py-4 rounded-xl border border-border bg-background/50 font-body text-foreground focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all resize-none text-sm placeholder:italic"
                            placeholder="Tell us about your legal needs or how we can help... (minimum 10 characters)"
                          />
                        </div>

                        <Button
                          type="submit"
                          variant="gold"
                          size="lg"
                          disabled={isSubmitting}
                          className="w-full py-7 font-bold text-base rounded-xl shadow-golden-glow"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center gap-2">
                              <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                              Sending your message...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              Send Message
                              <Send className="w-4 h-4" />
                            </span>
                          )}
                        </Button>

                        <p className="text-center font-body text-xs text-muted-foreground">
                          Your message will be delivered directly to our team at{' '}
                          <span className="text-gold">contact@solitic.in</span>
                        </p>
                      </form>
                    </div>
                  )}
                </AnimatedSection>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
