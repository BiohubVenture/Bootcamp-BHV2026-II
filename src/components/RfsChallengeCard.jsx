import React from 'react';
import {
  ShieldCheck,
  Sprout,
  Apple,
  HeartPulse,
  Stethoscope,
  Cpu,
  Recycle,
  Compass,
  Sparkles,
  Landmark,
  ArrowRight,
  Leaf,
  TrendingUp,
  Users
} from 'lucide-react';

const iconMap = {
  1: ShieldCheck,
  2: Sprout,
  3: Apple,
  4: HeartPulse,
  5: Stethoscope,
  6: Cpu,
  7: Recycle,
  8: Compass,
  9: Sparkles,
  10: Landmark
};

const impactItems = [
  { key: 'environmental', label: 'Ambiental', Icon: Leaf },
  { key: 'social', label: 'Social', Icon: Users },
  { key: 'economic', label: 'Económico', Icon: TrendingUp }
];

export default function RfsChallengeCard({ rfs, onSelect, compact = false }) {
  const IconComp = iconMap[rfs.id] || Sparkles;
  const visibleImpacts = impactItems.filter(({ key }) => Boolean(rfs.impact?.[key]));

  return (
    <div
      onClick={() => onSelect(rfs)}
      className="bg-white rounded-3xl overflow-hidden border border-bio-navy/10 shadow-sm hover:shadow-xl hover:border-bio-green/40 transition-all duration-300 flex flex-col justify-between group cursor-pointer text-left"
    >
      <div>
        {/* Cover Image Container */}
        <div className="relative h-44 w-full overflow-hidden bg-bio-navy">
          <img
            src={rfs.image || 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80'}
            alt={rfs.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bio-navyDark/90 via-bio-navyDark/30 to-transparent" />

          {/* Floating Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-[11px] font-mono font-black uppercase tracking-wider bg-bio-navy/85 backdrop-blur-md text-bio-neon border border-bio-neon/30 flex items-center gap-1.5 shadow-sm">
              <IconComp className="w-3.5 h-3.5" />
              RFS {rfs.number} · {rfs.pillar}
            </span>

            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/90 backdrop-blur-md text-bio-navy shadow-sm">
              {rfs.pillarName}
            </span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
            <span className="text-[11px] font-extrabold bg-bio-green/90 backdrop-blur-sm px-2.5 py-1 rounded-lg">
              TAM ref. {rfs.tam}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6 space-y-3">
          <h3 className="text-lg font-extrabold text-bio-navy leading-snug group-hover:text-bio-green transition-colors">
            {rfs.title}
          </h3>

          <p className="text-xs text-bio-textMuted leading-relaxed line-clamp-3">
            {rfs.shortDesc || rfs.problem}
          </p>

          <div className="rounded-xl bg-bio-cream/80 border border-bio-navy/5 p-3">
            <p className="text-[10px] font-black uppercase tracking-wider text-bio-greenDark mb-1">
              Señal de Mercado & Demanda:
            </p>
            <p className="text-xs font-semibold text-bio-navy leading-snug line-clamp-2">
              {rfs.marketSignal}
            </p>
          </div>

          {!compact && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {visibleImpacts.map(({ key, label, Icon }) => (
                <span
                  key={key}
                  className="inline-flex items-center gap-1 rounded-full bg-bio-paper px-2 py-1 text-[10px] font-bold text-bio-navy"
                >
                  <Icon className="w-3 h-3 text-bio-green" />
                  {label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-5 pt-0">
        <div className="pt-3 border-t border-bio-navy/10 flex items-center justify-between">
          <span className="text-[11px] font-extrabold text-bio-navy/60">
            Convocatoria 2026-II
          </span>

          <span className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-bio-green group-hover:translate-x-1 transition-transform">
            <span>Ver Brief</span>
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </div>
  );
}
