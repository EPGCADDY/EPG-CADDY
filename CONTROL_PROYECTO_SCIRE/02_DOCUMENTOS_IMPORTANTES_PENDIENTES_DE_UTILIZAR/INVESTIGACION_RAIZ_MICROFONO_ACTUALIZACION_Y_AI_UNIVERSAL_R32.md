# INVESTIGACIÓN DE CAUSA RAÍZ: MICRÓFONO, ACTUALIZACIÓN Y AI UNIVERSAL

## Resumen ejecutivo

La evidencia disponible no respalda seguir ajustando un umbral único ni añadir otro parche al botón ACTUALIZAR. El problema es arquitectónico.

La aplicación utiliza rutas distintas de captura, transcripción, control de turnos, respuesta y voz según la pantalla. Registro funciona mejor porque su tarea es corta, estructurada y local; Score Card y AI UNIVERSAL mezclan captura continua, temporizadores, detección de silencio, clasificación de intención, herramientas, síntesis y recuperación. Un mismo valor `threshold=0.2` no puede resolver de forma fiable todos esos contextos.

ACTUALIZAR tiene una carrera asíncrona reproducible: el cliente envía `PROMOTE_BUILD` al Service Worker y navega inmediatamente, sin esperar confirmación de que el candidato fue copiado, activado y tomó control. La experiencia física R31 a R32 -primer toque dejó R31 y segundo toque llegó a R32- es coherente con esa carrera.

La recomendación es una arquitectura híbrida y verificable:

1. Un solo controlador de captura de audio compartido.
2. Dictado operativo con cierre explícito/determinista para Registro y Score Card.
3. `semantic_vad` para conversación libre en AI UNIVERSAL.
4. Separación entre captura, transcripción, razonamiento y síntesis.
5. Una sola voz femenina aprobada, sin rutas masculinas ni sustitución silenciosa.
6. Actualización transaccional con manifiesto firmado, staging completo, ACK del worker, `controllerchange`, una recarga y verificación posterior.
7. Pruebas conductuales reales; una inspección de cadenas o expresiones regulares nunca vuelve a llamarse prueba física.

Estado de este documento: investigación y especificación técnica. No declara PASS físico, no autoriza Maestro y no afirma que la nueva arquitectura ya esté implementada.

## Alcance y entorno

- Proyecto: Golf Score Card GT / EPG Caddy.
- Base examinada: V407-R32.
- Rama local: `lab/v407-r32-manual-update`.
- Commit de inicio del análisis: `e129e2b0fdfc61471b472f5ff74e81988a3045d9`.
- Commit LAB R32 desplegado: `a4b1cec9e1380d8a5b72080477cad97080ab0cce`.
- Alias LAB: `https://golf-sc-gt-lab.vercel.app`.
- Maestro/Producción: no modificado durante esta investigación.
- Entorno de ejecución: inspección de código, pruebas Node y documentación técnica oficial. No se controló un iPhone físico.
- Evidencia física utilizada: capturas y relato aportados por el propietario. Esa evidencia demuestra el fallo observado, pero no convierte esta ejecución en prueba física propia.

## Hallazgos del código actual

### 1. Umbral único para tareas distintas

`index-grupal.html` y `candidate-index-grupal.html` fijan:

- `ROUND_VAD_THRESHOLD=0.2`
- `ROUND_VAD_PREFIX_MS=700`
- `ROUND_VAD_SILENCE_MS=1000`
- `CONVERSATION_VAD_SILENCE_MS=1100`

Los perfiles operativo y conversacional usan `server_vad`; sólo difieren en 100 ms de silencio. Según OpenAI, `server_vad` segmenta por silencio, el umbral alto exige una voz más fuerte y `silence_duration_ms` decide cuándo cerrar el turno. `semantic_vad`, en cambio, estima si el usuario terminó por el contenido y es menos propenso a interrumpir o cortar antes de tiempo.^1

Conclusión: no existe una configuración universalmente correcta. Registro, score corto y conversación libre necesitan contratos de turno diferentes.

### 2. Registro no prueba que todo el micrófono esté bien

Registro tiene vocabulario y estructura limitados: nombre, handicap y marcas. Score Card añade jugador, hoyo, gross, omisiones, correcciones, cierres de vuelta y acumulados. AI UNIVERSAL añade conversación abierta, herramientas, historial, interrupción y voz de salida. Aunque compartan partes del transporte, no comparten la misma complejidad ni el mismo cierre de turno.

La diferencia observada en iPhone es consistente con el software: el buen comportamiento de Registro descarta una explicación general del tipo “el iPhone no oye”, pero no demuestra que las otras rutas tengan estados y temporizadores correctos.

