import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import { normalizeLiveSnapshot, validateScope, validateConsent, tokenHash, newJoinCode } from "./api/live.js";

const require=createRequire(import.meta.url),control=require("./live-control.js"),viewer=require("./live-view.js"),read=file=>fs.readFileSync(file,"utf8");
const round={
  id:"round-live-0001",configured:true,provisional:false,course:"EL PULTÉ GOLF",mode:"general",createdAt:"2026-08-27T12:00:00Z",updatedAt:"2026-08-27T12:05:00Z",
  tournament:{name:"TORNEO JUNIOR"},sideGames:{skins:{enabled:true,unitValue:100}},weather:{latitude:14.6,longitude:-90.4},
  players:[
    {id:"player-live-0001",name:"JUNIOR UNO",handicap:12,tee:"Blanco",whatsapp:"55555555",registrationCode:"GSECRET",holes:{1:{hole:1,par:4,si:5,gross:5,strokes:1,net:4,diff:0,updatedAt:"2026-08-27T12:05:00Z"}}},
    {id:"player-live-0002",name:"JUNIOR DOS",handicap:8,tee:"Azul",email:"private@example.com",holes:{1:{hole:1,par:4,si:5,status:"x",updatedAt:"2026-08-27T12:05:01Z"}}}
  ]
};

const clientSnapshot=control.buildLiveSnapshot(round,{course:"EL PULTÉ GOLF",pars:Array(18).fill(4)});
assert.equal(clientSnapshot.appVersion,"V353");
assert.equal(clientSnapshot.players.length,2);
assert.equal(clientSnapshot.players[0].totals.gross,5);
assert.equal(clientSnapshot.players[1].holes[0].explicitX,true);
const serialized=JSON.stringify(clientSnapshot);
for(const forbidden of ["whatsapp","registrationCode","private@example.com","sideGames","latitude","longitude","weather","unitValue"])assert.ok(!serialized.includes(forbidden),`LIVE no puede filtrar ${forbidden}`);

const serverSnapshot=normalizeLiveSnapshot(clientSnapshot);
assert.equal(serverSnapshot.courseHoles.length,18);
assert.deepEqual(serverSnapshot.players.map(player=>player.name),["JUNIOR UNO","JUNIOR DOS"]);
assert.throws(()=>normalizeLiveSnapshot({...clientSnapshot,players:Array(7).fill(clientSnapshot.players[0]).map((player,index)=>({...player,id:`player-live-${1000+index}`}))}),/LIVE_INVALID_PLAYERS/);
assert.throws(()=>normalizeLiveSnapshot({...clientSnapshot,players:[clientSnapshot.players[0],{...clientSnapshot.players[1],id:clientSnapshot.players[0].id}]}),/LIVE_INVALID_PLAYERS/);
assert.throws(()=>normalizeLiveSnapshot({...clientSnapshot,players:[{...clientSnapshot.players[0],holes:Array(19).fill(clientSnapshot.players[0].holes[0])}]}),/LIVE_INVALID_HOLES/);

assert.deepEqual(validateScope(serverSnapshot,"player",["player-live-0001"]),{scope:"player",selectedPlayerIds:["player-live-0001"]});
assert.deepEqual(validateScope(serverSnapshot,"group",["player-live-0001","player-live-0002"]).selectedPlayerIds,["player-live-0001","player-live-0002"]);
assert.throws(()=>validateScope(serverSnapshot,"group",["player-live-0001"]),/LIVE_GROUP_CONSENT_REQUIRED/);
assert.equal(validateConsent({confirmed:true,playerIds:["player-live-0001"],confirmedAt:"2026-08-27T12:06:00Z"},["player-live-0001"]).confirmed,true);
assert.throws(()=>validateConsent({confirmed:false,playerIds:["player-live-0001"]},["player-live-0001"]),/LIVE_CONSENT_REQUIRED/);

