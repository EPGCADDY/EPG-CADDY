# GOLF Score Card GT. GRUPAL

## Manual Maestro y Memoria Funcional Viva

**Documento:** fuente operativa de verdad de la tarjeta grupal  
**Estado:** vivo y obligatorio  
**Versión documentada:** V172
**Fecha de corte:** 19 de agosto de 2026  
**Rama operativa:** `grupal-v120-safe`  
**Aplicación:** `index-grupal.html`  
**Responsable de producto:** Jaime  
**Responsable de implementación y control:** Partner / ChatGPT

---

## 1. Propósito

Este archivo conserva, de la A a la Z, la memoria funcional de GOLF Score Card GT. GRUPAL. Su objetivo es impedir que una decisión aprobada se pierda, que una función nueva contradiga una regla anterior o que la aplicación llegue al mercado con comportamientos incompletos.

Debe servir simultáneamente como:

- manual funcional para producto;
- catálogo de capacidades de la tarjeta inteligente;
- memoria de decisiones aprobadas;
- especificación para programación;
- matriz de voz y vocabulario;
- inventario de fórmulas y candados;
- plan de pruebas y lanzamiento;
- hoja de ruta de funciones futuras.

Este documento no sustituye `APP_ARCHITECTURE.md`, `ECOS.md`, `COURSE_DATABASE.md` ni el Master Blueprint. Los complementa con la definición específica y verificable de la tarjeta grupal.

---

## 2. Regla de actualización

Toda función aprobada, modificada o descartada deberá reflejarse aquí en el mismo ciclo de versión del código.

Orden obligatorio:

1. Registrar la decisión funcional.
2. Identificar si afecta diseño, voz, cálculo, persistencia, datos o privacidad.
3. Implementar sin alterar áreas congeladas.
4. Ejecutar pruebas positivas, negativas y de regresión.
5. Actualizar este manual y su historial.
6. Publicar la versión.
7. Crear una rama de respaldo identificable.

No se considerará completa una versión comercial si el código y este manual no coinciden.

El verificador `verify-manual-sync.mjs` compara automáticamente la versión declarada por la aplicación con la versión documentada y exige una entrada correspondiente en este historial. Debe ejecutarse antes de cada publicación.

---

## 3. Leyenda de estados

| Estado | Significado |
|---|---|
| `OPERATIVO` | Implementado y disponible en la tarjeta activa. |
| `APROBADO` | Decisión aceptada; puede requerir todavía implementación o ampliación. |
| `EN VALIDACIÓN` | Implementado, pero requiere más pruebas de campo. |
| `PLANIFICADO` | Forma parte de la visión; aún no debe anunciarse como disponible. |
| `DESCARTADO` | Comportamiento retirado y prohibido. |
| `CONGELADO` | No se modifica sin autorización expresa. |

---

## 4. Principios inviolables

1. La tarjeta no inventa jugadores, hoyos, scores, resultados ni acciones.
2. Una consulta de voz es siempre de solo lectura.
3. Una anotación sólo se realiza cuando existe jugador, hoyo y score válidos.
4. Ante una instrucción inválida o ambigua, la respuesta autorizada es únicamente `Error` y la voz se desactiva.
5. Ningún hoyo no dictado puede llenarse automáticamente con `X`.
6. Una `X` sólo representa una omisión explícita y puede reemplazarse posteriormente por el score real.
7. La ronda activa persiste al cerrar, minimizar, poner en background o reabrir la aplicación.
8. La ronda activa sólo se sustituye al confirmar expresamente una `NUEVA RONDA` mediante `INICIAR RONDA`.
9. Los cálculos Gross, Neto, contra par y handicap deben derivarse de una única fuente matemática.
10. La tarjeta grupal es el producto único, definitivo y activo. La antigua tarjeta individual queda retirada y no recibe nuevas funciones.
11. Todo lo no solicitado permanece congelado.
12. Cada versión publicada debe tener pruebas, commit identificable y respaldo.
13. Si el asistente solicita `👍🏻` para continuar, recibirlo obliga a reanudar inmediatamente todo el procesamiento pendiente; nunca puede contestar sólo con otro símbolo o un acuse vacío.
14. Toda necesidad de PC, autenticación, GitHub, Vercel, permisos o intervención manual debe comunicarse al propietario en la misma interacción en que se detecta, con instrucciones exactas.

---

## 5. Producto actual

### 5.1 Tarjeta grupal

**Estado:** `OPERATIVO` y `CONGELADO` en su diseño base.

Capacidad:

- de 1 a 6 jugadores;
- 18 hoyos;
- primera vuelta, segunda vuelta y total;
- PAR, yardas, handicap del hoyo, Gross, Neto y resultado contra par;
- resultados totales por jugador;
- captura y consultas mediante voz;
- persistencia de la ronda activa;
- tarjeta digital de consulta.

### 5.2 Tarjeta individual

**Estado:** `DESCARTADO` desde V144.

- Deja de formar parte de la hoja de ruta.
- No recibe correcciones, nuevas funciones ni evolución comercial.
- Su archivo histórico no se elimina para conservar trazabilidad y respaldo.
- Toda capacidad futura se diseña exclusivamente alrededor de la tarjeta grupal.

### 5.3 Enlace operativo

`https://epg-caddy-git-grupal-v120-safe-epgcaddys-projects.vercel.app/index-grupal.html`

---

## 6. Diseño visual aprobado

### 6.1 Encabezado

- Logo oficial horizontal ubicado en la parte superior y extendido sobre el espacio izquierdo/central disponible.
- El logo horizontal conserva la fuente, textos, bandera, pelota verde, camino, marco, colores, acabados y línea gráfica del emblema cuadrado aprobado; sólo cambia su composición longitudinal.
- La misma identidad horizontal se usa en el encabezado de la tarjeta, `NUEVA RONDA` y `CONFIRMACIÓN`; no puede reaparecer el emblema cuadrado en esos flujos.
- Estado `Ronda en curso`.
- Fecha y hora de inicio.
- Campo, PAR y Slope.
- Reloj de inicio y cronómetro visibles.

### 6.2 Información del campo

Título aprobado: `INFORMACIÓN DEL CAMPO`.

Columnas:

- Yardas;
- Course Rating;
- Slope Rating.

Reglas:

- las tres columnas se mantienen compactas hacia la izquierda;
- el micrófono conserva espacio suficiente y no toca los límites de su casilla;
- encabezados y datos permanecen centrados;
- el punto de cada tee se alinea verticalmente;
- el fondo blanco de las yardas negras no desplaza el punto ni rompe la línea visual.

### 6.3 Micrófono

- Esfera visual dentro de su espacio asignado.
- Activación mediante una sola pulsación.
- Reacción rápida.
- Debe captar voz baja o cercana al murmullo, considerando el silencio propio del golf.
- No deben requerirse gritos ni repeticiones bruscas.
- Los estados de apertura, escucha y cierre deben ser inequívocos.

### 6.4 Tabla

