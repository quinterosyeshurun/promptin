// ==================================================================
// PARTE 1: EL JSON DEL BOT
// Acá está TODA la conversación. Si cambiás este objeto, cambia el bot.
// Tipos de nodo: "opciones" (botones), "texto" (campo para escribir),
// "ruta" (salta solo, según lo recordado) y "final" (arma el prompt).
// Lo que está entre {llaves} se reemplaza por lo que el bot recuerda.
// ==================================================================

// Ideas de nombres: el bot muestra 3 al azar (distintas en cada sesión)
const nombresDeEjemplo = [
  "Goleador", "Estilista", "Profe Bot", "Pixel", "Brújula", "Chispa",
  "Nova", "Turbo", "Eco", "Sendero", "Cometa", "Aura", "Zorro", "Ritmo",
  "Atlas", "Luna", "Fénix", "Radar", "Sabelotodo", "Cocinero", "Viajero",
  "Melodía", "Estrella", "Robotín", "Cerebro", "Explorador", "Detective",
  "Mago", "Capitán", "Delfín", "Trueno", "Semilla", "Faro", "Duende"
];

// --- Generadores de prompts para cada tipo de proyecto ---

function generarPromptWeb(m) {
  const nombre = m.nombre || "mi proyecto";
  const queEs = m.queEs || "una página web";
  const tema = m.tema || "tema general";
  const secciones = m.secciones || "secciones principales";
  const estilo = m.estilo || "Simple y limpio";
  const tieneSketch = m.sketch !== "no";

  let prompt =
    "## Rol\n" +
    "Actuá como desarrollador web front-end.\n\n" +
    "## Objetivo\n" +
    "Construir " + queEs + " llamada \"" + nombre + "\". Tema: " + tema + ".\n\n";

  if (!tieneSketch) {
    prompt +=
      "## Diseño y maquetación (sin boceto previo)\n" +
      "No se proporciona un boceto ni sketch previo. Como desarrollador, debés interpretar y proponer un diseño propio, adecuado y profesional según el contexto de las respuestas:\n" +
      "- Diseñá la estructura y maquetación visual interpretando el tema \"" + tema + "\", las secciones solicitadas (" + secciones + ") y el estilo visual \"" + estilo + "\".\n" +
      "- Definí una distribución clara y atractiva para cada sección, cuidando la jerarquía visual, la legibilidad y la experiencia de usuario.\n" +
      "- El diseño debe ser responsive y adaptarse con fluidez tanto a computadoras de escritorio como a dispositivos móviles.\n\n";
  } else {
    prompt +=
      "## Cómo usar mi boceto\n" +
      "Te adjunto mi boceto. Es un dibujo de baja fidelidad que sirve SOLO como guía de estructura: indica qué partes tiene la página y en qué lugar va cada una.\n" +
      "- Respetá la estructura y la disposición del boceto: no agregues ni quites partes, ni cambies su orden.\n" +
      "- NO copies el aspecto del dibujo: los trazos gruesos, los recuadros negros, la tipografía y los textos de ejemplo no son parte del diseño final. Los colores, bordes, tipografías y detalles visuales salen del estilo indicado más abajo.\n" +
      "- El resultado tiene que verse como una página real, prolija y profesional, no como un boceto.\n\n" +
      "## Partes del boceto y sus nombres\n" +
      (m.elementos || "(indicadas en el boceto)") + "\n" +
      "Usá exactamente esos nombres, sin traducirlos ni modificarlos, para identificar cada parte en el código.\n\n";
  }

  prompt +=
    "## Contenido\n" +
    "Secciones de la página, en este orden: " + secciones + ".\n" +
    "No agregues secciones, funciones ni textos largos que no estén indicados acá. Si necesitás texto de ejemplo, usá uno corto y simple.\n\n" +
    "## Estilo visual\n" +
    estilo + ". El diseño tiene que verse bien en computadora y en celular.\n\n" +
    "## Reglas técnicas\n" +
    "- No uses JavaScript.\n" +
    "- Archivos: index.html y style.css.\n" +
    "- Sin librerías ni frameworks.\n" +
    "- Código simple, ordenado y comentado en español.\n\n" +
    "## Iteración y base del proyecto\n" +
    "- Lo que generes a partir de este prompt es solo una base funcional inicial.\n" +
    "- El proyecto debe iterarse y refinarse junto con la IA para generar el resultado final; este prompt no es definitivo.\n\n" +
    "## Formato de entrega\n" +
    "Entregame cada archivo en un bloque de código separado, con su nombre. Después de los archivos, agregá solo 2 o 3 líneas explicando cómo probarlo.\n" +
    "Si te falta información o algún punto no está claro, preguntame antes de escribir código.";

  return prompt;
}

