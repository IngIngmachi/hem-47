/* Hẻm 47 · Phần 2 — các cảnh (lời thoại). Giọng miền Nam. Lâm gọi Ngân là "cổ", gọi anh Khoa là "ổng", anh Tú là "ổng". */
'use strict';
const SC={};
const L=lines;

/* =================== MỞ ĐẦU =================== */
SC.moA=async()=>{ cine(false); await bg('x2-taphoa-chieu'); await card('BA THÁNG SAU.\nHẺM 47 · FAN XÍCH VÔ.');
  await L([['','Ngân ngồi trên cái ghế nhựa trước tạp hóa của mẹ. Tóc cắt ngắn như con trai, chưa kịp dài ra.'],
   ['','Phường vẫn gọi lên làm việc mỗi tuần. Ngoài mạng, có người vẫn gọi cô là "con lừa đảo ôm 1 tỷ 2".'],
   ...(S.co.ngan_bv?[['','Hồ sơ ghi cô là nạn nhân bị ép buộc. Ít ra giấy tờ nói vậy.']]:[['','Hồ sơ của cô chưa đóng. Không ai chứng minh được cô bị ép.']]),
   ['','Hai giờ sáng. Điện thoại cũ của cô sáng lên. Một số lạ, đầu số bên kia.']]); };
SC.moB=async()=>{ cine(false); const k=S.ket1;
  if(k==='bocphot'){ await bg('x2-hien-basau-dem'); await card('HAI THÁNG SAU BÀI ĐĂNG LÚC 21:40.\nHẺM 47.');
    await L([['','Cái ghi âm cuộc gọi 21:15 năm ngoái đã nằm trên mọi trang mạng. Dưới mỗi bài là mấy ngàn bình luận.'],
     ['','Có người tìm ra phòng 3. Bà Sáu trả lại tiền cọc, nhét vô tay Lâm cái mền cũ.'],
     ['Bà Sáu','Bà hổng đuổi con. Bà chỉ hổng giữ được con ở trên đó nữa thôi. Ngủ tạm ngoài hiên đi, có cái mái che.'],
     ['~Lâm','Khu ở Bavet dời đi ngay đêm mình đăng bài. Không ai biết Ngân với Thủy giờ ở đâu.'],
     ['~Lâm','Lần thứ hai mình đẩy cổ đi. Lần này mình không được ngồi đây nữa.']]); }
  else if(k==='tien'){ await bg('x2-van-phong-lam'); await card('SÁU THÁNG SAU.\nMỘT VĂN PHÒNG CÓ MÁY LẠNH.');
    await L([['','Lâm có bàn gỗ, có máy lạnh, có tấm bảng đồng "Dịch vụ xác minh thông tin". Khách vô ra đều đặn.'],
     ['','Hai giờ sáng. Một tin nhắn từ tài khoản Ngân.'],['Thủy','a lam. e la thuy. chi ngan ko con o day nua'],
     ['','Rồi tài khoản biến mất hẳn.'],
     ['~Lâm','"Không còn ở đây" là sao. Bị bán đi chỗ khác. Hoặc là...'],
     ['~Lâm','Số tiền này là tiền người ta trả để mình im. Thì giờ lấy nó mua đường vô.']]); }
  else { await bg('x2-hem-mua'); await card('HAI THÁNG SAU NGÀY THỨ BA MƯƠI.\nHẺM 47.');
    await L([['','Phòng 3 đã có người khác thuê. Lâm ở một phòng trọ rẻ hơn, cách hẻm hai con đường.'],
     ['','Khu ở Bavet đã dời đi trong đêm. Hương gọi qua bên kia, không ai bắt máy.'],
     ['','Chiều nay, ở cột điện đầu hẻm 47, có tờ rơi mới. Giấy còn thơm mùi mực.'],
     ['','"Tuyển gấp nam nữ 18–35. Việc văn phòng nhẹ, lương 25–30 triệu. Bao ăn ở. Lo hết giấy tờ."'],
     ['~Lâm','Cùng một kiểu chữ. Cùng một câu "lo hết giấy tờ". Chỉ khác số điện thoại.']]); }
};

/* =================== NHÁNH A · HỒI 1 =================== */
SC.a_giaitin=async()=>{ await bg('x2-taphoa-chieu'); dark(true);
  await L([['','Tin nhắn dài, toàn chuyện vặt. Hỏi thăm sức khỏe, khoe mới mua dép, than trời mưa.'],['~Ngân','Mình dạy cả tổ cách này. Đọc chữ đầu từng câu.']]);
  const ok=await giaiMa('Sáng nay trời mưa quá chị ơi.\nÍt bữa nữa em mua dép mới.\nHôm qua tụi em được ăn thịt.\nAi cũng nhớ chị hết á.','SIHA','chữ đầu câu');
  dark(false); if(ok) flag('siha'); await L([['~Ngân','SIHA. Xi Ha Núc. Tụi nó dời tổ cũ của mình về đó.'],['~Ngân','Đứa nhắn là con Nhi. Nó gõ chữ "á" cuối câu y như hồi ở phòng máy.'],['','Ngân ngồi im tới sáng. Cái điện thoại trong tay nóng lên.']]); };
SC.a_sodo=async()=>{ await bg('trong-phong3-dem'); dark(true);
  await L([['','Ngân lấy cuốn tập học trò của Thủy, xé một trang, vẽ.'],['~Ngân','Phòng máy ở trệt. Bếp. Cửa sau ra sông. Lầu hai là chỗ ngủ, buồng tắm cuối hành lang.']]);
  if(S.co.phat_nhanchung){ await L([['','Sáng ra có một phong bì nhét dưới cửa tạp hóa. Nét chữ của Phát. Bản vẽ đủ ba tầng, có cả lầu ba.'],['~Ngân','Lầu ba mình chưa từng được lên. Thằng nhỏ này còn nhớ hơn mình.']]); flag('sodo3'); }
  else await L([['~Ngân','Lầu ba thì mình chưa từng được lên. Chỗ đó phải tự dò.']]);
  flag('sodo'); dark(false); };
SC.a_huong=async()=>{ await bg('x2-quan-thaodien');
  await L([['','Quán Thảo Điên. Hương ngồi bàn cũ, cái máy ghi âm úp trên mặt bàn như năm ngoái.'],
   ['Hương','Ông đọc tin Ngân gửi chưa? Tôi đọc rồi. Tôi cũng có tin của tôi.'],
   ['Hương','Khu Bavet hồi đó chỉ là một trong ba khu. Cùng một ông chủ. Hai khu kia đang dời sâu vô Xi Ha Núc.'],
   ['Hương','Người của tôi bên kia gọi ông chủ đó là "Ông Chủ Lò". Ai cũng chỉ nghe giọng, qua tin thoại.'],
   ['Lâm','Anh Hai là anh Tú. Vậy người trên ổng là ai?'],
   ['Hương','Đó là câu tôi muốn hỏi ông. Lần theo tiền đi. Tiền không biết nói dối.']]); flag('vu_ocl'); };
SC.a_vi=async()=>{ await bg('trong-phong3');
  if(S.co.phuong_dauthu){ await L([['','Phương gửi một tin, ngắn gọn, không chào.'],['Phương','Ví gốc của Anh Hai là cái này. Tiền của em hồi đó chạy về đây hết. Em làm nhân chứng rồi, em hổng giấu nữa.'],['~Lâm','Có ví gốc là bỏ được một bước.']]); }
  else { await L([['','Lâm ngồi trước laptop, lần ngược từng giao dịch trong nhóm "Hội nạn nhân Ngân Order" cũ.'],['~Lâm','Tiền cọc chạy qua bốn tài khoản rồi đổ vô hai ví điện tử.']]); }
  await L([['~Lâm','Tối Chủ nhật nào cũng có một lệnh chuyển lớn. Đều như đồng hồ.']]); flag('vi'); };
