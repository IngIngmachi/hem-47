/* Hẻm 47 · Phần 2 — lời thoại trong trại (Hồi 2) và đêm cuối (Hồi 3).
   {me} = tên người đang chơi, {ban} = người còn lại (nhánh A). */
'use strict';

/* =====================================================================
   VÀO TRẠI · NGÀY 8
   ===================================================================== */
X('x_canh1','Cảnh 1 · đường mòn',[
 {bg:'x2-xe-dem'},{card:'NGÀY 8 · 3:58 SÁNG\nĐƯỜNG MÒN SÁT BIÊN GIỚI'},
 'Xe 16 chỗ tắt đèn lao qua đường tiểu ngạch. Tới bãi mía, ông chú đi cùng đòi xuống liền bị hai thằng lơ xe kẹp cổ, đẩy thẳng lên thùng xe tải khóa trái cửa. Tới lúc này những người đi cùng mới biết mình bị lừa bán.',
 'Cuối đường mòn, hai gã bảo vệ của chủ sòng nước ngoài đeo dùi cui điện đứng chặn. Gã cầm đầu có vết sẹo dài từ thái dương xuống cằm, quát tháo bằng thứ tiếng Việt lơ lớ học mót được từ đám cai thầu.',
 ['Sẹo','Đt, căn cước, giỏ xách. Lột sạch quăng vô thùng nhựa hết!'],
 {chon:[
  {t:'Đứng im cúi gằm mặt xuống đất',s:'+co:x_giu',L:['Tay gã bảo vệ nắn dọc hai bên túi quần một giây rồi đẩy đi tiếp. May mà mấy tờ tiền lẻ gom ở hẻm đã được nhét kỹ dưới lớp lót đế giày.']},
  {t:'Nhanh tay giấu món đồ qua chỗ khác trên người',s:'+nghi:10',L:['Thằng Sẹo chụp cứng cổ tay, giật phăng món đồ giấu trong người quăng thẳng xuống sình.']},
  {t:'Mở miệng hỏi: "Anh ơi chừng nào tụi em được nhận lại đồ?"',s:'+co:x_giu',L:[['Sẹo','Trả hả? Chừng nào mày cày đủ chỉ tiêu thì tự lấy tiền thưởng mà sắm cái mới.'],'Đám bảo vệ đứng quanh phá lên cười sằng sặc.']}],q:'Sẹo khám từng người. Tới lượt {me}.',timer:8,mac:0},
 {bg:''}]);
X('x_canh2','Cảnh 2 · cổng sắt',[
 {bg:'x2-cong-sat'},{card:'CỔNG SẮT'},
 'Cổng sắt đóng sầm sau lưng. Tường bê tông cao bốn mét giăng kẽm gai. Góc sân có cái lồng sắt lộ thiên chỉ đủ ngồi khom lưng, dân trong trại gọi là "chuồng cọp". Bên kia tường vọng lại tiếng nước sông.',
 'Phòng thu nhận. Trên bàn nhựa để sẵn tờ giấy in chữ: "Giấy nhận nợ: chi phí qua biên giới, ăn ở, đào tạo và đền hợp đồng. Tổng: 3.200 USD."',
 ['Chị Bảy','Ký tên vô đi em. Vô đây đứa nào cũng phải ký hết. Chịu khó làm đủ doanh số thì trừ nợ dần, chừng nửa năm là được về.'],
 ['~','Giọng miền Nam đặc sệt. Ngón tay bà ta đeo chiếc nhẫn bạc kiểu cũ nhìn quen mắt kỳ lạ, tay áo dài cài kín cổ tay giữa trời nóng hầm hập.'],
 {chon:[
  {t:'Cầm bút ký',sub:'qua được hôm nay',L:[['Chị Bảy','Biết điều vậy là ngoan. Đi lên lầu 2, vô phòng ngủ của tổ 3 đi.']]},
  {t:'Bỏ bút không ký',sub:'đêm đầu ở phòng tối',s:'+nghi:15 +tin_nhi +tin_thuy +tin_toan',L:[['Chị Bảy','...Rồi, muốn cứng đầu thì chiều.'],{bg:'x2-phong-toi'},'Đêm đầu tiên bị nhốt vào "chuồng chó" — cái lồng sắt thấp dưới gầm cầu thang ẩm mùi rỉ sét, không thể đứng thẳng lưng. Không đèn, chỉ có một chai nước lạnh.','Sáng hôm sau được thả về phòng ngủ, mấy người trong tổ cứ lén nhìn {me} bằng ánh mắt khác hẳn.']}],q:'Tờ giấy nợ'},
 {if:'vao:ngan',L:[['Chị Bảy','Khoan đã. Đứa kia... ngước mặt lên chị coi thử.'],'Chị Bảy đứng khựng lại nhìn Ngân hồi lâu. Rồi bả lặng lẽ lấy bút gạch sửa lại tên trên tờ danh sách điểm danh theo tên giả của Ngân, quay lưng bỏ đi không báo cho Sẹo.',['~','Bả nhận ra mặt mình rồi. Nhưng bả im luôn không báo cho tụi bảo vệ.'],{fx:'+nghi:25'}]},
 {fx:'+cc:x_no ds:build'},
 {bg:'x2-phong-ngu'},'Tối. Phòng ngủ tổ 3 kê 3 dãy giường sắt hai tầng, treo độc một bóng đèn vàng. Ai nằm giường nấy, không ai dám bắt chuyện.',
 ['~','Từ mai là vô guồng: 7h sáng ngồi vô máy, 12h ăn cơm trưa, 1h chiều làm tiếp tới 7h tối mới được ra sân thở. Đúng 10h đêm tắt đèn khóa cửa.'],
 {bg:''}]);

/* =====================================================================
   CA LÀM · PHÒNG MÁY
   ===================================================================== */
X('x_ca_mo','Ca sáng',[
 {if:'ngay<9|!co:x_ca1',L:[
  {bg:'x2-phong-may'},{card:'NGÀY 9 · 7:00\nPHÒNG MÁY'},
  'Phòng máy kê 3 dãy bàn dài, mỗi dãy 10 bộ máy tính. Dây mạng chằng chịt dưới sàn. Trên tường treo cái chuông đồng kế bên tấm bảng trắng ghi chỉ tiêu.',
  ['Chị Bảy','Mỗi đứa phải chốt cọc đủ 3 khách một ngày. Danh sách số điện thoại nằm sẵn trên máy — có cả những đầu số thu thập từ khu Fan Xích Vô, Gò Vướng. Đứa nào khách nổ tiền thì chị rung chuông.'],
  '10h sáng. Tiếng chuông đồng leng keng. Chị Bảy đứng đầu phòng vỗ tay, nguyên phòng máy răm rắp vỗ tay theo.',
  {chon:[{t:'Giơ tay vỗ theo mọi người',L:['Tiếng vỗ tay đều rắp mà mặt ai cũng đờ đẫn.']},
   {t:'Ngồi im nhìn màn hình',s:'+nghi:10 +tin_ngan +co:x_ngoi_im',L:['Chị Bảy đứng trên bục liếc thẳng xuống chỗ {me}.','Tuốt cái bàn góc cuối dãy, có một bóng người cũng đang ngồi im không vỗ tay.']}],q:'Cả phòng đang vỗ tay.',timer:6,mac:0},
  {fx:'+co:x_ca1'},{bg:''}]}]);
X('x_ca_thieu','Cuối ca',[
 'Cuối ngày chốt sổ chỉ tiêu. Ngay dòng tên của {me} bị quẹt một vạch bút đỏ: không đạt chỉ tiêu.',
 ['Chị Bảy','Hụt chỉ tiêu ngày đầu: cộng phạt vào nợ gốc. Hụt ba ngày: xuống nằm chuồng chó dưới gầm cầu thang. Hụt nguyên tuần: tối thứ Sáu ra sân lên danh sách bán qua đặc khu Miến Điện.']]);
X('x_ca_du','Cuối ca',['Cuối ngày chốt bảng. Dòng tên của {me} tích đủ 3 dấu xanh. Chị Bảy đi lướt ngang qua không nói gì.']);

/* =====================================================================
   GẶP NGƯỜI · NHÁNH B
   ===================================================================== */
