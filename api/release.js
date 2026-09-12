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
    release:'V407-R54-PREVIEW-REALTIME-BRIDGE-20260912',
    baseline:'V407-R54',
    baselineCommit:'R54-PREVIEW-REALTIME-BRIDGE',
    publishedAt:'2026-09-12T01:47:00Z'
  });
}
