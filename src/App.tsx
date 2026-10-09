import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeBanner } from './components/MarqueeBanner';
import { HandbookSection } from './components/HandbookSection';
import { ShowcaseGrid } from './components/ShowcaseGrid';
import { Footer } from './components/Footer';
import { HandbookModal } from './components/HandbookModal';
import { ContactModal } from './components/ContactModal';
import { audioEngine } from './components/AudioEngine';
import { SmoothReveal } from './components/SmoothReveal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [isHandbookOpen, setIsHandbookOpen] = useState<boolean>(false);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);

  const handleToggleAudio = () => {
    const nextState = audioEngine.toggle();
    setIsAudioPlaying(nextState);
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col selection:bg-[#ff5500] selection:text-white">
      <Navbar
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenHandbook={() => setIsHandbookOpen(true)}
      />
      <main className="flex-1">
        <Hero
          isAudioPlaying={isAudioPlaying}
          onToggleAudio={handleToggleAudio}
          onOpenContact={() => setIsContactOpen(true)}
          onOpenHandbook={() => setIsHandbookOpen(true)}
        />
        
        {/* Sections below front page with smooth scroll entrance transitions */}
        <SmoothReveal delay={50}>
          <MarqueeBanner />
        </SmoothReveal>

        <SmoothReveal delay={80}>
          <HandbookSection onOpenHandbook={() => setIsHandbookOpen(true)} />
        </SmoothReveal>

        <SmoothReveal delay={100}>
          <ShowcaseGrid onOpenContact={() => setIsContactOpen(true)} />
        </SmoothReveal>
      </main>

      <SmoothReveal delay={50}>
        <Footer
          onOpenContact={() => setIsContactOpen(true)}
          onOpenHandbook={() => setIsHandbookOpen(true)}
          isAudioPlaying={isAudioPlaying}
          onToggleAudio={handleToggleAudio}
        />
      </SmoothReveal>
      <HandbookModal isOpen={isHandbookOpen} onClose={() => setIsHandbookOpen(false)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <FloatingWhatsApp />
    </div>
  );
}
