import { Link } from "react-router-dom";
import { ResumeEducation } from "../../data/resumeEducation";
import { ResumeSkills } from "../../data/resumeSkills";
import { ResumeWorkExperience } from "../../data/resumeWorkExperience";

export default function ResumePreview() {
  const primaryEducation = ResumeEducation[0];
  const primaryWork = ResumeWorkExperience[0];
  const previewSkills = ResumeSkills.slice(0, 8);

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
    <section className="w-full bg-brand-blue border-b border-brand-sand/60 py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Master Card Wrapper */}
        <div className="bg-brand-light border border-brand-navy rounded-xl p-6 md:p-8 shadow-sm space-y-6">
          {/* Header inside the Master Card */}
          <div className="flex items-center justify-between border-b border-brand-amber pb-3">
            <div>
              <h2 className="text-2xl font-bold text-brand-navy">Resume Preview</h2>
              <p className="text-xs text-brand-amber mt-0.5 font-medium">
                High-level overview of background, technical stack, and roles
              </p>
            </div>
            <Link
              to="/resume"
              className="text-sm font-semibold text-brand-blue hover:text-brand-sky transition-colors"
            >
              To Full Resume &rarr;
            </Link>
          </div>

          {/* 3 Horizontal Sub-Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sub-Card 1: Education */}
            <div className="flex flex-col h-full bg-brand-cream/80 border border-brand-navy rounded-lg p-5 shadow-xs">
              <span className="text-xs font-bold text-brand-navy uppercase tracking-wider border-b border-brand-amber pb-2 mb-2">
                Education
              </span>
              {primaryEducation && (
                <div className="flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-base font-bold text-brand-blue">
                      {primaryEducation.school}
                    </h3>
                    <p className="text-xs text-brand-amber font-medium mb-2">
                      {primaryEducation.dates} • {primaryEducation.location}
                    </p>
                    <p className="text-sm font-semibold text-brand-navy">
                      {primaryEducation.degree} in {primaryEducation.Major}
                    </p>
                    {primaryEducation.Concentration && (
                      <p className="text-xs text-brand-navy/80 mt-1">
                        Concentration: {primaryEducation.Concentration}
                      </p>
                    )}
                    <p className="text-xs font-semibold text-brand-navy mt-1">
                      GPA: <span className="font-normal">{primaryEducation.GPA}</span>
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Sub-Card 2: Core Skills */}
            <div className="flex flex-col h-full bg-brand-cream/80 border border-brand-navy rounded-lg p-5 shadow-xs">
              <span className="text-xs font-bold text-brand-navy uppercase tracking-wider border-b border-brand-amber pb-2 mb-2">
                Core Skills
              </span>
              <div className="flex flex-wrap gap-1.5 flex-grow content-start">
                {previewSkills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getBadgeStyle(
                      skill.category
                    )}`}
                  >
                    {skill.name}
                  </span>
                ))}
                <Link
                to="/resume"
                className="text-sm text-brand-navy hover:text-brand-sky transition-colors"
                >
                and more...
                </Link>
              </div>
            </div>

            {/* Sub-Card 3: Work Experience */}
            <div className="flex flex-col h-full bg-brand-cream/80 border border-brand-navy rounded-lg p-5 shadow-xs">
              <span className="text-xs font-bold text-brand-navy uppercase tracking-wider border-b border-brand-amber pb-2 mb-2">
                Work Experience
              </span>
              {primaryWork && (
                <div className="flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-base font-bold text-brand-blue">
                      {primaryWork.title}
                    </h3>
                    <p className="text-xs text-brand-amber font-medium mb-2">
                      {primaryWork.dates} • {primaryWork.location}
                    </p>
                    <p className="text-sm font-semibold text-brand-navy mb-2">
                      {primaryWork.organization}
                    </p>
                    <p className="text-xs text-brand-navy/90 line-clamp-3">
                      {primaryWork.bullets[0]}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}