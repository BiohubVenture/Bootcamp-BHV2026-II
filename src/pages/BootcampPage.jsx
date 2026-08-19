import React, { useState } from 'react';
import { BOOTCAMP_SYLLABUS, BOOTCAMP_PHASES } from '../data/bootcampSyllabus';
import { TRANSLATIONS } from '../data/translations';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Sparkles, 
  Target, 
  Wrench, 
  BookOpen, 
  Layers, 
  ChevronRight,
  Compass,
  GraduationCap,
  Calendar,
  Check,
  Flame,
  Award
} from 'lucide-react';

export default function BootcampPage({ onOpenApply, currentLang }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.ES;
  const [activeWeekIndex, setActiveWeekIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'topics', 'practice', 'deliverable'

  const activeWeek = BOOTCAMP_SYLLABUS[activeWeekIndex];
  const activePhase = BOOTCAMP_PHASES.find(p => p.id === activeWeek.phaseId);

  const handlePhaseClick = (phase) => {
    // Jump to the first week of this phase (e.g. week 1, 4, or 7)
    const firstWeekIndex = BOOTCAMP_SYLLABUS.findIndex(w => w.week === phase.weeks[0]);
    if (firstWeekIndex !== -1) {
      setActiveWeekIndex(firstWeekIndex);
    }
  };

  const handlePrevWeek = () => {
    if (activeWeekIndex > 0) {
      setActiveWeekIndex(activeWeekIndex - 1);
    }
  };

  const handleNextWeek = () => {
    if (activeWeekIndex < BOOTCAMP_SYLLABUS.length - 1) {
      setActiveWeekIndex(activeWeekIndex + 1);
    } else {
      onOpenApply();
    }
  };

  return (
    <div className="py-10 bg-bio-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* ========================================================================= */}
        {/* 1. HERO HEADER                                                            */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-3 pt-2">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-bio-green/15 border border-bio-green/30 text-bio-greenDark text-xs font-mono font-black uppercase tracking-wider">
            <GraduationCap className="w-4 h-4 text-bio-green" />
            <span>Metodología de Aceleración BHV</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-bio-navy tracking-tight">
            Bootcamp: 8 semanas de transformación
          </h1>

          <p className="text-bio-textMuted text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Explora el syllabus interactivo paso a paso. Descubre qué aprenderás, qué aplicarás y qué evidencia entregará tu equipo en cada etapa.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2. THREE-PHASE PROGRESS STEPPER                                           */}
        {/* ========================================================================= */}
        <div className="bg-white p-3 sm:p-4 rounded-3xl border border-bio-navy/10 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3">
            {BOOTCAMP_PHASES.map((phase, idx) => {
              const isCurrentPhase = activeWeek.phaseId === phase.id;
              return (
                <button
                  key={phase.id}
                  type="button"
                  onClick={() => handlePhaseClick(phase)}
                  className={`p-3.5 sm:p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer flex items-center justify-between border ${
                    isCurrentPhase
                      ? 'bg-bio-navy text-white border-bio-navy shadow-md ring-2 ring-bio-green/30'
                      : 'bg-bio-cream/60 hover:bg-bio-paper text-bio-navy border-bio-navy/10 hover:border-bio-navy/20'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-black text-xs ${
                      isCurrentPhase ? 'bg-bio-green text-white' : 'bg-white text-bio-navy border border-bio-navy/15'
                    }`}>
                      0{idx + 1}
                    </div>
                    <div>
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider block ${
                        isCurrentPhase ? 'text-bio-neon' : 'text-bio-greenDark'
                      }`}>
                        Semanas {phase.weeks.join(', ')}
                      </span>
                      <h3 className="text-xs sm:text-sm font-extrabold leading-tight">
                        {phase.name.split(':')[0]}
                      </h3>
                    </div>
                  </div>

                  {isCurrentPhase && (
                    <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-bio-green text-white text-[10px] font-black uppercase">
                      Activa
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. SPLIT-VIEW MASTER-DETAIL WORKSPACE                                     */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ── LEFT COLUMN: 8-WEEK INTERACTIVE PLAYLIST (4 cols) ───────────────── */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between px-2 text-xs">
              <span className="font-mono font-black text-bio-navy uppercase tracking-wider">
                Ruta Formativa
              </span>
              <span className="text-bio-textMuted font-bold">
                Semana {activeWeekIndex + 1} de {BOOTCAMP_SYLLABUS.length}
              </span>
            </div>

            {/* List of 8 Week Cards */}
            <div className="space-y-2 max-h-[750px] overflow-y-auto pr-1">
              {BOOTCAMP_SYLLABUS.map((w, idx) => {
                const isActive = idx === activeWeekIndex;
                const IconComp = w.icon;

                return (
                  <button
                    key={w.week}
                    type="button"
                    onClick={() => setActiveWeekIndex(idx)}
                    className={`w-full p-3.5 rounded-2xl text-left transition-all duration-200 cursor-pointer flex items-center justify-between border ${
                      isActive
                        ? 'bg-white border-bio-green shadow-md ring-2 ring-bio-green/20'
                        : 'bg-white/80 hover:bg-white border-bio-navy/10 hover:border-bio-navy/25'
                    }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                        isActive 
                          ? 'bg-bio-green text-white shadow-sm' 
                          : 'bg-bio-paper text-bio-navy/70'
                      }`}>
                        <IconComp className="w-5 h-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-1.5">
                          <span className={`text-[10px] font-mono font-black uppercase ${
                            isActive ? 'text-bio-greenDark' : 'text-bio-navy/50'
                          }`}>
                            Semana 0{w.week}
                          </span>
                          <span className="text-[9px] text-gray-400">•</span>
                          <span className="text-[10px] text-bio-textMuted truncate font-bold">
                            {w.phaseName.split(':')[0]}
                          </span>
                        </div>

                        <h4 className={`text-xs sm:text-sm font-extrabold truncate leading-tight ${
                          isActive ? 'text-bio-navy' : 'text-bio-navy/80'
                        }`}>
                          {w.title}
                        </h4>
                      </div>
                    </div>

                    <ChevronRight className={`w-4 h-4 ml-2 flex-shrink-0 transition-transform ${
                      isActive ? 'text-bio-green translate-x-0.5' : 'text-gray-300'
                    }`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT COLUMN: INTERACTIVE WEEK CANVAS (8 cols) ──────────────────── */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl border border-bio-navy/10 shadow-xl overflow-hidden animate-fadeIn flex flex-col justify-between min-h-[650px]">
              
              {/* Canvas Header Bar */}
              <div className="p-6 sm:p-8 bg-gradient-to-br from-bio-navy via-bio-navyDeep to-bio-navyDark text-white space-y-4">
                
                {/* Meta badges */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 rounded-full bg-bio-green text-white text-xs font-mono font-black uppercase tracking-wider shadow-sm">
                      Semana 0{activeWeek.week}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/10 text-bio-neon text-xs font-bold border border-white/15">
                      {activeWeek.phaseName}
                    </span>
                  </div>

                  <span className="text-xs font-mono text-gray-300">
                    Módulo Oficial BHV 2026
                  </span>
                </div>

                {/* Week Title */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {activeWeek.title}
                </h2>

                {/* Objective Capsule */}
                <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-bio-neon/20 text-bio-neon flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono font-black text-bio-neon tracking-wider block">
                      Objetivo de la Semana:
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-gray-100 leading-snug">
                      {activeWeek.objective}
                    </p>
                  </div>
                </div>

                {/* Interactive Sub-tabs for clean digestion */}
                <div className="pt-2 flex flex-wrap gap-2">
                  {[
                    { id: 'all', label: '🌟 Vista Integral' },
                    { id: 'topics', label: '📘 Temario (Qué se trabajará)' },
                    { id: 'practice', label: '🛠️ Taller Práctico' },
                    { id: 'deliverable', label: '🏆 Entregable & Herramientas' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        activeTab === tab.id
                          ? 'bg-bio-green text-white shadow-sm font-extrabold'
                          : 'bg-white/10 hover:bg-white/20 text-gray-200 border border-white/10'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

              </div>

              {/* Canvas Content Body */}
              <div className="p-6 sm:p-8 flex-1 space-y-6">
                
                {/* 1. Qué se trabajará (Shown in 'all' or 'topics') */}
                {(activeTab === 'all' || activeTab === 'topics') && (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-bio-navy">
                      <BookOpen className="w-4 h-4 text-bio-green" />
                      <h3 className="text-sm sm:text-base font-extrabold">
                        Qué se trabajará en la semana:
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeWeek.topics.map((topic, i) => (
                        <div 
                          key={i} 
                          className="p-3.5 rounded-2xl bg-bio-paper/40 border border-bio-navy/10 flex items-start space-x-2.5 text-xs sm:text-sm font-bold text-bio-navy"
                        >
                          <span className="w-2 h-2 rounded-full bg-bio-green mt-1.5 flex-shrink-0" />
                          <span className="leading-relaxed">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Aplicación práctica (Shown in 'all' or 'practice') */}
                {(activeTab === 'all' || activeTab === 'practice') && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center space-x-2 text-bio-navy">
                      <Layers className="w-4 h-4 text-bio-green" />
                      <h3 className="text-sm sm:text-base font-extrabold">
                        Aplicación práctica y ejercicios de campo:
                      </h3>
                    </div>

                    <div className="space-y-2.5">
                      {activeWeek.practicalWork.map((action, i) => (
                        <div 
                          key={i} 
                          className="p-3.5 rounded-2xl bg-bio-cream/60 border border-bio-navy/10 flex items-start space-x-3 text-xs sm:text-sm"
                        >
                          <span className="px-2 py-0.5 rounded-md bg-bio-navy text-bio-neon font-mono font-black text-xs flex-shrink-0 mt-0.5">
                            Paso 0{i + 1}
                          </span>
                          <span className="text-bio-textDark font-semibold leading-relaxed">
                            {action}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Entregable Clave & Herramientas (Shown in 'all' or 'deliverable') */}
                {(activeTab === 'all' || activeTab === 'deliverable') && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-2">
                    
                    {/* Dominant Deliverable Box (8 cols) */}
                    <div className="md:col-span-8 p-5 rounded-3xl bg-white border-2 border-bio-green shadow-md space-y-2 relative overflow-hidden">
                      <div className="flex items-center space-x-2 text-bio-greenDark">
                        <CheckCircle2 className="w-5 h-5 text-bio-green flex-shrink-0" />
                        <span className="text-xs font-mono font-black uppercase tracking-wider">
                          Entregable Clave Oficial
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm font-extrabold text-bio-navy leading-snug">
                        {activeWeek.keyDeliverable}
                      </p>

                      <p className="text-[11px] text-bio-textMuted flex items-center space-x-1 pt-1">
                        <Sparkles className="w-3.5 h-3.5 text-bio-green" />
                        <span>Requisito evaluado para la sesión de mentoría semanal.</span>
                      </p>
                    </div>

                    {/* Tools Box (4 cols) */}
                    <div className="md:col-span-4 p-5 rounded-2xl bg-bio-paper/50 border border-bio-navy/10 space-y-2 flex flex-col justify-between">
                      <div className="flex items-center space-x-1.5 text-bio-navy">
                        <Wrench className="w-4 h-4 text-bio-green" />
                        <h4 className="text-[11px] font-black uppercase tracking-wider">
                          Herramientas:
                        </h4>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {activeWeek.tools.map((tool, i) => (
                          <span 
                            key={i} 
                            className="px-2.5 py-1 rounded-lg bg-white border border-bio-navy/15 text-bio-navy text-[11px] font-bold shadow-2xs"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

              </div>

              {/* Canvas Footer: Connection & Prev / Next Controls */}
              <div className="border-t border-bio-navy/10 bg-bio-cream/80 p-5 sm:p-6 space-y-4">
                
                {/* Next Milestone Connection strip */}
                <div className="flex items-start sm:items-center space-x-2 text-xs text-bio-navy font-bold bg-bio-neon/20 px-3.5 py-2.5 rounded-xl border border-bio-green/20">
                  <Compass className="w-4 h-4 text-bio-green flex-shrink-0 mt-0.5 sm:mt-0" />
                  <div>
                    <span className="font-extrabold uppercase font-mono text-[10px] text-bio-greenDark mr-1">
                      Conexión con el siguiente hito:
                    </span>
                    <span>{activeWeek.connection}</span>
                  </div>
                </div>

                {/* Bottom Navigation Buttons */}
                <div className="flex items-center justify-between gap-3 pt-1">
                  
                  {/* Prev button */}
                  <button
                    type="button"
                    onClick={handlePrevWeek}
                    disabled={activeWeekIndex === 0}
                    className={`inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      activeWeekIndex === 0 
                        ? 'opacity-40 cursor-not-allowed bg-bio-paper text-gray-400' 
                        : 'bg-white border border-bio-navy/20 text-bio-navy hover:bg-bio-paper'
                    }`}
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Semana Anterior</span>
                    <span className="sm:hidden">Anterior</span>
                  </button>

                  {/* Direct Apply CTA */}
                  <button
                    type="button"
                    onClick={onOpenApply}
                    className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-bio-navy hover:bg-bio-navyDark text-white text-xs font-black shadow-md cursor-pointer transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-bio-neon" />
                    <span>Postular al Bootcamp</span>
                  </button>

                  {/* Next button */}
                  <button
                    type="button"
                    onClick={handleNextWeek}
                    className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-bio-green hover:bg-bio-greenDark text-white text-xs font-extrabold shadow-sm transition-colors cursor-pointer"
                  >
                    <span className="hidden sm:inline">
                      {activeWeekIndex === BOOTCAMP_SYLLABUS.length - 1 ? 'Finalizar Recorrido' : 'Siguiente Semana'}
                    </span>
                    <span className="sm:hidden">Siguiente</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                </div>

              </div>

            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 4. FINAL CALL TO ACTION BANNER                                            */}
        {/* ========================================================================= */}
        <div className="bg-gradient-to-r from-bio-navy via-bio-navyDeep to-bio-greenDark text-white p-8 sm:p-12 rounded-3xl shadow-2xl space-y-6 text-center max-w-5xl mx-auto border border-bio-green/30">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-bio-neon/20 border border-bio-neon/30 text-bio-neon text-xs font-mono font-black uppercase">
            <span>Convocatoria Oficial 2026-II</span>
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            ¿Listo para acelerar tu startup biotecnológica?
          </h3>

          <p className="text-gray-200 text-xs sm:text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Accede a validación en laboratorios biológicos de punta, mentoría especializada en bioeconomía y conexión directa con fondos de inversión.
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
