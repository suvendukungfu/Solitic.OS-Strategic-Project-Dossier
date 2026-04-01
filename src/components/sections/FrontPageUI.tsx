'use client';

import { motion } from "framer-motion";
import { ArrowRight, Building2, Shield, Users, Target, Heart, Award, Scale, Rocket, BookOpen, FileText, Receipt, Calculator, Briefcase } from "lucide-react";
import Link from "next/link";
import { cn } from "../../lib/utils";

const services = [
  { icon: Building2, title: "Corporate Advisory", description: "Business structuring, JVs, and foreign collaborations." },
  { icon: FileText, title: "Contract Drafting", description: "Every agreement carries legal and financial weight." },
  { icon: BookOpen, title: "Company Law", description: "ROC filings and annual governance compliance." },
  { icon: Receipt, title: "GST Advisory", description: "Registration, filing, and audit support." },
  { icon: Calculator, title: "Income Tax", description: "Planning, ITR filing, and representations." },
  { icon: Scale, title: "Trademark", description: "Registration and intellectual property protection." },
  { icon: Rocket, title: "Startup Advisory", description: "Funding strategies and legal structuring." },
  { icon: Briefcase, title: "KPO Services", description: "Specialized legal support for firms." },
];

const approach = [
  { number: "01", title: "Analyze", description: "Identifying gaps in legal and strategic standing." },
  { number: "02", title: "Evaluate", description: "Assessing alignment with client needs openly." },
  { number: "03", title: "Resolve", description: "Crafting tailored, high-impact solutions." },
];

