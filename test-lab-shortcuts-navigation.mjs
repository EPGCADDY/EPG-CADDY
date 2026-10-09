import fs from "node:fs";
import assert from "node:assert/strict";
const hub=fs.readFileSync("live-hub.js","utf8");
const ui=fs.readFileSync("shortcuts-ui.js","utf8");
const app=fs.readFileSync("index-grupal.html","utf8");
assert(hub.includes('$("hubBack").onclick=()=>{if(scorecardReturn){root.location.assign(scorecardReturn.toString());return}const url=new URL("/index-grupal.html"'),"Cerrar debe priorizar la Score Card de origen y conservar el destino directo de respaldo");
assert(!hub.includes('$("hubBack").onclick=()=>{root.close();setTimeout(()=>root.history.back(),100)}'),"No usar history.back para volver al Score Card");
for(const id of ["hubShowGeneral","hubShowCategories","hubShowIndividual","hubAddToBoard","hubTournamentHome"])assert(hub.includes(id),"Falta destino "+id);
for(const label of ["MI SCORE CARD","SCORES TORNEO","SCORES MI GRUPO","SCORES GENERAL","SCORES POR CATEGORÍA","MIS FAVORITOS"])assert(ui.includes(label),"Falta atajo "+label);
assert(!ui.includes('b.innerHTML="<img'),"MENÚ no debe insertar ningún logo en el botón");
assert(ui.includes('b.innerHTML="<span>MENÚ</span>"'),"MENÚ debe mostrar sólo la palabra MENÚ grande y centrada");
assert(!ui.includes("/assets/official-logos/golf-score-card-gt-pwa-v345-192.png"),"MENÚ no debe usar el icono PWA cuadrado");
for(const id of ["setupOverlay","finalCardOverlay","cardLibraryOverlay","historyInsightsOverlay","officialCorrectionOverlay"])assert(app.includes('id="'+id+'"')||app.includes('#'+id),"Falta pantalla/overlay "+id);
assert(ui.includes("position:fixed!important"),"MENÚ debe permanecer flotante y visible sobre cualquier pantalla");
assert(ui.includes('item("manual","MANUAL DE USUARIO"'),"MENÚ debe incluir acceso directo al Manual");
assert(!ui.includes("padding-right:68px!important"),"MENÚ no debe reducir el ancho útil de la app");
assert(!app.includes("#gscShortcutsButton{display:none"),"La app no debe ocultar MENÚ");
assert(!app.includes('id="registrationEventButton"')&&ui.includes('CREAR TORNEO'),"CREAR TORNEO pertenece exclusivamente al MENÚ");
assert(app.includes('async function createTournamentFromMenu()')&&app.includes('persistDraftState()'),"MENÚ conserva el borrador antes de crear torneo");
assert(!app.includes('body:has(#finalCardOverlay.visible) #gscShortcutsButton'),"Tarjeta Digital no debe ocultar MENÚ");
console.log("PASS LAB deterministic tournament navigation + MENÚ universal overlays");
assert(!ui.includes('<h3>GESTIONAR</h3>'),'GESTIONAR eliminado por orden del propietario');
assert(!ui.includes('item("remove-tournament"')&&!ui.includes('item("exit-tournament"')&&!ui.includes('item("clear-board"')&&!ui.includes('item("add-tournament"'),'Ninguna opción de GESTIONAR debe renderizarse');
console.log('PASS R22: sección GESTIONAR y sus cuatro opciones retiradas del MENÚ');

const {default:vm}=await import('node:vm');const dispatch=ui.slice(ui.indexOf('function act(action)'),ui.indexOf('function start()'));for(const [action,destination] of Object.entries({general:'/live-hub.html?shortcut=general',categories:'/live-hub.html?shortcut=categories',search:'/live-hub.html?shortcut=search',board:'/live-hub.html?shortcut=board',administration:'/event-administration.html',manual:'/manual.html'})){let target;const context={root:{openRoundTournament:async()=>false},page:()=> 'scorecard',hubState:()=>({}),nav:p=>target=p,close(){},click(){}};await vm.runInNewContext(dispatch+';act('+JSON.stringify(action)+')',context);assert.equal(target,destination,action+' reaches its destination even without assigned event');}let currentScores;const currentContext={root:{openRoundTournament:(...args)=>currentScores=args},page:()=> 'scorecard',hubState:()=>({}),close(){},click(){},nav(){throw Error('Score Card should not open the global directory')}};await vm.runInNewContext(dispatch+';act("tournaments")',currentContext);assert.deepEqual(currentScores,[true,'general'],'SCORES TORNEO resolves only the active Score Card tournament');
assert(fs.readFileSync('event-administration.html','utf8').includes('[hidden]{display:none!important}'),'Owner-only controls cannot be exposed by button CSS');console.log('PASS actual Menu dispatcher: all seven destinations without assigned event; owner-only hidden controls protected against CSS override.');

for(const [surface,expected] of [["scorecard","privateGroupScoresButton"],["hub","/index-grupal.html?manual_action=group-scores"]]){let target;const context={root:{},page:()=>surface,hubState:()=>({}),close(){},click:id=>target=id,nav:url=>target=url};vm.runInNewContext(dispatch+';act("group-scores")',context);assert.equal(target,expected)}
assert(app.includes('"group-scores":()=>window.GSCPrivateRounds.openGroupScores(round)'));
assert(app.includes('"tournament-scores":()=>openRoundTournament(true,"general")'));
assert(ui.includes('Ver el torneo asignado a tu Score Card'));
assert(ui.includes('return nav("/index-grupal.html?round_return=1&manual_action=tournament-scores")'));
assert(hub.includes('params.get("shortcut")!=="scores"'));
assert(hub.includes('NO HAY UN TORNEO ASIGNADO A ESTA SCORE CARD'));
assert(hub.includes("entryParams.get('directory')==='1'"));
assert(hub.includes("root.location.replace('/event-administration.html')"));
assert(hub.includes("root.location.replace('/index-grupal.html?round_return=1&manual_action=tournament-scores')"));
assert(hub.includes('$("hubTournamentHome").onclick=()=>root.location.assign("/event-administration.html")'));
let returnTarget;const hubContext={root:{location:{href:'https://fixture.example/live-hub.html?directory=1',origin:'https://fixture.example'}},page:()=> 'hub',hubState:()=>({}),close(){},click(){},nav:path=>returnTarget=path};await vm.runInNewContext(dispatch+';act("tournaments")',hubContext);assert.equal(returnTarget,'/index-grupal.html?round_return=1&manual_action=tournament-scores','The Score menu returns to the active card before resolving its tournament');
console.log("PASS Scores Mi Grupo menu uses current card and restores its own group from hub");

const renderSource=ui.slice(ui.indexOf('function render()'),ui.indexOf('function organizer()'));let menuHtml;const renderContext={hubState:()=>({}),page:()=> 'scorecard',item:(action,label)=>'<button data-shortcut="'+action+'">'+label+'</button>',$:()=>({set innerHTML(value){menuHtml=value},querySelectorAll:()=>[]})};vm.runInNewContext(renderSource+';render()',renderContext);const scoresBlock=menuHtml.split('<h3>SCORES</h3>')[1];assert(scoresBlock,'Dedicated Scores block required');assert.deepEqual([...scoresBlock.matchAll(/data-shortcut="([^"]+)"/g)].map(m=>m[1]),['tournaments','group-scores','general','categories','board']);console.log('PASS all five Scores entries are contiguous in one dedicated section, with no intervening action');
