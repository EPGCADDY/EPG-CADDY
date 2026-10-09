# INVENTARIO CANÓNICO DE PANTALLAS Y ESTADOS · V407-R5

Fecha de corte: 2026-09-08. Alcance: superficies visuales operables, estados sustancialmente distintos y artefactos oficiales. Un cambio de datos dentro de la misma composición no crea otra pantalla; un cambio de modalidad, jerarquía, panel, vacío/error/carga o tarjeta sí.

| ID | Familia | Pantalla o estado físico obligatorio | Activador verificable |
|---|---|---|---|
| APP-01 | Principal | Inicio sin ronda | almacenamiento vacío / entrada normal |
| APP-02 | Principal | Registro · selección de campo y modalidad | NUEVA RONDA |
| APP-03 | Principal | Registro · jugadores y configuración | SIGUIENTE |
| APP-04 | Principal | Ronda General · captura manual | ronda `general` |
| APP-05 | Principal | Ronda General · tabla completa | desplazamiento bajo captura |
| APP-06 | Principal | Ronda General · ronda previa | RONDA PREVIA |
| APP-07 | Principal | Editar jugador | + JUGADOR / edición |
| APP-08 | Principal | Corregir datos de ronda | editor de ronda activa |
| APP-09 | Principal | Match Play | modalidad `match_play` |
| APP-10 | Principal | Four Ball | modalidad `four_ball` |
| APP-11 | Principal | Stableford · configuración | STABLEFORD |
| APP-12 | Principal | Stableford · captura y tabla | ronda `stableford` |
| APP-13 | Principal | Stableford · serie/clasificación | clasificación Stableford |
| APP-14 | Principal | Resultado oficial Stableford | editor de resultado |
| APP-15 | Principal | Práctica / provisional | modalidad provisional |
| APP-16 | Juegos | Skins · configuración | juego `skins` |
| APP-17 | Juegos | Skins · resultado en vivo | resultado `skins` |
| APP-18 | Juegos | Wolf · configuración | juego `wolf` |
| APP-19 | Juegos | Wolf · resultado en vivo | resultado `wolf` |
| APP-20 | Juegos | Vegas · configuración | juego `vegas` |
| APP-21 | Juegos | Vegas · resultado en vivo | resultado `vegas` |
| APP-22 | Juegos | Dots · configuración | juego `dots` |
| APP-23 | Juegos | Dots · resultado en vivo | resultado `dots` |
| APP-24 | Asistencia | AI universal · consulta | AI ∞ |
| APP-25 | Asistencia | AI universal · Reglas | REGLAS |
| APP-26 | Asistencia | AI universal · escuchando | micrófono activo |
| APP-27 | Asistencia | AI universal · respondiendo | respuesta hablada |
| APP-28 | Asistencia | AI universal · error recuperable | fallo controlado |
| APP-29 | Tarjeta | Tarjeta digital final · ronda en curso | TARJETA DIGITAL |
| APP-30 | Tarjeta | Tarjeta digital final · ronda cerrada | FINALIZAR RONDA |
| APP-31 | Tarjeta | Corrección oficial | CORREGIR TARJETA |
| APP-32 | Historial | Historial · lista con datos | HISTORIAL |
| APP-33 | Historial | Historial · vacío | archivo sin rondas |
| APP-34 | Historial | Historial · filtros/búsqueda | consulta aplicada |
| APP-35 | Historial | Confirmar eliminación | pulsación larga / eliminar |
| APP-36 | Historial | Estadísticas · entrada | ESTADÍSTICAS |
| APP-37 | Historial | Estadísticas · resultado | CONSULTAR |
| APP-38 | Cuenta | Respaldo · local/sin sesión | CUENTA |
| APP-39 | Cuenta | Respaldo · sesión activa | iniciar sesión |
| APP-40 | Sistema | Instalar aplicación · iPhone | INSTALAR |
| APP-41 | Sistema | Actualización vigente | control ACTUALIZADO |
| APP-42 | Sistema | Actualización disponible | control ACTUALIZAR |
| LIVE-01 | Torneo Live | Centro de torneos | LIVE |
| LIVE-02 | Torneo Live | Ingreso por código | AGREGAR / VER TORNEO |
| LIVE-03 | Torneo Live | Monitor General | GENERAL |
| LIVE-04 | Torneo Live | Monitor Jugadores | JUGADORES |
| LIVE-05 | Torneo Live | Detalle por categoría | categoría |
| LIVE-06 | Torneo Live | Buscar jugador · resultados | BUSCAR |
| LIVE-07 | Torneo Live | Buscar jugador · vacío | consulta sin coincidencia |
| LIVE-08 | Torneo Live | Mi Tablero / favoritos | MI TABLERO |
| LIVE-09 | Torneo Live | Selector/importación externa | importar jugador |
| LIVE-10 | Torneo Live | Carga | petición pendiente |
| LIVE-11 | Torneo Live | Error / sin conexión | fallo de red controlado |
| CARD-01 | Artefacto | General Global | tarjeta oficial global |
| CARD-02 | Artefacto | General Personal | tarjeta oficial personal |
| CARD-03 | Artefacto | Stableford Global | tarjeta oficial global |
| CARD-04 | Artefacto | Stableford Personal | tarjeta oficial personal |
| CARD-05 | Artefacto | Match Play Global | tarjeta oficial global |
| CARD-06 | Artefacto | Match Play Personal | tarjeta oficial personal |
| CARD-07 | Artefacto | Four Ball Global | tarjeta oficial global |
| CARD-08 | Artefacto | Four Ball Personal | tarjeta oficial personal |
| DOC-01 | Manual | Índice y búsqueda | MANUAL |
| DOC-02 | Manual | Página de función | abrir resultado |
| DOC-03 | Manual | Búsqueda sin resultados | consulta inexistente |
| SAFE-01 | Adaptación | Cabecera principal iPhone con área segura | iPhone vertical |
| SAFE-02 | Adaptación | Overlay iPhone con área segura | overlay vertical |
| SAFE-03 | Adaptación | Tarjeta/tabla con desplazamiento horizontal controlado | ancho 390–430 px |

**TOTAL CANÓNICO: 67 pantallas y estados.**

La matriz de ejecución vinculada es `MATRIZ_AUDITORIA_VISUAL_V407_R5.md`. Ningún ID se considera revisado físicamente sin evidencia de navegador o captura real asociada.
