/* Hẻm 47 · Phần 2 — Phòng thử (chỉ tác giả thấy). Khi đang chơi Phần 2, nút "Phòng thử" mở bản này:
   chạy thẳng cảnh, lời khai, bảng, trò chơi, phòng, kết của Phần 2; nhảy ngày, đổi nhánh, đổi vai. Lưu riêng, không đè bản chơi thật. */
'use strict';
const P2TS={q:'',all:true};
const P2SC_GROUP=[['Mở đầu',k=>/^x_(mo|hd)$/.test(k)],['Hồi 1 · nhánh A (Ngân về)',k=>/^x_a_/.test(k)],['Hồi 1 · nhánh B (Lâm một mình)',k=>/^x_b_/.test(k)||['x_kham','x_tapma'].includes(k)],
  ['Hồi 1 · chung',k=>['x_ghep','x_tra_phatdat','x_tra_ghe','x_mon','x_demcuoi','kq_xvinh','x_het1','noi_x_saigon','noi_x_saigon2'].includes(k)],
  ['Vào trại · cảnh lớn',k=>/^x_canh\d|^x_khamphong|^x_tutai|^x_ban_dung|^x_cuu_mo|^x_ngay19|^x_het2/.test(k)],
  ['Trong trại · gặp người',k=>/^x_(thuy|ngan|canhngan|nguoiban|tocu|khang|vu3|xinchia|muachuoc|bay_goi|ca_)/.test(k)||/^kh_xbay|^khai_xbay/.test(k)],
  ['Trong trại · đi đêm, lục soát, tin ra vào',k=>/^x_dd_|^x_phongtoi|^soat_xvp|^x_tinvao|^x_gui|^x_lich|^x_dt|^noi_x_khe|^kq_xocl/.test(k)],
  ['Nhánh A · người bên ngoài',k=>/^x_ngoai/.test(k)],['Nói chuyện buổi tối (việc phụ)',k=>/^V_x/.test(k)],['Việc phụ ở hẻm',k=>/^V_(gap|phu)/.test(k)]];
function p2tsScenes(){ const L=[]; for(const k in SCN){ if(!/^(x_|kh_xbay|khai_xbay|noi_x|soat_xvp|kq_x|V_x|V_gap|V_phu)/.test(k)) continue; const r=T[SCN[k][0]]; L.push({k,canh:r.canh||'',n:SCN[k][1]-SCN[k][0]+1}); } return L; }
function p2GiveAll(){ T.filter(r=>r.kieu==='cc'&&/^CC_(x_|suy_x_)/.test(r.ma)).forEach(r=>{ S.cc[r.ma.slice(3)]=1; }); }
/* bày sẵn trạng thái như người chơi đã qua tới ngày đó */
function p2Preset(d,nh,vao){ const p1={ket:nh==='A'?'phuong':'hetgio',co:{khoa_lat:false,tu_lo:false,noi_cuocgoi:nh==='A',phat_nhanchung:true}};
  S=p2Fresh(p1); S.ai_vao=nh==='A'?(vao||'lam'):null;
  const H1=['x_siha','x_vu_ocl','x_vinh','x_sodo','x_sodo_ok','x_gap_thoai','x_ghe','x_gom','x_mon_xong','x_duong','x_kham','x_tapma','x_meo_hieu','bao_xvinh','x_vinh_ok','x_hop','x_a_tin1','x_chot'];
  if(d<=7){ S.day=d; S.hoi=1; S.vai=nh==='A'?(d%2===1&&d<7?'ngan':'lam'):'lam'; if(d>=3) H1.slice(0,4).forEach(setCo); setME(); p2SetMap('hem'); S.min=DAY_START; S.scene='street'; PL.x=at('basau',.4); snapNPC(); return; }
  H1.forEach(setCo); ['x_siha','x_ocl','x_sodo','x_phatdat','x_bamy'].forEach(k=>S.cc[k]=1); S.mon=nh==='A'&&vao==='ngan'?'meo':'sim'; setCo('x_giu');
  S.hoi=d>=19?3:2; setCo('hoi2'); if(d>=19) setCo('hoi3'); S.vai=S.ai_vao||'lam'; setME(); buildDs(); p2SetMap('trai'); S.day=d;
  if(d>=10){ ['x_ca1','x_to_biet','x_thuy_biet','x_thuy_chi','x_biet_may','x_meo_cailoi','x_tuan0'].forEach(setCo); if(nh==='B'){ setCo('x_ngan_nghe'); S.tin.ngan=2; } }
  if(d>=13){ ['x_may','x_tuan3','x_kim','x_vu3'].forEach(setCo); S.cc.x_lich=1; S.cc.x_giong=1; }
  if(d>=16){ ['x_gio','x_rao','x_nghe_len','x_tin_song','x_bay_lat','x_chia'].forEach(setCo); S.cc.x_giongthat=1; S.cc.suy_x_khe=1; S.tin.bay=3; }
  if(d>=19){ ['x_tin_3g','x_cua','x_siet'].forEach(setCo); S.cc.x_so=1; S.cc.x_khaibay=1; ['nhi','toan','hue','ti','thuy','khang','ngan'].forEach(k=>S.tin[k]=Math.max(S.tin[k]||0,3)); }
  /* các ngày trước đã qua ca rồi */ for(let i=8;i<d;i++){ S.cs[i+'_sa']=1; S.cs[i+'_ch']=1; S.cs[i+'_kp']=1; S.cs[i+'_c4']=1; S.cs[i+'_c6']=1; }
  S.min=d===8?19*60:12*60; putAt(d===8?'xngu':'xan',.5); }
