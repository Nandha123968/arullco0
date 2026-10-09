import React from 'react';
import { Instagram, Linkedin, Twitter, MessageCircle, Mail, Phone } from 'lucide-react';
import { ArulLogo } from './ArulLogo';

interface FooterProps {
  onOpenContact: () => void;
  onOpenHandbook: () => void;
  isAudioPlaying?: boolean;
  onToggleAudio?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact, onOpenHandbook }) => {
  const whatsappUrl =
    'https://wa.me/917558032254?text=Hello%20Arul%20Brand%20Co%2C%20I%20would%20like%20to%20discuss%20a%20project%20partnership.';

  return (
    <footer id="network" className="relative w-full bg-neutral-100 text-black py-14 sm:py-16 border-t border-neutral-300 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* 3-Column Footer Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Column 1 (Left): Brand Identity, Gmail & WhatsApp */}
          <div className="flex flex-col space-y-2 text-left font-display">
            <span className="font-display font-black text-lg text-black tracking-tight uppercase">
              ARUL BRAND <span className="text-[#ff5500]">CO.</span>
            </span>
            <p className="text-xs sm:text-[13px] text-neutral-600 font-normal">
              Strategic marketing, creative and growth studio.
            </p>
            <div className="pt-2 flex flex-col gap-2.5 text-xs sm:text-[13px] text-neutral-700">
              <div className="flex items-center gap-2">
                <span className="text-[#ff5500] font-semibold">Bengaluru &bull; Chennai</span>
                <span className="text-neutral-300">|</span>
                <a
                  href="tel:+917558032254"
                  className="hover:text-[#ff5500] transition-colors flex items-center gap-1 font-semibold"
                >
                  <Phone className="w-3.5 h-3.5 text-[#ff5500]" />
                  <span>+91 7558032254</span>
                </a>
              </div>

              {/* Direct Email */}
              <div className="flex items-center gap-2">
                <a
                  href="mailto:contact@arulbrandco.com"
                  className="hover:text-[#ff5500] text-black font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-[#ff5500]" />
                  <span>contact@arulbrandco.com</span>
                </a>
              </div>

              {/* Direct WhatsApp */}
              <div className="flex items-center gap-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#20bd5a] text-[#128C7E] font-bold transition-colors flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current text-[#25D366]" />
                  <span>WhatsApp: +91 7558032254</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2 (Center): Quick Links */}
          <div className="flex flex-col items-center justify-center text-center self-center py-2">
            <div className="flex items-center gap-4 text-xs font-display font-medium">
              <button
                onClick={onOpenContact}
                className="text-neutral-800 hover:text-[#ff5500] underline underline-offset-4 cursor-pointer transition-colors"
              >
                Start a Conversation
              </button>
              <span className="text-neutral-400">&bull;</span>
              <button
                onClick={onOpenHandbook}
                className="text-neutral-800 hover:text-[#ff5500] underline underline-offset-4 cursor-pointer transition-colors"
              >
                The Playbook
              </button>
            </div>
          </div>

          {/* Column 3 (Right): Social Icons & WhatsApp Action */}
          <div className="flex flex-col md:items-end space-y-3 text-left md:text-right">
            <div className="flex items-center gap-4 text-neutral-800">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                title="Chat on WhatsApp"
                className="hover:scale-110 text-[#25D366] transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
              </a>
              <a
                href="mailto:contact@arulbrandco.com"
                aria-label="Email"
                title="Email contact@arulbrandco.com"
                className="hover:scale-110 hover:text-[#ff5500] transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/arulbrandco?stkn=bjN4N2loMWZrYnVs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-[#ff5500] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/arul-r-942942194/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="Connect on LinkedIn"
                className="hover:text-[#ff5500] transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="hover:text-[#ff5500] transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>

            <div>
              <a
                href="https://www.instagram.com/arulbrandco?stkn=bjN4N2loMWZrYnVs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-display font-medium text-neutral-600 hover:text-[#ff5500] transition-colors"
              >
                @arulbrandco
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
