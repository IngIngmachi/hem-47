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
      if(who==='') kieu='mota'; else if(who[0]==='~'){ kieu='nghi'; ai=''; } else if(who[0]==='#'){ kieu='tin'; ai=who.slice(1); } else if(who[0]==='@'){ kieu='nhom'; ai=who.slice(1); }
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
  'Ngân ngồi trên ghế nhựa trước tạp hóa của mẹ. Tóc cắt ngắn như con trai, chưa kịp dài ra.',
  'Cơ quan điều tra vẫn mời lên bổ sung lời khai mỗi tuần. Trên mạng, người ta vẫn réo tên cô là "con lừa đảo ôm 1 tỷ 2".',
  {if:'p1:ngan_bv',L:['Trên giấy tờ ghi cô là nạn nhân bị ép buộc. Ít ra hồ sơ ghi vậy.']},
  {if:'!p1:ngan_bv',L:['Hồ sơ vẫn treo đó. Chưa có gì chứng minh được cô bị ép.']},
  '2 giờ sáng. Cái đt cũ ốp mèo đen sáng màn hình. Số lạ, đầu số bên kia biên giới.',
  ['#Số lạ','Sáng nay trời mưa quá chị ơi. Ít bữa nữa em mua dép mới. Hôm qua tụi em được ăn thịt. Ai cũng nhớ chị hết á.'],
  ['~','Chữ "á" cuối câu. Trong tổ chỉ có một đứa hay gõ kiểu này.'],
  ['~','Lâm đang ở phòng 3 nhà bà Sáu, cách đây ba căn. Đúng cái thằng viết bài hại mình năm ngoái.'],
  ['~','Mà giờ mình cần ổng.']]},
 {if:'nhanh:B ket1:bocphot',L:[
  {bg:'x2-hien-basau-dem'},{card:'HAI THÁNG SAU BÀI ĐĂNG LÚC 21:40\nHẺM 47'},
  'File ghi âm cuộc gọi lúc 21:15 năm ngoái bị tung lên khắp các trang mạng. Bài nào cũng mấy ngàn cmt chửi.',
  'Dân mạng lùng ra tận phòng 3. Bà Sáu trả lại tiền cọc, rồi dúi vô tay Lâm cái mền cũ.',
  ['Bà Sáu','Bà hổng có đuổi con. Tại bà giữ con ở trển hết được rồi. Thôi xuống ngủ đỡ ngoài hiên đi, có mái che.'],
  ['~','Trại ở khu Ba Vẹt dọn đi ngay cái đêm mình bấm đăng bài. Giờ chẳng biết Ngân với Thủy bị lùa đi đâu.'],
  ['~','Lại thêm một lần mình hại cổ. Lần này không ngồi im được nữa.']]},
 {if:'nhanh:B ket1:tien',L:[
  {bg:'x2-van-phong-lam'},{card:'SÁU THÁNG SAU\nMỘT VĂN PHÒNG CÓ MÁY LẠNH'},
  'Văn phòng mới có bàn gỗ, máy lạnh, treo bảng đồng "Dịch vụ xác minh thông tin" đàng hoàng. Khách khứa ra vô đều đặn.',
  '2 giờ sáng, nick cũ của Ngân nhắn tới.',
  ['#Ngân','a lam. e la thuy. chi ngan ko con o day nua'],
  'Xong cái nick đó khóa luôn.',
  ['~','"Ko còn ở đây" là sao? Bị bán qua khu khác rồi, hay là...'],
  ['~','Đống tiền này tụi nó trả để bịt miệng mình. Giờ lấy đúng tiền đó mua đường vô trại.'],
  ['~','Trả mặt bằng văn phòng. Dọn về lại hẻm 47.']]},
 {if:'nhanh:B !ket1:bocphot !ket1:tien',L:[
  {bg:'x2-hem-mua'},{card:'HAI THÁNG SAU NGÀY THỨ BA MƯƠI\nHẺM 47'},
  'Lâm vẫn ở lì phòng 3. Đêm nào cũng mở tấm hình chụp Ngân trước cửa khẩu ra ngó.',
  'Trại ở khu Ba Vẹt đã dọn đi ngay trong đêm. Hương nhờ người bên kia hỏi thăm mà bặt vô âm tín.',
  'Chiều nay, ngay cột điện đầu hẻm 47 lại dán tờ rơi mới. Mực in còn mới tinh.',
  '"Tuyển gấp nam nữ 18–35. Việc văn phòng nhẹ, lương 25–30 triệu. Bao ăn ở. Lo hết giấy tờ."',
  ['~','Y chang kiểu chữ cũ, cũng câu "lo hết giấy tờ". Chỉ đổi mỗi số đt.']]},
 {bg:''}]);

X('x_hd','Phần 2 · hướng dẫn',[
 'Cách chơi y như Phần 1: đi dọc hẻm, chạm người để nói chuyện, chạm cửa để vô nhà, mở đt coi manh mối, nối thẻ, viết báo cáo.',
 {if:'nhanh:A',L:['Nhánh này chơi song song 2 người: ngày lẻ là Ngân, ngày chẵn là Lâm. Có 7 ngày chuẩn bị trước khi một trong hai người lên xe vô trại.']},
 {if:'nhanh:B',L:['7 ngày ở ngoài phải làm cho xong: dò coi trại dời đi đâu, kiếm đường lên xe, gom tiền thuê ghe, tập nhắn tin giấu chữ.']},
 'Cơ chế mới ở Phần 2: ghép giấy rách, vẽ sơ đồ trại, nhắn tin giấu chữ đầu câu, lén đi đêm, và dẫn người trốn ra sông.',
 'Vô trại rồi thì sau 22:00 chọn việc đi đêm là vô thẳng trò nhỏ. Việc ban đêm mới mở sẽ có thông báo và hiện trong khung mục tiêu.',
 'Trên máy tính: ← → đi, E đọc tiếp, 1–6 chọn, P điện thoại. Trong trò nhỏ, Space bấm hoặc giữ nút vàng, Esc để rút. Dòng phím tắt luôn nằm dưới khung chơi.',
 'Dấu ! vàng là việc chính. Bấm nút vàng dưới khung mục tiêu để đi thẳng tới việc kế tiếp.']);

/* =====================================================================
   HỒI 1 · NHÁNH A (Ngân ngày lẻ, Lâm ngày chẵn)
   ===================================================================== */
X('x_a_giaitin','A · giải tin của số lạ',[
 'Ngân lấy cái đt cũ dưới ngăn kéo quầy ra, đọc lại tin nhắn lúc 2h sáng.',
 ['~','Chính mình chỉ cho tụi nhỏ trong tổ cách này. Đừng đọc nguyên câu, ghép chữ đầu mỗi câu lại.'],
 {game:'giaitin'},
 {if:'co:x_siha',L:[['~','S - I - H - A. Cảng Xi-ha. Tụi nó dời nguyên tổ của mình về dưới đó rồi.'],['~','Đứa nhắn tin là con Nhi. Vậy là nó còn sống, còn cầm máy gõ được.'],
   ['~','Mình không thể tự vượt biên qua đó. Mà hồ sơ của mình bên cơ quan điều tra còn chưa khép lại, giờ đi trình báo ai tin.'],
   ['~','Lâm. Thằng chả giỏi đào bới thông tin lắm mà.'],{fx:'+co:x_a_tin1 +cc:x_siha'}]},
 {if:'!co:x_siha',L:[['~','Đầu óc rối bời quá, ghép chữ hoài chưa ra nghĩa. Để lát bình tĩnh ngồi đọc lại coi.']]}]);
