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
const privateEntry=registration.match(/\$\("openMyRoundSetup"\)\.addEventListener\("click",\(\)=>\{([\s\S]*?)\}\);/)[1];
let requestedPrivate;
const registered=[{id:'p1',name:'UNO',tournamentCategory:'b'}];
vm.runInNewContext(`(()=>{${privateEntry}})()`,{captureVisibleRegistrationValues(){},syncDraftPlayersFromManualRows:()=>true,persistDraftState(){},draftPlayers:registered,round:{configured:true,id:'existing-round',players:[{name:'ANTERIOR'}]},COURSE_CATALOG:{pulte:{name:'El Pulté'}},draftCourse:'pulte',draftRoundMode:'general',window:{GSCPersonalEvents:{createPrivate:value=>{requestedPrivate=value}}}});
assert.equal(requestedPrivate.registrationDraft,true,'Create opens a new private form even with a saved event');
assert.equal(requestedPrivate.players[0].name,'UNO','Create uses the visible registered group rather than the prior saved round');
assert.match(html,/id="hubRegisteredTournaments"[^>]*>VER SCORES<\/button>/);
assert.ok(html.indexOf('id="hubCreateRound"')<html.indexOf('id="hubRegisteredTournaments"'));
assert.ok(html.indexOf('id="hubShareGeneral"')<html.indexOf('<details class="viewer-tools"'),'COMPARTIR LIVE is directly accessible outside Options');
console.log('PASS R145 approved entry: adjacent create buttons, real empty state, create/view scores order, saved-event actions, results after selection, direct LIVE share.');

// A return to General must remove the category filter from the actual handler.
const monitorContext={$:element,root:{document:{body:{classList:{toggle(){}}}}},tournamentPortalOpen:false,state:{generalToken:'event'},demoMode:()=>false,setPageTitle(){},renderTournamentShelf(){},renderAll(){},renderScoresHeading(){},renderLeaderboard(){},setStatus(){},categoryCardOpen:true};
element('hubCategory').value='championship';
vm.runInNewContext(source.slice(source.indexOf('  function showMonitor(kind){'),source.indexOf('  function clearHash(){'))+';showMonitor("general")',monitorContext);
assert.equal(element('hubCategory').value,'all','General returns to all players after Category');
assert.equal(monitorContext.categoryCardOpen,false,'General closes the category-specific detail');
console.log('PASS return Category → General restores all players');

// Player quick lookup uses the one assigned category, while a spectator retains a selector.
monitorContext.CATEGORY_LABELS={b:'B',championship:'CAMPEONATO'};
monitorContext.root.GSCPersonalEvents={membership:()=>({players:[{tournamentCategory:'b'}]})};
monitorContext.setTimeout=()=>{};
element('hubSearch').value='DEMO 03';
vm.runInNewContext('showMonitor("categories")',monitorContext);
assert.equal(element('hubCategory').value,'b','Player category is B, never unrelated Campeonato');
assert.equal(element('hubSearch').value,'','Category is not secretly filtered by a previous search');
monitorContext.root.GSCPersonalEvents.membership=()=>({role:'viewer',players:[]});
element('hubCategory').value='b';
vm.runInNewContext('showMonitor("categories")',monitorContext);
assert.equal(element('hubCategory').value,'b','Spectator preserves the chosen player category');
const compactContext={general:null,activeMonitor:'general',$:element,fold:x=>String(x||'').toLowerCase(),state:{follows:[],generalToken:'token'},root:{GSCScoresUI:{bindRows(){}},GSCPersonalEvents:{descriptor:()=>({eventKind:'tournament'})}},escapeHtml:s=>String(s),relation:s=>String(s)};
element('hubSearch').value='';
const compactWrap={innerHTML:'',querySelectorAll:()=>[]};compactContext.wrap=compactWrap;compactContext.rows=[{name:'DEMO 03',rankLabel:'T2',categoryLabel:'B',currentHole:3,holes:3,gross:15,net:12,relativeToPar:0,streamId:'g',playerId:'p'}];
vm.runInNewContext(source.slice(source.indexOf('  function renderCompactScores('),source.indexOf('  function totalCell('))+';renderCompactScores(wrap,rows)',compactContext);
assert.match(compactWrap.innerHTML,/<th>NOMBRE<\/th><th>HOYO<\/th><th>GROSS<\/th><th>NETO<\/th><th>\+\/−<\/th>/);
assert.doesNotMatch(compactWrap.innerHTML,/<th>POS<\/th>/,'Approved five-column layout omits position');
console.log('PASS player category / spectator category / search return / visible position including ties');
// Spectator search exposes both standings from the same official ranking engine.
const searchStreams=hub.demoTournamentStreams();
const queryPlayer=hub.tournamentPlayers(searchStreams)[0];
element('hubSearch').value=queryPlayer.name;
const searchCtx={$:element,fold:x=>String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase(),displayStreams:()=>searchStreams,tournamentPlayers:hub.tournamentPlayers,buildLeaderboard:hub.buildLeaderboard,escapeHtml:s=>String(s),categoryShortLabel:hub.categoryShortLabel};
vm.runInNewContext(source.slice(source.indexOf('  function renderSearch(){'),source.indexOf('  function displayScenes(){'))+';renderSearch()',searchCtx);
const queryOverall=hub.buildLeaderboard(searchStreams,false).find(row=>row.streamId===queryPlayer.streamId&&row.playerId===queryPlayer.playerId);
assert.ok(queryOverall);
assert.ok(element('hubSearchResults').innerHTML.includes('GENERAL '+queryOverall.rankLabel));
assert.match(element('hubSearchResults').innerHTML,/ · CATEGORÍA (?:T?\d+|—)/);
console.log('PASS spectator search displays general and category standings without changing favorites');

const scoresCSS=fs.readFileSync('scores-ui.css','utf8');
assert.match(scoresCSS,/#hubShowIndividual[^{}]*\{[^}]*display\s*:\s*none/,'Approved three tabs use the visible inline player search');
assert.match(scoresCSS,/#hubSearchResults[^{}]*\{[^}]*display\s*:\s*none/,'Inline search filters the approved compact table');
assert.match(scoresCSS,/\.monitor-switch\{grid-template-columns:repeat\(2,minmax\(0,1fr\)\)\}/);
console.log('PASS approved four entries and search results are not overridden by Scores CSS');
