/* Hẻm 47 · màn đầu mới (theo bản thiết kế "Hẻm 47 Màn Đầu"). Chỉ chạy trên trang thử Phần 2.
   Giữ nguyên các nút cũ (ẩn đi) để mọi xử lý cũ vẫn chạy; bìa mới chỉ bấm hộ các nút đó. */
'use strict';
(()=>{ const st=document.createElement('style'); st.textContent=`
#cover .in:has(> .mdv){max-width:440px;width:100%}
#cover .in:has(> .mdv) > :not(.mdv){display:none!important}
#cover:has(.mdv) .tlr-st{display:none}
/* hai miếng dán trailer (Phần 1, Phần 2) như ảnh polaroid dán băng keo */
.hm .tsts{position:absolute;top:max(14px,env(safe-area-inset-top));right:12px;display:flex;gap:6px;z-index:3}
.hm .tst{position:relative;width:104px;padding:5px 5px 19px;background:#efe8d8;border:0;border-radius:2px;box-shadow:0 8px 18px rgba(0,0,0,.55);transform:rotate(3.5deg);cursor:pointer;font:inherit;color:#2a241b;transition:transform .25s,box-shadow .25s}
.hm .tst.t2{transform:rotate(-4deg);margin-top:10px}
.hm .tst::before{content:"";position:absolute;top:-8px;left:50%;width:44px;height:14px;transform:translateX(-50%) rotate(-4deg);background:rgba(232,220,190,.72);box-shadow:0 1px 2px rgba(0,0,0,.25)}
.hm .tst img{display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;filter:saturate(.92) contrast(1.04)}
.hm .tst i{position:absolute;left:50%;top:5px;width:calc(100% - 10px);aspect-ratio:16/9;transform:translateX(-50%);display:grid;place-items:center;pointer-events:none}
.hm .tst i::before{content:"";width:24px;height:24px;border-radius:50%;background:rgba(10,12,18,.62);border:1.5px solid rgba(239,232,216,.85);grid-area:1/1}
.hm .tst i::after{content:"";grid-area:1/1;margin-left:3px;border-left:8px solid #efe8d8;border-top:5px solid transparent;border-bottom:5px solid transparent}
.hm .tst span{position:absolute;left:0;right:0;bottom:3px;text-align:center;font:400 11px/1.2 "Playpen Sans",cursive;color:#3a3226}
.hm .tst:hover,.hm .tst:focus-visible{transform:rotate(0) translateY(-3px) scale(1.04);box-shadow:0 14px 26px rgba(0,0,0,.6);outline:none}
@media (max-width:420px){.hm .tsts{right:8px;gap:2px;top:calc(max(14px,env(safe-area-inset-top)) + 44px)}.hm .tst{width:84px;padding:4px 4px 16px}.hm .tst span{font-size:9.5px}.hm .tst::before{width:36px;height:12px}}
@media (min-width:900px) and (orientation:landscape){.hm .tsts{position:fixed;right:28px;top:26px;gap:14px}.hm .tst{width:172px;padding:7px 7px 28px}.hm .tst span{font-size:14px;bottom:6px}.hm .tst::before{width:70px;height:20px;top:-10px}.hm .tst i::before{width:36px;height:36px}.hm .tst i::after{border-left-width:11px;border-top-width:7px;border-bottom-width:7px}}
@media (orientation:landscape) and (max-height:540px){.hm .tsts{position:fixed;top:10px;right:12px}.hm .tst{width:96px}}
#cover.md-p2{background:linear-gradient(180deg,rgba(14,6,6,.35),rgba(10,6,8,.92) 64%),#0b0d14 url(img2/x2-bo-ben-nay.webp) 68% center/cover!important}
.mdv{display:flex;flex-direction:column;gap:12px;text-align:center;color:#efe8d8;font-family:"Be Vietnam Pro",system-ui,sans-serif}
.mdv .kick{font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:#a9a493}
.mdv .age{font-size:10px;letter-spacing:.1em;border:1px solid rgba(226,100,92,.6);color:#f0948d;border-radius:4px;padding:1px 4px;margin-left:6px}
.mdv .tua{margin:0 auto;width:92%}.mdv .tua img{display:block;width:100%;height:auto}
.mdv .part{display:flex;align-items:center;justify-content:center;gap:10px;margin-top:-4px;font-family:Oswald,"Arial Narrow",sans-serif;font-weight:600;font-size:22px;letter-spacing:.14em;text-transform:uppercase;color:#efe6d2}
.mdv .part span{font-family:"Be Vietnam Pro",sans-serif;font-weight:600;font-size:10px;letter-spacing:.16em;color:#f0948d;border:1px solid rgba(226,100,92,.6);border-radius:6px;padding:3px 7px 2px}
.mdv .blurb{margin:0 auto;max-width:340px;font-size:14px;line-height:1.6;color:#d9d3c4}
.mdv .mainb{display:flex;flex-direction:column;align-items:center;gap:10px;margin-top:6px}
.mdv .bb{font-family:Oswald,"Arial Narrow",sans-serif;font-weight:600;text-transform:uppercase;letter-spacing:.05em;font-size:19px;background:#f0b25c;color:#21170a;border:0;padding:11px 26px;border-radius:26px;cursor:pointer;min-width:240px;display:flex;flex-direction:column;align-items:center;line-height:1.15}
.mdv .bb small{font-family:"Be Vietnam Pro",sans-serif;text-transform:none;letter-spacing:0;font-weight:500;font-size:11.5px;opacity:.78;margin-top:2px}
.mdv .bb.red{background:#e2645c;color:#fff}.mdv .bb.gh{background:rgba(12,14,22,.5);color:#efe8d8;border:1px solid rgba(239,232,216,.28);font-size:16px;padding:9px 22px}
.mdv .bb:disabled{opacity:.5;cursor:wait}
.mdv .mdtools{display:flex;justify-content:center;gap:2px;margin-top:6px;padding-top:6px;border-top:1px solid rgba(255,255,255,.1)}
.mdv .mdtools button{flex:1 1 0;min-width:0;display:flex;flex-direction:column;align-items:center;gap:5px;background:none;border:0;color:#bfc3d2;font:inherit;font-size:11px;padding:8px 2px;border-radius:10px;cursor:pointer}
.mdv .mdtools svg{width:21px;height:21px;stroke:currentColor;fill:none;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
.mdv .mdtools .tr{color:#f0b25c}#cover.md-p2 .mdv .mdtools .tr{color:#f0948d}
.mdv.inner{text-align:left;gap:14px;padding:46px 0 12px}
#cover:has(.mdv.inner){align-items:flex-start;overflow-y:auto}
.mdv .mdhd{display:flex;align-items:center;gap:10px}
.mdv .mdback{flex:none;width:36px;height:36px;border-radius:50%;border:1px solid #2e3549;background:#181c28;color:#efe8d8;font-size:17px;cursor:pointer;display:grid;place-items:center}
.mdv .mdhd h3{margin:0;font-family:Oswald,"Arial Narrow",sans-serif;font-weight:600;text-transform:uppercase;letter-spacing:.04em;font-size:22px;color:#f0b25c;line-height:1.1}
.mdv .mdhd p{margin:2px 0 0;font-size:12px;color:#959cb2}
.mdv .mdch{position:relative;border-radius:16px;overflow:hidden;border:1px solid #2e3549;background:#181c28;display:flex;flex-direction:column}
.mdv .mdch .mdim{height:128px;background:#0b0d14 center/cover;position:relative}
.mdv .mdch .mdim::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 30%,#181c28)}
.mdv .mdch .mdim .mdtag{position:absolute;left:12px;top:10px;z-index:1;font-family:"IBM Plex Mono",monospace;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;background:rgba(10,12,18,.7);border-radius:6px;padding:3px 7px;color:#f0b25c}
.mdv .mdch.lock .mdim{filter:grayscale(.85) brightness(.55)}
.mdv .mdch .mdbd{padding:0 14px 14px;margin-top:-26px;position:relative;z-index:1;display:flex;flex-direction:column;gap:8px}
.mdv .mdch h4{margin:0;font-family:Oswald,"Arial Narrow",sans-serif;font-weight:600;text-transform:uppercase;letter-spacing:.05em;font-size:24px;color:#f6efe0;line-height:1}
.mdv .mdstt{font-size:12.5px;color:#cfcab9;line-height:1.5}.mdv .mdstt b{color:#efe8d8}
.mdv .mddots{display:flex;gap:5px;align-items:center;font-family:"IBM Plex Mono",monospace;font-size:11px;color:#959cb2}
.mdv .mddots i{width:9px;height:9px;border-radius:50%;border:1px solid #5a6178}.mdv .mddots i.on{background:#f0b25c;border-color:#f0b25c}
.mdv .mdacts{display:flex;gap:8px;flex-wrap:wrap}
.mdv .mdsm{font:inherit;font-size:13px;font-weight:600;border-radius:18px;padding:7px 14px;cursor:pointer;border:1px solid #2e3549;background:#20263a;color:#efe8d8}
.mdv .mdsm.pri{background:#f0b25c;border-color:#f0b25c;color:#21170a}.mdv .mdsm.red{background:#e2645c;border-color:#e2645c;color:#fff}
.mdv .mdlockln{display:flex;align-items:center;gap:6px;font-size:12.5px;color:#959cb2}
.mdv .mdendgrid{display:flex;flex-direction:column;gap:8px}
.mdv .mdend{display:grid;grid-template-columns:1fr auto;gap:2px 10px;align-items:center;text-align:left;font:inherit;color:#efe8d8;background:#181c28;border:1px solid #2e3549;border-radius:12px;padding:11px 13px;cursor:pointer}
.mdv .mdend .n{font-family:Oswald,"Arial Narrow",sans-serif;font-weight:500;font-size:18px;letter-spacing:.03em;text-transform:uppercase;line-height:1.1}
.mdv .mdend .m{grid-column:1;font-family:"IBM Plex Mono",monospace;font-size:11px;color:#959cb2}
.mdv .mdend .mdbr{grid-row:1/3;grid-column:2;font-size:10.5px;font-weight:600;border-radius:6px;padding:3px 7px;white-space:nowrap}
.mdv .mdbr.A{color:#7ab6e8;border:1px solid rgba(122,182,232,.5)}.mdv .mdbr.B{color:#f0948d;border:1px solid rgba(226,100,92,.5)}
.mdv .mdend.sel{border-color:#f0b25c;background:#272418;box-shadow:inset 0 0 0 1px #f0b25c}.mdv .mdend.sel .n{color:#f0b25c}
.mdv .mdend.locked{cursor:default;opacity:.55;border-style:dashed}.mdv .mdend.locked .n{font-family:"IBM Plex Mono",monospace;letter-spacing:.3em}
.mdv .mdend .mdlast{font-family:"Be Vietnam Pro",sans-serif;text-transform:none;letter-spacing:0;font-size:10.5px;font-weight:500;color:#5fb37a;margin-left:6px;vertical-align:2px}
.mdv .mdwarn{font-size:12.5px;line-height:1.55;color:#f1d2a4;background:rgba(240,178,92,.08);border:1px solid rgba(240,178,92,.35);border-radius:10px;padding:10px 12px}
.mdv .mdhand{font-family:Newsreader,Georgia,serif;font-size:15px;color:#d9d3c4;line-height:1.55;margin:0}
.mdv .mdfoot .bb{width:100%;min-width:0}
.mdv .mdopt{display:flex;flex-direction:column;gap:3px;text-align:left;font:inherit;color:#efe8d8;background:rgba(16,19,28,.82);border:1px solid #2e3549;border-radius:14px;padding:12px 14px;cursor:pointer}
.mdv .mdopt b{font-family:Oswald,"Arial Narrow",sans-serif;font-weight:600;text-transform:uppercase;letter-spacing:.04em;font-size:18px;color:#f0b25c}
.mdv .mdopt span{font-size:12.5px;color:#cfcab9;line-height:1.45}.mdv .mdopt.rec{border-color:#f0b25c}
.mdv .gh3{margin:0;font-family:Oswald,"Arial Narrow",sans-serif;font-weight:600;text-transform:uppercase;font-size:30px;line-height:1.05;color:#f6efe0}
.mdv details.adm{font-size:12.5px;color:#959cb2}.mdv details.adm label{display:inline-flex;gap:4px;margin:4px 10px 0 0}
.mdv .ldx{font-size:12px;color:#959cb2}

/* ==== bìa + chọn chương kiểu mới (theo bản vẽ tác giả 10/2026) ==== */
#cover:not([hidden]):has(.mdx){position:fixed!important;inset:0!important;z-index:40;display:block!important;padding:0!important;overflow-y:auto;border-radius:0!important}
#cover:has(.mdx) .in{max-width:none!important;width:auto!important;margin:0!important;padding:40px 64px 120px;box-sizing:border-box;min-height:100%;text-align:left}
#cover:has(.mdx) .tlr-st,#cover:has(.mdx) .moi-st,#cover:has(.mdx) #logoTop,#cover:has(.mdx) #logoBot{display:none!important}
#cover:has(.mdx-chap){background:linear-gradient(90deg,rgba(5,5,7,.94) 0%,rgba(5,5,7,.78) 40%,rgba(5,5,7,.1) 70%,rgba(5,5,7,.2) 100%),#08090b url(img2/bia.webp) 75% center/cover!important}
.mdx{text-align:left;font-family:"Be Vietnam Pro",system-ui,sans-serif;color:#efe6d2;gap:0}
.mdx .mdx-logo img{display:block;width:290px;height:auto}
.mdx .mdx-kick{display:flex;align-items:center;gap:12px;margin-top:4px;font-size:15px;font-weight:500;letter-spacing:.3em;color:#d9d2c2;text-transform:uppercase}
.mdx .mdx-age{border:1.5px solid #d8382b;color:#f26a5c;border-radius:4px;padding:1px 5px;font-size:12px;letter-spacing:.06em}
.mdx .mdx-top{display:flex;align-items:center;gap:36px;margin:0 0 30px}
.mdx .mdx-sep{width:1px;align-self:stretch;margin:14px 0;background:rgba(239,230,210,.28)}
.mdx .mdx-h h2{margin:0;font:600 56px/1 Oswald,"Arial Narrow",sans-serif;text-transform:uppercase;letter-spacing:.01em;color:#efe6d2}
.mdx .mdx-h p{margin:12px 0 0;font-size:19px;color:#d9d2c2}
.mdx .mdx-card{position:relative;overflow:hidden;max-width:960px;min-height:258px;box-sizing:border-box;margin:0 0 18px;padding:26px 36px 26px;border:1.5px solid rgba(239,230,210,.17);border-radius:10px;background:rgba(9,9,11,.82);transition:border-color .2s,box-shadow .2s}
.mdx .mdx-card::before{content:"";position:absolute;top:0;right:0;bottom:0;left:36%;background:var(--img) var(--pos,center)/cover;-webkit-mask-image:linear-gradient(90deg,transparent,#000 48%);mask-image:linear-gradient(90deg,transparent,#000 48%);opacity:.9;pointer-events:none}
.mdx .mdx-card>*{position:relative}
.mdx .mdx-card.sel{border-color:#d8382b;box-shadow:0 0 0 1px rgba(216,56,43,.3),0 0 34px rgba(216,56,43,.14)}
.mdx .mdx-card .k{font-size:15px;font-weight:500;letter-spacing:.3em;text-transform:uppercase;color:#d9d2c2}
.mdx .mdx-card h4{margin:6px 0 6px;font:600 46px/1.04 Oswald,"Arial Narrow",sans-serif;text-transform:uppercase;color:#efe6d2;text-shadow:0 2px 12px rgba(0,0,0,.6)}
.mdx .mdx-card .meta{font-size:18px;color:#efe6d2}.mdx .mdx-card .meta span{color:#9b968b}
.mdx .mdx-card .bl{margin:14px 0 20px;max-width:440px;font-size:16px;line-height:1.42;color:#d9d2c2}
.mdx .mdx-acts{display:flex;flex-wrap:wrap;align-items:center;gap:16px}
.mdx .mdx-b{display:inline-flex;align-items:center;gap:10px;font:500 19px/1.1 Oswald,"Arial Narrow",sans-serif;color:#efe6d2;background:rgba(9,9,11,.55);border:1.5px solid rgba(239,230,210,.5);border-radius:6px;padding:13px 26px;cursor:pointer;transition:filter .15s,background .15s}
.mdx .mdx-b svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.mdx .mdx-b svg.cv{width:16px;height:16px;margin-left:4px}
.mdx .mdx-b.red{background:#d8382b;border-color:#d8382b;color:#fff;box-shadow:0 8px 22px rgba(216,56,43,.32)}
.mdx .mdx-b:hover:not(:disabled){filter:brightness(1.15)}
.mdx .mdx-b:focus-visible{outline:2px solid #efe6d2;outline-offset:3px}
.mdx .mdx-b:disabled{cursor:not-allowed;opacity:.82}
.mdx .mdx-b.big{flex-direction:column;align-items:flex-start;gap:3px;font-size:23px;padding:14px 30px;min-width:200px}
.mdx .mdx-b.big small{font:500 12.5px/1.2 "Be Vietnam Pro",sans-serif;opacity:.85}
.mdx .mdx-dots{position:absolute;right:28px;bottom:26px;display:flex;align-items:center;gap:8px;font-size:18px;color:#efe6d2}
.mdx .mdx-dots i{width:14px;height:14px;border-radius:50%;border:1.5px solid rgba(239,230,210,.6)}.mdx .mdx-dots i.on{background:#d8382b;border-color:#d8382b}
.mdx .mdx-dots span{margin-left:6px}
.mdx .mdx-back{position:fixed;top:30px;right:48px;z-index:3;display:flex;align-items:center;gap:10px;background:none;border:0;color:#efe6d2;font:inherit;font-size:17px;cursor:pointer}
.mdx .mdx-back i{width:30px;height:30px;border-radius:50%;border:1.5px solid rgba(239,230,210,.6);display:grid;place-items:center}
.mdx .mdx-back svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.mdx .mdx-bar{position:fixed;left:0;right:0;bottom:0;z-index:2;height:88px;display:flex;align-items:center;padding:0 40px;background:linear-gradient(rgba(5,5,7,.55),rgba(5,5,7,.94));border-top:1px solid rgba(239,230,210,.1)}
.mdx .mdx-tools{display:flex;gap:4px}
.mdx .mdx-tools button{width:96px;display:flex;flex-direction:column;align-items:center;gap:7px;padding:12px 0 10px;background:none;border:0;border-bottom:2px solid transparent;color:#d9d2c2;font:inherit;font-size:14px;cursor:pointer}
.mdx .mdx-tools button svg{width:26px;height:26px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
.mdx .mdx-tools button.tr{color:#f0b25c;border-bottom-color:#f0b25c}
.mdx .mdx-tools button:hover{color:#fff}
.mdx .mdx-div{width:1px;height:48px;background:rgba(239,230,210,.25);margin:0 26px}
.mdx .mdx-keys{margin-left:auto;display:flex;align-items:center;gap:34px;font-size:15px;color:#d9d2c2}
.mdx .mdx-keys span{display:flex;align-items:center}
.mdx .mdx-keys kbd{font:500 14px "Be Vietnam Pro",sans-serif;color:#efe6d2;border:1px solid rgba(239,230,210,.55);border-radius:4px;padding:4px 9px;margin-right:6px}
.mdx .mdx-keys kbd+kbd{margin-left:4px}
.mdx .mdx-keys span kbd:last-of-type{margin-right:14px}
.mdx-cover{max-width:560px;padding-top:max(40px,9vh)}
.mdx-cover .mdx-logo img{width:440px;max-width:100%}
.mdx-cover .mdx-part{margin-top:22px;font:600 26px/1 Oswald,"Arial Narrow",sans-serif;text-transform:uppercase;letter-spacing:.06em;color:#f26a5c}
.mdx-cover .mdx-blurb{margin:22px 0 28px;font-size:18px;line-height:1.55;color:#d9d2c2;max-width:480px}
@media (max-width:899px),(orientation:portrait){
  #cover:has(.mdx) .in{padding:24px 16px 104px}
  #cover:has(.mdx-chap){background:linear-gradient(180deg,rgba(5,5,7,.6),rgba(5,5,7,.92) 40%),#08090b url(img2/bia.webp) 70% top/cover!important}
  .mdx .mdx-top{flex-direction:column;align-items:flex-start;gap:16px;margin-bottom:22px}.mdx .mdx-sep{display:none}
  .mdx .mdx-logo img{width:210px}.mdx .mdx-kick{font-size:12px}
  .mdx .mdx-h h2{font-size:36px}.mdx .mdx-h p{font-size:16px;margin-top:6px}
  .mdx .mdx-card{min-height:0;padding:20px 18px}
  .mdx .mdx-card::before{left:0;opacity:.32;-webkit-mask-image:none;mask-image:none}
  .mdx .mdx-card h4{font-size:34px}.mdx .mdx-card .meta{font-size:16px}.mdx .mdx-card .bl{font-size:15px;margin:10px 0 16px}
  .mdx .mdx-acts{gap:10px}.mdx .mdx-b{font-size:16px;padding:11px 16px}
  .mdx .mdx-dots{position:static;margin-top:16px;font-size:15px}
  .mdx .mdx-back{top:max(14px,env(safe-area-inset-top));right:14px;font-size:15px}
  .mdx .mdx-bar{height:auto;padding:6px 6px max(6px,env(safe-area-inset-bottom));justify-content:space-around;background:#08090b}
  .mdx .mdx-tools{width:100%;justify-content:space-around}.mdx .mdx-tools button{width:auto;flex:1;font-size:11.5px;gap:5px;padding:8px 0}
  .mdx .mdx-tools button svg{width:22px;height:22px}
  .mdx .mdx-div,.mdx .mdx-keys{display:none}
  .mdx-cover{padding-top:max(30px,6vh);margin:0 auto}
  .mdx-cover .mdx-logo img{width:300px}
  .mdx-cover .mdx-blurb{font-size:16px;margin:16px 0 22px}
  .mdx-cover .mdx-acts{flex-direction:column;align-items:stretch}.mdx .mdx-b.big{min-width:0;align-items:center}
}
@media (orientation:landscape) and (max-height:540px){
  #cover:has(.mdx) .in{padding:18px 24px 90px}
  .mdx .mdx-top{margin-bottom:14px}.mdx .mdx-h h2{font-size:34px}.mdx .mdx-logo img{width:180px}
  .mdx .mdx-card{min-height:0;padding:16px 22px}.mdx .mdx-card h4{font-size:30px}.mdx .mdx-card .bl{display:none}
  .mdx .mdx-bar{height:auto;padding:2px 16px max(2px,env(safe-area-inset-bottom))}.mdx .mdx-tools button{font-size:11px;gap:3px;padding:5px 0}.mdx .mdx-tools button svg{width:18px;height:18px}
  #cover:has(.mdx) .in{padding-bottom:70px!important}
  .mdx-cover .mdx-acts{flex-direction:row;align-items:center}.mdx .mdx-b.big{padding:10px 22px;font-size:19px}
  .mdx-cover{padding-top:16px}.mdx-cover .mdx-logo img{width:260px}.mdx-cover .mdx-blurb{margin:10px 0 14px;font-size:15px}
}

/* trang chủ theo bản vẽ */
#cover:has(.mdx-home){background:linear-gradient(90deg,rgba(5,5,7,.9) 0%,rgba(5,5,7,.6) 34%,rgba(5,5,7,0) 58%),linear-gradient(0deg,rgba(5,5,7,.55),transparent 30%),#08090b url(img2/bia.webp) 70% center/cover!important}
.mdx-home{display:flex!important;flex-direction:column;align-items:center;width:480px;margin:max(60px,14vh) 0 0 64px}
.mdx-home .mdx-kick{justify-content:center;font-size:16px}
.mdx-home .mdx-age{font-size:14px;padding:2px 7px;border-radius:5px}
.mdx-home .mdx-tua{display:block;width:540px;max-width:112%;height:auto;margin:22px 0 24px}
.mdx-home .mdx-hb{display:flex;flex-direction:column;gap:24px;width:100%}
.mdx-hbtn{position:relative;overflow:hidden;display:flex;align-items:center;justify-content:space-between;width:100%;box-sizing:border-box;text-align:left;cursor:pointer;color:#efe6d2;background:rgba(9,9,11,.55);border:1.5px solid rgba(239,230,210,.32);border-radius:16px;padding:18px 28px 18px 34px;transition:filter .15s,border-color .15s}
.mdx-hbtn span{position:relative;display:flex;flex-direction:column;gap:6px}
.mdx-hbtn b{font:600 28px/1 Oswald,"Arial Narrow",sans-serif;text-transform:uppercase;letter-spacing:.06em}
.mdx-hbtn small{font:400 17px/1.2 "Be Vietnam Pro",sans-serif;color:#f3dcd6}
.mdx-hbtn .cv{position:relative;width:26px;height:26px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;flex:none}
.mdx-hbtn.pri{min-height:114px;border-color:#e2584b;background:linear-gradient(90deg,#b3231b 0%,#9d1d16 45%,rgba(120,20,16,.75) 100%);box-shadow:0 0 0 1px rgba(226,88,75,.25),0 12px 34px rgba(170,30,22,.35)}
.mdx-hbtn.pri::before{content:"";position:absolute;inset:0 0 0 45%;background:url(img2/hem-dem.webp) center/cover;mix-blend-mode:luminosity;opacity:.35;-webkit-mask-image:linear-gradient(90deg,transparent,#000 60%);mask-image:linear-gradient(90deg,transparent,#000 60%)}
.mdx-hbtn.pri::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent 40%,rgba(179,35,27,.45));pointer-events:none}
.mdx-hbtn.pri b{font-size:38px;color:#fff;letter-spacing:.03em}
.mdx-hbtn:hover:not(:disabled){filter:brightness(1.12);border-color:rgba(239,230,210,.6)}
.mdx-hbtn.pri:hover:not(:disabled){border-color:#ff7a6c}
.mdx-hbtn:focus-visible{outline:2px solid #efe6d2;outline-offset:4px}
.mdx-hbtn:disabled{cursor:wait;opacity:.75}
.mdx .mdx-logo .crop{display:block;width:290px;aspect-ratio:1000/345;overflow:hidden}
.mdx .mdx-logo .crop img{width:100%!important}
@media (max-width:899px),(orientation:portrait){
  .mdx-home{width:auto;max-width:440px;margin:max(36px,8vh) auto 0}
  .mdx-home .mdx-tua{width:330px}
  .mdx-hbtn{padding:14px 20px}.mdx-hbtn b{font-size:22px}.mdx-hbtn.pri{min-height:90px}.mdx-hbtn.pri b{font-size:30px}.mdx-hbtn small{font-size:14.5px}
  .mdx .mdx-logo .crop{width:210px}
  #cover:has(.mdx-home){background:linear-gradient(180deg,rgba(5,5,7,.55),rgba(5,5,7,.88) 55%),#08090b url(img2/bia.webp) 72% center/cover!important}
}
@media (orientation:landscape) and (max-height:540px){
  .mdx-home{margin:14px 0 0 32px;width:360px}.mdx-home .mdx-tua{width:280px;margin:8px 0 12px}.mdx-home .mdx-hb{gap:12px}
  .mdx-hbtn.pri{min-height:0}.mdx-hbtn{padding:10px 18px}.mdx-hbtn.pri b{font-size:24px}.mdx-hbtn b{font-size:18px}.mdx-hbtn small{font-size:13px}
  .mdx .mdx-logo .crop{width:180px}
  #cover:has(.mdx-home){background:linear-gradient(90deg,rgba(5,5,7,.9) 0%,rgba(5,5,7,.55) 45%,rgba(5,5,7,0) 70%),#08090b url(img2/bia.webp) 70% center/cover!important}
}
.mdx-home .mdx-tuac{display:block;width:540px;max-width:112%;aspect-ratio:1000/345;overflow:hidden;margin:22px 0 30px}.mdx-home .mdx-tuac .mdx-tua{width:100%!important;max-width:none;margin:0!important}
@media (max-width:899px),(orientation:portrait){.mdx-home .mdx-tuac{width:330px}}
@media (orientation:landscape) and (max-height:540px){.mdx-home .mdx-tuac{width:280px;margin:8px 0 14px}}
/* 2 nút màn đầu cao bằng nhau (máy tính + điện thoại); điện thoại dọc: dồn 2 nút xuống nửa dưới, trên thanh công cụ */
.mdx-hbtn{min-height:114px}
@media (max-width:899px),(orientation:portrait){
  .mdx-hbtn{min-height:90px}
  #cover:has(.mdx-home) .in{padding-bottom:0!important}
  .mdx-home{min-height:calc(100dvh - 92px - env(safe-area-inset-bottom));box-sizing:border-box;margin-top:0!important;padding:max(28px,6vh) 0 22px}
  .mdx-home .mdx-hb{margin-top:auto;gap:16px}
}
@media (orientation:landscape) and (max-height:540px){.mdx-hbtn{min-height:58px}.mdx-home{min-height:0;padding:0}.mdx-home .mdx-hb{margin-top:0}}

/* ===== trang chủ bản chốt (29/10): logo đủ chữ, thẻ trailer góc phải, nút vàng, 5 biểu tượng, chân trang ===== */
#cover:has(.hm){background:linear-gradient(180deg,rgba(5,5,7,.25) 0%,rgba(5,5,7,.35) 40%,rgba(5,5,7,.88) 72%,rgba(5,5,7,.96) 100%),#08090b url(img2/bia.webp) 62% center/cover!important}
#cover:has(.hm) .in{padding:0!important;max-width:none!important;width:100%!important}
.hm{position:relative;display:flex;flex-direction:column;align-items:center;min-height:100dvh;box-sizing:border-box;padding:max(26px,env(safe-area-inset-top)) 18px max(14px,env(safe-area-inset-bottom));width:100%;max-width:560px;margin:0 auto;color:#efe6d2;font-family:"Be Vietnam Pro",sans-serif}
.hm .kick{align-self:flex-start;display:flex;align-items:center;gap:12px;font:500 15px/1 Newsreader,Georgia,serif;letter-spacing:.32em;text-transform:uppercase;color:#e9dcc4;margin-top:22px}
.hm .kick em{font-style:normal;letter-spacing:.04em;font:600 13px/1 "Be Vietnam Pro",sans-serif;color:#ff6a5c;border:1.5px solid #e2453c;border-radius:5px;padding:3px 6px}
.hm .tlr{position:absolute;top:max(18px,env(safe-area-inset-top));right:16px;width:118px;border:1.5px solid rgba(239,230,210,.55);border-radius:12px;overflow:hidden;background:#0b0c10;cursor:pointer;padding:0;color:#efe6d2;box-shadow:0 8px 22px rgba(0,0,0,.5)}
.hm .tlr i{display:grid;place-items:center;height:64px;background:linear-gradient(rgba(0,0,0,.25),rgba(0,0,0,.45)),url(img2/hem-dem.webp) center/cover}
.hm .tlr i svg{width:34px;height:34px;fill:rgba(0,0,0,.45);stroke:#fff;stroke-width:1.6}
.hm .tlr span{display:block;padding:7px 4px 8px;font:600 10.5px/1 "Be Vietnam Pro",sans-serif;letter-spacing:.12em;text-transform:uppercase;text-align:center}
.hm .logo{display:flex;flex-direction:column;align-items:center;margin:auto 0 0;padding-top:16vh}
.hm .logo img{width:min(560px,100%);height:auto;display:block;filter:drop-shadow(0 6px 24px rgba(0,0,0,.6))}
.hm .orn{display:flex;align-items:center;gap:10px;margin-top:6px;color:#c9b48c}.hm .orn::before,.hm .orn::after{content:"";width:110px;height:1px;background:linear-gradient(90deg,transparent,#c9b48c)}.hm .orn::after{transform:scaleX(-1)}.hm .orn i{width:7px;height:7px;transform:rotate(45deg);border:1px solid #c9b48c}
.hm .btns{display:flex;flex-direction:column;gap:16px;width:100%;margin-top:clamp(28px,7vh,80px)}
.hm .b{position:relative;overflow:hidden;display:flex;align-items:center;gap:16px;width:100%;box-sizing:border-box;min-height:84px;padding:16px 20px;border-radius:18px;border:1.5px solid rgba(239,230,210,.35);background:rgba(10,10,12,.55);color:#efe6d2;text-align:left;cursor:pointer;-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px)}
.hm .b .ic{flex:none;width:34px;height:34px;display:grid;place-items:center}.hm .b .ic svg{width:34px;height:34px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linejoin:round}
.hm .b .tx{flex:1;min-width:0;position:relative;z-index:1}
.hm .b b{display:block;font:700 26px/1.05 Newsreader,Georgia,serif;letter-spacing:.06em;text-transform:uppercase}
.hm .b small{display:block;margin-top:6px;font:400 16px/1.3 Newsreader,Georgia,serif;opacity:.9}
.hm .b .cv{flex:none;width:24px;height:24px;fill:none;stroke:currentColor;stroke-width:2;position:relative;z-index:1}
.hm .b.pri{min-height:100px;color:#1d1408;border-color:#f2cf86;background:linear-gradient(90deg,#f2c879 0%,#e8b45e 48%,#c99545 100%);box-shadow:0 10px 30px rgba(232,180,94,.28),inset 0 1px 0 rgba(255,255,255,.4)}
.hm .b.pri::before{content:"";position:absolute;inset:0 0 0 52%;background:url(img2/hem-dem.webp) center/cover;opacity:.55;mix-blend-mode:multiply;-webkit-mask-image:linear-gradient(90deg,transparent,#000 70%);mask-image:linear-gradient(90deg,transparent,#000 70%)}
.hm .b.pri .ic svg{fill:#1d1408;stroke:none;width:40px;height:40px}
.hm .b.pri b{font-size:32px}
.hm .b:disabled{opacity:.7;cursor:wait}
.hm .b:hover:not(:disabled){filter:brightness(1.08)}
.hm .tools{display:flex!important;position:static!important;justify-content:space-between;width:100%;max-width:none!important;padding:0!important;border:0!important;gap:0!important;margin:clamp(24px,5vh,56px) 0 0!important}.hm .tools button{font-family:Newsreader,Georgia,serif!important}
.hm .tools button{flex:1;display:flex;flex-direction:column;align-items:center;gap:8px;padding:6px 2px;background:none;border:0;color:#e6dccb;font:400 15px/1.2 Newsreader,Georgia,serif;cursor:pointer;position:relative}
.hm .tools button+button::before{content:"";position:absolute;left:0;top:12%;bottom:12%;width:1px;background:rgba(239,230,210,.18)}
.hm .tools svg{width:30px;height:30px;fill:none;stroke:currentColor;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}
.hm .foot{margin-top:clamp(20px,4vh,44px);font:400 13.5px/1.6 Newsreader,Georgia,serif;color:#a9a090;text-align:center}
.hm .foot a{color:inherit;text-underline-offset:3px}
@media (min-width:900px) and (orientation:landscape){
  #cover:has(.hm){background:linear-gradient(90deg,rgba(5,5,7,.92) 0%,rgba(5,5,7,.65) 38%,rgba(5,5,7,0) 62%),#08090b url(img2/bia.webp) 70% center/cover!important}
  .hm{margin:0 0 0 6vw;max-width:520px;justify-content:center}.hm .logo{padding-top:0;margin:18px 0 0}.hm .kick{align-self:center}
  .hm .tlr{position:fixed;right:28px;top:24px;width:150px}.hm .tlr i{height:82px}
  .hm .foot{position:fixed;left:0;right:0;bottom:max(18px,env(safe-area-inset-bottom));margin:0;z-index:2}
}
@media (orientation:landscape) and (max-height:540px){
  .hm{min-height:0;padding:12px 18px;margin-left:24px;max-width:420px}.hm .kick{margin-top:0;font-size:12px}.hm .logo{padding-top:0;margin-top:6px}.hm .logo img{width:300px}.hm .orn{display:none}
  .hm .btns{gap:10px;margin-top:12px}.hm .b{min-height:0;padding:10px 16px}.hm .b.pri{min-height:0}.hm .b b{font-size:20px}.hm .b.pri b{font-size:24px}.hm .b small{font-size:13px}
  .hm .tools{margin-top:10px}.hm .tools svg{width:22px;height:22px}.hm .tools button{font-size:12.5px}.hm .foot{margin-top:8px;font-size:11.5px}.hm .tlr{width:110px}.hm .tlr i{height:52px}
}
@media (orientation:landscape) and (max-height:540px){.hm{padding-top:8px!important}.hm .logo img{width:220px!important}.hm .btns{margin-top:8px!important;gap:8px!important}.hm .b{padding:8px 14px!important}.hm .b.pri b{font-size:22px!important}.hm .b b{font-size:18px!important}.hm .b .ic,.hm .b .ic svg{width:26px!important;height:26px!important}.hm .foot{display:none}.hm .tools{margin-top:8px!important}.hm .tlr{position:fixed!important;right:14px!important;top:12px!important}.hm .tools{max-width:400px!important}.hm .tools button{font-size:12px!important;flex-direction:column!important;gap:4px!important;padding:2px!important}.hm .tools svg{width:20px!important;height:20px!important}}
@media (min-width:900px) and (orientation:landscape){.hm .tools button{font-size:16px!important;flex-direction:column!important;gap:8px!important}.hm .tools svg{width:28px!important;height:28px!important}}
@media (max-width:380px){.hm .b b{font-size:22px}.hm .b.pri b{font-size:27px}.hm .tools button{font-size:13px}}
`; document.head.appendChild(st); })();
const MDK={phuong:['Người lên tiếng','A'],imlang:['Im lặng đúng lúc','A'],bocphot:['Bóc phốt','B'],tien:['Nhận tiền','B'],hetgio:['Hết giờ','B']};
const MDBR={A:'Ngân về',B:'Lâm một mình'};
const MDI={tr:'<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M10 9.5v5l4.5-2.5z"/></svg>',
 so:'<svg viewBox="0 0 24 24"><path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11"/></svg>',
 acc:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/></svg>',
 cd:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8"/></svg>',
 app:'<svg viewBox="0 0 24 24"><rect x="7" y="3" width="10" height="18" rx="2"/><path d="M12 8v6M9.5 11.5 12 14l2.5-2.5"/></svg>',
 ung:'<svg viewBox="0 0 24 24"><path d="M5 9h11v6a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z"/><path d="M16 11h1.5a2.5 2.5 0 0 1 0 5H16M8 3.5c-.6 1 .6 1.8 0 3M11.5 3.5c-.6 1 .6 1.8 0 3"/></svg>'};
