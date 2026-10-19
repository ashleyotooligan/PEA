import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(fileURLToPath(new URL('../',import.meta.url))),port=Number(process.env.PEA_PORT||4180);
const mime={'.html':'text/html; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.png':'image/png','.json':'application/json','.md':'text/plain; charset=utf-8'};
const server=http.createServer(async(req,res)=>{try{if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405);res.end();return;}const path=decodeURIComponent(new URL(req.url,'http://localhost').pathname),target=resolve(root,'.'+(path==='/'?'/index.html':path));if(!target.startsWith(root+sep)||path.includes('\0')){res.writeHead(403);res.end();return;}if(!(await stat(target)).isFile()){res.writeHead(404);res.end();return;}res.writeHead(200,{'Content-Type':mime[extname(target)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(req.method==='HEAD'?undefined:await readFile(target));}catch{res.writeHead(404);res.end('Not found');}});
server.listen(port,'127.0.0.1',()=>console.log(`PEA preview: http://127.0.0.1:${server.address().port}`));
