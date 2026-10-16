/* Hẻm 47 · Phần 2 — bốn cơ chế mới: ca nhắn tin, tin giấu chữ, đi đêm, đêm giải cứu. Cộng màn giải mã chữ đầu câu. */
'use strict';
const bo=s=>String(s).normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D');

/* =====================================================================
   1. CA NHẮN TIN LỪA
   Mỗi khách 3 lượt. Mỗi lượt ba tin: đúng kịch bản, tin lạnh, và một tin có chữ cài lỗi được.
   Chạm chữ gạch vàng để cài lỗi (sau khi biết mẹo). Kết quả mỗi khách: mất tiền / tỉnh ra / bỏ đi.
   ===================================================================== */
const KHACH=[
 {id:'k1',ten:'Chú Lành',av:'av-07',ho:'62 tuổi, về hưu, con ở xa',kieu:'Làm quen · người thành đạt ở nước ngoài',
  vao:'ai vậy con, chú hông có lưu số này',
  luot:[
   {k:'ủa có chuyện gì hông con',d:'Dạ con là Vy, con làm kế toán bên Úc, con lỡ nhắn nhầm, mà nói chuyện với chú thấy dễ thương quá…',l:'Dạ con xin lỗi, con nhắn lộn số.',w:['kế toán','kế tóan']},
   {k:'con ở Úc mà rành tiếng Việt dữ',d:'Dạ con về nước hoài chú. Bữa nay con mới có lời, con đang chơi một app vàng, cô chú bên này ai cũng…',l:'Dạ, thôi con chào chú.',w:['có lời','có lơi']},
   {k:'app gì con, chú già rồi hông biết mấy cái đó',d:'Chú nạp thử năm trăm thôi, con chỉ chú rút liền, có lời thiệt chú mới chơi tiếp nha chú…',l:'Dạ chú hông rành thì thôi chú.',w:['rút liền','rút liên']}]},
 {id:'k2',ten:'Hạnh Nguyên',av:'av-12',ho:'31 tuổi, mới mất việc ở xưởng may',kieu:'Làm nhiệm vụ mạng',
  vao:'chị thấy bài tuyển cộng tác viên like video, còn tuyển hông em',
  luot:[
   {k:'làm sao vậy em, chị chưa làm bao giờ',d:'Dạ dễ lắm chị, mỗi video chị bấm thích là được 15 ngàn, làm trên điện thoại ở nhà…',l:'Dạ bên em đủ người rồi chị.',w:['15 ngàn','15 ngan']},
   {k:'ủa có tiền thiệt nè, cảm ơn em nha',d:'Dạ giờ chị lên nhiệm vụ cấp 2 nha, chị nạp hai triệu để mở, xong nhiệm vụ hoàn lại cả gốc lẫn…',l:'Dạ chị làm vậy là đủ rồi.',w:['hoàn lại','hòan lại']},
   {k:'hai triệu hả em, chị đang kẹt tiền nhà',d:'Chị yên tâm, hệ thống bên em uy tín, chị chuyển vô tài khoản này giùm em, trễ là mất lượt…',l:'Dạ vậy chị thôi đi chị.',w:['chuyển','chuyễn']}]},
 {id:'k3',ten:'Anh Quý',av:'av-21',ho:'38 tuổi, đang nợ app',kieu:'Tuyển việc nhẹ lương cao',
  vao:'em ơi bài tuyển lương 30 triệu còn hông',
  luot:[
   {k:'việc gì vậy em, anh học hết lớp 9 thôi',d:'Dạ việc văn phòng, gõ máy thôi anh, bao ăn ở, bên em lo hết giấy tờ, đi liền trong tuần…',l:'Dạ vị trí đó tuyển đủ rồi anh.',w:['bao ăn ở','bao ăn ơ']},
   {k:'làm ở đâu em',d:'Dạ bên công ty đối tác ở Tây Ninh, gần cửa khẩu, anh khám sức khỏe xong là xe tới rước…',l:'Dạ em hỏi lại rồi báo anh sau.',w:['cửa khẩu','cửa khẫu']},
   {k:'anh hơi sợ, nghe người ta nói bị lừa qua Cam',d:'Anh cứ tin em, bao nhiêu người đi rồi gửi tiền về hết. Anh gửi em hình căn cước để em giữ suất…',l:'Dạ anh sợ thì thôi anh.',w:['giữ suất','giữ xuất']}]},
 {id:'k4',ten:'Cô Ba Dung',av:'av-03',ho:'58 tuổi, bán rau ở chợ',kieu:'App đầu tư giả, có "thầy" dẫn',
  vao:'thầy ơi con bà Tư giới thiệu, thầy chỉ cô cách đầu tư với',
  luot:[
   {k:'cô tiền ít lắm, có được hông thầy',d:'Dạ được cô, cô vô nhóm của thầy, mỗi sáng thầy báo mã, cô làm theo là có lời mỗi ngày…',l:'Dạ cô hỏi lại người nhà rồi tính nha cô.',w:['mỗi ngày','mổi ngày']},
   {k:'bữa trước cô rút được ba trăm, mừng quá',d:'Dạ đó là mới thử thôi cô. Giờ có kèo lớn, cô vô năm chục triệu, cuối tuần thầy trả về gấp…',l:'Dạ cô đừng bỏ nhiều nha cô.',w:['gấp','gâp']},
   {k:'năm chục là tiền hụi của cô đó thầy',d:'Cô tin thầy, chuyển trước 3 giờ chiều, trễ là hệ thống khóa lệnh, mất phần của cô…',l:'Dạ vậy cô giữ tiền hụi đi cô.',w:['khóa lệnh','khoá lênh']}]},
 {id:'k5',ten:'Minh Thư',av:'av-16',ho:'24 tuổi, đang tìm việc',kieu:'Làm quen · yêu đương qua mạng',
  vao:'anh ơi hôm qua anh nói mai gọi video mà',
  luot:[
   {k:'sao anh hông gọi video được vậy',d:'Camera anh hư, anh đang ở Singapore làm dự án, về anh dẫn em đi ăn, thương em lắm…',l:'Anh bận quá, thôi để bữa khác.',w:['Singapore','Singapo']},
   {k:'em nhớ anh',d:'Anh có món quà gửi về cho em, hải quan giữ lại, em đóng giùm anh phí thông quan…',l:'Anh hông muốn làm phiền em nữa.',w:['thông quan','thông quang']},
   {k:'bao nhiêu anh, em có chút tiền dành dụm',d:'Mười lăm triệu thôi em, anh về anh trả lại em gấp đôi, em chuyển vô tài khoản này nha…',l:'Thôi em giữ tiền đi.',w:['gấp đôi','gấp đôí']}]},
 {id:'k6',ten:'Anh Tài',av:'av-25',ho:'45 tuổi, chạy xe ôm',kieu:'App đầu tư giả',
  vao:'em ơi app vàng này rút tiền sao vậy',
  luot:[
   {k:'anh nạp một triệu rồi, giờ muốn rút',d:'Dạ tài khoản anh đang lời, muốn rút anh phải đóng phí xác minh hai triệu, xong rút về liền…',l:'Dạ app đang bảo trì anh.',w:['xác minh','xác mịnh']},
   {k:'sao lại đóng nữa em',d:'Dạ quy định sàn anh, ai cũng đóng hết, đóng xong là tiền về tài khoản anh trong mười phút…',l:'Dạ em cũng hông rõ anh.',w:['mười phút','mươi phút']},
   {k:'thôi anh đóng, rút giùm anh nha',d:'Dạ anh chuyển vô số tài khoản bên dưới, ghi nội dung là mã của anh, em duyệt liền…',l:'Dạ anh đừng đóng nữa anh.',w:['duyệt','duyêt']}]}
];
function caNhan(soKhach,opt={}){ return new Promise(async res=>{
  const ds=[]; const pool=KHACH.slice(); for(let i=0;i<soKhach;i++){ const k=pool.splice((S.ngay*7+i*3+(S.so.length))%pool.length,1)[0]; ds.push(k); if(!pool.length) pool.push(...KHACH); }
  const out={chot:0,tinh:0,bo:0};
  for(const k of ds){
    const B=ov('Ca nhắn tin · '+k.ten,'Chỉ tiêu ngày: '+(S.f.chitieu||0)+'/3');
    const sendHtml=[];
    const draw=(extra)=>{ B.innerHTML='<div class="tag" style="text-align:center;margin-bottom:6px">'+esc(k.ten)+' · '+esc(k.ho)+'<br>kịch bản: '+esc(k.kieu)+'</div><div class="chat" id="cht">'+sendHtml.join('')+'</div>'+(extra||''); const c=$('cht'); B.scrollTop=B.scrollHeight; };
    sendHtml.push('<div class="msg k">'+esc(k.vao)+'</div>'); draw();
    let loi=false, lanh=false;
    for(let t=0;t<k.luot.length&&!lanh;t++){
      const L=k.luot[t]; if(t>0){ sendHtml.push('<div class="msg k">'+esc(L.k)+'</div>'); }
      const mepo=has('meo_cailoi'); const dw=esc(L.d).replace(esc(L.w[0]),mepo?'<span class="w" id="ww">'+esc(L.w[0])+'</span>':esc(L.w[0]));
      draw('<div class="opts"><div class="opt"><span class="tag">ĐÚNG KỊCH BẢN</span><br>'+dw+'<div class="row" style="margin-top:6px"><button class="btn" id="oD" type="button">Gửi</button></div></div><div class="opt"><span class="tag">TIN LẠNH · khách bỏ đi</span><br>'+esc(L.l)+'<div class="row" style="margin-top:6px"><button class="btn ghost" id="oL" type="button">Gửi tin này</button></div></div>'+(mepo?'<div class="tag">Chạm chữ gạch vàng để cài lỗi, như Ngân từng làm.</div>':'')+'</div>');
      let thisLoi=false;
      const ww=$('ww'); if(ww) ww.onclick=e=>{ e.stopPropagation(); thisLoi=!thisLoi; ww.textContent=thisLoi?L.w[1]:L.w[0]; ww.classList.toggle('loi',thisLoi); };
      const pick=await new Promise(r=>{ $('oD').onclick=()=>r('d'); $('oL').onclick=()=>r('l'); });
      if(pick==='l'){ sendHtml.push('<div class="msg m">'+esc(L.l)+'</div>'); lanh=true; break; }
      const txt=thisLoi?L.d.replace(L.w[0],L.w[1]):L.d; if(thisLoi) loi=true;
      sendHtml.push('<div class="msg m">'+esc(txt)+'</div>'); draw(); await wait(500);
    }
    let kq;
    if(lanh){ kq='bo'; sendHtml.push('<div class="msg sys">'+esc(k.ten)+' đã rời cuộc trò chuyện.</div>'); }
    else if(loi){ kq='tinh'; sendHtml.push('<div class="msg k">ủa sao chữ này viết kỳ vậy… thôi để hỏi con cái rồi tính</div><div class="msg sys">'+esc(k.ten)+' đã chặn bạn. Tiền còn nguyên.</div>'); }
    else { kq='chot'; sendHtml.push('<div class="msg k">đã chuyển rồi nha</div><div class="msg sys">🔔 Chuông chốt đơn. '+esc(k.ten)+' vừa mất tiền.</div>'); S.so.push(k.ten+' · '+k.ho); }
    out[kq]++; if(kq==='chot') S.f.chitieu=(S.f.chitieu||0)+1;
    draw('<div class="row" style="justify-content:center"><button class="btn" id="oN" type="button">Tiếp</button></div>');
    if(loi&&Math.random()<.35){ if((S.tin.bay||0)>=3){ sendHtml.push('<div class="msg sys">Chị Bảy đọc lướt tin của bạn, dừng ở chữ sai, rồi lướt qua.</div>'); } else { sendHtml.push('<div class="msg sys">Chị Bảy đọc lướt tin của bạn, dừng ở chữ sai. Chị nhìn bạn một lúc lâu.</div>'); nghi(12); } draw('<div class="row" style="justify-content:center"><button class="btn" id="oN" type="button">Tiếp</button></div>'); }
    await new Promise(r=>$('oN').onclick=r);
  }
  ovClose(); res(out);
}); }
/* tua nhanh (montage) từ ngày thứ ba trong trại */
async function caMontage(){ const i=await choose([{t:'Nhắn đúng kịch bản cả ca',sub:'đủ chỉ tiêu, ba người mất tiền'},{t:'Cài lỗi vào hết',sub:'khách tỉnh ra, thiếu chỉ tiêu, bị phạt và bị nghi'},{t:'Ngồi nhắn từng khách',sub:'chơi đủ ca'}],{q:'Tiếng gõ phím. Bảng chỉ tiêu nhảy số. Lại một ca.'});
  if(i===2) return null;
  if(i===0){ const n=3-(S.f.chitieu||0); for(let j=0;j<n;j++) S.so.push(KHACH[(S.ngay+j)%KHACH.length].ten+' · '+KHACH[(S.ngay+j)%KHACH.length].ho); S.f.chitieu=3; return {chot:n,tinh:0,bo:0}; }
  if(Math.random()<.5&&(S.tin.bay||0)<3) nghi(12); return {chot:0,tinh:3-(S.f.chitieu||0),bo:0}; }

