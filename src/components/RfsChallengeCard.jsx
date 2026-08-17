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
    <button
      type="button"
      onClick={() => onSelect(rfs)}
      className="retro-card bg-white p-5 text-left cursor-pointer flex flex-col justify-between hover:border-bio-green hover:shadow-card-hover group transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-bio-green/40 focus:ring-offset-2 focus:ring-offset-bio-cream"
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="w-11 h-11 rounded-xl bg-bio-cream flex items-center justify-center text-bio-green group-hover:bg-bio-green group-hover:text-white transition-colors">
            <IconComp className="w-5 h-5" />
          </div>
          <div className="text-right">
            <span className="block text-xl font-mono font-bold text-bio-navy/30 group-hover:text-bio-green transition-colors">
              {rfs.number}
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-bio-textMuted">
              {rfs.pillar}
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-base font-extrabold text-bio-navy leading-snug group-hover:text-bio-green transition-colors">
            {rfs.title}
          </h3>
          <p className="mt-2 text-xs text-bio-textMuted leading-relaxed line-clamp-3">
            {rfs.shortDesc}
          </p>
        </div>

        <div className="rounded-xl bg-bio-cream/70 border border-bio-navy/5 p-3">
          <p className="text-[10px] font-black uppercase tracking-wider text-bio-greenDark mb-1">
            Señal de mercado
          </p>
          <p className="text-xs font-semibold text-bio-navy leading-snug line-clamp-2">
            {rfs.marketSignal}
          </p>
        </div>

        {!compact && (
          <div className="flex flex-wrap gap-1.5">
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

      <div className="mt-5 pt-4 border-t border-bio-navy/5 flex items-center justify-between gap-3">
        <span className="text-[10px] font-extrabold text-bio-greenDark bg-bio-neon/20 px-2 py-1 rounded-md whitespace-nowrap">
          TAM ref. {rfs.tam}
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-extrabold text-bio-green group-hover:translate-x-1 transition-transform">
          Ver brief
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </button>
  );
}
