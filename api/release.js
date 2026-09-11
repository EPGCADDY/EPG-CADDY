export default function handler(req,res){
  res.setHeader('Cache-Control','no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma','no-cache');
  res.setHeader('Expires','0');
  res.status(200).json({
    schema:'gscg-release/v1',
    channel:'lab-update-architecture-e-ios-first',
    release:'V407-R46-DIRECT-UPDATE-20260911',
    baseline:'V407-R46',
    baselineCommit:'R43-TRANSPORT-VALIDATION',
    publishedAt:'2026-09-11T22:12:00Z'
  });
}