X('x_thuynhan','Nhà ăn · cô gái vẽ trên bàn',[
 'Giờ nghỉ trưa. Nhà ăn kê mấy dãy bàn inox dài. Một con bé bưng khay cơm đi lướt ngang qua chỗ {me}.',
 'Con bé đặt khay xuống bàn kế bên, chấm đầu đũa vô nước canh vẽ lẹ một nét lên mặt bàn inox rồi lấy tay chùi liền.',
 {chon:[
  {t:'Hình số 3',L:[['~','Con số 3. Là phòng trọ số 3 nhà bà Sáu!'],['~','Con bé đó là Thủy — đứa từng ở phòng số 3 trước mình.'],'Thủy bưng khay đứng dậy, lúc lướt ngang qua chỉ buông gọn lỏn: "Tối nay. Chỗ buồng tắm."'],s:'+co:x_thuy_biet +tin_thuy'},
  {t:'Hình con mèo',L:[['~','Hình con mèo? Không phải, mình nhìn lầm rồi.'],'Con bé bưng khay bỏ đi, tới ngay cửa nhà ăn còn ngoái đầu lại ngó {me} một cái.'],s:'+co:x_thuy_lo'},
  {t:'Không thấy gì, chắc vô tình',L:[['~','Chắc mình nhìn lộn thiệt.']],s:'+co:x_thuy_lo'}],q:'Cô gái vẽ gì?',timer:7,mac:2}]);
X('x_thuylai','Nhà ăn · Thủy',['Trưa nay con bé hôm qua lại bưng cơm ngồi bàn kế bên. Lần này nó lấy đũa viết rõ ràng hơn: số 3.',['~','Là Thủy, con bé ở phòng số 3!'],'Lúc đi ngang qua, Thủy nói nhỏ như gió thoảng: "Tối nay. Buồng tắm."',{fx:'+co:x_thuy_biet +tin_thuy'}]);
X('x_thuygap','Buồng tắm · Thủy',[
 {bg:'x2-buong-tam'},
 'Buồng tắm tuốt cuối hành lang. Mở vòi nước xả cho át tiếng động, Thủy đứng nép sát vô vách tường thì thào.',
 ['Thủy','Anh bị khùng hả anh Lâm? Tự dưng chui vô cái ổ này làm gì?!'],['Lâm','Tôi vô để kiếm đường đưa tụi em về.'],
 ['Thủy','Chị Ngân đang ngồi bên phòng máy số 2, bàn cuối cùng á. Chỉ làm tổ trưởng, mà từ lúc dời về cảng này tụi chủ sòng khóa trắng sim máy tổ trưởng rồi, chỉ nhắn được cho khách chỉ định thôi chứ không nhắn ra ngoài như đợt ở Ba Vẹt được nữa.'],
 ['Thủy','Chỉ còn hận anh dữ lắm. Chỉ từng nói với em cái hạng người viết bài hại người như anh, có mò tới đây cũng chỉ để kiếm chất liệu viết bài tiếp thôi.'],
 ['Thủy','Anh nghe em dặn nè: lúc gõ kịch bản cho khách, gặp chữ "chuyển" thì nhớ gõ sai thành "chuyễn". Mẹo chị Ngân bày đó, để khách nào tỉnh táo nhìn thấy sẽ sinh nghi mà giữ được tiền.'],
 ['Thủy','À còn chuyện này nữa. Dưới đáy cái thùng nhựa đựng nước trong buồng tắm này có dán giấu một cái đt cũ của đứa tính vượt ngục đợt trước. Anh ráng mò thử coi còn lên nguồn hông.'],
 {fx:'+co:x_thuy_chi +co:x_meo_cailoi +co:x_biet_may +tin_thuy'},{bg:''}]);
X('x_nganb1','Nhà ăn · Ngân',[
 'Ngân ngồi ăn cơm một mình ở góc cuối bàn. Tóc cột thấp, người ốm nhom so với tấm hình đại diện năm ngoái.',
 ['~','Chính tay mình đã cắt tấm hình đại diện đó ra để đóng khung chữ LỪA ĐẢO.'],
 {if:'mon:meo co:x_giu',L:['Lâm đi ngang, lẳng lặng đặt con mèo vải màu đen lên bàn, ngay sát khay cơm của Ngân.',['Ngân','...'],['Ngân','Ở đâu anh có cái này?'],
   {if:'p1:noi_cuocgoi',L:[['Lâm','Cô Thoa đưa cho tôi.']]},{if:'!p1:noi_cuocgoi',L:[['Lâm','Bà Sáu cất giùm cô. Lấy từ cái vali màu hồng trên gác.']]},
   'Ngân chụp lấy con mèo vải đen, bóp chặt tới trắng bệch các đốt ngón tay. Suốt hơn một năm bị gọi bằng mật danh "con mèo", đây là thứ đầu tiên nhắc cho cô nhớ mình vẫn còn một cái tên và một người mẹ đang đợi ở đầu hẻm 47.',['Ngân','Tối mai. Ngay buồng tắm.'],{fx:'+tin_ngan +co:x_ngan_nghe'}]},
 {if:'!mon:meo|!co:x_giu',L:[{chon:[
  {t:'"Tiệm tạp hóa đầu hẻm 47, ngày nào cô Thoa cũng cắm sạc cái đt cũ của cô."',L:[['Ngân','...'],['Ngân','...Tiệm mẹ tui ở nhà vẫn mở bán được hả?'],['Ngân','Tối mai. Chỗ buồng tắm. Anh mà xạo tui một chữ là tui hô lên cho bảo vệ còng đầu anh liền.']],s:'+tin_ngan +co:x_ngan_nghe'},
  {t:'"Tôi là Lâm. Tôi qua đây để đưa cô về."',L:[['Ngân','Năm ngoái chính anh đẩy tui vô chỗ này rồi còn gì.'],'Ngân bưng khay cơm đứng phắt dậy bỏ đi.']},
  {t:'Kéo ghế ngồi xuống ăn, không nói tiếng nào',L:['Ngân cắm cúi ăn hết phần cơm, tuyệt nhiên không liếc qua nhìn Lâm lấy một cái.']}],q:'Nói gì với Ngân?'}]}]);
X('x_nganb3','Buồng tắm · Ngân',[
 {bg:'x2-buong-tam'},
 ['Ngân','Đêm 30/3 năm ngoái, lúc thấy số anh gọi tới lúc 9h15 tối, anh biết tui đã nghĩ gì không? Tui đã mừng tới bật khóc vì tưởng cuối cùng cũng có một người làm báo chịu lắng nghe tui giải thích.'],
 ['Ngân','Anh còn nhớ cuộc gọi đó không?'],
 {if:'p1:noi_cuocgoi|p1:lam_nho',L:[['Lâm','Tôi nhớ. Cuộc gọi dài 3 phút 12 giây. Nghe máy xong tôi gọi hỏi ý anh Tú, rồi bấm đăng luôn. Sau đó cô gọi lại 5 cuộc, tôi lật úp màn hình không bắt máy.'],['Lâm','Trước khi đi tôi đã qua thú nhận hết với cô Thoa rồi. Giờ tôi nói thẳng trước mặt cô.'],'Ngân đứng im lặng hồi lâu. Chỉ có tiếng nước rỉ từng giọt từ vòi sen.',['Ngân','Vậy đêm rút chạy anh phải đi khóa đuôi. Đừng có hòng chạy thoát thân trước.'],{fx:'+tin_ngan'}]},
 {if:'!p1:noi_cuocgoi !p1:lam_nho',L:[{chon:[
  {t:'"Tôi nhớ. Tôi nghe cô giải thích hết, mà vẫn cố tình bấm đăng."',sub:'nói thật',s:'+tin_ngan',L:[['Lâm','Đêm đó tôi nghe tiếng cô khóc. Tôi gọi cho ông Tú, ổng bảo con nhỏ khóc mặc kệ nó, cứ đăng đi. Tôi đã bấm đăng, rồi nhìn máy báo 5 cuộc gọi nhỡ của cô mà úp mặt điện thoại xuống bàn.'],'Ngân nện mạnh nắm đấm vô vách tường gạch, đứng thở dốc.',['Ngân','Cả năm trời mới nghe được một câu nói thiệt. Được, vậy đêm rút đi anh phải ở lại chặn hậu tới cuối cùng.']]},
  {t:'"Lâu quá tôi không nhớ rõ nữa. Đêm đó mọi thứ rối quá."',sub:'né',s:'-tin_ngan',L:[['Ngân','Tới tận bây giờ mà anh vẫn sống hèn y như hồi đó.'],'Ngân mở cửa buồng tắm bước ra ngoài.']}],q:'Ngân hỏi về đêm 30/3'}]},
 {fx:'+co:x_ngan_b3'},{bg:''}]);
