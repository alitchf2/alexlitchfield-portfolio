export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      {/* Page Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-brand-amber pb-8 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-brand-navy tracking-tight">
            About Me
          </h1>
          <p className="text-brand-amber mt-1 font-medium">
            Background, software journey, and what drives my work.
          </p>
        </div>
      </header>

      {/* Main Content Layout (Responsive 2-Column Split) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Photo & Quick Contact Links */}
        <aside className="md:col-span-5 space-y-6">
          <div className="bg-brand-cream/80 border border-brand-navy rounded-xl p-6 shadow-sm flex flex-col items-center text-center">
            {/* Profile Photo Placeholder */}
            <img
              src="/aboutImg/profile.png"
              alt="Alex Litchfield"
              className="w-48 rounded-xl border border-brand-navy/30 mb-4"
              onError={(e) => {
                // Graceful fallback display if image is not yet placed in public/aboutImg
                (e.target as HTMLElement).style.display = "none";
              }}
            />

            <h2 className="text-xl font-bold text-brand-blue">Alex Litchfield</h2>
            <p className="text-xs font-semibold text-brand-amber mt-0.5">
              Software Engineer • Charlotte, NC
            </p>

            {/* Quick Contact & Social Links <div className="w-full pt-4 mt-4 border-t border-brand-sand/60 space-y-2.5 flex justify-center">*/}
            
            <div className="w-full pt-4 mt-4 border-t border-brand-amber flex items-center justify-center gap-4 mt-1">

                {/* GitHub Circle */}
                <a
                  href="https://github.com/alitchf2"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="w-10 h-10 rounded-full bg-brand-light border border-brand-navy hover:bg-brand-gold hover:border-brand-navy text-brand-navy hover:text-brand-blue flex items-center justify-center transition-all shadow-xs"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>

                {/* LinkedIn Circle */}
                <a
                  href="https://linkedin.com/in/alitchfield15"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="w-10 h-10 rounded-full bg-brand-light border border-brand-navy hover:bg-brand-gold hover:border-brand-navy text-brand-navy hover:text-brand-blue flex items-center justify-center transition-all shadow-xs"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.3a1.64 1.64 0 0 0-1.66 1.63 1.64 1.64 0 0 0 1.66 1.63 1.63 1.63 0 0 0 1.64-1.63c0-.9-.74-1.63-1.64-1.63Z" />
                  </svg>
                </a>
              </div>
          </div>
        </aside>

        {/* Right Column: Bio Narrative Paragraphs */}
        <section className="md:col-span-7 bg-brand-cream/80 border border-brand-navy rounded-xl p-6 md:p-8 shadow-sm space-y-6 text-brand-navy leading-relaxed text-sm">
          <div>
            <h2 className="text-xl font-bold text-brand-blue mb-3 border-b border-brand-amber pb-2">
              Background &amp; Philosophy
            </h2>
            <p className="mb-3">
              [Introduce your background here: e.g., Computer Science student at UNC Charlotte with a concentration in Software Engineering and minor in Computer Engineering. Explain what first sparked your curiosity in programming.]
            </p>
            <p>
              [Discuss what problems you enjoy solving: e.g., bridging complex systems, building responsive user interfaces, and organizing full-stack architectures that scale.]
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-blue mb-3 border-b border-brand-amber pb-2">
              Engineering Focus
            </h2>
            <p className="mb-3">
              My passion is centered on building modern web applications, scalable cloud infrastructure, and data-driven systems.
              On the frontend, I specialize in crafting responsive, strictly typed interfaces with React, React Native, TypeScript, and Tailwind CSS. 
              To me, user interface design is never just about aesthetics—it directly drives the user experience. 
              I view the UI as a path: when it is built with intention and clarity, users reach their goals seamlessly without ever needing to search for a shortcut.
              Behind the scenes, I architect decoupled backends—ranging from serverless Python services powered by FastAPI, MySQL, and AWS 
              to enterprise Node.js microservices built with NestJS, Prisma, and PostgreSQL. 
              Whether designing high-performance relational schemas, implementing custom game loops in GameMaker Studio, 
              or configuring AWS cloud hosting (S3, CloudFront, Route 53, and Lambda), my focus is on building systems that are modular, fast, and engineered to scale.
            </p>
            <p>
              [Mention practical workflows: e.g., applying strict type safety, automating deployments via GitHub Actions CI/CD pipelines, and writing maintainable code.]
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-blue mb-3 border-b border-brand-amber pb-2">
              Outside of Development
            </h2>
            <p>
              [Add a personal note to highlight personality: e.g., involvement in music/drumline section leadership, game design experiments, or personal interests.]
            </p>
          </div>
        </section>
      </div>

      {/* Note: v3.2 Contact Form will be embedded here */}
    </div>
  );
}