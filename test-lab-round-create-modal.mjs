import assert from "node:assert/strict";
import fs from "node:fs";
import {createRequire} from "node:module";

const require=createRequire(import.meta.url);
const hub=require("./live-hub.js");
const liveControlApi=require("./live-control.js");
const html=fs.readFileSync("live-hub.html","utf8");
const source=fs.readFileSync("live-hub.js","utf8");

assert.match(source,/hubCreateRound.*onclick=openRoundCreate/,"CREAR TORNEO debe abrir directamente el formulario");
assert.match(html,/id="hubRoundCreateDialog"[^>]*aria-hidden="true" hidden/,"El diálogo debe iniciar cerrado y accesible como oculto");
assert.match(html,/role="dialog" aria-modal="true" aria-labelledby="hubRoundDialogTitle"/);
assert.match(html,/id="hubRoundName"[^>]*placeholder="Nombre del torneo"/);
assert.match(html,/id="hubRoundOk"[^>]*>OK<\/button>/);
assert.doesNotMatch(html,/hubRoundCreateFields/,"El nombre no debe quedar expandido permanentemente en la página");
assert.doesNotMatch(html,/\\n\s*<section class="round-create"/,"El botón de la pantalla no debe dejar texto de escape visible");

assert.match(source,/hubCreateRound.*onclick=openRoundCreate/,"CREAR TORNEO debe abrir directamente el formulario");
assert.match(source,/\$\("hubRoundClose"\)\.onclick=\(\)=>setRoundCreateDialogOpen\(false\)/);
assert.match(source,/event\.key==="Escape"[^\n]*setRoundCreateDialogOpen\(false\)/);
const start=source.indexOf("  async function submitRoundCreate()");
const end=source.indexOf("  async function start()",start);
assert.ok(start>=0&&end>start,"Falta el flujo de confirmación de ronda");
const submit=source.slice(start,end);
assert.match(submit,/if\(!name\)[\s\S]*?return false/,"Nombre vacío debe detener el envío");
assert.doesNotMatch(submit,/state\.tournaments\.length>=MAX_SAVED_TOURNAMENTS|YA TIENES 5 TORNEOS GUARDADOS/,"Los torneos guardados no deben bloquear nuevas creaciones");
assert.match(html,/id="hubSavedTournamentList"/,"El diálogo debe mostrar los torneos guardados en este dispositivo");
assert.match(source,/QUITAR DE ESTE DISPOSITIVO/,"Debe poder quitar una referencia local sin borrar el torneo global");
assert.match(source,/function openRoundCreate\(\)\{return setRoundCreateDialogOpen\(true\)\}/,"Crear torneo debe abrir directamente el formulario");
assert.match(submit,/eventKind:"tournament",name,mode/);
assert.match(submit,/state=saved\.state;saveState\(\)/,"La nueva ronda debe guardarse en la lista local de torneos");
assert.match(submit,/liveState\.tournamentOwned=\{tournamentId:result\.tournamentId,name,mode,configuration:result\.configuration/,"El propietario conserva los datos de organización del torneo");
assert.match(submit,/gsc-tournament-connect-selection-v1[\s\S]*?joinCode:result\.joinCode/,"El torneo conserva el código de enlace para iniciar grupos");
assert.match(source,/const ROUND_TOURNAMENTS_KEY="gsc-round-tournament-tokens-v1"/,"La ronda creada debe identificarse como un torneo de grupos simple");
assert.match(submit,/setRoundCreateDialogOpen\(false\)[\s\S]*?selectSavedTournament\(item\.token\)[\s\S]*?presentCreatedTournament\(result/,"Al crear, cierra el formulario, abre el torneo y presenta el acceso de grupos");
assert.match(submit,/setRoundCreateDialogOpen\(false\);if\(item\)[\s\S]*?selectSavedTournament\(item\.token\)/,"Al crear, cierra el formulario y abre el torneo creado");
const letters="ABCDE";let saved=hub.normalizeHubState(null);for(const letter of letters){const result=hub.upsertTournamentState(saved,letter.repeat(43),`TORNEO ${letter}`);assert.equal(result.full,false);saved=result.state}assert.equal(saved.tournaments.length,5,"La lista local muestra los cinco torneos guardados");const blocked=hub.upsertTournamentState(saved,"F".repeat(43),"TORNEO F");assert.equal(blocked.full,true,"El tope se conserva hasta quitar una referencia");saved=hub.removeTournamentFromState(saved,"C".repeat(43));assert.equal(saved.tournaments.length,4,"Quitar solo borra la referencia de este dispositivo");const replacement=hub.upsertTournamentState(saved,"F".repeat(43),"TORNEO F");assert.equal(replacement.full,false);assert.equal(replacement.state.tournaments.length,5);
console.log("PASS crear torneo directamente, mostrar y quitar torneos guardados en este dispositivo");
