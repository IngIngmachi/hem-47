/* Hẻm 47 · Phần 2 — thiết bị: Za Lô ở Hồi 1, máy giấu trong trại, máy trạm phòng máy.
   Lời trong file này là BẢN NHÁP chờ tác giả duyệt (xem Excel thiết bị). */
'use strict';
/* ---------- 1. ZA LÔ HỒI 1 ---------- */
/* '#Tên' = người đó nhắn · '#> Tên' = mình nhắn cho người đó · '@Tên' = nhắn trong nhóm hẻm */
X('z_a_hem','Za Lô · nhóm hẻm',[
 ['@Diễm Nail','ủa con Ngân về rồi hả mấy bà, sáng nay tui thấy ngồi trước tạp hóa'],
 ['@Hạnh Bánh Mì','về rồi thì để yên cho nó thở đi mấy bà, chuyện cũ nhắc hoài'],
 ['@Bà Sáu','Đứa nào nói ra nói vô con nhỏ là bà cạo đầu. Bà Sáu đây.'],
 ['~','Cả nhóm im re. Không ai thả tim, cũng không ai rời nhóm.']]);
X('z_a_huong','Za Lô · Ngân nhắn',[
 ['#Ngân','bữa nay ngày chẵn, tới lượt anh'],
 ['#Ngân','đi gặp chị Hương đi. chỉ còn giữ hồ sơ vụ Ba Vẹt, có khi biết tụi nó dời đi đâu'],
 ['#> Ngân','Tôi đi liền. Có gì tôi nhắn.']]);
X('z_a_vi','Za Lô · Hương nhắn',[
 ['#Hương','mấy giao dịch tiền cọc trong nhóm nạn nhân cũ tôi lọc ra chuyển qua ông rồi đó'],
 ['#Hương','dò ngược từ mấy lệnh tối Chủ nhật mà lên. đừng ngồi đọc bình luận nữa'],
 ['~','Mở laptop là dò được.']]);
X('z_vinh','Za Lô · đại úy Vinh',[
 ['#Đại úy Vinh','Nhắc lại: vị trí giữ người, số người, giờ trống. Đủ 3 thứ tôi mới đề nghị phía bạn phối hợp được.'],
 ['#Đại úy Vinh','Đừng nhắn tên tôi trong bất kỳ tin nào gửi ra.']]);
X('z_a_thoa','Za Lô · mẹ nhắn',[
 ['#Cô Thoa','tối về ăn cơm nghen con. mẹ có chuyện muốn nói'],
 ['~','Mẹ ít khi nhắn tin. Mẹ gọi thẳng, hoặc không nói gì hết.']]);
X('z_thoai','Za Lô · Bin nhắn',[
 ['#Bin','anh ơi anh Lộc nói ảnh có ông chú đồng hương làm nghề chài lưới ở khúc sông sát biên'],
 ['#Bin','tên chú Thoại. hồi trước con trai chú cũng bị lừa qua bển rồi mất lúc bơi qua sông, nên nghe đi cứu người mình là chú giúp liền, chỉ cần phụ chú tiền mướn máy lớn với mua dầu chạy đêm thôi'],
 ['#> Bin','Cảm ơn em. Đừng kể ai nghe nha.'],
 ['#Bin','em có kể ai đâu 🤐']]);
X('z_gom','Za Lô · nhóm hẻm',[
 ['@Bà Sáu','Thằng ở phòng 3 nhà bà sắp đi làm một chuyện lớn. Cần tiền.'],
 ['@Bà Sáu','Nhà nào dư thì góp, không dư thì thôi. Bà không ép ai.'],
 ['@Tám Hớt Tóc','chuyện gì mà lớn dữ bà Sáu'],
 ['@Bà Sáu','Chuyện cứu người. Hỏi nữa bà cũng không nói.']]);
X('z_a_chot','Za Lô · Ngân nhắn',[
 ['#Ngân','11h tối nay qua phòng 3. Chốt ai vô.'],
 ['#Ngân','đừng có đi ngang tạp hóa, mẹ tui còn thức']]);
X('z_b_bin','Za Lô · Bin nhắn',[
 ['#Bin','anh Lâm, bà Sáu nói anh tính đi kiếm chị Ngân hả'],
 ['#Bin','cần chạy đâu em chở, khỏi tiền xăng'],
 ['#> Bin','Để anh coi đã. Đừng nói bà Sáu là anh nhắn em.']]);
X('z_b_huong','Za Lô · nhắn Hương',[
 ['#> Hương','Chị cho tôi gặp 15 phút. Chuyện khu trại bên kia biên giới.'],
 ['~','Tin đã xem. Nửa tiếng không trả lời.'],
 ['#Hương','8 giờ, Thảo Điên. trễ là tôi về']]);
X('z_b_vinh','Za Lô · Hương nhắn',[
 ['#Hương','muốn làm thiệt thì ra công an phường gặp đại úy Vinh. ổng bên hình sự thành phố, đang làm ở phường'],
 ['#Hương','tôi gọi trước cho ổng rồi. ổng không ưa ông đâu, nói ngắn thôi']]);
X('z_b_tap','Za Lô · Bin nhắn',[
 ['#Bin','anh muốn tập nhắn kiểu chị Ngân thì tối qua em'],
 ['#Bin','em giả làm thằng quản lý ngồi soi, anh gõ mà em đọc ra là thua 😎']]);
P2DATA.AUTO.push(
 {h:1,hx:1,d:1,at:9,k:'z_a_hem',c:'nhanh:A vai:ngan'},
 {h:1,hx:1,d:[2,7],at:7.4,k:'z_a_huong',c:'nhanh:A vai:lam co:x_hop !co:x_vu_ocl'},
 {h:1,hx:1,d:[2,7],at:7.3,k:'z_a_vi',c:'nhanh:A vai:lam co:x_vu_ocl !cc:x_vi'},
 {h:1,hx:1,d:[2,7],at:7.2,k:'z_vinh',c:'co:x_vinh'},
 {h:1,hx:1,d:[3,7],at:16,k:'z_a_thoa',c:'nhanh:A vai:ngan !co:x_a_thoa_xong'},
 {h:1,hx:1,d:[4,7],at:7.5,k:'z_thoai',c:'co:x_vinh !co:x_gap_thoai vai:lam'},
 {h:1,hx:1,d:[5,7],at:9,k:'z_gom',c:'!co:x_gom'},
 {h:1,hx:1,d:[6,7],at:19,k:'z_a_chot',c:'nhanh:A co:x_sodo co:x_vinh !co:x_chot'},
 {h:1,hx:1,d:1,at:7.6,k:'z_b_bin',c:'nhanh:B'},
 {h:1,hx:1,d:[1,7],at:7.1,k:'z_b_huong',c:'nhanh:B cc:x_siha !co:x_vu_ocl'},
 {h:1,hx:1,d:[2,7],at:7.2,k:'z_b_vinh',c:'nhanh:B co:x_vu_ocl !co:x_vinh'},
 {h:1,hx:1,d:[3,7],at:17,k:'z_b_tap',c:'nhanh:B co:x_vinh !co:x_tapma'});
