import React, { useState } from 'react';
import { TRANSLATIONS } from '../data/translations';
import { Play, Dna, Microscope, Sprout, TrendingUp, Users, Sparkles, CheckCircle2, Film, Smartphone, ArrowRight, ShieldCheck, Bot, Leaf, Award, UtensilsCrossed } from 'lucide-react';
import VideoModal from './VideoModal';

export default function InsideBHVSection({ onOpenApply, currentLang }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.ES;
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [hoveredVideoId, setHoveredVideoId] = useState(null);

  const explainerVideoData = {
    title: 'Biohub Venture Metodología & Ecosistema',
    author: 'Equipo Consorcio BHV',
    role: 'Plataforma Biotecnológica',
    company: 'BHV Amazonía',
    tag: 'Vídeo Oficial 90s',
    quote: 'Descubre cómo conectamos la investigación científica de laboratorio con fondos de inversión y corporaciones globales en 8 semanas.',
    highlight: '8 Semanas • 3 Aliados del Consorcio',
    videoUrl: '/videos/testimonial1.mp4',
    icon: Dna,
    iconBg: '#2D9B4C'
  };

  const steps = [
    {
      num: '01',
      title: t.inside.step1Title,
      desc: t.inside.step1Desc,
      icon: Sprout,
      color: '#2D9B4C',
      metric: '100+ bioideas evaluadas'
    },
    {
      num: '02',
      title: t.inside.step2Title,
      desc: t.inside.step2Desc,
      icon: Dna,
      color: '#5BB8D6',
      metric: '80+ hrs laboratorios IGBM'
    },
    {
      num: '03',
      title: t.inside.step3Title,
      desc: t.inside.step3Desc,
      icon: Users,
      color: '#6B4DD6',
      metric: '12+ corporativos aliados'
    },
    {
      num: '04',
      title: t.inside.step4Title,
      desc: t.inside.step4Desc,
      icon: TrendingUp,
      color: '#22B878',
      metric: '80%+ tasa de financiamiento'
    }
  ];

  // 5 Real Verified Founder Video Testimonials with Crisp Startup Vector Icons
  const verticalVideos = [
    {
      id: 1,
      author: 'Arlet Hernández',
      role: 'Fundadora',
      company: 'BioSafe Me',
      country: 'El Salvador 🇸🇻',
      duration: '0:48',
      tag: 'Biotecnología Alimentaria',
      quote: 'Fortalecimos nuestro modelo de negocio, propiedad intelectual y postulamos a financiamiento internacional.',
      highlight: 'Biotecnología Alimentaria',
      videoUrl: '/videos/testimonial1.mp4',
      icon: UtensilsCrossed,
      iconBg: '#2D9B4C'
    },
    {
      id: 2,
      author: 'Javier David Uzcátegui',
      role: 'Biólogo & CEO',
      company: 'VETPHARMA',
      country: 'Venezuela / LATAM 🇻🇪',
      duration: '0:55',
      tag: 'Diseño de Vacunas',
      quote: 'Es la primera incubadora abierta a aceptar emprendimientos biotecnológicos disruptivos con asesoría 1:1.',
      highlight: 'Biotecnología Médica & Vacunas',
      videoUrl: '/videos/testimonial2.mp4',
      icon: Dna,
      iconBg: '#5BB8D6'
    },
    {
      id: 3,
      author: 'María Arana',
      role: 'Co-founder',
      company: 'ApiRobotics',
      country: 'Perú 🇵🇪',
      duration: '0:42',
      tag: 'AgroTech & IA',
      quote: 'Desarrollamos colmenas inteligentes con IA para optimizar la polinización de cultivos amazónicos.',
      highlight: 'Polinización de Precisión e IA',
      videoUrl: '/videos/testimonial3.mp4',
      icon: Bot,
      iconBg: '#22B878'
    },
    {
      id: 4,
      author: 'Frank Sarnaqué',
      role: 'Cofundador',
      company: 'MIZETA',
      country: 'Perú 🇵🇪',
      duration: '1:05',
      tag: 'FoodTech & Circular',
      quote: 'Transformamos residuos agroindustriales de café y cacao en el primer snack sostenible de setas ostras.',
      highlight: 'Snacks Sostenibles de Setas',
      videoUrl: '/videos/testimonial4.mp4',
      icon: Leaf,
      iconBg: '#7ACD42'
    },
    {
      id: 5,
      author: 'Carlos Rivera',
      role: 'CEO (1er Puesto Cohorte)',
      company: 'CRIPES',
      country: 'Perú 🇵🇪',
      duration: '0:50',
      tag: 'HealthTech & Control Plagas',
      quote: 'Creamos soluciones biotecnológicas contra el mosquito del Dengue. Logramos el 1er puesto como la startup más invertible.',
      highlight: '🏆 1er Puesto Startup Más Invertible',
      videoUrl: '/videos/testimonial5.mp4',
      icon: Award,
      iconBg: '#6B4DD6'
    }
  ];

  return (
    <section id="inside" className="py-20 bg-bio-cream border-b border-bio-navy/10 relative overflow-hidden">
      
      {/* Background Vector Accents */}
      <svg className="absolute top-4 right-4 w-64 h-64 opacity-25 pointer-events-none z-0" viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="90" stroke="#003D7A" strokeWidth="2" strokeDasharray="6 6" />
        <circle cx="100" cy="100" r="50" stroke="#2D9B4C" strokeWidth="3" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-4">
            <span className="px-3.5 py-1.5 rounded-full bg-bio-green/15 text-bio-greenDark text-xs font-black uppercase tracking-wider">
              {t.inside.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-bio-navy leading-tight">
              {t.inside.title}
            </h2>
            <p className="text-bio-textMuted text-base sm:text-lg max-w-3xl leading-relaxed">
              {t.inside.desc}
            </p>
          </div>

          <div className="lg:col-span-4 lg:text-right">
            <button
              onClick={() => setSelectedVideo(explainerVideoData)}
              className="inline-flex items-center px-6 py-3.5 rounded-xl bg-bio-navy text-white font-extrabold text-xs uppercase tracking-wider hover:bg-bio-green transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              <span>{t.inside.watchVideo}</span>
              <div className="w-7 h-7 rounded-full bg-bio-green flex items-center justify-center ml-3 group-hover:scale-110 transition-transform">
                <Play className="w-3.5 h-3.5 fill-current text-white ml-0.5" />
              </div>
            </button>
          </div>
        </div>

        {/* 4 Methodology Step Cards with Connecting Flow Line */}
        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1.5 bg-gradient-to-r from-[#2D9B4C] via-[#5BB8D6] to-[#22B878] -translate-y-1/2 opacity-25 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <div
                  key={idx}
                  className="retro-card p-6 flex flex-col justify-between relative overflow-hidden bg-white hover:border-bio-green transition-all duration-300 group hover:-translate-y-1.5 shadow-sm hover:shadow-card-hover"
                >
                  <div 
                    className="absolute top-0 left-0 right-0 h-1.5"
                    style={{ backgroundColor: step.color }}
                  />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: step.color }}
                      >
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-2xl font-black font-mono text-bio-navy/20">
                        {step.num}
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-bio-navy leading-snug">
                      {step.title}
                    </h3>

                    <p className="text-xs text-bio-textMuted leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-bio-navy/8 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-extrabold text-bio-navy">Paso {step.num} de 04</span>
                      <span 
                        className="font-bold px-2.5 py-0.5 rounded-md text-[10px]"
                        style={{ color: step.color, backgroundColor: `${step.color}15` }}
                      >
                        {step.metric}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 🎥 THE 5 REAL FOUNDERS VERTICAL VIDEOS (Native Frame at Second 4 - ZERO Stock Images) */}
        <div className="space-y-8 pt-8 border-t border-bio-navy/10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-bio-green/15 text-bio-greenDark text-xs font-black uppercase tracking-wider">
                <Film className="w-3.5 h-3.5 text-bio-green" />
                <span>Testimonios Reales en Vídeo Vertical (Shorts 9:16)</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-bio-navy tracking-tight">
                Escucha a los Founders que pasaron por Biohub Venture
              </h3>
              <p className="text-xs sm:text-sm text-bio-textMuted leading-relaxed">
                Vídeos reales avanzando desde el segundo 4. Pasa el cursor sobre cualquiera de ellos para reproducir con movimiento.
              </p>
            </div>

            <div className="flex items-center space-x-2 text-xs font-extrabold text-bio-navy bg-white px-4 py-2 rounded-xl border border-bio-navy/10 shadow-xs">
              <Smartphone className="w-4 h-4 text-bio-green" />
              <span>5 Founders Graduados</span>
            </div>
          </div>

          {/* 5 Vertical Video Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {verticalVideos.map((video) => (
              <div
                key={video.id}
                onMouseEnter={() => setHoveredVideoId(video.id)}
                onMouseLeave={() => setHoveredVideoId(null)}
                onClick={() => setSelectedVideo(video)}
                className="group relative aspect-[9/16] w-full rounded-3xl overflow-hidden bg-black shadow-xl border-2 border-bio-navy/20 cursor-pointer hover:border-bio-green hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Native Real Video Tag at timestamp = 4.0s */}
                <video
                  src={`${video.videoUrl}#t=4`}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
                  ref={(el) => {
                    if (el) {
                      if (hoveredVideoId === video.id) {
                        el.play().catch(() => {});
                      } else {
                        el.pause();
                        if (el.currentTime === 0 || el.paused) {
                          el.currentTime = 4;
                        }
                      }
                    }
                  }}
                />

                {/* Dark Vignette Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-bio-navyDark/98 via-bio-navyDark/35 to-black/60 z-10 pointer-events-none" />

                {/* Top Tag & Duration Tag */}
                <div className="relative z-20 p-3.5 flex items-center justify-between pointer-events-none">
                  <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-xs text-white font-extrabold text-[9px] uppercase tracking-wider border border-white/20">
                    {video.tag}
                  </span>

                  <div className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-black/80 text-gray-200 text-[10px] font-mono font-bold border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span>{video.duration}</span>
                  </div>
                </div>

                {/* Center Animated Play Ring */}
                <div className="relative z-20 flex items-center justify-center my-auto pointer-events-none">
                  <div className="w-14 h-14 rounded-full bg-bio-green/90 text-white flex items-center justify-center shadow-2xl border-2 border-white/40 group-hover:scale-115 group-hover:bg-bio-green transition-transform duration-300 relative">
                    <span className="absolute inset-0 rounded-full bg-bio-green/40 animate-ping" />
                    <Play className="w-6 h-6 fill-current ml-0.5 relative z-10" />
                  </div>
                </div>

                {/* Bottom Founder Caption & Quote */}
                <div className="relative z-20 p-3.5 space-y-2 border-t border-white/10 bg-black/75 backdrop-blur-xs pointer-events-none">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-extrabold text-bio-green">
                      {video.country}
                    </span>
                    <span className="font-bold text-white bg-bio-navy/90 px-2 py-0.5 rounded text-[9px] border border-white/10">
                      {video.company}
                    </span>
                  </div>

                  <p className="text-[11px] text-white font-medium leading-snug line-clamp-2 italic">
                    "{video.quote}"
                  </p>

                  <div className="pt-1.5 flex items-center justify-between border-t border-white/10 text-[10px]">
                    <div>
                      <h4 className="font-extrabold text-white leading-none">{video.author}</h4>
                      <p className="text-[9px] text-bio-green font-semibold leading-tight">{video.role}</p>
                    </div>
                    <span className="text-bio-green font-extrabold uppercase flex items-center text-[10px] bg-white/10 px-2 py-1 rounded-md border border-white/10">
                      <span>Ver</span>
                      <ArrowRight className="w-3 h-3 ml-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Interactive Video Modal Player */}
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoData={selectedVideo}
      />
    </section>
  );
}
