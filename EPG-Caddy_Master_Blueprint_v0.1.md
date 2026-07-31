# EPG-Caddy Master Blueprint
## Versión 0.1
### Documento Maestro de Arquitectura

Versión:
0.1

Estado:
En Desarrollo

Fecha de inicio:
2026

Propietario del Proyecto:
Jaime

Arquitecto de Producto:
ChatGPT

Repositorio Oficial:
GitHub (Privado)

---

# 1. PROPÓSITO DEL DOCUMENTO

Este documento constituye la especificación técnica oficial de EPG Caddy.

No es un README.

No es un manual de usuario.

No es documentación de programación.

Es el plano maestro sobre el cual se diseñará, evolucionará y mantendrá todo el ecosistema EPG Caddy.

Cada modificación importante del proyecto deberá reflejarse en este documento mediante una nueva versión.

Toda decisión arquitectónica deberá documentarse aquí antes de implementarse.

Este documento representa la única fuente oficial de verdad del proyecto.

---

# 2. VISIÓN DEL PROYECTO

EPG Caddy nace con un objetivo extremadamente específico:

Construir el mejor caddie virtual de golf jamás desarrollado para un jugador amateur avanzado.

No pretende ser una aplicación de estadísticas.

No pretende competir únicamente con Arccos, Garmin o Shot Scope.

El objetivo es mucho mayor.

EPG Caddy debe convertirse en un copiloto inteligente capaz de acompañar al jugador durante una ronda completa, interpretar lo que ocurre, comprender el contexto del campo y generar información útil en tiempo real mediante conversación natural.

El usuario no debe sentir que utiliza una aplicación.

Debe sentir que juega acompañado por un caddie profesional con memoria perfecta.

---

# 3. FILOSOFÍA DEL PROYECTO

Toda decisión futura deberá respetar cinco principios fundamentales.

## Principio 1

Cero fricción.

Durante una ronda el jugador jamás deberá detenerse a llenar formularios.

Toda interacción debe ocurrir mediante voz.

---

## Principio 2

Menos es más.

Si un dato no genera una decisión futura, no merece almacenarse.

EPG Caddy almacenará únicamente información útil.

---

## Principio 3

Toda estadística debe producir una recomendación.

No se almacenarán números únicamente por curiosidad.

Cada dato tendrá un propósito.

Ejemplo:

No interesa únicamente conocer que el jugador hizo 34 putts.

Interesa descubrir por qué hizo 34 putts y qué patrón provocó ese resultado.

---

## Principio 4

El sistema debe pensar.

EPG Caddy no será una hoja electrónica.

Será un motor de decisiones.

Toda información deberá ser interpretada antes de ser presentada.

---

## Principio 5

El jugador nunca deberá adaptar su comportamiento a la aplicación.

La aplicación deberá adaptarse completamente al jugador.

---

# 4. MISIÓN DEL SISTEMA

Durante una ronda, EPG Caddy deberá ser capaz de:

• Registrar absolutamente toda la ronda mediante voz.

• Interpretar comandos naturales.

• Llevar el score automáticamente.

• Calcular Stableford.

• Calcular Gross.

• Calcular Net.

• Calcular Handicap.

• Registrar Fairways.

• Registrar Greens.

• Registrar Putts.

• Registrar Penalties.

• Registrar Sands.

• Registrar Aproaches.

• Registrar Recuperaciones.

• Registrar estadísticas avanzadas.

Todo ello sin que el jugador tenga que escribir una sola línea.

---

# 5. OBJETIVO FINAL

Cuando el proyecto alcance su madurez, EPG Caddy deberá comportarse como un verdadero caddie profesional.

Será capaz de responder preguntas como:

"¿Cómo voy hoy?"

"¿Qué porcentaje llevo de Greens?"

"¿Cuál ha sido mi peor hoyo?"

"¿Qué palo me está fallando?"

"¿Estoy perdiendo golpes desde el tee o alrededor del green?"

"¿Cuál es mi tendencia en los pares cinco?"

"¿Qué parte del juego debo entrenar esta semana?"

El sistema no responderá únicamente datos.

Responderá conclusiones.

---

# 6. ESTADO ACTUAL DEL PROYECTO

A la fecha de esta versión (v0.1), el proyecto se encuentra aproximadamente entre un 35 % y un 45 % de desarrollo conceptual.

Se considera terminada la fase de arquitectura.

Ya se encuentran definidos:

✓ Filosofía del proyecto.

✓ Arquitectura general.

✓ Modelo operacional.

✓ Flujo completo de una ronda.

✓ Estructura de Google Sheets.

✓ Modelo de captura por voz.

✓ Modelo de estadísticas.

✓ Modelo de score.

✓ Lógica de Gross.

✓ Lógica de Net.

✓ Lógica Stableford.

✓ Arquitectura del Dashboard.

✓ Arquitectura del Motor IA.

Pendiente:

• Implementación Apps Script.

• Desarrollo del motor operativo.

• Integración con IA.

• Desarrollo aplicación móvil.

• Dashboard gráfico.

• Pruebas de campo.

• Optimización.

---

FIN DE LA PARTE 1
