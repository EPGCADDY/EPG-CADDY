# EPG Caddy — Plan consolidado de cambios y evolución

## Objetivo inmediato
Terminar una versión iOS privada/de prueba para uso personal, sin alterar la lógica web, de scoring y de voz que ya funciona. Después se evolucionará a una versión pública, multiusuario y monetizable.

## 1. Inicio de ronda

La app deberá pedir o permitir seleccionar:

- Nombre del jugador
- Jugador habitual
  - Opción para guardar un nombre como jugador habitual
  - Opción para desmarcarlo cuando se quiera jugar con otro nombre
- Handicap personal
  - Editable para cada jugador
- Campo
  - Inicialmente El Pulté
  - Arquitectura preparada para agregar otros campos
- Marca de salida / Tee
  - Negro
  - Azul
  - Blanco
  - Rojo
  - Amarillo
  - Preparado para combinaciones futuras si el campo las utiliza

## 2. Datos oficiales por campo y marca de salida

La base de datos deberá organizarse así:

Campo → Tee → Rating / Slope → 18 hoyos → Par → Distancia → Handicap / Stroke Index

Reglas:

- No asumir que los datos de un hoyo son iguales para todas las marcas de salida
- Course Rating, Slope, distancias y cualquier dato que cambie por tee deberán almacenarse por color
- El Handicap / Stroke Index de cada hoyo deberá verificarse con la tarjeta oficial o una fuente confiable del campo
- No se inventarán datos faltantes
- Cada ronda guardará una copia de los datos del campo y tee usados ese día, para que una ronda histórica nunca cambie aunque posteriormente se actualice la base del campo

## 3. Registro permanente de cada ronda

Cada ronda deberá tener un identificador único:

`round_id`

Cada ronda guardará como mínimo:

- Fecha y hora
- Jugador
- Handicap personal
- Campo
- Marca de salida
- Course Rating
- Slope
- Información de cada hoyo
- Par por hoyo
- Handicap / Stroke Index por hoyo
- Golpes brutos por hoyo
- Strokes recibidos por handicap
- Score neto por hoyo
- Resultado contra par por hoyo
- Gross total
- Net total
- Resultado total contra par

## 4. Resumen automático de la ronda

Al finalizar cada ronda se deberá generar:

- Eagles
- Birdies
- Pares
- Bogeys
- Double Bogeys
- Triple Bogeys
- Otros

El mismo tipo de resumen deberá poder generarse posteriormente para un conjunto de rondas.

## 5. Historial de rondas

La app deberá tener un repositorio permanente de rondas.

El jugador podrá:

- Abrir cualquier ronda anterior
- Consultar rondas por una fecha específica
- Consultar por rango de fechas
- Consultar últimos 7 días, 30 días, mes, año u otro periodo
- Ver acumulados y tendencias por periodo

La experiencia deberá funcionar de manera similar a consultar movimientos o estados de cuenta bancarios.

## 6. Tarjeta digital de la ronda

Al terminar una ronda, la app deberá poder reconstruir una tarjeta digital completa usando únicamente los datos guardados.

La tarjeta deberá poder:

- Verse dentro de EPG Caddy
- Guardarse como imagen
- Compartirse
- Volverse a generar en cualquier momento desde el historial

La fuente oficial de los números será siempre la base de datos de la app.

## 7. Uso de OpenAI / ChatGPT

OpenAI podrá utilizarse para:

- Analizar la ronda
- Crear comentarios
- Resumir desempeño
- Señalar tendencias
- Comparar periodos
- Generar observaciones útiles para el jugador

OpenAI no deberá modificar ni calcular de forma autoritativa los scores oficiales de la tarjeta. La lógica de scoring seguirá siendo determinística dentro de EPG Caddy.

## 8. Evolución futura a producto público

Después de terminar y probar la versión personal:

- Perfiles de múltiples jugadores
- Diferentes nombres y handicaps
- Múltiples campos
- Múltiples tees por campo
- Base de datos ampliable de campos
- Historial individual por usuario
- Sincronización de datos
- Plan gratuito y planes de pago
- StoreKit
- Suscripciones
- Paywall
- Restauración de compras
- Validación de derechos de suscripción
- App Store Server Notifications
- Preparación completa para monetización pública

## 9. Principio técnico del proyecto

Mientras se implementan estos cambios:

- No modificar innecesariamente la lógica web/voz/scoring que ya funciona
- Hacer cambios por módulos
- Validar cada cambio con compilación real
- No inventar datos oficiales del campo
- Mantener compatibilidad con futuras versiones multiusuario y monetizables

## 10. Estado actual confirmado

- Proyecto iOS generado con XcodeGen
- Build de simulador validado correctamente
- Archive Release para dispositivo validado correctamente
- Workflow de GitHub Actions funcional
- Artefacto de archive generado correctamente
- Pendiente Apple Developer Program para firma, instalación/TestFlight y distribución final

## 11. Checklist de implementación

- [ ] Inicio de ronda con jugador habitual
- [ ] Nombre editable
- [ ] Handicap personal
- [ ] Selección de tee
- [ ] Matriz oficial de El Pulté por tee
- [ ] Modelo permanente de Round
- [ ] round_id
- [ ] Historial de rondas
- [ ] Filtros por periodo
- [ ] Resumen Eagles/Birdies/Pares/Bogeys/Double/Triple/Otros
- [ ] Tarjeta digital reconstruible
- [ ] Guardar tarjeta como imagen
- [ ] Compartir tarjeta
- [ ] Análisis opcional con OpenAI
- [ ] Soporte multiusuario
- [ ] Soporte múltiples campos/tees
- [ ] Monetización con StoreKit
- [ ] Publicación pública en App Store
