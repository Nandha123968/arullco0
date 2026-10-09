import React, { useEffect, useState, useRef } from 'react';

export const CustomStudioCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const trailRef = useRef({ x: -100, y: -100 });
  const animFrame = useRef<number | null>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on desktop with fine pointer (no touch devices)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check hovered elements for contextual cursor tags
      const target = e.target as HTMLElement | null;
      if (target) {
        const clickable = target.closest('button, a, input, select, textarea, [role="button"]');
        const videoArea = target.closest('video, [data-cursor="swipe"]');
        const cardArea = target.closest('[data-cursor="watch"]');

        if (cardArea) {
          setIsHovered(true);
          setCursorText('VIEW');
        } else if (videoArea) {
          setIsHovered(true);
          setCursorText('SWIPE');
        } else if (clickable) {
          setIsHovered(true);
          setCursorText('');
        } else {
          setIsHovered(false);
          setCursorText('');
        }
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth inertia lag loop for outer ring
    const render = () => {
      trailRef.current.x += (position.x - trailRef.current.x) * 0.18;
      trailRef.current.y += (position.y - trailRef.current.y) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${trailRef.current.x}px, ${trailRef.current.y}px, 0) translate(-50%, -50%)`;
      }
      animFrame.current = requestAnimationFrame(render);
    };
    animFrame.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [position.x, position.y, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-9999 overflow-hidden hidden md:block">
      {/* 1. Center Precision Dot */}
      <div
        className={`fixed top-0 left-0 w-2 h-2 rounded-full bg-[#ff5500] pointer-events-none transition-transform duration-75 ease-out ${
          isClicking ? 'scale-50' : isHovered ? 'scale-0' : 'scale-100'
        }`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        }}
      />

      {/* 2. Inertia Trailing Ring with Contextual Badge */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border pointer-events-none transition-all duration-300 flex items-center justify-center font-mono text-[9px] font-bold tracking-widest uppercase will-change-transform ${
          isHovered
            ? cursorText
              ? 'w-16 h-16 bg-[#ff5500] text-white border-transparent shadow-[0_0_20px_rgba(255,85,0,0.5)]'
              : 'w-12 h-12 bg-black/10 border-black/30 backdrop-blur-xs scale-110'
            : isClicking
            ? 'w-7 h-7 border-[#ff5500] scale-90'
            : 'w-8 h-8 border-neutral-400/60'
        }`}
      >
        {cursorText && <span>{cursorText}</span>}
      </div>
    </div>
  );
};
