import assert from "node:assert/strict";
import fs from "node:fs";
import {sanitizeVoiceHealth} from "./api/voice-health.js";

const html=fs.readFileSync("index-grupal.html","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");
const audit=fs.readFileSync("audit-project.mjs","utf8");

assert.match(html,/gscg-build" content="V363-RECORDED-MOBILE-BEHAVIOR-20260828"/);
assert.match(html,/gscg-progressive-voice" content="V363-IMMEDIATE-PERSISTENT-SPOKEN-CLOSURE-20260828"/);
assert.match(worker,/CACHE_NAME="gscg-mobile-v363-recorded-mobile-behavior(?:-v364-explicit-new-round-entry)?(?:-v365-iphone-playback)?"/);
for(const test of ["test-v357-synchronized-progressive-voice.mjs","test-v359-ios-score-parser-recovery.mjs","test-v361-synchronized-voice.mjs"])assert.ok(audit.includes(test),test);

const progressAt=html.indexOf("function applyBrowserVoiceProgressiveScore");
const progressEnd=html.indexOf("\nfunction sealBrowserVoiceProgress",progressAt);
assert.ok(progressAt>0&&progressEnd>progressAt);
const progressSource=html.slice(progressAt,progressEnd);
for(const contract of ["applyLiveRoundTranscript(browserVoiceItemId,clean)","persist();render()","browser_fallback_round_progressive","HOYO ${hole} REGISTRADO · ESCUCHANDO"])assert.ok(progressSource.includes(contract),contract);
assert.ok(progressSource.indexOf("applyLiveRoundTranscript")<progressSource.indexOf("persist();render()"));

const committed=new Map([["turn_1",new Map([["p1:1","4"]])]]),events=[],matrices=[];
let persisted=0,rendered=0;
const applyProgress=new Function("roundLiveCommitted","applyLiveRoundTranscript","persist","render","reportVoiceHealth","setPrimaryVoiceMatrix","isGeneralConversationIntent",`
  let browserVoiceItemId="turn_1",browserVoiceAppliedEntryCount=0;
  ${progressSource}
  return applyBrowserVoiceProgressiveScore;
`)(committed,()=>({applied:1,entries:[{hole:1}]}),()=>persisted++,()=>rendered++,(event,detail)=>events.push({event,detail}),(...args)=>matrices.push(args),()=>false);
assert.equal(applyProgress("round","hoyo uno cuatro hoyo dos").applied,1);
assert.equal(persisted,1);assert.equal(rendered,1);
assert.deepEqual(events,[{event:"browser_fallback_round_progressive",detail:{entryCount:1}}]);
assert.match(matrices.at(-1)[2],/HOYO 1 REGISTRADO · ESCUCHANDO/);

const preferredAt=html.indexOf("function preferredMaleBrowserVoice");
const preferredEnd=html.indexOf("\nasync function speakAiUniversalMaleBrowserFallback",preferredAt);
assert.ok(preferredAt>0&&preferredEnd>preferredAt);
let voices=[],voiceChanged=null;
const speechSynthesis={getVoices:()=>voices,addEventListener:(event,handler)=>{if(event==="voiceschanged")voiceChanged=handler},removeEventListener:(event,handler)=>{if(event==="voiceschanged"&&voiceChanged===handler)voiceChanged=null}};
const waitForVoice=new Function("window",`${html.slice(preferredAt,preferredEnd)};return waitForPreferredMaleBrowserVoice`)({speechSynthesis});
const delayed=waitForVoice("es-GT",200);voices=[{name:"Mónica",lang:"es-ES",voiceURI:"Monica"},{name:"Jorge",lang:"es-MX",voiceURI:"Jorge"}];voiceChanged?.();
assert.equal((await delayed)?.name,"Jorge");

for(const contract of ["CEDAR_SPEECH_RETRY_MS=10*60*1000","Date.now()<cedarSpeechServerBlockedUntil","response.status===429||response.status===503","await speakAiUniversalMaleBrowserFallback(clean)",'submitAiUniversalText(clean,{voiceOnly:true})','aiUniversalRemember("user",query,[],{visible:!voiceOnly})'])assert.ok(html.includes(contract),contract);
assert.deepEqual(sanitizeVoiceHealth({event:"browser_fallback_round_progressive",build:"V361",context:"round",entryCount:3,transcript:"PRIVADO",player:"PRIVADO"}),{event:"browser_fallback_round_progressive",build:"V361",context:"round",turn:0,elapsedMs:0,entryCount:3});

console.log("PASS V361 · parser natural + score visible y persistente inmediato + locutor masculino recuperable + voz sin texto");