/* tin "mình nhắn": ai bắt đầu bằng "> " */
const threadOf1=threadOf;
threadOf=function(r){ const ai=String(r.ai||''); if(P2.on&&r.kieu==='tin'&&ai.startsWith('> ')){ const y=ai.slice(2).trim(); return {th:THREAD[y]||y,me:1}; } return threadOf1(r); };

/* ---------- 2. MÁY GIẤU TRONG TRẠI ---------- */
const P2LOG=()=>(S.p2tin=S.p2tin||[]);
const ALBUM=[['x_so','Ảnh','Chụp trong ngăn kéo văn phòng lầu ba','x2-album-so'],['x_giongthat','Ghi âm','Ghi qua khe cửa văn phòng lầu ba'],['x_khaibay','Ghi âm','Ghi lúc Chị Bảy kể chuyện trên lầu ba'],['x_lich','Ảnh','Tờ giấy tự vẽ lịch lính gác, chụp lại cho khỏi quên','x2-album-lich'],['x_tu','Ảnh','Chụp lén ông Tú lúc qua trại','x2-album-tu'],['x_vi','Ảnh','Chụp màn hình máy trạm: ví tổng tối Chủ nhật','x2-album-vi']];
const WAVE='<div aria-hidden="true" style="display:flex;align-items:center;gap:2px;height:34px;margin:6px 0">'+Array.from({length:40},(_,i)=>'<i style="display:block;width:3px;border-radius:2px;background:#f0b25c;opacity:.8;height:'+(6+Math.abs(Math.sin(i*1.7)*Math.cos(i*.4))*26)+'px"></i>').join('')+'</div>';
const ccText=k=>{ const r=T[IDX['CC_'+k]]; return r?{ten:r.ai,loi:r.loi}:null; };
function renderMayGiau(tab){ const b=$('phBody'); tabs(); b.classList.toggle('wall',tab!=='tin'); b.style.setProperty('--wall','url(img2/x2-maygiau-nen.webp)'); if(tab==='tin'){ b.style.background='linear-gradient(rgba(8,10,16,.78),rgba(8,10,16,.9)),url(img2/x2-maygiau-nen.webp) center/cover'; }
  if(tab==='tin'){ $('phTitle').textContent='Máy giấu'; const L=P2LOG();
    const can=hasF('x_may')&&!hasF('x_cho_xn')&&typeof nextWord==='function'&&nextWord(), tam=S.room==='tam';
    b.innerHTML='<div class="ph-tip">Máy cũ dán dưới đáy thùng nước. Không có tên ai trong danh bạ. Tin vô ra đều giả làm tin rác.</div>'+
      (L.length?L.map(m=>'<div class="ph-note" style="margin:6px 10px;padding:10px 12px;border-radius:12px;'+(m.me?'background:#24402c;margin-left:44px':'background:#232a3b;margin-right:44px')+'">'+esc(m.t)+'<div style="font-size:11px;color:#8a92a6;margin-top:4px">'+(m.me?'Đã gửi':'Số lạ')+' · ngày '+m.d+'</div></div>').join(''):'<div class="ph-note">Chưa gửi tin nào ra.</div>')+
      '<div style="padding:12px"><button class="pbtn" type="button" id="mgGui"'+(can&&tam?'':' disabled')+'>Gửi tin giấu chữ'+'<small>'+(!can?(hasF('x_cho_xn')?'Đang chờ bên ngoài trả lời.':'Chưa có gì cần gửi.'):tam?'Ghép ra chữ '+nextWord():'Chỉ dám mở máy gửi tin trong buồng tắm.')+'</small></button></div>';
    const g=$('mgGui'); if(g&&!g.disabled) g.onclick=async()=>{ if(busy) return; closePhone(); busy=true; try{ await P2GAMES.gui(); } finally { busy=false; hud(); } };
    return; }
  if(tab==='anh'){ $('phTitle').textContent='Ảnh & ghi âm'; const L=ALBUM.filter(a=>hasC(a[0])).map(a=>({a,c:ccText(a[0])})).filter(x=>x.c);
    b.innerHTML='<div class="ph-tip">Chứng cứ đã chụp, đã ghi. Ra được tới ngoài là gửi cho đại úy Vinh.</div>'+(L.length?L.map(({a,c})=>'<div class="card">'+(a[3]?'<img src="img2/'+a[3]+'.webp" alt="" loading="lazy" style="display:block;width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:8px;margin-bottom:8px" onerror="this.remove()">':'')+'<b>'+(a[1]==='Ghi âm'?'🎙 ':'📷 ')+esc(c.ten)+'</b>'+(a[1]==='Ghi âm'?WAVE:'')+esc(c.loi)+'<span class="from">'+esc(a[2])+'</span></div>').join(''):'<div class="ph-note">Chưa chụp, chưa ghi được gì.</div>');
    return; }
  if(tab==='tim'){ $('phTitle').textContent='Tìm'; b.innerHTML='<div class="ph-note" style="padding:16px;line-height:1.6">Không dám lên mạng tra cứu. Trại dò được máy lạ bắt sóng wifi.</div>'; return; } }
const renderPhone2=renderPhone;
renderPhone=function(){ $('phBody').style.background=''; if(P2.on&&P2.map==='trai'&&hasF('x_may')&&['tin','anh','tim'].includes(phTab)){ phThread=null; return renderMayGiau(phTab); } return renderPhone2(); };
/* ghi lại tin gửi ra, tin rác vô */
const p2gui1=P2GAMES.gui;
P2GAMES.gui=async()=>{ const before=S.co.x_cho_xn; const gc=giauChu; let txt='';
  giauChu=async(...a)=>{ const r=await gc(...a); if(r&&r.cau) txt=r.cau.join(' '); return r; };
  try{ await p2gui1(); } finally { giauChu=gc; }
  if(!before&&S.co.x_cho_xn&&txt) P2LOG().push({me:1,t:txt,d:S.day}); };
const p2tinvao1=P2GAMES.tinvao;
P2GAMES.tinvao=async()=>{ P2LOG().push({me:0,t:'Ông bà mình dạy ở hiền gặp lành. Khuyến mãi tháng này giảm 30%.',d:S.day}); return p2tinvao1(); };

