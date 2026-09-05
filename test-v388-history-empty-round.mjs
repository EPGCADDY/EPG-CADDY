import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const html=fs.readFileSync("index-grupal.html","utf8");
const source=html.slice(html.indexOf("function storedRoundMode"),html.indexOf("function readStoredRound"));
const context={result:null};
vm.createContext(context);
vm.runInContext(`${source};result={isRecoverableStoredRound,storedRoundHasAnyScore,storedRoundIsComplete}`,context);

const player=(name,holes={})=>({name,holes,activeFrom:1});
const empty={configured:true,provisional:false,mode:"general",players:[player("JAIME"),player("DIEGO"),player("JESSIE"),player("ALAN")]};
const active={...empty,players:[player("JAIME",{1:{gross:4}})]};
const complete={...empty,players:[player("JAIME",Object.fromEntries(Array.from({length:18},(_,i)=>[i+1,{gross:4}])))]};
assert.equal(context.result.isRecoverableStoredRound(empty),false,"una ronda sin scores no puede restaurarse");
assert.equal(context.result.isRecoverableStoredRound(active),true,"una ronda activa con score debe conservarse");
assert.equal(context.result.storedRoundIsComplete(active),false,"una ronda parcial no se archiva automáticamente");
assert.equal(context.result.storedRoundIsComplete(complete),true,"una ronda completa sí puede archivarse");
assert.match(html,/function archiveRoundSnapshot\(value\)\{if\(!storedRoundIsComplete\(value\)\)return false/);
assert.match(html,/function recoverStablefordRoundSeptember4\(\)[\s\S]*alreadyArchived[\s\S]*GSCRoundClosure\.closeSync\(recovered/);
assert.doesNotMatch(html,/recoveryPreviewHost/);
assert.doesNotMatch(html,/requestedByEmptyInstalledPreview/);
assert.match(html,/function openNewRoundDraft\(\)[\s\S]*clearDraftState\(\);draftPlayers=\[\]/);
console.log("PASS V388 · ronda vacía excluida, ronda activa preservada, archivo 18 hoyos y recuperación Stableford idempotente");