/* =====================================================================
   2. TIN GIẤU CHỮ — tự gõ, chữ đầu mỗi câu ghép ra từ cần gửi
   ===================================================================== */
const CAM=['cuu','cong an','tron','giai cuu','bao tin','huong','vinh','lam','bavet','sihanoukville','tron thoat'];
function chamTin(txt,tu){ const can=bo(tu).toUpperCase().replace(/[^A-Z0-9]/g,'');
  const cau=txt.split(/(?<=[.!?…])\s+|\n+/).map(x=>x.trim()).filter(Boolean);
  const dau=cau.map(c=>bo(c).replace(/^[^A-Za-z0-9]+/,'').charAt(0).toUpperCase()).join('');
  const loi=[]; let vung=0;
  cau.forEach((c,i)=>{ const w=c.split(/\s+/).filter(Boolean); if(w.length<4){ loi.push('Câu '+(i+1)+' quá ngắn (dưới 4 chữ), đọc như mật mã.'); vung++; } });
  const first=cau.map(c=>bo(c).toLowerCase().split(/\s+/)[0]); first.forEach((f,i)=>{ if(i&&first.indexOf(f)<i){ loi.push('Câu '+(i+1)+' mở đầu giống một câu trước.'); vung++; } });
  cau.forEach((c,i)=>{ if(i&&bo(c).toLowerCase()===bo(cau[i-1]).toLowerCase()){ loi.push('Câu '+(i+1)+' lặp nguyên câu trước.'); vung++; } });
  const low=' '+bo(txt).toLowerCase()+' '; CAM.forEach(k=>{ if(low.includes(' '+k+' ')||low.includes(' '+k+'.')||low.includes(' '+k+',')){ loi.push('Có chữ quản lý để ý: "'+k+'".'); vung++; } });
  return {can,dau,dung:dau===can,vung,loi,cau}; }
