import React, { useState, useEffect, useRef } from 'react';
import { METRICS } from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';
import { Award, Rocket, Globe, Building2, DollarSign, Users, Sparkles } from 'lucide-react';

const iconMap = {
  Award,
  Rocket,
  Globe,
  Building2,
  DollarSign,
  Users
};

// 🎰 DRAMATIC SLOW ROULETTE REEL TUMBLER COUNTER (4.5s Slow Spin Duration)
function RouletteDigit({ digit, delay = 0, isPlaying }) {
  const isNumber = /[0-9]/.test(digit);
  const targetNum = isNumber ? parseInt(digit, 10) : 0;

  if (!isNumber) {
    return <span className="inline-block px-[1px] font-sans">{digit}</span>;
  }

  // Create longer sequence [0..9, 0..9, 0..9, 0..9, targetNum] for a longer, slower roulette spin
  const numbersSequence = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9
  ];
  const targetIndex = 30 + targetNum; // 3 full revolutions before decelerating slowly to target

  return (
    <span className="inline-block h-[1.1em] overflow-hidden align-middle relative font-mono font-black">
      <span
        className="flex flex-col transition-transform duration-[4500ms]"
        style={{
          transitionTimingFunction: 'cubic-bezier(0.05, 0.95, 0.15, 1.0)',
          transitionDelay: `${delay}ms`,
          transform: isPlaying ? `translateY(-${(targetIndex / 40) * 100}%)` : 'translateY(0%)'
        }}
      >
        {numbersSequence.map((num, i) => (
          <span key={i} className="h-[1.1em] flex items-center justify-center">
            {num}
          </span>
        ))}
      </span>
    </span>
  );
}

function RouletteCounter({ value }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsPlaying(true);
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const chars = value.split('');
  let digitIndex = 0;

  return (
    <div ref={ref} className="inline-flex items-center justify-center font-mono leading-none tracking-tight">
      {chars.map((ch, idx) => {
        const isNum = /[0-9]/.test(ch);
        const delay = isNum ? digitIndex * 220 : 0;
        if (isNum) digitIndex++;

        return (
          <RouletteDigit
            key={idx}
            digit={ch}
            delay={delay}
            isPlaying={isPlaying}
          />
        );
      })}
    </div>
  );
}

export default function MetricsSection({ currentLang }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.ES;

  const translatedLabels = [
    t.metrics.m1,
    t.metrics.m2,
    t.metrics.m3,
    t.metrics.m4,
    t.metrics.m5,
    t.metrics.m6
  ];

  return (
    <section className="py-14 bg-white border-y border-bio-navy/10 relative z-20 overflow-hidden">
      
      {/* Background Subtle Bio Ambient Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-28 bg-bio-green/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Section Badge */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-bio-cream border border-bio-navy/10 text-bio-navy text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-bio-green" />
            <span>Métricas de Impacto BHV</span>
          </div>
        </div>

        {/* 6 Metric Cards Grid (STRICT EQUAL HEIGHT H-FULL - SLOW DRAMATIC ROULETTE COUNTER) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 items-stretch">
          {METRICS.map((metric, idx) => {
            const IconComp = iconMap[metric.icon] || Rocket;
            const displayVal = metric.value;

            return (
              <div
                key={idx}
                className="group relative flex flex-col justify-between items-center text-center p-6 rounded-3xl bg-white border border-bio-navy/12 hover:border-bio-green hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 min-h-[210px] w-full"
              >
                {/* Vector Icon Container */}
                <div className="w-12 h-12 rounded-2xl bg-bio-cream border border-bio-navy/8 flex items-center justify-center text-bio-navy mb-2 group-hover:scale-110 group-hover:bg-bio-green group-hover:text-white transition-all duration-300 shadow-2xs flex-shrink-0">
                  <IconComp className="w-6 h-6" />
                </div>

                {/* 🎰 Slow Roulette Tumbler Counter Display */}
                <div className="text-2xl sm:text-3xl font-black text-bio-navy tracking-tight group-hover:text-bio-green transition-colors my-auto py-1">
                  <RouletteCounter value={displayVal} />
                </div>

                {/* Metric Label & Sublabel Container with Fixed Equal Height */}
                <div className="w-full pt-2 flex flex-col justify-end min-h-[50px]">
                  <span className="text-xs font-extrabold text-bio-navy leading-snug block">
                    {translatedLabels[idx]}
                  </span>
                  
                  {metric.sublabel ? (
                    <span className="inline-block mx-auto text-[10px] text-bio-green font-black uppercase mt-1.5 tracking-wider bg-bio-green/10 px-2 py-0.5 rounded-full border border-bio-green/20">
                      {metric.sublabel}
                    </span>
                  ) : (
                    <span className="inline-block text-[10px] text-bio-textMuted font-semibold mt-1 opacity-80">
                      Verificado BHV
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
