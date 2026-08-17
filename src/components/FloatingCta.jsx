import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TRANSLATIONS } from '../data/translations';

export default function FloatingCta({ currentLang }) {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.ES;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 animate-bounce-slow">
      <button
        onClick={() => navigate('/apply')}
        className="flex items-center space-x-2 px-5 py-3.5 rounded-full bg-bio-green hover:bg-bio-greenDark text-white font-extrabold text-xs uppercase tracking-wider shadow-2xl hover:shadow-neon-glow transform hover:-translate-y-1 transition-all duration-300 border-2 border-white/80"
      >
        <Sparkles className="w-4 h-4 text-bio-neon animate-pulse" />
        <span>Postular Startup ✨</span>
        <ArrowRight className="w-4 h-4 ml-1" />
      </button>
    </div>
  );
}
