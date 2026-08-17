// Biohub Venture Master Mock Data

export const CONSORTIUM = [
  {
    id: 'igbm',
    name: 'IGBM',
    subname: 'Instituto de Genética Bárbara McClintock',
    color: '#5BB8D6',
    logoText: 'IGBM',
    logoImage: '/icon_igbm.png',
    tagline: 'Validación Científica, Genética & Biología Molecular',
    descriptor: 'Scientific Validation & Molecular Biology',
    stepTitle: '1. VALIDAR CIENCIA',
    image: '/image_igbm.png',
    objectPosition: 'center top',
    shortDesc: 'Laboratorio de referencia científica especializado en genética molecular, diagnóstico, bioinformática y validación experimental de base científica.',
    description: 'Institución especializada en genética, biología molecular, bioinformática y formación científica. Dentro de BHV aporta capacidades de validación experimental, diseño de pruebas, diagnóstico molecular y acompañamiento técnico para fortalecer la evidencia científica de productos y prototipos.',
    contribution: [
      'Revisión del diseño experimental y de la viabilidad técnica del MVP.',
      'Acceso a laboratorios y análisis de biología molecular.',
      'Bioinformática, estadística y procesamiento de datos biológicos.'
    ]
  },
  {
    id: 'biogenia',
    name: 'BioGenia',
    subname: 'Innovación & Transferencia Tecnológica',
    color: '#22B878',
    logoText: 'BioGenia',
    logoImage: '/icon_biogenia.png',
    tagline: 'Transferencia Tecnológica & Venture Building Científico',
    descriptor: 'Tech Transfer & Venture Building',
    stepTitle: '2. TRANSFERIR TECNOLOGÍA',
    image: '/image_biogenia.png',
    objectPosition: 'center center',
    shortDesc: 'Articulador entre ciencia y mercado mediante propiedad intelectual, vigilancia tecnológica y estructuración de paquetes de innovación.',
    description: 'BioGenia conecta ciencia y mercado mediante transferencia tecnológica, propiedad intelectual, vigilancia tecnológica y estructuración de proyectos de innovación. Su rol dentro de BHV es acompañar a las startups en la transformación de una tecnología o prototipo en una solución validada, protegible y preparada para acceder a mercado y financiamiento.',
    contribution: [
      'Estrategia de propiedad intelectual y transferencia tecnológica.',
      'Estructuración de proyectos para fondos de innovación (CTI).',
      'Vigilancia tecnológica y desarrollo de paquetes transferibles.'
    ]
  },
  {
    id: 'scale',
    name: 'Incubadora Scale',
    subname: 'Negocios de Triple Impacto & Aceleración',
    color: '#6B4DD6',
    logoText: 'Scale',
    logoImage: '/icon_scale.png',
    tagline: 'Incubación, Triple Impacto & Escalamiento de Mercado',
    descriptor: 'Incubation & Market Scaling',
    stepTitle: '3. ESCALAR NEGOCIO',
    image: '/image_scale.png',
    objectPosition: 'center center',
    shortDesc: 'Plataforma especializada en incubación de startups de triple impacto, desarrollo empresarial y conexión con el ecosistema emprendedor.',
    description: 'Incubadora especializada en emprendimientos de triple impacto con experiencia en programas, mentoría y acompañamiento de startups. En BHV fortalece la validación de mercado, el modelo de negocio y la preparación de los equipos para crecer y conectarse con el ecosistema emprendedor.',
    contribution: [
      'Validación de modelo de negocio y Go-To-Market.',
      'Mentoría para crecimiento empresarial de triple impacto.',
      'Conexión con la red de mentores y ecosistema de financiamiento.'
    ]
  }
];

