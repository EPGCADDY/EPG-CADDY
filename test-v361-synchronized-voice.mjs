import assert from "node:assert/strict";
import fs from "node:fs";
import {sanitizeVoiceHealth} from "./api/voice-health.js";

const html=fs.readFileSync("candidate-index-grupal.html","utf8");
const audit=fs.readFileSync("audit-project.mjs","utf8");

assert.match(html,/gscg-build" content="V363-RECORDED-MOBILE-BEHAVIOR-20260828"/);
assert.match(html,/gscg-progressive-voice" content="V363-IMMEDIATE-PERSISTENT-SPOKEN-CLOSURE-20260828"/);
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

const preferredAt=html.indexOf("function preferredApprovedFemaleVoice");
const preferredEnd=html.indexOf("\nfunction resumeBrowserVoiceConversationAfterSpeech",preferredAt);
assert.ok(preferredAt>0&&preferredEnd>preferredAt);
let waitedMs=0;
const approved={name:"Mónica",lang:"es-GT",voiceURI:"Monica"};
const voiceHelpers=new Function("window",`${html.slice(preferredAt,preferredEnd)};return {preferredApprovedFemaleVoice,waitForPreferredApprovedFemaleVoice}`)({GSCApprovedVoice:{select:()=>approved,wait:ms=>{waitedMs=ms;return Promise.resolve(approved)}}});
assert.equal(voiceHelpers.preferredApprovedFemaleVoice(),approved);
assert.equal(await voiceHelpers.waitForPreferredApprovedFemaleVoice(),approved);
assert.equal(waitedMs,4000);

for(const contract of ["CEDAR_SPEECH_RETRY_MS=10*60*1000","Date.now()<cedarSpeechServerBlockedUntil","response.status===429||response.status===503","await speakAiUniversalApprovedFemaleVoice(clean,{resumeConversation})",'submitAiUniversalText(clean,{voiceOnly:true})','aiUniversalRemember("user",query,[],{visible:!voiceOnly})'])assert.ok(html.includes(contract),contract);
assert.deepEqual(sanitizeVoiceHealth({event:"browser_fallback_round_progressive",build:"V361",context:"round",entryCount:3,transcript:"PRIVADO",player:"PRIVADO"}),{event:"browser_fallback_round_progressive",build:"V361",context:"round",turn:0,elapsedMs:0,entryCount:3});

console.log("PASS V361 · parser natural + score persistente + voz femenina aprobada con espera de 4 s + voz sin texto");