const tsRender1=tsRender;
tsRender=function(){ if(!P2.on) return tsRender1(); const b=$('tsBody'); const t=tsTab;
  document.querySelectorAll('#tsTabs button').forEach(x=>x.classList.toggle('on',x.dataset.t===t));
  if(t==='canh'){ const q=nrm(P2TS.q); const L=p2tsScenes().filter(s=>!q||nrm(s.k+' '+s.canh).includes(q));
    const html=P2SC_GROUP.map(([ten,f])=>{ const G=L.filter(s=>f(s.k)); return G.length?'<details'+(q?' open':'')+'><summary>'+esc(ten)+' · '+G.length+'</summary>'+G.map(s=>'<button class="ts-i" data-k="'+esc(s.k)+'"><b>'+esc(s.k)+'</b><span>'+esc(s.canh)+' · '+s.n+' dòng</span></button>').join('')+'</details>':''; }).join('');
    b.innerHTML='<input id="tsQ" type="search" placeholder="Gõ mã hoặc tên cảnh: x_canh4, Chị Bảy, buồng tắm…" value="'+esc(P2TS.q)+'"><p class="ts-n">Phần 2 · '+L.length+' cảnh. Bấm là chạy. Cảnh có hiệu ứng (cờ, manh mối) sẽ áp vào bản thử. Cảnh nào có điều kiện nhánh A/B thì đổi nhánh ở thẻ Trạng thái.</p>'+html;
    const qi=$('tsQ'); qi.oninput=()=>{ P2TS.q=qi.value; const pos=qi.selectionStart; tsRender(); const n=$('tsQ'); n.focus(); n.setSelectionRange(pos,pos); };
    b.querySelectorAll('.ts-i').forEach(x=>x.onclick=()=>tsPlay(x.dataset.k)); return; }
  if(t==='khai'){ const K=T.filter(r=>r.kieu==='khai'&&/^KHAI_x/.test(r.ma));
    b.innerHTML='<label class="ts-c"><input type="checkbox" id="tsAll"'+(P2TS.all?' checked':'')+'> Cho đủ chứng cứ Phần 2 trước khi vào</label>'+K.map(r=>'<button class="ts-i" data-k="'+r.ma.slice(5)+'"><b>'+esc(r.loi)+'</b><span>'+esc(r.ai)+' · '+khaiRows(r.ma.slice(5)).length+' câu</span></button>').join('')+'<button class="ts-b" id="tsKR">Xóa các câu đã lật</button>';
    $('tsAll').onchange=e=>{ P2TS.all=e.target.checked; };
    b.querySelectorAll('.ts-i').forEach(x=>x.onclick=()=>tsRun(async()=>{ if(P2TS.all) p2GiveAll(); await runS('x_bay_goi'); await testimony(x.dataset.k); }));
    $('tsKR').onclick=()=>{ S.kh={}; delete S.co.khai_xbay; toast('Đã xóa'); }; return; }
  if(t==='bang'){ const G=[['giaitin','Đọc tin của số lạ (SIHA)'],['giaitin2','Tin thứ hai (NHITOA)'],['tinvao','Tin rác trả lời (OK)'],['giauchu','Tự gõ tin giấu chữ (SONG, tập với Bin)'],['goive','Cuộc gọi về nhà (chọn câu có đồng hồ)'],['_ca','Ca nhắn tin lừa (2 khách)'],
      ['sodo','Kéo tên phòng vào sơ đồ trại'],['ghepgiay','Ráp tờ rơi rách'],['lichtuan','Lịch tuần tra (kéo lượt gác, tìm giờ trống)'],['nghetieng','Lọc tiếng nền tin thoại'],['dongtien1','Dòng tiền Anh Hai (Hồi 1)'],['dongtien','Ai cầm lò (Hồi 2)'],['danhsach','Tờ danh sách chuyển đi']];
    b.innerHTML='<label class="ts-c"><input type="checkbox" id="tsAll2"'+(P2TS.all?' checked':'')+'> Cho đủ manh mối Phần 2 trước (để thẻ không bị khóa ???)</label><p class="ts-n">Báo cáo</p>'+Object.keys(BOARDN).map(k=>'<button class="ts-i" data-b="'+k+'"><b>'+esc(BOARDN[k])+'</b><span>bảng '+k+'</span></button>').join('')+
      '<p class="ts-n">Trò chơi</p>'+G.map(g=>'<button class="ts-i" data-g="'+g[0]+'"><b>'+esc(g[1])+'</b><span>'+g[0]+'</span></button>').join('')+
      '<p class="ts-n">Trò nhỏ ban đêm (vào thẳng, bỏ đoạn lẻn)</p>'+Object.keys(MINI).filter(k=>MUC[k]).map(k=>'<button class="ts-i" data-mg="'+k+'"><b>'+esc(MUC[k].ten)+'</b></button>').join('')+
      '<p class="ts-n">Đi đêm (chọn việc)</p>'+Object.keys(MUC).map(k=>'<button class="ts-i" data-d="'+k+'"><b>'+esc(MUC[k].ten)+'</b><span>'+esc(MUC[k].why)+'</span></button>').join('')+
      '<p class="ts-n">Đêm giải cứu (dẫn người ra sông)</p><button class="ts-i" data-c="ok"><b>Đủ chuẩn bị</b><span>có giờ ập vào 3:00, cửa sau, rào, ghe</span></button><button class="ts-i" data-c="thieu"><b>Thiếu chuẩn bị</b><span>không ai ập vào, chỉ cổng chính, không ghe</span></button>';
    const give=()=>{ if(P2TS.all){ p2GiveAll(); ['x_sodo3','x_tuan0','x_tuan3','x_meo_cailoi'].forEach(setCo); } };
    $('tsAll2').onchange=e=>{ P2TS.all=e.target.checked; };
    b.querySelectorAll('[data-b]').forEach(x=>x.onclick=()=>tsRun(async()=>{ give(); await board(x.dataset.b); if(SCN['kq_'+x.dataset.b]) await runS('kq_'+x.dataset.b); }));
    b.querySelectorAll('[data-g]').forEach(x=>x.onclick=()=>tsRun(async()=>{ give(); const g=x.dataset.g; if(g==='_ca'){ await caNhan(2); return; } if(g==='danhsach') buildDs(); await P2GAMES[g](); }));
    b.querySelectorAll('[data-mg]').forEach(x=>x.onclick=()=>tsRun(async()=>{ const r=await miniThang(x.dataset.mg); toast('Kết quả: '+r.kq); }));
    b.querySelectorAll('[data-d]').forEach(x=>x.onclick=()=>tsRun(async()=>{ const r=await sneak({mode:'didem',muc:x.dataset.d,limit:110}); toast('Kết quả: '+r.kq); }));
    b.querySelectorAll('[data-c]').forEach(x=>x.onclick=()=>tsRun(async()=>{ buildDs(); const ok=x.dataset.c==='ok'; const groups=dsCon().map(p=>({id:p.id,ten:p.ten,sp:p.id,can:ok?0:(S.tin[p.id]||0)>=2?0:1,after:0}));
      const ex=[{ten:'Cổng chính',f:0,x:60,cost:ok?5:20}]; if(ok){ ex.push({ten:'Cửa sau',f:0,x:930,cost:0}); ex.push({ten:'Rào sau bếp',f:0,x:740,cost:0}); }
      const r=await sneak({mode:'cuu',groups,exits:ex,raid:ok?180:9999,xe:null,end:300,speed:1}); toast('Ra được '+r.out.length+'/'+groups.length); })); return; }
  if(t==='noi'){ const trai=P2.map==='trai'; const PL2=[['thaodien','Quán Thảo Điên'],['congan','Công an phường'],['trai_giam','Phòng thăm gặp trại giam'],['ben_ghe','Bến ghe Tài xế Thoại'],['vpkhac','Văn phòng tuyển dụng quận khác'],['kham','Phòng khám']];
    const R=Object.keys(ROOMS).filter(r=>ROOMS[r].house&&A[ROOMS[r].house]||ROOMS[r].back&&A[(ROOMS[ROOMS[r].back]||{}).house]);
    b.innerHTML='<div class="ts-row"><button class="ts-b" id="tsMapH"'+(trai?'':' disabled')+'>Ra hẻm 47</button><button class="ts-b" id="tsMapT"'+(trai?' disabled':'')+'>Vào trại</button></div>'+
      '<p class="ts-n">Vào phòng ('+(trai?'trong trại':'hẻm 47')+'). Chọn giờ ở thẻ Trạng thái để thấy ai đang ở trong.</p>'+R.map(r=>'<button class="ts-i" data-r="'+r+'"><b>'+esc(ROOMS[r].ten)+'</b><span>'+r+'</span></button>').join('')+
      '<p class="ts-n">Nơi chốn ngoài hẻm</p>'+PL2.map(p=>'<button class="ts-i" data-p="'+p[0]+'"><b>'+p[1]+'</b><span>'+p[0]+'</span></button>').join('')+'<button class="ts-b" id="tsHem">Về đường</button>';
    $('tsMapH').onclick=()=>{ p2SetMap('hem'); S.scene='street'; S.room=null; PL.x=at('basau',.4); snapNPC(); tsRender(); hud(); };
    $('tsMapT').onclick=()=>{ buildDs(); p2SetMap('trai'); putAt('xngu',.4); tsRender(); hud(); };
    b.querySelectorAll('[data-r]').forEach(x=>x.onclick=()=>tsRun(async()=>{ S.scene='street'; S.room=null; const r=ROOMS[x.dataset.r]; if(r.back){ await enterRoom(r.back); S.room=x.dataset.r; hud(); } else await enterRoom(x.dataset.r); }));
    b.querySelectorAll('[data-p]').forEach(x=>x.onclick=()=>{ tsClose(); S.room=null; S.scene='place'; S.place=x.dataset.p; hud(); });
    $('tsHem').onclick=()=>{ S.scene='street'; S.place=null; S.room=null; tsClose(); hud(); }; return; }
  if(t==='ket'){ b.innerHTML='<p class="ts-n">Bốn kết của Phần 2 (chữ đánh máy + bảng tổng kết). Xem xong bấm "Về màn đầu" để quay lại.</p>'+Object.keys(ENDS).map(k=>'<button class="ts-i" data-e="'+k+'"><b>'+esc(ENDS[k][1])+'</b><span>'+k+'</span></button>').join('')+
      '<p class="ts-n">Màn hết hồi</p>'+[1,2].map(n=>'<button class="ts-i" data-a="'+n+'"><b>Hết '+esc(ACTN[n])+'</b><span>'+esc(ACTEND[n].ten)+'</span></button>').join('');
    b.querySelectorAll('[data-e]').forEach(x=>x.onclick=()=>tsRun(async()=>{ buildDs(); if(!S.p2ra){ S.p2ra=dsCon().slice(0,4).map(p=>p.id); S.p2tong=dsCon().length; } await p2Ending(x.dataset.e); }));
    b.querySelectorAll('[data-a]').forEach(x=>x.onclick=()=>tsRun(async()=>{ const n=+x.dataset.a; await runS(ACTEND[n].k); await actCard(n,ACTEND[n].ten); })); return; }
  if(t==='tt'){ const hh=Math.floor(S.min/60)%24, mm=S.min%60;
    b.innerHTML='<p class="ts-n">Nhảy tới (bày sẵn cờ, manh mối như đã chơi tới đó)</p>'+
      '<div class="ts-row"><button class="ts-b" data-j="1A">Ngày 1 · nhánh A</button><button class="ts-b" data-j="1B">Ngày 1 · nhánh B</button><button class="ts-b" data-j="5A">Ngày 5 · A</button><button class="ts-b" data-j="5B">Ngày 5 · B</button></div>'+
      '<div class="ts-row"><button class="ts-b" data-j="8B">Ngày 8 · vào trại (B)</button><button class="ts-b" data-j="8A-lam">Ngày 8 · A, Lâm vào</button><button class="ts-b" data-j="8A-ngan">Ngày 8 · A, Ngân vào</button></div>'+
      '<div class="ts-row"><button class="ts-b" data-j="10B">Ngày 10 · B</button><button class="ts-b" data-j="13B">Ngày 13 · B</button><button class="ts-b" data-j="16B">Ngày 16 · B</button><button class="ts-b" data-j="19B">Ngày 19 · đêm mai (B)</button><button class="ts-b" data-j="19A-lam">Ngày 19 · A</button></div>'+
      '<p class="ts-n">Đang: nhánh '+S.nhanh+' · vai '+ME+' · '+(P2.map==='trai'?'trong trại':'hẻm 47')+' · Hồi '+S.hoi+'</p>'+
      '<div class="ts-row"><button class="ts-b" id="tsVai">Đổi vai (Lâm ↔ Ngân)</button><button class="ts-b" id="tsNh">Đổi nhánh (A ↔ B)</button></div>'+
      '<div class="ts-g"><label>Ngày <input type="number" id="tsD" min="1" max="21" value="'+S.day+'"></label><label>Giờ <input type="time" id="tsH" value="'+String(hh).padStart(2,'0')+':'+String(mm).padStart(2,'0')+'"></label><label>Tiền <input type="number" id="tsM" step="100000" value="'+S.money+'"></label>'+
      '<label>Bị nghi <input type="range" id="tsN" min="0" max="100" value="'+S.nghi+'"> <i id="tsNv">'+S.nghi+'</i></label><label>Lộ tin <input type="range" id="tsL" min="0" max="100" value="'+(S.lo||0)+'"> <i id="tsLv">'+(S.lo||0)+'</i></label></div>'+
      '<div class="ts-row"><button class="ts-b" id="tsCC">Cho hết manh mối Phần 2</button><button class="ts-b" id="tsTin">Cả tổ tin mình (3)</button></div>'+
      '<p class="ts-n">Gõ hiệu ứng, ví dụ: +co:x_may +cc:x_so +tin_ngan -nghi:20 +lo:10 mat:ti</p><div class="ts-row"><input id="tsFx" placeholder="+co:... +cc:..."><button class="ts-b" id="tsFxB">Áp</button></div>'+
      '<p class="ts-n">Kiểm tra điều kiện, ví dụ: nhanh:B co:x_may !co:x_tin_3g</p><div class="ts-row"><input id="tsCo" placeholder="co:x_... nhanh:A"><button class="ts-b" id="tsCoB">Thử</button><span id="tsCoR"></span></div>'+
      '<p class="ts-n">Cờ Phần 2 đang bật: '+Object.keys(S.co).filter(k=>k.startsWith('x_')).length+' · manh mối: '+Object.keys(S.cc).length+' · chứng cứ Ông Chủ Lò: '+ocl()+'/5 · danh sách: '+(S.ds||[]).map(p=>p.ten+(p.con?'':' (đi)')).join(', ')+'</p>'+
      '<button class="ts-b warn" id="tsQuit">Thoát phòng thử (tải lại trang)</button>';
    b.querySelectorAll('[data-j]').forEach(x=>x.onclick=()=>{ const [a,vao]=x.dataset.j.split('-'); const d=parseInt(a), nh=a.slice(-1); p2Preset(d,nh,vao); tsClose(); hud(); save(); toast('Đã nhảy tới ngày '+d+' · nhánh '+nh); tick(); });
    $('tsVai').onclick=()=>{ S.vai=S.vai==='ngan'?'lam':'ngan'; setME(); tsRender(); hud(); };
    $('tsNh').onclick=()=>{ S.nhanh=S.nhanh==='A'?'B':'A'; S.ds=[]; if(P2.map==='trai') buildDs(); tsRender(); hud(); };
    $('tsD').onchange=e=>{ S.day=Math.max(1,Math.min(21,+e.target.value||1)); hud(); };
    $('tsH').onchange=e=>{ const [h,m]=e.target.value.split(':').map(Number); S.min=h*60+(m||0); hud(); };
    $('tsM').onchange=e=>{ S.money=+e.target.value||0; hud(); };
    $('tsN').oninput=e=>{ S.nghi=+e.target.value; $('tsNv').textContent=S.nghi; hud(); };
    $('tsL').oninput=e=>{ S.lo=+e.target.value; $('tsLv').textContent=S.lo; hud(); };
    $('tsCC').onclick=()=>{ p2GiveAll(); toast('Đã có hết manh mối Phần 2'); tsRender(); };
    $('tsTin').onclick=()=>{ ['ngan','thuy','nhi','toan','hue','ti','khang','bay','loc'].forEach(k=>S.tin[k]=Math.max(S.tin[k]||0,3)); toast('Cả tổ tin mình'); };
    $('tsFxB').onclick=()=>{ effects($('tsFx').value); hud(); tsRender(); };
    $('tsCoB').onclick=()=>{ $('tsCoR').textContent=cond($('tsCo').value)?' đúng':' sai'; };
    $('tsQuit').onclick=()=>{ lsDel('tgl_v6_test'); location.reload(); }; return; }
  return tsRender1(); };
