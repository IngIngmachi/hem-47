/* Hẻm 47 · Phần 2 — lời thoại trong trại (Hồi 2) và đêm cuối (Hồi 3).
   {me} = tên người đang chơi, {ban} = người còn lại (nhánh A). */
'use strict';

/* =====================================================================
   VÀO TRẠI · NGÀY 8
   ===================================================================== */
X('x_canh1','Cảnh 1 · đường mòn',[
 {bg:'x2-xe-dem'},{card:'NGÀY 8 · 3:58 SÁNG\nĐƯỜNG MÒN SÁT BIÊN GIỚI'},
 'Xe 16 chỗ chạy không đèn. Tới bãi mía thì đổi qua xe tải bít bùng. Rồi xuống đi bộ, một hàng dọc, không ai được nói.',
 'Ở đầu kia con đường mòn có hai người đàn ông cầm đèn pin. Một người có vết sẹo chạy dài từ thái dương xuống cằm.',
 ['Sẹo','Điện thoại, căn cước, tiền. Bỏ hết vô thùng.'],
 {chon:[
  {t:'Đứng yên, nhìn xuống đất',s:'+co:x_giu',L:['Bàn tay khám qua người, dừng ở túi quần một giây, rồi đi tiếp.']},
  {t:'Lén chuyển món đồ qua chỗ khác',s:'+nghi:10',L:['Sẹo chụp lấy cổ tay. Lôi món đồ ra, ném xuống bùn.']},
  {t:'Hỏi: "Anh ơi khi nào được trả lại?"',s:'+co:x_giu',L:[['Sẹo','Trả? Mày làm đủ thì tự mua cái mới.'],'Cả hàng cười. Cái cười của người ở đây đã lâu.']}],q:'Sẹo khám từng người. Tới lượt {me}.',timer:8,mac:0},
 {bg:''}]);
X('x_canh2','Cảnh 2 · cổng sắt',[
 {bg:'x2-cong-sat'},{card:'CỔNG SẮT'},
 'Cổng sắt đóng lại sau lưng. Tường cao, trên đầu tường là kẽm gai. Bên kia tường nghe tiếng nước chảy.',
 'Một phòng nhỏ. Bàn nhựa. Một tờ giấy in sẵn: "Giấy nhận nợ: tiền vé xe, tiền ăn ở, tiền đào tạo. Tổng: 3.200 USD."',
 ['Chị Bảy','Ký đi em. Ai cũng ký. Làm đủ thì trừ dần, sáu tháng là hết.'],
 ['~','Người Việt. Tay áo dài che kín cổ tay, dù trời nóng.'],
 {chon:[
  {t:'Ký',sub:'qua được hôm nay',L:[['Chị Bảy','Ngoan. Lên lầu hai, phòng ngủ tổ 3.']]},
  {t:'Không ký',sub:'đêm đầu ở phòng tối',s:'+nghi:15 +tin_nhi +tin_thuy +tin_toan',L:[['Chị Bảy','...Em muốn vậy thì vậy.'],{bg:'x2-phong-toi'},'Đêm đầu ở phòng tối. Không đèn, không cửa sổ, một chai nước.','Sáng ra, lúc được thả về phòng, có vài người trong tổ nhìn {me} lâu hơn những người khác.']}],q:'Tờ giấy nợ'},
 {if:'vao:ngan',L:[['Chị Bảy','Khoan. Em... ngẩng mặt lên chị coi.'],'Chị Bảy nhìn Ngân rất lâu. Rồi quay đi, không nói gì.',['~','Chị nhận ra mình. Chị chưa nói. Chưa.'],{fx:'+nghi:25'}]},
 {fx:'+cc:x_no ds:build'},
 {bg:'x2-phong-ngu'},'Tối. Phòng ngủ tổ 3. Ba dãy giường tầng, một bóng đèn vàng. Không ai hỏi tên ai.',
 ['~','Ngày mai bắt đầu. Bảy giờ sáng vô ca, mười hai giờ ăn trưa, một giờ vô ca chiều, bảy giờ tối được ra sân. Mười giờ tắt đèn.'],
 {bg:''}]);

/* =====================================================================
   CA LÀM · PHÒNG MÁY
   ===================================================================== */
X('x_ca_mo','Ca sáng',[
 {if:'ngay<9|!co:x_ca1',L:[
  {bg:'x2-phong-may'},{card:'NGÀY 9 · 7:00\nPHÒNG MÁY'},
  'Ba dãy bàn, mỗi dãy mười máy. Dây điện bò dưới chân như rễ cây. Trên tường có cái chuông đồng và tấm bảng trắng ghi chỉ tiêu.',
  ['Chị Bảy','Mỗi người ba khách một ngày. Kịch bản trong máy. Đứa nào chốt được thì chị rung chuông.'],
  'Mười giờ. Chuông reo. Chị Bảy vỗ tay. Rồi cả phòng vỗ tay theo.',
  {chon:[{t:'Vỗ tay theo',L:['Tiếng vỗ tay nghe như mưa trên mái tôn.']},
   {t:'Ngồi im, nhìn màn hình',s:'+nghi:10 +tin_ngan +co:x_ngoi_im',L:['Chị Bảy nhìn qua. Lâu.','Ở bàn cuối dãy, có một người cũng không vỗ tay.']}],q:'Cả phòng đang vỗ tay.',timer:6,mac:0},
  {fx:'+co:x_ca1'},{bg:''}]}]);
X('x_ca_thieu','Cuối ca',[
 'Bảng chỉ tiêu cuối ngày. Tên {me} có dấu đỏ: thiếu chỉ tiêu.',
 ['Chị Bảy','Thiếu thì nợ cộng thêm. Thiếu hoài thì lên tên ở sân.']]);
