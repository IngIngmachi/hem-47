#!/usr/bin/env python3
"""
Hẻm 47 · tạo giọng đọc cho câu thoại (kieu = 'thoai') bằng Gemini TTS.

- Lấy câu thoại từ ĐÚNG bảng game đang chạy: Phần 1 (nguon.html + chữ bà đã sửa trong xula2/p1_thu.json)
  và Phần 2 (xula2/rows2.js, rows2b.js, data2.js, p2_thu.js, thietbi2.js). Không đọc câu nghĩ trong đầu, dẫn truyện.
- Mỗi câu một file nhỏ giong/<ma>.m4a (AAC mono, iPhone/Android đều phát được). Có rồi thì bỏ qua (chạy tiếp được).
- Cảm xúc: tự đoán theo câu chữ, bà sửa ở cột "cam_xuc_ba_sua" trong giong/danh_sach.csv rồi chạy lại.
- Trang nghe thử: giong/nghe_thu.html

Chạy:
  python3 tools/tao_giong.py --ds              # chỉ xuất giong/danh_sach.csv (không gọi API)
  GEMINI_API_KEY=... python3 tools/tao_giong.py --thu 10     # làm thử 10 câu, mỗi người một câu
  GEMINI_API_KEY=... python3 tools/tao_giong.py --tat-ca     # làm hết
  ... --lam-lai x_mo_16,h3_vinh_01             # xóa rồi làm lại vài câu
Cần: python3, node, ffmpeg.
"""
import argparse, base64, csv, json, os, re, subprocess, sys, time, urllib.request, urllib.error
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'giong'
MODEL = os.environ.get('GIONG_MODEL', 'gemini-3.8-flash-tts')
API = 'https://generativelanguage.googleapis.com/v1beta/interactions'

# ---------- hồ sơ giọng: khóa = tên đúng như cột "ai" trong game ----------
NAM = 'Southern Vietnamese (Saigon) accent, natural spoken Vietnamese, not a news reader'
P = lambda voice, who: {'voice': voice, 'who': who}
GIONG = {
  'Bà Sáu':        P('Gacrux',   'a frail 78-year-old Saigon grandmother: clearly elderly voice, thin, breathy and a little shaky, slow, soft trailing endings, warm'),
  'Cô Thoa':       P('Sulafat',  'a 52-year-old grocery-shop mother, weary, low voice, tender toward her children'),
  'Hạnh Bánh Mì':  P('Despina',  'a 36-year-old banh mi seller, quick and chatty, worried about her family'),
  'Diễm Nail':     P('Laomedeia','a 24-year-old nail-salon girl, playful, gossipy, quick'),
  'Tám Hớt Tóc':   P('Algenib',  'a 65-year-old barber, old raspy voice, slow, plain-spoken'),
  'Lộc':           {**P('Iapetus',  'a 42-year-old labourer, low hoarse voice, uneasy, speaks quietly'), 'cu': True},   # bà chọn kiểu đọc bản cũ
  'Anh Lộc':       P('Iapetus',  'a 42-year-old labourer, low hoarse voice, uneasy, speaks quietly'),
  'Khoa':          P('Charon',   'a 35-year-old smooth recruiter, low, polite but cold and dangerous'),
  'Bin':           P('Puck',     'a 19-year-old ride-hailing driver, fast, honest, blunt'),
  'Lâm':           P('Achird',   'a 25-year-old young man, tired, thoughtful, medium-low voice'),
  'Lâm (nghĩ)':    {**P('Achird', 'the same 25-year-old young man (Lâm)'), 'nghi': True},
  'Ngân (nghĩ)':   {**P('Leda',   'the same 23-year-old young woman (Ngân)'), 'nghi': True},
  'Ngân':          P('Leda',     'a 23-year-old young woman, gentle but resilient, holding back fear'),
  'Phương':        P('Autonoe',  'a 22-year-old livestream seller, acts careless but is scared inside'),
  'Tú':            P('Orus',     'a 38-year-old media man, slick, pragmatic, a bit condescending'),
  'Hương':         P('Kore',     'a 32-year-old investigative journalist, sharp, calm, decisive'),
  'Đại úy Vinh':   P('Alnilam',  'a 40-year-old police captain, steady, serious, clear diction'),
  'Thủy':          P('Callirrhoe','a 20-year-old girl from the Mekong Delta, soft, shy, choked up'),
  'Phát':          P('Umbriel',  'a 26-year-old office worker, nervous, speaks fast and wary'),
  'Chị Bảy':       P('Vindemiatrix','a 45-year-old compound supervisor, cold, cutting, authoritarian'),
  'Sẹo':           P('Fenrir',   'a 30-year-old guard, gruff, growling, rough'),
  'Tài xế Thoại':  P('Rasalgethi','a 55-year-old border boatman, weathered low voice, speaks softly at night'),
  'Khang':         P('Enceladus','a 22-year-old prisoner, exhausted, hoarse'),
  'Nhi':           P('Erinome',  'a 19-year-old girl from Tiền Giang, honest, frightened'),
  'Toàn':          P('Sadaltager','a 26-year-old builder, blunt, tense'),
  'Chị Huệ':       P('Achernar', 'a 49-year-old woman, tired, unwell, slow'),
  'Tí':            P('Zubenelgenubi','a 16-year-old boy, the youngest, trembling, scared'),
  'Ông Chủ Lò':    P('Schedar',  'a deep flat cold voice, as if through a voice changer'),
}
MAC_DINH_NAM = P('Sadachbia', 'an ordinary Saigon man')
MAC_DINH_NU = P('Pulcherrima', 'an ordinary Saigon woman')
NU_TEN = ('Bà', 'Cô', 'Chị', 'Người lạ nữ', 'Cô gái')

