# 🌿 Plan de Implementación Web BHV 2026-II | V2
## Con Sección de Servicios + Consorcio Fundador

---

## 📋 ACTUALIZACIONES V2

### Cambios principales desde V1:

✅ Agregar sección **"Nuestros Servicios"** (post-hero, pre-métricas)  
✅ Agregar sección **"Consorcio Fundador"** (footer superior)  
✅ Integrar logos: **BioGenia | IGBM | Scale Incubadora**  
✅ Armonizar paleta con colores de los 3 aliados  
✅ Mencionar **Asociación de Bioemprendedores** en manifiesto  

---

## 🎨 PALETA DE COLORES ACTUALIZADA

### Colores Primarios BHV + Aliados:
```
BHV Azul Corporativo:    #003D7A (identidad principal)
BHV Verde Amazónico:     #2D9B4C
BHV Verde Neón Acento:   #7ACD42

IGBM Azul Celeste:       #5BB8D6 (DNA/ciencia)
BioGenia Verde:          #22B878 (biotech)
BioGenia Cyan:           #00D4D4 (innovación)
Scale Púrpura:           #6B4DD6 (impacto social)
```

### Uso integrado:
- **Header:** Logo BHV azul `#003D7A` + logos aliados (full color)
- **Sección Servicios:** Tarjetas con acento verde `#2D9B4C` + bordes sutiles
- **Sección Consorcio:** Fondo `#F0F9F7` + logos sin fondo blanco
- **Botones CTA:** Verde neón `#7ACD42` con hover a verde oscuro
- **Footer:** Logos de aliados en full color sobre fondo oscuro

---

## 📑 NUEVA ESTRUCTURA DE HOME (V2)

```
┌───────────────────────────────────────────────────────┐
│ HEADER NAV (con logos aliados)                        │
│ [Logo BHV] [Inside] [Services] [RFS] [Apply] [ES/EN] │
│ [Logos miniatura: BioGenia | IGBM | Scale]           │
├───────────────────────────────────────────────────────┤
│                                                       │
│ 1️⃣ HERO SECTION                                       │
│    "Salvando la Amazonía: Bootcamp de Bioeconomía"   │
│    [Apply] [Discover RFS]                            │
│                                                       │
├───────────────────────────────────────────────────────┤
│                                                       │
│ 2️⃣ MANIFIESTO + CONSORCIO                             │
│    "Fundado por BioGenia, IGBM y Scale Incubadora"   │
│    [3 logos grandes + mini descripción de cada uno]  │
│                                                       │
│    "Asociación de Bioemprendedores LATAM"            │
│                                                       │
├───────────────────────────────────────────────────────┤
│                                                       │
│ 3️⃣ SERVICIOS (NUEVO - sección destacada)              │
│    "Qué ofrecemos a founders de bioeconomía"         │
│    [Grid 3 columnas: Mentoría | Financiamiento | etc]│
│                                                       │
├───────────────────────────────────────────────────────┤
│                                                       │
│ 4️⃣ MÉTRICAS DE IMPACTO                                │
│    8 Cohortes | 45+ Startups | 3 Países | etc        │
│                                                       │
├───────────────────────────────────────────────────────┤
│                                                       │
│ 5️⃣ INSIDE BHV (Tabs)                                  │
│    Metodología | Evaluación | Alianzas | Post-exit   │
│                                                       │
├───────────────────────────────────────────────────────┤
│                                                       │
│ 6️⃣ 10 RFS (Requests for Startups)                     │
│    Grid 4 columnas con cards interactivos            │
│                                                       │
├───────────────────────────────────────────────────────┤
│                                                       │
│ 7️⃣ BOOTCAMP TIMELINE (How It Works)                   │
│    8 semanas visualizadas + módulos                  │
│                                                       │
├───────────────────────────────────────────────────────┤
│                                                       │
│ 8️⃣ PORTFOLIO STARTUPS                                 │
│    Top 6 startups destacadas (cards grandes)         │
│    "Ver portfolio completo" link a /portfolio        │
│                                                       │
├───────────────────────────────────────────────────────┤
│                                                       │
│ 9️⃣ TESTIMONIOS                                        │
│    Carousel 3 cols: founders, mentores, corporativos │
│                                                       │
├───────────────────────────────────────────────────────┤
│                                                       │
│ 🔟 CTA FINAL                                          │
│    "¿Listo para transformar tu bioidea?"             │
│    [Apply Now] [Schedule Call]                       │
│                                                       │
├───────────────────────────────────────────────────────┤
│ FOOTER (con logos aliados)                           │
│ [3 columnas info] [Social] [Idiomas] [Logos aliados] │
└───────────────────────────────────────────────────────┘
```

