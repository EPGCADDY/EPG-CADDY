# Orden vigente: 100 pruebas completas, sin sustituciones

Propietario: Jaime Kirste. Orden formal recibida 2026-09-13 tras IMG_3633.jpeg.

## Criterio obligatorio
100 preguntas diferentes y representativas: conocimiento general, actualidad, geografía, ciencia, cálculos, golf, recomendaciones, problemas complejos, seguimiento, correcciones y turnos consecutivos. Evitar selección de preguntas fáciles para elevar artificialmente resultados.
Cada caso debe pasar micrófono real -> reconocimiento -> IA -> texto -> voz. Referencia obtenida en la interfaz de ChatGPT, sin presentar una salida de otra API como si fuera ChatGPT. Matriz con ambas respuestas, comprensión, exactitud, relevancia, profundidad, claridad, contexto, incertidumbre, latencia y continuidad, evidencia y PASS/FAIL individual. Umbral mínimo90/100 equivalente o cercano según esos criterios; una entrega con bloqueo de continuidad no se aprueba.
La duración solicitada queda en40% del tiempo actual (reducción60%). Medir desde fin de habla a primer audio audible, además de tiempos intermedios; no confundir acortar timeouts con reducir latencia.
No enviar otra versión antes de ejecutar, corregir y aprobar el banco completo. Participación del propietario limitada a comprobación física final en iPhone, no a ejecutar los100 casos.

## Hechos y bloqueo
IMG_3633 y logs Preview c4f8b259, dpl_44UZ3b5pxRE49oHmyYHYBAzFEzz3: primera transcripción14:54:57UTC, inicio de voz14:55:02, final14:55:05. Reconocimiento reabierto14:55:05 pero termina14:55:13 sin resultados. Intentos14:55:15 y14:55:24 también terminan tras8s sin transcripción. Limpieza previa no cerró el fallo físico.
2026-09-13 ~15:01UTC: navegador remoto, pantalla assets/official-logos/iphone-microphone.html, botón Comprobar micrófono -> FAIL Captura: NotFoundError. No dispositivo de entrada de audio real disponible en este entorno. No permiso para sustituirlo por una entrada ficticia.
Interfaz pública de ChatGPT abierta y disponible sin sesión iniciada; todavía no se obtuvieron respuestas de referencia. No afirmar que ChatGPT esté inaccesible ni que las referencias estén hechas.
Pruebas completas ejecutadas:0/100. Referencias ChatGPT:0/100. Comparación cualitativa: NO EJECUTADA. Equivalencia90%: NO DEMOSTRADA. Latencia40%: NO DEMOSTRADA. Continuidad física: FAIL.

## Acciones tomadas
Retirada del build la llamada al banco exclusivamente servidor antes de ejecutarlo. Eliminado el ejecutor parcial no publicado. Conservado borrador de preguntas marcado REJECTED_AS_ACCEPTANCE_BANK, no ejecutado ni candidato válido. Sin nuevo despliegue ni nueva versión enviada.
Para continuar se necesita infraestructura de pruebas con entrada y salida de audio real controlables y evidencia del recorrido completo. No trasladar los100 casos al iPhone del propietario. No declarar solucionado ni prometer ejecución física que este entorno no permite.
