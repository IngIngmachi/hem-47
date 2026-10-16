/* Hẻm 47 · Phần 2 — lời thoại, dạng dòng giống bảng thoại Phần 1 (ma, canh, ai, kieu, loi, hien, sau).
   Viết bằng hàm X() cho gọn: mỗi cảnh là một mảng dòng.
   'chữ'            → mô tả
   ['Ai','chữ']     → thoại;  ['~','chữ'] → người đang chơi nghĩ;  ['#Ai','chữ'] → tin nhắn điện thoại
   {card:'...'}      → thẻ chữ lớn giữa màn (cảnh phim)
   {bg:'x2-...'}     → đổi nền cho cảnh;  {bg:''} → bỏ nền
   {fx:'+co:x ...'}  → hiệu ứng, không hiện chữ;  {game:'ten'} → mở trò chơi
   {if:'điều kiện',L:[...]} → nhóm dòng có điều kiện
   {chon:[{t,sub,s,L,h,dis}],q,timer,mac} → lựa chọn; L là các dòng chạy sau khi chọn
   Giọng miền Nam. Lâm gọi Ngân là "cổ"/"cô ấy". Khoa, Tú là "ổng". Tú xưng tao–mày khi cà khịa. */
'use strict';
const P2ROWS=[]; let P2STT=900000;
function X(key,canh,L,o){ o=o||{}; let n=0;
  const push=r=>{ n++; const row=Object.assign({ma:key+'_'+String(n).padStart(2,'0'),hoi:'-',canh,ai:'',kieu:'mota',loi:'',hien:'',sau:'',note:'',stt:(P2STT+=10)},r); P2ROWS.push(row); return row; };
  const H=(a,b)=>[a,b].filter(Boolean).join(' ');
  const walk=(L,h)=>{ for(const l of L){
    if(typeof l==='string') push({kieu:'mota',loi:l,hien:h});
    else if(Array.isArray(l)){ const [who,txt,e={}]=l; let kieu='thoai', ai=who;
      if(who==='') kieu='mota'; else if(who[0]==='~'){ kieu='nghi'; ai=''; } else if(who[0]==='#'){ kieu='tin'; ai=who.slice(1); }
      push({kieu,ai,loi:txt,hien:H(h,e.h),sau:e.s||'',bg:e.bg}); }
    else if(l.card!=null) push({kieu:'the',loi:l.card,hien:H(h,l.h),bg:l.bg});
    else if(l.chon){ const ids=[]; l.chon.forEach(c=>{ const r=push({kieu:'chon',loi:c.t,sub:c.sub||'',sau:c.s||'',hien:H(h,c.h),disc:c.dis||'',timer:l.timer||0,mac:l.mac==null?-1:l.mac,q:l.q||''}); ids.push(r.ma); });
      l.chon.forEach((c,i)=>{ if(c.L&&c.L.length) walk(c.L,H(h,'chon:'+ids[i])); }); }
    else if(l.if!=null) walk(l.L,H(h,l.if));
    else if(l.game) push({kieu:'fx',hien:H(h,l.h),sau:'+game:'+l.game+(l.s?' '+l.s:'')});
    else if(l.bg!=null) push({kieu:'fx',hien:H(h,l.h),bg:l.bg,sau:l.s||''});
    else if(l.fx!=null) push({kieu:'fx',hien:H(h,l.h),sau:l.fx});
  } };
  walk(L,o.h||''); }
/* dòng bảng (manh mối, nối, báo cáo, lời khai, tìm kiếm, mục tiêu) */
let P2M=980000; const M=(ma,kieu,ai,loi,o)=>P2ROWS.push(Object.assign({ma,hoi:'-',canh:'',ai,kieu,loi,hien:'',sau:'',note:'',stt:(P2M+=10)},o||{}));

/* =====================================================================
   MỞ ĐẦU
   ===================================================================== */
X('x_mo','Phần 2 · mở đầu',[
 {if:'nhanh:A',L:[
  {bg:'x2-taphoa-chieu'},{card:'BA THÁNG SAU\nHẺM 47 · FAN XÍCH VÔ'},
  'Ngân ngồi trên cái ghế nhựa trước tạp hóa của mẹ. Tóc cắt ngắn như con trai, chưa kịp dài ra.',
  'Phường vẫn gọi lên làm việc mỗi tuần. Trên mạng vẫn có người gọi cô là "con lừa đảo ôm 1 tỷ 2".',
  {if:'p1:ngan_bv',L:['Hồ sơ ghi cô là nạn nhân bị ép buộc. Ít ra giấy tờ nói vậy.']},
  {if:'!p1:ngan_bv',L:['Hồ sơ của cô chưa đóng. Chưa ai chứng minh được cô bị ép.']},
  'Hai giờ sáng. Cái điện thoại cũ ốp hình mèo đen sáng lên. Một số lạ, đầu số bên kia.',
  ['#Số lạ','Sáng nay trời mưa quá chị ơi. Ít bữa nữa em mua dép mới. Hôm qua tụi em được ăn thịt. Ai cũng nhớ chị hết á.'],
  ['~','Chữ "á" cuối câu. Chỉ có một đứa gõ kiểu đó.'],
  ['~','Lâm ở phòng 3 nhà bà Sáu, cách đây ba căn. Mười chín tháng trước, ổng là người viết bài đó.'],
  ['~','Giờ mình cần ổng.']]},
 {if:'nhanh:B ket1:bocphot',L:[
  {bg:'x2-hien-basau-dem'},{card:'HAI THÁNG SAU BÀI ĐĂNG LÚC 21:40\nHẺM 47'},
  'Cái ghi âm cuộc gọi 21:15 năm ngoái đã nằm trên mọi trang mạng. Dưới mỗi bài có cả ngàn bình luận.',
  'Có người tìm ra phòng 3. Bà Sáu trả lại tiền cọc, rồi dúi vô tay Lâm cái mền cũ.',
  ['Bà Sáu','Bà hổng đuổi con. Bà chỉ hổng giữ con trên đó được nữa thôi. Ngủ tạm ngoài hiên đi, có mái che.'],
  ['~','Khu ở Bavet dời đi ngay đêm mình đăng bài. Không ai biết Ngân với Thủy giờ ở đâu.'],
  ['~','Lần thứ hai mình đẩy cổ đi. Lần này mình không được ngồi yên nữa.']]},
 {if:'nhanh:B ket1:tien',L:[
  {bg:'x2-van-phong-lam'},{card:'SÁU THÁNG SAU\nMỘT VĂN PHÒNG CÓ MÁY LẠNH'},
  'Lâm có bàn gỗ, có máy lạnh, có tấm bảng đồng "Dịch vụ xác minh thông tin". Khách ra vô đều đều.',
  'Hai giờ sáng, tài khoản của Ngân nhắn tới.',
  ['#Ngân','a lam. e la thuy. chi ngan ko con o day nua'],
  'Rồi tài khoản đó biến mất luôn.',
  ['~','"Không còn ở đây" là sao. Bị bán qua chỗ khác. Hoặc là...'],
  ['~','Số tiền này người ta trả để mình im. Giờ lấy nó mua đường vô.'],
  ['~','Mình trả phòng văn phòng. Về lại hẻm 47.']]},
 {if:'nhanh:B !ket1:bocphot !ket1:tien',L:[
  {bg:'x2-hem-mua'},{card:'HAI THÁNG SAU NGÀY THỨ BA MƯƠI\nHẺM 47'},
  'Lâm vẫn ở phòng 3. Đêm nào cũng mở tấm ảnh Ngân trước cửa khẩu ra coi.',
  'Khu ở Bavet đã dời đi trong đêm. Hương gọi qua bên kia, không ai bắt máy.',
  'Chiều nay, ở cột điện đầu hẻm 47, có tờ rơi mới. Giấy còn thơm mùi mực.',
  '"Tuyển gấp nam nữ 18–35. Việc văn phòng nhẹ, lương 25–30 triệu. Bao ăn ở. Lo hết giấy tờ."',
  ['~','Cùng một kiểu chữ. Cùng câu "lo hết giấy tờ". Chỉ khác số điện thoại.']]},
 {bg:''}]);

