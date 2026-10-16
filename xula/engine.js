/* Hẻm 47 · Phần 2 · Xứ Lạ — engine: trạng thái, ảnh, hội thoại, lựa chọn, thẻ cảnh, HUD, lưu. */
'use strict';
const $=id=>document.getElementById(id);
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const lsGet=k=>{try{return localStorage.getItem(k)}catch(e){return null}};
const lsSet=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};
const lsDel=k=>{try{localStorage.removeItem(k)}catch(e){}};
const TEST=/[?&]test=1/.test(location.search);
const SAVE_KEY='tgl_chuong2';
const BUOI=['Sáng','Trưa','Chiều','Tối','Đêm'];
const money=n=>(n<0?'-':'')+Math.abs(Math.round(n)).toLocaleString('vi-VN')+'đ';

/* ---------- ảnh: thử img2/ rồi img/, không có thì lấy ảnh dự phòng ---------- */
/* Tên ảnh mới của Phần 2 bắt đầu bằng x2- hoặc là mặt/dáng nhân vật mới. Chưa có file thì dùng ảnh cũ gần giống. */
const FALLBACK={
  'x2-xe-dem':'ky-uc-2','x2-bai-mia':'ngoai-ben','x2-cong-sat':'ket-ngan-trai','x2-phong-ky':'trong-vp12','x2-phong-may':'ket-ngan-trai',
  'x2-san-diemdanh':'ket-ngan-trai','x2-nha-an':'ket-ngan-trai','x2-phong-ngu':'trong-tangtren','x2-buong-tam':'trong-phong3-dem','x2-tang3':'trong-vp12',
  'x2-phong-toi':'trong-phong3-dem','x2-trai-matcat':'','x2-bo-song-dem':'ngoai-ben','x2-bo-ben-nay':'ngoai-ben','x2-cua-khau-sang':'ket-phuong',
  'x2-tiec-taphoa':'trong-taphoa','x2-vp-quan-khac':'trong-vp12','x2-van-phong-lam':'ket-tien','x2-hien-basau-dem':'trong-hienbasau','x2-taphoa-chieu':'nha-taphoa',
  'x2-quan-thaodien':'ngoai-cafe','x2-congan':'ngoai-congan','x2-phong3-moi':'trong-phong3','x2-ben-ghe':'ngoai-ben','x2-trai-giam':'ngoai-congan',
  'x2-kham-suckhoe':'trong-vp12','x2-hem-mua':'hem-dem','x2-ket-mot-minh':'ket-hetgio','x2-ket-ban-dung':'ket-bocphot','x2-ket-o-lai':'ngoai-ben',
  'face-bay-1':'face-thoa-2','face-seo-1':'face-tu-2','face-thoai-1':'face-loc-2','face-khang-1':'face-tam-1','face-ti-1':'face-bin-2',
  'face-nhi-1':'face-thuy-2','face-toan-1':'face-loc-1','face-hue-1':'face-hanh-1','face-ngan-4':'face-ngan-3','face-lam-4':'face-lam-3','face-my-1':'face-basau-3',
  'bay-full':'thoa-full','seo-full':'tu-full','thoai-full':'loc-full','khang-full':'tam-full','ngan-trai-full':'ngan-full'
};
const IMGC={};
function imgUrl(name){ return new Promise(res=>{ if(!name){ res(''); return; } if(name in IMGC){ res(IMGC[name]); return; }
  const tries=['img2/'+name+'.webp','img/'+name+'.webp']; let i=0;
  const next=()=>{ if(i>=tries.length){ const fb=FALLBACK[name]; if(fb){ imgUrl(fb).then(u=>{ IMGC[name]=u; res(u); }); } else { IMGC[name]=''; res(''); } return; }
    const u=tries[i++], im=new Image(); im.onload=()=>{ IMGC[name]=u; res(u); }; im.onerror=next; im.src=u; };
  next(); }); }

