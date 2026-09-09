import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const mobileBuilder=fs.readFileSync(new URL("./scripts/build-mobile-web.mjs",import.meta.url),"utf8");
const expected='<a class="live-support-link" href="/manual.pdf" aria-label="Abrir el Manual de Golf Score Card GT en esta pantalla">Support</a>';

assert.equal(html.split('class="live-support-link"').length-1,1,"Debe existir un solo enlace Support global");
assert.ok(html.includes(expected),"Support debe abrir el PDF exacto en la misma pantalla");
assert.ok(!/<a class="live-support-link"[^>]*target="_blank"/.test(html),"Support no puede usar target=_blank en iPhone/PWA");
assert.ok(!html.includes('href="https://epg-caddy.vercel.app/manual-scg"'),"Preview nunca debe escapar al Manual de Producción");
assert.ok(html.indexOf(expected)>html.indexOf('<main class="app">'),"Support debe vivir en la barra estructural de la ronda");
assert.match(html,/<nav class="round-utility-bar" id="roundUtilityBar"[\s\S]*class="live-support-link"/,"Support debe estar dentro de la barra de herramientas");
assert.match(html,/\.round-utility-bar \.gsc-live-launch,[^}]*\.round-utility-bar \.live-support-link\{position:static!important;/,"Support y LIVE no deben flotar sobre el encabezado");
assert.match(mobileBuilder,/readFile\(path\.join\(root,"index-grupal\.html"\),"utf8"\)/,"El paquete nativo debe heredar el mismo Support vivo");

console.log("PASS V406-R4 · Support integrado en barra estructural y conectado al Manual vivo");
