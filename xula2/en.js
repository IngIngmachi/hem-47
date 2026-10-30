/* Bản tiếng Anh (English).
   Bật/tắt: Cài đặt → Ngôn ngữ, hoặc nút VI/EN ở trang chủ. Lưu trong localStorage 'tgl_lang'.
   Lời thoại lấy từ xula2/en_p1.json, en_p2.json (sinh bằng tools/nhap_en.py từ file Excel đã dịch),
   tên người nói từ en_ten.json. Dòng nào chưa dịch thì giữ tiếng Việt.
   Chữ giao diện viết thẳng trong code lấy từ en_ui.json (tools/nhap_en.py đọc sheet 'Giao diện'). */
(function(){
  const DIR=((document.currentScript&&document.currentScript.src)||'xula2/en.js').replace(/[^/]*$/,'');
  let lang='vi'; try{ lang=localStorage.getItem('tgl_lang')||'vi'; }catch(e){}
  window.LANG=lang;
  window.setLang=function(l){ try{ localStorage.setItem('tgl_lang',l); }catch(e){} try{ const o=document.createElement('div'); o.style.cssText='position:fixed;inset:0;z-index:999999;background:#08090b;opacity:0;transition:opacity .18s'; document.body.appendChild(o); requestAnimationFrame(()=>o.style.opacity='.85'); }catch(e){} setTimeout(()=>location.reload(),60); };
  if(lang!=='en') return;
  document.documentElement.lang='en';
  const V='?v=3010b'; const get=f=>(window.ENPRE&&window.ENPRE[f])||fetch(DIR+f+'.json'+V).then(r=>r.ok?r.json():{}).catch(()=>({}));
  let EN={}, TEN={}; const ROWUI={};  /* câu ngắn trong bảng thoại cũng dùng làm nhãn (tên chỗ, nút) → dịch theo luôn */
  const apply=()=>{ if(typeof T==='undefined') return; T.forEach(r=>{ const e=EN[r.ma]; if(!e) return; if(e.loi&&r.loi&&r.loi!==e.loi&&r.loi.length<90&&!ROWUI[r.loi.trim()]) ROWUI[r.loi.trim()]=e.loi; if(e.loi) r.loi=e.loi; if(e.sub) r.sub=e.sub; if(e.ai&&!/^(KHAI_|BANG_)/.test(r.ai||'')) r.ai=e.ai; }); };
  const name=n=>{ n=String(n||''); if(TEN[n]) return TEN[n]; return n; };
  window.enName=name;
  Promise.all(['en_p1','en_p2','en_ten'].map(get))
    .then(([a,b,c])=>{ EN=Object.assign({},a,b); TEN=c||{}; if(typeof rebuild==='function') rebuild(); });
  /* mỗi lần dựng lại bảng thoại (vào Phần 2, sửa câu…) thì áp tiếng Anh lại */
  if(typeof rebuild==='function'){ const rb0=rebuild; rebuild=function(){ const o=rb0.apply(this,arguments); try{ apply(); }catch(e){} return o; }; }
  /* tên người nói: chỉ đổi chữ hiển thị, không đổi khóa dùng để tìm ảnh/giọng */
  if(typeof say==='function'){ const s0=say; say=function(kind,nm,text){ const p=s0.apply(this,arguments); try{ const el=$('dNm'); if(el){ if(kind==='nghi') el.textContent=name('Lâm')+' (thinking)'; else if(nm) el.textContent=name(nm); } const bb=document.querySelector('#dBust b'); if(bb&&nm) bb.textContent=name(nm); }catch(e){} return p; }; }
  /* chữ giao diện: bảng en_ui.json (VI → EN, từ file Hem47_giao_dien_VI_EN_da_dich.xlsx).
     Khớp nguyên câu trước; chữ bị ghép với số/tên ("Ngày 3") thì thay từng mảnh, dài trước ngắn sau.
     Chỉ đổi chữ hiển thị (DOM, title/placeholder, chữ vẽ trên canvas), không đổi chuỗi code dùng để so sánh. */
  const VN=/[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;
  let UI={}, RX=null; const memo=new Map();
  const esc=x=>x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const trS=t=>{ if(!t) return t; const k=t.trim(); const x=UI[k]||ROWUI[k]; if(x) return t.replace(k,x); if(t.length>160||!VN.test(t)||!RX) return t;
    if(memo.has(t)) return memo.get(t); const o=t.replace(RX,(m,p,w)=>p+UI[w]); if(memo.size>4000) memo.clear(); memo.set(t,o); return o; };
  window.trUI=trS;
  const tnode=n=>{ const v=n.nodeValue; if(!v||(!VN.test(v)&&!UI[v.trim()]&&!ROWUI[v.trim()])) return; const o=trS(v); if(o!==v) n.nodeValue=o; };
  const ATT=['title','placeholder','aria-label','alt'];
  const tel=el=>{ for(const a of ATT){ const v=el.getAttribute&&el.getAttribute(a); if(v){ const o=trS(v); if(o!==v) el.setAttribute(a,o); } } };
  const tx=root=>{ if(!root) return; if(root.nodeType===3){ tnode(root); return; } if(root.nodeType!==1) return; if(root.closest&&root.closest('script,style')) return;
    tel(root); const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT); let n; while((n=w.nextNode())){ if(n.nodeType===3) tnode(n); else tel(n); } };
  const Q=new Set(); let pend=false;
  const flush=()=>{ pend=false; const l=[...Q]; Q.clear(); for(const n of l){ try{ tx(n); }catch(e){} } };
  new MutationObserver(rs=>{ for(const r of rs){ if(r.type==='childList') r.addedNodes.forEach(n=>Q.add(n)); else Q.add(r.target); } if(!pend){ pend=true; requestAnimationFrame(flush); } })
    .observe(document.documentElement,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:ATT});
  /* chữ vẽ thẳng lên canvas (minigame, điện thoại, bảng trong trại) */
  const C2=CanvasRenderingContext2D.prototype;
  ['fillText','strokeText','measureText'].forEach(f=>{ const o=C2[f]; C2[f]=function(t,...r){ return o.call(this,typeof t==='string'?trS(t):t,...r); }; });
  const cf0=window.confirm, al0=window.alert; window.confirm=m=>cf0(trS(String(m))); window.alert=m=>al0(trS(String(m)));
  /* chữ không dấu nên file xuất bỏ sót, tôi tự dịch (chờ tác giả duyệt) */
  const EXTRA={'Xong':'Done','Xong!':'Done!','Nhanh':'Fast','Kho':'Storage','Xem':'View','Nghe':'Listen','Xoay':'Rotate','Trang Facebook':'Facebook Page'};
  get('en_ui').then(u=>{ UI=Object.assign({},EXTRA,u||{});
    const ks=Object.keys(UI).filter(k=>k.length>=1).sort((a,b)=>b.length-a.length);
    /* mảnh phải đứng riêng: trước/sau không dính chữ cái khác */
    if(ks.length) RX=new RegExp('(^|[^\\p{L}])('+ks.map(esc).join('|')+')(?![\\p{L}])','gu');
    memo.clear(); tx(document.body); if(document.title&&VN.test(document.title)) document.title=trS(document.title); });
})();
/* nút chọn ngôn ngữ trong Cài đặt */
(function(){ if(typeof cdOpen!=='function') return; const c0=cdOpen; cdOpen=function(){ c0.apply(this,arguments); const B=$('cdBox'); if(!B||B.querySelector('#cdLang')) return;
  const en=window.LANG==='en'; const box=document.createElement('div');
  box.innerHTML='<div class="cd-s">'+(en?'Language':'Ngôn ngữ')+'</div><div class="cd-grp"><div class="cd-r" id="cdLang"><span>'+(en?'Language':'Ngôn ngữ')+'<small>'+(en?'Reloads the game. Progress is kept.':'Tải lại game, giữ nguyên tiến trình.')+'</small></span><div class="seg"><button type="button" data-l="vi" class="'+(en?'':'on')+'">Tiếng Việt</button><button type="button" data-l="en" class="'+(en?'on':'')+'">English</button></div></div></div>';
  const first=B.querySelector('.cd-s'); if(first) first.before(...box.childNodes); else B.append(...box.childNodes);
  B.querySelectorAll('#cdLang [data-l]').forEach(b=>b.onclick=()=>{ if(b.dataset.l!==window.LANG){ if(typeof save==='function'&&typeof started!=='undefined'&&started) try{ save(); }catch(e){} setLang(b.dataset.l); } }); }; })();
/* nút VI/EN nhỏ ở trang chủ, nằm cùng hàng "Sài Gòn · 2026 18+" để khỏi chen vào hàng nút dưới */
(function(){ const add=()=>{ const k=document.querySelector('#cover .hm .kick'); if(!k||k.querySelector('.lgsw')) return;
  const b=document.createElement('button'); b.type='button'; b.className='lgsw'; b.textContent=window.LANG==='en'?'VI':'EN'; b.title=window.LANG==='en'?'Tiếng Việt':'English';
  b.onclick=e=>{ e.stopPropagation(); setLang(window.LANG==='en'?'vi':'en'); }; k.appendChild(b); };
  const st=document.createElement('style'); st.textContent='.hm .kick .lgsw{font:600 12px/1 "Be Vietnam Pro",sans-serif;letter-spacing:.06em;color:#e9dcc4;background:rgba(0,0,0,.35);border:1.5px solid rgba(233,220,196,.55);border-radius:5px;padding:4px 7px;cursor:pointer}'; document.head.appendChild(st);
  setInterval(add,800); })();
