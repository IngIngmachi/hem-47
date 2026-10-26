/* Hẻm 47 · Phần 2 — trò chơi mới. Mở bằng '+game:ten' trong lời thoại, chạy trong khung #game của Phần 1.
   giaitin · giaitin2 · tinvao   đọc chữ đầu câu
   giauchu · gui                 tự gõ tin giấu chữ
   goive                         cuộc gọi về nhà (chọn câu có đồng hồ)
   ca                            ca nhắn tin lừa (cài lỗi để khách tỉnh)
   sodo                          kéo tên phòng vào sơ đồ trại
   ghepgiay                      ráp mảnh tờ rơi bị xé
   lichtuan                      kéo lượt tuần tra lên dòng thời gian, tìm khe hở
   dongtien1 · dongtien          kéo thẻ vào chuỗi dòng tiền
   nghetieng                     kéo thanh lọc tiếng để nghe tiếng nền
   danhsach                      tờ danh sách chuyển đi
   didem · cuu                   đi đêm trong trại / đêm dẫn người ra sông */
'use strict';
const bo=s=>String(s).normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D');
const P2CSS=`
#gameBox .p2g{max-width:760px;margin:0 auto;text-align:left}
#gameBox .p2g h3{margin:0 0 6px}
#gameBox .p2g .tip{color:#b9b3a6;font-size:14px;margin:0 0 12px;line-height:1.5}
#gameBox .p2g .row{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-top:12px}
.p2msg{background:#20263a;border:1px solid #2e3549;border-radius:12px;padding:12px 14px;line-height:1.7;margin:8px 0}
.p2msg.me{background:#2a3a2c;border-color:#3d5a40;margin-left:40px}
.p2msg.sys{background:none;border:none;color:#9aa2b5;font-size:13px;text-align:center;padding:4px}
.p2in{width:100%;box-sizing:border-box;font:inherit;font-size:18px;letter-spacing:.15em;text-transform:uppercase;background:#0f121b;color:#efe8d8;border:1px solid #2e3549;border-radius:10px;padding:10px}
.p2ta{width:100%;box-sizing:border-box;min-height:120px;font:inherit;font-size:15px;line-height:1.6;background:#0f121b;color:#efe8d8;border:1px solid #2e3549;border-radius:10px;padding:10px}
.p2acr{display:flex;gap:6px;justify-content:center;margin:10px 0}
.p2acr span{width:34px;height:40px;display:grid;place-items:center;border-radius:8px;border:1px solid #2e3549;font-weight:700;font-size:18px}
.p2acr .ok{background:#2f5a3a;border-color:#5fb37a}.p2acr .no{background:#5a2f2f;border-color:#e2645c}.p2acr .need{color:#6b7389}
.p2bad{color:#e2a35c;font-size:13px;margin:2px 0}
.p2frag{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}.p2frag button{font:inherit;font-size:13px;background:#20263a;color:#efe8d8;border:1px solid #2e3549;border-radius:8px;padding:6px 8px;cursor:pointer}
.p2frag b{color:#f0b25c}
.p2w{border-bottom:2px dashed #f0b25c;cursor:pointer}.p2w.loi{color:#e2645c;border-color:#e2645c}
.p2opt{background:#171b28;border:1px solid #2e3549;border-radius:12px;padding:10px 12px;margin:8px 0;line-height:1.6}
.p2opt small{display:block;color:#9aa2b5;font-size:12px;letter-spacing:.06em;text-transform:uppercase;margin-bottom:4px}
.p2tray{display:flex;flex-wrap:wrap;gap:8px;min-height:52px;padding:8px;border:1px dashed #2e3549;border-radius:10px;margin:10px 0}
.p2card{touch-action:none;user-select:none;-webkit-user-select:none;background:#efe8d8;color:#1d1d1d;border-radius:8px;padding:8px 10px;font-size:14px;font-weight:600;cursor:grab;box-shadow:0 2px 0 rgba(0,0,0,.35)}
.p2card.drag{position:fixed;z-index:99999;pointer-events:none;opacity:.92;transform:rotate(-2deg) scale(1.04)}
.p2card.lock{opacity:.35;cursor:not-allowed;background:#9a958a}
.p2slot{min-height:44px;border:2px dashed #4a5168;border-radius:10px;display:flex;align-items:center;justify-content:center;padding:4px;color:#6b7389;font-size:13px;transition:border-color .15s,background .15s}
.p2slot.hot{border-color:#f0b25c;background:rgba(240,178,92,.08)}
.p2slot.ok{border-color:#5fb37a;border-style:solid}.p2slot.bad{border-color:#e2645c;border-style:solid}
.p2plan{position:relative;width:100%;aspect-ratio:1672/941;background:#11151f;border-radius:12px;overflow:hidden}
.p2plan img{position:absolute;inset:0;width:100%;height:100%;object-fit:fill;opacity:.9}
.p2plan .p2slot{position:absolute;background:rgba(14,17,25,.86);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);border-color:rgba(240,178,92,.55);color:#efe8d8;text-shadow:0 1px 3px #000;align-items:flex-end;padding-bottom:8px}.p2plan .p2slot .p2card{font-size:12px;padding:5px 8px}
.p2chain{display:flex;align-items:center;gap:6px;flex-wrap:wrap;justify-content:center}
.p2chain .ar{color:#f0b25c;font-size:20px}
.p2chain .p2slot{min-width:130px}
.p2fixed{background:#f0b25c;color:#1d1d1d;border-radius:8px;padding:8px 10px;font-weight:700;font-size:14px}
.p2tl{display:grid;grid-template-columns:70px repeat(10,1fr);gap:3px;font-size:12px;color:#9aa2b5;align-items:center}
.p2tl .cell{height:40px;border-radius:6px;background:#171b28;border:1px solid #232a3d}
.p2tl .cell.g{background:#7a3a36;border-color:#e2645c}
.p2tl .col{cursor:pointer}.p2tl .col.pick{outline:2px solid #5fb37a}
.p2paper{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));grid-template-rows:repeat(2,minmax(0,1fr));gap:0;width:min(270px,100%);aspect-ratio:3/4;margin:0 auto;background:#1a1f2c;border-radius:6px;overflow:hidden}
.p2paper .p2slot{border-radius:0;border-width:1px;min-height:0;min-width:0;padding:0;overflow:hidden}
.p2piece{touch-action:none;width:96px;aspect-ratio:3/4;border-radius:3px;background-size:300% 200%;cursor:grab;box-shadow:0 2px 6px rgba(0,0,0,.5)}
.p2piece.drag{position:fixed;z-index:99999;pointer-events:none}
.p2paper .p2piece{width:100%;height:100%;aspect-ratio:auto;box-shadow:none;border-radius:0}
.p2wave{width:100%;height:120px;background:#0f121b;border-radius:10px;display:block}
.ng7{display:flex;flex-direction:column;gap:18px;margin-top:22px}
.ng7 .ngw{width:100%;height:clamp(80px,24vh,230px);display:block;border:1px solid rgba(227,176,91,.28);border-radius:10px;box-shadow:0 18px 40px rgba(0,0,0,.45)}
.ng7 .ngl{display:flex;align-items:center;gap:24px;font:500 15px/1 Newsreader,Georgia,serif;letter-spacing:.08em;text-transform:uppercase;color:#efe8d8;white-space:nowrap}
.ng7 .ngr{flex:1;-webkit-appearance:none;appearance:none;height:8px;border-radius:5px;background:linear-gradient(90deg,#c98b2e,#f0c071 var(--p,10%),rgba(255,255,255,.08) var(--p,10%));border:1px solid rgba(227,176,91,.35);outline:0;margin:0;cursor:pointer}
.ng7 .ngr::-webkit-slider-thumb{-webkit-appearance:none;width:30px;height:30px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#ffe2a6,#d9a04a 55%,#8a5b1f);border:2px solid #f6d79a;box-shadow:0 0 0 4px rgba(227,176,91,.18),0 4px 10px rgba(0,0,0,.6)}
.ng7 .ngr::-moz-range-thumb{width:28px;height:28px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#ffe2a6,#d9a04a 55%,#8a5b1f);border:2px solid #f6d79a}
.ng7 .ngr:focus-visible::-webkit-slider-thumb{box-shadow:0 0 0 6px rgba(227,176,91,.4)}
.ng7 .ngt{margin:0;min-height:2.4em;display:grid;place-items:center;padding:20px 18px;background:rgba(12,15,24,.85);border:1px solid rgba(227,176,91,.22);border-radius:10px;font:400 19px/1.45 Newsreader,Georgia,serif;color:#efe8d8;text-align:center;letter-spacing:.02em}
.ng7 .ngok{align-self:center;min-width:300px;padding:16px 40px;border:0;border-radius:10px;background:linear-gradient(180deg,#f3c77c,#d79b45);box-shadow:inset 0 1px 0 rgba(255,255,255,.45),0 10px 24px rgba(0,0,0,.45);color:#1b140a;font:600 22px/1 Newsreader,Georgia,serif;letter-spacing:.1em;text-transform:uppercase;cursor:pointer}
.ng7 .ngok:hover{filter:brightness(1.07)}
@media (max-height:520px){ .ng7{gap:8px;margin-top:8px}.ng7 .ngt{padding:8px 12px;font-size:15px;min-height:0}.ng7 .ngok{padding:10px 30px;font-size:17px} }
@media (max-width:760px){ .ng7{gap:12px;margin-top:12px}.ng7 .ngl{gap:12px;font-size:12.5px}.ng7 .ngt{font-size:16px;padding:12px}.ng7 .ngok{min-width:0;width:100%;font-size:18px;padding:14px} }
.p2rng{width:100%;margin:12px 0}
.p2timer{height:4px;background:#e2645c;border-radius:2px;transition:width linear;margin:0 0 6px}
.p2cardfull{position:fixed;inset:0;z-index:9000;background:#05060a;display:grid;place-items:center;opacity:0;transition:opacity .6s;cursor:pointer}
.p2cardfull.on{opacity:1}
.p2cardfull p{font-family:"IBM Plex Mono",monospace;color:#efe8d8;font-size:clamp(18px,3.4vw,30px);letter-spacing:.18em;text-align:center;white-space:pre-line;line-height:1.8;margin:0 16px}
body.p2lb::before,body.p2lb::after{content:"";position:fixed;left:0;right:0;height:7vh;background:#000;z-index:40;pointer-events:none;transition:height .5s}
body.p2lb::before{top:0}body.p2lb::after{bottom:0}
.dd2{position:relative;width:100%;max-width:1000px;margin:0 auto}
.dd2 canvas{width:100%;aspect-ratio:5/3;display:block;border-radius:10px;background:#0b0d14;touch-action:none}
.dd2 .ctl{display:flex;justify-content:space-between;gap:8px;margin-top:8px;flex-wrap:wrap}
.dd2 .ctl .g{display:flex;gap:6px;flex-wrap:wrap}
.dd2 button{font:inherit;font-size:15px;min-width:52px;min-height:46px;background:#20263a;color:#efe8d8;border:1px solid #2e3549;border-radius:10px;cursor:pointer;touch-action:manipulation}
.dd2 .mg{position:absolute;inset:0;z-index:5;background:#121621;border-radius:12px;display:flex;flex-direction:column;gap:10px;padding:0 0 10px}.dd2 .mg .mgc{flex:1 1 auto;min-height:0;display:flex;align-items:center;justify-content:center}.dd2 .mg canvas{max-height:100%;width:auto;max-width:100%;border-radius:12px;box-shadow:0 0 0 1px #2e3549}.dd2 .mg .mgt{margin:0 auto;max-width:640px;padding:8px 14px;font-size:14.5px;line-height:1.5;color:#e6dfcf;text-align:center;background:rgba(240,178,92,.08);border-radius:10px}.dd2 .mg .mgb{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;padding:0 8px}.dd2 .mg button.main{background:#f0b25c;color:#1d1d1d;border-color:#f0b25c;font-weight:700;min-width:120px}.dd2 .mg .mgfoot{display:flex;align-items:center;gap:16px;width:calc(100% - 20px);max-width:1100px;margin:0 auto;padding:10px 12px 10px 18px;box-sizing:border-box;background:rgba(10,12,18,.86);border:1px solid rgba(239,232,216,.14);border-radius:10px;box-shadow:0 10px 26px rgba(0,0,0,.4)}.dd2 .mg .mgfoot .mgt{flex:1;max-width:none;margin:0;padding:4px 0;background:none;font:400 15.5px/1.5 'Be Vietnam Pro',sans-serif;color:#e6dfcf}.dd2 .mg .mgfoot .mgb{flex:none;padding:0 0 0 16px;border-left:1px solid rgba(239,232,216,.14);flex-wrap:nowrap}.dd2 .mg .mgfoot .mgb button{font:500 15px 'Be Vietnam Pro',sans-serif;padding:11px 18px;border-radius:8px}.dd2 .mg .mgfoot .mgb button.main{min-width:150px;font-weight:600;background:linear-gradient(180deg,#f5c06e,#e0a14a)}.dd2 .mg .mgfoot .mgb button.ghost{font-size:13.5px;padding:9px 12px;opacity:.8}@media (max-height:520px){.dd2 .mg{gap:6px;padding-bottom:6px}.dd2 .mg .mgfoot{padding:6px 8px 6px 12px;gap:10px}.dd2 .mg .mgfoot .mgt{font-size:12.5px;line-height:1.35;padding:0}.dd2 .mg .mgfoot .mgb{padding-left:10px}.dd2 .mg .mgfoot .mgb button{padding:8px 12px;font-size:13.5px}.dd2 .mg .mgfoot .mgb button.main{min-width:110px}}@media (max-width:760px){.dd2 .mg .mgfoot{flex-direction:column;gap:8px;padding:8px}.dd2 .mg .mgfoot .mgt{font-size:13.5px;text-align:center}.dd2 .mg .mgfoot .mgb{border-left:0;padding:0;flex-wrap:wrap;justify-content:center}}.dd2 .mg button.ghost{background:transparent}#mtHost .mg button[data-bo]{display:none}#mtHost{margin-top:4px}
.dd2 button:disabled{opacity:.35}.dd2 button.on{background:#f0b25c;color:#1d1d1d}
.p2end{position:fixed;inset:0;z-index:9500;background:#07080d;color:#efe8d8;overflow:auto;padding:48px 16px}
.p2end .in{max-width:640px;margin:0 auto}
.p2end p.l{font-size:17px;line-height:1.8;margin:0 0 14px}
.p2end h2{font-size:42px;margin:28px 0 8px;color:#f0b25c}
.p2end .sum{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin:16px 0}
.p2end .sum div{background:#141824;border-radius:10px;padding:12px}.p2end .sum b{font-size:24px;display:block}.p2end .sum span{color:#9aa2b5;font-size:13px}
.p2end ol{color:#b9b3a6;line-height:1.7}.p2end .tag{color:#9aa2b5;font-size:13px;letter-spacing:.06em}
#gameBox .p2g{position:relative}
#gameBox .p2g .p2x{position:sticky;top:0;float:right;z-index:6;margin:-4px -4px 0 8px;font:inherit;font-size:13px;background:#171b28;color:#cfc8b8;border:1px solid #2e3549;border-radius:999px;padding:7px 12px;cursor:pointer}
#gameBox .p2g .p2x:hover{border-color:#f0b25c;color:#f0b25c}
.p2note{display:grid;grid-template-columns:1fr auto;gap:14px;align-items:center;margin:6px 0 14px}
.p2note .paper{position:relative;background:#e8dcc0 repeating-linear-gradient(transparent 0 33px,rgba(90,70,40,.22) 33px 34px);color:#2a2219;border-radius:4px;padding:18px 20px 16px 46px;transform:rotate(-1.2deg);box-shadow:0 10px 24px rgba(0,0,0,.5),inset 0 0 40px rgba(120,90,40,.25);font-family:Georgia,"Noto Serif",serif;font-size:19px;line-height:34px}
.p2note .paper::before{content:"";position:absolute;left:30px;top:0;bottom:0;width:2px;background:rgba(190,70,60,.35)}
.p2note .paper .f{transition:background .3s,color .3s}
.p2note .paper.hl .f{background:#f0b25c;color:#1d1d1d;border-radius:3px;padding:0 2px;font-weight:700}
.p2note .photo{width:150px;aspect-ratio:3/4;background:#222 center/cover;border:6px solid #e9e4d8;border-bottom-width:22px;transform:rotate(4deg);box-shadow:0 8px 20px rgba(0,0,0,.6)}
@media(max-width:560px){.p2note{grid-template-columns:1fr}.p2note .photo{display:none}.p2note .paper{font-size:17px}}
.p2ans{position:relative;margin:8px 0}.p2ans .p2in{padding-right:44px}.p2ans .clr{position:absolute;right:8px;top:50%;transform:translateY(-50%);background:none;border:none;color:#9aa2b5;font-size:20px;cursor:pointer}
.p2slots{display:flex;gap:6px;justify-content:center;margin:6px 0}.p2slots span{width:30px;height:36px;border-bottom:2px solid #f0b25c;display:grid;place-items:center;font-weight:700;color:#f0b25c}
.p2bar{display:flex;gap:10px;justify-content:space-between;align-items:center;margin-top:12px;flex-wrap:wrap}
.btn.p2main{background:#f0b25c;color:#1d1d1d;border-color:#f0b25c;font-weight:700;padding:10px 22px}
.p2chat{border:1px solid #2e3549;border-radius:14px;overflow:hidden;background:#11141d}
.p2chat .hd{display:flex;align-items:center;gap:12px;padding:12px 14px;border-bottom:1px solid #232a3d;background:#161a26}
.p2chat .av{width:44px;height:44px;border-radius:50%;background:#2e3549 center/cover;display:grid;place-items:center;font-weight:700;color:#f0b25c;flex:none;border:2px solid #f0b25c55}
.p2chat .hd b{display:block;font-size:17px}.p2chat .hd small{color:#9aa2b5;font-size:13px}
.p2chat .ct{margin-left:auto;font-size:13px;color:#f0b25c;border:1px solid #f0b25c55;border-radius:999px;padding:4px 10px;white-space:nowrap}
.p2chat .bd{display:grid;grid-template-columns:170px 1fr;min-height:340px}
.p2chat .side{border-right:1px solid #232a3d;padding:10px 8px;display:flex;flex-direction:column;gap:4px}
.p2chat .side button{font:inherit;font-size:13px;text-align:left;background:none;border:1px solid transparent;color:#b9b3a6;border-radius:8px;padding:8px 10px;cursor:pointer}
.p2chat .side button.on{border-color:#f0b25c66;background:#f0b25c14;color:#efe8d8}
.p2chat .info{margin:8px 0 0;padding:10px;border-radius:8px;background:#0f121b;color:#cfc8b8;font-size:13px;line-height:1.5}
.p2chat .main{display:flex;flex-direction:column;min-width:0}
.p2chat .log{flex:1;padding:12px;display:flex;flex-direction:column;gap:8px;max-height:44vh;overflow:auto}
.p2chat .b{max-width:78%;padding:9px 12px;border-radius:14px;line-height:1.5;font-size:15px;position:relative}
.p2chat .b i{display:block;font-style:normal;font-size:11px;color:#8a92a6;margin-top:3px}
.p2chat .b.in{align-self:flex-start;background:#232a3b;border-bottom-left-radius:4px}
.p2chat .b.out{align-self:flex-end;background:#24402c;border-bottom-right-radius:4px}
.p2chat .b.sys{align-self:center;background:none;color:#9aa2b5;font-size:13px;text-align:center}
.p2chat .opts{padding:10px 12px;border-top:1px solid #232a3d;display:flex;flex-direction:column;gap:8px}
.p2chat .op{display:grid;grid-template-columns:1fr auto;gap:10px;align-items:center;border:1px solid #2e3549;border-radius:12px;padding:10px 12px;background:#161a26}
.p2chat .op.ok{border-color:#5fb37a;background:#5fb37a12}
.p2chat .op small{display:block;font-size:12px;color:#9aa2b5;margin-bottom:3px}.p2chat .op.ok small{color:#7fd39a}
.p2chat .op .snd{width:42px;height:42px;border-radius:50%;border:none;background:#f0b25c;color:#1d1d1d;font-size:18px;cursor:pointer}
.p2chat .op:not(.ok) .snd{background:#2e3549;color:#efe8d8}
@media(max-width:620px){.p2chat .bd{grid-template-columns:1fr}.p2chat .side{flex-direction:row;flex-wrap:wrap;border-right:none;border-bottom:1px solid #232a3d}.p2chat .side button{white-space:nowrap;padding:6px 9px;font-size:12px}.p2chat .info{flex-basis:100%;margin:4px 0 0}.p2chat .b{max-width:90%}.p2chat .hd .ct{font-size:11px;padding:3px 8px}.p2chat .log{max-height:36vh}}
.p2steps{display:flex;align-items:stretch;gap:4px;flex-wrap:wrap;justify-content:center}
.p2steps .st{display:flex;flex-direction:column;align-items:center;gap:6px;min-width:120px;flex:1}
.p2steps .st>i{width:26px;height:26px;border-radius:50%;background:#f0b25c;color:#1d1d1d;font-style:normal;font-weight:700;display:grid;place-items:center;font-size:13px}
.p2steps .st .p2slot,.p2steps .st .p2fixed{width:100%;min-height:58px;box-sizing:border-box;text-align:center;display:flex;align-items:center;justify-content:center}
.p2steps .ar{align-self:center;color:#f0b25c;font-size:18px;margin-top:30px}
.p2trayhd{display:flex;justify-content:space-between;align-items:center;color:#9aa2b5;font-size:13px;margin-top:12px}.p2trayhd button{font:inherit;font-size:13px;background:none;border:none;color:#9aa2b5;cursor:pointer}
.dd2 .tbar{height:6px;border-radius:3px;background:#232a3d;margin-top:8px;overflow:hidden}.dd2 .tbar b{display:block;height:100%;background:linear-gradient(90deg,#f0b25c,#e2645c);width:0}
.dd2 .ctl button{min-width:64px;font-weight:600}.dd2 .ctl button.go{background:#f0b25c;color:#1d1d1d;border-color:#f0b25c}
@media(max-width:620px){.p2steps{flex-direction:column;align-items:stretch}.p2steps .st{flex-direction:row;min-width:0}.p2steps .st>i{flex:none}.p2steps .st .p2slot,.p2steps .st .p2fixed{min-height:46px}.p2steps .ar{transform:rotate(90deg);margin:0 0 0 2px;align-self:flex-start}}
`;
(()=>{ const st=document.createElement('style'); st.textContent=P2CSS; document.head.appendChild(st); })();
const P2XIDS=['dgX','gpX','ltX','ngX','gx','gmX','caX'];
const p2open=(html,onX)=>{ hideDlg(); if(typeof phAuto!=='undefined'&&phAuto) closePhone(); const g=$('game'); g.hidden=false; g.classList.add('p2full'); const bk=window.__p2bg; g.style.setProperty('--p2bg',bk?'url(img2/'+bk+'.webp?v=1025)':'none'); const box=$('gameBox'); box.innerHTML='<div class="p2g"'+(window.__p2g?' data-g="'+window.__p2g+'"':'')+'><button class="p2x" id="p2x" type="button">✕ Để sau</button>'+html+'</div>'; box.scrollTop=0;
  $('p2x').onclick=()=>{ if(onX){ onX(); return; } const t=P2XIDS.map(i=>$(i)).find(Boolean); if(t) t.click(); };
  if(!onX&&!P2XIDS.some(i=>$(i))) $('p2x').remove(); else P2XIDS.forEach(i=>{ const e=$(i); if(e) e.style.display='none'; }); return box; };
