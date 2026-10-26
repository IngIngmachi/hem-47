/* Tiếng động thật (sfx/*.mp3): bước chân, tim đập, nước, tin nhắn, rung, cổng sắt, viết, kìm cắt, đèn pin.
   Dùng chung WebAudio với tone(); âm lượng theo thanh "Hiệu ứng". Tệp chưa tải xong thì im, không lỗi. */
(function(){
  const F=['buocchan','timdap','nuoc','tinbao','rung','cong_go','cong_mo','viet','kem','denpin'];
  const B={}, wait={}; let A=null, OUT=null;
  const vol=()=>(typeof CD!=='undefined'&&CD.hieu!=null?CD.hieu:80)/80;
  function ctx(){ if(A) return A; A=typeof ac==='function'?ac():null; if(!A) return null; OUT=A.createGain(); OUT.connect(A.destination); return A; }
  function load(k){ if(B[k]||wait[k]||!ctx()) return; wait[k]=1;
    fetch('sfx/'+k+'.mp3?v=1026').then(r=>r.arrayBuffer()).then(b=>A.decodeAudioData(b)).then(buf=>{ B[k]=buf; }).catch(()=>{ wait[k]=0; }); }
  const loadAll=()=>{ if(!ctx()) return; F.forEach(load); };
  ['pointerdown','keydown'].forEach(ev=>addEventListener(ev,()=>{ try{ loadAll(); }catch(e){} },{once:true,capture:true}));
  /* phát một lần: o.v âm lượng, o.rate tốc độ, o.off bắt đầu từ giây, o.dur dài bao lâu */
  function play(k,o){ o=o||{}; try{ if(!ctx()||A.state!=='running'||!vol()) return; if(!B[k]){ load(k); return; }
    const s=A.createBufferSource(), g=A.createGain(); s.buffer=B[k]; s.playbackRate.value=o.rate||1; g.gain.value=(o.v==null?1:o.v)*vol();
    s.connect(g); g.connect(OUT); const t=A.currentTime+(o.delay||0); if(o.dur){ s.start(t,o.off||0,o.dur); g.gain.setValueAtTime(g.gain.value,t+Math.max(0,o.dur-.12)); g.gain.linearRampToValueAtTime(0,t+o.dur); } else s.start(t,o.off||0); }catch(e){} }
  /* vòng lặp có núm vặn: set(0..1) để lên xuống mượt, stop() để tắt hẳn */
  function loop(k,o){ o=o||{}; let s=null, g=null, cur=0;
    const mk=()=>{ if(s||!ctx()||!B[k]){ load(k); return; } s=A.createBufferSource(); g=A.createGain(); s.buffer=B[k]; s.loop=true; s.playbackRate.value=o.rate||1; g.gain.value=0; s.connect(g); g.connect(OUT); s.start(0,Math.random()*(B[k].duration-1)); };
    return { set(v){ try{ v=Math.max(0,Math.min(1,v||0))*(o.max||1)*vol(); if(v>0.005) mk(); if(!g) return; if(Math.abs(v-cur)>.01){ cur=v; g.gain.setTargetAtTime(v,A.currentTime,o.tc||.15); } }catch(e){} },
      stop(){ try{ if(g){ g.gain.setTargetAtTime(0,A.currentTime,.12); const ss=s; setTimeout(()=>{ try{ ss.stop(); }catch(e){} },600); } s=null; g=null; cur=0; }catch(e){} } }; }
  window.SFX={play,loop,loadAll};

  /* tin nhắn: tiếng báo + rung khi điện thoại đang cất */
  if(typeof ping!=='undefined'){ const p0=ping; try{ ping=function(){ if(B.tinbao&&A&&A.state==='running'){ play('tinbao',{v:.7}); } else p0(); }; }catch(e){} }
  if(typeof badgeOn!=='undefined'){ const b0=badgeOn; try{ badgeOn=function(){ const was=$('badge')&&$('badge').hidden; if(was&&$('phone')&&$('phone').hidden) play('rung',{v:.5}); return b0.apply(this,arguments); }; }catch(e){} }

  /* tiếng theo lời kể: chỉ dò vài câu cố định, không thêm chữ mới */
  const CUE=[[/Cổng sắt đóng sầm/,'cong_mo',{v:.9,rate:.92}],[/đập cửa từng phòng/,'cong_go',{v:.8}],[/Giấy nhận nợ/,'viet',{v:.8,dur:3}],
    [/kéo cửa cuốn/,'cong_mo',{v:.5,rate:1.25,dur:2.2}],[/gõ cửa cộc cộc/,'cong_go',{v:.35,rate:1.35,dur:1.2}]];
  if(typeof show==='function'){ const s0=show; show=function(r){ try{ const t=String(r&&(r.loi||'')); for(const [re,k,o] of CUE) if(re.test(t)){ play(k,o); break; } }catch(e){} return s0.apply(this,arguments); }; }
})();