SC.a_thoa=async()=>{ await bg('trong-taphoa');
  if(S.co.noi_cuocgoi){ await L([['Cô Thoa','Con cầm cái máy cũ của con đi. Mẹ sạc nó mỗi ngày, quen tay rồi.'],['Cô Thoa','Thằng Lâm nó nói thật với mẹ hết rồi. Mẹ ghét nó. Mà mẹ tin nó.'],['~Ngân','Mẹ sạc cái máy này suốt mười chín tháng.']]); flag('maycu'); }
  else { await L([['Cô Thoa','Con đi đâu thì đi, đừng dắt thằng đó vô nhà mẹ.'],['~Ngân','Mẹ chưa tha cho Lâm. Mình cũng chưa.']]); }
  if(!S.co.ngan_bv){ await L([['','Ra đầu hẻm, Ngân kéo mũ xuống thấp. Bên phường vẫn đang giữ hồ sơ của cô.']]); lo(5); } };
SC.a_giong=async()=>{ await bg('trong-phong3-dem'); dark(true);
  await L([['','Nhi gửi kèm một tin thoại, chuyển tiếp từ máy quản lý. Giọng đàn ông, đều đều, như máy đọc.'],
   ['Ông Chủ Lò','Tổ con mèo tháng này thiếu. Tháng sau mà thiếu nữa thì bán hết qua bên kia. Tin để lâu là thiu.'],
   ['~Ngân','"Tin để lâu là thiu." Câu của Anh Hai. Mà giọng này không phải Anh Hai.'],
   ['','Nghe kỹ, dưới tiếng nói có tiếng nền: tiếng loa phường đọc bằng tiếng Việt, rất nhỏ.'],
   ['~Ngân','Người nói câu này đang ở Việt Nam.']]); cc('giong','tin thoại có tiếng loa phường'); dark(false); };
SC.a_vinh=async()=>{ await bg('x2-congan');
  await L([['Đại úy Vinh','Lại là cậu. Ngồi đi.'],['Đại úy Vinh','Lần này tôi nói trước: bên kia biên giới tôi không có quyền. Bên đó phối hợp được hay không là nhờ cái tin cậu đưa ra từ bên trong.'],
   ['Đại úy Vinh','Tôi cần ba thứ trước ngày 18: chỗ chính xác, số người, giờ. Thiếu một là thôi.']]);
  if(S.co.tu_lo){ await L([['Đại úy Vinh','Còn cái này. Lời khai của Đặng Minh Tú trong trại giam. Đọc đi.'],['','"Tôi không phải người cầm lò. Tôi chỉ là mặt tiền. Tiền thì má tôi giữ."'],['~Lâm','Má ổng. Bà Trần Thị Mỹ. Cái tên đứng chình ình trên hai công ty.']]); cc('tu','lời khai của Tú trong trại giam'); }
  flag('vinh'); };
SC.a_khoa=async()=>{ await bg('x2-trai-giam');
  await L([['','Phòng thăm gặp. Ông Khoa ốm đi, tóc cạo sát, vẫn cái tật chắp tay trước khi nói.'],
   ['Khoa','Thằng Khang còn ở bển. Tụi nó dời nó qua khu mới rồi.'],
   ['Khoa','Đợt xe tuần tới, tài xế còn là người quen của anh. Em muốn lên thì anh gài được. Đổi lại anh xin một chuyện.'],
   ['Lâm','Anh muốn đưa thằng Khang về.'],['Khoa','Anh muốn nó về. Còn anh ở đâu thì anh chịu.']]); flag('duong_khoa'); };
SC.a_thoai=async()=>{ await bg('x2-ben-ghe');
  await L([['','Bến ghe sát biên. Một người đàn ông ngồi vá lưới, điếu thuốc tắt ngấm trên môi.'],
   ['Tài xế Thoại','Qua sông thì có giá. Đưa người về cũng có giá. Đưa người đi thì giá khác.'],
   ['Tài xế Thoại','Tui chở ai trả tiền. Tui hổng hỏi.']]);
  if(S.co.loc_o) await L([['','Anh Lộc chở ra tới bến, không lấy tiền xe. Ổng đứng xa xa, hút thuốc, canh chừng.']]);
  const i=await choose([{t:'Trả trước 2.500.000đ cho đêm đó',sub:'giữ chỗ ghe, khỏi chờ',dis:S.tien<2500000},{t:'Hẹn sau, gom đủ tiền rồi quay lại'}],{q:'Tài xế Thoại'});
  if(i===0){ tien(-2500000); flag('ghe'); tin('thoai',1); await say('Tài xế Thoại','Tiền rồi. Đêm nào, mấy giờ, nhắn tui một chữ là được.'); }
  else await say('Tài xế Thoại','Nước lên thì ghe đi. Ghe hổng chờ ai.'); };
SC.a_tin2=async()=>{ dark(true); await L([['','Lại một tin của Nhi. Lần này có tên.']]);
  const ok=await giaiMa('Nhi còn đây.\nHuệ đau lưng.\nIt khi được ngủ.\nTí ốm.\nOanh đi rồi.\nAnh Toàn ổn.','NHITOA');
  await L([['~Ngân','Nhi, chị Huệ, Tí, Toàn. Oanh thì... "đi rồi".'],['','Ngân chép bốn cái tên vô điện thoại, mục mới: "Tổ".']]); dark(false); };
SC.a_gom=async()=>{ await bg('nha-taphoa'); let g=0;
  if(S.tin.basau>=3){ g+=1000000; await say('Bà Sáu','Bà góp chút đỉnh. Tiền của bà để dành mua cái quan tài, giờ mua ghe trước đi.'); }
  if(S.tin.bin>=2){ g+=300000; await say('Bin','Em chạy đơn được bấy nhiêu. Anh đừng nói cô Thoa.'); }
  if(S.co.noi_cuocgoi){ g+=2000000; await say('Cô Thoa','Mẹ đưa. Đây là tiền mẹ để chuộc con lần trước mà hổng kịp.'); }
  if(!g) await say('~Lâm','Không ai góp. Cũng phải. Mình chưa làm gì để người ta tin.');
  tien(g); };
SC.a_noi=async()=>{ await bg('trong-phong3');
  await L([['~Lâm','Lệnh chuyển tối Chủ nhật. Tin thoại có tiếng loa phường. Ví gốc mở ở một ngân hàng quận 7.'],['~Lâm','Ông Chủ Lò không ở bên kia. Ổng ở ngay Sài Gòn, cuối tuần ngồi đếm tiền.']]);
  if(has('vi')) cc('vi','dòng tiền tối Chủ nhật'); };
SC.a_caiNhau=async()=>{ await bg('trong-phong3-dem'); dark(true);
  await L([['','Phòng 3. Mười một giờ đêm. Ngân đứng, Lâm ngồi. Cái sơ đồ trải giữa hai người.'],
   ['Ngân','Tui vô. Tui thuộc từng cái hành lang. Tụi nhỏ tin tui.'],
   ['Lâm','Tụi nó biết mặt cô. Cô vô là cô thành cái gương cho cả trại coi.'],
   ['Ngân','Còn anh vô là anh thành con tin thứ mười ba. Anh có biết đổi ca lúc mấy giờ không?'],
   ...(S.co.noi_cuocgoi?[['Ngân','Anh nói thật với mẹ tui rồi. Tui cảm ơn anh chuyện đó. Mà chuyện này là chuyện của tui.']]:[['Ngân','Anh lo cho tui hả? Năm ngoái sao anh không lo.']]),
   ['','Hai người im. Ngoài cửa sổ, tạp hóa cô Thoa đã tắt đèn.']]);
  const i=await choose([{t:'Để Ngân vào',sub:'thuộc đường, tổ tin ngay, nhưng bị nhận mặt: quản lý nghi từ đầu'},{t:'Lâm vào, Ngân chỉ đường từ ngoài',sub:'mặt lạ, nhưng tổ chưa tin; Ngân nhắn bằng chữ đầu câu'}],{q:'Ai vào trại?'});
  S.ai_vao=i===0?'ngan':'lam';
  if(i===0) await L([['Lâm','...Vậy tui ở bờ bên này. Cô nhắn gì tui cũng đọc ra.'],['Ngân','Anh đọc sai một chữ là có người chết đó.']]);
  else await L([['Ngân','Vậy anh học thuộc cái này.'],['Ngân','Gặp đứa nào trong tổ, nói "con mèo mun còn sống". Tụi nó biết là tui gửi.'],['Ngân','Với lại: gõ sai một chữ "chuyển". Thành "chuyễn". Người tinh ý sẽ thấy.']]);
  if(i===1){ flag('meo_cailoi'); flag('ma_meo'); }
  dark(false); };

