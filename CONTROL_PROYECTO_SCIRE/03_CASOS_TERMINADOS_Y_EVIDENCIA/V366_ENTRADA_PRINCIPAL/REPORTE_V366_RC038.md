# V366 · entrada principal obligatoria · RC-038

**Fecha:** 28 de agosto de 2026  
**Entrada física:** `IMG_2193.png`, Safari/iPhone, Preview V365  
**Estado inicial:** FAIL físico confirmado  
**Candidato:** `V366-PRINCIPAL-ENTRY-RECOVERY-20260828`

## Evidencia recibida

El enlace del Preview abrió `RONDA EN CURSO`, El Pulté, Timer ON y una matriz sin jugadores ni scores. La entrada aprobada sin tarjeta operativa es `Inicio`, no la tarjeta vacía.

## Causa y escape

V365 filtraba rondas vacías para recuperar Score Cabo, pero no convertía la entrada visual sin ronda en un estado obligatorio durante todo el ciclo de Safari. El banco anterior no ejecutaba los cuatro estados visuales: sin ronda, `configured:true` con cero jugadores, Registro ya visible y tarjeta válida.

## Control V366

- `ensurePrincipalEntry()` se activa únicamente cuando no existe una ronda operativa con uno a seis jugadores.
- Arranque, regreso desde segundo plano, `pageshow` y foco aplican el mismo guard.
- Si `Inicio` ya está visible, no vuelve a abrir ni reinicia el Registro.
- Una tarjeta operativa conserva prioridad y permanece viva.
- `Inicio` se monta antes de sincronizaciones opcionales.
- `nueva_ronda=1` conserva su entrada explícita sin borrar la ronda activa hasta `INICIAR RONDA`.
- El Service Worker renueva la caché para que Safari descarte el shell rechazado.

## Banco ejecutable

`node test-v366-principal-entry-recovery.mjs` ejecuta dinámicamente los cuatro escenarios y verifica ciclo de vida, arranque y compatibilidad V364. `Intocables/intocables-gate.mjs` lo convierte en control acumulativo junto con persistencia, Match Play, Ronda Normal y voz.

La prueba automática no sustituye abrir el nuevo Preview en Safari/iPhone.
