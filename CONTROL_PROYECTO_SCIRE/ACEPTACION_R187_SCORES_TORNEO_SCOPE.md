# R187 · Scores Torneo ligado a la Score Card activa

Fecha: 7 de octubre de 2026, Guatemala.
Base efectiva: R185 `f8051e2e68e63e53ef82cdd2f30fd162e89dbb6a`, hija directa de R184; se conserva la actualización de administración y retorno.  
Estado: candidato local aislado; sincronización canónica, Preview y navegador publicado pendientes. Producción permanece intacta.

## Alcance

`SCORES TORNEO` abre exclusivamente el torneo al que pertenece la Score Card activa y muestra los jugadores de ese evento. El menú no abre ni usa el directorio global para llenar esa vista. Sin torneo asociado, comunica que no hay torneo asignado.

Administración de grupos y torneos conserva el directorio global de torneos activos de LAB y Producción, sin filtros por campo, ubicación o modalidad ni límites artificiales. Cada evento mantiene General, Categorías, código e ingreso a eliminación; el servidor conserva la autorización existente para compartir y borrar.

## Aceptación medible

1. Desde una Score Card vinculada, el atajo SCORES TORNEO publica la tarjeta por el escritor oficial y abre el mismo ID de torneo asociado a esa tarjeta.
2. La vista carga únicamente streams vinculados a ese ID; jugadores de otro torneo no aparecen.
3. Desde una tarjeta sin torneo asignado, SCORES TORNEO no abre el listado general ni permite ver eventos ajenos.
4. Las rutas antiguas `directory=1` se envían a Administración; un Hub abierto sin torneo/importación regresa a la Score Card en vez de presentar el catálogo.
5. El acceso desde otra pantalla vuelve primero a la Score Card local activa y abre su torneo asignado.
6. Administración combina torneos activos de ambos ambientes, conserva identidad por origen + tipo + ID, y muestra General, Categorías, código y control de eliminación en cada tarjeta. Los permisos de código y eliminación siguen siendo validados por el servidor.
7. Una respuesta incompleta de un ambiente se identifica como lista incompleta y no se presenta como 100% completa.
8. Pruebas de control: `test-lab-shortcuts-navigation.mjs`, `test-scores-tournament-recovery.mjs`, `test-r163-cross-environment-tournament-scores.mjs`, `test-r178-global-tournament-ids.mjs`, `test-r181-global-groups-directory.mjs` y `test-event-administration.mjs`.

## Riesgos y reversión

- Una Score Card sin membresía válida no debe acceder al roster privado; la API existente vuelve a validar el evento y la membresía.
- El directorio administrativo depende de ambos ambientes. Si falla uno, se conserva la lista conocida y se marca incompleta.
- Reversión de código: R184 `b12cfeb06a0e1c675d2e84dc5fb309a1f443a970`. No se borran ni migran datos de torneos.
