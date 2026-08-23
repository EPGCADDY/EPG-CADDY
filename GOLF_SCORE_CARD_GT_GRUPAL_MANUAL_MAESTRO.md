# GOLF Score Card GT. GRUPAL

## Manual Maestro y Memoria Funcional Viva

**Documento:** fuente operativa de verdad de la tarjeta grupal  
**Estado:** vivo y obligatorio  
**Versión documentada:** V288
**Fecha de corte:** 23 de agosto de 2026
**Ramas operativas:** `main` (Producción vigente) y `v288-stableford-one-touch-home` (candidata)
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
15. La línea operacional debe ser tan coherente como la línea gráfica: pantalla atrás/adelante, regreso al registro, dictado, revisión, guardar, cerrar y enviar conservan el mismo patrón y significado en toda la aplicación; no se crean recorridos paralelos o contradictorios para la misma acción.
16. Control manual y control de voz son dos entradas equivalentes al mismo motor oficial. Cuando ambos admiten una operación, deben compartir validación, cálculo, persistencia, transición de estado y resultado; cambiar el medio de control no puede cambiar el efecto funcional.

### Reglas 23 y 24 — comunicación y siguiente acción

**23. Prohibido dejar al usuario adivinando.** Esta regla es obligatoria para todos los mensajes del proyecto. Ningún mensaje puede terminar en el aire. Después de cualquier explicación, investigación, resultado, problema, avance, corrección o reporte debe quedar inequívocamente indicado quién tiene la siguiente acción.

El usuario nunca debe tener que preguntarse si espera, responde, toca algo, envía `sigue`, deja abierta la computadora o si el trabajo ya terminó.

**24. Todo mensaje debe terminar con una acción o solicitud.** Existen únicamente estos dos estados válidos:

1. **La siguiente acción es del usuario.** El mensaje termina con `SIGUIENTE ACCIÓN — TUYA:` y especifica exactamente qué debe hacer o responder.
2. **No se necesita nada del usuario en este momento.** El mensaje lo declara expresamente, explica el estado real y señala el siguiente punto del proceso.

ChatGPT no puede fingir que continuará trabajando silenciosamente después de finalizar un turno. Si para continuar hace falta otro mensaje, el cierre obligatorio es:

`DE TU PARTE: no necesitas hacer nada en la computadora; déjala abierta únicamente si ya se indicó una eventualidad concreta.`

`PARA CONTINUAR: envíame cualquier mensaje —por ejemplo “sigue”— y retomo exactamente desde este punto. No necesitas repetir instrucciones ni volver a autorizar lo ya autorizado.`

La expresión `SIGUIENTE ACCIÓN — MÍA:` sólo puede utilizarse en una actualización intermedia cuando el procesamiento realmente continuará dentro del mismo turno. Está prohibido usarla como cierre final para simular trabajo posterior inexistente.

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

`https://epg-caddy.vercel.app/index-grupal.html`

Esta URL es exclusivamente General y nunca debe llevar el parámetro `stableford_emergency`. Stableford usa su propia ruta oficial y sus propios datos activos. Si una llave General antigua contiene accidentalmente una ronda Stableford, la aplicación la ignora y recupera la última ronda General disponible sin borrar el historial.

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

### 8.5 WhatsApp y directorio local V141 (histórico; retirado del registro visible en V261)

**Estado actual:** compatibilidad histórica interna. Desde V261 WhatsApp no se solicita ni se muestra en el registro de jugadores.

- Cada jugador dispone de un campo WhatsApp opcional.
- El prefijo fijo predeterminado es `+502` para Guatemala.
- Se aceptan exactamente ocho dígitos nacionales después del prefijo.
- El número se guarda en un directorio privado local de Golf Score Card GT en el dispositivo.
- Cuando el mismo jugador vuelve a registrarse, la aplicación recupera automáticamente su WhatsApp.
- El número también acompaña los datos de la ronda, sin mostrarse en la tarjeta de scores.
- Las rondas antiguas sin WhatsApp siguen siendo compatibles.
- La V141 no escribe silenciosamente en la libreta del teléfono y no envía mensajes todavía.

### 8.6 Casillas, código privado e historial de perfil V255 (histórico; interfaz sustituida en V261)

**Estado:** casillas, selector, dictado visible, código y directorio histórico local `OPERATIVOS`; sincronización central `PREPARADA, NO ACTIVADA`.

- Las seis posiciones muestran desde el inicio casillas reales para código, nombre, HDCP, marcas y WhatsApp opcional; ya no existen líneas abiertas con `DISPONIBLE`.
- En captura manual el color de marcas nunca se escribe: se elige en un selector con `NEGRAS`, `AZULES`, `BLANCAS`, `ROJAS` o `AMARILLAS`.
- En dictado se pronuncian nombre, HDCP y color; el resultado reconocido aparece en las mismas casillas, con número y color visibles antes de presionar `OK`.
- Al completar por primera vez nombre, HDCP y marcas se crea un perfil privado reutilizable y se le asigna un código corto.
- Escribir únicamente ese código recupera en el mismo dispositivo el nombre, último HDCP, últimas marcas y último WhatsApp guardado; todos permanecen editables.
- Cada variación conserva el dato vigente y agrega un evento al historial local sin borrar la información anterior.
- La migración central `002_player_profiles_and_history.sql` deja preparados código único, dato vigente e historial de cambios. No debe anunciarse como sincronización central activa hasta aplicar la migración, habilitar autenticación y superar prueba multi-dispositivo.
- El panel de proyecto `COMPARTIR`, su código visible y la recuperación manual por código fueron eliminados del registro en V261.
- La eliminación se limita al registro de jugadores. Las acciones oficiales de cierre `CORREO / WHATSAPP GLOBAL` y `CORREO / WHATSAPP PERSONAL` permanecen operativas.

### 8.6.1 Registro oficial vigente V262

- El registro ofrece exactamente dos vías: `1 · DICTADO` y `2 · MANUAL OPCIONAL`.
- En Dictado, se toca el micrófono y se pronuncian únicamente `NOMBRE + HDCP + MARCAS`.
- En Manual Opcional, cada fila contiene únicamente `NOMBRE + HDCP + MARCAS`; las marcas se eligen en el selector de color.
- Se permiten de uno a seis jugadores.
- Si un jugador fue omitido y todavía hay menos de seis, el botón pequeño `+ JUGADOR` abre directamente la ronda activa en modo de incorporación y conserva los scores ya registrados. El botón `ATRÁS` de una tarjeta Stableford vuelve en un solo toque a la pantalla principal completa —campos, modalidades, torneo y registro—, conserva la ronda activa y elimina la ruta especial del URL; no abre primero el editor Stableford ni obliga a recorrer pantallas intermedias.
- No se muestran ni operan Código, Compartir o WhatsApp dentro del registro.

### 8.7 Base maestra y sustitución del dato vigente V256

