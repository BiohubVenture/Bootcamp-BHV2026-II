import React, { useState } from 'react';
import { TRANSLATIONS } from '../data/translations';
import { Sparkles, ExternalLink, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const GOOGLE_FORM_EMBED_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSc6_HAai0NcryAHM0HeDCgN14b_J8H28HqRoM8jyDHIbRI8SQ/viewform?embedded=true';
const GOOGLE_FORM_DIRECT_URL = 'https://forms.gle/qeFm8qn5KRTwjGRj7';

export default function ApplyPage({ currentLang }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.ES;
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="py-10 bg-bio-cream min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Navigation back */}
        <div className="flex items-center justify-between">
          <Link to="/" className="inline-flex items-center text-xs font-bold text-bio-green hover:text-bio-greenDark">
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span>Volver al Inicio</span>
          </Link>

          <a
            href={GOOGLE_FORM_DIRECT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-bio-navy text-white text-xs font-bold hover:bg-bio-navyDark transition-colors"
          >
            <span>Abrir en Google Forms</span>
            <ExternalLink className="w-3.5 h-3.5 text-bio-neon" />
          </a>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="px-3.5 py-1 rounded-full bg-bio-neon/20 border border-bio-neon/30 text-bio-greenDark text-xs font-mono font-black uppercase tracking-wider">
            Convocatoria Oficial · Cohorte 2026-II
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-bio-navy">
            Formulario de Postulación de Startup
          </h1>
          <p className="text-bio-textMuted text-xs sm:text-sm">
            Únete a la revolución de la bioeconomía amazónica LATAM. Completa el formulario oficial a continuación.
          </p>
        </div>

        {/* Embedded Google Form Card */}
        <div className="bg-white rounded-3xl border border-bio-navy/10 shadow-xl overflow-hidden flex flex-col min-h-[700px] sm:min-h-[850px] relative">
          
          {isLoading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white space-y-3">
              <div className="w-10 h-10 border-4 border-bio-green/30 border-t-bio-green rounded-full animate-spin" />
              <p className="text-xs font-extrabold text-bio-navy">Cargando formulario oficial de postulación...</p>
              <p className="text-[11px] text-bio-textMuted">Biohub Venture · Cohorte 2026-II</p>
            </div>
          )}

          <iframe
            src={GOOGLE_FORM_EMBED_URL}
            width="100%"
            height="100%"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            onLoad={() => setIsLoading(false)}
            className="w-full flex-1 min-h-[700px] sm:min-h-[850px] border-0"
            title="Formulario de Postulación Biohub Venture Cohorte 2026-II"
          >
            Cargando formulario...
          </iframe>

          {/* Footer Note */}
          <div className="px-6 py-3 bg-bio-paper/40 border-t border-bio-navy/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <div className="flex items-center space-x-2 text-bio-textMuted">
              <ShieldCheck className="w-4 h-4 text-bio-green" />
              <span>Tus datos son procesados de forma segura por el consorcio Biohub Venture.</span>
            </div>

            <a
              href={GOOGLE_FORM_DIRECT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-bio-green hover:text-bio-greenDark font-extrabold flex items-center space-x-1"
            >
              <span>¿Problemas para visualizar? Clic aquí para abrir directamente</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