X('x_ca_du','Cuối ca',['Bảng chỉ tiêu cuối ngày. Tên {me} đủ ba dấu. Chị Bảy đi ngang, không nhìn.']);

/* =====================================================================
   GẶP NGƯỜI · NHÁNH B
   ===================================================================== */
X('x_thuynhan','Nhà ăn · cô gái vẽ trên bàn',[
 'Giờ cơm trưa. Nhà ăn dài, bàn inox. Một cô gái bưng khay ngang qua, không nhìn {me}.',
 'Cô đặt khay xuống bàn bên cạnh. Lấy đũa vẽ lên mặt bàn ướt một hình gì đó, rồi xóa liền.',
 {chon:[
  {t:'Hình số 3',L:[['~','Số 3. Phòng 3.'],['~','Thủy. Con nhỏ từng ở phòng 3 nhà bà Sáu.'],'Thủy đứng dậy, đi ngang, nói nhỏ mà không quay đầu: "Tối nay. Buồng tắm."'],s:'+co:x_thuy_biet +tin_thuy'},
  {t:'Hình con mèo',L:[['~','Con mèo? Không phải. Mình nhìn lộn rồi.'],'Cô gái bưng khay đi. Đi tới cửa còn quay lại nhìn một cái.'],s:'+co:x_thuy_lo'},
  {t:'Không thấy gì, chắc vô tình',L:[['~','Chắc mình nhìn lộn.']],s:'+co:x_thuy_lo'}],q:'Cô gái vẽ gì?',timer:7,mac:2}]);
X('x_thuylai','Nhà ăn · Thủy',['Cô gái hôm qua lại ngồi bàn bên. Lần này vẽ rõ hơn: số 3.',['~','Thủy. Phòng 3.'],'"Tối nay. Buồng tắm," cô nói không quay đầu.',{fx:'+co:x_thuy_biet +tin_thuy'}]);
X('x_thuygap','Buồng tắm · Thủy',[
 {bg:'x2-buong-tam'},
 'Buồng tắm cuối hành lang. Nước lạnh. Thủy đứng sát vách, nói rất nhỏ.',
 ['Thủy','Anh điên rồi. Anh vô đây làm gì.'],['Lâm','Đưa mọi người về.'],
 ['Thủy','Chị Ngân ở phòng máy 2, bàn cuối. Chị làm tổ trưởng. Mà anh đừng tới gần chỉ.'],
 ['Thủy','Chỉ hổng tin anh. Chỉ nói người viết bài đó thì tới đây cũng để viết bài tiếp.'],
 ['Thủy','Mẹo nè: gặp chữ "chuyển" trong kịch bản thì gõ sai dấu. Chị Ngân dạy. Người tỉnh sẽ thấy lạ.'],
 ['Thủy','Còn cái này nữa. Dưới đáy thùng nước buồng tắm này có dán một cái điện thoại. Của người trốn hụt hồi trước. Hổng biết còn pin hông.'],
 {fx:'+co:x_thuy_chi +co:x_meo_cailoi +co:x_biet_may +tin_thuy'},{bg:''}]);
X('x_nganb1','Nhà ăn · Ngân',[
 'Ngân ngồi một mình cuối bàn. Tóc dài, cột thấp. Ốm hơn tấm ảnh đại diện năm ngoái nhiều.',
 ['~','Mình là người cắt tấm ảnh đó ra để bêu cổ.'],
 {if:'mon:meo co:x_giu',L:['Lâm đặt con mèo vải đen lên mặt bàn, sát khay cơm của Ngân.',['Ngân','...'],['Ngân','Ai đưa anh cái này.'],
   {if:'p1:noi_cuocgoi',L:[['Lâm','Mẹ cô.']]},{if:'!p1:noi_cuocgoi',L:[['Lâm','Bà Sáu giữ. Từ cái vali màu hồng.']]},
   'Ngân cầm con mèo, nắm chặt tới trắng đốt tay. Rồi bỏ vô túi áo.',['Ngân','Tối mai. Buồng tắm.'],{fx:'+tin_ngan +co:x_ngan_nghe'}]},
 {if:'!mon:meo|!co:x_giu',L:[{chon:[
  {t:'"Tạp hóa đầu hẻm 47, cô Thoa vẫn sạc cái máy cũ của cô mỗi ngày."',L:[['Ngân','...'],['Ngân','Mẹ tui còn bán hả.'],['Ngân','Tối mai. Buồng tắm. Anh nói dối một chữ là tui la lên.']],s:'+tin_ngan +co:x_ngan_nghe'},
  {t:'"Tôi là Lâm. Tôi tới để đưa cô về."',L:[['Ngân','Anh đưa tui đi một lần rồi.'],'Ngân bưng khay đứng dậy.']},
  {t:'Ngồi xuống, không nói gì',L:['Ngân ăn hết chén cơm, không nhìn qua một lần.']}],q:'Nói gì với Ngân?'}]}]);