X('x_a_sodo','A · vẽ lại sơ đồ trại',[
 'Ngân xé đại một tờ giấy trong cuốn tập cũ của Thủy, trải lên mặt quầy.',
 ['~','Tầng trệt là phòng máy, nhà bếp nằm sát cửa sau. Lầu 2 là phòng ngủ, buồng tắm tuốt cuối hành lang. Còn lầu 3... hồi ở trển mình chưa được lên lần nào.'],
 {game:'sodo'},
 {if:'co:x_sodo_ok',L:[
  {if:'p1:phat_nhanchung',L:['Sáng ra thấy có cái phong bì nhét dưới khe cửa cuốn. Nét chữ thằng Phát: vẽ sẵn sơ đồ 3 tầng, có luôn cả lầu 3.',['~','Thằng nhỏ nhớ đường đi nước bước còn kỹ hơn mình.'],{fx:'+co:x_sodo3'}]},
  {if:'!p1:phat_nhanchung',L:[['~','Còn lầu 3 bỏ trống. Lên trển rồi tự mò sau vậy.']]},
  {fx:'+co:x_sodo +cc:x_sodo'}]},
 {if:'!co:x_sodo_ok',L:[['~','Nhớ lộn xộn hết trơn, vẽ chưa khớp các phòng. Để lát ráng nhớ kỹ lại rồi vẽ tiếp.']]}]);
X('x_a_moi','A · Ngân tới phòng 3',[
 {bg:'trong-phong3'},
 'Ngân đứng trước phòng 3, gõ cửa cộc cộc.',
 ['Lâm','...Ngân?'],
 ['Ngân','Tui qua đây không phải để nghe anh xin lỗi. Tui qua vì anh rành chuyện tìm người.'],
 ['Ngân','Tổ cũ của tui còn mười mấy đứa kẹt lại. Tụi nhỏ mới nhắn về nè, anh đọc coi.'],
 ['~','Đưa cái đt qua. Ổng cầm đọc kỹ từng chữ một.'],
 {chon:[
  {t:'"Để tôi phụ cô. Không cần điều kiện gì hết."',L:[['Lâm','Tôi giúp. Cô khỏi cần tin tôi, cứ coi như đang xài tôi đi.'],['Ngân','Được. Vậy ngày lẻ tui đi, ngày chẵn anh đi. Đừng có đi chung, bà con trong hẻm dòm ngó.']]},
  {t:'"Cô chắc là con bé Nhi nhắn không? Coi chừng tụi nó gài bẫy."',L:[['Ngân','Anh làm nghề riết rồi đâm ra nghi ngờ tất cả mọi người hả?'],['Lâm','...Tôi xin lỗi. Để tôi phụ cô.'],['Ngân','Ngày lẻ tui đi, ngày chẵn anh đi. Đừng đi chung, người ta để ý.']],s:'-tin_ngan'}],q:'Ngân đang đứng ở cửa'},
 {fx:'+co:x_hop'},{bg:''}]);
X('x_a_huong','A · gặp Hương',[
 'Quán Thảo Điên. Hương vẫn ngồi cái bàn cũ, máy ghi âm đặt úp trên bàn.',
 ['Hương','Ông đọc tin con Ngân đưa chưa? Bên tôi cũng mới nắm được thêm tin.'],
 ['Hương','Trại Ba Vẹt đợt trước chỉ là 1 trong 3 nhánh thôi, chung một chủ hết. Hai khu kia dời tuốt vô Cảng Xi-ha rồi.'],
 ['Hương','Tụi trong đường dây kêu người đứng đầu là "Ông Chủ Lò". Chỉ toàn gửi ghi âm chỉ đạo chứ chưa ai thấy mặt.'],
 ['Lâm','Anh Hai là ông Tú rồi. Vậy ai còn ngồi trên đầu ông Tú nữa?'],
 ['Hương','Tôi cũng đang tìm câu trả lời đó. Ông cứ lần theo đường tiền đi, tiền chảy về đâu là chủ ở đó.'],
 {if:'p1:phuong_dauthu',L:[['Hương','À, con bé Phương có gửi cho tôi địa chỉ một cái ví. Nó nhắn nếu ông cần tra thì cứ lấy xài.'],{fx:'+co:x_vi_phuong'}]},
 {fx:'+co:x_vu_ocl +cc:x_ocl'}]);
X('x_a_vi','A · lần ví Anh Hai',[
 'Lâm mở lại lịch sử cái group "Hội nạn nhân Ngân Order" cũ, dò ngược lại đường đi của mấy khoản tiền cọc.',
 {if:'co:x_vi_phuong',L:['Có sẵn cái địa chỉ ví của Phương đưa nên bỏ qua được một tầng trung gian.']},
 {game:'dongtien1'},
 {if:'cc:x_vi',L:[['~','Cứ tối Chủ nhật là tiền lừa đảo gom về 2 ví tổng ở Quận 7. Mà khoan... một trong hai ví này chính là tài khoản giải ngân của cái app vay nặng lãi đã cho anh Lộc vay 5 triệu đẻ thành 40 triệu!']]}]);
X('x_a_thoa','A · về tạp hóa gặp mẹ',[
 {if:'p1:noi_cuocgoi',L:[['Cô Thoa','Con cầm theo cái máy cũ này đi. Ngày nào mẹ cũng cắm sạc sẵn hết á.'],['Cô Thoa','Thằng Lâm nó qua thú thiệt với mẹ hết rồi. Mẹ hận nó, mà vụ này mẹ tin nó làm thiệt.'],['~','Suốt 19 tháng trời, ngày nào mẹ cũng lụi cụi cắm sạc cái đt này.'],{fx:'+co:x_maycu +tin_thoa'}]},
 {if:'!p1:noi_cuocgoi',L:[['Cô Thoa','Mà con làm gì ở ngoài thì làm, đừng có dắt xác thằng đó bước vô nhà mẹ.'],['Ngân','Mẹ à, giờ có mỗi ổng chịu nhảy vô phụ con thôi.'],['Cô Thoa','...'],['~','Mẹ vẫn chưa tha thứ cho Lâm. Chính mình cũng vậy.']]},
 {if:'!p1:ngan_bv',L:['Ra tới đầu hẻm, Ngân kéo sụp vành nón. Hồ sơ bên cơ quan điều tra vẫn chưa khép lại hoàn toàn.',{fx:'+lo:5'}]}]);
X('x_a_giong','A · nghe tin thoại',[
 'Nhi lén chuyển tiếp về được một file ghi âm lấy từ máy quản lý. Giọng đàn ông nghe rè rè, đều rang như robot.',
 ['Ông Chủ Lò','Tổ con mèo tháng này hụt doanh số. Tháng sau còn thiếu nữa là tao sang tay nguyên đám qua bãi khác. Tin để lâu là thiu.'],
 ['~','"Tin để lâu là thiu." Lại là câu cửa miệng của ông Tú, mà cái giọng này nghe lạ hoắc.'],
 ['~','Khoan, dưới nền ghi âm có lẫn tạp âm gì đó. Để kích âm lượng lên lọc thử.'],
 {game:'nghetieng'},
 {if:'cc:x_giong',L:[['~','Tiếng loa phường đọc thông báo bằng tiếng Việt? Vậy cái người ghi âm câu này đang ngồi ngay ở Việt Nam!']]}]);
