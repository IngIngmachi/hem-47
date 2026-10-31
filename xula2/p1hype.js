/* Tăng nhịp căng (trang thử, chủ yếu cho Phần 1, vài thứ dùng chung 2 phần):
   1. Bám đuôi: tiếng bước chân mình + người bị theo, tim đập khi họ sắp quay lại, viền đỏ theo độ bị nghi, rung màn hình khi bị bắt
   2. Thanh "Khoa nghi": vượt mốc 40/60/80 thì có tiếng dội + tim đập vài giây, thanh nhấp nháy; trên 80 tim đập nền khi ra đường
   3. Manh mối / suy luận mới: tiếng "ra rồi" + chớp sáng vàng (suy luận mạnh hơn)
   4. Giọng nói: lúc chữ đang chạy, mỗi người có một "giọng" lách tách riêng (cao/thấp theo người), rất nhỏ
   5. Còn ≤ 5 ngày: đồng hồ trên thanh trên chuyển đỏ, nhấp nháy
   6. Vài lựa chọn gấp ở Phần 1 có đồng hồ đếm ngược (như Phần 2) */
(function(){
  const P2on=()=>typeof P2!=='undefined'&&P2.on;
  const vis=id=>{ const e=$(id); return e&&!e.hidden; };
  const css=`
#hvig{position:fixed;inset:0;pointer-events:none;z-index:45;opacity:0;transition:opacity .25s;background:radial-gradient(ellipse at center,rgba(0,0,0,0) 45%,rgba(150,18,12,.55) 100%)}
#hflash{position:fixed;inset:0;pointer-events:none;z-index:46;opacity:0;background:radial-gradient(circle at 50% 45%,rgba(255,214,140,.32),rgba(255,214,140,0) 60%)}
#hflash.on{animation:hflash .9s ease-out}
@keyframes hflash{0%{opacity:0}15%{opacity:1}100%{opacity:0}}
body.hshake #app{animation:hshake .45s cubic-bezier(.36,.07,.19,.97)}
@keyframes hshake{10%,90%{transform:translateX(-2px)}20%,80%{transform:translateX(4px)}30%,50%,70%{transform:translateX(-7px)}40%,60%{transform:translateX(7px)}}
#hNghi.hpulse{animation:hpulse .5s ease-in-out 6}
@keyframes hpulse{50%{filter:brightness(1.8) drop-shadow(0 0 6px #e2453c)}}
body.p1gap #hClock,body.p1gap #hDay{color:#ff7a6e!important;animation:hgap 1.6s ease-in-out infinite}
@keyframes hgap{50%{opacity:.55}}
.p2timer.p1t{position:absolute;left:0;top:0;height:4px;background:linear-gradient(90deg,#f0b25c,#e2453c);border-radius:4px}
`;
  const st=document.createElement('style'); st.id='p1hype'; st.textContent=css; document.head.appendChild(st);
  const vig=document.createElement('div'); vig.id='hvig'; document.body.appendChild(vig);
  const fl=document.createElement('div'); fl.id='hflash'; document.body.appendChild(fl);
  const flash=()=>{ fl.classList.remove('on'); void fl.offsetWidth; fl.classList.add('on'); };
  const shake=()=>{ document.body.classList.remove('hshake'); void document.body.offsetWidth; document.body.classList.add('hshake'); try{ if(typeof CD==='undefined'||CD.rung!==false) navigator.vibrate&&navigator.vibrate([80,40,120]); }catch(e){} };
  const T=(f,d,v,ty,dl)=>{ try{ tone(f,d,v,ty,dl); }catch(e){} };
  /* tiếng dội ngắn: trầm + rít */
  const sting=(big)=>{ if(!window.SFX) return; SFX.play(big?'boom':'hit',{v:big?1:.75}); SFX.play('timdap',{v:big?1:.8,dur:big?5:3.5,off:0,delay:.4}); };
  const reveal=(suy)=>{ flash(); }; /* bỏ tiếng 'ra rồi' theo ý tác giả, chỉ còn chớp sáng */
  const beatOnce=v=>{ T(55,.13,.05*v,'sine'); T(50,.11,.04*v,'sine',.16); };

  /* ---- 1. bám đuôi ---- */
  let sMe=null,sG=null,sH=null,lastX=null,lastLook='none',wasOn=false,lastSus=0;
  const tailTick=()=>{ if(typeof SO==='undefined') return; const on=!!SO.on;
    if(on&&!wasOn&&window.SFX){ sMe=SFX.loop('buocchan',{max:.5,tc:.08}); sG=SFX.loop('buocchan',{max:.65,rate:.86}); sH=SFX.loop('timdap',{max:.9}); lastLook='none'; }
    if(!on&&wasOn){ [sMe,sG,sH].forEach(x=>x&&x.stop()); sMe=sG=sH=null; vig.style.opacity=0; if(lastSus>=95){ shake(); window.SFX&&SFX.play('boom'); } lastSus=0; }
    wasOn=on; if(!on) return;
    const mv=lastX!=null&&Math.abs(PL.x-lastX)>.5; lastX=PL.x; const d=Math.abs(SO.x-PL.x);
    sMe&&sMe.set(mv&&!PL.hidden?1:0); sG&&sG.set(SO.look==='none'&&SO.state==='walk'?Math.max(.15,1-d/700):0);
    const sus=SO.sus||0; lastSus=sus;
    const hb=SO.look==='look'?.6+sus/250:SO.look==='warn'?.45:sus>20?sus/120:0; sH&&sH.set(hb);
    if(SO.look!==lastLook){ if(SO.look==='warn'&&window.SFX) SFX.play('riser',{v:.6,off:1.6,dur:2.1}); if(SO.look==='look'&&window.SFX) SFX.play('hit',{v:.5}); lastLook=SO.look; }
    vig.style.opacity=Math.min(.95,(SO.look==='look'?.25:0)+sus/110); };

  /* ---- 2. thanh nghi ---- */
  let lastN=null, hbT=0, sHB=null;
  const nghiTick=dt=>{ if(typeof S==='undefined'||!S||typeof started==='undefined'||!started) return; const n=S.nghi||0;
    if(lastN!=null&&!(SO&&SO.on)){ for(const m of [40,60,80]) if(lastN<m&&n>=m){ sting(m>=80); hbT=4; const h=$('hNghi'); if(h){ h.classList.remove('hpulse'); void h.offsetWidth; h.classList.add('hpulse'); } if(m>=80) shake(); } }
    lastN=n; if(!window.SFX) return; if(!sHB) sHB=SFX.loop('timdap',{max:.7});
    const street=S.scene==='street'&&!vis('dlg')&&!vis('game');
    hbT=Math.max(0,hbT-dt); const want=hbT>0?0:(!P2on()&&n>=80&&street&&!(SO&&SO.on))?.3:0; sHB.set(want); };

  /* ---- 3. manh mối / suy luận mới ---- */
  if(typeof toast==='function'){ const t0=toast; toast=function(m){ try{ const s=String(m||''); if(/^Suy luận mới/.test(s)) reveal(true); else if(/^(Manh mối mới|Chứng cứ mới|Lời khai mới|Ảnh mới)/.test(s)) reveal(false); }catch(e){} return t0.apply(this,arguments); }; }

  /* ---- 4. giọng lách tách khi chữ đang chạy ---- */
  const VF={lam:150,ngan:290,khoa:118,tu:132,basau:230,thoa:250,bin:205,hanh:270,tam:110,loc:125,huong:300,vinh:105,diem:285,phuong:310,phat:160,tung:175,bay:240,seo:95,thuy:300,nhi:320,toan:140,hue:255,ti:220,khang:170,thoai:100,my:215};
  const vOf=n=>{ const k=(typeof SPK!=='undefined'&&SPK[n])||''; if(VF[k]) return VF[k]; let h=0; for(const c of String(n)) h=(h*31+c.charCodeAt(0))>>>0; const fem=/^(Chị|Cô|Bà|Em gái|Bé)(?=\s|$)/.test(n); return (fem?240:120)+h%60; };
  let blipIv=null;
  if(typeof say==='function'){ const s0=say; say=function(kind,name,text){ const p=s0.apply(this,arguments); try{ clearInterval(blipIv); if(kind==='thoai'&&name&&!(typeof CD!=='undefined'&&CD.blip===false)){ const f=vOf(name); let n=0; blipIv=setInterval(()=>{ if(!typing){ clearInterval(blipIv); return; } if(++n%2) return; T(f*(.92+Math.random()*.16),.045,.011,'triangle'); },45); } }catch(e){} return p; }; }

  /* ---- 5. còn ít ngày ---- */
  const gapTick=()=>{ if(typeof S==='undefined'||!S||typeof TOTAL_DAYS==='undefined') return; document.body.classList.toggle('p1gap',!!(typeof started!=='undefined'&&started&&!S.ended&&TOTAL_DAYS-S.day<=5)); };

  /* ---- 6. lựa chọn gấp Phần 1 (giây, lựa chọn mặc định khi hết giờ) ---- */
  const TM={n1_dem_a:[15,'n1_dem_c'],h3_khoaghe_a:[8,'h3_khoaghe_b'],h2_tumua_a:[10,'h2_tumua_b']};
  if(typeof choose==='function'){ const c0=choose; choose=function(set,inPhone,title,face){ const p=c0.apply(this,arguments);
    try{ if(P2on()||!set||!set.length||(typeof CD!=='undefined'&&CD.gap==='tat')) return p; const k=set.find(r=>TM[r.ma]); if(!k) return p; const [sec,def]=TM[k.ma]; const pick=set.find(r=>r.ma===def);
      const tm=Math.round((sec+set.reduce((a,r)=>a+String(r.loi||'').length,0)/20)*(typeof CD!=='undefined'&&CD.gap==='cham'?1.5:1));
      const host=$('dlg'); const bar=document.createElement('div'); bar.className='p2timer p1t'; bar.style.width='100%'; if(host) host.insertBefore(bar,host.firstChild);
      setTimeout(()=>{ bar.style.transition='width '+tm+'s linear'; bar.style.width='0%'; },700);
      const stopU=window.SFX?SFX.urgent(tm*1000+700):()=>{}; const beatIv=0;
      return new Promise(res=>{ let over=false; const to=setTimeout(()=>{ if(over) return; over=true; stopU(); bar.remove(); toast('Hết giờ'); const idx=set.findIndex(r=>r.ma===def); if(typeof chooseFn==='function'&&idx>=0) chooseFn(idx); else res(pick); },tm*1000+700);
        p.then(v=>{ stopU(); if(!over){ over=true; clearTimeout(to); } bar.remove(); res(v); }); }); }catch(e){ return p; } }; }

  let last=performance.now();
  setInterval(()=>{ const now=performance.now(), dt=(now-last)/1000; last=now; try{ tailTick(); }catch(e){} try{ nghiTick(dt); }catch(e){} try{ gapTick(); }catch(e){} },100);
})();