/* =================== NHÁNH B · HỒI 1 =================== */
SC.b_huong=async()=>{ await bg('x2-quan-thaodien');
  await L([['Hương','Ông còn dám hẹn tôi ra đây.'],['Lâm','Tôi cần biết khu Bavet dời đi đâu.']]);
  if(S.tin.huong>=2||S.ket1!=='bocphot'){ await L([['Hương','Xi Ha Núc. Một khu cũ của casino, sát sông. Danh sách người còn kẹt đây.'],['','Trên danh sách: Nguyễn Thị Kim Ngân. Lê Thị Thủy. Và mười mấy cái tên Lâm chưa từng nghe.']]); flag('ds_du'); }
  else await L([['Hương','Tôi đưa ông nửa danh sách. Nửa kia đợi ông chứng minh lần này ông không bấm đăng.'],['','Trên nửa tờ giấy có tên Ngân. Không có tên Thủy.']]);
  if(S.tin.huong>=3||S.co.phuong_dauthu){ await L([['Hương','Còn cái này: tiền của khu đó chạy về hai cái ví. Tối Chủ nhật nào cũng có lệnh lớn.']]); flag('vi'); cc('vi','dòng tiền tối Chủ nhật'); }
  await L([['Hương','Người của tôi gọi ông chủ khu đó là "Ông Chủ Lò". Chỉ nghe giọng, chưa ai thấy mặt.']]); flag('vu_ocl'); };
SC.b_vinh=async()=>{ await bg('x2-congan');
  await L([['Đại úy Vinh','Cậu tính tự vô đó?'],['Lâm','Không ai vô được thì không ai biết chỗ.'],
   ['Đại úy Vinh','Tôi nói một lần: cậu vô đó là thành con tin thứ mười ba. Giải cứu là việc của tụi tôi.'],
   ['Lâm','Vậy anh cho tôi một cách để báo tin ra.'],
   ['Đại úy Vinh','...Tin rác. Kiểu tin quảng cáo ai cũng nhận. Cậu đọc chữ đầu câu. Bên này tôi gửi vô cũng vậy.'],
   ['Đại úy Vinh','Tôi cần chỗ chính xác, số người, và giờ. Thiếu một thứ là tôi không ký.']]);
  if(S.co.tu_lo){ await L([['Đại úy Vinh','Còn cái này. Đặng Minh Tú khai trong trại giam: "Tiền thì má tôi giữ."'],['~Lâm','Bà Trần Thị Mỹ. Má ổng.']]); cc('tu','lời khai của Tú trong trại giam'); }
  flag('vinh'); };
SC.b_sodo=async()=>{ await bg('trong-phong3');
  if(S.co.phat_nhanchung){ await L([['','Phát hẹn ở bến lúc năm giờ sáng. Nó vẽ lên mặt sau tờ lịch: ba tầng, cầu thang ở giữa, cửa sau ra sông.'],['Phát','Lầu ba là văn phòng. Sổ chỉ tiêu để trong đó. Chìa thì quản lý giữ.'],['Phát','Anh vô rồi đừng có ráng làm anh hùng nha anh.']]); flag('sodo3'); }
  else { await L([['','Lâm lục nhóm Za Lô "Hội người về từ Cam". Một người trả lời, chịu gọi thoại, không bật hình.'],['','"Trệt là phòng máy. Lầu hai ngủ. Lầu ba tui chưa lên bao giờ."'],['~Lâm','Lầu ba để trống. Phải tự dò.']]); }
  flag('sodo'); };
SC.b_duong=async()=>{
  if(S.co.khoa_lat){ await bg('x2-trai-giam'); await L([['Khoa','Em muốn lên xe đợt tới? Anh còn người quen.'],['Khoa','Thằng Khang ở khu đó. Em gặp nó thì nói anh xin lỗi.'],['Khoa','Đây, cái tên em sẽ xài. Học thuộc.']]); flag('duong_khoa'); return; }
  await bg('x2-vp-quan-khac'); await L([['','Một văn phòng tuyển dụng ở quận khác. Cũng cái bảng xanh, cũng cái tờ rơi, cũng ly trà đá mời khách.'],['','Người tiếp Lâm cười rất tươi. Phí hồ sơ 1.000.000đ, "hoàn lại khi có lương tháng đầu".']]);
  tien(-1000000);
  /* lời khai ngược: Lâm là người nói dối, chọn câu để không bị lật */
  const q=[['Trước giờ em làm gì?',[['Em chạy xe ôm, nợ app hơn ba chục triệu.',1],['Em làm nhà báo.',0],['Em làm admin page.',0]]],
   ['Biết chữ, biết xài máy tính hông?',[['Dạ biết sơ sơ, gõ được.',1],['Dạ em gõ nhanh lắm, làm content mấy năm.',0]]],
   ['Nhà có ai ngăn hông?',[['Dạ hổng ai. Mẹ em mất rồi.',1],['Dạ có, em phải hỏi lại chị em.',0]]]];
  let ok=0; for(const [cau,ops] of q){ await say('Người tuyển',cau); const i=await choose(ops.map(o=>o[0]),{timer:10,mac:1}); if(i>=0&&ops[i][1]) ok++; else nghi(8); }
  await say('Người tuyển',ok===3?'Được. Mai khám sức khỏe, tuần sau có xe.':'Ừa... thôi được. Mai khám sức khỏe.'); flag('duong_tu'); };
SC.kham=async()=>{ await bg('x2-kham-suckhoe');
  await L([['','Phòng khám nhỏ, quạt trần quay chậm. Lâm cầm tờ giấy hẹn khám, đóng mộc tròn.'],
   ['~Lâm','Y chang tờ giấy trong vali màu hồng trên tầng trên nhà bà Sáu. Ngày 2/4/2025.'],
   ['','Trên băng ghế chờ có hai người cùng đợt: một cô gái ôm cái balo hồng, một ông chú tay còn dính xi măng.'],
   ['Nhi','Anh cũng đi đợt này hả? Em đi để trả tiền thuốc cho bà ngoại.'],['Toàn','Tui nợ app. Đi một năm là trả xong.'],
   ['~Lâm','Hai người này sẽ ngồi chung xe với mình. Mình biết đầu kia là gì. Họ thì không.']]);
  const i=await choose(['Nói nhỏ với họ: đừng đi','Im lặng. Nói ra là lộ, cả ba cùng mất đường'],{q:'Nhi với Toàn'});
  if(i===0){ await L([['Nhi','Anh nói gì kỳ vậy? Anh cũng đi mà.'],['','Người tuyển dụng từ trong phòng nhìn ra.']]); lo(10); tin('nhi',1); }
  else await say('~Lâm','Mình sẽ đưa họ về. Chỉ là không phải bằng một câu nói ở đây.');
  flag('kham'); };
