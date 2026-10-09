# PEND-UBI-015 · Detección automática del campo por GPS

**Fecha de registro:** 26 de agosto de 2026
**Estado:** PENDIENTE
**Relación:** complementa `PEND-CAM-009`, `PEND-GPS-010` y `PEND-CLI-002`

## Objetivo

Detectar automáticamente en qué campo de golf se encuentra el jugador usando la ubicación autorizada del iPhone y proponer ese campo en Configuración, sin sustituir silenciosamente una selección manual.

## Flujo previsto

`PERMISO GPS → COORDENADA EFÍMERA → CAMPOS CERCANOS VERIFICADOS → DISTANCIA AL PERÍMETRO/CLUBHOUSE → PROPUESTA DE CAMPO → CONFIRMACIÓN O CAMBIO MANUAL`

## Condiciones obligatorias

- Mantener un catálogo verificado de coordenadas y perímetros de los campos admitidos; no inferir campos inexistentes ni usar nombres aproximados.
- Detectar por proximidad y perímetro, con umbrales documentados y manejo de clubes vecinos o señal imprecisa.
- Mostrar una propuesta clara: `PARECE QUE ESTÁS EN EL PULTÉ`; el jugador puede confirmar o escoger otro campo.
- No cambiar un campo de una ronda ya iniciada ni mezclar tarjetas, tees, pares, handicaps o yardajes.
- Usar ubicación exacta sólo durante la detección, salvo consentimiento explícito para conservarla con la ronda.
- Funcionar con permiso denegado, señal débil o sin Internet mediante selección manual y catálogo local.
- Probar físicamente los campos de Guatemala en iPhone, incluyendo llegada, clubhouse, hoyos extremos, reingreso y cambio de campo.

## Condición de cierre

Sólo podrá cerrarse cuando cada campo activo tenga coordenadas verificadas, la detección no produzca falsos positivos en pruebas reales, la confirmación manual sea inequívoca y el campo seleccionado alimente la misma arquitectura oficial de ronda.

## Frases para localizar

`detectar campo`, `GPS campo`, `ubicación de campo`, `campo cercano`, `selección automática`, `PEND-UBI-015`.
