# Eddie Villanueva — Production Portfolio Website

## Objective

Design and build a world-class, production-ready personal portfolio for **Eddie Villanueva**, showcasing expertise in:

* Full Stack Engineering
* Cloud Engineering
* DevOps
* AI Engineering
* LLM Development
* Developer Platforms
* Software Architecture

The portfolio should communicate the level of a senior software engineer and technical architect rather than a traditional resume website.

The website must feel modern, premium, interactive, and highly polished while remaining extremely fast, maintainable, and accessible.

The final result should resemble a high-end SaaS landing page combined with a premium developer portfolio.

---

# Technology Stack

The implementation must use:

* React 19
* TypeScript (strict mode)
* Vite
* Tailwind CSS v4
* React Router v7
* Framer Motion
* Lucide React
* React Helmet Async
* clsx
* tailwind-merge

No CSS Modules.

No Styled Components.

No Emotion.

No inline styling except when absolutely necessary.

---

# Development Standards

Follow production-quality engineering practices.

## TypeScript

* Strict mode
* Never use `any`
* Prefer interfaces
* Strongly typed props
* Strongly typed data models
* Reusable utility types
* Exhaustive type checking

---

## Component Design

Every component must follow:

Single Responsibility Principle.

Reusable.

Composable.

Accessible.

Minimal props.

Avoid duplication.

Prefer composition over inheritance.

---

## Folder Structure

```
src/
│
├── assets/
│
├── components/
│   ├── common/
│   ├── layout/
│   ├── sections/
│   ├── ui/
│
├── data/
│
├── hooks/
│
├── lib/
│
├── pages/
│
├── routes/
│
├── styles/
│
├── types/
│
├── utils/
│
└── App.tsx
```

All content should come from typed data files.

Never hardcode content inside JSX.

---

# Design Language

The overall aesthetic should communicate:

* premium
* futuristic
* elegant
* technical
* confident

Think:

Apple × Linear × Vercel × Stripe × Raycast × Framer.

---

# Color Palette

Primary Background

```
#09090B
```

Secondary Background

```
#111118
```

Surface

```
rgba(255,255,255,0.05)
```

Glass Border

```
rgba(255,255,255,0.10)
```

Primary Gradient

```
#6366F1
↓
#8B5CF6
↓
#A855F7
```

Accent

```
#38BDF8
```

Success

```
#22C55E
```

Warning

```
#F59E0B
```

Text

```
Primary:
#FFFFFF

Secondary:
#A1A1AA

Muted:
#71717A
```

---

# Typography

Use:

Inter

or

Geist

Hierarchy:

Hero Name

```
72px+
```

Section Title

```
48px
```

Subtitle

```
24px
```

Body

```
18px
```

Small

```
14px
```

---

# Glassmorphism

Every elevated surface should include:

* backdrop blur
* transparent fill
* soft border
* subtle shadow
* animated hover glow

Cards should never appear flat.

---

# Motion System

Use Framer Motion.

Animations should be subtle and intentional.

Include:

* fade
* slide
* stagger
* parallax
* hover elevation
* magnetic buttons
* floating particles
* gradient glow animation
* animated background blur

Avoid excessive animations.

Target 60 FPS.

Respect `prefers-reduced-motion`.

---

# Navigation

Sticky.

Blurred.

Glass effect.

Active section indicator.

Smooth scrolling.

Scroll spy.

Mobile drawer.

Animated underline.

---

# Hero Section

Split layout.

Left

* Greeting badge
* Name
* Animated role
* Description
* CTA buttons
* Social links

Right

* Professional portrait
* Floating code editor
* Animated terminal
* Floating statistics
* Gradient background glow

The code editor should actually animate typing rather than displaying a static screenshot.

---

# About

Include:

Professional Summary

Career Philosophy

Engineering Principles

Render principles as interactive cards.

Examples:

* Clean Architecture
* SOLID
* DDD
* API First
* Automation First
* DevOps Culture
* Security by Design
* Continuous Learning

---

# Skills

Do not render one giant grid.

Instead:

Tabs

or

Accordion

Categories:

* Frontend
* Backend
* Cloud
* DevOps
* Databases
* AI Engineering
* LLM Engineering
* Security
* Architecture
* Testing
* Developer Tools

Each skill includes:

* icon
* name
* proficiency
* years
* tooltip

---

# AI Engineering

This should be one of the largest sections.

Include:

### AI Expertise

* Agents
* RAG
* MCP
* Prompt Engineering
* Context Engineering
* Tool Calling
* Function Calling
* Structured Outputs
* Memory
* Embeddings
* Vector Search
* Multi-Agent Systems

