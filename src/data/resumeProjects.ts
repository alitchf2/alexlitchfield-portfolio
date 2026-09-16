interface ResumeProjects {
    title: string;
    course?: string;
    description: string;
    bullets: string[];
    imageUrl?: string[];
    projectSlug?: string; //For linking to projects page
    githubUrl?: string; //For linking to github repo
}

export const ResumeProjects = [
    {
        title: "Colorfind by ASARA",
        course: "Software Design Projects",
        description: "A full-stack serverless mobile application providing precision color identification and comparison.",
        bullets: [
            "Architected a unified cross-platform codebase for IOS and Android using React Native and TypeScript.",
            "Structured a secure cloud-native backend using AWS Amplify, Cognito, DynamoDB, and Amazon S3.",
            "Developed engines for color conversions (sRGB -> CIELAB) and comparisons (with CIE2000 DeltaE).",
            "Reduced latency and computing costs by implementing client-side image compression and async uploads."
        ],
        githubUrl: "https://github.com/alitchf2/ASARA",
    },
    {
        title: "Pizza-API",
        course: "Software Engineering",
        description: "An API that allows for menu management, taking and paying for orders, automatic database setup, and more.",
        bullets: [
            "Designed and developed an API using FastAPI (Python) with a MySQL database.",
            "Engineered a modular architecture with clear separation of routers, controllers, schemas, and models.",
            "Created CRUD operations for core entities with validation, error handling, and SQLAlchemy integration.",
            "Worked with a team utilizing an Agile workflow and sprints to create a product with documentation."
        ],
        githubUrl: "https://github.com/alitchf2/Resume-Projects/tree/main/Pizza-API",
    },
    {
        title: "The Dusty Bottle",
        course: "Intro to Game Design and Development",
        description: "A game where players play as a Wild-West bar owner serving drinks to NPCs to be able to pay rent by weeks end.",
        bullets: [
            "Engineered the core game loop for a narrative-driven resource management game in GameMaker Studio.",
            "Implemented an NPC system that used weighted random selection to create a unique gameplay experience.",
            "Designed a state machine to manage phases of gameplay enabling smooth transitions between game modes.",
            "Developed an interactive game system including a dialogue manager, selection interface, and cheat codes."
        ],
        githubUrl: "https://github.com/alitchf2/Resume-Projects/tree/main/The-Dusty-Bottle",
    },
]