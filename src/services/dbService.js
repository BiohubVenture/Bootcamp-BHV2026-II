// Biohub Venture — Database Service
// Catálogo de startups del portafolio.
// Supabase (tabla `startups`) → fallback a mockData.

import { supabase, isSupabaseEnabled } from '../lib/supabase';
import { TOP_STARTUPS } from '../data/mockData';

// ─── getStartupsDatabase ──────────────────────────────────────────────────────
/**
 * Obtiene el catálogo completo de startups.
 * Supabase → fallback a mockData si DB no está disponible.
 * @returns {Promise<Array>}
 */
export const getStartupsDatabase = async () => {
  if (isSupabaseEnabled) {
    const { data, error } = await supabase
      .from('startups')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      // Normaliza el schema de Supabase al formato que espera el frontend
      return data.map(normalizeStartup);
    }
    if (error) console.warn('Supabase startups fetch failed, using mockData:', error.message);
  }

  // Fallback: localStorage o mockData
  try {
    const saved = localStorage.getItem('bhv_startups_db');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch { /* ignore */ }

  return TOP_STARTUPS;
};

// ─── saveTechnologySubmission ─────────────────────────────────────────────────
/**
 * Crea o actualiza una startup en la DB.
 * Supabase → fallback a localStorage.
 * @param {object} technologyData
 * @param {string|null} existingStartupId — UUID de la startup a actualizar
 * @returns {{ success: boolean, entry: object, isUpdate: boolean }}
 */
export const saveTechnologySubmission = async (technologyData, existingStartupId = null) => {
  if (isSupabaseEnabled) {
    const payload = buildSupabasePayload(technologyData);

    if (existingStartupId) {
      const { data, error } = await supabase
        .from('startups')
        .update({ ...payload, updated_at: new Date().toISOString(), is_prefilled: false })
        .eq('id', existingStartupId)
        .select()
        .single();

      if (!error) return { success: true, entry: normalizeStartup(data), isUpdate: true };
      console.warn('Supabase update failed, falling back to localStorage:', error.message);
    } else {
      const { data, error } = await supabase
        .from('startups')
        .insert([{ ...payload, is_verified: false, is_prefilled: false }])
        .select()
        .single();

      if (!error) return { success: true, entry: normalizeStartup(data), isUpdate: false };
      console.warn('Supabase insert failed, falling back to localStorage:', error.message);
    }
  }

  // Fallback: localStorage (comportamiento anterior)
  return saveToLocalStorage(technologyData, existingStartupId);
};

// ─── seedStartupsIfEmpty ──────────────────────────────────────────────────────
/**
 * Carga los startups de mockData en Supabase si la tabla está vacía.
 * Útil para el primer despliegue.
 * Solo debe llamarse desde una herramienta de admin, no desde el frontend público.
 */
export const seedStartupsIfEmpty = async () => {
  if (!isSupabaseEnabled) return { seeded: false, reason: 'Supabase not configured' };

  const { count } = await supabase.from('startups').select('*', { count: 'exact', head: true });
  if (count > 0) return { seeded: false, reason: 'Already has data' };

  const rows = TOP_STARTUPS.map(s => ({
    name:         s.name,
    tagline:      s.tagline,
    description:  s.description,
    category:     s.category,
    country:      s.country,
    stage:        s.stage,
    srl_level:    s.srlLevel,
    badge:        s.badge,
    website:      s.website,
    linkedin:     s.linkedin,
    whatsapp:     s.whatsapp,
    image_url:    s.image,
    metrics:      s.metrics,
    achievements: s.achievements,
    is_verified:  true,
    is_prefilled: true,
  }));

  const { error } = await supabase.from('startups').insert(rows);
  if (error) return { seeded: false, error: error.message };
  return { seeded: true, count: rows.length };
};

// ─── Helpers internos ─────────────────────────────────────────────────────────

/** Convierte un row de Supabase al formato de objeto que usa el frontend */
const normalizeStartup = (row) => ({
  id:          row.id,
  name:        row.name,
  tagline:     row.tagline,
  description: row.description,
  category:    row.category,
  country:     row.country,
  stage:       row.stage,
  srlLevel:    row.srl_level,
  badge:       row.badge,
  website:     row.website,
  linkedin:    row.linkedin,
  whatsapp:    row.whatsapp,
  image:       row.image_url,
  metrics:     row.metrics,
  achievements: row.achievements || [],
  isVerifiedByFounder: !row.is_prefilled,
  updatedAt:   row.updated_at,
  createdAt:   row.created_at,
});

/** Convierte datos del formulario al schema de Supabase */
const buildSupabasePayload = (d) => ({
  name:         d.ownerName,
  tagline:      d.title,
  description:  d.shortSummary || d.description,
  category:     d.category,
  country:      d.developedIn,
  stage:        d.investmentSought === 'Yes' ? `Buscando Inversión (${d.investmentAmount || 'Pre-Seed'})` : 'Validación MVP',
  srl_level:    d.trlLevel,
  website:      d.website,
  whatsapp:     d.whatsapp,
  metrics:      d.summaryOfBenefits,
  achievements: d.technologyAppraisal ? [d.technologyAppraisal, d.ipStatus].filter(Boolean) : [d.ipStatus].filter(Boolean),
});

/** Fallback a localStorage cuando Supabase no está disponible */
const saveToLocalStorage = async (technologyData, existingStartupId) => {
  try {
    const STORAGE_KEY = 'bhv_startups_db';
    const currentList = await getStartupsDatabase();

    if (existingStartupId) {
      const updatedList = currentList.map(item => {
        if (item.id === existingStartupId) {
          return {
            ...item,
            name:        technologyData.ownerName    || item.name,
            category:    technologyData.category     || item.category,
            tagline:     technologyData.title        || item.tagline,
            description: technologyData.shortSummary || item.description,
            country:     technologyData.developedIn  || item.country,
            founders:    technologyData.contactPerson ? [technologyData.contactPerson] : item.founders,
            srlLevel:    technologyData.trlLevel     || item.srlLevel,
            website:     technologyData.website      || item.website,
            whatsapp:    technologyData.whatsapp     || item.whatsapp,
            updatedAt:   new Date().toISOString(),
            isVerifiedByFounder: true,
          };
        }
        return item;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      return { success: true, entry: updatedList.find(i => i.id === existingStartupId), isUpdate: true };
    } else {
      const newEntry = {
        id:          `local-${Date.now()}`,
        name:        technologyData.ownerName || 'Nueva BioStartup',
        category:    technologyData.category  || 'FoodTech & Bioinsumos',
        tagline:     technologyData.title     || 'Solución en Validación',
        description: technologyData.shortSummary,
        country:     technologyData.developedIn || 'Perú',
        stage:       'Validación MVP',
        badge:       'En Validación BHV',
        srlLevel:    technologyData.trlLevel,
        website:     technologyData.website,
        whatsapp:    technologyData.whatsapp,
        createdAt:   new Date().toISOString(),
        isVerifiedByFounder: true,
      };
      const updatedList = [newEntry, ...currentList];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      return { success: true, entry: newEntry, isUpdate: false };
    }
  } catch (error) {
    return { success: false, error };
  }
};