export const SERVICES = [
  {
    id: 'mentorship',
    number: '01',
    title: 'Mentoría Especializada',
    shortDesc: 'Acceso directo a más de 20 mentores especializados en biotecnología, finanzas, regulación amazónica y Go-To-Market.',
    benefits: [
      'Mentoría 1:1 semanal personalizada con científicos PhDs y mentores de negocios.',
      'Talleres técnicos de regulación (Protocolo de Nagoya & Acceso a Recursos Genéticos).',
      'Red estratégica de especialistas en biotecnología en LATAM.'
    ],
    fullDetails: 'Nuestro programa conecta a cada startup con un consejo asesor dedicado: un científico de nivel PhD de IGBM, un especialista en transferencia tecnológica de BioGenia y un mentor en estructura de negocios de Scale.'
  },
  {
    id: 'capital',
    number: '02',
    title: 'Acceso a Capital & Financiamiento',
    shortDesc: 'Conexión garantizada con el Club de Inversionistas BHV y fondos de impacto para rondas Pre-Seed.',
    benefits: [
      'Presentación directa en Demo Day ante fondos de Venture Capital e inversionistas ángeles.',
      'Acceso a grants no reembolsables (CONCYTEC, ProInnóvate, USAID).',
      'Estructuras de inversión flexible para startups biotecnológicas.'
    ],
    fullDetails: 'Facilitamos la preparación de Data Rooms, modelado financiero e introducción a fondos de capital semilla.'
  },
  {
    id: 'corporate',
    number: '03',
    title: 'Alianzas Corporativas & Pilotos',
    shortDesc: 'Validación en mercado real conectando tu solución con corporaciones e instituciones aliadas.',
    benefits: [
      'Oportunidad de ejecutar programas piloto de validación comercial.',
      'Acceso a cadenas de suministro y laboratorios corporativos.',
      'Path directo hacia acuerdos de distribución o co-inversión estratégica.'
    ],
    fullDetails: 'Trabajamos con aliados corporativos e institucionales para levantar retos reales de la industria y conectar con nuestras startups.'
  },
  {
    id: 'education',
    number: '04',
    title: 'Educación & Herramientas Tech',
    shortDesc: 'Kit de herramientas digitales premium, simuladores financieros y módulos educativos de frontera.',
    benefits: [
      'Acceso a simuladores financieros y herramientas de analítica.',
      'Credits en infraestructura cloud y plataformas de prototipado rápido.',
      'Módulos de Lean Bio-Startup, Design Thinking y Unit Economics.'
    ],
    fullDetails: 'Entregamos un stack tecnológico y metodológico para asegurar que el equipo acelere su desarrollo.'
  },
  {
    id: 'blockchain',
    number: '05',
    title: 'Certificación Blockchain',
    shortDesc: 'Emisión de certificados digitales inmutables en Blockcerts para respaldar hitos de trazabilidad e impacto.',
    benefits: [
      'Trazabilidad verificable de origen amazónico para inversores y clientes.',
      'Credenciales digitales verificables en LinkedIn para el equipo fundador.',
      'Respaldo transparente de compromisos de Reparto de Beneficios (ABS).'
    ],
    fullDetails: 'Utilizamos tecnología blockchain para certificar la autenticidad de la investigación y el origen botánico/microbiano.'
  },
  {
    id: 'preacceleration',
    number: '06',
    title: 'Pre-aceleración & Seguimiento 12M',
    shortDesc: 'Acompañamiento continuo post-bootcamp para las startups seleccionadas.',
    benefits: [
      'Soporte continuo de mentoría avanzada.',
      'Acompañamiento en el cierre de rondas de inversión.',
      'Estructura de expansión regional a nivel LATAM.'
    ],
    fullDetails: 'El bootcamp no termina en el Demo Day. Acompañamos a las mejores startups en su escalamiento comercial.'
  }
];

