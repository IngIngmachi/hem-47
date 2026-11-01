# Hẻm 47 · Bàn giao kỹ thuật (31/10/2026)

Đọc hết file này trước khi đụng code. Tác giả: Irene (tài khoản mudashot). Game web tĩnh, 2 phần:
Phần 1 · Thế Giới Lặng (30 ngày, 5 kết) và Phần 2 · Xứ Lạ (21 ngày, 2 nhánh, 5 kết). Có bản tiếng Anh.

## 1. Cách làm việc với tác giả (bắt buộc)

- Nói tiếng Việt giọng miền Nam, gọi tác giả là "bà". Không dùng thuật ngữ kỹ thuật khi không cần.
- **Mọi chữ mới hiện cho người chơi** (thoại, nút, popup, thông báo) phải đưa tác giả duyệt trước.
  Chữ chờ duyệt thì ghi chú `CHỜ DUYỆT` trong code. Thường gửi file Excel có cột "Bà sửa lại".
- **Mặc định chỉ sửa trang thử.** Chỉ lên bản chính khi tác giả nói "lên bản chính" / "lên main" /
  "deploy". Mỗi lần trả lời phải nói rõ đã cập nhật trang thử hay bản chính.
- Trang thử và bản chính luôn sinh từ cùng một nguồn. Lên bản chính xong thì trang thử cũng phải đồng bộ.
- Giữ Phần 1 và Phần 2 giống nhau về giao diện/tính năng (sửa một bên thì kiểm tra bên kia).
- Commit message tiếng Việt, cuối có:
  ```
  Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
  ```
- Push thẳng `main` (repo GitHub `IngIngmachi/hem-47`). Không để file chưa commit (có hook kiểm tra).

## 2. Cấu trúc file

| File | Là gì |
| --- | --- |
| `nguon.html` | **Nguồn** engine Phần 1 (HTML + CSS + JS + bảng thoại JSON sau `/*ROWS*/`, dòng ~1256). |
| `xula2/*.js` | Phần 2 và các lớp vá giao diện chung. Sửa ở đây. |
| `xula2/en.js`, `xula2/en_*.json` | Bản tiếng Anh. |
| `taotestcaigiketao.html` | Trang thử, **sinh ra**, không sửa tay. |
| `index.html`, `xula2c/` | Bản chính, **sinh ra**, không sửa tay. |
| `tools/mk_p2.py` | Sinh trang thử (mặc định) hoặc bản chính (`--chinh`). |
| `tools/protect.mjs` | Làm rối mã nhẹ + khóa tên miền, chạy trong build. |
| `tools/nhap_en.py`, `tools/xuat_ui.py` | Nhập bản dịch từ Excel / xuất chữ giao diện ra Excel. |
| `build.sh` | Chép file vào `public/` rồi làm rối mã. Cloudflare chạy file này. |
| `sw.js` | Service worker, tên bộ nhớ đệm `const C='tgl-vNN'` (hiện **tgl-v41**). |
| `supabase/*.sql` | SQL đã chạy cho Sổ tay / bảng lỗi. |
| `backup/` | Bản lưu Phần 1 cũ. |

Thứ tự nạp script (trong `tools/mk_p2.py`, biến `tag`):
`p2, games2, rows2, rows2b, data2, p2_thu, thietbi2, test2, bia2, ui2, ui3, p1fix, amb, sfx, p1hype, en`.
File sau bọc (wrap) hàm của file trước bằng cách gán lại tên toàn cục (vd. `rebuild=function(){…}`),
nên **thứ tự rất quan trọng**. `setInterval(fn)` đã giữ tham chiếu cũ thì bọc lại không ăn — bọc hàm con mà nó gọi.

Các file Phần 2 chính: `p2.js` (luồng ngày, bản đồ trại, đêm cứu, màn kết, tờ báo), `games2.js` (mọi trò nhỏ,
ca nhắn tin `KHACH/KHACH2`, đi đêm `MUC/MINI`), `rows2.js`/`rows2b.js` (thoại `X()`/`M()`), `data2.js`
(việc `ACT`, phòng, người), `thietbi2.js` (điện thoại, Za Lô), `bia2.js` (màn đầu, chọn chương, popup 18+),
`ui3.js` (nhiều bản vá giao diện xếp theo ngày, có chú thích), `p1hype.js` (cài đặt, ghi lỗi, chống đơ).

## 3. Sửa → thử → lên

