# Comparación real de preguntas abiertas · 13 de septiembre de 2026

**Resultado: el servidor respondió las nueve preguntas en las dos ejecuciones. Esto no aprueba todavía la conversación por voz en iPhone.**

Se ejecutaron los mismos manejadores de R31 en Preview de los proyectos Main y LAB, sin cambiar el modelo, las instrucciones, el reconocimiento ni el reproductor. Base: `8bcba839885dda559725a23ce2e368534c7efc67`. Prueba: `0529d6ba47eeae9af80d43bfb97602800221494e`.

Las referencias son respuestas elaboradas por este asistente de ChatGPT antes de recibir los resultados, verificadas con las fuentes citadas. No se abrió otra sesión de ChatGPT. No se mide semejanza literal ni se afirma 90 % de equivalencia general.

| Pregunta | Respuesta real de la app, resumida | Referencia de ChatGPT / comparación |
|---|---|---|
| Retinol en crema facial | Mejora gradual de líneas, manchas y textura; empezar despacio, hidratar y proteger del sol. | Coincide en lo esencial. PASS de contenido. |
| ¿Y si me arde después de ponérmela? | Reconoce el retinol y recomienda suspender ante irritación, hidratante suave y atención si es intensa. | Conserva el contexto. PASS. |
| Hidratar cincho rajado | Acondicionador específico; no desaparecen las grietas profundas. | Main coincide. LAB omite prueba oculta y puede dar a entender que acondicionar ayuda a cuero sintético pelado. Mejorable. |
| ¿Y si se pela como plástico? | Reconoce cuero sintético o recubrimiento; hidratar no vuelve a pegar la capa. Sugiere reparador flexible. | Comprende la repregunta, pero recomienda reparación antes de confirmar material y compatibilidad. No doy PASS completo al consejo. |
| Cada cuánto retoñan las orquídeas | Dice que depende de especie, pero añade uno o dos ciclos de crecimiento al año. | Debe aclarar flores frente a brotes y no generalizar ese calendario para orquídeas no identificadas. FAIL de precisión. |
| Hojas verdes, un año sin flores | Revisar luz, raíces, riego y noches frescas si es Phalaenopsis. | Coincide en lo principal. LAB se apoya demasiado en el color de raíces para decidir riego sin confirmar especie/sustrato. |
| Moneda: cinco caras seguidas | La siguiente tirada sigue siendo 50/50 si es justa e independiente. | Coincide. PASS. |
| Baja 20 % y sube 20 % desde 100 | 100 → 80 → 96. | Coincide exactamente con el cálculo. PASS. |
| Dos mareas altas con una Luna | Dos zonas opuestas de agua más alta y giro terrestre. | Idea central correcta, pero “cada lugar/costa” es demasiado absoluto y la explicación del segundo lado queda vaga. Debe decir muchas costas y explicar atracción desigual. Mejorable. |

## Evidencia de ejecución

- Main Preview: `dpl_FphTKnxn1KUiJdWfrpZR5qrkoUKW`: 9/9 respuestas HTTP 200; entre 3.884 y 9.024 segundos por respuesta.
- LAB Preview: `dpl_9yGn2RER8uXbXpN6W51r8FswDwn1`: 9/9 respuestas HTTP 200; entre 1.506 y 5.074 segundos.
- Retinol, cincho y orquídeas generaron audio HTTP 200 en ambos entornos: 6/6. Tamaños entre 318901 y 514506 bytes.
- Esos archivos se generaron en servidor; no se conservaron ni escucharon. No prueban comprensión de voz ni reproducción física.
- Las repreguntas recibieron la pregunta y respuesta anterior en el historial. Se comprobaron tres conversaciones de dos turnos, no una conversación continua de nueve turnos ni una prueba de micrófono.
- Respuestas íntegras, tiempos, fuentes, referencias y criterios: `docs/quality/PREGUNTAS_ABIERTAS_RESPUESTAS_REALES.json`.

## Fallos concretos distintos de “vocabulario pobre”

1. **Filtro de la pantalla de registro:** `isGeneralConversationIntent` devuelve falso para “Cada cuanto retoñen, las orquídeas en maceta” y las repreguntas “¿Y si…?”. `processBrowserVoiceTranscript`, si no reconoce registro de jugadores, rechaza esas frases como listado incorrecto antes de llamar a la IA. Reproducido con las funciones extraídas del HTML; el parser de registro se sustituyó por un resultado negativo. Es un fallo del despacho en contexto setup, no prueba de que ocurra lo mismo en una ronda activa.
2. **Conexión directa sin saldo en Main Preview:** las consultas registraron HTTP 429 `credit_balance_exhausted` y tres intentos previos a recurrir al gateway. El gateway sí obtuvo respuestas. No prueba falta de saldo en todos los entornos ni explica por sí solo todo silencio físico.
3. **Resultado escrito y audio se tratan por separado:** `submitAiUniversalText` devuelve true después de llamar a `speakAiUniversalText` sin propagar su false. Por tanto, “query_answered” no prueba que se oyó la respuesta. Es un punto pendiente de corrección, no un arreglo aplicado aquí.
4. **Límite de la evaluación anterior:** preguntas escritas exitosas no prueban los turnos de micrófono, filtros de entrada, permisos ni altavoz del iPhone.

La evidencia descarta una lista de sólo preguntas ABC en el servidor para estos nueve casos, pero confirma que la aplicación puede bloquear preguntas antes de enviarlas. No se justifica “alimentar un vocabulario infinito” como solución: hay que corregir despacho, tratar fallos de voz y evaluar contenido sin confundirlos.

## Fuentes de la referencia

- Retinol y cuidado gradual: [Academia Americana de Dermatología](https://www.aad.org/public/everyday-care/skin-care-secrets/anti-aging/retinoid-retinol) y [Cleveland Clinic](https://my.clevelandclinic.org/health/treatments/23293-retinol).
- Cuero: [guía del fabricante Leather Honey](https://www.leatherhoney.com/blogs/leather-care/six-leather-restoration-tips). Es una fuente comercial para uso/limitaciones del producto, no evidencia independiente de todos los materiales.
- Orquídeas: [RHS, Phalaenopsis](https://www.rhs.org.uk/plants/phalaenopsis/growing-guide) y [American Orchid Society](https://www.aos.org/orchid-care/care-sheets/phalaenopsis-culture-sheet).
- Mareas: [NOAA, dos abultamientos](https://oceanservice.noaa.gov/education/tutorial_tides/tides03_gravity.html) y [NOAA, distintos ciclos costeros](https://oceanservice.noaa.gov/education/tutorial_tides/tides07_cycles.html).
- Probabilidad y porcentajes: deducción matemática explícita; no requieren datos de mercado ni consulta externa.

## Estado de entrega

Comparación completada y conservada. Producción no modificada por esta prueba. No se entrega una nueva versión ni se afirma que el silencio del iPhone esté solucionado. Corrección técnica pendiente: filtro setup y comunicación explícita de fallo de reproducción. No hace falta que el propietario repita preguntas para acreditar los hallazgos anteriores.

