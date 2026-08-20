# Auditoría Maestra V185

**Fecha:** 19 de agosto de 2026  
**Alcance:** reconciliación de código, voz, jugadores, campos, documentación, pruebas y respaldos.

## Resultado ejecutivo

La V185 conserva todos los controles hasta V184 y añade consultas históricas compositivas con calendario de Guatemala, periodos naturales, métricas por hoyo/vuelta/ronda y categorías de score. Vercel Pro fue activado por el propietario y la publicación remota completa quedó verificada. La base local y pública queda coherente. Esto no significa que todas las funciones comerciales planificadas estén implementadas.

## PASS local verificado

- Tarjeta grupal de uno a seis jugadores.
- Gross, Neto, handicap por hoyo, ida, vuelta, total y resultado contra par.
- Prueba exhaustiva del motor para dos matrices, handicaps 0–54, 18 hoyos y Gross 1–12.
- Registro, corrección, incorporación y retiro de jugadores.
- Directorio local y registro V2 de jugadores con migración, consentimiento inactivo por defecto, retiro y claves idempotentes.
- Persistencia transitoria local de hasta 120 rondas mientras se migra a PostgreSQL; no es la arquitectura comercial definitiva.
- Cero creación automática de X y reparación de omisiones históricas identificadas.
- Catálogo visible de siete campos con selección única.
- El Pulté como único campo configurado; los otros seis quedan bloqueados hasta recibir tarjeta oficial.
- Vocabulario golfístico documentado y respaldado en código y prompts de transcripción.
- Dictado continuo, silencio ante frases desconocidas y navegación hablada hacia el registro.
- Watchdog de transcripción y protección de estados activos para evitar bloqueos indefinidos en escucha.
- Cierre oficial idempotente, cero X, snapshot SHA-256, bloqueo de mutaciones directas y corrección versionada con original preservado.
- Cola offline idempotente que conserva sólo mutaciones pendientes y exige acuse remoto íntegro antes de purgar.
- Interruptor rojo `TIMER ON`/`TIMER OFF` para detener y reanudar sin contar la pausa, con superficie táctil ampliada y persistencia.
- Flecha `REGRESAR A DATOS` y retícula protegida contra selección táctil accidental.
- Manual Maestro A–Z, ECOS, arquitectura, base de campos, arquitectura PostgreSQL, SQL inicial y matriz de pendientes presentes.
- Doce paquetes automáticos y validación de sintaxis JavaScript aprobados.

## Alcance real del vocabulario

El vocabulario es **ampliable y respaldado**, no literalmente infinito. Las variantes aprobadas se conservan en el Manual Maestro, el parser local y los prompts de transcripción. Toda frase nueva deberá agregarse a la matriz y a una prueba de regresión antes de considerarse soportada.

## Pendiente antes de afirmar 100% comercial

- Base PostgreSQL realmente provisionada, migrada, autenticada y probada con restauración.
- Transporte central autenticado para la cola offline y resolución de conflictos multi-dispositivo.
- Interfaz completa de correo, preferencias y consentimiento verificable.
- Interfaz física de cierre/corrección y persistencia central de sus snapshots y hashes.
- Generación visual PDF/imagen y entrega remota de los archivos ya derivados localmente.
- Guardar en Fotos, compartir y descargar paquete conjunto.
- WhatsApp Business y correo transaccional con entregas verificables y sin duplicados.
- Correcciones posteriores al cierre con original preservado y rótulo `Tarjeta corregida`.
- Pruebas físicas completas en campo, ruido, segundo plano, iPhone y Android.
- Validación física completa de V179 en todos los dispositivos objetivo, aunque Producción ya entrega la versión correcta.

## Regla para cargar nuevos campos

Se pueden recibir y transcribir nuevas tarjetas desde ahora. Un campo sólo cambiará a `configured:true` después de validar, por cada tee, los 18 hoyos, par, SI/handicap, yardas, rating, slope, totales de ida/vuelta/general y fuente visual. Hasta entonces permanecerá visible pero bloqueado y nunca heredará matrices de El Pulté.

## Evidencia automática

Ejecutar:

```bash
node audit-project.mjs
```

Resultado esperado: doce paquetes en PASS, seguidos de la validación independiente de sintaxis JavaScript.
