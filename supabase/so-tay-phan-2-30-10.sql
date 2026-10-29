-- Sổ tay · 30/10/2026 · ra mắt Phần 2: Xứ Lạ (BẢN ĐÃ DUYỆT CHỮ - KHÔNG SPOIL)
-- Dán vào Supabase > SQL Editor > New query > Run. Chạy lại nhiều lần không bị trùng bài.

-- mã tab theo cấu hình Sổ tay hiện tại: tamsu · noi_dung (Cốt Truyện) · cach_choi · tuyen_bo

-- 1. THÔNG BÁO UPDATE PHẦN 2
insert into public.baiviet (loai, tieu_de, anh, mo_hoi, thu_tu, hien, noi_dung)
select 'tamsu',
       'Hẻm 47 · Phần 2: Xứ Lạ đã mở',
       'https://www.hem47.asia/img2/x2-bo-song-dem.webp',
       1, 0, true,
$bai$Phần 2 của Hẻm 47 mở cửa rồi nha mọi người. 🚪

**Xứ Lạ** đi tiếp ngay từ cái kết bạn đã chọn ở Phần 1. Ngân đã về được hay còn kẹt lại, bà con trong hẻm còn ai tin Lâm, trong tay gom được bao nhiêu chứng cứ, túi còn mấy đồng… mọi thứ bạn làm ở Phần 1 đều đi theo qua đây hết.

**Vô chơi chỗ nào?**
Ở màn hình đầu, bấm **Chọn chương** → **Phần 2**. Nếu chưa chơi Phần 1 hoặc đổi máy mất save thì vẫn vô thẳng được nha, game sẽ cho bạn chọn nhanh một cái kết của Phần 1 để bắt đầu.

**Phần này có gì mới?**
- **Hai nhánh truyện riêng biệt** tùy theo kết Phần 1 bạn đi.
- **21 ngày, chia 3 hồi:** 7 ngày chuẩn bị ở Sài Gòn, những ngày bên kia sông, và một đêm mưa.
- **Ca làm việc trong phòng máy:** Mỗi ngày đều có chỉ tiêu đặt trên đầu. Giữ an toàn cho mình hay tìm cách cứu người phía bên kia màn hình là lựa chọn của bạn.
- **Lựa chọn có đếm giây:** Chần chừ không quyết là nhân vật im lặng luôn — mà ở trong đó thì im lặng cũng có cái giá của nó.
- **Sau giờ tắt đèn:** Lén rời giường đi tìm đường sống và gom chứng cứ khi cả khu đã khóa cửa.
- **Đêm cuối tự tay dẫn người thoát ra** với 5 cái kết khác nhau.

**Lưu ý nhỏ**
Phần 2 gắn nhãn 18+. Câu chuyện đi thẳng vào chuyện bẫy việc nhẹ lương cao, tín dụng đen, mua bán người và giam giữ cưỡng bức. Mọi người nhớ đọc kỹ bài *Tuyên bố nội dung* trong Sổ tay trước khi vào chơi nghen.

Chơi xong ra được kết nào, cứu được mấy người thì ghé nhóm **Cư dân Hẻm 47** kể mình nghe với nha!$bai$
where not exists (select 1 from public.baiviet where tieu_de = 'Hẻm 47 · Phần 2: Xứ Lạ đã mở');

-- 2. TÂM SỰ TÁC GIẢ · PHẦN 2
insert into public.baiviet (loai, tieu_de, anh, mo_hoi, thu_tu, hien, noi_dung)
select 'tamsu',
       'Tâm sự tác giả: vì sao có Xứ Lạ',
       'https://www.hem47.asia/img2/x2-bo-ben-nay.webp',
       1, 0, true,
$bai$Phần 1 là chuyện một bài bóc phốt thiếu kiểm chứng làm một người biến mất.

Phần 2 là chuyện người đó đã đi đâu.

Mấy năm nay, báo chí đưa tin liên tục về những người sập bẫy "việc nhẹ lương cao" ở bên kia biên giới, rồi bị giữ lại, bị ép làm việc, bị bán qua tay khác. Nhiều người ở ngoài đọc tin hay buông một câu rất gọn: "Sao tham vậy, sao dễ tin người vậy?"

Nhưng khi đặt mình vào con hẻm nhỏ này, mình thấy đằng sau mỗi con số trên báo là một người có tên, có mẹ đang chờ, có một lý do khiến họ bước lên chuyến xe lúc 4 giờ sáng. Có người đi vì món nợ vài triệu đẻ thành mấy chục triệu, có người đi vì tiền thuốc của người thân, có người đi chỉ vì sau một đêm bị cả mạng xã hội rủa xả không còn chỗ đứng ở quê nhà.

Trong **Xứ Lạ**, bạn sẽ không thấy một tấm hình nào vẽ cảnh đánh đập hay máu me. Mình chọn để những chuyện đó nằm lại trong lời kể, trong một tay áo sơ mi cài kín cổ tay giữa trời nóng, trong một chỗ ngồi trống buổi sáng, và trong cảm giác chính ngón tay bạn phải khựng lại trước màn hình phòng máy. Vì mình muốn bạn hiểu nỗi sợ của họ, chứ không phải nhìn họ đau.