- El código privado es la identidad estable del jugador. Si se vuelve a registrar ese código, se actualiza el mismo jugador aunque el nombre haya sido corregido.
- El registro más reciente reemplaza los datos vigentes anteriores: nombre, handicap, marcas, correo y WhatsApp.
- Los datos sustituidos no se eliminan: se conservan como eventos históricos con fecha, fuente y vínculo de ronda cuando corresponde.
- Una ronda nueva carga exclusivamente el último perfil vigente.
- Campo y definición de yardajes, torneo, participantes, scores por hoyo, cierres, tarjetas lógicas y acciones de compartir viajan en un paquete maestro versionado.
- La cola trabaja sin conexión y sólo elimina un paquete después de recibir confirmación remota íntegra del mismo hash.
- La base central distribuye el paquete por rubros; no usa una bolsa genérica como fuente operativa.
- WhatsApp y demás contactos siguen siendo datos privados. La API central requiere autenticación y el navegador nunca contiene la contraseña de PostgreSQL.
- V256 no debe anunciarse como centralmente activa hasta aplicar la migración en Producción y completar una prueba real de ida, lectura y recuperación.

### 8.7 Torneo V143

**Estado:** registro y archivo local `OPERATIVOS`; visualizador y consulta histórica por voz `PLANIFICADOS`.

- El registro ofrece una opción `TORNEO`.
- Al activarla, sólo se solicita el nombre del torneo.
- No se solicita año ni número de ronda: la tarjeta ya conserva fecha y hora automáticas.
- Varias tarjetas con el mismo nombre de torneo forman una colección.
- Su orden cronológico determina primera, segunda, tercera y siguientes rondas.
- Ejemplo: las tres tarjetas más antiguas a recientes con nombre `Torneo Nacional` y fecha de 2025 corresponden a sus rondas 1, 2 y 3.
- La tarjeta digital muestra el nombre del torneo.
- Las rondas que nunca fueron guardadas no pueden reconstruirse automáticamente; deberán importarse o registrarse manualmente.

### 8.8 Campo de golf V156

- El registro presenta siete opciones ya escritas con casillas de selección única: `El Pulté`, `Country Club`, `San Isidro`, `Mayan Golf`, `Hacienda Nueva`, `Alta Vista` y `La Reunión`.
- Sólo puede marcarse un campo por ronda.
- `Country Club` es el nombre exacto mostrado; no se agrega ninguna palabra adicional.
- El Pulté y Guatemala Country Club permanecen operativos con sus tarjetas oficiales cargadas y validadas.
- Guatemala Country Club usa Par 71 (35 ida y 36 vuelta), cinco marcas oficiales y la matriz de handicap correspondiente a cada marca.
- Los otros cinco campos quedan visibles como pendientes y no permiten iniciar una ronda hasta cargar y validar sus tarjetas oficiales.
- Nunca se reutilizan pars, handicaps, yardajes, rating o slope de El Pulté para otro campo.

---

## 9. Captura de scores

### 9.1 Estructura mínima

Una anotación válida contiene:

- hoyo activo automático real entre 1 y 18;
- jugador existente;
- Gross válido, término golfístico reconocido o X explícita autorizada.

Ejemplos:

- `Jessie 5` en el hoyo que muestra el cursor;
- `Alan birdie` en el hoyo que muestra el cursor;
- `Hoyo 7 Alan birdie` únicamente cuando se desea reposicionar expresamente el cursor;
- múltiples jugadores para el mismo hoyo;
- bloques completos consecutivos sin repetir el número de hoyo;
- corrección retroactiva de un hoyo ya registrado.

El panel común `CONTROL MANUAL` es la pantalla principal de ingreso para General y Stableford. El cursor se coloca en el primer hoyo pendiente, muestra inmediatamente cada score recibido y ejecuta la misma operación de `ENTER` cuando todos los jugadores activos tienen Gross o X explícita. Después avanza al hoyo siguiente. Manual y voz comparten el mismo criterio de completitud, escritor, cálculo, persistencia y render.

### 9.2 Registro silencioso

**Estado:** `OPERATIVO`.

Después de registrar scores, la aplicación no debe recitar automáticamente los scores de cada jugador ni los resultados globales. La única excepción operacional es el recordatorio exacto de dato faltante: si un hoyo ya comenzó y pasan dos segundos sin recibir otro score, puede pronunciar únicamente `Falta NOMBRE`. Después acepta `Score`, `Nombre + Score`, una omisión explícita o `Nombre + omisión`. No puede añadir ninguna otra palabra ni crear una X por tiempo.

### 9.3 Atomicidad

Si una instrucción múltiple contiene un elemento inválido, no debe aplicar silenciosamente una parte e ignorar otra. Debe fallar de forma controlada para evitar una tarjeta parcialmente alterada sin conocimiento del usuario.

### 9.4 Corrección retroactiva

Un score real posterior puede reemplazar una `X`. Todos los resultados dependientes —Gross, Neto, handicap aplicado, contra par, puntos Stableford, primera vuelta, segunda vuelta y total— se recalculan.

---

## 10. Omisiones y X

**Estado:** comportamiento automático `DESCARTADO`.

- Avanzar de hoyo no autoriza colocar `X` a quienes no fueron dictados.
- La aplicación no puede inferir que un jugador omitió un hoyo.
- `X`, `EQUIS`, `CERO`, `SIN SCORE`, `SIN DATO`, `SIN RESULTADO`, `NO INFORMÓ`, `NO REPORTÓ`, `NO DIJO`, `NO CANTÓ`, `NO DIO SCORE`, `NO SE SABE`, `PONLE CERO`, `NO LE ANOTES` y sus variantes autorizadas registran una X únicamente cuando identifican al jugador o responden al recordatorio exacto `Falta NOMBRE`.
- Una X explícita cuenta como dato atendido para ejecutar `ENTER` y avanzar, pero nunca inventa Gross, Neto ni puntos.
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
- La franja del reloj se distribuye en tres zonas independientes: `INICIO` a la izquierda, el botón rojo `TIMER ON` / `TIMER OFF` en el centro y el cronómetro `RONDA HH:MM:SS` a la derecha.
- La superficie táctil ampliada pertenece exclusivamente al botón rojo central; no existe ninguna capa invisible sobre el micrófono, la información del campo ni la cuadrícula.
- El botón central congela o reanuda el tiempo de la ronda y conserva el estado en la copia primaria, el respaldo y el archivo local.
- El botón es idempotente: una vez detenido muestra el tiempo final y no puede volver a modificarlo.
- En una ronda completa heredada cuyo reloj siguió corriendo, el primer toque recupera como final la hora del último score registrado; en una ronda todavía incompleta usa la hora exacta del toque.
- Una flecha verde fija en la esquina inferior izquierda, con el texto inferior `REGRESAR A DATOS`, regresa al Registro de ronda sin borrar ni sustituir la ronda activa; sólo `INICIAR RONDA` confirmado crea una ronda nueva.
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
- En General y en `RONDA SIN REGISTRO`, el bloque inferior se titula `INFORMACIÓN DE RONDA` en verde neón.
- En Stableford, el bloque de captura manual se titula `STABLEFORD` y el bloque inferior de resultados se titula `PUNTOS`, también en la tarjeta digital final.
- La tarjeta grupal muestra: `JUGADOR`, `GROSS OUT`, `GROSS IN`, `GROSS TOTAL`, `HCP`, `NETO TOTAL` y `+/- NETO`.
- `RONDA SIN REGISTRO` siempre muestra sus datos Gross reales: `JUGADOR`, `GROSS OUT`, `GROSS IN` y `GROSS TOTAL`; cuando un jugador tiene HDCP y marcas completos, añade para él los resultados Neto correspondientes.
- La tarjeta Stableford muestra: `JUGADOR`, Gross de primera vuelta, segunda vuelta y total, y Puntos de primera vuelta, segunda vuelta y total.
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
- el archivo local de hasta 120 rondas es únicamente una salvaguarda transitoria de desarrollo y debe migrarse íntegramente antes de retirarse;
- en la versión comercial, el teléfono no conserva el historial: sólo ronda activa, caché mínima y cola pendiente, purgadas después de confirmación remota.

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
- El directorio local V141 guarda el número dentro de Golf Score Card GT, con prefijo `+502` y ocho dígitos.
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