const MD={view:'cover',pick:null};
function mdState(){ const j=k=>{ try{ return JSON.parse(lsGet(k)||'null'); }catch(e){ return null; } };
  const s1=j(SAVEKEY), rec=p2p1(), s2=j(P2SAVE);
  const got=Object.keys(MDK).filter(k=>lsGet('tgl6_end_'+k)); if(rec&&rec.ket&&!got.includes(rec.ket)) got.push(rec.ket);
  return {p1:s1&&!s1.ended?{ngay:s1.day||1}:(typeof CLOUD!=='undefined'&&CLOUD&&!rec?{ngay:null}:null), xong:!!rec, rec, last:rec&&rec.ket, got,
    p2:s2&&s2.p2&&!s2.ended?{ngay:s2.day||1,ket:(s2.p1&&s2.p1.ket)||''}:null}; }
const mdTen=k=>(MDK[k]||[k])[0];
function mdPrimary(T){ if(T.p2) return {t:'Chơi tiếp',s:'Phần 2 · Ngày '+T.p2.ngay+(T.p2.ket?' · kết '+mdTen(T.p2.ket):''),red:1,go:'p2cont'};
  if(T.xong) return {t:'Vào Phần 2',s:'Mang theo kết '+mdTen(T.last)+' · lần chơi gần nhất',red:1,go:'p2last'};
  if(T.p1) return {t:'Chơi tiếp',s:'Phần 1'+(T.p1.ngay?' · Ngày '+T.p1.ngay:''),go:'p1cont'};
  return {t:'Chơi',s:'Phần 1 · Thế Giới Lặng',go:'p1new'}; }