/* phòng thử lấy manh mối Phần 2 khi đang chơi Phần 2 */
const tsGiveAll1=tsGiveAll; tsGiveAll=function(){ if(P2.on) return p2GiveAll(); return tsGiveAll1(); };
/* nút Phòng thử ngay trong màn chọn Phần 2 (chỉ tài khoản tác giả) */
const p2Menu1=p2Menu;
p2Menu=function(){ p2Menu1(); if(typeof isAdmin!=='function'||!isAdmin()) return; const row=document.querySelector('#cover .in .row'); if(!row||$('p2Ts')) return;
  const b=document.createElement('button'); b.className='btn ghost'; b.id='p2Ts'; b.type='button'; b.textContent='Phòng thử Phần 2'; row.appendChild(b);
  b.onclick=async()=>{ const v=$('p2k').value; const p1=Object.assign({},p2p1()||{},{ket:v||((p2p1()||{}).ket)||'hetgio'}); TESTMODE=true; document.body.classList.add('testing'); await p2Begin(false,p1); tsTab='tt'; $('test').hidden=false; tsRender(); toast('Phòng thử Phần 2 · không lưu vào bản chơi thật'); }; };

/* Phòng thử Phần 2: chạy cảnh ở đúng chỗ nó xảy ra (phòng, nơi chốn) để nền khớp với cảnh */
const P2TS_PRE=[[/^x_ca_|^x_canhngan_ok/,'may'],[/^x_dd_(may|gapngan|thuy)|^x_gui|^x_nganb3|^x_thuygap/,'tam'],[/^x_dd_(kim|rao|cua)/,'bep'],
  [/^x_dd_nghe|^soat_xvp|^x_bay_goi|^kh_xbay|^khai_xbay|^x_xinchia/,'vp'],[/^x_(thuy|nganb1|canhngan|thuylai|nguoiban)/,'an'],
  [/^x_dd_|^x_tinvao|^x_lich|^x_dt|^kq_xocl|^x_phongtoi|^x_canh|^x_khamphong|^x_tutai|^x_tocu|^x_vu3|^x_khang|^x_ngay19|^x_het2|^x_cuu/,'ngu'],
  [/^V_phu/,'taphoa'],[/^x_a_thoa|^x_a_giaitin|^x_a_giong|^x_a_sodo|^x_a_tin2/,'taphoa']];