X('x_a_vinh','A · gặp đại úy Vinh',[
 ['Đại úy Vinh','Lại là cậu hả. Ngồi đi.'],
 ['Đại úy Vinh','Tôi nói rõ: qua khỏi cột mốc biên giới là ngoài lãnh thổ Việt Nam. Công an mình không thể tự qua nước bạn bắt người. Muốn giải cứu thì Bộ Công an phải đề nghị cảnh sát nước bạn phối hợp.'],
 ['Đại úy Vinh','Bên đó có người canh gác có vũ trang. Phía bạn chỉ ra quân khi có đủ 3 thứ: vị trí chính xác chỗ giữ người, bao nhiêu người Việt bên trong, và khung giờ lính gác đổi ca.'],
 ['Đại úy Vinh','Cậu truyền tin ra bằng cách nào thì tùy, tuyệt đối không để lộ kênh liên lạc. Ngụy trang thành tin nhắn rác quảng cáo là an toàn nhất.'],
 {if:'p1:tu_lo',L:[['Đại úy Vinh','Còn đây là biên bản lời khai của Đặng Minh Tú tại cơ quan điều tra. Ổng đang bị cấm đi khỏi nơi cư trú. Tụi tôi thả dây dài để lần ra người cầm tiền phía trên.'],'"Tôi không phải chủ lò. Tôi chỉ đứng mũi chịu sào ngoài mặt thôi. Tiền bạc là má tôi nắm hết."',['~','Má của ông Tú — bà Trần Thị Mỹ. Đúng cái tên đứng chức giám đốc cả hai công ty.'],{fx:'+cc:x_tu'}]},
 {fx:'+co:x_vinh'}]);
X('x_a_khoa','A · thăm Khoa',[
 'Phòng thăm gặp trại giam. Khoa ốm rộc, đầu húi cua, gặp người vẫn giữ thói quen chắp tay.',
 ['Khoa','Thằng Khang vẫn kẹt ở bển. Tụi nó mới lùa nó qua trại mới rồi.'],
 ['Khoa','Chuyến xe tuần sau tài xế là mối ruột của anh. Em muốn trà trộn lên xe thì anh móc nối cho. Chỉ xin em một chuyện thôi.'],
 ['Lâm','Anh muốn tôi kiếm cách lôi thằng Khang về chứ gì.'],
 ['Khoa','Ráng đem nó về giùm anh. Còn phần anh ở tù mấy năm anh cũng cam tâm.'],
 {fx:'+co:x_duong_khoa'}]);
X('x_a_thoai','A · gặp Tài xế Thoại',[
 'Bến ghe sát biên giới. Ông lái ghe ngồi vá lưới, điếu thuốc trên môi tắt queo từ đời nào.',
 ['Tài xế Thoại','Đưa người qua sông giá khác. Rước người trốn về giá khác.'],
 ['Tài xế Thoại','Ai chồng đủ tiền thì tui chạy. Tui hổng hỏi tên tuổi làm gì.'],
 {if:'p1:loc_o',L:['Anh Lộc lấy xe máy chở ra tận bến mà không lấy tiền xăng. Ổng đứng tuốt đằng xa hút thuốc, ngó chừng giùm.']},
 {chon:[
  {t:'Đặt cọc trước 1.500.000đ giữ ghe đêm đó',sub:'giữ chỗ ghe',dis:'tien>=1500000',s:'-tien:1500000 +co:x_ghe +tin_thoai',L:[['Tài xế Thoại','Rồi, nhận tiền. Đêm nào, mấy giờ ra tới bến thì nhắn tui một chữ.']]},
  {t:'Để về gom đủ tiền rồi quay lại đưa sau',L:[['Tài xế Thoại','Tới giờ nước lên là tui nổ máy. Ghe tui hổng có đợi ai hết nghen.']]}],q:'Tài xế Thoại'},
 {fx:'+co:x_gap_thoai'}]);
X('x_a_tin2','A · tin thứ hai',[
 'Nửa đêm. Con Nhi lại lén gửi về thêm một tin nhắn nữa, dài hơn tin trước.',
 {game:'giaitin2'},
 {if:'co:x_a_tin2_ok',L:[['~','Còn Nhi, chị Huệ, Tí, anh Toàn. Riêng con bé Oanh hụt chỉ tiêu hai tuần liền… đã bị bán qua bên Miến Điện rồi.'],
  'Ngân gõ 4 cái tên lưu vô ghi chú đt, đặt tên mục là "Tổ".']},
 {if:'!co:x_a_tin2_ok',L:[['~','Chưa ghép ra hết nguyên câu, mới nhìn ra được chữ N đầu tiên. Ít nhất là con Nhi vẫn còn sống.']]}]);
X('x_a_gom','Gom tiền trong hẻm',[
 'Lâm ghé từng nhà trong hẻm. Không mở miệng xin, chỉ kể thiệt mọi chuyện.',
 {if:'tin_ba_sau>=3',L:[['Bà Sáu','Cầm lấy chút đỉnh đi con. Tiền bà cất kỹ tính để dành mua cái hòm, mà thôi giờ cứu người trước đi.'],{fx:'+tien:1000000'}]},
 {if:'tin_bin>=2',L:[['Bin','Bữa giờ em chạy ship để dành được nhiêu đây nè. Anh cầm đi, đừng nói cho cô Thoa biết nha.'],{fx:'+tien:300000'}]},
 {if:'p1:noi_cuocgoi',L:[['Cô Thoa','Cầm lấy đi con. Đống tiền này hồi trước mẹ gom góp tính đi chuộc con về mà hổng kịp.'],{fx:'+tien:2000000'}]},
 {if:'tin_ba_sau<3 tin_bin<2 !p1:noi_cuocgoi',L:[['~','Không ai chịu góp đồng nào. Cũng phải thôi, hồi trước mình sống sao giờ người ta nhìn vô vậy.']]},
 {fx:'+co:x_gom'}]);
X('x_a_cainhau','A · ai vào trại',[
 {bg:'trong-phong3-dem'},
 'Phòng 3, 11h đêm. Ngân đứng khoanh tay, Lâm ngồi trước bàn. Tờ sơ đồ trại trải chính giữa.',
 ['Ngân','Để tui vô. Đường đi nước bước trong đó tui rành hết, tụi nhỏ thấy mặt tui là tụi nó nghe liền.'],
 ['Lâm','Tụi quản lý nhớ mặt cô rồi. Cô mà bước vô cổng là tụi nó đem cô ra xử làm gương cho nguyên trại coi đó.'],
 ['Ngân','Chứ anh mò vô trển khác gì nộp thêm cái mạng thứ 13? Anh biết tụi lính gác đổi ca lúc mấy giờ hông?'],
 {if:'p1:noi_cuocgoi',L:[['Ngân','Chuyện anh qua thú thiệt với mẹ tui, tui cảm ơn. Nhưng cái tổ đó là người của tui, để tui tự lo.']]},
 {if:'!p1:noi_cuocgoi',L:[['Ngân','Giờ tự dưng anh quay ra lo cho mạng của tui hả? Năm ngoái lúc bấm đăng bài sao anh không lo đi.']]},
 'Cả hai im bặt. Nhìn qua cửa sổ, tiệm tạp hóa cô Thoa dưới nhà đã tắt đèn từ lâu.',
 {chon:[
  {t:'Để Ngân đi vô trại',sub:'thuộc đường, tổ tin ngay; nhưng bị nhận mặt, quản lý nghi từ đầu',s:'vao:ngan',L:[['Lâm','...Được rồi, vậy tôi đợi ở bờ sông bên này. Cô nhắn tin gì ra tôi cũng sẽ giải mã hết.'],['Ngân','Anh mà dịch sai một chữ thôi là tụi tui kẹt lại bên đó hết đó.']]},
  {t:'Lâm đi vô trại, Ngân ở ngoài tiếp ứng',sub:'mặt lạ; nhưng tổ chưa tin, phải nói mật khẩu của Ngân',s:'vao:lam +co:x_meo_cailoi +co:x_ma_meo',L:[['Ngân','Nếu anh quyết định đi thì học thuộc lòng mấy cái này cho tui.'],['Ngân','Vô trển gặp đứa nào trong tổ cũ, cứ đọc mật khẩu "con mèo mun còn sống". Nghe câu đó tụi nó mới tin là người của tui gửi vô.'],['Ngân','Với nhớ kỹ: lúc bị ép gõ kịch bản lừa khách, tới chữ "chuyển" thì cố tình gõ sai thành "chuyễn". Ai tinh ý nhìn thấy sẽ tự biết đường né.']]}],q:'Ai vào trại?'},
 {fx:'+co:x_chot'},{bg:''}]);

