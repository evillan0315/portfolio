"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowDown,
  Download,
  ExternalLink,
  Code2,
  Users,
  Award,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { GradientText } from "@/components/ui/gradient-text"
import { GlowBackground } from "@/components/ui/glow-background"
import { TerminalWindow } from "@/components/ui/terminal-window"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { profile } from "@/data/profile"
import { socialLinks } from "@/data/social"
import { cn } from "@/lib/utils"

/* ── Typewriter hook ── */
const roles = [
  "Full-Stack Engineer",
  "Cloud Architect",
  "DevOps Engineer",
  "AI Engineer",
  "Platform Engineer",
]

function useTypewriter(words: string[], typingSpeed = 80, deletingSpeed = 40, pause = 2000) {
  const [text, setText] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex] ?? ""

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentWord.slice(0, text.length + 1))
          if (text.length === currentWord.length) {
            setTimeout(() => setIsDeleting(true), pause)
          }
        } else {
          setText(currentWord.slice(0, text.length - 1))
          if (text.length === 0) {
            setIsDeleting(false)
            setWordIndex((prev) => (prev + 1) % words.length)
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed,
    )

    return () => clearTimeout(timeout)
  }, [text, wordIndex, isDeleting, words, typingSpeed, deletingSpeed, pause])

  return text
}

/* ── Terminal lines ── */
const terminalLines = [
  { text: "Initializing portfolio...", type: "info" as const, delay: 400 },
  { text: "Loading profile data...", type: "info" as const, delay: 600 },
  { text: "Fetching skills & experience...", type: "info" as const, delay: 600 },
  { text: "System ready.", type: "success" as const, delay: 500 },
  { text: "eddie@portfolio:~$ whoami", type: "input" as const, delay: 700 },
  { text: "Eddie Villanueva — Senior Engineer", type: "output" as const, delay: 500 },
  { text: "eddie@portfolio:~$ ./deploy --prod", type: "input" as const, delay: 800 },
  { text: "Deploying to production...", type: "info" as const, delay: 600 },
  { text: "Deployment successful! 🚀", type: "success" as const, delay: 700 },
]

/* ── Social icon resolver ── */
function SocialIcon({ icon, className }: { icon: string; className?: string }) {
  switch (icon) {
    case "github":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      )
    case "linkedin":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )
    case "twitter":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    case "mail":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
        </svg>
      )
    default:
      return null
  }
}

export function Hero() {
  const typedRole = useTypewriter(roles)

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden pt-24"
      aria-label="Hero introduction"
    >
      <GlowBackground
        color="rgba(99,102,241,0.12)"
        size="lg"
        blur="lg"
        className="absolute -top-40 -left-40"
      />
      <GlowBackground
        color="rgba(168,85,247,0.08)"
        size="lg"
        blur="lg"
        className="absolute -bottom-40 -right-40"
      />

      <div className="relative mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ── Left column ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Status badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-medium text-text-muted">
              <span className="h-2 w-2 rounded-full bg-success" />
              {profile.available ? "Available for work" : "Open to opportunities"}
            </div>

            {/* Name */}
            <h1 className="text-5xl font-extrabold leading-tight sm:text-6xl md:text-7xl lg:text-7xl">
              {profile.name.split(" ")[0]}
              {" "}
              <GradientText>{profile.name.split(" ").slice(1).join(" ")}</GradientText>
            </h1>

            {/* Typewriter role */}
            <div className="mt-4 flex items-center gap-2 text-xl text-text-secondary md:text-2xl">
              <span className="text-text-muted">I&apos;m a</span>
              <span className="min-w-[240px] font-semibold text-white" aria-live="polite">
                {typedRole}
              </span>
              <span className="inline-block h-7 w-[2px] animate-pulse bg-accent" />
            </div>

            {/* Tagline */}
            <p className="mt-6 max-w-lg text-base leading-relaxed text-text-secondary md:text-lg">
              {profile.tagline}
            </p>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                size="lg"
                icon={<ExternalLink size={18} />}
                onClick={scrollToProjects}
              >
                View Projects
              </Button>
              <Button
                variant="secondary"
                size="lg"
                icon={<Download size={18} />}
                iconPosition="left"
                onClick={() => {
                  // Resume download
                }}
              >
                Download CV
              </Button>
              <Button
                variant="ghost"
                size="lg"
                icon={<ArrowDown size={18} />}
                onClick={scrollToAbout}
                aria-label="Learn more"
              >
                Learn More
              </Button>
            </div>

            {/* Social links */}
            <div className="mt-8 flex items-center gap-4">
              <span className="text-xs font-medium uppercase tracking-wider text-text-muted">
                Connect
              </span>
              <div className="h-px flex-1 bg-white/5" />
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="transition-all duration-200 hover:scale-110"
                >
                  <SocialIcon
                    icon={link.icon}
                    className="h-5 w-5 text-text-muted transition-colors hover:text-white"
                  />
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Right column ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* Terminal */}
            <TerminalWindow
              lines={terminalLines}
              title="portfolio.sh"
              className="shadow-2xl shadow-indigo-500/5"
            />

            {/* Floating stat cards */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Code2, value: "12+", label: "Years Exp." },
                { icon: Users, value: "50+", label: "Projects" },
                { icon: Award, value: "15+", label: "Technologies" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  className={cn(
                    "rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center backdrop-blur-sm",
                    "hover:border-white/20 hover:shadow-[0_0_16px_rgba(99,102,241,0.1)]",
                    "transition-all duration-300",
                  )}
                >
                  <stat.icon className="mx-auto mb-2 h-5 w-5 text-accent" aria-hidden="true" />
                  <div className="text-xl font-bold text-white">
                    <AnimatedCounter to={parseInt(stat.value)} duration={1.5} />
                    {stat.value.includes("+") ? "+" : ""}
                  </div>
                  <div className="mt-0.5 text-xs text-text-muted">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