/* ---------- trạng thái ---------- */
let S=null;
function fresh(p1){
  const c=(p1&&p1.co)||{}; const ket=(p1&&p1.ket)||'hetgio'; const nhanh=(ket==='phuong'||ket==='imlang')?'A':'B';
  return {v:1,nhanh,ket1:ket,co:Object.assign({},c),p1tin:Object.assign({ba_sau:0,bin:0,huong:0,thoa:0},(p1&&p1.tin)||{}),
    ngay:1,buoi:0,tien:Math.max(300000,Math.min(((p1&&p1.tien)||650000)+(ket==='tien'?20000000:0),40000000)),
    nghi:Math.min(30,Math.round(((p1&&p1.nghi)||0)/3)),lo:ket==='bocphot'?40:0,no:0,
    tin:{ngan:nhanh==='A'?3:0,thuy:2,khang:1,bay:0,thoai:0,nhi:1,toan:1,hue:1,ti:1,loc:2,tam:0,huong:Math.min(5,((p1&&p1.tin&&p1.tin.huong)||2)),basau:((p1&&p1.tin&&p1.tin.ba_sau)||2),bin:((p1&&p1.tin&&p1.tin.bin)||1),thoa:((p1&&p1.tin&&p1.tin.thoa)||1)},
    vai:'lam',ai_vao:null,f:{},done:{},cc:[],so:[],ds:[],mon:null,montage:false,log:[],ket:null};
}
/* danh sách cần cứu: dựng khi vào trại */
function buildDs(){
  const d=[], add=(id,ten,ghi)=>d.push({id,ten,ghi,con:true});
  if(S.nhanh==='B'){ add('ngan','Ngân','tổ trưởng phòng máy 2'); add('thuy','Thủy','phòng máy 2'); }
  add('nhi','Nhi','19 tuổi, Tiền Giang'); add('toan','Toàn','thợ hồ, 26 tuổi'); add('hue','Chị Huệ','49 tuổi, đi để trả nợ cho con'); add('ti','Tí','nhỏ nhất phòng, 19 tuổi');
  if(!S.co.khoa_lat) add('khang','Khang','em anh Khoa, ở khu phạt');
  if(S.nhanh==='B'&&S.co.loc_di) add('loc','Anh Lộc','khu bên cạnh');
  if(S.nhanh==='B'&&S.co.bao_tam) add('tam','Tâm','Gò Vướng, phòng máy 3');
  if(S.nhanh==='B'&&S.co.bao_phat) add('phat','Phát','bị bắt lại, phòng máy 3');
  S.ds=d;
}
const dsCon=()=>S.ds.filter(p=>p.con);
const inTrai=()=>S.ngay>=8&&S.ngay<=20&&!(S.nhanh==='A'&&S.vai_ngoai);
const who=()=>S.vai==='ngan'?'Ngân':'Lâm';

function tin(k,n){ S.tin[k]=Math.max(0,Math.min(5,(S.tin[k]||0)+n)); if(n>0) toast((NAME[k]||k)+' tin hơn'); else if(n<0) toast((NAME[k]||k)+' bớt tin'); hud(); }
function nghi(n){ S.nghi=Math.max(0,Math.min(100,S.nghi+n)); if(n>=8) toast('Quản lý nghi +'+n); hud(); }
function lo(n){ S.lo=Math.max(0,Math.min(100,S.lo+n)); if(n>=5) toast('Lộ tin +'+n); hud(); }
function tien(n){ S.tien+=n; if(n) toast((n>0?'+':'')+money(n)); hud(); }
function noTrai(n){ S.no+=n; hud(); }
function flag(k,v=true){ S.f[k]=v; }
function has(k){ return !!S.f[k]; }
function cc(k,ten){ if(!S.cc.includes(k)){ S.cc.push(k); toast('Chứng cứ Ông Chủ Lò: '+ten+' ('+S.cc.length+'/5)'); } }
const NAME={ngan:'Ngân',thuy:'Thủy',khang:'Khang',bay:'Chị Bảy',thoai:'Tài xế Thoại',nhi:'Nhi',toan:'Toàn',hue:'Chị Huệ',ti:'Tí',loc:'Anh Lộc',tam:'Tâm',huong:'Hương',basau:'Bà Sáu',bin:'Bin',thoa:'Cô Thoa',phat:'Phát'};

