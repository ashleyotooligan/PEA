import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url),inputs={data:'fixtures/scenarios.json',policy:'fixtures/policy.json',tools:'fixtures/tools.json'},fixtures={};
for(const [key,path] of Object.entries(inputs))fixtures[key]=JSON.parse(await readFile(new URL(path,root),'utf8'));
fixtures.receipts=Object.fromEntries(fixtures.data.cases.map(s=>[s.id,createHash('sha256').update(JSON.stringify(s)).digest('hex')]));
await writeFile(new URL('fixtures/receipts.json',root),JSON.stringify(fixtures.receipts,null,2)+'\n');
const payload=fixtures.data.cases[0];await writeFile(new URL('examples/receipt.json',root),JSON.stringify({schema:'pea/receipt/1',synthetic:true,signature:null,sha256:fixtures.receipts[payload.id],payload},null,2)+'\n');
const art={};for(const [key,path] of Object.entries({agent:'assets/brand/pea-agent.png',workshop:'assets/art/pea-workshop.png',inspect:'assets/art/pea-inspect.png'}))art[key]='data:image/png;base64,'+(await readFile(new URL(path,root))).toString('base64');
const modules=['model','scenes','paint','render','app'];let js='';for(const name of modules){let code=await readFile(new URL('src/'+name+'.mjs',root),'utf8');code=code.replace(/^import .*?;\s*$/gm,'').replace(/^export /gm,'');js+='\n// src/'+name+'.mjs\n'+code;}
const html=await readFile(new URL('index.html',root),'utf8');const inline=`<script>globalThis.PEA_FIXTURES=${JSON.stringify(fixtures)};globalThis.PEA_ART=${JSON.stringify(art)};\n(()=>{${js.replace(/<\/script/gi,'<\\/script')}\n})();</script>`;
await writeFile(new URL('PEA.html',root),html.replace('<script type="module" src="src/app.mjs"></script>',inline));console.log('Built PEA.html and fixture digest records.');
