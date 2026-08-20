import React, { useState } from 'react';
import { 
  X, Sparkles, CheckCircle2, ChevronRight, ArrowLeft, BarChart3, 
  Lightbulb, Check, Copy, ExternalLink, ArrowRight, Target, ShieldCheck
} from 'lucide-react';

const AMAZON_CHALLENGES = [
  { id: 1, number: '#01', name: 'Beneficio Compartido y Trazabilidad', desc: 'Protocolo de Nagoya, blockchain y reparto justo.', market: 'USD 2.5B' },
  { id: 2, number: '#02', name: 'Bioinsumos y Biofertilizantes', desc: 'Microorganismos nativos para regenerar suelos y sustituir químicos.', market: 'USD 4.8B' },
  { id: 3, number: '#03', name: 'Alimentos del Futuro', desc: 'Superfoods, ingredientes funcionales y proteínas bio.', market: 'USD 6.1B' },
  { id: 4, number: '#04', name: 'Salud Humana & Moléculas Bioactivas', desc: 'Fitofármacos y principios activos de la biodiversidad.', market: 'USD 12.0B' },
  { id: 5, number: '#05', name: 'Biotecnología para la Salud Animal', desc: 'Probióticos y aditivos naturales para acuicultura y ganadería.', market: 'USD 3.2B' },
  { id: 6, number: '#06', name: 'Tecnologías para la Biodiversidad', desc: 'eDNA, bioacústica, sensores e IoT para monitoreo ambiental.', market: 'USD 1.8B' },
  { id: 7, number: '#07', name: 'Bioeconomía Circular', desc: 'Bioplásticos, biochar y empaques de residuos agrícolas.', market: 'USD 5.5B' },
  { id: 8, number: '#08', name: 'Turismo Regenerativo', desc: 'Plataformas de conservación y turismo de ciencia.', market: 'USD 1.2B' },
  { id: 9, number: '#09', name: 'Inteligencia Artificial Aplicada a Biología', desc: 'Modelos predictivos de enzimas y rutas metabólicas.', market: 'USD 8.4B' },
  { id: 10, number: '#10', name: 'Financiamiento e Inversión Verde', desc: 'Tokenización de créditos y bonos de biodiversidad.', market: 'USD 9.0B' },
  { id: 'other', number: '✨', name: 'Otro Desafío / Nueva Línea Biotecnológica', desc: 'Línea innovadora no categorizada en los 10 pilares anteriores.', market: 'Oportunidad Emergente' }
];