/* ---------- HUD ---------- */
function hud(){ if(!S) return;
  const ch=$('chips'); const t=inTrai();
  let h='<span class="chip">Ngày <b>'+S.ngay+'</b>/21 · '+BUOI[Math.min(S.buoi,4)]+'</span>';
  if(S.nhanh==='A') h+='<span class="chip">Đang chơi <b>'+who()+'</b></span>';
  h+='<span class="chip'+(S.tien<200000?' red':'')+'">'+money(S.tien)+'</span>';
  if(t&&S.no) h+='<span class="chip red">Nợ trại <b>'+money(S.no)+'</b></span>';
  ch.innerHTML=h;
  const m=$('meters');
  m.innerHTML=t?'<div class="meter">Quản lý nghi<div class="bar"><i style="width:'+S.nghi+'%"></i></div></div>':'<div class="meter">Lộ tin<div class="bar"><i style="width:'+S.lo+'%"></i></div></div>';
}
function toast(t){ const d=document.createElement('div'); d.className='toast'; d.textContent=t; document.body.appendChild(d); setTimeout(()=>d.remove(),2200); }

/* ---------- sân khấu ---------- */
let curBg='';
async function bg(name,opt={}){ if(name===curBg&&!opt.force) return; curBg=name; const u=await imgUrl(name); const a=$('bg'),b=$('bg2');
  b.style.backgroundImage=u?'url("'+u+'")':'none'; b.style.opacity=1; await wait(900); a.style.backgroundImage=b.style.backgroundImage; b.style.opacity=0; }
function cine(on){ $('stage').classList.toggle('cine',!!on); hud(); }
function trai(on){ $('stage').classList.toggle('trai',!!on); }
function dark(on){ $('stage').classList.toggle('toi',!!on); }
async function show(list){ /* list: [{n:'lam-full',x:.3}] */ const c=$('chars'); c.innerHTML=''; for(const p of (list||[])){ const u=await imgUrl(p.n); if(!u) continue; const im=document.createElement('img'); im.src=u; im.style.left=(p.x*100)+'%'; im.style.transform='translateX(-50%)'+(p.flip?' scaleX(-1)':''); c.appendChild(im); } }

/* ---------- hội thoại ---------- */
const FACE={'Lâm':'face-lam-1','Ngân':'face-ngan-1','Thủy':'face-thuy-1','Hương':'face-huong-1','Đại úy Vinh':'face-vinh-1','Bà Sáu':'face-basau-1','Cô Thoa':'face-thoa-1','Bin':'face-bin-1',
  'Anh Khoa':'face-khoa-1','Khoa':'face-khoa-1','Tú':'face-tu-1','Phát':'face-phat-1','Anh Lộc':'face-loc-1','Tâm':'face-tam-1','Phương':'face-phuong-1',
  'Chị Bảy':'face-bay-1','Sẹo':'face-seo-1','Tài xế Thoại':'face-thoai-1','Khang':'face-khang-1','Tí':'face-ti-1','Nhi':'face-nhi-1','Toàn':'face-toan-1','Chị Huệ':'face-hue-1','Bà Mỹ':'face-my-1','Chị Hạnh':'face-hanh-1'};
let dlg,chEl;
function place(){ const host=innerWidth<=700?$('dlgWrap'):$('stage'); if(dlg) host.appendChild(dlg); if(chEl) host.appendChild(chEl); }
addEventListener('resize',place);
function initDlg(){ dlg=document.createElement('div'); dlg.id='dlg'; dlg.hidden=true; dlg.innerHTML='<img alt="" id="dFace"><div class="tx"><div class="who" id="dWho"></div><div class="ln" id="dLn"></div></div><span class="more">chạm để tiếp ▸</span>';
  chEl=document.createElement('div'); chEl.id='ch'; chEl.hidden=true; place(); }
