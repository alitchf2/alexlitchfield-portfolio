export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section 
        className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center bg-cover bg-center bg-no-repeat px-4"
        style={{ backgroundImage: "url('logoFullImg.jpg')" }}
      >
        {/* Darkening/Tinting Overlay to keep text readable */}
        <div className="absolute inset-0 bg-brand-navy/45 backdrop-blur-[2px]" />

        {/* Content Box */}
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-light tracking-tight">
            Welcome to alexlitchfield.com
          </h1>
          <p className="text-lg sm:text-xl text-brand-amber font-medium">
            Aspiring Software Engineer • Developer • Problem Solver
          </p>
          <p className="text-base text-brand-light max-w-xl mx-auto">
            Explore my portfolio to see my projects and experiences. Updates are being made regularly, so check back often for new content and insights into my work. 
          </p>
        </div>
      </section>

      {/* Future Content Blocks will go directly below this section */}
    </div>
  );
}