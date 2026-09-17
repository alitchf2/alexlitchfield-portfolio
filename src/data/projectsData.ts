import type { SkillName } from "./resumeSkills";

export interface ProjectItem {
  slug: string; // Unique URL identifier: e.g. "action-figure-application"
  title: string;
  course?: string; // Course name or "Personal Project"
  shortDescription: string; // Summary shown on the card
  fullDescription: string; // Used on the detail page later
  thumbnailUrl: string; // Path inside public/ or remote URL
  imagesUrls?: string[]; // Optional array of additional images for the project
  githubUrl?: string;
  liveUrl?: string; // App link if runnable
  toolsAndLanguages: SkillName[]; //Direct reference to skills in ResumeSkills.ts
  features: string[]; // Bullet points for deep dive
}

export const projectsData: ProjectItem[] = [
  {
    slug: "colorfind",
    title: "Colorfind by ASARA",
    course: "Software Design Projects",
    shortDescription: "A full-stack serverless mobile application providing precision color identification and comparison.",
    fullDescription: "This will be done later, but for now, this is a full-stack serverless mobile application providing precision color identification and comparison.",
    thumbnailUrl: "/colorFindByASARALogo.png",
    githubUrl: "https://github.com/alitchf2/ASARA",
    toolsAndLanguages: ["React Native", "AWS Amplify", "AWS Cognito", "AWS DynamoDB", "AWS S3", "TypeScript", "Agile Workflow"],
    features: [
      "Architected a unified cross-platform codebase for iOS and Android.",
      "Structured a cloud-native backend using AWS Cognito authentication and DynamoDB NoSQL storage.",
      "Engineered mathematical conversion engines from sRGB to CIELAB and DeltaE 2000 color delta comparisons.",
      "Implemented client-side image compression reducing S3 upload latency.",
    ],
  },
  {
    slug: "pizza-api",
    title: "Pizza-API",
    course: "Software Engineering",
    shortDescription: "A RESTful ordering API with menu management, payment workflows, and automated database migrations.",
    fullDescription: "This will be done later, but for now, this is a RESTful ordering API with menu management, payment workflows, and automated database migrations.",
    thumbnailUrl: "/pizzaAPILogo.png",
    githubUrl: "https://github.com/alitchf2/Resume-Projects/tree/main/Pizza-API",
    toolsAndLanguages: ["Python", "FastAPI", "MySQL", "Agile Workflow"],
    features: [
      "Designed and developed a RESTful API using FastAPI with a MySQL relational database.",
      "Engineered modular separation across routers, controllers, schemas, and ORM models.",
      "Implemented full CRUD validation pipelines using Pydantic schemas.",
      "Executed project cycles using Agile sprint methodologies and OpenAPI documentation.",
    ],
  },
  {
    slug: "dp-bowling-webpage",
    title: "DP Bowling Webpage",
    course: "Web-Based Application Design and Development",
    shortDescription: "A webpage for a client named David Painter trying to promote his brand DP Bowling.",
    fullDescription: "This will be done later, but for now, this is a webpage for a client named David Painter trying to promote his brand DP Bowling.",
    thumbnailUrl: "/dpBowlingLogo.png",
    githubUrl: "https://github.com/alitchf2/DP-Bowling-Webpage",
    toolsAndLanguages: ["HTML", "CSS", "JSON"],
    features: [
        "Designed and developed a responsive webpage using HTML and CSS.",
        "Implemented a JSON-based content management system for easy updates.",
        "Optimized webpage performance and load times through efficient coding practices.",
    ],
  },
  {
    slug: "the-dusty-bottle",
    title: "The Dusty Bottle",
    course: "Intro to Game Design and Development",
    shortDescription: "A narrative-driven Western resource management game featuring dynamic NPC interaction loops.",
    fullDescription: "This will be done later, but for now, this is a narrative-driven Western resource management game featuring dynamic NPC interaction loops.",
    thumbnailUrl: "/theDustyBottleHome.png",
    githubUrl: "https://github.com/alitchf2/Resume-Projects/tree/main/The-Dusty-Bottle",
    toolsAndLanguages: ["GameMaker Studio"],
    features: [
      "Engineered core game loops for narrative progression and resource budgeting.",
      "Implemented weighted random selection algorithms generating varied NPC dialogue encounters.",
      "Built a state machine coordinating transitions between dialogue mode and tavern operations.",
    ],
  },
];