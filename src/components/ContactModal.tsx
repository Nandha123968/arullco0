import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageCircle, Mail, ArrowUpRight } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '$10k - $25k',
    scope: 'Brand Identity & Launch Campaign',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      company: '',
      budget: '$10k - $25k',
      scope: 'Brand Identity & Launch Campaign',
      message: '',
    });
    onClose();
  };

  const whatsappBaseUrl = 'https://wa.me/917558032254?text=';
  const customWhatsappMessage = encodeURIComponent(
    `Hello Arul Brand Co!\n\nName: ${formData.name || 'Partner'}\nCompany: ${
      formData.company || 'Brand'
    }\nEmail: ${formData.email || 'N/A'}\nScope: ${formData.scope}\nBudget: ${
      formData.budget
    }\n\nMessage: ${formData.message || 'I would like to explore partnering with your studio.'}`
  );
  const whatsappUrl = `${whatsappBaseUrl}${customWhatsappMessage}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white border border-neutral-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 sm:py-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/80">
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-neutral-900 font-display tracking-tight">
              Start Something Iconic With Us
            </h3>
            <p className="text-xs text-neutral-500 font-mono mt-0.5">
              arulbrand<span className="text-[#ff5500]">co</span> &middot; Client Partnerships &amp; Ventures
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="Close form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-7 overflow-y-auto">
          {/* Quick Contact Buttons Strip: WhatsApp & Gmail */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <a
              href="https://wa.me/917558032254?text=Hello%20Arul%20Brand%20Co%2C%20I%20would%20like%20to%20discuss%20a%20project%20partnership."
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 hover:border-[#25D366] text-neutral-900 transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#25D366] text-white flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4 fill-current" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-neutral-900 flex items-center gap-1">
                    <span>Chat on WhatsApp</span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500 font-semibold">
                    +91 7558032254
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#25D366] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href="mailto:contact@arulbrandco.com"
              className="p-3 rounded-xl bg-[#ff5500]/10 border border-[#ff5500]/30 hover:border-[#ff5500] text-neutral-900 transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#ff5500] text-white flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-neutral-900 flex items-center gap-1">
                    <span>Official Email</span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500 font-semibold">
                    contact@arulbrandco.com
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#ff5500] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {isSubmitted ? (
            <div className="py-8 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-[#ff5500]/10 border border-[#ff5500] flex items-center justify-center mb-4">
                <CheckCircle2 className="w-7 h-7 text-[#ff5500]" />
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-neutral-900 font-display mb-1.5">
                Transmission Received!
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-md mb-6 leading-relaxed">
                Thank you, {formData.name}. Our partners review each brief directly.
                Expect a response from Arul or our creative team within 24 hours at <strong>{formData.email}</strong>.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#20bd5a] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Ping Us on WhatsApp</span>
                </a>
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-neutral-200 text-neutral-800 font-bold text-xs uppercase tracking-wider hover:bg-neutral-300 transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-600 mb-1.5 uppercase">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Vignesh Arumugam"
                    className="w-full px-3.5 py-2 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder-neutral-400 text-xs sm:text-sm focus:outline-none focus:border-[#ff5500] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-600 mb-1.5 uppercase">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder-neutral-400 text-xs sm:text-sm focus:outline-none focus:border-[#ff5500] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-600 mb-1.5 uppercase">
                    Brand / Company
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Arul Brand Co"
                    className="w-full px-3.5 py-2 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder-neutral-400 text-xs sm:text-sm focus:outline-none focus:border-[#ff5500] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-600 mb-1.5 uppercase">
                    Planned Investment
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs sm:text-sm focus:outline-none focus:border-[#ff5500] transition-colors cursor-pointer"
                  >
                    <option value="$10k - $25k">$10k - $25k (Studio Sprint)</option>
                    <option value="$25k - $50k">$25k - $50k (Complete Campaign)</option>
                    <option value="$50k - $100k">$50k - $100k (Full Category Monopoly)</option>
                    <option value="$100k+">$100k+ (Enterprise Transformation)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-600 mb-1.5 uppercase">
                  Project Scope
                </label>
                <select
                  value={formData.scope}
                  onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs sm:text-sm focus:outline-none focus:border-[#ff5500] transition-colors cursor-pointer"
                >
                  <option value="Brand Identity & Launch Campaign">Brand Identity &amp; Launch Campaign</option>
                  <option value="AI Virtual Try-On & Spatial Web Experience">AI Virtual Try-On &amp; Spatial Web Experience</option>
                  <option value="Cinematic Fashion Film & Macro Direction">Cinematic Fashion Film &amp; Macro Direction</option>
                  <option value="Category Monopoly & Commercial Strategy">Category Monopoly &amp; Commercial Strategy</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-600 mb-1.5 uppercase">
                  What makes your brief ambitious?
                </label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about the challenge you are solving, target audience, and timeline..."
                  className="w-full px-3.5 py-2 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder-neutral-400 text-xs sm:text-sm focus:outline-none focus:border-[#ff5500] transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <span className="text-[11px] font-mono text-neutral-400 text-center sm:text-left">
                  Zero pitch spam &middot; Strict NDA respected
                </span>
                
                <div className="flex items-center gap-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md"
                    title="Send via WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>WhatsApp</span>
                  </a>

                  <button
                    type="submit"
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg bg-[#ff5500] hover:bg-[#e04b00] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Brief</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
