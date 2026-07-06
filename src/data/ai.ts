import type { AIExpertiseCategory, AIFlowStage } from "@/types"

export const aiExpertise: AIExpertiseCategory[] = [
  {
    title: "AI Expertise",
    icon: "brain",
    items: [
      { name: "Agents", description: "Autonomous AI agents for complex task execution" },
      { name: "RAG", description: "Retrieval-augmented generation for grounded responses" },
      { name: "MCP", description: "Model Context Protocol for standardized tool access" },
      { name: "Prompt Engineering", description: "Crafting effective prompts for desired outputs" },
      { name: "Context Engineering", description: "Managing and optimizing LLM context windows" },
      { name: "Tool Calling", description: "Enabling LLMs to interact with external tools and APIs" },
      { name: "Function Calling", description: "Structured function invocation from LLM outputs" },
      { name: "Structured Outputs", description: "Enforcing JSON schema and format constraints" },
      { name: "Memory", description: "Persistent and episodic memory for conversational AI" },
      { name: "Embeddings", description: "Vector representations for semantic understanding" },
      { name: "Vector Search", description: "Efficient similarity search in vector databases" },
      { name: "Multi-Agent Systems", description: "Collaborative agent architectures for complex workflows" },
    ],
  },
  {
    title: "Commercial Models",
    icon: "stars",
    items: [
      { name: "OpenAI", description: "GPT-4o, GPT-4o-mini, o1, o3" },
      { name: "Claude", description: "Claude 3.5 Sonnet, Claude 3 Haiku (Anthropic)" },
      { name: "Gemini", description: "Gemini 1.5 Pro, Gemini 2.0 Flash (Google)" },
      { name: "Groq", description: "Ultra-fast inference with LPU architecture" },
      { name: "Meta AI", description: "Llama 3, Llama 4 series" },
    ],
  },
  {
    title: "Open Source Models",
    icon: "github",
    items: [
      { name: "Llama", description: "Meta's open-source LLM family" },
      { name: "DeepSeek", description: "High-performance open-weight models" },
      { name: "Mistral", description: "Efficient and capable open-source models" },
      { name: "Gemma", description: "Google's lightweight open models" },
      { name: "Qwen", description: "Alibaba's multilingual model series" },
      { name: "Phi", description: "Microsoft's small language models" },
      { name: "Falcon", description: "TII's open-source LLM" },
    ],
  },
  {
    title: "Local AI",
    icon: "monitor",
    items: [
      { name: "Ollama", description: "Run LLMs locally with ease" },
      { name: "llama.cpp", description: "C++ implementation for efficient LLM inference" },
      { name: "Open WebUI", description: "Self-hosted ChatGPT-like interface" },
      { name: "GGUF", description: "Model format for efficient CPU inference" },
      { name: "ONNX Runtime", description: "Cross-platform ML model inference" },
      { name: "Hugging Face", description: "Model hub and transformers library" },
    ],
  },
  {
    title: "AI Frameworks",
    icon: "layers",
    items: [
      { name: "LangChain", description: "Framework for LLM application development" },
      { name: "LangGraph", description: "Graph-based agent orchestration" },
      { name: "Vercel AI SDK", description: "AI SDK for React/Next.js applications" },
      { name: "MCP SDK", description: "Model Context Protocol SDK" },
      { name: "Hugging Face Transformers", description: "Unified API for thousands of models" },
    ],
  },
  {
    title: "AI Developer Tools",
    icon: "wrench",
    items: [
      { name: "Claude Code", description: "AI-powered terminal coding assistant" },
      { name: "OpenCode", description: "AI coding agent with MCP support" },
      { name: "Cursor", description: "AI-first code editor" },
      { name: "GitHub Copilot", description: "AI pair programmer" },
      { name: "Windsurf", description: "Flow-optimized AI development" },
      { name: "Cline", description: "Autonomous coding agent for VS Code" },
      { name: "Continue.dev", description: "Open-source AI code assistant" },
    ],
  },
]

export const aiFlowStages: AIFlowStage[] = [
  {
    id: "input",
    label: "User Input",
    description: "Raw query or task from the user",
    icon: "message-square",
    items: ["Chat interface", "API request", "Voice input", "Code context"],
  },
  {
    id: "prompt",
    label: "Prompt Engineering",
    description: "System prompt construction and instruction crafting",
    icon: "file-text",
    items: ["System prompts", "Few-shot examples", "Chain-of-thought", "Role prompting"],
  },
  {
    id: "context",
    label: "Context Enrichment",
    description: "Retrieval, embeddings, and context assembly",
    icon: "database",
    items: ["RAG pipeline", "Vector search", "Embeddings", "Context window management"],
  },
  {
    id: "tools",
    label: "Tool Execution",
    description: "External tool calling and function execution",
    icon: "wrench",
    items: ["Function calling", "MCP protocol", "API tools", "Code execution"],
  },
  {
    id: "inference",
    label: "LLM Inference",
    description: "Model inference across commercial, open-source, and local models",
    icon: "brain",
    items: ["Commercial APIs", "Open-source models", "Local inference", "Model routing"],
  },
  {
    id: "memory",
    label: "Memory & State",
    description: "Conversation history, persistent memory, and state management",
    icon: "hard-drive",
    items: ["Conversation history", "Episodic memory", "State graphs", "Session management"],
  },
  {
    id: "output",
    label: "Structured Output",
    description: "Response formatting, validation, and delivery",
    icon: "check-square",
    items: ["JSON schema", "Type validation", "Streaming", "Response formatting"],
  },
]