/* ---- Cài đặt (trang thử): bỏ mục màu Za Lô (giao diện điện thoại mới không dùng nữa),
   thêm nhóm "Nhịp chơi": đồng hồ lựa chọn gấp (Bật / Chậm hơn / Tắt), tiếng giọng lách tách, rung máy ---- */
(function(){
  if(typeof CD==='undefined'||typeof cdOpen!=='function') return;
  if(CD.gap==null) CD.gap='bat'; if(CD.blip==null) CD.blip=true; if(CD.rung==null) CD.rung=true;
  const seg=(k,o)=>'<div class="seg" data-k="'+k+'">'+o.map(([v,l])=>'<button type="button" data-v="'+v+'" class="'+(String(CD[k])===String(v)?'on':'')+'">'+l+'</button>').join('')+'</div>';
  const c0=cdOpen; cdOpen=function(){ c0.apply(this,arguments); const B=$('cdBox'); if(!B) return;
    const za=B.querySelector('.zas'); if(za&&za.closest('.cd-r')) za.closest('.cd-r').remove();
    B.querySelectorAll('.cd-s').forEach(s=>{ if(/^Điện thoại của/.test(s.textContent)) s.textContent='Điện thoại'; });
    const am=[...B.querySelectorAll('.cd-s')].find(s=>s.textContent==='Âm thanh'); if(!am) return;
    const box=document.createElement('div');
    box.innerHTML='<div class="cd-s">Nhịp chơi</div>'+
      '<div class="cd-r"><span>Lựa chọn gấp<small>Một số lựa chọn có đồng hồ đếm ngược. Chậm hơn: thêm một nửa thời gian. Tắt: chọn thong thả, hết giờ không tự chọn.</small></span>'+seg('gap',[['bat','Bật'],['cham','Chậm hơn'],['tat','Tắt']])+'</div>'+
      '<div class="cd-r"><span>Giọng lách tách<small>Tiếng lách tách nhỏ theo từng người khi chữ đang chạy</small></span>'+seg('blip',[['true','Bật'],['false','Tắt']])+'</div>'+
      '<div class="cd-r"><span>Rung máy<small>Điện thoại rung khi bị bắt gặp, bị nghi nặng</small></span>'+seg('rung',[['true','Bật'],['false','Tắt']])+'</div>';
    am.before(...box.childNodes);
    B.querySelectorAll('.seg[data-k="gap"],.seg[data-k="blip"],.seg[data-k="rung"]').forEach(g=>g.querySelectorAll('button').forEach(bt=>bt.onclick=()=>{ const v=bt.dataset.v; CD[g.dataset.k]=v==='true'?true:v==='false'?false:v; cdSave(); cdOpen(); })); };
  /* điện thoại · ứng dụng Cài đặt: bỏ dòng kỹ thuật "Đang dùng bảng ..." */
  if(typeof renderPhone==='function'){ const r0=renderPhone; renderPhone=function(){ const out=r0.apply(this,arguments); try{ document.querySelectorAll('#phBody .card').forEach(c=>{ if(/^Lời thoạiĐang dùng bảng/.test(c.textContent)) c.remove(); }); }catch(e){} return out; }; }
})();

