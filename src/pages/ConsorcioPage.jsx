import React from 'react';
import { CONSORTIUM } from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';
import { Award, Users, HeartHandshake, Sparkles, GraduationCap, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ConsorcioPage({ currentLang }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.ES;

  const mentors = [
    {
      name: 'Dr. Alejandro Valdivia, PhD',
      role: 'Genética & Biología Molecular',
      org: 'IGBM Scientific Board',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      desc: 'Rigor experimental, análisis metagenómico y secuenciación.'
    },
    {
      name: 'Dra. Carmen Rosa Izquierdo',
      role: 'Transferencia Tecnológica & PI',
      org: 'BioGenia Tech Transfer',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      desc: 'Estrategia de patentes bio, paquetes tecnológicos y CTI.'
    },
    {
      name: 'Ing. Gonzalo Benavides',
      role: 'Modelado Financiero & Escalamiento',
      org: 'Incubadora Scale Advisory',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      desc: 'Estructuración de Unit Economics y preparación para inversión.'
    },
    {
      name: 'Dra. Lucía Santos, PhD',
      role: 'Biotecnología Agrícola & Bioinsumos',
      org: 'Red Científica LATAM',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      desc: 'Formulaciones microbiológicas de suelos y ensayos de campo.'
    },
    {
      name: 'MSc. Rodrigo Morales',
      role: 'Estrategia Go-To-Market & Bioeconomía',
      org: 'Mentor Red BHV',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      desc: 'Validación de mercado comercial y cadenas sostenibles amazónicas.'
    },
    {
      name: 'Dra. Vanessa Koyama, PhD',
      role: 'Microbiología & Bioprocesos Amazónicos',
      org: 'Investigación Aplicada',
      avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=200&q=80',
      desc: 'Caracterización biológica y prototipado rápido de bioideas.'
    }
  ];

  // 🌿 REAL VERIFIED BIOEMBAJADORES FROM GOOGLE DRIVE (Bioembajadores BHV 2026 II)
  const bioembajadores = [
    {
      name: 'Ulises Costilla',
      role: 'Bioembajador de Contenido & Red de Mentores',
      org: 'Red Bioembajadores BHV',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      focus: 'Mapeo de la red de mentores, desarrollo de guiones y cápsulas de divulgación en bioeconomía amazónica.'
    },
    {
      name: 'María Belén Terán Villegas',
      role: 'Bioembajadora de Difusión Audiovisual & Medios',
      org: 'Red Bioembajadores BHV',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      focus: 'Creación de reels, difusión en canales digitales y cobertura visual del Bootcamp Biohub Venture.'
    },
    {
      name: 'Evelyn Vanesa Cribillero Mejía',
      role: 'Bioembajadora de Coordinación & Logística',
      org: 'Red Bioembajadores BHV',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      focus: 'Soporte organizativo, seguimiento de planes de contenido y articulación comunitaria en bootcamps.'
    },
    {
      name: 'Anjeli Pariona',
      role: 'Bioembajadora de Enlace Territorial & Scouting',
      org: 'Red Bioembajadores BHV',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      focus: 'Scouting de bioideas, conexión con proyectos juveniles y soporte en convocatorias del ecosistema.'
    },
    {
      name: 'Clara Divy',
      role: 'Bioembajadora de Alianzas & Comunidad',
      org: 'Red Bioembajadores BHV',
      avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=200&q=80',
      focus: 'Articulación con redes estudiantiles, dinamización de canales de voluntariado y alianzas formativas.'
    }
  ];

  return (
    <div className="py-16 bg-bio-cream min-h-screen space-y-16">
      
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span className="px-3.5 py-1.5 rounded-full bg-bio-green/15 text-bio-greenDark text-xs font-black uppercase tracking-wider">
          Consorcio Fundador & Ecosistema Humano
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-bio-navy max-w-4xl mx-auto leading-tight">
          Tres Organizaciones Fundadoras. Una Red Regional de Mentores y Bioembajadores.
        </h1>
        <p className="text-bio-textMuted text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
          Biohub Venture combina infraestructura de laboratorios (IGBM), transferencia tecnológica (BioGenia), incubación empresarial (Scale) y nuestra red de voluntarios y líderes de bioeconomía (Bioembajadores) en LATAM.
        </p>
      </div>

      {/* 1. CONSORTIUM MEMBERS GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CONSORTIUM.map((member) => (
            <div 
              key={member.id}
              className="rounded-3xl bg-white border border-bio-navy/12 hover:border-bio-green hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              {/* Photo Header */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-bio-navy">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  style={{ objectPosition: member.objectPosition || 'center center' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Step Pill on Top Left */}
                <div className="absolute top-4 left-4 z-10">
                  <span 
                    className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider text-white shadow-md backdrop-blur-md"
                    style={{ backgroundColor: member.color }}
                  >
                    {member.stepTitle}
                  </span>
                </div>

                {/* Corner Brand Logo Badge */}
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

              {/* Card Content Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <p className="text-xs font-bold text-bio-greenDark uppercase tracking-wider">{member.subname}</p>
                  <p className="text-xs text-bio-textMuted leading-relaxed">{member.description}</p>
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
      </div>

      {/* 2. RED DE MENTORES ESPECIALIZADOS BHV */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-8 border-t border-bio-navy/10">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-bio-green/15 text-bio-greenDark text-xs font-black uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-bio-green" />
            <span>Acompañamiento Científico & Empresarial</span>
          </div>
          <h2 className="text-3xl font-extrabold text-bio-navy tracking-tight">
            Red de Mentores Especializados BHV
          </h2>
          <p className="text-xs sm:text-sm text-bio-textMuted leading-relaxed">
            Más de 50 científicos, expertos en transferencia tecnológica, propiedad intelectual y finanzas que acompañan 1:1 a nuestras startups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-3xl bg-white border border-bio-navy/10 hover:border-bio-green hover:shadow-card-hover transition-all duration-300 flex items-start space-x-4 group"
            >
              <img
                src={mentor.avatar}
                alt={mentor.name}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-bio-green/30 group-hover:scale-105 transition-transform flex-shrink-0"
              />
              <div className="space-y-1">
                <h4 className="text-base font-extrabold text-bio-navy leading-snug">{mentor.name}</h4>
                <p className="text-xs font-bold text-bio-green">{mentor.role}</p>
                <p className="text-[10px] font-mono text-bio-navy/60 uppercase font-semibold">{mentor.org}</p>
                <p className="text-xs text-bio-textMuted leading-relaxed pt-1">{mentor.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 1:1 Mentorship Banner */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-bio-navy via-bio-navyDark to-bio-navy text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-bio-green/20 text-bio-green flex items-center justify-center flex-shrink-0 border border-bio-green/30">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-extrabold text-white">Acompañamiento Personalizado 1:1</h4>
              <p className="text-xs text-gray-300">Cada startup asigna a 3 mentores dedicados: científico (IGBM), tech transfer (BioGenia) y negocios (Scale).</p>
            </div>
          </div>

          <Link
            to="/apply"
            className="px-6 py-3 rounded-xl bg-bio-green text-white font-extrabold text-xs uppercase tracking-wider hover:bg-bio-greenDark transition-colors flex-shrink-0 flex items-center space-x-2"
          >
            <span>Postular con mentoría →</span>
          </Link>
        </div>
      </div>

      {/* 3. RED DE BIOEMBAJADORES BHV & VOLUNTARIADO (5 REAL BIOEMBAJADORES) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-8 border-t border-bio-navy/10">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-bio-green/15 text-bio-greenDark text-xs font-black uppercase tracking-wider">
            <HeartHandshake className="w-4 h-4 text-bio-green" />
            <span>Voluntariado Universitario & Conexión Territorial</span>
          </div>
          <h2 className="text-3xl font-extrabold text-bio-navy tracking-tight">
            Red de Bioembajadores BHV
          </h2>
          <p className="text-xs sm:text-sm text-bio-textMuted leading-relaxed">
            Equipo de bioembajadores y voluntarios que lideran la coordinación, difusión audiovisual, mapeo de mentores y scouting territorial en el Bootcamp Biohub Venture.
          </p>
        </div>

        {/* 5 Real Bioembajadores Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {bioembajadores.map((bio, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-3xl bg-white border border-bio-navy/10 hover:border-bio-green hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <img
                    src={bio.avatar}
                    alt={bio.name}
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-bio-green/30 group-hover:scale-105 transition-transform"
                  />
                  <span className="text-[10px] font-black text-bio-navy bg-bio-cream px-2 py-0.5 rounded-full border border-bio-navy/10">
                    Cohorte 2026-II
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-extrabold text-bio-navy leading-tight">{bio.name}</h4>
                  <p className="text-[11px] font-bold text-bio-green mt-0.5 leading-snug">{bio.role}</p>
                  <p className="text-[10px] font-mono text-bio-navy/60 font-semibold">{bio.org}</p>
                </div>

                <p className="text-xs text-bio-textMuted leading-relaxed italic">
                  "{bio.focus}"
                </p>
              </div>

              <div className="pt-3 border-t border-bio-navy/10 flex items-center justify-between text-[10px] text-bio-green font-extrabold">
                <span>Bioembajador Oficial</span>
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Join as Bioembajador Callout Banner */}
        <div className="p-6 rounded-3xl bg-bio-navy text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-bio-green/20 text-bio-neon flex items-center justify-center flex-shrink-0 border border-bio-green/30">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-extrabold text-white">¿Quieres ser un Bioembajador BHV?</h4>
              <p className="text-xs text-gray-300">Si eres estudiante de ciencias, ingeniería o comunicación y te apasiona la bioeconomía, súmate a nuestro equipo de voluntarios.</p>
            </div>
          </div>

          <Link
            to="/apply"
            className="px-6 py-3 rounded-xl bg-bio-green text-white font-extrabold text-xs uppercase tracking-wider hover:bg-bio-greenDark transition-colors flex-shrink-0 flex items-center space-x-2"
          >
            <span>Postular como Voluntario →</span>
          </Link>
        </div>
      </div>

    </div>
  );
}
