# Mapa matriz — Base maestra V256

| Rubro | Dato vigente | Historial que no se sobrescribe |
|---|---|---|
| Jugador | `players` | `player_profile_events` |
| Handicap | `players.current_handicap` | `player_handicap_events` |
| Marcas | `players.current_tee_key` | `player_tee_events` |
| WhatsApp/correo | `player_contacts` | `player_contact_events` |
| Campo/yardajes | `golf_courses.definition` | `course_definition_events` |
| Torneo | `tournaments` | rondas y snapshots asociados |
| Ronda | `rounds` | `round_snapshots` y `round_lifecycle_events` |
| Participantes | `round_players` | snapshots de ronda |
| Jugada por hoyo | `hole_scores` | `score_events` |
| Tarjeta oficial | `card_records` / `card_artifacts` | versión y snapshot oficial |
| Compartir | estado actual en UI | `share_events` |
| Entrega por proveedor | `deliveries` | intentos y estados idempotentes |
| Consentimiento | último evento aplicable | `consent_events` |
| Transporte | `sync_mutations.result` | paquete original, hash y fechas |

## Regla de actualización de jugador

1. Se busca primero el código `GXXXXXX`.
2. Si existe, se actualiza ese mismo jugador; no se crea un duplicado aunque cambie el nombre.
3. El registro recibido queda como vigente.
4. La versión anterior permanece en las tablas históricas.
5. Una nueva ronda recupera únicamente el dato vigente más reciente.

## Candados

- Máximo seis jugadores por ronda.
- Mutaciones con SHA-256 e identificador idempotente.
- Una mutación se aplica completa dentro de PostgreSQL o no se aplica.
- Una ronda oficialmente cerrada conserva snapshot y hash.
- Los secretos viven únicamente en el servidor.
- `PREPARED` en compartir no equivale a mensaje entregado.