function mdBar(v){ const T=mdState(); const tools=[['tr',MDI.tr,'Trailer'],['so',MDI.so,'Sổ tay'],['acc',MDI.acc,'Tài khoản'],['cd',MDI.cd,'Cài đặt'],['ung',MDI.ung,'Ủng hộ']].concat($('bInstall')&&!$('bInstall').hidden?[['app',MDI.app,'Cài app']]:[]);
  const keys=v==='chap'?[['<kbd>Space</kbd>','Chọn chương'],['<kbd>←</kbd><kbd>→</kbd>','Di chuyển']]:[['<kbd>Space</kbd>','Tiếp tục'],['<kbd>↑</kbd><kbd>↓</kbd>','Di chuyển']];
  return '<div class="mdx-bar"><div class="mdx-tools">'+tools.map(([k,i,l])=>'<button type="button" class="'+(k==='tr'?'tr':'')+'" data-go="t_'+k+'">'+i+'<span>'+esc(l)+'</span></button>').join('')+'</div><i class="mdx-div"></i><div class="mdx-keys">'+keys.map(([a,b])=>'<span>'+a+esc(b)+'</span>').join('')+'</div></div>'; }
const MDLOGO='<div class="mdx-logo"><i class="crop"><img src="img2/tua.webp" alt="Hẻm 47: Thế Giới Lặng" width="1000" height="471"></i><div class="mdx-kick">Sài Gòn · 2026<span class="mdx-age" title="18+ · Có nội dung về lừa đảo, buôn người, bạo lực và bắt nạt trên mạng">18+</span></div></div>';
function mdCover(T){ const p=mdPrimary(T), ld=$('bNew')&&$('bNew').disabled&&!/^p2/.test(p.go);
  const chev='<svg class="cv" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';
  const I={play:'<svg viewBox="0 0 24 24"><path d="M7 4.5v15l12.5-7.5z"/></svg>',book:'<svg viewBox="0 0 24 24"><path d="M3 5.5c3-1 6-1 9 1 3-2 6-2 9-1V19c-3-1-6-1-9 1-3-2-6-2-9-1z"/><path d="M12 6.5V20"/></svg>',
   tt:'<svg viewBox="0 0 24 24"><path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H5v1.5A3.5 3.5 0 0 0 8.5 11M16 6h3v1.5a3.5 3.5 0 0 1-3.5 3.5M12 13v4M8.5 20h7M10 17h4v3h-4z"/></svg>',
   tr:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M10 8.5v7l6-3.5z" fill="#fff" stroke="none"/></svg>'};
  const tools=[['so',MDI.so,'Sổ tay'],['cd',MDI.cd,'Cài đặt'],['acc',MDI.acc,'Tài khoản'],['tt',I.tt,'Thành tựu'],['ung',MDI.ung,'Ủng hộ']];
  return '<div class="mdv mdx hm">'+
   '<div class="tsts"><button type="button" class="tst" data-go="t_tr" aria-label="Xem trailer Phần 1"><img src="img/trailer-poster.webp" alt="" width="640" height="360"><i></i><span>trailer phần 1</span></button>'+
   '<button type="button" class="tst t2" data-go="t_tr2" aria-label="Xem trailer Phần 2"><img src="img2/x2-bo-song-dem.webp" alt="" width="640" height="360"><i></i><span>trailer phần 2</span></button></div>'+
   '<div class="kick">Sài Gòn · 2026<em title="18+ · Có nội dung về lừa đảo, buôn người, bạo lực và bắt nạt trên mạng">18+</em></div>'+
   '<div class="logo"><img src="img2/tua.webp" alt="Hẻm 47: Thế Giới Lặng" width="1000" height="471"></div>'+
   '<div class="btns"><button class="b pri" type="button" data-go="'+p.go+'"'+(ld?' disabled':'')+'><span class="ic">'+I.play+'</span><span class="tx"><b>'+esc(p.t)+'</b><small>'+esc(ld?'Đang tải tranh…':p.s)+'</small></span>'+chev+'</button>'+
   '<button class="b" type="button" data-go="chap"><span class="ic">'+I.book+'</span><span class="tx"><b>Chọn chương</b></span>'+chev+'</button></div>'+
   '<div class="tools">'+tools.map(([k,i,l])=>'<button type="button" data-go="t_'+k+'">'+i+'<span>'+esc(l)+'</span></button>').join('')+'</div>'+
   '<div class="foot">© 2026 Jesuis-Ing Studio · <a href="https://www.facebook.com/groups/hem47.asia" target="_blank" rel="noopener">Nhóm Cư dân Hẻm 47</a> · <a href="mailto:jesuising.studio@gmail.com">Liên hệ tác giả</a></div></div>'; }
function mdChap(T){ if(!MD.sel) MD.sel=(T.p2||T.xong)?2:1;
  const lock='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>', gear='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8"/></svg>';
  const m1=(T.p1?'Ngày '+(T.p1.ngay||1)+'/30':T.xong?'Đã xong':'Chưa chơi')+' <span>· '+T.got.length+'/5 kết</span>';
  const a1=T.p1?'<button class="mdx-b red" type="button" data-go="p1cont">Chơi tiếp</button><button class="mdx-b" type="button" data-go="p1new">Chơi lại từ đầu</button>'
    :T.xong?'<button class="mdx-b" type="button" data-go="p1new">Chơi lại từ đầu</button>':'<button class="mdx-b red" type="button" data-go="p1new">Chơi</button>';
  const m2=T.p2?'Ngày '+T.p2.ngay+'/21'+(T.p2.ket?' <span>· kết '+esc(mdTen(T.p2.ket))+'</span>':''):'<span>Chưa mở</span>';
  const a2=(T.p2?'<button class="mdx-b red" type="button" data-go="p2cont">Tiếp tục Phần 2</button>':'<button class="mdx-b" type="button" disabled title="Chưa có bài chơi Phần 2">'+lock+'Tiếp tục Phần 2</button>')+
    '<button class="mdx-b'+(!T.p2&&T.xong?' red':'')+'" type="button" data-go="'+(T.xong?'ends':'gate')+'">'+gear+'Thiết lập ký ức Phần 1<svg class="cv" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10l5 5 5-5"/></svg></button>';
  const dots='<div class="mdx-dots">'+Object.keys(MDK).map(k=>'<i class="'+(T.got.includes(k)?'on':'')+'"></i>').join('')+'<span>'+T.got.length+'/5 kết</span></div>';
  return '<div class="mdv mdx mdx-chap"><button class="mdx-back" type="button" data-go="cover"><i><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 6l-6 6 6 6"/></svg></i>Quay lại</button>'+
   '<div class="mdx-top">'+MDLOGO+'<i class="mdx-sep"></i><div class="mdx-h"><h2>Chọn chương</h2><p>Tiếp tục hành trình của Lâm.</p></div></div>'+
   '<div class="mdx-card'+(MD.sel===1?' sel':'')+'" data-card="1" style="--img:url(img2/bia.webp);--pos:70% 40%"><div class="k">Phần 1</div><h4>Thế Giới Lặng</h4><div class="meta">'+m1+'</div><p class="bl">Một bài bóc phốt sai.<br>Một người biến mất.<br>Và những câu hỏi chưa có lời giải.</p><div class="mdx-acts">'+a1+'</div>'+dots+'</div>'+
   '<div class="mdx-card'+(MD.sel===2?' sel':'')+'" data-card="2" style="--img:url(img2/x2-bo-ben-nay.webp);--pos:60% center"><div class="k">Phần 2</div><h4>Xứ Lạ</h4><div class="meta">'+m2+'</div><p class="bl">Người bên sông,<br>liệu còn nhớ tên mình?</p><div class="mdx-acts">'+a2+'</div></div>'+
   mdBar('chap')+'</div>'; }
function mdEnds(T){ if(!MD.pick||!T.got.includes(MD.pick)) MD.pick=T.last&&T.got.includes(T.last)?T.last:T.got[0]||'hetgio';
  const rec=T.rec||{};
  const list=Object.keys(MDK).map(k=>{ const [ten,br]=MDK[k]; if(!T.got.includes(k)) return '<div class="mdend locked" aria-disabled="true"><span class="n">???</span><span class="m">Chưa mở · chơi Phần 1 để tìm</span></div>';
    const sn=mdSnap(k)||(k===T.last?rec:null); const m=sn&&sn.chungcu!=null?sn.chungcu+' chứng cứ · '+money(sn.tien||0)+'đ':'đã mở · chưa lưu bằng chứng';
    return '<button type="button" class="mdend'+(MD.pick===k?' sel':'')+'" data-pick="'+k+'" aria-pressed="'+(MD.pick===k)+'"><span class="n">'+esc(ten)+(k===T.last?'<span class="mdlast">gần nhất</span>':'')+'</span><span class="m">'+esc(m)+'</span><span class="mdbr '+br+'">'+MDBR[br]+'</span></button>'; }).join('');
  const brNote=MDK[MD.pick][1]==='A'?'Ngân trở về hẻm. Bạn chơi xen kẽ Ngân và Lâm.':'Ngân vẫn mất tích. Lâm một mình đi tìm.';
  const warn=T.p2?'<div class="mdwarn">Phần 2 đang dở ở <b>ngày '+T.p2.ngay+'</b>'+(T.p2.ket?' (kết '+esc(mdTen(T.p2.ket))+')':'')+'. Bắt đầu lại sẽ xóa tiến trình này.</div>':'';
  const adm=(typeof isAdmin==='function'&&isAdmin())?'<details class="adm"><summary>Tùy chọn thử (tác giả)</summary><label><input type="checkbox" id="p2kl"> Khoa đã lật</label><label><input type="checkbox" id="p2tu"> đã vạch anh Tú</label><label><input type="checkbox" id="p2cg"> nói thật với cô Thoa</label><label><input type="checkbox" id="p2ph"> Phát làm chứng</label><div class="mdacts" style="margin-top:8px"><button class="mdsm" type="button" data-go="p2ts">Phòng thử Phần 2</button></div></details>':'';
  return '<div class="mdv inner"><div class="mdhd"><button class="mdback" type="button" data-go="chap" aria-label="Quay lại">‹</button><div><h3>Đi tiếp từ kết nào?</h3><p>Phần 2 nhận bằng chứng của lần chơi đạt kết đó</p></div></div>'+
   '<div class="mdendgrid">'+list+'</div><p class="mdhand">'+esc(brNote)+'</p>'+warn+adm+
   '<div class="mdfoot"><button class="bb red" type="button" data-go="p2pick">Vào Phần 2<small>Kết '+esc(mdTen(MD.pick))+'</small></button></div></div>'; }
function mdGate(){ return '<div class="mdv inner"><div><button class="mdback" type="button" data-go="'+(MD.from||'chap')+'" aria-label="Quay lại">‹</button></div>'+
  '<div class="kick" style="text-align:left">Hẻm 47 · Phần 2 · Xứ Lạ</div><h3 class="gh3">Bạn chưa đi hết Phần 1</h3>'+
  '<p class="mdhand">Phần 2 đi tiếp từ cái kết bạn chọn ở Phần 1. Ai giữ bằng chứng, ai còn tin Lâm, đều tính từ đó.</p>'+
  '<button class="mdopt rec" type="button" data-go="p1new"><b>Chơi Phần 1 trước</b><span>30 ngày ở hẻm 47. Nên chơi trước để Phần 2 có đủ nghĩa.</span></button>'+
  '<button class="mdopt" type="button" data-go="tomtat"><b>Xem tóm tắt rồi vào</b><span>Tóm tắt ngắn. Phần 2 bắt đầu với kết Hết giờ. Chơi Phần 1 sau vẫn mở thêm kết được.</span></button></div>'; }
const MD_TOMTAT=['Năm ngoái, Lâm là admin page Sài Gòn Bóc Phốt. Lâm đăng bài gọi chủ shop Ngân Order là kẻ lừa đảo ôm 1,2 tỷ.','Bài viết sai. Ngân mất hết, rồi biến mất.','Một năm sau, Lâm dọn về hẻm 47, nơi mẹ Ngân bán tạp hóa. Lần theo văn phòng tuyển dụng số 12, Lâm biết Ngân bị đưa qua bên kia biên giới, vào một trại lừa đảo.','Ba mươi ngày trôi qua. Lâm không kịp. Khu trại ở Ba Vẹt dời đi trong đêm.'];
function mdTom(){ return '<div class="mdv inner"><div><button class="mdback" type="button" data-go="gate" aria-label="Quay lại">‹</button></div><div class="kick" style="text-align:left">Phần 1 · tóm tắt</div>'+
  MD_TOMTAT.map(l=>'<p class="blurb" style="text-align:left;max-width:none;margin:0">'+esc(l)+'</p>').join('')+
  '<div class="mdfoot"><button class="bb red" type="button" data-go="p2gate">Vào Phần 2<small>Kết Hết giờ</small></button></div></div>'; }
function mdRender(){ const c=$('cover'); if(!c||P2.on||started) return; const inn=c.querySelector('.in'); if(!inn||!$('bNew')) return;
  const T=mdState(); const v=MD.view; let h=v==='chap'?mdChap(T):v==='ends'?mdEnds(T):v==='gate'?mdGate():v==='tomtat'?mdTom():mdCover(T);
  let box=inn.querySelector(':scope > .mdw'); if(!box){ box=document.createElement('div'); box.className='mdv mdw'; box.style.display='contents'; inn.appendChild(box); }
  box.innerHTML=h; c.classList.toggle('md-p2',T.xong&&(v==='cover'||v==='ends'||v==='tomtat'||v==='gate'));
  box.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>mdGo(b.dataset.go,T));
  box.querySelectorAll('[data-pick]').forEach(b=>b.onclick=()=>{ MD.pick=b.dataset.pick; mdRender(); });
  box.querySelectorAll('[data-card]').forEach(cd=>cd.addEventListener('pointerenter',()=>{ if(MD.sel!==+cd.dataset.card){ MD.sel=+cd.dataset.card; box.querySelectorAll('[data-card]').forEach(x=>x.classList.toggle('sel',x===cd)); } })); }
