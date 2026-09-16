interface ResumeEducation {
    school: string;
    location: string;
    dates: string;
    degree?: string;
    Major?: string;
    Concentration?: string;
    Minor?: string;
    GPA?: string;
    Honors?: string[];
    imageUrl?: string[];
}

export const ResumeEducation = [
    {
        school: "University of North Carolina at Charlotte",
        location: "Charlotte, NC",
        dates: "August 2022 - May 2026",
        degree: "Bachelors of Science",
        Major: "Computer Science",
        Concentration: "Software Engineering",
        Minor: "Computer Engineering",
        GPA: "3.81",
        Honors: [
            "Chancellor's List (Fall 2022 & 23, Spring 2024, 25, & 26)",
            "Dean’s List (Spring 2023, Fall 2024 & 2025)"
        ],
    }
]