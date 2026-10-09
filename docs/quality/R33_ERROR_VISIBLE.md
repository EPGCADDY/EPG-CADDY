# R33 · Error de voz visible

El navegador real actualizó LAB de R31 a R32 con el botón ACTUALIZAR. Confirmó V407 · R32 / ACTUALIZADO, cuatro jugadores de prueba, 18 scores por jugador, IN 45 / OUT 45 / TOTAL 90 intactos. R32 publicada en Main dpl_6cRWB9c1dubycnawDsNC5k8MEdZA y LAB dpl_3oLWi8cZ94dd61UuKYSpSdpSnHaT, ambas READY, commit 4335a5680e627cd8faa79fc58d5f61f876558feb.

La pulsación real de AI ∞ produjo NO HAY UN MICRÓFONO DISPONIBLE EN ESTE DISPOSITIVO sólo en el panel oculto; status visible seguía mostrando INICIO. Se registra FAIL de visibilidad.

R33 añade aviso de texto seguro junto a los controles actuales, independiente del reloj; los estados nuevos de escucha/respuesta lo limpian. No abre otra pantalla. El navegador en la nube no tiene micrófono físico. La reproducción y reconocimiento del iPhone siguen pendientes de prueba física.

Pruebas: test-r33-visible-voice-errors.mjs PASS; test-r32-open-conversation.mjs PASS; Intocables/intocables-gate.mjs PASS. Conserva parsers, escritores y parámetros de captura. El sello compartido registra la corrección visual autorizada y conserva el SHA R32; no afirma aprobación física nueva.

Base/rollback: Main y LAB R32, commit 4335a5680e627cd8faa79fc58d5f61f876558feb.