/* =====================================================================
   HỒI 1 · NHÁNH B (Lâm)
   ===================================================================== */
X('x_b_basau','B · ngồi với bà Sáu',[
 ['Bà Sáu','Con ăn uống gì chưa? Vô bới tô cơm ăn cái đã rồi tính.'],
 ['Bà Sáu','Hồi trước bà ngồi đếm 12 đứa nhỏ xách vali đi từ cái gác trên kia. Bà đâu có ngờ đứa thứ 13 lại là con.'],
 ['Lâm','Con có đi đâu đâu bà.'],
 ['Bà Sáu','Nhìn cái mặt con là viết sẵn hai chữ sắp đi rồi. Bà sống bảy chục tuổi đầu, nhìn người còn rành hơn con đọc báo nữa.'],
 {fx:'+tin_ba_sau +co:x_b_basau'}]);
X('x_b_tratin','B · tra khu Ba Vẹt dời đi đâu',[
 'Báo mạng đăng tin: một khu phức hợp ở Ba Vẹt đã "tự giải tán" từ 2 tháng trước. Hình chụp chỉ còn dãy nhà trống không, cổng mở toang.',
 'Lục trong đống ảnh chụp màn hình cũ còn sót lại 1 cái cmt trước khi bị xóa: "tụi nó dời hết về khu casino cũ sát sông dưới Cảng Xi-ha rồi".',
 ['~','Cảng Xi-ha. Để hẹn gặp Hương hỏi thử coi cổ biết vị trí cái casino đó không.'],
 {fx:'+cc:x_siha +co:x_siha'}]);
X('x_b_huong','B · gặp Hương',[
 ['Hương','Ông còn dám vác mặt ra hẹn tôi nữa hả?'],
 ['Lâm','Tôi cần biết cái trại ở Ba Vẹt dời đi đâu rồi.'],
 {if:'tin_huong>=2|!ket1:bocphot',L:[['Hương','Dời về Cảng Xi-ha rồi. Nằm trong khu casino bỏ hoang sát bờ sông. Danh sách mấy người còn kẹt ở trển đây.'],'Trong danh sách ghi rõ: Nguyễn Thị Kim Ngân, Lê Thị Thủy, cùng mười mấy cái tên lạ hoắc.',{fx:'+co:x_ds_du'}]},
 {if:'tin_huong<2 ket1:bocphot',L:[['Hương','Tôi xé cho ông nửa tờ danh sách thôi. Nửa còn lại chừng nào ông chứng minh ông không bán tin câu view nữa tôi mới đưa.'],'Nửa tờ giấy trong tay có tên Ngân, phần bị xé mất nằm ngay tên của Thủy.']},
 {if:'tin_huong>=3|p1:phuong_dauthu',L:[['Hương','Còn đây là đường tiền: tiền lừa đảo từ trại đó gom hết về 2 cái ví điện tử. Cứ tối Chủ nhật là bắn một cục lớn.'],{fx:'+cc:x_vi'}]},
 ['Hương','Nguồn tin của tôi bên kia kêu kẻ cầm đầu cả 3 trại là "Ông Chủ Lò". Chỉ toàn ra lệnh qua tin nhắn thoại chứ không ai biết mặt.'],
 {fx:'+co:x_vu_ocl +cc:x_ocl +cc:x_siha'}]);
X('x_b_vinh','B · gặp đại úy Vinh',[
 ['Đại úy Vinh','Cậu tính tự mình vượt biên vô cái ổ đó thiệt hả?'],
 ['Lâm','Từ bên ngoài không thể định vị được chỗ giữ người. Phải có người từ bên trong gửi vị trí ra.'],
 ['Đại úy Vinh','Tôi cảnh báo trước: qua đó bằng đường tiểu ngạch là cậu tự đặt mình ra ngoài tầm với của tụi tôi, thành con tin thứ 13. Giải cứu là việc của lực lượng chức năng.'],
 ['Lâm','Vậy anh chỉ cho tôi cách thức liên lạc ra ngoài đi.'],
 ['Đại úy Vinh','...Ngụy trang bằng tin rác quảng cáo. Ghép chữ cái đầu mỗi câu thành mật mã. Khi bên tôi nhắn vô cũng dùng đúng quy tắc đó.'],
 ['Đại úy Vinh','Muốn đề nghị phía bạn phối hợp đột kích, tôi phải có đủ 3 thông tin từ bên trong: vị trí giữ người, số người, và giờ giao ca. Thiếu một thứ là không làm được.'],
 {if:'p1:tu_lo',L:[['Đại úy Vinh','Nhìn qua biên bản này đi. Lời khai của Đặng Minh Tú tại cơ quan điều tra: "Tiền bạc là má tôi giữ hết."'],['~','Bà Trần Thị Mỹ. Má ruột của ông Tú.'],{fx:'+cc:x_tu'}]},
 {fx:'+co:x_vinh'}]);
X('x_b_sodo','B · dò sơ đồ trại',[
 {if:'!co:x_sodo_info',L:[
  {if:'p1:phat_nhanchung',L:['5h sáng, Phát hẹn gặp ngoài bến sông. Nó lấy bút vẽ nguệch ngoạc lên mặt sau tờ lịch: tòa nhà 3 tầng, cầu thang chính giữa, cửa hậu thông ra bờ sông.',['Phát','Lầu 3 là văn phòng tụi sếp. Sổ sách chỉ tiêu cất hết trên đó, mà cửa khóa kỹ lắm, quản lý giữ chìa.'],['Phát','Vô trển rồi ráng giữ cái mạng nha anh, đừng có làm anh hùng mà chết oan.'],{fx:'+co:x_sodo3'}]},
  {if:'!p1:phat_nhanchung',L:['Lâm mò vô group "Hội người trốn về từ bên kia". Kiếm mãi mới có một người chịu nghe máy, nhưng tắt camera.','"Tầng trệt là phòng máy. Lầu 2 là chỗ ngủ. Còn lầu 3 có lính canh suốt, tui chưa bén mảng lên đó bao giờ."',['~','Chưa biết cấu trúc lầu 3 ra sao. Đành phải vô trển tự mò vậy.']]},
  {fx:'+co:x_sodo_info'}]},
 {game:'sodo'},
 {if:'co:x_sodo_ok',L:[{fx:'+co:x_sodo +cc:x_sodo'}]},
 {if:'!co:x_sodo_ok',L:[['~','Mấy cái phòng xếp chưa khớp nhau rồi. Để coi kỹ lại lời người ta chỉ rồi vẽ lại.']]}]);
