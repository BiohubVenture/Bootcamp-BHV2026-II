import React, { useState } from 'react';
import { TOP_STARTUPS } from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';
import { Sparkles, MapPin, ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import StartupModal from './StartupModal';

const flagMap = {
  'Perú': '🇵🇪',
  'Colombia': '🇨🇴',
  'Ecuador': '🇪🇨',
  'El Salvador': '🇸🇻',
  'Venezuela': '🇻🇪'
};

export default function StartupsSection({ currentLang }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.ES;
  const [selectedStartup, setSelectedStartup] = useState(null);

  return (
    <section id="startups" className="py-20 bg-bio-cream border-b border-bio-navy/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <span className="px-3.5 py-1.5 rounded-full bg-bio-green/15 text-bio-greenDark text-xs font-black uppercase tracking-wider">
              {t.startupsSection.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-bio-navy tracking-tight leading-tight">
              Portafolio: Startups de Impacto
            </h2>
            <p className="text-bio-textMuted text-base">
              Empresas aceleradas por Biohub Venture que transforman la bioeconomía en LATAM.
            </p>
          </div>

          <Link
            to="/startups"
            className="inline-flex items-center text-xs font-extrabold text-bio-green hover:text-bio-greenDark transition-colors flex-shrink-0"
          >
            <span>Ver todo el portafolio ({TOP_STARTUPS.length}) →</span>
          </Link>
        </div>

        {/* Startups Grid with Country Flags & Stage Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOP_STARTUPS.slice(0, 3).map((startup) => {
            const flag = flagMap[startup.country] || '🌎';
            return (
              <div
                key={startup.id}
                onClick={() => setSelectedStartup(startup)}
                className="retro-card overflow-hidden cursor-pointer flex flex-col justify-between hover:border-bio-green transition-all duration-300 group bg-white"
              >
                <div className="relative h-60 sm:h-64 bg-bio-navyDeep overflow-hidden">
                  <img 
                    src={startup.image} 
                    alt={startup.name} 
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 opacity-95"
                  />
                  
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-bio-green text-white text-xs font-black shadow-md">
                    {startup.rank}
                  </div>

                  <div className="absolute bottom-3 left-3 flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-bio-navyDark/90 text-white text-xs font-bold backdrop-blur-xs shadow-sm">
                    <span className="text-sm">{flag}</span>
                    <span>{startup.country}</span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-extrabold text-bio-navy group-hover:text-bio-green transition-colors">
                        {startup.name}
                      </h3>
                      <span className="text-xs font-extrabold text-bio-green bg-bio-green/10 px-2.5 py-0.5 rounded">
                        {startup.category}
                      </span>
                    </div>

                    <p className="text-xs text-bio-textMuted leading-relaxed line-clamp-3">
                      {startup.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-bio-navy/5 flex items-center justify-between">
                    <span className="text-xs font-extrabold text-bio-navy bg-bio-paper px-2.5 py-1 rounded">
                      {startup.stage}
                    </span>
                    <span className="text-xs font-bold text-bio-green group-hover:translate-x-1 transition-transform">
                      {t.startupsSection.viewSheet}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {selectedStartup && (
        <StartupModal
          startup={selectedStartup}
          onClose={() => setSelectedStartup(null)}
        />
      )}
    </section>
  );
}
