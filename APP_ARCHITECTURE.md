# APP ARCHITECTURE

# Golf Score Card GT
Arquitectura Oficial del Sistema

Versión: 1.0

Estado: Oficial

---

# Objetivo

Este documento define la arquitectura completa de la aplicación Golf Score Card GT.

Toda implementación futura deberá respetar esta arquitectura.

---

# Arquitectura General

Golf Score Card GT está dividido en cinco grandes capas.

1. Interfaz de Usuario (UI)

2. Motor ECOS

3. Motor de IA

4. Base de Datos

5. Servicios del Sistema

---

# Interfaz de Usuario

Pantallas principales:

• Splash

• Login

• Home

• Nueva Ronda

• Score Live

• Estadísticas

• Historial

• Configuración

• Perfil

### Entrada principal directa

El dominio público raíz abre siempre la pantalla **Configura la ronda** mediante el parámetro interno `inicio=1`. Antes de mostrarla, la aplicación conserva la ronda activa persistida; abrir el inicio no borra, reemplaza ni finaliza la ronda anterior.

### Arquitectura editorial del manual

El manual de funciones, sus hojas de campos, sus inventarios visuales y toda imagen de revisión comparten una sola línea editorial tipo iPhone: tipografía limpia, texto negro sobre fondo blanco, jerarquía precisa, márgenes seguros, separación uniforme, acentos mínimos y composición vertical equilibrada.

Todo archivo maestro de imagen es obligatoriamente 4K en su orientación final. Las páginas verticales se generan a `2160 × 4320 px` con metadatos mínimos de `300 dpi`. Una imagen reducida, borrosa, recortada o estirada no puede aprobarse ni publicarse. El candado `scripts/manual-visual-qc.py` comprueba resolución, densidad, márgenes, predominio negro/gris, verde limitado a acentos y equilibrio vertical; un solo `FAIL` bloquea la entrega.

La página de **La Reunión Golf Resort** conserva únicamente la plantilla editorial vacía mientras el campo se encuentre en reconstrucción total. No se muestran PAR, HCP, marcas, yardajes, Rating, Slope ni totales hasta validar una nueva fuente oficial.

---

# Flujo Principal

Inicio

↓

Nueva Ronda

↓

Captura por Voz

↓

Motor de Scoring

↓

Motor ECOS

↓

IA

↓

Resultados

↓

Fin de Ronda

---

# Motores Internos

## Voice Engine

Captura toda la conversación.

Filtra ruido.

Identifica comandos.

Entrega texto limpio.

---

## Scoring Engine

Calcula:

• Gross

• Neto

• Stableford

• Match Play

• Four Ball por parejas

• Medal Play

• Estadísticas

### Match Play

El nombre visible de la modalidad es únicamente **MATCH PLAY**. Los botones, encabezados, estados y tarjetas finales no agregan `HDCP` ni `CON HDCP` al nombre. La tarjeta conserva los campos HCP, Gross y Neto que requiere el cálculo; esta información pertenece al score de los jugadores y no a la denominación de la modalidad.

Admite una o dos parejas de juego:

- Pareja 1: jugadores 1 y 2, que disputan entre sí un Match independiente.
- Pareja 2 opcional: jugadores 3 y 4, que disputan entre sí otro Match independiente.

Cuando participan dos parejas, una línea vacía separa jugadores 2–3 en registro, tarjeta, resumen y exportación. Cada Match se decide por el Neto de cada hoyo, mantiene su propio marcador acumulado `EVEN`, `+N` o `−N` y cierra independientemente cuando la ventaja supera los hoyos restantes.

En la dicción de los reportes de primera vuelta, segunda vuelta y total se usan exclusivamente **arriba**, **abajo** y **empatado**; la voz no pronuncia `UP`, `DOWN` ni `AS`.

### Four Ball por parejas

