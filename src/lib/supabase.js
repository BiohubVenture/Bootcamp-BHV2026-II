// src/lib/supabase.js
// Cliente Supabase único para toda la aplicación.
// Las variables VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY se configuran en:
//   - Local:      .env.local
//   - Producción: Vercel → Settings → Environment Variables

import { createClient } from '@supabase/supabase-js';

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Si no hay credenciales (desarrollo sin .env.local), el cliente será null
// y los servicios caerán al fallback de localStorage / mockData.
export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

export const isSupabaseEnabled = Boolean(supabase);