X('x_b_duong','B · tìm đường lên xe',[
 {if:'p1:khoa_lat',L:[['Khoa','Em tính leo lên chuyến xe đợt tới thiệt hả? Anh vẫn còn giữ mối thằng tài xế.'],['Khoa','Thằng Khang em anh đang bị nhốt ở khu đó. Vô trển gặp được nó, nói giùm anh một câu xin lỗi.'],['Khoa','Hồ sơ giả của em đây, học thuộc cái tên mới này đi.'],{fx:'+co:x_duong_khoa +co:x_duong'}]},
 {if:'!p1:khoa_lat',L:[
  'Một văn phòng môi giới nằm ở quận khác. Cũng treo bảng màu xanh, cũng dán tờ rơi việc nhẹ lương cao, cũng rót trà đá mời khách y hệt VP số 12.',
  'Thằng nhân viên tư vấn cười niềm nở, thu 1 triệu tiền "phí làm hồ sơ", hứa hẹn qua bển nhận lương tháng đầu sẽ hoàn lại.',{fx:'-tien:1000000'},
  ['~','Giờ tới lượt mình phải đóng kịch. Lựa lời trả lời như một thằng đang cùng đường thiệt sự mới qua mắt được nó.'],
  ['Người tuyển','Hồi ở nhà em làm nghề gì?'],
  {chon:[{t:'"Em chạy xe ôm công nghệ, đang bể nợ app hơn ba chục củ."',s:'+co:x_tl1'},{t:'"Em làm phóng viên."',s:'+nghi:8'},{t:'"Em làm admin fanpage."',s:'+nghi:8'}],timer:10,mac:1,q:'Người tuyển đang nhìn'},
  ['Người tuyển','Có biết chữ, biết gõ máy tính cơ bản hông?'],
  {chon:[{t:'"Dạ biết sơ sơ, gõ chữ chậm chậm thì được."',s:'+co:x_tl2'},{t:'"Dạ em gõ 10 ngón lẹ lắm, dân làm content mấy năm trời mà."',s:'+nghi:8'}],timer:10,mac:1,q:'Người tuyển đang nhìn'},
  ['Người tuyển','Đi vầy rồi ở nhà có ai cản hông?'],
  {chon:[{t:'"Dạ hổng còn ai hết. Má em mất lâu rồi."',s:'+co:x_tl3'},{t:'"Dạ có bà chị ở nhà, chắc phải về xin phép bả một tiếng."',s:'+nghi:8'}],timer:10,mac:1,q:'Người tuyển đang nhìn'},
  {if:'co:x_tl1 co:x_tl2 co:x_tl3',L:[['Người tuyển','Ngon lành. Mai đi khám sức khỏe, đầu tuần sau lên xe luôn nghen.']]},
  {if:'!co:x_tl1|!co:x_tl2|!co:x_tl3',L:[['Người tuyển','Ờ... thôi cũng được. Mai qua phòng khám làm giấy sức khỏe đi.'],['~','Nó liếc nhìn mình hơi lâu, rồi cúi xuống ghi chú cái gì đó vô cuốn sổ.']]},
  {fx:'+co:x_duong'}]}]);
X('x_kham','B · khám sức khỏe',[
 'Phòng khám chật hẹp. Lâm cầm tờ giấy khám sức khỏe đóng sẵn cái mộc đỏ chót.',
 ['~','Tờ giấy y đúc cái tờ nằm trong vali màu hồng của Ngân trên gác nhà bà Sáu.'],
 'Ngoài ghế chờ có 2 người cũng đi chung đợt: một con bé ôm khư khư cái balo hồng, với một ông chú tay chân còn dính đầy vôi vữa.',
 ['Cô gái trẻ','Anh cũng đi chuyến này hả? Em ráng qua bển làm kiếm tiền gửi về mua thuốc cho ngoại em.'],
 ['Ông chú','Tui bị nợ app dí quá. Qua trển cày cỡ một năm trả dứt nợ rồi về.'],
 ['~','Hai con người này sắp bước lên chung chuyến xe với mình. Mình biết rõ cái ổ bên kia là địa ngục, còn họ vẫn tưởng đi đổi đời.'],
 {chon:[
  {t:'Kéo họ lại nói nhỏ: đừng có đi',sub:'có thể lộ',s:'+lo:10',L:[['Cô gái trẻ','Ủa anh nói chuyện nghe kỳ vậy? Bộ anh hông phải cũng đang xin đi như tụi em hả?'],'Thằng cò tuyển dụng trong phòng bước ra dòm chằm chằm.']},
  {t:'Làm thinh ngồi im',sub:'nói ra là lộ, cả ba cùng mất đường',L:[['~','Giờ cản ở đây chỉ có nước lộ tẩy hết. Vô trển rồi mình sẽ kiếm đường dắt họ về luôn một thể.']]}],q:'Hai người cùng đợt'},
 {fx:'+co:x_kham'}]);
X('x_tapma','B · tập nhắn giấu chữ với Bin',[
 ['Bin','Anh muốn tập gõ mật mã kiểu chị Ngân hả? Đâu, để em giả làm thằng quản lý đứng soi cho. Anh gõ thử đi.'],
 ['Bin','Anh thử gõ tin rác sao cho ghép chữ đầu ra chữ SONG coi.'],
 {game:'giauchu',s:'+co:x_tap'},
 {if:'co:x_tap_ok',L:[['Bin','Đọc lướt qua tưởng tin quảng cáo thiệt luôn á. Mà ghép chữ đầu lại ra đúng chữ SONG. Hay dữ.']]},
 {if:'!co:x_tap_ok',L:[['Bin','Anh cứ canh chữ cái đầu tiên của mỗi câu: S - O - N - G. Nhớ viết câu dài dài tự nhiên xíu đừng để cụt ngủn.']]},
 {fx:'+co:x_tapma +co:x_meo_hieu +tin_bin'}]);
X('x_b_khoa','B · thăm Khoa',[
 'Phòng thăm gặp trại giam. Khoa ốm nhom, đầu cạo trọc.',
 ['Khoa','Em quyết định chui vô trển thiệt đó hả?'],
 ['Khoa','Thằng Khang bị nhốt ở dãy nhà trong. Tánh nó lì lắm, nếu gặp được nó, em nói giùm là anh hai xin lỗi nó nhiều lắm.'],
 {fx:'+co:x_b_khoa'}]);

/* chung hai nhánh */
X('x_ghep','Tờ rơi ở cột điện',[
 'Cột điện đầu hẻm. Tờ rơi tuyển dụng mới dán đã bị ai xé toạc, rớt mấy mảnh vụn dưới vũng bùn.',
 ['~','Mặt sau tờ giấy có in hình con dấu đỏ. Lụm ghép lại là lòi ra tên công ty đứng sau.'],
 {game:'ghepgiay'},
 {if:'cc:x_phatdat',L:[['~','"Công ty TNHH Dịch vụ Thương mại Phát Đạt TN." Lại là cái công ty ma ở sát cửa khẩu.'],['~','Về mở laptop tra kỹ lại hồ sơ pháp lý của công ty này mới được.']]}]);
