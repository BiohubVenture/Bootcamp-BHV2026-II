import React, { useState } from 'react';
import { BOOTCAMP_WEEKS } from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';
import { 
  Globe, Lightbulb, BarChart3, Users, Box, Rocket, DollarSign, Award, ArrowRight, CheckCircle2, Calendar 
} from 'lucide-react';

const weekIcons = [Globe, Lightbulb, BarChart3, Users, Box, Rocket, DollarSign, Award];

export default function BootcampPage({ onOpenApply, currentLang }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.ES;
  const [activeWeek, setActiveWeek] = useState(0);

  return (
    <div className="py-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="px-3.5 py-1.5 rounded-full bg-bio-green/15 text-bio-greenDark text-xs font-black uppercase tracking-wider">
            {t.bootcampSection.badge}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-bio-navy">
            {t.bootcampSection.title}
          </h1>
          <p className="text-bio-textMuted text-base sm:text-lg">
            {t.bootcampSection.subtitle}
          </p>
        </div>

        {/* 8 Weeks Grid Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          {BOOTCAMP_WEEKS.map((w, idx) => {
            const IconComp = weekIcons[idx] || Globe;
            const isActive = idx === activeWeek;

            return (
              <div
                key={w.week}
                onClick={() => setActiveWeek(idx)}
                className={`retro-card p-5 cursor-pointer border-2 transition-all ${
                  isActive 
                    ? 'border-bio-green bg-bio-neon/10 shadow-md scale-102' 
                    : 'border-bio-navy/10 hover:border-bio-green/40 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isActive ? 'bg-bio-green text-white' : 'bg-bio-cream text-bio-green'
                  }`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-black text-bio-navy/40">
                    SEMANA {w.week}
                  </span>
                </div>

                <h3 className="text-sm font-extrabold text-bio-navy leading-snug mb-1">
                  {w.title}
                </h3>
              </div>
            );
          })}
        </div>

        {/* Selected Week Deep Dive Card */}
        <div className="retro-card p-8 bg-bio-paper/60 border-l-4 border-l-bio-green shadow-lg mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 rounded-full bg-bio-green text-white text-xs font-black font-mono">
                  SEMANA {BOOTCAMP_WEEKS[activeWeek].week}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-bio-navy">
                  {BOOTCAMP_WEEKS[activeWeek].title}
                </h2>
              </div>

              <p className="text-base text-bio-textDark leading-relaxed">
                {BOOTCAMP_WEEKS[activeWeek].desc}
              </p>
            </div>

            <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-bio-navy/10 shadow-sm space-y-3">
              <div className="flex items-center space-x-2 text-bio-green text-xs font-extrabold uppercase">
                <CheckCircle2 className="w-5 h-5" />
                <span>{t.bootcampSection.deliverable}</span>
              </div>
              <p className="text-sm font-extrabold text-bio-navy">
                {BOOTCAMP_WEEKS[activeWeek].deliverable}
              </p>
            </div>

          </div>
        </div>

        {/* CTA Banner */}
        <div className="text-center bg-bio-navy text-white p-10 rounded-2xl shadow-xl space-y-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold">¿Listo para las 8 semanas de transformación?</h3>
          <p className="text-sm text-gray-300 max-w-xl mx-auto">
            Aplica a la cohorte 2026-II y accede al ecosistema de mentores, corporativos e inversores.
          </p>
          <button
            onClick={onOpenApply}
            className="inline-flex items-center px-7 py-3.5 rounded-xl bg-bio-green text-white font-bold text-sm hover:bg-bio-greenDark transition-colors shadow-md"
          >
            <span>{t.nav.applyBtn}</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>

      </div>
    </div>
  );
}
