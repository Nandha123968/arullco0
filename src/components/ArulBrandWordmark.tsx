import React, { useState } from 'react';

interface ArulBrandWordmarkProps {
  className?: string;
  theme?: 'dark' | 'light';
}

export const ArulBrandWordmark: React.FC<ArulBrandWordmarkProps> = ({
  className = '',
  theme = 'dark',
}) => {
  const [isWobbling, setIsWobbling] = useState(false);

  const handleLigatureTap = () => {
    setIsWobbling(true);
    setTimeout(() => setIsWobbling(false), 800);
  };

  return (
    <div
      className={`relative flex items-center justify-center select-none w-full max-w-full px-2 sm:px-4 ${className}`}
      aria-label="arulbrandco"
    >
      <style>{`
        @keyframes liquidSheen {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes orangeGlowPulse {
          0%, 100% {
            text-shadow: 0 0 18px rgba(255, 85, 0, 0.8), 0 0 35px rgba(255, 85, 0, 0.4);
            transform: scale(1);
          }
          50% {
            text-shadow: 0 0 28px rgba(255, 85, 0, 1), 0 0 50px rgba(255, 110, 30, 0.6);
            transform: scale(1.03);
          }
        }
        .anim-sheen-text {
          background: linear-gradient(105deg, rgba(255,255,255,0.92) 20%, rgba(255,230,200,1) 40%, rgba(255,255,255,1) 50%, rgba(200,240,255,0.9) 60%, rgba(255,255,255,0.92) 80%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: liquidSheen 6s ease-in-out infinite;
          text-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
        }
        .anim-orange-co {
          color: #ff5500;
          animation: orangeGlowPulse 3s ease-in-out infinite;
        }
        @keyframes wobbleSpring {
          0% { transform: skewX(-12deg) scaleY(1.05); }
          25% { transform: skewX(-24deg) scaleY(1.2) rotate(4deg); }
          50% { transform: skewX(-2deg) scaleY(0.95) rotate(-3deg); }
          75% { transform: skewX(-16deg) scaleY(1.1) rotate(2deg); }
          100% { transform: skewX(-12deg) scaleY(1.05); }
        }
        .anim-wobble {
          animation: wobbleSpring 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>

      {/* Straight Single-Line Wordmark: Clean, perfectly centered, never clipped, zero box artifacts */}
      <div className="flex items-center justify-center tracking-[-0.038em] max-w-full">
        <span
          style={{
            fontSize: 'clamp(2.5rem, 8.5vw, 8.5rem)',
            lineHeight: 1,
          }}
          className="font-wordmark-talented lowercase inline-flex items-baseline whitespace-nowrap"
        >
          {/* 'aru' */}
          <span className="anim-sheen-text font-black tracking-[-0.04em]">
            aru
          </span>

          {/* Interactive Ligature 'l' - Tilted sweeping fluid cut with Spring Wobble */}
          <span
            onClick={handleLigatureTap}
            onTouchStart={handleLigatureTap}
            className={`inline-block transform -skew-x-12 scale-y-105 origin-bottom font-black px-[0.02em] cursor-pointer hover:scale-115 active:scale-90 transition-transform duration-200 anim-sheen-text ${
              isWobbling ? 'anim-wobble' : ''
            }`}
          >
            l
          </span>

          {/* 'brand' */}
          <span className="anim-sheen-text font-black tracking-[-0.04em]">
            brand
          </span>

          {/* 'co' ONLY IN VIBRANT CRAZY ORANGE WITH NATIVE TEXT-SHADOW NEON AURA (NO RECTANGLE BOX) */}
          <span className="inline-block font-black ml-1 sm:ml-2.5 anim-orange-co cursor-pointer hover:scale-110 active:scale-95 transition-transform">
            co
          </span>
        </span>
      </div>
    </div>
  );
};
