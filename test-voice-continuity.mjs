import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const html=readFileSync(new URL('./index-grupal.html',import.meta.url),'utf8');
assert.ok(html.includes('function parseRoundNavigationCommand('),'Falta navegación hablada al registro');
assert.ok(html.includes('if(!transcript){resetRoundCapture();phase="idle"'),'El silencio no debe producir Error hablado');
assert.ok(html.includes('Candado de silencio'),'Falta el candado de comandos desconocidos');
assert.ok(html.includes('requestRoundFinalize(0)},4000)'),'La captura continua debe esperar cuatro segundos');
assert.ok(html.includes('if(voiceContext==="round"&&!keepListening)setVoice(false)'),'El cierre continuo no debe apagar el micrófono antes de tiempo');
assert.ok(html.includes('parseRoundNavigationCommand(combined).matched'),'La navegación debe procesarse inmediatamente');
console.log('PASS continuidad, silencio y navegación de voz V170');
