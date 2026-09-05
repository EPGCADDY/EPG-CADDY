# Directrices mandatorias

- No solicitar nuevamente tarjetas, fotografías, documentos, instrucciones ni directrices ya entregadas.
- Conservar todas las fotografías físicas originales de las tarjetas oficiales en el reservorio permanente, clasificadas por campo.
- No confundir fotografías originales con capturas de la aplicación, imágenes generadas o reconstrucciones.
- No alterar ni reemplazar una fuente original; una nueva foto se agrega como fuente adicional o reenvío.
- Mantener un índice con campo, nombre del archivo, identificador, tipo de fuente y estado de uso.
- Autorización permanente del propietario del 26 de agosto de 2026: no solicitar autorizaciones intermedias para tomar, implementar, probar, versionar, desplegar en Preview y continuar los pendientes registrados. Cada versión que supere íntegramente su banco automático y su puerta física obligatoria puede montarse; un solo `FAIL` mantiene Producción intacta. Las licencias, credenciales, contratos o consentimientos que sólo el propietario pueda otorgar se registran como bloqueo real y jamás se simulan.
- Nunca enviar como General una URL que contenga `stableford_emergency`; General y Stableford deben conservar estado, enlace y propósito independientes.
- Al terminar un caso, revisar la cola y continuar con el siguiente trabajo pendiente.
- Toda configuración y combinación de Score Card pertenece a una sola arquitectura integral. General y Stableford son modalidades; manual y voz son entradas. Campo, categoría, marcas, torneo, cantidad de jugadores, ronda registrada/sin registro, nueva/recuperada, primera/segunda vuelta y total no autorizan escritores, persistencias, renders, navegaciones ni políticas de voz paralelas.
- Después de cualquier cambio se revisa el producto completo: línea gráfica, arquitectónica, funcional, operativa y operacional; navegador real móvil/escritorio; consola; solicitudes; persistencia; regreso/avance; manual/voz; cierres y combinaciones. Un solo FAIL impide declarar terminada la versión.
- La voz sólo procesa vocabulario autorizado. No dice `Entendido`, `voy a leer`, `procesando`, preguntas, ayuda, saludos ni explicaciones. Una frase no reconocida permanece en silencio y no modifica datos.
- Toda imagen producida para manuales, inventarios, revisiones, publicación o arquitectura es obligatoriamente 4K en su orientación final. Las páginas verticales usan `2160 × 4320 px` y metadatos mínimos de `300 dpi`; no se admite una versión reducida, borrosa, recortada o reescalada como archivo maestro.
- El manual completo conserva una sola línea editorial tipo iPhone: tipografía negra sobre fondo blanco, jerarquía limpia, márgenes seguros, espaciado uniforme, alineación precisa, verde limitado a acentos sobre fondo oscuro y composición vertical equilibrada. `scripts/manual-visual-qc.py` es un candado obligatorio previo a aprobación o publicación; cualquier `FAIL` bloquea el manual.
- La hoja de La Reunión permanece como plantilla vacía mientras el campo esté en reconstrucción total. No muestra PAR, HCP, marcas, yardajes, Rating, Slope ni totales hasta recibir y validar una fuente oficial nueva.

## 22. No trasladar trabajo técnico al usuario

Si ChatGPT dispone de una herramienta conectada capaz de investigar o ejecutar legítimamente una tarea, debe utilizarla en vez de convertir innecesariamente al usuario en operador técnico.

No pedir `busca esto`, `revisa aquello` o `averigua qué commit es` cuando ChatGPT pueda comprobarlo directamente.

## 23. Regla de comunicación — prohibido dejar al usuario adivinando

Esta regla es obligatoria para **todos** los mensajes del proyecto, independientemente de su contenido. Ningún mensaje puede terminar en el aire.

Después de cualquier explicación, investigación, resultado, problema, avance, corrección o reporte, el mensaje debe indicar inequívocamente quién tiene la siguiente acción. El propietario jamás debe tener que preguntarse si espera, si debe contestar, tocar algo, escribir `sigue` o si el trabajo terminó.

## 24. Todo mensaje debe terminar con una acción o solicitud

Existen únicamente estos estados válidos:

### A. La siguiente acción es del usuario

Terminar con `SIGUIENTE ACCIÓN — TUYA:` y el paso exacto requerido.

### B. No se necesita nada del usuario en este momento

Decirlo explícitamente con `DE TU PARTE:` y explicar el siguiente punto real del proceso. No fingir que ChatGPT continuará trabajando silenciosamente después de terminar el turno. Si para continuar hace falta un nuevo mensaje, terminar con `PARA CONTINUAR:` e indicar que cualquier mensaje basta, sin repetir instrucciones ni autorizaciones anteriores.

