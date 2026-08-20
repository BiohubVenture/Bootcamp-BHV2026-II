import React, { useState } from 'react';
import { Menu, X, ChevronDown, Sparkles, Globe, ArrowRight, Flame, BarChart3, ShieldCheck } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { TRANSLATIONS } from '../data/translations';
import bhvLogo from '../assets/logoBHV.png';

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
              className="bg-bio-green/20 hover:bg-bio-green/40 text-bio-neon px-2.5 py-0.5 rounded text-[10px] uppercase font-extrabold border border-bio-green/40 flex items-center transition-colors cursor-pointer"
            >
              <BarChart3 className="w-3 h-3 mr-1" />
              <span>Evaluar Madurez SRL</span>
            </button>
            <button
              type="button"
              onClick={onOpenApply}
              className="text-white hover:text-bio-neon transition-colors underline decoration-bio-green decoration-2 underline-offset-2 flex items-center font-black cursor-pointer bg-transparent border-0 p-0"
            >
              <span>{t.announcement.applyLink}</span>
            </button>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Logo */}
          <Link to="/" className="flex items-center flex-shrink-0 group py-1">
            <img
              src={bhvLogo}
              alt="Biohub Venture"
              className="h-10 md:h-12 w-auto object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
              loading="eager"
            />
          </Link>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-xl text-xs font-extrabold tracking-wide uppercase transition-all duration-200 relative group ${
                    isActive
                      ? 'text-bio-green bg-bio-green/10'
                      : 'text-bio-navy hover:text-bio-green hover:bg-bio-paper'
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
              className="flex items-center space-x-1.5 text-xs font-bold text-bio-navy border border-bio-navy/20 px-3 py-2 rounded-xl hover:bg-bio-green/10 hover:border-bio-green transition shadow-2xs cursor-pointer"
            >
              <BarChart3 className="w-4 h-4 text-bio-green" />
              <span>Evaluar SRL</span>
            </button>

            {/* Interactive Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center space-x-1.5 text-xs font-bold text-bio-navy border border-bio-navy/20 px-3 py-2 rounded-xl hover:bg-bio-paper transition shadow-2xs cursor-pointer"
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
                      className={`w-full text-left px-3.5 py-2 text-xs font-bold transition-colors flex items-center justify-between cursor-pointer ${
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

            {/* Apply Button - Opens ApplyModal */}
            <button
              onClick={onOpenApply}
              className="relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold text-white bg-bio-green rounded-xl shadow-md hover:bg-bio-greenDark hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
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
              onClick={onOpenApply}
              className="px-3.5 py-2 text-xs font-bold text-white bg-bio-green rounded-lg cursor-pointer"
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-bio-navy/10 px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-xl text-sm font-extrabold tracking-wide uppercase transition-colors ${
                    isActive
                      ? 'text-bio-green bg-bio-neon/15 font-black'
                      : 'text-bio-navy hover:bg-bio-cream'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="pt-3 border-t border-bio-navy/10 flex flex-col space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenApply();
              }}
              className="w-full py-3 rounded-xl bg-bio-green text-white text-xs font-black uppercase tracking-wider text-center shadow-sm"
            >
              {t.nav.applyBtn}
            </button>
          </div>
        </div>
      )}

    </header>
  );
}
