import React, { useState, useEffect } from 'react';
import { 
  X, Building2, CheckCircle2, ArrowRight, ExternalLink, ShieldCheck, 
  Award, Sparkles, FileText, Download, Copy, Check, MessageCircle, 
  Layers, FlaskConical, Users, Calendar, AlertCircle, TrendingUp,
  Cpu, Rocket, Lock, Globe, Share2, Compass, CheckSquare, Clock, 
  BarChart3, HelpCircle, ArrowLeft, Lightbulb, Leaf, Target, Sparkle
} from 'lucide-react';
import { TOP_STARTUPS } from '../data/mockData';

// 10 Amazonian Challenges + Option "Otro"
const AMAZON_CHALLENGES = [
  { id: 1, number: '#01', name: 'Beneficio Compartido y Trazabilidad', desc: 'Protocolo de Nagoya, blockchain y reparto justo.', market: 'USD 2.5B', tag: 'Trazabilidad & Nagoya' },
  { id: 2, number: '#02', name: 'Bioinsumos y Biofertilizantes', desc: 'Microorganismos nativos para regenerar suelos y sustituir químicos.', market: 'USD 4.8B', tag: 'AgroBiotech' },
  { id: 3, number: '#03', name: 'Alimentos del Futuro', desc: 'Superfoods, ingredientes funcionales y proteínas bio.', market: 'USD 6.1B', tag: 'FoodTech & Superfoods' },
  { id: 4, number: '#04', name: 'Salud Humana & Moléculas Bioactivas', desc: 'Fitofármacos y principios activos de la biodiversidad.', market: 'USD 12.0B', tag: 'HealthTech & Farma' },
  { id: 5, number: '#05', name: 'Biotecnología para la Salud Animal', desc: 'Probióticos y aditivos naturales para acuicultura y ganadería.', market: 'USD 3.2B', tag: 'AgroVet Bio' },
  { id: 6, number: '#06', name: 'Tecnologías para la Biodiversidad', desc: 'eDNA, bioacústica, sensores e IoT para monitoreo ambiental.', market: 'USD 1.8B', tag: 'DeepTech & IoT' },
  { id: 7, number: '#07', name: 'Bioeconomía Circular', desc: 'Bioplásticos, biochar y empaques de residuos agrícolas.', market: 'USD 5.5B', tag: 'Materiales Circulares' },
  { id: 8, number: '#08', name: 'Turismo Regenerativo', desc: 'Plataformas de conservación y turismo de ciencia.', market: 'USD 1.2B', tag: 'Conservación & Servicios' },
  { id: 9, number: '#09', name: 'Inteligencia Artificial Aplicada a Biología', desc: 'Modelos predictivos de enzimas y rutas metabólicas.', market: 'USD 8.4B', tag: 'Bio-AI & Bioinformática' },
  { id: 10, number: '#10', name: 'Financiamiento e Inversión Verde', desc: 'Tokenización de créditos y bonos de biodiversidad.', market: 'USD 9.0B', tag: 'Climate FinTech' },
  { id: 'other', number: '✨', name: 'Otro Desafío / Nueva Línea Biotecnológica', desc: 'Línea innovadora no categorizada en los 10 pilares anteriores.', market: 'Oportunidad Emergente', tag: 'Línea Abierta' }
];

