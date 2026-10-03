# R158 · aceptación de Scores

- Fuente canónica: main d0ff81d1b653, R157; referencias del propietario IMG_5694/5695.
- Alcance: tabla corrida de todos los jugadores de mi grupo, seis columnas, título SCORES MI GRUPO y detalle de 18 hoyos por doble toque; navegación uniforme en todas las ramas de Scores localizadas.
- Criterios: cero navegación del botón de grupo a dashboard torneo; pertenencia sólo de tarjeta actual; ninguno sin pertenencia; 60 integrantes completos incluido sin scores y paginación; doble toque selecciona la persona correcta, 18 celdas; X cierra únicamente detalle y vuelve a lista; X y menú fijos 44px y misma altura; cierres de directorio/Live/código; menú accesible compartido/público.
- Riesgos: reglas CSS heredadas con mayor especificidad, datos privados y cuentas ajenas, actualización de filas entre toques, scroll de listas largas. Sin cambios de API ni permisos ni escritores.
- Pruebas: banco técnico completo, test-r158-group-scores.mjs, scripts/review-r158-scores.mjs Chromium real con datos QA; negativo de pertenencia y continuidad scores/reloj.
- Rollback: revertir a árbol de R157 d0ff81d1b653 sin borrar almacenamiento ni datos; alinear ramas.
- Estado: validación local PASS: banco integral completo y 78 casos Chromium (390/430 × 932), cero errores de página; Preview PASS y entrega PUBLICADA. No se afirma revisión física de iPhone.

R158 añade identificación MI GRUPO/TORNEO + nombre en Inicio y Score Card, sólo si pertenece a la tarjeta actual. El selector de favoritos queda fuera del panel oculto; X raíz se oculta mientras detalle/menú/selector utiliza su cierre para evitar interceptar el toque. Sin códigos de invitación en esta identificación.


## R158 · PUBLICADA · 3 octubre 2026, 10:36 Guatemala
PR48 integrado: 8c92f66a1429ad02e5c4881e341b1c02390c98d9; árbol f6d7f68da3ec952d5119670b8c0d811c383f97a5 idéntico al candidato validado. main y lab/r146-entry-open-24h-invites-20260930 alineados sin force. READY: EPG main dpl_HocT2Qy8u8QufExbYUoJYdHBTG3W; LAB main dpl_8NqVuDDjyhmombdYxbN2VvAH48PM; LAB instalado dpl_BSbvWRE8CVnbWW1ebsJeZ9L4bzpC. Tres orígenes release.json HTTP200 R158. Chrome producción: ACTUALIZAR pasó R157 a R158; menú conserva Registro debajo de Manual. Evidencia auténtica CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R158_SCORES/produccion.jpg. Banco integral PASS, 78 casos Chromium QA PASS, cero errores de página; no prueba física iPhone. Rollback R157 d0ff81d1b653 mediante reversión sin borrar datos. Sin acción necesaria del propietario salvo ACTUALIZAR si su app aún muestra R157. Este cierre documental se archiva en rama docs/r158-published-evidence; producción permanece en el código validado.