const MANH={ /* chế độ Dễ: mảnh câu soạn sẵn theo chữ cái */
 S:['Sáng nay trời mưa quá mẹ ơi.','Sắp tới con được lên lương.'],O:['Ở đây ăn uống cũng đủ.','Ông chủ nói tháng sau thưởng.'],N:['Nhớ nhà quá mà chưa về được.','Nay con mới mua đôi dép mới.'],G:['Gửi lời thăm cả xóm giùm con.','Giờ con đi làm tiếp nha.'],
 C:['Có gì mẹ nhắn con nha.','Còn mấy tháng nữa là đủ tiền.'],U:['Út nhà mình học hành sao rồi mẹ.','Uống thuốc đều nghen mẹ.'],A:['Anh hai đi làm có mệt hông.','Ai hỏi thì nói con khỏe.'],
 '3':['3 tháng nữa con gửi tiền về.','3 đứa trong phòng ai cũng mập ra.'],H:['Hôm nay con được nghỉ sớm.','Hàng xóm có ai hỏi con hông mẹ.'],T:['Tối nay phòng con có tiệc.','Tháng này con ráng làm thêm.'],R:['Rau ở đây hông ngon bằng nhà.','Rồi mẹ đừng lo cho con nữa.'],
 B:['Bữa nay con ăn cơm tấm.','Ba có khỏe hông mẹ.'],E:['Em gái con hỏi thăm mẹ.','Ế quá nên con ngồi nhắn mẹ nè.'],K:['Không có gì đâu mẹ.','Khi nào rảnh con gọi.'],I:['Ít bữa nữa con gọi video.','In hình gửi về cho mẹ coi nha.'],D:['Dạo này con ngủ ngon.','Đừng lo nha mẹ.'],L:['Lâu rồi con chưa ăn canh chua.','Lúc này con đỡ mệt rồi.'],M:['Mẹ nhớ ăn uống đầy đủ.','Mai con làm ca sáng.'],P:['Phòng con có máy lạnh.','Phải chi mẹ ở gần.'],V:['Về chắc con ghé chợ trước.','Vui lắm mẹ ơi.'],X:['Xóm mình dạo này sao mẹ.','Xa nhà vậy chớ quen rồi.'],Y:['Yên tâm nha mẹ.','Yêu mẹ.'],Q:['Quần áo con đủ mặc.','Quê mình mùa này mưa hông mẹ.'],G2:[]};
