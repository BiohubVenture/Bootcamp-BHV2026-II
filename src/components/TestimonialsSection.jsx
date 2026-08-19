import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, ExternalLink, Quote, Sparkles, Trophy, Newspaper, MessageSquare, Award, Play, Pause } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPublishedMentions } from '../services/mentionsService';

const TYPE_CONFIG = {
  testimonial: { label: 'Testimonio', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: MessageSquare },
  news: { label: 'Noticia', bg: 'bg-blue-50 text-blue-700 border-blue-200', icon: Newspaper },
  award: { label: 'Premio / Hito', bg: 'bg-amber-50 text-amber-700 border-amber-200', icon: Trophy },
  mention: { label: 'Mención', bg: 'bg-purple-50 text-purple-700 border-purple-200', icon: Award }
};

export default function TestimonialsSection() {
  const [mentions, setMentions] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const marqueeRef = useRef(null);

  useEffect(() => {
    getPublishedMentions().then((data) => {
      if (data && data.length) {
        setMentions(data);
      }
    });
  }, []);

  if (!mentions.length) return null;

  // Duplicate items to create a seamless infinite loop
  const displayItems = [...mentions, ...mentions];

  return (
    <section className="py-20 bg-bio-cream border-b border-bio-navy/10 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-bio-green/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-bio-neon/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-bio-green/15 border border-bio-green/30 text-bio-greenDark text-xs font-mono font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-bio-green" />
              <span>Testimonios y Menciones</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-bio-navy tracking-tight leading-tight">
              Lo que dicen nuestros founders, aliados y medios
            </h2>

            <p className="text-bio-textMuted text-sm sm:text-base leading-relaxed">
              El ecosistema biotecnológico amazónico en voz de quienes lo están construyendo e impulsando.
            </p>
          </div>

          {/* Right Action: Link & Pause status */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            <div className="hidden sm:flex items-center space-x-2 text-xs font-bold text-bio-textMuted bg-white/80 border border-bio-navy/10 px-3 py-1.5 rounded-full shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-bio-green animate-pulse" />
              <span>Pasa el cursor para pausar</span>
            </div>

            <Link 
              to="/menciones"
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-bio-navy hover:bg-bio-navyDark text-white text-xs font-extrabold transition-colors shadow-sm"
            >
              <span>Ver todas las menciones</span>
              <ArrowRight className="w-3.5 h-3.5 text-bio-neon" />
            </Link>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* INFINITE SMOOTH AUTO-SCROLLING MARQUEE CAROUSEL                           */}
      {/* ========================================================================= */}
      <div 
        className="relative w-full overflow-hidden group py-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        
        {/* Left & Right Smooth Gradient Edge Fade Masks */}
        <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-bio-cream via-bio-cream/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-bio-cream via-bio-cream/80 to-transparent z-10 pointer-events-none" />

        {/* Marquee Scrolling Track */}
        <div 
          ref={marqueeRef}
          className={`flex gap-6 animate-marquee-left ${isPaused ? '[animation-play-state:paused]' : ''}`}
        >
          {displayItems.map((item, index) => {
            const config = TYPE_CONFIG[item.mention_type] || TYPE_CONFIG.mention;
            const text = item.quote || item.summary || item.title || 'Mención oficial';
            const IconComp = config.icon;

            return (
              <article
                key={`${item.id}-${index}`}
                className="w-[320px] sm:w-[380px] md:w-[420px] flex-shrink-0 p-6 rounded-3xl bg-white border border-bio-navy/10 shadow-sm hover:shadow-xl hover:border-bio-green/40 transition-all duration-300 flex flex-col justify-between relative group/card"
              >
                <div>
                  {/* Card Top: Type Badge + Big Quote Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-wider border ${config.bg}`}>
                      <IconComp className="w-3 h-3" />
                      <span>{config.label}</span>
                    </span>

                    <Quote className="w-7 h-7 text-bio-green/30 group-hover/card:text-bio-green transition-colors" />
                  </div>

                  {/* Quote Body */}
                  <p className="text-xs sm:text-sm text-bio-navy font-medium leading-relaxed italic mb-6 line-clamp-4">
                    “{text}”
                  </p>
                </div>

                {/* Card Bottom: Author & Source Information */}
                <div className="pt-4 border-t border-bio-navy/5 flex items-end justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs sm:text-sm font-extrabold text-bio-navy truncate">
                      {item.author_name || item.source_name}
                    </h4>
                    <p className="text-[11px] text-bio-textMuted font-bold truncate">
                      {item.author_role || item.source_name}
                    </p>
                  </div>

                  {item.source_url && (
                    <a
                      href={item.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-[11px] font-extrabold text-bio-green hover:text-bio-greenDark transition-colors flex-shrink-0 bg-bio-paper/60 hover:bg-bio-green/10 px-2.5 py-1 rounded-lg"
                      title="Ver publicación original"
                    >
                      <span>Fuente</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>

      </div>

    </section>
  );
}
