#!/usr/bin/env python3
"""Nhập bản dịch tiếng Anh từ file Excel (xuất bởi Hem47_thoai_VI_ban_cuoi_de_dich.xlsx).

Cách dùng:
    python3 tools/nhap_en.py Hem47_thoai_EN.xlsx

Sinh ra (chỉ gồm những dòng đã có chữ EN, dòng trống thì game giữ tiếng Việt):
    xula2/en_p1.json   { "mã": {"loi": "...", "sub": "...", "ai": "..."} }
    xula2/en_p2.json   như trên cho Phần 2
    xula2/en_ten.json  { "Tên VI": "Tên EN" }

Kiểm tra trước khi ghi:
    - ký hiệu {me} {ban} {} [[...]] trong VI phải còn đủ trong EN
    - số dấu | (từ khóa tra web) phải bằng nhau
    - mã trùng / mã lạ
Lỗi chỉ báo ra màn hình, vẫn ghi phần đúng; dùng --strict để dừng khi có lỗi.
"""
import json, re, sys
from pathlib import Path

try:
    from openpyxl import load_workbook
except ImportError:
    sys.exit('Cần openpyxl: pip install openpyxl')

ROOT = Path(__file__).resolve().parent.parent
TOK = re.compile(r'\{me\}|\{ban\}|\{\}|\[\[[^\]]*\]\]')


def tokens(s):
    return sorted(t if not t.startswith('[[') else '[[]]' for t in TOK.findall(s or ''))


def read_sheet(ws):
    rows = list(ws.iter_rows(values_only=True))
    hdr = [str(h or '').strip() for h in rows[0]]
    col = {h: i for i, h in enumerate(hdr)}
    need = ['Mã', 'VI', 'VI phụ', 'EN', 'EN phụ', 'EN tiêu đề']
    miss = [n for n in need if n not in col]
    if miss:
        sys.exit(f'Sheet "{ws.title}" thiếu cột: {", ".join(miss)}')
    for r in rows[1:]:
        g = lambda n: ('' if r[col[n]] is None else str(r[col[n]])).strip() if col[n] < len(r) else ''
        yield g('Mã'), g('VI'), g('VI phụ'), g('EN'), g('EN phụ'), g('EN tiêu đề')


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    strict = '--strict' in sys.argv
    if not args:
        sys.exit(__doc__)
    wb = load_workbook(args[0], read_only=True, data_only=True)
    warn = []
    for sheet, out in (('Phần 1', 'en_p1.json'), ('Phần 2', 'en_p2.json')):
        if sheet not in wb.sheetnames:
            continue
        res, seen, n = {}, set(), 0
        for ma, vi, vis, en, ens, ent in read_sheet(wb[sheet]):
            if not ma:
                continue
            if ma in seen:
                warn.append(f'{sheet} · {ma}: mã bị trùng'); continue
            seen.add(ma)
            o = {}
            if en:
                if tokens(vi) != tokens(en):
                    warn.append(f'{sheet} · {ma}: ký hiệu không khớp VI {tokens(vi)} ≠ EN {tokens(en)}')
                if vi.count('|') != en.count('|'):
                    warn.append(f'{sheet} · {ma}: số dấu | khác nhau ({vi.count("|")} ≠ {en.count("|")})')
                o['loi'] = en
            if ens:
                o['sub'] = ens
            if ent:
                o['ai'] = ent
            if o:
                res[ma] = o; n += 1
        (ROOT / 'xula2' / out).write_text(json.dumps(res, ensure_ascii=False, indent=0), encoding='utf-8')
        print(f'{sheet}: {n} dòng đã dịch → xula2/{out}')
    if 'Tên' in wb.sheetnames:
        ten = {}
        for r in list(wb['Tên'].iter_rows(values_only=True))[1:]:
            if r and r[0] and len(r) > 1 and r[1]:
                ten[str(r[0]).strip()] = str(r[1]).strip()
        (ROOT / 'xula2' / 'en_ten.json').write_text(json.dumps(ten, ensure_ascii=False, indent=0), encoding='utf-8')
        print(f'Tên: {len(ten)} tên → xula2/en_ten.json')
    if 'Giao diện' in wb.sheetnames:
        rs = list(wb['Giao diện'].iter_rows(values_only=True)); h = [str(x or '').strip() for x in rs[0]]
        iv, ie = h.index('VI'), h.index('EN')
        ui = {}
        for r in rs[1:]:
            vi = str(r[iv] or '').strip(); en = str(r[ie] or '').strip()
            if vi and en and vi != en:
                if vi.count('%') != en.count('%'):
                    warn.append(f'Giao diện · {vi[:40]}: số dấu % khác nhau')
                ui[vi] = en
        (ROOT / 'xula2' / 'en_ui.json').write_text(json.dumps(ui, ensure_ascii=False, indent=0), encoding='utf-8')
        print(f'Giao diện: {len(ui)} chữ → xula2/en_ui.json')
    if warn:
        print(f'\n{len(warn)} chỗ cần xem lại:')
        for w in warn:
            print(' -', w)
        if strict:
            sys.exit(1)


if __name__ == '__main__':
    main()