X('x_tra_phatdat','Tra công ty Phát Đạt TN',[
 'Cổng thông tin doanh nghiệp: Người đại diện pháp luật là bà Trần Thị Mỹ, sinh năm 1966.',
 'Ngoài Phát Đạt TN, bà Trần Thị Mỹ còn đứng tên công ty Mỹ Hưng Logistics và một nhánh tài chính cho vay qua app — chính là bên thuê anh Hào đi đòi nợ ở hẻm 47.',
 {if:'nhanh:A',L:[['~','Trần Thị Mỹ... Nhớ ra rồi, trên trang cá nhân ông Tú từng đăng hình mừng thọ má ổng 60 tuổi: "Cả đời mẹ lo cho con."']]},
 {if:'nhanh:B',L:[['~','Trần Thị Mỹ chính là má ruột ông Tú. Thảo nào trên trang cá nhân ổng từng đăng bài mừng thọ 60 tuổi.']]},
 ['~','Nhưng chỉ đứng tên trên giấy phép kinh doanh thì chưa đủ căn cứ buộc tội bà Mỹ điều hành cái trại đó. Phải lấy được chứng cứ gốc ngay bên trong trại.'],
 {fx:'+cc:x_bamy'}]);
X('x_tra_ghe','Trả tiền ghe',[
 {if:'tien>=1500000',L:[['Tài xế Thoại','Rồi, tiền bạc sòng phẳng. Đêm nào rút ra tới bờ sông thì nhắn tui một chữ.'],{fx:'-tien:1500000 +co:x_ghe +tin_thoai'}]},
 {if:'tien<1500000',L:[['Tài xế Thoại','Chưa gom đủ tiền thì khỏi bàn tiếp. Ghe tui hổng chạy thiếu.']]}]);
X('x_b_gom','B · gom tiền',[
 'Lâm đi gõ cửa từng nhà trong hẻm. Không mở miệng xin, chỉ kể rõ chuyến này mình đi đâu.',
 {if:'tin_ba_sau>=3',L:[['Bà Sáu','Cầm lấy chút đỉnh đi con. Tiền dưỡng già bà cất mua cái hòm, mà thôi giờ đem mua đò cứu tụi nhỏ trước đi.'],{fx:'+tien:1000000'}]},
 {if:'tin_bin>=2',L:[['Bin','Em gom hết tiền chạy ship tuần này được nhiêu đây. Anh cầm đi lo việc, đừng nói ai biết nha.'],{fx:'+tien:300000'}]},
 {if:'p1:noi_cuocgoi',L:[['Cô Thoa','Cầm lấy đi. Qua bển lôi con Ngân về đây cho cô.'],{fx:'+tien:2000000'}]},
 {if:'tin_ba_sau<3 tin_bin<2 !p1:noi_cuocgoi',L:[['~','Không ai đưa đồng nào. Cũng chẳng trách người ta được, mình làm gì còn uy tín để ai tin.']]},
 {fx:'+co:x_gom'}]);
X('x_mon','Chọn món mang theo',[
 ['~','Mấy người từng trốn về dặn kỹ: vừa qua biên giới là tụi bảo vệ lột sạch đồ đạc khám xét. Chỉ ráng giấu lọt được đúng 1 món trong người thôi.'],
 {chon:[
  {t:'Cái SIM rác nhỏ xíu, khâu giấu vô lai quần',sub:'có máy là gửi tin ra được, quản lý ít đọc',s:'mon:sim'},
  {t:'Móc khóa con mèo vải màu đen của Ngân',sub:'tổ biết con mèo này là của ai',s:'mon:meo'},
  {t:'Mẩu giấy nhỏ ghi số đt của Hương',sub:'chắc ăn, nếu quên số',s:'mon:giay'}],q:'Chỉ một món. Món gì?'},
 {fx:'+co:x_mon_xong'}]);
X('x_demcuoi','Đêm cuối ở Sài Gòn',[
 {if:'vao:ngan',L:[{bg:'trong-taphoa'},'Tạp hóa kéo cửa cuốn một nửa. Cô Thoa ngồi gói xôi, tay cứ quấn đi quấn lại có một gói.',['Cô Thoa','Đợt trước con bỏ đi mẹ hổng hề hay biết. Còn đợt này mẹ biết rõ con đi đâu.'],['Cô Thoa','Mẹ hổng có cản con đâu. Mẹ ở nhà vẫn cắm sạc cái máy cũ mỗi ngày đợi tin con.'],['Ngân','Đợt này qua trển con hứa sẽ nhắn về cho mẹ liền mà.']]},
 {if:'!vao:ngan p1:noi_cuocgoi',L:[{bg:'trong-taphoa'},'Tạp hóa khép hờ. Cô Thoa ngồi vuốt lại xấp tiền lẻ, mắt không ngước lên.',['Cô Thoa','Sáng mai lên đường hả?'],['Lâm','Dạ cô.'],['Cô Thoa','Kiếm đường dắt con Ngân về cho cô. Mà mày cũng phải giữ mạng mà về đó, nghe chưa.']]},
 {if:'!vao:ngan !p1:noi_cuocgoi',L:[{bg:'x2-hien-basau-dem'},['Bà Sáu','Bà hổng hỏi con đi đâu làm gì. Chỉ dặn con một câu: tới đâu cũng phải ráng nuốt hột cơm cho có sức.'],'Bà Sáu dúi vô tay Lâm gói xôi nóng hổi bọc lá chuối kỹ lưỡng.']},
 {if:'p1:loc_o',L:['3h sáng, anh Lộc đã nổ máy xe chờ sẵn đầu hẻm. Ổng làm thinh đưa cái nón bảo hiểm qua.']},
 {bg:''}]);
X('kq_xvinh','Kế hoạch gửi đại úy Vinh',[
 {if:'tin_bang_xvinh>=3',L:[['#Đại úy Vinh','Đã nhận đủ thông tin. Phía bạn đồng ý phối hợp, lực lượng đã vào vị trí. Chỉ chờ tín hiệu giờ G từ bên trong.'],{fx:'+co:x_vinh_ok'}]},
 {if:'tin_bang_xvinh<3',L:[['#Đại úy Vinh','Thông tin còn mơ hồ quá, chưa đủ để đề nghị phía bạn ra quân. Xác minh lại rồi gửi ra sau.'],{fx:'+lo:5'}]}]);

/* =====================================================================
   BẢNG: manh mối, nối, báo cáo, mục tiêu, tìm kiếm
   ===================================================================== */
