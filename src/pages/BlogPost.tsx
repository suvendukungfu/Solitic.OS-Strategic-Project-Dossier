'use client';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const blogContent: Record<string, {
  title: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  content: string[];
}> = {
  "understanding-corporate-compliance-2024": {
    title: "Understanding Corporate Compliance in 2024",
    category: "Compliance",
    author: "Siddh Dhingra",
    date: "Dec 20, 2024",
    readTime: "5 min read",
    content: [
      "Corporate compliance has evolved significantly in recent years, with regulatory bodies implementing stricter guidelines and increased oversight. As we navigate 2024, businesses must stay ahead of these changes to avoid penalties and maintain their reputation.",
      "The key areas of focus for corporate compliance include regulatory filings, corporate governance, data protection, and environmental compliance. Each of these areas requires dedicated attention and a proactive approach to ensure adherence to the latest regulations.",
      "One of the most significant changes in 2024 is the increased emphasis on digital compliance. With more businesses operating online, regulators have introduced new requirements for data handling, cybersecurity, and digital transactions. Companies must invest in robust compliance management systems to track and manage these requirements effectively.",
      "At Solitic Consulting, we recommend a three-pronged approach to compliance: regular audits, continuous training, and technology integration. Regular audits help identify gaps before they become issues. Continuous training ensures your team stays updated on the latest requirements. Technology integration streamlines compliance processes and reduces the risk of human error.",
      "Looking ahead, we expect compliance requirements to continue evolving. Businesses that adopt a proactive stance and invest in compliance infrastructure will be better positioned to navigate these changes while focusing on growth.",
    ],
  },
  "contract-drafting-essentials": {
    title: "Contract Drafting: 10 Clauses Every Business Must Include",
    category: "Contracts",
    author: "Solitic Team",
    date: "Dec 15, 2024",
    readTime: "7 min read",
    content: [
      "A well-drafted contract is the foundation of any successful business relationship. Yet, many businesses overlook critical clauses that could protect them from disputes and liabilities. Here are the 10 essential clauses every business contract should include.",
      "1. Definitions Clause: Clearly define all key terms used in the contract to avoid ambiguity and misinterpretation.",
      "2. Scope of Work: Detail exactly what services or products will be delivered, including timelines and milestones.",
      "3. Payment Terms: Specify payment amounts, schedules, methods, and consequences for late payments.",
      "4. Confidentiality Clause: Protect sensitive information shared between parties during the business relationship.",
      "5. Limitation of Liability: Cap potential damages and specify what types of damages are recoverable.",
      "6. Indemnification: Outline circumstances under which one party must compensate the other for losses.",
      "7. Termination Clause: Establish grounds and procedures for ending the contract, including notice periods.",
      "8. Dispute Resolution: Specify whether disputes will be handled through mediation, arbitration, or litigation.",
      "9. Force Majeure: Address unforeseen circumstances that may prevent contract performance.",
      "10. Governing Law: Determine which jurisdiction's laws will apply to the contract interpretation and disputes.",
    ],
  },
};

const BlogPost = () => {
  const slug = typeof window !== 'undefined' ? window.location.pathname.split('/').pop() : '';
  const post = slug ? blogContent[slug] : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-20 container mx-auto px-6 text-center">
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">
            Article Not Found
          </h1>
          <p className="font-body text-muted-foreground mb-8">
            The article you're looking for doesn't exist or has been moved.
          </p>
          <Button variant="gold" asChild>
            <a href="/blog">Back to Blog</a>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

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
              className="max-w-3xl mx-auto"
            >
              <a
                href="/blog"
                className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-body text-sm">Back to Blog</span>
              </a>

              <span className="inline-block px-3 py-1 rounded-full bg-gold/20 text-gold font-body text-xs mb-4">
                {post.category}
              </span>

              <h1 className="font-display text-3xl md:text-5xl font-bold text-off-white mb-6">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-off-white/70 font-body text-sm">
                <span>By {post.author}</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-3xl mx-auto"
            >
              {post.content.map((paragraph, index) => (
                <p
                  key={index}
                  className="font-body text-lg text-foreground/80 leading-relaxed mb-6"
                >
                  {paragraph}
                </p>
              ))}

              {/* Share */}
              <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
                <div className="font-body text-sm text-muted-foreground">
                  Share this article
                </div>
                <Button variant="gold-outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </motion.article>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Need Legal Guidance?
            </h2>
            <p className="font-body text-muted-foreground mb-8">
              Our team is ready to help you navigate complex legal matters.
            </p>
            <Button variant="gold" size="lg" asChild>
              <a href="/contact">Contact Us</a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