X('x_nganb3','Buồng tắm · Ngân',[
 {bg:'x2-buong-tam'},
 ['Ngân','Đêm 30 tháng 3. Anh gọi cho tui lúc chín giờ mười lăm. Tui nói tiền nằm ở tài khoản con Phương. Tui xin anh một ngày.'],
 ['Ngân','Anh nhớ không.'],
 {if:'p1:noi_cuocgoi|p1:lam_nho',L:[['Lâm','Nhớ. Ba phút mười hai giây. Rồi tôi gọi anh Tú, rồi tôi đăng. Cô gọi lại năm lần, tôi úp máy.'],['Lâm','Tôi nói chuyện này với mẹ cô rồi. Giờ tôi nói với cô.'],'Ngân im rất lâu. Nước nhỏ giọt từ vòi.',['Ngân','Vậy anh ở lại tới cuối. Đừng có đi trước.'],{fx:'+tin_ngan'}]},
 {if:'!p1:noi_cuocgoi !p1:lam_nho',L:[{chon:[
  {t:'"Nhớ. Tôi nghe hết. Rồi tôi vẫn đăng."',sub:'nói thật',s:'+tin_ngan',L:[['Lâm','Tôi nghe cô khóc. Tôi gọi anh Tú, ổng nói con nhỏ khóc thì kệ nó. Tôi đăng. Cô gọi lại năm lần. Tôi úp máy.'],'Ngân đấm vô vách tường một cái. Rồi đứng thở.',['Ngân','Lần đầu có người nói câu đó với tui. Được. Anh ở lại tới cuối.']]},
  {t:'"Tôi không nhớ rõ. Hồi đó gấp quá."',sub:'né',s:'-tin_ngan',L:[['Ngân','Anh vẫn vậy.'],'Ngân đi ra. Cửa buồng tắm đóng lại rất nhẹ.']}],q:'Ngân hỏi về đêm 30/3'}]},
 {fx:'+co:x_ngan_b3'},{bg:''}]);
X('x_canhngan','Ngồi cạnh Ngân',['Chị Bảy gật đầu, không hỏi. Chiều nay {me} ngồi bàn sát bàn Ngân.',{fx:'+co:x_canh_ngan'}]);
X('x_canhngan_ok','Ngồi cạnh Ngân',['Ngân liếc qua màn hình bên cạnh. Thấy chữ "chuyễn". Cô nhìn {me} một giây, rồi nhìn lại màn hình mình.',['Ngân','(rất nhỏ) Ai dạy anh cái đó.'],['Lâm','Thủy. Thủy nói cô dạy.'],['Ngân','...'],{fx:'+tin_ngan -co:x_canh_ngan +co:x_canhngan_xong'}]);
X('x_nguoiban','Nhà ăn · người cũ',[
 {if:'p1:bao_tam',L:['Một người đàn ông bưng khay đi ngang, khựng lại. Nhìn Lâm như nhìn ma.',['Tâm','Anh... anh là thằng dò địa chỉ tui rồi đưa cho ông Khoa.']]},
 {if:'!p1:bao_tam',L:['Một thằng nhỏ bưng khay đi ngang, khựng lại.',['Phát','Anh Lâm. Anh gửi chỗ em ở cho ông Khoa. Tụi nó tới rước em hai ngày sau.']]},
 'Cả bàn quay lại. Chị Bảy từ đầu phòng bước tới.',['Chị Bảy','Chuyện gì đó.'],
 {chon:[
  {t:'"Đúng. Tôi làm vậy. Tôi tới đây để trả món đó."',sub:'nói thật trước mặt Chị Bảy',s:'+nghi:10 +co:x_ban_nhan',L:[['Chị Bảy','Trả? Ở đây ai trả được cái gì.'],'Chị Bảy bỏ đi. Người kia ngồi xuống, nhìn Lâm rất lâu.',['~','Anh trả bằng gì, ánh mắt đó hỏi.'],['Lâm','Bằng một đêm. Chưa phải bây giờ.']]},
  {t:'"Anh nhận lộn người rồi."',sub:'chối',L:[['Chị Bảy','Ăn đi. Chuyện bên ngoài để bên ngoài.'],'Hôm nay qua được. Người kia không nói thêm câu nào.']}],q:'Có người đang tố {me}',timer:8,mac:1}]);

/* ---------- nhánh A: gặp tổ cũ ---------- */
X('x_tocu_lam','Nhà ăn · tổ cũ của Ngân',[
 'Giờ cơm. Một cô gái ôm cái balo hồng đi ngang, gõ nhẹ ngón tay lên khay như đang gõ phím. Nhi, trong danh sách Ngân chép ra.',
 ['Lâm','Con mèo mun còn sống.'],
 ['Nhi','...'],['Nhi','Chị Ngân gửi anh hả? Trời ơi.'],
 ['Nhi','Tối nay em nói anh Toàn với chị Huệ. Tí thì để em.'],
 ['Nhi','Còn cái này: dưới đáy thùng nước buồng tắm có dán một cái điện thoại. Hổng ai dám đụng.'],
 {fx:'+tin_nhi +tin_nhi +tin_toan +tin_hue +tin_ti +co:x_to_biet +co:x_biet_may'}]);
X('x_tocu_ngan','Nhà ăn · tổ cũ',[
 'Giờ cơm. Nhi làm rớt cái muỗng khi thấy Ngân. Chị Huệ nắm tay Nhi dưới gầm bàn, bóp mạnh.',
 ['Chị Huệ','Con về rồi mà. Con quay lại chi.'],['Ngân','Con về rước mấy cô.'],['Tí','Chị Ngân... em tưởng chị chết rồi.'],
 ['Nhi','Cái máy dưới thùng nước buồng tắm vẫn còn đó chị. Em hổng dám đụng.'],
 {fx:'+tin_nhi +tin_nhi +tin_hue +tin_hue +tin_ti +tin_ti +tin_toan +co:x_to_biet +co:x_biet_may'}]);