export const RFS_ITEMS = [
  {
    id: 1,
    number: '01',
    title: 'Beneficio Compartido y Trazabilidad',
    pillar: 'Pillar I',
    pillarName: 'Trazabilidad & Gobernanza',
    shortDesc: 'Soluciones blockchain e identidades digitales para asegurar el cumplimiento del Protocolo de Nagoya y el reparto justo de beneficios.',
    tam: 'USD 2.5B',
    problem: 'La falta de mecanismos transparentes de trazabilidad en cadenas de suministro amazónicas impide que las comunidades locales reciban regalías sobre recursos genéticos.',
    whyNow: 'Nuevas regulaciones europeas (EUDR) y leyes nacionales exigen prueba inmutable de origen libre de deforestación y reparto justo de beneficios.',
    targetProfile: 'Equipos con experiencia en Web3, contratos inteligentes, APIs de rastreo o legislación de biocomercio.',
    successMetrics: 'Piloto funcional con 1 comunidad indígena y 1 comprador corporativo internacional en 8 semanas.',
    marketSignal: 'Demanda: corporativos, certificadoras y comunidades',
    marketDemand: 'Corporativos, compradores responsables, certificadoras y comunidades necesitan demostrar origen, consentimiento y reparto justo de beneficios para sostener cadenas de suministro confiables.',
    opportunity: 'Crear soluciones de identidad digital, trazabilidad, contratos inteligentes y registro de evidencias para el biocomercio amazónico.',
    impact: {
      environmental: 'Menor riesgo de abastecimiento asociado a deforestación.',
      social: 'Más transparencia y reconocimiento de derechos comunitarios.',
      economic: 'Acceso a compradores y cadenas de mayor valor.'
    },
    proofPlan: 'Registrar el recorrido de un producto o recurso desde una comunidad hasta un comprador piloto.',
    safeguards: 'Validar consentimiento, gobernanza de datos, acuerdos de beneficio compartido y cumplimiento ABS antes de escalar.'
  },
  {
    id: 2,
    number: '02',
    title: 'Bioinsumos y Biofertilizantes',
    pillar: 'Pillar II',
    pillarName: 'Biotecnología Agrícola',
    shortDesc: 'Formulaciones microbianas autóctonas para regenerar suelos degradados y reemplazar fertilizantes sintéticos de carbono intensivo.',
    tam: 'USD 4.8B',
    problem: 'La agricultura convencional depende de nitrógeno sintético que degrada suelos amazónicos y genera emisiones masivas de gases de efecto invernadero.',
    whyNow: 'Escasez global y altos costos de fertilizantes químicos abren una ventana única para inoculantes biológicos locales de alto desempeño.',
    targetProfile: 'Biotecnólogos, microbiólogos de suelos y agrónomos con cepas prometedoras o consorcios fúngicos/bacterianos.',
    successMetrics: 'Ensayos de germinación acelerada y protocolo de liofilización validado a escala de laboratorio.',
    marketSignal: 'Demanda: productores, cooperativas y distribuidores agrícolas',
    marketDemand: 'Productores, cooperativas y distribuidores buscan alternativas biológicas que reduzcan dependencia de fertilizantes químicos, mejoren rendimiento y funcionen bajo condiciones locales.',
    opportunity: 'Desarrollar inoculantes, consorcios microbianos, biofertilizantes, bioestimulantes o herramientas de aplicación y monitoreo.',
    impact: {
      environmental: 'Recuperación de suelos y menor huella de carbono.',
      social: 'Fortalecimiento de productores y capacidades locales.',
      economic: 'Menor costo de insumos y mayor productividad.'
    },
    proofPlan: 'Demostrar desempeño inicial de la formulación y definir un protocolo de estabilización reproducible.',
    safeguards: 'Controlar bioseguridad, trazabilidad de cepas, estabilidad de formulación y compatibilidad con cultivos objetivo.'
  },
  {
    id: 3,
    number: '03',
    title: 'Alimentos del Futuro',
    pillar: 'Pillar III',
    pillarName: 'FoodTech & Nutrición',
    shortDesc: 'Ingredientes superfood, proteínas alternativas y biomoléculas extraídas de plantas, hongos y microalgas amazónicas.',
    tam: 'USD 6.1B',
    problem: 'Los recursos de la bioeconomía amazónica (ej. camu camu, aguaje, sacha inchi) se exportan sin procesar, perdiendo hasta 90% del valor agregado.',
    whyNow: 'Consumidores globales demandan ingredientes funcionales limpios con alta densidad nutricional y origen regenerativo.',
    targetProfile: 'Ingenieros de alimentos, químicos de productos naturales y emprendedores de consumo masivo (CPG).',
    successMetrics: 'Prototipo organoléptico validado y análisis de vida útil completado.',
    marketSignal: 'Demanda: marcas foodtech, ingredientes y consumo saludable',
    marketDemand: 'Marcas de alimentos, fabricantes de ingredientes y consumidores buscan productos funcionales, limpios, nutritivos y con origen regenerativo verificable.',
    opportunity: 'Convertir plantas, frutos, hongos, microalgas o biomoléculas amazónicas en ingredientes, proteínas alternativas o productos de consumo.',
    impact: {
      environmental: 'Valorización sostenible de biodiversidad y menor presión extractiva.',
      social: 'Mayores ingresos para productores y comunidades.',
      economic: 'Más transformación local y acceso a mercados funcionales.'
    },
    proofPlan: 'Probar aceptación sensorial, formulación base y primera vida útil del prototipo.',
    safeguards: 'Verificar inocuidad, permisos sanitarios, trazabilidad de origen y claims nutricionales antes de comunicar beneficios.'
  },
  {
    id: 4,
    number: '04',
    title: 'Biotecnología para la Salud Humana',
    pillar: 'Pillar IV',
    pillarName: 'HealthTech & Farma',
    shortDesc: 'Plataformas de descubrimiento de fármacos y moléculas bioactivas extraídas de la biodiversidad amazónica.',
    tam: 'USD 12.0B',
    problem: 'Menos del 1% de las plantas y microorganismos de la cuenca amazónica han sido caracterizados médicamente para descubrimiento terapéutico.',
    whyNow: 'La combinación de genómica de alto rendimiento e inteligencia artificial permite identificar compuestos en semanas en lugar de décadas.',
    targetProfile: 'Farmacéuticos, bioinformáticos y químicos analíticos con biblioteca de extractos o moléculas caracterizadas.',
    successMetrics: 'Ensayo in vitro de actividad biológica y dossier preliminar de propiedad intelectual.',
    marketSignal: 'Demanda: farma, laboratorios y centros de investigación',
    marketDemand: 'Empresas farmacéuticas, laboratorios y centros de investigación requieren moléculas, extractos y datos con actividad biológica demostrable y potencial protegible.',
    opportunity: 'Desarrollar plataformas de descubrimiento, bibliotecas de compuestos, métodos de caracterización o soluciones diagnósticas basadas en biodiversidad.',
    impact: {
      environmental: 'Valor científico que incentiva conservación de biodiversidad.',
      social: 'Nuevas herramientas para prevención, diagnóstico o tratamiento.',
      economic: 'Propiedad intelectual, licenciamiento y transferencia tecnológica.'
    },
    proofPlan: 'Obtener una lectura biológica preliminar y ordenar evidencia técnica para una ruta de propiedad intelectual.',
    safeguards: 'Revisar permisos de acceso genético, bioseguridad, ética de investigación y libertad de operación.'
  },
  {
    id: 5,
    number: '05',
    title: 'Biotecnología para la Salud Animal',
    pillar: 'Pillar V',
    pillarName: 'AgroVet Bio',
    shortDesc: 'Aditivos nutricionales, vacunas biológicas y fitoterapéuticos para acuicultura y ganadería sostenible.',
    tam: 'USD 3.2B',
    problem: 'El uso excesivo de antibióticos en la producción animal genera resistencia bacteriana y contamina los ecosistemas acuáticos amazónicos.',
    whyNow: 'Prohibiciones regulatorias sobre antibióticos promotores de crecimiento exigen alternativas botánicas e inmunomoduladores naturales.',
    targetProfile: 'Veterinarios, biólogos acuícolas e inmunólogos con extractos antimicrobianos o probióticos animales.',
    successMetrics: 'Prueba de eficacia reductora de patógenos en acuicultura o aves a nivel de laboratorio.',
    marketSignal: 'Demanda: acuicultura, ganadería y laboratorios veterinarios',
    marketDemand: 'Productores, laboratorios veterinarios y empresas acuícolas buscan alternativas preventivas, nutricionales e inmunológicas con menor dependencia de antibióticos.',
    opportunity: 'Desarrollar probióticos, vacunas, extractos botánicos, inmunomoduladores o aditivos nutricionales para animales.',
    impact: {
      environmental: 'Menor contaminación de agua y suelo.',
      social: 'Sistemas productivos más seguros y resilientes.',
      economic: 'Reducción de pérdidas y acceso a mercados sanitarios exigentes.'
    },
    proofPlan: 'Validar una reducción preliminar de patógenos o respuesta funcional en un ensayo controlado.',
    safeguards: 'Considerar inocuidad animal, regulación veterinaria, estabilidad del producto y riesgos de resistencia.'
  },
  {
    id: 6,
    number: '06',
    title: 'Tecnologías para la Biodiversidad',
    pillar: 'Pillar VI',
    pillarName: 'DeepTech & IoT',
    shortDesc: 'Sensores de eDNA, bioacústica con IA y drones de monitoreo de dosel para cuantificar créditos de biodiversidad.',
    tam: 'USD 1.8B',
    problem: 'La medición de biodiversidad amazónica es costosa, lenta y propensa a errores manuales, impidiendo el financiamiento verde transparente.',
    whyNow: 'El mercado emergente de créditos de biodiversidad requiere métodos digitales científicos auditables en tiempo real.',
    targetProfile: 'Ingenieros mecatrónicos, expertos en eDNA, desarrolladores de algoritmos bioacústicos.',
    successMetrics: 'Despliegue de nodo piloto con transmisión en tiempo real de datos bioacústicos o eDNA.',
    marketSignal: 'Demanda: conservación, MRV, gobiernos y compradores de créditos',
    marketDemand: 'Proyectos de conservación, compradores de créditos, fondos, gobiernos y corporativos necesitan medición, reporte y verificación más confiables.',
    opportunity: 'Aplicar eDNA, bioacústica, sensores, drones, imágenes satelitales o IA al monitoreo de ecosistemas.',
    impact: {
      environmental: 'Mejor conocimiento y protección de ecosistemas.',
      social: 'Empleo local y participación comunitaria en monitoreo.',
      economic: 'Mayor credibilidad para créditos y financiamiento verde.'
    },
    proofPlan: 'Instalar un nodo o flujo de datos piloto con una lectura ambiental verificable.',
    safeguards: 'Cuidar calidad de datos, calibración, privacidad territorial y protocolos de verificación científica.'
  },
  {
    id: 7,
    number: '07',
    title: 'Bioeconomía Circular',
    pillar: 'Pillar VII',
    pillarName: 'Materiales & Residuos',
    shortDesc: 'Transformación de biomasa de desecho agrícola e industrial en bioplásticos, empaques miceliales y biochar.',
    tam: 'USD 5.5B',
    problem: 'Miles de toneladas de cascarilla de cacao, bagazo de fruta y madera de desecho se queman o pudren liberando metano en la región.',
    whyNow: 'La crisis de plásticos de un solo uso impulsa a multinacionales a sustituir empaques sintéticos por materiales compostables.',
    targetProfile: 'Ingenieros de materiales, biotecnólogos de micelio y diseñadores de producto sustentables.',
    successMetrics: 'Ficha técnica de resistencia mecánica y compostabilidad de prototipo compostable.',
    marketSignal: 'Demanda: empaques, consumo masivo y manufactura sostenible',
    marketDemand: 'Empresas de alimentos, comercio electrónico, consumo masivo y manufactura buscan sustituir materiales fósiles y reducir residuos de empaque.',
    opportunity: 'Transformar biomasa en bioplásticos, empaques miceliales, biochar, materiales compuestos o productos de mayor valor.',
    impact: {
      environmental: 'Reducción de residuos, quema y emisiones.',
      social: 'Nuevas oportunidades para cadenas productivas locales.',
      economic: 'Nuevos materiales, productos y modelos de valorización.'
    },
    proofPlan: 'Entregar un prototipo físico con medición inicial de resistencia, función y compostabilidad.',
    safeguards: 'Validar disponibilidad de biomasa, desempeño técnico, compostabilidad real y costos de manufactura.'
  },
  {
    id: 8,
    number: '08',
    title: 'Turismo Regenerativo y Bioemprendimientos',
    pillar: 'Pillar VIII',
    pillarName: 'Comunidades & Servicios',
    shortDesc: 'Plataformas tecnológicas que conectan turismo de ciencia y conservación con financiamiento directo a comunidades locales.',
    tam: 'USD 1.2B',
    problem: 'El ecoturismo tradicional genera ingresos volátiles que raras veces financian laboratorios de conservación comunitarios.',
    whyNow: 'Boom del turismo de propósito ("Science Tourism") y viajes con huella de carbono positiva.',
    targetProfile: 'Emprendedores turísticos, diseñadores de experiencias científicas y plataformas fintech comunitarias.',
    successMetrics: 'Red de 3 reservas comunitarias integradas con sistema de reserva y financiamiento.',
    marketSignal: 'Demanda: viajeros de propósito, reservas y operadores',
    marketDemand: 'Viajeros, operadores y reservas buscan experiencias de ciencia, conservación y propósito con beneficios locales verificables.',
    opportunity: 'Crear plataformas de reservas, experiencias científicas, sistemas de aporte comunitario y servicios de turismo con métricas de impacto.',
    impact: {
      environmental: 'Financiamiento directo para conservación.',
      social: 'Mayor control comunitario sobre la actividad turística.',
      economic: 'Diversificación de ingresos locales.'
    },
    proofPlan: 'Conectar tres reservas o comunidades a una oferta reservable con trazabilidad de aportes.',
    safeguards: 'Asegurar consentimiento comunitario, distribución transparente de ingresos y capacidad operativa de la experiencia.'
  },
  {
    id: 9,
    number: '09',
    title: 'Inteligencia Artificial Aplicada a Biología',
    pillar: 'Pillar IX',
    pillarName: 'Bio-AI & Bioinformática',
    shortDesc: 'Modelos de lenguaje biológico (LLMs de proteínas) para predecir enzimas amazónicas hiperactivas y vías metabólicas.',
    tam: 'USD 8.4B',
    problem: 'El volumen de datos de secuenciación metagenómica amazónica supera la capacidad analítica humana sin modelos de IA avanzados.',
    whyNow: 'Advenimiento de biogeneración predictiva y modelos transformadores optimizados para química verde.',
    targetProfile: 'Data scientists, bioinformáticos y desarrolladores de IA apasionados por enzimas y proteínas.',
    successMetrics: 'Predicción in silico de 5 enzimas biocatalíticas con validación in vitro planeada.',
    marketSignal: 'Demanda: biotech, laboratorios, agroindustria y química verde',
    marketDemand: 'Empresas biotech, laboratorios, agroindustria y química verde buscan predecir moléculas, enzimas y rutas metabólicas con menor costo y tiempo de I+D.',
    opportunity: 'Aplicar modelos de lenguaje biológico, aprendizaje automático, bioinformática y simulación a biodiversidad y bioproducción.',
    impact: {
      environmental: 'Mejor uso de recursos biológicos y menos experimentación innecesaria.',
      social: 'Fortalecimiento de capacidades científicas regionales.',
      economic: 'Menores tiempos de descubrimiento y nueva propiedad intelectual.'
    },
    proofPlan: 'Priorizar cinco candidatos in silico y diseñar el plan de validación experimental.',
    safeguards: 'Revisar soberanía de datos, consentimiento, bioseguridad, reproducibilidad y uso responsable de modelos.'
  },
  {
    id: 10,
    number: '10',
    title: 'Financiamiento e Inversión Verde',
    pillar: 'Pillar X',
    pillarName: 'Climate FinTech',
    shortDesc: 'Mecanismos de Blended Finance, tokenización de créditos de carbono y bonos de biodiversidad para la economía forestal.',
    tam: 'USD 9.0B',
    problem: 'Los pequeños productores sostenibles carecen de historial crediticio tradicional para acceder a financiamiento de bajo costo.',
    whyNow: 'Los compromisos Net-Zero de Fortune 500 exigen créditos de carbono de alta integridad con cobeneficios sociales probados.',
    targetProfile: 'Financistas verdes, desarrolladores fintech y especialistas en estructuración de bonos de impacto.',
    successMetrics: 'Estructuración de vehículo de financiamiento piloto para 50 hectáreas en manejo agroforestal.',
    marketSignal: 'Demanda: fondos, corporativos y proyectos forestales',
    marketDemand: 'Fondos, corporativos y desarrolladores de proyectos necesitan instrumentos de carbono y biodiversidad con integridad, trazabilidad y beneficios sociales demostrables.',
    opportunity: 'Diseñar mecanismos de blended finance, tokenización responsable, bonos de impacto, evaluación de riesgo y vehículos de inversión verde.',
    impact: {
      environmental: 'Financiamiento de conservación y manejo sostenible.',
      social: 'Mayor acceso a capital para productores y comunidades.',
      economic: 'Nuevos instrumentos, ingresos y canales de inversión.'
    },
    proofPlan: 'Modelar una estructura piloto para 50 hectáreas con métricas de impacto y flujo financiero.',
    safeguards: 'Evitar greenwashing, doble conteo, baja adicionalidad y estructuras financieras difíciles de auditar.'
  }
];