X('x_hd','Phần 2 · hướng dẫn',[
 'Phần 2 chơi y như Phần 1: đi trong hẻm, bấm người để nói, bấm cửa để vô nhà, mở điện thoại để coi manh mối, nối manh mối, làm báo cáo.',
 {if:'nhanh:A',L:['Nhánh này có hai người chơi: ngày lẻ bạn là Ngân, ngày chẵn bạn là Lâm. Bảy ngày để chuẩn bị, rồi một trong hai người sẽ vô trại.']},
 {if:'nhanh:B',L:['Bảy ngày ở ngoài để chuẩn bị: tìm ra trại ở đâu, kiếm đường lên xe, gom tiền thuê ghe, học cách nhắn tin ra.']},
 'Mới trong Phần 2: ghép mảnh giấy, xếp sơ đồ, tin giấu chữ (chữ đầu mỗi câu ghép lại thành một chữ), đi đêm, và một đêm phải dẫn người ra sông.',
 'Dấu ! vàng vẫn là việc chính. Nút vàng dưới khung mục tiêu dẫn thẳng tới việc kế tiếp.']);

/* =====================================================================
   HỒI 1 · NHÁNH A (Ngân ngày lẻ, Lâm ngày chẵn)
   ===================================================================== */
X('x_a_giaitin','A · giải tin của số lạ',[
 'Ngân lật cái điện thoại cũ dưới quầy. Đọc lại tin nhắn lúc hai giờ sáng.',
 ['~','Mình dạy cả tổ cách này. Không đọc câu, đọc chữ đầu.'],
 {game:'giaitin',s:'+co:x_a_tin1'},
 {if:'co:x_siha',L:[['~','S. I. H. A. Xi Ha Núc. Tụi nó dời tổ cũ của mình về đó.'],['~','Đứa nhắn là Nhi. Còn sống. Còn gõ được.']]},
 {if:'!co:x_siha',L:[['~','Mấy chữ đầu ra cái gì đó kỳ kỳ. Xi... Xi Ha. Chắc là Xi Ha Núc.'],{fx:'+co:x_siha'}]},
 ['~','Mình không qua đó một mình được. Mình cũng không báo phường được, phường đang giữ hồ sơ của mình.'],
 ['~','Lâm. Ổng tìm thông tin giỏi lắm mà.'],
 {fx:'+cc:x_siha'}]);
X('x_a_sodo','A · vẽ lại sơ đồ trại',[
 'Ngân xé một trang trong cuốn tập học trò cũ của Thủy, trải lên mặt quầy.',
 ['~','Trệt là phòng máy. Bếp sát cửa sau. Lầu hai là chỗ ngủ, buồng tắm cuối hành lang. Lầu ba... mình chưa từng được lên.'],
 {game:'sodo'},
 {if:'p1:phat_nhanchung',L:['Sáng ra có một phong bì nhét dưới cửa cuốn tạp hóa. Nét chữ của Phát: bản vẽ đủ ba tầng, có cả lầu ba.',['~','Thằng nhỏ còn nhớ hơn mình.'],{fx:'+co:x_sodo3'}]},
 {if:'!p1:phat_nhanchung',L:[['~','Lầu ba để trống. Chỗ đó phải có người tự dò.']]},
 {fx:'+co:x_sodo +cc:x_sodo'}]);
X('x_a_moi','A · Ngân tới phòng 3',[
 {bg:'trong-phong3'},
 'Ngân gõ cửa phòng 3. Ba cái, ngắt quãng, như người lạ.',
 ['Lâm','...Cô.'],
 ['Ngân','Tui không tới để nghe anh xin lỗi. Tui tới vì anh biết tìm người.'],
 ['Ngân','Tổ cũ của tui còn mười mấy người. Tụi nó vừa nhắn ra. Anh đọc đi.'],
 ['~','Mình chìa cái điện thoại ra. Ổng đọc rất chậm, đọc hai lần.'],
 {chon:[
  {t:'"Tôi giúp. Không điều kiện."',L:[['Lâm','Tôi giúp. Cô không cần tin tôi. Cô chỉ cần xài tôi.'],['Ngân','Được. Ngày lẻ tui đi, ngày chẵn anh đi. Đừng đi chung, người ta thấy.']]},
  {t:'"Cô chắc là Nhi nhắn không? Có khi là bẫy."',L:[['Ngân','Anh nghi người ta riết thành quen hả.'],['Lâm','...Tôi xin lỗi. Tôi giúp.'],['Ngân','Ngày lẻ tui đi, ngày chẵn anh đi. Đừng đi chung, người ta thấy.']],s:'-tin_ngan'}],q:'Ngân đang đứng ở cửa'},
 {fx:'+co:x_hop'},{bg:''}]);
X('x_a_huong','A · gặp Hương',[
 'Quán Thảo Điên. Hương ngồi bàn cũ, cái máy ghi âm úp trên mặt bàn như năm ngoái.',
 ['Hương','Ông đọc tin Ngân gửi chưa? Tôi đọc rồi. Tôi cũng có tin của tôi.'],
 ['Hương','Khu Bavet hồi đó chỉ là một trong ba khu. Cùng một ông chủ. Hai khu kia đang dời sâu vô Xi Ha Núc.'],
 ['Hương','Người của tôi bên kia gọi ông chủ đó là "Ông Chủ Lò". Ai cũng chỉ nghe giọng, qua tin thoại.'],
 ['Lâm','Anh Hai là anh Tú. Vậy người trên ổng là ai?'],
 ['Hương','Câu đó tôi muốn hỏi ông. Lần theo tiền đi. Tiền không biết nói dối.'],
 {if:'p1:phuong_dauthu',L:[['Hương','Phương có gửi tôi một cái ví. Cô bé nói ông cần thì lấy.'],{fx:'+co:x_vi_phuong'}]},
 {fx:'+co:x_vu_ocl +cc:x_ocl'}]);
