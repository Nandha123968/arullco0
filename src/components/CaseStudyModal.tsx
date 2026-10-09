import React, { useState, useRef } from 'react';
import { X, Award, Eye, Calendar, Sparkles, ExternalLink, Play, Pause, Volume2, VolumeX, ArrowRight, Instagram } from 'lucide-react';

export interface CampaignData {
  id: string;
  title: string;
  client: string;
  year: string;
  category: string;
  image: string;
  video?: string;
  badge?: string;
  impactMetric: string;
  summary: string;
  theBrief: string;
  theInsight: string;
  theExecution: string;
  instagramUrl?: string;
  credits: { role: string; name: string }[];
}

interface CaseStudyModalProps {
  campaign: CampaignData | null;
  onClose: () => void;
  onOpenContact?: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ campaign, onClose, onOpenContact }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!campaign) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white border border-neutral-200 rounded-2xl shadow-[0_30px_90px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col text-black">
        
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-neutral-200/80 flex items-center justify-between bg-neutral-50/80">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase bg-[#ff5500]/10 text-[#ff5500] font-bold border border-[#ff5500]/30 tracking-wider">
              {campaign.client}
            </span>
            <span className="text-neutral-400">&bull;</span>
            <span className="text-xs text-neutral-500 font-mono font-medium">{campaign.year}</span>
            <span className="text-neutral-400 hidden sm:inline">&bull;</span>
            <span className="text-xs text-neutral-600 font-mono hidden sm:inline">{campaign.category}</span>
            {campaign.instagramUrl && (
              <>
                <span className="text-neutral-400 hidden sm:inline">&bull;</span>
                <a
                  href={campaign.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono uppercase bg-[#ff5500]/10 text-[#ff5500] hover:bg-[#ff5500] hover:text-white transition-colors border border-[#ff5500]/30 font-bold"
                >
                  <Instagram className="w-3 h-3" />
                  <span>Instagram Reel</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-400 hover:text-black hover:bg-neutral-200/60 transition-colors cursor-pointer"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto">
          {/* Cinema Media Player Banner */}
          <div className="relative w-full aspect-video sm:h-96 overflow-hidden bg-neutral-950 group">
            {campaign.video ? (
              <>
                <video
                  ref={videoRef}
                  src={campaign.video}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover object-center filter brightness-[1.02]"
                />

                {/* Floating Media Controls on Video */}
                <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
                  <button
                    onClick={togglePlay}
                    className="p-2 rounded-lg bg-black/75 hover:bg-black text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg"
                    title={isPlaying ? "Pause Video" : "Play Video"}
                    aria-label="Play/Pause video"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-lg bg-black/75 hover:bg-black text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg"
                    title={isMuted ? "Unmute Audio" : "Mute Audio"}
                    aria-label="Toggle mute"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#ff5500]" />}
                  </button>
                </div>
              </>
            ) : (
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-full object-cover object-center"
              />
            )}

            {/* Impact Metric Floating Badge */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none">
              <span className="px-3.5 py-1.5 rounded-full bg-black/85 backdrop-blur-md text-[#ff5500] font-mono text-xs font-bold border border-[#ff5500]/40 shadow-xl tracking-wider">
                {campaign.impactMetric}
              </span>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Title & Summary */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-black tracking-tight leading-snug">
                {campaign.title}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-neutral-700 leading-relaxed font-normal">
                {campaign.summary}
              </p>
            </div>

            {/* The 3 Pillars of The Work: Brief / Insight / Execution */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-neutral-200">
              <div className="p-5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-bold">
                  01 &bull; The Brief
                </span>
                <h4 className="text-xs sm:text-sm font-semibold text-neutral-900 leading-relaxed">
                  {campaign.theBrief}
                </h4>
              </div>

              <div className="p-5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff5500] font-bold">
                  02 &bull; The Insight
                </span>
                <h4 className="text-xs sm:text-sm font-semibold text-neutral-900 leading-relaxed">
                  {campaign.theInsight}
                </h4>
              </div>

              <div className="p-5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#00b83e] font-bold">
                  03 &bull; The Execution
                </span>
                <h4 className="text-xs sm:text-sm font-semibold text-neutral-900 leading-relaxed">
                  {campaign.theExecution}
                </h4>
              </div>
            </div>

            {/* Production & Fashion Credits */}
            <div className="pt-6 border-t border-neutral-200">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold mb-4">
                Creative Direction &amp; Film Credits
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {campaign.credits.map((c, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-neutral-50 border border-neutral-200">
                    <span className="block text-[10px] font-mono text-neutral-500 uppercase">
                      {c.role}
                    </span>
                    <span className="block text-xs font-bold text-black mt-0.5">
                      {c.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Client CTA Banner */}
            <div className="p-6 sm:p-7 rounded-2xl bg-neutral-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h5 className="text-lg font-bold font-display text-white">
                  Ready to produce work of this magnitude?
                </h5>
                <p className="text-xs text-neutral-400 mt-1">
                  We take on only 1 direct category partner at a time.
                </p>
              </div>

              <button
                onClick={() => {
                  onClose();
                  if (onOpenContact) onOpenContact();
                }}
                className="px-6 py-3 rounded-xl bg-[#ff5500] hover:bg-[#e04b00] text-white font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-[0_4px_20px_rgba(255,85,0,0.4)] whitespace-nowrap cursor-pointer flex items-center gap-2"
              >
                <span>Inquire for Your Brand</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
