# Batería real de calibre · AI UNIVERSAL ∞ V356

**Fecha y hora:** 28 de agosto de 2026, 11:31–11:35, Guatemala.  
**Preview:** `dpl_5pvjUjCc1Vhm1WmeGzASacGQZSsN` · commit `daa00a0690977bad75e4ab792cf13e35a8997568`.  
**Criterio ChatGPT:** respuesta directa, mecanismo, exactitud/evidencia, límites, riesgos/alternativas y recomendación accionable.  
**Resultado general:** `FAIL`.

## Resultados reproducibles

| Área | Pregunta probada | Resultado del Caddie | Calibre /10 |
|---|---|---|---:|
| Ciencia | Vuelo de un avión; Bernoulli frente a explicación completa | Servicio sin saldo; cero respuesta sustantiva | 0.0 |
| Arquitectura | Enfriamiento pasivo tropical, ventilación, sombra, masa y condensación | Servicio sin saldo; cero respuesta sustantiva | 0.0 |
| Historia | Crisis financiera de 2008; detonantes y causas estructurales | Servicio sin saldo; cero respuesta sustantiva | 0.0 |
| Economía | Inflación de demanda/costos y efecto de tasas | Servicio sin saldo; cero respuesta sustantiva | 0.0 |
| Tecnología | IA en diagnóstico médico; beneficios, riesgos y controles | Servicio sin saldo; cero respuesta sustantiva | 0.0 |
| Salud | Saturación 84%; prioridad, errores, alarma y conducta segura | Servicio sin saldo; cero respuesta sustantiva | 0.0 |
| Legal | Incumplimiento contractual frente a fraude | Servicio sin saldo; cero respuesta sustantiva | 0.0 |
| Actualidad | Presidente de Guatemala y dos hechos recientes con fuentes | Servicio sin saldo; cero respuesta sustantiva | 0.0 |
| Golf | 140 yardas, viento frontal, agua corta y lie húmedo | Respuesta local profunda; faltó comparar dos palos específicos | 8.5 |

**Disponibilidad general:** 0/8 = 0%.  
**Disponibilidad total incluyendo el respaldo local de golf:** 1/9 = 11.11%.  
**Umbral exigido:** ≥90%.  
**Veredicto:** AI UNIVERSAL general no es confiable ni aprobable en este Preview.

## Evidencia de causa

Vercel Runtime Logs registró ocho `POST /api/universal-ai 503`. Cada consulta intentó `gpt-5.6`, `gpt-5.4` y nuevamente `gpt-5.6`; OpenAI devolvió `429 credit_balance_exhausted`. No apareció ningún evento `gateway fallback`, señal coherente con ausencia de una credencial utilizable `AI_GATEWAY_API_KEY` o `VERCEL_OIDC_TOKEN` en este deployment. El `200` de Golf corresponde al respaldo local `LOCAL_GOLF_STRATEGY`, no a AI UNIVERSAL general.

## Control obligatorio

No volver a declarar AI UNIVERSAL aprobada por bancos simulados. Para PASS se requiere proveedor con saldo o AI Gateway operativo y repetir esta misma batería viva: mínimo 9/10 respuestas sustantivas, sin 503, con promedio ≥8.5/10 y fuentes fechadas en consultas cambiantes. Producción permanece intacta.
