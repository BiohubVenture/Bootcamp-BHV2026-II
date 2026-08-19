# 🌿 PROMPT MAESTRO | BioHubVenture 2026-II Web Platform
## "Innovar para Regenerar: Construyendo la Bioeconomía del Futuro"

**Destinatarios:** Stitch (Prototipado) + Antigravity (Desarrollo)  
**Fecha:** Julio 31, 2026  
**Status:** Especificaciones Finales para Build  

---

## 📋 BRIEF EJECUTIVO

### Visión
Crear plataforma web integrada para **BioHubVenture 2026-II**, bootcamp de bioeconomía amazónica que transforma bioideas en empresas de impacto en 8 semanas. La web debe reflejar alianza de consorcio (BioGenia + IGBM + Scale), capturar aplicaciones de startups, comunicar oportunidades de innovación (10 RFS), y conectar con inversores/corporativos.

### Lema Central (Nuevo)
**"Innovar para Regenerar: Construyendo la Bioeconomía del Futuro"**

*(No usar: "Salvando la Amazonía" — es edición anterior)*

### Objetivos Clave
1. ✅ Capturar 200+ aplicaciones de startups en 60 días (Aug 15 - Oct 15)
2. ✅ Comunicar 10 Requests for Startups (RFS) de forma clara e interactiva
3. ✅ Transparencia total sobre servicios, educación, alianzas
4. ✅ Validar consorcio fundador (BioGenia, IGBM, Scale)
5. ✅ Drive conversión: Home → Apply Form (target 5-8% conversion)
6. ✅ Mobile-first (60% tráfico esperado mobile)

---

## 🎯 SCOPE TÉCNICO

### Plataforma
- **Tipo:** Marketing site + Application portal (híbrido)
- **Stack:** Next.js 14 + TypeScript + Tailwind CSS + React
- **Hosting:** Vercel
- **CMS:** MDX (blog) + Airtable (datos dinámicos: startups, mentores, RFS)
- **Forms:** Airtable Embedded + Typeform fallback
- **Analytics:** GA4 + Hotjar

### Paginas Principales (9 páginas core + 1 landing de RFS)
1. **/** (Home) — Hero + Servicios + Métricas + RFS + Portfolio
2. **/apply** — Application form + requirements
3. **/rfs** — Grid de 10 RFS interactivos + modal detail
4. **/how-it-works** — Timeline de 8 semanas + metodologías
5. **/servicios** — Detalle de 6 servicios integrales
6. **/portfolio** — Startups 2024-2026 + filtros
7. **/consorcio** — Aliados fundadores + corporativos
8. **/mentores** — Network de 50+ mentores
9. **/blog** — Content hub (posts, case studies, guides)
10. **/contacto** — Contact + scheduling

---

## 🎨 IDENTIDAD VISUAL

### Paleta Principal
```
┌─ BHV Azul Corporativo: #003D7A
│  └─ Uso: Logo, headers, texto principal, identidad
│
├─ BHV Verde Amazónico: #2D9B4C
│  └─ Uso: Iconografía, bordes, temas servicios
│
├─ BHV Verde Neón (Acento): #7ACD42
│  └─ Uso: Botones CTA, hover states, highlights
│
├─ Fondo Secundario: #F0F9F7
│  └─ Uso: Secciones alternas, cards background
│
└─ Texto Principal: #1F2937 (gris oscuro)
   └─ Uso: Body text, párrafos, descripciones
```

### Colores de Aliados (Harmonizar en logos)
```
BioGenia Verde:      #22B878
IGBM Azul Celeste:   #5BB8D6
Scale Púrpura:       #6B4DD6
```

### Tipografía
```
Headings (H1-H3):   Inter, Bold/SemiBold, 20-48px
Body Text:          Inter, Regular, 14-16px
Mono (code):        JetBrains Mono, 12-14px
```

### Espaciado Base
```
xs: 4px  | sm: 8px  | md: 16px | lg: 24px | xl: 32px | 2xl: 48px
```

---

## 📑 ESTRUCTURA DE PÁGINAS

