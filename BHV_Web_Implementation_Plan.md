# 🌿 Plan de Implementación Web | BioHubVenture 2026-II

**Adaptación de estructura GRIDX para bootcamp de bioeconomía amazónica**

---

## 📋 TABLA DE CONTENIDOS

1. [Arquitectura de Información](#arquitectura-de-información)
2. [Paleta de Colores](#paleta-de-colores)
3. [Estructura de Páginas](#estructura-de-páginas)
4. [Wireframes Conceptuales](#wireframes-conceptuales)
5. [Componentes + Secciones](#componentes--secciones)
6. [Roadmap Técnico](#roadmap-técnico)
7. [Stack Recomendado](#stack-recomendado)

---

## 📐 ARQUITECTURA DE INFORMACIÓN

### Usuarios Primarios:
1. **Founders/Startups** (buscan aplicar al bootcamp)
2. **Mentores** (buscan participar como mentores)
3. **Corporativos/Aliados** (buscan innovación + inversión)
4. **Inversionistas** (buscan deal flow + portfolios de salida)
5. **Comunidades/Universidades** (referral + educación)

### Propuesta de Valor Central:
**"Transformar bioideas en bionempresas de impacto en 8 semanas"**

---

## 🎨 PALETA DE COLORES

### Colores Primarios:
- **Azul Corporativo (BHV):** `#003D7A` — confianza, tecnología, profundidad
- **Verde Amazónico:** `#2D9B4C` — naturaleza, vida, sostenibilidad
- **Verde Neón (Acento):** `#7ACD42` — energía, innovación, futuro
- **Blanco/Neutral:** `#FFFFFF` — claridad, espacio
- **Gris Oscuro (Texto):** `#1F2937` — legibilidad

### Gradientes Recomendados:
- **Hero Gradient:** `#003D7A` → `#2D9B4C` (azul-verde suave)
- **Accent Gradient:** `#7ACD42` → `#2D9B4C` (energía verde)
- **Fondo Secundario:** `#F0F9F7` (verde muy claro, casi blanco)

### Uso de Colores:
| Elemento | Color | Uso |
|---|---|---|
| Logo + Encabezados | `#003D7A` | Identidad corporativa |
| CTA Primarios | `#7ACD42` | Botones "Apply", "Discover" |
| Iconografía | `#2D9B4C` | Métricas, badges, iconos |
| Bordes/Dividers | `#E5F3F0` | Separación visual sutil |
| Fondo Cards | `#FFFFFF` | Contraste contra `#F0F9F7` |

---

## 📑 ESTRUCTURA DE PÁGINAS

### 1. **Página Principal (Home)**
```
┌─────────────────────────────────────┐
│ HEADER & NAV                         │
├─────────────────────────────────────┤
│ HERO SECTION                        │
│ [CTA: Apply / Discover RFS]         │
├─────────────────────────────────────┤
│ MANIFIESTO: "Salvando la Amazonía"  │
│ [Video intro 60-90 seg]             │
├─────────────────────────────────────┤
│ MÉTRICAS DE IMPACTO (Grid 2x3)      │
│ • 8 Cohortes completadas            │
│ • 45+ Startups aceleradas           │
│ • 3 Países de origen (PE, CO, EC)   │
│ • 12+ Aliados corporativos          │
│ • USD 15MM+ en capital movilizado    │
│ • 250+ Founder/Mentores activos      │
├─────────────────────────────────────┤
│ SECCIONES: Inside BHV / How It Works │
├─────────────────────────────────────┤
│ SHOWCASE: Top Startups (6 cards)    │
│ • ApiRobotics (ranked #1)           │
│ • MIZETA (ranked #2)                │
│ • Pompom (ranked #3)                │
│ • [+ 3 startups destacadas]         │
├─────────────────────────────────────┤
│ TESIS DE INVERSIÓN: 10 RFS Motores  │
│ [Clickable cards por pilar]         │
├─────────────────────────────────────┤
│ TIMELINE DE BOOTCAMP                │
│ [8 módulos visualizados]            │
├─────────────────────────────────────┤
│ TESTIMONIOS: Founders/Mentores      │
│ [3-4 quotes con foto + empresa]     │
├─────────────────────────────────────┤
│ CALL TO ACTION: Próxima Cohorte     │
│ [Timeline + "Apply Now" Button]     │
├─────────────────────────────────────┤
│ FOOTER                              │
└─────────────────────────────────────┘
```

### 2. **Página de Aplicación (Apply)**
```
┌─────────────────────────────────────┐
│ HERO: "Join the Revolution"         │
├─────────────────────────────────────┤
│ TABS: [Apply as Startup] [Mentores] │
├─────────────────────────────────────┤
│ REQUIREMENTS CHECKLIST              │
│ ✓ Equipo mínimo 2 personas         │
│ ✓ Validación inicial (piloto, etc) │
│ ✓ Problema en bioeconomía amazónica│
├─────────────────────────────────────┤
│ FORM INTEGRATION (Typeform/Airtable)│
│ • Video pitch (Loom/YouTube embed)  │
│ • Deck de presentación (PDF)        │
│ • Datos del equipo                  │
│ • RFS que abordas (dropdown)        │
├─────────────────────────────────────┤
│ FAQ ACCORDION                       │
│ • ¿Cuál es el costo del bootcamp?   │
│ • ¿Qué pasa después del Demo Day?   │
│ • ¿Cómo se evalúa?                  │
├─────────────────────────────────────┤
│ CTA: Submit Application             │
└─────────────────────────────────────┘
```

### 3. **Página de RFS (Requests for Startups)**
```
┌─────────────────────────────────────┐
│ HERO: "10 Desafíos para Builders"   │
├─────────────────────────────────────┤
│ FILTER BUTTONS: [All] [Pilar I] ... │
├─────────────────────────────────────┤
│ GRID DE CARDS (4 columnas):         │
│ ┌──────────────────────────────────┐│
│ │ RFS 1: "Beneficio Compartido..."  ││
│ │ Pilar: Trazabilidad               ││
│ │ TAM: USD 2-5B                     ││
│ │ [Read More] [Apply to this RFS]  ││
│ └──────────────────────────────────┘│
│ [12 RFS en total, 3 filas]          │
├─────────────────────────────────────┤
│ MODAL / EXPAND RFS:                 │
│ • Full description                  │
│ • Por qué ahora (timing)            │
│ • Qué buscamos (equipo)             │
│ • Indicadores de éxito              │
│ • TAM + ejemplos de corporativos    │
└─────────────────────────────────────┘
```

### 4. **Página de Bootcamp (How It Works)**
```
┌─────────────────────────────────────┐
│ HERO: "8 Semanas de Transformación" │
├─────────────────────────────────────┤
│ TIMELINE INTERACTIVO:               │
│ ┌─ Semana 1: Contexto Amazónico    ┐│
│ │ Herramientas: Tree of Problems    ││
│ │ Entregable: Analysis Doc          ││
│ │ [Expand to see details]           ││
│ └───────────────────────────────────┘│
│ ┌─ Semana 2: Propuesta de Valor    ┐│
│ │ Herramientas: VPC, JTBD           ││
│ │ Entregable: Customer Discovery    ││
│ └───────────────────────────────────┘│
│ [+ 6 semanas más]                   │
├─────────────────────────────────────┤
│ METODOLOGÍAS DESTACADAS:            │
│ Design Thinking | Lean Startup      │
│ Lean Coding | Scrum / Kanban        │
├─────────────────────────────────────┤
│ EVALUACIÓN (Rubric visual):         │
│ • Participación: 15%                │
│ • Entregables: 30%                  │
│ • CRM + KPIs: 15%                   │
│ • Pitch & Demo Day: 25%             │
│ • Roadmap 12 meses: 15%             │
├─────────────────────────────────────┤
│ DEMO DAY SECTION:                   │
│ • Fecha: 25 de abril (Casa Tovar)   │
│ • Video de Demo Day anterior        │
│ • Fotos de startups pitch-ando      │
└─────────────────────────────────────┘
```

### 5. **Página de Portfolio/Startups**
```
┌─────────────────────────────────────┐
│ HERO: "Nuestro Portfolio Vivo"      │
├─────────────────────────────────────┤
│ TABS: [All] [Pre-aceleración]       │
│       [Raising] [Exited]            │
├─────────────────────────────────────┤
│ SEARCH + FILTER:                    │
│ • Por área (Bioinsumos, etc)        │
│ • Por país                          │
│ • Por stage (seed, pre-seed)        │
├─────────────────────────────────────┤
│ STARTUP CARDS (Grid 3 columnas):    │
│ ┌──────────────────────────────────┐│
│ │ [Logo/Hero Image]                ││
│ │ ApiRobotics                      ││
│ │ Robótica aplicada a agronomía   ││
│ │ Fundadores: [avatars + names]   ││
│ │ TAM: USD 2B | Estado: Seed Round ││
│ │ [Visit Website] [More Details]  ││
│ └──────────────────────────────────┘│
├─────────────────────────────────────┤
│ DETALLE DE STARTUP (Modal/Subpage): │
│ • Problema + solución               │
│ • Traction (usuarios, revenue)      │
│ • Equipo (bios)                     │
│ • Ronda de inversión (si aplica)    │
│ • Cohorte BHV (cuándo pasó)         │
│ • Blog posts / updates              │
└─────────────────────────────────────┘
```

### 6. **Página de Mentores/Aliados**
```
┌─────────────────────────────────────┐
│ HERO: "Red de Mentoría + Aliados"   │
├─────────────────────────────────────┤
│ TABS: [Mentores] [Corporativos]     │
├─────────────────────────────────────┤
│ MENTOR CARDS (Grid 4 columnas):     │
│ ┌──────────────────────────────────┐│
│ │ [Foto]                           ││
│ │ David Chaupis                    ││
│ │ Programs Coordinator             ││
│ │ "Especialista en finanzas verdes"││
│ │ [View Profile] [Book Mentoring]  ││
│ └──────────────────────────────────┘│
├─────────────────────────────────────┤
│ CORPORATIVOS (Logo wall):           │
│ • Barry Callebaut (logo)            │
│ • Nufarm (logo)                     │
│ • Natura (logo)                     │
│ • [+ 9 aliados más]                │
│ [Click para ver casos de uso]       │
└─────────────────────────────────────┘
```

### 7. **Página de Blog/Recursos**
```
┌─────────────────────────────────────┐
│ HERO: "Conocimiento de Ecosistema"  │
├─────────────────────────────────────┤
│ CATEGORIES: [Biotech] [Finanzas]    │
│             [Regulación] [Casos]    │
├─────────────────────────────────────┤
│ FEATURED POST (Hero):               │
│ "Cómo construir un MVP en 8 semanas"│
│ [Author] [Date] [Read time]         │
├─────────────────────────────────────┤
│ BLOG GRID (3 columnas):             │
│ • Post card con imagen + excerpt    │
│ • Tag (Biotech, Finanzas, etc)      │
│ • Autor + fecha                     │
│ [Load More]                         │
├─────────────────────────────────────┤
│ NEWSLETTER SIGNUP:                  │
│ "Histórias de impacto cada 2 sem"   │
│ [Email input + Subscribe]           │
└─────────────────────────────────────┘
```

### 8. **Página de Contacto/Pie de Página**
```
┌─────────────────────────────────────┐
│ 3-COLUMN FOOTER:                    │
├─────────────────────────────────────┤
│ INSIDE BHV          │ EXPLORE        │ CONTACT
│ • Mission           │ • Portfolio    │ • Email
│ • Team              │ • Blog         │ • WhatsApp
│ • Careers           │ • RFS          │ • Ubicación
│ • Contact           │ • Bootcamp     │ (Lima/Oxapampa)
├─────────────────────────────────────┤
│ SOCIAL LINKS: LinkedIn | Twitter    │
│              | Instagram | TikTok   │
├─────────────────────────────────────┤
│ LANGUAGE SELECTOR: [ES] [EN] [PT]   │
├─────────────────────────────────────┤
│ LEGAL: Privacy | Terms | Cookies    │
├─────────────────────────────────────┤
│ © BioHubVenture 2026                │
└─────────────────────────────────────┘
```

---

## 🎨 WIREFRAMES CONCEPTUALES

### Home Page Hero Section:
```
┌────────────────────────────────────────────────────┐
│                 HEADER NAV                         │
│ [Logo] [Inside] [How it works] [RFS] [Apply] [ES] │
├────────────────────────────────────────────────────┤
│                                                    │
│           🌿 BIOHUBROVENTURE 2026-II              │
│                                                    │
│    Salvando la Amazonía: Bootcamp de              │
│    Bioeconomía en 8 Semanas                       │
│                                                    │
│  [APPLY AS STARTUP]        [DISCOVER RFS]        │
│                                                    │
│  Countdown: Convocatoria cierra en 45 días       │
│                                                    │
├────────────────────────────────────────────────────┤
│ [Imagen Hero: Mapa Amazonia + elementos tech]    │
└────────────────────────────────────────────────────┘
```

### Metrics Section:
```
┌──────────────────────────────────────────────────────┐
│              IMPACTO 2026 - COHORTE I               │
├──────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │  8 Cohortes │  │ 45+ Startups│  │ 3 Países    │ │
│  │ Completadas │  │ Aceleradas  │  │ de Origen   │ │
│  └─────────────┘  └─────────────┘  └─────────────┘ │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │ 12+ Aliados │  │ USD 15MM+   │  │ 250+ Makers │ │
│  │ Corporativos│  │ Movilizados │  │   del Eco   │ │
│  └─────────────┘  └─────────────┘  └─────────────┘ │
└──────────────────────────────────────────────────────┘
```

### RFS Cards Section:
```
┌────────────────────────────────────────────────────┐
│   10 REQUESTS FOR STARTUPS – DESAFÍOS 2026-II    │
├────────────────────────────────────────────────────┤
│ [All] [Trazabilidad] [Bioinsumos] [Gobernanza]   │
├────────────────────────────────────────────────────┤
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐  │
│ │ RFS 1       │ │ RFS 2       │ │ RFS 3       │  │
│ │ Blockchain  │ │ Amazon      │ │ Biofertil.  │  │
│ │ for Benefit │ │ Origin      │ │ Locales     │  │
│ │ Sharing     │ │ Traceability│ │             │  │
│ │ Pilar: I    │ │ Pilar: I    │ │ Pilar: II   │  │
│ │ TAM: 2-5B   │ │ TAM: 1.5-3B │ │ TAM: 2-4B   │  │
│ │ [Read More] │ │ [Read More] │ │ [Read More] │  │
│ └─────────────┘ └─────────────┘ └─────────────┘  │
│ [+ 7 RFS más]                                    │
└────────────────────────────────────────────────────┘
```

### Startup Showcase Section:
```
┌────────────────────────────────────────────────────┐
│  PORTFOLIO: STARTUPS DE IMPACTO 2026              │
├────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────┐ │
│  │ ApiRobotics                      [★ Ranked #1]│ │
│  │ [Hero Image: Drones en campo]                │ │
│  │ "Robótica aplicada a agricultura amazónica"  │ │
│  │ TAM: USD 500M | Seed Round: USD 250K        │ │
│  │ [Visit] [More Details]                       │ │
│  └──────────────────────────────────────────────┘ │
│                                                   │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────┐  │
│  │ MIZETA       │ │ Pompom       │ │ PdPANA   │  │
│  │ [image]      │ │ [image]      │ │ [image]  │  │
│  │ Ranked #2    │ │ Ranked #3    │ │ Ranked #4│  │
│  └──────────────┘ └──────────────┘ └──────────┘  │
└────────────────────────────────────────────────────┘
```

---

## 🧩 COMPONENTES + SECCIONES

### Componentes Reutilizables:

#### 1. **Card Component (RFS/Startup/Mentor)**
```jsx
// Props: title, description, image, tags, cta_text, cta_link
<Card
  title="RFS 1: Blockchain for Benefit Sharing"
  description="Automatizar verificación Nagoya Protocol..."
  pillar="Trazabilidad"
  tam="USD 2-5B"
  cta_primary="Read More"
  cta_secondary="Apply to this RFS"
/>
```

#### 2. **Timeline Component (Bootcamp Weeks)**
```jsx
// Props: weeks, modules, current_week
<BootcampTimeline
  weeks={8}
  modules={[
    { week: 1, title: "Contexto Amazónico", tools: ["Tree of Problems"] },
    { week: 2, title: "Propuesta de Valor", tools: ["VPC", "JTBD"] },
    // ... más semanas
  ]}
/>
```

#### 3. **Metrics Badge Component**
```jsx
// Props: number, label, icon
<MetricsBadge
  number="45+"
  label="Startups Aceleradas"
  icon="rocket"
  highlight={true}
/>
```

#### 4. **Filter Component (RFS/Portfolio)**
```jsx
// Props: categories, onFilter
<FilterButtons
  categories={["All", "Trazabilidad", "Bioinsumos", "Gobernanza", "Agua+Energía"]}
  onFilter={(category) => filterCards(category)}
/>
```

#### 5. **Modal Component (RFS Expanded)**
```jsx
// Props: rfs_data, onClose
<RFSModal
  title="RFS 1: Beneficio Compartido en Blockchain"
  sections={["problema", "por_qué_ahora", "qué_buscamos", "indicadores", "tam"]}
/>
```

#### 6. **Newsletter Signup Component**
```jsx
// Props: onSubmit
<NewsletterSignup
  placeholder="Tu email"
  buttonText="Suscribirse"
  successMessage="¡Gracias! Revisat tu inbox en 5 min"
/>
```

#### 7. **Testimonial Component**
```jsx
// Props: quote, author, title, company, image
<Testimonial
  quote="BHV aceleró nuestro traction en 300%"
  author="Juan Pérez"
  title="CEO"
  company="ApiRobotics"
  image="/testimonials/juan.jpg"
/>
```

#### 8. **CTA Button (Primary/Secondary)**
```jsx
// Props: variant, size, text, onClick, href
<Button
  variant="primary" // or "secondary"
  size="lg"
  text="Apply as Startup"
  href="/apply"
/>
```

---

## 📊 SECCIONES DETALLADAS

### Sección 1: Hero + Manifiesto
**Propósito:** Capturar atención + comunicar propuesta de valor  
**Altura:** 600-700px  
**Elementos:**
- Título Principal (H1): "Salvando la Amazonía"
- Subtítulo: "Bootcamp de Bioeconomía en 8 Semanas"
- Video/Animación Hero (30 seg): Montage de startups + Amazonía
- 2 CTAs: "Apply as Startup" (primario) + "Discover RFS" (secundario)
- Countdown timer (si hay fecha cercana)
- Scroll cue: "Descubre el ecosistema ↓"

### Sección 2: Métricas de Impacto
**Propósito:** Validar track record + credibilidad  
**Layout:** Grid 2x3 (móvil: 1x6)  
**Elementos:**
- 6 métrica principales (ver tabla abajo)
- Iconos + animación de contadores (0 → número en 2 seg)
- Color de fondo: `#F0F9F7`
- Bordes sutiles con `#E5F3F0`

| Métrica | Número | Icono |
|---|---|---|
| Cohortes Completadas | 8 | 🎓 |
| Startups Aceleradas | 45+ | 🚀 |
| Países de Origen | 3 | 🗺️ |
| Aliados Corporativos | 12+ | 🤝 |
| Capital Movilizado | USD 15MM+ | 💰 |
| Makers del Ecosistema | 250+ | 👥 |

### Sección 3: Inside BHV (Tabs)
**Propósito:** Explicar metodología + diferenciador  
**Layout:** Tabs horizontales + contenido dinámico  
**Tabs:**
- **Metodología:** Design Thinking + Lean Startup + Lean Coding
- **Evaluación:** Rubric interactivo (15% participación, etc)
- **Alianzas:** Logos de corporativos + casos de uso
- **Éxito Post-bootcamp:** Pre-aceleración, crowdfunding, VC

### Sección 4: 10 RFS (Requests for Startups)
**Propósito:** Mostrar oportunidades específicas  
**Layout:** Grid 4 columnas (móvil: 1 columna)  
**Elementos por card:**
- Título RFS (ej: "Blockchain for Benefit Sharing")
- Pilar visual (ej: icono verde "Trazabilidad")
- Descripción corta (1-2 líneas)
- TAM badge (USD 2-5B)
- Botón: "Read More" → abre modal
- Botón: "Apply to this RFS" → va a formulario pre-filled

**Colores por Pilar:**
- Pilar I (Trazabilidad): `#003D7A`
- Pilar II (Bioinsumos): `#2D9B4C`
- Pilar III (Gobernanza): `#7ACD42`
- Pilar IV (Agua+Energía): `#1E40AF` (azul más claro)

### Sección 5: Bootcamp Timeline (How It Works)
**Propósito:** Transparencia sobre estructura 8 semanas  
**Layout:** Timeline vertical (móvil) / horizontal (desktop)  
**Elementos:**
- 8 semanas como cards expandibles
- Cada semana muestra:
  - Tema principal (ej: "Propuesta de Valor")
  - Metodologías (VPC, JTBD, etc)
  - Entregable (doc, canvas, MVP v1)
  - Métricas de éxito
- Demo Day destacado (semana 8)

### Sección 6: Portfolio Startups
**Propósito:** Social proof + deal flow  
**Layout:** Grid 3 columnas + filtros  
**Filtros:**
- Por área (Bioinsumos, Trazabilidad, etc)
- Por país (Perú, Colombia, Ecuador, Brasil)
- Por stage (Seed, Pre-seed, Series A)
- Por cohorte (2024-II, 2025-I, 2026-I, etc)

**Card Startup:**
- Logo/Hero image (16:9)
- Nombre + tagline
- Avatares de fundadores (max 3)
- TAM + ronda actual
- Tags (ej: "Raising", "Demo Day", "Pre-aceleración")
- CTAs: "Visit Website" + "More Details"

### Sección 7: Testimonios
**Propósito:** Validación social  
**Layout:** Carousel 3 columnas  
**Elementos:**
- Quote (hasta 100 caracteres)
- Foto (círculo, 80px)
- Nombre + título + empresa
- Link a startup/LinkedIn
- Star rating (⭐⭐⭐⭐⭐)

### Sección 8: Mentores & Aliados
**Propósito:** Transparencia + confianza  
**Subsecciones:**

**8a. Mentores:**
- Grid 4 columnas
- Foto + nombre + especialidad
- Mini bio (2 líneas)
- Link a LinkedIn
- "Book Mentoring" CTA

**8b. Corporativos:**
- Logo wall (6-8 logos principales)
- "Ver alianzas completas" expandible
- Case studies: cómo cada aliado contribuye (1 card per corporativo)

### Sección 9: Call to Action Final
**Propósito:** Conversión  
**Layout:** Banner full-width  
**Elementos:**
- Headline: "¿Listo para transformar tu bioidea?"
- Subheader: "Cohorte 2026-II | 8 semanas intensas"
- Timeline: "Convocatoria: 15 agosto - 15 octubre"
- CTA principal: "Apply Now" (grande, `#7ACD42`)
- CTA secundario: "Schedule a Call" (outline)

### Sección 10: Footer
**Propósito:** Navegación + info + legales  
**Layout:** 3 columnas + social + idiomas  
**Columna 1 (Inside BHV):**
- Mission
- Team
- Careers
- Newsroom

**Columna 2 (Explore):**
- Portfolio
- Blog
- RFS
- Bootcamp

**Columna 3 (Contact):**
- Email: biohubventure@gmail.com
- WhatsApp: +51 XXX
- Ubicación: Lima + Oxapampa
- "Schedule Call" CTA

---

## 🛠 ROADMAP TÉCNICO

### Fase 1: Descubrimiento & Wireframes (1-2 semanas)
- [ ] Validar estructura con team BHV
- [ ] Refinar color palette (test A/B)
- [ ] Crear wireframes HTML simples (Figma)
- [ ] Mapeo de URLs + rutas
- [ ] Crear componentes list (prioridad)

### Fase 2: Diseño Detallado (2-3 semanas)
- [ ] Diseño de todas las páginas en Figma
- [ ] Design system (tipografía, espaciado, sombras)
- [ ] Crear assets (SVGs, iconos)
- [ ] Animaciones: especificar duración + easing
- [ ] Responsive design (mobile-first)
- [ ] Design handoff a developers

### Fase 3: Desarrollo Frontend (3-4 semanas)
- [ ] Setup: Next.js 14 + TypeScript + Tailwind
- [ ] Componentes en React (Card, Button, Modal, etc)
- [ ] Home page + hero section
- [ ] Apply page + form integration
- [ ] RFS page + modal interactivo
- [ ] Bootcamp timeline página
- [ ] Portfolio startups página

### Fase 4: Backend & Integraciones (2-3 semanas)
- [ ] Airtable base para startups/RFS/mentores
- [ ] Typeform / Airtable forms para Apply
- [ ] Newsletter signup (Buttondown / Substack)
- [ ] Analytics: Google Analytics 4 + Hotjar
- [ ] CMS: MDX para blog posts

### Fase 5: Deploy & QA (1-2 semanas)
- [ ] Testing (Cypress E2E)
- [ ] SEO optimization
- [ ] Performance audit (Lighthouse >90)
- [ ] Deploy a Vercel
- [ ] Setup domain + DNS
- [ ] Monitoring + alertas

### Fase 6: Post-Launch (Ongoing)
- [ ] Feedback loops
- [ ] A/B testing de CTAs
- [ ] Blog content strategy
- [ ] Newsletter cadence
- [ ] Maintenance + updates

---

## 💻 STACK RECOMENDADO

### Frontend:
```
Framework: Next.js 14+ (App Router)
Language: TypeScript
Styling: Tailwind CSS 3.4
Components: Headless UI / Shadcn/ui
State: Zustand (si es necesario)
Animations: Framer Motion
Forms: React Hook Form + Zod
```

### Backend:
```
Database: Airtable (MVP) → PostgreSQL (escala)
API: Next.js API Routes (MVP) → Node.js Express (escala)
Auth: NextAuth.js (si se necesita login mentores)
File Storage: Cloudinary (imágenes) / Supabase (docs)
```

### Integraciones:
```
Forms: Airtable Embedded Form / Typeform
Newsletter: Buttondown / Substack API
Analytics: Google Analytics 4 + Hotjar
CMS: MDX + GitHub (blog)
Video: Loom / Vimeo (embeds)
Maps: Mapbox (ubicación Oxapampa)
```

### DevOps:
```
Hosting: Vercel (Next.js optimizado)
DNS: Cloudflare
CI/CD: GitHub Actions
Monitoring: Sentry (errores) + LogRocket (session replay)
```

### Herramientas de Diseño:
```
Design: Figma
Prototyping: Figma interactive
Asset Management: Figma + Cloudinary
```

---

## 📋 CHECKLIST DE IMPLEMENTACIÓN

### Antes de empezar:
- [ ] Aprobación de arquitectura con team BHV
- [ ] Seleccionar designer (internal o agencia)
- [ ] Seleccionar developer(s) (full-stack o frontend+backend)
- [ ] Setup de Figma + repositorio GitHub
- [ ] Crear board de tareas (Linear / Jira)

### Durante desarrollo:
- [ ] Daily syncs (15 min)
- [ ] Weekly design reviews
- [ ] Bi-weekly stakeholder reviews (team BHV)
- [ ] QA testing en staging
- [ ] User testing (5-10 founders/mentores)

### Pre-launch:
- [ ] Content: copiar todo from RFS document
- [ ] Imágenes: StartUp hero shots, equipo, Amazonía
- [ ] Videos: Demo Day footage, intro video (60 seg)
- [ ] Testimonios: recolectar 5-10 quotes
- [ ] Blog posts: 3-5 artículos iniciales
- [ ] Newsletter: template + cadencia

### Post-launch:
- [ ] Monitoring de uptime + performance
- [ ] Feedback: recolectar via Hotjar + formulario
- [ ] Analytics: revisar weekly (traffic, conversions)
- [ ] Roadmap: siguiente iteración (landing improvements, etc)

---

## 🎯 KPIs A RASTREAR

| KPI | Target | Herramienta |
|---|---|---|
| Tráfico mensual | 5,000+ visitantes | GA4 |
| Conversion (Home → Apply) | 5-8% | GA4 |
| Email list growth | 200+ subs/mes | Buttondown |
| Time on RFS page | >2 min | Hotjar |
| Apply completion rate | 70%+ | Typeform |
| Mentions en redes | 20+ retweets/mes | Sprout Social |

---

## 📝 NOTAS FINALES

1. **Versión MVP (2 semanas):** Home + Apply + RFS (3 páginas core)
2. **Versión V1 (1 mes):** Todas las páginas menos blog
3. **Versión V2 (6-8 semanas):** Blog + newsletter + portfolio dinámico
4. **Escalabilidad:** Arquitectura soporta 100K+ visitantes/mes

**Personas clave:**
- Designer: 1 (full-time o 40% dedicación)
- Developer frontend: 1 (full-time)
- Developer backend: 0.5 (part-time, integraciones)
- PM/Product: Dave (BHV)

**Presupuesto estimado (USD):**
- Design: $3,000-5,000
- Development: $8,000-12,000
- Hosting/Tools anuales: $500-1,000
- **Total:** $11,500-18,000 (one-time + ongoing)

---

**Documento versionado:** v1.0 | Julio 31, 2026  
**Próxima revisión:** Después de UX testing con 10 usuarios
