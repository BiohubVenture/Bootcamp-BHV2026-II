import React from 'react';
import { X, MapPin, Users, Award, ExternalLink, TrendingUp, Globe, Linkedin, MessageCircle, ShieldCheck, CheckCircle2, Trophy, Edit3 } from 'lucide-react';

export default function StartupModal({ startup, onClose, onEditRequested }) {
  if (!startup) return null;

  const whatsappMessage = encodeURIComponent(
    `Hola! Estoy interesado en conocer más sobre la startup ${startup.name} acelerada en Biohub Venture.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bio-navyDark/80 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-bio-navy/10 relative my-8 max-h-[90vh] flex flex-col">
        
        {/* Startup Hero Header */}
        <div className="relative h-52 bg-bio-navyDeep">
          <img 
            src={startup.image} 
            alt={startup.name} 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bio-navyDark via-bio-navyDark/60 to-transparent" />
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-sm transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Floating Header Info */}
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-bio-green text-white shadow-sm">
                  {startup.rank} Portafolio
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-xs border border-white/20">
                  {startup.category}
                </span>
              </div>
              <h3 className="text-3xl font-extrabold text-white">{startup.name}</h3>
            </div>
            
            <div className="flex items-center space-x-1.5 text-xs text-white font-bold bg-black/40 px-3 py-1.5 rounded-xl backdrop-blur-md border border-white/20">
              <MapPin className="w-3.5 h-3.5 text-bio-neon" />
              <span>{startup.country}</span>
            </div>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
          
          {/* Value Proposition */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold text-bio-green uppercase tracking-wider">Propuesta de Valor</h4>
            <p className="text-base font-extrabold text-bio-navy leading-snug">{startup.tagline}</p>
            <p className="text-xs text-bio-textMuted leading-relaxed">{startup.description}</p>
          </div>

          {/* Stage & SRL Level Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-bio-cream p-4 rounded-2xl border border-bio-navy/8">
            <div>
              <span className="text-[10px] font-extrabold text-bio-navy uppercase tracking-wider block">Etapa & Capital:</span>
              <span className="text-xs font-extrabold text-bio-greenDark">{startup.stage}</span>
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-bio-navy uppercase tracking-wider block">Nivel de Madurez Tecnológica:</span>
              <span className="text-xs font-bold text-bio-navy">{startup.srlLevel || 'TRL 5 (Validación Experimental)'}</span>
            </div>
          </div>

          {/* Key Metrics & Traction */}
          <div>
            <h4 className="text-xs font-extrabold text-bio-navy uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <TrendingUp className="w-4 h-4 text-bio-green" />
              <span>Impacto & Tracción Validada:</span>
            </h4>
            <div className="text-xs font-semibold text-bio-textDark bg-bio-paper p-3.5 rounded-xl border border-bio-green/20">
              {startup.metrics}
            </div>
          </div>

          {/* Key Achievements List */}
          {startup.achievements && (
            <div>
              <h4 className="text-xs font-extrabold text-bio-navy uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Principales Logros & Evidencia:</span>
              </h4>
              <div className="space-y-1.5">
                {startup.achievements.map((ach, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-bio-textDark">
                    <CheckCircle2 className="w-3.5 h-3.5 text-bio-green flex-shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Founders & Team */}
          <div>
            <h4 className="text-xs font-extrabold text-bio-navy uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <Users className="w-4 h-4 text-bio-navy" />
              <span>Equipo Fundador:</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {startup.founders.map((f, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-bio-cream text-bio-navy text-xs font-bold border border-bio-navy/10">
                  {f}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer with Direct Contact Links */}
        <div className="p-5 bg-bio-cream border-t border-bio-navy/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            {onEditRequested && (
              <button
                onClick={onEditRequested}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white border border-bio-green text-bio-greenDark hover:bg-bio-green hover:text-white text-xs font-extrabold transition-all"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>¿Eres el Founder? Editar Ficha</span>
              </button>
            )}
            {startup.website && (
              <a
                href={startup.website}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white border border-bio-navy/15 text-bio-navy hover:text-bio-green hover:border-bio-green transition-all"
                title="Visitar Sitio Web"
              >
                <Globe className="w-4 h-4" />
              </a>
            )}
            {startup.linkedin && (
              <a
                href={startup.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white border border-bio-navy/15 text-[#0077B5] hover:border-[#0077B5] transition-all"
                title="LinkedIn de la Startup"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-bold text-bio-navy hover:bg-bio-paper rounded-xl"
            >
              Cerrar
            </button>
            <a
              href={`https://wa.me/${startup.whatsapp || '51999999999'}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-2.5 text-xs font-extrabold text-white bg-bio-green hover:bg-bio-greenDark rounded-xl shadow-md transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Conectar con Founder</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
