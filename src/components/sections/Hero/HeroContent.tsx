"use client"

import { motion } from "framer-motion"
import { Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GradientText } from "@/components/ui/gradient-text"
import { profile } from "@/data/profile"
import { socialLinks } from "@/data/social"

/* ── Social icon component ── */
function SocialIcon({ icon }: { icon: string }) {
  const cls = "h-5 w-5 transition-colors group-hover:text-white"
  switch (icon) {
    case "github":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      )
    case "linkedin":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )
    case "twitter":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    case "mail":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
        </svg>
      )
    default:
      return null
  }
}

/* ── Social icon card ── */
function SocialCard({ link }: { link: (typeof socialLinks)[number] }) {
  return (
    <motion.a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={link.label}
      whileHover={{ scale: 1.05, y: -2 }}
      className="group flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-text-muted transition-all duration-200 hover:border-accent/40 hover:bg-accent/10 hover:text-accent sm:h-14 sm:w-14"
    >
      <SocialIcon icon={link.icon} />
    </motion.a>
  )
}

/* ── HeroContent (left column) ── */
export function HeroContent() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleDownloadCV = () => {
    if (!profile.resumeUrl) return
    const base = import.meta.env.BASE_URL
    const url = `${base}${profile.resumeUrl.replace(/^\//, "")}`
    const link = document.createElement("a")
    link.href = url
    link.download = "Eddie_Villanueva_Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col justify-center"
    >
      {/* Greeting badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-5 py-2 text-sm font-medium text-text-secondary"
      >
        <span aria-hidden="true">👋</span> Hi, I&apos;m
      </motion.div>

      {/* Name — one line */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="text-5xl font-black leading-tight sm:text-6xl lg:text-7xl"
      >
        {profile.name}
      </motion.h1>

      {/* Gradient title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl"
      >
        <GradientText>Full Stack Developer</GradientText>
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mt-6 max-w-lg text-base leading-relaxed text-text-secondary sm:text-lg"
      >
        I build exceptional digital experiences with modern technologies.
        <br />
        Passionate about clean code, user experience, scalable cloud architectures,
        AI-powered applications, and solving real-world problems.
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 flex flex-wrap gap-4"
      >
        <Button
          size="lg"
          icon={<ExternalLink size={18} />}
          onClick={scrollToProjects}
        >
          View My Work
        </Button>
        <Button
          variant="secondary"
          size="lg"
          icon={<Download size={18} />}
          iconPosition="left"
          onClick={handleDownloadCV}
        >
          Download CV
        </Button>
      </motion.div>

      {/* Social icon cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="mt-8 flex gap-3"
      >
        {socialLinks.map((link) => (
          <SocialCard key={link.label} link={link} />
        ))}
      </motion.div>
    </motion.div>
  )
}