---

## 📌 SECCIÓN 2: MANIFIESTO + CONSORCIO FUNDADOR

### Ubicación: Post-hero (después de CTA primario)
### Altura: 500px
### Elementos:

```
┌────────────────────────────────────────────────────────┐
│                                                        │
│           SALVANDO LA AMAZONÍA JUNTOS                 │
│                                                        │
│  Fundado en alianza estratégica por:                  │
│                                                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ [Logo]       │  │ [Logo]       │  │ [Logo]       │ │
│  │ BioGenia     │  │ IGBM         │  │ Scale        │ │
│  │              │  │              │  │ Incubadora   │ │
│  │ Biotech      │  │ Investigación│  │ de Impacto   │ │
│  │ Innovations  │  │ en Genética  │  │              │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│                                                        │
│  Desde 2024, formamos la Asociación de                │
│  Bioemprendedores: un ecosistema dedicado a           │
│  convertir ideas de bioeconomía en empresas           │
│  de impacto que regeneran la Amazonía.                │
│                                                        │
│        [Conoce más sobre el consorcio →]              │
│                                                        │
└────────────────────────────────────────────────────────┘
```

**Detalles técnicos:**
- Fondo: Gradiente sutil de `#F0F9F7` a blanco
- Logos: Full color, 150-180px ancho cada uno
- Texto central: Gris `#1F2937`, fuente grande (H2)
- Descripción: Gris más claro `#4B5563`, 16-18px
- Espaciado: Generoso, visual breathing room

---

## 🛠 SECCIÓN 3: NUESTROS SERVICIOS (NUEVO)

### Ubicación: Post-consorcio, pre-métricas
### Altura: 700px (mobile: 1200px)
### Layout: Grid 3 columnas (mobile: 1 col)

