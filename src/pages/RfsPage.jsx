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
  Info,
  SlidersHorizontal,
  LayoutGrid,
  Leaf
} from 'lucide-react';
import RfsModal from '../components/RfsModal';
import RfsChallengeCard from '../components/RfsChallengeCard';
import SubmitCorporateNeedModal from '../components/SubmitCorporateNeedModal';
import CorporateNeedDetailModal from '../components/CorporateNeedDetailModal';
import { getCorporateNeedsDatabase } from '../services/dbService';

const VIEW_MODES = [
  { id: 'all', label: '🌟 Todos los Desafíos & Necesidades', desc: 'Explora tanto los 10 RFS esenciales como la base de datos de retos corporativos' },
  { id: 'rfs', label: '🌿 10 Retos Esenciales BHV (Cohorte 2026-II)', desc: 'Desafíos estratégicos de bioeconomía amazónica para el bootcamp' },
  { id: 'corporate', label: '🏢 Retos Corporativos (Database of Needs)', desc: 'Demandas de innovación abierta de empresas y corporativos (públicas y confidenciales)' }
];

const CATEGORIES = [
  'Todas las Categorías',
  'Biotecnología Agrícola & Bioinsumos',
  'Alimentos del Futuro & Superfoods',
  'Biomateriales & Bioempaques',
  'HealthTech & Farma',
  'Cosmecéutica & Bioingredientes',
  'Trazabilidad & Gobernanza',
  'DeepTech, IoT & Bioacústica',
  'Climate FinTech & Carbono'
];

const getSearchTextRfs = (item) => [
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
  ...Object.values(item.impact || {})
].filter(Boolean).join(' ').toLowerCase();