```bash
cd /home/claude/hem-47
# sửa nguon.html hoặc xula2/*.js
node --check xula2/<file>.js
python3 tools/mk_p2.py                 # sinh trang thử
# thử local: python3 -m http.server 8047  → http://localhost:8047/taotestcaigiketao.html
git add -A … && git commit && git push  # Cloudflare tự build trang thử + bản chính hiện tại

# CHỈ khi tác giả bảo lên bản chính:
python3 tools/mk_p2.py --chinh > /tmp/log 2>&1   # KHÔNG pipe vào head (BrokenPipe → trang thử không được ghi)
sed -i "s/const C='tgl-v39';/const C='tgl-v40';/" sw.js   # tăng số mỗi lần lên bản chính
bash build.sh                                     # thử bản đã làm rối mã trong public/
git add -A index.html xula2c sw.js taotestcaigiketao.html && git commit && git push
gh api repos/IngIngmachi/hem-47/commits/$(git rev-parse HEAD)/check-runs --jq '.check_runs[]|.status+" "+(.conclusion//"")'
```

Thử bản đã làm rối mã (có khóa tên miền): chạy `python3 -m http.server 8048` trong `public/`, mở Chromium
với `--host-resolver-rules=MAP www.hem47.asia 127.0.0.1:8048` rồi vào `http://www.hem47.asia/`.
Mạng sandbox không vào được www.hem47.asia thật.

## 4. Thử bằng Playwright (đã cài sẵn, `require('playwright')`)

```js
await p.evaluate(()=>{ localStorage.clear(); localStorage.setItem('tgl_canhbao','1'); localStorage.setItem('tgl_xoay','1'); });
await p.reload(); await p.waitForTimeout(3000);
await p.evaluate(()=>{ const c=document.getElementById('chao'); if(c) c.hidden=true; });  // popup chào
await p.evaluate(()=>{ begin(false) });                                   // Phần 1 mới (đừng await, nó chờ người chơi)
await p.evaluate(()=>{ p2Begin(false,{ket:'hetgio',co:{}}) });           // Phần 2 mới; ket: phuong|imlang → nhánh A, còn lại → B
await p.waitForFunction(()=>P2.on&&$('cover').hidden);
await p.evaluate(()=>{ P2JUMP(10) });                                     // nhảy ngày (chỉ để thử), rồi bấm qua thoại
```
Đừng xóa `.md`/`[role=dialog]` bừa để dọn popup: `#so` (Sổ tay) cũng là dialog, xóa đi sẽ ra lỗi giả.
Đừng `pkill -f "http.server …"` (giết luôn shell). Server nền hay tắt, chạy lại là được.

## 5. Bản tiếng Anh

- Bật bằng nút EN cạnh 18+ ở màn đầu hoặc Cài đặt → Ngôn ngữ; lưu `localStorage.tgl_lang`. Đổi **không tải lại trang**.
- Thoại: `en_p1.json`/`en_p2.json` theo mã dòng; tên: `en_ten.json`; giao diện: `en_ui.json` (VI → EN).
  Nhập lại bằng `python3 tools/nhap_en.py <file.xlsx>` (sheet Phần 1, Phần 2, Tên, Giao diện).
- Chữ giao diện được thay lúc hiện (DOM, thuộc tính, canvas `fillText/measureText`, `confirm/alert`).
  Khớp nguyên câu trước, rồi thay từng mảnh. Hàm: `trUI(s)`, `trUIfull(s)` (không giới hạn độ dài).
- Chữ gõ từng chữ (màn kết, lời khai) hay chữ có gạch chân phải dịch **tại nguồn** trước khi hiện
  (xem `endLines`, `DATA=['KHACH','KHACH2','P2KHAI']` trong en.js). Chữ trong CSS `content:"…"` ghi đè ở en.js.
- File làm sẵn `ENPRE` (trong mk_p2.py) tải trước JSON khi đã chọn EN. Đổi version `?v=3010b` ở cả hai chỗ nếu đổi JSON.

## 6. Ghi lỗi, theo dõi

- Supabase project `pwafboowdpivoysmjrqp`. Bảng: `loi` (lỗi người chơi), `saves`, `thongke`, `baiviet` (Sổ tay),
  `sotay_cauhinh`, `suadoi`, `baiviet_tim`. Có MCP Supabase.
