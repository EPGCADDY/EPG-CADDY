import {issueTournamentOrganizer,redeemTournamentOrganizer} from '../../api/_lib/tournament-organizers.js';
export async function authorizeTestOrganizer(sql,id){const permission=await issueTournamentOrganizer(sql,{id:'test-owner'},{recipientAccountId:id,recipientName:'Organizador de prueba'});await redeemTournamentOrganizer(sql,{id},permission.code)}
