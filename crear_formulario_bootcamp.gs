function crearFormularioBootcamp() {
  // Crea un nuevo formulario
  var form = FormApp.create('Postulación: Bootcamp para emprendedores | Cohorte 2026II');
  
  form.setDescription('Formulario oficial de postulación para participar en BioHubVenture. Por favor, complete todos los campos obligatorios.');

  // Campo para nombre del equipo
  form.addTextItem()
      .setTitle('Nombre del equipo o startup')
      .setRequired(true);

  // (i) Currículum o LinkedIn
  // Nota: La API de Apps Script (FormApp) no soporta crear campos de "Carga de archivos" directamente sin configuraciones avanzadas.
  // Por ello, solicitamos enlaces (Drive, Dropbox, LinkedIn).
  form.addParagraphTextItem()
      .setTitle('(i) Currículum de cada miembro del equipo')
      .setHelpText('Ingrese los enlaces a los perfiles de LinkedIn o enlaces a los CVs en PDF (asegúrese de que los enlaces sean públicos o tengan permisos de lectura).')
      .setRequired(true);

  // (ii) Declaración de motivación
  form.addParagraphTextItem()
      .setTitle('(ii) Declaración de motivación')
      .setHelpText('Explique por qué el equipo busca participar en BioHubVenture y cuál es su nivel de compromiso (máximo 300 palabras).')
      .setRequired(true);

  // (iii) Problem-Solution Fit Canvas
  form.addParagraphTextItem()
      .setTitle('(iii) Problem-Solution Fit Canvas')
      .setHelpText('Describa el problema identificado, la solución propuesta, el segmento de clientes objetivo y la hipótesis comercial central (máximo 500 palabras).')
      .setRequired(true);

  // Muestra las URLs en los registros (Logs)
  Logger.log('URL del formulario para compartir con los postulantes: ' + form.getPublishedUrl());
  Logger.log('URL para editar el formulario: ' + form.getEditUrl());
}