**Estado:** arquitectura, esquema, Neon remoto y nueve tablas `OPERATIVOS`; autenticación del transporte, migración retroactiva y sincronización comercial `PENDIENTES`.

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

## 24. Estado funcional al corte V199

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
- fuente matemática única V180 para cada casilla, ida, vuelta y total, cubierta exhaustivamente en dos matrices, handicaps 0–54, 18 hoyos y Gross 1–12;
- consultas múltiples de ronda activa;
- acumulados, posiciones, tipos de score, mejores/peores, handicap y pendientes;
- tarjeta digital de consulta;
- resultados totales.
- cierre oficial únicamente con todos los scores requeridos, cero `X`, snapshot inmutable SHA-256 e idempotencia;
- bloqueo de scores y cambios directos de jugadores después del cierre oficial;
- mensaje exacto `Ronda finalizada. Las tarjetas están listas.`;
- registro WhatsApp opcional con `+502`;
- directorio local persistente de jugadores y recuperación del número por nombre.
- registro opcional de torneo por nombre;
- fecha automática como identificador de año y orden de ronda;
- salvaguarda transitoria local de hasta 120 rondas mientras se habilita y verifica la migración central; no es la arquitectura comercial definitiva.
- selector de campo mediante siete casillas visibles de selección única;
- bloqueo preventivo de campos sin tarjeta oficial cargada.
- dictado continuo de ronda con espera de cuatro segundos entre capturas;
- cierre de dictado independiente del estado transitorio `listening`, watchdog de diez segundos para transcripciones pendientes y protección de los estados `ESCUCHANDO`, `TRANSCRIBIENDO` y `PROCESANDO`;
- navegación hablada desde la ronda hacia el registro;
- silencio ante frases sin intención reconocida, sin inventar datos ni alterar scores.
- interruptor rojo persistente `TIMER ON` / `TIMER OFF` para detener y reanudar el cronómetro sin contar la pausa;
- zona táctil real de 44 px de alto limitada al botón TIMER central, sin interceptores globales y completamente separada del micrófono y la cuadrícula;
- cuadrícula de tarjeta y resultados bloqueada contra selección azul, arrastre y menú contextual de Safari;
- flecha inferior izquierda siempre visible para regresar al Registro de ronda.

### En validación continua

- sensibilidad real del micrófono en campo;
- cobertura de vocabulario natural extenso;
- lectura de acumulados completamente fluida;
- pruebas de combinaciones complejas de consultas.

### Planificado

- historial permanente de rondas;
- consultas por fecha;
- base central alojada de jugadores (el registro V2 y directorio local ya son operativos);
- interfaz y API completas de consentimiento para correo/WhatsApp (el WhatsApp opcional local ya es operativo);
- envío automático de la tarjeta grupal;
- análisis personales integrados dentro del producto grupal;
- analítica histórica y comparaciones avanzadas.
- base PostgreSQL central alojada y sincronización offline idempotente;
- autenticación y permisos por rol;
- cierre oficial inmutable y correcciones versionadas;
- archivos privados Global/personales y entregas verificables.

---

## 25. Ronda sin registro

La primera pantalla incorpora el acceso **SCORE CARD SIN REGISTRO** dentro de `SELECCIONA MODALIDAD`, exactamente debajo de `STABLEFORD`. Permite abrir inmediatamente la tarjeta sin registrar jugadores y sin presionar `OK`. Está destinada a inspección visual, práctica y partidas informales de algunos hoyos, incluso salteados. No existe una segunda opción duplicada al final del registro.

- La flecha de acceso activa por sí sola el modo `RONDA SIN REGISTRO`; el usuario no debe marcar ninguna opción adicional.
- La cuadrícula abre seis perfiles opcionales. En cada uno puede dejar todo vacío o completar sólo nombre, sólo HDCP, sólo marcas, cualquier combinación parcial o los tres datos.
- Los datos omitidos pueden completarse durante la ronda sin reiniciar ni perder scores: manualmente en las casillas de la propia tarjeta o por micrófono indicando la posición, por ejemplo `JUGADOR 2 CARLOS 14 BLANCAS`, `JUGADOR 2 HANDICAP 14` o `JUGADOR 2 MARCAS BLANCAS`.
- Sin marcas, los yardajes permanecen vacíos. Con marcas, aparecen sus yardajes. Con HDCP y marcas válidos, aparecen también HDCP, Neto y `+/-` para ese jugador.
- El dictado de scores acepta hoyo y resultado para el primer espacio, por ejemplo: `HOYO 1 PAR`, y también jugador o nombre, hoyo y resultado, por ejemplo: `JUGADOR 3 HOYO 5 BOGEY` o `CARLOS HOYO 9 PAR`.
- No exige orden consecutivo ni completar 18 hoyos; las casillas no jugadas permanecen vacías y nunca se convierten en `X`.
- Los resultados calculan automáticamente `GROSS OUT`, `GROSS IN` y `GROSS TOTAL`; el total no se escribe manualmente.
- Se identifica permanentemente como `RONDA SIN REGISTRO · DATOS OPCIONALES · NO GENERA RÉCORD NI ENVÍOS`.
- No entra al archivo histórico, base de jugadores, estadísticas históricas, récords, cierre oficial, Tarjeta Global, tarjeta personal, WhatsApp, correo ni cola de entregas.
- Al regresar a Datos puede iniciarse posteriormente una ronda oficial mediante el registro normal.

## 26. Actualización obligatoria de la aplicación

La aplicación consulta periódicamente el identificador central de la versión publicada. Cuando detecta una versión superior a la cargada, detiene voz y funciones, cubre completamente la interfaz y presenta `ACTUALIZACIÓN OBLIGATORIA` con un único botón operativo: `ACTUALIZAR`.

