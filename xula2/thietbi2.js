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
 ['#Hương','địa chỉ ví con bé Phương gửi tôi, tôi chuyển qua ông rồi đó'],
 ['#Hương','dò ngược từ mấy lệnh tối Chủ nhật mà lên. đừng ngồi đọc bình luận nữa'],
 ['~','Mở laptop là dò được.']]);
X('z_vinh','Za Lô · đại úy Vinh',[
 ['#Đại úy Vinh','Nhắc lại: vị trí, số người, giờ trống. Đủ 3 cái mới làm được.'],
 ['#Đại úy Vinh','Đừng nhắn tên tôi trong bất kỳ tin nào gửi ra.']]);
X('z_a_thoa','Za Lô · mẹ nhắn',[
 ['#Cô Thoa','tối về ăn cơm nghen con. mẹ có chuyện muốn nói'],
 ['~','Mẹ ít khi nhắn tin. Mẹ gọi thẳng, hoặc không nói gì hết.']]);
X('z_thoai','Za Lô · Bin nhắn',[
 ['#Bin','anh ơi anh Lộc nói ảnh biết một ông chạy ghe ở bến sát biên'],
 ['#Bin','tên Thoại. ra bến hỏi là ai cũng chỉ, mà ổng chỉ nhận tiền mặt'],
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
 ['#> Hương','Chị cho tôi gặp 15 phút. Chuyện cái trại ở Ba Vẹt.'],
 ['~','Tin đã xem. Nửa tiếng không trả lời.'],
 ['#Hương','8 giờ, Thảo Điên. trễ là tôi về']]);
X('z_b_vinh','Za Lô · Hương nhắn',[
 ['#Hương','muốn làm thiệt thì lên phường gặp đại úy Vinh'],
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
function gMayTram(){ return new Promise(res=>{ let tab='kh', left=45, seen={}, done=false; const T0=performance.now();
  const ds=(typeof dsCon==='function'?dsCon():[]);
  const KH=(S.so||[]).slice(-6).map(s=>{ const [ten,ho]=s.split(' · '); return {ten,ho,tien:''}; });
  const APP=[['kh','Khách hàng'],['nhom','Nhóm quản lý'],['bang','Bảng chỉ tiêu'],['rac','Thùng rác']];
  const body=()=>{ seen[tab]=1;
    if(tab==='kh') return '<p class="tip">Danh sách khách tổ 3 đã "chốt" tháng này.</p>'+(KH.length?KH.map(k=>'<div class="p2opt"><b>'+esc(k.ten)+'</b><br><span style="color:#9aa2b5">'+esc(k.ho||'')+'</span> · <span style="color:#e2645c">đã chuyển tiền</span></div>').join(''):'<div class="p2opt">Tháng này tổ 3 chưa chốt được ai. Dòng của mình tô đỏ.</div>')+'<p class="tip">Cuối bảng: "Tổ con mèo · 31 khách · tháng 7".</p>';
    if(tab==='nhom') return '<p class="tip">Nhóm "QL khu B". Chị Bảy quên đăng xuất.</p>'+MT_NHOM.map(([a,t])=>'<div class="p2msg"><b style="color:#f0b25c">'+esc(a)+'</b><br>'+esc(t)+'</div>').join('');
    if(tab==='bang') return '<p class="tip">Bảng chỉ tiêu tuần. Tên dưới 3 đơn tô đỏ.</p>'+[ME].concat(ds.map(p=>p.ten)).slice(0,8).map((n,i)=>{ const v=n===ME?CT():((n.length*7+i*3)%6); return '<div class="p2opt" style="display:flex;justify-content:space-between"><span>'+esc(n)+'</span><b style="color:'+(v<3?'#e2645c':'#5fb37a')+'">'+v+' đơn</b></div>'; }).join('');
    return '<p class="tip">Thùng rác: 1 tệp.</p><div class="p2opt"><b>danhsach_chuyen_thang6.xlsx</b><br>13 dòng đã xóa. Dòng cuối còn đọc được: "Nguyễn Thị Oanh · chuyển bãi K-Kay".</div>'; };
  const draw=()=>{ p2open('<div style="position:absolute;inset:0;z-index:0;background:linear-gradient(rgba(10,12,18,.66),rgba(10,12,18,.88)),url(img2/x2-maytram.webp) center/cover;border-radius:inherit;pointer-events:none"></div><div style="position:relative;z-index:1"><h3>Máy trạm · Chị Bảy</h3><div class="p2bar" style="margin:0 0 8px"><span class="tip" style="margin:0">Còn <b id="mtT">'+left+'</b> giây trước khi có người quay lại</span></div><div class="tbar" style="height:6px;background:#232a3d;border-radius:3px;overflow:hidden;margin-bottom:10px"><b id="mtB" style="display:block;height:100%;width:'+(left/45*100)+'%;background:linear-gradient(90deg,#f0b25c,#e2645c)"></b></div>'+
      '<div style="display:grid;grid-template-columns:150px 1fr;gap:12px"><nav style="display:flex;flex-direction:column;gap:6px">'+APP.map(([k,l])=>'<button type="button" class="btn'+(tab===k?' p2main':' ghost')+'" data-app="'+k+'" style="text-align:left">'+esc(l)+'</button>').join('')+'</nav><div>'+body()+'</div></div>'+
      '<div class="p2bar"><span></span><button class="btn p2main" id="mtX2" type="button">Tắt màn hình, đi ra</button></div></div>',()=>fin(false));
    document.querySelectorAll('[data-app]').forEach(b=>b.onclick=()=>{ tab=b.dataset.app; draw(); }); $('mtX2').onclick=()=>fin(false); };
  const fin=late=>{ if(done) return; done=true; clearInterval(iv); p2close(); setCo('x_maytram');
    if(seen.nhom&&!hasC('x_vi')) { fx('+cc:x_vi'); toast('Manh mối mới: ví tổng tối Chủ nhật'); }
    if(seen.nhom) setCo('x_biet_thu6');
    if(late) fx('+nghi:8'); res(late); };
  const iv=setInterval(()=>{ left=Math.max(0,45-Math.floor((performance.now()-T0)/1000)); const t=$('mtT'), bb=$('mtB'); if(t) t.textContent=left; if(bb) bb.style.width=(left/45*100)+'%'; if(left<=0){ toast('Tiếng dép ngoài hành lang. Lủi ra không kịp, Chị Bảy thấy mình đứng gần máy.'); fin(true); } },500);
  draw(); }); }
P2GAMES.maytram=async()=>{ const late=await gMayTram(); if(late){ await say('thoai','Chị Bảy','Đứng đây làm gì. Về bàn.'); hideDlg(); } };
