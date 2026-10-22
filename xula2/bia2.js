/* Hẻm 47 · màn đầu mới (theo bản thiết kế "Hẻm 47 Màn Đầu"). Chỉ chạy trên trang thử Phần 2.
   Giữ nguyên các nút cũ (ẩn đi) để mọi xử lý cũ vẫn chạy; bìa mới chỉ bấm hộ các nút đó. */
'use strict';
(()=>{ const st=document.createElement('style'); st.textContent=`
#cover .in:has(> .mdv){max-width:440px;width:100%}
#cover .in:has(> .mdv) > :not(.mdv){display:none!important}
#cover:has(.mdv) .tlr-st{display:none}
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
.mdv .mdhand{font-family:"Playpen Sans","Comic Sans MS",cursive;font-size:15px;color:#d9d3c4;line-height:1.55;margin:0}
.mdv .mdfoot .bb{width:100%;min-width:0}
.mdv .mdopt{display:flex;flex-direction:column;gap:3px;text-align:left;font:inherit;color:#efe8d8;background:rgba(16,19,28,.82);border:1px solid #2e3549;border-radius:14px;padding:12px 14px;cursor:pointer}
.mdv .mdopt b{font-family:Oswald,"Arial Narrow",sans-serif;font-weight:600;text-transform:uppercase;letter-spacing:.04em;font-size:18px;color:#f0b25c}
.mdv .mdopt span{font-size:12.5px;color:#cfcab9;line-height:1.45}.mdv .mdopt.rec{border-color:#f0b25c}
.mdv .gh3{margin:0;font-family:Oswald,"Arial Narrow",sans-serif;font-weight:600;text-transform:uppercase;font-size:30px;line-height:1.05;color:#f6efe0}
.mdv details.adm{font-size:12.5px;color:#959cb2}.mdv details.adm label{display:inline-flex;gap:4px;margin:4px 10px 0 0}
.mdv .ldx{font-size:12px;color:#959cb2}
`; document.head.appendChild(st); })();
const MDK={phuong:['Người lên tiếng','A'],imlang:['Im lặng đúng lúc','A'],bocphot:['Bóc phốt','B'],tien:['Nhận tiền','B'],hetgio:['Hết giờ','B']};
const MDBR={A:'Ngân về',B:'Lâm một mình'};
const MDI={tr:'<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M10 9.5v5l4.5-2.5z"/></svg>',
 so:'<svg viewBox="0 0 24 24"><path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11"/></svg>',
 acc:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/></svg>',
 cd:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8"/></svg>',
 app:'<svg viewBox="0 0 24 24"><rect x="7" y="3" width="10" height="18" rx="2"/><path d="M12 8v6M9.5 11.5 12 14l2.5-2.5"/></svg>'};
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
function mdCover(T){ const p=mdPrimary(T), two=T.xong, ld=$('bNew')&&$('bNew').disabled&&!/^p2/.test(p.go);
  const tools=[['tr',MDI.tr,'Trailer '+(two?'P2':'P1')],['so',MDI.so,'Sổ tay'],['acc',MDI.acc,'Tài khoản'],['cd',MDI.cd,'Cài đặt']].concat($('bInstall')&&!$('bInstall').hidden?[['app',MDI.app,'Cài app']]:[]);
  return '<div class="mdv"><div class="kick">Sài Gòn · 2026<span class="age" title="18+ · Có nội dung về lừa đảo, buôn người, bạo lực và bắt nạt trên mạng">18+</span></div>'+
   '<div class="tua"><img src="img2/tua.webp" alt="Hẻm 47: Thế Giới Lặng" width="1000" height="471"></div>'+
   (two?'<div class="part"><span>Phần 2</span>Xứ Lạ</div><p class="blurb">Có những người rời hẻm 47 với tờ giấy khám sức khỏe và lời hứa lương ba chục triệu. Họ không gọi điện về.</p>'
       :'<p class="blurb">Một năm trước, Lâm viết một bài bóc phốt sai. Cô gái tên Ngân mất hết rồi biến mất. Giờ Lâm dọn về đúng con hẻm mẹ cô bán tạp hóa.</p>')+
   '<div class="mainb"><button class="bb'+(p.red?' red':'')+'" type="button" data-go="'+p.go+'"'+(ld?' disabled':'')+'>'+esc(p.t)+'<small>'+esc(ld?'Đang tải tranh…':p.s)+'</small></button>'+
   '<button class="bb gh" type="button" data-go="chap">Chọn chương</button></div>'+
   '<div class="mdtools">'+tools.map(([k,i,l])=>'<button type="button" class="'+(k==='tr'?'tr':'')+'" data-go="t_'+k+'">'+i+esc(l)+'</button>').join('')+'</div></div>'; }
