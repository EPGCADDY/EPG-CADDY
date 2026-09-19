// TEMPORARY LAB DIAGNOSTIC — remove after identifying failing test.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';

const report={ok:true,stage:"start",failures:[]};
function fail(stage,error){report.ok=false;report.stage=stage;report.failures.push({stage,name:error?.name||"Error",message:String(error?.message||error),stack:String(error?.stack||"").slice(0,5000)});}

try{
  const html=fs.readFileSync('index-grupal.html','utf8');
  report.stage="index";
  try{assert(!/getUserMedia|SpeechRecognition|MediaRecorder|\/api\/(?:universal-ai|voice-|session|research|golf-rules)/.test(html),'Mic/AI entry remains')}catch(e){fail("index-forbidden",e)}
  try{for(const m of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi))if(m[1].trim())new vm.Script(m[1])}catch(e){fail("inline-script",e)}
  try{for(const m of html.matchAll(/<script\b[^>]*src="\.\/([^"?]+)/gi))assert(fs.existsSync(m[1]),`Missing script ${m[1]}`)}catch(e){fail("external-script",e)}
  for(const file of ['device-closures.js','service-worker.js']){try{new vm.Script(fs.readFileSync(file,'utf8'))}catch(e){fail("syntax:"+file,e)}}
  const tests=['test-owner-invitation-ui.mjs','test-manual-no-assistant.mjs','test-manual-startup-sharing.mjs','test-device-closures.mjs','test-score-engine.mjs','test-round-closure.mjs','test-player-registry.js','test-stableford.mjs','test-stableford-manual.mjs','test-v398-manual-opening-hole.mjs','test-v306-match-play.mjs','test-v309-four-ball.mjs','test-v329-skins.mjs'];
  for(const test of tests){
    try{execFileSync(process.execPath,[test],{stdio:'pipe',encoding:'utf8'})}
    catch(e){fail("test:"+test,e);report.failures.at(-1).stdout=String(e?.stdout||"").slice(0,5000);report.failures.at(-1).stderr=String(e?.stderr||"").slice(0,5000)}
  }
}catch(e){fail("bootstrap",e)}
fs.writeFileSync('lab-build-diagnostic.json',JSON.stringify(report,null,2));
console.log('LAB_DIAGNOSTIC_WRITTEN',report.ok?'PASS':'FAIL',report.failures.map(x=>x.stage).join(','));
