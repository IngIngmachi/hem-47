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
  const shake=()=>{ document.body.classList.remove('hshake'); void document.body.offsetWidth; document.body.classList.add('hshake'); try{ navigator.vibrate&&navigator.vibrate([80,40,120]); }catch(e){} };
  const T=(f,d,v,ty,dl)=>{ try{ tone(f,d,v,ty,dl); }catch(e){} };
  /* tiếng dội ngắn: trầm + rít */
  const sting=(big)=>{ if(!window.SFX) return; if(SFX.has('hit')) SFX.play('hit',{v:big?1:.7}); SFX.play('timdap',{v:big?1:.8,dur:big?5:3.5,off:0}); };
  const reveal=(suy)=>{ flash(); }; /* bỏ tiếng 'ra rồi' theo ý tác giả, chỉ còn chớp sáng */
  const beatOnce=v=>{ T(55,.13,.05*v,'sine'); T(50,.11,.04*v,'sine',.16); };

  /* ---- 1. bám đuôi ---- */
  let sMe=null,sG=null,sH=null,lastX=null,lastLook='none',wasOn=false,lastSus=0;
  const tailTick=()=>{ if(typeof SO==='undefined') return; const on=!!SO.on;
    if(on&&!wasOn&&window.SFX){ sMe=SFX.loop('buocchan',{max:.5,tc:.08}); sG=SFX.loop('buocchan',{max:.65,rate:.86}); sH=SFX.loop('timdap',{max:.9}); lastLook='none'; }
    if(!on&&wasOn){ [sMe,sG,sH].forEach(x=>x&&x.stop()); sMe=sG=sH=null; vig.style.opacity=0; if(lastSus>=95) shake(); lastSus=0; }
    wasOn=on; if(!on) return;
    const mv=lastX!=null&&Math.abs(PL.x-lastX)>.5; lastX=PL.x; const d=Math.abs(SO.x-PL.x);
    sMe&&sMe.set(mv&&!PL.hidden?1:0); sG&&sG.set(SO.look==='none'&&SO.state==='walk'?Math.max(.15,1-d/700):0);
    const sus=SO.sus||0; lastSus=sus;
    const hb=SO.look==='look'?.6+sus/250:SO.look==='warn'?.45:sus>20?sus/120:0; sH&&sH.set(hb);
    if(SO.look!==lastLook){ if(SO.look==='warn') sting(false); lastLook=SO.look; }
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
  if(typeof say==='function'){ const s0=say; say=function(kind,name,text){ const p=s0.apply(this,arguments); try{ clearInterval(blipIv); if(kind==='thoai'&&name){ const f=vOf(name); let n=0; blipIv=setInterval(()=>{ if(!typing){ clearInterval(blipIv); return; } if(++n%2) return; T(f*(.92+Math.random()*.16),.045,.011,'triangle'); },45); } }catch(e){} return p; }; }

  /* ---- 5. còn ít ngày ---- */
  const gapTick=()=>{ if(typeof S==='undefined'||!S||typeof TOTAL_DAYS==='undefined') return; document.body.classList.toggle('p1gap',!!(typeof started!=='undefined'&&started&&!S.ended&&TOTAL_DAYS-S.day<=5)); };

  /* ---- 6. lựa chọn gấp Phần 1 (giây, lựa chọn mặc định khi hết giờ) ---- */
  const TM={n1_dem_a:[15,'n1_dem_c'],h3_khoaghe_a:[8,'h3_khoaghe_b'],h2_tumua_a:[10,'h2_tumua_b']};
  if(typeof choose==='function'){ const c0=choose; choose=function(set,inPhone,title,face){ const p=c0.apply(this,arguments);
    try{ if(P2on()||!set||!set.length) return p; const k=set.find(r=>TM[r.ma]); if(!k) return p; const [sec,def]=TM[k.ma]; const pick=set.find(r=>r.ma===def);
      const tm=Math.round(sec+set.reduce((a,r)=>a+String(r.loi||'').length,0)/20);
      const host=$('dlg'); const bar=document.createElement('div'); bar.className='p2timer p1t'; bar.style.width='100%'; if(host) host.insertBefore(bar,host.firstChild);
      setTimeout(()=>{ bar.style.transition='width '+tm+'s linear'; bar.style.width='0%'; },700);
      let beatIv=setInterval(()=>beatOnce(.8),900);
      return new Promise(res=>{ let over=false; const to=setTimeout(()=>{ if(over) return; over=true; clearInterval(beatIv); bar.remove(); toast('Hết giờ'); const idx=set.findIndex(r=>r.ma===def); if(typeof chooseFn==='function'&&idx>=0) chooseFn(idx); else res(pick); },tm*1000+700);
        p.then(v=>{ clearInterval(beatIv); if(!over){ over=true; clearTimeout(to); } bar.remove(); res(v); }); }); }catch(e){ return p; } }; }

  let last=performance.now();
  setInterval(()=>{ const now=performance.now(), dt=(now-last)/1000; last=now; try{ tailTick(); }catch(e){} try{ nghiTick(dt); }catch(e){} try{ gapTick(); }catch(e){} },100);
})();
