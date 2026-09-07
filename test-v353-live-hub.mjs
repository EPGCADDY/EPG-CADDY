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

const demoRows=hub.buildLeaderboard(hub.demoTournamentStreams());
assert.equal(demoRows.length,67,"GENERAL muestra los 67 jugadores publicados");
const tiedDemo=demoRows.filter(item=>demoRows.some(other=>other!==item&&other.rank===item.rank));
assert.ok(tiedDemo.length>0&&tiedDemo.every(item=>item.rankLabel===`T${item.rank}`),"cada empate visible usa T antes de la posición");
assert.ok(demoRows.filter(item=>item.rank===34).every(item=>item.rankLabel==="T34"),"el empate reportado se muestra como T34");

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
let fivePlayers=hub.normalizeHubState(null);for(let index=1;index<=5;index++)fivePlayers=hub.addFollowToState(fivePlayers,{key:`stream-${index}:player-${index}`,kind:"player",streamId:`stream-${index}`,playerId:`player-${index}`,label:`SEGUIDO ${index}`,groupLabel:`GRUPO ${index}`});
assert.equal(fivePlayers.follows.length,5,"Mi Tablero conserva exactamente los cinco jugadores elegidos");
const demoStreams=hub.demoTournamentStreams(),demoPlayer=hub.tournamentPlayers(demoStreams).find(item=>item.name==="S.SENIOR 04");
const demoFollow=hub.addFollowToState(null,{key:demoPlayer.streamId+":"+demoPlayer.playerId,kind:"player",streamId:demoPlayer.streamId,playerId:demoPlayer.playerId,label:demoPlayer.name,groupLabel:demoPlayer.groupLabel});
const resolvedDemo=hub.resolveFollows(demoFollow,demoStreams,new Map());
assert.equal(resolvedDemo.length,1,"Mi Tablero recibe al jugador elegido en la demostración");
assert.equal(resolvedDemo[0].players[0].name,"S.SENIOR 04","el jugador elegido se muestra operativo y no como enlace no disponible");
const unrelatedTournament=new Map([["real-group",makeStream(99,2)]]),persistentDemo=hub.resolveFollows(demoFollow,hub.favoriteStreams(unrelatedTournament),new Map());
assert.equal(persistentDemo[0].players[0].name,"S.SENIOR 04","el jugador demo conserva su ronda al volver a TORNEO GUARDADO");

assert.deepEqual(hub.parseHubHash(`#general=${token("C")}`),{kind:"general",token:token("C")});
assert.deepEqual(hub.parseHubHash(`#stream=${token("D")}`),{kind:"stream",token:token("D")});
assert.deepEqual(hub.parseShareLink(`https://golf.example/live.html#tournament=${token("E")}`,"https://golf.example"),{kind:"general",token:token("E")});
assert.deepEqual(hub.parseShareLink(`https://golf.example/live-hub.html?shared=1#general=${token("E")}`,"https://golf.example"),{kind:"general",token:token("E")});
assert.deepEqual(hub.parseShareLink("https://golf.example/live-hub.html?shared=1&demo=1","https://golf.example"),{kind:"demo",token:""});
assert.deepEqual(hub.parseShareLink(`https://golf.example/live.html#stream=${token("F")}`,"https://golf.example"),{kind:"stream",token:token("F")});
assert.equal(hub.parseShareLink(`https://evil.example/live.html#stream=${token("F")}`,"https://golf.example"),null,"no se importan enlaces de otro origen");
assert.equal(hub.MAX_SAVED_TOURNAMENTS,5);
const migrated=hub.normalizeHubState({version:1,generalToken:token("A"),follows:[]});
assert.equal(migrated.version,2);assert.equal(migrated.tournaments.length,1);assert.equal(migrated.tournaments[0].token,token("A"));
let multi=hub.normalizeHubState(null);for(const letter of ["A","B","C","D","E"]){const saved=hub.upsertTournamentState(multi,token(letter),`TORNEO ${letter}`);assert.equal(saved.full,false);multi=saved.state}
assert.equal(multi.tournaments.length,5);const sixth=hub.upsertTournamentState(multi,token("F"),"TORNEO F");assert.equal(sixth.full,true);assert.equal(sixth.state.tournaments.length,5);
const removedTournament=hub.removeTournamentFromState(multi,token("C"));assert.equal(removedTournament.tournaments.length,4);assert.equal(removedTournament.tournaments.some(item=>item.token===token("C")),false);
assert.equal(hub.tournamentHubShareUrl(token("A"),"https://golf.example","https://golf.example/live-hub.html"),`https://golf.example/live-hub.html?shared=1#general=${token("A")}`);
assert.equal(hub.tournamentHubShareUrl("","https://golf.example","https://golf.example/live-hub.html",true),"https://golf.example/live-hub.html?shared=1&demo=1");
assert.equal(hub.tournamentHubOpenUrl("","https://golf.example","https://golf.example/live-hub.html?_vercel_share=ok",true),"https://golf.example/live-hub.html?_vercel_share=ok&demo=1");
const phoneOne=makeStream(50,1),phoneTwo=makeStream(50,1);
phoneOne.id="phone-one";phoneTwo.id="phone-two";phoneOne.groupLabel=phoneTwo.groupLabel="GRUPO 50";
phoneOne.snapshot.players[0].name=phoneTwo.snapshot.players[0].name="JUGADOR COMPARTIDO";
phoneOne.snapshot.players[0].holes=[{hole:1,par:4,gross:4,net:3,relativeToPar:-1}];
phoneTwo.snapshot.players[0].holes=[{hole:1,par:4,gross:5,net:4,relativeToPar:0},{hole:2,par:4,gross:4,net:3,relativeToPar:-1}];
const consolidated=hub.tournamentPlayers([phoneOne,phoneTwo]);
assert.equal(consolidated.length,1,"dos teléfonos del mismo grupo no duplican al jugador");
assert.equal(consolidated[0].holes,2,"cada hoyo se computa una sola vez y los hoyos nuevos sí se incorporan");
assert.equal(consolidated[0].gross,8,"el segundo cómputo distinto del hoyo 1 no reemplaza al primero");
assert.equal(consolidated[0].conflicts,1,"la diferencia queda marcada para chequeo cruzado");
assert.equal(groupKey("  Grupo   001  "),"grupo 001");
assert.equal(groupKey("GRUPO 001"),"grupo 001");