Mientras el aviso esté activo no se permite registrar jugadores, abrir la tarjeta oficial o provisional, dictar scores ni utilizar ninguna función. `ACTUALIZAR` conserva primero la ronda local activa, carga la versión publicada con una URL nueva para evitar caché y sólo entonces devuelve el control. La revisión ocurre al iniciar, cada treinta segundos y al volver a primer plano.

## 27. Stableford Scratch — Senior y S. Senior

La pantalla general de Registro mantiene una opción permanente correctamente nombrada `STABLEFORD`. Al tocarla abre la modalidad Stableford dentro de la misma tarjeta oficial y la misma arquitectura operacional. General y Stableford conservan datos de ronda separados para impedir contaminación cruzada, pero comparten navegación, control manual, voz, validación, escritura, persistencia, render y cierre.

La apertura normal del alojamiento conserva y restaura la última ronda Stableford activa: campo, torneo, categoría, jugadores, marcas, Gross y Puntos. El botón `NUEVA RONDA` elimina únicamente la ronda activa y el borrador de registro, y presenta un registro Stableford completamente limpio. Nunca borra el historial de tarjetas cerradas ni la clasificación acumulada.

- `SENIOR`: handicap fijo `0`, marcas blancas y cinco plazas de clasificación por ranking.
- `S. SENIOR`: handicap fijo `0`, marcas amarillas y cuatro plazas de clasificación por ranking.
- En una nueva ronda no queda categoría impuesta. El registro muestra simultáneamente `SENIOR · BLANCAS` y `SÚPER SENIOR · AMARILLAS`; la selección configura automáticamente las marcas, los yardajes, Course Rating y Slope correspondientes al campo elegido.
- El registro muestra los cuatro campos autorizados —Country Club, El Pulté, San Isidro y Mayan Golf— y exige seleccionar uno antes de iniciar.
- En ambas categorías se registran de uno a seis nombres dentro del panel de la propia tarjeta oficial, manualmente o mediante el micrófono de registro. Los espacios no utilizados permanecen vacíos; no se permiten nombres duplicados. Handicap y marcas no se escriben porque la aplicación los configura automáticamente.
- El mismo panel permite escribir el nombre del torneo antes de iniciar scores. `REGRESAR A DATOS` abre los datos de la ronda actual sin borrar sus scores; `NUEVA RONDA` sí abre un registro completamente limpio.
- Los únicos campos admitidos por la serie son Country Club, El Pulté, San Isidro y Mayan Golf. Un campo sin tarjeta oficial cargada permanece bloqueado para evitar cálculos con datos heredados o inventados.
- Cada jugador ocupa dos filas visibles: `GROSS` y `PUNTOS`, con separación visual entre jugadores y totales `OUT`, `IN` y `TOTAL`.
- Puntuación automática por hoyo: doble bogey o más `0`; bogey `1`; par `2`; birdie `3`; eagle, albatros o mejor `4`. El valor máximo por hoyo queda limitado a cuatro puntos.
- `X`, `EQUIS` o `LEVANTA` registra el hoyo levantado con cero puntos y sin fabricar un Gross.
- La voz acepta `Nombre + Gross` en el hoyo activo; el número de hoyo es opcional y únicamente reposiciona el cursor. Acepta bloques consecutivos, X explícita y la respuesta contextual posterior a `Falta NOMBRE`. No reparte tiros de handicap. El ingreso manual y el dictado terminan en la misma secuencia oficial de cálculo, guardado, render y cierre hablado. Al completar los hoyos 1–9 por cualquiera de los dos controles anuncia automáticamente `Primera vuelta` y, en orden de registro, el nombre, Gross y Puntos de cada jugador. Al completar los hoyos 10–18 anuncia `Segunda vuelta` con nombre, Gross y Puntos de cada jugador y luego `Total` con nombre, Gross y Puntos acumulados de cada jugador. Cada cierre se pronuncia una sola vez.
- El recordatorio `Falta NOMBRE` conserva los dos segundos aprobados, pero el tiempo comienza únicamente después de una transcripción final y de comprobar inactividad real. Queda bloqueado y se cancela mientras existe voz activa, delta parcial, transcripción pendiente, watchdog, finalización, salida hablada o aplicación viva de scores. General y Stableford comparten los mismos cuatro segundos de continuidad y diez segundos de vigilancia; no existen excepciones de tiempos por modalidad.
- Antes de cualquier reporte de primera vuelta, segunda vuelta o total, la aplicación cierra automáticamente el micrófono. El micrófono permanece cerrado durante y después de la lectura para que conversaciones externas no interrumpan, alteren ni reinicien el reporte.
- Todos los rótulos visuales de las tarjetas oficial, digital, General, Stableford, Control Manual y artefactos Global/personales utilizan exclusivamente `OUT`, `IN` y `TOTAL`. Las expresiones habladas `Primera vuelta` y `Segunda vuelta` se conservan únicamente dentro del vocabulario de cierre aprobado.
- Al cierre oficial, la ronda conserva un snapshot con SHA-256 y guarda en el historial el campo, la fecha y hora, el torneo, la categoría, los jugadores, los 18 hoyos, Gross y Puntos; además actualiza la clasificación acumulada de su categoría.
- Después del cierre, Stableford usa la misma matriz oficial GRUPAL: abre una Tarjeta Global, permite elegir y abrir cada tarjeta personal, descarga el paquete completo y entrega el archivo visual a la hoja nativa del teléfono para escoger correo o WhatsApp.
- La hoja nativa constituye una entrega preparada y confirmada por el usuario. Cancelarla no altera la ronda ni marca la tarjeta como enviada; el envío automático y el estado `ENTREGADO` continúan reservados a proveedores verificables.
- La clasificación contiene cuatro fechas, una por campo, y suma automáticamente las tres mejores tarjetas de cada jugador.
- Se pueden incorporar resultados oficiales de otros grupos mediante `AGREGAR RESULTADO OFICIAL`, indicando jugador, categoría, fecha, campo, puntos y Gross opcional.
- La clasificación Senior muestra las primeras cinco posiciones de ranking; las tres elecciones de capitán se administran fuera del cálculo. S. Senior muestra cuatro posiciones; sus dos elecciones de capitán también son externas.
- En V199 el acumulado operativo se conserva localmente en el navegador. Su migración a Neon y consulta multi-dispositivo continúan pendientes y no deben anunciarse como sincronizadas hasta superar la prueba central.

## 28. Historial inicial del documento

