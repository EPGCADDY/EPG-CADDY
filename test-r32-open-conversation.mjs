import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const html=fs.readFileSync('index-grupal.html','utf8');
const section=(from,to)=>html.slice(html.indexOf(from),html.indexOf(to,html.indexOf(from)));
const definitions=html.match(/^const GENERAL_CONVERSATION_CUE=.*$/m)[0]+'\n'+html.match(/^const GENERAL_QUESTION_START=.*$/m)[0];
const normalizeSource=html.match(/^function normalizeSpeech\(.*$/m)[0];
const dispatched=[],states=[],events=[];
const env=vm.createContext({
  voiceContext:'setup',phase:'idle',aiUniversalRulesMode:false,
  setPrimaryVoiceMatrix:(...args)=>states.push(args),aiUniversalSetState:()=>{},
  aiUniversalRemember:()=>{},reportVoiceHealth:(event)=>events.push(event),
  parseSetupTranscript:()=>({ok:false}),applySetupChanges:()=>({ok:true}),
  renderDraft:()=>{},resetSetupCapture:()=>{},
  parseRoundScoreTranscript:()=>({ok:false}),aiUniversalLooksLikeScoreOrder:()=>false,
  routeAiUniversalAppText:()=>({handled:false}),
  answerBrowserVoiceQuery:async(context,query)=>{dispatched.push({context,query});return true},
  console
});
vm.runInContext(normalizeSource+'\n'+definitions+'\n'+
  html.match(/^function isGeneralConversationIntent\(.*$/m)[0]+'\n'+
  section('function aiUniversalLooksLikeSetupOrder(', '\nfunction aiUniversalLooksLikeScoreOrder(')+'\n'+
  section('async function processBrowserVoiceTranscript(', '\nasync function answerBrowserVoiceQuery('),env);
const questions=[
 'Qué tal funciona el retinol para la crema facial',
 'Cuál es la mejor manera de hidratar un cincho de cuero que se está rajando su piel?',
 'Cada cuanto retoñen, las orquídeas en maceta',
 '¿Y si me arde después de ponérmela?',
 '¿Y si se está pelando como una capita de plástico?',
 'La mía tiene hojas verdes pero lleva un año sin flores. ¿Qué reviso primero?',
 'Si una moneda justa ha caído cara cinco veces seguidas, ¿ahora es más probable que salga cruz?',
 'Si algo costaba 100, bajó veinte por ciento y luego subió veinte por ciento, ¿regresó al precio inicial?',
 '¿Por qué hay dos mareas altas al día si sólo tenemos una Luna?'
];
for(const context of ['setup','round'])for(const query of questions){
  assert.equal(await env.processBrowserVoiceTranscript(context,query),true);
  assert.deepEqual(dispatched.at(-1),{context,query});
}
const before=dispatched.length;
assert.equal(await env.processBrowserVoiceTranscript('setup','Agrega jugador handicap blancas'),false);
assert.equal(dispatched.length,before,'Una orden explícita de registro incompleta debe conservar su error');
env.parseSetupTranscript=()=>({ok:true,changes:[{name:'PRUEBA',handicap:14,tee:'Blanco'}]});
assert.equal(await env.processBrowserVoiceTranscript('setup','PRUEBA catorce blancas'),true);
assert.equal(dispatched.length,before,'El registro válido debe permanecer local');
console.log('PASS R32 · 18 rutas de preguntas/repreguntas; registro válido local y registro explícito incompleto protegido');

const elements=new Map();
const element=id=>{if(!elements.has(id))elements.set(id,{value:'',disabled:false,focus(){}});return elements.get(id)};
const history=[];let delivered=false;
const apiEnv=vm.createContext({
  $:element,aiUniversalTextBusy:false,aiUniversalRulesMode:false,
  aiUniversalTextAbortController:null,aiUniversalHistory:history,AI_UNIVERSAL_HISTORY_LIMIT:80,
  voiceContext:'setup',AbortController,console,
  aiUniversalRemember:(role,content)=>history.push({role,content}),
  routeAiUniversalAppText:()=>({handled:false}),
  aiUniversalSetState:()=>{},setPrimaryVoiceMatrix:(...args)=>states.push(args),
  window:{gscgApiUrl:path=>path},aiUniversalAppContext:()=>({}),
  fetch:async()=>({ok:true,status:200,json:async()=>({ok:true,answer:'Respuesta de prueba',sources:[]})}),
  speakAiUniversalText:async()=>delivered,
  reportVoiceHealth:event=>events.push(event),phase:'idle'
});
vm.runInContext(section('async function submitAiUniversalText(', '\nasync function continueConversationAfterTool(')+'\n'+
  section('async function answerBrowserVoiceQuery(', '\nfunction scheduleBrowserVoiceTransportRetry('),apiEnv);
events.length=0;
assert.equal(await apiEnv.answerBrowserVoiceQuery('setup','Pregunta de prueba'),false);
assert.equal(events.includes('browser_fallback_query_answered'),false,'Un fallo de audio no puede contarse como respuesta audible');
assert.equal(events.includes('browser_fallback_query_failed'),true);
assert.equal(apiEnv.aiUniversalTextBusy,false);
delivered=true;
assert.equal(await apiEnv.answerBrowserVoiceQuery('setup','Otra pregunta'),true);
assert.equal(events.includes('browser_fallback_query_answered'),true);
apiEnv.routeAiUniversalAppText=()=>({handled:true,answer:'Ayuda de la aplicación'});
delivered=false;
assert.equal(await apiEnv.submitAiUniversalText('Pregunta local',{voiceOnly:true}),false);
assert.equal(await apiEnv.submitAiUniversalText('Pregunta escrita',{voiceOnly:false}),true,'El modo escrito no depende de audio');
console.log('PASS R32 · fallo de audio remoto/local propagado; texto independiente y estado ocupado liberado');

const released=[];
const player={pause:()=>released.push('pause'),currentTime:5,onplay(){},onended(){},onerror(){},removeAttribute:key=>released.push(key),load:()=>released.push('load')};
const audioEnv=vm.createContext({aiUniversalTtsObjectUrl:'blob:old',aiUniversalTtsAudio:player,aiUniversalSpeechPrimer:player,URL:{revokeObjectURL:url=>released.push(url)}});
vm.runInContext(section('function releaseAiUniversalPlaybackForListening(', '\nfunction ',),audioEnv);
assert.equal(audioEnv.releaseAiUniversalPlaybackForListening(),true);
assert.equal(player.onended,null);assert.equal(player.onerror,null);
assert.equal(audioEnv.aiUniversalTtsObjectUrl,'');assert.equal(audioEnv.aiUniversalSpeechPrimer,null);
assert.deepEqual(released,['pause','src','load','blob:old']);
console.log('PASS R32 · audio previo liberado sin callbacks antes de volver a escuchar');