X('x_canhngan','Ngồi cạnh Ngân',['Chị Bảy gật đầu phân chỗ. Ca chiều nay {me} được xếp ngồi cái máy kế bên bàn của Ngân.',{fx:'+co:x_canh_ngan'}]);
X('x_canhngan_ok','Ngồi cạnh Ngân',['Lúc đi ngang, Ngân liếc mắt qua màn hình của {me}. Thấy chữ "chuyễn" cố tình gõ sai dấu, cổ khựng lại một nhịp rồi quay về chỗ ngồi.',['Ngân','(thì thào) Ai chỉ anh cái mẹo đó?'],['Lâm','Con bé Thủy. Nó nói cô là người bày cho nó.'],['Ngân','...'],{fx:'+tin_ngan -co:x_canh_ngan +co:x_canhngan_xong'}]);
X('x_nguoiban','Nhà ăn · người cũ',[
 {if:'p1:bao_tam',L:['Trong nhà ăn, một gã đàn ông đang bưng khay cơm bỗng đứng sững lại, trân trối nhìn Lâm.',['Tâm','Mày... mày là cái thằng tra ra địa chỉ phòng trọ của tao rồi bán cho ông Khoa nè!']]},
 {if:'!p1:bao_tam',L:['Thằng nhỏ bưng khay cơm đi ngang bỗng khựng lại.',['Phát','Anh Lâm? Chính anh đã gửi địa chỉ chỗ trốn của em cho ông Khoa. Hai ngày sau là tụi nó ập tới khống chế đưa em qua biên giới!']]},
 'Mấy bàn xung quanh bắt đầu ngoái lại dòm. Chị Bảy từ đầu nhà ăn sải bước đi tới.',['Chị Bảy','Có vụ gì mà ồn ào đó?'],
 {chon:[
  {t:'"Đúng, hồi đó tôi làm bậy. Giờ tôi chui vô đây để chuộc lại lỗi đó."',sub:'nói thật trước mặt Chị Bảy',s:'+nghi:10 +co:x_ban_nhan',L:[['Chị Bảy','Chuộc lỗi? Rớt vô cái lò này rồi ai cứu được ai mà đòi chuộc.'],'Chị Bảy quay lưng bỏ đi. Người kia ngồi phịch xuống ghế, mắt vẫn nhìn Lâm chằm chằm.',['~','Ánh mắt đó như đang hỏi thẳng: giờ mày tính trả lại cho tao bằng cách nào?'],['Lâm','Bằng một đêm dẫn mọi người trốn ra. Nhưng chưa phải lúc này.']]},
  {t:'"Ông nhìn lộn người rồi, tôi mới vô đây lần đầu."',sub:'chối',L:[['Chị Bảy','Lo húp cơm đi. Ân oán ngoài xã hội bỏ ngoài cổng sắt hết cho chị.'],'Tạm thời êm chuyện. Người kia cúi mặt ăn tiếp, không làm ầm lên nữa.']}],q:'Có người đang tố {me}',timer:8,mac:1}]);

/* ---------- nhánh A: gặp tổ cũ ---------- */
X('x_tocu_lam','Nhà ăn · tổ cũ của Ngân',[
 'Giờ ăn trưa. Con bé có cái balo hồng đi ngang, ngón tay cứ gõ nhịp lên khay inox theo thói quen gõ bàn phím. Là con Nhi trong danh sách của Ngân.',
 ['Lâm','Con mèo mun ở đầu hẻm vẫn còn sống.'],
 ['Nhi','...'],['Nhi','Trời ơi... Chị Ngân cử anh vô đây kiếm tụi em hả?!'],
 ['Nhi','Để tối nay về phòng em rỉ tai báo cho anh Toàn với chị Huệ. Còn thằng Tí để em canh nó cho.'],
 ['Nhi','À anh nhớ nha: dưới đáy thùng nước trong buồng tắm có dán cái đt cũ á. Tụi em nhát gan hổng đứa nào dám rớ vô.'],
 {fx:'+tin_nhi +tin_nhi +tin_toan +tin_hue +tin_ti +co:x_to_biet +co:x_biet_may'}]);
X('x_tocu_ngan','Nhà ăn · tổ cũ',[
 'Giờ cơm trưa. Vừa thấy mặt Ngân, con Nhi xúc động làm rớt cái muỗng. Chị Huệ ngồi kế bên phải cấu mạnh vô đùi nó dưới gầm bàn.',
 ['Chị Huệ','Trời đất ơi con thoát về tới nhà rồi mà, sao còn chui đầu vô lại đây chi vậy con?!'],['Ngân','Con quay lại kiếm đường dắt mấy chị em mình về chung.'],['Tí','Chị Ngân... Tụi quản lý đồn chị bị thủ tiêu rồi, em tưởng chị chết thiệt rồi chứ.'],
 ['Nhi','Chị ơi cái đt giấu dưới đáy thùng nước buồng tắm vẫn còn nguyên đó, chưa đứa nào dám lấy xài hết.'],
 {fx:'+tin_nhi +tin_nhi +tin_hue +tin_hue +tin_ti +tin_ti +tin_toan +co:x_to_biet +co:x_biet_may'}]);

/* ---------- nói chuyện buổi tối (việc phụ) ---------- */
const VX={xnhi:[['Nhi','Ở quê chắc ngoại em vẫn khoe khắp xóm là cháu gái đi làm công ty nước ngoài lương cao lắm á.'],['Nhi','Lúc lén nhắn về em cố tình đệm chữ "á" cuối câu cho chị Ngân nhận ra em. Không biết chỉ đọc được hông nữa.'],['~','Nhờ chữ "á" cuối câu đó mới biết em còn sống mà lần theo.']],
 xnhi2:[['Nhi','Mấy bữa nay giờ cơm trưa anh Toàn toàn được nhà bếp phát thêm trứng luộc. Lạ ghê á.'],['~','Được phát thêm phần ăn? Ở cái trại này làm gì có chuyện tự dưng được ưu đãi không công.'],{fx:'+co:x_vu3_nhi'}],
 xtoan:[['Toàn','Hồi ở nhà tui thiếu nợ app có 30 triệu, bị lừa qua đây tụi nó bắt ký giấy nợ 100 triệu.'],['Toàn','Tui sợ bị lôi vô phòng tối đập lắm rồi. Có tính làm gì thì làm ơn đừng lôi tui vô.']],
 xhue:[['Chị Huệ','Thằng con trai chị ở nhà vay app bị tụi nó gọi khủng bố cơ quan. Chị mới nhắm mắt đi làm xa tính kiếm tiền trả nợ cho nó khỏi mất việc.'],['Chị Huệ','Chị già cả rồi chạy lẹ hổng nổi, mà chị ráng lết theo tụi em được, đừng bỏ chị nghen.']],
 xhue2:[['Chị Huệ','Mấy đêm nay khuya nào thằng Toàn cũng bị kêu lên văn phòng lầu 3. Lúc mò về phòng mặt mũi nó cắt không còn giọt máu.'],{fx:'+co:x_vu3_hue'}],
 xti:[['Tí','Nhắm từ bờ tường này phóng ra sông có xa hông ta? Đêm nào nằm ngủ em cũng nghe tiếng sóng vỗ sát rạt.'],['Tí','Em nhắm kỹ đường ống nước sau bếp rồi. Đợi khuya nay lính đổi ca, em đu ống nước phóng qua tường rào…'],['~','Thằng nhỏ đang tính liều mạng vượt rào một mình.'],{chon:[{t:'"Đừng có làm bậy! Ráng nhịn đợi thêm mấy bữa nữa rồi trốn chung nguyên đám."',s:'+tin_ti +co:x_ti_doi',L:[['Tí','...Kêu đợi là đợi tới chừng nào nữa?'],['{me}','Đang xếp đường rút rồi, tới ngày tôi báo cho em liền.']]},{t:'Im lặng không cản'}],q:'Tí'}],
 xthuy:[['Thủy','Cái phòng số 3 nhà bà Sáu giờ ai dọn vô ở rồi anh? Nhiều đêm nằm đây em cứ mơ thấy cái cửa sổ nhìn thẳng xuống tiệm cô Thoa.']],
 xkhang:[['Khang','Ông Khoa anh tui... ở ngoài giờ sao rồi?'],['Khang','Hồi đó tui trốn đi chỉ vì thấy anh Khoa mặc cái áo sơ mi trắng sờn cổ đi làm cực quá, tính qua bển cày vài tháng mua tặng ảnh chiếc xe. Ai dè tự chui đầu vô rọ, giờ còn kéo luôn anh hai vô vòng nợ nần.']],
 xloc:[['Anh Lộc','Trời đất ơi mò vô tận cái ổ quỷ này thiệt hả? Còn liều mạng hơn cả tui nữa!'],['Anh Lộc','Tui bị phân vô phụ bếp. Trên nóc tủ chén tụi bảo vệ có bỏ quên cây kìm cộng lực cắt kẽm, chừng nào cần lấy thì hú tui.'],{fx:'+co:x_biet_kim'}],
 xngan:[['Ngân','Trong tổ mình con Nhi gõ máy lẹ nhất, thằng Tí lanh lẹ nhất, còn chị Huệ đau chân đi chậm phải có người dìu.'],['Ngân','Còn anh Toàn nhát đòn lắm. Hễ bị hù dọa là dễ khai hết.']]};
