import React, { useState } from 'react';
import { RFS_ITEMS } from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';
import { Sparkles, Send, CheckCircle2, ShieldCheck, Leaf, ArrowLeft, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { saveApplication } from '../services/submissionService';

export default function ApplyPage({ currentLang }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.ES;

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

  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving]       = useState(false);
  const [saveError, setSaveError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveError(false);
    const result = await saveApplication({ ...formData, source: 'apply_page' });
    setSaving(false);
    if (result.success) {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setSaveError(true);
    }
  };

  return (
    <div className="py-12 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation back */}
        <Link to="/" className="inline-flex items-center text-xs font-bold text-bio-green hover:text-bio-greenDark">
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span>{t.applyPage.backHome}</span>
        </Link>

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="px-3.5 py-1.5 rounded-full bg-bio-green/15 text-bio-greenDark text-xs font-black uppercase tracking-wider">
            {t.nextCohort.badge}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-bio-navy">
            {t.applyPage.heroTitle}
          </h1>
          <p className="text-bio-textMuted text-base sm:text-lg">
            {t.applyPage.heroSubtitle}
          </p>
        </div>

        {/* Requirements Checklist */}
        <div className="bg-bio-cream p-6 rounded-2xl border border-bio-green/20 space-y-3">
          <h3 className="text-xs font-extrabold text-bio-greenDark uppercase tracking-wider">
            {t.applyPage.reqTitle}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold text-bio-navy">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-bio-green" />
              <span>{t.applyPage.req1}</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-bio-green" />
              <span>{t.applyPage.req2}</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-bio-green" />
              <span>{t.applyPage.req3}</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-bio-green" />
              <span>{t.applyPage.req4}</span>
            </div>
          </div>
        </div>

        {/* Form or Confirmation */}
        <div className="retro-card p-8 sm:p-10 bg-bio-paper/40 shadow-xl border border-bio-navy/10">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-bio-green text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              
              <h2 className="text-3xl font-extrabold text-bio-navy">{t.applyPage.successTitle}</h2>
              
              <p className="text-sm text-bio-textMuted max-w-md mx-auto leading-relaxed">
                {t.applyPage.successDesc}
              </p>

              <div className="pt-6">
                <Link
                  to="/"
                  className="inline-flex items-center px-8 py-3.5 rounded-xl bg-bio-green text-white font-bold text-sm shadow-md hover:bg-bio-greenDark"
                >
                  <span>{t.applyPage.backHome}</span>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>

              {saveError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-center space-x-2 text-red-700 text-xs">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Hubo un error al guardar tu postulación. Por favor intenta de nuevo.</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-extrabold text-bio-navy mb-1.5">{t.applyPage.formStartupName}</label>
                  <input
                    type="text"
                    required
                    value={formData.startupName}
                    onChange={(e) => setFormData({ ...formData, startupName: e.target.value })}
                    placeholder="Ej. BioGenomics Amazónica"
                    className="w-full px-4 py-3 text-xs rounded-xl border border-bio-navy/20 focus:border-bio-green focus:outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-bio-navy mb-1.5">{t.applyPage.formFounderName}</label>
                  <input
                    type="text"
                    required
                    value={formData.founderName}
                    onChange={(e) => setFormData({ ...formData, founderName: e.target.value })}
                    placeholder="Ej. Dra. Carmen Silva"
                    className="w-full px-4 py-3 text-xs rounded-xl border border-bio-navy/20 focus:border-bio-green focus:outline-none bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-extrabold text-bio-navy mb-1.5">{t.applyPage.formEmail}</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="carmen@biogenomics.com"
                    className="w-full px-4 py-3 text-xs rounded-xl border border-bio-navy/20 focus:border-bio-green focus:outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-bio-navy mb-1.5">{t.applyPage.formCountry}</label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-4 py-3 text-xs rounded-xl border border-bio-navy/20 focus:border-bio-green focus:outline-none bg-white"
                  >
                    <option value="Perú">Perú</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Brasil">Brasil</option>
                    <option value="Bolivia">Bolivia</option>
                    <option value="Otro LATAM">Otro LATAM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-bio-navy mb-1.5">{t.applyPage.formRfs}</label>
                <select
                  value={formData.rfsId}
                  onChange={(e) => setFormData({ ...formData, rfsId: e.target.value })}
                  className="w-full px-4 py-3 text-xs rounded-xl border border-bio-navy/20 focus:border-bio-green focus:outline-none bg-white font-semibold"
                >
                  {RFS_ITEMS.map((r) => (
                    <option key={r.id} value={r.id}>
                      RFS #{r.number} - {r.title} ({r.pillar})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-bio-navy mb-1.5">{t.applyPage.formDesc}</label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe brevemente la biotecnología o innovación y cómo regenera la Amazonía..."
                  className="w-full px-4 py-3 text-xs rounded-xl border border-bio-navy/20 focus:border-bio-green focus:outline-none bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-bio-navy mb-1.5">{t.applyPage.formDeck}</label>
                <input
                  type="url"
                  value={formData.pitchDeckUrl}
                  onChange={(e) => setFormData({ ...formData, pitchDeckUrl: e.target.value })}
                  placeholder="https://drive.google.com/deck.pdf o Loom"
                  className="w-full px-4 py-3 text-xs rounded-xl border border-bio-navy/20 focus:border-bio-green focus:outline-none bg-white"
                />
              </div>

              <div className="pt-4 border-t border-bio-navy/10 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center px-8 py-4 rounded-xl text-sm font-bold text-white bg-bio-green hover:bg-bio-greenDark shadow-lg transition-all disabled:opacity-60"
                >
                  <Send className="w-4 h-4 mr-2" />
                  <span>{saving ? 'Enviando…' : t.applyPage.submitBtn}</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
