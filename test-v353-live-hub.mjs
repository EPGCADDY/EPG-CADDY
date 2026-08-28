import assert from "node:assert/strict";
import fs from "node:fs";
import {createRequire} from "node:module";
import {groupKey} from "./api/live.js";

const require=createRequire(import.meta.url),hub=require("./live-hub.js"),read=file=>fs.readFileSync(file,"utf8");
const token=letter=>letter.repeat(43);
function makeStream(groupNumber,playerCount=4){
  const players=Array.from({length:playerCount},(_,index)=>{
    const number=(groupNumber-1)*playerCount+index+1,holes=(number%18)+1,relativeToPar=(number%13)-6;
    return{id:`player-${groupNumber}-${index+1}`,name:`JUGADOR ${String(number).padStart(2,"0")}`,handicap:number%25,tee:"BLANCO",holes:[],totals:{holes,gross:holes*5,net:holes*4,par:holes*4,relativeToPar,stablefordPoints:null}};
  });
  return{id:`stream-${groupNumber}`,groupLabel:`GRUPO ${String(groupNumber).padStart(2,"0")}`,status:"active",revision:groupNumber,snapshot:{schemaVersion:1,appVersion:"V353",roundId:`round-${groupNumber}`,groupLabel:`GRUPO ${groupNumber}`,course:"CAMPO INTERNACIONAL",courseHoles:[],mode:"general",status:"active",players}};
}

const twentyGroups=Array.from({length:20},(_,index)=>makeStream(index+1,4));
const eightyPlayers=hub.buildLeaderboard(twentyGroups);
assert.equal(twentyGroups.length,20,"80 personas en grupos normales requieren 20 publicadores");
assert.equal(eightyPlayers.length,80,"la General conserva los 80 jugadores");
assert.equal(new Set(eightyPlayers.map(item=>`${item.streamId}:${item.playerId}`)).size,80,"ningún jugador se duplica");
assert.ok(eightyPlayers.every(item=>Number.isInteger(item.rank)&&item.groupLabel),"cada jugador tiene posición y grupo");

const fortyGroups=Array.from({length:40},(_,index)=>makeStream(index+1,2));
const firstPage=fortyGroups.slice(0,25),secondPage=fortyGroups.slice(25),pagedMap=new Map([...firstPage,...secondPage].map(stream=>[stream.id,stream]));
assert.equal(pagedMap.size,40,"la General une páginas sin perder grupos");
assert.equal(hub.tournamentPlayers(pagedMap).length,80,"40 grupos de dos también conservan 80 jugadores");

const monitorState={version:1,generalToken:token("A"),follows:[
  {key:"stream-2:player-2-1",kind:"player",streamId:"stream-2",playerId:"player-2-1",label:"JUGADOR 05",groupLabel:"GRUPO 02"},
  {key:"stream-8:player-8-2",kind:"player",streamId:"stream-8",playerId:"player-8-2",label:"JUGADOR 30",groupLabel:"GRUPO 08"},
  {key:"stream-15:player-15-3",kind:"player",streamId:"stream-15",playerId:"player-15-3",label:"JUGADOR 59",groupLabel:"GRUPO 15"}
]};
const generalMap=new Map(twentyGroups.map(stream=>[stream.id,stream]));
assert.equal(hub.resolveFollows(monitorState,generalMap,new Map()).length,3,"tres jugadores aparecen en el Monitor Individual");
assert.equal(hub.unresolvedFollowTokens(monitorState,generalMap).length,0,"el Monitor Individual reutiliza la General sin lecturas extra");
const externalState=hub.addFollowToState(monitorState,{key:"outside:p1",kind:"player",token:token("B"),streamId:"outside",playerId:"p1",label:"JUGADOR EXTERNO",groupLabel:"OTRO TORNEO"});
assert.deepEqual(hub.unresolvedFollowTokens(externalState,generalMap),[token("B")],"sólo la persona fuera de la General necesita otra lectura");
assert.equal(hub.addFollowToState(externalState,externalState.follows[0]).follows.length,4,"agregar de nuevo no duplica favoritos");

assert.deepEqual(hub.parseHubHash(`#general=${token("C")}`),{kind:"general",token:token("C")});
assert.deepEqual(hub.parseHubHash(`#stream=${token("D")}`),{kind:"stream",token:token("D")});
assert.deepEqual(hub.parseShareLink(`https://golf.example/live.html#tournament=${token("E")}`,"https://golf.example"),{kind:"general",token:token("E")});
assert.deepEqual(hub.parseShareLink(`https://golf.example/live.html#stream=${token("F")}`,"https://golf.example"),{kind:"stream",token:token("F")});
assert.equal(hub.parseShareLink(`https://evil.example/live.html#stream=${token("F")}`,"https://golf.example"),null,"no se importan enlaces de otro origen");
assert.equal(groupKey("  Grupo   001  "),"grupo 001");
assert.equal(groupKey("GRUPO 001"),"grupo 001");

