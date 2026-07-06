# AGENTS.md — Portfolio Project Context for AI Coding Agents

## Project Overview

Personal portfolio for **Eddie Villanueva** — a senior full-stack, cloud, DevOps, and AI engineer. The site is designed as a premium SaaS-style landing page, not a traditional resume.

**Stack:** React 19 · TypeScript (strict) · Vite · Tailwind CSS v4 · React Router v7 · Framer Motion · Lucide React · React Helmet Async · clsx · tailwind-merge

---

## Commands

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run TypeScript check |
| `pnpm format` | Run Prettier |

---

## Project Structure

```
src/
├── assets/          # Static assets (images, fonts)
├── components/
│   ├── common/      # Shared reusable components
│   ├── layout/      # Layout components (Nav, Footer)
│   ├── sections/    # Page sections (Hero, About, Skills, etc.)
│   └── ui/          # Primitive UI components (Button, Card, Badge, etc.)
├── data/            # Typed data files (skills, projects, experience, etc.)
├── hooks/           # Custom React hooks
├── layouts/         # Page layout wrappers
├── lib/             # Utility libraries (cn, etc.)
├── pages/           # Route page components
├── routes/          # Route definitions
├── styles/          # Global styles
├── types/           # Shared TypeScript types/interfaces
├── utils/           # Helper functions
├── App.tsx
└── main.tsx
```

---

## Architecture Conventions

- **No hardcoded content in JSX** — all content comes from typed data files in `src/data/`
- **No CSS Modules, Styled Components, Emotion, or inline styles** — use Tailwind exclusively
- **Strict TypeScript** — never use `any`, prefer interfaces over types for object shapes
- **Component design** — single responsibility, reusable, composable, minimal props, composition over inheritance
- **Accessibility** — semantic HTML, ARIA labels, keyboard nav, focus indicators, `prefers-reduced-motion` support

---

## Design Tokens

| Token | Value |
|---|---|
| `--bg-primary` | `#09090B` |
| `--bg-secondary` | `#111118` |
| `--surface` | `rgba(255,255,255,0.05)` |
| `--glass-border` | `rgba(255,255,255,0.10)` |
| `--gradient-primary` | `#6366F1 → #8B5CF6 → #A855F7` |
| `--accent` | `#38BDF8` |
| `--text-primary` | `#FFFFFF` |
| `--text-secondary` | `#A1A1AA` |
| `--text-muted` | `#71717A` |

**Typography:** Inter or Geist · Hero: 72px+ · Section title: 48px · Subtitle: 24px · Body: 18px · Small: 14px

**Glassmorphism:** All elevated surfaces use `backdrop-blur`, transparent fill, soft border, subtle shadow, animated hover glow.

**Motion:** Framer Motion · 60 FPS · `prefers-reduced-motion` respected · fade, slide, stagger, parallax, hover elevation, magnetic buttons.

---

## UI Component Patterns

- **Button** — variants: `primary`, `secondary`, `ghost`, `outline`; sizes: `sm`, `md`, `lg`
- **Card / GlassCard** — glassmorphism wrapper with optional hover glow
- **GradientText** — text with primary gradient
- **SectionHeader** — consistent section title + subtitle + optional badge
- **SkillBadge / SkillCategory** — icon + name + proficiency + years + tooltip
- **ProjectCard / ProjectGrid** — thumbnail, title, summary, stack, links, metrics
- **Timeline** — animated vertical timeline for experience
- **AnimatedCounter** — count-up animation for stats
- **TerminalWindow** — animated terminal window component
- **GlowBackground** — gradient glow behind elements

---

## Data Layer

All content lives in `src/data/` as typed exports:

- `skills.ts` — skill categories with icon, name, proficiency, years
- `projects.ts` — project entries with thumbnails, stack, links, metrics
- `experience.ts` — timeline entries with role, duration, technologies, achievements
- `testimonials.ts` — testimonials with avatar, company, rating, content
- `blog.ts` — blog post previews
- `social.ts` — social links
- `navigation.ts` — nav items
- `ai.ts` — AI/LLM expertise data
- `profile.ts` — personal profile info

---

## Performance Targets

| Metric | Target |
|---|---|
| Performance | ≥95 |
| Accessibility | 100 |
| SEO | 100 |
| Best Practices | 100 |

---

## Common Patterns

```tsx
// Utility for class merging
import { cn } from "@/lib/utils"

// Component prop pattern
interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "outline"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
}

// Section pattern
import { SectionHeader } from "@/components/ui/section-header"
import { data } from "@/data/skills"
```

---

## Deployment

Optimized for **Vercel**. Include `vercel.json` with cache headers, compression, image optimization, and security headers.
