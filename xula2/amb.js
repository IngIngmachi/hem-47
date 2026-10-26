/* Âm nền theo nơi chốn (thử trên trang test, dùng chung 2 phần).
   Tự sinh bằng WebAudio, không cần tệp: tiếng phố, mưa, quạt trần, đèn tuýp, gõ phím, dế.
   Âm lượng theo thanh "Hiệu ứng" trong Cài đặt. Nhạc nền tự hạ khi đang có hộp thoại. */
(function(){
  let A=null, M=null, L={}, cur='', noiseBuf=null, clickT=0, crT=0, motoT=0;
  const ctx=()=>{ if(A) return A; A=typeof ac==='function'?ac():null; if(!A) return null;
    M=A.createGain(); M.gain.value=0; M.connect(A.destination);
    const n=A.sampleRate*3; noiseBuf=A.createBuffer(1,n,A.sampleRate); const d=noiseBuf.getChannelData(0); let b=0;
    for(let i=0;i<n;i++){ const w=Math.random()*2-1; b=(b+.02*w)/1.02; d[i]=b*3.5; } /* nhiễu nâu: êm, trầm */
    return A; };
  const noise=()=>{ const s=A.createBufferSource(); s.buffer=noiseBuf; s.loop=true; s.start(); return s; };
  const white=()=>{ const n=A.sampleRate*2, b=A.createBuffer(1,n,A.sampleRate), d=b.getChannelData(0); for(let i=0;i<n;i++) d[i]=Math.random()*2-1; const s=A.createBufferSource(); s.buffer=b; s.loop=true; s.start(); return s; };
  function layer(k){ if(L[k]) return L[k]; const g=A.createGain(); g.gain.value=0; g.connect(M); let src=[];
    if(k==='pho'){ const s=noise(), f=A.createBiquadFilter(); f.type='lowpass'; f.frequency.value=420; s.connect(f); f.connect(g); src=[s]; }
    if(k==='mua'){ const s=white(), f=A.createBiquadFilter(), f2=A.createBiquadFilter(); f.type='highpass'; f.frequency.value=900; f2.type='lowpass'; f2.frequency.value=7000; s.connect(f); f.connect(f2); f2.connect(g); src=[s]; }
    if(k==='phong'){ const s=noise(), f=A.createBiquadFilter(); f.type='lowpass'; f.frequency.value=180; s.connect(f); f.connect(g);
      const q=A.createOscillator(), qg=A.createGain(), lfo=A.createOscillator(), lg=A.createGain(); q.type='triangle'; q.frequency.value=58; qg.gain.value=.25; lfo.frequency.value=1.6; lg.gain.value=.12; lfo.connect(lg); lg.connect(qg.gain); q.connect(qg); qg.connect(g); q.start(); lfo.start(); src=[s,q,lfo]; }
    if(k==='tuyp'){ const o=A.createOscillator(), o2=A.createOscillator(), og=A.createGain(); o.type='sawtooth'; o.frequency.value=100; o2.type='sine'; o2.frequency.value=200; og.gain.value=.05; const f=A.createBiquadFilter(); f.type='lowpass'; f.frequency.value=900; o.connect(f); o2.connect(f); f.connect(og); og.connect(g); o.start(); o2.start(); src=[o,o2]; }
    L[k]={g,src}; return L[k]; }
  const set=(k,v,t)=>{ const l=layer(k); l.g.gain.setTargetAtTime(v,A.currentTime,t||1.2); };
  /* tiếng lẻ: gõ phím, dế, xe máy chạy ngang */
  const tick=(f,d,v,type)=>{ const o=A.createOscillator(), gg=A.createGain(); o.type=type||'square'; o.frequency.value=f; gg.gain.setValueAtTime(v,A.currentTime); gg.gain.exponentialRampToValueAtTime(.0001,A.currentTime+d); o.connect(gg); gg.connect(M); o.start(); o.stop(A.currentTime+d); };
  const moto=()=>{ const s=noise(), f=A.createBiquadFilter(), gg=A.createGain(), p=A.createStereoPanner?A.createStereoPanner():null; f.type='bandpass'; f.Q.value=3; const t=A.currentTime, dir=Math.random()<.5?-1:1;
    f.frequency.setValueAtTime(180,t); f.frequency.linearRampToValueAtTime(320,t+1.2); f.frequency.linearRampToValueAtTime(150,t+3); gg.gain.setValueAtTime(0,t); gg.gain.linearRampToValueAtTime(.55,t+1.2); gg.gain.linearRampToValueAtTime(0,t+3);
    s.connect(f); f.connect(gg); if(p){ p.pan.setValueAtTime(-dir,t); p.pan.linearRampToValueAtTime(dir,t+3); gg.connect(p); p.connect(M); } else gg.connect(M); setTimeout(()=>{ try{ s.stop(); }catch(e){} },3200); };
  function pick(){ if(typeof S==='undefined'||!S||typeof started==='undefined'||!started||S.ended) return '';
    const p2=typeof P2!=='undefined'&&P2.on, h=S.min/60, dem=h>=19||h<5, bg=String(typeof BGNOW!=='undefined'&&BGNOW||'');
    const gameOn=$('game')&&!$('game').hidden;
    if(/mua|bo-song-dem|xe-dem/.test(bg)||(p2&&S.hoi>=3&&dem)) return 'mua';
    if(gameOn) return p2&&P2.map==='trai'?'tuyp':'';
    if(S.scene==='in'){ if(p2&&P2.map==='trai') return S.room==='may'||S.room==='vp'?'phongmay':'phong'; return 'phong'; }
    if(S.scene==='room') return 'phong';
    if(S.scene==='street') return p2&&P2.map==='trai'?(dem?'trai_dem':'trai'):(dem?'hem_dem':'hem');
    return ''; }
  const MIX={hem:{pho:.22},hem_dem:{pho:.1},trai:{pho:.08,tuyp:.15},trai_dem:{pho:.05},phong:{phong:.16},phongmay:{phong:.1,tuyp:.3},tuyp:{tuyp:.12},mua:{mua:.16,pho:.06},'':{}};
  function loop(){ const a=ctx(); if(!a||a.state!=='running') return; const vol=(typeof CD!=='undefined'?CD.hieu:80)/80;
    const k=pick(); const dlg=$('dlg')&&!$('dlg').hidden;
    M.gain.setTargetAtTime((typeof NHAC!=='undefined'&&NHAC.ok?1:0)*vol*(dlg?.75:1),a.currentTime,.6);
    if(k!==cur){ cur=k; const mx=MIX[k]||{}; ['pho','mua','phong','tuyp'].forEach(x=>{ if(mx[x]||L[x]) set(x,mx[x]||0,1.5); }); }
    const now=performance.now();
    if(k==='phongmay'&&now>clickT){ clickT=now+60+Math.random()*(Math.random()<.15?900:180); tick(1800+Math.random()*900,.018,.05,'square'); }
    if((k==='hem_dem'||k==='trai_dem')&&now>crT){ crT=now+2500+Math.random()*5000; for(let i=0;i<3+Math.random()*3;i++) setTimeout(()=>tick(4300+Math.random()*200,.04,.025,'sine'),i*90); }
    if(k==='hem'&&now>motoT){ motoT=now+7000+Math.random()*12000; moto(); } }
  setInterval(()=>{ try{ loop(); }catch(e){} },150);
  /* nhạc nền hạ xuống khi có hộp thoại, để lời thoại nổi lên */
  if(typeof nhacFade==='function'){ const nf=nhacFade; nhacFade=function(a,to,ms){ a._ft=performance.now()+(ms||0)+100; return nf.apply(this,arguments); }; }
  setInterval(()=>{ try{ if(typeof NHAC==='undefined'||!NHAC.on||!NHAC.cur) return; const a=NHAC.els[NHAC.i]; if(!a||a.paused||(a._ft&&performance.now()<a._ft)) return; const dlg=$('dlg')&&!$('dlg').hidden; const want=NHAC.vol*(dlg?.6:1); if(Math.abs(a.volume-want)>.01&&!a._fd){ a._fd=1; const from=a.volume, t0=performance.now(); const iv=setInterval(()=>{ const p=Math.min(1,(performance.now()-t0)/500); a.volume=from+(want-from)*p; if(p>=1){ clearInterval(iv); a._fd=0; } },40); } }catch(e){} },300);
})();
