-- Sổ tay · 16/10/2026
-- 1) Tuyên bố bản quyền ở tab "Tuyên bố chung"
-- 2) Bài Big Update toàn bộ hội thoại ở tab "Tâm sự tác giả"
-- Dán vào Supabase > SQL Editor > New query > Run. Chạy lại nhiều lần không bị trùng bài.
-- Tab "Tuyên bố chung" được tìm theo tên trong cấu hình Sổ tay. Nếu chưa tạo tab đó
-- thì bài vẫn được thêm với loai = 'tuyenbo'; tạo tab có mã 'tuyenbo' là bài hiện ra.

-- 1. TUYÊN BỐ QUYỀN SỞ HỮU VÀ QUYỀN TÁC GIẢ
insert into public.baiviet (loai, tieu_de, anh, mo_hoi, thu_tu, hien, noi_dung)
select coalesce(
         (select tab ->> 'id'
            from public.sotay_cauhinh c,
                 jsonb_array_elements(c.data -> 'tabs') tab
           where c.id = 'tabs' and tab ->> 'ten' ilike '%tuyên bố%'
           limit 1),
         'tuyenbo'),
       'Tuyên bố quyền sở hữu và quyền tác giả',
       '',
       1, 0, true,
$bai$HẺM 47: THẾ GIỚI LẶNG

© 2026 Hẻm 47: Thế Giới Lặng. All rights reserved.

Hẻm 47: Thế Giới Lặng là một dự án game độc lập. Tên gọi, logo, cốt truyện, nhân vật, lời thoại, thiết kế hình ảnh, nội dung sáng tạo và các thành phần do dự án tự phát triển thuộc quyền của chủ sở hữu tương ứng, theo quy định pháp luật hiện hành.

Mọi hành vi sao chép, chỉnh sửa, phân phối, tái sử dụng hoặc khai thác thương mại các nội dung thuộc quyền sở hữu của dự án khi chưa được chủ sở hữu cho phép đều không được chấp thuận, trừ các trường hợp được pháp luật cho phép.

Các tài sản, công cụ, phần mềm hoặc thành phần của bên thứ ba được sử dụng trong dự án (nếu có) vẫn thuộc quyền của chủ sở hữu tương ứng và chịu sự điều chỉnh của các điều khoản cấp phép liên quan.

Việc truy cập hoặc trải nghiệm trò chơi không đồng nghĩa với việc chuyển giao quyền sở hữu trí tuệ đối với các nội dung nêu trên.

Website chính thức: http://www.hem47.asia/

© 2026 Hẻm 47: Thế Giới Lặng. All rights reserved.$bai$
where not exists (
  select 1 from public.baiviet where tieu_de = 'Tuyên bố quyền sở hữu và quyền tác giả'
);

-- 2. BIG UPDATE TOÀN BỘ HỘI THOẠI (tab Tâm sự tác giả)
insert into public.baiviet (loai, tieu_de, anh, mo_hoi, thu_tu, hien, noi_dung)
select 'tamsu',
       'Big Update: viết lại toàn bộ hội thoại Hẻm 47',
       'img2/trong-phong3-dem.webp',
       1, 0, true,
$bai$Lần này không có hình mới. Lần này là chữ.

Hẻm 47 vừa được viết lại gần như toàn bộ phần hội thoại: hơn 800 câu được sửa, 71 câu thừa được bỏ hẳn. Bạn nào đang chơi dở thì cứ chơi tiếp, game lưu y như cũ.

✍️ CÓ GÌ KHÁC?

• Nhân vật nói chuyện giống người trong hẻm hơn. Bà Sáu, cô Thoa, chú Tám, chị Hạnh… mỗi người một giọng, xưng hô theo đúng mối quan hệ, và đổi theo cảm xúc. Ai từng nghe cô Thoa gọi Lâm là "con" sẽ thấy cái khác khi tới lúc cô gọi "mày".
• Bớt mấy câu tả cảnh lặp lại. Vô nhà thì biết mình đang ở đâu, bấm vô người thì vô chuyện luôn.
• Sửa những chỗ Lâm "biết trước" điều người chơi chưa thấy. Mấy câu kiểu nhân vật nói ra chuyện của hồi sau đã được gỡ hết.
• Nối manh mối gọn hơn: Lâm không đọc lại hai thẻ bạn vừa chọn nữa, chỉ nói ra điều mình vừa hiểu.
• Việc ngoài luồng đổi sang dấu ? màu xanh, hiên nhà bà Sáu có cầu thang đi thẳng lên phòng 3, và một vài chỗ hiển thị trên điện thoại được làm lại cho dễ đọc.

—

🗒️ VÀI DÒNG TÂM SỰ

Làm game này một thời gian, mà tới gần đây mình mới chịu ngồi chơi lại Hồi 1 từ đầu tới cuối như một người chơi thật. Chơi xong mới thấy: nhiều câu mình viết lúc đó đọc thì hay, mà nói ra thì không ai nói vậy.

Nên đợt này mình làm một việc hơi cực: đọc lại từng câu, nghe thử nó có giống người Sài Gòn nói chuyện với nhau không. Câu nào dài quá thì cắt. Câu nào nghe như văn mẫu thì viết lại. Câu nào Lâm "biết" một chuyện mà người chơi chưa hề thấy thì sửa cho đúng lúc.

Cái mình mất nhiều thời gian nhất lại là chuyện xưng hô. Lâm gọi Ngân là "cổ" chứ không phải "nó". Anh Khoa lúc đầu là "ảnh", càng về sau càng thành "ổng". Anh Tú vui thì "anh em", cợt nhã thì "tao mày". Mấy chữ nhỏ xíu, mà đổi một chữ là đổi luôn cách mình nhìn một người.

Có lẽ cũng giống câu chuyện của Lâm: một bài viết đổi một chữ, có khi là đổi cả cuộc đời người khác.

Cảm ơn mọi người đã chơi, đã nhắn góp ý, đã chỉ cho mình từng lỗi nhỏ. Chơi bản mới rồi cho mình biết câu nào còn "kỳ kỳ" nha. Mình đọc hết.

#Hem47 #TheGioiLang #BigUpdate #IndieGame$bai$
where not exists (
  select 1 from public.baiviet where tieu_de = 'Big Update: viết lại toàn bộ hội thoại Hẻm 47'
);