const p2close=()=>{ const g=$('game'); g.hidden=true; g.classList.remove('p2full'); $('gameBox').innerHTML=''; };
const fx=s=>effects(s);

/* ---------------- kéo thả chung (chuột lẫn cảm ứng) ---------------- */
function dragKit(root,onDrop){ root=(root&&root.querySelector&&root.querySelector(':scope > .p2g'))||root; let cur=null, ghost=null, ox=0, oy=0, hot=null;
  const slotAt=(x,y)=>{ ghost&&(ghost.style.display='none'); const el=document.elementFromPoint(x,y); ghost&&(ghost.style.display=''); return el&&el.closest('[data-slot]'); };
  root.addEventListener('pointerdown',e=>{ const c=e.target.closest('[data-card]'); if(!c||c.classList.contains('lock')) return; e.preventDefault(); cur=c; const r=c.getBoundingClientRect(); ox=e.clientX-r.left; oy=e.clientY-r.top;
    ghost=c.cloneNode(true); ghost.classList.add('drag'); ghost.style.width=r.width+'px'; ghost.style.height=r.height+'px'; ghost.style.left=(e.clientX-ox)+'px'; ghost.style.top=(e.clientY-oy)+'px'; document.body.appendChild(ghost); c.style.opacity='.3'; try{ root.setPointerCapture(e.pointerId); }catch(_){} });
  root.addEventListener('pointermove',e=>{ if(!ghost) return; ghost.style.left=(e.clientX-ox)+'px'; ghost.style.top=(e.clientY-oy)+'px'; const s=slotAt(e.clientX,e.clientY); if(hot&&hot!==s) hot.classList.remove('hot'); hot=s; if(s) s.classList.add('hot'); });
  const end=e=>{ if(!ghost) return; const s=slotAt(e.clientX,e.clientY); ghost.remove(); ghost=null; if(hot) hot.classList.remove('hot'); hot=null; const c=cur; cur=null; c.style.opacity=''; onDrop(c,s); };
  root.addEventListener('pointerup',end); root.addEventListener('pointercancel',end); }

/* =====================================================================
   1. ĐỌC CHỮ ĐẦU CÂU
   ===================================================================== */
function giaiMa(tin,dapan,title,goi,anh){ return new Promise(res=>{ const cau=tin.split('\n'); g7css();
  const line=(c,k)=>{ const m=c.match(/^(\s*)(\S)(.*)$/); return '<li><b>'+(k+1)+'</b><span>'+(m?'<span class="f">'+esc(m[2])+'</span>'+esc(m[3]):esc(c))+'</span></li>'; };
  const n=dapan.length;
  p2open('<div class="g7"><button class="g7x" id="gmX" type="button">× Để sau</button><div class="g7tag">'+G7I.doc+'Tin nhắn · manh mối</div><h3 class="g7h">'+esc(title||'Giải tin')+'</h3><p class="g7s">'+esc(goi||'Đọc chữ cái đầu của mỗi câu, bỏ dấu, ghép liền.')+'</p>'+
   '<div class="g7row"><ol class="g7paper" id="gmp">'+cau.map(line).join('')+'</ol><div class="g7pol" id="gmph" hidden><i></i></div></div>'+
   '<div class="g7slots" id="gms">'+Array.from({length:n},(_,k)=>'<label><span>'+(k+1)+'</span><input maxlength="1" autocomplete="off" autocapitalize="characters" aria-label="Chữ thứ '+(k+1)+'" data-k="'+k+'"></label>').join('')+'</div>'+
   '<p class="g7m" id="gmm"></p><div class="g7bar"><button class="g7b" id="gmg" type="button">Gợi ý (0/3)</button><button class="g7b pri" id="gmo" type="button">Đọc ra →</button></div><input id="gm" type="hidden"></div>');
  if(anh){ const im=new Image(); im.onload=()=>{ const ph=$('gmph'); if(ph){ ph.querySelector('i').style.backgroundImage='url('+im.src+')'; ph.hidden=false; } }; im.src='img2/'+anh+'.webp?v=1025'; }
  const ins=[...document.querySelectorAll('#gms input')]; const val=()=>ins.map(x=>x.value).join('');
  ins.forEach((x,k)=>{ x.oninput=()=>{ x.value=bo(x.value).toUpperCase().replace(/[^A-Z0-9]/g,'').slice(-1); if(x.value&&ins[k+1]) ins[k+1].focus(); $('gm').value=val(); };
    x.onkeydown=e=>{ if(e.key==='Backspace'&&!x.value&&ins[k-1]){ ins[k-1].focus(); ins[k-1].value=''; e.preventDefault(); } else if(e.key==='ArrowLeft'&&ins[k-1]) ins[k-1].focus(); else if(e.key==='ArrowRight'&&ins[k+1]) ins[k+1].focus(); else if(e.key==='Enter') go(); e.stopPropagation(); };
    x.onpaste=e=>{ e.preventDefault(); const t=bo((e.clipboardData||window.clipboardData).getData('text')).toUpperCase().replace(/[^A-Z0-9]/g,''); t.split('').forEach((c,j)=>{ if(ins[k+j]) ins[k+j].value=c; }); $('gm').value=val(); }; });
  let thu=0, goiY=0;
  $('gmg').onclick=()=>{ if(goiY>=3) return; goiY++; $('gmg').textContent='Gợi ý ('+goiY+'/3)';
    if(goiY===1){ $('gmp').classList.add('hl'); $('gmm').textContent='Để ý chữ đầu mỗi dòng.'; }
    if(goiY===2){ $('gmm').textContent='Mỗi dòng cho một chữ, ghép từ trên xuống.'; }
    if(goiY===3){ ins.slice(0,2).forEach((x,k)=>{ x.value=dapan[k]; x.classList.add('given'); }); $('gm').value=val(); $('gmm').textContent='Mở sẵn hai chữ đầu.'; } };
  $('gmX').onclick=()=>{ p2close(); res(false); };
  const go=()=>{ const v=val(); if(v.length<n){ $('gmm').textContent='Điền đủ '+n+' ô đã.'; return; } thu++; if(v===dapan){ ins.forEach(x=>x.classList.add('ok')); chime(); setTimeout(()=>{ p2close(); res(true); },500); } else if(thu>=3){ $('gmm').textContent='Đáp án: '+dapan; setTimeout(()=>{ p2close(); res(false); },1800); } else { tone(200,.15,.03,'sawtooth'); const sl=$('gms'); sl.classList.remove('bad'); void sl.offsetWidth; sl.classList.add('bad'); $('gmm').textContent='Chưa đúng. Còn '+(3-thu)+' lần.'; } };
  $('gmo').onclick=go; setTimeout(()=>ins[0]&&ins[0].focus(),60); }); }
