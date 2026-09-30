import fs from "node:fs";
import assert from "node:assert/strict";

const html=fs.readFileSync("index-grupal.html","utf8");
const gate=fs.readFileSync("auth-gate.js","utf8");
const accountApi=fs.readFileSync("api/account.js","utf8");

assert(html.includes('src="./auth-gate.js"'),"Feature account hooks remain connected");
assert.match(gate,/window\.GSCOpenAccountLogin=show;/,"Feature-level account login entry remains available");
assert.match(gate,/GSCOpenAccountLogin or the user opens the dedicated account route/,"Public-entry invariant must be explicit");
assert.doesNotMatch(gate,/async function init\(\)\{[\s\S]*?request\("session"\)/,"Initial app load must not demand or query a signed-in account");
assert.match(gate,/\/api\/account\?action=/,"Account API remains available for identity-bound features");
assert.match(gate,/credentials:"include"/,"Feature-level sign-in must retain session cookie");
assert.doesNotMatch(html,/location\.replace\(["']\/access\.html/,"App entry must not redirect to the owner lock screen");
assert(accountApi.includes('session:{method:"GET",path:"/get-session"}'),"API account perdió sesión");
assert(accountApi.includes('signin:{method:"POST",path:"/sign-in/email"}'),"API account perdió signin");
assert(accountApi.includes('signup:{method:"POST",path:"/sign-up/email"}'),"API account perdió signup");
console.log("PASS LAB account gate");
