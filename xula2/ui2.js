/* Hẻm 47 · Phần 2 — giao diện trò chơi: nền cảnh mờ phủ kín, giấy, thẻ dán băng keo.
   Chỉ đổi cách trình bày; luật chơi nằm ở games2.js. */
'use strict';
(()=>{ const st=document.createElement('style'); st.textContent=`
#game.p2full{background:#07080c;padding:0;overflow:hidden}
#game.p2full::before{content:"";position:absolute;inset:-24px;background:var(--p2bg,none) center/cover no-repeat;filter:blur(3px) brightness(.36) saturate(.8);z-index:0}
#game.p2full::after{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,rgba(0,0,0,0) 35%,rgba(0,0,0,.7));pointer-events:none;z-index:0}
#game.p2full .box{position:relative;z-index:1;width:min(1200px,100%);height:100%;max-height:100%;overflow-y:auto;background:none;border:none;border-radius:0;padding:22px max(18px,3vw) 28px;box-sizing:border-box}
#game.p2full .p2g{max-width:none;position:relative}
#game.p2full .p2g h3{font-family:"Newsreader",Georgia,serif;font-weight:600;font-size:clamp(22px,2.8vw,34px);letter-spacing:.05em;text-transform:uppercase;color:#f0b25c;text-shadow:0 2px 14px rgba(0,0,0,.7);margin:0 120px 6px 0;text-wrap:balance}
#game.p2full .p2g>.tip,#game.p2full .p2g>p{color:#e6dfcf;font-size:15px;text-shadow:0 1px 6px rgba(0,0,0,.8)}
#game.p2full .p2g .p2x{position:absolute;right:0;top:0;float:none;margin:0;font-size:15px;padding:9px 18px;background:rgba(10,12,18,.55);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);color:#efe8d8;border:1px solid rgba(239,232,216,.35)}
#game.p2full .btn.p2main,#game.p2full .btn:not(.ghost){box-shadow:0 6px 18px rgba(0,0,0,.45)}
#game.p2full .btn.ghost{background:rgba(10,12,18,.5);border-color:rgba(239,232,216,.3);color:#efe8d8}
/* thẻ giấy */
#game.p2full .p2card{position:relative;background:#e9dec3;background-image:linear-gradient(160deg,rgba(255,255,255,.35),rgba(120,90,40,.14));color:#2a2219;font-family:"Newsreader",Georgia,serif;font-weight:600;font-size:15.5px;line-height:1.3;border-radius:2px;padding:14px 16px 12px;box-shadow:0 8px 18px rgba(0,0,0,.5);max-width:220px}
#game.p2full .p2card::before{content:"";position:absolute;top:-9px;left:50%;width:48px;height:17px;transform:translateX(-50%) rotate(-4deg);background:rgba(232,222,186,.6);box-shadow:0 1px 2px rgba(0,0,0,.25)}
#game.p2full .p2tray .p2card:nth-child(3n+1){transform:rotate(-2.2deg)}#game.p2full .p2tray .p2card:nth-child(3n+2){transform:rotate(1.6deg)}#game.p2full .p2tray .p2card:nth-child(3n){transform:rotate(-.6deg)}
#game.p2full .p2card.lock{background:#5d5a53;background-image:none;color:#2a2722;font-style:italic}
#game.p2full .p2card.drag{transform:rotate(-3deg) scale(1.06)}
#game.p2full .p2hint{outline:3px solid #f0b25c;outline-offset:4px;animation:p2hint .7s ease-in-out 3}
@keyframes p2hint{50%{outline-color:rgba(240,178,92,.15)}}
@media (prefers-reduced-motion:reduce){#game.p2full .p2hint{animation:none}}
/* bàn để thẻ */
#game.p2full .p2tray{background:rgba(36,26,16,.55);background-image:radial-gradient(rgba(255,255,255,.04) 1px,transparent 1px);background-size:6px 6px;border:1px solid rgba(240,178,92,.2);border-radius:6px;padding:22px 18px 18px;gap:22px 18px;min-height:110px;box-shadow:inset 0 0 50px rgba(0,0,0,.6)}
#game.p2full .p2trayhd{color:#cfc8b8}#game.p2full .p2trayhd button{color:#e6dfcf;border:1px solid rgba(239,232,216,.3);border-radius:999px;padding:5px 12px;background:rgba(10,12,18,.45)}#game.p2full .p2trayhd button:disabled{opacity:.4}
/* ô trống */
#game.p2full .p2slot{background:rgba(234,223,196,.08);border:2px dashed rgba(234,223,196,.45);color:#cfc5ad;font-family:"Newsreader",Georgia,serif;border-radius:4px}
#game.p2full .p2slot.hot{background:rgba(240,178,92,.18);border-color:#f0b25c}
#game.p2full .p2slot .p2card{transform:none;max-width:none;width:100%;box-sizing:border-box;text-align:center}
#game.p2full .p2slot .p2card::before{display:none}
/* chuỗi bước (dòng tiền) */
#game.p2full .p2steps{gap:10px;margin:18px 0 8px}
#game.p2full .p2steps .st{background:#e3d6b8;background-image:linear-gradient(170deg,rgba(255,255,255,.3),rgba(110,80,40,.18));padding:30px 12px 14px;border-radius:2px;box-shadow:0 10px 22px rgba(0,0,0,.5);position:relative;min-width:150px}
#game.p2full .p2steps .st:nth-child(4n+1){transform:rotate(-1deg)}#game.p2full .p2steps .st:nth-child(4n+3){transform:rotate(.8deg)}
#game.p2full .p2steps .st>i{position:absolute;top:-14px;left:50%;transform:translateX(-50%);width:32px;height:32px;font-size:15px;border:2px solid #2a2219;box-shadow:0 2px 6px rgba(0,0,0,.4)}
#game.p2full .p2steps .st .p2slot{background:rgba(40,36,30,.55);border-color:rgba(40,30,20,.45);color:#d9ceb2;min-height:70px}
#game.p2full .p2steps .p2fixed{background:none;color:#2a2219;font-family:"Newsreader",Georgia,serif;font-size:16px;min-height:70px}
#game.p2full .p2steps .ar{font-size:26px;color:#f0b25c;margin-top:40px;text-shadow:0 2px 8px rgba(0,0,0,.6)}
/* sơ đồ, giấy rách */
#game.p2full .p2plan{box-shadow:0 18px 50px rgba(0,0,0,.6);border-radius:8px}
#game.p2full .p2paper{background:rgba(234,223,196,.08);border:2px dashed rgba(234,223,196,.35);width:min(300px,100%)}
#game.p2full .p2piece{box-shadow:0 8px 16px rgba(0,0,0,.55)}
/* lịch tuần tra: cột thẻ bên trái, tờ lịch bên phải */
#game.p2full .p2g[data-g="lichtuan"]{display:grid;grid-template-columns:minmax(200px,240px) 1fr;grid-template-areas:"h h" "tip tip" "tray tl" "m m" "row row";column-gap:26px;align-items:start}
#game.p2full .p2g[data-g="lichtuan"]>h3{grid-area:h}#game.p2full .p2g[data-g="lichtuan"]>.tip:not(#ltm){grid-area:tip}#game.p2full .p2g[data-g="lichtuan"]>.p2tl{grid-area:tl}#game.p2full .p2g[data-g="lichtuan"]>#tray{grid-area:tray}#game.p2full .p2g[data-g="lichtuan"]>#ltm{grid-area:m}#game.p2full .p2g[data-g="lichtuan"]>.row{grid-area:row}
#game.p2full .p2g[data-g="lichtuan"]>#tray{flex-direction:column;flex-wrap:nowrap;align-items:stretch;margin-top:8px;padding:34px 14px 16px;gap:14px;position:relative}
#game.p2full .p2g[data-g="lichtuan"]>#tray::before{content:"Ca trực · kéo thả";position:absolute;top:10px;left:14px;font:500 13px "Be Vietnam Pro",sans-serif;color:#cfc8b8;letter-spacing:.04em}
#game.p2full .p2g[data-g="lichtuan"] .p2card{max-width:none;font-family:"Playpen Sans","Comic Sans MS",cursive;font-weight:400;font-size:15px;transform:none!important}
#game.p2full .p2g[data-g="lichtuan"] .p2card[data-card^="t1"]{background:#e9b867}#game.p2full .p2g[data-g="lichtuan"] .p2card[data-card^="t2"]{background:#a9b9cf}#game.p2full .p2g[data-g="lichtuan"] .p2card[data-card^="t3"]{background:#b3cb93}
#game.p2full .p2g[data-g="lichtuan"] .p2card.lock{background:#5d5a53}
#game.p2full .p2tl{position:relative;background:#e8dec6;background-image:linear-gradient(175deg,rgba(255,255,255,.35),rgba(120,90,40,.15));padding:62px 22px 22px;border-radius:2px;box-shadow:0 18px 40px rgba(0,0,0,.6);transform:rotate(-.4deg);color:#3a2f22;gap:4px;grid-template-columns:64px repeat(10,1fr);font-family:"Playpen Sans","Comic Sans MS",cursive;font-size:13px}
#game.p2full .p2tl::before{content:"LỊCH TUẦN TRA";position:absolute;top:16px;left:50%;transform:translateX(-50%);font:600 24px "Playpen Sans","Comic Sans MS",cursive;letter-spacing:.06em;color:#2a2219;border-bottom:2px solid rgba(42,34,25,.5);padding:0 18px 2px;white-space:nowrap}
#game.p2full .p2tl .cell{height:48px;border-radius:2px;background:repeating-linear-gradient(45deg,rgba(90,70,40,.13) 0 2px,transparent 2px 8px);border:1px solid rgba(90,70,40,.28)}
#game.p2full .p2tl .cell.g[data-slot="r0"]{background:#e9b867;border-color:#b98a3c}#game.p2full .p2tl .cell.g[data-slot="r1"]{background:#a9b9cf;border-color:#7a8ca6}#game.p2full .p2tl .cell.g[data-slot="r2"]{background:#b3cb93;border-color:#86a065}
#game.p2full .p2tl .cell.hot,#game.p2full .p2tl .p2slot.hot{outline:2px solid #b8322a}
#game.p2full .p2tl .col{text-align:center;color:#3a2f22;padding:4px 0;border-radius:50%}
#game.p2full .p2tl .col.pick{outline:3px solid #b8322a;outline-offset:-2px;color:#b8322a;font-weight:700}
#game.p2full .p2tl>div:not(.cell):not(.col){font-size:16px;font-weight:600;color:#2a2219}
@media (max-width:620px){#game.p2full .p2steps .st{padding:12px 12px 12px 52px;min-height:0;transform:none!important}#game.p2full .p2steps .st>i{left:12px;top:50%;transform:translateY(-50%)}#game.p2full .p2steps .st .p2slot,#game.p2full .p2steps .p2fixed{min-height:46px}#game.p2full .p2steps .ar{margin:0 0 0 18px;font-size:18px}#game.p2full .p2g h3{font-size:22px}}
@media (max-width:760px){#game.p2full .p2g[data-g="lichtuan"]{grid-template-columns:1fr;grid-template-areas:"h" "tip" "tl" "tray" "m" "row"}#game.p2full .p2g[data-g="lichtuan"]>#tray{flex-direction:row;flex-wrap:wrap}#game.p2full .p2tl{padding:54px 10px 12px;font-size:11px;grid-template-columns:44px repeat(10,1fr)}#game.p2full .p2tl .cell{height:36px}#game.p2full .p2g h3{margin-right:100px}}
/* trò nhỏ ban đêm: bỏ khung đen, để nền cảnh lộ ra */
#game.p2full .dd2 .mg{background:transparent}
#game.p2full .dd2 .mg canvas{box-shadow:0 18px 50px rgba(0,0,0,.65),0 0 0 1px rgba(239,232,216,.15)}
#game.p2full .dd2 .mg .mgt{background:rgba(10,12,18,.55);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);color:#efe8d8}
#game.p2full .dd2 .mg .mgb button{background:rgba(10,12,18,.6);border-color:rgba(239,232,216,.3)}
#game.p2full .dd2 .mg .mgb button.main{background:#f0b25c;border-color:#f0b25c;color:#1d1d1d}
`; document.head.appendChild(st); })();

