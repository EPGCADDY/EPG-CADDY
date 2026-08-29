# V367 · voz inicial y LIVE Match Play para tres seguidores

**Fecha:** 28 de agosto de 2026  
**Caso:** RC-039  
**Estado:** candidato automático PASS; Preview y prueba física iPhone pendientes; Producción intacta.

## Requisito exacto

1. Micrófono desde Inicio para Registro y scores de uno o varios hoyos.
2. Comunicación universal únicamente audible, sin abrir otra pantalla.
3. Reportes hablados de primera vuelta, segunda vuelta, ronda completa y acumulado solicitado.
4. Enlace privado Match Play legible simultáneamente por esposa, Coach y un tercer invitado.

## Falla real encontrada

La prueba E2E contra Producción creó el stream y publicó revisión 1 con HTTP 200, pero las tres lecturas de seguidores devolvieron HTTP 400 `LIVE_REQUEST_FAILED`; el stream se revocó después de la prueba. Por tanto, el enlace anterior queda expresamente rechazado.

## Corrección V367

- `audio_capture` agotado cambia a captura Realtime directa sin repetir el mismo fallo de Safari.
- La consulta universal de voz no abre `AI UNIVERSAL`; espera el final real del MP3 Cedar/Onyx o de la voz masculina local antes de volver a `LISTO`.
- LIVE tipa el hash del visitante, distingue revisión ausente de revisión cero y normaliza `bigint`, fechas y JSON antes de responder.
- El banco ejecuta tres lectores independientes del snapshot Match Play revisión 1 y exige serialización JSON válida.
- Intocables conserva Inicio, ronda activa, Registro, multihoyos, reportes y separación de solo lectura.

## Evidencia automática

`test-v367-voice-live-match-play-final.mjs` cubre Inicio, Registro, uno/múltiples hoyos, Universal sin pantalla, término completo del audio, recuperación `audio_capture`, primera/segunda vuelta, ronda completa, acumulado y tres lectores LIVE. La auditoría maestra y el Preview son puertas posteriores separadas.

## Criterio de autorización

No se declara garantía física ni se promueve Producción hasta que el Preview quede READY, su API pase tres ciclos externos y el propietario complete en iPhone: escuchar desde Inicio, registrar jugadores, dictar uno/múltiples hoyos, preguntar acumulado y abrir el LIVE en los dispositivos de esposa y Coach.
