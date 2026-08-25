import assert from "node:assert/strict";
import fs from "node:fs";
import assistant from "./voice-assistant.js";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const research=fs.readFileSync(new URL("./api/research.js",import.meta.url),"utf8");
const normalizeSpeech=value=>String(value||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9ñ]+/g," ").replace(/\s+/g," ").trim();
const localIntentSource=html.slice(html.indexOf("function isLocalRoundQueryIntent"),html.indexOf("\nfunction parseRoundQueryTranscript"));
const isLocalRoundQueryIntent=new Function("normalizeSpeech","round",`${localIntentSource};return isLocalRoundQueryIntent`)(normalizeSpeech,{players:[{name:"Miguel"}]});

const domains=[
  "Salud y medicina","Búsqueda de información","Redacción y corrección de textos","Educación y aprendizaje","Programación y desarrollo de software",
  "Consejos prácticos cotidianos","Traducción de idiomas","Productividad y organización","Investigación y análisis","Negocios y emprendimiento",
  "Marketing digital","Creación de contenido","Matemáticas","Finanzas personales","Psicología y bienestar emocional",
  "Empleo y desarrollo profesional","Resúmenes de documentos","Nutrición y alimentación","Relaciones personales y pareja","Generación de ideas",
  "Redes sociales","Tecnología y dispositivos","Diseño gráfico","Generación y edición de imágenes","Automatización de tareas",
  "Compras y comparación de productos","Ciencia","Viajes y turismo","Noticias y actualidad","Ejercicio y acondicionamiento físico",
  "Ventas y negociación","Análisis de datos","Currículums y entrevistas laborales","Recetas y cocina","Inteligencia artificial",
  "Asesoría legal","Inversiones y mercados financieros","Publicidad","Historia","Entretenimiento",
  "Idiomas y conversación","Presentaciones profesionales","Correos electrónicos y mensajes","Servicio al cliente","Economía",
  "Política","Ciberseguridad y privacidad","Planificación de proyectos","Estrategias empresariales","Desarrollo personal",
  "Música","Cine y series","Deportes","Videojuegos","Arquitectura y construcción",
  "Hogar y decoración","Automóviles","Mascotas y cuidado animal","Crianza y educación infantil","Filosofía",
  "Espiritualidad y religión","Moda y belleza","Comercio electrónico","Contabilidad e impuestos","Bienes raíces",
  "Ingeniería","Estadística","Diseño web","Creación de aplicaciones","Bases de datos",
  "Computación en la nube","Diagnóstico de errores tecnológicos","Edición de video","Generación de videos con IA","Fotografía",
  "Guiones y narrativas","Libros y literatura","Música y composición con IA","Recursos humanos","Liderazgo y gestión de equipos",
  "Logística y transporte","Atención al consumidor","Agricultura y jardinería","Medioambiente y sostenibilidad","Seguros",
  "Trámites gubernamentales","Reparaciones y mantenimiento","Eventos y celebraciones","Pasatiempos y manualidades","Pronósticos del tiempo",
  "Mapas y ubicaciones","Comparación de precios","Recomendaciones de restaurantes","Planificación de menús","Cuidado personal",
  "Sexualidad y salud reproductiva","Evaluación de riesgos","Toma de decisiones","Predicciones y escenarios futuros","Entretenimiento conversacional y curiosidades"
];

assert.equal(domains.length,100);
for(const domain of domains){
  const phrase=`Háblame de ${domain}`;
  assert.equal(assistant.parse(phrase).matched,false,`El asistente local secuestró el tema: ${domain}`);
  assert.equal(isLocalRoundQueryIntent(phrase),false,`La tarjeta confundió con score el tema: ${domain}`);
}

for(const phrase of [
  "Explícame algo que no esté en ninguna lista previa",
  "Ayúdame a entender la bioluminiscencia de organismos abisales",
  "Quiero analizar un tema nuevo que acabamos de inventar"
]){
  assert.equal(assistant.parse(phrase).matched,false);
  assert.equal(isLocalRoundQueryIntent(phrase),false);
}

assert.match(html,/No existe catálogo, lista cerrada ni whitelist de materias/);
assert.match(html,/explicar, enseñar, traducir, redactar, corregir, resumir, calcular, comparar, analizar, planificar, programar, generar ideas/);
assert.match(html,/Todo lo que no sea una operación reconocida de la tarjeta pasa al Caddie/);
assert.match(research,/No existe catálogo, lista cerrada ni whitelist de materias/);
assert.match(research,/tools: \[\{ type: "web_search", external_web_access: true \}\]/);

console.log("PASS V320 · 100 de 100 áreas y temas fuera de lista llegan al Caddie universal");