/* nền cảnh cho từng trò */
const P2GBG={sodo:'x2-trai-matcat',lichtuan:'x2-tang3',dongtien1:'trong-phong3-dem',dongtien:'x2-tang3',ghepgiay:'hem-dem',giaitin:'x2-trong-taphoa',giaitin2:'trong-phong3-dem',tinvao:'x2-buong-tam',giauchu:'trong-phong3-dem',gui:'x2-buong-tam',nghetieng:'trong-phong3-dem',danhsach:'x2-phong-ngu',goive:'x2-goi-ve',maytram:'x2-maytram',mothung:'x2-mg-thung'};
Object.keys(P2GAMES).forEach(k=>{ const f=P2GAMES[k]; if(typeof f!=='function') return; P2GAMES[k]=async function(...a){ const ob=window.__p2bg, og=window.__p2g; window.__p2bg=P2GBG[k]||null; window.__p2g=k; try{ return await f.apply(this,a); } finally{ window.__p2bg=ob; window.__p2g=og; } }; });
const miniThangUi=miniThang;
miniThang=function(muc){ const ob=window.__p2bg, og=window.__p2g; window.__p2bg=(typeof MGIMG!=='undefined'&&MGIMG[muc])||null; window.__p2g='mini'; return miniThangUi(muc).finally(()=>{ window.__p2bg=ob; window.__p2g=og; }); };
const sneakUi=sneak;
sneak=function(cfg){ const ob=window.__p2bg; window.__p2bg=cfg&&cfg.mode==='cuu'?'x2-bo-song-dem':null; return sneakUi(cfg).finally(()=>{ window.__p2bg=ob; }); };
const boardUi=board;
board=function(vu){ const ob=window.__p2bg; window.__p2bg=vu==='xocl'?'x2-phong-ngu':'trong-phong3-dem'; return Promise.resolve(boardUi(vu)).finally(()=>{ window.__p2bg=ob; }); };
if(typeof caNhan==='function'){ const caNhanUi=caNhan; caNhan=function(...a){ const ob=window.__p2bg; window.__p2bg='x2-phong-may'; return Promise.resolve(caNhanUi.apply(this,a)).finally(()=>{ window.__p2bg=ob; }); }; }

