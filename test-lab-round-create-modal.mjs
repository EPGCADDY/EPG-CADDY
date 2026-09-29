import assert from "node:assert/strict";
import fs from "node:fs";
import {createRequire} from "node:module";

const require=createRequire(import.meta.url);
const hub=require("./live-hub.js");
const html=fs.readFileSync("live-hub.html","utf8");
const source=fs.readFileSync("live-hub.js","utf8");

assert.match(html,/id="hubCreateRound"[^>]*aria-haspopup="dialog"[^>]*aria-controls="hubRoundCreateDialog"/);
assert.match(html,/id="hubRoundCreateDialog"[^>]*aria-hidden="true" hidden/,"El diálogo debe iniciar cerrado y accesible como oculto");
assert.match(html,/role="dialog" aria-modal="true" aria-labelledby="hubRoundDialogTitle"/);
assert.match(html,/id="hubRoundName"[^>]*placeholder="Nombre del torneo"/);
assert.match(html,/id="hubRoundOk"[^>]*>OK<\/button>/);
assert.doesNotMatch(html,/hubRoundCreateFields/,"El nombre no debe quedar expandido permanentemente en la página");
assert.doesNotMatch(html,/\\n\s*<section class="round-create"/,"El botón de la pantalla no debe dejar texto de escape visible");

assert.match(source,/\$\("hubCreateRound"\)\.onclick=\(\)=>setRoundCreateDialogOpen\(true\)/,"CREAR RONDA debe abrir el diálogo bajo demanda");
assert.match(source,/\$\("hubRoundClose"\)\.onclick=\(\)=>setRoundCreateDialogOpen\(false\)/);
assert.match(source,/event\.key==="Escape"[^\n]*setRoundCreateDialogOpen\(false\)/);
const start=source.indexOf("  async function submitRoundCreate()");
const end=source.indexOf("  async function start()",start);
assert.ok(start>=0&&end>start,"Falta el flujo de confirmación de ronda");
const submit=source.slice(start,end);
assert.match(submit,/if\(!name\)[\s\S]*?return false/,"Nombre vacío debe detener el envío");
assert.match(submit,/state\.tournaments\.length>=MAX_SAVED_TOURNAMENTS/,"El límite de cinco se debe comprobar antes de crear en el servidor");
assert.match(submit,/action:"create_tournament",name,mode:"general"/);
assert.match(submit,/state=saved\.state;saveState\(\)/,"La nueva ronda debe guardarse en la lista local de torneos");
assert.match(submit,/liveState\.tournamentOwned=\{tournamentId:result\.tournamentId,name,mode:"general",organizerSecret:result\.organizerSecret,viewerToken:result\.viewerToken,joinCode:result\.joinCode,expiresAt:result\.expiresAt\}/,"El Score conserva los datos para compartir el torneo e incorporar grupos");
assert.match(submit,/root\.localStorage\.setItem\("gsc-tournament-connect-selection-v1",JSON\.stringify\(\{label:name,id:result\.tournamentId,mode:"general"\}\)\)/,"El torneo creado debe quedar seleccionado para conectar la ronda de Score");
assert.match(submit,/new URL\("\/index-grupal\.html\?manual_action=setup",root\.location\.origin\)/,"OK debe abrir el Registro de Score existente para iniciar la ronda");
assert.match(submit,/setRoundCreateDialogOpen\(false\);root\.location\.assign\(url\.toString\(\)\)/,"Tras OK, cerrar el diálogo y entrar al Registro de Score");
assert.match(submit,/result\?\.code==="42703"[\s\S]*?FALTA ACTUALIZAR EL SERVIDOR/,"La causa de esquema faltante debe mostrarse con una instrucción clara");

let state={version:2,generalToken:"",tournaments:[],follows:[]};
const tokens=Array.from({length:6},(_,i)=>String.fromCharCode(65+i).repeat(40));
const added=hub.upsertTournamentState(state,tokens[0],"Simulado entre amigos");
assert.equal(added.added,true);
assert.equal(added.state.tournaments[0].label,"Simulado entre amigos");
state=added.state;
for(let i=1;i<5;i++)state=hub.upsertTournamentState(state,tokens[i],`TORNEO ${i+1}`).state;
const full=hub.upsertTournamentState(state,tokens[5],"NO DEBE AGREGARSE");
assert.equal(full.full,true);
assert.equal(full.state.tournaments.length,5,"La lista debe conservar el límite de cinco");

const release=JSON.parse(fs.readFileSync("release.json","utf8"));
assert.equal(release.release,"LABORATORIO-20260928-R131");
const score=fs.readFileSync("index-grupal.html","utf8");
assert.match(score,/registrationEventButton[^\n]*addEventListener\("click"[^\n]*new URL\("\/live-hub\.html",location\.origin\)/,"EVENTO desde Inicio debe llevar a la pantalla Torneos, donde vive el alta de ronda");
assert.match(score,/registrationEventButton[^\n]*persistDraftState\(\)/,"EVENTO debe conservar los datos del registro antes de abrir Torneos");
const schema=fs.readFileSync("database/005_live_tournament_mode.sql","utf8");
assert.match(schema,/ADD COLUMN IF NOT EXISTS mode text NOT NULL DEFAULT 'general'/,"La API de crear ronda requiere el campo mode en la tabla LIVE");
const worker=fs.readFileSync("service-worker.js","utf8");
assert.match(worker,/fetchPublishedRelease\(\)/,"El Service Worker debe obtener la versión publicada dinámicamente");
assert.match(worker,/release\.json\?sw_release_check=/,"La lectura de versión debe saltarse la caché");
assert.doesNotMatch(worker,/const RELEASE="(?:LABORATORIO|PRODUCTION)-/,"La versión no debe quedar fijada en el Service Worker");
console.log("PASS R131 · diálogo bajo demanda, nombre obligatorio, límite de cinco, Score seleccionado y acceso EVENTO→TORNEOS");
