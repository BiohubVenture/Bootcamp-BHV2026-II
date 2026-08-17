import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { RFS_ITEMS } from '../data/mockData';
import { saveApplication } from '../services/submissionService';

// IMPORTANT: All hooks are declared unconditionally BEFORE any early return.
export default function ApplyModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    startupName: '',
    founderName: '',
    email: '',
    country: 'Perú',
    rfsId: '1',
    description: '',
    pitchDeckUrl: '',
    teamSize: '2-4 personas'
  });
  const [submitted, setSubmitted]   = useState(false);
  const [saving, setSaving]         = useState(false);
  const [saveError, setSaveError]   = useState(false);
  const closeRef                    = useRef(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Focus close button when modal opens
  useEffect(() => {
    if (isOpen && closeRef.current) closeRef.current.focus();
  }, [isOpen]);

  // Guard render only after hooks are declared
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveError(false);
    const result = await saveApplication(formData);
    setSaving(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setSaveError(true);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      startupName: '', founderName: '', email: '',
      country: 'Perú', rfsId: '1', description: '', pitchDeckUrl: '', teamSize: '2-4 personas'
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bio-navyDark/80 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="apply-modal-title"
    >
      <div className="bg-white w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border border-bio-navy/10 relative my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-bio-navy text-white p-6 relative">
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Cerrar modal de postulación"
            className="absolute top-4 right-4 p-2 text-gray-300 hover:text-white rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2 mb-1">
            <Sparkles className="w-4 h-4 text-bio-neon" />
            <span className="text-xs font-bold uppercase tracking-wider text-bio-neon">Biohub Venture 2026-II</span>
          </div>

          <h3 id="apply-modal-title" className="text-2xl font-extrabold text-white">
            Formulario de Postulación de Startup
          </h3>
          <p className="text-xs text-gray-300 mt-1">
            Aplica al primer bootcamp de bioeconomía amazónica de alto impacto en LATAM.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 text-bio-textDark">
          
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-bio-green/10 text-bio-green flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              
              <h4 className="text-2xl font-extrabold text-bio-navy">¡Postulación Recibida con Éxito!</h4>
              
              <p className="text-sm text-bio-textMuted max-w-md mx-auto leading-relaxed">
                Gracias por aplicar a Biohub Venture 2026-II, <strong>{formData.startupName}</strong>. Nuestro comité evaluador del consorcio (BioGenia, IGBM y Scale) revisará tu proyecto y se comunicará en un plazo de 48 horas a <strong>{formData.email}</strong>.
              </p>

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 rounded-xl bg-bio-green text-white font-bold text-sm shadow-md hover:bg-bio-greenDark"
                >
                  Volver al sitio principal
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>

              {saveError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-center space-x-2 text-red-700 text-xs">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Hubo un error al guardar. Por favor intenta de nuevo.</span>
                </div>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="modal-startupName" className="block text-xs font-bold text-bio-navy mb-1">
                    Nombre de la Startup / Proyecto *
                  </label>
                  <input
                    id="modal-startupName"
                    name="startupName"
                    type="text"
                    required
                    value={formData.startupName}
                    onChange={handleChange}
                    placeholder="Ej. BioGenomics Amazónica"
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-bio-navy/20 focus:border-bio-green focus:outline-none bg-bio-paper/40"
                  />
                </div>

                <div>
                  <label htmlFor="modal-founderName" className="block text-xs font-bold text-bio-navy mb-1">
                    Nombre del Founder Principal *
                  </label>
                  <input
                    id="modal-founderName"
                    name="founderName"
                    type="text"
                    required
                    value={formData.founderName}
                    onChange={handleChange}
                    placeholder="Ej. Dra. Carmen Silva"
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-bio-navy/20 focus:border-bio-green focus:outline-none bg-bio-paper/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="modal-email" className="block text-xs font-bold text-bio-navy mb-1">
                    Correo Electrónico *
                  </label>
                  <input
                    id="modal-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="carmen@biogenomics.com"
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-bio-navy/20 focus:border-bio-green focus:outline-none bg-bio-paper/40"
                  />
                </div>

                <div>
                  <label htmlFor="modal-country" className="block text-xs font-bold text-bio-navy mb-1">
                    País de Origen *
                  </label>
                  <select
                    id="modal-country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-bio-navy/20 focus:border-bio-green focus:outline-none bg-bio-paper/40"
                  >
                    <option>Perú</option>
                    <option>Colombia</option>
                    <option>Ecuador</option>
                    <option>El Salvador</option>
                    <option>Venezuela</option>
                    <option>Brasil</option>
                    <option>Bolivia</option>
                    <option>Otro LATAM</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="modal-rfsId" className="block text-xs font-bold text-bio-navy mb-1">
                  Selecciona el RFS / Desafío al que Aplicas *
                </label>
                <select
                  id="modal-rfsId"
                  name="rfsId"
                  value={formData.rfsId}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-bio-navy/20 focus:border-bio-green focus:outline-none bg-bio-paper/40"
                >
                  {RFS_ITEMS.map((r) => (
                    <option key={r.id} value={r.id}>
                      RFS #{r.number} - {r.title} ({r.pillar})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="modal-description" className="block text-xs font-bold text-bio-navy mb-1">
                  Resumen del Problema y Solución Biotecnológica *
                </label>
                <textarea
                  id="modal-description"
                  name="description"
                  required
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe brevemente la biotecnología o innovación y cómo regenera la Amazonía..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-bio-navy/20 focus:border-bio-green focus:outline-none bg-bio-paper/40"
                />
              </div>

              <div>
                <label htmlFor="modal-pitchDeckUrl" className="block text-xs font-bold text-bio-navy mb-1">
                  Enlace a Pitch Deck / Vídeo Pitch (Opcional)
                </label>
                <input
                  id="modal-pitchDeckUrl"
                  name="pitchDeckUrl"
                  type="url"
                  value={formData.pitchDeckUrl}
                  onChange={handleChange}
                  placeholder="https://drive.google.com/deck.pdf o Loom"
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-bio-navy/20 focus:border-bio-green focus:outline-none bg-bio-paper/40"
                />
              </div>

              <div className="pt-3 border-t border-bio-navy/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-bold text-bio-navy hover:bg-bio-paper rounded-lg"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center px-6 py-3 rounded-xl text-xs font-bold text-white bg-bio-green hover:bg-bio-greenDark shadow-md transition-all disabled:opacity-60"
                >
                  <Send className="w-4 h-4 mr-2" />
                  <span>{saving ? 'Enviando…' : 'Enviar Postulación'}</span>
                </button>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
}