/* ---------- 3. MÁY TRẠM PHÒNG MÁY ---------- */
X('x_maytram_act','Máy trạm',[['~','Giờ cơm. Phòng máy vắng tanh, màn hình máy Chị Bảy còn sáng, chưa khóa.'],{game:'maytram'}]);
P2DATA.ROOMS.may.objs.push({id:'maytram',x:.62,y:.5,w:.12,h:.12,l:'Máy của Chị Bảy',idle:'Máy của Chị Bảy. Trong giờ ca không ai dám lại gần.'});
P2DATA.ACT.push({id:'x_maytram',h:2,hx:3,d:[9,19],w:[12,13],who:'o:maytram',k:'x_maytram_act',t:'Lén mở máy Chị Bảy lúc giờ cơm',sub:'phòng máy vắng chừng một phút',c:'!co:x_maytram',cost:20});
const MT_NHOM=[['Chị Bảy','Tổ 3 tháng này hụt 12%. Em đang siết.'],['Quản lý K','Thứ Sáu xe qua bãi mới. Mỗi tổ gửi tên 2 đứa yếu nhất.'],['Quản lý K','Tiền tuần này dồn về ví tổng tối Chủ nhật như cũ. Đứa nào chuyển trễ tự chịu.'],['Quản lý K','Ai làm rớt máy, rớt sổ thì khỏi về.'],['Số ẩn','[Tin thoại 0:12] …tin để lâu là thiu…']];
/* máy trạm Chị Bảy: màn hình máy tính có thanh ứng dụng bên trái (theo bản vẽ tác giả 10/2026) */
const MTCSS=`
#gameBox:has(.mt7){width:100%!important;max-width:none!important;height:100%!important;padding:8px!important;box-sizing:border-box}
#gameBox:has(.mt7) .p2g{height:100%}
#game:has(.mt7) #p2x{display:none!important}
.mt7{position:relative;height:100%;display:flex;align-items:center;justify-content:center;padding:14px 18px;box-sizing:border-box;color:#e9e4d8;font:400 15px/1.45 "Be Vietnam Pro",system-ui,sans-serif}
.mt7 .mtbg{position:absolute;inset:0;background:linear-gradient(rgba(6,7,9,.4),rgba(6,7,9,.6)),url(img2/x2-maytram.webp) center/cover;filter:blur(3px) brightness(.6);pointer-events:none}
/* màn hình: viền nhựa, cằm, đèn nguồn */
.mt7 .mon{position:relative;z-index:1;width:min(1180px,100%);aspect-ratio:16/9.6;max-height:100%;padding:12px 12px 26px;box-sizing:border-box;background:linear-gradient(#1c1d21,#121316);border-radius:14px;box-shadow:0 40px 90px rgba(0,0,0,.75),inset 0 1px 0 rgba(255,255,255,.06)}
.mt7 .mon .led{position:absolute;bottom:10px;right:22px;width:6px;height:6px;border-radius:50%;background:#5fd38a;box-shadow:0 0 6px #5fd38a}
.mt7 .scr{position:relative;height:100%;border-radius:4px;overflow:hidden;display:flex;flex-direction:column;background:#0a1220}
.mt7 .scr::after{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(115deg,rgba(255,255,255,.05),rgba(255,255,255,0) 38%),repeating-linear-gradient(0deg,rgba(0,0,0,.07) 0 1px,transparent 1px 3px);z-index:5}
.mt7 .desk{position:relative;flex:1;min-height:0;padding:18px;display:flex;background:radial-gradient(120% 90% at 78% 18%,#27466d 0,#14243c 42%,#0b1322 100%)}
.mt7 .desk::before{content:"";position:absolute;inset:0;background:radial-gradient(60% 50% at 20% 100%,rgba(227,176,91,.12),transparent 70%);pointer-events:none}
/* biểu tượng trên màn hình chính */
.mt7 .icons{position:relative;display:grid;grid-auto-flow:column;grid-template-rows:repeat(4,auto);gap:6px;align-content:start}
.mt7 .icons button{width:104px;display:flex;flex-direction:column;align-items:center;gap:6px;padding:10px 4px;background:none;border:1px solid transparent;border-radius:6px;color:#f2eee4;font:400 13.5px/1.25 "Be Vietnam Pro",sans-serif;text-shadow:0 1px 3px rgba(0,0,0,.8);cursor:pointer}
.mt7 .icons button:hover,.mt7 .icons button:focus-visible{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.18);outline:0}
.mt7 .icons .ic{width:50px;height:50px;border-radius:12px;display:grid;place-items:center;background:linear-gradient(160deg,#f0c071,#c98b2e);box-shadow:0 6px 14px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,255,255,.35)}
.mt7 .icons .ic.c2{background:linear-gradient(160deg,#6fb6ff,#2f6fd0)}.mt7 .icons .ic.c3{background:linear-gradient(160deg,#7fdc9b,#2f9a57)}.mt7 .icons .ic.c4{background:linear-gradient(160deg,#a9b0bd,#5d6573)}
.mt7 .icons svg{width:28px;height:28px;fill:none;stroke:#17130c;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
.mt7 .icons .ic.c2 svg,.mt7 .icons .ic.c3 svg,.mt7 .icons .ic.c4 svg{stroke:#fff}
/* thông báo đếm giờ, góc dưới phải */
.mt7 .note{position:absolute;right:16px;bottom:14px;z-index:3;width:290px;padding:12px 14px;background:rgba(18,20,26,.94);border:1px solid #2c2f38;border-radius:10px;box-shadow:0 14px 34px rgba(0,0,0,.5);font-size:13.5px;color:#cfc8b8}
.mt7 .note .hd{display:flex;align-items:center;gap:8px;font-weight:600;color:#f2eee4;margin-bottom:4px}
.mt7 .note .hd svg{width:16px;height:16px;fill:none;stroke:#ff8a7c;stroke-width:2;stroke-linecap:round}
.mt7 .note b{color:#ff8a7c}
.mt7 .note i{display:block;height:4px;margin-top:9px;border-radius:2px;background:#2a2c33;overflow:hidden}.mt7 .note i em{display:block;height:100%;background:linear-gradient(90deg,#e3b05b,#d8382b);transition:width .4s linear}
.mt7 .note.hot{border-color:#7a2a24;animation:mtpulse 1s infinite}
@keyframes mtpulse{50%{box-shadow:0 0 0 3px rgba(216,56,43,.35),0 14px 34px rgba(0,0,0,.5)}}
/* cửa sổ ứng dụng */
.mt7 .win{position:relative;z-index:2;flex:1;min-width:0;display:flex;flex-direction:column;background:#101218;border:1px solid #2a2d36;border-radius:8px;box-shadow:0 22px 50px rgba(0,0,0,.55);overflow:hidden}
.mt7 .tb{display:flex;align-items:center;gap:12px;padding:10px 12px 10px 16px;background:linear-gradient(#1a1d25,#15171e);border-bottom:1px solid #262933}
.mt7 .tb .ti{width:30px;height:30px;border-radius:8px;display:grid;place-items:center;background:#2a2216;flex:none}
.mt7 .tb .ti svg{width:18px;height:18px;fill:none;stroke:#e3b05b;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
.mt7 .tb h4{margin:0;font:600 16px/1.2 "Be Vietnam Pro",sans-serif;color:#f2eee4}
.mt7 .tb p{margin:1px 0 0;color:#9da3b0;font-size:13px}
.mt7 .tb .wc{margin-left:auto;display:flex;gap:2px}
.mt7 .tb .wc button{width:36px;height:30px;border:0;border-radius:6px;background:none;color:#9da3b0;font-size:18px;line-height:1;cursor:pointer}
.mt7 .tb .wc button:hover{background:#c0392b;color:#fff}
.mt7 .mtb{flex:1;min-height:0;overflow:auto;padding:16px 18px}
/* thanh tác vụ */
.mt7 .task{position:relative;z-index:4;display:flex;align-items:center;gap:4px;height:46px;padding:0 10px;background:rgba(14,16,22,.96);border-top:1px solid #262933}
.mt7 .task button{position:relative;height:38px;min-width:42px;display:flex;align-items:center;gap:8px;padding:0 10px;border:0;border-radius:6px;background:none;color:#cfd3dc;font:400 13px "Be Vietnam Pro",sans-serif;cursor:pointer}
.mt7 .task button:hover{background:rgba(255,255,255,.08)}
.mt7 .task button svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.mt7 .task button.on{background:rgba(227,176,91,.14);color:#f0c071}
.mt7 .task button.on::after{content:"";position:absolute;left:30%;right:30%;bottom:2px;height:2px;border-radius:2px;background:#e3b05b}
.mt7 .task .sp{flex:1}
.mt7 .task .clk{font:500 13px/1.15 "Be Vietnam Pro",sans-serif;color:#cfd3dc;text-align:right;padding:0 8px}
.mt7 .task .clk small{display:block;color:#8a909c;font-size:11.5px}
.mt7 .task .off{color:#ff8a7c}
/* nội dung các ứng dụng */
.mt7 table{width:100%;border-collapse:separate;border-spacing:0;font-size:14.5px}
.mt7 th{position:sticky;top:-16px;text-align:left;font:500 12.5px "Be Vietnam Pro",sans-serif;letter-spacing:.04em;text-transform:uppercase;color:#9da3b0;padding:10px 12px;border-bottom:1px solid #2a2d36;background:#14161d}
.mt7 td{padding:12px;border-bottom:1px solid #1d2028}
.mt7 tr:nth-child(odd) td{background:rgba(255,255,255,.015)}
.mt7 tr.me td{background:rgba(216,56,43,.16);box-shadow:inset 0 1px 0 rgba(216,56,43,.25)}
.mt7 tr.me td:first-child{box-shadow:inset 3px 0 0 #d8382b}
.mt7 .mtbar{display:inline-block;width:120px;height:7px;border-radius:4px;background:#262933;vertical-align:middle;overflow:hidden}.mt7 .mtbar em{display:block;height:100%;background:#5fb37a}.mt7 .mtbar em.lo{background:#d8382b}
.mt7 .mttag{display:inline-block;font:500 12px/1 "Be Vietnam Pro",sans-serif;padding:5px 9px;border-radius:20px;background:#1d3326;color:#8fd0a2}.mt7 .mttag.no{background:#3a1715;color:#ff8a7c}
.mt7 .mtg2{display:grid;grid-template-columns:1fr 260px;gap:16px;align-items:start}
.mt7 .mtcard{background:#14161d;border:1px solid #262933;border-radius:8px;padding:16px}
.mt7 .mtcard h5{margin:0 0 12px;font:500 12px/1 "Be Vietnam Pro",sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#9da3b0}
.mt7 .mtbig{font:600 34px/1.1 "Be Vietnam Pro",sans-serif;color:#ff8a7c}
.mt7 .mtm{color:#9da3b0;font-size:13px}
.mt7 .mtwarn{margin-top:14px;padding:12px 14px;border-left:3px solid #e3b05b;border-radius:0 6px 6px 0;background:#18160f;color:#d6cdb6;font-size:14px}
.mt7 .mtchat{display:grid;grid-template-columns:230px 1fr;height:100%;min-height:0;border:1px solid #262933;border-radius:8px;overflow:hidden}
.mt7 .mtchat .ls{background:#0e1015;border-right:1px solid #262933;overflow:auto}
.mt7 .mtchat .ls div{display:flex;gap:10px;padding:12px;border-bottom:1px solid #1b1d24;font-size:14px}
.mt7 .mtchat .ls div div{display:block;padding:0;border:0;min-width:0;background:none!important;box-shadow:none!important}
.mt7 .mtchat .ls div.on{background:#1a1d26;box-shadow:inset 3px 0 0 #e3b05b}
.mt7 .mtchat .ls i{flex:none;width:38px;height:38px;border-radius:50%;background:linear-gradient(160deg,#6fb6ff,#2f6fd0);display:grid;place-items:center;font:600 13px "Be Vietnam Pro",sans-serif;font-style:normal;color:#fff}
.mt7 .mtchat .ls b{display:block;font-weight:500;color:#f2eee4}.mt7 .mtchat .ls span{color:#9da3b0;font-size:12.5px;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:150px}
.mt7 .mtchat .ms{display:flex;flex-direction:column;gap:10px;padding:14px 16px;overflow:auto;background:#0b0d12}
.mt7 .mtchat .ms .h{display:flex;align-items:center;gap:10px;padding-bottom:10px;border-bottom:1px solid #1d2028;font-weight:600}
.mt7 .mtbub{align-self:flex-start;max-width:76%;background:#1b1e27;border:1px solid #272a35;border-radius:4px 14px 14px 14px;padding:9px 13px;font-size:14.5px}
.mt7 .mtbub b{display:block;font:600 12.5px/1.3 "Be Vietnam Pro",sans-serif;color:#e3b05b;margin-bottom:2px}
.mt7 .mtbub.voice{display:flex;align-items:center;gap:12px}
.mt7 .mtbub.voice .wv{display:flex;gap:2px;align-items:center;height:20px}.mt7 .mtbub.voice .wv i{width:3px;background:#9da3b0;border-radius:2px}
.mt7 .mtfiles{display:flex;flex-direction:column;gap:8px}
.mt7 .mtfile{display:flex;align-items:center;gap:14px;padding:12px 14px;background:#14161d;border:1px solid #262933;border-radius:8px;cursor:pointer;text-align:left;color:inherit;font:inherit}
.mt7 .mtfile:hover{border-color:#5fb37a}
.mt7 .mtfile svg{width:32px;height:32px;fill:none;stroke:#5fb37a;stroke-width:1.6}
.mt7 .mtfile b{font-weight:600}
.mt7 .mtsheet{font-size:13.5px}
.mt7 .mtsheet td{font:400 13.5px "IBM Plex Mono",monospace;color:#555a64;text-decoration:line-through}
.mt7 .mtsheet tr.ok td{color:#f2eee4;text-decoration:none;background:rgba(95,179,122,.14)}
.mt7 .mtempty{display:flex;flex-direction:column;align-items:center;gap:6px;padding:36px 12px;text-align:center;color:#ff8a7c}
.mt7 .mtempty svg{width:40px;height:40px;fill:none;stroke:#ff8a7c;stroke-width:1.6}
.mt7 .task .tt{display:flex;align-items:center;gap:8px;margin-right:10px;padding:6px 10px;border-radius:8px;background:rgba(216,56,43,.1);border:1px solid rgba(216,56,43,.3);font-size:13px;color:#e6dfcf;white-space:nowrap}
.mt7 .task .tt svg{width:16px;height:16px;fill:none;stroke:#ff8a7c;stroke-width:2;stroke-linecap:round;flex:none}
.mt7 .task .tt span,.mt7 .task .tt b{display:inline!important;white-space:nowrap;margin:0!important}.mt7 .task .tt b{color:#ff8a7c}
.mt7 .task .tt i{display:block;width:70px;height:4px;border-radius:2px;background:#2a2c33;overflow:hidden}.mt7 .task .tt i em{display:block;height:100%;background:linear-gradient(90deg,#e3b05b,#d8382b)}
.mt7 .task .tt.hot{animation:mtpulse 1s infinite}
.mt7 .task button span{white-space:nowrap}.mt7 .task.w button span{display:none}
@media (max-width:1100px){ .mt7 .task button span{display:none} }
@media (max-height:520px){
 .mt7{padding:2px}.mt7 .mon{aspect-ratio:auto;height:100%;width:100%;padding:5px 5px 12px;border-radius:8px}.mt7 .mon .led{bottom:3px;width:5px;height:5px}
 .mt7 .desk{padding:6px}.mt7 .icons{grid-auto-flow:row;grid-template-columns:repeat(4,auto);grid-template-rows:none;gap:2px}.mt7 .icons button{width:96px;padding:6px 2px;font-size:12.5px}.mt7 .icons .ic{width:42px;height:42px}
 .mt7 .note{bottom:6px;right:6px;width:260px;padding:8px 10px;font-size:12.5px}
 .mt7 .task{height:36px;padding:0 4px}.mt7 .task button{height:30px;padding:0 8px;min-width:34px}.mt7 .task button span,.mt7 .task .clk{display:none}
 .mt7 .task .tt{font-size:12px;padding:4px 8px}.mt7 .task .tt i{width:44px}
 .mt7 .tb{padding:6px 6px 6px 10px}.mt7 .tb .ti{width:24px;height:24px}.mt7 .tb h4{font-size:14px}.mt7 .tb p{display:none}.mt7 .mtb{padding:8px 10px}
 .mt7 .mtchat{grid-template-columns:1fr}.mt7 .mtchat .ls{display:none}.mt7 .mtchat .ms{padding:8px 10px}.mt7 .mtbub{font-size:13.5px;padding:6px 10px}
 .mt7 .mtg2{grid-template-columns:1fr 180px}.mt7 td{padding:7px 10px}.mt7 th{padding:7px 10px;top:-8px}.mt7 .mtbig{font-size:24px}
}
@media (max-width:760px){
 .mt7 .task .tt span{display:none}
 .mt7{padding:4px}.mt7 .mon{aspect-ratio:auto;height:100%;padding:6px 6px 14px;border-radius:10px}.mt7 .mon .led{bottom:4px}
 .mt7 .desk{padding:8px}.mt7 .icons{grid-auto-flow:row;grid-template-columns:repeat(2,1fr);grid-template-rows:none}.mt7 .icons button{width:auto}
 .mt7 .note{left:8px;right:8px;bottom:8px;width:auto;padding:8px 10px;font-size:12.5px}
 .mt7 .task{height:42px;padding:0 4px;gap:0}.mt7 .task button{padding:0 8px;min-width:36px}.mt7 .task button span,.mt7 .task .clk{display:none}
 .mt7 .tb{padding:8px 8px 8px 10px}.mt7 .tb p{display:none}.mt7 .mtb{padding:10px}
 .mt7 .mtg2{grid-template-columns:1fr}.mt7 .mtchat{grid-template-columns:1fr}.mt7 .mtchat .ls{display:none}
 .mt7 th:nth-child(4),.mt7 td:nth-child(4){display:none}.mt7 .mtbar{width:60px}
}`;
const MTI={home:'<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16v4"/></svg>',nhom:'<svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z"/><path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01"/></svg>',
 kh:'<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.2"/><circle cx="17" cy="9" r="2.5"/><path d="M3 19c.6-3.3 3-5 6-5s5.4 1.7 6 5M15 14.5c2.6.2 4.3 1.6 5 4.5"/></svg>',bang:'<svg viewBox="0 0 24 24"><path d="M5 20V12M11 20V6M17 20v-9"/></svg>',
 rac:'<svg viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>',off:'<svg viewBox="0 0 24 24"><path d="M12 3v8M6.4 6.4a8 8 0 1 0 11.2 0"/></svg>',xls:'<svg viewBox="0 0 24 24"><path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 12l5 5M14 12l-5 5"/></svg>'};
