-- Sổ tay · 30/10/2026 · ra mắt Phần 2: Xứ Lạ  (BẢN NHÁP, chờ tác giả duyệt chữ)
-- Dán vào Supabase > SQL Editor > New query > Run. Chạy lại nhiều lần không bị trùng bài.
-- Mỗi bài tự tìm tab theo tên trong cấu hình Sổ tay; không thấy thì dùng mã dự phòng
-- (tạo tab có đúng mã đó là bài hiện ra):
--   1. Thông báo update Phần 2      → tab tên có "cập nhật" / "thông báo", dự phòng 'tamsu'
--   2. Tâm sự tác giả · Phần 2      → 'tamsu'
--   3. Cách chơi Phần 2             → tab tên có "cách chơi" / "hướng dẫn", dự phòng 'huongdan'
--   4. Tuyên bố nội dung Phần 2     → tab tên có "tuyên bố", dự phòng 'tuyenbo'
--   5. Nhân vật Phần 2              → tab tên có "nhân vật" / "truyện", dự phòng 'truyen'
-- Bài 5 KHÔNG nhắc tên kẻ đứng sau trại để tránh lộ truyện.

-- hàm nhỏ: tìm mã tab theo một mẫu tên
create or replace function pg_temp.tab_id(pat text, fallback text) returns text language sql as $$
  select coalesce(
    (select tab ->> 'id'
       from public.sotay_cauhinh c, jsonb_array_elements(c.data -> 'tabs') tab
      where c.id = 'tabs' and tab ->> 'ten' ~* pat
      limit 1),
    fallback)
$$;

-- 1. THÔNG BÁO UPDATE PHẦN 2
insert into public.baiviet (loai, tieu_de, anh, mo_hoi, thu_tu, hien, noi_dung)
select pg_temp.tab_id('cập nhật|thông báo', 'tamsu'),
       'Hẻm 47 · Phần 2: Xứ Lạ đã mở',
       'https://www.hem47.asia/img2/x2-bo-song-dem.webp',
       1, 0, true,
$bai$Phần 2 của Hẻm 47 đã mở. 🚪

**Xứ Lạ** nối tiếp ngay sau cái kết bạn chọn ở Phần 1. Ngân có về hay không, ai còn tin Lâm, Lâm cầm được bao nhiêu bằng chứng, còn bao nhiêu tiền trong túi… tất cả đều được mang qua.

**Chơi ở đâu?**
Màn đầu bấm **Chọn chương** → **Phần 2**. Chưa chơi Phần 1 vẫn vô thẳng được, game sẽ cho bạn chọn một cái kết Phần 1 để bắt đầu.

**Có gì mới?**
• Hai nhánh truyện khác nhau tùy kết Phần 1.
• 21 ngày, 3 hồi: bảy ngày chuẩn bị ở Sài Gòn, những ngày trong trại, và một đêm mưa.
• Lựa chọn có đồng hồ đếm ngược. Chần chừ là game chọn giùm.
• Ban đêm lén làm việc riêng: lục đồ, nghe lén, giấu điện thoại.
• Đêm cuối tự tay dẫn người ra khỏi trại.
• Bốn cái kết.

**Lưu ý**
Phần 2 dành cho người 18+. Có nội dung về lừa đảo việc làm, mua bán người và giam giữ. Đọc kỹ bài Tuyên bố nội dung trong Sổ tay trước khi chơi.

Chơi xong nhớ ghé nhóm **Cư dân Hẻm 47** kể mình ra kết nào nha.$bai$
where not exists (select 1 from public.baiviet where tieu_de = 'Hẻm 47 · Phần 2: Xứ Lạ đã mở');

-- 2. TÂM SỰ TÁC GIẢ · PHẦN 2  (tác giả sửa lại cho đúng giọng mình)
insert into public.baiviet (loai, tieu_de, anh, mo_hoi, thu_tu, hien, noi_dung)
select pg_temp.tab_id('tâm sự', 'tamsu'),
       'Tâm sự tác giả: vì sao có Xứ Lạ',
       'https://www.hem47.asia/img2/x2-bo-ben-nay.webp',
       1, 0, true,
$bai$Phần 1 là chuyện một bài đăng sai làm một người biến mất.

Phần 2 là chuyện người đó đã đi đâu.