| Fecha | Versión | Registro |
|---|---|---|
| 2026-08-23 | Manual 3.58 / App V288 | Corregida la navegación física demostrada en V287: desde la tarjeta Stableford, `ATRÁS` abre directamente y en un solo toque la pantalla principal completa. La transición persiste la ronda activa, elimina del URL la ruta especial Stableford y no pasa por `RONDA STABLEFORD` como pantalla intermedia. `+ JUGADOR` conserva su función independiente de editar o incorporar participantes sin borrar scores. La prueba V288 bloquea la conexión correcta del botón, la restauración de campos/modalidades/registro, la conservación de la ronda y la ausencia del vínculo anterior al editor Stableford. |
| 2026-08-23 | Manual 3.57 / App V280 | La biblioteca incorpora una pantalla escrita de `ESTADÍSTICAS DEL HISTORIAL` que consulta exclusivamente las rondas guardadas en el dispositivo y no habla automáticamente. Acepta periodos, jugador, campo, torneo, modalidad, vuelta u hoyo; entrega promedios Gross/Neto, mejor/peor, consistencia, tendencia, categorías de score, comparación entre jugadores y puntos Stableford. Las opciones rápidas ejecutan el mismo motor de consultas ya utilizado por voz y los resultados no modifican rondas ni tarjetas. La consulta multi-dispositivo continúa pendiente de la sincronización central autenticada. |
| 2026-08-23 | Manual 3.56 / App V279 | Incorporada `BIBLIOTECA DE TARJETAS` en la ronda, el Registro General y el Registro Stableford. Conserva únicamente rondas con snapshot oficial y permite filtrar por modalidad y campo, además de buscar por jugador, torneo o fecha. Abrir la biblioteca no restaura, reemplaza ni modifica la ronda actual. Desde la ronda histórica seleccionada se puede abrir la Global o una personal, generar su imagen PNG, descargar su PDF o descargar el PDF conjunto. La biblioteca permanece privada en el almacenamiento del dispositivo hasta que la sincronización central autenticada quede habilitada. |
| 2026-08-23 | Manual 3.55 / App V278 | Las tarjetas oficiales Global y personales de General y Stableford se exportan desde el mismo snapshot oficial como imagen PNG y PDF real. `IMAGEN GLOBAL` e `IMAGEN PERSONAL` abren la hoja nativa del teléfono para compartir o seleccionar `Guardar imagen`; si el dispositivo no permite compartir archivos, descargan el PNG. `PDF GLOBAL` y `PDF PERSONAL` descargan el archivo individual y `PDF TODAS` crea un documento multipágina con la Global y todas las personales. Una corrección oficial genera los archivos desde la versión vigente sin alterar ni borrar el original. |
| 2026-08-23 | Manual 3.54 / App V277 | Incorporada la pantalla única de `CORRECCIÓN OFICIAL` para General y Stableford. Exige jugador, hoyo, nuevo Gross, motivo y responsable; recalcula todos los datos derivados de la modalidad, genera una versión oficial nueva con SHA-256 propio y conserva la tarjeta original disponible mediante `ABRIR ORIGINAL`. La tarjeta corregida queda identificada por versión, reemplaza únicamente el resultado vigente y conserva íntegra la secuencia de versiones anteriores. |
| 2026-08-23 | Manual 3.53 / App V276 | El Control Manual común de General y Stableford incorpora `ANTERIOR`, selector directo de hoyo y `SIGUIENTE`. Los límites 1 y 18 se deshabilitan correctamente y una ronda cerrada bloquea toda navegación de captura. Moverse conserva todos los scores ya guardados; si existe una edición aún no confirmada, la aplicación mantiene el hoyo actual y exige `PRESIONA ENTER ANTES DE CAMBIAR DE HOYO`, evitando pérdida o escritura accidental. El avance automático al completar todos los jugadores permanece intacto y las entradas manual y de voz continúan utilizando el mismo escritor operacional. |
| 2026-08-23 | Manual 3.52 / App V275 | Estabilizada la recepción viva común de General y Stableford. Cada ítem de audio conserva el hoyo operativo donde comenzó, por lo que el avance visual al hoyo siguiente no puede reinterpretar los deltas anteriores. La actividad de voz se controla por ítem concurrente: una transcripción atrasada ya no apaga el estado de una frase posterior todavía activa. `Falta NOMBRE` mantiene dos segundos de inactividad mínima y añade una confirmación breve que se cancela ante cualquier audio, delta o transcripción nueva. El VAD de ronda amplía el prefijo a 700 ms, reduce el umbral a 0.2 y exige 1,200 ms de silencio antes de cortar una frase, conservando el render inmediato de cada pareja válida. |
| 2026-08-23 | Manual 3.51 / App V274 | Incorporadas literalmente las reglas 23 y 24 de comunicación: ningún mensaje puede terminar sin indicar quién tiene la siguiente acción; si el turno finaliza, queda prohibido simular trabajo silencioso posterior. El cierre debe pedir una acción exacta al propietario o declarar que no necesita hacer nada y explicar qué mensaje permite retomar. |
| 2026-08-23 | Manual 3.50 / App V274 | Quedan operativos los siete campos General en una sola arquitectura: El Pulté, Country Club, San Isidro, Mayan Golf, Hacienda Nueva, Alta Vista y La Reunión. Mayan incorpora cinco marcas; Hacienda Nueva, cuatro marcas y matrices distintas para Caballeros/Damas; La Reunión incorpora cuatro marcas y muestra guion cuando la fuente disponible no publica Rating o Slope. La recepción viva conserva cada score válido aun cuando la transcripción final contenga después conversación ajena al vocabulario; cada actividad de voz, delta, transcripción o escritura reinicia el silencio real antes de `Falta NOMBRE`. General y Stableford comparten el mismo cursor, escritor, X explícita, corrección retroactiva, persistencia, render y cierre. |
| 2026-08-23 | Manual 3.48 / App V272 | Candidato de liberación definitiva bajo el nombre `Golf Score Card GT`. Corregida la interferencia Stableford: `Falta NOMBRE` ya no se programa desde scores parciales ni puede hablar mientras continúa el dictado, existe audio/transcripción pendiente o el motor aplica datos. General y Stableford comparten un único cierre continuo de cuatro segundos y watchdog de diez segundos. Los reportes de primera vuelta, segunda vuelta y total cierran el micrófono antes de hablar y lo mantienen cerrado. Todos los rótulos visuales pasan a `OUT`, `IN` y `TOTAL` en tarjeta oficial, Control Manual, resúmenes, tarjeta digital y artefactos. Se añade prueba V272 de la puerta de inactividad, cancelación por voz/delta, cierre de micrófono, marca y ausencia de rótulos obsoletos. La publicación permanente continúa sujeta a auditoría integral, navegador real, commit local identificado y autorización explícita del destino remoto. |
| 2026-08-23 | Manual 3.49 / App V273 | San Isidro y Alta Vista quedan cargados desde sus tarjetas oficiales dentro del mismo motor General. San Isidro incorpora seis marcas, incluida Plateada, y conserva su operación Stableford; Alta Vista incorpora cuatro marcas y par 71. La selección de campo actualiza jugadores, marcas, yardajes, rating, slope y tarjeta sin mezclar datos de la ronda activa. |
| 2026-08-23 | Manual 3.47 / App V271 | Corregido el bloqueo físico de apertura del micrófono detectado en el preview V270. La sesión Realtime devolvía HTTP 400 porque el prompt de transcripción medía 1,070 caracteres y excedía el máximo contractual de 1,024. El prompt se compacta sin eliminar jugadores, hoyo activo automático, Nombre + Score, respuesta contextual a `Falta NOMBRE`, vocabulario golfístico ni omisiones X; además queda limitado programáticamente a 1,024 caracteres. Se incorpora una prueba contractual independiente con plantillas de cero a 300 caracteres de jugadores para impedir la regresión. Evidencia: prueba V271 y auditoría maestra de 44 paquetes PASS. |
| 2026-08-23 | Manual 3.46 / App V270 | El panel común `CONTROL MANUAL` pasa a ser la pantalla principal de ingreso encima de la tarjeta oficial para General y Stableford. El cursor se coloca automáticamente en el hoyo activo, por lo que el dictado normal exige únicamente `Nombre + Score`; decir `Hoyo N` queda como reposicionamiento opcional. Cada score se muestra de inmediato y, al completar Gross o X explícita para todos los jugadores activos, el mismo motor de `ENTER` valida, guarda, calcula, renderiza y avanza. Se incorpora un vocabulario amplio de X explícita —incluidos cero, sin score, sin dato, no informó, no dijo, no cantó, ponle cero y no le anotes— sin restaurar ninguna X automática. Si un hoyo ya empezó y pasan dos segundos sin otro score, la única voz autorizada es `Falta NOMBRE`; la respuesta puede ser solo el score o solo una omisión y se vincula exclusivamente al jugador señalado. Una X puede reemplazarse posteriormente y recalcula General o Stableford. Evidencia automatizada: 43 paquetes, matriz de 242 configuraciones y prueba V270 de bloques completos, incompletos, X múltiples, correcciones, hoyo 18, respuesta contextual y atomicidad. La prueba de navegador local quedó bloqueada porque el entorno no dispone de Chromium y el instalador no pudo obtenerlo; por tanto V270 permanece local y no se declara liberada ni publicada. |
| 2026-08-23 | Manual 3.45 / App V269 | Corregida la omisión operacional detectada físicamente en V268. La demostración vuelve a mostrar y operar `ATRÁS` hacia el Registro, `RONDA PREVIA`, el cambio automático del mismo control a `RONDA ACTUAL` y `NUEVA RONDA`. Registro en curso, ronda activa y archivo de rondas usan llaves exclusivas de la demostración; no leen ni escriben el directorio oficial de jugadores, la ronda General oficial, Stableford ni la sincronización central. Se incorpora una ronda previa completa de seis jugadores y 108 scores para probar el recorrido real anterior/actual sin mezclar datos oficiales. V269 conserva los seis jugadores y los 30 Gross iniciales de los hoyos 1 al 5 en la ronda actual. La puerta de liberación exige la prueba específica V269, auditoría maestra y navegador real de todas las transiciones antes de publicar. |
| 2026-08-23 | Manual 3.44 / App V268 | Enlace de demostración rechazado después de la prueba física. Aunque cargó correctamente seis jugadores y 30 Gross en los hoyos 1 al 5, el aislamiento ocultó indebidamente `ATRÁS`, `RONDA PREVIA`, el retorno `RONDA ACTUAL` y `NUEVA RONDA`. La auditoría automatizada V268 no cubrió esa matriz de navegación y por tanto su PASS fue insuficiente. V268 no se considera versión aprobada ni completa. |
| 2026-08-23 | Manual 3.43 / App V267 | Arquitectura operacional integral aplicada a todas las configuraciones y combinaciones de Score Card. General, Stableford, ronda registrada, ronda sin registro, uno a seis jugadores, campos, categorías, marcas, torneo, ronda nueva/recuperada, manual y voz usan la misma secuencia y el mismo escritor `applyLiteralScores → recordScore(s) → saveEntry → persist → render`. Se eliminó el escritor manual paralelo de Stableford y se creó un único `CONTROL MANUAL` compartido; los nombres sólo se corrigen desde el Registro. La recuperación usa una sola política con filtro explícito de modalidad: General jamás carga jugadores o scores Stableford y Stableford jamás carga General, aunque la ronda contraria sea más reciente. El dictado vivo acepta múltiples hoyos y múltiples jugadores en una misma toma y anota cada pareja completa Jugador/Hoyo/Gross mientras el micrófono continúa abierto; el evento final reconcilia sin duplicar. Una frase ajena al vocabulario permanece en silencio y no modifica datos. El cierre Stableford pronuncia únicamente Nombre, Gross y Puntos; no agrega “Entendido”, “voy a leer” ni preámbulos. Se corrigió además la reconstrucción del formulario General que podía devolver el handicap anterior al pasar desde Nombre. Evidencia: 41 paquetes automatizados, matriz de 242 configuraciones renderizadas en Chromium con 242 escrituras manuales, flujo móvil/escritorio General y Stableford, tanda viva de 35 scores, recuperación cruzada prohibida con fechas adversarias, cero errores de consola y cero solicitudes fallidas. V267 fue publicada en la rama de prueba, pasó la validación física funcional/operacional y quedó aprobada; se conserva como limitación conocida la pérdida ocasional de comprensión del micrófono durante dictados prolongados. |
| 2026-08-23 | Manual 3.42 / App V266 | Ajustado exclusivamente el cierre hablado Stableford al formato propio de la modalidad y a la línea operacional única. Tanto el control manual como el control de voz pasan por el mismo cierre calculado: en el hoyo 9 anuncia `Primera vuelta` y, por jugador, Nombre, Gross y Puntos; en el hoyo 18 anuncia `Segunda vuelta` con esos mismos datos y a continuación `Total` con los acumulados de los 18 hoyos. General y la interfaz visual permanecen congelados; se conserva la recuperación y el reintento de la sesión de voz incorporados en V265. |
| 2026-08-23 | Manual 3.41 / App V265 | Corregido exclusivamente el cierre hablado de la primera vuelta Stableford: al registrar el último score del hoyo 9 anuncia automáticamente por jugador Gross, Neto y resultado sobre/bajo par. Stableford delega este resumen al motor oficial GRUPAL y, si el primer envío de audio no encuentra la sesión disponible, recupera la sesión y reintenta. La interfaz visual, jugadores, scores, puntos, campos y demás funciones permanecen congelados. |
| 2026-08-22 | Manual 3.39 / App V262 | El segundo método se identifica como `2 · MANUAL OPCIONAL`. `SCORE CARD SIN REGISTRO` queda dentro de `SELECCIONA MODALIDAD`, debajo de `STABLEFORD`, sin duplicado inferior. La `RONDA SIN REGISTRO` acepta seis perfiles vacíos, parciales o completos, editables manualmente o por micrófono durante la ronda. Los yardajes dependen de las marcas, Neto requiere HDCP y marcas, y los tres totales Gross se calculan automáticamente y permanecen visibles. `REGRESAR A DATOS` de una ronda oficial edita o agrega jugadores sin borrar scores. El acceso Stableford usa caché `v=262`. |
| 2026-08-22 | Manual 3.40 / App V263 | En rondas registradas se muestran únicamente los jugadores reales, consecutivos y sin bloques vacíos intercalados; la ronda sin registro conserva seis posiciones editables. La flecha flotante `REGRESAR A DATOS` se elimina y se sustituye por un botón pequeño `ATRÁS`, dentro del flujo de la tarjeta, que abre el editor de datos sin borrar scores. Mientras haya menos de seis jugadores aparece además el control pequeño `+ JUGADOR`; al completar seis se oculta. La simulación funcional verifica que al agregar al sexto se conservan intactos los scores de los cinco anteriores. El acceso Stableford usa caché `v=263`. |
| 2026-08-22 | Manual 3.38 / App V261 | Registro oficial depurado a dos vías exactas: `1 · DICTADO` y `2 · MANUAL`, ambas limitadas a Nombre, HDCP y Marcas; se eliminan de esa interfaz Código, Compartir y WhatsApp. `SELECCIONA CAMPO` contiene únicamente campos; `STABLEFORD` queda separado bajo `SELECCIONA MODALIDAD` con apariencia neutral, nunca verde como selección activa. En la tarjeta Stableford, el panel manual se titula `STABLEFORD` y el resumen inferior `PUNTOS`, incluido el digital final. `RONDA PREVIA` continúa alternando a `RONDA ACTUAL` para recuperar la ronda vigente completa. El acceso Stableford usa caché `v=261`. |
| 2026-08-22 | Manual 3.37 / App V260 | El panel alternativo de registro queda titulado únicamente `PUNTOS DE RONDA`; la casilla del nombre gana 25% de ancho y las tres columnas acumuladas IN/OUT/TOTAL se angostan. El PUNTOS TOTAL del resumen se muestra en verde neón. La flecha `REGRESAR A DATOS` queda separada de `TARJETA DIGITAL` y permite agregar un jugador faltante conservando todos los scores existentes. General y Stableford quedan aisladas por enlace y almacenamiento: General no restaura una ronda Stableford antigua y `NUEVA RONDA STABLEFORD` no borra datos General. El acceso oficial Stableford usa versión de caché `v=260`. |
| 2026-08-22 | Manual 3.36 / App V259 | El registro manual opcional de Stableford conserva las seis casillas disponibles para permitir grupos de 1 a 6 jugadores. Después de iniciar la ronda, la anotación manual Plan B, la tarjeta oficial y el resumen muestran únicamente los jugadores efectivamente registrados; las filas restantes quedan invisibles. |
| 2026-08-22 | Manual 3.35 / App V258 | En la tarjeta Stableford, el nombre del torneo y la categoría seleccionados en el registro pasan a ser indicadores de sólo lectura y no pueden modificarse durante la anotación. El recuadro alternativo queda identificado expresamente como `ANOTACIÓN MANUAL · PLAN B`; conserva HOYO, GROSS y ENTER para registrar scores sin voz. |
| 2026-08-22 | Manual 3.34 / App V257 | Corregida la selección de campo en la preparación Stableford: la casilla visible es ahora un selector nativo operativo y queda sincronizada con los cuatro botones de campo (El Pulté, Country Club, San Isidro y Mayan Golf). El título de esta pantalla queda únicamente como `RONDA STABLEFORD`. |
| 2026-08-22 | Manual 3.33 / App V256 | Plataforma maestra por rubros preparada: el código actualiza al mismo jugador; el último registro reemplaza nombre, handicap, marcas y WhatsApp vigentes sin borrar el historial anterior. Paquete central para campos/yardajes, torneos, rondas, participantes, jugadas por hoyo, tarjetas lógicas y acciones honestas de compartir; cola offline idempotente y API transaccional autenticada. Migración y recorrido real de Producción pendientes de validación aislada. |
| 2026-08-22 | Manual 3.32 / App V255 | Registro General con seis filas de casillas reales para código privado, nombre, HDCP, selector de marcas y WhatsApp; manual y dictado llenan la misma retícula y muestran número/color antes de `OK`. El perfil se guarda localmente al completar datos válidos, recupera por código y conserva historial de cambios. Migración central preparada pero no aplicada. `COMPARTIR` abre únicamente el proyecto de selección; autorización y envío aún no están disponibles. |
| 2026-08-22 | Manual 3.31 / App V254 | Eliminadas completamente las tres falsas casillas visuales bajo `REGISTRO DE JUGADORES` porque no ejecutaban ninguna acción y podían confundirse con botones. Se conservan sin cambios el título, las instrucciones funcionales, el registro de uno a seis jugadores, el micrófono, la revisión editable, `OK` y la confirmación previa a iniciar la ronda. |
| 2026-08-22 | Manual 3.30 / App V253 | `RONDA PREVIA` operativa y viva en General y Stableford: antes de alternar guarda la ronda visible; restaura campo, fecha, torneo, jugadores, configuración y scores completos; permite continuar editando o dictando; cambia a `RONDA ACTUAL` para regresar sin perder modificaciones; separa estrictamente los historiales General y Stableford y también permite recuperar la última ronda desde el registro vacío posterior a `NUEVA RONDA`. |
| 2026-08-22 | Manual 3.29 / App V252 | Stableford aislado con estado operativo explícito: apertura normal restaura la última ronda; `NUEVA RONDA` limpia solamente ronda activa y borrador, sin tocar historial ni clasificación; registro nuevo sin nombres, campo o categoría forzados; cuatro campos, Senior/blancas, Súper Senior/amarillas y uno a seis jugadores. |
| 2026-08-22 | Manual 3.28 / App V250 | Fin de ronda Stableford conectado a la matriz oficial GRUPAL: Global, una personal por jugador, paquete conjunto, historial y compartir del archivo visual por correo/WhatsApp mediante la hoja nativa, sin falsos estados de entrega. |
| 2026-08-22 | Manual 3.27 / App V201 | Stableford oficial limpio: acceso directo sin nombres precargados, registro interno de uno a seis jugadores, torneo/categoría dentro de la tarjeta y snapshot histórico con campo, fecha, torneo, jugadores, Gross y Puntos. |
| 2026-08-20 | Manual 3.25 / App V199 | Stableford Scratch permanente: Senior HCP 0/marcas blancas y S. Senior HCP 0/marcas amarillas; máximo cuatro jugadores; Gross y puntos por hoyo; X explícita con cero; cuatro campos y fechas; totales por vuelta/ronda; clasificación por las tres mejores tarjetas e ingreso manual de resultados oficiales. |
| 2026-08-22 | Manual 3.26 / App V200 | Reconciliación de la versión física Stableford: bloque inferior unificado como `INFORMACIÓN DE RONDA`, verde neón, con primera vuelta, segunda vuelta y total completos en grupal, provisional, Stableford y tarjeta digital. |
| 2026-08-20 | Manual 3.24 / App V197 | Franja del reloj reorganizada en tres zonas: INICIO a la izquierda, TIMER centrado con superficie táctil real ampliada y cronómetro a la derecha; eliminada completamente la antigua capa invisible y sus interceptores globales para impedir que el micrófono active o desactive el timer. |
| 2026-08-20 | Manual 3.23 / App V196 | Guatemala Country Club habilitado desde su tarjeta oficial: Par 71, 90 yardajes, cinco ratings/slopes y tres matrices de handicap validados casilla por casilla; selección de campo enlazada al motor de Gross, Neto, vueltas y total sin heredar datos de El Pulté. |
| 2026-08-20 | Manual 3.18 / App V193 | Tarjeta en sucio ampliada: seis nombres opcionales y editables directamente, seis bloques exclusivamente Gross, sin handicap/círculos/Neto/resultado, dictado por posición o nombre y aislamiento absoluto de todos los efectos oficiales. |
| 2026-08-20 | Manual 3.19 / App V193 | Revisión visual rigurosa: fecha y metadatos del encabezado fijados a una sola familia/tamaño/peso; cronómetro simplificado a `INICIO … · RONDA …` en verde neón; bloque completo de información del campo homologado en familia, mayúsculas, peso y alineación. |
| 2026-08-20 | Manual 3.20 / App V194 | FECHA y HORA homologadas expresamente con CAMPO, PAR y SLOPE; rótulos HOYO, PAR y YDS centrados horizontal y verticalmente dentro de su columna. |
| 2026-08-20 | Manual 3.21 / App V194 | Franja `INICIO · RONDA` y botón TIMER distribuida en todo el ancho con separación amplia y simétrica; nomenclatura de registro abreviada a `HDCP - MARCAS - TEES` y encabezados protegidos contra superposición. |
| 2026-08-20 | Manual 3.22 / App V195 | Franja del reloj corregida para usar realmente los extremos laterales: distribución `space-between`, margen móvil mínimo y separación estable entre `INICIO · RONDA` y TIMER. |
| 2026-08-20 | Manual 3.16 / App V192 | Tarjeta provisional sin registro: acceso directo desde Registro, sin handicap, dictado por hoyo y score, hoyos salteados, casillas vacías y aislamiento absoluto de historial, récords, cierre oficial y envíos. |
| 2026-08-20 | Manual 3.17 / App V192 | Actualización obligatoria: detección central de versión, bloqueo total de la aplicación vencida, conservación de ronda y botón único `ACTUALIZAR` con recarga anticaché. |
| 2026-08-19 | Manual 3.9 / App V182 | Implementado motor de cierre oficial: validación completa, cero X, snapshot SHA-256, cierre idempotente, bloqueo de mutaciones posteriores y botón `FINALIZAR RONDA` dentro del panel final. |
| 2026-08-19 | Manual 3.10 / App V183 | Blindaje táctil absoluto de tarjeta y resumen: líneas, columnas, celdas y textos no reciben eventos ni selección; solamente los controles editables del Registro conservan cursor y borrado. |
| 2026-08-19 | Manual 3.11 / App V184 | Generador determinista desde snapshot oficial: Tarjeta Global, tarjeta personal ampliada por jugador, estadísticas, gráfica, resumen escrito, apertura individual y descarga conjunta. |
| 2026-08-19 | Manual 3.12 / App V185 | Motor compositivo de consultas históricas habladas y escritas con calendario `America/Guatemala`: hoy, ayer, mañana/tarde, última jugada, último mes, hoyo/vuelta/ronda, promedios, reportes, categorías y ranking de hoyos. |
| 2026-08-19 | Manual 3.13 / App V185 | Motor de corrección posterior al cierre: exige autorización y motivo, incrementa versión, recalcula el hoyo corregido, enlaza el SHA-256 anterior y preserva íntegramente la Tarjeta original. Interfaz de autorización aún pendiente. |
| 2026-08-19 | Manual 3.14 / App V185 | Cola offline idempotente: identificador único, hash de payload, reintentos controlados, conflicto detectable y purga local solamente después de acuse remoto con integridad comprobada. Transporte central aún pendiente. |

