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
.p2plan{position:relative;width:100%;aspect-ratio:16/10;background:#11151f;border-radius:12px;overflow:hidden}
.p2plan img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.55}
.p2plan .p2slot{position:absolute;background:rgba(16,19,28,.7)}
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
.dd2 .mg{position:absolute;inset:0;z-index:5;background:#05060a;border-radius:10px;display:flex;flex-direction:column;gap:6px;padding:0 0 6px}.dd2 .mg canvas{flex:0 1 auto;min-height:0}.dd2 .mg .mgt{margin:0;padding:0 8px;font-size:14px;color:#cfc8b8;text-align:center}.dd2 .mg .mgb{display:flex;gap:6px;justify-content:center;flex-wrap:wrap}.dd2 .mg button.ghost{background:transparent}
.dd2 button:disabled{opacity:.35}.dd2 button.on{background:#f0b25c;color:#1d1d1d}
.p2end{position:fixed;inset:0;z-index:9500;background:#07080d;color:#efe8d8;overflow:auto;padding:48px 16px}
.p2end .in{max-width:640px;margin:0 auto}
.p2end p.l{font-size:17px;line-height:1.8;margin:0 0 14px}
.p2end h2{font-size:42px;margin:28px 0 8px;color:#f0b25c}
.p2end .sum{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin:16px 0}
.p2end .sum div{background:#141824;border-radius:10px;padding:12px}.p2end .sum b{font-size:24px;display:block}.p2end .sum span{color:#9aa2b5;font-size:13px}
.p2end ol{color:#b9b3a6;line-height:1.7}.p2end .tag{color:#9aa2b5;font-size:13px;letter-spacing:.06em}
`;
(()=>{ const st=document.createElement('style'); st.textContent=P2CSS; document.head.appendChild(st); })();
const p2open=html=>{ hideDlg(); if(typeof phAuto!=='undefined'&&phAuto) closePhone(); const g=$('game'); g.hidden=false; $('gameBox').innerHTML='<div class="p2g">'+html+'</div>'; $('gameBox').scrollTop=0; return $('gameBox'); };
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
function giaiMa(tin,dapan,title,goi){ return new Promise(res=>{ const cau=tin.split('\n');
  const B=p2open('<h3>'+esc(title||'Giải tin')+'</h3><p class="tip">'+esc(goi||'Đọc chữ cái đầu của mỗi câu, bỏ dấu, ghép liền.')+'</p><div class="p2msg">'+cau.map(c=>'<span>'+esc(c)+'</span>').join('<br>')+'</div>'+
   '<input class="p2in" id="gm" autocomplete="off" aria-label="Chữ đọc được"><div class="row"><button class="btn" id="gmo" type="button">Đọc ra</button><button class="btn ghost" id="gmg" type="button">Tô chữ đầu</button></div><p class="tip" id="gmm" style="text-align:center"></p>');
  let thu=0;
  $('gmg').onclick=()=>{ B.querySelectorAll('.p2msg span').forEach(sp=>{ const t=sp.textContent; sp.innerHTML='<b style="color:#f0b25c;font-size:1.3em">'+esc(t[0])+'</b>'+esc(t.slice(1)); }); };
  const go=()=>{ const v=bo($('gm').value).toUpperCase().replace(/[^A-Z0-9]/g,''); thu++; if(v===dapan){ chime(); p2close(); res(true); } else if(thu>=3){ $('gmm').textContent='Đáp án: '+dapan; setTimeout(()=>{ p2close(); res(false); },1800); } else $('gmm').textContent='Chưa đúng. Thử lại.'; };
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
   '<div class="row"><button class="btn" id="gs" type="button">Gửi</button><button class="btn ghost" id="gde" type="button"></button><button class="btn ghost" id="gx" type="button">Để sau</button></div>');
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
function caNhan(so){ return new Promise(async res=>{ const out={chot:0,tinh:0,bo:0};
  for(let i=0;i<so;i++){ const k=KHACH[(S.day*5+i*3+(S.so||[]).length)%KHACH.length]; const L=[];
    const draw=extra=>{ p2open('<h3>Ca nhắn tin · '+esc(k.ten)+'</h3><p class="tip">'+esc(k.ho)+' · kịch bản: '+esc(k.kieu)+' · chỉ tiêu hôm nay '+CT()+'/3</p>'+L.join('')+(extra||'')); $('gameBox').scrollTop=1e5; };
    L.push('<div class="p2msg">'+esc(k.vao)+'</div>'); let loi=false, lanh=false;
    for(let t=0;t<k.luot.length&&!lanh;t++){ const R=k.luot[t]; if(t>0) L.push('<div class="p2msg">'+esc(R.k)+'</div>');
      const meo=hasF('x_meo_cailoi'); const dw=esc(R.d).replace(esc(R.w[0]),meo?'<span class="p2w" id="ww">'+esc(R.w[0])+'</span>':esc(R.w[0]));
      draw('<div class="p2opt"><small>Đúng kịch bản</small>'+dw+'<div class="row" style="justify-content:flex-start"><button class="btn" id="oD" type="button">Gửi tin này</button></div></div><div class="p2opt"><small>Tin lạnh · khách bỏ đi, thiếu chỉ tiêu</small>'+esc(R.l)+'<div class="row" style="justify-content:flex-start"><button class="btn ghost" id="oL" type="button">Gửi tin này</button></div></div>'+(meo?'<p class="tip">Chạm chữ gạch vàng để gõ sai một dấu, như Ngân từng dạy. Khách tinh ý sẽ khựng lại.</p>':''));
      let sai=false; const ww=$('ww'); if(ww) ww.onclick=()=>{ sai=!sai; ww.textContent=sai?R.w[1]:R.w[0]; ww.classList.toggle('loi',sai); };
      const pk=await new Promise(r=>{ $('oD').onclick=()=>r('d'); $('oL').onclick=()=>r('l'); });
      if(pk==='l'){ L.push('<div class="p2msg me">'+esc(R.l)+'</div>'); lanh=true; break; }
      if(sai) loi=true; L.push('<div class="p2msg me">'+esc(sai?R.d.replace(R.w[0],R.w[1]):R.d)+'</div>'); draw(); await sleep(450); }
    let kq; if(lanh){ kq='bo'; L.push('<div class="p2msg sys">'+esc(k.ten)+' đã rời cuộc trò chuyện.</div>'); }
    else if(loi){ kq='tinh'; L.push('<div class="p2msg">ủa sao chữ này viết kỳ vậy… thôi để hỏi con cái rồi tính</div><div class="p2msg sys">'+esc(k.ten)+' đã chặn bạn. Tiền còn nguyên.</div>'); }
    else { kq='chot'; L.push('<div class="p2msg">đã chuyển rồi nha</div><div class="p2msg sys">🔔 Chuông chốt đơn. '+esc(k.ten)+' vừa mất tiền.</div>'); (S.so=S.so||[]).push(k.ten+' · '+k.ho); ctAdd(1); }
    out[kq]++;
    if(loi&&Math.random()<.35){ if((S.tin.bay||0)>=3) L.push('<div class="p2msg sys">Chị Bảy đọc lướt tin của bạn, dừng ở chữ sai, rồi lướt qua.</div>'); else { L.push('<div class="p2msg sys">Chị Bảy đọc lướt tin của bạn, dừng ở chữ sai. Chị nhìn bạn một lúc lâu.</div>'); fx('+nghi:12'); } }
    draw('<div class="row"><button class="btn" id="oN" type="button">'+(i<so-1?'Khách kế':'Hết ca')+'</button></div>'); await new Promise(r=>$('oN').onclick=r); }
  p2close(); res(out); }); }
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
  let ok=0;
  for(let i=0;i<sets.length;i++){ const o=sets[i]; const prog=tu.split('').map((c,j)=>j<i?c:j===i?'['+c+']':'·').join(' ');
    const p=await choose(o.map((x,n)=>({ma:'g'+n,loi:x[0],timer:8,mac:-1})),false,'Chữ cần: '+prog+' · Chị Bảy đứng sau lưng');
    if(!p||p.ma==='_het'){ await say('mota','',ME+' im lặng một giây quá lâu. Người đứng sau lưng gõ nhẹ vào vai.'); fx('+nghi:6'); continue; }
    const pick=o[+p.ma.slice(1)]; await say('thoai',ME,pick[0]); if(pick[1]) ok++; else if(pick[2]){ fx('+nghi:8'); } }
  hideDlg();
  if(ok===sets.length){ setCo('x_goi_ok'); await say('nghi','','Nếu bên kia nghe ra, bên ngoài sẽ có chữ '+tu+'.'); }
  else await say('nghi','','Có câu lệch chữ. Chắc bên kia không đọc ra.'); hideDlg(); }

/* =====================================================================
   5. KÉO THẺ VÀO Ô (dùng cho sơ đồ, dòng tiền)
   ===================================================================== */
function dropGame(o){ /* o: {title,tip,html(slots markup),cards:[{id,t,lock}],check:map=>bool|'msg',hint} */ return new Promise(res=>{ const place={};
  const render=()=>{ const B=p2open('<h3>'+esc(o.title)+'</h3><p class="tip">'+esc(o.tip)+'</p>'+o.html+'<div class="p2tray" data-slot="tray" id="tray"></div><p class="tip" id="dgm" style="text-align:center;min-height:1.4em"></p><div class="row"><button class="btn" id="dgOk" type="button">Xong</button><button class="btn ghost" id="dgX" type="button">Để sau</button></div>');
    const cardH=c=>'<div class="p2card'+(c.lock?' lock':'')+'" data-card="'+c.id+'" title="'+(c.lock?'Chưa có manh mối này':'')+'">'+esc(c.lock?'???':c.t)+'</div>';
    B.querySelectorAll('[data-slot]').forEach(s=>{ if(s.id==='tray') return; const id=s.dataset.slot; const c=o.cards.find(c=>place[c.id]===id); s.innerHTML=c?cardH(c):esc(s.dataset.ph||''); });
    $('tray').innerHTML=o.cards.filter(c=>!place[c.id]).map(cardH).join('');
    dragKit(B,(card,slot)=>{ const id=card.dataset.card; if(!slot) return; const sid=slot.dataset.slot; if(sid==='tray'){ delete place[id]; render(); return; }
      for(const k in place) if(place[k]===sid) delete place[k]; place[id]=sid; tone(440,.05,.02,'triangle'); render(); });
    $('dgX').onclick=()=>{ p2close(); res(false); };
    $('dgOk').onclick=()=>{ const r=o.check(place); if(r===true){ chime(); p2close(); res(true); return; } tone(200,.2,.03,'sawtooth');
      B.querySelectorAll('[data-slot]').forEach(s=>{ if(s.id==='tray') return; const c=o.cards.find(c=>place[c.id]===s.dataset.slot); s.classList.toggle('ok',!!c&&c.ok===s.dataset.slot); s.classList.toggle('bad',!!c&&c.ok!==s.dataset.slot); });
      $('dgm').textContent=typeof r==='string'?r:'Chưa khớp. Ô đỏ là chỗ sai.'; }; };
  render(); }); }
function p2imgUrl(k){ return (typeof P2REAL!=='undefined'&&P2REAL[k])?'img2/'+k+'.webp':''; }
async function gSodo(){ const plan=p2imgUrl('x2-trai-matcat');
  const SL=[['mt','Lầu ba · bên phải',.55,.06,.4,.24],['kh','Lầu ba · bên trái',.05,.06,.4,.24],['ng','Lầu hai · dãy ngủ',.05,.38,.5,.24],['bt','Lầu hai · cuối hành lang',.62,.38,.33,.24],['pm','Trệt · bên trái',.05,.7,.45,.24],['be','Trệt · sát sau',.55,.7,.2,.24],['cs','Trệt · cuối',.78,.7,.17,.24]];
  const C=[{id:'pm',t:'Phòng máy',ok:'pm'},{id:'be',t:'Bếp',ok:'be'},{id:'cs',t:'Cửa sau ra sông',ok:'cs'},{id:'ng',t:'Phòng ngủ các tổ',ok:'ng'},{id:'bt',t:'Buồng tắm',ok:'bt'},{id:'mt',t:'Văn phòng quản lý',ok:'mt',lock:!hasF('x_sodo3')},{id:'kh',t:'Kho',ok:'kh',lock:!hasF('x_sodo3')},{id:'x',t:'Phòng giám đốc',ok:'-'}];
  const html='<div class="p2plan">'+(plan?'<img src="'+plan+'" alt="">':'')+SL.map(s=>'<div class="p2slot" data-slot="'+s[0]+'" data-ph="'+esc(s[1])+'" style="left:'+s[2]*100+'%;top:'+s[3]*100+'%;width:'+s[4]*100+'%;height:'+s[5]*100+'%"></div>').join('')+'</div>';
  const ok=await dropGame({title:'Sơ đồ trại',tip:'Kéo tên từng chỗ vào đúng ô trên sơ đồ ba tầng. Chỗ nào chưa biết thì bỏ trống (thẻ ??? là chưa có ai kể).',html,cards:C,
    check:p=>{ const need=C.filter(c=>!c.lock&&c.ok!=='-'); if(p.x) return 'Ở đây hổng có phòng giám đốc. Không ai được thấy mặt ông chủ.'; const bad=need.filter(c=>p[c.id]!==c.ok); return bad.length?'Còn '+bad.length+' chỗ sai hoặc chưa xếp.':true; }});
  if(ok){ setCo('x_sodo_ok'); toast('Sơ đồ xong'); } }
async function gDongTien(lan){ const A=lan===1;
  const html='<div class="p2chain"><span class="p2fixed">Tiền cọc của nạn nhân</span><span class="ar">→</span><div class="p2slot" data-slot="s1" data-ph="bước 1"></div><span class="ar">→</span><div class="p2slot" data-slot="s2" data-ph="bước 2"></div><span class="ar">→</span><div class="p2slot" data-slot="s3" data-ph="'+(A?'mỗi tối Chủ nhật':'người cầm tiền')+'"></div></div>';
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
  {ten:'Trệt',rooms:[{x:30,w:400,ten:'Phòng máy'},{x:560,w:180,ten:'Bếp'},{x:850,w:130,ten:'Cửa sau'}],hide:[120,300,620,700]},
  {ten:'Lầu 2',rooms:[{x:30,w:400,ten:'Phòng ngủ các tổ'},{x:560,w:120,ten:'Phòng Chị Bảy'},{x:720,w:200,ten:'Buồng tắm'}],hide:[90,260,400,780]},
  {ten:'Lầu 3',rooms:[{x:30,w:260,ten:'Kho'},{x:560,w:400,ten:'Văn phòng quản lý'}],hide:[150,620,880]}],stairs:{x:470,w:60}};
const MUC={
  may:{ten:'Lấy cái điện thoại dưới thùng nước',f:1,x:820,why:'Có máy mới gửi tin ra được.',c:()=>hasF('x_biet_may')&&!hasF('x_may'),k:'x_dd_may'},
  gapngan:{ten:'Gặp Ngân ở buồng tắm',f:1,x:840,why:'Nói chuyện riêng, ngoài tầm camera.',thang:1,c:()=>S.nhanh==='B'&&hasF('x_ngan_nghe')&&!hasF('x_ngan_b3')&&(S.tin.ngan||0)>=2,k:'x_nganb3'},
  thuy:{ten:'Gặp Thủy ở buồng tắm',f:1,x:840,why:'Thủy hẹn.',thang:1,c:()=>S.nhanh==='B'&&hasF('x_thuy_biet')&&!hasF('x_thuy_chi'),k:'x_thuygap'},
  tuan0:{ten:'Dò lính gác trệt',f:0,x:900,why:'Ghi giờ lính đi qua cửa sau.',c:()=>!hasF('x_tuan0'),k:'x_dd_tuan0'},
  tuan3:{ten:'Dò lính gác lầu ba',f:2,x:900,why:'Vẽ nốt phần sơ đồ còn thiếu.',c:()=>!hasF('x_tuan3'),k:'x_dd_tuan3'},
  kim:{ten:'Lấy cây kìm trên nóc tủ bếp',f:0,x:650,why:'Cắt được rào ra bờ sông.',c:()=>(hasF('x_biet_kim')||S.day>=12)&&!hasF('x_kim'),k:'x_dd_kim'},
  rao:{ten:'Cắt rào sau bếp',f:0,x:740,why:'Lối thứ hai ra sông.',c:()=>hasF('x_kim')&&!hasF('x_rao'),k:'x_dd_rao'},
  cua:{ten:'Mở khóa cửa sau',f:0,x:930,why:'Lối gần ghe nhất.',c:()=>hasF('x_chia')&&!hasF('x_cua'),k:'x_dd_cua'},
  nghe:{ten:'Nghe lén văn phòng lầu ba',f:2,x:600,why:'Tin thoại của Ông Chủ Lò.',c:()=>S.day>=12&&!hasF('x_nghe_len'),k:'x_dd_nghe'}};
/* =====================================================================
   10b. TRÒ NHỎ KHI TỚI CHỖ — mỗi việc đi đêm một kiểu
   ===================================================================== */
const MGIMG={may:'x2-mg-thung',tuan0:'x2-mg-khe',tuan3:'x2-mg-khe',kim:'x2-mg-tu',rao:'x2-mg-rao',cua:'x2-mg-cua',nghe:'x2-mg-cuavp'};
const mgT=(x,s,px,py,o)=>{ o=o||{}; x.font=(o.b?'600 ':'')+Math.round((o.s||18)*1.6)+'px "Be Vietnam Pro",sans-serif'; x.fillStyle=o.c||'#efe8d8'; x.textAlign=o.a||'center'; x.fillText(s,px,py); x.textAlign='left'; };
const mgBar=(x,px,py,w,v,c,lab)=>{ x.fillStyle='rgba(255,255,255,.1)'; x.fillRect(px,py,w,16); x.fillStyle=c; x.fillRect(px,py,w*Math.max(0,Math.min(1,v)),16); if(lab) mgT(x,lab,px,py-8,{s:14,a:'left',c:'#9aa2b5'}); };
const MINI={
  /* 1. mò điện thoại dưới đáy thùng nước rồi gỡ băng keo */
  may(x,u){ let ph='mo', noise=0, tens=0, prog=0, pull=0; const P={x:220+Math.random()*560,y:240+Math.random()*200}; const rip=[]; let hint='Thò tay xuống nước. Bấm chỗ muốn mò.';
    u.tip('Mò dưới đáy thùng. Bọt càng nhiều là càng gần. Mò nhiều quá nước sẽ óc ách.');
    u.cv.onpointerdown=e=>{ if(ph!=='mo') return; const p=u.pt(e); if(p.y<150||p.y>520) return; const d=Math.hypot(p.x-P.x,p.y-P.y); rip.push({x:p.x,y:p.y,r:4,b:Math.max(0,1-d/380)});
      tone(240+Math.random()*80,.12,.02,'sine'); noise+=.11;
      if(d<70){ ph='keo'; tone(640,.08,.03,'triangle'); u.tip('Đụng rồi: cái máy dán băng keo. Giữ nút Kéo để gỡ, buông ra khi thanh căng lên đỏ.'); b.hidden=false; return; }
      hint=d<160?'Có gì cứng cứng ngay đây.':d<300?'Lạnh tay. Hình như gần rồi.':'Chỉ có rong rêu.';
      if(noise>=1) u.end({kq:'on',n:.55,m:'Nước óc ách. Có ai trở mình.'}); };
    const b=u.btn('Kéo',v=>pull=v,true); b.hidden=true;
    return dt=>{ x.fillStyle='#07090c'; x.fillRect(0,0,1000,600); x.fillStyle='#0d1820'; x.beginPath(); x.ellipse(500,340,330,200,0,0,7); x.fill(); x.strokeStyle='#3a4a52'; x.lineWidth=6; x.stroke();
      rip.forEach(r=>{ r.r+=dt*60; x.strokeStyle='rgba(160,200,220,'+Math.max(0,.6-r.r/140)+')'; x.lineWidth=2; x.beginPath(); x.arc(r.x,r.y,r.r,0,7); x.stroke(); for(let i=0;i<r.b*8;i++){ x.fillStyle='rgba(200,230,240,.5)'; x.beginPath(); x.arc(r.x+Math.sin(i*2.3)*r.b*30,r.y-r.r*.6-i*6,2+r.b*3,0,7); x.fill(); } });
      if(ph==='mo'){ mgT(x,hint,500,580,{c:'#cfd8dc'}); mgBar(x,40,40,200,noise,'#e2645c','Tiếng nước'); return; }
      if(pull){ prog+=dt*.3; tens+=dt*.95; } else tens=Math.max(0,tens-dt*1.3);
      if(tens>=1){ noise+=.4; tens=0; prog=Math.max(0,prog-.15); tone(180,.25,.04,'sawtooth'); u.say('Rẹt! Băng keo giật, nước văng ra ngoài.'); if(noise>=1){ u.end({kq:'on',n:.6,m:'Nước văng tung tóe. Có tiếng người hỏi vọng ra.'}); return; } }
      x.fillStyle='#22272e'; x.fillRect(420,280,160,90); x.fillStyle='rgba(220,210,170,'+(1-prog)+')'; x.fillRect(400,310,200*(1-prog)+0,26);
      mgBar(x,40,40,200,noise,'#e2645c','Tiếng nước'); mgBar(x,380,470,240,tens,tens>.75?'#e2645c':'#f0b25c','Độ căng'); mgBar(x,380,520,240,prog,'#5fb37a','Băng keo đã gỡ');
      if(prog>=1){ chime(); u.end({kq:'ok'}); } }; },

  /* 2. nằm sau khe cửa ghi giờ lính đi ngang */
  tuan(x,u,f3){ const PASS=[3,9,15,21,27,30], up=30; let clk=0, rec=[], bad=0, q=false; const sp=.8;
    u.tip('Nhìn qua khe cửa. Mỗi lần lính đi ngang khe, bấm Ghi. Ghi lộn quá ba lần là phải làm lại.');
    const vis=()=>PASS.findIndex(p=>clk>=p&&clk<p+2.4);
    u.btn('Ghi',()=>{ if(q) return; const i=vis(); if(i>=0&&!rec.includes(i)){ rec.push(i); tone(880,.05,.02,'triangle'); } else { bad++; tone(200,.08,.02); if(bad>=3) u.end({kq:'hong',m:'Ghi lộn xộn quá, hổng tin được. Mai làm lại.'}); } });
    const ask=()=>{ q=true; u.clear(); u.tip('Ghi được '+rec.length+'/'+PASS.length+' lần. Lúc nào cầu thang trống?');
      if(rec.length<4){ u.end({kq:'hong',m:'Ghi sót nhiều quá. Mai nằm lại.'}); return; }
      [['2:45',0],['3:00',1],['3:06',0]].forEach(([s,ok])=>u.btn(s,()=>u.end(ok?{kq:'ok'}:{kq:'hong',m:'Sai giờ. Coi lại tờ ghi chép.'}))); };
    return dt=>{ if(!q){ clk+=dt/sp; if(clk>=40) ask(); }
      x.fillStyle='#07080c'; x.fillRect(0,0,1000,600); x.fillStyle='#1c2230'; x.fillRect(440,40,120,520);
      const i=vis(); if(i>=0&&!q){ const p=(clk-PASS[i])/2.4; const gx=440+120*(i===5?1-p:p); x.save(); x.translate(gx,520); x.scale(.9,.9); try{ drawChar(x,'seo',0,0,i===5?-1:1,{walk:true,ph:clk*8,t:clk}); }catch(e){} x.restore(); x.fillStyle='rgba(255,230,140,.2)'; x.fillRect(440,300,120,200); }
      x.fillStyle='#07080c'; x.fillRect(0,0,440,600); x.fillRect(560,0,440,600);
      const m=30+Math.floor(clk), hh=m>=60?3:2, mm=m%60; mgT(x,hh+':'+String(mm).padStart(2,'0'),220,80,{s:40,c:'#f0b25c'});
      mgT(x,(f3?'Lầu ba':'Trệt')+' · khe cửa',220,120,{s:14,c:'#9aa2b5'});
      x.font='24px "IBM Plex Mono",monospace'; x.fillStyle='#cfc8b8'; rec.slice().sort((a,b)=>a-b).forEach((r,j)=>{ const tm=30+PASS[r]; x.fillText((tm>=60?'3:':'2:')+String(tm%60).padStart(2,'0')+(r===5?'  lên lầu':'  đi ngang'),610,90+j*38); });
      mgT(x,'Ghi lộn: '+bad+'/3',780,560,{s:14,c:'#9aa2b5'}); }; },

  /* 3. chồng thùng nhựa, giữ thăng bằng, với lên nóc tủ */
  kim(x,u){ let ph='chong', n=0, off=0, a=0, av=0, r=0, L=0, R=0, sw=0;
    u.tip('Bấm Đặt khi thùng ở ngay giữa. Chồng lệch thì lúc leo lên dễ đổ.');
    const bD=u.btn('Đặt',()=>{ if(ph!=='chong') return; const o=Math.sin(sw)*220; off+=Math.abs(o); n++; tone(300,.08,.03,'square'); if(n>=3){ ph='leo'; a=(Math.random()<.5?-1:1)*Math.min(.45,off/500); bD.hidden=true; bL.hidden=bR.hidden=false; u.tip('Leo lên. Giữ ◀ ▶ cho chồng thùng đứng thẳng, tay sẽ tự với lên nóc tủ.'); } });
    const bL=u.btn('◀',v=>L=v,true), bR=u.btn('▶',v=>R=v,true); bL.hidden=bR.hidden=true;
    return dt=>{ x.fillStyle='#14110d'; x.fillRect(0,0,1000,600); x.fillStyle='#3a2f24'; x.fillRect(640,60,300,520); x.fillStyle='#4a3c2d'; x.fillRect(630,50,320,18);
      if(ph==='chong'){ sw+=dt*2.6; for(let i=0;i<n;i++){ x.fillStyle='#2f5f8a'; x.fillRect(420,520-i*80,160,76); } x.fillStyle='#3b78ad'; x.fillRect(420+Math.sin(sw)*220,140,160,76); x.strokeStyle='rgba(240,178,92,.4)'; x.strokeRect(420,130,160,96); return; }
      av+=(a*2.2+(Math.random()-.5)*1.4+(L?-2.6:0)+(R?2.6:0))*dt; av*=.985; a+=av*dt;
      if(Math.abs(a)<.3) r+=dt/6;
      if(Math.abs(a)>1){ tone(120,.5,.06,'sawtooth'); u.end({kq:'on',n:.9,m:'Rầm! Chồng thùng đổ. Cả bếp dội tiếng.'}); return; }
      x.save(); x.translate(500,596); x.rotate(a*.5); for(let i=0;i<3;i++){ x.fillStyle='#2f5f8a'; x.fillRect(-80,-76-i*80,160,76); } x.restore();
      x.save(); x.translate(500+Math.sin(a*.5)*240,596-240-Math.cos(a*.5)*240+240); x.rotate(a*.5); x.fillStyle='#cfc8b8'; x.fillRect(-14,-140,28,140); x.strokeStyle='#cfc8b8'; x.lineWidth=10; x.beginPath(); x.moveTo(0,-120); x.lineTo(80+r*90,-150-r*60); x.stroke(); x.restore();
      x.fillStyle='#8b93a9'; x.fillRect(830,30,60,16);
      mgBar(x,40,40,240,Math.abs(a),Math.abs(a)>.6?'#e2645c':'#f0b25c','Nghiêng'); mgBar(x,40,90,240,r,'#5fb37a','Với tới kìm');
      if(r>=1){ chime(); u.end({kq:'ok'}); } }; },

  /* 4. cắt rào giữa hai lượt đèn pha */
  rao(x,u){ let w=0, cut=0, hold=0, bx=-300, bd=1;
    u.tip('Giữ Bóp kìm để cắt từng sợi. Đèn pha quét tới mà đang bóp là bị thấy. Buông ra kịp thì không sao.');
    u.btn('Bóp kìm',v=>hold=v,true);
    return dt=>{ bx+=bd*dt*330; if(bx>1300){ bd=-1; } if(bx<-300){ bd=1; }
      x.fillStyle='#090b10'; x.fillRect(0,0,1000,600);
      x.strokeStyle='#4a5260'; x.lineWidth=2; for(let i=0;i<1000;i+=40){ x.beginPath(); x.moveTo(i,80); x.lineTo(i+200,520); x.stroke(); x.beginPath(); x.moveTo(i+200,80); x.lineTo(i,520); x.stroke(); }
      for(let i=0;i<5;i++){ const y=140+i*80; x.strokeStyle=i<w?'rgba(120,130,140,.3)':'#9aa2b5'; x.lineWidth=4; x.beginPath(); x.moveTo(0,y); x.lineTo(i<w?470:1000,y); x.stroke(); if(i<w){ x.beginPath(); x.moveTo(530,y); x.lineTo(1000,y); x.stroke(); } }
      const g=x.createRadialGradient(bx,300,10,bx,300,220); g.addColorStop(0,'rgba(255,240,190,.55)'); g.addColorStop(1,'rgba(255,240,190,0)'); x.fillStyle=g; x.fillRect(bx-230,0,460,600);
      const lit=Math.abs(bx-500)<210;
      if(hold&&w<5){ if(lit){ tone(150,.4,.05,'sawtooth'); u.end({kq:'on',n:1,m:'Đèn pha rọi trúng. Có tiếng còi.'}); return; } cut+=dt/.9; } else cut=Math.max(0,cut-dt*1.5);
      if(cut>=1){ cut=0; w++; tone(1400,.05,.03,'square'); }
      x.fillStyle='#e8e2d4'; x.beginPath(); x.arc(500,140+Math.min(w,4)*80,10,0,7); x.fill();
      mgBar(x,40,40,240,cut,'#f0b25c','Đang bóp'); mgT(x,'Đã cắt '+w+'/5 sợi',860,52,{s:16});
      if(lit) mgT(x,'Đèn tới!',500,580,{c:'#e2645c',b:1});
      if(w>=5){ chime(); u.end({kq:'ok'}); } }; },

  /* 5. chùm chìa: so răng với ổ khóa, rồi xoay chậm */
  cua(x,u){ const T=[0,1,2,3,4].map(()=>1+Math.floor(Math.random()*4)); const keys=[T.slice()];
    while(keys.length<5){ const k=T.slice(); const i=Math.floor(Math.random()*5), j=(i+1+Math.floor(Math.random()*4))%5; k[i]=1+(k[i]%4); if(Math.random()<.6) k[j]=1+(k[j]%4); if(!keys.some(z=>z.join()===k.join())) keys.push(k); }
    keys.sort(()=>Math.random()-.5); let sel=-1, bad=0, turn=0, tv=0, ph='chon';
    u.tip('Chạm một cây chìa để so với ổ khóa (bóng mờ phía trên). Khớp thì bấm Tra vô. Tra sai là kêu lạch cạch.');
    u.cv.onpointerdown=e=>{ if(ph!=='chon') return; const p=u.pt(e); if(p.y>400) { const i=Math.floor((p.x-50)/180); if(i>=0&&i<5){ sel=i; blip(); } } };
    const bT=u.btn('Tra vô',()=>{ if(sel<0||ph!=='chon') return; if(keys[sel].join()===T.join()){ ph='xoay'; tone(500,.06,.03,'triangle'); bT.hidden=true; bX.hidden=false; u.tip('Vô rồi. Giữ Xoay thật chậm, xoay nhanh là chốt bật cái cạch.'); } else { bad++; tone(220,.12,.04,'square'); tone(260,.1,.04,'square',.12); u.say('Lạch cạch. Không vô.'); if(bad>=3) u.end({kq:'on',n:.6,m:'Lạch cạch to quá. Đèn lầu hai bật.'}); } });
    const bX=u.btn('Xoay',v=>tv=v,true); bX.hidden=true;
    const prof=(k,px,py,s,c)=>{ x.fillStyle=c; x.beginPath(); x.moveTo(px,py); k.forEach((h,i)=>{ x.lineTo(px+i*s+s*.2,py); x.lineTo(px+i*s+s*.35,py+h*s*.32); x.lineTo(px+i*s+s*.65,py+h*s*.32); x.lineTo(px+i*s+s*.8,py); }); x.lineTo(px+5*s,py); x.lineTo(px+5*s,py-s*.4); x.lineTo(px,py-s*.4); x.closePath(); x.fill(); };
    return dt=>{ x.fillStyle='#101218'; x.fillRect(0,0,1000,600); x.fillStyle='#2a2e38'; x.fillRect(280,60,440,260); x.fillStyle='#8a7a52'; x.beginPath(); x.arc(500,190,90,0,7); x.fill();
      prof(T,380,170,48,'rgba(255,255,255,.18)'); if(sel>=0) prof(keys[sel],380,170,48,'rgba(240,178,92,.55)');
      keys.forEach((k,i)=>{ x.fillStyle=i===sel?'#3a3424':'#1c2028'; x.fillRect(60+i*180,420,160,140); prof(k,76+i*180,486,27,'#c9b98a'); x.fillStyle='#c9b98a'; x.beginPath(); x.arc(70+i*180,478,12,0,7); x.fill(); });
      mgT(x,'Lạch cạch: '+bad+'/3',860,40,{s:14,c:'#9aa2b5'});
      if(ph==='xoay'){ if(tv) turn+=dt*.55; mgBar(x,380,350,240,turn,'#5fb37a','Xoay'); if(turn>=1){ chime(); u.end({kq:'ok'}); } } }; },

  /* 6. áp tai nghe lén khi lính đang lên cầu thang */
  nghe(x,u){ let ear=.2, h=0, d=1, step=0, drag=false; const L=['…tổ con mèo tháng này đủ chưa…','…thằng Tú nó ngu, để má lo…','…tin để lâu là thiu…'];
    u.tip('Rê ngón tay dọc cánh cửa tìm chỗ nghe rõ. Tiếng dép lên tới nơi là phải rút. Nghe đủ hai câu thì bấm Rút.');
    const mv=e=>{ const p=u.pt(e); ear=Math.max(0,Math.min(1,(p.y-80)/440)); };
    u.cv.onpointerdown=e=>{ drag=true; mv(e); }; u.cv.onpointermove=e=>{ if(drag||e.pointerType==='mouse') mv(e); }; u.cv.onpointerup=()=>drag=false;
    u.btn('Rút',()=>u.end(h>=2/3?{kq:'ok'}:{kq:'hong',m:'Nghe chưa ra gì. Lính lên rồi, để đêm khác.'}));
    return (dt,t)=>{ const s=.5+Math.sin(t*.35)*.32; const cl=Math.max(0,1-Math.abs(ear-s)/.13); h=Math.min(1,h+cl*dt/8); d-=dt/24; step+=dt;
      if(step>Math.max(.35,d*1.4)){ step=0; tone(90,.07,.02+.05*(1-d),'triangle'); }
      if(d<=0){ u.end({kq:'on',n:1,m:'Lính đứng ngay đầu cầu thang.'}); return; }
      x.fillStyle='#0c0d12'; x.fillRect(0,0,1000,600); x.fillStyle='#4a3a28'; x.fillRect(260,40,280,540); 
      x.fillStyle='rgba(255,220,150,'+(.05+cl*.25)+')'; x.fillRect(260,80+ear*440-20,280,40); x.fillStyle='#e8d8b8'; x.beginPath(); x.ellipse(400,80+ear*440,22,30,0,0,7); x.fill();
      const n=Math.floor(h*3+.001); L.forEach((l,i)=>{ const v=i<n?l:(i===n?l.split('').map((c,j)=>j/l.length<(h*3-n)?c:(c===' '?' ':'·')).join(''):''); mgT(x,v,780,250+i*60,{s:13,c:i<n?'#efe8d8':'#9aa2b5'}); });
      mgBar(x,600,60,360,cl,'#5fb37a','Nghe rõ'); mgBar(x,600,130,360,1-d,'#e2645c','Tiếng dép trên cầu thang'); mgBar(x,600,540,360,h,'#f0b25c','Đã nghe'); }; }
};
MINI.tuan0=(x,u)=>MINI.tuan(x,u,false); MINI.tuan3=(x,u)=>MINI.tuan(x,u,true);
function miniDem(host,muc){ return new Promise(res=>{ const box=document.createElement('div'); box.className='mg';
  box.innerHTML='<canvas width="1000" height="600"></canvas><p class="mgt"></p><div class="mgb"></div>'; host.appendChild(box);
  const cv=box.querySelector('canvas'), x=cv.getContext('2d'), tip=box.querySelector('.mgt'), bar=box.querySelector('.mgb');
  let bg=null; const k=MGIMG[muc]; if(k){ const i=new Image(); i.onload=()=>bg=i; i.src='img2/'+k+'.webp'; }
  let over=false, raf, t=0, last=performance.now(), msg='', msgT=0;
  const end=r=>{ if(over) return; over=true; cancelAnimationFrame(raf); box.remove(); window.__p2mini=null; res(r); };
  const btn=(lab,fn,hold)=>{ const b=document.createElement('button'); b.type='button'; b.textContent=lab;
    if(hold){ b.addEventListener('pointerdown',e=>{ e.preventDefault(); fn(1); }); ['pointerup','pointerleave','pointercancel'].forEach(ev=>b.addEventListener(ev,()=>fn(0))); }
    else b.onclick=fn; bar.insertBefore(b,bar.lastChild&&bar.lastChild.dataset.bo?bar.lastChild:null); return b; };
  const pt=e=>{ const r=cv.getBoundingClientRect(); return {x:(e.clientX-r.left)*1000/r.width,y:(e.clientY-r.top)*600/r.height}; };
  const U={btn,end,cv,pt,tip:s=>tip.textContent=s,say:s=>{ msg=s; msgT=2.2; },clear:()=>{ [...bar.children].forEach(c=>{ if(!c.dataset.bo) c.remove(); }); }};
  const bo=document.createElement('button'); bo.type='button'; bo.textContent='Rút về'; bo.dataset.bo=1; bo.className='ghost'; bo.onclick=()=>end({kq:'bo'}); bar.appendChild(bo);
  const G=MINI[muc](x,U);
  const loop=now=>{ if(over) return; const dt=Math.min(.05,(now-last)/1000); last=now; t+=dt;
    x.clearRect(0,0,1000,600); G(dt,t); if(over) return; if(bg){ x.globalCompositeOperation='overlay'; x.globalAlpha=.55; x.drawImage(bg,0,0,1000,600); x.globalAlpha=1; x.globalCompositeOperation='source-over'; }
    if(msgT>0){ msgT-=dt; x.font='16px "Be Vietnam Pro",sans-serif'; const w=x.measureText(msg).width+24; x.fillStyle='rgba(16,19,28,.92)'; x.fillRect(500-w/2,262,w,36); mgT(x,msg,500,286,{s:16}); }
    raf=requestAnimationFrame(loop); };
  raf=requestAnimationFrame(loop);
  window.__p2mini={win:()=>end({kq:'ok'}),lose:()=>end({kq:'on',n:1,m:'(thử thua)'})}; }); }

function guards(siet,rescue){ const g=[{f:0,a:60,b:960,v:70,x:500,d:1},{f:1,a:40,b:940,v:60,x:720,d:1},{f:2,a:40,b:960,v:55,x:800,d:1}];
  if(siet||rescue) g.push({f:1,a:500,b:960,v:80,x:900,d:-1}); if(rescue) g.push({f:0,a:20,b:200,v:30,x:60,d:1}); return g; }
function sneak(cfg){ return new Promise(res=>{ hideDlg(); const cuu=cfg.mode==='cuu';
  p2open('<h3>'+esc(cuu?'Đêm mưa · dẫn người ra sông':'Đi đêm · '+MUC[cfg.muc].ten)+'</h3><div class="dd2"><canvas id="dc" width="1000" height="600"></canvas><div class="ctl"><div class="g"><button id="kL" type="button" aria-label="Sang trái">◀</button><button id="kR" type="button" aria-label="Sang phải">▶</button></div><div class="g"><button id="kU" type="button">▲ Lên</button><button id="kD" type="button">▼ Xuống</button><button id="kH" type="button">Núp</button><button id="kA" type="button">'+(cuu?'Dẫn':'Lấy')+'</button><button id="kS" type="button">Chạy</button></div></div></div>');
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
  const ch=(k,px,f,face,o)=>{ const fy=600-f*200-18; x.save(); x.translate(px,fy); x.scale(.62,.62); try{ drawChar(x,k,0,0,face,o); }catch(e){} x.restore(); };
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
    if(bgi&&bgi.complete&&bgi.naturalWidth){ x.globalAlpha=.6; x.drawImage(bgi,0,0,1000,600); x.globalAlpha=1; }
    for(let f=0;f<3;f++){ const y0=600-(f+1)*200; const fl=DMAP.floors[f]; x.fillStyle=f===P.f?'rgba(40,46,66,.55)':'rgba(16,19,28,.6)'; x.fillRect(0,y0,1000,196);
      x.fillStyle='rgba(255,255,255,.05)'; fl.rooms.forEach(r=>x.fillRect(r.x,y0+8,r.w,180)); x.fillStyle='#8b93a9'; x.font='14px "Be Vietnam Pro",sans-serif'; fl.rooms.forEach(r=>x.fillText(r.ten,r.x+8,y0+26)); x.fillText(fl.ten,935,y0+26);
      fl.hide.forEach(h=>{ x.fillStyle='rgba(120,90,50,.55)'; x.fillRect(h-14,y0+110,28,78); });
      x.fillStyle='rgba(240,178,92,.14)'; x.fillRect(DMAP.stairs.x,y0,DMAP.stairs.w,196); }
    const Y=f=>600-f*200-18;
    if(!cuu&&!got){ const m=MUC[cfg.muc]; x.fillStyle='#f0b25c'; x.beginPath(); x.arc(m.x,Y(m.f)-150,9+Math.sin(t*5)*2,0,7); x.fill(); }
    if(!cuu&&got){ x.strokeStyle='#5fb37a'; x.lineWidth=3; x.strokeRect(30,208,400,180); }
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
  giaitin:async()=>{ const ok=await giaiMa('Sáng nay trời mưa quá chị ơi.\nÍt bữa nữa em mua dép mới.\nHôm qua tụi em được ăn thịt.\nAi cũng nhớ chị hết á.','SIHA','Tin của số lạ'); if(ok) setCo('x_siha'); },
  giaitin2:async()=>{ await giaiMa('Nhi còn đây.\nHuệ đau lưng hoài.\nÍt khi được ngủ.\nTí ốm.\nOanh đi rồi.\nAnh Toàn ổn.','NHITOA','Tin thứ hai'); },
  tinvao:async()=>{ const ok=await giaiMa('Ông bà mình dạy ở hiền gặp lành.\nKhuyến mãi tháng này giảm 30%.','OK','Tin rác','Đọc chữ đầu mỗi câu.'); if(ok){ effects('-lo:5'); await runS('x_tinvao_ok'); } },
  giauchu:async()=>{ const r=await giauChu('SONG','Bin đóng vai quản lý, đọc lướt.'); if(r&&r.dung&&!r.vung) setCo('x_tap_ok'); },
  gui:async()=>{ const w=nextWord(); if(!w) return; const r=await giauChu(w,S.mon==='sim'&&hasF('x_giu')?'Gửi bằng SIM riêng, quản lý ít đọc.':'Quản lý đọc lướt mọi tin gửi ra.');
    if(!r) return; if(!r.dung){ await say('nghi','','Ghép không ra chữ. Bên ngoài sẽ chỉ thấy một tin hỏi thăm bình thường.'); hideDlg(); return; }
    if(r.vung&&!(S.mon==='sim'&&hasF('x_giu'))) effects('+nghi:10 +lo:5');
    setCo(w==='SONG'?'x_tin_song':'x_tin_3g'); setCo('x_cho_xn'); await say('nghi','','Đã gửi. Giờ chờ tin rác trả lời.'); hideDlg(); },
  goive:goiVe, ca:async()=>{}, sodo:gSodo, ghepgiay:gGhep, lichtuan:gLich, nghetieng:gNghe, danhsach:gDanhSach,
  dongtien1:()=>gDongTien(1), dongtien:()=>gDongTien(2)};
const doGame1=doGame;
doGame=async function(){ const g=pendingGame; if(P2.on&&P2GAMES[g]){ pendingGame=null; hideDlg(); if(phAuto) closePhone(); await P2GAMES[g](); return; } return doGame1(); };
