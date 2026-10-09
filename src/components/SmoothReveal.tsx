import React, { useEffect, useRef, useState } from 'react';

interface SmoothRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const SmoothReveal: React.FC<SmoothRevealProps> = ({
  children,
  className = '',
  delay = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const current = domRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      style={{
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
        isVisible
          ? 'opacity-100 translate-y-0 filter-none'
          : 'opacity-0 translate-y-10 filter blur-[1px]'
      } ${className}`}
    >
      {children}
    </div>
  );
};
