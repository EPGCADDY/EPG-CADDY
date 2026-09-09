import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const mobileBuilder=fs.readFileSync(new URL("./scripts/build-mobile-web.mjs",import.meta.url),"utf8");
const vercel=JSON.parse(fs.readFileSync(new URL("./vercel.json",import.meta.url),"utf8"));
const expected='<a class="live-support-link" href="/manual.pdf" aria-label="Abrir el Manual de Usuario de Golf Score Card GT en esta pantalla">Support</a>';

assert.equal(html.split('class="live-support-link"').length-1,1,"Debe existir un solo enlace Support global");
assert.ok(html.includes(expected),"Support debe abrir el Manual LAB corregido en la misma pantalla");
assert.ok(!html.includes('href="https://epg-caddy.vercel.app/manual-scg"'),"Preview nunca debe escapar al Manual de Producción");
assert.ok(html.indexOf(expected)>html.indexOf('<main class="app">'),"Support debe vivir en la barra estructural de la ronda");
assert.ok(vercel.redirects.some(item=>item.source==="/manual.pdf"&&item.destination.includes("raw.githubusercontent.com/EPGCADDY/EPG-CADDY/d0c6072f83b2e94ded420e58f60f233ca29b2b8a/")),"La ruta Support debe abrir el PDF LAB corregido e inmutable");
assert.ok(!vercel.redirects.some(item=>item.source==="/manual.pdf"&&item.destination.includes("epg-caddy.vercel.app")),"Support no debe redirigir al dominio del Manual viejo");
assert.match(html,/<nav class="round-utility-bar" id="roundUtilityBar"[\s\S]*class="live-support-link"/,"Support debe estar dentro de la barra de herramientas");
assert.match(html,/\.round-utility-bar \.gsc-live-launch,[^}]*\.round-utility-bar \.live-support-link\{position:static!important;/,"Support y LIVE no deben flotar sobre el encabezado");
assert.match(mobileBuilder,/readFile\(path\.join\(root,"index-grupal\.html"\),"utf8"\)/,"El paquete nativo debe heredar el mismo Support vivo");

console.log("PASS V406-R4 · Support integrado en barra estructural y conectado al Manual vivo");