```
┌────────────────────────────────────────────────────────┐
│                                                        │
│              NUESTROS SERVICIOS                        │
│                                                        │
│  Ofrecemos un ecosistema integral de apoyo a          │
│  founders que transforman ideas de bioeconomía        │
│  en empresas sostenibles y rentables.                 │
│                                                        │
├────────────────────────────────────────────────────────┤
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │ 1️⃣  MENTORÍA ESPECIALIZADA                       │ │
│  │ ═══════════════════════════════════════════════  │ │
│  │                                                  │ │
│  │ Acceso a 50+ mentores en:                       │ │
│  │ • Biotech & Biotecnología                       │ │
│  │ • Finanzas & Fundraising                        │ │
│  │ • Regulación & Compliance Amazónico             │ │
│  │ • Go-to-Market & Scale                          │ │
│  │ • Propiedad Intelectual & Patentes              │ │
│  │                                                  │ │
│  │ Mentoría 1:1 (4 hrs/mes mínimo)                 │ │
│  │ Talleres en vivo (martes/jueves)                │ │
│  │                                                  │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │ 2️⃣  ACCESO A CAPITAL & FINANCIAMIENTO              │ │
│  │ ═══════════════════════════════════════════════  │ │
│  │                                                  │ │
│  │ • Club de Inversionistas BHV (ángeles locales)  │ │
│  │ • Conexión con VCs de impacto (Mercy Corps,     │ │
│  │   Jaguar Ventures, BID Lab)                     │ │
│  │ • Acceso a grants (CONCYTEC, ProInnóvate, etc)  │ │
│  │ • Estructura de BNPL (Buy Now Pay Later)        │ │
│  │ • Crowdfunding pre-semilla (post-bootcamp)      │ │
│  │                                                  │ │
│  │ Garantía: 80%+ de cohortas levanta capital      │ │
│  │                                                  │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │ 3️⃣  ALIANZAS CORPORATIVAS & PILOT                │ │
│  │ ═══════════════════════════════════════════════  │ │
│  │                                                  │ │
│  │ Red de 12+ corporativos que buscan innovación:  │ │
│  │ • Barry Callebaut (cacao, ingredientes)         │ │
│  │ • Nufarm (bioinsumos, agritech)                 │ │
│  │ • Natura (cosmética natural)                    │ │
│  │ • Corteva (agro-biotech)                        │ │
│  │ • Y más (en confidentialidad)                   │ │
│  │                                                  │ │
│  │ Beneficios:                                      │ │
│  │ • Acceso a datos reales para validación         │ │
│  │ • Pilotos de producto (2-6 meses)               │ │
│  │ • Potencial de co-inversión                      │ │
│  │ • Path a cliente de producción                  │ │
│  │                                                  │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │ 4️⃣  EDUCACIÓN & HERRAMIENTAS                     │ │
│  │ ═══════════════════════════════════════════════  │ │
│  │                                                  │ │
│  │ Módulos educativos diseñados para founders:      │ │
│  │ • Design Thinking + Customer Discovery          │ │
│  │ • Unit Economics & Financial Modeling           │ │
│  │ • Lean Startup & Product-Market Fit             │ │
│  │ • Regulación Amazónica (Nagoya, GLP/GMP, etc)   │ │
│  │ • Storytelling & Pitch para inversores          │ │
│  │                                                  │ │
│  │ Herramientas incluidas:                          │ │
│  │ • Raven CRM (gestión de contactos)              │ │
│  │ • Jupyter notebooks (financial simulators)      │ │
│  │ • Acceso a Figma, Google Workspace Premium      │ │
│  │                                                  │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │ 5️⃣  CERTIFICACIÓN BLOCKCHAIN                    │ │
│  │ ═══════════════════════════════════════════════  │ │
│  │                                                  │ │
│  │ Certificados digitales verificables en:          │ │
│  │ • Participación en bootcamp                     │ │
│  │ • Mentorías recibidas (por mentor)              │ │
│  │ • Milestones alcanzados (MVP, tracción, etc)    │ │
│  │                                                  │ │
│  │ (Implementado con Blockcerts + blockchain)      │ │
│  │ Compartibles en LinkedIn, CV digital            │ │
│  │                                                  │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │ 6️⃣  PRE-ACELERACIÓN & SEGUIMIENTO                │ │
│  │ ═══════════════════════════════════════════════  │ │
│  │                                                  │ │
│  │ Programa de 12 meses post-bootcamp para          │ │
│  │ startups que califiquen (≥80/100):               │ │
│  │                                                  │ │
│  │ • Mentoría intensiva (10 hrs/mes)               │ │
│  │ • Gestión de ronda de capital (Seed)            │ │
│  │ • Validación de traction & KPIs                 │ │
│  │ • Conexión con segundo lote de inversores      │ │
│  │ • Support en expansión regional (LATAM)         │ │
│  │                                                  │ │
│  │ Top 3 startups: mentoría extendida a 24 meses   │ │
│  │                                                  │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
└────────────────────────────────────────────────────────┘
```