X('x_a_vi','A · lần ví Anh Hai',[
 'Lâm mở lại nhóm "Hội nạn nhân Ngân Order" cũ. Lần ngược từng giao dịch tiền cọc.',
 {if:'co:x_vi_phuong',L:['Ví gốc Phương gửi giúp bỏ được một bước.']},
 {game:'dongtien1'},
 {if:'cc:x_vi',L:[['~','Tối Chủ nhật nào cũng có một lệnh chuyển lớn, đều như đồng hồ. Ai đó ngồi đếm tiền mỗi tuần.']]}]);
X('x_a_thoa','A · về tạp hóa gặp mẹ',[
 {if:'p1:noi_cuocgoi',L:[['Cô Thoa','Con cầm cái máy cũ đi. Mẹ sạc nó mỗi ngày, quen tay rồi.'],['Cô Thoa','Thằng Lâm nói thật với mẹ hết rồi. Mẹ ghét nó. Mà mẹ tin nó.'],['~','Mẹ sạc cái máy này suốt mười chín tháng.'],{fx:'+co:x_maycu +tin_thoa'}]},
 {if:'!p1:noi_cuocgoi',L:[['Cô Thoa','Con đi đâu thì đi, đừng dắt thằng đó vô nhà mẹ.'],['Ngân','Mẹ, ổng là người duy nhất đang giúp con.'],['Cô Thoa','...'],['~','Mẹ chưa tha cho Lâm. Mình cũng chưa.']]},
 {if:'!p1:ngan_bv',L:['Ra đầu hẻm, Ngân kéo mũ xuống thấp. Bên phường vẫn đang giữ hồ sơ của cô.',{fx:'+lo:5'}]}]);
X('x_a_giong','A · nghe tin thoại',[
 'Nhi gửi kèm một tin thoại, chuyển từ máy quản lý. Giọng đàn ông, đều đều, như máy đọc.',
 ['Ông Chủ Lò','Tổ con mèo tháng này thiếu. Tháng sau mà thiếu nữa thì bán hết qua bên kia. Tin để lâu là thiu.'],
 ['~','"Tin để lâu là thiu." Câu của Anh Hai. Mà giọng này không phải Anh Hai.'],
 ['~','Có tiếng gì đó dưới giọng nói. Phải lọc ra.'],
 {game:'nghetieng'},
 {if:'cc:x_giong',L:[['~','Loa phường. Đọc bằng tiếng Việt. Người nói câu này đang ở Việt Nam.']]}]);
X('x_a_vinh','A · gặp đại úy Vinh',[
 ['Đại úy Vinh','Lại là cậu. Ngồi đi.'],
 ['Đại úy Vinh','Tôi nói trước: bên kia biên giới tôi không có quyền. Bên đó chịu phối hợp hay không là nhờ cái tin cậu đưa ra từ bên trong.'],
 ['Đại úy Vinh','Tôi cần ba thứ: chỗ chính xác, số người, và giờ. Thiếu một là thôi.'],
 ['Đại úy Vinh','Cậu báo bằng cách nào thì tùy, đừng để lộ. Tin rác thì ai cũng nhận, không ai đọc.'],
 {if:'p1:tu_lo',L:[['Đại úy Vinh','Còn cái này. Lời khai của Đặng Minh Tú trong trại giam. Đọc đi.'],'"Tôi không phải người cầm lò. Tôi chỉ là mặt tiền. Tiền thì má tôi giữ."',['~','Má ổng. Bà Trần Thị Mỹ. Cái tên đứng chình ình trên hai công ty.'],{fx:'+cc:x_tu'}]},
 {fx:'+co:x_vinh'}]);
X('x_a_khoa','A · thăm Khoa',[
 'Phòng thăm gặp. Khoa ốm đi, tóc cạo sát, vẫn cái tật chắp tay trước khi nói.',
 ['Khoa','Thằng Khang còn ở bển. Tụi nó dời nó qua khu mới rồi.'],
 ['Khoa','Đợt xe tuần tới, tài xế còn là người quen của anh. Muốn lên thì anh gài được. Đổi lại anh xin một chuyện.'],
 ['Lâm','Anh muốn đưa thằng Khang về.'],
 ['Khoa','Anh muốn nó về. Còn anh ở đâu thì anh chịu.'],
 {fx:'+co:x_duong_khoa'}]);
X('x_a_thoai','A · gặp Tài xế Thoại',[
 'Bến ghe sát biên. Một người đàn ông ngồi vá lưới, điếu thuốc tắt ngấm trên môi.',
 ['Tài xế Thoại','Qua sông thì có giá. Đưa người về cũng có giá. Đưa người đi thì giá khác.'],
 ['Tài xế Thoại','Tui chở ai trả tiền. Tui hổng hỏi.'],
 {if:'p1:loc_o',L:['Anh Lộc chở ra tới bến, không lấy tiền xe. Ổng đứng xa xa hút thuốc, canh chừng.']},
 {chon:[
  {t:'Trả trước 1.500.000đ cho đêm đó',sub:'giữ chỗ ghe',dis:'tien>=1500000',s:'-tien:1500000 +co:x_ghe +tin_thoai',L:[['Tài xế Thoại','Tiền rồi. Đêm nào, mấy giờ, nhắn tui một chữ là được.']]},
  {t:'Hẹn sau, gom đủ tiền rồi quay lại',L:[['Tài xế Thoại','Nước lên thì ghe đi. Ghe hổng chờ ai.']]}],q:'Tài xế Thoại'},
 {fx:'+co:x_gap_thoai'}]);
X('x_a_tin2','A · tin thứ hai',[
 'Nửa đêm. Lại một tin của Nhi, lần này dài hơn.',
 {game:'giaitin2'},
 ['~','Nhi, chị Huệ, Tí, Toàn. Oanh thì... "đi rồi".'],
 'Ngân chép bốn cái tên vô điện thoại, mục mới: "Tổ".']);