SC.tapma=async()=>{ await bg('trong-taphoa');
  await L([['Bin','Anh muốn tập nhắn kiểu chị Ngân hả? Em đóng vai quản lý cho. Em đọc lướt nha.'],['Bin','Gửi chữ SONG coi.']]);
  const r=await giauChu('SONG','Bin đóng vai quản lý');
  if(r.dung&&!r.vung) await L([['Bin','Em đọc hổng thấy gì lạ hết. Mà đọc chữ đầu thì ra SONG. Ghê.']]);
  else if(r.dung) await L([['Bin','Ra chữ SONG đó. Mà câu cụt quá, em mà là quản lý là em nghi liền.']]);
  else await L([['Bin','Em ghép hổng ra chữ gì hết anh ơi.'],['Bin','Mỗi câu một chữ đầu nha. S, rồi O, rồi N, rồi G.']]);
  flag('tapma'); flag('meo_hieu'); };
SC.b_thoai=SC.a_thoai;
SC.b_gom=SC.a_gom;
SC.monGiau=async()=>{ await bg('trong-phong3-dem');
  await L([['~Lâm','Người về từ Cam nói: tới nơi là bị khám người, lột hết. Giấu được một món là may.']]);
  const ops=[{t:'Cái SIM nhỏ, may vô lai quần',sub:'có máy là gửi được tin ra'},{t:'Con mèo vải đen của Ngân',sub:S.co.noi_cuocgoi?'cô Thoa gửi':'bà Sáu giữ giùm từ hồi đó'},{t:'Tờ giấy ghi số của Hương',sub:'nhớ số rồi thì giấy chỉ để chắc'}];
  if(S.nhanh==='A'&&S.ai_vao==='ngan') ops[1]={t:'Con mèo vải đen',sub:'tổ biết con mèo này là của ai'};
  const i=await choose(ops,{q:'Chỉ một món. Món gì?'}); S.mon=['sim','meo','giay'][i]; };
SC.demCuoi=async()=>{ dark(true);
  if(S.nhanh==='A'&&S.ai_vao==='ngan'){ await bg('trong-taphoa'); await L([['','Tạp hóa đóng nửa cửa. Cô Thoa ngồi gói xôi, gói hoài một gói.'],['Cô Thoa','Lần trước mẹ hổng biết con đi. Lần này mẹ biết.'],['Cô Thoa','Mẹ hổng cản. Mẹ chỉ ngồi đây sạc cái máy, như lần trước.'],['Ngân','Lần này con có nhắn về mà mẹ.']]); dark(false); return; }
  if(S.co.noi_cuocgoi){ await bg('trong-taphoa'); await L([['','Tạp hóa đóng nửa cửa. Cô Thoa ngồi đếm tiền lẻ, không ngẩng lên.'],['Cô Thoa','Mai đi hả.'],['Lâm','Dạ.'],['Cô Thoa','Đem nó về cho cô. Còn con, con cũng phải về. Nghe chưa.']]); }
  else { await bg('x2-hien-basau-dem'); await L([['Bà Sáu','Bà hổng hỏi con đi đâu. Bà chỉ dặn: ở đâu cũng phải ăn cơm.'],['','Bà Sáu dúi vô tay Lâm một gói xôi, gói kỹ trong lá chuối.']]); }
  if(S.co.loc_o) await L([['','Ba giờ sáng, anh Lộc đậu xe đầu hẻm, không nói gì, chỉ đưa cái nón bảo hiểm.']]);
  dark(false); };

/* =================== VÀO TRẠI · CẢNH LỚN =================== */
SC.canh1=async()=>{ cine(true); trai(true); dark(true); await bg('x2-xe-dem');
  await card('NGÀY 8 · 3:58 SÁNG\nĐƯỜNG MÒN SÁT BIÊN GIỚI');
  await L([['','Xe 16 chỗ chạy không đèn. Tới bãi mía thì đổi sang xe tải bít bùng. Rồi xuống đi bộ, một hàng dọc, không ai được nói.'],
   ['','Ở đầu kia con đường mòn có hai người đàn ông cầm đèn pin. Một người có vết sẹo chạy dài từ thái dương xuống cằm.'],
   ['Sẹo','Điện thoại, căn cước, tiền. Bỏ hết vô thùng.']]);
  const m=S.mon, ten={sim:'cái SIM trong lai quần',meo:'con mèo vải',giay:'tờ giấy ghi số'}[m]||'món đồ';
  const i=await choose([{t:'Đứng yên, nhìn xuống đất'},{t:'Lén chuyển '+ten+' sang chỗ khác'},{t:'Hỏi "anh ơi khi nào được trả lại"'}],{q:'Sẹo bắt đầu khám từng người. Tới lượt '+who()+'.',timer:8,mac:0});
  if(i===0){ await say('','Bàn tay khám qua người, dừng ở túi quần một giây, rồi đi tiếp.'); flag('giu_'+m); }
  else if(i===1){ await say('','Sẹo chụp lấy cổ tay. Lôi '+ten+' ra, ném xuống bùn.'); nghi(10); }
  else { await L([['Sẹo','Trả? Mày làm đủ thì tự mua cái mới.'],['','Cả hàng cười. Cái cười của người đã ở đây lâu.']]); flag('giu_'+m); }
  dark(false); };
SC.canh2=async()=>{ await bg('x2-cong-sat');
  await card('CỔNG SẮT');
  await L([['','Cổng sắt đóng lại sau lưng. Tường cao, trên đầu tường là kẽm gai. Bên kia tường nghe tiếng nước chảy.'],
   ['','Một phòng nhỏ. Bàn nhựa. Một tờ giấy in sẵn: "Giấy nhận nợ: tiền vé xe, tiền ăn ở, tiền đào tạo. Tổng: 3.200 USD."'],
   ['Chị Bảy','Ký đi em. Ai cũng ký. Làm đủ là trừ dần, sáu tháng là hết.'],
   ['~@','Chị Bảy. Người Việt. Tay áo dài che kín cổ tay, dù trời nóng.']]);
  const i=await choose([{t:'Ký',sub:'qua được hôm nay'},{t:'Không ký',sub:'đêm đầu ở phòng tối'}],{q:'Tờ giấy nợ'});
  if(i===0){ noTrai(3200*25500); await say('Chị Bảy','Ngoan. Lên lầu hai, phòng ngủ tổ 3.'); }
  else { await L([['Chị Bảy','...Em muốn vậy thì vậy.'],['','Đêm đầu tiên ở phòng tối. Không đèn, không cửa sổ, một chai nước.'],['','Sáng ra, lúc được thả về phòng, có hai người trong tổ nhìn '+who()+' lâu hơn những người khác.']]); noTrai(3200*25500); nghi(15); tin('nhi',1); tin(S.nhanh==='B'?'ngan':'toan',1); tin('thuy',1); }
  if(S.nhanh==='A'&&S.ai_vao==='ngan'){ await L([['Chị Bảy','Khoan. Em... ngẩng mặt lên chị coi.'],['','Chị Bảy nhìn Ngân rất lâu. Rồi quay đi, không nói gì.'],['~Ngân','Chị nhận ra mình. Chị chưa nói. Chưa.']]); nghi(25); }
  buildDs(); };
SC.canh3=async()=>{ await bg('x2-phong-may');
  await card('NGÀY 9 · 7:00\nPHÒNG MÁY');
  await L([['','Ba dãy bàn, mỗi dãy mười máy. Dây điện bò dưới chân như rễ cây. Trên tường, một cái chuông đồng và một tấm bảng trắng ghi chỉ tiêu.'],
   ['Chị Bảy','Mỗi người ba khách một ngày. Kịch bản trong máy. Đứa nào chốt được thì chị rung chuông.'],
   ['','Mười giờ. Chuông reo. Chị Bảy vỗ tay. Rồi cả phòng vỗ tay theo.']]);
  const i=await choose([{t:'Vỗ tay theo'},{t:'Ngồi im, nhìn màn hình'}],{q:'Cả phòng đang vỗ tay.',timer:6,mac:1});
  if(i===1){ await L([['','Chị Bảy nhìn qua. Lâu.'],['','Ở bàn cuối dãy, có một người cũng không vỗ tay.']]); nghi(10); tin('ngan',1); flag('ngoi_im'); }
  else await say('','Tiếng vỗ tay nghe như mưa trên mái tôn.'); };
