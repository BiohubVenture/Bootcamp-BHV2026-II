import React from 'react';

export default function SideBioLines() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 hidden sm:block">
      
      {/* Left Margin Clean Anime Bio-Energy Dashed Lines (NO Circles/Nodes) */}
      <svg className="absolute top-0 left-0 w-56 lg:w-80 h-full opacity-80" viewBox="0 0 240 2600" fill="none" preserveAspectRatio="none">
        <defs>
          <filter id="neonGlowLeft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="leftAnimeGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2D9B4C" />
            <stop offset="30%" stopColor="#7ACD42" />
            <stop offset="60%" stopColor="#5BB8D6" />
            <stop offset="100%" stopColor="#003D7A" />
          </linearGradient>
          <linearGradient id="leftAnimeGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#003D7A" />
            <stop offset="50%" stopColor="#6B4DD6" />
            <stop offset="100%" stopColor="#7ACD42" />
          </linearGradient>
        </defs>

        {/* Primary Clean Anime Dashed Line */}
        <path 
          d="M-30 80 Q110 380 40 780 T80 1480 T20 2180 T70 2550" 
          stroke="url(#leftAnimeGrad1)" 
          strokeWidth="3.5" 
          strokeDasharray="16 10"
          filter="url(#neonGlowLeft)"
          className="animate-anime-dash"
        />

        {/* Secondary Accent Dashed Line */}
        <path 
          d="M10 220 Q140 520 70 920 T110 1620 T50 2320" 
          stroke="url(#leftAnimeGrad2)" 
          strokeWidth="2.5" 
          strokeDasharray="8 6 3 6"
          className="animate-anime-dash-fast"
          opacity="0.85"
        />
      </svg>

      {/* Right Margin Clean Anime Bio-Energy Dashed Lines (NO Circles/Nodes) */}
      <svg className="absolute top-0 right-0 w-56 lg:w-80 h-full opacity-80" viewBox="0 0 240 2600" fill="none" preserveAspectRatio="none">
        <defs>
          <filter id="neonGlowRight" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="rightAnimeGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7ACD42" />
            <stop offset="40%" stopColor="#22B878" />
            <stop offset="70%" stopColor="#003D7A" />
            <stop offset="100%" stopColor="#6B4DD6" />
          </linearGradient>
          <linearGradient id="rightAnimeGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5BB8D6" />
            <stop offset="50%" stopColor="#2D9B4C" />
            <stop offset="100%" stopColor="#7ACD42" />
          </linearGradient>
        </defs>

        {/* Primary Clean Anime Dashed Line */}
        <path 
          d="M270 120 Q130 420 200 820 T160 1520 T220 2220 T170 2580" 
          stroke="url(#rightAnimeGrad1)" 
          strokeWidth="3.5" 
          strokeDasharray="18 10"
          filter="url(#neonGlowRight)"
          className="animate-anime-dash"
        />

        {/* Secondary Accent Dashed Line */}
        <path 
          d="M230 280 Q100 580 170 980 T130 1680 T190 2380" 
          stroke="url(#rightAnimeGrad2)" 
          strokeWidth="2.5" 
          strokeDasharray="10 6 4 6"
          className="animate-anime-dash-fast"
          opacity="0.85"
        />
      </svg>

    </div>
  );
}