function generarPromptApp(m) {
  const nombre = m.nombre || "mi proyecto";
  const queEs = m.queEs || "una app web";
  const tipoApp = m.tipoApp || "aplicación web";
  const funciones = m.funciones || "gestionar datos y mostrar resultados";
  const reglas = m.reglas || "Sin reglas especiales";
  const estilo = m.estilo || "Simple y limpio";
  const tieneSketch = m.sketch !== "no";

  let prompt =
    "## Rol\n" +
    "Actuá como desarrollador web front-end.\n\n" +
    "## Objetivo\n" +
    "Construir " + queEs + " llamada \"" + nombre + "\". Tipo de app: " + tipoApp + ".\n\n";

  if (!tieneSketch) {
    prompt +=
      "## Diseño e interfaz (sin boceto previo)\n" +
      "No se proporciona un boceto ni sketch previo. Como desarrollador, debés interpretar y proponer un diseño propio, adecuado y profesional según el contexto de las respuestas:\n" +
      "- Diseñá la interfaz y los componentes interpretando el tipo de app (\"" + tipoApp + "\"), las funciones solicitadas (" + funciones + "), las reglas establecidas (" + reglas + ") y el estilo visual \"" + estilo + "\".\n" +
      "- Organizá los controles (campos de entrada, botones de acción, paneles de visualización y avisos) con una jerarquía clara e intuitiva para el usuario.\n" +
      "- El diseño debe ser responsive y funcionar con comodidad tanto en computadora como en celular.\n\n";
  } else {
    prompt +=
      "## Cómo usar mi boceto\n" +
      "Te adjunto mi boceto. Es un dibujo de baja fidelidad que sirve SOLO como guía de estructura: indica qué partes tiene la app y en qué lugar va cada una.\n" +
      "- Respetá la estructura y la disposición del boceto: no agregues ni quites partes, ni cambies su orden.\n" +
      "- NO copies el aspecto del dibujo: los trazos gruesos, los recuadros negros, la tipografía y los textos de ejemplo no son parte del diseño final. Los colores, bordes, tipografías y detalles visuales salen del estilo indicado más abajo.\n" +
      "- El resultado tiene que verse como una app real, prolija y profesional, no como un boceto.\n\n" +
      "## Partes del boceto y sus nombres\n" +
      (m.elementos || "(indicadas en el boceto)") + "\n" +
      "Usá exactamente esos nombres, sin traducirlos ni modificarlos, para identificar cada parte en el código.\n\n";
  }

  prompt +=
    "## Funcionamiento\n" +
    "- Funciones: la app tiene que poder " + funciones + ".\n" +
    "- Reglas: " + reglas + ".\n" +
    "- No agregues funciones, pantallas ni botones que no estén pedidos acá.\n" +
    "- No agregues almacenamiento de datos ni APIs. Si necesitás datos de ejemplo, usá datos ficticios simples.\n\n" +
    "## Estilo visual\n" +
    estilo + ". El diseño tiene que verse bien en computadora y en celular.\n\n" +
    "## Reglas técnicas\n" +
    "- Archivos: index.html, style.css y script.js.\n" +
    "- JavaScript simple y comentado en español, con funciones cortas y nombres claros.\n" +
    "- Sin librerías ni frameworks.\n\n" +
    "## Iteración y base del proyecto\n" +
    "- Lo que generes a partir de este prompt es solo una base funcional inicial.\n" +
    "- El proyecto debe iterarse y refinarse junto con la IA para generar el resultado final; este prompt no es definitivo.\n\n" +
    "## Formato de entrega\n" +
    "Entregame cada archivo en un bloque de código separado, con su nombre. Después de los archivos, agregá solo 2 o 3 líneas explicando cómo probarlo.\n" +
    "Si te falta información o algún punto no está claro, preguntame antes de escribir código.";

  return prompt;
}