const VXT={xnhi:'nhi',xnhi2:'nhi',xtoan:'toan',xhue:'hue',xhue2:'hue',xti:'ti',xthuy:'thuy',xkhang:'khang',xloc:'loc',xngan:'ngan'};
for(const k in VX){ const id=k.replace(/\d$/,''); X('V_'+id+'_'+k+'_x','Nói chuyện',VX[k].concat([{fx:'+tin_'+VXT[k]}]),{h:/2$/.test(k)?'co:x_vu3':''}); }

/* ---------- Chị Bảy: lời khai ---------- */
X('x_bay_goi','Lầu ba · Chị Bảy gọi lên',[
 {bg:'x2-tang3'},
 'Chị Bảy ngoắc {me} lên văn phòng lầu 3. Trong phòng bật máy lạnh, kê cái tủ sắt với màn hình chia 4 góc camera giám sát.',
 ['Chị Bảy','Ngồi xuống đó đi. Chị hỏi câu nào trả lời thiệt câu đó, chị chúa ghét đứa nào nói láo.'],
 ['Chị Bảy','Chị ở đây cũng chỉ là phận làm thuê ăn lương thôi em. Ở trên chỉ đạo xuống sao thì chị làm vậy.'],{bg:''}]);
M('KHAI_xbay','khai','Chị Bảy','Chị Bảy: "Chị chỉ làm công"',{sau:'+cc:x_khaibay +co:x_bay_lat +tin_bay +tin_bay +tin_bay'});
M('CAU_xbay_01','cau','KHAI_xbay','Chị ở đây cũng chỉ làm thuê ăn lương thôi. Tiền bạc chảy về đâu chị làm sao biết được.',{sau:'dung:x_so ok:kh_xbay_1 key'});
M('CAU_xbay_02','cau','KHAI_xbay','Trại này có nhốt ai đâu. Đứa nào làm đủ doanh số trả dứt tiền nợ trong giấy là được thả về liền.',{sau:'dung:x_no|x_lich ok:kh_xbay_2 hoi:kh_xbay_h2'});
M('CAU_xbay_03','cau','KHAI_xbay','Chị chưa gặp mặt chủ lò lần nào hết. Nghe giọng trong tin nhắn là đàn ông mà.',{sau:'dung:x_giongthat ok:kh_xbay_3 key'});
M('CAU_xbay_04','cau','KHAI_xbay','Chị được cất nhắc lên quản lý lầu 3 là nhờ chị làm việc được việc thôi.',{sau:'hoi:kh_xbay_h4'});
X('kh_xbay_1','Lời khai',['Chị Bảy nhìn chằm chằm vô cột "nộp lên" có chữ ký "B." của chính bả kèm con dấu đỏ.',['Chị Bảy','...Mày lục ở đâu ra cuốn sổ này?'],['Chị Bảy','Tụi chủ sòng nước ngoài trên lầu 3 có bao giờ lộ mặt đâu. Tụi nó bắt một đứa người Việt đứng ra ký sổ quản lý người Việt, để mai mốt có biến thì đứa ký tên lãnh đủ.']]);
X('kh_xbay_2','Lời khai',[['Chị Bảy','Khoản nợ 3.200 đô trên giấy có cày tới mục xương cũng không bao giờ trừ hết. Ba năm trước, chị cũng vì bể hụi, mất luôn cái tiệm uốn tóc đầu đường Fan Xích Vô, mà đặt bút ký tờ giấy y hệt vậy.']]);
X('kh_xbay_h2','Lời khai',[['Chị Bảy','Cũng có đứa ráng cày trả đủ nợ, hoặc gia đình vay nóng gửi tiền qua chuộc. Nhưng nhận tiền chuộc xong, tụi nó làm thủ tục "chuyển giao đối tác" — tức là tống lên xe bán thẳng qua đặc khu bên Miến Điện. Một con mồi ăn tiền hai đầu.']]);
X('kh_xbay_3','Lời khai',['Đoạn cuối file ghi âm bị tắt phần mềm bóp giọng, phát ra giọng thật của một phụ nữ lớn tuổi. Chị Bảy lập tức chồm tới bấm tắt, bàn tay run rẩy.',['Chị Bảy','Bà già đó mỗi lần gọi qua đều kêu chị là "con Bảy". Xưa giờ bả chỉ gọi tiếng chứ chưa bao giờ bật camera lộ mặt.'],['~','Vậy "Ông Chủ Lò" đứng trên tất cả thực chất là một người đàn bà!']]);
X('kh_xbay_h4','Lời khai',['Chị Bảy vô thức kéo nhẹ tay áo lên lộ vết sẹo dài nơi cổ tay. Trong ngăn kéo bàn đang hé mở có tấm ảnh cũ đã ố vàng chụp trước cổng hẻm 47.',['Chị Bảy','Hồi ở Sài Gòn, chị mở tiệm uốn tóc nhỏ sát vách tiệm hớt tóc chú Tám. Bể hụi nên bị lừa bán vô đây. Đêm cắt cổ tay trong chuồng chó không chết được, tụi chủ sòng lôi chị lên lầu 3, quăng cho cây thước gỗ bảo: một là mày cầm thước canh tụi nó gõ phím, hai là mày chết rục dưới gầm cầu thang.']]);
X('khai_xbay_xong','Lời khai',[['Chị Bảy','Đi xuống đi. Chị không cứu được tụi bây đâu… Mà nếu có đứa nào sống sót về lại được con hẻm đó, ngó giùm chị coi tiệm chú Tám còn mở cải lương không nghen.'],['~','Bả chịu nhắm mắt làm ngơ rồi. Không ra mặt giúp, nhưng sẽ không ngáng đường mình nữa.']]);
X('khai_xbay_duoi','Lời khai',[['Chị Bảy','Đủ rồi, bước xuống dưới ngay. Ngày mai còn để chị thấy em dò hỏi chuyện lầu 3 nữa là xuống chuồng cọp nằm.'],{fx:'+nghi:10'}]);
X('x_xinchia','Chìa cửa sau',[['Chị Bảy','Chị không đưa chìa khóa cho đứa nào hết. Đêm nay chị chỉ vô tình bỏ quên chùm chìa khóa cửa hậu trên bàn lầu 3 thôi. Ráng mà sống sót về lại hẻm 47 nghen.'],'Sáng thức dậy, {me} mò dưới gối thấy có chiếc chìa khóa lạnh ngắt nhét sẵn từ lúc nào.',{fx:'+co:x_chia'}]);

/* ---------- Khang ---------- */
X('x_khang','Khang',[
 {if:'p1:khoa_lat',L:['Một thằng nhỏ ốm nhom đứng gác ngay chân cầu thang lên lầu 3. Trên ngực áo vẫn còn vết chỉ tháo bảng tên.',['Khang','Ông Khoa nhắn tin mật báo cho tui biết trước rồi. Hai tháng nay tụi quản lý cho tui lên gác cầu thang lầu 3, tụi nó bớt canh tui rồi.'],['Khang','Chìa khóa cửa hậu với chìa khóa văn phòng lầu 3 tui lén đi đánh thêm một bộ nè. Cầm lấy mà xài.'],{fx:'+co:x_chia +tin_khang +tin_khang'}]},
 {if:'!p1:khoa_lat',L:['Dãy phòng phạt tuốt bên trong. Nhìn qua khe cửa sắt, {me} thấy một thằng nhỏ đang ngồi bó gối trong góc tối.',['Khang','Ai ngoài đó?'],['{me}','Anh Khoa ở ngoài nhờ vô kiếm cậu.'],['Khang','...Ổng ở ngoài còn nhớ tới thằng em này hả?'],['{me}','Ráng đợi tới đêm rút quân sẽ quay lại mở cửa đón cậu ra.'],{fx:'+tin_khang +tin_khang'}]},
 {fx:'+co:x_khang_gap'}]);

