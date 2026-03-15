import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Astroware Inc.",
  description:
    "Insights and perspectives on AI safety, alignment research, and agentic security from the Astroware team.",
};

const blogPosts = [
  {
    title: "The Defense Has to Live in the Pipeline, Not the Model",
    date: "March 2025",
    excerpt:
      "Why runtime security layers are essential for production AI systems. The model is just one piece — the pipeline is where the real defense happens.",
    content: "Full article content would go here...",
    tags: ["AI Safety", "Pipeline", "Defense"],
  },
  {
    title: "Why Agentic Security Is the Next Frontier",
    date: "February 2025",
    excerpt:
      "As AI agents gain capabilities, securing their behavior becomes critical. Here's what we've learned building Trishool.",
    content: "Full article content would go here...",
    tags: ["Agentic", "Security", "Trishool"],
  },
  {
    title: "Designing Guard Models That Actually Work",
    date: "January 2025",
    excerpt:
      "Lessons from building production-grade safety classifiers. What works in the lab often fails in production — here's how to bridge that gap.",
    content: "Full article content would go here...",
    tags: ["Guard Models", "Production", "Lessons"],
  },
  {
    title: "The Economics of AI Safety",
    date: "December 2024",
    excerpt:
      "Understanding the cost-benefit calculus of AI safety investments for enterprises. When does security ROI make sense?",
    content: "Full article content would go here...",
    tags: ["Economics", "Enterprise", "ROI"],
  },
  {
    title: "Constitutional AI in Practice",
    date: "November 2024",
    excerpt:
      "A practical guide to implementing constitutional AI approaches. From theory to deployment: what you need to know.",
    content: "Full article content would go here...",
    tags: ["Constitutional AI", "Practice", "Deployment"],
  },
  {
    title: "Lessons from UAE AI Governance",
    date: "October 2024",
    excerpt:
      "Insights from working with governments on AI regulation. What works, what doesn't, and where the industry is heading.",
    content: "Full article content would go here...",
    tags: ["Governance", "UAE", "Policy"],
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-24 md:py-32 mesh-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground mb-6">
            Blog
          </h1>
          <p className="text-xl md:text-2xl text-muted max-w-3xl leading-relaxed">
            Insights, perspectives, and lessons learned from building AI safety
            systems at scale.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article
                key={post.title}
                className="p-6 rounded-2xl border border-border bg-muted-dark/20 hover:bg-muted-dark/40 hover:border-muted transition-all duration-300 flex flex-col h-full"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm text-muted">{post.date}</span>
                </div>

                <h2 className="text-xl font-semibold text-foreground mb-3 hover:text-accent transition-colors duration-200">
                  <a href="#">{post.title}</a>
                </h2>

                <p className="text-muted leading-relaxed mb-6 flex-grow">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
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
            Get Notified
          </h2>
          <p className="text-lg text-muted mb-10 max-w-2xl mx-auto">
            Subscribe to our blog to receive the latest insights on AI safety
            and security.
          </p>
          <a
            href="mailto:hello@astroware.ai?subject=Blog%20Newsletter%20Subscription"
            className="inline-flex items-center px-8 py-4 text-base font-medium bg-foreground text-background rounded-full hover:bg-muted-foreground transition-colors duration-200"
          >
            Subscribe
          </a>
        </div>
      </section>
    </div>
  );
}