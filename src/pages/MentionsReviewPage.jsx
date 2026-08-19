import React, { useEffect, useState } from 'react';
import { Check, ExternalLink, RefreshCw, X } from 'lucide-react';
import { getReviewQueue, reviewMention } from '../services/mentionsService';

export default function MentionsReviewPage() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState('');
  const load = async () => {
    const result = await getReviewQueue();
    setItems(result.data);
    setError(result.error || '');
  };
  useEffect(() => { load(); }, []);
  const decide = async (id, status) => {
    setBusyId(id);
    const result = await reviewMention(id, status);
    setBusyId('');
    if (result.error) return setError(result.error);
    load();
  };
  return <section className="py-14 bg-bio-cream min-h-[70vh]"><div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between gap-4 mb-8"><div><span className="text-xs font-bold uppercase tracking-wider text-bio-green">Uso interno</span><h1 className="text-3xl font-extrabold text-bio-navy">Revisión de menciones</h1></div><button onClick={load} className="inline-flex items-center gap-2 text-sm font-bold text-bio-green"><RefreshCw className="w-4 h-4" /> Actualizar</button></div>
    {error && <p className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</p>}
    <p className="mb-6 text-sm text-bio-textMuted">Solo los registros publicados aparecen en la web. Comprueba contexto, atribución y enlace original antes de aprobar.</p>
    <div className="space-y-4">{items.map(item => <article key={item.id} className="rounded-xl border border-bio-navy/10 bg-white p-5"><div className="flex flex-col gap-4 sm:flex-row sm:justify-between"><div><p className="text-[10px] font-bold uppercase tracking-wider text-bio-green">{item.mention_type} · {item.status}</p><h2 className="mt-1 font-extrabold text-bio-navy">{item.title || item.source_name}</h2><p className="mt-2 text-sm italic text-bio-textDark">“{item.quote || item.summary}”</p><p className="mt-2 text-xs text-bio-textMuted">{item.author_name || item.source_name} · {item.platform}</p>{item.source_url && <a href={item.source_url} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-bio-green">Abrir evidencia <ExternalLink className="w-3 h-3" /></a>}</div><div className="flex gap-2 shrink-0">{item.status !== 'published' && <button disabled={busyId === item.id} onClick={() => decide(item.id, 'published')} className="inline-flex h-9 items-center gap-1 rounded-lg bg-bio-green px-3 text-xs font-bold text-white disabled:opacity-50"><Check className="w-4 h-4" /> Aprobar</button>}{item.status !== 'rejected' && <button disabled={busyId === item.id} onClick={() => decide(item.id, 'rejected')} className="inline-flex h-9 items-center gap-1 rounded-lg border border-red-200 px-3 text-xs font-bold text-red-700 disabled:opacity-50"><X className="w-4 h-4" /> Rechazar</button>}</div></div></article>)}</div>
  </div></section>;
}