const CC2=[
 ['x_siha','Manh mối','Cảng Xi-ha','Tổ cũ của Ngân đã bị dời về một khu casino bỏ hoang sát sông ở Cảng Xi-ha, có bảo vệ vũ trang canh gác.'],
 ['x_ocl','Manh mối','"Ông Chủ Lò"','Kẻ cầm đầu cả 3 khu trại. Chưa ai thấy mặt, chỉ toàn chỉ đạo qua tin nhắn thoại bóp giọng.'],
 ['x_sodo','Manh mối','Sơ đồ trại','Tầng trệt: phòng máy, bếp, cửa hậu ra sông. Lầu 2: phòng ngủ, buồng tắm. Lầu 3: văn phòng quản lý.'],
 ['x_vi','Chứng cứ','Dòng tiền tối Chủ nhật','Tiền lừa cọc gom về 2 ví tổng ở Quận 7 mỗi tối Chủ nhật — dùng chung nguồn tiền với cái app vay nặng lãi đã bẫy anh Lộc ở Hẻm 47.'],
 ['x_giong','Chứng cứ','Tin thoại có tiếng loa phường','File ghi âm của Ông Chủ Lò. Lọc tạp âm nền nghe rõ tiếng loa phường đọc thông báo bằng tiếng Việt.'],
 ['x_phatdat','Manh mối','Con dấu Phát Đạt TN','Mặt sau tờ rơi tuyển dụng ở cột điện có in dấu mộc của Công ty TNHH DV Thương mại Phát Đạt TN.'],
 ['x_bamy','Manh mối','Bà Trần Thị Mỹ','Giám đốc đứng tên cả Phát Đạt TN lẫn Mỹ Hưng Logistics. Là má ruột của Đặng Minh Tú.'],
 ['x_tu','Chứng cứ','Anh Tú gọi "má"','Biên bản lời khai của Tú tại cơ quan điều tra: tiền bạc là "má" nắm hết, ổng chỉ đứng tên làm mặt tiền.'],
 ['x_so','Chứng cứ','Sổ chỉ tiêu','Cuốn sổ bìa đen trên lầu 3. Cột "nộp lên" do Chị Bảy ký tắt "B." kèm dấu mộc đỏ của Phát Đạt TN.'],
 ['x_giongthat','Chứng cứ','Giọng thật của Ông Chủ Lò','Khúc cuối ghi âm phần mềm đổi giọng bị tắt 2 giây: lộ giọng thật là một bà già, xưng "má", kêu Tú là "thằng Tú".'],
 ['x_khaibay','Lời khai','Lời khai Chị Bảy','"Bà già đó kêu chị là con Bảy, hổng bao giờ bật cam. Ba năm trước chị cũng vì bể nợ tiệm tóc đầu đường Fan Xích Vô mà bị lừa qua đây."'],
 ['x_no','Manh mối','Giấy nhận nợ 3.200 USD','Hợp đồng nhận nợ khống 3.200 USD (chi phí vượt biên, ăn ở, đào tạo). Bẫy nợ cưỡng bức lao động, không bao giờ trả hết.'],
 ['x_lich','Manh mối','Lịch tuần tra','Bảng giờ đi tuần và giao ca của lính gác từng tầng. Có một khoảng trống không người canh.'],
 ['suy_x_saigon','Suy luận','Ông Chủ Lò ở Sài Gòn','Ví tổng ở Quận 7 nối thẳng với app tín dụng đen ở Hẻm 47, ghi âm lại có tiếng loa phường: kẻ cầm đầu đang ngồi ngay tại Sài Gòn chăn dắt cả hai đầu.'],
 ['suy_x_my','Suy luận','Ông Chủ Lò là bà Trần Thị Mỹ','Bà Trần Thị Mỹ nắm trọn vòng khép kín: cho vay app đẩy người trong hẻm vào nợ -> mở VP số 12 lùa qua trại -> thu tiền lừa đảo về lại Quận 7.'],
 ['suy_x_khe','Suy luận','Khe hở 3 giờ sáng','Lính tầng trệt và lầu 2 giao ca lúc 3h sáng, bỏ trống cửa hậu ra sông suốt 2 phút.']];
CC2.forEach(([k,canh,ai,loi])=>M('CC_'+k,'cc',ai,loi,{canh}));
M('NOI_x_saigon','noi','x_vi + x_giong','Ông Chủ Lò ở Sài Gòn',{sau:'+cc:suy_x_saigon'});
M('NOI_x_saigon2','noi','x_bamy + x_giong','Ông Chủ Lò ở Sài Gòn',{sau:'+cc:suy_x_saigon'});
M('NOI_x_khe','noi','x_lich + x_sodo','Khe hở 3 giờ sáng',{sau:'+cc:suy_x_khe +co:x_gio'});
X('noi_x_saigon','Nối',[['~','Ví tổng mở tại Quận 7 dùng chung dòng tiền với app vay nặng lãi trong hẻm 47, ghi âm lại dính tiếng loa phường. Bà chủ lò tạo ra nguyên một cái bẫy khép kín ngay từ đầu hẻm: cho vay cắt cổ đẩy bà con vô đường cùng, rồi mở VP số 12 hốt qua bên này!']]);
X('noi_x_saigon2','Nối',[['~','Công ty đăng ký ở Sài Gòn, ghi âm có tiếng loa phường. Kẻ cầm đầu cái lò này đang ngồi ngay tại Việt Nam.']]);
X('noi_x_khe','Nối',[['~','Đúng 3h sáng, lính tầng trệt bỏ vị trí đi lên lầu 2 bàn giao ca. Cửa hậu sẽ bỏ trống không ai canh suốt 2 phút.'],['~','Thời điểm mở cửa trốn ra sông phải chốt đúng 3h sáng. Mật mã giờ G cần gửi về: 3G.']]);

/* báo cáo: kế hoạch gửi đại úy Vinh */
M('BANG_xvinh_1','bang','xvinh','Trại ở {}.');
 M('TU_xvinh_1_a','tu','BANG_xvinh_1','khu casino cũ sát sông ở Cảng Xi-ha',{hien:'cc:x_siha',sau:'dung'});
 M('TU_xvinh_1_b','tu','BANG_xvinh_1','khu cũ ở Ba Vẹt');
 M('TU_xvinh_1_c','tu','BANG_xvinh_1','một tòa nhà ở Nam Vang');
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
M('WEB_x_bavet','web','Ba Vẹt | khu Ba Vẹt | Bavet | Cảng Xi-ha | Xi-ha | Xi Ha Núc | Sihanoukville | casino sát sông','Báo Sài Gòn Mới · "Khu phức hợp ở Ba Vẹt tự giải tán?"',{sau:'+cc:x_siha +co:x_siha'});
 M('WP_x_bavet_01','trang','Bài báo · 2 tháng trước','Một khu phức hợp nghi tổ chức lừa đảo qua mạng ở Ba Vẹt đã "tự giải tán" trước khi cảnh sát ập vào. Ảnh chụp chỉ còn dãy nhà trống.');
 M('WP_x_bavet_02','trang','Bình luận đã xóa · còn ảnh chụp','"dời hết qua Cảng Xi-ha rồi, khu casino cũ sát sông"');
M('WEB_x_phatdat','web','Phát Đạt TN | Phat Dat TN | Công ty Phát Đạt | Trần Thị Mỹ | Tran Thi My | Mỹ Hưng Logistics','Thông tin doanh nghiệp · Phát Đạt TN',{sau:'+cc:x_bamy',hien:'cc:x_phatdat'});
 M('WP_x_phatdat_01','trang','Người đại diện','Người đại diện pháp luật: Trần Thị Mỹ (1966). Đứng tên luôn cả công ty Mỹ Hưng Logistics (chuyên "vận chuyển lao động").');
 M('WP_x_phatdat_02','trang','Bài mừng thọ · trang anh Tú','"60 năm. Cả đời mẹ lo cho con." Ảnh bánh kem ba tầng.');
