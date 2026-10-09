import React, { useState, useRef } from 'react';
import { CaseStudyModal, CampaignData } from './CaseStudyModal';
import { Play, Instagram } from 'lucide-react';

const CAMPAIGN_STORIES: CampaignData[] = [
  {
    id: 'derby-tailor-studio',
    title: 'Derby Tailor Studio: The Art of Bespoke Sartorial Craft & Heritage',
    client: 'Derby Tailor Studio',
    year: '2025',
    category: 'Bespoke Craft & Fashion Film',
    image: '/src/assets/images/campaign_tamil_heritage_1791346991227.jpg',
    video: 'https://res.cloudinary.com/icneupdz/video/upload/v1791352991/IMG_5217.mp4',
    instagramUrl: 'https://www.instagram.com/reel/DcV91alz8d2/?utm_source=ig_web_copy_link&stkn=NTc4MTIwNjQ2YQ==',
    impactMetric: '985K views · 51.1K likes · 3.1K shares · 3.8K saves',
    summary: 'A cinematic brand film capturing the heritage art of bespoke suit crafting, precision measurements, and timeless sartorial tailoring at Derby Tailor Studio.',
    theBrief: 'Derby Tailor Studio required a high-fashion editorial visual identity and cinematic film to showcase their handcrafted bespoke tailoring experience to modern discerning clients.',
    theInsight: 'Influencer led content built around culture, storytelling and shareability.',
    theExecution: 'Produced a tactile, macro-cinematography brand film celebrating shears slicing through Italian wools, hand-stitched lapels, and the quiet luxury of Derby Tailor Studio.',
    credits: [
      { role: 'Creative Director', name: 'Arul & Creative Team' },
      { role: 'Director of Photography', name: 'Studio Lens Collective' },
      { role: 'Fashion Stylist', name: 'Rhea Joseph' },
      { role: 'Master Tailor', name: 'Derby Tailor Studio Artisans' },
    ],
  },
  {
    id: 'mizaj-coimbatore',
    title: "Mizaj Coimbatore: South India's First AI-Powered Virtual Blazer Fitting & Bespoke Atelier",
    client: 'Mizaj Coimbatore',
    year: '2025',
    category: 'AI Fashion Tech & Bespoke Suiting',
    image: '/src/assets/images/campaign_fifa_cup_1791347003083.jpg',
    video: 'https://res.cloudinary.com/icneupdz/video/upload/v1791353762/IMG_5219.mp4',
    instagramUrl: 'https://www.instagram.com/reel/DSyvYD7k4cJ/?utm_source=ig_web_copy_link&xtok=NTc4MTIwNjQ2YQ==',
    impactMetric: '720K views · 10.3K likes · 10.6K shares · 6K saves',
    summary: 'Mizaj Coimbatore makes history by introducing AI-powered virtual try-on styling: checking silhouette compatibility and testing custom blazer cuts on clients before tailoring their custom suit.',
    theBrief: 'Mizaj Coimbatore wanted to pioneer the next generation of bespoke menswear in Tamil Nadu by combining cutting-edge AI body-matching technology with master artisanal blazer tailoring.',
    theInsight: 'Creator driven content designed to generate organic attention at scale.',
    theExecution: "Launched Coimbatore's first AI virtual styling experience where customers test blazer styles digitally, followed by precision bespoke tailoring by master craftsmen.",
    credits: [
      { role: 'Creative Direction', name: 'Arul & Fashion Tech Team' },
      { role: 'Client & Master Tailors', name: 'Mizaj Coimbatore Atelier' },
      { role: 'AI Styling Technology', name: 'Mizaj Smart Fit AI' },
      { role: 'Film & Visual Identity', name: 'arulbrandco Studio' },
    ],
  },
  {
    id: 'mizaj-creator-campaign',
    title: 'Mizaj: High-Performance Creator Campaign & Cultural Brand Storytelling',
    client: 'Mizaj',
    year: '2025',
    category: 'Creator Campaign & Lifestyle Fashion Film',
    image: '/src/assets/images/campaign_heirloom_cinema_1791347014403.jpg',
    video: 'https://res.cloudinary.com/icneupdz/video/upload/v1791354800/IMG_5220.mp4',
    instagramUrl: 'https://www.instagram.com/reel/DUnhIJqk0e5/?utm_source=ig_web_copy_link&obrf=NTc4MTIwNjQ2YQ==',
    impactMetric: '432K views · 19.2K likes · 1.2K shares · 1.2K saves',
    summary: 'Another campaign demonstrating how the right idea and creator can outperform conventional brand content for Mizaj.',
    theBrief: 'Mizaj wanted a high-impact creator collaboration to prove how tailored menswear and cultural relevance create organic virality.',
    theInsight: 'Another campaign demonstrating how the right idea and creator can outperform conventional brand content.',
    theExecution: 'Crafted dynamic, high-engagement lifestyle video content featuring creator talent, demonstrating how authentic storytelling commands attention.',
    credits: [
      { role: 'Creative Direction', name: 'Arul & Creative Team' },
      { role: 'Client', name: 'Mizaj' },
      { role: 'Featured Creator', name: 'MD Musiq' },
      { role: 'Film & Visual Identity', name: 'arulbrandco Studio' },
    ],
  },
];

