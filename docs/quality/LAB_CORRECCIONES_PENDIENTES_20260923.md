# Correcciones acumuladas LAB — candidato R48

Estado: integrado y build técnico PASS; NO PUBLICADO. Última versión observada en LAB: R43. Este inventario combina R44–R47 remotos con cambios locales desde R43. Los cambios anteriores ya pertenecen a la base y no deben restaurarse si una orden posterior los sustituyó (por ejemplo micrófono retirado, popup reemplazado por teclado fijo).

| Corrección incluida | Pantalla / comprobación tras publicar |
|---|---|
| Teclado completo e independiente de jugadores | ANOTADOR con 1, 2, 3 y 6 jugadores: ver filas 1–3, 4–6, 7–9 y 0/X; comprobar alineación y ausencia de recortes en móvil. Geometría aún pendiente. |
| Cada tecla escribe su número exacto | En par 3/4/5 tocar 1–9; cotejar GROSS, especialmente 4 y 7/8/9. |
| 0 omite y X borra | Seleccionar jugador: 0 registra no jugado; X elimina sólo su score. |
| Corrección conserva jugador | Tocar score existente, cambiar varias veces; selección permanece en esa casilla. |
| Borrar y reemplazar conserva jugador | X seguido de número mantiene el jugador elegido. |
| Hoyo permanece hasta ENTER | Completar jugadores: no cambiar hoyo automáticamente; ENTER o navegación lo cambia. |
| Selección estable sin callback diferido | Cambiar rápido de jugador/corregir; comprobar destino exacto. |
| Ronda cerrada protegida | Ronda oficialmente cerrada no admite escritura por teclado. |
| Escritura fallida conserva destino | Control técnico de fallo: vuelve al mismo jugador; no exige provocar fallo en datos reales. |
| Contrato único en tarjetas | Principal/modalidades integradas y Stableford independiente coinciden en 1–9/0/X; independiente mantiene scores hasta30. |
| ACTUALIZAR fijo bajo MENÚ | Móvil y distintas pantallas: botones separados en derecha; sustituye anterior centrado local. |
| Módulo compartido disponible offline | Tras cargar actualización, cerrar/reabrir PWA offline y verificar captura con datos de prueba. |
| Vueltas por hoyos fijos | 1–9 primera y10–18 segunda, comenzando por1 o10; total sólo con18 completos. |
| Reintento de audio rearma vuelta correcta | Si audio falla, nuevo intento corresponde al segmento correcto; pendiente escucha física. |
| Nueva ronda usa modalidad actual | Cambiar modalidad desde Stableford y crear nueva ronda; no volver indebidamente a Stableford. |
| MENÚ no tapa ATRÁS en historial | En móvil abrir historial y comprobar ambos controles separados. |
| Alias hoyo10 bajo yardaje | Tarjeta principal y digital: alias y yardas legibles sin superposición. |
| LIVE Medal sin puntos ajenos | Tarjeta compartida Medal Play no muestra totales Stableford/Universales, incluso ceros heredados. |
| Caché y versión sincronizados | Cabecera y Service Worker R48; actualización sin mezclar scripts antiguos. |
| Build acepta contrato vigente y prueba handler real | Verificación técnica: Stableford independiente conserva dato ante valores inválidos; build completo aprobado. |

## No resuelto / no certificado
- No se ha publicado este candidato ni comprobado su geometría en navegador móvil.
- Skins observado como Medal y botón residual: investigación pendiente.
- Texto de audio anterior visible en nueva práctica: pendiente.
- La Reunión con datos pese a directriz de plantilla vacía: pendiente.
- Audio audible/iPhone, recepción real de compartidos, todas las pantallas: no certificados.

## Recuperación
- Rama lab/r32-keypad-20260922; base local9aea174 + remoto053d0e9.
- Proyecto permitido: golf-sc-gt-lab; nunca principal.
- Último READY observado dpl_4Dynj8tK7P4ZsL7kXPiintLJ9we6 (R43).
- Bloqueos: rechazo automático al omitir configuración2FA y desconexión de transporte del navegador. No modificar seguridad sin autorización específica; no intentar eludir rechazo.
- Próximo: recuperar navegador, resolver aviso con propietario, publicar sólo LAB, esperar READY y confirmar versión; recorrer inventario y entregar lista final con estado real.


### R48 subida y READY · activación LAB pendiente
Autorización específica recibida: omitir por ahora configuración2FA. Botón Skip securing my account ejecutado; aviso resuelto. Push CLI rechazado por falta de credenciales; conector GitHub autenticado subió43 blobs. Árbol remoto05d34494c76b3385fed46aa12386e224a359e8ad idéntico al candidato local7b6d8fe. Commit remoto4ae6240f0c94b3f294107775e13092b52e685682, rama lab/r48-integrated-review-20260923; main intacta.
Vercel LAB generó dpl_8eRqD6uqUD545r3aaUwPqsvJuUfd, READY confirmado mediante conector. Preview https://golf-sc-gt-hhcgnbnvm-epgcaddys-projects.vercel.app abre acceso privado; no se certificó tarjeta en ese origen.
Activación dominio golf-sc-gt-lab.vercel.app pendiente: panel ofrece Force Promote to Production dentro del proyecto LAB, reconstruye con entorno LAB y explícitamente exige omitir requisitos Lint y TypeCheck. No se pulsó confirmación Promote to Production. Solicitar autorización específica para omitir esos dos requisitos; no cambiar configuración ni main. Build técnico completo PASS no equivale al estado de esos checks. Dominio habitual aún no actualizado por esta tarea.


### R48 PUBLICADA EN LAB · confirmación final
Usuario autorizó omitir Lint/TypeCheck para activar exclusivamente LAB. Se confirmó Promote sobre despliegue dpl_8MxdkZ8GDztr6fyWd7SX2RRGaaKs, commit4ae6240; conector confirma READY y alias golf-sc-gt-lab.vercel.app. Proyecto principal no modificado.
Navegador habitual retuvo R43 en caché; ACTUALIZAR terminó abriendo MENÚ en esa página antigua. URL index-grupal.html?release=R48 cargó VERSIÓN R48 y conservó ronda de prueba. Captura lab-r48-publicada.jpg.
Prueba interactiva R48: hoyo1 jugador UNO corregido4→8→4 sin reselección; score final4, demás jugadores5/5/5, hoyo1 conservado. Esto confirma destino de corrección y permanencia de hoyo en ese caso. No equivale a certificación integral/iPhone/audio. Inventario de correcciones aplicadas corresponde al candidato ahora publicado; pendientes Skins/audio residual/La Reunión siguen pendientes.
