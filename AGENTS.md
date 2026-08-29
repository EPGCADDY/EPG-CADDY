# Golf Score Card GT · instrucciones del repositorio

Estas reglas aplican a todo el repositorio.

1. Leer antes de cambiar código o Manual:
   - `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/DIRECTRICES_MANDATORIAS.md`
   - `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_GATE_0_PROYECTO.md`
   - `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_GATE_0_PROYECTO.json`
   - `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`
   - ambos ROADMAPS y la especificación pendiente aplicable.
2. Ejecutar `node scripts/project-quality-gate.mjs` antes de producir un candidato.
3. Manual o visual: leer además `MATRIZ_TECNICA_EDITORIAL_MANUAL.md` y su JSON; ejecutar los controles editorial y visual.
4. Funcional: probar escritor oficial, estados, persistencia, corrección, historial y navegador real.
5. Voz: una prueba automática no sustituye iPhone físico, ruido, acentos, interrupción y turnos sostenidos.
6. Tráfico y clima: no declarar datos vivos sin proveedor, fecha, origen y evidencia reproducible.
7. Un solo FAIL bloquea el resultado integral. No redondear un PASS parcial.
8. Producción permanece intacta hasta cero FAIL y aprobación expresa del propietario.
9. Toda modificación se registra en ambos ROADMAPS dentro de la misma versión.
10. Antes de trabajar desde otra conversación, sincronizar la rama canónica remota y conservar obligatoriamente los bancos V354–V362 de voz —incluidos `test-v358-ios-score-universal-physical-recovery.mjs` y `test-v362-physical-voice-recovery.mjs`— y V324/V337/V356 de tráfico-clima. No sustituir archivos completos con versiones de otra rama: cualquier cambio debe ser incremental y ejecutar la auditoría integral. Producción no se toca.
11. Continuidad multiconversación vigente: V368/RC-040 se construye exclusivamente sobre `fix-v366-integrated-main` (`03ca12e`) y sustituye los candidatos divergentes anteriores. El enlace web oficial (`/`, `/index.html`, `/inicio`) debe abrir Registro aun con tarjeta guardada; la app instalada conserva su `start_url` sin `inicio=1` para reabrir la tarjeta viva. Antes de publicar, comparar ancestro, árbol y controles remotos; ninguna conversación puede presentar V365–V367 o un Preview previo como final.
