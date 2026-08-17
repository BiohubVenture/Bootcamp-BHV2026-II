// Biohub Venture — Submission Service
// Postulaciones al bootcamp y suscripciones al newsletter.
// Persiste en Supabase cuando está configurado; localStorage como fallback.

import { supabase, isSupabaseEnabled } from '../lib/supabase';

// ─── Keys de fallback (localStorage) ─────────────────────────────────────────
const SUBMISSIONS_KEY = 'bhv_submissions';
const NEWSLETTER_KEY  = 'bhv_newsletter';

const readStore = (key) => {
  try { return JSON.parse(localStorage.getItem(key) || '[]'); }
  catch { return []; }
};
const writeStore = (key, data) => {
  try { localStorage.setItem(key, JSON.stringify(data)); }
  catch (e) { console.error('submissionService write error:', e); }
};

// ─── Webhook opcional ─────────────────────────────────────────────────────────
const postToWebhook = async (payload) => {
  const url = import.meta.env.VITE_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  } catch (err) {
    console.warn('Webhook delivery failed:', err.message);
  }
};

// ─── saveApplication ──────────────────────────────────────────────────────────
/**
 * Guarda una postulación al bootcamp.
 * Supabase → tabla `applications`. Fallback: localStorage.
 * @param {object} formData
 * @returns {{ success: boolean, id: string }}
 */
export const saveApplication = async (formData) => {
  if (isSupabaseEnabled) {
    const payload = {
      startup_name:   formData.startupName,
      founder_name:   formData.founderName,
      email:          formData.email,
      country:        formData.country,
      rfs_id:         formData.rfsId,
      description:    formData.description,
      pitch_deck_url: formData.pitchDeckUrl,
      team_size:      formData.teamSize,
      source:         formData.source || 'apply_page',
      status:         'pending_review',
    };

    const { data, error } = await supabase
      .from('applications')
      .insert([payload])
      .select('id')
      .single();

    if (!error) {
      await postToWebhook({ type: 'application', ...payload });
      return { success: true, id: data.id };
    }
    console.warn('Supabase insert failed, falling back to localStorage:', error.message);
  }

  // Fallback localStorage
  const entry = { id: `APP-${Date.now()}`, type: 'application', createdAt: new Date().toISOString(), status: 'pending_review', ...formData };
  const list = readStore(SUBMISSIONS_KEY);
  list.unshift(entry);
  writeStore(SUBMISSIONS_KEY, list);
  await postToWebhook(entry);
  return { success: true, id: entry.id };
};

// ─── saveNewsletter ───────────────────────────────────────────────────────────
/**
 * Guarda una suscripción al newsletter.
 * Supabase → tabla `newsletter`. Fallback: localStorage.
 * @param {string} email
 * @returns {{ success: boolean, alreadyExists: boolean }}
 */
export const saveNewsletter = async (email) => {
  const normalized = email.trim().toLowerCase();

  if (isSupabaseEnabled) {
    const { error } = await supabase
      .from('newsletter')
      .upsert([{ email: normalized }], { onConflict: 'email', ignoreDuplicates: true });

    if (!error) {
      await postToWebhook({ type: 'newsletter', email: normalized });
      return { success: true, alreadyExists: false };
    }
    console.warn('Supabase newsletter upsert failed:', error.message);
  }

  // Fallback localStorage
  const list = readStore(NEWSLETTER_KEY);
  if (list.some(e => e.email === normalized)) return { success: true, alreadyExists: true };
  list.unshift({ email: normalized, subscribedAt: new Date().toISOString() });
  writeStore(NEWSLETTER_KEY, list);
  await postToWebhook({ type: 'newsletter', email: normalized });
  return { success: true, alreadyExists: false };
};

// ─── Admin helpers (solo para uso interno) ────────────────────────────────────
export const getApplications  = () => readStore(SUBMISSIONS_KEY);
export const getSubscribers   = () => readStore(NEWSLETTER_KEY);
