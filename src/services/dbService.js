// Biohub Venture — Database Service
// Catálogo de startups del portafolio & Retos corporativos de innovación abierta.
// Supabase → fallback a localStorage / mockData.

import { supabase, isSupabaseEnabled } from '../lib/supabase';
import { TOP_STARTUPS } from '../data/mockData';

// ─── getStartupsDatabase ──────────────────────────────────────────────────────
export const getStartupsDatabase = async () => {
  if (isSupabaseEnabled) {
    const { data, error } = await supabase
      .from('startups')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return data.map(normalizeStartup);
    }
    if (error) console.warn('Supabase startups fetch failed, using mockData:', error.message);
  }

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
    } else {
      const { data, error } = await supabase
        .from('startups')
        .insert([{ ...payload, is_verified: false, is_prefilled: false }])
        .select()
        .single();

      if (!error) return { success: true, entry: normalizeStartup(data), isUpdate: false };
    }
  }

  return saveToLocalStorage(technologyData, existingStartupId);
};

// ─── seedStartupsIfEmpty ──────────────────────────────────────────────────────
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

// ─── CORPORATE NEEDS & BIO-MATCHMAKING ─────────────────────────────────────────

export const MOCK_CORPORATE_NEEDS = [
  {
    id: 'corp-1',
    isAnonymous: true,
    companyName: 'Empresa Confidencial',
    sector: 'Agroindustria & Exportación',
    title: 'Sustituto biológico para pesticidas químicos en cultivos de exportación de cacao',
    category: 'Biotecnología Agrícola & Bioinsumos',
    description: 'Buscamos aliarnos con startups o investigadores que cuenten con cepas microbianas autóctonas o biopesticidas formulados para control de moniliasis y escoba de bruja sin dejar residuos sintéticos.',
    urgency: '3 - 6 meses',
    estimatedBudget: 'USD $20K - $50K (Piloto Inicial)',
    country: 'Perú / Amazonía',
    collaborationTypes: ['codesarrollo', 'piloto'],
    ipExpectations: 'Co-propiedad de desarrollo de formulación o contrato de suministro exclusivo',
    status: 'open',
    createdAt: new Date().toISOString()
  },
  {
    id: 'corp-2',
    isAnonymous: false,
    companyName: 'BioPack LATAM Inc.',
    sector: 'Química & Bioempaques',
    title: 'Biopolímeros solubles en agua a partir de biomasa o residuos frutales amazónicos',
    category: 'Biomateriales & Bioempaques',
    description: 'Búsqueda de vinculación para escalamiento de películas biodegradables compostables en hogar a partir de almidón de yuca o pectinas de frutos nativos.',
    urgency: '6 - 12 meses',
    estimatedBudget: 'USD $50K - $150K',
    country: 'Colombia & Perú',
    collaborationTypes: ['codesarrollo', 'licencia', 'venture_client'],
    ipExpectations: 'Licenciamiento exclusivo para distribución industrial',
    status: 'open',
    createdAt: new Date().toISOString()
  },
  {
    id: 'corp-3',
    isAnonymous: true,
    companyName: 'Empresa Confidencial',
    sector: 'Bebidas & Superfoods',
    title: 'Microencapsulación de polifenoles de Aguaje sin alteración organoléptica en bebidas',
    category: 'Alimentos del Futuro & Superfoods',
    description: 'Corporativo líder de consumo masivo busca co-desarrollar tecnología de nano/microencapsulación para incorporar antioxidantes activos de Aguaje y Camu Camu en bebidas funcionales sin alterar sabor ni transparencia.',
    urgency: '0 - 3 meses (Inmediato)',
    estimatedBudget: 'USD $50K - $150K',
    country: 'Perú',
    collaborationTypes: ['codesarrollo', 'piloto', 'venture_client'],
    ipExpectations: 'Acuerdo de co-desarrollo patentable con derecho preferente de suministro',
    status: 'open',
    createdAt: new Date().toISOString()
  },
  {
    id: 'corp-4',
    isAnonymous: true,
    companyName: 'Empresa Confidencial',
    sector: 'Cosmética & Cuidado Personal',
    title: 'Aceites bio-refinados de Cacay y Majaz con certificación de reparto de beneficios Nagoya',
    category: 'Cosmecéutica & Bioingredientes',
    description: 'Multinacional cosmética busca vinculación con startups o cooperativas amazónicas para suministro escalable de bio-aceites prensados en frío con trazabilidad biotecnológica e impacto social verificado.',
    urgency: '6 - 12 meses',
    estimatedBudget: 'USD $150K+ (Alianza Estratégica)',
    country: 'Brasil / Colombia / Perú',
    collaborationTypes: ['transferencia', 'venture_client'],
    ipExpectations: 'Contrato de suministro comercial exclusivo a largo plazo',
    status: 'open',
    createdAt: new Date().toISOString()
  },
  {
    id: 'corp-5',
    isAnonymous: false,
    companyName: 'Danper / Aliado Agro',
    sector: 'Agroindustria & Alimentos',
    title: 'Bioremediación microbiana de suelos salinizados y degradados por cultivo intensivo',
    category: 'Biotecnología Agrícola & Bioinsumos',
    description: 'Empresa agroindustrial busca consorcios de biofertilizantes fúngicos o bacterianos que aceleren la fijación de nitrógeno y regeneren microbiota en suelos agrícolas en selva alta y costa.',
    urgency: '3 - 6 meses',
    estimatedBudget: 'USD $20K - $50K (Piloto Inicial)',
    country: 'Perú',
    collaborationTypes: ['piloto', 'codesarrollo'],
    ipExpectations: 'Licenciamiento de uso agroindustrial con royalties sobre rendimiento',
    status: 'open',
    createdAt: new Date().toISOString()
  }
];

