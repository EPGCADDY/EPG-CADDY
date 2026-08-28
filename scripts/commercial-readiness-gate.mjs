import { existsSync, readFileSync } from "node:fs";

const controlPath = "COMMERCIAL_RELEASE_CONTROL.json";
const requiredFiles = [
  "LICENSE",
  "SECURITY.md",
  "THIRD_PARTY_NOTICES.md",
  "sbom.cdx.json",
  "LEGAL/TERMINOS_DE_USO_BORRADOR.md",
  "LEGAL/POLITICA_DE_PRIVACIDAD_BORRADOR.md",
  "LEGAL/AVISO_VOZ_IA_Y_DATOS_VIVOS_BORRADOR.md",
  "LEGAL/REGISTRO_PERMISOS_IP.md",
  "LEGAL/REGISTRO_PROVEEDORES.md",
  "docs/operations/INCIDENT_RESPONSE.md",
  "docs/operations/DISASTER_RECOVERY.md",
  "docs/operations/SERVICE_LEVEL_OBJECTIVES.md",
  "docs/operations/RELEASE_COMMERCIAL_CHECKLIST.md",
  "docs/operations/REPOSITORY_PROTECTION.md"
];

function fail(messages) {
  console.error("COMMERCIAL_READINESS_GATE FAIL");
  for (const message of messages) console.error(`- ${message}`);
  process.exit(1);
}

const errors = requiredFiles.filter(path => !existsSync(path)).map(path => `Falta ${path}.`);
if (!existsSync(controlPath)) errors.push(`Falta ${controlPath}.`);
let control = null;
try { if (existsSync(controlPath)) control = JSON.parse(readFileSync(controlPath, "utf8")); }
catch (error) { errors.push(`${controlPath} no es JSON válido: ${error.message}`); }

const approvals = Array.isArray(control?.approvals) ? control.approvals : [];
if (approvals.length !== 11) errors.push("Deben existir exactamente once aprobaciones comerciales obligatorias.");
for (const approval of approvals) {
  if (!approval?.id || !approval?.owner || typeof approval?.approved !== "boolean" || typeof approval?.evidence !== "string") {
    errors.push(`Aprobación inválida: ${JSON.stringify(approval)}.`);
  }
  if (approval?.approved && !approval.evidence.trim()) errors.push(`${approval.id} figura aprobada sin evidencia.`);
}
if (errors.length) fail(errors);

const pending = approvals.filter(item => !item.approved);
const productionRelease = process.env.GSCG_COMMERCIAL_RELEASE === "1" || process.env.VERCEL_ENV === "production" || process.env.VERCEL_TARGET_ENV === "production";
if (productionRelease && pending.length) fail([`Publicación comercial bloqueada: faltan ${pending.length} aprobaciones con evidencia.`, ...pending.map(item => `${item.id}: responsable ${item.owner}.`)]);

console.log(`COMMERCIAL_READINESS_GATE PASS profile=${productionRelease ? "commercial" : "candidate"} pendingExternal=${pending.length}`);