/* ---------- vụ 3: ai bán tin ---------- */
X('x_vu3mo','Ai đó báo',['Đêm qua lịch đi tuần của lính gác lầu 2 tự dưng đôn lên sớm hơn 20 phút, ngay đúng lúc {me} vừa tính lẻn ra khỏi phòng.',['~','Có nội gián. Trong phòng ngủ có đứa đi mật báo cho quản lý.'],['~','Để ý kỹ coi mấy bữa nay đứa nào hay bị kêu lên lầu 3 ban đêm, đứa nào được nhà bếp cho thêm đồ ăn. Tối nay phải dò hỏi từng người mới được.'],{fx:'+co:x_vu3'}]);
X('x_vu3','Tìm người báo tin',[
 ['~','Trong tổ ai tự dưng được ưu ái thêm đồ ăn? Ai hay lén lên lầu 3 lúc nửa đêm?'],
 {if:'co:x_vu3_nhi',L:['Con Nhi từng kể: "Mấy bữa nay giờ cơm anh Toàn toàn được cho thêm trứng luộc."']},
 {if:'co:x_vu3_hue',L:['Chị Huệ cũng nói: "Khuya nào thằng Toàn cũng bị kêu lên lầu 3."']},
 {chon:[
  {t:'Toàn',h:'',s:'+co:x_vu3_xong',L:[{if:'co:x_vu3_nhi|co:x_vu3_hue',L:[['Toàn','Tui… hôm bữa tụi nó nhốt tui vô chuồng chó hai ngày không cho uống nước. Thằng Sẹo nói hễ báo tin có người rục rịch trốn là nó phát cho trái trứng luộc với trừ cho 1 tháng nợ…'],['Toàn','Tui lạy cậu, tại tui sợ bị đánh quá nên mới làm bậy...'],['~','Không ai sinh ra đã muốn làm kẻ phản bội. Cái lồng sắt dưới gầm cầu thang đó đã bẻ gãy một con người chỉ bằng cơn khát và một quả trứng luộc.'],{fx:'-lo:25 -nghi:10 +tin_toan +tin_toan +co:x_vu3_dung'}]},{if:'!co:x_vu3_nhi !co:x_vu3_hue',L:[['Toàn','Nói tầm bậy gì đó? Tui bán đứng ai hồi nào?'],['~','Chưa gom đủ bằng chứng đã vội hỏi, giờ ổng chối bay chối biến.'],{fx:'-co:x_vu3_xong'}]}]},
  {t:'Chị Bảy',s:'-tin_bay +co:x_vu3_xong',L:[['~','Trật rồi. Chị Bảy nắm hết camera trong tay, cần gì làm trò mật báo lén lút.']]},
  {t:'Chưa đủ, để sau'}],q:'Ai báo cho quản lý?'}]);

/* ---------- cảnh 4: bảng tên đỏ ---------- */
X('x_canh4','Cảnh 4 · sân điểm danh',[
 {bg:'x2-san-diemdanh'},{card:'NGÀY 13 · 21:00\nSÂN ĐIỂM DANH'},
 'Cái loa phóng thanh treo trên cột điện kêu rè rè, đọc tên từng đứa không gõ đủ chỉ tiêu trong tuần.','"…Phòng 3. Tí."',
 'Từ trong bóng tối, Sẹo cầm dùi cui điện bước thẳng tới chỗ Tí, lôi về phía dãy chuồng cọp giữa sân.',
 {chon:[
  {t:'Bước lên chắn trước mặt Tí: "Phần doanh số thiếu của thằng nhỏ là do tôi làm hụt."',sub:'nhận phạt thay',s:'+co:x_phat_thay +tin_nhi +tin_toan +tin_hue +tin_ti +tin_ti +tin_thuy +tin_ngan +nghi:5',L:['Thằng Sẹo khựng lại, nhìn xoáy vô mặt {me} rồi nhếch mép cười.',['Sẹo','Thích gánh thì cho mày gánh. Bước theo tao.'],{bg:'den'},'Màn đen. Tiếng cửa lồng sắt chuồng cọp sập lại. Tiếng dùi cui điện nổ lách tách trong đêm.',{bg:'x2-phong-ngu'},'Sáng hôm sau {me} lê cái chân cà nhắc về lại phòng ngủ. Không ai nói câu nào, nhưng tối đó nguyên tổ tự động kéo chiếu nhích lại nằm sát bên cạnh {me}.']},
  {t:'Đứng im trong hàng',s:'+co:x_ti_yeu',L:['Thằng Tí bị Sẹo nắm cổ áo lôi xềnh xệch đi.',{bg:'den'},'Màn đen. Tiếng cửa lồng sắt chuồng cọp sập lại. Tiếng dùi cui điện nổ lách tách trong đêm.',{bg:'x2-phong-may'},'Sáng hôm sau chỗ ngồi của Tí ở phòng máy bỏ trống. Tới trưa nó mới lết về, bàn tay quấn băng trắng xóa.']}],q:'Sẹo đang tới.',timer:7,mac:1},
 {bg:''}]);
/* ---------- cảnh 5: cuộc gọi về nhà (trò chơi lo phần nói) ---------- */
X('x_canh5','Cảnh 5 · cuộc gọi về nhà',[
 {bg:'x2-tang3'},{card:'NGÀY 14 · 12:30\nCUỘC GỌI VỀ NHÀ'},
 ['Chị Bảy','Mỗi tuần được gọi video về nhà hai phút, chị đứng sát sau lưng. Đọc đúng giấy trên bàn: nói "con ổn", rồi kêu gia đình chuyển 3.000 đô tiền chuộc, nghe rõ chưa?'],
 {if:'vao:ngan',L:['Màn hình kết nối. Đầu dây bên kia hiện lên góc tiệm tạp hóa. Cô Thoa vừa thấy gương mặt hốc hác của con liền khựng lại, lén quẹt nước mắt rồi giả bộ hỏi chuyện ăn uống để quản lý đứng sau không nghi.']},
 {if:'!vao:ngan',L:['Màn hình kết nối. Đầu dây bên kia hiện lên hiên nhà bà Sáu. Bà vừa thấy gương mặt hốc hác của Lâm liền khựng lại, lén quẹt nước mắt rồi giả bộ hỏi chuyện ăn uống để quản lý đứng sau không nghi.']},
 ['~','Ráng lựa lời sao cho chữ cái đầu tiên của mỗi câu ghép lại thành địa điểm. Mong sao ở nhà nghe xong nhận ra điểm bất thường.'],
 {game:'goive'},
 {if:'co:x_goi_ok vao:ngan',L:['Chị Bảy bấm ngắt cuộc gọi. Trước khi màn hình tắt phụt, người ở đầu dây bên kia vẫn kịp gật đầu thật khẽ: ở hẻm 47 đã đọc được mật mã.']},
 {if:'co:x_goi_ok !vao:ngan',L:['Chị Bảy bấm ngắt cuộc gọi. Trước khi màn hình tắt phụt, người ở đầu dây bên kia vẫn kịp gật đầu thật khẽ: ở hẻm 47 đã đọc được mật mã.']},
 {if:'!co:x_goi_ok',L:['Hết giờ. Chị Bảy bấm tắt phụp một cái rồi thu lại đt.']},{bg:''}]);
/* ---------- cảnh 6: danh sách ---------- */
X('x_canh6','Cảnh 6 · danh sách',[
 {bg:'x2-phong-ngu'},{card:'NGÀY 16 · 22:40\nDANH SÁCH'},
 'Đêm khuya, Chị Bảy dán tờ thông báo lên cửa phòng ngủ. Hai cái tên trong tổ nằm dưới dòng chữ in đậm: "Thứ Sáu chuyển giao đối tác · Đặc khu Miến Điện."',
 {game:'danhsach'},
 ['~','Thứ Sáu — tức là đêm Ngày 19, chỉ còn đúng 3 ngày nữa. Tụi nó bắt đầu xé lẻ người bán qua Miến Điện rồi, phải hành động trước đêm đó.'],{fx:'+lo:10'},{bg:''}]);
