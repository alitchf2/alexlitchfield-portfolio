import { Link } from "react-router-dom";
import { getLatestUpdate } from "../../data/whatsNew";

export default function WhatsNewHighlight() {
  const latest = getLatestUpdate();

  if (!latest) {
    return null;
  }

  return (
    <section className="w-full bg-brand-amber/90 py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Master Card with Header Inside */}
        <div className="bg-brand-light border border-brand-navy rounded-xl p-6 md:p-8 shadow-sm">
          {/* Header inside the card */}
          <div className="flex items-center justify-between border-b border-brand-amber pb-3 mb-6">
            <h2 className="text-2xl font-bold text-brand-navy">What's New</h2>
            <Link
              to="/updates"
              className="text-sm font-semibold text-brand-blue hover:text-brand-sky transition-colors"
            >
              See all updates &rarr;
            </Link>
          </div>

          {/* Highlight Body */}
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <img
              src={latest.imageUrl}
              alt={latest.title}
              className="w-full md:w-64 h-48 object-cover rounded-lg border border-brand-navy flex-shrink-0"
            />

            <div className="flex flex-col justify-between flex-grow space-y-4 w-full">
              <div>
                <span className="text-xs font-semibold text-brand-amber uppercase tracking-wider">
                  {latest.date}
                </span>
                <h3 className="text-xl font-bold text-brand-blue mt-1">
                  {latest.title}
                </h3>
                <p className="text-sm text-brand-navy/90 mt-2">
                  {latest.summary}
                </p>
              </div>

              <div>
                <Link
                  to={latest.targetRoute}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue hover:text-brand-sky transition-colors"
                >
                  Take me there &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}