X('x_a_gom','Gom tiền trong hẻm',[
 'Lâm đi từng nhà. Không xin. Chỉ kể.',
 {if:'tin_ba_sau>=3',L:[['Bà Sáu','Bà góp chút đỉnh. Tiền bà để dành mua cái hòm, giờ mua ghe trước đi.'],{fx:'+tien:1000000'}]},
 {if:'tin_bin>=2',L:[['Bin','Em chạy đơn được bấy nhiêu. Anh đừng nói cô Thoa nha.'],{fx:'+tien:300000'}]},
 {if:'p1:noi_cuocgoi',L:[['Cô Thoa','Mẹ đưa. Đây là tiền mẹ để chuộc con lần trước mà hổng kịp.'],{fx:'+tien:2000000'}]},
 {if:'tin_ba_sau<3 tin_bin<2 !p1:noi_cuocgoi',L:[['~','Không ai góp. Cũng phải. Mình chưa làm gì để người ta tin.']]},
 {fx:'+co:x_gom'}]);
X('x_a_cainhau','A · ai vào trại',[
 {bg:'trong-phong3-dem'},
 'Phòng 3. Mười một giờ đêm. Ngân đứng, Lâm ngồi. Cái sơ đồ trải giữa hai người.',
 ['Ngân','Tui vô. Tui thuộc từng cái hành lang. Tụi nhỏ tin tui.'],
 ['Lâm','Tụi nó biết mặt cô. Cô vô là cô thành cái gương cho cả trại coi.'],
 ['Ngân','Còn anh vô là anh thành con tin thứ mười ba. Anh biết đổi ca lúc mấy giờ không?'],
 {if:'p1:noi_cuocgoi',L:[['Ngân','Anh nói thật với mẹ tui rồi. Tui cảm ơn anh chuyện đó. Mà chuyện này là chuyện của tui.']]},
 {if:'!p1:noi_cuocgoi',L:[['Ngân','Anh lo cho tui hả? Năm ngoái sao anh không lo.']]},
 'Hai người im. Ngoài cửa sổ, tạp hóa cô Thoa đã tắt đèn.',
 {chon:[
  {t:'Để Ngân vào',sub:'thuộc đường, tổ tin ngay; nhưng bị nhận mặt, quản lý nghi từ đầu',s:'vao:ngan',L:[['Lâm','...Vậy tôi ở bờ bên này. Cô nhắn gì tôi cũng đọc ra.'],['Ngân','Anh đọc sai một chữ là có người chết đó.']]},
  {t:'Lâm vào, Ngân chỉ đường từ ngoài',sub:'mặt lạ; nhưng tổ chưa tin, phải nói mật khẩu của Ngân',s:'vao:lam +co:x_meo_cailoi +co:x_ma_meo',L:[['Ngân','Vậy anh học thuộc cái này.'],['Ngân','Gặp đứa nào trong tổ, nói "con mèo mun còn sống". Tụi nó biết là tui gửi.'],['Ngân','Với lại: gõ kịch bản tới chữ "chuyển" thì gõ sai dấu. Thành "chuyễn". Người tỉnh sẽ thấy lạ mà dừng.']]}],q:'Ai vào trại?'},
 {fx:'+co:x_chot'},{bg:''}]);

/* =====================================================================
   HỒI 1 · NHÁNH B (Lâm)
   ===================================================================== */
X('x_b_basau','B · ngồi với bà Sáu',[
 ['Bà Sáu','Con ăn chưa. Ăn đi rồi tính.'],
 ['Bà Sáu','Hồi đó bà đếm mười hai đứa đi ra từ cái gác đó. Bà chưa từng nghĩ đứa thứ mười ba lại là con.'],
 ['Lâm','Con chưa đi đâu hết bà.'],
 ['Bà Sáu','Mặt con nói con sắp đi. Bà sống bảy chục năm, bà đọc mặt người ta còn rành hơn đọc báo.'],
 {fx:'+tin_ba_sau +co:x_b_basau'}]);
X('x_b_tratin','B · tra khu Bavet dời đi đâu',[
 'Báo mạng đưa tin: một khu ở Bavet "tự giải tán" hai tháng trước. Hình chụp từ trên cao: dãy nhà trống, cổng mở toang.',
 'Dưới bài có một bình luận đã bị xóa, còn sót bản chụp màn hình: "dời hết qua Xi Ha rồi, khu casino cũ sát sông".',
 ['~','Xi Ha Núc. Hương chắc biết chỗ.'],
 {fx:'+cc:x_siha +co:x_siha'}]);
X('x_b_huong','B · gặp Hương',[
 ['Hương','Ông còn dám hẹn tôi ra đây.'],
 ['Lâm','Tôi cần biết khu Bavet dời đi đâu.'],
 {if:'tin_huong>=2|!ket1:bocphot',L:[['Hương','Xi Ha Núc. Khu casino cũ, sát sông. Danh sách người còn kẹt đây.'],'Trên danh sách: Nguyễn Thị Kim Ngân. Lê Thị Thủy. Và mười mấy cái tên Lâm chưa từng nghe.',{fx:'+co:x_ds_du'}]},
 {if:'tin_huong<2 ket1:bocphot',L:[['Hương','Tôi đưa ông nửa danh sách. Nửa kia đợi ông chứng minh lần này ông không bấm đăng.'],'Trên nửa tờ giấy có tên Ngân. Không có tên Thủy.']},
 {if:'tin_huong>=3|p1:phuong_dauthu',L:[['Hương','Còn cái này: tiền khu đó chạy về hai cái ví. Tối Chủ nhật nào cũng có lệnh chuyển lớn.'],{fx:'+cc:x_vi'}]},
 ['Hương','Người của tôi gọi ông chủ khu đó là "Ông Chủ Lò". Chỉ nghe giọng, chưa ai thấy mặt.'],
 {fx:'+co:x_vu_ocl +cc:x_ocl +cc:x_siha'}]);
X('x_b_vinh','B · gặp đại úy Vinh',[
 ['Đại úy Vinh','Cậu tính tự vô đó?'],
 ['Lâm','Không ai vô được thì không ai biết chỗ.'],
 ['Đại úy Vinh','Tôi nói một lần: cậu vô đó là thành con tin thứ mười ba. Giải cứu là việc của tụi tôi.'],
 ['Lâm','Vậy anh cho tôi một cách báo tin ra.'],
 ['Đại úy Vinh','...Tin rác. Kiểu tin quảng cáo ai cũng nhận. Cậu đọc chữ đầu câu. Bên này tôi gửi vô cũng vậy.'],
 ['Đại úy Vinh','Tôi cần chỗ chính xác, số người, và giờ. Thiếu một thứ là tôi không ký.'],
 {if:'p1:tu_lo',L:[['Đại úy Vinh','Còn cái này. Đặng Minh Tú khai trong trại giam: "Tiền thì má tôi giữ."'],['~','Bà Trần Thị Mỹ. Má ổng.'],{fx:'+cc:x_tu'}]},
 {fx:'+co:x_vinh'}]);
