import { ArrowUp, Mail, Phone } from "lucide-react"
import { navigation } from "@/data/navigation"
import { socialLinks } from "@/data/social"
import { profile } from "@/data/profile"
import { cn } from "@/lib/utils"
import { GradientText } from "@/components/ui/gradient-text"

/* ── Icon resolver ── */
function SocialIcon({ icon }: { icon: string }) {
  const common = "transition-colors duration-200 hover:text-white"

  switch (icon) {
    case "github":
      return (
        <svg className={cn("h-5 w-5 text-text-muted", common)} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      )
    case "linkedin":
      return (
        <svg className={cn("h-5 w-5 text-text-muted", common)} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )
    case "twitter":
      return (
        <svg className={cn("h-5 w-5 text-text-muted", common)} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    case "mail":
      return (
        <svg className={cn("h-5 w-5 text-text-muted", common)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
        </svg>
      )
    default:
      return null
  }
}

export function Footer() {
  const handleNavClick = (href: string) => {
    const id = href.replace("#", "")
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="border-t border-white/10 bg-bg-secondary" id="contact">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="text-center md:text-left">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault()
                scrollToTop()
              }}
              className="text-xl font-bold tracking-tight"
            >
              <GradientText>Eddie Villanueva</GradientText>
            </a>
            <p className="mt-1 text-sm text-text-muted">
              {profile.title}
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {navigation.slice(0, 5).map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(item.href)
                    }}
                    className="text-sm text-text-muted transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Contact info */}
        <div className="mt-8 flex flex-col items-center gap-3 text-center md:flex-row md:justify-center md:gap-8">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-accent"
          >
            <Mail size={14} aria-hidden="true" />
            {profile.email}
          </a>
          <a
            href={`tel:${profile.phone}`}
            className="inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-accent"
          >
            <Phone size={14} aria-hidden="true" />
            {profile.phone}
          </a>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-white/5" />

        {/* Bottom section */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          {/* Socials */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="transition-transform hover:scale-110"
              >
                <SocialIcon icon={link.icon} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-white"
            aria-label="Scroll to top"
          >
            Back to top
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  )
}
