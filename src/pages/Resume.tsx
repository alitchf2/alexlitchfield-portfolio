import { ResumeEducation } from "../data/resumeEducation";
import { ResumeSkills } from "../data/resumeSkills";
import { ResumeProjects } from "../data/resumeProjects";
import { ResumeWorkExperience } from "../data/resumeWorkExperience";

export default function Resume() {
    const getBadgeStyle = (category: string) => {
        switch (category) {
        case "language":
            return "bg-brand-gold/30 text-brand-navy border-brand-ochre/40";
        case "framework":
            return "bg-brand-sky/20 text-brand-blue border-brand-sky/40";
        case "database":
            return "bg-brand-amber/25 text-brand-navy border-brand-ochre/50";
        default:
            return "bg-brand-sand/40 text-brand-navy border-brand-sand";
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
            <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-brand-amber pb-8 gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-brand-navy tracking-tight">Alex Litchfield</h1>
                    <p className="text-brand-amber mt-1 font-medium">Software Engineer • Charlotte, NC</p>
                </div>
                <div>
                    <a
                        href="/AlexLitchfieldResume.pdf"
                        download
                        className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-brand-blue text-brand-light font-semibold shadow-sm hover:bg-brand-sky hover:text-white transition-all"
                    >
                        Download Resume (PDF)
                    </a>
                </div>
            </header>

            {/* Education */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-brand-navy border-b border-brand-amber pb-2">Education</h2>
                {ResumeEducation.map((edu) => (
                <div key={edu.school} className="bg-brand-cream/80 border border-brand-navy rounded-xl p-6 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                    <h3 className="text-xl font-bold text-brand-blue">{edu.school}</h3>
                    <span className="text-sm font-medium text-brand-amber">{edu.dates}</span>
                    </div>
                    <p className="text-sm text-brand-amber font-medium mb-3">{edu.location}</p>
                    <p className="text-brand-navy">
                    <span className="font-semibold">{edu.degree} in {edu.Major}</span>
                    {" "}(Concentration: {edu.Concentration}, Minor: {edu.Minor})
                    </p>
                    <p className="text-sm font-semibold text-brand-navy mt-1">GPA: <span className="font-normal">{edu.GPA}</span></p>
                    {edu.Honors && (
                    <ul className="mt-3 list-disc list-inside space-y-1 text-sm text-brand-navy/90">
                        {edu.Honors.map((honor, idx) => (
                        <li key={idx}>{honor}</li>
                        ))}
                    </ul>
                    )}
                </div>
                ))}
            </section>

            {/* Technical Skills Section */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-brand-navy border-b border-brand-amber pb-2">Technical Skills</h2>
                <div className="flex flex-wrap gap-2">
                {ResumeSkills.map((skill) => (
                    <span
                    key={skill.name}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${getBadgeStyle(skill.category)}`}
                    >
                    {skill.name}
                    </span>
                ))}
                </div>
            </section>

            {/* Featured Projects Section */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-brand-navy border-b border-brand-amber pb-2">Projects</h2>
                <div className="space-y-6">
                {ResumeProjects.map((project) => (
                    <article key={project.title} className="bg-brand-cream/80 border border-brand-navy rounded-xl p-6 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                        <h3 className="text-xl font-bold text-brand-blue">{project.title}</h3>
                        {project.course && <span className="text-sm font-semibold text-brand-amber">{project.course}</span>}
                    </div>
                    <p className="text-brand-amber mb-4">{project.description}</p>
                    <ul className="list-disc list-inside space-y-1.5 text-sm text-brand-navy mb-4">
                        {project.bullets.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                        ))}
                    </ul>
                    {project.githubUrl && (
                        <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-brand-blue hover:text-brand-sky inline-flex items-center gap-1"
                        >
                        View GitHub Repo &rarr;
                        </a>
                    )}
                    </article>
                ))}
                </div>
            </section>

            {/* Work Experience Section */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-brand-navy border-b border-brand-amber pb-2">Work Experience</h2>
                <div className="space-y-6">
                {ResumeWorkExperience.map((job) => (
                    <article key={`${job.organization}-${job.title}`} className="bg-brand-cream/80 border border-brand-navy rounded-xl p-6 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                        <h3 className="text-xl font-bold text-brand-blue">{job.title}</h3>
                        <span className="text-sm font-medium text-brand-amber">{job.dates}</span>
                    </div>
                    <p className="text-sm font-semibold text-brand-amber mb-3">{job.organization} — {job.location}</p>
                    <ul className="list-disc list-inside space-y-1.5 text-sm text-brand-navy">
                        {job.bullets.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                        ))}
                    </ul>
                    </article>
                ))}
                </div>
            </section>

            {/* Organizational Achievements Section */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-brand-navy border-b border-brand-amber pb-2">Organizational Achievements</h2>
                <div className="bg-brand-cream/80 border border-brand-navy rounded-xl p-6 shadow-sm">
                <ul className="list-disc list-inside space-y-2 text-sm text-brand-navy">
                    <li>Achieved the rank of Eagle Scout (Sep 2021)</li>
                    <li>Member, and Section Leader (2025), in the UNCC PNNMB Drumline (Aug 2024 – May 2026)</li>
                    <li>Member and Section Leader (Jan 2023 – May 2026) in the UNCC Symph Band Perc Sect (Aug 2022 – May 2026)</li>
                    <li>TSSAA Bowling Individual State Qualifier (Jan 2022)</li>
                    <li>Jessica Colter Memorial Scholarship Foundation Social Media Manager (Jul 2025 – Aug 2025)</li>
                </ul>
                </div>
            </section>
        </div>
    );
}