export default function RfsPage({ onOpenApply, currentLang }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.ES;

  // Estado del Motor de Búsqueda Unificado
  const [viewMode, setViewMode] = useState('all'); // 'all' | 'rfs' | 'corporate'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas las Categorías');
  const [anonymityFilter, setAnonymityFilter] = useState('all'); // 'all' | 'anonymous' | 'public'

  // Modales
  const [selectedRfs, setSelectedRfs] = useState(null);
  const [corporateModalOpen, setCorporateModalOpen] = useState(false);
  const [selectedCorporateNeed, setSelectedCorporateNeed] = useState(null);

  // Datos
  const [corporateNeeds, setCorporateNeeds] = useState([]);
  const [loadingCorporate, setLoadingCorporate] = useState(false);

  useEffect(() => {
    setLoadingCorporate(true);
    getCorporateNeedsDatabase().then(data => {
      setCorporateNeeds(data || []);
      setLoadingCorporate(false);
    });
  }, []);

  const handleCorporateCreated = (newEntry) => {
    setCorporateNeeds(prev => [newEntry, ...prev]);
    setViewMode('corporate');
  };

  // Filtrado Unificado de RFS
  const filteredRfs = useMemo(() => {
    if (viewMode === 'corporate') return [];

    const query = searchQuery.trim().toLowerCase();
    return RFS_ITEMS.filter((item) => {
      const matchesSearch = !query || getSearchTextRfs(item).includes(query);
      const matchesCat = selectedCategory === 'Todas las Categorías' || 
        item.pillarName.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        selectedCategory.toLowerCase().includes(item.pillarName.toLowerCase());

      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory, viewMode]);

  // Filtrado Unificado de Corporate Needs
  const filteredCorporate = useMemo(() => {
    if (viewMode === 'rfs') return [];

    const query = searchQuery.trim().toLowerCase();
    return corporateNeeds.filter((item) => {
      const matchesSearch = !query || `${item.title} ${item.companyName} ${item.sector} ${item.category} ${item.description} ${item.country}`.toLowerCase().includes(query);
      const matchesCat = selectedCategory === 'Todas las Categorías' || item.category === selectedCategory;
      const matchesAnon = anonymityFilter === 'all'
        ? true
        : anonymityFilter === 'anonymous' ? item.isAnonymous : !item.isAnonymous;

      return matchesSearch && matchesCat && matchesAnon;
    });
  }, [searchQuery, selectedCategory, anonymityFilter, viewMode, corporateNeeds]);

  const totalResults = filteredRfs.length + filteredCorporate.length;

  return (
    <div className="py-12 bg-bio-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* ════════════════════════════════════════════════════════════════
            BANNER HERO: Innovación Abierta & Bio-Matchmaking
           ════════════════════════════════════════════════════════════════ */}
        <div className="bg-gradient-to-r from-bio-navy via-bio-navyDark to-bio-navyDeep text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden border border-bio-green/30">
          <div className="absolute -right-10 -top-10 w-80 h-80 bg-bio-green/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3.5 max-w-3xl">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-bio-neon/20 border border-bio-neon/30 text-bio-neon text-xs font-mono font-black uppercase tracking-wider">
                <Handshake className="w-4 h-4 mr-1" />
                <span>Programa de Bio-Matchmaking Corporativo</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                Innovación Abierta: Conectamos los retos de la industria con la ciencia abierta
              </h1>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
                Plataforma unificada para explorar los desafíos estratégicos de la Amazonía y las demandas de innovación tecnológica de empresas para co-desarrollo, alianzas de I+D y pilotos.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0">
              <button
                type="button"
                onClick={() => setCorporateModalOpen(true)}
                className="inline-flex items-center justify-center px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-wider text-bio-navyDark bg-bio-neon hover:bg-white shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                <span>Incorporar Reto de tu Empresa</span>
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
            MOTOR DE BÚSQUEDA & CONTROL BAR UNIFICADO
           ════════════════════════════════════════════════════════════════ */}
        <div className="bg-white p-6 rounded-3xl border border-bio-navy/10 shadow-lg space-y-6">
          
          {/* Fila Superior: Buscador Universal + Selector Desplegable de Modos */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            
            {/* Buscador Universal */}
            <div className="lg:col-span-7 relative">
              <label className="block text-[11px] font-black uppercase tracking-wider text-bio-navy mb-1.5 flex items-center justify-between">
                <span>Motor de Búsqueda Universal</span>
                <span className="text-bio-greenDark font-bold">🔍 Busca en RFS & Database of Needs</span>
              </label>
              <div className="relative">
                <Search className="w-5 h-5 text-bio-textMuted absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por desafío, molécula, sector, biopesticida, polímeros, superfood, país..."
                  className="w-full pl-12 pr-4 py-3.5 text-xs sm:text-sm rounded-2xl border-2 border-bio-navy/15 focus:outline-none focus:border-bio-green bg-bio-cream/30 font-semibold text-bio-navy shadow-inner"
                />
              </div>
            </div>

            {/* Selector Desplegable de Modos de Vista */}
            <div className="lg:col-span-5">
              <label className="block text-[11px] font-black uppercase tracking-wider text-bio-navy mb-1.5 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-bio-green" />
                <span>Modo de Exploración</span>
              </label>
              <select
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value)}
                className="w-full px-4 py-3.5 text-xs sm:text-sm rounded-2xl border-2 border-bio-green/40 focus:outline-none focus:border-bio-green bg-bio-paper/40 font-extrabold text-bio-navy shadow-sm cursor-pointer"
              >
                {VIEW_MODES.map(mode => (
                  <option key={mode.id} value={mode.id}>
                    {mode.label}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Fila Inferior: Filtros de Categoría y Visibilidad */}
          <div className="pt-4 border-t border-bio-navy/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div className="flex flex-wrap items-center gap-3">
              {/* Filtro por Categoría */}
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-bio-navy whitespace-nowrap">Categoría:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl border border-bio-navy/20 focus:outline-none focus:border-bio-green bg-white font-semibold text-bio-navy"
                >
                  {CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
                </select>
              </div>

              {/* Filtro de Visibilidad (solo relevante cuando se ve corporate o all) */}
              {viewMode !== 'rfs' && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-bio-navy whitespace-nowrap">Visibilidad:</span>
                  <select
                    value={anonymityFilter}
                    onChange={(e) => setAnonymityFilter(e.target.value)}
                    className="px-3 py-2 text-xs rounded-xl border border-bio-navy/20 focus:outline-none focus:border-bio-green bg-white font-semibold text-bio-navy"
                  >
                    <option value="all">Ver Todas (Públicas & Confidenciales)</option>
                    <option value="anonymous">🛡️ Solo Confidenciales (Anónimas)</option>
                    <option value="public">🏢 Solo Empresas Públicas</option>
                  </select>
                </div>
              )}
            </div>

            {/* Contador de Resultados Encontrados */}
            <div className="text-xs font-extrabold text-bio-navy bg-bio-cream px-4 py-2 rounded-xl border border-bio-navy/10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-bio-green animate-pulse" />
              <span>Mostrando {totalResults} oportunidad{totalResults !== 1 ? 'es' : ''}</span>
            </div>

          </div>

        </div>

        {/* ════════════════════════════════════════════════════════════════
            CONTENIDO DINÁMICO SEGÚN EL MODO DE EXPLORACIÓN
           ════════════════════════════════════════════════════════════════ */}

        {/* 1. SECCIÓN RFS (Si el modo es 'all' o 'rfs') */}
        {(viewMode === 'all' || viewMode === 'rfs') && filteredRfs.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-bio-navy/10 pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-bio-green/20 text-bio-green flex items-center justify-center font-black text-xs">
                  🌿
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-bio-navy">
                    10 Retos Esenciales — Cohorte 2026-II
                  </h2>
                  <p className="text-xs text-bio-textMuted">Briefs estratégicos formulados para la convocatoria actual de aceleración.</p>
                </div>
              </div>
              <span className="text-xs font-bold text-bio-greenDark bg-bio-green/10 px-3 py-1.5 rounded-lg border border-bio-green/20">
                {filteredRfs.length} briefs disponibles
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredRfs.map((rfs) => (
                <RfsChallengeCard
                  key={rfs.id}
                  rfs={rfs}
                  onSelect={setSelectedRfs}
                />
              ))}
            </div>
          </section>
        )}

        {/* 2. SECCIÓN DATABASE OF NEEDS CORPORATIVAS (Si el modo es 'all' o 'corporate') */}
        {(viewMode === 'all' || viewMode === 'corporate') && filteredCorporate.length > 0 && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-bio-navy/10 pb-3 gap-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-bio-navy text-bio-neon flex items-center justify-center font-black text-xs">
                  🏢
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-bio-navy">
                    Database of Needs — Retos Empresariales & Matchmaking
                  </h2>
                  <p className="text-xs text-bio-textMuted">Demandas tecnológicas activas planteadas por corporativos e industrias.</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setCorporateModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-bio-navy text-white text-xs font-extrabold hover:bg-bio-navyDark transition-colors flex items-center gap-1.5 self-start sm:self-auto"
              >
                <PlusCircle className="w-3.5 h-3.5 text-bio-neon" />
                <span>Publicar Necesidad de tu Empresa</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCorporate.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl overflow-hidden border border-bio-navy/10 shadow-sm hover:shadow-xl hover:border-bio-green/40 transition-all duration-300 flex flex-col justify-between group text-left"
                >
                  <div>
                    {/* Cover Image Container */}
                    <div className="relative h-44 w-full overflow-hidden bg-bio-navy">
                      <img
                        src={item.image || 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80'}
                        alt={item.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bio-navyDark/90 via-bio-navyDark/30 to-transparent" />

                      {/* Floating Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        {item.isAnonymous ? (
                          <span className="px-3 py-1 rounded-full text-[11px] font-mono font-black uppercase tracking-wider bg-bio-navy/85 backdrop-blur-md text-bio-neon border border-bio-neon/30 flex items-center gap-1.5 shadow-sm">
                            <EyeOff className="w-3.5 h-3.5 text-bio-green" />
                            Demanda Confidencial • {item.sector}
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full text-[11px] font-mono font-black uppercase tracking-wider bg-bio-green/85 backdrop-blur-md text-white border border-bio-green/30 flex items-center gap-1.5 shadow-sm">
                            <Building2 className="w-3.5 h-3.5" />
                            {item.companyName}
                          </span>
                        )}

                        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/90 backdrop-blur-md text-bio-navy shadow-sm">
                          {item.category}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                        <span className="text-[11px] font-extrabold bg-bio-navy/80 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-bio-neon" />
                          {item.country}
                        </span>
                        <span className="text-[11px] font-extrabold bg-bio-green/90 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                          💰 {item.estimatedBudget}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 sm:p-6 space-y-3">
                      <h3 className="text-lg font-extrabold text-bio-navy leading-snug group-hover:text-bio-green transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-xs text-bio-textMuted leading-relaxed line-clamp-3">
                        {item.description}
                      </p>

                      {/* Collaboration Tags */}
                      {item.collaborationTypes && item.collaborationTypes.length > 0 && (
                        <div className="pt-1">
                          <span className="text-[10px] font-extrabold text-bio-navy uppercase tracking-wider block mb-1">
                            Modelos de Vinculación Buscados:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {item.collaborationTypes.map(c => (
                              <span key={c} className="px-2.5 py-0.5 rounded-lg bg-bio-paper text-bio-navy text-[10px] font-bold border border-bio-navy/10">
                                {c === 'codesarrollo' ? '🔬 Co-Desarrollo I+D' : c === 'piloto' ? '🌱 Piloto de Campo' : c === 'licencia' ? '📜 Licenciamiento' : c === 'venture_client' ? '💼 Venture Client' : c}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-5 pt-0">
                    <div className="pt-3 border-t border-bio-navy/10 flex items-center justify-between gap-2">
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
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Mensaje de Sin Resultados */}
        {totalResults === 0 && (
          <div className="bg-white border border-bio-navy/10 rounded-3xl p-12 text-center space-y-4 shadow-sm">
            <Layers3 className="w-12 h-12 mx-auto text-bio-green" />
            <h3 className="text-lg font-extrabold text-bio-navy">No encontramos oportunidades con los filtros seleccionados</h3>
            <p className="text-xs text-bio-textMuted max-w-md mx-auto">
              Prueba cambiando el modo de exploración, la categoría o buscando con términos más generales.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Todas las Categorías');
                setAnonymityFilter('all');
                setViewMode('all');
              }}
              className="px-5 py-2.5 rounded-xl bg-bio-navy text-white text-xs font-bold"
            >
              Restablecer Filtros
            </button>
          </div>
        )}

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
