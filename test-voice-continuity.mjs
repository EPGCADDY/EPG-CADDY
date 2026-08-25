import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const html=readFileSync(new URL('./index-grupal.html',import.meta.url),'utf8');
assert.ok(html.includes('function parseRoundNavigationCommand('),'Falta navegación hablada al registro');
assert.ok(html.includes('if(!transcript){resetRoundCapture();phase="idle"'),'El silencio no debe producir Error hablado');
assert.ok(html.includes('Todo lo que no sea una operación reconocida de la tarjeta pasa al Caddie'),'Falta el destino conversacional para frases generales');
assert.ok(html.includes('Esta ruta nunca modifica jugadores, hoyos ni scores'),'La conversación general debe conservar el candado de escritura');
assert.ok(html.includes('const ROUND_VAD_SILENCE_MS=1000'),'General y Stableford deben compartir el cierre rápido de frase');
assert.ok(html.includes('if(combined){requestRoundFinalize(0,true);return}'),'Cada transcripción completa debe procesarse sin una segunda espera');
assert.ok(html.includes('if(voiceContext==="round"&&!keepListening)setVoice(false)'),'El cierre continuo no debe apagar el micrófono antes de tiempo');
assert.ok(html.includes('const navigation=parseRoundNavigationCommand(transcript)'),'La navegación debe conservar prioridad antes de la conversación');
assert.ok(html.includes('roundTranscriptionWatchdog=setTimeout'),'Falta vigilancia para una transcripción que nunca termina');
assert.ok(html.includes('const ROUND_TRANSCRIPTION_WATCHDOG_MS=10000'),'General y Stableford deben compartir el mismo watchdog');
assert.ok(html.includes('roundPendingItems.clear();if(roundTranscriptCombined())requestRoundFinalize(0,true)'),'El watchdog debe liberar el bloqueo y procesar texto disponible');
assert.ok(html.includes('phase==="idle"&&!listening&&!roundFinalizeRequested&&!roundPendingItems.size'),'El reloj no debe sobrescribir ESCUCHANDO/TRANSCRIBIENDO/PROCESANDO');
console.log('PASS continuidad, watchdog y estados de voz V181');
