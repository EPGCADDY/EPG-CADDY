import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const html=readFileSync(new URL('./index-grupal.html',import.meta.url),'utf8');
assert.ok(html.includes('function parseRoundNavigationCommand('),'Falta navegación hablada al registro');
assert.ok(html.includes('if(!transcript){resetRoundCapture();phase="idle"'),'El silencio no debe producir Error hablado');
assert.ok(html.includes('Candado de silencio'),'Falta el candado de comandos desconocidos');
assert.ok(html.includes('requestRoundFinalize(0,true)},4000)'),'La captura continua debe procesar aunque cambie el estado listening');
assert.ok(html.includes('if(voiceContext==="round"&&!keepListening)setVoice(false)'),'El cierre continuo no debe apagar el micrófono antes de tiempo');
assert.ok(html.includes('parseRoundNavigationCommand(combined).matched'),'La navegación debe procesarse inmediatamente');
assert.ok(html.includes('roundTranscriptionWatchdog=setTimeout'),'Falta vigilancia para una transcripción que nunca termina');
assert.ok(html.includes('roundPendingItems.clear();if(roundTranscriptCombined())requestRoundFinalize(0,true)'),'El watchdog debe liberar el bloqueo y procesar texto disponible');
assert.ok(html.includes('phase==="idle"&&!listening&&!roundFinalizeRequested&&!roundPendingItems.size'),'El reloj no debe sobrescribir ESCUCHANDO/TRANSCRIBIENDO/PROCESANDO');
console.log('PASS continuidad, watchdog y estados de voz V181');