function gMayTram(){ return new Promise(res=>{ let tab='home', left=45, seen={}, done=false, file=false; const T0=performance.now();
  if(!$('mtcss')){ const st=document.createElement('style'); st.id='mtcss'; st.textContent=MTCSS; document.head.appendChild(st); }
  const ds=(typeof dsCon==='function'?dsCon():[]);
  const KH=(S.so||[]).slice(-6).map(s=>{ const [ten,ho]=s.split(' · '); return {ten,ho}; });
  const APP=[['home','Máy trạm'],['nhom','Nhóm quản lý'],['kh','Khách hàng'],['bang','Bảng chỉ tiêu'],['rac','Thùng rác']];
  const TT={home:['Máy trạm','Chị Bảy quên đăng xuất.'],nhom:['Nhóm quản lý','Nhóm "QL khu B".'],kh:['Khách hàng','Danh sách khách tổ 3 đã "chốt" tháng này.'],bang:['Bảng chỉ tiêu','Bảng chỉ tiêu tuần. Tên dưới 3 đơn tô đỏ.'],rac:['Thùng rác','Thùng rác: 1 tệp.']};
  const body=()=>{ seen[tab]=1;
    if(tab==='home') return '';
    if(tab==='nhom') return '<div class="mtchat"><div class="ls"><div class="on"><i>QL</i><div><b>QL khu B</b><span>'+esc(MT_NHOM[MT_NHOM.length-1][1])+'</span></div></div></div><div class="ms"><div class="h"><div>QL khu B</div></div>'+
      MT_NHOM.map(([a,t])=>{ const v=/^\[Tin thoại ([^\]]+)\]\s*(.*)$/.exec(t); return v?'<div class="mtbub voice"><div><b>'+esc(a)+'</b><span class="wv">'+[6,12,18,9,15,7,13,19,10,6,14,8].map(h=>'<i style="height:'+h+'px"></i>').join('')+'</span></div><span class="mtm">'+esc(v[1])+'</span></div><div class="mtm" style="margin:-6px 0 0 4px">'+esc(v[2])+'</div>':'<div class="mtbub"><b>'+esc(a)+'</b>'+esc(t)+'</div>'; }).join('')+'</div></div>';
    if(tab==='kh') return '<table><tr><th>Khách</th><th>Hồ sơ</th><th>Trạng thái</th></tr>'+(KH.length?KH.map(k=>'<tr><td>'+esc(k.ten)+'</td><td class="mtm">'+esc(k.ho||'')+'</td><td><span class="mttag no">đã chuyển tiền</span></td></tr>').join(''):'<tr><td colspan="3"><div class="mtempty">'+MTI.kh+'Tháng này tổ 3 chưa chốt được ai. Dòng của mình tô đỏ.</div></td></tr>')+'</table><div class="mtwarn">Cuối bảng: "Tổ con mèo · 31 khách · tháng 7".</div>';
    if(tab==='bang'){ const L=[ME].concat(ds.map(p=>p.ten)).slice(0,8).map((n,i)=>({n,v:n===ME?CT():((n.length*7+i*3)%6)})); const me=L[0];
      return '<div class="mtg2"><table><tr><th>STT</th><th>Nhân viên</th><th>Đơn tuần</th><th>Hoàn thành</th><th>Trạng thái</th></tr>'+L.map((r,i)=>'<tr class="'+(r.n===ME?'me':'')+'"><td>'+(i+1)+'</td><td>'+esc(r.n)+'</td><td>'+r.v+' / 3</td><td><span class="mtbar"><em class="'+(r.v<3?'lo':'')+'" style="width:'+Math.min(100,Math.round(r.v/3*100))+'%"></em></span></td><td><span class="mttag'+(r.v<3?' no':'')+'">'+(r.v<3?'Chưa đạt':'Đạt')+'</span></td></tr>').join('')+'</table>'+
        '<div class="mtcard"><h5>Chi tiết</h5><div style="font-size:19px">'+esc(ME)+'</div><div class="mtm">Tổ 3</div><div style="margin-top:14px" class="mtm">Đơn tuần này</div><div class="mtbig">'+me.v+' / 3</div></div></div>'; }
    return file?'<button type="button" class="mtfile" data-file="0">'+MTI.xls+'<div><b>danhsach_chuyen_thang6.xlsx</b><div class="mtm">13 dòng đã xóa.</div></div></button><table class="mtsheet" style="margin-top:12px">'+Array.from({length:13},(_,i)=>'<tr><td>'+(i+1)+'</td><td>████████████</td><td>██████████████</td></tr>').join('')+'<tr class="ok"><td>14</td><td>Nguyễn Thị Oanh</td><td>chuyển giao đối tác (Miến Điện)</td></tr></table>'
      :'<div class="mtfiles"><button type="button" class="mtfile" data-file="1">'+MTI.xls+'<div><b>danhsach_chuyen_thang6.xlsx</b><div class="mtm">13 dòng đã xóa. Bấm để mở.</div></div></button></div>'; };
  const CC=['','c2','c3','c4'];
  const clk=()=>{ const m=(S.min||0)%1440; return String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0'); };
  const draw=()=>{ const [h,sub]=TT[tab];
    const win=tab==='home'?'<div class="icons">'+APP.slice(1).map(([k,l],i)=>'<button type="button" data-app="'+k+'"><span class="ic '+CC[i]+'">'+MTI[k]+'</span>'+esc(l)+'</button>').join('')+'</div>'
      :'<section class="win"><div class="tb"><span class="ti">'+MTI[tab]+'</span><div><h4>'+esc(h)+'</h4><p>'+esc(sub)+'</p></div><div class="wc"><button type="button" data-app="home" aria-label="Đóng cửa sổ">×</button></div></div><div class="mtb">'+body()+'</div></section>';
    p2open('<div class="mt7"><div class="mtbg"></div><div class="mon"><div class="scr"><div class="desk">'+win+
      (tab!=='home'?'':'<div class="note'+(left<=15?' hot':'')+'" id="mtN"><div class="hd"><svg viewBox="0 0 24 24"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2M9 2h6"/></svg>'+esc(TT.home[1])+'</div>Còn <b id="mtT">'+left+'</b> giây trước khi có người quay lại<i><em id="mtB" style="width:'+(left/45*100)+'%"></em></i></div>')+'</div>'+
      '<div class="task'+(tab==='home'?'':' w')+'">'+APP.map(([k,l])=>'<button type="button" data-app="'+k+'" class="'+(tab===k?'on':'')+'" title="'+esc(l)+'">'+MTI[k]+'<span>'+esc(l)+'</span></button>').join('')+'<span class="sp"></span>'+(tab==='home'?'':'<div class="tt'+(left<=15?' hot':'')+'" id="mtN" title="'+esc(TT.home[1])+'"><svg viewBox="0 0 24 24"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2M9 2h6"/></svg><span>Còn <b id="mtT">'+left+'</b> giây trước khi có người quay lại</span><i><em id="mtB" style="width:'+(left/45*100)+'%"></em></i></div>')+'<div class="clk">'+clk()+'<small>'+esc(TT.home[0])+'</small></div><button type="button" class="off" id="mtX2" title="Tắt màn hình" aria-label="Tắt màn hình">'+MTI.off+'</button></div></div><i class="led"></i></div></div>',()=>fin(false));
    document.querySelectorAll('.mt7 [data-app]').forEach(b=>b.onclick=()=>{ tab=b.dataset.app; file=false; draw(); });
    document.querySelectorAll('.mt7 [data-file]').forEach(b=>b.onclick=()=>{ file=b.dataset.file==='1'; draw(); });
    $('mtX2').onclick=()=>fin(false); };
  const fin=late=>{ if(done) return; done=true; clearInterval(iv); p2close(); setCo('x_maytram');
    if(seen.nhom&&!hasC('x_vi')) { fx('+cc:x_vi'); toast('Manh mối mới: ví tổng tối Chủ nhật'); }
    if(seen.nhom) setCo('x_biet_thu6');
    if(late) fx('+nghi:8'); res(late); };
  const iv=setInterval(()=>{ left=Math.max(0,45-Math.floor((performance.now()-T0)/1000)); const t=$('mtT'), bb=$('mtB'); if(t) t.textContent=left; if(bb) bb.style.width=(left/45*100)+'%'; const nn=$('mtN'); if(nn) nn.classList.toggle('hot',left<=15); if(left<=0){ toast('Tiếng dép ngoài hành lang. Lủi ra không kịp, Chị Bảy thấy mình đứng gần máy.'); fin(true); } },500);
  draw(); }); }
