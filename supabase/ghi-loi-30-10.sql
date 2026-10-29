-- Ghi lỗi tự động · 30/10/2026
-- Dán vào Supabase > SQL Editor > New query > Run. Chạy lại không sao.
-- Người chơi (kể cả chưa đăng nhập) chỉ được GHI lỗi, không đọc được. Chỉ tác giả đọc được.

create table if not exists public.loi (
  id      bigserial primary key,
  luc     timestamptz not null default now(),
  msg     text not null,
  src     text, dong int, cot int, stack text,
  trang   text, phan int, ngay int, hoi int, canh text,
  ua      text, w int, h int
);
alter table public.loi enable row level security;

drop policy if exists "loi ai cung ghi" on public.loi;
create policy "loi ai cung ghi" on public.loi for insert to anon, authenticated with check (length(msg) <= 400);

drop policy if exists "loi tac gia doc" on public.loi;
create policy "loi tac gia doc" on public.loi for select to authenticated
  using ((auth.jwt() ->> 'email') = 'mudashot@gmail.com');

drop policy if exists "loi tac gia xoa" on public.loi;
create policy "loi tac gia xoa" on public.loi for delete to authenticated
  using ((auth.jwt() ->> 'email') = 'mudashot@gmail.com');

-- Xem lỗi mới nhất, gom theo nội dung:
-- select msg, count(*) so_lan, max(luc) gan_nhat, max(phan) phan from public.loi group by msg order by so_lan desc;
