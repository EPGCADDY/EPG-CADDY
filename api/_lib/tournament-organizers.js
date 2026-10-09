import {createHash,randomBytes} from 'node:crypto';
import {requireOwner,isOwner} from './app-access.js';
import {accessError} from './personal-event-access.js';
const digest=value=>createHash('sha256').update(String(value||'')).digest('hex');
export async function ensureTournamentOrganizers(sql){
 await sql`CREATE TABLE IF NOT EXISTS gsc_tournament_organizers(id uuid PRIMARY KEY DEFAULT gen_random_uuid(),recipient_account_id text NOT NULL,recipient_name text NOT NULL,issuer_account_id text NOT NULL,code_hash char(64) UNIQUE NOT NULL,created_at timestamptz NOT NULL DEFAULT now(),expires_at timestamptz NOT NULL,redeemed_at timestamptz,revoked_at timestamptz)`;
}
export async function tournamentOrganizer(sql,req,account,ownerResolver=requireOwner){
 if(isOwner(account))return {owner:true};
 try{await ownerResolver(req);return {owner:true}}catch(error){if(!['OWNER_REQUIRED','ACCOUNT_UNAUTHORIZED'].includes(error.code))throw error}
 await ensureTournamentOrganizers(sql);
 const grants=await sql`SELECT id,recipient_name,expires_at FROM gsc_tournament_organizers WHERE recipient_account_id=${account.id} AND redeemed_at IS NOT NULL AND revoked_at IS NULL AND expires_at>now() LIMIT 1`;
 if(!grants.length)throw accessError('TOURNAMENT_ORGANIZER_REQUIRED');
 return {owner:false,grant:grants[0]};
}
export async function issueTournamentOrganizer(sql,owner,body){
 await ensureTournamentOrganizers(sql);
 const recipient=String(body.recipientAccountId||'').trim(),name=String(body.recipientName||'').trim();
 if(!recipient||recipient.length>160||!name||name.length>120)throw accessError('ADMIN_RECIPIENT_REQUIRED',400);
 const code=randomBytes(24).toString('base64url');
 const rows=await sql`INSERT INTO gsc_tournament_organizers(recipient_account_id,recipient_name,issuer_account_id,code_hash,expires_at) VALUES(${recipient},${name},${owner.id},${digest(code)},now()+interval '24 hours') RETURNING id,expires_at`;
 return {ok:true,id:rows[0].id,code,recipientName:name,expiresAt:rows[0].expires_at};
}
export async function redeemTournamentOrganizer(sql,account,code){
 await ensureTournamentOrganizers(sql);
 const rows=await sql`UPDATE gsc_tournament_organizers SET redeemed_at=now() WHERE code_hash=${digest(code)} AND recipient_account_id=${account.id} AND redeemed_at IS NULL AND revoked_at IS NULL AND expires_at>now() RETURNING id,expires_at`;
 if(!rows.length)throw accessError('ORGANIZER_CODE_INVALID');
 return {ok:true,expiresAt:rows[0].expires_at};
}
