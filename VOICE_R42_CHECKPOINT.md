## Medición real 13 segundos y prioridad de voz · 17 septiembre 2026 UTC

El propietario reporta 13 segundos en `fc2a0a27805bbc6a658239193069df5473c6f8ee`, deployment `dpl_9YBUFom2khBxcFhfqX3Aed6GvY5E`. Logs de 02:47:45 UTC: `universal-answer-timing` mide 8493 ms y 627 caracteres; transcripción 962 ms; inicio de voz registrado 02:47:58. La mejora respecto al reporte previo de 21 s no satisface ≤2.75 s; no se infiere el tiempo preciso de TTS de marcas de eventos.

`api/universal-ai.js` solicita exclusivamente para respuestas vocales `service_tier: priority` en OpenAI directo y `providerOptions.gateway.speed: fast` en Gateway. Modelo, razonamiento, herramientas, instrucciones y lista de respaldos permanecen iguales. La documentación vigente del proveedor y su catálogo confirman Fast para `openai/gpt-5.6-sol`; Fast tiene tarifa superior (catálogo: 2× la tarifa estándar de ese modelo). Sólo se publica Preview; no se cambia facturación ni configuración de LAB/Maestro. El proveedor puede volver al nivel estándar si no hay capacidad rápida.

Se añade registro `universal-provider-timing` sin texto: tiempo, modelo y prioridad/velocidad realmente informadas por el proveedor, o null si no las informa. `test-universal-voice-latency-profile.mjs` exige prioridad sólo en voz, política textual intacta, misma capacidad/modelos/razonamiento y respaldo automático conservado; proveedores simulados, no certifica rapidez real. `VOICE_R42_CHECKPOINT.md` y `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` registran el pendiente; se renueva `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` antes de auditoría.

Referencias verificadas: https://vercel.com/docs/ai-gateway/models-and-providers/fast-mode y https://ai-gateway.vercel.sh/v1/models . Aceptación pendiente: medir misma pregunta, voz R42 0.90, dos turnos consecutivos y tiempo hasta primer sonido; no declarar ≤2.75 s por solicitar Fast. Rollback: Preview inmutable `fc2a0a2`. Mi navegador de pruebas permanece en acceso propietario y no tiene micrófono físico; no se solicita la contraseña por chat ni se eluden controles.

## Latencia reportada de 21 segundos · 17 septiembre 2026 UTC

Prueba del propietario: «Cómo funciona el botox para el dorsal ancho?», 21 segundos. El Preview `9dda012bd88106e6368a42b397931def4571a56d`, deployment `dpl_AK9wBA89qCG5N6cXd55L5fr7Cheg`, recibió una consulta universal a las 02:34:01 UTC; transcripción registrada de 1357 ms; síntesis a las 02:34:19 e inicio de reproducción a las 02:34:23. La correlación temporal no certifica duración exacta por etapa ni revela el texto de la consulta.

Hallazgo reproducible: la frase «cómo funciona» seleccionaba deep/medium aun en una pregunta breve por voz. `api/universal-ai.js` conserva el perfil textual y las peticiones explícitas de detalle, riesgos, comparación y análisis; sólo impide que esa frase por sí sola fuerce profundidad en voz. El caso exacto pasa de medium/1600 a low/700 tokens máximos en la petición vocal. Modelo, herramientas web, precauciones médicas y órdenes locales permanecen iguales. Un límite de tokens menor no demuestra un tiempo objetivo.

`api/universal-voice-response.js` agrega `universal-answer-timing` también para respuestas largas: milisegundos hasta texto, estado HTTP, número de caracteres y modo; sin registrar contenido ni datos personales. `test-universal-voice-latency-profile.mjs` compara el clasificador anterior y el nuevo, y ejecuta dos turnos reales del controlador con proveedor simulado. El transporte HTTP local y los contratos de calidad mantienen sus bancos existentes.

`VOICE_R42_CHECKPOINT.md` y `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` conservan evidencia y límites. Se renueva `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` para el candidato aislado. Pendientes: respuesta real posterior, latencia hasta sonido, calidad médica y conversación física consecutiva; no se afirma ≤2.75 segundos ni solución integral. LAB, Maestro, Actualizar, voz R42 0.90, cálculos y persistencia sin cambios. Rollback: volver al Preview inmutable de `9dda012` sin tocar aliases principales.

# R42: verificación independiente, 17 septiembre 2026

## Preparación de publicación aislada

Worktree de publicación: `epg-voice-release-20260917/repo`; rama `preview/universal-voice-20260917`. Los 145 paquetes funcionales del auditor existente pasan con Node 22 tras conservar la expresión original reglas/texto y actualizar exclusivamente la carga de dependencias de tres fixtures de voz. No se quitaron aserciones. Inventarios generados en una carpeta exclusiva. El control editorial y visual de 74 páginas pasó durante la auditoría; se ejecuta la auditoría completa final antes de crear la rama remota de Preview. Este registro precede al despliegue; la medición real e iPhone siguen pendientes.

Estado actual: borrador funcional aislado; NO es un candidato aprobado ni un despliegue.

## Cambio preparado posteriormente en esta rama

`api/universal-voice-response.js` compone los dos controladores existentes: entrega el texto y después audio R42 en una sola respuesta HTTP para textos inferiores a 260 caracteres. `index-grupal.html` consume ese audio sin pedir una segunda síntesis. Las respuestas largas conservan su ruta previa. No es streaming nativo de Fish: el proveedor aún entrega el archivo completo. No se cambió el modelo, idioma o velocidad. La identidad fija sigue pendiente.

Comparación reproducible:

