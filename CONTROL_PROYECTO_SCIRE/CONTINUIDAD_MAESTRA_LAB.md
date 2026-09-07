# EPG CADDY · CONTINUIDAD MAESTRA PERMANENTE DE LAB

## Continuidad V406-R14 · 7 de septiembre de 2026

R13 fue rechazado en recorrido visual real: después de tocar ACTUALIZAR continuaba verde/parpadeante aun con el mismo release. R14 restaura el contrato obligatorio: apagado cuando está vigente, verde/parpadeante sólo ante un release remoto distinto, con `persist()` antes de recargar. Pendientes bloqueantes: regresión integral R14, Preview LAB READY y recorrido visual publicado actualización→conservación→apagado. MAIN/Producción permanecen intactas.

## Continuidad V406-R13 · 7 de septiembre de 2026

R11 quedó desplegado con `gscg-release` R9 y por eso una instalación anterior no activó el parpadeo. R13 mantiene ACTUALIZAR verde/parpadeante siempre, incluso estando vigente. Debe verificarse visualmente desde una sesión con ronda persistida: tocar ACTUALIZAR conserva la ronda, BORRAR TODO elimina la ronda, una recarga y una reapertura muestran Inicio sin jugadores. MAIN/Producción permanecen intactas.

## Continuidad V406-R11 · 7 de septiembre de 2026

Corrección candidata: `BORRAR TODO` elimina la ronda activa y evita su recuperación desde Historial; cerrar y abrir debe mostrar Inicio limpio. Otras rondas oficiales permanecen en Historial. Caché R11; MAIN intacta; prueba física iPhone pendiente.

## Continuidad V406-R10 · 7 de septiembre de 2026

LAB incorpora Centro de Torneos (máximo cinco), enlace exclusivo por torneo y alimentación multiteléfono sin capitán. La tarjeta de cada teléfono sigue siendo personal; General/categorías deduplican por grupo, jugador y hoyo. Pendiente de cierre: validación física LAB antes de cualquier promoción a MAIN.

## Continuidad V406-R9 · 7 de septiembre de 2026

El selector de posiciones de TORNEO LIVE se denomina GENERAL; conserva Campeonato, A, B, C, D, Femenina, Senior y S.Senior. Esquema visual R6/R8 y reglas operativas R7 preservados. MAIN intacto.

## Continuidad V406-R8 · 7 de septiembre de 2026

Restaurado el esquema gráfico V406-R6 de TORNEO LIVE: General, filtro por categorías y posiciones aparecen antes de cualquier listado individual. Los 67 jugadores simulados y las siete reglas operativas R7 permanecen. El listado alfabético para Mi Tablero sólo aparece después de una búsqueda. MAIN permanece intacto.

## Continuidad V406-R7 · 7 de septiembre de 2026

GENERAL, categoría e Individual se actualizan y reubican por score acumulado cada tres segundos. En empate de resultado, mayor avance de hoyos queda arriba; al completar 18 aparece FINAL. Un mismo número de hoyo sólo puede aportar una vez al acumulado. La vista usa categorías y sus colores, con Campeonato como C en cuadro blanco; Mi Tablero lista por primer nombre en orden alfabético. Las marcas predeterminadas se derivan de la categoría. MAIN permanece intacto.

## Continuidad V406-R6 · 7 de septiembre de 2026

TORNEO LIVE abierto desde LAB sin enlace muestra una demostración temporal de 67 jugadores por categorías 7/6/24/11/7/7/5. Es sólo lectura, no modifica datos reales y permite comprobar clasificación, búsqueda y detalle. La caché V406-R6 activa el botón ACTUALIZAR del acceso LAB instalado. MAIN permanece intacto.

## Continuidad V406-R4 · 7 de septiembre de 2026

LIVE, REGLAS, AI ∞ y Support quedan dentro del flujo. Registro diferencia CATEGORÍA y MARCAS. ATRÁS, BORRAR SCORES y + JUGADOR comparten fila. La escala se verifica con 67 nombres temporales por categorías 7/6/24/11/7/7/5, sin alterar datos reales ni fijar cantidades.

