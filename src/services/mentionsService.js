import { isSupabaseEnabled, supabase } from '../lib/supabase';
import { TESTIMONIALS } from '../data/mockData';
import { INITIAL_PUBLISHED_MENTIONS } from '../data/initialMentions';

const PUBLIC_FIELDS = 'id,source_url,source_name,platform,author_name,author_role,title,quote,summary,mention_type,related_entities,occurred_at,published_at';

const legacyTestimonials = TESTIMONIALS.map((item, index) => ({
  id: `fallback-${index}`,
  quote: item.quote,
  author_name: item.name,
  author_role: item.role,
  source_name: item.company,
  mention_type: 'testimonial',
  related_entities: [item.company],
  source_url: null,
  isFallback: true,
}));

const fallbackMentions = INITIAL_PUBLISHED_MENTIONS.length ? INITIAL_PUBLISHED_MENTIONS : legacyTestimonials;

export const getPublishedMentions = async ({ limit } = {}) => {
  if (!isSupabaseEnabled) return fallbackMentions;

  const query = supabase
    .from('media_mentions')
    .select(PUBLIC_FIELDS)
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (limit) query.limit(limit);
  const { data, error } = await query;
  if (error) {
    console.warn('Published mentions fetch failed:', error.message);
    return fallbackMentions;
  }
  return data?.length ? data : fallbackMentions;
};

export const getReviewQueue = async () => {
  if (!isSupabaseEnabled) return { data: [], error: 'Supabase no está configurado.' };
  const { data, error } = await supabase
    .from('media_mentions')
    .select('*')
    .order('created_at', { ascending: false });
  return { data: data || [], error: error?.message || null };
};

export const reviewMention = async (id, status, moderationNote = '') => {
  if (!isSupabaseEnabled) return { error: 'Supabase no está configurado.' };
  const reviewedAt = new Date().toISOString();
  const payload = {
    status,
    moderation_note: moderationNote || null,
    reviewed_at: reviewedAt,
    updated_at: reviewedAt,
    ...(status === 'published' ? { published_at: reviewedAt } : {}),
  };
  const { data: { user } } = await supabase.auth.getUser();
  if (user) payload.reviewed_by = user.id;
  const { data, error } = await supabase
    .from('media_mentions')
    .update(payload)
    .eq('id', id)
    .select()
    .single();
  return { data, error: error?.message || null };
};