const G7I={doc:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M9.5 12h6M9.5 15.5h6"/></svg>'};
function g7css(){ if($('g7css')) return; const st=document.createElement('style'); st.id='g7css'; st.textContent=`
.g7{position:relative;max-width:1080px;margin:0 auto;padding:6px 8px 4px;color:#ece4d2;font:400 16px/1.5 Newsreader,Georgia,serif}
.g7x{position:absolute;top:0;right:0;font:400 17px/1 Newsreader,serif;color:#ece4d2;background:rgba(10,10,12,.6);border:1px solid rgba(236,228,210,.45);border-radius:22px;padding:10px 20px;cursor:pointer}
.g7tag{display:inline-flex;align-items:center;gap:8px;font-size:14.5px;color:#e3b05b;border:1px solid #e3b05b;border-radius:5px;padding:4px 10px}
.g7tag svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:1.7}
.g7h{margin:10px 0 4px!important;font:600 42px/1.1 Newsreader,Georgia,serif!important;text-transform:uppercase;letter-spacing:.02em;color:#e3b05b!important}
.g7 .g7s{margin:0 0 18px!important;font:400 19px/1.45 Newsreader,Georgia,serif!important;color:#e6dfcf!important;max-width:900px}
.g7row{display:grid;grid-template-columns:1fr 250px;gap:28px;align-items:center;margin:0 0 22px}
.g7paper{list-style:none;margin:0 0 0 60px;padding:14px 26px 14px 0;background:#e9dcbe linear-gradient(90deg,transparent 58px,rgba(178,74,64,.5) 58px 60px,transparent 60px);background-image:linear-gradient(90deg,transparent 58px,rgba(178,74,64,.5) 58px 60px,transparent 60px),repeating-linear-gradient(transparent 0 39px,rgba(64,98,150,.18) 39px 40px);color:#2a2219;box-shadow:0 14px 34px rgba(0,0,0,.55);transform:rotate(-.6deg);font-size:22px;line-height:40px}
.g7paper li{display:grid;grid-template-columns:58px 1fr}.g7paper li b{font-weight:400;color:#8a8170;text-align:center;font-size:19px}.g7paper li>span{padding-left:22px}
.g7paper.hl .f{background:#e3b05b;color:#1a1206;border-radius:3px;padding:0 3px;font-weight:600}
.g7pol{background:#efeadf;padding:12px 12px 46px;transform:rotate(4deg);box-shadow:0 14px 34px rgba(0,0,0,.6)}.g7pol i{display:block;aspect-ratio:4/5;background:#222 center/cover}
.g7slots{display:flex;justify-content:center;gap:0;background:rgba(10,12,18,.85);border:1.5px solid rgba(236,228,210,.6);border-radius:10px;padding:14px 18px 18px;margin:0 30px}
.g7slots label{flex:1;max-width:170px;display:flex;flex-direction:column;align-items:center;gap:8px;border-left:1px solid rgba(236,228,210,.12)}.g7slots label:first-child{border-left:0}
.g7slots label span{font-size:20px;color:#ece4d2}
.g7slots input{width:72px;height:72px;box-sizing:border-box;text-align:center;font:600 34px/1 Newsreader,serif;color:#ece4d2;background:#0e1016;border:1.5px solid rgba(236,228,210,.6);border-radius:9px;text-transform:uppercase;caret-color:#e3b05b}
.g7slots input:focus{outline:none;border-color:#e3b05b;box-shadow:0 0 0 3px rgba(227,176,91,.25)}
.g7slots input.given{color:#e3b05b}.g7slots input.ok{border-color:#5fb37a;color:#8fd0a2}
.g7slots.bad{animation:g7sh .35s}@keyframes g7sh{25%{transform:translateX(-8px)}50%{transform:translateX(7px)}75%{transform:translateX(-4px)}}
.g7m{text-align:center;min-height:1.4em;margin:10px 0 0;color:#e3b05b}
.g7bar{display:flex;justify-content:space-between;gap:12px;margin:12px 30px 0}
.g7b{font:600 22px/1 Newsreader,Georgia,serif;text-transform:uppercase;letter-spacing:.04em;color:#ece4d2;background:rgba(10,10,12,.6);border:1.5px solid rgba(236,228,210,.6);border-radius:30px;padding:16px 36px;cursor:pointer}
.g7b.pri{background:#f0b25c;border-color:#f0b25c;color:#1a1206}.g7b:hover{filter:brightness(1.1)}.g7b:focus-visible,.g7x:focus-visible{outline:2px solid #ece4d2;outline-offset:3px}
.g7 .g7ph{display:grid;grid-template-columns:1fr 360px 210px;gap:24px;align-items:center}.g7 .g7ph .g7paper{margin:0;font-size:17px;line-height:32px;background-image:linear-gradient(90deg,transparent 40px,rgba(178,74,64,.5) 40px 42px,transparent 42px),repeating-linear-gradient(transparent 0 31px,rgba(64,98,150,.18) 31px 32px)}.g7 .g7ph .g7paper li{grid-template-columns:40px 1fr}.g7 .g7ph .g7paper li>span{padding-left:12px}.g7 .g7h.sm{font-size:32px!important}
#game:has(.ca7) #p2x{display:none!important}
.g7 .g7tel{background:#0b0c10;border:10px solid #1b1c21;border-radius:42px;padding:14px 12px 10px;box-shadow:0 20px 50px rgba(0,0,0,.7),inset 0 0 0 1px #2a2b31}
.g7 .g7tel .sb{display:flex;justify-content:space-between;font:600 14px "Be Vietnam Pro",sans-serif;padding:2px 14px 10px}
.g7 .g7tel .nb{display:flex;align-items:center;justify-content:center;position:relative;padding:8px 0 12px;font-size:18px;border-bottom:1px solid #22232a}
.g7 .g7tel .to{display:flex;align-items:center;gap:8px;padding:10px 6px;color:#9a9486;font-size:15px}.g7 .g7tel .to b{font-weight:400;color:#ece4d2;background:#24252c;border-radius:14px;padding:3px 12px}
.g7 .g7tel textarea{width:100%;box-sizing:border-box;min-height:120px;resize:none;background:#0e0f14;border:1.5px solid rgba(236,228,210,.5);border-radius:12px;color:#ece4d2;font:400 16px/1.5 "Be Vietnam Pro",sans-serif;padding:12px}
.g7 .g7tel textarea:focus{outline:none;border-color:#e3b05b}
.g7 .acr{display:flex;gap:6px;justify-content:center;margin:10px 0 4px}.g7 .acr span{width:34px;height:34px;display:grid;place-items:center;border-radius:6px;border:1.5px dashed rgba(236,228,210,.35);font:600 18px Newsreader,serif;color:#6c665a}.g7 .acr span.ok{border:1.5px solid #5fb37a;color:#8fd0a2}.g7 .acr span.no{border:1.5px solid #e2645c;color:#ff8a7c}
.g7 .kb{display:flex;flex-wrap:wrap;justify-content:center;gap:5px;margin-top:8px}.g7 .kb button{flex:0 0 calc(10% - 5px)}.g7 .kb button.w2{flex-basis:calc(20% - 5px)}.g7 .kb button.w4{flex-basis:calc(40% - 5px)}.g7 .kb button{height:36px;border:0;border-radius:6px;background:#3a3b42;color:#ece4d2;font:500 15px "Be Vietnam Pro",sans-serif;cursor:pointer}.g7 .kb button.w2{grid-column:span 2}.g7 .kb button.w4{grid-column:span 4}.g7 .kb button.dk{background:#26272d}
.g7 .frag li{cursor:pointer}.g7 .frag li:hover>span{background:rgba(227,176,91,.3)}
.g7 .gl p{margin:6px 0 0;color:#ff8a7c;font-size:15px}
@media (max-width:900px){.g7h{font-size:28px!important}.g7s{font-size:16px}.g7row{grid-template-columns:1fr}.g7pol{display:none}.g7paper{margin:0;font-size:18px;line-height:34px;background-image:linear-gradient(90deg,transparent 40px,rgba(178,74,64,.5) 40px 42px,transparent 42px),repeating-linear-gradient(transparent 0 33px,rgba(64,98,150,.18) 33px 34px)}.g7paper li{grid-template-columns:40px 1fr}.g7paper li>span{padding-left:12px}
 .g7slots{margin:0;padding:10px 6px}.g7slots input{width:44px;height:48px;font-size:24px}.g7slots label span{font-size:15px}.g7bar{margin:12px 0 0}.g7b{font-size:16px;padding:12px 20px}.g7x{position:static;float:right;font-size:14px;padding:7px 14px}
 .g7 .g7ph{grid-template-columns:1fr}.g7 .g7ph .g7pol,.g7 .kb{display:none}.g7 .g7tel{border-width:6px;border-radius:24px}}
`; document.head.appendChild(st); }

/* =====================================================================
   2. TỰ GÕ TIN GIẤU CHỮ
   ===================================================================== */
const CAM=['cuu','cong an','tron','giai cuu','bao tin','huong','vinh','lam','bavet','xi ha','tron thoat','canh sat'];
function chamTin(txt,tu){ const can=bo(tu).toUpperCase().replace(/[^A-Z0-9]/g,'');
  const cau=txt.split(/(?<=[.!?…])\s+|\n+/).map(x=>x.trim()).filter(Boolean);
  const dau=cau.map(c=>bo(c).replace(/^[^A-Za-z0-9]+/,'').charAt(0).toUpperCase()).join('');
  const loi=[]; let vung=0;
  cau.forEach((c,i)=>{ if(c.split(/\s+/).filter(Boolean).length<4){ loi.push('Câu '+(i+1)+' cụt quá (dưới 4 chữ), đọc như mật mã.'); vung++; } });
  const first=cau.map(c=>bo(c).toLowerCase().split(/\s+/)[0]); first.forEach((f,i)=>{ if(i&&first.indexOf(f)<i){ loi.push('Câu '+(i+1)+' mở đầu giống một câu trước.'); vung++; } });
  const low=' '+bo(txt).toLowerCase().replace(/[.,!?]/g,' ')+' '; CAM.forEach(k=>{ if(low.includes(' '+k+' ')){ loi.push('Có chữ quản lý để ý: "'+k+'".'); vung++; } });
  return {can,dau,dung:dau===can,vung,loi,cau}; }
const MANH={S:['Sáng nay trời mưa quá mẹ ơi.','Sắp tới con được lên lương.'],O:['Ở đây ăn uống cũng đủ.','Ông chủ nói tháng sau có thưởng.'],N:['Nhớ nhà quá mà chưa về được.','Nay con mới mua đôi dép mới.'],G:['Gửi lời thăm cả xóm giùm con.','Giờ con đi làm tiếp nha.'],
 C:['Có gì mẹ nhắn con nha.','Còn mấy tháng nữa là đủ tiền.'],U:['Út nhà mình học hành sao rồi mẹ.','Uống thuốc đều nghen mẹ.'],A:['Anh hai đi làm có mệt hông.','Ai hỏi thì nói con khỏe.'],
 '3':['3 tháng nữa con gửi tiền về.','3 đứa trong phòng ai cũng mập ra.'],K:['Không có gì đâu mẹ.','Khi nào rảnh con gọi.'],T:['Tối nay phòng con có tiệc nhỏ.','Tháng này con ráng làm thêm.']};
const MANH2={SONG:{chuan:['Sale lớn cuối tuần giảm giá mạnh.','Ôm trọn bộ quà tặng gia đình.','Nhận ưu đãi ngay trong hôm nay.','Giao hàng miễn phí toàn quốc.'],nhieu:['Chúc mừng quý khách trúng thưởng.','Tặng voucher mua sắm một triệu.','Mua một tặng một duy nhất hôm nay.']},
 BAG:{chuan:['Bán trả góp lãi suất không phần trăm.','An tâm bảo hành chính hãng mười hai tháng.','Gọi ngay tổng đài để giữ suất.'],nhieu:['Hai giờ sáng đóng cổng chương trình.','Năm giờ sáng mở bán đợt mới.']}};
function giauChu(tu,goi){ return new Promise(res=>{ const can=bo(tu).toUpperCase().replace(/[^A-Z0-9]/g,''); let de=!!S.p2de; g7css();
  const KB=['QWERTYUIOP','ASDFGHJKL','ZXCVBNM'];
  p2open('<div class="g7"><button class="g7x" id="gx" type="button">× Để sau</button><h3 class="g7h sm">Tin giấu chữ · cần ghép ra: '+esc(can)+'</h3><p class="g7s">Gõ một tin bình thường gửi về nhà. Mỗi câu một dòng hoặc ngắt bằng dấu chấm. Chữ đầu mỗi câu ghép lại phải ra <b>'+esc(can)+'</b>. '+esc(goi||'Quản lý đọc lướt mọi tin: câu cụt, câu mở đầu giống nhau, hay chữ nhạy cảm là bị để ý.')+'</p>'+
   '<div class="g7ph"><div><ol class="g7paper frag" id="frag"></ol></div><div class="g7tel"><div class="sb"><span>'+fmtT(S.min)+'</span><span>▮▮▮</span></div><div class="nb">Tin nhắn mới</div><div class="to">Đến: <b>Nhà</b></div><textarea id="gt" placeholder="Nhập tin nhắn…" aria-label="Tin nhắn"></textarea><div class="acr" id="acr"></div>'+
   '<div class="kb">'+KB.map(r=>r.split('').map(c=>'<button type="button" data-c="'+c+'">'+c+'</button>').join('')).join('')+'<button type="button" class="dk w2" data-c="\\n">Xuống dòng</button><button type="button" class="dk w4" data-c=" ">dấu cách</button><button type="button" class="dk w2" data-c="⌫">⌫</button></div></div><div class="g7pol" id="gpol"><i></i></div></div>'+
   '<div class="gl" id="gl"></div><div class="g7bar"><button class="g7b" id="gde" type="button"></button><button class="g7b pri" id="gs" type="button">Gửi tin ➤</button></div></div>');
  { const im=new Image(); im.onload=()=>{ const ph=$('gpol'); if(ph) ph.querySelector('i').style.backgroundImage='url('+im.src+')'; }; im.onerror=()=>{ const ph=$('gpol'); if(ph) ph.hidden=true; }; im.src='img2/x2-phong-ngu.webp?v=1025'; }
  const ta=$('gt');
  const upd=()=>{ const r=chamTin(ta.value,tu); let h=''; for(let i=0;i<can.length;i++){ const c=r.dau[i]; h+='<span class="'+(c==null?'':c===can[i]?'ok':'no')+'">'+(c||can[i])+'</span>'; } if(r.dau.length>can.length) h+='<span class="no">+'+(r.dau.length-can.length)+'</span>'; $('acr').innerHTML=h; $('gl').innerHTML=r.loi.map(x=>'<p>'+esc(x)+'</p>').join(''); };
  const frag=()=>{ $('gde').textContent=de?'Tự gõ hết':'Gợi ý câu'; const f=$('frag'); if(!de){ f.innerHTML='<li><b>·</b><span style="color:#8a8170">Bấm "Gợi ý câu" để có sẵn vài câu bình thường.</span></li>'; return; } const M2=MANH2[can]; const L=M2?M2.chuan.concat(M2.nhieu).sort(()=>Math.random()-.5):[]; if(!M2) [...new Set(can.split(''))].forEach(c=>(MANH[c]||[]).forEach(m=>L.push(m)));
    f.innerHTML=L.map((m,k)=>'<li data-m="'+esc(m)+'"><b>'+(k+1)+'</b><span><span class="f">'+esc(m[0])+'</span>'+esc(m.slice(1))+'</span></li>').join(''); f.querySelectorAll('li[data-m]').forEach(b=>b.onclick=()=>{ ta.value=(ta.value.trim()?ta.value.trim()+'\n':'')+b.dataset.m; upd(); }); };
  document.querySelectorAll('.g7 .kb [data-c]').forEach(b=>b.onclick=()=>{ const c=b.dataset.c; if(c==='⌫') ta.value=ta.value.slice(0,-1); else ta.value+=(c==='\\n'?'\n':c); upd(); });
  ta.oninput=upd; upd(); frag();
  $('gde').onclick=()=>{ de=!de; S.p2de=de; frag(); };
  $('gx').onclick=()=>{ p2close(); res(null); };
  $('gs').onclick=()=>{ const r=chamTin(ta.value,tu); if(!r.cau.length){ toast('Chưa gõ gì.'); return; } p2close(); res(r); }; }); }
function nextWord(){ if(S.nhanh==='B'&&!hasF('x_tin_song')&&!hasF('x_goi_ok')) return 'SONG'; if(!hasF('x_tin_3g')&&hasF('x_gio')) return 'BAG'; return ''; }

/* =====================================================================
   3. CA NHẮN TIN LỪA (khách hư cấu từ các vụ đã lên báo)
   ===================================================================== */
const KHACH=[
 {ten:'Chú Lành',ho:'62 tuổi, về hưu, con ở xa',kieu:'Làm quen · người thành đạt ở nước ngoài',vao:'ai vậy con, chú hông có lưu số này',luot:[
  {k:'ủa có chuyện gì hông con',d:'Dạ con là Vy, con làm kế toán bên Úc, con lỡ nhắn nhầm, mà nói chuyện với chú thấy dễ thương quá…',l:'Dạ con xin lỗi, con nhắn lộn số.',w:['kế toán','kế tóan']},
  {k:'con ở Úc mà rành tiếng Việt dữ',d:'Dạ con về nước hoài chú. Bữa nay con mới có lời, con đang chơi một app vàng, cô chú bên này ai cũng…',l:'Dạ, thôi con chào chú.',w:['có lời','có lơi']},
  {k:'app gì con, chú già rồi hông biết mấy cái đó',d:'Chú nạp thử năm trăm thôi, con chỉ chú rút liền, có lời thiệt chú mới chơi tiếp nha chú…',l:'Dạ chú hông rành thì thôi chú.',w:['rút liền','rút liên']}]},
 {ten:'Hạnh Nguyên',ho:'31 tuổi, mới mất việc ở xưởng may',kieu:'Làm nhiệm vụ mạng',vao:'chị thấy bài tuyển cộng tác viên bấm thích video, còn tuyển hông em',luot:[
  {k:'làm sao vậy em, chị chưa làm bao giờ',d:'Dạ dễ lắm chị, mỗi video chị bấm thích là được 15 ngàn, làm trên điện thoại ở nhà…',l:'Dạ bên em đủ người rồi chị.',w:['15 ngàn','15 ngan']},
  {k:'ủa có tiền thiệt nè, cảm ơn em nha',d:'Dạ giờ chị lên nhiệm vụ cấp 2 nha, chị nạp hai triệu để mở, xong nhiệm vụ hoàn lại cả gốc lẫn…',l:'Dạ chị làm vậy là đủ rồi.',w:['hoàn lại','hòan lại']},
  {k:'hai triệu hả em, chị đang kẹt tiền nhà',d:'Chị yên tâm, hệ thống bên em uy tín, chị chuyển vô tài khoản này giùm em, trễ là mất lượt…',l:'Dạ vậy chị thôi đi chị.',w:['chuyển','chuyễn']}]},
 {ten:'Anh Quý',ho:'38 tuổi, đang nợ app',kieu:'Tuyển việc nhẹ lương cao',vao:'em ơi bài tuyển lương 30 triệu còn hông',luot:[
  {k:'việc gì vậy em, anh học hết lớp 9 thôi',d:'Dạ việc văn phòng, gõ máy thôi anh, bao ăn ở, bên em lo hết giấy tờ, đi liền trong tuần…',l:'Dạ vị trí đó tuyển đủ rồi anh.',w:['bao ăn ở','bao ăn ơ']},
  {k:'làm ở đâu em',d:'Dạ bên công ty đối tác gần cửa khẩu, anh khám sức khỏe xong là xe tới rước…',l:'Dạ em hỏi lại rồi báo anh sau.',w:['cửa khẩu','cửa khẫu']},
  {k:'anh hơi sợ, nghe người ta nói bị lừa qua Cam',d:'Anh cứ tin em, bao nhiêu người đi rồi gửi tiền về hết. Anh gửi em hình căn cước để em giữ suất…',l:'Dạ anh sợ thì thôi anh.',w:['giữ suất','giữ xuất']}]},
 {ten:'Cô Ba Dung',ho:'58 tuổi, bán rau ở chợ',kieu:'App đầu tư giả, có "thầy" dẫn',vao:'thầy ơi con bà Tư giới thiệu, thầy chỉ cô cách đầu tư với',luot:[
  {k:'cô tiền ít lắm, có được hông thầy',d:'Dạ được cô, cô vô nhóm của thầy, mỗi sáng thầy báo mã, cô làm theo là có lời mỗi ngày…',l:'Dạ cô hỏi lại người nhà rồi tính nha cô.',w:['mỗi ngày','mổi ngày']},
  {k:'bữa trước cô rút được ba trăm, mừng quá',d:'Dạ đó là mới thử thôi cô. Giờ có kèo lớn, cô vô năm chục triệu, cuối tuần thầy trả về gấp…',l:'Dạ cô đừng bỏ nhiều nha cô.',w:['gấp','gâp']},
  {k:'năm chục là tiền hụi của cô đó thầy',d:'Cô tin thầy, chuyển trước 3 giờ chiều, trễ là hệ thống khóa lệnh, mất phần của cô…',l:'Dạ vậy cô giữ tiền hụi đi cô.',w:['khóa lệnh','khoá lênh']}]},
 {ten:'Minh Thư',ho:'24 tuổi, đang tìm việc',kieu:'Làm quen · yêu đương qua mạng',vao:'anh ơi hôm qua anh nói mai gọi video mà',luot:[
  {k:'sao anh hông gọi video được vậy',d:'Camera anh hư, anh đang ở Singapore làm dự án, về anh dẫn em đi ăn, thương em lắm…',l:'Anh bận quá, thôi để bữa khác.',w:['Singapore','Singapo']},
  {k:'em nhớ anh',d:'Anh có món quà gửi về cho em, hải quan giữ lại, em đóng giùm anh phí thông quan…',l:'Anh hông muốn làm phiền em nữa.',w:['thông quan','thông quang']},
  {k:'bao nhiêu anh, em có chút tiền dành dụm',d:'Mười lăm triệu thôi em, anh về anh trả lại em gấp đôi, em chuyển vô tài khoản này nha…',l:'Thôi em giữ tiền đi.',w:['gấp đôi','gấp đôí']}]},
 {ten:'Anh Tài',ho:'45 tuổi, chạy xe ôm',kieu:'App đầu tư giả',vao:'em ơi app vàng này rút tiền sao vậy',luot:[
  {k:'anh nạp một triệu rồi, giờ muốn rút',d:'Dạ tài khoản anh đang lời, muốn rút anh phải đóng phí xác minh hai triệu, xong rút về liền…',l:'Dạ app đang bảo trì anh.',w:['xác minh','xác mịnh']},
  {k:'sao lại đóng nữa em',d:'Dạ quy định sàn anh, ai cũng đóng hết, đóng xong là tiền về tài khoản anh trong mười phút…',l:'Dạ em cũng hông rõ anh.',w:['mười phút','mươi phút']},
  {k:'thôi anh đóng, rút giùm anh nha',d:'Dạ anh chuyển vô số tài khoản bên dưới, ghi nội dung là mã của anh, em duyệt liền…',l:'Dạ anh đừng đóng nữa anh.',w:['duyệt','duyêt']}]}];
const CT=()=>(S.p2ct&&S.p2ct.d===S.day)?S.p2ct.n:0; const ctAdd=n=>{ if(!S.p2ct||S.p2ct.d!==S.day) S.p2ct={d:S.day,n:0}; S.p2ct.n+=n; };

/* khách có kịch bản riêng (người quen hẻm 47, vụ báo chí): 3 lựa chọn đúng kịch bản · cài lỗi · tin lạnh */
const KHACH2=[
 {id:'mai',d:9,ca:'sa',ten:'Cô Mai',ho:'làm nhiệm vụ mạng, đang lo tiền trọ cho con gái',kieu:'Nhiệm vụ thả tim · gói VIP',
  luot:[{k:'em ơi cô bấm thả tim đủ 3 clip rồi, hồi nãy nhận được 50 ngàn thiệt nè. giờ làm sao kiếm thêm tiền đóng tiền trọ cho con gái cô?',
   d:'Dạ cô lên gói Nhiệm Vụ Kim Cương nha! Nạp trước 5 triệu, bấm 10 đơn là rút về liền 6 triệu rưỡi cả gốc lẫn lời trong 15 phút...',
   c:'Dạ cô lên gói Kim Cương nha! Phải nạp trước mới nhận thưởng, cô [chuyễn] 5 triệu vô [tài khỏan] công ty cửa khẩu này nha...',
   l:'Hôm nay hết nhiệm vụ miễn phí rồi cô, cô rút 50 ngàn đó xài đi đừng nạp thêm.'}],
  ket:{d:'Cô Mai vay nóng hàng xóm nạp 5 triệu. Hệ thống báo "sai cú pháp", ép nạp thêm 15 triệu mới cho rút.',c:'ủa sao chữ chuyển viết kỳ vậy, lại còn công ty cửa khẩu? thôi cô sợ bị lừa lắm, cô nghỉ làm nha',l:''},
  so:'Cô Mai · làm nhiệm vụ mạng · mất 5 triệu, bị ép nạp thêm 15 triệu',hoc:1},
 {id:'hanh',d:10,ca:'sa',face:'Hạnh Bánh Mì',ten:'Chị Hạnh',ho:'xe bánh mì đầu hẻm 47',kieu:'Quỹ hỗ trợ tiểu thương giả',
  luot:[{k:'em ơi bên quỹ hỗ trợ tiểu thương của em cho vay 20tr lãi 0% thiệt hả? chị bán bánh mì đầu hẻm 47 nè, thủ tục sao em?',
   d:'Dạ đúng rồi chị, bên em giải ngân trong ngày luôn, chị chụp CCCD gửi qua cho em nha...',
   c:'Dạ đúng rồi chị, bên em giải ngân trong ngày luôn, chị chụp CCCD gửi qua cho bên em làm hồ sơ [chuyễn] duyệt nha...',
   l:'Thủ tục rườm rà lắm chị ơi, không có giấy phép kinh doanh không vay được đâu.',
   rk:'(Chị Hạnh gửi ảnh căn cước. Địa chỉ ghi: hẻm 47 Fan Xích Vô.)'},
   {k:'chị gửi hình căn cước rồi đó. giờ chừng nào nhận được 20tr vậy em, chị đang kẹt tiền đóng học cho thằng Bo',
   d:'Hồ sơ duyệt rồi nha chị! Giờ chị chuyển trước 2 triệu tiền phí bảo hiểm vô số tài khoản này là hệ thống bắn 20 triệu về liền...',
   c:'Hồ sơ duyệt rồi nha chị! Giờ chị [chuyễn] trước 2 triệu tiền phí vô [tài khỏan] công ty ở Tây Ninh này là nhận được tiền...',
   l:'Bên em đang bảo trì hệ thống rồi, chị ra ngân hàng ngoài đường lớn hỏi thử đi.'}],
  ket:{d:'Chị Hạnh chuyển 2 triệu, tiền bán bánh mì cả tuần, rồi bị chặn số.',c:'ủa sao lại chuyển vô công ty ở Tây Ninh, còn viết sai chính tả y như cái vụ thằng Tùng kể vậy? thôi chị ko vay nữa đâu!',l:''},
  fx:{d:'-nghi:3',l:'+nghi:8'},so:'Chị Hạnh · xe bánh mì đầu hẻm 47 · mất 2 triệu'},
 {id:'tam',d:11,ca:'ch',face:'Tám Hớt Tóc',ten:'Chú Tám',ho:'tiệm hớt tóc hẻm 47',kieu:'Tri ân người cao tuổi · quà trúng thưởng',
  luot:[{k:'alo con ơi, chú Tám hớt tóc nè. hồi sáng có tin nhắn báo chú trúng cái máy đấm lưng với phần quà 10 triệu, thiệt hông con?',
   d:'Dạ thiệt đó chú ơi! Chú có tên trong danh sách khách hàng may mắn tháng này, chú xác nhận địa chỉ để con gửi quà về nha...',
   c:'Dạ thiệt đó chú ơi! Chú xác nhận địa chỉ để bên con làm lệnh [chuyễn] quà từ kho Ba Vẹt về cho chú nha...',
   l:'Tin nhắn gửi nhầm số rồi chú ơi, không có trúng thưởng gì đâu.',
   rk:'trời đất ơi hên dữ vậy, cái lưng chú đứng cắt tóc đau muốn gãy mấy tháng nay'},
   {k:'nhà chú ở hẻm 47 Fan Xích Vô á con. mà sao nhận quà đây, chú già rồi hông rành bấm đt đâu',
   d:'Dạ chú chỉ cần nhờ người ra tiệm chuyển 1 triệu rưỡi tiền phí xuất kho vô số tài khoản này là chiều mai bưu tá giao tận tiệm hớt tóc luôn...',
   c:'Dạ chú đừng nhờ thằng Bin nha, cứ tự ra ngoài [chuyễn] 1 triệu rưỡi vô [tài khỏan] này để ủy quyền nhận quà tại Tây Ninh...',
   l:'Quà hết hạn nhận rồi chú ơi, chú tắt máy đi.'}],
  ket:{d:'Chú Tám gom hết tiền lẻ cắt tóc cả tháng chuyển 1 triệu rưỡi, rồi bị khóa máy.',c:'ủa sao kêu đừng hỏi thằng Bin, lại còn ủy quyền Tây Ninh nghe quen dữ vậy? Để chú kêu thằng Bin qua coi thử!',l:''},
  so:'Chú Tám · tiệm hớt tóc hẻm 47 · mất 1,5 triệu'},
 {id:'ngoc',d:12,ca:'sa',ten:'Chị Ngọc',ho:'quen qua mạng',kieu:'Nuôi tình cảm · rủ góp vốn sàn vàng',
  luot:[{k:'anh ơi sao em kêu gọi video nhìn mặt cái mà anh cứ nói bên đó sóng yếu hoài vậy? anh kêu em nạp 30 triệu vô sàn vàng này có chắc rút ra được hông?',
   d:'Anh đang ở ngoài giàn khoan bảo mật quân sự sao bật cam được em. Em rút thử 1 triệu hôm qua được rồi đó, giờ nạp 30 triệu ăn sóng lớn với anh...',
   c:'Anh hông bật cam được đâu. Em cứ [chuyễn] 30 triệu vô [tài khỏan] sàn đi, chừng nào sàn bảo trì khóa rút thì tính sau...',
   l:'Em không tin anh thì thôi, giữ tiền trong ngân hàng mà xài đi.'}],
  ket:{d:'Chị Ngọc mềm lòng nạp 30 triệu tiền tiết kiệm. Sàn khóa tính năng rút tiền.',c:'gì mà sàn bảo trì khóa rút, lại còn gõ sai chính tả y như văn mẫu copy vậy? Đồ lừa đảo!',l:''},
  so:'Chị Ngọc · quen qua mạng · mất 30 triệu tiền tiết kiệm'},
 {id:'thao',d:15,ca:'ch',ten:'Bé Thảo',ho:'ở quê, đang tìm việc gửi tiền lên viện cho má',kieu:'Tuyển việc nhẹ lương cao',
  luot:[{k:'anh chị ơi em thấy tin tuyển nhân viên gõ máy tính 25 triệu/tháng bao ăn ở, đi làm liền trong tuần. chị hai em đi làm xa mất liên lạc rồi, giờ má em nằm viện em cần tiền gấp lắm...',
   d:'Đúng chỗ rồi đó em! Không cần kinh nghiệm, công ty lo hết giấy tờ từ A tới Z, sáng mai em bắt xe lên Sài Gòn rồi có xe 16 chỗ rước đi liền nha...',
   c:'Công việc ngồi phòng máy 12 tiếng, lương cao bất thường, [chuyễn] qua bên kia biên giới làm, đi rồi là mất liên lạc luôn như chị hai em đó...',
   l:'Bên anh tuyển đủ người rồi em ơi, ở quê kiếm việc khác làm đi đừng lên đây.'}],
  ket:{d:'Con bé mừng rỡ đặt vé xe đò lên Sài Gòn.',c:'trời đất ơi... sao anh chị biết chuyện chị hai em mất liên lạc? Vậy là ổ lừa người rồi, em báo công an xã liền!',l:'(Con bé cảm ơn rồi đi tìm chỗ khác.)'},
  fx:{c:'+tin_thuy +tin_thuy',l:'+tin_thuy +tin_thuy'},cuu:'Tối đó kể lại cho Thủy nghe. Thủy ngồi im rất lâu.',so:'Bé Thảo · em gái Thủy · đặt vé lên Sài Gòn'}];
KHACH2.forEach(k=>{ k.vao=k.luot[0].k; });
const caHom=()=>{ const ca=hour()<12?'sa':'ch'; return KHACH2.find(k=>k.d===S.day&&k.ca===ca&&!(S.p2kh&&S.p2kh[k.id])); };
const loiSpan=t=>esc(t).replace(/\[([^\]]+)\]/g,'<span class="p2w loi">$1</span>');
const khSlug=t=>bo(t).toLowerCase().replace(/[^a-z0-9]+/g,'-');
const CAI={chat:'<svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z"/><path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01"/></svg>',kh:'<svg viewBox="0 0 24 24"><path d="M5 20V12M11 20V6M17 20v-9"/></svg>'};
function ca7css(){ if($('ca7css')) return; const st=document.createElement('style'); st.id='ca7css'; st.textContent=`
#gameBox:has(.ca7){width:100%!important;max-width:none!important;height:100%!important;padding:8px!important;box-sizing:border-box}
#gameBox:has(.ca7) .p2g{height:100%}
.ca7{height:100%;display:flex;align-items:center;justify-content:center;padding:10px 14px;box-sizing:border-box;color:#ece4d2;font:400 16px/1.45 Newsreader,Georgia,serif}
.ca7 .mon{width:min(1220px,100%);height:min(100%,720px);background:#0d0e12;border:14px solid #15161a;border-bottom-width:22px;border-radius:12px;box-shadow:0 30px 80px rgba(0,0,0,.7);display:grid;grid-template-columns:96px 280px 1fr;overflow:hidden}
.ca7 .cnv{background:#101116;border-right:1px solid #22232a;display:flex;flex-direction:column;gap:6px;padding:12px 8px}
.ca7 .cnv span{display:flex;flex-direction:column;align-items:center;gap:6px;padding:12px 4px;border-radius:8px;font-size:13.5px;color:#c9c2b2;text-align:center}
.ca7 .cnv span.on{background:#2a2216;border:1px solid #6b5428;color:#e3b05b}
.ca7 .cnv svg{width:26px;height:26px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
.ca7 .cls{background:#121318;border-right:1px solid #22232a;overflow:auto;padding:14px 12px}
.ca7 .cls h4{margin:4px 6px 14px;font:600 24px/1 "Be Vietnam Pro",sans-serif;color:#ece4d2}
.ca7 .cls .it{display:flex;gap:10px;align-items:center;padding:10px;border-radius:8px;margin-bottom:6px;opacity:.6}
.ca7 .cls .it.on{opacity:1;background:#2a2216;border:1px solid #6b5428}
.ca7 .cls .it b{display:block;font-weight:500}.ca7 .cls .it span{display:block;font-size:13px;color:#9a9486;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:170px}
.ca7 .av{flex:none;width:44px;height:44px;border-radius:50%;background:#26272d center/cover;display:grid;place-items:center;font:600 16px "Be Vietnam Pro",sans-serif;font-style:normal;color:#c9c2b2}
.ca7 .cmn{display:flex;flex-direction:column;min-width:0;min-height:0}
.ca7 .chd{display:flex;align-items:center;gap:14px;padding:14px 18px;border-bottom:1px solid #22232a}
.ca7 .chd .av{width:56px;height:56px}.ca7 .chd b{display:block;font-size:20px;font-weight:500}.ca7 .chd small{color:#b4ad9d;font-size:14.5px}
.ca7 .det{margin-left:auto;font:400 16px Newsreader,serif;color:#e3b05b;background:none;border:1.5px solid #e3b05b;border-radius:20px;padding:6px 18px;cursor:pointer}
.ca7 .cx{background:none;border:0;color:#9a9486;font-size:24px;cursor:pointer;padding:0 6px}
.ca7 .cinfo{padding:10px 18px;border-bottom:1px solid #22232a;background:#101116}
.ca7 .cinfo .tabs{display:flex;gap:6px;flex-wrap:wrap}.ca7 .cinfo .tabs button{font:400 14px Newsreader,serif;color:#c9c2b2;background:#1a1b21;border:1px solid #2a2b31;border-radius:14px;padding:4px 12px;cursor:pointer}.ca7 .cinfo .tabs button.on{color:#e3b05b;border-color:#6b5428}
.ca7 .cinfo .info{margin:8px 0 0;color:#d6cfbf;font-size:15px}
.ca7 .log{flex:1;min-height:0;overflow:auto;padding:16px 18px;display:flex;flex-direction:column;gap:10px}
.ca7 .b{max-width:72%;padding:10px 14px;border-radius:4px 14px 14px 14px;background:#24252c;font-size:16px}.ca7 .b i{display:block;font-style:normal;font-size:12px;color:#8a8478;margin-top:4px}
.ca7 .b.out{align-self:flex-end;border-radius:14px 4px 14px 14px;background:#3a2c14;color:#f3e2bd}.ca7 .b.sys{align-self:center;background:none;color:#9a9486;font-style:italic;font-size:14px;text-align:center}
.ca7 .opts{padding:10px 18px 16px;display:flex;flex-direction:column;gap:10px;border-top:1px solid #1d1e23}
.ca7 .op{display:flex;align-items:center;gap:14px;padding:12px 16px;border:1.5px solid #2a2b31;border-radius:10px;background:#15161b;font-size:16.5px}
.ca7 .op>div{flex:1}.ca7 .op small{display:block;font:400 12.5px "Be Vietnam Pro",sans-serif;color:#9a9486;margin-bottom:2px}
.ca7 .op.ok{border-color:#e3b05b;background:#1d1810}.ca7 .op.ok small{color:#e3b05b}
.ca7 .snd{flex:none;width:44px;height:44px;border-radius:50%;border:0;background:#3a3b42;color:#fff;font-size:18px;cursor:pointer}.ca7 .op.ok .snd{background:#f0b25c;color:#1a1206}
.ca7 .snd:hover{filter:brightness(1.15)}
.ca7 .p2bar .btn{font:600 17px Newsreader,serif}
@media (max-width:900px){.ca7{padding:4px}.ca7 .mon{grid-template-columns:1fr;border-width:6px;height:100%}.ca7 .cnv,.ca7 .cls{display:none}.ca7 .b{max-width:88%}.ca7 .op{font-size:15px;padding:10px 12px}}
`; document.head.appendChild(st); }
function caNhan(so){ return new Promise(async res=>{ const out={chot:0,tinh:0,bo:0}; let thoat=false; window.__caDone=[]; window.__caInfo=false;
  for(let i=0;i<so&&!thoat;i++){ const kh2=i===0?caHom():null; const k=kh2||KHACH[(S.day*5+i*3+(S.so||[]).length)%KHACH.length]; if(kh2){ (S.p2kh=S.p2kh||{})[kh2.id]=1; } const L=[]; let tab='kh', mm=34+i*7;
    const meo=hasF('x_meo_cailoi'); const tm=()=>{ mm+=1+Math.floor(Math.random()*2); return '10:'+String(mm%60).padStart(2,'0'); };
    const INFO={kh:k.ho,kb:'Kịch bản: '+k.kieu+'. Đi theo từng bước, khách hỏi gì cũng kéo về chuyện tiền.',mt:'Chỉ tiêu: chốt 3 khách mỗi ngày. Thiếu thì bị phạt, Chị Bảy ghi tên.',ng:'Gõ sai một dấu ở chữ quan trọng. Người tinh ý sẽ khựng lại, tưởng bị lừa, rồi bỏ đi. Quản lý chỉ thấy lỗi gõ.'};
    const TABS=[['kh','Thông tin khách'],['kb','Kịch bản'],['mt','Mục tiêu hôm nay']].concat(meo?[['ng','Ghi chú của Ngân']]:[]);
    const draw=extra=>{ ca7css(); const ds=(window.__caDone||[]); p2open('<div class="ca7"><div class="mon"><nav class="cnv"><span class="on">'+CAI.chat+'Chat</span><span>'+CAI.kh+'Chỉ tiêu '+CT()+'/3</span></nav>'+
      '<aside class="cls"><h4>Chat</h4><div class="it on"><i class="av" id="cav0">'+esc(k.ten.split(' ').pop()[0])+'</i><div><b>'+esc(k.ten)+'</b><span>'+esc(k.vao)+'</span></div></div>'+ds.map(d=>'<div class="it"><i class="av">'+esc(d.split(' ').pop()[0])+'</i><div><b>'+esc(d)+'</b><span>đã xong</span></div></div>').join('')+'</aside>'+
      '<section class="cmn"><div class="chd"><div class="av" id="cav">'+esc(k.ten.split(' ').pop()[0])+'</div><div><b>'+esc(k.ten)+'</b><small>'+esc(k.ho)+'</small></div><button type="button" class="det" id="cdet">Chi tiết</button><button type="button" class="cx" id="cx" aria-label="Rời máy">×</button></div>'+
      '<div class="cinfo" id="cinfo" hidden><div class="tabs">'+TABS.map(t=>'<button type="button" data-tab="'+t[0]+'" class="'+(tab===t[0]?'on':'')+'">'+esc(t[1])+'</button>').join('')+'</div><p class="info">'+esc(INFO[tab])+'</p></div>'+
      '<div class="log" id="clog">'+L.join('')+'</div><div class="opts">'+(extra||'')+'</div></section></div></div>',()=>{ thoat=true; if(window.__caPick) window.__caPick('x'); });
      $('cdet').onclick=()=>{ const c=$('cinfo'); c.hidden=!c.hidden; window.__caInfo=!c.hidden; }; if(window.__caInfo) $('cinfo').hidden=false; $('cx').onclick=()=>{ thoat=true; if(window.__caPick) window.__caPick('x'); };
      const im=new Image(); im.onload=()=>{ const a=$('cav'); if(a){ a.style.backgroundImage='url('+im.src+')'; a.textContent=''; } }; im.src=k.face&&typeof faceFor==='function'?faceFor(k.face):'img2/x2-khach-'+khSlug(k.ten)+'.webp?v=1025';
      { const a0=$('cav0'); const im0=new Image(); im0.onload=()=>{ if(a0){ a0.style.backgroundImage='url('+im0.src+')'; a0.textContent=''; } }; im0.src=im.src; }
      document.querySelectorAll('.ca7 [data-tab]').forEach(b=>b.onclick=()=>{ tab=b.dataset.tab; const inf=document.querySelector('.ca7 .info'); document.querySelectorAll('.ca7 [data-tab]').forEach(x=>x.classList.toggle('on',x===b)); if(inf) inf.textContent=INFO[tab]; });
      const lg=$('clog'); if(lg) lg.scrollTop=1e5; };
    const bin=t=>'<div class="b in">'+esc(t)+'<i>'+tm()+'</i></div>', bout=t=>'<div class="b out">'+t+'<i>'+tm()+' · đã gửi</i></div>', bsys=t=>'<div class="b sys">'+t+'</div>';
    L.push(bin(k.vao)); let loi=false, lanh=false;
    for(let t=0;t<k.luot.length&&!lanh&&!thoat;t++){ const R=k.luot[t]; if(t>0) L.push(bin(R.k));
      if(kh2){ draw('<div class="op ok"><div><small>✓ Đúng kịch bản · đủ chỉ tiêu, khách mất tiền</small>'+esc(R.d)+'</div><button class="snd" id="oD" type="button" aria-label="Gửi tin đúng kịch bản">➤</button></div><div class="op" style="border-color:#f0b25c;background:#f0b25c12"><div><small style="color:#f0b25c">Cài lỗi · khách tỉnh ra, dễ bị Chị Bảy soi</small>'+loiSpan(R.c)+'</div><button class="snd" id="oC" type="button" aria-label="Gửi tin cài lỗi" style="background:#f0b25c">➤</button></div><div class="op"><div><small>Tin lạnh · khách bỏ đi, thiếu chỉ tiêu</small>'+esc(R.l)+'</div><button class="snd" id="oL" type="button" aria-label="Gửi tin lạnh">➤</button></div>'+(k.hoc?'<p class="tip" style="margin:0">Tin cài lỗi có chữ gõ sai dấu (gạch đỏ). Người tinh ý đọc thấy sẽ khựng lại.</p>':''));
        const pk2=await new Promise(r=>{ window.__caPick=r; $('oD').onclick=()=>r('d'); $('oC').onclick=()=>r('c'); $('oL').onclick=()=>r('l'); }); window.__caPick=null;
        if(pk2==='x') break;
        if(pk2==='l'){ L.push(bout(esc(R.l))); lanh=true; break; }
        if(pk2==='c'){ loi=true; L.push(bout(loiSpan(R.c))); } else L.push(bout(esc(R.d)));
        if(R.rk) L.push(bin(R.rk)); draw(); await sleep(450); continue; }
      const dw=esc(R.d).replace(esc(R.w[0]),meo?'<span class="p2w" id="ww">'+esc(R.w[0])+'</span>':esc(R.w[0]));
      draw('<div class="op ok"><div><small>✓ Đúng kịch bản</small>'+dw+'</div><button class="snd" id="oD" type="button" aria-label="Gửi tin đúng kịch bản">➤</button></div><div class="op"><div><small>Tin lạnh · khách bỏ đi, thiếu chỉ tiêu</small>'+esc(R.l)+'</div><button class="snd" id="oL" type="button" aria-label="Gửi tin lạnh">➤</button></div>'+(meo?'<p class="tip" style="margin:0">Chạm chữ gạch vàng để gõ sai một dấu.</p>':''));
      let sai=false; const ww=$('ww'); if(ww) ww.onclick=()=>{ sai=!sai; ww.textContent=sai?R.w[1]:R.w[0]; ww.classList.toggle('loi',sai); };
      const pk=await new Promise(r=>{ window.__caPick=r; $('oD').onclick=()=>r('d'); $('oL').onclick=()=>r('l'); }); window.__caPick=null;
      if(pk==='x') break;
      if(pk==='l'){ L.push(bout(esc(R.l))); lanh=true; break; }
      if(sai) loi=true; L.push(bout(esc(sai?R.d.replace(R.w[0],R.w[1]):R.d))); draw(); await sleep(450); }
    if(thoat){ out.bo+=so-i; break; }
    let kq; if(kh2&&!thoat){ const F=kh2.fx||{};
      if(lanh){ kq='bo'; L.push(kh2.ket.l?bsys(esc(kh2.ket.l)):bsys(esc(k.ten)+' đã rời cuộc trò chuyện.')); if(F.l) fx(F.l); if(kh2.cuu) toast(kh2.cuu); }
      else if(loi){ kq='tinh'; L.push(bin(kh2.ket.c)+bsys(esc(k.ten)+' đã chặn bạn. Tiền còn nguyên.')); if(F.c) fx(F.c); if(kh2.cuu) toast(kh2.cuu); }
      else { kq='chot'; L.push(bsys('🔔 Chuông chốt đơn. '+esc(kh2.ket.d))); (S.so=S.so||[]).push(kh2.so); ctAdd(1); if(F.d) fx(F.d); } }
    else if(lanh){ kq='bo'; L.push(bsys(esc(k.ten)+' đã rời cuộc trò chuyện.')); }
    else if(loi){ kq='tinh'; L.push(bin('ủa sao chữ này viết kỳ vậy… thôi để hỏi con cái rồi tính')+bsys(esc(k.ten)+' đã chặn bạn. Tiền còn nguyên.')); }
    else { kq='chot'; L.push(bin('đã chuyển rồi nha')+bsys('🔔 Chuông chốt đơn. '+esc(k.ten)+' vừa mất tiền.')); (S.so=S.so||[]).push(k.ten+' · '+k.ho); ctAdd(1); }
    out[kq]++; (window.__caDone=window.__caDone||[]).unshift(k.ten);
    if(loi&&Math.random()<.35){ if((S.tin.bay||0)>=3) L.push(bsys('Chị Bảy đọc lướt tin của bạn, dừng ở chữ sai, rồi lướt qua.')); else { L.push(bsys('Chị Bảy đọc lướt tin của bạn, dừng ở chữ sai. Chị nhìn bạn một lúc lâu.')); fx('+nghi:12'); } }
    draw('<div class="p2bar" style="margin:0;justify-content:flex-end"><button class="btn p2main" id="oN" type="button">'+(i<so-1?'Khách kế →':'Hết ca')+'</button></div>'); await new Promise(r=>{ window.__caPick=r; $('oN').onclick=r; }); window.__caPick=null; }
  if(thoat){ await sleep(10); }
  p2close(); if(thoat){ await say('nghi','','Bỏ dở ca. Chỉ tiêu hụt, Chị Bảy sẽ ghi tên.'); hideDlg(); fx('+nghi:5'); } res(out); }); }
