import assert from "node:assert/strict";
import fs from "node:fs";
import {sanitizeVoiceHealth} from "./api/voice-health.js";

const html=fs.readFileSync("index-grupal.html","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");
const audit=fs.readFileSync("audit-project.mjs","utf8");

assert.match(html,/gscg-build" content="V359-PROGRESSIVE-UNIVERSAL-VOICE-20260828"/);
assert.match(worker,/CACHE_NAME="gscg-mobile-v359-progressive-universal-voice"/);
assert.match(audit,/test-v359-progressive-universal-voice\.mjs/);

const resultStart=html.indexOf("recognition.onresult=event=>");
const resultEnd=html.indexOf("\n  recognition.onerror=",resultStart);
assert.ok(resultStart>0&&resultEnd>resultStart,"Falta el evento progresivo del micrófono");
const resultSource=html.slice(resultStart,resultEnd);
assert.ok(resultSource.indexOf("applyProgressiveBrowserVoiceRoundTranscript(browserVoiceCombinedTranscript())")<resultSource.indexOf("scheduleBrowserVoiceFinalize(recognition,context)"),"Cada score debe escribirse antes de esperar el silencio final");
assert.match(html,/recognition\.continuous=true/);
assert.match(html,/browserVoiceItemId=`browser_\$\{Date\.now\(\)\}_\$\{Math\.random\(\)\.toString\(36\)\.slice\(2,8\)\}`/);
assert.match(html,/selection\.ambiguous\)rollbackBrowserVoiceRoundItem\(\)/);
assert.match(html,/HOYO \$\{hole\} REGISTRADO · ESCUCHANDO/);

const progressiveStart=html.indexOf("function applyProgressiveBrowserVoiceRoundTranscript");
const progressiveEnd=html.indexOf("\nfunction finalizeBrowserVoiceFallback",progressiveStart);
assert.ok(progressiveStart>0&&progressiveEnd>progressiveStart);
const progressiveSource=html.slice(progressiveStart,progressiveEnd);
const committed=new Map([["turn_1",new Map([["p1:1","4"]])]]),events=[],matrices=[];
let persisted=0,rendered=0;
const progressive=new Function("roundLiveCommitted","applyLiveRoundTranscript","persist","render","reportVoiceHealth","setPrimaryVoiceMatrix","isGeneralConversationIntent",`
  let browserVoiceItemId="turn_1",browserVoiceAppliedEntryCount=0;
  ${progressiveSource}
  return applyProgressiveBrowserVoiceRoundTranscript;
`)(committed,()=>({handled:false,applied:1,entries:[{hole:1}]}),()=>persisted++,()=>rendered++,(event,detail)=>events.push({event,detail}),(...args)=>matrices.push(args),()=>false);
const applied=progressive("hoyo uno cuatro hoyo dos");
assert.equal(applied.applied,1);
assert.equal(persisted,1,"El score progresivo debe quedar guardado inmediatamente");
assert.equal(rendered,1,"El score progresivo debe aparecer inmediatamente");
assert.deepEqual(events,[{event:"browser_fallback_round_progressive",detail:{entryCount:1}}]);
assert.match(matrices.at(-1)[2],/HOYO 1 REGISTRADO · ESCUCHANDO/);

const preferredStart=html.indexOf("function preferredMaleBrowserVoice");
const preferredEnd=html.indexOf("\nasync function speakAiUniversalMaleBrowserFallback",preferredStart);
assert.ok(preferredStart>0&&preferredEnd>preferredStart);
let voices=[],voiceChanged=null;
const speechSynthesis={
  getVoices:()=>voices,
  addEventListener:(event,handler)=>{if(event==="voiceschanged")voiceChanged=handler},
  removeEventListener:(event,handler)=>{if(event==="voiceschanged"&&voiceChanged===handler)voiceChanged=null},
};
const waitForVoice=new Function("window",`${html.slice(preferredStart,preferredEnd)};return waitForPreferredMaleBrowserVoice`)({speechSynthesis});
const delayed=waitForVoice("es-GT",200);
voices=[{name:"Mónica",lang:"es-ES",voiceURI:"Monica"},{name:"Jorge",lang:"es-MX",voiceURI:"Jorge"}];voiceChanged?.();
assert.equal((await delayed)?.name,"Jorge");
for(const contract of [
  "CEDAR_SPEECH_RETRY_MS=10*60*1000",
  "Date.now()<cedarSpeechServerBlockedUntil",
  "response.status===429||response.status===503",
  "await speakAiUniversalMaleBrowserFallback(clean)",
  'submitAiUniversalText(clean,{voiceOnly:true})',
  'aiUniversalRemember("user",query,[],{visible:!voiceOnly})',
  "function parseSpokenHoleNumber",
  '"golpe","golpes"',
  "if(directHome&&!sfEmergency&&!demoControlManual&&!round.configured)openNewRoundDraft()",
])assert.ok(html.includes(contract),`Falta contrato V359: ${contract}`);

assert.deepEqual(sanitizeVoiceHealth({event:"browser_fallback_round_progressive",build:"V359",context:"round",entryCount:3,transcript:"PRIVADO",player:"PRIVADO"}),{event:"browser_fallback_round_progressive",build:"V359",context:"round",turn:0,elapsedMs:0,entryCount:3});

console.log("PASS V359 · scores consecutivos aparecen y se guardan al instante · voz masculina recuperable · conversación oculta · ronda continua");
