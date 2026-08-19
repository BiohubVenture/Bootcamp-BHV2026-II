import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { getPublishedMentions } from '../services/mentionsService';
import { MentionCard } from '../pages/MentionsPage';

export default function TestimonialsSection() {
  const [mentions, setMentions] = useState([]);

  useEffect(() => {
    getPublishedMentions({ limit: 3 }).then(setMentions);
  }, []);

  return (
    <section className="py-16 bg-bio-paper/30 border-b border-bio-navy/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header (Matching image layout) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="px-3.5 py-1 rounded-full bg-bio-green/10 text-bio-greenDark text-xs font-bold uppercase tracking-wider">
              Testimonios y menciones
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-bio-navy mt-2">
              Lo que dicen nuestros founders, aliados y medios
            </h2>
          </div>

          <a 
            href="/menciones"
            className="inline-flex items-center text-sm font-bold text-bio-green hover:text-bio-greenDark"
          >
            <span>Ver todas las menciones</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>
        </div>

        {/* 3 Testimonials Grid (Matching image layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mentions.map((mention) => <MentionCard key={mention.id} mention={mention} />)}
        </div>

      </div>
    </section>
  );
}
