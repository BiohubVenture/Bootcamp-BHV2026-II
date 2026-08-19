import React, { useMemo, useState, useEffect } from 'react';
import { RFS_ITEMS } from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';
import {
  Search,
  Filter,
  Handshake,
  PlusCircle,
  ArrowRight,
  ShieldCheck,
  Building2,
  Lock,
  EyeOff,
  Sparkles,
  MapPin,
  Info,
  Layers3,
  Rocket
} from 'lucide-react';
import { Link } from 'react-router-dom';
import RfsModal from './RfsModal';
import RfsChallengeCard from './RfsChallengeCard';
import SubmitCorporateNeedModal from './SubmitCorporateNeedModal';
import CorporateNeedDetailModal from './CorporateNeedDetailModal';
import { getCorporateNeedsDatabase } from '../services/dbService';

const pillars = ['Todos', ...new Set(RFS_ITEMS.map((item) => item.pillar))];
const corporateSectors = ['Todos los Sectores', 'Agroindustria & Exportación', 'Química & Bioempaques', 'Bebidas & Superfoods', 'Cosmecéutica & Cuidado Personal'];

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
  
  // Modo de vista en Home: 'rfs' (10 Retos BHV) | 'corporate' (Retos Corporativos)
  const [activeTab, setActiveTab] = useState('rfs');
  const [selectedRfs, setSelectedRfs] = useState(null);
  const [selectedPillar, setSelectedPillar] = useState('Todos');
  const [selectedSector, setSelectedSector] = useState('Todos los Sectores');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modales
  const [corporateModalOpen, setCorporateModalOpen] = useState(false);
  const [selectedCorporateNeed, setSelectedCorporateNeed] = useState(null);
  const [corporateNeeds, setCorporateNeeds] = useState([]);

  useEffect(() => {
    getCorporateNeedsDatabase().then(data => {
      setCorporateNeeds(data || []);
    });
  }, []);

  const handleCorporateCreated = (newEntry) => {
    setCorporateNeeds(prev => [newEntry, ...prev]);
    setActiveTab('corporate');
  };

  // Filtrado de RFS (Top 3 en Home si no hay búsqueda activa)
  const filteredRfsItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const items = RFS_ITEMS.filter((item) => {
      const matchesPillar = selectedPillar === 'Todos' || item.pillar === selectedPillar;
      const matchesSearch = !query || getSearchText(item).includes(query);
      return matchesPillar && matchesSearch;
    });
    // Revelar 3 retos en el home
    return items.slice(0, 3);
  }, [searchQuery, selectedPillar]);

  // Filtrado de Corporate Needs (Top 3 en Home si no hay búsqueda activa)
  const filteredCorporateNeeds = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const items = corporateNeeds.filter((item) => {
      const matchesSector = selectedSector === 'Todos los Sectores' || item.sector === selectedSector;
      const matchesSearch = !query || `${item.title} ${item.companyName} ${item.sector} ${item.category} ${item.description} ${item.country}`.toLowerCase().includes(query);
      return matchesSector && matchesSearch;
    });
    // Revelar 3 retos corporativos en el home
    return items.slice(0, 3);
  }, [searchQuery, selectedSector, corporateNeeds]);

  return (
    <section id="rfs" className="py-20 bg-bio-cream border-b border-bio-navy/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* ════════════════════════════════════════════════════════════════
            BANNER INTEGRADO DE ALTO IMPACTO (DUAL-ACTION HUB)
           ════════════════════════════════════════════════════════════════ */}
        <div className="bg-gradient-to-r from-bio-navy via-bio-navyDark to-bio-navyDeep text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-bio-green/30 relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 w-96 h-96 bg-bio-green/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-60 h-60 bg-bio-neon/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            
            {/* Header Tag */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-bio-neon/20 border border-bio-neon/30 text-bio-neon text-xs font-mono font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                <Handshake className="w-3.5 h-3.5" />
                Innovación Abierta
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold border border-white/15">
                Cohorte 2026-II
              </span>
            </div>

            {/* Title & Narrative */}
            <div className="max-w-3xl space-y-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Innovación Abierta: Conectamos los retos de la industria con la ciencia abierta
              </h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Plataforma de vinculación estratégica: Descubre los desafíos prioritarios de la Amazonía para crear bionegocios o incorpora las demandas tecnológicas de tu empresa para co-desarrollar soluciones de alto impacto.
              </p>
            </div>

            {/* Interactive Dual Action Pathway Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              
              {/* Pod 1: Para Startups & Científicos */}
              <div
                onClick={() => setActiveTab('rfs')}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  activeTab === 'rfs'
                    ? 'bg-white/15 border-bio-neon shadow-lg transform -translate-y-0.5'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/25'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-xl bg-bio-neon text-bio-navyDark flex items-center justify-center font-bold">
                      🌿
                    </div>
                    <span className="text-xs font-black uppercase tracking-wider text-bio-neon">Para Startups & Investigadores</span>
                  </div>
                  {activeTab === 'rfs' && (
                    <span className="text-[10px] font-black uppercase bg-bio-neon text-bio-navyDark px-2 py-0.5 rounded-full">Activo</span>
                  )}
                </div>
                <p className="text-xs text-gray-200 leading-relaxed">
                  Explora los <strong>10 Desafíos Esenciales</strong> formulados por el consorcio y postula tu MVP para el bootcamp de 8 semanas.
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] font-bold text-bio-neon flex items-center gap-1">
                    Ver 10 RFS de la Amazonía <ArrowRight className="w-3 h-3" />
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenApply();
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-bio-green text-white text-[11px] font-black uppercase hover:bg-bio-greenDark transition-colors"
                  >
                    Postular Ahora
                  </button>
                </div>
              </div>

              {/* Pod 2: Para Empresas & Corporativos */}
              <div
                onClick={() => setActiveTab('corporate')}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  activeTab === 'corporate'
                    ? 'bg-white/15 border-bio-neon shadow-lg transform -translate-y-0.5'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/25'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-xl bg-bio-green text-white flex items-center justify-center font-bold">
                      🏢
                    </div>
                    <span className="text-xs font-black uppercase tracking-wider text-white">Para Empresas & Corporativos</span>
                  </div>
                  {activeTab === 'corporate' && (
                    <span className="text-[10px] font-black uppercase bg-bio-neon text-bio-navyDark px-2 py-0.5 rounded-full">Activo</span>
                  )}
                </div>
                <p className="text-xs text-gray-200 leading-relaxed">
                  ¿Tu industria necesita biotecnología o bioinsumos? Registra tu reto (<strong>Público o Confidencial/Anónimo 🛡️</strong>) para hacer matchmaking.
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] font-bold text-gray-300 flex items-center gap-1">
                    Ver Retos Corporativos ({corporateNeeds.length}) <ArrowRight className="w-3 h-3" />
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCorporateModalOpen(true);
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-bio-neon text-bio-navyDark text-[11px] font-black uppercase hover:bg-white transition-colors flex items-center gap-1"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Proponer Reto</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            INTERACTIVE EXPLORER CONTROLS
           ════════════════════════════════════════════════════════════════ */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-bio-navy/10 shadow-sm space-y-4">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Tabs Selector */}
            <div className="flex items-center space-x-2 bg-bio-cream p-1.5 rounded-2xl border border-bio-navy/10 w-full md:w-auto">
              <button
                type="button"
                onClick={() => setActiveTab('rfs')}
                className={`flex-1 md:flex-none px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center space-x-2 ${
                  activeTab === 'rfs'
                    ? 'bg-bio-navy text-white shadow-md'
                    : 'text-bio-textMuted hover:text-bio-navy'
                }`}
              >
                <span>🌿 10 Desafíos Esenciales</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('corporate')}
                className={`flex-1 md:flex-none px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center space-x-2 ${
                  activeTab === 'corporate'
                    ? 'bg-bio-green text-white shadow-md'
                    : 'text-bio-textMuted hover:text-bio-navy'
                }`}
              >
                <span>🏢 Retos de Empresas ({corporateNeeds.length})</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-bio-textMuted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={activeTab === 'rfs' ? 'Buscar en 10 desafíos amazónicos...' : 'Buscar en retos empresariales...'}
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-bio-navy/20 focus:outline-none focus:border-bio-green bg-bio-paper/40 font-semibold"
              />
            </div>
          </div>

          {/* Dynamic Filter Chips */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-bio-navy/5">
            {activeTab === 'rfs' ? (
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-extrabold text-bio-navy mr-1 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5 text-bio-green" />
                  Filtrar por Pilar:
                </span>
                {pillars.map((pillar) => (
                  <button
                    key={pillar}
                    type="button"
                    onClick={() => setSelectedPillar(pillar)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      selectedPillar === pillar
                        ? 'bg-bio-green text-white shadow-sm'
                        : 'bg-bio-cream text-bio-navy hover:bg-bio-paper'
                    }`}
                  >
                    {pillar}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-extrabold text-bio-navy mr-1 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5 text-bio-green" />
                  Filtrar por Sector:
                </span>
                {corporateSectors.map((sector) => (
                  <button
                    key={sector}
                    type="button"
                    onClick={() => setSelectedSector(sector)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      selectedSector === sector
                        ? 'bg-bio-navy text-white shadow-sm'
                        : 'bg-bio-cream text-bio-navy hover:bg-bio-paper'
                    }`}
                  >
                    {sector}
                  </button>
                ))}
              </div>
            )}

            <Link
              to="/rfs"
              className="text-xs font-extrabold text-bio-green hover:text-bio-greenDark flex items-center gap-1"
            >
              <span>Ver catálogo completo con buscador avanzado</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

        {/* ════════════════════════════════════════════════════════════════
            CARDS GRID DINÁMICA (EXCLUSIVAMENTE 3 DESTACADOS)
           ════════════════════════════════════════════════════════════════ */}
        {activeTab === 'rfs' ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredRfsItems.map((rfs) => (
                <RfsChallengeCard
                  key={rfs.id}
                  rfs={rfs}
                  onSelect={setSelectedRfs}
                />
              ))}
            </div>

            {/* Prominent Footer CTA to explore all 10 RFS */}
            <div className="text-center pt-4">
              <Link
                to="/rfs"
                className="inline-flex items-center justify-center px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-wider text-bio-navy bg-white border-2 border-bio-navy/20 hover:border-bio-green hover:bg-bio-green hover:text-white shadow-md transition-all group"
              >
                <span>Ver los 10 Desafíos Esenciales de la Amazonía en el Catálogo Completo</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCorporateNeeds.map((item) => (
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
                            Demanda Confidencial
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full text-[11px] font-mono font-black uppercase tracking-wider bg-bio-green/85 backdrop-blur-md text-white border border-bio-green/30 flex items-center gap-1.5 shadow-sm">
                            <Building2 className="w-3.5 h-3.5" />
                            {item.companyName}
                          </span>
                        )}

                        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/90 backdrop-blur-md text-bio-navy shadow-sm">
                          {item.category.split('&')[0]}
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
                      <h3 className="text-base font-extrabold text-bio-navy leading-snug group-hover:text-bio-green transition-colors line-clamp-2">
                        {item.title}
                      </h3>

                      <p className="text-xs text-bio-textMuted leading-relaxed line-clamp-3">
                        {item.description}
                      </p>

                      {/* Collaboration Tags */}
                      {item.collaborationTypes && item.collaborationTypes.length > 0 && (
                        <div className="pt-1">
                          <span className="text-[10px] font-extrabold text-bio-navy uppercase tracking-wider block mb-1">
                            Vinculación Buscada:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {item.collaborationTypes.slice(0, 2).map(c => (
                              <span key={c} className="px-2 py-0.5 rounded-md bg-bio-paper text-bio-navy text-[10px] font-bold border border-bio-navy/10">
                                {c === 'codesarrollo' ? '🔬 Co-Desarrollo' : c === 'piloto' ? '🌱 Piloto' : c === 'licencia' ? '📜 Licencia' : c === 'venture_client' ? '💼 Venture Client' : c}
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
                        className="px-3 py-2 rounded-xl text-xs font-bold text-bio-navy hover:bg-bio-cream border border-bio-navy/15 transition-colors flex items-center gap-1"
                      >
                        <Info className="w-3.5 h-3.5 text-bio-green" />
                        <span>Ficha</span>
                      </button>

                      <button
                        type="button"
                        onClick={onOpenApply}
                        className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-bio-green hover:bg-bio-greenDark shadow-md transition-all"
                      >
                        <span>Conectar</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Prominent Footer CTA to explore all corporate needs */}
            <div className="text-center pt-4">
              <Link
                to="/rfs"
                className="inline-flex items-center justify-center px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-wider text-white bg-bio-navy hover:bg-bio-navyDark shadow-md transition-all group"
              >
                <span>Explorar toda la Base de Datos de Necesidades Tecnológicas (Database of Needs)</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform text-bio-neon" />
              </Link>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════
            MODALES INTERACTIVOS
           ════════════════════════════════════════════════════════════════ */}
        
        {/* Detail Modal RFS */}
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
          onSuccess={handleCorporateCreated}
        />

        {/* Corporate Need Detail Modal */}
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

      </div>
    </section>
  );
}