- Nombres de jugadores en blanco.
- Handicap general del jugador en el color de sus tees.
- Filas: YDS, HDCP, GROSS, NETO y `+ / -`.
- Dígitos de resultados con tamaño coherente en toda la tarjeta.
- Simbología gráfica aplicada sobre el Gross individual por hoyo.
- Círculos de handicap sutiles, continuos y visibles, sin contaminación visual excesiva.
- La columna independiente de marcas/tees fue retirada; las yardas y el color ya identifican el tee.
- Existe una única fila separadora vacía, cuadriculada y tenue dentro del bloque del primer jugador: exactamente después de `YDS` y antes de `HDCP`. La casilla vertical del nombre abarca seis filas para conservar el cierre completo; no se repite en otros jugadores.
- Las líneas de espacios desocupados usan 12.5% de intensidad.
- Toda fila `YDS` ocupada inicia con un borde superior continuo de intensidad normal, incluso cuando viene después de espacios desocupados.

### 6.5 Nombre auxiliar del hoyo 10

- Fondo negro, igual al fondo de la tarjeta.
- Se usa sólo el primer nombre.
- Si existen dos jugadores con el mismo primer nombre, se usa el apellido como diferenciador.
- Nombres de cinco o más letras reducen su tamaño aproximadamente 15%.
- No deben desbordar la casilla.

### 6.6 Resultados totales

Incluyen:

- jugador;
- Gross ida;
- Gross vuelta;
- Gross total;
- handicap;
- Neto total;
- diferencia contra par neto.

### 6.7 Sistema gráfico profesional del registro primario

El registro de jugadores usa una sola retícula y una sola familia tipográfica en nombre, handicap, marcas y WhatsApp. Sus controles deben conservar alturas, bordes, radios, pesos y espaciados familiares; ningún selector nativo puede alterar esa línea gráfica.

Controles obligatorios de calidad comercial:

- las cuatro columnas y sus encabezados comparten exactamente la misma alineación;
- el selector de marcas normaliza su apariencia y reserva espacio propio para la flecha;
- `AMARILLAS`, la marca de texto más extensa, debe mostrarse completa sin recorte;
- `Rodrigo Barterechea` es el caso obligatorio de prueba para nombre largo;
- desde 18 caracteres, el nombre reduce su fuente 15% sin cambiar la altura de la casilla;
- desde 24 caracteres, aplica una reducción controlada de 25%;
- el valor completo siempre permanece editable y almacenado aunque visualmente se requiera elipsis en un ancho extremo;
- ningún cambio puede introducir familias tipográficas, alturas o escalas ajenas a la página;
- se revisa tanto en teléfono como en escritorio antes de declarar una versión comercializable.

Esta matriz visual forma parte de los candados operativos permanentes del producto.

#### Sistema tipográfico cerrado

El registro utiliza una sola familia: `Arial, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`. La apariencia no depende de la tipografía nativa de botones, inputs o selectores.

La jerarquía se limita a cinco funciones editoriales resueltas mediante una escala cerrada de cuatro tamaños, no mediante valores arbitrarios:

- **Título de pantalla:** identidad principal de Nueva ronda o Confirmación;
- **Título de sección:** instrucciones y estados principales en verde;
- **Texto de lectura:** instrucciones y notas;
- **Texto de control:** campos editables, handicap, marcas y confirmaciones;
- **Metadatos:** fecha, encabezados de columnas y ayudas secundarias.

Cada función comparte tamaño, peso, interlineado y espaciado en toda la pantalla. Queda prohibido introducir un tamaño aislado o permitir que un control use fuente nativa sin documentar y validar el cambio.

#### Uniformidad absoluta del bloque superior

Por directriz V150, el bloque superior del registro —fecha, campo, torneo, datos automáticos, instrucciones de dictado y nota— usa exactamente una misma familia, un mismo tamaño, un mismo peso, un mismo interlineado y el mismo espaciado. En teléfono corresponde a 10 px y en escritorio a 13 px. La cuadrícula editable de jugadores queda fuera de este bloque y conserva sus reglas de legibilidad funcional.

Desde V153, el encabezado del registro no muestra el texto `NUEVA RONDA`: el logo, la fecha y el contenido del propio registro son suficientemente identificables. Esta eliminación no afecta el botón operativo `NUEVA RONDA` que abre el registro al concluir o abandonar una ronda.

---

## 7. Distribución dinámica de jugadores

**Estado:** `OPERATIVO` desde V139.

La tarjeta física siempre conserva capacidad para seis jugadores, pero sólo resalta las filas utilizadas.

Secuencia visual aprobada:

| Cantidad | Posiciones ocupadas |
|---:|---|
| 1 | 1 |
| 2 | 1 y 3 |
| 3 | 1, 3 y 5 |
| 4 | 1, 3, 5 y 2 |
| 5 | 1, 3, 5, 2 y 4 |
| 6 | 1, 3, 5, 2, 4 y 6 |

Reglas:

- agregar un jugador no mueve a los ya existentes;
- las filas disponibles conservan su estructura con aproximadamente 75% menos saturación;
- desde V144, las líneas de las filas disponibles reducen otro 70% su intensidad respecto del nivel anterior y quedan aproximadamente en 7.5% de la línea normal;
- las filas disponibles no muestran datos falsos;
- el mismo criterio se aplica al bloque de resultados totales;
- al retirar un jugador, su espacio queda disponible sin reordenar innecesariamente a los demás.

---

## 8. Registro y mantenimiento de jugadores

### 8.1 Nueva ronda

Permite de uno a seis jugadores con:

- nombre;
- handicap;
- tee/color;
- matriz Caballeros o Damas cuando corresponda.

### 8.2 Nombre

- Preferencia obligatoria: sólo primer nombre.
- Si dos jugadores comparten nombre, se admite apellido para distinguirlos.
- No deben persistir nombres largos innecesarios que rompan el diseño.

### 8.3 Correcciones

Vocabulario aprobado:

- `Corregir nombre`;
- `Corregir nombres`;
- `Corregir handicap`;
- `Corregir handicaps`;
- `Rectificación de handicap`;
- `Corrijo`;
- `Corrigiendo`;
- `Corregir`.

La corrección abre el registro para editar uno o varios jugadores y confirmar una sola vez.

### 8.4 Agregar y quitar

- `Agregar jugador` / `Agregar jugadores`.
- `Quitar jugador [nombre]`.
- Un jugador agregado durante la ronda comienza en el hoyo de incorporación definido y no recibe scores ficticios anteriores.

### 8.5 WhatsApp y directorio local V141

**Estado:** `OPERATIVO` para registro y persistencia local.

- Cada jugador dispone de un campo WhatsApp opcional.
- El prefijo fijo predeterminado es `+502` para Guatemala.
- Se aceptan exactamente ocho dígitos nacionales después del prefijo.
- El número se guarda en un directorio privado local de EPG Caddy en el dispositivo.
- Cuando el mismo jugador vuelve a registrarse, la aplicación recupera automáticamente su WhatsApp.
- El número también acompaña los datos de la ronda, sin mostrarse en la tarjeta de scores.
- Las rondas antiguas sin WhatsApp siguen siendo compatibles.
- La V141 no escribe silenciosamente en la libreta del teléfono y no envía mensajes todavía.