/* ---- Ghi lỗi tự động: lỗi trong game gửi về bảng "loi" trên Supabase (mỗi phiên tối đa 8 lỗi, trùng thì bỏ) ---- */
(function(){ const seen=new Set(); let n=0;
  const send=(msg,src,line,col,stack)=>{ try{ msg=String(msg||'').slice(0,300); if(!msg||/ResizeObserver|Script error\.?$/.test(msg)) return; const key=msg+'|'+line; if(seen.has(key)||n>=8) return; seen.add(key); n++;
    if(typeof supa==='undefined'||!supa) return; const st=(typeof S!=='undefined'&&S)?S:{};
    supa.from('loi').insert({msg,src:String(src||'').slice(-120),dong:line||null,cot:col||null,stack:String(stack||'').slice(0,1500),trang:location.pathname.slice(-40),phan:(typeof P2!=='undefined'&&P2.on)?2:1,ngay:st.day||null,hoi:st.hoi||null,canh:String(st.scene||'')+(st.room?':'+st.room:''),ua:navigator.userAgent.slice(0,200),w:innerWidth,h:innerHeight}).then(()=>{},()=>{}); }catch(e){} };
  addEventListener('error',e=>send(e.message,e.filename,e.lineno,e.colno,e.error&&e.error.stack));
  addEventListener('unhandledrejection',e=>{ const r=e.reason||{}; send('Promise: '+(r.message||r),'',0,0,r.stack); }); })();

