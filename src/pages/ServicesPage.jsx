import React, { useState } from 'react';
import { SERVICES } from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';
import { Users, DollarSign, Building2, BookOpen, ShieldCheck, Rocket, CheckCircle2, ChevronRight } from 'lucide-react';
import ServiceModal from '../components/ServiceModal';

const iconMap = {
  mentorship: Users,
  capital: DollarSign,
  corporate: Building2,
  education: BookOpen,
  blockchain: ShieldCheck,
  preacceleration: Rocket
};

export default function ServicesPage({ currentLang }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.ES;
  const [selectedService, setSelectedService] = useState(null);

  return (
    <div className="py-12 bg-bio-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="px-3.5 py-1.5 rounded-full bg-bio-green/15 text-bio-greenDark text-xs font-black uppercase tracking-wider">
            {t.serviciosSection.badge}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-bio-navy">
            {t.serviciosSection.title}
          </h1>
          <p className="text-bio-textMuted text-base sm:text-lg">
            {t.serviciosSection.subtitle}
          </p>
        </div>

        {/* Services 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {SERVICES.map((service) => {
            const IconComp = iconMap[service.id] || Rocket;
            return (
              <div
                key={service.id}
                className="retro-card p-6 flex flex-col justify-between border-t-4 border-t-bio-green hover:border-t-bio-neon transition-all duration-300 group bg-white"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-bio-cream border border-bio-navy/10 flex items-center justify-center text-bio-green group-hover:bg-bio-green group-hover:text-white transition-colors">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-bio-navy/20 font-mono">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-bio-navy mb-2 group-hover:text-bio-green transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-bio-textMuted leading-relaxed mb-4">
                    {service.shortDesc}
                  </p>

                  <div className="space-y-2 mb-6 pt-3 border-t border-bio-navy/5">
                    {service.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-bio-textDark font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-bio-green flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedService(service)}
                  className="w-full py-2.5 px-4 rounded-lg bg-bio-cream hover:bg-bio-neon/20 text-bio-navy font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors border border-bio-navy/10"
                >
                  <span>{t.serviciosSection.viewDetails}</span>
                  <ChevronRight className="w-4 h-4 text-bio-green" />
                </button>
              </div>
            );
          })}
        </div>

      </div>

      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
}