### 3. AI UNIVERSAL reduce expresamente la profundidad por voz

`api/universal-ai.js` asigna hasta 3,200 tokens a consultas profundas por texto, pero en modo voz divide el límite por dos. Además, instruye normalmente responder en tres a seis oraciones. Por eso una pregunta idéntica puede recibir una contestación más corta sólo por haber entrado por micrófono.

Conclusión: la baja profundidad no depende únicamente del modelo. Está impuesta por la política de producto actual y debe eliminarse. La profundidad debe seguir la intención, no el canal de entrada.

### 4. La voz actual contradice el candado solicitado

`api/voice-speech.js` fija `VOICE="onyx"`, `GATEWAY_VOICE="s2.1-es-419"` e instrucciones de “locutor masculino adulto”. La interfaz también muestra “PREPARANDO LOCUTOR MASCULINO” y “VOZ MASCULINA NO DISPONIBLE”. Esto contradice el requisito mandatorio de usar la misma voz femenina del Manual en todas las respuestas.

Conclusión: el candado documental existe, pero la implementación uniforme está pendiente. Ningún PASS de voz completa es válido hasta identificar técnicamente la voz del Manual y demostrar que todas las rutas usan esa misma identidad.

### 5. ACTUALIZAR contiene una carrera asíncrona

`installMandatoryUpdate()` ejecuta `postMessage({type:"PROMOTE_BUILD"})` y acto seguido `location.replace(...)`. El Service Worker procesa `promoteCandidate()` de manera asíncrona. El cliente no recibe ACK, no espera `controllerchange` y no verifica tras la recarga que el meta release y el hash esperado sean los nuevos.

El resultado observado R31 a R32 -dos avisos y dos toques- concuerda con este orden: la primera navegación puede ocurrir antes de terminar la promoción; al segundo intento el candidato ya quedó copiado.

Los Service Workers ofrecen mecanismos explícitos para activar un worker en espera, reclamar clientes y detectar cambio de controlador. `skipWaiting()` fuerza al worker en espera a avanzar y MDN recomienda combinarlo con `Clients.claim()` cuando se necesita efecto inmediato.^2 El evento `controllerchange` permite que la página espere el cambio real antes de recargar.^3

### 6. Las pruebas actuales sobreafirman su alcance

- `test-v362-physical-voice-recovery.mjs` lee archivos y valida patrones; no abre un micrófono ni usa un iPhone.
- `test-v320-universal-100-domains.mjs` comprueba que cien rótulos no sean secuestrados por parsers locales; no ejecuta cien consultas reales ni evalúa calidad de respuestas.
- `test-v407-r32-owner-only-update.mjs` verifica que existan `PROMOTE_BUILD` y archivos candidatos; no reproduce la transición de un navegador persistente ni comprueba el primer toque.

Conclusión: esas pruebas son útiles como controles estáticos, pero sus nombres y mensajes PASS no pueden usarse como evidencia física o conductual. Deben reclasificarse.

## Comparación de alternativas para micrófono y conversación

| Alternativa | Fortalezas | Riesgos | Encaje recomendado |
|---|---|---|---|
| Web Speech API del navegador | Implementación simple; dictado básico | Disponibilidad limitada; comportamiento dependiente del navegador; puede usar servicio remoto del navegador^4 | Sólo respaldo visible, nunca motor principal |
| OpenAI `server_vad` | Baja complejidad; eventos de inicio/fin; parámetros de umbral y silencio | Un solo umbral no se adapta a pausas, ruido y conversación larga | Dictado breve sólo si se calibra por perfil y se mide |
| OpenAI `semantic_vad` | Menos cortes prematuros; decide por completitud semántica^1 | Puede esperar más; no sustituye validación operativa | Opción principal para AI UNIVERSAL |
| OpenAI transcripción con commit explícito | El cliente decide exactamente el final del turno; elimina el silencio como árbitro único^5 | Requiere una interacción clara y manejo de estados | Opción principal para órdenes de Registro y Score Card |
| Deepgram Nova/Flux | Endpointing configurable, interim results, eventos VAD; permite lógica propia | Añade proveedor, costo y nueva superficie operativa; `UtteranceEnd` puede dispararse aunque el hablante continúe^6 | Candidato de benchmark, no migración inmediata |
| Google Cloud STT | Eventos de actividad y timeouts configurables | Añade proveedor y no resuelve por sí solo razonamiento/voz/estado de app | Candidato de benchmark |
| Azure Speech | SDK y reconocimiento continuo maduros | Dependencia adicional; integración web/iOS distinta | Candidato de benchmark |
| Apple Speech nativo | Integración directa con iOS y control nativo de audio | Requiere aplicación nativa; no conserva la misma PWA web como única plataforma | Fase futura si se empaqueta app nativa |

