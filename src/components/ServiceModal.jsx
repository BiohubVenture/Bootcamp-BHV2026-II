import React from 'react';
import { X, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

export default function ServiceModal({ service, onClose }) {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bio-navyDark/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border border-bio-navy/10 relative my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-bio-navy text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-300 hover:text-white rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="px-2.5 py-0.5 rounded text-xs font-mono font-extrabold bg-bio-neon/20 text-bio-neon border border-bio-neon/30">
            SERVICIO #{service.number}
          </span>

          <h3 className="text-2xl font-extrabold text-white mt-2">
            {service.title}
          </h3>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1 text-bio-textDark">
          
          <div>
            <h4 className="text-xs font-extrabold text-bio-green uppercase tracking-wider mb-2">Descripción General</h4>
            <p className="text-sm text-bio-textMuted leading-relaxed bg-bio-paper p-4 rounded-xl border border-bio-navy/5">
              {service.fullDetails || service.shortDesc}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-extrabold text-bio-navy uppercase tracking-wider mb-3">Beneficios Incluidos:</h4>
            <div className="space-y-3">
              {service.benefits.map((b, idx) => (
                <div key={idx} className="flex items-start space-x-3 text-sm text-bio-textDark bg-bio-cream/60 p-3 rounded-lg border border-bio-green/20">
                  <CheckCircle2 className="w-5 h-5 text-bio-green flex-shrink-0 mt-0.5" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-bio-cream border-t border-bio-navy/10 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-bold text-bio-navy hover:bg-bio-paper rounded-lg"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
}
