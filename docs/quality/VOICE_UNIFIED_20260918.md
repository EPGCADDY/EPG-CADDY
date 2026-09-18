## Voz uniforme y espera de respaldo · 18 septiembre 2026

Orden actual: limitar trabajo a tiempo de respuesta y voz uniforme en clima, salud, tráfico y conversación general. Base ef31ccae5108fa5bb812e05e59fc93ec2c24a340, rama preview/universal-stream-20260917. Rollback: volver a ese commit sólo en Preview.

PCM directo cambia mini-tts a tts-1; MP3 Gateway cambia Fish sin identidad fija a openai/tts-1 con onyx. Ambos conservan velocidad 0.90 y texto completo. Se eliminan instrucciones no soportadas por tts-1. Una identidad configurada no certifica timbre o acento latinoamericano: escucha real pendiente. Respaldo Gateway continúa buffered.

Voz estándar: un intento directo de GPT-4.1, máximo 2500 ms, seguido de Gateway ante fallo. Elimina hasta tres reintentos adicionales y espera retry-after del mismo proveedor. Texto y análisis profundo conservan política. Riesgo: una respuesta directa que tarde más de 2500 ms se cancela y se reinicia por Gateway; no se afirma mejora en todas las condiciones ni cumplimiento de dos segundos.

Evidencia interna: bancos PCM, configuración MP3, perfil de latencia, V356 y V362 pasan con proveedores simulados, incluyendo 429 y timeout seguido de respaldo. No equivalen a ejercicios físicos. La invitación real abrió Laboratorio R42; navegador disponible carece de herramienta para inyectar voz o escuchar audio. No se enviaron preguntas habladas. No existe prueba de dos segundos ni aprobación audible. Prueba de Preview y estado de construcción se registrarán por separado.

INT-03 y sus expectativas antiguas se actualizan a la orden actual de unificar voz. No se cambian hashes ni confirmaciones históricas del micrófono Registro/Score. No se modifican cálculos, datos, permisos, Actualizar ni Producción.

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

