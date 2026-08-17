import React from 'react';

export default function AbstractBioGraphics() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 hidden sm:block">
      
      {/* 100% CLEAN FRAME VECTOR LAYOUT - STRICTLY IN OUTER MARGINS */}
      <svg className="w-full h-full min-h-[3200px] opacity-75" viewBox="0 0 1440 3200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Color Gradients */}
          <linearGradient id="purpleArcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6B4DD6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#8F72F8" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="leftOrganicGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6B4DD6" stopOpacity="0.4" />
            <stop offset="25%" stopColor="#2D9B4C" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#5BB8D6" stopOpacity="0.35" />
            <stop offset="75%" stopColor="#7ACD42" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#003D7A" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient id="greenBlobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2D9B4C" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#7ACD42" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="purpleBlobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6B4DD6" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#003D7A" stopOpacity="0.3" />
          </linearGradient>

          {/* Polka Dot Matrix Patterns */}
          <pattern id="dotMatrixNavy" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="5" cy="5" r="2.2" fill="#003D7A" fillOpacity="0.2" />
          </pattern>

          <pattern id="dotMatrixGreen" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="5" cy="5" r="2.2" fill="#2D9B4C" fillOpacity="0.2" />
          </pattern>

          {/* Diagonal Stripe Pattern */}
          <pattern id="diagStripesPattern" width="16" height="16" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="16" stroke="#6B4DD6" strokeWidth="5" strokeOpacity="0.4" />
          </pattern>

          {/* Clean Wireframe Grid Pattern */}
          <pattern id="cleanWireGridPattern" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#6B4DD6" strokeWidth="1.2" strokeOpacity="0.15" />
          </pattern>

          {/* Soft Shadow */}
          <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#003D7A" floodOpacity="0.06" />
          </filter>
        </defs>

        {/* --- 1. CONTINUOUS LEFT-SIDE ORGANIC WAVE FLUID BLOB (STRICTLY IN LEFT MARGIN) --- */}
        <path 
          d="M -50,-50 
             C 160,150 180,400 90,650 
             C 10,900 120,1150 170,1400 
             C 220,1650 60,1900 120,2150 
             C 180,2400 50,2650 150,2900 
             C 200,3050 -50,3200 -50,3200 Z" 
          fill="url(#leftOrganicGrad)"
          filter="url(#softShadow)"
        />

        {/* --- 2. SOLID SMOOTH CONTINUOUS CURVED RIBBON LINES ON LEFT MARGIN --- */}
        <g opacity="0.7">
          <path 
            d="M 15,0 C 140,350 50,700 110,1050 C 170,1400 70,1750 120,2100 C 170,2450 80,2800 100,3200" 
            stroke="#2D9B4C" 
            strokeWidth="3" 
            fill="none" 
          />
          <path 
            d="M 30,0 C 155,350 65,700 125,1050 C 185,1400 85,1750 135,2100 C 185,2450 95,2800 115,3200" 
            stroke="#7ACD42" 
            strokeWidth="1.8" 
            fill="none" 
          />
        </g>

        {/* --- 3. TOP-RIGHT CONCENTRIC CIRCULAR ARCS (OUTER CORNER ONLY) --- */}
        <g filter="url(#softShadow)">
          <path 
            d="M 1050,-80 A 380,380 0 0,1 1520,380" 
            stroke="url(#purpleArcGrad)" 
            strokeWidth="45" 
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* --- 4. MARGIN DOT MATRICES & WIREFRAME GRIDS (STRICTLY OUTSIDE CONTENT CARDS) --- */}
        <rect x="20" y="40" width="110" height="120" fill="url(#dotMatrixNavy)" />
        <rect x="1310" y="30" width="110" height="120" fill="url(#dotMatrixGreen)" />
        <rect x="15" y="1050" width="100" height="140" fill="url(#cleanWireGridPattern)" />
        <rect x="1320" y="1580" width="100" height="140" fill="url(#cleanWireGridPattern)" />
        <rect x="1310" y="2600" width="110" height="120" fill="url(#dotMatrixGreen)" />

        {/* --- 5. MID-RIGHT STRIPED CIRCLE --- */}
        <circle cx="1340" cy="1150" r="85" fill="url(#diagStripesPattern)" filter="url(#softShadow)" />

        {/* --- 6. BOTTOM-RIGHT FLUID ORGANIC WAVE BLOB --- */}
        <path 
          d="M 1490,2100 
             C 1320,2100 1220,2250 1280,2450 
             C 1340,2650 1180,2800 1490,2850 Z" 
          fill="url(#purpleBlobGrad)"
          filter="url(#softShadow)"
        />

        {/* --- 7. SOLID SPARKLE CROSS ACCENTS (+ / x) --- */}
        <g opacity="0.6" filter="url(#softShadow)">
          <path d="M 60,480 L 80,480 M 70,470 L 70,490" stroke="#7ACD42" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 1350,620 L 1370,620 M 1360,610 L 1360,630" stroke="#5BB8D6" strokeWidth="3.5" strokeLinecap="round" />
        </g>

      </svg>

    </div>
  );
}
