import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import {createRequire} from "node:module";

const require=createRequire(import.meta.url);
const match=require("./match-play.js");
const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");

const canonicalIndex=html.indexOf("const canonical=readStoredRound(ACTIVE_ROUND_KEY)");
const legacyIndex=html.indexOf('const candidates=[latestStoredRound("general"),latestStoredRound("stableford"),latestStoredRound("match_play")]');
assert.ok(canonicalIndex>0&&legacyIndex>canonicalIndex,"La ronda canónica debe cargarse antes que las claves heredadas");
assert.match(html,/if\(isRecoverableStoredRound\(canonical\)\)return canonical/);
assert.match(html,/if\(isRecoverableStoredRound\(round\)\)localStorage\.setItem\(ACTIVE_ROUND_KEY,payload\)/);
assert.doesNotMatch(html,/localStorage\.removeItem\(ACTIVE_ROUND_KEY\)/);

const holes={};
for(let hole=1;hole<=9;hole++)holes[hole]={net:hole===9?5:3};
const holesDown={};
for(let hole=1;hole<=9;hole++)holesDown[hole]={net:hole===9?4:5};
const players=[{id:"jaime",name:"JAIME",holes},{id:"gustavo",name:"GUSTAVO",holes:holesDown}];
assert.equal(match.segmentStanding(players,0,[1,2,3,4,5,6,7,8,9]).position,"7 UP");
assert.equal(match.segmentStanding(players,1,[1,2,3,4,5,6,7,8,9]).position,"7 DOWN");

const speechSource=html.match(/function teamStandingSpeech\(value\)\{[^\n]+\}/)?.[0];
assert.ok(speechSource,"Falta el normalizador hablado Match Play");
const sandbox={};vm.createContext(sandbox);vm.runInContext(`${speechSource};globalThis.speak=teamStandingSpeech`,sandbox);
const report=`Primera vuelta. ${players.map((player,index)=>`${player.name}, ${sandbox.speak(match.segmentStanding(players,index,[1,2,3,4,5,6,7,8,9]).position)}`).join(". ")}.`;
assert.equal(report,"Primera vuelta. JAIME, 7 arriba. GUSTAVO, 7 abajo.");

assert.match(html,/if\(!isTeamMatchRound\(\)\)return baseClosureSpeechIfDue\(\)/);
assert.match(html,/const speech=segmentSpeech\("Primera vuelta\.",FRONT\)/);
console.log("PASS V363 INTOCABLES · ronda viva + Match Play con nombres + Ronda Normal intacta");
