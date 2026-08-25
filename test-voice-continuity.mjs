import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const html=readFileSync(new URL('./index-grupal.html',import.meta.url),'utf8');
assert.ok(html.includes('function parseRoundNavigationCommand('),'Falta navegación hablada al registro');
assert.ok(html.includes('if(!transcript){resetRoundCapture();phase="idle"'),'El silencio no debe producir Error hablado');
assert.ok(html.includes('Todo lo que no sea una operación reconocida de la tarjeta pasa al Caddie'),'Falta el destino conversacional para frases generales');
assert.ok(html.includes('Esta ruta nunca modifica jugadores, hoyos ni scores'),'La conversación general debe conservar el candado de escritura');
assert.ok(html.includes('const ROUND_CONTINUOUS_FINALIZE_MS=4000'),'General y Stableford deben compartir el mismo cierre continuo');
assert.ok(html.includes('requestRoundFinalize(0,true)},ROUND_CONTINUOUS_FINALIZE_MS)'),'La captura continua debe usar un solo tiempo operacional');
assert.ok(html.includes('if(voiceContext==="round"&&!keepListening)setVoice(false)'),'El cierre continuo no debe apagar el micrófono antes de tiempo');
assert.ok(html.includes('parseRoundNavigationCommand(combined).matched'),'La navegación debe procesarse inmediatamente');
assert.ok(html.includes('roundTranscriptionWatchdog=setTimeout'),'Falta vigilancia para una transcripción que nunca termina');
assert.ok(html.includes('const ROUND_TRANSCRIPTION_WATCHDOG_MS=10000'),'General y Stableford deben compartir el mismo watchdog');
assert.ok(html.includes('roundPendingItems.clear();if(roundTranscriptCombined())requestRoundFinalize(0,true)'),'El watchdog debe liberar el bloqueo y procesar texto disponible');
assert.ok(html.includes('phase==="idle"&&!listening&&!roundFinalizeRequested&&!roundPendingItems.size'),'El reloj no debe sobrescribir ESCUCHANDO/TRANSCRIBIENDO/PROCESANDO');
console.log('PASS continuidad, watchdog y estados de voz V181');