### 24.1 Capacidad histórica combinatoria

La inteligencia histórica no depende de enumerar todas las frases posibles. Combina libremente estas dimensiones: jugador o grupo; campo; torneo; fecha o periodo; mañana/tarde; últimas N rondas; hoyo único, varios hoyos, primera vuelta, segunda vuelta o ronda; Gross, Neto, contra par y tiros de handicap; águilas, birdies, pares, bogeys, dobles y triples+; cantidad, porcentaje, promedio, mínimo, máximo, récord, consistencia, tendencia, comparación, clasificación y resumen. Los verbos de solicitud y sus equivalentes no cambian la función.

Toda interpretación temporal usa `America/Guatemala`. Cada respuesta debe conservar trazabilidad hasta ronda, jugador y hoyo. El archivo local sirve para continuidad inmediata; el respaldo histórico ilimitado entre teléfonos exige la base central planificada y no se declara completado hasta conectarla y probar restauración.
| 2026-08-19 | Manual 3.8 / App V181 | Robustez de voz: el texto completado se procesa aunque cambie `listening`; watchdog libera transcripciones pendientes; el refresco del reloj deja de sobrescribir los estados activos de escucha, transcripción y procesamiento. |
| 2026-08-19 | Manual 3.7 / App V180 | Unificada la fuente matemática de casillas y totales mediante `derivedScoreForHole`; añadida prueba exhaustiva de Gross, Neto, handicap, contra par, ida, vuelta y total para ambas matrices y todos los handicaps 0–54. |
| 2026-08-19 | Manual 3.6 / App V179 | Cronómetro convertido en interruptor real `TIMER ON`/`TIMER OFF`, reanudación conservando el tiempo acumulado y excluyendo la pausa; superficie táctil completa hasta la fila `YDS`; retícula bloqueada contra selección azul, arrastre y menú contextual; publicación verificada en Producción. |
| 2026-08-19 | Manual 3.5 / App V173 | La barra roja se mueve junto al cronómetro y adopta el texto exacto `TIMER OFF`; la flecha inferior izquierda incorpora debajo `REGRESAR A DATOS`. |
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

## 28. Próxima actualización obligatoria

La próxima versión deberá registrar aquí:

1. nuevas frases o familias de consultas;
2. cambios del registro principal;
3. diseño del historial;
4. modelo definitivo de jugadores y contactos;
5. arquitectura del servicio de WhatsApp;
6. pruebas añadidas y resultados;
7. número de versión, commit y respaldo.

**Regla final:** si una capacidad no está documentada y probada, no se considera lista para mercado. Toda función aprobada debe actualizar simultáneamente código, Matriz de Funciones, manual del usuario y pruebas de aceptación; si falta cualquiera de esas cuatro evidencias, permanece pendiente.
