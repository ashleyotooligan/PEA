/** Optional native Canvas renderer for precise, reproducible design screenshots. */
import {createRequire} from 'node:module';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {SCENES} from '../src/scenes.mjs';
import {renderPEA} from '../src/render.mjs';
const native=createRequire(import.meta.url)('@napi-rs/canvas');
for(const [file,family] of [['DejaVuSans.ttf','DejaVu Sans'],['DejaVuSansMono.ttf','DejaVu Sans Mono']]){const p='/usr/share/fonts/truetype/dejavu/'+file;if(existsSync(p))native.GlobalFonts.registerFromPath(p,family);}
const root=new URL('../',import.meta.url),art={};
for(const [key,path] of Object.entries({agent:'assets/brand/pea-agent.png',workshop:'assets/art/pea-workshop.png',inspect:'assets/art/pea-inspect.png'}))art[key]=await native.loadImage(new URL(path,root).pathname);
const state={scene:'desk',caseIndex:0,cursor:1,art};for(const [key,path] of Object.entries({data:'fixtures/scenarios.json',policy:'fixtures/policy.json',tools:'fixtures/tools.json',receipts:'fixtures/receipts.json'}))state[key]=JSON.parse(await readFile(new URL(path,root),'utf8'));
const canvas=native.createCanvas(1680,1050),ctx=canvas.getContext('2d');await mkdir(new URL('assets/screenshots/',root),{recursive:true});
for(const [i,scene] of SCENES.entries()){state.scene=scene.id;state.caseIndex=scene.id==='challenge'?1:scene.id==='replay'?2:0;state.cursor=scene.id==='replay'?0.68:1;renderPEA(ctx,state);const filename=String(i+1).padStart(2,'0')+'-'+scene.id+'.png';await writeFile(new URL('assets/screenshots/'+filename,root),canvas.toBuffer('image/png'));console.log(filename);}
await import('./cover.mjs');
