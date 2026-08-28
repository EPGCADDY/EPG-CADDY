# Protección obligatoria del repositorio

Antes de una publicación comercial, un administrador GitHub debe adjuntar evidencia de una ruleset activa para `main` que:

- impida push directo, force-push, borrado y cambios sin pull request;
- exija al menos una revisión independiente y resolución de conversaciones;
- exija firmas de commits o mecanismo equivalente verificable;
- exija ROADMAP/auditoría maestra y CodeQL sobre el commit exacto;
- restrinja bypass a responsables nominales y registre cada excepción.

Los workflows usan acciones fijadas por SHA, dependencias con lockfile, Dependabot y CodeQL. Eso no sustituye la ruleset remota; `repository_protection` debe permanecer pendiente hasta comprobarla por API/captura firmada.
