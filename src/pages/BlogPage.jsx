import React, { useState } from 'react';
import { TRANSLATIONS } from '../data/translations';
import { 
  BookOpen, Calendar, User, ArrowRight, Tag, Search, 
  Linkedin, Instagram, Facebook, Share2, Heart, MessageCircle, 
  Repeat2, ExternalLink, Sparkles, RefreshCw, Layers, Radio, CheckCircle2, X
} from 'lucide-react';

export default function BlogPage({ currentLang }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.ES;
  
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'articles', 'linkedin', 'instagram', 'facebook'
  const [searchQuery, setSearchQuery] = useState('');
  const [showApiModal, setShowApiModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  // 📝 NATIVE ARTICLES & SCIENTIFIC PAPERS
  const blogPosts = [
    {
      id: 'art-1',
      type: 'article',
      platform: 'blog',
      title: 'Protocolo de Nagoya y Trazabilidad Blockchain en la Bioeconomía Amazónica',
      excerpt: 'Cómo las startups latinoamericanas pueden automatizar el cumplimiento del reparto justo y equitativo de beneficios (ABS) utilizando contratos inteligentes.',
      author: 'Dra. María McClintock',
      authorRole: 'Directora Científica IGBM',
      date: '28 Julio 2026',
      readTime: '6 min de lectura',
      category: 'Regulación & Tech',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
      link: '#',
      featured: true
    },
    {
      id: 'art-2',
      type: 'article',
      platform: 'blog',
      title: 'De la Probeta al Biorreactor: Escalando Producción de Proteínas Fúngicas',
      excerpt: 'Lecciones aprendidas en la optimización de procesos de fermentación continua para la sustitución de ingredientes sintéticos y harinas vegetales.',
      author: 'Ing. Carlos Mendoza',
      authorRole: 'Head of Bioprocesses BioGenia',
      date: '20 Julio 2026',
      readTime: '8 min de lectura',
      category: 'Biotecnología',
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
      link: '#'
    },
    {
      id: 'art-3',
      type: 'article',
      platform: 'blog',
      title: 'Estructurando Rondas SAFE para Bio-Startups en Etapa Pre-Semilla',
      excerpt: 'Guía práctica para founders que buscan inversión de impacto manteniendo el control de su propiedad intelectual y valorizaciones justas.',
      author: 'Lic. Andrés Díaz',
      authorRole: 'Managing Partner Scale',
      date: '12 Julio 2026',
      readTime: '5 min de lectura',
      category: 'Venture Capital',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
      link: '#'
    }
  ];

  // 🌐 SOCIAL MEDIA LIVE FEEDS (LINKEDIN, INSTAGRAM, FACEBOOK)
  const socialPosts = [
    {
      id: 'soc-li-1',
      type: 'social',
      platform: 'linkedin',
      author: 'Biohub Venture',
      handle: '@biohub-venture',
      avatar: '/icon_bhv.png',
      timeAgo: 'Hace 3 horas',
      title: '¿Cómo las startups de biotecnología pueden pasar del laboratorio al mercado en LATAM?',
      content: 'En nuestra última edición del Bootcamp BHV, validamos cómo la combinación de rigor genético (IGBM), transferencia tecnológica (BioGenia) y aceleración de negocios (Scale) reduce el time-to-market de 3 años a solo 6 meses.\n\n🌱 Conoce los 5 casos de éxito de la cohorte 2026-I que ya están levantando capital.',
      tags: ['#Bioeconomia', '#Biotecnologia', '#StartupsLATAM', '#VentureBuilding'],
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      likes: 142,
      comments: 28,
      shares: 19,
      postUrl: 'https://www.linkedin.com/company/biohubventure'
    },
    {
      id: 'soc-ig-1',
      type: 'social',
      platform: 'instagram',
      author: 'biohubventure',
      handle: '@biohubventure',
      avatar: '/icon_bhv.png',
      timeAgo: 'Hace 6 horas',
      title: 'Reels: Dentro de nuestros laboratorios de validación molecular 🔬🧬',
      content: 'Nuestros biofundadores no solo crean modelos de negocio, ¡validan su ciencia en laboratorio real! Aquí vemos las pruebas metagenómicas de la startup CRYBS para diagnóstico temprano.',
      tags: ['#BiohubVenture', '#CienciaViva', '#DeepTech', '#AmazoniaSostenible'],
      image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=800&q=80',
      likes: 384,
      comments: 45,
      shares: 62,
      isVideo: true,
      postUrl: 'https://www.instagram.com/biohubventure'
    },
    {
      id: 'soc-fb-1',
      type: 'social',
      platform: 'facebook',
      author: 'Biohub Venture Oficial',
      handle: '@BiohubVenture',
      avatar: '/icon_bhv.png',
      timeAgo: 'Hace 1 día',
      title: 'Webinar Abierto: "Mecanismos de Financiamiento No Reembolsable para Bioemprendimientos"',
      content: 'Acompáñanos este jueves a las 6:00 PM (GMT-5) con nuestro panel de mentores especializados. Aprenderás a postular a fondos CTI y estructurar propuestas de alta viabilidad.',
      tags: ['#WebinarBHV', '#FondosCTI', '#Bioemprendimiento'],
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80',
      likes: 96,
      comments: 18,
      shares: 34,
      postUrl: 'https://www.facebook.com/biohubventure'
    },
    {
      id: 'soc-li-2',
      type: 'social',
      platform: 'linkedin',
      author: 'Biohub Venture',
      handle: '@biohub-venture',
      avatar: '/icon_bhv.png',
      timeAgo: 'Hace 2 días',
      title: 'Artículo: "El rol de los Bioembajadores en la detección temprana de patentes universitarias"',
      content: 'Nuestra red de más de 20 voluntarios e investigadores jóvenes en Perú, Colombia, Ecuador y El Salvador está transformando las tesis de grado en spin-offs biotecnológicas.',
      tags: ['#Bioembajadores', '#InnovacionAbierta', '#UniversidadEmpresa'],
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      likes: 215,
      comments: 39,
      shares: 27,
      postUrl: 'https://www.linkedin.com/company/biohubventure'
    },
    {
      id: 'soc-ig-2',
      type: 'social',
      platform: 'instagram',
      author: 'biohubventure',
      handle: '@biohubventure',
      avatar: '/icon_bhv.png',
      timeAgo: 'Hace 3 días',
      title: 'Graduación Cohorte 2026-I: ¡30 Startups Incubadas en 5 Países de LATAM! 🚀🎉',
      content: 'Una jornada histórica de Demo Day donde nuestros founders presentaron sus soluciones ante fondos de venture capital y aliados corporativos.',
      tags: ['#DemoDayBHV', '#ImpactoVerde', '#LATAMBiotech'],
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
      likes: 512,
      comments: 67,
      shares: 88,
      postUrl: 'https://www.instagram.com/biohubventure'
    }
  ];

  // Combine items
  const allItems = [...blogPosts, ...socialPosts];

  // Filter items
  const filteredItems = allItems.filter(item => {
    // Tab filter
    if (activeTab === 'articles' && item.type !== 'article') return false;
    if (activeTab === 'linkedin' && item.platform !== 'linkedin') return false;
    if (activeTab === 'instagram' && item.platform !== 'instagram') return false;
    if (activeTab === 'facebook' && item.platform !== 'facebook') return false;

    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title?.toLowerCase().includes(q);
      const matchContent = item.excerpt?.toLowerCase().includes(q) || item.content?.toLowerCase().includes(q);
      const matchAuthor = item.author?.toLowerCase().includes(q);
      return matchTitle || matchContent || matchAuthor;
    }
    return true;
  });

  return (
    <div className="py-16 bg-bio-cream min-h-screen space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* ======================================================== */}
        {/* 1. HERO HEADER & REAL-TIME SYNC BADGE                    */}
        {/* ======================================================== */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="px-3.5 py-1.5 rounded-full bg-bio-green/15 text-bio-greenDark text-xs font-black uppercase tracking-wider">
              Blog, Artículos & Redes Sociales
            </span>
            
            {/* Live Indicator Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Feed Multicanal Sincronizado</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-bio-navy tracking-tight">
            Centro de Conocimiento & Publicaciones en Vivo
          </h1>
          <p className="text-bio-textMuted text-base sm:text-lg leading-relaxed">
            Descubre nuestras investigaciones científicas, análisis de venture building y el pulso diario de Biohub Venture directamente desde <strong>LinkedIn</strong>, <strong>Instagram</strong> y <strong>Facebook</strong>.
          </p>

          {/* Action Bar: API Connection Guide Button */}
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => setShowApiModal(true)}
              className="inline-flex items-center space-x-2 text-xs font-bold text-bio-navy bg-white border border-bio-navy/15 hover:border-bio-green px-4 py-2 rounded-xl shadow-sm hover:shadow transition-all"
            >
              <Sparkles className="w-4 h-4 text-bio-green" />
              <span>¿Cómo conectar el Feed en tiempo real con APIs oficiales?</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. INTERACTIVE PLATFORM FILTER TABS & SEARCH BAR         */}
        {/* ======================================================== */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-bio-navy/10 shadow-sm">
          
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center space-x-2 ${
                activeTab === 'all'
                  ? 'bg-bio-navy text-white shadow-md'
                  : 'bg-bio-cream/80 text-bio-textMuted hover:text-bio-navy hover:bg-bio-cream'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Todos ({allItems.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('articles')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center space-x-2 ${
                activeTab === 'articles'
                  ? 'bg-bio-green text-white shadow-md'
                  : 'bg-bio-cream/80 text-bio-textMuted hover:text-bio-navy hover:bg-bio-cream'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Artículos & Papers ({blogPosts.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('linkedin')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center space-x-2 ${
                activeTab === 'linkedin'
                  ? 'bg-[#0077B5] text-white shadow-md'
                  : 'bg-bio-cream/80 text-bio-textMuted hover:text-[#0077B5] hover:bg-bio-cream'
              }`}
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </button>

            <button
              onClick={() => setActiveTab('instagram')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center space-x-2 ${
                activeTab === 'instagram'
                  ? 'bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white shadow-md'
                  : 'bg-bio-cream/80 text-bio-textMuted hover:text-pink-600 hover:bg-bio-cream'
              }`}
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </button>

            <button
              onClick={() => setActiveTab('facebook')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center space-x-2 ${
                activeTab === 'facebook'
                  ? 'bg-[#1877F2] text-white shadow-md'
                  : 'bg-bio-cream/80 text-bio-textMuted hover:text-[#1877F2] hover:bg-bio-cream'
              }`}
            >
              <Facebook className="w-3.5 h-3.5" />
              <span>Facebook</span>
            </button>
          </div>

          {/* Search & Refresh */}
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-bio-textMuted" />
              <input
                type="text"
                placeholder="Buscar publicaciones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-bio-navy/15 bg-bio-cream/40 focus:outline-none focus:border-bio-green text-bio-navy"
              />
            </div>
            
            <button
              onClick={handleRefresh}
              title="Sincronizar feed en vivo"
              className="p-2 rounded-xl border border-bio-navy/15 hover:border-bio-green text-bio-navy hover:text-bio-green transition-all bg-white"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-bio-green' : ''}`} />
            </button>
          </div>

        </div>

        {/* ======================================================== */}
        {/* 3. FEATURED POST (ONLY SHOWN ON ALL OR ARTICLES TAB)     */}
        {/* ======================================================== */}
        {(activeTab === 'all' || activeTab === 'articles') && !searchQuery && (
          <div className="rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 bg-white border border-bio-navy/12 shadow-xl group">
            <div className="lg:col-span-7 h-64 lg:h-auto relative bg-bio-navyDeep overflow-hidden">
              <img 
                src={blogPosts[0].image} 
                alt={blogPosts[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" 
              />
              <div className="absolute top-4 left-4 flex items-center space-x-2">
                <span className="bg-bio-green text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
                  Artículo Destacado
                </span>
                <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full border border-white/20">
                  {blogPosts[0].readTime}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-xs text-bio-textMuted font-semibold">
                  <span className="text-bio-green font-bold uppercase tracking-wider">{blogPosts[0].category}</span>
                  <span>•</span>
                  <span>{blogPosts[0].date}</span>
                </div>
                <h2 className="text-2xl font-extrabold text-bio-navy leading-snug group-hover:text-bio-green transition-colors">
                  {blogPosts[0].title}
                </h2>
                <p className="text-xs text-bio-textMuted leading-relaxed">
                  {blogPosts[0].excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-bio-navy/10 flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold text-bio-navy block">{blogPosts[0].author}</span>
                  <span className="text-[10px] text-bio-greenDark font-medium">{blogPosts[0].authorRole}</span>
                </div>
                <a
                  href={blogPosts[0].link}
                  className="px-4 py-2 rounded-xl bg-bio-green/15 text-bio-greenDark hover:bg-bio-green hover:text-white text-xs font-extrabold flex items-center space-x-1 transition-all"
                >
                  <span>Leer artículo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 4. DYNAMIC FEED GRID (ARTICLES + SOCIAL POSTS)           */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => {
            // RENDER SCIENTIFIC/CORPORATE ARTICLE CARD
            if (item.type === 'article') {
              return (
                <div 
                  key={item.id} 
                  className="rounded-3xl overflow-hidden flex flex-col justify-between bg-white border border-bio-navy/12 hover:border-bio-green hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="h-52 bg-bio-navyDeep overflow-hidden relative">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute top-4 left-4">
                      <span className="text-xs font-black text-white bg-bio-navy/90 backdrop-blur-md px-3 py-1 rounded-full shadow border border-white/20">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="text-[11px] font-mono text-bio-textMuted block">{item.date}</span>
                      <h3 className="text-lg font-extrabold text-bio-navy leading-snug group-hover:text-bio-green transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-bio-textMuted leading-relaxed line-clamp-3">
                        {item.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-bio-navy/10 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-bio-navy block">{item.author}</span>
                        <span className="text-[10px] text-bio-greenDark font-medium">{item.readTime}</span>
                      </div>
                      <a
                        href={item.link}
                        className="text-xs font-bold text-bio-green hover:text-bio-greenDark flex items-center space-x-1"
                      >
                        <span>Leer</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            }

            // RENDER SOCIAL MEDIA POST CARD (LINKEDIN, INSTAGRAM, FACEBOOK)
            const isLinkedIn = item.platform === 'linkedin';
            const isInstagram = item.platform === 'instagram';
            const isFacebook = item.platform === 'facebook';

            return (
              <div 
                key={item.id}
                className="rounded-3xl overflow-hidden flex flex-col justify-between bg-white border border-bio-navy/12 hover:border-bio-green hover:shadow-2xl transition-all duration-300 group"
              >
                {/* Social Header */}
                <div className="p-5 pb-3 flex items-center justify-between border-b border-bio-navy/5">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full p-0.5 flex items-center justify-center ${
                      isLinkedIn ? 'bg-[#0077B5]' :
                      isInstagram ? 'bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#F77737]' :
                      'bg-[#1877F2]'
                    }`}>
                      <img 
                        src={item.avatar} 
                        alt={item.author} 
                        className="w-full h-full object-cover rounded-full bg-white p-0.5"
                      />
                    </div>
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <h4 className="text-xs font-extrabold text-bio-navy leading-none">{item.author}</h4>
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500 text-white" />
                      </div>
                      <span className="text-[10px] text-bio-textMuted font-mono leading-tight">{item.handle} • {item.timeAgo}</span>
                    </div>
                  </div>

                  {/* Social Platform Icon Badge */}
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-white ${
                    isLinkedIn ? 'bg-[#0077B5]' :
                    isInstagram ? 'bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737]' :
                    'bg-[#1877F2]'
                  }`}>
                    {isLinkedIn && <Linkedin className="w-4 h-4" />}
                    {isInstagram && <Instagram className="w-4 h-4" />}
                    {isFacebook && <Facebook className="w-4 h-4" />}
                  </div>
                </div>

                {/* Social Media Media / Image */}
                <div className="h-52 bg-bio-navyDeep overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  {item.isVideo && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/90 text-bio-navy flex items-center justify-center shadow-xl">
                        <span className="ml-1 text-lg">▶</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Social Media Content & Engagement */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-extrabold text-bio-navy leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-bio-textMuted leading-relaxed line-clamp-3">
                      {item.content}
                    </p>
                    
                    {/* Hashtags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[10px] font-semibold text-bio-greenDark">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Engagement Metrics & External Link */}
                  <div className="pt-3 border-t border-bio-navy/10 flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-xs text-bio-textMuted font-semibold">
                      <span className="flex items-center space-x-1">
                        <Heart className="w-3.5 h-3.5 text-red-500" />
                        <span>{item.likes}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MessageCircle className="w-3.5 h-3.5 text-blue-500" />
                        <span>{item.comments}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Share2 className="w-3.5 h-3.5 text-bio-green" />
                        <span>{item.shares}</span>
                      </span>
                    </div>

                    <a
                      href={item.postUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-extrabold text-bio-navy hover:text-bio-green flex items-center space-x-1 transition-colors"
                    >
                      <span>Ver post</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-bio-navy/10 space-y-4">
            <p className="text-base text-bio-textMuted">No se encontraron publicaciones con el criterio de búsqueda.</p>
            <button
              onClick={() => { setActiveTab('all'); setSearchQuery(''); }}
              className="px-5 py-2.5 rounded-xl bg-bio-green text-white font-extrabold text-xs"
            >
              Mostrar todas las publicaciones
            </button>
          </div>
        )}

      </div>

      {/* ======================================================== */}
      {/* 5. MODAL: ARQUITECTURA & GUÍA DE CONEXIÓN EN TIEMPO REAL */}
      {/* ======================================================== */}
      {showApiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bio-navyDeep/80 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl border border-bio-navy/10 relative">
            
            {/* Close Button */}
            <button
              onClick={() => setShowApiModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-bio-cream hover:bg-bio-navy/10 text-bio-navy transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-bio-green/15 text-bio-greenDark text-xs font-black uppercase tracking-wider">
                <Radio className="w-3.5 h-3.5 text-bio-green animate-pulse" />
                <span>Propuesta Técnica de Conexión en Tiempo Real</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-bio-navy">
                ¿Cómo conectar en vivo LinkedIn, Facebook e Instagram?
              </h3>
              <p className="text-xs sm:text-sm text-bio-textMuted">
                Para que cada post que publiques en tus redes aparezca automáticamente en la web sin editar código, existen 3 soluciones profesionales:
              </p>
            </div>

            {/* 3 Methods Comparison */}
            <div className="space-y-4">
              
              {/* Option A: Social Aggregator SDK (Fastest & 100% Plug and Play) */}
              <div className="p-5 rounded-2xl bg-bio-cream/60 border-2 border-bio-green space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-extrabold text-bio-navy flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-full bg-bio-green text-white text-xs flex items-center justify-center font-bold">1</span>
                    <span>Opción A: Social Feed Aggregator (Recomendada No-Code / Plug & Play)</span>
                  </h4>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-bio-green text-white">
                    Más rápida (10 min)
                  </span>
                </div>
                <p className="text-xs text-bio-textMuted leading-relaxed">
                  Usando servicios enterprise como <strong>Curator.io</strong>, <strong>Tagembed</strong> o <strong>Walls.io</strong>:
                </p>
                <ul className="text-xs text-bio-textDark space-y-1.5 pl-2">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-bio-green flex-shrink-0 mt-0.5" />
                    <span>Conectas con 1 clic tu cuenta de <strong>LinkedIn BHV</strong>, <strong>Fanpage de Facebook</strong> e <strong>Instagram Business</strong>.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-bio-green flex-shrink-0 mt-0.5" />
                    <span>Te entrega un endpoint JSON o Widget personalizado en tiempo real que se sincroniza automáticamente cada vez que subes un nuevo post o reel.</span>
                  </li>
                </ul>
              </div>

              {/* Option B: Direct Meta Graph API & LinkedIn API */}
              <div className="p-5 rounded-2xl bg-white border border-bio-navy/15 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-extrabold text-bio-navy flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-full bg-bio-navy text-white text-xs flex items-center justify-center font-bold">2</span>
                    <span>Opción B: APIs Oficiales Directas (Meta Graph API & LinkedIn API)</span>
                  </h4>
                  <span className="text-[10px] font-bold text-bio-textMuted px-2 py-0.5 rounded bg-bio-cream">
                    Desarrollo Custom
                  </span>
                </div>
                <p className="text-xs text-bio-textMuted leading-relaxed">
                  Creamos un micro-backend (Serverless Function en Cloudflare Workers o Vercel Edge):
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-bio-textDark pt-1">
                  <div className="p-3 rounded-xl bg-bio-cream/40 border border-bio-navy/10 space-y-1">
                    <strong className="text-blue-600 block">LinkedIn Community API:</strong>
                    <p className="text-[11px] text-bio-textMuted">Consulta <code>/rest/postsByAuthor</code> con Access Token OAuth 2.0 y renueva el token cada 60 días.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-bio-cream/40 border border-bio-navy/10 space-y-1">
                    <strong className="text-pink-600 block">Meta Graph API:</strong>
                    <p className="text-[11px] text-bio-textMuted">Consulta el feed de Instagram con <code>/{'{ig-user-id}'}/media</code> y Facebook Page con <code>/{'{page-id}'}/feed</code>.</p>
                  </div>
                </div>
              </div>

              {/* Option C: RSS & Webhooks Automation */}
              <div className="p-5 rounded-2xl bg-white border border-bio-navy/15 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-extrabold text-bio-navy flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-full bg-bio-navy text-white text-xs flex items-center justify-center font-bold">3</span>
                    <span>Opción C: Automatización con Make.com / Zapier hacia Supabase</span>
                  </h4>
                  <span className="text-[10px] font-bold text-bio-textMuted px-2 py-0.5 rounded bg-bio-cream">
                    Sin costo API
                  </span>
                </div>
                <p className="text-xs text-bio-textMuted leading-relaxed">
                  Un webhook en Make.com o Zapier escucha cuando publicas en LinkedIn o Instagram y guarda el contenido inmediatamente en la base de datos de Biohub Venture para renderizarlo al instante.
                </p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-bio-navy/10 flex justify-end">
              <button
                onClick={() => setShowApiModal(false)}
                className="px-6 py-2.5 rounded-xl bg-bio-navy text-white font-extrabold text-xs uppercase tracking-wider hover:bg-bio-green transition-colors"
              >
                Entendido
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
