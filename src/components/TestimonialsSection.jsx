import React from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Quote, Star, ArrowRight } from 'lucide-react';

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-bio-paper/30 border-b border-bio-navy/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header (Matching image layout) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="px-3.5 py-1 rounded-full bg-bio-green/10 text-bio-greenDark text-xs font-bold uppercase tracking-wider">
              Testimonios
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-bio-navy mt-2">
              Lo que dicen nuestros founders y mentores
            </h2>
          </div>

          <a 
            href="#footer"
            className="inline-flex items-center text-sm font-bold text-bio-green hover:text-bio-greenDark"
          >
            <span>Ver todos los testimonios</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>
        </div>

        {/* 3 Testimonials Grid (Matching image layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="retro-card p-6 flex flex-col justify-between relative bg-white"
            >
              <div>
                {/* Quote Icon & Rating Stars */}
                <div className="flex items-center justify-between mb-4">
                  <Quote className="w-8 h-8 text-bio-green/40 fill-bio-green/20" />
                  <div className="flex space-x-1 text-bio-accentYellow">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-bio-textDark leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Info (Matching avatars from image) */}
              <div className="flex items-center space-x-3 pt-4 border-t border-bio-navy/5">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-bio-green"
                />
                <div>
                  <h4 className="text-sm font-extrabold text-bio-navy">{t.name}</h4>
                  <p className="text-xs text-bio-textMuted font-medium">{t.role}, <span className="text-bio-green font-bold">{t.company}</span></p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
