import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const artifacts=fs.readFileSync(new URL("./card-artifacts.js",import.meta.url),"utf8");
const worker=fs.readFileSync(new URL("./service-worker.js",import.meta.url),"utf8");
const release=JSON.parse(fs.readFileSync(new URL("./mobile-release.json",import.meta.url),"utf8"));

assert.match(html,/gscg-build" content="V307-MATCH-PLAY-THICK-ARROWS-FORMAT-20260825"/);
assert.match(html,/gscg-match-play" content="V307-THICK-SVG-ARROWS-MATCH-ONLY-FORMAT-20260825"/);
assert.equal(release.buildNumber,307);
assert.match(worker,/const CACHE_NAME="gscg-mobile-v311-manual-search"/);

assert.match(html,/function matchArrowSvg\(state\)/);
assert.match(html,/M12 22V5M5 12l7-7 7 7/);
assert.match(html,/M12 2v17M5 12l7 7 7-7/);
assert.match(html,/\.scorecard \.match-arrow\{[^}]*width:30px;height:36px/);
assert.match(html,/\.scorecard \.match-arrow path\{[^}]*stroke-width:4\.5;stroke-linecap:round;stroke-linejoin:round/);
assert.doesNotMatch(html,/state==="won"\?"↑":state==="lost"\?"↓":""/);

assert.match(html,/label:"MODALIDAD",value:round\.provisional\?"SCORE CARD - PRÁCTICA":isMatchPlayRound\(\)\?"MATCH PLAY":"RONDA NORMAL"/);
assert.doesNotMatch(html,/label:"MODALIDAD",value:[^\n]*isMatchPlayRound\(\)\?"MATCH PLAY · CON HDCP"/);
assert.match(html,/id="matchPlayRoundButton"[\s\S]*?<span>MATCH PLAY<\/span>/);
assert.doesNotMatch(html,/MATCH PLAY · CON HDCP/);
assert.match(html,/RESULTADO MATCH PLAY/);
assert.match(html,/MATCH OUT<\/th><th>MATCH IN<\/th><th>MATCH TOTAL/);
assert.match(html,/matchStandingMarkup\(out\)[\s\S]*?matchStandingMarkup\(inside\)[\s\S]*?matchStandingMarkup\(total\)/);
assert.match(html,/FIN DEL MATCH/);
assert.match(html,/matchPlayFinalSpeech/);
assert.match(html,/hole>limit/);
assert.doesNotMatch(html,/RESULTADO NETO HOYO POR HOYO/);

assert.match(artifacts,/const matchSymbol=status=>\{if\(status!=="won"&&status!=="lost"\)return""/);
assert.match(artifacts,/stroke-width:4\.5/);
assert.match(artifacts,/Flecha verde hacia arriba = ganó · flecha roja hacia abajo = perdió/);
assert.doesNotMatch(artifacts,/status==="won"\?"↑":status==="lost"\?"↓":""/);

console.log("PASS V307 · FLECHAS GRUESAS · FORMATO MATCH PLAY · OUT/IN/TOTAL UP-DOWN · FIN ANTICIPADO · PAQUETE Y CACHÉ");