## Continuidad V406-R2 · 7 de septiembre de 2026

V406-R2 mantiene la categoría individual de V406-R1, consolida Registro sin hoja de sobrescrituras y asigna a TORNEO LIVE una hoja canónica propia. En móvil, cada jugador usa dos líneas: Nombre + Categoría y luego HDCP + Marcas, con campos de 48 px y tipografía legible.

TORNEO LIVE incorpora una Vista detallada de categoría temporal y de sólo lectura. Reúne la cantidad real disponible —por ejemplo 14, 20, 22 o 30—, sin número fijo ni filas de relleno; mezcla los foursomes y reordena de líder a peor resultado tras cada actualización. Presenta hoyos 1–18 con Gross/Neto/resultado y cortes IN/OUT/TOTAL. No crea Score Card, PDF, archivo ni historial; el foursome es solamente la fuente y una referencia secundaria.

Cada categoría abre con fecha automática Guatemala, torneo, modalidad y categoría grande; la clasificación compacta muestra POS, NOMBRE, HDCP, MARCAS, GROSS, NETO y +/− antes del detalle por hoyo.

La capacidad visual automática cubre 100 participantes en 25 foursomes de cuatro. El límite rígido también quedó protegido en `api/live.js`: publicación y unión bloquean el torneo, cuentan dentro de la transacción y rechazan al jugador 101 con HTTP 409. Navegador automatizado no disponible en este entorno y prueba física iPhone/Safari pendiente. MAIN permanece en `f24af2dd954ef11a87c885f9db15d34dfd7b65bf`.

## Continuidad V406-R1 · 7 de septiembre de 2026

V406-R1 añade categoría individual en Registro y TORNEO LIVE con índice por categoría y MI TABLERO. La prueba física en iPhone/Safari sigue pendiente; no promover a MAIN antes de esa evidencia. MAIN permanece en `f24af2dd954ef11a87c885f9db15d34dfd7b65bf`.

**Identificador:** `EPG-CADDY-LAB-CONTINUITY-V1`  
**Fecha:** 7 de septiembre de 2026  
**Autoridad:** instrucción expresa del propietario  
**Alcance:** continuidad entre conversaciones, ramas, pruebas y Preview de LAB.

## 1. Separación absoluta

- `MAIN NO SE TOCA NUNCA` durante el trabajo LAB.
- MAIN/Producción queda congelada en `f24af2dd954ef11a87c885f9db15d34dfd7b65bf`.
- Deployment MAIN: `dpl_FuDVeY79yoTgjdsJwLRBsXSfR3L7`.
- Enlace MAIN: `https://epg-caddy.vercel.app/index-grupal.html?inicio=1`.
- Todo trabajo, prueba, commit y deployment nuevo se ejecuta exclusivamente en la rama `LAB`.
- Ninguna aprobación de LAB autoriza por sí sola modificar MAIN.

## 2. Último LAB publicado

- Versión: `V404 LAB`.
- Commit remoto: `6ca572ccdf74054a618fd473519edc6342fcc74c`.
- Deployment: `dpl_4AGM3JUoxkR6UGVJv7kuDqrfr8es`.
- Estado registrado: `READY`.
- Enlace permanente: `https://epg-caddy-git-lab-epgcaddys-projects.vercel.app/index-grupal.html`.
- V404 bloquea selección y `Copiar / Buscar selección` durante la pulsación prolongada sobre una ronda del Historial, sin alterar diálogo, borrado persistente ni doble toque.
- Pendiente físico: confirmar en iPhone que la pulsación prolongada abre `ELIMINAR` sin menú nativo.

## 3. Trabajo vigente V405

- Botón `ACTUALIZAR` visible, oscuro y deshabilitado sin versión nueva.
- Verde y parpadeante cuando el release publicado difiere del instalado.
- Al tocarlo ejecuta `persist()` antes de recargar el mismo dominio.
- No borra sesión, ronda, scores, jugadores, perfil ni Historial.
- El dominio LAB permanente recibirá futuras versiones sin cambiar enlace ni reinstalar el icono.
- La migración única desde el origen fijo V403 al LAB permanente es un trabajo separado.
- No se borra el icono LAB antiguo hasta transferir y comprobar los datos.
- MAIN no se borra ni se modifica.

