export default function handler(req,res){
  res.setHeader('Cache-Control','no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma','no-cache');
  res.setHeader('Expires','0');
  res.status(200).json({
    schema:'gscg-release/v1',
    channel:'lab-update-architecture-e-ios-first',
    release:'V407-R47-DIRECT-UPDATE-CHAIN-20260911',
    baseline:'V407-R47',
    baselineCommit:'R47-UPDATE-CHAIN-HARDENED',
    publishedAt:'2026-09-11T22:55:00Z'
  });
}
