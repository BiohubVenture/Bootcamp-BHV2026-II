import React, { useState, useEffect } from 'react';
import { TOP_STARTUPS } from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';
import { 
  Search, Filter, MapPin, ExternalLink, Star, PlusCircle, 
  LogIn, UserCheck, ShieldCheck, Leaf, Sparkles, MessageCircle, 
  ChevronRight, RefreshCw, Layers, CheckCircle2, SlidersHorizontal, Edit3
} from 'lucide-react';
import StartupModal from '../components/StartupModal';
import StartupLoginModal from '../components/StartupLoginModal';
import SubmitTechnologyModal from '../components/SubmitTechnologyModal';
import { getStartupsDatabase } from '../services/dbService';

export default function StartupsPage({ currentLang }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.ES;

  const [startupsList, setStartupsList] = useState(TOP_STARTUPS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTrlGroup, setSelectedTrlGroup] = useState('All');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [favorites, setFavorites] = useState({});

  // Modals & Auth State
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [editingStartup, setEditingStartup] = useState(null);
  const [userSession, setUserSession] = useState(null);

  // Load database
  useEffect(() => {
    loadStartups();
    const savedUser = localStorage.getItem('bhv_startup_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUserSession(parsed);
        if (parsed.startupId) {
          const match = TOP_STARTUPS.find(s => s.id === parsed.startupId);
          if (match) setEditingStartup(match);
        }
      } catch (e) {}
    }
  }, []);

  const loadStartups = async () => {
    const list = await getStartupsDatabase();
    setStartupsList(list);
  };

  const handleLogout = () => {
    localStorage.removeItem('bhv_startup_user');
    setUserSession(null);
    setEditingStartup(null);
  };

  const handleEditStartupDirect = (startup, e) => {
    if (e) e.stopPropagation();
    setEditingStartup(startup);
    if (!userSession) {
      setIsLoginModalOpen(true);
    } else {
      setIsSubmitModalOpen(true);
    }
  };

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getTrlNumber = (srlString) => {
    if (!srlString) return 5;
    const match = srlString.match(/(?:SRL|TRL)\s*(\d+)/i);
    return match ? parseInt(match[1]) : 5;
  };

  // Filter startups
  const filteredStartups = startupsList.filter(s => {
    // Country
    if (selectedCountry !== 'All' && s.country !== selectedCountry) return false;
    
    // Category
    if (selectedCategory !== 'All' && !s.category.toLowerCase().includes(selectedCategory.toLowerCase())) return false;
    
    // TRL Group
    const trlNum = getTrlNumber(s.srlLevel);
    if (selectedTrlGroup === 'TRL 1-4' && trlNum > 4) return false;
    if (selectedTrlGroup === 'TRL 5-6' && (trlNum < 5 || trlNum > 6)) return false;
    if (selectedTrlGroup === 'TRL 7-8' && (trlNum < 7 || trlNum > 8)) return false;
    if (selectedTrlGroup === 'TRL 9' && trlNum < 9) return false;

    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = s.name?.toLowerCase().includes(q);
      const matchTagline = s.tagline?.toLowerCase().includes(q);
      const matchDesc = s.description?.toLowerCase().includes(q);
      const matchCountry = s.country?.toLowerCase().includes(q);
      const matchFounders = s.founders?.some(f => f.toLowerCase().includes(q));
      if (!matchName && !matchTagline && !matchDesc && !matchCountry && !matchFounders) return false;
    }

    return true;
  });

  const resetFilters = () => {
    setSelectedCountry('All');
    setSelectedCategory('All');
    setSelectedTrlGroup('All');
    setSearchQuery('');
  };

  const investorWhatsappMessage = encodeURIComponent(
    "Hola equipo de Biohub Venture, represento a un fondo/inversor y deseo conectar con las startups del Portafolio y Demo Days."
  );

  return (
    <div className="py-12 bg-[#F8FAFC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* ======================================================== */}
        {/* 1. HEADER LIMPIO (PORTAFOLIO BHV)                        */}
        {/* ======================================================== */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-gray-200">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-bio-green/15 text-bio-greenDark text-xs font-black uppercase tracking-wider">
              <Leaf className="w-3.5 h-3.5 text-bio-green" />
              <span>Base de Datos Tecnológica BHV • Casos de Éxito</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-bio-navy tracking-tight">
              Portafolio: Startups de Impacto
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Catálogo de tecnologías sostenibles y bioeconomía aceleradas por Biohub Venture en LATAM.
            </p>
          </div>

          {/* User Auth & Submission Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            {userSession ? (
              <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-xl border border-gray-200 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold text-bio-navy">{userSession.startupName}</span>
                <button
                  onClick={handleLogout}
                  className="text-[11px] text-gray-400 hover:text-red-500 ml-2"
                >
                  Salir
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-white border border-gray-300 hover:border-bio-navy text-bio-navy text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Acceso Startups</span>
              </button>
            )}

            <button
              onClick={() => {
                if (userSession) {
                  setIsSubmitModalOpen(true);
                } else {
                  setIsLoginModalOpen(true);
                }
              }}
              className="px-4 py-2 rounded-xl bg-bio-green hover:bg-bio-greenDark text-white text-xs font-extrabold transition-all shadow-sm flex items-center space-x-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{userSession ? 'Editar mi Ficha' : 'Subir / Editar mi Ficha'}</span>
            </button>

            <a
              href={`https://wa.me/51999999999?text=${investorWhatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-bio-navy hover:bg-bio-green text-white text-xs font-extrabold transition-all shadow-sm flex items-center space-x-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 text-bio-neon" />
              <span>Investor Gateway</span>
            </a>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. BARRA DE BÚSQUEDA CENTRAL                              */}
        {/* ======================================================== */}
        <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
          
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar en el Portafolio de Tecnologías BHV (Ej. dengue, bacteriófagos, polinización, micelio)..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-bio-green text-gray-800 bg-gray-50/50"
            />
          </div>

          <div className="flex items-center space-x-2 w-full md:w-auto">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center space-x-1.5 ${
                sidebarOpen 
                  ? 'bg-bio-green/10 text-bio-greenDark border-bio-green/30' 
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filtros {sidebarOpen ? '<<' : '>>'}</span>
            </button>

            <button
              onClick={resetFilters}
              title="Restablecer filtros"
              className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:text-bio-green bg-white hover:bg-gray-50"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* ======================================================== */}
        {/* 3. LAYOUT PRINCIPAL: SIDEBAR + LISTADO HORIZONTAL         */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDEBAR FILTERS */}
          {sidebarOpen && (
            <aside className="lg:col-span-3 bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-6 animate-fade-in">
              
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-xs font-black uppercase tracking-wider text-gray-700">Filtros de Búsqueda</span>
                <button
                  onClick={resetFilters}
                  className="text-[11px] font-bold text-bio-green hover:underline"
                >
                  Reset all
                </button>
              </div>

              {/* Source Filter */}
              <div className="space-y-2 text-xs">
                <span className="font-extrabold text-gray-800 block text-[11px] uppercase">Base de Datos</span>
                <label className="flex items-center space-x-2 text-gray-600 cursor-pointer font-medium">
                  <input type="checkbox" checked readOnly className="text-bio-green rounded" />
                  <span>Startups Verificadas BHV ({startupsList.length})</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-400 cursor-not-allowed">
                  <input type="checkbox" disabled className="rounded" />
                  <span>Patentes Registradas</span>
                </label>
              </div>

              {/* Country / Developed in */}
              <div className="space-y-2 text-xs pt-3 border-t border-gray-100">
                <span className="font-extrabold text-gray-800 block text-[11px] uppercase">País de Origen</span>
                {['All', 'Perú', 'Colombia', 'Ecuador', 'El Salvador', 'Venezuela'].map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedCountry(c)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                      selectedCountry === c 
                        ? 'bg-bio-green/10 text-bio-greenDark font-bold' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span>{c === 'All' ? 'Todos los países' : c}</span>
                    {selectedCountry === c && <span className="w-1.5 h-1.5 rounded-full bg-bio-green" />}
                  </button>
                ))}
              </div>

              {/* Sector / Category */}
              <div className="space-y-2 text-xs pt-3 border-t border-gray-100">
                <span className="font-extrabold text-gray-800 block text-[11px] uppercase">Sector Tecnológico</span>
                {['All', 'HealthTech & Farma', 'FoodTech', 'Agritech', 'Biomateriales', 'Bioplásticos', 'IoT'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                      selectedCategory === cat 
                        ? 'bg-bio-green/10 text-bio-greenDark font-bold' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span>{cat === 'All' ? 'Todos los sectores' : cat}</span>
                    {selectedCategory === cat && <span className="w-1.5 h-1.5 rounded-full bg-bio-green" />}
                  </button>
                ))}
              </div>

              {/* TRL Level */}
              <div className="space-y-2 text-xs pt-3 border-t border-gray-100">
                <span className="font-extrabold text-gray-800 block text-[11px] uppercase">Madurez Tecnológica (TRL)</span>
                {['All', 'TRL 1-4', 'TRL 5-6', 'TRL 7-8', 'TRL 9'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedTrlGroup(lvl)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                      selectedTrlGroup === lvl 
                        ? 'bg-bio-green/10 text-bio-greenDark font-bold' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span>{lvl === 'All' ? 'Cualquier TRL' : lvl}</span>
                    {selectedTrlGroup === lvl && <span className="w-1.5 h-1.5 rounded-full bg-bio-green" />}
                  </button>
                ))}
              </div>

            </aside>
          )}

          {/* MAIN RESULTS FEED */}
          <main className={`${sidebarOpen ? 'lg:col-span-9' : 'lg:col-span-12'} space-y-4`}>
            
            {/* Top Results Count Bar */}
            <div className="flex items-center justify-between text-xs text-gray-500 pb-2">
              <span>Mostrando <strong>{filteredStartups.length}</strong> de {startupsList.length} tecnologías validadas</span>
              <span className="text-[11px] font-mono">Portafolio Tecnológico Biohub Venture</span>
            </div>

            {/* List of Clean Horizontal Cards */}
            <div className="space-y-4">
              {filteredStartups.map((startup) => {
                const trl = getTrlNumber(startup.srlLevel);
                const isFav = !!favorites[startup.id];

                return (
                  <div
                    key={startup.id}
                    onClick={() => setSelectedStartup(startup)}
                    className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-bio-green hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col md:flex-row gap-5"
                  >
                    {/* Left Thumbnail Image */}
                    <div className="w-full md:w-56 h-48 md:h-48 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 relative">
                      <img 
                        src={startup.image} 
                        alt={startup.name} 
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-white text-[10px] font-black">
                        {startup.rank}
                      </span>
                    </div>

                    {/* Center Info Block */}
                    <div className="flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-1.5">
                        {/* Category Breadcrumb */}
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-bio-green block">
                            BIOTECNOLOGÍA & IMPACTO {'>'} {startup.category}
                          </span>
                          <button
                            onClick={(e) => handleEditStartupDirect(startup, e)}
                            className="text-[10px] font-bold text-bio-green hover:text-bio-greenDark flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="¿Eres el founder? Clic para editar"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Editar Ficha</span>
                          </button>
                        </div>

                        {/* Title */}
                        <h3 className="text-base font-extrabold text-bio-navy group-hover:text-bio-green transition-colors leading-snug">
                          {startup.name} — {startup.tagline}
                        </h3>

                        {/* Description */}
                        <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                          {startup.description}
                        </p>
                      </div>

                      {/* TRL Progress Line Visual */}
                      <div className="pt-2 border-t border-gray-100">
                        <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1 font-mono">
                          <span>TRL 1-2</span>
                          <span>TRL 3-4</span>
                          <span>TRL 5-6</span>
                          <span>TRL 7</span>
                          <span>TRL 8-9</span>
                        </div>

                        {/* Visual Dot Track */}
                        <div className="relative flex items-center justify-between">
                          <div className="absolute left-0 right-0 h-0.5 bg-gray-200 z-0" />
                          {[2, 4, 6, 7, 9].map((lvl, idx) => {
                            const isAchieved = trl >= lvl;

                            return (
                              <div 
                                key={idx} 
                                className={`w-3.5 h-3.5 rounded-full z-10 border-2 transition-all flex items-center justify-center ${
                                  isAchieved 
                                    ? 'bg-bio-green border-white shadow-xs' 
                                    : 'bg-gray-300 border-white'
                                }`}
                                title={`Nivel TRL ${lvl}`}
                              />
                            );
                          })}
                        </div>
                        <span className="text-[10px] font-bold text-gray-700 mt-1 block">
                          Madurez: <strong className="text-bio-greenDark">{startup.srlLevel}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Right Metadata Block (Owner, Country, Deal) */}
                    <div className="w-full md:w-56 pl-0 md:pl-5 border-t md:border-t-0 md:border-l border-gray-100 flex flex-col justify-between space-y-3 flex-shrink-0 pt-3 md:pt-0">
                      
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-gray-400">ID: #{1000 + startup.id}</span>
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={(e) => toggleFavorite(startup.id, e)}
                            className={`p-1.5 rounded-lg border transition-colors ${
                              isFav 
                                ? 'bg-amber-50 text-amber-500 border-amber-200' 
                                : 'text-gray-400 hover:text-gray-600 border-gray-200'
                            }`}
                          >
                            <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-amber-500' : ''}`} />
                          </button>
                          <span className="p-1.5 rounded-lg border border-gray-200 text-gray-400 group-hover:text-bio-green">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1 text-xs">
                        <div>
                          <span className="text-[10px] text-gray-400 block font-medium">Owner:</span>
                          <span className="font-bold text-gray-800 text-[11px]">{startup.founders[0]}</span>
                        </div>

                        <div>
                          <span className="text-[10px] text-gray-400 block font-medium">Desarrollado en:</span>
                          <span className="font-bold text-gray-800 text-[11px] flex items-center space-x-1">
                            <MapPin className="w-3 h-3 text-bio-green" />
                            <span>{startup.country}</span>
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] text-gray-400 block font-medium">Inversión / Etapa:</span>
                          <span className="font-extrabold text-bio-greenDark text-[11px]">{startup.stage}</span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedStartup(startup); }}
                        className="w-full py-1.5 rounded-xl bg-gray-50 hover:bg-bio-green text-gray-700 hover:text-white font-extrabold text-[11px] transition-colors border border-gray-200"
                      >
                        Ver Ficha Técnica →
                      </button>

                    </div>

                  </div>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredStartups.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 space-y-3">
                <p className="text-sm text-gray-500">No se encontraron tecnologías que coincidan con los filtros aplicados.</p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 rounded-xl bg-bio-green text-white font-bold text-xs"
                >
                  Restablecer filtros
                </button>
              </div>
            )}

          </main>

        </div>

      </div>

      {/* Startup Details Modal */}
      {selectedStartup && (
        <StartupModal
          startup={selectedStartup}
          onClose={() => setSelectedStartup(null)}
          onEditRequested={() => {
            const startup = selectedStartup;
            setSelectedStartup(null);
            handleEditStartupDirect(startup);
          }}
        />
      )}

      {/* Startup Founder Login Modal */}
      <StartupLoginModal
        isOpen={isLoginModalOpen}
        preSelectedStartup={editingStartup}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={(session, startupObj) => {
          setUserSession(session);
          setEditingStartup(startupObj);
          setIsSubmitModalOpen(true);
        }}
      />

      {/* Submit / Edit Technology Modal */}
      <SubmitTechnologyModal
        isOpen={isSubmitModalOpen}
        onClose={() => {
          setIsSubmitModalOpen(false);
        }}
        userSession={userSession}
        targetStartup={editingStartup}
        onTechnologyAdded={(newEntry, isUpdate) => {
          loadStartups();
        }}
      />

    </div>
  );
}
