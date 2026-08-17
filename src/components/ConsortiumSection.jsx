import React from 'react';
import { CONSORTIUM } from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ConsortiumSection({ currentLang }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.ES;

  return (
    <section id="consorcio" className="py-20 bg-bio-paper border-b border-bio-navy/10 relative overflow-hidden">
      
      {/* Decorative Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="px-3.5 py-1.5 rounded-full bg-bio-green/15 text-bio-greenDark text-xs font-black uppercase tracking-wider">
            {t.consorcio.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-bio-navy tracking-tight">
            {t.consorcio.title}
          </h2>
          <p className="text-bio-textMuted text-base sm:text-lg leading-relaxed">
            {t.consorcio.desc}
          </p>
        </div>

        {/* 3 Consortium Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CONSORTIUM.map((member) => (
            <div 
              key={member.id}
              className="rounded-3xl bg-white border border-bio-navy/12 hover:border-bio-green hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              {/* Photo Header with Step Pill & Floating Logo */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-bio-navy">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  style={{ objectPosition: member.objectPosition || 'center center' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                
                {/* Step Pill Top Left */}
                <div className="absolute top-4 left-4 z-10">
                  <span 
                    className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider text-white shadow-md backdrop-blur-md"
                    style={{ backgroundColor: member.color }}
                  >
                    {member.stepTitle}
                  </span>
                </div>

                {/* Bottom Left Logo & Title */}
                <div className="absolute bottom-4 left-4 flex items-center space-x-3 z-10">
                  <div 
                    className="w-12 h-12 rounded-xl bg-black/90 p-1.5 border-2 flex items-center justify-center shadow-lg backdrop-blur-sm"
                    style={{ borderColor: member.color }}
                  >
                    <img 
                      src={member.logoImage} 
                      alt={member.name} 
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-white leading-tight drop-shadow-sm">{member.name}</h3>
                    <p className="text-[11px] text-gray-200 font-medium">{member.tagline}</p>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <p className="text-xs font-bold text-bio-greenDark uppercase tracking-wider">{member.subname}</p>
                  <p className="text-xs text-bio-textMuted leading-relaxed">{member.shortDesc}</p>
                </div>

                <div className="space-y-2 pt-3 border-t border-bio-navy/10">
                  <span className="text-[11px] font-extrabold text-bio-navy uppercase tracking-wider block">Aporte Clave en BHV:</span>
                  {member.contribution.map((item, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-bio-textDark">
                      <span className="w-1.5 h-1.5 rounded-full bg-bio-green mt-1.5 flex-shrink-0" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Link to Full Sobre BHV Page */}
        <div className="text-center pt-4">
          <Link
            to="/consorcio"
            className="inline-flex items-center px-7 py-3.5 rounded-xl bg-bio-navy hover:bg-bio-green text-white font-extrabold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <span>{t.consorcio.learnMore}</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