function generarPromptBot(m) {
  const nombre = m.nombre || "mi bot";
  const queEs = m.queEs || "un bot de conversación";
  const tema = m.tema || "tema general";
  const tono = m.tono || "Amigable";
  const recuerda = m.recuerda || "las elecciones de la persona";
  const preguntas = m.preguntas || "opciones del menú principal";
  const resultados = m.resultados || "respuestas personalizadas según las elecciones";
  const estilo = m.estilo || "Simple y limpio";
  const tieneSketch = m.sketch !== "no";

  let prompt =
    "## Rol\n" +
    "Actuá como desarrollador web front-end.\n\n" +
    "## Objetivo\n" +
    "Construir " + queEs + " llamado \"" + nombre + "\". Tema: " + tema + ".\n\n";

  if (!tieneSketch) {
    prompt +=
      "## Diseño e interfaz del chat (sin boceto previo)\n" +
      "No se proporciona un boceto ni sketch previo. Como desarrollador, debés interpretar y proponer un diseño visual propio, adecuado y profesional según el contexto de las respuestas:\n" +
      "- Diseñá la interfaz del chat interpretando el tema \"" + tema + "\", la identidad del bot \"" + nombre + "\" y el estilo visual \"" + estilo + "\".\n" +
      "- Estructurá visualmente el encabezado del bot, el área de conversación (con burbujas diferenciadas para el bot y el usuario) y la zona interactiva con botones de opciones.\n" +
      "- INTERFAZ 100% GUIADA POR BOTONES (SIN ENTRADA DE TEXTO): Queda estrictamente prohibido incluir cajas de texto (<input>, <textarea> o marcadores de posición como \"Escribí tu mensaje...\"), barras de entrada o botón de enviar. La interfaz NO debe tener ningún campo para escribir.\n" +
      "- El diseño debe ser prolijo, moderno y responsive, adaptándose óptimamente tanto a computadora como a celular.\n\n";
  } else {
    prompt +=
      "## Cómo usar mi boceto\n" +
      "Te adjunto mi boceto. Es un dibujo de baja fidelidad que sirve SOLO como guía de estructura: indica qué partes tiene el bot y en qué lugar va cada una.\n" +
      "- Respetá la estructura y la disposición del boceto: no agregues ni quites partes, ni cambies su orden.\n" +
      "- NO copies el aspecto del dibujo: los trazos gruesos, los recuadros negros, la tipografía y los textos de ejemplo no son parte del diseño final. Los colores, bordes, tipografías y detalles visuales salen del estilo indicado más abajo.\n" +
      "- El resultado tiene que verse como un chat real, prolijo y profesional, no como un boceto.\n" +
      "- INTERFAZ 100% GUIADA POR BOTONES: Aunque el dibujo del boceto muestre o sugiera una barra de escritura, queda terminantemente prohibido incluir cajas de texto (<input>, <textarea>) o botones de enviar. Toda la interacción debe estructurarse mediante botones de opciones cliqueables.\n\n" +
      "## Partes del boceto y sus nombres\n" +
      (m.elementos || "(indicadas en el boceto)") + "\n" +
      "Usá exactamente esos nombres, sin traducirlos ni modificarlos, para identificar cada parte en el código.\n\n";
  }

  prompt +=
    "## Conversación y Flujo del Bot (BOT REAL, NO LINEAL Y 100% BOTONES)\n" +
    "- Tono del bot: " + tono + ". Todos los textos del bot van en español.\n" +
    "- El bot recuerda: " + recuerda + ".\n" +
    "- Menú principal (opciones que ofrece el bot): " + preguntas + ".\n" +
    "- Respuestas del bot: " + resultados + ". Cada respuesta tiene que usar lo que el bot recuerda de la persona.\n\n" +
    "### REGLAS OBLIGATORIAS DE INTERACCIÓN Y NAVEGACIÓN:\n" +
    "1. SIN CAMPO DE ENTRADA DE TEXTO (PROHIBIDO INPUT / TEXTAREA):\n" +
    "   - Queda estrictamente prohibido incluir cajas de entrada de texto (<input>, <textarea> o marcadores de posición como \"Escribí tu mensaje...\", \"Escribe aquí...\", etc.).\n" +
    "   - La interfaz NO debe incluir barra de texto ni botón de enviar bajo ninguna circunstancia.\n" +
    "2. NAVEGACIÓN 100% POR BOTONES / OPCIONES CLIQUEABLES:\n" +
    "   - Toda la interacción, flujo de conversación, decisiones, respuestas y acciones (incluyendo seleccionar opciones, elegir preferencias o cambiar configuraciones) deben resolverse exclusivamente mediante botones u opciones cliqueables.\n" +
    "   - Si el bot necesita que el usuario elija algo o guarde un dato (por ejemplo un tema, categoría o preferencia), debe ofrecer una serie de botones con opciones para que el usuario simplemente haga clic.\n" +
    "3. CONTROL TOTAL POR BOTONES:\n" +
    "   - Toda respuesta o mensaje del bot debe estar acompañada SIEMPRE de los botones correspondientes para que el usuario elija el siguiente paso sin necesidad de escribir nada.\n" +
    "   - Ningún mensaje del bot puede quedar sin botones de opciones para continuar.\n" +
    "4. NO ES UN CAMINO LINEAL (ES UN BOT REAL):\n" +
    "   - El bot NO debe ser una secuencia recta de preguntas (paso 1 -> paso 2 -> paso 3 -> fin) ni comportarse como un formulario o encuesta secuencial.\n" +
    "   - La conversación debe ser un circuito o red navegable: el usuario accede al menú principal mediante botones, explora distintas opciones o ramas, y después de cada respuesta el bot SIEMPRE ofrece botones para volver al menú principal, consultar otro tema o realizar otra acción.\n" +
    "5. EL FINAL DEBE SER ELEGIDO POR EL USUARIO (NO ASUMIR UN FINAL):\n" +
    "   - ¡BAJO NINGUNA CIRCUNSTANCIA el bot debe asumir un final automático ni cerrar la conversación por decisión propia!\n" +
    "   - Ninguna respuesta a una pregunta o consulta debe terminar la conversación ni dejar la pantalla sin botones activos.\n" +
    "   - La conversación SOLO puede finalizar si la persona usuaria lo decide explícitamente tocando un botón de opción como \"Terminar conversación\" o \"Salir\" (que debe estar siempre disponible en el menú principal).\n" +
    "   - E incluso al finalizar, el bot debe despedirse amablemente y dejar disponible un botón para \"Reiniciar conversación\" o \"Volver a empezar\", permitiendo retomar la interacción en cualquier momento.\n" +
    "6. CONSISTENCIA Y REGLAS DE CONTENIDO:\n" +
    "   - Ningún paso puede quedar sin salida: todos los botones llevan a otro paso del circuito JSON.\n" +
    "   - Inventá las opciones de botones y los textos del bot manteniéndolos coherentes con el tema (\"" + tema + "\") y el tono (\"" + tono + "\").\n" +
    "   - No agregues preguntas, temas ni funciones que no estén indicados acá.\n\n" +
    "## Estilo visual\n" +
    estilo + ". El diseño tiene que verse bien en computadora y en celular, con botones claros, accesibles y cómodos de cliquear o tocar.\n\n" +
    "## Reglas técnicas\n" +
    "- Toda la conversación está guiada por un objeto JSON dentro de script.js (no en un archivo aparte): cada paso tiene su texto y su arreglo de botones/opciones, y cada botón guarda la elección y lleva a otro paso.\n" +
    "- Sin inputs de texto: no uses <input>, <textarea> ni formularios de escritura; la interfaz utiliza únicamente botones interactivos para la entrada de usuario.\n" +
    "- Los pasos pueden y deben volver a pasos anteriores (por ejemplo, al menú principal): la conversación es un circuito navegable, no una línea recta.\n" +
    "- Los textos del bot usan lo que recuerda (por ejemplo, las opciones elegidas por la persona).\n" +
    "- Ningún paso puede quedar sin salida: todos los botones llevan a otro paso.\n" +
    "- No uses APIs ni almacenamiento de datos.\n" +
    "- Archivos: index.html, style.css y script.js.\n" +
    "- JavaScript simple y comentado en español, sin librerías ni frameworks.\n\n" +
    "## Iteración y base del proyecto\n" +
    "- Lo que generes a partir de este prompt es solo una base funcional inicial.\n" +
    "- El proyecto debe iterarse y refinarse junto con la IA para generar el resultado final; este prompt no es definitivo.\n\n" +
    "## Formato de entrega\n" +
    "Entregame cada archivo en un bloque de código separado, con su nombre. Después de los archivos, agregá solo 2 o 3 líneas explicando cómo probarlo.\n" +
    "Si te falta información o algún punto no está claro, preguntame antes de escribir código.";

  return prompt;
}

