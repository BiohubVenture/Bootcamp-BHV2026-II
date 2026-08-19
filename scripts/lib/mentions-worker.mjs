import { createClient } from '@supabase/supabase-js';
import { readFile } from 'node:fs/promises';

const requiredEnvironment = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY'];

export async function loadWatchlist() {
  const raw = await readFile(new URL('../../data/mentions-watchlist.json', import.meta.url), 'utf8');
  return JSON.parse(raw);
}

export function createWorkerClient() {
  const missing = requiredEnvironment.filter((key) => !process.env[key]);
  if (missing.length) throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function normalizeUrl(value) {
  const url = new URL(value);
  url.hash = '';
  for (const key of [...url.searchParams.keys()]) {
    if (key.startsWith('utm_') || ['gclid', 'fbclid'].includes(key)) url.searchParams.delete(key);
  }
  return url.toString();
}

export function classifyMention({ title = '', summary = '' }) {
  const text = `${title} ${summary}`.toLowerCase();
  if (/premio|award|ganador|finalista|reconocid/.test(text)) return 'award';
  if (/entrevista|noticia|news|reportaje|comunicado/.test(text)) return 'news';
  if (/testimonio|gracias|felicit/.test(text)) return 'testimonial';
  return 'mention';
}

export function matchEntities(text, entities) {
  const normalized = text.toLocaleLowerCase('es');
  return entities.filter((entity) => normalized.includes(entity.toLocaleLowerCase('es')));
}

export async function upsertMentions(client, mentions) {
  if (!mentions.length) return { inserted: 0 };
  const { error } = await client
    .from('media_mentions')
    .upsert(mentions, { onConflict: 'dedupe_key', ignoreDuplicates: true });
  if (error) throw new Error(`Supabase upsert failed: ${error.message}`);
  return { inserted: mentions.length };
}
