/* Bản tiếng Anh (English).
   Bật/tắt: Cài đặt → Ngôn ngữ, hoặc nút EN/VI ở trang chủ. Lưu trong localStorage 'tgl_lang'.
   Đổi ngôn ngữ không tải lại trang: VI → EN tải file dịch rồi thay chữ; EN → VI trả chữ gốc đã nhớ.
   Lời thoại: xula2/en_p1.json, en_p2.json; tên: en_ten.json; chữ giao diện: en_ui.json
   (sinh bằng tools/nhap_en.py từ file Excel đã dịch). Dòng nào chưa dịch thì giữ tiếng Việt.
   Chỉ đổi chữ hiển thị (bảng thoại, DOM, title/placeholder, chữ vẽ canvas), không đổi chuỗi code dùng để so sánh. */
(function(){
  const DIR=((document.currentScript&&document.currentScript.src)||'xula2/en.js').replace(/[^/]*$/,'');
  const V='?v=3010b';
  let lang='vi'; try{ lang=localStorage.getItem('tgl_lang')||'vi'; }catch(e){}
  window.LANG=lang;
  let ON=false, LOADED=null;
  let EN={}, TEN={}, UI={}, RX=null; const ROWUI={}, memo=new Map();
  const VN=/[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;
  const esc=x=>x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  /* chữ không dấu nên file xuất bỏ sót, tự dịch (chờ tác giả duyệt) */
  const EXTRA={'Xong':'Done','Xong!':'Done!','Nhanh':'Fast','Kho':'Storage','Xem':'View','Nghe':'Listen','Xoay':'Rotate','Trang Facebook':'Facebook Page'};
  const get=f=>(window.ENPRE&&window.ENPRE[f])||fetch(DIR+f+'.json'+V).then(r=>r.ok?r.json():{}).catch(()=>({}));
  const load=()=>LOADED||(LOADED=Promise.all(['en_p1','en_p2','en_ten','en_ui'].map(get)).then(([a,b,c,u])=>{
    EN=Object.assign({},a,b); TEN=c||{}; UI=Object.assign({},EXTRA,u||{});
    /* câu VI gốc của mọi dòng thoại (kể cả Phần 2 chưa nạp) → EN, để nhãn lấy chữ từ bảng thoại cũng dịch được */
    const put=(ma,vi)=>{ const e=EN[ma]; if(e&&e.loi&&vi&&vi.length<90&&!ROWUI[vi.trim()]) ROWUI[vi.trim()]=e.loi; };
    try{ (typeof ROWS_DEFAULT!=='undefined'?ROWS_DEFAULT:[]).concat(typeof P2ROWS!=='undefined'?P2ROWS:[]).forEach(r=>put(r.ma,r.loi)); if(typeof P2OV!=='undefined') Object.keys(P2OV).forEach(k=>put(k,P2OV[k])); }catch(e){}
    const ks=Object.keys(UI).sort((x,y)=>y.length-x.length);
    /* mảnh phải đứng riêng: trước/sau không dính chữ cái khác */
    if(ks.length) RX=new RegExp('(^|[^\\p{L}])('+ks.map(esc).join('|')+')(?![\\p{L}])','gu'); }));

  /* ---- bảng thoại ---- */
  const apply=()=>{ if(!ON||typeof T==='undefined') return; T.forEach(r=>{ const e=EN[r.ma]; if(!e) return; if(e.loi) r.loi=e.loi; if(e.sub) r.sub=e.sub; if(e.ai&&!/^(KHAI_|BANG_)/.test(r.ai||'')) r.ai=e.ai; }); };
  if(typeof rebuild==='function'){ const rb0=rebuild; rebuild=function(){ const o=rb0.apply(this,arguments); try{ apply(); memo.clear(); }catch(e){} return o; }; }
  /* tên người nói: chỉ đổi chữ hiển thị, không đổi khóa dùng để tìm ảnh/giọng */
  const name=n=>{ n=String(n||''); return (ON&&TEN[n])||n; };
  window.enName=name;
  if(typeof say==='function'){ const s0=say; say=function(kind,nm,text){ const p=s0.apply(this,arguments); if(ON) try{ const el=$('dNm'); if(el){ if(kind==='nghi') el.textContent=name('Lâm')+' (thinking)'; else if(nm) el.textContent=name(nm); } const bb=document.querySelector('#dBust b'); if(bb&&nm) bb.textContent=name(nm); }catch(e){} return p; }; }

  /* ---- chữ giao diện: khớp nguyên câu trước; chữ ghép với số/tên ("Ngày 3") thì thay từng mảnh ---- */
  const trS=t=>{ if(!ON||!t) return t; const k=t.trim(); const x=UI[k]||ROWUI[k]; if(x) return t.replace(k,x); if(t.length>160||!VN.test(t)||!RX) return t;
    if(memo.has(t)) return memo.get(t); const o=t.replace(RX,(m,p,w)=>p+UI[w]); if(memo.size>4000) memo.clear(); memo.set(t,o); return o; };
  window.trUI=trS;
  /* nhớ chữ gốc để đổi về tiếng Việt khỏi tải lại trang */
  const ORIG=new WeakMap(), AORIG=new WeakMap();
  const tnode=n=>{ const v=n.nodeValue; if(!v) return; const k=v.trim(); if(!VN.test(v)&&!UI[k]&&!ROWUI[k]) return; const o=trS(v); if(o!==v){ ORIG.set(n,[v,o]); n.nodeValue=o; } };
  const ATT=['title','placeholder','aria-label','alt'];
  const tel=el=>{ if(!el.getAttribute) return; for(const a of ATT){ const v=el.getAttribute(a); if(v){ const o=trS(v); if(o!==v){ const m=AORIG.get(el)||{}; m[a]=[v,o]; AORIG.set(el,m); el.setAttribute(a,o); } } } };
  const tx=root=>{ if(!ON||!root) return; if(root.nodeType===3){ tnode(root); return; } if(root.nodeType!==1) return; if(root.closest&&root.closest('script,style')) return;
    tel(root); const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT); let n; while((n=w.nextNode())){ if(n.nodeType===3) tnode(n); else tel(n); } };
  const untx=()=>{ const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT); let n;
    while((n=w.nextNode())){ if(n.nodeType===3){ const o=ORIG.get(n); if(o&&n.nodeValue===o[1]) n.nodeValue=o[0]; ORIG.delete(n); }
      else { const m=AORIG.get(n); if(m){ for(const a in m) if(n.getAttribute(a)===m[a][1]) n.setAttribute(a,m[a][0]); AORIG.delete(n); } } } };
  const Q=new Set(); let pend=false;
  const flush=()=>{ pend=false; const l=[...Q]; Q.clear(); if(!ON) return; for(const n of l){ try{ tx(n); }catch(e){} } };
  new MutationObserver(rs=>{ if(!ON) return; for(const r of rs){ if(r.type==='childList') r.addedNodes.forEach(n=>Q.add(n)); else Q.add(r.target); } if(!pend){ pend=true; requestAnimationFrame(flush); } })
    .observe(document.documentElement,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:ATT});
  /* chữ vẽ thẳng lên canvas (minigame, điện thoại, nhãn chỗ) */
  const C2=CanvasRenderingContext2D.prototype;
  ['fillText','strokeText','measureText'].forEach(f=>{ const o=C2[f]; C2[f]=function(t,...r){ return o.call(this,ON&&typeof t==='string'?trS(t):t,...r); }; });
  const cf0=window.confirm, al0=window.alert; window.confirm=m=>cf0(trS(String(m))); window.alert=m=>al0(trS(String(m)));

  /* ---- bật / tắt ---- */
  const TITLE0=document.title;
  const refresh=()=>{ try{ if(typeof hud==='function'&&typeof started!=='undefined'&&started) hud(); }catch(e){} document.dispatchEvent(new Event('tgl-lang')); };
  const turnOn=()=>load().then(()=>{ ON=true; window.LANG='en'; document.documentElement.lang='en'; if(typeof rebuild==='function') rebuild(); memo.clear(); tx(document.body);
    if(VN.test(document.title)) document.title=trS(document.title); refresh(); });
  const turnOff=()=>{ ON=false; window.LANG='vi'; document.documentElement.lang='vi'; untx(); if(typeof rebuild==='function') rebuild(); document.title=TITLE0; refresh(); };
  let busyL=false;
  window.setLang=function(l){ if(busyL||l===window.LANG) return; try{ localStorage.setItem('tgl_lang',l); }catch(e){}
    if(l==='vi'){ turnOff(); return; }
    busyL=true; const o=document.createElement('div'); o.style.cssText='position:fixed;left:0;right:0;top:0;height:3px;z-index:999999;background:#e8b04b;transform-origin:left;animation:lgld 1.2s ease-out infinite';
    if(!document.getElementById('lgldCss')){ const st=document.createElement('style'); st.id='lgldCss'; st.textContent='@keyframes lgld{from{transform:scaleX(.05)}to{transform:scaleX(1)}}'; document.head.appendChild(st); }
    document.body.appendChild(o); turnOn().finally(()=>{ o.remove(); busyL=false; }); };
  if(lang==='en') turnOn();
})();
/* nút chọn ngôn ngữ trong Cài đặt */
(function(){ if(typeof cdOpen!=='function') return; const c0=cdOpen;
  const paint=()=>{ const B=$('cdBox'); if(!B) return; const en=window.LANG==='en'; let r=B.querySelector('#cdLang');
    if(!r){ const box=document.createElement('div');
      box.innerHTML='<div class="cd-s" data-ls>Language</div><div class="cd-grp"><div class="cd-r" id="cdLang"><span data-ln>Language<small>Tiếng Việt / English</small></span><div class="seg"><button type="button" data-l="vi">Tiếng Việt</button><button type="button" data-l="en">English</button></div></div></div>';
      const first=B.querySelector('.cd-s'); if(first) first.before(...box.childNodes); else B.append(...box.childNodes); r=B.querySelector('#cdLang');
      r.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>setLang(b.dataset.l)); }
    B.querySelector('[data-ls]').textContent=en?'Language':'Ngôn ngữ'; r.querySelector('[data-ln]').firstChild.nodeValue=en?'Language':'Ngôn ngữ';
    r.querySelectorAll('[data-l]').forEach(b=>b.classList.toggle('on',b.dataset.l===(en?'en':'vi'))); };
  cdOpen=function(){ c0.apply(this,arguments); paint(); };
  /* Cài đặt đang mở lúc đổi ngôn ngữ thì vẽ lại để mọi chữ đổi theo */
  document.addEventListener('tgl-lang',()=>{ const B=$('cdBox'); if(B&&B.offsetParent){ try{ cdOpen(); }catch(e){ paint(); } } }); })();
/* nút EN/VI nhỏ ở trang chủ, cùng hàng "Sài Gòn · 2026 18+" */
(function(){ const add=()=>{ const k=document.querySelector('#cover .hm .kick'); if(!k) return; let b=k.querySelector('.lgsw');
    if(!b){ b=document.createElement('button'); b.type='button'; b.className='lgsw'; b.onclick=e=>{ e.stopPropagation(); setLang(window.LANG==='en'?'vi':'en'); }; k.appendChild(b); }
    const t=window.LANG==='en'?'VI':'EN'; if(b.textContent!==t) b.textContent=t; };
  const st=document.createElement('style'); st.textContent='.hm .kick .lgsw{font:600 12px/1 "Be Vietnam Pro",sans-serif;letter-spacing:.06em;color:#e9dcc4;background:rgba(0,0,0,.35);border:1.5px solid rgba(233,220,196,.55);border-radius:5px;padding:4px 7px;cursor:pointer}'; document.head.appendChild(st);
  document.addEventListener('tgl-lang',add); setInterval(add,800); })();
