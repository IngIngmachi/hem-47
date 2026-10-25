/* ===== ui3: giao diện khám phá mới (thử). Chỉ nạp ở trang test, dùng chung Phần 1 + Phần 2.
   - Thẻ "Mục tiêu hiện tại": thu gọn / mở rộng, dòng Gợi ý (bấm để tới việc chính)
   - Cột nút bên phải: Điện thoại, Ra hẻm, Chờ 1 tiếng, Đi ngủ
   - Ô vị trí góc dưới trái, biểu tượng điểm tương tác trên tranh
   - Điện thoại dọc / ngang: tranh tràn màn hình, nút tròn, menu ☰
   Không đổi cơ chế chơi, không thêm hình. ===== */
(function(){
const SVG=d=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+d+'</svg>';
const MASK=d=>"url(\"data:image/svg+xml,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+d+'</svg>')+"\")";
const P={phone:'<rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M11 18.5h2"/>',back:'<path d="M19 12H5M11 6l-6 6 6 6"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  bed:'<path d="M3 18V7M3 13h18v5M21 13v-2a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="10" r="2"/>',doc:'<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M9.5 12h6M9.5 15.5h6"/>',
  pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',bulb:'<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
  chev:'<path d="M6 9l6 6 6-6"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>'};
/* đường vẽ cho biểu tượng trên tranh (canvas) */
const CP={search:'M10.5 4a6.5 6.5 0 1 0 0 13a6.5 6.5 0 1 0 0-13z M15.5 15.5L20 20',person:'M12 4.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 1 0 0-7z M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5',chat:'M4 5h16v11H9l-5 4z M8.5 10.5h.01 M12 10.5h.01 M15.5 10.5h.01'};
const C2={}; const cpath=k=>C2[k]||(C2[k]=new Path2D(CP[k]));

const css=`
body.u3 #hObj,body.u3 #goMain{display:none!important}
#u3obj{pointer-events:auto;box-sizing:border-box;background:rgba(10,12,18,.82);border:1px solid rgba(239,232,216,.14);border-radius:10px;color:#e6dfcf;font-size:14px;line-height:1.55;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);box-shadow:0 10px 30px rgba(0,0,0,.4);width:380px;max-width:100%;overflow:hidden}
#u3obj[hidden]{display:none}
#u3obj .u3h{display:flex;align-items:center;gap:8px;padding:8px 12px;cursor:pointer;color:#f0b25c;font-size:14px;font-weight:600;user-select:none}
#u3obj .u3h .u3ic{width:17px;height:17px;flex:none}#u3obj .u3h .u3ic svg,#u3obj .u3hint .u3ic svg{width:100%;height:100%}
#u3obj .u3h .u3n{background:#f0b25c;color:#1a1408;border-radius:9px;font-size:11px;font-weight:700;min-width:18px;height:18px;display:inline-grid;place-items:center;padding:0 5px;margin-left:2px}
#u3obj .u3h .u3cv{margin-left:auto;width:16px;height:16px;color:#9aa2b5;transition:transform .2s;transform:rotate(180deg)}
#u3obj.min .u3h .u3cv{transform:none}
#u3obj .u3b{border-top:1px solid rgba(239,232,216,.1);padding:8px 14px 10px}
#u3obj.min .u3b{display:none}
body.u3m #u3obj.min .u3b{display:block;border-top:0;padding:0 12px 8px}
body.u3m #u3obj.min .u3bd,body.u3m #u3obj.min .u3hint{display:none}
body.u3m #u3obj.min .u3sub{margin:0;font-size:11.5px;color:#cfc8b8}
body.u3m #u3obj.min .u3sub .u3ic{display:none}
#u3obj .u3sub{display:flex;gap:8px;align-items:center;font-size:12.5px;letter-spacing:.06em;text-transform:uppercase;color:#efe8d8;margin-bottom:6px}
#u3obj .u3sub .u3ic{width:15px;height:15px;color:#9aa2b5;flex:none}
#u3obj .u3bd{max-height:168px;overflow-y:auto}
#u3obj .u3bd p{margin:0 0 6px;color:#d8d1c1}
#u3obj .u3hint{display:flex;gap:9px;align-items:flex-start;margin-top:8px;padding:8px 10px;border-radius:8px;background:rgba(240,178,92,.08);border:1px solid rgba(240,178,92,.22);cursor:pointer;color:#e6dfcf}
#u3obj .u3hint:hover{background:rgba(240,178,92,.16)}
#u3obj .u3hint .u3ic{width:18px;height:18px;color:#f0b25c;flex:none;margin-top:1px}
#u3obj .u3hint b{display:block;color:#f0b25c;font-weight:600;font-size:12.5px}
#u3loc{position:absolute;left:12px;bottom:12px;z-index:4;display:flex;align-items:center;gap:7px;background:rgba(10,12,18,.78);border:1px solid rgba(239,232,216,.14);border-radius:9px;padding:6px 12px 6px 10px;color:#efe8d8;font-size:13.5px;pointer-events:none;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);max-width:60%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#u3loc::before{content:"";width:15px;height:18px;flex:none;background:#f0b25c;-webkit-mask:${MASK(P.pin)} center/contain no-repeat;mask:${MASK(P.pin)} center/contain no-repeat}
#u3loc[hidden]{display:none}
#u3fx{position:absolute;inset:0;z-index:0;pointer-events:none;background:radial-gradient(ellipse 75% 70% at 50% 45%,transparent 55%,rgba(4,5,9,.5) 100%),linear-gradient(to top,rgba(4,5,9,.55),transparent 24%)}
#u3fx.night{background:radial-gradient(ellipse 75% 70% at 50% 45%,transparent 50%,rgba(4,5,12,.62) 100%),linear-gradient(to top,rgba(4,5,9,.6),transparent 26%),linear-gradient(to bottom,rgba(8,12,28,.35),transparent 30%)}
#u3fx[hidden]{display:none}
/* cột nút bên phải */
body.u3 #phoneBtn,body.u3 .tbtns button{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;width:64px;height:64px;padding:0;box-sizing:border-box;border-radius:10px;background:rgba(10,12,18,.8);border:1px solid rgba(239,232,216,.16);color:#e6dfcf;font:inherit;font-size:11.5px;line-height:1.1;text-align:center;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);cursor:pointer;position:relative}
body.u3 .tbtns button[hidden]{display:none}
body.u3 #phoneBtn:hover,body.u3 .tbtns button:hover{border-color:#f0b25c;color:#fff;background:rgba(20,22,30,.9)}
body.u3 #phoneBtn::before,body.u3 .tbtns button::before{content:"";width:22px;height:22px;flex:none;background:currentColor}
body.u3 #phoneBtn::before{-webkit-mask:${MASK(P.phone)} center/contain no-repeat;mask:${MASK(P.phone)} center/contain no-repeat}
body.u3 #exitBtn::before{-webkit-mask:${MASK(P.back)} center/contain no-repeat!important;mask:${MASK(P.back)} center/contain no-repeat!important}
body.u3 #waitBtn::before{-webkit-mask:${MASK(P.clock)} center/contain no-repeat!important;mask:${MASK(P.clock)} center/contain no-repeat!important}
body.u3 #sleepBtn::before{-webkit-mask:${MASK(P.bed)} center/contain no-repeat!important;mask:${MASK(P.bed)} center/contain no-repeat!important}
body.u3 #exitBtn{color:#f0b25c!important;border-color:rgba(240,178,92,.6)!important}
body.u3 #phoneBtn b{position:absolute;top:-4px;right:-4px;min-width:0;width:12px;height:12px;padding:0;margin:0;border-radius:50%;font-size:0;background:#e2453c;border:2px solid #0a0c12}
body.u3 #phoneBtn b[hidden]{display:none}
body.u3 #phoneBtn{position:absolute;top:12px;right:12px;z-index:5}
body.u3 .tbtns{position:absolute;top:84px;right:12px;left:auto;display:flex;flex-direction:column;gap:8px;max-width:none;background:none!important;border:0!important;padding:0!important;z-index:5}
body.u3 .tbtns button+button{border-radius:10px!important;border-left-color:rgba(239,232,216,.16)}
body.u3 .pan.r{top:62%}body.u3 .pan.l{top:62%}
#u3mb,#u3menu{display:none}
/* máy tính: khung chơi lớn hơn theo chiều cao màn hình */
body.u3d #app{max-width:min(1680px,calc((100dvh - 132px) * 16 / 9 + 32px))}
body.u3d .keys .loc{display:none}
/* ---- điện thoại (dọc + ngang): tranh tràn màn hình ---- */
body.u3m .top{display:none!important}
body.u3m{margin:0!important;overflow:hidden}
body.u3m #app{padding:0!important;max-width:none!important;height:100dvh;display:block}
body.u3m #stage{height:100dvh!important;width:100%;aspect-ratio:auto!important;border-radius:0!important}
body.u3m #stage::after{display:none}
body.u3m #dock,body.u3m .keys{display:none!important}
body.u3m .hud{left:max(10px,env(safe-area-inset-left));top:max(10px,env(safe-area-inset-top));max-width:calc(100% - 90px);gap:8px}
body.u3m .hud .chips{display:inline-flex;flex-wrap:nowrap;white-space:nowrap}
body.u3m .hud .chip{font-size:12.5px;padding:6px 8px}
body.u3m #hNghi{font-size:11px;padding:6px 7px}body.u3m #hNghi b{width:34px!important;margin-left:4px}
body.u3m #u3obj{width:auto;max-width:300px;align-self:flex-start;font-size:13.5px}
body.u3m #u3obj.min{width:max-content}
body.u3m #u3obj .u3h{padding:7px 11px;font-size:13px}
body.u3m #u3mb{display:grid;place-items:center;position:absolute;top:max(10px,env(safe-area-inset-top));right:max(10px,env(safe-area-inset-right));z-index:6;width:42px;height:42px;border-radius:10px;background:rgba(10,12,18,.8);border:1px solid rgba(239,232,216,.16);color:#efe8d8;cursor:pointer;padding:0}
body.u3m #u3mb svg{width:22px;height:22px}
body.u3m #u3menu{position:fixed;z-index:45;top:calc(max(10px,env(safe-area-inset-top)) + 50px);right:max(10px,env(safe-area-inset-right));background:rgba(12,14,22,.96);border:1px solid rgba(239,232,216,.16);border-radius:12px;padding:8px;box-shadow:0 14px 40px rgba(0,0,0,.6);max-height:70dvh;overflow:auto}
body.u3m #u3menu.on{display:block}
body.u3m #u3menu .r{display:flex!important;flex-direction:column;align-items:stretch;gap:4px!important;visibility:visible!important}
body.u3m #u3menu .r>*{width:auto!important;height:auto!important;min-width:0!important;justify-content:flex-start;gap:10px;padding:9px 12px!important;border-radius:8px!important;font-size:14px!important;text-align:left;display:flex;align-items:center}
body.u3m #u3menu .r>[hidden]{display:none!important}
body.u3m #u3menu .r .lb{display:inline!important;position:static!important;opacity:1!important;transform:none!important;pointer-events:none;background:none!important;padding:0!important;font-size:14px!important;color:inherit!important;border:0!important;box-shadow:none!important}
body.u3m #u3menu #hAct{display:block!important;color:#9aa2b5;font-size:12.5px;padding:4px 12px 8px!important;border-bottom:1px solid rgba(239,232,216,.1);margin-bottom:4px}
body.u3m #acctBtn .tx{display:inline!important}
body.u3m #phoneBtn,body.u3m .tbtns button{width:46px!important;height:46px!important;border-radius:50%!important;font-size:0!important;line-height:0!important;color:transparent!important;gap:0;padding:0!important}
body.u3m #phoneBtn::before,body.u3m .tbtns button::before{width:21px;height:21px;background:#e6dfcf}
body.u3m #exitBtn::before{background:#f0b25c}
body.u3m #exitBtn{color:transparent!important}
body.u3m #phoneBtn{top:calc(max(10px,env(safe-area-inset-top)) + 54px)!important;bottom:auto!important;left:auto!important;right:max(10px,env(safe-area-inset-right))!important}
body.u3m .tbtns{top:calc(max(10px,env(safe-area-inset-top)) + 110px)!important;bottom:auto!important;left:auto!important;right:max(10px,env(safe-area-inset-right))!important;gap:10px;flex-wrap:nowrap}
body.u3m #u3loc{left:max(10px,env(safe-area-inset-left));bottom:max(12px,env(safe-area-inset-bottom));font-size:12.5px}
body.u3m.tail .pad{position:fixed;left:max(10px,env(safe-area-inset-left));right:max(10px,env(safe-area-inset-right));bottom:max(10px,env(safe-area-inset-bottom));z-index:12;margin:0}
body.u3m.tail #u3loc{display:none}
body.u3mp .dlg{top:auto!important;bottom:0!important;max-height:52dvh!important;overflow-y:auto}
body.u3ml .hud{max-width:calc(100% - 150px)}
body.u3ml #u3obj{max-width:320px;font-size:12.5px}
body.u3ml #u3obj .u3h{padding:6px 10px;font-size:12.5px}
body.u3ml #u3obj .u3b{max-height:calc(100dvh - 150px);overflow:auto}
body.u3ml #phoneBtn,body.u3ml .tbtns button{width:42px!important;height:42px!important}
body.u3ml #phoneBtn{top:calc(max(8px,env(safe-area-inset-top)) + 50px)!important}
body.u3ml .tbtns{top:calc(max(8px,env(safe-area-inset-top)) + 100px)!important;gap:8px}
body.u3ml .dlg{max-height:58dvh!important;overflow-y:auto}
/* đang mở điện thoại / mini-game thì giấu lớp nổi */
#app:has(#phone:not([hidden])) #u3mb,#app:has(#game:not([hidden])) #u3mb{display:none!important}
body.u3:has(#phone:not([hidden])) #phoneBtn,body.u3:has(#phone:not([hidden])) .tbtns{visibility:hidden}
body.u3m #u3menu #musBtn::after{content:"Nhạc nền";font-size:14px}
#app:has(#phone:not([hidden])) #u3loc,#app:has(#game:not([hidden])) #u3loc,body:has(#dlg:not([hidden])) #u3loc{display:none}
body:has(#cover:not([hidden])) #u3obj,body:has(#cover:not([hidden])) #u3loc,body:has(#cover:not([hidden])) #u3mb{display:none}
`;
const st=document.createElement('style'); st.id='u3css'; st.textContent=css; document.head.appendChild(st);
document.body.classList.add('u3');

/* phần tử mới */
const stage=$('stage'), hudEl=document.querySelector('.hud');
const fx=document.createElement('div'); fx.id='u3fx'; const cvEl=$('cv'); cvEl.after(fx);
const loc=document.createElement('div'); loc.id='u3loc'; stage.appendChild(loc);
const ob=document.createElement('div'); ob.id='u3obj'; ob.hidden=true; hudEl.appendChild(ob);
const mb=document.createElement('button'); mb.type='button'; mb.id='u3mb'; mb.setAttribute('aria-label','Menu'); mb.innerHTML=SVG(P.menu); stage.appendChild(mb);
const menu=document.createElement('div'); menu.id='u3menu'; document.body.appendChild(menu);
mb.onclick=e=>{ e.stopPropagation(); menu.classList.toggle('on'); };
document.addEventListener('click',e=>{ if(menu.classList.contains('on')&&!menu.contains(e.target)&&e.target!==mb) menu.classList.remove('on'); });
menu.addEventListener('click',e=>{ if(e.target.closest('button')) setTimeout(()=>menu.classList.remove('on'),50); });

/* chế độ màn hình */
const MQ={mp:matchMedia('(orientation:portrait) and (max-width:719px)'),ml:matchMedia('(orientation:landscape) and (max-height:540px)')};
function mode(){ if(MQ.mp.matches) return 'mp'; if(MQ.ml.matches) return 'ml'; if(typeof HUDV_DESK==='function'&&HUDV_DESK()) return 'd'; return 't'; }
let MODE='';
function undock(){ const d=$('dock'); if(!d||!d.dataset.on) return; delete d.dataset.on; const tb=document.querySelector('.tbtns');
  hudEl.insertBefore($('hObj'),ob); hudEl.insertBefore($('goMain'),ob); stage.insertBefore(tb,stage.querySelector('.sus')); stage.insertBefore($('phoneBtn'),stage.querySelector('.sus')); d.innerHTML=''; }
function layout(){ const m=mode(); const B=document.body.classList;
  B.toggle('u3d',m==='d'); B.toggle('u3mp',m==='mp'); B.toggle('u3ml',m==='ml'); B.toggle('u3m',m==='mp'||m==='ml');
  undock();
  const r=document.querySelector('#app .top .r')||menu.querySelector('.r'), top=document.querySelector('#app .top');
  if(r&&top){ if((m==='mp'||m==='ml')&&r.parentNode!==menu) menu.appendChild(r); else if(m!=='mp'&&m!=='ml'&&r.parentNode!==top) top.appendChild(r); }
  if(m!==MODE){ const was=MODE; MODE=m; if(was) { minUser=null; } } }
MQ.mp.addEventListener('change',()=>setTimeout(()=>{ layout(); try{ hud(); }catch(e){} },0));
MQ.ml.addEventListener('change',()=>setTimeout(()=>{ layout(); try{ hud(); }catch(e){} },0));
addEventListener('resize',()=>layout());

/* thẻ mục tiêu */
let minUser=null, areaKey='', autoT=0;
const isMob=()=>MODE==='mp'||MODE==='ml';
function hintOf(){ if(typeof nearestMain!=='function'||busy) return null; if(S.scene!=='street'&&S.scene!=='in') return null; const h=nearestMain(); if(!h) return null;
  let t; if(S.scene==='street'&&Math.abs(h.x-PL.x)>140) t='Đi tới '+h.l+'.'; else if(h.kind==='npc') t='Bấm vào '+h.l+' để nói chuyện.'; else if(h.kind==='door') t='Vô '+h.l+'.'; else t='Xem '+h.l.charAt(0).toLowerCase()+h.l.slice(1)+'.';
  if(h.main>1) t+=' Ở đó có '+h.main+' việc chính.'; return {t,h}; }
function objHtml(){ const txt=String(objective()||''); const L=txt.split('\n').map(s=>s.trim()).filter(Boolean); if(!L.length) return null;
  let sub=(($('hAct')&&$('hAct').textContent)||'').replace(/^Hồi \d+\s*·\s*/,'');
  if(/^(Ca sáng|Giờ cơm|Ca chiều|Giờ ra sân|Tắt đèn|Đêm)/.test(L[0])) sub=L.shift();
  const body=L.filter(s=>!/chỗ có việc chính|^Bấm người|^Bấm vào người/.test(s));
  const hn=hintOf(); const nm=typeof mainSpots==='function'?mainSpots().reduce((n,h)=>n+(h.main||0),0):0;
  return '<div class="u3h"><span class="u3ic">'+SVG(P.doc)+'</span>Mục tiêu hiện tại'+(nm?'<span class="u3n">'+nm+'</span>':'')+'<span class="u3cv">'+SVG(P.chev)+'</span></div>'+
   '<div class="u3b">'+(sub?'<div class="u3sub"><span class="u3ic">'+SVG(P.doc)+'</span>'+esc(sub)+'</div>':'')+'<div class="u3bd">'+body.map(s=>'<p>'+esc(s)+'</p>').join('')+'</div>'+
   (hn?'<div class="u3hint" role="button" tabindex="0"><span class="u3ic">'+SVG(P.bulb)+'</span><div><b>Gợi ý:</b>'+esc(hn.t)+'</div></div>':'')+'</div>'; }
ob.addEventListener('click',e=>{ e.stopPropagation(); if(e.target.closest('.u3hint')){ ac&&ac(); const h=hintOf(); if(h&&!busy) tapSpot(h.h); return; }
  if(e.target.closest('.u3h')){ minUser=!ob.classList.contains('min'); ob.classList.toggle('min',minUser); clearTimeout(autoT); } });
function objUpd(){ const html=started&&!S.ended?objHtml():null; if(!html){ ob.hidden=true; return; }
  if(ob.dataset.h!==html){ ob.innerHTML=html; ob.dataset.h=html; }
  const k=[typeof P2!=='undefined'&&P2.on?P2.map:'p1',S.scene,S.room||'',S.place||''].join('|');
  if(k!==areaKey){ areaKey=k; minUser=null; }
  ob.classList.toggle('min',minUser===null?isMob():minUser); ob.hidden=false; }

function u3Upd(){ layout(); objUpd();
  const showLoc=started&&!S.ended&&(S.scene==='street'||S.scene==='in'||S.scene==='room');
  loc.hidden=!showLoc; if(showLoc){ const t=typeof hudvLoc==='function'?hudvLoc():''; if(loc.textContent!==t) loc.textContent=t; }
  const night=hour()>=19||hour()<5; fx.hidden=!(S.scene==='street'||S.scene==='in'); fx.classList.toggle('night',night&&S.scene==='street');
  if(isMob()){ const hh=$('hHoi'), hd=$('hDay'); if(hh&&/^Hồi /.test(hh.textContent)) hh.textContent=hh.textContent.replace('Hồi ','H'); if(hd&&/^Ngày /.test(hd.textContent)) hd.textContent=hd.textContent.replace('Ngày ',''); }
  const xb=$('exitBtn'); if(xb&&xb.textContent.startsWith('‹ ')) xb.textContent=xb.textContent.slice(2); }
const hudU3=hud; hud=function(){ hudU3(); try{ u3Upd(); }catch(e){ console.warn('ui3',e); } };

/* thẻ người trong phòng: điện thoại thì xếp từ trái, chừa chỗ cho cột nút và ô vị trí */
const cardX0=cardX; cardX=function(R,i){ const x=cardX0(R,i); if(!isMob()) { if(MODE==='d') CARD.y=VH-CARD.h-74; return x; }
  const pres=(R.npc||[]).filter(k=>npcInRoom(k)===R.house||R.always); const j=Math.max(0,pres.indexOf((R.npc||[])[i]));
  CARD.y=VH-CARD.h-(MODE==='mp'?120:96); return 24+CARD.w/2+j*(CARD.w+12); };

/* biểu tượng điểm tương tác: ! việc chính · kính lúp đồ vật · người · bong bóng thoại phụ */
function badge(x,y,k){ g.save(); g.fillStyle='rgba(10,12,18,.8)'; g.strokeStyle='rgba(240,178,92,.85)'; g.lineWidth=2; g.beginPath(); g.arc(x,y,19,0,7); g.fill(); g.stroke();
  g.translate(x-11,y-11); g.scale(22/24,22/24); g.strokeStyle='#f0b25c'; g.lineWidth=2; g.lineCap='round'; g.lineJoin='round'; g.stroke(cpath(k)); g.restore(); }
drawMarkers=function(){ if(typeof drawEdges==='function') drawEdges(); if(busy||SO.on) return; const off=S.scene==='street'?cam:0;
  for(const h of hotspots()){ if(h.kind==='cat') continue;
    const y=h.kind==='obj'||h.kind==='exit'||h.inroom?h.y-h.h/2-30:(h.kind==='door'||h.id==='phong'||h.id==='ngo'?GROUND-250:NFEET-h.h-38); const x=h.x-off; const b=Math.sin(tsec*4)*3;
    const side=h.sides.length||h.sidesN;
    if(h.main){ g.save(); const p=(tsec*1.2)%1; g.strokeStyle='rgba(240,178,92,'+(.55*(1-p))+')'; g.lineWidth=3; g.beginPath(); g.arc(x,y+b,18+p*14,0,7); g.stroke();
      g.fillStyle='#f0b25c'; g.shadowColor='rgba(240,178,92,.7)'; g.shadowBlur=16; g.beginPath(); g.arc(x,y+b,18,0,7); g.fill(); g.shadowBlur=0;
      g.fillStyle='#21170a'; g.font='800 23px "Be Vietnam Pro",system-ui'; g.textAlign='center'; g.textBaseline='middle'; g.fillText('!',x,y+b+1); g.restore(); }
    else if(side) badge(x,y,'chat');
    else if(h.ngoai) badge(x,y,h.kind==='npc'?'chat':'search');
    else if(h.kind==='npc') badge(x,y,'person');
    else if(h.kind==='obj') badge(x,y,'search');
    else if(h.kind==='exit'){ g.strokeStyle='rgba(240,178,92,.5)'; g.lineWidth=2; g.beginPath(); g.arc(x,y+20,7,0,7); g.stroke(); }
    if(hover&&hover.id===h.id){ const bits=[]; if(h.main) bits.push(h.main+' việc chính'); if(h.ngoai) bits.push(h.ngoai+' việc ngoài luồng'); if(side) bits.push(side+' việc phụ'); pill(x,y-52,h.l+(bits.length?' · '+bits.join(', '):''),h.main?'#f0b25c':'#cfd6f0'); } } };

/* mũi tên chỉ việc chính ngoài khung: hạ xuống giữa tranh cho khỏi đè thẻ mục tiêu */
drawEdges=function(){ EDGE=[]; if(S.scene!=='street'||busy||SO.on) return; const L=mainSpots(); let nl=0, nr=0, nn=0;
  for(const h of L){ const x=h.x-cam; if(x>30&&x<VW-30) continue; const left=x<=30, y=VH*.5+(VW<900?nn++:(left?nl++:nr++))*46; const txt=left?'‹ ! '+h.l:h.l+' ! ›';
    g.font='700 17px "Be Vietnam Pro",system-ui'; const w=g.measureText(txt).width+26, bx=left?8:VW-8-w, b=Math.sin(tsec*4)*3;
    g.fillStyle='rgba(240,178,92,.95)'; g.beginPath(); if(g.roundRect) g.roundRect(bx+(left?-b:b),y,w,34,17); else g.rect(bx,y,w,34); g.fill();
    g.fillStyle='#1a1408'; g.textAlign='left'; g.textBaseline='middle'; g.fillText(txt,bx+13+(left?-b:b),y+18); g.textBaseline='alphabetic';
    EDGE.push({x:bx,y,w,h:34,spot:h}); } };

hudvObj=function(){};
layout(); try{ hud(); }catch(e){}
})();
