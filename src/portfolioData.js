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
    "AI engineer with an MS in Computer Science from the University of San Francisco. My work spans agent orchestration, voice AI, computer vision pipelines, retrieval systems, and full-stack infrastructure built with TypeScript, Python, React, Next.js, Java, AWS, GCP, and MongoDB.",
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
    portfolioGroup: "featured",
    portfolioOrder: 1,
    url: "https://interviewithai.com/",
    repositoryUrl: null,
    media: "/videos/interviewwithai-preview.mp4",
    thumbnail: "/images/interviewwithai-thumbnail.png",
    visual: "voice",
    organization: "Independent product",
    role: "Product engineer",
    schemaType: "SoftwareApplication",
    applicationCategory: "EducationalApplication",
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
    portfolioGroup: "featured",
    portfolioOrder: 2,
    url: null,
    repositoryUrl: null,
    media: "/videos/codex-session-preview.mp4",
    thumbnail: "/images/codex-session-thumbnail.png",
    visual: "code",
    organization: "Independent developer tool",
    role: "Extension developer",
    schemaType: "SoftwareApplication",
    applicationCategory: "DeveloperApplication",
    softwareRequirements: "Visual Studio Code",
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
    ],
    related: ["a2a-multi-agent-builder", "10-agent-board-game", "interview-with-ai"],
  },
  {
    id: "codetown",
    slug: "codetown",
    title: "CodeTown",
    eyebrow: "Code visualization extension",
    period: "Jul 2026 - Present",
    status: "In development",
    portfolioGroup: "featured",
    portfolioOrder: 3,
    url: null,
    repositoryUrl: null,
    media: "/videos/codetown-preview.mp4",
    thumbnail: "/images/codetown-preview.png",
    visual: "code",
    organization: "Independent developer tool",
    role: "Extension developer",
    schemaType: "SoftwareApplication",
    applicationCategory: "DeveloperApplication",
    softwareRequirements: "Visual Studio Code",
    seoTitle: "CodeTown - VS Code Project Visualization | Deven Varu",
    seoDescription:
      "A VS Code extension that turns a project codebase into a 2D top-down town for exploring file relationships through imports and exports.",
    summary:
      "VS Code extension that turns a project codebase into a 2D top-down town for exploring file relationships through imports and exports.",
    impact: [
      "Represents project code as a 2D top-down town.",
      "Shows relationships between files through import and export connections.",
      "Built as a Visual Studio Code extension with JavaScript and TypeScript.",
    ],
    stack: ["VS Code Extension API", "JavaScript", "TypeScript", "Code Visualization"],
    sections: [
      {
        heading: "What it shows",
        items: [
          "A project codebase represented as a 2D top-down town.",
          "File relationships based on import and export connections.",
          "A Visual Studio Code extension interface for exploring those relationships.",
        ],
      },
      {
        heading: "Current status",
        body:
          "CodeTown started in July 2026 and is currently being built as a Visual Studio Code extension.",
      },
    ],
    related: ["codex-session-visualizer"],
  },
  {
    id: "a2a-multi-agent-builder",
    slug: "a2a-multi-agent-builder",
    title: "A2A Multi-Agent Builder",
    eyebrow: "Agent infrastructure",
    period: "Jan 2026 - Mar 2026",
    status: "Prototype",
    portfolioGroup: "ai-systems",
    portfolioOrder: 1,
    url: "https://mongo-snowy.vercel.app/",
    repositoryUrl: null,
    media: "/videos/a2a-agent-builder-preview.mp4",
    thumbnail: "/images/a2a-agent-builder-thumbnail.png",
    visual: "agents",
    organization: "Independent prototype",
    role: "Full-stack AI engineer",
    schemaType: "SoftwareApplication",
    applicationCategory: "DeveloperApplication",
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
    portfolioGroup: "experiments",
    portfolioOrder: 1,
    url: "https://www.youtube.com/watch?v=RUBz4VQ3cHA",
    repositoryUrl: null,
    media: "/videos/10-ai-agents-preview.mp4",
    thumbnail: "/images/10-ai-agents-preview.png",
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
    id: "pokemon-mixed-reality",
    slug: "pokemon-mixed-reality",
    title: "Pokémon Mixed Reality",
    eyebrow: "Mixed reality experiment",
    period: "Date not specified",
    status: "Experiment",
    portfolioGroup: "experiments",
    portfolioOrder: 2,
    url: null,
    repositoryUrl: "https://github.com/Devenvaruv/PokemonXR",
    media: null,
    visual: "xr",
    organization: "Independent experiment",
    role: null,
    schemaType: "SoftwareSourceCode",
    seoTitle: "Pokémon Mixed Reality | Deven Varu",
    seoDescription:
      "A mixed-reality experience that brings Pokémon into a user's physical environment with interactive digital characters and gameplay elements.",
    summary:
      "Mixed-reality experience that brings Pokémon into the user's physical environment with interactive digital characters and gameplay elements.",
    impact: [
      "Blends real-world surroundings with interactive digital characters.",
      "Explores mixed-reality gameplay elements in the user's physical environment.",
    ],
    stack: ["Mixed Reality", "Interactive Digital Characters", "Spatial Experiences"],
    sections: [
      {
        heading: "Concept",
        body:
          "The project brings Pokémon into the user's physical environment by blending real-world surroundings with interactive digital characters and gameplay elements.",
      },
      {
        heading: "What it explores",
        items: [
          "Mixed-reality interaction in a user's physical environment.",
          "Interactive digital characters placed into real-world surroundings.",
          "Gameplay elements designed around blended physical and digital space.",
        ],
      },
    ],
    related: ["vr-classroom", "quantumviz", "10-agent-board-game"],
  },
  {
    id: "vr-classroom",
    slug: "vr-classroom",
    title: "VR Classroom",
    eyebrow: "Virtual reality experiment",
    period: "Date not specified",
    status: "Experiment",
    portfolioGroup: "experiments",
    portfolioOrder: 3,
    url: null,
    repositoryUrl: "https://github.com/Devenvaruv/VRed",
    media: null,
    visual: "vr",
    organization: "Independent experiment",
    role: null,
    schemaType: "SoftwareSourceCode",
    seoTitle: "VR Classroom | Deven Varu",
    seoDescription:
      "An immersive virtual-reality classroom exploring learning and interaction in a shared 3D environment focused on presence and engagement.",
    summary:
      "Immersive virtual-reality classroom exploring how learning and interaction can work in a shared 3D environment.",
    impact: [
      "Explores learning and interaction inside a shared 3D environment.",
      "Focuses on presence, engagement, and spatial experiences in virtual reality.",
    ],
    stack: ["Virtual Reality", "3D Environments", "Spatial Experiences"],
    sections: [
      {
        heading: "Concept",
        body:
          "VR Classroom is an immersive virtual-reality classroom for exploring how learning and interaction can work in a shared 3D environment.",
      },
      {
        heading: "What it explores",
        items: [
          "Presence and engagement in a virtual classroom.",
          "Learning and interaction in shared 3D space.",
          "Spatial experiences as part of an educational environment.",
        ],
      },
    ],
    related: ["pokemon-mixed-reality", "quantumviz", "10-agent-board-game"],
  },
  {
    id: "quantumviz",
    slug: "quantumviz",
    title: "QuantumViz",
    eyebrow: "Interactive visualization prototype",
    period: "Date not specified",
    status: "Prototype",
    portfolioGroup: "experiments",
    portfolioOrder: 4,
    url: null,
    repositoryUrl: "https://github.com/Devenvaruv/QuantumViz",
    media: null,
    visual: "quantum",
    organization: "Independent prototype",
    role: null,
    schemaType: "SoftwareSourceCode",
    seoTitle: "QuantumViz - Single-Qubit Gate Visualization | Deven Varu",
    seoDescription:
      "A React, D3, and styled-components prototype for visualizing how common single-qubit gates move qubit states across a custom 2D diagram.",
    summary:
      "React-based interactive visualization prototype for exploring how common single-qubit gates move qubit states across a custom 2D diagram.",
    impact: [
      "Visualizes common single-qubit gates on a custom 2D diagram.",
      "Focuses on intuition and visual learning rather than full quantum-circuit simulation.",
      "Combines React UI, D3 SVG drawing and animation, and styled-components interface styling.",
    ],
    stack: ["React", "D3", "SVG Animation", "styled-components", "Quantum Visualization"],
    sections: [
      {
        heading: "Purpose",
        body:
          "QuantumViz is aimed at intuition and visual learning rather than full quantum-circuit simulation.",
      },
      {
        heading: "What it uses",
        items: [
          "React for the user interface.",
          "D3 for SVG drawing and animation.",
          "styled-components for interface styling.",
        ],
      },
    ],
    related: ["vr-classroom", "pokemon-mixed-reality", "10-agent-board-game"],
  },
  {
    id: "road-asset-detection",
    slug: "road-asset-detection",
    title: "Road Asset Detection with YOLO",
    eyebrow: "Computer vision research",
    period: "USF Research",
    status: "Production-ready",
    portfolioGroup: "ai-systems",
    portfolioOrder: 3,
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
    portfolioGroup: "ai-systems",
    portfolioOrder: 2,
    url: null,
    repositoryUrl: null,
    media: "/images/catalog-intelligence-automation-thumbnail.png",
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
    portfolioGroup: "hidden",
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
    portfolioGroup: "hidden",
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
    portfolioGroup: "earlier-work",
    portfolioOrder: 1,
    url: "https://interest-form.vercel.app/",
    repositoryUrl: null,
    media: "/videos/full-stack.mp4",
    visual: "rag",
    organization: "EBPREC",
    role: "Full-stack developer",
    schemaType: "WebApplication",
    applicationCategory: "CivicTechnology",
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