---

### AI Models

Commercial

* OpenAI
* Claude
* Gemini
* Groq
* Meta AI

Open Source

* Llama
* Code Llama
* DeepSeek
* Gemma
* Qwen
* Mistral
* Falcon
* Phi

---

### Local AI

* Ollama
* llama.cpp
* Open WebUI
* GGUF
* ONNX Runtime
* Hugging Face
* GPU Inference
* CPU Inference

---

### AI Frameworks

* LangChain
* LangGraph
* Vercel AI SDK
* MCP SDK
* Hugging Face Transformers
* Provider SDKs

---

### AI Developer Tools

* Claude Code
* OpenCode
* Cursor
* GitHub Copilot
* Windsurf
* Cline
* Roo Code
* Continue.dev

---

### AI Infrastructure

Include architectural diagrams illustrating:

Prompt

↓

Context

↓

LLM

↓

Tool Calling

↓

Database

↓

Response

---

# Featured Projects

Each project includes:

* thumbnail
* title
* summary
* architecture
* technology stack
* GitHub
* Live Demo
* featured badge
* metrics

Hover reveals additional details.

---

# Experience

Interactive vertical timeline.

Animated.

Include:

* role
* project
* duration
* responsibilities
* technologies
* achievements

---

# Testimonials

Animated carousel.

Glass cards.

Company logo.

Avatar.

Rating.

---

# Blog

Cards.

Tag filtering.

Markdown ready.

RSS ready.

---

# Footer

Minimal.

Elegant.

Include:

* navigation
* socials
* copyright
* call to action

---

# Reusable Components

Create reusable components:

* Button
* Card
* GlassCard
* GradientText
* SectionHeader
* SkillBadge
* SkillCategory
* Timeline
* ProjectCard
* ProjectGrid
* SocialLinks
* HeroCodeEditor
* StatCard
* Tag
* Badge
* AnimatedCounter
* TerminalWindow
* GlowBackground

Every component should be reusable.

---

# Data Layer

Every section should load from typed data.

```
data/

skills.ts

projects.ts

experience.ts

testimonials.ts

blog.ts

social.ts

navigation.ts

ai.ts

profile.ts
```

No content inside JSX.

---

# Performance

Target Lighthouse:

Performance ≥95

Accessibility ≥100

SEO ≥100

Best Practices ≥100

Use:

* lazy loading
* code splitting
* route splitting
* image optimization
* responsive images
* font optimization
* preload hero assets
* prefetch navigation
* reduced bundle size

---

# Accessibility

WCAG AA.

Keyboard navigation.

Focus indicators.

Semantic HTML.

ARIA labels.

Screen reader friendly.

Reduced motion support.

Color contrast compliance.

---

# SEO

Include:

* title
* description
* canonical URL
* Open Graph
* Twitter Cards
* JSON-LD Person schema
* sitemap
* robots.txt
* favicon set

---

# Deployment

Optimized for:

* Vercel

Include:

* `vercel.json`
* cache headers
* compression
* image optimization
* security headers

---

# Code Quality

Follow:

* SOLID
* Clean Architecture
* DRY
* KISS
* Composition over inheritance
* Feature-first organization
* Reusable utilities
* Strict TypeScript
* ESLint
* Prettier

---

# Final Deliverables

Build incrementally in the following order:

1. Initialize the project with React 19, TypeScript, Vite, Tailwind CSS v4, and configure strict TypeScript, ESLint, Prettier, React Router v7, Framer Motion, React Helmet Async, and project design tokens.
2. Create the project architecture, folder structure, reusable layout, theme configuration, utility functions, and typed data models.
3. Build the global layout with the sticky navigation bar, footer, smooth scrolling, and scroll-spy navigation.
4. Build the Hero section with the animated code editor, floating statistics, typewriter animation, social links, and call-to-action buttons.
5. Create the reusable UI component library (buttons, cards, badges, section headers, tags, timeline items, skill pills, counters, etc.).
6. Build the About section with engineering philosophy, professional summary, and architectural principles.
7. Build the Skills section with categorized, filterable skills and interactive AI & LLM Engineering subsections.
8. Build the Featured Projects section with responsive project cards, filtering, GitHub links, live demos, and detailed project metadata.
9. Build the Experience timeline with animated entries, technology badges, and measurable achievements.
10. Build the Testimonials section with responsive carousel support.
11. Build the Blog preview section with Markdown-ready content support.
12. Add advanced animations, polish micro-interactions, optimize performance, complete the accessibility audit, configure SEO metadata, prepare deployment for Vercel, and perform a final production readiness review.