SC.thuyNhan=async()=>{ await bg('x2-nha-an');
  await L([['','Giờ cơm trưa. Nhà ăn dài, bàn inox. Một cô gái bưng khay ngang qua, không nhìn Lâm.'],['','Cô đặt khay xuống bàn bên cạnh. Lấy đũa vẽ lên mặt bàn ướt một hình gì đó, rồi xóa liền.']]);
  const i=await choose(['Hình chữ "3"','Hình con mèo','Không thấy gì, chắc vô tình'],{q:'Cô gái vẽ gì?',timer:7,mac:2});
  if(i===0){ await L([['~Lâm','Số 3. Phòng 3.'],['~Lâm','Thủy. Con nhỏ từng ở phòng 3 nhà bà Sáu.'],['','Thủy đứng dậy, đi ngang, nói nhỏ không quay đầu: "Mai, buồng tắm, giờ tắm."']]); flag('thuy_biet'); tin('thuy',1); }
  else if(i===1){ await say('~Lâm','Con mèo? Không phải. Mình nhìn lộn rồi.'); }
  else await say('~Lâm','Chắc mình nhìn lộn.'); };
SC.thuyGap=async()=>{ await bg('x2-buong-tam'); dark(true);
  await L([['','Buồng tắm cuối hành lang. Nước lạnh. Thủy đứng sát vách, nói rất nhỏ.'],
   ['Thủy','Anh điên rồi. Anh vô đây làm gì.'],['Lâm','Đưa mọi người về.'],
   ['Thủy','Chị Ngân ở phòng máy 2, bàn cuối. Chị làm tổ trưởng. Mà anh đừng tới gần chỉ.'],
   ['Thủy','Chỉ hổng tin anh. Chỉ nói người viết bài đó thì tới đây cũng để viết bài tiếp.'],
   ['Thủy','Mẹo nè: gặp chữ "chuyển" trong kịch bản thì gõ sai dấu. Chị Ngân dạy. Người tinh ý sẽ thấy.']]);
  flag('thuy_chi_ngan'); flag('meo_cailoi'); dark(false); };
SC.nganB1=async()=>{ await bg('x2-nha-an');
  await L([['','Ngân ngồi một mình cuối bàn. Tóc dài, cột thấp. Ốm hơn trong ảnh đại diện năm ngoái rất nhiều.'],['~Lâm','Mình là người cắt tấm ảnh đại diện đó ra để bêu cổ.']]);
  if(has('giu_meo')){ await L([['','Lâm đặt con mèo vải đen lên mặt bàn, sát khay cơm của Ngân.'],['Ngân','...'],['Ngân','Ai đưa anh cái này.'],['Lâm',S.co.noi_cuocgoi?'Mẹ cô.':'Bà Sáu giữ. Từ cái vali màu hồng.'],['','Ngân cầm con mèo, nắm chặt tới trắng đốt tay. Rồi bỏ vô túi áo.'],['Ngân','Đêm mai. Buồng tắm.']]); tin('ngan',1); flag('ngan_nghe'); return; }
  const i=await choose(['"Tiệm tạp hóa đầu hẻm 47, cô Thoa vẫn sạc cái máy cũ của cô mỗi ngày."','"Tôi là Lâm. Tôi tới để đưa cô về."','Ngồi xuống, không nói gì'],{q:'Nói gì với Ngân?'});
  if(i===0){ await L([['Ngân','...'],['Ngân','Mẹ tui còn bán hả.'],['Ngân','Đêm mai. Buồng tắm. Anh mà nói dối một chữ là tui la lên.']]); tin('ngan',1); flag('ngan_nghe'); }
  else if(i===1){ await L([['Ngân','Anh đưa tui đi một lần rồi.'],['','Ngân bưng khay đứng dậy.']]); }
  else await say('','Ngân ăn hết chén cơm, không nhìn qua một lần.'); };
SC.nganB3=async()=>{ await bg('x2-buong-tam'); dark(true);
  await L([['Ngân','Đêm 30 tháng 3. Anh gọi cho tui lúc chín giờ mười lăm. Tui nói tiền nằm ở tài khoản con Phương. Tui xin anh một ngày.'],
   ['Ngân','Anh nhớ không.']]);
  if(S.co.noi_cuocgoi||S.co.lam_nho){ await L([['Lâm','Nhớ. Ba phút mười hai giây. Rồi tôi gọi anh Tú, rồi tôi đăng. Cô gọi lại năm lần, tôi úp máy.'],['Lâm','Tôi đã nói chuyện này với mẹ cô rồi. Giờ tôi nói với cô.'],['','Ngân im rất lâu. Nước nhỏ giọt từ vòi.'],['Ngân','Vậy anh ở lại tới cuối. Đừng có đi trước.']]); tin('ngan',1); }
  else { const i=await choose([{t:'"Nhớ. Tôi nghe hết. Rồi tôi vẫn đăng."',sub:'nói thật'},{t:'"Tôi không nhớ rõ. Hồi đó gấp quá."',sub:'né'}],{q:'Ngân hỏi về đêm 30/3'});
    if(i===0){ await L([['Lâm','Tôi nghe cô khóc. Tôi gọi anh Tú, ổng nói con nhỏ khóc thì kệ nó. Tôi đăng. Cô gọi lại năm lần. Tôi úp máy.'],['','Ngân đấm vô vách tường, một cái. Rồi đứng thở.'],['Ngân','Lần đầu tiên có người nói câu đó với tui. Được. Anh ở lại tới cuối.']]); tin('ngan',1); }
    else { await L([['Ngân','Anh vẫn vậy.'],['','Ngân đi ra. Cửa buồng tắm đóng lại rất nhẹ.']]); tin('ngan',-1); } }
  dark(false); };
SC.nguoiBan=async()=>{ const ai=S.co.bao_tam?'Tâm':S.co.bao_phat?'Phát':null; if(!ai) return; await bg('x2-nha-an');
  await L([['','Một người đàn ông bưng khay đi ngang, khựng lại. Nhìn Lâm như nhìn ma.'],
   [ai,ai==='Tâm'?'Anh... anh là thằng dò địa chỉ tui rồi đưa cho ông Khoa.':'Anh Lâm. Anh gửi chỗ em ở cho ông Khoa. Tụi nó tới rước em hai ngày sau.'],
   ['','Cả bàn quay lại. Chị Bảy từ đầu phòng bước tới.'],['Chị Bảy','Chuyện gì đó.']]);
  const i=await choose([{t:'"Đúng. Tôi làm vậy. Tôi tới đây để trả món đó."',sub:'nói thật trước mặt Chị Bảy'},{t:'"Anh nhận lộn người rồi."',sub:'chối'}],{q:ai+' đang tố Lâm',timer:8,mac:1});
  if(i===0){ await L([['Chị Bảy','Trả? Ở đây ai trả được cái gì.'],['','Chị Bảy bỏ đi. '+ai+' ngồi xuống, nhìn Lâm rất lâu.'],[ai,'...Anh trả bằng gì.'],['Lâm','Bằng một đêm. Chưa phải bây giờ.']]); nghi(10); tin(ai==='Tâm'?'tam':'phat',2); flag('ban_nhan'); }
  else { await L([['Chị Bảy','Ăn đi. Chuyện bên ngoài để bên ngoài.'],['','Hôm nay qua được. '+ai+' không nói thêm câu nào.']]); flag('ban_choi'); } };

