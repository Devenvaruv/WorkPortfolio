export const profile = {
  name: "Deven Varu",
  title: "AI Engineer",
  location: "San Francisco Bay Area",
  email: "dvvaru@dons.usfca.edu",
  phone: "424-213-0720",
  linkedin: "https://www.linkedin.com/in/deven-v/",
  github: "https://github.com/Devenvaruv",
  headline:
    "I build production AI products with LLMs, multi-agent systems, A2A, voice agents, and computer vision.",
  summary:
    "AI engineer and MS Computer Science candidate at the University of San Francisco. My work spans agent orchestration, voice AI, computer vision pipelines, retrieval systems, and full-stack infrastructure built with TypeScript, Python, React, Next.js, Java, AWS, GCP, and MongoDB.",
};

export const highlights = [
  { value: "92%", label: "mAP in production CV pipeline" },
  { value: "1st", label: "Cisco HackAIThon" },
  { value: "10", label: "agents in autonomous simulation" },
  { value: "4", label: "A2A servers coordinated by one client" },
];

export const projects = [
  {
    title: "InterviewWithAI",
    eyebrow: "Production AI product",
    period: "Jun 2026 - Present",
    status: "Live",
    url: "https://interviewithai.com/",
    media: null,
    visual: "voice",
    summary:
      "AI-powered interview practice platform for realistic voice interviews, coding problems, transcripts, and structured performance feedback.",
    impact: [
      "Built real-time AI interview conversations with Vapi voice agents.",
      "Added a browser coding environment with Monaco Editor for technical interview practice.",
      "Designed the backend for sessions, questions, transcripts, code submissions, and AI evaluations.",
    ],
    stack: ["Next.js", "React", "TypeScript", "NestJS", "Vapi", "Monaco Editor", "Supabase"],
  },
  {
    title: "Codex Session Visualizer",
    eyebrow: "AI developer tooling",
    period: "Jul 2026",
    status: "Extension",
    url: null,
    media: null,
    visual: "code",
    summary:
      "VS Code extension that visualizes how Codex explores, reads, edits, creates, and deletes files during AI coding sessions.",
    impact: [
      "Labels files and folders with Found, Read, Edited, Created, and Deleted activity states.",
      "Parses raw Codex sessions into readable logs covering prompts, responses, tools, file operations, and execution flow.",
      "Generates multi-agent graphs connecting the main session with delegated sub-agents.",
    ],
    stack: ["VS Code Extension API", "TypeScript", "Multi-agent Systems", "Developer Tools"],
  },
  {
    title: "A2A Multi-Agent Builder",
    eyebrow: "Agent infrastructure",
    period: "Jan 2026 - Mar 2026",
    status: "Prototype",
    url: "https://mongo-snowy.vercel.app/",
    media: null,
    visual: "agents",
    summary:
      "Platform for creating, versioning, and orchestrating multi-agent AI systems dynamically instead of hardcoding workflows.",
    impact: [
      "Designed an agent factory that assembles specialized teams at runtime.",
      "Supported parallel and sequential execution with structured response aggregation.",
      "Used MongoDB Atlas for prompts, agent configs, routing logic, shared context, execution logs, versioning, and rollback.",
    ],
    stack: ["A2A", "TypeScript", "MongoDB Atlas", "Prompt Versioning", "Agent Orchestration"],
  },
  {
    title: "10-Agent AI Board Game Simulation",
    eyebrow: "Autonomous agents",
    period: "Jan 2026 - Feb 2026",
    status: "Demo",
    url: "https://www.youtube.com/watch?v=RUBz4VQ3cHA",
    media: null,
    visual: "board",
    summary:
      "Hierarchical multi-agent system where autonomous AI characters play a custom board game through movement, dialogue, actions, and combat.",
    impact: [
      "Combined one Dungeon Master agent, three player agents, and specialized dialogue/action sub-agents.",
      "Generated structured JSON commands for movement, combat, and world actions.",
      "Maintained shared game state while agents made personality-driven decisions.",
    ],
    stack: ["Multi-agent Systems", "Agent Orchestration", "Structured JSON", "Simulation"],
  },
  {
    title: "Road Asset Detection with YOLO",
    eyebrow: "Computer vision research",
    period: "USF Research",
    status: "Production-ready",
    url: null,
    media: "/videos/AI-preview.mp4",
    visual: "vision",
    summary:
      "Computer vision pipeline for Boone County that detects and maps road infrastructure from stitched 360-degree roadway imagery.",
    impact: [
      "Evaluated YOLO, LaneNet, and DINOv2 on a 7,650-image dataset.",
      "Trained YOLO models for lane markings, shoulders, barriers, streetlights, and other visually similar assets.",
      "Built a 3D visualization and validation tool, improving accuracy to 92% mAP and reducing manual labeling.",
    ],
    stack: ["Python", "YOLOv8", "Roboflow", "AWS", "React", "Computer Vision"],
  },
  {
    title: "Catalog Intelligence Automation",
    eyebrow: "Applied LLM automation",
    period: "Pistachio Internship",
    status: "Shipped internally",
    url: null,
    media: null,
    visual: "catalog",
    summary:
      "AI pipeline that turns 20-200 page furniture catalogs into structured product data and linked product imagery.",
    impact: [
      "Led a three-person team replacing manual catalog data entry with an AI extraction workflow.",
      "Tested Gemini, OpenAI, Claude, and OCR tools before standardizing on OpenAI for reliable JSON output.",
      "Added YOLO image detection to extract and connect catalog visuals with product records, reducing work from hours to minutes.",
    ],
    stack: ["OpenAI", "OCR", "YOLO", "JSON Extraction", "Python", "Team Lead"],
  },
  {
    title: "LLM-Powered Data Retrieval Chatbot",
    eyebrow: "First Prize - Cisco HackAIThon",
    period: "2024",
    status: "Award winner",
    url: null,
    media: null,
    visual: "sql",
    summary:
      "Natural-language analytics chatbot that translates user questions into SQL and surfaces device usage and memory insights in a dashboard.",
    impact: [
      "Won first place at Cisco's 2024 HackAIThon.",
      "Converted natural-language queries into SQL for faster infrastructure data retrieval.",
      "Collaborated across backend integration, database architecture, and frontend delivery.",
    ],
    stack: ["LLMs", "SQL", "Dashboards", "Backend Integration", "React"],
  },
  {
    title: "Oakland Data Explorer",
    eyebrow: "Geospatial AI and visualization",
    period: "May 2025",
    status: "Award winner",
    url: "https://github.com/devenvaruv",
    media: "/videos/full-stack-preview.mp4",
    visual: "geo",
    summary:
      "Interactive dashboard for exploring satellite imagery and environmental metrics across Oakland from 2016 to 2024.",
    impact: [
      "Built temporal controls for imagery comparison, vegetation masks, maps, charts, and city planning analysis.",
      "Analyzed green density, PM2.5, traffic patterns, and population overlays.",
      "Won a USF Innovation Summit award and became a prototype for rapid environmental insight.",
    ],
    stack: ["Next.js 14", "TypeScript", "Tailwind", "GCP", "Google Earth Engine", "Data Visualization"],
  },
  {
    title: "Here2Stay Interest Form",
    eyebrow: "RAG and civic tech",
    period: "Jun 2023",
    status: "Live",
    url: "https://interest-form.vercel.app/",
    media: "/videos/full-stack.mp4",
    visual: "rag",
    summary:
      "Bilingual web portal for EBPREC that digitized community intake, sent resource packets, and answered housing-resource questions with a RAG chatbot.",
    impact: [
      "Built multi-page and quick-intake flows for residents and community events.",
      "Automated submissions into 18 Google Sheets segmented by referral source.",
      "Integrated Pinecone and OpenAI for bilingual retrieval-augmented answers under one second.",
    ],
    stack: ["Next.js", "Tailwind", "Google Sheets API", "Pinecone", "OpenAI", "Nodemailer"],
  },
];

