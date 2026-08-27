import assert from "node:assert/strict";
import fs from "node:fs";
import assistant from "./voice-assistant.js";
import handler,{sanitizeUniversalAppContext,sanitizeUniversalHistory,summarizeUniversalResponse} from "./api/universal-ai.js";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const api=fs.readFileSync(new URL("./api/universal-ai.js",import.meta.url),"utf8");
const manual=fs.readFileSync(new URL("./manual.html",import.meta.url),"utf8");
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
  "Sexualidad y salud reproductiva","Evaluación de riesgos","Toma de decisiones","Predicciones y escenarios futuros","Entretenimiento conversacional y curiosidades",
  "Antropología","Arqueología","Sociología","Demografía","Geografía física y humana",
  "Lingüística","Semiótica","Retórica y oratoria","Debate y argumentación","Lógica y pensamiento crítico",
  "Ética y bioética","Mitología y folclore","Genealogía","Heráldica","Patrimonio cultural",
  "Museología y curaduría","Bibliotecología y archivística","Geología","Astronomía y exploración espacial","Oceanografía",
  "Paleontología","Biología","Física","Química","Genética y genómica",
  "Neurociencia","Microbiología","Biotecnología","Epidemiología y salud pública","Odontología",
  "Oftalmología y salud visual","Audiología y salud auditiva","Farmacología","Medicina veterinaria","Ciencias forenses",
  "Criminología","Diplomacia y relaciones internacionales","Geopolítica","Seguridad y defensa","Administración pública",
  "Políticas públicas","Urbanismo y ordenamiento territorial","Transporte y movilidad urbana","Aviación y aeronáutica","Navegación marítima",
  "Ferrocarriles y sistemas ferroviarios","Energía y petróleo","Energías renovables","Minería","Metalurgia",
  "Ciencia de materiales","Nanotecnología","Robótica","Electrónica","Telecomunicaciones",
  "Internet de las cosas","Semiconductores y microchips","Computación cuántica","Blockchain y Web3","Realidad virtual y aumentada",
  "Impresión 3D","Diseño industrial","Diseño de productos","Experiencia de usuario UX/UI","Ergonomía",
  "Gestión de calidad","Manufactura y producción industrial","Compras y abastecimiento empresarial","Gestión de inventarios y almacenes","Aduanas y comercio exterior",
  "Teoría de juegos","Franquicias y licenciamiento","Propiedad intelectual, patentes y marcas","Cumplimiento normativo","Gobierno corporativo",
  "Fusiones y adquisiciones","Valoración de empresas","Empresas familiares y sucesión","Auditoría y contabilidad forense","Licitaciones y contratación pública",
  "Recaudación de fondos y subvenciones","Organizaciones sin fines de lucro e impacto social","Mediación, arbitraje y resolución de conflictos","Protocolo y etiqueta","Relaciones públicas",
  "Reputación y comunicación de crisis","Prospectiva y estudios del futuro","Numismática","Filatelia","Antigüedades y coleccionismo",
  "Gemología","Joyería y orfebrería","Relojería","Carpintería y ebanistería","Soldadura y trabajo de metales",
  "Plomería e instalaciones hidráulicas","Electricidad residencial y domótica","Acústica e ingeniería de sonido","Radio y podcasting","Animación digital"
];

assert.equal(domains.length,200);
for(const domain of domains){
  const phrase=`Háblame de ${domain}`;
  assert.equal(assistant.parse(phrase).matched,false,`El menú local secuestró: ${domain}`);
  assert.equal(isLocalRoundQueryIntent(phrase),false,`La tarjeta confundió con score: ${domain}`);
}
for(const phrase of [
  "Relaciona un material cuántico recién descubierto con una técnica artística que todavía no tiene nombre",
  "Ayúdame con una disciplina futura no incluida en ninguna clasificación",
  "Conversemos en francés sobre un problema multidisciplinario inventado hoy"
]){
  assert.equal(assistant.parse(phrase).matched,false);
  assert.equal(isLocalRoundQueryIntent(phrase),false);
}
assert.equal(assistant.parse("Abre el manual de funciones").execute,true,"Una orden directa debe seguir en la aplicación");
assert.equal(isLocalRoundQueryIntent("Cómo hizo Miguel en el hoyo 3"),true,"Una consulta de tarjeta debe conservar su ruta local");

