/* Hẻm 47 · Phần 2 — thiết bị: Za Lô ở Hồi 1, máy giấu trong trại, máy trạm phòng máy.
   Lời trong file này là BẢN NHÁP chờ tác giả duyệt (xem Excel thiết bị). */
'use strict';
/* ---------- 1. ZA LÔ HỒI 1 ---------- */
/* '#Tên' = người đó nhắn · '#> Tên' = mình nhắn cho người đó · '@Tên' = nhắn trong nhóm hẻm */
X('z_a_hem','Za Lô · nhóm hẻm',[
 ['@Diễm Nail','ủa con Ngân về rồi hả mấy bà, sáng nay tui thấy ngồi trước tạp hóa'],
 ['@Hạnh Bánh Mì','về rồi thì để yên cho nó thở đi mấy bà, chuyện cũ nhắc hoài'],
 ['@Bà Sáu','Đứa nào nói ra nói vô con nhỏ là bà cạo đầu. Bà Sáu đây.'],
 ['~','Bà Sáu lên tiếng một cái là nguyên nhóm im phăng phắc, hông ai dám bàn ra tán vô nữa.']]);
X('z_a_huong','Za Lô · Ngân nhắn',[
 ['#Ngân','nay ngày chẵn, tới phiên anh đi đó'],
 ['#Ngân','đi gặp chị Hương đi. chỉ còn giữ hồ sơ vụ Ba Vẹt, có khi biết tụi nó dời đi đâu'],
 ['#> Ngân','Rồi, đang chuẩn bị đi đây. Có tin gì mới tôi nhắn về.']]);
X('z_a_vi','Za Lô · Hương nhắn',[
 ['#Hương','địa chỉ ví con bé Phương gửi tôi, tôi chuyển qua ông rồi đó'],
 ['#Hương','cứ lần ngược từ mấy cái lệnh rút tiền tối Chủ nhật á. bớt ngồi đọc cmt trên mạng lại đi'],
 ['~','Về phòng mở laptop lên tra thử coi dòng tiền này chảy đi đâu.']]);
X('z_vinh','Za Lô · đại úy Vinh',[
 ['#Đại úy Vinh','Nhắc lại: vị trí giữ người, số người, giờ trống. Đủ 3 thứ tôi mới đề nghị phía bạn phối hợp được.'],
 ['#Đại úy Vinh','Đừng nhắn tên tôi trong bất kỳ tin nào gửi ra.']]);
X('z_a_thoa','Za Lô · mẹ nhắn',[
 ['#Cô Thoa','tối về ăn cơm nghen con. mẹ có chuyện muốn nói'],
 ['~','Xưa giờ mẹ hiếm khi nhắn tin kiểu này lắm. Chắc ở nhà có chuyện gì rồi.']]);
X('z_thoai','Za Lô · Bin nhắn',[
 ['#Bin','anh ơi anh Lộc nói ảnh biết một ông chạy ghe ở bến sát biên'],
 ['#Bin','tên Thoại. ra bến hỏi là ai cũng chỉ, mà ổng chỉ nhận tiền mặt'],
 ['#> Bin','Cảm ơn em. Đừng kể ai nghe nha.'],
 ['#Bin','em có kể ai đâu 🤐']]);
X('z_gom','Za Lô · nhóm hẻm',[
 ['@Bà Sáu','Thằng nhỏ ở phòng số 3 nhà bà sắp đi có công chuyện hệ trọng. Đang kẹt tiền.'],
 ['@Bà Sáu','Nhà ai dư dả thì phụ nó chút đỉnh, hổng có thì thôi, bà hổng ép.'],
 ['@Tám Hớt Tóc','chuyện gì mà lớn dữ bà Sáu'],
 ['@Bà Sáu','Chuyện đi cứu người ta. Đừng có hỏi tò mò, bà hổng nói thêm đâu.']]);
