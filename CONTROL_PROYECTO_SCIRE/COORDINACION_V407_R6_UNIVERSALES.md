# CONTRATO DE COORDINACIÓN · UNIVERSALES · V407-R6

Fecha: 2026-09-08. Marca única: **GOLF SCORE CARD GT**. Queda prohibido reintroducir “EPG Caddy”.

## Línea de versiones y ramas

| Línea | Rama | Base | Propósito | Prohibición |
|---|---|---|---|---|
| Auditoría visual | `lab/premium-ui-v407` | V407-R5 | cerrar inventario, sistema gráfico y recorrido físico | no incorporar lógica incompleta de Universales |
| Universales | `lab/v407-r6-universales` | `bb21de0` / árbol R5 | motor, pruebas, datos y composición de la nueva modalidad | no tocar `main`; no sustituir el shell gráfico canónico |
| Producción | `main` | `4009f79f50987f8bf105189bce9c5e90b2857363` | versión pública congelada | no publicar ni fusionar sin autorización separada |

## Propiedad sin cruces

| Responsable | Puede modificar | No puede modificar unilateralmente |
|---|---|---|
| Conversación UNIVERSALES | reemplazo del motor `dots.js` por `universales.js`, pruebas de reglas, normalización, snapshot y adaptador de modalidad | tokens, retícula, safe-area, shell común, estilos globales, componentes aprobados de otras modalidades |
| Conversación AUDITORÍA VISUAL | tokens, CSS canónico, retícula principal, plantilla Score Card, Tarjeta Digital Global/Personal, responsive iPhone y evidencia física | reglas de puntos, desempates, handicap, persistencia o cálculos del motor Universales |
| Integración final R6 | conectar adaptador del motor a componentes canónicos y ejecutar regresión conjunta | copiar páginas completas, duplicar escritores o mantener dos implementaciones visuales |

## Contrato de datos para la plantilla

Universales deberá entregar un snapshot compatible con la fuente única de tarjetas, sin HTML ni estilos en el motor:

```js
{
  mode: "universales",
  players: [{ id, name, handicap, tee, holes }],
  courseHoles: [{ hole, par, handicapIndex, yards }],
  universales: {
    groupSize: 3 | 4,
    pointsPoolPerHole: 12,
    holes: [{ hole, grossByPlayer, netByPlayer, pointsByPlayer, ruleKey }],
    totalsByPlayer
  }
}
```

Reglas confirmadas que ambas líneas deben respetar: cada jugador usa su handicap; el golpe correspondiente se aplica por hoyo; el resultado Neto determina el resultado; cada hoyo reparte exactamente 12 puntos; sólo participan grupos de 3 o 4. Los patrones completos de reparto y empate quedan bajo control del motor y no se deducen desde la gráfica.

## Paridad funcional obligatoria

UNIVERSALES no puede entregarse como modalidad reducida. Debe conservar todas las configuraciones y recorridos disponibles en las modalidades completas de GOLF SCORE CARD GT: selección de campo, torneo opcional, fecha/hora Guatemala, nombre, categoría, handicap y marcas por jugador; registro por voz y manual; edición y corrección; persistencia y recuperación; ronda previa e Historial; cálculo Gross/Neto/resultado y puntos; cierre IN/OUT/TOTAL; Tarjeta Digital Global y Personal; compartir LIVE; imagen y envío por WhatsApp; actualización, navegación Atrás y Borrar Todo. Cualquier ausencia es `FAIL` bloqueante.

## Sustitución obligatoria de DOTS

UNIVERSALES ocupa el mismo espacio funcional y visual de DOTS. No se añade otra opción ni se conservan accesos paralelos. El retiro se hace en R6, nunca sobre R5 ni Producción.

| ID conservado | Antes | Después | Dueño del diseño | Fuente de datos |
|---|---|---|---|---|
| APP-22 | Configuración Dots | Configuración Universales | Auditoría visual | adaptador Universales |
| APP-23 | Resultado Dots | Ronda/resultado Universales | Auditoría visual | motor Universales |
| CARD-09 | Sin vista activa | Tarjeta Digital Global Universales | Auditoría visual | snapshot oficial |
| CARD-10 | Sin vista activa | Tarjeta Digital Personal Universales | Auditoría visual | snapshot oficial |

La tarjeta operativa reutiliza el shell Score Card común. La tarjeta para WhatsApp reutiliza `card-artifacts.js` y `card-file-export.js`; no se crea una segunda plataforma de exportación.

El corte R6 debe eliminar de la aplicación activa: botón/nombre DOTS, configuración, resultados, resumen hablado, datos del snapshot, Score Cards, Tarjeta Digital, filtros, textos de Historial, páginas del Manual y pruebas que exijan DOTS. Los datos históricos ya guardados no se reinterpretan como Universales: se conservan únicamente para migración/lectura segura o se retiran mediante una decisión explícita del motor.

## Orden de integración

1. Universales congela reglas y entrega pruebas de motor con 12 puntos exactos por hoyo.
2. Universales sustituye el slot APP-22/23 y elimina la superficie activa completa de DOTS.
3. Auditoría visual aplica los componentes canónicos a APP-22/23 y CARD-09/10.
4. Se integra una sola vez en `lab/v407-r6-universales` después de incorporar el último árbol R5 aprobado.
5. Se ejecutan Gate 0, Intocables, regresión de todas las modalidades, prueba negativa de cero DOTS activo y revisión física iPhone de las cuatro vistas Universales.
6. Sólo un commit de integración puede modificar simultáneamente adaptador y plantilla; debe estar registrado en ambos ROADMAPS.

## Estado

- Contrato cruzado: ACTIVO.
- Motor Universales: pendiente en la otra conversación.
- Plantilla visual: reservada; no se implementa hasta recibir snapshot probado.
- Integración: pendiente.
- Producción intacta: SÍ.