export const TOP_STARTUPS = [
  {
    id: 1,
    rank: '#1',
    name: 'CRIPES',
    category: 'HealthTech & Farma',
    tagline: 'Diagnóstico molecular rápido y accesible de dengue y arbovirus.',
    description: 'Desarrolla kits moleculares basados en amplificación isotérmica y biosensoreado para detectar variantes de dengue en comunidades remotas sin requerir laboratorios centralizados.',
    country: 'Perú',
    founders: ['Carlos Rivera', 'Equipo Científico IGBM'],
    stage: 'Seed Round - USD 350K',
    badge: '🏆 1er Puesto Cohorte',
    image: 'https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&w=800&q=80',
    metrics: '98.5% precisión diagnóstica en menos de 30 minutos a bajo costo.',
    website: 'https://biohubventure.com/portfolio/cripes',
    linkedin: 'https://www.linkedin.com',
    whatsapp: '51999999999',
    srlLevel: 'SRL 6 (Validación en Entorno Relevante)',
    achievements: ['Ganador 1er Puesto Demo Day BHV 2026-I', 'Validación clínica con cepas nativas', 'Patente de kit diagnóstico en trámite']
  },
  {
    id: 2,
    rank: '#2',
    name: 'BioSafe Me',
    category: 'FoodTech & Bioinsumos',
    tagline: 'Bioconservación natural y biofagos para alimentos frescos.',
    description: 'Sustituye conservantes químicos tradicionales por soluciones biotecnológicas seguras a base de bacteriófagos y péptidos antimicrobianos para extender la vida útil de frutas y vegetales.',
    country: 'El Salvador',
    founders: ['Arlet Hernández'],
    stage: 'Pre-Seed - USD 180K',
    badge: 'Validación BHV',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    metrics: '+40% vida útil en anaquel sin alterar propiedades organolépticas.',
    website: 'https://biohubventure.com/portfolio/biosafeme',
    linkedin: 'https://www.linkedin.com',
    whatsapp: '50379999999',
    srlLevel: 'SRL 5 (Tecnología Validada en Laboratorio)',
    achievements: ['Ensayos microbiológicos validados en IGBM', 'Alianza con exportadores centroamericanos', 'Acelerada en Cohorte BHV']
  },
  {
    id: 3,
    rank: '#3',
    name: 'ApiRobotics',
    category: 'Agritech & IA',
    tagline: 'Plataforma de polinización de precisión impulsada por IA y robótica.',
    description: 'Combina sensores IoT en colmenas y algoritmos de visión computacional para optimizar la polinización de cultivos amazónicos de alto valor como el cacao, palto y café.',
    country: 'Perú',
    founders: ['María Arana', 'Equipo Técnico ApiRobotics'],
    stage: 'Seed Round - USD 450K',
    badge: 'In Market',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    metrics: '35% incremento de rinde agrícola en más de 1,200 hectáreas monitoreadas.',
    website: 'https://biohubventure.com/portfolio/apirobotics',
    linkedin: 'https://www.linkedin.com',
    whatsapp: '51988888888',
    srlLevel: 'SRL 7 (Demostración de Prototipo en Entorno Operativo)',
    achievements: ['Pilotos comerciales activos en San Martín y Junín', 'Hardware IoT certificado', 'Premio a la Innovación AgroTech']
  },
  {
    id: 4,
    rank: '#4',
    name: 'MIZETA',
    category: 'Biomateriales',
    tagline: 'Biomateriales sostenibles hechos a base de micelio amazónico.',
    description: 'Transforma residuos agroindustriales mediante cepas de hongos nativos para crear empaques biodegradables y cuero vegetal que reemplazan al tecnopor y plásticos fósiles.',
    country: 'Perú',
    founders: ['Frank Sarnaqué'],
    stage: 'Pre-Seed - USD 200K',
    badge: 'Raising',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80',
    metrics: '100% compostable en 45 días sin generar microplásticos.',
    website: 'https://biohubventure.com/portfolio/mizeta',
    linkedin: 'https://www.linkedin.com',
    whatsapp: '51977777777',
    srlLevel: 'SRL 5 (Prototipado de Materiales Validados)',
    achievements: ['Optimización de cepas miceliales en BioGenia', 'Prototipos de empaque para e-commerce', 'Premio Economía Circular']
  },
  {
    id: 5,
    rank: '#5',
    name: 'VETPHARMA',
    category: 'HealthTech & Farma',
    tagline: 'Diseño de vacunas recombinantes y formulaciones biológicas veterinarias.',
    description: 'Plataforma biotecnológica orientada al desarrollo de biológicos y vacunas veterinarias libres de antibióticos para ganadería y animales de compañía en la región andina.',
    country: 'Venezuela',
    founders: ['Javier David Uzcátegui'],
    stage: 'Seed Round - USD 300K',
    badge: 'DeepTech Bio',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
    metrics: 'Reducción del 80% en uso de antibióticos preventivos.',
    website: 'https://biohubventure.com/portfolio/vetpharma',
    linkedin: 'https://www.linkedin.com',
    whatsapp: '58412999999',
    srlLevel: 'SRL 5 (Validación Experimental en Inmunología)',
    achievements: ['Diseño bioinformático de epítopes vacunales', 'Ensayos preclínicos completados', 'Red de distribución regional']
  },
  {
    id: 6,
    rank: '#6',
    name: 'BioPlas',
    category: 'Bioplásticos',
    tagline: 'Bioplásticos solubles derivados de almidón no comestible.',
    description: 'Formulación polimérica de origen vegetal para empaques de un solo uso que se disuelven de forma inocua en agua marina sin toxicidad.',
    country: 'Ecuador',
    founders: ['Gabriel Paz', 'Elena Viteri'],
    stage: 'Pre-Seed - USD 150K',
    badge: 'Patent Pending',
    image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80',
    metrics: 'Disolución completa en agua en menos de 24 horas.',
    website: 'https://biohubventure.com/portfolio/bioplas',
    linkedin: 'https://www.linkedin.com',
    whatsapp: '59399999999',
    srlLevel: 'SRL 4 (Validación de Laboratorio)',
    achievements: ['Solicitud de patente PCT presentada', 'Ensayos de biodegradabilidad certificados']
  },
  {
    id: 7,
    rank: '#7',
    name: 'Akuasense',
    category: 'IoT & Monitoreo',
    tagline: 'Sensores biodegradables para monitoreo de suelos y agua.',
    description: 'Dispositivos autónomos que miden macronutrientes y salud del microbioma en cultivos amazónicos con transmisión de datos de largo alcance LoRaWAN.',
    country: 'Colombia',
    founders: ['Felipe Betancourt', 'Camila Osorio'],
    stage: 'Seed Round - USD 500K',
    badge: 'In Market',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    metrics: 'Más de 3,000 hectáreas monitoreadas en tiempo real.',
    website: 'https://biohubventure.com/portfolio/akuasense',
    linkedin: 'https://www.linkedin.com',
    whatsapp: '57300999999',
    srlLevel: 'SRL 7 (Sistema Operativo en Campo)',
    achievements: ['Despliegue en 4 departamentos de Colombia', 'Integración con plataformas satelitales']
  },
  {
    id: 8,
    rank: '#8',
    name: 'Pompom',
    category: 'FoodTech',
    tagline: 'Snacks e ingredientes funcionales a base de superfructas amazónicas.',
    description: 'Procesamiento en frío de camu camu, aguaje y copoazú preservando el 99% de sus antioxidantes y polifenoles naturales para consumo masivo saludable.',
    country: 'Perú',
    founders: ['Mateo Silva', 'Sofía Thorne'],
    stage: 'Seed Round - USD 300K',
    badge: 'In Market',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80',
    metrics: 'Presencia en más de 120 puntos de venta y canal retail.',
    website: 'https://biohubventure.com/portfolio/pompom',
    linkedin: 'https://www.linkedin.com',
    whatsapp: '51966666666',
    srlLevel: 'SRL 8 (Producto Comercial Calificado)',
    achievements: ['Registro sanitario internacional', 'Crecimiento de ventas del 140% YoY']
  }
];