function giauChu(tu,goi){ return new Promise(res=>{ const de=(S.f.do_kho==='de');
  const B=ov('Tin giấu chữ · cần ghép ra: '+tu, goi||'');
  const can=bo(tu).toUpperCase().replace(/[^A-Z0-9]/g,'');
  B.innerHTML='<div class="gc"><p class="tag">Gõ một tin bình thường gửi về nhà. Mỗi câu một dòng hoặc ngắt bằng dấu chấm. Chữ cái đầu mỗi câu ghép lại phải ra <b style="color:var(--amber)">'+esc(can)+'</b>. Quản lý đọc lướt mọi tin: câu quá ngắn, câu mở đầu giống nhau, hay chữ nhạy cảm là bị để ý.</p>'+
   '<div class="acr" id="acr"></div><textarea id="gt" placeholder="Sáng nay trời mưa quá mẹ ơi.&#10;Ở đây ăn uống cũng đủ…"></textarea>'+
   '<div class="frag" id="frag"></div><ul id="gl"></ul><div class="row"><button class="btn" id="gs" type="button">Gửi</button><button class="btn ghost" id="gde" type="button">'+(de?'Tự gõ':'Dễ: ghép mảnh câu')+'</button></div></div>';
  const ta=$('gt');
  const upd=()=>{ const r=chamTin(ta.value,tu); let h=''; for(let i=0;i<can.length;i++){ const c=r.dau[i]; h+='<span class="'+(c==null?'need':c===can[i]?'ok':'no')+'">'+(c||can[i])+'</span>'; } if(r.dau.length>can.length) h+='<span class="no">'+r.dau.slice(can.length)+'</span>'; $('acr').innerHTML=h; $('gl').innerHTML=r.loi.map(x=>'<li class="bad">'+esc(x)+'</li>').join(''); };
  const frag=()=>{ const f=$('frag'); if(!S.f.do_kho_de_on){ f.innerHTML=''; return; } let h=''; [...new Set(can.split(''))].forEach(c=>{ (MANH[c]||[]).forEach(m=>{ h+='<button type="button" data-m="'+esc(m)+'"><b>'+esc(m[0])+'</b>'+esc(m.slice(1))+'</button>'; }); }); f.innerHTML=h; f.querySelectorAll('button').forEach(b=>b.onclick=()=>{ ta.value=(ta.value.trim()?ta.value.trim()+'\n':'')+b.dataset.m; upd(); }); };
  ta.oninput=upd; upd(); frag();
  $('gde').onclick=()=>{ S.f.do_kho_de_on=!S.f.do_kho_de_on; $('gde').textContent=S.f.do_kho_de_on?'Tự gõ':'Dễ: ghép mảnh câu'; frag(); };
  $('gs').onclick=()=>{ const r=chamTin(ta.value,tu); if(!r.cau.length){ toast('Chưa gõ gì.'); return; } ovClose(); res(r); };
}); }
/* giải mã: đọc chữ đầu câu của một tin nhận được */
function giaiMa(tin,dapan,goi){ return new Promise(res=>{ const B=ov('Giải tin',goi||'');
  const cau=tin.split('\n'); B.innerHTML='<div class="chat"><div class="msg k">'+cau.map(esc).join('<br>')+'</div></div><p class="tag" style="text-align:center;margin-top:12px">Đọc chữ đầu mỗi câu. Bên kia nhắn gì?</p><div class="gc" style="max-width:520px;margin:0 auto"><input id="gm" style="width:100%;font:inherit;font-size:18px;letter-spacing:.2em;text-transform:uppercase;background:#0f121b;color:var(--paper);border:1px solid var(--line);border-radius:10px;padding:10px" autocomplete="off"><div class="row"><button class="btn" id="gmo" type="button">Đọc ra</button><button class="btn ghost" id="gmg" type="button">Gợi ý</button></div><p class="tag" id="gmm"></p></div>';
  let thu=0;
  $('gmg').onclick=()=>{ $('gmm').textContent='Chữ đầu câu 1 là "'+bo(cau[0]).trim()[0].toUpperCase()+'". Bỏ dấu, ghép liền.'; };
  $('gmo').onclick=()=>{ const v=bo($('gm').value).toUpperCase().replace(/[^A-Z0-9]/g,''); thu++; if(v===dapan){ ovClose(); res(true); } else if(thu>=3){ $('gmm').textContent='Đáp án: '+dapan; setTimeout(()=>{ ovClose(); res(false); },1600); } else $('gmm').textContent='Chưa đúng. Thử lại.'; };
}); }
/* nói giấu chữ có đồng hồ (cảnh cuộc gọi về nhà) */
async function noiGiauChu(tu,bo3){ let ok=0; for(let i=0;i<bo3.length;i++){ const o=bo3[i]; const idx=await choose(o.map(x=>x[0]),{q:'Chữ cần: '+tu.split('').map((c,j)=>j<i?c:j===i?'['+c+']':'·').join(' ')+'   ·   quản lý đứng sau lưng',timer:8,mac:-1});
    if(idx<0){ await say('','Lâm im lặng một giây quá lâu. Người đứng sau lưng gõ nhẹ vào vai.'); nghi(6); continue; }
    const pick=o[idx]; await say('@',pick[0]); if(pick[1]) ok++; else if(pick[2]) nghi(8); }
  return ok===bo3.length; }