# ---------- lấy câu thoại từ game ----------
NODE = r"""
const vm=require('vm'),fs=require('fs');const root=process.argv[1];
const s=fs.readFileSync(root+'/nguon.html','utf8');const i=s.indexOf('/*ROWS*/')+8;const j=s.indexOf('\n',i);
const P1=JSON.parse(s.slice(i,j).trim().replace(/;$/,''));
let thu={}; try{thu=JSON.parse(fs.readFileSync(root+'/xula2/p1_thu.json','utf8'));}catch(e){}
const deep=()=>{const f=function(){};return new Proxy(f,{get:(t,k)=>k===Symbol.toPrimitive?()=>'':k in t?t[k]:(t[k]=deep()),apply:()=>deep(),construct:()=>deep(),set:(t,k,v)=>(t[k]=v,true)});};
const ctx={console,window:{},tutorial:deep(),hud:deep(),objective:deep(),MUC:deep(),board:deep(),renderPhone:deep(),threadOf:deep(),P1R:deep(),P2DATA:deep(),P2DATA:deep(),P2DATA:deep(),P2DATA:deep(),P2DATA:deep(),P2DATA:deep(),P2DATA:deep(),P2DATA:deep(),document:deep(),NPC:Object.fromEntries(["basau", "bin", "diem", "hanh", "loc", "tam", "thoa"].map(k=>[k,deep()])),ROOMS:Object.fromEntries(["taphoa", "vp12"].map(k=>[k,deep()])),P2GAMES:deep(),IMG:deep(),ACH:deep()};ctx.self=ctx;vm.createContext(ctx);
for(const f of ['rows2.js','rows2b.js','data2.js','p2_thu.js','thietbi2.js']){
  try{vm.runInContext(fs.readFileSync(root+'/xula2/'+f,'utf8'),ctx,{filename:f});}catch(e){console.error('bỏ qua phần lỗi ở',f,':',e.message);}
}
const P2=vm.runInContext('typeof P2ROWS!=="undefined"?P2ROWS:[]',ctx);
const out=[];
const txt=r=>{ const o=thu[r.ma]; return String(typeof o==='string'?o:(o&&o.loi)||r.loi||'').replace(/\[\[(.+?)\]\]/g,'$1').replace(/\{\w+\}/g,'').trim(); };
const ke=(L,k)=>{ const say=x=>x.kieu==='thoai'?(String(x.ai||'').replace(/^#/,'')+': "'+txt(x)+'"'):x.kieu==='nghi'?('(Lâm nghĩ: '+txt(x)+')'):txt(x);
  const tr=[],sa=[]; for(let i=k-1;i>=0&&tr.length<4;i--){ const x=L[i]; if(x.canh!==L[k].canh) break; if(['thoai','mota','nghi'].includes(x.kieu)&&txt(x)) tr.unshift(say(x)); }
  for(let i=k+1;i<L.length&&sa.length<1;i++){ const x=L[i]; if(x.canh!==L[k].canh) break; if(['thoai','mota','nghi'].includes(x.kieu)&&txt(x)) sa.push(say(x)); } return {truoc:tr.join(' / '),sau:sa.join(' / ')}; };
P1.forEach((r,k)=>{ if(r.kieu==='thoai') out.push({ma:r.ma,kieu:'thoai',phan:1,canh:r.canh||'',ai:r.ai,loi:txt(r),...ke(P1,k)});
  else if(r.kieu==='nghi') out.push({ma:r.ma,kieu:'nghi',phan:1,canh:r.canh||'',ai:'Lâm (nghĩ)',loi:txt(r),...ke(P1,k)}); });
/* Phần 2: câu nghĩ là của người đang nhập vai: nhánh A (x_a_) là Ngân, nhánh B (x_b_) là Lâm, còn lại làm cả hai giọng (file <ma>__ngan) */
P2.forEach((r,k)=>{ if(r.kieu==='thoai') out.push({ma:r.ma,kieu:'thoai',phan:2,canh:r.canh||'',ai:r.ai,loi:txt(r),...ke(P2,k)});
  else if(r.kieu==='nghi'){ const c=ke(P2,k), m=r.ma||'';
    if(!/^x_a_/.test(m)) out.push({ma:m,kieu:'nghi',phan:2,canh:r.canh||'',ai:'Lâm (nghĩ)',loi:txt(r),...c});
    if(!/^x_b_/.test(m)) out.push({ma:/^x_a_/.test(m)?m:m+'__ngan',kieu:'nghi',phan:2,canh:r.canh||'',ai:'Ngân (nghĩ)',loi:txt(r),...c}); } });
process.stdout.write(JSON.stringify(out));
"""