export const BOOTCAMP_WEEKS = [
  {
    week: '01',
    title: 'Contexto Amazónico & Diagnóstico',
    desc: 'Entendimiento profundo del ecosistema de la bioeconomía, comunidades nativas y desafíos regulatorios iniciales.',
    deliverable: 'Mapa de Desafíos & Matriz de Stakeholders Amazónicos.'
  },
  {
    week: '02',
    title: 'Propuesta de Valor & Biotecnología',
    desc: 'Definición del valor diferencial tecnológico y validación de la factibilidad científica de la solución con IGBM.',
    deliverable: 'Dossier de Validación Científica y Canvas de Propuesta de Valor.'
  },
  {
    week: '03',
    title: 'Modelo de Negocio & Unit Economics',
    desc: 'Estructuración del modelo de ingresos, escalabilidad comercial y análisis de costos de producción biorregional.',
    deliverable: 'Modelo Financiero Proyectado a 3 años (Jupyter / Excel).'
  },
  {
    week: '04',
    title: 'Validación con Clientes & Corporaciones',
    desc: 'Entrevistas profundas con clientes potenciales y reuniones de encaje con los corporativos aliados.',
    deliverable: 'Reporte de Customer Discovery con 30+ entrevistas.'
  },
  {
    week: '05',
    title: 'Producto Mínimo Viable (MVP)',
    desc: 'Desarrollo del prototipo biológico o digital funcional listo para ensayos de campo.',
    deliverable: 'Prototipo MVP testeado y Ficha Técnica de Producto.'
  },
  {
    week: '06',
    title: 'Go-To-Market & Transferencia Tecnológica',
    desc: 'Plan de ventas inicial, estrategia de canales, propiedad intelectual y paquetes tecnológicos con BioGenia.',
    deliverable: 'Roadmap de Lanzamiento al Mercado y Plan de Propiedad Intelectual.'
  },
  {
    week: '07',
    title: 'Finanzas & Medición de Impacto',
    desc: 'Proyección de métricas de triple impacto, créditos de biodiversidad y valoración para ronda de inversión con Scale.',
    deliverable: 'Deck de Inversión y Matriz de Métricas de Impacto Social/Ambiental.'
  },
  {
    week: '08',
    title: 'Demo Day & Conexión con Inversores',
    desc: 'Pitch final en vivo ante fondos de inversión, ángeles corporativos y representantes del consorcio.',
    deliverable: 'Presentación oficial en Demo Day y acceso al Data Room.'
  }
];

