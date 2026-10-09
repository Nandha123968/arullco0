import React, { useState, useMemo } from 'react';
import {
  X,
  CheckCircle,
  Compass,
  Award,
  BookOpen,
  Target,
  ArrowRight,
  Copy,
  Check,
  Search,
  ExternalLink,
  Shield,
  Zap,
} from 'lucide-react';
import { ArulLogo } from './ArulLogo';

interface HandbookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChapterSection {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  blocks: {
    heading?: string;
    description?: string;
    bullets?: string[];
    callout?: string;
    numberedList?: { step: string; text: string }[];
  }[];
}

export const HandbookModal: React.FC<HandbookModalProps> = ({ isOpen, onClose }) => {
  const [activeChapter, setActiveChapter] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 100% Client-Facing, Professional Agency Playbook Chapters (No internal developer notes)
  const chapters: ChapterSection[] = [
    {
      id: 'manifesto',
      number: '01',
      title: 'The Agency Manifesto',
      subtitle: 'Depth beats distraction · One category, one partner, all in',
      icon: Target,
      tag: 'Core Belief',
      blocks: [
        {
          heading: 'Why Arul Brand Co. Exists',
          description:
            'We founded Arul Brand Co. to build a high-conviction creative and strategic growth partner. Most holding-company agencies chase hundreds of competing accounts, spreading creative attention thin. We reject that model. We choose one ambitious brand per category and go all in.',
        },
        {
          heading: 'Our Non-Negotiable Tenets',
          bullets: [
            'One category. One partner. All in — your direct competitor will never be our client.',
            'Truth over convenience — we tell founders what they need to hear, not what is politically comfortable.',
            'Strategy before execution — we build campaigns that convert culture and attention into enduring enterprise value.',
            'Outcomes over optics — awards are meaningless if they do not measurably move your business forward.',
          ],
          callout:
            'Depth beats distraction. When you have our team, you have our undivided creative mind and full strategic conviction.',
        },
      ],
    },
    {
      id: 'operating-engine',
      number: '02',
      title: 'How We Build & Scale',
      subtitle: 'Strategy → Creative → Distribution → Enterprise Growth',
      icon: Compass,
      tag: 'Methodology',
      blocks: [
        {
          heading: 'Our 4-Phase Growth Framework',
          description:
            'Every monumental brand campaign we deploy follows a rigorous, battle-tested system designed to capture category leadership:',
          numberedList: [
            { step: '01', text: 'Category Diagnosis & Radical Insight Mining' },
            { step: '02', text: 'Brand Positioning & Strategic Architecture' },
            { step: '03', text: 'High-Fashion Creative Direction & Media Craft' },
            { step: '04', text: 'Targeted Distribution, AI Fitting Tech & Conversion' },
          ],
        },
        {
          heading: 'Speed & Standards',
          bullets: [
            'We prototype fast, test with real audiences, and iterate relentlessly.',
            'Zero commoditized filler: every frame, headline, and pixel is crafted to stop the scroll.',
            'Direct access to senior partners — no bloated agency layers or inexperienced handoffs.',
          ],
          callout:
            'We do not do marketing for everyone. We build unfair commercial advantages for the ambitious few.',
        },
      ],
    },
    {
      id: 'category-exclusivity',
      number: '03',
      title: 'Category Exclusivity Agreement',
      subtitle: 'Your competitor will never be our client',
      icon: Shield,
      tag: 'Exclusivity',
      blocks: [
        {
          heading: 'Our Conflict-Free Commitment',
          description:
            'Conventional agencies regularly service direct rival brands under separate teams in the same office. We find that practice intellectually bankrupt. At Arul Brand Co., when we sign a partner in bespoke tailoring, luxury couture, or electric mobility, that category is permanently locked.',
        },
        {
          bullets: [
            '100% intellectual confidentiality and proprietary campaign data separation.',
            'Unreserved commitment: all category insights and breakthroughs belong exclusively to you.',
            'We do not compete against ourselves. We partner to win.',
          ],
          callout:
            'Total loyalty produces fearless creative work. We invest in long-term relationships where our incentives are completely aligned with yours.',
        },
      ],
    },
    {
      id: 'culture-and-people',
      number: '04',
      title: 'People, Culture & Values',
      subtitle: 'A people-first creative studio built for enduring craft',
      icon: Zap,
      tag: 'Culture',
      blocks: [
        {
          heading: 'Creative Excellence Requires Safe, Empowered Minds',
          description:
            'Our work is bold because our culture is fearless. We are building an independent agency where brilliant talent does their life’s best work without toxic holding-company politics.',
        },
        {
          bullets: [
            'Equal pay for equal work with direct equity participation pools.',
            'Cynicism is the death of creativity — we default to relentless ambition and optimism.',
            'Do great work. Get great sleep. Sustainable stamina beats burn-and-churn.',
            'Disagree with respect, commit with passion, and celebrate each other loudly.',
          ],
          callout:
            'Show the work and you are golden. We take complete, radical ownership of every brief we touch.',
        },
      ],
    },
    {
      id: 'partnership-criteria',
      number: '05',
      title: 'Who We Partner With',
      subtitle: 'Good businesses. Ambitious founders. No BS.',
      icon: Award,
      tag: 'Partnership',
      blocks: [
        {
          heading: 'What We Look For In A Partner',
          bullets: [
            'Founders and executives who view brand as an asset, not an expense line item.',
            'Willingness to take creative risks that make competitors uncomfortable.',
            'Appetite for category transformation rather than incremental copy-pasting.',
            'Mutual respect, rapid decision velocity, and trust in master craftsmanship.',
          ],
        },
        {
          heading: 'What We Refuse To Do',
          bullets: [
            'No unpaid speculative pitch theater — our portfolio and track record speak for themselves.',
            'No vanity impression vanity metrics that fail to generate revenue.',
            'No commoditized retainers with zero strategic accountability.',
          ],
          callout:
            'If you are ready to define your category, we are ready to go all in with you.',
        },
      ],
    },
  ];

  const filteredChapters = useMemo(() => {
    if (!searchQuery.trim()) return chapters;
    const q = searchQuery.toLowerCase();
    return chapters.filter(
      (ch) =>
        ch.title.toLowerCase().includes(q) ||
        ch.subtitle.toLowerCase().includes(q) ||
        ch.blocks.some(
          (b) =>
            (b.heading && b.heading.toLowerCase().includes(q)) ||
            (b.description && b.description.toLowerCase().includes(q)) ||
            (b.callout && b.callout.toLowerCase().includes(q)) ||
            (b.bullets && b.bullets.some((bull) => bull.toLowerCase().includes(q)))
        )
    );
  }, [chapters, searchQuery]);

  const activeData = chapters[activeChapter] || chapters[0];

  const handleCopyManifesto = () => {
    const text = `ARUL BRAND CO. — THE AGENCY PLAYBOOK
Bengaluru • Chennai • India

1. THE MANIFESTO:
We don't do marketing for everyone. We choose one ambitious brand per category and go all in.
Depth beats distraction. Truth over convenience. Outcomes over optics.

2. CATEGORY EXCLUSIVITY:
Your direct competitor will never be our client. All insights and campaign craft belong exclusively to you.

3. METHODOLOGY:
Strategy → Creative Direction → High-Fashion Media Craft → Distribution & Enterprise Growth.

4. CULTURE:
People first. Extreme transparency. Cynicism is the death of creativity.

Inquiries: contact@arulbrandco.com | WhatsApp: +91 7558032254 | Instagram: @arulbrandco`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      {/* Main Luxury White Editorial Card */}
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-white border border-neutral-200/90 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.22)] overflow-hidden flex flex-col text-neutral-900">
        
        {/* ==================== 1. TOP HEADER ==================== */}
        <div className="px-5 sm:px-8 py-4 sm:py-4.5 border-b border-neutral-200 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3.5">
            <ArulLogo size="sm" className="shrink-0 shadow-xs" />
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-neutral-100 text-neutral-700 font-bold border border-neutral-200 tracking-wider">
                  Official Playbook
                </span>
                <span className="text-xs text-neutral-500 font-mono hidden sm:inline">
                  Operating Charter &bull; Arul Brand Co.
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-neutral-950 tracking-tight font-display mt-0.5">
                The Arul Brand Co. Handbook
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyManifesto}
              className="px-3 py-1.5 rounded-lg text-xs font-mono bg-white border border-neutral-200 hover:border-black text-neutral-700 hover:text-black transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
              title="Copy Playbook Summary"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#00b83e]" />
                  <span className="text-[#00b83e] font-semibold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-500" />
                  <span className="hidden sm:inline">Copy Playbook</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label="Close Playbook"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ==================== 2. SEARCH & SUBHEADER ==================== */}
        <div className="px-5 sm:px-8 py-2.5 bg-neutral-50/90 border-b border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search playbook & philosophy..."
              className="w-full bg-white border border-neutral-200 focus:border-black focus:ring-1 focus:ring-black rounded-lg pl-8 pr-3 py-1.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none transition-all shadow-2xs"
            />
          </div>
          <div className="text-[11px] font-mono text-neutral-600 flex items-center gap-2.5 sm:gap-3 flex-wrap">
            <a
              href="mailto:contact@arulbrandco.com"
              className="text-neutral-600 hover:text-black transition-colors"
            >
              contact@arulbrandco.com
            </a>
            <span className="text-neutral-300">|</span>
            <a
              href="https://wa.me/917558032254?text=Hello%20Arul%20Brand%20Co%2C%20I%20would%20like%20to%20discuss%20a%20project%20partnership."
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#008f30] hover:text-[#00b83e] font-semibold"
            >
              WhatsApp: +91 7558032254
            </a>
          </div>
        </div>

        {/* ==================== 3. MODAL BODY ==================== */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          
          {/* Chapter Tabs */}
          <div className="w-full md:w-76 border-b md:border-b-0 md:border-r border-neutral-200 p-2.5 sm:p-4 flex flex-row md:flex-col overflow-x-auto md:overflow-y-auto gap-2 md:space-y-1 shrink-0 bg-neutral-50/60">
            <p className="hidden md:block text-[10px] font-mono uppercase tracking-widest text-neutral-400 px-3 py-1 font-semibold">
              Playbook Chapters ({chapters.length})
            </p>
            {filteredChapters.map((ch) => {
              const Icon = ch.icon;
              const originalIndex = chapters.findIndex((c) => c.id === ch.id);
              const isActive = originalIndex === activeChapter;
              return (
                <button
                  key={ch.id}
                  onClick={() => setActiveChapter(originalIndex)}
                  className={`shrink-0 md:w-full min-w-[160px] sm:min-w-[180px] md:min-w-0 text-left px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl text-xs transition-all flex items-start gap-2.5 sm:gap-3 cursor-pointer ${
                    isActive
                      ? 'bg-black text-white font-semibold shadow-md'
                      : 'text-neutral-600 hover:text-black hover:bg-neutral-100/90 border border-transparent'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 mt-0.5 ${
                      isActive ? 'text-[#ff5500]' : 'text-neutral-400'
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`font-mono text-[10px] ${isActive ? 'text-neutral-300' : 'text-neutral-400'}`}>
                        {ch.number}.
                      </span>
                      <span
                        className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border ${
                          isActive
                            ? 'bg-white/15 text-white border-white/20'
                            : 'bg-white text-neutral-500 border-neutral-200'
                        }`}
                      >
                        {ch.tag}
                      </span>
                    </div>
                    <div className={`truncate font-semibold text-xs mt-1 ${isActive ? 'text-white' : 'text-neutral-900'}`}>
                      {ch.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Chapter Content View */}
          <div className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto bg-white">
            {/* Header Info */}
            <div className="border-b border-neutral-100 pb-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-[#ff5500] font-bold tracking-widest uppercase">
                  Chapter {activeData.number}
                </span>
                <span className="text-neutral-300">&bull;</span>
                <span className="text-xs font-mono text-neutral-500">{activeData.tag}</span>
              </div>
              <h4 className="text-2xl sm:text-3xl font-black text-neutral-950 font-display tracking-tight">
                {activeData.title}
              </h4>
              <p className="text-sm sm:text-[15px] text-neutral-600 mt-1 font-normal leading-relaxed">
                {activeData.subtitle}
              </p>
            </div>

            {/* Content Blocks */}
            <div className="space-y-4">
              {activeData.blocks.map((block, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-neutral-50/70 border border-neutral-200/80 shadow-2xs space-y-3.5 hover:border-neutral-300 transition-colors"
                >
                  {block.heading && (
                    <h5 className="text-sm sm:text-base font-bold text-neutral-950 tracking-tight flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#ff5500]" />
                      <span>{block.heading}</span>
                    </h5>
                  )}

                  {block.description && (
                    <p className="text-neutral-700 text-sm sm:text-[15px] leading-relaxed font-normal">
                      {block.description}
                    </p>
                  )}

                  {block.numberedList && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {block.numberedList.map((item, nIdx) => (
                        <div
                          key={nIdx}
                          className="flex items-center gap-3 p-3 rounded-xl bg-white border border-neutral-200 shadow-2xs"
                        >
                          <span className="w-6 h-6 rounded-full bg-neutral-100 border border-neutral-250 text-neutral-900 font-mono text-xs flex items-center justify-center font-bold">
                            {item.step}
                          </span>
                          <span className="text-xs sm:text-sm font-semibold text-neutral-900">
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {block.bullets && (
                    <ul className="space-y-2.5 pt-1 text-sm text-neutral-700">
                      {block.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-[#ff5500] shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {block.callout && (
                    <div className="mt-3.5 p-4 rounded-xl bg-amber-50/80 border-l-3 border-[#ff5500] text-neutral-850 font-medium text-xs sm:text-sm leading-relaxed">
                      {block.callout}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Navigator */}
            <div className="pt-6 border-t border-neutral-100 flex items-center justify-between">
              <button
                disabled={activeChapter === 0}
                onClick={() => setActiveChapter((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-xl text-xs font-mono bg-white border border-neutral-200 text-neutral-700 hover:text-black hover:border-neutral-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                &larr; Previous Chapter
              </button>

              <button
                disabled={activeChapter === chapters.length - 1}
                onClick={() => setActiveChapter((prev) => Math.min(chapters.length - 1, prev + 1))}
                className="px-5 py-2.5 rounded-xl text-xs font-mono bg-black hover:bg-neutral-850 text-white font-bold disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1.5 shadow-sm transition-all"
              >
                <span>Next Chapter</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ==================== 4. FOOTER ==================== */}
        <div className="px-5 sm:px-8 py-3.5 border-t border-neutral-200 bg-neutral-50/90 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-neutral-600">
              ARUL BRAND CO. &bull; Bengaluru &bull; Chennai
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/arulbrandco?stkn=bjN4N2loMWZrYnVs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-black text-xs font-mono transition-colors flex items-center gap-1"
            >
              <span>@arulbrandco</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={onClose}
              className="px-5 py-2 bg-black hover:bg-neutral-850 text-white font-bold rounded-lg transition-colors cursor-pointer text-xs uppercase tracking-wider shadow-sm"
            >
              Done Reading
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
