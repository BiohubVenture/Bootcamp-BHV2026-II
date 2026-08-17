import React from 'react';
import { ArrowRight, Sparkles, Calendar, Clock } from 'lucide-react';

export default function NextCohortBanner({ onOpenApply }) {
  return (
    <section className="py-12 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dark Banner Card (Matching image dark navy callout banner) */}
        <div className="relative rounded-2xl bg-dark-banner text-white p-8 sm:p-12 overflow-hidden shadow-2xl border border-bio-green/30">
          
          {/* Background Decorative Night Biodome Vector */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none hidden lg:block">
            <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
              <circle cx="250" cy="150" r="120" stroke="#7ACD42" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M130 250 C130 140, 270 140, 270 250 Z" fill="#2D9B4C" opacity="0.3" />
              <path d="M150 250 L250 160 L350 250" stroke="#003D7A" strokeWidth="2" />
            </svg>
          </div>

          <div className="relative z-10 max-w-2xl space-y-6">
            
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-bio-neon/20 text-bio-neon text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-bio-neon animate-pulse" />
              <span>Convocatoria 2026-II</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Próxima cohorte <br className="hidden sm:inline" />
              <span className="text-bio-neon">Octubre – Diciembre 2026</span>
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 font-medium">
              <div className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                <Calendar className="w-4 h-4 text-bio-neon" />
                <span>Aplicaciones abiertas hasta el 15 de septiembre</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                <Clock className="w-4 h-4 text-bio-igbm" />
                <span>Cupos limitados: 15 startups</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenApply}
                className="inline-flex items-center px-8 py-4 rounded-xl text-base font-bold text-bio-navyDark bg-bio-neon hover:bg-bio-neonHover shadow-neon-glow transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>Aplicar ahora</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
