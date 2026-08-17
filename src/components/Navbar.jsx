import React, { useState } from 'react';
import { Menu, X, ChevronDown, Sparkles, Globe, ArrowRight, Flame, BarChart3 } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { TRANSLATIONS } from '../data/translations';

export default function Navbar({ onOpenApply, onOpenSrl, currentLang, onSelectLang }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.ES;

  const navLinks = [
    { name: t.nav.inicio, path: '/' },
    { name: t.nav.rfs, path: '/rfs' },
    { name: t.nav.bootcamp, path: '/bootcamp' },
    { name: t.nav.startups, path: '/startups' },
    { name: t.nav.servicios, path: '/servicios' },
    { name: t.nav.sobre, path: '/consorcio' },
    { name: t.nav.blog, path: '/blog' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-bio-cream/95 backdrop-blur-md border-b border-bio-navy/10 transition-all duration-300">
      
      {/* 🟢 LIVE ANNOUNCEMENT TICKER BAR ABOVE HEADER */}
      <div className="bg-bio-navy text-white text-[11px] font-bold py-2 px-4 border-b border-bio-green/30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4 text-center sm:text-left">
          
          <div className="flex items-center space-x-2 justify-center sm:justify-start">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bio-neon opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-bio-green"></span>
            </span>
            <span className="text-bio-neon font-black tracking-wider uppercase">{t.announcement.status}</span>
            <span className="hidden md:inline text-gray-400">•</span>
            <span className="hidden md:inline text-gray-200">{t.announcement.deadline}</span>
          </div>

          <div className="flex items-center space-x-3 justify-center sm:justify-end">
            <button
              onClick={onOpenSrl}
              className="bg-bio-green/20 hover:bg-bio-green/40 text-bio-neon px-2.5 py-0.5 rounded text-[10px] uppercase font-extrabold border border-bio-green/40 flex items-center transition-colors"
            >
              <BarChart3 className="w-3 h-3 mr-1" />
              <span>Evaluar Madurez SRL</span>
            </button>
            <Link
              to="/apply"
              className="text-white hover:text-bio-neon transition-colors underline decoration-bio-green decoration-2 underline-offset-2 flex items-center font-black"
            >
              <span>{t.announcement.applyLink}</span>
            </Link>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Prominent Brand Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center group">
              <img 
                src="/logoBHV.png" 
                alt="Biohub Venture Logo" 
                className="h-12 sm:h-14 w-auto object-contain transition-transform group-hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='50' viewBox='0 0 220 50'%3E%3Crect width='220' height='50' rx='8' fill='%23003D7A'/%3E%3Ctext x='15' y='32' fill='white' font-family='sans-serif' font-weight='bold' font-size='20'%3EBiohub Venture%3E%3C/text%3E%3C/svg%3E";
                }}
              />
            </Link>
          </div>

          {/* Center: Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 lg:space-x-7 text-sm font-bold mx-auto">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => 
                  `relative py-1 transition-colors group flex items-center ${
                    isActive ? 'text-bio-green font-extrabold' : 'text-bio-navy hover:text-bio-green'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.name}</span>
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-bio-green transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="hidden md:flex items-center space-x-3 flex-shrink-0 ml-auto lg:ml-0">
            
            {/* SRL Readiness Calculator Trigger */}
            <button
              onClick={onOpenSrl}
              className="flex items-center space-x-1.5 text-xs font-bold text-bio-navy border border-bio-navy/20 px-3 py-2 rounded-xl hover:bg-bio-green/10 hover:border-bio-green transition shadow-2xs"
            >
              <BarChart3 className="w-4 h-4 text-bio-green" />
              <span>Evaluar SRL</span>
            </button>

            {/* Interactive Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center space-x-1.5 text-xs font-bold text-bio-navy border border-bio-navy/20 px-3 py-2 rounded-xl hover:bg-bio-paper transition shadow-2xs"
              >
                <Globe className="w-4 h-4 text-bio-green" />
                <span>{currentLang}</span>
                <ChevronDown className="w-3.5 h-3.5 ml-0.5 text-bio-navy/60" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-bio-navy/10 rounded-xl shadow-xl py-1.5 z-50">
                  {[
                    { code: 'ES', label: 'Español' },
                    { code: 'EN', label: 'English' },
                    { code: 'PT', label: 'Português' }
                  ].map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        onSelectLang(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs font-bold transition-colors flex items-center justify-between ${
                        currentLang === l.code 
                          ? 'text-bio-green bg-bio-neon/15 font-black' 
                          : 'text-bio-navy hover:bg-bio-cream'
                      }`}
                    >
                      <span>{l.label}</span>
                      {currentLang === l.code && <span className="w-1.5 h-1.5 rounded-full bg-bio-green" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Apply Button */}
            <button
              onClick={() => navigate('/apply')}
              className="relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold text-white bg-bio-green rounded-xl shadow-md hover:bg-bio-greenDark hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <Sparkles className="w-4 h-4 mr-1.5 text-bio-neon" />
              <span>{t.nav.applyBtn}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={onOpenSrl}
              className="px-2.5 py-1.5 text-xs font-bold text-bio-navy bg-bio-cream border border-bio-navy/20 rounded-lg flex items-center"
            >
              <BarChart3 className="w-3.5 h-3.5 text-bio-green mr-1" />
              <span>SRL</span>
            </button>

            <button
              onClick={() => navigate('/apply')}
              className="px-3.5 py-2 text-xs font-bold text-white bg-bio-green rounded-lg"
            >
              {t.nav.applyBtn}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-bio-navy hover:text-bio-green focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-bio-paper border-b border-bio-navy/10 px-4 pt-2 pb-6 space-y-3">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-bold transition-colors ${
                    isActive ? 'bg-bio-green text-white font-extrabold' : 'text-bio-navy hover:bg-bio-cream hover:text-bio-green'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="pt-4 border-t border-bio-navy/10 flex items-center justify-between">
            <div className="flex space-x-2 text-xs font-bold">
              {['ES', 'EN', 'PT'].map((l) => (
                <button
                  key={l}
                  onClick={() => onSelectLang(l)}
                  className={`px-3 py-1.5 rounded ${currentLang === l ? 'bg-bio-navy text-white font-black' : 'bg-white text-bio-navy'}`}
                >
                  {l}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/apply');
              }}
              className="px-5 py-2 text-sm font-bold text-white bg-bio-green rounded-lg"
            >
              {t.nav.applyBtn}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
