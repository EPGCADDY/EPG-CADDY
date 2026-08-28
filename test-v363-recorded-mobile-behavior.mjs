import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import vm from "node:vm";

const html=readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const live=readFileSync(new URL("./live-control.js",import.meta.url),"utf8");

assert.match(html,/V363-RECORDED-MOBILE-BEHAVIOR-20260828/);
assert.match(html,/body\.gsc-setup-open \.gsc-live-launch/);
assert.match(html,/\.gsc-setup-open \.pwa-install-button/);
assert.match(html,/document\.body\?\.classList\.add\("gsc-setup-open"\)/);
assert.match(html,/standaloneApp\(\)\|\|blocked/);
assert.match(live,/padding:max\(8px,env\(safe-area-inset-top,0px\)\)/);
assert.match(live,/min-height:calc\(100dvh - env\(safe-area-inset-top,0px\) - env\(safe-area-inset-bottom,0px\) - 16px\)/);
assert.match(live,/classList\.add\("gsc-live-open"\)/);
assert.match(live,/classList\.remove\("gsc-live-open"\)/);

const sliceStart=html.indexOf("function clearBrowserVoiceStopGuardTimer");
const sliceEnd=html.indexOf("function scheduleBrowserVoiceFinalize",sliceStart);
assert.ok(sliceStart>0&&sliceEnd>sliceStart,"No se encontró el cierre protegido V363");
const implementation=html.slice(sliceStart,sliceEnd);
const state=[];
const sandbox={
  setTimeout,
  clearTimeout,
  BROWSER_VOICE_STOP_GUARD_MS:25,
  browserVoiceRecognition:null,
  browserVoiceStopping:false,
  browserVoiceStopGuardTimer:null,
  setPrimaryVoiceMatrix:(status,context)=>state.push(`${context}:${status}`),
  finalizeBrowserVoiceFallback:(recognition,context)=>{
    if(sandbox.browserVoiceRecognition!==recognition)return false;
    sandbox.browserVoiceRecognition=null;
    sandbox.browserVoiceStopping=false;
    sandbox.finalized=(sandbox.finalized||0)+1;
    state.push(`${context}:finalized`);
    return true;
  },
  finalized:0
};
vm.createContext(sandbox);
vm.runInContext(`${implementation}\nglobalThis.v363={clearBrowserVoiceStopGuardTimer,stopBrowserVoiceRecognitionSafely};`,sandbox);

const recognition={stopCalls:0,stop(){this.stopCalls++}};
sandbox.browserVoiceRecognition=recognition;
assert.equal(sandbox.v363.stopBrowserVoiceRecognitionSafely(recognition,"setup"),true);
assert.equal(recognition.stopCalls,1);
assert.deepEqual(state,["setup:responding"]);
await new Promise(resolve=>setTimeout(resolve,60));
assert.equal(sandbox.finalized,1,"El guard debe finalizar aunque Safari no emita onend");
assert.equal(sandbox.browserVoiceRecognition,null);
assert.deepEqual(state,["setup:responding","setup:finalized"]);

console.log("V363_RECORDED_MOBILE_BEHAVIOR PASS guards=1 modal_isolation=1 live_safe_area=1");
