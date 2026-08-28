# V366 · entrada principal obligatoria · RC-037

**Fecha:** 28 de agosto de 2026  
**Entrada física:** `IMG_2193.png`, Safari/iPhone, Preview V365  
**Estado inicial:** FAIL físico confirmado  
**Candidato:** `V366-PRINCIPAL-ENTRY-RECOVERY-20260828`

## Evidencia recibida

El enlace del Preview abrió `RONDA EN CURSO`, El Pulté, Timer ON y una matriz sin jugadores ni scores. La entrada aprobada sin tarjeta operativa es `Inicio`, no la tarjeta vacía. La captura también confirma que el dominio visitado era el Preview de Vercel.

## Causa y escape

V365 filtraba rondas vacías para recuperar Score Cabo, pero el estado visual de entrada continuaba dependiendo de una sola llamada al final del arranque. El regreso desde segundo plano, `pageshow` y foco sólo ejecutaban `render()`; no imponían nuevamente `Inicio` cuando seguía sin existir una ronda recuperable. La sincronización opcional también se iniciaba antes de montar la entrada principal.

El banco V365 reproducía las claves de almacenamiento y la reparación canónica, pero no ejecutaba cuatro estados visuales: sin ronda, `configured:true` con cero jugadores, Registro ya visible y tarjeta válida.

## Control V366

- `ensurePrincipalEntry()` se activa únicamente cuando no existe una ronda operativa con uno a seis jugadores.
- Arranque, regreso desde segundo plano, `pageshow` y foco aplican el mismo guard.
- Si `Inicio` ya está visible, no vuelve a abrir ni reinicia el Registro.
- Una tarjeta operativa conserva prioridad y permanece viva.
- `Inicio` se monta antes de sincronizaciones opcionales.
- El Service Worker renueva la caché para que Safari descarte el shell rechazado.

## Banco ejecutable

`node test-v366-principal-entry-recovery.mjs` ejecuta dinámicamente el guard en los cuatro escenarios y verifica su presencia en los tres eventos de ciclo de vida y en el arranque. `Intocables/intocables-gate.mjs` lo convierte en control acumulativo obligatorio junto con la persistencia V365, Match Play, Ronda Normal y voz.

La prueba automática no sustituye abrir el nuevo Preview en Safari/iPhone y confirmar que muestra `Inicio` sin ronda operativa y la tarjeta viva cuando sí existe una ronda válida.
