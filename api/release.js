export default function handler(req,res){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Cache-Control, Pragma, Content-Type');
  if(req.method==='OPTIONS')return res.status(204).end();
  res.setHeader('Cache-Control','no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma','no-cache');
  res.setHeader('Expires','0');
  res.status(200).json({
    schema:'gscg-release/v1',
    channel:'lab-update-architecture-e-ios-first',
    release:'V407-R64-SOURCE-FIRST-PERSISTENT-VOICE-20260913',
    baseline:'V407-R64',
    baselineCommit:'R64-SOURCE-FIRST-PERSISTENT-VOICE',
    publishedAt:'2026-09-12T23:33:12Z'
  });
}