/* ---------- nói chuyện buổi tối (việc phụ) ---------- */
const VX={xnhi:[['Nhi','Bà ngoại em chắc tưởng em đi làm có lương rồi.'],['Nhi','Em gõ "á" cuối câu để chị Ngân biết là em. Chị có nhận được hông?'],['~','Có. Cổ nhận được.']],
 xnhi2:[['Nhi','Anh Toàn mấy bữa nay được thêm trứng. Hổng biết sao.'],['~','Thêm trứng. Ở đây không ai được thêm gì không công.'],{fx:'+co:x_vu3_nhi'}],
 xtoan:[['Toàn','Tui nợ app có ba chục, giờ nợ trại một trăm.'],['Toàn','Tui hổng muốn làm gì để bị đánh nữa đâu. Đừng rủ tui.']],
 xhue:[['Chị Huệ','Con trai chị vay app, tụi nó gọi tới cơ quan nó. Chị đi để nó khỏi mất việc.'],['Chị Huệ','Chị lớn rồi, chạy hổng nổi. Nhưng chị đi chậm được.']],
 xhue2:[['Chị Huệ','Thằng Toàn hay bị gọi lên lầu ba lúc khuya. Về thì mặt tái mét.'],{fx:'+co:x_vu3_hue'}],
 xti:[['Tí','Anh có biết từ đây ra sông bao xa hông? Đêm em nghe tiếng nước.'],['Tí','Em tính rồi. Leo cái ống nước sau bếp…'],['~','Thằng nhỏ đang tính trốn một mình.'],{chon:[{t:'"Đừng. Đợi. Đi chung."',s:'+tin_ti +co:x_ti_doi',L:[['Tí','...Đợi tới chừng nào.'],['Lâm','Tôi sẽ nói em biết.']]},{t:'Không nói gì'}],q:'Tí'}],
 xthuy:[['Thủy','Phòng 3 giờ ai ở vậy anh? Em hay mơ thấy cái cửa sổ nhìn xuống tạp hóa.']],
 xkhang:[['Khang','Anh tui... ổng sao rồi?'],['Khang','Tui hổng giận ổng. Tui chỉ hổng biết nói gì với ổng.']],
 xloc:[['Anh Lộc','Cậu tới đây thiệt hả. Cậu điên còn hơn tui.'],['Anh Lộc','Tui làm bếp. Có cây kìm cắt kẽm, tụi nó để trên nóc tủ. Cần thì nói.'],{fx:'+co:x_biet_kim'}],
 xngan:[['Ngân','Nhi gõ tin hay nhất tổ. Tí chạy nhanh nhất. Chị Huệ đi chậm, phải có người dìu.'],['Ngân','Anh Toàn... ổng sợ. Người sợ thì dễ nói.']]};
const VXT={xnhi:'nhi',xnhi2:'nhi',xtoan:'toan',xhue:'hue',xhue2:'hue',xti:'ti',xthuy:'thuy',xkhang:'khang',xloc:'loc',xngan:'ngan'};
for(const k in VX){ const id=k.replace(/\d$/,''); X('V_'+id+'_'+k+'_x','Nói chuyện',VX[k].concat([{fx:'+tin_'+VXT[k]}]),{h:/2$/.test(k)?'co:x_vu3':''}); }

/* ---------- Chị Bảy: lời khai ---------- */
X('x_bay_goi','Lầu ba · Chị Bảy gọi lên',[
 {bg:'x2-tang3'},
 'Chị Bảy gọi {me} lên lầu ba. Văn phòng có máy lạnh, có tủ sắt, có cái màn hình chia bốn ô camera.',
 ['Chị Bảy','Ngồi. Chị hỏi, em trả lời. Chị không thích nghe nói dối.'],
 ['Chị Bảy','Chị cũng chỉ làm công thôi em. Trên giao sao làm vậy.'],{bg:''}]);
M('KHAI_xbay','khai','Chị Bảy','Chị Bảy: "Chị chỉ làm công"',{sau:'+cc:x_khaibay +co:x_bay_lat +tin_bay +tin_bay +tin_bay'});
M('CAU_xbay_01','cau','KHAI_xbay','Chị chỉ làm công. Tiền đi đâu chị hổng biết.',{sau:'dung:x_so ok:kh_xbay_1 key'});
M('CAU_xbay_02','cau','KHAI_xbay','Ở đây hổng ai bị nhốt. Trả đủ nợ là về.',{sau:'dung:x_no|x_lich ok:kh_xbay_2 hoi:kh_xbay_h2'});
M('CAU_xbay_03','cau','KHAI_xbay','Chị chưa từng gặp ông chủ. Nghe nói là đàn ông.',{sau:'dung:x_giongthat ok:kh_xbay_3 key'});
M('CAU_xbay_04','cau','KHAI_xbay','Chị lên được lầu ba là nhờ chị giỏi.',{sau:'hoi:kh_xbay_h4'});
X('kh_xbay_1','Lời khai',['Chị Bảy nhìn cái cột "nộp lên" có chữ ký "B." của mình. Lâu.',['Chị Bảy','...Em lấy cái này ở đâu.'],['Chị Bảy','Chị ký vì chị phải ký.']]);
X('kh_xbay_2','Lời khai',[['Chị Bảy','Ừ. Nợ thì hổng bao giờ đủ. Chị biết. Chị ký cái giấy đó trước em ba năm.']]);
X('kh_xbay_h2','Lời khai',[['Chị Bảy','Có đứa trả đủ rồi đó. Tụi nó "chuyển công ty đối tác". Em hiểu chữ đó hông.']]);
X('kh_xbay_3','Lời khai',['Giọng đàn bà già trong đoạn ghi âm vang lên giữa phòng. Chị Bảy với tay tắt, tay run.',['Chị Bảy','Bà đó gọi chị là "con Bảy". Bà hổng bao giờ bật hình.'],['~','Bà. Không phải ông.']]);
X('kh_xbay_h4','Lời khai',['Chị Bảy kéo tay áo lên một chút. Rồi kéo xuống.',['Chị Bảy','Ba năm trước chị cũng ngồi phòng máy. Giỏi thì được lên. Lên rồi thì hết đường xuống.']]);
X('khai_xbay_xong','Lời khai',[['Chị Bảy','Đi xuống đi. Chị chưa nghe gì hết. Em cũng chưa nghe gì hết.'],['~','Chị Bảy không ngăn mình nữa. Chưa giúp, nhưng không ngăn.']]);
X('khai_xbay_duoi','Lời khai',[['Chị Bảy','Đủ rồi. Xuống. Mai chị còn thấy em hỏi nữa là em biết.'],{fx:'+nghi:10'}]);
X('x_xinchia','Chìa cửa sau',[['Chị Bảy','Chị hổng đưa. Chị để quên trên bàn lầu ba. Đêm nay.'],'Sáng ra, {me} thấy một chiếc chìa dưới gối.',{fx:'+co:x_chia'}]);