### 8.6 Torneo V143

**Estado:** registro y archivo local `OPERATIVOS`; visualizador y consulta histórica por voz `PLANIFICADOS`.

- El registro ofrece una opción `TORNEO`.
- Al activarla, sólo se solicita el nombre del torneo.
- No se solicita año ni número de ronda: la tarjeta ya conserva fecha y hora automáticas.
- Varias tarjetas con el mismo nombre de torneo forman una colección.
- Su orden cronológico determina primera, segunda, tercera y siguientes rondas.
- Ejemplo: las tres tarjetas más antiguas a recientes con nombre `Torneo Nacional` y fecha de 2025 corresponden a sus rondas 1, 2 y 3.
- La tarjeta digital muestra el nombre del torneo.
- Las rondas que nunca fueron guardadas no pueden reconstruirse automáticamente; deberán importarse o registrarse manualmente.

### 8.7 Campo de golf V156

- El registro presenta siete opciones ya escritas con casillas de selección única: `El Pulté`, `Country Club`, `San Isidro`, `Mayan Golf`, `Hacienda Nueva`, `Alta Vista` y `La Reunión`.
- Sólo puede marcarse un campo por ronda.
- `Country Club` es el nombre exacto mostrado; no se agrega ninguna palabra adicional.
- El Pulté permanece operativo con su tarjeta oficial cargada.
- Los otros seis campos quedan visibles como pendientes y no permiten iniciar una ronda hasta cargar y validar sus tarjetas oficiales.
- Nunca se reutilizan pars, handicaps, yardajes, rating o slope de El Pulté para otro campo.

---

## 9. Captura de scores

### 9.1 Estructura mínima

Una anotación válida contiene:

- hoyo real entre 1 y 18;
- jugador existente;
- Gross válido o término golfístico reconocido.

Ejemplos:

- `Hoyo 4 Jessie 5`;
- `Alan hoyo 7 birdie`;
- múltiples jugadores para el mismo hoyo;
- corrección retroactiva de un hoyo ya registrado.

### 9.2 Registro silencioso

**Estado:** `OPERATIVO`.

Después de registrar scores, la aplicación no debe recitar automáticamente los scores de cada jugador ni los resultados globales. La voz queda reservada para una consulta expresa.

### 9.3 Atomicidad

Si una instrucción múltiple contiene un elemento inválido, no debe aplicar silenciosamente una parte e ignorar otra. Debe fallar de forma controlada para evitar una tarjeta parcialmente alterada sin conocimiento del usuario.

### 9.4 Corrección retroactiva

Un score real posterior puede reemplazar una `X`. Todos los resultados dependientes se recalculan.

---

## 10. Omisiones y X

**Estado:** comportamiento automático `DESCARTADO`.

- Avanzar de hoyo no autoriza colocar `X` a quienes no fueron dictados.
- La aplicación no puede inferir que un jugador omitió un hoyo.
- Una `X` explícita excluye temporalmente al jugador de cierres o resultados que requieran información completa.
- Al reemplazar la `X`, Gross, Neto, contra par y totales deben recalcularse.
- Al abrir una ronda antigua afectada por X automáticas, la reparación autorizada elimina esas X inventadas.
- V155 elimina del motor las funciones que fabricaban X por avance consecutivo, retira sus llamadas en anotaciones simples y múltiples y ejecuta una reparación nueva sobre rondas que pudieron contaminarse después de la reparación V134.

---

## 11. Handicap: fórmula oficial y representación

### 11.1 Fórmula por hoyo

Para handicap entero no negativo `H` e índice de dificultad `SI`:

```text
tiros_base = floor(H / 18)
remanente = H mod 18
tiros_del_hoyo = tiros_base + 1 si SI <= remanente; de lo contrario tiros_base
NETO = GROSS - tiros_del_hoyo
diferencia = NETO - PAR_del_hoyo
```

La implementación puede usar una forma algebraicamente equivalente, pero debe producir exactamente la misma distribución.

### 11.2 Ejemplos de control

**Handicap 14:**

- 14 tiros totales;
- un tiro en cada hoyo cuyo SI sea 14 o menor;
- cero en los cuatro restantes.

**Handicap 38:**

- 38 tiros totales;
- dos tiros en cada uno de los 18 hoyos = 36;
- un tercer tiro en los dos hoyos con SI 1 y 2;
- ningún hoyo puede quedar sin círculo.

### 11.3 Representación

- El círculo aparece en cada hoyo donde el jugador recibe uno o más tiros.
- El círculo usa el color del tee del jugador.
- El borde debe ser fino pero completamente visible.
- Para dos o tres tiros se muestra el indicador correspondiente sin llenar el fondo de toda la casilla.
- La separación `IDA` debe ocupar su propia columna; ningún SI de la segunda vuelta puede desplazarse.

### 11.4 Candado V140

**Estado:** `OPERATIVO`.

- La fila HDCP inserta correctamente la columna IDA antes del hoyo 10.
- Los scores persistidos se recalculan con el handicap vigente.
- Totales y celdas derivan Neto desde Gross y tiros actuales, no desde un valor antiguo desconectado.

### 11.5 Auditoría crítica V142

**Estado:** `OPERATIVO`.

- La fórmula se expresa directamente como `base = floor(H/18)` y `extras = H mod 18`.
- El arranque valida las matrices Caballeros y Damas como permutaciones completas de SI 1–18.
- Se comprueban automáticamente todos los handicaps enteros de 0 a 54.
- Para cada handicap, la suma de tiros de los 18 hoyos debe ser exactamente igual al handicap.
- Si una matriz o distribución no cumple, el candado crítico impide iniciar el motor con cálculos incorrectos.
- La prueba de regresión cubre 55 handicaps × 2 matrices × 18 hoyos, más los 18 círculos visuales de seis jugadores.
- Handicap 38 queda definido como dos tiros en cada hoyo y un tercero en los hoyos SI 1 y 2; el hoyo 18 recibe dos tiros.

---

## 12. Simbología gráfica de scores

Aplicada al Gross por hoyo:

| Resultado | Símbolo conceptual |
|---|---|
| Hoyo en uno | marca especial de ace |
| Águila | doble círculo |
| Birdie | círculo |
| Par | número sin contorno especial |
| Bogey | cuadro |
| Doble bogey | doble cuadro |
| Triple bogey o superior | cuadro múltiple/reforzado |

La simbología del score Gross y el círculo de handicap son capas distintas y nunca deben confundirse.

---

## 13. Vocabulario golfístico de anotación

### 13.1 Bajo par

- Águila: `águila`, `eagle`, `igle`, `aguiler`.
- Birdie: `birdie`, `birdy`, `berdie`, `verdi`, `verde`, `pájaro`, `verdura`.

### 13.2 Par

- `par`;
- `even par`;
- `parinelo`;
- `paraso`;
- `parcuato`.

