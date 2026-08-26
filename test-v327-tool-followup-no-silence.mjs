import assert from "node:assert/strict";
import fs from "node:fs";
import voiceHealthHandler,{sanitizeVoiceHealth} from "./api/voice-health.js";
import {summarizeTrafficRoute} from "./api/_lib/traffic.js";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const worker=fs.readFileSync(new URL("./service-worker.js",import.meta.url),"utf8");

assert.match(html,/gscg-build" content="V327-TOOL-FOLLOWUP-NO-SILENCE-20260826"/);
assert.match(worker,/gscg-mobile-v327-tool-followup-no-silence/);
const script=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
assert.doesNotThrow(()=>new Function(script),"El JavaScript V327 debe compilar completo");

const helperStart=html.indexOf("function conversationToolStopIsPreFollowup");
const helperEnd=html.indexOf("\nfunction markConversationFollowupAudioStarted",helperStart);
const stopHelper=new Function(`${html.slice(helperStart,helperEnd)};return conversationToolStopIsPreFollowup`)();
const transition={sourceResponseId:"source",followupResponseId:null,followupAudioStarted:false};
assert.equal(stopHelper("source",transition),true);
assert.equal(stopHelper(null,transition),true);
transition.followupResponseId="followup";
for(let lateStop=1;lateStop<=250;lateStop++)assert.equal(stopHelper(null,transition),true,`Cierre tardío ${lateStop} apagó el audio final antes de empezar`);
transition.followupAudioStarted=true;
assert.equal(stopHelper(null,transition),false,"El cierre final debe aceptarse después del inicio de audio");
assert.equal(stopHelper("followup",transition),false);
assert.equal(stopHelper("unrelated",transition),false);

for(const order of ["source-stop-before-tool","source-stop-after-followup-created","source-stop-with-id-after-followup"]){
  for(let turn=1;turn<=100;turn++){
    const state={sourceResponseId:`source-${turn}`,followupResponseId:null,followupAudioStarted:false,authorization:true};
    if(order==="source-stop-before-tool")assert.equal(stopHelper(null,state),true);
    state.followupResponseId=`followup-${turn}`;
    if(order==="source-stop-after-followup-created")assert.equal(stopHelper(null,state),true);
    if(order==="source-stop-with-id-after-followup")assert.equal(stopHelper(state.sourceResponseId,state),true);
    state.followupAudioStarted=true;
    if(!stopHelper(null,state))state.authorization=false;
    assert.equal(state.authorization,false,`Turno ${turn} no cerró después del audio final`);
  }
}

const speechStopped=html.slice(html.indexOf('if(e.type==="input_audio_buffer.speech_stopped")'),html.indexOf('if(e.type==="conversation.item.input_audio_transcription.completed"&&stopMonitorActive'));
assert.match(speechStopped,/armConversationInputStall\(\)/,"La vigilancia debe seguir activa hasta recibir transcripción");
assert.doesNotMatch(speechStopped,/clearConversationInputStall\(\)/,"speech_stopped no puede desarmar prematuramente la vigilancia");

const audioStarted=html.slice(html.indexOf('if((e.type==="output_audio_buffer.started"'),html.indexOf('if((e.type==="response.output_audio_transcript.delta"'));
assert.match(audioStarted,/markConversationFollowupAudioStarted/);
assert.match(audioStarted,/armConversationPlaybackStall\(\)/);
assert.doesNotMatch(audioStarted,/clearConversationResponseStall\(\)/,"El audio iniciado aún necesita vigilancia hasta stopped");

const audioStopped=html.slice(html.indexOf('if(e.type==="output_audio_buffer.stopped")'),html.indexOf('if(e.type==="output_audio_buffer.cleared")'));
assert.ok(audioStopped.indexOf("conversationToolStopIsPreFollowup")<audioStopped.indexOf("clearConversationResponseStall()"),"Un stop viejo no puede cancelar el watchdog de la respuesta nueva");
assert.match(audioStopped,/reportVoiceHealth\("response_stopped"/);

const toolBridge=html.slice(html.indexOf("async function continueConversationAfterTool"),html.indexOf("\nfunction speakConversation",html.indexOf("async function continueConversationAfterTool")));
assert.match(toolBridge,/tool_transport_recovered/);
assert.match(toolBridge,/recoverStalledConversation\("LA CONSULTA TERMINÓ, PERO LA VOZ SE INTERRUMPIÓ/);
assert.match(html,/Si el destino es un fragmento ambiguo/);
assert.match(html,/haz solamente una pregunta breve para pedir nombre completo, zona o municipio/);

const unresolved=summarizeTrafficRoute({routes:[]},{originLabel:"El Pulté Golf",destinationLabel:"Concepción"});
assert.equal(unresolved.ok,false);
assert.equal(unresolved.needsDestinationClarification,true);
assert.match(unresolved.message,/nombre completo, zona o municipio/i);

const sanitized=sanitizeVoiceHealth({
  event:"tool_ready",build:"V327<script>",context:"round",turn:12.2,elapsedMs:190_000,tool:"get_live_traffic",
  query:"persona conocida en Colima",transcript:"dato privado",latitude:14.6,longitude:-90.5,apiKey:"secreto"
});
assert.deepEqual(sanitized,{event:"tool_ready",build:"V327script",context:"round",turn:12,elapsedMs:180000,tool:"get_live_traffic"});
assert.doesNotMatch(JSON.stringify(sanitized),/Colima|privado|latitude|longitude|secreto/);
assert.equal(sanitizeVoiceHealth({event:"consulta_completa",query:"privado"}),null);

function responseRecorder(){return{statusCode:0,body:null,headers:{},setHeader(name,value){this.headers[name]=value},status(code){this.statusCode=code;return this},json(value){this.body=value;return this},end(){return this}}}
const previousInfo=console.info,logs=[];console.info=(...args)=>logs.push(args.join(" "));
try{
  for(let turn=1;turn<=100;turn++){
    const req={method:"POST",headers:{host:"epg-caddy.vercel.app"},body:{event:turn%2?"speech_started":"response_stopped",build:"V327",context:turn%3?"round":"setup",turn,elapsedMs:turn*100,query:`pregunta-${turn}`,transcript:`voz-${turn}`}};
    const res=responseRecorder();voiceHealthHandler(req,res);assert.equal(res.statusCode,202);assert.deepEqual(res.body,{ok:true});
  }
}finally{console.info=previousInfo}
assert.equal(logs.length,100);
assert.doesNotMatch(logs.join("\n"),/pregunta-|voz-/,"La telemetría técnica nunca debe registrar contenido hablado");

console.log("PASS V327 · 550 secuencias herramienta→voz, 100 eventos privados y recuperación sin silencio");
