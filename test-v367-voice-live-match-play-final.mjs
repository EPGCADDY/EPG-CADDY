import assert from "node:assert/strict";
import fs from "node:fs";
import {jsonSafe,publicStream,readStream} from "./api/live.js";

const read=file=>fs.readFileSync(file,"utf8");
const html=read("index-grupal.html"),live=read("api/live.js"),health=read("api/voice-health.js"),worker=read("service-worker.js");

assert.match(html,/V365-ACTIVE-ROUND-RECOVERY-20260828/);
assert.match(html,/V366-PRINCIPAL-ENTRY-RECOVERY-20260828/);
assert.match(html,/V367-VOICE-LIVE-MATCH-PLAY-20260828/);
assert.match(html,/function isRecoverableStoredRound[\s\S]*?value\.players\.length>=1/);

const voiceQuery=html.slice(html.indexOf("async function answerBrowserVoiceQuery"),html.indexOf("function scheduleBrowserVoiceTransportRetry"));
const universalButton=html.slice(html.indexOf("function openAiUniversalAndListen"),html.indexOf('if(window.PointerEvent)$("openAiUniversal")'));
assert.doesNotMatch(voiceQuery,/openAiUniversalPanel/);
assert.doesNotMatch(universalButton,/openAiUniversalPanel/);
assert.match(voiceQuery,/submitAiUniversalText\(clean,\{voiceOnly:true\}\)/);
assert.match(html,/function playAiUniversalServerAudio[\s\S]*?player\.onended[\s\S]*?browser_fallback_speech_completed/);
assert.match(html,/async function speakAiUniversalMaleBrowserFallback[\s\S]*?utterance\.onend[\s\S]*?browser_fallback_speech_completed/);
assert.match(html,/transportFailure==="audio_capture"[\s\S]*?skipBrowserFallback:true/);
assert.match(html,/async function toggleVoice\(context,desiredTurnProfile=REALTIME_TURN_PROFILE_OPERATIONAL\)[\s\S]*?const\{skipBrowserFallback=false\}=arguments\[2\]\|\|\{\}/);
assert.match(health,/browser_fallback_speech_completed/);
assert.match(html,/segmentSpeech\("Primera vuelta\.",FRONT\)/);
assert.match(html,/segmentSpeech\("Segunda vuelta\.",BACK\)/);
assert.match(html,/segmentSpeech\("Ronda completa\.",ALL\)/);
assert.match(html,/const ACCUMULATED_QUERY_MATRIX=\["acumulado"/);
assert.match(html,/function teamMatchSegmentReport\(title,holes\)/);

assert.match(live,/viewer_token_hash=\$\{hash\}::char\(64\)/);
assert.match(live,/body\.sinceRevision!==null&&body\.sinceRevision!==undefined/);
assert.match(live,/function jsonSafe/);
const safe=jsonSafe({revision:1n,updatedAt:new Date("2026-08-28T20:00:00Z")});
assert.deepEqual(safe,{revision:"1",updatedAt:"2026-08-28T20:00:00.000Z"});
const row={id:"00000000-0000-4000-8000-000000000001",scope:"group",group_label:"MATCH PLAY",status:"active",revision:1n,expires_at:new Date("2026-08-29T20:00:00Z"),updated_at:new Date("2026-08-28T20:00:00Z"),current_snapshot:{mode:"match_play",players:[{name:"JAIME"}]}};
const followerPayloads=Array.from({length:3},()=>JSON.parse(JSON.stringify(publicStream(row))));
assert.equal(followerPayloads.length,3);
for(const payload of followerPayloads){assert.equal(payload.revision,1);assert.equal(payload.snapshot.mode,"match_play");assert.equal(payload.snapshot.players[0].name,"JAIME")}
const viewerToken="A".repeat(43);
for(let reader=0;reader<3;reader++){
  const sql=async(strings,...values)=>{
    const query=String.raw({raw:strings},...values.map(()=>"?"));
    if(query.includes("INSERT INTO live_rate_limits"))return[{request_count:1}];
    if(query.includes("FROM live_streams WHERE viewer_token_hash"))return[row];
    throw new Error(`UNEXPECTED_SQL_${reader}`);
  };
  const response=await readStream(sql,{headers:{"x-forwarded-for":`10.0.0.${reader+1}`}}, {sinceRevision:null},viewerToken);
  assert.equal(response.ok,true);assert.equal(response.unchanged,undefined);assert.equal(response.stream.revision,1);assert.equal(response.stream.snapshot.mode,"match_play");
  assert.doesNotThrow(()=>JSON.stringify(response));
}

assert.match(worker,/v367-voice-live-match-play/);
console.log("PASS V367 · inicio hablado, registro/uno-multi hoyos, Universal sin pantalla, audio completo, recuperación directa y LIVE para tres seguidores Match Play");
