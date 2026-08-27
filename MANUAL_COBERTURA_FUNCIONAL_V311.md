# Matriz de cobertura funcional del Manual SCG V311

Estado del candidato: **cobertura editorial verificada**. La aprobación integral continúa separada de las pruebas físicas y del montaje en Producción.

## Funciones vigentes y página donde se explican

| Función del usuario | Página principal | Recuperación o atasco | Prueba técnica relacionada |
|---|---:|---:|---|
| Selección de campo, modalidad y torneo | 01 | 01 y 70 | `test-v272-definitive-operational-release.mjs` |
| Registro General por voz o manual | 02 y 17 | 52 y 70 | `test-v305-registration-guides-parser-truth.mjs` |
| Confirmación antes de iniciar | 03 | 03 y 70 | `test-v304-homogeneous-registration-actions.mjs` |
| Registro Stableford | 04 | 54 y 70 | `test-v252-stableford-persistence-category-course.mjs` |
| Score Card - Práctica | 05 | 55 y 70 | `test-score-engine.mjs` |
| Ronda General | 06 | 20–21 y 70 | `test-v267-scorecard-combination-matrix.mjs` |
| Control Manual, ENTER, hoyos y X | 07 y 19 | 59 y 70 | `test-v276-manual-hole-navigation.mjs` |
| Match Play de una o dos parejas | 08 | 67 y 70 | `test-v306-match-play.mjs` |
| Four Ball de una o dos parejas | 09 | 68 y 70 | `test-v309-four-ball.mjs` |
| Información de siete campos | 10–16 | 10–16 | `test-course-catalog.mjs` |
| Dictado de scores y avance automático | 18 | 56–58 y 70 | `test-v270-consecutive-hole-voice-blocks.mjs` |
| Gross, HDCP, Neto, +/−, OUT, IN y TOTAL | 20 | 56–59 y 70 | `test-score-engine.mjs` |
| Consultas por voz de hoyo, vuelta y total | 21 | 60–64 y 70 | `test-voice-continuity.mjs` |
| Inicio, TIMER, micrófono y apagado por 30 minutos sin instrucciones | 22 | 69–70 | `test-round-clock.mjs` y `test-v311-timer-inactivity.mjs` |
| Ronda Previa, Ronda Actual y persistencia | 23 | 23 y 70 | `test-v253-live-previous-round.mjs` |
| Nueva Ronda y Borrar Scores | 24 | 24 y 70 | `test-v289-stableford-new-round-empty.mjs` |
| Atrás, revisar datos y + Jugador | 25 | 25 y 70 | `test-v263-compact-players-back-button.mjs` |
| Tarjeta Digital Global y personal | 26 | 26 y 70 | `test-card-artifacts.mjs` |
| Finalización y cierre oficial | 27 | 27 y 70 | `test-round-closure.mjs` |
| Imagen, PDF, PDF TODAS y compartir | 28 | 28 y 70 | `test-v278-card-image-pdf-export.mjs` |
| Corrección oficial y original preservado | 29 | 29 y 70 | `test-v277-official-round-corrections.mjs` |
| Historial y filtros | 30 | 65–66 y 70 | `test-v279-local-card-library.mjs` |
| Estadísticas históricas | 31 | 65–66 y 70 | `test-v280-local-history-insights.mjs` |
| Resultado oficial Stableford | 32 | 54 y 70 | `test-stableford.mjs` |
| Cuenta, respaldo y recuperación | 33 | 33 y 70 | `test-v282-optional-account-backup.mjs` |
| Instalación, modo sin conexión y actualización | 34 | 34 y 70 | `test-v281-pwa-installation.mjs` |
| Seguridad, límites y glosario | 35 | 35 y 70 | `test-no-automatic-x.mjs` |
| Vegas: acuerdos, número, variantes, límites y liquidación | 36–42 | 36–42 | `scripts/manual-editorial-qc.py` |
| Wolf: turno, pareja o solo, puntos y liquidación | 43–46 | 43–46 | `scripts/manual-editorial-qc.py` |
| Skins: acuerdo, arrastre, ganador y liquidación | 47–48 | 47–48 | `scripts/manual-editorial-qc.py` |
| Nassau, Bingo Bango Bongo y Snake | 49 | 49 | `scripts/manual-editorial-qc.py` |
| Clima y tráfico: fuente, hora, ETA y fallo honesto | 50 | 50 | `test-v323-live-traffic.mjs` y `api/weather.js` |
| Registro hablado General: frase, números y marcas | 51 y 53 | 70 | `test-v305-registration-guides-parser-truth.mjs` |
| Corrección, alta y baja de jugadores por voz | 52 | 70 | `test-v311-manual-voice-map.mjs` |
| Registro hablado Stableford y Práctica | 54–55 | 70 | `test-v305-registration-guides-parser-truth.mjs` |
| Score por dígito, número hablado u hoyo explícito | 56–57 | 70 | `test-v267-one-operational-line.mjs` |
| Vocabulario oficial Águila–Doble Par | 58 | 70 | `test-v311-manual-voice-map.mjs` |
| X, Equis, Sin Score y Sin Resultado | 59 | 70 | `test-no-automatic-x.mjs` |
| Preguntas por hoyo y varios hoyos | 60 | 70 | `test-v311-manual-voice-map.mjs` |
| Acumulado, marcador y resultado actual | 61 | 70 | `test-v311-manual-voice-map.mjs` |
| Alcances: primera/segunda vuelta, hasta hoyo y rango | 62 | 70 | `test-v311-manual-voice-map.mjs` |
| Líder, posiciones y comparación | 63 | 70 | `test-v311-manual-voice-map.mjs` |
| Birdies, pares, bogeys, pendientes y tiros recibidos | 64 | 70 | `test-v311-manual-voice-map.mjs` |
| Historial hablado/escrito y filtros combinables | 65–66 | 70 | `test-v280-local-history-insights.mjs` |
| Reporte hablado Match Play en español | 67 | 70 | `test-v306-match-play.mjs` |
| Reporte hablado Four Ball en español | 68 | 70 | `test-v309-four-ball.mjs` |
| Navegación hablada y STOP | 69 | 70 | `test-v311-manual-voice-map.mjs` |
| Error de voz y recuperación sin pérdida | 70 | 70 | `test-v311-manual-voice-map.mjs` |
| Mapa de capacidades y significado de respuestas | 71–72 | 70 | `test-v311-manual-semantic-coverage.mjs` |
| Índice por categorías y lupa con preguntas completas | Visor web | 71–72 | `test-v311-manual-search.mjs` |
| Asistente de micrófono para ayuda y navegación segura | 69 y 71–72 | 70 | `test-v311-voice-assistant.mjs` |
| AI UNIVERSAL ∞ por voz y texto, contexto, Web viva, fuentes y controles | 73 | 70 | `test-v321-ai-universal-infinity.mjs` |
| Inclusión del asistente en el paquete móvil | Aplicación instalada | 34 y 70 | `test-v311-voice-assistant.mjs` y `test-v284-native-package-generation.mjs` |

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
