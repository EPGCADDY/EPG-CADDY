import fs from "node:fs";
import assert from "node:assert/strict";
const hub=fs.readFileSync("live-hub.js","utf8");
const ui=fs.readFileSync("shortcuts-ui.js","utf8");
const app=fs.readFileSync("index-grupal.html","utf8");
assert(hub.includes('$("hubBack").onclick=()=>{if(scorecardReturn){root.location.assign(scorecardReturn.toString());return}const url=new URL("/index-grupal.html"'),"Cerrar debe priorizar la Score Card de origen y conservar el destino directo de respaldo");
assert(!hub.includes('$("hubBack").onclick=()=>{root.close();setTimeout(()=>root.history.back(),100)}'),"No usar history.back para volver al Score Card");
for(const id of ["hubShowGeneral","hubShowCategories","hubShowIndividual","hubAddToBoard","hubTournamentHome"])assert(hub.includes(id),"Falta destino "+id);
for(const label of ["MI SCORE CARD","TORNEOS","GENERAL","VER RESULTADOS POR CATEGORÍA","BUSCAR JUGADOR","TABLERO DE MIS FAVORITOS"])assert(ui.includes(label),"Falta atajo "+label);
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

const {default:vm}=await import('node:vm');const dispatch=ui.slice(ui.indexOf('function act(action)'),ui.indexOf('function start()'));for(const [action,destination] of Object.entries({general:'/live-hub.html?shortcut=general',categories:'/live-hub.html?shortcut=categories',search:'/live-hub.html?shortcut=search',board:'/live-hub.html?shortcut=board',tournaments:'/live-hub.html?directory=1',administration:'/event-administration.html',manual:'/manual.html'})){let target;const context={root:{openRoundTournament:async()=>false},page:()=> 'scorecard',hubState:()=>({}),nav:p=>target=p,close(){},click(){}};await vm.runInNewContext(dispatch+';act('+JSON.stringify(action)+')',context);assert.equal(target,destination,action+' reaches its destination even without assigned event');}
assert(fs.readFileSync('event-administration.html','utf8').includes('[hidden]{display:none!important}'),'Owner-only controls cannot be exposed by button CSS');console.log('PASS actual Menu dispatcher: all seven destinations without assigned event; owner-only hidden controls protected against CSS override.');