const CORPORATE_STORAGE_KEY = 'bhv_corporate_needs_db';

export const getCorporateNeedsDatabase = async () => {
  if (isSupabaseEnabled) {
    try {
      const { data, error } = await supabase
        .from('corporate_needs')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map(row => ({
          id: row.id,
          isAnonymous: row.is_anonymous,
          companyName: row.is_anonymous ? 'Empresa Confidencial' : row.company_name,
          sector: row.sector,
          title: row.title,
          category: row.category,
          description: row.description,
          urgency: row.urgency,
          estimatedBudget: row.estimated_budget,
          country: row.country,
          collaborationTypes: row.collaboration_types || [],
          ipExpectations: row.ip_expectations,
          status: row.status || 'open',
          createdAt: row.created_at
        }));
      }
    } catch (e) {
      console.warn('Supabase corporate_needs fetch failed, using fallback:', e);
    }
  }

  try {
    const saved = localStorage.getItem(CORPORATE_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch { /* ignore */ }

  return MOCK_CORPORATE_NEEDS;
};

export const saveCorporateNeedSubmission = async (needData) => {
  const entry = {
    id: `corp-${Date.now()}`,
    isAnonymous: Boolean(needData.isAnonymous),
    companyName: needData.isAnonymous ? 'Empresa Confidencial' : (needData.companyName || 'Empresa Aliada BHV'),
    rawCompanyName: needData.companyName,
    contactPerson: needData.contactPerson,
    email: needData.email,
    whatsapp: needData.whatsapp,
    sector: needData.sector || 'Agroindustria & Alimentos',
    title: needData.title,
    category: needData.category,
    description: needData.description,
    urgency: needData.urgency || '6 - 12 meses',
    estimatedBudget: needData.estimatedBudget || 'USD $20K - $50K',
    country: needData.country || 'Perú',
    collaborationTypes: needData.collaborationTypes || ['codesarrollo'],
    ipExpectations: needData.ipExpectations || '',
    status: 'open',
    createdAt: new Date().toISOString()
  };

  if (isSupabaseEnabled) {
    try {
      const { data, error } = await supabase
        .from('corporate_needs')
        .insert([{
          is_anonymous: entry.isAnonymous,
          company_name: entry.rawCompanyName,
          contact_person: entry.contactPerson,
          email: entry.email,
          whatsapp: entry.whatsapp,
          sector: entry.sector,
          title: entry.title,
          category: entry.category,
          description: entry.description,
          urgency: entry.urgency,
          estimated_budget: entry.estimatedBudget,
          country: entry.country,
          collaboration_types: entry.collaborationTypes,
          ip_expectations: entry.ipExpectations,
          status: 'open'
        }])
        .select()
        .single();

      if (!error) return { success: true, entry };
    } catch (e) {
      console.warn('Supabase corporate_needs save failed, falling back to localStorage:', e);
    }
  }

  try {
    const list = await getCorporateNeedsDatabase();
    const updated = [entry, ...list];
    localStorage.setItem(CORPORATE_STORAGE_KEY, JSON.stringify(updated));
    return { success: true, entry };
  } catch (error) {
    return { success: false, error };
  }
};

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
