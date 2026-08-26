import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const stableford=fs.readFileSync(new URL("./stableford-torneo.html",import.meta.url),"utf8");
const artifacts=fs.readFileSync(new URL("./card-artifacts.js",import.meta.url),"utf8");
const individual=fs.readFileSync(new URL("./index.html",import.meta.url),"utf8");
const hosting=JSON.parse(fs.readFileSync(new URL("./vercel.json",import.meta.url),"utf8"));

assert.match(html,/<title>Golf Score Card GT<\/title>/);
assert.match(html,/gscg-build" content="V331-RESEARCHED-SIDE-GAMES-20260826"/);
assert.match(html,/appVersion:"V307"/);
assert.match(html,/V272-QUIET-MISSING-PROMPT-CLOSED-REPORTS-OUT-IN-20260823/);
assert.match(html,/STABLEFORD_OFFICIAL_HOSTING_URL="\/index-grupal\.html\?stableford_emergency=countryclub&emergency_clean=1&v=305"/);
assert.doesNotMatch(html,/epg-caddy-git-stableford-tournament-final/);
assert.match(stableford,/GOLF SCORE CARD GT · STABLEFORD/);
for(const source of ["/","/index.html"]){
  const route=hosting.redirects?.find(item=>item.source===source);
  assert.equal(route?.destination,"/index-grupal.html?inicio=1",`${source} debe abrir directamente la pantalla principal oficial`);
}
assert.equal(hosting.redirects?.find(item=>item.source==="/inicio")?.destination,"/index-grupal.html?inicio=1","/inicio debe abrir directamente la pantalla principal oficial");
assert.equal(hosting.redirects?.find(item=>item.source==="/stableford-torneo.html")?.destination,"/index-grupal.html","Stableford conserva su ruta oficial");

for(const label of ["GROSS OUT","GROSS IN","PUNTOS OUT","PUNTOS IN","GROSS TOTAL","PUNTOS TOTAL"])assert.ok(html.includes(label),`Falta ${label}`);
for(const label of ["GROSS OUT","GROSS IN","PTS OUT","PTS IN"])assert.ok(stableford.includes(label),`Falta ${label} en Stableford`);
for(const obsolete of ["GROSS PRIMERA VUELTA","GROSS SEGUNDA VUELTA","PUNTOS PRIMERA VUELTA","PUNTOS SEGUNDA VUELTA","GROSS 1V","GROSS 2V","PUNTOS 1V","PUNTOS 2V",">IDA<",">VTA<","GROSS IDA","GROSS VTA"]){
  assert.equal([html,stableford,artifacts,individual].some(source=>source.includes(obsolete)),false,`Rótulo visual obsoleto: ${obsolete}`);
}
assert.match(artifacts,/OUT: \$\{stats\.front\.points\} puntos\. IN: \$\{stats\.back\.points\} puntos\./);
assert.match(individual,/<strong>OUT<\/strong>/);
assert.match(individual,/<strong>IN<\/strong>/);

const quietStart=html.indexOf("function operationalCaptureQuiet"),quietEnd=html.indexOf("\nfunction scheduleOperationalMissingPrompt",quietStart);
assert.ok(quietStart>0&&quietEnd>quietStart,"No se encontró la puerta de silencio operacional");
const operationalCaptureQuiet=new Function(`${html.slice(quietStart,quietEnd)};return operationalCaptureQuiet`)();
const base={listeningNow:true,context:"round",speechActive:false,finalizeRequested:false,pendingItems:0,transcriptionWatchdog:null,finalizeTimer:null,liveItems:0,stopMonitor:false,currentPhase:"listening"};
assert.equal(operationalCaptureQuiet(base),true);
for(const [key,value] of [["listeningNow",false],["context","setup"],["speechActive",true],["finalizeRequested",true],["pendingItems",1],["transcriptionWatchdog",1],["finalizeTimer",1],["liveItems",1],["stopMonitor",true],["currentPhase","speaking"],["currentPhase","processing"]]){
  assert.equal(operationalCaptureQuiet({...base,[key]:value}),false,`El aviso no quedó bloqueado por ${key}`);
}

assert.match(html,/const ROUND_TRANSCRIPTION_WATCHDOG_MS=10000/);
assert.match(html,/const ROUND_CONTINUOUS_FINALIZE_MS=3000/);
assert.match(html,/const ROUND_MISSING_IDLE_MS=2000/);
assert.match(html,/const ROUND_MISSING_CONFIRM_MS=450/);
assert.doesNotMatch(html,/stablefordWatchdog|mode==="stableford"\)\?2000:4000/);
assert.match(html,/input_audio_buffer\.speech_started"&&voiceContext==="round"&&listening[^)]*\)\{[\s\S]*?noteRoundOperationalActivity\(\);[\s\S]*?rememberRoundSpeechStarted\(e\.item_id\)/);
assert.match(html,/conversation\.item\.input_audio_transcription\.delta"&&voiceContext==="round"&&!stopMonitorActive\)\{\s*noteRoundOperationalActivity\(\)/);
assert.match(html,/conversation\.item\.input_audio_transcription\.completed"&&voiceContext==="round"\)\{[\s\S]*?rememberRoundTranscriptionCompleted\(key\)/);
assert.match(html,/if\(closure\)speakClosure\(closure\);else\{[\s\S]*?if\(listening\)scheduleOperationalMissingPrompt\(\)\}/);

const closureStart=html.indexOf("async function speakClosure"),closureEnd=html.indexOf("\nasync function speakQuery",closureStart),closureSource=html.slice(closureStart,closureEnd);
assert.ok(closureStart>0&&closureEnd>closureStart,"No se encontró el cierre hablado");
assert.ok(closureSource.indexOf("setVoice(false)")<closureSource.indexOf('speakAuthorized("closure",text)'),"El micrófono debe cerrarse antes de iniciar el reporte");
assert.match(closureSource,/clearOperationalMissingPrompt\(\)/);
assert.match(closureSource,/stopMonitorActive=false/);
const authorizedStart=html.indexOf("function speakAuthorized"),authorizedEnd=html.indexOf("\nfunction speakGlobalError",authorizedStart),authorizedSource=html.slice(authorizedStart,authorizedEnd);
assert.match(authorizedSource,/const monitorStop=reason==="query"\|\|reason==="query_accumulated"/);
assert.match(authorizedSource,/if\(micTrack\)micTrack\.enabled=monitorStop/);
assert.match(html,/segmentSpeech\("Primera vuelta\.",FRONT\)/,"OUT visual no debe alterar el vocabulario hablado aprobado");
assert.match(html,/segmentSpeech\("Segunda vuelta\.",BACK\)/,"IN visual no debe alterar el vocabulario hablado aprobado");
assert.match(html,/Todo lo que no sea una operación reconocida de la tarjeta pasa al Caddie/);
assert.match(html,/Esta ruta nunca modifica jugadores, hoyos ni scores/);

console.log("PASS V274 · recepción continua sin avisos superpuestos, cierre con micrófono apagado, OUT/IN/TOTAL y campos oficiales nuevos");