Four Ball es una modalidad propia de la arquitectura General y no un nombre visual aplicado a la Ronda Normal. Admite una o dos parejas, siempre de dos jugadores:

El nombre visible de la modalidad es únicamente **FOUR BALL**. La interfaz no agrega `2 PAREJAS` al botón, encabezado, control manual ni tarjeta final; la cantidad pertenece a la configuración de la partida y no al nombre permanente de la modalidad.

- Pareja Verde: jugadores 1 y 2.
- Pareja Oro: jugadores 3 y 4.

Cada jugador juega su propia bola y registra únicamente Gross por voz o manualmente. El motor compartido calcula los golpes de handicap y el Neto individual. `four-ball.js` selecciona el menor Neto de cada pareja por hoyo y compara ambos mejores Netos; el resultado del hoyo pertenece a la pareja, no al jugador individual.

Con una sola pareja, la tarjeta acumula su mejor Neto por hoyo y cierra al completar 18. Con dos parejas, compara ambos mejores Netos y conserva acumulativamente `EVEN`, `+1`, `+2`, `−1`, etc.; un hoyo empatado mantiene la posición anterior. Una línea vacía separa visualmente Pareja Verde y Pareja Oro. Los hoyos futuros permanecen pendientes. El cierre genera snapshot oficial, correcciones, Historial, tarjeta Global y una tarjeta personal por jugador.

### Stableford Scratch permanente

La modalidad de clasificación se abre desde la opción `STABLE`, ubicada en la cuadrícula de campos inmediatamente debajo de `ALTA VISTA`, sin contaminar la ronda normal. Al abrirla permite elegir `SENIOR` o `S. SENIOR`. Admite un máximo de cuatro jugadores y configura automáticamente handicap cero. Senior utiliza marcas blancas; S. Senior utiliza marcas amarillas. La tarjeta muestra Gross y Puntos por hoyo, totales de ida, vuelta y ronda, y una clasificación de cuatro fechas que suma las tres mejores tarjetas. Sólo se habilitan Country Club, El Pulté, San Isidro y Mayan Golf; cualquier campo sin datos oficiales permanece bloqueado.

---

## ECOS

Controla todo el comportamiento interno.

Nunca improvisa.

Nunca inventa datos.

Siempre consulta la Base Oficial.

---

## AI Engine

Análisis estratégico.

Análisis estadístico.

Recomendaciones.

Entrenamiento.

Predicciones.

---

## Memory Engine

Memoria permanente.

Historial.

Preferencias.

Rondas.

Jugadores.

Campos.

---

## Database Engine

PostgreSQL central administrado como fuente permanente de verdad.

Módulos: jugadores, contactos, consentimientos, campos, rondas, participantes, scores, tarjetas, correcciones, entregas y auditoría.

La copia local del teléfono sostiene exclusivamente la ronda activa, una caché mínima y una cola idempotente. Al confirmarse la sincronización, la aplicación purga la copia temporal. El historial permanente se consulta dentro de la aplicación desde PostgreSQL central. Toda sincronización remota pasa por APIs autenticadas; el cliente nunca recibe credenciales de base de datos.

---

# Base de Datos

COURSE_DATABASE.md

ECOS.md

MASTER BLUEPRINT

Configuraciones

Usuarios

Historial

Arquitectura oficial: `DATABASE_ARCHITECTURE.md`.

Migración inicial: `database/001_initial_schema.sql`.

---

# Servicios

Speech to Text

Text to Speech

GPS

Apple Health

Watch

Cloud

Sincronización

---

# Seguridad

Repositorio privado.

Versionado Git.

Backups.

Control de versiones.

---

# Escalabilidad

El sistema deberá soportar:

Miles de jugadores.

Miles de rondas.

Múltiples campos.

Múltiples idiomas.

Múltiples países.

---

# Regla Principal

Ningún módulo puede modificar el comportamiento definido por ECOS.

ECOS siempre tendrá prioridad absoluta.
