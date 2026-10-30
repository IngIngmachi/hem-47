/* Tiếng động thật (sfx/*.mp3): bước chân, tim đập, nước, tin nhắn, rung, cổng sắt, viết, kìm cắt, đèn pin.
   Dùng chung WebAudio với tone(); âm lượng theo thanh "Hiệu ứng". Tệp chưa tải xong thì im, không lỗi. */
(function(){
  const F=['buocchan','timdap','nuoc','tinbao','rung','cong_go','cong_mo','viet','kem','denpin','hit','riser','boom','gocua','chuong','xe','chup','v_my','dien'];
  const B={}, wait={}; let A=null, OUT=null;
  const vol=()=>(typeof CD!=='undefined'&&CD.hieu!=null?CD.hieu:80)/80;
  function ctx(){ if(A) return A; A=typeof ac==='function'?ac():null; if(!A) return null; OUT=A.createGain(); OUT.connect(A.destination); return A; }
  function load(k){ if(B[k]||wait[k]||!ctx()) return; wait[k]=1;
    fetch('sfx/'+k+'.mp3?v=1026').then(r=>r.arrayBuffer()).then(b=>A.decodeAudioData(b)).then(buf=>{ B[k]=buf; }).catch(()=>{ wait[k]=0; }); }
  const loadAll=()=>{ if(!ctx()) return; F.forEach(load); };
  ['pointerdown','keydown'].forEach(ev=>addEventListener(ev,()=>{ try{ loadAll(); }catch(e){} },{once:true,capture:true}));
  /* phát một lần: o.v âm lượng, o.rate tốc độ, o.off bắt đầu từ giây, o.dur dài bao lâu */
  function play(k,o){ o=o||{}; try{ if(!ctx()||A.state!=='running'||!vol()) return; if(!B[k]){ load(k); return false; }
    const s=A.createBufferSource(), g=A.createGain(); s.buffer=B[k]; s.playbackRate.value=o.rate||1; g.gain.value=(o.v==null?1:o.v)*vol();
    s.connect(g); g.connect(OUT); const t=A.currentTime+(o.delay||0); if(o.dur){ s.start(t,o.off||0,o.dur); g.gain.setValueAtTime(g.gain.value,t+Math.max(0,o.dur-.12)); g.gain.linearRampToValueAtTime(0,t+o.dur); } else s.start(t,o.off||0);
    return {stop(){ try{ g.gain.setTargetAtTime(0,A.currentTime,.05); setTimeout(()=>{ try{ s.stop(); }catch(e){} },300); }catch(e){} }}; }catch(e){ return false; } }
  /* vòng lặp có núm vặn: set(0..1) để lên xuống mượt, stop() để tắt hẳn */
  function loop(k,o){ o=o||{}; let s=null, g=null, cur=0;
    const mk=()=>{ if(s||!ctx()||!B[k]){ load(k); return; } s=A.createBufferSource(); g=A.createGain(); s.buffer=B[k]; s.loop=true; s.playbackRate.value=o.rate||1; g.gain.value=0; s.connect(g); g.connect(OUT); s.start(0,Math.random()*(B[k].duration-1)); };
    return { set(v){ try{ v=Math.max(0,Math.min(1,v||0))*(o.max||1)*vol(); if(v>0.005) mk(); if(!g) return; if(Math.abs(v-cur)>.01){ cur=v; g.gain.setTargetAtTime(v,A.currentTime,o.tc||.15); } }catch(e){} },
      stop(){ try{ if(g){ g.gain.setTargetAtTime(0,A.currentTime,.12); const ss=s; setTimeout(()=>{ try{ ss.stop(); }catch(e){} },600); } s=null; g=null; cur=0; }catch(e){} } }; }
  /* đồng hồ chọn gấp: tim đập suốt lúc đếm, tiếng rít (riser) dâng lên đúng lúc sắp hết giờ. Trả về hàm dừng. */
  function urgent(ms){ let h=null, r=null; const hb=loop('timdap',{max:.75}); hb.set(1);
    const len=B.riser?B.riser.duration*1000:3700; const t=setTimeout(()=>{ r=play('riser',{v:.8}); },Math.max(0,ms-len));
    return ()=>{ clearTimeout(t); hb.stop(); r&&r.stop&&r.stop(); }; }
  window.SFX={play,loop,loadAll,urgent,has:k=>!!B[k]};
  /* iPhone: gạt nút im lặng thì Web Audio bị tắt tiếng còn nhạc nền vẫn kêu; xin chế độ phát như nhạc để tiếng động kêu theo nhạc */
  try{ if(navigator.audioSession) navigator.audioSession.type='playback'; }catch(e){}

  /* tin nhắn: tiếng báo + rung khi điện thoại đang cất */
  if(typeof ping!=='undefined'){ const p0=ping; try{ ping=function(){ if(B.tinbao&&A&&A.state==='running'){ play('tinbao',{v:.7}); } else p0(); }; }catch(e){} }
  if(typeof badgeOn!=='undefined'){ const b0=badgeOn; try{ badgeOn=function(){ const was=$('badge')&&$('badge').hidden; if(was&&$('phone')&&$('phone').hidden) play('rung',{v:.5}); return b0.apply(this,arguments); }; }catch(e){} }

  /* tiếng theo lời kể: chỉ dò vài câu cố định, không thêm chữ mới */
  const CUE=[[/Cổng sắt đóng sầm/,'cong_mo',{v:.9,rate:.92}],[/đập cửa từng phòng/,'cong_go',{v:.8}],[/Giấy nhận nợ/,'viet',{v:.8,dur:3}],
    [/kéo cửa cuốn/,'cong_mo',{v:.5,rate:1.25,dur:2.2}],[/gõ cửa cộc cộc|có tiếng gõ cửa|rồi mới gõ cửa/,'gocua',{v:.8}],
    [/nổ máy/,'xe',{v:.55,dur:6}],[/đổ chuông|chuông điện thoại reo/,'chuong',{v:.45,dur:4.5}]];
  if(typeof show==='function'){ const s0=show; show=function(r){ try{ const t=String(r&&(r.loi||'')); for(const [re,k,o] of CUE) if(re.test(t)){ play(k,o); if(k==='gocua'&&/cộc cộc/.test(t)) play(k,Object.assign({},o,{delay:.38})); break; } }catch(e){} return s0.apply(this,arguments); }; }
  if(typeof toast==='function'){ const t0=toast; toast=function(m){ try{ if(/^Ảnh mới/.test(String(m||''))) play('chup',{v:.8}); }catch(e){} return t0.apply(this,arguments); }; }
  /* nút loa trên thanh trên: tắt là tắt hết (nhạc + tiếng động + âm nền), không chỉ nhạc */
  const muted=()=>typeof NHAC!=='undefined'&&!NHAC.on;
  setInterval(()=>{ try{ const a=typeof ac==='function'?ac():null; if(!a) return; if(muted()&&a.state==='running') a.suspend(); else if(!muted()&&a.state==='suspended') a.resume().catch(()=>{}); }catch(e){} },250);
  addEventListener('pointerdown',()=>{ try{ const a=typeof ac==='function'?ac():null; if(a&&!muted()&&a.state==='suspended') a.resume(); }catch(e){} },true);
  if(typeof nhacBtn==='function'){ const nb=nhacBtn; try{ nhacBtn=function(){ nb.apply(this,arguments); const b=$('musBtn'); if(b){ b.title=b.ariaLabel=NHAC.on?'Tắt tiếng':'Bật tiếng'; } }; nhacBtn(); }catch(e){} }
})();