### 1. HOME PAGE (/)
```
Secciones (en orden):
1. HEADER NAV
   ├─ Logo BHV (40px)
   ├─ Menu: [Servicios] [RFS] [How Works] [Portfolio] [Blog]
   ├─ Logos aliados miniatura (derecha, 60px cada uno)
   └─ [Aplicar] CTA + Selector idiomas [ES/EN/PT]

2. HERO SECTION (600px height)
   ├─ Título: "Innovar para Regenerar"
   ├─ Subtítulo: "Construyendo la Bioeconomía del Futuro"
   ├─ Descripción corta (2 líneas)
   ├─ 2 CTAs: [Apply as Startup] (primary) + [Discover RFS] (secondary)
   ├─ Countdown timer (si aplica)
   └─ Hero image/video (Mapa Amazonía + elementos tech, 16:9)

3. MANIFIESTO + CONSORCIO (450px)
   ├─ Texto central: "Fundado en alianza estratégica por..."
   ├─ Logos grandes: BioGenia | IGBM | Scale (170px cada uno)
   ├─ Mini descripción de cada aliado (3 líneas max)
   └─ [Learn about consortium] link

4. NUESTROS SERVICIOS (700px)
   ├─ Sección título + descripción
   ├─ Grid 3 cols (mobile: 1 col) con 6 service cards:
   │  ├─ 1️⃣ Mentoría Especializada
   │  ├─ 2️⃣ Acceso a Capital & Financiamiento
   │  ├─ 3️⃣ Alianzas Corporativas & Pilot
   │  ├─ 4️⃣ Educación & Herramientas
   │  ├─ 5️⃣ Certificación Blockchain
   │  └─ 6️⃣ Pre-aceleración & Seguimiento
   ├─ Cada card: icono + título + bullets + "Learn more"
   └─ Fondo: #F0F9F7 muy claro

5. MÉTRICAS DE IMPACTO (400px)
   ├─ Grid 2x3 con 6 badges:
   │  ├─ 8 Cohortes Completadas
   │  ├─ 45+ Startups Aceleradas
   │  ├─ 3 Países de Origen
   │  ├─ 12+ Aliados Corporativos
   │  ├─ USD 15MM+ Movilizados
   │  └─ 250+ Makers del Ecosistema
   ├─ Animación de contadores (0 → número en 2 seg)
   └─ Fondo: blanco sobre #F0F9F7

6. INSIDE BHV (Tabs) (500px)
   ├─ 4 Tabs: [Metodología] [Evaluación] [Alianzas] [Post-exit]
   └─ Contenido dinámico por tab (ver detalles abajo)

7. 10 REQUESTS FOR STARTUPS (800px)
   ├─ Sección título
   ├─ Filter buttons: [All] [Pilar I] [Pilar II] [Pilar III] [Pilar IV]
   ├─ Grid 4 cols (mobile: 1 col) con RFS cards:
   │  └─ Cada card: Título + Pilar badge + TAM + [Read More] + [Apply]
   └─ Modal interactivo: problema + por qué ahora + equipo + indicadores

8. BOOTCAMP TIMELINE (600px)
   ├─ Título: "8 Semanas de Transformación"
   ├─ Timeline vertical (mobile) / horizontal (desktop)
   ├─ 8 cards expandibles:
   │  └─ Semana N: Tema | Herramientas | Entregable
   └─ Demo Day destacado (semana 8)

9. PORTFOLIO STARTUPS (600px)
   ├─ Sección: "Portfolio: Startups de Impacto"
   ├─ Hero card destacado: ApiRobotics (ranked #1)
   ├─ Grid 3 cols con 5 startups más (top startups)
   └─ [View Full Portfolio] link → /portfolio

10. TESTIMONIOS (500px)
    ├─ Carousel 3 cols con 6+ testimonios
    ├─ Cada card: quote (100 chars max) + foto + nombre + empresa
    └─ Star rating + link a LinkedIn

11. FINAL CTA (400px)
    ├─ Banner full-width, gradiente azul-verde
    ├─ Headline: "¿Listo para transformar tu bioidea?"
    ├─ Timeline: "Convocatoria: 15 ago - 15 oct 2026"
    └─ 2 CTAs: [Apply Now] (primary) + [Schedule a Call] (secondary)

12. FOOTER
    ├─ 3 columnas + social + idiomas
    ├─ Logos aliados (full color, 100px cada uno)
    └─ Copyright + links legales
```

---

### 2. APPLY PAGE (/apply)

```
Estructura:
┌─ HERO (500px)
│  ├─ Título: "Join the Revolution"
│  └─ Descripción: Qué esperar del bootcamp
│
├─ TABS: [Apply as Startup] [Apply as Mentor]
│
├─ REQUIREMENTS CHECKLIST
│  ├─ ✓ Equipo mínimo 2 personas
│  ├─ ✓ Validación inicial (piloto, cliente, MVP)
│  ├─ ✓ Problema en bioeconomía amazónica
│  └─ ✓ Alineación con uno de 10 RFS (preferred)
│
├─ FORM SECTION
│  ├─ Integración Airtable Embedded Form
│  ├─ Campos:
│  │  ├─ Team info (names, roles, LinkedIn)
│  │  ├─ Company/Project name
│  │  ├─ Problem statement (text area)
│  │  ├─ Which RFS? (dropdown + description)
│  │  ├─ Video pitch link (YouTube/Loom)
│  │  ├─ Deck PDF upload
│  │  ├─ Traction (users, revenue, pilots)
│  │  ├─ Which services? (checkboxes)
│  │  └─ Email + phone
│  └─ Submit button + progress indicator
│
├─ FAQ ACCORDION
│  ├─ ¿Cuál es el costo del bootcamp?
│  ├─ ¿Qué pasa después del Demo Day?
│  ├─ ¿Cómo se evalúa?
│  ├─ ¿Pueden aplicar equipos internacionales?
│  └─ ¿Tienen equity de las startups?
│
└─ SUCCESS SCREEN
   ├─ Confirmación + próximos pasos
   └─ Link a agendar call con team BHV
```

---

### 3. RFS PAGE (/rfs)

