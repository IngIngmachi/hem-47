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
       'https://www.hem47.asia/img2/bia.webp',
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
       'https://www.hem47.asia/img2/big-update-hoi-thoai.webp',
       1, 0, true,
$bai$Lần này Hẻm 47 không có hình mới. Lần này là chữ. ✍️

Hơn 800 câu hội thoại được sửa lại. 71 câu thừa bị bỏ hẳn. Gần như toàn bộ phần hội thoại của Hẻm 47 đã được viết lại trong đợt update này.

Bạn nào đang chơi dở cứ chơi tiếp nha, tiến trình vẫn được giữ nguyên như cũ.

✍️ VẬY THÌ CÓ GÌ KHÁC?

• Nhân vật nói chuyện giống người trong hẻm hơn. Bà Sáu, cô Thoa, chú Tám, chị Hạnh… mỗi người có một giọng riêng, cách xưng hô riêng, và cách nói chuyện cũng thay đổi theo mối quan hệ lẫn cảm xúc. Cùng là cô Thoa, nhưng từ lúc gọi Lâm là “con” đến khi chuyển sang “mày”, câu chuyện đã không còn như trước nữa.

• Bớt kể những gì người chơi đã biết. Không còn vừa bước vô nhà đã phải nghe tả lại mình đang đứng ở đâu, hay bấm vào một nhân vật mà vẫn phải đọc một đoạn miêu tả dài trước khi vô chuyện.

• Lâm không còn biết trước những gì người chơi chưa thấy. Những câu thoại vô tình tiết lộ chuyện xảy ra ở các đoạn sau đã được rà soát và sửa lại cho đúng thời điểm.

• Manh mối được nối gọn hơn. Khi ghép hai thẻ thông tin, Lâm không đọc lại nguyên xi những gì bạn vừa chọn nữa, mà tập trung nói ra điều cậu thực sự hiểu được từ chúng.

Ngoài ra, việc ngoài luồng giờ có dấu ? màu xanh, hiên nhà bà Sáu có cầu thang đi thẳng lên Phòng 3, và một số giao diện trên điện thoại cũng được chỉnh lại cho dễ đọc hơn.

🗒️ VÀI DÒNG TÂM SỰ

Làm game một thời gian rồi, nhưng mãi gần đây mình mới thực sự ngồi chơi lại Hồi 1 từ đầu đến cuối, lần này với tư cách một người chơi chứ không phải người viết.

Và trời ơi, có những câu lúc viết mình thấy hay lắm, nhưng đọc thành tiếng mới nhận ra… ngoài đời chẳng ai nói chuyện kiểu đó hết. =))))

Thế là mình quyết định ngồi đọc lại từng câu, thử nghe xem nó có giống cách người Sài Gòn nói chuyện với nhau không. Câu nào dài quá thì cắt. Câu nào nghe như văn mẫu thì viết lại. Câu nào Lâm biết một chuyện mà người chơi còn chưa được thấy thì sửa cho đúng lúc.

Tưởng sửa vài câu thôi, ai dè thành hơn 800 câu.

Mà thứ làm mình mất thời gian nhất lại là chuyện xưng hô.

Lâm gọi Ngân là “cổ” chứ không phải “nó”. Anh Khoa lúc đầu là “ảnh”, càng về sau càng thành “ổng”. Anh Tú lúc vui thì “anh em”, lúc cợt nhả lại chuyển sang “tao mày”.

Toàn những chữ nhỏ xíu thôi, nhưng đổi một chữ là đổi cả sắc thái của câu nói, đổi luôn cách mình cảm nhận về người đang nói.

Và mình nghĩ, đó cũng là một phần tinh thần của Hẻm 47: đôi khi chỉ một chữ thay đổi, câu chuyện về một con người đã có thể khác đi rất nhiều.

Đợt này không có thêm hình ảnh hoành tráng, không có bối cảnh mới để khoe. Chỉ là mình quay lại làm cho những gì đã có trở nên tốt hơn một chút, tự nhiên hơn một chút, và gần với câu chuyện mình thực sự muốn kể.$bai$
where not exists (
  select 1 from public.baiviet where tieu_de = 'Big Update: viết lại toàn bộ hội thoại Hẻm 47'
);

-- 3. SỬA HÌNH CHO BÀI ĐÃ CHẠY TRƯỚC ĐÓ
-- Sổ tay chỉ nhận link hình dạng https://..., nên các bài ghi "img2/..." không hiện hình.
-- Mấy dòng dưới gắn lại hình cho cả bài đã thêm (kể cả bài Big Update 14/10).
update public.baiviet set anh = 'https://www.hem47.asia/img2/bia.webp'
 where tieu_de in ('Tuyên bố quyền sở hữu và quyền tác giả', 'Big Update: Hẻm 47 có diện mạo mới');
update public.baiviet set anh = 'https://www.hem47.asia/img2/big-update-hoi-thoai.webp'
 where tieu_de = 'Big Update: viết lại toàn bộ hội thoại Hẻm 47';