### 13.3 Sobre par

- Bogey: `bogey`, `boggy`, `bogui`, `bogi`.
- Doble bogey: `doble bogey`, `double bogey`, `doblete`.
- Triple bogey: `triple bogey`, `triplete`.
- Doble par: `doble par`, `par español`.

### 13.4 Números y relaciones

- Dígito o número hablado.
- `uno bajo par`, `dos bajo par`.
- `uno sobre par`, `dos arriba de par`.

Toda variante debe convertirse primero a Gross y luego pasar por la misma fórmula de handicap.

---

## 14. Consultas inteligentes de la ronda activa

### 14.1 Principio

**Estado:** base `OPERATIVA` desde V138/V139; expansión continua `APROBADA`.

El usuario puede preguntar cualquier información que ya exista en la tarjeta hacia atrás. La consulta puede abarcar uno o varios jugadores y uno o varios hoyos.

La consulta nunca escribe datos.

### 14.2 Score por hoyo

Variantes aprobadas:

- `Repíteme el score de Alan del hoyo 4`;
- `Cuánto tiró Alan en el 4`;
- `Cuánto fue lo de Alan en el hoyo 4`;
- `Qué score tiró Alan en 4`;
- `Qué hizo Alan en el 4`;
- `Qué tiró Alan en 4`;
- `Cuánto hizo Alan en el 4`;
- `Qué fue lo de Alan en el 4`.

### 14.3 Consulta múltiple

- `Repíteme Alan en 1, 4 y 7 y Diego en 2 y 4`.
- `Cuánto tiraron Alan y Diego en 2 y 4`.
- Rangos: `del hoyo 7 al 11`.
- Segmentos: `primera vuelta`, `segunda vuelta`, `hasta el hoyo 12`.

### 14.4 Acumulados

Vocabulario:

- acumulado;
- score acumulado;
- subtotal;
- actual;
- total actual;
- hasta ahora;
- cómo voy / cómo vamos;
- cuánto llevo / cuánto llevamos;
- marcador actual;
- parcial.

La lectura debe ser fluida, compacta y sin micro pausas robóticas.

### 14.5 Tipos de score

Consultas disponibles o previstas para:

- cantidad de águilas;
- birdies;
- pares;
- bogeys;
- dobles bogeys;
- triples bogeys;
- hoyos en uno;
- otros resultados según el catálogo.

### 14.6 Posiciones y comparación

- quién va ganando;
- posición o posiciones;
- comparación entre jugadores;
- diferencia entre jugadores;
- mejor y peor hoyo;
- mejor y peor vuelta;
- Gross, Neto y resultado contra par.

### 14.7 Handicap y pendientes

- dónde recibe tiros un jugador;
- cuántos tiros recibe en un hoyo o rango;
- qué scores faltan;
- cuáles hoyos tienen una X explícita;
- qué información todavía no existe.

### 14.8 Respuesta segura

- Información disponible: responder sólo con los datos solicitados.
- Información no registrada: indicar `sin score registrado` o equivalente autorizado.
- Consulta ambigua: `Error`.
- Nunca completar por probabilidad, secuencia ni contexto imaginado.

---

## 15. Ronda activa y persistencia

**Estado:** `OPERATIVO`.

- La última ronda válida se conserva indefinidamente en almacenamiento local.
- Existe copia primaria y copia de respaldo.
- Background, Hold, cierre y reapertura no sustituyen la ronda.
- El transporte de voz se reinicia limpio al reabrir; los datos no.
- `NUEVA RONDA` abre registro, pero no elimina la ronda existente por sí sola.
- Sólo `INICIAR RONDA` confirmado crea y sustituye la ronda activa.
- Un botón rojo `PARAR CRONÓMETRO`, ubicado debajo de la tarjeta junto a las acciones finales, congela el tiempo de la ronda y lo conserva en la copia primaria, el respaldo y el archivo local.
- El botón es idempotente: una vez detenido muestra el tiempo final y no puede volver a modificarlo.
- En una ronda completa heredada cuyo reloj siguió corriendo, el primer toque recupera como final la hora del último score registrado; en una ronda todavía incompleta usa la hora exacta del toque.
- Una flecha verde fija en la esquina inferior izquierda regresa al Registro de ronda sin borrar ni sustituir la ronda activa; sólo `INICIAR RONDA` confirmado crea una ronda nueva.
- La tarjeta digital puede abrirse como consulta durante una ronda incompleta.
- La ruta `index-grupal.html` usa política `Cache-Control: no-store, max-age=0` para impedir que cerrar y reabrir conserve una compilación anterior.
- Abrir `NUEVA RONDA` dentro de una pestaña existente reinicia datos de ronda tras confirmación, pero no recarga por sí solo el código JavaScript; la política sin caché actúa al volver a abrir la aplicación.

Prohibiciones operativas durante una ronda:

- borrar datos del navegador;
- borrar almacenamiento del sitio;
- sustituir claves de persistencia sin migración;
- crear rondas automáticamente por fecha o reapertura.

---

## 16. Cierres y resultados

- Primera vuelta: hoyos 1–9.
- Segunda vuelta: hoyos 10–18.
- Ronda: hoyos 1–18.
- El cierre depende de scores requeridos, no de que simplemente se mencione el hoyo 18.
- Jugadores incorporados tarde se evalúan desde su hoyo de incorporación.
- Una X explícita impide un cierre completo hasta ser resuelta.
- Los totales usan únicamente scores reales válidos.

---

## 17. Historial inteligente

**Estado:** archivo local base `OPERATIVO` desde V143; consultas y biblioteca visual `PLANIFICADAS`.

Objetivo: guardar todas las tarjetas concluidas con fecha, campo, jugadores, handicaps, tees, scores por hoyo, vueltas, totales y estadísticas.

Desde V143:

- cada ronda activa recibe un identificador estable;
- cada actualización conserva una copia de la ronda en el archivo histórico local;
- las actualizaciones de una misma ronda reemplazan su snapshot en lugar de duplicarlo;
- el archivo conserva orden cronológico;
- las rondas con el mismo nombre de torneo pueden filtrarse por año derivado de su fecha;
- el límite local inicial es de 120 rondas; la versión comercial deberá migrar a base de datos permanente y sincronizada.

La base central alojada es obligatoria para el producto comercial. PostgreSQL administrado será la fuente permanente de verdad; el teléfono conservará una copia local offline y una cola idempotente. La arquitectura y el esquema inicial se encuentran en `DATABASE_ARCHITECTURE.md` y `database/001_initial_schema.sql`.

Consultas futuras:

- `Cuánto tiré el 5 de mayo`;
- `Cuánto tiré el 5 de mayo en la primera vuelta`;
- `Qué tiraron Alan y Diego en los hoyos 3, 7 y 12 el 5 de mayo`;
- `Muéstrame la tarjeta grupal del 5 de mayo`;
- `Muéstrame la información de Alan y Diego dentro de la tarjeta grupal de esa ronda`;
- comparaciones entre fechas, campos, jugadores, vueltas y hoyos.