/* ---------- cảnh 7: người trốn hụt ---------- */
X('x_canh7','Cảnh 7 · 2:10 sáng',[
 {bg:'x2-phong-ngu'},{card:'NGÀY 17 · 2:10 SÁNG'},
 'Đang nửa đêm bỗng nghe tiếng chân chạy thình thịch ngoài hành lang, tiếp theo là tiếng ống nước va đập rồi tiếng chó sủa inh ỏi.',
 {if:'!co:x_ti_doi',L:[['~','Thằng Tí! Nó làm liều đu ống nước sau bếp vượt rào thiệt rồi!'],'Đèn pha ngoài sân bật sáng trưng. Cả phòng nhào ra cửa sổ ngó xuống: thằng Sẹo đang nắm tóc lôi xềnh xệch thằng Tí về giữa sân.',
  {chon:[
   {t:'Mở cửa phóng xuống sân cản thằng Sẹo lại',sub:'quản lý nghi tăng mạnh',s:'+nghi:20 +tin_ti +tin_ti +tin_bay',L:['Thấy có người dám lao ra chắn ngang mặt, thằng Sẹo khựng lại vài giây.',['Chị Bảy','Dừng tay lại Sẹo! Ông chủ giao chỉ tiêu cho phòng tao, mày đánh gãy tay nó rồi lấy ai ngồi gõ phím trả nợ cho ông chủ?!'],'Chị Bảy ra lệnh lôi Tí về lồng sắt biệt giam. Lúc lướt ngang qua {me}, bả nghiến răng rít nhẹ một chữ: "Đồ ngu."']},
   {t:'Đứng trên lầu nhìn xuống',s:'+co:x_ti_phat',L:['Không ai dám nhúc nhích. Thằng Tí bị đánh gục rồi lôi thẳng xuống dãy phòng tối.','Sáng hôm sau vô ca, Chị Bảy đứng trên bục lạnh lùng thông báo vụ trốn trại đêm qua để răn đe cả phòng.']}],q:'Tí đang bị lôi về.',timer:7,mac:1}]},
 {if:'co:x_ti_doi',L:['Quay qua giường kế bên: thằng Tí vẫn đang nằm mở mắt thao láo nhìn lên trần, hai tay bấu chặt thành giường sắt.','Đứa liều mạng leo rào đêm qua là người của tổ khác. Tiếng la hét dưới sân im bặt sau vài phút.',['Tí','(thì thào) Em nghe lời anh mà... Em đâu có dám chạy một mình đâu.']]},
 'Sau vụ vượt rào hụt, nguyên trại bị thiết quân luật. Hai đêm kế tiếp lính gác đi tuần dày đặc gấp đôi.',{fx:'+co:x_siet'},{bg:''}]);
/* ---------- ngày 18: khám phòng ---------- */
X('x_khamphong','Ngày 18 · khám phòng',[
 {bg:'x2-phong-ngu'},{card:'NGÀY 18 · 6:05\nKHÁM PHÒNG'},
 {if:'!co:x_may',L:['Đám bảo vệ ập vô lật tung từng tấm nệm. Trong người {me} lúc này hoàn toàn trống không.',['~','Trong người không giấu đồ cấm. Đợt kiểm tra này qua thoát.']]},
 {if:'co:x_may',L:['Cánh cửa sắt bị đạp tung. Thằng Sẹo dẫn theo 2 tên bảo vệ xông vô, lật tung từng cái chiếu cái nệm lên xét.',['~','Chết rồi, cái đt đang nằm trong túi! Còn có mấy giây trước khi Sẹo bước tới!'],
  {chon:[
   {t:'Nhét đại vô ruột gối',L:['Thằng Sẹo cầm dao rạch toạc cái ruột gối. Cái đt văng lộp cộp xuống nền gạch.',['Sẹo','Điện thoại của đứa nào?! Bước ra!'],{fx:'-co:x_may +nghi:25'}]},
   {t:'Chạy ù vô buồng tắm dán lại dưới đáy thùng nước',L:['Sẹo rạch gối, lật tung mấy tấm nệm không thấy gì, chửi thề vài câu rồi kéo đám bảo vệ đi ra. Cái máy dưới đáy thùng nước vẫn còn nguyên.']},
   {t:'Nhét lẹ qua tay người đứng kế bên nhờ giữ giùm',sub:'cần người đó tin mình',L:[{if:'tin_nhi>=3|tin_thuy>=3',L:['Bàn tay người kế bên chụp lẹ cái máy nhét thẳng vô trong áo ngực. Thằng Sẹo đi lướt qua, không dám thò tay khám.']},{if:'tin_nhi<3 tin_thuy<3',L:['Người kế bên sợ xanh mặt, đẩy ngược cái đt trả lại. Đúng lúc thằng Sẹo quay qua thấy trọn.',['Sẹo','Giấu điện thoại hả?! Của đứa nào?!'],{fx:'-co:x_may +nghi:25'}]}]}],q:'Giấu ở đâu?',timer:6,mac:0}]},
 {bg:''}]);
/* ---------- ngày 18: Tú tới ---------- */
X('x_tutai','Ngày 18 · có khách',[
 {bg:'x2-san-diemdanh'},{card:'NGÀY 18 · 15:00\nCÓ KHÁCH'},
 'Một chiếc 7 chỗ chạy thẳng vô sân trại. Gã đàn ông đội nón kết, đeo túi chéo bước xuống xe — là Đặng Minh Tú.',
 ['Tú','Nghe báo trong trại mới lọt vô mấy con chuột hả?'],
 {bg:'x2-phong-may'},'Tú thong thả đi dọc giữa các dãy bàn máy tính, rồi dừng chân đứng ngay sau lưng ghế của {me}.',
 {if:'vai:lam',L:[['Tú','Ủa... Thằng Lâm?'],['Tú','Mày mò vô tận cái trại này làm gì? Tính nằm vùng viết bài bóc phốt nữa hả Lâm?'],'Nguyên phòng máy nín thở. Chị Bảy đứng khoanh tay chặn ngay cửa ra vào.',
  {chon:[
   {t:'"Ở bển hết cửa sống rồi thì qua đây cày trả nợ thôi. Anh nói có cầu có cung mà."',sub:'giả làm người đã gục',L:[['Tú','Haha, biết thời thế vậy là ngoan. Ngồi gõ cho đủ chỉ tiêu đi mày.'],'Tú vỗ vai Lâm cái bốp rồi quay lưng đi ra sân, vừa đi vừa bấm đt gọi: "Dạ con nghe nè má. Dưới này êm hết rồi, hổng có biến gì đâu má."',['~','"Dạ má"? Ở trên đầu ông Tú thiệt sự là má ruột của ổng!'],{fx:'+cc:x_tu'}]},
   {t:'"Tôi qua đây để đưa những người anh lừa về nhà."',L:[['Tú','Mày hết thuốc chữa rồi Lâm ơi.'],'Tú ngoắc Chị Bảy dặn: "Để mắt kỹ tới thằng này." Xong ổng rút đt bấm gọi liền: "Má ơi, dưới trại có biến rồi."',{fx:'+nghi:30 +cc:x_tu'}]}],q:'Anh Tú đứng sau lưng',timer:8,mac:0}]},
 {if:'vai:ngan',L:[['Tú','Ủa con mèo nhỏ. Thoát về bển rồi sao nay lại tự chui đầu vô rọ vậy em?'],['Ngân','Về bển mang tiếng lừa đảo sống cũng đâu yên, em hết đường rồi mới mò qua lại.'],['Tú','Biết thân biết phận vậy thì tốt. Ngồi vô máy làm việc đi.'],'Tú quay lưng bước ra sân, móc đt bấm gọi: "Dạ má ơi, con mèo nó tự mò về chuồng rồi nè."',{fx:'+cc:x_tu +nghi:10'}]},
 {bg:''}]);

