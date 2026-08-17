import React, { useMemo, useState } from 'react';
import { RFS_ITEMS } from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';
import { Search, Filter, Layers3, TrendingUp } from 'lucide-react';
import RfsModal from '../components/RfsModal';
import RfsChallengeCard from '../components/RfsChallengeCard';

const pillars = ['Todos', ...new Set(RFS_ITEMS.map((item) => item.pillar))];

const getSearchText = (item) => [
  item.title,
  item.pillar,
  item.pillarName,
  item.shortDesc,
  item.problem,
  item.whyNow,
  item.marketSignal,
  item.marketDemand,
  item.opportunity,
  item.targetProfile,
  item.successMetrics,
  ...Object.values(item.impact || {})
].filter(Boolean).join(' ').toLowerCase();

export default function RfsPage({ onOpenApply, currentLang }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.ES;
  const [selectedPillar, setSelectedPillar] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRfs, setSelectedRfs] = useState(null);

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return RFS_ITEMS.filter((item) => {
      const matchesPillar = selectedPillar === 'Todos' || item.pillar === selectedPillar;
      const matchesSearch = !query || getSearchText(item).includes(query);
      return matchesPillar && matchesSearch;
    });
  }, [searchQuery, selectedPillar]);

  return (
    <div className="py-12 bg-bio-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-10 space-y-5">
          <span className="px-3.5 py-1.5 rounded-full bg-bio-green/15 text-bio-greenDark text-xs font-black uppercase tracking-wider">
            {t.rfsSection.badge}
          </span>
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-bio-navy leading-tight">
              {t.rfsSection.title}
            </h1>
            <p className="text-bio-textMuted text-base sm:text-lg">
              10 desafíos. 10 oportunidades para regenerar la Amazonía con ciencia, mercado e impacto.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto pt-2">
            <div className="bg-white border border-bio-navy/10 rounded-xl p-4">
              <p className="text-2xl font-black text-bio-navy">10</p>
              <p className="text-xs font-bold text-bio-textMuted">Briefs de oportunidad</p>
            </div>
            <div className="bg-white border border-bio-navy/10 rounded-xl p-4">
              <p className="text-2xl font-black text-bio-navy">8</p>
              <p className="text-xs font-bold text-bio-textMuted">Semanas para validar avance</p>
            </div>
            <div className="bg-white border border-bio-navy/10 rounded-xl p-4">
              <p className="text-2xl font-black text-bio-navy">3</p>
              <p className="text-xs font-bold text-bio-textMuted">Impactos por desafío</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-bio-navy/10 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-extrabold text-bio-navy">
              <Filter className="w-4 h-4 text-bio-green" />
              <span>Filtrar por pilar</span>
              <span className="text-bio-textMuted font-bold">
                Mostrando {filteredItems.length} de {RFS_ITEMS.length}
              </span>
            </div>

            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-bio-textMuted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por reto, mercado, impacto o perfil..."
                className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-bio-navy/20 focus:outline-none focus:border-bio-green bg-bio-paper/40"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {pillars.map((pillar) => (
              <button
                key={pillar}
                type="button"
                onClick={() => setSelectedPillar(pillar)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedPillar === pillar
                    ? 'bg-bio-green text-white shadow-sm'
                    : 'bg-bio-cream text-bio-navy hover:bg-bio-paper'
                }`}
              >
                {pillar}
              </button>
            ))}
          </div>
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredItems.map((rfs) => (
              <RfsChallengeCard
                key={rfs.id}
                rfs={rfs}
                onSelect={setSelectedRfs}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-bio-navy/10 rounded-2xl p-10 text-center">
            <Layers3 className="w-10 h-10 mx-auto text-bio-green mb-3" />
            <h3 className="text-lg font-extrabold text-bio-navy">No encontramos desafíos con ese criterio</h3>
            <p className="text-sm text-bio-textMuted mt-2">
              Prueba con otro pilar o busca por mercado, impacto, tecnología o perfil de equipo.
            </p>
          </div>
        )}

        <div className="mt-10 bg-bio-navy text-white rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-bio-neon flex-shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold">Cada brief conecta problema, mercado e impacto.</h2>
              <p className="text-sm text-white/75 mt-1">
                Abre una ficha para ver antecedentes, demanda, oportunidad, perfil buscado y la prueba esperada al Demo Day.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenApply}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-bold text-bio-navy bg-bio-neon hover:bg-white transition-colors"
          >
            Aplicar ahora
          </button>
        </div>
      </div>

      {selectedRfs && (
        <RfsModal
          rfs={selectedRfs}
          items={RFS_ITEMS}
          onSelect={setSelectedRfs}
          onClose={() => setSelectedRfs(null)}
          onApply={() => {
            setSelectedRfs(null);
            onOpenApply();
          }}
        />
      )}
    </div>
  );
}
