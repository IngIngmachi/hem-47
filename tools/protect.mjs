// Bảo vệ bản đưa lên web (chỉ chạy trên public/, mã gốc trong repo giữ nguyên để còn sửa):
//  - làm rối toàn bộ JS (kể cả JS nằm trong HTML), chữ thoại mã hóa trong mảng chuỗi
//  - khóa tên miền: chép nguyên trang qua chỗ khác thì game tự chuyển về hem47.asia
//  - xóa chú thích, gom gọn; chặn chuột phải / F12 / Ctrl+U ở mức "gờ giảm tốc"
// Cách chạy: node tools/protect.mjs public/taotestcaigiketao.html public/xula2/*.js
// Thử ở máy: HEM_NOLOCK=1 để bỏ khóa tên miền.
import fs from 'node:fs';
import path from 'node:path';
import JO from 'javascript-obfuscator';

const LOCK = process.env.HEM_NOLOCK ? [] : ['hem47.asia', '.hem47.asia'];
let n = 0;
const opt = (salt) => ({
  compact: true,
  simplify: true,
  identifierNamesGenerator: 'hexadecimal',
  identifiersPrefix: 'h' + salt,          // mỗi tệp một tiền tố, không đụng tên nhau
  renameGlobals: false,                    // các tệp gọi hàm của nhau qua tên toàn cục
  stringArray: true,
  stringArrayThreshold: 1,                 // mọi câu chữ đều vào mảng mã hóa
  stringArrayEncoding: ['base64'],
  stringArrayRotate: true,
  stringArrayShuffle: true,
  stringArrayIndexShift: true,
  stringArrayWrappersCount: 2,
  stringArrayWrappersType: 'function',
  splitStrings: false,
  controlFlowFlattening: false,            // giữ nhịp khung hình trên điện thoại
  deadCodeInjection: false,
  selfDefending: false,
  debugProtection: false,
  transformObjectKeys: false,
  unicodeEscapeSequence: false,
  domainLock: LOCK,
  domainLockRedirectUrl: 'https://www.hem47.asia',
  sourceMap: false,
});
const ob = (code) => JO.obfuscate(code, opt((n++).toString(36))).getObfuscatedCode();

const GUARD = `(function(){
  try{ console.log('%cHẺM 47','font:700 28px sans-serif;color:#c23b2b'); console.log('%cMã và nội dung game thuộc bản quyền tác giả. Vui lòng không sao chép.','font:14px sans-serif'); }catch(e){}
  const ok=t=>t&&(t.closest&&t.closest('input,textarea,[contenteditable=""],[contenteditable="true"]'));
  addEventListener('contextmenu',e=>{ if(!ok(e.target)) e.preventDefault(); },true);
  addEventListener('dragstart',e=>{ if(e.target&&e.target.tagName==='IMG') e.preventDefault(); },true);
  addEventListener('keydown',e=>{ const k=(e.key||'').toLowerCase(), c=e.ctrlKey||e.metaKey;
    if(k==='f12'||(c&&e.shiftKey&&['i','j','c'].includes(k))||(c&&e.altKey&&['i','j','c'].includes(k))||(c&&!e.shiftKey&&(k==='u'||k==='s'))){ e.preventDefault(); e.stopImmediatePropagation(); } },true);
})();`;

for (const f of process.argv.slice(2)) {
  const src = fs.readFileSync(f, 'utf8');
  let out;
  if (f.endsWith('.js')) out = ob(src);
  else {
    let first = true;
    out = src.replace(/<script>([\s\S]*?)<\/script>/g, (m, code) => {
      if (!code.trim()) return m;
      const pre = first ? GUARD + '\n' : ''; first = false;
      return '<script>' + ob(pre + code) + '</script>';
    });
    out = out.replace(/<!--(?!\[if)[\s\S]*?-->/g, '');
  }
  fs.writeFileSync(f, out);
  console.log('Đã bảo vệ', path.basename(f), (src.length / 1024).toFixed(0) + 'KB →', (out.length / 1024).toFixed(0) + 'KB');
}
