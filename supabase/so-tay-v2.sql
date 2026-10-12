-- =====================================================================
-- THẾ GIỚI LẶNG · Sổ tay v2 + lưu game lên tài khoản
-- Dán toàn bộ file này vào Supabase > SQL Editor > New query > Run.
-- Chạy lại bao nhiêu lần cũng được, không mất bài cũ.
-- =====================================================================

-- 1. Bảng lưu cấu hình Sổ tay (danh sách tab, tên, màu, kiểu hiện...)
create table if not exists public.sotay_cauhinh (
  id       text primary key,
  data     jsonb not null default '{}'::jsonb,
  sua_luc  timestamptz not null default now()
);
alter table public.sotay_cauhinh enable row level security;

drop policy if exists "sotay_cauhinh ai cung doc" on public.sotay_cauhinh;
create policy "sotay_cauhinh ai cung doc" on public.sotay_cauhinh
  for select using (true);

drop policy if exists "sotay_cauhinh tac gia ghi" on public.sotay_cauhinh;
create policy "sotay_cauhinh tac gia ghi" on public.sotay_cauhinh
  for all to authenticated
  using ((auth.jwt() ->> 'email') = 'mudashot@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'mudashot@gmail.com');

-- 2. Cho phép bài viết thuộc tab mới (gỡ ràng buộc loai chỉ được 'truyen' / 'tamsu' nếu có)
do $$
declare c text;
begin
  for c in
    select conname from pg_constraint
    where conrelid = 'public.baiviet'::regclass and contype = 'c'
      and pg_get_constraintdef(oid) ilike '%loai%'
  loop
    execute format('alter table public.baiviet drop constraint %I', c);
  end loop;
end $$;

-- 3. Kho ảnh "sotay": ai cũng xem được, chỉ tài khoản tác giả tải lên / xóa
insert into storage.buckets (id, name, public)
values ('sotay', 'sotay', true)
on conflict (id) do update set public = true;

drop policy if exists "sotay anh ai cung xem" on storage.objects;
create policy "sotay anh ai cung xem" on storage.objects
  for select using (bucket_id = 'sotay');

drop policy if exists "sotay anh tac gia tai len" on storage.objects;
create policy "sotay anh tac gia tai len" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'sotay' and (auth.jwt() ->> 'email') = 'mudashot@gmail.com');

drop policy if exists "sotay anh tac gia sua" on storage.objects;
create policy "sotay anh tac gia sua" on storage.objects
  for update to authenticated
  using (bucket_id = 'sotay' and (auth.jwt() ->> 'email') = 'mudashot@gmail.com');

drop policy if exists "sotay anh tac gia xoa" on storage.objects;
create policy "sotay anh tac gia xoa" on storage.objects
  for delete to authenticated
  using (bucket_id = 'sotay' and (auth.jwt() ->> 'email') = 'mudashot@gmail.com');

-- 4. Lưu game lên tài khoản: mỗi người một dòng cho mỗi ô lưu, chỉ đọc/ghi bài của chính mình
create table if not exists public.saves (
  user_id    uuid not null references auth.users(id) on delete cascade,
  slot       text not null default 'save',
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.saves add column if not exists slot text not null default 'save';
alter table public.saves add column if not exists data jsonb not null default '{}'::jsonb;
alter table public.saves add column if not exists updated_at timestamptz not null default now();
create unique index if not exists saves_user_slot on public.saves (user_id, slot);
alter table public.saves enable row level security;
drop policy if exists "saves cua minh doc" on public.saves;
create policy "saves cua minh doc" on public.saves for select to authenticated using (auth.uid()::text = user_id::text);
drop policy if exists "saves cua minh them" on public.saves;
create policy "saves cua minh them" on public.saves for insert to authenticated with check (auth.uid()::text = user_id::text);
drop policy if exists "saves cua minh sua" on public.saves;
create policy "saves cua minh sua" on public.saves for update to authenticated using (auth.uid()::text = user_id::text) with check (auth.uid()::text = user_id::text);
drop policy if exists "saves cua minh xoa" on public.saves;
create policy "saves cua minh xoa" on public.saves for delete to authenticated using (auth.uid()::text = user_id::text);