export default function StartupPortal({ isOpen, onClose, startup, userSession, onUpdateStartup }) {
  // Strict separation of role: 'alumni' vs 'applicant'
  const isApplicant = userSession?.role === 'applicant';
  const role = isApplicant ? 'applicant' : 'alumni';

  // Active Tab: Defaults to 'status' for Applicant and 'cert' for Alumni
  const [activeTab, setActiveTab] = useState(isApplicant ? 'status' : 'cert');

  // Applicant Workflow State (1: Cuestionario, 2: Ficha, 3: Comité, 4: Selección)
  const [applicantStep, setApplicantStep] = useState(1);
  const [isDiagnosticCompleted, setIsDiagnosticCompleted] = useState(false);
  const [isApplicationSubmitted, setIsApplicationSubmitted] = useState(false);
  const [previewAdmittedList, setPreviewAdmittedList] = useState(false);

  // Diagnostic Quiz State inside Step 1
  const [quizActive, setQuizActive] = useState(false);
  const [quizStep, setQuizStep] = useState(1); // 1: Desafío, 2: Necesidad, 3: Impacto, 4: Madurez TRL/CRL
  const [copiedGuide, setCopiedGuide] = useState(false);

  const [diagnosticData, setDiagnosticData] = useState({
    challengeId: 2, // Default: Bioinsumos
    customChallengeName: '',
    marketNeed: 'Degradación de suelos agrícolas, pérdida de fertilidad y uso excesivo de fertilizantes químicos sintéticos.',
    customNeed: '',
    impactGoal: 'Regeneración y recuperación de suelos amazónicos sustituyendo insumos fósiles por consorcios biológicos.',
    customImpact: '',
    maturityLevel: 'Fase 2 (TRL 3-4 / CRL 3-4): Prueba de Concepto en Laboratorio & Validación de Propuesta de Valor.',
    customMaturity: ''
  });

  // Form State for editing technology sheet (Alumni only)
  const [formData, setFormData] = useState({
    name: startup?.name || userSession?.startupName || (isApplicant ? 'Mi BioStartup Postulante' : 'Mi BioStartup'),
    category: startup?.category || 'Biotecnología Sostenible',
    country: startup?.country || 'Perú',
    trlLevel: startup?.trlLevel || 'TRL 5: Validación en entorno relevante',
    srlLevel: startup?.srlLevel || 'SRL 4: Modelo de negocio probado',
    description: startup?.summary || startup?.description || 'Desarrollo biotecnológico enfocado en la valorización de recursos amazónicos.',
    problem: startup?.problem || 'Pérdida de biodiversidad y falta de valorización tecnológica de recursos genéticos.',
    solution: startup?.solution || 'Tecnología basada en bionanomateriales y procesos biológicos avanzados.',
    founders: startup?.founders ? startup.founders.join(', ') : 'Fundador Principal, Co-founder',
    targetRound: '$150,000 USD (Pre-Seed)',
    tractionSummary: '3 pilotos completados en la Amazonía, 1 solicitud de patente y 12 clientes potenciales en pipeline.',
    demoDayRank: startup?.rank ? `${startup.rank}° Lugar Demo Day Cohorte 2026-I` : 'Top Startup Biotecnológica',
    blockchainTokenId: `#BHV-2026I-${String(startup?.id || '001').padStart(3, '0')}`,
    blockchainHash: '0x8f2c9e4a7153d820b1f7e034ac569d1284eb34f19b22'
  });

  const [copiedHash, setCopiedHash] = useState(false);
  const [isSavedToast, setIsSavedToast] = useState(false);

  useEffect(() => {
    if (isApplicant) {
      setActiveTab('status');
    } else {
      setActiveTab('cert');
    }
  }, [isApplicant]);

  // Update formData when startup changes
  useEffect(() => {
    if (startup) {
      setFormData(prev => ({
        ...prev,
        name: startup.name || prev.name,
        category: startup.category || prev.category,
        country: startup.country || prev.country,
        trlLevel: startup.trlLevel || prev.trlLevel,
        srlLevel: startup.srlLevel || prev.srlLevel,
        description: startup.summary || startup.description || prev.description,
        demoDayRank: startup.rank ? `${startup.rank}° Lugar Demo Day Cohorte 2026-I` : prev.demoDayRank,
        blockchainTokenId: `#BHV-2026I-${String(startup.id || '001').padStart(3, '0')}`
      }));
    }
  }, [startup]);

  const handleCopyHash = () => {
    navigator.clipboard.writeText(formData.blockchainHash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const getSelectedChallengeObj = () => {
    if (diagnosticData.challengeId === 'other') {
      return {
        name: diagnosticData.customChallengeName || 'Línea de Innovación Biotecnológica Abierta',
        market: 'Oportunidad Emergente de Alto Crecimiento',
        number: '✨'
      };
    }
    return AMAZON_CHALLENGES.find(c => c.id === diagnosticData.challengeId) || AMAZON_CHALLENGES[1];
  };

  const handleCopyGuide = () => {
    const ch = getSelectedChallengeObj();
    const needText = diagnosticData.customNeed || diagnosticData.marketNeed;
    const impactText = diagnosticData.customImpact || diagnosticData.impactGoal;
    const maturityText = diagnosticData.customMaturity || diagnosticData.maturityLevel;

    const guideText = `=== FICHA GUÍA DE POSTULACIÓN - BIOHUB VENTURE 2026-II ===
Startup / Proyecto: ${formData.name}
Desafío Oficial Asignado: Desafío ${ch.number}: ${ch.name} (Mercado: ${ch.market})

PUNTOS CLAVE PARA EL FORMULARIO DE GOOGLE:
1. PROBLEMA / NECESIDAD: ${needText}
2. PROPUESTA DE VALOR & IMPACTO: ${impactText}
3. MADUREZ COMBINADA (TRL/CRL): ${maturityText}

CONSEJOS DEL COMITÉ:
- Detalla cómo tu tecnología utiliza de forma sostenible recursos amazónicos.
- Enfatiza el acompañamiento de laboratorios IGBM para validar tu evidencia experimental.
- Destaca la dedicación de tu equipo founder para las 8 semanas de aceleración.`;

    navigator.clipboard.writeText(guideText);
    setCopiedGuide(true);
    setTimeout(() => setCopiedGuide(false), 2000);
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setIsSavedToast(true);
    if (onUpdateStartup) {
      onUpdateStartup({
        ...startup,
        name: formData.name,
        category: formData.category,
        country: formData.country,
        trlLevel: formData.trlLevel,
        srlLevel: formData.srlLevel,
        summary: formData.description
      });
    }
    setTimeout(() => setIsSavedToast(false), 3000);
  };

  if (!isOpen) return null;

  const currentChallenge = getSelectedChallengeObj();

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-bio-navyDeep/85 backdrop-blur-md animate-fadeIn overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl max-w-5xl w-full my-auto shadow-2xl border border-bio-green/30 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* ========================================================================= */}
        {/* 1. TOP HEADER & PROFILE BAR                                              */}
        {/* ========================================================================= */}
        <div className="bg-gradient-to-r from-bio-navy via-bio-navyDeep to-bio-navyDark text-white p-5 sm:p-6 border-b border-bio-green/20">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Left: Identity & Badges */}
            <div className="flex items-center space-x-3.5 min-w-0">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black font-mono text-base flex-shrink-0 shadow-sm border ${
                role === 'alumni' 
                  ? 'bg-bio-green/20 border-bio-green/40 text-bio-neon' 
                  : 'bg-bio-neon/20 border-bio-neon/40 text-bio-neon'
              }`}>
                {formData.name.slice(0, 2).toUpperCase()}
              </div>

              <div className="min-w-0">
                <div className="flex items-center space-x-2">
                  <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono font-black uppercase tracking-wider ${
                    role === 'alumni' 
                      ? 'bg-bio-green text-white' 
                      : 'bg-bio-neon text-bio-navyDark font-extrabold'
                  }`}>
                    {role === 'alumni' ? '🎓 ESPACIO ALUMNI GRADUADO' : '📝 ONBOARDING DE POSTULACIÓN 2026-II'}
                  </span>
                  <span className="text-xs text-gray-300 font-bold">
                    {formData.country}
                  </span>
                </div>
                
                <h1 className="text-xl sm:text-2xl font-extrabold text-white truncate leading-tight mt-0.5">
                  {formData.name}
                </h1>
              </div>
            </div>

            {/* Right: Status Pill + Close Button */}
            <div className="flex items-center space-x-3 self-end sm:self-auto">
              <div className="hidden sm:flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-xl border border-white/15 text-xs text-gray-200">
                <span className={`w-2 h-2 rounded-full ${role === 'alumni' ? 'bg-emerald-400' : 'bg-bio-neon animate-pulse'}`} />
                <span>{role === 'alumni' ? 'Certificación BHV Activa' : 'Candidatura en Proceso'}</span>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Cerrar portal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

          </div>

          {/* Subheader Navigation Tabs (Differentiated by Role) */}
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-white/10 text-xs">
            {role === 'alumni' ? (
              <>
                <button
                  onClick={() => setActiveTab('cert')}
                  className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                    activeTab === 'cert' ? 'bg-white text-bio-navy font-extrabold shadow-sm' : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-bio-green" />
                  <span>Certificado Blockchain & Sello Alumni</span>
                </button>

                <button
                  onClick={() => setActiveTab('sheet')}
                  className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                    activeTab === 'sheet' ? 'bg-white text-bio-navy font-extrabold shadow-sm' : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-bio-green" />
                  <span>Ficha Tecnológica & Paténtame</span>
                </button>

                <button
                  onClick={() => setActiveTab('investor')}
                  className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                    activeTab === 'investor' ? 'bg-white text-bio-navy font-extrabold shadow-sm' : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5 text-bio-green" />
                  <span>Investor Room & Dealflow</span>
                </button>

                <button
                  onClick={() => setActiveTab('perks')}
                  className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                    activeTab === 'perks' ? 'bg-white text-bio-navy font-extrabold shadow-sm' : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <FlaskConical className="w-3.5 h-3.5 text-bio-green" />
                  <span>Red de Laboratorios & Beneficios</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setActiveTab('status')}
                  className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                    activeTab === 'status' ? 'bg-white text-bio-navy font-extrabold shadow-sm' : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <Rocket className="w-3.5 h-3.5 text-bio-green" />
                  <span>Ruta de Postulación (4 Pasos)</span>
                </button>

                <button
                  onClick={() => setActiveTab('bases')}
                  className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                    activeTab === 'bases' ? 'bg-white text-bio-navy font-extrabold shadow-sm' : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5 text-bio-green" />
                  <span>Cronograma & Bases Oficiales</span>
                </button>
              </>
            )}
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 2. BODY CONTENT (SCROLLABLE)                                             */}
        {/* ========================================================================= */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 bg-bio-cream/40 space-y-6">

          {/* Toast de Guardado Exitoso */}
          {isSavedToast && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center space-x-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>¡Ficha tecnológica actualizada correctamente!</span>
            </div>
          )}

          {/* ──────────────────────────────────────────────────────────────────────── */}
          {/* VISTA ALUMNI: CERTIFICADO BLOCKCHAIN & SELLO OFICIAL                     */}
          {/* ──────────────────────────────────────────────────────────────────────── */}
          {role === 'alumni' && activeTab === 'cert' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Visual Blockchain Certificate Card */}
              <div className="relative rounded-3xl bg-gradient-to-br from-bio-navy via-bio-navyDeep to-bio-navyDark p-6 sm:p-8 text-white border-2 border-bio-green shadow-2xl overflow-hidden">
                
                {/* Background Watermark */}
                <div className="absolute right-0 top-0 bottom-0 w-80 opacity-10 pointer-events-none flex items-center justify-center">
                  <ShieldCheck className="w-64 h-64 text-bio-neon" />
                </div>

                <div className="relative z-10 space-y-6">
                  
                  {/* Top Credential Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-4">
                    <div className="flex items-center space-x-2.5">
                      <div className="p-2 rounded-xl bg-bio-neon/20 border border-bio-neon/40 text-bio-neon">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-black uppercase tracking-widest text-bio-neon block">
                          CERTIFICACIÓN BLOCKCHAIN OFICIAL
                        </span>
                        <h3 className="text-base sm:text-lg font-extrabold text-white">
                          Sello de Calidad Alumni Biohub Venture
                        </h3>
                      </div>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-mono font-bold">
                      ● Verificado en Polygon Network
                    </span>
                  </div>

                  {/* Startup Recognition Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    
                    <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs space-y-1">
                      <span className="text-[10px] font-mono uppercase text-gray-300 font-bold block">
                        Startup Acreditada
                      </span>
                      <p className="text-lg font-extrabold text-white">
                        {formData.name}
                      </p>
                      <span className="text-xs text-bio-neon font-semibold">
                        {formData.category} ({formData.country})
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs space-y-1">
                      <span className="text-[10px] font-mono uppercase text-gray-300 font-bold block">
                        Hito de Graduación
                      </span>
                      <p className="text-sm sm:text-base font-extrabold text-emerald-300">
                        {formData.demoDayRank}
                      </p>
                      <span className="text-xs text-gray-300">
                        Programa de Aceleración 8 Semanas
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs space-y-1">
                      <span className="text-[10px] font-mono uppercase text-gray-300 font-bold block">
                        Token ID Criptográfico
                      </span>
                      <p className="text-sm font-mono font-extrabold text-white">
                        {formData.blockchainTokenId}
                      </p>
                      <span className="text-[11px] text-gray-300">
                        Estándar ERC-721 Proof-of-Validation
                      </span>
                    </div>

                  </div>

                  {/* Blockchain Technical Verification Details */}
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                    <div className="flex flex-wrap items-center justify-between text-xs font-mono text-gray-300 gap-2">
                      <span>Smart Contract: <strong className="text-white">0x7aC92B91F840E5A7371192e2B15a850B3e1c66b9</strong></span>
                      <span>Red: <strong className="text-bio-neon">Polygon PoS (Chain ID: 137)</strong></span>
                    </div>

                    <div className="flex items-center justify-between bg-white/5 p-2 rounded-xl border border-white/10 text-xs font-mono">
                      <div className="truncate mr-2 text-gray-300">
                        <span className="text-gray-400">Tx Hash: </span>
                        <span className="text-emerald-300">{formData.blockchainHash}</span>
                      </div>
                      
                      <button
                        type="button"
                        onClick={handleCopyHash}
                        className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-sans font-bold flex items-center space-x-1 cursor-pointer transition-colors flex-shrink-0"
                      >
                        {copiedHash ? <Check className="w-3.5 h-3.5 text-bio-neon" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedHash ? 'Copiado' : 'Copiar'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Certificate Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href={`https://polygonscan.com/tx/${formData.blockchainHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-bio-green hover:bg-bio-greenDark text-white text-xs font-extrabold flex items-center space-x-1.5 transition-colors shadow-sm cursor-pointer"
                    >
                      <Globe className="w-4 h-4" />
                      <span>Verificar en PolygonScan</span>
                      <ExternalLink className="w-3.5 h-3.5 ml-1" />
                    </a>

                    <button
                      type="button"
                      onClick={() => alert('Descarga de certificado oficial PDF con firma criptográfica emitida por Biohub Venture.')}
                      className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-extrabold flex items-center space-x-1.5 transition-colors cursor-pointer border border-white/20"
                    >
                      <Download className="w-4 h-4 text-bio-neon" />
                      <span>Descargar Certificado Verificado (PDF)</span>
                    </button>
                  </div>

                </div>

              </div>

              {/* Sello Alumni Badges */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-bio-navy/10 shadow-xs space-y-2">
                  <div className="flex items-center space-x-2 text-bio-navy font-extrabold text-sm">
                    <Award className="w-4 h-4 text-bio-green" />
                    <h4>Insignia para tu Web & Pitch Deck</h4>
                  </div>
                  <p className="text-xs text-bio-textMuted leading-relaxed">
                    Puedes incrustar el Sello Oficial Alumni en tu sitio web para certificar ante fondos de inversión y clientes que tu tecnología fue validada por el consorcio BHV.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-bio-navy/10 shadow-xs space-y-2">
                  <div className="flex items-center space-x-2 text-bio-navy font-extrabold text-sm">
                    <Share2 className="w-4 h-4 text-bio-green" />
                    <h4>Publicación Oficial en Portafolio BHV</h4>
                  </div>
                  <p className="text-xs text-bio-textMuted leading-relaxed">
                    Tu startup permanece destacada en el catálogo público con prioridad de recomendación para convocatorias y Demo Days internacionales.
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* ──────────────────────────────────────────────────────────────────────── */}
          {/* VISTA ALUMNI: FICHA TECNOLÓGICA & MEMORIA TÉCNICA (Paténtame)           */}
          {/* ──────────────────────────────────────────────────────────────────────── */}
          {role === 'alumni' && activeTab === 'sheet' && (
            <form onSubmit={handleSaveChanges} className="space-y-6 animate-fadeIn">
              
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-bio-navy/10 shadow-sm space-y-5">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-bio-navy/10">
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-bio-navy">
                      Ficha Tecnológica & Memoria Técnica
                    </h3>
                    <p className="text-xs text-bio-textMuted">
                      Datos de la tecnología y sincronización con Paténtame.
                    </p>
                  </div>

                  <a
                    href="https://patentame.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-bio-green/10 text-bio-greenDark border border-bio-green/30 hover:bg-bio-green hover:text-white text-xs font-extrabold transition-all cursor-pointer shadow-2xs"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Abrir Memoria Técnica en Paténtame</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  
                  <div>
                    <label className="block font-bold text-bio-navy mb-1">Nombre Oficial de la Startup *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-bio-navy/15 focus:outline-none focus:border-bio-green bg-bio-paper/30 font-extrabold text-bio-navy"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-bio-navy mb-1">País de Origen *</label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-bio-navy/15 focus:outline-none focus:border-bio-green bg-bio-paper/30 font-bold text-bio-navy"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-bio-navy mb-1">Categoría Biotecnológica *</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-bio-navy/15 focus:outline-none focus:border-bio-green bg-bio-paper/30 font-bold text-bio-navy"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-bio-navy mb-1">Equipo / Fundadores *</label>
                    <input
                      type="text"
                      value={formData.founders}
                      onChange={(e) => setFormData({...formData, founders: e.target.value})}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-bio-navy/15 focus:outline-none focus:border-bio-green bg-bio-paper/30 font-bold text-bio-navy"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-bio-navy mb-1">Nivel TRL (Technology Readiness Level) *</label>
                    <select
                      value={formData.trlLevel}
                      onChange={(e) => setFormData({...formData, trlLevel: e.target.value})}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-bio-navy/15 focus:outline-none focus:border-bio-green bg-bio-paper/30 font-bold text-bio-navy text-xs"
                    >
                      <option>TRL 1-3: Investigación básica y prueba de concepto</option>
                      <option>TRL 4: Validación en laboratorio</option>
                      <option>TRL 5: Validación en entorno relevante (Simulado/Piloto)</option>
                      <option>TRL 6: Demostración de prototipo en entorno relevante</option>
                      <option>TRL 7-9: Validación en entorno operacional / Comercial</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-bio-navy mb-1">Resumen de la Tecnología / Propuesta de Valor *</label>
                    <textarea
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-bio-navy/15 focus:outline-none focus:border-bio-green bg-bio-paper/30 font-medium text-bio-navy text-xs leading-relaxed"
                    />
                  </div>

                </div>

                {/* Form Action Buttons */}
                <div className="flex items-center justify-between pt-3 border-t border-bio-navy/10">
                  <span className="text-[11px] text-bio-textMuted font-medium">
                    Los cambios se sincronizan en tu sesión local.
                  </span>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-bio-green hover:bg-bio-greenDark text-white text-xs font-extrabold transition-colors shadow-md cursor-pointer flex items-center space-x-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Guardar Cambios</span>
                  </button>
                </div>

              </div>

            </form>
          )}

          {/* ──────────────────────────────────────────────────────────────────────── */}
          {/* VISTA ALUMNI: INVESTOR ROOM & DEALFLOW                                   */}
          {/* ──────────────────────────────────────────────────────────────────────── */}
          {role === 'alumni' && activeTab === 'investor' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-bio-navy/10 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-bio-navy/10">
                  <div>
                    <span className="text-[10px] font-mono font-black uppercase text-bio-green tracking-wider block">
                      DEALFLOW & CONEXIÓN DE CAPITAL
                    </span>
                    <h3 className="text-base sm:text-lg font-extrabold text-bio-navy">
                      Investor Room Privada
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-bio-green/10 text-bio-greenDark text-xs font-mono font-bold">
                    Ronda Abierta
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  
                  <div className="p-4 rounded-2xl bg-bio-cream/60 border border-bio-navy/10 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-bio-textMuted font-bold block">
                      Ticket de Inversión Buscado
                    </span>
                    <p className="text-base font-extrabold text-bio-navy">
                      {formData.targetRound}
                    </p>
                    <p className="text-[11px] text-bio-textMuted">
                      Instrumento recomendado: SAFE / Nota Convertible con cap.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-bio-cream/60 border border-bio-navy/10 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-bio-textMuted font-bold block">
                      Tracción Clave Acumulada
                    </span>
                    <p className="text-xs font-bold text-bio-navy leading-snug">
                      {formData.tractionSummary}
                    </p>
                  </div>

                </div>

                {/* WhatsApp Direct Gateway for Investors */}
                <div className="p-5 rounded-2xl bg-bio-navy text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <h4 className="text-sm font-extrabold text-white flex items-center justify-center sm:justify-start space-x-2">
                      <MessageCircle className="w-4 h-4 text-bio-neon" />
                      <span>Solicitar Introducción con Fondos del Consorcio</span>
                    </h4>
                    <p className="text-xs text-gray-300">
                      Conectamos tu pitch con la red de ángeles e inversionistas de impacto amazónico.
                    </p>
                  </div>

                  <a
                    href="https://wa.me/51925836543?text=Hola%2C%20represento%20a%20la%20startup%20alumni%20y%20deseo%20activar%20introducciones%20con%20fondos%20de%20inversi%C3%B3n%20en%20BHV."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-bio-neon hover:bg-bio-neonHover text-bio-navyDark font-extrabold text-xs transition-colors shadow-md flex-shrink-0 cursor-pointer"
                  >
                    <span>Conectar vía WhatsApp (+51 925 836 543)</span>
                  </a>
                </div>

              </div>

            </div>
          )}

          {/* ──────────────────────────────────────────────────────────────────────── */}
          {/* VISTA ALUMNI: BENEFICIOS DEL CONSORCIO                                  */}
          {/* ──────────────────────────────────────────────────────────────────────── */}
          {role === 'alumni' && activeTab === 'perks' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeIn">
              
              <div className="p-5 rounded-3xl bg-white border border-bio-navy/10 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-bio-green/15 text-bio-green flex items-center justify-center">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-extrabold text-bio-navy">Red de Laboratorios IGBM</h4>
                <p className="text-xs text-bio-textMuted leading-relaxed">
                  Acceso con tarifas preferenciales para secuenciación, ensayos in vitro y análisis molecular en laboratorios de genética.
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-bio-navy/10 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-bio-green/15 text-bio-green flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-extrabold text-bio-navy">Créditos de IA & Cloud</h4>
                <p className="text-xs text-bio-textMuted leading-relaxed">
                  Hasta $25,000 USD en créditos de infraestructura cloud, Google Cloud y modelos de IA generativa.
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-bio-navy/10 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-bio-green/15 text-bio-green flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-extrabold text-bio-navy">Asesoría Regulatoria</h4>
                <p className="text-xs text-bio-textMuted leading-relaxed">
                  Soporte continuo en contratos de acceso a recursos genéticos (SERFOR / MINAM) y propiedad intelectual.
                </p>
              </div>

            </div>
          )}

          {/* ──────────────────────────────────────────────────────────────────────── */}
          {/* VISTA POSTULANTE: RUTA DE ADMISIÓN EN 4 ETAPAS SECUENCIALES              */}
          {/* ──────────────────────────────────────────────────────────────────────── */}
          {role === 'applicant' && activeTab === 'status' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Stepper Header Bar */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-bio-navy/10 shadow-sm space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono font-black uppercase text-bio-greenDark tracking-wider block">
                      RUTA DE ADMISIÓN • COHORTE 2026-II
                    </span>
                    <h3 className="text-lg font-extrabold text-bio-navy">
                      Paso a Paso para Ingresar al Bootcamp
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-bio-green/15 text-bio-greenDark text-xs font-mono font-black border border-bio-green/30">
                    Convocatoria Abierta: Setiembre – Noviembre 2026
                  </span>
                </div>

                {/* 4 Steps Graphic with Interactive Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
                  
                  {/* Step 1: Cuestionario de Alineamiento */}
                  <button
                    type="button"
                    onClick={() => setApplicantStep(1)}
                    className={`p-3.5 rounded-2xl text-left space-y-1 transition-all cursor-pointer border ${
                      applicantStep === 1 
                        ? 'bg-bio-green/15 border-2 border-bio-green shadow-sm ring-2 ring-bio-green/20' 
                        : isDiagnosticCompleted 
                          ? 'bg-emerald-50 border-emerald-200' 
                          : 'bg-white border-bio-navy/10 hover:border-bio-green/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-black text-bio-greenDark">01</span>
                      {isDiagnosticCompleted ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Lightbulb className="w-4 h-4 text-bio-green" />}
                    </div>
                    <h5 className="text-xs font-extrabold text-bio-navy">1. Desafíos & Idea</h5>
                    <p className="text-[11px] text-bio-textMuted">Alineamiento de propuesta.</p>
                  </button>

                  {/* Step 2: Ficha de Postulación */}
                  <button
                    type="button"
                    onClick={() => setApplicantStep(2)}
                    className={`p-3.5 rounded-2xl text-left space-y-1 transition-all cursor-pointer border ${
                      applicantStep === 2 
                        ? 'bg-bio-green/15 border-2 border-bio-green shadow-sm ring-2 ring-bio-green/20' 
                        : isApplicationSubmitted 
                          ? 'bg-emerald-50 border-emerald-200' 
                          : 'bg-white border-bio-navy/10 hover:border-bio-green/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-black text-bio-greenDark">02</span>
                      {isApplicationSubmitted ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <FileText className="w-4 h-4 text-bio-green" />}
                    </div>
                    <h5 className="text-xs font-extrabold text-bio-navy">2. Ficha de Postulación</h5>
                    <p className="text-[11px] text-bio-textMuted">Formulario oficial.</p>
                  </button>

                  {/* Step 3: Comité Científico (Locked status) */}
                  <button
                    type="button"
                    onClick={() => setApplicantStep(3)}
                    className={`p-3.5 rounded-2xl text-left space-y-1 transition-all cursor-pointer border ${
                      applicantStep === 3 
                        ? 'bg-bio-navy text-white border-2 border-bio-navy shadow-sm' 
                        : 'bg-bio-paper/60 border-bio-navy/10 hover:border-bio-navy/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-mono font-black ${applicantStep === 3 ? 'text-bio-neon' : 'text-bio-navy/50'}`}>03</span>
                      <Lock className={`w-4 h-4 ${applicantStep === 3 ? 'text-bio-neon' : 'text-gray-400'}`} />
                    </div>
                    <h5 className={`text-xs font-extrabold ${applicantStep === 3 ? 'text-white' : 'text-bio-navy'}`}>3. Comité Científico</h5>
                    <p className={`text-[11px] ${applicantStep === 3 ? 'text-gray-300' : 'text-bio-textMuted'}`}>En evaluación técnica.</p>
                  </button>

                  {/* Step 4: Selección Oficial (Locked until Sept 15) */}
                  <button
                    type="button"
                    onClick={() => setApplicantStep(4)}
                    className={`p-3.5 rounded-2xl text-left space-y-1 transition-all cursor-pointer border ${
                      applicantStep === 4 
                        ? 'bg-bio-navy text-white border-2 border-bio-navy shadow-sm' 
                        : 'bg-bio-paper/60 border-bio-navy/10 hover:border-bio-navy/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-mono font-black ${applicantStep === 4 ? 'text-bio-neon' : 'text-bio-navy/50'}`}>04</span>
                      <Award className={`w-4 h-4 ${applicantStep === 4 ? 'text-bio-neon' : 'text-gray-400'}`} />
                    </div>
                    <h5 className={`text-xs font-extrabold ${applicantStep === 4 ? 'text-white' : 'text-bio-navy'}`}>4. Selección Oficial</h5>
                    <p className={`text-[11px] ${applicantStep === 4 ? 'text-gray-300' : 'text-bio-textMuted'}`}>Desbloqueo tras 15-Sep.</p>
                  </button>

                </div>
              </div>

              {/* ──────────────────────────────────────────────────────────── */}
              {/* STEP 1 DETAIL: CUESTIONARIO DE 10 DESAFÍOS & FICHA GUÍA     */}
              {/* ──────────────────────────────────────────────────────────── */}
              {applicantStep === 1 && (
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-bio-navy/10 shadow-sm space-y-6 animate-fadeIn">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-bio-navy/10">
                    <div className="flex items-center space-x-2.5 text-bio-greenDark">
                      <Lightbulb className="w-5 h-5 text-bio-green" />
                      <h4 className="text-base font-extrabold text-bio-navy">
                        Paso 1: Clarificación de Idea & 10 Desafíos Amazónicos
                      </h4>
                    </div>

                    {isDiagnosticCompleted && (
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-black border bg-emerald-50 text-emerald-700 border-emerald-300">
                        ✓ Ficha Guía Generada
                      </span>
                    )}
                  </div>

                  {!quizActive && !isDiagnosticCompleted ? (
                    /* Initial Pitch to start questionnaire */
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-bio-textMuted leading-relaxed">
                        Este diagnóstico interactivo te ayudará a <strong>clarificar en qué desafío amazónico postular</strong>, analizar la necesidad crítica que resuelves, estructurar tu impacto y generar tu <strong>Ficha Guía de Postulación</strong> con consejos clave antes de llenar el formulario oficial.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div className="p-4 rounded-2xl bg-bio-cream border border-bio-navy/10 space-y-1">
                          <span className="font-mono font-black text-bio-greenDark text-[10px] block">PILARES BHV</span>
                          <strong className="text-bio-navy block">10 Desafíos Amazónicos</strong>
                          <span className="text-[11px] text-bio-textMuted">O línea de innovación abierta.</span>
                        </div>

                        <div className="p-4 rounded-2xl bg-bio-cream border border-bio-navy/10 space-y-1">
                          <span className="font-mono font-black text-bio-greenDark text-[10px] block">NECESIDAD & IMPACTO</span>
                          <strong className="text-bio-navy block">Problema Real & Propuesta</strong>
                          <span className="text-[11px] text-bio-textMuted">Sostenibilidad y valorización.</span>
                        </div>

                        <div className="p-4 rounded-2xl bg-bio-cream border border-bio-navy/10 space-y-1">
                          <span className="font-mono font-black text-bio-greenDark text-[10px] block">MADUREZ DUAL</span>
                          <strong className="text-bio-navy block">Nivel TRL / CRL</strong>
                          <span className="text-[11px] text-bio-textMuted">Tecnología y validación comercial.</span>
                        </div>
                      </div>

                      <div className="pt-3">
                        <button
                          type="button"
                          onClick={() => setQuizActive(true)}
                          className="px-8 py-3.5 rounded-2xl bg-bio-green hover:bg-bio-greenDark text-white font-extrabold text-xs sm:text-sm flex items-center space-x-2 transition-all shadow-md cursor-pointer"
                        >
                          <Sparkles className="w-4 h-4 text-bio-neon" />
                          <span>Iniciar Cuestionario de Alineamiento (4 Preguntas)</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : quizActive ? (
                    /* Interactive 4-step flexible questionnaire */
                    <div className="space-y-6 animate-fadeIn">
                      
                      {/* Step Indicator */}
                      <div className="flex items-center justify-between text-xs pb-2 border-b border-bio-navy/10">
                        <span className="font-mono font-black uppercase text-bio-green tracking-wider">
                          Pregunta {quizStep} de 4
                        </span>
                        <span className="text-bio-textMuted font-bold">
                          {quizStep === 1 && 'Selección del Desafío Amazónico'}
                          {quizStep === 2 && 'Necesidad o Problema de Mercado'}
                          {quizStep === 3 && 'Impacto Regenerativo & Propuesta'}
                          {quizStep === 4 && 'Madurez Combinada (TRL / CRL)'}
                        </span>
                      </div>

                      {/* ── PREGUNTA 1: LOS 10 DESAFÍOS + OTRO ── */}
                      {quizStep === 1 && (
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <h4 className="text-sm sm:text-base font-extrabold text-bio-navy">
                              1. ¿A cuál de nuestros 10 Desafíos Amazónicos responde tu tecnología?
                            </h4>
                            <p className="text-xs text-bio-textMuted">
                              Selecciona uno de los 10 desafíos oficiales o elige la opción abierta si tu proyecto aborda otra línea biotecnológica.
                            </p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[360px] overflow-y-auto pr-1">
                            {AMAZON_CHALLENGES.map((ch) => {
                              const isSelected = diagnosticData.challengeId === ch.id;
                              return (
                                <div
                                  key={ch.id}
                                  onClick={() => setDiagnosticData({ ...diagnosticData, challengeId: ch.id })}
                                  className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex items-start space-x-3 text-xs ${
                                    isSelected 
                                      ? 'border-bio-green bg-bio-green/10 shadow-xs' 
                                      : 'border-bio-navy/10 bg-bio-cream/40 hover:border-bio-navy/30'
                                  }`}
                                >
                                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                    isSelected ? 'border-bio-green bg-bio-green text-white' : 'border-bio-navy/30'
                                  }`}>
                                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                  </div>
                                  <div className="space-y-0.5 min-w-0">
                                    <div className="flex items-center space-x-1.5">
                                      <span className="font-extrabold text-bio-navy block truncate">{ch.number} {ch.name}</span>
                                    </div>
                                    <p className="text-[11px] text-bio-textMuted leading-snug">{ch.desc}</p>
                                    <span className="text-[10px] text-bio-greenDark font-mono font-bold block pt-0.5">Mercado: {ch.market}</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Campo de texto libre si elige 'other' */}
                          {diagnosticData.challengeId === 'other' && (
                            <div className="p-4 rounded-2xl bg-bio-neon/10 border border-bio-neon/40 space-y-1.5 animate-fadeIn">
                              <label className="block text-xs font-extrabold text-bio-navy">
                                Describe tu Desafío o Línea Biotecnológica:
                              </label>
                              <input
                                type="text"
                                value={diagnosticData.customChallengeName}
                                onChange={(e) => setDiagnosticData({ ...diagnosticData, customChallengeName: e.target.value })}
                                placeholder="Ej. Biorremediación de metales pesados en cuencas hídricas amazónicas"
                                className="w-full px-3.5 py-2 rounded-xl border border-bio-navy/20 focus:outline-none focus:border-bio-green bg-white font-bold text-bio-navy text-xs"
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {/* ── PREGUNTA 2: NECESIDAD / PROBLEMA CRÍTICO DE MERCADO ── */}
                      {quizStep === 2 && (
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <h4 className="text-sm sm:text-base font-extrabold text-bio-navy">
                              2. ¿Qué necesidad crítica o problema de mercado busca resolver tu solución?
                            </h4>
                            <p className="text-xs text-bio-textMuted">
                              Identifica la falla o dolor real en la cadena de valor que tu tecnología atiende.
                            </p>
                          </div>

                          <div className="space-y-2.5">
                            {[
                              'Productividad & Suelos: Degradación de tierras agrícolas, baja fertilidad o plagas que afectan cultivos amazónicos.',
                              'Valor Agregado & Desperdicio: Falta de procesamiento local y pérdida de valor en biomasa, frutas o recursos nativos.',
                              'Salud, Diagnóstico & Nutrición: Carencia de fármacos accesibles, desnutrición o enfermedades tropicales desatendidas.',
                              'Trazabilidad & Transparencia: Falta de verificación de deforestación, incumplimiento de Nagoya o baja integridad en créditos verdes.'
                            ].map((opt, idx) => {
                              const isSelected = diagnosticData.marketNeed === opt && !diagnosticData.customNeed;
                              return (
                                <div
                                  key={idx}
                                  onClick={() => setDiagnosticData({ ...diagnosticData, marketNeed: opt, customNeed: '' })}
                                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center space-x-3 text-xs sm:text-sm ${
                                    isSelected 
                                      ? 'border-bio-green bg-bio-green/10 font-extrabold text-bio-navy' 
                                      : 'border-bio-navy/10 bg-bio-cream/40 hover:border-bio-navy/30 text-bio-navy font-semibold'
                                  }`}
                                >
                                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                    isSelected ? 'border-bio-green bg-bio-green text-white' : 'border-bio-navy/30'
                                  }`}>
                                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                  </div>
                                  <span>{opt}</span>
                                </div>
                              );
                            })}
                          </div>

                          {/* Campo abierto opcional para detallar la necesidad */}
                          <div className="space-y-1 pt-1">
                            <label className="block text-xs font-bold text-bio-navy">
                              O describe tu problema o necesidad específica con tus propias palabras (Opcional):
                            </label>
                            <input
                              type="text"
                              value={diagnosticData.customNeed}
                              onChange={(e) => setDiagnosticData({ ...diagnosticData, customNeed: e.target.value })}
                              placeholder="Ej. Pérdida del 40% de cosechas de camu camu por falta de bioconservantes naturales en origen"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-bio-navy/15 focus:outline-none focus:border-bio-green bg-white font-medium text-bio-navy text-xs"
                            />
                          </div>
                        </div>
                      )}

                      {/* ── PREGUNTA 3: IMPACTO REGENERATIVO & PROPUESTA DE VALOR ── */}
                      {quizStep === 3 && (
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <h4 className="text-sm sm:text-base font-extrabold text-bio-navy">
                              3. ¿Cuál es el impacto regenerativo y propuesta de valor principal de tu proyecto?
                            </h4>
                            <p className="text-xs text-bio-textMuted">
                              El consorcio BHV prioriza tecnologías de triple impacto positivo para la Amazonía.
                            </p>
                          </div>

                          <div className="space-y-2.5">
                            {[
                              'Regeneración & Conservación: Preservar ecosistemas forestales y recuperar suelos sin agroquímicos nocivos.',
                              'Bienestar & Salud Bioactiva: Soluciones terapéuticas o alimentos funcionales con alta evidencia científica.',
                              'Descarbonización & Circularidad: Sustituir plásticos e insumos fósiles por biomateriales compostables.',
                              'Biocomercio Justo & Comunidades: Generar empleos formales y distribución transparente de beneficios locales.'
                            ].map((opt, idx) => {
                              const isSelected = diagnosticData.impactGoal === opt && !diagnosticData.customImpact;
                              return (
                                <div
                                  key={idx}
                                  onClick={() => setDiagnosticData({ ...diagnosticData, impactGoal: opt, customImpact: '' })}
                                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center space-x-3 text-xs sm:text-sm ${
                                    isSelected 
                                      ? 'border-bio-green bg-bio-green/10 font-extrabold text-bio-navy' 
                                      : 'border-bio-navy/10 bg-bio-cream/40 hover:border-bio-navy/30 text-bio-navy font-semibold'
                                  }`}
                                >
                                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                    isSelected ? 'border-bio-green bg-bio-green text-white' : 'border-bio-navy/30'
                                  }`}>
                                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                  </div>
                                  <span>{opt}</span>
                                </div>
                              );
                            })}
                          </div>

                          {/* Campo abierto opcional para impacto */}
                          <div className="space-y-1 pt-1">
                            <label className="block text-xs font-bold text-bio-navy">
                              O describe tu propuesta de impacto personalizada (Opcional):
                            </label>
                            <input
                              type="text"
                              value={diagnosticData.customImpact}
                              onChange={(e) => setDiagnosticData({ ...diagnosticData, customImpact: e.target.value })}
                              placeholder="Ej. Reducción de 50 toneladas de agroquímicos y pago justo a 120 familias recolectoras en Loreto"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-bio-navy/15 focus:outline-none focus:border-bio-green bg-white font-medium text-bio-navy text-xs"
                            />
                          </div>
                        </div>
                      )}

                      {/* ── PREGUNTA 4: MADUREZ DUAL (TRL / CRL) ── */}
                      {quizStep === 4 && (
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <h4 className="text-sm sm:text-base font-extrabold text-bio-navy">
                              4. ¿Cuál es el nivel de madurez combinado (TRL Tecnológico / CRL Comercial)?
                            </h4>
                            <p className="text-xs text-bio-textMuted">
                              Indica tu estado de avance técnico y de mercado para planificar el acompañamiento de laboratorios y mentores.
                            </p>
                          </div>

                          <div className="space-y-2.5">
                            {[
                              'Fase 1 (TRL 1-2 / CRL 1-2): Concepto Científico & Descubrimiento Inicial (Hipótesis fundamentada y entrevistas preliminares).',
                              'Fase 2 (TRL 3-4 / CRL 3-4): Prueba de Concepto & Validación de Propuesta (Ensayos in vitro con modelo de negocio preliminar).',
                              'Fase 3 (TRL 5-6 / CRL 5-6): Prototipo en Entorno Relevante & Pilotos en Negociación (Pruebas de campo con cartas de intención LOIs).',
                              'Fase 4 (TRL 7+ / CRL 7+): Tecnología Operacional & Tracción Comercial (Solución en escala real con primeras ventas o clientes activos).'
                            ].map((opt, idx) => {
                              const isSelected = diagnosticData.maturityLevel === opt;
                              return (
                                <div
                                  key={idx}
                                  onClick={() => setDiagnosticData({ ...diagnosticData, maturityLevel: opt })}
                                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center space-x-3 text-xs sm:text-sm ${
                                    isSelected 
                                      ? 'border-bio-green bg-bio-green/10 font-extrabold text-bio-navy' 
                                      : 'border-bio-navy/10 bg-bio-cream/40 hover:border-bio-navy/30 text-bio-navy font-semibold'
                                  }`}
                                >
                                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                    isSelected ? 'border-bio-green bg-bio-green text-white' : 'border-bio-navy/30'
                                  }`}>
                                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                  </div>
                                  <span>{opt}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Controls */}
                      <div className="flex items-center justify-between pt-4 border-t border-bio-navy/10">
                        <button
                          type="button"
                          onClick={() => {
                            if (quizStep > 1) {
                              setQuizStep(quizStep - 1);
                            } else {
                              setQuizActive(false);
                            }
                          }}
                          className="px-4 py-2 rounded-xl text-xs font-bold text-bio-navy hover:bg-bio-cream transition-colors flex items-center space-x-1 cursor-pointer"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          <span>Anterior</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (quizStep < 4) {
                              setQuizStep(quizStep + 1);
                            } else {
                              setIsDiagnosticCompleted(true);
                              setQuizActive(false);
                            }
                          }}
                          className="px-6 py-2.5 rounded-xl bg-bio-green hover:bg-bio-greenDark text-white text-xs font-extrabold transition-all shadow-sm cursor-pointer flex items-center space-x-1.5"
                        >
                          <span>{quizStep === 4 ? 'Generar Ficha Guía de Postulación →' : 'Siguiente Paso →'}</span>
                        </button>
                      </div>

                    </div>
                  ) : (
                    /* ── RESULTADO: FICHA GUÍA DE POSTULACIÓN CON PUNTOS CLAVE Y CONSEJOS ── */
                    <div className="space-y-6 animate-fadeIn">
                      
                      {/* Summary Banner */}
                      <div className="p-6 rounded-3xl bg-gradient-to-br from-bio-navy via-bio-navyDeep to-bio-navyDark text-white border-2 border-bio-green shadow-xl space-y-4">
                        
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-3">
                          <div className="flex items-center space-x-2">
                            <Sparkles className="w-5 h-5 text-bio-neon" />
                            <span className="text-xs font-mono font-black uppercase text-bio-neon tracking-wider">
                              FICHA GUÍA DE POSTULACIÓN GENERADA
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={handleCopyGuide}
                            className="px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold flex items-center space-x-1.5 cursor-pointer transition-colors border border-white/20"
                          >
                            {copiedGuide ? <Check className="w-3.5 h-3.5 text-bio-neon" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedGuide ? '¡Guía Copiada!' : 'Copiar Atributos para Google Form'}</span>
                          </button>
                        </div>

                        {/* Structured Attributes */}
                        <div className="space-y-3 text-xs">
                          
                          <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-1">
                            <span className="text-[10px] font-mono uppercase text-bio-neon font-black block">
                              🎯 Desafío Oficial Asignado:
                            </span>
                            <p className="text-sm sm:text-base font-extrabold text-white">
                              Desafío {currentChallenge.number}: {currentChallenge.name}
                            </p>
                            <span className="text-xs text-emerald-300 font-mono font-bold block">
                              Estimación de Mercado: {currentChallenge.market}
                            </span>
                          </div>

                          <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-2">
                            <span className="text-[10px] font-mono uppercase text-bio-neon font-black block">
                              💡 Puntos Clave para tu Postulación (Redacción para Google Forms):
                            </span>
                            
                            <div className="space-y-1.5 text-gray-200">
                              <p>
                                <strong className="text-white">● Problema / Necesidad: </strong>
                                {diagnosticData.customNeed || diagnosticData.marketNeed}
                              </p>
                              <p>
                                <strong className="text-white">● Propuesta & Impacto: </strong>
                                {diagnosticData.customImpact || diagnosticData.impactGoal}
                              </p>
                              <p>
                                <strong className="text-white">● Madurez de Entrada: </strong>
                                <span className="text-emerald-300">{diagnosticData.customMaturity || diagnosticData.maturityLevel}</span>
                              </p>
                            </div>
                          </div>

                        </div>

                      </div>

                      {/* Strategic Tips for Google Form */}
                      <div className="p-5 rounded-3xl bg-amber-50/80 border border-amber-200 text-amber-950 text-xs space-y-3">
                        <div className="flex items-center space-x-2 font-extrabold text-sm text-amber-900">
                          <Lightbulb className="w-4 h-4 text-amber-600" />
                          <span>Consejos del Comité Evaluador para llenar tu Formulario de Google:</span>
                        </div>

                        <ul className="space-y-2 text-amber-900 leading-relaxed font-medium">
                          <li className="flex items-start space-x-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 flex-shrink-0" />
                            <span><strong>Claridad en el Problema:</strong> Utiliza el texto de tu necesidad identificada para explicar la urgencia y el mercado potencial en la Amazonía.</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 flex-shrink-0" />
                            <span><strong>Rigor Científico:</strong> Menciona el estado de tu prueba de concepto o los ensayos experimentales que validarás con el apoyo de IGBM.</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 flex-shrink-0" />
                            <span><strong>Dedicación del Equipo:</strong> Resalta las capacidades técnicas y comerciales de tus fundadores para aprovechar las 8 semanas del Bootcamp.</span>
                          </li>
                        </ul>
                      </div>

                      {/* Final Step 1 Primary Action */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setQuizActive(true);
                            setQuizStep(1);
                          }}
                          className="text-xs font-bold text-bio-navy hover:underline cursor-pointer"
                        >
                          Volver a editar mis respuestas
                        </button>

                        <button
                          type="button"
                          onClick={() => setApplicantStep(2)}
                          className="px-8 py-3.5 rounded-2xl bg-bio-green hover:bg-bio-greenDark text-white text-xs sm:text-sm font-extrabold transition-all shadow-md cursor-pointer flex items-center space-x-2"
                        >
                          <span>✅ Guardar Guía y Abrir Formulario Oficial de Postulación (Paso 2) →</span>
                          <ArrowRight className="w-4 h-4 text-bio-neon" />
                        </button>
                      </div>

                    </div>
                  )}

                </div>
              )}

              {/* ──────────────────────────────────────────────────────────── */}
              {/* STEP 2 DETAIL: FICHA OFICIAL DE POSTULACIÓN (GOOGLE FORM)    */}
              {/* ──────────────────────────────────────────────────────────── */}
              {applicantStep === 2 && (
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-bio-navy/10 shadow-sm space-y-5 animate-fadeIn">
                  <div className="flex items-center space-x-2.5 text-bio-navy">
                    <FileText className="w-5 h-5 text-bio-green" />
                    <h4 className="text-base font-extrabold text-bio-navy">
                      Paso 2: Ficha Oficial de Postulación (Google Form)
                    </h4>
                  </div>

                  <p className="text-xs sm:text-sm text-bio-textMuted leading-relaxed">
                    Completa la información formal de tu startup en el formulario oficial de postulación de Biohub Venture. Ya cuentas con tu <strong>Ficha Guía estructurada</strong> para responder con claridad sobre tu desafío, impacto y tecnología.
                  </p>

                  <div className="p-5 rounded-2xl bg-bio-cream border border-bio-navy/10 space-y-3">
                    <div className="flex items-center space-x-2 text-xs font-bold text-bio-navy">
                      <Sparkles className="w-4 h-4 text-bio-green" />
                      <span>Requisitos clave de la postulación:</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-bio-navy font-medium">
                      <li className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-bio-green" />
                        <span>Enfoque en bioeconomía, salud, agricultura o recursos amazónicos.</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-bio-green" />
                        <span>Equipo de al menos 2 co-fundadores con dedicación al programa.</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-bio-green" />
                        <span>Nivel de madurez tecnológica mínimo TRL 3 (Prueba de concepto).</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-bio-navy/10">
                    <a
                      href="https://forms.gle/qeFm8qn5KRTwjGRj7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-xl bg-bio-green hover:bg-bio-greenDark text-white text-xs font-extrabold transition-colors shadow-md cursor-pointer flex items-center space-x-2"
                    >
                      <span>Abrir Formulario Oficial de Postulación</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setIsApplicationSubmitted(true);
                        setApplicantStep(3);
                      }}
                      className="px-5 py-3 rounded-xl bg-bio-navy hover:bg-bio-navyDark text-white text-xs font-extrabold transition-colors cursor-pointer flex items-center space-x-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-bio-neon" />
                      <span>Marcar Postulación como Enviada →</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ──────────────────────────────────────────────────────────── */}
              {/* STEP 3 DETAIL: COMITÉ CIENTÍFICO (BLOQUEADO EN EVALUACIÓN)  */}
              {/* ──────────────────────────────────────────────────────────── */}
              {applicantStep === 3 && (
                <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-amber-300 shadow-md space-y-5 animate-fadeIn">
                  
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center space-x-2 text-amber-800">
                      <Lock className="w-5 h-5 text-amber-600" />
                      <h4 className="text-base font-extrabold">
                        Paso 3: Evaluación por el Comité Científico
                      </h4>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-mono font-bold flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-amber-700 animate-spin" />
                      <span>🔒 SECCIÓN EN EVALUACIÓN</span>
                    </span>
                  </div>

                  {/* Anuncio Destacado de Evaluación */}
                  <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs sm:text-sm space-y-2">
                    <p className="font-extrabold text-sm text-amber-950">
                      ¡Tu postulación ha sido registrada con éxito!
                    </p>
                    <p className="leading-relaxed">
                      Esta etapa se encuentra temporalmente <strong>bloqueada</strong> mientras el <strong>Comité Científico y de Inversión del Consorcio (IGBM, BioGenia y Scale Incubadora)</strong> evalúa la viabilidad técnica, el impacto en la bioeconomía amazónica y el grado de innovación de tu proyecto.
                    </p>
                    <p className="text-[11px] text-amber-800 font-medium pt-1">
                      Los evaluadores revisarán los antecedentes hasta el <strong>15 de septiembre de 2026</strong>.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
                    <div className="p-3.5 rounded-2xl bg-bio-cream border border-bio-navy/10 space-y-1">
                      <span className="font-mono font-bold text-bio-greenDark text-[10px] block">EVALUADOR 1</span>
                      <strong className="text-bio-navy block">Comité Científico IGBM</strong>
                      <span className="text-[11px] text-bio-textMuted">Rigor genético y biotecnológico.</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-bio-cream border border-bio-navy/10 space-y-1">
                      <span className="font-mono font-bold text-bio-greenDark text-[10px] block">EVALUADOR 2</span>
                      <strong className="text-bio-navy block">BioGenia Venture Studio</strong>
                      <span className="text-[11px] text-bio-textMuted">Potencial de escalamiento y TRL.</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-bio-cream border border-bio-navy/10 space-y-1">
                      <span className="font-mono font-bold text-bio-greenDark text-[10px] block">EVALUADOR 3</span>
                      <strong className="text-bio-navy block">Incubadora Scale</strong>
                      <span className="text-[11px] text-bio-textMuted">Encaje de mercado y equipo founder.</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-bio-navy/10 text-xs text-bio-textMuted">
                    <span>¿Tienes consultas sobre tu postulación?</span>
                    <a
                      href="https://wa.me/51925836543?text=Hola%2C%20quisiera%20consultar%20el%20estado%20de%20mi%20postulaci%C3%B3n%20al%20Bootcamp%20BHV%202026-II."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-bio-green hover:underline flex items-center space-x-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Contactar Soporte (+51 925 836 543)</span>
                    </a>
                  </div>

                </div>
              )}

              {/* ──────────────────────────────────────────────────────────── */}
              {/* STEP 4 DETAIL: SELECCIÓN OFICIAL (BLOQUEADO HASTA 15-SEP)   */}
              {/* ──────────────────────────────────────────────────────────── */}
              {applicantStep === 4 && (
                <div className="space-y-5 animate-fadeIn">
                  
                  {!previewAdmittedList ? (
                    /* Locked State Notice */
                    <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-bio-navy shadow-md space-y-5">
                      
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center space-x-2 text-bio-navy">
                          <Lock className="w-5 h-5 text-bio-green" />
                          <h4 className="text-base font-extrabold">
                            Paso 4: Selección Oficial & Lista de Admitidos
                          </h4>
                        </div>

                        <span className="px-3 py-1 rounded-full bg-bio-navy text-bio-neon text-xs font-mono font-bold">
                          🔒 DESBLOQUEO TRAS EL 15 DE SEPTIEMBRE
                        </span>
                      </div>

                      <div className="p-5 rounded-2xl bg-bio-paper/60 border border-bio-navy/15 text-bio-navy text-xs sm:text-sm space-y-2">
                        <p className="font-extrabold text-bio-navy text-sm">
                          Publicación oficial programada para el 15 de Septiembre de 2026
                        </p>
                        <p className="text-bio-textMuted leading-relaxed">
                          La lista definitiva de las <strong>15 startups admitidas</strong> para la Cohorte 2026-II será publicada en esta sección una vez culminada la deliberación del comité evaluador.
                        </p>
                      </div>

                      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-bio-navy/10">
                        <span className="text-xs text-bio-textMuted font-medium">
                          Cupos limitados: 15 startups deep-tech y bioeconomía.
                        </span>

                        {/* Toggle to simulate the unlocked view */}
                        <button
                          type="button"
                          onClick={() => setPreviewAdmittedList(true)}
                          className="px-4 py-2 rounded-xl bg-bio-green/10 hover:bg-bio-green text-bio-greenDark hover:text-white border border-bio-green/30 text-xs font-extrabold transition-all cursor-pointer"
                        >
                          <span>Simular Vista Desbloqueada (Post 15-Sep)</span>
                          <Sparkles className="w-3.5 h-3.5 inline ml-1.5" />
                        </button>
                      </div>

                    </div>
                  ) : (
                    /* Unlocked Admitted & Onboarding Card */
                    <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-bio-navy via-bio-navyDeep to-bio-greenDark text-white border-2 border-bio-neon shadow-2xl space-y-6 animate-fadeIn">
                      
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-bio-neon/20 border border-bio-neon/30 text-bio-neon text-xs font-mono font-black uppercase">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>¡ADMITIDO A LA COHORTE 2026-II!</span>
                        </div>

                        <button
                          onClick={() => setPreviewAdmittedList(false)}
                          className="text-xs text-gray-300 hover:text-white underline cursor-pointer"
                        >
                          Volver a vista previa bloqueada
                        </button>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                          Bienvenido a la Cohorte 2026-II: Onboarding Inicial
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                          Tu startup ha sido seleccionada entre las 15 bio-startups que iniciarán el programa de 8 semanas este 22 de Septiembre.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-1">
                          <strong className="text-bio-neon text-xs block">1. Asignación de Mentor Principal</strong>
                          <p className="text-xs text-gray-200">Sesión 1-on-1 de diagnóstico inicial de laboratorio y modelo de negocio.</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-1">
                          <strong className="text-bio-neon text-xs block">2. Firma de Acuerdo y Código Ético</strong>
                          <p className="text-xs text-gray-200">Compromiso de aceleración y protección de recursos biológicos.</p>
                        </div>
                      </div>

                    </div>
                  )}

                </div>
              )}

            </div>
          )}

          {/* ──────────────────────────────────────────────────────────────────────── */}
          {/* VISTA POSTULANTE: CRONOGRAMA & BASES OFICIALES                          */}
          {/* ──────────────────────────────────────────────────────────────────────── */}
          {role === 'applicant' && activeTab === 'bases' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-bio-navy/10 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-bio-navy/10">
                  <div>
                    <span className="text-[10px] font-mono font-black uppercase text-bio-green tracking-wider block">
                      DOCUMENTACIÓN OFICIAL
                    </span>
                    <h3 className="text-base sm:text-lg font-extrabold text-bio-navy">
                      Bases del Programa & Cronograma 2026-II
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  <div className="p-5 rounded-2xl bg-bio-cream/60 border border-bio-navy/10 space-y-3 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className="flex items-center space-x-2 text-bio-navy font-extrabold text-sm">
                        <FileText className="w-4 h-4 text-bio-green" />
                        <h4>Bases Oficiales en PDF</h4>
                      </div>
                      <p className="text-xs text-bio-textMuted leading-relaxed">
                        Revisa los criterios de selección, elegibilidad, propiedad intelectual y financiamiento del Bootcamp.
                      </p>
                    </div>

                    <a
                      href="/Bases_Oficiales_BioHubVenture_2026II.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl bg-bio-green hover:bg-bio-greenDark text-white text-xs font-extrabold transition-colors cursor-pointer shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Descargar Bases Oficiales (PDF)</span>
                    </a>
                  </div>

                  <div className="p-5 rounded-2xl bg-bio-cream/60 border border-bio-navy/10 space-y-3">
                    <div className="flex items-center space-x-2 text-bio-navy font-extrabold text-sm">
                      <Calendar className="w-4 h-4 text-bio-green" />
                      <h4>Fechas Clave de la Convocatoria</h4>
                    </div>
                    <ul className="space-y-2 text-xs text-bio-navy font-medium">
                      <li className="flex items-center justify-between border-b border-bio-navy/5 pb-1">
                        <span>Cierre de Postulaciones:</span>
                        <strong className="text-bio-greenDark">15 de Septiembre 2026</strong>
                      </li>
                      <li className="flex items-center justify-between border-b border-bio-navy/5 pb-1">
                        <span>Notificación de Seleccionados:</span>
                        <strong className="text-bio-greenDark">18 de Septiembre 2026</strong>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Inicio del Bootcamp:</span>
                        <strong className="text-bio-greenDark">22 de Septiembre 2026</strong>
                      </li>
                    </ul>
                  </div>

                </div>

              </div>

            </div>
          )}

        </div>

        {/* ========================================================================= */}
        {/* 3. FOOTER ACTIONS                                                         */}
        {/* ========================================================================= */}
        <div className="p-4 sm:p-5 bg-bio-paper/60 border-t border-bio-navy/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          
          <div className="flex items-center space-x-2 text-bio-textMuted font-medium">
            <ShieldCheck className="w-4 h-4 text-bio-green" />
            <span>Portal Seguro Biohub Venture • Consorcio IGBM, BioGenia & Scale</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-bio-navy hover:bg-bio-navyDark text-white font-extrabold transition-colors cursor-pointer"
          >
            Cerrar Portal
          </button>

        </div>

      </div>
    </div>
  );
}