Mình làm game này để tuyên truyền và cảnh tỉnh. Nếu sau khi chơi xong, bạn dừng lại hai giây trước một tin tuyển dụng nghe quá êm tai, hoặc nhắn hỏi thăm một người quen lâu rồi không thấy lên tiếng, vậy là **Hẻm 47** đã làm xong việc của nó rồi.

Cảm ơn mọi người đã đi cùng tụi mình tới đây. 🙏

Jesuis-Ing Studio$bai$
where not exists (select 1 from public.baiviet where tieu_de = 'Tâm sự tác giả: vì sao có Xứ Lạ');

-- 3. CÁCH CHƠI PHẦN 2
insert into public.baiviet (loai, tieu_de, anh, mo_hoi, thu_tu, hien, noi_dung)
select 'cach_choi',
       'Cách chơi Phần 2: Xứ Lạ',
       'https://www.hem47.asia/img2/x2-ben-ghe.webp',
       1, 0, true,
$bai$**Hai nhánh**
Kết Phần 1 quyết định bạn vào nhánh nào. Mỗi nhánh có người cầm máy khác nhau, người bước vào trại khác nhau, và những góc khuất chỉ nhánh đó mới thấy.

**Thời gian**
21 ngày, chia 3 hồi. Ở ngoài hẻm bạn còn tự chọn giờ giấc được; chứ khi đã bước qua cánh cổng sắt, giờ giấc bị khóa chặt theo lịch của trại. Bạn chỉ có vài khe hở ngắn ngủi trong ngày để xoay xở.

**Tiền bạc**
Tiền cuối Phần 1 được mang qua (nếu vào thẳng Phần 2 thì có sẵn 650.000đ). Ở hồi đầu có thể làm thêm trong hẻm hoặc chạy xe để gom tiền chuẩn bị cho chuyến đi.

**Lòng tin**
Mỗi người trong tổ đều có nỗi sợ và sự dè chừng riêng. Ngồi nói chuyện đúng lúc, giữ lời hứa, đứng ra gánh giúp nhau thì họ mới tin bạn. Đêm cuối, ai tin bạn sẽ dám đi theo liền; ai chưa tin sẽ chần chừ.

**Bị nghi**
Trong trại, mọi hành động bất thường hay làm hụt chỉ tiêu đều làm thanh **Bị nghi** tăng lên. Để thanh này chạm đỉnh thì cái giá phải trả sẽ tính thẳng vào những người trong tổ.

**Ban đêm**
Sau giờ tắt đèn có thể lén rời giường làm việc riêng: thăm dò xung quanh, tìm đồ giấu, gom chứng cứ.

**Lựa chọn gấp**
Một số tình huống có thanh thời gian chạy ở mép trên màn hình. Hết giờ mà chưa chọn, game sẽ chọn giùm bạn.

**Điện thoại và manh mối**
Nối hai manh mối liên quan để mở ra suy luận mới. Gom đủ chứng cứ mới có thể vạch mặt kẻ đứng sau.

**Đêm giải cứu & Năm kết**
Đêm cuối chạy theo thời gian thật, bạn phải tự dẫn từng nhóm vượt ra ngoài trước khi trời sáng. Chuẩn bị càng kỹ từ những ngày trước thì cơ hội đưa được nhiều người về càng cao.

Game có 5 kết: **Cả tổ về · Bơi qua sông · Người ở lại · Ra ngoài một mình · Bị bán đứng**. Muốn mở hết cả năm kết thì thử đi lại với lựa chọn khác, hoặc bắt đầu từ một kết khác của Phần 1.$bai$
where not exists (select 1 from public.baiviet where tieu_de = 'Cách chơi Phần 2: Xứ Lạ');

-- 4. TUYÊN BỐ NỘI DUNG PHẦN 2
insert into public.baiviet (loai, tieu_de, anh, mo_hoi, thu_tu, hien, noi_dung)
select 'tuyen_bo',
       'Tuyên bố về nội dung Phần 2: Xứ Lạ',
       'https://www.hem47.asia/img2/bia.webp',
       1, 0, true,
$bai$**Độ tuổi**
Hẻm 47: Thế Giới Lặng · Phần 2: Xứ Lạ dành cho người chơi từ 18 tuổi trở lên.

**Cảnh báo nội dung**
Trò chơi có đề cập tới thủ đoạn lừa đảo tuyển dụng, tín dụng đen, mua bán người, giam giữ trái phép, cưỡng ép lao động, đe dọa tinh thần và bạo lực. Toàn bộ yếu tố bạo lực trong game chỉ được thể hiện gián tiếp qua âm thanh, lời kể và chi tiết hiện trường sau sự việc, tuyệt đối không sử dụng hình ảnh máu me hay bạo lực trực diện.