function fill(s){ return String(s).replace(/\{(\w+)\}/g,(m,k)=>k==='tien'?money(S.tien):k==='ngay'?S.ngay:k==='con'?dsCon().length:k==='ai'?who():(S.f[k]!=null?S.f[k]:m)); }
/* say(ai, lời) — ai rỗng = lời dẫn; ai bắt đầu bằng '~' = Lâm/Ngân nghĩ thầm */
function say(ai,loi,face){ return new Promise(async res=>{
  const nghi=ai&&ai[0]==='~'; if(nghi) ai=ai.slice(1); if(ai==='@') ai=who();
  dlg.hidden=false; dlg.className=!ai?'mota':nghi?'nghi':'';
  $('dWho').textContent=ai?(nghi?ai+' (nghĩ)':ai):'';
  const fimg=$('dFace'); const fn=face||FACE[ai]||(ai==='Ngân'&&S&&S.nhanh==='A'?'face-ngan-4':'');
  const fu=ai?await imgUrl(fn==='face-ngan-1'&&S&&S.nhanh==='A'?'face-ngan-4':fn):''; fimg.hidden=!fu; if(fu) fimg.src=fu;
  const ln=$('dLn'), txt=fill(loi); ln.textContent=''; let i=0, done=false;
  const step=()=>{ if(done) return; i+=2; ln.textContent=txt.slice(0,i); if(i<txt.length) setTimeout(step,16); else done=true; };
  step();
  const go=e=>{ if(e&&e.type==='keydown'&&!(e.key===' '||e.key==='Enter')) return; if(!done){ done=true; ln.textContent=txt; return; } dlg.removeEventListener('click',go); removeEventListener('keydown',go); res(); };
  setTimeout(()=>{ dlg.addEventListener('click',go); addEventListener('keydown',go); },120);
}); }
function hideDlg(){ if(dlg) dlg.hidden=true; }
/* lines: [['Lâm','câu'],['','lời dẫn']] */
async function lines(arr){ for(const l of arr){ if(typeof l==='function'){ await l(); continue; } await say(l[0],l[1],l[2]); } }
/* choose(['a','b'] hoặc [{t,sub,dis}], {q, timer giây, mac:index khi hết giờ}) */
function choose(opts,o={}){ return new Promise(res=>{ hideDlg(); chEl.hidden=false;
  let h=o.q?'<div class="q">'+esc(fill(o.q))+'</div>':''; if(o.timer) h+='<div class="timer"><i id="tmr"></i></div>';
  opts.forEach((x,i)=>{ const t=typeof x==='string'?{t:x}:x; h+='<button type="button" data-i="'+i+'"'+(t.dis?' disabled':'')+'>'+esc(fill(t.t))+(t.sub?'<small>'+esc(t.sub)+'</small>':'')+'</button>'; });
  chEl.innerHTML=h; let tm=null;
  const end=i=>{ if(tm) cancelAnimationFrame(tm); chEl.hidden=true; chEl.innerHTML=''; res(i); };
  chEl.querySelectorAll('button').forEach(b=>b.onclick=()=>end(+b.dataset.i));
  if(o.timer){ const t0=performance.now(), T=o.timer*1000; const f=()=>{ const p=1-(performance.now()-t0)/T; const el=$('tmr'); if(el) el.style.width=Math.max(0,p*100)+'%'; if(p<=0){ end(o.mac==null?-1:o.mac); return; } tm=requestAnimationFrame(f); }; f(); }
}); }
/* thẻ cảnh đánh máy */
function card(text){ return new Promise(res=>{ const c=$('card'), inn=$('cardIn'); c.hidden=false; inn.innerHTML=''; inn.classList.add('cur'); let i=0, done=false; const t=fill(text);
  const step=()=>{ if(done) return; i++; inn.textContent=t.slice(0,i); if(i<t.length) setTimeout(step,t[i-1]==='\n'?260:28); else done=true; }; step();
  const go=()=>{ if(!done){ done=true; inn.textContent=t; return; } c.removeEventListener('click',go); c.hidden=true; inn.classList.remove('cur'); res(); };
  setTimeout(()=>c.addEventListener('click',go),200); }); }

/* ---------- lớp trò chơi ---------- */
function ov(title,right){ hideDlg(); const o=$('ov'); o.hidden=false; $('stage').classList.add('has-ov'); o.innerHTML='<div class="ovh"><b>'+esc(title)+'</b><span id="ovR">'+(right||'')+'</span></div><div class="ovb" id="ovB"></div>'; return $('ovB'); }
function ovClose(){ const o=$('ov'); o.hidden=true; o.innerHTML=''; $('stage').classList.remove('has-ov'); }