export const experience = [
  {
    company: "SnapLogic",
    role: "Software Engineer Intern",
    period: "Sep 2025 - Dec 2025",
    detail:
      "Implemented Agent-to-Agent protocol client/server logic in Java and validated workflows where one client coordinated tasks across four independent A2A servers.",
  },
  {
    company: "University of San Francisco",
    role: "Research Assistant - Computer Vision",
    period: "Aug 2023 - Dec 2025",
    detail:
      "Built and deployed a production-ready roadway asset detection workflow using YOLOv8, AWS, and a custom 3D validation tool.",
  },
  {
    company: "Pistachio",
    role: "Software Engineer Intern",
    period: "Jun 2024 - Aug 2024",
    detail:
      "Led AI catalog extraction work using LLMs, OCR, and YOLO to convert large furniture catalogs into structured product datasets.",
  },
];

export const skillGroups = [
  {
    name: "AI Systems",
    items: ["LLMs", "RAG", "Voice Agents", "A2A", "Multi-agent Orchestration", "Prompt Versioning"],
  },
  {
    name: "Machine Learning",
    items: ["YOLO", "PyTorch", "TensorFlow", "Scikit-Learn", "Pandas", "NumPy", "Computer Vision"],
  },
  {
    name: "Product Engineering",
    items: ["TypeScript", "React", "Next.js", "NestJS", "Node.js", "Java", "Python", "SQL"],
  },
  {
    name: "Infrastructure",
    items: ["AWS", "GCP", "Docker", "Kubernetes", "CI/CD", "Terraform", "MongoDB Atlas", "Supabase"],
  },
];

export const awards = [
  "First Place - Cisco HackAIThon",
  "Innovation Summit Award - Oakland Geospatial Analysis Platform",
  "First Place - 6th Annual Sustainability Design Challenge",
];
