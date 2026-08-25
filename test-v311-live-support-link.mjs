import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const mobileBuilder=fs.readFileSync(new URL("./scripts/build-mobile-web.mjs",import.meta.url),"utf8");
const expected='<a class="live-support-link" href="https://epg-caddy.vercel.app/manual-scg" target="_blank" rel="noopener noreferrer" aria-label="Abrir el Manual vivo de Golf Score Card GT">Support</a>';

assert.equal(html.split('class="live-support-link"').length-1,1,"Debe existir un solo enlace Support global");
assert.ok(html.includes(expected),"Support debe abrir el Manual vivo exacto en otra pestaña");
assert.ok(html.indexOf(expected)<html.indexOf('<main class="app">'),"Support debe vivir fuera de la pantalla principal para sobrevivir a todas las vistas");
assert.match(html,/\.live-support-link\{position:fixed;[^}]*z-index:11000;[^}]*font:800 8px\/1/,"Support debe ser fijo, pequeño y superior a todas las ventanas");
assert.match(html,/@media\(max-width:800px\)\{\.live-support-link\{[^}]*font-size:7px/,"Support debe conservar tamaño mínimo en teléfono");
assert.match(mobileBuilder,/readFile\(path\.join\(root,"index-grupal\.html"\),"utf8"\)/,"El paquete nativo debe heredar el mismo Support vivo");

console.log("PASS V311 · Support pequeño, fijo y conectado al Manual vivo en todas las pantallas");
