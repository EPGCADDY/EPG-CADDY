# Ajuste de voz y espera · 13 septiembre 2026
Base exacta: ab2e227c6dc1f2ccccb39d2dcc10dc2a4611a340 (R33).
Rama: fix-voice-speed-wait-20260913. No publicado.

| Ajuste | Antes | Candidato |
|---|---:|---:|
| Fish Audio | 0.90 | 0.963 |
| Realtime y respaldo no español | 1.15 | 1.2305 |
| Silencio conversacional Realtime | 1100 ms | 275 ms |
| Pausa de AI ∞/pregunta reconocida Safari | 1200 ms | 300 ms |

Los dictados explícitos de scores/registro conservan 1200 ms. Las preguntas fuera de AI ∞ sólo usan la pausa reducida cuando el clasificador existente detecta conversación. Los límites de red se conservan: reducirlos abortaría respuestas, no aceleraría el servidor. La reducción de latencia total del 75% no está demostrada.

## Identidad de voz pendiente
El archivo histórico Intocables/CONFIRMACION_ESCRITA_V378.md registra Fish Audio, es-419, sin ID fijo, 0.90. Se encontró una orden posterior en la rama lab/r63-iphone-persistent-voice, commit fd682fa721c708dfff835ba3f3406bdbdc685349, archivo CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/VOZ_FEMENINA_MANDATORIA.lock.json: la mujer del Manual en toda la app, identityVerified=false. approved-voice.js conserva la selección únicamente en el dispositivo bajo gscg.approved.female.voice-uri.v1. No hay voiceURI concreto en ese expediente. No se sustituye por una voz elegida arbitrariamente.

## Evidencia dirigida
PASS test-voice-speed-wait.mjs: pausas, orden operativa preservada, evento tardío, +7%.
PASS test-v356-voice-only-cedar-quality.mjs: petición de voz simulada y contratos de proveedor.
PASS test-r32-open-conversation.mjs: 18 rutas y errores de audio.
PASS test-r33-visible-voice-errors.mjs: aviso visible.
No son pruebas de sonido físico ni tiempos reales de proveedor.

## Publicación y rollback
No publicar hasta resolver identidad de la voz del Manual y verificar audio/pausas en iPhone. Rama R34 de otra conversación no modificada. Rollback: descartar esta rama; no hubo cambios de despliegue ni de ACTUALIZAR.

PASS Intocables/intocables-gate.mjs; test-v325-ideal-microphone-timings.mjs; test-v326-no-silent-conversation.mjs (30 turnos simulados). Se inspeccionó IMG_3384_MANUAL_VOZ_FEMENINA_09X.png: muestra 0.9×, pero no el nombre/voiceURI.
