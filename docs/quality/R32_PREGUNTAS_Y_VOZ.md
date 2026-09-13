# R32 · Preguntas abiertas y resultado de voz

Base Main: 8bcba839885dda559725a23ce2e368534c7efc67.

Corrección: después de descartar un registro válido, las frases que no sean órdenes explícitas de registro pasan a AI Universal sin exigir palabras de una lista. Una orden de registro incompleta conserva su error. El modo voz devuelve el resultado real del inicio de reproducción; el fallo no se contabiliza como respuesta audible. El error de reproducción tardío se muestra en el estado visible. AI ∞ libera el audio anterior antes de abrir de nuevo el micrófono.

Integración: conserva literalmente el parche de actualización ya publicado en LAB ce9a6522498ee2235550fba820e88348edbc3490; integra la comprobación de voz de d68f3e3494ef091cf8b72f7a438eb16cc6354192. Las mejoras de lenguaje R31 y tarjeta PNG R30 permanecen.

Pruebas ejecutadas: test-r32-open-conversation.mjs (18 rutas, registro local, error de audio, liberación de audio); test-voice-result-integrity.mjs (remoto/local/offline, diez turnos simulados, error de red); test-v354-voice-fallback.mjs; test-v357-ios-voice-transport-recovery.mjs; test-v358-ios-score-universal-physical-recovery.mjs; test-v362-physical-voice-recovery.mjs; test-v367-universal-voice-in-place.mjs; test-update-check-errors.mjs; test-v407-r9-manual-update.mjs; test-project-quality-gate.mjs. PASS local. Los nombres de pruebas históricas que mencionan iPhone no significan que se ejecutaron en un dispositivo físico.

La API y generación de audio ya se probaron en el diagnóstico a3e03af662ddf89f9efe07f0b6ce4a2870a5c87d: 18 respuestas y seis audios. R32 no cambia esos manejadores. No se vuelve a ejecutar ese banco remoto sin un riesgo nuevo.

Pendiente al preparar esta versión: verificar la instalación real en navegador; reconocimiento y altavoz físico del iPhone. No se promete 90 % de equivalencia de contenido ni se afirma resuelto el saldo de la conexión directa.

Rollback: restaurar el commit/deployment anterior específico de cada proyecto (Main R31, LAB ce9a652). No borrar almacenamiento ni tarjetas.
