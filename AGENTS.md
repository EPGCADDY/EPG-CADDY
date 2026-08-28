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

