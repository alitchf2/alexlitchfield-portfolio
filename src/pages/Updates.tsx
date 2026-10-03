import { Link } from "react-router-dom";
import { whatsNewData } from "../data/whatsNew";

export default function Updates() {
  // Sort descending: newest first
  const sortedUpdates = [...whatsNewData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <header className="border-b border-brand-amber pb-6">
        <h1 className="text-4xl font-extrabold text-brand-navy tracking-tight">
          All Updates
        </h1>
        <p className="text-brand-amber mt-1 font-medium">
          A full log of features, releases, and milestones for alexlitchfield.com.
        </p>
      </header>

      {/* Updates Feed */}
      <div className="space-y-6">
        {sortedUpdates.map((item) => (
          <article
            key={item.slug}
            className="bg-brand-cream/80 border border-brand-navy rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-6 items-center"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full md:w-56 h-40 object-cover rounded-lg border border-brand-navy/20 flex-shrink-0"
            />

            <div className="flex flex-col justify-between flex-grow space-y-3 w-full">
              <div>
                <span className="text-xs font-semibold text-brand-amber uppercase tracking-wider">
                  {item.date}
                </span>
                <h2 className="text-xl font-bold text-brand-blue mt-1">
                  {item.title}
                </h2>
                <p className="text-sm text-brand-navy/90 mt-2">
                  {item.summary}
                </p>
              </div>

              <div>
                <Link
                  to={item.targetRoute}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue hover:text-brand-sky transition-colors"
                >
                  Explore &rarr;
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}