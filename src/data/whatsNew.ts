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