P2GAMES.maytram=async()=>{ const late=await gMayTram(); if(late){ await say('thoai','Chị Bảy','Đứng đây làm gì. Về bàn.'); hideDlg(); } };

/* ---------- 4. LỘ RÕ HƠN: mò thùng nước ban ngày, lén về máy trạm giờ cơm ---------- */
X('x_mothung_act','Buồng tắm',[['~','Cái thùng nước lạnh. Người ta nói đáy thùng có dán cái gì đó.'],{game:'mothung'}]);
P2DATA.ACT.push({id:'x_mothung',h:2,hx:3,d:[9,19],who:'o:thung',k:'x_mothung_act',t:'Mò dưới đáy thùng nước',sub:'nghe nói có cái máy dán dưới đó',c:'co:x_biet_may !co:x_may !co:x_may_bo',until:'co:x_may',cost:15});
P2GAMES.mothung=()=>new Promise(res=>{ p2open('<h3>Mò dưới đáy thùng nước</h3><div class="dd2" id="mtHost" style="aspect-ratio:5/3;min-height:240px"></div>',()=>{ const mg=document.querySelector('#mtHost .mg'); if(mg&&window.__p2mini) window.__p2mini.lose(); });
  miniDem($('mtHost'),'may').then(async r=>{ p2close();
    if(r.kq==='ok'){ await runS('x_dd_may'); hideDlg(); }
    else if(r.kq==='on'){ effects('+nghi:'+Math.round((r.n||.5)*20)); await say('nghi','',(r.m||'Có tiếng động.')+' Rút tay ra, lau khô, đi ra như không có gì.'); hideDlg(); }
    res(); }); });
