import fs from "node:fs";
import assert from "node:assert/strict";

const api=fs.readFileSync("api/shortcuts.js","utf8");
const sql=fs.readFileSync("sql/user-shortcuts-lab.sql","utf8");

for(const kind of ["scorecard","tournament","board","display"])assert(api.includes('"'+kind+'"'),"Falta tipo "+kind);
assert(api.includes("requireAccountSession(req)"),"Shortcuts debe exigir sesión");
assert(api.includes("auth_user_id="),"Shortcuts debe filtrar por auth_user_id");
assert(api.includes("account.id"),"Shortcuts debe usar el id de la cuenta autenticada");
assert(api.includes("expires_at IS NOT NULL AND expires_at<=now()"),"Falta limpieza automática por expiración");
assert(sql.includes("UNIQUE(auth_user_id,kind,resource_key)"),"Esquema debe separar recurso por usuario");
assert(sql.includes("user_shortcuts_user_active_idx"),"Falta índice por usuario");
console.log("PASS LAB user shortcuts isolation");