Mấy năm nay, báo chí đưa tin liên tục về những người được mời đi làm "việc nhẹ lương cao" ở nước ngoài, rồi bị giữ lại, bị ép làm việc, bị bán qua tay khác. Đọc những bài đó, mình cứ nghĩ hoài: đằng sau mỗi con số là một người có tên, có mẹ đang chờ, có một con hẻm đang im lặng.

Xứ Lạ không có cảnh đánh đập nào được vẽ ra. Mình chọn để những chuyện đó nằm trong lời kể, trong một tay áo kéo dài che cổ tay, trong một cái giường trống buổi sáng. Vì mình muốn bạn hiểu nỗi sợ của họ, chứ không phải nhìn họ đau.

Nếu sau khi chơi, bạn dừng lại hai giây trước một tin tuyển dụng nghe quá hay, hoặc nhắn hỏi thăm một người quen lâu rồi không thấy đăng gì, vậy là Hẻm 47 đã làm được việc của nó.

Cảm ơn mọi người đã chơi tới đây. 🙏

Jesuis-Ing Studio$bai$
where not exists (select 1 from public.baiviet where tieu_de = 'Tâm sự tác giả: vì sao có Xứ Lạ');

-- 3. CÁCH CHƠI PHẦN 2
insert into public.baiviet (loai, tieu_de, anh, mo_hoi, thu_tu, hien, noi_dung)
select pg_temp.tab_id('cách chơi|hướng dẫn', 'huongdan'),
       'Cách chơi Phần 2: Xứ Lạ',
       'https://www.hem47.asia/img2/x2-ben-ghe.webp',
       1, 0, true,
$bai$**Hai nhánh**
Kết Phần 1 quyết định bạn vào nhánh nào. Mỗi nhánh có người cầm máy khác nhau, người đi vào trại khác nhau, và những chuyện chỉ nhánh đó mới thấy.

**Thời gian**
21 ngày, chia 3 hồi. Mỗi việc tốn giờ. Có việc chỉ làm được vào giờ nhất định, có việc qua ngày là mất.

**Tiền**
Tiền cuối Phần 1 được mang qua. Vào thẳng Phần 2 thì có 650.000đ. Ở hồi đầu có thể làm thêm (chạy Gáp, phụ tạp hóa…) để đủ tiền chuẩn bị.

**Lòng tin**
Mỗi người trong trại có mức tin bạn riêng. Ngồi nói chuyện, giữ lời, giúp đúng lúc thì họ tin hơn. Đêm cuối, người tin bạn sẽ đi theo liền; người chưa tin sẽ chần chừ.

**Bị nghi**
Trong trại, thanh **Bị nghi** tăng khi bạn làm điều khả nghi. Lên quá cao là có người bị chuyển đi.

**Ban đêm**
Sau giờ tắt đèn có thể lén làm việc riêng: lục đồ, nghe lén, tìm chỗ giấu điện thoại. Mỗi trò nhỏ chơi hỏng thì cái giá phải trả là thật.

**Lựa chọn gấp**
Một số lựa chọn có thanh thời gian chạy ở mép trên. Hết giờ, game chọn giùm bạn.

**Điện thoại và manh mối**
Điện thoại có tin nhắn, danh bạ, ảnh và bảng manh mối. Nối hai manh mối để ra suy luận. Đủ chứng cứ thì viết báo cáo gửi đi.

**Đêm giải cứu**
Bấm vào từng người để dẫn họ tới lối ra trước khi hết giờ. Chuẩn bị càng kỹ (lối ra phụ, ghe, giờ người ngoài ập vào) thì đêm đó càng dễ.

**Bốn kết**
Cả tổ về · Người ở lại · Ra ngoài một mình · Bị bán đứng. Muốn ra đủ bốn kết thì chơi lại với lựa chọn khác, hoặc bắt đầu từ một kết Phần 1 khác.$bai$
where not exists (select 1 from public.baiviet where tieu_de = 'Cách chơi Phần 2: Xứ Lạ');

-- 4. TUYÊN BỐ NỘI DUNG PHẦN 2  (nên nhờ người có chuyên môn pháp lý đọc lại trước khi đăng)
insert into public.baiviet (loai, tieu_de, anh, mo_hoi, thu_tu, hien, noi_dung)
select pg_temp.tab_id('tuyên bố', 'tuyenbo'),
       'Tuyên bố về nội dung Phần 2: Xứ Lạ',
       'https://www.hem47.asia/img2/bia.webp',
       1, 0, true,