/* ---------- lưu ---------- */
function save(quiet){ if(!S) return; lsSet(SAVE_KEY,JSON.stringify(S)); if(!quiet) toast('Đã lưu · Ngày '+S.ngay); }
function loadSave(){ try{ const o=JSON.parse(lsGet(SAVE_KEY)||'null'); return o&&o.v===1?o:null; }catch(e){ return null; } }
function p1Save(){ try{ return JSON.parse(lsGet('tgl_chuong1')||'null'); }catch(e){ return null; } }

/* ---------- màn đầu ---------- */
const KET1={phuong:'Người lên tiếng',imlang:'Im lặng đúng lúc',bocphot:'Bóc phốt',tien:'Nhận tiền',hetgio:'Hết giờ'};
function boot(){ initDlg(); $('bSave').onclick=()=>save(); $('bMenu').onclick=()=>{ save(true); home(); }; home(); }
function home(){
  const p1=p1Save(), sv=loadSave(); const h=$('home'); h.hidden=false;
  const k=p1&&p1.ket; const nh=(k==='phuong'||k==='imlang')?'A':'B';
  let s='<div class="hin"><div class="k">HẺM 47 · PHẦN 2</div><h2>Xứ Lạ</h2><p>Có những người rời hẻm 47 với một tờ giấy khám sức khỏe và một lời hứa lương ba chục triệu. Họ không gọi điện về.</p><p>Bên kia sông, có người vẫn đang gõ.</p>';
  s+='<div class="save">'+(p1?'Phần 1 của bạn kết ở: <b>'+esc(KET1[k]||k)+'</b>. '+(nh==='A'?'Ngân đã về.':'Ngân chưa về.'):'Chưa thấy bài lưu Phần 1 trên máy này. Bạn sẽ vào như kết "Hết giờ": Ngân chưa về.')+'</div>';
  if(TEST) s+='<p>Chơi thử với kết Phần 1: <select id="tk"><option value="">(theo bài lưu)</option>'+Object.keys(KET1).map(x=>'<option value="'+x+'">'+KET1[x]+'</option>').join('')+'</select> <label><input type="checkbox" id="tkl"> anh Khoa đã lật</label> <label><input type="checkbox" id="ttu"> đã vạch anh Tú</label> <label><input type="checkbox" id="tcg"> đã nói thật với cô Thoa</label></p>';
  s+='<div class="row">'+(sv?'<button class="btn" id="hCont" type="button">Chơi tiếp · Ngày '+sv.ngay+'</button>':'')+'<button class="btn'+(sv?' ghost':'')+'" id="hNew" type="button">Chơi mới</button><a class="btn ghost" href="./" style="text-decoration:none">Về Phần 1</a></div>';
  s+='<div class="warn">18+. Có nội dung về lừa đảo, mua bán người và giam giữ, không có cảnh bạo lực trực diện. Các thủ đoạn trong game được hư cấu lại từ những vụ việc đã được báo chí và cơ quan chức năng công bố để cảnh báo. Nhân vật và địa danh là hư cấu. Nếu bạn hoặc người quen đang được mời đi làm "việc nhẹ lương cao" ở nước ngoài, hãy báo công an nơi gần nhất.</div>';
  s+='<div class="foot">Bản thử nghiệm · tranh Phần 2 đang làm, một số cảnh dùng tạm tranh cũ · © Jesuising Studio</div></div>';
  h.innerHTML=s;
  if(sv) $('hCont').onclick=()=>{ S=sv; h.hidden=true; run(); };
  $('hNew').onclick=()=>{ if(sv&&!confirm('Chơi mới sẽ xóa bài lưu Phần 2 hiện tại. Tiếp tục?')) return;
    let p=p1; if(TEST){ const v=$('tk').value; if(v) p=Object.assign({},p1||{},{ket:v,co:Object.assign({},(p1&&p1.co)||{},{khoa_lat:$('tkl').checked,tu_lo:$('ttu').checked,noi_cuocgoi:$('tcg').checked})}); }
    S=fresh(p); lsDel(SAVE_KEY); h.hidden=true; run(); };
}

/* ---------- vòng chơi ---------- */
let RUNNING=false;
async function run(){ if(RUNNING) return; RUNNING=true; hud();
  try{ while(!S.ket){ await playDay(); } await finale(); }
  catch(e){ console.error(e); toast('Có lỗi: '+e.message); }
  RUNNING=false; }
