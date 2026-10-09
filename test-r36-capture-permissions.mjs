import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html=fs.readFileSync('index-grupal.html','utf8');
const code=html.slice(html.indexOf('async function ensureSession(){'),html.indexOf('async function toggleVoice('));
async function scenario({error=null,http=200}={}){
 const trace=[];let dc,track={readyState:'live',enabled:true,stop(){trace.push('track.stop')}};
 const stream={getAudioTracks:()=>[track],getTracks:()=>[track]};
 class Peer {
  constructor(){this.connectionState='connected'}
  addTrack(t,s){assert.equal(t,track);assert.equal(s,stream);trace.push('addTrack')}
  createDataChannel(){dc={readyState:'open',close(){trace.push('dc.close')}};return dc}
  async createOffer(){return{type:'offer',sdp:'synthetic SDP'}}
  async setLocalDescription(v){this.localDescription=v}
  async setRemoteDescription(){dc.onopen();dc.onmessage({data:JSON.stringify({type:'session.created',session:{}})})}
  close(){trace.push('pc.close')}
 }
 const env=vm.createContext({console,AbortController,
  realtimeLooksStale:()=>false,realtimeReady:()=>false,sessionConnectPromise:null,realtimeGeneration:0,
  navigator:{mediaDevices:{getUserMedia:async constraints=>{trace.push('getUserMedia');assert.deepEqual(JSON.parse(JSON.stringify(constraints)),{audio:{echoCancellation:true,noiseSuppression:true,autoGainControl:true}});if(error)throw Object.assign(new Error(error),{name:error});return stream}}},
  RTCPeerConnection:Peer,document:{createElement:()=>({pause(){trace.push('audio.pause')},remove(){trace.push('audio.remove')}}),body:{appendChild(){}}},
  setTimeout:()=>1,clearTimeout(){},reportVoiceHealth:e=>trace.push(e),detectRealtimeShape:()=> 'test',handleRealtime(){},voiceContext:'round',round:{players:[]},window:{gscgApiUrl:p=>p},
  fetch:async(url,options)=>{trace.push('session.fetch');assert.equal(options.credentials,'include');assert.equal(options.headers['Content-Type'],'application/sdp');return{ok:http===200,status:http,text:async()=>http===200?'synthetic answer SDP':'failed'}},
  stream:null,micTrack:null,pc:null,dc:null,audioEl:null,realtimeShape:'unknown'
 });
 vm.runInContext(code,env);
 if(error||http!==200){await assert.rejects(env.ensureSession());assert.equal(env.sessionConnectPromise,null);if(error)assert.equal(trace.includes('session.fetch'),false);else assert.ok(trace.includes('track.stop'))}
 else{assert.equal(await env.ensureSession(),true);assert.equal(env.micTrack.enabled,false);assert.ok(trace.includes('connection_ready'))}
 return trace
}
for(const error of ['NotAllowedError','NotFoundError','SecurityError']){await scenario({error});console.log('PASS simulated getUserMedia '+error+': session not opened and pending connection released')}
for(const http of [401,429,500]){await scenario({http});console.log('PASS simulated session HTTP '+http+': audio track and connection released')}
await scenario();console.log('PASS simulated capture → WebRTC session handshake; credentials retained and microphone remains muted until listening authorization. NOT physical audio or ASR verification.');
