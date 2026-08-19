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
  Clock,
  Briefcase,
  ExternalLink,
  Info
} from 'lucide-react';
import RfsModal from '../components/RfsModal';
import RfsChallengeCard from '../components/RfsChallengeCard';
import SubmitCorporateNeedModal from '../components/SubmitCorporateNeedModal';
import CorporateNeedDetailModal from '../components/CorporateNeedDetailModal';
import { getCorporateNeedsDatabase } from '../services/dbService';

const pillars = ['Todos', ...new Set(RFS_ITEMS.map((item) => item.pillar))];

const SECTORS = [
  'Todos los Sectores',
  'Agroindustria & Exportación',
  'Química & Bioempaques',
  'Bebidas & Superfoods',
  'Cosmecéutica & Cuidado Personal',
  'Farmacéutica & Salud'
];

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
  const [rfsSearchQuery, setRfsSearchQuery] = useState('');
  const [selectedRfs, setSelectedRfs] = useState(null);

  // Estados para la Database of Needs (Retos Corporativos)
  const [corporateModalOpen, setCorporateModalOpen] = useState(false);
  const [selectedCorporateNeed, setSelectedCorporateNeed] = useState(null);
  const [corporateNeeds, setCorporateNeeds] = useState([]);
  const [loadingCorporate, setLoadingCorporate] = useState(false);
  
  // Filtros de Database of Needs
  const [needSearchQuery, setNeedSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('Todos los Sectores');
  const [anonymityFilter, setAnonymityFilter] = useState('all'); // 'all' | 'anonymous' | 'public'

  useEffect(() => {
    setLoadingCorporate(true);
    getCorporateNeedsDatabase().then(data => {
      setCorporateNeeds(data || []);
      setLoadingCorporate(false);
    });
  }, []);

  const handleCorporateCreated = (newEntry) => {
    setCorporateNeeds(prev => [newEntry, ...prev]);
  };

  const filteredRfsItems = useMemo(() => {
    const query = rfsSearchQuery.trim().toLowerCase();
    return RFS_ITEMS.filter((item) => {
      const matchesPillar = selectedPillar === 'Todos' || item.pillar === selectedPillar;
      const matchesSearch = !query || getSearchText(item).includes(query);
      return matchesPillar && matchesSearch;
    });
  }, [rfsSearchQuery, selectedPillar]);

  const filteredCorporateNeeds = useMemo(() => {
    const query = needSearchQuery.trim().toLowerCase();
    return corporateNeeds.filter((item) => {
      const matchesSector = selectedSector === 'Todos los Sectores' || item.sector === selectedSector;
      const matchesAnon = anonymityFilter === 'all'
        ? true
        : anonymityFilter === 'anonymous' ? item.isAnonymous : !item.isAnonymous;
      
      const textToSearch = `${item.title} ${item.companyName} ${item.sector} ${item.category} ${item.description} ${item.country}`.toLowerCase();
      const matchesSearch = !query || textToSearch.includes(query);

      return matchesSector && matchesAnon && matchesSearch;
    });
  }, [needSearchQuery, selectedSector, anonymityFilter, corporateNeeds]);

  return (
    <div className="py-12 bg-bio-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* ════════════════════════════════════════════════════════════════
            BANNER HERO: Innovación Abierta & Bio-Matchmaking
           ════════════════════════════════════════════════════════════════ */}
        <div className="bg-gradient-to-r from-bio-navy via-bio-navyDark to-bio-navyDeep text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden border border-bio-green/30">
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
                Facilitamos vinculaciones estratégicas entre corporativos demandantes de tecnología e innovadores de LATAM para co-desarrollar soluciones biotecnológicas de alto impacto.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0">
              <button
                type="button"
                onClick={() => setCorporateModalOpen(true)}
                className="inline-flex items-center justify-center px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-wider text-bio-navyDark bg-bio-neon hover:bg-white shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                <span>Incorporar Reto / Necesidad Tecnológica</span>
              </button>

              <button
                type="button"
                onClick={onOpenApply}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-2xl font-bold text-xs text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
              >
                <span>Postular Capacidad o Startup</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            SECCIÓN 1: RETOS ESENCIALES COHORTE 2026-II (10 RFS BRIEFS)
           ════════════════════════════════════════════════════════════════ */}
        <section id="retos-esenciales" className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-bio-navy/10 pb-4">
            <div>
              <span className="px-3 py-1 rounded-full bg-bio-green/15 text-bio-greenDark text-xs font-black uppercase tracking-wider">
                Desafíos Estratégicos BHV
              </span>
              <h2 className="text-3xl font-extrabold text-bio-navy mt-2">
                10 Retos Esenciales — Cohorte 2026-II
              </h2>
              <p className="text-xs sm:text-sm text-bio-textMuted mt-1">
                Breves de oportunidad técnica y de mercado formulados por el consorcio para la convocatoria actual.
              </p>
            </div>

            <div className="flex items-center space-x-2 text-xs font-extrabold text-bio-navy bg-white px-4 py-2 rounded-xl border border-bio-navy/10 shadow-sm">
              <Sparkles className="w-4 h-4 text-bio-green" />
              <span>8 Semanas de Validación Acelerada</span>
            </div>
          </div>

          {/* Filtros RFS */}
          <div className="bg-white p-4 rounded-2xl border border-bio-navy/10 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-extrabold text-bio-navy">
                <Filter className="w-4 h-4 text-bio-green" />
                <span>Filtrar por Pilar:</span>
              </div>

              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-bio-textMuted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={rfsSearchQuery}
                  onChange={(e) => setRfsSearchQuery(e.target.value)}
                  placeholder="Buscar por reto esencial..."
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-bio-navy/20 focus:outline-none focus:border-bio-green bg-bio-paper/40 font-semibold"
                />
              </div>
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

          {/* Grid RFS */}
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
              <h3 className="text-base font-extrabold text-bio-navy">No encontramos retos esenciales con esos criterios</h3>
            </div>
          )}
        </section>

        {/* ════════════════════════════════════════════════════════════════
            SECCIÓN 2: BASE DE DATOS DE NECESIDADES TECNOLÓGICAS & RETOS CORPORATIVOS
           ════════════════════════════════════════════════════════════════ */}
        <section id="database-of-needs" className="space-y-8 pt-6 border-t border-bio-navy/15">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <span className="px-3.5 py-1.5 rounded-full bg-bio-navy text-white text-xs font-mono font-black uppercase tracking-wider inline-flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-bio-neon" />
                Database of Needs (Demandas Abiertas)
              </span>
              <h2 className="text-3xl font-extrabold text-bio-navy">
                Base de Datos de Necesidades Tecnológicas Empresariales
              </h2>
              <p className="text-xs sm:text-sm text-bio-textMuted leading-relaxed">
                Retos y demandas de tecnología planteadas por corporativos e industrias (públicas o anónimas/confidenciales). Explora y propone vinculaciones científicas o biotecnológicas.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setCorporateModalOpen(true)}
              className="px-6 py-3.5 rounded-2xl bg-bio-green text-white font-black text-xs uppercase tracking-wider hover:bg-bio-greenDark transition-colors shadow-md flex items-center justify-center space-x-2 flex-shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Incorporar Reto de tu Empresa</span>
            </button>
          </div>

          {/* Filtros avanzados de la Database of Needs */}
          <div className="bg-white p-5 rounded-3xl border border-bio-navy/10 shadow-sm space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Búsqueda por texto */}
              <div className="relative">
                <label className="block text-[11px] font-black uppercase tracking-wider text-bio-navy mb-1">Buscar en la Base de Datos</label>
                <div className="relative">
                  <Search className="w-4 h-4 text-bio-textMuted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={needSearchQuery}
                    onChange={(e) => setNeedSearchQuery(e.target.value)}
                    placeholder="Ej. biopesticida, polímeros, cacao, cacao..."
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-bio-navy/20 focus:outline-none focus:border-bio-green bg-bio-cream/40 font-semibold"
                  />
                </div>
              </div>

              {/* Filtro por Sector */}
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-bio-navy mb-1">Filtrar por Sector Industrial</label>
                <select
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-bio-navy/20 focus:outline-none focus:border-bio-green bg-bio-cream/40 font-semibold text-bio-navy"
                >
                  {SECTORS.map(sec => <option key={sec}>{sec}</option>)}
                </select>
              </div>

              {/* Filtro de Visibilidad / Anonimato */}
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-bio-navy mb-1">Visibilidad de la Empresa</label>
                <select
                  value={anonymityFilter}
                  onChange={(e) => setAnonymityFilter(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-bio-navy/20 focus:outline-none focus:border-bio-green bg-bio-cream/40 font-semibold text-bio-navy"
                >
                  <option value="all">Ver Todas (Públicas & Confidenciales)</option>
                  <option value="anonymous">🛡️ Solo Demandas Confidenciales (Anónimas)</option>
                  <option value="public">🏢 Solo Empresas Registradas Visibles</option>
                </select>
              </div>

            </div>
          </div>

          {/* Grid de Fichas de Necesidades Tecnológicas */}
          {filteredCorporateNeeds.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCorporateNeeds.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-6 border border-bio-navy/10 shadow-md hover:shadow-xl transition-all flex flex-col justify-between space-y-5 relative overflow-hidden"
                >
                  <div className="space-y-3">
                    
                    {/* Badge de Anonimato o Nombre de Empresa */}
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      {item.isAnonymous ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-bio-navy/10 text-bio-navy border border-bio-navy/20">
                          <EyeOff className="w-3.5 h-3.5 mr-1.5 text-bio-green" />
                          Demanda Confidencial • {item.sector}
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-bio-green/15 text-bio-greenDark border border-bio-green/30">
                          <Building2 className="w-3.5 h-3.5 mr-1.5" />
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

                    {/* Chips de contexto */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                      <div className="p-2.5 rounded-xl bg-bio-cream border border-bio-navy/5 font-semibold text-bio-navy">
                        <span className="text-bio-textMuted block text-[10px]">Presupuesto / Alcance:</span>
                        <strong>{item.estimatedBudget}</strong>
                      </div>
                      <div className="p-2.5 rounded-xl bg-bio-cream border border-bio-navy/5 font-semibold text-bio-navy">
                        <span className="text-bio-textMuted block text-[10px]">Ubicación:</span>
                        <strong>{item.country}</strong>
                      </div>
                    </div>

                    {/* Modelos de Vinculación */}
                    {item.collaborationTypes && item.collaborationTypes.length > 0 && (
                      <div className="pt-1">
                        <span className="text-[10px] font-extrabold text-bio-navy uppercase tracking-wider block mb-1">
                          Modelos de Vinculación Buscados:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {item.collaborationTypes.map(c => (
                            <span key={c} className="px-2 py-0.5 rounded bg-bio-paper text-bio-navy text-[10px] font-bold border border-bio-navy/10">
                              {c === 'codesarrollo' ? '🔬 Co-Desarrollo I+D' : c === 'piloto' ? '🌱 Piloto de Campo' : c === 'licencia' ? '📜 Licenciamiento' : c === 'venture_client' ? '💼 Venture Client' : c}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Acciones */}
                  <div className="pt-4 border-t border-bio-navy/10 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedCorporateNeed(item)}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold text-bio-navy hover:bg-bio-cream border border-bio-navy/15 transition-colors flex items-center gap-1.5"
                    >
                      <Info className="w-3.5 h-3.5 text-bio-green" />
                      <span>Ver Ficha Completa</span>
                    </button>

                    <button
                      type="button"
                      onClick={onOpenApply}
                      className="inline-flex items-center px-4 sm:px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-bio-green hover:bg-bio-greenDark shadow-md transition-all"
                    >
                      <span>Conectar / Proponer</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-bio-navy/10 rounded-3xl p-10 text-center space-y-3">
              <Building2 className="w-10 h-10 mx-auto text-bio-green mb-1" />
              <h3 className="text-base font-extrabold text-bio-navy">No encontramos necesidades registradas en esta combinación de filtros</h3>
              <p className="text-xs text-bio-textMuted max-w-md mx-auto">
                Prueba ajustando la búsqueda o el filtro de visibilidad.
              </p>
            </div>
          )}
        </section>

        {/* ════════════════════════════════════════════════════════════════
            MODALES INTERACTIVOS
           ════════════════════════════════════════════════════════════════ */}
        
        {/* Modal de Publicación de Desafíos Corporativos */}
        <SubmitCorporateNeedModal
          isOpen={corporateModalOpen}
          onClose={() => setCorporateModalOpen(false)}
          onSuccess={handleCorporateCreated}
        />

        {/* Modal de Detalle de Ficha Completa de Necesidad Tecnológica */}
        {selectedCorporateNeed && (
          <CorporateNeedDetailModal
            need={selectedCorporateNeed}
            onClose={() => setSelectedCorporateNeed(null)}
            onApplyMatchmaking={() => {
              setSelectedCorporateNeed(null);
              onOpenApply();
            }}
          />
        )}

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
