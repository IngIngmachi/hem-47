#!/usr/bin/env python3
"""Tạo trang chơi thử Phần 2 (taotestcaigiketao.html) từ index.html.

Chỉ sửa vài chỗ nhỏ trong khung Phần 1 để nó chạy được cả Phần 2:
 - TOTAL_DAYS, SAVEKEY đổi từ const sang let; ô lưu trên tài khoản dùng biến SAVESLOT.
 - Tên và hình người đang chơi đi qua biến ME / MEK (Phần 2 nhánh A có lúc chơi Ngân).
 - Gắn các file xula2/*.js ở cuối trang. Phần 2 chỉ bật khi bấm nút Phần 2 ở màn đầu.
Chạy: python3 tools/mk_p2.py
"""
import re, sys, pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
src = (ROOT / 'index.html').read_text(encoding='utf-8')
s = src

def rep(old, new, count=None, must=True):
    global s
    n = s.count(old)
    if must and n == 0:
        sys.exit('KHÔNG THẤY: ' + old[:80])
    if count is not None and n != count:
        sys.exit(f'SỐ LẦN SAI ({n}≠{count}): ' + old[:80])
    s = s.replace(old, new)

rep("const TOTAL_DAYS=30,", "let TOTAL_DAYS=30; const ", 1)
rep("const SAVEKEY='tgl_v6_save';", "let SAVEKEY='tgl_v6_save', SAVESLOT='save';", 1)
rep("slot:'save'", "slot:SAVESLOT")
rep(".eq('slot','save')", ".eq('slot',SAVESLOT)")
rep("const ping=()=>{ tone(1320,.12,.04); tone(1760,.15,.035,'sine',.11); }, blip=", "let ping=()=>{ tone(1320,.12,.04); tone(1760,.15,.035,'sine',.11); }; const blip=", 1)
rep("const badgeOn=()=>{ $('badge').hidden=false; }, badgeOff=", "let badgeOn=()=>{ $('badge').hidden=false; }; const badgeOff=", 1)
rep("let S=fresh();", "let S=fresh(); let ME='Lâm', MEK='lam';", 1)
rep("drawChar(g,'lam',PL.x", "drawChar(g,MEK,PL.x")
rep("kind==='nghi'?'Lâm nghĩ'", "kind==='nghi'?ME+' nghĩ'")
rep("const nm=kind==='nghi'?'Lâm':name", "const nm=kind==='nghi'?ME:name", 1)
rep("faceFor(face||'Lâm')", "faceFor(face||ME)", 1)
rep("$('dNm').textContent=title||'Lâm'", "$('dNm').textContent=title||ME", 1)
rep(",false,h.l,'Lâm')", ",false,h.l,ME)")
rep(",npc?h.l:'Lâm')", ",npc?h.l:ME)", 1)

# v6: việc "Trực tiệm giùm chú Tám" chỉ mở sau khi đã nghe Phương kể (tránh lộ trước)
rep("{id:'ng_tam_truc',h:2,hx:2,w:[8,17],who:'tam',k:'ng_tam_truc',t:'Trực tiệm giùm chú Tám',ngoai:1,cost:120}", "{id:'ng_tam_truc',h:2,hx:2,w:[8,17],who:'tam',k:'ng_tam_truc',t:'Trực tiệm giùm chú Tám',ngoai:1,cost:120,c:'co:phuong_khai'}", 1)
rep("'<div class=\"cd-s\">Điện thoại của Lâm</div>'", "'<div class=\"cd-s\">Điện thoại của '+esc(ME)+'</div>'", 1)
# lời Phần 1 đang chờ duyệt: chỉ áp trên trang thử (xula2/p1_thu.json: mã -> lời mới)
import json as _json
_ov = ROOT / 'xula2' / 'p1_thu.json'
if _ov.exists():
    OV = _json.loads(_ov.read_text(encoding='utf-8'))
    i = s.index('/*ROWS*/') + 8; j = s.index('\n', i)
    line = s[i:j]; tail = ''
    while line and line[-1] in ' ;\r': tail = line[-1] + tail; line = line[:-1]
    rows = _json.loads(line); n = 0
    have = {r.get('ma') for r in rows}
    for r in rows:
        v = OV.get(r.get('ma'))
        if v is None: continue
        if isinstance(v, dict): r.update({k: v[k] for k in v if k != 'after'})
        else: r['loi'] = v
        n += 1
    # dòng mới: {"ma_moi": {"after": "ma_cu", "loi": ..., "hien": ..., ...}} chèn ngay sau dòng cũ, kế thừa cảnh/kiểu/ai
    for k, v in OV.items():
        if k in have or not isinstance(v, dict) or 'after' not in v: continue
        idx = next(x for x, r in enumerate(rows) if r.get('ma') == v['after'])
        nr = dict(rows[idx]); nr.update({kk: vv for kk, vv in v.items() if kk != 'after'}); nr['ma'] = k; nr['stt'] = rows[idx].get('stt', 0) + 1
        rows.insert(idx + 1, nr); have.add(k); n += 1
    miss = set(OV) - have
    if miss: sys.exit('p1_thu.json có mã không thấy: ' + ', '.join(sorted(miss)))
    s = s[:i] + _json.dumps(rows, ensure_ascii=False) + tail + s[j:]
    print('Áp lời thử Phần 1:', n)

# trang thử: không cho máy tìm kiếm lập chỉ mục, tiêu đề riêng
rep('<title>Hẻm 47: Thế Giới Lặng</title>', '<title>Hẻm 47 · bản thử Phần 2</title><meta name="robots" content="noindex,nofollow">', 1)

# gắn Phần 2 sau script chính
tag = '<script src="xula2/p2.js?v=__V__"></script><script src="xula2/games2.js?v=__V__"></script><script src="xula2/rows2.js?v=__V__"></script><script src="xula2/rows2b.js?v=__V__"></script><script src="xula2/data2.js?v=__V__"></script><script src="xula2/thietbi2.js?v=__V__"></script><script src="xula2/test2.js?v=__V__"></script><script src="xula2/bia2.js?v=__V__"></script><script src="xula2/ui2.js?v=__V__"></script><script src="xula2/ui3.js?v=__V__"></script><script src="xula2/p1fix.js?v=__V__"></script><script src="xula2/amb.js?v=__V__"></script><script src="xula2/sfx.js?v=__V__"></script>'
import time
tag = tag.replace('__V__', str(int(time.time())))
i = s.rfind('</body>')
if i < 0:
    s = s + tag
else:
    s = s[:i] + tag + s[i:]

(ROOT / 'taotestcaigiketao.html').write_text(s, encoding='utf-8')
print('Đã tạo taotestcaigiketao.html', len(s))