interface ShowcaseGridProps {
  onOpenContact?: () => void;
}

export const ShowcaseGrid: React.FC<ShowcaseGridProps> = ({ onOpenContact }) => {
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignData | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const togglePause = () => {
    const nextPaused = !isPaused;
    setIsPaused(nextPaused);
    videoRefs.current.forEach((video) => {
      if (video) {
        if (nextPaused) {
          video.pause();
        } else {
          video.play().catch(() => {});
        }
      }
    });
  };

  return (
    <section id="work" className="relative w-full py-16 sm:py-24 bg-white text-black select-none border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* 3-Column Grid with Perfect Baseline Alignment */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* ===================== COLUMN 1 ===================== */}
          <div className="flex flex-col gap-5 sm:gap-6">
            {/* Top Press Box: Forbes */}
            <div className="p-4 sm:p-5 bg-neutral-50 border border-neutral-300 rounded-none min-h-[150px] sm:min-h-[165px] flex flex-col justify-between hover:border-black transition-colors">
              <div className="flex items-start gap-4">
                <div className="shrink-0 pt-0.5">
                  <span className="font-serif font-bold text-xl sm:text-2xl text-black tracking-wider">
                    Forbes
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="text-xs sm:text-[13px] font-bold text-black leading-snug">
                    advertising agency: Arul &amp; Creative Partners of arulbrandco
                  </h4>
                  <p className="mt-1 text-[11px] sm:text-xs text-neutral-600 leading-normal line-clamp-3">
                    In their first interview about leaving legacy holding networks, the founders explain how they are building a modern creative shop with a people-first approach.
                  </p>
                </div>
              </div>
              <div className="mt-2 text-[10px] text-neutral-500 font-mono">
                Forbes India &bull; Industry Profile
              </div>
            </div>

            {/* Bottom Campaign Card: Derby Tailor Studio - Direct Instagram Reel */}
            <a
              href={CAMPAIGN_STORIES[0].instagramUrl || "https://www.instagram.com/reel/DcV91alz8d2/?utm_source=ig_web_copy_link&stkn=NTc4MTIwNjQ2YQ=="}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="watch"
              title="Watch Derby Tailor Studio on Instagram"
              className="group cursor-pointer flex flex-col transition-all duration-300 block"
            >
              {/* Media Visual with Video Stream */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-900 shadow-md">
                {CAMPAIGN_STORIES[0].video ? (
                  <video
                    ref={(el) => {
                      videoRefs.current[0] = el;
                    }}
                    src={CAMPAIGN_STORIES[0].video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-100"
                  />
                ) : (
                  <img
                    src={CAMPAIGN_STORIES[0].image}
                    alt={CAMPAIGN_STORIES[0].title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-100"
                  />
                )}
                {/* Subtle Client Watermark */}
                <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
                  <span className="bg-black/80 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-mono text-white border border-white/10 uppercase tracking-wider">
                    {CAMPAIGN_STORIES[0].client}
                  </span>
                </div>

                {/* Direct Instagram Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono text-white border border-white/10 group-hover:border-[#ff5500] group-hover:text-[#ff5500] transition-colors pointer-events-none">
                  <Instagram className="w-3.5 h-3.5 text-[#ff5500]" />
                  <span className="tracking-wider uppercase">Instagram Reel &nearr;</span>
                </div>
              </div>

              {/* Attached Border Box */}
              <div className="mt-3 p-3.5 bg-neutral-50 border border-neutral-300 group-hover:border-black transition-colors flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-1">
                    Selected Work &bull; Derby Tailor Studio
                  </div>
                  <p className="text-xs sm:text-[13px] font-semibold text-black leading-snug underline underline-offset-4 decoration-[#ff5500] group-hover:text-[#ff5500] transition-colors">
                    {CAMPAIGN_STORIES[0].title}
                  </p>
                </div>
                <div className="mt-2.5 pt-2 border-t border-neutral-200/90 flex flex-col gap-1">
                  <span className="text-[11px] font-mono text-[#ff5500] font-bold tracking-tight">
                    985K views &bull; 51.1K likes &bull; 3.1K shares &bull; 3.8K saves
                  </span>
                  <p className="text-[11px] text-neutral-600 font-medium leading-relaxed">
                    Influencer led content built around culture, storytelling and shareability.
                  </p>
                </div>
              </div>
            </a>
          </div>

          {/* ===================== COLUMN 2 ===================== */}
          <div className="flex flex-col gap-5 sm:gap-6">
            {/* Top Press Box: Value Creation Memo */}
            <div className="p-4 sm:p-5 bg-neutral-50 border border-neutral-300 rounded-none min-h-[150px] sm:min-h-[165px] flex flex-col justify-between hover:border-black transition-colors">
              <div>
                <p className="text-xs sm:text-[13px] font-bold text-black leading-snug">
                  Updates on employee compensation &amp;{' '}
                  <span className="bg-[#ff5500] text-white px-1.5 py-0.5 font-bold rounded-xs">value creation.</span>
                </p>
                <p className="mt-2 text-[11px] sm:text-xs text-neutral-600 leading-normal line-clamp-3">
                  All arulbrandco full-time employees participate directly in agency equity and long-term client value creation pools.
                </p>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-neutral-200 border border-neutral-300 flex items-center justify-center text-[10px] text-black font-bold">
                  A
                </div>
                <div className="text-[10px] text-neutral-600 font-mono">
                  <span className="text-black font-semibold">Arul</span> Co-Founder &amp; CEO at arulbrandco
                </div>
              </div>
            </div>

            {/* Bottom Campaign Card: Mizaj Coimbatore AI Blazer - Direct Instagram Reel */}
            <a
              href={CAMPAIGN_STORIES[1].instagramUrl || "https://www.instagram.com/reel/DSyvYD7k4cJ/?utm_source=ig_web_copy_link&xtok=NTc4MTIwNjQ2YQ=="}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="watch"
              title="Watch Mizaj on Instagram Reel"
              className="group cursor-pointer flex flex-col transition-all duration-300 block"
            >
              {/* Media Visual with Video Stream */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-900 shadow-md">
                {CAMPAIGN_STORIES[1].video ? (
                  <video
                    ref={(el) => {
                      videoRefs.current[1] = el;
                    }}
                    src={CAMPAIGN_STORIES[1].video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-100"
                  />
                ) : (
                  <img
                    src={CAMPAIGN_STORIES[1].image}
                    alt={CAMPAIGN_STORIES[1].title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-100"
                  />
                )}
                {/* Subtle Client Watermark */}
                <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
                  <span className="bg-black/80 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-mono text-white border border-white/10 uppercase tracking-wider">
                    {CAMPAIGN_STORIES[1].client}
                  </span>
                </div>

                {/* Direct Instagram Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono text-white border border-white/10 group-hover:border-[#ff5500] group-hover:text-[#ff5500] transition-colors pointer-events-none">
                  <Instagram className="w-3.5 h-3.5 text-[#ff5500]" />
                  <span className="tracking-wider uppercase">Instagram Reel &nearr;</span>
                </div>
              </div>

              {/* Attached Border Box */}
              <div className="mt-3 p-3.5 bg-neutral-50 border border-neutral-300 group-hover:border-black transition-colors flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-1">
                    Selected Work &bull; Mizaj
                  </div>
                  <p className="text-xs sm:text-[13px] font-semibold text-black leading-snug underline underline-offset-4 decoration-[#ff5500] group-hover:text-[#ff5500] transition-colors">
                    {CAMPAIGN_STORIES[1].title}
                  </p>
                </div>
                <div className="mt-2.5 pt-2 border-t border-neutral-200/90 flex flex-col gap-1">
                  <span className="text-[11px] font-mono text-[#ff5500] font-bold tracking-tight">
                    720K views &bull; 10.3K likes &bull; 10.6K shares &bull; 6K saves
                  </span>
                  <p className="text-[11px] text-neutral-600 font-medium leading-relaxed">
                    Creator driven content designed to generate organic attention at scale.
                  </p>
                </div>
              </div>
            </a>
          </div>

          {/* ===================== COLUMN 3 ===================== */}
          <div className="flex flex-col gap-5 sm:gap-6">
            {/* Top Press Box: Brand Equity / Next Uncommon */}
            <div className="p-4 sm:p-5 bg-neutral-50 border border-neutral-300 rounded-none min-h-[150px] sm:min-h-[165px] flex flex-col justify-between hover:border-black transition-colors">
              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 shrink-0 bg-[#ff5500] text-white font-black flex items-center justify-center text-xs font-mono rounded-xs">
                  B
                </div>
                <div>
                  <h4 className="text-xs sm:text-[13px] font-bold text-black leading-snug">
                    arulbrandco: is "the Next Uncommon" Being Built in India?
                  </h4>
                  <p className="mt-1 text-[11px] sm:text-xs text-neutral-600 leading-normal line-clamp-3">
                    Brand Equity examines the independent studio model challenging legacy advertising holding companies across South India.
                  </p>
                </div>
              </div>
              <div className="mt-2 text-[10px] text-neutral-500 font-mono">
                Brand Equity &bull; Agency Feature
              </div>
            </div>

            {/* Bottom Campaign Card: Mizaj Creator Campaign - Direct Instagram Reel */}
            <a
              href={CAMPAIGN_STORIES[2].instagramUrl || "https://www.instagram.com/reel/DUnhIJqk0e5/?utm_source=ig_web_copy_link&obrf=NTc4MTIwNjQ2YQ=="}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="watch"
              title="Watch Mizaj on Instagram Reel"
              className="group cursor-pointer flex flex-col transition-all duration-300 block"
            >
              {/* Media Visual with Video Stream */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-900 shadow-md">
                {CAMPAIGN_STORIES[2].video ? (
                  <video
                    ref={(el) => {
                      videoRefs.current[2] = el;
                    }}
                    src={CAMPAIGN_STORIES[2].video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-100"
                  />
                ) : (
                  <img
                    src={CAMPAIGN_STORIES[2].image}
                    alt={CAMPAIGN_STORIES[2].title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-100"
                  />
                )}
                {/* Subtle Client Watermark */}
                <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
                  <span className="bg-black/80 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-mono text-white border border-white/10 uppercase tracking-wider">
                    {CAMPAIGN_STORIES[2].client}
                  </span>
                </div>

                {/* Direct Instagram Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono text-white border border-white/10 group-hover:border-[#ff5500] group-hover:text-[#ff5500] transition-colors pointer-events-none">
                  <Instagram className="w-3.5 h-3.5 text-[#ff5500]" />
                  <span className="tracking-wider uppercase">Instagram Reel &nearr;</span>
                </div>
              </div>

              {/* Attached Border Box */}
              <div className="mt-3 p-3.5 bg-neutral-50 border border-neutral-300 group-hover:border-black transition-colors flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-1">
                    Selected Work &bull; {CAMPAIGN_STORIES[2].client}
                  </div>
                  <p className="text-xs sm:text-[13px] font-semibold text-black leading-snug underline underline-offset-4 decoration-[#ff5500] group-hover:text-[#ff5500] transition-colors">
                    {CAMPAIGN_STORIES[2].title}
                  </p>
                </div>
                <div className="mt-2.5 pt-2 border-t border-neutral-200/90 flex flex-col gap-1">
                  <span className="text-[11px] font-mono text-[#ff5500] font-bold tracking-tight">
                    {CAMPAIGN_STORIES[2].impactMetric}
                  </span>
                  <p className="text-[11px] text-neutral-600 font-medium leading-relaxed">
                    {CAMPAIGN_STORIES[2].theInsight}
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Minimal Pause Indicator */}
        <div className="w-full flex justify-end mt-12 sm:mt-16">
          <button
            onClick={togglePause}
            className="text-neutral-400 hover:text-black transition-colors p-2 text-xs font-mono tracking-widest flex items-center gap-1 cursor-pointer"
            title={isPaused ? "Play videos" : "Pause videos"}
            aria-label="Pause button"
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

      {/* Case Study Modal with Full Story and Video */}
      <CaseStudyModal
        campaign={selectedCampaign}
        onClose={() => setSelectedCampaign(null)}
        onOpenContact={onOpenContact}
      />
    </section>
  );
};
