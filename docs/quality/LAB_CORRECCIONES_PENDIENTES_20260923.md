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