function p2tsWhere(key){ const D=P2DATA, R=D.ROOMS;
  const houseRoom=h=>Object.keys(R).find(id=>R[id].house===h&&!R[id].back);
  const objRoom=o=>Object.keys(R).find(id=>(R[id].objs||[]).some(x=>x.id===o));
  const npcRoom=(k,hh,camp)=>{ const n=camp?D.NPC_TRAI[k]:D.NPC_HEM[k]; if(!n||!n.at) return null; let p=null; try{ p=n.at(hh); }catch(e){} return p&&p.u?houseRoom(p.u[0]):null; };
  const a=D.ACT.find(x=>x.k===key);
  if(a){ if(a.place) return {place:a.place}; if(a.who&&a.who.startsWith('o:')){ const r=objRoom(a.who.slice(2)); if(r) return {room:r}; }
    if(a.who&&a.who!=='ngo'&&a.who!=='phong'){ const r=npcRoom(a.who,a.w?a.w[0]+.5:(a.h>=2?20:10),a.h>=2); if(r) return {room:r}; } if(a.who==='phong') return {room:a.h>=2?'ngu':'phong3'}; }
  for(const [re,r] of P2TS_PRE) if(re.test(key)&&R[r]) return {room:r};
  if(/^V_x(nhi|toan|hue|ti|thuy|khang|loc|ngan)/.test(key)) return {street:'trai'};
  if(/^V_(gap|xbin)|^x_ghep|^x_het1/.test(key)) return {street:'hem'};
  if(/^V_xbasau/.test(key)){ const r=npcRoom('basau',10,false); if(r) return {room:r}; }
  if(/^x_b_khoa/.test(key)) return {place:'trai_giam'};
  if(/^x_ban_dung/.test(key)) return {room:'ngu'};
  if(/^x_demcuoi/.test(key)&&R.phong3) return {room:'phong3'};
  return {}; }
