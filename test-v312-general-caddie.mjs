import assert from "node:assert/strict";
import fs from "node:fs";
import assistant from "./voice-assistant.js";
import { summarizeWeather } from "./api/weather.js";

const html = fs.readFileSync(new URL("./index-grupal.html", import.meta.url), "utf8");
const sessionApi = fs.readFileSync(new URL("./api/session-grupal.js", import.meta.url), "utf8");
const weatherApi = fs.readFileSync(new URL("./api/weather.js", import.meta.url), "utf8");
const serviceWorker = fs.readFileSync(new URL("./service-worker.js", import.meta.url), "utf8");

assert.equal(assistant.parse("¿Cómo estás?").matched, false, "Una plática no debe convertirse en menú de comandos");
assert.equal(assistant.parse("¿Crees que va a llover hoy?").matched, false, "El clima debe llegar al Caddie general");
assert.equal(assistant.parse("¿Qué podré tomar para el dolor de tobillo?").matched, false, "La salud debe llegar al Caddie con límites seguros");
assert.equal(assistant.parse("Carlos cinco").matched, false, "El score debe conservar su ruta operacional");

for (const token of [
  "function speakConversation(transcript)",
  "function responseForConversation(token",
  "function isGeneralConversationIntent(transcript)",
  "function interruptConversationSpeech()",
  "continueConversationAfterTool(functionCall)",
  'name:"get_current_weather"',
  'window.gscgApiUrl("/api/weather")',
  "activeCourseWeatherContext()",
  "navigator.geolocation.getCurrentPosition",
  "function renderCourseWeather(state=\"\")",
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
assert.match(html, /if\(authorizedSpeech\?\.reason==="conversation"\)interruptConversationSpeech\(\)/, "El jugador debe poder interrumpir sin comando especial");
assert.match(html, /phase=listening\?"listening":"idle"/, "La conversación debe volver a escuchar automáticamente");
assert.match(html, /En salud ofrece únicamente orientación general/, "Faltan límites seguros para preguntas médicas");
assert.match(html, /Nunca inventes scores ni afirmes que cambiaste la tarjeta/, "La conversación no debe atribuirse mutaciones de score");
assert.match(html, /weatherLocation:"El Pulté Golf/, "El clima debe enlazarse con el catálogo de campos");
assert.match(html, /weatherCoordinates:\{latitude:14\.4920708,longitude:-90\.5792525\}/, "Mayan Golf debe usar coordenadas propias y no una ciudad vecina");
assert.match(html, /const gps=await currentBrowserCoordinates\(\);\s*const origin=gps\?"gps":"field"/, "El clima automático debe intentar primero el GPS del teléfono");
assert.match(html, /\?\{location:"GPS del teléfono",latitude:gps\.latitude,longitude:gps\.longitude\}\s*:\{location:course\.weatherLocation,\.\.\.course\.weatherCoordinates\}/, "El campo sólo debe ser respaldo cuando no haya GPS");
assert.match(html, /gpsAccuracyMeters:origin==="gps"\?gps\.accuracyMeters:null/, "La tarjeta debe registrar la precisión sin guardar las coordenadas exactas");
assert.match(html, /scheduleActiveCourseWeather\(\);/, "Abrir o renderizar una tarjeta activa debe programar clima automático");
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
assert.match(serviceWorker, /gscg-mobile-v312-conversational-caddie/, "La PWA debe reemplazar el shell anterior");

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
  maxRainProbabilityToday: 70
});

console.log("PASS V312 · Caddie conversacional general, clima vivo y score protegido");