async function p2LenMayTram(){ if(!P2.on||P2.map!=='trai'||hasF('x_maytram')||S.day<9) return;
  busy=true; const p=await choose([{ma:'y',loi:'Lén về phòng máy',sub:'máy Chị Bảy còn sáng · chừng 45 giây'},{ma:'n',loi:'Ngồi ăn cơm'}],false,'Phòng máy vắng tanh. Máy của Chị Bảy chưa khóa.'); hideDlg(); busy=false;
  if(p.ma==='y'){ await runS('x_maytram_act'); hideDlg(); } }

/* ---------- 5. NHỊP HẺM 47 LÚC 22:00 — cảnh cắt ngắn nối hai bờ sông ---------- */
X('hem_dem_09','Hẻm 47 · 22:00',[{bg:'x2-taphoa-chieu'},'22:00. Bên này tắt đèn phòng ngủ. Cách đó ba trăm cây số, ở đầu hẻm 47, cô Thoa vừa kéo cửa cuốn xuống một nửa, nhìn cục sạc điện thoại ốp mèo đen đã báo đèn xanh đầy pin.',{bg:''}]);
X('hem_dem_11','Hẻm 47 · 22:00',[{bg:'x2-hien-basau-dem'},'22:00. Bà Sáu đứng trước bàn thờ thắp ba cây nhang, lâm râm khấn tên 12 đứa nhỏ từng ở trên gác, rồi ngập ngừng khấn thêm tên người thứ 13. Con mèo mun nằm cuộn tròn ngay bậc thềm.',{bg:''}]);
X('hem_dem_13','Hẻm 47 · 22:00',[{bg:'hem-dem'},'Đầu đường Fan Xích Vô, chú Tám đóng cửa tiệm hớt tóc, cái radio cũ vẫn rỉ rả bản cải lương "Tình anh bán chiếu". Sát vách tiệm chú là mặt bằng tiệm uốn tóc cũ đã sang chủ từ ba năm trước.',{bg:''}]);
X('hem_dem_16','Hẻm 47 · 22:00',[{bg:'x2-hem-mua'},'Khuya ở hẻm 47. Bin đi giao cuốc hàng cuối về ngang phòng số 3, ngước nhìn cái cửa sổ tối om. Đầu hẻm, xe bánh mì chị Hạnh đã dọn, chỉ còn ngọn đèn vàng hắt xuống mặt đường ướt mưa.',{bg:''}]);
const NHIP=[{k:'hem_dem_09',c:()=>S.day>=9},{k:'hem_dem_11',c:()=>S.day>=11&&hasF('x_may')},{k:'hem_dem_13',c:()=>S.day>=13&&hasF('khai_xbay')},{k:'hem_dem_16',c:()=>S.day===16}];
async function p2NhipHem(){ if(!P2.on||P2.map!=='trai') return; const n=NHIP.find(x=>!hasF('nh_'+x.k)&&x.c()); if(!n) return; setCo('nh_'+n.k); await runS(n.k); hideDlg(); }

