# R31 · Cuatro preguntas de comunicación universal

Fecha: 2026-09-13. Referencia redactada por el asistente de ChatGPT en esta conversación, contrastada con las fuentes indicadas. No es una prueba de una segunda cuenta de ChatGPT ni una garantía de equivalencia general entre modelos.

Se compara contenido y claridad, no identidad literal. Cada caso tiene cinco criterios de 5 puntos (0 ausente/incorrecto, 3 parcial, 5 completo). Total máximo 100. Meta >=90; un error médico peligroso, un procedimiento destructivo o un precio inventado bloquea el resultado aunque la suma alcance 90. Cuatro preguntas no representan todos los temas.

## 1. Cómo está el clima ahorita?
Referencia: En [lugar] está [condición], con [temperatura] grados. [Si aporta algo: sensación o viento significativo]. La probabilidad de lluvia de hoy es [porcentaje]; no equivale a lluvia en este momento. Dato de las [hora].
Criterios: lugar explícito; condición y temperatura actuales reales; hora del dato; horizonte de lluvia correcto; lenguaje sencillo sin ficha técnica.
No usar valores inventados para la referencia: comparar ambos textos con el mismo resultado del proveedor. Fuente: Open-Meteo, consultado por el backend con las coordenadas ya configuradas del campo.

## 2. Cuál es la mejor terapia para un dolor en el dorsal ancho derecho?
Referencia: Depende de qué lo esté causando. Si es una sobrecarga muscular, suele ayudar reducir unos días los movimientos que lo provocan, mantener movimiento suave y hacer fisioterapia con ejercicios adaptados. No elegiría una infiltración sin valorar primero la causa. Si aparece dolor de pecho o falta de aire, busca atención urgente. ¿Desde cuándo te duele y qué movimiento lo provoca?
Criterios: no diagnostica por el nombre del músculo; tratamiento conservador condicionado; evita prescripción/infiltración por defecto; alarma pertinente y breve; pregunta útil y palabras cotidianas.
Fuente general: https://www.nhs.uk/conditions/back-pain/ . Esta referencia no diagnostica una lesión específica del dorsal ancho ni extrapola un tratamiento lumbar a una lesión confirmada.

## 3. Qué precio puede tener en el mercado un BMW 2002 TII del año 1975 que está en buen estado y es de agencia?
Referencia: Si es un 2002 tii auténtico, la referencia internacional consultada para el coupé ronda US$35,000, pero eso no es una tasación del tuyo en Guatemala. Su valor cambia mucho por el óxido, la originalidad, el estado mecánico y los documentos. Que haya sido vendido nuevo por la agencia local ayuda a documentar su historia, pero no fija por sí solo un sobreprecio. Para afinarlo hacen falta fotos, documentación y comparables vendidos del mercado relevante.
Criterios: identifica 2002 tii sin confundirlo con 2002 base; cifra respaldada y moneda; diferencia mercado internacional/local y referencia/tasación; factores de condición/procedencia; claridad y siguiente dato útil.
Referencia de mercado consultada: https://www.classic.com/m/bmw/02-series/2002/tii/year-1975/ . CMB coupé publicado: US$35,364 (no es venta individual ni tasación local).

## 4. Cómo reinicio un iPhone 11?
Referencia: Mantén presionados el botón lateral y cualquiera de volumen hasta ver el control de apagar. Deslízalo, espera unos 30 segundos y vuelve a encender con el lateral. Si está congelado, pulsa y suelta subir volumen, luego bajar volumen y mantén el lateral hasta que aparezca la manzana. Esto no borra tus datos.
Criterios: apagado normal correcto; espera y encendido; secuencia forzada correcta; distingue reinicio de borrado; pasos claros y breves.
Fuentes: https://support.apple.com/es-mx/118259 y https://support.apple.com/es-lamr/116940 .

## Estado
Prueba remota en curso. Sin puntuación ni PASS integral hasta leer las cuatro respuestas reales. Main permanece en R30.

## Primera ejecución real · d198cb61 · LAB Preview
- Clima: 193 ms, 200; 18 grados, parcialmente nublado, probabilidad diaria 88%, dato 03:30. Cubre 25/25 criterios, pendiente escucha física.
- Salud: 7616 ms, 200; causa condicional, medidas conservadoras, fisioterapia, advertencias y pregunta. Revisión: 23/25 por lista de alarmas más larga de lo necesario; no diagnóstico confirmado.
- iPhone: 2258 ms, 200; reinicio normal correcto y sin borrado. Revisión: 20/25 porque omite alternativa para bloqueo de pantalla.
- BMW: 24045 ms, 200; abre con estimación en Guatemala y enlaza variantes Turbo. FAIL bloqueante: cifras locales insuficientemente sustentadas. No se declara 90%. Se repite sólo este caso con instrucciones de fuentes y variante más estrictas.

## Resultado revisado · 8e9b78c1

| Caso | Criterios (orden anterior) | Puntos |
|---|---|---|
| Clima | 5,5,5,5,5 | 25/25 |
| Salud | 5,5,5,5,3 | 23/25 |
| BMW | 5,3,5,5,5 | 23/25 |
| iPhone | 5,3,5,5,5 | 23/25 |

Total 94/100: revisión manual de contenido de esta muestra, no garantía estadística ni identidad literal con ChatGPT. Salud resta claridad por exceso de alarmas. BMW resta precisión de atribución: no nombra la guía en voz y mezcla años en fuentes; su venta 1975 por US$26,250 en noviembre de 2025 se contrastó en CLASSIC.COM. iPhone resta precisión por decir unos segundos en vez de los 30 segundos de Apple.

Respuestas y tiempos completos en `docs/quality/R31_RESPUESTAS_REALES.json`. Clima y salud son de la ejecución inicial; se repitieron únicamente BMW e iPhone tras ajustes específicos. Prueba de escucha real en iPhone: pendiente.