## 4. Sesión del iPhone

- El icono LAB antiguo apunta al deployment fijo V403 y conserva sesión, Historial y ronda.
- El dominio LAB permanente es otro origen y aparece vacío antes de la migración.
- Actualizar dentro del mismo origen no migra datos entre orígenes.
- No se promete conservación entre orígenes sin exportación, importación y comprobación física.

## 5. Reglas permanentes

1. Continuar desde el último commit remoto confirmado de LAB; nunca reconstruir desde una versión anterior.
2. Comprobar rama, ancestro, árbol sucio, remoto y diferencia exacta antes de escribir.
3. Preservar cambios locales preexistentes; no sustituir archivos completos desde otra rama.
4. Aplicar `CAMBIO MÍNIMO → PRUEBA REAL → REGRESIÓN → EVIDENCIA → TERMINAR`.
5. Ejecutar Gate 0, Intocables, banco dirigido, ROADMAP e inventario antes de publicar.
6. Registrar cada archivo modificado en ambos ROADMAPS dentro de la misma versión.
7. No actualizar hashes para encubrir cambios no aprobados.
8. No declarar PASS físico sin evidencia obtenida en el dispositivo real.
9. No afirmar apertura del selector de WhatsApp si Safari no permite comprobarla.
10. No tocar módulos Intocables sin autorización expresa y literal.
11. Producción permanece intacta hasta una autorización expresa y literal independiente.

## 6. Pendientes que sobreviven al cambio de conversación

- V404: pulsación prolongada abre `ELIMINAR` sin `Copiar / Buscar selección`.
- V405: botón apagado sin actualización y verde/parpadeante al publicar el release siguiente.
- Migración única V403 fijo → LAB permanente sin pérdida de datos.
- PNG real mediante `ENVIAR TARJETA DIGITAL` en Normal, Stableford, Match Play y Four Ball; entregar las cuatro imágenes guardadas en Historial.
- Verificar filtros, `NUEVA RONDA`, reapertura en hoyo pendiente, `IN = 1–9`, `OUT = 10–18`, `ATRÁS` y ausencia de `REGÍSTRATE` dentro de tarjetas.
- Comunicación Universal: turnos consecutivos, interrupción del audio anterior, cero superposición, micrófono verde, latencia medida, voz `es-419` a `0.90` sin ceceo y tráfico GPS con expresiones de ubicación actual.

## 7. Mensaje único para toda conversación nueva

> **CONTINUACIÓN EPG CADDY LAB — Lee primero `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` y continúa desde su estado vigente. No reinicies, no pidas antecedentes ya registrados y no regreses a versiones anteriores. Trabaja exclusivamente en LAB. MAIN no se toca nunca. Ejecuta el siguiente pendiente real con cambio mínimo, pruebas, regresión y evidencia.**

No hay que reescribir commits, deployments, enlaces ni pendientes: este archivo es la fuente permanente. Cuando cambie el estado, se actualiza en el mismo commit que ambos ROADMAPS y sus controles.

## 8. Blindaje

- Sólo se actualiza después de confirmar el nuevo estado con Git, Vercel o evidencia física aplicable.
- Cada versión nueva indica commit, deployment, enlace, estado automático, estado físico y rollback.
- `test-lab-continuity-master.mjs` bloquea la ausencia o alteración de las anclas permanentes.
- Este archivo pertenece a `requiredControls` de Gate 0; si falta, el candidato queda bloqueado.

## 9. V405-R2 en validación

- Registro incorpora `BORRAR TODO` para nombre, HDCP y marcas de los seis espacios, sin tocar Historial ni rondas.
- Tarjeta Digital móvil aísla controles flotantes, apila acciones y limita el desplazamiento horizontal a la tabla.
- Evidencia física de origen: `IMG_2949.png`, estado FAIL previo a la corrección.
- Pendiente obligatorio: inspección renderizada y prueba física iPhone de Normal, Stableford, Match Play y Four Ball.