/* ---------- đi đêm: kết quả ---------- */
X('x_dd_may','Đi đêm',[['~','Mò dưới đáy thùng nước buồng tắm gỡ ra được cái đt cũ bọc kín trong túi nilon chống nước, nối sợi dây đồng nhỏ câu trộm nguồn sạc từ hộp điện bình nước nóng. Bật nguồn vẫn bắt được sóng Wifi từ phòng máy tầng trệt.'],['~','Nhắn tin ra ngoài bắt buộc phải ngụy trang thành tin rác, ghép chữ đầu câu. Nhắn thẳng là bộ phận kiểm duyệt mạng của trại chặn liền.'],{fx:'+co:x_may'}]);
X('x_dd_tuan0','Đi đêm',[['~','Canh đồng hồ thấy lính tầng trệt đi hết một vòng mất đúng 6 phút. Tới 3h sáng thì bỏ chốt đi lên lầu 2 giao ca.'],{fx:'+co:x_tuan0'}]);
X('x_dd_tuan3','Đi đêm',[['~','Trên lầu 3: kho nằm bên trái, văn phòng nằm bên phải. Đúng 3h sáng lính gác lầu 3 đi xuống giao ca, cầu thang hoàn toàn trống trải được 2 phút.'],{fx:'+co:x_tuan3 +co:x_sodo3'}]);
X('x_dd_kim','Đi đêm',[['~','Mò lên nóc tủ chén trong bếp lấy được cây kìm cộng lực nặng trịch, đem về giấu kỹ dưới gầm giường sắt.'],{fx:'+co:x_kim'}]);
X('x_dd_rao','Đi đêm',[['~','Lén bấm đứt mắt lưới kẽm gai sau bếp vừa đủ một người chui lọt, xong kéo gá lại như cũ để ban ngày nhìn xa không lộ.'],{fx:'+co:x_rao'}]);
X('x_dd_cua','Đi đêm',[['~','Lấy chìa mở sẵn ổ khóa ngoài của cửa hậu, chỉ gài hờ cái chốt bên trong. Đêm rút quân chỉ việc kéo chốt là phóng ra bờ sông.'],{fx:'+co:x_cua'}]);
X('x_dd_nghe','Đi đêm · nghe lén',[
 'Nép sát ngoài cửa văn phòng lầu 3, nghe tiếng quản lý bên trong đang bật loa ngoài tin nhắn thoại của Ông Chủ Lò.',
 ['Ông Chủ Lò','…tổ con mèo tháng này chạy đủ số trả cho tụi chủ sòng chưa? Đứa nào hết xài được thì gom lại, thứ Sáu này xe của đối tác bên Miến Điện qua hốt. Thằng Tú gây họa một đống rồi giờ cái gì cũng tới tay má gánh. Tin để lâu là thiu.'],
 'Đoạn cuối tin thoại, phần mềm giả giọng đàn ông bị ngắt khoảng 2 giây, để lộ giọng thật khàn đặc và mỏi mệt của một phụ nữ lớn tuổi: "…cả đời má phải đi dọn hậu quả cho mày đó Tú ơi."',
 ['~','Giọng phụ nữ lớn tuổi, gọi Tú là "thằng Tú", xưng "má". Kẻ cầm đầu cả ba khu trại đã lộ diện.'],
 {fx:'+cc:x_giongthat +cc:x_giong +co:x_nghe_len'}]);
X('x_dd_bat','Đi đêm',['Ánh đèn pin quét trúng mặt. {me} bị bảo vệ bẻ quặt tay giải về phòng.',['Sẹo','Còn để tao bắt gặp mày rình mò ban đêm một lần nữa là xuống chuồng chó nằm nghen.']]);
X('x_phongtoi','Phòng tối',[{bg:'x2-phong-toi'},{card:'CHUỒNG CHÓ'},'Sẹo áp giải {me} xuống cái lồng sắt biệt giam dưới gầm cầu thang. Cửa sắt khóa sập lại, chỉ vừa đủ chỗ ngồi bó gối trong bóng tối.','Tới ngày được thả ra, {me} mới bàng hoàng hay tin: trong mấy ngày mình bị nhốt, một người trong tổ đã bị đem bán đi khu khác.',{bg:''}]);

/* ---------- lục soát lầu ba (dùng khung lục soát của Phần 1) ---------- */
X('soat_xvp','Lục văn phòng lầu ba',['Tranh thủ giờ ăn trưa lầu 3 vắng tanh, dùng chìa khóa lẻn vô văn phòng. Chỉ có đúng 3 phút lục soát trước khi lính gác quay lại.']);
X('soat_xvp_ngan','Lục văn phòng',['Trong hộc bàn có cuốn sổ bìa đen ghi chỉ tiêu từng tổ. Cột cuối cùng ghi "nộp lên", ký tắt chữ "B." và đóng mộc đỏ của Công ty Phát Đạt TN.',{fx:'+cc:x_so'}]);
X('soat_xvp_tu','Lục văn phòng',['Trong két sắt có xấp sao kê chuyển tiền mỗi tối Chủ nhật về Quận 7, kẹp chung với hợp đồng thuê mặt bằng "Văn phòng số 12 · Hẻm 47 Fan Xích Vô" và danh sách con nợ app.',{fx:'+cc:x_vi'}]);
X('soat_xvp_cam','Lục văn phòng',['Màn hình chia 4 góc camera. Ngay mép dưới màn hình có dán tờ giấy ghi chi tiết giờ đổi ca của lính gác từng tầng.',{fx:'+cc:x_lich +co:x_tuan3'}]);
X('soat_xvp_rac','Lục văn phòng',['Trong sọt rác toàn giấy nháp kịch bản lừa đảo, lẫn một tờ lệnh "Chuyển giao đối tác đợt 3 · Đặc khu Miến Điện · Thứ Sáu" còn bỏ trống chỗ điền tên.']);
X('soat_xvp_dt','Lục văn phòng',['Trên bàn có cái đt bàn. Bấm coi lịch sử cuộc gọi thấy số liên lạc gần nhất lưu tên "Má" — đầu số cố định ở Sài Gòn.',{fx:'+co:x_so_ma'}]);

/* ---------- tin giấu chữ: gửi ra, tin rác trả lời ---------- */
X('x_tinvao','Tin rác',['Nửa đêm, cái đt giấu trong người rung nhẹ một cái. Có tin nhắn quảng cáo gửi vô.',{game:'tinvao'}]);
X('x_tinvao_ok','Tin rác',[['~','Ghép chữ đầu ra chữ O - K. Vậy là ở ngoài đã giải mã được tin của mình rồi!'],{if:'nhanh:B tin_ngan>=3 !co:x_ngan_lich',L:[['Ngân','Anh gửi tin lọt ra ngoài thiệt rồi hả?'],['Ngân','Vậy cầm luôn tờ giấy này đi. Lịch đổi ca của bảo vệ nguyên trại đó, tui ráng nhìn trộm từ bàn của Chị Bảy rồi chép lại.'],{fx:'+tin_ngan +cc:x_lich +co:x_tuan0 +co:x_tuan3 +co:x_ngan_lich'}]}]);

/* ---------- nhánh A: người bên ngoài ---------- */
X('x_ngoai1','Bờ bên này',[{bg:'x2-bo-ben-nay'},'Bờ sông bên này. {ban} ngồi thu lu trên mũi ghe của ông Thoại ngó qua bên kia sông. Đèn pha trên chòi canh quét đều đặn cứ 40 giây một vòng.','Lầu 2 bên kia sông có một ô cửa sổ còn sáng đèn. Còn ở đầu hẻm 47 giờ này, chắc chiếc điện thoại ốp mèo đen trong ngăn kéo cô Thoa vẫn đang sáng đèn sạc xanh.',{bg:''}]);
X('x_ngoai2','Bờ bên này',[{bg:'x2-bo-ben-nay'},'Đt reo. Hương gọi tới, giọng hối hả.',['Hương','Người của tôi bên kia xác nhận đúng tọa độ khu casino đó rồi! Giờ đại úy Vinh chỉ còn đợi tin báo giờ G từ bên trong gửi ra là chốt lệnh thôi.'],'{ban} nhìn đăm đăm qua bên kia bờ sông. Giờ tất cả phụ thuộc vào tin nhắn báo giờ giao ca từ trong trại.',{bg:''}]);
X('x_ngoai3','Bờ bên này',[{bg:'x2-bo-ben-nay'},'Đêm xuống. {ban} ngồi bấm đồng hồ đếm từng lượt đèn pha quét qua mặt nước. Đúng 40 giây một lần.','Tin nhắn rác cuối cùng {ban} soạn gửi vô trại: "Sale lớn lúc 2 giờ sáng. Ở nhà cũng nhận được quà. Nhớ kiểm đủ số lượng." (Đèn hiệu chờ sẵn lúc 2h sáng ngoài sông).',{bg:''}]);

/* =====================================================================
   HỒI 3
   ===================================================================== */
