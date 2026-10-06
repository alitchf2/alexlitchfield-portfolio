import { Link } from "react-router-dom";
import { projectsData } from "../../data/projectsData";

export default function ProjectsPreview() {
  // Cap to the first 5 projects as specified in PDR v2.2
  const previewProjects = projectsData.slice(0, 3);

  return (
    <section className="w-full bg-brand-gold border-b py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Master Card Container */}
        <div className="bg-brand-light border border-brand-navy rounded-xl p-6 md:p-8 shadow-sm space-y-6">
          {/* Header inside the Master Card */}
          <div className="flex items-center justify-between border-b border-brand-amber pb-3">
            <div>
              <h2 className="text-2xl font-bold text-brand-navy">Projects Preview</h2>
              <p className="text-xs text-brand-amber mt-0.5 font-medium">
                Featured software engineering and cloud systems
              </p>
            </div>
            <Link
              to="/projects"
              className="text-sm font-semibold text-brand-blue hover:text-brand-sky transition-colors"
            >
              View all projects &rarr;
            </Link>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {previewProjects.map((project) => (
              <div
                key={project.slug}
                className="flex flex-col h-full bg-brand-cream/80 border border-brand-navy rounded-xl p-5 shadow-xs"
              >
                <img
                  src={project.thumbnailUrl}
                  alt={`${project.title} thumbnail`}
                  className="w-full h-40 object-cover rounded-lg mb-3 border border-brand-navy/20"
                />

                <div className="mb-2">
                  <h3 className="text-lg font-bold text-brand-blue">
                    {project.title}
                  </h3>
                  {project.course && (
                    <p className="text-xs font-semibold text-brand-amber mt-0.5">
                      {project.course}
                    </p>
                  )}
                </div>

                <p className="text-xs text-brand-navy/90 mb-4 flex-grow line-clamp-3">
                  {project.shortDescription}
                </p>

                {/* Tools & Skills Pills */}
                <div className="pt-2 border-t border-brand-sand/60">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.toolsAndLanguages.slice(0, 3).map((tool) => (
                      <span
                        key={tool}
                        className="text-[11px] font-medium text-brand-navy bg-brand-sand/40 border border-brand-sand px-2 py-0.5 rounded-md"
                      >
                        {tool}
                      </span>
                    ))}
                    {project.toolsAndLanguages.length > 3 && (
                      <span className="text-[11px] text-brand-earth self-center">
                        +{project.toolsAndLanguages.length - 3} more
                      </span>
                    )}
                  </div>

                  {project.githubUrl && (
                    <div className="mt-auto pt-1">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-brand-blue hover:text-brand-sky inline-flex items-center gap-1 transition-colors"
                      >
                        View Repo &rarr;
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}