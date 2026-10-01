export interface WhatsNewEntry {
    slug: string;
    title: string;
    summary: string;
    imageUrl: string;
    date: string;
    targetRoute: string;
}

export const whatsNewData: WhatsNewEntry[] = [
    {
        slug: "projects-page-launch",
        title: "Projects Page Launch",
        summary:
        "There is now a gallery where you can view my projects and see what tools and technologies I've used to create them.",
        imageUrl: "/whatsNewImg/projects-page-launch.png",
        date: "2026-09-25",
        targetRoute: "/projects",
    },
    {
        slug: "resume-page-launch",
        title: "Resume Page Launch",
        summary:
        "Now you can view my resume complete with educational background, technical skills, projects, work experience, and more.",
        imageUrl: "/whatsNewImg/resume-page-launch.png",
        date: "2026-09-21",
        targetRoute: "/resume",
    },
    {
        slug: "mvp-launch",
        title: "alexlitchfield.com MVP Launch",
        summary: "alexlitchfield.com has launched its MVP using AWS hosting and a React & Tailwind CSS stack.",
        imageUrl: "/whatsNewImg/mvp-launch.png",
        date: "2026-09-17",
        targetRoute: "/",
    }
];

export function getLatestUpdate(): WhatsNewEntry | undefined {
    if (whatsNewData.length === 0) {
        return undefined;
    }

    //This avoids mutating the original array
    const sorted = [...whatsNewData].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return sorted[0];
}