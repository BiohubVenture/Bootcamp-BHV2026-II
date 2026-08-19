import React from 'react';
import {
  X,
  Building2,
  Lock,
  EyeOff,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Globe,
  MapPin,
  Clock,
  Briefcase,
  Layers,
  FileText,
  Handshake,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Cpu
} from 'lucide-react';

export default function CorporateNeedDetailModal({ need, onClose, onApplyMatchmaking }) {
  if (!need) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bio-navyDark/85 backdrop-blur-md overflow-y-auto animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="need-detail-modal-title"
    >
      <div className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-bio-navy/10 relative my-6 max-h-[92vh] flex flex-col">
        
        {/* Header Banner */}
        <div className="bg-bio-navy text-white p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-bio-green/10 rounded-full blur-3xl pointer-events-none" />
          
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ficha de necesidad"
            className="absolute top-5 right-5 p-2 text-gray-300 hover:text-white rounded-xl bg-white/10 hover:bg-white/20 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              {need.isAnonymous ? (
                <span className="px-3 py-1 rounded-full text-xs font-mono font-black uppercase tracking-wider bg-bio-neon/20 text-bio-neon border border-bio-neon/30 flex items-center gap-1.5">
                  <EyeOff className="w-3.5 h-3.5" />
                  Demanda Confidencial • {need.sector}
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-mono font-black uppercase tracking-wider bg-bio-green/20 text-bio-neon border border-bio-green/30 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  {need.companyName} ({need.sector})
                </span>
              )}

              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white border border-white/15">
                {need.category}
              </span>
            </div>

            <h3 id="need-detail-modal-title" className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {need.title}
            </h3>

            <div className="flex flex-wrap gap-4 text-xs text-gray-300 pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-bio-neon" />
                {need.country}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-bio-neon" />
                Urgencia: {need.urgency}
              </span>
              <span className="flex items-center gap-1 font-bold text-bio-neon">
                💰 Presupuesto/Alcance: {need.estimatedBudget}
              </span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 text-bio-textDark bg-bio-cream/30 space-y-6">
          
          {/* Main Description */}
          <section className="bg-white rounded-2xl p-6 border border-bio-navy/10 shadow-sm space-y-3">
            <h4 className="text-xs font-extrabold text-bio-navy uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-bio-green" />
              Descripción Detallada del Desafío / Necesidad
            </h4>
            <p className="text-sm text-bio-textMuted leading-relaxed">
              {need.description}
            </p>
          </section>

          {/* Modelos de Vinculación & IP */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-white rounded-2xl p-5 border border-bio-navy/10 shadow-sm space-y-3">
              <h4 className="text-xs font-extrabold text-bio-navy uppercase tracking-wider flex items-center gap-2">
                <Handshake className="w-4 h-4 text-bio-green" />
                Modelos de Vinculación Buscados
              </h4>
              <div className="flex flex-wrap gap-2 pt-1">
                {need.collaborationTypes?.map(type => (
                  <span key={type} className="px-3 py-1.5 rounded-xl bg-bio-paper text-bio-navy text-xs font-extrabold border border-bio-navy/10 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-bio-green" />
                    {type === 'codesarrollo' ? 'Co-Desarrollo I+D' : type === 'piloto' ? 'Piloto de Campo' : type === 'licencia' ? 'Licenciamiento' : type === 'venture_client' ? 'Venture Client / Coinversión' : type}
                  </span>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-2xl p-5 border border-bio-navy/10 shadow-sm space-y-3">
              <h4 className="text-xs font-extrabold text-bio-navy uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-bio-green" />
                Expectativa de Propiedad Intelectual
              </h4>
              <p className="text-xs text-bio-navy font-semibold leading-relaxed">
                {need.ipExpectations || 'Acuerdo flexible a negociar según el nivel de desarrollo de la solución propuesta.'}
              </p>
            </section>
          </div>

          {/* Contexto de Anonimato & BHV Guarantee */}
          <div className="p-5 rounded-2xl bg-bio-navy text-white space-y-2">
            <div className="flex items-center space-x-2 font-extrabold text-bio-neon text-xs">
              <Lock className="w-4 h-4" />
              <span>Gestión Confidencial de Bio-Matchmaking</span>
            </div>
            <p className="text-xs text-white/80 leading-relaxed">
              Biohub Venture actúa como facilitador neutral de innovación abierta. Evaluamos previamente la capacidad científica y el TRL/SRL de las startups postulantes antes de realizar la introducción formal con el equipo de innovación del corporativo.
            </p>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-white border-t border-bio-navy/10 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-bold text-bio-navy hover:bg-bio-cream rounded-xl transition-colors"
          >
            Cerrar Ficha
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              if (onApplyMatchmaking) onApplyMatchmaking(need);
            }}
            className="inline-flex items-center px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-bio-green hover:bg-bio-greenDark shadow-lg transition-all"
          >
            <span>Conectar / Proponer Vinculación</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>

      </div>
    </div>
  );
}