const bot = {
  nombre: "Promptín",
  inicio: "saludo",
  nodos: {

    // ---------------- INICIO ----------------
    saludo: {
      tipo: "opciones",
      texto: "¡Hola! Soy Promptín 🧠\nTe voy a ayudar a armar el prompt para pedirle a una IA que construya tu proyecto. Yo pregunto con botones y anoto todo lo que me contás.",
      opciones: [
        { texto: "¡Empecemos! 🚀", siguiente: "pregunta_tipo" }
      ]
    },

    pregunta_tipo: {
      tipo: "opciones",
      texto: "¿Qué querés crear?",
      opciones: [
        { texto: "🌐 Página web", guardar: { tipo: "web", queEs: "una página web" }, siguiente: "pregunta_sketch" },
        { texto: "🧮 App web", guardar: { tipo: "app", queEs: "una app web" }, siguiente: "pregunta_sketch" },
        { texto: "🤖 Bot de conversación", guardar: { tipo: "bot", queEs: "un bot de conversación" }, siguiente: "pregunta_sketch" }
      ]
    },

    pregunta_sketch: {
      tipo: "opciones",
      texto: "¿Ya hiciste tu sketch (en Moqups, Canva o con IA)?",
      opciones: [
        { texto: "Sí, ya lo tengo", guardar: { sketch: "si" }, siguiente: "ruta_tipo" },
        { texto: "Todavía no", guardar: { sketch: "no" }, siguiente: "sin_sketch" }
      ]
    },

    sin_sketch: {
      tipo: "opciones",
      texto: "Entonces primero hacé tu sketch 🎨\nEl diseño lo decide la persona, no la IA: dibujá dónde va cada cosa y ponele nombre a cada parte. No hace falta que sea lindo: los colores y el aspecto salen del estilo que elijas. Cuando lo tengas, seguimos.",
      opciones: [
        { texto: "Ya lo hice", guardar: { sketch: "si" }, siguiente: "ruta_tipo" },
        { texto: "Continuar sin sketch", guardar: { sketch: "no" }, siguiente: "ruta_tipo" }
      ]
    },

    // Nodo invisible: mira la memoria ("tipo") y salta al camino que toca
    ruta_tipo: {
      tipo: "ruta",
      segun: "tipo",
      caminos: { web: "web_nombre", app: "app_nombre", bot: "bot_nombre" }
    },

    // ---------------- RAMA WEB ----------------
    web_nombre: {
        limpiarAntes: true,
      tipo: "texto",
      texto: "¡Genial, vamos con {queEs}! 🌐\n¿Cómo se va a llamar tu proyecto?",
      guardar: "nombre",
      placeholder: "Escribí un nombre o tocá una idea",
      sugerencias: nombresDeEjemplo,
      siguiente: "web_tema"
    },

    web_tema: {
      tipo: "opciones",
      texto: "¡Lindo nombre! ¿Sobre qué es \"{nombre}\"?",
      opciones: [
        { texto: "Algo personal", guardar: { tema: "Algo personal" }, siguiente: "web_secciones" },
        { texto: "Mi colegio", guardar: { tema: "Mi colegio" }, siguiente: "web_secciones" },
        { texto: "Un hobby o deporte", guardar: { tema: "Un hobby o deporte" }, siguiente: "web_secciones" },
        { texto: "Un negocio", guardar: { tema: "Un negocio" }, siguiente: "web_secciones" },
        { texto: "✍️ Escribir lo mío", escribir: "tema", siguiente: "web_secciones" }
      ]
    },

    web_secciones: {
      tipo: "texto",
      texto: "¿Qué secciones tiene \"{nombre}\" y en qué orden van?",
      guardar: "secciones",
      placeholder: "Ej: encabezado, quién soy, intereses, contacto",
      sugerencias: ["encabezado, quién soy, intereses, contacto"],
      siguiente: "web_estilo"
    },

    web_estilo: {
      tipo: "opciones",
      texto: "¿Qué estilo visual querés para \"{nombre}\"?",
      opciones: [
        { texto: "Oscuro y moderno", guardar: { estilo: "Oscuro y moderno" }, siguiente: "ruta_web_sketch" },
        { texto: "Colorido y divertido", guardar: { estilo: "Colorido y divertido" }, siguiente: "ruta_web_sketch" },
        { texto: "Simple y limpio", guardar: { estilo: "Simple y limpio" }, siguiente: "ruta_web_sketch" },
        { texto: "✍️ Escribir lo mío", escribir: "estilo", siguiente: "ruta_web_sketch" }
      ]
    },

    ruta_web_sketch: {
      tipo: "ruta",
      segun: "sketch",
      caminos: { si: "web_elementos", no: "web_final" }
    },

    web_elementos: {
      tipo: "texto",
      texto: "Mirá tu sketch: ¿qué partes tiene y cómo se llama cada una? La IA va a usar esos mismos nombres para reconocer cada parte.",
      guardar: "elementos",
      placeholder: "Ej: titulo-principal, boton-contacto, imagen-perfil",
      siguiente: "web_final"
    },

    web_final: {
      tipo: "final",
      texto: "¡Listo! Con todo lo que me contaste armé este prompt base para \"{nombre}\". Podés editarlo antes de copiarlo 👇",
      plantilla: generarPromptWeb
    },

    // ---------------- RAMA APP ----------------
    app_nombre: {
        limpiarAntes: true,
      tipo: "texto",
      texto: "¡Genial, vamos con {queEs}! 🧮\n¿Cómo se va a llamar tu proyecto?",
      guardar: "nombre",
      placeholder: "Escribí un nombre o tocá una idea",
      sugerencias: nombresDeEjemplo,
      siguiente: "app_tipo"
    },

    app_tipo: {
      tipo: "opciones",
      texto: "¿Qué tipo de app es \"{nombre}\"?",
      opciones: [
        { texto: "Calculadora", guardar: { tipoApp: "Calculadora" }, siguiente: "app_funciones" },
        { texto: "Notas o lista", guardar: { tipoApp: "Notas o lista" }, siguiente: "app_funciones" },
        { texto: "Sistema de turnos", guardar: { tipoApp: "Sistema de turnos" }, siguiente: "app_funciones" },
        { texto: "Gestor de datos", guardar: { tipoApp: "Gestor de datos" }, siguiente: "app_funciones" },
        { texto: "✍️ Otra", escribir: "tipoApp", siguiente: "app_funciones" }
      ]
    },

    app_funciones: {
      tipo: "texto",
      texto: "¿Qué tiene que poder hacer \"{nombre}\"?",
      guardar: "funciones",
      placeholder: "Ej: cargar un dato, borrarlo, ver la lista",
      sugerencias: ["cargar un dato, borrarlo, ver la lista"],
      siguiente: "app_reglas"
    },

    app_reglas: {
      tipo: "opciones",
      texto: "¿Hay alguna regla que la app tenga que cumplir?",
      opciones: [
        { texto: "No permitir campos vacíos", guardar: { reglas: "No permitir campos vacíos" }, siguiente: "app_estilo" },
        { texto: "Avisar si algo se repite o se choca", guardar: { reglas: "Avisar si algo se repite o se choca" }, siguiente: "app_estilo" },
        { texto: "Sin reglas especiales", guardar: { reglas: "Sin reglas especiales" }, siguiente: "app_estilo" },
        { texto: "✍️ Escribir lo mío", escribir: "reglas", siguiente: "app_estilo" }
      ]
    },

    app_estilo: {
      tipo: "opciones",
      texto: "¿Qué estilo visual querés para \"{nombre}\"?",
      opciones: [
        { texto: "Oscuro y moderno", guardar: { estilo: "Oscuro y moderno" }, siguiente: "ruta_app_sketch" },
        { texto: "Colorido y divertido", guardar: { estilo: "Colorido y divertido" }, siguiente: "ruta_app_sketch" },
        { texto: "Simple y limpio", guardar: { estilo: "Simple y limpio" }, siguiente: "ruta_app_sketch" },
        { texto: "✍️ Escribir lo mío", escribir: "estilo", siguiente: "ruta_app_sketch" }
      ]
    },

    ruta_app_sketch: {
      tipo: "ruta",
      segun: "sketch",
      caminos: { si: "app_elementos", no: "app_final" }
    },

    app_elementos: {
      tipo: "texto",
      texto: "Mirá tu sketch: ¿qué partes tiene y cómo se llama cada una? La IA va a usar esos mismos nombres para reconocer cada parte.",
      guardar: "elementos",
      placeholder: "Ej: campo-nombre, boton-agregar, lista-turnos",
      siguiente: "app_final"
    },

    app_final: {
      tipo: "final",
      texto: "¡Listo! Con todo lo que me contaste armé este prompt base para \"{nombre}\". Podés editarlo antes de copiarlo 👇",
      plantilla: generarPromptApp
    },

    // ---------------- RAMA BOT ----------------
    bot_nombre: {
        limpiarAntes: true,
      tipo: "texto",
      texto: "¡Genial, vamos con {queEs}! 🤖\n¿Cómo se va a llamar tu bot?",
      guardar: "nombre",
      placeholder: "Escribí un nombre o tocá una idea",
      sugerencias: nombresDeEjemplo,
      siguiente: "bot_tema"
    },

    bot_tema: {
      tipo: "opciones",
      texto: "¿De qué tema va a hablar {nombre}?",
      opciones: [
        { texto: "Fútbol", guardar: { tema: "Fútbol" }, siguiente: "bot_tono" },
        { texto: "Moda", guardar: { tema: "Moda" }, siguiente: "bot_tono" },
        { texto: "El colegio", guardar: { tema: "El colegio" }, siguiente: "bot_tono" },
        { texto: "Estudio", guardar: { tema: "Estudio" }, siguiente: "bot_tono" },
        { texto: "✍️ Escribir lo mío", escribir: "tema", siguiente: "bot_tono" }
      ]
    },

    bot_tono: {
      tipo: "opciones",
      texto: "¿Con qué tono le habla {nombre} a la gente?",
      opciones: [
        { texto: "Divertido", guardar: { tono: "Divertido" }, siguiente: "bot_recuerda" },
        { texto: "Serio y claro", guardar: { tono: "Serio y claro" }, siguiente: "bot_recuerda" },
        { texto: "Amigable", guardar: { tono: "Amigable" }, siguiente: "bot_recuerda" },
        { texto: "✍️ Escribir lo mío", escribir: "tono", siguiente: "bot_recuerda" }
      ]
    },
    bot_recuerda: {
      tipo: "opciones",
      texto: "¿Qué va a recordar {nombre} de la persona?",
      opciones: [
        { texto: "Una elección (ej: su tema preferido)", guardar: { recuerda: "Una elección (ej: su tema preferido)" }, siguiente: "bot_preguntas" },
        { texto: "Dos o tres elecciones", guardar: { recuerda: "Dos o tres elecciones" }, siguiente: "bot_preguntas" },
        { texto: "El nombre de la persona", guardar: { recuerda: "El nombre de la persona" }, siguiente: "bot_preguntas" },
        { texto: "✍️ Escribir lo mío", escribir: "recuerda", siguiente: "bot_preguntas" }
      ]
    },

    bot_preguntas: {
      tipo: "texto",
      texto: "¿Qué temas o preguntas va a tener el menú principal de {nombre}? Son las opciones que la persona va a poder elegir.",
      guardar: "preguntas",
      placeholder: "Ej: 1) qué te interesa más de {tema}, 2) cuánto sabés del tema, 3) ...",
      siguiente: "bot_resultados"
    },

    bot_resultados: {
      tipo: "texto",
      texto: "Cuando la persona elige una opción, ¿qué le responde {nombre}? Contame qué tipo de respuestas da.",
      guardar: "resultados",
      placeholder: "Ej: una recomendación distinta sobre {tema} para cada opción, con una explicación",
      siguiente: "bot_estilo"
    },

    bot_estilo: {
      tipo: "opciones",
      texto: "¿Qué estilo visual querés para {nombre}?",
      opciones: [
        { texto: "Oscuro y moderno", guardar: { estilo: "Oscuro y moderno" }, siguiente: "ruta_bot_sketch" },
        { texto: "Colorido y divertido", guardar: { estilo: "Colorido y divertido" }, siguiente: "ruta_bot_sketch" },
        { texto: "Simple y limpio", guardar: { estilo: "Simple y limpio" }, siguiente: "ruta_bot_sketch" },
        { texto: "✍️ Escribir lo mío", escribir: "estilo", siguiente: "ruta_bot_sketch" }
      ]
    },

    ruta_bot_sketch: {
      tipo: "ruta",
      segun: "sketch",
      caminos: { si: "bot_elementos", no: "bot_final" }
    },

    bot_elementos: {
      tipo: "texto",
      texto: "Mirá tu sketch: ¿qué partes tiene y cómo se llama cada una? La IA va a usar esos mismos nombres para reconocer cada parte.",
      guardar: "elementos",
      placeholder: "Ej: zona-chat, boton-opcion, caja-resultado",
      siguiente: "bot_final"
    },

    bot_final: {
      tipo: "final",
      texto: "¡Listo! Con todo lo que me contaste armé este prompt base para {nombre}. Podés editarlo antes de copiarlo 👇",
      plantilla: generarPromptBot
    },
  }
};


