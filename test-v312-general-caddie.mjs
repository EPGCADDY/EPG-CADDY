import assert from "node:assert/strict";
import fs from "node:fs";
import assistant from "./voice-assistant.js";
import { summarizeWeather } from "./api/weather.js";
import { summarizeResearchResponse } from "./api/research.js";

const html = fs.readFileSync(new URL("./index-grupal.html", import.meta.url), "utf8");
const sessionApi = fs.readFileSync(new URL("./api/session-grupal.js", import.meta.url), "utf8");
const weatherApi = fs.readFileSync(new URL("./api/weather.js", import.meta.url), "utf8");
const researchApi = fs.readFileSync(new URL("./api/research.js", import.meta.url), "utf8");
const serviceWorker = fs.readFileSync(new URL("./service-worker.js", import.meta.url), "utf8");
const stableford = fs.readFileSync(new URL("./stableford.js", import.meta.url), "utf8");

assert.equal(assistant.parse("¿Cómo estás?").matched, false, "Una plática no debe convertirse en menú de comandos");
assert.equal(assistant.parse("¿Crees que va a llover hoy?").matched, false, "El clima debe llegar al Caddie general");
assert.equal(assistant.parse("¿Cómo estará el próximo fin de semana?").matched, false, "El pronóstico futuro debe llegar al Caddie general");
assert.equal(assistant.parse("¿Qué podré tomar para el dolor de tobillo?").matched, false, "La salud debe llegar al Caddie con límites seguros");
assert.equal(assistant.parse("Carlos cinco").matched, false, "El score debe conservar su ruta operacional");
assert.equal(assistant.parse("Háblame de medicinas, vuelos y cultura").matched, false, "Los temas generales deben llegar al Caddie universal");

for (const token of [
  "function speakConversation(transcript)",
  "function responseForConversation(token",
  "function isGeneralConversationIntent(transcript)",
  "continueConversationAfterTool(functionCall)",
  "let conversationToolTransition=null",
  "function conversationToolStopIsPreFollowup(eventResponseId,transition)",
  "conversationToolTransition.followupRequested=true",
  'name:"get_current_weather"',
  'window.gscgApiUrl("/api/weather")',
  "activeCourseWeatherContext()",
  "navigator.geolocation.getCurrentPosition",
  "function renderCourseWeather(state=\"\")",
  "function renderSetupWeather(state=\"\")",
  "function inferConversationForecastRange(transcript)",
  "function resumeConversationListening({autoClose=true}={})",
  "function realtimeWebResearchTool()",
  'name:"search_live_web"',
  'window.gscgApiUrl("/api/research")',
  "function renderCaddieSources(result)",
  "function interruptConversationSpeech()",
  "async function syncSetupWeather({force=false}={})",
  'id="setupWeather"',
  "async function syncActiveCourseWeather({force=false}={})",
  "function scheduleActiveCourseWeather(retryDelay=0)",
  "WEATHER_REFRESH_MS=10*60*1000",
  "WEATHER_RETRY_MS=2*60*1000",
  'location:"GPS del teléfono"',
  "round.weather={...result,origin",
  'if(!round.configured||round.officiallyClosedAt)return null'
]) assert.ok(html.includes(token), `Falta integración conversacional: ${token}`);