export const TESTIMONIALS = [
  {
    quote: 'BHV fue clave para validar nuestro modelo biotecnológico y conectar con los aliados corporativos indicados. Hoy escalamos soluciones en 3 países.',
    name: 'Valeria Rojas',
    role: 'Co-founder',
    company: 'ApiRobotics (Perú)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  },
  {
    quote: 'La mentoría científica del IGBM, la estructuración de transferencia tecnológica de BioGenia y el soporte empresarial de Scale nos abrieron puertas regionales.',
    name: 'Andrés Díaz',
    role: 'Co-founder',
    company: 'MIZETA (Colombia)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    quote: 'Más que un bootcamp, Biohub Venture es la comunidad que impulsa la verdadera bioeconomía con propósito y rigor científico.',
    name: 'María Fernanda Silva',
    role: 'Mentora & Inversionista',
    company: 'Impacta VC',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80'
  }
];

// Verified Real Metrics requested by user
export const METRICS = [
  { value: '2', label: 'Cohortes completadas', icon: 'Award' },
  { value: '30', label: 'Startups incubadas', icon: 'Rocket' },
  { value: '5', label: 'Países de origen', sublabel: 'LATAM', icon: 'Globe' },
  { value: '5', label: 'Aliados corporativos', icon: 'Building2' },
  { value: '$16,000', label: 'En capital movilizado', icon: 'DollarSign' },
  { value: '20', label: 'Mentores activos', icon: 'Users' }
];
