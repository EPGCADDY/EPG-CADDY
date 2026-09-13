# Diagnóstico de captura y recuperación · 13 septiembre 2026

Estado: corrección local probada; NO aprobado integralmente; NO publicado.

## Fuente, alcance y aceptación

- Fuente canónica: EPGCADDY/EPG-CADDY, main `e871621c2af478deed6957a625feb0e280402d68` (R34), sincronizada el 13 de septiembre.
- Última evidencia física disponible: propietario confirmó texto y voz en R34, pero con clima de otra ubicación y demora.
- Comparación contra main actual: mismo commit; no existe diferencia posterior de captura que permita atribuir una nueva regresión. R35 local previo no modificaba captura, permisos, sesión ni voz.
- Alcance: cierre del reconocimiento, reintentos, liberación de recursos y estados; se conservan parsers, escritores, parámetros de captura, voz y velocidad.
- Aceptación dirigida: reproducir captura retenida antes del cambio; liberarla después; cero callbacks tardíos o preguntas duplicadas en 100 cierres controlados; manejo seguro de permisos/errores; conservar bancos sellados.
- Referencias: orden técnica del propietario que autoriza simulación controlada, controles del repositorio y evidencia real de R34.
- Riesgo: cancelar un reconocimiento que aún tiene resultado. Mitigación: seleccionar el texto antes de cancelar, desactivar callbacks y conservar el despacho único. No se cambia el tiempo de silencio ni el parser.
- Reversión: revertir únicamente este cambio local; Producción permanece en su versión actual, sin tocar almacenamiento del usuario.

## Defecto reproducido y corrección

`stopBrowserVoiceRecognitionSafely` llama a `recognition.stop()`. Si el navegador no entrega `onend`, el temporizador ejecuta `finalizeBrowserVoiceFallback`. Antes, esa función desconectaba callbacks y perdía la referencia sin cancelar el reconocimiento. El reintento de transporte también descartaba la instancia sin liberarla. En el cierre vacío, `phase` podía permanecer en `listening` pese al aviso visual.

La corrección añade `releaseBrowserVoiceCapture`: desconecta callbacks, cancela la instancia anterior mediante `abort` (con `stop` de respaldo) y deja el estado interno en `idle`. Se utiliza al finalizar y antes del reintento. La misma prueba falla con R34 original y pasa con el cambio.

Esto demuestra un defecto de recuperación del código bajo un fallo de callbacks. No demuestra por sí solo que sea la causa del incidente particular del iPhone.

## Evidencia ejecutada

El archivo R36_CAPTURE_DIAGNOSTIC.json conserva comandos, salidas y comparación negativa. Ocho bancos dirigidos pasaron. Los 100 ciclos comprueban liberación y despacho, con las preguntas del banco, sin duplicados; no evalúan reconocimiento acústico ni calidad de respuestas.

Registros Main del mismo deployment, 13 septiembre UTC: transcripción 15:14:04, reproducción 15:14:12, avance 15:14:12, final 15:14:15. Turno siguiente: escucha 15:14:16, sin resultado 15:14:24. Telemetría anónima: no permite identificar el dispositivo ni demostrar audibilidad física.

Main y LAB responden por HTTPS con TLS válido. Las solicitudes sin sesión llegan a acceso; no se extrapolan esas cabeceras a la aplicación autenticada. La página independiente de diagnóstico en navegador muestra `FAIL · Captura: NotFoundError`, aparte del motor conversacional.

## Pendientes reales

- El control de navegador disponible no expone inyección de audio. No se presentó simulación de eventos como reconocimiento real de un WAV.
- Banco de 100 respuestas completas comparadas con ChatGPT: incompleto; cero aprobación integral.
- Reducción al 40% de latencia: no verificada.
- Comprobación física final en iPhone: pendiente después de cerrar la validación técnica.
- No se publica ni se entrega una nueva versión mientras falten los requisitos del propietario.

## Verificación de ejecución externa encontrada · 13 septiembre 2026

Se inspeccionó el despliegue de pruebas dpl_Ab2fnDXaMyT3mdRxR7W4EMmnWzhs, commit c37f600c8b912777bdb386774d0793f02809a8c8. Su log termina con 100 casos, 0 transportPassed y 100 transportFailed. No fue desplegado desde esta revisión.

El ejecutor envía audio generado a una API de transcripción, llama directamente al motor y considera salida hablada un archivo de más de 1000 bytes. Usa cuatro trabajadores en paralelo. No prueba reconocimiento nativo, interfaz, reproducción real ni 100 turnos seguidos en la sesión del navegador. Resultado frente al requisito: FAIL. No se atribuye un motivo concreto a los 100 fallos porque el artefacto detallado permanece protegido; la herramienta autorizada de lectura devolvió HTTP 302 a autenticación. Los errores de proveedor impresos por pruebas unitarias anteriores del build no son diagnóstico de esas 100 llamadas.

Infraestructura disponible comprobada: no hay herramienta conectada de dispositivo iOS/servicio equivalente y el control de navegador no expone inyección de audio. No se ha provisionado tal entorno. No se solicita al propietario hacer las pruebas preliminares ni se declara aprobado el flujo.
