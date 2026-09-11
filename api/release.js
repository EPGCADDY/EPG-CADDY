export default function handler(req,res){
  res.setHeader('Cache-Control','no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma','no-cache');
  res.setHeader('Expires','0');
  res.status(200).json({
    schema:'gscg-release/v1',
    channel:'lab-update-architecture-e-ios-first',
    release:'V407-E1-IOS-FIRST',
    baseline:'V407-R33',
    baselineCommit:'5b85c63438b27fce53e2d0f6aa4e371bffc3c263',
    publishedAt:'2026-09-11T01:39:00Z'
  });
}
