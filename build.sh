#!/bin/sh
# Cloudflare: chỉ đưa file của game ra ngoài (không đưa supabase/, trailer/, README).
set -e
rm -rf public && mkdir public
cp index.html v2.html taotestcaigiketao.html sw.js manifest.webmanifest og.jpg apple-touch-icon.png apple-touch-icon-precomposed.png _headers public/
cp -r icons img img2 nhac sfx xula2 public/
echo "Đã chép $(find public -type f | wc -l) file vào public/"
# Làm rối mã + khóa tên miền (mã gốc trong repo không đổi). Lỗi ở bước này thì dừng build,
# web giữ nguyên bản cũ chứ không đưa bản chưa bảo vệ lên.
[ -d node_modules/javascript-obfuscator ] || npm ci --no-audit --no-fund --silent
# Bản chính (index.html, sinh từ nguon.html) + trang thử + Phần 2 đều được bảo vệ. nguon.html và backup/ không đưa lên web.
node tools/protect.mjs public/index.html public/taotestcaigiketao.html public/xula2/*.js
