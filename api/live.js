import {ensureEventLifecycle,refreshEventLifecycles} from './_lib/event-lifecycle.js';
import {tournamentDirectoryEnvironment,tournamentDirectoryPeerUrl} from './tournament-score-directory.js';
import {personalAccessEnabled} from './_lib/personal-access-activation.js';
import {refreshPrivateRoundLifecycle} from "./_lib/private-round-lifecycle.js";
import { createHash, randomBytes } from "node:crypto";
import { getDatabase } from "./_lib/database.js";
import { handleAppPreflight, isAllowedAppOrigin } from "./_lib/cors.js";
import { noStore, readJson } from "./_lib/http.js";
import {requireAccountSession} from './_lib/account-auth.js';
import {readDeviceEventIdentity} from './_lib/device-event-identity.js';
import {tournamentOrganizer} from './_lib/tournament-organizers.js';
import {ensurePersonalAccess,guardPersonalLive,personalPublishingSql} from './_lib/personal-event-access.js';

const LIVE_POLICY_VERSION="gsc-gt-live-v1";
const LIVE_UPSTREAM_URL="https://epg-caddy.vercel.app/api/live";

async function proxyLiveToProduction(req,res){
  const host=String(req?.headers?.["x-forwarded-host"]||req?.headers?.host||"").split(",")[0].trim().toLowerCase();
  if(host==="epg-caddy.vercel.app"||host.includes("lab")||host.startsWith("golf-sc-gt-")||process.env.VERCEL_PROJECT_ID==="prj_0KNTWUoiCiA3amKZQPDNNkWYFDbp"||/^(localhost|127\.0\.0\.1)(:|$)/.test(host)||process.env.GSC_ENVIRONMENT==="lab")throw liveError("DATABASE_NOT_CONFIGURED",503);
  const headers={"content-type":"application/¶»§q«^