export default function handler(req,res){
  res.setHeader('Cache-Control','no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma','no-cache');
  res.setHeader('Expires','0');
  res.status(200).json({
    schema:'gscg-release/v1',
    channel:'lab-update-architecture-e-ios-first',
    release:'V407-R34-DIRECT-UPDATE-20260910',
    baseline:'V407-R34',
    baselineCommit:'DIRECT-UPDATE-NO-SW',
    publishedAt:'2026-09-11T03:45:00Z'
  });
}