X('x_b_sodo','B · dò sơ đồ trại',[
 {if:'p1:phat_nhanchung',L:['Phát hẹn ở bến lúc năm giờ sáng. Nó vẽ lên mặt sau tờ lịch: ba tầng, cầu thang ở giữa, cửa sau ra sông.',['Phát','Lầu ba là văn phòng. Sổ chỉ tiêu để trong đó. Chìa thì quản lý giữ.'],['Phát','Anh vô rồi đừng có ráng làm anh hùng nha anh.'],{fx:'+co:x_sodo3'}]},
 {if:'!p1:phat_nhanchung',L:['Lâm lục nhóm Za Lô "Hội người về từ Cam". Một người chịu gọi thoại, không bật hình.','"Trệt là phòng máy. Lầu hai ngủ. Lầu ba tui chưa lên bao giờ."',['~','Lầu ba để trống. Phải tự dò.']]},
 {game:'sodo'},
 {fx:'+co:x_sodo +cc:x_sodo'}]);
X('x_b_duong','B · tìm đường lên xe',[
 {if:'p1:khoa_lat',L:[['Khoa','Em muốn lên xe đợt tới? Anh còn người quen.'],['Khoa','Thằng Khang ở khu đó. Gặp nó thì nói anh xin lỗi.'],['Khoa','Đây, cái tên em sẽ xài. Học thuộc.'],{fx:'+co:x_duong_khoa +co:x_duong'}]},
 {if:'!p1:khoa_lat',L:[
  'Một văn phòng tuyển dụng ở quận khác. Cũng cái bảng xanh, cũng tờ rơi, cũng ly trà đá mời khách.',
  'Người tiếp Lâm cười rất tươi. Phí hồ sơ 1.000.000đ, "hoàn lại khi có lương tháng đầu".',{fx:'-tien:1000000'},
  ['~','Lần này mình là người nói dối. Trả lời sao để nó không nghi.'],
  ['Người tuyển','Trước giờ em làm gì?'],
  {chon:[{t:'"Em chạy xe ôm, nợ app hơn ba chục triệu."',s:'+co:x_tl1'},{t:'"Em làm nhà báo."',s:'+nghi:8'},{t:'"Em làm admin page."',s:'+nghi:8'}],timer:10,mac:1,q:'Người tuyển đang nhìn'},
  ['Người tuyển','Biết chữ, biết xài máy tính hông?'],
  {chon:[{t:'"Dạ biết sơ sơ, gõ được."',s:'+co:x_tl2'},{t:'"Dạ em gõ nhanh lắm, làm content mấy năm."',s:'+nghi:8'}],timer:10,mac:1,q:'Người tuyển đang nhìn'},
  ['Người tuyển','Nhà có ai ngăn hông?'],
  {chon:[{t:'"Dạ hổng ai. Mẹ em mất rồi."',s:'+co:x_tl3'},{t:'"Dạ có, em phải hỏi lại chị em."',s:'+nghi:8'}],timer:10,mac:1,q:'Người tuyển đang nhìn'},
  {if:'co:x_tl1 co:x_tl2 co:x_tl3',L:[['Người tuyển','Được. Mai khám sức khỏe, tuần sau có xe.']]},
  {if:'!co:x_tl1|!co:x_tl2|!co:x_tl3',L:[['Người tuyển','Ừa... thôi được. Mai khám sức khỏe.'],['~','Nó nhìn mình hơi lâu. Ghi gì đó vô sổ.']]},
  {fx:'+co:x_duong'}]}]);
X('x_kham','B · khám sức khỏe',[
 'Phòng khám nhỏ, quạt trần quay chậm. Lâm cầm tờ giấy hẹn khám đóng mộc tròn.',
 ['~','Y chang tờ giấy trong cái vali màu hồng trên gác nhà bà Sáu. Ngày 2/4/2025.'],
 'Trên băng ghế chờ có hai người cùng đợt: một cô gái ôm balo hồng, một ông chú tay còn dính xi măng.',
 ['Nhi','Anh cũng đi đợt này hả? Em đi để trả tiền thuốc cho bà ngoại á.'],
 ['Toàn','Tui nợ app. Đi một năm là trả xong.'],
 ['~','Hai người này sẽ ngồi chung xe với mình. Mình biết đầu kia là gì. Họ thì không.'],
 {chon:[
  {t:'Nói nhỏ với họ: đừng đi',sub:'có thể lộ',s:'+lo:10 +tin_nhi',L:[['Nhi','Anh nói gì kỳ vậy? Anh cũng đi mà.'],'Người tuyển dụng trong phòng nhìn ra.']},
  {t:'Im lặng',sub:'nói ra là lộ, cả ba cùng mất đường',L:[['~','Mình sẽ đưa họ về. Chỉ là không phải bằng một câu nói ở đây.']]}],q:'Nhi với Toàn'},
 {fx:'+co:x_kham'}]);
X('x_tapma','B · tập nhắn giấu chữ với Bin',[
 ['Bin','Anh muốn tập nhắn kiểu chị Ngân hả? Em đóng vai quản lý cho. Em đọc lướt nha.'],
 ['Bin','Gửi chữ SONG coi.'],
 {game:'giauchu',s:'+co:x_tap'},
 {if:'co:x_tap_ok',L:[['Bin','Em đọc hổng thấy gì lạ hết. Mà đọc chữ đầu thì ra SONG. Ghê.']]},
 {if:'!co:x_tap_ok',L:[['Bin','Mỗi câu một chữ đầu nha anh. S, rồi O, rồi N, rồi G. Câu đừng cụt quá.']]},
 {fx:'+co:x_tapma +co:x_meo_hieu +tin_bin'}]);
X('x_b_khoa','B · thăm Khoa',[
 'Phòng thăm gặp. Khoa ốm đi, tóc cạo sát.',
 ['Khoa','Em đi thiệt hả.'],
 ['Khoa','Thằng Khang ở dãy trong. Nó bướng. Nó mà gặp em, nói nó: anh hai xin lỗi.'],
 {fx:'+co:x_b_khoa'}]);

/* chung hai nhánh */
X('x_ghep','Tờ rơi ở cột điện',[
 'Cột điện đầu hẻm. Tờ rơi tuyển dụng mới bị ai đó xé, mảnh còn mảnh mất, dính bùn.',
 ['~','Mặt sau có con dấu. Ráp lại được thì đọc được tên công ty.'],
 {game:'ghepgiay'},
 {if:'cc:x_phatdat',L:[['~','"Công ty TNHH Dịch vụ Thương mại Phát Đạt TN." Đặt trước tên số điện thoại tuyển dụng.'],['~','Tra trên laptop coi ai đứng tên.']]}]);
