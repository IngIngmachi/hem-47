// Thế Giới Lặng · lưu sẵn tranh để mở nhanh, trang chính luôn lấy bản mới khi có mạng
const C='tgl-v34';
self.addEventListener('install',e=>{ self.skipWaiting(); e.waitUntil(caches.open(C).then(c=>c.addAll(['./','manifest.webmanifest','icons/icon-192.png']).catch(()=>{}))); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch',e=>{ const r=e.request; if(r.method!=='GET') return; const u=new URL(r.url); if(u.origin!==location.origin) return;
  if(r.mode==='navigate'){ e.respondWith(fetch(r).then(res=>{ if(res.ok){ const cp=res.clone(); const k=/\/taotestcaigiketao(\.html)?$/.test(u.pathname)?'taotestcaigiketao.html':'./'; caches.open(C).then(c=>c.put(k,cp)); } return res; }).catch(()=>caches.match(/\/taotestcaigiketao(\.html)?$/.test(u.pathname)?'taotestcaigiketao.html':'./'))); return; }
  if(/\/(img|img2|icons)\//.test(u.pathname)){ e.respondWith(caches.match(r).then(m=>{ const net=fetch(r).then(res=>{ if(res.ok&&/^image\//.test(res.headers.get('content-type')||'')){ const cp=res.clone(); caches.open(C).then(c=>c.put(r,cp)); } return res; }).catch(()=>m); if(m){ e.waitUntil(net.catch(()=>{})); return m; } return net; })); } });
