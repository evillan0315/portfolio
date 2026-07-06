# Building a Premium Portfolio with OpenCode: An AI-Assisted Journey

**Date:** May 20, 2026  
**Reading Time:** 12 minutes  
**Tags:** OpenCode, AI-Assisted Dev, React, Architecture

---

A personal portfolio is more than a resume — it's a product. It should demonstrate not only what you've built but *how* you build. When I set out to redesign my portfolio at [evillan0315.github.io/portfolio](https://evillan0315.github.io/portfolio/), I wanted the site itself to be a case study in production engineering. So I built it with OpenCode, an AI coding assistant, and treated the development process as a collaboration between human judgment and machine execution.

This article walks through the architecture, workflow, and lessons learned from building a premium SaaS-style portfolio with AI assistance.

---

## The Stack

Before writing a single line of code, I defined the technology foundation:

- **React 19** with **TypeScript** (strict mode)
- **Vite 8** for build tooling
- **Tailwind CSS v4** for styling (no CSS modules, no styled-components)
- **React Router v7** for navigation
- **Framer Motion** for animations
- **Lucide React** for icons
- **React Helmet Async** for SEO
- **clsx + tailwind-merge** for class management

Every decision had a rationale: strict TypeScript catches bugs at compile time, Tailwind keeps styling consistent without context-switching, Framer Motion delivers 60 FPS animations, and Vite provides instant HMR during development.

---

## The Conventions Contract: AGENTS.md

The most impactful decision was creating [`AGENTS.md`](https://github.com/evillan0315/portfolio/blob/main/AGENTS.md) — a project-level context file that tells an AI agent exactly how to operate within this codebase. It covers:

- **Project overview** and goals
- **Available commands** (dev, build, lint, typecheck)
- **Project structure** with directory purposes
- **Architecture conventions** (no hardcoded JSX content, Tailwind-only styling, strict TypeScript)
- **Design tokens** (colors, typography, glassmorphism, motion guidelines)
- **UI component patterns** (Button variants, GlassCard, SectionHeader, etc.)
- **Data layer conventions** (all content lives in `src/data/`)
- **Performance targets** (Lighthouse 95+)
- **Common code patterns** with examples

This single file transformed OpenCode from a general-purpose assistant into a domain-expert teammate that understood the project's DNA. Every request was interpreted through the lens of these conventions, resulting in code that was consistent from the first commit.

---

## Architecture by Convention

### 1. Data-Driven Content

A core rule: **zero hardcoded content in JSX**. Every piece of content — skills, projects, experience entries, testimonials, blog posts — lives in typed data files under `src/data/`. Each file exports a typed array (e.g., `SkillCategory[]`, `ExperienceEntry[]`) that sections import and render.

```typescript
// src/data/skills.ts
export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: "Monitor",
    skills: [
      { name: "React", icon: "React", proficiency: 95, years: 8 },
      { name: "TypeScript", icon: "TypeScript", proficiency: 92, years: 6 },
    ],
  },
]
```

This means adding a new skill, project, or testimonial is just editing a data file — no component changes needed. It also makes the site trivially portable to a CMS later.

### 2. Component Hierarchy

Components follow a strict three-tier hierarchy:

- **`components/ui/`** — Primitive, reusable atoms (Button, GlassCard, Badge, AnimatedCounter)
- **`components/layout/`** — Structural components (Navbar, Footer, RootLayout)
- **`components/sections/`** — Page sections that compose UI components with data (Hero, About, Skills, Projects)

Each component has a single responsibility, minimal props, and uses TypeScript interfaces for contract clarity.

```typescript
interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "outline"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
}
```

### 3. Design System — Glassmorphism

The visual identity is built around a dark glassmorphism aesthetic:

- Deep background (`#09090B`) with elevated surfaces using `backdrop-blur`
- A primary gradient (`#6366F1 → #8B5CF6 → #A855F7`)
- Subtle glass borders at `rgba(255,255,255,0.10)`
- Animated glow effects on hover using CSS `box-shadow` transitions

Design tokens are defined in `tailwind.config.ts` and consumed exclusively through Tailwind utility classes — no inline styles, no CSS modules.

---

## Building the Sections

### Hero

The hero section is a split layout: text content on the left, an animated terminal window on the right. Key details:

- **Typewriter animation** cycles through roles (Full-Stack Engineer, Cloud Engineer, DevOps Engineer, AI Engineer)
- **Floating stat cards** with animated counters (years of experience, projects delivered, etc.)
- **Download CV button** generates a PDF resume from the profile data
- **Social links** with hover effects

The terminal window component (`TerminalWindow`) types out real commands — `npx create-portfolio`, `pnpm dev`, `git push deploy` — giving visitors a glimpse into the developer workflow.

### Skills

The skills section uses a tabbed switcher to toggle between two categories:

- **Engineering Skills** — 11 categories (Frontend, Backend, Cloud, DevOps, Languages, Databases, etc.) with proficiency bars and year counts
- **AI & LLM Expertise** — 6 categories (Frameworks, RAG, Prompt Engineering, Agents, Evaluation, MLOps) with detailed descriptions

Each skill entry has an optional tooltip that provides more context. The tab animation uses Framer Motion's `AnimatePresence` for smooth transitions.

### Projects

The featured projects section auto-populated **47 repositories** from the GitHub API via a one-time Python generator script. Features:

- **Tag filtering** — TypeScript, Go, Python, Terraform, Docker, etc.
- **Featured badges** for pinned/notable repos
- **Project metrics** (stars, forks, size)
- **Hover glow reveal** with glass card animation
- **GitHub and demo links** for each project

### Experience Timeline

Thirteen roles spanning from August 2005 to Present, rendered as an animated vertical timeline. Each entry shows:

- Role and company
- Duration with a subtle date range
- Technology badges
- Key achievements with bullet points

Entries animate in as they scroll into view using Framer Motion's `whileInView`.

### Testimonials

Four real LinkedIn recommendations displayed in an animated carousel with:

- Avatar initials with gradient backgrounds
- 5-star rating visualization
- Readable quote with company context
- Carousel navigation (arrows + dots)

---

## Accessibility & Performance

### Accessibility

- Semantic HTML throughout (`<section>`, `<nav>`, `<header>`, `<main>`, `<article>`)
- ARIA labels on all interactive elements
- Keyboard-navigable with visible `focus-visible` ring styles
- `prefers-reduced-motion` fully respected — all animations disabled for users who prefer reduced motion
- Sufficient color contrast ratios against the dark background

### SEO

- Global meta tags and title template via React Helmet Async
- Open Graph and Twitter Card tags for social sharing
- JSON-LD Person structured data for search engines
- `robots.txt` and SVG favicon

---

## Dual Deployment: GitHub Pages + Vercel

The site is deployed to both **GitHub Pages** (via GitHub Actions) and **Vercel** (via CLI). This required solving a routing challenge:

- **GitHub Pages** serves from a subpath: `evillan0315.github.io/portfolio/`
- **Vercel** serves from root: `portfolio.vercel.app/`

The solution was a conditional Vite `base` configuration:

```typescript
// vite.config.ts
base: process.env.VERCEL ? "/" : "/portfolio/"
```

And using `import.meta.env.BASE_URL` as the `basename` in React Router, so all routes work correctly on both platforms.

For GitHub Pages SPA support, `index.html` is copied to `404.html` at build time. For Vercel, a catch-all rewrite is configured in `vercel.json`.

---

## The OpenCode Workflow

Here's what the collaboration looked like in practice:

1. **Define intent** — I describe what I want to build (e.g., "a testimonial carousel with glass cards, star ratings, and navigation arrows")
2. **OpenCode reads AGENTS.md** — understands the project conventions, component patterns, and design tokens
3. **Explores existing code** — finds similar components to match style and patterns
4. **Generates implementation** — produces TypeScript, Tailwind, and Framer Motion code that follows project conventions
5. **I review and refine** — adjust props, tweak animations, add data
6. **Typecheck + build** — verify no regressions

The most valuable aspect was that OpenCode never deviated from the established patterns. No inline styles appeared. No `any` types. No hardcoded content. Every file matched the conventions because AGENTS.md made those rules explicit.

---

## Key Takeaways

1. **AGENTS.md is your most valuable file.** It's not documentation — it's a spec. The time invested in defining conventions pays back exponentially with AI-assisted development.

2. **Strict conventions reduce cognitive load.** When every component follows the same patterns, both human and AI contributors operate with predictable context.

3. **Data-driven architecture scales.** Separating content from presentation means you can add features, swap themes, or migrate to a CMS without touching components.

4. **AI excels at execution, humans at direction.** The best results came when I provided clear specification and OpenCode handled the implementation details — component structure, TypeScript types, Tailwind classes, animation configuration.

5. **Test the edge cases.** AI-generated code needs human review for edge cases: null checks, empty states, loading conditions, and accessibility.

---

## Try It Yourself

The full source code is available on GitHub: [github.com/evillan0315/portfolio](https://github.com/evillan0315/portfolio)

If you're building a portfolio, clone the repo, update the data files with your own content, and deploy with one command. The AGENTS.md file is ready to go — OpenCode already knows how your project works.
