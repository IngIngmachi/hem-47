-- Hẻm 47 · Khóa quyền ghi trên Supabase (16/10/2026)
-- Công cụ tác giả trong game chỉ bị ẩn ở giao diện. Ai rành F12 vẫn mở được nút,
-- nên quyền thật phải nằm ở đây. Dán vào Supabase > SQL Editor > New query > Run.
-- Chạy lại nhiều lần không sao.

-- BƯỚC 1 (xem trước): liệt kê các policy đang có. Nếu thấy policy nào cho
-- "anon" hoặc "public" được insert/update/delete vào baiviet thì xóa nó đi
-- (drop policy "tên" on public.baiviet;), vì policy cộng dồn kiểu HOẶC.
select tablename, policyname, roles, cmd, qual, with_check
from pg_policies
where schemaname = 'public' and tablename in ('baiviet','baiviet_tim','thongke','saves','sotay_cauhinh')
order by tablename, cmd;

-- BƯỚC 2: bài viết Sổ tay — ai cũng đọc, chỉ tác giả được thêm/sửa/xóa.
alter table public.baiviet enable row level security;
drop policy if exists "baiviet ai cung doc" on public.baiviet;
create policy "baiviet ai cung doc" on public.baiviet for select using (true);
drop policy if exists "baiviet tac gia them" on public.baiviet;
create policy "baiviet tac gia them" on public.baiviet for insert to authenticated
  with check ((auth.jwt() ->> 'email') = 'mudashot@gmail.com');
drop policy if exists "baiviet tac gia sua" on public.baiviet;
create policy "baiviet tac gia sua" on public.baiviet for update to authenticated
  using ((auth.jwt() ->> 'email') = 'mudashot@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'mudashot@gmail.com');
drop policy if exists "baiviet tac gia xoa" on public.baiviet;
create policy "baiviet tac gia xoa" on public.baiviet for delete to authenticated
  using ((auth.jwt() ->> 'email') = 'mudashot@gmail.com');

-- BƯỚC 3: thả tim — ai cũng đọc được số tim, mỗi người chỉ thêm/xóa tim của mình.
alter table public.baiviet_tim enable row level security;
drop policy if exists "tim ai cung doc" on public.baiviet_tim;
create policy "tim ai cung doc" on public.baiviet_tim for select using (true);
drop policy if exists "tim cua minh them" on public.baiviet_tim;
create policy "tim cua minh them" on public.baiviet_tim for insert to authenticated
  with check (auth.uid()::text = user_id::text);
drop policy if exists "tim cua minh xoa" on public.baiviet_tim;
create policy "tim cua minh xoa" on public.baiviet_tim for delete to authenticated
  using (auth.uid()::text = user_id::text);

-- BƯỚC 4: thống kê kết — ai cũng đọc (để hiện % người chơi), mỗi người chỉ ghi dòng của mình.
alter table public.thongke enable row level security;
drop policy if exists "thongke ai cung doc" on public.thongke;
create policy "thongke ai cung doc" on public.thongke for select using (true);
drop policy if exists "thongke cua minh them" on public.thongke;
create policy "thongke cua minh them" on public.thongke for insert to authenticated
  with check (auth.uid()::text = user_id::text);
drop policy if exists "thongke cua minh sua" on public.thongke;
create policy "thongke cua minh sua" on public.thongke for update to authenticated
  using (auth.uid()::text = user_id::text) with check (auth.uid()::text = user_id::text);

-- (saves và sotay_cauhinh đã có policy trong file so-tay-v2.sql.)
