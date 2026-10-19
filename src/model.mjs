/** Presentation helpers for hand-authored design fixtures. No RPC or agent backend. */
export const lamports=value=>{
  if(!/^\d+(\.\d{1,9})?$/.test(String(value)))throw new Error('Invalid nonnegative SOL decimal');
  const [a,b='']=String(value).split('.');return BigInt(a)*1000000000n+BigInt(b.padEnd(9,'0'));
};
export function solText(value,digits=3){const negative=value<0n;const v=negative?-value:value;const base=`${v/1000000000n}.${String(v%1000000000n).padStart(9,'0').slice(0,digits)}`;return(negative?'-':'')+base;}
export function caseSummary(s){
  const sum=kind=>s.events.filter(e=>e.kind===kind).reduce((a,e)=>a+lamports(e.sol),0n),buys=sum('buy'),sells=sum('sell');
  const actors=[...new Set(s.events.filter(e=>e.kind==='buy').map(e=>e.actor))];
  return {count:s.events.length,buys,sells,net:buys-sells,buyers:actors.length,claims:s.claims.length,gaps:s.gaps.length};
}
export function visibleEvents(s,cursor=1){return s.events.slice(0,Math.max(1,Math.ceil(s.events.length*cursor)));}
export function teachingCurve(points=45){
  const quote=40,tokens=1000000000,k=quote*tokens;
  return Array.from({length:points},(_,i)=>{const added=i/(points-1)*35;return {addedSol:added,virtualQuote:quote+added,virtualTokens:k/(quote+added),price:(quote+added)**2/k};});
}
export function validateFixtures(data){
  if(data.schema!=='pea/scenarios/1'||data.synthetic!==true||!Array.isArray(data.cases)||!data.cases.length)throw new Error('Invalid fixture envelope');
  const names=new Set();for(const s of data.cases){if(names.has(s.id))throw new Error('Duplicate case');names.add(s.id);const ids=new Set();let slot=0;
    for(const e of s.events){if(!e.id.startsWith('demo:')||ids.has(e.id)||!Number.isInteger(e.slot)||e.slot<slot||!['create','fund','buy','sell'].includes(e.kind))throw new Error('Invalid or out-of-order demo event');lamports(e.sol);ids.add(e.id);slot=e.slot;}
    for(const c of s.claims){if(!['observed','inferred','unknown'].includes(c.status)||c.evidence.some(id=>!ids.has(id)))throw new Error('Invalid claim evidence');}
  }return true;
}
