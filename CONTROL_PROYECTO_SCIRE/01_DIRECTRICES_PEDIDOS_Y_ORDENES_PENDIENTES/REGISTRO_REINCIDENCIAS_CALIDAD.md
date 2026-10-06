## RC-106 · CANDIDATO ABIERTO BORRÓ LA INVITACIÓN DE 24 H Y REACTIVÓ LA PUERTA AL RESTAURARLA · 30 SEPTIEMBRE 2026

- Defecto expuesto: la corrección de entrada libre afirmó haber retirado la invitación de 24 horas; al restaurarla reapareció en `index-grupal.html` la carga de `auth-gate.js`, y el vencimiento temporal todavía enviaba al formulario propietario.
- Causa raíz: mezcla de la entrada global con la herramienta de invitación y regresión de archivos completos desde el commit previo, sin probar juntos el arranque raíz y el ciclo de vencimiento.
- Control permanente: `test-r18-owner-guest-24h-access.mjs` recorre `/`, Registro y `/access.html` anónimos, verifica que el módulo de login no se monte en Score Card, conserva emisión/canje/aislamiento/vencimiento de invitación y ejecuta el camino de expiración sin permitir expulsión a login. Las matrices distinguen explícitamente ambos alcances.
- Evidencia: controles dirigidos por ejecutar después de esta corrección; sin despliegue publicado ni verificación física en esta etapa.
- Estado: PRUEBAS DIRIGIDAS PASS; GATES COMPLETOS PENDIENTES; NO PUBLICADO; PRODUCCIÓN INTACTA.

# Registro de reincidencias de calidad

## RC-105 · TORNEO FRIENDS SE CREABA SIN TARJETAS PUBLICADAS · 29 SEPTIEMBRE 2026

- Defecto reportado con capturas: el evento Friends aparecía en TORNEOS, pero al abrir RESULTADOS GENERALES mostraba 0 jugadores y “TODAVÍA NO HAY SCORE CARDS PUBLICADAS”.
- Causa raíz: la unión autom���q�^