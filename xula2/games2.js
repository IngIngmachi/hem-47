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
.p2plan .p2slot{position:absolute;background:rgba(10,12,18,.25);border-color:rgba(240,178,92,.55);color:#efe8d8;text-shadow:0 1px 3px #000;align-items:flex-end;padding-bottom:8px}.p2plan .p2slot .p2card{font-size:12px;padding:5px 8px}
.p2chain{display:flex;align-items:center;gap:6px;flex-wrap:wrap;justify-content:center}
.p2chain .ar{color:#f0b25c;font-size:20px}
.p2chain .p2slot{min-width:130px}
.p2fixed{background:#f0b25c;color:#1d1d1d;border-radius:8px;padding:8px 10px;font-weight:700;font-size:14px}
.p2tl{display:grid;grid-template-columns:70px repeat(10,1fr);gap:3px;font-size:12px;color:#9aa2b5;align-items:center}
.p2tl .cell{height:40px;border-radius:6px;background:#171b28;border:1px solid #232a3d}
.p2tl .cell.g{background:#7a3a36;border-color:#e2645c}
.p2tl .col{cursor:pointer}.p2tl .col.pick{outline:2px solid #5fb37a}
.p2paper{display:grid;grid-template-columns:repeat(3,1fr);gap:0;width:min(270px,100%);aspect-ratio:3/4;margin:0 auto;background:#1a1f2c;border-radius:6px;overflow:hidden}
.p2paper .p2slot{border-radius:0;border-width:1px;min-height:0}
.p2piece{touch-action:none;width:96px;aspect-ratio:3/4;border-radius:3px;background-size:300% 200%;cursor:grab;box-shadow:0 2px 6px rgba(0,0,0,.5)}
.p2piece.drag{position:fixed;z-index:99999;pointer-events:none}
.p2paper .p2piece{width:100%;height:100%;box-shadow:none;border-radius:0}
.p2wave{width:100%;height:120px;background:#0f121b;border-radius:10px;display:block}
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
.dd2 .mg{position:absolute;inset:0;z-index:5;background:#05060a;border-radius:10px;display:flex;flex-direction:column;gap:8px;padding:0 0 8px}.dd2 .mg .mgc{flex:1 1 auto;min-height:0;display:flex;align-items:center;justify-content:center}.dd2 .mg canvas{max-height:100%;width:auto;max-width:100%}.dd2 .mg .mgt{margin:0;padding:0 10px;font-size:14px;line-height:1.4;color:#cfc8b8;text-align:center}.dd2 .mg .mgb{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;padding:0 8px}.dd2 .mg button.main{background:#f0b25c;color:#1d1d1d;border-color:#f0b25c;font-weight:700;min-width:120px}.dd2 .mg button.ghost{background:transparent}
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
const p2open=(html,onX)=>{ hideDlg(); if(typeof phAuto!=='undefined'&&phAuto) closePhone(); const g=$('game'); g.hidden=false; const box=$('gameBox'); box.innerHTML='<div class="p2g"><button class="p2x" id="p2x" type="button">✕ Để sau</button>'+html+'</div>'; box.scrollTop=0;
  $('p2x').onclick=()=>{ if(onX){ onX(); return; } const t=P2XIDS.map(i=>$(i)).find(Boolean); if(t) t.click(); };
  if(!onX&&!P2XIDS.some(i=>$(i))) $('p2x').remove(); return box; };
const p2close=()=>{ $('game').hidden=true; $('gameBox').innerHTML=''; };
const fx=s=>effects(s);

/* ---------------- kéo thả chung (chuột lẫn cảm ứng) ---------------- */
function dragKit(root,onDrop){ let cur=null, ghost=null, ox=0, oy=0, hot=null;
  const slotAt=(x,y)=>{ ghost&&(ghost.style.display='none'); const el=document.elementFromPoint(x,y); ghost&&(ghost.style.display=''); return el&&el.closest('[data-slot]'); };
  root.addEventListener('pointerdown',e=>{ const c=e.target.closest('[data-card]'); if(!c||c.classList.contains('lock')) return; e.preventDefault(); cur=c; const r=c.getBoundingClientRect(); ox=e.clientX-r.left; oy=e.clientY-r.top;
    ghost=c.cloneNode(true); ghost.classList.add('drag'); ghost.style.width=r.width+'px'; ghost.style.height=r.height+'px'; ghost.style.left=(e.clientX-ox)+'px'; ghost.style.top=(e.clientY-oy)+'px'; document.body.appendChild(ghost); c.style.opacity='.3'; try{ root.setPointerCapture(e.pointerId); }catch(_){} });
  root.addEventListener('pointermove',e=>{ if(!ghost) return; ghost.style.left=(e.clientX-ox)+'px'; ghost.style.top=(e.clientY-oy)+'px'; const s=slotAt(e.clientX,e.clientY); if(hot&&hot!==s) hot.classList.remove('hot'); hot=s; if(s) s.classList.add('hot'); });
  const end=e=>{ if(!ghost) return; const s=slotAt(e.clientX,e.clientY); ghost.remove(); ghost=null; if(hot) hot.classList.remove('hot'); hot=null; const c=cur; cur=null; c.style.opacity=''; onDrop(c,s); };
  root.addEventListener('pointerup',end); root.addEventListener('pointercancel',end); }

/* =====================================================================
   1. ĐỌC CHỮ ĐẦU CÂU
   ===================================================================== */
function giaiMa(tin,dapan,title,goi,anh){ return new Promise(res=>{ const cau=tin.split('\n');
  const line=c=>{ const m=c.match(/^(\s*)(\S)(.*)$/); return m?'<span class="f">'+esc(m[2])+'</span>'+esc(m[3]):esc(c); };
  const B=p2open('<h3>'+esc(title||'Giải tin')+'</h3><p class="tip">'+esc(goi||'Đọc chữ cái đầu của mỗi câu, bỏ dấu, ghép liền.')+'</p>'+
   '<div class="p2note"><div class="paper" id="gmp">'+cau.map(line).join('<br>')+'</div><div class="photo" id="gmph" hidden></div></div>'+
   '<div class="p2slots" id="gms" hidden></div><div class="p2ans"><input class="p2in" id="gm" autocomplete="off" placeholder="Nhập chữ đọc được…" aria-label="Chữ đọc được"><button class="clr" id="gmc" type="button" aria-label="Xóa">×</button></div>'+
   '<p class="tip" id="gmm" style="text-align:center;min-height:1.4em;margin:4px 0 0"></p>'+
   '<div class="p2bar"><button class="btn ghost" id="gmg" type="button">💡 Gợi ý (0/3)</button><button class="btn ghost" id="gmX" type="button">Để sau</button><button class="btn p2main" id="gmo" type="button">Đọc ra →</button></div>');
  if(anh){ const im=new Image(); im.onload=()=>{ const ph=$('gmph'); if(ph){ ph.style.backgroundImage='url('+im.src+')'; ph.hidden=false; } }; im.src='img2/'+anh+'.webp'; }
  let thu=0, goiY=0;
  $('gmg').onclick=()=>{ if(goiY>=3) return; goiY++; $('gmg').textContent='💡 Gợi ý ('+goiY+'/3)';
    if(goiY===1) $('gmp').classList.add('hl');
    if(goiY>=2){ const sl=$('gms'); sl.hidden=false; sl.innerHTML=dapan.split('').map((c,i)=>'<span>'+(goiY===3&&i<2?esc(c):'')+'</span>').join(''); $('gmm').textContent=goiY===2?'Có '+dapan.length+' chữ.':'Mở sẵn hai chữ đầu.'; } };
  $('gmc').onclick=()=>{ $('gm').value=''; $('gm').focus(); };
  $('gmX').onclick=()=>{ p2close(); res(false); };
  const go=()=>{ const v=bo($('gm').value).toUpperCase().replace(/[^A-Z0-9]/g,''); if(!v){ $('gmm').textContent='Gõ chữ đọc được vô ô trên.'; return; } thu++; if(v===dapan){ chime(); p2close(); res(true); } else if(thu>=3){ $('gmm').textContent='Đáp án: '+dapan; setTimeout(()=>{ p2close(); res(false); },1800); } else { tone(200,.15,.03,'sawtooth'); $('gmm').textContent='Chưa đúng. Còn '+(3-thu)+' lần.'; } };
  $('gmo').onclick=go; $('gm').onkeydown=e=>{ if(e.key==='Enter') go(); }; setTimeout(()=>$('gm').focus(),50); }); }

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
function giauChu(tu,goi){ return new Promise(res=>{ const can=bo(tu).toUpperCase().replace(/[^A-Z0-9]/g,''); let de=!!S.p2de;
  p2open('<h3>Tin giấu chữ · cần ghép ra: <span style="color:#f0b25c">'+esc(can)+'</span></h3><p class="tip">Gõ một tin bình thường gửi về nhà. Mỗi câu một dòng hoặc ngắt bằng dấu chấm. Chữ đầu mỗi câu ghép lại phải ra <b>'+esc(can)+'</b>. '+esc(goi||'Quản lý đọc lướt mọi tin: câu cụt, câu mở đầu giống nhau, hay chữ nhạy cảm là bị để ý.')+'</p>'+
   '<div class="p2acr" id="acr"></div><textarea class="p2ta" id="gt" placeholder="Sáng nay trời mưa quá mẹ ơi.&#10;Ở đây ăn uống cũng đủ…"></textarea><div id="gl"></div><div class="p2frag" id="frag"></div>'+
   '<div class="p2bar"><button class="btn ghost" id="gde" type="button"></button><button class="btn ghost" id="gx" type="button">Để sau</button><button class="btn p2main" id="gs" type="button">Gửi ➤</button></div>');
  const ta=$('gt');
  const upd=()=>{ const r=chamTin(ta.value,tu); let h=''; for(let i=0;i<can.length;i++){ const c=r.dau[i]; h+='<span class="'+(c==null?'need':c===can[i]?'ok':'no')+'">'+(c||can[i])+'</span>'; } if(r.dau.length>can.length) h+='<span class="no">+'+(r.dau.length-can.length)+'</span>'; $('acr').innerHTML=h; $('gl').innerHTML=r.loi.map(x=>'<p class="p2bad">'+esc(x)+'</p>').join(''); };
  const frag=()=>{ $('gde').textContent=de?'Tự gõ hết':'Dễ: có câu gợi ý'; const f=$('frag'); if(!de){ f.innerHTML=''; return; } let h=''; [...new Set(can.split(''))].forEach(c=>(MANH[c]||[]).forEach(m=>{ h+='<button type="button" data-m="'+esc(m)+'"><b>'+esc(m[0])+'</b>'+esc(m.slice(1))+'</button>'; })); f.innerHTML=h; f.querySelectorAll('button').forEach(b=>b.onclick=()=>{ ta.value=(ta.value.trim()?ta.value.trim()+'\n':'')+b.dataset.m; upd(); }); };
  ta.oninput=upd; upd(); frag();
  $('gde').onclick=()=>{ de=!de; S.p2de=de; frag(); };
  $('gx').onclick=()=>{ p2close(); res(null); };
  $('gs').onclick=()=>{ const r=chamTin(ta.value,tu); if(!r.cau.length){ toast('Chưa gõ gì.'); return; } p2close(); res(r); }; }); }
function nextWord(){ if(S.nhanh==='B'&&!hasF('x_tin_song')&&!hasF('x_goi_ok')) return 'SONG'; if(!hasF('x_tin_3g')&&hasF('x_gio')) return '3G'; return ''; }

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
const khSlug=t=>bo(t).toLowerCase().replace(/[^a-z0-9]+/g,'-');
function caNhan(so){ return new Promise(async res=>{ const out={chot:0,tinh:0,bo:0}; let thoat=false;
  for(let i=0;i<so&&!thoat;i++){ const k=KHACH[(S.day*5+i*3+(S.so||[]).length)%KHACH.length]; const L=[]; let tab='kh', mm=34+i*7;
    const meo=hasF('x_meo_cailoi'); const tm=()=>{ mm+=1+Math.floor(Math.random()*2); return '10:'+String(mm%60).padStart(2,'0'); };
    const INFO={kh:k.ho,kb:'Kịch bản: '+k.kieu+'. Đi theo từng bước, khách hỏi gì cũng kéo về chuyện tiền.',mt:'Chỉ tiêu: chốt 3 khách mỗi ngày. Thiếu thì bị phạt, Chị Bảy ghi tên.',ng:'Gõ sai một dấu ở chữ quan trọng. Người tinh ý sẽ khựng lại, tưởng bị lừa, rồi bỏ đi. Quản lý chỉ thấy lỗi gõ.'};
    const TABS=[['kh','Thông tin khách'],['kb','Kịch bản'],['mt','Mục tiêu hôm nay']].concat(meo?[['ng','Ghi chú của Ngân']]:[]);
    const draw=extra=>{ p2open('<h3>Ca nhắn tin</h3><div class="p2chat"><div class="hd"><div class="av" id="cav">'+esc(k.ten.split(' ').pop()[0])+'</div><div><b>'+esc(k.ten)+'</b><small>'+esc(k.ho)+'</small></div><span class="ct">Chỉ tiêu hôm nay '+CT()+'/3</span></div>'+
      '<div class="bd"><nav class="side">'+TABS.map(t=>'<button type="button" data-tab="'+t[0]+'" class="'+(tab===t[0]?'on':'')+'">'+esc(t[1])+'</button>').join('')+'<p class="info">'+esc(INFO[tab])+'</p></nav>'+
      '<div class="main"><div class="log" id="clog">'+L.join('')+'</div><div class="opts">'+(extra||'')+'</div></div></div></div>',()=>{ thoat=true; if(window.__caPick) window.__caPick('x'); });
      const im=new Image(); im.onload=()=>{ const a=$('cav'); if(a){ a.style.backgroundImage='url('+im.src+')'; a.textContent=''; } }; im.src='img2/x2-khach-'+khSlug(k.ten)+'.webp';
      document.querySelectorAll('.p2chat [data-tab]').forEach(b=>b.onclick=()=>{ tab=b.dataset.tab; const inf=document.querySelector('.p2chat .info'); document.querySelectorAll('.p2chat [data-tab]').forEach(x=>x.classList.toggle('on',x===b)); if(inf) inf.textContent=INFO[tab]; });
      const lg=$('clog'); if(lg) lg.scrollTop=1e5; };
    const bin=t=>'<div class="b in">'+esc(t)+'<i>'+tm()+'</i></div>', bout=t=>'<div class="b out">'+t+'<i>'+tm()+' · đã gửi</i></div>', bsys=t=>'<div class="b sys">'+t+'</div>';
    L.push(bin(k.vao)); let loi=false, lanh=false;
    for(let t=0;t<k.luot.length&&!lanh&&!thoat;t++){ const R=k.luot[t]; if(t>0) L.push(bin(R.k));
      const dw=esc(R.d).replace(esc(R.w[0]),meo?'<span class="p2w" id="ww">'+esc(R.w[0])+'</span>':esc(R.w[0]));
      draw('<div class="op ok"><div><small>✓ Đúng kịch bản</small>'+dw+'</div><button class="snd" id="oD" type="button" aria-label="Gửi tin đúng kịch bản">➤</button></div><div class="op"><div><small>Tin lạnh · khách bỏ đi, thiếu chỉ tiêu</small>'+esc(R.l)+'</div><button class="snd" id="oL" type="button" aria-label="Gửi tin lạnh">➤</button></div>'+(meo?'<p class="tip" style="margin:0">Chạm chữ gạch vàng để gõ sai một dấu.</p>':''));
      let sai=false; const ww=$('ww'); if(ww) ww.onclick=()=>{ sai=!sai; ww.textContent=sai?R.w[1]:R.w[0]; ww.classList.toggle('loi',sai); };
      const pk=await new Promise(r=>{ window.__caPick=r; $('oD').onclick=()=>r('d'); $('oL').onclick=()=>r('l'); }); window.__caPick=null;
      if(pk==='x') break;
      if(pk==='l'){ L.push(bout(esc(R.l))); lanh=true; break; }
      if(sai) loi=true; L.push(bout(esc(sai?R.d.replace(R.w[0],R.w[1]):R.d))); draw(); await sleep(450); }
    if(thoat){ out.bo+=so-i; break; }
    let kq; if(lanh){ kq='bo'; L.push(bsys(esc(k.ten)+' đã rời cuộc trò chuyện.')); }
    else if(loi){ kq='tinh'; L.push(bin('ủa sao chữ này viết kỳ vậy… thôi để hỏi con cái rồi tính')+bsys(esc(k.ten)+' đã chặn bạn. Tiền còn nguyên.')); }
    else { kq='chot'; L.push(bin('đã chuyển rồi nha')+bsys('🔔 Chuông chốt đơn. '+esc(k.ten)+' vừa mất tiền.')); (S.so=S.so||[]).push(k.ten+' · '+k.ho); ctAdd(1); }
    out[kq]++;
    if(loi&&Math.random()<.35){ if((S.tin.bay||0)>=3) L.push(bsys('Chị Bảy đọc lướt tin của bạn, dừng ở chữ sai, rồi lướt qua.')); else { L.push(bsys('Chị Bảy đọc lướt tin của bạn, dừng ở chữ sai. Chị nhìn bạn một lúc lâu.')); fx('+nghi:12'); } }
    draw('<div class="p2bar" style="margin:0;justify-content:flex-end"><button class="btn p2main" id="oN" type="button">'+(i<so-1?'Khách kế →':'Hết ca')+'</button></div>'); await new Promise(r=>{ window.__caPick=r; $('oN').onclick=r; }); window.__caPick=null; }
  if(thoat){ await sleep(10); }
  p2close(); if(thoat){ await say('nghi','','Bỏ dở ca. Chỉ tiêu hụt, Chị Bảy sẽ ghi tên.'); hideDlg(); fx('+nghi:5'); } res(out); }); }
async function caCa(so){ if(S.day>=11){ busy=true; const p=await choose([{ma:'d',loi:'Nhắn đúng kịch bản cả ca',sub:'đủ chỉ tiêu, có người mất tiền'},{ma:'l',loi:'Cài lỗi vào hết',sub:'khách tỉnh ra, thiếu chỉ tiêu, có thể bị nghi',dis:!hasF('x_meo_cailoi')},{ma:'n',loi:'Ngồi nhắn từng khách',sub:'chơi đủ ca'}],false,'Tiếng gõ phím. Lại một ca.'); hideDlg();
    if(p.ma==='d'){ for(let j=0;j<so;j++){ const k=KHACH[(S.day+j)%KHACH.length]; (S.so=S.so||[]).push(k.ten+' · '+k.ho); } ctAdd(so); return {chot:so,tinh:0,bo:0}; }
    if(p.ma==='l'){ if(Math.random()<.5&&(S.tin.bay||0)<3) fx('+nghi:12'); return {chot:0,tinh:so,bo:0}; } }
  return caNhan(so); }

/* =====================================================================
   4. CUỘC GỌI VỀ NHÀ — chọn câu có đồng hồ, chữ đầu ghép ra chữ cần gửi
   ===================================================================== */
async function goiVe(){ const B=S.nhanh==='B'; const tu=B?'SONG':'CUA'; const ng=(S.nhanh==='A'&&S.ai_vao==='ngan')?'mẹ':'bà';
  const sets=B?[[['Sáng nay ở đây mưa quá '+ng+' ơi.',1],['Con khỏe, '+ng+' đừng lo.',0],['Mấy bữa nay con ăn được lắm.',0]],
    [['Ở đây ai cũng tốt với con hết.',1],['Tụi con được nghỉ trưa.',0],['Ở trển có cái chùa hay lắm.',0,1]],
    [['Nghe nói tháng sau con được lên lương.',1],['Còn lâu con mới về.',0],['Ngày nào con cũng ra bờ sông ngồi.',0,1]],
    [['Gửi giùm con năm triệu nha, đóng tiền nợ.',1],[(ng==='mẹ'?'Mẹ':'Bà')+' giữ sức khỏe nha.',0],['Gần bờ sông ở đây gió lắm.',0,1]]]
   :[[['Cơm ở đây cũng được '+ng+'.',1],[(ng==='mẹ'?'Mẹ':'Bà')+' có khỏe hông.',0],['Có cái cửa sau ra sông, con hay ra ngồi.',0,1]],
    [['Út nhà mình học sao rồi '+ng+'.',1],['Tháng sau con gửi tiền.',0],['Ở đây đêm hổng ai canh.',0,1]],
    [['Ai hỏi thì '+ng+' nói con khỏe.',1],['Chuyển giùm con năm triệu nha.',0],['Con ngủ lầu hai.',0]]];
  let ok=0; const bg0=BGNOW; BGNOW='x2-goi-ve'; fade=.7;
  for(let i=0;i<sets.length;i++){ const o=sets[i]; const prog=tu.split('').map((c,j)=>j<i?c:j===i?'['+c+']':'·').join(' ');
    const p=await choose(o.map((x,n)=>({ma:'g'+n,loi:x[0],timer:8,mac:-1})),false,'Chữ cần: '+prog+' · Chị Bảy đứng sau lưng');
    if(!p||p.ma==='_het'){ await say('mota','',ME+' im lặng một giây quá lâu. Người đứng sau lưng gõ nhẹ vào vai.'); fx('+nghi:6'); continue; }
    const pick=o[+p.ma.slice(1)]; await say('thoai',ME,pick[0]); if(pick[1]) ok++; else if(pick[2]){ fx('+nghi:8'); } }
  hideDlg(); BGNOW=bg0; fade=.5;
  if(ok===sets.length){ setCo('x_goi_ok'); await say('nghi','','Nếu bên kia nghe ra, bên ngoài sẽ có chữ '+tu+'.'); }
  else await say('nghi','','Có câu lệch chữ. Chắc bên kia không đọc ra.'); hideDlg(); }

/* =====================================================================
   5. KÉO THẺ VÀO Ô (dùng cho sơ đồ, dòng tiền)
   ===================================================================== */
function dropGame(o){ /* o: {title,tip,html(slots markup),cards:[{id,t,lock}],check:map=>bool|'msg',hint} */ return new Promise(res=>{ const place={};
  const render=()=>{ const B=p2open('<h3>'+esc(o.title)+'</h3><p class="tip">'+esc(o.tip)+'</p>'+o.html+'<div class="p2trayhd"><span>Các lựa chọn · kéo vô ô</span><button type="button" id="dgR">↺ Xóa tất cả</button></div><div class="p2tray" data-slot="tray" id="tray"></div><p class="tip" id="dgm" style="text-align:center;min-height:1.4em"></p><div class="row"><button class="btn ghost" id="dgX" type="button">Để sau</button><button class="btn p2main" id="dgOk" type="button">Xong</button></div>');
    const cardH=c=>'<div class="p2card'+(c.lock?' lock':'')+'" data-card="'+c.id+'" title="'+(c.lock?'Chưa có manh mối này':'')+'">'+esc(c.lock?'???':c.t)+'</div>';
    B.querySelectorAll('[data-slot]').forEach(s=>{ if(s.id==='tray') return; const id=s.dataset.slot; const c=o.cards.find(c=>place[c.id]===id); s.innerHTML=c?cardH(c):esc(s.dataset.ph||''); });
    $('tray').innerHTML=o.cards.filter(c=>!place[c.id]).map(cardH).join('');
    dragKit(B,(card,slot)=>{ const id=card.dataset.card; if(!slot) return; const sid=slot.dataset.slot; if(sid==='tray'){ delete place[id]; render(); return; }
      for(const k in place) if(place[k]===sid) delete place[k]; place[id]=sid; tone(440,.05,.02,'triangle'); render(); });
    $('dgX').onclick=()=>{ p2close(); res(false); };
    $('dgR').onclick=()=>{ for(const k in place) delete place[k]; render(); };
    $('dgOk').onclick=()=>{ const r=o.check(place); if(r===true){ chime(); p2close(); res(true); return; } tone(200,.2,.03,'sawtooth');
      B.querySelectorAll('[data-slot]').forEach(s=>{ if(s.id==='tray') return; const c=o.cards.find(c=>place[c.id]===s.dataset.slot); s.classList.toggle('ok',!!c&&c.ok===s.dataset.slot); s.classList.toggle('bad',!!c&&c.ok!==s.dataset.slot); });
      $('dgm').textContent=typeof r==='string'?r:'Chưa khớp. Ô đỏ là chỗ sai.'; }; };
  render(); }); }
function p2imgUrl(k){ return (typeof P2REAL!=='undefined'&&P2REAL[k])?'img2/'+k+'.webp':''; }
async function gSodo(){ const plan=p2imgUrl('x2-trai-matcat');
  const SL=[['mt','Lầu ba · bên phải',.559,.043,.404,.29],['kh','Lầu ba · bên trái',.045,.043,.353,.29],['ng','Lầu hai · dãy ngủ',.045,.36,.353,.27],['bt','Lầu hai · cuối hành lang',.721,.36,.242,.27],['pm','Trệt · bên trái',.045,.66,.353,.285],['be','Trệt · sát sau',.565,.66,.17,.285],['cs','Trệt · cuối',.846,.66,.117,.285]];
  const C=[{id:'pm',t:'Phòng máy',ok:'pm'},{id:'be',t:'Bếp',ok:'be'},{id:'cs',t:'Cửa sau ra sông',ok:'cs'},{id:'ng',t:'Phòng ngủ các tổ',ok:'ng'},{id:'bt',t:'Buồng tắm',ok:'bt'},{id:'mt',t:'Văn phòng quản lý',ok:'mt',lock:!hasF('x_sodo3')},{id:'kh',t:'Kho',ok:'kh',lock:!hasF('x_sodo3')},{id:'x',t:'Phòng giám đốc',ok:'-'}];
  const html='<div class="p2plan">'+(plan?'<img src="'+plan+'" alt="">':'')+SL.map(s=>'<div class="p2slot" data-slot="'+s[0]+'" data-ph="'+esc(s[1])+'" style="left:'+s[2]*100+'%;top:'+s[3]*100+'%;width:'+s[4]*100+'%;height:'+s[5]*100+'%"></div>').join('')+'</div>';
  const ok=await dropGame({title:'Sơ đồ trại',tip:'Kéo tên từng chỗ vào đúng ô trên sơ đồ ba tầng. Chỗ nào chưa biết thì bỏ trống (thẻ ??? là chưa có ai kể).',html,cards:C,
    check:p=>{ const need=C.filter(c=>!c.lock&&c.ok!=='-'); if(p.x) return 'Ở đây hổng có phòng giám đốc. Không ai được thấy mặt ông chủ.'; const bad=need.filter(c=>p[c.id]!==c.ok); return bad.length?'Còn '+bad.length+' chỗ sai hoặc chưa xếp.':true; }});
  if(ok){ setCo('x_sodo_ok'); toast('Sơ đồ xong'); } }
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
function gNghe(){ return new Promise(res=>{ const B=p2open('<h3>Nghe kỹ tin thoại</h3><p class="tip">Kéo thanh lọc qua lại. Tới đúng chỗ, tiếng nói chìm xuống và tiếng nền nổi lên.</p><canvas class="p2wave" id="wv" width="900" height="160"></canvas><input type="range" class="p2rng" id="rg" min="0" max="100" value="10" aria-label="Lọc tiếng"><p class="p2msg" id="nt" style="text-align:center;min-height:2em">…</p><div class="row"><button class="btn" id="ngOk" type="button">Nghe ra rồi</button><button class="btn ghost" id="ngX" type="button">Để sau</button></div>');
  const cv=$('wv'), q=cv.getContext('2d'); const T='…loa phường… thông báo… lịch tiêm phòng… khu phố 3… phường…'; const tgt=73; let t=0, raf;
  const draw=()=>{ if(!$('rg')) return; t+=.05; const v=+$('rg').value; const d=Math.abs(v-tgt); const clear=Math.max(0,1-d/14);
    q.fillStyle='#0f121b'; q.fillRect(0,0,900,160); q.strokeStyle='rgba(240,178,92,'+(.9-clear*.6)+')'; q.lineWidth=2; q.beginPath(); for(let x=0;x<900;x+=3){ const y=80+Math.sin(x*.05+t*4)*40*(1-clear*.7)*Math.sin(x*.004+t)+Math.sin(x*.21+t*7)*10; x?q.lineTo(x,y):q.moveTo(x,y); } q.stroke();
    q.strokeStyle='rgba(95,179,122,'+clear+')'; q.beginPath(); for(let x=0;x<900;x+=3){ const y=80+Math.sin(x*.012+t*2)*22; x?q.lineTo(x,y):q.moveTo(x,y); } q.stroke();
    const n=Math.round(T.length*clear); $('nt').textContent=clear<.15?'(tiếng nói đều đều, rè rè)':T.split('').map((ch,i)=>i<n||ch===' '?ch:'·').join(''); raf=requestAnimationFrame(draw); };
  draw();
  $('ngX').onclick=()=>{ cancelAnimationFrame(raf); p2close(); res(false); };
  $('ngOk').onclick=()=>{ if(Math.abs(+$('rg').value-tgt)<=5){ cancelAnimationFrame(raf); chime(); p2close(); fx('+cc:x_giong'); res(true); } else { toast('Chưa nghe rõ. Kéo tiếp.'); } }; }); }

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
  may:{ten:'Lấy cái điện thoại dưới thùng nước',f:1,x:858,why:'Có máy mới gửi tin ra được.',c:()=>hasF('x_biet_may')&&!hasF('x_may'),k:'x_dd_may'},
  gapngan:{ten:'Gặp Ngân ở buồng tắm',f:1,x:840,why:'Nói chuyện riêng, ngoài tầm camera.',thang:1,c:()=>S.nhanh==='B'&&hasF('x_ngan_nghe')&&!hasF('x_ngan_b3')&&(S.tin.ngan||0)>=2,k:'x_nganb3'},
  thuy:{ten:'Gặp Thủy ở buồng tắm',f:1,x:840,why:'Thủy hẹn.',thang:1,c:()=>S.nhanh==='B'&&hasF('x_thuy_biet')&&!hasF('x_thuy_chi'),k:'x_thuygap'},
  tuan0:{ten:'Dò lính gác trệt',f:0,x:900,why:'Ghi giờ lính đi qua cửa sau.',c:()=>!hasF('x_tuan0'),k:'x_dd_tuan0'},
  tuan3:{ten:'Dò lính gác lầu ba',f:2,x:900,why:'Vẽ nốt phần sơ đồ còn thiếu.',c:()=>!hasF('x_tuan3'),k:'x_dd_tuan3'},
  kim:{ten:'Lấy cây kìm trên nóc tủ bếp',f:0,x:650,why:'Cắt được rào ra bờ sông.',c:()=>(hasF('x_biet_kim')||S.day>=12)&&!hasF('x_kim'),k:'x_dd_kim'},
  rao:{ten:'Cắt rào sau bếp',f:0,x:740,why:'Lối thứ hai ra sông.',c:()=>hasF('x_kim')&&!hasF('x_rao'),k:'x_dd_rao'},
  cua:{ten:'Mở khóa cửa sau',f:0,x:905,why:'Lối gần ghe nhất.',c:()=>hasF('x_chia')&&!hasF('x_cua'),k:'x_dd_cua'},
  nghe:{ten:'Nghe lén văn phòng lầu ba',f:2,x:600,why:'Tin thoại của Ông Chủ Lò.',c:()=>S.day>=12&&!hasF('x_nghe_len'),k:'x_dd_nghe'}};
/* =====================================================================
   10b. TRÒ NHỎ KHI TỚI CHỖ — mỗi việc đi đêm một kiểu
   ===================================================================== */
const MGIMG={may:'x2-mg-thung',tuan0:'x2-mg-khe',tuan3:'x2-mg-khe',kim:'x2-mg-tu',rao:'x2-mg-rao',cua:'x2-mg-cua',nghe:'x2-mg-cuavp'};
const mgT=(x,s,px,py,o)=>{ o=o||{}; x.font=(o.b?'600 ':'')+Math.round((o.s||18)*1.6)+'px "Be Vietnam Pro",sans-serif'; x.fillStyle=o.c||'#efe8d8'; x.textAlign=o.a||'center'; x.fillText(s,px,py); x.textAlign='left'; };
const mgBar=(x,px,py,w,v,c,lab)=>{ x.fillStyle='rgba(255,255,255,.1)'; x.fillRect(px,py,w,16); x.fillStyle=c; x.fillRect(px,py,w*Math.max(0,Math.min(1,v)),16); if(lab) mgT(x,lab,px,py-8,{s:14,a:'left',c:'#9aa2b5'}); };
const mgPanel=(x,px,py,w,h,a)=>{ x.fillStyle='rgba(8,10,16,'+(a==null?.72:a)+')'; x.beginPath(); x.roundRect?x.roundRect(px,py,w,h,14):x.rect(px,py,w,h); x.fill(); };
const MINI={
  /* 1. mò điện thoại dưới đáy thùng nước rồi gỡ băng keo */
  may(x,u){ let ph='mo', noise=0, tens=0, prog=0, pull=0; const a0=Math.random()*6.28, r0=40+Math.random()*150; const P={x:501+Math.cos(a0)*r0,y:300+Math.sin(a0)*r0*.95}; const rip=[]; let hint='Chạm vào mặt nước để mò.';
    u.tip('Mò dưới đáy thùng. Bọt càng nhiều là càng gần. Mò nhiều quá nước sẽ óc ách.');
    u.cv.onpointerdown=e=>{ if(ph!=='mo') return; const p=u.pt(e); if(Math.hypot(p.x-501,p.y-300)>235) return; const d=Math.hypot(p.x-P.x,p.y-P.y); rip.push({x:p.x,y:p.y,r:4,b:Math.max(0,1-d/380)});
      tone(240+Math.random()*80,.12,.02,'sine'); noise+=.11;
      if(d<62){ ph='keo'; tone(640,.08,.03,'triangle'); u.tip('Đụng rồi: cái máy dán băng keo dưới đáy. Giữ nút Kéo để gỡ, buông ra trước khi thanh căng đỏ.'); b.hidden=false; return; }
      hint=d<150?'Có gì cứng cứng ngay đây.':d<280?'Lạnh tay. Hình như gần rồi.':'Chỉ có rong rêu.';
      if(noise>=1) u.end({kq:'on',n:.55,m:'Nước óc ách. Có ai trở mình.'}); };
    const b=u.btn('Kéo',v=>pull=v,true,'main'); b.hidden=true;
    return dt=>{ if(!u.bg()){ x.fillStyle='#0d1820'; x.beginPath(); x.arc(501,300,280,0,7); x.fill(); }
      rip.forEach(r=>{ r.r+=dt*60; x.strokeStyle='rgba(170,210,230,'+Math.max(0,.7-r.r/140)+')'; x.lineWidth=2.5; x.beginPath(); x.arc(r.x,r.y,r.r,0,7); x.stroke(); for(let i=0;i<r.b*9;i++){ x.fillStyle='rgba(210,235,245,.6)'; x.beginPath(); x.arc(r.x+Math.sin(i*2.3)*r.b*30,r.y-r.r*.6-i*6,2+r.b*3,0,7); x.fill(); } });
      mgPanel(x,20,20,250,70); mgBar(x,40,62,210,noise,'#e2645c','Tiếng nước');
      if(ph==='mo'){ mgPanel(x,300,530,400,52); mgT(x,hint,500,566,{s:16,c:'#dfe8ec'}); return; }
      if(pull){ prog+=dt*.3; tens+=dt*.95; } else tens=Math.max(0,tens-dt*1.3);
      if(tens>=1){ noise+=.4; tens=0; prog=Math.max(0,prog-.15); tone(180,.25,.04,'sawtooth'); u.say('Rẹt! Băng keo giật, nước văng ra ngoài.'); if(noise>=1){ u.end({kq:'on',n:.6,m:'Nước văng tung tóe. Có tiếng người hỏi vọng ra.'}); return; } }
      x.save(); x.translate(P.x,P.y); x.rotate(-.2); x.fillStyle='rgba(20,24,30,.92)'; x.fillRect(-70,-40,140,80); x.strokeStyle='#5a6470'; x.lineWidth=3; x.strokeRect(-70,-40,140,80); x.fillStyle='rgba(225,212,165,'+(1-prog)+')'; x.fillRect(-90,-14,180*(1-prog),26); x.restore();
      mgPanel(x,620,420,360,160); mgBar(x,645,470,310,tens,tens>.75?'#e2645c':'#f0b25c','Độ căng'); mgBar(x,645,540,310,prog,'#5fb37a','Băng keo đã gỡ');
      if(prog>=1){ chime(); u.end({kq:'ok'}); } }; },

  /* 2. nằm sát sàn nhìn qua khe cửa, ghi giờ lính đi ngang */
  tuan(x,u,f3){ const PASS=[3,9,15,21,27,30]; let clk=0, rec=[], bad=0, q=false; const sp=.8;
    u.tip('Nhìn qua khe dưới cửa. Lính đi ngang thì bấm Ghi. Ghi lộn ba lần là phải làm lại.');
    const vis=()=>PASS.findIndex(p=>clk>=p&&clk<p+2.4);
    u.btn('Ghi giờ',()=>{ if(q) return; const i=vis(); if(i>=0&&!rec.includes(i)){ rec.push(i); tone(880,.05,.02,'triangle'); } else { bad++; tone(200,.08,.02); if(bad>=3) u.end({kq:'hong',m:'Ghi lộn xộn quá, hổng tin được. Mai làm lại.'}); } },false,'main');
    const ask=()=>{ q=true; u.clear(); u.tip('Ghi được '+rec.length+'/'+PASS.length+' lượt. Lúc nào cầu thang trống?');
      if(rec.length<4){ u.end({kq:'hong',m:'Ghi sót nhiều quá. Mai nằm lại.'}); return; }
      [['2:45',0],['3:00',1],['3:06',0]].forEach(([s,ok])=>u.btn(s,()=>u.end(ok?{kq:'ok'}:{kq:'hong',m:'Sai giờ. Coi lại tờ ghi chép.'}))); };
    return dt=>{ if(!q){ clk+=dt/sp; if(clk>=40) ask(); }
      if(!u.bg()){ x.fillStyle='#07080c'; x.fillRect(0,0,1000,600); x.fillStyle='#2a2e38'; x.fillRect(60,220,880,280); }
      const i=vis(); if(i>=0&&!q){ const p=(clk-PASS[i])/2.4; const gx=60+880*(i===5?1-p:p); x.save(); x.beginPath(); x.rect(40,222,920,290); x.clip(); x.fillStyle='rgba(255,230,140,.12)'; x.fillRect(gx-160,222,320,290); x.translate(gx,495); x.scale(.95,.95); try{ drawChar(x,'seo',0,0,i===5?-1:1,{walk:true,ph:clk*8,t:clk}); }catch(e){} x.restore(); }
      const m=30+Math.floor(clk), hh=m>=60?3:2, mm=m%60;
      mgPanel(x,24,20,200,110); mgT(x,hh+':'+String(mm).padStart(2,'0'),124,84,{s:36,c:'#f0b25c'}); mgT(x,(f3?'Lầu ba':'Trệt')+' · khe cửa',124,116,{s:12,c:'#9aa2b5'});
      mgPanel(x,700,20,276,190); mgT(x,'Sổ ghi',720,52,{s:13,c:'#9aa2b5',a:'left'});
      x.font='22px "IBM Plex Mono",monospace'; x.fillStyle='#efe8d8'; rec.slice().sort((a,b)=>a-b).forEach((r,j)=>{ const tm=30+PASS[r]; x.fillText((tm>=60?'3:':'2:')+String(tm%60).padStart(2,'0')+(r===5?'  lên lầu':'  đi ngang'),720,84+j*26); });
      mgT(x,'Ghi lộn: '+bad+'/3',838,200,{s:12,c:'#9aa2b5'}); }; },

  /* 3. chồng thùng nhựa, giữ thăng bằng, với lên nóc tủ */
  kim(x,u){ let ph='chong', n=0, off=0, a=0, av=0, r=0, L=0, R=0, sw=0; const CX=300;
    u.tip('Bấm Đặt khi thùng ở ngay giữa khung vàng. Chồng lệch thì lúc leo lên dễ đổ.');
    const bD=u.btn('Đặt thùng',()=>{ if(ph!=='chong') return; const o=Math.sin(sw)*200; off+=Math.abs(o); n++; tone(300,.08,.03,'square'); if(n>=3){ ph='leo'; a=(Math.random()<.5?-1:1)*Math.min(.45,off/500); bD.hidden=true; bL.hidden=bR.hidden=false; u.tip('Leo lên. Giữ ◀ ▶ cho chồng thùng đứng thẳng, tay sẽ tự với lên nóc tủ.'); } },false,'main');
    const bL=u.btn('◀ Nghiêng trái',v=>L=v,true), bR=u.btn('Nghiêng phải ▶',v=>R=v,true); bL.hidden=bR.hidden=true;
    const crate=(px,py)=>{ x.fillStyle='rgba(47,95,138,.95)'; x.fillRect(px-80,py-76,160,76); x.strokeStyle='rgba(20,40,60,.9)'; x.lineWidth=3; x.strokeRect(px-80,py-76,160,76); x.fillStyle='rgba(20,40,60,.6)'; for(let k=0;k<3;k++) x.fillRect(px-60+k*45,py-60,24,8); };
    return dt=>{ if(!u.bg()){ x.fillStyle='#14110d'; x.fillRect(0,0,1000,600); x.fillStyle='#3a2f24'; x.fillRect(560,0,380,600); }
      x.fillStyle='rgba(0,0,0,.35)'; x.fillRect(0,0,1000,600);
      x.fillStyle='rgba(240,178,92,.9)'; x.beginPath(); x.moveTo(700,18); x.lineTo(760,18); x.lineTo(752,34); x.lineTo(708,34); x.fill(); mgT(x,'cây kìm',730,58,{s:12,c:'#f0b25c'});
      if(ph==='chong'){ sw+=dt*2.6; for(let i=0;i<n;i++) crate(CX,596-i*80); crate(CX+Math.sin(sw)*200,170); x.strokeStyle='rgba(240,178,92,.7)'; x.setLineDash([8,6]); x.strokeRect(CX-90,84,180,96); x.setLineDash([]); return; }
      av+=(a*2.2+(Math.random()-.5)*1.4+(L?-2.6:0)+(R?2.6:0))*dt; av*=.985; a+=av*dt;
      if(Math.abs(a)<.3) r+=dt/6;
      if(Math.abs(a)>1){ tone(120,.5,.06,'sawtooth'); u.end({kq:'on',n:.9,m:'Rầm! Chồng thùng đổ. Cả bếp dội tiếng.'}); return; }
      x.save(); x.translate(CX,596); x.rotate(a*.5); for(let i=0;i<3;i++) crate(0,-i*80); x.fillStyle='#d8cfbf'; x.fillRect(-14,-380,28,140); x.strokeStyle='#d8cfbf'; x.lineWidth=12; x.lineCap='round'; x.beginPath(); x.moveTo(0,-360); x.lineTo(70+r*300,-380-r*150); x.stroke(); x.restore();
      mgPanel(x,20,20,280,130); mgBar(x,40,62,240,Math.abs(a),Math.abs(a)>.6?'#e2645c':'#f0b25c','Nghiêng'); mgBar(x,40,122,240,r,'#5fb37a','Với tới kìm');
      if(r>=1){ chime(); u.end({kq:'ok'}); } }; },

  /* 4. cắt rào giữa hai lượt đèn pha */
  rao(x,u){ let w=0, cut=0, hold=0, bx=-300, bd=1; const CX=560;
    u.tip('Giữ Bóp kìm để cắt từng sợi kẽm. Đèn pha quét tới mà đang bóp là bị thấy.');
    u.btn('Bóp kìm',v=>hold=v,true,'main');
    return dt=>{ bx+=bd*dt*330; if(bx>1300) bd=-1; if(bx<-300) bd=1;
      if(!u.bg()){ x.fillStyle='#090b10'; x.fillRect(0,0,1000,600); }
      x.fillStyle='rgba(0,0,0,.25)'; x.fillRect(0,0,1000,600);
      for(let i=0;i<5;i++){ const y=170+i*72; x.strokeStyle=i<w?'rgba(150,160,170,.35)':'rgba(200,205,215,.95)'; x.lineWidth=5; x.beginPath(); x.moveTo(0,y); x.lineTo(i<w?CX-30:1000,y); x.stroke(); if(i<w){ x.beginPath(); x.moveTo(CX+30,y); x.lineTo(1000,y); x.stroke(); } }
      const g=x.createRadialGradient(bx,300,10,bx,300,240); g.addColorStop(0,'rgba(255,244,200,.6)'); g.addColorStop(1,'rgba(255,244,200,0)'); x.fillStyle=g; x.fillRect(bx-250,0,500,600);
      const lit=Math.abs(bx-CX)<220;
      if(hold&&w<5){ if(lit){ tone(150,.4,.05,'sawtooth'); u.end({kq:'on',n:1,m:'Đèn pha rọi trúng. Có tiếng còi.'}); return; } cut+=dt/.9; } else cut=Math.max(0,cut-dt*1.5);
      if(cut>=1){ cut=0; w++; tone(1400,.05,.03,'square'); }
      if(w<5){ x.strokeStyle='#f0b25c'; x.lineWidth=3; x.beginPath(); x.arc(CX,170+w*72,18,0,7); x.stroke(); }
      mgPanel(x,20,20,280,80); mgBar(x,40,62,240,cut,'#f0b25c','Đang bóp');
      mgPanel(x,760,20,220,80); mgT(x,'Đã cắt '+w+'/5',870,60,{s:18}); mgT(x,lit?'ĐÈN TỚI':'tối',870,88,{s:12,c:lit?'#e2645c':'#5fb37a',b:1});
      if(w>=5){ chime(); u.end({kq:'ok'}); } }; },

  /* 5. chùm chìa: so răng với ổ khóa, rồi xoay chậm */
  cua(x,u){ const T=[0,1,2,3,4].map(()=>1+Math.floor(Math.random()*4)); const keys=[T.slice()];
    while(keys.length<5){ const k=T.slice(); const i=Math.floor(Math.random()*5), j=(i+1+Math.floor(Math.random()*4))%5; k[i]=1+(k[i]%4); if(Math.random()<.6) k[j]=1+(k[j]%4); if(!keys.some(z=>z.join()===k.join())) keys.push(k); }
    keys.sort(()=>Math.random()-.5); let sel=-1, bad=0, turn=0, tv=0, ph='chon'; const KX=600, KY=230, KH=70;
    u.tip('Chạm một cây chìa để so răng với ổ khóa (khung trên). Khớp thì bấm Tra vô. Tra sai là kêu lạch cạch.');
    u.cv.onpointerdown=e=>{ if(ph!=='chon') return; const p=u.pt(e); if(p.x>KX-10&&p.y>KY){ const i=Math.floor((p.y-KY)/KH); if(i>=0&&i<5){ sel=i; blip(); } } };
    const bT=u.btn('Tra vô',()=>{ if(sel<0){ u.say('Chọn một cây chìa trước.'); return; } if(ph!=='chon') return; if(keys[sel].join()===T.join()){ ph='xoay'; tone(500,.06,.03,'triangle'); bT.hidden=true; bX.hidden=false; u.tip('Vô rồi. Giữ Xoay thật chậm cho chốt khỏi bật cái cạch.'); } else { bad++; tone(220,.12,.04,'square'); tone(260,.1,.04,'square',.12); u.say('Lạch cạch. Không vô.'); if(bad>=3) u.end({kq:'on',n:.6,m:'Lạch cạch to quá. Đèn lầu hai bật.'}); } },false,'main');
    const bX=u.btn('Xoay',v=>tv=v,true,'main'); bX.hidden=true;
    const prof=(k,px,py,s,c)=>{ x.fillStyle=c; x.beginPath(); x.moveTo(px,py); k.forEach((h,i)=>{ x.lineTo(px+i*s+s*.2,py); x.lineTo(px+i*s+s*.35,py+h*s*.32); x.lineTo(px+i*s+s*.65,py+h*s*.32); x.lineTo(px+i*s+s*.8,py); }); x.lineTo(px+5*s,py); x.lineTo(px+5*s,py-s*.4); x.lineTo(px,py-s*.4); x.closePath(); x.fill(); };
    return dt=>{ if(!u.bg()){ x.fillStyle='#101218'; x.fillRect(0,0,1000,600); x.fillStyle='#8a7a52'; x.fillRect(320,220,200,260); }
      mgPanel(x,KX-20,16,400,190); mgT(x,'Ổ khóa',KX,44,{s:13,c:'#9aa2b5',a:'left'}); prof(T,KX+20,110,64,'rgba(255,255,255,.22)'); if(sel>=0) prof(keys[sel],KX+20,110,64,'rgba(240,178,92,.6)');
      mgPanel(x,KX-20,KY-10,400,KH*5+20);
      keys.forEach((k,i)=>{ const y=KY+i*KH; if(i===sel){ x.fillStyle='rgba(240,178,92,.18)'; x.fillRect(KX-10,y,380,KH-6); } x.fillStyle='#c9b98a'; x.beginPath(); x.arc(KX+22,y+22,16,0,7); x.fill(); x.fillStyle='rgba(8,10,16,.9)'; x.beginPath(); x.arc(KX+22,y+22,6,0,7); x.fill(); prof(k,KX+40,y+20,34,'#c9b98a'); mgT(x,String(i+1),KX+350,y+38,{s:13,c:'#9aa2b5'}); });
      mgPanel(x,20,20,190,50); mgT(x,'Lạch cạch: '+bad+'/3',115,52,{s:13,c:bad?'#e2645c':'#9aa2b5'});
      if(ph==='xoay'){ if(tv) turn+=dt*.55; mgPanel(x,20,500,300,80); mgBar(x,40,548,260,turn,'#5fb37a','Xoay'); if(turn>=1){ chime(); u.end({kq:'ok'}); } } }; },

  /* 6. áp tai nghe lén khi lính đang lên cầu thang */
  nghe(x,u){ let ear=.2, h=0, d=1, step=0, drag=false; const L=['…tổ con mèo tháng này đủ chưa…','…thằng Tú nó ngu, để má lo…','…tin để lâu là thiu…']; const EX=300;
    u.tip('Rê ngón tay dọc cánh cửa tìm chỗ nghe rõ nhất. Nghe đủ hai câu thì bấm Rút, trước khi tiếng dép lên tới nơi.');
    const mv=e=>{ const p=u.pt(e); ear=Math.max(0,Math.min(1,(p.y-60)/460)); };
    u.cv.onpointerdown=e=>{ drag=true; mv(e); }; u.cv.onpointermove=e=>{ if(drag||e.pointerType==='mouse') mv(e); }; u.cv.onpointerup=()=>drag=false;
    u.btn('Rút',()=>u.end(h>=2/3?{kq:'ok'}:{kq:'hong',m:'Nghe chưa ra gì. Lính lên rồi, để đêm khác.'}),false,'main');
    return (dt,t)=>{ const s=.5+Math.sin(t*.35)*.32; const cl=Math.max(0,1-Math.abs(ear-s)/.13); h=Math.min(1,h+cl*dt/8); d-=dt/24; step+=dt;
      if(step>Math.max(.35,d*1.4)){ step=0; tone(90,.07,.02+.05*(1-d),'triangle'); }
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
  box.innerHTML='<div class="mgc"><canvas width="1000" height="600"></canvas></div><p class="mgt"></p><div class="mgb"></div>'; host.appendChild(box);
  const cv=box.querySelector('canvas'), x=cv.getContext('2d'), tip=box.querySelector('.mgt'), bar=box.querySelector('.mgb');
  let bg=null; const k=MGIMG[muc]; if(k){ const i=new Image(); i.onload=()=>bg=i; i.src='img2/'+k+'.webp'; }
  let over=false, raf, t=0, last=performance.now(), msg='', msgT=0;
  const end=r=>{ if(over) return; over=true; cancelAnimationFrame(raf); box.remove(); window.__p2mini=null; res(r); };
  const btn=(lab,fn,hold,cls)=>{ const b=document.createElement('button'); b.type='button'; b.textContent=lab; if(cls) b.className=cls;
    if(hold){ b.addEventListener('pointerdown',e=>{ e.preventDefault(); fn(1); }); ['pointerup','pointerleave','pointercancel'].forEach(ev=>b.addEventListener(ev,()=>fn(0))); }
    else b.onclick=fn; bar.insertBefore(b,bo); return b; };
  const pt=e=>{ const r=cv.getBoundingClientRect(); return {x:(e.clientX-r.left)*1000/r.width,y:(e.clientY-r.top)*600/r.height}; };
  const bo=document.createElement('button'); bo.type='button'; bo.textContent='Rút về'; bo.dataset.bo=1; bo.className='ghost'; bo.onclick=()=>end({kq:'bo'}); bar.appendChild(bo);
  const U={btn,end,cv,pt,tip:s=>tip.textContent=s,say:s=>{ msg=s; msgT=2.2; },clear:()=>{ [...bar.children].forEach(c=>{ if(!c.dataset.bo) c.remove(); }); },
    bg:()=>{ if(!bg) return false; x.drawImage(bg,0,0,1000,600); return true; }};
  const G=MINI[muc](x,U);
  const loop=now=>{ if(over) return; const dt=Math.min(.05,(now-last)/1000); last=now; t+=dt;
    x.clearRect(0,0,1000,600); G(dt,t); if(over) return;
    if(msgT>0){ msgT-=dt; x.font='600 26px "Be Vietnam Pro",sans-serif'; const w=x.measureText(msg).width+36; mgPanel(x,500-w/2,262,w,52,.92); mgT(x,msg,500,297,{s:16,b:1}); }
    raf=requestAnimationFrame(loop); };
  raf=requestAnimationFrame(loop);
  window.__p2mini={win:()=>end({kq:'ok'}),lose:()=>end({kq:'on',n:1,m:'(thử thua)'})}; }); }

function guards(siet,rescue){ const g=[{f:0,a:60,b:960,v:70,x:500,d:1},{f:1,a:40,b:940,v:60,x:720,d:1},{f:2,a:40,b:960,v:55,x:800,d:1}];
  if(siet||rescue) g.push({f:1,a:500,b:960,v:80,x:900,d:-1}); if(rescue) g.push({f:0,a:20,b:200,v:30,x:60,d:1}); return g; }
function sneak(cfg){ return new Promise(res=>{ hideDlg(); const cuu=cfg.mode==='cuu';
  p2open('<h3>'+esc(cuu?'Đêm mưa · dẫn người ra sông':'Đi đêm · '+MUC[cfg.muc].ten)+'</h3><div class="dd2"><canvas id="dc" width="1000" height="600"></canvas><div class="ctl"><div class="g"><button id="kL" type="button" aria-label="Sang trái">◀</button><button id="kR" type="button" aria-label="Sang phải">▶</button></div><div class="g"><button id="kU" type="button">▲ Lên</button><button id="kD" type="button">▼ Xuống</button><button id="kH" type="button">Núp</button><button id="kA" class="go" type="button">'+(cuu?'Dẫn':'Lấy')+'</button><button id="kS" type="button">Chạy</button></div></div><div class="tbar"><b id="ktb"></b></div></div>',cuu?null:()=>finish(got?'xong_tre':'het'));
  if(cuu){ const xb=$('p2x'); if(xb) xb.remove(); }
  const cv=$('dc'), x=cv.getContext('2d'); const bgk=p2imgUrl('x2-trai-matcat'); let bgi=null; if(bgk){ bgi=new Image(); bgi.src=bgk; }
  const P={f:1,x:cuu?240:200,hid:false,run:false,sus:0,ph:0,face:1}; const G=guards(cfg.siet,cuu);
  let K={L:0,R:0}, paused=false, over=false, t=0, msg='', msgT=0, got=false, clock=cuu?60:0;
  const groups=cuu?cfg.groups.map((g,i)=>Object.assign({},g,{x:60+i*48,f:1,st:'cho'})):[]; let lead=null; const out=[], lost=[]; const exits=cuu?cfg.exits:[];
  const say1=m=>{ msg=m; msgT=3; };
  const hold=(id,k)=>{ const b=$(id); const on=e=>{ e.preventDefault(); K[k]=1; }, off=()=>{ K[k]=0; }; b.addEventListener('pointerdown',on); ['pointerup','pointerleave','pointercancel'].forEach(ev=>b.addEventListener(ev,off)); };
  hold('kL','L'); hold('kR','R');
  const atS=()=>Math.abs(P.x-(DMAP.stairs.x+DMAP.stairs.w/2))<40;
  const spot=()=>DMAP.floors[P.f].hide.find(h=>Math.abs(h-P.x)<30);
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
          if(r.kq==='ok'){ got=true; tone(520,.06,.03,'triangle'); say1('Xong. Về phòng ngủ: lầu hai, bên trái.'); }
          else if(r.kq==='on'){ P.sus=r.n>=1?1:Math.min(.95,P.sus+r.n); say1((r.m||'Có tiếng động.')+' Núp ngay!'); }
          else if(r.kq==='hong') say1(r.m||'Chưa được. Thử lại.'); else say1('Rút ra trước. Bấm Lấy để làm lại.'); }); } else if(got&&P.f===1&&P.x<430) finish('xong'); else say1(got?'Về phòng ngủ ở lầu hai, bên trái.':'Chưa tới chỗ. Chấm vàng là chỗ cần tới.'); return; }
    if(!lead){ const g=groups.find(g=>g.st==='cho'&&g.f===P.f&&Math.abs(g.x-P.x)<40); if(g&&g.after&&clock<g.after){ say1(g.ten+': "Tui đi sau cùng. Dẫn tụi nhỏ trước."'); return; }
      if(g){ if(g.can>0&&!g.thuyet){ g.thuyet=true; clock+=3; if(g.can>=2){ say1(g.ten+' không chịu đi. Mất 3 phút mà không nói được.'); g.st='o'; return; } say1('Mất 3 phút nói với '+g.ten+'. Đi.'); } g.st='theo'; lead=g; say1('Đang dẫn: '+g.ten+'. Ra lối xanh, nhớ núp.'); } else say1('Tới chỗ một người đang chờ rồi bấm Dẫn.'); return; }
    const e=exits.find(e=>e.f===P.f&&Math.abs(e.x-P.x)<45); if(e){ lead.st='ra'; out.push(lead); clock+=e.cost||0; say1(lead.ten+' đã ra tới '+e.ten+'.'+(e.cost?' Chờ ghe '+e.cost+' phút.':'')); lead=null; } else say1('Lối ra sông đánh dấu xanh.'); }
  function finish(kq){ if(over) return; over=true; removeEventListener('keydown',kd,true); removeEventListener('keyup',ku,true); p2close(); res({kq,out,lost,clock,groups}); }
  const ch=(k,px,f,face,o)=>{ const fy=DMAP.feet[f]; x.save(); x.translate(px,fy); x.scale(.62,.62); try{ drawChar(x,k,0,0,face,o); }catch(e){} x.restore(); };
  let last=performance.now();
  function loop(now){ if(over) return; if(paused){ last=now; requestAnimationFrame(loop); return; } const dt=Math.min(.05,(now-last)/1000); last=now; t+=dt; if(cuu) clock+=dt*(cfg.speed||1);
    const sp=(P.run?190:95)*(lead?.85:1); let mv=0; if(!P.hid){ if(K.L){ P.x=Math.max(20,P.x-sp*dt); P.face=-1; mv=1; } if(K.R){ P.x=Math.min(980,P.x+sp*dt); P.face=1; mv=1; } } if(mv) P.ph+=dt*(P.run?10:7);
    if(lead){ lead.f=P.f; lead.x+=(P.x-34*P.face-lead.x)*Math.min(1,dt*4); }
    const raid=cuu&&clock>=cfg.raid; let seen=false; if(raid&&!cfg.hoDone){ cfg.hoDone=1; say1('“Công an đây! Ngồi xuống hết!” · Đèn trại tắt phụt.'); tone(300,.6,.05,'sawtooth'); }
    G.forEach(g=>{ if(raid&&!g.chay){ g.chay=1; g.v*=1.6; } g.x+=g.v*g.d*dt; if(g.x>g.b){ g.x=g.b; g.d=-1; } if(g.x<g.a){ g.x=g.a; g.d=1; } g.ph=(g.ph||0)+dt*6;
      if(raid||g.f!==P.f||P.hid) return; const dx=(P.x-g.x)*g.d; const noise=P.run&&Math.abs(P.x-g.x)<130; if((dx>0&&dx<150+(cfg.siet?20:0))||noise) seen=true; });
    P.sus=seen?P.sus+dt*(P.run?2.4:1.6):Math.max(0,P.sus-dt*.7);
    if(P.sus>=1){ if(!cuu){ finish('bat'); return; } P.sus=0; clock+=20; if(lead){ lead.st='bat'; lost.push(lead); say1('Bị thấy! '+lead.ten+' bị lôi về. Mất 20 phút.'); lead=null; } else say1('Bị thấy! Phải núp trong kho 20 phút.'); P.hid=true; }
    if(!cuu){ if(t>(cfg.limit||110)){ finish(got?'xong_tre':'het'); return; } }
    else { if(cfg.xe&&clock>=cfg.xe&&!cfg.xeDone){ cfg.xeDone=1; groups.filter(g=>g.st==='cho').forEach(g=>{ g.st='xe'; lost.push(g); }); say1('Xe tới chở những người còn lại đi trước giờ.'); }
      if(clock>=cfg.end||groups.every(g=>g.st!=='cho'&&g.st!=='theo')){ finish('het'); return; } }
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
    if(!cuu&&!got){ const m=MUC[cfg.muc]; x.fillStyle='#f0b25c'; x.beginPath(); x.arc(m.x,Y(m.f)-150,9+Math.sin(t*5)*2,0,7); x.fill(); }
    if(!cuu&&got){ x.strokeStyle='#5fb37a'; x.lineWidth=3; x.strokeRect(45,DMAP.band[1][0],353,DMAP.band[1][1]); }
    if(cuu){ x.strokeStyle='rgba(170,190,215,.28)'; x.lineWidth=1.5; x.beginPath(); for(let i=0;i<90;i++){ const rx=(i*137+t*260*(1+i%3*.2))%1060-30, ry=(i*89+t*720)%640-20; x.moveTo(rx,ry); x.lineTo(rx-6,ry+22); } x.stroke(); }
    if(raid){ x.fillStyle='rgba(0,0,0,'+(.38+(Math.sin(t*23)>.86?.3:0))+')'; x.fillRect(0,0,1000,600); if(Math.sin(t*3.1)>0){ x.fillStyle='rgba(80,120,255,.08)'; x.fillRect(0,0,1000,600); } else { x.fillStyle='rgba(255,60,60,.07)'; x.fillRect(0,0,1000,600); } }
    exits.forEach(e=>{ x.fillStyle='#5fb37a'; x.fillRect(e.x-6,Y(e.f)-120,12,116); x.fillStyle='#bfe3c9'; x.fillText(e.ten,e.x-30,Y(e.f)-128); });
    groups.forEach(g=>{ if(['ra','bat','xe'].includes(g.st)) return; x.globalAlpha=g.st==='o'?.4:1; ch(g.sp||g.id,g.x,g.f,g.x<P.x?1:-1,{walk:g.st==='theo'&&!P.hid,ph:P.ph,t}); x.globalAlpha=1; x.fillStyle='#cfc8b8'; x.fillText(g.ten,g.x-14,Y(g.f)-118); });
    G.forEach(g=>{ if(!raid){ x.fillStyle='rgba(255,230,140,.14)'; x.beginPath(); x.moveTo(g.x,Y(g.f)-70); x.lineTo(g.x+g.d*170,Y(g.f)-110); x.lineTo(g.x+g.d*170,Y(g.f)); x.closePath(); x.fill(); } ch('seo',g.x,g.f,g.d,{walk:true,ph:g.ph,t}); });
    x.globalAlpha=P.hid?.45:1; ch(MEK,P.x,P.f,P.face,{walk:!!(K.L||K.R)&&!P.hid,ph:P.ph,t,crouch:P.hid}); x.globalAlpha=1;
    if(P.sus>0){ x.fillStyle='#e2645c'; x.fillRect(P.x-20,Y(P.f)-120,40*P.sus,5); }
    x.fillStyle='#efe8d8'; x.font='15px "IBM Plex Mono",monospace'; x.textAlign='center';
    if(cuu){ const hh=Math.floor(clock/60), mm=Math.floor(clock%60); x.fillText(hh+':'+String(mm).padStart(2,'0')+(raid?' · đã ập vào':cfg.raid<999?' · hẹn ập vào '+Math.floor(cfg.raid/60)+':'+String(cfg.raid%60).padStart(2,'0'):' · không ai ập vào')+'  ·  ra được '+out.length+'/'+groups.length,500,22); }
    else x.fillText('Trời sáng sau: '+Math.max(0,Math.ceil((cfg.limit||110)-t))+' giây',500,22);
    if(msgT>0&&msg){ x.font='16px "Be Vietnam Pro",sans-serif'; const w=x.measureText(msg).width+24; x.fillStyle='rgba(16,19,28,.92)'; x.fillRect(500-w/2,280,w,36); x.fillStyle='#efe8d8'; x.fillText(msg,500,304); }
    const tb=$('ktb'); if(tb) tb.style.width=(cuu?Math.min(100,clock/(cfg.end||300)*100):Math.min(100,t/(cfg.limit||110)*100))+'%';
    x.textAlign='left'; const a=atS(); $('kU').disabled=!a||P.f>=2; $('kD').disabled=!a||P.f<=0; $('kH').textContent=P.hid?'Ra':'Núp'; }
  window.__p2sneak={toi:()=>{ if(!cuu){ const m=MUC[cfg.muc]; P.f=m.f; P.x=m.x; act(); } },win:()=>{ if(cuu){ groups.forEach(g=>{ if(g.st==='cho'&&g.can<2){ g.st='ra'; out.push(g); } }); finish('het'); } else { got=true; finish('xong'); } },lose:()=>finish(cuu?'het':'bat')};
  say1(cuu?'Bấm Dẫn chỗ một người, đưa ra lối xanh. Cầu thang ở giữa.':'Chấm vàng là chỗ cần tới. Núp ở ô nâu khi đèn pin quét tới.');
  requestAnimationFrame(loop); }); }

/* đi đêm: chọn việc, chơi, chạy cảnh kết quả */
async function p2DiDem(){ const L=Object.keys(MUC).filter(k=>MUC[k].c()); if(!L.length) return;
  busy=true; const p=await choose([...L.map(k=>({ma:k,loi:MUC[k].ten,sub:MUC[k].why})),{ma:'_',loi:'Ngủ',sub:'mai còn ca sáng'}],false,(hasF('x_siet')?'Trại đang siết, tuần tra gấp đôi. ':'')+'Đi đêm?'); hideDlg(); busy=false;
  if(p.ma==='_') return; if(MUC[p.ma].thang){ await say('mota','','Lẻn qua hành lang lầu hai lúc mọi người ngủ say. Buồng tắm cuối dãy, vòi nước để chảy cho át tiếng.'); hideDlg(); await runS(MUC[p.ma].k); hideDlg(); return; } const r=await sneak({mode:'didem',muc:p.ma,siet:hasF('x_siet')&&S.day<=18,limit:hasF('x_siet')?90:110});
  if(r.kq==='bat'){ await runS('x_dd_bat'); effects('+nghi:20'); return; }
  if(r.kq==='het'){ await say('mota','','Trời hửng sáng. Phải quay về trước điểm danh, tay không.'); hideDlg(); return; }
  if(r.kq==='xong_tre'){ await say('mota','','Về tới phòng thì vừa kịp tiếng chuông. Mồ hôi ướt áo.'); effects('+nghi:5'); }
  await runS(MUC[p.ma].k); hideDlg(); }

/* ---------------- gọi trò chơi từ lời thoại ---------------- */
const P2GAMES={
  giaitin:async()=>{ const ok=await giaiMa('Sáng nay trời mưa quá chị ơi.\nÍt bữa nữa em mua dép mới.\nHôm qua tụi em được ăn thịt.\nAi cũng nhớ chị hết á.','SIHA','Tin của số lạ',null,'x2-tin-siha'); if(ok) setCo('x_siha'); },
  giaitin2:async()=>{ await giaiMa('Nhi còn đây.\nHuệ đau lưng hoài.\nÍt khi được ngủ.\nTí ốm.\nOanh đi rồi.\nAnh Toàn ổn.','NHITOA','Tin thứ hai',null,'x2-tin-nhi'); },
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