def lay_thoai():
    js = subprocess.run(['node', '-e', NODE, str(ROOT)], capture_output=True, text=True)
    if js.returncode: sys.exit('Không đọc được bảng thoại:\n' + js.stderr)
    if js.stderr.strip(): print(js.stderr.strip())
    rows, seen = [], set()
    for r in json.loads(js.stdout):
        if r['ma'] in seen: continue
        seen.add(r['ma'])
        ai = str(r['ai'] or '').lstrip('#').strip()
        loi = re.sub(r'\[\[(.+?)\]\]', r'\1', str(r['loi'] or ''))
        if not ai or ai == '{me}' or not loi.strip(): continue   # nhân vật người chơi đang nhập vai thì để im
        can_xem = '{' in loi
        loi = re.sub(r'\{\w+\}', '', loi).strip()
        rows.append({**r, 'ai': ai, 'loi': loi, 'can_xem': 'có {…} – nghe lại' if can_xem else ''})
    return rows

def doan_cam_xuc(loi):
    t = loi.lower()
    if re.search(r'(cút|im mồm|đ[ồo] chó|mày|câm|đánh|giết)', t) or loi.count('!') >= 2: return 'angry, harsh'
    if re.search(r'(cứu|chạy|nhanh lên|trời ơi|coi chừng)', t): return 'panicked, urgent, breathless'
    if re.search(r'(xin lỗi|thương|nhớ|khóc|tội)', t) or '…' in loi or '...' in loi: return 'sad, hesitant, quiet'
    if re.search(r'(suỵt|nhỏ thôi|đừng nói)', t): return 'whispering'
    if '!' in loi: return 'emphatic, raised voice'
    if loi.rstrip().endswith('?'): return 'questioning, curious'
    return 'infer the emotion from the scene context'

def ho_so(ai):
    if ai in GIONG: return GIONG[ai]
    return MAC_DINH_NU if ai.startswith(NU_TEN) else MAC_DINH_NAM

