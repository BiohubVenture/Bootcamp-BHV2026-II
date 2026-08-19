import React, { useState, useEffect } from 'react';
import { 
  X, CheckCircle2, ShieldAlert, Sparkles, Building2, Globe, 
  MapPin, Leaf, Award, DollarSign, Layers, ChevronRight, ChevronLeft, Send, Check, Edit3
} from 'lucide-react';
import { saveTechnologySubmission } from '../services/dbService';

export default function SubmitTechnologyModal({ isOpen, onClose, userSession, targetStartup, onTechnologyAdded }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    // Contact
    isDirectOwner: true,
    ownerName: targetStartup?.name || userSession?.startupName || '',
    contactPerson: targetStartup?.founders?.[0] || '',
    contactEmail: userSession?.email || '',
    whatsapp: targetStartup?.whatsapp || '',
    website: targetStartup?.website || '',

    // Tech Features
    title: targetStartup?.tagline || '',
    shortSummary: targetStartup?.description || '',
    description: targetStartup?.description || '',
    keywords: targetStartup?.category || '',
    category: targetStartup?.category || 'FoodTech & Bioinsumos',
    techTypes: ['Proceso Biotecnológico', 'Biomaterial'],

    // Countries & Appraisal
    developedIn: targetStartup?.country || 'Perú',
    deployedIn: targetStartup?.country || 'Perú',
    technologyAppraisal: targetStartup?.achievements?.join(', ') || '',

    // Environmental Benefits
    benefits: ['Biodiversidad y ecosistemas', 'Alimentos sostenibles', 'Reducción de GEI'],
    summaryOfBenefits: targetStartup?.metrics || '',

    // TRL / Readiness
    trlLevel: targetStartup?.srlLevel || 'TRL 5 - Validación de componentes en laboratorio',

    // Business & Collaboration
    collaborationTypes: ['I+D conjunto / Transferencia tecnológica', 'Pilotos comerciales / Alianzas'],
    investmentSought: targetStartup?.stage?.toLowerCase().includes('seed') ? 'Yes' : 'No',
    investmentAmount: targetStartup?.stage || 'USD $250,000',

    // IP
    ipStatus: targetStartup?.badge || 'Patente en Trámite / Secreto Industrial'
  });

  // Re-sync if targetStartup changes
  useEffect(() => {
    if (targetStartup) {
      setFormData({
        isDirectOwner: true,
        ownerName: targetStartup.name || '',
        contactPerson: targetStartup.founders?.[0] || '',
        contactEmail: userSession?.email || '',
        whatsapp: targetStartup.whatsapp || '',
        website: targetStartup.website || '',
        title: targetStartup.tagline || '',
        shortSummary: targetStartup.description || '',
        description: targetStartup.description || '',
        keywords: targetStartup.category || '',
        category: targetStartup.category || 'FoodTech & Bioinsumos',
        techTypes: ['Proceso Biotecnológico', 'Biomaterial'],
        developedIn: targetStartup.country || 'Perú',
        deployedIn: targetStartup.country || 'Perú',
        technologyAppraisal: targetStartup.achievements?.join(', ') || '',
        benefits: ['Biodiversidad y ecosistemas', 'Alimentos sostenibles', 'Reducción de GEI'],
        summaryOfBenefits: targetStartup.metrics || '',
        trlLevel: targetStartup.srlLevel || 'TRL 5 - Validación de componentes en laboratorio',
        collaborationTypes: ['I+D conjunto / Transferencia tecnológica', 'Pilotos comerciales / Alianzas'],
        investmentSought: targetStartup.stage?.toLowerCase().includes('seed') ? 'Yes' : 'No',
        investmentAmount: targetStartup.stage || 'USD $250,000',
        ipStatus: targetStartup.badge || 'Patente en Trámite / Secreto Industrial'
      });
    }
  }, [targetStartup, userSession]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleArrayItem = (field, item) => {
    setFormData(prev => {
      const list = prev[field] || [];
      if (list.includes(item)) {
        return { ...prev, [field]: list.filter(i => i !== item) };
      } else {
        return { ...prev, [field]: [...list, item] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const existingId = targetStartup && !targetStartup.isNew ? targetStartup.id : null;
    const result = await saveTechnologySubmission(formData, existingId);
    setIsSaving(false);
    if (result.success) {
      setSubmitted(true);
      if (onTechnologyAdded) {
        onTechnologyAdded(result.entry, result.isUpdate);
      }
    }
  };

  const techTypeOptions = [
    'Biomaterial', 'Diseño Genético / Molecular', 'Proceso Biotecnológico', 
    'Sistema / Software Bio-AI', 'Dispositivo o Equipo', 'Bioinstalación / Planta'
  ];

  const environmentalOptions = [
    'Agua y Cuerpos Hídricos', 'Suelo y Tierra', 'Aire', 'Bosques y Flora', 
    'Alimentos y Nutrición', 'Biodiversidad y Ecosistemas', 'Reducción de Gases GEI', 
    'Energía Limpia', 'Economía Circular'
  ];

  const collaborationOptions = [
    'Licenciamiento de Tecnología', 'Venta / Distribución', 'Prestación de Servicios Bio', 
    'I+D conjunto / Transferencia tecnológica', 'Joint Venture / Coinversión', 'Otros'
  ];

  const trlOptions = [
    'TRL 1-2: Principios básicos observados & concepto formulado',
    'TRL 3-4: Prueba de concepto experimental & validación en laboratorio',
    'TRL 5-6: Tecnología demostrada en entorno relevante (MVP Funcional)',
    'TRL 7: Demostración de prototipo en entorno operativo real',
    'TRL 8: Sistema completo, certificado y calificado para mercado',
    'TRL 9: Sistema comercial operando en mercado (En Escalamiento)'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bio-navyDeep/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 max-h-[92vh] overflow-y-auto space-y-6 shadow-2xl border border-bio-navy/10 relative flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-bio-cream hover:bg-bio-navy/10 text-bio-navy transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-5 my-auto">
            <div className="w-16 h-16 bg-bio-green/20 text-bio-green rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-bio-navy">
                {targetStartup && !targetStartup.isNew ? '¡Ficha de Startup Actualizada!' : '¡Tecnología Registrada Exitosamente!'}
              </h3>
              <p className="text-xs sm:text-sm text-bio-textMuted max-w-lg mx-auto leading-relaxed">
                Los datos de <strong>"{formData.ownerName}"</strong> han sido guardados en la base de datos oficial de <strong>Biohub Venture</strong> y ya están visibles con tus actualizaciones en el portafolio.
              </p>
            </div>
            <button
              onClick={() => { setSubmitted(false); onClose(); }}
              className="px-6 py-2.5 rounded-xl bg-bio-navy text-white font-extrabold text-xs uppercase tracking-wider hover:bg-bio-green transition-colors"
            >
              Ver en el Portafolio
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="space-y-3 pb-4 border-b border-bio-navy/10">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-bio-green/15 text-bio-greenDark text-xs font-black uppercase tracking-wider">
                  <Leaf className="w-3.5 h-3.5 text-bio-green" />
                  <span>Base de Datos Tecnológica BHV • Convocatoria 2026-II</span>
                </div>
                <span className="text-xs font-bold text-bio-textMuted">Paso {currentStep} de 5</span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-bio-navy">
                  {targetStartup && !targetStartup.isNew 
                    ? `Editar Ficha de ${targetStartup.name}` 
                    : 'Registrar Solución Tecnológica'}
                </h2>
                {targetStartup && !targetStartup.isNew && (
                  <p className="text-xs text-bio-greenDark font-bold mt-1 flex items-center space-x-1.5">
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Se han pre-cargado los datos existentes de tu startup. Modifica o completa lo que consideres.</span>
                  </p>
                )}
              </div>

              {/* Notice Banner */}
              <div className="p-3.5 rounded-2xl bg-bio-cream/80 border border-bio-navy/10 text-bio-navy text-xs flex items-start space-x-2.5">
                <ShieldAlert className="w-4 h-4 text-bio-green flex-shrink-0 mt-0.5" />
                <p className="leading-snug text-bio-textMuted">
                  <strong>Aviso de Propiedad Intelectual:</strong> No incluyas información confidencial no protegida. Los datos ingresados se estructuran bajo el estándar de evaluación y madurez tecnológica de Biohub Venture.
                </p>
              </div>
            </div>

            {/* Stepper Progress Bar */}
            <div className="grid grid-cols-5 gap-2 text-center text-[10px] font-bold text-bio-textMuted">
              <div className={`p-1.5 rounded-lg border ${currentStep === 1 ? 'bg-bio-green text-white border-bio-green' : 'bg-bio-cream'}`}>1. Contacto</div>
              <div className={`p-1.5 rounded-lg border ${currentStep === 2 ? 'bg-bio-green text-white border-bio-green' : 'bg-bio-cream'}`}>2. Tecnología</div>
              <div className={`p-1.5 rounded-lg border ${currentStep === 3 ? 'bg-bio-green text-white border-bio-green' : 'bg-bio-cream'}`}>3. Impacto</div>
              <div className={`p-1.5 rounded-lg border ${currentStep === 4 ? 'bg-bio-green text-white border-bio-green' : 'bg-bio-cream'}`}>4. TRL & IP</div>
              <div className={`p-1.5 rounded-lg border ${currentStep === 5 ? 'bg-bio-green text-white border-bio-green' : 'bg-bio-cream'}`}>5. Inversión</div>
            </div>

            {/* Form Body By Step */}
            <div className="flex-1 space-y-4 text-xs">
              
              {/* STEP 1: CONTACT & OWNER INFO */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <h4 className="font-extrabold text-bio-navy text-sm">1. Información del Propietario / Entidad Tecnológica</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-bio-navy mb-1">Nombre de la Startup / Entidad (Owner) *</label>
                      <input
                        type="text"
                        name="ownerName"
                        required
                        value={formData.ownerName}
                        onChange={handleChange}
                        placeholder="Ej. CRYBS, BioSafe Me, ApiRobotics"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-bio-navy/15 focus:border-bio-green focus:outline-none bg-bio-paper/30 font-bold text-bio-navy"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-bio-navy mb-1">Persona de Contacto / Founder *</label>
                      <input
                        type="text"
                        name="contactPerson"
                        required
                        value={formData.contactPerson}
                        onChange={handleChange}
                        placeholder="Nombre y Apellidos"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-bio-navy/15 focus:border-bio-green focus:outline-none bg-bio-paper/30 font-bold text-bio-navy"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold text-bio-navy mb-1">Email de Contacto *</label>
                      <input
                        type="email"
                        name="contactEmail"
                        required
                        value={formData.contactEmail}
                        onChange={handleChange}
                        placeholder="founder@startup.com"
                        className="w-full px-3 py-2 rounded-xl border border-bio-navy/15 focus:border-bio-green focus:outline-none bg-bio-paper/30"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-bio-navy mb-1">WhatsApp de Negocios *</label>
                      <input
                        type="text"
                        name="whatsapp"
                        required
                        value={formData.whatsapp}
                        onChange={handleChange}
                        placeholder="+51 999 999 999"
                        className="w-full px-3 py-2 rounded-xl border border-bio-navy/15 focus:border-bio-green focus:outline-none bg-bio-paper/30 font-bold text-bio-navy"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-bio-navy mb-1">Sitio Web / URL</label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="https://..."
                        className="w-full px-3 py-2 rounded-xl border border-bio-navy/15 focus:border-bio-green focus:outline-none bg-bio-paper/30"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: TECHNOLOGY FEATURES & TYPE */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <h4 className="font-extrabold text-bio-navy text-sm">2. Características & Taxonomía de la Tecnología</h4>
                  
                  <div>
                    <label className="block font-bold text-bio-navy mb-1">Título de la Tecnología / Solución (Máx. 1000 caracteres) *</label>
                    <input
                      type="text"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Ej. Diagnóstico molecular rápido de dengue mediante amplificación isotérmica portátil"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-bio-navy/15 focus:border-bio-green focus:outline-none bg-bio-paper/30 font-bold text-bio-navy"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-bio-navy mb-1">Resumen Corto (Short Summary - Máx. 500 caracteres) *</label>
                    <textarea
                      name="shortSummary"
                      required
                      rows={2}
                      value={formData.shortSummary}
                      onChange={handleChange}
                      placeholder="Resumen ejecutivo de la solución para compradores, inversores y aliados..."
                      className="w-full px-3.5 py-2 rounded-xl border border-bio-navy/15 focus:border-bio-green focus:outline-none bg-bio-paper/30"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-bio-navy mb-1">Descripción Detallada (Description - Máx. 4000 caracteres) *</label>
                    <textarea
                      name="description"
                      required
                      rows={3}
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Detalles sobre el mecanismo biotecnológico, materias primas utilizadas, modo de acción y diferenciación..."
                      className="w-full px-3.5 py-2 rounded-xl border border-bio-navy/15 focus:border-bio-green focus:outline-none bg-bio-paper/30"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-bio-navy mb-1.5">Tipo de Tecnología (Selecciona las que apliquen):</label>
                    <div className="flex flex-wrap gap-2">
                      {techTypeOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => toggleArrayItem('techTypes', opt)}
                          className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                            formData.techTypes.includes(opt)
                              ? 'bg-bio-green text-white border-bio-green shadow-xs'
                              : 'bg-bio-cream border-bio-navy/15 text-bio-navy'
                          }`}
                        >
                          {formData.techTypes.includes(opt) && <Check className="w-3.5 h-3.5" />}
                          <span>{opt}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: ENVIRONMENTAL BENEFITS & COUNTRIES */}
              {currentStep === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <h4 className="font-extrabold text-bio-navy text-sm">3. Beneficios Ambientales & Despliegue Geográfico</h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-bio-navy mb-1">Desarrollado en (País de origen) *</label>
                      <select
                        name="developedIn"
                        value={formData.developedIn}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-bio-navy/15 focus:border-bio-green focus:outline-none bg-bio-paper/30 font-bold text-bio-navy"
                      >
                        <option value="Perú">Perú 🇵🇪</option>
                        <option value="Colombia">Colombia 🇨🇴</option>
                        <option value="Ecuador">Ecuador 🇪🇨</option>
                        <option value="El Salvador">El Salvador 🇸🇻</option>
                        <option value="Venezuela">Venezuela 🇻🇪</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-bio-navy mb-1">Desplegado / Validado en *</label>
                      <select
                        name="deployedIn"
                        value={formData.deployedIn}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-bio-navy/15 focus:border-bio-green focus:outline-none bg-bio-paper/30 font-bold text-bio-navy"
                      >
                        <option value="Perú">Perú 🇵🇪</option>
                        <option value="Colombia">Colombia 🇨🇴</option>
                        <option value="Ecuador">Ecuador 🇪🇨</option>
                        <option value="El Salvador">El Salvador 🇸🇻</option>
                        <option value="Venezuela">Venezuela 🇻🇪</option>
                        <option value="Regional LATAM">Regional LATAM 🌎</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-bio-navy mb-1.5">Principales Beneficios Ambientales:</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {environmentalOptions.map((env) => (
                        <button
                          key={env}
                          type="button"
                          onClick={() => toggleArrayItem('benefits', env)}
                          className={`p-2 rounded-xl border text-xs font-semibold text-left flex items-center justify-between transition-all ${
                            formData.benefits.includes(env)
                              ? 'bg-bio-green/15 border-bio-green text-bio-greenDark font-bold'
                              : 'bg-bio-cream border-bio-navy/10 text-bio-textMuted'
                          }`}
                        >
                          <span>{env}</span>
                          {formData.benefits.includes(env) && <Check className="w-3.5 h-3.5 text-bio-green" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-bio-navy mb-1">Resumen Cuantitativo de Impacto (Máx. 400 caracteres) *</label>
                    <textarea
                      name="summaryOfBenefits"
                      required
                      rows={2}
                      value={formData.summaryOfBenefits}
                      onChange={handleChange}
                      placeholder="Ej. Reducción del 40% de emisiones de GEI, sustitución de 50 toneladas de plástico fósil..."
                      className="w-full px-3.5 py-2 rounded-xl border border-bio-navy/15 focus:border-bio-green focus:outline-none bg-bio-paper/30 font-medium text-bio-navy"
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: TRL & INTELLECTUAL PROPERTY */}
              {currentStep === 4 && (
                <div className="space-y-4 animate-fade-in">
                  <h4 className="font-extrabold text-bio-navy text-sm">4. Nivel de Madurez Tecnológica (TRL) & Propiedad Intelectual</h4>

                  <div>
                    <label className="block font-bold text-bio-navy mb-1.5">Nivel de Madurez Tecnológica (TRL) *</label>
                    <div className="space-y-2">
                      {trlOptions.map((opt, i) => (
                        <label
                          key={i}
                          className={`p-3 rounded-xl border flex items-center space-x-3 cursor-pointer transition-all ${
                            formData.trlLevel.includes(opt.split(':')[0]) || formData.trlLevel === opt
                              ? 'bg-bio-green/15 border-bio-green text-bio-navy font-bold' 
                              : 'bg-white border-bio-navy/10 text-bio-textMuted hover:bg-bio-cream'
                          }`}
                        >
                          <input
                            type="radio"
                            name="trlLevel"
                            value={opt}
                            checked={formData.trlLevel.includes(opt.split(':')[0]) || formData.trlLevel === opt}
                            onChange={handleChange}
                            className="text-bio-green focus:ring-bio-green"
                          />
                          <span className="text-xs">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-bio-navy mb-1">Estado de Propiedad Intelectual (IP) *</label>
                    <select
                      name="ipStatus"
                      value={formData.ipStatus}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-bio-navy/15 focus:border-bio-green focus:outline-none bg-bio-paper/30 font-bold text-bio-navy"
                    >
                      <option value="Patente Concedida">Patente Concedida</option>
                      <option value="Patente en Trámite / Solicitud PCT">Patente en Trámite / Solicitud PCT</option>
                      <option value="Secreto Industrial / Trade Secret">Secreto Industrial / Trade Secret</option>
                      <option value="Registro de Software / Copyright">Registro de Software / Copyright</option>
                      <option value="En proceso de protección / Open Source">En proceso de protección / Open Source</option>
                    </select>
                  </div>
                </div>
              )}

              {/* STEP 5: BUSINESS & INVESTMENT SOUGHT */}
              {currentStep === 5 && (
                <div className="space-y-4 animate-fade-in">
                  <h4 className="font-extrabold text-bio-navy text-sm">5. Oportunidades de Negocio & Búsqueda de Inversión</h4>

                  <div>
                    <label className="block font-bold text-bio-navy mb-1.5">Tipo de Colaboración Buscada:</label>
                    <div className="grid grid-cols-2 gap-2">
                      {collaborationOptions.map((cOpt) => (
                        <button
                          key={cOpt}
                          type="button"
                          onClick={() => toggleArrayItem('collaborationTypes', cOpt)}
                          className={`p-2.5 rounded-xl border text-xs font-semibold text-left flex items-center justify-between transition-all ${
                            formData.collaborationTypes.includes(cOpt)
                              ? 'bg-bio-green text-white border-bio-green shadow-xs'
                              : 'bg-bio-cream border-bio-navy/10 text-bio-navy'
                          }`}
                        >
                          <span>{cOpt}</span>
                          {formData.collaborationTypes.includes(cOpt) && <Check className="w-3.5 h-3.5" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-bio-cream border border-bio-navy/10 space-y-3">
                    <label className="block font-extrabold text-bio-navy">¿La startup está buscando inversión de capital actualmente? *</label>
                    <div className="flex items-center space-x-6">
                      <label className="flex items-center space-x-2 cursor-pointer font-bold text-bio-navy">
                        <input
                          type="radio"
                          name="investmentSought"
                          value="Yes"
                          checked={formData.investmentSought === 'Yes'}
                          onChange={handleChange}
                        />
                        <span>Sí, ronda abierta</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer font-bold text-bio-navy">
                        <input
                          type="radio"
                          name="investmentSought"
                          value="No"
                          checked={formData.investmentSought === 'No'}
                          onChange={handleChange}
                        />
                        <span>No por ahora</span>
                      </label>
                    </div>

                    {formData.investmentSought === 'Yes' && (
                      <div className="pt-2">
                        <label className="block font-bold text-bio-navy mb-1">Monto Objetivo / Ronda</label>
                        <input
                          type="text"
                          name="investmentAmount"
                          value={formData.investmentAmount}
                          onChange={handleChange}
                          placeholder="Ej. USD $250,000 (SAFE / Pre-Seed)"
                          className="w-full px-3 py-2 rounded-xl border border-bio-navy/15 focus:border-bio-green focus:outline-none bg-white font-bold text-bio-navy"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>

            {/* Stepper Navigation Buttons */}
            <div className="pt-4 border-t border-bio-navy/10 flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="px-4 py-2.5 rounded-xl border border-bio-navy/20 hover:bg-bio-cream text-bio-navy font-bold text-xs flex items-center space-x-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-bold text-bio-textMuted hover:text-bio-navy"
                >
                  Cancelar
                </button>
              )}

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  className="px-6 py-2.5 rounded-xl bg-bio-navy hover:bg-bio-green text-white font-extrabold text-xs uppercase tracking-wider flex items-center space-x-1 transition-colors"
                >
                  <span>Siguiente Paso</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-bio-green hover:bg-bio-greenDark text-white font-extrabold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-lg transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSaving ? 'Guardando...' : (targetStartup && !targetStartup.isNew ? 'Guardar Cambios en mi Ficha' : 'Guardar en Base de Datos BHV')}</span>
                </button>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
}
