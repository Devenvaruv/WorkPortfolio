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
    id: "interview-with-ai",
    slug: "interview-with-ai",
    title: "InterviewWithAI",
    eyebrow: "Production AI product",
    period: "Jun 2026 - Present",
    status: "Live",
    url: "https://interviewithai.com/",
    repositoryUrl: null,
    media: null,
    visual: "voice",
    organization: "Independent product",
    role: "Product engineer",
    schemaType: "SoftwareApplication",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    seoTitle: "InterviewWithAI - AI Coding Interview Practice | Deven Varu",
    seoDescription:
      "An AI-powered interview practice platform combining realistic voice interviews, coding problems, transcripts, code submissions, and structured performance feedback.",
    summary:
      "AI-powered interview practice platform for realistic voice interviews, coding problems, transcripts, and structured performance feedback.",
    impact: [
      "Built real-time AI interview conversations with Vapi voice agents.",
      "Added a browser coding environment with Monaco Editor for technical interview practice.",
      "Designed the backend for sessions, questions, transcripts, code submissions, and AI evaluations.",
    ],
    stack: ["Next.js", "React", "TypeScript", "NestJS", "Vapi", "Monaco Editor", "Supabase"],
    sections: [
      {
        heading: "Problem",
        body:
          "Interview practice is more useful when speaking, coding, transcripts, and feedback happen in the same workflow instead of separate tools.",
      },
      {
        heading: "What I built",
        items: [
          "A voice interview practice flow using Vapi voice agents.",
          "A browser coding environment with Monaco Editor for technical interview practice.",
          "Backend models for sessions, questions, transcripts, code submissions, and AI evaluations.",
        ],
      },
      {
        heading: "How it works",
        body:
          "The product combines a voice-agent interview flow with coding questions and structured feedback so a practice session can include conversation, submitted code, transcript capture, and evaluation data.",
      },
      {
        heading: "Current limitations",
        body:
          "Dedicated screenshots and a full public walkthrough still need to be added to the portfolio media library.",
      },
    ],
    related: ["codex-session-visualizer", "a2a-multi-agent-builder", "here2stay"],
  },
  {
    id: "codex-session-visualizer",
    slug: "codex-session-visualizer",
    title: "Codex Session Visualizer",
    eyebrow: "AI developer tooling",
    period: "Jul 2026",
    status: "Extension",
    url: null,
    repositoryUrl: null,
    media: null,
    visual: "code",
    organization: "Independent developer tool",
    role: "Extension developer",
    schemaType: "SoftwareApplication",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "VS Code",
    seoTitle: "Codex Session Visualizer - VS Code AI Agent Observability | Deven Varu",
    seoDescription:
      "A VS Code extension that visualizes Codex file activity, tool use, execution flow, prompts, and delegated sub-agent sessions.",
    summary:
      "VS Code extension that visualizes how Codex explores, reads, edits, creates, and deletes files during AI coding sessions.",
    impact: [
      "Labels files and folders with Found, Read, Edited, Created, and Deleted activity states.",
      "Parses raw Codex sessions into readable logs covering prompts, responses, tools, file operations, and execution flow.",
      "Generates multi-agent graphs connecting the main session with delegated sub-agents.",
    ],
    stack: ["VS Code Extension API", "TypeScript", "Multi-agent Systems", "Developer Tools"],
    sections: [
      {
        heading: "Problem",
        body:
          "Raw AI coding sessions are difficult to inspect because prompts, tool calls, file operations, and delegated agents are spread across dense logs.",
      },
      {
        heading: "What I built",
        items: [
          "File and folder labels for Found, Read, Edited, Created, and Deleted activity states.",
          "Readable session logs for prompts, responses, tools, file operations, and execution flow.",
          "A graph view connecting a parent session with delegated sub-agent sessions.",
        ],
      },
      {
        heading: "Technical decisions",
        body:
          "The extension focuses on turning raw Codex session data into inspectable state: file activity, chronological logs, and parent/sub-agent relationships.",
      },
      {
        heading: "Current limitations",
        body:
          "The portfolio still needs a real screenshot showing the VS Code interface, session logs, file states, and graph view.",
      },
    ],
    related: ["a2a-multi-agent-builder", "10-agent-board-game", "interview-with-ai"],
  },
  {
    id: "a2a-multi-agent-builder",
    slug: "a2a-multi-agent-builder",
    title: "A2A Multi-Agent Builder",
    eyebrow: "Agent infrastructure",
    period: "Jan 2026 - Mar 2026",
    status: "Prototype",
    url: "https://mongo-snowy.vercel.app/",
    repositoryUrl: null,
    media: null,
    visual: "agents",
    organization: "Independent prototype",
    role: "Full-stack AI engineer",
    schemaType: "SoftwareApplication",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    seoTitle: "A2A Multi-Agent Builder | Deven Varu",
    seoDescription:
      "A platform for creating, versioning, and orchestrating dynamic multi-agent AI systems with prompt configuration, shared context, and execution logs.",
    summary:
      "Platform for creating, versioning, and orchestrating multi-agent AI systems dynamically instead of hardcoding workflows.",
    impact: [
      "Designed an agent factory that assembles specialized teams at runtime.",
      "Supported parallel and sequential execution with structured response aggregation.",
      "Used MongoDB Atlas for prompts, agent configs, routing logic, shared context, execution logs, versioning, and rollback.",
    ],
    stack: ["A2A", "TypeScript", "MongoDB Atlas", "Prompt Versioning", "Agent Orchestration"],
    sections: [
      {
        heading: "Problem",
        body:
          "Hardcoded agent workflows make it difficult to create, adjust, version, and roll back specialized multi-agent teams.",
      },
      {
        heading: "What I built",
        items: [
          "An agent factory that assembles specialized teams at runtime.",
          "Parallel and sequential execution modes with structured response aggregation.",
          "MongoDB Atlas storage for prompts, agent configs, routing logic, shared context, execution logs, versioning, and rollback.",
        ],
      },
      {
        heading: "Technical focus",
        body:
          "The project centered on dynamic agent configuration, prompt versioning, shared context, and execution observability.",
      },
    ],
    related: ["codex-session-visualizer", "10-agent-board-game", "interview-with-ai"],
  },
  {
    id: "10-agent-board-game",
    slug: "10-agent-board-game",
    title: "10-Agent AI Board Game Simulation",
    eyebrow: "Autonomous agents",
    period: "Jan 2026 - Feb 2026",
    status: "Demo",
    url: "https://www.youtube.com/watch?v=RUBz4VQ3cHA",
    repositoryUrl: null,
    media: null,
    visual: "board",
    organization: "Independent simulation",
    role: "Agent systems engineer",
    schemaType: "CreativeWork",
    seoTitle: "10-Agent AI Board Game Simulation | Deven Varu",
    seoDescription:
      "A hierarchical multi-agent board game simulation with a Dungeon Master agent, player agents, dialogue/action sub-agents, and structured JSON actions.",
    summary:
      "Hierarchical multi-agent system where autonomous AI characters play a custom board game through movement, dialogue, actions, and combat.",
    impact: [
      "Combined one Dungeon Master agent, three player agents, and specialized dialogue/action sub-agents.",
      "Generated structured JSON commands for movement, combat, and world actions.",
      "Maintained shared game state while agents made personality-driven decisions.",
    ],
    stack: ["Multi-agent Systems", "Agent Orchestration", "Structured JSON", "Simulation"],
    sections: [
      {
        heading: "System design",
        body:
          "The simulation combines a Dungeon Master agent, three player agents, and specialized dialogue/action sub-agents around a shared game state.",
      },
      {
        heading: "What I built",
        items: [
          "Structured JSON commands for movement, combat, dialogue, and world actions.",
          "Shared game-state updates while agents made personality-driven decisions.",
          "A hierarchical agent setup separating high-level game direction from specialized action and dialogue behavior.",
        ],
      },
    ],
    related: ["a2a-multi-agent-builder", "codex-session-visualizer", "interview-with-ai"],
  },
  {
    id: "road-asset-detection",
    slug: "road-asset-detection",
    title: "Road Asset Detection with YOLO",
    eyebrow: "Computer vision research",
    period: "USF Research",
    status: "Production-ready",
    url: null,
    repositoryUrl: null,
    media: "/videos/AI-preview.mp4",
    visual: "vision",
    organization: "University of San Francisco research",
    role: "Computer vision research assistant",
    schemaType: "CreativeWork",
    seoTitle: "Road Asset Detection with YOLO | Deven Varu",
    seoDescription:
      "A computer vision pipeline for detecting and mapping road infrastructure from stitched 360-degree roadway imagery.",
    summary:
      "Computer vision pipeline for Boone County that detects and maps road infrastructure from stitched 360-degree roadway imagery.",
    impact: [
      "Evaluated YOLO, LaneNet, and DINOv2 on a 7,650-image dataset.",
      "Trained YOLO models for lane markings, shoulders, barriers, streetlights, and other visually similar assets.",
      "Built a 3D visualization and validation tool, improving accuracy to 92% mAP and reducing manual labeling.",
    ],
    stack: ["Python", "YOLOv8", "Roboflow", "AWS", "React", "Computer Vision"],
    sections: [
      {
        heading: "Context",
        body:
          "This University of San Francisco research project supported Boone County roadway analysis using stitched 360-degree roadway imagery.",
      },
      {
        heading: "What I built",
        items: [
          "A computer vision pipeline for lane markings, shoulders, barriers, streetlights, and other visually similar road assets.",
          "YOLO model training and evaluation alongside LaneNet and DINOv2 on a 7,650-image dataset.",
          "A 3D visualization and validation tool for inspecting detections and reducing manual labeling.",
        ],
      },
      {
        heading: "Result",
        body:
          "The workflow improved accuracy to 92% mAP and reduced manual labeling work for road infrastructure detection.",
      },
    ],
    related: ["oakland-data-explorer", "catalog-intelligence-automation", "cisco-hackaithon"],
  },
  {
    id: "catalog-intelligence-automation",
    slug: "catalog-intelligence-automation",
    title: "Catalog Intelligence Automation",
    eyebrow: "Applied LLM automation",
    period: "Pistachio Internship",
    status: "Shipped internally",
    url: null,
    repositoryUrl: null,
    media: null,
    visual: "catalog",
    organization: "Pistachio internship",
    role: "Software engineer intern and team lead",
    schemaType: "CreativeWork",
    seoTitle: "AI Catalog Intelligence Automation | Deven Varu",
    seoDescription:
      "An AI pipeline that converts large furniture catalogs into structured product data and linked product imagery.",
    summary:
      "AI pipeline that turns 20-200 page furniture catalogs into structured product data and linked product imagery.",
    impact: [
      "Led a three-person team replacing manual catalog data entry with an AI extraction workflow.",
      "Tested Gemini, OpenAI, Claude, and OCR tools before standardizing on OpenAI for reliable JSON output.",
      "Added YOLO image detection to extract and connect catalog visuals with product records, reducing work from hours to minutes.",
    ],
    stack: ["OpenAI", "OCR", "YOLO", "JSON Extraction", "Python", "Team Lead"],
    sections: [
      {
        heading: "Context",
        body:
          "During the Pistachio internship, the project focused on replacing manual furniture catalog data entry for 20-200 page catalogs.",
      },
      {
        heading: "What I built",
        items: [
          "A three-person team workflow for AI-assisted catalog extraction.",
          "LLM and OCR evaluation across Gemini, OpenAI, Claude, and OCR tools.",
          "Structured JSON extraction standardized on OpenAI for reliable output.",
          "YOLO image detection to extract and connect catalog visuals with product records.",
        ],
      },
      {
        heading: "Result",
        body:
          "The workflow reduced catalog processing work from hours to minutes for the supported internal use case.",
      },
    ],
    related: ["road-asset-detection", "here2stay", "cisco-hackaithon"],
  },
  {
    id: "cisco-hackaithon",
    slug: "cisco-hackaithon",
    title: "LLM-Powered Data Retrieval Chatbot",
    displayTitle: "Cisco HackAIThon Project",
    eyebrow: "First Prize - Cisco HackAIThon",
    period: "2024",
    status: "Award winner",
    url: null,
    repositoryUrl: null,
    media: null,
    visual: "sql",
    organization: "Cisco HackAIThon",
    role: "Hackathon team collaborator",
    schemaType: "CreativeWork",
    seoTitle: "Cisco HackAIThon Natural-Language SQL Chatbot | Deven Varu",
    seoDescription:
      "A first-place Cisco HackAIThon project that translated natural-language infrastructure questions into SQL and dashboard insights.",
    summary:
      "Natural-language analytics chatbot that translates user questions into SQL and surfaces device usage and memory insights in a dashboard.",
    impact: [
      "Won first place at Cisco's 2024 HackAIThon.",
      "Converted natural-language queries into SQL for faster infrastructure data retrieval.",
      "Collaborated across backend integration, database architecture, and frontend delivery.",
    ],
    stack: ["LLMs", "SQL", "Dashboards", "Backend Integration", "React"],
    sections: [
      {
        heading: "Context",
        body:
          "This first-place Cisco HackAIThon project focused on making infrastructure data easier to retrieve through natural language.",
      },
      {
        heading: "What we built",
        items: [
          "A chatbot that translated natural-language questions into SQL.",
          "Dashboard views for device usage and memory insights.",
          "Backend, database, and frontend integration during the hackathon.",
        ],
      },
    ],
    related: ["a2a-multi-agent-builder", "catalog-intelligence-automation", "road-asset-detection"],
  },
  {
    id: "oakland-data-explorer",
    slug: "oakland-data-explorer",
    title: "Oakland Data Explorer",
    eyebrow: "Geospatial AI and visualization",
    period: "May 2025",
    status: "Award winner",
    url: "https://github.com/devenvaruv",
    repositoryUrl: "https://github.com/devenvaruv",
    media: "/videos/full-stack-preview.mp4",
    visual: "geo",
    organization: "USF Innovation Summit",
    role: "Full-stack data visualization developer",
    schemaType: "SoftwareSourceCode",
    seoTitle: "Oakland Data Explorer - Environmental Data Visualization | Deven Varu",
    seoDescription:
      "An interactive dashboard for exploring Oakland satellite imagery, vegetation masks, PM2.5, traffic, and population overlays from 2016 to 2024.",
    summary:
      "Interactive dashboard for exploring satellite imagery and environmental metrics across Oakland from 2016 to 2024.",
    impact: [
      "Built temporal controls for imagery comparison, vegetation masks, maps, charts, and city planning analysis.",
      "Analyzed green density, PM2.5, traffic patterns, and population overlays.",
      "Won a USF Innovation Summit award and became a prototype for rapid environmental insight.",
    ],
    stack: ["Next.js 14", "TypeScript", "Tailwind", "GCP", "Google Earth Engine", "Data Visualization"],
    sections: [
      {
        heading: "What I built",
        items: [
          "Temporal controls for comparing Oakland satellite imagery from 2016 to 2024.",
          "Vegetation masks, maps, charts, and planning-oriented environmental views.",
          "Overlays for green density, PM2.5, traffic patterns, and population data.",
        ],
      },
      {
        heading: "Result",
        body:
          "The project won a USF Innovation Summit award and became a prototype for rapid environmental insight.",
      },
    ],
    related: ["road-asset-detection", "cisco-hackaithon", "here2stay"],
  },
  {
    id: "here2stay",
    slug: "here2stay",
    title: "Here2Stay Interest Form",
    eyebrow: "RAG and civic tech",
    period: "Jun 2023",
    status: "Live",
    url: "https://interest-form.vercel.app/",
    repositoryUrl: null,
    media: "/videos/full-stack.mp4",
    visual: "rag",
    organization: "EBPREC",
    role: "Full-stack developer",
    schemaType: "WebApplication",
    applicationCategory: "CivicTechnology",
    operatingSystem: "Web",
    seoTitle: "Here2Stay Interest Form - Bilingual Civic Tech RAG Portal | Deven Varu",
    seoDescription:
      "A bilingual intake portal for EBPREC with Google Sheets automation, resource packets, and a Pinecone/OpenAI housing-resource chatbot.",
    summary:
      "Bilingual web portal for EBPREC that digitized community intake, sent resource packets, and answered housing-resource questions with a RAG chatbot.",
    impact: [
      "Built multi-page and quick-intake flows for residents and community events.",
      "Automated submissions into 18 Google Sheets segmented by referral source.",
      "Integrated Pinecone and OpenAI for bilingual retrieval-augmented housing-resource answers.",
    ],
    stack: ["Next.js", "Tailwind", "Google Sheets API", "Pinecone", "OpenAI", "Nodemailer"],
    sections: [
      {
        heading: "Context",
        body:
          "The EBPREC portal digitized community intake and helped residents access housing-resource information.",
      },
      {
        heading: "What I built",
        items: [
          "Multi-page and quick-intake flows for residents and community events.",
          "Automated submissions into 18 Google Sheets segmented by referral source.",
          "Resource packet delivery using Nodemailer.",
          "A bilingual Pinecone and OpenAI retrieval-augmented chatbot for housing-resource questions.",
        ],
      },
    ],
    related: ["catalog-intelligence-automation", "oakland-data-explorer", "interview-with-ai"],
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
