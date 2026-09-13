import json
from pathlib import Path
from html import escape

root = Path(__file__).resolve().parents[1]
report = json.loads((root / 'docs/quality/ENGINE_100_COMPARISON.json').read_text())
out = ['<!doctype html><html lang="es"><meta charset="utf-8"><title>100 pruebas del motor · R34</title><style>body{font:16px system-ui;margin:2rem;line-height:1.5;color:#17202a}table{border-collapse:collapse;width:100%}td,th{border:1px solid #bbc;padding:10px;text-align:left;vertical-align:top}th{background:#eef;position:sticky;top:0}td:nth-child(2),td:nth-child(3){min-width:280px;white-space:pre-wrap}small{display:block}section{overflow:auto}.fail{color:#a00}caption{text-align:left;font-weight:bold;margin:1rem 0}</style><h1>100 pruebas reales del motor R34</h1><p class="fail"><strong>ACEPTACIÓN COMPLETA: FAIL — NO PUBLICAR</strong></p>']
out.append('<p>'+escape(report['rubric'])+'</p>')
out.append('<p>Motor: 100/100 respuestas HTTP correctas. Mediana 3.327 s; P95 8.148 s; máximo 17.879 s. Esta ejecución no incluye reconocimiento ni reproducción. No certifica 90% de equivalencia global ni reducción del tiempo hablado al 40% de R34.</p>')
out.append('<p>Referencias obtenidas en ChatGPT web; juicio editorial de Codex, no evaluación ciega independiente. Referencias 008 y 025 contienen errores: coincidencia de respuestas incorrectas nunca cuenta como aprobación.</p>')
out.append('<section><table><caption>Respuestas completas y evaluación individual</caption><thead><tr><th>Prueba</th><th>Aplicación</th><th>ChatGPT</th><th>Evaluación</th></tr></thead><tbody>')
for row in report['cases']:
    criteria = '; '.join(f'{k}: {v if v is not None else "N/A"}' for k,v in row['criterios'].items())
    out.append('<tr><td><strong>'+escape(row['id'])+'</strong><p>'+escape(row['pregunta'])+'</p></td><td>'+escape(row['respuestaAplicacion'])+'</td><td>'+escape(row['respuestaChatGPT'])+'</td><td><strong>'+escape(row['comparacionEditorial'])+'</strong><p>'+escape(row['nota'])+'</p><small>'+escape(criteria)+'</small><p>Calificación editorial: '+str(row['scorePercent'])+'%. Motor: '+str(row['latenciaMotorMs'])+' ms.</p><strong>Flujo completo: FAIL / no probado</strong></td></tr>')
out.append('</tbody></table></section></html>')
target=root/'docs/quality/ENGINE_100_COMPARISON.html'
target.write_text('\n'.join(out))
assert len(report['cases']) == 100
assert all(x['respuestaAplicacion'] and x['respuestaChatGPT'] for x in report['cases'])
print('PASS: 100 filas, 200 respuestas completas; límites y fallo de aceptación visibles.')