**Tính chất hư cấu**
Toàn bộ nhân vật, tên gọi, công ty, khu phức hợp, bến sông và địa danh trong trò chơi đều là hư cấu. Mọi sự trùng hợp (nếu có) với tên người, tổ chức, doanh nghiệp hoặc địa điểm ngoài đời thực đều là ngẫu nhiên.

Bối cảnh "bên kia biên giới" trong trò chơi là một không gian giả tưởng phục vụ cốt truyện. Trò chơi không mô tả, đánh giá hay ám chỉ bất kỳ quốc gia, vùng lãnh thổ, chính quyền, cơ quan nhà nước, lực lượng chức năng hay cộng đồng dân cư có thật nào.

**Mục đích tuyên truyền & Cảnh tỉnh**
Các kịch bản lừa đảo trong trò chơi được rút gọn và hư cấu lại từ những vụ việc đã được báo chí chính thống và cơ quan công an công bố công khai, với mục đích duy nhất là nâng cao nhận thức cộng đồng để phòng tránh tội phạm. Trò chơi không cung cấp kịch bản chi tiết, không hướng dẫn và không cổ súy bất kỳ hành vi vi phạm pháp luật nào.

**Không phải hướng dẫn nghiệp vụ**
Hành trình trà trộn và thoát thân của nhân vật trong game là tình tiết hư cấu của tác phẩm. Ngoài đời thực, công dân tuyệt đối không tự ý tiếp cận hiện trường hay tự mình đối đầu với các đường dây tội phạm.

**Khi cần hỗ trợ ngoài đời thực**
Nếu bạn hoặc người thân nhận được lời mời chào "việc nhẹ lương cao" bất thường ở nước ngoài, bị giữ giấy tờ tùy thân, bị cưỡng ép làm việc hoặc mất liên lạc sau khi đi làm xa, hãy trình báo ngay cho cơ quan Công an gần nhất hoặc gọi đường dây nóng **113**.

**Quyền tác giả**
Xem chi tiết tại bài "Tuyên bố quyền sở hữu và quyền tác giả" trong Sổ tay.

© 2026 Jesuis-Ing Studio · Hẻm 47: Thế Giới Lặng. All rights reserved.$bai$
where not exists (select 1 from public.baiviet where tieu_de = 'Tuyên bố về nội dung Phần 2: Xứ Lạ');

-- 5. NHÂN VẬT PHẦN 2 (không lộ kẻ đứng sau & không spoil quá khứ nhân vật)
insert into public.baiviet (loai, tieu_de, anh, mo_hoi, thu_tu, hien, noi_dung)
select 'noi_dung',
       'Nhân vật Phần 2: Xứ Lạ',
       'https://www.hem47.asia/img2/x2-bo-ben-nay.webp',
       1, 20, true,
$bai$[album]
![Ngân](img2/ngan-face.webp)
![Lâm](img2/lam-face.webp)
![Chị Bảy](img2/bay-face.webp)
![Sẹo](img2/seo-face.webp)
![Nhi](img2/nhi-face.webp)
![Toàn](img2/toan-face.webp)
![Chị Huệ](img2/hue-face.webp)
![Tí](img2/ti-face.webp)
![Khang](img2/khang-face.webp)
![Chú Thoại](img2/thoai-face.webp)
![Hương](img2/huong-face.webp)
![Đại úy Vinh](img2/vinh-face.webp)

**Ngân**
Chủ shop Ngân Order năm xưa. Biến mất khỏi hẻm 47 sau đêm bài bóc phốt được đăng lên.

**Lâm**
Cựu admin page bóc phốt năm xưa. Người đã viết bài đăng về Ngân.

**Chị Bảy**
Quản lý phòng máy trong trại. Người Việt. Giữa trời nóng hầm hập lúc nào cũng mặc áo tay dài cài kín cổ tay.

**Sẹo**
Gác cổng khu trại. Có vết sẹo dài chạy từ thái dương xuống cằm.

**Nhi**
19 tuổi, từ Tiền Giang lên. Ngồi dãy bàn đầu trong phòng máy.

**Toàn**
Thợ hồ, 26 tuổi. Bước lên xe đi làm xa vì kẹt nợ app.

**Chị Huệ**
49 tuổi, lớn tuổi nhất phòng. Đi thay cho con trai ở quê.

**Tí**
19 tuổi, nhỏ nhất phòng ngủ. Giường nằm sát bức tường phía bờ sông.

**Khang**
Em trai của anh Khoa ở Văn phòng số 12. Đi làm xa từ hai năm trước rồi mất liên lạc.

**Chú Thoại**
Người đàn ông chài lưới neo chiếc ghe nhỏ ở khúc sông sát biên giới.

**Hương**
Phóng viên điều tra theo dõi danh sách những người mất tích qua cửa khẩu.

**Đại úy Vinh**
Điều tra viên hình sự tăng cường xuống địa bàn, người trực tiếp thụ lý hồ sơ vụ việc ở hẻm 47.$bai$
where not exists (select 1 from public.baiviet where tieu_de = 'Nhân vật Phần 2: Xứ Lạ');
