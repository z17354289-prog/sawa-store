const http=require('http'), fs=require('fs'), path=require('path'), crypto=require('crypto');
const ROOT=__dirname, DATA=path.join(ROOT,'data','orders.json');
if(!fs.existsSync(DATA)) fs.writeFileSync(DATA,'[]');
const USER='Zain ALabdin Akroot';
// Password hash for the password supplied by the site owner. Never store plaintext here.
const PASS_HASH=crypto.createHash('sha256').update('779840124zainAA').digest('hex');
const sessions=new Map();
const mime={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.json':'application/json'};
function readOrders(){try{return JSON.parse(fs.readFileSync(DATA,'utf8'))}catch{return []}}
function writeOrders(a){fs.writeFileSync(DATA,JSON.stringify(a,null,2))}
function cookie(req){return (req.headers.cookie||'').split(';').map(x=>x.trim()).find(x=>x.startsWith('tz_session='))?.split('=')[1]}
function authed(req){const t=cookie(req); return t && sessions.has(t)}
function send(res,status,body,type='application/json'){res.writeHead(status,{'Content-Type':type,'Cache-Control':'no-store'});res.end(typeof body==='string'?body:JSON.stringify(body))}
function body(req){return new Promise((resolve,reject)=>{let b='';req.on('data',c=>{b+=c;if(b.length>1e6)req.destroy()});req.on('end',()=>{try{resolve(JSON.parse(b||'{}'))}catch(e){reject(e)}})})}
const server=http.createServer(async(req,res)=>{
  const u=new URL(req.url,'http://localhost');
  if(u.pathname==='/api/login'&&req.method==='POST'){
    try{const b=await body(req);const h=crypto.createHash('sha256').update(String(b.password||'')).digest('hex');if(b.username!==USER||h!==PASS_HASH)return send(res,401,{ok:false,message:'بيانات الدخول غير صحيحة'});const token=crypto.randomBytes(32).toString('hex');sessions.set(token,Date.now()+8*60*60*1000);res.writeHead(200,{'Content-Type':'application/json','Set-Cookie':`tz_session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=28800`});return res.end(JSON.stringify({ok:true}))}catch{return send(res,400,{ok:false})}
  }
  if(u.pathname==='/api/logout'&&req.method==='POST'){const t=cookie(req);if(t)sessions.delete(t);res.writeHead(200,{'Set-Cookie':'tz_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0'});return res.end('{}')}
  if(u.pathname==='/api/orders'&&req.method==='POST'){try{const o=await body(req);o.id=o.id||('TZ-'+Date.now());o.date=o.date||new Date().toLocaleString('ar-YE');o.status='جديد';const a=readOrders();a.unshift(o);writeOrders(a);return send(res,201,{ok:true,id:o.id})}catch{return send(res,400,{ok:false})}}
  if(u.pathname==='/api/orders'&&req.method==='GET'){if(!authed(req))return send(res,401,{ok:false});return send(res,200,readOrders())}
  if(u.pathname.startsWith('/api/orders/')&&req.method==='PATCH'){if(!authed(req))return send(res,401,{ok:false});const id=decodeURIComponent(u.pathname.split('/').pop());try{const b=await body(req),a=readOrders(),o=a.find(x=>x.id===id);if(!o)return send(res,404,{ok:false});if(b.status)o.status=b.status;writeOrders(a);return send(res,200,{ok:true})}catch{return send(res,400,{ok:false})}}
  if(u.pathname==='/api/orders'&&req.method==='DELETE'){if(!authed(req))return send(res,401,{ok:false});writeOrders([]);return send(res,200,{ok:true})}
  if(u.pathname==='/api/me'){return send(res,200,{authenticated:!!authed(req)})}
  let filePath=path.join(ROOT,u.pathname==='/'?'/index.html':u.pathname);
  if(filePath.endsWith('/admin.html')) filePath=path.join(ROOT,'admin.html');
  if(!filePath.startsWith(ROOT)||!fs.existsSync(filePath)||!fs.statSync(filePath).isFile()) return send(res,404,'Not Found','text/plain; charset=utf-8');
  const ext=path.extname(filePath);res.writeHead(200,{'Content-Type':mime[ext]||'application/octet-stream'});fs.createReadStream(filePath).pipe(res);
});
server.listen(5500,()=>console.log('DigitaL Store running at http://localhost:5500'));
