import React, { useState } from 'react';
import { BOOTCAMP_SYLLABUS, BOOTCAMP_PHASES } from '../data/bootcampSyllabus';
import { TRANSLATIONS } from '../data/translations';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Target, 
  Wrench, 
  BookOpen, 
  Layers, 
  ChevronRight,
  ExternalLink,
  Calendar,
  Compass,
  ArrowUpRight
} from 'lucide-react';

export default function BootcampPage({ onOpenApply, currentLang }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.ES;
  const [activeWeekIndex, setActiveWeekIndex] = useState(0);
  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState('all');

  const activeWeek = BOOTCAMP_SYLLABUS[activeWeekIndex];

  const filteredWeeks = selectedPhaseFilter === 'all'
    ? BOOTCAMP_SYLLABUS
    : BOOTCAMP_SYLLABUS.filter(w => w.phaseId === selectedPhaseFilter);

  return (
    <div className="py-12 bg-bio-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* ========================================================================= */}
        {/* 1. HERO HEADER                                                            */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-bio-green/15 border border-bio-green/30 text-bio-greenDark text-xs font-mono font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-bio-green" />
            <span>Metodología de Aceleración BHV</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-bio-navy tracking-tight leading-tight">
            Bootcamp: 8 semanas de transformación
          </h1>

          <p className="text-bio-textMuted text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Syllabus formativo intensivo. Conoce qué aprenderá, qué aplicará y qué entregará tu equipo en cada una de las 8 semanas de aceleración.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2. THREE FORMATIVE PHASES SUMMARY BAR                                     */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {BOOTCAMP_PHASES.map((phase) => {
            const isSelected = selectedPhaseFilter === phase.id;
            return (
              <button
                key={phase.id}
                type="button"
                onClick={() => setSelectedPhaseFilter(selectedPhaseFilter === phase.id ? 'all' : phase.id)}
                className={`p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected 
                    ? 'bg-white border-bio-green shadow-md ring-2 ring-bio-green/20' 
                    : 'bg-white/70 border-bio-navy/10 hover:bg-white hover:border-bio-navy/25 shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-black uppercase tracking-wider text-bio-green bg-bio-neon/20 px-2.5 py-0.5 rounded-full">
                      Semanas {phase.weeks.join(', ')}
                    </span>
                    <span className="text-xs text-bio-textMuted font-bold">
                      {isSelected ? '✓ Filtrado' : 'Filtrar'}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold text-bio-navy">
                    {phase.name}
                  </h3>
                  <p className="text-xs text-bio-textMuted mt-1.5 leading-relaxed">
                    {phase.purpose}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {selectedPhaseFilter !== 'all' && (
          <div className="flex items-center justify-between bg-bio-paper/60 px-4 py-2 rounded-xl border border-bio-navy/10 text-xs">
            <span className="font-bold text-bio-navy">
              Mostrando semanas de la fase seleccionada.
            </span>
            <button
              onClick={() => setSelectedPhaseFilter('all')}
              className="text-bio-green hover:text-bio-greenDark font-extrabold underline cursor-pointer"
            >
              Ver las 8 semanas completas
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. 8-WEEK SUMMARIZED CARDS GRID                                           */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredWeeks.map((w) => {
            const actualIndex = BOOTCAMP_SYLLABUS.findIndex(item => item.week === w.week);
            const isActive = actualIndex === activeWeekIndex;
            const IconComp = w.icon;

            return (
              <div
                key={w.week}
                onClick={() => setActiveWeekIndex(actualIndex)}
                className={`p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between relative group ${
                  isActive
                    ? 'border-bio-green bg-white shadow-xl ring-2 ring-bio-green/20 transform -translate-y-1'
                    : 'border-bio-navy/10 bg-white/80 hover:bg-white hover:border-bio-green/40 hover:shadow-md'
                }`}
              >
                {/* Active Glowing Indicator Accent */}
                {isActive && (
                  <span className="absolute -top-2 right-4 px-2.5 py-0.5 rounded-full bg-bio-green text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                    Seleccionado
                  </span>
                )}

                <div>
                  {/* Top Bar: Icon + Week Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                      isActive 
                        ? 'bg-bio-green text-white shadow-md' 
                        : 'bg-bio-cream text-bio-green group-hover:bg-bio-green/10'
                    }`}>
                      <IconComp className="w-5 h-5" />
                    </div>

                    <span className={`text-xs font-mono font-black px-2.5 py-1 rounded-md ${
                      isActive ? 'bg-bio-navy text-bio-neon' : 'bg-bio-paper text-bio-navy/60'
                    }`}>
                      SEMANA 0{w.week}
                    </span>
                  </div>

                  {/* Week Title */}
                  <h3 className={`text-sm sm:text-base font-extrabold leading-snug mb-2 transition-colors ${
                    isActive ? 'text-bio-greenDark' : 'text-bio-navy group-hover:text-bio-green'
                  }`}>
                    {w.title}
                  </h3>

                  {/* Week Purpose (max 20 words) */}
                  <p className="text-xs text-bio-textMuted leading-relaxed line-clamp-3 mb-4">
                    {w.purpose}
                  </p>
                </div>

                {/* Bottom Card Footer: Deliverable Pill & CTA trigger */}
                <div className="pt-3 border-t border-bio-navy/10 space-y-2">
                  <div className="flex items-center space-x-1 text-[11px] text-bio-navy font-extrabold bg-bio-paper/60 px-2.5 py-1 rounded-lg">
                    <CheckCircle2 className="w-3.5 h-3.5 text-bio-green flex-shrink-0" />
                    <span className="truncate">{w.deliverableShort}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-black text-bio-green pt-1">
                    <span>{isActive ? 'Viendo syllabus' : 'Ver contenido'}</span>
                    <ChevronRight className={`w-4 h-4 transform transition-transform ${
                      isActive ? 'rotate-90 text-bio-greenDark' : 'group-hover:translate-x-1'
                    }`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* 4. EXPANDED FULL-WIDTH SYLLABUS DETAIL ACCORDION PANEL                     */}
        {/* ========================================================================= */}
        {activeWeek && (
          <div className="bg-white rounded-3xl border-2 border-bio-green shadow-2xl overflow-hidden animate-fadeIn">
            
            {/* Panel Header */}
            <div className="p-6 sm:p-8 bg-gradient-to-r from-bio-navy via-bio-navyDeep to-bio-navyDark text-white border-b border-bio-green/20">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-md bg-bio-green text-white text-xs font-mono font-black uppercase tracking-wider">
                  SEMANA 0{activeWeek.week}
                </span>
                <span className="px-3 py-1 rounded-md bg-white/10 text-bio-neon text-xs font-bold border border-white/15">
                  Fase: {activeWeek.phaseName}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                {activeWeek.title}
              </h2>

              {/* Dominant Objective Banner */}
              <div className="mt-4 p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xs flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-bio-neon/20 text-bio-neon flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono font-black text-bio-neon tracking-wider block">
                    Objetivo Principal de la Semana:
                  </span>
                  <p className="text-sm sm:text-base font-bold text-gray-100 leading-snug">
                    {activeWeek.objective}
                  </p>
                </div>
              </div>
            </div>

            {/* Panel Body Grid (2 Columns: Main Info + Dominant Deliverable/Tools) */}
            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column (7 cols): Qué se trabajará & Aplicación práctica */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* 1. Qué se trabajará */}
                <div className="bg-bio-paper/40 p-6 rounded-2xl border border-bio-navy/10 space-y-3">
                  <div className="flex items-center space-x-2 text-bio-navy">
                    <BookOpen className="w-5 h-5 text-bio-green" />
                    <h3 className="text-base font-extrabold">Qué se trabajará:</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {activeWeek.topics.map((topic, i) => (
                      <li key={i} className="flex items-start space-x-2.5 text-xs sm:text-sm text-bio-navy font-bold">
                        <span className="w-2 h-2 rounded-full bg-bio-green mt-1.5 flex-shrink-0" />
                        <span className="leading-relaxed">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2. Aplicación práctica */}
                <div className="bg-bio-paper/40 p-6 rounded-2xl border border-bio-navy/10 space-y-3">
                  <div className="flex items-center space-x-2 text-bio-navy">
                    <Layers className="w-5 h-5 text-bio-green" />
                    <h3 className="text-base font-extrabold">Aplicación práctica y ejercicios:</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {activeWeek.practicalWork.map((action, i) => (
                      <li key={i} className="flex items-start space-x-2.5 text-xs sm:text-sm text-bio-textDark">
                        <span className="px-1.5 py-0.5 rounded bg-bio-navy text-bio-neon font-mono font-black text-[10px] mt-0.5 flex-shrink-0">
                          0{i + 1}
                        </span>
                        <span className="leading-relaxed font-semibold">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Right Column (5 cols): Herramientas & Entregable Clave Dominante */}
              <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
                
                {/* Entregable Clave (Dominant Visual Block) */}
                <div className="p-6 rounded-3xl bg-white border-2 border-bio-green shadow-lg space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-bio-neon/10 rounded-bl-full pointer-events-none" />
                  
                  <div className="flex items-center space-x-2 text-bio-greenDark">
                    <CheckCircle2 className="w-6 h-6 text-bio-green flex-shrink-0" />
                    <span className="text-xs font-mono font-black uppercase tracking-wider">
                      Entregable Clave Oficial
                    </span>
                  </div>

                  <p className="text-sm sm:text-base font-extrabold text-bio-navy leading-snug">
                    {activeWeek.keyDeliverable}
                  </p>

                  <div className="pt-2 text-[11px] text-bio-textMuted flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 text-bio-green" />
                    <span>Evaluado y validado en las sesiones semanales con mentores BHV.</span>
                  </div>
                </div>

                {/* Herramientas Utilizadas */}
                <div className="p-6 rounded-2xl bg-bio-cream border border-bio-navy/10 space-y-3">
                  <div className="flex items-center space-x-2 text-bio-navy">
                    <Wrench className="w-4 h-4 text-bio-green" />
                    <h4 className="text-xs font-black uppercase tracking-wider">
                      Herramientas de Trabajo:
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeWeek.tools.map((tool, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1.5 rounded-xl bg-white border border-bio-navy/15 text-bio-navy text-xs font-bold shadow-2xs"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* Panel Footer: Conexión con la siguiente etapa */}
            <div className="px-6 py-4 sm:px-8 bg-bio-neon/15 border-t border-bio-green/20 flex items-center space-x-3 text-xs sm:text-sm font-bold text-bio-navyDark">
              <Compass className="w-5 h-5 text-bio-greenDark flex-shrink-0" />
              <div>
                <span className="font-extrabold text-bio-greenDark uppercase text-[11px] font-mono mr-1.5 block sm:inline">
                  Conexión con el siguiente hito:
                </span>
                <span>{activeWeek.connection}</span>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* 5. BOTTOM COHORT CTA BANNER                                               */}
        {/* ========================================================================= */}
        <div className="bg-gradient-to-r from-bio-navy via-bio-navyDeep to-bio-greenDark text-white p-8 sm:p-12 rounded-3xl shadow-2xl space-y-6 text-center max-w-5xl mx-auto border border-bio-green/30">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-bio-neon/20 border border-bio-neon/30 text-bio-neon text-xs font-mono font-black uppercase">
            <span>Convocatoria Oficial 2026-II</span>
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            ¿Listo para vivir las 8 semanas de aceleración?
          </h3>

          <p className="text-gray-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Postula tu startup o proyecto biotecnológico antes del 15 de septiembre y accede a validación en laboratorios, red de mentores y conexión directa con fondos de inversión.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenApply}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-bio-green hover:bg-bio-greenDark text-white font-extrabold text-sm transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 mr-2 text-bio-neon" />
              <span>Postular al Bootcamp 2026-II</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