X('z_a_chot','Za Lô · Ngân nhắn',[
 ['#Ngân','11h khuya nay tui qua phòng 3. Bàn dứt điểm coi ai là người đi vô trển.'],
 ['#Ngân','đừng có đi ngang tạp hóa, mẹ tui còn thức']]);
X('z_b_bin','Za Lô · Bin nhắn',[
 ['#Bin','anh Lâm, bà Sáu nói anh tính đi kiếm chị Ngân hả'],
 ['#Bin','cần chạy đâu em chở, khỏi tiền xăng'],
 ['#> Bin','Để anh coi đã. Đừng nói bà Sáu là anh nhắn em.']]);
X('z_b_huong','Za Lô · nhắn Hương',[
 ['#> Hương','Chị cho tôi gặp 15 phút. Chuyện cái trại ở Ba Vẹt.'],
 ['~','Hiện chữ "Đã xem" nửa tiếng đồng hồ rồi mà cổ vẫn im re.'],
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
.mt7 .mtw .mtt span{display:block}.mt7 .mtw .mtt span b{display:inline!important;margin:0 3px}
.mt7 main,.mt7 .mtb{background:#0b0c0f!important}
.mt7{position:relative;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100%;padding:14px 18px;box-sizing:border-box;color:#e8e1d0;font:400 15px/1.45 Newsreader,Georgia,serif}
.mt7 .mtbg{position:absolute;inset:0;z-index:0;background:linear-gradient(rgba(6,7,9,.35),rgba(6,7,9,.55)),url(img2/x2-maytram.webp) center/cover;filter:blur(2px) brightness(.7);pointer-events:none}
.mt7 .mon{position:relative;z-index:1;width:min(1180px,100%);aspect-ratio:16/9.4;max-height:calc(100% - 10px);background:#0b0c0f;border:14px solid #15161a;border-bottom-width:22px;border-radius:12px;box-shadow:0 30px 80px rgba(0,0,0,.7),inset 0 0 0 1px #26272c;display:grid;grid-template-columns:150px 1fr;overflow:hidden}
.mt7 nav{background:#101116;border-right:1px solid #22232a;display:flex;flex-direction:column;padding:12px 8px;gap:4px}
.mt7 nav button{display:flex;flex-direction:column;align-items:center;gap:6px;padding:12px 4px;background:none;border:1px solid transparent;border-radius:8px;color:#c9c2b2;font:400 14px/1.2 Newsreader,Georgia,serif;cursor:pointer}
.mt7 nav button svg{width:26px;height:26px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
.mt7 nav button:hover{color:#fff;background:#18191f}
.mt7 nav button.on{background:#2a2216;border-color:#6b5428;color:#e3b05b}
.mt7 nav .sp{flex:1}
.mt7 nav .off{color:#e2645c}
.mt7 main{display:flex;flex-direction:column;min-width:0;min-height:0}
.mt7 .mtw{display:flex;align-items:center;gap:14px;padding:16px 22px 10px;border-bottom:1px solid #1f2026}
.mt7 .mtw h4{margin:0;font:600 26px/1 Newsreader,Georgia,serif;text-transform:uppercase;letter-spacing:.04em;color:#e3b05b;display:flex;align-items:center;gap:12px}
.mt7 .mtw h4 svg{width:26px;height:26px;fill:none;stroke:#e3b05b;stroke-width:2}
.mt7 .mtw p{margin:4px 0 0;color:#b4ad9d;font-size:15px}
.mt7 .mtw .mtt{margin-left:auto;display:flex;flex-direction:column;align-items:flex-end;gap:5px;font:400 13px/1 "Be Vietnam Pro",sans-serif;color:#b4ad9d;white-space:nowrap}
.mt7 .mtw .mtt b{color:#ff8a7c;font-weight:600}
.mt7 .mtw .mtt i{display:block;width:170px;height:5px;border-radius:3px;background:#24252b;overflow:hidden}
.mt7 .mtw .mtt i em{display:block;height:100%;background:linear-gradient(90deg,#e3b05b,#d8382b)}
.mt7 .mtc{display:flex;gap:16px;margin-left:16px;color:#9a9486}.mt7 .mtc button{background:none;border:0;color:inherit;font-size:18px;cursor:pointer;padding:2px 4px}.mt7 .mtc button:hover{color:#fff}
.mt7 .mtb{flex:1;min-height:0;overflow:auto;padding:16px 22px 18px}
.mt7 table{width:100%;border-collapse:collapse;font-size:15px}
.mt7 th{text-align:left;font-weight:400;color:#b4ad9d;padding:10px 12px;border-bottom:1px solid #26272d;background:#121318}
.mt7 td{padding:11px 12px;border-bottom:1px solid #1d1e23}
.mt7 tr.me td{background:#4a1a18}
.mt7 .mtbar{display:inline-block;width:110px;height:7px;border-radius:4px;background:#26272d;vertical-align:middle;margin-right:8px;overflow:hidden}.mt7 .mtbar em{display:block;height:100%;background:#c9a46a}.mt7 .mtbar em.lo{background:#d8382b}
.mt7 .mttag{display:inline-block;font:500 12.5px/1 "Be Vietnam Pro",sans-serif;padding:5px 9px;border-radius:5px;background:#203226;color:#8fd0a2}.mt7 .mttag.no{background:#3a1715;color:#ff8a7c}
.mt7 .mtg2{display:grid;grid-template-columns:1fr 300px;gap:16px;align-items:start}
.mt7 .mtcard{background:#111216;border:1px solid #22232a;border-radius:8px;padding:16px}
.mt7 .mtcard h5{margin:0 0 12px;font:500 14px/1 "Be Vietnam Pro",sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#b4ad9d}
.mt7 .mtbig{font:600 30px/1.1 Newsreader,serif;color:#e3b05b}
.mt7 .mtm{color:#9a9486;font-size:13.5px}
.mt7 .mtchat{display:grid;grid-template-columns:240px 1fr;height:100%;min-height:0;border:1px solid #22232a;border-radius:8px;overflow:hidden}
.mt7 .mtchat .ls{background:#101116;border-right:1px solid #22232a;overflow:auto}
.mt7 .mtchat .ls div{display:flex;gap:10px;padding:12px;border-bottom:1px solid #1b1c21;font-size:14px}
.mt7 .mtchat .ls div.on{background:#2a2216;box-shadow:inset 3px 0 0 #e3b05b}
.mt7 .mtchat .ls i{flex:none;width:38px;height:38px;border-radius:50%;background:#26272d;display:grid;place-items:center;font:600 14px "Be Vietnam Pro",sans-serif;font-style:normal;color:#c9c2b2}
.mt7 .mtchat .ls b{display:block;font-weight:500;color:#e8e1d0}.mt7 .mtchat .ls span{color:#9a9486;font-size:12.5px;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:160px}
.mt7 .mtchat .ms{display:flex;flex-direction:column;gap:12px;padding:16px;overflow:auto}
.mt7 .mtchat .ms .h{display:flex;align-items:center;gap:10px;padding-bottom:10px;border-bottom:1px solid #1d1e23;font-size:17px}
.mt7 .mtchat .ms .h small{display:block;color:#9a9486;font-size:13px}
.mt7 .mtbub{max-width:78%;background:#1a1b21;border:1px solid #26272d;border-radius:4px 12px 12px 12px;padding:9px 13px}
.mt7 .mtbub b{display:block;font:500 13px/1.3 "Be Vietnam Pro",sans-serif;color:#e3b05b;margin-bottom:2px}
.mt7 .mtbub.voice{display:flex;align-items:center;gap:10px}
.mt7 .mtbub.voice .wv{display:flex;gap:2px;align-items:center;height:20px}.mt7 .mtbub.voice .wv i{width:3px;background:#9a9486;border-radius:2px}
.mt7 .mtfiles{display:flex;flex-direction:column;gap:8px}
.mt7 .mtfile{display:flex;align-items:center;gap:14px;padding:12px 14px;background:#111216;border:1px solid #22232a;border-radius:8px;cursor:pointer;text-align:left;color:inherit;font:inherit}
.mt7 .mtfile:hover{border-color:#6b5428}
.mt7 .mtfile svg{width:30px;height:30px;fill:none;stroke:#5fb37a;stroke-width:1.6}
.mt7 .mtsheet td{font:400 13.5px "IBM Plex Mono",monospace;color:#5a5a60;text-decoration:line-through}
.mt7 .mtsheet tr.ok td{color:#e8e1d0;text-decoration:none;background:#2a2216}
.mt7 .mthome{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.mt7 .mthome button{display:flex;flex-direction:column;align-items:center;gap:10px;padding:22px 10px;background:#111216;border:1px solid #22232a;border-radius:10px;color:#e8e1d0;font:inherit;cursor:pointer}
.mt7 .mthome button:hover{border-color:#6b5428}
.mt7 .mthome svg{width:36px;height:36px;fill:none;stroke:#e3b05b;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
.mt7 .mthome small{color:#9a9486;font-size:13px}
.mt7 .mtwarn{margin-top:16px;padding:12px 14px;border-left:3px solid #e3b05b;background:#16140f;color:#d6cdb6}
@media (max-width:760px){
 .mt7{padding:6px}.mt7 .mon{grid-template-columns:1fr;grid-template-rows:auto 1fr;aspect-ratio:auto;height:100%;border-width:6px}
 .mt7 nav{flex-direction:row;overflow-x:auto;padding:6px;border-right:0;border-bottom:1px solid #22232a}.mt7 nav button{flex:none;padding:6px 8px;font-size:12px}.mt7 nav button svg{width:20px;height:20px}.mt7 nav .sp{display:none}
 .mt7 .mtw{flex-wrap:wrap;padding:10px 12px}.mt7 .mtw h4{font-size:19px}.mt7 .mtw .mtt{margin-left:0;align-items:flex-start;width:100%}.mt7 .mtc{display:none}
 .mt7 .mtb{padding:10px}.mt7 .mtg2{grid-template-columns:1fr}.mt7 .mtchat{grid-template-columns:1fr}.mt7 .mtchat .ls{display:none}.mt7 .mthome{grid-template-columns:repeat(2,1fr)}
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
    if(tab==='home') return '<div class="mthome">'+APP.slice(1).map(([k,l])=>'<button type="button" data-app="'+k+'">'+MTI[k]+l+'</button>').join('')+'</div>';
    if(tab==='nhom') return '<div class="mtchat"><div class="ls"><div class="on"><i>QL</i><div><b>QL khu B</b><span>'+esc(MT_NHOM[MT_NHOM.length-1][1])+'</span></div></div></div><div class="ms"><div class="h"><div>QL khu B</div></div>'+
      MT_NHOM.map(([a,t])=>{ const v=/^\[Tin thoại ([^\]]+)\]\s*(.*)$/.exec(t); return v?'<div class="mtbub voice"><div><b>'+esc(a)+'</b><span class="wv">'+[6,12,18,9,15,7,13,19,10,6,14,8].map(h=>'<i style="height:'+h+'px"></i>').join('')+'</span></div><span class="mtm">'+esc(v[1])+'</span></div><div class="mtm" style="margin:-6px 0 0 4px">'+esc(v[2])+'</div>':'<div class="mtbub"><b>'+esc(a)+'</b>'+esc(t)+'</div>'; }).join('')+'</div></div>';
    if(tab==='kh') return '<table><tr><th>Khách</th><th>Hồ sơ</th><th>Trạng thái</th></tr>'+(KH.length?KH.map(k=>'<tr><td>'+esc(k.ten)+'</td><td class="mtm">'+esc(k.ho||'')+'</td><td><span class="mttag no">đã chuyển tiền</span></td></tr>').join(''):'<tr class="me"><td colspan="3">Tháng này tổ 3 chưa chốt được ai. Dòng của mình tô đỏ.</td></tr>')+'</table><div class="mtwarn">Cuối bảng: "Tổ con mèo · 31 khách · tháng 7".</div>';
    if(tab==='bang'){ const L=[ME].concat(ds.map(p=>p.ten)).slice(0,8).map((n,i)=>({n,v:n===ME?CT():((n.length*7+i*3)%6)})); const me=L[0];
      return '<div class="mtg2"><table><tr><th>STT</th><th>Nhân viên</th><th>Đơn tuần</th><th>Hoàn thành</th><th>Trạng thái</th></tr>'+L.map((r,i)=>'<tr class="'+(r.n===ME?'me':'')+'"><td>'+(i+1)+'</td><td>'+esc(r.n)+'</td><td>'+r.v+' / 3</td><td><span class="mtbar"><em class="'+(r.v<3?'lo':'')+'" style="width:'+Math.min(100,Math.round(r.v/3*100))+'%"></em></span></td><td><span class="mttag'+(r.v<3?' no':'')+'">'+(r.v<3?'Chưa đạt':'Đạt')+'</span></td></tr>').join('')+'</table>'+
        '<div class="mtcard"><h5>Chi tiết</h5><div style="font-size:19px">'+esc(ME)+'</div><div class="mtm">Tổ 3</div><div style="margin-top:14px" class="mtm">Đơn tuần này</div><div class="mtbig">'+me.v+' / 3</div></div></div>'; }
    return file?'<button type="button" class="mtfile" data-file="0">'+MTI.xls+'<div><b>danhsach_chuyen_thang6.xlsx</b><div class="mtm">13 dòng đã xóa.</div></div></button><table class="mtsheet" style="margin-top:12px">'+Array.from({length:13},(_,i)=>'<tr><td>'+(i+1)+'</td><td>████████████</td><td>██████████████</td></tr>').join('')+'<tr class="ok"><td>14</td><td>Nguyễn Thị Oanh</td><td>chuyển giao đối tác (Miến Điện)</td></tr></table>'
      :'<div class="mtfiles"><button type="button" class="mtfile" data-file="1">'+MTI.xls+'<div><b>danhsach_chuyen_thang6.xlsx</b><div class="mtm">13 dòng đã xóa. Bấm để mở.</div></div></button></div>'; };
  const draw=()=>{ const [h,sub]=TT[tab];
    p2open('<div class="mt7"><div class="mtbg"></div><div class="mon"><nav>'+APP.map(([k,l])=>'<button type="button" data-app="'+k+'" class="'+(tab===k?'on':'')+'">'+MTI[k]+esc(l)+'</button>').join('')+'<span class="sp"></span><button type="button" class="off" id="mtX2">'+MTI.off+'Tắt màn hình</button></nav>'+
      '<main><div class="mtw"><div><h4>'+MTI[tab]+esc(h)+'</h4><p>'+esc(sub)+'</p></div><div class="mtt">Còn <b id="mtT">'+left+'</b> giây trước khi có người quay lại<i><em id="mtB" style="width:'+(left/45*100)+'%"></em></i></div><div class="mtc"><button type="button" aria-label="Tắt màn hình" id="mtX3">×</button></div></div><div class="mtb">'+body()+'</div></main></div></div>',()=>fin(false));
    document.querySelectorAll('.mt7 [data-app]').forEach(b=>b.onclick=()=>{ tab=b.dataset.app; file=false; draw(); });
    document.querySelectorAll('.mt7 [data-file]').forEach(b=>b.onclick=()=>{ file=b.dataset.file==='1'; draw(); });
    $('mtX2').onclick=$('mtX3').onclick=()=>fin(false); };
  const fin=late=>{ if(done) return; done=true; clearInterval(iv); p2close(); setCo('x_maytram');
    if(seen.nhom&&!hasC('x_vi')) { fx('+cc:x_vi'); toast('Manh mối mới: ví tổng tối Chủ nhật'); }
    if(seen.nhom) setCo('x_biet_thu6');
    if(late) fx('+nghi:8'); res(late); };
  const iv=setInterval(()=>{ left=Math.max(0,45-Math.floor((performance.now()-T0)/1000)); const t=$('mtT'), bb=$('mtB'); if(t) t.textContent=left; if(bb) bb.style.width=(left/45*100)+'%'; if(left<=0){ toast('Tiếng dép ngoài hành lang. Lủi ra không kịp, Chị Bảy thấy mình đứng gần máy.'); fin(true); } },500);
  draw(); }); }
P2GAMES.maytram=async()=>{ const late=await gMayTram(); if(late){ await say('thoai','Chị Bảy','Đứng đây làm gì. Về bàn.'); hideDlg(); } };

/* ---------- 4. LỘ RÕ HƠN: mò thùng nước ban ngày, lén về máy trạm giờ cơm ---------- */
X('x_mothung_act','Buồng tắm',[['~','Thùng nhựa đựng nước tắm. Nghe tụi nhỏ dặn dưới đáy thùng có dán giấu cái đt cũ.'],{game:'mothung'}]);
P2DATA.ACT.push({id:'x_mothung',h:2,hx:3,d:[9,19],who:'o:thung',k:'x_mothung_act',t:'Mò dưới đáy thùng nước',sub:'nghe nói có cái máy dán dưới đó',c:'co:x_biet_may !co:x_may',until:'co:x_may',cost:15});
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
.kh .kh-ln u{text-decoration:none;border-bottom:2px dashed #8a2f25;padding:0 4px;color:#8a2f25;font-family:"Playpen Sans","Comic Sans MS",cursive;font-size:17px}
.kh .kh-ln u.empty{color:#9a8f7a;border-color:#9a8f7a}
.kh .kh-ops{grid-column:2;display:flex;flex-wrap:wrap;gap:6px;margin-top:4px}
.kh .kh-ops button{font:14px "Be Vietnam Pro",sans-serif;background:#fff8ea;color:#2a241a;border:1px solid #b9ab8e;border-radius:999px;padding:6px 12px;cursor:pointer}
.kh .kh-ops button.on{background:#8a2f25;color:#fff;border-color:#8a2f25}
.kh .kh-ops button:disabled{opacity:.45;cursor:not-allowed;font-style:italic}
.kh .kh-ky{display:flex;justify-content:flex-end;margin-top:10px;font:15px "Playpen Sans",cursive;color:#5a5040}
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
    $('bdOk').onclick=()=>{ let sc=0; for(const s of sents){ const id=sel[s.ma]; const r=T[IDX[id]]; if(r&&r.sau==='dung') sc++; S.ch[id]=1; S.ch[id.replace(/(_[a-z])\d+$/,'$1')]=1; }
      S.tin['bang_'+vu]=sc; setCo('bao_'+vu); save(); sent=true; draw(); try{ tone(180,.15,.05,'square'); }catch(e){}
      setTimeout(()=>{ p2close(); toast('Đúng '+sc+'/'+sents.length); res(sc); },1300); }; };
  draw(); }); };

/* ---------------- việc ban đêm: cho người chơi biết việc nào mở ra, nghe từ đâu ---------------- */
const MUC_NGUON={may:'Thủy với tổ 3 kể: có cái điện thoại dán dưới đáy thùng nước buồng tắm.',tuan0:'Muốn tính đường ra thì phải biết giờ lính đi qua cửa sau.',tuan3:'Sơ đồ trại còn thiếu lầu ba.',
  kim:'Anh Lộc nói tụi bảo vệ bỏ quên cây kìm trên nóc tủ chén.',rao:'Có kìm rồi, cắt được rào sau bếp.',cua:'Đã có chìa cửa sau từ Chị Bảy.',nghe:'Đêm đêm văn phòng lầu ba có tiếng nghe tin thoại.',
  gapngan:'Ngân hẹn ở buồng tắm.',thuy:'Thủy hẹn ở buồng tắm.'};
Object.keys(MUC).forEach(k=>{ if(MUC_NGUON[k]) MUC[k].why=MUC[k].why+' '+MUC_NGUON[k]; });
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
