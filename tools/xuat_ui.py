#!/usr/bin/env python3
"""Gom chữ giao diện tiếng Việt viết thẳng trong code (nguon.html + xula2/*.js, trừ bảng thoại)
ra danh sách để dịch. Dùng: python3 tools/xuat_ui.py ra.xlsx  (hoặc --json để in thống kê)."""
import re, json, sys
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
VN = re.compile(r'[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]', re.I)
SKIP_FILES = {'rows2.js', 'rows2b.js', 'en.js', 'test2.js'}
DEV = re.compile(r'btv|edSave|\bed[A-Z]\w*|REPO_WINS|ROWSRC|toast\(\'Đã lưu chỗ sửa')

def strings(src):
    """quét chuỗi '..' ".." `..` trong JS, bỏ chú thích; trả (vị trí, nội dung, loại)"""
    i, n = 0, len(src)
    while i < n:
        c = src[i]
        if c == '/' and src.startswith('//', i):
            j = src.find('\n', i); i = n if j < 0 else j; continue
        if c == '/' and src.startswith('/*', i):
            j = src.find('*/', i + 2); i = n if j < 0 else j + 2; continue
        if c in '\'"`':
            j, buf = i + 1, []
            while j < n and src[j] != c:
                if src[j] == '\\' and j + 1 < n:
                    nx = src[j + 1]; buf.append({'n': '\n', 't': '\t'}.get(nx, nx)); j += 2; continue
                if c != '`' and src[j] == '\n': break
                buf.append(src[j]); j += 1
            yield i, ''.join(buf), c
            i = j + 1; continue
        i += 1

def pieces(s, q):
    if q == '`':
        s = re.sub(r'\$\{[^}]*\}', '\x00', s)
    if '<' in s and re.search(r'<[a-zA-Z/!]', s):
        s = re.sub(r'<style[\s\S]*?</style>', '\x00', s)
        parts = re.split(r'<[^>]*>', s)
    else:
        parts = [s]
    parts = [p.split('>')[-1].split('<')[0] for p in parts] + re.findall(r'(?:title|placeholder|aria-label|alt)="([^"]+)"', s)
    for p in parts:
        for x in p.split('\x00'):
            x = x.strip()
            if x and VN.search(x) and len(x) < 600:
                yield x

VI_ROWS = []

def main():
    out, seen = [], {}
    rows = set()
    for f in ('en_p1.json', 'en_p2.json'):
        pass
    ten = json.load(open(ROOT / 'xula2/en_ten.json'))
    files = [ROOT / 'nguon.html'] + sorted(p for p in (ROOT / 'xula2').glob('*.js') if p.name not in SKIP_FILES)
    for fp in files:
        src = fp.read_text(encoding='utf-8')
        if fp.name == 'nguon.html':
            # bỏ bảng thoại, phần HTML tĩnh quét text node
            src = re.sub(r'const ROWS_DEFAULT=/\*ROWS\*/.*', lambda m: ' ' * len(m.group(0)), src)
            html = re.sub(r'<script[\s\S]*?</script>|<style[\s\S]*?</style>', lambda m: ' ' * len(m.group(0)), src)
            for m in re.finditer(r'>([^<>]+)<', html):
                t = m.group(1).strip()
                if t and VN.search(t):
                    out.append((fp.name, src.count('\n', 0, m.start()) + 1, t, False))
            for m in re.finditer(r'(?:title|placeholder|aria-label|alt|content)="([^"]+)"', html):
                if VN.search(m.group(1)):
                    out.append((fp.name, src.count('\n', 0, m.start()) + 1, m.group(1), False))
            js = ''.join(m.group(0) if m.group(0).startswith('<script') else ' ' * len(m.group(0)) for m in re.finditer(r'<script[\s\S]*?</script>|[\s\S]', src))
        else:
            js = src
        lines = js.split('\n')
        for pos, s, q in strings(js):
            ln = js.count('\n', 0, pos) + 1
            if DEV.search(lines[ln - 1]): continue
            end = pos + len(s) + 2
            split = bool(re.match(r'\s*\+', js[end:end + 3])) or bool(re.search(r'\+\s*$', js[max(0, pos - 3):pos])) or (q == '`' and '${' in s)
            for x in pieces(s, q):
                out.append((fp.name, ln, x, split))
    res = []
    vi = set()
    for v in VI_ROWS: vi.add(v.strip())
    for f, ln, t, sp in out:
        if t in ten or t in vi: continue
        if t in seen:
            seen[t][1].append(f'{f}:{ln}'); seen[t][2] = seen[t][2] or sp; continue
        seen[t] = [t, [f'{f}:{ln}'], sp]; res.append(seen[t])
    return res

if __name__ == '__main__':
    from openpyxl import load_workbook
    src_x = [a for a in sys.argv[1:] if a.endswith('.xlsx') and 'da_dich' in a]
    if src_x:
        wb = load_workbook(src_x[0], read_only=True)
        for sh in ('Phần 1', 'Phần 2'):
            rs = list(wb[sh].iter_rows(values_only=True)); h = [str(x or '') for x in rs[0]]
            for r in rs[1:]:
                for c in ('VI', 'VI phụ'):
                    if c in h and r[h.index(c)]: VI_ROWS.append(str(r[h.index(c)]))
    res = main()
    pass
    if '--json' in sys.argv:
        from collections import Counter
        print(len(res), sum(len(r[0]) for r in res))
        print(Counter(r[1][0].split(':')[0] for r in res))
        for r in res[:: max(1, len(res)//40)]: print(r[1][0], '|', r[0][:90])
    else:
        json.dump(res, open(sys.argv[1], 'w'), ensure_ascii=False)