```
Estructura:
┌─ HERO (400px)
│  ├─ Título: "10 Desafíos para Builders"
│  └─ Descripción: Qué son las RFS
│
├─ FILTER BUTTONS
│  └─ [All] [Pilar I: Trazabilidad] [Pilar II: Bioinsumos] 
│     [Pilar III: Gobernanza] [Pilar IV: Agua+Energía]
│
├─ GRID RFS CARDS (4 cols, mobile: 1 col)
│  ├─ Cada card:
│  │  ├─ Número RFS (1-10)
│  │  ├─ Título (ej: "Blockchain for Benefit Sharing")
│  │  ├─ Pilar visual (badge + color)
│  │  ├─ Descripción corta (2 líneas)
│  │  ├─ TAM badge (ej: USD 2-5B)
│  │  ├─ [Read More] → abre modal
│  │  └─ [Apply to this RFS] → pre-fill apply form
│  └─ Total: 10 cards (2.5 filas)
│
└─ MODAL EXPANDIBLE
   ├─ Título RFS
   ├─ Secciones expandibles:
   │  ├─ El Problema (texto + contexto)
   │  ├─ Por Qué Ahora (timing + regulatory)
   │  ├─ Qué Buscamos (equipo ideal)
   │  ├─ Indicadores de Éxito (métricas 8 sem)
   │  ├─ TAM & Ejemplos (mercado)
   │  └─ [Apply to this RFS] button
   └─ Close button + scroll suave
```

---

### 4. HOW IT WORKS PAGE (/how-it-works)

```
Estructura:
┌─ HERO (500px)
│  ├─ Título: "8 Semanas de Transformación"
│  └─ Descripción: Metodología + rigor
│
├─ TIMELINE INTERACTIVO
│  ├─ Desktop: Horizontal timeline con 8 cards
│  ├─ Mobile: Vertical timeline con dots conectores
│  └─ Cada week card:
│     ├─ Semana N (1-8)
│     ├─ Tema principal
│     ├─ [Expandir] para ver:
│     │  ├─ Objetivo del módulo
│     │  ├─ Herramientas clave
│     │  ├─ Entregable
│     │  └─ Métricas de éxito
│     └─ Color coding por pilar
│
├─ METODOLOGÍAS DESTACADAS (4 cols)
│  ├─ Design Thinking (card + icon)
│  ├─ Lean Startup (card + icon)
│  ├─ Lean Coding (card + icon)
│  └─ Agile (Scrum/Kanban) (card + icon)
│
├─ EVALUACIÓN RUBRIC (Visual)
│  ├─ Tabla: Criterio | Peso | Rango
│  │  ├─ Participación: 15% | 0-100
│  │  ├─ Entregables: 30% | 0-100
│  │  ├─ CRM + KPIs: 15% | 0-100
│  │  ├─ Pitch & Demo Day: 25% | 0-100
│  │  └─ Roadmap 12M: 15% | 0-100
│  └─ Escala de aprobación (60+)
│
├─ DEMO DAY SECTION (400px)
│  ├─ Fecha + ubicación (25 abril, Casa Tovar)
│  ├─ Video Demo Day anterior (embed YouTube)
│  ├─ Fotos de startups pitch-ando (gallery)
│  └─ Jurado de inversores (avatares + nombres)
│
└─ PRE-ACELERACIÓN TEASER
   └─ "¿Calificaste? Acceso a 12 meses de pre-aceleración"
```

---

### 5. SERVICIOS PAGE (/servicios)

```
Estructura:
┌─ HERO (400px)
│  ├─ Título: "Servicios Integrales"
│  └─ Descripción: Toolkit completo para bioemprendedores
│
├─ 6 SERVICIO SECTIONS (expandibles)
│  │
│  ├─ 1️⃣ MENTORÍA ESPECIALIZADA
│  │  ├─ Expandir/collapse
│  │  ├─ Descripción detallada
│  │  ├─ Especialidades: Biotech | Finanzas | Regulación | GTM | IP
│  │  ├─ Beneficios listados
│  │  └─ Link a /mentores
│  │
│  ├─ 2️⃣ ACCESO A CAPITAL & FINANCIAMIENTO
│  │  ├─ Club de Inversionistas BHV
│  │  ├─ VCs de impacto (Mercy Corps, Jaguar, BID Lab)
│  │  ├─ Grants (CONCYTEC, ProInnóvate)
│  │  ├─ BNPL options
│  │  └─ Tasa de levante: 80%+ de cohortas
│  │
│  ├─ 3️⃣ ALIANZAS CORPORATIVAS & PILOT
│  │  ├─ Grid de logos de corporativos (12+)
│  │  ├─ Beneficios de alianzas
│  │  ├─ Ejemplos de pilotos
│  │  └─ Link a /consorcio
│  │
│  ├─ 4️⃣ EDUCACIÓN & HERRAMIENTAS
│  │  ├─ Módulos educativos (6 módulos)
│  │  ├─ Herramientas incluidas (Raven CRM, Jupyter, Figma, etc)
│  │  └─ Acceso a Workspace premium
│  │
│  ├─ 5️⃣ CERTIFICACIÓN BLOCKCHAIN
│  │  ├─ Certificates emitidos en Blockcerts
│  │  ├─ Tipos: Participación | Mentoría | Milestones
│  │  ├─ Verificables en LinkedIn
│  │  └─ Link a Blockcerts verification
│  │
│  └─ 6️⃣ PRE-ACELERACIÓN & SEGUIMIENTO
│     ├─ Programa 12 meses post-bootcamp (top startups)
│     ├─ Intensidad: 10 hrs/mes mentoría
│     ├─ Ronda Seed (gestión)
│     ├─ Expansión regional (LATAM)
│     └─ Top 3: mentoría a 24 meses
│
├─ SERVICE COMPARISON TABLE
│  ├─ Rows: Bootcamp | Pre-aceleración | Full Ecosystem
│  ├─ Cols: Mentoría | Capital | Alianzas | Educación | Blockchain
│  └─ Checkmarks + intensidad por servicio
│
└─ CTA: "¿Cuál es el servicio ideal para ti?" [Schedule Demo]
```

