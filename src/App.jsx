import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ApplyModal from './components/ApplyModal';
import SrlAssessmentModal from './components/SrlAssessmentModal';
import FloatingCta from './components/FloatingCta';
import ErrorBoundary from './components/ErrorBoundary';

import HomePage from './pages/HomePage';
import RfsPage from './pages/RfsPage';
import BootcampPage from './pages/BootcampPage';
import StartupsPage from './pages/StartupsPage';
import ServicesPage from './pages/ServicesPage';
import ConsorcioPage from './pages/ConsorcioPage';
import BlogPage from './pages/BlogPage';
import ApplyPage from './pages/ApplyPage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import MentionsPage from './pages/MentionsPage';
import MentionsReviewPage from './pages/MentionsReviewPage';
import { onAuthStateChange, getSession } from './services/authService';

export default function App() {
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [srlModalOpen, setSrlModalOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(
    () => localStorage.getItem('bhv_lang') || 'ES'
  );

  const handleSelectLang = useCallback((lang) => {
    setCurrentLang(lang);
    localStorage.setItem('bhv_lang', lang);
  }, []);

  // ── Sesión de autenticación (Google OAuth) ──────────────────────────────────
  const [session, setSession] = useState(null);
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    // Carga la sesión inicial
    getSession().then(({ session, user }) => {
      setSession(session);
      setAuthUser(user);
    });
    // Escucha cambios (login, logout, token refresh)
    const unsubscribe = onAuthStateChange((newSession) => {
      setSession(newSession);
      setAuthUser(newSession?.user ?? null);
    });
    return unsubscribe;
  }, []);

  return (
    <ErrorBoundary>
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-bio-cream flex flex-col font-sans selection:bg-bio-neon selection:text-bio-navyDark">
        
        {/* Top Navbar with Live Announcement Bar & Language Selector */}
        <Navbar 
          onOpenApply={() => setApplyModalOpen(true)}
          onOpenSrl={() => setSrlModalOpen(true)}
          currentLang={currentLang}
          onSelectLang={handleSelectLang}
        />

        {/* Multi-page Views */}
        <main className="flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage 
                  onOpenApply={() => setApplyModalOpen(true)} 
                  onOpenSrl={() => setSrlModalOpen(true)}
                  currentLang={currentLang} 
                />
              } 
            />
            <Route 
              path="/rfs" 
              element={
                <RfsPage 
                  onOpenApply={() => setApplyModalOpen(true)} 
                  currentLang={currentLang} 
                />
              } 
            />
            <Route 
              path="/bootcamp" 
              element={
                <BootcampPage 
                  onOpenApply={() => setApplyModalOpen(true)} 
                  currentLang={currentLang} 
                />
              } 
            />
            <Route 
              path="/startups" 
              element={
                <StartupsPage 
                  currentLang={currentLang}
                  authUser={authUser}
                /> 
              } 
            />
            <Route 
              path="/servicios" 
              element={
                <ServicesPage 
                  currentLang={currentLang} 
                />
              } 
            />
            <Route 
              path="/consorcio" 
              element={
                <ConsorcioPage 
                  currentLang={currentLang} 
                />
              } 
            />
            <Route 
              path="/blog" 
              element={
                <BlogPage 
                  currentLang={currentLang} 
                />
              } 
            />
            <Route 
              path="/apply" 
              element={
                <ApplyPage 
                  currentLang={currentLang} 
                  onOpenSrl={() => setSrlModalOpen(true)}
                />
              } 
            />
            <Route path="/auth/callback" element={<AuthCallbackPage />} />
            <Route path="/menciones" element={<MentionsPage />} />
            <Route path="/admin/menciones" element={<MentionsReviewPage />} />
          </Routes>
        </main>

        {/* Multi-page Footer */}
        <Footer currentLang={currentLang} />

        {/* Global Floating Quick-Apply CTA */}
        <FloatingCta currentLang={currentLang} />

        {/* Global Application Modal */}
        <ApplyModal 
          isOpen={applyModalOpen} 
          onClose={() => setApplyModalOpen(false)} 
          currentLang={currentLang}
        />

        {/* Global Startup Readiness Level (SRL) Diagnostic Modal */}
        <SrlAssessmentModal
          isOpen={srlModalOpen}
          onClose={() => setSrlModalOpen(false)}
          onOpenApply={() => setApplyModalOpen(true)}
        />

      </div>
    </Router>
    </ErrorBoundary>
  );
}
