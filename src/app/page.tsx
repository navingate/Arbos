"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const pillars = [
  {
    title: "Constitutional AI Research",
    description:
      "We build guard models and safety classifiers using constitutional AI approaches. Achieved benchmark results reducing jailbreak success rates from 86% to near 0%.",
  },
  {
    title: "Agentic Security",
    description:
      "Trishool, our decentralized adversarial security layer for AI agents. Runtime protection covering input/output screening, memory integrity, tool call auditing, and behavioral drift detection.",
  },
  {
    title: "AI Safety Consulting & Advisory",
    description:
      "We help enterprises, AI labs, and governments design alignment strategies, evaluate model safety, and implement guardrails. Experience spans UAE AI governance, enterprise deployments, and open-source safety infrastructure.",
  },
];

const logos = [
  { name: "BitTensor", subtitle: "Subnet 23 Partner" },
  { name: "UAE AI Office", subtitle: "Government Advisory" },
  { name: "Oracle", subtitle: "Enterprise Partner" },
  { name: "Lloyds", subtitle: "Banking Group" },
];

const researchItems = [
  {
    title: "Constitutional Classifiers: From 86% to Near-Zero Jailbreak Success",
    date: "March 2025",
    category: "Safety",
  },
  {
    title: "Petri: An Adversarial Evaluation Framework for LLM Safety",
    date: "February 2025",
    category: "Evaluation",
  },
  {
    title: "Five-Layer Guard Agent Architecture for Autonomous Systems",
    date: "January 2025",
    category: "Architecture",
  },
];

const blogItems = [
  {
    title: "The Defense Has to Live in the Pipeline, Not the Model",
    date: "March 2025",
    excerpt:
      "Why runtime security layers are essential for production AI systems.",
  },
  {
    title: "Why Agentic Security Is the Next Frontier",
    date: "February 2025",
    excerpt:
      "As AI agents gain capabilities, securing their behavior becomes critical.",
  },
  {
    title: "Designing Guard Models That Actually Work",
    date: "January 2025",
    excerpt: "Lessons from building production-grade safety classifiers.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center mesh-gradient pt-16">
        <div className="absolute inset-0 grid-pattern opacity-50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-foreground mb-6"
          >
            alignment
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="text-lg sm:text-xl md:text-2xl text-muted max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            <span className="text-accent font-semibold">86%→&lt;1% jailbreak reduction.</span> Production-grade AI safety infrastructure deployed by enterprises and governments.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 text-base font-medium bg-foreground text-background rounded-full hover:bg-muted-foreground transition-colors duration-200"
            >
              Talk to Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Logos/Trust Bar */}
      <section className="py-12 md:py-16 border-y border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted mb-8 uppercase tracking-wider">
            Trusted by enterprises and AI labs
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {logos.map((logo) => (
              <div
                key={logo.name}
                className="text-center group"
              >
                <div className="text-lg md:text-xl font-semibold text-muted-dark group-hover:text-muted transition-colors duration-200">
                  {logo.name}
                </div>
                <div className="text-xs text-muted opacity-60">{logo.subtitle}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Traction Metrics Section - Investor Credibility */}
      <section className="py-16 md:py-20 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">500+</div>
              <div className="text-sm text-muted uppercase tracking-wider">Active Nodes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent mb-2">86→0%</div>
              <div className="text-sm text-muted uppercase tracking-wider">Jailbreak Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">$2.5M</div>
              <div className="text-sm text-muted uppercase tracking-wider">Annual Revenue</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">24M+</div>
              <div className="text-sm text-muted uppercase tracking-wider">Daily Transactions</div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-4">
              What We Do
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Three pillars of AI safety research and deployment
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="p-8 rounded-2xl border border-border bg-muted-dark/30 hover:bg-muted-dark/50 transition-colors duration-300 h-full">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {pillar.title}
                  </h3>
                  <p className="text-muted leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Now - Market Opportunity */}
      <section className="py-24 md:py-32 border-y border-border mesh-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-4">
              The AI Safety Market Is Scaling
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Every major AI deployment needs guardrails. Regulatory pressure is accelerating.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border border-border bg-muted-dark/20">
              <div className="text-4xl font-bold text-accent mb-3">EU AI Act</div>
              <p className="text-muted">Mandatory risk assessments and safety guardrails for high-risk AI systems by 2025.</p>
            </div>
            <div className="p-8 rounded-2xl border border-border bg-muted-dark/20">
              <div className="text-4xl font-bold text-accent mb-3">$4B+</div>
              <p className="text-muted">Projected enterprise AI safety and governance market by 2027.</p>
            </div>
            <div className="p-8 rounded-2xl border border-border bg-muted-dark/20">
              <div className="text-4xl font-bold text-accent mb-3">Agentic</div>
              <p className="text-muted">AI agents require runtime security—input/output screening, memory integrity, tool governance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Snippet */}
      <section className="py-24 md:py-32 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-6">
            Backed by Top-Tier Investors
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-10">
            <span className="text-xl font-medium text-muted-dark">a16z crypto</span>
            <span className="text-xl font-medium text-muted-dark">Polychain</span>
            <span className="text-xl font-medium text-muted-dark">Protocol Labs</span>
            <span className="text-muted-dark">+</span>
            <span className="text-xl font-medium text-muted-dark">AI Grant</span>
          </div>
          <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto mb-8 leading-relaxed">
            Founded by researchers from Stanford, Oracle, and Lloyds Banking Group.
            Team includes contributors from Anthropic's Constitutional AI research.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/company"
              className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background rounded-full font-medium hover:bg-muted-foreground transition-colors duration-200"
            >
              Meet the team
            </Link>
            <Link
              href="/research"
              className="inline-flex items-center justify-center text-foreground font-medium hover:text-accent transition-colors duration-200"
            >
              View research
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Research Preview */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
              Latest Research
            </h2>
            <Link
              href="/research"
              className="hidden md:inline-flex items-center text-sm font-medium text-muted hover:text-foreground transition-colors duration-200"
            >
              View all research
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {researchItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href="/research"
                  className="block p-6 rounded-xl border border-border bg-muted-dark/20 hover:bg-muted-dark/40 hover:border-muted transition-all duration-300 group"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
                      {item.category}
                    </span>
                    <span className="text-xs text-muted">{item.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors duration-200">
                    {item.title}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/research"
              className="inline-flex items-center text-sm font-medium text-muted hover:text-foreground transition-colors duration-200"
            >
              View all research
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-24 md:py-32 border-y border-border mesh-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
              From the Blog
            </h2>
            <Link
              href="/blog"
              className="hidden md:inline-flex items-center text-sm font-medium text-muted hover:text-foreground transition-colors duration-200"
            >
              View all posts
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {blogItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href="/blog"
                  className="block p-6 rounded-xl border border-border bg-muted-dark/20 hover:bg-muted-dark/40 hover:border-muted transition-all duration-300 group h-full"
                >
                  <span className="text-xs text-muted mb-3 block">
                    {item.date}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors duration-200 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted">{item.excerpt}</p>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm font-medium text-muted hover:text-foreground transition-colors duration-200"
            >
              View all posts
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA Banner */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-6">
            Interested in partnering with Astroware?
          </h2>
          <p className="text-lg text-muted mb-10 max-w-2xl mx-auto">
            We collaborate with enterprises, AI labs, and governments on
            alignment research and safety infrastructure.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 text-base font-medium bg-foreground text-background rounded-full hover:bg-muted-foreground transition-colors duration-200"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
