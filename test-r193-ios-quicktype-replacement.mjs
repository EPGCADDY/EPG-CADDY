import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
assert.match(html,/data-draft-name="\$\{i\}" type="text" value="\$\{safeName\}" autocapitalize="words" autocorrect="on" spellcheck="true" enterkeyhint="next"/);
assert.doesNotMatch(html,/data-draft-name="\$\{i\}"[^>]*inputmode="text"|data-draft-name="\$\{i\}"[^>]*autocomplete="name"/);
assert.equal((html.match(/data-stableford-name="\d"[^>]*autocapitalize="words" autocorrect="on" spellcheck="true" enterkeyhint="next"/g)||[]).length,6);
assert.doesNotMatch(html,/data-stableford-name="\d"[^>]*(?:inputmode="text"|autocomplete="name")/);

const start=html.indexOf("function persistNativeRegistrationNameReplacement("),end=html.indexOf("function handleManualDraftInput(",start);
assert.ok(start>=0&&end>start,"Debe existir la captura diferida de sustituciones QuickType");
const rows=[{name:"",dirty:false}],calls={persist:0,reveal:0,validity:0},timers=[];
let beforeInput;
const control=new Function("manualDraftRows","persistDraftState","revealNextRegistrationSlot","updateGeneralSetupValidity","$","setTimeout",
 `${html.slice(start,end)};return persistNativeRegistrationNameReplacement`)(rows,()=>calls.persist++,()=>calls.reveal++,()=>calls.validity++,()=>({addEventListener(type,fn){if(type==="beforeinput")beforeInput=fn}}),fn=>timers.push(fn));
const input={value:"Mar",isConnected:true,dataset:{draftName:"0"},closest(selector){return selector==="[data-draft-name]"?this:null}};
beforeInput({target:input,inputType:"insertReplacementText"});
assert.equal(timers.length,1,"QuickType replacement must be captured after WebKit applies it");
input.value="María López";
timers[0]();
assert.equal(rows[0].name,"María López","The final native candidate replaces the draft value");
assert.equal(calls.persist,1,"The accepted candidate is persisted");
assert.equal(calls.reveal,1);assert.equal(calls.validity,1);
assert.equal(control(input),true);
console.log("PASS R193 QuickType: WebKit replacement commits the final suggested text to the persisted player draft");
