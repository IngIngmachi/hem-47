-- 05/11/2026 · Bảng loi: giới hạn độ dài MỌI cột chữ (trước chỉ giới hạn msg),
-- để không ai dùng khóa công khai bơm dữ liệu rác làm đầy database.
-- Game tự cắt: msg ≤300, src ≤120, stack ≤1500, trang ≤40, ua ≤200 → giới hạn dưới đây dư chỗ.
-- Đã chạy trên Supabase ngày 05/11. Chạy lại nhiều lần không sao.

drop policy if exists "loi ai cung ghi" on public.loi;
create policy "loi ai cung ghi" on public.loi
  for insert to anon, authenticated
  with check (
    length(coalesce(msg, '')) <= 400
    and length(coalesce(src, '')) <= 200
    and length(coalesce(stack, '')) <= 2000
    and length(coalesce(trang, '')) <= 100
    and length(coalesce(canh, '')) <= 200
    and length(coalesce(ua, '')) <= 300
  );
