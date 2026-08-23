import assert from "node:assert/strict";
import fs from "node:fs";

const root=new URL("./CONTROL_PROYECTO_SCIRE/",import.meta.url);
const required=[
  "README.md",
  "01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/DIRECTRICES_MANDATORIAS.md",
  "02_DOCUMENTOS_IMPORTANTES_PENDIENTES_DE_UTILIZAR/INDICE_DOCUMENTOS_PENDIENTES.md",
  "03_CASOS_TERMINADOS_Y_EVIDENCIA/CASOS_TERMINADOS.md",
  "04_MATRIZ_DE_CAMPOS/INDICE_TARJETAS_ORIGINALES.md",
  "04_MATRIZ_DE_CAMPOS/course-source-registry.json",
  "05_MATRIZ_DE_ENLACES/ENLACES_OPERATIVOS.md"
];
for(const file of required)assert.ok(fs.existsSync(new URL(file,root)),`Falta ${file}`);

const registry=JSON.parse(fs.readFileSync(new URL("04_MATRIZ_DE_CAMPOS/course-source-registry.json",root),"utf8"));
assert.equal(registry.courses.length,7);
assert.equal(registry.rules.neverRequestReceivedSourceAgain,true);
assert.equal(registry.rules.preserveOriginalBytes,true);
for(const key of ["pulte","country_club","mayan_golf","hacienda_nueva","alta_vista","san_isidro"]){
  const item=registry.courses.find(course=>course.courseKey===key);
  assert.ok(item?.masterLibraryFileId?.startsWith("libfile_"),`Falta fuente maestra ${key}`);
  assert.ok(item.archivedOriginalCount>=1,`Falta fotografía original ${key}`);
  assert.equal(item.sourceStatus,"archived");
}
assert.equal(registry.courses.find(course=>course.courseKey==="la_reunion")?.sourceStatus,"internal-inventory-pending");
const links=fs.readFileSync(new URL("05_MATRIZ_DE_ENLACES/ENLACES_OPERATIVOS.md",root),"utf8");
assert.match(links,/ENTRADA OFICIAL ÚNICA[\s\S]*https:\/\/golf-score-card-gt\.vercel\.app\//);
assert.match(links,/MODALIDADES[\s\S]*stableford_emergency=countryclub/);
assert.match(links,/una sola entrada para Registro, General y Stableford/);
assert.match(links,/nunca abandona el alojamiento actual ni abre una rama histórica/);
console.log("PASS control de proyecto · fuentes originales, cola y política de no reiteración");
