import React, { useEffect, useState } from 'react';
import { ExternalLink, Quote } from 'lucide-react';
import { getPublishedMentions } from '../services/mentionsService';

const TYPE_LABELS = { testimonial: 'Testimonio', news: 'Noticia', award: 'Premio', mention: 'Mención' };

export default function MentionsPage() {
  const [mentions, setMentions] = useState([]);

  useEffect(() => {
    getPublishedMentions().then(setMentions);
  }, []);

  return (
    <section className="py-16 bg-bio-paper/30 min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="px-3.5 py-1 rounded-full bg-bio-green/10 text-bio-greenDark text-xs font-bold uppercase tracking-wider">Voces BHV</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-bio-navy mt-2 mb-10">Menciones, noticias y testimonios</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mentions.map((mention) => <MentionCard key={mention.id} mention={mention} />)}
        </div>
      </div>
    </section>
  );
}

export function MentionCard({ mention }) {
  const text = mention.quote || mention.summary || mention.title || 'Mención publicada';
  return (
    <article className="retro-card p-6 flex flex-col justify-between bg-white">
      <div>
        <div className="flex items-center justify-between mb-4">
          <Quote className="w-8 h-8 text-bio-green/40 fill-bio-green/20" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-bio-green bg-bio-green/10 px-2 py-1 rounded-full">{TYPE_LABELS[mention.mention_type] || 'Mención'}</span>
        </div>
        <p className="text-xs sm:text-sm text-bio-textDark leading-relaxed italic mb-6">“{text}”</p>
      </div>
      <div className="pt-4 border-t border-bio-navy/5">
        <h2 className="text-sm font-extrabold text-bio-navy">{mention.author_name || mention.source_name}</h2>
        <p className="text-xs text-bio-textMuted font-medium">{mention.author_role || mention.source_name}</p>
        {mention.source_url && <a href={mention.source_url} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-bio-green hover:text-bio-greenDark">Ver fuente original <ExternalLink className="w-3.5 h-3.5" /></a>}
      </div>
    </article>
  );
}