assert.ok(
  html.indexOf("if(isGeneralConversationIntent(transcript))") < html.indexOf("const parsed=parseRoundScoreTranscript(transcript)"),
  "Una conversación inequívoca debe protegerse antes del escritor de scores"
);
assert.match(html, /if\(!speakConversation\(transcript\)\)/, "Toda frase operacionalmente desconocida debe llegar al Caddie");
assert.match(html,/input_audio_buffer\.speech_started"&&listening&&authorizedSpeech\?\.reason==="conversation"[\s\S]*?interruptConversationSpeech\(\)/,"La voz del jugador debe cortar inmediatamente al Caddie");
const conversationStart=html.slice(html.indexOf("function speakConversation(transcript)"),html.indexOf("async function setSessionVoiceSpeed"));
assert.match(conversationStart,/conversationBargeInArmedAt=Date\.now\(\)\+250/,"La interrupción debe ignorar sólo el arranque inmediato del altavoz");
assert.match(conversationStart,/if\(micTrack\)micTrack\.enabled=listening/,"El micrófono debe permanecer disponible mientras habla el Caddie");
assert.doesNotMatch(conversationStart,/micTrack\.enabled=false/,"La respuesta no puede bloquear la interrupción por voz");
assert.match(html,/echoCancellation:true,noiseSuppression:true,autoGainControl:true/,"La escucha simultánea debe conservar cancelación de eco");
const outputStopped=html.slice(html.indexOf('if(e.type==="output_audio_buffer.stopped")'),html.indexOf('if(e.type==="output_audio_buffer.cleared")'));
assert.ok(outputStopped.indexOf("conversationToolTransition")<outputStopped.indexOf("clearSpeechAuthorization()"),"El cierre de la consulta no puede desautorizar la respuesta climática final");
assert.doesNotMatch(outputStopped,/activeResponseId===transition\.followupResponseId/,"Un cierre de audio de iPhone sin ID no debe dejar la pista del micrófono apagada");
assert.match(outputStopped,/resumeConversationListening\(\)/,"Al terminar de hablar el Caddie debe reactivar la pista antes del plazo de espera");
const stopHelperSource=html.slice(html.indexOf("function conversationToolStopIsPreFollowup"),html.indexOf("\nfunction isGeneralConversationIntent"));
const conversationToolStopIsPreFollowup=new Function(`${stopHelperSource};return conversationToolStopIsPreFollowup`)();
assert.equal(conversationToolStopIsPreFollowup(null,{sourceResponseId:"source",followupResponseId:null}),true,"Antes de la respuesta final debe esperar");
assert.equal(conversationToolStopIsPreFollowup(null,{sourceResponseId:"source",followupResponseId:"final"}),false,"El cierre final sin ID debe reactivar el micrófono");
assert.match(html,/Cuando necesites una herramienta, no pronuncies un preámbulo/,"El clima debe responder una sola vez y completo");
assert.match(html, /phase=listening\?"listening":"idle"/, "La conversación debe volver a escuchar automáticamente");
assert.match(html, /En salud ofrece únicamente orientación general/, "Faltan límites seguros para preguntas médicas");
assert.match(html,/const CONVERSATION_IDLE_CLOSE_MS=3000/,"El micrófono debe cerrarse tras tres segundos sin seguimiento");
assert.match(html,/const ROUND_VAD_SILENCE_MS=1000/,"Un segundo de silencio debe iniciar la respuesta sin demora artificial");
assert.match(html,/silence_duration_ms:ROUND_VAD_SILENCE_MS/,"Cliente y sesión deben compartir el cierre rápido del turno");
assert.match(html,/start_date:[\s\S]*?end_date:/,"La herramienta debe aceptar fechas y rangos futuros");
assert.match(html,/forecastStartDate,forecastEndDate/,"La consulta futura debe llegar completa a la API meteorológica");
assert.match(html,/Si pregunta a qué hora lloverá, usa rainTiming/,"La segunda pregunta debe contestar la hora de lluvia sin remitir a otra aplicación");
assert.match(html,/\.setup-weather\{position:sticky/,"El clima de Inicio debe seguir visible al desplazarse hasta el micrófono");
assert.match(html, /V314-ALL-MICROPHONES-UNIVERSAL/, "Falta declarar el Caddie universal en todos los micrófonos");
assert.match(html, /Abrir Caddie universal o dictar jugadores/, "El micrófono de la primera pantalla debe identificarse como universal");
assert.match(html, /REGISTRO DE JUGADORES · CADDIE UNIVERSAL/, "La primera pantalla debe explicar la doble función del micrófono");
const setupTranscriptBlock=html.slice(html.indexOf('if(e.type==="conversation.item.input_audio_transcription.completed"&&voiceContext==="setup")'),html.indexOf('if(e.type==="conversation.item.input_audio_transcription.completed"&&voiceContext==="round")'));
assert.ok(setupTranscriptBlock.indexOf("isGeneralConversationIntent")<setupTranscriptBlock.indexOf("appendSetupTranscript"),"Una pregunta universal de Inicio debe atenderse antes de tratarla como registro");
assert.match(setupTranscriptBlock,/speakConversation\(setupUtterance\)/,"El micrófono de Inicio debe abrir el mismo Caddie conversacional");
assert.match(setupTranscriptBlock,/!setupRegistration\.ok/,"Toda frase de Inicio que no sea un registro válido debe llegar al Caddie universal");
assert.match(sessionApi,/Caddie conversacional de propósito general disponible desde todos los micrófonos/,"La sesión Realtime de Inicio no debe limitarse al registro");
assert.match(sessionApi,/español natural de cualquier tema, preguntas y seguimiento/,"La transcripción inicial debe comprender conversación universal");
assert.match(stableford,/Abrir Caddie universal o dictar jugadores Stableford/,"El micrófono Stableford también debe abrir el Caddie universal");
assert.match(html, /Nunca inventes scores ni afirmes que cambiaste la tarjeta/, "La conversación no debe atribuirse mutaciones de score");
assert.match(html, /weatherLocation:"El Pulté Golf/, "El clima debe enlazarse con el catálogo de campos");
assert.match(html, /weatherCoordinates:\{latitude:14\.4920708,longitude:-90\.5792525\}/, "Mayan Golf debe usar coordenadas propias y no una ciudad vecina");
assert.match(html, /const gps=await currentBrowserCoordinates\(\);\s*const origin=gps\?"gps":"field"/, "El clima automático debe intentar primero el GPS del teléfono");
assert.match(html, /\?\{location:"GPS del teléfono",latitude:gps\.latitude,longitude:gps\.longitude\}\s*:\{location:course\.weatherLocation,\.\.\.course\.weatherCoordinates\}/, "El campo sólo debe ser respaldo cuando no haya GPS");
assert.match(html, /gpsAccuracyMeters:origin==="gps"\?gps\.accuracyMeters:null/, "La tarjeta debe registrar la precisión sin guardar las coordenadas exactas");
assert.match(html, /scheduleActiveCourseWeather\(\);/, "Abrir o renderizar una tarjeta activa debe programar clima automático");
assert.match(html, /\$\("setupOverlay"\)\.classList\.add\("visible"\);\s*syncSetupWeather\(\)/, "Abrir la primera pantalla debe solicitar y mostrar el clima");
assert.match(html, /renderDraft\(\);syncSetupWeather\(\{force:true\}\)/, "Cambiar el campo en Inicio debe renovar la condición meteorológica");
const setupWeatherStart=html.indexOf("async function syncSetupWeather");
const setupWeatherEnd=html.indexOf("\nfunction renderCourseWeather",setupWeatherStart);
const setupWeatherSource=html.slice(setupWeatherStart,setupWeatherEnd);
assert.doesNotMatch(setupWeatherSource,/setVoice|toggleVoice|ensureSession|getUserMedia/,"El clima de Inicio no puede abrir ni modificar el micrófono");
assert.match(html, /snapshot\?\.fieldKey===round\.courseKey/, "Una lectura de otro campo no puede considerarse vigente");
assert.match(html, /weather:round\.courseKey===stablefordSetupCourseKey\?\(round\.weather\|\|null\):null/, "Cambiar el campo de Stableford debe descartar el clima anterior");
const automaticWeatherStart=html.indexOf("async function syncActiveCourseWeather");
const automaticWeatherEnd=html.indexOf("\nfunction scheduleActiveCourseWeather",automaticWeatherStart);
const automaticWeatherSource=html.slice(automaticWeatherStart,automaticWeatherEnd);
assert.doesNotMatch(automaticWeatherSource, /setVoice|toggleVoice|ensureSession|getUserMedia/, "El clima automático no puede abrir ni modificar el micrófono");
assert.match(html, /bindMicActivation\("headerMic","round"\)/, "El micrófono debe conservar activación manual por botón");
assert.equal((html.match(/setVoice\(true\)/g)||[]).length, 1, "No puede aparecer una segunda activación automática del micrófono");
const toggleStart = html.indexOf("async function toggleVoice(context)");
const toggleEnd = html.indexOf("\nfunction dateSetup()", toggleStart);
assert.ok(toggleStart > 0 && html.indexOf("setVoice(true)", toggleStart) < toggleEnd, "La única activación debe vivir dentro del gesto toggleVoice");
assert.doesNotMatch(html, /voiceprint|speakerRecognition|voiceBiometric|enrollVoice/i, "No se permite huella, identificación ni enrolamiento de voz");
assert.match(sessionApi, /Caddie conversacional de propósito general/, "La sesión Realtime debe aceptar respuestas conversacionales explícitas");
assert.match(sessionApi, /Transcribe literalmente español natural de cualquier tema/, "La transcripción no debe limitarse al vocabulario de score");
assert.match(weatherApi, /api\.open-meteo\.com\/v1\/forecast/, "Falta proveedor meteorológico vivo");
assert.match(weatherApi, /geocoding-api\.open-meteo\.com\/v1\/search/, "Falta resolución de campos o ubicaciones");
assert.match(serviceWorker, /gscg-mobile-v315-universal-web-barge-in/, "La PWA debe reemplazar el shell anterior");
assert.match(weatherApi, /forecast_days\", \"16\"/, "El pronóstico natural debe admitir el máximo confiable de 16 días");
assert.match(researchApi,/https:\/\/api\.openai\.com\/v1\/responses/,"La investigación universal debe usar Responses API");
assert.match(researchApi,/type: \"web_search\"/,"La investigación debe consultar la web viva");
assert.match(researchApi,/model: \"gpt-5\.6\"/,"La investigación debe usar el modelo universal vigente configurado");
assert.match(researchApi,/tool_choice: \"required\"/,"Si el Caddie solicita investigación, la API debe ejecutarla realmente");

const forecastHelperSource=html.slice(html.indexOf("function guatemalaDateIso"),html.indexOf("\nfunction conversationInstructions"));
const inferConversationForecastRange=new Function("normalizeSpeech",`${forecastHelperSource};return inferConversationForecastRange`)(value=>String(value||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase());
const nextWeekend=inferConversationForecastRange("¿Cómo estará el próximo fin de semana?");
assert.equal(new Date(`${nextWeekend.startDate}T12:00:00Z`).getUTCDay(),6,"El fin de semana debe comenzar sábado");
assert.equal(new Date(`${nextWeekend.endDate}T12:00:00Z`).getUTCDay(),0,"El fin de semana debe terminar domingo");
assert.equal(inferConversationForecastRange("¿Cómo estará mañana?").startDate.length,10,"Mañana debe convertirse en fecha ISO");

const summary = summarizeWeather({
  timezone: "America/Guatemala",
  current: { time: "2026-08-25T12:00", temperature_2m: 21.4, apparent_temperature: 20.1, precipitation: 0, weather_code: 61, wind_speed_10m: 8.2 },
  hourly: { time: ["2026-08-25T11:00", "2026-08-25T12:00", "2026-08-25T13:00"], precipitation_probability: [10, 35, 70] }
}, "Mayan Golf");
assert.deepEqual(summary, {
  ok: true,
  source: "Open-Meteo",
  location: "Mayan Golf",
  observedAt: "2026-08-25T12:00",
  timezone: "America/Guatemala",
  temperatureC: 21.4,
  feelsLikeC: 20.1,
  precipitationMm: 0,
  windKmh: 8.2,
  condition: "lluvia ligera",
  maxRainProbabilityToday: 70,
  rainTiming: {
    date: "2026-08-25",
    peakProbability: 70,
    peakTime: "13:00",
    windows: [{ startTime: "12:00", endTime: "13:00", maxProbability: 70, peakTime: "13:00", precipitationMm: 0 }]
  }
});

const weekend = summarizeWeather({
  timezone: "America/Guatemala",
  daily: {
    time: ["2026-08-29", "2026-08-30"],
    weather_code: [61, 2],
    temperature_2m_min: [15, 16],
    temperature_2m_max: [24, 25],
    apparent_temperature_min: [14, 15],
    apparent_temperature_max: [25, 26],
    precipitation_sum: [4.2, 0.3],
    precipitation_probability_max: [80, 25],
    wind_speed_10m_max: [18, 12]
  },
  hourly: {
    time: ["2026-08-29T14:00", "2026-08-29T15:00", "2026-08-29T16:00", "2026-08-30T10:00"],
    precipitation_probability: [40, 75, 55, 20],
    precipitation: [0.1, 1.2, 0.4, 0]
  }
}, "El Pulté", { forecastStartDate: "2026-08-29", forecastEndDate: "2026-08-30" });
assert.equal(weekend.ok, true);
assert.equal(weekend.forecastType, "range");
assert.equal(weekend.days.length, 2);
assert.equal(weekend.days[0].condition, "lluvia ligera");
assert.equal(weekend.days[1].maxRainProbability, 25);
assert.equal(weekend.days[0].rainTiming.peakTime, "15:00");
assert.equal(weekend.days[0].rainTiming.windows[0].maxProbability, 75);

const research = summarizeResearchResponse({output:[
  {type:"web_search_call",action:{sources:[{title:"Fuente oficial",url:"https://example.org/a"}]}},
  {type:"message",content:[{type:"output_text",text:"Respuesta verificada.",annotations:[{type:"url_citation",title:"Fuente oficial",url:"https://example.org/a"},{type:"url_citation",title:"Segunda fuente",url:"https://example.com/b"}]}]}
]});
assert.deepEqual(research,{ok:true,source:"OpenAI Web Search",answer:"Respuesta verificada.",sources:[{title:"Fuente oficial",url:"https://example.org/a"},{title:"Segunda fuente",url:"https://example.com/b"}]});

console.log("PASS V315 · asistente universal, web viva, interrupción, respuesta rápida y clima futuro");