const index=read("index-grupal.html"),html=read("live-hub.html"),client=read("live-hub.js"),control=read("live-control.js"),viewer=read("live-view.js"),viewerHtml=read("live.html"),api=read("api/live.js"),worker=read("service-worker.js"),vercel=read("vercel.json");
assert.match(index,/V353-CENTRO-LIVE-GENERAL-INDIVIDUAL-20260828/);
assert.match(html,/CENTRO LIVE/);
assert.match(html,/1 · MONITOR GENERAL/);
assert.match(html,/2 · MONITOR INDIVIDUAL/);
assert.match(html,/1 · ABRE EL ENLACE/);
assert.match(html,/2 · ELIGE MONITOR/);
assert.match(html,/3 · TOCA \+ SEGUIR/);
assert.match(html,/4 · MIRA LIVE/);
assert.match(html,/COMPARTIR GENERAL ♾️/);
assert.match(html,/USA, MÉXICO, ITALIA O CUALQUIER PAÍS/);
assert.match(html,/UNA SOLA SCORE CARD PUBLICA POR GRUPO/);
assert.doesNotMatch(`${html}\n${client}\n${control}`,/ESPOSA|HIJO|HIJA|FAMILIAR/i,"los monitores usan lenguaje universal");
assert.match(client,/action:"read"/);
assert.doesNotMatch(client,/action:"(?:create_stream|publish|revoke_stream|join_tournament|leave_tournament)"/,"Centro Live nunca controla ni edita una tarjeta");
assert.match(client,/localStorage/,"sólo el Centro Live recuerda la General y favoritos en este teléfono");
assert.match(client,/history\.replaceState/,"el token importado se retira del hash visible");
assert.doesNotMatch(client,/pages\s*</,"la carga de páginas no tiene un máximo fijo");
assert.match(client,/seenCursors/,"un cursor repetido no puede crear un ciclo infinito");
assert.doesNotMatch(viewer,/localStorage|sessionStorage/i,"el visor simple no persiste secretos");
assert.match(viewerHtml,/id="liveAddHub"/);
assert.match(viewer,/root\.open\(hubUrl\(access\),"_blank","noopener,noreferrer"\)/,"Centro Live abre separado de la Score Card");
assert.match(control,/CENTRO LIVE · ELIGE TU MONITOR/);
assert.match(control,/COMPARTIR ♾️ · MUNDIAL/);
assert.match(control,/WHATSAPP, MENSAJES, CORREO, AIRDROP, X O CUALQUIER APP/);
assert.match(control,/UN SOLO CAPITÁN DE TARJETA/);
assert.match(control,/NOMBRE O NÚMERO DEL GRUPO · OBLIGATORIO/);
assert.match(control,/LIVE_GROUP_ALREADY_PUBLISHING/);
assert.match(api,/LIVE_GROUP_LABEL_REQUIRED/);
assert.match(api,/LIVE_GROUP_ALREADY_PUBLISHING/);
const joinSource=api.slice(api.indexOf("async function joinTournament"),api.indexOf("async function leaveTournament"));
assert.match(joinSource,/WITH tournament AS MATERIALIZED/);
assert.match(joinSource,/FOR UPDATE/,"el torneo se bloquea mientras decide el capitán único");
assert.match(joinSource,/other\.tournament_id=tournament\.id/);
assert.match(joinSource,/decision\.outcome_code='APPLY'/,"la unión se aplica dentro de la misma sentencia atómica");
assert.match(worker,/gscg-mobile-v353-live-hub/);
assert.match(worker,/"\/live-hub\.html"/);
assert.match(worker,/"\/live-hub\.js"/);
assert.match(vercel,/"source": "\/live-hub\.html"/);
assert.match(vercel,/live-control\|live-view\|live-hub/);
assert.doesNotMatch(`${html}\n${client}\n${control}\n${viewerHtml}\n${viewer}`,/\bEPG\b/i,"el nombre interno no aparece en V353 LIVE");

console.log("PASS V353 CENTRO LIVE: 80 jugadores, Monitor General e Individual, compartir mundial, capitán único, privacidad y carga sin máximo fijo");
