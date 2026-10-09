# Golf Score Card GT Operating System (ECOS)

## Versión
1.0

## Estado
En desarrollo

## Documento Oficial del Sistema Operativo

---

# PROPÓSITO

Este documento define el comportamiento interno obligatorio de Golf Score Card GT.

No describe arquitectura.

No describe pantallas.

No describe algoritmos matemáticos.

Describe exclusivamente cómo debe comportarse el sistema durante su operación.

Toda implementación del software deberá cumplir obligatoriamente las reglas definidas en este documento.

En caso de conflicto entre una implementación y este documento, prevalecerá este documento.

---

# CAPÍTULO 1
## Principios Operativos Fundamentales

### OS-001 — Silencio Operativo

Mientras el sistema procesa información, está estrictamente prohibido emitir palabras, sonidos, murmullos, confirmaciones parciales o cualquier salida de audio.

La única salida permitida será la respuesta final cuando el procesamiento haya concluido completamente.

---

### OS-002 — Registro silencioso y cierres autorizados

Al registrar uno o varios scores, el sistema guarda y recalcula en silencio. Está prohibido recitar automáticamente el resultado de cada jugador o cerrar un hoyo por inferencia.

La voz sólo puede producirse por:

1. consulta expresa del usuario;
2. cierre completo de primera vuelta;
3. cierre completo de segunda vuelta;
4. cierre completo de ronda;
5. error literal autorizado por la matriz vigente.

Un jugador no mencionado en un hoyo queda simplemente sin score registrado. Avanzar a otro hoyo nunca fabrica una X. Sólo una X expresamente indicada puede existir y siempre puede reemplazarse posteriormente por un Gross real con recálculo integral.

---

### OS-003 — Prohibición de Inventar Datos

El sistema nunca podrá asumir información inexistente.

Si falta un dato obligatorio, deberá solicitar únicamente ese dato o informar que el cálculo no puede completarse.

---

### OS-004 — Fuente Oficial de Datos

Todo cálculo deberá consultar exclusivamente la información almacenada en COURSE_DATABASE.md.

Queda prohibido utilizar información proveniente de conversaciones anteriores, memoria temporal o inferencias.

---

### OS-005 — Persistencia del Proyecto

Toda regla funcional aprobada deberá incorporarse a un documento oficial del repositorio GitHub.

Ninguna regla operativa dependerá del historial de conversaciones.

---

### OS-006 — Recalculo Automático

Si se modifica cualquier hoyo de una ronda, el sistema deberá recalcular automáticamente toda la ronda desde el hoyo 1 hasta el hoyo 18.

No se permiten cálculos parciales.

---

### OS-007 — Prioridad del Juego

Durante una ronda de golf, la prioridad absoluta será no interrumpir el ritmo del jugador.

El sistema deberá minimizar preguntas y únicamente solicitar información cuando sea estrictamente indispensable.

---

### OS-008 — Continuación efectiva mediante 👍🏻

Cuando el asistente solicite al propietario que envíe `👍🏻` para autorizar o reanudar el trabajo, la recepción de ese símbolo constituye una orden expresa de **continuar inmediatamente todo el procesamiento pendiente hasta su conclusión técnica o hasta encontrar un bloqueo real**.

Está prohibido contestar únicamente con otro `👍🏻`, una confirmación vacía o un mensaje de espera. La respuesta debe ir acompañada de ejecución real, revisión, pruebas, documentación y demás acciones pendientes autorizadas.

Si durante esa continuación se necesita PC, autenticación, GitHub, Vercel, permisos o una acción manual del propietario, se activa de inmediato OS-009.

---

### OS-009 — Aviso inmediato de dependencia del propietario

En el mismo instante en que se detecte una dependencia del propietario, el asistente debe detener únicamente la parte bloqueada y avisar qué necesita, por qué, dónde y cuál es el paso exacto. Nunca podrá callar el bloqueo, aparentar conclusión ni esperar a que el propietario lo descubra.
