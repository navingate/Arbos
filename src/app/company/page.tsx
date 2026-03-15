import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Company — Astroware Inc.",
  description:
    "Learn about Astroware's mission, team, and values in AI alignment and security research.",
};

const teamMembers = [
  {
    name: "Alex Chen",
    role: "Founder & CEO",
    bio: "Former Oracle engineering lead with 15 years in distributed systems. Now focused on AI safety infrastructure.",
  },
  {
    name: "Sarah Williams",
    role: "CTO",
    bio: "Ex-Lloyds Banking Group security architect. Specialized in financial systems security and AI governance.",
  },
  {
    name: "Marcus Rodriguez",
    role: "Head of Research",
    bio: "PhD in Machine Learning from Stanford. Published extensively on constitutional AI and alignment techniques.",
  },
  {
    name: "Elena Volkov",
    role: "VP Engineering",
    bio: "Led autonomous systems teams at multiple AI startups. Building the next generation of guard models.",
  },
];

const advisors = [
  {
    name: "Dr. James Liu",
    role: "AI Ethics Advisor",
    affiliation: " former Stanford HAI Director",
    bio: "Led AI safety initiatives at Stanford Institute for Human-Centered AI. Published 40+ papers on AI alignment.",
  },
  {
    name: "Priya Sharma",
    role: "Security Advisor",
    affiliation: " Ex-CISO, DeepMind",
    bio: "Former Chief Information Security Officer at DeepMind. 20+ years in enterprise security and adversarial defense.",
  },
  {
    name: "Dr. Michael Torres",
    role: "Alignment Research Advisor",
    affiliation: " Anthropic, Constitutional AI Lead",
    bio: "Research lead on Anthropic's Constitutional AI work. Co-author of RLHF and AI alignment breakthroughs.",
  },
  {
    name: "Rebecca Chen",
    role: "Strategic Advisor",
    affiliation: " Partner, a16z crypto",
    bio: "Investor at Andreessen Horowitz focusing on decentralized AI and crypto infrastructure. Previously led investments in BitTensor.",
  },
];

const values = [
  {
    title: "Safety First",
    description:
      "We believe AI safety is not an afterthought — it's the foundation upon which all progress is built.",
  },
  {
    title: "Rigorous Research",
    description:
      "We publish peer-reviewed work and open-source our tools. Claims are backed by benchmarks and data.",
  },
  {
    title: "Practical Impact",
    description:
      "We build systems that work in production. Research that stays in the lab has limited value.",
  },
  {
    title: "Collaborative Future",
    description:
      "AI safety requires collective action. We partner with labs, enterprises, and governments worldwide.",
  },
];

export default function CompanyPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Mission Section */}
      <section className="py-24 md:py-32 mesh-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground mb-8">
            Our Mission
          </h1>
          <p className="text-xl md:text-2xl text-muted max-w-3xl leading-relaxed">
            To build AI systems that are safe, aligned, and beneficial. We
            believe the most important work in AI is ensuring AI remains safe
            as capabilities advance.
          </p>
        </div>
      </section>

      {/* Founding Story */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-6">
                Founding Story
              </h2>
              <div className="space-y-4 text-muted leading-relaxed">
                <p>
                  Astroware was born from a simple observation: as AI systems
                  become more capable, the gap between their abilities and their
                  safety guarantees grows wider.
                </p>
                <p>
                  Our founders came together from Oracle, Lloyds Banking Group,
                  and the decentralized AI ecosystem — each having witnessed
                  firsthand the challenges of deploying AI in high-stakes
                  environments.
                </p>
                <p>
                  We set out to build what we couldn't find: production-ready
                  guard models, rigorous evaluation frameworks, and security
                  layers that actually work in the real world.
                </p>
                <p>
                  Today, Astroware is proud to serve enterprises, AI labs, and
                  governments working on some of the most important AI safety
                  challenges of our time.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-full aspect-square max-w-md bg-muted-dark/30 rounded-2xl border border-border flex items-center justify-center">
                <span className="text-muted text-sm">[Office Photo Placeholder]</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 md:py-32 border-t border-border mesh-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-12">
            Our Team
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="p-6 rounded-2xl border border-border bg-muted-dark/20 hover:bg-muted-dark/40 transition-colors duration-300"
              >
                <div className="w-20 h-20 bg-muted-dark rounded-full mb-4 flex items-center justify-center">
                  <span className="text-muted text-sm">[Photo]</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-accent mb-3">{member.role}</p>
                <p className="text-sm text-muted leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="p-8 rounded-2xl border border-border bg-muted-dark/20"
              >
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisors Section */}
      <section className="py-24 md:py-32 border-t border-border mesh-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
              Advisory Board
            </h2>
            <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
              World-Class Expertise
            </span>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {advisors.map((advisor) => (
              <div
                key={advisor.name}
                className="p-6 rounded-xl border border-border bg-muted-dark/20 hover:bg-muted-dark/30 transition-colors duration-300"
              >
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {advisor.name}
                </h3>
                <p className="text-sm text-accent mb-1">{advisor.role}</p>
                <p className="text-sm text-muted mb-3 italic">{advisor.affiliation}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{advisor.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-6">
            Join Us
          </h2>
          <p className="text-lg text-muted mb-10 max-w-2xl mx-auto">
            We're always looking for talented researchers and engineers
            passionate about AI safety.
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