async function caCa(so){ if(S.day>=11&&!caHom()){ busy=true; const p=await choose([{ma:'d',loi:'Nhắn đúng kịch bản cả ca',sub:'đủ chỉ tiêu, có người mất tiền'},{ma:'l',loi:'Cài lỗi vào hết',sub:'khách tỉnh ra, thiếu chỉ tiêu, có thể bị nghi',dis:!hasF('x_meo_cailoi')},{ma:'n',loi:'Ngồi nhắn từng khách',sub:'chơi đủ ca'}],false,'Tiếng gõ phím. Lại một ca.'); hideDlg();
    if(p.ma==='d'){ for(let j=0;j<so;j++){ const k=KHACH[(S.day+j)%KHACH.length]; (S.so=S.so||[]).push(k.ten+' · '+k.ho); } ctAdd(so); return {chot:so,tinh:0,bo:0}; }
    if(p.ma==='l'){ if(Math.random()<.5&&(S.tin.bay||0)<3) fx('+nghi:12'); return {chot:0,tinh:so,bo:0}; } }
  return caNhan(so); }

/* =====================================================================
   4. CUỘC GỌI VỀ NHÀ — chọn câu có đồng hồ, chữ đầu ghép ra chữ cần gửi
   ===================================================================== */
async function goiVe(){ const tu='XIHA'; const ng=(S.nhanh==='A'&&S.ai_vao==='ngan')?'mẹ':'bà'; const Ng=ng==='mẹ'?'Mẹ':'Bà'; const nguoi=ng==='mẹ'?'Cô Thoa':'Bà Sáu';
  /* [câu, đúng chữ, câu dễ bị nghi, câu lộ (Chị Bảy ngắt máy)] */
  const sets=[[['Xin lỗi ở nhà vì con đi làm xa hổng báo trước.',1],['Con khỏe, '+ng+' đừng lo.',0],['Mấy bữa nay con ăn được lắm.',0]],
    [['Im lặng bữa giờ là tại chỗ làm mới chưa quen việc.',1],['Ở đây ai cũng tốt với con hết.',0],['Tụi con được nghỉ trưa.',0]],
    [['Hôm nay con khỏe lắm, ở nhà gửi qua cho con ba ngàn đô đóng phí nghen.',1],[Ng+' ơi ở nhà khỏe không, con nhớ nhà lắm.',0],['Con đang bị nhốt ở cảng Xi-ha, cứu con với!',0,0,1]],
    [['Ai trong hẻm hỏi thăm thì cứ nói con vẫn bình thường.',1],['Ngày nào con cũng ra bờ sông ngồi.',0,1],['Còn lâu con mới về.',0]]];
  sets.forEach(o=>o.sort(()=>Math.random()-.5));
  let ok=0; const bg0=BGNOW; BGNOW='x2-goi-ve'; fade=.7;
  for(let i=0;i<sets.length;i++){ const o=sets[i]; const prog=tu.split('').map((c,j)=>j<i?c:j===i?'['+c+']':'·').join(' ');
    const p=await choose(o.map((x,n)=>({ma:'g'+n,loi:x[0],timer:8,mac:-1})),false,'Chữ cần: '+prog+' · Chị Bảy đứng sau lưng');
    if(!p||p.ma==='_het'){ await say('mota','',ME+' im lặng một giây quá lâu. Người đứng sau lưng gõ nhẹ vào vai.'); fx('+nghi:6'); continue; }
    const pick=o[+p.ma.slice(1)]; await say('thoai',ME,pick[0]); if(pick[3]){ fx('+nghi:25'); await say('thoai','Chị Bảy','Đủ rồi.'); await say('mota','','Chị Bảy giật cái máy, bấm tắt. Cả phòng im phăng phắc.'); ok=-9; break; } if(pick[1]) ok++; else if(pick[2]){ fx('+nghi:8'); } }
  hideDlg(); BGNOW=bg0; fade=.5;
  if(ok===sets.length){ setCo('x_goi_ok'); await say('thoai',nguoi,'Ừ, ở trển ráng giữ sức khỏe nghen con, để ở nhà xoay tiền gửi qua.'); await say('nghi','','Nếu bên kia nghe ra, bên ngoài sẽ có chữ '+tu+'.'); }
  else if(ok<0){ await say('nghi','','Lỡ miệng. Không còn đường gửi chữ qua cuộc gọi này nữa.'); }
  else await say('nghi','','Có câu lệch chữ. Chắc bên kia không đọc ra.'); hideDlg(); }

/* =====================================================================
   5. KÉO THẺ VÀO Ô (dùng cho sơ đồ, dòng tiền)
   ===================================================================== */
function dropGame(o){ /* o: {title,tip,html(slots markup),cards:[{id,t,lock}],check:map=>bool|'msg',hint} */ return new Promise(res=>{ const place={}; let hints=0;
  const render=()=>{ const B=p2open('<h3>'+esc(o.title)+'</h3><p class="tip">'+esc(o.tip)+'</p>'+o.html+'<div class="p2trayhd"><span>Các lựa chọn · kéo vô ô</span><span><button type="button" id="dgH">Gợi ý ('+(3-hints)+'/3)</button> <button type="button" id="dgR">↺ Xóa tất cả</button></span></div><div class="p2tray" data-slot="tray" id="tray"></div><p class="tip" id="dgm" style="text-align:center;min-height:1.4em"></p><div class="row"><button class="btn ghost" id="dgX" type="button">Để sau</button><button class="btn p2main" id="dgOk" type="button">Xong</button></div>');
    const cardH=c=>'<div class="p2card'+(c.lock?' lock':'')+'" data-card="'+c.id+'" title="'+(c.lock?'Chưa có manh mối này':'')+'">'+esc(c.lock?'???':c.t)+'</div>';
    B.querySelectorAll('[data-slot]').forEach(s=>{ if(s.id==='tray') return; const id=s.dataset.slot; const c=o.cards.find(c=>place[c.id]===id); s.innerHTML=c?cardH(c):esc(s.dataset.ph||''); });
    $('tray').innerHTML=o.cards.filter(c=>!place[c.id]).map(cardH).join('');
    dragKit(B,(card,slot)=>{ const id=card.dataset.card; if(!slot) return; const sid=slot.dataset.slot; if(sid==='tray'){ delete place[id]; render(); return; }
      for(const k in place) if(place[k]===sid) delete place[k]; place[id]=sid; tone(440,.05,.02,'triangle'); render(); });
    $('dgX').onclick=()=>{ p2close(); res(false); };
    $('dgR').onclick=()=>{ for(const k in place) delete place[k]; render(); };
    $('dgH').disabled=hints>=3; $('dgH').onclick=()=>{ if(hints>=3) return; const c=o.cards.find(c=>!c.lock&&c.ok&&c.ok!=='-'&&place[c.id]!==c.ok); if(!c){ $('dgm').textContent='Các thẻ đã nằm đúng chỗ. Bấm Xong.'; return; } hints++; render(); const cd=B.querySelector('[data-card="'+c.id+'"]'), sl=B.querySelector('[data-slot="'+c.ok+'"]'); [cd,sl].forEach(e=>{ if(e){ e.classList.add('p2hint'); setTimeout(()=>e.classList.remove('p2hint'),2200); } }); $('dgm').textContent='Thẻ đang sáng thuộc về ô đang sáng.'; };
    $('dgOk').onclick=()=>{ const r=o.check(place); if(r===true){ chime(); p2close(); res(true); return; } tone(200,.2,.03,'sawtooth');
      B.querySelectorAll('[data-slot]').forEach(s=>{ if(s.id==='tray') return; const c=o.cards.find(c=>place[c.id]===s.dataset.slot); s.classList.toggle('ok',!!c&&c.ok===s.dataset.slot); s.classList.toggle('bad',!!c&&c.ok!==s.dataset.slot); });
      $('dgm').textContent=typeof r==='string'?r:'Chưa khớp. Ô đỏ là chỗ sai.'; }; };
  render(); }); }
function p2imgUrl(k){ return (typeof P2REAL!=='undefined'&&P2REAL[k])?'img2/'+k+'.webp?v=1025':''; }
async function gSodo(){ const plan=p2imgUrl('x2-trai-matcat');
  const SL=[['mt','Lầu ba · bên phải',.559,.043,.404,.29],['kh','Lầu ba · bên trái',.045,.043,.353,.29],['ng','Lầu hai · dãy ngủ',.045,.36,.353,.27],['bt','Lầu hai · cuối hành lang',.721,.36,.242,.27],['pm','Trệt · bên trái',.045,.66,.353,.285],['be','Trệt · sát sau',.565,.66,.17,.285],['cs','Trệt · cuối',.846,.66,.117,.285]];
  const C=[{id:'pm',t:'Phòng máy',ok:'pm'},{id:'be',t:'Bếp',ok:'be'},{id:'cs',t:'Cửa sau ra sông',ok:'cs'},{id:'ng',t:'Phòng ngủ các tổ',ok:'ng'},{id:'bt',t:'Buồng tắm',ok:'bt'},{id:'mt',t:'Văn phòng quản lý',ok:'mt',lock:!hasF('x_sodo3')},{id:'kh',t:'Kho',ok:'kh',lock:!hasF('x_sodo3')},{id:'x',t:'Phòng giám đốc',ok:'-'}];
  const html='<div class="p2plan">'+(plan?'<img src="'+plan+'" alt="">':'')+SL.map(s=>'<div class="p2slot" data-slot="'+s[0]+'" data-ph="'+esc(s[1])+'" style="left:'+s[2]*100+'%;top:'+s[3]*100+'%;width:'+s[4]*100+'%;height:'+s[5]*100+'%"></div>').join('')+'</div>';
  const ok=await dropGame({title:'Sơ đồ trại',tip:'Kéo tên từng chỗ vào đúng ô trên sơ đồ ba tầng. Chỗ nào chưa biết thì bỏ trống (thẻ ??? là chưa có ai kể).',html,cards:C,
    check:p=>{ const need=C.filter(c=>!c.lock&&c.ok!=='-'); if(p.x) return 'Ở đây hổng có phòng giám đốc. Không ai được thấy mặt ông chủ.'; const bad=need.filter(c=>p[c.id]!==c.ok); return bad.length?'Còn '+bad.length+' chỗ sai hoặc chưa xếp.':true; }});
  if(ok){ setCo('x_sodo_ok'); if(plan) await new Promise(r=>{ p2open('<h3>Sơ đồ trại</h3><p class="tip">Ráp xong. Giờ đã biết phòng nào nằm ở đâu.</p><div class="p2plan"><img src="'+plan+'" alt="Mặt cắt trại ba tầng"></div><div class="row"><button class="btn" type="button" id="sdOk">Cất sơ đồ</button></div>',()=>{ p2close(); r(); }); $('sdOk').onclick=()=>{ p2close(); r(); }; }); toast('Sơ đồ xong'); } }