Requisito: ninguna consulta histórica debe mezclarse con la ronda activa ni modificarla.

---

## 18. Modelo de datos futuro mínimo

### Jugador

- identificador estable;
- primer nombre;
- apellido sólo cuando sea necesario para distinguir;
- handicap histórico por ronda;
- tee/marca;
- matriz aplicable;
- WhatsApp opcional;
- correo opcional sólo si se decide conservarlo;
- consentimiento y fecha de consentimiento.

### Ronda

- identificador;
- fecha y hora;
- campo;
- PAR, Course Rating y Slope usados;
- jugadores participantes;
- estado: activa, concluida o archivada;
- versión de fórmulas y aplicación.

### Score

- ronda;
- jugador;
- hoyo;
- PAR;
- SI;
- Gross;
- tiros de handicap;
- Neto;
- diferencia;
- estado normal o X explícita;
- fecha de creación y corrección.

### Tarjeta generada

- grupal;
- versión visual;
- fecha de generación;
- destinatario;
- estado de entrega.

---

## 19. Registro principal y WhatsApp

**Estado:** registro local `OPERATIVO` desde V141; contactos del teléfono y envío `PLANIFICADOS`.

- WhatsApp será la opción única y preferente de contacto cuando se rediseñe el registro.
- Compartir WhatsApp o correo será opcional.
- Debe existir consentimiento claro antes de almacenar o enviar.
- El directorio local V141 guarda el número dentro de EPG Caddy, con prefijo `+502` y ocho dígitos.
- Guardar en la libreta de contactos del teléfono requerirá una app nativa y permiso explícito del usuario.
- Desde una aplicación web, el selector de contactos permite al usuario compartir contactos seleccionados, pero no autoriza escritura silenciosa y permanente.
- Enviar desde el WhatsApp personal del teléfono puede abrir el chat y preparar el contenido; el usuario debe confirmar el envío.
- El envío completamente automático requiere WhatsApp Business Platform, un número del servicio, consentimiento y cumplimiento de sus políticas.
- Al finalizar la ronda, el servicio futuro podrá enviar automáticamente la tarjeta global/grupal.
- Cada jugador podrá guardar la tarjeta grupal en su carrete.
- Los análisis personales futuros se consultarán dentro de la experiencia grupal y no producirán un segundo producto individual.

No debe implementarse envío real sin:

- proveedor autorizado de WhatsApp;
- consentimiento verificable;
- política de privacidad;
- control de bajas;
- protección de datos;
- registro de entregas y errores;
- definición de costos y límites.

### 19.1 Flujo de cierre y entrega de tarjetas

**Estado:** diseño funcional `APROBADO`; generación del archivo visual y entrega `PLANIFICADAS`.

Al completarse la ronda, el cierre comercial deberá ofrecer únicamente acciones reales y comprensibles:

1. `VER TARJETA FINAL`: abre la tarjeta completa en modo de sólo consulta.
2. `COMPARTIR TARJETAS POR WHATSAPP`: genera primero el archivo visual definitivo de la tarjeta y presenta los jugadores que tengan WhatsApp válido.
3. `GUARDAR TARJETA`: guarda la imagen o PDF final en el teléfono mediante la hoja nativa de compartir.
4. `NUEVA RONDA`: conserva el flujo de confirmación existente y nunca borra la ronda sólo por abrir el registro.

Reglas obligatorias del envío desde el teléfono del usuario:

- se comparte la tarjeta visual, no un sustituto de texto;
- el usuario selecciona o confirma destinatarios;
- la aplicación prepara el archivo y el mensaje;
- WhatsApp se abre con el contenido preparado;
- el usuario confirma el envío en WhatsApp;
- cancelar o cerrar WhatsApp no altera la ronda ni marca falsamente la tarjeta como enviada;
- no se declara entrega exitosa sin confirmación verificable;
- el envío silencioso o masivo sólo podrá incorporarse después mediante WhatsApp Business Platform y consentimiento.

### 19.2 Base maestra de jugadores

**Estado:** base local compatible `OPERATIVA` desde V154; interfaz completa y sincronización remota `PLANIFICADAS`.

Cada jugador tendrá un registro estable e independiente de sus participaciones en rondas. La base deberá conservar:

- identificador interno inmutable;
- nombre;
- apellido;
- nombre corto utilizado en la Tarjeta Oficial;
- correo electrónico opcional;
- WhatsApp opcional en formato internacional con código de país;
- preferencia de entrega: `correo`, `WhatsApp`, `ambos` o `ninguno`;
- autorización expresa para recibir tarjetas;
- fecha, hora, alcance y versión de la autorización;
- estado de autorización: activa o retirada;
- fecha y hora de retiro cuando corresponda;
- historial de rondas;
- historial de campos jugados;
- fecha del último envío;
- último estado de entrega por canal.

V154 incorpora la primera base ejecutable sin alterar la pantalla de registro:

- migra automáticamente el directorio V141 al esquema de jugadores V2;
- conserva nombre completo y deriva un nombre corto inicial;
- normaliza WhatsApp con código de país, manteniendo `+502` para los registros existentes;
- crea campos para correo, preferencia, consentimiento, rondas, campos y último envío;
- registra identificadores de rondas y campos al actualizar un jugador;
- mantiene consentimiento inactivo y preferencia `ninguno` durante toda migración;
- permite retirar consentimiento mediante una operación que conserva la trazabilidad;
- define la clave idempotente de futuras entregas;
- mantiene una copia compatible con el directorio V141 para evitar regresiones en el registro actual.

Los campos nuevos todavía no aparecen en la interfaz y no habilitan envíos. Su activación visual y remota requiere las siguientes etapas aprobadas.

#### Alojamiento central obligatorio

**Estado:** arquitectura y esquema `APROBADOS`; recurso remoto y sincronización `PENDIENTES`.

- Todos los jugadores deben alojarse en una base PostgreSQL central administrada.
- La opción recomendada para el despliegue actual es Neon Postgres mediante Vercel Marketplace.
- El navegador nunca accede directamente a PostgreSQL ni recibe `DATABASE_URL`.
- La API del servidor valida identidad, autorización, esquema e idempotencia.
- El almacenamiento local permite jugar sin señal y sincroniza después.
- Contactos, consentimientos, rondas cerradas, scores, tarjetas, correcciones y entregas quedan relacionados y auditables.
- Las tarjetas visuales se almacenan separadamente como archivos privados; la base conserva su metadata, versión y hash.
- Backups automáticos no sustituyen una prueba periódica de restauración.
- No se activa sincronización hasta definir autenticación, privacidad, retención y resolución de conflictos.

Reglas inviolables:

- correo y WhatsApp nunca son obligatorios para registrarse ni jugar;
- la ausencia de datos de contacto no impide crear, jugar, cerrar ni conservar una ronda;
- ningún canal se considera autorizado por estar escrito en el registro;
- el consentimiento debe ser afirmativo, específico, verificable y revocable;
- retirar la autorización detiene entregas futuras, pero no borra resultados deportivos ni evidencias legales de autorizaciones anteriores;
- el nombre corto sólo afecta la presentación; nunca sustituye la identidad estable ni mezcla historiales;
- los cambios de handicap, marcas o contacto no reescriben tarjetas históricas.

