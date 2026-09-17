interface ResumeSkills {
    name: string;
    category: 'language' | 'framework' | 'tool' | 'database' | 'other';
    proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    usedInProjects?: string[]; // Optional field to list projects where the skill was used
}

export const ResumeSkills = [
    { name: 'React Native', category: 'framework', proficiency: 'advanced' },
    { name: 'Java', category: 'language', proficiency: 'advanced' },
    { name: 'Python', category: 'language', proficiency: 'advanced' },
    { name: 'C++', category: 'language', proficiency: 'intermediate' },
    { name: 'GameMaker Studio', category: 'tool', proficiency: 'intermediate' },
    { name: 'C', category: 'language', proficiency: 'intermediate' },
    { name: 'HTML', category: 'language', proficiency: 'advanced' },
    { name: 'CSS', category: 'language', proficiency: 'advanced' },
    { name: 'JSON', category: 'language', proficiency: 'advanced' },
    { name: 'VSCode', category: 'tool', proficiency: 'advanced' },
    { name: 'Unity', category: 'tool', proficiency: 'intermediate' },
    { name: 'MySQL', category: 'database', proficiency: 'intermediate' },
    { name: 'FastAPI', category: 'framework', proficiency: 'intermediate' },
    { name: 'RARS', category: 'tool', proficiency: 'intermediate' },
    { name: 'GitHub', category: 'tool', proficiency: 'advanced' },
    { name: 'AWS Cognito', category: 'tool', proficiency: 'intermediate' },
    { name: 'AWS DynamoDB', category: 'database', proficiency: 'intermediate' },
    { name: 'AWS Amplify', category: 'tool', proficiency: 'beginner' },
    { name: 'AWS S3', category: 'tool', proficiency: 'intermediate' },
    { name: 'AWS Route 53', category: 'tool', proficiency: 'intermediate' },
    { name: 'Google Firebase', category: 'tool', proficiency: 'intermediate' },
    { name: 'Android Studio', category: 'tool', proficiency: 'advanced' },
    { name: 'TypeScript', category: 'language', proficiency: 'intermediate' },
    { name: 'Agile Workflow', category: 'other', proficiency: 'intermediate' },
] as const satisfies readonly ResumeSkills[];

export type SkillName = typeof ResumeSkills[number]['name'];