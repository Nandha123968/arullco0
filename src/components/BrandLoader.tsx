import React, { useEffect, useRef, useState } from 'react';

const WORD = 'arulbrand'.split('');
/** Loader never finishes faster than this, so the intro animation can play fully. */
const MIN_DURATION = 1800;
/** Safety net: loader always exits after this, even if some asset never finishes loading. */
const MAX_DURATION = 8000;
/** Must match the longest exit transition in index.css (.brand-loader.is-exiting ...). */
const EXIT_DURATION = 1450;

interface BrandLoaderProps {
  onDone: () => void;
}

/**
 * Full-screen intro loader.
 * Progress is tied to real page readiness (window `load` + brand fonts),
 * then the black panel and an orange panel wipe upward to reveal the site.
 */
export const BrandLoader: React.FC<BrandLoaderProps> = ({ onDone }) => {
  const [fontsReady, setFontsReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const pageLoaded = useRef(document.readyState === 'complete');
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  // Lock scrolling while the loader is on screen.
  useEffect(() => {
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => {
      root.style.overflow = prev;
    };
  }, []);

  // Wait for the wordmark fonts so letters don't animate in with a fallback font.
  useEffect(() => {
    let cancelled = false;
    const markReady = () => {
      if (!cancelled) setFontsReady(true);
    };
    const fallback = window.setTimeout(markReady, 1200);
    if (document.fonts?.load) {
      Promise.all([
        document.fonts.load('800 1em Syne'),
        document.fonts.load('700 1em Unbounded'),
      ]).then(markReady, markReady);
    } else {
      markReady();
    }
    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
    };
  }, []);

  // Track when all images / video / CSS have finished loading.
  useEffect(() => {
    if (pageLoaded.current) return;
    const handleLoad = () => {
      pageLoaded.current = true;
    };
    window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, []);

  // Animated counter: creeps toward 90% while waiting, then races to 100% once ready.
  useEffect(() => {
    const start = performance.now();
    let shown = 0;
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const ready =
        (pageLoaded.current && elapsed >= MIN_DURATION) || elapsed >= MAX_DURATION;
      const target = ready ? 100 : 90 * (1 - Math.exp(-elapsed / 1400));

      shown += (target - shown) * (ready ? 0.12 : 0.08);
      if (ready && 100 - shown < 0.5) shown = 100;
      setProgress(shown);

      if (shown >= 100) {
        setIsExiting(true);
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Unmount after the curtain wipe finishes.
  useEffect(() => {
    if (!isExiting) return;
    const t = window.setTimeout(() => onDoneRef.current(), EXIT_DURATION);
    return () => window.clearTimeout(t);
  }, [isExiting]);

  const pct = Math.floor(progress);

  return (
    <div
      className={`brand-loader ${fontsReady ? 'is-ready' : ''} ${isExiting ? 'is-exiting' : ''}`}
      role="status"
      aria-live="polite"
      aria-label={`Loading arulbrandco, ${pct} percent`}
    >
      <div className="brand-loader__panel brand-loader__panel--accent" />

      <div className="brand-loader__panel brand-loader__panel--main">
        <div className="brand-loader__glow" />
        <div className="brand-loader__grain bg-grain" />

        <div className="brand-loader__top">
          <span>arulbrandco®</span>
          <span className="brand-loader__top-right">Creative &amp; Design Studio</span>
        </div>

        <div className="brand-loader__center" aria-hidden="true">
          <div className="brand-loader__word font-wordmark-talented">
            {WORD.map((ch, i) => (
              <span
                key={i}
                className={`brand-loader__mask ${ch === 'l' ? 'brand-loader__mask--l' : ''}`}
              >
                <span
                  className="brand-loader__char"
                  style={{ '--i': i } as React.CSSProperties}
                >
                  {ch}
                </span>
              </span>
            ))}
            <span className="brand-loader__co">co</span>
          </div>
          <p className="brand-loader__tag">Brands · Campaigns · Experiences</p>
        </div>

        <div className="brand-loader__bottom">
          <span className="brand-loader__status">
            <span className="brand-loader__dot" />
            Loading experience
          </span>
          <span className="brand-loader__count">
            {String(pct).padStart(3, '0')}
            <sup>%</sup>
          </span>
        </div>

        <div className="brand-loader__bar">
          <div
            className="brand-loader__bar-fill"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>
      </div>
    </div>
  );
};
