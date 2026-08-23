# COURSE DATABASE

## Campo Oficial

**Campo:** El Pulté Golf Club

**Marcas:** Blancas

**Versión:** 1.0

**Estado:** Oficial

---

# PROPÓSITO

Este documento constituye la Base de Datos Oficial de todos los campos de golf utilizados por Golf Score Card GT.

Toda operación del Motor de Scoring deberá consultar exclusivamente este documento para obtener:

- Par del hoyo.
- Handicap del hoyo.
- Yardaje.
- Rating.
- Slope.
- Tee utilizado.

Queda estrictamente prohibido calcular Gross, Neto, Stableford o cualquier estadística utilizando información distinta a la contenida en esta base de datos.

Esta base de datos constituye la única fuente oficial de verdad para todos los cálculos del sistema.

---

# EL PULTÉ GOLF CLUB

## Marcas Blancas

| Hoyo | Par | Handicap | Yardas |
|------|----:|---------:|-------:|
| 1 | 4 | 9 | 384 |
| 2 | 4 | 5 | 312 |
| 3 | 4 | 7 | 361 |
| 4 | 4 | 11 | 309 |
| 5 | 3 | 17 | 166 |
| 6 | 5 | 3 | 470 |
| 7 | 5 | 1 | 441 |
| 8 | 3 | 15 | 112 |
| 9 | 4 | 13 | 326 |
| 10 | 3 | 18 | 164 |
| 11 | 5 | 2 | 465 |
| 12 | 4 | 8 | 289 |
| 13 | 4 | 16 | 329 |
| 14 | 5 | 4 | 483 |
| 15 | 4 | 6 | 385 |
| 16 | 3 | 10 | 302 |
| 17 | 4 | 14 | 140 |
| 18 | 4 | 12 | 281 |

---

# CATÁLOGO DEL REGISTRO V157

| Campo mostrado | Estado de tarjeta oficial |
|---|---|
| El Pulté | Configurada |
| Country Club | Configurada y validada |
| San Isidro | Tarjeta recibida; carga diferida |
| Mayan Golf | Pendiente de recibir |
| Hacienda Nueva | Pendiente de recibir |
| Alta Vista | Pendiente de recibir |
| La Reunión | Pendiente de recibir |

El registro permite marcar sólo una opción. Ningún campo pendiente puede iniciar una ronda ni heredar datos de El Pulté.

---

# GUATEMALA COUNTRY CLUB

**Versión:** V196  
**Estado:** Oficial, configurado y validado contra tarjeta física  
**Par:** 71 (ida 35, vuelta 36)

## Pars por hoyo

| Hoyo | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Par | 4 | 3 | 4 | 4 | 5 | 3 | 4 | 3 | 5 | 4 | 4 | 3 | 4 | 4 | 5 | 3 | 5 | 4 |

## Marcas oficiales

| Marca | Rating | Slope | Ida | Vuelta | Total |
|---|---:|---:|---:|---:|---:|
| Negras | 72.4 | 145 | 3186 | 3470 | 6656 |
| Azules | 71.2 | 142 | 3094 | 3299 | 6393 |
| Blancas | 70.5 | 141 | 3012 | 3220 | 6232 |
| Amarillas | 67.5 | 134 | 2756 | 2908 | 5664 |
| Rojas | 72.6 | 137 | 2696 | 2884 | 5580 |

## Matrices de handicap por hoyo

- Negras y Azules: `7, 9, 17, 11, 3, 13, 1, 15, 5, 14, 8, 18, 16, 2, 10, 4, 12, 6`.
- Blancas: `7, 9, 15, 13, 3, 11, 1, 17, 5, 14, 10, 18, 16, 2, 8, 4, 12, 6`.
- Amarillas y Rojas: `3, 7, 15, 9, 1, 11, 5, 17, 13, 2, 10, 18, 4, 14, 12, 8, 16, 6`.

Los 90 yardajes individuales están incorporados en `COUNTRY_CLUB_TEES` dentro del código y cubiertos por una prueba exacta contra la tarjeta oficial. Ninguna marca reutiliza yardajes o matrices de El Pulté.
