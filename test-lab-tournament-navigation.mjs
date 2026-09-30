import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createRequire} from 'node:module';
const hub=createRequire(import.meta.url)('./live-hub.js');
const source=fs.readFileSync('live-hub.js','utf8');
const player={id:'p1',name:'UNO'},other={id:'p2',name:'DOS'},stream={id:'g1',snapshot:{players:[player,other]}};
const selected=hub.uniqueFavoritePlayers([
 {item:{kind:'group',key:'g1:group'},stream,players:[player,other]},
 {item:{kind:'player',key:'g1:p1'},stream,players:[player]}
]);
assert.deepEqual(selected.flatMap(x=>x.players.map(p=>p.id)),['p1','p2']);
assert.equal(selected[0].item.key,'g1:p1');
assert.equal(hub.uniqueFavoritePlayers([{item:{kind:'player'},stream:null,players:[]}]).length,1,'Un enlace no disponible sigue visible para poder quitarlo');
const classes=new Set(['hub-search-mode','hub-favorites-mode']);
let rendered=0;
let statusMessage='';
const context={$:()=>null,root:{document:{body:{classList:{remove:(...names)=>names.forEach(x=>classes.delete(x))}}}},clearTimeout(){},timer:null,renderAll(){rendered++},setStatus(message){statusMessage=message}};
vm.runInNewContext(source.slice(source.indexOf('  function setPageTitle(value){'),source.indexOf('  function renderAll(){'))+';showTournamentPortal()',context);
assert.equal(classes.size,0,'Regresar al portal limpia los modos que ocultaban los torneos');assert.equal(rendered,1);assert.equal(statusMessage,'','El portal no debe mostrar el rótulo ELIGE UNA FUNCIÓN O UN TORNEO');
assert.doesNotMatch(source,/ELIGE UNA FUNCIÓN O UN TORNEO/,'La función operativa no debe volver a emitir el rótulo eliminado');
const streams=hub.demoTournamentStreams();
assert.equal(hub.buildLeaderboard(streams,false).length,67,'Ranking general de favoritos considera todos los jugadores');
const html=fs.readFileSync('live-hub.html','utf8');
assert.match(html,/body:not\(\.public-display\) \.hub \.hidden\{display:none!important\}/);
assert.doesNotMatch(html,/body:not\(\.public-display\) #hubState,/,'No ocultar el estado junto a elementos decorativos');
assert.match(html,/ADJUNTAR RONDA EN VIVO/);
const live=fs.readFileSync('live-control.js','utf8');
assert.doesNotMatch(live,/async function quickShareGroup\(\)\{\s*openLivePanel\(\)/,'Compartir nativo no debe abrir administración antes de compartir');
console.log('PASS torneo: regreso portal, favoritos únicos, ranking completo, mensajes y compartir visibles');

assert.match(html,/id="hubPageTitle">TORNEOS<\/h1>/);
assert.match(html,/>GENERAL<\/button>/);
assert.match(html,/>CATEGORÍA<\/button>/);
assert.match(html,/>BUSCAR JUGADORES<\/button>/);
assert.match(html,/>MIS FAVORITOS<\/button>/);
assert.match(source,/add\?"BUSCAR JUGADORES":categories\?"RESULTADOS POR CATEGORÍA":individual\?"MIS FAVORITOS":"RESULTADOS GENERALES"/);
assert.doesNotMatch(html,/#hubShowCategories\{display:none!important\}/,'RESULTADOS POR CATEGORÍA no puede estar oculto');
assert.match(html,/class="viewer-entry hidden" id="hubTournamentEntry"/,'AGREGAR POR ENLACE debe permanecer secundario y oculto hasta solicitarlo');
assert.match(html,/>\+ AGREGAR TORNEO<\/button>/,'La función de agregar torneo debe ser explícita');
assert.match(source,/pendingMonitor=kind/,'La función elegida debe conservarse mientras se selecciona el torneo');
assert.match(source,/ELIGE EL TORNEO DONDE QUIERES BUSCAR/,'BUSCAR JUGADORES debe pedir torneo sin convertir la acción en pegar enlace');
assert.match(source,/tournamentEntryOpen=!tournamentEntryOpen/,'El ingreso por enlace sólo aparece al tocar AGREGAR TORNEO');
console.log("PASS R76: arquitectura TORNEOS conserva intención, muestra categorías y separa búsqueda de agregar por enlace");

// Exercise the actual portal renderer in both entry and saved-event states.
const nodes=new Map();
function element(id){if(!nodes.has(id)){const hidden=new Set();nodes.set(id,{innerHTML:'',attributes:{},classList:{toggle(name,on){on?hidden.add(name):hidden.delete(name)},contains:name=>hidden.has(name)},setAttribute(name,value){this.attributes[name]=value},querySelectorAll(){return []}})}return nodes.get(id)}
const portal={$:element,root:{location:{search:''},document:{querySelector:()=>element('monitor-switch')}},URLSearchParams,tournamentPortalOpen:true,registeredTournamentsOpen:false,tournamentEntryOpen:false,activeMonitor:'general',demoMode:()=>false,state:{tournaments:[]},escapeHtml:hub.escapeHtml||((s)=>s)};
const renderer=source.slice(source.indexOf('  function renderTournamentShelf(){'),source.indexOf('  function resetGeneralView(){'));
vm.runInNewContext(renderer+';renderTournamentShelf()',portal);
assert.equal(element('hubTournamentShelf').classList.contains('hidden'),false);
assert.equal(element('hubTournamentCards').classList.contains('hidden'),true);
assert.equal(element('hubSavedEventActions').classList.contains('hidden'),true);
assert.equal(element('monitor-switch').classList.contains('hidden'),true,'Results controls appear after event selection');
assert.match(element('hubTournamentCards').innerHTML,/TODAVÍA NO HAY TORNEOS GUARDADOS/);
assert.doesNotMatch(element('hubTournamentCards').innerHTML,/DEMOSTRACIÓN/,'No synthetic event is injected into the real entry');
portal.registeredTournamentsOpen=true;
vm.runInNewContext('renderTournamentShelf()',portal);
assert.equal(element('hubTournamentCards').classList.contains('hidden'),false);
assert.equal(element('hubSavedEventActions').classList.contains('hidden'),false);
portal.tournamentPortalOpen=false;
vm.runInNewContext('renderTournamentShelf()',portal);
assert.equal(element('hubTournamentShelf').classList.contains('hidden'),true);
assert.equal(element('monitor-switch').classList.contains('hidden'),false);
const registration=fs.readFileSync('index-grupal.html','utf8');
assert.match(registration,/id="registrationEventButton"[^>]*>CREAR TORNEO<\/button>\s*<button[^>]*id="openMyRoundSetup"[^>]*>CREAR RONDA PRIVADA<\/button>/,'Approved entry buttons remain adjacent');
assert.match(registration,/GSCPersonalEvents\.createPrivate\(round\)/,'Create opens a new private form even with a saved event');
assert.match(html,/id="hubRegisteredTournaments"[^>]*>VER SCORES<\/button>/);
assert.ok(html.indexOf('id="hubCreateRound"')<html.indexOf('id="hubRegisteredTournaments"'));
assert.ok(html.indexOf('id="hubShareGeneral"')<html.indexOf('<details class="viewer-tools"'),'COMPARTIR LIVE is directly accessible outside Options');
console.log('PASS R145 approved entry: adjacent create buttons, real empty state, create/view scores order, saved-event actions, results after selection, direct LIVE share.');