**Detalles técnicos:**
- **Estructura:** 3 cards por fila (desktop) / 1 por fila (mobile)
- **Card design:** Borde superior `3px` en `#2D9B4C`, sombra sutil, hover lift
- **Icono:** Emoji o SVG icon (verde `#2D9B4C`)
- **Título:** H3 en `#003D7A`, 20px, bold
- **Contenido:** Bullets en gris `#4B5563`, 14px
- **Fondo general:** Blanco sobre `#F0F9F7` muy claro
- **Spacing:** 24px entre cards, 40px entre filas

---

## 📋 SECCIÓN 4: CONSORCIO FUNDADOR (Footer Superior)

### Ubicación: Antes del footer principal
### Altura: 400px
### Elementos:

```
┌────────────────────────────────────────────────────────┐
│                                                        │
│          LA ASOCIACIÓN DE BIOEMPRENDEDORES             │
│                                                        │
│  Un consorcio de organizaciones comprometidas con     │
│  la bioeconomía amazónica y el emprendimiento verde   │
│                                                        │
├────────────────────────────────────────────────────────┤
│                                                        │
│  NUESTROS ALIADOS FUNDADORES:                         │
│                                                        │
│  ┌─────────────────────────────────────────────────┐  │
│  │  Logo BioGenia    Logo IGBM     Logo Scale      │  │
│  │  (170px each, full color)                       │  │
│  └─────────────────────────────────────────────────┘  │
│                                                        │
├────────────────────────────────────────────────────────┤
│                                                        │
│  BioGenia Biotech Innovations                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│  Enfoque: Innovación en biotecnología aplicada        │
│  Aporte: Mentorías técnicas, validación de MVP,       │
│          conexión con corporativos (Natura,           │
│          L'Oréal, etc)                                │
│                                                        │
│  Instituto de Genética Bárbara McClintock (IGBM)      │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│  Enfoque: Investigación & regulación en biología      │
│  Aporte: Mentorías en regulación (GLP/GMP, Nagoya,    │
│          patentes), acceso a laboratorios,            │
│          validación científica                        │
│                                                        │
│  Scale Incubadora de Impacto                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│  Enfoque: Aceleración de impacto social & financiero  │
│  Aporte: Mentoría en finanzas, fundraising,           │
│          modelos de negocio, escala,                  │
│          conexión con inversores de impacto           │
│                                                        │
├────────────────────────────────────────────────────────┤
│                                                        │
│     [Conoce el ecosistema completo de aliados →]      │
│                                                        │
└────────────────────────────────────────────────────────┘
```

**Detalles técnicos:**
- **Fondo:** Gradiente sutil de blanco a `#F0F9F7`
- **Logos:** Full color, alineados horizontalmente, 170px cada uno
- **Spacing:** 40px entre logos
- **Descripción por aliado:** 3 columnas, igual ancho, texto centrado
- **Tipografía:** Body text 14-15px, títulos 16px bold en `#003D7A`
- **CTA:** Link "Conoce el ecosistema" en verde `#7ACD42` con hover

---

## 🔗 PÁGINAS ADICIONALES (Nuevas o actualizadas)

### Página: "/servicios" (Servicios Detallados)
```
URL: /servicios

HERO:
  Título: "Servicios Integrales para Bioemprendedores"
  Subtítulo: "Toolkit completo para transformar tu bioidea en empresa"

SECCIONES:
  1. Mentoría Especializada (expandible)
  2. Acceso a Capital (expandible)
  3. Alianzas Corporativas (expandible)
  4. Educación & Herramientas (expandible)
  5. Certificación Blockchain (expandible)
  6. Pre-aceleración (expandible)

SIDEBAR:
  - FAQ: "¿Cuál servicio necesito?"
  - "Compare service packages" table
  - Case studies: "Cómo el Servicio X ayudó a startup Y"
```

