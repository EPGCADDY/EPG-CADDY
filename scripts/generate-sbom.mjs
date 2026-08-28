import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";

const lock = JSON.parse(readFileSync("package-lock.json", "utf8"));
const packages = lock.packages || {};
const components = [];

for (const [path, metadata] of Object.entries(packages)) {
  if (!path || !metadata?.version) continue;
  const name = path.split("node_modules/").at(-1);
  if (!name) continue;
  const encodedName = name.startsWith("@")
    ? name.split("/").map(encodeURIComponent).join("/")
    : encodeURIComponent(name);
  const ref = `pkg:npm/${encodedName}@${encodeURIComponent(metadata.version)}`;
  components.push({
    type: "library",
    "bom-ref": ref,
    group: name.startsWith("@") ? name.split("/")[0] : undefined,
    name,
    version: metadata.version,
    scope: metadata.dev ? "optional" : "required",
    purl: ref,
    ...(metadata.license ? { licenses: [{ license: { id: metadata.license } }] } : {})
  });
}

const lockHash = createHash("sha256").update(readFileSync("package-lock.json")).digest("hex");
const bom = {
  bomFormat: "CycloneDX",
  specVersion: "1.6",
  serialNumber: `urn:uuid:${lockHash.slice(0,8)}-${lockHash.slice(8,12)}-4${lockHash.slice(13,16)}-a${lockHash.slice(17,20)}-${lockHash.slice(20,32)}`,
  version: 1,
  metadata: {
    tools: { components: [{ type: "application", name: "Golf Score Card GT SBOM generator", version: "V354" }] },
    component: { type: "application", "bom-ref": "pkg:npm/golf-score-card-gt@0.0.0-v354", name: "golf-score-card-gt", version: "V354" },
    properties: [{ name: "gscg:package-lock-sha256", value: lockHash }]
  },
  components: components.sort((left, right) => left["bom-ref"].localeCompare(right["bom-ref"]))
};

writeFileSync("sbom.cdx.json", `${JSON.stringify(bom, null, 2)}\n`);
console.log(`SBOM PASS components=${components.length} lock=${lockHash.slice(0,12)}`);
