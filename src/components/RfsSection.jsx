import React, { useMemo, useState } from 'react';
import { RFS_ITEMS } from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';
import { Search, Filter, Handshake, PlusCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import RfsModal from './RfsModal';
import RfsChallengeCard from './RfsChallengeCard';
import SubmitCorporateNeedModal from './SubmitCorporateNeedModal';

const pillars = ['Todos', ...new Set(RFS_ITEMS.map((item) => item.pillar))];

const getSearchText = (item) => [
  item.title,
  item.pillar,
  item.pillarName,
  item.shortDesc,
  item.problem,
  item.marketSignal,
  item.marketDemand,
  item.opportunity,
  item.targetProfile,
  ...Object.values(item.impact || {})
].filter(Boolean).join(' ').toLowerCase();

export default function RfsSection({ onOpenApply, currentLang }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.ES;
  const [selectedRfs, setSelectedRfs] = useState(null);
  const [selectedPillar, setSelectedPillar] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [corporateModalOpen, setCorporateModalOpen] = useState(false);

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return RFS_ITEMS.filter((item) => {
      const matchesPillar = selectedPillar === 'Todos' || item.pillar === selectedPillar;
      const matchesSearch = !query || getSearchText(item).includes(query);
      return matchesPillar && matchesSearch;
    });
  }, [searchQuery, selectedPillar]);

  return (
    <section id="rfs" className="py-20 bg-bio-cream border-b border-bio-navy/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Open Innovation Callout Banner */}
        <div className="bg-bio-navy text-white rounded-3xl p-6 sm:p-8 border border-bio-green/30 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-bio-neon/20 text-bio-neon text-xs font-mono font-black uppercase tracking-wider">
              <Handshake className="w-3.5 h-3.5" />
              <span>Bio-Matchmaking Corporativo</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Innovación Abierta: Conectamos los retos de la industria con la ciencia abierta
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              ¿Tu empresa u organización requiere biotecnología o bioinsumos? Publica tus demandas tecnológicas de forma pública o anónima para conectar con startups y capacidades de I+D.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <button
              type="button"
              onClick={() => setCorporateModalOpen(true)}
              className="px-5 py-3 rounded-xl bg-bio-neon text-bio-navyDark font-black text-xs uppercase tracking-wider hover:bg-white transition-colors shadow-md flex items-center justify-center space-x-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Proponer Reto Empresarial</span>
            </button>
            <Link
              to="/rfs"
              className="px-5 py-3 rounded-xl border border-white/20 text-white font-bold text-xs hover:bg-white/10 transition-colors text-center"
            >
              Ver Retos Corporativos →
            </Link>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <span className="px-3.5 py-1.5 rounded-full bg-bio-green/15 text-bio-greenDark text-xs font-black uppercase tracking-wider">
              {t.rfsSection.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-bio-navy tracking-tight leading-tight">
              {t.rfsSection.title}
            </h2>
            <p className="text-bio-textMuted text-base leading-relaxed">
              10 desafíos. 10 oportunidades para regenerar la Amazonía con ciencia, mercado e impacto.
            </p>
          </div>

          <Link
            to="/rfs"
            className="inline-flex items-center text-xs font-extrabold text-bio-green hover:text-bio-greenDark transition-colors flex-shrink-0"
          >
            <span>{t.rfsSection.viewAll}</span>
          </Link>
        </div>

        {/* Filter controls */}
        <div className="bg-white p-4 rounded-2xl border border-bio-navy/10 shadow-sm space-y-4">
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

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredItems.map((rfs) => (
            <RfsChallengeCard
              key={rfs.id}
              rfs={rfs}
              onSelect={setSelectedRfs}
            />
          ))}
        </div>

        {/* Detail Modal */}
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

        {/* Corporate Need Submission Modal */}
        <SubmitCorporateNeedModal
          isOpen={corporateModalOpen}
          onClose={() => setCorporateModalOpen(false)}
        />

      </div>
    </section>
  );
}
