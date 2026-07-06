import type { SkillCategory } from "@/types"

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: "code2",
    skills: [
      { name: "React", icon: "react", proficiency: 95, years: 8 },
      { name: "TypeScript", icon: "typescript", proficiency: 95, years: 7 },
      { name: "Next.js", icon: "nextjs", proficiency: 90, years: 5 },
      { name: "Tailwind CSS", icon: "tailwindcss", proficiency: 92, years: 5 },
      { name: "Vue.js", icon: "vuejs", proficiency: 75, years: 3 },
      { name: "HTML/CSS", icon: "html5", proficiency: 98, years: 12 },
    ],
  },
  {
    title: "Backend",
    icon: "server",
    skills: [
      { name: "Node.js", icon: "nodejs", proficiency: 93, years: 10 },
      { name: "NestJS", icon: "nestjs", proficiency: 85, years: 4 },
      { name: "Express", icon: "express", proficiency: 92, years: 8 },
      { name: "Fastify", icon: "fastify", proficiency: 78, years: 3 },
      { name: "Python", icon: "python", proficiency: 82, years: 6 },
      { name: "Go", icon: "go", proficiency: 70, years: 3 },
    ],
  },
  {
    title: "Cloud",
    icon: "cloud",
    skills: [
      { name: "AWS", icon: "aws", proficiency: 90, years: 7 },
      { name: "GCP", icon: "gcp", proficiency: 78, years: 4 },
      { name: "Azure", icon: "azure", proficiency: 72, years: 3 },
      { name: "Vercel", icon: "vercel", proficiency: 92, years: 4 },
      { name: "Cloudflare", icon: "cloudflare", proficiency: 80, years: 3 },
    ],
  },
  {
    title: "DevOps",
    icon: "container",
    skills: [
      { name: "Docker", icon: "docker", proficiency: 92, years: 7 },
      { name: "Kubernetes", icon: "kubernetes", proficiency: 85, years: 5 },
      { name: "Terraform", icon: "terraform", proficiency: 82, years: 4 },
      { name: "Ansible", icon: "ansible", proficiency: 75, years: 3 },
      { name: "GitHub Actions", icon: "github", proficiency: 90, years: 5 },
      { name: "Nginx", icon: "nginx", proficiency: 85, years: 6 },
    ],
  },
  {
    title: "Databases",
    icon: "database",
    skills: [
      { name: "PostgreSQL", icon: "postgresql", proficiency: 90, years: 8 },
      { name: "MongoDB", icon: "mongodb", proficiency: 85, years: 6 },
      { name: "Redis", icon: "redis", proficiency: 82, years: 5 },
      { name: "SQLite", icon: "sqlite", proficiency: 88, years: 7 },
      { name: "Prisma", icon: "prisma", proficiency: 88, years: 4 },
    ],
  },
  {
    title: "AI Engineering",
    icon: "brain",
    skills: [
      { name: "OpenAI API", icon: "openai", proficiency: 90, years: 3 },
      { name: "LangChain", icon: "langchain", proficiency: 88, years: 2 },
      { name: "LangGraph", icon: "langgraph", proficiency: 82, years: 2 },
      { name: "RAG", icon: "rag", proficiency: 85, years: 2 },
      { name: "Vector Search", icon: "vector", proficiency: 80, years: 2 },
      { name: "MCP", icon: "mcp", proficiency: 85, years: 1 },
    ],
  },
  {
    title: "Architecture",
    icon: "building2",
    skills: [
      { name: "Clean Architecture", icon: "clean", proficiency: 92, years: 8 },
      { name: "Microservices", icon: "microservices", proficiency: 88, years: 6 },
      { name: "Event-Driven", icon: "events", proficiency: 85, years: 5 },
      { name: "API Design", icon: "api", proficiency: 94, years: 10 },
      { name: "DDD", icon: "ddd", proficiency: 82, years: 4 },
    ],
  },
  {
    title: "Testing",
    icon: "test-tube",
    skills: [
      { name: "Vitest", icon: "vitest", proficiency: 88, years: 4 },
      { name: "Playwright", icon: "playwright", proficiency: 85, years: 3 },
      { name: "Cypress", icon: "cypress", proficiency: 82, years: 4 },
      { name: "Jest", icon: "jest", proficiency: 90, years: 7 },
      { name: "Testing Library", icon: "testing-library", proficiency: 88, years: 5 },
    ],
  },
  {
    title: "Developer Tools",
    icon: "wrench",
    skills: [
      { name: "Git", icon: "git", proficiency: 95, years: 12 },
      { name: "VS Code", icon: "vscode", proficiency: 95, years: 10 },
      { name: "Neovim", icon: "neovim", proficiency: 78, years: 3 },
      { name: "pnpm", icon: "pnpm", proficiency: 90, years: 4 },
      { name: "ESLint", icon: "eslint", proficiency: 88, years: 7 },
    ],
  },
  {
    title: "Security",
    icon: "shield",
    skills: [
      { name: "OWASP", icon: "owasp", proficiency: 82, years: 6 },
      { name: "Auth0", icon: "auth0", proficiency: 85, years: 4 },
      { name: "Clerk", icon: "clerk", proficiency: 80, years: 2 },
      { name: "Helmet", icon: "helmet", proficiency: 88, years: 5 },
    ],
  },
  {
    title: "LLM Engineering",
    icon: "sparkles",
    skills: [
      { name: "Prompt Engineering", icon: "prompt", proficiency: 92, years: 3 },
      { name: "Context Engineering", icon: "context", proficiency: 88, years: 2 },
      { name: "Tool Calling", icon: "tool-calling", proficiency: 90, years: 2 },
      { name: "Structured Outputs", icon: "structured-outputs", proficiency: 85, years: 2 },
      { name: "Fine-tuning", icon: "fine-tuning", proficiency: 78, years: 2 },
      { name: "Model Evaluation", icon: "evaluation", proficiency: 80, years: 2 },
    ],
  },
]