const index=read("index-grupal.html"),html=read("live-hub.html"),client=read("live-hub.js"),control=read("live-control.js"),viewer=read("live-view.js"),viewerHtml=read("live.html"),api=read("api/live.js"),worker=read("service-worker.js"),vercel=read("vercel.json");
assert.match(client,/activeMonitor="general"/);
assert.match(client,/activeMonitor=individual\?"individual":"general"/,"el selector guarda el monitor activo");
assert.match(client,/portal\|\|activeMonitor==="individual"/,"cada refresco conserva Mi Tablero visible");
assert.match(client,/resolved=resolveFollows\(state,streams,externalStreams\)/,"Mi Tablero resuelve contra los jugadores visibles, incluida la demostración");
assert.match(index,/V363-RECORDED-MOBILE-BEHAVIOR-20260828/);
assert.match(html,/TORNEO LIVE/);
assert.match(html,/JUGADORES EN VIVO/);
assert.match(html,/MI TABLERO/);
assert.match(html,/BUSCA · ELIGE · MIRA/);
assert.match(html,/NOMBRE DEL JUGADOR/);
assert.match(html,/MÁS OPCIONES/);
assert.match(html,/AGREGAR JUGADOR EXTERNO/);
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
assert.match(control,/VER TORNEO LIVE/);
assert.match(control,/COMPARTIR LIVE · MUNDIAL/);
assert.match(control,/WHATSAPP, MENSAJES, CORREO, AIRDROP, X O CUALQUIER APP/);
assert.match(control,/NOMBRE O NÚMERO DEL GRUPO · OBLIGATORIO/);
assert.match(api,/LIVE_GROUP_LABEL_REQUIRED/);
assert.doesNotMatch(`${control}\n${api}`,/CAPITÁN|LIVE_GROUP_ALREADY_PUBLISHING/i,"varios teléfonos del mismo grupo pueden alimentar y verificar el torneo");
const joinSource=api.slice(api.indexOf("async function joinTournament"),api.indexOf("async function leaveTournament"));
assert.match(joinSource,/WITH tournament AS MATERIALIZED/);
assert.match(joinSource,/FOR UPDATE/,"el torneo se bloquea mientras conecta cada scorecard");
assert.match(joinSource,/decision\.outcome_code='APPLY'/,"la unión se aplica dentro de la misma sentencia atómica");
assert.match(worker,/gscg-mobile-v363-recorded-mobile-behavior/);
assert.match(worker,/"\/live-hub\.html"/);
assert.match(worker,/"\/live-hub\.js"/);
assert.match(vercel,/"source"\s*:\s*"\/live-hub\.html"/);
assert.match(vercel,/live-control\|live-view\|live-hub/);
assert.doesNotMatch(`${html}\n${client}\n${control}\n${viewerHtml}\n${viewer}`,/\bEPG\b/i,"el nombre interno no aparece en V353 LIVE");

console.log("PASS V353 CENTRO LIVE: 80 jugadores, hasta 5 torneos, multiteléfono sin doble cómputo, privacidad y carga sin máximo fijo");