### Página: "/consorcio" (Aliados Detallados)
```
URL: /consorcio

HERO:
  Título: "Asociación de Bioemprendedores"
  Subtítulo: "El ecosistema que funda BioHubVenture"

SECCIONES:
  1. Misión colectiva
  2. Historia del consorcio (timeline 2024-2026)
  3. Aliados fundadores (detailed cards)
  4. Aliados corporativos (full list + logos)
  5. Cómo unirse (para nuevas organizaciones)

INTEGRACIONES:
  - Mapa interactivo: ubicaciones de cada aliado
  - Timeline visual: eventos colectivos
  - "Propuestas de colaboración" CTA
```

---

## 🎨 HEADER ACTUALIZADO (Incluir aliados)

```
┌─────────────────────────────────────────────────────────┐
│ Logo BHV [pequeño]  | Servicios | RFS | Portfolio      │
│                     | How Works  | Blog | Apply         │
│                                                          │
│ [Logos aliados miniatura a la derecha]                 │
│ BioGenia (80px) | IGBM (80px) | Scale (80px)          │
│                                                          │
│ [Selector idiomas] [Apply CTA]                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🎨 FOOTER ACTUALIZADO (Incluir aliados)

```
┌─────────────────────────────────────────────────────────┐
│                                                          │
│  INSIDE BHV      │ EXPLORE     │ CONTACT               │
│  • Mission       │ • Servicios │ • biohubventure@...   │
│  • Team          │ • Portfolio │ • +51 XXX             │
│  • Careers       │ • Blog      │ • Lima / Oxapampa     │
│  • Newsroom      │ • Consorcio │                       │
│                  │ • RFS       │                       │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ALIADOS FUNDADORES:                                   │
│  [Logo BioGenia] [Logo IGBM] [Logo Scale]             │
│                                                          │
│  SOCIAL: LinkedIn | Twitter | Instagram | TikTok      │
│                                                          │
│  LEGAL: Privacy | Terms | Cookies                      │
│                                                          │
│  © BioHubVenture 2026 | Asociación de                 │
│  Bioemprendedores LATAM                                │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 📊 CAMBIOS EN ARQUITECTURA GLOBAL

### URLs actualizadas:

```
/ (home)                    ← + Sección Servicios
/servicios                  ← NUEVA PÁGINA
/consorcio                  ← NUEVA PÁGINA
/rfs                        ← Existente
/apply                      ← Existente
/portfolio                  ← Existente
/how-it-works               ← Existente
/mentores                   ← Existente (adicionar logos de aliados)
/blog                       ← Existente
/contacto                   ← Existente (con info de aliados)
```

### Menú de navegación:

```
Primary Nav:
  - Servicios (dropdown a servicios específicos)
  - RFS (requests for startups)
  - Portfolio
  - How It Works
  - Blog

Secondary Nav:
  - Consorcio
  - Mentores & Aliados
  - Careers
  - Apply (CTA destacado)
```

---

## 🎯 COMPONENTES NUEVOS (Para Sección Servicios)

### Service Card Component:
```jsx
<ServiceCard
  number="1"
  title="Mentoría Especializada"
  description="Acceso a 50+ mentores en biotech, finanzas, regulación..."
  benefits={["Mentoría 1:1", "Talleres", "Acceso a red"]}
  icon="mentorship"
  color="#2D9B4C"
/>
```

### Consortium Logo Component:
```jsx
<ConsortiumCard
  logo="/logos/biogenia.png"
  name="BioGenia"
  tagline="Biotech Innovations"
  description="Enfoque en innovación aplicada..."
  contributions={["Mentorías técnicas", "MVP validation", "Corporate partnerships"]}
  color="#22B878"
/>
```

### Service Comparison Table:
```jsx
<ServiceComparison
  packages={["Bootcamp", "Pre-aceleración", "Full Ecosystem"]}
  services={["Mentoría", "Capital", "Alianzas", "Educación", "Blockchain"]}
/>
```

---

## 📱 RESPONSIVE DESIGN (Mobile-First)

### Breakpoints:
- **Mobile (0-640px):** 1 columna, hero 400px, fuentes reducidas
- **Tablet (641-1024px):** 2 columnas para grids, hero 500px
- **Desktop (1025px+):** 3+ columnas, hero 600px+

