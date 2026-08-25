# Directrices mandatorias

- No solicitar nuevamente tarjetas, fotografías, documentos, instrucciones ni directrices ya entregadas.
- Conservar todas las fotografías físicas originales de las tarjetas oficiales en el reservorio permanente, clasificadas por campo.
- No confundir fotografías originales con capturas de la aplicación, imágenes generadas o reconstrucciones.
- No alterar ni reemplazar una fuente original; una nueva foto se agrega como fuente adicional o reenvío.
- Mantener un índice con campo, nombre del archivo, identificador, tipo de fuente y estado de uso.
- No publicar ramas ni commits sin la autorización expresa del propietario usando el SHA exacto.
- Nunca enviar como General una URL que contenga `stableford_emergency`; General y Stableford deben conservar estado, enlace y propósito independientes.
- Al terminar un caso, revisar la cola y continuar con el siguiente trabajo pendiente.
- Toda configuración y combinación de Score Card pertenece a una sola arquitectura integral. General y Stableford son modalidades; manual y voz son entradas. Campo, categoría, marcas, torneo, cantidad de jugadores, ronda registrada/sin registro, nueva/recuperada, primera/segunda vuelta y total no autorizan escritores, persistencias, renders, navegaciones ni políticas de voz paralelas.
- Después de cualquier cambio se revisa el producto completo: línea gráfica, arquitectónica, funcional, operativa y operacional; navegador real móvil/escritorio; consola; solicitudes; persistencia; regreso/avance; manual/voz; cierres y combinaciones. Un solo FAIL impide declarar terminada la versión.
- La voz sólo procesa vocabulario autorizado. No dice `Entendido`, `voy a leer`, `procesando`, preguntas, ayuda, saludos ni explicaciones. Una frase no reconocida permanece en silencio y no modifica datos.
- Regla de comunicación 23: ningún mensaje puede terminar en el aire ni dejar al propietario adivinando si espera, responde, toca algo o si el trabajo terminó.
- Regla de comunicación 24: todo mensaje termina con una de dos asignaciones inequívocas: `SIGUIENTE ACCIÓN — TUYA:` seguida del paso exacto requerido, o `SIGUIENTE ACCIÓN — MÍA:` seguida del trabajo que continuará. Si la acción es del asistente, el propietario no debe tocar ni responder nada.
- Toda imagen producida para manuales, inventarios, revisiones, publicación o arquitectura es obligatoriamente 4K en su orientación final. Las páginas verticales usan `2160 × 4320 px` y metadatos mínimos de `300 dpi`; no se admite una versión reducida, borrosa, recortada o reescalada como archivo maestro.
- El manual completo conserva una sola línea editorial tipo iPhone: tipografía negra sobre fondo blanco, jerarquía limpia, márgenes seguros, espaciado uniforme, alineación precisa, verde limitado a acentos sobre fondo oscuro y composición vertical equilibrada. `scripts/manual-visual-qc.py` es un candado obligatorio previo a aprobación o publicación; cualquier `FAIL` bloquea el manual.
- La hoja de La Reunión permanece como plantilla vacía mientras el campo esté en reconstrucción total. No muestra PAR, HCP, marcas, yardajes, Rating, Slope ni totales hasta recibir y validar una fuente oficial nueva.

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

1. Cerrar visual y funcionalmente las tarjetas General y Stableford.
2. Obtener aprobación final del propietario.
3. Cargar y validar San Isidro y Alta Vista desde sus fuentes originales ya archivadas.
4. Continuar con los demás campos pendientes usando este inventario, sin pedir nuevamente las fuentes.
