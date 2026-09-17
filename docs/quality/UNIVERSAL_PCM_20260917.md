## Voz sin texto · instrucción expresa 17 septiembre 2026

IMG_4084.jpeg: propietario rechaza texto en respuesta por voz y reporta 9 s. Base local 844da54/remota 612f797. Corrección limitada a showUniversalSpokenAnswer: PTT oculta párrafo y tarjeta completa, evitando recuadro vacío; modo texto recupera ambos. Pruebas PTT y error de reproducción se actualizan al requisito explícito, sin cambiar captura, cálculo ni persistencia.

Logs reales dpl_6Qsk1GGBkHymaj1JCjuUxGdsUpJd: ptt_1789686067695_3 answerMs=5189, firstAudioMs=8490, progressive=false; ptt_1789686093153_4 answerMs=6032, firstAudioMs=8893, progressive=false. El servidor entrega audio, pero eso no demuestra audibilidad física. Gateway sintetiza completo: 3301/2861 ms después del texto. No se afirma mejora de latencia; meta <3 s sigue incumplida. Acceso propietario bloquea la prueba autónoma completa; sin credenciales locales de proveedor. No reducir calidad cambiando modelo a ciegas. Rama Preview propia; Maestra/LAB intactos.

Archivos: index-grupal.html; test-ptt-independent-turns.mjs; test-r34-audio-response.mjs; docs/quality/UNIVERSAL_PCM_20260917.md; ROADMAP_OVERALL.md; ROADMAP_A_DETALLE.md; CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json.

## RC-PCM-REGRESSION · 17 septiembre 2026, 15:47 Guatemala

IMG_4037.jpeg confirma fallo físico de voz y recuadro vacío en Preview 543e5b4/dpl_31zUPHQ8RSs4YwrGkYuw2iyZdLLo. Servidor generó 486 y 448 caracteres en 4692 y 4551 ms; no registró PCM completado. Causa de texto verificada: showUniversalSpokenAnswer ocultaba el párrafo con PTT. Error de configuración verificado: respaldo Gateway openai/gpt-4o-mini-tts ausente del catálogo https://ai-gateway.vercel.sh/v1/models consultado hoy, reincidencia RC-032; no hay log upstream previo para certificar que fue el único fallo físico. Escape: proveedor simulado aceptaba un modelo inexistente y la prueba PTT exigía ocultar el texto.

Corrección: respaldo Gateway openai/tts-1, Onyx 0.90, PCM, sin instructions no soportadas; texto siempre visible en su tarjeta existente. Directo gpt-4o-mini-tts intacto; Gateway sigue buffered y no garantiza misma interpretación vocal que otro modelo aunque voice=onyx. Se registra código HTTP/modelo del fallo Gateway, nunca contenido ni secretos. Pruebas dirigidas de catálogo configurado, dos turnos simulados, cancelación, PTT y rechazo de reproducción con texto visible PASS. Menos de 3 segundos NO alcanzado; voz física posterior y proveedor real pendientes. Maestra/LAB oficial, DB, Actualizar y cálculos intactos. Base local eb198eb, remota 543e5b4. Rollback al commit base sólo del Preview propio.

Archivos: api/_lib/universal-pcm.js; index-grupal.html; test-universal-pcm.mjs; test-ptt-independent-turns.mjs; test-r34-audio-response.mjs; ROADMAP_OVERALL.md; ROADMAP_A_DETALLE.md; docs/quality/UNIVERSAL_PCM_20260917.md; CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md; CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json.

## Audio universal progresivo autorizado · 17 septiembre 2026

Rama aislada preview/universal-stream-20260917; base local 416b7308dace8bc04b64c992a88b1202b41092c2, árbol equivalente remoto f908d2d. Propietario autoriza sustituir R42 para priorizar latencia. No se incorpora el trabajo pendiente de invitaciones. Una síntesis gpt-4o-mini-tts/onyx, velocidad 0.90, PCM 24 kHz; entrega incremental directa OpenAI. Respaldo Gateway con mismo modelo y voz es buffered, se informa progressive=false. No se cambia api/voice-speech.js, cálculos, persistencia, Actualizar ni Maestra/LAB.

Cliente prepara AudioContext desde gesto, consume bloques con muestras partidas, cancela ante nueva escucha/Detener/silenciar/segundo plano, rechaza reproducción tardía y termina una sola vez. Rama activa sólo si AudioContext listo y respuesta <=4000 caracteres; clientes incompatibles y respuestas superiores conservan vía anterior. El texto completo se valida antes de sintetizar: demora LLM aún se suma. Marcas PCM significan programación de audio, no audibilidad física. No afirmar voces uniformes fuera de la nueva ruta.

Pruebas reproducibles: node test-universal-pcm.mjs; node test-universal-voice-response.mjs; node test-universal-stream-overlap.mjs. Proveedores y AudioContext simulados, dos turnos de controlador/decodificador reales; prueba demuestra primeros bytes antes de EOF, no rapidez real. Navegador local bloqueado ERR_BLOCKED_BY_CLIENT; iPhone, proveedor real, menos de 3 segundos y reducción al 25% PENDIENTES. No hay claves de proveedor en entorno local. Rollback: commit base; Preview/Producción no declarados corregidos.

Archivos: api/_lib/universal-pcm.js; api/universal-voice-response.js; universal-pcm-player.js; index-grupal.html; test-universal-pcm.mjs; test-universal-voice-response.mjs; test-universal-stream-overlap.mjs; audit-project.mjs; docs/quality/UNIVERSAL_PCM_20260917.md; ROADMAP_OVERALL.md; ROADMAP_A_DETALLE.md; CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json.

Referencia técnica: https://developers.openai.com/api/docs/guides/text-to-speech (PCM firmado 16 bits little-endian 24 kHz y streaming). Gateway: https://vercel.com/docs/ai-gateway/modalities/text-to-speech (respuesta base64 completa). No hay un parámetro que garantice 2 segundos. Última medición anterior registrada: texto 4264 ms, TTS 4970 ms; no corresponde a este candidato.

Revisión pendiente: medir desde soltar micrófono al inicio audible, al menos dos preguntas consecutivas, muestra de clima/tráfico/general, comparar mismo dispositivo/red y registrar mediana/p95; confirmar timbre/acentos y recuperación. La conexión directa necesita OPENAI_API_KEY válida en el despliegue; no solicitar valores por chat. Respaldo Gateway no cumple streaming y debe medirse por separado.
