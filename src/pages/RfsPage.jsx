import React, { useMemo, useState, useEffect } from 'react';
import { RFS_ITEMS } from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';
import {
  Search,
  Filter,
  Layers3,
  TrendingUp,
  Handshake,
  PlusCircle,
  Building2,
  Lock,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  MapPin,
  DollarSign
} from 'lucide-react';
import RfsModal from '../components/RfsModal';
import RfsChallengeCard from '../components/RfsChallengeCard';
import SubmitCorporateNeedModal from '../components/SubmitCorporateNeedModal';
import { getCorporateNeedsDatabase } from '../services/dbService';

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
  const [activeTab, setActiveTab] = useState('rfs'); // 'rfs' | 'corporate'
  const [selectedPillar, setSelectedPillar] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRfs, setSelectedRfs] = useState(null);
  const [corporateModalOpen, setCorporateModalOpen] = useState(false);
  const [corporateNeeds, setCorporateNeeds] = useState([]);
  const [loadingCorporate, setLoadingCorporate] = useState(false);

  // Cargar retos corporativos desde dbService (Supabase / localStorage / Mock)
  useEffect(() => {
    setLoadingCorporate(true);
    getCorporateNeedsDatabase().then(data => {
      setCorporateNeeds(data || []);
      setLoadingCorporate(false);
    });
  }, []);

  const handleCorporateCreated = (newEntry) => {
    setCorporateNeeds(prev => [newEntry, ...prev]);
    setActiveTab('corporate');
  };

  const filteredRfsItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return RFS_ITEMS.filter((item) => {
      const matchesPillar = selectedPillar === 'Todos' || item.pillar === selectedPillar;
      const matchesSearch = !query || getSearchText(item).includes(query);
      return matchesPillar && matchesSearch;
    });
  }, [searchQuery, selectedPillar]);

  const filteredCorporateItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return corporateNeeds.filter((item) => {
      if (!query) return true;
      const combined = `${item.title} ${item.companyName} ${item.sector} ${item.category} ${item.description}`.toLowerCase();
      return combined.includes(query);
    });
  }, [searchQuery, corporateNeeds]);

  return (
    <div className="py-12 bg-bio-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Superior: Innovación Abierta & Bio-Matchmaking */}
        <div className="bg-gradient-to-r from-bio-navy via-bio-navyDark to-bio-navyDeep text-white rounded-3xl p-6 sm:p-10 mb-10 shadow-xl relative overflow-hidden border border-bio-green/30">
          <div className="absolute -right-10 -top-10 w-72 h-72 bg-bio-green/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-bio-neon/20 border border-bio-neon/30 text-bio-neon text-xs font-mono font-black uppercase tracking-wider">
                <Handshake className="w-4 h-4 mr-1" />
                <span>Programa de Bio-Matchmaking Corporativo</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                Innovación Abierta: Conectamos los retos de la industria con la ciencia abierta
              </h1>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
                Facilitamos vinculaciones estratégicas y bio-matchmaking entre empresas demandantes de innovación y startups o grupos de investigación para co-desarrollar biotecnologías de alto impacto.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0">
              <button
                type="button"
                onClick={() => setCorporateModalOpen(true)}
                className="inline-flex items-center justify-center px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-wider text-bio-navyDark bg-bio-neon hover:bg-white shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                <span>Publicar Desafío Empresarial</span>
              </button>

              <button
                type="button"
                onClick={onOpenApply}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-2xl font-bold text-xs text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
              >
                <span>Postular Capacidad / Startup</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>

          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 mt-6 border-t border-white/10 text-xs">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-bio-neon" />
              <span><strong>10 Briefs RFS</strong> de oportunidad estratégica</span>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="w-4 h-4 text-bio-green" />
              <span><strong>Opción Anónima / Confidencial</strong> protegida para empresas</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-bio-neon" />
              <span><strong>Matchmaking Facilitado</strong> por Biohub Venture</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs: BHV Briefs vs Corporate Challenges */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 border-b border-bio-navy/10 pb-4">
          <div className="flex items-center space-x-2 bg-white p-1.5 rounded-2xl border border-bio-navy/10 shadow-sm w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setActiveTab('rfs')}
              className={`flex-1 sm:flex-none px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center space-x-2 ${
                activeTab === 'rfs'
                  ? 'bg-bio-navy text-white shadow-md'
                  : 'text-bio-textMuted hover:text-bio-navy'
              }`}
            >
              <Layers3 className="w-4 h-4" />
              <span>10 Desafíos Prioritarios BHV ({RFS_ITEMS.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('corporate')}
              className={`flex-1 sm:flex-none px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center space-x-2 ${
                activeTab === 'corporate'
                  ? 'bg-bio-green text-white shadow-md'
                  : 'text-bio-textMuted hover:text-bio-navy'
              }`}
            >
              <Handshake className="w-4 h-4" />
              <span>Retos de Empresas ({corporateNeeds.length})</span>
            </button>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-bio-textMuted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por desafío, sector o tecnología..."
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-bio-navy/20 focus:outline-none focus:border-bio-green bg-white shadow-sm font-semibold"
            />
          </div>
        </div>

        {/* ── TAB 1: 10 DESAFÍOS BHV ── */}
        {activeTab === 'rfs' && (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-2xl border border-bio-navy/10 shadow-sm flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2 text-xs font-extrabold text-bio-navy">
                <Filter className="w-4 h-4 text-bio-green" />
                <span>Filtrar por Pilar:</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
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

            {filteredRfsItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredRfsItems.map((rfs) => (
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
              </div>
            )}
          </div>
        )}

        {/* ── TAB 2: RETOS DE EMPRESAS (BIO-MATCHMAKING) ── */}
        {activeTab === 'corporate' && (
          <div className="space-y-6">
            <div className="bg-bio-paper/60 p-4 rounded-2xl border border-bio-green/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-2 text-bio-navy font-bold">
                <Building2 className="w-4 h-4 text-bio-green" />
                <span>Demandas de Innovación Abierta planteadas por Corporativos e Industrias.</span>
              </div>
              <button
                type="button"
                onClick={() => setCorporateModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-bio-navy text-white text-xs font-extrabold hover:bg-bio-navyDark transition-colors flex-shrink-0"
              >
                + Publicar Nuevo Desafío Empresarial
              </button>
            </div>

            {filteredCorporateItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCorporateItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-3xl p-6 border border-bio-navy/10 shadow-md hover:shadow-xl transition-all flex flex-col justify-between space-y-5 relative overflow-hidden"
                  >
                    <div className="space-y-3">
                      
                      {/* Header Badge: Anonymous vs Public Company */}
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        {item.isAnonymous ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-bio-navy/10 text-bio-navy border border-bio-navy/20">
                            <EyeOff className="w-3.5 h-3.5 mr-1 text-bio-green" />
                            Empresa Confidencial • {item.sector}
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-bio-green/15 text-bio-greenDark border border-bio-green/30">
                            <Building2 className="w-3.5 h-3.5 mr-1" />
                            {item.companyName} ({item.sector})
                          </span>
                        )}

                        <span className="text-[10px] font-bold text-bio-textMuted uppercase tracking-wider bg-bio-paper px-2.5 py-1 rounded-md">
                          {item.category}
                        </span>
                      </div>

                      <h3 className="text-xl font-extrabold text-bio-navy leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-xs text-bio-textMuted leading-relaxed line-clamp-3">
                        {item.description}
                      </p>

                      {/* Info Chips */}
                      <div className="grid grid-cols-2 gap-2 text-[11px] pt-2">
                        <div className="p-2.5 rounded-xl bg-bio-cream border border-bio-navy/5 font-semibold text-bio-navy">
                          <span className="text-bio-textMuted block text-[10px]">Alcance / Presupuesto:</span>
                          <strong>{item.estimatedBudget}</strong>
                        </div>
                        <div className="p-2.5 rounded-xl bg-bio-cream border border-bio-navy/5 font-semibold text-bio-navy">
                          <span className="text-bio-textMuted block text-[10px]">Ubicación:</span>
                          <strong>{item.country}</strong>
                        </div>
                      </div>

                      {/* Collaboration Tags */}
                      {item.collaborationTypes && item.collaborationTypes.length > 0 && (
                        <div className="pt-1">
                          <span className="text-[10px] font-extrabold text-bio-navy uppercase tracking-wider block mb-1.5">
                            Modelo de Vinculación Buscado:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {item.collaborationTypes.map(c => (
                              <span key={c} className="px-2 py-0.5 rounded bg-bio-paper text-bio-navy text-[10px] font-bold border border-bio-navy/10">
                                {c === 'codesarrollo' ? '🔬 Co-Desarrollo I+D' : c === 'piloto' ? '🌱 Piloto de Campo' : c === 'licencia' ? '📜 Licenciamiento' : c}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-bio-navy/10 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-bio-greenDark">
                        ⏱️ Plazo: {item.urgency}
                      </span>

                      <button
                        type="button"
                        onClick={onOpenApply}
                        className="inline-flex items-center px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-bio-green hover:bg-bio-greenDark shadow-md transition-all"
                      >
                        <span>Conectar / Proponer Vinculación</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-bio-navy/10 rounded-3xl p-10 text-center space-y-4">
                <Handshake className="w-12 h-12 mx-auto text-bio-green" />
                <h3 className="text-lg font-extrabold text-bio-navy">Aún no hay retos empresariales registrados en esta vista</h3>
                <p className="text-xs text-bio-textMuted max-w-md mx-auto">
                  Sé la primera empresa en publicar una demanda de innovación abierta y conectarte con las capacidades científicas de LATAM.
                </p>
                <button
                  type="button"
                  onClick={() => setCorporateModalOpen(true)}
                  className="px-6 py-3 rounded-xl bg-bio-navy text-white text-xs font-extrabold uppercase tracking-wider"
                >
                  + Publicar Desafío Empresarial
                </button>
              </div>
            )}
          </div>
        )}

        {/* Modal de Publicación de Desafíos Corporativos */}
        <SubmitCorporateNeedModal
          isOpen={corporateModalOpen}
          onClose={() => setCorporateModalOpen(false)}
          onSuccess={handleCorporateCreated}
        />

        {/* Modal de Detalle de 10 RFS BHV */}
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
    </div>
  );
}
