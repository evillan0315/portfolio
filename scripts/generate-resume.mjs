import PDFDocument from "pdfkit"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/* ── Data ── */
const profile = {
  name: "Eddie Villanueva",
  title: "Full-Stack & AI Engineer",
  email: "evillan0315@gmail.com",
  location: "National Capital Region, Philippines",
  summary:
    "Senior full-stack, cloud, DevOps, and AI engineer with 14+ years of experience designing and operating scalable web apps, cloud platforms, and AI-enabled systems end-to-end. Specializes in TypeScript-first stacks, modern React architectures, API design, cloud-native infrastructure, and production-level DevOps practices.",
}

const skills = [
  { category: "Frontend", items: "React, TypeScript, Next.js, Tailwind CSS, HTML/CSS" },
  { category: "Backend", items: "Node.js, NestJS, Express, Fastify, Python, Go" },
  { category: "Cloud", items: "AWS, GCP, Azure, Vercel, Cloudflare" },
  { category: "DevOps", items: "Docker, Kubernetes, Terraform, Ansible, GitHub Actions" },
  { category: "AI/LLM", items: "OpenAI, Claude, LangChain, LangGraph, RAG, MCP, Ollama" },
  { category: "Databases", items: "PostgreSQL, MongoDB, Redis, Prisma, SQLite" },
]

const experience = [
  {
    role: "Freelance AI Developer",
    company: "Self-Employed",
    period: "Jul 2025 — Present",
    details: "Integrating open-weight and frontier AI models (GPT, Qwen, DeepSeek, Mistral). Deploying self-hosted GPU AI servers with Ollama, Docker, and Kubernetes. Building RAG architectures and vector pipelines.",
  },
  {
    role: "Technology Consultant",
    company: "Freelance",
    period: "May 2023 — Present",
    details: "Delivering end-to-end full-stack solutions with cloud-native applications and AI integration. Managing CI/CD, infrastructure across AWS/Azure/GCP.",
  },
  {
    role: "Founder & Lead Engineer",
    company: "Meetlily Advertising",
    period: "Jan 2019 — May 2023",
    details: "Led operations, product management, and software development. Built web, mobile, and desktop applications with server administration and security.",
  },
  {
    role: "Software Engineer Consultant",
    company: "Dashboard Hosting",
    period: "Dec 2020 — Mar 2023",
    details: "Built scalable real-time chat and video streaming platforms. Managed multi-node Kubernetes architecture with high availability. Implemented monitoring with Prometheus and Grafana.",
  },
  {
    role: "Software / Mobile Engineer",
    company: "Welligent",
    period: "Mar 2015 — Aug 2020",
    details: "Developed cross-platform mobile EHR apps with Ionic/Cordova. Built real-time messaging and video conferencing. Architected REST APIs and ensured Section 508 accessibility.",
  },
  {
    role: "Web Developer",
    company: "Easton Advertising / Resite Online / InMotion Hosting",
    period: "May 2013 — Jul 2017",
    details: "Planned, created, and managed websites. Directed design and development workflows. Built data-driven PHP/MySQL applications.",
  },
]

const education = "Centura College | Senior Instructional Designer 2009–2010, Instructional Designer 2008–2009"

/* ── PDF Generation ── */
function generateResume() {
  const doc = new PDFDocument({
    size: "LETTER",
    margins: { top: 48, bottom: 48, left: 48, right: 48 },
    info: {
      Title: "Eddie Villanueva - Resume",
      Author: "Eddie Villanueva",
    },
  })

  const outputPath = path.resolve(__dirname, "..", "public", "resume.pdf")
  const stream = fs.createWriteStream(outputPath)
  doc.pipe(stream)

  const primary = "#6366F1"
  const gray = "#71717A"
  const black = "#1a1a1a"
  const leftMargin = 48
  let y = 48

  /* ── Header ── */
  doc.font("Helvetica-Bold").fontSize(28).fillColor(primary).text(profile.name, leftMargin, y)
  y += 34

  doc.font("Helvetica").fontSize(14).fillColor(black).text(profile.title, leftMargin, y)
  y += 20

  doc.font("Helvetica").fontSize(10).fillColor(gray).text(`${profile.location}`, leftMargin, y)
  y += 14

  doc.font("Helvetica").fontSize(10).fillColor(gray).text(`GitHub: github.com/evillan0315  |  LinkedIn: linkedin.com/in/evillanueva0315`, leftMargin, y)
  y += 10

  doc.font("Helvetica").fontSize(10).fillColor(gray).text(`Email: ${profile.email}`, leftMargin, y)
  y += 14

  doc.font("Helvetica").fontSize(10).fillColor(gray).text(`Phone: +639983971193`, leftMargin, y)
  y += 24

  /* ── Summary ── */
  doc.font("Helvetica-Bold").fontSize(13).fillColor(primary).text("Professional Summary", leftMargin, y)
  y += 18
  doc.font("Helvetica").fontSize(10).fillColor(black).text(profile.summary, leftMargin, y, {
    width: 468,
    align: "left",
    lineGap: 4,
  })
  y += doc.heightOfString(profile.summary, { width: 468 }) + 16

  /* ── Skills ── */
  doc.font("Helvetica-Bold").fontSize(13).fillColor(primary).text("Technical Skills", leftMargin, y)
  y += 18

  for (const skill of skills) {
    doc.font("Helvetica-Bold").fontSize(10).fillColor(black).text(`${skill.category}: `, leftMargin, y, { continued: true })
    doc.font("Helvetica").fillColor(gray).text(skill.items, { lineGap: 4 })
    y += 16
  }
  y += 8

  /* ── Experience ── */
  doc.font("Helvetica-Bold").fontSize(13).fillColor(primary).text("Professional Experience", leftMargin, y)
  y += 18

  for (const exp of experience) {
    doc.font("Helvetica-Bold").fontSize(11).fillColor(black).text(exp.role, leftMargin, y)
    const lineY = y
    doc.font("Helvetica").fontSize(10).fillColor(gray).text(`${exp.company}  |  ${exp.period}`, leftMargin + 200, lineY)
    y += 16

    doc.font("Helvetica").fontSize(9.5).fillColor(black).text(exp.details, leftMargin + 12, y, {
      width: 444,
      lineGap: 3,
    })
    y += doc.heightOfString(exp.details, { width: 444 }) + 14
  }

  /* ── Education ── */
  doc.font("Helvetica-Bold").fontSize(13).fillColor(primary).text("Education", leftMargin, y)
  y += 18
  doc.font("Helvetica").fontSize(10).fillColor(black).text(education, leftMargin, y, { width: 468, lineGap: 4 })

  /* ── Footer ── */
  doc.fontSize(8).fillColor(gray).text(
    "References available upon request",
    leftMargin,
    doc.page.height - 48,
    { align: "center", width: 468 },
  )

  doc.end()

  return new Promise((resolve, reject) => {
    stream.on("finish", () => {
      console.log(`✅ Resume generated: ${outputPath}`)
      resolve()
    })
    stream.on("error", reject)
  })
}

generateResume().catch(console.error)
