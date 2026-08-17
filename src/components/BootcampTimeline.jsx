import React, { useState } from 'react';
import { BOOTCAMP_WEEKS } from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';
import { 
  Globe, Lightbulb, BarChart3, Users, Box, Rocket, DollarSign, Award, ArrowRight, CheckCircle2, Calendar 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const weekIcons = [Globe, Lightbulb, BarChart3, Users, Box, Rocket, DollarSign, Award];

export default function BootcampTimeline({ onOpenApply, currentLang }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.ES;
  const [activeWeek, setActiveWeek] = useState(0);

  return (
    <section id="bootcamp" className="py-20 bg-white border-b border-bio-navy/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <span className="px-3.5 py-1.5 rounded-full bg-bio-green/15 text-bio-greenDark text-xs font-black uppercase tracking-wider">
              {t.bootcampSection.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-bio-navy tracking-tight leading-tight">
              {t.bootcampSection.title}
            </h2>
            <p className="text-bio-textMuted text-base leading-relaxed">
              {t.bootcampSection.subtitle}
            </p>
          </div>

          <Link
            to="/bootcamp"
            className="inline-flex items-center text-xs font-extrabold text-bio-green hover:text-bio-greenDark transition-colors flex-shrink-0"
          >
            <span>{t.bootcampSection.viewFull} →</span>
          </Link>
        </div>

        {/* Interactive Horizontal 8-Week Stepper Bar */}
        <div className="relative pt-4 pb-2">
          {/* Progress Connecting Line */}
          <div className="hidden lg:block absolute top-10 left-12 right-12 h-1 bg-bio-navy/10 z-0">
            <div 
              className="h-full bg-bio-green transition-all duration-500 rounded-full"
              style={{ width: `${(activeWeek / (BOOTCAMP_WEEKS.length - 1)) * 100}%` }}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 relative z-10">
            {BOOTCAMP_WEEKS.map((w, idx) => {
              const IconComp = weekIcons[idx] || Globe;
              const isActive = idx === activeWeek;
              const isPast = idx < activeWeek;

              return (
                <button
                  key={w.week}
                  onClick={() => setActiveWeek(idx)}
                  className={`p-3 rounded-2xl flex flex-col items-center text-center transition-all duration-300 border-2 ${
                    isActive 
                      ? 'bg-bio-green text-white border-bio-green shadow-lg scale-105' 
                      : isPast
                        ? 'bg-bio-paper text-bio-navy border-bio-green/40 hover:border-bio-green'
                        : 'bg-bio-cream/60 text-bio-navy border-bio-navy/10 hover:border-bio-navy/30'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-1.5 ${
                    isActive ? 'bg-white text-bio-green' : 'bg-bio-paper text-bio-navy'
                  }`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-black uppercase">
                    SEM {w.week}
                  </span>
                  <span className="text-[11px] font-extrabold truncate w-full mt-0.5">
                    {w.title.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Week Interactive Showcase Card */}
        <div className="retro-card p-8 bg-bio-paper/50 border-l-4 border-l-bio-green shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center space-x-3">
                <span className="px-3.5 py-1 rounded-full bg-bio-green text-white text-xs font-black font-mono shadow-xs">
                  SEMANA {BOOTCAMP_WEEKS[activeWeek].week} DE 08
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-bio-navy">
                  {BOOTCAMP_WEEKS[activeWeek].title}
                </h3>
              </div>

              <p className="text-sm text-bio-textDark leading-relaxed">
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

      </div>
    </section>
  );
}
