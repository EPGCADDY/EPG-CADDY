# Matriz de cobertura funcional del Manual SCG V311

Estado: **en verificación**. Ninguna afirmación de cobertura total es válida hasta que la auditoría maestra, el control visual, la prueba semántica y las simulaciones de recuperación obtengan PASS sobre el mismo artefacto.

## Funciones vigentes y página donde se explican

| Función del usuario | Página principal | Recuperación o atasco | Prueba técnica relacionada |
|---|---:|---:|---|
| Selección de campo, modalidad y torneo | 01 | 36 | `test-v272-definitive-operational-release.mjs` |
| Registro General por voz o manual | 02 y 17 | 37 | `test-v305-registration-guides-parser-truth.mjs` |
| Confirmación antes de iniciar | 03 | 36 | `test-v304-homogeneous-registration-actions.mjs` |
| Registro Stableford | 04 | 36–37 | `test-v252-stableford-persistence-category-course.mjs` |
| Score Card - Práctica | 05 | 38–40 | `test-score-engine.mjs` |
| Ronda General | 06 | 38–42 | `test-v267-scorecard-combination-matrix.mjs` |
| Control Manual, ENTER, hoyos y X | 07 y 19 | 39–40 | `test-v276-manual-hole-navigation.mjs` |
| Match Play de una o dos parejas | 08 | 40, 42 y 48 | `test-v306-match-play.mjs` |
| Four Ball de una o dos parejas | 09 | 40 y 49 | `test-v309-four-ball.mjs` |
| Información de siete campos | 10–16 | 36 | `test-course-catalog.mjs` |
| Dictado de scores y avance automático | 18 | 38–40 | `test-v270-consecutive-hole-voice-blocks.mjs` |
| Gross, HDCP, Neto, +/−, OUT, IN y TOTAL | 20 | 39–40 | `test-score-engine.mjs` |
| Consultas por voz de hoyo, vuelta y total | 21 | 38 | `test-voice-continuity.mjs` |
| Inicio, TIMER, micrófono y apagado por 30 minutos sin instrucciones | 22 | 47 | `test-round-clock.mjs` y `test-v311-timer-inactivity.mjs` |
| Ronda Previa, Ronda Actual y persistencia | 23 | 41 | `test-v253-live-previous-round.mjs` |
| Nueva Ronda y Borrar Scores | 24 | 41 y 50 | `test-v289-stableford-new-round-empty.mjs` |
| Atrás, revisar datos y + Jugador | 25 | 41 | `test-v263-compact-players-back-button.mjs` |
| Tarjeta Digital Global y personal | 26 | 42 | `test-card-artifacts.mjs` |
| Finalización y cierre oficial | 27 | 42 | `test-round-closure.mjs` |
| Imagen, PDF, PDF TODAS y compartir | 28 | 43 | `test-v278-card-image-pdf-export.mjs` |
| Corrección oficial y original preservado | 29 | 42 | `test-v277-official-round-corrections.mjs` |
| Historial y filtros | 30 | 44 | `test-v279-local-card-library.mjs` |
| Estadísticas históricas | 31 | 45 | `test-v280-local-history-insights.mjs` |
| Resultado oficial Stableford | 32 | 45 | `test-stableford.mjs` |
| Cuenta, respaldo y recuperación | 33 | 46 | `test-v282-optional-account-backup.mjs` |
| Instalación, modo sin conexión y actualización | 34 | 47 | `test-v281-pwa-installation.mjs` |
| Seguridad, límites y glosario | 35 | 50 | `test-no-automatic-x.mjs` |
| Registro hablado General: frase, números y marcas | 51 y 53 | 70 | `test-v305-registration-guides-parser-truth.mjs` |
| Corrección, alta y baja de jugadores por voz | 52 | 70 | `test-v311-manual-voice-map.mjs` |
| Registro hablado Stableford y Práctica | 54–55 | 37 y 70 | `test-v305-registration-guides-parser-truth.mjs` |
| Score por dígito, número hablado u hoyo explícito | 56–57 | 38–40 y 70 | `test-v267-one-operational-line.mjs` |
| Vocabulario oficial Águila–Doble Par | 58 | 38 y 70 | `test-v311-manual-voice-map.mjs` |
| X, Equis, Sin Score y Sin Resultado | 59 | 39–40 | `test-no-automatic-x.mjs` |
| Preguntas por hoyo y varios hoyos | 60 | 70 | `test-v311-manual-voice-map.mjs` |
| Acumulado, marcador y resultado actual | 61 | 70 | `test-v311-manual-voice-map.mjs` |
| Alcances: primera/segunda vuelta, hasta hoyo y rango | 62 | 70 | `test-v311-manual-voice-map.mjs` |
| Líder, posiciones y comparación | 63 | 70 | `test-v311-manual-voice-map.mjs` |
| Birdies, pares, bogeys, pendientes y tiros recibidos | 64 | 70 | `test-v311-manual-voice-map.mjs` |
| Historial hablado/escrito y filtros combinables | 65–66 | 45 y 70 | `test-v280-local-history-insights.mjs` |
| Reporte hablado Match Play en español | 67 | 48 y 70 | `test-v306-match-play.mjs` |
| Reporte hablado Four Ball en español | 68 | 49 y 70 | `test-v309-four-ball.mjs` |
| Navegación hablada y STOP | 69 | 70 | `test-v311-manual-voice-map.mjs` |
| Error de voz y recuperación sin pérdida | 70 | 38–40 y 50 | `test-v311-manual-voice-map.mjs` |
| Mapa de capacidades y significado de respuestas | 71–72 | 70 | `test-v311-manual-semantic-coverage.mjs` |
| Índice por categorías y lupa con preguntas completas | Visor web | 71–72 | `test-v311-manual-search.mjs` |
| Asistente de micrófono para ayuda y navegación segura | 69 y 71–72 | 70 | `test-v311-voice-assistant.mjs` |
| Caddie universal, clima futuro, Web viva, fuentes e interrupción hablada | 73 | 70 | `test-v312-general-caddie.mjs` |
| Inclusión del asistente en el paquete móvil | Aplicación instalada | 47 | `test-v311-voice-assistant.mjs` y `test-v284-native-package-generation.mjs` |

## Combinaciones mínimas que deben permanecer probadas

- General y Stableford.
- Práctica con perfil y sin perfil.
- Match Play con dos o cuatro jugadores.
- Four Ball con una o dos parejas.
- Voz y Control Manual escribiendo en la misma arquitectura.
- Uno a seis jugadores cuando la modalidad lo permite.
- Hoyos 1–9, 10–18 y total.
- Gross válido, X explícita, corrección retroactiva y dato vacío bloqueado.
- Ronda nueva, ronda recuperada, ronda previa y retorno a ronda actual.
- Tarjeta Global, personal, imagen, PDF individual y PDF TODAS.
- Con y sin torneo.
- Con y sin cuenta opcional.
- Con conexión, sin conexión y actualización obligatoria.

## Regla de cierre

El manual sólo puede declararse completo cuando:

1. existan portada y páginas 01–73 en 4K;
2. el PDF contenga 74 páginas físicas;
3. cada función de esta matriz tenga explicación normal y recuperación;
4. las pruebas citadas y la auditoría maestra obtengan PASS;
5. una inspección visual confirme texto legible, sin recortes ni páginas descentradas;
6. el enlace `MANUAL SCG` abra el visor completo y no una imagen aislada.