---

### 6. PORTFOLIO PAGE (/portfolio)

```
Estructura:
┌─ HERO (400px)
│  ├─ Título: "Portfolio: Startups de Impacto"
│  └─ Descripción: 45+ startups 2024-2026
│
├─ SEARCH + FILTERS (sticky on scroll)
│  ├─ Search by name
│  └─ Filters:
│     ├─ Area: [Trazabilidad] [Bioinsumos] [Gobernanza] [Agua+Energía] [All]
│     ├─ País: [Perú] [Colombia] [Ecuador] [Brasil]
│     ├─ Stage: [Seed] [Pre-seed] [Series A]
│     └─ Cohorte: [2024-II] [2025-I] [2026-I]
│
├─ STARTUP CARDS GRID (3 cols, mobile: 1 col)
│  ├─ Cada card:
│  │  ├─ Hero image (16:9) o logo
│  │  ├─ Nombre startup
│  │  ├─ Tagline (1 línea)
│  │  ├─ Avatares de 2-3 fundadores (28px)
│  │  ├─ Tags: Area | País | Stage
│  │  ├─ TAM + Ronda actual (ej: Seed Round: USD 250K)
│  │  ├─ Badges: "Raising" | "Pre-aceleración" | "Demo Day"
│  │  └─ CTAs: [Visit Website] [More Details →]
│  └─ Total: 45+ cards con lazy loading
│
└─ STARTUP DETAIL MODAL/SUBPAGE
   ├─ Header image (16:9)
   ├─ Logo + nombre
   ├─ Problema + solución (2-3 párrafos)
   ├─ Traction section:
   │  ├─ Usuarios/clientes (si aplica)
   │  ├─ Revenue (si aplica)
   │  ├─ Traction metrics (pilotos, pilots, etc)
   │  └─ Media features
   ├─ Equipo section:
   │  ├─ Avatares + bios de 2-3 fundadores
   │  └─ Links LinkedIn
   ├─ Ronda de inversión (si aplica)
   │  ├─ Stage + monto
   │  ├─ Lead investor
   │  └─ Timeline
   ├─ Cohorte BHV info:
   │  ├─ Cuándo participó
   │  ├─ Ranking/score (si es público)
   │  └─ Mentor asignado
   ├─ Blog posts / Updates (últimos 5)
   └─ Social links: Website | LinkedIn | Twitter
```

---

### 7. CONSORCIO PAGE (/consorcio)

```
Estructura:
┌─ HERO (400px)
│  ├─ Título: "Asociación de Bioemprendedores"
│  └─ Tagline: El ecosistema que funda BioHubVenture
│
├─ MANIFIESTO (500px)
│  ├─ Historia del consorcio
│  ├─ Misión colectiva
│  └─ Timeline visual: 2024 → 2026 → 2030
│
├─ ALIADOS FUNDADORES (3 cols detail cards)
│  │
│  ├─ BIOGENIA
│  │  ├─ Logo (full size)
│  │  ├─ Tagline: "Biotech Innovations"
│  │  ├─ Misión detallada
│  │  ├─ Aporte al ecosistema:
│  │  │  ├─ Mentorías técnicas en biotech
│  │  │  ├─ MVP validation labs
│  │  │  ├─ Corporate partnerships (L'Oréal, Natura, Henkel)
│  │  │  └─ Aceleración de prototipado
│  │  ├─ Especialidades (6+ tags)
│  │  └─ [Visit website] [Contact]
│  │
│  ├─ IGBM
│  │  ├─ Logo (full size)
│  │  ├─ Full name: "Instituto de Genética Bárbara McClintock"
│  │  ├─ Misión detallada
│  │  ├─ Aporte al ecosistema:
│  │  │  ├─ Mentorías en regulación (GLP/GMP, Nagoya, patentes)
│  │  │  ├─ Acceso a laboratorios de investigación
│  │  │  ├─ Validación científica de MVPs
│  │  │  └─ Consultoría de IP + Freedom to Operate (FTO)
│  │  ├─ Especialidades (6+ tags)
│  │  └─ [Visit website] [Contact]
│  │
│  └─ SCALE INCUBADORA
│     ├─ Logo (full size)
│     ├─ Tagline: "Incubadora de Impacto"
│     ├─ Misión detallada
│     ├─ Aporte al ecosistema:
│     │  ├─ Mentoría en finanzas & fundraising
│     │  ├─ Modelos de negocio sostenibles
│     │  ├─ Conexión con VC de impacto
│     │  └─ Escalabilidad & go-to-market
│     ├─ Especialidades (6+ tags)
│     └─ [Visit website] [Contact]
│
├─ ALIADOS CORPORATIVOS (Logo wall + detail)
│  ├─ "Nuestros Corporate Partners"
│  ├─ Grid de logos (12-15 corporativos)
│  │  └─ Barry Callebaut | Nufarm | Natura | Corteva | 
│  │     Mercadolibre | Danone | L'Oréal | Henkel | etc
│  └─ Cada logo expandible → case study mínimo
│
├─ MAPA INTERACTIVO (Ubicaciones aliados)
│  ├─ Mapbox embed
│  ├─ Pins: Lima | Oxapampa | Bogotá | Quito | São Paulo
│  └─ Click en pin → info de aliado local
│
└─ CALL TO ACTION
   └─ "¿Tu organización quiere sumarse?" [Proponer Colaboración]
```

