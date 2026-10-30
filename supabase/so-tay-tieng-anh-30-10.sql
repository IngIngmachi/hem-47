-- Sổ tay · 30/10/2026 · BIG UPDATE: Xứ Lạ có bản tiếng Anh
-- Dán vào Supabase > SQL Editor > New query > Run. Chạy lại nhiều lần không bị trùng bài.
-- mã tab: tamsu · noi_dung (Cốt Truyện) · cach_choi · tuyen_bo

insert into public.baiviet (loai, tieu_de, anh, mo_hoi, thu_tu, hien, noi_dung)
select 'tamsu',
       'BIG UPDATE · Xứ Lạ đã có ngôn ngữ quốc tế',
       'https://www.hem47.asia/img2/bia-chung.webp',
       1, 0, true,
$bai$Hẻm 47 giờ nói được tiếng Anh rồi nha mọi người. 🌏

Cả **Phần 1 · Thế Giới Lặng** lẫn **Phần 2 · Xứ Lạ** đều đã có bản tiếng Anh đầy đủ: toàn bộ lời thoại, tên nhân vật, tin nhắn Za Lô, sổ manh mối, minigame, màn kết. Bạn bè nước ngoài, người thân ở xa, hay ai muốn luyện tiếng Anh bằng một câu chuyện Sài Gòn thì giờ rủ vô chơi được rồi.

**Đổi ngôn ngữ ở đâu?**
- Ở màn hình đầu, bấm nút **EN** ngay cạnh chữ 18+.
- Hoặc vào **Cài đặt → Ngôn ngữ**, chọn *Tiếng Việt* hay *English*.

Đổi lúc nào cũng được, kể cả đang chơi giữa chừng, tiến trình giữ nguyên.

**Tối nay còn sửa thêm mấy chỗ**
- Vào Phần 2 nhanh hơn nhiều: không còn đứng màn hình chờ tải ảnh, có thanh tải nhỏ ở mép trên.
- Sửa lỗi bấm Phần 2 lúc game chưa tải xong thì bị kẹt.
- Trên iPhone: trang chủ gọn trong một màn, chân trang không còn mất chữ, chạm vào ô nhập chữ không còn bị phóng to lệch màn hình.

Ai chơi bản tiếng Anh thấy câu nào lạ, chỗ nào còn sót tiếng Việt thì chụp màn hình gửi vào nhóm **Cư dân Hẻm 47** giúp mình nha!

---

**Alley 47 now speaks English.**
Both Part 1 · *Silent World* and Part 2 · *Xu La* are fully translated. Tap **EN** next to the 18+ badge on the home screen, or go to **Settings → Language**. You can switch anytime, your progress stays.$bai$
where not exists (select 1 from public.baiviet where tieu_de = 'BIG UPDATE · Xứ Lạ đã có ngôn ngữ quốc tế');
