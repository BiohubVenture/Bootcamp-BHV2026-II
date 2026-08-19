import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';

const GOOGLE_FORM_EMBED_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSc6_HAai0NcryAHM0HeDCgN14b_J8H28HqRoM8jyDHIbRI8SQ/viewform?embedded=true';
const GOOGLE_FORM_DIRECT_URL = 'https://forms.gle/qeFm8qn5KRTwjGRj7';

export default function ApplyModal({ isOpen, onClose }) {
  const [isLoading, setIsLoading] = useState(true);
  const closeRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Focus close button when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      if (closeRef.current) closeRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-bio-navyDark/85 backdrop-blur-md overflow-hidden animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="apply-modal-title"
    >
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-bio-navy/15 flex flex-col max-h-[95vh] overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-bio-navy text-white flex items-center justify-between border-b border-bio-green/20 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-bio-green/20 text-bio-neon flex items-center justify-center font-bold text-sm">
              🌿
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono font-black uppercase tracking-wider text-bio-neon bg-bio-neon/20 px-2 py-0.5 rounded-full">
                  Convocatoria Oficial
                </span>
                <span className="text-[10px] text-gray-300 font-bold">
                  Cohorte 2026-II
                </span>
              </div>
              <h2 id="apply-modal-title" className="text-base sm:text-lg font-extrabold text-white leading-tight">
                Postulación al Bootcamp para Emprendedores
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href={GOOGLE_FORM_DIRECT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white font-bold transition-colors"
              title="Abrir en pestaña nueva"
            >
              <span>Abrir en nueva pestaña</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Embedded Google Form */}
        <div className="relative flex-1 overflow-y-auto bg-bio-paper/30 min-h-[550px] sm:min-h-[650px] flex flex-col items-center">
          
          {isLoading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/90 space-y-3">
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
            className="w-full flex-1 min-h-[550px] sm:min-h-[650px] border-0"
            title="Formulario de Postulación Biohub Venture Cohorte 2026-II"
          >
            Cargando formulario...
          </iframe>
        </div>

        {/* Modal Footer / Fallback Info */}
        <div className="px-6 py-3 bg-bio-cream/80 border-t border-bio-navy/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs flex-shrink-0">
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
  );
}
