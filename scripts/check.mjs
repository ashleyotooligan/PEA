import {readFile,readdir,stat} from 'node:fs/promises';
import {resolve,dirname,extname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {Script} from 'node:vm';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {validateFixtures,caseSummary,solText} from '../src/model.mjs';
const root=fileURLToPath(new URL('../',import.meta.url)),files=[];
async function walk(dir){for(const e of await readdir(dir,{withFileTypes:true})){if(['node_modules','.git'].includes(e.name))continue;const p=resolve(dir,e.name);e.isDirectory()?await walk(p):files.push(p);}}
await walk(root);let links=0,pngs=0;
for(const f of files){
 if(extname(f)==='.mjs'){const r=spawnSync(process.execPath,['--check',f],{encoding:'utf8'});if(r.status!==0)throw new Error(r.stderr);}
 if(extname(f)==='.json'){const body=JSON.parse(await readFile(f,'utf8'));if(f.includes('/schemas/'))for(const ref of JSON.stringify(body).matchAll(/"\$ref":"([^"]+)"/g))await stat(resolve(dirname(f),ref[1]));}
 if(extname(f)==='.png'){const b=await readFile(f);assert.equal(b.toString('hex',0,8),'89504e470d0a1a0a');if(f.includes('/screenshots/')){assert.equal(b.readUInt32BE(16),1680);assert.equal(b.readUInt32BE(20),1050);}pngs++;}
 if(['.md','.html'].includes(extname(f))){const txt=await readFile(f,'utf8');const refs=[...txt.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g),...txt.matchAll(/(?:src|href)="([^"\n]+)"/g)].map(m=>m[1]);for(const ref of refs){if(/^(https?:|data:|#|mailto:)/.test(ref))continue;const path=decodeURIComponent(ref.split('#')[0]);if(!path)continue;await stat(resolve(dirname(f),path)).catch(()=>{throw new Error(`Missing ${ref} in ${f}`);});links++;}}
 assert.ok((await stat(f)).size<25*1024*1024,'File exceeds browser upload limit');
}
const data=JSON.parse(await readFile(new URL('../fixtures/scenarios.json',import.meta.url),'utf8'));validateFixtures(data);
const receipts=JSON.parse(await readFile(new URL('../fixtures/receipts.json',import.meta.url),'utf8'));for(const s of data.cases)assert.equal(receipts[s.id],createHash('sha256').update(JSON.stringify(s)).digest('hex'));
assert.equal(solText(caseSummary(data.cases[0]).net),'0.760');assert.equal(caseSummary(data.cases[2]).gaps,1);
const receipt=JSON.parse(await readFile(new URL('../examples/receipt.json',import.meta.url),'utf8'));assert.equal(receipt.signature,null);assert.equal(receipt.sha256,receipts[receipt.payload.id]);
const html=await readFile(new URL('../PEA.html',import.meta.url),'utf8');for(const match of html.matchAll(/<script>([\s\S]*?)<\/script>/g))new Script(match[1]);assert.ok(files.length<=100,'Too many files for the browser upload guide');
console.log(JSON.stringify({files:files.length,relativeLinks:links,pngs,cases:data.cases.length,receiptDigests:'verified',standaloneSyntax:'valid'},null,2));