/* ---------- Khang ---------- */
X('x_khang','Khang',[
 {if:'p1:khoa_lat',L:['Một cậu trai gầy nhom đứng gác chân cầu thang lầu ba. Trên áo còn dấu bảng tên đã gỡ.',['Khang','Anh tui nhắn vô cho tui rồi. Tui gác lầu ba được hai tháng, tụi nó tin tui.'],['Khang','Chìa cửa sau với chìa văn phòng, tui đánh thêm một bộ. Anh cầm đi.'],{fx:'+co:x_chia +tin_khang +tin_khang'}]},
 {if:'!p1:khoa_lat',L:['Khu phạt ở dãy trong. Qua khe cửa, {me} thấy một cậu trai ngồi bó gối.',['Khang','Anh là ai.'],['Lâm','Người anh Khoa nhờ.'],['Khang','...Ổng còn nhớ tui hả.'],['Lâm','Đêm đó tôi quay lại rước cậu.'],{fx:'+tin_khang +tin_khang'}]},
 {fx:'+co:x_khang_gap'}]);

/* ---------- vụ 3: ai bán tin ---------- */
X('x_vu3mo','Ai đó báo',['Đêm qua, lính gác lầu hai đi tuần sớm hơn mọi khi đúng hai mươi phút. Đúng lúc {me} tính ra khỏi phòng.',['~','Có người báo. Ai đó trong tổ.'],['~','Ai được ra khỏi phòng lúc khuya? Ai được thêm khẩu phần? Hỏi chuyện mọi người buổi tối.'],{fx:'+co:x_vu3'}]);
X('x_vu3','Tìm người báo tin',[
 ['~','Ai được thêm khẩu phần? Ai bị gọi lên lầu ba lúc khuya?'],
 {if:'co:x_vu3_nhi',L:['Nhi nói: "Anh Toàn mấy bữa nay được thêm trứng."']},
 {if:'co:x_vu3_hue',L:['Chị Huệ nói: "Thằng Toàn hay bị gọi lên lầu ba lúc khuya."']},
 {chon:[
  {t:'Toàn',h:'',s:'+co:x_vu3_xong',L:[{if:'co:x_vu3_nhi|co:x_vu3_hue',L:[['Toàn','Tui... tụi nó nói báo một lần là trừ nợ một tháng.'],['Toàn','Tui xin lỗi. Tui sợ.'],['~','Ai ở đây cũng từng bị bán. Có người bán lại người khác để thở.'],{fx:'-lo:25 -nghi:10 +tin_toan +tin_toan +co:x_vu3_dung'}]},{if:'!co:x_vu3_nhi !co:x_vu3_hue',L:[['Toàn','Anh nói gì vậy. Tui làm gì.'],['~','Không có gì trong tay. Nói ra thì ổng chối, vậy thôi.'],{fx:'-co:x_vu3_xong'}]}]},
  {t:'Chị Bảy',s:'-tin_bay +co:x_vu3_xong',L:[['~','Không phải. Chị Bảy không cần ai báo. Chị có camera.']]},
  {t:'Chưa đủ, để sau'}],q:'Ai báo cho quản lý?'}]);

/* ---------- cảnh 4: bảng tên đỏ ---------- */
X('x_canh4','Cảnh 4 · sân điểm danh',[
 {bg:'x2-san-diemdanh'},{card:'NGÀY 13 · 21:00\nSÂN ĐIỂM DANH'},
 'Loa trên cột điện rè rè. Một giọng đọc tên những người thiếu chỉ tiêu tuần.','"…Phòng 3. Tí."',
 'Sẹo bước ra từ bóng tối, đi thẳng tới chỗ Tí đứng.',
 {chon:[
  {t:'Bước ra: "Phần thiếu của nó là của tôi"',sub:'nhận phạt thay',s:'+co:x_phat_thay +tin_nhi +tin_toan +tin_hue +tin_ti +tin_ti +tin_thuy +tin_ngan +nghi:5',L:['Sẹo dừng lại. Nhìn {me}. Rồi cười.',['Sẹo','Được. Đi.'],{bg:'den'},'Màn đen. Tiếng cửa sắt.',{bg:'x2-phong-ngu'},'Sáng hôm sau, {me} về phòng, bước đi cà nhắc. Không ai hỏi. Nhưng cả tổ dời chỗ ngủ, nằm sát lại.']},
  {t:'Đứng yên',s:'+co:x_ti_yeu',L:['Tí bị dẫn đi.',{bg:'den'},'Màn đen. Tiếng cửa sắt.',{bg:'x2-phong-may'},'Sáng hôm sau, cái ghế của Tí ở phòng máy trống. Tới trưa Tí mới về, tay quấn băng, đi chậm.']}],q:'Sẹo đang tới.',timer:7,mac:1},
 {bg:''}]);
