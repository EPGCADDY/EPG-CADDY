# R183 · Reabrir directamente la Score Card activa

Fecha: 7 de octubre de 2026. Base: R181 (6cbfda4).

## Criterio

- Con una ronda recuperable guardada, volver a abrir la app muestra directamente la Score Card.
- La entrada `/index-grupal.html?inicio=1` no abre Registro mientras exista esa ronda.
- Sin ronda recuperable, Inicio conserva el registro inicial.
- `nueva_ronda=1` sigue abriendo Registro para iniciar una ronda nueva.
- La ronda y sus marcas se conservan al reabrir.

## Evidencia

- `test-r183-active-scorecard-reopen.mjs` cubre restauración activa, inicio vacío y nueva ronda explícita.
- `test-v368-canonical-home-entry.mjs` conserva las rutas canónicas y verifica que la tarjeta activa no se tape con Registro.
- Publicación condicionada a compuertas aplicables y revisión del despliegue.