const secret="A".repeat(43);assert.equal(tokenHash(secret).length,64);assert.notEqual(tokenHash(secret),secret);assert.match(newJoinCode(),/^[A-HJ-NP-Z2-9]{10}$/);
assert.deepEqual(viewer.parseLiveHash(`#stream=${secret}`),{kind:"stream",token:secret});
assert.deepEqual(viewer.parseLiveHash(`#tournament=${"B".repeat(43)}`),{kind:"tournament",token:"B".repeat(43)});
assert.equal(viewer.parseLiveHash("#stream=short"),null);

const index=read("index-grupal.html"),liveHtml=read("live.html"),liveControl=read("live-control.js"),liveView=read("live-view.js"),api=read("api/live.js"),schema=read("database/004_live_scorecards.sql"),vercel=read("vercel.json"),worker=read("service-worker.js");
assert.match(index,/V353-CENTRO-LIVE-GENERAL-INDIVIDUAL/);
assert.match(index,/window\.GSCLiveControl\?\.onRoundPersisted\(round\)/,"el escritor oficial publica LIVE");
assert.match(index,/<script src="\.\/live-control\.js"><\/script>/);
assert.match(liveHtml,/GOLF SCORE CARD GT\. LIVE/);
assert.match(liveHtml,/NO REQUIERE INSTALAR LA APLICACIÓN/);
assert.match(liveHtml,/Content-Security-Policy/);
assert.doesNotMatch(`${liveHtml}\n${liveControl}\n${liveView}`,/\bEPG\b/i,"el nombre interno no puede llegar al módulo público LIVE");
assert.doesNotMatch(liveView,/localStorage|sessionStorage|microphone|micrófono|audio/i,"el visor no toca tarjeta, almacenamiento ni audio");
assert.match(liveView,/action:"read"/);
assert.doesNotMatch(liveView,/action:"(?:publish|create_stream|revoke_stream)"/);
assert.match(liveControl,/root\.open\(hubUrl\(kind,token\),"_blank"/,"seguimiento bilateral abre el Centro Live en otra ventana");
assert.match(liveControl,/url\.origin!==root\.location\.origin/,"el seguidor sólo abre enlaces LIVE de esta aplicación");
assert.match(liveControl,/belongsToCurrentRound/,"un enlace de otra ronda debe revocarse antes de crear el nuevo");
assert.match(liveControl,/pendingSnapshot/);
assert.match(liveControl,/addEventListener\("online"/);
assert.match(api,/randomBytes\(32\)/);
assert.match(api,/viewer_token_hash/);
assert.match(api,/publisher_secret_hash/);
assert.match(api,/LIMIT \$\{limit\+1\}/);
assert.match(api,/nextCursor/);
assert.match(schema,/live_streams_tournament_page_idx/);
assert.doesNotMatch(schema,/CREATE\s+(?:OR\s+REPLACE\s+)?FUNCTION/i,"la migración debe ser compatible con el preparador seguro de Neon");
assert.match(api,/candidate\.selected_player_ids \? \(listed\.player->>'id'\)/,"cada publicación vuelve a filtrar el alcance autorizado");
assert.match(api,/FOR UPDATE/);
assert.match(api,/LIVE_PLAYER_SCOPE_MISMATCH/);
const publishSource=api.slice(api.indexOf("async function publish"),api.indexOf("async function revokeStream"));
assert.match(publishSource,/\$\{mutationId\}::text/,"Neon HTTP exige tipo explícito para mutationId dentro de jsonb_build_object");
assert.match(publishSource,/\$\{secretHash\}::char\(64\)/);
assert.match(publishSource,/\$\{expected\}::bigint/);
assert.doesNotMatch(publishSource,/\$\{(?:mutationId|secretHash|expected)\}(?!::)/,"ningún parámetro de publicación puede quedar con tipo indeterminado 42P18");
assert.doesNotMatch(schema,/CHECK\s*\([^)]*(?:group|player)[^)]*<=\s*\d+/i,"no debe existir máximo fijo de grupos o jugadores del torneo");
assert.match(vercel,/live-control\|live-view\|live-hub/);
assert.match(worker,/gscg-mobile-v353-live-hub/);
assert.match(worker,/"\/live-control\.js"/);

console.log("PASS V352 LIVE: permiso, privacidad, cola offline, visor separado y torneo paginado sin máximo fijo");