### Ajustes específicos:
- **Sección Servicios (mobile):** Stack vertical, cards full-width
- **Logos Aliados (mobile):** Stack vertical, 120px ancho
- **Header (mobile):** Menú hamburguesa, logos aliados hidden (mostrar en footer)
- **Footer (mobile):** Versión simplificada, logos aliados 80px

---

## 📊 ROADMAP TÉCNICO ACTUALIZADO

### Fase 2b (NUEVA): Integración de Servicios + Consorcio (1 semana adicional)

```
Fase 2: Diseño (2-3 semanas)
  ├─ Home + Hero ✓
  ├─ All pages ✓
  ├─ Servicios section (NUEVO) +1 semana
  ├─ Consorcio section (NUEVO) +1 semana
  └─ Design handoff
  
Total Fase 2: 3-4 semanas
```

### Timeline total: **7-9 semanas** (antes era 6-8)

---

## 🔗 INTEGRACIONES SERVICIOS

### CMS Content:
```
/content/servicios/
  ├─ mentoria.md
  ├─ capital.md
  ├─ alianzas.md
  ├─ educacion.md
  ├─ blockchain.md
  └─ preaceleracion.md

/content/consorcio/
  ├─ biogenia.md
  ├─ igbm.md
  ├─ scale.md
  └─ aliados-corporativos.md
```

### Airtable Tables:
```
Table: Servicios
  Fields: name, description, icon, benefits[], cta_link

Table: Aliados
  Fields: name, logo_url, tagline, description, contributions[], website, color
```

---

## 🎨 GUÍA DE COLORES POR ELEMENTO

| Elemento | Color | Hex |
|---|---|---|
| Link Servicios | Verde Amazónico | #2D9B4C |
| Icon Servicios | Verde Amazónico | #2D9B4C |
| Border top card | Verde Amazónico | #2D9B4C |
| Logo BioGenia | Verde BioGenia | #22B878 |
| Logo IGBM | Azul IGBM | #5BB8D6 |
| Logo Scale | Púrpura Scale | #6B4DD6 |
| Text Servicios | Gris oscuro | #1F2937 |
| Fondo Servicios | Verde muy claro | #F0F9F7 |

---

## 📝 CONTENIDO PENDIENTE

**⏳ NECESITO DE TI:**

1. **Descripciones de Servicios (6 servicios):**
   - Mentoría Especializada (full description + puntos clave)
   - Acceso a Capital & Financiamiento
   - Alianzas Corporativas & Pilot
   - Educación & Herramientas
   - Certificación Blockchain
   - Pre-aceleración & Seguimiento

2. **Descripciones de Aliados (3 + corporativos):**
   - BioGenia: misión, aporte, especialidades
   - IGBM: misión, aporte, especialidades
   - Scale: misión, aporte, especialidades
   - Lista de corporativos + breve descripción

3. **Case Studies (opcional pero recomendado):**
   - Cómo el Servicio X ayudó a startup Y
   - Resultados medibles
   - Quote del founder

---

## ✅ SUMMARY DE CAMBIOS

### Nuevas secciones en Home:
- ✅ Manifiesto + Consorcio (post-hero)
- ✅ Nuestros Servicios (6 tarjetas expandibles)

### Nuevas páginas:
- ✅ /servicios (full detail page)
- ✅ /consorcio (full detail page)

### Integraciones:
- ✅ Logos BioGenia, IGBM, Scale en header/footer
- ✅ Paleta de colores armonizada con aliados
- ✅ Menciones de Asociación de Bioemprendedores

### Timeline:
- ⏱️ +1-2 semanas de desarrollo (total: 7-9 vs 6-8)
- 💰 Presupuesto: +USD 2-3K (total: USD 13.5-21K)

---

**Documento versionado:** v2.0 | Julio 31, 2026  
**Estado:** Listo para completar con contenido de servicios del doc Google
