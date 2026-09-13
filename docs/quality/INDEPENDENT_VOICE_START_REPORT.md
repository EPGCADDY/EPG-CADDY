# EPG Caddy — investigación independiente de segunda escucha

13 de septiembre de 2026. Estado: corrección defensiva aislada; NO RESUELTO FÍSICAMENTE, NO APROBADO PARA INTEGRAR O PUBLICAR.

## Aislamiento y fuente

- Base remota consultada por GitHub y sincronizada por `git fetch origin main`: `ccdd004b361bd84dd5936aa069c7722b13b5659f` (R36).
- Rama local: `investigate/voice-second-turn-0e02215`.
- Worktree: `/workspace/scratch/0e02215cc70b/epg-voice-independent`.
- Directorio Git común propio: `/workspace/scratch/0e02215cc70b/epg-independent-repo/.git`, obtenido con clonación `--no-hardlinks`. No comparte índice, referencias ni objetos físicos con la copia de la otra conversación.
- No se ejecutó push, merge, despliegue ni petición a bases de datos o APIs compartidas. No se modificaron archivos de la otra conversación. Las dependencias se copiaron para ejecutar pruebas localmente; no se enlazaron directorios ajenos.
- Los antecedentes R36 de reapertura y liberación de captura se tomaron como hipótesis. La base actual ya supera el ciclo normal de dos preguntas en simulación.

## Hallazgo demostrado y alcance de la corrección

`beginBrowserVoiceRecognition()` llamaba `recognition.start()` sin instalar una vigilancia previa. El plazo de ocho segundos se activaba únicamente en `onstart`. Si la segunda instancia aceptaba `start()` pero no entregaba `onstart`, `onerror` ni `onend`, la aplicación conservaba `browserVoiceRequested=true` y la instancia indefinidamente, sin escuchar realmente.

La prueba negativa ejecuta primero una pregunta, conserva su respuesta escrita e inicia la reproducción simulada. Al terminar ese audio, inyecta exclusivamente la ausencia de eventos en la segunda apertura. La base falla la exigencia de liberar la captura a los 9,2 segundos. Esto demuestra una vulnerabilidad de la máquina de estados; NO prueba que Safari haya producido ese orden de eventos en el iPhone del propietario.

Cambio funcional: una sola llamada a `scheduleBrowserVoiceFirstResultTimeout(recognition,context)` inmediatamente antes de `recognition.start()`. Se reutilizan los plazos y el cierre existentes: ocho segundos sin resultado más 1,2 segundos de guardia de cierre. `onstart` normal renueva el plazo como antes, `onresult` lo cancela y el error síncrono de apertura también lo limpia.

Después de la corrección, la misma inyección libera la captura y muestra el error recuperable existente. Un callback tardío no resucita la instancia. Un nuevo toque permite responder la segunda pregunta y continuar con otra pregunta consecutiva. **La corrección permite recuperación manual; no convierte una apertura nativa fallida en escucha automática exitosa.**

Riesgo pendiente: comprobar en Safari/iPhone el comportamiento del plazo mientras está abierto el permiso inicial de micrófono y al reabrir desde el audio. No se modifican umbrales, parsers, escritores, persistencia, cálculo, voz del proveedor, Actualizar, release ni service worker.

## Evidencias y reproducción

Resultado de esta ejecución: 27 bancos/verificaciones PASS; auditoría integral FAIL por el sello protegido. ROADMAP PASS para los nueve archivos. Inventario FAIL por fuentes nuevas y tres PDF ausentes en esta copia aislada. Los fallos iniciales de dependencia se resolvieron y sus salidas se conservan por trazabilidad.

La salida completa está en `docs/quality/INDEPENDENT_VOICE_START_EVIDENCE.json`. Todas las pruebas Node son simulaciones o verificaciones de código, aunque algunos nombres históricos contengan “physical”.

Desde el worktree, con dependencias del repositorio instaladas:

```sh
git show ccdd004b361bd84dd5936aa069c7722b13b5659f:index-grupal.html > /tmp/epg-independent-before.html
VOICE_SOURCE=/tmp/epg-independent-before.html node test-independent-voice-start-timeout.mjs
# Esperado: exit 1, captura retenida después de 9,2 segundos.
node test-independent-voice-start-timeout.mjs
# Esperado: exit 0, recuperación, dos turnos posteriores y Detener.
node test-r34-audio-response.mjs
node test-r36-followup-events.mjs
node test-r36-capture-release.mjs
node test-r36-capture-permissions.mjs
node test-score-engine.mjs
node test-v365-active-round-empty-recovery.mjs
node test-v407-r9-manual-update.mjs
node audit-project.mjs
# Esperado en esta entrega: bloqueado por el sello de microfono_compartido.
```

Los bancos existentes R36 verifican 100 transiciones y 100 liberaciones simuladas. No son 100 conversaciones reales, ni reconocimiento nativo, ni escucha física del altavoz.

## Pendientes reales

1. Navegador real aislado: el navegador remoto rechazó `http://127.0.0.1:8769/index-grupal.html` con `net::ERR_BLOCKED_BY_CLIENT`. El runtime local tenía Playwright pero no Chromium; la descarga oficial agotó el tiempo de espera y se canceló. El servidor temporal se cerró. No se usó LAB como sustituto.
2. Micrófono/altavoz físico iPhone: sin prueba. Faltan primera pregunta y respuesta escrita/audible, segunda consecutiva, reanudación, interrupción y regreso desde segundo plano.
3. `Intocables/intocables-gate.mjs` bloquea la región `microfono_compartido`: hash aprobado `46665022535df378cac0c918cd17a8fd4ae09e9c51be3d671d3b158e9bb83850`; hash modificado `55923401fbea7340850b8b1366774da303ac36874cc782b7b1026dd47ad71000`. Se conserva el sello original. No se extiende una aprobación física histórica a esta corrección.
4. La auditoría integral queda detenida por ese sello; inventarios y los controles posteriores no equivalen a PASS. El inventario canónico no se resella como entrega aprobada. Los registros nuevos sí aparecen en ambos ROADMAPS.
5. Integración: requiere autorización del propietario y comparación contra el commit que entonces tenga la rama receptora. No integrar toda una rama antigua encima de trabajo concurrente; revisar el cambio funcional de una línea y su prueba.

Rollback del trabajo aislado: descartar este commit en una copia nueva o revertir exclusivamente su cambio; no se requiere rollback de Producción ni de datos. No se ha publicado ningún enlace de prueba.


## Actualización posterior a Autorizado
Integración preparada en rama propia integrate/voice-start-authorized-0e02215 sobre la misma base remota ccdd004, confirmada de nuevo por fetch. Se conserva la rama de investigación original. Intocables PASS después de registrar la autorización técnica y conservar el hash anterior; no se concede nueva aprobación física. Los FAIL del informe y JSON anteriores son evidencia histórica previa a esta autorización. Inventarios y auditoría se vuelven a ejecutar para esta integración. Navegador aislado e iPhone siguen pendientes; no se ha publicado ni fusionado main.

Resultado final de integración local: `node audit-project.mjs` terminó con código 0, **142 paquetes PASS**. También pasaron Intocables, inventario, ROADMAP y controles editorial/visual del manual. Salida íntegra conservada en `INDEPENDENT_VOICE_START_EVIDENCE.json`, campo `authorizedIntegration`. No cambia la limitación de navegador e iPhone; no se afirma solución física.