X('x_tra_phatdat','Tra công ty Phát Đạt TN',[
 'Trang thông tin doanh nghiệp. Người đại diện theo pháp luật: Trần Thị Mỹ, sinh năm 1966.',
 'Bà Trần Thị Mỹ cũng đứng tên công ty thứ hai: Mỹ Hưng Logistics, chuyên "vận chuyển lao động".',
 {if:'nhanh:A',L:[['~','Mỹ. Anh Tú có đăng một bài mừng thọ má ổng sáu mươi tuổi. "Cả đời mẹ lo cho con."']]},
 {if:'nhanh:B',L:[['~','Mỹ. Má anh Tú tên Mỹ. Bài mừng thọ sáu mươi tuổi trên trang ổng: "Cả đời mẹ lo cho con."']]},
 ['~','Chưa đủ. Đứng tên một công ty không có nghĩa là cầm lò.'],
 {fx:'+cc:x_bamy'}]);
X('x_tra_ghe','Trả tiền ghe',[
 {if:'tien>=1500000',L:[['Tài xế Thoại','Rồi. Đêm nào, mấy giờ, nhắn tui một chữ.'],{fx:'-tien:1500000 +co:x_ghe +tin_thoai'}]},
 {if:'tien<2500000',L:[['Tài xế Thoại','Chưa đủ thì thôi. Ghe hổng chờ ai.']]}]);
X('x_b_gom','B · gom tiền',[
 'Lâm đi từng nhà trong hẻm. Không xin. Chỉ kể.',
 {if:'tin_ba_sau>=3',L:[['Bà Sáu','Bà góp chút đỉnh. Tiền bà để dành mua cái hòm, giờ mua ghe trước.'],{fx:'+tien:1000000'}]},
 {if:'tin_bin>=2',L:[['Bin','Em chạy đơn được bấy nhiêu. Anh đừng nói ai nha.'],{fx:'+tien:300000'}]},
 {if:'p1:noi_cuocgoi',L:[['Cô Thoa','Cô đưa. Đem nó về cho cô.'],{fx:'+tien:2000000'}]},
 {if:'tin_ba_sau<3 tin_bin<2 !p1:noi_cuocgoi',L:[['~','Không ai góp. Cũng phải. Mình chưa làm gì để người ta tin.']]},
 {fx:'+co:x_gom'}]);
X('x_mon','Chọn món mang theo',[
 ['~','Người về từ Cam nói: tới nơi là bị khám người, lột hết. Giấu được một món là may.'],
 {chon:[
  {t:'Cái SIM nhỏ, may vô lai quần',sub:'có máy là gửi tin ra được, quản lý ít đọc',s:'mon:sim'},
  {t:'Con mèo vải đen',sub:'tổ biết con mèo này là của ai',s:'mon:meo'},
  {t:'Tờ giấy ghi số của Hương',sub:'chắc ăn, nếu quên số',s:'mon:giay'}],q:'Chỉ một món. Món gì?'},
 {fx:'+co:x_mon_xong'}]);
X('x_demcuoi','Đêm cuối ở Sài Gòn',[
 {if:'vao:ngan',L:[{bg:'trong-taphoa'},'Tạp hóa đóng nửa cửa. Cô Thoa ngồi gói xôi, gói hoài một gói.',['Cô Thoa','Lần trước mẹ hổng biết con đi. Lần này mẹ biết.'],['Cô Thoa','Mẹ hổng cản. Mẹ ngồi đây sạc cái máy, như lần trước.'],['Ngân','Lần này con có nhắn về mà mẹ.']]},
 {if:'!vao:ngan p1:noi_cuocgoi',L:[{bg:'trong-taphoa'},'Tạp hóa đóng nửa cửa. Cô Thoa ngồi đếm tiền lẻ, không ngẩng lên.',['Cô Thoa','Mai đi hả.'],['Lâm','Dạ.'],['Cô Thoa','Đem nó về cho cô. Còn con, con cũng phải về. Nghe chưa.']]},
 {if:'!vao:ngan !p1:noi_cuocgoi',L:[{bg:'x2-hien-basau-dem'},['Bà Sáu','Bà hổng hỏi con đi đâu. Bà chỉ dặn: ở đâu cũng phải ăn cơm.'],'Bà Sáu dúi vô tay Lâm một gói xôi, gói kỹ trong lá chuối.']},
 {if:'p1:loc_o',L:['Ba giờ sáng, anh Lộc đậu xe đầu hẻm. Không nói gì, chỉ đưa cái nón bảo hiểm.']},
 {bg:''}]);
X('kq_xvinh','Kế hoạch gửi đại úy Vinh',[
 {if:'tin_bang_xvinh>=3',L:[['#Đại úy Vinh','Đọc rồi. Rõ. Bên kia tôi có người nhận. Giờ chỉ chờ giờ.'],{fx:'+co:x_vinh_ok'}]},
 {if:'tin_bang_xvinh<3',L:[['#Đại úy Vinh','Còn mơ hồ quá. Tôi không ký được cái này. Có gì chắc hơn thì gửi lại.'],{fx:'+lo:5'}]}]);

/* =====================================================================
   BẢNG: manh mối, nối, báo cáo, mục tiêu, tìm kiếm
   ===================================================================== */
const CC2=[
 ['x_siha','Manh mối','Xi Ha Núc','Tổ cũ của Ngân bị dời về một khu casino cũ sát sông ở Xi Ha Núc.'],
 ['x_ocl','Manh mối','"Ông Chủ Lò"','Ông chủ của cả ba khu. Không ai thấy mặt, chỉ nghe giọng qua tin thoại.'],
 ['x_sodo','Manh mối','Sơ đồ trại','Trệt: phòng máy, bếp, cửa sau ra sông. Lầu hai: chỗ ngủ, buồng tắm. Lầu ba: văn phòng.'],
 ['x_vi','Chứng cứ','Dòng tiền tối Chủ nhật','Tiền cọc chạy qua bốn tài khoản, đổ về hai ví. Tối Chủ nhật nào cũng có một lệnh chuyển lớn.'],
 ['x_giong','Chứng cứ','Tin thoại có tiếng loa phường','Tin thoại của Ông Chủ Lò. Dưới giọng nói có tiếng loa phường đọc bằng tiếng Việt.'],
 ['x_phatdat','Manh mối','Con dấu Phát Đạt TN','Mặt sau tờ rơi tuyển dụng: dấu Công ty TNHH DV Thương mại Phát Đạt TN.'],
 ['x_bamy','Manh mối','Bà Trần Thị Mỹ','Đứng tên Phát Đạt TN và Mỹ Hưng Logistics. Má của anh Tú.'],
 ['x_tu','Chứng cứ','Anh Tú gọi "má"','Tú khai hoặc lộ ra: tiền là "má" giữ. Ổng chỉ là mặt tiền.'],
 ['x_so','Chứng cứ','Sổ chỉ tiêu','Sổ bìa đen lầu ba. Cột "nộp lên" ký "B." và đóng dấu Phát Đạt TN.'],
 ['x_giongthat','Chứng cứ','Giọng thật của Ông Chủ Lò','Phần mềm đổi giọng tắt hai giây: giọng đàn bà già, xưng "má", gọi "thằng Tú".'],
 ['x_khaibay','Lời khai','Lời khai Chị Bảy','"Bà đó gọi chị là con Bảy. Bà hổng bao giờ bật hình."'],
 ['x_no','Manh mối','Giấy nhận nợ 3.200 USD','Tiền vé, tiền ăn ở, tiền "đào tạo". Ai vô cũng phải ký.'],
 ['x_lich','Manh mối','Lịch tuần tra','Giờ lính gác đi qua từng tầng. Có một khoảng hở.'],
 ['suy_x_saigon','Suy luận','Ông Chủ Lò ở Sài Gòn','Dòng tiền chạy về ví mở ở quận 7, tin thoại có loa phường: người cầm lò đang ở Việt Nam.'],
 ['suy_x_my','Suy luận','Ông Chủ Lò là bà Trần Thị Mỹ','Tiền qua Phát Đạt TN, sổ ký nộp lên, Tú gọi "má", giọng đàn bà già. Một người.'],
 ['suy_x_khe','Suy luận','Khe hở 3 giờ sáng','Lính trệt và lính lầu hai giao ca lúc 3 giờ. Hai phút không ai canh cửa sau.']];
