import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const html=readFileSync('index-grupal.html','utf8');
const device=readFileSync('device-closures.js','utf8');
const build=readFileSync('scripts/build-manual-lab.mjs','utf8');

const start=html.indexOf('function speakPlayerResultDirectLocal(player){');
const end=html.indexOf('\nfunction bindPlayerNameResultAudio(){',start);
assert(start>=0&&end>start,'No se encontro la ruta de audio individual por doble toque');
const source=html.slice(start,end);

assert.match(device,/femaleVoiceName=\/\([^\n]*paulina[^\n]*marisol[^\n]*femenina\)\/i/,'La voz compartida debe priorizar voces femeninas locales en espanol');
assert.match(source,/const speaker=window\.GSCDeviceClosures;/,'El audio individual debe usar el mismo helper que primera vuelta, segunda vuelta y total');
assert.match(source,/speaker\.cancel\?\.\(\);[\s\S]*speaker\.speak\(speech\)/,'El doble toque debe cancelar y hablar por GSCDeviceClosures');
assert.doesNotMatch(source,/new SpeechSynthesisUtterance|speechSynthesis\.getVoices|voices\.find/,'El doble toque no puede seleccionar una voz paralela que pueda caer en voz masculina');
assert.match(html,/SEGUNDO TOQUE DETECTADO · LLAMANDO VOZ FEMENINA/,'La UI debe confirmar la ruta unificada de voz femenina');
assert.match(build,/test-r250-player-double-tap-female-voice\.mjs/,'El candado R250 debe correr en el banco obligatorio');

console.log('PASS R250: doble toque individual usa la misma voz femenina local que vueltas y total.');
