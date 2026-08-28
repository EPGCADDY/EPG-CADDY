# V365 · recuperación de ronda activa · RC-037

**Fecha:** 28 de agosto de 2026  
**Entrada física:** `IMG_2186.png`, Safari/iPhone, Producción  
**Estado inicial:** FAIL físico confirmado  
**Candidato:** `V365-ACTIVE-ROUND-RECOVERY-20260828`

## Evidencia recibida

La pantalla muestra `RONDA EN CURSO`, El Pulté, hora de inicio y Timer ON, pero la matriz no contiene jugadores ni scores. El propietario confirmó que el enlace debía abrir la tarjeta viva de Score Cabo y que no había autorizado sustituirla mediante `INICIAR RONDA`.

## Causa reproducida

Una copia heredada más reciente con `configured:true` y `players:[]` era aceptada por `latestStoredRound()`. Al existir esa candidata, no se consultaba la tarjeta operativa guardada en el archivo local. La bandera `configured` también impedía reintentar la recuperación en `pageshow` y `focus`.

## Control V365

- Una ronda recuperable exige de uno a seis jugadores.
- Se filtran copias vacías de clave canónica, principal, respaldo y claves por modalidad.
- Si el archivo contiene la última tarjeta operativa, se restauran íntegros jugadores y scores.
- La tarjeta recuperada vuelve a guardarse en `ACTIVE_ROUND_KEY`.
- Arranque, `pageshow` y `focus` usan la misma condición.
- Sólo confirmar `INICIAR RONDA` puede crear la sustituta.

## Banco ejecutable

`node test-v365-active-round-empty-recovery.mjs` construye: clave canónica vacía, principal/respaldo vacíos más recientes y tarjeta archivada `score-cabo-viva` con un score. El PASS exige recuperar la tarjeta, conservar el gross y reparar la clave canónica.

La prueba automática no sustituye la reapertura física Safari/iPhone del Preview integrado.