M('WEB_x_canhbao','web','việc nhẹ lương cao | lừa qua Cam | tuyển dụng Campuchia | chuyển đối tác','Cổng thông tin Cảnh sát · Cảnh báo "việc nhẹ lương cao"');
 M('WP_x_canhbao_01','trang','Cảnh báo','Hàng loạt nạn nhân bị dụ ra biên giới bằng mồi "việc nhẹ lương cao", bị khống chế đưa vào các khu phức hợp, ép lừa đảo qua mạng và bị bán qua lại giữa các trại, kể cả sang Miến Điện.');
 M('WP_x_canhbao_02','trang','Dấu hiệu','Chiêu trò quen thuộc: hứa lương 25-30 triệu không cần bằng cấp, bao trọn gói giấy tờ, hối đi gấp trong tuần, dẫn đi đường tiểu ngạch.');
 M('WP_x_canhbao_03','trang','Khi nghi ngờ','Không chuyển tiền chuộc theo yêu cầu của người bên kia biên giới. Trình báo ngay cho công an nơi gần nhất hoặc gọi 113.');

/* mục tiêu */
const MUC2=[
 ['a1','Mở cái đt cũ dưới ngăn kéo tạp hóa đọc tin nhắn từ số lạ.','hoi<2 nhanh:A vai:ngan !co:x_a_tin1'],
 ['a1b','Qua phòng 3 nhà bà Sáu kiếm gặp Lâm.','hoi<2 nhanh:A vai:ngan co:x_a_tin1 !co:x_hop'],
 ['a2','Ngồi vẽ lại sơ đồ trại (trên bàn sau quầy tạp hóa).','hoi<2 nhanh:A co:x_hop !co:x_sodo vai:ngan'],
 ['a3','Ra đầu hẻm bắt xe qua quán Thảo Điên gặp Hương. Về mở laptop phòng 3 lần theo ví tiền của Anh Hai.','hoi<2 nhanh:A vai:lam !co:x_vu_ocl'],
 ['b1','Mở laptop phòng 3, gõ tìm "Ba Vẹt" coi khu trại cũ dời đi đâu.','hoi<2 nhanh:B !cc:x_siha'],
 ['b2','Qua quán Thảo Điên gặp Hương. Ra công an phường gặp đại úy Vinh.','hoi<2 nhanh:B cc:x_siha !co:x_vinh'],
 ['b3','Kiếm mối trà trộn lên chuyến xe đợt mới. Hỏi dò sơ đồ bên trong trại.','hoi<2 nhanh:B co:x_vinh !co:x_duong'],
 ['b4','Đi khám sức khỏe lấy giấy hẹn. Buổi tối ra trước tạp hóa tập gõ mật mã giấu chữ với Bin.','hoi<2 nhanh:B co:x_duong !co:x_tapma'],
 ['c1','Ra bến sông gặp Tài xế Thoại, đặt cọc tiền thuê ghe (1.500.000đ). Thiếu tiền thì đi gom trong hẻm.','hoi<2 co:x_vinh !co:x_ghe ngay>=4'],
 ['c2','Mở laptop phòng 3 lập bảng "Kế hoạch" gửi cho đại úy Vinh.','hoi<2 co:x_vinh cc:x_sodo !co:bao_xvinh'],
 ['c3','Lụm mảnh tờ rơi mới dán ở cột điện đầu hẻm, ghép lại coi con dấu của công ty nào.','hoi<2 ngay>=3 !cc:x_phatdat'],
 ['c4','Đêm cuối trước khi lên xe: chọn 1 món đồ giấu mang theo.','hoi<2 ngay>=7 !co:x_mon_xong'],
 ['t1','Dò kiếm những người trong tổ cũ. Tranh thủ giờ cơm trưa (12–13h) và giờ nghỉ tối (19–22h) để đi lại bắt chuyện.','hoi>=2 !co:x_to_biet !co:x_thuy_biet'],
 ['t2','Lén đi đêm mò kiếm cái đt giấu trong buồng tắm để có đồ liên lạc ra ngoài.','hoi>=2 !co:x_may co:x_to_biet|co:x_thuy_chi'],
 ['t3','Soạn tin rác giấu chữ đầu câu gửi ra ngoài: báo vị trí (SONG), rồi báo giờ G (BAG · ba giờ).','hoi>=2 co:x_may !co:x_tin_3g'],
 ['t4','Đi đêm canh giờ tuần tra của bảo vệ, đem nối với sơ đồ trại để tìm khe hở thoát thân.','hoi>=2 !co:x_gio'],
 ['t5','Chuẩn bị sẵn lối mở ra bờ sông: kiếm chìa khóa mở cửa hậu, hoặc lấy kìm cắt hàng rào kẽm gai sau bếp.','hoi>=2 !co:x_cua !co:x_rao'],
 ['t6','Lật mặt Ông Chủ Lò thực sự: gom đủ {ocl}/5 chứng cứ.','hoi>=2 !cc:suy_x_my']];
MUC2.forEach(([k,loi,hien])=>M('MUC_x'+k,'muc','',loi,{hien}));

/* câu nói vu vơ khi bấm người không có việc */
const RR={bay:['Lo ăn lẹ đi mấy đứa. Đúng 1 giờ chiều vô ca lại.','Bảng chỉ tiêu treo chình ình trên tường kìa. Tự nhìn vô mà liệu hồn.','Chị hổng ưa mấy đứa hỏi nhiều đâu nghen.'],
 seo:['Nhìn cái giống gì?','Biến ra chỗ khác.','Ngứa chân muốn chạy ra cổng hả? Thử bước ra coi.'],
 nhi:['Giờ này ở nhà chắc ngoại em vẫn tưởng em đang làm văn phòng lương cao thiệt á.','Trong phòng máy em gõ phím lẹ nhất luôn á. Mà gõ lẹ để lừa người ta, có gì vui đâu.'],
 toan:['Làm ơn để tui yên đi, tui hổng muốn dính dáng vô vụ gì hết.','Ở nhà nợ app có ba chục triệu, qua đây tụi nó vẽ ra cục nợ trăm triệu. Cày tới chết cũng hổng trả xong.'],
 hue:['Lấy phần cơm của chị ăn thêm đi cho có sức, chị nuốt hổng nổi.','Chân cẳng chị yếu đi chậm xíu thôi, chớ chị vẫn ráng theo tụi em được.'],
 ti:['Đêm nào nằm ngủ em cũng nghe rõ tiếng nước chảy ngoài kia.','Anh nhắm từ bức tường này phóng ra tới bờ sông xa hông anh?'],
 thuy:['Phòng số 3 nhà bà Sáu giờ ai thuê vậy anh?','Tản ra đi anh, đứng nói chuyện với em lâu là tụi nó nghi đó.'],
 ngan:['Cúi đầu xuống đừng ngó tui. Camera quay thẳng vô đây đó.','Lo ăn cơm đi. Đứng ngơ ngác đó tụi bảo vệ nó dòm kìa.'],
 khang:['Anh Khoa tui ở ngoài... giờ ổng ra sao rồi?','Đi chỗ khác lẹ đi. Đứng xớ rớ gần tui là bị ghi vô sổ đen đó.'],
 loc:['Trời đất ơi mò vô tận cái ổ này thiệt hả? Còn liều mạng hơn tui nữa.','Trong bếp hầm lắm, đừng có tự tiện đi vô.']};
for(const k in RR) RR[k].forEach((t,i)=>X('R_'+k+'_x'+i,'Câu vu vơ',[[{bay:'Chị Bảy',seo:'Sẹo',nhi:'Nhi',toan:'Toàn',hue:'Chị Huệ',ti:'Tí',thuy:'Thủy',ngan:'Ngân',khang:'Khang',loc:'Anh Lộc'}[k],t]]));
