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
    "I'm an AI engineer focused on building systems where models interact with people, code, tools, and real-world data. My recent work spans real-time voice agents, multi-agent systems, AI developer tooling, and computer vision. I have an MS in Computer Science from the University of San Francisco and tend to work end-to-end, from agent and model behavior through backend infrastructure and product interfaces.",
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
    mediaWidth: 1672,
    mediaHeight: 680,
    thumbnail: "/images/interviewwithai-thumbnail.png",
    visual: "voice",
    organization: "Independent product",
    role: "Product engineer",
    schemaType: "SoftwareApplication",
    applicationCategory: "EducationalApplication",
    seoTitle: "InterviewWithAI - AI Coding Interview Practice | Deven Varu",
    seoDescription:
      "A real-time AI coding interview platform where a voice agent observes candidate coding, asks context-aware follow-up questions, and evaluates problem-solving.",
    summary:
      "Real-time AI coding interview platform where a voice agent observes a candidate's coding process, asks context-aware follow-up questions, and evaluates how they approach problems.",
    impact: [
      "Built a real-time voice interview pipeline using Deepgram for speech-to-text, an LLM for reasoning, and Kokoro for text-to-speech.",
      "Orchestrated interview behavior with Mastra, giving the agent access to conversation state, interview context, and the candidate's coding activity.",
      "Built an integrated coding environment with Monaco Editor and Docker-based code execution, allowing candidates to write, run, and discuss code during the interview.",
      "Designed the backend for interview sessions, transcripts, questions, code submissions, and structured AI evaluations.",
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "NestJS",
      "Mastra",
      "Deepgram",
      "Kokoro",
      "Monaco Editor",
      "Docker",
      "Supabase",
    ],
    sections: [
      {
        heading: "Problem",
        body:
          "Most interview-practice tools separate coding, conversation, and feedback into different experiences. That makes it difficult to recreate the part of a real technical interview that matters most: explaining decisions while solving a problem and responding to questions that change based on what you actually do.\n\nInterviewWithAI brings those pieces into a single session so the interviewer can react to both the conversation and the candidate's coding process.",
      },
      {
        heading: "What I built",
        body:
          "I built the product end-to-end around a real-time AI interviewer.\n\nThe voice pipeline uses Deepgram to transcribe the candidate, an LLM to reason about the conversation and interview context, and Kokoro to generate the agent's speech. Mastra orchestrates those components and manages the context the interviewer needs to decide what to ask next.\n\nFor technical interviews, candidates work inside a browser-based Monaco Editor. Code can be executed inside a Docker container, allowing the interview experience to include writing, running, debugging, and discussing actual code rather than treating coding as a separate exercise.\n\nThe backend manages interview sessions, questions, transcripts, code submissions, and evaluation data used to generate structured feedback after the session.",
      },
      {
        heading: "How it works",
        body:
          "A session connects three parts of the system: the voice agent, coding environment, and interview state.",
        items: [
          "The candidate speaks and Deepgram converts the audio into text.",
          "Mastra provides the LLM with the relevant conversation, interview context, and coding activity.",
          "The LLM determines the interviewer's next response or follow-up question.",
          "Kokoro converts that response back into speech for the candidate.",
          "During coding questions, the candidate writes code in Monaco Editor and can execute it through the application's Docker-based execution environment.",
          "Conversation transcripts, coding activity, submissions, and session data are stored for the evaluation pipeline.",
          "After the interview, the system produces structured feedback based on the candidate's solution and how they approached the problem.",
        ],
      },
    ],
    related: ["codex-session-visualizer", "codetown", "a2a-multi-agent-builder"],
  },
  {
    id: "codex-session-visualizer",
    slug: "codex-session-visualizer",
    title: "Codex Session Visualizer",
    eyebrow: "AI developer tooling",
    period: "Jul 2026 - Present",
    status: "Extension",
    portfolioGroup: "featured",
    portfolioOrder: 2,
    url: null,
    repositoryUrl: null,
    media: "/videos/codex-session-preview.mp4",
    mediaWidth: 1348,
    mediaHeight: 980,
    thumbnail: "/images/codex-session-thumbnail.png",
    visual: "code",
    organization: "Independent developer tool",
    role: "Extension developer",
    schemaType: "SoftwareApplication",
    applicationCategory: "DeveloperApplication",
    softwareRequirements: "Visual Studio Code",
    seoTitle: "Codex Session Visualizer - AI Agent Logs | Deven Varu",
    seoDescription:
      "A VS Code extension that reconstructs Codex coding sessions into file activity, readable execution traces, and multi-agent workflow graphs.",
    summary:
      "AI developer tool for making Codex coding sessions inspectable by turning agent activity into file states, readable execution traces, and multi-agent workflow graphs.",
    caseStudySummary:
      "A VS Code extension that makes AI coding-agent behavior inspectable by reconstructing Codex sessions into file activity, execution traces, and multi-agent workflow graphs.",
    impact: [
      "Tracks how Codex interacts with a codebase using Create, Read, Update, Delete, and Found states directly in the VS Code file explorer.",
      "Transforms raw session data into readable traces of prompts, responses, tool calls, file operations, and execution flow.",
      "Visualizes parent and delegated sub-agent relationships, making multi-agent coding workflows easier to follow.",
    ],
    caseStudyImpact: [
      "Added file and folder activity states for Created, Read, Update, Deleted, and Found, making the agent's interaction with a repository visible directly inside VS Code.",
      "Built readable session traces covering prompts, responses, tool calls, file operations, and execution flow instead of requiring developers to inspect raw session logs.",
      "Reconstructed parent and sub-agent relationships to visualize how work is delegated across multi-agent Codex sessions.",
      "Combined repository activity, chronological execution, and agent hierarchy into a single debugging and inspection workflow.",
    ],
    stack: ["VS Code Extension API", "TypeScript", "AI Agent Observability", "Multi-agent Systems"],
    sections: [
      {
        heading: "Problem",
        body:
          "AI coding agents can make dozens of decisions during a single task: exploring directories, reading files, invoking tools, modifying code, running commands, and delegating work to other agents.\n\nThe final code diff shows what changed, but it does not explain how the agent arrived there.\n\nRaw session logs contain much of that information, but they are dense and difficult to follow. When multiple agents are involved, understanding which agent performed which work becomes even harder.\n\nCodex Session Visualizer turns that hidden execution history into something a developer can inspect directly inside the coding environment.",
      },
      {
        heading: "What I built",
        body:
          "I built a VS Code extension that transforms raw Codex session activity into three complementary views of agent behavior.",
        subsections: [
          {
            heading: "Repository activity",
            body:
              "Files and folders are labeled according to how the agent interacted with them:\n\nFound / Read / Edited / Created / Deleted\n\nThis provides a quick visual map of where the agent explored and where it actually made changes without requiring the developer to reconstruct that information from logs.",
          },
          {
            heading: "Session execution",
            body:
              "The extension parses raw Codex sessions into a readable chronological trace containing the agent's prompts, responses, tool usage, file operations, and execution flow.\n\nInstead of treating the session as an opaque request followed by a code diff, the developer can inspect the sequence of actions that produced the result.",
          },
          {
            heading: "Multi-agent workflows",
            body:
              "For sessions where Codex delegates work, the extension connects the main session with its sub-agent sessions in a graph.\n\nThis makes it possible to see where work was delegated, which agents participated, and how the overall session was structured.",
          },
        ],
      },
      {
        heading: "Technical decisions",
        body:
          "The extension deliberately presents the same coding session from three different levels of abstraction.\n\nFile activity answers:\n\nWhere did the agent work?\n\nSession traces answer:\n\nWhat did the agent do, and in what order?\n\nAgent graphs answer:\n\nWhich agent did the work, and how was it delegated?\n\nRather than building a single massive log viewer, I separated those concerns so developers can move from a quick repository-level signal to increasingly detailed execution information when they need it.\n\nThe underlying Codex session data remains the source of evidence; the extension's job is to transform that evidence into representations that are easier to inspect while working inside VS Code.",
      },
    ],
    related: ["codetown", "interview-with-ai", "a2a-multi-agent-builder"],
  },
  {
    id: "codetown",
    slug: "codetown",
    title: "CodeTown",
    eyebrow: "Code visualization developer tool",
    period: "Jul 2026 - Present",
    status: "In development",
    portfolioGroup: "featured",
    portfolioOrder: 3,
    url: null,
    repositoryUrl: null,
    media: "/videos/codetown-preview.mp4",
    mediaWidth: 1920,
    mediaHeight: 938,
    thumbnail: "/images/codetown-preview.png",
    visual: "code",
    organization: "Independent developer tool",
    role: "Extension developer",
    schemaType: "SoftwareApplication",
    applicationCategory: "DeveloperApplication",
    softwareRequirements: "Visual Studio Code",
    seoTitle: "CodeTown - VS Code Project Visualization | Deven Varu",
    seoDescription:
      "A VS Code extension that transforms JavaScript and TypeScript codebases into explorable 2D towns for understanding dependency structure.",
    summary:
      "VS Code developer tool that turns JavaScript and TypeScript codebases into interactive 2D towns, making dependency structure easier to understand before changing unfamiliar code.",
    caseStudySummary:
      "A VS Code extension that transforms JavaScript and TypeScript codebases into explorable 2D towns, making file dependencies and codebase structure easier to understand before making changes.",
    impact: [
      "Parses imports and exports into a dependency graph, representing files as buildings and groups of files as neighborhoods.",
      "Encodes dependency strength visually through the environment, with larger areas representing larger code groups and wider roads representing more connections between them.",
      "Lets developers explore large repositories through a navigable map, minimap, project overview, and direct links from buildings back to source files in VS Code.",
    ],
    caseStudyImpact: [
      "Parses project imports and exports into a dependency graph and transforms that graph into a spatial representation of the codebase.",
      "Represents files as buildings, groups of files as neighborhoods, and dependencies as roads, making relationships visible without tracing imports manually.",
      "Encodes dependency density into the visualization using single-, double-, and triple-lane roads based on the number of connections between areas of the codebase.",
      "Provides a navigable project map with a minimap, project/dependency overview, legend, and direct navigation from buildings to their corresponding source files in VS Code.",
    ],
    stack: ["VS Code Extension API", "JavaScript", "TypeScript", "Dependency Graphs", "Code Visualization"],
    sections: [
      {
        heading: "Problem",
        body:
          "Understanding an unfamiliar codebase usually starts with a folder tree, search, and repeatedly following imports from one file to another.\n\nThat works for individual files, but it becomes difficult to understand the larger structure of a project: which areas are tightly connected, which files belong to the same subsystem, and how far a change might propagate.\n\nFor example, before modifying authentication logic, a developer may need to determine which files participate in that subsystem and what other parts of the project depend on them.\n\nCodeTown turns those relationships into a spatial map so the structure can be understood visually before touching the code.",
      },
      {
        heading: "What I built",
        body:
          "CodeTown analyzes a JavaScript or TypeScript project and builds a dependency graph from its import and export relationships.\n\nThat graph is transformed into a top-down town:",
        items: [
          "Files become buildings.",
          "Groups of related files become neighborhoods.",
          "Import and export relationships become roads between areas.",
          "Larger groups of code occupy more space in the town.",
          "Stronger dependency relationships produce wider roads.",
          "Single-lane roads represent fewer than 10 connections.",
          "Double-lane roads represent 10-20 connections.",
          "Triple-lane roads represent more than 20 connections.",
        ],
      },
      {
        heading: "How it works",
        body: "When CodeTown is opened for a repository:",
        items: [
          "The extension scans the project's JavaScript and TypeScript files.",
          "It parses import and export relationships between those files.",
          "Those relationships are converted into a dependency graph.",
          "A layout algorithm determines how the resulting buildings, neighborhoods, and connections should be positioned in the 2D environment.",
          "Files are rendered as buildings and related groups of files form larger areas of the town.",
          "Dependency counts determine the visual strength of roads connecting those areas.",
          "The generated map can then be explored using the main town view, minimap, dependency information, and legend.",
          "Selecting a file in the visualization opens the corresponding source file inside VS Code.",
        ],
      },
      {
        heading: "Technical challenge",
        body:
          "The hardest part of CodeTown is not parsing imports. It is producing a layout that remains understandable as the dependency graph becomes more complicated.\n\nA codebase can contain many groups of files with relationships crossing between them. Simply drawing every connection produces a map that is technically accurate but difficult to read.\n\nThe layout therefore has to balance several competing goals: keeping related areas close together, leaving enough room for navigation, representing dependency relationships clearly, and preventing the generated town from becoming visually tangled as the project grows.\n\nDifferent repositories produce very different graph structures, so the layout system requires different parameters and positioning strategies rather than relying on one fixed arrangement.",
      },
      {
        heading: "Why a town?",
        body:
          "The town metaphor gives otherwise abstract dependency information a spatial representation.\n\nInstead of remembering that several files scattered across a repository are strongly connected, a developer can see them occupying the same neighborhood. Instead of counting import relationships, the road connecting two areas communicates how strongly those parts of the project depend on one another.\n\nThe goal is not to replace the source tree or code editor. CodeTown provides another level of abstraction for answering a different question:\n\nHow is this codebase connected?\n\nThat becomes especially useful before modifying an unfamiliar subsystem, where understanding the surrounding dependencies can help identify which parts of the repository are likely to be affected.",
      },
    ],
    related: ["codex-session-visualizer", "interview-with-ai", "a2a-multi-agent-builder"],
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
    mediaWidth: 1370,
    mediaHeight: 910,
    thumbnail: "/images/a2a-agent-builder-thumbnail.png",
    visual: "agents",
    organization: "Independent prototype",
    role: "Full-stack AI engineer",
    schemaType: "SoftwareApplication",
    applicationCategory: "DeveloperApplication",
    seoTitle: "A2A Multi-Agent Builder | Deven Varu",
    seoDescription:
      "A platform for dynamically creating, configuring, and orchestrating specialized multi-agent AI teams without hardcoding each workflow.",
    summary:
      "Multi-agent platform for dynamically assembling, configuring, and orchestrating specialized AI agent teams instead of hardcoding each workflow.",
    caseStudySummary:
      "A platform for dynamically creating, configuring, and orchestrating specialized multi-agent AI teams without hardcoding each agent workflow into the application.",
    impact: [
      "Built an agent factory that creates specialized teams at runtime from stored agent and prompt configurations.",
      "Supports parallel and sequential execution, shared context, and structured aggregation of agent responses.",
      "Added prompt and configuration versioning with rollback, backed by MongoDB Atlas.",
    ],
    caseStudyImpact: [
      "Built an agent factory that assembles specialized agent teams at runtime from stored configurations.",
      "Supported both parallel and sequential execution with structured aggregation of agent outputs.",
      "Centralized agent definitions, prompts, routing logic, and shared context instead of embedding them directly in application code.",
      "Added versioning and rollback for prompts and agent configurations using MongoDB Atlas.",
      "Stored execution information and configuration history to make agent behavior easier to inspect and reproduce.",
    ],
    stack: ["A2A", "TypeScript", "MongoDB Atlas", "Agent Orchestration", "Prompt Versioning"],
    sections: [
      {
        heading: "Problem",
        body:
          "Multi-agent systems become difficult to evolve when agent definitions, prompts, routing rules, and execution order are hardcoded directly into the application.\n\nAdding a new specialist can require changing orchestration code. Updating a prompt can change system behavior without an easy way to compare versions or roll back. Different workflows may also require different combinations of agents even when they share the same underlying infrastructure.\n\nI wanted to separate what an agent is from how the application is coded, so agent teams could be assembled and changed dynamically.",
      },
      {
        heading: "What I built",
        body:
          "I built a configuration-driven system for creating and running specialized groups of agents.\n\nThe core of the platform is an agent factory. Instead of defining every agent directly inside a workflow, the system loads agent configurations and prompts and assembles the required team at runtime.\n\nEach agent can have its own role, instructions, configuration, and place within the larger workflow.\n\nThe orchestration layer supports both:",
        items: [
          "Parallel execution, when multiple specialists can work independently.",
          "Sequential execution, when one agent's result becomes context for the next.",
        ],
        after:
          "Their outputs are then collected into structured responses for the calling workflow.\n\nMongoDB Atlas stores the system's prompts, agent configurations, routing information, shared context, execution data, and configuration history.",
      },
      {
        heading: "How it works",
        body: "A workflow begins by defining what kind of agent team it needs.",
        items: [
          "The system retrieves the relevant agent and prompt configurations.",
          "The agent factory creates the required specialized agents at runtime.",
          "The orchestration layer determines whether those agents should execute in parallel, sequentially, or through a combination of both.",
          "Agents receive the context required for their part of the task.",
          "Their responses are collected and normalized into structured results.",
          "Shared information can be passed between agents as the workflow progresses.",
          "Configuration and prompt versions are retained so changes can be tracked or rolled back.",
        ],
        after:
          "The result is an orchestration system where changing the composition or behavior of an agent team does not necessarily require rewriting the underlying workflow implementation.",
      },
      {
        heading: "Technical focus",
        body:
          "The main design decision was to treat agent behavior as configuration rather than application structure.\n\nThat meant separating several concerns:",
        subsections: [
          {
            heading: "Agent creation",
            body: "Which specialists should exist for this workflow?",
          },
          {
            heading: "Execution",
            body: "Which agents can run independently, and which depend on previous results?",
          },
          {
            heading: "Context",
            body: "What information needs to be shared between agents?",
          },
          {
            heading: "Configuration",
            body: "Which prompts, routing rules, and agent settings produced this behavior?",
          },
          {
            heading: "Versioning",
            body: "Can a previous working configuration be restored when a change performs worse?",
          },
        ],
        after:
          "That architecture made the system less about one specific multi-agent workflow and more about the infrastructure required to create different teams on top of the same orchestration layer.",
      },
    ],
    related: ["10-agent-board-game", "codex-session-visualizer", "interview-with-ai"],
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
    mediaWidth: 1920,
    mediaHeight: 1076,
    thumbnail: "/images/10-ai-agents-preview.png",
    visual: "board",
    organization: "Independent simulation",
    role: "Agent systems engineer",
    schemaType: "CreativeWork",
    seoTitle: "10-Agent AI Board Game Simulation | Deven Varu",
    seoDescription:
      "A hierarchical multi-agent simulation where autonomous AI characters coordinate through a shared game world and delegated sub-agents.",
    summary:
      "Hierarchical multi-agent simulation where autonomous characters delegate work to specialized agents while coordinating through a shared game world.",
    caseStudySummary:
      "A hierarchical multi-agent simulation where autonomous AI characters coordinate through a shared game world while delegating dialogue and actions to specialized sub-agents.",
    impact: [
      "Designed a hierarchy with one Dungeon Master, three player agents, and specialized dialogue and action sub-agents.",
      "Used structured JSON actions to turn agent decisions into movement, combat, dialogue, and changes to the game world.",
      "Maintained shared game state while each agent made independent, personality-driven decisions.",
    ],
    caseStudyImpact: [
      "Designed a 10-agent hierarchy consisting of one Dungeon Master, three player agents, and specialized dialogue and action sub-agents.",
      "Separated high-level character decisions from specialized execution, allowing player agents to delegate different kinds of behavior.",
      "Converted agent decisions into structured JSON commands for movement, dialogue, combat, and world actions.",
      "Maintained a shared game state while autonomous characters made independent decisions based on their roles and personalities.",
    ],
    stack: ["Multi-agent Systems", "Hierarchical Agents", "Agent Orchestration", "Structured JSON", "Simulation"],
    sections: [
      {
        heading: "Problem",
        body:
          "A multi-agent system becomes more interesting when agents are not simply generating independent responses.\n\nThey need to operate inside the same environment, reason from shared state, make their own decisions, delegate specialized work, and produce actions that another system can reliably execute.\n\nI used a board-game simulation as a controlled environment for exploring those problems.\n\nThe game provides clear state, rules, characters, movement, interactions, and consequences, making it possible to see how a hierarchy of agents behaves as the world changes.",
      },
      {
        heading: "System design",
        body:
          "The system is organized into multiple levels of responsibility.\n\nAt the top is a Dungeon Master agent, responsible for the overall game world and progression.\n\nThree autonomous player agents represent individual characters. Each player maintains its own personality and makes high-level decisions based on the current game state.\n\nThose player agents can delegate specific behavior to specialized sub-agents, including agents responsible for:",
        items: ["Dialogue", "Actions"],
        after:
          "This separates questions such as:\n\nWhat should my character do?\n\nfrom:\n\nHow should that decision be expressed or executed?\n\nThe complete hierarchy contains ten agents operating around the same game simulation.",
      },
      {
        heading: "What I built",
        body:
          "I built the orchestration and state system that allows these agents to participate in a shared world.\n\nPlayer agents receive relevant game state and determine what their character should do next.\n\nSpecialized sub-agents convert those intentions into dialogue or executable game actions.\n\nRather than allowing agents to return unrestricted text for gameplay decisions, actions are represented as structured JSON commands.\n\nThose commands can describe operations such as:",
        items: [
          "Movement",
          "Combat",
          "Dialogue",
          "Interactions",
          "Changes to the game world",
        ],
        after:
          "The simulation processes those actions and updates the shared state, which becomes context for the agents' next decisions.\n\nThis creates a loop:\n\nshared state -> agent decision -> delegated action -> structured command -> world update -> new shared state",
      },
      {
        heading: "Why hierarchical agents?",
        body:
          "I didn't want every agent responsible for every part of a character's behavior.\n\nThe player agent operates at a higher level: it decides what the character wants to do.\n\nSpecialized agents handle narrower responsibilities such as generating dialogue or expressing the chosen action in the format expected by the simulation.\n\nThat separation made the system useful for exploring a broader multi-agent design question:\n\nWhen should one general agent do everything, and when should responsibility be delegated to specialized agents?\n\nThe board game provides a visible demonstration of that architecture because the results of delegation immediately affect a shared environment.",
      },
      {
        heading: "Technical focus",
        body: "The main challenges were coordination, state, and reliable agent output.",
        subsections: [
          {
            heading: "Shared state",
            body:
              "Agents operate independently, but they cannot each have a different understanding of the game world. Actions therefore need to update a common state that subsequent decisions can use.",
          },
          {
            heading: "Delegation",
            body:
              "High-level player agents determine intent while specialized agents handle narrower behaviors, creating explicit parent/sub-agent relationships.",
          },
          {
            heading: "Structured actions",
            body:
              "Free-form model responses are not sufficient for operating a game engine. Agent decisions therefore need to become predictable structured commands that application logic can validate and execute.",
          },
        ],
        after:
          "Together, those pieces turn the project from a collection of AI characters into a functioning hierarchical multi-agent system.",
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
    media: "/videos/Pokemon-mixed-reality-preview.mp4",
    mediaWidth: 540,
    mediaHeight: 540,
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
    media: "/videos/VR-classroom-preview.mp4",
    mediaWidth: 1024,
    mediaHeight: 1024,
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
    media: "/videos/Quantum-viz-preview.mp4",
    mediaWidth: 1920,
    mediaHeight: 910,
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
    mediaWidth: 756,
    mediaHeight: 866,
    visual: "vision",
    organization: "University of San Francisco research",
    role: "Computer vision research assistant",
    schemaType: "CreativeWork",
    seoTitle: "Road Asset Detection with YOLO | Deven Varu",
    seoDescription:
      "A computer vision pipeline for detecting and mapping roadway infrastructure from stitched 360-degree imagery collected for Boone County.",
    summary:
      "Computer vision pipeline for detecting and mapping roadway infrastructure from stitched 360-degree imagery collected for Boone County.",
    caseStudySummary:
      "A computer vision pipeline for detecting and mapping roadway infrastructure from stitched 360-degree imagery collected for Boone County.",
    impact: [
      "Evaluated YOLO, LaneNet, and DINOv2 across a 7,650-image roadway dataset before building the final detection pipeline around YOLO.",
      "Trained models to distinguish visually similar assets including lane markings, shoulders, barriers, and streetlights.",
      "Built a 3D visualization and validation workflow for inspecting detections, reaching 92% mAP while reducing manual labeling work.",
    ],
    caseStudyImpact: [
      "Evaluated YOLO, LaneNet, and DINOv2 across a 7,650-image roadway dataset to determine the most effective approach for detecting road infrastructure.",
      "Trained YOLO models to distinguish visually similar assets including lane markings, shoulders, barriers, streetlights, and other roadway features.",
      "Built a 3D visualization and validation tool for inspecting detections in the context of the roadway rather than reviewing predictions as isolated images.",
      "Developed the resulting workflow to 92% mAP while reducing the amount of manual labeling required for roadway asset detection.",
    ],
    stack: ["Python", "YOLOv8", "Roboflow", "AWS", "Computer Vision"],
    caseStudyStack: ["Python", "YOLOv8", "Roboflow", "AWS", "React", "Computer Vision"],
    sections: [
      {
        heading: "Problem",
        body:
          "Boone County roadway imagery contains infrastructure that is useful for mapping and maintenance, but extracting those assets manually from thousands of stitched 360-degree images is expensive and time-consuming.\n\nThe computer vision problem is also more difficult than simply detecting visually distinct objects.\n\nMany roadway assets share similar shapes, colors, and surroundings. Lane markings, shoulders, barriers, and other infrastructure can appear differently depending on camera position, road geometry, lighting, distance, and image stitching.\n\nThe goal was to build a workflow that could identify these assets reliably enough to turn large collections of roadway imagery into usable infrastructure data.",
      },
      {
        heading: "What I built",
        body:
          "I worked on the computer vision pipeline from model evaluation through validation.\n\nThe project began by evaluating multiple approaches, including YOLO, LaneNet, and DINOv2, on a dataset containing 7,650 roadway images.\n\nBased on those experiments, the final detection workflow was built around YOLO, with models trained for multiple categories of road infrastructure.\n\nThe pipeline covered assets including:",
        items: [
          "Lane markings",
          "Shoulders",
          "Barriers",
          "Streetlights",
          "Other visually similar roadway features",
        ],
        after:
          "The work also extended beyond model training.\n\nI built a 3D visualization and validation tool that made it possible to inspect model detections in the context of the roadway and verify whether predicted infrastructure aligned with the underlying imagery.\n\nThat created a feedback loop between model predictions, human validation, and dataset improvement rather than treating model evaluation as a single offline metric.",
      },
      {
        heading: "How it works",
        body: "The workflow moves from raw roadway imagery to validated infrastructure detections.",
        items: [
          "Stitched 360-degree roadway imagery is prepared for the detection pipeline.",
          "Trained YOLO models identify relevant infrastructure within the images.",
          "Predictions are converted into structured detection results.",
          "Those results are surfaced through the validation tooling so detections can be inspected in context.",
          "Incorrect or uncertain detections can be identified and used to improve the dataset and subsequent model iterations.",
          "Validated detections can then be used as part of the roadway mapping workflow.",
        ],
        after:
          "This combination of model inference and validation tooling made the system more useful than a standalone object detector.",
      },
      {
        heading: "Technical challenge",
        body:
          "A major challenge was distinguishing between visually similar roadway classes.\n\nRoad infrastructure does not always have clean visual boundaries, and the same asset can look substantially different depending on viewing angle, road conditions, image stitching, and distance from the camera.\n\nThat made the work as much about dataset quality and validation as model architecture.\n\nEvaluating multiple model approaches helped determine which direction was most practical, while the validation workflow provided a way to inspect where the model was succeeding or failing rather than relying only on aggregate metrics.",
      },
      {
        heading: "Result",
        body:
          "The final workflow reached 92% mAP and reduced the amount of manual labeling required for roadway infrastructure detection.\n\nMore importantly, the project produced a complete workflow around the model:\n\nroadway imagery -> detection -> validation -> usable infrastructure data\n\nrather than stopping at a trained computer vision model.",
      },
    ],
    related: ["catalog-intelligence-automation", "interview-with-ai"],
  },
  {
    id: "catalog-intelligence-automation",
    slug: "catalog-intelligence-automation",
    title: "Catalog Intelligence Automation",
    eyebrow: "Applied AI automation",
    period: "Pistachio Internship",
    status: "Shipped internally",
    portfolioGroup: "ai-systems",
    portfolioOrder: 2,
    url: null,
    repositoryUrl: null,
    media: "/images/catalog-intelligence-automation-thumbnail.png",
    mediaWidth: 1459,
    mediaHeight: 778,
    visual: "catalog",
    organization: "Pistachio",
    role: "Software Engineer Intern",
    schemaType: "CreativeWork",
    seoTitle: "AI Catalog Intelligence Automation | Deven Varu",
    seoDescription:
      "An AI extraction pipeline that converts 20-200 page furniture catalogs into structured product records and linked product imagery.",
    summary:
      "AI extraction pipeline built during my Pistachio internship to turn 20-200 page furniture catalogs into structured product records and linked product imagery.",
    caseStudySummary:
      "An AI extraction pipeline built during my Pistachio internship to convert 20-200 page furniture catalogs into structured product records and linked product imagery.",
    impact: [
      "Led a three-person project team replacing hours of manual catalog entry with an automated extraction workflow.",
      "Evaluated Gemini, OpenAI, Claude, and OCR approaches before standardizing on OpenAI for more reliable structured JSON extraction.",
      "Added YOLO-based image detection to extract catalog visuals and associate them with the corresponding product records.",
    ],
    caseStudyImpact: [
      "Led a three-person project team replacing manual catalog data entry with an AI-assisted extraction workflow.",
      "Evaluated Gemini, OpenAI, Claude, and OCR-based approaches to determine which produced the most reliable structured product data.",
      "Standardized the extraction pipeline around OpenAI for structured JSON output.",
      "Added YOLO-based image detection to extract product visuals from catalog pages and associate them with the corresponding product records.",
      "Reduced supported catalog-processing workflows from hours of manual work to minutes.",
    ],
    stack: ["OpenAI", "OCR", "YOLO", "Python", "Structured Extraction"],
    caseStudyStack: ["OpenAI", "OCR", "YOLO", "Python", "Structured JSON Extraction"],
    sections: [
      {
        heading: "Problem",
        body:
          "Furniture catalogs can contain hundreds of products spread across 20-200 pages, with product names, descriptions, dimensions, identifiers, pricing, and images embedded in layouts designed for people rather than software.\n\nAt Pistachio, turning those catalogs into usable product data required substantial manual work.\n\nThe challenge was not simply extracting text from a PDF. The system needed to turn semi-structured catalog pages into consistent product records while also identifying the correct product imagery and connecting it back to the extracted data.",
      },
      {
        heading: "What I built",
        body:
          "During my Pistachio internship, I led a three-person team working on an automated catalog-ingestion pipeline.\n\nWe evaluated several approaches for extracting product information, including Gemini, OpenAI, Claude, and traditional OCR tools.\n\nThe goal was to determine which approach could most consistently take messy catalog content and return structured product information in a format the rest of the system could use.\n\nAfter testing the alternatives, we standardized the structured extraction workflow around OpenAI, which provided the most reliable JSON output for the supported catalogs.\n\nThe resulting pipeline converted catalog content into structured product records rather than leaving the output as raw OCR text.",
      },
      {
        heading: "Connecting product data with images",
        body:
          "Text extraction solved only part of the problem.\n\nFurniture catalogs are highly visual, and each structured product record also needed to be associated with the correct product imagery.\n\nI added a YOLO-based computer vision stage that detected and extracted product images from catalog pages.\n\nThose extracted visuals could then be connected with the corresponding structured product records produced by the extraction pipeline.\n\nThat made the workflow multimodal:\n\ncatalog PDF -> product information + product imagery -> structured product dataset\n\nrather than treating text and images as separate manual processes.",
      },
      {
        heading: "Technical approach",
        body:
          "The project involved combining multiple AI techniques instead of relying on a single model.",
        subsections: [
          {
            heading: "Document extraction",
            body:
              "OCR and LLM-based approaches were evaluated for turning semi-structured catalog pages into usable product information.",
          },
          {
            heading: "Structured output",
            body:
              "The extraction workflow produced JSON product records, allowing downstream systems to consume the result programmatically instead of requiring another manual cleanup step.",
          },
          {
            heading: "Computer vision",
            body: "YOLO was used to detect and extract product imagery from catalog pages.",
          },
          {
            heading: "Product association",
            body:
              "The final workflow brought the extracted data and imagery together so each product could be represented as a structured record with its associated visual assets.",
          },
        ],
        after:
          "The engineering challenge was therefore not simply \"run an LLM over a PDF.\" It was building a pipeline where several imperfect extraction steps produced a useful combined result.",
      },
      {
        heading: "Result",
        body:
          "For the supported internal workflow, the system reduced catalog-processing work from hours to minutes.\n\nMore importantly, it replaced a largely manual process with a repeatable AI pipeline:\n\nlarge catalog -> extraction -> structured JSON -> image detection -> linked product records\n\nThe project gave me experience evaluating competing AI approaches against a real business requirement rather than choosing a model based only on benchmark performance.",
      },
    ],
    related: ["road-asset-detection", "interview-with-ai", "a2a-multi-agent-builder"],
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
    mediaWidth: 732,
    mediaHeight: 860,
    visual: "geo",
    organization: "USF Innovation Summit",
    role: "Full-stack data visualization developer",
    schemaType: "SoftwareSourceCode",
    seoTitle: "Oakland Environmental Data Explorer | Deven Varu",
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
    mediaWidth: 756,
    mediaHeight: 866,
    visual: "rag",
    organization: "EBPREC",
    role: "Full-stack developer",
    schemaType: "WebApplication",
    applicationCategory: "CivicTechnology",
    seoTitle: "Here2Stay Civic Tech RAG Portal | Deven Varu",
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
    items: ["LLMs", "Multi-agent Orchestration", "A2A", "Voice AI", "Mastra", "RAG", "Structured Outputs"],
  },
  {
    name: "Software Engineering",
    items: ["TypeScript", "Python", "Java", "React", "Next.js", "NestJS", "Node.js", "VS Code Extension API"],
  },
  {
    name: "Machine Learning",
    items: ["YOLOv8", "PyTorch", "TensorFlow", "Scikit-Learn", "Computer Vision", "Pandas", "NumPy"],
  },
  {
    name: "Infrastructure",
    items: ["Docker", "AWS", "GCP", "MongoDB Atlas", "Supabase", "Railway"],
  },
];

export const awards = [
  "1st Place - Cisco HackAIThon",
  "Innovation Summit Award - Oakland Geospatial Analysis Platform",
  "1st Place - Sixth Annual Sustainability Design Challenge",
];