## Arquitectura recomendada para LAB

### Controlador único de audio

Crear un `VoiceCaptureController` compartido por Registro, Score Card y AI UNIVERSAL. Debe ser la única autoridad sobre:

- permiso y apertura del micrófono;
- pista `MediaStream` activa;
- estados `IDLE`, `STARTING`, `LISTENING`, `COMMITTING`, `PROCESSING`, `SPEAKING`, `RECOVERING`, `ERROR`;
- cancelación, interrupción y cierre;
- telemetría de nivel RMS, ruido base, eventos VAD y latencias;
- garantía de una sola captura y una sola reproducción simultáneas.

No debe almacenar audio ni transcripciones en telemetría de salud. Sólo métricas y códigos de estado.

### Perfil operativo: Registro y Score Card

Usar `gpt-live-transcribe` con `turn_detection:null` y commit explícito. La documentación oficial permite desactivar detección automática y enviar `input_audio_buffer.commit` cuando el cliente decide cerrar el turno.^5

Contrato propuesto:

1. Un toque abre y muestra `ESCUCHANDO`.
2. El usuario dicta sin necesidad de gritar.
3. Un segundo toque o una pausa local robusta confirmada cierra y hace commit.
4. `RESPONDIENDO` significa procesamiento real, no espera indefinida.
5. La orden se valida contra el vocabulario operativo antes de escribir.
6. Si no es válida, no cambia ningún dato y regresa a estado disponible.

Para una experiencia manos libres se puede evaluar un cierre local adaptable basado en ruido de fondo + palabras finales, pero el commit explícito debe quedar siempre disponible y probado.

### Perfil conversacional: AI UNIVERSAL

Usar una sesión Realtime persistente con `semantic_vad`, interrupción real y conservación de contexto. OpenAI describe estas sesiones como interacciones con estado y permite actualizar parámetros mediante `session.update`; la voz queda fijada después del primer audio.^7

Cambios obligatorios:

- quitar la reducción de tokens por `responseMode="voice"`;
- eliminar la regla fija de tres a seis oraciones cuando la pregunta es profunda;
- conservar profundidad, herramientas, fuentes y contexto independientemente del canal;
- permitir barge-in: al detectar habla nueva, detener el audio anterior y responder al nuevo turno;
- medir tiempo a `speech_started`, transcript final, primer token, primer audio y fin;
- usar la misma voz femenina aprobada desde el primer audio de cada sesión.

### Voz femenina intocable

La voz del Manual debe identificarse por proveedor, modelo, `voice_id` o `voiceURI`, parámetros y una muestra maestra con SHA-256. Después:

- una sola función `speakApprovedFemaleVoice()` para Manual, cierres, Score Card y AI UNIVERSAL;
- prohibición automatizada de `onyx`, “locutor masculino” y síntesis alternativa no aprobada;
- si el proveedor falla, mostrar error honesto y conservar texto; no sustituir por otra persona/voz;
- prueba de identidad por encabezado/metadata más comparación auditiva humana fechada.

## Arquitectura recomendada para ACTUALIZAR

El cambio de versión debe tratarse como una transacción de dos fases.

### Fase 1: preparar sin instalar

1. Publicar `/version.json` con `release`, commit completo, SHA-256 del shell y URL del artefacto; encabezado `Cache-Control: no-store`.
2. Descargar el candidato a un caché temporal con nombre inmutable.
3. Verificar todos los recursos y hashes.
4. Sólo después de staging completo mostrar ACTUALIZAR verde.

### Fase 2: promover después del toque

1. Guardar y verificar la ronda/borrador.
2. Enviar `PROMOTE_BUILD` con `MessageChannel` y nonce.
3. El worker copia de forma atómica, valida release/hash y responde `PROMOTION_READY`.
4. Si hay worker en espera, pedir `SKIP_WAITING` y esperar `controllerchange`.
5. Recargar una sola vez el mismo dominio.
6. Tras cargar, comprobar meta release, commit/hash y datos persistidos.
7. Mostrar `ACTUALIZADO` únicamente después de esa comprobación.
8. Ante timeout o hash incorrecto, mantener la versión anterior y mostrar un error; nunca fingir éxito.

Cambiar de Vercel a otro hosting no corrige la carrera del Service Worker. El proveedor puede influir en cabeceras y CDN, pero el defecto actual está en la coordinación cliente-worker y debe resolverse allí.

## Banco de pruebas obligatorio

### Micrófono

