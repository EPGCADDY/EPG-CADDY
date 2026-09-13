# R34 · restauración del micrófono persistente · 13 septiembre 2026

## Diagnóstico causal

- Referencia funcional reciente: V407-R63, commit `65115017f3cb658fbdaa8c341ace560fd7a987c0`; su prueba exige WebRTC persistente primero en iPhone.
- R34 actual conservaba `gestureSafeBrowserVoicePreferred()` dentro de `index-grupal.html`, pero perdió el override de `voice-assistant.js` que lo devolvía a `false` después de `DOMContentLoaded`.
- R34 además ejecutaba `setVoice(false)` cuando `output_audio_buffer.stopped` cerraba una respuesta conversacional. V407-R63 ejecutaba `resumeConversationListening()` sobre la misma pista viva.
- La evidencia física `IMG_3626.png` ya había acreditado permiso, pista `live`, RMS y transcripciones en el diagnóstico aislado. Los registros de la aplicación acreditaron primer turno completo y tres segundos turnos `started → no_result_timeout`. La diferencia reproducible es el reinicio automático de `SpeechRecognition` sin un nuevo gesto, no el hardware del propietario.

## Corrección incremental

- `voice-assistant.js`: restaura WebRTC como transporte primario en iPhone; `SpeechRecognition` queda disponible como recuperación cuando Realtime no abre.
- `index-grupal.html`: al terminar audio Realtime conserva `listening`, habilita la misma pista y publica `ESCUCHANDO · PUEDES CONTINUAR`.
- No cambia permisos, HTTPS, `getUserMedia`, reconocimiento/parsers, motor de IA, respuesta escrita, TTS, scores, diseño ni Producción.

## Evidencia automática

- `test-r34-persistent-voice-regression.mjs`: PASS. Ejecuta el override real del script, verifica `getUserMedia` antes de la espera de red, conserva fallback por toque e inyecta una pista PCM viva reutilizada durante 100 turnos `RESPONDIENDO → ESCUCHANDO`.
- PASS: V322 sostenido, R32 conversación abierta, R34 audio, limpieza y ciudad solicitada.
- PASS: V357, V358, V362/V378, V367 y cierres hablados.
- El navegador remoto no puede abrir `127.0.0.1` (`ERR_BLOCKED_BY_CLIENT`). No se creó Preview para evitar contradecir la orden de no enviar/publicar otra versión antes del banco de 100.

## Estado y rollback

- Corrección local: PASS dirigida; auditoría integral y banco cualitativo de 100 todavía obligatorios.
- Prueba física final iPhone: pendiente y exclusiva del propietario después de cero FAIL automáticos.
- Producción: intacta en `e871621c2af478deed6957a625feb0e280402d68`.
- Rollback: revertir únicamente los cambios de `voice-assistant.js` e `index-grupal.html` de este corte.
