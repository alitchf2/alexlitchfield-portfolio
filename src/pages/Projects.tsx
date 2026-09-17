import { projectsData } from "../data/projectsData";

export default function Projects() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
            <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-brand-amber pb-8 gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-brand-navy tracking-tight">Projects</h1>
                    <p className="text-brand-amber mt-1 font-medium">Take a look at some of my work.</p>
                </div>
            </header>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectsData.map((project) => (
                    <div key={project.slug} className="bg-brand-cream/80 border border-brand-navy rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                        <img src={project.thumbnailUrl} alt={`${project.title} thumbnail`} className="w-full h-48 object-cover rounded-lg mb-4" />
                        <h2 className="text-xl font-bold text-brand-blue">{project.title}</h2>
                        <p className="text-brand-amber">{project.course}</p>
                        <p className="text-sm text-brand-navy mt-1">{project.shortDescription}</p>
                        <div className="mt-4">
                            <p className="text-xs font-bold text-brand-navy border-b border-brand-amber uppercase tracking-wider mb-2">
                                Tools &amp; Skills
                            </p>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {project.toolsAndLanguages.map((tool) => (
                                    <span key={tool} className="text-xs font-semibold text-brand-blue bg-brand-amber/20 px-2 py-1 rounded">
                                        {tool}
                                    </span>
                                ))}
                            </div>
                            {project.githubUrl && (
                                <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 text-sm font-semibold text-brand-blue hover:text-brand-sky inline-flex items-center gap-1"
                                >
                                View GitHub Repo &rarr;
                                </a>
                                )}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}