def xuat_ds(rows):
    OUT.mkdir(exist_ok=True)
    f = OUT / 'danh_sach.csv'; cu = {}
    if f.exists():
        for r in csv.DictReader(open(f, encoding='utf-8-sig')): cu[r['ma']] = r.get('cam_xuc_ba_sua', '')
    with open(f, 'w', encoding='utf-8-sig', newline='') as fh:
        w = csv.writer(fh); w.writerow(['ma', 'phan', 'canh', 'ai', 'giong', 'loi', 'cam_xuc_tu_dong', 'cam_xuc_ba_sua', 'ghi_chu'])
        for r in rows:
            w.writerow([r['ma'], r['phan'], r['canh'], r['ai'], ho_so(r['ai'])['voice'], r['loi'], doan_cam_xuc(r['loi']), cu.get(r['ma'], ''), r['can_xem']])
    return {k: v for k, v in cu.items() if v}

def goi_api(key, r, cx):
    hs = ho_so(r['ai'])
    ctx = (f" What just happened in the scene: {r.get('truoc','')}." if r.get('truoc') else '') + (f" What comes right after: {r.get('sau','')}." if r.get('sau') else '')
    if hs.get('nghi'):
        style = (f"{NAM}. Speaker: {hs['who']}, thinking silently to themselves.{ctx} This is an INNER MONOLOGUE, not spoken to anyone:"
                 f" quiet, low, close to the microphone, slow and introspective, almost a murmur, pensive pauses, brooding; never performed, never projected. Extra direction: {cx}.")
    elif hs.get('cu'):
        style = f"{NAM}. Speaker: {hs['who']}. Emotion and delivery for this line: {cx}."
    else: style = (f"{NAM}. Speaker: {hs['who']}.{ctx} Act this ONE line as a real person in that exact moment, like natural dialogue in a realistic film:"
                 f" understated, not theatrical, not a radio drama, no exaggerated intonation; let the situation decide the tension (fear, secrecy, grief, threat) and keep it real."
                 f" Pace and pauses like real speech. Extra direction: {cx}.")
    body = {'model': MODEL,
            'input': [{'type': 'user_input', 'content': [{'type': 'text', 'text': r['loi'],
                       'annotations': [{'type': 'speech_metadata', 'style': style}]}]}],
            'response_format': {'type': 'audio'},
            'generation_config': {'speech_config': [{'voice': hs['voice']}]}}
    req = urllib.request.Request(API, data=json.dumps(body).encode(), method='POST',
                                 headers={'Content-Type': 'application/json', 'x-goog-api-key': key})
    for lan in range(5):
        try:
            with urllib.request.urlopen(req, timeout=120) as resp: res = json.loads(resp.read())
            aud = [c for s in res.get('steps', []) if s.get('type') == 'model_output' for c in s.get('content', []) if c.get('type') == 'audio']
            if not aud: raise RuntimeError('API không trả âm thanh: ' + json.dumps(res)[:400])
            return base64.b64decode(aud[-1]['data'])
        except urllib.error.HTTPError as e:
            msg = e.read().decode(errors='ignore')[:600]
            if e.code in (429, 500, 502, 503, 504) and lan < 4: time.sleep(5 * (lan + 1) ** 2); continue
            raise RuntimeError(f'HTTP {e.code}: {msg}')
        except (urllib.error.URLError, TimeoutError) as e:
            if lan < 4: time.sleep(5 * (lan + 1)); continue
            raise

def luu_m4a(wav_bytes, dst):
    tmp = dst.with_suffix('.wav'); tmp.write_bytes(wav_bytes)
    if wav_bytes[:4] != b'RIFF':   # phòng khi API trả PCM thô
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 's16le', '-ar', '24000', '-ac', '1', '-i', str(tmp), str(tmp) + '.wav'], check=True)
        os.replace(str(tmp) + '.wav', tmp)
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', str(tmp), '-af', 'silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse',
                    '-ac', '1', '-c:a', 'aac', '-b:a', '40k', str(dst)], check=True)
    tmp.unlink()
    d = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', str(dst)], capture_output=True, text=True).stdout.strip()
    return round(float(d or 0), 2)