---

### 8. MENTORES PAGE (/mentores)

```
Estructura:
┌─ HERO (400px)
│  ├─ Título: "Red de Mentores"
│  └─ Descripción: 50+ especialistas en bioeconomía
│
├─ SEARCH + FILTER
│  ├─ Search by name
│  └─ Filters:
│     ├─ Especialidad: [Biotech] [Finanzas] [Regulación] [GTM] [IP] [All]
│     ├─ Industria: [Cosmética] [Alimentos] [Agroindustria] [Energía] [All]
│     └─ Disponibilidad: [Activo] [2-3 hrs/mes] [5+ hrs/mes]
│
├─ MENTOR CARDS GRID (4 cols, mobile: 2 cols)
│  ├─ Cada card:
│  │  ├─ Foto circular (120px)
│  │  ├─ Nombre + apellido
│  │  ├─ Especialidad principal (badge)
│  │  ├─ Mini bio (2 líneas)
│  │  ├─ Disponibilidad (hrs/mes)
│  │  ├─ Empresas anteriores (logos pequeños)
│  │  └─ CTAs: [View Profile] [Schedule 1:1]
│  └─ Total: 50+ mentores con lazy loading
│
└─ MENTOR PROFILE DETAIL (Modal/Subpage)
   ├─ Foto + nombre
   ├─ Especialidades (6+ tags)
   ├─ Bio completa (500 palabras)
   ├─ Experiencia:
   │  ├─ Empresas (títulos, años)
   │  └─ Éxitos (exits, unicorns, etc)
   ├─ Enfoque de mentoría (párrafo)
   ├─ Startups mentoreadas (logos)
   ├─ Disponibilidad + costo (si aplica)
   ├─ Reviews/testimonios de mentees
   └─ [Schedule 1:1 Session] CTA
```

---

### 9. BLOG PAGE (/blog)

```
Estructura:
┌─ HERO (400px)
│  ├─ Título: "Conocimiento del Ecosistema"
│  └─ Descripción: Guías, casos, investigación
│
├─ FEATURED POST (Hero card, 50% ancho)
│  ├─ Large image (16:9)
│  ├─ Título + autor + date
│  ├─ Excerpt
│  └─ [Read Full Post →]
│
├─ CATEGORY FILTERS
│  └─ [All] [Biotech] [Finanzas] [Regulación] [Casos] [Guías]
│
├─ BLOG POSTS GRID (3 cols, mobile: 1 col)
│  ├─ Cada post card:
│  │  ├─ Featured image (16:9)
│  │  ├─ Category badge
│  │  ├─ Título (3 líneas max)
│  │  ├─ Excerpt (100 chars)
│  │  ├─ Author avatar + name
│  │  ├─ Publication date
│  │  ├─ Read time (ej: 5 min read)
│  │  └─ Tags (3-4 tags)
│  └─ Total: 20+ posts initially
│
├─ PAGINATION / LOAD MORE
│  └─ [Load More Posts] o numbered pages
│
├─ NEWSLETTER SIGNUP (sticky or inline)
│  ├─ Headline: "Historias de impacto cada 2 semanas"
│  ├─ Email input
│  └─ [Suscribirse] button
│
└─ RELATED POSTS (bottom of each post)
   └─ 3 related posts recommendations
```

### 10. CONTACT PAGE (/contacto)

```
Estructura:
┌─ HERO (300px)
│  └─ Título: "Contacto & Ubicaciones"
│
├─ CONTACT FORM
│  ├─ Name + Email + Phone
│  ├─ Subject (dropdown): [Aplicar] [Ser Mentor] [Alianza] [Otro]
│  ├─ Message (textarea)
│  └─ [Send] button
│
├─ CONTACT INFO (3 cols)
│  ├─ Email: biohubventure@gmail.com
│  ├─ WhatsApp: +51 XXX XXX XXXX
│  └─ Horario: Lun-Vie 9am-6pm (GMT-5)
│
├─ UBICACIONES (2 locations)
│  ├─ Lima (HQ)
│  │  ├─ Dirección + mapa embed
│  │  └─ [Get Directions]
│  └─ Oxapampa (Amazonia center)
│     ├─ Dirección + mapa embed
│     └─ [Get Directions]
│
└─ SOCIAL LINKS
   └─ LinkedIn | Twitter | Instagram | TikTok
```