/* ---------- nhánh A, người trong là Lâm: gặp tổ cũ ---------- */
SC.toCuLam=async()=>{ await bg('x2-nha-an');
  await L([['','Giờ cơm. Một cô gái ôm cái balo hồng đi ngang, gõ nhẹ ngón tay lên khay như đang gõ phím. Nhi, trong tên Ngân chép ra.']]);
  await say('Lâm','Con mèo mun còn sống.');
  await L([['Nhi','...'],['Nhi','Chị Ngân gửi anh hả? Trời ơi.'],['Nhi','Tối nay em nói anh Toàn với chị Huệ. Tí thì để em.']]); tin('nhi',2); tin('toan',1); tin('hue',1); tin('ti',1); flag('to_biet'); };
SC.toCuNgan=async()=>{ await bg('x2-nha-an');
  await L([['','Giờ cơm. Nhi làm rơi muỗng khi thấy Ngân. Chị Huệ nắm tay Nhi dưới gầm bàn, bóp mạnh.'],
   ['Chị Huệ','Con về rồi mà. Con quay lại chi.'],['Ngân','Con về rước mấy cô.'],['Tí','Chị Ngân... em tưởng chị chết rồi.']]); tin('nhi',2); tin('hue',2); tin('ti',2); tin('toan',1); flag('to_biet'); };

/* ---------- trò chuyện trong khe hở ---------- */
SC.noi=async(k)=>{ const T={
  nhi:[['Nhi','Bà ngoại em chắc tưởng em đi làm có lương rồi.'],['Nhi','Em gõ "á" cuối câu để chị Ngân biết là em. Chị có nhận được hông?']],
  toan:[['Toàn','Tui nợ app có ba chục, giờ nợ trại một trăm. Cộng kiểu gì cũng hổng hết.'],['Toàn','Tui hổng muốn làm gì để bị đánh nữa đâu. Đừng rủ tui.']],
  hue:[['Chị Huệ','Con trai chị vay app, tụi nó gọi tới cơ quan nó. Chị đi để nó khỏi mất việc.'],['Chị Huệ','Chị lớn rồi, chạy hổng nổi. Nhưng chị đi chậm được.']],
  ti:[['Tí','Anh có biết ở đây cách bờ sông bao xa hông? Đêm em nghe tiếng nước.'],['Tí','Em tính rồi. Nếu leo cái ống nước sau bếp…'],['~@','Thằng nhỏ đang tính trốn một mình.']],
  thuy:[['Thủy','Phòng 3 giờ ai ở vậy anh? Em hay mơ thấy cái cửa sổ nhìn xuống tạp hóa.']],
  khang:[['Khang','Anh tui... ổng sao rồi?'],['Khang','Tui hổng giận ổng. Tui chỉ hổng biết nói gì với ổng.']],
  loc:[['Anh Lộc','Cậu tới đây thiệt hả. Cậu điên còn hơn tui.'],['Anh Lộc','Tui làm bếp. Bếp có cây kìm cắt kẽm, tụi nó để trên nóc tủ. Cần thì nói.']],
  tam:[['Tâm','Đêm nào tui cũng nghĩ tới cái địa chỉ anh gửi.'],['Tâm','Mà thôi. Người ở đây ai cũng từng bị ai đó bán.']],
  phat:[['Phát','Em trốn được một lần rồi. Lần này tụi nó nhốt em ở dãy trong.']],
  ngan:[['Ngân','Nhi gõ tin hay nhất tổ. Tí chạy nhanh nhất. Chị Huệ đi chậm, phải có người dìu.'],['Ngân','Anh Toàn... ổng sợ. Người sợ thì dễ nói.']]}[k]||[];
  await L(T); tin(k,1); if(k==='loc') flag('loc_kim');
  if(k==='hue'&&S.f.vu3) flag('vu3_hue'); if(k==='nhi'&&S.f.vu3) flag('vu3_nhi'); };

/* ---------- Chị Bảy: lời khai ---------- */
SC.bay=async()=>{ await bg('x2-tang3'); cine(true);
  await L([['','Chị Bảy gọi '+who()+' lên lầu ba. Văn phòng có máy lạnh, có tủ sắt, có một cái màn hình chia bốn ô camera.'],
   ['Chị Bảy','Ngồi. Chị hỏi, em trả lời. Chị không thích nghe nói dối.'],
   ['Chị Bảy','Chị cũng chỉ làm công thôi em. Trên giao sao làm vậy.']]);
  const ev=[]; if(has('so_chup')) ev.push({t:'Đưa ra: sổ chỉ tiêu, cột "nộp lên" có chữ ký chị',ok:1}); if(has('nghe_len')) ev.push({t:'Đưa ra: tin thoại "tin để lâu là thiu" của Ông Chủ Lò',ok:2});
  ev.push({t:'"Chị cũng từng ngồi phòng máy, đúng không chị."',ok:3}); ev.push({t:'Im lặng'});
  const i=await choose(ev,{q:'Chị Bảy: "Chị chỉ làm công."'}); const p=ev[i];
  if(p.ok===1||p.ok===2){ await L([['Chị Bảy','...Em lấy cái này ở đâu.'],['Chị Bảy','Chị ký vì chị phải ký. Ba năm trước chị cũng ngồi phòng máy. Giỏi thì được lên. Lên rồi thì hết đường xuống.'],['Chị Bảy','Bà đó gọi chị là "con Bảy". Bà hổng bao giờ bật hình.'],['~@','Bà. Không phải ông.']]); tin('bay',3); cc('bay','lời khai Chị Bảy'); flag('bay_lat'); }
  else if(p.ok===3){ await L([['','Chị Bảy kéo tay áo lên một chút. Rồi kéo xuống.'],['Chị Bảy','Đi xuống đi. Chị chưa nghe gì hết.']]); tin('bay',2); }
  else { await say('Chị Bảy','Ừ. Im vậy là khôn.'); tin('bay',1); }
  cine(true); };

/* ---------- Khang ---------- */
SC.khang=async()=>{ await bg('x2-phong-ngu');
  if(S.co.khoa_lat){ await L([['','Một cậu trai gầy nhom ngồi ở mép giường tầng. Trên áo còn dấu bảng tên đã gỡ.'],['Khang','Anh Khoa nhắn vô cho tui rồi. Tui làm bảo vệ lầu ba được hai tháng, tụi nó tin tui.'],['Khang','Chìa cửa sau với chìa văn phòng, tui đánh thêm một bộ. Anh cầm đi.']]); flag('chia'); tin('khang',2); toast('Có chìa lầu ba và cửa sau'); }
  else { await L([['','Khu phạt ở dãy trong. Qua khe cửa, Lâm thấy một cậu trai ngồi bó gối.'],['Khang','Anh là ai.'],['Lâm','Người anh Khoa nhờ.'],['Khang','...Ổng còn nhớ tui hả.'],['Lâm','Đêm đó tôi quay lại rước cậu.']]); tin('khang',2); } };

/* ---------- vụ 3: ai bán tin ---------- */
SC.vu3Mo=async()=>{ await L([['','Đêm qua, lính gác lầu hai đi tuần sớm hơn mọi khi đúng hai mươi phút. Đúng lúc '+who()+' tính ra khỏi phòng.'],['~@','Có người báo. Ai đó trong tổ.']]); flag('vu3'); };
SC.vu3=async()=>{ await L([['~@','Ai được ra khỏi phòng lúc khuya? Ai được thêm khẩu phần?']]);
  const hints=[]; if(has('vu3_hue')) hints.push('Chị Huệ: "Thằng Toàn mấy bữa nay có thêm trứng."'); if(has('vu3_nhi')) hints.push('Nhi: "Anh Toàn hay bị gọi lên lầu ba lúc khuya."');
  if(hints.length) await L(hints.map(h=>['',h]));
  const ops=[{t:'Toàn'},{t:'Chị Bảy'},...(!S.co.phuong_dauthu?[{t:'Phương (qua tin nhắn ra ngoài)'}]:[]),{t:'Chưa đủ, để sau'}];
  const i=await choose(ops,{q:'Ai báo cho quản lý?'}); const pick=ops[i].t;
  if(pick==='Toàn'){ await L([['Toàn','Tui... tụi nó nói báo một lần là trừ nợ một tháng.'],['Toàn','Tui xin lỗi. Tui sợ.'],['~@','Ai ở đây cũng từng bị bán. Có người bán lại người khác để thở.']]); lo(-25); nghi(-10); tin('toan',2); flag('vu3_xong'); }
  else if(pick==='Chưa đủ, để sau'){ return; }
  else { await say('~@','Không phải. Nhìn mặt là biết mình đoán sai.'); if(pick==='Chị Bảy') tin('bay',-2); flag('vu3_sai'); flag('vu3_xong'); } };