/* phím: ← → đổi phần, Space bấm nút chính của phần đang chọn (hoặc nút Chơi ở bìa) */
addEventListener('keydown',e=>{ const c=$('cover'); if(!c||c.hidden||P2.on||started||!c.querySelector('.mdx')) return; if(document.querySelector('.cd:not([hidden]),.so:not([hidden]),#auth:not([hidden]),.pn')) return;
  if(MD.view==='chap'&&['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){ e.preventDefault(); MD.sel=MD.sel===1?2:1; mdRender(); const b=c.querySelector('.mdx-card.sel .mdx-b:not(:disabled)'); if(b) b.focus({preventScroll:false}); return; }
  if(MD.view==='cover'&&(e.key==='ArrowUp'||e.key==='ArrowDown')){ e.preventDefault(); const L=[...c.querySelectorAll('.mdx-hbtn:not(:disabled)')]; const k=L.indexOf(document.activeElement); const n=L[(k+(e.key==='ArrowDown'?1:L.length-1))%L.length]; n&&n.focus(); return; }
  if(e.key===' '&&!(document.activeElement&&document.activeElement.tagName==='BUTTON')){ const b=MD.view==='chap'?c.querySelector('.mdx-card.sel .mdx-b.red:not(:disabled)')||c.querySelector('.mdx-card.sel .mdx-b:not(:disabled)'):MD.view==='cover'?c.querySelector('.mdx-hbtn.pri'):null; if(b){ e.preventDefault(); b.click(); } } });
/* trailer Phần 2: dán mã YouTube vào TLR2_YT khi có; chưa có thì báo sắp ra */
const TLR2_YT='EvJWfAXDTzQ';
function mdTrailer2(){ const ov=document.getElementById('tlr'); if(!TLR2_YT||!ov){ toast('Trailer Phần 2 sắp ra.'); return; }
  const box=ov.querySelector('.box'); ov.classList.remove('doc');
  box.innerHTML='<iframe src="https://www.youtube-nocookie.com/embed/'+encodeURIComponent(TLR2_YT)+'?autoplay=1&rel=0&playsinline=1" title="Trailer Hẻm 47 · Phần 2" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen style="width:100%;height:100%;border:0;display:block"></iframe>';
  const cap=ov.querySelector('.cap'); if(cap) cap.textContent='Hẻm 47: Thế Giới Lặng · Trailer Phần 2'; ov.hidden=false; }
function mdSnap(k){ try{ return JSON.parse(lsGet('tgl_chuong1_'+k)||'null'); }catch(e){ return null; } }
function mdP2Rec(k){ const rec=mdSnap(k)||p2p1()||{}; let p=Object.assign({},rec,{ket:k}); p.co=Object.assign({},rec.co||{});
  const ck=id=>$(id)&&$(id).checked; if(ck('p2kl')||ck('p2tu')||ck('p2cg')||ck('p2ph')) p.co=Object.assign({},p.co||{},{khoa_lat:ck('p2kl'),tu_lo:ck('p2tu'),noi_cuocgoi:ck('p2cg'),phat_nhanchung:ck('p2ph')}); return p; }
async function mdGo(g,T){ const tw=['cover','chap','ends','gate','tomtat']; if(tw.includes(g)){ if(g==='gate') MD.from=MD.view==='cover'?'cover':'chap'; MD.view=g; mdRender(); return; }
  if(g==='p1new'){ if(T.p1&&!confirm('Chơi lại Phần 1 từ ngày 1? Bài đang dở sẽ bị xóa.')) return; $('bNew').click(); return; }
  if(g==='p1cont'){ $('bCont').click(); return; }
  if(g==='p2cont'){ p2Begin(true); return; }
  if(g==='p2last'){ if(T.got.length>1){ MD.view='ends'; mdRender(); return; } lsDel(P2SAVE); p2Begin(false,mdP2Rec(T.last)); return; }
  if(g==='p2pick'){ if(T.p2&&!confirm('Bắt đầu lại Phần 2 sẽ xóa tiến trình đang dở. Tiếp tục?')) return; lsDel(P2SAVE); p2Begin(false,mdP2Rec(MD.pick)); return; }
  if(g==='p2gate'){ lsDel(P2SAVE); p2Begin(false,{ket:'hetgio',co:{}}); return; }
  if(g==='p2ts'){ const p1=mdP2Rec(MD.pick); TESTMODE=true; document.body.classList.add('testing'); await p2Begin(false,p1); tsTab='tt'; $('test').hidden=false; tsRender(); toast('Phòng thử Phần 2 · không lưu vào bản chơi thật'); return; }
  if(g==='t_tr'){ const c=document.querySelector('#tlr .cap'); if(c) c.textContent='Hẻm 47: Thế Giới Lặng · Trailer'; const s=document.querySelector('.tlr-st'); if(s) s.click(); return; }
  if(g==='t_tr2'){ mdTrailer2(); return; }
  if(g==='t_ung'){ const m=document.querySelector('.moi-st'); if(m) m.click(); else toast('Cảm ơn bạn đã ghé hẻm 47.'); return; }
  if(g==='t_tt'){ if(typeof ttOpen==='function') ttOpen(); return; }
  if(g==='t_so') $('bSo').click(); else if(g==='t_acc') $('bAcct').click(); else if(g==='t_cd') $('bCd').click(); else if(g==='t_app') $('bInstall').click(); }
/* vẽ khi bìa sẵn sàng, vẽ lại khi nút cũ đổi (tải xong tranh, có bài lưu) */
(()=>{ const kick=()=>{ if(!P2.on&&!started) mdRender(); }; kick(); const b=$('bNew'), c=$('bCont'), i=$('bInstall');
  const mo=new MutationObserver(kick); [b,c,i].forEach(x=>x&&mo.observe(x,{attributes:true,attributeFilter:['disabled','hidden']})); setTimeout(kick,600); setTimeout(kick,2500);
  /* màn kết hay màn khác thay nội dung bìa thì thôi không vẽ đè */ })();
