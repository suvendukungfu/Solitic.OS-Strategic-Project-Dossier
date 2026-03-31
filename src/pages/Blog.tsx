'use client';
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    id: 1,
    slug: "understanding-corporate-compliance-2024",
    title: "Understanding Corporate Compliance in 2024",
    excerpt:
      "A comprehensive guide to navigating the evolving landscape of corporate compliance requirements and best practices for businesses.",
    category: "Compliance",
    author: "Siddh Dhingra",
    date: "Dec 20, 2024",
    readTime: "5 min read",
    featured: true,
  },
  {
    id: 2,
    slug: "contract-drafting-essentials",
    title: "Contract Drafting: 10 Clauses Every Business Must Include",
    excerpt:
      "Learn about the essential clauses that protect your business interests and minimize legal disputes in commercial agreements.",
    category: "Contracts",
    author: "Solitic Team",
    date: "Dec 15, 2024",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: 3,
    slug: "startup-legal-checklist",
    title: "Legal Checklist for Startups: From Idea to Incorporation",
    excerpt:
      "A step-by-step legal guide for entrepreneurs looking to transform their ideas into legally sound business entities.",
    category: "Startups",
    author: "Siddh Dhingra",
    date: "Dec 10, 2024",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: 4,
    slug: "roc-filings-guide",
    title: "ROC Filings: Common Mistakes and How to Avoid Them",
    excerpt:
      "Understanding the critical aspects of ROC filings and the common pitfalls that businesses should avoid.",
    category: "Compliance",
    author: "Solitic Team",
    date: "Dec 5, 2024",
    readTime: "4 min read",
    featured: false,
  },
  {
    id: 5,
    slug: "trademark-protection-strategies",
    title: "Protecting Your Brand: Trademark Registration Strategies",
    excerpt:
      "Everything you need to know about trademark registration and protecting your intellectual property in India.",
    category: "IP Rights",
    author: "Siddh Dhingra",
    date: "Nov 28, 2024",
    readTime: "8 min read",
    featured: false,
  },
  {
    id: 6,
    slug: "joint-ventures-legal-framework",
    title: "Joint Ventures in India: Legal Framework and Best Practices",
    excerpt:
      "A detailed overview of the legal considerations when entering into joint venture agreements in the Indian market.",
    category: "Corporate",
    author: "Solitic Team",
    date: "Nov 20, 2024",
    readTime: "10 min read",
    featured: false,
  },
];

const categories = ["All", "Compliance", "Contracts", "Startups", "IP Rights", "Corporate"];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find((post) => post.featured);

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
                Insights & Updates
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-off-white mt-4 mb-6">
                Legal <span className="text-gold">Insights</span>
              </h1>
              <p className="font-body text-lg text-off-white/70">
                Stay informed with the latest in corporate law, compliance, and business advisory.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="py-12 bg-background">
            <div className="container mx-auto px-6">
              <AnimatedSection>
                <a href={`/blog/${featuredPost.slug}`}>
                  <div className="group grid md:grid-cols-2 gap-8 p-8 bg-card rounded-xl border border-border hover:border-gold/50 transition-all duration-500 hover:shadow-gold">
                    <div className="aspect-video bg-charcoal rounded-lg flex items-center justify-center">
                      <span className="font-display text-6xl text-gold">S</span>
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="font-body text-xs font-medium text-gold uppercase tracking-wider mb-2">
                        Featured
                      </span>
                      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-gold transition-colors duration-300">
                        {featuredPost.title}
                      </h2>
                      <p className="font-body text-muted-foreground mb-6">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {featuredPost.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {featuredPost.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </AnimatedSection>
            </div>
          </section>
        )}

        {/* Filter & Search */}
        <section className="py-8 bg-background border-b border-border">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full font-body text-sm transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-gold text-charcoal"
                        : "bg-secondary text-muted-foreground hover:bg-gold/10 hover:text-gold"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts
                .filter((post) => !post.featured)
                .map((post, index) => (
                  <AnimatedSection key={post.id} delay={index * 0.1}>
                    <a href={`/blog/${post.slug}`}>
                      <article className="group h-full bg-card rounded-xl border border-border hover:border-gold/50 transition-all duration-500 hover:shadow-gold overflow-hidden">
                        <div className="aspect-video bg-charcoal flex items-center justify-center">
                          <span className="font-display text-4xl text-gold/50 group-hover:text-gold transition-colors duration-300">
                            S
                          </span>
                        </div>
                        <div className="p-6">
                          <span className="inline-block px-3 py-1 rounded-full bg-gold/10 text-gold font-body text-xs mb-3">
                            {post.category}
                          </span>
                          <h3 className="font-display text-lg font-semibold text-foreground mb-3 group-hover:text-gold transition-colors duration-300 line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="font-body text-sm text-muted-foreground mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{post.date}</span>
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </article>
                    </a>
                  </AnimatedSection>
                ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-16">
                <p className="font-body text-muted-foreground">No articles found.</p>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-charcoal">
          <div className="container mx-auto px-6">
            <AnimatedSection className="text-center max-w-2xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-off-white mb-4">
                Stay Updated
              </h2>
              <p className="font-body text-off-white/70 mb-8">
                Get the latest legal insights delivered straight to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-3 rounded-lg bg-off-white/10 border border-off-white/20 font-body text-off-white placeholder:text-off-white/50 focus:outline-none focus:border-gold transition-colors"
                />
                <Button variant="gold">
                  Subscribe <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