- Fixtures de audio reproducibles: voz suave, normal, fuerte, pausas cortas/largas, ruido de campo, viento, acentos y nombres reales anonimizados.
- Registro: seis jugadores, corrección y dictado incompleto.
- Score Card: uno a seis jugadores; hoyos consecutivos; omisiones; corrección; cierre 9/18; interrupción.
- AI UNIVERSAL: 30 turnos, cambios de tema, consulta profunda, herramientas, silencio, barge-in y recuperación de red.
- Criterios: cero escritura falsa; cero estado rojo/silencioso bloqueado; primera captura usable; profundidad igual por texto y voz; una sola voz femenina.
- Dispositivo: automatización de navegador para lo automatizable y prueba física final separada en iPhone. Nunca denominar física a la automatización.

### ACTUALIZAR

- Perfil persistente único sobre el alias estable.
- Cuatro deployments READY A a B a C a D.
- Tres transiciones, cada una con exactamente un aviso y un toque.
- Confirmar antes/después: ronda, Historial, jugador, score, WhatsApp y release.
- Capturas completas, consola, red, timestamps, deployment, commit y SHA-256.
- Pruebas negativas: candidato incompleto, hash erróneo, red cortada, ACK perdido y worker antiguo.
- Criterio: ningún estado `ACTUALIZADO` antes de verificar el release nuevo.

## Decisión técnica

No se recomienda sustituir todo por otra plataforma sin benchmark. La opción de menor riesgo y mejor ajuste es:

- mantener Vercel como hosting;
- corregir ACTUALIZAR con protocolo transaccional y verificación;
- mantener OpenAI Realtime para captura/transcripción, pero dividir perfiles;
- commit explícito para operaciones;
- `semantic_vad` para conversación;
- Responses API para profundidad y herramientas sin penalización por voz;
- síntesis dedicada con la voz femenina aprobada;
- Deepgram, Google y Azure como comparadores medidos con el mismo corpus antes de considerar migración.

Esta decisión se basa en la causa observada y en las capacidades oficiales, no en preferencia de proveedor. Si el benchmark del corpus físico muestra peor tasa de finalización o latencia que una alternativa, la selección deberá cambiar con esos resultados.

## Criterios de salida para una nueva versión LAB

La versión candidata no puede presentarse al propietario mientras falte cualquiera de estos puntos:

1. Primer toque de ACTUALIZAR probado en A a B a C a D.
2. Cero navegación antes del ACK.
3. Versión/hash verificados después de recargar.
4. Registro y Score Card aceptan voz suave sin depender de un único umbral global.
5. AI UNIVERSAL completa 30 turnos y preguntas profundas sin recorte por voz.
6. Interrupción cancela audio anterior sin perder el nuevo turno.
7. Misma voz femenina en el 100% de rutas habladas examinadas.
8. Cero “PASS físico” originado sólo en lectura de código.
9. Evidencia automática reproducible y puerta física iPhone claramente separadas.
10. Maestro/Producción intacto.

## Limitaciones actuales

- No se ejecutó micrófono físico desde esta sesión.
- No se dispone todavía de la identidad técnica comprobada de la mujer del Manual.
- No se ejecutó aún el benchmark acústico común entre OpenAI, Deepgram, Google y Azure.
- No se implementó todavía la arquitectura propuesta.
- No existe aún evidencia A a B a C a D posterior a la corrección.

## Fuentes

1. OpenAI. [Voice activity detection (VAD)](https://developers.openai.com/api/docs/guides/realtime-vad). Consultado el 10 de septiembre de 2026.
2. MDN Web Docs. [ServiceWorkerGlobalScope: skipWaiting()](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/skipWaiting). Consultado el 10 de septiembre de 2026.
3. MDN Web Docs. [ServiceWorkerContainer: controllerchange](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/controllerchange_event). Consultado el 10 de septiembre de 2026.
4. MDN Web Docs. [SpeechRecognition](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition). Consultado el 10 de septiembre de 2026.
5. OpenAI. [Realtime transcription](https://developers.openai.com/api/docs/guides/realtime-transcription). Consultado el 10 de septiembre de 2026.
6. Deepgram. [Utterance End](https://developers.deepgram.com/docs/utterance-end) y [Endpointing](https://developers.deepgram.com/docs/endpointing). Consultado el 10 de septiembre de 2026.
7. OpenAI. [Realtime conversations](https://developers.openai.com/api/docs/guides/realtime-conversations). Consultado el 10 de septiembre de 2026.
8. Google Cloud. [Voice activity events and timeouts](https://docs.cloud.google.com/speech-to-text/docs/voice-activity-events). Consultado el 10 de septiembre de 2026.
9. Microsoft. [Speech recognition with the Speech SDK](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-recognize-speech). Consultado el 10 de septiembre de 2026.
10. Apple Developer. [Speech framework](https://developer.apple.com/documentation/speech). Consultado el 10 de septiembre de 2026.
