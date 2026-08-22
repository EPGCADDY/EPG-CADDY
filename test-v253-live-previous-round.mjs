import assert from "node:assert/strict";
import fs from "node:fs";
import navigation from "./round-navigation.js";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const player=name=>({id:name.toLowerCase(),name,holes:{1:{gross:4}},handicap:0,tee:"Blanco"});
const makeRound=(id,createdAt,mode="general",name=id)=>({id,createdAt,updatedAt:createdAt,configured:true,provisional:false,mode:mode==="stableford"?"stableford":undefined,players:[player(name)],courseKey:"pulte",course:"El Pulté",tournament:{name:`TORNEO ${id}`}});

const generalPrevious=makeRound("general-ayer","2026-08-21T14:00:00.000Z","general","AYER");
const generalCurrent=makeRound("general-hoy","2026-08-22T14:00:00.000Z","general","HOY");
const stablefordPrevious=makeRound("stableford-ayer","2026-08-21T15:00:00.000Z","stableford","SF AYER");
const stablefordCurrent=makeRound("stableford-hoy","2026-08-22T15:00:00.000Z","stableford","SF HOY");
const archive=[stablefordCurrent,generalPrevious,stablefordPrevious,generalCurrent];

let state=navigation.resolve(archive,generalCurrent,"general");
assert.equal(state.available,true);
assert.equal(state.label,"RONDA PREVIA");
assert.equal(state.relation,"previous");
assert.equal(state.target.id,generalPrevious.id);
assert.deepEqual(state.target.players[0].holes,generalPrevious.players[0].holes);
assert.equal(state.target.tournament.name,"TORNEO general-ayer");

state=navigation.resolve(archive,generalPrevious,"general");
assert.equal(state.label,"RONDA ACTUAL");
assert.equal(state.relation,"current");
assert.equal(state.target.id,generalCurrent.id);

state=navigation.resolve(archive,null,"general");
assert.equal(state.label,"RONDA PREVIA");
assert.equal(state.target.id,generalCurrent.id,"Desde el registro vacío se recupera la última General");

state=navigation.resolve(archive,stablefordCurrent,"stableford");
assert.equal(state.target.id,stablefordPrevious.id);
assert.equal(navigation.modeOf(state.target),"stableford");
assert.ok(!navigation.orderedRounds(archive,"stableford").some(round=>round.id.startsWith("general")),"Stableford no mezcla rondas General");

state=navigation.resolve([generalCurrent],generalCurrent,"general");
assert.equal(state.available,false,"No aparece RONDA PREVIA si solo existe la ronda activa");

const detached=navigation.resolve(archive,generalCurrent,"general").target;
detached.players[0].name="EDITADA";
assert.equal(generalPrevious.players[0].name,"AYER","La ronda restaurada es una copia operativa independiente");

assert.match(html,/V(?:253-LIVE-PREVIOUS-ROUND|254-REMOVE-REGISTRATION-GUIDE|255-PLAYER-REGISTRATION-BOXES-CODES|256-MASTER-DATA-PLATFORM|257-STABLEFORD-COURSE-SELECTOR-TITLE|258-STABLEFORD-READONLY-MANUAL-PLAN-B|259-STABLEFORD-HIDE-UNUSED-PLAYER-ROWS)-20260822/);
assert.match(html,/id="previousRoundButton">RONDA PREVIA/);
assert.match(html,/id="previousRoundSetupButton">RONDA PREVIA/);
assert.match(html,/id="previousStablefordRoundButton">RONDA PREVIA/);
assert.match(html,/function activatePreviousOperationalRound\(modeHint=null,fromSetup=false\)/);
assert.match(html,/if\(round\.configured\)persist\(\)/,"La ronda actual debe guardarse antes de restaurar otra");
assert.match(html,/round=restored;activateCourse/);
assert.match(html,/persist\(\);render\(\);\$\("status"\)\.textContent=state\.relation/,"La ronda restaurada debe quedar activa, editable y persistida");
assert.match(html,/activatePreviousOperationalRound\("general",true\)/);
assert.match(html,/activatePreviousOperationalRound\("stableford",true\)/);
assert.match(html,/STABLEFORD_OFFICIAL_HOSTING_URL="https:\/\/epg-caddy-git-stableford-tournament-final-epgcaddys-projects\.vercel\.app\/index-grupal\.html\?stableford_emergency=countryclub&emergency_clean=1&v=259"/);
assert.match(html,/id="stableCourseOption" href="\$\{STABLEFORD_OFFICIAL_HOSTING_URL\}"[\s\S]{0,180}<span>STABLEFORD<\/span>/);
assert.doesNotMatch(html,/closest\("#stableCourseOption"\)[\s\S]{0,180}openFreshStablefordSetup/);
assert.doesNotMatch(html,/removeItem\(ROUND_ARCHIVE_KEY\)/);
assert.doesNotMatch(html,/removeItem\(STABLEFORD_SERIES_KEY\)/);

console.log("PASS V253 · RONDA PREVIA viva en General y Stableford, retorno a RONDA ACTUAL y separación de historiales");