/* ---------------- bảng kế hoạch / báo cáo Phần 2: trình bày như tờ giấy thật ---------------- */
(function(){ const st=document.createElement('style'); st.textContent=`
.p2g .kh{display:block;background-color:#efe6d2!important;color:#2a241a;border-radius:4px;padding:26px 26px 22px;box-shadow:0 18px 40px rgba(0,0,0,.45);font-family:"Newsreader",Georgia,serif;max-width:720px;margin:6px auto 0;position:relative;background-image:repeating-linear-gradient(transparent 0 31px,rgba(60,80,120,.13) 31px 32px)}
.kh .kh-hd{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;border-bottom:2px solid #2a241a;padding-bottom:8px;margin-bottom:14px}
.kh .kh-hd b{font:700 22px "Oswald","Arial Narrow",sans-serif;letter-spacing:.06em}
.kh .kh-hd span{font:13px "IBM Plex Mono",monospace;color:#5a5040;text-align:right;line-height:1.5}
.kh .kh-sec{display:grid;grid-template-columns:28px 1fr;gap:4px 10px;padding:8px 0}
.kh .kh-no{font:600 18px "Oswald",sans-serif;color:#8a2f25}
.kh .kh-tt{font:600 12px "Be Vietnam Pro",sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#6b5f4a}
.kh .kh-ln{grid-column:2;font-size:19px;line-height:1.5}
.kh .kh-ln u{text-decoration:none;border-bottom:2px dashed #8a2f25;padding:0 4px;color:#8a2f25;font-family:Newsreader,Georgia,serif;font-size:17px}
.kh .kh-ln u.empty{color:#9a8f7a;border-color:#9a8f7a}
.kh .kh-ops{grid-column:2;display:flex;flex-wrap:wrap;gap:6px;margin-top:4px}
.kh .kh-ops button{font:14px "Be Vietnam Pro",sans-serif;background:#fff8ea;color:#2a241a;border:1px solid #b9ab8e;border-radius:999px;padding:6px 12px;cursor:pointer}
.kh .kh-ops button.on{background:#8a2f25;color:#fff;border-color:#8a2f25}
.kh .kh-ops button:disabled{opacity:.45;cursor:not-allowed;font-style:italic}
.kh .kh-ky{display:flex;justify-content:flex-end;margin-top:10px;font:15px Newsreader,Georgia,serif;color:#5a5040}
.kh .kh-stamp{position:absolute;right:28px;bottom:40px;border:3px solid #b3322a;color:#b3322a;font:700 20px "Oswald",sans-serif;padding:4px 12px;transform:rotate(-8deg);opacity:0;transition:opacity .3s,transform .3s}
.kh .kh-stamp.on{opacity:.85;transform:rotate(-8deg) scale(1.05)}
.khbar{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:14px}
@media (max-width:560px){.kh{padding:18px 14px}.kh .kh-ln{font-size:17px}}`; document.head.appendChild(st); })();
const KH_DOC={
  xvinh:{loai:'KẾ HOẠCH',gui:'Kính gửi: Đại úy Vinh',tt:['Vị trí trại','Bên trong trại','Đường tin ra','Đường người ra'],ok:'ĐÃ GỬI'},
  xocl:{loai:'BÁO CÁO',gui:'Gửi đại úy Vinh · viết sẵn',tt:['Người cầm lò','Dòng tiền','Bằng chứng nặng nhất'],ok:'ĐÃ GHI'}};
