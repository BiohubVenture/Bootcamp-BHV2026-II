import React, { useState } from 'react';
import { X, CheckCircle2, Upload, Sparkles, Building2, Globe, MessageSquare, Linkedin, Trophy, FileText, Send } from 'lucide-react';

export default function UpdateStartupModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    startupName: '',
    country: 'Perú',
    category: 'FoodTech & Bioinsumos',
    founderName: '',
    email: '',
    whatsapp: '',
    website: '',
    linkedin: '',
    pitch: '',
    achievements: '',
    stage: 'Pre-Seed',
    capitalRaised: '',
    needs: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Keep state shown for confirmation
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bio-navyDeep/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl border border-bio-navy/10 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-bio-cream hover:bg-bio-navy/10 text-bio-navy transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-5">
            <div className="w-16 h-16 bg-bio-green/20 text-bio-green rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-bio-navy">¡Información Recibida con Éxito!</h3>
              <p className="text-xs sm:text-sm text-bio-textMuted max-w-md mx-auto">
                Los datos de <strong>{formData.startupName || 'tu startup'}</strong> han sido registrados para su validación y actualización en el Portafolio oficial de Biohub Venture.
              </p>
            </div>
            <button
              onClick={() => { setSubmitted(false); onClose(); }}
              className="px-6 py-2.5 rounded-xl bg-bio-navy text-white font-extrabold text-xs uppercase tracking-wider hover:bg-bio-green transition-colors"
            >
              Volver al Portafolio
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-bio-green/15 text-bio-greenDark text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-bio-green" />
                <span>Actualización de Ficha de Startup</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-bio-navy">
                Actualizar Datos en el Portafolio BHV
              </h3>
              <p className="text-xs text-bio-textMuted leading-relaxed">
                Completa este formulario para actualizar el logo, pitch, fotografías reales, logros recientes, redes sociales y datos de contacto de tu startup en nuestra plataforma.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Row 1: Name & Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-bio-navy mb-1">Nombre de la Startup *</label>
                  <input
                    type="text"
                    name="startupName"
                    required
                    value={formData.startupName}
                    onChange={handleChange}
                    placeholder="Ej. CRIPES, BioSafe Me, MIZETA..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-bio-navy/15 focus:outline-none focus:border-bio-green bg-bio-paper/30 text-bio-navy"
                  />
                </div>
                <div>
                  <label className="block font-bold text-bio-navy mb-1">País de Origen *</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-bio-navy/15 focus:outline-none focus:border-bio-green bg-bio-paper/30 text-bio-navy"
                  >
                    <option value="Perú">Perú 🇵🇪</option>
                    <option value="Colombia">Colombia 🇨🇴</option>
                    <option value="Ecuador">Ecuador 🇪🇨</option>
                    <option value="El Salvador">El Salvador 🇸🇻</option>
                    <option value="Venezuela">Venezuela 🇻🇪</option>
                    <option value="Otro LATAM">Otro país LATAM 🌎</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Category & Stage */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-bio-navy mb-1">Vertical / Sector Bio *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-bio-navy/15 focus:outline-none focus:border-bio-green bg-bio-paper/30 text-bio-navy"
                  >
                    <option value="FoodTech & Bioinsumos">FoodTech & Bioinsumos</option>
                    <option value="HealthTech & Farma">HealthTech & Diagnóstico</option>
                    <option value="Agritech & IA">AgriTech & IA</option>
                    <option value="Biomateriales">Biomateriales & Micelio</option>
                    <option value="Bioplásticos">Bioplásticos & Polímeros</option>
                    <option value="IoT & Monitoreo">IoT & Bioacústica</option>
                    <option value="Climate FinTech">Climate FinTech</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-bio-navy mb-1">Etapa de Inversión</label>
                  <select
                    name="stage"
                    value={formData.stage}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-bio-navy/15 focus:outline-none focus:border-bio-green bg-bio-paper/30 text-bio-navy"
                  >
                    <option value="Ideación / Validación MVP">Ideación / Validación MVP</option>
                    <option value="Pre-Seed">Pre-Seed (Levantando)</option>
                    <option value="Seed Round">Seed Round</option>
                    <option value="En Mercado / Scaling">En Mercado / Scaling</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Founder Name & Contact Email/WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-bio-navy mb-1">Founder / Contacto *</label>
                  <input
                    type="text"
                    name="founderName"
                    required
                    value={formData.founderName}
                    onChange={handleChange}
                    placeholder="Tu nombre completo"
                    className="w-full px-3 py-2 rounded-xl border border-bio-navy/15 focus:outline-none focus:border-bio-green bg-bio-paper/30 text-bio-navy"
                  />
                </div>
                <div>
                  <label className="block font-bold text-bio-navy mb-1">Email de Contacto *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="contacto@startup.com"
                    className="w-full px-3 py-2 rounded-xl border border-bio-navy/15 focus:outline-none focus:border-bio-green bg-bio-paper/30 text-bio-navy"
                  />
                </div>
                <div>
                  <label className="block font-bold text-bio-navy mb-1">WhatsApp (con código) *</label>
                  <input
                    type="text"
                    name="whatsapp"
                    required
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="+51 999 999 999"
                    className="w-full px-3 py-2 rounded-xl border border-bio-navy/15 focus:outline-none focus:border-bio-green bg-bio-paper/30 text-bio-navy"
                  />
                </div>
              </div>

              {/* Row 4: Web & Social Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-bio-navy mb-1">Sitio Web / One-Pager URL</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl border border-bio-navy/15 focus:outline-none focus:border-bio-green bg-bio-paper/30 text-bio-navy"
                  />
                </div>
                <div>
                  <label className="block font-bold text-bio-navy mb-1">Perfil LinkedIn / Instagram</label>
                  <input
                    type="text"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/company/..."
                    className="w-full px-3 py-2 rounded-xl border border-bio-navy/15 focus:outline-none focus:border-bio-green bg-bio-paper/30 text-bio-navy"
                  />
                </div>
              </div>

              {/* Row 5: New Pitch 2026-II */}
              <div>
                <label className="block font-bold text-bio-navy mb-1">Nuevo Pitch / Propuesta de Valor (1-2 párrafos) *</label>
                <textarea
                  name="pitch"
                  required
                  rows={3}
                  value={formData.pitch}
                  onChange={handleChange}
                  placeholder="Describe la solución tecnológica, el problema amazónico que resuelven y la evidencia científica que los respalda..."
                  className="w-full px-3.5 py-2 rounded-xl border border-bio-navy/15 focus:outline-none focus:border-bio-green bg-bio-paper/30 text-bio-navy"
                />
              </div>

              {/* Row 6: Main Achievements & Metrics */}
              <div>
                <label className="block font-bold text-bio-navy mb-1">Principales Logros & Métricas de Impacto</label>
                <textarea
                  name="achievements"
                  rows={2}
                  value={formData.achievements}
                  onChange={handleChange}
                  placeholder="Ej. Validación en laboratorio IGBM, 1,200 ha monitoreadas, patente en trámite, ventas retail..."
                  className="w-full px-3.5 py-2 rounded-xl border border-bio-navy/15 focus:outline-none focus:border-bio-green bg-bio-paper/30 text-bio-navy"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-bio-navy/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-bold text-bio-textMuted hover:text-bio-navy"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-bio-green text-white font-extrabold text-xs uppercase tracking-wider hover:bg-bio-greenDark transition-colors flex items-center space-x-2 shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar Actualización</span>
                </button>
              </div>

            </form>
          </>
        )}

      </div>
    </div>
  );
}