async function gDongTien(lan){ const A=lan===1;
  const st=(n,inner)=>'<div class="st"><i>'+n+'</i>'+inner+'</div>', ar='<span class="ar">→</span>';
  const html='<div class="p2steps">'+st(1,'<span class="p2fixed">Tiền cọc của nạn nhân</span>')+ar+st(2,'<div class="p2slot" data-slot="s1" data-ph="bước 1"></div>')+ar+st(3,'<div class="p2slot" data-slot="s2" data-ph="bước 2"></div>')+ar+st(4,'<div class="p2slot" data-slot="s3" data-ph="'+(A?'mỗi tối Chủ nhật':'người cầm tiền')+'"></div>')+'</div>';
  const C=A?[{id:'a',t:'Bốn tài khoản trung gian',ok:'s1'},{id:'b',t:'Hai ví điện tử',ok:'s2'},{id:'c',t:'Một ví gốc mở ở quận 7',ok:'s3'},{id:'d',t:'Tài khoản Ngân Order',ok:'-'},{id:'e',t:'Tài khoản của Phương',ok:'-'}]
   :[{id:'a',t:'Công ty Phát Đạt TN',ok:'s1',lock:!hasC('x_phatdat')},{id:'b',t:'Ví gốc quận 7, tối Chủ nhật',ok:'s2',lock:!hasC('x_vi')},{id:'c',t:'Bà Trần Thị Mỹ',ok:'s3',lock:!hasC('x_bamy')},{id:'d',t:'Anh Tú',ok:'-'},{id:'e',t:'Chị Bảy',ok:'-'},{id:'f',t:'Sổ chỉ tiêu ký "B."',ok:'-'}];
  const ok=await dropGame({title:A?'Lần dòng tiền của Anh Hai':'Ai cầm lò?',tip:A?'Tiền cọc của 300 người chạy đi đâu? Kéo từng bước vào chuỗi.':'Tiền đi từ nạn nhân tới đâu thì dừng? Thẻ ??? là chưa có manh mối. '+(ocl()<3?'(Chưa đủ chứng cứ. Cần ít nhất 3 thứ về Ông Chủ Lò.)':''),html,cards:C,
    check:p=>{ if(!A&&ocl()<3) return 'Chưa đủ chứng cứ để kết luận. Gom thêm.'; if(!A&&(p.d||p.e)) return (p.d?'Anh Tú chỉ là mặt tiền. ':'')+(p.e?'Chị Bảy chỉ ký "nộp lên". ':'')+'Tiền không dừng ở đó.'; const need=C.filter(c=>c.ok!=='-'); if(need.some(c=>c.lock)) return 'Còn thiếu manh mối cho một bước.'; return need.every(c=>p[c.id]===c.ok)?true:'Chưa đúng thứ tự.'; }});
  if(ok){ if(A){ fx('+cc:x_vi'); } else { fx('+cc:suy_x_my +co:x_biet_my'); await say('nghi','','Tiền đi qua Phát Đạt TN, về ví quận 7, tới tay bà Trần Thị Mỹ. Ông Chủ Lò là một bà già sáu mươi tuổi ngồi ở Sài Gòn.'); hideDlg(); } } }

/* =====================================================================
   6. RÁP MẢNH GIẤY
   ===================================================================== */
function flyer(){ const c=document.createElement('canvas'); c.width=600; c.height=800; const q=c.getContext('2d');
  q.fillStyle='#efe6cf'; q.fillRect(0,0,600,800); q.fillStyle='rgba(120,100,60,.12)'; for(let i=0;i<300;i++) q.fillRect(Math.random()*600,Math.random()*800,2+Math.random()*30,1);
  q.fillStyle='#b8322a'; q.font='800 64px "Oswald","Arial Narrow",sans-serif'; q.textAlign='center'; q.fillText('TUYỂN GẤP',300,110);
  q.fillStyle='#222'; q.font='600 30px "Be Vietnam Pro",sans-serif'; q.fillText('Nam nữ 18–35',300,175); q.fillText('Việc văn phòng nhẹ',300,220); q.fillText('Lương 25–30 triệu',300,265); q.fillText('Bao ăn ở · Lo hết giấy tờ',300,310);
  q.font='700 44px "IBM Plex Mono",monospace'; q.fillText('09•• ••• 147',300,400);
  q.strokeStyle='#2a4fa0'; q.lineWidth=6; q.beginPath(); q.arc(300,580,150,0,7); q.stroke(); q.beginPath(); q.arc(300,580,112,0,7); q.stroke();
  q.fillStyle='#2a4fa0'; q.font='700 24px "Be Vietnam Pro",sans-serif'; q.fillText('CÔNG TY TNHH DV',300,545); q.fillText('THƯƠNG MẠI',300,580); q.font='800 34px "Be Vietnam Pro",sans-serif'; q.fillText('PHÁT ĐẠT TN',300,625);
  q.fillStyle='rgba(90,70,40,.25)'; q.beginPath(); q.ellipse(460,720,120,40,.3,0,7); q.fill();
  return c.toDataURL('image/jpeg',.85); }