### 19.3 Archivos automáticos de cierre

**Estado:** especificación `APROBADA`; generación de archivos `PLANIFICADA`.

Al cerrar oficialmente una ronda, el sistema genera una sola vez una familia versionada de entregables.

#### A. Tarjeta Global o grupal

Debe contener:

- todos los jugadores;
- scores por hoyo;
- Gross, Neto y resultado contra par;
- ida, vuelta y total;
- fecha y hora;
- campo;
- marcas;
- handicaps usados en esa ronda;
- posiciones;
- resultado final;
- identificador de ronda y versión de tarjeta.

#### B. Tarjeta personal ampliada

Se genera una por jugador desde la misma ronda y el mismo motor. No constituye una segunda aplicación ni revive la tarjeta individual retirada en V144.

Debe contener:

- nombre;
- fecha;
- campo;
- handicap y marcas utilizados;
- Gross y Neto por hoyo;
- ida, vuelta y total;
- resultado contra par;
- cantidad de águilas;
- birdies;
- pares;
- bogeys;
- dobles bogeys;
- triples bogeys o superiores;
- hoyos ganados, empatados o perdidos cuando el formato de juego lo permita;
- mejor y peor hoyo;
- mejor vuelta;
- promedio de golpes en pares 3, 4 y 5;
- tiros de handicap recibidos;
- comparación Gross contra Neto;
- gráfica del comportamiento durante la ronda;
- resumen escrito automático del desempeño, construido exclusivamente con datos reales de la ronda.

La tarjeta personal ampliada es un derivado de sólo lectura de la Tarjeta Oficial. Nunca mantiene fórmulas, scores ni datos paralelos.

### 19.4 Cierre oficial

**Estado:** especificación `APROBADA`; motor de cierre versionado `PLANIFICADO`.

Una ronda sólo puede pasar a `CERRADA OFICIALMENTE` cuando:

- todos los hoyos obligatorios de todos los jugadores activos tienen score válido;
- no existe ninguna X explícita pendiente;
- Gross, Neto, contra par, ida, vuelta y total recalculan sin diferencias;
- la distribución de handicap supera sus candados;
- fecha, campo, jugadores, handicaps y marcas quedan congelados en el snapshot;
- se crea un identificador único de cierre y una huella de versión.

Al completarse el proceso, la aplicación muestra exactamente:

> Ronda finalizada. Las tarjetas están listas.

Abrir la tarjeta digital durante una ronda no equivale a cerrarla. Sólo el estado `CERRADA OFICIALMENTE` habilita generación definitiva y envío automático.

### 19.5 Acciones posteriores al cierre

**Estado:** experiencia `APROBADA`; implementación `PLANIFICADA`.

Después del cierre deben estar disponibles:

- abrir la Tarjeta Global;
- abrir la tarjeta personal ampliada de cada jugador;
- `GUARDAR EN FOTOS`;
- `COMPARTIR` mediante la hoja nativa del teléfono;
- descargar la Global y las personales como un paquete único;
- enviar automáticamente ambas tarjetas a cada jugador autorizado;
- consultar el estado individual de cada entrega;
- reintentar únicamente entregas fallidas, sin duplicar las exitosas.

### 19.6 Motor de entregas sin duplicados

**Estado:** especificación `APROBADA`; proveedores externos `PENDIENTES`.

Cada intento de entrega debe tener una clave idempotente compuesta por:

`ronda + versión de tarjeta + jugador + tipo de tarjeta + canal`

Estados permitidos:

- `NO AUTORIZADO`;
- `SIN DESTINO`;
- `PENDIENTE`;
- `PREPARADO`;
- `ENVIANDO`;
- `ENTREGADO`;
- `FALLIDO`;
- `CANCELADO`.

Un registro `ENTREGADO` nunca vuelve a enviarse automáticamente con la misma clave. Un proveedor debe aportar identificador de mensaje, fecha, hora y estado verificable; abrir WhatsApp o la hoja de compartir no basta para declarar éxito.

La automatización por WhatsApp requiere WhatsApp Business Platform. La automatización por correo requiere proveedor transaccional autenticado. Las credenciales, costos, límites, plantillas, bajas y políticas se definirán antes de activar producción.

### 19.7 Correcciones posteriores al cierre

**Estado:** especificación `APROBADA`; implementación `PLANIFICADA`.

Una ronda cerrada es inmutable. Si se autoriza una corrección:

1. se conserva íntegramente la versión original;
2. se registra quién autorizó la corrección, cuándo y por qué;
3. se crea una nueva versión derivada;
4. se recalculan todos los resultados dependientes;
5. los nuevos archivos muestran claramente `TARJETA CORREGIDA` y su número de versión;
6. la entrega usa nuevas claves idempotentes;
7. el historial relaciona original y corrección sin sobrescribir ninguna;
8. los destinatarios autorizados reciben la versión corregida según su preferencia vigente.

### 19.8 Inteligencia hablada y escrita sobre jugadores, cierres y entregas

**Estado:** alcance `APROBADO`; desarrollo incremental `PLANIFICADO`.

Las mismas consultas deben funcionar por voz y por texto, con idéntica fuente de datos, permisos y resultados. Familias aprobadas:

- buscar jugador por nombre completo o nombre corto;
- consultar rondas y campos jugados;
- mostrar la Global o una personal por fecha, torneo o campo;
- comparar rondas, vueltas, hoyos y tipos de score;
- explicar el resumen automático usando sólo estadísticas calculadas;
- consultar si una ronda está incompleta, lista para cerrar o cerrada;
- consultar qué tarjetas se generaron;
- consultar destinatarios autorizados y canales elegidos;
- consultar estados de entrega y fallos;
- solicitar reintento de entregas fallidas cuando el usuario tenga autorización;
- retirar consentimiento por un flujo explícito y confirmado.

Candados:

- consultar nunca modifica;
- una orden escrita no tiene menos controles que una hablada;
- ninguna IA inventa consentimiento, dirección, entrega, score o análisis;
- las acciones sensibles exigen confirmación explícita;
- las respuestas distinguen `generada`, `preparada`, `enviada` y `entregada`;
- no se exponen datos de contacto a jugadores no autorizados;
- una ronda abierta nunca puede disparar envío automático.

### 19.9 Secuencia obligatoria de implementación

1. Modelo persistente de jugadores, consentimiento e identidades.
2. Estados de ronda y cierre oficial inmutable.
3. Motor único de estadísticas y snapshots versionados.
4. Generador visual de Tarjeta Global.
5. Generador visual de tarjetas personales ampliadas.
6. Guardar, compartir y descargar localmente.
7. Motor idempotente de entregas.
8. Proveedor de correo.
9. WhatsApp Business Platform.
10. Consultas habladas y escritas sobre historial, cierres y entregas.
11. Correcciones versionadas y reenvíos controlados.
12. Auditoría integral, privacidad y lanzamiento comercial.

