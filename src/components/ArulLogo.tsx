import React from 'react';

interface ArulLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  roundedClassName?: string;
  showText?: boolean;
}

export const ArulLogo: React.FC<ArulLogoProps> = ({
  size = 'md',
  className = '',
  roundedClassName = 'rounded-none',
  showText = false,
}) => {
  const sizeClasses = {
    sm: 'h-7 sm:h-8 aspect-[1.73/1]',
    md: 'h-16 sm:h-20 aspect-[1.73/1]',
    lg: 'h-24 sm:h-28 aspect-[1.73/1]',
    hero: 'h-36 sm:h-44 md:h-52 aspect-[1.73/1]',
  }[size];

  return (
    <div
      className={`relative inline-flex flex-col items-center justify-center select-none ${className}`}
    >
      {/* Official Arul Brand Co. Sharp Rectangular Badge */}
      <div
        className={`relative ${sizeClasses} ${roundedClassName} overflow-hidden border border-neutral-300 shadow-xs group transition-all duration-300 hover:border-[#ff5500] hover:shadow-[0_2px_15px_rgba(255,85,0,0.25)] shrink-0 flex items-center justify-center bg-[#002D26]`}
      >
        <img
          src="/arul-brand-logo.png"
          alt="ARUL BRAND CO."
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
          loading="eager"
        />
        {/* Ambient Overlay Highlight */}
        <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/15" />
      </div>

      {showText && (
        <span className="mt-2 text-xs font-mono uppercase tracking-[0.2em] text-neutral-600">
          Official Brand Identity
        </span>
      )}
    </div>
  );
};
