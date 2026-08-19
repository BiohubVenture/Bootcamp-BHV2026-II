import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Building2,
  Lock,
  EyeOff,
  Sparkles,
  Send,
  CheckCircle2,
  ShieldCheck,
  Globe,
  DollarSign,
  MapPin,
  Briefcase,
  Layers,
  HelpCircle,
  FileText,
  Handshake,
  Users
} from 'lucide-react';
import { saveCorporateNeedSubmission } from '../services/dbService';

const CATEGORIES = [
  'Biotecnología Agrícola & Bioinsumos',
  'Alimentos del Futuro & Superfoods',
  'Trazabilidad & Cadenas de Suministro',
  'Biomateriales & Bioempaques',
  'Cosmecéutica & Bioingredientes',
  'Gestión de Residuos & Economía Circular',
  'Captura de Carbono & Biodiversidad',
  'Salud & Biotecnología Médica'
];

const COLLABORATION_TYPES = [
  { id: 'codesarrollo', label: 'Co-Desarrollo de I+D', desc: 'Desarrollar la solución en conjunto con capacidades científicas/startups' },
  { id: 'piloto', label: 'Piloto de Validación en Campo', desc: 'Poner a prueba la tecnología en nuestras instalaciones o cultivos' },
  { id: 'licencia', label: 'Licenciamiento Tecnológico', desc: 'Incorporar patente o propiedad intelectual ya desarrollada' },
  { id: 'transferencia', label: 'Transferencia de Conocimiento', desc: 'Asistencia técnica y escalamiento de procesos' },
  { id: 'venture_client', label: 'Venture Client / Coinversión', desc: 'Evaluar convertirse en cliente ancla o coinversionista' }
];

