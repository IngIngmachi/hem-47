-- Sổ tay · bài thông báo Big Update (14/10/2026)
-- Dán vào Supabase > SQL Editor > New query > Run. Chạy lại nhiều lần cũng không bị trùng bài.
insert into public.baiviet (loai, tieu_de, anh, mo_hoi, thu_tu, hien, noi_dung)
select 'tamsu',
       'Big Update: Hẻm 47 có diện mạo mới',
       'img2/bia.webp',
       1, 0, true,
$bai$🚨 THÔNG BÁO BIG UPDATE — HẺM 47: THẾ GIỚI LẶNG

Hẻm 47 chính thức có một đợt nâng cấp lớn về hình ảnh và trải nghiệm! 🔎

Lần cập nhật này, rất nhiều khu vực và chi tiết trong game đã được làm mới để đưa thế giới Hẻm 47 đến gần hơn với không khí điều tra bí ẩn mà game hướng tới.

✨ CÓ GÌ MỚI TRONG BẢN UPDATE?

🎬 LÀM MỚI HÌNH ẢNH TOÀN GAME
Từ những mặt tiền nhà trong hẻm, các địa điểm quen thuộc đến nội thất, hình ảnh ký ức và những chi tiết gắn với câu chuyện — tất cả đều được cập nhật theo hướng hình ảnh mới.

🕵️ NÂNG CẤP HỆ THỐNG NHÂN VẬT & HỘI THOẠI
Cách nhân vật xuất hiện, chân dung và lời thoại được thiết kế lại. Suy nghĩ của Lâm, lời dẫn và các lựa chọn cũng có cách trình bày riêng, giúp trải nghiệm rõ ràng hơn.

📱 CẢI THIỆN TRẢI NGHIỆM KHÁM PHÁ
Có thể vuốt ngang để quan sát cả con hẻm trên điện thoại. Các điểm tương tác cũng được điều chỉnh theo hình ảnh mới.

🌃 NÂNG CẤP KHÔNG KHÍ VÀ PHẦN DẪN TRUYỆN
Hình ảnh ngày và đêm, phần mở đầu cùng nhiều chi tiết trong thế giới game được làm mới để thống nhất hơn về phong cách.

—

Một phiên bản mới, một diện mạo mới. Nhưng những bí ẩn trong Hẻm 47 vẫn đang chờ được khám phá.

🔍 Vào game và trải nghiệm bản cập nhật mới ngay nha

Chơi thử rồi cho mình biết cảm nhận nhé. Và nhớ để ý kỹ những chi tiết nhỏ — biết đâu chúng không chỉ xuất hiện cho đẹp. 👀

#Hem47 #TheGioiLang #BigUpdate #IndieGame$bai$
where not exists (
  select 1 from public.baiviet where tieu_de = 'Big Update: Hẻm 47 có diện mạo mới'
);