/* =====================================================================
   3 + 4. SƠ ĐỒ TRẠI: ĐI ĐÊM và ĐÊM GIẢI CỨU (cùng một bản đồ nhìn ngang ba tầng)
   ===================================================================== */
const MAP={W:1000,floors:[ /* y tính từ trên xuống, tầng 0 là trệt */
  {ten:'Trệt',rooms:[{x:30,w:400,ten:'Phòng máy'},{x:560,w:180,ten:'Bếp'},{x:850,w:130,ten:'Cửa sau'}],hide:[120,300,620,700]},
  {ten:'Tầng 2',rooms:[{x:30,w:400,ten:'Phòng ngủ các tổ'},{x:560,w:120,ten:'Phòng Chị Bảy'},{x:720,w:200,ten:'Buồng tắm'}],hide:[90,260,400,780]},
  {ten:'Tầng 3',rooms:[{x:30,w:260,ten:'Kho'},{x:560,w:400,ten:'Văn phòng quản lý'}],hide:[150,620,880]}],
  stairs:{x:470,w:60}};
const MUC={ /* mục tiêu đi đêm */
  lay_may:{ten:'Lấy lại điện thoại giấu',f:1,x:770,why:'Có máy mới gửi được tin giấu chữ ra ngoài.'},
  gap_ngan:{ten:'Gặp Ngân ở buồng tắm',f:1,x:820,why:'Nói chuyện riêng, ngoài tầm mắt quản lý.'},
  do_t1:{ten:'Dò lịch tuần tra trệt',f:0,x:900,why:'Ghi giờ bảo vệ đi qua cửa sau.'},
  do_t3:{ten:'Dò lịch tuần tra tầng 3',f:2,x:900,why:'Vẽ nốt phần sơ đồ còn thiếu.'},
  lay_kim:{ten:'Lấy cây kìm ở bếp',f:0,x:650,why:'Cắt được một đoạn rào ra bờ sông.'},
  cat_rao:{ten:'Cắt rào sau bếp',f:0,x:740,why:'Mở lối thứ hai ra sông.',need:'kim'},
  chup_so:{ten:'Chụp sổ chỉ tiêu',f:2,x:760,why:'Cột "nộp lên": chứng cứ Ông Chủ Lò.',need:'chia'},
  mo_cua:{ten:'Mở khóa cửa sau',f:0,x:930,why:'Lối ra sông gần ghe nhất.',need:'chia'},
  nghe_len:{ten:'Nghe lén cuộc gọi của quản lý',f:2,x:600,why:'Tin thoại của Ông Chủ Lò.'}};
