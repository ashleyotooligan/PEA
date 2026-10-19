import {P,t,ln,box,fit,circle,badge,wrapText,pairs,spark,arrow} from './paint.mjs';
import {SCENES} from './scenes.mjs';
import {caseSummary,solText,visibleEvents,teachingCurve} from './model.mjs';
export const SIZE={width:1680,height:1050};
const kindColor=kind=>({create:P.cream,fund:P.amber,buy:P.lime,sell:P.mint}[kind]||P.muted);
function miniFlow(c,s,x,y,w,h){let n=0;const vals=s.events.map(e=>{n+=e.kind==='buy'?Number(e.sol):e.kind==='sell'?-Number(e.sol):0;return n;});spark(c,vals,x,y,w,h);}
function eventRows(c,events,x,y,w,gap=59){events.forEach((e,i)=>{const yy=y+i*gap;ln(c,x,yy-12,x+w,yy-12);t(c,String(e.slot),x,yy,15,P.muted,true);badge(c,e.kind.toUpperCase(),x+137,yy-3,kindColor(e.kind));t(c,`${e.actor} > ${e.target}`,x+260,yy,16,P.ink,true);t(c,`${e.sol} SOL`,x+w-147,yy,16,kindColor(e.kind),true);});}
function graph(c,s,x,y,w,h){
  const loc={source:[.17,.25],creator:[.17,.77],alpha:[.48,.16],beta:[.48,.48],gamma:[.48,.8],curve:[.82,.48]};
  for(const e of s.events){const a=loc[e.kind==='sell'?e.target:e.actor],b=loc[e.kind==='sell'?e.actor:e.target];if(a&&b){const x1=x+a[0]*w,y1=y+a[1]*h,x2=x+b[0]*w,y2=y+b[1]*h,offset=e.kind==='sell'?35:0;arrow(c,x1+22,y1+offset,x2-26,y2+offset,kindColor(e.kind)+'88');const mx=(x1+x2)/2,my=(y1+y2)/2+offset;t(c,e.kind==='create'?'create':e.sol+' SOL',mx-27,my-20,11,P.muted,true);}}
  for(const [name,p] of Object.entries(loc)){const xx=x+p[0]*w,yy=y+p[1]*h;circle(c,xx,yy,25,name==='curve'?P.lime:'#35432e');t(c,name.slice(0,1).toUpperCase(),xx-6,yy-10,20,name==='curve'?P.bg:P.ink,true);t(c,name,xx-name.length*4.2,yy+37,14,P.muted,true);}
}
function claimCard(c,claim,x,y,w,h){const color={observed:P.lime,inferred:P.amber,unknown:P.muted}[claim.status];box(c,x,y,w,h,claim.id);badge(c,claim.status.toUpperCase(),x+w-148,y+15,color);wrapText(c,claim.text,x+23,y+61,w-46,21,P.ink,30);t(c,claim.evidence.length+' evidence references',x+23,y+h-65,13,color,true);wrapText(c,claim.limit,x+23,y+h-38,w-46,13,P.muted,18);}
export function renderPEA(c,state){
  const scene=SCENES.find(s=>s.id===state.scene)||SCENES[0],s=state.data.cases[state.caseIndex||0],summary=caseSummary(s),art=state.art||{};
  c.clearRect(0,0,1680,1050);c.fillStyle=P.bg;c.fillRect(0,0,1680,1050);
  c.fillStyle=P.cream;c.fillRect(0,0,1680,75);fit(c,art.agent,34,5,61,64);t(c,'PEA',106,15,39,P.bg,true);t(c,'Pump Engineer Everything',221,29,17,'#35432e');t(c,'DESIGN RELEASE / 0.1',1370,29,15,P.bg,true);
  SCENES.forEach((v,i)=>{const col=i%7,row=Math.floor(i/7),xx=44+col*229,yy=91+row*39;if(v.id===scene.id){c.fillStyle=P.lime;c.fillRect(xx,yy,219,31);}t(c,`${String(i+1).padStart(2,'0')} ${v.label}`,xx+12,yy+8,12,v.id===scene.id?P.bg:P.muted,true);});
  t(c,scene.title,44,186,34);t(c,scene.subtitle,46,235,17,P.muted);t(c,'CASE / '+s.title.toUpperCase(),1310,196,15,P.lime,true);
  const stats=[['BUNDLED EVENTS',String(summary.count)],['BUY - SELL NOTIONAL',solText(summary.net)+' SOL'],['SAMPLE BUYERS',String(summary.buyers)],['COVERAGE',s.gaps.length?'GAP DECLARED':'BUNDLED WINDOW']];
  stats.forEach(([a,b],i)=>{const xx=44+i*402;ln(c,xx,278,xx+383,278);t(c,a,xx,291,12,P.muted,true);t(c,b,xx,313,21,i===3&&s.gaps.length?P.amber:P.ink,true);});
  const x=44,y=366,w=1592,h=604,id=scene.id;
  if(id==='desk'){
    box(c,x,y,994,h,'AGENT WORKSPACE');fit(c,art.workshop,x+1,y+49,992,406,true);c.fillStyle=P.cream;c.fillRect(x+1,y+455,992,148);t(c,'Reconstruct the launch.',x+26,y+480,31,P.bg);t(c,'Observe the events. Test the explanation. Keep the receipt.',x+28,y+532,18,'#35432e');
    box(c,x+1014,y,578,217,'OPEN QUESTION');wrapText(c,s.question,x+1038,y+64,520,26,P.ink,37);badge(c,'SYNTHETIC CASE',x+1038,y+169);
    box(c,x+1014,y+237,578,367,'PEA / CASE NOTES');const notes=['Read the launch window','Separate facts from hypotheses','Challenge shared-route assumptions','Return a case record with limits'];notes.forEach((v,i)=>{circle(c,x+1046,y+310+i*63,4,i===2?P.amber:P.lime);wrapText(c,v,x+1066,y+298+i*63,495,18,P.ink,25);});
  }else if(id==='radar'){
    box(c,x,y,w,389,'LAUNCH QUEUE / HAND-AUTHORED SCENARIOS','DEMO DATA');[['CASE',25],['SYMBOL',350],['EVENTS',580],['NET NOTIONAL',810],['COVERAGE',1120]].forEach(([a,dx])=>t(c,a,x+dx,y+65,13,P.muted,true));
    state.data.cases.forEach((a,i)=>{const r=caseSummary(a),yy=y+115+i*81;ln(c,x+24,yy-13,x+w-24,yy-13);t(c,a.title,x+25,yy,23);t(c,a.symbol,x+350,yy+3,19,P.lime,true);t(c,r.count,x+580,yy+3,19,P.ink,true);t(c,solText(r.net)+' SOL',x+810,yy+3,19,P.ink,true);badge(c,a.gaps.length?'INCOMPLETE':'BUNDLED',x+1120,yy,a.gaps.length?P.amber:P.mint);});
    box(c,x,y+409,1010,195,'INVESTIGATION LENS');wrapText(c,'Open a launch because there is a question to answer.',x+26,y+464,950,25,P.ink,34);t(c,'No price target, ranking promise, or live-market feed is implied.',x+26,y+548,17,P.muted);
    box(c,x+1030,y+409,562,195,'SELECTED CASE');miniFlow(c,s,x+1055,y+468,510,85);t(c,'cumulative sample buy-minus-sell notional',x+1055,y+572,13,P.muted,true);
  }else if(id==='reconstruction'){
    box(c,x,y,1024,h,'EVENT RECONSTRUCTION','SLOT-ORDERED');eventRows(c,s.events,x+24,y+77,974,68);
    box(c,x+1044,y,548,h,'THE CURRENT EXPLANATION');wrapText(c,s.claims[0].text,x+1068,y+74,500,26,P.ink,37);badge(c,'OBSERVED',x+1068,y+200);ln(c,x+1068,y+250,x+1568,y+250);wrapText(c,s.claims[1].limit,x+1068,y+282,500,23,P.amber,34);t(c,'SOURCE WINDOW',x+1068,y+422,13,P.muted,true);t(c,s.window,x+1068,y+458,24,P.lime,true);t(c,s.events.length+' synthetic event references',x+1068,y+523,17,P.muted);
  }else if(id==='transaction'){
    const e=s.events.find(e=>e.kind==='buy');box(c,x,y,765,h,'EVENT LENS / DISPLAY SCHEMA');const code=['{','  "reference": "'+e.id+'",','  "kind": "buy",','  "actor": "'+e.actor+'",','  "target": "curve",','  "quote_currency": "SOL",','  "notional": "'+e.sol+'",','  "slot": '+e.slot+',','  "source": "synthetic fixture"','}'];code.forEach((v,i)=>t(c,v,x+27,y+79+i*37,17,i===8?P.amber:P.mint,true));t(c,'Normalized display record / not raw chain bytes',x+27,y+540,15,P.muted);
    box(c,x+785,y,807,315,'PROPOSED DECODE CHAIN');const names=['transaction reference','program + pinned IDL','instruction + log decode','normalized event'];names.forEach((v,i)=>{const yy=y+69+i*53;circle(c,x+819,yy+10,7,P.lime);t(c,v,x+844,yy,21);if(i<3)ln(c,x+819,yy+20,x+819,yy+48,P.line,2);});
    box(c,x+785,y+335,807,269,'REQUIRED PROVENANCE');pairs(c,[['network','declared by adapter'],['commitment','record with source'],['schema revision','pin before decode'],['unknown fields','preserve, do not infer']],x+812,y+400,752,43);
  }else if(id==='routes'){
    box(c,x,y,1052,h,'OBSERVED TRANSFER TOPOLOGY');graph(c,s,x+10,y+60,1028,463);t(c,'Arrows represent fixture transfers or events, not identity ownership.',x+25,y+560,16,P.muted);
    box(c,x+1072,y,520,h,'RELATIONSHIP NOTES');badge(c,'COMMON SOURCE',x+1097,y+73,P.amber);wrapText(c,s.claims[0].text,x+1097,y+133,467,24,P.ink,35);wrapText(c,s.claims[1].limit,x+1097,y+275,467,22,P.amber,32);ln(c,x+1097,y+396,x+1564,y+396);wrapText(c,'A shared service can connect wallets without revealing their operator.',x+1097,y+433,467,19,P.muted,29);
  }else if(id==='curve'){
    box(c,x,y,1044,398,'CONSTANT-PRODUCT TEACHING MODEL','FEES OMITTED');const pts=teachingCurve();for(let i=0;i<5;i++)ln(c,x+66,y+75+i*64,x+1007,y+75+i*64);spark(c,pts.map(p=>p.price),x+66,y+76,941,255);t(c,'0 SOL added',x+65,y+354,14,P.muted,true);t(c,'35 SOL added',x+882,y+354,14,P.muted,true);t(c,'relative marginal price',x+65,y+52,13,P.lime,true);
    box(c,x+1064,y,528,398,'MODEL ASSUMPTIONS');pairs(c,[['virtual quote','40 SOL'],['virtual token','1,000,000,000'],['invariant','x * y = k'],['model fees','omitted'],['production quote','not connected']],x+1088,y+76,481,52);
    box(c,x,y+418,w,186,'PRODUCTION ADAPTER DESIGN');wrapText(c,'A real adapter must pin current program schemas, quote assets, reserve semantics, fees, and migration state.',x+25,y+474,w-50,24,P.ink,35);t(c,'This curve explains a mechanism. It is not a Pump.fun execution quote.',x+25,y+555,17,P.amber);
  }else if(id==='reasoning'){
    s.claims.forEach((a,i)=>claimCard(c,a,x+i*537,y,518,360));
    box(c,x,y+380,w,224,'AGENT RESPONSE SHAPE');t(c,'question -> evidence -> explanation -> unresolved items',x+26,y+444,25,P.lime,true);wrapText(c,'A brief should retain the evidence IDs that support it and the limits that could change it.',x+26,y+509,1518,22,P.ink,32);t(c,'Authored example response / no model call is running in this release.',x+26,y+568,15,P.muted);
  }else if(id==='challenge'){
    box(c,x,y,548,h,'COUNTEREXAMPLE ASSISTANT');fit(c,art.inspect,x+28,y+44,488,450);t(c,'PEA / SECOND PASS',x+29,y+527,18,P.lime,true);t(c,'An explanation should survive alternatives.',x+29,y+565,17,P.muted);
    box(c,x+568,y,1024,342,'CHALLENGE / THE SAME SOURCE');wrapText(c,'Could a shared service explain this route?',x+594,y+73,960,30,P.ink,42);const alternatives=['A common funding service','A shared operator','A missing predecessor transfer'];alternatives.forEach((a,i)=>{badge(c,String(i+1).padStart(2,'0'),x+594,y+155+i*52,P.amber);t(c,a,x+646,y+158+i*52,20);});
    box(c,x+568,y+362,1024,242,'CONCLUSION STATUS');badge(c,'REMAINS UNRESOLVED',x+594,y+421,P.amber);wrapText(c,'Keep the connection. Leave ownership unknown until additional evidence supports it.',x+594,y+479,960,24,P.ink,34);
  }else if(id==='sandbox'){
    box(c,x,y,762,h,'HYPOTHETICAL PLAN / SOL');pairs(c,[['proposed spend',state.policy.example_proposed_spend_sol+' SOL'],['maximum spend',state.policy.maximum_proposed_spend_sol+' SOL'],['slippage cap',state.policy.maximum_slippage_bps+' bps'],['human review','required'],['fresh quote','missing'],['signing','not connected'],['broadcast','disabled']],x+26,y+77,710,58);badge(c,'REVIEW ONLY',x+26,y+531,P.amber);
    box(c,x+782,y,810,343,'POLICY CHECKPOINTS');const checks=[['Spend ceiling','within example cap',P.lime],['Window coverage',s.gaps.length?'incomplete':'bundled fixture only',P.amber],['Quote freshness','no live quote',P.amber],['Authorization','no signer attached',P.muted]];checks.forEach(([a,b,color],i)=>{const yy=y+74+i*58;t(c,a,x+808,yy,19);t(c,b,x+1110,yy+2,15,color,true);ln(c,x+808,yy+38,x+1565,yy+38);});
    box(c,x+782,y+363,810,241,'ACTION BOUNDARY');wrapText(c,'An investigation can produce a plan without moving funds.',x+809,y+424,752,28,P.ink,39);t(c,'Funds requested by this preview: 0 SOL',x+809,y+547,18,P.lime,true);
  }else if(id==='blueprint'){
    box(c,x,y,846,h,'INTEGRATION PACKET / PROPOSED');const code=['pea-case/','  window.json','  normalized-events.json','  wallet-routes.json','  claims.json','  counterevidence.json','  policy-plan.json','  receipt.json','  README.md'];code.forEach((v,i)=>t(c,v,x+27,y+76+i*43,22,i===0?P.lime:P.ink,true));
    box(c,x+866,y,726,h,'BUILD ORDER');const items=['1  Connect read-only Solana data','2  Pin and decode a program schema','3  Preserve provenance and gaps','4  Add an evidence-aware model layer','5  Implement replay and receipts','6  Evaluate sandbox policies'];items.forEach((a,i)=>t(c,a,x+891,y+81+i*65,19,i===3?P.lime:P.ink,true));badge(c,'SPECIFICATION / NOT DEPLOYED',x+891,y+527,P.amber);
  }else if(id==='receipt'){
    box(c,x,y,1012,h,'CASE RECEIPT / LOCAL ARTIFACT');pairs(c,[['case',s.id],['mint label',s.mint],['slot window',s.window],['event records',summary.count+' bundled'],['claims',summary.claims+' with declared status'],['source','hand-authored fixtures'],['signature','unsigned']],x+26,y+75,955,49);t(c,'PAYLOAD SHA-256',x+26,y+445,13,P.muted,true);const hash=state.receipts?.[s.id]||'generated during packaging';t(c,hash.slice(0,32),x+26,y+481,19,P.lime,true);if(hash.length>32)t(c,hash.slice(32),x+26,y+514,19,P.lime,true);t(c,'Digest checks fixture integrity, not truth or onchain inclusion.',x+26,y+565,17,P.muted);
    box(c,x+1032,y,560,h,'RECEIPT CONTENTS');fit(c,art.agent,x+1118,y+45,385,349);wrapText(c,'Evidence travels with the explanation.',x+1059,y+408,505,27,P.ink,38);wrapText(c,'A production receipt would also record source commitment, decoder version, and model provenance.',x+1059,y+502,505,18,P.muted,27);
  }else if(id==='replay'){
    const events=visibleEvents(s,state.cursor??1);box(c,x,y,1038,h,'BUNDLED EVENT REPLAY');eventRows(c,events,x+25,y+78,985,64);t(c,`${events.length} / ${s.events.length} bundled events shown`,x+25,y+550,17,P.lime,true);
    box(c,x+1058,y,534,h,'COVERAGE RECORD');badge(c,s.gaps.length?'GAP DECLARED':'BUNDLED WINDOW',x+1083,y+71,s.gaps.length?P.amber:P.mint);wrapText(c,s.gaps[0]||'All events supplied in this example are visible. This is not a statement about complete blockchain history.',x+1083,y+137,482,24,P.ink,35);ln(c,x+1083,y+335,x+1564,y+335);t(c,'REPLAY CURSOR',x+1083,y+378,13,P.muted,true);t(c,Math.round((state.cursor??1)*100)+'%',x+1083,y+415,44,P.lime,true);t(c,'Move the event slider in the viewer.',x+1083,y+527,17,P.muted);
  }else if(id==='tools'){
    box(c,x,y,w,h,'PROPOSED AGENT TOOL CATALOG','CONTRACTS ONLY');[['TOOL',25],['ROLE',570],['RESULT',1140]].forEach(([a,dx])=>t(c,a,x+dx,y+67,13,P.muted,true));state.tools.tools.forEach((tool,i)=>{const yy=y+115+i*73;ln(c,x+24,yy-14,x+w-24,yy-14);t(c,tool.name,x+25,yy,21,P.lime,true);t(c,tool.role,x+570,yy+2,18);t(c,tool.output,x+1140,yy+2,17,P.muted,true);});t(c,'Names and schemas define the future interface; no MCP server is connected.',x+25,y+565,17,P.amber);
  }else if(id==='portrait'){
    box(c,x,y,978,h,'PEA / THE WORKSHOP');fit(c,art.workshop,x+1,y+47,976,556,true);
    c.fillStyle=P.cream;c.fillRect(x+998,y,594,h);fit(c,art.agent,x+1084,y+26,422,397);t(c,'PEA',x+1028,y+414,55,P.bg,true);t(c,'Pump Engineer Everything',x+1029,y+483,22,'#35432e');wrapText(c,'A little engineer for the patterns inside a launch.',x+1029,y+531,528,20,'#35432e',28);
  }
  ln(c,44,994,1636,994);t(c,'PEA / INDEPENDENT DESIGN STUDY',44,1012,13,P.muted,true);t(c,'SYNTHETIC DATA / LOCAL PREVIEW',1255,1012,13,P.lime,true);
}
