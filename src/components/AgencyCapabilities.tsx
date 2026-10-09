import React from 'react';
import { Sparkles, Film, Cpu, TrendingUp, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface AgencyCapabilitiesProps {
  onOpenContact: () => void;
}

export const AgencyCapabilities: React.FC<AgencyCapabilitiesProps> = ({ onOpenContact }) => {
  const pillars = [
    {
      number: '01',
      title: 'Brand Strategy & Category Monopoly',
      subtitle: 'Positioning that renders competitors irrelevant',
      icon: Sparkles,
      tag: 'Strategic Advantage',
      deliverables: [
        'Cultural category insight & competitor flank analysis',
        'Distinctive brand architecture & core narrative',
        'Tone of voice, editorial manifesto & naming systems',
        'Category exclusivity: 1 partner per industry locked permanently',
      ],
      metric: '100% Conflict-Free Loyalty',
    },
    {
      number: '02',
      title: 'Cinematic Fashion & Narrative Films',
      subtitle: 'Tactile luxury craft that commands undivided attention',
      icon: Film,
      tag: 'Artisanal Craft',
      deliverables: [
        'High-fashionSlow-motion macro cinematography',
        'Haute couture suiting, styling & editorial art direction',
        'Full production, sound design & original score scoring',
        'Heritage brand films for discerning luxury clientele',
      ],
      metric: '+78% Couture Growth',
    },
    {
      number: '03',
      title: 'AI Fashion Tech & Virtual Try-On',
      subtitle: "Pioneering South India's first AI-powered styling ateliers",
      icon: Cpu,
      tag: 'Next-Gen Tech',
      deliverables: [
        'AI body-matching & virtual blazer silhouette simulation',
        'Interactive digital try-on experiences before master tailoring',
        'Spatial web design & award-winning digital experiences',
        'Customer confidence acceleration & zero-friction fittings',
      ],
      metric: "Coimbatore's 1st AI Blazer Studio",
    },
    {
      number: '04',
      title: 'Distribution & Enterprise Growth',
      subtitle: 'Turning viral cultural attention into verified revenue',
      icon: TrendingUp,
      tag: 'Commercial Scale',
      deliverables: [
        'High-velocity campaign launch orchestration',
        'Targeted digital distribution across South India & beyond',
        'Full-funnel attribution and real business conversion metrics',
        'Long-term client enterprise equity value creation pools',
      ],
      metric: '+64% Bespoke Orders',
    },
  ];

  return (
    <section className="relative w-full py-20 sm:py-28 bg-white text-black border-b border-neutral-200 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-neutral-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-300 text-[11px] font-mono tracking-widest uppercase text-neutral-600 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500] animate-pulse" />
              <span>Full-Stack Studio Levers</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-black leading-[0.98]">
              how we turn attention<br />
              into enterprise power.
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-neutral-600 font-normal leading-relaxed">
            Conventional agencies deliver generic outputs. We build compounding cultural and commercial leverage across four specialized studio pillars.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 pt-12">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.number}
                className="group p-6 sm:p-8 rounded-2xl bg-neutral-50/80 border border-neutral-200 hover:border-black transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-xl"
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-center justify-between pb-6 border-b border-neutral-200/80">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-xl bg-black text-white font-mono text-sm font-bold flex items-center justify-center group-hover:bg-[#ff5500] transition-colors">
                        {pillar.number}
                      </span>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                          {pillar.tag}
                        </span>
                        <div className="text-xs font-mono font-bold text-[#ff5500]">
                          {pillar.metric}
                        </div>
                      </div>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-700 group-hover:border-black group-hover:text-black transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="pt-6">
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-black tracking-tight group-hover:text-[#ff5500] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
                      {pillar.subtitle}
                    </p>
                  </div>

                  {/* Deliverables */}
                  <ul className="mt-6 space-y-2.5 pt-4 border-t border-neutral-200/60 text-xs sm:text-[13px] text-neutral-700 font-normal">
                    {pillar.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#ff5500] shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Card Action */}
                <div className="pt-8 mt-6 border-t border-neutral-200/60 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-neutral-500">
                    Category Exclusive Slot
                  </span>
                  <button
                    onClick={onOpenContact}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-black group-hover:text-[#ff5500] transition-colors cursor-pointer"
                  >
                    <span>Inquire for Your Brand</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Founder Stature Quote Banner */}
        <div className="mt-12 sm:mt-16 p-8 sm:p-10 rounded-2xl bg-black text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase bg-[#ff5500]/20 text-[#ff5500] font-bold border border-[#ff5500]/40">
              Founder Commitment
            </span>
            <h4 className="text-xl sm:text-2xl md:text-3xl font-black font-display tracking-tight text-white">
              "We care more about the result than the number of clients."
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400 font-normal">
              Direct founder collaboration. Zero middle managers. All in on one partner per category.
            </p>
          </div>

          <button
            onClick={onOpenContact}
            className="px-8 py-4 rounded-xl bg-[#ff5500] hover:bg-[#e04b00] text-white font-black text-xs font-mono tracking-widest uppercase transition-all transform hover:scale-105 active:scale-95 shadow-[0_4px_25px_rgba(255,85,0,0.45)] whitespace-nowrap cursor-pointer"
          >
            LOCK YOUR CATEGORY &rarr;
          </button>
        </div>
      </div>
    </section>
  );
};