export default function SrlAssessmentModal({ isOpen, onClose, onOpenApply }) {
  const [currentStep, setCurrentStep] = useState(0); // 0: Desafíos, 1: Necesidad, 2: Impacto, 3: Madurez TRL/CRL
  const [showResults, setShowResults] = useState(false);
  const [copiedGuide, setCopiedGuide] = useState(false);

  const [diagnosticData, setDiagnosticData] = useState({
    challengeId: 2,
    customChallengeName: '',
    marketNeed: 'Degradación de suelos agrícolas, pérdida de fertilidad y uso excesivo de fertilizantes químicos sintéticos.',
    customNeed: '',
    impactGoal: 'Regeneración y recuperación de suelos amazónicos sustituyendo insumos fósiles por consorcios biológicos.',
    customImpact: '',
    maturityLevel: 'Fase 2 (TRL 3-4 / CRL 3-4): Prueba de Concepto en Laboratorio & Validación de Propuesta de Valor.',
    customMaturity: ''
  });

  if (!isOpen) return null;

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

  const currentChallenge = getSelectedChallengeObj();

  const handleCopyGuide = () => {
    const needText = diagnosticData.customNeed || diagnosticData.marketNeed;
    const impactText = diagnosticData.customImpact || diagnosticData.impactGoal;
    const maturityText = diagnosticData.customMaturity || diagnosticData.maturityLevel;

    const guideText = `=== FICHA GUÍA DE POSTULACIÓN - BIOHUB VENTURE 2026-II ===
Desafío Oficial Asignado: Desafío ${currentChallenge.number}: ${currentChallenge.name} (Mercado: ${currentChallenge.market})

PUNTOS CLAVE PARA EL FORMULARIO DE GOOGLE:
1. PROBLEMA / NECESIDAD: ${needText}
2. PROPUESTA DE VALOR & IMPACTO: ${impactText}
3. MADUREZ COMBINADA (TRL/CRL): ${maturityText}

CONSEJOS DEL COMITÉ EVALUADOR:
- Detalla cómo tu tecnología utiliza de forma sostenible recursos de la Amazonía.
- Enfatiza el acompañamiento de laboratorios IGBM para validar tu evidencia experimental.
- Destaca la dedicación de tu equipo founder para las 8 semanas del Bootcamp.`;

    navigator.clipboard.writeText(guideText);
    setCopiedGuide(true);
    setTimeout(() => setCopiedGuide(false), 2000);
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleFinishAndApply = () => {
    onClose();
    // Redirect to official Google form or open apply modal
    window.open('https://forms.gle/qeFm8qn5KRTwjGRj7', '_blank');
    if (onOpenApply) onOpenApply();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-bio-navyDark/85 backdrop-blur-md animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-bio-green/30 overflow-hidden flex flex-col my-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-bio-navy via-bio-navyDeep to-bio-navyDark text-white p-5 sm:p-6 relative flex items-center justify-between border-b border-bio-green/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-bio-green/20 text-bio-neon flex items-center justify-center font-extrabold border border-bio-neon/30">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-white">Diagnóstico & 10 Desafíos Amazónicos</h3>
              <p className="text-xs text-bio-neon font-medium">Alineamiento de propuesta y generación de Ficha Guía de Postulación</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-bio-green transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-5 flex-1 bg-bio-cream/30">
          {!showResults ? (
            <div className="space-y-5">
              
              {/* Progress Indicator */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-bio-navy">
                  <span>Paso {currentStep + 1} de 4: {
                    currentStep === 0 ? '10 Desafíos Amazónicos' :
                    currentStep === 1 ? 'Necesidad o Problema Crítico' :
                    currentStep === 2 ? 'Impacto & Propuesta de Valor' : 'Madurez Dual (TRL / CRL)'
                  }</span>
                  <span className="text-bio-green font-mono">{Math.round(((currentStep + 1) / 4) * 100)}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-bio-green transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / 4) * 100}%` }}
                  />
                </div>
              </div>

              {/* ── PREGUNTA 1: 10 DESAFÍOS AMAZÓNICOS ── */}
              {currentStep === 0 && (
                <div className="space-y-3.5 animate-fadeIn">
                  <div>
                    <span className="text-[10px] font-black uppercase text-bio-green tracking-wider block">
                      PREGUNTA 1 DE 4
                    </span>
                    <h4 className="text-base sm:text-lg font-extrabold text-bio-navy">
                      ¿A cuál de nuestros 10 Desafíos Amazónicos responde tu tecnología?
                    </h4>
                    <p className="text-xs text-bio-textMuted mt-0.5">
                      Selecciona tu pilar temático oficial o elige la opción abierta para especificar tu línea.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-1">
                    {AMAZON_CHALLENGES.map((ch) => {
                      const isSelected = diagnosticData.challengeId === ch.id;
                      return (
                        <div
                          key={ch.id}
                          onClick={() => setDiagnosticData({ ...diagnosticData, challengeId: ch.id })}
                          className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex items-start space-x-2.5 text-xs ${
                            isSelected 
                              ? 'border-bio-green bg-bio-green/10 shadow-xs' 
                              : 'border-bio-navy/10 bg-white hover:border-bio-navy/30'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            isSelected ? 'border-bio-green bg-bio-green text-white' : 'border-bio-navy/30'
                          }`}>
                            {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                          <div className="min-w-0">
                            <strong className="text-bio-navy block truncate">{ch.number} {ch.name}</strong>
                            <p className="text-[11px] text-bio-textMuted leading-tight">{ch.desc}</p>
                            <span className="text-[10px] text-bio-greenDark font-mono font-bold block pt-0.5">Mercado: {ch.market}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {diagnosticData.challengeId === 'other' && (
                    <div className="p-3.5 rounded-2xl bg-bio-neon/10 border border-bio-neon/40 space-y-1 animate-fadeIn">
                      <label className="block text-xs font-extrabold text-bio-navy">
                        Describe tu Desafío o Línea Biotecnológica:
                      </label>
                      <input
                        type="text"
                        value={diagnosticData.customChallengeName}
                        onChange={(e) => setDiagnosticData({ ...diagnosticData, customChallengeName: e.target.value })}
                        placeholder="Ej. Biorremediación de fuentes hídricas amazónicas"
                        className="w-full px-3 py-2 rounded-xl border border-bio-navy/20 focus:outline-none focus:border-bio-green bg-white font-bold text-bio-navy text-xs"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* ── PREGUNTA 2: NECESIDAD / PROBLEMA ── */}
              {currentStep === 1 && (
                <div className="space-y-3.5 animate-fadeIn">
                  <div>
                    <span className="text-[10px] font-black uppercase text-bio-green tracking-wider block">
                      PREGUNTA 2 DE 4
                    </span>
                    <h4 className="text-base sm:text-lg font-extrabold text-bio-navy">
                      ¿Qué necesidad crítica o problema de mercado busca resolver tu solución?
                    </h4>
                    <p className="text-xs text-bio-textMuted mt-0.5">
                      Identifica el dolor principal en el ecosistema o la industria.
                    </p>
                  </div>

                  <div className="space-y-2">
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
                          className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex items-center space-x-3 text-xs ${
                            isSelected 
                              ? 'border-bio-green bg-bio-green/10 font-extrabold text-bio-navy' 
                              : 'border-bio-navy/10 bg-white hover:border-bio-navy/30 text-bio-navy font-semibold'
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

                  <div className="space-y-1 pt-1">
                    <label className="block text-xs font-bold text-bio-navy">
                      O describe tu problema con tus propias palabras (Opcional):
                    </label>
                    <input
                      type="text"
                      value={diagnosticData.customNeed}
                      onChange={(e) => setDiagnosticData({ ...diagnosticData, customNeed: e.target.value })}
                      placeholder="Ej. Pérdida de cosechas de frutos nativos por falta de bioconservantes"
                      className="w-full px-3 py-2 rounded-xl border border-bio-navy/15 focus:outline-none focus:border-bio-green bg-white font-medium text-bio-navy text-xs"
                    />
                  </div>
                </div>
              )}

              {/* ── PREGUNTA 3: IMPACTO REGENERATIVO ── */}
              {currentStep === 2 && (
                <div className="space-y-3.5 animate-fadeIn">
                  <div>
                    <span className="text-[10px] font-black uppercase text-bio-green tracking-wider block">
                      PREGUNTA 3 DE 4
                    </span>
                    <h4 className="text-base sm:text-lg font-extrabold text-bio-navy">
                      ¿Cuál es el impacto regenerativo y propuesta de valor de tu proyecto?
                    </h4>
                    <p className="text-xs text-bio-textMuted mt-0.5">
                      Priorizamos proyectos con triple impacto positivo en la Amazonía.
                    </p>
                  </div>

                  <div className="space-y-2">
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
                          className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex items-center space-x-3 text-xs ${
                            isSelected 
                              ? 'border-bio-green bg-bio-green/10 font-extrabold text-bio-navy' 
                              : 'border-bio-navy/10 bg-white hover:border-bio-navy/30 text-bio-navy font-semibold'
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

                  <div className="space-y-1 pt-1">
                    <label className="block text-xs font-bold text-bio-navy">
                      O describe tu propuesta de impacto personalizada (Opcional):
                    </label>
                    <input
                      type="text"
                      value={diagnosticData.customImpact}
                      onChange={(e) => setDiagnosticData({ ...diagnosticData, customImpact: e.target.value })}
                      placeholder="Ej. Pago justo a 100 familias y reducción de 30 ton de fertilizantes sintéticos"
                      className="w-full px-3 py-2 rounded-xl border border-bio-navy/15 focus:outline-none focus:border-bio-green bg-white font-medium text-bio-navy text-xs"
                    />
                  </div>
                </div>
              )}

              {/* ── PREGUNTA 4: MADUREZ DUAL (TRL / CRL) ── */}
              {currentStep === 3 && (
                <div className="space-y-3.5 animate-fadeIn">
                  <div>
                    <span className="text-[10px] font-black uppercase text-bio-green tracking-wider block">
                      PREGUNTA 4 DE 4
                    </span>
                    <h4 className="text-base sm:text-lg font-extrabold text-bio-navy">
                      ¿Cuál es el nivel de madurez combinado (TRL Tecnológico / CRL Comercial)?
                    </h4>
                    <p className="text-xs text-bio-textMuted mt-0.5">
                      Define tu avance técnico y de mercado para planificar el soporte de laboratorios.
                    </p>
                  </div>

                  <div className="space-y-2">
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
                          className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex items-center space-x-3 text-xs ${
                            isSelected 
                              ? 'border-bio-green bg-bio-green/10 font-extrabold text-bio-navy' 
                              : 'border-bio-navy/10 bg-white hover:border-bio-navy/30 text-bio-navy font-semibold'
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

              {/* Navigation Controls */}
              <div className="pt-3 border-t border-bio-navy/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="px-4 py-2 rounded-xl text-xs font-extrabold text-bio-navy disabled:opacity-30 hover:bg-bio-cream transition-colors flex items-center cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                  <span>Anterior</span>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl bg-bio-green hover:bg-bio-greenDark text-white text-xs font-extrabold transition-all shadow-md flex items-center cursor-pointer"
                >
                  <span>{currentStep === 3 ? 'Generar Ficha Guía de Postulación →' : 'Siguiente Paso →'}</span>
                </button>
              </div>

            </div>
          ) : (
            /* Results Screen: Ficha Guía de Postulación */
            <div className="space-y-5 animate-fadeIn">
              
              {/* Structured Card */}
              <div className="p-5 rounded-3xl bg-gradient-to-br from-bio-navy via-bio-navyDeep to-bio-navyDark text-white border-2 border-bio-green shadow-xl space-y-3.5">
                
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/15 pb-2.5">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-bio-neon" />
                    <span className="text-[11px] font-mono font-black uppercase text-bio-neon tracking-wider">
                      FICHA GUÍA DE POSTULACIÓN GENERADA
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyGuide}
                    className="px-3 py-1 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold flex items-center space-x-1.5 cursor-pointer transition-colors border border-white/20"
                  >
                    {copiedGuide ? <Check className="w-3 h-3 text-bio-neon" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedGuide ? '¡Guía Copiada!' : 'Copiar Atributos para Google Form'}</span>
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-2xl bg-white/10 border border-white/15 space-y-0.5">
                    <span className="text-[10px] font-mono uppercase text-bio-neon font-black block">
                      🎯 Desafío Oficial Asignado:
                    </span>
                    <strong className="text-white text-xs sm:text-sm block">
                      Desafío {currentChallenge.number}: {currentChallenge.name}
                    </strong>
                    <span className="text-[11px] text-emerald-300 font-mono font-bold block">
                      Oportunidad de Mercado: {currentChallenge.market}
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/10 border border-white/15 space-y-1.5 text-gray-200">
                    <span className="text-[10px] font-mono uppercase text-bio-neon font-black block">
                      💡 Puntos Clave para tu Postulación (Google Forms):
                    </span>
                    <p><strong className="text-white">● Problema: </strong>{diagnosticData.customNeed || diagnosticData.marketNeed}</p>
                    <p><strong className="text-white">● Propuesta & Impacto: </strong>{diagnosticData.customImpact || diagnosticData.impactGoal}</p>
                    <p><strong className="text-white">● Madurez TRL/CRL: </strong><span className="text-emerald-300">{diagnosticData.customMaturity || diagnosticData.maturityLevel}</span></p>
                  </div>
                </div>

              </div>

              {/* Tips */}
              <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-950 text-xs space-y-2">
                <div className="flex items-center space-x-1.5 font-extrabold text-amber-900">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>Consejos del Comité Evaluador para llenar tu Formulario:</span>
                </div>
                <ul className="space-y-1 text-amber-900 leading-relaxed font-medium">
                  <li>● <strong>Claridad en el Problema:</strong> Utiliza el texto de tu necesidad para explicar la urgencia en la Amazonía.</li>
                  <li>● <strong>Rigor Científico:</strong> Menciona el estado de tu prototipo y los ensayos que validarás con el apoyo de IGBM.</li>
                  <li>● <strong>Equipo Dedicado:</strong> Resalta las capacidades técnicas y de negocio de tus co-fundadores.</li>
                </ul>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setShowResults(false);
                    setCurrentStep(0);
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-bio-navy/20 text-bio-navy font-bold text-xs hover:bg-bio-cream cursor-pointer"
                >
                  Volver a responder
                </button>

                <button
                  type="button"
                  onClick={handleFinishAndApply}
                  className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-bio-green hover:bg-bio-greenDark text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>✅ Guardar Guía y Abrir Formulario Oficial de Postulación (Paso 2) →</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