CC2.forEach(([k,canh,ai,loi])=>M('CC_'+k,'cc',ai,loi,{canh}));
M('NOI_x_saigon','noi','x_vi + x_giong','Ông Chủ Lò ở Sài Gòn',{sau:'+cc:suy_x_saigon'});
M('NOI_x_saigon2','noi','x_bamy + x_giong','Ông Chủ Lò ở Sài Gòn',{sau:'+cc:suy_x_saigon'});
M('NOI_x_khe','noi','x_lich + x_sodo','Khe hở 3 giờ sáng',{sau:'+cc:suy_x_khe +co:x_gio'});
X('noi_x_saigon','Nối',[['~','Ví mở ở quận 7. Tin thoại có loa phường. Ông Chủ Lò không ở bên kia sông. Ổng ngồi ngay Sài Gòn, cuối tuần đếm tiền.']]);
X('noi_x_saigon2','Nối',[['~','Công ty đứng tên ở Sài Gòn, tin thoại có loa phường. Người cầm lò không ở bên kia.']]);
X('noi_x_khe','Nối',[['~','Ba giờ sáng. Lính trệt lên lầu hai giao ca. Hai phút cửa sau không ai nhìn.'],['~','Giờ ập vào phải là 3 giờ. Chữ cần gửi ra: 3G.']]);

/* báo cáo: kế hoạch gửi đại úy Vinh */
M('BANG_xvinh_1','bang','xvinh','Trại ở {}.');
 M('TU_xvinh_1_a','tu','BANG_xvinh_1','khu casino cũ sát sông ở Xi Ha Núc',{hien:'cc:x_siha',sau:'dung'});
 M('TU_xvinh_1_b','tu','BANG_xvinh_1','khu cũ ở Bavet');
 M('TU_xvinh_1_c','tu','BANG_xvinh_1','một tòa nhà ở Phnom Penh');
M('BANG_xvinh_2','bang','xvinh','Bên trong có {}.');
 M('TU_xvinh_2_a','tu','BANG_xvinh_2','phòng máy ở trệt, chỗ ngủ lầu hai, cửa sau ra sông',{hien:'cc:x_sodo',sau:'dung'});
 M('TU_xvinh_2_b','tu','BANG_xvinh_2','một dãy nhà một tầng');
M('BANG_xvinh_3','bang','xvinh','Tin từ trong ra bằng {}.');
 M('TU_xvinh_3_a','tu','BANG_xvinh_3','tin rác, đọc chữ đầu mỗi câu',{hien:'co:x_vinh',sau:'dung'});
 M('TU_xvinh_3_b','tu','BANG_xvinh_3','gọi điện thẳng về');
 M('TU_xvinh_3_c','tu','BANG_xvinh_3','nhờ quản lý chuyển lời');
M('BANG_xvinh_4','bang','xvinh','Người ra bằng {}.');
 M('TU_xvinh_4_a','tu','BANG_xvinh_4','ghe Tài xế Thoại chờ ở bờ sông',{hien:'co:x_ghe',sau:'dung'});
 M('TU_xvinh_4_b','tu','BANG_xvinh_4','xe 16 chỗ qua cửa khẩu');
 M('TU_xvinh_4_c','tu','BANG_xvinh_4','tự bơi qua sông');
/* báo cáo cuối: Ông Chủ Lò */
M('BANG_xocl_1','bang','xocl','Người cầm lò là {}.');
 M('TU_xocl_1_a','tu','BANG_xocl_1','bà Trần Thị Mỹ, má anh Tú',{hien:'cc:suy_x_my',sau:'dung'});
 M('TU_xocl_1_b','tu','BANG_xocl_1','anh Tú');
 M('TU_xocl_1_c','tu','BANG_xocl_1','Chị Bảy');
M('BANG_xocl_2','bang','xocl','Tiền đi qua {}.');
 M('TU_xocl_2_a','tu','BANG_xocl_2','Phát Đạt TN rồi về ví quận 7 mỗi tối Chủ nhật',{hien:'cc:x_vi cc:x_phatdat',sau:'dung'});
 M('TU_xocl_2_b','tu','BANG_xocl_2','tài khoản của Ngân Order');
M('BANG_xocl_3','bang','xocl','Bằng chứng nặng nhất là {}.');
 M('TU_xocl_3_a','tu','BANG_xocl_3','sổ chỉ tiêu ký "nộp lên", dấu Phát Đạt TN',{hien:'cc:x_so',sau:'dung'});
 M('TU_xocl_3_b','tu','BANG_xocl_3','giọng thật trong tin thoại',{hien:'cc:x_giongthat',sau:'dung'});
 M('TU_xocl_3_c','tu','BANG_xocl_3','lời đồn trong trại');

/* tìm kiếm (laptop phòng 3) */
M('WEB_x_bavet','web','Bavet | khu Bavet | Xi Ha | Xi Ha Núc | Sihanoukville | casino sát sông','Báo Sài Gòn Mới · "Khu ở Bavet tự giải tán?"',{sau:'+cc:x_siha +co:x_siha'});
 M('WP_x_bavet_01','trang','Bài báo · 2 tháng trước','Một khu nghi tổ chức lừa đảo trực tuyến ở Bavet "tự giải tán" trước khi lực lượng chức năng tới. Hình chụp: dãy nhà trống, cổng mở.');
 M('WP_x_bavet_02','trang','Bình luận đã xóa · còn ảnh chụp','"dời hết qua Xi Ha rồi, khu casino cũ sát sông"');