No se permite invertir esta secuencia conectando envíos antes de que cierre, consentimiento, archivos y trazabilidad estén probados.

---

## 20. Tarjeta individual retirada

**Estado:** `DESCARTADO` desde V144.

No se desarrollará una tarjeta individual separada. Las consultas, estadísticas y análisis por jugador se producirán desde la tarjeta grupal, su historial y su motor inteligente.

---

## 21. Matriz de pruebas obligatoria

### 21.1 Jugadores

- 1, 2, 3, 4, 5 y 6 jugadores;
- agregar jugador durante ronda;
- quitar jugador;
- nombres duplicados;
- nombres de cinco o más letras;
- distintos handicaps, tees y matrices.

### 21.2 Handicap

Probar como mínimo:

- 0, 1, 9, 14, 18, 19, 36, 38 y 54;
- suma de tiros en los 18 hoyos igual al handicap;
- separación correcta entre hoyos 9, IDA y 10;
- hoyo 18 correctamente representado;
- recálculo después de rectificar handicap.

### 21.3 Scores

- número literal;
- término golfístico;
- varios jugadores;
- varios hoyos;
- corrección;
- X explícita y reemplazo;
- instrucción incompleta;
- jugador inexistente;
- hoyo inválido;
- score inválido.

### 21.4 Voz

- voz baja;
- ruido ambiente moderado;
- una pulsación;
- apertura, escucha y cierre;
- español natural;
- singular y plural;
- consultas que nunca escriben;
- anotaciones que nunca recitan resultados automáticamente.

### 21.5 Persistencia

- minimizar;
- background;
- bloquear el teléfono;
- cerrar y reabrir;
- abrir tarjeta digital;
- cancelar nueva ronda;
- confirmar nueva ronda;
- recuperación desde respaldo.

### 21.6 Regresión visual

- encabezado;
- información del campo;
- micrófono;
- tabla completa;
- scroll horizontal;
- filas dinámicas;
- círculos HDCP;
- simbología Gross;
- resultados totales;
- móvil y escritorio.

---

## 22. Candados de lanzamiento comercial

Antes de publicar al mercado:

- código y manual coinciden;
- no hay funciones futuras presentadas como actuales;
- todas las fórmulas tienen pruebas automatizadas;
- las consultas son de solo lectura;
- no existen X automáticas;
- cada score tiene trazabilidad;
- persistencia probada en dispositivos reales;
- micrófono probado en condiciones de campo;
- protección de datos aprobada;
- consentimiento de WhatsApp implementado;
- historial y base de datos tienen respaldo;
- la tarjeta grupal tiene pruebas completas de todos sus jugadores y configuraciones;
- existe rollback a una versión estable;
- cada versión tiene commit, hash y rama de respaldo.

---

## 23. Inventario alfabético A–Z

- **A — Acumulados:** consultas Gross, Neto y contra par hasta el punto actual.
- **B — Birdie/Bogey:** vocabulario, simbología y estadísticas.
- **C — Correcciones:** scores, nombres y handicaps con recálculo total.
- **D — Datos del campo:** yardas, rating, slope, PAR e índices.
- **E — Error:** respuesta única ante instrucciones inválidas o ambiguas.
- **F — Fórmulas:** una sola fuente para handicap, Neto y totales.
- **G — Gross:** dato físico anotado; nunca derivado del Neto.
- **H — Handicap:** distribución por SI y círculos del color del tee.
- **I — Inteligencia:** consultas naturales sobre información real disponible.
- **J — Jugadores:** uno a seis, con espacios dinámicos estables.
- **K — Kilometraje de pruebas:** regresión completa antes de mercado.
- **L — Lectura:** preguntas de voz estrictamente sin escritura.
- **M — Micrófono/Memoria:** sensibilidad de campo y continuidad de la ronda.
- **N — Neto/Nueva ronda:** Neto calculado; nueva ronda sólo tras confirmación.
- **O — Omisiones:** X únicamente explícita, nunca automática.
- **P — Persistencia/Par:** ronda viva y cálculo contra PAR oficial.
- **Q — Queries/consultas:** jugadores, hoyos, rangos, vueltas y comparaciones.
- **R — Resultados/Respaldo:** totales consistentes y versiones recuperables.
- **S — Scores/Simbología:** captura, vocabulario y gráficos por hoyo.
- **T — Tarjeta:** grupal única y definitiva.
- **U — Usuario:** control final, privacidad y consentimiento.
- **V — Voz/Versionado:** lenguaje natural y trazabilidad de cada cambio.
- **W — WhatsApp:** canal futuro preferente, opcional y consentido.
- **X — X explícita:** pendiente real corregible, nunca inferida.
- **Y — Yardas:** datos oficiales por tee y hoyo.
- **Z — Cero sorpresas:** ninguna acción autónoma fuera de reglas aprobadas.

---

## 24. Estado funcional al corte V172

### Operativo

- tarjeta grupal de 1–6 jugadores;
- distribución visual dinámica;
- ronda activa persistente;
- registro y corrección de jugadores;
- anotación silenciosa de scores;
- vocabulario golfístico ampliado;
- simbología Gross;
- círculos de handicap;
- fórmula Neto y recálculo V140;
- consultas múltiples de ronda activa;
- acumulados, posiciones, tipos de score, mejores/peores, handicap y pendientes;
- tarjeta digital de consulta;
- resultados totales.
- registro WhatsApp opcional con `+502`;
- directorio local persistente de jugadores y recuperación del número por nombre.
- registro opcional de torneo por nombre;
- fecha automática como identificador de año y orden de ronda;
- archivo histórico local de hasta 120 rondas con snapshots actualizados.
- selector de campo mediante siete casillas visibles de selección única;
- bloqueo preventivo de campos sin tarjeta oficial cargada.
- dictado continuo de ronda con espera de cuatro segundos entre capturas;
- navegación hablada desde la ronda hacia el registro;
- silencio ante frases sin intención reconocida, sin inventar datos ni alterar scores.
- botón rojo persistente para detener y congelar el cronómetro de ronda.
- flecha inferior izquierda siempre visible para regresar al Registro de ronda.

### En validación continua

- sensibilidad real del micrófono en campo;
- cobertura de vocabulario natural extenso;
- lectura de acumulados completamente fluida;
- pruebas de combinaciones complejas de consultas.

### Planificado

- historial permanente de rondas;
- consultas por fecha;
- base de jugadores;
- WhatsApp opcional y consentido;
- envío automático de la tarjeta grupal;
- análisis personales integrados dentro del producto grupal;
- analítica histórica y comparaciones avanzadas.
- base PostgreSQL central alojada y sincronización offline idempotente;
- autenticación y permisos por rol;
- cierre oficial inmutable y correcciones versionadas;
- archivos privados Global/personales y entregas verificables.

---

## 25. Historial inicial del documento