/* ---------- cảnh 5: cuộc gọi về nhà (trò chơi lo phần nói) ---------- */
X('x_canh5','Cảnh 5 · cuộc gọi về nhà',[
 {bg:'x2-tang3'},{card:'NGÀY 14 · 12:30\nCUỘC GỌI VỀ NHÀ'},
 ['Chị Bảy','Mỗi tuần được gọi về nhà một cuộc. Có chị đứng đây. Nói "con khỏe", rồi xin nhà chuyển tiền đóng nợ.'],
 'Màn hình bật lên. Gương mặt ở đầu bên kia hiện ra, sát quá, lấp kín khung hình.',
 ['~','Mỗi câu nói ra, chữ đầu là một chữ. Bên kia có nghe ra hay không thì tùy trời.'],
 {game:'goive'},
 'Cuộc gọi tắt. Chị Bảy cầm điện thoại đi.',{bg:''}]);
/* ---------- cảnh 6: danh sách ---------- */
X('x_canh6','Cảnh 6 · danh sách',[
 {bg:'x2-phong-ngu'},{card:'NGÀY 16 · 22:40\nDANH SÁCH'},
 'Chị Bảy dán một tờ giấy lên cửa phòng ngủ. Hai cái tên. Dòng chữ in: "Chuyển công ty đối tác · thứ Sáu."',
 {game:'danhsach'},
 ['~','Tụi nó đang dọn bớt người. Đêm đó không chờ được nữa.'],{fx:'+lo:10'},{bg:''}]);
/* ---------- cảnh 7: người trốn hụt ---------- */
X('x_canh7','Cảnh 7 · 2:10 sáng',[
 {bg:'x2-phong-ngu'},{card:'NGÀY 17 · 2:10 SÁNG'},
 'Tiếng chân trần chạy trên hành lang. Rồi tiếng ống nước rung. Rồi tiếng chó.',
 {if:'!co:x_ti_doi',L:[['~','Tí. Thằng nhỏ leo cái ống nước sau bếp.'],'Đèn pha bật. Tiếng la. Ở cửa sổ, cả phòng đứng nhìn xuống sân: Sẹo đang lôi Tí về.',
  {chon:[
   {t:'Chạy xuống chặn Sẹo',sub:'quản lý nghi tăng mạnh',s:'+nghi:20 +tin_ti +tin_ti +tin_bay',L:['Sẹo dừng lại vì có người đứng chắn giữa sân. Một giây. Hai giây.',['Chị Bảy','Thôi! Nó còn nợ, đánh hư thì ai trả.'],'Chị Bảy kéo Tí về dãy trong. Lúc đi ngang, chị nói rất nhỏ: "Ngu."']},
   {t:'Đứng nhìn',s:'+co:x_ti_phat',L:['Không ai xuống. Không ai nói gì. Tí bị đưa về dãy trong.','Sáng ra, Chị Bảy đứng giữa phòng máy kể lại chuyện đêm qua bằng giọng đều đều, như đọc kịch bản.']}],q:'Tí đang bị lôi về.',timer:7,mac:1}]},
 {if:'co:x_ti_doi',L:['Không phải Tí. Tí nằm giường dưới, mắt mở trong bóng tối, tay nắm thành giường.','Người chạy là một cậu ở tổ khác. Đèn pha bật. Tiếng la. Rồi im.',['Tí','(thì thào) Em đợi. Em đợi mà.']]},
 'Trại siết lại. Hai đêm tới, tuần tra gấp đôi.',{fx:'+co:x_siet'},{bg:''}]);
/* ---------- ngày 18: khám phòng ---------- */
X('x_khamphong','Ngày 18 · khám phòng',[
 {bg:'x2-phong-ngu'},{card:'NGÀY 18 · 6:05\nKHÁM PHÒNG'},
 {if:'!co:x_may',L:['Lính gác lật từng cái nệm. {me} không có gì để giấu.',['~','Lần này nghèo lại hay.']]},
 {if:'co:x_may',L:['Cửa phòng đập mạnh. Sẹo với hai lính gác đi vô, lật từng cái nệm.',['~','Cái điện thoại. Còn mấy giây.'],
  {chon:[
   {t:'Nhét vô ruột gối',L:['Sẹo xé ruột gối. Cái điện thoại rớt xuống sàn.',['Sẹo','Của đứa nào.'],{fx:'-co:x_may +nghi:25'}]},
   {t:'Dán dưới đáy thùng nước buồng tắm',L:['Sẹo lật ruột gối, xé nệm, chửi thề. Rồi đi ra. Điện thoại còn.']},
   {t:'Đưa cho người bên cạnh giữ',sub:'cần người đó tin mình',L:[{if:'tin_nhi>=3|tin_thuy>=3',L:['Một bàn tay giật lấy cái máy, nhét vô áo ngực. Sẹo đi qua, không dám khám.']},{if:'tin_nhi<3 tin_thuy<3',L:['Người kia lắc đầu, đẩy cái máy lại. Sẹo thấy.',['Sẹo','Của đứa nào.'],{fx:'-co:x_may +nghi:25'}]}]}],q:'Giấu ở đâu?',timer:6,mac:0}]},
 {bg:''}]);
