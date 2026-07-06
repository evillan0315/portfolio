# Roadmap

## Phase 1 — Foundation

- [x] Initialize project with Vite, React 19, TypeScript
- [x] Configure Tailwind CSS v4
- [x] Configure ESLint, Prettier
- [x] Set up React Router v7
- [x] Set up Framer Motion
- [x] Set up React Helmet Async
- [x] Define project structure, folder layout
- [x] Create design tokens and theme
- [x] Build utility library (cn, etc.)

## Phase 2 — Layout & Navigation

- [x] Build sticky navbar with glass effect
- [x] Implement smooth scrolling
- [x] Implement scroll-spy active section detection
- [x] Build mobile drawer navigation
- [x] Build footer component
- [x] Create root layout wrapper

## Phase 3 — Hero Section

- [x] Build split layout (left text, right visual)
- [x] Create greeting badge animation
- [x] Implement typewriter role animation
- [x] Build CTA buttons with hover effects
- [x] Add social links with hover effects
- [x] Create avatar placeholder with gradient glow
- [x] Build animated terminal window typing effect
- [x] Create floating stat cards with animated counters

## Phase 4 — UI Component Library

- [x] Create Button component (4 variants, 3 sizes)
- [x] Create Card / GlassCard component
- [x] Create GradientText component
- [x] Create SectionHeader component
- [x] Create Badge component (5 variants)
- [x] Create AnimatedCounter component
- [x] Create TerminalWindow component
- [x] Create GlowBackground component

## Phase 5 — About Section

- [x] Write professional summary
- [x] Create engineering philosophy data
- [x] Build interactive principle cards (8 principles)
- [x] Add scroll-triggered animations

## Phase 6 — Skills Section

- [x] Create skill data structure with categories (11 categories)
- [x] Build tabbed category navigation (Engineering ↔ AI & LLM)
- [x] Build SkillBadge component (proficiency bars)
- [x] Build SkillCategory section component
- [x] Add hover tooltip with skill details
- [x] Create AI & LLM Engineering subsection (6 categories)
- [ ] Build AI infrastructure flow diagram

## Phase 7 — Featured Projects

- [x] Create project data structure (47 repos from GitHub API)
- [x] Build ProjectCard component
- [x] Build ProjectGrid layout
- [x] Implement tag filtering
- [x] Add hover glow reveal details
- [x] Integrate GitHub and live demo links
- [x] Display project metrics

## Phase 8 — Experience Timeline

- [x] Create experience data structure (13 roles)
- [x] Build vertical animated timeline
- [x] Add role, duration, technologies, achievements
- [x] Implement scroll-triggered entry animations

## Phase 9 — Testimonials

- [x] Create testimonials data structure (4 LinkedIn recommendations)
- [x] Build animated carousel
- [x] Design glass testimonial cards
- [x] Add avatar initials, rating stars, navigation

## Phase 10 — Blog

- [x] Create blog post data structure
- [x] Build blog card grid
- [x] Implement tag filtering
- [x] Prepare for Markdown/MDX content

## Phase 11 — Performance & Polish

- [ ] Lazy load below-fold sections
- [ ] Code split route pages (dynamic imports)
- [ ] Optimize images (responsive, WebP, AVIF)
- [ ] Preload hero assets
- [ ] Prefetch navigation targets
- [ ] Audit bundle size, remove dead code
- [ ] Target Lighthouse 95+ Performance

## Phase 12 — Accessibility

- [x] Semantic HTML audit (all sections use semantic elements)
- [x] Keyboard navigation pass (all interactive elements reachable)
- [x] Focus indicator styles (focus-visible ring)
- [x] ARIA labels on all interactive elements
- [ ] Screen reader testing
- [x] prefers-reduced-motion support
- [x] Color contrast verification

## Phase 13 — SEO & Metadata

- [x] Global meta tags and title template
- [x] Open Graph tags per page
- [x] Twitter Card tags
- [x] JSON-LD Person structured data
- [ ] Generate sitemap.xml
- [x] Create robots.txt
- [x] Generate favicon set (SVG)

## Phase 14 — Deployment

- [x] Create GitHub Actions CI/CD workflow
- [x] Configure Pages deployment with SPA fallback (404.html)
- [x] Enable HTTPS
- [x] Set up security headers
- [x] Conditional Vite base for GitHub Pages (`/portfolio/`) and Vercel (`/`)
- [x] Deploy to GitHub Pages
- [x] Deploy to Vercel via CLI
- [ ] Configure custom domain

## Phase 15 — Resume / CV

- [x] Generate professional PDF resume from profile & experience data
- [x] Add `pnpm generate-resume` script using pdfkit
- [x] Download CV button with base-aware URL routing
- [x] Base-aware asset path resolution for dual deployment

## Phase 16 — Post-Launch

- [ ] CMS integration for blog
- [ ] MDX blog support
- [ ] Project filtering and search
- [ ] Interactive code playground
- [ ] Dark/light theme toggle
- [ ] Internationalization (i18n)
- [ ] Analytics dashboard
- [ ] AI chatbot assistant
- [ ] GitHub contribution visualization
- [ ] Live coding demos
- [ ] Contact form backend
- [ ] Dynamic project metrics from GitHub API
