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

### Four Ball 2 vs 2

Four Ball es una modalidad propia de la arquitectura General y no un nombre visual aplicado a la Ronda Normal. Cada partida exige exactamente cuatro jugadores distribuidos de forma determinista:

- Pareja Verde: jugadores 1 y 2.
- Pareja Oro: jugadores 3 y 4.

Cada jugador juega su propia bola y registra únicamente Gross por voz o manualmente. El motor compartido calcula los golpes de handicap y el Neto individual. `four-ball.js` selecciona el menor Neto de cada pareja por hoyo y compara ambos mejores Netos; el resultado del hoyo pertenece a la pareja, no al jugador individual.

El marcador conserva acumulativamente `EVEN`, `+1`, `+2`, `−1`, etc. en todos los hoyos ya registrados. Un hoyo empatado mantiene la posición anterior y un hoyo futuro permanece pendiente. El cierre anticipado se produce cuando la ventaja supera los hoyos restantes y genera snapshot oficial, correcciones, Historial, tarjeta Global y cuatro tarjetas personales.

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