// ==================================================================
// PARTE 2: EL MOTOR
// Lee el objeto "bot" de arriba y hace funcionar el chat.
// Además guarda las conversaciones en el navegador (localStorage)
// y las muestra como solapas en el lateral.
// ==================================================================

// Nombre con el que se guardan las conversaciones en el navegador
const CLAVE_GUARDADO = "promptinConversaciones";

// --- Lo que el motor necesita saber en cada momento ---
let conversaciones = [];       // todas las conversaciones (las solapas del lateral)
let actual = null;             // la conversación que se está viendo
let memoria = {};              // los datos que el bot recuerda
let historial = [];            // copias de la memoria, para "Volver"
let registro = [];             // los mensajes del chat: { quien: "bot" o "usuario", texto: "..." }
let nodoActual = null;         // id del nodo en el que estamos
let ocupado = false;           // true mientras el bot "escribe"
let escribiendo = false;       // true cuando se muestra el campo de "✍️ Escribir lo mío"
let sugerenciasDeSesion = {};  // las 3 ideas sorteadas en cada pregunta
let guardadoDisponible = true; // false si el navegador no deja guardar

// --- Piezas de la página ---
const mensajes = document.getElementById("mensajes");
const respuestas = document.getElementById("respuestas");
const botonVolver = document.getElementById("botonVolver");
const botonNueva = document.getElementById("botonNueva");
const solapas = document.getElementById("solapas");
const avisoGuardado = document.getElementById("avisoGuardado");


