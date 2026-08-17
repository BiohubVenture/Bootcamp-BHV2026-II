import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ChevronRight, ArrowLeft, BarChart3, ShieldCheck, Rocket, Sprout, Dna, Brain, HelpCircle } from 'lucide-react';

export default function SrlAssessmentModal({ isOpen, onClose, onOpenApply }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    trl: '',
    brl: '',
    iprl: '',
    frl: ''
  });
  const [showResults, setShowResults] = useState(false);

  if (!isOpen) return null;

  const questions = [
    {
      id: 'trl',
      dimension: 'Nivel de Madurez Tecnológica (TRL)',
      question: '¿En qué etapa de desarrollo científico o tecnológico se encuentra tu solución biotecnológica?',
      options: [
        { label: 'TRL 1-2: Idea / Principios Científicos Básicos', points: 1, desc: 'Hipótesis formulada en laboratorio o revisión bibliográfica sin ensayos.' },
        { label: 'TRL 3-4: Prueba de Concepto & MVP en Laboratorio', points: 2, desc: 'Ensayos in vitro o prototipo validado experimentalmente a nivel de laboratorio.' },
        { label: 'TRL 5-6: Prototipo Validado en Entorno Relevante', points: 3, desc: 'Pruebas de campo, ensayos con cultivos reales o bioensayos avanzados.' },
        { label: 'TRL 7-8: Sistema Comercial / Piloto en Escala Real', points: 4, desc: 'Solución en operación con clientes o registro oficial ante autoridades.' }
      ]
    },
    {
      id: 'brl',
      dimension: 'Nivel de Madurez de Negocio & Mercado (BRL)',
      question: '¿Cuál es el nivel de validación comercial y encaje de mercado (Product-Market Fit)?',
      options: [
        { label: 'BRL 1: Problema Identificado & Customer Discovery', points: 1, desc: 'Entrevistas iniciales con clientes sin propuesta de precio fija.' },
        { label: 'BRL 2: Modelo de Negocio & Unit Economics Formulado', points: 2, desc: 'Estructura de costos, canales y propuesta de valor validada preliminarmente.' },
        { label: 'BRL 3: Cartas de Intención (LOIs) & Pilotos en Negociación', points: 3, desc: 'Interés confirmado por corporaciones o compradores agrícolas/farma.' },
        { label: 'BRL 4: Ventas Recurrentes & Contratos Comerciales', points: 4, desc: 'Ingresos mensuales en crecimiento y distribución comercial activa.' }
      ]
    },
    {
      id: 'iprl',
      dimension: 'Propiedad Intelectual & Regulación (IPRL / Bio-Reg)',
      question: '¿Cómo protegen su bio-activo y cuál es su estado regulatorio (Protocolo de Nagoya)?',
      options: [
        { label: 'Fase Inicial: Sin estrategia formal de PI', points: 1, desc: 'Conocimiento interno no protegido ni registrado aún.' },
        { label: 'Secreto Industrial & Búsqueda de Antecedentes', points: 2, desc: 'Vigilancia tecnológica y acuerdos de confidencialidad (NDA) vigentes.' },
        { label: 'Patente PCT Solicitada / Licencia en Trámite', points: 3, desc: 'Solicitud de patente presentada o acuerdo de acceso a recursos genéticos (ABS).' },
        { label: 'Patente Concedida / Registro Sanitario Oficial', points: 4, desc: 'Registro regulatorio aprobado (SENASA, DIGESA, FDA, EMA) y patente concedida.' }
      ]
    },
    {
      id: 'frl',
      dimension: 'Madurez Financiera & Financiamiento (FRL)',
      question: '¿Cuál es el historial de financiamiento y capital movilizado hasta la fecha?',
      options: [
        { label: 'Bootstrapping / Recursos Propios de los Founders', points: 1, desc: 'Inversión inicial propia sin capital externo no reembolsable.' },
        { label: 'Grants No Reembolsables (CONCYTEC, ProInnóvate, USAID)', points: 2, desc: 'Fondos de innovación adjudicados de $20K a $100K USD.' },
        { label: 'Ronda Pre-Seed Levantada ($50K - $250K USD)', points: 3, desc: 'Inversionistas ángeles, notas convertibles o aceleradoras previas.' },
        { label: 'Ronda Seed Levantada / Preparando Serie A ($300K+ USD)', points: 4, desc: 'Fondos de Venture Capital institucionales e ingresos recurrentes.' }
      ]
    }
  ];

  const handleSelectOption = (questionId, points) => {
    setAnswers(prev => ({ ...prev, [questionId]: points }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
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

  const calculateSRL = () => {
    const totalScore = (answers.trl || 0) + (answers.brl || 0) + (answers.iprl || 0) + (answers.frl || 0);
    let level = 'SRL 1-3';
    let title = 'Fase de Investigación Científica (Laboratorio)';
    let recommendation = 'Tu startup tiene un alto rigor científico y está en la etapa perfecta para la Cohorte BHV (Acompañamiento IGBM + BioGenia en validación de prototipo y PI).';
    let track = 'Ruta 1: Aceleración 8 Semanas BHV';
    let color = '#5BB8D6';

    if (totalScore >= 7 && totalScore <= 11) {
      level = 'SRL 4-6';
      title = 'Fase de Prototipo & Validación de Mercado (MVP)';
      recommendation = 'Tu solución cuenta con prototipo validado y encaja directamente con nuestros Pilotos Corporativos y preparación de Unit Economics con Incubadora Scale.';
      track = 'Ruta 2: Pilotos Corporativos & Cohorte BHV';
      color = '#2D9B4C';
    } else if (totalScore >= 12) {
      level = 'SRL 7-9';
      title = 'Fase de Escalamiento Comercial & Inversión';
      recommendation = 'Tu empresa cuenta con alta madurez tecnológica y comercial. Te recomendamos postulaciones directas a Demo Day y al Club de Inversionistas VC de BHV.';
      track = 'Ruta 3: Demo Day Directo & Club de Inversionistas VC';
      color = '#6B4DD6';
    }

    return { totalScore, maxScore: 16, level, title, recommendation, track, color };
  };

  const srlResult = calculateSRL();

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bio-navyDark/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-bio-navy/15 overflow-hidden flex flex-col my-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-bio-navy text-white p-6 relative flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-bio-green/20 text-bio-neon flex items-center justify-center font-extrabold border border-bio-neon/30">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">Evaluador de Madurez Startup (SRL)</h3>
              <p className="text-xs text-bio-green font-medium">Basado en el modelo Start-up Readiness Level (AIP Framework)</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-bio-green transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {!showResults ? (
            <div className="space-y-6">
              
              {/* Progress Indicator */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-bio-navy">
                  <span>Paso {currentStep + 1} de {questions.length}: {questions[currentStep].dimension}</span>
                  <span className="text-bio-green">{Math.round(((currentStep + 1) / questions.length) * 100)}% Completado</span>
                </div>
                <div className="w-full h-2 bg-bio-cream rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-bio-green transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Title */}
              <div className="space-y-2">
                <span className="text-xs font-black uppercase text-bio-green tracking-wider">
                  Dimensión {currentStep + 1}
                </span>
                <h4 className="text-xl font-extrabold text-bio-navy">
                  {questions[currentStep].question}
                </h4>
              </div>

              {/* Options List */}
              <div className="space-y-3">
                {questions[currentStep].options.map((opt, idx) => {
                  const isSelected = answers[questions[currentStep].id] === opt.points;
                  return (
                    <div
                      key={idx}
                      onClick={() => handleSelectOption(questions[currentStep].id, opt.points)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex items-start space-x-3 ${
                        isSelected 
                          ? 'border-bio-green bg-bio-green/8 shadow-sm' 
                          : 'border-bio-navy/10 bg-bio-cream/40 hover:border-bio-navy/30'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                        isSelected ? 'border-bio-green bg-bio-green text-white' : 'border-bio-navy/30'
                      }`}>
                        {isSelected && <CheckCircle2 className="w-4 h-4 fill-current" />}
                      </div>
                      <div className="space-y-1">
                        <h5 className="text-sm font-extrabold text-bio-navy">{opt.label}</h5>
                        <p className="text-xs text-bio-textMuted leading-relaxed">{opt.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Navigation Controls */}
              <div className="pt-4 border-t border-bio-navy/10 flex items-center justify-between">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="px-4 py-2 rounded-xl text-xs font-extrabold text-bio-navy disabled:opacity-30 hover:bg-bio-cream transition-colors flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  <span>Anterior</span>
                </button>

                <button
                  onClick={handleNext}
                  disabled={!answers[questions[currentStep].id]}
                  className="px-6 py-3 rounded-xl bg-bio-navy text-white text-xs font-extrabold disabled:opacity-40 hover:bg-bio-green transition-all duration-200 flex items-center shadow-md"
                >
                  <span>{currentStep === questions.length - 1 ? 'Ver Diagnóstico SRL →' : 'Siguiente Paso →'}</span>
                </button>
              </div>

            </div>
          ) : (
            /* Results Screen */
            <div className="space-y-6 text-center sm:text-left">
              <div className="p-6 rounded-3xl bg-bio-cream border-2 border-bio-navy/10 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span 
                      className="px-3.5 py-1 rounded-full text-white font-black text-xs uppercase tracking-wider shadow-sm"
                      style={{ backgroundColor: srlResult.color }}
                    >
                      Diagnóstico: {srlResult.level}
                    </span>
                    <h4 className="text-2xl font-extrabold text-bio-navy mt-2">
                      {srlResult.title}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-black text-bio-navy">{srlResult.totalScore} / 16</span>
                    <p className="text-[10px] font-bold text-bio-textMuted uppercase">Puntuación Total SRL</p>
                  </div>
                </div>

                <p className="text-xs text-bio-textDark leading-relaxed">
                  {srlResult.recommendation}
                </p>

                <div className="p-4 rounded-2xl bg-white border border-bio-navy/10 flex items-center space-x-3">
                  <Sparkles className="w-6 h-6 text-bio-green flex-shrink-0" />
                  <div>
                    <h5 className="text-xs font-extrabold text-bio-navy">Ruta Recomendada en BHV:</h5>
                    <p className="text-xs font-bold text-bio-green">{srlResult.track}</p>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <button
                  onClick={() => {
                    setShowResults(false);
                    setCurrentStep(0);
                    setAnswers({ trl: '', brl: '', iprl: '', frl: '' });
                  }}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl border border-bio-navy/20 text-bio-navy font-extrabold text-xs hover:bg-bio-cream"
                >
                  Reiniciar Evaluación
                </button>

                <button
                  onClick={() => {
                    onClose();
                    if (onOpenApply) onOpenApply();
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-bio-green text-white font-extrabold text-xs uppercase tracking-wider hover:bg-bio-greenDark transition-all duration-200 shadow-lg flex items-center justify-center space-x-2"
                >
                  <span>Postular a BHV con este Diagnóstico</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
