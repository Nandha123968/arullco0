import React, { useState } from 'react';
import { Instagram, Linkedin, Twitter, Play, Mail } from 'lucide-react';
import { FluidHeroBackground } from './FluidHeroBackground';
import { ArulBrandWordmark } from './ArulBrandWordmark';

interface HeroProps {
  isAudioPlaying?: boolean;
  onToggleAudio?: () => void;
  onOpenContact?: () => void;
  onOpenHandbook?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  isAudioPlaying = false,
  onToggleAudio,
  onOpenContact,
  onOpenHandbook,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [activeFluidIndex, setActiveFluidIndex] = useState(0);

  const handleToggle = () => {
    const nextPaused = !isPaused;
    setIsPaused(nextPaused);
    if (onToggleAudio) {
      onToggleAudio();
    }
  };

  return (
    <section className="relative w-full flex flex-col bg-white text-black select-none overflow-hidden pt-16">
      {/* ========================================================================= */}
      {/* 1. TOP SECTION: 3 Fluid Background Videos + Straight 'arulbrandco' Wordmark */}
      {/* ========================================================================= */}
      <FluidHeroBackground
        isPaused={isPaused}
        activeEffectIndex={activeFluidIndex}
        onEffectChange={setActiveFluidIndex}
        className="h-[calc(100vh-4rem)] sm:h-[calc(100vh-4rem)] min-h-[480px] flex items-center justify-center"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center">
          {/* Straight Horizontal Brand Wordmark with 'co' strictly in orange as requested */}
          <h1 className="w-full flex items-center justify-center">
            <ArulBrandWordmark />
          </h1>
        </div>
      </FluidHeroBackground>

      {/* ========================================================================= */}
      {/* 2. CORE STATEMENT: Clean White Editorial Agency Theme                     */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full bg-white py-12 sm:py-20 px-4 sm:px-6 flex flex-col items-center text-center">
        {/* Location Line from Brief */}
        <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-neutral-100 border border-neutral-300 text-[10px] sm:text-[11px] font-mono tracking-[0.2em] sm:tracking-[0.25em] text-neutral-600 uppercase">
          <span>Bengaluru</span>
          <span className="text-[#ff5500]">&bull;</span>
          <span>Chennai</span>
          <span className="text-[#ff5500]">&bull;</span>
          <span>India</span>
        </div>

        {/* The massive iconic 2-line headline in vibrant signature orange */}
        <h2
          className="font-black tracking-[-0.035em] text-[#ff5500] leading-[0.96] lowercase text-[clamp(2.2rem,6.8vw,6.5rem)] max-w-5xl"
          style={{ fontFamily: "'Red Hat Display', 'Outfit', sans-serif" }}
        >
          we don't do marketing<br />
          for everyone.
        </h2>

        {/* Subtitle statement from Brief */}
        <p className="mt-5 sm:mt-8 max-w-2xl text-neutral-800 text-sm sm:text-base md:text-lg font-normal leading-relaxed tracking-normal text-balance px-2 sm:px-4">
          We partner with ambitious brands, one direct category at a time.
          <br className="hidden sm:inline" />
          <span className="text-neutral-500 mt-1 sm:mt-2 block sm:inline sm:ml-1">
            We build strategy, content and campaigns that turn attention into business.
          </span>
        </p>

        {/* Primary CTA Buttons */}
        <div className="mt-7 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none px-4 sm:px-0">
          <button
            onClick={onOpenContact}
            className="w-full sm:w-auto px-7 sm:px-10 py-3.5 sm:py-4 rounded-md sm:rounded-lg bg-black hover:bg-neutral-850 text-white font-black text-xs sm:text-sm tracking-widest uppercase transition-all transform hover:scale-105 active:scale-95 shadow-[0_4px_25px_rgba(0,0,0,0.25)] cursor-pointer text-center"
          >
            START A CONVERSATION
          </button>
          {onOpenHandbook && (
            <button
              onClick={onOpenHandbook}
              className="w-full sm:w-auto px-6 py-3.5 sm:py-4 rounded-md sm:rounded-lg bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-900 font-mono text-xs tracking-wider uppercase transition-all cursor-pointer text-center"
            >
              READ THE PLAYBOOK &rarr;
            </button>
          )}
        </div>

        {/* Direct Contact & Social Links in Clean Editorial Style */}
        <div className="mt-8 sm:mt-10 flex flex-col items-center gap-4">
          <div className="flex items-center justify-center gap-7 text-neutral-800">
            {/* Direct Email */}
            <a
              href="mailto:contact@arulbrandco.com"
              aria-label="Email contact@arulbrandco.com"
              title="Send Email to contact@arulbrandco.com"
              className="hover:scale-110 hover:text-[#ff5500] transition-all"
            >
              <Mail className="w-7 h-7 sm:w-8 sm:h-8" />
            </a>

            <a
              href="https://www.instagram.com/arulbrandco?stkn=bjN4N2loMWZrYnVs"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:scale-115 hover:text-[#ff5500] transition-all"
            >
              <Instagram className="w-7 h-7 sm:w-8 sm:h-8" />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:scale-115 hover:text-[#ff5500] transition-all"
            >
              <Linkedin className="w-7 h-7 sm:w-8 sm:h-8" />
            </a>

            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="hover:scale-115 hover:text-[#ff5500] transition-all"
            >
              <Twitter className="w-7 h-7 sm:w-8 sm:h-8" />
            </a>
          </div>
        </div>

        {/* Smooth Scroll To Explore Sections Below */}
        <div className="mt-10 sm:mt-12 flex flex-col items-center justify-center">
          <a
            href="#manifesto"
            className="group inline-flex flex-col items-center gap-1.5 text-neutral-400 hover:text-black transition-all cursor-pointer"
          >
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-neutral-500 group-hover:text-black transition-colors">
              Scroll To Explore
            </span>
            <span className="w-7 h-7 rounded-full border border-neutral-300 group-hover:border-black group-hover:bg-neutral-100 flex items-center justify-center text-xs transition-all transform group-hover:translate-y-1 shadow-xs">
              &darr;
            </span>
          </a>
        </div>

        {/* Minimal Ambient Pause Indicator Button */}
        <div className="w-full max-w-7xl px-4 flex justify-end mt-8 sm:mt-10">
          <button
            onClick={handleToggle}
            className="text-neutral-400 hover:text-black transition-colors p-2 text-xs font-mono tracking-widest flex items-center gap-1 cursor-pointer"
            title={isPaused ? "Play ambient experience" : "Pause ambient experience"}
            aria-label="Pause experience"
          >
            {isPaused ? (
              <span className="font-bold text-xs tracking-wider flex items-center gap-1.5">
                <Play className="w-3 h-3 fill-current" /> PLAY
              </span>
            ) : (
              <span className="font-bold text-sm tracking-wider">||</span>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
