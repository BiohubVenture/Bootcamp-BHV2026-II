import React, { useState, useRef, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Sparkles, ShieldCheck, Dna, Bot, Leaf, Award } from 'lucide-react';

export default function VideoModal({ isOpen, onClose, videoData }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 1;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [isOpen, videoData]);

  if (!isOpen || !videoData) return null;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const IconComponent = videoData.icon || ShieldCheck;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bio-navyDark/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-sm sm:max-w-md bg-bio-navyDeep rounded-3xl shadow-2xl border-2 border-bio-green/30 overflow-hidden flex flex-col my-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-b from-black/90 via-black/50 to-transparent absolute top-0 left-0 right-0 z-30">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full bg-bio-green text-white font-black text-[10px] uppercase tracking-wider shadow-md">
              {videoData.tag || 'BHV Testimonio'}
            </span>
            <span className="text-white text-xs font-bold truncate max-w-[180px]">
              {videoData.company || 'Biohub Venture'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-bio-green transition-colors border border-white/20"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Frame / Native HTML5 Video Player */}
        <div className="relative aspect-[9/16] w-full bg-black flex items-center justify-center overflow-hidden group">
          <video
            ref={videoRef}
            src={videoData.videoUrl}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover cursor-pointer"
            onClick={togglePlay}
          />

          {/* Center Play/Pause Overlay Indicator when paused */}
          {!isPlaying && (
            <button 
              onClick={togglePlay}
              className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-bio-green/90 text-white flex items-center justify-center shadow-2xl border-2 border-white/40 z-20"
            >
              <Play className="w-8 h-8 fill-current ml-1" />
            </button>
          )}

          {/* Bottom Floating Mute/Unmute Controls */}
          <div className="absolute bottom-4 right-4 flex items-center space-x-2 z-30">
            <button
              onClick={toggleMute}
              className="w-10 h-10 rounded-full bg-black/70 backdrop-blur-xs text-white flex items-center justify-center border border-white/20 hover:bg-bio-green transition-colors"
            >
              {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5 text-bio-green" />}
            </button>
          </div>
        </div>

        {/* Footer Info Overlay */}
        <div className="p-5 bg-bio-navyDark text-white space-y-3 relative z-30 border-t border-white/10">
          <div className="flex items-center space-x-3">
            {/* Startup Theme Vector Icon Badge (100% Crisp Vector - NO Broken Images) */}
            <div 
              className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-black shadow-md border flex-shrink-0"
              style={{ 
                backgroundColor: videoData.iconBg || '#2D9B4C',
                borderColor: 'rgba(255,255,255,0.2)'
              }}
            >
              <IconComponent className="w-6 h-6" />
            </div>

            <div>
              <h4 className="text-sm font-extrabold text-white leading-tight">{videoData.author}</h4>
              <p className="text-xs text-bio-green font-bold">{videoData.role} — <span className="text-gray-300 font-normal">{videoData.company}</span></p>
            </div>
          </div>

          <p className="text-xs text-gray-200 leading-relaxed italic font-medium">
            "{videoData.quote || videoData.desc}"
          </p>

          {videoData.highlight && (
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-bio-green/20 text-bio-green text-[11px] font-extrabold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{videoData.highlight}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
