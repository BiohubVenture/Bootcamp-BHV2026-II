import React from 'react';
import {
  X,
  Sparkles,
  Target,
  ArrowRight,
  ShieldAlert,
  TrendingUp,
  Leaf,
  Users,
  LineChart,
  Lightbulb,
  AlertTriangle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const impactConfig = [
  { key: 'environmental', label: 'Ambiental', Icon: Leaf },
  { key: 'social', label: 'Social', Icon: Users },
  { key: 'economic', label: 'Económico', Icon: LineChart }
];

export default function RfsModal({ rfs, items = [], onSelect, onClose, onApply }) {
  if (!rfs) return null;

  const currentIndex = items.findIndex((item) => item.id === rfs.id);
  const canNavigate = currentIndex >= 0 && items.length > 1 && onSelect;
  const previousRfs = canNavigate ? items[(currentIndex - 1 + items.length) % items.length] : null;
  const nextRfs = canNavigate ? items[(currentIndex + 1) % items.length] : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bio-navyDark/80 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rfs-modal-title"
    >
      <div className="bg-white w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-bio-navy/10 relative my-8 max-h-[92vh] flex flex-col">
        <div className="bg-bio-navy text-white p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute inset-y-0 right-0 w-1/3 bg-bio-green/10" />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-300 hover:text-white rounded-lg bg-white/10 hover:bg-white/20 transition-colors z-10"
            aria-label="Cerrar ficha"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative z-10 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-2.5 py-1 rounded text-xs font-mono font-black bg-bio-neon/20 text-bio-neon border border-bio-neon/30">
                RFS {rfs.number} / 10
              </span>
              <span className="text-xs font-semibold text-white/75">
                {rfs.pillar} · {rfs.pillarName}
              </span>
            </div>

            <h3 id="rfs-modal-title" className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              {rfs.title}
            </h3>

            <p className="mt-4 text-sm sm:text-base text-white/80 leading-relaxed">
              {rfs.opportunity}
            </p>

            <div className="mt-5 flex flex-wrap gap-2 text-xs">
              <span className="bg-bio-green text-white font-extrabold px-3 py-1.5 rounded-md">
                TAM ref. {rfs.tam}
              </span>
              <span className="bg-white/10 text-white font-bold px-3 py-1.5 rounded-md border border-white/10">
                Convocatoria Biohub Venture 2026-II
              </span>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-8 overflow-y-auto flex-1 text-bio-textDark bg-bio-cream/35">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-6">
            <div className="space-y-5">
              <section className="bg-white rounded-2xl border border-bio-navy/10 p-5">
                <h4 className="text-xs font-extrabold text-bio-navy uppercase tracking-wider flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-bio-green" />
                  Antecedente y problema
                </h4>
                <p className="mt-3 text-sm text-bio-textMuted leading-relaxed">
                  {rfs.problem}
                </p>
              </section>

              <section className="bg-white rounded-2xl border border-bio-navy/10 p-5">
                <h4 className="text-xs font-extrabold text-bio-navy uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-bio-neon" />
                  Demanda de mercado
                </h4>
                <p className="mt-3 text-sm text-bio-textMuted leading-relaxed">
                  {rfs.marketDemand || rfs.whyNow}
                </p>
                <div className="mt-4 rounded-xl bg-bio-paper/70 border border-bio-navy/5 p-3">
                  <p className="text-[10px] font-black uppercase tracking-wider text-bio-greenDark mb-1">
                    Por qué ahora
                  </p>
                  <p className="text-xs text-bio-navy font-semibold leading-relaxed">
                    {rfs.whyNow}
                  </p>
                </div>
              </section>

              <section className="bg-white rounded-2xl border border-bio-navy/10 p-5">
                <h4 className="text-xs font-extrabold text-bio-navy uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-bio-green" />
                  Impacto potencial
                </h4>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {impactConfig.map(({ key, label, Icon }) => (
                    <div key={key} className="rounded-xl bg-bio-cream border border-bio-navy/5 p-3">
                      <div className="flex items-center gap-2 text-[11px] font-black text-bio-greenDark uppercase tracking-wider">
                        <Icon className="w-4 h-4 text-bio-green" />
                        {label}
                      </div>
                      <p className="mt-2 text-xs text-bio-textMuted leading-relaxed">
                        {rfs.impact?.[key]}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-5">
              <section className="bg-white rounded-2xl border border-bio-green/20 p-5">
                <h4 className="text-xs font-extrabold text-bio-navy uppercase tracking-wider flex items-center gap-2">
                  <Target className="w-4 h-4 text-bio-igbm" />
                  Perfil buscado
                </h4>
                <p className="mt-3 text-sm text-bio-textMuted leading-relaxed">
                  {rfs.targetProfile}
                </p>
              </section>

              <section className="bg-bio-navy text-white rounded-2xl p-5">
                <h4 className="text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 text-bio-neon">
                  <Lightbulb className="w-4 h-4" />
                  Prueba BHV en 8 semanas
                </h4>
                <p className="mt-3 text-sm font-bold leading-relaxed">
                  {rfs.successMetrics}
                </p>
                <p className="mt-3 text-xs text-white/75 leading-relaxed">
                  {rfs.proofPlan}
                </p>
              </section>

              <details className="bg-white rounded-2xl border border-bio-navy/10 p-5 group">
                <summary className="cursor-pointer list-none text-xs font-extrabold text-bio-navy uppercase tracking-wider flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-bio-accentYellow" />
                    Consideraciones
                  </span>
                  <span className="text-bio-green group-open:rotate-90 transition-transform">›</span>
                </summary>
                <p className="mt-3 text-xs text-bio-textMuted leading-relaxed">
                  {rfs.safeguards}
                </p>
              </details>
            </aside>
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white border-t border-bio-navy/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {canNavigate && (
              <>
                <button
                  type="button"
                  onClick={() => onSelect(previousRfs)}
                  className="inline-flex items-center gap-1 px-3 py-2 text-xs font-bold text-bio-navy hover:bg-bio-cream rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  RFS anterior
                </button>
                <button
                  type="button"
                  onClick={() => onSelect(nextRfs)}
                  className="inline-flex items-center gap-1 px-3 py-2 text-xs font-bold text-bio-navy hover:bg-bio-cream rounded-lg transition-colors"
                >
                  RFS siguiente
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-bold text-bio-navy hover:bg-bio-cream rounded-lg transition-colors"
            >
              Cerrar
            </button>

            <button
              type="button"
              onClick={onApply}
              className="inline-flex items-center px-5 sm:px-6 py-3 rounded-xl text-sm font-bold text-white bg-bio-green hover:bg-bio-greenDark shadow-md transition-all"
            >
              <span>Aplicar a este desafío</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
