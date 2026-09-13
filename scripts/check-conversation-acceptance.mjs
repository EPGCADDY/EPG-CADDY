import fs from 'node:fs';

// Acceptance requires recorded browser stages; service-only transport is insufficient.
export function assess(report){
  const failures=[], rows=report.cases||[], ids=new Set(rows.map(r=>r.id));
  if(rows.length!==100||ids.size!==100)failures.push('Exactly 100 distinct cases required');
  if(!report.candidateCommit||!report.baselineR34Commit)failures.push('Candidate and R34 commits required');
  if(report.method!=='consecutive-browser-audio')failures.push('Consecutive browser audio method required');
  let equivalent=0;
  for(const row of rows){
    const fail=reason=>failures.push(`${row.id}: ${reason}`);
    if(!row.capturedAudioEvidence||!row.recognizedText||!row.answer||!row.referenceAnswer||!row.referenceEvidence)fail('Missing audio/text/reference evidence');
    if(!row.playback?.started||!row.playback?.ended||!row.playback?.nonSilent||!row.playback?.evidence)fail('No evidenced non-silent completed playback');
    if(row.duplicateCount!==0||row.blockCount!==0||row.retainedStateCount!==0)fail('Zero duplicates, blocks and retained states not demonstrated');
    if(row.readyForNextTurn!==true)fail('Next turn readiness not demonstrated');
    if(!Number.isFinite(row.latencyMs)||!Number.isFinite(row.baselineR34Ms)||row.baselineR34Ms<=0||row.latencyMs>0.4*row.baselineR34Ms)fail('Paired same-flow latency <=40% of R34 not demonstrated');
    if(row.qualityReviewed===true&&row.referenceValidated===true&&row.qualityScore>=90&&row.materialAccuracyFailure===false)equivalent++;
  }
  if(equivalent<90)failures.push(`Only ${equivalent}/100 validated equivalent answers`);
  for(const gate of ['update','permissions','persistence','recovery','finalRegression'])if(report.gates?.[gate]?.status!=='PASS'||!report.gates?.[gate]?.evidence)failures.push(`${gate}: completed evidence required`);
  return{status:failures.length?'FAIL':'PASS',equivalent,failures,physicalIphone:report.physicalIphone||'PENDING'};
}
if(process.argv[1]?.endsWith('/check-conversation-acceptance.mjs')){
  const result=assess(JSON.parse(fs.readFileSync(process.argv[2],'utf8')));
  console.log(JSON.stringify({...result,failures:result.failures.slice(0,15),failureCount:result.failures.length},null,2));
  if(result.status!=='PASS')process.exitCode=1;
}
