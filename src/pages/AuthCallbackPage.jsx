// AuthCallbackPage.jsx
// Página de retorno después de Google OAuth.
// Supabase maneja el token automáticamente via detectSessionInUrl: true.
// Esta página simplemente muestra un loader y redirige al usuario a /startups.

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase detecta automáticamente el token en la URL y actualiza la sesión.
    // Esperamos un tick para que el cliente procese el hash de la URL.
    const timer = setTimeout(() => {
      navigate('/startups', { replace: true });
    }, 1500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-bio-cream flex items-center justify-center">
      <div className="text-center space-y-4">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-bio-green/30 border-t-bio-green rounded-full animate-spin mx-auto" />
        <p className="text-bio-navy font-bold text-sm">Iniciando sesión…</p>
        <p className="text-bio-textMuted text-xs">Te redirigiremos en un momento.</p>
      </div>
    </div>
  );
}
