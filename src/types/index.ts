/* ------------------------------------------------------------------ */
/* Shared TypeScript types / interfaces                                */
/* ------------------------------------------------------------------ */

/** Navigation link */
export interface NavItem {
  label: string
  href: string
}

/** Social link */
export interface SocialLink {
  label: string
  href: string
  icon: string
}

/** Skill category & skills */
export interface Skill {
  name: string
  icon: string
  proficiency: number // 0–100
  years: number
  description?: string
}

export interface SkillCategory {
  title: string
  icon: string
  skills: Skill[]
}

/** Project entry */
export interface ProjectLink {
  label: string
  url: string
}

export interface ProjectMetric {
  label: string
  value: string
}

export interface Project {
  title: string
  slug: string
  summary: string
  description: string
  thumbnail: string
  tags: string[]
  featured: boolean
  links: ProjectLink[]
  metrics: ProjectMetric[]
  architecture?: string
}

/** Experience / timeline entry */
export interface ExperienceEntry {
  role: string
  company: string
  location?: string
  period: string
  description: string
  technologies: string[]
  achievements: string[]
  type: "work" | "freelance" | "education"
}

/** Testimonial */
export interface Testimonial {
  name: string
  role: string
  company: string
  avatar: string
  content: string
  rating: number // 1–5
}

/** Blog post preview */
export interface BlogPost {
  title: string
  slug: string
  date: string
  summary: string
  tags: string[]
  readingTime: number // minutes
  coverImage?: string
}

/** Profile */
export interface Profile {
  name: string
  title: string
  tagline: string
  summary: string
  email: string
  location: string
  avatar: string
  resumeUrl?: string
  available: boolean
}

/** AI / LLM expertise */
export interface AIExpertiseCategory {
  title: string
  icon: string
  items: AIExpertiseItem[]
}

export interface AIExpertiseItem {
  name: string
  description?: string
  icon?: string
}

/** Engineering principle (for About section) */
export interface EngineeringPrinciple {
  title: string
  description: string
  icon: string
}
