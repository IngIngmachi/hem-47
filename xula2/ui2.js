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

/* khung chơi máy tính: phần dùng chung nằm trong index.html (hudDeco). Ở đây chỉ gọi lại sau khi Phần 2 vẽ xong hud. */
const hudUi=hud;
hud=function(){ hudUi(); if(typeof hudDeco==='function') hudDeco(); };
