import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const PressGrid: React.FC = () => {
  const articles = [
    {
      source: 'Forbes',
      tag: 'Agency Profile',
      title: 'advertising agency: Arul & Creative Partners of arulbrandco',
      description: 'In their flagship interview about launching arulbrandco, the founders explain how they are building a modern creative powerhouse with an unapologetic people-first approach.',
      byline: 'Published by Forbes India &bull; Global Agency Spotlight',
      isHighlight: false,
    },
    {
      source: 'Value Creation',
      tag: 'Internal Memorandum',
      title: 'Updates on employee compensation & value creation.',
      description: 'Why profit-sharing, four-day recovery rhythms during non-campaign cycles, and zero unpaid pitch sprints transformed talent retention across design, strategy, and direction.',
      byline: 'Arul & Co-Founders at arulbrandco',
      isHighlight: true,
    },
    {
      source: 'Brand Equity',
      tag: 'Market Analysis',
      title: 'arulbrandco: is "the Next Uncommon" Being Built in South Asia?',
      description: 'Dissecting how an independent design and campaign laboratory rooted in Tamil Nadu is outmaneuvering traditional multinational agency holding networks on the global stage.',
      byline: 'Featured in Brand Equity &bull; Global Creative Dispatch',
      isHighlight: false,
    },
  ];

  return (
    <section
      id="press"
      className="relative w-full py-24 bg-[#FAFAFA] border-y border-neutral-200 transition-colors duration-500 overflow-hidden"
    >
      {/* Subtle clean editorial grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 font-['Times_New_Roman',_Times,_serif]">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-[0.2em] bg-neutral-100 text-neutral-800 border border-neutral-300">
                Press &amp; Dispatches
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-950 font-['Times_New_Roman',_Times,_serif]">
              In The Headlines
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-neutral-500 font-mono self-start sm:self-auto">
            Conversations on independent agency craft &amp; equity
          </p>
        </div>

        {/* 3 Featured Press Cards in Editorial White Theme */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((item, idx) => {
            const isHighlight = item.isHighlight;
            return (
              <article
                key={idx}
                className={`relative p-8 rounded-2xl bg-white border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 ${
                  isHighlight
                    ? 'border-neutral-900 shadow-[0_12px_40px_rgba(0,0,0,0.08)] ring-1 ring-neutral-900'
                    : 'border-neutral-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:border-neutral-400 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]'
                }`}
              >
                <div>
                  <div className="mb-6">
                    <span className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 font-['Times_New_Roman',_Times,_serif]">
                      {item.source}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-normal leading-snug mb-4 font-['Times_New_Roman',_Times,_serif] group-hover:text-black transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-normal mb-8 font-['Times_New_Roman',_Times,_serif]">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500 font-['Times_New_Roman',_Times,_serif] italic">
                  <span dangerouslySetInnerHTML={{ __html: item.byline }} />
                  <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all not-italic" />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
