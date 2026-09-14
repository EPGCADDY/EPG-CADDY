# Golf Score Card GT · instrucciones del repositorio

Estas reglas aplican a todo el repositorio.

1. Leer antes de cambiar código o Manual:
   - `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/DIRECTRICES_MANDATORIAS.md`
   - `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_GATE_0_PROYECTO.md`
   - `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_GATE_0_PROYECTO.json`
   - `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`
   - ambos ROADMAPS y la especificación pendiente aplicable.
2. Ejecutar `node scripts/project-quality-gate.mjs` antes de producir un candidato.
3. Manual o visual: leer además `MATRIZ_TECNICA_EDITORIAL_MANUAL.md` y su JSON; ejecutar los controles editorial y visual.
4. Funcional: probar escritor oficial, estados, persistencia, corrección, historial y navegador real.
5. Voz: una prueba automática no sustituye iPhone físico, ruido, acentos, interrupción y turnos sostenidos.
6. Tráfico y clima: no declarar datos vivos sin proveedor, fecha, origen y evidencia reproducible.
7. Un solo FAIL bloquea el resultado integral. No redondear un PASS parcial.
8. Producción permanece intacta hasta cero FAIL y aprobación expresa del propietario.
9. Toda modificación se registra en ambos ROADMAPS dentro de la misma versión.
10. Antes de trabajar desde otra conversación, sincronizar la rama canónica remota y conservar obligatoriamente los bancos V354–V362 de voz —incluidos `test-v358-ios-score-universal-physical-recovery.mjs` y `test-v362-physical-voice-recovery.mjs`— y V324/V337/V356 de tráfico-clima. No sustituir archivos completos con versiones de otra rama: cualquier cambio debe ser incremental y ejecutar la auditoría integral. Producción no se toca.
11. Continuidad multiconversación vigente: V368/RC-040 se construye exclusivamente sobre `fix-v366-integrated-main` (`03ca12e`) y sustituye los candidatos divergentes anteriores. El enlace web oficial (`/`, `/index.html`, `/inicio`) debe abrir Registro aun con tarjeta guardada; la app instalada conserva su `start_url` sin `inicio=1` para reabrir la tarjeta viva. Antes de publicar, comparar ancestro, árbol y controles remotos; ninguna conversación puede presentar V365–V367 o un Preview previo como final.


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
