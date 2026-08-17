import React from 'react';
import { ArrowRight, Sparkles, Leaf, Compass, BarChart3 } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export default function HeroSection({ onOpenApply, onOpenSrl, onScrollToRfs, currentLang }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.ES;

  return (
    <section id="hero" className="relative min-h-[680px] lg:min-h-[740px] flex items-center overflow-hidden border-b border-bio-navy/10 bg-bio-cream pt-6 pb-12">
      
      {/* Background Anime Illustration */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="/hero_anime_biodome.png" 
          alt="Biohub Venture Anime Biodome" 
          className="w-full h-full object-cover object-top lg:object-[right_top] opacity-100 filter brightness-105 contrast-[1.03] saturate-[1.08] transition-all duration-700"
          style={{
            objectPosition: '85% top'
          }}
        />
        
        <div className="absolute inset-y-0 left-0 w-full lg:w-3/5 bg-gradient-to-r from-[#FAF8F3] via-[#FAF8F3]/90 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#FAF8F3] to-transparent pointer-events-none" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Glassmorphism Text Card Box */}
          <div className="lg:col-span-6 space-y-6 text-left p-7 sm:p-9 rounded-3xl glass-premium shadow-2xl border border-white/90 backdrop-blur-md">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-bio-green/15 border border-bio-green/30 text-bio-greenDark text-xs font-extrabold uppercase tracking-wider shadow-2xs">
              <Leaf className="w-4 h-4 text-bio-green animate-pulse" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-bio-navy leading-[1.15] tracking-tight">
              {t.hero.title1} <span className="text-bio-green underline decoration-bio-neon/80 decoration-4">{t.hero.title2}</span> {t.hero.title3} <span className="text-bio-navy border-b-4 border-bio-green">{t.hero.title4}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-bio-textDark font-medium leading-relaxed">
              El primer bootcamp para startups verdes de alto impacto en LATAM. Impulsado por el consorcio <strong className="text-bio-navy font-black">BioGenia</strong>, <strong className="text-bio-navy font-black">IGBM</strong> y <strong className="text-bio-navy font-black">Scale UP</strong>.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 pt-2">
              <button
                onClick={onOpenApply}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-extrabold text-white bg-bio-green hover:bg-bio-greenDark shadow-lg shadow-bio-green/30 hover:shadow-neon-glow transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>{t.hero.applyStartup}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>

              <button
                onClick={onOpenSrl}
                className="inline-flex items-center justify-center px-5 py-3.5 rounded-xl text-xs font-extrabold text-bio-navy bg-white hover:bg-bio-cream border-2 border-bio-navy/20 hover:border-bio-green shadow-xs transition-all duration-200"
              >
                <BarChart3 className="w-4 h-4 mr-1.5 text-bio-green" />
                <span>Evaluar Madurez SRL</span>
              </button>
            </div>

          </div>

          {/* Right Column */}
          <div className="lg:col-span-6 hidden lg:block" />

        </div>
      </div>
    </section>
  );
}