function guards(night,rescue){ const g=[{f:0,a:60,b:960,v:70,x:500,d:1},{f:1,a:40,b:940,v:60,x:720,d:1},{f:2,a:40,b:960,v:55,x:800,d:1}];
  if(S.f.siet>0||rescue) g.push({f:1,a:500,b:960,v:80,x:900,d:-1}); if(rescue) g.push({f:0,a:20,b:200,v:30,x:60,d:1});
  return g; }
function sneak(cfg){ /* cfg: {mode:'didem'|'cuu', muc, limit, onEnd} */ return new Promise(async res=>{
  const B=ov(cfg.mode==='cuu'?'Đêm mưa · dẫn người ra sông':'Đi đêm · '+MUC[cfg.muc].ten, '');
  B.style.padding='0'; B.innerHTML='<div class="dd"><canvas id="dc"></canvas><div class="ctl"><div class="g"><button id="kL" type="button" aria-label="Sang trái">◀</button><button id="kR" type="button" aria-label="Sang phải">▶</button></div><div class="g"><button id="kU" type="button">▲ Lên</button><button id="kD" type="button">▼ Xuống</button><button id="kH" type="button">Núp</button><button id="kA" type="button">'+(cfg.mode==='cuu'?'Dẫn':'Lấy')+'</button><button id="kS" type="button">Chạy</button></div></div></div>';
  const cv=$('dc'), x=cv.getContext('2d'); const bgu=await imgUrl('x2-trai-matcat'); let bgi=null; if(bgu){ bgi=new Image(); bgi.src=bgu; }
  const P={f:cfg.mode==='cuu'?1:1,x:cfg.mode==='cuu'?240:200,hid:false,run:false,sus:0}; const G=guards(cfg.night,cfg.mode==='cuu');
  let keys={L:0,R:0}, over=false, t=0, msg='', msgT=0, got=false;
  const T0=cfg.mode==='cuu'?60:0; let clock=T0; /* phút kể từ 0:00 */
  /* đêm giải cứu: nhóm người */
  const groups=cfg.mode==='cuu'?cfg.groups.map((g,i)=>({...g,x:60+i*80,f:1,st:'cho',cd:0})):[]; let lead=null; const out=[]; const lost=[];
  const exits=cfg.mode==='cuu'?cfg.exits:[];
  const resize=()=>{ const r=cv.getBoundingClientRect(); cv.width=r.width*devicePixelRatio; cv.height=r.height*devicePixelRatio; }; resize(); addEventListener('resize',resize);
  const say1=m=>{ msg=m; msgT=3; };
  const hold=(id,k)=>{ const b=$(id); const on=e=>{ e.preventDefault(); keys[k]=1; }, off=()=>{ keys[k]=0; }; b.addEventListener('pointerdown',on); b.addEventListener('pointerup',off); b.addEventListener('pointerleave',off); b.addEventListener('pointercancel',off); };
  hold('kL','L'); hold('kR','R');
  const atStairs=()=>Math.abs(P.x-(MAP.stairs.x+MAP.stairs.w/2))<40;
  const spotNear=()=>MAP.floors[P.f].hide.find(h=>Math.abs(h-P.x)<28);
  $('kU').onclick=()=>{ if(atStairs()&&P.f<2&&!P.hid){ P.f++; P.x=MAP.stairs.x+MAP.stairs.w/2; clock+=cfg.mode==='cuu'?1:0; } };
  $('kD').onclick=()=>{ if(atStairs()&&P.f>0&&!P.hid){ P.f--; P.x=MAP.stairs.x+MAP.stairs.w/2; clock+=cfg.mode==='cuu'?1:0; } };
  $('kH').onclick=()=>{ if(P.hid){ P.hid=false; return; } if(spotNear()!=null){ P.hid=true; P.x=spotNear(); } else say1('Không có chỗ núp ở đây.'); };
  $('kS').onclick=()=>{ P.run=!P.run; $('kS').classList.toggle('on',P.run); };
  $('kA').onclick=()=>act();
  const kd=e=>{ if(e.key==='ArrowLeft'||e.key==='a') keys.L=1; if(e.key==='ArrowRight'||e.key==='d') keys.R=1; if(e.key==='ArrowUp'||e.key==='w') $('kU').onclick(); if(e.key==='ArrowDown'||e.key==='s') $('kD').onclick(); if(e.key===' '||e.key==='h'){ e.preventDefault(); $('kH').onclick(); } if(e.key==='e'||e.key==='Enter') act(); if(e.key==='Shift') $('kS').onclick(); };
  const ku=e=>{ if(e.key==='ArrowLeft'||e.key==='a') keys.L=0; if(e.key==='ArrowRight'||e.key==='d') keys.R=0; };
  addEventListener('keydown',kd); addEventListener('keyup',ku);
  function act(){
    if(cfg.mode==='didem'){ const m=MUC[cfg.muc]; if(P.f===m.f&&Math.abs(P.x-m.x)<40&&!got){ got=true; say1('Xong. Giờ về phòng ngủ, tầng 2 bên trái.'); } else if(got&&P.f===1&&P.x<430){ finish('xong'); } else say1(got?'Về phòng ngủ ở tầng 2, bên trái.':'Chưa tới chỗ. Điểm vàng là mục tiêu.'); return; }
    /* cứu */
    if(!lead){ const g=groups.find(g=>g.st==='cho'&&g.f===P.f&&Math.abs(g.x-P.x)<40); if(g&&g.after&&clock<g.after){ say1(g.ten+': "Tui đi sau cùng. Dẫn tụi nhỏ trước."'); return; } if(g){ if(g.can>0&&!g.thuyet){ g.thuyet=true; clock+=3; if(g.can>=2){ say1(g.ten+' không chịu đi. Mất 3 phút mà không thuyết phục được.'); g.st='o'; return; } say1('Mất 3 phút thuyết phục '+g.ten+'. Đi.'); } g.st='theo'; lead=g; say1('Đang dẫn: '+g.ten+'. Ra lối thoát, nhớ núp.'); } else say1('Tới chỗ một nhóm đang chờ (chấm trắng) rồi bấm Dẫn.'); return; }
    const e=exits.find(e=>e.f===P.f&&Math.abs(e.x-P.x)<40); if(e){ lead.st='ra'; out.push(lead); clock+=e.cost||0; say1(lead.ten+' đã ra tới '+e.ten+'.'+(e.cost?' Chờ ghe '+e.cost+' phút.':'')); lead=null; } else say1('Lối thoát đánh dấu xanh.'); }
  function finish(kq){ if(over) return; over=true; removeEventListener('keydown',kd); removeEventListener('keyup',ku); removeEventListener('resize',resize); ovClose(); res({kq,out,lost,clock,groups}); }
  let last=performance.now();
  function loop(now){ if(over) return; const dt=Math.min(.05,(now-last)/1000); last=now; t+=dt;
    if(cfg.mode==='cuu'){ clock+=dt*(cfg.speed||1); }
    const sp=(P.run?190:95)*(lead?.85:1);
    if(!P.hid){ if(keys.L) P.x=Math.max(20,P.x-sp*dt); if(keys.R) P.x=Math.min(980,P.x+sp*dt); }
    if(lead){ lead.f=P.f; lead.x+= (P.x-28-lead.x)*Math.min(1,dt*4); }
    /* lính gác */
    const raid=cfg.mode==='cuu'&&clock>=cfg.raid;
    let seen=false;
    G.forEach(g=>{ if(raid&&!g.chay){ g.chay=true; g.v*=1.6; } g.x+=g.v*g.d*dt; if(g.x>g.b){ g.x=g.b; g.d=-1; } if(g.x<g.a){ g.x=g.a; g.d=1; }
      if(raid) return; if(g.f!==P.f||P.hid) return; const dx=(P.x-g.x)*g.d; const cone=150+(cfg.night||0)*10; const noise=P.run&&Math.abs(P.x-g.x)<130;
      if((dx>0&&dx<cone)||noise) seen=true; });
    P.sus=seen?P.sus+dt*(P.run?2.4:1.6):Math.max(0,P.sus-dt*.7);
    if(P.sus>=1){ if(cfg.mode==='didem'){ finish('bat'); return; } P.sus=0; clock+=20; if(lead){ lead.st='bat'; lost.push(lead); say1('Bị thấy! '+lead.ten+' bị lôi về. Mất 20 phút.'); lead=null; } else say1('Bị thấy! Lâm phải núp trong kho 20 phút.'); P.hid=true; }
    if(cfg.mode==='didem'){ if(t>(cfg.limit||110)){ finish(got?'xong_tre':'het'); return; } }
    else { if(cfg.xe&&clock>=cfg.xe&&!cfg.xeDone){ cfg.xeDone=true; groups.filter(g=>g.st==='cho').forEach(g=>{ g.st='xe'; lost.push(g); }); say1('Xe tới chở những người còn lại đi trước giờ.'); }
      if(clock>=cfg.end||groups.every(g=>g.st!=='cho'&&g.st!=='theo')){ finish('het'); return; } }
    msgT-=dt; draw(raid); requestAnimationFrame(loop); }
  function draw(raid){ const W=cv.width,H=cv.height; const sx=W/1000; const fh=H/3; x.clearRect(0,0,W,H);
    if(bgi&&bgi.complete&&bgi.naturalWidth){ x.globalAlpha=.55; x.drawImage(bgi,0,0,W,H); x.globalAlpha=1; }
    for(let f=0;f<3;f++){ const y0=H-(f+1)*fh; const fl=MAP.floors[f]; x.fillStyle=f===P.f?'rgba(40,46,66,.55)':'rgba(20,23,33,.55)'; x.fillRect(0,y0,W,fh-4*devicePixelRatio);
      x.fillStyle='rgba(255,255,255,.08)'; fl.rooms.forEach(r=>{ x.fillRect(r.x*sx,y0+6,r.w*sx,fh-16); });
      x.fillStyle='#8b93a9'; x.font=(11*devicePixelRatio)+'px Be Vietnam Pro, sans-serif'; fl.rooms.forEach(r=>x.fillText(r.ten,r.x*sx+6,y0+18*devicePixelRatio)); x.fillText(fl.ten,W-60*devicePixelRatio,y0+18*devicePixelRatio);
      x.fillStyle='rgba(120,90,50,.5)'; fl.hide.forEach(h=>x.fillRect(h*sx-10*sx,y0+fh*.45,20*sx,fh*.45));
      x.fillStyle='rgba(240,178,92,.18)'; x.fillRect(MAP.stairs.x*sx,y0,MAP.stairs.w*sx,fh-4); }
    const Y=f=>H-f*fh-14*devicePixelRatio;
    if(cfg.mode==='didem'&&!got){ const m=MUC[cfg.muc]; x.fillStyle='#f0b25c'; x.beginPath(); x.arc(m.x*sx,Y(m.f)-20*devicePixelRatio,7*devicePixelRatio,0,7); x.fill(); }
    if(cfg.mode==='didem'&&got){ x.strokeStyle='#5fb37a'; x.lineWidth=2*devicePixelRatio; x.strokeRect(30*sx,H-2*fh+6,400*sx,fh-16); }
    exits.forEach(e=>{ x.fillStyle='#5fb37a'; x.fillRect(e.x*sx-6,Y(e.f)-60*devicePixelRatio,12,56*devicePixelRatio); x.fillStyle='#bfe3c9'; x.fillText(e.ten,e.x*sx-30,Y(e.f)-66*devicePixelRatio); });
    groups.forEach(g=>{ if(g.st==='ra'||g.st==='bat'||g.st==='xe') return; x.fillStyle=g.st==='o'?'#555':'#e8e2d2'; x.beginPath(); x.arc(g.x*sx,Y(g.f)-14*devicePixelRatio,6*devicePixelRatio,0,7); x.fill(); x.fillStyle='#cfc8b8'; x.fillText(g.ten,g.x*sx-10,Y(g.f)-26*devicePixelRatio); });
    G.forEach(g=>{ const gx=g.x*sx, gy=Y(g.f); if(!raid){ x.fillStyle='rgba(255,230,140,.13)'; x.beginPath(); x.moveTo(gx,gy-30*devicePixelRatio); x.lineTo(gx+g.d*(150+(cfg.night||0)*10)*sx,gy-50*devicePixelRatio); x.lineTo(gx+g.d*(150+(cfg.night||0)*10)*sx,gy); x.closePath(); x.fill(); }
      x.fillStyle='#e2645c'; x.fillRect(gx-5*devicePixelRatio,gy-34*devicePixelRatio,10*devicePixelRatio,34*devicePixelRatio); });
    x.fillStyle=P.hid?'#5d6478':'#f0b25c'; x.fillRect(P.x*sx-6*devicePixelRatio,Y(P.f)-36*devicePixelRatio,12*devicePixelRatio,36*devicePixelRatio);
    if(P.sus>0){ x.fillStyle='#e2645c'; x.fillRect(P.x*sx-15*devicePixelRatio,Y(P.f)-46*devicePixelRatio,30*devicePixelRatio*P.sus,4*devicePixelRatio); }
    x.fillStyle='#efe8d8'; x.font=(13*devicePixelRatio)+'px IBM Plex Mono, monospace';
    if(cfg.mode==='cuu'){ const hh=Math.floor(clock/60), mm=Math.floor(clock%60); x.textAlign='center'; x.fillText(hh+':'+String(mm).padStart(2,'0')+(raid?'  · đã ập vào':cfg.raid<999?'  · hẹn ập vào '+Math.floor(cfg.raid/60)+':'+String(cfg.raid%60).padStart(2,'0'):'  · không ai ập vào')+'   ·   ra được '+out.length+'/'+groups.length,W/2,18*devicePixelRatio); x.textAlign='left'; }
    else { x.textAlign='center'; x.fillText('Trời sáng sau: '+Math.max(0,Math.ceil((cfg.limit||110)-t))+' giây',W/2,18*devicePixelRatio); x.textAlign='left'; }
    if(msgT>0&&msg){ x.fillStyle='rgba(16,19,28,.9)'; const w=x.measureText(msg).width+20; x.fillRect(W/2-w/2,H/2-20*devicePixelRatio,w,30*devicePixelRatio); x.fillStyle='#efe8d8'; x.fillText(msg,W/2-w/2+10,H/2); }
    const atS=atStairs(); $('kU').disabled=!atS||P.f>=2; $('kD').disabled=!atS||P.f<=0; $('kH').textContent=P.hid?'Ra':'Núp';
  }
  if(TEST) window.__sneak={win:()=>{ if(cfg.mode==='cuu'){ groups.forEach(g=>{ if(g.st==='cho'&&g.can<2){ g.st='ra'; out.push(g); } }); finish('het'); } else { got=true; finish('xong'); } },lose:()=>finish(cfg.mode==='cuu'?'het':'bat')};
  say1(cfg.mode==='cuu'?'Bấm Dẫn ở chỗ một nhóm, đưa ra lối xanh. Cầu thang ở giữa.':'Mục tiêu: chấm vàng. Đi rón, núp ở ô nâu khi đèn pin quét tới.');
  requestAnimationFrame(loop);
}); }