/* ---------- ngày 18: Tú tới ---------- */
X('x_tutai','Ngày 18 · có khách',[
 {bg:'x2-san-diemdanh'},{card:'NGÀY 18 · 15:00\nCÓ KHÁCH'},
 'Một chiếc xe bảy chỗ chạy vô sân. Người bước xuống đội nón lưỡi trai, đeo túi bao tử. Anh Tú.',
 ['Tú','Nghe nói có chuột.'],
 {bg:'x2-phong-may'},'Ổng đi dọc dãy bàn phòng máy, dừng lại sau lưng {me}.',
 {if:'vai:lam',L:[['Tú','Ủa. Lâm.'],['Tú','Mày qua đây làm gì? Viết bài hả mày?'],'Cả phòng im. Chị Bảy đứng ở cửa.',
  {chon:[
   {t:'"Tôi qua đây trả nợ. Như anh nói: có cầu có cung."',sub:'giả làm người đã gục',L:[['Tú','Ha. Biết điều. Làm đi. Làm cho đủ.'],'Tú bỏ đi, vừa đi vừa gọi điện: "Dạ má. Hổng có gì đâu má."',['~','"Dạ má."'],{fx:'+cc:x_tu'}]},
   {t:'"Tôi qua đưa người ta về."',L:[['Tú','Mày điên thiệt rồi.'],'Tú quay qua Chị Bảy: "Canh nó." Rồi vừa đi vừa gọi: "Má. Có chuyện."',{fx:'+nghi:30 +cc:x_tu'}]}],q:'Anh Tú đứng sau lưng',timer:8,mac:0}]},
 {if:'vai:ngan',L:[['Tú','Con mèo. Mày quay lại hả.'],['Ngân','Em hết đường rồi anh.'],['Tú','Biết vậy là được. Làm đi.'],'Tú bỏ đi, vừa đi vừa gọi điện: "Dạ má. Con mèo về rồi."',{fx:'+cc:x_tu +nghi:10'}]},
 {bg:''}]);

/* ---------- đi đêm: kết quả ---------- */
X('x_dd_may','Đi đêm',[['~','Một cái điện thoại cũ dán băng keo dưới đáy thùng nước. Có pin. Có Za Lô.'],['~','Gửi tin ra phải giấu chữ. Quản lý đọc lướt mọi tin.'],{fx:'+co:x_may'}]);
X('x_dd_tuan0','Đi đêm',[['~','Lính trệt đi một vòng mất sáu phút. Lên lầu hai lúc ba giờ để giao ca.'],{fx:'+co:x_tuan0'}]);
X('x_dd_tuan3','Đi đêm',[['~','Lầu ba: kho bên trái, văn phòng bên phải. Lính lầu ba xuống giao ca lúc ba giờ, cầu thang trống hai phút.'],{fx:'+co:x_tuan3 +co:x_sodo3'}]);
X('x_dd_kim','Đi đêm',[['~','Cây kìm cắt kẽm trên nóc tủ bếp. Nặng tay. Giấu dưới gầm giường tầng.'],{fx:'+co:x_kim'}]);
X('x_dd_rao','Đi đêm',[['~','Cắt được một khoảng đủ một người lách qua. Dựng lại cho thẳng, đứng xa không thấy.'],{fx:'+co:x_rao'}]);
X('x_dd_cua','Đi đêm',[['~','Ổ khóa cửa sau đã mở, chốt trong vẫn gài. Đêm đó chỉ cần rút chốt.'],{fx:'+co:x_cua'}]);
X('x_dd_nghe','Đi đêm · nghe lén',[
 'Sau cánh cửa văn phòng, quản lý bật loa ngoài. Tin thoại từ Ông Chủ Lò.',
 ['Ông Chủ Lò','…tổ con mèo tháng này đủ chưa. Thằng Tú nó ngu, để má lo. Tin để lâu là thiu.'],
 'Rồi tiếng rè. Đoạn cuối, phần mềm đổi giọng tắt mất hai giây. Một giọng đàn bà già, khàn, nói nốt: "…cả đời má lo cho tụi bây."',
 ['~','Đàn bà. Gọi Tú là "thằng Tú". Xưng "má".'],
 {fx:'+cc:x_giongthat +cc:x_giong +co:x_nghe_len'}]);
X('x_dd_bat','Đi đêm',['Đèn pin rọi thẳng mặt. {me} bị lôi về phòng.',['Sẹo','Lần sau là phòng tối.']]);
X('x_phongtoi','Phòng tối',[{bg:'x2-phong-toi'},{card:'PHÒNG TỐI'},'Sẹo dẫn {me} xuống dãy trong. Cửa sắt đóng. Không đèn, không cửa sổ.','Khi được thả ra, {me} mới biết: trong lúc mình ở trong đó, một người của tổ đã bị chuyển khu.',{bg:''}]);

/* ---------- lục soát lầu ba (dùng khung lục soát của Phần 1) ---------- */
X('soat_xvp','Lục văn phòng lầu ba',['Giờ cơm trưa. Lầu ba trống. Cửa văn phòng mở bằng chìa. Có ba phút trước khi lính gác lên.']);
X('soat_xvp_ngan','Lục văn phòng',['Cuốn sổ bìa đen trong ngăn kéo. Mỗi trang một tổ, mỗi dòng một người, cột cuối ghi "nộp lên". Ký "B.", đóng dấu tròn Phát Đạt TN.',{fx:'+cc:x_so'}]);
X('soat_xvp_tu','Lục văn phòng',['Tủ sắt có một xấp sao kê in ra: chuyển khoản mỗi tối Chủ nhật về một ví mở ở quận 7.',{fx:'+cc:x_vi'}]);
X('soat_xvp_cam','Lục văn phòng',['Màn hình chia bốn ô camera. Dưới góc màn hình dán tờ giấy: giờ giao ca từng tầng.',{fx:'+cc:x_lich +co:x_tuan3'}]);
X('soat_xvp_rac','Lục văn phòng',['Thùng rác. Toàn giấy vụn kịch bản. Một tờ ghi "chuyển đối tác thứ Sáu", chưa có tên.']);
X('soat_xvp_dt','Lục văn phòng',['Điện thoại bàn. Số gọi gần nhất lưu tên "Má". Mã vùng Sài Gòn.',{fx:'+co:x_so_ma'}]);

