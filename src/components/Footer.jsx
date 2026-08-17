import React, { useState } from 'react';
import { Send, Linkedin, Twitter, Instagram, Youtube, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TRANSLATIONS } from '../data/translations';
import { saveNewsletter } from '../services/submissionService';

export default function Footer({ currentLang }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.ES;
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (email) {
      await saveNewsletter(email);
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail('');
    }
  };

  return (
    <footer id="footer" className="bg-bio-navyDeep text-white pt-16 pb-12 border-t border-bio-green/20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Consortium Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <Link to="/">
                <img 
                  src="/logoBHV.png" 
                  alt="Biohub Venture Logo" 
                  className="h-10 w-auto object-contain brightness-0 invert"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='40' viewBox='0 0 180 40'%3E%3Ctext x='0' y='28' fill='white' font-family='sans-serif' font-weight='bold' font-size='20'%3EBiohub Venture%3E%3C/text%3E%3C/svg%3E";
                  }}
                />
              </Link>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              {t.footer.tagline}
            </p>

            {/* Consortium Members Badges */}
            <div className="pt-2">
              <p className="text-[11px] font-extrabold uppercase text-gray-400 mb-2">{t.footer.consortiumTitle}</p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2.5 py-1 rounded bg-bio-biogenia/20 text-bio-biogenia font-bold border border-bio-biogenia/30">BioGenia</span>
                <span className="px-2.5 py-1 rounded bg-bio-igbm/20 text-bio-igbm font-bold border border-bio-igbm/30">IGBM</span>
                <span className="px-2.5 py-1 rounded bg-bio-scale/20 text-bio-scale font-bold border border-bio-scale/30">Scale Incubadora</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a href="https://www.linkedin.com/company/biohubventure" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn de Biohub Venture" className="w-8 h-8 rounded-full bg-white/10 hover:bg-bio-neon hover:text-bio-navyDark flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://twitter.com/biohubventure" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X de Biohub Venture" className="w-8 h-8 rounded-full bg-white/10 hover:bg-bio-neon hover:text-bio-navyDark flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/biohubventure" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Biohub Venture" className="w-8 h-8 rounded-full bg-white/10 hover:bg-bio-neon hover:text-bio-navyDark flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://www.youtube.com/@biohubventure" target="_blank" rel="noopener noreferrer" aria-label="YouTube de Biohub Venture" className="w-8 h-8 rounded-full bg-white/10 hover:bg-bio-neon hover:text-bio-navyDark flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav Links Column 1: Programa */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold text-bio-neon uppercase tracking-wider">{t.footer.p1}</h4>
            <ul className="space-y-2 text-xs text-gray-400 font-medium">
              <li><Link to="/rfs" className="hover:text-white transition-colors">RFS (10 Desafíos)</Link></li>
              <li><Link to="/bootcamp" className="hover:text-white transition-colors">Bootcamp (8 Semanas)</Link></li>
              <li><Link to="/apply" className="hover:text-white transition-colors">Aplicar como Startup</Link></li>
              <li><Link to="/startups" className="hover:text-white transition-colors">Startups Aceleradas</Link></li>
              <li><Link to="/servicios" className="hover:text-white transition-colors">Nuestros Servicios</Link></li>
            </ul>
          </div>

          {/* Nav Links Column 2: Recursos */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold text-bio-neon uppercase tracking-wider">{t.footer.p2}</h4>
            <ul className="space-y-2 text-xs text-gray-400 font-medium">
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog & Noticias</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Eventos & Webinars</Link></li>
              <li><Link to="/consorcio" className="hover:text-white transition-colors">Ecosistema LATAM</Link></li>
            </ul>
          </div>

          {/* Nav Links Column 3: Sobre BHV */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold text-bio-neon uppercase tracking-wider">{t.footer.p3}</h4>
            <ul className="space-y-2 text-xs text-gray-400 font-medium">
              <li><Link to="/consorcio" className="hover:text-white transition-colors">Quiénes somos</Link></li>
              <li><Link to="/consorcio" className="hover:text-white transition-colors">Aliados Fundadores</Link></li>
              <li><Link to="/apply" className="hover:text-white transition-colors">Contacto & Postulación</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold text-bio-neon uppercase tracking-wider">{t.footer.newsletterTitle}</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              {t.footer.newsletterDesc}
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu email..."
                  required
                  className="w-full px-3 py-2 text-xs rounded-l-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:border-bio-neon"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-bio-green hover:bg-bio-neon hover:text-bio-navyDark text-white rounded-r-lg font-bold transition-colors flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              {subscribed && (
                <div className="flex items-center space-x-1.5 text-[11px] text-bio-neon">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t.footer.subSuccess}</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 space-y-3 sm:space-y-0">
          <div>
            {t.footer.rights}
          </div>
          <div className="flex space-x-6">
            <Link to="/privacidad" className="hover:text-white transition-colors">{t.footer.privacy}</Link>
            <Link to="/terminos" className="hover:text-white transition-colors">{t.footer.terms}</Link>
            <a href="mailto:info@biohubventure.com" className="hover:text-white transition-colors">{t.footer.grievance}</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
