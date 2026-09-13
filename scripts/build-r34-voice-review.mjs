// Preview-only synthetic media. No app session, user data or credentials are exported.
if(process.env.VERCEL_ENV!=="preview"||!["fix-r34-audible-response","fix-r34-weather-second-turn"].includes(process.env.VERCEL_GIT_COMMIT_REF))process.exit(0);
import fs from 'node:fs';
const {default:speech}=await import('../api/voice-speech.js');
const phrase='Esta es una prueba de voz. La respuesta también queda escrita en la pantalla.';
let status=200,bytes=null;
await speech({method:'POST',headers:{},body:{text:phrase,language:'es-GT'}},{setHeader(){},status(n){status=n;return this},json(){return this},send(data){bytes=data;return this}});
if(status!==200||!bytes?.length)throw new Error('R34 synthetic TTS failed '+status);
const dir='assets/official-logos';fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(dir+'/r34-speech-review.mp3',bytes);
const html=fs.readFileSync('index-grupal.html','utf8');
const helpers=html.slice(html.indexOf('let browserVoiceFollowupContext='),html.indexOf('function stopAiUniversalOutput('));
fs.writeFileSync(dir+'/r34-voice-review.html',`<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Prueba sintética R34</title><body style="background:#080a09;color:white;font:17px Arial;max-width:440px;margin:20px auto;padding:16px"><h1>Prueba sintética R34</h1><p>Frase de prueba; sin tarjeta ni datos de usuario.</p><nav aria-label="Herramientas de la ronda"><button id="run" style="padding:16px">Probar respuesta y audio</button></nav><p id="status">LISTO</p><p id="signal">Señal pendiente</p><p id="events"></p><script>
const $=id=>document.getElementById(id);let voiceContext='round',listening=false,aiUniversalMuted=false,aiUniversalSpeechPrimed=false,aiUniversalTtsAudio=null,aiUniversalTtsObjectUrl='',cedarSpeechServerBlockedUntil=0;const CEDAR_SPEECH_RETRY_MS=1000;let browserVoiceRecognition=null,browserVoiceActive=false,browserVoiceRequested=false;function startBrowserVoiceFallback(){return false}
window.gscgApiUrl=()=> 'r34-speech-review.mp3';const nativeFetch=window.fetch.bind(window),fetch=()=>nativeFetch('r34-speech-review.mp3');
const reportVoiceHealth=event=>{$('events').textContent+=' '+event},setPrimaryVoiceMatrix=(state,context,message)=>{$('status').textContent=message||state},aiUniversalSetState=state=>{$('status').textContent=state},aiUniversalSpeechLanguage=()=> 'es-GT',speakAiUniversalMaleBrowserFallback=async()=>false;
${helpers}
$('run').onclick=async()=>{await speakAiUniversalText(${JSON.stringify(phrase)});const data=await (await nativeFetch('r34-speech-review.mp3')).arrayBuffer();const context=new AudioContext();try{const decoded=await context.decodeAudioData(data);let sum=0,peak=0,count=0;for(let c=0;c<decoded.numberOfChannels;c++){for(const n of decoded.getChannelData(c)){sum+=n*n;peak=Math.max(peak,Math.abs(n));count++}}const rms=Math.sqrt(sum/count);$('signal').textContent=JSON.stringify({duration:decoded.duration,peak,rms,nonSilent:rms>0.0001})}finally{await context.close()}};
</script></body></html>`);
console.log('R34_SYNTHETIC_AUDIO '+JSON.stringify({status,bytes:bytes.length,physicalIphone:'NOT_TESTED'}));