const board1=board;
board=function(vu){ if(!P2.on||!KH_DOC[vu]) return board1(vu); return new Promise(res=>{ hideDlg(); if(typeof phAuto!=='undefined'&&phAuto) closePhone();
  const D=KH_DOC[vu]; const sents=metaRows('bang').filter(r=>r.ai===vu);
  T.filter(r=>r.kieu==='tu'&&String(r.ai).startsWith('BANG_'+vu+'_')).forEach(r=>{ delete S.ch[r.ma]; delete S.ch[r.ma.replace(/(_[a-z])\d+$/,'$1')]; });
  const OP=sents.map(s=>{ const opts=[], seen=new Set(); T.filter(r=>r.kieu==='tu'&&r.ai===s.ma).forEach(r=>{ const ok=cond(r.hien); if(seen.has(r.loi)){ const o=opts.find(x=>x.loi===r.loi); if(ok&&!o.ok){ o.ok=true; o.ma=r.ma; } return; } seen.add(r.loi); opts.push({ma:r.ma,loi:r.loi,ok}); }); return opts; });
  const sel={}; let sent=false;
  const draw=()=>{ const all=sents.every(s=>sel[s.ma]);
    const box=p2open('<h3>'+esc(BOARDN[vu]||D.loai)+'</h3><p>Chọn chữ điền vô từng chỗ trống. Chữ mờ là chưa có manh mối, đi hỏi thêm rồi quay lại viết.</p>'+
      '<div class="kh"><div class="kh-hd"><b>'+D.loai+'</b><span>'+esc(D.gui)+'<br>Ngày '+(S.day||1)+' · người lập: '+esc(ME)+'</span></div>'+
      sents.map((s,i)=>{ const parts=esc(s.loi).split('{}'); const o=OP[i].find(x=>x.ma===sel[s.ma]);
        return '<div class="kh-sec"><span class="kh-no">'+(i+1)+'.</span><span class="kh-tt">'+esc(D.tt[i]||'')+'</span><div class="kh-ln">'+parts[0]+'<u class="'+(o?'':'empty')+'">'+(o?esc(o.loi):'………………')+'</u>'+(parts[1]||'')+'</div>'+
          (sent?'':'<div class="kh-ops">'+OP[i].map(x=>'<button type="button" data-s="'+s.ma+'" data-o="'+x.ma+'"'+(sel[s.ma]===x.ma?' class="on"':'')+(x.ok?'':' disabled')+'>'+(x.ok?esc(x.loi):'??? chưa có manh mối')+'</button>').join('')+'</div>')+'</div>'; }).join('')+
      '<div class="kh-ky">'+esc(ME)+'</div><div class="kh-stamp'+(sent?' on':'')+'">'+D.ok+'</div></div>'+
      '<div class="khbar"><button class="btn" type="button" id="bdOk"'+(all&&!sent?'':' disabled')+'>'+(vu==='xvinh'?'Gửi kế hoạch':'Lưu báo cáo')+'</button><button class="pbtn" type="button" id="bdX">Để sau, chưa đủ manh mối</button></div>',()=>$('bdX').click());
    box.querySelectorAll('.kh-ops button').forEach(b=>b.onclick=()=>{ sel[b.dataset.s]=b.dataset.o; draw(); });
    $('bdX').onclick=()=>{ p2close(); res(-1); };
    $('bdOk').onclick=()=>{ window.SFX&&SFX.play('viet',{v:.9,dur:1.8}); let sc=0; for(const s of sents){ const id=sel[s.ma]; const r=T[IDX[id]]; if(r&&r.sau==='dung') sc++; S.ch[id]=1; S.ch[id.replace(/(_[a-z])\d+$/,'$1')]=1; }
      S.tin['bang_'+vu]=sc; setCo('bao_'+vu); save(); sent=true; draw(); try{ tone(180,.15,.05,'square'); }catch(e){}
      setTimeout(()=>{ p2close(); toast('Đúng '+sc+'/'+sents.length); res(sc); },1300); }; };
  draw(); }); };

/* ---------------- việc ban đêm: cho người chơi biết việc nào mở ra, nghe từ đâu ---------------- */
const MUC_NGUON={may:'Thủy với tổ 3 kể: có cái điện thoại dán dưới đáy thùng nước buồng tắm.',tuan0:'Muốn tính đường ra thì phải biết giờ lính đi qua cửa sau.',tuan3:'Sơ đồ trại còn thiếu lầu ba.',
  kim:'Anh Lộc nói tụi bảo vệ bỏ quên cây kìm trên nóc tủ chén.',rao:'Có kìm rồi, cắt được rào sau bếp.',cua:'Đã có chìa cửa sau từ Chị Bảy.',nghe:'Đêm đêm văn phòng lầu ba có tiếng nghe tin thoại.',
  gapngan:'Ngân hẹn ở buồng tắm.',thuy:'Thủy hẹn ở buồng tắm.'};
Object.keys(MUC).forEach(k=>{ if(MUC_NGUON[k]) MUC[k].why=MUC[k].why+' '+MUC_NGUON[k]; });
/* cái máy giấu dưới thùng nước: chỉ có 3 đêm kể từ lúc nghe kể, quá hạn coi như mất (chờ duyệt chữ) */
const MAY_DEM=3;
const mayCon=()=>{ const d0=S.fd&&S.fd.x_biet_may; return d0==null?MAY_DEM:Math.max(0,MAY_DEM-(S.day-d0)); };
function p2MayHan(){ if(!P2.on||!hasF('x_biet_may')||hasF('x_may')||hasF('x_may_bo')) return; if(mayCon()>0) return;
  setCo('x_may_bo'); const t='Hết 3 đêm mà chưa lấy được cái máy giấu dưới thùng nước. Đường nhắn tin ra ngoài coi như bỏ.';
  if(typeof u3sys==='function') u3sys('Lỡ mất cái máy giấu',t,true); else toast(t); }
{ const m=MUC.may, c0=m.c, w0=m.why; m.c=()=>c0()&&!hasF('x_may_bo')&&mayCon()>0;
  Object.defineProperty(m,'why',{configurable:true,get:()=>w0+' Chỉ có 3 đêm, còn '+mayCon()+' đêm. Không lấy được máy thì coi như mất đường nhắn ra ngoài.',set:v=>{}}); }
function mucMo(){ return Object.keys(MUC).filter(k=>{ try{ return MUC[k].c(); }catch(e){ return false; } }); }
const objective2=objective;
objective=function(){ const o=objective2(); if(!P2.on||P2.map!=='trai'||S.ended) return o; const L=mucMo(); if(!L.length) return o;
  return o+'\nViệc ban đêm (sau 22:00): '+L.map(k=>MUC[k].noi||MUC[k].ten).join(', ')+'.'; };
const hud2=hud;
hud=function(){ hud2(); if(!P2.on||P2.map!=='trai') return; const seen=S.mucSeen||(S.mucSeen={}); const moi=mucMo().filter(k=>!seen[k]); if(!moi.length) return;
  moi.forEach(k=>seen[k]=1); toast('Việc mới cho ban đêm: '+moi.map(k=>MUC[k].ten.toLowerCase()).join(', ')); };

/* ---------------- dòng phím tắt dưới khung chơi: bản Phần 2 ---------------- */
const KEYS_P2='<kbd>←</kbd><kbd>→</kbd> đi · bấm vào người, cửa, đồ vật · <kbd>E</kbd> đọc tiếp / làm việc gần nhất · <kbd>1</kbd>–<kbd>6</kbd> chọn · <kbd>P</kbd> điện thoại · <kbd>Esc</kbd> đóng · trò nhỏ: <kbd>Space</kbd> nút vàng (giữ được), <kbd>Esc</kbd> rút · đêm giải cứu: <kbd>↑</kbd><kbd>↓</kbd> cầu thang, <kbd>Space</kbd> núp, <kbd>E</kbd> dẫn, <kbd>Shift</kbd> chạy';
let KEYS_P1=null;
const hud3=hud;
hud=function(){ hud3(); const k=document.querySelector('.keys'); if(!k||(typeof HUDV_DESK==='function'&&HUDV_DESK())) return; if(KEYS_P1===null) KEYS_P1=k.innerHTML; const want=P2.on?KEYS_P2:KEYS_P1; if(k.innerHTML!==want) k.innerHTML=want; };
/* nút ? ở Phần 2 mở hướng dẫn Phần 2 */
const tutorial1=tutorial;
tutorial=function(){ if(!P2.on) return tutorial1(); return (async()=>{ if(typeof busy!=='undefined'&&busy) return; busy=true; try{ await runS('x_hd'); } finally{ hideDlg(); busy=false; } })(); };