def trang_nghe(rows, idx):
    it = [r for r in rows if r['ma'] in idx]
    h = ['<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Nghe thử giọng</title>',
         '<style>body{font:16px system-ui;background:#16110f;color:#f3e7d7;margin:0;padding:16px;max-width:760px}h1{font-size:20px}.r{border-bottom:1px solid #3a2c25;padding:12px 0}.a{color:#f0b25c;font-weight:700}.m{color:#998;font-size:12px}audio{width:100%;margin-top:6px}</style>',
         f'<h1>Hẻm 47 · nghe thử giọng ({len(it)} câu)</h1>']
    for r in it:
        h.append(f'<div class="r"><span class="a">{r["ai"]}</span> <span class="m">{r["ma"]} · {idx[r["ma"]]["cx"]}</span><div>{r["loi"]}</div><audio controls preload="none" src="{r["ma"]}.m4a"></audio>' + (f'<div class="m">bản cũ:</div><audio controls preload="none" src="cu/{r["ma"]}.m4a"></audio>' if (OUT / 'cu' / f'{r["ma"]}.m4a').exists() else '') + '</div>')
    (OUT / 'nghe_thu.html').write_text('\n'.join(h), encoding='utf-8')

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--ds', action='store_true'); ap.add_argument('--thu', type=int, default=0)
    ap.add_argument('--tat-ca', action='store_true'); ap.add_argument('--lam-lai', default=''); ap.add_argument('--kieu', default='')
    a = ap.parse_args()
    rows = lay_thoai(); sua = xuat_ds(rows)
    print(f'Câu cần giọng: {len(rows)} (thoại {sum(r.get("kieu")=="thoai" for r in rows)}, độc thoại {sum(r.get("kieu")=="nghi" for r in rows)}) → giong/danh_sach.csv')
    if a.ds: return
    key = os.environ.get('GEMINI_API_KEY', '')
    if not key: sys.exit('Thiếu GEMINI_API_KEY.')
    for m in filter(None, a.lam_lai.split(',')):
        (OUT / f'{m}.m4a').unlink(missing_ok=True)
    if a.thu:   # mỗi nhân vật chính 1 câu, ưu tiên câu có cảm xúc rõ
        chon, ai_da = [], set()
        for r in sorted(rows, key=lambda r: doan_cam_xuc(r['loi']) == 'infer the emotion from the scene context'):
            if (not a.kieu or r.get('kieu') == a.kieu) and r['ai'] in GIONG and r['ai'] not in ai_da and 25 < len(r['loi']) < 160:
                chon.append(r); ai_da.add(r['ai'])
            if len(chon) >= a.thu: break
    elif a.tat_ca: chon = [r for r in rows if not a.kieu or r.get('kieu') == a.kieu]
    elif a.lam_lai: ds = set(filter(None, a.lam_lai.split(','))); chon = [r for r in rows if r['ma'] in ds]
    else: sys.exit('Chọn --ds, --thu N hoặc --tat-ca.')
    fidx = OUT / 'index.json'; idx = json.loads(fidx.read_text()) if fidx.exists() else {}
    loi = 0
    giu = set((OUT / 'giu.txt').read_text().split()) if (OUT / 'giu.txt').exists() else set()   # câu bà đã chọn giữ, không làm lại
    for n, r in enumerate(chon, 1):
        dst = OUT / f'{r["ma"]}.m4a'; cx = sua.get(r['ma']) or doan_cam_xuc(r['loi'])
        V = 2
        if r['ma'] in giu and dst.exists(): continue
        if dst.exists() and r['ma'] in idx and idx[r['ma']].get('cx') == cx and idx[r['ma']].get('v') == V: continue
        try:
            dur = luu_m4a(goi_api(key, r, cx), dst)
            idx[r['ma']] = {'d': dur, 'cx': cx, 'ai': r['ai'], 'v': V}
            print(f'[{n}/{len(chon)}] {r["ai"]}: {r["loi"][:50]}… ({dur}s)')
            fidx.write_text(json.dumps(idx, ensure_ascii=False, indent=0))
        except Exception as e:
            loi += 1; print(f'[{n}/{len(chon)}] LỖI {r["ma"]}: {e}')
            if loi >= 3 and n <= 3: sys.exit('Lỗi liên tục ngay từ đầu, dừng lại để kiểm tra (key / tên model / định dạng API).')
    trang_nghe(rows, idx)
    print(f'Xong. Mở giong/nghe_thu.html để nghe. Lỗi: {loi}')

if __name__ == '__main__':
    main()