export function FrontPageUI() {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-[#F5EFE6] text-black font-display pt-24 pb-12 overflow-hidden selection:bg-red-600 selection:text-white">
      {/* 1. MASTHEAD */}
      <header className="container mx-auto px-6 border-b-4 border-black pb-8">
        <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-4 mb-4">
               <div className="w-12 h-px bg-black/20" />
               <span className="text-[10px] font-black uppercase tracking-[0.5em] text-black/40">Official Intelligence Archive</span>
               <div className="w-12 h-px bg-black/20" />
            </div>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-none mb-4">
               The <span className="text-red-600 italic">Solitic.</span>
            </h1>
            <div className="w-full flex justify-between items-center py-3 border-y-2 border-black/10 text-[11px] font-black uppercase tracking-[0.3em]">
               <div className="flex gap-4">
                  <span>Vol. LXXXIV</span>
                  <span className="text-black/20">|</span>
                  <span>No. 127</span>
               </div>
               <div className="italic font-serif text-sm tracking-normal capitalize flex items-center gap-2">
                  <span className="text-red-600">●</span>
                  {currentDate}
               </div>
               <div className="flex gap-4">
                  <span>Price: Strategic</span>
                  <span className="text-black/20">|</span>
                  <span>National Edition</span>
               </div>
            </div>
        </div>
      </header>

      <main className="container mx-auto px-6 mt-12">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* LEFT COLUMN: THE LEAD STORY */}
          <section className="lg:col-span-8 flex flex-col gap-12 border-b-2 border-black/5 pb-12 lg:border-b-0">
            <div className="flex flex-col gap-6">
               <div className="inline-block px-3 py-1 bg-red-600 text-white text-[9px] font-black uppercase tracking-[0.4em] self-start">
                  Strategic Briefing
               </div>
               <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] group cursor-default">
                  Navigate Corporate <br />
                  <span className="text-red-600">Complexity</span> with <br />
                  Definitive <span className="italic underline decoration-4 underline-offset-8">Clarity.</span>
               </h2>
               <p className="font-serif text-xl md:text-2xl italic text-black/70 max-w-2xl leading-relaxed">
                  "In an era of regulatory volatility, Solitic provides the authoritative steering required for high-stakes enterprise governance."
               </p>
               <div className="flex gap-4 mt-4">
                  <Link href="/contact" className="px-8 py-4 bg-black text-white text-xs font-black uppercase tracking-[0.3em] hover:bg-red-600 transition-all duration-300">
                     Begin Audit
                  </Link>
                  <Link href="/about" className="px-8 py-4 border-2 border-black text-xs font-black uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-300">
                     Internal Profile
                  </Link>
               </div>
            </div>

            {/* THE EDITORIAL (MISSION) */}
            <div className="grid md:grid-cols-2 gap-12 py-12 border-y-2 border-black items-start">
               <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-black uppercase tracking-[0.4em] text-red-600">The Editorial</h3>
                  <p className="font-serif text-lg leading-relaxed first-letter:text-6xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-black">
                     At Solitic Consulting, we're here for those who feel lost in legal and business complexities. We offer honest, end-to-end guidance to help you move forward — because no one should feel stuck just because they don't know where to begin.
                  </p>
               </div>
               <div className="flex flex-col gap-6 bg-white shadow-2xl p-8 border-2 border-black rotate-1">
                  <div className="flex items-center gap-3">
                     <Target className="w-5 h-5 text-red-600" />
                     <span className="text-xs font-black uppercase tracking-widest underline decoration-red-600/30">Target Objectives</span>
                  </div>
                  <div className="space-y-4">
                     <div className="flex justify-between items-end border-b border-black/10 pb-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-black/40">Clients Served</span>
                        <span className="text-xl font-black">10+</span>
                     </div>
                     <div className="flex justify-between items-end border-b border-black/10 pb-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-black/40">Confidentiality</span>
                        <span className="text-xl font-black text-red-600">100%</span>
                     </div>
                     <div className="flex justify-between items-end border-b border-black/10 pb-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-black/40">Active Mandates</span>
                        <span className="text-xl font-black tracking-tighter">GLOBAL</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* OPERATIONAL LOG (APPROACH) */}
            <div className="flex flex-col gap-8">
               <h3 className="text-xs font-black uppercase tracking-[0.4em] text-red-600 text-center">Operational Timeline</h3>
               <div className="grid md:grid-cols-3 gap-8">
                  {approach.map((step) => (
                     <div key={step.number} className="flex flex-col gap-4 p-6 border border-black/10 hover:bg-white hover:shadow-xl transition-all duration-500 group">
                        <span className="text-4xl font-black text-black/10 group-hover:text-red-600 transition-colors">{step.number}</span>
                        <h4 className="text-sm font-black uppercase tracking-widest">{step.title}</h4>
                        <p className="font-serif italic text-sm text-black/60">{step.description}</p>
                     </div>
                  ))}
               </div>
            </div>
          </section>

          {/* RIGHT COLUMN: RECAP & BRIEFS */}
          <aside className="lg:col-span-4 flex flex-col gap-12 border-l-2 border-black/5 lg:pl-12">
            
            {/* SERVICES RECAP */}
            <div className="flex flex-col gap-8">
               <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white bg-black px-4 py-2 self-start">Dispatch Highlights</h3>
               <div className="flex flex-col divide-y-2 divide-black/5">
                  {services.map((service, idx) => (
                     <div key={idx} className="py-6 flex gap-4 group cursor-pointer">
                        <div className="w-10 h-10 border-2 border-black flex flex-shrink-0 items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-300">
                           <service.icon className="w-5 h-5 group-hover:text-white transition-colors" />
                        </div>
                        <div className="flex flex-col gap-1">
                           <h4 className="text-xs font-black uppercase tracking-widest decoration-red-600/30 line-clamp-1">{service.title}</h4>
                           <p className="font-serif text-[13px] text-black/50 italic leading-snug line-clamp-2">{service.description}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* AD SPACE / CALLOUT */}
            <section className="bg-black text-white p-8 flex flex-col gap-6 -rotate-2 shadow-2xl">
               <div className="flex justify-between items-center border-b border-white/20 pb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-600">Urgent Dispatch</span>
                  <Shield className="w-4 h-4 text-white/40" />
               </div>
               <h3 className="text-3xl font-black uppercase tracking-tighter leading-none italic">
                  Institutional <br />
                  Grade <br />
                  Governance.
               </h3>
               <p className="text-[11px] font-serif opacity-50 px-2 border-l border-red-600">
                  "The standard for those who demand precision in the face of legal obscurity."
               </p>
               <button className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] hover:bg-red-600 hover:text-white transition-all">
                  Request Intelligence
               </button>
            </section>

          </aside>
        </div>
      </main>

      {/* FOOTER BAR */}
      <footer className="container mx-auto px-6 mt-24 pt-8 border-t-4 border-black flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-black/40">
         <span>Solitic Strategic Archive © 2024</span>
         <div className="flex gap-8">
            <span className="hover:text-black cursor-pointer">Ver. 2.0.4 - RELEASE</span>
            <span className="hover:text-black cursor-pointer">Authenticated</span>
         </div>
      </footer>
    </div>
  );
}
