import assert from "node:assert/strict";
import fs from "node:fs";
import assistant from "./voice-assistant.js";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const mobileBuild=fs.readFileSync(new URL("./scripts/build-mobile-web.mjs",import.meta.url),"utf8");
const parse=phrase=>assistant.parse(phrase);

assert.deepEqual(parse("Quiero jugar Stableford").action,"open_stableford");
assert.deepEqual(parse("Llévame a Match Play").action,"open_match");
assert.deepEqual(parse("Quiero abrir Four Ball").action,"open_four_ball");
assert.deepEqual(parse("Quiero ir a ver mis tarjetas guardadas").action,"open_history");
assert.deepEqual(parse("Abre la tarjeta digital").action,"open_final_card");
assert.deepEqual(parse("Muéstrame el control manual").action,"open_manual_entry");
assert.match(parse("Cómo borro un bogey que fue par").speech,/Control Manual/);
assert.match(parse("Cómo pregunto el acumulado").speech,/acumulado/i);
assert.equal(parse("Cómo voy").matched,false,"La consulta de resultado real debe continuar al motor de ronda");
assert.equal(parse("Miguel cinco").matched,false,"Un score no debe convertirse en ayuda");
assert.equal(parse("Miguel bogey").matched,false,"El vocabulario golfístico debe continuar al escritor de scores");
assert.equal(parse("¿Cómo manejar a un rival molesto en Match Play?").matched,false,"Hablar de Match Play no debe abrir el registro");
assert.equal(parse("¿Cómo funciona Match Play?").matched,false,"Las reglas de Match Play deben llegar al Caddie universal");

for(const token of ["voice-assistant.js","handleVoiceAssistantTranscript","executeVoiceAssistantAction","pendingVoiceAssistantAction"]){
  assert.ok(html.includes(token),`Falta integración del asistente: ${token}`);
}
assert.ok(html.indexOf("handleVoiceAssistantTranscript(transcript)")<html.indexOf("parseRosterCommand(transcript)"),"La ayuda debe resolverse antes de modificar jugadores o scores");
assert.match(html,/speakQuery\(command\.speech,"assistant"\)\.then\(spoken=>\{/,"La navegación debe ejecutarse también cuando la voz no esté disponible");
assert.match(html,/pendingVoiceAssistantAction!==action/,"Una respuesta anterior no debe ejecutar una navegación nueva");
assert.match(mobileBuild,/"voice-assistant\.js"/,"El paquete móvil debe copiar el asistente de voz");
assert.match(html,/case"open_statistics":return openHistoryInsights\(\)/,"Estadísticas debe abrir un solo panel, sin superponer Historial");

console.log("PASS V311 · asistente de voz para ayuda y navegación segura");
