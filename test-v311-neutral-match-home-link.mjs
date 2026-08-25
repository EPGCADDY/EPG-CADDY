import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const artifacts=fs.readFileSync(new URL("./card-artifacts.js",import.meta.url),"utf8");
const hosting=JSON.parse(fs.readFileSync(new URL("./vercel.json",import.meta.url),"utf8"));

assert.match(html,/id="matchPlayRoundButton"[^>]*aria-label="Seleccionar Match Play"[\s\S]*?<span>MATCH PLAY<\/span>/);
for(const obsolete of ["MATCH PLAY · CON HDCP","MATCH PLAY CON HDCP","NETO CON HDCP","SE JUEGA CON HDCP"]){
  assert.equal(html.includes(obsolete),false,`Denominación Match Play obsoleta: ${obsolete}`);
}
assert.doesNotMatch(artifacts,/Neto con handicap/i);
assert.match(html,/const directHome=startupParams\.get\("inicio"\)==="1"/);
assert.match(html,/if\(directHome&&!sfEmergency&&!demoControlManual\)openNewRoundDraft\(\)/);
for(const source of ["/","/index.html","/inicio"]){
  const route=hosting.redirects?.find(item=>item.source===source);
  assert.equal(route?.destination,"/index-grupal.html?inicio=1",`${source} debe abrir Configura la ronda`);
}
assert.match(html,/function openNewRoundDraft\(\)\{[\s\S]*?persist\(\);[\s\S]*?openSetup\("new"\)/,"El inicio directo conserva la ronda guardada antes de abrir la pantalla principal");
assert.match(html,/id="fourBallRoundButton"[\s\S]*?<span>FOUR BALL<\/span>/);
assert.match(html,/MATCH PLAY REQUIERE 2 O 4 JUGADORES/);
assert.match(html,/FOUR BALL REQUIERE 2 O 4 JUGADORES/);
assert.match(html,/draft-pair-divider/);
assert.match(html,/team-pair-spacer/);
assert.match(html,/summary-pair-divider/);
assert.match(html,/function teamStandingSpeech\(value\)[\s\S]*?UP\\b\/gi,"arriba"[\s\S]*?DOWN\\b\/gi,"abajo"/);
assert.match(html,/teamMatchSegmentReport\("Primera vuelta",FRONT\)/);
assert.match(html,/teamMatchSegmentReport\("Segunda vuelta",BACK\)/);
assert.match(html,/reports\.push\(activeTeamMatchFinalSpeech\(state\)\)/);

console.log("PASS V311 · NOMBRES NEUTRALES · UNA O DOS PAREJAS · LÍNEA SEPARADORA · VOZ ARRIBA/ABAJO · INICIO DIRECTO");