/* ---- Chống đơ (31/10, bản 2): một bước trong game lỗi giữa chừng thì cờ "đang bận" kẹt lại, bấm gì cũng không ăn, phải F5.
   Chỉ gỡ khi chắc là kẹt thật: cờ bận kéo dài ≥ 12 giây, KHÔNG có gì phủ lên màn (điểm giữa màn là khung hình game),
   không có thoại/lựa chọn/chữ chạy đang chờ, VÀ người chơi đã chạm/bấm vào khung game ít nhất 3 lần mà không ăn.
   Bản 1 gỡ nhầm lúc game đang bận hợp lệ (đi bộ tự động, mở laptop…), bản này chặt hơn và ghi kèm thứ đang hiện để sửa tận gốc. ---- */
(function(){ let since=0, last='', taps=0;
  const vis=id=>{ const e=document.getElementById(id); return !!(e&&!e.hidden&&e.offsetParent!==null); };
  const anyOpen=()=>vis('dlg')||vis('game')||vis('phone')||vis('so')||vis('cd')||vis('cover')||vis('ed')||vis('hd')||vis('typeEnd')||vis('inst')
    ||!!document.querySelector('#p2khai,.p2cardfull,.p2bao,#p2anh,#p2kl,.md:not([hidden])')||(typeof chooseFn!=='undefined'&&chooseFn)||(typeof typing!=='undefined'&&typing)||(typeof waitFn!=='undefined'&&waitFn)
    ||(typeof sleeping!=='undefined'&&sleeping)||(typeof ticking!=='undefined'&&ticking)||(typeof camping!=='undefined'&&camping)||(typeof SO!=='undefined'&&SO&&SO.on)||(typeof fade!=='undefined'&&fade>0.05);
  const onStage=el=>!!(el&&(el.id==='cv'||el.id==='stage'));
  const topAt=(x,y)=>{ const e=document.elementFromPoint(x,y); return e?(e.id?'#'+e.id:'')+(e.className&&typeof e.className==='string'?'.'+e.className.split(' ')[0]:'')+'<'+e.tagName.toLowerCase():'-'; };
  const tap=e=>{ if(since&&typeof busy!=='undefined'&&busy&&(e.type==='keydown'||onStage(e.target))) taps++; };
  addEventListener('pointerdown',tap,true); addEventListener('keydown',tap,true);
  setInterval(()=>{ try{
    if(typeof started==='undefined'||!started||typeof busy==='undefined'||!busy||document.hidden||anyOpen()){ since=0; taps=0; return; }
    if(!onStage(document.elementFromPoint(innerWidth/2,innerHeight/2))){ since=0; taps=0; return; }
    if(!since){ since=Date.now(); taps=0; return; }
    if(Date.now()-since<12000||taps<3) return;
    window.__unstuck=(window.__unstuck||0)+1; busy=false; since=0; taps=0; if(typeof evBusy!=='undefined') evBusy=false; try{ hud(); }catch(e){}
    const st=(typeof S!=='undefined'&&S)?S:{}; const key=(st.day||'')+'|'+(st.scene||'');
    if(key!==last&&typeof supa!=='undefined'&&supa){ last=key; supa.from('loi').insert({msg:'Tự gỡ kẹt v2: bận ≥12s, người chơi bấm không ăn',src:'chongdo',stack:('giữa:'+topAt(innerWidth/2,innerHeight/2)+' · trên:'+topAt(innerWidth/2,60)+' · dưới:'+topAt(innerWidth/2,innerHeight-60)+'\n'+String(window.__lastErr||'')).slice(0,1500),trang:location.pathname.slice(-40),phan:(typeof P2!=='undefined'&&P2.on)?2:1,ngay:st.day||null,hoi:st.hoi||null,canh:String(st.scene||'')+(st.room?':'+st.room:''),ua:navigator.userAgent.slice(0,200),w:innerWidth,h:innerHeight}).then(()=>{},()=>{}); }
  }catch(e){} },1000);
  addEventListener('error',e=>{ window.__lastErr=(e.message||'')+' @'+(e.filename||'').slice(-40)+':'+e.lineno+'\n'+((e.error&&e.error.stack)||''); });
  addEventListener('unhandledrejection',e=>{ const r=e.reason||{}; window.__lastErr='Promise: '+(r.message||r)+'\n'+(r.stack||''); });
  /* lỗi xảy ra trước khi file này chạy (vd. file minigame không đọc được trên máy cũ) được giữ trong window.__EQ ở đầu trang → gửi bù */
  setTimeout(()=>{ try{ (window.__EQ||[]).slice(0,4).forEach(a=>{ if(typeof supa!=='undefined'&&supa) supa.from('loi').insert({msg:String(a[0]||'').slice(0,300),src:String(a[1]||'').slice(-120),dong:a[2]||null,cot:a[3]||null,stack:String(a[4]||'').slice(0,1500),trang:location.pathname.slice(-40),phan:1,ua:navigator.userAgent.slice(0,200),w:innerWidth,h:innerHeight}).then(()=>{},()=>{}); }); window.__EQ=[]; }catch(e){} },6000);
})();

