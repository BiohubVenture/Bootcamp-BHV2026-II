import React, { useState } from 'react';
import { SERVICES } from '../data/mockData';
import { Users, DollarSign, Building2, BookOpen, ShieldCheck, Rocket, CheckCircle2, ChevronRight } from 'lucide-react';
import ServiceModal from './ServiceModal';

const iconMap = {
  mentorship: Users,
  capital: DollarSign,
  corporate: Building2,
  education: BookOpen,
  blockchain: ShieldCheck,
  preacceleration: Rocket
};

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section id="servicios" className="py-16 bg-bio-paper/30 border-b border-bio-navy/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-bio-green/10 text-bio-greenDark text-xs font-bold uppercase tracking-wider">
            Toolkit Integral BHV
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-bio-navy">
            Nuestros <span className="text-bio-green">Servicios para Founders</span>
          </h2>
          <p className="text-bio-textMuted text-base sm:text-lg">
            Ofrecemos un ecosistema integral de apoyo para convertir investigaciones y bioideas en empresas globales sostenibles y bancables.
          </p>
        </div>

        {/* 6 Services Grid (3 cols on desktop, 1 col on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => {
            const IconComp = iconMap[service.id] || Rocket;
            return (
              <div
                key={service.id}
                className="retro-card p-6 flex flex-col justify-between border-t-4 border-t-bio-green hover:border-t-bio-neon transition-all duration-300 group"
              >
                <div>
                  {/* Card Top: Number badge & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-bio-cream border border-bio-navy/10 flex items-center justify-center text-bio-green group-hover:bg-bio-green group-hover:text-white transition-colors">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-bio-navy/20 font-mono">
                      {service.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-extrabold text-bio-navy mb-2 group-hover:text-bio-green transition-colors">
                    {service.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs text-bio-textMuted leading-relaxed mb-4">
                    {service.shortDesc}
                  </p>

                  {/* Key Benefits List */}
                  <div className="space-y-2 mb-6 pt-3 border-t border-bio-navy/5">
                    {service.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-bio-textDark font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-bio-green flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detail Drawer Trigger Button */}
                <button
                  onClick={() => setSelectedService(service)}
                  className="w-full py-2.5 px-4 rounded-lg bg-bio-cream hover:bg-bio-neon/20 text-bio-navy font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors border border-bio-navy/10"
                >
                  <span>Ver detalles del servicio</span>
                  <ChevronRight className="w-4 h-4 text-bio-green" />
                </button>
              </div>
            );
          })}
        </div>

      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </section>
  );
}
