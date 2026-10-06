import {refreshEventLifecycles} from './_lib/event-lifecycle.js';
import {tournamentDirectoryEnvironment} from './tournament-score-directory.js';
import {tournamentOrganizer,redeemTournamentOrganizer} from './_lib/tournament-organizers.js';
import {personalAccessEnabled} from './_lib/personal-access-activation.js';
import {codeAccessEnabled,issueEntryCode} from './_lib/code-access.js';
import {getDatabase} from './_lib/database.js';
import {requireAccountSession} from './_lib/account-auth.js';
import {readDeviceEventIdentity,createDeviceEventIdentity} from './_lib/device-event-identity.js';
import {isAllowedAppOrigin,handleAppPreflight} from './_lib/cors.js';
import {noStore,readJson} from './_lib/http.js';
import {handleLive} from './live.js';
import {refreshPrivateRoundLifecycle} from './_lib/private-round-lifecycle.js';
import {inspectTournamentEntryCode,organizerEntryCode,accessError,viewPersonalEventCode,joinPersonalTournamentCode,eventKind,eventScope,ensurePersonalAccess,personalMember,organizer,assignedPlayers,validateAssignedConfiguration,issuePersonalInvite,consumePersonalInvite,auditPersonal,limitPersonalAccess} from './_lib/personal-event-access.js';

const modes=['general','match_play','four_ball','stableford','universales'];
const categories=['championship','a','b','c','d','female','senior','super_senior'];
export async function resolveEventIdentity(req,res,sql,action,resolver=requireAccountSession){
  const cookie=String(req.headers?.cookie||'');
  if(/(?:^|;\s*¶»§q«^