import React, { useEffect, useRef, useState, useCallback } from 'react';

interface FluidHeroBackgroundProps {
  className?: string;
  isPaused?: boolean;
  activeEffectIndex?: number;
  onEffectChange?: (index: number) => void;
  children?: React.ReactNode;
}

interface FluidVideoConfig {
  id: string;
  name: string;
  url: string;
}

// Direct, instant-streaming Cloudinary CDN URLs (No on-the-fly transcoding delay)
const HERO_VIDEOS: FluidVideoConfig[] = [
  {
    id: 'multicolor-splash',
    name: '01 Multicolored Liquid',
    url: 'https://res.cloudinary.com/icneupdz/video/upload/v1791482489/Multicolored_liquid_splashing_watermark_removed.mp4',
  },
  {
    id: 'neon-morphing',
    name: '02 Neon Fluids',
    url: 'https://res.cloudinary.com/icneupdz/video/upload/v1791397733/Neon_fluids_morphing_geometric_s__20261007235023.mp4',
  },
  {
    id: 'futuristic-flow',
    name: '03 Futuristic Flow',
    url: 'https://res.cloudinary.com/icneupdz/video/upload/v1791397734/Liquid_flowing_through_futuristi__20261007235540.mp4',
  },
];

export const FluidHeroBackground: React.FC<FluidHeroBackgroundProps> = ({
  className = '',
  isPaused = false,
  activeEffectIndex: controlledIndex,
  onEffectChange,
  children,
}) => {
  const [internalIndex, setInternalIndex] = useState<number>(0);
  const activeIndex = controlledIndex !== undefined ? controlledIndex : internalIndex;

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const changeIndex = useCallback(
    (newIndex: number) => {
      if (onEffectChange) {
        onEffectChange(newIndex);
      } else {
        setInternalIndex(newIndex);
      }
    },
    [onEffectChange]
  );

  const goNext = useCallback(() => {
    changeIndex((activeIndex + 1) % HERO_VIDEOS.length);
  }, [activeIndex, changeIndex]);

  const goPrev = useCallback(() => {
    changeIndex((activeIndex - 1 + HERO_VIDEOS.length) % HERO_VIDEOS.length);
  }, [activeIndex, changeIndex]);

  const activeIndexRef = useRef<number>(activeIndex);
  activeIndexRef.current = activeIndex;

  // 1. Stable, uninterrupted 7s auto-cycle timer (Zero React setState-in-render warnings)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      const next = (activeIndexRef.current + 1) % HERO_VIDEOS.length;
      if (onEffectChange) {
        onEffectChange(next);
      } else {
        setInternalIndex(next);
      }
    }, 7000);

    return () => clearInterval(timer);
  }, [isPaused, onEffectChange]);

  // 2. Guaranteed Playback Management:
  // - Starts active video instantly
  // - Pauses inactive videos after 1s crossfade (keeps GPU 100% light & prevents decoder freeze)
  useEffect(() => {
    const activeVideo = videoRefs.current[activeIndex];
    if (activeVideo && !isPaused) {
      activeVideo.muted = true;
      activeVideo.play().catch(() => {});
    }

    // Pause non-active videos after crossfade completes
    const pauseTimer = setTimeout(() => {
      videoRefs.current.forEach((video, idx) => {
        if (video && idx !== activeIndex) {
          video.pause();
        }
      });
    }, 1000);

    return () => clearTimeout(pauseTimer);
  }, [activeIndex, isPaused]);

  // Global pause control
  useEffect(() => {
    if (isPaused) {
      videoRefs.current.forEach((v) => v && v.pause());
    } else {
      const activeVideo = videoRefs.current[activeIndex];
      if (activeVideo) {
        activeVideo.muted = true;
        activeVideo.play().catch(() => {});
      }
    }
  }, [isPaused, activeIndex]);

  // 3. Mobile / Tablet Swipe Navigation
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.changedTouches[0];
    const diffX = touch.clientX - touchStartRef.current.x;
    const diffY = touch.clientY - touchStartRef.current.y;

    if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        goNext();
      } else {
        goPrev();
      }
    }
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      data-cursor="swipe"
      className={`relative w-full overflow-hidden bg-black select-none ${className}`}
    >
      {/* ========================================================================= */}
      {/* 3 CLOUDINARY HD VIDEOS WITH SMOOTH 100% GPU CROSSFADE                     */}
      {/* ========================================================================= */}
      {HERO_VIDEOS.map((item, idx) => {
        const isActive = activeIndex === idx;
        return (
          <div
            key={item.id}
            className={`absolute inset-0 w-full h-full overflow-hidden transition-opacity duration-1000 ease-in-out will-change-opacity ${
              isActive
                ? 'opacity-100 z-10'
                : 'opacity-0 pointer-events-none z-0'
            }`}
          >
            <video
              ref={(el) => {
                if (el) {
                  el.muted = true;
                  videoRefs.current[idx] = el;
                }
              }}
              src={item.url}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onLoadedMetadata={(e) => {
                const target = e.currentTarget;
                target.muted = true;
                if (!isPaused && idx === activeIndex) {
                  target.play().catch(() => {});
                }
              }}
              onWaiting={(e) => {
                // If network ever stutters, instantly resume
                const target = e.currentTarget;
                target.muted = true;
                setTimeout(() => {
                  if (!isPaused) target.play().catch(() => {});
                }, 150);
              }}
              className="w-full h-full object-cover object-center"
            />
          </div>
        );
      })}

      {/* Atmospheric Depth Gradients */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/45 via-transparent to-black/30 z-15" />
      <div className="absolute inset-0 pointer-events-none bg-radial from-transparent via-transparent to-black/35 z-15" />

      {/* Clean, low-profile transition blend into white section */}
      <div className="absolute -bottom-1 left-0 right-0 h-10 sm:h-12 bg-gradient-to-t from-white/90 via-white/30 to-transparent pointer-events-none z-22" />

      {/* Foreground Content: Straight Brand Wordmark (aru-l-brand in white sheen, co in pulsing orange) */}
      <div className="relative z-25 w-full flex flex-col items-center justify-center">
        {children}
      </div>

      {/* Subtle bottom scroll cue */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-25 flex flex-col items-center pointer-events-none opacity-60">
        <span className="text-[9px] font-mono tracking-[0.25em] text-white/70 uppercase">Explore</span>
        <div className="w-4 h-7 rounded-full border border-white/30 flex items-start justify-center p-1 mt-1">
          <div className="w-1 h-1.5 rounded-full bg-[#ff5500] animate-bounce" />
        </div>
      </div>
    </div>
  );
};
