import Link from "next/link";

const footerLinks = {
  company: [
    { href: "/company", label: "About" },
    { href: "/company", label: "Team" },
    { href: "/contact", label: "Careers" },
  ],
  research: [
    { href: "/research", label: "Publications" },
    { href: "/blog", label: "Blog" },
    { href: "/products", label: "Products" },
  ],
  connect: [
    { href: "https://x.com", label: "X (Twitter)", external: true },
    { href: "https://linkedin.com", label: "LinkedIn", external: true },
    { href: "https://github.com", label: "GitHub", external: true },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-xl font-semibold tracking-tight text-foreground">
                Astroware
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted leading-relaxed max-w-xs">
              AI Alignment & Security Research Lab. Building the future of safe,
              aligned AI systems.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Research Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Research
            </h3>
            <ul className="space-y-3">
              {footerLinks.research.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Connect
            </h3>
            <ul className="space-y-3">
              {footerLinks.connect.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted">
            © {currentYear} Astroware Inc. All rights reserved.
          </p>
          <a
            href="mailto:hello@astroware.ai"
            className="text-sm text-muted hover:text-foreground transition-colors duration-200"
          >
            hello@astroware.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
