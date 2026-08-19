import React, { useState } from 'react';
import { Play, Sparkles, Volume2, Quote, Star, Smartphone, Film, ArrowRight } from 'lucide-react';
import VideoModal from './VideoModal';

export default function VerticalVideoTestimonials({ currentLang }) {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const verticalVideos = [
    {
      id: 1,
      author: 'Valeria Rojas',
      role: 'Co-founder & CEO',
      company: 'ApiRobotics',
      country: 'Perú 🇵🇪',
      duration: '0:48',
      tag: 'Biotecnología & IA',
      poster: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      quote: 'BHV conectó nuestra tecnología con los laboratorios de IGBM. Logramos elevar un 35% el rinde agrícola en cacao amazónico.',
      highlight: 'Levantó USD 450K Pre-Seed',
      videoUrl: '' // Supports HTML5 mp4 URL
    },
    {
      id: 2,
      author: 'Andrés Díaz',
      role: 'Co-founder & CTO',
      company: 'MIZETA',
      country: 'Colombia 🇨🇴',
      duration: '0:55',
      tag: 'Biomateriales',
      poster: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      quote: 'Gracias al soporte en patentes de BioGenia protegimos nuestro proceso de micelio. Hoy exportamos empaques biodegradables.',
      highlight: '100% Compostable en 45 días',
      videoUrl: ''
    },
    {
      id: 3,
      author: 'Mateo Silva',
      role: 'Founder',
      company: 'Pompom FoodTech',
      country: 'Perú 🇵🇪',
      duration: '0:42',
      tag: 'FoodTech Amazónico',
      poster: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      quote: 'El acompañamiento de Scale fue determinante para estructurar nuestro Unit Economics e ingresar a más de 120 supermercados.',
      highlight: 'Ventas en EE.UU. & LATAM',
      videoUrl: ''
    },
    {
      id: 4,
      author: 'Frank Sarnaqué',
      role: 'CEO & Co-founder',
      company: 'MIZETA',
      country: 'Perú 🇵🇪',
      duration: '1:05',
      tag: 'Biomateriales & Micelio',
      poster: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      quote: 'En solo 8 semanas optimizamos el crecimiento de nuestras cepas de micelio con el equipo de BioGenia y creamos empaques 100% compostables.',
      highlight: 'Premio Economía Circular',
      videoUrl: ''
    }
  ];

  return (
    <section className="py-20 bg-bio-paper/40 border-b border-bio-navy/10 relative overflow-hidden">
      
      {/* Subtle Background Graphics */}
      <svg className="absolute -bottom-16 -left-16 w-80 h-80 opacity-40 pointer-events-none" viewBox="0 0 300 300" fill="none">
        <circle cx="150" cy="150" r="140" stroke="#2D9B4C" strokeWidth="8" strokeDasharray="12 12" />
        <circle cx="150" cy="150" r="90" stroke="#003D7A" strokeWidth="4" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-bio-green/15 text-bio-greenDark text-xs font-black uppercase tracking-wider">
              <Film className="w-4 h-4 text-bio-green" />
              <span>Testimonios en Vídeo • Historias Reales</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-bio-navy tracking-tight leading-tight">
              Escucha a los Founders que están transformando la Amazonía
            </h2>

            <p className="text-bio-textMuted text-base sm:text-lg leading-relaxed">
              Videos cortos de 60 segundos grabados en laboratorios, campos de cultivo y Demo Days.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-bold text-bio-navy">
            <Smartphone className="w-4 h-4 text-bio-green" />
            <span>Formato Shorts / Reels 9:16</span>
          </div>
        </div>

        {/* 4 Smartphone Mockup Video Shorts Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {verticalVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className="group relative aspect-[9/16] w-full rounded-3xl overflow-hidden bg-bio-navyDark shadow-xl border-2 border-bio-navy/15 cursor-pointer hover:border-bio-green hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Poster Image Background */}
              <img
                src={video.poster}
                alt={video.author}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-85"
              />

              {/* Gradient Overlays for Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-bio-navyDark/95 via-bio-navyDark/40 to-black/60" />

              {/* Top Phone Mockup Bar & Badges */}
              <div className="relative z-10 p-4 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white font-extrabold text-[10px] uppercase tracking-wider border border-white/20">
                  {video.tag}
                </span>

                <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-black/70 text-gray-200 text-[10px] font-mono font-bold border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span>{video.duration}</span>
                </div>
              </div>

              {/* Center Glowing Play Button */}
              <div className="relative z-10 flex items-center justify-center my-auto">
                <div className="w-16 h-16 rounded-full bg-bio-green/90 text-white flex items-center justify-center shadow-2xl border-2 border-white/30 group-hover:scale-115 group-hover:bg-bio-green transition-transform duration-300 relative">
                  <span className="absolute inset-0 rounded-full bg-bio-green/40 animate-ping" />
                  <Play className="w-7 h-7 fill-current ml-1 relative z-10" />
                </div>
              </div>

              {/* Bottom Founder Caption Info */}
              <div className="relative z-10 p-4 space-y-2 border-t border-white/10 bg-black/40 backdrop-blur-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black text-bio-green tracking-wide">
                    {video.country}
                  </span>
                  <span className="text-[10px] font-bold text-gray-300 bg-white/10 px-2 py-0.5 rounded">
                    {video.company}
                  </span>
                </div>

                <p className="text-xs text-white font-medium leading-snug line-clamp-2 italic">
                  "{video.quote}"
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-white/10 text-[11px]">
                  <span className="font-extrabold text-white">{video.author}</span>
                  <span className="text-bio-green font-bold text-[10px] uppercase">Ver vídeo →</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Video Modal Player */}
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoData={selectedVideo}
      />
    </section>
  );
}