```sh
git show ccffefb81e1957e40f8c7e9782c8ac18bd0488a7:index-grupal.html > /tmp/epg-universal-before.html
node test-universal-voice-response.mjs /tmp/epg-universal-before.html
node test-r42-voice-configuration.mjs
node scripts/project-quality-gate.mjs
node test-project-quality-gate.mjs
node test-v367-universal-voice-in-place.mjs
node test-v357-synchronized-progressive-voice.mjs
```

Resultados: PASS en estos comandos. HTTP local real con proveedores y reproducción simulados: dos turnos, texto disponible antes de terminar la síntesis, una petición de respuesta+audio por turno en vez de dos; errores de audio, cancelación, stream truncado, rechazo y texto largo. Sintaxis del HTML PASS. Fuera de `speakAiUniversalText`, `submitAiUniversalText` y la nueva `readUniversalVoiceResponse`, el HTML coincide byte por byte con la base.

Incidencia de verificación: una ejecución con cancelación terminó con código 139 después de imprimir sus aserciones satisfactorias. No se demostró la causa. Se retiró el contexto VM separado únicamente del lector HTTP en el banco de pruebas; dos ejecuciones posteriores completas terminaron con código 0. Requiere confirmar estabilidad con Node 22, versión del proyecto, y navegador real. El entorno local usa Node 24.19.0.

Verificación posterior con Node 22.23.2, versión mayor declarada por el proyecto: `npx --yes --package=node@22 node test-universal-voice-response.mjs /tmp/epg-universal-before.html` y la prueba R42 terminaron con código 0. Incluye cancelación real de HTTP local. La causa del código 139 anterior de Node 24 no se considera demostrada. `api/voice-speech.js` y `service-worker.js` siguen idénticos a la base.

El primer control documental falló porque el clon era superficial; se recuperó el historial sin cambiar la base y después pasaron el control y sus pruebas negativas. ROADMAP GATE también pasó. Esto no representa una auditoría integral ni validación iPhone. No se ejecutó regeneración global de inventarios ni auditoría de módulos ajenos al alcance. No hay Preview publicado de este borrador. Tiempo físico 11 s → 2.75 s NO demostrado.

La ausencia de credenciales locales no demuestra que falten en Vercel: este cambio reutiliza la conexión ya configurada del despliegue. Para verificarlo en servicio hace falta un Preview que pase los controles de publicación y luego una medición real. No se requiere contratar otro proveedor para probar esta mejora parcial.

## Diagnóstico anterior, conservado como antecedente

- Rama: `fix/universal-voice-latency-20260917`.
- Base: `ccffefb81e1957e40f8c7e9782c8ac18bd0488a7`.
- Copia independiente: `epg-voice-latency-20260917`.
- Se retira el experimento local `api/universal-speech.js`: exigía una variable de identidad no configurada y no correspondía a la orden de conservar R42. Nunca se conectó al cliente ni se publicó.
- En ese punto anterior el código de la aplicación coincidía con la base. La sección superior describe el cambio posterior.

## Evidencia de voz

`Intocables/CONFIRMACION_ESCRITA_V378.md`, línea 14, documenta Fish Audio `fish-audio/s2.1-pro-free`, `es-419`, sin ID fijo, velocidad exacta `0.90`. El controlador `api/voice-speech.js` y el cliente actual conservan esa configuración; el reproductor usa `playbackRate=1`.

Reproducción independiente:

```sh
node test-r42-voice-configuration.mjs
git diff ccffefb81e1957e40f8c7e9782c8ac18bd0488a7 -- api/voice-speech.js
```

Resultado: 100 llamadas simuladas al controlador real mantienen modelo, idioma y velocidad. El segundo comando no muestra cambios. Se simulan autorización y proveedor; el resultado NO prueba reconocimiento, vocabulario, calidad audible, identidad estable, micrófono ni latencia real. No son 100 preguntas contestadas por la aplicación.

Sin identificador de hablante, conservar R42 no demuestra que el proveedor devuelva la misma identidad entre preguntas o fragmentos. El registro `locked:true` del servidor tampoco lo demuestra.

## Latencia: pendiente

Referencia del propietario: 11 segundos. Objetivo solicitado: 2.75 segundos o menos. No se ha demostrado una mejora.

El cliente espera transcripción, respuesta y síntesis; la síntesis recibe audio completo en base64 antes de reproducir. Ya existe división de respuestas largas en fragmentos; no se presenta esa función existente como una corrección nueva.

`middleware.js` verifica acceso mediante `/api/app-access?action=status` por petición protegida. Esto explica consultas repetidas; no demuestra cuánto tiempo aportan. No se modificó autorización.

Los eventos de voz consultados registraban `elapsedMs:0`, salvo la transcripción de un turno (1300 ms). Las marcas de los logs no se deben presentar como una medición exacta de cada etapa ni como prueba de la pregunta concreta del propietario.

## Bloqueos comprobados

- Navegador real, LAB R42 autenticado: la pantalla muestra `MICRÓFONO NO DISPONIBLE`; no se pudo realizar una conversación física.
- Copia local: no dispone de `AI_GATEWAY_API_KEY`, `VERCEL_OIDC_TOKEN` ni `FISH_AUDIO_API_KEY`; no se solicitaron ni expusieron secretos.
- No se dispone de iPhone físico controlable desde este entorno.

Para comprobar la meta y una corrección real hace falta ejecutar audio en un entorno autorizado con micrófono/proveedor y medir liberación del botón, fin de transcripción, respuesta disponible, audio disponible y comienzo de reproducción. Deben incluirse primera y segunda preguntas, voz audible y recuperación. La comprobación física de iPhone sigue separada.

No se fusionó, publicó ni cambió LAB, Maestro, bases compartidas, Actualizar, registro, cálculos o persistencia. Los controles ejecutados posteriormente están enumerados arriba; no se declara resolución.
