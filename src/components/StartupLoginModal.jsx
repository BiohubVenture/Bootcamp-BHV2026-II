import React, { useState, useEffect, useRef } from 'react';
import { X, Building2, CheckCircle2, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { TOP_STARTUPS } from '../data/mockData';
import { signInWithGoogle, getSession } from '../services/authService';
import { isSupabaseEnabled } from '../lib/supabase';

export default function StartupLoginModal({ isOpen, onClose, onLoginSuccess, preSelectedStartup }) {
  const [selectedStartupId, setSelectedStartupId] = useState(
    preSelectedStartup ? String(preSelectedStartup.id) : '1'
  );
  const [customStartupName, setCustomStartupName] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const closeRef                = useRef(null);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Focus on open
  useEffect(() => {
    if (isOpen && closeRef.current) closeRef.current.focus();
  }, [isOpen]);

  // Si ya hay sesión activa cuando se abre el modal, auto-login
  useEffect(() => {
    if (!isOpen || !isSupabaseEnabled) return;
    getSession().then(({ user }) => {
      if (user) {
        const startupObj = TOP_STARTUPS.find(s => String(s.id) === selectedStartupId);
        const userSession = {
          email:       user.email,
          name:        user.user_metadata?.full_name,
          avatarUrl:   user.user_metadata?.avatar_url,
          startupId:   startupObj?.id ?? null,
          startupName: startupObj?.name ?? 'Nueva Startup',
          verified:    true,
          role:        'founder',
        };
        localStorage.setItem('bhv_startup_user', JSON.stringify(userSession));
        if (onLoginSuccess) onLoginSuccess(userSession, startupObj);
        onClose();
      }
    });
  }, [isOpen]);

  if (!isOpen) return null;

  const isCustomNew  = selectedStartupId === 'new';
  const foundStartup = TOP_STARTUPS.find(s => String(s.id) === selectedStartupId);

  // ── Google OAuth Action ───────────────────────────────────────────────────
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');

    if (isSupabaseEnabled) {
      const { error: authError } = await signInWithGoogle();
      if (authError) {
        setError(authError.message || 'Error al iniciar sesión con Google.');
        setLoading(false);
      }
      // Redirige a callback si tiene éxito
    } else {
      // Simulación inmediata de Google login para entorno sin Supabase
      setTimeout(() => {
        const startupObj = isCustomNew
          ? { name: customStartupName || 'Nueva BioStartup', isNew: true }
          : foundStartup;

        const userSession = {
          email:       'founder.google@biohubventure.com',
          name:        'Founder Google User',
          avatarUrl:   'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          startupId:   isCustomNew ? null : foundStartup?.id,
          startupName: isCustomNew ? (customStartupName || 'Nueva Startup') : foundStartup?.name,
          verified:    true,
          role:        'founder',
        };
        localStorage.setItem('bhv_startup_user', JSON.stringify(userSession));
        if (onLoginSuccess) onLoginSuccess(userSession, startupObj);
        setLoading(false);
        onClose();
      }, 600);
    }
  };

  // ── Acceso Rápido Directo ────────────────────────────────────────────────
  const handleDirectLogin = (e) => {
    e.preventDefault();
    const startupObj = isCustomNew
      ? { name: customStartupName || 'Nueva BioStartup', isNew: true }
      : foundStartup;

    const userSession = {
      email:       'demo@biohubventure.com',
      name:        foundStartup?.founders?.[0] || 'BioFounder',
      startupId:   isCustomNew ? null : foundStartup?.id,
      startupName: isCustomNew ? (customStartupName || 'Nueva Startup') : foundStartup?.name,
      verified:    true,
      role:        'founder',
    };
    localStorage.setItem('bhv_startup_user', JSON.stringify(userSession));
    if (onLoginSuccess) onLoginSuccess(userSession, startupObj);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bio-navyDeep/80 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-bio-navy/10 relative">

        {/* Close */}
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Cerrar modal de acceso"
          className="absolute top-6 right-6 p-2 rounded-full bg-bio-cream hover:bg-bio-navy/10 text-bio-navy transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-bio-green/15 text-bio-green flex items-center justify-center mx-auto border border-bio-green/30">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 id="login-modal-title" className="text-2xl font-extrabold text-bio-navy">
            Acceso al Portal de Startups
          </h3>
          <p className="text-xs text-bio-textMuted leading-relaxed">
            Inicia sesión con tu cuenta para acceder a la gestión y actualización de tu <strong>ficha tecnológica BHV</strong>.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
            {error}
          </div>
        )}

        {/* Startup Selector */}
        <div className="space-y-1 text-xs">
          <label htmlFor="login-startup-select" className="flex items-center justify-between font-extrabold text-bio-navy">
            <span>Selecciona tu Startup en el Portafolio:</span>
            <span className="text-[10px] text-bio-greenDark font-bold">● Datos pre-cargados listos</span>
          </label>
          <select
            id="login-startup-select"
            value={selectedStartupId}
            onChange={(e) => setSelectedStartupId(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border-2 border-bio-green/40 focus:outline-none focus:border-bio-green bg-bio-cream/40 text-bio-navy font-bold text-xs"
          >
            {TOP_STARTUPS.map(s => (
              <option key={s.id} value={String(s.id)}>
                {s.rank} — {s.name} ({s.country} • {s.category})
              </option>
            ))}
            <option value="new">+ Registrar una nueva startup no listada</option>
          </select>
        </div>

        {isCustomNew && (
          <div className="text-xs">
            <label htmlFor="login-custom-name" className="block font-bold text-bio-navy mb-1">
              Nombre de la Nueva Startup *
            </label>
            <input
              id="login-custom-name"
              type="text"
              value={customStartupName}
              onChange={(e) => setCustomStartupName(e.target.value)}
              placeholder="Nombre oficial de tu empresa"
              className="w-full px-3.5 py-2.5 rounded-xl border border-bio-navy/15 focus:outline-none focus:border-bio-green bg-bio-paper/30 text-bio-navy font-bold"
            />
          </div>
        )}

        {!isCustomNew && foundStartup && (
          <div className="p-3 rounded-2xl bg-bio-green/10 border border-bio-green/30 text-bio-navy text-[11px] space-y-1">
            <div className="flex items-center space-x-1.5 font-extrabold text-bio-greenDark">
              <CheckCircle2 className="w-3.5 h-3.5 text-bio-green" />
              <span>Ficha pre-cargada encontrada:</span>
            </div>
            <p className="text-bio-textMuted leading-relaxed">
              <strong>{foundStartup.name}</strong> ({foundStartup.country}) • {foundStartup.srlLevel}.
            </p>
          </div>
        )}

        {/* ── BOTÓN DESTACADO: CONTINUAR CON GOOGLE (SIEMPRE VISIBLE) ── */}
        <div className="space-y-3 pt-1">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-3.5 rounded-2xl border-2 border-gray-200 hover:border-bio-navy/30 bg-white hover:bg-gray-50 text-bio-navy font-extrabold text-xs sm:text-sm flex items-center justify-center space-x-3 transition-all shadow-sm hover:shadow-md disabled:opacity-60 cursor-pointer"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin text-bio-green" />
            ) : (
              <>
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Continuar con Google</span>
              </>
            )}
          </button>

          {/* Divisor */}
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-3 text-[10px] text-gray-400 font-bold uppercase">o acceso directo</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Botón de acceso directo secundario */}
          <button
            type="button"
            onClick={handleDirectLogin}
            className="w-full py-2.5 rounded-xl bg-bio-cream hover:bg-bio-paper text-bio-navy font-bold text-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <span>Acceder directamente como {foundStartup?.name || 'Founder'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-bio-green" />
          </button>
        </div>

        <div className="text-center pt-2 border-t border-bio-navy/10 text-[11px] text-bio-textMuted">
          Biohub Venture Database • Plataforma de aceleración biotecnológica
        </div>

      </div>
    </div>
  );
}