/* ---------- cảnh 4: bảng tên đỏ ---------- */
SC.canh4=async()=>{ cine(true); await bg('x2-san-diemdanh'); dark(true);
  await card('NGÀY 13 · 21:00\nSÂN ĐIỂM DANH');
  await L([['','Loa trên cột điện rè rè. Một giọng đọc tên những người thiếu chỉ tiêu tuần.'],['','"…Phòng 3. Tí."'],['','Sẹo bước ra từ bóng tối, đi thẳng tới chỗ Tí đứng.']]);
  const i=await choose([{t:'Bước ra: "Phần thiếu của nó là của tôi"',sub:'nhận phạt thay, mất một ngày'},{t:'Đứng yên'}],{q:'Sẹo đang tới.',timer:7,mac:1});
  if(i===0){ await L([['','Sẹo dừng lại. Nhìn '+who()+'. Rồi cười.'],['Sẹo','Được. Đi.'],['','Màn đen. Tiếng cửa sắt.'],['','Sáng hôm sau, '+who()+' về phòng, bước đi cà nhắc. Không ai hỏi. Nhưng cả tổ dời chỗ ngủ, nằm sát lại.']]);
    ['nhi','toan','hue','ti','thuy','ngan'].forEach(k=>{ S.tin[k]=Math.min(5,(S.tin[k]||0)+1); }); toast('Cả tổ tin hơn'); S.f.phat_thay=S.ngay+1; nghi(5); }
  else { await L([['','Tí bị dẫn đi. Màn đen. Tiếng cửa sắt.'],['','Sáng hôm sau, cái ghế của Tí ở phòng máy trống. Tới trưa Tí mới về, tay quấn băng, đi chậm.']]); flag('ti_yeu'); }
  dark(false); };
/* ---------- cảnh 5: cuộc gọi về nhà ---------- */
SC.canh5=async()=>{ cine(true); await bg('x2-tang3');
  await card('NGÀY 14 · 12:30\nCUỘC GỌI VỀ NHÀ');
  const nguoi=S.nhanh==='A'?(S.ai_vao==='ngan'?'cô Thoa':'bà Sáu'):'bà Sáu';
  await L([['Chị Bảy','Mỗi tuần được gọi về nhà một cuộc. Có chị đứng đây. Nói "con khỏe", rồi xin nhà chuyển tiền đóng nợ.'],['','Màn hình bật lên. Gương mặt '+nguoi+' hiện ra, sát quá, lấp kín khung hình.'],['~@','Mỗi câu nói ra, chữ đầu là một chữ. Bên kia có nghe ra không thì tùy trời.']]);
  const tu=S.nhanh==='B'?'SONG':'CUA';
  const sets=tu==='SONG'?[
    [['Sáng nay ở đây mưa quá '+(nguoi==='bà Sáu'?'bà':'mẹ')+' ơi.',1],['Con khỏe, '+(nguoi==='bà Sáu'?'bà':'mẹ')+' đừng lo.',0],['Mấy bữa nay con ăn được lắm.',0]],
    [['Ở đây ai cũng tốt hết.',1],['Tụi con được nghỉ trưa.',0],['Ở trển có cái chùa hay lắm.',0,1]],
    [['Nghe nói tháng sau con được lên lương.',1],['Còn lâu con mới về.',0],['Ngày nào con cũng ra bờ sông ngồi.',0,1]],
    [['Gửi giùm con năm triệu nha, đóng tiền nợ.',1],['Bà giữ sức khỏe nha.',0],['Gần bờ sông ở đây gió lắm.',0,1]]]:[
    [['Cơm ở đây cũng được mẹ.',1],['Mẹ có khỏe hông.',0],['Có cái cửa sau ra sông, con hay ra ngồi.',0,1]],
    [['Út nhà mình học sao rồi mẹ.',1],['Tháng sau con gửi tiền.',0],['Ở đây đêm hổng ai canh.',0,1]],
    [['Ai hỏi thì mẹ nói con khỏe.',1],['Mẹ chuyển giùm con năm triệu nha.',0],['Con ngủ lầu hai.',0]]];
  const ok=await noiGiauChu(tu,sets);
  await L([['','Cuộc gọi tắt. Chị Bảy cầm điện thoại đi.']]);
  if(ok){ flag('goi_ok'); await L([['~@','Nếu '+nguoi+' nghe ra, bên ngoài sẽ có chữ '+tu+'.']]); } else await say('~@','Có câu nào lệch chữ. Chắc bên kia không đọc ra.'); };
/* ---------- cảnh 6: bị bán lại ---------- */
SC.canh6=async()=>{ cine(true); await bg('x2-phong-ngu'); dark(true);
  await card('NGÀY 16 · 22:40\nDANH SÁCH');
  const can=dsCon().filter(p=>!['ngan','khang','loc'].includes(p.id)).sort((a,b)=>(S.tin[a.id]||0)-(S.tin[b.id]||0)).slice(0,2);
  await L([['','Chị Bảy dán một tờ giấy lên cửa phòng ngủ. Hai cái tên. Dòng chữ in: "Chuyển công ty đối tác · thứ Sáu."'],
   ['','Hai cái tên: '+can.map(p=>p.ten).join(' và ')+'.'],['~@','Thứ Sáu là ngày kia. Sau đêm giải cứu một ngày, nếu giải cứu đúng giờ. Còn nếu tụi nó dời lên…']]);
  const ops=[{t:'Xin Chị Bảy gạch hai cái tên',sub:'cần Chị Bảy tin mình',dis:(S.tin.bay||0)<3},{t:'Chuyển 3.000.000đ cho Chị Bảy, giữ lại một người',sub:'nhờ người bên ngoài chuyển',dis:S.tien<3000000},{t:'Không làm gì được'}];
  const i=await choose(ops,{q:'Tờ danh sách'});
  if(i===0){ await L([['Chị Bảy','...Thứ Sáu chị bận. Chị viết sai tên. Đi ngủ đi.']]); }
  else if(i===1){ tien(-3000000); await say('Chị Bảy','Một người thôi. Đứa kia chị hổng giữ được.'); const p=can[1]; if(p){ p.con=false; S.log.push(p.ten+' bị chuyển đi trước đêm giải cứu.'); } }
  else { can.forEach(p=>{ p.con=false; S.log.push(p.ten+' bị chuyển đi trước đêm giải cứu.'); }); await say('','Sáng thứ Năm, hai cái giường trống. Mền đã gấp sẵn.'); }
  lo(10); await say('~@','Tụi nó đang dọn bớt người. Đêm đó không chờ được nữa.'); dark(false); };
