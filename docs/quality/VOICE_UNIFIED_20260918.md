## Transferencia de voz comprimida · 18 septiembre 2026

Evidencia real del Preview 410c017, dpl_CWfS6mQYYEoeCihyuHWefNebFJFk: turnos ptt_1789695441443_2 y ptt_1789695457861_3, inicio registrado de audio a 8990 y 10283 ms desde soltar. Transcripción disponible 1399/1213 ms; texto 4060/5881 ms. Servidor: texto 1782/4371 ms, primeros bytes 4887/7454 ms; Gateway buffered, PCM 1749334/1882000 bytes. Son marcas del navegador/servidor, no audición independiente. No se registran preguntas ni credenciales.

Corrección concreta: Gateway entrega MP3 comprimido de la misma síntesis TTS-1/Onyx/0.90. Se decodifica con el AudioContext ya preparado desde el gesto y se reproduce una vez. Directo conserva PCM incremental. Elimina transferencia PCM masiva sin alterar texto, modelo, timbre configurado, captura o datos. Cancelación durante decodificación impide reproducción tardía. No se anuncia streaming para Gateway ni cumplimiento de dos segundos.

Prueba dirigida de dos turnos de controlador/decodificador y cancelación pasa con proveedores simulados. Medición posterior real pendiente; no equivalencia a prueba física. Fuente/base y rollback: 410c01708fcb624e37ccfab96a05c2d81e6e632e, sólo rama Preview propia.

Archivos: `api/_lib/universal-pcm.js`; `index-grupal.html`; `universal-pcm-player.js`; `test-universal-pcm.mjs`; `ROADMAP_OVERALL.md`; `ROADMAP_A_DETALLE.md`; `docs/quality/VOICE_UNIFIED_20260918.md`.


### Ajuste autorizado del sello de salida vocal
El primer build c32868b fue rechazado porque api/voice-speech.js conservaba el hash histórico Fish. La orden actual del propietario autoriza cambiar esa salida y sus dos pruebas de configuración. Se registran hashes previos y nuevos, sin retirar verificaciones ni tocar hashes de captura/parsers/scores. La aprobación física V378 sigue siendo histórica; la nueva voz figura PENDING. No implica PASS audible ni meta de dos segundos.
Archivos: `Intocables/MICROFONO_APROBADO.lock.json`; `Intocables/APROBACION_FISICA_REGISTRO_SCORES_V378.json`; `ROADMAP_OVERALL.md`; `ROADMAP_A_DETALLE.md`; `docs/quality/VOICE_UNIFIED_20260918.md`.
## Voz uniforme y espera de respaldo · 18 septiembre 2026

Orden actual: limitar trabajo a tiempo de respuesta y voz uniforme en clima, salud, tráfico y conversación general. Base ef31ccae5108fa5bb812e05e59fc93ec2c24a340, rama preview/universal-stream-20260917. Rollback: volver a ese commit sólo en Preview.

PCM directo cambia mini-tts a tts-1; MP3 Gateway cambia Fish sin identidad fija a openai/tts-1 con onyx. Ambos conservan velocidad 0.90 y texto completo. Se eliminan instrucciones no soportadas por tts-1. Una identidad configurada no certifica timbre o acento latinoamericano: escucha real pendiente. Respaldo Gateway continúa buffered.

Voz estándar: un intento directo de GPT-4.1, máximo 2500 ms, seguido de Gateway ante fallo. Elimina hasta tres reintentos adicionales y espera retry-after del mismo proveedor. Texto y análisis profundo conservan política. Riesgo: una respuesta directa que tarde más de 2500 ms se cancela y se reinicia por Gateway; no se afirma mejora en todas las condiciones ni cumplimiento de dos segundos.

Evidencia interna: bancos PCM, configuración MP3, perfil de latencia, V356 y V362 pasan con proveedores simulados, incluyendo 429 y timeout seguido de respaldo. No equivalen a ejercicios físicos. La invitación real abrió Laboratorio R42; navegador disponible carece de herramienta para inyectar voz o escuchar audio. No se enviaron preguntas habladas. No existe prueba de dos segundos ni aprobación audible. Prueba de Preview y estado de construcción se registrarán por separado.

INT-03 y sus expectativas antiguas se actualizan a la orden actual de unificar voz. No se cambian los hashes de captura, parsers ni escritores de Registro/Score. Se conservan los hashes previos y se documentan los nuevos de salida vocal autorizada. No se modifican cálculos, datos, permisos, Actualizar ni Producción.

Archivos de esta corrección:
- `api/_lib/universal-pcm.js`
- `api/voice-speech.js`
- `api/universal-ai.js`
- `test-universal-pcm.mjs`
- `test-r42-voice-configuration.mjs`
- `test-universal-voice-latency-profile.mjs`
- `test-v356-voice-only-cedar-quality.mjs`
- `test-v362-physical-voice-recovery.mjs`
- `Intocables/intocables-gate.mjs`
- `Intocables/README.md`
- `Intocables/REGLAS_INTOCABLES.json`
- `docs/quality/VOICE_UNIFIED_20260918.md`
- `ROADMAP_OVERALL.md`
- `ROADMAP_A_DETALLE.md`

