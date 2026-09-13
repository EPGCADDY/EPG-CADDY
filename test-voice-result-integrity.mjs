import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html=fs.readFileSync('index-grupal.html','utf8');
const submit=html.slice(html.indexOf('async function submitAiUniversalText('),html.indexOf('async function continueConversationAfterTool('));
const answer=html.slice(html.indexOf('async function answerBrowserVoiceQuery('),html.indexOf('function scheduleBrowserVoiceTransportRetry('));
function fixture({audio=true,local=false,network=false,offline=false}={}){
 const elements={aiUniversalInput:{value:''},sendAiUniversal:{disabled:false}},history=[],events=[];
 const ctx=vm.createContext({AbortController,console,universalVoiceDeadline:async operation=>await operation,phase:'responding',aiUniversalTextBusy:false,aiUniversalTextAbortController:null,aiUniversalRulesMode:offline,aiUniversalHistory:history,AI_UNIVERSAL_HISTORY_LIMIT:10,voiceContext:'setup',
 $:id=>elements[id],aiUniversalRemember:(role,content)=>history.push({role,content}),routeAiUniversalAppText:()=>({handled:local,answer:'Local'}),aiUniversalSetState:state=>{ctx.state=state},setPrimaryVoiceMatrix:(state,context,message)=>{if(message)ctx.state=message},aiUniversalAppContext:()=>({}),window:{gscgApiUrl:x=>x},
 fetch:async()=>{if(network||offline)throw new Error('offline');return {ok:true,json:async()=>({ok:true,answer:'Roma',sources:[]})}},
 officialGolfRuleOfflineResult:()=>({answer:'Regla guardada',sources:[]}),renderCaddieSources(){},saveOfficialGolfRuleForOffline(){},
 speakAiUniversalText:async()=>{ctx.state=audio?'AUDIO INICIADO':'VOZ MASCULINA NO DISPONIBLE';return audio},reportVoiceHealth:event=>events.push(event)});
 vm.runInContext(submit+'\n'+answer,ctx);return{ctx,elements,history,events};
}
for(const route of ['remote','local','offline'])for(const audio of [false,true]){
 const f=fixture({audio,local:route==='local',offline:route==='offline'});
 const success=await vm.runInContext('answerBrowserVoiceQuery("setup","Capital de Italia")',f.ctx);
 assert.equal(success,audio);assert.equal(f.ctx.aiUniversalTextBusy,false);assert.equal(f.elements.sendAiUniversal.disabled,false);assert.equal(f.ctx.phase,'idle');
 assert.equal(f.events.includes('browser_fallback_query_answered'),audio);
 assert.equal(f.ctx.state,audio?'AUDIO INICIADO':'VOZ MASCULINA NO DISPONIBLE');
 assert.equal(f.history.length,2);console.log(`PASS ${route}: audio=${audio}, éxito=${success}, historial conservado y turno liberado`);
}
const f=fixture();for(let i=0;i<10;i++)assert.equal(await vm.runInContext('answerBrowserVoiceQuery("setup","Una pregunta más")',f.ctx),true);
assert.equal(f.history.length,20);console.log('PASS diez turnos secuenciales (API y audio simulados)');
const n=fixture({network:true});assert.equal(await vm.runInContext('answerBrowserVoiceQuery("setup","Una pregunta")',n.ctx),false);assert.equal(n.ctx.aiUniversalTextBusy,false);assert.equal(n.ctx.phase,'idle');assert.equal(n.ctx.state,'SERVICIO DE RESPUESTAS NO DISPONIBLE');console.log('PASS error de red conserva causa y libera turno');