- `loi` có cột msg, stack, phan, ngay, hoi, canh, ua, w, h. Dòng `Tự gỡ kẹt v2…` = cơ chế chống đơ đã gỡ cờ `busy`,
  cột stack ghi thứ đang hiện giữa/trên/dưới màn. Lỗi xảy ra trước khi p1hype.js chạy được giữ ở `window.__EQ` rồi gửi bù.
- Đếm người chơi: chỉ người đăng nhập có trong `saves`. Cloudflare Web Analytics đếm lượt, không đếm người.

## 7. Bẫy đã gặp (đừng lặp lại)

- **Trùng tên lớp CSS**: thanh tải `.p2bar` (thêm 30/10) trùng lớp `.p2bar` của các thanh nút trò → nút
  "Khách kế" và nút trong trò không bấm được. Đã đổi sang `.p2load` (31/10). Đặt tên lớp mới thì `grep` trước.
- **Regex lookbehind `(?<=…)`** làm Safari iOS < 16.4 báo lỗi cú pháp, chết cả file. Không dùng.
- **iPhone/iPad bỏ qua `audio.volume`**: nhạc đi qua GainNode Web Audio (ui3.js cuối file).
- Hiệu năng điện thoại: canvas giới hạn DPR 1.25; ngừng vẽ cảnh khi có thứ che kín màn; tắt `backdrop-filter`
  trên máy cảm ứng; ảnh cảnh Phần 2 tải nền (`p2BgLoad`), chỉ chờ ảnh cần (`p2NeedImg`, tối đa 2,5 giây).
- Phần 2 bấm sớm khi Phần 1 chưa tải xong bản đồ → đã chặn (`p2Begin` chờ `A`/`W`). `at()` không còn văng lỗi.
- Popup chồng nhau: thứ tự là cảnh báo 18+ (`mdCanhBao`, cờ `tgl_canhbao`) rồi mẹo xoay (`mdXoay`, cờ `tgl_xoay`).

## 8. Đang làm / chờ

- Đã lên bản chính 31/10 20:25 (tgl-v40): sửa trùng lớp `.p2bar` (nút Khách kế / Hết ca), khóa cửa sau 4,2 giây, ẩn phím tắt trên máy cảm ứng.
- Đã lên bản chính 1/11 18:15 (tgl-v41): cờ `busy` kẹt từ ngày 11 (`caCa` nhắn cả ca, `gDanhSach`; `tick` của trại giờ luôn trả `busy=false`), chuồng chó vẽ bằng `BGNOW` (lớp phủ z84 cũ che hộp thoại z30), `tryNoi` khi bận thì vẽ lại, kim khóa cửa sau có giới hạn tốc độ. Quy tắc: `busy=true` thì mọi nhánh phải trả `busy=false`.
- **Chờ tác giả duyệt chữ** (file `Hem47_P2_noi_P1_cho_duyet.xlsx`): thẻ "Chuyện đã xảy ra" lúc mở Phần 2 và
  trang "Những khoảnh khắc nối từ Phần 1" ở màn tổng kết. Các cờ Phần 1 dùng ở Phần 2: `noi_cuocgoi, khoa_lat,
  phat_nhanchung, ngan_bv, tu_lo, phuong_dauthu, loc_o, loc_di, lam_nho, bao_tam, bao_phat`.
- Hỏi tác giả: tiền bản EN để "650,000đ" hay đổi "650,000 VND"; popup nhớ theo tài khoản; tỉ lệ % người chơi ở sơ đồ khoảnh khắc.
- 7 chữ giao diện EN tự dịch chưa duyệt (Xong/Nhanh/Kho/Xem/Nghe/Xoay/Trang Facebook) + chữ CSS (en.js).

## 9. Tài liệu cho tác giả (artifact trên claude.ai)

- Hẻm 47 · Walkthrough cho tác giả (Phần 1): https://claude.ai/artifact/B3VWptjsL2cwLwM85wT7Re
- Hẻm 47 · Phần 2 · Walkthrough cho tác giả: https://claude.ai/artifact/UbPS66YVrPE42HPh2mndLR
- Xứ Lạ · Lộ trình thử: https://claude.ai/artifact/MtF5w9JUa59AE9HzjzAZ57
- Hẻm 47 · Phần 2 · Prompt ảnh: https://claude.ai/artifact/6RRopdeVs65sRVYTpQbkUp
- Hồ sơ cốt truyện Phần 1 & 2: https://claude.ai/artifact/PBWDasnNA6gKt68sgZLPVz