| Fecha | Versión | Registro |
|---|---|---|
| 2026-08-19 | Manual 3.4 / App V172 | Controles finales visibles: botón rojo inferior para parar el cronómetro y flecha verde fija en la esquina inferior izquierda para regresar al Registro de ronda sin borrar la ronda vigente. |
| 2026-08-19 | Manual 3.3 / App V171 | Incorporado botón rojo inferior `PARAR CRONÓMETRO`: congela y persiste el tiempo final, queda deshabilitado después del primer toque y recupera rondas completas antiguas mediante la hora del último score. |
| 2026-08-19 | Manual 3.2 / App V170 | Reconciliación maestra de las dos líneas de desarrollo: preservadas las correcciones recientes de voz y restaurados manual A–Z, arquitectura de base central, SQL, matriz de pendientes y pruebas. Añadidos candados automáticos de continuidad, silencio y navegación hablada. |
| 2026-08-19 | Manual 3.1 / App V158 | La guía de voz del registro indica `DICTA AL PRIMER JUGADOR: NOMBRE / HDCP / TEES - MARCAS` y avanza automáticamente del primer al sexto jugador; `TEES` usa una sola S final y el ejemplo identifica expresamente 38 y 14 como HDCP. Torneo conserva `NOMBRE DEL TORNEO`; la revisión manual previa a OK permanece exclusivamente en la nota inferior para evitar duplicación. |
| 2026-08-19 | Manual 3.0 / App V157 | Agregado `La Reunión` como séptima opción visible de campo, con selección única y estado pendiente hasta recibir su tarjeta oficial. |
| 2026-08-19 | Manual 2.9 / App V156 | Protocolo mandatorio de continuidad: 👍🏻 solicitado y recibido obliga a ejecutar el trabajo pendiente; además, toda dependencia de PC, GitHub, Vercel, autenticación o intervención del propietario debe avisarse inmediatamente. |
| 2026-08-19 | Manual 2.8 / App V156 | Registro de campo con seis opciones escritas y selección única: El Pulté, Country Club, San Isidro, Mayan Golf, Hacienda Nueva y Alta Vista. Sólo El Pulté queda habilitado hasta recibir las tarjetas oficiales restantes. |
| 2026-08-19 | Manual 2.7 / App V155 | Auditoría documental y lógica integral: eliminada definitivamente la fabricación automática de X, habilitado reemplazo de X históricas por Gross real, nueva reparación V155, ECOS alineado con registro silencioso y documentos antiguos clasificados. |
| 2026-08-19 | Manual 2.6 / App V154 | Aprobada la base PostgreSQL central alojada, almacenamiento local offline, sincronización idempotente, esquema SQL inicial y matriz maestra de pendientes; el antiguo plan V94 queda marcado como histórico y no normativo. |
| 2026-08-19 | Manual 2.5 / App V154 | Primera base ejecutable de jugadores V2: migración compatible desde V141, identidad estable, nombre corto, contacto internacional, preferencias, consentimiento inactivo por defecto, historial de rondas/campos, retiro de autorización y claves idempotentes; sin cambios visuales ni envíos. |
| 2026-08-19 | Manual 2.4 / App V153 | Aprobada la arquitectura integral de jugadores, consentimiento revocable, cierre oficial, Tarjeta Global, tarjetas personales ampliadas, guardar/compartir/descargar, entregas idempotentes, correcciones versionadas e inteligencia hablada y escrita. Cambio exclusivamente documental; estas capacidades permanecen clasificadas como planificadas hasta su implementación y prueba. |
| 2026-08-19 | Manual 2.3 / App V153 | Eliminado el texto `NUEVA RONDA` sobre la fecha del registro; definido y blindado el flujo final de tarjeta visual y entrega por WhatsApp sin prometer automatización inexistente. |
| 2026-08-19 | Manual 2.2 / App V152 | Fila vacía trasladada a su ubicación exacta dentro de Jessie: entre YDS y HDCP; rowspan del primer jugador ampliado a seis filas. |
| 2026-08-19 | Manual 2.1 / App V151 | Fila separadora estructural visible antes de Jessie; espacios libres elevados de 7.5% a 12.5%; borde superior continuo restaurado en YDS de Jaime. |
| 2026-08-19 | Manual 2.0 / App V150 | Uniformidad absoluta del bloque superior del registro: una familia, tamaño, peso, interlineado y espaciado para todos sus textos y campos. |
| 2026-08-19 | Manual 1.9 / App V149 | Sistema tipográfico cerrado para el registro: una familia, cinco funciones editoriales coherentes, pesos e interlineados homologados y controles nativos normalizados. |
| 2026-08-19 | Manual 1.8 / App V148 | Fila separadora única, vacía y tenue entre PAR general y YDS del primer jugador; cuadrícula completa con intensidad de espacio desocupado. |
| 2026-08-19 | Manual 1.7 / App V147 | Corrección visual verificada: identidad horizontal aplicada también a Nueva ronda y Confirmación; eliminado el retorno del emblema cuadrado en el flujo principal. |
| 2026-08-19 | Manual 1.6 / App V146 | Integración exclusiva de la Propuesta 1 horizontal en el encabezado de la Tarjeta Oficial; todos los demás componentes permanecen frisados, protegidos y blindados. |
| 2026-08-19 | Manual 1.5 / App V145 | Retícula profesional del registro primario; selector de marcas normalizado; alineación y altura tipográfica unificadas; pruebas obligatorias con `Rodrigo Barterechea` y `AMARILLAS`. |
| 2026-08-19 | Manual 1.4 / App V144 | Líneas de espacios libres reducidas otro 70%; tarjeta grupal declarada producto único y definitivo; tarjeta individual retirada de la hoja de ruta. |
| 2026-08-19 | Manual 1.3 / App V143 | Opción Torneo por nombre, orden automático por fecha, archivo histórico local de rondas y verificador automático de sincronización código/manual. |
| 2026-08-19 | Manual 1.2 / App V142 | Auditoría exhaustiva del motor HDCP 0–54, candado crítico de matrices, seis jugadores × 18 círculos y política sin caché para la tarjeta grupal. |
| 2026-08-19 | Manual 1.1 / App V141 | Campo WhatsApp opcional `+502`, validación de ocho dígitos, directorio local persistente y definición de límites entre web, contactos del teléfono, WhatsApp personal y WhatsApp Business. |
| 2026-08-19 | Manual 1.0 / App V140 | Creación del Manual Maestro y Memoria Funcional Viva. Incluye diseño, jugadores dinámicos, voz, vocabulario, fórmulas, V140, inteligencia de ronda, persistencia, historial futuro, WhatsApp y pruebas de lanzamiento. |

---

## 26. Próxima actualización obligatoria

La próxima versión deberá registrar aquí:

1. nuevas frases o familias de consultas;
2. cambios del registro principal;
3. diseño del historial;
4. modelo definitivo de jugadores y contactos;
5. arquitectura del servicio de WhatsApp;
6. pruebas añadidas y resultados;
7. número de versión, commit y respaldo.

**Regla final:** si una capacidad no está documentada y probada, no se considera lista para mercado.
