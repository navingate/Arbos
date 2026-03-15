import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research — Astroware Inc.",
  description:
    "Explore Astroware's research on AI alignment, safety classifiers, and adversarial evaluation frameworks.",
};

const researchItems = [
  {
    title: "Constitutional Classifiers: From 86% to Near-Zero Jailbreak Success",
    date: "March 2025",
    category: "Guard Models",
    abstract:
      "We present a novel approach to building safety classifiers using constitutional AI principles. By encoding safety constraints directly into the training process, we achieve near-zero jailbreak success rates on standard benchmarks, compared to 86% baseline failure rates.",
    tags: ["Safety", "Guard Models", "Constitutional AI"],
  },
  {
    title: "Petri: An Adversarial Evaluation Framework for LLM Safety",
    date: "February 2025",
    category: "Evaluation",
    abstract:
      "Petri is a comprehensive evaluation framework for testing LLM safety under adversarial conditions. With a 200-seed prompt library and an auditor-target-judge architecture, Petri provides reproducible safety assessments across multiple attack vectors.",
    tags: ["Evaluation", "Adversarial", "LLM Safety"],
  },
  {
    title: "Five-Layer Guard Agent Architecture for Autonomous Systems",
    date: "January 2025",
    category: "Architecture",
    abstract:
      "We propose a five-layer architecture for securing autonomous AI agents: input validation, output filtering, memory integrity checks, tool call auditing, and behavioral drift detection. This architecture forms the foundation of our Trishool product.",
    tags: ["Architecture", "Agentic Security", "Runtime Protection"],
  },
  {
    title: "Covenant72B: Constitutional Alignment at Scale",
    date: "December 2024",
    category: "Alignment",
    abstract:
      "Covenant72B demonstrates that constitutional AI approaches can scale to 72 billion parameter models. We detail the training methodology, benchmark results, and lessons learned from aligning a large-scale model with safety principles.",
    tags: ["Alignment", "Scale", "Constitutional AI"],
  },
  {
    title: "Evaluating Guard Models Against Emerging Attack Vectors",
    date: "November 2024",
    category: "Evaluation",
    abstract:
      "A comprehensive evaluation of current guard models against newly discovered attack vectors. We identify vulnerabilities in existing solutions and propose improvements for next-generation safety classifiers.",
    tags: ["Evaluation", "Guard Models", "Security"],
  },
  {
    title: "Runtime Monitoring for Agentic AI Systems",
    date: "October 2024",
    category: "Security",
    abstract:
      "Techniques for monitoring AI agents in production to detect and prevent unsafe behavior. Our approach combines rule-based heuristics with learned anomaly detection for comprehensive runtime protection.",
    tags: ["Security", "Runtime", "Monitoring"],
  },
];

export default function ResearchPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-24 md:py-32 mesh-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground mb-6">
            Research
          </h1>
          <p className="text-xl md:text-2xl text-muted max-w-3xl leading-relaxed">
            Advancing the frontier of AI safety through rigorous research,
            open-source tools, and practical deployments.
          </p>
        </div>
      </section>

      {/* Research List */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {researchItems.map((item, index) => (
              <article
                key={item.title}
                className="p-8 rounded-2xl border border-border bg-muted-dark/20 hover:bg-muted-dark/40 transition-colors duration-300"
              >
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
                    {item.category}
                  </span>
                  <span className="text-sm text-muted">{item.date}</span>
                </div>

                <h2 className="text-2xl font-semibold text-foreground mb-4 hover:text-accent transition-colors duration-200">
                  <a href="#">{item.title}</a>
                </h2>

                <p className="text-muted leading-relaxed mb-6 max-w-4xl">
                  {item.abstract}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs bg-muted-dark text-muted-foreground rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 md:py-32 border-t border-border mesh-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-6">
            Stay Updated
          </h2>
          <p className="text-lg text-muted mb-10 max-w-2xl mx-auto">
            Subscribe to our research newsletter to receive updates on new
            publications and findings.
          </p>
          <a
            href="mailto:hello@astroware.ai?subject=Research%20Newsletter%20Subscription"
            className="inline-flex items-center px-8 py-4 text-base font-medium bg-foreground text-background rounded-full hover:bg-muted-foreground transition-colors duration-200"
          >
            Subscribe
          </a>
        </div>
      </section>
    </div>
  );
}