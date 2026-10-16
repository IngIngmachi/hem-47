#!/bin/sh
# Cloudflare Pages: chỉ đưa file của game ra ngoài (không đưa supabase/, trailer/, README).
set -e
rm -rf public && mkdir public
cp index.html v2.html sw.js manifest.webmanifest og.jpg apple-touch-icon.png apple-touch-icon-precomposed.png _headers public/
cp -r icons img img2 nhac public/
echo "Đã chép $(find public -type f | wc -l) file vào public/"