export default function SubmitCorporateNeedModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    // Anonimato & Contacto
    isAnonymous: false,
    companyName: '',
    sector: 'Agroindustria & Alimentos',
    contactPerson: '',
    email: '',
    whatsapp: '',
    website: '',

    // Detalles del Reto / Necesidad
    title: '',
    category: 'Biotecnología Agrícola & Bioinsumos',
    description: '',
    urgency: '6 - 12 meses',

    // Contexto Técnico & Recursos
    estimatedBudget: 'USD $10K - $50K',
    country: 'Perú',
    region: '',
    existingInfrastructure: '',
    previousAttempts: '',

    // Modelo de Vinculación Buscado
    collaborationTypes: ['codesarrollo', 'piloto'],
    ipExpectations: 'Propiedad compartida o licencia exclusiva de uso'
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const closeRef = useRef(null);

  // Tecla Escape para cerrar
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Focus inicial
  useEffect(() => {
    if (isOpen && closeRef.current) closeRef.current.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCollaborationToggle = (id) => {
    setFormData(prev => {
      const exists = prev.collaborationTypes.includes(id);
      return {
        ...prev,
        collaborationTypes: exists
          ? prev.collaborationTypes.filter(item => item !== id)
          : [...prev.collaborationTypes, id]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveError('');

    const result = await saveCorporateNeedSubmission(formData);
    setSaving(false);

    if (result.success) {
      setSubmitted(true);
      if (onSuccess) onSuccess(result.entry);
    } else {
      setSaveError('Ocurrió un error al registrar el desafío. Por favor intenta de nuevo.');
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setCurrentStep(1);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bio-navyDark/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="corporate-modal-title"
    >
      <div className="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-bio-navy/10 relative my-6 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-bio-navy text-white p-6 sm:p-8 relative">
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Cerrar modal"
            className="absolute top-5 right-5 p-2 text-gray-300 hover:text-white rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-bio-neon/20 text-bio-neon font-mono text-[11px] font-black uppercase tracking-wider border border-bio-neon/30 flex items-center gap-1.5">
              <Handshake className="w-3.5 h-3.5" />
              Bio-Matchmaking Corporativo
            </span>
          </div>

          <h3 id="corporate-modal-title" className="text-2xl sm:text-3xl font-extrabold text-white">
            Publicar Desafío de Innovación Abierta
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 mt-1.5 leading-relaxed max-w-2xl">
            Conecta tus necesidades tecnológicas con la red de startups, investigadores y científicos de Biohub Venture para co-desarrollar soluciones biotecnológicas.
          </p>

          {/* Stepper Progress */}
          {!submitted && (
            <div className="flex items-center space-x-2 mt-6 pt-4 border-t border-white/10 text-xs">
              {[
                { step: 1, label: '1. Perfil & Anonimato' },
                { step: 2, label: '2. El Desafío' },
                { step: 3, label: '3. Contexto Técnico' },
                { step: 4, label: '4. Vinculación Buscada' }
              ].map(s => (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => setCurrentStep(s.step)}
                  className={`flex-1 py-1.5 px-2 rounded-lg font-extrabold text-center transition-all ${
                    currentStep === s.step
                      ? 'bg-bio-neon text-bio-navyDark shadow-md'
                      : currentStep > s.step
                      ? 'bg-bio-green/40 text-white'
                      : 'bg-white/10 text-gray-400 hover:bg-white/15'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 text-bio-textDark bg-bio-cream/30">
          
          {submitted ? (
            <div className="text-center py-10 space-y-5">
              <div className="w-20 h-20 rounded-full bg-bio-green/15 text-bio-green flex items-center justify-center mx-auto border-2 border-bio-green/30 shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <h4 className="text-3xl font-extrabold text-bio-navy">¡Desafío Registrado con Éxito!</h4>

              <p className="text-sm text-bio-textMuted max-w-lg mx-auto leading-relaxed">
                Tu necesidad tecnológica ha sido incorporada a nuestro motor de <strong>Bio-Matchmaking</strong>.
                {formData.isAnonymous ? (
                  <span className="block mt-2 font-bold text-bio-navy bg-bio-green/10 p-3 rounded-xl border border-bio-green/20">
                    🛡️ Publicado en modo CONFIDENCIAL / ANÓNIMO. Tu identidad está protegida y sólo el equipo de Biohub Venture gestionará las vinculaciones iniciales.
                  </span>
                ) : (
                  <span className="block mt-2 font-bold text-bio-navy">
                    Publicado visibilizando tu empresa para conectar con startups y centros de I+D.
                  </span>
                )}
              </p>

              <div className="pt-4 flex justify-center space-x-3">
                <button
                  onClick={handleReset}
                  className="px-8 py-3.5 rounded-xl bg-bio-green text-white font-extrabold text-xs uppercase tracking-wider hover:bg-bio-greenDark transition-colors shadow-md"
                >
                  Volver al Catálogo de Desafíos
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {saveError && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold">
                  {saveError}
                </div>
              )}

              {/* ── PASO 1: PERFIL & ANONIMATO ── */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-fade-in">
                  
                  {/* Option Anónimo Box */}
                  <div className="p-5 rounded-2xl bg-white border-2 border-bio-green/40 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-9 h-9 rounded-xl bg-bio-navy text-bio-neon flex items-center justify-center font-bold">
                          <Lock className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-extrabold text-bio-navy">¿Deseas publicar este reto de forma ANÓNIMA / CONFIDENCIAL?</h4>
                          <p className="text-[11px] text-bio-textMuted">Tus datos de contacto quedan protegidos en BHV y en la web pública solo se verá "Empresa Confidencial".</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="isAnonymous"
                          checked={formData.isAnonymous}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-bio-green"></div>
                      </label>
                    </div>

                    {formData.isAnonymous && (
                      <div className="p-3 rounded-xl bg-bio-cream border border-bio-green/30 text-xs text-bio-navy font-bold flex items-center space-x-2">
                        <EyeOff className="w-4 h-4 text-bio-green flex-shrink-0" />
                        <span>Modo Confidencial Activado: Se mostrará como "Empresa Confidencial • {formData.sector}"</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-bio-navy mb-1">Nombre de la Empresa / Organización *</label>
                      <input
                        type="text"
                        name="companyName"
                        required
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Ej. Grupo AgroIndustrial del Sur"
                        className="w-full px-4 py-2.5 text-xs rounded-xl border border-bio-navy/20 focus:border-bio-green focus:outline-none bg-white font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-bio-navy mb-1">Sector o Industria *</label>
                      <select
                        name="sector"
                        value={formData.sector}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 text-xs rounded-xl border border-bio-navy/20 focus:border-bio-green focus:outline-none bg-white font-semibold"
                      >
                        <option>Agroindustria & Alimentos</option>
                        <option>Farmacéutica & Salud</option>
                        <option>Cosmética & Cuidado Personal</option>
                        <option>Energía & Biocombustibles</option>
                        <option>Bebidas & Superfoods</option>
                        <option>Química & Empaques</option>
                        <option>Forestal & Maderera</option>
                        <option>Otro Sector Industrial</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-bio-navy mb-1">Persona de Contacto / Líder de Innovación *</label>
                      <input
                        type="text"
                        name="contactPerson"
                        required
                        value={formData.contactPerson}
                        onChange={handleChange}
                        placeholder="Ej. Ing. Carlos Mendoza"
                        className="w-full px-4 py-2.5 text-xs rounded-xl border border-bio-navy/20 focus:border-bio-green focus:outline-none bg-white font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-bio-navy mb-1">Correo Electrónico Corporativo *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="carlos@empresa.com"
                        className="w-full px-4 py-2.5 text-xs rounded-xl border border-bio-navy/20 focus:border-bio-green focus:outline-none bg-white font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-bio-navy mb-1">WhatsApp / Teléfono *</label>
                      <input
                        type="text"
                        name="whatsapp"
                        required
                        value={formData.whatsapp}
                        onChange={handleChange}
                        placeholder="+51 987 654 321"
                        className="w-full px-4 py-2.5 text-xs rounded-xl border border-bio-navy/20 focus:border-bio-green focus:outline-none bg-white font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-bio-navy mb-1">Sitio Web Corporativo (Opcional)</label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://www.empresa.com"
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-bio-navy/20 focus:border-bio-green focus:outline-none bg-white font-semibold"
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-6 py-3 rounded-xl bg-bio-navy text-white text-xs font-extrabold uppercase tracking-wider hover:bg-bio-navyDark transition-colors"
                    >
                      Siguiente: Definición del Desafío →
                    </button>
                  </div>

                </div>
              )}

              {/* ── PASO 2: EL DESAFÍO DE INNOVACIÓN ── */}
              {currentStep === 2 && (
                <div className="space-y-5 animate-fade-in">
                  
                  <div>
                    <label className="block text-xs font-extrabold text-bio-navy mb-1">Título del Desafío / Necesidad Tecnológica * (Máx. 100 caracteres)</label>
                    <input
                      type="text"
                      name="title"
                      required
                      maxLength={100}
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Ej. Biofungicida natural para control de plagas en cultivos de cacao de alta humedad"
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-bio-navy/20 focus:border-bio-green focus:outline-none bg-white font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-bio-navy mb-1">Categoría Biotecnológica *</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 text-xs rounded-xl border border-bio-navy/20 focus:border-bio-green focus:outline-none bg-white font-semibold"
                      >
                        {CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-bio-navy mb-1">Horizonte de Tiempo / Urgencia *</label>
                      <select
                        name="urgency"
                        value={formData.urgency}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 text-xs rounded-xl border border-bio-navy/20 focus:border-bio-green focus:outline-none bg-bio-paper/30 font-semibold"
                      >
                        <option>Inmediato (0 - 3 meses)</option>
                        <option>Corto Plazo (3 - 6 meses)</option>
                        <option>Mediano Plazo (6 - 12 meses)</option>
                        <option>Exploración Estratégica (12+ meses)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-bio-navy mb-1">Descripción del Problema u Oportunidad de Innovación *</label>
                    <textarea
                      name="description"
                      required
                      rows={5}
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe claramente la necesidad técnica, los requerimientos de desempeño esperados y el impacto buscado en tus operaciones..."
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-bio-navy/20 focus:border-bio-green focus:outline-none bg-white font-semibold"
                    />
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-5 py-2.5 rounded-xl border border-bio-navy/20 text-bio-navy text-xs font-bold hover:bg-white"
                    >
                      ← Atrás
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-6 py-3 rounded-xl bg-bio-navy text-white text-xs font-extrabold uppercase tracking-wider hover:bg-bio-navyDark transition-colors"
                    >
                      Siguiente: Contexto Técnico →
                    </button>
                  </div>

                </div>
              )}

              {/* ── PASO 3: CONTEXTO TÉCNICO & RECURSOS ── */}
              {currentStep === 3 && (
                <div className="space-y-5 animate-fade-in">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-bio-navy mb-1">Presupuesto / Alcance Estimado *</label>
                      <select
                        name="estimatedBudget"
                        value={formData.estimatedBudget}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 text-xs rounded-xl border border-bio-navy/20 focus:border-bio-green focus:outline-none bg-white font-semibold"
                      >
                        <option>USD $5K - $20K (Piloto Inicial)</option>
                        <option>USD $20K - $50K (Co-Desarrollo I+D)</option>
                        <option>USD $50K - $150K (Escalamiento)</option>
                        <option>USD $150K+ (Alianza Estratégica)</option>
                        <option>A definir según propuesta</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-bio-navy mb-1">País / Región de Aplicación *</label>
                      <input
                        type="text"
                        name="country"
                        required
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="Ej. Perú / Amazonía / LATAM"
                        className="w-full px-4 py-2.5 text-xs rounded-xl border border-bio-navy/20 focus:border-bio-green focus:outline-none bg-white font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-bio-navy mb-1">Infraestructura Físicas o Recursos Disponibles (Opcional)</label>
                    <textarea
                      name="existingInfrastructure"
                      rows={2}
                      value={formData.existingInfrastructure}
                      onChange={handleChange}
                      placeholder="Ej. Laboratorio de biología molecular disponible, 50 hectáreas de cultivo de prueba, planta piloto..."
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-bio-navy/20 focus:border-bio-green focus:outline-none bg-white font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-bio-navy mb-1">Antecedentes o Intentos Previos (Opcional)</label>
                    <textarea
                      name="previousAttempts"
                      rows={2}
                      value={formData.previousAttempts}
                      onChange={handleChange}
                      placeholder="Menciona si han probado otras soluciones antes y qué aspectos no lograron los resultados deseados..."
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-bio-navy/20 focus:border-bio-green focus:outline-none bg-white font-semibold"
                    />
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-5 py-2.5 rounded-xl border border-bio-navy/20 text-bio-navy text-xs font-bold hover:bg-white"
                    >
                      ← Atrás
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(4)}
                      className="px-6 py-3 rounded-xl bg-bio-navy text-white text-xs font-extrabold uppercase tracking-wider hover:bg-bio-navyDark transition-colors"
                    >
                      Siguiente: Modelo de Vinculación →
                    </button>
                  </div>

                </div>
              )}

              {/* ── PASO 4: MODELO DE VINCULACIÓN BUSCADO (MATCHMAKING) ── */}
              {currentStep === 4 && (
                <div className="space-y-5 animate-fade-in">
                  
                  <div>
                    <label className="block text-xs font-extrabold text-bio-navy mb-2">Selecciona los Modelos de Vinculación Interesantes (Puedes elegir varios):</label>
                    <div className="grid grid-cols-1 gap-2.5">
                      {COLLABORATION_TYPES.map(col => {
                        const checked = formData.collaborationTypes.includes(col.id);
                        return (
                          <div
                            key={col.id}
                            onClick={() => handleCollaborationToggle(col.id)}
                            className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-start space-x-3 ${
                              checked
                                ? 'bg-bio-green/10 border-bio-green text-bio-navy'
                                : 'bg-white border-bio-navy/10 hover:border-bio-navy/30'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => {}}
                              className="mt-0.5 rounded text-bio-green focus:ring-bio-green"
                            />
                            <div>
                              <p className="text-xs font-extrabold text-bio-navy">{col.label}</p>
                              <p className="text-[11px] text-bio-textMuted">{col.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-bio-navy mb-1">Expectativa de Propiedad Intelectual / Acuerdos</label>
                    <input
                      type="text"
                      name="ipExpectations"
                      value={formData.ipExpectations}
                      onChange={handleChange}
                      placeholder="Ej. Co-propiedad de patente, acuerdo de secreto, contrato de suministro exclusivo"
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-bio-navy/20 focus:border-bio-green focus:outline-none bg-white font-semibold"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-bio-navy text-white text-xs space-y-1">
                    <p className="font-extrabold text-bio-neon flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" />
                      Garantía de Vinculación Biohub Venture
                    </p>
                    <p className="text-white/80 text-[11px] leading-relaxed">
                      El equipo de BHV evalúa la propuesta tecnológica de las startups antes de presentar las opciones de matchmaking para garantizar rigor científico y viabilidad técnica.
                    </p>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-bio-navy/10">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-5 py-2.5 rounded-xl border border-bio-navy/20 text-bio-navy text-xs font-bold hover:bg-white"
                    >
                      ← Atrás
                    </button>

                    <button
                      type="submit"
                      disabled={saving}
                      className="inline-flex items-center px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-bio-green hover:bg-bio-greenDark shadow-lg transition-all disabled:opacity-60"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      <span>{saving ? 'Registrando...' : 'Publicar Desafío para Bio-Matchmaking'}</span>
                    </button>
                  </div>

                </div>
              )}

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