for(const id of ["openAiUniversal","aiUniversalInput","sendAiUniversal","listenAiUniversal","stopAiUniversal","repeatAiUniversal","muteAiUniversal","continueAiUniversal","aiUniversalMessages"]){
  assert.match(html,new RegExp(`id=["']${id}["']`),`Falta control ${id}`);
}
for(const token of [
  "function routeAiUniversalAppText(text)",
  "function submitAiUniversalText(forcedText=\"\")",
  'window.gscgApiUrl("/api/universal-ai")',
  "function startAiUniversalListening()",
  "function speakAiUniversalText(text",
  "function renderAiUniversalHistory()",
  'aiUniversalRemember("user",transcript)',
  'aiUniversalRemember("assistant",finishedConversationText,aiUniversalPendingSources)',
  "const CONVERSATION_INACTIVITY_CLOSE_MS=30*60*1000",
  "CONTEXTO DE CHAT TEMPORAL · REGLAS PUEDE GUARDAR SÓLO TOKENS Y RESPUESTAS OFICIALES EN ESTE DISPOSITIVO"
])assert.ok(html.includes(token),`Falta integración AI UNIVERSAL ∞: ${token}`);
assert.doesNotMatch(html,/localStorage[^\n]{0,120}aiUniversalHistory|aiUniversalHistory[^\n]{0,120}localStorage/i,"El historial temporal de conversación no debe persistirse en el dispositivo");
assert.match(api,/https:\/\/api\.openai\.com\/v1\/responses/);
assert.match(api,/model:"gpt-5\.6"/);
assert.match(api,/store:false/);
assert.match(api,/tools:\[\{type:"web_search",external_web_access:true\},LIVE_TRAFFIC_TOOL\]/);
assert.match(api,/tool_choice:"auto"/);
assert.match(api,/Tu conocimiento no está limitado a una lista/);
assert.match(api,/Diferencia información confirmada, estimaciones, opiniones e hipótesis/);
assert.match(manual,/"PIDE RESPUESTAS PROFUNDAS Y CON FUENTES",\s*"DISTINGUE PREGUNTA, ORDEN Y DATO VIVO"/);

assert.deepEqual(sanitizeUniversalHistory([
  {role:"system",content:"descartar"},
  {role:"user",content:"Primera pregunta"},
  {role:"assistant",content:"Primera respuesta"}
]),[{role:"user",content:"Primera pregunta"},{role:"assistant",content:"Primera respuesta"}]);
assert.deepEqual(sanitizeUniversalAppContext({course:"El Pulté",mode:"match_play",weather:{location:"GPS",condition:"lluvia",temperatureC:"22",feelsLikeC:21,rainProbability:75,windKmh:9}}),{course:"El Pulté",mode:"match_play",weather:{location:"GPS",condition:"lluvia",observedAt:"",temperatureC:22,feelsLikeC:21,rainProbability:75,windKmh:9}});
assert.deepEqual(summarizeUniversalResponse({output:[{type:"message",content:[{type:"output_text",text:"Respuesta completa."},{type:"refusal",refusal:""}]}]}),{ok:true,answer:"Respuesta completa.",sources:[]});

const originalFetch=globalThis.fetch,originalKey=process.env.OPENAI_API_KEY;
let upstreamBody=null;
globalThis.fetch=async(_url,options)=>{
  upstreamBody=JSON.parse(options.body);
  return{ok:true,json:async()=>({output:[{type:"web_search_call",action:{sources:[{title:"Fuente oficial",url:"https://example.com/oficial"}]}},{type:"message",content:[{type:"output_text",text:"Dato vigente confirmado."}]}]})};
};
process.env.OPENAI_API_KEY="test-key";
const req={method:"POST",headers:{host:"epg-caddy.vercel.app"},body:{query:"¿Qué cambió hoy?",history:[{role:"user",content:"Contexto anterior"},{role:"assistant",content:"Respuesta anterior"}],appContext:{course:"El Pulté",mode:"general",weather:{location:"GPS",condition:"despejado",temperatureC:24}}}};
const res={headers:{},statusCode:200,setHeader(name,value){this.headers[name]=value},status(code){this.statusCode=code;return this},json(value){this.body=value;return this}};
try{await handler(req,res)}finally{globalThis.fetch=originalFetch;if(originalKey===undefined)delete process.env.OPENAI_API_KEY;else process.env.OPENAI_API_KEY=originalKey}
assert.equal(res.statusCode,200);
assert.equal(res.body.answer,"Dato vigente confirmado.");
assert.equal(res.body.sources.length,1);
assert.equal(upstreamBody.model,"gpt-5.6");
assert.equal(upstreamBody.store,false);
assert.equal(upstreamBody.tool_choice,"auto");
assert.ok(upstreamBody.tools.some(tool=>tool.type==="web_search"));
assert.ok(upstreamBody.tools.some(tool=>tool.name==="get_live_traffic"));
assert.deepEqual(upstreamBody.input.map(item=>item.role),["user","assistant","user"]);
assert.equal(upstreamBody.input.at(-1).content,"¿Qué cambió hoy?");
assert.match(upstreamBody.instructions,/El Pulté/);

console.log("PASS V321 · AI UNIVERSAL ∞ real, voz + texto + contexto + web y 200 de 200 áreas sin límite cerrado");