X('x_ngay19','Ngày 19 · đêm mai',[
 {bg:'x2-phong-ngu'},{card:'NGÀY 19\nĐÊM MAI'},
 'Đêm áp chót. {me} nằm ngửa trên giường sắt, nhẩm kiểm tra lại từng khâu chuẩn bị trong đầu.',
 {if:'nhanh:A|co:x_tin_song|co:x_goi_ok',L:[['~','Báo tọa độ trại ra ngoài: Xong.']]},{if:'nhanh:B !co:x_tin_song !co:x_goi_ok',L:[['~','Báo tọa độ trại ra ngoài: Vẫn chưa gửi được.']]},
 {if:'co:x_tin_3g',L:[['~','Báo giờ G giao ca ra ngoài: Xong.']]},{if:'!co:x_tin_3g',L:[['~','Báo giờ G giao ca ra ngoài: Chưa báo được.']]},
 {if:'co:x_cua|co:x_rao',L:[['~','Đường mở khóa thoát ra bờ sông: Đã thông.']]},{if:'!co:x_cua !co:x_rao',L:[['~','Đường thoát ra bờ sông: Chưa mở được, chỉ còn nước liều mạng chạy cổng chính.']]},
 {if:'co:x_ghe',L:[['~','Ghe đón ngoài bờ sông: Đã dặn sẵn.']]},{if:'!co:x_ghe',L:[['~','Chưa thuê được ghe. Có chạy thoát ra tới bờ sông cũng phải tự bơi hoặc nằm chờ.']]},
 {if:'nhanh:B tin_ngan>=4',L:[['Ngân','Đêm mai tổ mình thoát ra đợt đầu. Để tui đi đoạn hậu khóa đuôi cho.']]},
 {if:'nhanh:B tin_ngan<4',L:['Ngân đi lướt ngang đầu giường, mặt lạnh tanh. Tới giờ phút cuối cô ấy sẽ chọn đi hướng nào, {me} vẫn không đoán được.']},
 {if:'vao:lam',L:['Cái đt giấu trong người rung nhẹ. Tin nhắn của Ngân từ bờ sông bên kia gửi vô.',['Ngân','Sale lớn lúc 2 giờ sáng. Ở nhà cũng nhận được quà. Nhớ kiểm đủ số lượng.']]},
 {bg:''}]);
X('x_cuu_mo','Đêm giải cứu',[
 {bg:'x2-bo-song-dem'},{card:'NGÀY 20 · 1:00 SÁNG\nMƯA. MẤT ĐIỆN.'},
 {if:'nhanh:A',L:['Bờ bên này, {ban} ngồi trên mũi ghe cùng với Hương, căng mắt nhìn ánh đèn pin chớp tắt bên kia sông, miệng nhẩm đếm từng bóng người.']},
 'Máy phát điện của trại phụt tắt. Nguyên khu nhà chìm vô bóng tối, tiếng mưa rào rạt trên mái tôn che lấp hết tiếng bước chân chạy.',
 ['~','Đếm kỹ từng người một. Dắt nhau bám sát bờ tường, hễ thấy ánh đèn pin quét tới là nằm rạp xuống liền.'],
 {if:'!co:x_tin_3g',L:[['~','Chưa báo được giờ G ra ngoài nên sẽ không có công an ập vô tiếp ứng. Đêm nay sống chết chỉ trông cậy vô chiếc ghe chờ ngoài sông.']]},
 {bg:''}]);
/* ĐÃ DUYỆT (tác giả gửi 29/10): cảnh trước cắt điện 00:55, chỉ chạy khi ocl() >= 3 */
X('x_cuu_loa','Đêm giải cứu · 00:55',[
 {bg:'x2-bo-song-dem'},{card:'NGÀY 20 · 00:55 SÁNG\nTRƯỚC GIỜ CẮT ĐIỆN'},
 'Ngay trước giờ cắt điện, tiếng giày đinh của Sẹo bỗng nện rầm rập lên cầu thang lầu 2. Chiếc bộ đàm công suất lớn trên tay hắn bật loa ngoài rè rè.',
 ['Bà Mỹ','Thằng Sẹo nghe rõ đây: ví tổng ở Sài Gòn vừa báo động có đứa chạm vô sổ sách lầu 3. Khóa chết cửa sắt lầu 2 lại, lôi hết tổ 3 ra sân cho tao! Đứa nào tự bước ra chỉ điểm, tao xóa nợ cho về!'],
 'Trong phòng ngủ tối om, có tiếng thở dốc. Anh Toàn ngồi bật dậy định mở miệng kêu lên. Chỉ còn 8 giây trước khi Sẹo bước tới khóa chốt cửa sắt bên ngoài!',
 {chon:[
  {t:'Bật đoạn ghi âm bà Mỹ đòi "bán sạch lầu 3 qua Miến Điện", dí sát khe cửa cho Sẹo nghe',sub:'cần ghi âm giọng thật',dis:'cc:x_giongthat',s:'+co:x_loa_chay',L:[
    'Từ trong bóng tối, {me} mở tối đa âm lượng chiếc máy giấu. Giọng thật khàn đặc của bà Mỹ vang vọng ra hành lang: "…thứ Sáu này xe bên Miến qua hốt, tống luôn đám quản lý biết nhiều qua bển cho sạch dấu vết, tiền tháng này giữ lại đừng nộp cho chủ sòng!"',
    ['Sẹo','Con già bên Sài Gòn tính nuốt tiền của ông chủ rồi bán đứng tụi tao luôn hả?!'],
    'Sẹo quay ngoắt đầu chạy thốc lên văn phòng lầu 3 để tra hỏi Chị Bảy và kiểm tra két sắt. Lính gác tầng trệt và lầu 2 rối loạn bỏ chốt chạy lên cãi nhau. Đúng lúc đó, máy phát điện phụt tắt!']},
  {t:'Phóng ra đập vỡ hộp cầu chì hành lang để cắt điện sớm',sub:'ồn, dễ bị nghi',s:'+nghi:10',L:[
    '{me} lao ra giật đứt dây hộp cầu chì ngay đầu cầu thang. Tia lửa điện nổ bụp một tiếng xanh lè, cả dãy hành lang chìm vào bóng tối đặc quánh trước khi Sẹo kịp khóa cửa.']},
  {t:'Đợi Chị Bảy bước ra chặn Sẹo ở đầu cầu thang',sub:'cần Chị Bảy đã tin mình',dis:'tin_bay>=3',s:'+co:x_bay_chan_ready',L:[
    'Bóng Chị Bảy từ cầu thang lầu 3 bước xuống chắn ngang mặt Sẹo, giơ chùm chìa khóa lên.',
    ['Chị Bảy','Tổ 3 tao mới điểm danh xong, đứa lục sổ sách vừa nhảy xuống khu nhà bếp kìa! Dẫn người xuống trệt lẹ đi!'],
    'Sẹo kéo quân chạy ngược xuống nhà bếp. Máy phát điện phụt tắt.']}
 ],q:'8 giây trước khi Sẹo khóa chốt cửa sắt',timer:8,mac:1}]);
/* ĐÃ DUYỆT: Chị Bảy ở lại chặn cửa (chạy khi olai==='Chị Bảy' và co:x_bay_lat) */
X('x_bay_chan','Chị Bảy ở lại',[
 {bg:'x2-bo-song-dem'},
 '4:30 sáng. Tiếng chó nghiệp vụ và ánh đèn pin của đám Sẹo đã quét tới đầu hành lang sau bếp. Chị Bảy bất ngờ đẩy mạnh {me} vọt qua bên kia cánh cửa sắt, rồi tự mình bước lùi lại vào bóng tối bên trong, kéo sầm cửa lại.',
 'Qua khe song sắt, bàn tay Chị Bảy vặn chặt chốt khóa từ phía trong. Tay áo dài xắn cao lộ rõ vết sẹo cắt cổ tay năm xưa dưới ánh đèn pha chớp nhoáng.',
 ['Chị Bảy','Đừng có đứng đó ngó! Ba năm trước chị bước hụt chân vô cái ổ này, hai bàn tay nhúng chàm hết đường về rồi. Chị khóa chết cái cửa này cầm chân tụi nó cho tụi bây năm phút. Chạy ra sông đi!'],
 ['Chị Bảy','Về tới đường Fan Xích Vô… bữa nào đi ngang tiệm chú Tám, đứng lại nghe giùm chị một câu cải lương là được rồi. Đi lẹ đi!'],
 ['~','Tiếng bước chân rầm rập ập tới bên kia cánh cửa sắt, tiếp theo là tiếng Chị Bảy cố tình la lớn chỉ trỏ ngược về hướng cổng chính để đánh lạc hướng đám Sẹo. {me} cắn chặt môi, quay đầu lao thẳng ra bãi lau bờ sông.'],
 {bg:''}]);
X('x_ban_dung','Bị bán đứng',[{bg:'x2-cong-sat'},'Mới 11h đêm, mấy chiếc xe tải bỗng lùi thẳng vô sân trại. Đèn pha bật sáng trưng, bảo vệ cầm dùi cui đập cửa từng phòng lùa hết người ra xe.','Kế hoạch đã bị lộ từ trước. Tụi chủ lò cho di tản nguyên trại ngay trước giờ công an ập vô.',{bg:''}]);
