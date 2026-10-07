import {getDatabase} from './_lib/database.js';
import {tournamentDirectoryEnvironment,tournamentDirectoryPeerUrl} from './tournament-score-directory.js';
import {ensureTournamentOrganizers,issueTournamentOrganizer} from './_lib/tournament-organizers.js';
import {requireOwner} from './_lib/app-access.js';
import {requireAccountSession} from './_lib/account-auth.js';
import {resolveEventIdentity} from './personal-events.js';
import {ensurePersonalAccess,accessError,eventKind,limitPersonalAccess} from './_lib/personal-event-access.js';
import {ensureEventAdministration,eventAdminAuthority,issueEventAdmin,redeemEventAdmin,deleteAdminEvent,claimLegacyEvent} from './_lib/event-administration.js';
import {refreshEventLifecycles} from './_lib/event-lifecycle.js';
import {isAllowedAppOrigin,handleAppPreflight} from './_lib/cors.js';
import {noStore,readJson} from './_lib/http.js';
export async function handleEventAdministration(req,res,database=getDatabase,ownerResolver=requireOwner,identityResolver=requireAccountSession,fetcher=globalThis.fetch,env=process.env){
 noStore(res);if(handleAppPreflight(req,res))return;
 try{
 if(req.method!=='POST')throw accessError('METHOD_NOT_ALLOWED',405);
 if(!isAllowedAppOrigin(req))throw accessError('ORIGIN_NOT_ALLOWED');
 const sql=database(),body=await readJson(req,4000);let account,owner=false;
 try{account=await ownerResolver(req);owner=true}catch(error){if(!['OWNER_REQUIRED','ACCOUNT_UNAUTHORIZED'].includes(error.code))throw error;account=awai������q�^