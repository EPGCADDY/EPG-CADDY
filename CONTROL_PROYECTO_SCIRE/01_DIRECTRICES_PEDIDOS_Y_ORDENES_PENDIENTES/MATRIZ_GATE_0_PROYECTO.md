# MATRIZ GATE 0 · Golf Score Card GT

**Versión reconstruida:** G0-R1 · 27 de agosto de 2026  
**Autorización:** el propietario ordenó reconstruir o rehacer los controles faltantes.  
**Regla:** esta matriz no demuestra un PASS por sí sola; únicamente define la puerta que debe superarse con evidencia reproducible.

## Política vigente de acceso a la aplicación

- Registro, Score Card local y Scores se abren libremente. La entrada normal no solicita correo, contraseña, inicio como propietario ni código global.
- La pantalla propietaria y el bloqueo general de middleware están retirados de la entrada principal. `/`, `/index.html`, `/inicio` y la apertura normal de `/access.html` conducen a Registro; un token de invitación temporal se canjea allí como flujo independiente.
- El acceso a un torneo privado, publicación/edición central y respaldos se autoriza dentro de cada recurso, según su propia membresía o cuenta opcional. Esa autorización no puede volver a cerrar la entrada general de la aplicación.
- Criterio de regresión: sin cookie y sin sesión, la ruta Registro responde directamente; APIs de recursos privados siguen denegando lecturas/escrituras no autorizadas.
- La invitación individual de 24 horas se conserva como función opcional, de un solo uso, con canje y vencimiento propios. No es requisito para abrir Registro ni activa el candado general.
- Esta regla sustituye como requisito de producto cualquier referencia anterior a autenticarse como propietario para abrir la aplicación. Las menciones históricas quedan como registro, no como especificación activa.

## Siete entradas obligatorias

| Entrada | Fuente cerrada | Criterio de entrada |
|---|---|---|
| Fuente canónica | repositorio `EPGCADDY/EPG-CADDY`, rama `main`, base `0dc1ba7a62b6bd6aec92752c539ca641cf950e26` | El candidato identifica commit base, archivos modificados y SHA-256 de artefactos. |
| Alcance exacto | Manual oficial de 74 páginas y versión operativa completa | No se confunde candidato, Preview ni Producción. |
| Aceptación medible | esta matriz y `MATRIZ_TECNICA_EDITORIAL_MANUAL` | Cada rubro termina PASS o FAIL, nunca “casi”. |
| Referencias | directrices, ROADMAPS, matriz pendiente, fuentes oficiales de campos y capturas reales | Ninguna fuente se inventa o sustituye. |
| Riesgos | pérdida de ronda, falsa acción de voz, datos vivos inventados, diseño montado, candidato confundido con oficial | Cada riesgo tiene prueba negativa y rollback. |
| Plan de prueba | controles específicos + auditoría integral + navegador/dispositivo real | El mismo artefacto supera ambas puertas. |
| Rollback | Producción anclada al commit base hasta aprobación expresa | Ningún cambio local implica despliegue. |

## Puertas de cierre

| ID | Rubro | PASS obligatorio | Evidencia mínima |
|---|---|---|---|
| G0-01 | Control documental | AGENTS, directrices, ambas matrices humana/JSON, registro de reincidencias y candado ejecutable presentes y legibles | `node scripts/project-quality-gate.mjs` y `node test-project-quality-gate.mjs` |
| G0-02 | Estructura gráfica | 74/74 páginas maestras 2160×4320, 300 dpi, márgenes, bandas y separación; PDF sincronizado | controles visual/editorial + inspección de muestras críticas |
| G0-03 | Texto para diez años | Cada función explica objetivo, qué hace el jugador, qué calcula la app, resultado, error y palabra difícil | matriz de cobertura + control editorial + lectura humana |
| G0-04 | Manual 74/74 | 74 PNG y PDF físico de 74 páginas; 74/74 gráfico, editorial y semántico sobre el mismo SHA | pruebas de hosting, cobertura, búsqueda, voz y PDF |
| G0-05 | Vegas, Wolf y demás apuestas | Cada apuesta solicitada tiene reglas, acuerdos previos, registro, cálculo, ganador, liquidación, error, glosario y aviso de que no altera el score | inventario de hojas, pruebas de cálculo y revisión visual |
| G0-06 | Micrófono | continuidad sostenida, herramienta→voz, interrupción, silencio, timeout, estados ESCUCHANDO/RESPONDIENDO y prueba física iPhone | banco automático + evidencia física reproducible |
| G0-07 | Calidad de respuestas | exactitud, profundidad, fuentes para datos variables, límites de salud/seguridad, cero falsas acciones y evaluación humana | bancos temáticos + muestra humana fechada |
| G0-08 | Tráfico | GPS consentido, destino exacto validado, proveedor de tráfico activo, ETA/demora/hora, error seguro y prueba real en Guatemala | respuesta viva reproducible; un enlace sin ETA no pasa |
| G0-09 | Clima | GPS primero, campo como respaldo, actual/pronóstico, inicio/cierre, artefactos, proveedor identificado y validación física | escenarios automáticos + comparación/medición de campo |
| G0-10 | Integridad operativa | escritor único, estados, cálculos, persistencia, corrección, historial y modalidades; ACTUALIZAR exige además cuatro deployments READY consecutivos, mismo alias/perfil Playwright, A→B→C→D, capturas completas SHA-256 y cero errores | auditoría maestra; `node test-v407-r24-update-physical-gate.mjs`; revisión automatizada en navegador real y validador JSON |
| G0-11 | Producción | sin cambios mientras exista un FAIL; despliegue sólo con aprobación expresa y rollback | commit/deployment exactos y hashes antes/después |
| G0-12 | Entrada libre | raíz, enlaces y PWA abren sin credenciales de propietario en cualquier release; controles privados siguen por operación | regla de raíz, matriz pendiente y prueba automatizada de despliegue |

