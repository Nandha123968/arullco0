import React, { useState } from 'react';
import { ArrowUpRight, Lock, CheckCircle, Sparkles } from 'lucide-react';

interface ClientRosterMatrixProps {
  onOpenContact: () => void;
}

interface RosterItem {
  id: string;
  number: string;
  client: string;
  category: string;
  location: string;
  scope: string;
  status: 'LOCKED' | 'EXCLUSIVE' | 'COMPLETED' | 'VENTURE';
  year: string;
  stat: string;
}

const ROSTER_DATA: RosterItem[] = [
  {
    id: 'derby-tailor',
    number: '01',
    client: 'Derby Tailor Studio',
    category: 'Bespoke Sartorial Menswear',
    location: 'Chennai & Bengaluru',
    scope: 'Brand Cinema, Macro Fashion Direction & Digital Launch',
    status: 'LOCKED',
    year: '2025',
    stat: '+64% Bespoke Orders',
  },
  {
    id: 'mizaj-cbe-ai',
    number: '02',
    client: 'Mizaj Coimbatore',
    category: 'AI Virtual Try-On Atelier',
    location: 'Coimbatore',
    scope: 'South India’s 1st AI Blazer Fit Experience & Haute Suiting Film',
    status: 'LOCKED',
    year: '2025',
    stat: '1st in South India',
  },
  {
    id: 'sartorial-collective',
    number: '03',
    client: 'Sartorial Collective',
    category: 'Luxury Made-to-Measure Suiting',
    location: 'Bengaluru',
    scope: 'Haute Suiting Identity, Editorial Lookbook & Private Client Salon',
    status: 'EXCLUSIVE',
    year: '2024–25',
    stat: '+78% Wedding Growth',
  },
  {
    id: 'cbe-ai-lab',
    number: '04',
    client: 'Coimbatore AI Fashion Lab',
    category: 'Spatial Computer Vision & Styling',
    location: 'Coimbatore & Singapore',
    scope: '3D Silhouette Synthesis, Interactive Fitting & Spatial Web',
    status: 'VENTURE',
    year: '2025',
    stat: 'Proprietary AI Tech',
  },
  {
    id: 'heritage-weaves',
    number: '05',
    client: 'Heritage Weaves & Silks',
    category: 'Regal South Indian Silk Couture',
    location: 'Kanchipuram & Chennai',
    scope: 'Heritage Brand Manifesto, Royal Bridal Narrative & Global PR',
    status: 'COMPLETED',
    year: '2024',
    stat: 'Global Editorial PR',
  },
];

export const ClientRosterMatrix: React.FC<ClientRosterMatrixProps> = ({ onOpenContact }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="relative w-full py-20 sm:py-28 bg-white text-black border-b border-neutral-200 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-neutral-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-300 text-[11px] font-mono tracking-widest uppercase text-neutral-600 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500]" />
              <span>Category Monopoly Directory</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-black leading-[0.98]">
              client roster &amp;<br />
              category locks.
            </h2>
          </div>

          <div className="max-w-md text-left md:text-right">
            <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
              When we partner with a client, we never take on their competitors. Ever. Once a category is locked, it remains exclusively theirs.
            </p>
            <div className="mt-3 flex items-center md:justify-end gap-3 text-[11px] font-mono text-neutral-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#ff5500]" /> Locked Category
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-black" /> Retainer Active
              </span>
            </div>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="mt-8 divide-y divide-neutral-200 border-b border-neutral-200">
          {ROSTER_DATA.map((item) => {
            const isHovered = hoveredId === item.id;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`py-6 sm:py-7 px-4 sm:px-6 transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 rounded-xl ${
                  isHovered ? 'bg-neutral-50 border-l-4 border-l-[#ff5500] pl-6' : 'hover:bg-neutral-50/50'
                }`}
              >
                {/* Left: Number & Client */}
                <div className="flex items-start sm:items-center gap-4 sm:gap-6 min-w-[320px]">
                  <span className="font-mono text-xs font-bold text-neutral-400">
                    {item.number}
                  </span>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold font-display text-black tracking-tight group-hover:text-[#ff5500]">
                      {item.client}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5 text-xs font-mono text-neutral-500">
                      <span>{item.category}</span>
                      <span>&bull;</span>
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>

                {/* Center: Scope */}
                <div className="flex-1 lg:px-6">
                  <p className="text-xs sm:text-[13px] text-neutral-600 font-normal leading-relaxed">
                    {item.scope}
                  </p>
                </div>

                {/* Right: Metric & Exclusivity Tag */}
                <div className="flex items-center justify-between lg:justify-end gap-4 min-w-[240px]">
                  <div className="text-left lg:text-right">
                    <span className="text-xs font-mono font-bold text-[#ff5500]">
                      {item.stat}
                    </span>
                    <div className="text-[10px] font-mono text-neutral-400">
                      {item.year}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 ${
                        item.status === 'LOCKED'
                          ? 'bg-[#ff5500]/10 text-[#ff5500] border border-[#ff5500]/30'
                          : item.status === 'VENTURE'
                          ? 'bg-black text-white'
                          : 'bg-neutral-200 text-neutral-800'
                      }`}
                    >
                      {item.status === 'LOCKED' && <Lock className="w-2.5 h-2.5" />}
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner: Lock Your Category */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-neutral-100 border border-neutral-300 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-[#ff5500]" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold font-display text-black">
                Is your industry category still available?
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 font-normal mt-0.5">
                Check whether your direct competitor has claimed the slot or if it is currently open for partnership.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenContact}
            className="px-6 py-3.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-md whitespace-nowrap cursor-pointer flex items-center gap-2 shrink-0"
          >
            <span>Check Category Availability</span>
            <ArrowUpRight className="w-4 h-4 text-[#ff5500]" />
          </button>
        </div>
      </div>
    </section>
  );
};
