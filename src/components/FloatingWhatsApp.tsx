import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl =
    'https://wa.me/917558032254?text=Hello%20Arul%20Brand%20Co%2C%20I%20would%20like%20to%20discuss%20a%20project%20partnership.';

  return (
    <aside
      aria-label="WhatsApp Contact"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 select-none"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
        className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-md transition-colors cursor-pointer"
      >
        <MessageCircle className="w-6 h-6 fill-current text-white" />
      </a>
    </aside>
  );
};
