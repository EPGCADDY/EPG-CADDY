# STABLEFORD — CIERRE TORNEO

Estado: PRE-PASS TÉCNICO EN RAMA AISLADA. NO PUBLICAR A MAIN HASTA PRUEBA FÍSICA.

## Reglas mandatorias confirmadas
- Máximo 4 jugadores.
- Categorías: SENIOR y S. SENIOR.
- SENIOR: HCP 0, marcas blancas.
- S. SENIOR: HCP 0, marcas amarillas.
- 4 fechas / 4 campos: Guatemala Country Club, El Pulté, San Isidro, Mayan Golf.
- Clasificación acumulada: mejores 3 de 4.
- Puntos por hoyo: albatros/eagle o mejor 4; birdie 3; par 2; bogey 1; doble bogey o peor 0; X = 0.
- Tarjeta: GROSS y PUNTOS por hoyo, con IDA, VTA y TOTAL.
- Separación visual entre jugadores.
- Resultado oficial y clasificación acumulada.

## Gate de datos oficiales
- Country Club: CARGADO.
- El Pulté: CARGADO.
- San Isidro: CARGADO para Stableford con PAR + tee BLANCO + tee AMARILLO y totales verificados.
- Mayan Golf: CARGADO para Stableford con PAR + tee BLANCO + tee AMARILLO y totales verificados.
- Ningún dato de San Isidro/Mayan se hereda de otro campo.

## Validación ejecutada
- Motor de puntos 4/3/2/1/0 y X=0 cubierto por test.
- Máximo 4 jugadores cubierto por test.
- 4 campos y 4 fechas cubiertos por test.
- Mejores 3 de 4 cubierto por test.
- Matrices Stableford San Isidro y Mayan cubiertas por test de 18 hoyos.
- Instalación integrada de San Isidro/Mayan en index-grupal cubierta por test.
- Renderer protegido para campos Stableford que sólo requieren tees BLANCO/AMARILLO.
- Cierres automáticos de los hoyos 9 y 18 cubiertos por prueba con dos jugadores y por las dos entradas operacionales, manual y voz: una sola lectura ordenada de Nombre, Gross y Puntos en primera vuelta; Nombre, Gross y Puntos en segunda vuelta; y Nombre, Gross y Puntos en el total. También se conserva la recuperación de la sesión de voz si el primer envío no estaba disponible.
- Tarjeta independiente de torneo creada como respaldo operativo dentro del mismo repositorio.
- Vercel Preview: DEPLOY SUCCESS en la rama de cierre.

## PASS pendiente
1. Prueba física en iPhone: abrir Stableford.
2. Crear SENIOR con 1–4 jugadores y confirmar BLANCAS / HCP 0.
3. Crear S. SENIOR y confirmar AMARILLAS / HCP 0.
4. Probar un hoyo con Birdie, Par, Bogey, Doble Bogey y X; verificar 3/2/1/0/0.
5. Confirmar que IDA/VTA/TOTAL y clasificación se muestran sin desconfiguración.
6. Confirmar micrófono en dispositivo objetivo para Gross/X.
7. Con prueba física PASS: publicación atómica a main y verificación de Producción.
8. Al completar el hoyo 9, confirmar una sola lectura automática de `Primera vuelta` con Nombre, Gross y Puntos de cada jugador.
9. Al completar el hoyo 18, confirmar una sola lectura automática de `Segunda vuelta` con Nombre, Gross y Puntos de cada jugador, seguida por `Total` con los acumulados de los 18 hoyos.
