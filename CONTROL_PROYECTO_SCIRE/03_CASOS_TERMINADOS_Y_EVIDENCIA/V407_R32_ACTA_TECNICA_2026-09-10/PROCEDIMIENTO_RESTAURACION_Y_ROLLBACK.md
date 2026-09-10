# Procedimiento de restauración y rollback - V407-R32

## Alcance

Este procedimiento recupera el árbol técnico examinado en el acta `ATV-R32-20260910-01`. No autoriza promoverlo a Producción/Maestro.

## Referencias inmutables

- Commit remoto R32 revisado: `a4b1cec9e1380d8a5b72080477cad97080ab0cce`.
- Deployment LAB promovido revisado: `dpl_G97hXzJbV9duYHLn8SGREJWRgUHq`, READY, target `production`, alias `https://golf-sc-gt-lab.vercel.app`.
- Producción observada e intacta: R28, `7816978be8aa23aba20f4c066fce30f6287ff134`.
- Paquete recuperable: `EPG_CADDY_R32_TREE_RECUPERABLE.tar.gz`.
- Huellas: `SHA256SUMS.txt`.

## Restauración reproducible

1. Verificar el SHA-256 del paquete contra `SHA256SUMS.txt`.
2. Extraer el paquete en un directorio vacío de recuperación.
3. Ejecutar `npm install` con el lockfile versionado.
4. Ejecutar `node audit-project.mjs` y exigir `PASS auditoría maestra: 139 paquetes`.
5. Desplegar únicamente como Preview/LAB y registrar commit, deployment y URL exactos.
6. Repetir las puertas de navegador real y dispositivo físico aplicables. No llamar física a una emulación.
7. Rechazar la restauración si un elemento congelado PASS cambia o si aparece cualquier FAIL.

## Rollback operativo

1. Mantener Producción/Maestro en el deployment y commit anteriores hasta cero FAIL y autorización expresa del propietario.
2. En LAB, reasignar el alias únicamente al deployment previo conocido y READY.
3. Verificar que el alias resuelva al commit esperado antes de comunicar el enlace.
4. No eliminar ronda, Historial, jugadores, scores, WhatsApp ni almacenamiento del propietario.
5. Registrar el rollback como nueva entrada de trazabilidad; nunca reescribir esta acta.

## Límite

No existe congelamiento integral estable de R32 mientras permanezcan FAIL, BLOQUEADO o NO PROBADO. Sólo los elementos individuales PASS forman la base protegida.
