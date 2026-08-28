# Reporte V365 · RC-036 · locutor universal no disponible

## Evidencia física de entrada

- Fecha y hora: 28 de agosto de 2026, 16:37 Guatemala / 22:37 UTC.
- Entorno: Producción `epg-caddy.vercel.app`, deployment `dpl_6NDKdNNvLmthVeWP6QS5WKbFPodU`, commit `cc42709870eaea7cd33c105019077a3db436aca0`.
- Captura del propietario: `IMG_2187.png`, SHA-256 `af6f2982993cfa7d40fe1ac23513b7d2d57cb2c2aadb30f61c47624385a11ef6`.
- Resultado visible: `VOZ MASCULINA NO DISPONIBLE · INTENTA DE NUEVO`.

## Correlación reproducible de Vercel

| UTC | Ruta/evento | Resultado |
|---|---|---|
| 22:37:05 | `browser_fallback_requested` / `speech_primed` | Safari abrió el flujo. |
| 22:37:07 | `browser_fallback_started` | Reconocimiento iniciado. |
| 22:37:13 | `browser_fallback_transcript_ready` | La escucha sí reconoció contenido. |
| 22:37:13 | `/api/universal-ai` | HTTP 200. |
| 22:37:13 | `/api/voice-speech` | HTTP 503; Cedar upstream 429. |
| 22:37:14 | `browser_fallback_speech_failed` | Sin audio. |

## Causa y corrección candidata

Producción tenía OpenAI directo, pero el TTS Cedar quedó limitado; no existía token Gateway disponible y el filtro local dependía de una lista corta de nombres masculinos españoles. V365 añade Onyx directo con `tts-1`, alinea Gateway con el modelo oficial `openai/tts-1`, precarga el catálogo Safari, espera 4.8 segundos y permite un locutor masculino aprobado fuera del idioma exacto antes de declarar indisponibilidad. Una voz femenina genérica sigue prohibida.

## Estado

`test-v365-universal-male-voice-recovery.mjs` cubre automáticamente la cascada. El cierre continúa bloqueado hasta auditoría integral, Preview y respuesta audible comprobada en el iPhone físico.
