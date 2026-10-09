import React from 'react';

interface HandbookSectionProps {
  onOpenHandbook: () => void;
}

export const HandbookSection: React.FC<HandbookSectionProps> = ({ onOpenHandbook }) => {
  const backdropText1 =
    "We don't do marketing for everyone · One category. One partner. All in · Depth beats distraction · Strategy → Creative → Distribution → Growth · ";
  const backdropText2 =
    "Think. Build. Test. Learn. Repeat · Truth over convenience · Quality over speed · Accountability over excuses · Real work and real outcomes · ";
  const backdropText3 =
    "Your competitor won't be our client · Good businesses. Ambitious founders. No BS · Building Arul Brand Co. in public · Bengaluru • Chennai · ";

  return (
    <section className="relative w-full py-20 sm:py-28 md:py-32 bg-white overflow-hidden select-none border-b border-neutral-200">
      <style>{`
        @keyframes scrollBgLeft {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes scrollBgRight {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .anim-bg-left {
          display: flex;
          width: max-content;
          animation: scrollBgLeft 52s linear infinite;
        }
        .anim-bg-right {
          display: flex;
          width: max-content;
          animation: scrollBgRight 58s linear infinite;
        }
      `}</style>

      {/* Kinetic Watermark Backdrop in soft light gray */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between py-6 opacity-30 filter blur-[0.8px] overflow-hidden select-none">
        <div className="overflow-hidden whitespace-nowrap">
          <div className="anim-bg-left">
            <span className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-neutral-300 px-2">
              {backdropText1} {backdropText1}
            </span>
            <span className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-neutral-300 px-2">
              {backdropText1} {backdropText1}
            </span>
          </div>
        </div>

        <div className="overflow-hidden whitespace-nowrap">
          <div className="anim-bg-right">
            <span className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-neutral-300 px-2">
              {backdropText2} {backdropText2}
            </span>
            <span className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-neutral-300 px-2">
              {backdropText2} {backdropText2}
            </span>
          </div>
        </div>

        <div className="overflow-hidden whitespace-nowrap">
          <div className="anim-bg-left">
            <span className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-neutral-300 px-2">
              {backdropText3} {backdropText3}
            </span>
            <span className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-neutral-300 px-2">
              {backdropText3} {backdropText3}
            </span>
          </div>
        </div>
      </div>

      {/* Foreground Content: Title & Black Pill Button */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        <h2 className="text-[clamp(2.3rem,8.6vw,6.2rem)] font-black tracking-tighter text-black font-display leading-[0.93] lowercase">
          the arulbrandco<br />
          handbook
        </h2>

        {/* The prominent "READ IT HERE" button */}
        <div className="mt-7 sm:mt-10">
          <button
            onClick={onOpenHandbook}
            className="px-8 sm:px-10 py-3.5 sm:py-4 rounded-md sm:rounded-lg bg-black hover:bg-neutral-800 text-white font-black text-xs sm:text-sm tracking-wider uppercase transition-all transform hover:scale-105 active:scale-95 shadow-[0_4px_25px_rgba(0,0,0,0.2)] cursor-pointer"
          >
            READ IT HERE
          </button>
        </div>
      </div>
    </section>
  );
};
