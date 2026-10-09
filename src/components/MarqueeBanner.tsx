import React from 'react';

export const MarqueeBanner: React.FC = () => {
  const manifestoLine1 =
    "deeply · leadership · Discipline, even in chaos · When in doubt, default feminist values · Equal pay for equal work · Do great work. Get great sleep · We believe that creativity can change the world · a safe place · ";
  const manifestoLine2 =
    "None of us is as good as all of us · No bullshit commitments · We have a bias towards optimism · Cynicism is the death of creativity · Outcomes over optics · Show the work and you're golden · We will be each other's biggest cheerleaders · Disagree with respect · Everyone must have a seat at the table · Take complete ownership of your work · ";

  return (
    <div id="manifesto" className="relative w-full overflow-hidden bg-neutral-100/90 py-8 sm:py-12 border-y border-neutral-200 select-none">
      <style>{`
        @keyframes marqueeScrollLeft {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes marqueeScrollRight {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .animate-scroll-left {
          display: flex;
          width: max-content;
          animation: marqueeScrollLeft 45s linear infinite;
        }
        .animate-scroll-right {
          display: flex;
          width: max-content;
          animation: marqueeScrollRight 50s linear infinite;
        }
      `}</style>

      {/* Row 1: Smooth editorial marquee */}
      <div className="overflow-hidden whitespace-nowrap opacity-80 filter blur-[0.2px]">
        <div className="animate-scroll-left">
          <span className="text-2xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-neutral-800 px-4">
            {manifestoLine1} {manifestoLine1}
          </span>
          <span className="text-2xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-neutral-800 px-4">
            {manifestoLine1} {manifestoLine1}
          </span>
        </div>
      </div>

      {/* Row 2: Moving right with orange accent */}
      <div className="overflow-hidden whitespace-nowrap opacity-70 filter blur-[0.3px] mt-2 sm:mt-3">
        <div className="animate-scroll-right">
          <span className="text-xl sm:text-3xl md:text-4xl font-black font-display tracking-tight text-neutral-500 px-4">
            {manifestoLine2} {manifestoLine2}
          </span>
          <span className="text-xl sm:text-3xl md:text-4xl font-black font-display tracking-tight text-neutral-500 px-4">
            {manifestoLine2} {manifestoLine2}
          </span>
        </div>
      </div>
    </div>
  );
};
