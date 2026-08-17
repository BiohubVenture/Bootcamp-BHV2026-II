// Biohub Venture — Auth Service
// Centraliza toda la autenticación con Supabase (Google OAuth, sesión, logout).

import { supabase, isSupabaseEnabled } from '../lib/supabase';

// ─── Google OAuth ─────────────────────────────────────────────────────────────

/**
 * Inicia el flujo de login con Google OAuth.
 * Redirige al usuario a Google y, al completar, vuelve a /auth/callback.
 */
export const signInWithGoogle = async () => {
  if (!isSupabaseEnabled) {
    console.warn('Supabase no está configurado. Configura .env.local para activar Google OAuth.');
    return { error: { message: 'Backend no configurado' } };
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'select_account',
      },
    },
  });

  return { data, error };
};

// ─── Sesión ───────────────────────────────────────────────────────────────────

/**
 * Obtiene la sesión actual del usuario.
 * @returns {{ session: Session | null, user: User | null }}
 */
export const getSession = async () => {
  if (!isSupabaseEnabled) return { session: null, user: null };

  const { data: { session } } = await supabase.auth.getSession();
  return { session, user: session?.user ?? null };
};

/**
 * Cierra la sesión del usuario.
 */
export const signOut = async () => {
  if (!isSupabaseEnabled) return;
  await supabase.auth.signOut();
};

/**
 * Suscribe a cambios de estado de autenticación.
 * @param {(session: Session | null) => void} callback
 * @returns {() => void} Función para cancelar la suscripción
 */
export const onAuthStateChange = (callback) => {
  if (!isSupabaseEnabled) return () => {};

  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (_event, session) => callback(session)
  );
  return () => subscription.unsubscribe();
};

// ─── Perfil del Founder ───────────────────────────────────────────────────────

/**
 * Obtiene el perfil del founder desde la tabla `profiles`.
 * Incluye el startup_id asociado para pre-cargar su ficha.
 * @param {string} userId
 */
export const getFounderProfile = async (userId) => {
  if (!isSupabaseEnabled) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*, startups(*)')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching founder profile:', error.message);
    return null;
  }
  return data;
};

/**
 * Asocia un founder (usuario autenticado) con una startup del catálogo.
 * @param {string} userId
 * @param {string} startupId
 */
export const claimStartup = async (userId, startupId) => {
  if (!isSupabaseEnabled) return { success: false };

  // Marca la startup con el owner
  const { error: startupError } = await supabase
    .from('startups')
    .update({ owner_user_id: userId })
    .eq('id', startupId)
    .is('owner_user_id', null); // Solo si nadie la ha reclamado

  if (startupError) return { success: false, error: startupError };

  // Actualiza el perfil con el startup_id
  const { error: profileError } = await supabase
    .from('profiles')
    .update({ startup_id: startupId })
    .eq('id', userId);

  if (profileError) return { success: false, error: profileError };

  return { success: true };
};