---

## 🧩 COMPONENTES REUTILIZABLES

### C1: Card Component
```jsx
<Card
  variant="rfs" | "startup" | "service" | "mentor"
  title="RFS 1: Blockchain for Benefit Sharing"
  description="Automatizar verificación Nagoya Protocol..."
  image={imageUrl}
  tags={["Trazabilidad", "USD 2-5B"]}
  cta_primary={{ text: "Read More", onClick: openModal }}
  cta_secondary={{ text: "Apply Now", href: "/apply" }}
  highlight={false}
  color="#2D9B4C"
/>
```

### C2: ServiceCard Component
```jsx
<ServiceCard
  number={1}
  icon="mentorship"
  title="Mentoría Especializada"
  description="Acceso a 50+ mentores en biotech, finanzas..."
  benefits={["Mentoría 1:1", "Talleres semanales", "Red de 250+ makers"]}
  color="#2D9B4C"
  expanded={false}
/>
```

### C3: RFSModal Component
```jsx
<RFSModal
  rfs={{
    title: "RFS 1: Beneficio Compartido en Blockchain",
    problem: "...",
    why_now: "...",
    what_we_search: "...",
    success_metrics: [...],
    tam: "USD 2-5B"
  }}
  onClose={() => setOpen(false)}
/>
```

### C4: Timeline Component
```jsx
<BootcampTimeline
  weeks={8}
  modules={[
    { week: 1, title: "Contexto Amazónico", icon: "map", tools: [...] },
    { week: 2, title: "Propuesta de Valor", icon: "lightbulb", tools: [...] },
    // ... 6 más
  ]}
  currentWeek={1}
/>
```

### C5: MetricsBadge Component
```jsx
<MetricsBadge
  number="45+"
  label="Startups Aceleradas"
  icon="rocket"
  highlight={true}
  animateCounter={true}
/>
```

### C6: FilterButtons Component
```jsx
<FilterButtons
  categories={["All", "Trazabilidad", "Bioinsumos", "Gobernanza", "Agua+Energía"]}
  onFilter={(category) => filterCards(category)}
  activeCategory="All"
/>
```

### C7: ConsortiumCard Component
```jsx
<ConsortiumCard
  logo="/logos/biogenia.png"
  name="BioGenia"
  tagline="Biotech Innovations"
  description="Empresa enfocada en innovación..."
  contributions={["Mentorías técnicas", "MVP validation", "Corporate links"]}
  website="https://biogenia.com"
/>
```

### C8: StartupCard Component
```jsx
<StartupCard
  name="ApiRobotics"
  tagline="Robótica aplicada a agricultura"
  image="/startups/apirobotics.jpg"
  founders={[{ name: "Juan", url: "linkedin.com/..." }, ...]}
  tam="USD 500M"
  stage="Seed Round"
  badges={["Raising", "Demo Day"]}
  country="PE"
  onClick={() => openDetail()}
/>
```

### C9: Button Component (CTA Primary/Secondary)
```jsx
<Button
  variant="primary" | "secondary" | "outline"
  size="sm" | "md" | "lg"
  text="Apply as Startup"
  href="/apply"
  onClick={handleClick}
  loading={false}
  disabled={false}
/>
```

### C10: NewsletterSignup Component
```jsx
<NewsletterSignup
  placeholder="Tu email"
  buttonText="Suscribirse"
  successMessage="¡Gracias! Revisar tu inbox en 5 min"
  onSubmit={(email) => handleSubscribe(email)}
/>
```

---

## 📊 INTEGRACIONES & DATA

### Airtable Bases Requeridas:

**Base 1: BHV Contenido**
```
Tables:
├─ RFS (10 registros)
│  ├─ Fields: id, title, pillar, description, problem, 
│  │           why_now, what_we_search, success_metrics, tam, 
│  │           icon, color
│  └─ API: sync cada 1 hora
│
├─ Servicios (6 registros)
│  ├─ Fields: id, title, icon, description, benefits[], 
│  │           expanded_content, link_learn_more
│  └─ API: sync cada 1 hora
│
├─ Aliados (3 + 12 corporativos)
│  ├─ Fields: id, name, logo_url, tagline, description, 
│  │           website, contributions[], contact
│  └─ API: sync cada 1 hora
│
└─ Blog Posts (20+ records)
   ├─ Fields: id, title, slug, content, excerpt, featured_image,
   │           author, date, category, tags[], read_time
   └─ API: sync cada 1 hora
```

**Base 2: BHV Dinámico**
```
Tables:
├─ Startups (45+ registros)
│  ├─ Fields: id, name, tagline, logo, hero_image, founders[],
│  │           problem, solution, traction, team_size, 
│  │           country, area, stage, tam, website, social_links,
│  │           cohort, ranking, badges[], pitch_video
│  └─ API: sync cada 2 horas (actualización de rankings)
│
├─ Mentores (50+ registros)
│  ├─ Fields: id, name, photo, bio, specialties[], 
│  │           experience[], background, mentoring_approach,
│  │           startups_mentored[], availability_hrs, cost,
│  │           linkedin_url, email
│  └─ API: sync cada 1 hora
│
└─ Applications (incoming)
   ├─ Fields: id, team_names, email, phone, company_name, 
   │           problem_statement, rfs_applied, video_link, 
   │           deck_url, traction, submitted_date, status
   └─ Webhook: create new record cuando form submit
```

