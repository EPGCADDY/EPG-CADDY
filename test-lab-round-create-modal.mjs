import assert from "node:assert/strict";
import fs from "node:fs";
import {createRequire} from "node:module";

const require=createRequire(import.meta.url);
const hub=require("./live-hub.js");
const liveControlApi=require("./live-control.js");
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
assert.match(submit,/root\.localStorage\.setItem\("gsc-tournament-connect-selection-v1",JSON\.stringify\(\{label:name,id:result\.tournamentId,joinCode:result\.joinCode,mode:"general",roundId:"",connected:false\}\)\)/,"El torneo creado debe conservar su código para vincular la ronda en servidores LIVE anteriores");
assert.match(source,/const ROUND_TOURNAMENTS_KEY="gsc-round-tournament-tokens-v1"/,"La ronda creada debe identificarse como un torneo de grupos simple");
assert.match(submit,/new URL\("\/index-grupal\.html\?manual_action=friends-round",root\.location\.origin\)/,"OK debe abrir Registro sin borrar el roster para iniciar la ronda");
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
assert.equal(release.release,"LABORATORIO-20260929-R137");
const score=fs.readFileSync("index-grupal.html","utf8");
assert.match(score,/registrationEventButton[^\n]*addEventListener\("click"[^\n]*new URL\("\/live-hub\.html",location\.origin\)/,"EVENTO desde Inicio debe llevar a la pantalla Torneos, donde vive el alta de ronda");
assert.match(score,/registrationEventButton[^\n]*persistDraftState\(\)/,"EVENTO debe conservar los datos del registro antes de abrir Torneos");
assert.match(score,/id="registrationEventButton">CREAR EVENTO<\/button>/,"El acceso debe decir CREAR EVENTO");
assert.doesNotMatch(score,/previousRoundSetupButton|addPlayerButton|openRosterEditor|rosterAddMode/,"El Registro y la ronda no deben ofrecer RONDA PREVIA ni agregar jugadores después del inicio");
assert.match(score,/if\(rosterEditMode&&deduplicated\.changes\.some\(change=>!change\.position\|\|change\.position>draftPlayers\.length\)\)return\{ok:false,speech:"Error"\}/,"La edición de una ronda existente rechaza altas de jugadores por voz");
assert.match(score,/function openFriendsRoundDraft\(\)[\s\S]*?archived=readRoundArchive\(\)[\s\S]*?source=draft\.length\?draft:\(current&&Array\.isArray\(current\.players\)\?current\.players:\[\]\)/,"CREAR RONDA debe recuperar el borrador, la tarjeta actual o el roster archivado");
assert.match(score,/\"friends-round\":\(\)=>openFriendsRoundDraft\(\)/,"La ruta de alta debe abrir el Registro no destructivo");
const friendsDraft=score.slice(score.indexOf("function openFriendsRoundDraft()"),score.indexOf("function openRegistrationPreservingActiveRound()"));
assert.doesNotMatch(friendsDraft,/clearDraftState|localStorage\.removeItem|openNewRoundDraft/,"El alta Friends no puede borrar borradores ni llamar al inicio destructivo");
assert.match(score,/if\(\["friends-round","private-round"\]\.includes\(new URLSearchParams\(location\.search\)\.get\("manual_action"\)\)\)return false/,"El inicio automático no debe borrar jugadores antes de abrir Registro para Friends o ronda privada");
assert.match(score,/function openPrivateRoundDraft\(\)[\s\S]*?draftTournament=null;[\s\S]*?persistDraftState\(\)/,"La ronda privada debe excluir torneo y guardar el borrador");
assert.match(score,/id="openMyRoundSetup">MI RONDA<\/button>/,"MI RONDA debe estar debajo de rondas guardadas");
assert.match(html,/id="hubCreateRound"[^>]*>CREAR TORNEO<\/button>[\s\S]*?id="hubCreatePrivateRound"[^>]*>CREAR RONDA PRIVADA<\/button>/,"Torneo y ronda privada deben ser botones separados y ordenados");
assert.match(fs.readFileSync("live-control.js","utf8"),/async function connectPendingRoundTournament\(roundValue\)\{\s*if\(!roundValue\?\.tournament\?\.name\)return false/,"Una ronda privada no debe enviarse al torneo pendiente");
const schema=fs.readFileSync("database/005_live_tournament_mode.sql","utf8");
assert.match(schema,/ADD COLUMN IF NOT EXISTS mode text NOT NULL DEFAULT 'general'/,"La API de crear ronda requiere el campo mode en la tabla LIVE");
const worker=fs.readFileSync("service-worker.js","utf8");
assert.match(worker,/fetchPublishedRelease\(\)/,"El Service Worker debe obtener la versión publicada dinámicamente");
assert.match(worker,/release\.json\?sw_release_check=/,"La lectura de versión debe saltarse la caché");
assert.doesNotMatch(worker,/const RELEASE="(?:LABORATORIO|PRODUCTION)-/,"La versión no debe quedar fijada en el Service Worker");
console.log("PASS R136 · diálogo de ronda, roster preservado, vínculo LIVE compatible y reintentos Friends");

const liveControl=fs.readFileSync("live-control.js","utf8");
const liveApi=fs.readFileSync("api/live.js","utf8");
assert.match(liveApi,/CONTROL_ACTIONS=new Set\([^\n]*"join_tournament_by_id"/,"Unir a un torneo por ID también requiere origen de app permitido");
assert.match(liveControl,/function onRoundPersisted\(roundValue\)[\s\S]*?connectPendingRoundTournament\(roundValue\)/,"Al persistir la tarjeta se debe unir al torneo Friends seleccionado");
assert.match(liveControl,/async function connectPendingRoundTournament\(roundValue\)[\s\S]*?connectTournamentById\(tournamentId,snapshot\.groupLabel,joinCode\)/,"La ronda debe crear/publicar su grupo en el torneo seleccionado");
assert.match(liveControl,/selection\.roundId=snapshot\.roundId;selection\.connected=true/,"Debe recordar qué ronda ya se conectó para evitar duplicar grupos");
assert.match(liveControl,/function scheduleTournamentConnectRetry\(roundValue\)[\s\S]*?connectPendingRoundTournament\(current\)/,"Si falla la conexión LIVE, debe reintentarse con la ronda activa");
assert.match(liveControl,/root\.addEventListener\("pageshow",retryPendingRoundConnection\)/,"Al volver a la aplicación, Friends debe reintentar la conexión pendiente");
assert.match(liveControl,/clearTournamentConnectRetry\(snapshot\.roundId\)/,"Una conexión correcta debe cancelar los reintentos pendientes");
assert.match(liveControl,/joinCode=text\(selection\?\.joinCode\|\|ownedTournament\?\.joinCode,20\)\.toUpperCase\(\)/,"La conexión recupera el código guardado del torneo Friends");
assert.match(liveControl,/request\("join_tournament_by_id"[\s\S]*?if\(!result\.ok&&joinCode[\s\S]*?request\("join_tournament",\{joinCode:text\(joinCode,20\)\.toUpperCase\(\),groupLabel/,"Si el backend aún no admite unir por ID, conecta por el código del torneo");
const originalFetch=globalThis.fetch,joinCalls=[];
try{
  globalThis.fetch=async(_url,options)=>{
    const body=JSON.parse(options.body);joinCalls.push({body,authorization:options.headers.Authorization});
    const response=joinCalls.length===1?{ok:false,status:404,body:{ok:false,code:"LIVE_ACTION_UNSUPPORTED"}}:{ok:true,status:200,body:{ok:true,joined:true,tournamentId:"tournament-id",groupLabel:body.groupLabel}};
    return{ok:response.ok,status:response.status,json:async()=>response.body};
  };
  const joined=await liveControlApi.joinTournamentWithFallback("tournament-id","GRUPO 1","abc123def4","publisher-secret");
  assert.equal(joined.ok,true,"La unión por código debe completar el vínculo tras un 404 por ID");
  assert.deepEqual(joinCalls.map(call=>call.body.action),["join_tournament_by_id","join_tournament"]);
  assert.equal(joinCalls[1].body.joinCode,"ABC123DEF4");
  assert.equal(joinCalls[1].body.groupLabel,"GRUPO 1");
  assert.equal(joinCalls[1].authorization,"LivePublisher publisher-secret");
}finally{globalThis.fetch=originalFetch}
assert.match(liveControl,/joinCode=text\(selection\?\.joinCode\|\|ownedTournament\?\.joinCode,20\)\.toUpperCase\(\)/,"La conexión recupera el código guardado del torneo Friends");
assert.match(liveControl,/request\("join_tournament_by_id"[\s\S]*?if\(!result\.ok&&joinCode[\s\S]*?request\("join_tournament",\{joinCode:text\(joinCode,20\)\.toUpperCase\(\),groupLabel/,"Si el backend aún no admite unir por ID, conecta por el código del torneo");

const sorted=hub.sortRoundPlayers([
  {name:"TRES",mode:"general",relativeToPar:1,currentHole:12},
  {name:"DOS",mode:"general",relativeToPar:0,currentHole:4},
  {name:"UNO",mode:"general",relativeToPar:0,currentHole:10},
  {name:"CUATRO",mode:"general",relativeToPar:2,currentHole:18}
]);
assert.deepEqual(sorted.map(player=>player.name),["UNO","DOS","TRES","CUATRO"],"Friends ordena primero por mejor score y resuelve empate por hoyo actual más avanzado");
assert.match(source,/friends-round-view/,"Al seleccionar una ronda se activa la vista directa de jugadores");
assert.match(source,/isRoundTournament\(state\.generalToken\)/,"Sólo los torneos creados como ronda usan la vista compacta");
assert.match(html,/friends-round-view[^\n]*viewer-tools/,"Friends oculta las opciones del monitor general");
assert.match(html,/friends-leader/,"Friends muestra una lista compacta de jugadores");
assert.match(source,/<th>NOMBRE<\/th><th>HDCP<\/th><th>HOYO<\/th><th>GROSS<\/th><th>NETO<\/th><th>\+\/-<\/th>/,"Friends muestra nombre, HDCP, hoyo, gross, neto y +/-");
assert.match(fs.readFileSync("live-hub.html","utf8"),/\.friends-leader\{[^}]*font-family:Arial[^}]*text-transform:uppercase/,"La tabla Friends usa la tipografía de las tarjetas y sólo texto en mayúsculas");