$bai$**Độ tuổi**
Hẻm 47: Thế Giới Lặng · Phần 2: Xứ Lạ dành cho người từ 18 tuổi trở lên.

**Cảnh báo nội dung**
Trò chơi có đề cập tới lừa đảo tuyển dụng, cho vay nặng lãi, mua bán người, giam giữ trái phép, cưỡng ép lao động, đe dọa và bạo lực. Bạo lực chỉ được thể hiện gián tiếp qua lời kể và chi tiết, không có hình ảnh bạo lực trực diện.

**Hư cấu**
Toàn bộ nhân vật, tên gọi, công ty, khu trại, khu vực, bến sông và địa danh trong trò chơi đều là hư cấu. Mọi sự trùng hợp với người, tổ chức, doanh nghiệp hoặc địa điểm có thật là ngoài ý muốn.

Bối cảnh "bên kia biên giới" trong trò chơi là một khu vực giả tưởng. Trò chơi không nhằm mô tả, đánh giá hay ám chỉ bất kỳ quốc gia, vùng lãnh thổ, khu tự trị, chính quyền, cơ quan nhà nước, lực lượng chức năng hay cộng đồng dân cư có thật nào.

**Nguồn cảm hứng**
Các thủ đoạn trong trò chơi được hư cấu lại từ thông tin đã được báo chí và cơ quan chức năng công bố công khai, nhằm mục đích nâng cao nhận thức và cảnh báo. Trò chơi không cung cấp, không hướng dẫn và không khuyến khích bất kỳ hành vi vi phạm pháp luật nào.

**Không phải lời khuyên chuyên môn**
Nội dung trò chơi không phải là tư vấn pháp lý, hướng dẫn nghiệp vụ hay quy trình giải cứu thực tế. Những gì nhân vật làm trong game là chuyện hư cấu; ngoài đời, đừng tự mình đối đầu với đường dây phạm tội.

**Nếu bạn hoặc người quen gặp chuyện**
Nếu bạn nhận được lời mời đi làm ở nước ngoài "việc nhẹ lương cao", bị giữ giấy tờ, bị ép làm việc hoặc mất liên lạc với người thân sau khi đi làm xa, hãy báo ngay cho công an nơi gần nhất hoặc gọi **113**.

**Quyền tác giả**
Xem thêm bài "Tuyên bố quyền sở hữu và quyền tác giả" trong Sổ tay.

© 2026 Jesuis-Ing Studio · Hẻm 47: Thế Giới Lặng. All rights reserved.$bai$
where not exists (select 1 from public.baiviet where tieu_de = 'Tuyên bố về nội dung Phần 2: Xứ Lạ');

-- 5. NHÂN VẬT PHẦN 2  (không lộ kẻ đứng sau)
insert into public.baiviet (loai, tieu_de, anh, mo_hoi, thu_tu, hien, noi_dung)
select pg_temp.tab_id('nhân vật|truyện', 'truyen'),
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
![Tài xế Thoại](img2/thoai-face.webp)
![Hương](img2/huong-face.webp)
![Đại úy Vinh](img2/vinh-face.webp)

**Ngân**
Chủ shop Ngân Order năm xưa. Biến mất sau bài bóc phốt của Lâm.

**Lâm**
Admin page bóc phốt năm xưa. Người viết bài về Ngân.

**Chị Bảy**
Quản lý phòng máy trong trại. Người Việt. Tay áo dài lúc nào cũng che kín cổ tay.

**Sẹo**
Gác cổng. Vết sẹo chạy từ thái dương xuống cằm.

**Nhi**
19 tuổi, dưới Tiền Giang lên. Nhắn tin hay gõ chữ "á" cuối câu.

**Toàn**
Thợ hồ, 26 tuổi. Đi vì nợ app.

**Chị Huệ**
49 tuổi. Đi thay cho con trai.

**Tí**
Nhỏ nhất phòng, 19 tuổi. Đêm nào cũng nghe tiếng nước.

**Khang**
Em trai anh Khoa ở văn phòng số 12.

**Tài xế Thoại**
Chạy ghe ở bến sát biên. Chở ai trả tiền.

**Hương**
Phóng viên điều tra.

**Đại úy Vinh**
Công an phường.$bai$
where not exists (select 1 from public.baiviet where tieu_de = 'Nhân vật Phần 2: Xứ Lạ');