M('WEB_x_phatdat','web','Phát Đạt TN | Phat Dat TN | Công ty Phát Đạt | Trần Thị Mỹ | Tran Thi My | Mỹ Hưng Logistics','Thông tin doanh nghiệp · Phát Đạt TN',{sau:'+cc:x_bamy',hien:'cc:x_phatdat'});
 M('WP_x_phatdat_01','trang','Người đại diện','Trần Thị Mỹ, sinh năm 1966. Cùng đứng tên Mỹ Hưng Logistics ("vận chuyển lao động").');
 M('WP_x_phatdat_02','trang','Bài mừng thọ · trang anh Tú','"60 năm. Cả đời mẹ lo cho con." Ảnh bánh kem ba tầng.');
M('WEB_x_canhbao','web','việc nhẹ lương cao | lừa qua Cam | tuyển dụng Campuchia | chuyển đối tác','Bộ Công an · Cảnh báo "việc nhẹ lương cao"');
 M('WP_x_canhbao_01','trang','Cảnh báo','Nhiều người bị dụ sang nước ngoài làm "việc nhẹ lương cao", bị thu giấy tờ, ép lừa đảo qua mạng, bị bán qua lại giữa các công ty.');
 M('WP_x_canhbao_02','trang','Dấu hiệu','Lương cao bất thường, không cần kinh nghiệm, lo trọn gói giấy tờ, đi gấp trong tuần, xuất cảnh qua đường mòn.');
 M('WP_x_canhbao_03','trang','Khi nghi ngờ','Báo ngay công an nơi gần nhất. Gọi đường dây nóng của Bộ Công an.');

/* mục tiêu */
const MUC2=[
 ['a1','Đọc tin của số lạ trên cái điện thoại cũ dưới quầy tạp hóa.','hoi<2 nhanh:A !co:x_a_tin1'],
 ['a1b','Qua phòng 3 nhà bà Sáu kiếm Lâm.','hoi<2 nhanh:A co:x_a_tin1 !co:x_hop'],
 ['a2','Vẽ lại sơ đồ trại (bàn sau quầy tạp hóa).','hoi<2 nhanh:A co:x_hop !co:x_sodo vai:ngan'],
 ['a3','Gặp Hương ở quán Thảo Điên (đầu hẻm, gọi xe). Lần tiền của Anh Hai trên laptop phòng 3.','hoi<2 nhanh:A vai:lam !co:x_vu_ocl'],
 ['b1','Tìm coi khu Bavet dời đi đâu: laptop phòng 3, gõ "Bavet".','hoi<2 nhanh:B !cc:x_siha'],
 ['b2','Gặp Hương ở quán Thảo Điên. Gặp đại úy Vinh ở phường.','hoi<2 nhanh:B cc:x_siha !co:x_vinh'],
 ['b3','Kiếm đường lên xe đợt mới. Dò sơ đồ trại.','hoi<2 nhanh:B co:x_vinh !co:x_duong'],
 ['b4','Đi khám sức khỏe. Tập nhắn giấu chữ với Bin (tối, trước tạp hóa).','hoi<2 nhanh:B co:x_duong !co:x_tapma'],
 ['c1','Gặp Tài xế Thoại ở bến, trả tiền ghe (1.500.000đ). Gom tiền trong hẻm nếu thiếu.','hoi<2 co:x_vinh !co:x_ghe ngay>=4'],
 ['c2','Gửi "Kế hoạch" cho đại úy Vinh (laptop phòng 3).','hoi<2 co:x_vinh cc:x_sodo !co:bao_xvinh'],
 ['c3','Tờ rơi mới ở cột điện đầu hẻm. Ráp lại coi công ty nào.','hoi<2 ngay>=3 !cc:x_phatdat'],
 ['c4','Đêm cuối: chọn món mang theo.','hoi<2 ngay>=7 !co:x_mon_xong'],
 ['t1','Tìm người trong tổ. Giờ cơm trưa (12–13h) và buổi tối (19–22h) là lúc được đi lại.','hoi>=2 !co:x_to_biet !co:x_thuy_biet'],
 ['t2','Kiếm một cái điện thoại. Có máy mới gửi tin ra được. (Đi đêm.)','hoi>=2 !co:x_may co:x_to_biet|co:x_thuy_chi'],
 ['t3','Gửi tin giấu chữ ra ngoài: SONG (chỗ ở), rồi giờ ập vào.','hoi>=2 co:x_may !co:x_tin_3g'],
 ['t4','Dò lịch tuần tra (đi đêm) rồi nối với sơ đồ để tìm khe hở.','hoi>=2 !co:x_gio'],
 ['t5','Mở một lối ra sông: cửa sau (cần chìa) hoặc rào sau bếp (cần kìm).','hoi>=2 !co:x_cua !co:x_rao'],
 ['t6','Ai là Ông Chủ Lò? Gom chứng cứ: {ocl}/5.','hoi>=2 !cc:suy_x_my']];
MUC2.forEach(([k,loi,hien])=>M('MUC_x'+k,'muc','',loi,{hien}));

/* câu nói vu vơ khi bấm người không có việc */
const RR={bay:['Ăn lẹ đi em. Một giờ là vô ca.','Chỉ tiêu trên bảng kìa. Coi cho kỹ.','Chị không thích nghe hỏi nhiều.'],
 seo:['Nhìn gì.','Đi chỗ khác.','Muốn ra cổng hả? Ra đi. Coi ai cản.'],
 nhi:['Bà ngoại em chắc tưởng em có lương rồi á.','Em gõ nhanh nhất phòng đó. Hổng có gì vui hết.'],
 toan:['Tui hổng muốn dính vô chuyện gì hết.','Nợ app ba chục, giờ nợ trại một trăm. Cộng kiểu gì cũng hổng hết.'],
 hue:['Con ăn thêm đi, chị ăn hổng hết.','Chị đi chậm thôi, chớ chị đi được.'],
 ti:['Đêm nào em cũng nghe tiếng nước.','Anh có biết từ đây ra sông bao xa hông?'],
 thuy:['Phòng 3 giờ ai ở vậy anh?','Đừng đứng gần em lâu quá.'],
 ngan:['Đừng nhìn tui. Có camera.','Ăn đi. Đứng đó người ta để ý.'],
 khang:['Anh tui... ổng sao rồi?','Đi đi. Đứng đây với tui là bị ghi tên.'],
 loc:['Cậu tới đây thiệt hả. Cậu điên còn hơn tui.','Bếp nóng lắm. Đừng vô.']};
for(const k in RR) RR[k].forEach((t,i)=>X('R_'+k+'_x'+i,'Câu vu vơ',[[{bay:'Chị Bảy',seo:'Sẹo',nhi:'Nhi',toan:'Toàn',hue:'Chị Huệ',ti:'Tí',thuy:'Thủy',ngan:'Ngân',khang:'Khang',loc:'Anh Lộc'}[k],t]]));
