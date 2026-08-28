# Objetivos internos de servicio — V354

Estos objetivos sirven para operación y no constituyen garantía contractual:

| Indicador | Objetivo provisional | Ventana | Fuente requerida |
|---|---:|---:|---|
| Disponibilidad de tarjeta web | 99.5% | 30 días | monitor externo |
| Éxito de API propia | 99.0% | 30 días | logs/métricas Vercel |
| Latencia p95 API propia sin proveedor | < 1.5 s | 7 días | trazas |
| Restauración verificable | RTO 4 h / RPO 24 h | por ensayo | acta de restore drill |
| Error de integridad de score confirmado | 0 tolerado | continuo | pruebas + incidentes |

Alertas, presupuesto de error, guardias, escalación y página de estado necesitan responsables nominales antes de una oferta comercial.