/* Cài đặt gọn lại (30/10): mỗi nhóm một khung, dòng phụ ngắn, mô tả độ khó một dòng */
(function(){ if(typeof cdOpen!=='function') return;
  const st=document.createElement('style'); st.textContent=`
#cdBox .cd-s{margin:18px 2px 6px!important}
#cdBox .cd-grp{background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:2px 14px}
#cdBox .cd-grp>.cd-r{margin:0!important;padding:11px 0;border-top:1px solid rgba(255,255,255,.06)}
#cdBox .cd-grp>.cd-r:first-child{border-top:0}
#cdBox .cd-grp>.cd-tip{background:none!important;border:0!important;padding:0 0 10px!important;margin:-4px 0 0!important;font-size:12.5px;color:#9aa0b4}
#cdBox .cd-grp>.cd-r:not(:has(.walls)){flex-wrap:nowrap!important;align-items:center}
#cdBox .cd-grp>.cd-r>span{flex:1 1 auto!important;min-width:0}
#cdBox .cd-grp>.cd-r>.seg{flex:none;margin-left:auto}
#cdBox .cd-grp>.cd-r:has(input[type=range])>span{flex:0 0 112px!important}
#cdBox .cd-grp>.cd-r input[type=range]{flex:1;min-width:0}
#cdBox .cd-grp .seg button{padding-left:11px!important;padding-right:11px!important}
#cdBox .cd-r>span{font-size:15px}
#cdBox .cd-r>span small{font-size:12px!important;color:#8e94a8!important;margin-top:2px}
#cdBox .walls{padding-bottom:12px}`; document.head.appendChild(st);
  const SM={'Chữ dễ đọc':'Thay chữ viết tay bằng chữ thường','Tự đọc tiếp':'Câu tự qua, khỏi chạm','Lựa chọn gấp':'Đồng hồ ở các lựa chọn gấp','Giọng lách tách':'Tiếng nhỏ khi chữ đang chạy','Rung máy':'Khi bị bắt gặp, bị nghi nặng','Tiếng hiệu ứng':'Tiếng phím, chuông, tiếng bấm','Hình nền':'Mở thêm khi chơi tới','Giảm chuyển động':'Tắt phóng tranh, chuyển cảnh'};
  const TIP={de:'Khoa nghi chậm, làm thêm được nhiều tiền, nối thẻ có gợi ý.',thuong:'Như game gốc.',kho:'Khoa nghi nhanh, làm thêm bị trừ nhiều, nối thẻ không gợi ý.'};
  const c1=cdOpen; cdOpen=function(){ c1.apply(this,arguments); const B=$('cdBox'); if(!B) return;
    B.querySelectorAll('.cd-r>span').forEach(sp=>{ const sm=sp.querySelector('small'); const t=(sp.firstChild&&sp.firstChild.textContent||'').trim(); if(sm&&SM[t]) sm.textContent=SM[t]; });
    const tip=B.querySelector('.cd-tip'); if(tip) tip.textContent=TIP[CD.kho]||'';
    B.querySelectorAll('.seg[data-k="gap"] [data-v="cham"]').forEach(b=>b.textContent='Chậm');
    /* gom các dòng sau mỗi tiêu đề nhóm vào một khung */
    [...B.querySelectorAll('.cd-s')].forEach(h=>{ const g=document.createElement('div'); g.className='cd-grp'; let n=h.nextElementSibling; while(n&&!n.classList.contains('cd-s')){ const nx=n.nextElementSibling; g.appendChild(n); n=nx; } h.after(g); }); }; })();
