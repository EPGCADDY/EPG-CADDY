import fs from 'node:fs';
import assert from 'node:assert/strict';
const html=fs.readFileSync('index-grupal.html','utf8');
const scripts=[...html.matchAll(/<script\b[^>]*src="\.\/([^"?]+)/gi)].map(m=>m[1]);
const forbidden=/geolocation|getCurrentPosition|watchPosition|\/api\/weather|id="(?:courseWeather|setupWeather)"|getUserMedia|MediaRecorder|RTCPeerConnection|\/api\/(?:session|voice-|universal-ai|research|golf-rules)|fireMicActivation|CADDIE UNIVERSAL|DICTA ASÍ|Método 1 Dictado|id=["'](?:setupMic|headerMic|stablefordSetupMic)/i;
for(const file of ['index-grupal.html',...scripts]){
 const raw=fs.readFileSync(file,'utf8');
 const content=file.endsWith('.html')?raw.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,''):raw;
 assert(!forbidden.test(content),`${file}: removed assistant entry returned`);
}
const release=html.match(/name="gscg-release" content="([^"]+)/)[1];
assert(fs.readFileSync('service-worker.js','utf8').includes(`const RELEASE="${release}"`),'Page and worker release differ');
for(const path of ['api/session.js','api/session-grupal.js','api/universal-ai.js','api/voice-speech.js','api/voice-transcribe.js','voice-assistant.js','voice-turns.js'])assert(!fs.existsSync(path),`Retired endpoint returned: ${path}`);
assert(html.includes('GSCDeviceClosures'),'Local score announcements must remain');
assert(html.includes('startRoundScoreDictation'),'Dedicated local score dictation must remain');
assert(html.includes('window.SpeechRecognition||window.webkitSpeechRecognition'),'Score dictation must use the browser speech recognizer only');
console.log(`PASS ${scripts.length} loaded modules: no microphone/AI entry; local result speech retained; release synchronized`);
