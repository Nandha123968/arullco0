import React from 'react';
import { ShieldCheck, Award, TrendingUp, Sparkles } from 'lucide-react';

export const AuthorityStatsBar: React.FC = () => {
  const stats = [
    {
      value: '100%',
      label: 'Conflict-Free Monopoly',
      sub: 'One partner per category locked permanently',
      icon: ShieldCheck,
    },
    {
      value: '+71%',
      label: 'Average Footfall Lift',
      sub: 'Verified bespoke orders & atelier growth',
      icon: TrendingUp,
    },
    {
      value: 'South India #1',
      label: 'Pioneered AI Blazer Studio',
      sub: 'AI virtual try-on before master tailoring',
      icon: Sparkles,
    },
    {
      value: 'Zero',
      label: 'Holding Company Fluff',
      sub: 'Direct founder direction with Arul & team',
      icon: Award,
    },
  ];

  return (
    <section className="relative w-full bg-neutral-900 text-white py-12 sm:py-16 border-y border-neutral-800 select-none overflow-hidden">
      {/* Subtle radial ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-[#ff5500]/10 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-neutral-800">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`flex flex-col justify-between ${
                  idx !== 0 ? 'pt-6 sm:pt-0 sm:pl-6 lg:pl-8' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-black font-display tracking-tight text-white">
                    {stat.value.includes('%') ? (
                      <>
                        <span className="text-[#ff5500]">{stat.value}</span>
                      </>
                    ) : (
                      stat.value
                    )}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-neutral-800 border border-neutral-700/60 flex items-center justify-center text-neutral-400">
                    <Icon className="w-4 h-4 text-[#ff5500]" />
                  </div>
                </div>

                <div className="mt-3">
                  <h4 className="text-sm font-bold text-white tracking-tight">
                    {stat.label}
                  </h4>
                  <p className="mt-1 text-xs text-neutral-400 font-normal leading-relaxed">
                    {stat.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
