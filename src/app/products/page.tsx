import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Products — Astroware Inc.",
  description:
    "Explore Astroware's AI safety products: Trishool, Petri, and Constitutional AI guard models.",
};

const products = [
  {
    id: "trishool",
    name: "Trishool",
    tagline: "Agentic Security Runtime Layer",
    description:
      "Trishool is our decentralized adversarial security layer for AI agents. It provides comprehensive runtime protection covering input/output screening, memory integrity, tool call auditing, and behavioral drift detection.",
    highlights: [
      "Input/Output screening in real-time",
      "Memory integrity verification",
      "Tool call auditing and logging",
      "Behavioral drift detection",
      "Subnet 23 on BitTensor",
    ],
    stats: [
      { label: "Active Nodes", value: "500+" },
      { label: "Daily Transactions", value: "2M+" },
      { label: "Threats Blocked", value: "50K+" },
    ],
    cta: "Learn More",
    ctaLink: "#",
  },
  {
    id: "petri",
    name: "Petri",
    tagline: "Adversarial Evaluation Framework",
    description:
      "Petri is a comprehensive evaluation framework for testing LLM safety under adversarial conditions. It provides reproducible safety assessments across multiple attack vectors.",
    highlights: [
      "200-seed prompt library",
      "Auditor-target-judge architecture",
      "Automated red-teaming",
      "Benchmark scoring",
      "Open-source release",
    ],
    stats: [
      { label: "Prompt Seeds", value: "200" },
      { label: "Attack Vectors", value: "15+" },
      { label: "Models Tested", value: "50+" },
    ],
    cta: "Learn More",
    ctaLink: "#",
  },
  {
    id: "guard-models",
    name: "Guard Models",
    tagline: "Constitutional AI Safety Classifiers",
    description:
      "Our family of constitutional AI guard models provides state-of-the-art safety classification. Trained using constitutional AI principles, they achieve industry-leading performance on standard benchmarks.",
    highlights: [
      "Constitutional AI training methodology",
      "Benchmarking against HarmBench, WildGuard, XSTest",
      "Low latency for production deployment",
      "Fine-tuning available for specific domains",
      "API and self-hosted options",
    ],
    stats: [
      { label: "Jailbreak Success", value: "<1%" },
      { label: "Latency", value: "<50ms" },
      { label: "Coverage", value: "12 categories" },
    ],
    cta: "Learn More",
    ctaLink: "#",
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Social Proof Banner */}
      <div className="bg-accent/5 border-b border-accent/10 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-accent">
            Trusted by UAE AI Office, Fortune 500s, and 500+ decentralized nodes
          </p>
        </div>
      </div>
      {/* Header */}
      <section className="py-24 md:py-32 mesh-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground mb-6">
            Products
          </h1>
          <p className="text-xl md:text-2xl text-muted max-w-3xl leading-relaxed">
            Production-ready AI safety tools built from our research. Deploy
            with confidence.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
          {products.map((product, index) => (
            <div
              key={product.id}
              id={product.id}
              className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
                    Product
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-2">
                  {product.name}
                </h2>
                <p className="text-lg text-accent mb-6">{product.tagline}</p>
                <p className="text-muted leading-relaxed mb-8">
                  {product.description}
                </p>

                <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                  Key Features
                </h3>
                <ul className="space-y-3 mb-8">
                  {product.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-3 text-muted"
                    >
                      <svg
                        className="w-5 h-5 text-accent mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {highlight}
                    </li>
                  ))}
                </ul>

                <Link
                  href={product.ctaLink}
                  className="inline-flex items-center px-6 py-3 text-base font-medium bg-foreground text-background rounded-full hover:bg-muted-foreground transition-colors duration-200"
                >
                  {product.cta}
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

              <div>
                <div className="p-8 rounded-2xl border border-border bg-muted-dark/20">
                  {/* Visual System Preview */}
                  <div className="aspect-square max-h-96 mx-auto bg-gradient-to-br from-accent/5 via-muted-dark/30 to-background rounded-xl mb-8 p-6 flex flex-col">
                    <div className="flex-1 flex items-center justify-center">
                      {product.id === "trishool" && (
                        <div className="w-full space-y-4 px-4">
                          <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                              <span className="text-sm text-foreground">Input Screening</span>
                            </div>
                            <span className="text-xs text-green-400">PASS</span>
                          </div>
                          <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                              <span className="text-sm text-foreground">Memory Check</span>
                            </div>
                            <span className="text-xs text-green-400">INTEGRITY OK</span>
                          </div>
                          <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                              <span className="text-sm text-foreground">Tool Audit</span>
                            </div>
                            <span className="text-xs text-green-400">LOGGED</span>
                          </div>
                          <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-accent/50">
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 rounded-full bg-accent" />
                              <span className="text-sm text-foreground">Behavioral Analysis</span>
                            </div>
                            <span className="text-xs text-accent">MONITORING</span>
                          </div>
                        </div>
                      )}
                      {product.id === "petri" && (
                        <div className="w-full px-4">
                          <div className="grid grid-cols-3 gap-2 mb-6">
                            <div className="h-2 bg-accent rounded-full w-full" />
                            <div className="h-2 bg-accent/60 rounded-full w-3/4" />
                            <div className="h-2 bg-accent/30 rounded-full w-1/2" />
                          </div>
                          <div className="space-y-3">
                            {["Prompt Injection", "Jailbreak Attempt", "Data Exfiltration"].map((attack, i) => (
                              <div key={attack} className="flex items-center justify-between p-3 bg-background rounded border border-border">
                                <span className="text-sm text-muted">{attack}</span>
                                <span className={`text-xs ${i < 2 ? 'text-red-400' : 'text-green-400'}`}>{i < 2 ? 'BLOCKED' : 'DETECTED'}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {product.id === "guard-models" && (
                        <div className="text-center px-4">
                          <div className="inline-flex flex-col items-center">
                            <span className="text-6xl md:text-7xl font-bold text-accent mb-2">99.7%</span>
                            <span className="text-sm text-muted mb-6">Harmful Content Detection</span>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <div className="text-xl font-semibold text-foreground">HarmBench</div>
                              <div className="text-xs text-green-400">SOTA</div>
                            </div>
                            <div>
                              <div className="text-xl font-semibold text-foreground">WildGuard</div>
                              <div className="text-xs text-green-400">BEATS</div>
                            </div>
                            <div>
                              <div className="text-xl font-semibold text-foreground">XSTest</div>
                              <div className="text-xs text-green-400">99.1%</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    {product.stats.map((stat) => (
                      <div key={stat.label} className="text-center">
                        <div className="text-2xl md:text-3xl font-semibold text-foreground mb-1">
                          {stat.value}
                        </div>
                        <div className="text-xs text-muted">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 border-t border-border mesh-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-6">
            Ready to secure your AI systems?
          </h2>
          <p className="text-lg text-muted mb-10 max-w-2xl mx-auto">
            Get in touch to learn more about our products and how we can help
            protect your AI deployments.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 text-base font-medium bg-foreground text-background rounded-full hover:bg-muted-foreground transition-colors duration-200"
          >
            Contact Sales
          </Link>
        </div>
      </section>
    </div>
  );
}