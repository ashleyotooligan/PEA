import {createRequire} from 'node:module';
import {writeFile} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {P,t,fit,ln} from '../src/paint.mjs';
const n=createRequire(import.meta.url)('@napi-rs/canvas'),root=new URL('../',import.meta.url);
for(const [file,family] of [['DejaVuSans.ttf','DejaVu Sans'],['DejaVuSansMono.ttf','DejaVu Sans Mono']]){const path='/usr/share/fonts/truetype/dejavu/'+file;if(existsSync(path))n.GlobalFonts.registerFromPath(path,family);}
const art=await n.loadImage(new URL('assets/art/pea-workshop.png',root).pathname),icon=await n.loadImage(new URL('assets/brand/pea-agent.png',root).pathname),canvas=n.createCanvas(1680,840),c=canvas.getContext('2d');
c.fillStyle=P.bg;c.fillRect(0,0,1680,840);fit(c,art,0,0,1680,840,true);c.fillStyle='#10140fe8';c.fillRect(0,0,690,840);fit(c,icon,60,44,95,95);t(c,'INDEPENDENT DESIGN RELEASE / 0.1',176,84,15,P.muted,true);t(c,'PEA',68,221,122,P.cream,true);t(c,'Pump Engineer Everything',77,380,29,P.cream);t(c,'Every launch leaves a trace.',77,441,27,P.lime);ln(c,77,534,613,534);t(c,'OBSERVE / RECONSTRUCT / EXPLAIN',77,569,16,P.muted,true);t(c,'An evidence-led agent workbench.',77,614,20,P.cream);t(c,'ASHLEY TOOLIGAN',77,771,14,P.lime,true);t(c,'ORIGINAL PIXEL ART / SYNTHETIC CASES',1180,787,13,P.cream,true);
await writeFile(new URL('assets/brand/pea-cover.png',root),canvas.toBuffer('image/png'));console.log('pea-cover.png');