/* =====================================================================
   Khung chơi Phần 2 (máy tính): thanh trạng thái, thẻ mục tiêu, nút hành động có biểu tượng,
   thẻ người trong phòng xếp một hàng dưới, thanh dưới có vị trí + phím.
   Chỉ bật khi đang chơi Phần 2 (body.p2on); điện thoại dọc giữ giao diện cũ.
   ===================================================================== */
(()=>{ const ic=d=>"url(\"data:image/svg+xml,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+d+'</svg>')+"\")";
  const I={run:ic('<circle cx="14" cy="4" r="2"/><path d="M13 7l-3 5 4 3v6M10 12l-4 1M13 7l3 4 4 1M10 17l-3 4"/>'),clock:ic('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),bed:ic('<path d="M3 18V7M3 13h18v5M21 13v-2a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="10" r="2"/>'),phone:ic('<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>'),doc:ic('<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M9.5 12h6M9.5 15.5h6"/>'),pin:ic('<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>')};
  const st=document.createElement('style'); st.textContent=`
@media (min-width:900px) and (orientation:landscape){
body.p2on .hud{max-width:560px;gap:10px}
body.p2on .chips{flex-wrap:nowrap;white-space:nowrap}
body.p2on .chips{background:rgba(10,12,18,.78);border:1px solid rgba(239,232,216,.12);border-radius:10px;padding:6px 4px;gap:0;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);align-self:flex-start}
body.p2on .chip{background:none;border:none;border-right:1px solid rgba(239,232,216,.16);border-radius:0;padding:0 12px;font-size:14px;color:#e6dfcf}
body.p2on .chip:last-child{border-right:none}
body.p2on .chip.m{color:#f0b25c;font-weight:600}
body.p2on .chip.nghi b{display:inline-block;width:90px;height:7px;border-radius:4px;background:rgba(239,232,216,.2);vertical-align:middle;margin-left:8px;overflow:hidden}
body.p2on .chip.nghi b i{display:block;height:100%;background:#f0b25c}
body.p2on #hObj.p2o{width:440px;max-width:440px!important;box-sizing:border-box;background:rgba(10,12,18,.8);border:1px solid rgba(239,232,216,.14);border-radius:12px;padding:0;font-size:15px;line-height:1.55;color:#e6dfcf;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);pointer-events:auto;cursor:pointer;white-space:normal;box-shadow:0 10px 30px rgba(0,0,0,.45)}
body.p2on #hObj.p2o .oh{display:grid;grid-template-columns:28px 1fr 20px;gap:10px;align-items:center;padding:12px 14px 10px;border-bottom:1px solid rgba(239,232,216,.12)}
body.p2on #hObj.p2o .oh i{width:24px;height:28px;background:#e6c98f;-webkit-mask:${I.doc} center/contain no-repeat;mask:${I.doc} center/contain no-repeat}
body.p2on #hObj.p2o .oh b{display:block;font-family:"Newsreader",Georgia,serif;font-size:19px;letter-spacing:.05em;text-transform:uppercase;font-weight:600;color:#efe8d8;line-height:1.1}
body.p2on #hObj.p2o .oh small{display:block;font-size:12.5px;color:#9aa2b5}
body.p2on #hObj.p2o .oh em{font-style:normal;color:#9aa2b5;font-size:18px;transition:transform .2s;text-align:center}
body.p2on #hObj.p2o.min .oh em{transform:rotate(90deg)}
body.p2on #hObj.p2o .ob{padding:10px 16px 6px}
body.p2on #hObj.p2o .ob p{margin:0 0 8px}
body.p2on #hObj.p2o ul{list-style:none;margin:0;padding:4px 16px 12px;border-top:1px solid rgba(239,232,216,.08)}
body.p2on #hObj.p2o li{position:relative;padding:6px 0 6px 30px}
body.p2on #hObj.p2o li::before{content:"";position:absolute;left:0;top:9px;width:16px;height:16px;border-radius:50%;border:2px solid rgba(239,232,216,.55)}
body.p2on #hObj.p2o li.on{color:#f0b25c}
body.p2on #hObj.p2o li.on::before{border-color:#f0b25c;background:radial-gradient(#f0b25c 0 4px,transparent 5px)}
body.p2on #hObj.p2o.min .ob,body.p2on #hObj.p2o.min ul{display:none}
body.p2on .tbtns{top:12px;right:150px;gap:0;background:rgba(10,12,18,.8);border:1px solid rgba(239,232,216,.14);border-radius:12px;padding:5px;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}
body.p2on .tbtns button{display:flex;align-items:center;gap:9px;font-size:15px;padding:9px 16px;border:1px solid transparent;border-radius:9px;background:none;color:#e6dfcf}
body.p2on .tbtns button+button{border-left-color:rgba(239,232,216,.12);border-radius:0 9px 9px 0}
body.p2on .tbtns button::before{content:"";width:20px;height:20px;background:currentColor;flex:none}
body.p2on #exitBtn{color:#f0b25c!important;border-color:#f0b25c!important;background:rgba(240,178,92,.1)!important;border-radius:9px!important}
body.p2on #exitBtn::before{-webkit-mask:${I.run} center/contain no-repeat;mask:${I.run} center/contain no-repeat}
body.p2on #waitBtn::before{-webkit-mask:${I.clock} center/contain no-repeat;mask:${I.clock} center/contain no-repeat}
body.p2on #sleepBtn::before{-webkit-mask:${I.bed} center/contain no-repeat;mask:${I.bed} center/contain no-repeat}
body.p2on .tbtns button:hover{background:rgba(239,232,216,.08)}
body.p2on #phoneBtn{top:12px;right:12px;display:flex;align-items:center;gap:8px;font-size:15px;padding:12px 16px;border-radius:12px;background:rgba(10,12,18,.8);border-color:rgba(239,232,216,.14);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}
body.p2on #phoneBtn::before{content:"";width:18px;height:20px;background:#e6c98f;-webkit-mask:${I.phone} center/contain no-repeat;mask:${I.phone} center/contain no-repeat}
body.p2on .keys{display:flex;align-items:center;gap:22px;flex-wrap:wrap;border-top:1px solid rgba(239,232,216,.1);padding-top:10px;color:#cfc8b8;font-size:13.5px}
body.p2on .keys .loc{display:flex;align-items:center;gap:8px;font-size:17px;color:#efe8d8;margin-right:auto;font-family:"Newsreader",Georgia,serif}
body.p2on .keys .loc::before{content:"";width:18px;height:22px;background:#f0b25c;-webkit-mask:${I.pin} center/contain no-repeat;mask:${I.pin} center/contain no-repeat}
body.p2on .keys .k{display:flex;align-items:center;gap:8px}
body.p2on .keys kbd{border:1px solid rgba(239,232,216,.4);border-radius:5px;padding:2px 7px;font:500 12px "Be Vietnam Pro",sans-serif;color:#efe8d8;background:rgba(239,232,216,.06);margin:0 1px}
}`; document.head.appendChild(st); })();

const UI2_KEYS='<span class="k"><kbd>←</kbd><kbd>↑</kbd><kbd>↓</kbd><kbd>→</kbd> Di chuyển</span><span class="k"><kbd>E</kbd> Tương tác</span><span class="k"><kbd>1</kbd>–<kbd>6</kbd> Chọn</span><span class="k"><kbd>P</kbd> Điện thoại</span><span class="k"><kbd>Space</kbd> Tiếp tục</span><span class="k"><kbd>Esc</kbd> Đóng / rút</span>';
const UI2_DESK=()=>matchMedia('(min-width:900px) and (orientation:landscape)').matches;
function ui2Loc(){ if(S.scene==='in'&&S.room&&ROOMS[S.room]) return ROOMS[S.room].ten; if(S.scene==='place') return 'Ngoài đường'; return P2.map==='trai'?'Sân trại':'Hẻm 47 · Fan Xích Vô'; }
function ui2Obj(){ const el=$('hObj'); if(!el||el.hidden) return; const dock=$('dock'); if(dock&&dock.dataset.on){ el.classList.remove('p2o'); return; }
  const txt=el.textContent; if(el.dataset.src===txt&&el.classList.contains('p2o')) return; const L=txt.split('\n').map(s=>s.trim()).filter(Boolean); if(!L.length) return;
  let title='Việc cần làm', sub=($('hAct')&&$('hAct').textContent)||''; if(/^(Ca sáng|Giờ cơm|Ca chiều|Giờ ra sân|Tắt đèn|Đêm)/.test(L[0])){ const p=L.shift().split(' · '); title=p[0]; sub=p[1]||''; }
  const isChk=s=>/chỗ có việc chính|Bấm người|Việc ban đêm/.test(s); const body=L.filter(s=>!isChk(s)), chk=L.filter(isChk);
  el.innerHTML='<div class="oh"><i></i><div><b>'+esc(title)+'</b>'+(sub?'<small>'+esc(sub)+'</small>':'')+'</div><em>›</em></div>'+(body.length?'<div class="ob">'+body.map(s=>'<p>'+esc(s)+'</p>').join('')+'</div>':'')+(chk.length?'<ul>'+chk.map((s,i)=>'<li class="'+(i===0?'on':'')+'">'+esc(s)+'</li>').join('')+'</ul>':'');
  el.dataset.src=txt; el.classList.add('p2o'); }
const hudUi=hud;
hud=function(){ hudUi(); document.body.classList.toggle('p2on',!!(P2&&P2.on)); if(!P2||!P2.on) return; const desk=UI2_DESK();
  const k=document.querySelector('.keys'); if(k&&desk){ const h='<span class="loc">'+esc(ui2Loc())+'</span>'+UI2_KEYS; if(k.innerHTML!==h) k.innerHTML=h; }
  const xb=$('exitBtn'); if(xb&&desk&&xb.textContent.startsWith('‹ ')) xb.textContent=xb.textContent.slice(2);
  const el=$('hObj'); if(el){ el.dataset.src=''; if(desk) ui2Obj(); else el.classList.remove('p2o'); } };
/* thẻ người trong phòng: một hàng ở góc dưới bên trái */
const CARD0={w:CARD.w,h:CARD.h,y:CARD.y}; const cardXUi=cardX;
cardX=function(R,i){ if(!P2||!P2.on||!UI2_DESK()){ Object.assign(CARD,CARD0); return cardXUi(R,i); } CARD.w=116; CARD.h=150; CARD.y=VH-CARD.h-30; const pres=(R.npc||[]).filter(k=>npcInRoom(k)===R.house||R.always); const j=Math.max(0,pres.indexOf((R.npc||[])[i])); return 34+CARD.w/2+j*(CARD.w+14); };