/* ---------- cảnh 7: người trốn hụt ---------- */
SC.canh7=async()=>{ cine(true); await bg('x2-phong-ngu'); dark(true);
  await card('NGÀY 17 · 2:10 SÁNG');
  await L([['','Tiếng chân trần chạy trên hành lang. Rồi tiếng ống nước rung. Rồi tiếng chó.'],['~@','Tí. Thằng nhỏ leo cái ống nước sau bếp.'],['','Đèn pha bật. Tiếng la. Ở cửa sổ, cả phòng đứng nhìn xuống sân: Sẹo đang lôi Tí về.']]);
  const i=await choose([{t:'Chạy xuống chặn Sẹo',sub:'Quản lý nghi tăng mạnh'},{t:'Đứng nhìn'}],{q:'Tí đang bị lôi về.',timer:7,mac:1});
  if(i===0){ await L([['','Sẹo dừng lại vì có người đứng chắn giữa sân. Một giây. Hai giây.'],['Chị Bảy','Thôi! Nó còn nợ, đánh hư thì ai trả.'],['','Chị Bảy kéo Tí đi về dãy trong. Lúc đi ngang, chị nói rất nhỏ: "Ngu."']]); nghi(20); tin('ti',2); tin('bay',1); }
  else { await L([['','Không ai xuống. Không ai nói gì. Tí bị đưa về dãy trong.'],['','Sáng ra, Chị Bảy đứng giữa phòng máy, kể lại chuyện đêm qua bằng giọng đều đều, như đọc kịch bản.']]); flag('ti_phat'); }
  flag('siet'); S.f.siet=2; await say('','Trại siết lại. Hai đêm tới, tuần tra gấp đôi.'); dark(false); };
/* ---------- ngày 18: khám phòng ---------- */
SC.khamPhong=async()=>{ cine(true); await bg('x2-phong-ngu');
  await card('NGÀY 18 · 6:05\nKHÁM PHÒNG');
  if(!has('may')){ await L([['','Lính gác lật từng cái nệm. '+who()+' không có gì để giấu.'],['~@','Lần này nghèo lại hay.']]); return; }
  await L([['','Cửa phòng đập mạnh. Sẹo với hai lính gác đi vào, lật từng cái nệm.'],['~@','Cái điện thoại. Còn mấy giây.']]);
  const i=await choose([{t:'Nhét vô ruột gối'},{t:'Dán dưới đáy thùng nước ở buồng tắm'},{t:'Đưa cho '+(S.nhanh==='B'?'Thủy':'Nhi')+' giữ',sub:'cần người đó tin mình'}],{q:'Giấu ở đâu?',timer:6,mac:0});
  const ok=i===1||(i===2&&(S.tin[S.nhanh==='B'?'thuy':'nhi']||0)>=3);
  if(ok) await say('','Sẹo lật ruột gối, xé nệm, chửi thề. Rồi đi ra. Điện thoại còn.');
  else { await L([['','Sẹo giơ cái điện thoại lên trước mặt cả phòng.'],['Sẹo','Của đứa nào.']]); delete S.f.may; nghi(25); } };

/* ---------- tin rác từ ngoài vào: xác nhận ---------- */
SC.tinVao=async(tu,dapan)=>{ dark(true); await L([['','Nửa đêm, máy giấu rung một cái. Tin quảng cáo.']]);
  const ok=await giaiMa(tu,dapan); dark(false); return ok; };

/* ---------- nhánh A: người ở ngoài, chen giữa các ngày trong trại ---------- */
SC.ngoaiA=async(n)=>{ const ai=S.ai_vao==='ngan'?'Lâm':'Ngân'; const keep=S.vai; S.vai=ai==='Lâm'?'lam':'ngan'; S.vai_ngoai=true; cine(false); trai(false); await bg('x2-bo-ben-nay'); dark(true); hud();
  const T={1:[['','Bờ bên này. '+ai+' ngồi trên mũi ghe của Tài xế Thoại, nhìn qua sông. Bên kia là bức tường cao, đèn pha quét mỗi bốn mươi giây.'],['~'+ai,'Có một ô cửa sổ tầng hai còn sáng. Không biết có phải ô đó không.']],
   2:[['','Hương gọi. Giọng gấp.'],['Hương','Người của tôi xác nhận rồi: đúng khu đó. Đại úy Vinh đang chờ giờ.'],['~'+ai,'Còn thiếu giờ. Phải chờ tin từ trong.']],
   3:[['','Đêm. '+ai+' ngồi đếm từng lần đèn pha quét qua. Bốn mươi giây một lần. Đều như đồng hồ.'],['~'+ai,'Nếu là mình ở trong đó, mình sẽ chạy vào giây thứ ba mươi lăm.']]}[n]||[];
  await L(T); dark(false); S.vai=keep; S.vai_ngoai=false; cine(true); trai(true); hud(); };

/* ---------- nghe lén: lộ giọng thật ---------- */
SC.ngheLen=async()=>{ await L([['','Sau cánh cửa văn phòng, quản lý bật loa ngoài. Tin thoại từ Ông Chủ Lò.'],['Ông Chủ Lò','…tổ con mèo tháng này đủ chưa. Thằng Tú nó ngu, để má lo. Tin để lâu là thiu.'],['','Rồi tiếng rè. Đoạn cuối, phần mềm đổi giọng tắt mất hai giây. Một giọng đàn bà già, khàn, nói nốt: "…cả đời má lo cho tụi bây."'],['~@','Đàn bà. Gọi Tú là "thằng Tú". Xưng "má".'],['~@','"Cả đời mẹ lo cho con." Bài mừng thọ sáu mươi tuổi trên trang của anh Tú.']]); cc('giong','giọng thật của Ông Chủ Lò'); flag('nghe_len'); flag('biet_my'); };
SC.chupSo=async()=>{ await L([['','Cuốn sổ bìa đen trong ngăn kéo. Mỗi trang một tổ, mỗi dòng một người, cột cuối ghi "nộp lên".'],['','Cột "nộp lên" có chữ ký nhỏ: "B." và một con dấu tròn: CÔNG TY TNHH DV THƯƠNG MẠI PHÁT ĐẠT TN.'],['~@','Phát Đạt TN. Công ty đứng tên bà Trần Thị Mỹ.']]); cc('so','sổ chỉ tiêu có dấu Phát Đạt TN'); flag('so_chup'); };
SC.tuTai=async()=>{ cine(true); await bg('x2-san-diemdanh');
  await card('NGÀY 18 · 15:00\nCÓ KHÁCH');
  await L([['','Một chiếc xe bảy chỗ chạy vô sân. Người bước xuống đội nón lưỡi trai, đeo túi bao tử. Anh Tú.'],['Tú','Nghe nói có chuột.'],['','Ổng đi dọc dãy bàn phòng máy, dừng lại sau lưng '+who()+'.']]);
  if(S.vai==='lam'){ await L([['Tú','Ủa. Lâm.'],['Tú','Mày qua đây làm gì? Viết bài hả mày?'],['','Cả phòng im. Chị Bảy đứng ở cửa.']]);
    const i=await choose([{t:'"Tôi qua đây trả nợ. Như anh nói: có cầu có cung."',sub:'giả làm người đã gục'},{t:'"Tôi qua đưa người ta về."'}],{q:'Anh Tú đứng sau lưng',timer:8,mac:0});
    if(i===0){ await L([['Tú','Ha. Biết điều. Làm đi. Làm cho đủ.'],['','Tú bỏ đi, vừa đi vừa gọi điện: "Dạ má. Hổng có gì đâu má."'],['~Lâm','"Dạ má."']]); cc('tu','Tú gọi "má" báo cáo'); }
    else { await L([['Tú','Mày điên thiệt rồi.'],['','Tú quay qua Chị Bảy: "Canh nó."']]); nghi(30); cc('tu','Tú lộ mặt ở trại'); } }
  else { await L([['Tú','Con mèo. Mày quay lại hả.'],['Ngân','Em hết đường rồi anh.'],['Tú','Biết vậy là được. Làm đi.'],['','Tú bỏ đi, vừa đi vừa gọi điện: "Dạ má. Con mèo về rồi."']]); cc('tu','Tú gọi "má" báo cáo'); nghi(10); } };