## Lógica de resultado

`PASS INTEGRAL = G0-01 AND G0-02 AND ... AND G0-11`

Un PASS automático parcial no sustituye prueba física o humana exigida. Si falta una evidencia, el rubro permanece FAIL. Producción no se toca.


## OP-60 — EJECUCIÓN VISIBLE Y CONTINUA OBLIGATORIA

Orden expresa del propietario: 13 de septiembre de 2026. Aplica a toda tarea de este repositorio, Laboratorio y Maestro, y a cada continuación de conversación. El propietario no debe volver a repetir esta orden.

1. Durante una tarea activa no pueden transcurrir más de 60 segundos sin un reporte visible en el chat. Emitirlo antes del límite; dividir operaciones largas en tramos que permitan informar.
2. Cada reporte contiene hora de Guatemala, acción técnica realmente completada, archivo/pantalla/comando inspeccionado, resultado concreto, evidencia verificable, estado PASS/FAIL/PENDIENTE y siguiente acción. Si una operación sigue ejecutándose, identificarla como EN CURSO y mostrar su última salida real; no inventar un resultado terminado.
3. Después del reporte, continuar ejecutando sin esperar otro mensaje ni pedir que el propietario diga continúa. No finalizar el turno con trabajo autorizado pendiente salvo bloqueo real documentado o intervención del propietario indispensable.
4. Pensando, planes, promesas, disculpas, repetición de pruebas ya aprobadas sin motivo y afirmaciones de trabajo en segundo plano no constituyen ejecución demostrada. No mostrar razonamiento interno como evidencia.
5. Nunca afirmar actividad después de cerrar un turno. Al detenerse, declarar DETENIDO o BLOQUEADO, la causa precisa, última acción/evidencia y próxima acción concreta.
6. Si una limitación real de plataforma o permisos impide continuar o mantener comunicación visible, declararla expresamente, guardar un punto de recuperación completo y cerrar. No convertir una limitación hipotética en excusa rutinaria ni presentar la revisión automática como prueba física.
7. Conservar archivos, versión/commit, resultados, fallos y pendientes en el punto de recuperación. No pedir otra autorización para acciones ya autorizadas; sólo interrumpir por una necesidad real y explicada.
8. La falta de ejecución visible es un incumplimiento operativo, aunque las pruebas técnicas pasen. Registrar la reincidencia y corregir el proceso. Este documento fija la obligación; por sí solo no ejecuta un temporizador ni garantiza el cumplimiento del agente.
9. Queda prohibido cerrar el turno mientras exista trabajo autorizado pendiente y una siguiente acción técnica ejecutable. Un reporte de estado no reemplaza esa acción ni autoriza detenerse.


## R151 · destino obligatorio del laboratorio del propietario

Origen instalado confirmado: https://golf-sc-gt-lab-git-lab-r146-entry-ope-6b36ee-epgcaddys-projects.vercel.app

Rama: `lab/r146-entry-open-24h-invites-20260930`. Proyecto: `golf-sc-gt-lab`. El alias secundario https://golf-sc-gt-lab.vercel.app no sustituye este destino. Toda actualización autorizada debe alcanzar ambos destinos con el mismo commit, deployment READY y versión visible. Conservar origen y almacenamiento; nunca solicitar reinstalación ni borrado para corregir una omisión de publicación. Evidencia de origen: IMG_5668(1) y confirmación del propietario, 2 de octubre de 2026.
