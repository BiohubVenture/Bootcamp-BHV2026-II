import React, { useState, useEffect, useRef } from 'react';
import { X, Building2, CheckCircle2, ArrowRight, Loader2, Sparkles, Award, Rocket, FileText } from 'lucide-react';
import { TOP_STARTUPS } from '../data/mockData';
import { signInWithGoogle, getSession } from '../services/authService';
import { isSupabaseEnabled } from '../lib/supabase';

export default function StartupLoginModal({ isOpen, onClose, onLoginSuccess, preSelectedStartup }) {
  // Entry choice: 'alumni' or 'applicant'
  const [entryType, setEntryType] = useState('alumni');
  const [selectedStartupId, setSelectedStartupId] = useState(
    preSelectedStartup ? String(preSelectedStartup.id) : '1'
  );
  const [applicantStartupName, setApplicantStartupName] = useState('');
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

  if (!isOpen) return null;

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
    } else {
      setTimeout(() => {
        const isApplicant = entryType === 'applicant';
        const startupObj = isApplicant
          ? { name: applicantStartupName || 'Mi BioStartup Postulante', isApplicant: true }
          : foundStartup;

        const userSession = {
          email:       'founder.google@biohubventure.com',
          name:        'Founder User',
          avatarUrl:   'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          startupId:   isApplicant ? null : foundStartup?.id,
          startupName: isApplicant ? (applicantStartupName || 'Mi BioStartup Postulante') : foundStartup?.name,
          verified:    true,
          role:        isApplicant ? 'applicant' : 'alumni',
        };
        localStorage.setItem('bhv_startup_user', JSON.stringify(userSession));
        if (onLoginSuccess) onLoginSuccess(userSession, startupObj);
        setLoading(false);
        onClose();
      }, 600);
    }
  };

  // ── Acceso Directo Alumni ────────────────────────────────────────────────
  const handleDirectAlumniLogin = (e) => {
    e.preventDefault();
    const userSession = {
      email:       'alumni@biohubventure.com',
      name:        foundStartup?.founders?.[0] || 'BioFounder Alumni',
      startupId:   foundStartup?.id,
      startupName: foundStartup?.name,
      verified:    true,
      role:        'alumni',
    };
    localStorage.setItem('bhv_startup_user', JSON.stringify(userSession));
    if (onLoginSuccess) onLoginSuccess(userSession, foundStartup);
    onClose();
  };

  // ── Acceso Onboarding Postulante ──────────────────────────────────────────
  const handleDirectApplicantLogin = (e) => {
    e.preventDefault();
    const userSession = {
      email:       'postulante@biohubventure.com',
      name:        'BioFounder Postulante 2026-II',
      startupId:   null,
      startupName: applicantStartupName || 'Mi Proyecto / Startup Biotecnológica',
      verified:    false,
      role:        'applicant',
    };
    localStorage.setItem('bhv_startup_user', JSON.stringify(userSession));
    if (onLoginSuccess) onLoginSuccess(userSession, { name: userSession.startupName, isApplicant: true });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-bio-navyDeep/85 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-bio-green/30 relative">

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
            Portal de Startups BHV
          </h3>
          <p className="text-xs text-bio-textMuted leading-relaxed">
            Identifica tu estado para ingresar al espacio correspondiente:
          </p>
        </div>

        {/* ── SELECTOR PRINCIPAL: ALUMNI vs POSTULANTE ── */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-bio-cream rounded-2xl border border-bio-navy/10">
          <button
            type="button"
            onClick={() => setEntryType('alumni')}
            className={`py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
              entryType === 'alumni'
                ? 'bg-bio-navy text-white shadow-sm'
                : 'text-bio-navy/70 hover:text-bio-navy'
            }`}
          >
            <Award className="w-4 h-4 text-bio-green" />
            <span>Soy Startup Alumni</span>
          </button>

          <button
            type="button"
            onClick={() => setEntryType('applicant')}
            className={`py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
              entryType === 'applicant'
                ? 'bg-bio-green text-white shadow-sm'
                : 'text-bio-navy/70 hover:text-bio-navy'
            }`}
          >
            <Rocket className="w-4 h-4 text-bio-neon" />
            <span>Quiero Postular</span>
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
            {error}
          </div>
        )}

        {/* ── CASO 1: SOY STARTUP ALUMNI ── */}
        {entryType === 'alumni' && (
          <div className="space-y-4 animate-fadeIn">
            
            <div className="space-y-1 text-xs">
              <label htmlFor="login-startup-select" className="flex items-center justify-between font-extrabold text-bio-navy">
                <span>Selecciona tu Startup en el Portafolio:</span>
                <span className="text-[10px] text-bio-greenDark font-bold">● Certificado Blockchain</span>
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
              </select>
            </div>

            {foundStartup && (
              <div className="p-3.5 rounded-2xl bg-bio-green/10 border border-bio-green/30 text-bio-navy text-[11px] space-y-1">
                <div className="flex items-center space-x-1.5 font-extrabold text-bio-greenDark">
                  <CheckCircle2 className="w-3.5 h-3.5 text-bio-green" />
                  <span>Startup Certificada Encontrada:</span>
                </div>
                <p className="text-bio-textMuted leading-relaxed">
                  <strong>{foundStartup.name}</strong> ({foundStartup.country}) • Egresada con Sello Oficial Alumni.
                </p>
              </div>
            )}

            {/* Google login for Alumni */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-3.5 rounded-2xl border-2 border-gray-200 hover:border-bio-navy/30 bg-white hover:bg-gray-50 text-bio-navy font-extrabold text-xs sm:text-sm flex items-center justify-center space-x-3 transition-all shadow-sm cursor-pointer disabled:opacity-60"
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

            <button
              type="button"
              onClick={handleDirectAlumniLogin}
              className="w-full py-2.5 rounded-xl bg-bio-cream hover:bg-bio-paper text-bio-navy font-bold text-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <span>Acceder directamente como {foundStartup?.name}</span>
              <ArrowRight className="w-3.5 h-3.5 text-bio-green" />
            </button>

          </div>
        )}

        {/* ── CASO 2: QUIERO POSTULAR (POSTULANTE 2026-II) ── */}
        {entryType === 'applicant' && (
          <div className="space-y-4 animate-fadeIn">
            
            {/* Callout de Incentivo a la Postulación */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-bio-navy to-bio-navyDeep text-white border border-bio-green/30 space-y-2">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-bio-neon animate-pulse" />
                <span className="text-[11px] font-mono font-black text-bio-neon uppercase tracking-wider">
                  ¿Aún no has postulado? Convocatoria 2026-II
                </span>
              </div>
              <p className="text-xs text-gray-200 leading-relaxed">
                Ingresa al <strong>Onboarding de Admisión</strong> para conocer los 4 pasos, estructurar tu memoria técnica en Paténtame y acceder al formulario oficial.
              </p>
            </div>

            <div className="space-y-1 text-xs">
              <label htmlFor="applicant-startup-name" className="block font-bold text-bio-navy">
                Nombre de tu Proyecto / Startup (Opcional):
              </label>
              <input
                id="applicant-startup-name"
                type="text"
                value={applicantStartupName}
                onChange={(e) => setApplicantStartupName(e.target.value)}
                placeholder="Ej. BioAmazonTech / Mi Proyecto Biotecnológico"
                className="w-full px-3.5 py-2.5 rounded-xl border border-bio-navy/15 focus:outline-none focus:border-bio-green bg-bio-paper/30 font-bold text-bio-navy text-xs"
              />
            </div>

            {/* Primary Action Button for Applicants */}
            <button
              type="button"
              onClick={handleDirectApplicantLogin}
              className="w-full py-3.5 rounded-2xl bg-bio-green hover:bg-bio-greenDark text-white font-extrabold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer"
            >
              <span>Comenzar Onboarding de Postulación</span>
              <ArrowRight className="w-4 h-4 text-bio-neon" />
            </button>

            <div className="text-center">
              <span className="text-[11px] text-bio-textMuted">
                Cierre de postulaciones: <strong>15 de Septiembre 2026</strong> • 15 cupos disponibles
              </span>
            </div>

          </div>
        )}

        <div className="text-center pt-2 border-t border-bio-navy/10 text-[11px] text-bio-textMuted">
          Biohub Venture Database • Plataforma oficial de aceleración biotecnológica
        </div>

      </div>
    </div>
  );
}