// ------------------------------------------------------------------
// GUARDADO EN EL NAVEGADOR (localStorage)
// ------------------------------------------------------------------

// Lee las conversaciones que se guardaron otras veces
function leerGuardadas() {
  try {
    const texto = localStorage.getItem(CLAVE_GUARDADO);
    if (!texto) return [];
    const lista = JSON.parse(texto);
    const validas = [];
    for (let i = 0; i < lista.length; i++) {
      if (lista[i].historial && lista[i].registro && lista[i].memoria) {
        validas.push(lista[i]);
      }
    }
    return validas;
  } catch (error) {
    guardadoDisponible = false;
    return [];
  }
}

// Guarda todas las conversaciones
function guardarEnNavegador() {
  try {
    localStorage.setItem(CLAVE_GUARDADO, JSON.stringify(conversaciones));
    guardadoDisponible = true;
  } catch (error) {
    guardadoDisponible = false;
  }
}


// ------------------------------------------------------------------
// CONVERSACIONES Y SOLAPAS
// ------------------------------------------------------------------

function crearConversacion() {
  return {
    creada: Date.now(),
    memoria: {},
    historial: [],
    registro: [],
    nodo: null,
    terminada: false,
    prompt: ""
  };
}

// Carga en el motor los datos de la conversación "actual"
function cargarEstado() {
  memoria = actual.memoria;
  historial = actual.historial;
  registro = actual.registro;
  nodoActual = actual.nodo;
  escribiendo = false;
  redibujarChat();
}

// Copia el estado del motor a la conversación y la guarda
function guardarConversacion() {
  actual.memoria = memoria;
  actual.historial = historial;
  actual.registro = registro;
  actual.nodo = nodoActual;
  guardarEnNavegador();
  dibujarLateral();
}

// Saca las conversaciones en las que nunca se respondió nada
function limpiarVacias() {
  const quedan = [];
  for (let i = 0; i < conversaciones.length; i++) {
    const c = conversaciones[i];
    if (c === actual || c.historial.length > 0) quedan.push(c);
  }
  conversaciones = quedan;
}

function formatearFecha(milisegundos) {
  const f = new Date(milisegundos);
  const dos = function (n) { return String(n).padStart(2, "0"); };
  return dos(f.getDate()) + "/" + dos(f.getMonth() + 1) + " " + dos(f.getHours()) + ":" + dos(f.getMinutes());
}

// Una solapa del lateral
function crearSolapa(c) {
  const iconos = { web: "🌐", app: "🧮", bot: "🤖" };
  const tipos = { web: "Página web", app: "App web", bot: "Bot de conversación" };

  const solapa = document.createElement("div");
  solapa.className = c === actual ? "solapa activa" : "solapa";

  const icono = document.createElement("span");
  icono.className = "icono";
  icono.textContent = iconos[c.memoria.tipo] || "💬";

  const textos = document.createElement("div");
  textos.className = "textos";
  const titulo = document.createElement("div");
  titulo.className = "titulo-solapa";
  titulo.textContent = c.memoria.nombre || tipos[c.memoria.tipo] || "Conversación nueva";
  const detalle = document.createElement("div");
  detalle.className = "detalle";
  detalle.textContent = (c.terminada ? "✅ Prompt listo" : "✏️ En curso") + " · " + formatearFecha(c.creada);
  textos.appendChild(titulo);
  textos.appendChild(detalle);

  const borrar = document.createElement("button");
  borrar.className = "borrar";
  borrar.textContent = "✕";
  borrar.title = "Borrar esta conversación";

  solapa.onclick = function () { abrirConversacion(c); };
  borrar.onclick = function (evento) {
    evento.stopPropagation(); // para que no abra la solapa
    borrarConversacion(c);
  };

  solapa.appendChild(icono);
  solapa.appendChild(textos);
  solapa.appendChild(borrar);
  return solapa;
}

// Dibuja todas las solapas (la más nueva arriba)
function dibujarLateral() {
  solapas.innerHTML = "";
  for (let i = conversaciones.length - 1; i >= 0; i--) {
    solapas.appendChild(crearSolapa(conversaciones[i]));
  }
  avisoGuardado.hidden = guardadoDisponible;
}

// Empieza una conversación nueva (las anteriores quedan guardadas)
function iniciarNueva() {
  actual = crearConversacion();
  conversaciones.push(actual);
  sugerenciasDeSesion = {}; // conversación nueva = ideas nuevas
  cargarEstado();
  limpiarVacias();
  dibujarLateral();
  irANodo(bot.inicio);
}

function nuevaConversacion() {
  if (ocupado) return;
  if (historial.length === 0) return; // ya estás en una conversación nueva
  iniciarNueva();
}

// Abre una conversación guardada y sigue donde había quedado
function abrirConversacion(c) {
  if (ocupado || c === actual) return;
  actual = c;
  cargarEstado();
  limpiarVacias();
  mostrarControles(bot.nodos[nodoActual]);
}

function borrarConversacion(c) {
  if (ocupado) return;
  if (!confirm("¿Borrar esta conversación y su prompt?")) return;

  const quedan = [];
  for (let i = 0; i < conversaciones.length; i++) {
    if (conversaciones[i] !== c) quedan.push(conversaciones[i]);
  }
  conversaciones = quedan;
  guardarEnNavegador();

  if (c === actual) {
    iniciarNueva();
  } else {
    dibujarLateral();
  }
}


// ------------------------------------------------------------------
// EL CHAT
// ------------------------------------------------------------------