### APIs Externas:

```
├─ Typeform (fallback forms)
│  └─ Webhook → Airtable "Applications" base
│
├─ Buttondown (Newsletter)
│  └─ API: manage subscribers
│
├─ Google Analytics 4
│  └─ Tracking: pageviews, events (apply clicks, rfs views, etc)
│
├─ Hotjar
│  └─ Heatmaps, session recordings, surveys
│
├─ Mapbox
│  └─ Maps: ubicaciones aliados (consorcio page)
│
└─ Calendly
   └─ Embed: "Schedule 1:1" con mentores (si aplica)
```

---

## 📱 RESPONSIVE DESIGN

### Breakpoints:
```
Mobile:     0-640px   → 1 col, font -20%, images 100vw
Tablet:     641-1024px → 2 cols, responsive spacing
Desktop:    1025px+   → Full design as specified, 3+ cols
XL:         1440px+   → Max-width container (1200px)
```

### Mobile-First Adjustments:
```
├─ Home hero: 400px (mobile) vs 600px (desktop)
├─ Grid RFS: 1 col (mobile) vs 4 cols (desktop)
├─ Services cards: stack vertical (mobile)
├─ Logos aliados: 80px (mobile) vs 170px (desktop)
├─ Header nav: hamburger (mobile) vs full nav (desktop)
├─ Footer: 1 col (mobile) vs 3 cols (desktop)
└─ Fonts: 14px body (mobile) vs 16px (desktop)
```

---

## 🎬 ANIMACIONES & INTERACTIVIDAD

### Micro-interactions:
```
├─ Button hover: +5% scale + color transition (200ms)
├─ Card hover: +2px shadow lift + slight scale (150ms)
├─ Filter click: fade out cards + fade in filtered (300ms)
├─ Modal open: backdrop fade-in (200ms) + content slide-up (300ms)
├─ Scroll reveal: cards fade-in as they enter viewport (400ms)
├─ Counter animation: 0 → number in 2sec (easeOut cubic)
├─ Tab switch: fade transition (150ms)
└─ Link hover: underline appear (100ms)
```

### Page Transitions:
```
├─ Between pages: fade (150ms)
├─ Between tabs: fade (100ms)
└─ Modal: backdrop blur (200ms)
```

---

## 🔍 SEO & Performance

### SEO Requirements:
```
├─ Meta tags (title, description, og:image) per page
├─ Structured data: Schema.org (Organization, Event, FAQPage)
├─ Open Graph tags (sharing on social)
├─ Sitemap.xml + robots.txt
├─ Canonical URLs
├─ Internal linking strategy (RFS → Apply, Services → Apply)
├─ Alt text on all images
└─ Mobile-friendly validation (Core Web Vitals)
```

### Performance Targets:
```
├─ Lighthouse score: >90
├─ LCP (Largest Contentful Paint): <2.5s
├─ FID (First Input Delay): <100ms
├─ CLS (Cumulative Layout Shift): <0.1
├─ Image optimization: WebP + lazy loading
├─ Code splitting per route
└─ Caching strategy: CDN (Vercel) + browser cache
```

---

## 🔐 SEGURIDAD & PRIVACIDAD

### Requirements:
```
├─ HTTPS only
├─ Privacy Policy (GDPR compliant)
├─ Terms of Service
├─ Cookie banner (accept analytics/marketing)
├─ Form validation (XSS prevention)
├─ Rate limiting on API calls
├─ Environment variables (API keys, secrets)
└─ No personal data in URLs
```

---

## 🚀 DEPLOYMENT & DEVOPS

### Hosting:
```
├─ Platform: Vercel (Next.js optimized)
├─ Domain: bhv2026.com (o similar)
├─ DNS: Cloudflare
├─ SSL: Auto (Vercel + Cloudflare)
├─ CDN: Vercel edge + Cloudflare
└─ Backups: GitHub + Vercel
```

### CI/CD:
```
├─ Repository: GitHub (public + private)
├─ Branches: main (production) + staging
├─ Auto-deploy: push to main → build + deploy (5 min)
├─ Pre-deploy checks: linting, testing, build
├─ Rollback: 1-click via Vercel dashboard
└─ Monitoring: Sentry (errors) + Vercel Analytics
```

### Environment Configurations:
```
Development:  localhost:3000 (local)
Staging:      staging-bhv2026.vercel.app
Production:   bhv2026.com
```

---

## 📋 ASSETS ENTREGABLES

### Por Stitch (Prototipado):
```
✅ Interactive prototype (Figma → Stitch)
✅ Click-through demo (hero → apply → success)
✅ Mobile prototype (responsive preview)
✅ Component library (visual handoff)
✅ Design system documentation
✅ Spacing, typography, color specs
```

