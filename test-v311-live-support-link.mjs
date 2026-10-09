import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const mobileBuilder=fs.readFileSync(new URL("./scripts/build-mobile-web.mjs",import.meta.url),"utf8");
const serviceWorker=fs.readFileSync(new URL("./service-worker.js",import.meta.url),"utf8");
const expected='<a class="live-support-link" href="/manual" aria-label="Abrir Guía de Usuario de Golf Score Card GT">GUÍA DE USUARIO</a>';

assert.equal(html.split('class="live-support-link"').length-1,1,"Debe existir un solo enlace Support global");
assert.ok(html.includes(expected),"Support debe abrir el PDF exacto en la misma pantalla");
assert.ok(!/<a class="live-support-link"[^>]*target="_blank"/.test(html),"Support no puede usar target=_blank en iPhone/PWA");
assert.ok(!html.includes('href="https://epg-caddy.vercel.app/manual-scg"'),"Preview nunca debe escapar al Manual de Producción");
assert.ok(html.indexOf(expected)>html.indexOf('<main class="app">'),"La guía debe vivir en la barra estructural de la ronda");
assert.match(html,/<nav class="round-utility-bar" id="roundUtilityBar"[\s\S]*class="live-support-link"/,"La guía debe estar dentro de la barra de herramientas");
assert.match(html,/\.round-utility-bar \.gsc-live-launch,[^}]*\.live-support-link\{position:static!important;/,"La guía y LIVE no deben flotar sobre el encabezado");
assert.doesNotMatch(html,/ownerShare24h|ownerTrialReport|INVITAR · 24 H|PRUEBA · 48 H|VER PRUEBA 48 H/,"La barra pública no debe contener controles propietarios temporales");
assert.doesNotMatch(html,/src="\.\/auth-gate\.js"/,"La aplicación no monta el candado global de cuenta");
assert.match(mobileBuilder,/readFile\(path\.join\(root,"index-grupal\.html"\),"utf8"\)/,"El paquete nativo debe heredar el mismo Support vivo");
assert.match(serviceWorker,/url\.pathname==="\/manual\.pdf"\|\|url\.pathname==="\/manual\.html"[\s\S]*fetch\("\/manual\.html\?__gscg_build_check=1"/,"Support debe evitar que la navegación PWA regrese silenciosamente a la Score Card");

console.log("PASS · Guía integrada en barra estructural y conectada al manual vigente");