// --- Reemplaza {claves} por lo que el bot recuerda (funciona en cualquier texto) ---
function reemplazar(texto) {
  const claves = Object.keys(memoria);
  for (let i = 0; i < claves.length; i++) {
    texto = texto.split("{" + claves[i] + "}").join(memoria[claves[i]]);
  }
  return texto;
}

// --- Elige 3 sugerencias al azar de la lista (la primera vez) y las recuerda ---
function sugerenciasPara(id, lista) {
  if (!lista) return null;
  if (!sugerenciasDeSesion[id]) {
    const copia = lista.slice();
    const elegidas = [];
    while (elegidas.length < 3 && copia.length > 0) {
      const posicion = Math.floor(Math.random() * copia.length);
      elegidas.push(copia.splice(posicion, 1)[0]);
    }
    sugerenciasDeSesion[id] = elegidas;
  }
  return sugerenciasDeSesion[id];
}

// Baja el chat hasta el último mensaje (con movimiento suave)
function bajar() {
  mensajes.scrollTo({ top: mensajes.scrollHeight, behavior: "smooth" });
}

function actualizarBotonVolver() {
  botonVolver.disabled = ocupado || (historial.length === 0 && !escribiendo);
}

// --- Burbujas del chat ---
function dibujarBurbuja(texto, quien, animar) {
  const burbuja = document.createElement("div");
  burbuja.className = "burbuja " + quien + (animar ? " nueva" : "");
  burbuja.textContent = texto;
  mensajes.appendChild(burbuja);
  if (animar) bajar();
}

// Agrega un mensaje: lo anota en el registro y lo dibuja
// "nuevaPantalla" marca el mensaje desde el cual se muestra el chat limpio
function agregarBurbuja(texto, quien, nuevaPantalla) {
  registro.push({ quien: quien, texto: texto, nuevaPantalla: nuevaPantalla === true });
  dibujarBurbuja(texto, quien, true);
}

// Dibuja de nuevo el chat, solo desde la última "pantalla nueva"
function redibujarChat() {
  let desde = 0;
  for (let i = 0; i < registro.length; i++) {
    if (registro[i].nuevaPantalla) desde = i;
  }
  mensajes.innerHTML = "";
  for (let i = desde; i < registro.length; i++) {
    dibujarBurbuja(registro[i].texto, registro[i].quien, false);
  }
  mensajes.scrollTop = mensajes.scrollHeight;
}

// El bot dice un mensaje. Si es "pantalla nueva", antes el chat se desvanece.
function botDice(texto, despues, nuevaPantalla) {
  ocupado = true;
  respuestas.innerHTML = "";
  actualizarBotonVolver();

  if (nuevaPantalla) {
    mensajes.classList.add("desvanece");
    setTimeout(function () {
      mensajes.innerHTML = "";
      mensajes.classList.remove("desvanece");
      escribirYDecir(texto, despues, true);
    }, 450); // el mismo tiempo que dura la animación en el CSS
  } else {
    escribirYDecir(texto, despues, false);
  }
}

// Muestra "escribiendo..." 700 ms y después dice el mensaje
function escribirYDecir(texto, despues, nuevaPantalla) {
  const puntos = document.createElement("div");
  puntos.className = "burbuja bot escribiendo nueva";
  puntos.innerHTML = "<span></span><span></span><span></span>";
  mensajes.appendChild(puntos);
  bajar();

  setTimeout(function () {
    mensajes.removeChild(puntos);
    agregarBurbuja(reemplazar(texto), "bot", nuevaPantalla);
    ocupado = false;
    actualizarBotonVolver();
    despues();
  }, 700);
}

// --- Va a un nodo del JSON y hace lo que corresponda según su tipo ---
function irANodo(id) {
  const nodo = bot.nodos[id];
  if (!nodo) {
    botDice("⚠️ No encuentro el nodo: " + id, function () {});
    return;
  }

  // Ruta: no muestra nada, mira la memoria y salta al camino que toca
  if (nodo.tipo === "ruta") {
    irANodo(nodo.caminos[memoria[nodo.segun]]);
    return;
  }

  nodoActual = id;
  botDice(nodo.texto, function () {
    mostrarControles(nodo);
  }, nodo.limpiarAntes === true);
}

// --- Muestra lo que la persona puede usar para responder ---
function mostrarControles(nodo) {
  respuestas.innerHTML = "";
  escribiendo = false;
  actualizarBotonVolver();

  // Cada vez que el bot termina de hablar, se guarda la conversación
  guardarConversacion();

  if (nodo.tipo === "opciones") {
    for (let i = 0; i < nodo.opciones.length; i++) {
      respuestas.appendChild(crearBotonOpcion(nodo.opciones[i]));
    }
  } else if (nodo.tipo === "texto") {
    const ideas = sugerenciasPara(nodoActual, nodo.sugerencias);
    mostrarCampo(nodo.placeholder, ideas, function (valor) {
      const datos = {};
      datos[nodo.guardar] = valor;
      responder(valor, datos, nodo.siguiente);
    });
  } else if (nodo.tipo === "final") {
    mostrarFinal(nodo);
  }

  // Los controles ocupan lugar: se baja de nuevo para que el último mensaje se vea
  bajar();
}

function crearBotonOpcion(opcion) {
  const boton = document.createElement("button");
  boton.className = "opcion";
  boton.textContent = reemplazar(opcion.texto);

  boton.onclick = function () {
    if (opcion.escribir) {
      // "✍️ Escribir lo mío": aparece un campo de texto en lugar de los botones
      escribiendo = true;
      actualizarBotonVolver();
      mostrarCampo("Escribí lo tuyo...", null, function (valor) {
        const datos = {};
        datos[opcion.escribir] = valor;
        responder(valor, datos, opcion.siguiente);
      });
    } else {
      responder(opcion.texto, opcion.guardar, opcion.siguiente);
    }
  };
  return boton;
}

// --- Cada respuesta pasa por acá: guarda, muestra la burbuja y sigue ---
function responder(textoUsuario, datos, siguiente) {
  // Copia del estado actual, para poder deshacer con "Volver"
  historial.push({
    nodo: nodoActual,
    memoria: JSON.parse(JSON.stringify(memoria)),
    cantidad: registro.length // cuántos mensajes había
  });
  escribiendo = false;

  agregarBurbuja(textoUsuario, "usuario");
  for (const clave in datos) {
    memoria[clave] = datos[clave];
  }
  irANodo(siguiente);
}