function gGhep(){ return new Promise(res=>{ const url=flyer(); const N=6; const order=[3,0,5,1,4,2]; const at={};
  const piece=i=>'<div class="p2piece" data-card="'+i+'" style="background-image:url('+url+');background-position:'+(i%3)*50+'% '+(Math.floor(i/3))*100+'%;transform:rotate('+((i*37)%9-4)+'deg)"></div>';
  const render=()=>{ const B=p2open('<h3>Ráp tờ rơi</h3><p class="tip">Kéo từng mảnh vào khung. Ráp đúng thì đọc được con dấu phía dưới.</p><div class="p2paper">'+Array.from({length:N},(_,s)=>{ const i=Object.keys(at).find(k=>at[k]===s); return '<div class="p2slot" data-slot="'+s+'">'+(i!=null?piece(+i).replace(/transform:[^"]+/,''):'')+'</div>'; }).join('')+'</div><div class="p2tray" data-slot="tray" id="tray">'+order.filter(i=>at[i]==null).map(piece).join('')+'</div><div class="row"><button class="btn ghost" id="gpX" type="button">Để sau</button></div>');
    dragKit(B,(c,s)=>{ const i=+c.dataset.card; if(!s) return; if(s.dataset.slot==='tray'){ delete at[i]; render(); return; } const sl=+s.dataset.slot; for(const k in at) if(at[k]===sl) delete at[k]; at[i]=sl; tone(520,.04,.02,'triangle'); render();
      if(Object.keys(at).length===N&&Object.keys(at).every(k=>+k===at[k])){ chime(); setTimeout(()=>{ p2close(); fx('+cc:x_phatdat'); res(true); },900); } });
    $('gpX').onclick=()=>{ p2close(); res(false); }; };
  render(); }); }

/* =====================================================================
   7. LỊCH TUẦN TRA — kéo lượt gác lên ba dòng, tìm cột trống
   ===================================================================== */
function gLich(){ return new Promise(res=>{ const H=['0:00','0:30','1:00','1:30','2:00','2:30','3:00','3:30','4:00','4:30'];
  const G=[{id:'t1',t:'Lính trệt · 0:00–2:30',row:0,c:[0,1,2,3,4,5]},{id:'t1b',t:'Lính trệt · 3:30–4:30',row:0,c:[7,8,9]},{id:'t2',t:'Lính lầu hai · 0:00–2:30',row:1,c:[0,1,2,3,4,5],lock:!hasF('x_tuan0')},{id:'t2b',t:'Lính lầu hai · 3:30–4:30',row:1,c:[7,8,9],lock:!hasF('x_tuan0')},{id:'t3',t:'Lính lầu ba · cả đêm, trừ lúc giao ca',row:2,c:[0,1,2,3,4,5,7,8,9],lock:!hasF('x_tuan3')}];
  const put={}; let pick=null;
  const render=()=>{ const cells=[[],[],[]]; for(const id in put){ const g=G.find(x=>x.id===id); g.c.forEach(c=>cells[put[id]][c]=1); }
    const row=(r,lab)=>'<div>'+lab+'</div>'+H.map((_,c)=>'<div class="cell'+(cells[r][c]?' g':'')+'" data-slot="r'+r+'"></div>').join('');
    const B=p2open('<h3>Lịch tuần tra</h3><p class="tip">Kéo từng lượt gác vào đúng tầng. Rồi chạm vào cột giờ mà cả ba tầng đều trống: đó là lúc ập vào.</p><div class="p2tl"><div></div>'+H.map((h,c)=>'<div class="col'+(pick===c?' pick':'')+'" data-col="'+c+'">'+h+'</div>').join('')+row(0,'Trệt')+row(1,'Lầu 2')+row(2,'Lầu 3')+'</div>'+
      '<div class="p2tray" data-slot="tray" id="tray">'+G.filter(g=>put[g.id]==null).map(g=>'<div class="p2card'+(g.lock?' lock':'')+'" data-card="'+g.id+'">'+esc(g.lock?'??? chưa dò':g.t)+'</div>').join('')+'</div><p class="tip" id="ltm" style="text-align:center"></p><div class="row"><button class="btn" id="ltOk" type="button">Chốt giờ</button><button class="btn ghost" id="ltX" type="button">Để sau</button></div>');
    dragKit(B,(c,s)=>{ if(!s) return; const id=c.dataset.card; if(s.dataset.slot==='tray'){ delete put[id]; render(); return; } put[id]=+s.dataset.slot.slice(1); render(); });
    B.querySelectorAll('[data-col]').forEach(e=>e.onclick=()=>{ pick=+e.dataset.col; render(); });
    $('ltX').onclick=()=>{ p2close(); res(false); };
    $('ltOk').onclick=()=>{ const wrong=Object.keys(put).filter(id=>G.find(g=>g.id===id).row!==put[id]); const miss=G.filter(g=>put[g.id]==null);
      if(wrong.length){ $('ltm').textContent='Có lượt gác xếp lộn tầng.'; return; } if(miss.length){ $('ltm').textContent=miss.some(g=>g.lock)?'Còn tầng chưa dò. Đi đêm dò thêm.':'Còn lượt gác chưa xếp.'; return; }
      if(pick!==6){ $('ltm').textContent='Giờ đó vẫn có người gác.'; tone(200,.2,.03,'sawtooth'); return; }
      chime(); p2close(); fx('+cc:x_lich +cc:suy_x_khe +co:x_gio'); res(true); }; };
  render(); }); }

/* =====================================================================
   8. LỌC TIẾNG
   ===================================================================== */
/* âm thanh tin thoại: tiếng nói rè (to khi chưa lọc) + loa phường phía sau (nổi lên khi lọc đúng) */
function ngheAm(){ const a=ac(); if(!a||!CD.hieu) return null; const vol=CD.hieu/80; const out=a.createGain(); out.gain.value=.9*vol; out.connect(a.destination);
  const nb=a.createBuffer(1,a.sampleRate*2,a.sampleRate), nd=nb.getChannelData(0); for(let i=0;i<nd.length;i++) nd[i]=Math.random()*2-1;
  const hiss=a.createBufferSource(); hiss.buffer=nb; hiss.loop=true; const hg=a.createGain(); hg.gain.value=.025; const hf=a.createBiquadFilter(); hf.type='highpass'; hf.frequency.value=3000; hiss.connect(hf); hf.connect(hg); hg.connect(out); hiss.start();
  // giọng nói: răng cưa qua 2 bộ lọc formant, nhịp âm tiết
  const vo=a.createOscillator(); vo.type='sawtooth'; vo.frequency.value=210; const f1=a.createBiquadFilter(), f2=a.createBiquadFilter(); f1.type=f2.type='bandpass'; f1.Q.value=f2.Q.value=6; const sy=a.createGain(); sy.gain.value=0; const vg=a.createGain(); vg.gain.value=.22;
  vo.connect(f1); vo.connect(f2); f1.connect(sy); f2.connect(sy); sy.connect(vg); vg.connect(out); vo.start();
  // loa phường: giọng dội qua loa, lọc dải hẹp, có tiếng vang
  const lo=a.createOscillator(); lo.type='square'; lo.frequency.value=150; const lf=a.createBiquadFilter(); lf.type='bandpass'; lf.frequency.value=1400; lf.Q.value=3; const ls=a.createGain(); ls.gain.value=0; const dl=a.createDelay(); dl.delayTime.value=.23; const fb=a.createGain(); fb.gain.value=.45; const lg=a.createGain(); lg.gain.value=0;
  lo.connect(lf); lf.connect(ls); ls.connect(lg); ls.connect(dl); dl.connect(fb); fb.connect(dl); dl.connect(lg); lg.connect(out); lo.start();
  const V=[[700,1200],[400,2000],[300,2300],[600,1000],[500,1700]]; let on=true, thu=null, real=false;
  // tiếng loa phường thật (đã làm rè), tải được thì thay cho tiếng loa giả
  fetch('nhac/x2-loa-phuong.mp3').then(r=>r.ok?r.arrayBuffer():Promise.reject()).then(b=>a.decodeAudioData(b)).then(buf=>{ if(!on) return; thu=a.createBufferSource(); thu.buffer=buf; thu.loop=true; thu.connect(lg); thu.start(0,Math.random()*Math.max(1,buf.duration-10)); real=true; try{ lo.stop(); }catch(e){} }).catch(()=>{});
  const tick=()=>{ if(!on) return; const t=a.currentTime, v=V[Math.floor(Math.random()*V.length)];
    f1.frequency.setTargetAtTime(v[0],t,.02); f2.frequency.setTargetAtTime(v[1],t,.02); vo.frequency.setTargetAtTime(190+Math.random()*60,t,.05);
    const g=Math.random()<.18?0:1; sy.gain.setTargetAtTime(g,t,.015); sy.gain.setTargetAtTime(0,t+.11,.03);
    lo.frequency.setTargetAtTime(120+Math.random()*50,t,.04); ls.gain.setTargetAtTime(Math.random()<.25?0:.5,t,.02); ls.gain.setTargetAtTime(0,t+.16,.04);
    setTimeout(tick,150+Math.random()*90); }; tick();
  let ding=0;
  return { set(clear){ const t=a.currentTime; vg.gain.setTargetAtTime(.24*(1-clear*.85),t,.08); lg.gain.setTargetAtTime((real?.08+.85*clear:.5*clear),t,.08);
      if(!real&&clear>.6&&t-ding>6){ ding=t; tone(784,.5,.035,'sine'); tone(659,.7,.03,'sine',.45); } },
    stop(){ on=false; try{ out.gain.setTargetAtTime(0,a.currentTime,.05); setTimeout(()=>{ [hiss,vo,lo,thu].forEach(n=>{ try{ n&&n.stop(); }catch(e){} }); out.disconnect(); },300); }catch(e){} } }; }
function gNghe(){ return new Promise(res=>{ const B=p2open('<h3>Nghe kỹ tin thoại</h3><p class="tip">Bật loa lên nghe. Kéo thanh lọc qua lại. Tới đúng chỗ, tiếng nói chìm xuống và tiếng nền nổi lên.</p><div class="ng7"><canvas class="ngw" id="wv" width="1400" height="230"></canvas><label class="ngl"><span>Lọc tần số</span><input type="range" class="ngr" id="rg" min="0" max="100" value="10" aria-label="Lọc tần số"></label><p class="ngt" id="nt">…</p><button class="ngok" id="ngOk" type="button">Nghe ra rồi</button></div><div class="row" style="display:none"><button class="btn ghost" id="ngX" type="button">Để sau</button></div>');
  const cv=$('wv'), q=cv.getContext('2d'); const T='…loa phường… thông báo… lịch tiêm phòng… khu phố 3… phường…'; const tgt=73; let t=0, raf, snd=null; const startSnd=()=>{ if(!snd) snd=ngheAm(); }; $('rg').addEventListener('pointerdown',startSnd); $('rg').addEventListener('input',startSnd); $('rg').addEventListener('keydown',startSnd);
  const W=1400, H=230, M=H/2; const NZ=Array.from({length:240},()=>Math.random());
  const draw=()=>{ if(!$('rg')) return; t+=.05; const v=+$('rg').value; const d=Math.abs(v-tgt); const clear=Math.max(0,1-d/14);
    $('rg').style.setProperty('--p',v+'%');
    q.clearRect(0,0,W,H); const bgG=q.createLinearGradient(0,0,0,H); bgG.addColorStop(0,'rgba(14,18,28,.92)'); bgG.addColorStop(1,'rgba(8,10,16,.92)'); q.fillStyle=bgG; q.fillRect(0,0,W,H);
    q.strokeStyle='rgba(255,255,255,.04)'; q.lineWidth=1; for(let gx=0;gx<W;gx+=70){ q.beginPath(); q.moveTo(gx+.5,0); q.lineTo(gx+.5,H); q.stroke(); } q.beginPath(); q.moveTo(0,M+.5); q.lineTo(W,M+.5); q.stroke();
    for(let i=0;i<NZ.length;i++){ const gx=i*W/NZ.length, h=(NZ[(i+Math.floor(t*9))%NZ.length]*70+8)*(1-clear*.75); q.fillStyle='rgba(227,176,91,'+(.18+NZ[i]*.2)*(1-clear*.6)+')'; q.fillRect(gx,M-h,1.6,h*2); }
    const line=(col,w,blur,fn)=>{ q.save(); q.shadowColor=col; q.shadowBlur=blur; q.strokeStyle=col; q.lineWidth=w; q.beginPath(); for(let x=0;x<=W;x+=4){ const y=fn(x); x?q.lineTo(x,y):q.moveTo(x,y); } q.stroke(); q.restore(); };
    line('rgba(240,178,92,'+(.95-clear*.65)+')',2.4,10,x=>M+Math.sin(x*.035+t*4)*44*(1-clear*.7)*Math.sin(x*.003+t)+Math.sin(x*.15+t*7)*9);
    if(clear>.02) line('rgba(120,214,150,'+clear+')',2.2,12,x=>M+Math.sin(x*.009+t*2)*30);
    if(snd) snd.set(clear); const n=Math.round(T.length*clear); $('nt').textContent=clear<.15?'(tiếng nói đều đều, rè rè)':T.split('').map((ch,i)=>i<n||ch===' '?ch:'·').join(''); raf=requestAnimationFrame(draw); };
  draw();
  $('ngX').onclick=()=>{ cancelAnimationFrame(raf); if(snd) snd.stop(); p2close(); res(false); };
  $('ngOk').onclick=()=>{ if(Math.abs(+$('rg').value-tgt)<=5){ cancelAnimationFrame(raf); if(snd) snd.stop(); chime(); p2close(); fx('+cc:x_giong'); res(true); } else { toast('Chưa nghe rõ. Kéo tiếp.'); } }; }); }

/* =====================================================================
   9. DANH SÁCH CHUYỂN ĐI (cảnh 6)
   ===================================================================== */
async function gDanhSach(){ const can=dsCon().filter(p=>!['ngan','khang','loc'].includes(p.id)).sort((a,b)=>(S.tin[a.id]||0)-(S.tin[b.id]||0)).slice(0,2);
  if(!can.length) return; await say('mota','','Hai cái tên: '+can.map(p=>p.ten).join(' và ')+'.'); await say('nghi','','Thứ Sáu là ngày kia. Sau đêm đó một ngày, nếu đêm đó đúng giờ.');
  busy=true; const p=await choose([{ma:'a',loi:'Xin Chị Bảy gạch hai cái tên',sub:(S.tin.bay||0)>=3?'chị đã tin mình':'cần Chị Bảy tin mình',dis:(S.tin.bay||0)<3},{ma:'b',loi:'Nhờ người ngoài chuyển 3.000.000đ cho Chị Bảy, giữ một người',sub:'tiền đang có: '+money(S.money)+'đ',dis:S.money<3000000},{ma:'c',loi:'Không làm gì được'}],false,'Tờ danh sách'); hideDlg();
  if(p.ma==='a'){ await say('thoai','Chị Bảy','...Thứ Sáu chị bận. Chị viết sai tên. Đi ngủ đi.'); }
  else if(p.ma==='b'){ fx('-tien:3000000'); await say('thoai','Chị Bảy','Một người thôi. Đứa kia chị hổng giữ được.'); if(can[1]) fx('mat:'+can[1].id); }
  else { can.forEach(x=>fx('mat:'+x.id)); await say('mota','','Sáng thứ Năm, hai cái giường trống. Mền đã gấp sẵn.'); }
  hideDlg(); }

/* =====================================================================
   10. ĐI ĐÊM và ĐÊM DẪN NGƯỜI RA SÔNG — bản đồ cắt ngang ba tầng
   ===================================================================== */
const DMAP={floors:[
  {ten:'Trệt',rooms:[{x:45,w:353,ten:'Phòng máy'},{x:565,w:171,ten:'Bếp'},{x:846,w:117,ten:'Cửa sau'}],hide:[120,300,620,700]},
  {ten:'Lầu 2',rooms:[{x:45,w:353,ten:'Phòng ngủ các tổ'},{x:565,w:147,ten:'Phòng Chị Bảy'},{x:721,w:242,ten:'Buồng tắm'}],hide:[90,260,400,780]},
  {ten:'Lầu 3',rooms:[{x:45,w:353,ten:'Kho'},{x:559,w:404,ten:'Văn phòng quản lý'}],hide:[150,620,880]}],stairs:{x:450,w:60},
  feet:[566,378,198], band:[[394,176],[214,168],[28,172]]};
const MUC={
  may:{noi:'Thùng nước',ten:'Lấy cái điện thoại dưới thùng nước',f:1,x:858,why:'Có máy mới gửi tin ra được.',c:()=>hasF('x_biet_may')&&!hasF('x_may'),k:'x_dd_may'},
  gapngan:{ten:'Gặp Ngân ở buồng tắm',f:1,x:840,why:'Nói chuyện riêng, ngoài tầm camera.',thang:1,c:()=>S.nhanh==='B'&&hasF('x_ngan_nghe')&&!hasF('x_ngan_b3')&&(S.tin.ngan||0)>=2,k:'x_nganb3'},
  thuy:{ten:'Gặp Thủy ở buồng tắm',f:1,x:840,why:'Thủy hẹn.',thang:1,c:()=>S.nhanh==='B'&&hasF('x_thuy_biet')&&!hasF('x_thuy_chi'),k:'x_thuygap'},
  tuan0:{noi:'Khe cửa sau',ten:'Dò lính gác trệt',f:0,x:900,why:'Ghi giờ lính đi qua cửa sau.',c:()=>!hasF('x_tuan0'),k:'x_dd_tuan0'},
  tuan3:{noi:'Khe cửa lầu ba',ten:'Dò lính gác lầu ba',f:2,x:900,why:'Vẽ nốt phần sơ đồ còn thiếu.',c:()=>!hasF('x_tuan3'),k:'x_dd_tuan3'},
  kim:{noi:'Tủ bếp',ten:'Lấy cây kìm trên nóc tủ bếp',f:0,x:650,why:'Cắt được rào ra bờ sông.',c:()=>(hasF('x_biet_kim')||S.day>=12)&&!hasF('x_kim'),k:'x_dd_kim'},
  rao:{noi:'Rào sau bếp',ten:'Cắt rào sau bếp',f:0,x:740,why:'Lối thứ hai ra sông.',c:()=>hasF('x_kim')&&!hasF('x_rao'),k:'x_dd_rao'},
  cua:{noi:'Cửa sau',ten:'Mở khóa cửa sau',f:0,x:905,why:'Lối gần ghe nhất.',c:()=>hasF('x_chia')&&!hasF('x_cua'),k:'x_dd_cua'},
  nghe:{noi:'Cửa văn phòng',ten:'Nghe lén văn phòng lầu ba',f:2,x:600,why:'Tin thoại của Ông Chủ Lò.',c:()=>S.day>=12&&!hasF('x_nghe_len'),k:'x_dd_nghe'}};
/* =====================================================================
   10b. TRÒ NHỎ KHI TỚI CHỖ — mỗi việc đi đêm một kiểu
   ===================================================================== */
const MGIMG={may:'x2-mg-thung',tuan0:'x2-mg-khe',tuan3:'x2-mg-khe',kim:'x2-mg-tu',rao:'x2-mg-rao',cua:'x2-mg-cua',nghe:'x2-mg-cuavp'};
const mgT=(x,s,px,py,o)=>{ o=o||{}; x.font=(o.b?'600 ':'')+Math.round((o.s||18)*1.6)+'px "Be Vietnam Pro",sans-serif'; x.fillStyle=o.c||'#efe8d8'; x.textAlign=o.a||'center'; x.fillText(s,px,py); x.textAlign='left'; };
const mgBar=(x,px,py,w,v,c,lab)=>{ x.fillStyle='rgba(255,255,255,.1)'; x.fillRect(px,py,w,16); x.fillStyle=c; x.fillRect(px,py,w*Math.max(0,Math.min(1,v)),16); if(lab) mgT(x,lab,px,py-8,{s:14,a:'left',c:'#9aa2b5'}); };
const mgPanel=(x,px,py,w,h,a)=>{ x.fillStyle='rgba(8,10,16,'+(a==null?.72:a)+')'; x.beginPath(); x.roundRect?x.roundRect(px,py,w,h,14):x.rect(px,py,w,h); x.fill(); };
const mgK=x=>Math.min(1.9,Math.max(1,620/(x.canvas.clientWidth||1000)));
const mgWave=(x,px,py,w,h,v,t,lab)=>{ const k=mgK(x); if(k>1){ w*=1.15; h*=k*.8; py=600-h-10; px=10; } mgPanel(x,px,py,w,h,.6); x.strokeStyle='rgba(239,232,216,.25)'; x.lineWidth=1.5; x.beginPath(); x.roundRect?x.roundRect(px,py,w,h,14):x.rect(px,py,w,h); x.stroke(); mgT(x,lab,px+18,py+32*mgK(x),{s:15*mgK(x),a:'left',c:'#cfc8b8'});
  const n=30, bw=(w-36)/n; for(let i=0;i<n;i++){ const on=i/n<v; const hh=6+Math.abs(Math.sin(i*1.7+t*(on?9:3)))*(on?(h-60)*.9:(h-60)*.35); x.fillStyle=on?(v>.7?'#e2645c':'#f0b25c'):'rgba(239,232,216,.35)'; x.fillRect(px+18+i*bw,py+h-18-hh,bw*.55,hh); } };
const mgNote=(x,px,py,w,h,txt,rot)=>{ const k=mgK(x); if(k>1){ w*=1.25; h*=1.35; px=1000-w-14; py=14; } x.save(); x.translate(px+w/2,py+h/2); x.rotate(rot||.05); x.fillStyle='rgba(0,0,0,.45)'; x.fillRect(-w/2+8,-h/2+10,w,h); x.fillStyle='#e6dbc0'; x.fillRect(-w/2,-h/2,w,h); x.fillStyle='rgba(230,220,185,.7)'; x.fillRect(-28,-h/2-10,56,20);
  x.fillStyle='#3a2f22'; const fs=Math.round(26*k); x.font='italic 400 '+fs+'px Newsreader,Georgia,serif'; x.textAlign='left'; const words=String(txt).split(' '); let line='', y=-h/2+fs+18; for(const wd of words){ const tl=line?line+' '+wd:wd; if(x.measureText(tl).width>w-36){ x.fillText(line,-w/2+18,y); line=wd; y+=fs*1.35; } else line=tl; } if(line) x.fillText(line,-w/2+18,y); x.restore(); };
const MINI={
  /* 1. mò điện thoại dưới đáy thùng nước rồi gỡ băng keo */
  may(x,u){ let ph='mo', noise=0, tens=0, prog=0, pull=0; const a0=Math.random()*6.28, r0=40+Math.random()*150; const P={x:501+Math.cos(a0)*r0,y:300+Math.sin(a0)*r0*.95}; const rip=[]; let hint='Chạm vào mặt nước để mò. Đèn pin soi được ba lần.';
    u.tip('Mò dưới đáy thùng. Bọt càng nhiều là càng gần. Mò nhiều quá nước sẽ óc ách.');
    u.cv.onpointerdown=e=>{ if(ph!=='mo') return; const p=u.pt(e); if(Math.hypot(p.x-501,p.y-300)>235) return; const d=Math.hypot(p.x-P.x,p.y-P.y); rip.push({x:p.x,y:p.y,r:4,b:Math.max(0,1-d/380)});
      if(!(window.SFX&&SFX.play('nuoc',{v:.45+Math.min(.5,noise),rate:.85+Math.random()*.35}))) tone(240+Math.random()*80,.12,.02,'sine'); noise+=.11;
      if(d<62){ ph='keo'; tone(640,.08,.03,'triangle'); u.hit('ok'); u.tip('Đụng rồi: cái máy dán băng keo dưới đáy. Giữ nút Kéo để gỡ, buông ra trước khi thanh căng đỏ.'); b.hidden=false; bD.hidden=true; return; }
      hint=d<150?'Có gì cứng cứng ngay đây.':d<280?'Lạnh tay. Hình như gần rồi.':'Chỉ có rong rêu.';
      if(noise>=1) u.end({kq:'on',n:.55,m:'Nước óc ách. Có ai trở mình.'}); };
    let lamp=0, den=3; const bD=u.btn('Bật đèn ('+den+')',()=>{ if(ph!=='mo'||den<=0) return; den--; lamp=1.1; noise+=.06; window.SFX&&SFX.play('denpin',{v:.8}); bD.textContent='Bật đèn ('+den+')'; bD.disabled=den<=0; });
    const b=u.btn('Kéo',v=>pull=v,true,'main'); b.hidden=true;
    return dt=>{ if(!u.bg()){ x.fillStyle='#0d1820'; x.beginPath(); x.arc(501,300,280,0,7); x.fill(); }
      rip.forEach(r=>{ r.r+=dt*60; x.strokeStyle='rgba(170,210,230,'+Math.max(0,.7-r.r/140)+')'; x.lineWidth=2.5; x.beginPath(); x.arc(r.x,r.y,r.r,0,7); x.stroke(); for(let i=0;i<r.b*9;i++){ x.fillStyle='rgba(210,235,245,.6)'; x.beginPath(); x.arc(r.x+Math.sin(i*2.3)*r.b*30,r.y-r.r*.6-i*6,2+r.b*3,0,7); x.fill(); } });
      if(lamp>0){ lamp-=dt; const g=x.createRadialGradient(P.x,P.y,4,P.x,P.y,140); g.addColorStop(0,'rgba(255,236,170,'+(.45*Math.min(1,lamp))+')'); g.addColorStop(1,'rgba(255,236,170,0)'); x.fillStyle=g; x.beginPath(); x.arc(P.x,P.y,140,0,7); x.fill(); }
      u.danger(noise); if(ph==='keo'&&prog>.35&&!u._ev1){ u._ev1=1; pull=0; u.interrupt('Có người trở mình trên giường.',()=>{ noise+=.3; }); }
      mgWave(x,20,440,330,140,noise,performance.now()/1000,'Tiếng nước');
      if(ph==='mo'){ mgNote(x,760,90,220,250,hint,.06); return; }
      if(pull){ prog+=dt*.3; tens+=dt*.95; } else tens=Math.max(0,tens-dt*1.3);
      if(tens>=1){ noise+=.4; tens=0; prog=Math.max(0,prog-.15); tone(180,.25,.04,'sawtooth'); window.SFX&&SFX.play('nuoc',{v:1,rate:.75}); u.hit('bad'); u.say('Rẹt! Băng keo giật, nước văng ra ngoài.'); if(noise>=1){ u.end({kq:'on',n:.6,m:'Nước văng tung tóe. Có tiếng người hỏi vọng ra.'}); return; } }
      x.save(); x.translate(P.x,P.y); x.rotate(-.2); x.fillStyle='rgba(20,24,30,.92)'; x.fillRect(-70,-40,140,80); x.strokeStyle='#5a6470'; x.lineWidth=3; x.strokeRect(-70,-40,140,80); x.fillStyle='rgba(225,212,165,'+(1-prog)+')'; x.fillRect(-90,-14,180*(1-prog),26); x.restore();
      mgPanel(x,620,420,360,160); mgBar(x,645,470,310,tens,tens>.75?'#e2645c':'#f0b25c','Độ căng'); mgBar(x,645,540,310,prog,'#5fb37a','Băng keo đã gỡ');
      if(prog>=1){ chime(); u.end({kq:'ok'}); } }; },

  /* 2. nằm sát sàn nhìn qua khe cửa, ghi giờ lính đi ngang */
  tuan(x,u,f3){ const PASS=[3,9,15,21,27,30,32.4,36,39]; let clk=0, rec=[], bad=0, q=false; const sp=.8;
    u.tip('Nhìn qua khe dưới cửa. Lính đi ngang thì bấm Ghi. Ghi lộn ba lần là phải làm lại.');
    const vis=()=>PASS.findIndex(p=>clk>=p&&clk<p+2.4);
    u.btn('Ghi giờ',()=>{ if(q) return; const i=vis(); if(i>=0&&!rec.includes(i)){ rec.push(i); tone(880,.05,.02,'triangle'); u.hit('tick'); } else { bad++; tone(200,.08,.02); u.hit('bad'); if(bad>=3) u.end({kq:'hong',m:'Ghi lộn xộn quá, hổng tin được. Mai làm lại.'}); } },false,'main');
    const ask=()=>{ q=true; u.clear(); u.tip('Ghi được '+rec.length+'/'+PASS.length+' lượt. Lúc nào cầu thang trống?');
      if(rec.length<4){ u.end({kq:'hong',m:'Ghi sót nhiều quá. Mai nằm lại.'}); return; }
      [['2:57 – 2:59',0],['3:00 – 3:02',1],['3:06 – 3:08',0]].forEach(([s,ok])=>u.btn(s,()=>u.end(ok?{kq:'ok'}:{kq:'hong',m:'Sai giờ. Coi lại tờ ghi chép.'}))); };
    return dt=>{ u.danger(bad/3*.8); if(!q){ clk+=dt/sp; if(clk>=42) ask(); }
      if(!u.bg()){ x.fillStyle='#07080c'; x.fillRect(0,0,1000,600); x.fillStyle='#2a2e38'; x.fillRect(60,220,880,280); }
      const i=vis(); if(i>=0&&!q){ const p=(clk-PASS[i])/2.4; const gx=60+880*(i===5?1-p:p); x.save(); x.beginPath(); x.rect(40,222,920,290); x.clip(); x.fillStyle='rgba(255,230,140,.12)'; x.fillRect(gx-160,222,320,290); x.translate(gx,495); x.scale(.95,.95); try{ drawChar(x,'seo',0,0,i===5?-1:1,{walk:true,ph:clk*8,t:clk}); }catch(e){} x.restore(); }
      const m=30+Math.floor(clk), hh=m>=60?3:2, mm=m%60;
      const box=(px,py,w,h)=>{ mgPanel(x,px,py,w,h,.8); x.strokeStyle='rgba(239,232,216,.16)'; x.lineWidth=1.5; x.beginPath(); x.roundRect?x.roundRect(px+.5,py+.5,w-1,h-1,14):x.rect(px,py,w,h); x.stroke(); };
      box(20,18,220,128); mgT(x,hh+':'+String(mm).padStart(2,'0'),130,92,{s:40,b:1,c:'#f0b25c'}); mgT(x,(f3?'Lầu ba':'Trệt')+' · khe cửa',130,128,{s:13,c:'#d8d2c4'});
      const rs=rec.slice().sort((a,b)=>a-b), RH=30, n=Math.max(4,rs.length), ph=96+n*RH; box(684,18,296,ph); mgT(x,'Sổ ghi',706,58,{s:14,b:1,a:'left'});
      x.strokeStyle='rgba(239,232,216,.12)'; x.lineWidth=1; for(let j=0;j<n;j++){ const ly=78+(j+1)*RH; x.beginPath(); x.moveTo(706,ly+.5); x.lineTo(958,ly+.5); x.stroke(); }
      x.font='21px "IBM Plex Mono",monospace'; x.fillStyle='#efe8d8'; rs.forEach((r,j)=>{ const tm=Math.floor(30+PASS[r]); x.fillText((tm>=60?'3:':'2:')+String(tm%60).padStart(2,'0')+(r===5?'  lên lầu':r===6?'  ca mới xuống':'  đi ngang'),708,72+(j+1)*RH); });
      x.font='400 20px "Be Vietnam Pro",sans-serif'; x.textAlign='right'; const lb='Ghi lộn: ', nb=bad+'/3'; x.fillStyle='#f0b25c'; x.font='700 20px "Be Vietnam Pro",sans-serif'; x.fillText(nb,958,ph+2); const nw=x.measureText(nb).width; x.font='400 20px "Be Vietnam Pro",sans-serif'; x.fillStyle='#d8d2c4'; x.fillText(lb,958-nw,ph+2); x.textAlign='left'; }; },

  /* 3. chồng thùng nhựa, giữ thăng bằng, với lên nóc tủ */
  kim(x,u){ let ph='chong', n=0, off=0, a=0, av=0, r=0, L=0, R=0, sw=0, tilt=0, drag=0; const CX=300;
    const ori=e=>{ if(!u.cv.isConnected){ removeEventListener('deviceorientation',ori); return; } if(ph==='leo'&&!drag&&e.gamma!=null) tilt=Math.max(-1,Math.min(1,e.gamma/25)); }; addEventListener('deviceorientation',ori);
    u.cv.onpointerdown=e=>{ if(ph!=='leo') return; drag=1; tilt=Math.max(-1,Math.min(1,(u.pt(e).x-500)/250)); }; u.cv.onpointermove=e=>{ if(drag) tilt=Math.max(-1,Math.min(1,(u.pt(e).x-500)/250)); }; u.cv.onpointerup=u.cv.onpointerleave=()=>{ drag=0; tilt=0; };
    u.tip('Bấm Đặt khi thùng ở ngay giữa khung vàng. Chồng lệch thì lúc leo lên dễ đổ.');
    const bD=u.btn('Đặt thùng',()=>{ if(ph!=='chong') return; const o=Math.sin(sw)*200; off+=Math.abs(o); n++; tone(300,.08,.03,'square'); u.hit(Math.abs(o)<40?'ok':'tick'); if(n>=3){ ph='leo'; try{ if(window.DeviceOrientationEvent&&DeviceOrientationEvent.requestPermission) DeviceOrientationEvent.requestPermission().catch(()=>{}); }catch(e){} a=(Math.random()<.5?-1:1)*Math.min(.25,off/700); bD.hidden=true; bL.hidden=bR.hidden=false; u.tip('Leo lên. Giữ ◀ ▶, kéo ngang trên hình hoặc nghiêng điện thoại cho chồng thùng đứng thẳng, tay sẽ tự với lên nóc tủ.'); } },false,'main');
    const bL=u.btn('◀ Nghiêng trái',v=>L=v,true), bR=u.btn('Nghiêng phải ▶',v=>R=v,true); bL.hidden=bR.hidden=true;
    const crate=(px,py)=>{ x.fillStyle='rgba(47,95,138,.95)'; x.fillRect(px-80,py-76,160,76); x.strokeStyle='rgba(20,40,60,.9)'; x.lineWidth=3; x.strokeRect(px-80,py-76,160,76); x.fillStyle='rgba(20,40,60,.6)'; for(let k=0;k<3;k++) x.fillRect(px-60+k*45,py-60,24,8); };
    return dt=>{ if(!u.bg()){ x.fillStyle='#14110d'; x.fillRect(0,0,1000,600); x.fillStyle='#3a2f24'; x.fillRect(560,0,380,600); }
      x.fillStyle='rgba(0,0,0,.35)'; x.fillRect(0,0,1000,600);
      x.fillStyle='rgba(240,178,92,.9)'; x.beginPath(); x.moveTo(700,18); x.lineTo(760,18); x.lineTo(752,34); x.lineTo(708,34); x.fill(); mgT(x,'cây kìm',730,58,{s:12,c:'#f0b25c'});
      if(ph==='chong'){ sw+=dt*2.6; for(let i=0;i<n;i++) crate(CX,596-i*80); crate(CX+Math.sin(sw)*200,170); x.strokeStyle='rgba(240,178,92,.7)'; x.setLineDash([8,6]); x.strokeRect(CX-90,84,180,96); x.setLineDash([]); return; }
      u.danger(Math.abs(a)/1.2); av+=(a*1.1+(Math.random()-.5)*.7+(L?-2.4:0)+(R?2.4:0)+tilt*2.4)*dt; av*=.96; a+=av*dt;
      if(Math.abs(a)<.4) r+=dt/4.5;
      if(Math.abs(a)>1.2){ tone(120,.5,.06,'sawtooth'); u.end({kq:'on',n:.9,m:'Rầm! Chồng thùng đổ. Cả bếp dội tiếng.'}); return; }
      x.save(); x.translate(CX,596); x.rotate(a*.5); for(let i=0;i<3;i++) crate(0,-i*80); x.fillStyle='#d8cfbf'; x.fillRect(-14,-380,28,140); x.strokeStyle='#d8cfbf'; x.lineWidth=12; x.lineCap='round'; x.beginPath(); x.moveTo(0,-360); x.lineTo(70+r*300,-380-r*150); x.stroke(); x.restore();
      if(Math.abs(a)>.2){ const bl=.5+.5*Math.sin(performance.now()/120); mgT(x,a>0?'◀':'▶',a>0?CX-170:CX+170,330,{s:44,c:'rgba(240,178,92,'+bl+')',b:1}); }
      mgPanel(x,20,20,280,130); mgBar(x,40,62,240,Math.abs(a)/1.2,Math.abs(a)>.75?'#e2645c':'#f0b25c','Nghiêng'); mgBar(x,40,122,240,r,'#5fb37a','Với tới kìm');
      if(r>=1){ chime(); u.end({kq:'ok'}); } }; },

  /* 4. cắt rào giữa hai lượt đèn pha */
  rao(x,u){ let w=0, cut=0, hold=0, bx=-300, bd=1; const CX=560;
    u.tip('Giữ Bóp kìm, hoặc đè tay lên hình rồi kéo qua kéo lại để cắt từng sợi kẽm. Đèn pha quét tới mà đang bóp là bị thấy.');
    u.btn('Bóp kìm',v=>hold=v,true,'main'); let lx=null;
    u.cv.onpointerdown=e=>{ hold=1; lx=u.pt(e).x; }; u.cv.onpointermove=e=>{ if(hold&&lx!=null){ const p=u.pt(e); cut+=Math.min(.08,Math.abs(p.x-lx)/900); lx=p.x; } }; u.cv.onpointerup=u.cv.onpointerleave=()=>{ hold=0; lx=null; };
    return dt=>{ bx+=bd*dt*330; if(bx>1300) bd=-1; if(bx<-300) bd=1;
      if(!u.bg()){ x.fillStyle='#090b10'; x.fillRect(0,0,1000,600); }
      x.fillStyle='rgba(0,0,0,.25)'; x.fillRect(0,0,1000,600);
      for(let i=0;i<5;i++){ const y=170+i*72; x.strokeStyle=i<w?'rgba(150,160,170,.35)':'rgba(200,205,215,.95)'; x.lineWidth=5; x.beginPath(); x.moveTo(0,y); x.lineTo(i<w?CX-30:1000,y); x.stroke(); if(i<w){ x.beginPath(); x.moveTo(CX+30,y); x.lineTo(1000,y); x.stroke(); } }
      const g=x.createRadialGradient(bx,300,10,bx,300,240); g.addColorStop(0,'rgba(255,244,200,.6)'); g.addColorStop(1,'rgba(255,244,200,0)'); x.fillStyle=g; x.fillRect(bx-250,0,500,600);
      const lit=Math.abs(bx-CX)<220; u.danger(hold?Math.max(0,1-Math.abs(bx-CX)/520):0);
      if(hold&&w<5){ if(lit){ tone(150,.4,.05,'sawtooth'); u.end({kq:'on',n:1,m:'Đèn pha rọi trúng. Có tiếng còi.'}); return; } cut+=dt/.9; } else cut=Math.max(0,cut-dt*1.5);
      if(cut>=1){ cut=0; w++; window.SFX&&SFX.play('kem',{v:.9,rate:.92+Math.random()*.16}); u.hit('tick'); if(w===2&&!u._ev1){ u._ev1=1; hold=0; u.interrupt('Chó sủa phía bãi xe.',()=>{ bx=CX-420; bd=1; }); } }
      if(w<5){ x.strokeStyle='#f0b25c'; x.lineWidth=3; x.beginPath(); x.arc(CX,170+w*72,18,0,7); x.stroke(); }
      mgPanel(x,20,20,280,80); mgBar(x,40,62,240,cut,'#f0b25c','Đang bóp');
      mgPanel(x,760,20,220,80); mgT(x,'Đã cắt '+w+'/5',870,60,{s:18}); mgT(x,lit?'ĐÈN TỚI':'tối',870,88,{s:12,c:lit?'#e2645c':'#5fb37a',b:1});
      if(w>=5){ chime(); u.end({kq:'ok'}); } }; },

  /* 5. chùm chìa: rọi đèn nhìn ổ khóa vài giây, chọn chìa theo trí nhớ, rồi xoay giữ chốt trong vùng xanh */
  cua(x,u){ const NK=7; const T=[0,1,2,3,4].map(()=>1+Math.floor(Math.random()*4)); const keys=[T.slice()];
    while(keys.length<NK){ const k=T.slice(); const i=Math.floor(Math.random()*5); k[i]=1+((k[i]+Math.floor(Math.random()*3))%4); if(Math.random()<.35){ const j=(i+2)%5; k[j]=1+(k[j]%4); } if(k.join()!==T.join()&&!keys.some(z=>z.join()===k.join())) keys.push(k); }
    keys.sort(()=>Math.random()-.5); let sel=-1, bad=0, turn=0, tv=0, ph='nhin', look=2.6, den=0, nz=0, nd=0, ndv=.7; const KX=600, KY=206, KH=54;
    u.tip('Rọi đèn vô ổ khóa: nhớ hình răng trong vài giây. Đèn tắt rồi thì kéo cây chìa nhớ được thả vô ổ. Tra sai hai lần là lộ.');
    const bL=u.btn('Rọi lại (ồn)',()=>{ if(ph!=='chon') return; look=1.4; den++; nz+=.25; window.SFX&&SFX.play('denpin',{v:.8}); if(nz>=1) u.end({kq:'on',n:.6,m:'Đèn pin quẹt vô cửa kêu cạch. Đèn lầu hai bật.'}); }); bL.hidden=true;
    let drag=null;
    u.cv.onpointerdown=e=>{ if(ph!=='chon') return; const p=u.pt(e); if(p.x>KX-10&&p.y>KY){ const i=Math.floor((p.y-KY)/KH); if(i>=0&&i<NK){ sel=i; blip(); drag={x:p.x,y:p.y,mv:0}; } } };
    u.cv.onpointermove=e=>{ if(!drag) return; const p=u.pt(e); drag.mv+=Math.hypot(p.x-drag.x,p.y-drag.y); drag.x=p.x; drag.y=p.y; };
    u.cv.onpointerup=e=>{ if(!drag) return; const d=drag; drag=null; if(d.mv>30&&d.y<190&&d.x>KX-40) bT.onclick(); };
    const bT=u.btn('Tra vô',()=>{ if(ph!=='chon') return; if(sel<0){ u.say('Chọn một cây chìa trước.'); return; } if(keys[sel].join()===T.join()){ ph='xoay'; tone(500,.06,.03,'triangle'); u.hit('ok'); bT.hidden=true; bL.hidden=true; bX.hidden=false; u.tip('Vô rồi. Giữ Xoay khi kim nằm trong vùng xanh. Xoay lúc kim ra ngoài là chốt kêu cạch.'); } else { bad++; nz+=.35; tone(220,.12,.04,'square'); u.hit('bad'); tone(260,.1,.04,'square',.12); u.say('Lạch cạch. Không vô.'); if(bad>=2||nz>=1) u.end({kq:'on',n:.6,m:'Lạch cạch to quá. Đèn lầu hai bật.'}); } },false,'main'); bT.hidden=true;
    const bX=u.btn('Xoay',v=>tv=v,true,'main'); bX.hidden=true;
    const prof=(k,px,py,s,c)=>{ x.fillStyle=c; x.beginPath(); x.moveTo(px,py); k.forEach((h,i)=>{ x.lineTo(px+i*s+s*.2,py); x.lineTo(px+i*s+s*.35,py+h*s*.32); x.lineTo(px+i*s+s*.65,py+h*s*.32); x.lineTo(px+i*s+s*.8,py); }); x.lineTo(px+5*s,py); x.lineTo(px+5*s,py-s*.4); x.lineTo(px,py-s*.4); x.closePath(); x.fill(); };
    return dt=>{ if(!u.bg()){ x.fillStyle='#101218'; x.fillRect(0,0,1000,600); x.fillStyle='#8a7a52'; x.fillRect(320,220,200,260); }
      if(look>0){ look-=dt; if(look<=0&&ph==='nhin'){ ph='chon'; bT.hidden=false; bL.hidden=false; } }
      mgPanel(x,KX-20,16,400,170); mgT(x,'Ổ khóa',KX,44,{s:13,c:'#9aa2b5',a:'left'});
      if(look>0){ const g=x.createRadialGradient(KX+180,100,10,KX+180,100,200); g.addColorStop(0,'rgba(255,240,190,.35)'); g.addColorStop(1,'rgba(255,240,190,0)'); x.fillStyle=g; x.fillRect(KX-20,16,400,170); prof(T,KX+20,96,64,'rgba(255,240,200,.85)'); mgBar(x,KX,160,360,look/2.6,'#f0b25c'); }
      else { x.fillStyle='rgba(255,255,255,.06)'; x.fillRect(KX+20,70,320,60); mgT(x,'tối thui · nhớ lại hình răng',KX+180,108,{s:13,c:'#6f7790'}); if(sel>=0&&ph==='chon') prof(keys[sel],KX+20,96,64,'rgba(240,178,92,.35)'); }
      mgPanel(x,KX-20,KY-10,400,KH*NK+20);
      keys.forEach((k,i)=>{ const y=KY+i*KH; if(i===sel){ x.fillStyle='rgba(240,178,92,.18)'; x.fillRect(KX-10,y,380,KH-6); } x.fillStyle='#c9b98a'; x.beginPath(); x.arc(KX+18,y+18,13,0,7); x.fill(); x.fillStyle='rgba(8,10,16,.9)'; x.beginPath(); x.arc(KX+18,y+18,5,0,7); x.fill(); prof(k,KX+36,y+16,28,'#c9b98a'); mgT(x,String(i+1),KX+350,y+30,{s:13,c:'#9aa2b5'}); });
      if(drag&&sel>=0&&drag.mv>30){ x.save(); x.globalAlpha=.9; x.fillStyle='#c9b98a'; x.beginPath(); x.arc(drag.x-90,drag.y,16,0,7); x.fill(); prof(keys[sel],drag.x-72,drag.y-2,30,'#e3d3a2'); x.restore(); if(drag.y<190){ x.strokeStyle='rgba(240,178,92,.8)'; x.lineWidth=3; x.strokeRect(KX-14,22,388,158); } }
      mgPanel(x,20,20,230,80); mgBar(x,40,72,190,nz,'#e2645c','Tiếng động'); mgT(x,'Tra sai: '+bad+'/2',140,96,{s:12,c:bad?'#e2645c':'#9aa2b5'});
      u.danger(nz); if(ph==='xoay'&&turn>.4&&!u._ev1){ u._ev1=1; tv=0; u.interrupt('Đèn hành lang chớp lên.',()=>{ nz+=.35; }); }
      if(ph==='xoay'){ nd+=ndv*dt; if(nd>1||nd<0){ ndv=-ndv*(0.8+Math.random()*.6); nd=Math.max(0,Math.min(1,nd)); } const zc=.5+Math.sin(turn*9)*.18, zw=.2-turn*.06, inz=Math.abs(nd-zc)<zw/2;
        if(tv){ if(inz) turn+=dt*.32; else { nz+=dt*.9; if(Math.random()<dt*6) tone(900,.03,.015,'square'); } }
        if(nz>=1){ u.end({kq:'on',n:.7,m:'Chốt kêu cạch một tiếng lớn. Có người trở mình.'}); return; }
        mgPanel(x,20,440,520,140); x.fillStyle='rgba(255,255,255,.08)'; x.fillRect(40,480,480,26); x.fillStyle='rgba(95,179,122,.55)'; x.fillRect(40+480*(zc-zw/2),480,480*zw,26); x.fillStyle=inz?'#efe8d8':'#e2645c'; x.fillRect(40+480*nd-3,474,6,38); mgT(x,'Giữ Xoay khi kim nằm trong vùng xanh',280,466,{s:13,c:'#9aa2b5'});
        mgBar(x,40,548,480,turn,'#5fb37a','Đã xoay'); if(turn>=1){ chime(); u.end({kq:'ok'}); } } }; },

  /* 6. áp tai nghe lén khi lính đang lên cầu thang */
  nghe(x,u){ let ear=.2, h=0, d=1, step=0, drag=false; const L=['…tổ con mèo tháng này đủ chưa…','…thằng Tú nó ngu, để má lo…','…tin để lâu là thiu…']; const EX=300;
    u.tip('Rê ngón tay dọc cánh cửa tìm chỗ nghe rõ nhất. Nghe đủ hai câu thì bấm Rút, trước khi tiếng dép lên tới nơi.');
    const mv=e=>{ const p=u.pt(e); ear=Math.max(0,Math.min(1,(p.y-60)/460)); };
    u.cv.onpointerdown=e=>{ drag=true; mv(e); }; u.cv.onpointermove=e=>{ if(drag||e.pointerType==='mouse') mv(e); }; u.cv.onpointerup=()=>drag=false;
    u.btn('Rút',()=>u.end(h>=2/3?{kq:'ok'}:{kq:'hong',m:'Nghe chưa ra gì. Lính lên rồi, để đêm khác.'}),false,'main');
    let nh=0; return (dt,t)=>{ const s=.5+Math.sin(t*.35)*.32; const cl=Math.max(0,1-Math.abs(ear-s)/.13); h=Math.min(1,h+cl*dt/8); d-=dt/24; step+=dt; u.danger(Math.max(0,(1-d)-.3)/.7); const nn=Math.floor(h*3+.001); if(nn>nh){ nh=nn; u.hit('tick'); tone(720,.06,.02,'triangle'); }
      u.steps.set(.15+.85*(1-d));
      if(d<=0){ u.end({kq:'on',n:1,m:'Lính đứng ngay đầu cầu thang.'}); return; }
      if(!u.bg()){ x.fillStyle='#0c0d12'; x.fillRect(0,0,1000,600); x.fillStyle='#4a3a28'; x.fillRect(120,0,560,560); }
      const ey=60+ear*460; const g=x.createRadialGradient(EX,ey,4,EX,ey,120); g.addColorStop(0,'rgba(255,220,150,'+(.1+cl*.35)+')'); g.addColorStop(1,'rgba(255,220,150,0)'); x.fillStyle=g; x.fillRect(EX-130,ey-130,260,260);
      x.fillStyle='#e8d8b8'; x.beginPath(); x.ellipse(EX,ey,22,30,0,0,7); x.fill(); x.fillStyle='rgba(120,90,60,.8)'; x.beginPath(); x.ellipse(EX+4,ey,9,15,0,0,7); x.fill();
      mgPanel(x,560,20,420,420);
      mgBar(x,585,64,370,cl,'#5fb37a','Nghe rõ'); mgBar(x,585,124,370,1-d,'#e2645c','Tiếng dép trên cầu thang');
      const n=Math.floor(h*3+.001); L.forEach((l,i)=>{ const v=i<n?l:(i===n?l.split('').map((c,j)=>j/l.length<(h*3-n)?c:(c===' '?' ':'·')).join(''):''); mgT(x,v,770,210+i*56,{s:14,c:i<n?'#efe8d8':'#9aa2b5'}); });
      mgBar(x,585,400,370,h,'#f0b25c','Đã nghe'); }; }
};
MINI.tuan0=(x,u)=>MINI.tuan(x,u,false); MINI.tuan3=(x,u)=>MINI.tuan(x,u,true);
function miniDem(host,muc){ return new Promise(res=>{ const box=document.createElement('div'); box.className='mg';
  box.innerHTML='<div class="mgc" style="position:relative"><canvas width="1000" height="600"></canvas><i class="mgfx"></i></div><div class="mgfoot"><p class="mgt"></p><div class="mgb"></div></div>'; host.appendChild(box);
  if(!document.getElementById('mgfxCss')){ const st=document.createElement('style'); st.id='mgfxCss'; st.textContent='.mgfx{position:absolute;inset:0;pointer-events:none;border-radius:inherit;opacity:0}.mgfx.ok{animation:mgok .45s ease-out}.mgfx.bad{animation:mgbad .5s ease-out}.mgfx.tick{animation:mgtick .25s ease-out}@keyframes mgok{0%{opacity:1;box-shadow:inset 0 0 0 4px rgba(95,179,122,.9),inset 0 0 90px rgba(95,179,122,.45)}100%{opacity:0}}@keyframes mgbad{0%{opacity:1;box-shadow:inset 0 0 0 4px rgba(226,69,60,.95),inset 0 0 120px rgba(226,69,60,.55)}100%{opacity:0}}@keyframes mgtick{0%{opacity:1;box-shadow:inset 0 0 60px rgba(240,178,92,.35)}100%{opacity:0}}.mg.shake .mgc{animation:mgsh .38s}@keyframes mgsh{0%,100%{transform:none}20%{transform:translate(-9px,2px)}40%{transform:translate(8px,-3px)}60%{transform:translate(-6px,1px)}80%{transform:translate(4px,0)}}@media (prefers-reduced-motion:reduce){.mg.shake .mgc{animation:none}}'; document.head.appendChild(st); }
  const cv=box.querySelector('canvas'), x=cv.getContext('2d'), tip=box.querySelector('.mgt'), bar=box.querySelector('.mgb');
  let bg=null; const k=MGIMG[muc]; if(k){ const i=new Image(); i.onload=()=>bg=i; i.onerror=()=>{ if(!i._r){ i._r=1; i.src='img2/'+k+'.webp?r='+Date.now(); } }; i.src='img2/'+k+'.webp?v=1025'; }
  let over=false, raf, t=0, last=performance.now(), msg='', msgT=0, dang=0, beat=0, EV=null; const HB=window.SFX?SFX.loop('timdap',{max:.9}):null, ST=window.SFX?SFX.loop('buocchan',{max:.8}):null;
  const fxEl=box.querySelector('.mgfx');
  const hit=k=>{ fxEl.className='mgfx'; void fxEl.offsetWidth; fxEl.className='mgfx '+k; if(k==='bad'){ box.classList.remove('shake'); void box.offsetWidth; box.classList.add('shake'); try{ navigator.vibrate&&navigator.vibrate(120); }catch(e){} } };
  const end=r=>{ if(over) return; over=true; cancelAnimationFrame(raf); HB&&HB.stop(); ST&&ST.stop(); removeEventListener('keydown',mk,true); removeEventListener('keyup',mku,true);
    if(r.kq==='ok'||r.kq==='on'){ hit(r.kq==='ok'?'ok':'bad'); if(r.kq==='on') tone(140,.5,.05,'sawtooth'); [...bar.children].forEach(c=>c.disabled=true); setTimeout(()=>{ box.remove(); window.__p2mini=null; res(r); },r.kq==='ok'?420:620); return; }
    box.remove(); window.__p2mini=null; res(r); };
  /* sự cố giữa chừng: phải đứng im vài giây, đụng tay là ồn */
  const evBad=e=>{ if(!EV||EV.hit) return; EV.hit=1; hit('bad'); tone(200,.12,.04,'square'); try{ EV.bad&&EV.bad(); }catch(err){} msg='Động rồi!'; msgT=1.2; };
  box.addEventListener('pointerdown',e=>{ if(EV){ e.stopPropagation(); evBad(); } },true);
  const HK={}; const pick=k=>{ if(k===' '||k==='Enter'){ return [...bar.querySelectorAll('button.main')].find(b=>!b.hidden); } const id=HK[k]; return id&&!id.hidden?id:null; };
  const mk=e=>{ if(!box.isConnected) return; if(EV&&e.key!=='Escape'){ e.preventDefault(); e.stopImmediatePropagation(); if(!e.repeat) evBad(); return; } if(e.key==='Escape'){ e.preventDefault(); e.stopImmediatePropagation(); end({kq:'bo'}); return; } const b=pick(e.key); if(!b) return; e.preventDefault(); e.stopImmediatePropagation(); if(e.repeat) return; if(b._hold) b._hold(1); else b.click(); };
  const mku=e=>{ const b=pick(e.key); if(b&&b._hold){ e.preventDefault(); b._hold(0); } };
  addEventListener('keydown',mk,true); addEventListener('keyup',mku,true);
  const btn=(lab,fn,hold,cls)=>{ const b=document.createElement('button'); b.type='button'; b.textContent=lab; if(cls) b.className=cls;
    if(cls==='main') b.title='Phím Space'; if(lab.includes('◀')){ HK['ArrowLeft']=b; b.title='Phím ←'; } if(lab.includes('▶')){ HK['ArrowRight']=b; b.title='Phím →'; }
    if(hold){ b._hold=fn; b.addEventListener('pointerdown',e=>{ e.preventDefault(); fn(1); }); ['pointerup','pointerleave','pointercancel'].forEach(ev=>b.addEventListener(ev,()=>fn(0))); }
    else b.onclick=fn; bar.insertBefore(b,bo); return b; };
  const pt=e=>{ const r=cv.getBoundingClientRect(); return {x:(e.clientX-r.left)*1000/r.width,y:(e.clientY-r.top)*600/r.height}; };
  const bo=document.createElement('button'); bo.type='button'; bo.textContent='Rút về'; bo.dataset.bo=1; bo.className='ghost'; bo.onclick=()=>end({kq:'bo'}); bar.appendChild(bo);
  const U={btn,end,cv,pt,tip:s=>tip.textContent=s,say:s=>{ msg=s; msgT=2.2; },clear:()=>{ [...bar.children].forEach(c=>{ if(!c.dataset.bo) c.remove(); }); },
    bg:()=>{ if(!bg) return false; x.drawImage(bg,0,0,1000,600); return true; },
    hit, steps:{set:v=>{ ST&&ST.set(v); }}, danger:v=>{ dang=Math.max(0,Math.min(1,v||0)); },
    interrupt:(m,bad,len)=>{ if(EV||over) return; EV={m,bad,t:len||2.6,T:len||2.6}; tone(90,.3,.05,'triangle'); }};
  const G=MINI[muc](x,U);
  const loop=now=>{ if(over) return; const dt=Math.min(.05,(now-last)/1000); last=now; t+=dt;
    x.clearRect(0,0,1000,600); G(EV?0:dt,t); if(over) return;
    if(dang>.05){ const pu=.55+.45*Math.sin(t*(4+dang*6)); const g=x.createRadialGradient(500,300,220,500,300,620); g.addColorStop(0,'rgba(200,40,30,0)'); g.addColorStop(1,'rgba(200,40,30,'+(dang*.38*pu)+')'); x.fillStyle=g; x.fillRect(0,0,1000,600);
      if(dang>.7&&!(HB&&SFX.has('timdap'))){ beat-=dt; if(beat<=0){ beat=.85-dang*.3; tone(55,.12,.05,'sine'); tone(52,.1,.04,'sine',.16); } } }
    HB&&HB.set(dang>.45?(dang-.45)/.55:0);
    if(EV){ EV.t-=dt; x.fillStyle='rgba(4,5,8,.55)'; x.fillRect(0,0,1000,600); mgT(x,EV.m,500,270,{s:20,b:1}); mgT(x,'Đứng im…',500,312,{s:15,c:'#f0b25c'}); x.fillStyle='rgba(255,255,255,.15)'; x.fillRect(380,336,240,6); x.fillStyle='#f0b25c'; x.fillRect(380,336,240*Math.max(0,EV.t/EV.T),6);
      if(EV.t<=0){ if(!EV.hit){ hit('ok'); tone(660,.06,.02,'triangle'); } EV=null; } }
    if(msgT>0){ msgT-=dt; x.font='600 26px "Be Vietnam Pro",sans-serif'; const w=x.measureText(msg).width+36; mgPanel(x,500-w/2,262,w,52,.92); mgT(x,msg,500,297,{s:16,b:1}); }
    raf=requestAnimationFrame(loop); };
  raf=requestAnimationFrame(loop);
  window.__p2mini={win:()=>end({kq:'ok'}),lose:()=>end({kq:'on',n:1,m:'(thử thua)'})}; }); }

function guards(siet,rescue){ const g=[{f:0,a:60,b:960,v:70,x:500,d:1},{f:1,a:40,b:940,v:60,x:720,d:1},{f:2,a:40,b:960,v:55,x:800,d:1}];
  if(siet||rescue) g.push({f:1,a:500,b:960,v:80,x:900,d:-1}); if(rescue) g.push({f:0,a:20,b:200,v:30,x:60,d:1}); return g; }
function sneak(cfg){ return new Promise(res=>{ hideDlg(); const cuu=cfg.mode==='cuu';
  p2open('<h3>'+esc(cuu?'Đêm mưa · dẫn người ra sông':'Đi đêm · '+MUC[cfg.muc].ten)+'</h3><div class="dd2"><canvas id="dc" width="1000" height="600"></canvas><div class="ctl"><div class="g"><button id="kL" type="button" aria-label="Sang trái">◀</button><button id="kR" type="button" aria-label="Sang phải">▶</button></div><div class="g"><button id="kU" type="button">▲ Lên</button><button id="kD" type="button">▼ Xuống</button><button id="kH" type="button">Núp</button><button id="kA" class="go" type="button">'+(cuu?'Dẫn':'Lấy')+'</button><button id="kS" type="button">Chạy</button></div></div><div class="tbar"><b id="ktb"></b></div><p class="tip" style="margin:8px 0 0;text-align:center;font-size:13px">Phím: <b>← →</b> đi · <b>↑ ↓</b> lên xuống cầu thang · <b>Space</b> núp · <b>E</b> '+(cuu?'dẫn':'lấy')+' · <b>Shift</b> chạy</p></div>',cuu?null:()=>finish(got?'xong_tre':'het'));
  if(cuu){ const xb=$('p2x'); if(xb) xb.remove(); }
  const cv=$('dc'), x=cv.getContext('2d'); const bgk=p2imgUrl('x2-trai-matcat'); let bgi=null; if(bgk){ bgi=new Image(); bgi.src=bgk; }
  const M0=!cuu&&MUC[cfg.muc]; const P={f:M0?M0.f:1,x:cuu?240:(M0?(M0.x>DMAP.stairs.x?DMAP.stairs.x-40:DMAP.stairs.x+DMAP.stairs.w+40):200),hid:false,run:false,sus:0,ph:0,face:M0&&M0.x<DMAP.stairs.x?-1:1}; const G=guards(cfg.siet,cuu);
  let K={L:0,R:0}, paused=false, over=false, t=0, msg='', msgT=0, got=false, clock=cuu?60:0;
  const groups=cuu?cfg.groups.map((g,i)=>Object.assign({},g,{x:60+i*48,f:1,st:'cho'})):[]; let lead=null; const team=[]; const TMAX=3; const out=[], lost=[]; const exits=cuu?cfg.exits:[];
  const say1=m=>{ msg=m; msgT=3; };
  const hold=(id,k)=>{ const b=$(id); const on=e=>{ e.preventDefault(); K[k]=1; }, off=()=>{ K[k]=0; }; b.addEventListener('pointerdown',on); ['pointerup','pointerleave','pointercancel'].forEach(ev=>b.addEventListener(ev,off)); };
  hold('kL','L'); hold('kR','R');
  /* chạm vào tranh để đi tới đó; khác tầng thì tự đi ra cầu thang */
  cv.addEventListener('pointerdown',e=>{ if(paused||over) return; const r=cv.getBoundingClientRect(); const px=(e.clientX-r.left)/r.width*1000, py=(e.clientY-r.top)/r.height*600;
    let f=DMAP.band.findIndex(([y0,bh])=>py>=y0&&py<y0+bh); if(f<0) f=P.f; P.hid=false; P.goal={f,x:Math.max(20,Math.min(980,px))}; });
  const atS=()=>Math.abs(P.x-(DMAP.stairs.x+DMAP.stairs.w/2))<40;
  const spot=()=>{ let b=null,bd=60; DMAP.floors[P.f].hide.forEach(h=>{ const d=Math.abs(h-P.x); if(d<bd){ bd=d; b=h; } }); return b; };
  $('kU').onclick=()=>{ if(atS()&&P.f<2&&!P.hid){ P.f++; P.x=DMAP.stairs.x+DMAP.stairs.w/2; } };
  $('kD').onclick=()=>{ if(atS()&&P.f>0&&!P.hid){ P.f--; P.x=DMAP.stairs.x+DMAP.stairs.w/2; } };
  $('kH').onclick=()=>{ if(P.hid){ P.hid=false; return; } const s=spot(); if(s!=null){ P.hid=true; P.x=s; } else say1('Không có chỗ núp ở đây.'); };
  $('kS').onclick=()=>{ P.run=!P.run; $('kS').classList.toggle('on',P.run); };
  $('kA').onclick=()=>act();
  const kd=e=>{ if(paused) return; const k=e.key; if(k==='ArrowLeft'||k==='a') K.L=1; if(k==='ArrowRight'||k==='d') K.R=1; if(k==='ArrowUp'||k==='w') $('kU').onclick(); if(k==='ArrowDown'||k==='s') $('kD').onclick(); if(k===' '||k==='h'){ e.preventDefault(); $('kH').onclick(); } if(k==='e'||k==='Enter') act(); if(k==='Shift') $('kS').onclick(); e.stopPropagation(); };
  const ku=e=>{ if(e.key==='ArrowLeft'||e.key==='a') K.L=0; if(e.key==='ArrowRight'||e.key==='d') K.R=0; };
  addEventListener('keydown',kd,true); addEventListener('keyup',ku,true);
  function act(){
    if(!cuu){ const m=MUC[cfg.muc]; if(P.f===m.f&&Math.abs(P.x-m.x)<45&&!got){ if(paused) return; if(!MINI[cfg.muc]){ got=true; tone(520,.06,.03,'triangle'); say1('Xong. Về phòng ngủ: lầu hai, bên trái.'); return; }
        paused=true; K.L=K.R=0; miniDem(cv.parentNode,cfg.muc).then(r=>{ paused=false; last=performance.now(); if(over) return;
          if(r.kq==='ok'){ got=true; tone(520,.06,.03,'triangle'); say1('Xong. Lẻn về giường.'); setTimeout(()=>finish('xong'),900); }
          else if(r.kq==='on'){ P.sus=r.n>=1?1:Math.min(.95,P.sus+r.n); say1((r.m||'Có tiếng động.')+' Núp ngay!'); }
          else if(r.kq==='hong') say1(r.m||'Chưa được. Thử lại.'); else say1('Rút ra trước. Bấm Lấy để làm lại.'); }); } else if(got&&P.f===1&&P.x<430) finish('xong'); else say1(got?'Về phòng ngủ ở lầu hai, bên trái.':'Chưa tới chỗ. Chấm vàng là chỗ cần tới.'); return; }
    const e0=lead&&exits.find(e=>e.f===P.f&&Math.abs(e.x-P.x)<45);
    if(!e0&&team.length<TMAX){ const g=groups.find(g=>g.st==='cho'&&g.f===P.f&&Math.abs(g.x-P.x)<40); if(!g&&lead){ say1('Đang dẫn '+team.map(x=>x.ten).join(', ')+'. Ra lối xanh, hoặc gom thêm người (tối đa '+TMAX+').'); return; } if(g&&g.after&&clock<g.after){ say1(g.ten+': "Tui đi sau cùng. Dẫn tụi nhỏ trước."'); return; }
      if(g){ if(g.can>0&&!g.thuyet){ g.thuyet=true; clock+=3; if(g.can>=2){ say1(g.ten+' không chịu đi. Mất 3 phút mà không nói được.'); g.st='o'; return; } say1('Mất 3 phút nói với '+g.ten+'. Đi.'); } g.st='theo'; team.push(g); lead=team[0]; say1('Đang dẫn: '+team.map(x=>x.ten).join(', ')+'.'+(team.length<TMAX?' Gom thêm người hoặc ra lối xanh.':' Đủ người, ra lối xanh.')); } else say1('Tới chỗ một người đang chờ rồi bấm Dẫn.'); return; }
    const e=e0||exits.find(e=>e.f===P.f&&Math.abs(e.x-P.x)<45); if(e&&lead){ team.forEach(g=>{ g.st='ra'; out.push(g); }); clock+=e.cost||0; say1(team.map(x=>x.ten).join(', ')+' đã ra tới '+e.ten+'.'+(e.cost?' Chờ ghe '+e.cost+' phút.':'')); team.length=0; lead=null; } else say1(team.length>=TMAX?'Đủ người rồi. Ra lối xanh.':'Lối ra sông đánh dấu xanh.'); }
  function finish(kq){ if(over) return; over=true; try{ sMe&&sMe.stop(); sG&&sG.stop(); sH&&sH.stop(); }catch(e){} removeEventListener('keydown',kd,true); removeEventListener('keyup',ku,true); p2close(); res({kq,out,lost,clock,groups}); }
  const ch=(k,px,f,face,o)=>{ const fy=DMAP.feet[f]; x.save(); x.translate(px,fy); x.scale(.62,.62); try{ drawChar(x,k,0,0,face,o); }catch(e){} x.restore(); };
  let last=performance.now(); const sMe=window.SFX?SFX.loop('buocchan',{max:.55,tc:.08}):null, sG=window.SFX?SFX.loop('buocchan',{max:.7,rate:.82}):null, sH=window.SFX?SFX.loop('timdap',{max:.9}):null;
  const sOff=()=>{ sMe&&sMe.set(0); sG&&sG.set(0); sH&&sH.set(0); };
  function loop(now){ if(over) return; if(paused){ sOff(); last=now; requestAnimationFrame(loop); return; } const dt=Math.min(.05,(now-last)/1000); last=now; t+=dt; if(cuu) clock+=dt*(cfg.speed||1);
    const sp=(P.run?190:95)*(lead?(1-.06*team.length):1); let mv=0; if(K.L||K.R) P.goal=null;
    if(!P.hid&&P.goal){ const sx=DMAP.stairs.x+DMAP.stairs.w/2, tx=P.goal.f!==P.f?sx:P.goal.x, d=tx-P.x;
      if(Math.abs(d)<4){ if(P.goal.f!==P.f){ P.f+=Math.sign(P.goal.f-P.f); P.x=sx; } else P.goal=null; } else { P.x+=Math.sign(d)*Math.min(Math.abs(d),sp*dt); P.face=Math.sign(d); mv=1; } }
    if(!P.hid){ if(K.L){ P.x=Math.max(20,P.x-sp*dt); P.face=-1; mv=1; } if(K.R){ P.x=Math.min(980,P.x+sp*dt); P.face=1; mv=1; } } if(mv) P.ph+=dt*(P.run?10:7);
    team.forEach((g,k)=>{ g.f=P.f; g.x+=(P.x-34*(k+1)*P.face-g.x)*Math.min(1,dt*4); });
    if(cuu&&!P.hid&&!paused){ const ex=lead&&exits.find(e=>e.f===P.f&&Math.abs(e.x-P.x)<40);
      if(ex) act(); else if(team.length<TMAX){ const gw=groups.find(g=>g.st==='cho'&&g.f===P.f&&Math.abs(g.x-P.x)<30&&!g.auto&&!(g.after&&clock<g.after)); if(gw){ gw.auto=1; act(); } } }
    const raid=cuu&&clock>=cfg.raid; let seen=false; if(raid&&!cfg.hoDone){ cfg.hoDone=1; say1('“Công an đây! Ngồi xuống hết!” · Đèn trại tắt phụt.'); tone(300,.6,.05,'sawtooth'); }
    G.forEach(g=>{ if(raid&&!g.chay){ g.chay=1; g.v*=1.6; } g.x+=g.v*g.d*dt; if(g.x>g.b){ g.x=g.b; g.d=-1; } if(g.x<g.a){ g.x=g.a; g.d=1; } g.ph=(g.ph||0)+dt*6;
      if(raid||g.f!==P.f||P.hid) return; const dx=(P.x-g.x)*g.d; const noise=P.run&&Math.abs(P.x-g.x)<(cuu?100:130); if((dx>0&&dx<(cuu?120:150)+(cfg.siet?20:0))||noise) seen=true; });
    P.sus=seen?P.sus+dt*(P.run?(cuu?2:2.4):(cuu?1.1:1.6)):Math.max(0,P.sus-dt*(cuu?1:.7));
    if(P.sus>=1){ if(!cuu){ finish('bat'); return; } P.sus=0; clock+=20; if(lead){ const g=team.pop(); g.st='bat'; lost.push(g); say1('Bị thấy! '+g.ten+' bị lôi về. Mất 20 phút.'); lead=team[0]||null; } else say1('Bị thấy! Phải núp trong kho 20 phút.'); P.hid=true; }
    if(!cuu){ if(t>(cfg.limit||110)){ finish(got?'xong_tre':'het'); return; } const m=MUC[cfg.muc]; if(!got&&!paused&&!P.hid&&P.f===m.f&&Math.abs(P.x-m.x)<40&&MINI[cfg.muc]&&!P.autoT){ P.autoT=1; act(); } if(P.autoT&&!paused&&!got&&Math.abs(P.x-m.x)>60) P.autoT=0; }
    else { if(cfg.xe&&clock>=cfg.xe&&!cfg.xeDone){ cfg.xeDone=1; groups.filter(g=>g.st==='cho').forEach(g=>{ g.st='xe'; lost.push(g); }); say1('Xe tới chở những người còn lại đi trước giờ.'); }
      if(clock>=cfg.end||groups.every(g=>g.st!=='cho'&&g.st!=='theo')){ finish('het'); return; } }
    if(sMe){ sMe.set(mv&&!P.hid?(P.run?1:.55):0); let gd=1e9; G.forEach(g=>{ if(g.f===P.f) gd=Math.min(gd,Math.abs(g.x-P.x)); }); sG.set(Math.max(0,1-gd/520)); sH.set(P.sus>.2?.35+P.sus*.65:(gd<180&&!P.hid?.3:0)); }
    msgT-=dt; draw(raid); requestAnimationFrame(loop); }
  function draw(raid){ x.clearRect(0,0,1000,600);
    const bgok=bgi&&bgi.complete&&bgi.naturalWidth; if(bgok) x.drawImage(bgi,0,0,1000,600); else { x.fillStyle='#0b0d14'; x.fillRect(0,0,1000,600); }
    for(let f=0;f<3;f++){ const [y0,bh]=DMAP.band[f]; const fl=DMAP.floors[f]; x.fillStyle=f===P.f?'rgba(0,0,0,0)':'rgba(5,6,10,.5)'; x.fillRect(0,y0,1000,bh);
      if(!bgok){ x.fillStyle='rgba(255,255,255,.05)'; fl.rooms.forEach(r=>x.fillRect(r.x,y0+8,r.w,bh-16)); }
      x.font='600 13px "Be Vietnam Pro",sans-serif'; fl.rooms.forEach(r=>{ const w=x.measureText(r.ten).width+12; x.fillStyle='rgba(8,10,16,.7)'; x.fillRect(r.x+4,y0+6,w,20); x.fillStyle=f===P.f?'#efe8d8':'#8b93a9'; x.fillText(r.ten,r.x+10,y0+21); });
      x.fillStyle='rgba(8,10,16,.7)'; x.fillRect(944,y0+6,52,20); x.fillStyle='#f0b25c'; x.fillText(fl.ten,950,y0+21);
      fl.hide.forEach(h=>{ x.strokeStyle=f===P.f?'rgba(240,178,92,.55)':'rgba(240,178,92,.2)'; x.setLineDash([5,4]); x.lineWidth=2; x.strokeRect(h-16,DMAP.feet[f]-80,32,78); x.setLineDash([]); });
      if(f===P.f){ x.fillStyle='rgba(240,178,92,.10)'; x.fillRect(DMAP.stairs.x,y0,DMAP.stairs.w,bh); } }
    const Y=f=>DMAP.feet[f];
    if(!cuu&&!got){ const m=MUC[cfg.muc]; x.fillStyle='#f0b25c'; x.beginPath(); x.arc(m.x,Y(m.f)-150,9+Math.sin(t*5)*2,0,7); x.fill(); const lb=MUC[cfg.muc].noi||'Tới đây'; x.font='600 14px "Be Vietnam Pro",sans-serif'; const lw=x.measureText(lb).width+14; x.fillStyle='rgba(8,10,16,.8)'; x.fillRect(m.x-lw/2,Y(m.f)-186,lw,22); x.fillStyle='#f0b25c'; x.textAlign='center'; x.fillText(lb,m.x,Y(m.f)-170); x.textAlign='left'; }
    if(!cuu&&got){ x.strokeStyle='#5fb37a'; x.lineWidth=3; x.strokeRect(45,DMAP.band[1][0],353,DMAP.band[1][1]); }
    if(cuu){ x.strokeStyle='rgba(170,190,215,.28)'; x.lineWidth=1.5; x.beginPath(); for(let i=0;i<90;i++){ const rx=(i*137+t*260*(1+i%3*.2))%1060-30, ry=(i*89+t*720)%640-20; x.moveTo(rx,ry); x.lineTo(rx-6,ry+22); } x.stroke(); }
    if(raid){ x.fillStyle='rgba(0,0,0,'+(.38+(Math.sin(t*23)>.86?.3:0))+')'; x.fillRect(0,0,1000,600); if(Math.sin(t*3.1)>0){ x.fillStyle='rgba(80,120,255,.08)'; x.fillRect(0,0,1000,600); } else { x.fillStyle='rgba(255,60,60,.07)'; x.fillRect(0,0,1000,600); } }
    exits.forEach(e=>{ x.fillStyle='#5fb37a'; x.fillRect(e.x-6,Y(e.f)-120,12,116); x.fillStyle='#bfe3c9'; x.fillText(e.ten,e.x-30,Y(e.f)-128); });
    groups.forEach(g=>{ if(['ra','bat','xe'].includes(g.st)) return; x.globalAlpha=g.st==='o'?.4:1; ch(g.sp||g.id,g.x,g.f,g.x<P.x?1:-1,{walk:g.st==='theo'&&!P.hid,ph:P.ph,t}); x.globalAlpha=1; x.fillStyle='#cfc8b8'; x.fillText(g.ten,g.x-14,Y(g.f)-118); });
    G.forEach(g=>{ if(!raid){ x.fillStyle='rgba(255,230,140,.14)'; x.beginPath(); x.moveTo(g.x,Y(g.f)-70); x.lineTo(g.x+g.d*170,Y(g.f)-110); x.lineTo(g.x+g.d*170,Y(g.f)); x.closePath(); x.fill(); } ch('seo',g.x,g.f,g.d,{walk:true,ph:g.ph,t}); });
    if(cuu&&!raid){ let tg=null; if(lead) tg=exits.filter(e=>e.f===P.f).sort((a,b)=>Math.abs(a.x-P.x)-Math.abs(b.x-P.x))[0]; else if(team.length<TMAX) tg=groups.filter(g=>g.st==='cho').sort((a,b)=>(a.f!==P.f)-(b.f!==P.f)||Math.abs(a.x-P.x)-Math.abs(b.x-P.x))[0];
      if(tg){ const ty=Y(tg.f)-150+Math.sin(t*5)*5; x.fillStyle=lead?'#5fb37a':'#f0b25c'; x.beginPath(); x.moveTo(tg.x-11,ty-14); x.lineTo(tg.x+11,ty-14); x.lineTo(tg.x,ty); x.closePath(); x.fill(); } }
    if(P.goal){ x.strokeStyle='rgba(240,178,92,.6)'; x.lineWidth=2; x.beginPath(); x.ellipse(P.goal.x,Y(P.goal.f)-2,16,5,0,0,7); x.stroke(); }
    x.globalAlpha=P.hid?.45:1; ch(MEK,P.x,P.f,P.face,{walk:!!(K.L||K.R)&&!P.hid,ph:P.ph,t,crouch:P.hid}); x.globalAlpha=1;
    if(P.sus>0){ x.fillStyle='#e2645c'; x.fillRect(P.x-20,Y(P.f)-120,40*P.sus,5); }
    x.fillStyle='#efe8d8'; x.font='15px "IBM Plex Mono",monospace'; x.textAlign='center';
    if(cuu){ const hh=Math.floor(clock/60), mm=Math.floor(clock%60); x.fillText(hh+':'+String(mm).padStart(2,'0')+(raid?' · đã ập vào':cfg.raid<999?' · hẹn ập vào '+Math.floor(cfg.raid/60)+':'+String(cfg.raid%60).padStart(2,'0'):' · không ai ập vào')+'  ·  ra được '+out.length+'/'+groups.length,500,22); }
    else x.fillText('Trời sáng sau: '+Math.max(0,Math.ceil((cfg.limit||110)-t))+' giây',500,22);
    if(msgT>0&&msg){ x.font='16px "Be Vietnam Pro",sans-serif'; const w=x.measureText(msg).width+24; x.fillStyle='rgba(16,19,28,.92)'; x.fillRect(500-w/2,280,w,36); x.fillStyle='#efe8d8'; x.fillText(msg,500,304); }
    const tb=$('ktb'); if(tb) tb.style.width=(cuu?Math.min(100,clock/(cfg.end||300)*100):Math.min(100,t/(cfg.limit||110)*100))+'%';
    x.textAlign='left'; const a=atS(); $('kU').disabled=!a||P.f>=2; $('kD').disabled=!a||P.f<=0; $('kH').textContent=P.hid?'Ra':'Núp'; }
  window.__p2sneak={toi:()=>{ if(!cuu){ const m=MUC[cfg.muc]; P.f=m.f; P.x=m.x; act(); } },win:()=>{ if(cuu){ groups.forEach(g=>{ if(g.st==='cho'&&g.can<2){ g.st='ra'; out.push(g); } }); finish('het'); } else { got=true; finish('xong'); } },lose:()=>finish(cuu?'het':'bat')};
  say1(cuu?'Chạm chỗ muốn tới để đi. Đi ngang người đang chờ là dẫn theo, tối đa 3 người, rồi đưa ra lối xanh.':'Đi tới chỗ đánh dấu vàng là bắt đầu. Núp ở khung vàng khi đèn pin quét tới.');
  requestAnimationFrame(loop); }); }

/* việc đi đêm có trò riêng: mở thẳng trò nhỏ, không đi bản đồ nữa */
function miniThang(muc){ return new Promise(async res=>{ let lan=0, done=false;
  const fin=k=>{ if(done) return; done=true; p2close(); res({kq:k}); };
  p2open('<h3>'+esc('Đi đêm · '+MUC[muc].ten)+'</h3><div class="dd2" id="mtHost" style="height:min(72vh,660px)"></div>',()=>{ const b=document.querySelector('#mtHost [data-bo]'); if(b) b.click(); else fin('het'); });
  while(!done){ const r=await miniDem($('mtHost'),muc); if(done) return;
    if(r.kq==='ok'){ fin('xong'); return; }
    if(r.kq==='bo'){ fin('bo'); return; }
    if(r.kq==='on'){ lan++; if(r.n>=.9||lan>=2){ fin('bat'); return; }
      await sayOver((r.m||'Có tiếng động.')+' Nín thở núp một hồi… không ai ra. Làm lại, lần này nhẹ tay.'); continue; }
    await sayOver(r.m||'Chưa được. Thử lại.'); } }); }
function sayOver(m){ return new Promise(r=>{ const h=$('mtHost'); if(!h){ r(); return; } const d=document.createElement('div'); d.className='mg'; d.style.cssText+='align-items:center;justify-content:center;padding:24px;text-align:center';
  d.innerHTML='<p style="font-size:18px;line-height:1.6;max-width:560px;color:#efe8d8">'+esc(m)+'</p><div class="mgb"><button type="button" class="main">Làm lại</button></div>'; h.appendChild(d); d.querySelector('button').onclick=()=>{ d.remove(); r(); }; }); }

/* đi đêm: chọn việc, chơi, chạy cảnh kết quả */
async function p2DiDem(){ const L=Object.keys(MUC).filter(k=>MUC[k].c()); if(!L.length) return;
  busy=true; const p=await choose([...L.map(k=>({ma:k,loi:MUC[k].ten,sub:MUC[k].why})),{ma:'_',loi:'Ngủ',sub:'mai còn ca sáng'}],false,(hasF('x_siet')?'Trại đang siết, tuần tra gấp đôi. ':'')+'Đi đêm?'); hideDlg(); busy=false;
  if(p.ma==='_') return; await diDemViec(p.ma); }
async function diDemViec(ma){ const p={ma}; if(MUC[p.ma].thang){ await say('mota','','Lẻn qua hành lang lầu hai lúc mọi người ngủ say. Buồng tắm cuối dãy, vòi nước để chảy cho át tiếng.'); hideDlg(); await runS(MUC[p.ma].k); hideDlg(); return; } const r=MINI[p.ma]?await miniThang(p.ma):await sneak({mode:'didem',muc:p.ma,siet:hasF('x_siet')&&S.day<=18,limit:hasF('x_siet')?90:110});
  if(r.kq==='bat'){ await runS('x_dd_bat'); effects('+nghi:20'); return; }
  if(r.kq==='bo'){ await say('mota','','Rút về giường. Để đêm khác.'); hideDlg(); return; }
  if(r.kq==='het'){ await say('mota','','Trời hửng sáng. Phải quay về trước điểm danh, tay không.'); hideDlg(); return; }
  if(r.kq==='xong_tre'){ await say('mota','','Về tới phòng thì vừa kịp tiếng chuông. Mồ hôi ướt áo.'); effects('+nghi:5'); }
  await runS(MUC[p.ma].k); hideDlg(); }

/* ---------------- gọi trò chơi từ lời thoại ---------------- */
const P2GAMES={
  giaitin:async()=>{ const ok=await giaiMa('Sáng nay trời mưa quá chị ơi.\nÍt bữa nữa em mua dép mới.\nHôm qua tụi em được ăn thịt.\nAi cũng nhớ chị hết á.','SIHA','Tin của số lạ',null,'x2-tin-siha'); if(ok) setCo('x_siha'); },
  giaitin2:async()=>{ const ok=await giaiMa('Nhi còn đây.\nHuệ đau lưng hoài.\nÍt khi được ngủ.\nTí ốm.\nOanh đi rồi.\nAnh Toàn ổn.','NHITOA','Tin thứ hai',null,'x2-tin-nhi'); if(ok) setCo('x_a_tin2_ok'); },
  tinvao:async()=>{ const ok=await giaiMa('Ông bà mình dạy ở hiền gặp lành.\nKhuyến mãi tháng này giảm 30%.','OK','Tin rác','Đọc chữ đầu mỗi câu.','x2-tin-rac'); if(ok){ effects('-lo:5'); await runS('x_tinvao_ok'); } },
  giauchu:async()=>{ const r=await giauChu('SONG','Bin đóng vai quản lý, đọc lướt.'); if(r&&r.dung&&!r.vung) setCo('x_tap_ok'); },
  gui:async()=>{ const w=nextWord(); if(!w) return; const r=await giauChu(w,S.mon==='sim'&&hasF('x_giu')?'Gửi bằng SIM riêng, quản lý ít đọc.':'Quản lý đọc lướt mọi tin gửi ra.');
    if(!r) return; if(!r.dung){ await say('nghi','','Ghép không ra chữ. Bên ngoài sẽ chỉ thấy một tin hỏi thăm bình thường.'); hideDlg(); return; }
    if(r.vung&&!(S.mon==='sim'&&hasF('x_giu'))) effects('+nghi:10 +lo:5');
    setCo(w==='SONG'?'x_tin_song':'x_tin_3g'); setCo('x_cho_xn'); await say('nghi','','Đã gửi. Giờ chờ tin rác trả lời.'); hideDlg(); },
  goive:goiVe, ca:async()=>{}, sodo:gSodo, ghepgiay:gGhep, lichtuan:gLich, nghetieng:gNghe, danhsach:gDanhSach,
  dongtien1:()=>gDongTien(1), dongtien:()=>gDongTien(2)};
const doGame1=doGame;
doGame=async function(){ const g=pendingGame; if(P2.on&&P2GAMES[g]){ pendingGame=null; hideDlg(); if(phAuto) closePhone(); await P2GAMES[g](); return; } return doGame1(); };