/* ---------- tin giấu chữ: gửi ra, tin rác trả lời ---------- */
X('x_tinvao','Tin rác',['Nửa đêm, cái máy giấu rung một cái. Tin quảng cáo.',{game:'tinvao'}]);
X('x_tinvao_ok','Tin rác',[['~','O. K. Bên ngoài đọc ra rồi.'],{if:'nhanh:B tin_ngan>=3 !co:x_ngan_lich',L:[['Ngân','Anh nhắn ra được thiệt hả.'],['Ngân','Vậy anh cầm cái này. Lịch đổi ca cả trại, tui chép từ bảng của Chị Bảy.'],{fx:'+tin_ngan +cc:x_lich +co:x_tuan0 +co:x_tuan3 +co:x_ngan_lich'}]}]);

/* ---------- nhánh A: người bên ngoài ---------- */
X('x_ngoai1','Bờ bên này',[{bg:'x2-bo-ben-nay'},'Bờ bên này. {ban} ngồi trên mũi ghe Tài xế Thoại, nhìn qua sông. Bên kia là bức tường cao, đèn pha quét bốn mươi giây một lần.','Có một ô cửa sổ lầu hai còn sáng. Không biết có phải ô đó không.',{bg:''}]);
X('x_ngoai2','Bờ bên này',[{bg:'x2-bo-ben-nay'},'Hương gọi cho {ban}. Giọng gấp.',['Hương','Người của tôi xác nhận rồi: đúng khu đó. Đại úy Vinh đang chờ giờ.'],'{ban} nhìn qua sông. Còn thiếu giờ. Phải chờ tin từ trong.',{bg:''}]);
X('x_ngoai3','Bờ bên này',[{bg:'x2-bo-ben-nay'},'Đêm. {ban} ngồi đếm từng lần đèn pha quét qua. Bốn mươi giây một lần. Đều như đồng hồ.','Tin cuối {ban} gửi vô: "Sông lên lúc hai giờ. Ở yên chờ đèn. Nhớ đếm người."',{bg:''}]);

/* =====================================================================
   HỒI 3
   ===================================================================== */
X('x_ngay19','Ngày 19 · đêm mai',[
 {bg:'x2-phong-ngu'},{card:'NGÀY 19\nĐÊM MAI'},
 'Đêm trước đêm cuối. {me} nằm ngửa trên giường tầng, đếm lại trong đầu.',
 {if:'nhanh:A|co:x_tin_song|co:x_goi_ok',L:[['~','Bên ngoài biết chỗ. Có.']]},{if:'nhanh:B !co:x_tin_song !co:x_goi_ok',L:[['~','Bên ngoài biết chỗ. Chưa.']]},
 {if:'co:x_tin_3g',L:[['~','Bên ngoài biết giờ ập vào. Có.']]},{if:'!co:x_tin_3g',L:[['~','Bên ngoài biết giờ. Chưa.']]},
 {if:'co:x_cua|co:x_rao',L:[['~','Lối ra sông. Có.']]},{if:'!co:x_cua !co:x_rao',L:[['~','Lối ra sông. Chỉ còn cổng chính.']]},
 {if:'co:x_ghe',L:[['~','Ghe chờ. Có.']]},{if:'!co:x_ghe',L:[['~','Không có ghe. Ra tới sông rồi cũng phải chờ.']]},
 {if:'nhanh:B tin_ngan>=4',L:[['Ngân','Tổ mình đi nhóm đầu. Tui đi cuối.']]},
 {if:'nhanh:B tin_ngan<4',L:['Ngân đi ngang giường, không nhìn. Đêm mai cô sẽ đi theo ai, {me} không biết.']},
 {if:'vao:lam',L:['Máy giấu rung. Một tin của Ngân, gửi từ bờ bên kia.',['Ngân','Sông lên lúc hai giờ. Ở yên chờ đèn. Nhớ đếm người.']]},
 {bg:''}]);
X('x_cuu_mo','Đêm giải cứu',[
 {bg:'x2-bo-song-dem'},{card:'NGÀY 20 · 1:00 SÁNG\nMƯA. MẤT ĐIỆN.'},
 {if:'nhanh:A',L:['Bên này sông, {ban} ngồi trên mũi ghe cùng Hương, nhìn đèn pin chớp ở bờ bên kia. Không làm gì được, ngoài đếm.']},
 'Máy phát điện bên kia tắt. Cả trại tối om. Tiếng mưa trên mái tôn lấp hết tiếng chân.',
 ['~','Đếm người. Dẫn từng người. Núp khi đèn pin quét tới.'],
 {if:'!co:x_tin_3g',L:[['~','Bên ngoài không biết giờ. Sẽ không ai ập vào. Chỉ còn mình với cái ghe.']]},
 {bg:''}]);
X('x_ban_dung','Bị bán đứng',[{bg:'x2-cong-sat'},'Mười một giờ đêm, xe tải lùi vô sân. Đèn pin. Tiếng hô. Từng phòng bị lùa ra.','Có người đã báo trước. Khu dời đi trước giờ ập vào.',{bg:''}]);
