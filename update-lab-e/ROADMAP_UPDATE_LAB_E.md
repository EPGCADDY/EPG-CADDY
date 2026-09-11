# UPDATE ARCHITECTURE E · iOS-FIRST LEDGER

Baseline protegida: V407-R33
Commit baseline: 5b85c63438b27fce53e2d0f6aa4e371bffc3c263
Rama: lab/update-architecture-e-ios-first

Arquitectura:
- Detección de release por /api/release fuera del Service Worker.
- Cache-Control no-store/no-cache para verdad de servidor.
- El lifecycle del Service Worker no es requisito para detectar ni activar una actualización.
- Navegación/recarga con cache-busting y verificación posterior.
- service-worker.js se usa sólo como puente de migración R33→E: retira caches antiguos y luego se desregistra.
- El HTML E se transforma sólo durante build mediante scripts/apply-update-e.mjs; la baseline R33 en Git no se reescribe.
- update-client-e.js reemplaza el listener del botón ACTUALIZAR después de cargar el HTML, consulta /api/release y preserva estado antes de recargar.
- /api/release y /update-client-e.js son los únicos recursos nuevos públicos necesarios para que la actualización no dependa de una sesión que pueda estar en transición.
- Todo recurso mutable del shell JavaScript/CSS debe servirse con no-store/must-revalidate; sólo los assets explícitamente versionados pueden permanecer immutable.
- candidate-index-grupal.html es el shell candidato aislado que scripts/apply-update-e.mjs transforma y publica; se autoriza únicamente para cambios funcionales LAB explícitos que no alteren la baseline protegida.

Archivos autorizados:
- api/release.js
- middleware.js
- service-worker.js
- vercel.json
- scripts/apply-update-e.mjs
- update-client-e.js
- index-grupal.html
- candidate-index-grupal.html
- update-lab-e/ROADMAP_UPDATE_LAB_E.md
- scripts/roadmap-gate.mjs
- .github/workflows/roadmap-gate.yml
- .github/workflows/lab-mic-r42-hotfix.yml

R41 · MICRÓFONO P0 · 11 de septiembre de 2026:
- candidate-index-grupal.html: conversación de un toque usa semantic_vad y reabre escucha automáticamente después de cada respuesta hablada.
- Registro, Scores, parsers, sensibilidad y captura V378 permanecen fuera del cambio y conservan su blindaje.
- scripts/apply-update-e.mjs + api/release.js: únicamente publicación R41 según carretera del actualizador INTOCABLE.
- Regresión técnica: contratos de conversación alineados con semantic_vad; sintaxis verificada y gate de Intocables mantiene INT-01…INT-05 en PASS.
- .github/workflows/roadmap-gate.yml
- .github/workflows/lab-mic-r42-hotfix.yml: única reparación CI autorizada es instalar dependencias declaradas antes de ejecutar test-v362; no cambia código de aplicación.
- Criterio de entrega: no solicitar prueba física en iPhone hasta que Vercel termine READY y el shell publicado confirme release R41 y contratos de conversación.
- Producción real y Main permanecen intocables.

Reglas:
1. Producción, Main y baseline/v407-r33-locked permanecen intactos.
2. No se solicita prueba física al usuario hasta completar pruebas técnicas y regresión LAB sin fallos.
3. Cualquier archivo adicional debe registrarse aquí antes o en el mismo cambio que lo introduce.
4. Arquitecturas C y D quedan descartadas y no se reutiliza su lifecycle waiting/installing como condición crítica.
5. middleware.js sólo puede exponer /api/release y /update-client-e.js para esta rama LAB E; no se alteran los controles de acceso restantes.
6. El worker de migración sólo puede borrar caches cuyo nombre empiece por gscg-mobile-; no toca localStorage, IndexedDB ni datos de ronda.
7. El parche de build debe abortar si no encuentra exactamente un meta gscg-release y un cierre </body>; no puede publicar una transformación parcial.
8. El HTML principal y todos los módulos mutables del shell deben revalidarse/no almacenarse para impedir mezcla de versiones después de retirar el Service Worker.

R42 · HOTFIX RESPUESTA AUDIBLE iPHONE · 11 de septiembre de 2026:
- Evidencia runtime R41: tres POST /api/universal-ai terminaron HTTP 200 y voice-health registró browser_fallback_query_answered, pero no browser_fallback_speech_started. La IA sí respondió; el bloqueo estaba entre respuesta textual y arranque de SpeechSynthesis.
- candidate-index-grupal.html: speakAiUniversalApprovedFemaleVoice ya no declara éxito al llamar speechSynthesis.speak(); espera onstart real. Si iOS no inicia audio en 1200 ms, cancela esa ruta y devuelve false para activar inmediatamente el TTS servidor ya existente.
- El umbral/captura V378, parsers de Registro/Scores y semantic_vad R41 no se modifican.
- scripts/apply-update-e.mjs + api/release.js publican R42 por el actualizador INTOCABLE.
- .github/workflows/lab-mic-r42-hotfix.yml es transporte temporal autocontenido y se elimina en el mismo commit funcional.

R43 · FALLBACK IA POST-TRANSCRIPCIÓN · 11 de septiembre de 2026:
- vercel.json: /api/universal-ai se enruta al backend R43 previamente probado y READY en golf-sc-gt-lab.vercel.app/api/universal-ai-r43.
- scripts/apply-update-e.mjs: publica V407-R43-DIRECT-UPDATE-20260911 y etiqueta visual V407 · R43 sin modificar update-client-e.js.
- api/release.js: anuncia V407-R43-DIRECT-UPDATE-20260911 para que el botón ACTUALIZAR detecte una release nueva.
- update-lab-e/ROADMAP_UPDATE_LAB_E.md: registra este cierre de carretera R43 dentro del aislamiento LAB E.
- Alcance protegido: update-client-e.js, V378, umbral, sensibilidad, micrófono, Main y baseline protegida permanecen intactos.
- Criterio mandatorio para futuras versiones: no declarar una versión lista para prueba física hasta confirmar proyecto epg-caddy correcto, build READY, alias epg-caddy.vercel.app, release nueva publicada y botón ACTUALIZAR visible en el enlace habitual.
