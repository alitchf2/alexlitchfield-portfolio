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
        slug: "mvp-launch",
        title: "alexlitchfield.com MVP Launch",
        summary: "alexlitchfield.com has launched its MVP using AWS hosting and a React & Tailwind CSS stack.",
        imageUrl: "/whatsNewImg/mvp-launch.png",
        date: "2026-9-17",
        targetRoute: "/home",
    }
];