### Por Antigravity (Desarrollo):
```
✅ Next.js 14 repository (GitHub ready)
✅ TypeScript types for all components
✅ Tailwind CSS + custom config
✅ Airtable integrations (with schemas)
✅ Form handling (validation + submission)
✅ Routing structure (all 10 pages)
✅ Analytics setup (GA4 + Hotjar)
✅ SEO setup (meta tags + structured data)
✅ Deployment config (Vercel)
✅ README + setup instructions
✅ Testing suite (Cypress E2E)
✅ Deployment + monitoring
```

---

## 📅 TIMELINE & MILESTONES

### Week 1-2: Discovery & Design (Stitch)
```
├─ Wireframe validation with BHV
├─ Figma design system
├─ Component library creation
└─ Design handoff package
```

### Week 3-4: Frontend Build (Antigravity)
```
├─ Next.js setup + structure
├─ Component implementation
├─ Home page + hero
├─ RFS page + modal
└─ Apply form
```

### Week 5-6: Backend & Integrations (Antigravity)
```
├─ Airtable API integration
├─ Typeform embed
├─ Newsletter signup
├─ GA4 + Hotjar
└─ All remaining pages
```

### Week 7: Testing & QA (Antigravity)
```
├─ Cypress E2E tests
├─ Manual testing (all devices)
├─ Performance audit
├─ SEO validation
└─ Accessibility check
```

### Week 8: Launch (Antigravity + BHV)
```
├─ Domain setup
├─ DNS configuration
├─ Vercel deployment
├─ Final checks
└─ Go live + monitoring
```

**Total Duration: 8 weeks**

---

## 💬 TONE & VOICE

```
├─ Primary: Professional + hopeful + action-oriented
├─ Audience: Founders (early-stage), mentors, investors, corporativos
├─ Language: Español (default) + English + Portugués
├─ Style: Direct, clear, data-backed, never hype
├─ Metaphors: Biology, regeneration, innovation, growth
└─ CTAs: Imperative, clear action ("Apply Now" not "Learn More")
```

---

## 📞 SUPPORT & MAINTENANCE

### Post-Launch (Year 1):
```
├─ Bug fixes: within 24 hours
├─ Performance monitoring: daily
├─ Content updates: as needed (blog, startup roster)
├─ Security patches: as needed
├─ Feature requests: quarterly review
└─ Analytics review: weekly + monthly summary
```

### Ongoing:
```
├─ Blog content: 2 posts/month
├─ Newsletter: biweekly
├─ Startup updates: monthly
├─ Mentor additions: quarterly
└─ RFS updates: per cohorte (anual)
```

---

## 📎 REFERENCIA: DOCUMENTOS INCLUIDOS

**Estos son los documentos que alimentan este prompt:**

1. ✅ **RFS_BHV_2026_II_Calls_Oficial.md**
   - 10 Requests for Startups detalladas
   - Estructura completa de cada RFS
   - TAMs y contexto regulatorio

2. ✅ **BHV_Web_Implementation_v2_ConServicios.md**
   - Arquitectura de información
   - Wireframes de todas las páginas
   - Componentes reutilizables
   - Roadmap técnico

3. ✅ **Logos de Aliados**
   - logo_biogenia.png
   - logo_IGBM.jpg
   - logotipo_scale_color_2.png

4. ✅ **Paleta de Colores Validada**
   - BHV Azul: #003D7A
   - BHV Verde: #2D9B4C
   - BHV Acento: #7ACD42

---

## ✅ CHECKLIST DE INICIO

### Para Stitch:
- [ ] Acceso a Figma link
- [ ] Acceso a asset repository (logos, colores, fonts)
- [ ] Referencia: GRIDX website (structure inspiration)
- [ ] Feedback ciclo: Dave @ BHV

### Para Antigravity:
- [ ] GitHub repository creado
- [ ] Airtable bases configuradas
- [ ] Environment variables setup
- [ ] Vercel proyecto creado
- [ ] Feedback ciclo: Dave @ BHV

---

## 🎯 SUCCESS CRITERIA

### Launch Success:
```
✅ Todas las 10 páginas funcionan
✅ Mobile responsive (testeado en 5+ devices)
✅ Forms submit correctamente a Airtable
✅ Analytics tracking funciona
✅ Lighthouse score >90
✅ Zero console errors
✅ SEO meta tags completas
```

### Business Success (Post-Launch):
```
✅ 5,000+ visitantes/mes
✅ 5-8% home → apply conversion
✅ 200+ aplicaciones en 60 días
✅ <2s load time
✅ 70%+ apply form completion rate
```

---

## 📧 CONTACTOS CLAVE

**BioHubVenture:**
- Email: biohubventure@gmail.com
- Website: www.biohubventure.com
- Contact: David Chaupis (Programs Coordinator)

**Aliados:**
- BioGenia: info@biogenia.com
- IGBM: contacto@igbm.org
- Scale Incubadora: hola@scaleincubadora.com

---

## 📄 DOCUMENTO MAESTRO

**Versión:** 1.0  
**Fecha:** Julio 31, 2026  
**Estado:** 🟢 LISTO PARA BUILD  
**Audiencia:** Stitch + Antigravity + BHV Team  

---

**🚀 ¡A construir la bioeconomía del futuro!**

*"Innovar para Regenerar"*