// --- Campo de texto con botón Enviar (y chips de sugerencias) ---
function mostrarCampo(placeholder, sugerencias, alEnviar) {
  respuestas.innerHTML = "";

  const fila = document.createElement("div");
  fila.className = "entrada";
  const campo = document.createElement("input");
  campo.type = "text";
  campo.placeholder = reemplazar(placeholder || "");
  const botonEnviar = document.createElement("button");
  botonEnviar.className = "enviar";
  botonEnviar.textContent = "Enviar";
  const aviso = document.createElement("p");
  aviso.className = "aviso";

  if (sugerencias) {
    const chips = document.createElement("div");
    chips.className = "chips";
    for (let i = 0; i < sugerencias.length; i++) {
      chips.appendChild(crearChip(sugerencias[i], campo));
    }
    respuestas.appendChild(chips);
  }

  function enviar() {
    const valor = campo.value.trim();
    if (valor === "") {
      aviso.textContent = "Escribí algo antes de enviar 🙂";
      campo.focus();
      return;
    }
    alEnviar(valor);
  }

  botonEnviar.onclick = enviar;
  campo.onkeydown = function (evento) {
    if (evento.key === "Enter") enviar();
  };

  fila.appendChild(campo);
  fila.appendChild(botonEnviar);
  respuestas.appendChild(fila);
  respuestas.appendChild(aviso);
  campo.focus();
}

// Un chip rellena el campo con su ejemplo
function crearChip(texto, campo) {
  const chip = document.createElement("button");
  chip.className = "chip";
  chip.textContent = texto;
  chip.onclick = function () {
    campo.value = texto;
    campo.focus();
  };
  return chip;
}

// --- Nodo final: muestra el prompt armado (y lo guarda) ---
function mostrarFinal(nodo) {
  respuestas.innerHTML = "";

  // La primera vez se arma el prompt; después se usa el guardado (con tus cambios)
  if (!actual.prompt) {
    if (typeof nodo.plantilla === "function") {
      actual.prompt = nodo.plantilla(memoria);
    } else {
      actual.prompt = reemplazar(nodo.plantilla);
    }
  }
  actual.terminada = true;

  const tarjeta = document.createElement("div");
  tarjeta.className = "tarjeta";

  const area = document.createElement("textarea");
  area.rows = 14;
  area.value = actual.prompt;
  // Si editás el prompt, los cambios también se guardan
  area.oninput = function () {
    actual.prompt = area.value;
    guardarEnNavegador();
  };

  const botones = document.createElement("div");
  botones.className = "botones";
  const botonCopiar = document.createElement("button");
  botonCopiar.className = "boton";
  botonCopiar.textContent = "📋 Copiar prompt";
  const botonReiniciar = document.createElement("button");
  botonReiniciar.className = "boton claro";
  botonReiniciar.textContent = "🔄 Empezar de nuevo";

  const aclaracion = document.createElement("p");
  aclaracion.className = "recordatorio aclaracion-iteracion";
  aclaracion.innerHTML = "💡 <strong>Recordá:</strong> Lo que se genera con este prompt es solo una base. El proyecto debe iterarse junto con la IA para generar el resultado final (este prompt no es definitivo).";

  const recordatorio = document.createElement("p");
  recordatorio.className = "recordatorio";
  if (memoria.sketch === "no") {
    recordatorio.textContent = "Pegá este prompt en Notion o en la IA que uses para comenzar. Como elegiste continuar sin sketch, la IA interpretará el diseño adecuado a partir de tus respuestas.";
  } else {
    recordatorio.textContent = "Pegá este prompt en Notion antes de usarlo, y mandalo junto con tu sketch.";
  }

  const guardado = document.createElement("p");
  guardado.className = "recordatorio";
  guardado.textContent = "💾 Este prompt queda guardado en tus conversaciones.";

  botonCopiar.onclick = function () {
    copiarPrompt(area, botonCopiar);
  };
  botonReiniciar.onclick = iniciarNueva;

  botones.appendChild(botonCopiar);
  botones.appendChild(botonReiniciar);
  tarjeta.appendChild(area);
  tarjeta.appendChild(botones);
  tarjeta.appendChild(aclaracion);
  tarjeta.appendChild(recordatorio);
  tarjeta.appendChild(guardado);
  mensajes.appendChild(tarjeta);
  bajar();

  guardarConversacion();
}

// --- Copiar: primero navigator.clipboard, y si falla, execCommand ---
function copiarPrompt(area, boton) {
  function avisarCopiado() {
    boton.textContent = "✅ ¡Copiado!";
    setTimeout(function () {
      boton.textContent = "📋 Copiar prompt";
    }, 2000);
  }

  function copiarPlanB() {
    area.select();
    try {
      if (document.execCommand("copy")) {
        avisarCopiado();
      } else {
        boton.textContent = "Copialo con Ctrl+C";
      }
    } catch (error) {
      boton.textContent = "Copialo con Ctrl+C";
    }
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(area.value).then(avisarCopiado).catch(copiarPlanB);
  } else {
    copiarPlanB();
  }
}

// --- Botón "Volver": deshace la última respuesta (chat y memoria) ---
function volver() {
  if (ocupado) return;

  // Si estaba el campo de "escribir lo mío", solo vuelven los botones
  if (escribiendo) {
    mostrarControles(bot.nodos[nodoActual]);
    return;
  }

  if (historial.length === 0) return;
  const anterior = historial.pop();
  registro = registro.slice(0, anterior.cantidad);
  memoria = anterior.memoria;
  nodoActual = anterior.nodo;
  actual.terminada = false; // si volvés desde el final, el prompt se arma de nuevo
  actual.prompt = "";
  redibujarChat();
  mostrarControles(bot.nodos[nodoActual]);
}


// ==================================================================
// ARRANQUE
// ==================================================================
document.getElementById("nombreBot").textContent = bot.nombre;
botonVolver.onclick = volver;
botonNueva.onclick = nuevaConversacion;

conversaciones = leerGuardadas(); // las conversaciones de otras veces
iniciarNueva();                   // y se abre una nueva para empezar