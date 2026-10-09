import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, Mail } from 'lucide-react';
import { ArulLogo } from './ArulLogo';

interface NavbarProps {
  isAudioPlaying?: boolean;
  onToggleAudio?: () => void;
  onOpenContact: () => void;
  onOpenHandbook: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isAudioPlaying,
  onToggleAudio,
  onOpenContact,
  onOpenHandbook,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Manifesto', href: '#manifesto' },
    { label: 'Grid', href: '#network' },
  ];

  const whatsappUrl =
    'https://wa.me/917558032254?text=Hello%20Arul%20Brand%20Co%2C%20I%20would%20like%20to%20discuss%20a%20project%20partnership.';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-neutral-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)]'
            : 'bg-white/80 backdrop-blur-md border-b border-neutral-200/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer shrink-0">
            <ArulLogo size="sm" className="transform group-hover:scale-105 transition-transform shrink-0" />
            <span className="font-display font-black text-lg sm:text-xl tracking-tight uppercase leading-none">
              <span className="text-black group-hover:text-neutral-800 transition-colors">ARUL BRAND </span>
              <span className="text-[#ff5500]">CO.</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-neutral-600 hover:text-black transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={onOpenHandbook}
              className="text-neutral-600 hover:text-black transition-colors cursor-pointer uppercase"
            >
              The Handbook
            </button>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Collaborate CTA Button */}
            <button
              onClick={onOpenContact}
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-black tracking-wider uppercase text-white bg-black hover:bg-neutral-800 rounded-md transition-all transform active:scale-95 shadow-md whitespace-nowrap cursor-pointer"
            >
              Collaborate
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-1.5 text-neutral-700 hover:text-black cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-2xl border-b border-neutral-200 md:hidden shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 text-xs uppercase tracking-wider font-semibold text-neutral-800 hover:text-black hover:bg-neutral-100 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenHandbook();
              }}
              className="px-3 py-2.5 text-xs uppercase tracking-wider font-semibold text-neutral-800 hover:text-black hover:bg-neutral-100 rounded-md transition-colors text-left cursor-pointer"
            >
              The Handbook
            </button>

            {/* Direct Contact Buttons in Drawer */}
            <div className="pt-3 border-t border-neutral-200 mt-1 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onOpenContact();
                }}
                className="w-full px-4 py-2.5 text-xs uppercase tracking-wider font-black text-white bg-black hover:bg-neutral-800 rounded-md transition-colors cursor-pointer"
              >
                Collaborate With Us
              </button>

              <div className="grid grid-cols-2 gap-2 mt-1">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-md bg-[#25D366]/10 border border-[#25D366]/30 text-[#128C7E] font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current text-[#25D366]" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href="mailto:contact@arulbrandco.com"
                  className="px-3 py-2 rounded-md bg-neutral-100 border border-neutral-300 text-black font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-[#ff5500]" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};
