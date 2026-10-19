import {SCENES} from './scenes.mjs';
import {validateFixtures} from './model.mjs';
import {renderPEA} from './render.mjs';
const $=id=>document.getElementById(id),canvas=$('pea'),context=canvas.getContext('2d');
let state;
async function jsonAsset(key,path){if(globalThis.PEA_FIXTURES)return globalThis.PEA_FIXTURES[key];const r=await fetch(path);if(!r.ok)throw new Error('Missing file: '+path);return r.json();}
function imageAsset(key,path){return new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve([key,img]);img.onerror=()=>reject(new Error('Missing artwork: '+path));img.src=globalThis.PEA_ART?.[key]??path;});}
function draw(){renderPEA(context,state);$('status').textContent=`${state.data.cases[state.caseIndex].title} · synthetic data · ${Math.round(state.cursor*100)}% of bundled events`;$('cursorValue').textContent=Math.round(state.cursor*100)+'%';}
function download(data,name,type){const a=document.createElement('a'),url=URL.createObjectURL(new Blob([data],{type}));a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
async function boot(){
 try{
  const [data,policy,tools,receipts]=await Promise.all([jsonAsset('data','fixtures/scenarios.json'),jsonAsset('policy','fixtures/policy.json'),jsonAsset('tools','fixtures/tools.json'),jsonAsset('receipts','fixtures/receipts.json')]);validateFixtures(data);
  const art=Object.fromEntries(await Promise.all(Object.entries({agent:'assets/brand/pea-agent.png',workshop:'assets/art/pea-workshop.png',inspect:'assets/art/pea-inspect.png'}).map(([a,p])=>imageAsset(a,p))));
  state={scene:'desk',caseIndex:0,cursor:1,data,policy,tools,receipts,art};
  SCENES.forEach(s=>{const o=document.createElement('option');o.value=s.id;o.textContent=s.label;$('scene').appendChild(o);});
  data.cases.forEach((s,i)=>{const o=document.createElement('option');o.value=String(i);o.textContent=s.title;$('case').appendChild(o);});
  $('scene').addEventListener('change',()=>{state.scene=$('scene').value;draw();});$('case').addEventListener('change',()=>{state.caseIndex=Number($('case').value);draw();});
  $('cursor').addEventListener('input',()=>{state.cursor=Number($('cursor').value)/100;state.scene='replay';$('scene').value='replay';draw();});
  canvas.addEventListener('click',event=>{const r=canvas.getBoundingClientRect(),x=(event.clientX-r.left)*1680/r.width,y=(event.clientY-r.top)*1050/r.height;if(x>=44&&x<1647&&y>=91&&y<161){const col=Math.floor((x-44)/229),row=Math.floor((y-91)/39),i=row*7+col;if(col<7&&row<2&&SCENES[i]){state.scene=SCENES[i].id;$('scene').value=state.scene;draw();}}});
  $('capture').addEventListener('click',()=>{const a=document.createElement('a');a.href=canvas.toDataURL('image/png');a.download=`pea-${state.scene}.png`;a.click();});
  $('receipt').addEventListener('click',()=>{const payload=state.data.cases[state.caseIndex];download(JSON.stringify({schema:'pea/receipt/1',synthetic:true,signature:null,sha256:state.receipts[payload.id],payload},null,2),`pea-${payload.id}-receipt.json`,'application/json');});
  draw();$('loading').hidden=true;globalThis.PEA_TEST={getState:()=>state,selectScene:id=>{state.scene=id;draw();}};
 }catch(e){$('error').textContent=e.message;$('loading').textContent='The preview could not load. Open the embedded PEA.html or check that folders were extracted.';}
}
boot();
