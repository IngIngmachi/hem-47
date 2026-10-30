/* Bản tiếng Anh (English).
   Bật/tắt: Cài đặt → Ngôn ngữ, hoặc nút VI/EN ở trang chủ. Lưu trong localStorage 'tgl_lang'.
   Lời thoại lấy từ xula2/en_p1.json, en_p2.json (sinh bằng tools/nhap_en.py từ file Excel đã dịch),
   tên người nói từ en_ten.json. Dòng nào chưa dịch thì giữ tiếng Việt.
   Chữ giao diện viết thẳng trong code (nút, cài đặt…) có bảng UI bên dưới, chưa dịch hết. */
(function(){
  const DIR=((document.currentScript&&document.currentScript.src)||'xula2/en.js').replace(/[^/]*$/,'');
  let lang='vi'; try{ lang=localStorage.getItem('tgl_lang')||'vi'; }catch(e){}
  window.LANG=lang;
  window.setLang=function(l){ try{ localStorage.setItem('tgl_lang',l); }catch(e){} location.reload(); };
  if(lang!=='en') return;
  document.documentElement.lang='en';
  const V='?v=3010';
  let EN={}, TEN={};
  const apply=()=>{ if(typeof T==='undefined') return; T.forEach(r=>{ const e=EN[r.ma]; if(!e) return; if(e.loi) r.loi=e.loi; if(e.sub) r.sub=e.sub; if(e.ai&&!/^(KHAI_|BANG_)/.test(r.ai||'')) r.ai=e.ai; }); };
  const name=n=>{ n=String(n||''); if(TEN[n]) return TEN[n]; return n; };
  window.enName=name;
  Promise.all(['en_p1','en_p2','en_ten'].map(f=>fetch(DIR+f+'.json'+V).then(r=>r.ok?r.json():{}).catch(()=>({}))))
    .then(([a,b,c])=>{ EN=Object.assign({},a,b); TEN=c||{}; if(typeof rebuild==='function') rebuild(); });
  /* mỗi lần dựng lại bảng thoại (vào Phần 2, sửa câu…) thì áp tiếng Anh lại */
  if(typeof rebuild==='function'){ const rb0=rebuild; rebuild=function(){ const o=rb0.apply(this,arguments); try{ apply(); }catch(e){} return o; }; }
  /* tên người nói: chỉ đổi chữ hiển thị, không đổi khóa dùng để tìm ảnh/giọng */
  if(typeof say==='function'){ const s0=say; say=function(kind,nm,text){ const p=s0.apply(this,arguments); try{ const el=$('dNm'); if(el){ if(kind==='nghi') el.textContent=name('Lâm')+' (thinking)'; else if(nm) el.textContent=name(nm); } const bb=document.querySelector('#dBust b'); if(bb&&nm) bb.textContent=name(nm); }catch(e){} return p; }; }
  /* chữ giao diện hay gặp */
  const UI={'Việc cần làm':'To do','VIỆC CẦN LÀM':'TO DO','Cài đặt':'Settings','Xong':'Done','Sổ tay':'Notebook','Điện thoại':'Phone','Tài khoản':'Account','Thành tựu':'Achievements','Ủng hộ':'Support','Âm thanh':'Sound','Xem lại':'Log','Hướng dẫn':'Guide',
    'Chơi':'Play','Chơi tiếp':'Continue','Chọn chương':'Chapters','Chơi lại từ đầu':'Restart','Quay lại':'Back','Để sau':'Later','✕ Để sau':'✕ Later','Bỏ qua ›':'Skip ›','chạm để tiếp':'tap to continue','Tiếp':'Next','Đóng':'Close','Đi ngủ':'Sleep','Chờ 1 tiếng':'Wait 1 hour',
    'Xem tổng kết':'See summary','Chơi lại Phần 2':'Replay Part 2','Về màn đầu':'Home','Khoe kết quả':'Share result','Tôi hiểu, vào game':'I understand, start','Trước khi vào hẻm':'Before you enter the alley','Lật trang ›':'Turn page ›','Đóng báo':'Close paper',
    'Dễ':'Easy','Thường':'Normal','Khó':'Hard','Nhỏ':'Small','Vừa':'Medium','Lớn':'Large','Tắt':'Off','Bật':'On','Chậm':'Slow','Nhanh':'Fast'};
  const tx=root=>{ const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT); let n; while((n=w.nextNode())){ const t=n.nodeValue.trim(); if(t&&UI[t]) n.nodeValue=n.nodeValue.replace(t,UI[t]); } };
  let pend=false; new MutationObserver(()=>{ if(pend) return; pend=true; requestAnimationFrame(()=>{ pend=false; try{ tx(document.body); }catch(e){} }); }).observe(document.body,{childList:true,subtree:true});
  try{ tx(document.body); }catch(e){}
})();
/* nút chọn ngôn ngữ trong Cài đặt */
(function(){ if(typeof cdOpen!=='function') return; const c0=cdOpen; cdOpen=function(){ c0.apply(this,arguments); const B=$('cdBox'); if(!B||B.querySelector('#cdLang')) return;
  const en=window.LANG==='en'; const box=document.createElement('div');
  box.innerHTML='<div class="cd-s">'+(en?'Language':'Ngôn ngữ')+'</div><div class="cd-grp"><div class="cd-r" id="cdLang"><span>'+(en?'Language':'Ngôn ngữ')+'<small>'+(en?'Reloads the game. Progress is kept.':'Tải lại game, giữ nguyên tiến trình.')+'</small></span><div class="seg"><button type="button" data-l="vi" class="'+(en?'':'on')+'">Tiếng Việt</button><button type="button" data-l="en" class="'+(en?'on':'')+'">English</button></div></div></div>';
  const first=B.querySelector('.cd-s'); if(first) first.before(...box.childNodes); else B.append(...box.childNodes);
  B.querySelectorAll('#cdLang [data-l]').forEach(b=>b.onclick=()=>{ if(b.dataset.l!==window.LANG){ if(typeof save==='function'&&typeof started!=='undefined'&&started) try{ save(); }catch(e){} setLang(b.dataset.l); } }); }; })();
/* nút VI/EN nhỏ ở trang chủ */
(function(){ const add=()=>{ const t=document.querySelector('#cover .hm .tools'); if(!t||t.querySelector('.lgsw')) return;
  const b=document.createElement('button'); b.type='button'; b.className='lgsw'; b.innerHTML='<b>'+(window.LANG==='en'?'EN':'VI')+'</b><span>'+(window.LANG==='en'?'Tiếng Việt':'English')+'</span>';
  b.onclick=()=>setLang(window.LANG==='en'?'vi':'en'); t.appendChild(b); };
  const st=document.createElement('style'); st.textContent='.hm .tools .lgsw b{display:grid;place-items:center;width:24px;height:24px;font:700 12px "Be Vietnam Pro",sans-serif;border:1.5px solid currentColor;border-radius:6px;margin:0 auto 4px}'; document.head.appendChild(st);
  setInterval(add,800); })();