const tsPlay1=tsPlay;
tsPlay=function(key){ if(!P2.on) return tsPlay1(key);
  return tsRun(async()=>{ const back={scene:S.scene,place:S.place,room:S.room,map:P2.map,min:S.min,day:S.day,hoi:S.hoi}; const w=p2tsWhere(key); if(/^x_dd_|^x_tinvao|^x_phongtoi|^x_nganb3|^x_thuygap|^x_cuu/.test(key)) S.min=23*60; else if(/^V_x/.test(key)) S.min=20*60;
    if(w.place){ S.scene='place'; S.place=w.place; }
    else if(w.street){ if(w.street!==P2.map) p2SetMap(w.street); S.scene='street'; S.room=null; }
    else if(w.room){ const camp=String(P2DATA.ROOMS[w.room].house||'').startsWith('x'); const m=camp?'trai':'hem'; if(m!==P2.map) p2SetMap(m); RPAN=0; S.scene='in'; S.room=w.room; }
    if(P2.map==='trai'&&S.day<9){ S.day=9; if(S.hoi<2) S.hoi=2; } if(/^x_ca_/.test(key)) S.min=7*60;
    BGNOW=null; fade=.6; hud();
    try{ await runS(key); }
    finally{ S.min=back.min; S.day=back.day; S.hoi=back.hoi; if(P2.map!==back.map) p2SetMap(back.map); S.scene=back.scene==='place'?'street':back.scene; S.place=back.scene==='place'?null:back.place; S.room=back.room; BGNOW=null; fade=.5; hud(); } }); };
