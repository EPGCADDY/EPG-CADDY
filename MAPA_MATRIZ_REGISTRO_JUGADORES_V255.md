# Mapa matriz — Registro de jugadores V255

## Flujo operativo

| Pieza | Función | Estado V255 |
|---|---|---|
| Seis filas de registro | Casillas visibles para código, nombre, HDCP, marcas y WhatsApp | Operativo |
| Captura manual | Nombre y HDCP escritos; marcas elegidas en selector | Operativo |
| Dictado | Nombre, HDCP y color llenan las mismas casillas | Operativo |
| Código de jugador | Se asigna al primer registro válido y recupera el último perfil en el mismo dispositivo | Operativo local |
| Historial de perfil | Conserva cada cambio de nombre, HDCP, marcas o WhatsApp | Operativo local |
| `COMPARTIR` | Abre selección de perfil/código, datos actuales, última ronda o últimas tres rondas | Proyecto visual |
| Autorización y envío | Correo/WhatsApp para compartir entre usuarios | No disponible |
| Persistencia central | Migración de código, dato vigente e historial | Preparada, no aplicada |

## Archivos responsables

| Archivo | Responsabilidad |
|---|---|
| `index-grupal.html` | Retícula, validación manual, dictado visible, recuperación por código y panel de proyecto |
| `player-registry.js` | Código estable, dato vigente, recuperación e historial append-only local |
| `database/002_player_profiles_and_history.sql` | Modelo central preparado para código, último perfil e historial |
| `test-player-registry.js` | Pruebas de código, actualización e historial |
| `database/test-player-profile-schema.mjs` | Candados de la migración central |
| `test-v255-player-registration-boxes-codes.mjs` | Candado integral de interfaz y alcance V255 |
| `audit-project.mjs` | Auditoría maestra de 25 paquetes |

## Límite obligatorio

La palabra `COMPARTIR` no significa que exista transmisión en V255. El panel sólo permite visualizar y marcar el futuro alcance; la acción final está deshabilitada. La base central tampoco debe anunciarse como activa hasta aplicar la migración, habilitar autenticación y superar la prueba multi-dispositivo.
