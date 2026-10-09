import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CaseStudyModal, CampaignData } from './CaseStudyModal';

const CAMPAIGNS: CampaignData[] = [
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

export const WorkShowcase: React.FC = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignData | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredCampaigns = activeFilter === 'all'
    ? CAMPAIGNS
    : CAMPAIGNS.filter((c) =>
        activeFilter === 'film'
          ? c.category.includes('Film') || c.category.includes('Cinema')
          : activeFilter === 'branding'
          ? c.category.includes('Branding') || c.category.includes('Spatial')
          : true
      );

  return (
    <section id="work" className="relative w-full py-24 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FF7A00] block mb-2">
              Featured Work &middot; Portfolio
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-neutral-950 tracking-tighter font-display">
              Selected Work
            </h2>
          </div>

          {/* Interactive filter tabs (clean segmented buttons per frontend-design guidelines) */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-100 border border-neutral-200 rounded-xl">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#FF7A00] text-white font-bold shadow-md'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              All Campaigns
            </button>
            <button
              onClick={() => setActiveFilter('film')}
              className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                activeFilter === 'film'
                  ? 'bg-[#FF7A00] text-white font-bold shadow-md'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Film &amp; Culture
            </button>
            <button
              onClick={() => setActiveFilter('branding')}
              className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                activeFilter === 'branding'
                  ? 'bg-[#FF7A00] text-white font-bold shadow-md'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Spatial &amp; Identity
            </button>
          </div>
        </div>

        {/* 3 Main Campaign Columns mirroring reference screenshot 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              onClick={() => setSelectedCampaign(campaign)}
              className="group cursor-pointer flex flex-col justify-between rounded-2xl bg-white border border-neutral-200 overflow-hidden hover:border-[#FF7A00]/60 hover:shadow-[0_12px_40px_rgba(255,122,0,0.14)] transition-all duration-300 transform hover:-translate-y-1.5 shadow-sm"
            >
              {/* Media Card Container */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-900">
                {campaign.video ? (
                  <video
                    src={campaign.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-100"
                  />
                ) : (
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-75 group-hover:opacity-50 transition-opacity" />

                {/* Subtle Client & Year watermark tag */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/90">
                  <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                    {campaign.client}
                  </span>
                  <span className="text-[#FF7A00] font-semibold bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10">{campaign.year}</span>
                </div>
              </div>

              {/* Refined Luxury Editorial Caption */}
              <div className="p-6 bg-white flex flex-col justify-between flex-1 border-t border-neutral-100">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF7A00] font-semibold mb-2 block">
                    {campaign.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-neutral-900 group-hover:text-[#FF7A00] transition-colors leading-snug tracking-tight font-display">
                    {campaign.title}
                  </h3>
                </div>

                <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-500 font-medium">{campaign.impactMetric}</span>
                  <span className="flex items-center gap-1.5 text-[#FF7A00] font-bold group-hover:translate-x-1 transition-transform">
                    <span>View Story</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* End of Featured Campaigns Grid */}
      </div>

      {/* Case Study Detail Modal */}
      <CaseStudyModal
        campaign={selectedCampaign}
        onClose={() => setSelectedCampaign(null)}
      />
    </section>
  );
};
