# Matriz obligatoria de enlaces

## ENTRADA OFICIAL ÚNICA

- Nombre: `Golf Score Card GT`.
- Ruta definitiva planificada: `https://golf-score-card-gt.vercel.app/`.
- Estado: pendiente de publicación y comprobación en navegador real; no compartir como definitiva antes de completar esa puerta.
- Propósito: una sola entrada para Registro, General y Stableford.
- Archivo operativo único: `index-grupal.html`.

## MODALIDADES

- General y Stableford se seleccionan dentro de la misma tarjeta oficial.
- Stableford usa la ruta interna `/index-grupal.html?stableford_emergency=countryclub&emergency_clean=1&v=272`; nunca abandona el alojamiento actual ni abre una rama histórica.
- Ambas modalidades comparten navegación, validación, entrada manual/voz, guardado, render y cierre.
- La persistencia filtra explícitamente la modalidad para no mezclar rondas ni jugadores.

## Control antes de compartir

1. Abrir el enlace en navegador móvil.
2. Confirmar la URL final después de cualquier redirección.
3. General debe mostrar la modalidad General aunque exista una ronda Stableford guardada anteriormente.
4. Stableford debe mostrar `RONDA STABLEFORD` o recuperar exclusivamente su propia ronda activa.
5. Verificar que `/`, `/index.html` y `/stableford-torneo.html` terminan en la tarjeta oficial integrada.
6. No enviar enlaces de preview como enlace definitivo.
