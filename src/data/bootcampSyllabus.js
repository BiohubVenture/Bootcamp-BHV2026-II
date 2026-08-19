import { 
  Globe, 
  Lightbulb, 
  BarChart3, 
  ShieldCheck, 
  Coins, 
  Cpu, 
  TrendingUp, 
  Trophy 
} from 'lucide-react';

export const BOOTCAMP_PHASES = [
  {
    id: 'preseed',
    weeks: [1, 2, 3],
    name: 'Pre-seed: Descubrimiento y Validación',
    purpose: 'Entender el problema, validar la propuesta de valor y modelar el negocio con evidencia.',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    accentColor: '#10B981'
  },
  {
    id: 'foundation',
    weeks: [4, 5, 6],
    name: 'Foundation: Construcción de Cimientos',
    purpose: 'Definir la ruta regulatoria, financiera y de producto.',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    accentColor: '#3B82F6'
  },
  {
    id: 'scaling',
    weeks: [7, 8],
    name: 'Early Scaling: Tracción y Comunicación',
    purpose: 'Probar con usuarios, medir tracción y comunicar la oportunidad a inversores.',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    accentColor: '#8B5CF6'
  }
];

export const BOOTCAMP_SYLLABUS = [
  {
    week: 1,
    phaseId: 'preseed',
    phaseName: 'Pre-seed: Descubrimiento y Validación',
    title: 'Contexto Amazónico, Problema y Oportunidad',
    purpose: 'Definir un problema amazónico concreto con evidencia y formular una primera hipótesis de oportunidad verificable.',
    deliverableShort: 'Análisis de Problema & Contexto',
    icon: Globe,
    objective: 'Definir un problema amazónico concreto con evidencia, actores relevantes y una primera hipótesis de oportunidad verificable.',
    topics: [
      'Bioeconomía amazónica y cadenas de valor regionales.',
      'Problema central, causas y efectos.',
      'Mapeo de actores y contexto territorial.',
      'Árbol de problemas, 5 porqués, teoría del cambio e Ishikawa.'
    ],
    practicalWork: [
      'Construir el árbol de problemas con evidencia documental.',
      'Identificar y clasificar stakeholders según poder e interés.',
      'Formular la hipótesis inicial de oportunidad.'
    ],
    tools: ['Miro o Mural', 'Google Docs', 'Raven CRM', 'Canva'],
    keyDeliverable: 'Documento de análisis de problema y contexto: definición del problema, evidencia, mapeo de actores, árbol de problemas e hipótesis de oportunidad.',
    connection: 'El problema y el segmento identificados se convierten en la base de la propuesta de valor y del Customer Discovery de la semana 2.'
  },
  {
    week: 2,
    phaseId: 'preseed',
    phaseName: 'Pre-seed: Descubrimiento y Validación',
    title: 'Propuesta de Valor y Customer Discovery',
    purpose: 'Diseñar una propuesta de valor centrada en el cliente y contrastarla mediante entrevistas reales.',
    deliverableShort: 'VPC & Plan de Customer Discovery',
    icon: Lightbulb,
    objective: 'Diseñar una propuesta de valor centrada en el cliente y contrastarla mediante entrevistas reales.',
    topics: [
      'Propuesta de valor y Value Proposition Canvas.',
      'Jobs-to-be-Done, pains y gains.',
      'Segmentación de clientes en contextos amazónicos.',
      'Diseño de entrevistas y pipeline de Customer Discovery.'
    ],
    practicalWork: [
      'Completar el Value Proposition Canvas.',
      'Diseñar una guía de entrevistas de cinco fases.',
      'Construir un pipeline de 10 a 15 stakeholders y realizar las primeras entrevistas.'
    ],
    tools: ['Value Proposition Canvas', 'Miro o Mural', 'Otter.ai', 'Calendly', 'Raven CRM'],
    keyDeliverable: 'VPC completo y plan de Customer Discovery: perfil del segmento, pipeline de contactos, guía de entrevistas, hallazgos iniciales y propuesta de valor refinada.',
    connection: 'La evidencia de las entrevistas permite decidir qué hipótesis mantener, ajustar o replantear al estructurar el modelo de negocio.'
  },
  {
    week: 3,
    phaseId: 'preseed',
    phaseName: 'Pre-seed: Descubrimiento y Validación',
    title: 'Validación, Modelo de Negocio e Impacto',
    purpose: 'Convertir hallazgos de campo en decisiones de BMC, unit economics e indicadores de impacto socioambiental.',
    deliverableShort: 'Informe de Validación & BMC',
    icon: BarChart3,
    objective: 'Convertir los hallazgos de campo en decisiones sobre hipótesis, modelo de negocio, viabilidad económica e impacto.',
    topics: [
      'Análisis cualitativo de entrevistas y decisiones de perseverar, iterar o pivotar.',
      'Business Model Canvas de nueve bloques.',
      'CAC, LTV, margen bruto, payback y punto de equilibrio.',
      'Indicadores de impacto alineados con ODS, NDC e Impact Model Canvas.'
    ],
    practicalWork: [
      'Clasificar hipótesis según la evidencia recolectada.',
      'Construir el BMC con sustento de validación.',
      'Estimar unit economics e indicadores socioambientales.'
    ],
    tools: ['BMC Strategyzer', 'Google Sheets', 'IRIS+ (GIIN)'],
    keyDeliverable: 'Informe de validación, BMC, tabla de unit economics e indicadores de impacto con línea base, meta y método de medición.',
    connection: 'El modelo de negocio y los activos identificados orientan las decisiones regulatorias, de propiedad intelectual y de acceso a recursos de la semana 4.'
  },
  {
    week: 4,
    phaseId: 'foundation',
    phaseName: 'Foundation: Construcción de Cimientos',
    title: 'Regulación, Propiedad Intelectual y Beneficio Compartido',
    purpose: 'Definir una ruta regulatoria y de propiedad intelectual coherente con el uso responsable de recursos biológicos.',
    deliverableShort: 'Mapa Regulatorio & Estrategia PI',
    icon: ShieldCheck,
    objective: 'Definir una ruta regulatoria y de propiedad intelectual coherente con el producto, el mercado y el uso responsable de recursos biológicos.',
    topics: [
      'Organismos y requisitos regulatorios aplicables al sector.',
      'Mapa regulatorio con hitos, plazos y responsables.',
      'Patentes, secretos comerciales, derecho de obtentor y análisis FTO.',
      'Protocolo de Nagoya, Ley 27811, CPLI y beneficio compartido.'
    ],
    practicalWork: [
      'Ubicar los hitos regulatorios prioritarios en el roadmap.',
      'Identificar los activos intelectuales y su mecanismo de protección.',
      'Diseñar el esquema de beneficio compartido cuando aplique.'
    ],
    tools: ['Espacenet', 'Google Patents', 'Patentscope', 'Miro o Lucidchart', 'MINAM / INDECOPI'],
    keyDeliverable: 'Mapa regulatorio, estrategia de propiedad intelectual, análisis FTO preliminar, esquema de beneficio compartido y plan de acción regulatorio a 90 días.',
    connection: 'La ruta al mercado y los riesgos identificados definen los supuestos financieros, las necesidades de capital y las alianzas de la semana 5.'
  },
  {
    week: 5,
    phaseId: 'foundation',
    phaseName: 'Foundation: Construcción de Cimientos',
    title: 'Finanzas, Funding y Alianzas',
    purpose: 'Estimar la sostenibilidad financiera de la startup y priorizar las fuentes de capital y alianzas necesarias.',
    deliverableShort: 'Resumen Financiero & Funding',
    icon: Coins,
    objective: 'Estimar la sostenibilidad financiera de la startup y priorizar las fuentes de capital y alianzas necesarias para avanzar.',
    topics: [
      'Estado de resultados a cinco años y flujo de caja.',
      'Escenarios conservador, base y optimista.',
      'Estrategia de funding y crowdfunding pre-semilla.',
      'Mapa de aliados estratégicos.'
    ],
    practicalWork: [
      'Construir proyecciones financieras y explicitar sus supuestos.',
      'Priorizar fuentes de financiamiento según el hito que permiten alcanzar.',
      'Identificar al menos ocho aliados potenciales y su siguiente paso.'
    ],
    tools: ['Google Sheets', 'Crunchbase', 'PROCIENCIA', 'Miro'],
    keyDeliverable: 'Resumen financiero, estrategia de funding y mapa de alianzas conectado con los ingresos, costos y socios clave del BMC.',
    connection: 'Los supuestos de negocio y de financiamiento ayudan a decidir qué MVP construir primero y qué hipótesis debe validar.'
  },
  {
    week: 6,
    phaseId: 'foundation',
    phaseName: 'Foundation: Construcción de Cimientos',
    title: 'MVP y Prototipado con IA',
    purpose: 'Construir y documentar un MVP que permita validar una hipótesis de solución con el menor esfuerzo viable.',
    deliverableShort: 'MVP v1.0 Documentado & Roadmap',
    icon: Cpu,
    objective: 'Construir y documentar un MVP que permita validar una hipótesis de solución con el menor esfuerzo viable.',
    topics: [
      'Tipos de MVP para productos digitales, servicios y biotecnología.',
      'Ciclo Build-Measure-Learn aplicado al prototipado.',
      'Prototipado con Google AI Studio, Stitch, Figma y herramientas no-code.',
      'Decisiones técnicas y roadmap de producto de la versión 1.0 a la 3.0.'
    ],
    practicalWork: [
      'Seleccionar el tipo de MVP adecuado para la hipótesis prioritaria.',
      'Construir el flujo principal, protocolo de laboratorio o servicio manual.',
      'Documentar decisiones de inclusión, exclusión y revisión de componentes.'
    ],
    tools: ['Google AI Studio', 'Stitch', 'Figma', 'Bubble / Glide', 'Canva'],
    keyDeliverable: 'MVP v1.0 documentado: descripción, evidencia visual, enlace navegable cuando corresponda, decisiones técnicas y roadmap v1.0 a v3.0.',
    connection: 'El MVP se utiliza en la semana 7 para ejecutar un piloto, medir comportamiento real y priorizar mejoras.'
  },
  {
    week: 7,
    phaseId: 'scaling',
    phaseName: 'Early Scaling: Tracción y Comunicación',
    title: 'Piloto, KPIs y CRM',
    purpose: 'Probar el MVP con usuarios, traducir resultados en mejoras y organizar la tracción comercial con métricas y CRM.',
    deliverableShort: 'Reporte de Piloto & CRM Dashboard',
    icon: TrendingUp,
    objective: 'Probar el MVP con usuarios, traducir los resultados en mejoras y organizar la tracción comercial mediante métricas y CRM.',
    topics: [
      'Diseño y ejecución de prueba piloto.',
      'Innovation Accounting y aprendizaje validado.',
      'Priorización de mejoras para el MVP v2.0.',
      'Configuración de CRM, KPIs y dashboard de seguimiento.'
    ],
    practicalWork: [
      'Ejecutar el protocolo de piloto con métricas de éxito definidas.',
      'Identificar puntos de fricción y aplicar mejoras justificadas por datos.',
      'Configurar el pipeline comercial, contactos, etiquetas, workflows y dashboard.'
    ],
    tools: ['Raven CRM', 'Google Sheets', 'Looker Studio', 'Typeform', 'Loom'],
    keyDeliverable: 'Reporte de piloto, MVP v2.0, KPI dashboard y CRM configurado con evidencia de contactos, etapas y workflows.',
    connection: 'Los resultados del piloto y las métricas se convierten en la evidencia de tracción para el pitch, el Demo Day y el roadmap de la semana 8.'
  },
  {
    week: 8,
    phaseId: 'scaling',
    phaseName: 'Early Scaling: Tracción y Comunicación',
    title: 'Pitch, Demo Day y Roadmap',
    purpose: 'Comunicar la oportunidad de la startup con narrativa SpinPitch, evidencia de tracción y roadmap a 12 meses.',
    deliverableShort: 'Pitch Deck & Video Elevator Pitch',
    icon: Trophy,
    objective: 'Comunicar la oportunidad de la startup con una narrativa clara, evidencia de avance y una ruta creíble hacia los próximos 12 meses.',
    topics: [
      'Metodología SpinPitch y narrativa de inversión.',
      'Propuesta de valor, mercado, competencia, ingresos, equipo y tracción.',
      'Pitch deck de 12 diapositivas y video elevator pitch.',
      'Roadmap trimestral, preguntas del jurado y preparación para Demo Day.'
    ],
    practicalWork: [
      'Construir y ensayar el pitch con la evidencia generada durante el Bootcamp.',
      'Preparar un video de 60 a 90 segundos con subtítulos.',
      'Definir hitos, necesidades de capital y fuentes de financiamiento para 12 meses.'
    ],
    tools: ['Canva', 'Pitch.com', 'CapCut', 'Loom', 'SpeakAI'],
    keyDeliverable: 'Pitch deck final, video elevator pitch, roadmap de 12 meses e informe final de aprendizajes.',
    connection: 'El equipo llega al Demo Day con un portafolio de evidencia: problema validado, modelo de negocio, ruta regulatoria, proyecciones, MVP, piloto, indicadores y pitch.'
  }
];