### C. El trabajo realmente terminó

Únicamente cuando la tarea o proyecto solicitado esté verdaderamente concluido puede terminar con `HECHO — TRABAJO TERMINADO. No queda ninguna acción pendiente de tu parte.` No usar `HECHO` para cerrar una etapa si aún existen trabajos pendientes en el mismo proceso.

## 25. Prohibido simular trabajo en segundo plano

ChatGPT no debe decir `yo sigo trabajando y regreso`, `déjame terminar y vuelvo contigo` o `mientras tanto voy haciendo` si técnicamente no puede continuar después de enviar el mensaje.

Debe describir correctamente el punto alcanzado. Si hace falta otro turno para continuar, indicará que el usuario no necesita realizar ninguna acción técnica y que cualquier nuevo mensaje permite proseguir exactamente desde ese punto.

## 26. “Sigue” no debe convertirse en trabajo del usuario

El propietario no tiene obligación de escribir repetidamente `sigue`. Cada turno debe aprovecharse para avanzar todo lo razonablemente posible antes de devolver el control.

Solamente cuando sea necesario un nuevo turno debe indicarse expresamente. Cualquier mensaje del propietario es suficiente para continuar cuando no exista una decisión nueva pendiente.

## Norma permanente y estricta de ROADMAPS

## Norma permanente — revisión física obligatoria del 100% de los cambios

Antes de entregar o declarar terminada cualquier versión, se debe revisar físicamente en el Preview real el **100% de todos los cambios pedidos e implementados**, recorriendo cada pantalla, modalidad, tarjeta, cálculo, persistencia, voz, Historial, LIVE, WhatsApp, archivo y navegación afectada. Queda prohibida la revisión por muestra. Las pruebas automáticas no sustituyen esta comprobación. Un solo punto sin evidencia física queda `FAIL` y bloquea la versión y Producción.

## Norma permanente y estricta de ROADMAPS

1. Punto de activación oficial: directorio registrado hasta la **línea 183**.
2. Punto de corte vigente después de instalar el candado técnico: **línea 185**.
3. Activación oficial: **23 de agosto de 2026, 17:05:00, hora de Guatemala**.
4. Desde ese instante, cada creación, modificación, cambio de nombre, movimiento o eliminación de una carpeta o archivo debe agregarse **automáticamente y dentro de la misma versión** a `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`.
5. El registro debe incluir nombre o ruta exacta, ID o código cuando exista y una explicación básica y fácil de entender.
6. Si se crea una carpeta, se registra la carpeta y también cada archivo que contenga.
7. `scripts/roadmap-gate.mjs` y `.github/workflows/roadmap-gate.yml` ejecutan el candado técnico. Si falta el registro doble, el resultado obligatorio es `FAIL ROADMAP GATE`.
8. La auditoría maestra, la construcción de iPhone, la preparación para TestFlight, el paquete Apple/Android, las pruebas principales de Stableford y la publicación de Vercel deben ejecutar este candado antes de continuar.
9. Ninguna versión puede declararse terminada, publicarse ni cerrarse si la modificación no aparece en ambos ROADMAPS.
10. Esta norma es mandatoria, automática y permanente; no requiere que el propietario la repita en futuras conversaciones.

## Secuencia vigente

0. Sincronización obligatoria entre conversaciones: la única continuación autorizada es V368/RC-040 sobre `fix-v366-integrated-main` (`03ca12e`). El enlace web abre Registro; la app instalada reabre la tarjeta viva; AI UNIVERSAL permanece audible sin cambio de pantalla. Queda prohibido reutilizar o declarar final cualquier Preview V365–V367 anterior.

1. Cerrar V327-R1 con conversación física prolongada en iPhone; hasta entonces Producción permanece en V322.
2. Al obtener PASS físico completo, montar la versión aprobada y registrar deployment, commit y evidencia exactos.
3. Continuar automáticamente la cola oficial en su orden vigente, sin pedir autorización intermedia ni volver a solicitar información ya entregada.
4. Para cada pendiente: diseñar dentro de la arquitectura única, implementar, ejecutar regresión completa, desplegar Preview, realizar la prueba física correspondiente y montar sólo después de cero fallos.
5. Los bloqueos externos reales —licencia, autorización de proveedor, credencial, contrato, pago o consentimiento— se documentan con honestidad; no se sustituyen por simulación ni por una declaración falsa de integración.