function mdDots(T){ return '<div class="mddots">'+Object.keys(MDK).map(k=>'<i class="'+(T.got.includes(k)?'on':'')+'"></i>').join('')+'<span>'+T.got.length+'/5 kết</span></div>'; }
function mdChap(T){ const p1st=T.p1?'Đang dở'+(T.p1.ngay?' · <b>Ngày '+T.p1.ngay+'</b>/30':''):T.xong?'<b>Đã xong</b>':'Chưa chơi';
  const p1act=T.p1?'<button class="mdsm pri" type="button" data-go="p1cont">Chơi tiếp</button><button class="mdsm" type="button" data-go="p1new">Chơi lại từ đầu</button>'
    :T.xong?'<button class="mdsm" type="button" data-go="p1new">Chơi lại từ đầu</button>':'<button class="mdsm pri" type="button" data-go="p1new">Chơi</button>';
  let p2st='',p2act;
  if(T.p2){ p2st='Đang dở · <b>Ngày '+T.p2.ngay+'</b>/21'+(T.p2.ket?' · kết <b>'+esc(mdTen(T.p2.ket))+'</b>':''); p2act='<button class="mdsm red" type="button" data-go="p2cont">Chơi tiếp</button><button class="mdsm" type="button" data-go="ends">Chơi lại từ đầu</button>'; }
  else if(T.xong){ p2st='Chưa bắt đầu · mở được từ <b>'+T.got.length+'</b> kết'; p2act='<button class="mdsm red" type="button" data-go="ends">Bắt đầu Phần 2</button>'; }
  else p2act='<div class="mdlockln">🔒 Mở khi xong Phần 1</div><button class="mdsm" type="button" data-go="gate">Vẫn muốn vào</button>';
  return '<div class="mdv inner"><div class="mdhd"><button class="mdback" type="button" data-go="cover" aria-label="Quay lại">‹</button><div><h3>Chọn chương</h3><p>Tiến trình mỗi phần lưu riêng</p></div></div>'+
   '<div class="mdch"><div class="mdim" style="background-image:url(img2/hem-dem.webp)"><span class="mdtag">Phần 1 · 30 ngày</span></div><div class="mdbd"><h4>Thế Giới Lặng</h4><div class="mdstt">'+p1st+'</div>'+mdDots(T)+'<div class="mdacts">'+p1act+'</div></div></div>'+
   '<div class="mdch'+(T.xong?'':' lock')+'"><div class="mdim" style="background-image:url(img2/x2-bo-ben-nay.webp);background-position:68% center"><span class="mdtag" style="color:#f0948d">Phần 2 · 21 ngày</span></div><div class="mdbd"><h4>Xứ Lạ</h4>'+(p2st?'<div class="mdstt">'+p2st+'</div>':'')+'<div class="mdacts">'+p2act+'</div></div></div></div>'; }
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
  box.querySelectorAll('[data-pick]').forEach(b=>b.onclick=()=>{ MD.pick=b.dataset.pick; mdRender(); }); }
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
  if(g==='t_tr'){ if(T.xong) toast('Trailer Phần 2 sắp ra.'); else { const s=document.querySelector('.tlr-st'); if(s) s.click(); } return; }
  if(g==='t_so') $('bSo').click(); else if(g==='t_acc') $('bAcct').click(); else if(g==='t_cd') $('bCd').click(); else if(g==='t_app') $('bInstall').click(); }
/* vẽ khi bìa sẵn sàng, vẽ lại khi nút cũ đổi (tải xong tranh, có bài lưu) */
(()=>{ const kick=()=>{ if(!P2.on&&!started) mdRender(); }; kick(); const b=$('bNew'), c=$('bCont'), i=$('bInstall');
  const mo=new MutationObserver(kick); [b,c,i].forEach(x=>x&&mo.observe(x,{attributes:true,attributeFilter:['disabled','hidden']})); setTimeout(kick,600); setTimeout(kick,2500);
  /* màn kết hay màn khác thay nội dung bìa thì thôi không vẽ đè */ })();
