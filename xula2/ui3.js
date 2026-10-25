/* ===== ui3: giao diện khám phá mới (thử). Chỉ nạp ở trang test, dùng chung Phần 1 + Phần 2.
   - Thẻ "Mục tiêu hiện tại": thu gọn / mở rộng, dòng Gợi ý (bấm để tới việc chính)
   - Cột nút bên phải: Điện thoại, Ra hẻm, Chờ 1 tiếng, Đi ngủ
   - Ô vị trí góc dưới trái, biểu tượng điểm tương tác trên tranh
   - Điện thoại dọc / ngang: tranh tràn màn hình, nút tròn, menu ☰
   Không đổi cơ chế chơi, không thêm hình. ===== */
(function(){
const SVG=d=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+d+'</svg>';
const MASK=d=>"url(\"data:image/svg+xml,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+d+'</svg>')+"\")";
const P={phone:'<rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M11 18.5h2"/>',back:'<path d="M19 12H5M11 6l-6 6 6 6"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  bed:'<path d="M3 18V7M3 13h18v5M21 13v-2a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="10" r="2"/>',doc:'<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M9.5 12h6M9.5 15.5h6"/>',
  pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',bulb:'<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
  chev:'<path d="M6 9l6 6 6-6"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>'};
/* đường vẽ cho biểu tượng trên tranh (canvas) */
const CP={search:'M10.5 4a6.5 6.5 0 1 0 0 13a6.5 6.5 0 1 0 0-13z M15.5 15.5L20 20',person:'M12 4.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 1 0 0-7z M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5',chat:'M4 5h16v11H9l-5 4z M8.5 10.5h.01 M12 10.5h.01 M15.5 10.5h.01'};
const C2={}; const cpath=k=>C2[k]||(C2[k]=new Path2D(CP[k]));

const css=`
body.u3 #hObj,body.u3 #goMain{display:none!important}
#u3obj{pointer-events:auto;box-sizing:border-box;background:rgba(10,12,18,.82);border:1px solid rgba(239,232,216,.14);border-radius:10px;color:#e6dfcf;font-size:14px;line-height:1.55;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);box-shadow:0 10px 30px rgba(0,0,0,.4);width:380px;max-width:100%;overflow:hidden}
#u3obj[hidden]{display:none}
#u3obj .u3h{display:flex;align-items:center;gap:8px;padding:8px 12px;cursor:pointer;color:#f0b25c;font-size:14px;font-weight:600;user-select:none}
#u3obj .u3h .u3ic{width:17px;height:17px;flex:none}#u3obj .u3h .u3ic svg,#u3obj .u3hint .u3ic svg{width:100%;height:100%}
#u3obj .u3h .u3n{background:#f0b25c;color:#1a1408;border-radius:9px;font-size:11px;font-weight:700;min-width:18px;height:18px;display:inline-grid;place-items:center;padding:0 5px;margin-left:2px}
#u3obj .u3h .u3cv{margin-left:auto;width:16px;height:16px;color:#9aa2b5;transition:transform .2s;transform:rotate(180deg)}
#u3obj.min .u3h .u3cv{transform:none}
#u3obj .u3b{border-top:1px solid rgba(239,232,216,.1);padding:8px 14px 10px}
#u3obj.min .u3b{display:none}
body.u3m #u3obj.min .u3b{display:block;border-top:0;padding:0 12px 8px}
body.u3m #u3obj.min .u3bd,body.u3m #u3obj.min .u3hint{display:none}
body.u3m #u3obj.min .u3sub{margin:0;font-size:11.5px;color:#cfc8b8}
body.u3m #u3obj.min .u3sub .u3ic{display:none}
#u3obj .u3sub{display:flex;gap:8px;align-items:center;font-size:12.5px;letter-spacing:.06em;text-transform:uppercase;color:#efe8d8;margin-bottom:6px}
#u3obj .u3sub .u3ic{width:15px;height:15px;color:#9aa2b5;flex:none}
#u3obj .u3bd{max-height:168px;overflow-y:auto}
#u3obj .u3bd p{margin:0 0 6px;color:#d8d1c1}
#u3obj .u3hint{display:flex;gap:9px;align-items:flex-start;margin-top:8px;padding:8px 10px;border-radius:8px;background:rgba(240,178,92,.08);border:1px solid rgba(240,178,92,.22);cursor:pointer;color:#e6dfcf}
#u3obj .u3hint:hover{background:rgba(240,178,92,.16)}
#u3obj .u3hint .u3ic{width:18px;height:18px;color:#f0b25c;flex:none;margin-top:1px}
#u3obj .u3hint b{display:block;color:#f0b25c;font-weight:600;font-size:12.5px}
#u3loc{position:absolute;left:12px;bottom:12px;z-index:4;display:flex;align-items:center;gap:7px;background:rgba(10,12,18,.78);border:1px solid rgba(239,232,216,.14);border-radius:9px;padding:6px 12px 6px 10px;color:#efe8d8;font-size:13.5px;pointer-events:none;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);max-width:60%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#u3loc::before{content:"";width:15px;height:18px;flex:none;background:#f0b25c;-webkit-mask:${MASK(P.pin)} center/contain no-repeat;mask:${MASK(P.pin)} center/contain no-repeat}
#u3loc[hidden]{display:none}
#u3fx{position:absolute;inset:0;z-index:0;pointer-events:none;background:radial-gradient(ellipse 75% 70% at 50% 45%,transparent 55%,rgba(4,5,9,.5) 100%),linear-gradient(to top,rgba(4,5,9,.55),transparent 24%)}
#u3fx.night{background:radial-gradient(ellipse 75% 70% at 50% 45%,transparent 50%,rgba(4,5,12,.62) 100%),linear-gradient(to top,rgba(4,5,9,.6),transparent 26%),linear-gradient(to bottom,rgba(8,12,28,.35),transparent 30%)}
#u3fx[hidden]{display:none}
/* cột nút bên phải */
body.u3 #phoneBtn,body.u3 .tbtns button{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;width:64px;height:64px;padding:0;box-sizing:border-box;border-radius:10px;background:rgba(10,12,18,.8);border:1px solid rgba(239,232,216,.16);color:#e6dfcf;font:inherit;font-size:11.5px;line-height:1.1;text-align:center;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);cursor:pointer;position:relative}
body.u3 .tbtns button[hidden]{display:none}
body.u3 #phoneBtn:hover,body.u3 .tbtns button:hover{border-color:#f0b25c;color:#fff;background:rgba(20,22,30,.9)}
body.u3 #phoneBtn::before,body.u3 .tbtns button::before{content:"";width:22px;height:22px;flex:none;background:currentColor}
body.u3 #phoneBtn::before{-webkit-mask:${MASK(P.phone)} center/contain no-repeat;mask:${MASK(P.phone)} center/contain no-repeat}
body.u3 #exitBtn::before{-webkit-mask:${MASK(P.back)} center/contain no-repeat!important;mask:${MASK(P.back)} center/contain no-repeat!important}
body.u3 #waitBtn::before{-webkit-mask:${MASK(P.clock)} center/contain no-repeat!important;mask:${MASK(P.clock)} center/contain no-repeat!important}
body.u3 #sleepBtn::before{-webkit-mask:${MASK(P.bed)} center/contain no-repeat!important;mask:${MASK(P.bed)} center/contain no-repeat!important}
body.u3 #exitBtn{color:#f0b25c!important;border-color:rgba(240,178,92,.6)!important}
body.u3 #phoneBtn b{position:absolute;top:-4px;right:-4px;min-width:0;width:12px;height:12px;padding:0;margin:0;border-radius:50%;font-size:0;background:#e2453c;border:2px solid #0a0c12}
body.u3 #phoneBtn b[hidden]{display:none}
body.u3 #phoneBtn{position:absolute;top:12px;right:12px;z-index:5}
body.u3 .tbtns{position:absolute;top:84px;right:12px;left:auto;display:flex;flex-direction:column;gap:8px;max-width:none;background:none!important;border:0!important;padding:0!important;z-index:5}
body.u3 .tbtns button+button{border-radius:10px!important;border-left-color:rgba(239,232,216,.16)}
body.u3 .pan.r{top:62%}body.u3 .pan.l{top:62%}
#u3mb,#u3menu{display:none}
/* máy tính: khung chơi lớn hơn theo chiều cao màn hình */
body.u3d #app{max-width:min(1680px,calc((100dvh - 132px) * 16 / 9 + 32px))}
body.u3d .keys .loc{display:none}
/* ---- điện thoại (dọc + ngang): tranh tràn màn hình ---- */
body.u3m .top{display:none!important}
body.u3m{margin:0!important;overflow:hidden}
body.u3m #app{padding:0!important;max-width:none!important;height:100dvh;display:block}
body.u3m #stage{height:100dvh!important;width:100%;aspect-ratio:auto!important;border-radius:0!important}
body.u3m #stage::after{display:none}
body.u3m #dock,body.u3m .keys{display:none!important}
body.u3m .hud{left:max(10px,env(safe-area-inset-left));top:max(10px,env(safe-area-inset-top));max-width:calc(100% - 90px);gap:8px}
body.u3m .hud .chips{display:inline-flex;flex-wrap:nowrap;white-space:nowrap}
body.u3m .hud .chip{font-size:12.5px;padding:6px 8px}
body.u3m #hNghi{font-size:11px;padding:6px 7px}body.u3m #hNghi b{width:34px!important;margin-left:4px}
body.u3m #u3obj{width:auto;max-width:300px;align-self:flex-start;font-size:13.5px}
body.u3m #u3obj.min{width:max-content}
body.u3m #u3obj .u3h{padding:7px 11px;font-size:13px}
body.u3m #u3mb{display:grid;place-items:center;position:absolute;top:max(10px,env(safe-area-inset-top));right:max(10px,env(safe-area-inset-right));z-index:6;width:42px;height:42px;border-radius:10px;background:rgba(10,12,18,.8);border:1px solid rgba(239,232,216,.16);color:#efe8d8;cursor:pointer;padding:0}
body.u3m #u3mb svg{width:22px;height:22px}
body.u3m #u3menu{position:fixed;z-index:45;top:calc(max(10px,env(safe-area-inset-top)) + 50px);right:max(10px,env(safe-area-inset-right));background:rgba(12,14,22,.96);border:1px solid rgba(239,232,216,.16);border-radius:12px;padding:8px;box-shadow:0 14px 40px rgba(0,0,0,.6);max-height:70dvh;overflow:auto}
body.u3m #u3menu.on{display:block}
body.u3m #u3menu .r{display:flex!important;flex-direction:column;align-items:stretch;gap:4px!important;visibility:visible!important}
body.u3m #u3menu .r>*{width:auto!important;height:auto!important;min-width:0!important;justify-content:flex-start;gap:10px;padding:9px 12px!important;border-radius:8px!important;font-size:14px!important;text-align:left;display:flex;align-items:center}
body.u3m #u3menu .r>[hidden]{display:none!important}
body.u3m #u3menu .r .lb{display:inline!important;position:static!important;opacity:1!important;transform:none!important;pointer-events:none;background:none!important;padding:0!important;font-size:14px!important;color:inherit!important;border:0!important;box-shadow:none!important}
body.u3.u3m #exitBtn,body.u3.u3m #phoneBtn,body.u3.u3m .tbtns button{color:transparent!important;text-indent:-9999px;overflow:hidden}
body.u3.u3m #phoneBtn b{text-indent:0}
body.u3p2 #app .top h1.tua{position:relative}
body.u3p2 #app .top h1.tua img{clip-path:inset(0 0 27% 0)}
body.u3p2 #app .top h1.tua::after{content:"Xứ Lạ";position:absolute;left:0;right:0;bottom:2%;text-align:center;font:600 11px/1 Oswald,"Arial Narrow",sans-serif;letter-spacing:.32em;text-transform:uppercase;color:#f26a5c}
body.u3m #u3menu #hAct{display:block!important;color:#9aa2b5;font-size:12.5px;padding:4px 12px 8px!important;border-bottom:1px solid rgba(239,232,216,.1);margin-bottom:4px}
body.u3m #acctBtn .tx{display:inline!important}
body.u3m #phoneBtn,body.u3m .tbtns button{width:46px!important;height:46px!important;border-radius:50%!important;font-size:0!important;line-height:0!important;color:transparent!important;gap:0;padding:0!important}
body.u3m #phoneBtn::before,body.u3m .tbtns button::before{width:21px;height:21px;background:#e6dfcf}
body.u3m #exitBtn::before{background:#f0b25c}
body.u3m #exitBtn{color:transparent!important}
body.u3m #phoneBtn{top:calc(max(10px,env(safe-area-inset-top)) + 54px)!important;bottom:auto!important;left:auto!important;right:max(10px,env(safe-area-inset-right))!important}
body.u3m .tbtns{top:calc(max(10px,env(safe-area-inset-top)) + 110px)!important;bottom:auto!important;left:auto!important;right:max(10px,env(safe-area-inset-right))!important;gap:10px;flex-wrap:nowrap}
body.u3m #u3loc{left:max(10px,env(safe-area-inset-left));bottom:max(12px,env(safe-area-inset-bottom));font-size:12.5px}
body.u3m.tail .pad{position:fixed;left:max(10px,env(safe-area-inset-left));right:max(10px,env(safe-area-inset-right));bottom:max(10px,env(safe-area-inset-bottom));z-index:12;margin:0}
body.u3m.tail #u3loc{display:none}
body.u3mp .dlg{top:auto!important;bottom:0!important;max-height:52dvh!important;overflow-y:auto}
body.u3ml .hud{max-width:calc(100% - 150px)}
body.u3ml #u3obj{max-width:320px;font-size:12.5px}
body.u3ml #u3obj .u3h{padding:6px 10px;font-size:12.5px}
body.u3ml #u3obj .u3b{max-height:calc(100dvh - 150px);overflow:auto}
body.u3ml #phoneBtn,body.u3ml .tbtns button{width:42px!important;height:42px!important}
body.u3ml #phoneBtn{top:calc(max(8px,env(safe-area-inset-top)) + 50px)!important}
body.u3ml .tbtns{top:calc(max(8px,env(safe-area-inset-top)) + 100px)!important;gap:8px}
body.u3ml .dlg{max-height:58dvh!important;overflow-y:auto}
/* đang mở điện thoại / mini-game thì giấu lớp nổi */
#app:has(#phone:not([hidden])) #u3mb,#app:has(#game:not([hidden])) #u3mb{display:none!important}
body.u3:has(#phone:not([hidden])) #phoneBtn,body.u3:has(#phone:not([hidden])) .tbtns{visibility:hidden}
body.u3m #u3menu #musBtn::after{content:"Nhạc nền";font-size:14px}
#app:has(#phone:not([hidden])) #u3loc,#app:has(#game:not([hidden])) #u3loc,body:has(#dlg:not([hidden])) #u3loc{display:none}
body:has(#cover:not([hidden])) #u3obj,body:has(#cover:not([hidden])) #u3loc,body:has(#cover:not([hidden])) #u3mb{display:none}
`;
const st=document.createElement('style'); st.id='u3css'; st.textContent=css; document.head.appendChild(st);
document.body.classList.add('u3');
/* ===== lớp áo: đồ vật trong hẻm (giấy sổ tay, bảng số nhà xanh, thanh nút sát mép) ===== */
const MK=d=>MASK(d);
const IC2={sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"/>',moon:'<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',wal:'<path d="M4 8h15a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/><path d="M4 8l11-4 1.5 4M16 14h2"/>',warn:'<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18h.01"/>',chk:'<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>'};
const skin=`
/* ===== lớp áo theo bản vẽ tác giả (10/2026): tối, chữ có chân, viền vàng đồng ===== */
:root{--u3gold:#e3b05b;--u3cream:#ece4d2;--u3dim:#a8a293;--u3bg:rgba(12,12,14,.84);--u3line:rgba(236,228,210,.16)}
#u3obj{background:var(--u3bg);border:1px solid var(--u3line);border-radius:8px;color:var(--u3cream);font-family:Newsreader,Georgia,serif;width:300px;box-shadow:0 10px 28px rgba(0,0,0,.45);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}
#u3obj .u3h{padding:10px 14px 9px 16px;color:var(--u3cream);gap:10px;align-items:baseline;border-bottom:1px solid var(--u3line)}
#u3obj.min .u3h{border-bottom:0}
#u3obj .u3t{font:500 17px/1.2 Newsreader,Georgia,serif;text-transform:uppercase;letter-spacing:.05em}
#u3obj .u3n{background:none!important;color:var(--u3dim)!important;font:400 15px/1 Newsreader,serif!important;min-width:0!important;padding:0!important;height:auto!important}
#u3obj .u3cv{color:var(--u3cream)!important;width:18px!important;height:18px!important}
#u3obj .u3b{border:0!important;padding:8px 14px 10px 16px}
#u3obj .u3sub{font:italic 400 13.5px/1.4 Newsreader,serif;letter-spacing:0;text-transform:none;color:var(--u3dim);margin:0 0 6px}
#u3obj .u3sub .u3ic{display:none}
#u3obj ul.u3bd{list-style:none;margin:0;padding:0;max-height:150px;overflow-y:auto}
#u3obj .u3bd li,#u3obj .u3hint{position:relative;padding:5px 0 5px 32px;font:400 15px/1.4 Newsreader,Georgia,serif;color:var(--u3cream)}
#u3obj .u3bd li::before{content:"";position:absolute;left:2px;top:7px;width:16px;height:16px;border-radius:50%;border:1.6px solid rgba(236,228,210,.85);box-sizing:border-box}
#u3obj .u3hint{display:block;margin:0 0 2px;border:0!important;background:none!important;border-radius:0;color:var(--u3gold);cursor:pointer}
#u3obj .u3hint::before{content:"!";position:absolute;left:1px;top:6px;width:18px;height:18px;border-radius:50%;background:var(--u3gold);color:#1a1206;font:700 13px/18px "Be Vietnam Pro",sans-serif;text-align:center}
#u3obj .u3hint span{background:none!important;padding:0}
#u3obj .u3hint:hover span{text-decoration:underline;text-underline-offset:3px}
#u3obj .u3hint:focus-visible{outline:2px solid var(--u3gold);outline-offset:2px}
#u3obj::before{display:none}
#u3obj.min{width:auto}
#u3loc{background:none;border:0;box-shadow:none;padding:0 0 0 30px;display:block;text-align:left;max-width:60%;color:var(--u3cream);text-shadow:0 1px 3px rgba(0,0,0,.9);-webkit-backdrop-filter:none;backdrop-filter:none}
#u3loc::before{display:block;content:"";position:absolute;left:2px;top:3px;width:20px;height:24px;background:var(--u3gold);-webkit-mask:${MK(P.pin)} center/contain no-repeat;mask:${MK(P.pin)} center/contain no-repeat}
#u3loc b{display:block;font:500 18px/1.3 Newsreader,Georgia,serif;text-transform:none;letter-spacing:0}
#u3loc small{display:block;font:400 13.5px/1.35 Newsreader,Georgia,serif;color:var(--u3dim);opacity:1}
/* nút trên tranh: viên thuốc tối viền mảnh, hàng ngang góc phải */
body.u3 .tbtns{top:14px!important;right:16px!important;flex-direction:row!important;gap:10px!important}
body.u3 .tbtns button{flex-direction:row!important;width:auto!important;height:auto!important;gap:10px!important;padding:10px 20px!important;border-radius:9px!important;border:1px solid var(--u3line)!important;background:rgba(10,10,12,.82)!important;color:var(--u3cream)!important;font:400 16px/1 Newsreader,Georgia,serif!important}
body.u3 .tbtns button::before{width:20px!important;height:20px!important;background:var(--u3cream)!important}
body.u3 .tbtns button:hover{border-color:var(--u3gold)!important}
body.u3 #exitBtn{border-color:var(--u3gold)!important;color:var(--u3cream)!important}
body.u3 #exitBtn::before{background:var(--u3gold)!important}
/* ---- máy tính: thanh trên, tranh tràn ngang, thanh dưới ---- */
body.u3d #app{max-width:none!important;padding:0!important;display:flex;flex-direction:column;height:100dvh;box-sizing:border-box;position:relative}
body.u3d .top{flex:none;height:64px;margin:0!important;padding:0 28px!important;background:#0b0b0d;border-bottom:1px solid rgba(236,228,210,.08);display:flex;align-items:center;gap:0}
body.u3d .top h1.tua img{height:44px!important;width:auto}
body.u3d .top>.chips{margin-left:28px!important;border-left:1px solid var(--u3line);padding-left:6px}
body.u3d .top>.chips .chip{font:400 17px/1 Newsreader,Georgia,serif!important;color:var(--u3cream)!important;border-left:1px solid var(--u3line)!important;padding:4px 18px!important;display:inline-flex;align-items:center;gap:10px}
body.u3d .top>.chips #hHoi{border-left:0!important;padding-right:0!important}
body.u3d .top>.chips #hDay{border-left:0!important;padding-left:8px!important}
body.u3d .top>.chips #hClock::before,body.u3d .top>.chips #hMoney::before{content:"";width:22px;height:22px;background:var(--u3gold);-webkit-mask:${MK(IC2.sun)} center/contain no-repeat;mask:${MK(IC2.sun)} center/contain no-repeat}
body.u3d .top>.chips #hClock.dem::before{-webkit-mask-image:${MK(IC2.moon)};mask-image:${MK(IC2.moon)};background:var(--u3cream)}
body.u3d .top>.chips #hMoney::before{-webkit-mask-image:${MK(IC2.wal)};mask-image:${MK(IC2.wal)}}
body.u3d .top>.chips #hMoney{color:var(--u3gold)!important}
body.u3d .top>.chips #hNghi{color:var(--u3cream)!important}
body.u3d .top>.chips #hNghi::after{content:"";order:-1}
body.u3d .top>.chips #hNghi b{width:150px!important;height:12px!important;border-radius:3px!important;border:1px solid rgba(226,69,60,.7);background:rgba(226,69,60,.12)!important}
body.u3d .top>.chips #hNghi i{background:repeating-linear-gradient(90deg,#d8382b 0 30px,transparent 30px 33px)!important}
body.u3d{overflow-x:hidden}
body.u3d .top{flex-wrap:nowrap!important;min-width:0}
body.u3d .top>.chips{flex:0 1 auto!important;min-width:0;overflow:hidden}
body.u3d .top .r{margin-left:auto;gap:2px!important;flex-wrap:nowrap!important;flex:none}
body.u3d .top .r #tsBtn,body.u3d .top .r #edBtn{flex-direction:row!important;min-width:0!important;height:32px!important;padding:0 10px!important;font:400 12.5px/1 "Be Vietnam Pro",sans-serif!important;color:var(--u3dim)!important;border:1px dashed rgba(236,228,210,.25)!important;align-self:center}
body.u3d .top .r #acctBtn .tx{display:none!important}
body.u3d .top .r #acctBtn::after{content:"Tài khoản"}
body.u3d #btvPill{top:auto;bottom:84px;right:16px}

 body.u3d.u3w15 .top{padding:0 16px!important
 body.u3d .top h1.tua img{height:38px!important}
 body.u3d .top>.chips{margin-left:14px!important}
 body.u3d .top>.chips .chip{padding:4px 11px!important;font-size:15.5px!important;gap:7px}
 body.u3d .top .r>button{min-width:56px!important;font-size:12px!important}
}
 body.u3d.u3w15 .keys{gap:16px!important;padding-left:36%!important;font-size:13.5px!important} body.u3d.u3w15 .keys kbd{padding:3px 7px!important;font-size:12.5px!important} 
 body.u3d.u3w15 .keys .k:nth-child(n+6){display:none!important} 
 body.u3d.u3w11 .keys .k:nth-child(n+4){display:none!important} body.u3d.u3w11 .top h1.tua img{height:32px!important} 

 body.u3d.u3w13 #app .top .r>button .lb,body.u3d.u3w13 #app .top .r #musBtn::after,body.u3d.u3w13 #app .top .r #acctBtn::after{display:none!important;content:none!important
 body.u3d #app .top .r>button{min-width:42px!important;height:44px!important}
 body.u3d .top .r>button{min-width:42px!important;height:44px!important}
 body.u3d .top .r #phoneBtn{font-size:0!important}
 body.u3d .top>.chips #hHoi{display:none}
}
body.u3d .top .r{margin-left:auto;gap:4px!important}
body.u3d .top .r #hAct{display:none}
body.u3d .top .r>button{display:flex!important;flex-direction:column;align-items:center;justify-content:center;gap:5px;width:auto!important;min-width:76px;height:56px!important;padding:0 8px!important;background:none!important;border:0!important;color:var(--u3cream)!important;font:400 13.5px/1 Newsreader,Georgia,serif!important;position:relative;border-radius:6px!important}
body.u3d .top .r>button[hidden]{display:none!important}
body.u3d .top .r>button:hover{background:rgba(236,228,210,.06)!important}
body.u3d .top .r>button svg{width:22px!important;height:22px!important}
body.u3d .top .r>button .lb{display:block!important;position:static!important;opacity:1!important;transform:none!important;background:none!important;border:0!important;padding:0!important;font:inherit!important;color:inherit!important;box-shadow:none!important;pointer-events:none;white-space:nowrap}
body.u3d .top .r #musBtn::after{content:"Âm thanh"}
body.u3d .top .r #acctBtn .tx{font:inherit}
body.u3d .top .r #soDot{position:absolute;top:6px;right:22px}
body.u3d .top .r #phoneBtn{position:relative!important;top:auto!important;right:auto!important;flex-direction:column!important;gap:5px!important}
body.u3d .top .r #phoneBtn::before{width:22px!important;height:22px!important;background:var(--u3cream)!important}
body.u3d .top .r #phoneBtn b{top:4px!important;right:22px!important;border-color:#0b0b0d!important}
body.u3d #stage{flex:1 1 auto;height:auto!important;min-height:0;aspect-ratio:auto!important;border-radius:0!important;width:100%}
body.u3d .keys{flex:none;height:70px;box-sizing:border-box;margin:0!important;padding:0 28px 0 40%!important;border-top:1px solid rgba(236,228,210,.08)!important;background:#0b0b0d;display:flex!important;align-items:center;justify-content:flex-end;gap:28px!important;font:400 15px/1 Newsreader,Georgia,serif!important;color:var(--u3cream)!important}
body.u3d .keys .loc{display:none!important}
body.u3d .keys kbd{font:500 14px "Be Vietnam Pro",sans-serif!important;border:1px solid rgba(236,228,210,.55)!important;border-radius:4px!important;padding:5px 9px!important;background:none!important;margin-right:6px!important}
body.u3d #u3loc{position:absolute;left:28px;bottom:14px;max-width:38%;text-shadow:none;z-index:3}
body.u3d:has(#dlg:not([hidden])) #u3loc{display:block}
body.u3d:has(#cover:not([hidden])) #u3loc,body.u3d:has(#game:not([hidden])) #u3loc{display:none}
body.u3d #phoneBtn:not(.top #phoneBtn){display:none}
/* ---- điện thoại ---- */
body.u3m #u3obj{width:auto;max-width:min(290px,calc(100vw - 96px))}
body.u3m #u3obj .u3h{padding:8px 12px}
body.u3m #u3obj .u3t{font-size:15px}
body.u3m #u3obj.min .u3b{display:none}
body.u3m #phoneBtn,body.u3m .tbtns button{width:46px!important;height:46px!important;border-radius:50%!important;padding:0!important;justify-content:center!important;background:rgba(10,10,12,.82)!important;border:1px solid var(--u3line)!important}
body.u3m .tbtns{flex-direction:column!important;top:calc(max(10px,env(safe-area-inset-top)) + 110px)!important;right:max(10px,env(safe-area-inset-right))!important}
body.u3m #phoneBtn{right:max(10px,env(safe-area-inset-right))!important}
body.u3m .tbtns button::before,body.u3m #phoneBtn::before{width:21px!important;height:21px!important}
body.u3m #exitBtn{border-color:var(--u3gold)!important}
body.u3ml #phoneBtn,body.u3ml .tbtns button{width:42px!important;height:42px!important}
body.u3m .hud .chips{background:none!important;border:0!important;padding:0!important;gap:12px!important}
body.u3m .hud .chip{background:none!important;border:0!important;padding:0!important;font:500 15.5px/1.2 Newsreader,Georgia,serif!important;color:var(--u3cream);text-shadow:0 1px 3px rgba(0,0,0,.95)}
body.u3m .hud .chip.m{color:var(--u3gold)}
body.u3m #hHoi{display:none}
body.u3m #u3mb{background:none!important;border:0!important;filter:drop-shadow(0 1px 2px rgba(0,0,0,.9))}
body.u3m #u3fx{background:linear-gradient(to bottom,rgba(4,5,9,.55),transparent 120px),linear-gradient(to top,rgba(4,5,9,.6),transparent 22%)}
body.u3m #u3loc b{font-size:15.5px}body.u3m #u3loc small{font-size:12px}
body.u3m #u3menu{background:#121214;border:1px solid var(--u3line);border-radius:10px}
/* hộp thoại + lựa chọn: tối, tên in hoa vàng */
body.u3 .dlg{background:rgba(10,10,12,.92)!important;border:1px solid var(--u3line)!important;border-radius:10px!important}
body.u3 #dlg.dlg.menu #dNm{text-transform:none!important;letter-spacing:0!important;font-style:italic!important;color:var(--u3dim)!important;font-size:16px!important}
body.u3 .dlg .nm,body.u3 .dlg.menu #dNm{display:block;background:none!important;color:var(--u3gold)!important;font:500 15px/1.3 Newsreader,Georgia,serif!important;text-transform:uppercase!important;letter-spacing:.08em!important;padding:0!important;transform:none!important;box-shadow:none!important;margin:0 0 6px!important}
body.u3 .dlg .ln{font-family:Newsreader,Georgia,serif;font-size:calc(var(--fs-body,16px) + 2px);line-height:1.55;color:var(--u3cream)}
body.u3 .dlg.mota .ln{font-style:italic;color:#d9d2c2}
body.u3 .choices{background:none!important;border:1px solid var(--u3line)!important;border-radius:8px!important}
body.u3 .choices button{background:rgba(18,18,21,.9)!important;color:var(--u3cream)!important;border:0!important;border-top:1px solid var(--u3line)!important;padding:11px 16px 11px 46px!important;position:relative;font:400 16px/1.4 Newsreader,Georgia,serif!important}
body.u3 .choices button:first-child{border-top:0!important}
body.u3 .choices button:hover,body.u3 .choices button:focus-visible{background:rgba(227,176,91,.12)!important;outline:none}
body.u3 .choices button kbd{position:absolute;left:16px;top:12px;font:500 13px/1.4 "Be Vietnam Pro",sans-serif;color:var(--u3gold);border:0;background:none;margin:0}
body.u3 .choices button small{color:var(--u3dim)!important;font:italic 400 13px/1.35 Newsreader,serif!important}
body.u3 .choices button.cost{box-shadow:inset 3px 0 0 var(--u3gold)}
body.u3 .choices button.cost small{color:#d9b06a!important}
body.u3 .toast{background:rgba(10,10,12,.92)!important;color:var(--u3cream)!important;border:1px solid var(--u3gold)!important;border-radius:8px!important;font:400 15px/1.3 Newsreader,Georgia,serif!important;padding:7px 16px!important;transform:translateX(-50%)!important}
`;
const st2=document.createElement('style'); st2.id='u3skin'; st2.textContent=skin; document.head.appendChild(st2);


/* phần tử mới */
const stage=$('stage'), hudEl=document.querySelector('.hud');
const fx=document.createElement('div'); fx.id='u3fx'; const cvEl=$('cv'); cvEl.after(fx);
const loc=document.createElement('div'); loc.id='u3loc'; stage.appendChild(loc);
const ob=document.createElement('div'); ob.id='u3obj'; ob.hidden=true; hudEl.appendChild(ob);
const mb=document.createElement('button'); mb.type='button'; mb.id='u3mb'; mb.setAttribute('aria-label','Menu'); mb.innerHTML=SVG(P.menu); stage.appendChild(mb);
const menu=document.createElement('div'); menu.id='u3menu'; document.body.appendChild(menu);
mb.onclick=e=>{ e.stopPropagation(); menu.classList.toggle('on'); };
document.addEventListener('click',e=>{ if(menu.classList.contains('on')&&!menu.contains(e.target)&&e.target!==mb) menu.classList.remove('on'); });
menu.addEventListener('click',e=>{ if(e.target.closest('button')) setTimeout(()=>menu.classList.remove('on'),50); });

/* chế độ màn hình */
const MQ={mp:matchMedia('(orientation:portrait) and (max-width:719px)'),ml:matchMedia('(orientation:landscape) and (max-height:540px)')};
function mode(){ if(MQ.mp.matches) return 'mp'; if(MQ.ml.matches) return 'ml'; if(typeof HUDV_DESK==='function'&&HUDV_DESK()) return 'd'; return 't'; }
let MODE='';
function undock(){ const d=$('dock'); if(!d||!d.dataset.on) return; delete d.dataset.on; const tb=document.querySelector('.tbtns');
  hudEl.insertBefore($('hObj'),ob); hudEl.insertBefore($('goMain'),ob); stage.insertBefore(tb,stage.querySelector('.sus')); stage.insertBefore($('phoneBtn'),stage.querySelector('.sus')); d.innerHTML=''; }
function layout(){ const m=mode(); const B=document.body.classList;
  B.toggle('u3d',m==='d'); B.toggle('u3mp',m==='mp'); B.toggle('u3ml',m==='ml'); B.toggle('u3m',m==='mp'||m==='ml');
  undock();
  const r=document.querySelector('#app .top .r')||menu.querySelector('.r'), top=document.querySelector('#app .top');
  if(r&&top){ if((m==='mp'||m==='ml')&&r.parentNode!==menu) menu.appendChild(r); else if(m!=='mp'&&m!=='ml'&&r.parentNode!==top) top.appendChild(r); }
  if(m!==MODE){ const was=MODE; MODE=m; if(was) { minUser=null; } } }
MQ.mp.addEventListener('change',()=>setTimeout(()=>{ layout(); try{ hud(); }catch(e){} },0));
MQ.ml.addEventListener('change',()=>setTimeout(()=>{ layout(); try{ hud(); }catch(e){} },0));
addEventListener('resize',()=>layout());

/* thẻ mục tiêu */
let minUser=null, areaKey='', autoT=0;
const isMob=()=>MODE==='mp'||MODE==='ml';
function hintOf(){ if(typeof nearestMain!=='function'||busy) return null; if(S.scene!=='street'&&S.scene!=='in') return null; const h=nearestMain(); if(!h) return null;
  let t; if(S.scene==='street'&&Math.abs(h.x-PL.x)>140) t='Đi tới '+h.l+'.'; else if(h.kind==='npc') t='Bấm vào '+h.l+' để nói chuyện.'; else if(h.kind==='door') t='Vô '+h.l+'.'; else t='Xem '+h.l.charAt(0).toLowerCase()+h.l.slice(1)+'.';
  if(h.main>1) t+=' Ở đó có '+h.main+' việc chính.'; return {t,h}; }
function objHtml(){ const txt=String(objective()||''); const L=txt.split('\n').map(s=>s.trim()).filter(Boolean); if(!L.length) return null;
  let sub=(($('hAct')&&$('hAct').textContent)||'').replace(/^Hồi \d+\s*·\s*/,'');
  if(/^(Ca sáng|Giờ cơm|Ca chiều|Giờ ra sân|Tắt đèn|Đêm)/.test(L[0])) sub=L.shift();
  const body=L.filter(s=>!/chỗ có việc chính|^Bấm người|^Bấm vào người/.test(s));
  const hn=hintOf(); const nm=typeof mainSpots==='function'?mainSpots().reduce((n,h)=>n+(h.main||0),0):0;
  const ca=/^(Ca sáng|Giờ cơm|Ca chiều|Giờ ra sân|Tắt đèn|Đêm)/.test(sub)?sub:'';
  return '<div class="u3h"><b class="u3t">Việc cần làm</b>'+(nm?'<span class="u3n">'+nm+'</span>':'')+'<span class="u3cv">'+SVG(P.chev)+'</span></div>'+
   '<div class="u3b">'+(ca?'<div class="u3sub">'+esc(ca)+'</div>':'')+(hn?'<div class="u3hint" role="button" tabindex="0"><span>'+esc(hn.t)+'</span></div>':'')+'<ul class="u3bd">'+body.map(s=>'<li>'+esc(s)+'</li>').join('')+'</ul></div>'; }
ob.addEventListener('click',e=>{ e.stopPropagation(); if(e.target.closest('.u3hint')){ ac&&ac(); const h=hintOf(); if(h&&!busy) tapSpot(h.h); return; }
  if(e.target.closest('.u3h')){ minUser=!ob.classList.contains('min'); ob.classList.toggle('min',minUser); clearTimeout(autoT); } });
let lastMuc=null;
function objUpd(){ const html=started&&!S.ended?objHtml():null; if(!html){ ob.hidden=true; return; }
  try{ const mr=metaRows('muc').find(x=>cond(x.hien)); const mu=mr?tpl(mr.loi).split('\n')[0]:''; if(lastMuc!==null&&mu&&mu!==lastMuc&&!busy) u3sys('Đã cập nhật nhiệm vụ',mu.length>70?mu.slice(0,68)+'…':mu); if(mu) lastMuc=mu; }catch(e){}
  if(ob.dataset.h!==html){ ob.innerHTML=html; ob.dataset.h=html; }
  const k=[typeof P2!=='undefined'&&P2.on?P2.map:'p1',S.scene,S.room||'',S.place||''].join('|');
  if(k!==areaKey){ areaKey=k; minUser=null; }
  ob.classList.toggle('min',minUser===null?isMob():minUser); ob.hidden=false; }

/* một câu tả nơi đang đứng (chữ mới, cần tác giả duyệt) */
function locDesc(){ const n=hour()>=19||hour()<5, p2=typeof P2!=='undefined'&&P2.on;
  if(S.scene==='street'){ if(p2&&P2.map==='trai') return n?'Đèn pha quét qua hàng rào. Không khí đặc quánh mùi ẩm và sắt thép.':'Nắng rát trên mái tôn. Ai đi đâu cũng có người nhìn theo.';
    return n?'Đêm xuống, con hẻm yên hơn nhưng không hẳn là an toàn.':'Mùi nước mưa lẫn với mùi dầu ăn từ quán tạp hóa.'; }
  if(S.scene==='room') return 'Đèn đường hắt qua song cửa.';
  return ''; }
function u3Upd(){ layout(); objUpd(); const night=hour()>=19||hour()<5; document.body.classList.toggle('u3p2',typeof P2!=='undefined'&&!!P2.on);
  const showLoc=started&&!S.ended&&(S.scene==='street'||S.scene==='in'||S.scene==='room');
  loc.hidden=!showLoc; if(showLoc){ const t=typeof hudvLoc==='function'?hudvLoc():''; const ds=locDesc(); const key=t+'|'+ds; if(loc.dataset.t!==key){ loc.dataset.t=key; loc.innerHTML='<b>'+esc(t)+'</b>'+(ds?'<small>'+esc(ds)+'</small>':''); } }
  const hc=$('hClock'); if(hc) hc.classList.toggle('dem',night);
  const pb=$('phoneBtn'), rr=document.querySelector('#app .top .r');
  const ap=$('app'); if(MODE==='d'&&loc.parentNode!==ap) ap.appendChild(loc); else if(MODE!=='d'&&loc.parentNode!==stage) stage.appendChild(loc);
  if(MODE==='d'&&rr&&pb.parentNode!==rr){ const sb=$('soBtn'); rr.insertBefore(pb,sb?sb.nextSibling:rr.firstChild); }
  else if(MODE!=='d'&&pb.parentNode!==stage) stage.insertBefore(pb,stage.querySelector('.sus'));
  fx.hidden=!(S.scene==='street'||S.scene==='in'); fx.classList.toggle('night',night&&S.scene==='street');
  if(isMob()){ const hh=$('hHoi'), hd=$('hDay'); if(hh&&/^Hồi /.test(hh.textContent)) hh.textContent=hh.textContent.replace('Hồi ','H'); if(hd&&/^Ngày /.test(hd.textContent)) hd.textContent=hd.textContent.replace('Ngày ',''); }
  const xb=$('exitBtn'); if(xb&&xb.textContent.startsWith('‹ ')) xb.textContent=xb.textContent.slice(2); }
const hudU3=hud; hud=function(){ hudU3(); try{ u3Upd(); }catch(e){ console.warn('ui3',e); } };

/* thẻ người trong phòng: điện thoại thì xếp từ trái, chừa chỗ cho cột nút và ô vị trí */
const cardX0=cardX; cardX=function(R,i){ const x=cardX0(R,i); if(!isMob()) { if(MODE==='d') CARD.y=VH-CARD.h-74; return x; }
  const pres=(R.npc||[]).filter(k=>npcInRoom(k)===R.house||R.always); const j=Math.max(0,pres.indexOf((R.npc||[])[i]));
  CARD.y=VH-CARD.h-(MODE==='mp'?120:96); return 24+CARD.w/2+j*(CARD.w+12); };

/* biểu tượng điểm tương tác: ! việc chính · kính lúp đồ vật · người · bong bóng thoại phụ */
function badge(x,y,k){ g.save(); g.fillStyle='rgba(10,12,18,.8)'; g.strokeStyle='rgba(240,178,92,.85)'; g.lineWidth=2; g.beginPath(); g.arc(x,y,19,0,7); g.fill(); g.stroke();
  g.translate(x-11,y-11); g.scale(22/24,22/24); g.strokeStyle='#f0b25c'; g.lineWidth=2; g.lineCap='round'; g.lineJoin='round'; g.stroke(cpath(k)); g.restore(); }
drawMarkers=function(){ if(typeof drawEdges==='function') drawEdges(); if(busy||SO.on) return; const off=S.scene==='street'?cam:0;
  for(const h of hotspots()){ if(h.kind==='cat') continue;
    const y=h.kind==='obj'||h.kind==='exit'||h.inroom?h.y-h.h/2-30:(h.kind==='door'||h.id==='phong'||h.id==='ngo'?GROUND-250:NFEET-h.h-38); const x=h.x-off; const b=Math.sin(tsec*4)*3;
    const side=h.sides.length||h.sidesN;
    if(h.main){ g.save(); const p=(tsec*1.2)%1; g.strokeStyle='rgba(240,178,92,'+(.55*(1-p))+')'; g.lineWidth=3; g.beginPath(); g.arc(x,y+b,18+p*14,0,7); g.stroke();
      g.fillStyle='#f0b25c'; g.shadowColor='rgba(240,178,92,.7)'; g.shadowBlur=16; g.beginPath(); g.arc(x,y+b,18,0,7); g.fill(); g.shadowBlur=0;
      g.fillStyle='#21170a'; g.font='700 24px "Be Vietnam Pro",system-ui,sans-serif'; g.textAlign='center'; g.textBaseline='middle'; g.fillText('!',x,y+b+1); g.restore(); }
    else if(side) badge(x,y,'chat');
    else if(h.ngoai) badge(x,y,h.kind==='npc'?'chat':'search');
    else if(h.kind==='npc') badge(x,y,'person');
    else if(h.kind==='obj') badge(x,y,'search');
    else if(h.kind==='exit'){ g.strokeStyle='rgba(240,178,92,.5)'; g.lineWidth=2; g.beginPath(); g.arc(x,y+20,7,0,7); g.stroke(); }
    if(hover&&hover.id===h.id){ const bits=[]; if(h.main) bits.push(h.main+' việc chính'); if(h.ngoai) bits.push(h.ngoai+' việc ngoài luồng'); if(side) bits.push(side+' việc phụ'); pill(x,y-52,h.l+(bits.length?' · '+bits.join(', '):''),h.main?'#f0b25c':'#cfd6f0'); } } };

/* mũi tên chỉ việc chính ngoài khung: hạ xuống giữa tranh cho khỏi đè thẻ mục tiêu */
drawEdges=function(){ EDGE=[]; if(S.scene!=='street'||busy||SO.on) return; const L=mainSpots(); let nl=0, nr=0;
  for(const h of L){ const x=h.x-cam; if(x>30&&x<VW-30) continue; const left=x<=30; const k=VW<1100?nl++:(left?nl++:nr++); const y=VH*.56+k*58;
    g.font='400 19px Newsreader,Georgia,serif'; const tw=g.measureText(h.l).width, w=tw+80, H=46, bx=left?24:VW-24-w;
    g.save(); g.fillStyle='rgba(10,10,12,.78)'; g.strokeStyle='#e3b05b'; g.lineWidth=2; g.beginPath(); if(g.roundRect) g.roundRect(bx,y,w,H,23); else g.rect(bx,y,w,H); g.fill(); g.stroke();
    g.strokeStyle='#ece4d2'; g.lineWidth=2.4; g.lineCap='round'; g.lineJoin='round'; const ay=y+H/2, ax=left?bx+24:bx+w-24, d=left?1:-1;
    g.beginPath(); g.moveTo(ax+d*16,ay); g.lineTo(ax,ay); g.moveTo(ax+d*7,ay-8); g.lineTo(ax,ay); g.lineTo(ax+d*7,ay+8); g.stroke();
    g.fillStyle='#ece4d2'; g.textBaseline='middle'; g.textAlign='left'; g.fillText(h.l,left?bx+48:bx+22,ay+1); g.restore(); g.textBaseline='alphabetic';
    EDGE.push({x:bx,y,w,h:H,spot:h}); } };

/* ===== hộp thoại theo bản vẽ: chân dung lớn một bên, bảng tên giấy, mỗi người một bên ===== */
const dcss=`
body.u3 #dlg.dlg{border:1px solid var(--u3line)!important;border-radius:8px!important;background:rgba(12,12,14,.9)!important;box-shadow:0 14px 40px rgba(0,0,0,.55);min-height:96px;overflow:visible}
body.u3d #dlg.dlg{left:50%!important;right:auto!important;bottom:22px!important;transform:translateX(-50%);width:min(820px,64%);padding:22px 30px 18px!important;box-sizing:border-box}
body.u3d #dlg.dlg.menu{width:min(760px,62%)}
body.u3 #dlg.dlg.u3L{padding-left:178px!important}
body.u3 #dlg.dlg.u3R{padding-right:178px!important}
body.u3 #dlg.hasbust #dNm,body.u3 #dlg.thoai #dNm,body.u3 #dlg.nghi #dNm{display:inline-block!important;position:absolute;top:-15px;background:#e6dcc4!important;color:#2a2116!important;font:600 16px/1 Newsreader,Georgia,serif!important;text-transform:none!important;letter-spacing:0!important;padding:7px 18px 6px!important;margin:0!important;clip-path:polygon(2% 0,100% 6%,97% 100%,0 92%);box-shadow:none!important}
body.u3 #dlg.u3L #dNm{left:166px}
body.u3 #dlg.u3R #dNm{right:166px;left:auto}
body.u3 #dlg:not(.u3L):not(.u3R) #dNm{left:24px}
body.u3 #dMore::after,body.u3 #dMore::before{content:none!important}
body.u3 #dlg.mota #dNm{display:none!important}
body.u3 #dlg .ln{font:400 19px/1.55 Newsreader,Georgia,serif!important;color:var(--u3cream)!important}
body.u3 #dlg.nghi .ln{font-style:italic!important;color:#d6cfbf!important}
body.u3 #dlg.nghi .ln::before{content:"("}body.u3 #dlg.nghi .ln::after{content:")"}
body.u3 #dlg.mota .ln{font-style:italic!important;color:#d6cfbf!important;text-align:center}
body.u3 #dMore{font-size:0!important;color:transparent!important;overflow:hidden;text-indent:-999px;line-height:0!important;position:absolute;right:20px;bottom:14px;width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-top:10px solid var(--u3cream);animation:u3bob 1.2s ease-in-out infinite;padding:0!important}
body.u3 #dlg.u3R #dMore{right:auto;left:20px}
@keyframes u3bob{50%{transform:translateY(3px)}}
@media (prefers-reduced-motion:reduce){body.u3 #dMore{animation:none}}
body.u3 #dlg #dFace{width:96px!important;height:96px!important;border-radius:6px;object-fit:cover;border:1px solid var(--u3line)}
body.u3 .dbust{width:150px!important;aspect-ratio:4/5;filter:drop-shadow(0 10px 18px rgba(0,0,0,.6))}
body.u3 .dbust i{display:none}
body.u3 .dbust img{clip-path:none!important;border-radius:6px 6px 0 0;-webkit-mask-image:linear-gradient(#000 78%,transparent);mask-image:linear-gradient(#000 78%,transparent)}
body.u3 .dbust b{display:none}
body.u3 .dbust.nghi img{filter:saturate(.75) brightness(.85)}
/* lựa chọn */
body.u3 #dlg.menu #dNm{position:static!important;display:block!important;background:none!important;clip-path:none;padding:0 0 10px!important;font:italic 400 17px/1.3 Newsreader,Georgia,serif!important;color:var(--u3dim)!important}
body.u3 #dlg .choices{border:0!important;background:none!important;display:flex;flex-direction:column;gap:8px;margin-top:0}
body.u3 #dlg .choices button{border:1px solid var(--u3line)!important;border-radius:6px!important;background:rgba(20,20,23,.85)!important;padding:10px 16px 10px 52px!important;font:400 17px/1.35 Newsreader,Georgia,serif!important}
body.u3 #dlg .choices button:first-child{border-top:1px solid var(--u3line)!important}
body.u3 #dlg .choices button kbd{left:14px!important;top:50%!important;transform:translateY(-50%);width:24px;height:24px;border-radius:50%;background:rgba(236,228,210,.1)!important;color:var(--u3dim)!important;display:grid!important;place-items:center;font:500 12px/1 "Be Vietnam Pro",sans-serif!important}
body.u3 #dlg .choices button:hover,body.u3 #dlg .choices button:focus-visible{border-color:var(--u3gold)!important;background:rgba(227,176,91,.1)!important}
body.u3 #dlg .choices button:hover kbd,body.u3 #dlg .choices button:focus-visible kbd{background:var(--u3gold)!important;color:#1a1206!important}
body.u3 #dlg .choices button.cost{box-shadow:none!important}
body.u3 #dlg .choices button.cost small{color:#d9b06a!important}
/* hộp hệ thống */
#u3sys{position:fixed;left:50%;top:84px;transform:translateX(-50%);z-index:60;display:flex;flex-direction:column;gap:8px;pointer-events:none;width:min(420px,calc(100vw - 32px))}
#u3sys .bx{display:flex;align-items:center;gap:14px;padding:12px 18px;border-radius:8px;background:rgba(12,12,14,.94);border:1px solid var(--u3gold);box-shadow:0 12px 30px rgba(0,0,0,.5);animation:u3in .25s ease-out}
#u3sys .bx.err{border-color:#c8392d;background:rgba(40,10,10,.92)}
#u3sys .bx i{flex:none;width:28px;height:28px;border-radius:50%;background:var(--u3gold);color:#1a1206;display:grid;place-items:center;font:700 16px/1 Newsreader,serif;font-style:normal}
#u3sys .bx.err i{background:#d8382b;color:#fff}
#u3sys .bx b{display:block;font:500 16px/1.3 Newsreader,Georgia,serif;color:var(--u3cream)}
#u3sys .bx.err b{color:#ff8a7c}
#u3sys .bx span{display:block;font:400 14px/1.3 Newsreader,Georgia,serif;color:var(--u3gold)}
#u3sys .bx.err span{color:var(--u3dim)}
#u3sys .bx.out{opacity:0;transition:opacity .3s}
@keyframes u3in{from{opacity:0;transform:translateY(-6px)}}
body.u3 #toast{display:none!important}
/* điện thoại */
body.u3m #dlg.dlg{padding:20px 16px 16px!important}
body.u3m #dlg.dlg.u3L{padding-left:104px!important}
body.u3m #dlg.dlg.u3R{padding-right:104px!important}
body.u3m .dbust{width:88px!important}
body.u3m #dlg.u3L #dNm{left:96px}body.u3m #dlg.u3R #dNm{right:96px}
body.u3m #dlg .ln{font-size:16.5px!important}
body.u3m #dlg.menu.u3L{padding-left:16px!important}
body.u3m #u3sys{top:calc(max(10px,env(safe-area-inset-top)) + 46px)}
`;
const st3=document.createElement('style'); st3.id='u3dlg'; st3.textContent=dcss; document.head.appendChild(st3);
const MEN=()=>typeof ME!=='undefined'?ME:'Lâm';
let side={who:null,R:false}, sideT=0;
function sideFor(nm){ const now=Date.now(); if(now-sideT>4000) side={who:null,R:false}; sideT=now;
  let R; if(nm===MEN()) R=true; else if(side.who&&side.who!==nm&&side.who!==MEN()) R=!side.R; else R=false;
  if(nm===side.who) R=side.R; side={who:nm,R}; return R; }
bustPos=function(){ const b=$('dBust'), d=$('dlg'); if(b.hidden||d.hidden) return; const r=d.getBoundingClientRect(); const R=d.classList.contains('u3R');
  b.style.left=(R?r.right-b.offsetWidth-14:r.left+14)+'px'; b.style.bottom=(innerHeight-r.bottom+1)+'px'; };
const setBustU3=setBust; setBust=function(nm,label,kind){ const d=$('dlg'); d.classList.remove('u3L','u3R');
  setBustU3(nm,label,kind); const b=$('dBust');
  if(!b.hidden){ const R=sideFor(nm); d.classList.add(R?'u3R':'u3L'); b.classList.remove('lam'); requestAnimationFrame(bustPos); } };
const sayU3=say; say=function(kind,name,text){ const p=sayU3(kind,name,text);
  if(kind==='nghi'){ setBust(MEN(),MEN(),'nghi'); }
  return p; };
const chooseU3=choose; choose=function(set,inPhone,title,face){ const p=chooseU3(set,inPhone,title,face); if(!inPhone){ const d=$('dlg'); setBust(face||MEN(),'','menu'); d.classList.add('menu'); } return p; };
/* hộp hệ thống thay cho dòng thông báo nhỏ */
const sys=document.createElement('div'); sys.id='u3sys'; sys.setAttribute('role','status'); sys.setAttribute('aria-live','polite'); document.body.appendChild(sys);
function u3sys(title,sub,err){ const b=document.createElement('div'); b.className='bx'+(err?' err':''); b.innerHTML='<i>'+(err?'!':'i')+'</i><div><b>'+esc(title)+'</b>'+(sub?'<span>'+esc(sub)+'</span>':'')+'</div>';
  sys.appendChild(b); while(sys.children.length>2) sys.firstChild.remove(); setTimeout(()=>{ b.classList.add('out'); setTimeout(()=>b.remove(),320); },err?2600:2400); }
toast=function(s){ s=String(s||''); try{ $('toast').textContent=s; }catch(e){} const m=s.match(/^(Thành tựu mới|Lỗi|Việc mới[^:]*):\s*(.+)$/);
  const err=/^(Lỗi|Không |Chưa |Hết |Đợi )/.test(s)||/không được|không đủ/i.test(s);
  if(m) u3sys(m[1],m[2],m[1]==='Lỗi'); else u3sys(s,'',err); };
/* máy tính: thanh trạng thái luôn nằm trên thanh trên */
const placeChipsU3=placeChips; placeChips=function(){ if(MODE==='d'){ const c=document.querySelector('.chips'), top=document.querySelector('#app .top'); if(c&&top&&c.parentNode!==top){ const h1=top.querySelector('h1'); top.insertBefore(c,h1?h1.nextSibling:top.firstChild); } return; } placeChipsU3(); };

/* ===== khu tác giả: cột riêng bên phải, ngoài khung game (chỉ tài khoản tác giả, máy tính) ===== */
const tgcss=`
#u3tg{display:none}
body.u3adm #app{margin-right:var(--tgw)!important;width:auto!important}
body.u3adm{--tgw:360px}
body.u3adm #u3tg{display:flex;flex-direction:column;position:fixed;top:0;right:0;bottom:0;width:var(--tgw);z-index:69;background:#0e0e11;border-left:1px solid rgba(236,228,210,.12);color:var(--u3cream);font:400 14px/1.45 "Be Vietnam Pro",sans-serif;box-sizing:border-box}
#u3tg h4{margin:0;padding:14px 16px 10px;font:600 13px/1 "Be Vietnam Pro",sans-serif;letter-spacing:.08em;text-transform:uppercase;color:var(--u3dim);border-bottom:1px solid rgba(236,228,210,.08)}
#u3tg .tg-b{display:flex;gap:8px;padding:12px 16px;flex-wrap:wrap;border-bottom:1px solid rgba(236,228,210,.08)}
#u3tg .tg-b button,#u3tg #btvPill button{font:500 13.5px/1 "Be Vietnam Pro",sans-serif!important;color:var(--u3cream)!important;background:#1a1a1e!important;border:1px solid rgba(236,228,210,.2)!important;border-radius:6px!important;padding:9px 12px!important;cursor:pointer;height:auto!important;min-width:0!important;display:inline-flex!important;flex-direction:row!important;width:auto!important}
#u3tg .tg-b button:hover,#u3tg #btvPill button:hover{border-color:var(--u3gold)!important}
#u3tg #btvPill{position:static!important;display:flex;gap:8px;padding:12px 16px;flex-wrap:wrap}
#u3tg #btvPill button[data-a=e]{background:var(--u3gold)!important;color:#1a1206!important;border-color:var(--u3gold)!important}
#u3tg .tg-cur{flex:1 1 auto;overflow:auto;padding:4px 16px 16px}
#u3tg .tg-cur .m{font:500 11.5px/1.3 "IBM Plex Mono",monospace;color:var(--u3dim);margin-top:10px}
#u3tg .tg-cur .t{font:400 15px/1.45 Newsreader,Georgia,serif;color:var(--u3cream);margin-top:3px}
#u3tg .tg-cur .e{font-size:13px;color:var(--u3dim);font-style:italic;margin-top:10px}
body.u3adm #btvBox{flex-direction:column!important;justify-content:flex-start!important;left:auto!important;right:0!important;width:var(--tgw)!important;top:0!important;bottom:0!important;background:#0e0e11!important;padding:0!important;align-items:stretch!important;border-left:1px solid rgba(236,228,210,.12);z-index:97}
body.u3adm #btvBox .in{width:100%!important;max-height:none!important;height:100%;border:0!important;border-radius:0!important;background:#0e0e11!important;box-sizing:border-box}
body.u3adm .tsp{left:auto!important;width:var(--tgw);background:none!important}
body.u3adm .ts-box{width:100%!important;border-left:1px solid rgba(236,228,210,.12)}
body.u3adm #cover:not([hidden]){right:var(--tgw)!important}
body.u3adm #u3sys{left:calc((100vw - var(--tgw))/2)}
body.u3adm .top .r #tsBtn,body.u3adm .top .r #edBtn{display:none!important}
`;
const st4=document.createElement('style'); st4.id='u3tgcss'; st4.textContent=tgcss; document.head.appendChild(st4);
const tg=document.createElement('aside'); tg.id='u3tg'; tg.setAttribute('aria-label','Công cụ tác giả');
tg.innerHTML='<h4>Tác giả</h4><div class="tg-b"><button type="button" data-t="ts">Phòng thử</button><button type="button" data-t="ed">Bảng lời thoại</button></div><h4>Câu đang hiện</h4><div class="tg-pill"></div><div class="tg-cur"></div>';
document.body.appendChild(tg);
tg.querySelector('[data-t=ts]').onclick=()=>{ const b=$('tsBtn'); if(b) b.click(); };
tg.querySelector('[data-t=ed]').onclick=()=>{ const b=$('edBtn'); if(b) b.click(); };
let tgKey='';
function tgUpd(){ const on=MODE==='d'&&typeof btvOn==='function'&&btvOn(); document.body.classList.toggle('u3adm',on); if(!on) return;
  const pl=$('btvPill'), hold=tg.querySelector('.tg-pill'); if(pl&&pl.parentNode!==hold) hold.appendChild(pl);
  const L=(typeof BTV_CUR!=='undefined'?BTV_CUR:[])||[]; const k=L.map(r=>r.ma).join(',');
  if(k!==tgKey){ tgKey=k; tg.querySelector('.tg-cur').innerHTML=L.length?L.map(r=>'<div class="m">'+esc(r.ma)+' · '+esc(r.kieu||'')+(r.ai?' · '+esc(r.ai):'')+'</div><div class="t">'+esc(tpl?tpl(r.loi):r.loi)+'</div>').join(''):'<div class="e">Chưa có câu nào đang hiện. Chạy tới một đoạn thoại là câu đó hiện ở đây, bấm "Sửa câu này" để sửa ngay bên cột này.</div>'; } }
setInterval(()=>{ try{ tgUpd(); }catch(e){} },400);
function u3w(){ const w=($('app')&&$('app').clientWidth)||innerWidth, B=document.body.classList; B.toggle('u3w15',w<1500); B.toggle('u3w13',w<1280); B.toggle('u3w11',w<1100); }
addEventListener('resize',u3w); setInterval(u3w,700); u3w();
hudvObj=function(){};
layout(); try{ hud(); }catch(e){}
})();
