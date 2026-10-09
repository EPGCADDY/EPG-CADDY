import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

const device=readFileSync('device-closures.js','utf8');
const access=readFileSync('access.html','utf8');
const group=readFileSync('index-grupal.html','utf8');
const guest=readFileSync('guest-access.js','utf8');
const build=readFileSync('scripts/build-manual-lab.mjs','utf8');

assert.match(device,/function selectPreferredLocalSpanishVoice\(/,'Device speech must expose the shared local Spanish voice selector');
assert.match(device,/femaleVoiceName=\/\([^\n]*paulina[^\n]*marisol[^\n]*femenina\)\/i/,'Shared selector must prefer known female Spanish voices before generic Spanish voices');
assert.match(device,/root\.GSCDeviceVoice=\{selectPreferredLocalSpanishVoice\}/,'Shared selector must be exported for every 48h and normal Score Card path');
assert.match(group,/guest-access\.js[\s\S]*device-closures\.js/,'Guest 48h access must load before the shared device closure audio path');
assert.match(group,/window\.GSCDeviceClosures\.bindControls\(\)/,'Normal Score Card must bind result audio through the shared device closure path');
assert.doesNotMatch(guest,/deviceClosure(?:Front|Back|Total|Status)|player-audio-button|data-audio-player/,'Guest 48h isolation must not remove or shadow Score Card audio result controls');
assert.match(access,/device-closures\.js/,'48h invitation page must load the same device speech helper');
assert.match(access,/const speaker=window\.GSCDeviceClosures[\s\S]*speaker\.speak\("Invitaci[oó]n de 48 horas creada\. Comparte el enlace de la Score Card por WhatsApp\."\)/,'48h invitation audio must use the same local speech path');

const sandbox={
  speechSynthesis:{
    paused:false,
    getVoices:()=>[
      {name:'Carlos',lang:'es-MX',localService:true},
      {name:'Paulina',lang:'es-MX',localService:true}
    ],
    addEventListener(){},
    removeEventListener(){},
    speak(utterance){this.lastUtterance=utterance;utterance.onstart?.();utterance.onend?.();},
    cancel(){},
    resume(){}
  },
  SpeechSynthesisUtterance:function(text){this.text=text;},
  document:{getElementById:()=>null,querySelectorAll:()=>[]},
  setTimeout(fn){fn();return 1;},
  clearTimeout(){},
  Promise,
  console
};
sandbox.window=sandbox;
vm.createContext(sandbox);
vm.runInContext(device,sandbox);
assert.equal(sandbox.GSCDeviceVoice.selectPreferredLocalSpanishVoice(sandbox.speechSynthesis.getVoices()).name,'Paulina','Guest and normal Score Card result audio must pick the same preferred female voice');
await sandbox.GSCDeviceClosures.speak('Resultado Score Card invitado 48h');
assert.equal(sandbox.speechSynthesis.lastUtterance.voice.name,'Paulina','Guest 48h result audio must use the shared preferred female voice');

assert.match(build,/test-r243-guest48h-scorecard-shared-female-voice\.mjs/,'R243 guest 48h voice regression must run in the mandatory build bank');

console.log('PASS R243: Score Card invitado 48h usa la misma voz femenina y el mismo audio de resultados que la Score Card normal.');
