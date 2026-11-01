/* Hẻm 47 · Phần 2 · Xứ Lạ — gắn vào khung Phần 1.
   Phần 2 chỉ bật khi bấm nút "Phần 2" ở màn đầu. Khi bật: đổi bảng việc, bảng phòng, người, bản đồ (hẻm 47 → trại),
   ô lưu riêng (tgl_p2_save / slot chuong2), rồi chạy cùng một vòng chơi với Phần 1.
   Thứ tự nạp: p2.js → games2.js → rows2.js → rows2b.js → data2.js */
'use strict';
const P2={on:false,map:'hem'};
const P2SAVE='tgl_p2_save';
const hasF=k=>!!(S.co&&S.co[k]);
const setME=()=>{ ME=S.vai==='ngan'?'Ngân':'Lâm'; MEK=S.vai==='ngan'?'ngan':'lam'; };
const BAN=()=>ME==='Lâm'?'Ngân':'Lâm';
const p2t=s=>String(s==null?'':s).replace(/\{me\}/g,ME).replace(/\{ban\}/g,BAN()).replace(/\{ocl\}/g,ocl());

/* ---------------- ảnh: thử img2/<tên>.webp, không có thì mượn ảnh cũ ---------------- */
const P2FB={
  'x2-xe-dem':'ky-uc-2','x2-xe-hem':'hem-dem','x2-cong-sat':'trong-vp12','x2-phong-may':'trong-vp12','x2-san-diemdanh':'hem-dem',
  'x2-nha-an':'trong-banhmi','x2-phong-ngu':'trong-phong3-dem','x2-buong-tam':'trong-phong3-dem','x2-tang3':'trong-vp12','x2-phong-toi':'trong-phong3-dem',
  'x2-bep':'trong-banhmi','x2-bo-song-dem':'ngoai-ben','x2-bo-ben-nay':'ngoai-ben','x2-taphoa-chieu':'nha-taphoa','x2-van-phong-lam':'trong-vp12',
  'x2-hien-basau-dem':'hem-dem','x2-quan-thaodien':'ngoai-cafe','x2-congan':'ngoai-congan','x2-ben-ghe':'ngoai-ben','x2-trai-giam':'ngoai-congan',
  'x2-kham-suckhoe':'trong-vp12','x2-vp-quan-khac':'trong-vp12','x2-hem-mua':'hem-dem','x2-hau-trai':'','x2-trai-matcat':'',
  'x2-cua-khau-sang':'','x2-ket-o-lai':'','x2-ket-ban-dung':'','x2-tiec-taphoa':'','x2-ket-mot-minh':'','face-lam-4':'','face-ngan-4':'','x2-trong-hottoc':'','x2-trong-nail':'','x2-trong-taphoa':'','x2-trong-phong3':'','x2-trong-phong3-dem':'','x2-bep-ngay':'','x2-goi-ve':'x2-phong-may'};
/* người mới chưa có hình: mượn tạm hình người cũ */
const P2CH={bay:'thoa',seo:'tu',thoai:'loc',khang:'bin',ti:'bin',nhi:'thuy',toan:'loc',hue:'hanh'};
const P2HGT={bay:156,seo:172,thoai:164,khang:166,ti:160,nhi:152,toan:168,hue:150};
const P2FACEOK={};
function p2Img(name){ return new Promise(res=>{ if(IMG[name]&&P2REAL[name]){ res(IMG[name]); return; } const i=new Image();
  i.onload=()=>{ IMG[name]=i; P2REAL[name]=1; res(i); };
  i.onerror=()=>{ const fb=P2FB[name]; if(!fb){ res(null); return; } if(IMG[fb]){ IMG[name]=IMG[fb]; res(IMG[fb]); return; } const j=new Image(); j.onload=()=>{ IMG[fb]=IMG[name]=j; res(j); }; j.onerror=()=>res(null); j.src='img2/'+fb+'.webp'; };
  i.src='img2/'+name+'.webp?v=1025'; }); }
/* ảnh cảnh Phần 2 (~4MB) tải nền, không bắt người chơi chờ; cảnh nào cần thì show() chờ riêng ảnh đó tối đa 2.5 giây */
let P2BGLOAD=null;
function p2BgLoad(){ if(P2BGLOAD) return P2BGLOAD; const ks=Object.keys(P2FB); let i=0; const one=()=>i<ks.length?p2Img(ks[i++]).then(one):null; P2BGLOAD=Promise.all([one(),one(),one()]); return P2BGLOAD; }
function p2NeedImg(k){ if(!k||k==='den'||(IMG[k]&&P2REAL[k])||!(k in P2FB)) return null; return Promise.race([p2Img(k),sleep(2500)]); }
function p2LoadImgs(){ const L=[];
  const ch=Object.keys(P2CH).map(k=>Promise.all(['full','bust','face'].map(sfx=>new Promise(r=>{ const i=new Image(); i.onload=()=>{ IMG[k+'-'+sfx]=i; P2FACEOK[k+'-'+sfx]=1; r(); };
    i.onerror=()=>{ if(sfx==='face'&&!i._f1){ i._f1=1; i.onload=()=>{ IMG[k+'-face']=i; P2FACEOK[k+'-face1']=1; r(); }; i.src='img2/face-'+k+'-1.webp'; return; } const al=P2CH[k]; if(IMG[al+'-'+sfx]){ IMG[k+'-'+sfx]=IMG[al+'-'+sfx]; r(); return; } const j=new Image(); j.onload=()=>{ IMG[k+'-'+sfx]=j; r(); }; j.onerror=()=>r(); j.src='img2/'+al+'-'+sfx+'.webp'; }; i.src='img2/'+k+'-'+sfx+'.webp'; }))));
  return Promise.all(L.concat(ch)); }
const p2Face=k=>!P2CH[k]||P2FACEOK[k+'-face']?null:P2FACEOK[k+'-face1']?'img2/face-'+k+'-1.webp':'img2/'+P2CH[k]+'-face.webp';

/* ---------------- mặt tiền trại vẽ tạm bằng code (có ảnh img2/nha-x*.webp thì dùng ảnh) ---------------- */
const TRAI_ORDER=['nha-xcong','nha-xmay','nha-xan','nha-xngu','nha-xbep','nha-xvp'];
const TRAI_SPEC={
  xcong:{w:420,h:480,floors:1,door:.55,doorW:.34,gate:1,col:'#6d6f6b'},
  xmay:{w:620,h:480,floors:2,door:.5,doorW:.16,label:'PHÒNG MÁY',col:'#7d7f78'},
  xan:{w:440,h:480,floors:1,door:.5,doorW:.2,label:'NHÀ ĂN',col:'#86826f'},
  xngu:{w:560,h:480,floors:3,door:.3,doorW:.14,label:'DÃY 3',col:'#7a7a73'},
  xbep:{w:340,h:480,floors:1,door:.55,doorW:.2,label:'BẾP',col:'#6f6a5e'},
  xvp:{w:460,h:480,floors:3,door:.62,doorW:.14,label:'',col:'#888b86',ac:1}};
function facade(k,night){ const P=TRAI_SPEC[k]; const c=document.createElement('canvas'); c.width=P.w; c.height=P.h; const q=c.getContext('2d');
  const top=P.gate?P.h*.38:P.h-(P.h*.24*P.floors)-30; let seed=k.length*97+(night?7:0); const r=()=>(seed=(seed*16807)%2147483647)/2147483647;
  if(P.gate){ q.fillStyle='#5d5f5b'; q.fillRect(0,top,P.w,P.h-top); for(let i=0;i<500;i++){ q.fillStyle='rgba(0,0,0,'+(r()*.08)+')'; q.fillRect(r()*P.w,top+r()*(P.h-top),2+r()*6,1+r()*3); }
    const gx=P.w*(P.door-P.doorW/2), gw=P.w*P.doorW; q.fillStyle='#2c2f33'; q.fillRect(gx,top+30,gw,P.h-top-30); q.strokeStyle='#4a4e54'; q.lineWidth=4; for(let x=gx+8;x<gx+gw;x+=16){ q.beginPath(); q.moveTo(x,top+34); q.lineTo(x,P.h-6); q.stroke(); }
    q.fillStyle='#3f4347'; q.fillRect(gx-10,top+20,12,P.h-top-20); q.fillRect(gx+gw-2,top+20,12,P.h-top-20);
    q.fillStyle='#74776f'; q.fillRect(P.w*.06,top+80,P.w*.2,P.h-top-80); q.fillStyle=night?'#e8d38a':'#3c4248'; q.fillRect(P.w*.09,top+110,P.w*.14,40);
  } else {
    q.fillStyle=P.col; q.fillRect(0,top,P.w,P.h-top); for(let i=0;i<900;i++){ q.fillStyle='rgba(0,0,0,'+(r()*.07)+')'; q.fillRect(r()*P.w,top+r()*(P.h-top),2+r()*10,1+r()*4); }
    for(let i=0;i<14;i++){ const x=r()*P.w; const gr=q.createLinearGradient(0,top,0,top+120+r()*200); gr.addColorStop(0,'rgba(40,36,28,.35)'); gr.addColorStop(1,'rgba(40,36,28,0)'); q.fillStyle=gr; q.fillRect(x,top,6+r()*14,320); }
    q.fillStyle='rgba(0,0,0,.25)'; for(let f=1;f<P.floors;f++) q.fillRect(0,P.h-f*P.h*.24-8,P.w,6);
    for(let f=0;f<P.floors;f++){ const fy=P.h-(f+1)*P.h*.24; const nW=Math.max(2,Math.round(P.w/120)); for(let i=0;i<nW;i++){ const wx=P.w*(i+.5)/nW-28; if(f===0&&Math.abs((wx+28)/P.w-P.door)<P.doorW/2+.06) continue;
      q.fillStyle=night?(r()<.5?'#d9c98a':'#1e2226'):'#2f353b'; q.fillRect(wx,fy+18,56,50); q.strokeStyle='#4d5258'; q.lineWidth=3; for(let x=wx+6;x<wx+56;x+=10){ q.beginPath(); q.moveTo(x,fy+18); q.lineTo(x,fy+68); q.stroke(); } q.strokeRect(wx,fy+18,56,50);
      if(P.ac&&i===nW-1){ q.fillStyle='#d8d8d2'; q.fillRect(wx+8,fy+76,40,22); } } }
    const dx=P.w*(P.door-P.doorW/2), dw=P.w*P.doorW; q.fillStyle='#24282c'; q.fillRect(dx,P.h-P.h*.2,dw,P.h*.2); q.fillStyle='#3a3f45'; q.fillRect(dx-6,P.h-P.h*.2-8,dw+12,8);
    if(P.label){ q.fillStyle='#e9e6dc'; q.fillRect(dx-30,P.h-P.h*.2-44,dw+60,28); q.fillStyle='#2a2a2a'; q.font='600 18px "Oswald","Arial Narrow",sans-serif'; q.textAlign='center'; q.fillText(P.label,dx+dw/2,P.h-P.h*.2-24); }
    q.fillStyle='#5b5f63'; q.fillRect(-4,top-10,P.w+8,12); }
  q.strokeStyle='rgba(30,30,32,.9)'; q.lineWidth=2; for(let x=4;x<P.w;x+=18){ q.beginPath(); q.arc(x,top-16,9,0,Math.PI*2); q.stroke(); }
  q.fillStyle='rgba(0,0,0,.18)'; q.fillRect(0,P.h-14,P.w,14);
  return c; }
/* đồ vật đặt trong sân trại (xe, thùng, phuy, bao cát, đèn) · h: dãy nhà, u: vị trí 0–1, hh: cao, f: lật */
const TPROP=[{k:'el2-jeep',h:'xcong',u:.78,hh:185},{k:'el2-den',h:'xcong',u:.99,hh:195},{k:'el2-van',h:'xmay',u:.6,hh:200,f:-1},{k:'el2-sedan',h:'xmay',u:.86,hh:135},
  {k:'el2-xemay',h:'xan',u:.1,hh:100},{k:'el2-rao',h:'xngu',u:.78,hh:92},{k:'el2-phuy',h:'xbep',u:.12,hh:100},{k:'el2-thung',h:'xbep',u:.97,hh:108},{k:'el2-baocat',h:'xvp',u:.06,hh:78},{k:'el2-den',h:'xvp',u:.97,hh:195}];
function drawTProps(){ TPROP.forEach(p=>{ const im=IMG[p.k]; if(!im||!A[p.h]) return; const w=im.width*p.hh/im.height, x=at(p.h,p.u);
  g.save(); g.fillStyle='rgba(0,0,0,.28)'; g.beginPath(); g.ellipse(x,NFEET-10,w*.5,10,0,0,7); g.fill(); g.translate(x,NFEET-10); g.scale(p.f||1,1); g.drawImage(im,-w/2,-p.hh,w,p.hh); g.restore(); }); }
async function trainImgs(){ await Promise.all([...new Set(TPROP.map(p=>p.k))].map(k=>p2Img(k))); for(const hk of TRAI_ORDER){ const k=hk.slice(4); const im=await p2Img(hk); if(!im){ IMG[hk]=facade(k,false); IMG[hk+'-dem']=facade(k,true); } }  if(P2.map==='trai'){ const px=PL.x/(W||1); Object.keys(A).forEach(k=>delete A[k]); layout(); prepLit(); PL.x=px*W; } }

/* ---------------- bản đồ: hẻm 47 hoặc trại ---------------- */
let P1MAP=null;
/* thanh tải mảnh ở mép trên khi mở Phần 2 */
function p2Bar(){ const b=document.createElement('div'); b.className='p2load'; b.innerHTML='<i></i>'; document.body.appendChild(b);
  if(!document.getElementById('p2loadCss')){ const st=document.createElement('style'); st.id='p2loadCss'; st.textContent='.p2load{position:fixed;left:0;right:0;top:0;height:3px;z-index:99999;background:rgba(0,0,0,.25);pointer-events:none}.p2load i{display:block;height:100%;width:4%;background:#e8b04b;transition:width .25s}'; document.head.appendChild(st); }
  return b; }
function p2Track(ps,bar){ let done=0; const tot=ps.length+1, i=bar.querySelector('i'); const up=()=>{ i.style.width=Math.max(4,Math.round(100*(++done)/tot))+'%'; }; return Promise.all(ps.map(p=>Promise.resolve(p).then(up,up))); }
function p2SetMap(m){ P2.map=m; S.map=m;
  if(!P1MAP) P1MAP={order:HOUSE_ORDER.slice(),lit:Object.assign({},LIT)};
  HOUSE_ORDER.length=0; Object.keys(LIT).forEach(k=>delete LIT[k]);
  if(m==='trai'){ /* ảnh mặt tiền trại chưa tải xong (tải nền) → tạm dùng mặt tiền vẽ bằng code, tải xong tự dựng lại */
    TRAI_ORDER.forEach(h=>{ if(!IMG[h]){ IMG[h]=facade(h.slice(4),false); if(!IMG[h+'-dem']) IMG[h+'-dem']=facade(h.slice(4),true); } });
    TRAI_ORDER.forEach(h=>HOUSE_ORDER.push(h)); Object.assign(LIT,P2DATA.LIT_TRAI); }
  else { P1MAP.order.forEach(h=>HOUSE_ORDER.push(h)); Object.assign(LIT,P1MAP.lit); }
  Object.keys(A).forEach(k=>delete A[k]); layout();
  if(m==='trai'){ LAMPS=[]; HIDES=[]; FGP=[]; ELP=[]; } else { places(); propsInit(); ELP=null; }
  prepLit();
  Object.keys(NPC).forEach(k=>delete NPC[k]); Object.assign(NPC,m==='trai'?P2DATA.NPC_TRAI:P2DATA.NPC_HEM);
  for(const k in NS) delete NS[k]; snapNPC();
  document.body.classList.toggle('p2trai',m==='trai'); }

/* ---------------- điều kiện & hiệu ứng riêng của Phần 2 ---------------- */
const cond1=cond, effects1=effects;
cond=function(s,opt){ s=String(s||'').trim(); if(!s) return true; if(!P2.on) return cond1(s,opt);
  for(const tk of s.split(/[\s,;]+/).filter(Boolean)){ if(!p2tok(tk,opt)) return false; } return true; };
function p2tok(tk,opt){ if(tk.includes('|')) return tk.split('|').some(x=>p2tok(x,opt)); let neg=false,t=tk; if(t[0]==='!'){ neg=true; t=t.slice(1); } let ok, m;
  if(t.startsWith('p1:')) ok=!!(S.p1&&S.p1.co&&S.p1.co[t.slice(3)]);
  else if(t.startsWith('ket1:')) ok=((S.p1&&S.p1.ket)||'hetgio')===t.slice(5);
  else if(t.startsWith('nhanh:')) ok=S.nhanh===t.slice(6);
  else if(t.startsWith('vai:')) ok=S.vai===t.slice(4);
  else if(t.startsWith('vao:')) ok=S.ai_vao===t.slice(4);
  else if(t.startsWith('mon:')) ok=S.mon===t.slice(4);
  else if(t==='direct') ok=!!S.direct;
  else if(t==='gui:ok') ok=typeof nextWord==='function'&&!!nextWord();
  else if((m=t.match(/^lo(>=|<)(\d+)$/))) ok=m[1]==='>='?(S.lo||0)>=+m[2]:(S.lo||0)<+m[2];
  else if((m=t.match(/^ccx(>=|<)(\d+)$/))) ok=m[1]==='>='?ocl()>=+m[2]:ocl()<+m[2];
  else if((m=t.match(/^ds(>=|<)(\d+)$/))) ok=m[1]==='>='?dsCon().length>=+m[2]:dsCon().length<+m[2];
  else if(t.startsWith('con:')) ok=!!(S.ds||[]).find(p=>p.id===t.slice(4)&&p.con);
  else ok=cond1(t,opt);
  return neg?!ok:ok; }
const OCL=['x_giong','x_vi','x_so','x_giongthat','x_khaibay','x_tu'];
const ocl=()=>Math.min(5,OCL.filter(k=>S.cc&&S.cc[k]).length);
const hasC=k=>!!(S.cc&&S.cc[k]);
effects=function(s){ if(!P2.on) return effects1(s); s=String(s||'').trim(); if(!s) return null; const rest=[];
  for(const t of s.split(/[\s,;]+/).filter(Boolean)){ let m;
    if((m=t.match(/^([+-])nghi:(\d+)$/))){ const v=(m[1]==='+'?1:-1)*(+m[2])*(m[1]==='+'?CDK().nghi:1); S.nghi=Math.max(0,Math.min(100,Math.round(S.nghi+v))); if(v>0) toast(P2.map==='trai'?'Quản lý để ý '+ME+' hơn':'Có người để ý '+ME+' hơn'); }
    else if((m=t.match(/^([+-])lo:(\d+)$/))){ S.lo=Math.max(0,Math.min(100,(S.lo||0)+(m[1]==='+'?1:-1)*(+m[2]))); if(m[1]==='+') toast('Nguy cơ lộ tin tăng'); }
    else if((m=t.match(/^[+-]tin_(\w+)$/))&&(m[1]===S.vai||(m[1]==='ngan'&&(S.nhanh==='A'||P2.map!=='trai')))){ /* người không có mặt hoặc chính mình: bỏ qua */ }
    else if((m=t.match(/^mon:(\w+)$/))) S.mon=m[1];
    else if((m=t.match(/^vao:(\w+)$/))) S.ai_vao=m[1];
    else if((m=t.match(/^mat:(\w+)$/))){ const p=(S.ds||[]).find(x=>x.id===m[1]); if(p&&p.con){ p.con=false; (S.p2log=S.p2log||[]).push(p.ten+' bị chuyển đi.'); toast(p.ten+' bị chuyển đi'); } }
    else if(t==='ds:build') buildDs();
    else rest.push(t); }
  return effects1(rest.join(' ')); };

/* ---------------- danh sách cần đưa về ---------------- */
function buildDs(){ if(S.ds&&S.ds.length) return; const d=[], add=(id,ten,ghi)=>d.push({id,ten,ghi,con:true}); const c=S.p1.co;
  if(S.nhanh==='B'){ add('ngan','Ngân','tổ trưởng phòng máy 2'); add('thuy','Thủy','phòng máy 2'); }
  add('nhi','Nhi','19 tuổi, Tiền Giang'); add('toan','Toàn','thợ hồ, 26 tuổi'); add('hue','Chị Huệ','49 tuổi'); add('ti','Tí','nhỏ nhất phòng');
  if(!c.khoa_lat) add('khang','Khang','em trai Khoa, khu phạt');
  if(S.nhanh==='B'&&c.loc_di) add('loc','Anh Lộc','làm bếp');
  S.ds=d; }
const dsCon=()=>(S.ds||[]).filter(p=>p.con);

/* ---------------- trạng thái mới ---------------- */
function p2Fresh(p1){ const o=fresh(); const k=(p1&&p1.ket)||'hetgio'; const nh=(k==='phuong'||k==='imlang')?'A':'B';
  Object.assign(o,{p2:1,p1:{ket:k,co:Object.assign({},(p1&&p1.co)||{}),tin:Object.assign({},(p1&&p1.tin)||{})},nhanh:nh,vai:nh==='A'?'ngan':'lam',ai_vao:null,lo:k==='bocphot'?40:0,ds:[],mon:null,p2log:[],so:[],cs:{},map:'hem'});
  /* có tiền từ Phần 1 thì mang nguyên qua (tối thiểu 600k); vào thẳng Phần 2 không có bài Phần 1 thì cho thêm việc kiếm tiền (cond "direct") */
  o.direct=(p1&&p1.tien!=null)?0:1;
  /* chơi nối từ Phần 1: giữ đúng số tiền cuối Phần 1; vào thẳng Phần 2: 650.000đ */
  o.money=(p1&&p1.tien!=null)?Math.max(0,Math.min(p1.tien+(k==='tien'?20000000:0),40000000)):650000;
  o.nghi=0;
  const t=(p1&&p1.tin)||{}; o.tin={ba_sau:Math.max(1,t.ba_sau||2),bin:Math.max(1,t.bin||1),huong:Math.max(1,t.huong||2),thoa:t.thoa||0,ngan:nh==='A'?3:0,thuy:1,khang:1,bay:0,nhi:1,toan:1,hue:1,ti:1,loc:2};
  o.min=7*60+10; o.day=1; o.hoi=1; o.scene='street'; return o; }

/* ---------------- cài vào khung ---------------- */
let P2INST=false;
function p2Install(){ if(P2INST) return; P2INST=true; const D=P2DATA;
  const swapArr=(a,b)=>{ a.length=0; b.forEach(x=>a.push(x)); }, swapObj=(a,b)=>{ Object.keys(a).forEach(k=>delete a[k]); Object.assign(a,b); };
  swapArr(ACT,D.ACT); swapArr(SIDE,D.SIDE); swapArr(AUTO,D.AUTO); swapArr(NIGHTS,D.NIGHTS); swapArr(NIGHTLATE,D.NIGHTLATE); swapArr(MSGS,D.MSGS);
  swapObj(ROOMS,D.ROOMS); swapObj(ACTN,D.ACTN); swapObj(ACTEND,D.ACTEND); swapObj(ENDS,D.ENDS); swapObj(BOARDN,D.BOARDN); swapObj(TR_NEED,D.TR_NEED);
  Object.assign(TRUSTN,D.TRUSTN); Object.assign(PLACE_IMG,D.PLACE_IMG); Object.assign(SPK,D.SPK); Object.assign(HGT,P2HGT);
  SOAT.xvp=Object.assign({img:P2REAL['x2-tang3']?'x2-tang3':'trong-vp12'},D.SOAT_XVP);
  Object.assign(SPOTN,{ngo:'Đầu hẻm · cột điện, gọi xe',cong:'Cổng sắt',rao:'Hàng rào sau bếp'});
  TOTAL_DAYS=21; SAVEKEY=P2SAVE; SAVESLOT='chuong2';
  if(typeof P2GATE!=='undefined') P2ROWS.forEach(r=>{ const g=P2GATE[r.ma.replace(/_\d+$/,'')]; if(!g) return; const add=[g,P2GATE_ROW[r.ma]].filter(Boolean).join(' '); if(!String(r.hien||'').includes(g)) r.hien=(r.hien?r.hien+' ':'')+add; });
  if(typeof P2OV!=='undefined') P2ROWS.forEach(r=>{ const v=P2OV[r.ma]; if(v==null) return; if(typeof v==='string') r.loi=v; else Object.assign(r,v); });
  P2ROWS.forEach(r=>ROWS_DEFAULT.push(r)); rebuild();
  NV.length=0; D.NV.forEach(x=>NV.push(x));
  const hn=$('hNghi'); if(hn){ hn.title='Quản lý trại nghi tới đâu'; if(hn.firstChild&&hn.firstChild.nodeType===3) hn.firstChild.textContent='Bị nghi '; }
  document.title=/taotestcaigiketao/.test(location.pathname)?'Hẻm 47 · Xứ Lạ (bản thử)':'Hẻm 47: Xứ Lạ'; }

/* ---------------- những chỗ của khung Phần 1 cần đổi khi chơi Phần 2 ---------------- */
const hotspots1=hotspots;
hotspots=function(){ if(P2.on&&P2.map==='trai'&&S.scene==='in'){ const L=hotspots1(); L.forEach(h=>{ if(h.kind==='exit'&&h.l==='Ra hẻm') h.l='Ra sân'; }); return L; }
  if(!P2.on||P2.map!=='trai'||S.scene!=='street') return hotspots1();
  const L=[]; if(SO.on) return L;
  for(const k in NPC){ if(npcInRoom(k)) continue; const n=npcAt(k); if(n) L.push({id:k,x:n.x,w:70,h:HGT[k]||160,l:NPC[k].n,kind:'npc'}); }
  for(const r in ROOMS){ const R=ROOMS[r]; if(!R.house||!A[R.house]||R.nodoor||(R.c&&!cond(R.c))) continue; L.push({id:'room:'+r,x:at(R.house,R.door||.5),w:A[R.house].w*.22,h:300,l:R.ten,kind:'door',room:r}); }
  L.forEach(h=>{ h.acts=h.kind==='door'?[]:actsNow(h.id); h.sides=h.kind==='npc'?sidesNow(h.id):[]; h.main=h.acts.filter(a=>actOk(a)&&!a.ngoai).length; h.ngoai=h.acts.filter(a=>actOk(a)&&a.ngoai).length;
    if(h.kind==='door'){ const R=ROOMS[h.room]; const inside=(R.npc||[]).filter(k=>NPC[k]&&npcInRoom(k)===R.house);
      const subs=[R].concat(Object.values(ROOMS).filter(x=>x.back===h.room));
      h.main+=inside.reduce((n,k)=>n+actsNow(k).filter(a=>actOk(a)&&!a.ngoai).length,0)+subs.reduce((n,X)=>n+(X.objs||[]).reduce((m,o)=>m+actsNow('o:'+o.id).filter(a=>actOk(a)&&!a.ngoai).length,0),0);
      h.sidesN=inside.reduce((n,k)=>n+sidesNow(k).length,0); } });
  return L; };
const roomIm1=roomIm;
const P2ROOMIMG={hottoc:'x2-trong-hottoc',nail:'x2-trong-nail',taphoa:'x2-trong-taphoa',phong3:'x2-trong-phong3'};
roomIm=function(){ if(P2.on){ const R=ROOMS[S.room]; if(S.room==='bep'&&hour()<18&&P2REAL['x2-bep-ngay']) return IMG['x2-bep-ngay']; if(R&&R.img) return IMG[R.img]||null;
    if(S.room==='phong3'&&(hour()>=18.5||hour()<5.5)){ if(P2REAL['x2-trong-phong3-dem']) return IMG['x2-trong-phong3-dem']; if(!roomIm._ld){ roomIm._ld=1; p2Img('x2-trong-phong3-dem'); } }
    const k=P2ROOMIMG[S.room]; if(k&&P2REAL[k]) return IMG[k]; } return roomIm1(); };
const faceFor1=faceFor;
/* người chưa lộ mặt: bóng người ngược sáng thay cho ô "?" xám */
const SILF={'Ông Chủ Lò':'m','Người tuyển':'f','Số lạ':'m','Cô gái trẻ':'f','Ông chú':'m','Bà Trần Thị Mỹ':'f','Bà Mỹ':'f','Má':'f'}; const SILC={};
function silFace(name){ if(SILC[name]) return SILC[name]; const c=document.createElement('canvas'); c.width=c.height=200; const q=c.getContext('2d'); const fem=SILF[name]==='f';
  const bg=q.createRadialGradient(120,70,10,100,100,150); bg.addColorStop(0,'#4a3420'); bg.addColorStop(.55,'#1c1712'); bg.addColorStop(1,'#08090c'); q.fillStyle=bg; q.fillRect(0,0,200,200);
  const shape=(dx)=>{ q.beginPath(); q.ellipse(100+dx,82,fem?31:29,fem?36:35,0,0,7); q.fill(); q.fillRect(88+dx,104,24,26);
    q.beginPath(); q.moveTo(18+dx,200); q.bezierCurveTo(22+dx,150,52+dx,128,100+dx,126); q.bezierCurveTo(148+dx,128,178+dx,150,182+dx,200); q.closePath(); q.fill();
    if(fem){ q.beginPath(); q.arc(100+dx,42,15,0,7); q.fill(); q.beginPath(); q.ellipse(100+dx,92,36,40,0,Math.PI*.05,Math.PI*.95); q.fill(); } };
  q.fillStyle='rgba(240,178,92,.55)'; shape(3); q.fillStyle='#050608'; shape(0);
  const v=q.createLinearGradient(0,120,0,200); v.addColorStop(0,'rgba(5,6,8,0)'); v.addColorStop(1,'rgba(5,6,8,.6)'); q.fillStyle=v; q.fillRect(0,0,200,200);
  return SILC[name]=c.toDataURL('image/png'); }
faceFor=function(name,n){ if(P2.on){ if(name==='Lâm'&&P2.map==='trai'&&P2REAL['face-lam-4']) return 'img2/face-lam-4.webp'; if(name==='Ngân'&&S.nhanh==='A'&&P2.map==='hem'&&P2REAL['face-ngan-4']) return 'img2/face-ngan-4.webp'; if(SILF[name]) return silFace(name); const k=SPK[name]; const f=k&&p2Face(k); if(f) return f; } return faceFor1(name,n); };
const setBust1=setBust;
setBust=function(nm,label,kind){ setBust1(nm,label,kind); if(!P2.on) return; const k=nm&&SPK[nm]; if(k&&P2CH[k]&&!P2FACEOK[k+'-bust']){ const b=$('dBust'); if(!b.hidden) b.querySelector('img').src='img2/'+P2CH[k]+'-bust.webp'; } };
const evPlan1=evPlan; evPlan=function(){ if(P2.on) return; return evPlan1.apply(this,arguments); };
const webMatch1=webMatch; webMatch=function(q){ const L=webMatch1(q)||[]; return P2.on?L.filter(r=>String(r.ma).startsWith('WEB_x')):L.filter(r=>!String(r.ma).startsWith('WEB_x')); };
const objective1=objective;
objective=function(){ if(!P2.on) return objective1(); if(S.ended) return 'Đã kết thúc: '+((ENDS[S.ended]||['',''])[1])+'.';
  if(SO.on) return objective1(); if(S.scene==='room') return P2.map==='trai'?'Đêm. Phòng ngủ tổ 3.':'Đêm.'; if(S.scene==='place') return '';
  const L=metaRows('muc').filter(x=>String(x.ma).startsWith('MUC_x')&&cond(x.hien)).slice(0,2).map(r=>p2t(tpl(r.loi)));
  const nm=hotspots().filter(h=>h.main).length; const lich=P2.map==='trai'?campNote():'';
  return (lich?lich+'\n':'')+(L.length?L.join('\n')+'\n':'')+(nm?nm+' chỗ có việc chính (!).':(S.scene==='in'?'Bấm người hoặc đồ vật.':'')); };
function campNote(){ const h=hour(); if(h<12) return 'Ca sáng'; if(h<13) return 'Giờ cơm · 13:00 vô ca'; if(h<19) return 'Ca chiều'; if(h<22) return 'Giờ ra sân · 22:00 tắt đèn'; return 'Tắt đèn'; }
const renderPhone1=renderPhone;
renderPhone=function(){ if(P2.on&&P2.map==='trai'&&(phTab==='tin'||phTab==='tim')){ phThread=null; tabs(); $('phTitle').textContent=phTab==='tin'?'Za Lô':'Tìm kiếm';
    $('phBody').innerHTML='<div class="ph-note" style="padding:16px;line-height:1.6">Điện thoại bị thu ở cổng trại. '+(hasF('x_may')?'Cái máy giấu chỉ dám mở trong buồng tắm. ':'')+'Những gì '+ME+' biết thì nhớ trong đầu: mở mục Manh mối.</div>'; return; }
  return renderPhone1(); };
const hud1=hud;
hud=function(){ hud1(); if(!P2.on) return; const xb=$('exitBtn'); if(xb) xb.textContent=P2.map==='trai'?'‹ Ra sân':'‹ Ra hẻm'; const hn=$('hNghi'); if(hn){ hn.hidden=P2.map!=='trai'&&S.nghi<1; }
  document.body.classList.toggle('p2lb',P2.map==='trai'&&busy&&!$('dlg').hidden); };

/* vẽ */
const frame1=frame;
frame=function(){ if(P2.on&&BGNOW==='den'){ const dpr=Math.min(window.devicePixelRatio||1,Math.min(innerWidth,innerHeight)<600?1.25:2); if(cv.width!==Math.round(cv.clientWidth*dpr)){ cv.width=Math.round(cv.clientWidth*dpr); cv.height=Math.round(cv.clientHeight*dpr); } g.setTransform(1,0,0,1,0,0); g.fillStyle='#000'; g.fillRect(0,0,cv.width,cv.height); return; }
  if(P2.on&&P2.map==='trai'&&!(BGNOW&&IMG[BGNOW])&&(S.scene==='street'||S.scene==='room')) return frameTrai(); return frame1(); };
function frameTrai(){ const dpr=Math.min(window.devicePixelRatio||1,Math.min(innerWidth,innerHeight)<600?1.25:2), cw=cv.clientWidth, ch=cv.clientHeight;
  if(cv.width!==Math.round(cw*dpr)||cv.height!==Math.round(ch*dpr)){ cv.width=Math.round(cw*dpr); cv.height=Math.round(ch*dpr); }
  const sc=cv.height/VH; VW=cv.width/sc; g.setTransform(sc,0,0,sc,0,0); g.imageSmoothingEnabled=true;
  const h=hour(), nn=nightF(h);
  if(S.scene==='room'){ const im=IMG['x2-phong-ngu']; if(im){ RB=drawCover(im); tintAll('#7b85a8'); } else { g.fillStyle='#14161d'; g.fillRect(0,0,VW,VH); } overlays(); return; }
  { const fol=Math.max(0,Math.min(W-VW,PL.x-VW/2)); if(PL.walk&&!DRAG) CAMX=null; const tg=CAMX!=null?Math.max(0,Math.min(W-VW,CAMX)):fol; cam=(Math.abs(tg-cam)>VW*1.5||DRAG)?tg:cam+(tg-cam)*.14; if(Math.abs(tg-cam)<.5) cam=tg; }
  const [s1,s2]=key(SKYK,h); const sg=g.createLinearGradient(0,0,0,GROUND); sg.addColorStop(0,s1); sg.addColorStop(1,s2); g.fillStyle=sg; g.fillRect(0,0,VW,VH);
  const hb=IMG['x2-hau-trai']; if(hb){ const bh=GROUND+40, bw=bh*hb.width/hb.height, ox=-((cam*.25)%bw); for(let x=ox;x<VW;x+=bw) g.drawImage(hb,x,GROUND+40-bh,bw,bh); }
  else { g.fillStyle='#3c4040'; g.fillRect(0,GROUND-330,VW,330); g.strokeStyle='rgba(20,20,22,.8)'; g.lineWidth=2; const off=-(cam*.5)%18; for(let x=off;x<VW;x+=18){ g.beginPath(); g.arc(x,GROUND-342,9,0,7); g.stroke(); }
    g.fillStyle='rgba(255,255,255,.04)'; for(let i=0;i<40;i++) g.fillRect(((i*173-cam*.5)%VW+VW)%VW,GROUND-320+((i*57)%280),40,2); }
  g.save(); g.translate(-cam,0);
  if(GR) for(let x=Math.floor(cam/1024)*1024;x<cam+VW+1024;x+=1024) g.drawImage(GR,x,GROUND);
  g.fillStyle='rgba(60,50,40,.25)'; g.fillRect(cam,GROUND+20,VW,VH-GROUND-20);
  HOUSE_ORDER.forEach(hk=>drawHouse(hk.slice(4)));
  const FL=[A.xmay.x-20,A.xngu.x-20,A.xvp.x+A.xvp.w+40]; FL.forEach(x=>{ g.fillStyle='#3a3c42'; g.fillRect(x-5,GROUND-470,10,480); g.fillStyle='#d9dde0'; g.fillRect(x-22,GROUND-480,44,14); });
  { const x0=A.xvp.x+A.xvp.w+10; g.fillStyle='#2b3a44'; g.fillRect(x0+60,GROUND-120,MR,140); g.strokeStyle='rgba(180,180,170,.6)'; g.lineWidth=1.5; for(let x=x0;x<x0+MR;x+=22){ g.beginPath(); g.moveTo(x,GROUND+10); g.lineTo(x+22,GROUND-150); g.moveTo(x+22,GROUND+10); g.lineTo(x,GROUND-150); g.stroke(); }
    g.fillStyle='#3a3c42'; for(let x=x0;x<x0+MR;x+=110) g.fillRect(x,GROUND-170,6,180); if(hasF('x_rao')){ g.fillStyle='rgba(10,12,16,.85)'; g.fillRect(x0+130,GROUND-110,40,120); } }
  { const ew=Math.max(60,ML-30), gr=g.createLinearGradient(0,0,ew,0); gr.addColorStop(0,'rgba(8,9,12,.92)'); gr.addColorStop(1,'rgba(8,9,12,0)'); g.fillStyle=gr; g.fillRect(0,0,ew,VH); }
  drawTProps();
  const D=[];
  for(const k in NPC){ if(npcInRoom(k)) continue; const n=NS[k]; if(n&&n.alpha>0) D.push({y:NFEET,f:(cx)=>drawChar(cx||g,k,n.x,NFEET,n.face,{walk:n.walk,ph:n.ph,t:tsec+k.length,alpha:n.alpha})}); }
  D.push({y:FEET,f:(cx)=>drawChar(cx||g,MEK,PL.x,FEET,PL.face,{walk:PL.walk,ph:PL.ph,t:tsec+1,crouch:PL.hidden})});
  g.restore();
  g.globalCompositeOperation='multiply'; g.fillStyle=key(GRK,h)[0]; g.fillRect(0,0,VW,VH);
  g.globalCompositeOperation='saturation'; g.fillStyle='rgba(128,128,128,.45)'; g.fillRect(0,0,VW,VH); g.globalCompositeOperation='source-over';
  /* nhân vật vẽ sau lớp màu, chỉ nhuộm nhẹ trên chính hình người: khỏi bị bạc như trong suốt */
  /* nhân vật vẽ thẳng sau lớp màu (không dùng tranh phụ + filter: tốn máy, lag trên điện thoại) */
  g.save(); g.translate(-cam,0); D.sort((a,b)=>a.y-b.y).forEach(d=>d.f()); g.restore();
  if(nn>0){ g.save(); g.translate(-cam,0); g.globalCompositeOperation='lighter'; FL.forEach(x=>{ const gr=g.createRadialGradient(x,GROUND-470,2,x,GROUND-200,420); gr.addColorStop(0,'rgba(230,240,255,'+(.22*nn)+')'); gr.addColorStop(1,'rgba(230,240,255,0)'); g.fillStyle=gr; g.beginPath(); g.moveTo(x-20,GROUND-470); g.lineTo(x+20,GROUND-470); g.lineTo(x+260,FEET+30); g.lineTo(x-260,FEET+30); g.closePath(); g.fill(); }); g.restore(); g.globalCompositeOperation='source-over'; }
  overlays(); }

/* lời thoại: thẻ chữ lớn, dòng hiệu ứng, đổi nền, {me}/{ban} */
function p2Card(text){ return new Promise(res=>{ const d=document.createElement('div'); d.className='p2cardfull'; d.innerHTML='<p>'+esc(text)+'</p>'; document.body.appendChild(d); requestAnimationFrame(()=>d.classList.add('on')); try{ tone(110,.6,.04,'sine'); }catch(e){}
  let done=false; const end=()=>{ if(done) return; done=true; d.classList.remove('on'); setTimeout(()=>{ d.remove(); res(); },600); }; setTimeout(()=>{ d.onclick=end; },400); setTimeout(end,3000); }); }
/* thẻ "NGÀY 9 · 7:00": khớp với ngày giờ thật đang chơi */
function cardSync(t){ const m=String(t).match(/^NGÀY (\d+)(?: · (\d{1,2}):(\d{2})( SÁNG)?)?/); if(!m||!S.day) return t;
  let d=+m[1], hm=m[2]!=null?(+m[2])*60+(+m[3]):null; const nowD=S.day, nowM=S.min;
  if(hm!=null&&d===nowD+1&&hm<5*60){ return t; }            // qua nửa đêm của đêm hôm nay
  let head='NGÀY '+nowD;
  if(hm!=null){ if(hm>=nowM-30){ at2(hm); head+=' · '+m[2]+':'+m[3]+(m[4]||''); } }
  return head+t.slice(m[0].length); }
const show1=show;
show=async function(r){ if(!P2.on) return show1(r);
  if(r.bg!=null){ const w=p2NeedImg(r.bg); if(w) await w; BGNOW=r.bg||null; fade=.7; }
  if(r.kieu==='fx') return;
  if(r.kieu==='mota'&&typeof r.loi==='string'){ const m=r.loi.match(/^(\d{1,2})(?:h|:(\d{2})|\s*giờ)(\d{2})?\s*(sáng|trưa|chiều|tối|khuya)?[.,\s]/); if(m){ let h=+m[1]; const mm=+(m[2]||m[3]||0), b=m[4]; if((b==='chiều'||b==='tối'||(b==='khuya'&&h>=9))&&h<12) h+=12; if(h>=5&&h<=23) at2(h*60+mm); } }
  if(r.kieu==='the'){ hideDlg(); await p2Card(cardSync(p2t(r.loi))); return; }
  return show1(Object.assign({},r,{loi:p2t(r.loi),ai:p2t(r.ai)})); };
const choose1=choose;
choose=function(set,inPhone,title,face){ if(!P2.on) return choose1(set,inPhone,title,face);
  const s0=set[0]||{}; if(!title&&s0.q) title=p2t(s0.q);
  const view=set.map(r=>{ const v=Object.assign({},r,{loi:p2t(r.loi),sub:p2t(r.sub||'')}); if(r.disc&&!cond(r.disc)) v.dis=true; v._o=r; return v; });
  const p=choose1(view,inPhone,title,face).then(v=>v&&v._o?v._o:v);
  /* thời gian chọn = thời gian gốc + thời gian ĐỌC hết các lựa chọn (~20 chữ/giây), và chỉ bắt đầu đếm sau khi hộp thoại hiện xong:
     trước đây đồng hồ chạy ngay lúc câu còn đang gõ, người chơi chưa kịp đọc đã hết giờ */
  const tm0=+s0.timer||0; if(!tm0||(typeof CD!=='undefined'&&CD.gap==='tat')) return p;
  const tm=Math.round((tm0+view.reduce((a,v)=>a+String(v.loi||'').length,0)/20)*(typeof CD!=='undefined'&&CD.gap==='cham'?1.5:1));
  const d=$('dlg'); const bar=document.createElement('div'); bar.className='p2timer'; bar.style.width='100%'; d.insertBefore(bar,d.firstChild);
  const T_WAIT=700; setTimeout(()=>{ bar.style.transition='width '+tm+'s linear'; bar.style.width='0%'; },T_WAIT); const stopU=window.SFX&&SFX.urgent?SFX.urgent(tm*1000+T_WAIT):()=>{};
  return new Promise(res=>{ let over=false; const to=setTimeout(()=>{ if(over) return; over=true; stopU(); bar.remove(); const mac=s0.mac; const box=$('dCh');
      const r=mac>=0&&view[mac]?view[mac]:null; chooseFn=null; box.innerHTML=''; if(r){ toast('Hết giờ'); res(r._o); } else res({ma:'_het',loi:'',sau:''}); },tm*1000+T_WAIT);
    p.then(v=>{ stopU(); if(over) return; over=true; clearTimeout(to); bar.remove(); res(v); }); }); };
/* người không còn câu vu vơ nào được phép nói thì báo như chỗ không có việc, đừng im lặng như bấm hỏng */
/* câu vu vơ trong Phần 2: chỉ lấy câu của Phần 2 (trước đây câu của anh Lộc ở hẻm "Bánh mì vợ tui ngon nhất hẻm" lọt vào cả trong trại),
   và người nào không còn câu nào được phép nói thì báo như chỗ không có việc, đừng im lặng như bấm hỏng */
let P2RSET=null;
const idle1=idle; idle=function(k){ if(!P2.on) return idle1.apply(this,arguments);
  if(!P2RSET) P2RSET=new Set(P2ROWS.map(r=>r.ma));
  const L=T.filter(r=>P2RSET.has(r.ma)&&String(r.ma).startsWith('R_'+k+'_')&&cond(r.hien));
  if(!L.length){ if(k==='meo') return idle1.apply(this,arguments); toast('Bây giờ không có gì để làm ở đây'); return; }
  const fr=L.filter(r=>!S.said[r.ma]); const pool=fr.length?fr:L; if(!fr.length) L.forEach(r=>delete S.said[r.ma]); const r=pool[Math.floor(Math.random()*pool.length)]; S.said[r.ma]=1; return run(r.ma,r.ma); };
const runS1=runS;
runS=async function(key,opt){ if(!P2.on) return runS1(key,opt); const pre=key+'_';
  if(/^(x_|V_|kh_|noi_x)/.test(key)) Object.keys(S.ch).forEach(k=>{ if(k.startsWith(pre)) delete S.ch[k]; });
  const prev=BGNOW; try{ return await runS1(key,opt); } finally { if(BGNOW!==prev&&!SCENEBG[key]){ BGNOW=prev; fade=.5; } } };

/* ---------------- lịch trại ---------------- */
let camping=false;
const tick1=tick;
tick=async function(){ if(P2.on&&!S.ended&&!camping&&!sleeping&&P2.map==='trai'){ camping=true; try{ await p2Camp(); } finally { camping=false; busy=false; } if(S.ended) return; }
  if(P2.on&&P2.map==='trai'&&hour()>=22&&!sleeping&&!S.ended&&!camping){ toast('22:00 · tắt đèn'); await night(); return; }
  return tick1(); };
const at2=m=>{ S.min=Math.max(S.min,m); hud(); };
const putAt=(h,u)=>{ S.scene='street'; S.room=null; PL.x=at(h,u); PL.goal=null; snapNPC(); fade=.8; };
async function p2Camp(){ const d=S.day, cs=S.cs||(S.cs={}), K=x=>{ const k=d+'_'+x; if(cs[k]) return false; cs[k]=1; return true; };
  if(d<9) return;
  const h=hour();
  if(h>=6&&h<12&&d===18&&K('kp')) await runS('x_khamphong');
  if(hour()>=7&&hour()<12&&K('sa')){ await runS('x_ca_mo'); hideDlg(); BGNOW=null; await caCa(2); at2(12*60); putAt('xan',.6); toast('12:00 · giờ cơm');
    if(d===9){ if(S.nhanh==='B') await runS('x_thuynhan'); else if(S.ai_vao==='lam') await runS('x_tocu_lam'); else await runS('x_tocu_ngan'); }
    if(d===11&&S.nhanh==='B'&&(S.p1.co.bao_tam||S.p1.co.bao_phat)) await runS('x_nguoiban');
    if(d===14) await runS('x_canh5');
    if(typeof p2LenMayTram==='function') await p2LenMayTram();
    if(typeof p2MayHan==='function') p2MayHan();
    hideDlg(); hud(); save(); return; }
  if(hour()>=13&&hour()<19&&K('ch')){ if(d===18&&!hasC('x_tu')) await runS('x_tutai'); hideDlg(); BGNOW=null;
    const r=await caCa(1); if(hasF('x_canh_ngan')&&r.tinh>0) await runS('x_canhngan_ok');
    const thieu=3-CT(); if(thieu>0){ S.no=(S.no||0)+thieu*2000000; effects('+nghi:'+(6*thieu)); S.hut=(S.hut||0)+1; try{ if(window.SFX&&SFX.has('dien')) SFX.play('dien',{v:.55,delay:2.2}); }catch(e){} await runS('x_ca_thieu'); hideDlg(); if(S.hut>=3){ S.hut=0; await p2ChuongCho(); } } else { S.hut=0; effects('-nghi:3'); await runS('x_ca_du'); }
    at2(19*60); putAt('xngu',.35); toast('19:00 · được ra sân'); hideDlg();
    if(d===12&&!hasF('x_vu3')) await runS('x_vu3mo');
    if(S.nhanh==='A'&&[11,14,17].includes(d)) await p2Ngoai({11:1,14:2,17:3}[d]);
    if(d===19) await runS('x_ngay19');
    hideDlg(); hud(); save(); return; }
  if(hour()>=21&&d===13&&K('c4')){ await runS('x_canh4'); hideDlg(); }
  if(hour()>=21.5&&d===16&&K('c6')){ await runS('x_canh6'); hideDlg(); } }
async function p2Ngoai(n){ const keep=S.vai; S.vai=S.ai_vao==='ngan'?'lam':'ngan'; setME(); await runS('x_ngoai'+n); S.vai=keep; setME(); hideDlg(); }

/* ---------------- đêm và ngày mới ---------------- */
const night1=night;
night=async function(){ if(!P2.on) return night1(); if(sleeping) return; sleeping=true; closePhone();
  try{
    S.scene='room'; S.room=null; PL.x=VW*.45; PL.goal=null; S.min=Math.max(S.min,P2.map==='trai'?22*60:23*60+20); fade=1.2; hud();
    if(P2.map==='trai'&&S.hoi>=3&&S.day>=19){ await p2Rescue(); return; }
    const n=NIGHTS.find(n=>!S.co['nt_'+n.k]&&inDay(n.d,S.day)&&cond(n.c)); if(n){ setCo('nt_'+n.k); await runS(n.k); hideDlg(); }
    if(S.hoi===1&&S.day>=7&&!hasF('x_mon_xong')){ await say('mota','','Khuya rồi. Còn việc không để tới mai được.'); hideDlg(); if(S.nhanh==='A'&&!hasF('x_chot')) await runS('x_a_cainhau'); if(!S.ai_vao&&S.nhanh==='A') S.ai_vao='lam'; await runS('x_mon'); hideDlg(); }
    if(P2.map==='trai'){
      if(hasF('x_cho_xn')){ delete S.co.x_cho_xn; await runS('x_tinvao'); hideDlg(); }
      if(S.day===17&&!hasF('x_canh7_xem')){ setCo('x_canh7_xem'); await runS('x_canh7'); hideDlg(); }
      if(typeof p2NhipHem==='function') await p2NhipHem();
      if(S.day>=8&&S.day<19) await p2DiDem();
      if(S.day>=9&&S.day<19) await p2Siet();
      if(S.nghi>=100){ await runS('x_phongtoi'); hideDlg(); const p=dsCon().filter(x=>!['ngan','khang'].includes(x.id))[0]; if(p) effects('mat:'+p.id); S.nghi=55; }
      S.nghi=Math.max(0,S.nghi-1); }
    else { S.money-=30000; dayGain.tien-=30000; if(S.money<0) S.money=0; S.nghi=Math.max(0,S.nghi-2); }
    const e=ACTEND[S.hoi];
    if(e&&cond(e.c)){ await runS(e.k); hideDlg(); await actCard(S.hoi,e.ten); S.hoi++; setCo('hoi'+S.hoi); if(e.after) await e.after(); }
    else await dayCard();
    if(S.ended) return;
    S.day++; dayGain={tien:0,cc:[]}; await p2NewDay();
  } finally { sleeping=false; }
  hud(); save(); await tick(); };
/* khám phòng bất chợt ban đêm (BẢN NHÁP chờ duyệt chữ): chỉ nghe tiếng, không thấy cảnh.
   Bị nghi càng cao càng dễ bị khám; từ 70 trở lên thì có người bị lôi đi. Không quá 1 lần mỗi 2 đêm. */
async function p2Siet(){ if((S.siet_d||0)>=S.day-1) return; const pr=.12+(S.nghi||0)/250; if(Math.random()>pr) return; S.siet_d=S.day;
  const sp=(k,o)=>{ try{ window.SFX&&SFX.play(k,o); }catch(e){} };
  await say('mota','','2 giờ sáng. Đèn hành lang bật sáng trưng. Tiếng dép, tiếng đập cửa từng phòng.');
  setTimeout(()=>{ if(window.SFX&&SFX.has('dien')) sp('dien',{v:.45}); else sp('hit',{v:.35,rate:.75}); },500);
  await say('mota','','Phòng bên cạnh có tiếng ai đó kêu lên một tiếng rồi tắt ngấm. Không ai trong phòng dám ngồi dậy.');
  const can=(S.nghi||0)>=70?dsCon().filter(x=>!['ngan','khang','loc'].includes(x.id)).sort((a,b)=>(S.tin[a.id]||0)-(S.tin[b.id]||0))[0]:null;
  if(can){ sp('boom',{v:.4,rate:.8,delay:.3}); await say('mota','','Sáng ra, giường của '+can.ten+' trống trơn. Mền đã gấp sẵn.'); effects('mat:'+can.id); S.nghi=Math.max(0,S.nghi-15); }
  else { await say('mota','','Sáng ra, lính gác đứng ở cửa phòng máy lâu hơn mọi bữa. Từ giờ phải cẩn thận gấp đôi.'); S.nghi=Math.min(99,(S.nghi||0)+5); }
  hideDlg(); }
/* hụt chỉ tiêu 3 ca liền: bị nhốt chuồng chó dưới gầm cầu thang một đêm (BẢN NHÁP chờ duyệt chữ). Chỉ thấy cái chuồng trống, nghe tiếng. */
/* chuồng chó: ảnh nền vẽ bằng khung cảnh như mọi cảnh khác (trước đây là lớp phủ che mất hộp thoại → người chơi kẹt, 1/11) */
async function p2ChuongCho(){ await Promise.race([p2Img('x2-chuong-cho'),sleep(2500)]); const bg0=BGNOW; if(IMG['x2-chuong-cho']) BGNOW='x2-chuong-cho'; fade=1;
  try{ window.SFX&&SFX.play('cong_mo',{v:.6,rate:.8,delay:.4}); }catch(e){}
  await say('mota','','Hụt chỉ tiêu ba ca liền. Đêm đó Sẹo lôi {me} xuống gầm cầu thang, đẩy vô cái chuồng sắt rồi bấm ổ khóa.'.replace('{me}',ME));
  try{ window.SFX&&SFX.has('dien')&&SFX.play('dien',{v:.4}); }catch(e){}
  await say('mota','','Sàn xi măng ướt nhẹp. Cả đêm không duỗi thẳng chân được. Sáng ra mới được thả về phòng máy.');
  hideDlg(); S.nghi=Math.max(0,(S.nghi||0)-10); BGNOW=bg0; fade=.6; }
async function p2NewDay(){ const d=S.day;
  if(S.hoi===1){ S.vai=S.nhanh==='A'?(d%2===1&&d<7?'ngan':'lam'):'lam'; setME(); S.min=DAY_START; S.scene='street'; S.room=null; PL.x=S.vai==='ngan'?at('taphoa',.5):at('basau',.4); snapNPC(); fade=.9; chime();
    toast('Ngày '+d+' · '+fmtT(S.min)+(S.nhanh==='A'?' · hôm nay bạn là '+ME:'')); return; }
  S.vai=S.ai_vao||'lam'; setME();
  if(d===8){ S.min=19*60; putAt('xngu',.35); toast('Ngày 8 · 19:00 · được ra sân tới 22:00'); return; }
  S.min=6*60; S.scene='street'; S.room=null; await p2Card('NGÀY '+d+' · 5:00\nCHUÔNG CHÙA BÊN SÔNG'); S.min=7*60; putAt('xmay',.5); }
async function p2VaoTrai(){ S.vai=S.ai_vao||'lam'; setME(); await trainImgs(); p2SetMap('trai'); BGNOW=null; await runS('x_canh1'); hideDlg(); await runS('x_canh2'); hideDlg(); }

/* ---------------- đêm giải cứu ---------------- */
async function p2Rescue(){ if((S.lo||0)>=75||S.nghi>=100){ await runS('x_ban_dung'); hideDlg(); return p2Ending('ban_dung'); }
  if(ocl()>=3){ await runS('x_cuu_loa'); hideDlg(); }
  await runS('x_cuu_mo'); hideDlg();
  const raidOK=hasF('x_tin_3g')&&hasF('x_vinh')&&(S.nhanh==='A'||hasF('x_tin_song')||hasF('x_goi_ok'));
  let raid=raidOK?180+Math.floor((S.lo||0)/25)*15:9999; const xe=(S.lo||0)>=25?270:null;
  if(hasF('x_loa_chay')&&raid<9999) raid=Math.max(60,raid-20);   /* ghi âm giọng thật làm lính gác rối, công an vào sớm 20 phút */
  const groups=dsCon().filter(p=>!(S.nhanh==='A'&&S.ai_vao==='ngan'&&p.id==='ngan')).map(p=>{ const t=S.tin[p.id]||0; return {id:p.id,ten:p.ten,sp:p.id,can:t>=2?0:t===1?1:2,after:p.id==='ngan'&&t<4?240:0}; });
  const ex=[{ten:'Cổng chính',f:0,x:60,cost:hasF('x_ghe')?5:20}]; if(hasF('x_cua')) ex.push({ten:'Cửa sau',f:0,x:905,cost:hasF('x_ghe')?0:15}); if(hasF('x_rao')) ex.push({ten:'Rào sau bếp',f:0,x:740,cost:hasF('x_ghe')?0:15});
  const res=await sneak({mode:'cuu',groups,exits:ex,raid,xe,end:300,speed:1,siet:false});
  const outIds=res.out.map(g=>g.id), con=groups.filter(g=>!outIds.includes(g.id));
  S.p2ra=outIds; S.p2tong=groups.length; S.p2con=con.map(g=>g.id);
  let olai=null; if(con.length&&res.out.length){ const c=[]; if(S.nhanh==='A'&&S.ai_vao==='ngan') c.push(['Ngân',9]); if(con.some(g=>g.id==='ngan')&&(S.tin.ngan||0)>=3) c.push(['Ngân',S.tin.ngan]); if(con.some(g=>g.id==='khang')&&(S.tin.khang||0)>=3) c.push(['Khang',S.tin.khang]); if((S.tin.bay||0)>=3) c.push(['Chị Bảy',S.tin.bay]); c.sort((a,b)=>b[1]-a[1]); olai=c[0]?c[0][0]:null; }
  S.p2olai=olai; const nganRa=S.nhanh==='A'?true:outIds.includes('ngan');
  const k=!res.out.length?'mot_minh':(!con.length&&nganRa&&ocl()>=4&&S.ds.every(p=>p.con)&&hasF('x_ghe'))?'ca_to':(!con.length&&!hasF('x_ghe'))?'boi_song':'o_lai';  /* ra hết mà không có ghe: cả tổ phải bơi */  /* kết Cả tổ có chiếc ghe cập bờ → phải đã thuê ghe */
  if(olai==='Chị Bảy'&&hasF('x_bay_lat')){ await runS('x_bay_chan'); hideDlg(); }
  if(res.out.length&&ocl()>=4) await p2KetLieu();
  return p2Ending(k); }

/* cú bấm kết liễu ngay trên ghe giữa sông (ĐÃ DUYỆT): điện thoại 2% pin, có 1 vạch sóng, bà Mỹ gọi tới, người chơi tự bấm gửi chứng cứ cho Vinh */
function p2KetLieu(){ return new Promise(res=>{
  if(!$('p2klcss')){ const st=document.createElement('style'); st.id='p2klcss'; st.textContent=`
#p2kl{position:fixed;inset:0;z-index:80;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;padding:18px 14px;box-sizing:border-box;background:linear-gradient(rgba(4,6,10,.6),rgba(4,6,10,.88)),#05070b url(img2/x2-bo-song-dem.webp) center/cover;opacity:0;transition:opacity .6s;color:#efe8d8}
#p2kl .cap{max-width:520px;margin:0;text-align:center;font:italic 400 17px/1.5 Newsreader,Georgia,serif;color:#d6cfbf}
#p2kl .tel{position:relative;width:min(330px,88vw);height:min(600px,72vh);border-radius:40px;border:10px solid #17181c;background:#0b0c10;box-shadow:0 30px 70px rgba(0,0,0,.7),0 0 0 1px #2a2b31;overflow:hidden;display:flex;flex-direction:column;font-family:"Be Vietnam Pro",sans-serif;animation:p2klin .5s ease-out}
@keyframes p2klin{from{transform:translateY(40px) scale(.96);opacity:0}}
#p2kl .tel.ring{animation:p2klin .5s ease-out,p2klrung .5s 1s infinite}
@keyframes p2klrung{0%,100%{transform:rotate(0)}20%{transform:rotate(-1.4deg)}40%{transform:rotate(1.4deg)}60%{transform:rotate(-.8deg)}}
#p2kl .sb{display:flex;justify-content:space-between;align-items:center;padding:10px 18px 6px;font:600 12px/1 "Be Vietnam Pro",sans-serif;color:#cfd3dc}
#p2kl .sb .bat{color:#ff5a4f}#p2kl .sb .bat i{display:inline-block;width:20px;height:9px;border:1.5px solid #ff5a4f;border-radius:2px;margin-left:4px;vertical-align:-1px;position:relative}#p2kl .sb .bat i::after{content:"";position:absolute;left:1px;top:1px;bottom:1px;width:2px;background:#ff5a4f}
#p2kl .call{flex:1;display:flex;flex-direction:column;align-items:center;padding:34px 22px 26px;text-align:center;background:radial-gradient(circle at 50% 18%,#3a1b1b,#0b0c10 70%)}
#p2kl .call .who{font:600 22px/1.25 "Be Vietnam Pro",sans-serif;margin-top:16px}
#p2kl .call .num{font:400 13px "Be Vietnam Pro",sans-serif;color:#b9b3a6;margin-top:4px;letter-spacing:.04em}
#p2kl .call .av{width:96px;height:96px;border-radius:50%;background:#26272d center/cover;box-shadow:0 0 0 6px rgba(226,69,60,.18),0 0 0 14px rgba(226,69,60,.08);animation:p2klpulse 1.2s infinite}
@keyframes p2klpulse{50%{box-shadow:0 0 0 10px rgba(226,69,60,.25),0 0 0 22px rgba(226,69,60,.06)}}
#p2kl .call q{display:block;margin-top:auto;font:italic 400 15.5px/1.5 Newsreader,Georgia,serif;color:#e9e1cf;quotes:none;padding:12px 14px;background:rgba(255,255,255,.05);border-radius:14px}
#p2kl .acts{display:flex;justify-content:center;gap:56px;padding:18px 0 4px;margin-top:16px}
#p2kl .acts button{width:64px;height:64px;border-radius:50%;border:0;cursor:pointer;display:grid;place-items:center;color:#fff;font:600 11px "Be Vietnam Pro",sans-serif}
#p2kl .acts .no{background:#e2453c;box-shadow:0 8px 20px rgba(226,69,60,.45)}#p2kl .acts .no svg{width:28px;height:28px;fill:#fff;transform:rotate(135deg)}
#p2kl .acts .yes{background:#2fa35a;box-shadow:0 8px 20px rgba(47,163,90,.45)}#p2kl .acts .yes svg{width:28px;height:28px;fill:#fff}
#p2kl .lbl{display:flex;justify-content:center;gap:56px;font:500 12px "Be Vietnam Pro",sans-serif;color:#cfc8b8}#p2kl .lbl span{width:64px;text-align:center}
#p2kl .chat{flex:1;display:flex;flex-direction:column;min-height:0}
#p2kl .chat .hd{display:flex;align-items:center;gap:10px;padding:8px 14px 10px;border-bottom:1px solid #22232a}
#p2kl .chat .hd i{width:34px;height:34px;border-radius:50%;background:#1f5fbf;display:grid;place-items:center;font:700 13px "Be Vietnam Pro";font-style:normal}
#p2kl .chat .hd b{font:600 15px "Be Vietnam Pro"}
#p2kl .chat .ls{flex:1;overflow:auto;padding:12px;display:flex;flex-direction:column;gap:7px}
#p2kl .chat .f{align-self:flex-end;max-width:86%;display:flex;gap:9px;align-items:center;padding:9px 11px;border-radius:12px 12px 4px 12px;background:#1d3a2a;font:400 13px/1.35 "Be Vietnam Pro";color:#e6efe6}
#p2kl .chat .f svg{flex:none;width:20px;height:20px;fill:none;stroke:#8fd0a2;stroke-width:1.8}
#p2kl .chat .f.wait{opacity:.45}
#p2kl .chat .ft{padding:12px 14px 16px;border-top:1px solid #22232a}
#p2kl .chat .send{width:100%;padding:14px;border-radius:12px;border:0;background:#e2453c;color:#fff;font:700 14px/1.3 "Be Vietnam Pro",sans-serif;cursor:pointer;box-shadow:0 8px 22px rgba(226,69,60,.4)}
#p2kl .chat .send:disabled{opacity:.5;cursor:default}
#p2kl .chat .bar{height:6px;border-radius:3px;background:#232a3d;overflow:hidden;margin-top:10px;visibility:hidden}#p2kl .chat .bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,#f0b25c,#e2645c)}
#p2kl .chat .tx{font:500 12.5px "Be Vietnam Pro",sans-serif;color:#b9b3a6;min-height:16px;margin-top:8px;text-align:center}
#p2kl .oncall{flex:1;display:flex;flex-direction:column;min-height:0;background:radial-gradient(circle at 50% 0%,#2a1616,#0b0c10 60%)}
#p2kl .oncall .hd{display:flex;align-items:center;gap:10px;padding:8px 14px 10px;border-bottom:1px solid #22232a}
#p2kl .oncall .hd .av{width:38px;height:38px;border-radius:50%;background:#26272d center/cover;flex:none}
#p2kl .oncall .hd b{display:block;font:600 15px "Be Vietnam Pro"}#p2kl .oncall .hd small{font:500 12px "Be Vietnam Pro";color:#9fd3a8}
#p2kl .oncall .rec{margin-left:auto;font:700 11px "Be Vietnam Pro";color:#ff5a4f;letter-spacing:.06em;visibility:hidden;animation:p2klrec 1s infinite}
@keyframes p2klrec{50%{opacity:.35}}
#p2kl .oncall .ls{flex:1;overflow:auto;padding:12px;display:flex;flex-direction:column;gap:8px}
#p2kl .oncall .m{max-width:88%;padding:9px 12px;border-radius:14px;font:400 14px/1.45 "Be Vietnam Pro";animation:p2klin .3s ease-out}
#p2kl .oncall .m.her{align-self:flex-start;background:#2a2c33;color:#efe8d8;border-bottom-left-radius:4px}
#p2kl .oncall .m.me{align-self:flex-end;background:#1d3a2a;color:#e6efe6;border-bottom-right-radius:4px}
#p2kl .oncall .m.dots{color:#9aa0aa;letter-spacing:.2em}
#p2kl .oncall .ch{padding:10px 12px 14px;border-top:1px solid #22232a;display:flex;flex-direction:column;gap:7px}
#p2kl .oncall .ch button{text-align:left;padding:10px 12px;border-radius:12px;border:1px solid #3a3d46;background:#16171c;color:#efe8d8;font:500 13.5px/1.35 "Be Vietnam Pro";cursor:pointer}
#p2kl .oncall .ch button.end{background:#e2453c;border-color:#e2453c;color:#fff;text-align:center;font-weight:700}
#p2kl .sb .bat.low{animation:p2klrec .6s infinite}
#p2kl .off{position:absolute;inset:0;background:#000;opacity:0;transition:opacity .5s;pointer-events:none}
@media (max-height:640px){#p2kl .cap{font-size:14.5px}#p2kl .tel{height:min(520px,76vh)}#p2kl .call{padding:18px 16px 14px}#p2kl .call .av{width:70px;height:70px}}
`; document.head.appendChild(st); }
  const ICO_PH='<svg viewBox="0 0 24 24"><path d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/></svg>';
  const ICO_F='<svg viewBox="0 0 24 24"><path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 12h7M9 16h5"/></svg>';
  const sb='<div class="sb"><span>VIETTEL 4G ▂</span><span class="bat">2%<i></i></span></div>';
  const ev=OCL.filter(k=>S.cc&&S.cc[k]).slice(0,5).map(k=>{ const r=T[IDX['CC_'+k]]; return r?r.ai:k; });
  const el=document.createElement('div'); el.id='p2kl';
  el.innerHTML='<p class="cap">Chiếc ghe đuôi tôm của chú Thoại vừa vượt qua cồn cát giữa sông. Màn hình chiếc điện thoại nứt toác trong tay '+esc(ME)+' chỉ còn đúng 2% pin — nhưng góc trên vừa nhảy lên 1 vạch sóng "VIETTEL 4G".</p>'+
    '<div class="tel ring">'+sb+'<div class="call"><div class="av" style="background-image:url('+(typeof faceFor==='function'?faceFor('Bà Mỹ'):'')+')"></div><div class="who">Bà Trần Thị Mỹ</div><div class="num">SỐ CỐ ĐỊNH SÀI GÒN · ĐANG GỌI...</div>'+
    '<q>"Đứa nào đang cầm máy? Đưa cuốn sổ chỉ tiêu đây, tao chuyển liền 500 triệu vô tài khoản cho tụi bây làm lại cuộc đời!"</q>'+
    '<div class="acts"><button type="button" class="no" id="p2klNo" aria-label="Gạt tắt cuộc gọi">'+ICO_PH+'</button><button type="button" class="yes" id="p2klYes" aria-label="Nghe máy">'+ICO_PH+'</button></div><div class="lbl"><span>Gạt tắt</span><span>Nghe</span></div></div><div class="off"></div></div>';
  document.body.appendChild(el); requestAnimationFrame(()=>{ el.style.opacity=1; });
  let rs=null; const ringOnce=()=>{ try{ if(window.SFX&&SFX.has('chuong')){ rs=SFX.play('chuong',{v:.8}); SFX.play('rung',{v:.35}); } else if(window.SFX) SFX.play('rung',{v:.55}); else { tone(880,.12,.03); tone(660,.12,.03,'sine',.15); } }catch(e){} };
  ringOnce(); const ring=setInterval(ringOnce,window.SFX&&SFX.has('chuong')?10000:1300);
  const tel=el.querySelector('.tel'); let ghiam=false, lowBat=false;
  const stopRing=()=>{ clearInterval(ring); try{ rs&&rs.stop&&rs.stop(); }catch(e){} tel.classList.remove('ring'); };
  $('p2klNo').onclick=()=>{ stopRing(); try{ tone(220,.15,.03,'square'); }catch(e){} goChat(); };
  /* bắt máy: nói qua lại vài câu với bà Mỹ (mỗi câu tốn pin), có thể bật ghi âm để có thêm chứng cứ */
  $('p2klYes').onclick=()=>{ stopRing(); try{ tone(660,.08,.03); }catch(e){}
    const face=typeof faceFor==='function'?faceFor('Bà Mỹ'):'';
    tel.innerHTML=sb+'<div class="oncall"><div class="hd"><div class="av" style="background-image:url('+face+')"></div><div><b>Bà Trần Thị Mỹ</b><small id="p2klT">00:00</small></div><span class="rec" id="p2klRec">● GHI ÂM</span></div><div class="ls" id="p2klLs"></div><div class="ch" id="p2klCh"></div></div><div class="off"></div>';
    const ls=$('p2klLs'), ch=$('p2klCh'), bat=tel.querySelector('.bat'); let sec=0, turns=0; const clk=setInterval(()=>{ sec++; const t=$('p2klT'); if(t) t.textContent='00:'+String(sec).padStart(2,'0'); },1000);
    const add=(who,t)=>{ const d=document.createElement('div'); d.className='m '+who; d.textContent=t; ls.appendChild(d); ls.scrollTop=ls.scrollHeight; return d; };
    const her=t=>new Promise(r=>{ const d=add('her dots','• • •'); setTimeout(()=>{ d.className='m her'; d.textContent=t; ls.scrollTop=ls.scrollHeight; r(); },900); });
    const OPT=[
      {k:'tien',t:'"Bà nghĩ tiền mua được hết hả?"',a:'Tao đâu có mua tụi bây. Tao mua cái mạng thằng con tao. Năm trăm triệu, cầm rồi quên hết đi.'},
      {k:'rec',t:'Bật ghi âm, hỏi: "Bà làm vậy là vì ông Tú hả?"',a:'Thằng Tú dính nợ tụi chủ sòng bên đó từ vụ bể sàn vàng. Không có tao đứng ra gom người, gom tiền trả thay thì nó nằm dưới sông lâu rồi. Tụi bây phá cái này là giết con tao đó, nghe chưa!'}];
    const used={};
    let hang=()=>{ clearInterval(clk); try{ tone(220,.15,.03,'square'); }catch(e){} setTimeout(goChat,350); };
    const menu=()=>{ ch.innerHTML=''; const left=OPT.filter(o=>!used[o.k]);
      if(turns<2) left.forEach(o=>{ const b=document.createElement('button'); b.type='button'; b.textContent=o.t; b.onclick=async()=>{ try{ vo&&vo.stop&&vo.stop(); }catch(e){} used[o.k]=1; turns++; ch.innerHTML='';
        if(o.k==='rec'){ ghiam=true; $('p2klRec').style.visibility='visible'; try{ tone(1200,.06,.02); }catch(e){} }
        add('me',o.t.replace(/^Bật ghi âm, hỏi: /,'')); await her(o.a);
        lowBat=true; bat.firstChild.textContent='1%'; bat.classList.add('low'); menu(); }; ch.appendChild(b); });
      const e=document.createElement('button'); e.type='button'; e.className='end'; e.textContent=turns>=2?'Pin 1% · Cúp máy, gửi chứng cứ ngay':'Cúp máy'; e.onclick=hang; ch.appendChild(e); };
    /* câu đầu có giọng thật của bà Mỹ (lọc qua kiểu loa điện thoại) */
    let vo=null; try{ if(window.SFX&&SFX.has('v_my')) vo=SFX.play('v_my',{v:1,delay:.3}); }catch(e){}
    const first='Đứa nào đang cầm máy? Đưa cuốn sổ chỉ tiêu đây, tao chuyển liền 500 triệu vô tài khoản cho tụi bây làm lại cuộc đời!';
    if(vo){ add('her',first); setTimeout(menu,6000); } else her(first).then(menu);
    const h0=hang; hang=()=>{ try{ vo&&vo.stop&&vo.stop(); }catch(e){} h0(); }; };
  function goChat(){ if(ghiam){ ev.push('Ghi âm cuộc gọi của bà Mỹ'); try{ setCo('x_ghiam_my'); }catch(e){} }
    tel.innerHTML=sb+'<div class="chat"><div class="hd"><i>VN</i><b>Đại úy Vinh</b></div><div class="ls">'+ev.map(t=>'<div class="f">'+ICO_F+'<span>'+esc(t)+'</span></div>').join('')+'</div>'+
      '<div class="ft"><button type="button" class="send" id="p2klGo">Gửi toàn bộ '+ev.length+' chứng cứ cho đại úy Vinh</button><div class="bar"><i></i></div><div class="tx"></div></div></div><div class="off"></div>';
    if(lowBat){ const bt=tel.querySelector('.bat'); bt.firstChild.textContent='1%'; bt.classList.add('low'); }
    $('p2klGo').onclick=()=>{ const b=$('p2klGo'); b.disabled=true; const bar=tel.querySelector('.bar'), f=bar.firstChild, tx=tel.querySelector('.tx'); bar.style.visibility='visible'; tx.textContent=lowBat?'Đang gửi · pin 1%…':'Đang gửi · pin 2%…'; let w=0;
      const iv=setInterval(()=>{ w+=3.2; f.style.width=Math.min(100,w)+'%'; if(w>=70) tx.textContent='Pin 1%…'; if(w>=100){ clearInterval(iv); tx.textContent='Đã gửi. Máy sập nguồn.'; try{ if(window.SFX&&SFX.has('boom')) SFX.play('boom',{v:.9,delay:.6}); else tone(110,1.2,.05,'sine'); }catch(e){}
        setTimeout(()=>{ tel.querySelector('.off').style.opacity=1; },700); setTimeout(()=>{ el.style.opacity=0; setTimeout(()=>{ el.remove(); res(); },700); },1700); } },60); }; } }); }
/* ---------------- kết ---------------- */
/* mồi cho Phần 3 khi bà Mỹ bị bắt (BẢN NHÁP chờ duyệt) */
const P3HOOK='Cùng buổi sáng đó, chiếc điện thoại của bà Mỹ nằm trong túi niêm phong trên bàn đại úy Vinh bỗng rung lên. Số lạ, đầu +95. Tin nhắn chỉ có một dòng: "Má vô trong rồi. Nợ của thằng Tú, giờ ai trả?"';
async function p2Ending(k){ S.ended=k; save(); const ra=(S.p2ra||[]).map(id=>((S.ds||[]).find(p=>p.id===id)||{}).ten||id); const L=[]; const my=hasC('suy_x_my')||ocl()>=4;
  const dsr=ra.join(', ');
  if(k==='ca_to'){ L.push('5 giờ sáng. Tiếng chuông chùa bên sông ngân dài trong sương. Chiếc ghe cuối cùng tắt máy, cập vào bãi lau bờ bên này.','Trên bờ đê sát biên giới, xe của Hương đã nổ máy chờ sẵn. Không ai nói nổi câu nào, chỉ lặng lẽ chuyền tay nhau mấy chai nước suối với gói xôi còn ấm.','Bước được lên bờ sáng hôm đó có đủ mặt: '+dsr+'.');
    if(my) L.push('Ba ngày sau, căn biệt thự ở Quận 7 sáng đèn từ tinh mơ. Bà Trần Thị Mỹ bị đọc lệnh bắt giữ ngay bên bàn trà sáng, khi cuốn sổ chỉ tiêu đóng mộc Phát Đạt TN đã nằm trên bàn đại úy Vinh.');
    if(my) L.push(P3HOOK);
    L.push('Một chiều cuối năm ở hẻm 47. Tạp hóa cô Thoa kê thêm hai cái bàn nhựa ra tận mí hẻm. Lần đầu tiên sau gần hai năm, mâm cơm chiều dọn ra đủ chén đũa.','Con mèo mun nằm phơi nắng trên bậc thềm, lim dim nghe tiếng radio cải lương bên tiệm chú Tám vọng qua.'); }
  else if(k==='o_lai'){ const o=S.p2olai; L.push('5 giờ sáng. Tiếng chuông chùa vọng qua mặt sông mờ sương. Chiếc ghe của ông Thoại buộc phải tháo dây rời bến trước khi đèn pha quét tới.','Những người kịp bước lên bờ bên này: '+(dsr||'không ai')+'.');
    if(o==='Chị Bảy'&&hasF('x_bay_lat')){ L.push('Cánh cửa sắt sau bếp khép chặt bên kia sông. Người phụ nữ từng mất tiệm uốn tóc ở đầu đường Fan Xích Vô ba năm trước đã chọn đứng lại ở hành lang cuối cùng để giữ đường máu cho cả tổ rời bến.','Ở đầu hẻm 47, chiếc radio cũ trong tiệm hớt tóc chú Tám chiều nào cũng mở bản cải lương \'Tình anh bán chiếu\', nhưng người hàng xóm sát vách năm xưa vẫn chưa một lần quay về.'); }
    else if(o||(S.p2con||[]).length){ L.push('Cánh cổng sắt bên kia sông khép lại. Có người đã chọn đứng lại ở hành lang cuối cùng để chiếc ghe kịp rời bến.'); if(o==='Ngân') L.push('Ở đầu hẻm 47, tối nào cô Thoa cũng lặng lẽ cắm sạc chiếc điện thoại ốp mèo đen, chờ một cuộc gọi lúc 2 giờ sáng.'); }
    else if((S.ds||[]).some(p=>!p.con)) L.push('Không ai bị bỏ lại đêm đó. Nhưng '+S.ds.filter(p=>!p.con).map(p=>p.ten).join(', ')+' đã bị chuyển đi từ trước. Trên danh sách của Hương, mấy cái tên đó vẫn còn để trống.');
    else if(!my) L.push('Cả tổ đều qua được sông, nhưng trong tập hồ sơ gửi cho đại úy Vinh vẫn khuyết cái tên của kẻ cầm tiền đứng trên cùng.');
    if(my){ L.push('Bà Trần Thị Mỹ được mời lên làm việc ngay trong tuần.'); L.push(P3HOOK); }
    else L.push('Trong căn biệt thự ở Quận 7, người đàn bà sáu mươi tuổi đặt tách trà nóng xuống bàn, bấm số gọi đi: "Bến dưới Xi-ha động rồi. Đám còn lại bên đó, tối thứ Sáu chuyển thẳng qua bên Miến cho má."'); }
  else if(k==='boi_song'){ const ppl=(S.p2ra||[]).map(id=>(S.ds||[]).find(p=>p.id===id)).filter(Boolean); const yeu=ppl.find(p=>p.id==='hue')||ppl.slice().sort((a,b)=>(S.tin[a.id]||0)-(S.tin[b.id]||0))[0];
    L.push('Không có ghe. Sau lưng là tiếng còi hú và đèn pha quét loang loáng, trước mặt là dòng sông đục ngầu đang lên con nước.');
    L.push(ME+' cột sợi dây dù vô cổ tay từng người, nối thành một hàng dài, rồi bước xuống trước.');
    L.push('Nước lạnh thấu xương. Tới giữa dòng, sợi dây giật mạnh một cái, rồi chùng hẳn xuống.');
    L.push('Gần sáng, cả tổ bò lên được bãi lau bờ bên này. Đếm đi đếm lại, thiếu một người.');
    if(yeu) L.push('Ba ngày sau, ghe cá vớt được '+yeu.ten+' ở khúc sông phía dưới, còn thở thoi thóp. Người ta đưa vô bệnh viện huyện. Lúc tỉnh dậy, câu đầu tiên là hỏi mấy đứa nhỏ về tới nhà chưa.');
    if(my){ L.push('Ba ngày sau, căn biệt thự ở Quận 7 sáng đèn từ tinh mơ. Bà Trần Thị Mỹ bị đọc lệnh bắt giữ ngay bên bàn trà sáng.'); L.push(P3HOOK); }
    else L.push('Trong căn biệt thự ở Quận 7, người đàn bà sáu mươi tuổi đặt tách trà nóng xuống bàn, bấm số gọi đi: "Tụi nó bơi qua được rồi hả? Dọn sạch bến dưới Xi-ha đi."'); }
  else if(k==='mot_minh'){ L.push('5 giờ sáng. Tiếng chuông chùa đổ hồi bên kia sông. Chỉ một mình '+ME+' lội được qua bãi nước cạn sang bờ bên này, ướt sũng và trắng tay.','Không một ai trong tổ thoát được ra ngoài đêm đó.','Một tuần sau, khi lực lượng chức năng tiếp cận được hiện trường thì khu phức hợp đã dọn trống trơn từ lâu. Không còn nhân chứng, không còn dấu vết.');
    if(ME==='Lâm') L.push('Lâm trả lại căn phòng số 3. Lúc xách giỏ đi ngang tiệm tạp hóa đầu hẻm, thấy cô Thoa vẫn ngồi lau từng chai nước suối, anh cúi mặt bước nhanh qua.');
    if(!my) L.push('Trong căn biệt thự ở Quận 7, người đàn bà sáu mươi tuổi đặt tách trà nóng xuống bàn, bấm số gọi đi: "Dọn sạch trại dưới Xi-ha đi. Tối thứ Sáu lùa hết tụi nó qua bên Miến cho má."'); }
  else { L.push('11 giờ đêm, bốn tiếng trước giờ hẹn. Kế hoạch đã bị lộ từ trước. Toàn bộ các phòng máy bị lùa lên thùng xe tải khóa kín, lao đi trong màn mưa.','Ba tuần sau, chiếc điện thoại ốp mèo đen trong ngăn kéo tạp hóa cô Thoa bất ngờ sáng đèn lúc 2 giờ sáng. Một tin nhắn quảng cáo không dấu gửi về.','Ghép chữ cái đầu của bốn câu ngắn ngủn, hiện ra bốn chữ: M - I - E - N.');
    if(!my) L.push('Trong căn biệt thự ở Quận 7, người đàn bà sáu mươi tuổi đặt tách trà nóng xuống bàn, bấm số gọi đi: "Xe qua tới bên Miến rồi hả? Từ giờ khỏi sợ đứa nào nhắn về nữa."'); }
  /* giá phải trả của ca nhắn tin (ĐÃ DUYỆT): tên những người bị mình chốt cọc */
  { const nan=[...new Set((S.so||[]).map(x=>String(x).split(' · ')[0]))]; let t;
    if(nan.length) t=((k==='ca_to'||k==='o_lai')?'Đêm đó bạn đưa được các thành viên trong tổ vượt sông về nhà. Nhưng t':'T')+'rong những ngày ngồi trước màn hình phòng máy, để đổi lấy sự an toàn cho kế hoạch, chính ngón tay bạn đã bấm chốt cọc của '+nan.length+' người ở quê nhà: '+nan.join(', ')+'.';
    else t='Suốt những ngày ngồi trong phòng máy dưới roi điện của Sẹo, bạn đã chấp nhận chịu phạt chứ không bấm lừa bất kỳ một người đồng bào nào. Bạn trở về Hẻm 47 với hai bàn tay trắng trong.';
    if(k!=='ban_dung'&&L.length>1) L.splice(L.length-1,0,t); }
  let got=[]; try{ got=JSON.parse(lsGet('tgl_chuong2_ket')||'[]'); }catch(e){} if(!got.includes(k)) got.push(k); lsSet('tgl_chuong2_ket',JSON.stringify(got));
  hideDlg(); closePhone(); const name=(ENDS[k]||['',''])[1];
  const EB={ca_to:P2REAL['x2-tiec-taphoa']?'x2-tiec-taphoa':'x2-cua-khau-sang',o_lai:'x2-ket-o-lai',mot_minh:'x2-ket-mot-minh',ban_dung:'x2-ket-ban-dung',boi_song:P2REAL['x2-ket-boi-song']?'x2-ket-boi-song':'x2-bo-song-dem'}[k];
  /* 1. chữ chạy, cùng kiểu kết Phần 1 */
  if(window.trUIfull){ for(let i=0;i<L.length;i++) L[i]=trUIfull(L[i]); }  /* bản tiếng Anh: dịch trước khi chữ chạy */
  await new Promise(res=>{ let el=$('typeEnd'); if(!el){ el=document.createElement('div'); el.id='typeEnd'; document.body.appendChild(el); }
    el.innerHTML='<div id="teQ7" style="position:absolute;inset:0;opacity:0;transition:opacity 1.2s;pointer-events:none;background:linear-gradient(rgba(5,6,10,.55),rgba(5,6,10,.85)),url(img2/x2-bietthu-q7.webp) center/cover"></div><div class="te-in" style="position:relative"><div class="te-tx" id="teTx"></div><div class="te-c2" id="teC2" hidden><div class="te-k">HẺM 47 · PHẦN 2 · XỨ LẠ</div><div class="te-n">'+esc(name)+'</div><div class="te-s">Kết '+got.length+'/5</div></div><button type="button" class="te-go" id="teGo" hidden>Xem tổng kết</button><div class="te-skip" id="teSkip">bấm để tua nhanh</div></div>';
    el.style.background='linear-gradient(rgba(5,6,10,.78),rgba(5,6,10,.92)),#05060a '+(EB&&P2REAL[EB]?'url(img2/'+EB+'.webp) center/cover':'');
    el.hidden=false; const tx=$('teTx'); let skip=false, li=0, ci=0, cur=null, done=false;
    const fin=()=>{ if(done) return; done=true; { const q=$('teQ7'); if(q) q.style.opacity=0; } tx.innerHTML=L.map((l,i)=>'<p'+(i===L.length-1?' class="te-last"':'')+'>'+esc(l)+'</p>').join(''); $('teSkip').hidden=true; setTimeout(()=>{ $('teC2').hidden=false; tone(110,1.6,.05,'sine'); tone(165,1.6,.03,'sine',.05); setTimeout(()=>{ $('teGo').hidden=false; },1400); },700); };
    el.onclick=e=>{ if(e.target.id==='teGo'){ el.hidden=true; res(); return; } if(!done) skip=true; };
    const step=()=>{ if(skip||li>=L.length){ fin(); return; }
      if(ci===0){ const q=$('teQ7'); if(q) q.style.opacity=/biệt thự ở Quận 7|District 7/.test(L[li])?1:0; cur=document.createElement('p'); if(li===L.length-1) cur.className='te-last'; tx.appendChild(cur); }
      const line=L[li]; ci+=2; cur.textContent=line.slice(0,ci); if(ci>=line.length){ cur.textContent=line; li++; ci=0; setTimeout(step,650); } else setTimeout(step,22); };
    step(); });
  /* 1b. lời khai của người ra được, rồi tờ báo HẺM 47 NEWS (tin thật có nguồn → lật trang là vụ trong game) */
  await p2Khai(); await p2Bao(k); await p2AnhSong(k);
  /* 2. thẻ tổng kết trên màn bìa, cùng khung kết Phần 1 */
  S.scene='place'; S.place=null; BGNOW=(EB&&P2REAL[EB])?EB:BGNOW; fade=1; hud();
  const c=$('cover'); c.hidden=false; c.classList.add('solid');
  const so=S.so||[], mat=(S.ds||[]).filter(p=>!p.con).map(p=>p.ten);
  const allK=['ca_to','boi_song','o_lai','mot_minh','ban_dung'];
  c.querySelector('.in').innerHTML='<div class="sub">KẾT THÚC PHẦN 2 · NGÀY '+S.day+'</div><h2 class="cl">'+esc(name)+'</h2>'+
    '<div class="sum"><div><b>'+(S.p2ra||[]).length+'/'+(S.p2tong||0)+'</b><span>người ra tới sông</span></div><div><b>'+ocl()+'/5</b><span>chứng cứ Ông Chủ Lò</span></div><div><b>'+so.length+'</b><span>người mất tiền vì tin bạn gửi</span></div></div>'+
    '<p class="sub">'+allK.map(x=>got.includes(x)?esc(ENDS[x][1]):'???').join(' · ')+'</p>'+
    (so.length?'<details class="p2sod"><summary>Sổ nạn nhân · '+so.length+' người</summary><ol>'+so.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ol></details>':'')+
    (mat.length?'<details class="p2sod"><summary>Bị chuyển đi · '+mat.length+' người</summary><ol>'+mat.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ol></details>':'')+
    '<p class="p2">Trò chơi lấy cảm hứng từ các vụ việc thực tế đã được cơ quan chức năng cảnh báo. Khi nhận được lời dụ dỗ đi làm \'việc nhẹ lương cao\' ở nước ngoài, hãy liên hệ ngay với cơ quan công an gần nhất để được hỗ trợ.</p>'+
    '<div class="row"><button class="btn" type="button" id="p2Again">Chơi lại Phần 2</button><button class="btn ghost" type="button" id="p2Home">Về màn đầu</button><button class="btn alt" type="button" id="p2Kq">Khoe kết quả</button><button class="btn alt" type="button" id="p2Tt">Thành tựu</button></div>';
  if(!$('p2sodCss')){ const st=document.createElement('style'); st.id='p2sodCss'; st.textContent='.p2sod{max-width:520px;margin:10px auto;text-align:left;color:#b9b3a6;font-size:14px}.p2sod summary{cursor:pointer;color:#efe8d8;padding:6px 0}.p2sod ol{margin:6px 0 0 18px;line-height:1.7}'; document.head.appendChild(st); }
  $('p2Again').onclick=()=>{ lsDel(P2SAVE); location.reload(); }; $('p2Home').onclick=()=>location.reload(); $('p2Kq').onclick=()=>kqOpen(k); $('p2Tt').onclick=()=>ttOpen(); ttCheck2(); }
/* ===== sau kết Phần 2 (BẢN NHÁP chờ duyệt chữ) =====
   1) Lời khai: mỗi người ra được có ảnh thì hiện một thẻ ảnh + lời kể ngắn
   2) Tờ "HẺM 47 NEWS": trang 1 là tin thật có nguồn ở góc dưới, lật trang là bài về vụ trong game */
const P2KHAI={
  nhi:['Nhi','Em tưởng qua đó ngồi gõ chữ bán hàng. Tháng đầu hụt chỉ tiêu, tụi nó bắt đứng ngoài nắng tới xỉu. Em không dám kể với má, sợ má lo.'],
  toan:['Toàn','Nợ app có mười hai triệu. Qua bển người ta nói em nợ thêm tiền vé, tiền ăn, tiền chỗ ngủ, thành hai trăm triệu. Đêm nào cũng nghe tên mình trong danh sách bán qua bãi khác.'],
  ti:['Tí','Đêm nào em cũng nằm nghe tiếng nước ngoài sông, tính bơi về. Có đứa bơi rồi. Sáng ra không thấy nó nữa.'],
  hue:['Chị Huệ','Thằng con tui mới mười tám. Tụi nó gọi về đòi người, tui đi thay. Tui già rồi, chịu đòn được. Chỉ sợ không còn ai biết đường về mà nhắn cho nó.']};

function p2Khai(){ return new Promise(res=>{ const L=(S.p2ra||[]).filter(id=>P2KHAI[id]); if(!L.length){ res(); return; }
  /* kiểu đoạn phim tư liệu cũ: hạt nhiễu, khung giật nhẹ, chớp sáng, dải đen trên dưới, mã thời gian */
  if(!$('p2khaiCss')){ const st=document.createElement('style'); st.id='p2khaiCss'; st.textContent=`
#p2khai{position:fixed;inset:0;z-index:85;background:#000;color:#efe8d8;overflow:hidden;opacity:0;transition:opacity .6s;cursor:pointer}
#p2khai .fr{position:absolute;inset:9% 0;background:#111 center/cover;filter:grayscale(.75) sepia(.25) contrast(1.15) brightness(.85);animation:p2kjit .18s steps(2) infinite,p2kflk 3.2s infinite}
@keyframes p2kjit{0%{transform:translate(0,0) scale(1.03)}50%{transform:translate(-2px,1px) scale(1.03)}100%{transform:translate(1px,-1px) scale(1.03)}}
@keyframes p2kflk{0%,100%{opacity:1}8%{opacity:.82}9%{opacity:1}46%{opacity:.9}47%{opacity:1}71%{opacity:.75}72%{opacity:1}}
#p2khai .gr{position:absolute;inset:-50%;pointer-events:none;opacity:.22;background-image:radial-gradient(rgba(255,255,255,.5) 1px,transparent 1px),radial-gradient(rgba(0,0,0,.6) 1px,transparent 1px);background-size:3px 3px,5px 5px;animation:p2kgr .25s steps(3) infinite}
@keyframes p2kgr{0%{transform:translate(0,0)}33%{transform:translate(-7px,4px)}66%{transform:translate(5px,-6px)}}
#p2khai .sc{position:absolute;inset:0;pointer-events:none;background:repeating-linear-gradient(0deg,rgba(0,0,0,.18) 0 1px,transparent 1px 3px),radial-gradient(ellipse at center,transparent 50%,rgba(0,0,0,.75) 100%)}
#p2khai .tc{position:absolute;left:5%;top:calc(9% + 12px);font:600 13px "IBM Plex Mono",monospace;letter-spacing:.12em;color:#f0d7a8;text-shadow:0 0 6px rgba(0,0,0,.9)}
#p2khai .tc i{display:inline-block;width:9px;height:9px;border-radius:50%;background:#e2453c;margin-right:8px;animation:p2krec 1s infinite}
@keyframes p2krec{50%{opacity:.2}}
#p2khai .sub{position:absolute;left:0;right:0;bottom:calc(9% + 18px);padding:0 6%;text-align:center}
#p2khai .sub b{display:block;font:600 13px "Be Vietnam Pro",sans-serif;letter-spacing:.2em;color:#f0b25c;text-transform:uppercase;margin-bottom:6px;text-shadow:0 1px 4px #000}
#p2khai .sub q{display:inline;quotes:"“" "”";font:500 clamp(16px,2.6vw,21px)/1.5 "Be Vietnam Pro",sans-serif;color:#fff;background:rgba(0,0,0,.62);box-decoration-break:clone;-webkit-box-decoration-break:clone;padding:2px 8px}
#p2khai .sk{position:absolute;right:14px;top:14px;z-index:2;border:0;background:rgba(0,0,0,.5);color:#cfc8b8;font:600 13px "Be Vietnam Pro",sans-serif;padding:8px 12px;border-radius:8px;cursor:pointer}
#p2khai .cut{position:absolute;inset:0;background:#fff;opacity:0;pointer-events:none}
#p2khai .cut.on{animation:p2kcut .35s ease-out}
@keyframes p2kcut{0%{opacity:.7}100%{opacity:0}}
@media (prefers-reduced-motion:reduce){#p2khai .fr,#p2khai .gr{animation:none}}`; document.head.appendChild(st); }
  const el=document.createElement('div'); el.id='p2khai';
  el.innerHTML='<div class="fr"></div><div class="gr"></div><div class="sc"></div><div class="tc"><i></i><span></span></div><div class="sub"><b></b><q></q></div><div class="cut"></div><button type="button" class="sk">Bỏ qua ›</button>';
  document.body.appendChild(el); requestAnimationFrame(()=>{ el.style.opacity=1; });
  const fr=el.querySelector('.fr'), tc=el.querySelector('.tc span'), nm=el.querySelector('.sub b'), q=el.querySelector('q'), cut=el.querySelector('.cut');
  let i=-1, iv=null, to=null, done=false;
  const fin=()=>{ if(done) return; done=true; clearInterval(iv); clearTimeout(to); el.style.opacity=0; setTimeout(()=>{ el.remove(); res(); },600); };
  const show=()=>{ i++; clearInterval(iv); clearTimeout(to); if(i>=L.length){ fin(); return; } const [ten,loi]=P2KHAI[L[i]];
    cut.classList.remove('on'); void cut.offsetWidth; cut.classList.add('on'); try{ window.SFX&&SFX.play('chup',{v:.35,rate:.7}); }catch(e){}
    fr.style.backgroundImage='url(img2/x2-khai-'+L[i]+'.webp)'; tc.textContent='NHÂN CHỨNG '+String(i+1).padStart(2,'0')+' · 05:'+String(12+i*7).padStart(2,'0'); nm.textContent=ten; q.textContent=''; let c=0;
    iv=setInterval(()=>{ c+=1; q.textContent=loi.slice(0,c); if(c>=loi.length){ clearInterval(iv); to=setTimeout(show,3200); } },38); };
  el.onclick=e=>{ if(e.target.classList.contains('sk')){ fin(); return; } const loi=i>=0&&i<L.length?P2KHAI[L[i]][1]:''; if(q.textContent.length<loi.length){ clearInterval(iv); q.textContent=loi; clearTimeout(to); to=setTimeout(show,2600); } else show(); };
  show(); }); }
/* ảnh qua sông: vài tấm như ảnh chụp vội, có dấu giờ, lướt qua rồi tới bảng tổng kết (chỉ các kết có người ra được) */
function p2AnhSong(k){ return new Promise(res=>{ const pick=n=>P2REAL[n]||['x2-bo-song-dem','x2-ben-ghe','x2-cua-khau-sang','x2-ket-o-lai'].includes(n);
  const A={ca_to:['x2-bo-song-dem','x2-ben-ghe','x2-cua-khau-sang'],boi_song:['x2-bo-song-dem','x2-ket-boi-song','x2-cua-khau-sang'],o_lai:['x2-bo-song-dem','x2-ket-o-lai','x2-cua-khau-sang']}[k];
  const L=(A||[]).filter(pick); if(!L.length){ res(); return; }
  if(!$('p2anhCss')){ const st=document.createElement('style'); st.id='p2anhCss'; st.textContent=`
#p2anh{position:fixed;inset:0;z-index:85;background:#07080b;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .6s;cursor:pointer;overflow:hidden}
#p2anh .pp{position:absolute;width:min(78vw,640px);padding:10px 10px 38px;background:#efe8d8;box-shadow:0 24px 60px rgba(0,0,0,.7);opacity:0;transform:translateY(30px) rotate(var(--r));transition:opacity .7s,transform .9s cubic-bezier(.2,.8,.2,1)}
#p2anh .pp.on{opacity:1;transform:translateY(0) rotate(var(--r))}
#p2anh .pp i{display:block;aspect-ratio:3/2;background:#222 center/cover;filter:saturate(.75) contrast(1.05)}
#p2anh .pp span{position:absolute;right:16px;bottom:10px;font:600 13px "IBM Plex Mono",monospace;color:#e2645c;letter-spacing:.08em}
#p2anh .sk{position:absolute;right:14px;top:14px;border:0;background:rgba(255,255,255,.08);color:#cfc8b8;font:600 13px "Be Vietnam Pro",sans-serif;padding:8px 12px;border-radius:8px;cursor:pointer}`; document.head.appendChild(st); }
  const el=document.createElement('div'); el.id='p2anh';
  const R=[-4,3,-2,5];
  el.innerHTML=L.map((n,i)=>'<div class="pp" style="--r:'+R[i%4]+'deg"><i style="background-image:url(img2/'+n+'.webp)"></i><span>'+['04:52','05:07','05:31','06:10'][i]+'</span></div>').join('')+'<button type="button" class="sk">Tiếp ›</button>';
  document.body.appendChild(el); requestAnimationFrame(()=>{ el.style.opacity=1; });
  const P=el.querySelectorAll('.pp'); let i=0, done=false; const tm=[];
  const fin=()=>{ if(done) return; done=true; tm.forEach(clearTimeout); el.style.opacity=0; setTimeout(()=>{ el.remove(); res(); },600); };
  P.forEach((p,k)=>tm.push(setTimeout(()=>{ p.classList.add('on'); try{ window.SFX&&SFX.play('chup',{v:.5}); }catch(e){} },400+k*1800)));
  tm.push(setTimeout(fin,400+P.length*1800+2200));
  el.onclick=()=>fin(); }); }
/* Tờ HẺM 47 NEWS (giao diện theo bản thiết kế 30/10): 4 trang, lật từng trang.
   Trang 1, 3, 4 là tin thật, nguồn ghi ở chân trang. Trang 2 là bài hư cấu về vụ trong game. */
const P2NEWS={
  p1:{lead:{h:'6 tháng đầu năm 2026: 120 vụ mua bán người, hơn 70% nạn nhân là phụ nữ',b:'Lực lượng chức năng điều tra 120 vụ mua bán người trong nước và xuyên quốc gia, khởi tố 323 bị can, xác định 146 nạn nhân.',img:'x2-ben-ghe'},
    side:[{h:'Giai đoạn 2021–2025: phát hiện, điều tra 358 vụ mua bán người',b:'358 vụ với 925 bị can bị phát hiện, điều tra trong 5 năm.'},
      {h:'TP.HCM: 7 vụ mua bán người trong năm 2025',b:'Công an TP.HCM phát hiện 7 vụ, 24 đối tượng. Thủ đoạn người dân cần cảnh giác nhiều nhất: dụ dỗ việc làm, bắt cóc (kể cả "bắt cóc online"), đánh thuốc mê.'},
      {h:'Hàng trăm nghìn người bị ép vào các đường dây lừa đảo trực tuyến',b:'Văn phòng Nhân quyền Liên Hợp Quốc cho biết hàng trăm nghìn người ở Đông Nam Á có thể đang bị giữ và ép làm việc cho các đường dây lừa đảo trực tuyến.'}],
    src:['Bộ Công an, qua báo Dân trí, 30/07/2026','Cổng thông tin Bộ Công an, 09/11/2025','Phòng Cảnh sát hình sự Công an TP.HCM, qua báo Dân trí, 18/12/2025','Văn phòng Cao ủy Nhân quyền Liên Hợp Quốc, 29/08/2023']},
  p3:{kick:'Cảnh giác',h:'Nhận diện bẫy "việc nhẹ lương cao"',img:'x2-van-phong-lam',
    b:['Theo Phòng Cảnh sát hình sự Công an TP Hải Phòng, đối tượng thường đăng tin tuyển dụng hấp dẫn trên mạng xã hội: lương cao, thủ tục đơn giản, không cần bằng cấp, việc nhẹ ở nước ngoài.',
      'Khi đã tạo được lòng tin, chúng đề nghị gửi giấy tờ tùy thân, đặt cọc, hoặc đưa người ra nước ngoài bằng đường không chính thức. Nhiều người sau đó bị cưỡng bức lao động, bị ép tham gia các đường dây lừa đảo trực tuyến; gia đình mất tiền và mất liên lạc với người thân trong thời gian dài.'],
    box:{h:'Công an khuyến cáo',li:['Tìm hiểu kỹ công ty, người tuyển dụng trước khi đăng ký.','Cảnh giác với lời mời việc nhẹ mà lương cao bất thường.','Không giao hộ chiếu, căn cước công dân hoặc giấy tờ cá nhân cho người lạ.','Chỉ đi làm việc ở nước ngoài qua doanh nghiệp được cấp phép.','Nghi ngờ có dấu hiệu mua bán người thì báo ngay cho công an.']},
    side:{h:'Hơn 1.000 công dân được giải cứu',b:'Tính đến ngày 21/9/2022, hơn 1.000 công dân Việt Nam bị lừa sang làm việc trái phép đã được giải cứu, theo người phát ngôn Bộ Ngoại giao.'},
    src:['Phòng Cảnh sát hình sự Công an TP Hải Phòng, qua VTV/VTC News, 01/09/2026','Người phát ngôn Bộ Ngoại giao, họp báo 22/09/2022']},
  p4:{kick:'Pháp luật',h:'Luật mới: lấy nạn nhân làm trung tâm',
    b:['Luật Phòng, chống mua bán người năm 2024 được Quốc hội thông qua ngày 28/11/2024, có hiệu lực từ 1/7/2025, gồm 8 chương, 63 điều.',
      'Lần đầu tiên luật định nghĩa rõ "mua bán người" là hành vi tuyển mộ, vận chuyển, chứa chấp, chuyển giao hoặc tiếp nhận người nhằm mục đích bóc lột. Với người dưới 18 tuổi, chỉ cần có hành vi này là đã cấu thành, không cần có dùng vũ lực, đe dọa hay lừa gạt.',
      'Luật đặt nạn nhân và người đang được xác minh là nạn nhân vào vị trí trung tâm. Người bị mua bán mà có vi phạm do trực tiếp bị ép buộc thì tùy trường hợp có thể không bị xử phạt hoặc truy cứu trách nhiệm.'],
    hot:[['111','Đường dây nóng tư vấn, hỗ trợ nạn nhân bị mua bán · miễn phí · 24/7'],['113','Công an · báo tin khẩn cấp']],
    src:['Tạp chí Tòa án nhân dân, 23/07/2025','VietNamNet, 17/11/2021']}};
function p2Bao(k){ return new Promise(res=>{
  const my=hasC('suy_x_my')||ocl()>=4, nra=(S.p2ra||[]).length, tong=S.p2tong||0;
  const H={ca_to:'Giải cứu '+nra+' người khỏi khu trại bên kia sông',boi_song:nra+' người bơi qua sông trong đêm mưa, thoát khỏi khu trại',o_lai:nra+'/'+tong+' người thoát khỏi khu trại, vẫn còn người kẹt lại',mot_minh:'Một người thoát ra trong đêm mưa, cả tổ còn kẹt lại',ban_dung:'Kế hoạch giải cứu bị lộ, khu trại di dời trong đêm'}[k]||'';
  const B=[];
  if(k==='ban_dung'||k==='mot_minh') B.push('Theo nguồn tin của phóng viên, một nhóm người Việt bị giữ tại khu trại sát biên giới đã tìm cách liên lạc về nước. Đến nay nhiều người trong số họ vẫn chưa liên lạc được với gia đình.');
  else B.push('Rạng sáng, '+nra+' người Việt bị giữ tại một khu trại sát biên giới đã thoát ra và được đưa về bờ an toàn. Nhiều người cho biết họ bị dụ đi làm "việc nhẹ lương cao", bị giữ giấy tờ và ép làm việc trong các phòng máy.');
  B.push('Theo hồ sơ ban đầu, đường dây tuyển người thông qua một văn phòng "giới thiệu việc làm" trong một con hẻm ở Sài Gòn và một công ty "cung ứng lao động" đứng tên tại Quận 7.');
  B.push(my?'Người đứng tên các công ty này, bà T.T.M. (60 tuổi), đã bị cơ quan điều tra bắt giữ.':'Kẻ cầm tiền đứng sau đường dây đến nay vẫn chưa được xác định.');
  const EB={ca_to:P2REAL['x2-tiec-taphoa']?'x2-tiec-taphoa':'x2-cua-khau-sang',o_lai:'x2-ket-o-lai',mot_minh:'x2-ket-mot-minh',ban_dung:'x2-ket-ban-dung',boi_song:P2REAL['x2-ket-boi-song']?'x2-ket-boi-song':'x2-bo-song-dem'}[k];
  if(!$('p2baoFont')){ const l=document.createElement('link'); l.id='p2baoFont'; l.rel='stylesheet'; l.href='https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,700;6..72,800&display=swap'; document.head.appendChild(l); }
  if(!$('p2baoCss')){ const st=document.createElement('style'); st.id='p2baoCss'; st.textContent=`
#p2bao{position:fixed;inset:0;z-index:86;display:flex;align-items:center;justify-content:center;padding:18px 12px;box-sizing:border-box;opacity:0;transition:opacity .7s;perspective:2000px;overflow:hidden;background:radial-gradient(ellipse at center,#2a2219 0%,#0d0b09 75%)}
#p2bao .bgp{position:absolute;width:190px;aspect-ratio:4/3;background:#ddd center/cover;border:8px solid #d9cfba;border-bottom-width:24px;filter:grayscale(1) sepia(.35) brightness(.38) blur(.6px);box-shadow:0 10px 30px rgba(0,0,0,.6);pointer-events:none}
#p2bao .stk{position:relative;width:min(1040px,100%);max-height:calc(100dvh - 36px);display:flex}
#p2bao .stk::before,#p2bao .stk::after{content:"";position:absolute;inset:6px -6px -8px 8px;background:#cdbd9c;transform:rotate(1.1deg);box-shadow:0 20px 50px rgba(0,0,0,.7);clip-path:var(--tear)}
#p2bao .stk::after{inset:2px 4px -4px -4px;background:#d8c9a8;transform:rotate(-.7deg)}
#p2bao .pg{position:relative;z-index:1;flex:1;overflow:auto;color:#1d1a14;padding:clamp(16px,3vw,34px) clamp(16px,3.6vw,42px) clamp(14px,2.4vw,24px);box-sizing:border-box;font-family:Newsreader,Georgia,serif;clip-path:var(--tear);
  background:radial-gradient(ellipse at 18% 12%,rgba(120,86,40,.20),transparent 45%),radial-gradient(ellipse at 85% 80%,rgba(110,80,40,.24),transparent 50%),radial-gradient(ellipse at 60% 30%,rgba(255,250,235,.35),transparent 55%),url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .35 0 0 0 0 .27 0 0 0 0 .16 0 0 0 .28 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"),#e6d8bb;
  box-shadow:inset 0 0 90px rgba(90,60,25,.45);transform-origin:left center;transition:transform .9s cubic-bezier(.6,.05,.3,1),opacity .9s;backface-visibility:hidden}
#p2bao .pg.out{transform:rotateY(-100deg);opacity:0}
#p2bao .pg.in{animation:p2bin .9s cubic-bezier(.6,.05,.3,1)}
@keyframes p2bin{from{transform:rotateY(70deg);opacity:0}}
#p2bao .mast{display:flex;align-items:center;justify-content:center;gap:clamp(8px,1.6vw,18px);padding:0 0 6px;border-bottom:1.5px solid #1d1a14}
#p2bao .mast::before,#p2bao .mast::after{content:"";flex:1;height:1px;background:linear-gradient(90deg,transparent,#1d1a14 30%,#1d1a14 70%,transparent);max-width:200px}
#p2bao .mast img{height:clamp(40px,7.4vw,82px);width:auto;filter:contrast(1.1)}
#p2bao .mast b{font:900 clamp(38px,7.6vw,84px)/.9 Newsreader,Georgia,serif;letter-spacing:.01em;transform:scaleY(1.06)}
#p2bao .dl{display:flex;justify-content:space-between;font:700 clamp(11px,1.3vw,14px) Newsreader,Georgia,serif;letter-spacing:.14em;text-transform:uppercase;padding:6px 0 5px;border-bottom:3px double #1d1a14}
#p2bao .g1{display:grid;grid-template-columns:1fr;gap:14px;margin-top:14px}
@media (min-width:760px){#p2bao .g1{grid-template-columns:1.55fr 1fr;gap:26px}#p2bao .g1 .side{border-left:1px solid rgba(29,26,20,.4);padding-left:22px}}
#p2bao h2{margin:0 0 8px;font:800 clamp(24px,3.6vw,44px)/1.12 Newsreader,Georgia,serif;letter-spacing:-.01em}
#p2bao h3{margin:0 0 6px;font:800 clamp(17px,1.8vw,21px)/1.22 Newsreader,Georgia,serif}
#p2bao p{margin:0 0 8px;font-size:clamp(15px,1.55vw,18px);line-height:1.5}
#p2bao .side .it{padding:0 0 12px;margin:0 0 12px;border-bottom:1px solid rgba(29,26,20,.35)}
#p2bao .side .it:last-child{border:0;margin:0}
#p2bao .ph{background:#333 center/cover;filter:grayscale(1) sepia(.3) contrast(1.15) brightness(.9);box-shadow:inset 0 0 0 1px rgba(0,0,0,.4),inset 0 0 40px rgba(0,0,0,.45);margin:8px 0 10px}
#p2bao .ph.lead{aspect-ratio:16/8}
#p2bao .ph.wide{aspect-ratio:3.6/1}
#p2bao .ph.tall{aspect-ratio:1/1;margin:0;filter:sepia(.25) saturate(.85) contrast(1.05)}
@media (min-width:760px){#p2bao .g4{grid-template-columns:1fr 1fr}#p2bao .g4 .cols{column-count:2;column-gap:22px;column-rule:1px solid rgba(29,26,20,.35)}#p2bao .g4 .cols p{font-size:clamp(14px,1.35vw,16.5px)}}
@media (max-width:759px){#p2bao .ph.wide{aspect-ratio:16/10}}
#p2bao .kick{font:700 12px "Be Vietnam Pro",sans-serif;letter-spacing:.2em;color:#9b2a22;text-transform:uppercase;margin:12px 0 2px}
#p2bao .cols{margin-top:6px}
@media (min-width:760px){#p2bao .cols{column-count:2;column-gap:28px;column-rule:1px solid rgba(29,26,20,.35)}}
#p2bao .box{border:1.5px solid #1d1a14;padding:10px 14px;margin:6px 0 10px;break-inside:avoid}
#p2bao .box b{display:block;font:800 16px Newsreader,Georgia,serif;margin-bottom:4px}
#p2bao .box ol{margin:0;padding-left:20px;font-size:15.5px;line-height:1.5}
#p2bao .hot{display:flex;flex-wrap:wrap;gap:12px;margin:10px 0}
#p2bao .hot div{flex:1 1 220px;border:2px solid #1d1a14;padding:8px 12px;display:flex;align-items:center;gap:12px}
#p2bao .hot strong{font:900 clamp(30px,4vw,44px)/1 Newsreader,Georgia,serif;color:#9b2a22}
#p2bao .hot span{font:600 13px/1.4 "Be Vietnam Pro",sans-serif}
#p2bao .ft{display:flex;align-items:flex-end;gap:14px;margin-top:12px;border-top:1px solid rgba(29,26,20,.45);padding-top:8px}
#p2bao .src{flex:1;font:400 11px/1.5 "Be Vietnam Pro",sans-serif;color:#3a3226}
#p2bao .call{flex:1;border:1.5px solid #1d1a14;padding:8px 12px;font:700 13px/1.45 "Be Vietnam Pro",sans-serif}
#p2bao .pn{font:700 13px "Be Vietnam Pro",sans-serif;letter-spacing:.1em;padding:0 4px 10px;border-left:1px solid rgba(29,26,20,.4);padding-left:14px}
#p2bao .go{flex:none;min-height:46px;padding:0 20px;border:0;border-radius:3px;background:#1d1a14;color:#efe6d2;font:700 16px Newsreader,Georgia,serif;cursor:pointer;box-shadow:0 0 0 3px #e6d8bb,0 0 0 4px #1d1a14,0 6px 14px rgba(0,0,0,.4)}
#p2bao .fic{font:italic 400 12px "Be Vietnam Pro",sans-serif;color:#5a4f3c;margin-top:4px}
@media (max-width:759px){#p2bao .ft{flex-wrap:wrap}#p2bao .src,#p2bao .call{flex-basis:100%}#p2bao .go{margin-left:auto}#p2bao .bgp{display:none}}`; document.head.appendChild(st); }
  /* mép giấy rách: đường gồ ghề ngẫu nhiên quanh 4 cạnh */
  const tear=()=>{ const P=[], j=()=>(Math.random()*.9).toFixed(2); for(let x=0;x<=100;x+=2.5) P.push(x+'% '+j()+'%'); for(let y=0;y<=100;y+=2.5) P.push((100-j())+'% '+y+'%'); for(let x=100;x>=0;x-=2.5) P.push(x+'% '+(100-j())+'%'); for(let y=100;y>=0;y-=2.5) P.push(j()+'% '+y+'%'); return 'polygon('+P.join(',')+')'; };
  const day=new Date(); const dd=String(day.getDate()).padStart(2,'0')+'/'+String(day.getMonth()+1).padStart(2,'0')+'/'+day.getFullYear();
  const head='<div class="mast"><img src="img2/tua-hem47-ink.webp" alt="Hẻm 47"><b>NEWS</b></div><div class="dl"><span>Số đặc biệt</span><span>'+dd+'</span></div>';
  const src=a=>'<div class="src">Nguồn: '+a.map((x,i)=>(i+1)+'. '+esc(x)).join(' · ')+'</div>';
  const N=P2NEWS, pn=n=>'<span class="pn">'+n+' / 4</span>';
  const btn=(id,t)=>'<button type="button" class="go" id="'+id+'">'+t+'</button>';
  const pages=[
    head+'<div class="g1"><div><h2>'+esc(N.p1.lead.h)+'</h2><p>'+esc(N.p1.lead.b)+'</p><div class="ph lead" style="background-image:url(img2/'+N.p1.lead.img+'.webp)"></div></div><div class="side">'+N.p1.side.map(x=>'<div class="it"><h3>'+esc(x.h)+'</h3><p>'+esc(x.b)+'</p></div>').join('')+'</div></div>'+
      '<div class="ft">'+src(N.p1.src)+pn(1)+btn('bgo','Lật trang ›')+'</div>',
    head+'<p class="kick">Vụ việc</p><h2>'+esc(H)+'</h2>'+(EB?'<div class="ph wide" style="background-image:url(img2/'+EB+'.webp)"></div>':'')+'<div class="cols">'+B.map(t=>'<p>'+esc(t)+'</p>').join('')+'</div>'+
      '<p class="fic">Bài viết hư cấu trong trò chơi Hẻm 47. Nhân vật, công ty và địa danh không có thật.</p>'+
      '<div class="ft"><div class="call">Được mời đi làm "việc nhẹ lương cao" ở nước ngoài, bị giữ giấy tờ, hay mất liên lạc với người thân đi làm xa: báo công an nơi gần nhất hoặc gọi 113.</div>'+pn(2)+btn('bgo','Lật trang ›')+'</div>',
    head+'<p class="kick">'+esc(N.p3.kick)+'</p><h2>'+esc(N.p3.h)+'</h2><div class="g1"><div><div class="ph lead" style="background-image:url(img2/'+N.p3.img+'.webp)"></div>'+N.p3.b.map(t=>'<p>'+esc(t)+'</p>').join('')+'</div>'+
      '<div class="side"><div class="box"><b>'+esc(N.p3.box.h)+'</b><ol>'+N.p3.box.li.map(t=>'<li>'+esc(t)+'</li>').join('')+'</ol></div><div class="it"><h3>'+esc(N.p3.side.h)+'</h3><p>'+esc(N.p3.side.b)+'</p></div></div></div>'+
      '<div class="ft">'+src(N.p3.src)+pn(3)+btn('bgo','Lật trang ›')+'</div>',
    head+'<div class="g1 g4"><div><p class="kick">'+esc(N.p4.kick)+'</p><h2>'+esc(N.p4.h)+'</h2><div class="cols">'+N.p4.b.map(t=>'<p>'+esc(t)+'</p>').join('')+'</div></div><div class="ph tall" style="background-image:url(img2/x2-ca-to-hem.webp)"></div></div>'+
      '<div class="hot">'+N.p4.hot.map(x=>'<div><strong>'+x[0]+'</strong><span>'+esc(x[1])+'</span></div>').join('')+'</div>'+
      '<div class="ft">'+src(N.p4.src)+pn(4)+btn('bgo','Đóng báo')+'</div>'];
  const el=document.createElement('div'); el.id='p2bao';
  const BG=['x2-khai-nhi','x2-khai-toan','x2-bo-song-dem','x2-khai-ti','x2-ben-ghe','x2-khai-hue'];
  const pos=[[-2,6,-12],[-3,58,9],[86,4,14],[88,52,-8],[40,-8,4],[44,86,-5]];
  el.innerHTML=BG.map((b,i)=>'<i class="bgp" style="left:'+pos[i][0]+'%;top:'+pos[i][1]+'%;transform:rotate('+pos[i][2]+'deg);background-image:url(img2/'+b+'.webp)"></i>').join('')+'<div class="stk" style="--tear:'+tear()+'"><div class="pg"></div></div>';
  document.body.appendChild(el); requestAnimationFrame(()=>{ el.style.opacity=1; });
  const pg=el.querySelector('.pg'); let n=0;
  const render=()=>{ pg.innerHTML=pages[n]; pg.scrollTop=0; $('bgo').onclick=next; };
  const next=()=>{ if(n>=pages.length-1){ el.style.opacity=0; setTimeout(()=>{ el.remove(); res(); },700); return; }
    try{ window.SFX&&SFX.play('viet',{v:.25,dur:.6}); }catch(e){}
    pg.classList.remove('in'); pg.classList.add('out'); setTimeout(()=>{ n++; pg.classList.remove('out'); void pg.offsetWidth; pg.classList.add('in'); render(); },650); };
  render(); }); }
/* ảnh qua sông: vài tấm như ảnh chụp vội, có dấu giờ, lướt qua rồi tới bảng tổng kết (chỉ các kết có người ra được) */
function p2AnhSong(k){ return new Promise(res=>{ const pick=n=>P2REAL[n]||['x2-bo-song-dem','x2-ben-ghe','x2-cua-khau-sang','x2-ket-o-lai'].includes(n);
  const A={ca_to:['x2-bo-song-dem','x2-ben-ghe','x2-cua-khau-sang'],boi_song:['x2-bo-song-dem','x2-ket-boi-song','x2-cua-khau-sang'],o_lai:['x2-bo-song-dem','x2-ket-o-lai','x2-cua-khau-sang']}[k];
  const L=(A||[]).filter(pick); if(!L.length){ res(); return; }
  if(!$('p2anhCss')){ const st=document.createElement('style'); st.id='p2anhCss'; st.textContent=`
#p2anh{position:fixed;inset:0;z-index:85;background:#07080b;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .6s;cursor:pointer;overflow:hidden}
#p2anh .pp{position:absolute;width:min(78vw,640px);padding:10px 10px 38px;background:#efe8d8;box-shadow:0 24px 60px rgba(0,0,0,.7);opacity:0;transform:translateY(30px) rotate(var(--r));transition:opacity .7s,transform .9s cubic-bezier(.2,.8,.2,1)}
#p2anh .pp.on{opacity:1;transform:translateY(0) rotate(var(--r))}
#p2anh .pp i{display:block;aspect-ratio:3/2;background:#222 center/cover;filter:saturate(.75) contrast(1.05)}
#p2anh .pp span{position:absolute;right:16px;bottom:10px;font:600 13px "IBM Plex Mono",monospace;color:#e2645c;letter-spacing:.08em}
#p2anh .sk{position:absolute;right:14px;top:14px;border:0;background:rgba(255,255,255,.08);color:#cfc8b8;font:600 13px "Be Vietnam Pro",sans-serif;padding:8px 12px;border-radius:8px;cursor:pointer}`; document.head.appendChild(st); }
  const el=document.createElement('div'); el.id='p2anh';
  const R=[-4,3,-2,5];
  el.innerHTML=L.map((n,i)=>'<div class="pp" style="--r:'+R[i%4]+'deg"><i style="background-image:url(img2/'+n+'.webp)"></i><span>'+['04:52','05:07','05:31','06:10'][i]+'</span></div>').join('')+'<button type="button" class="sk">Tiếp ›</button>';
  document.body.appendChild(el); requestAnimationFrame(()=>{ el.style.opacity=1; });
  const P=el.querySelectorAll('.pp'); let i=0, done=false; const tm=[];
  const fin=()=>{ if(done) return; done=true; tm.forEach(clearTimeout); el.style.opacity=0; setTimeout(()=>{ el.remove(); res(); },600); };
  P.forEach((p,k)=>tm.push(setTimeout(()=>{ p.classList.add('on'); try{ window.SFX&&SFX.play('chup',{v:.5}); }catch(e){} },400+k*1800)));
  tm.push(setTimeout(fin,400+P.length*1800+2200));
  el.onclick=()=>fin(); }); }
const ending1=ending, finale1=finale;
finale=async function(){ if(!P2.on) return finale1(); };
ending=async function(k){ if(!P2.on) return ending1(k); return p2Ending(k); };

/* ---------------- màn đầu: thêm nút Phần 2 ---------------- */
function p2p1(){ try{ return JSON.parse(lsGet('tgl_chuong1')||'null'); }catch(e){ return null; } }
function p2Buttons(){ const row=document.querySelector('#cover .row'); if(!row||$('bP2')||P2.on) return;
  /* chỉ hiện ở màn kết Phần 1, không chen vô màn hết hồi */
  if(!(typeof S!=='undefined'&&S&&S.ended)) return;
  const b=document.createElement('button'); b.className='btn'; b.id='bP2'; b.type='button'; b.textContent='Phần 2 · Xứ Lạ'; b.style.background='#e2645c'; b.style.color='#fff';
  row.insertBefore(b,row.firstChild); b.onclick=()=>p2Menu(); }
function p2Menu(){ const c=$('cover'); const p1=p2p1(), sv=lsGet(P2SAVE); const K={phuong:'Người lên tiếng',imlang:'Im lặng đúng lúc',bocphot:'Bóc phốt',tien:'Nhận tiền',hetgio:'Hết giờ'};
  const k=p1&&p1.ket; const nh=(k==='phuong'||k==='imlang')?'A':'B';
  c.querySelector('.in').innerHTML='<div class="kick">HẺM 47 · PHẦN 2</div><h2 class="cl" style="font-size:56px">Xứ Lạ</h2><p>Có những người rời hẻm 47 với một tờ giấy khám sức khỏe và một lời hứa lương ba chục triệu. Họ không gọi điện về.</p>'+
    '<p class="sub">'+(p1?'Phần 1 của bạn kết ở: <b>'+esc(K[k]||k)+'</b>. '+(nh==='A'?'Ngân đã về.':'Ngân chưa về.'):'Chưa thấy bài lưu Phần 1 trên máy này: vào như kết "Hết giờ".')+'</p>'+
    '<p class="sub">Chơi thử với kết khác: <select id="p2k" style="font:inherit;background:#20263a;color:#efe8d8;border:1px solid #2e3549;border-radius:8px;padding:4px"><option value="">(theo bài lưu)</option>'+Object.keys(K).map(x=>'<option value="'+x+'">'+K[x]+'</option>').join('')+'</select> <label><input type="checkbox" id="p2kl"> Khoa đã lật</label> <label><input type="checkbox" id="p2tu"> đã vạch anh Tú</label> <label><input type="checkbox" id="p2cg"> nói thật với cô Thoa</label> <label><input type="checkbox" id="p2ph"> Phát làm chứng</label></p>'+
    '<div class="row">'+(sv?'<button class="btn" id="p2Cont" type="button">Chơi tiếp Phần 2</button>':'')+'<button class="btn'+(sv?' ghost':'')+'" id="p2New" type="button">Chơi mới Phần 2</button><button class="btn ghost" id="p2Back" type="button">Về Phần 1</button></div>'+
    '<p class="sub" style="margin-top:16px;border-left:3px solid #e2645c;padding-left:10px">18+. Có nội dung về lừa đảo, mua bán người và giam giữ, không có cảnh bạo lực trực diện. Thủ đoạn trong game được hư cấu lại từ những vụ việc báo chí và cơ quan chức năng đã công bố để cảnh báo. Nhân vật và địa danh là hư cấu. Nếu bạn hoặc người quen được mời đi làm "việc nhẹ lương cao" ở nước ngoài, hãy báo công an nơi gần nhất.</p>';
  $('p2Back').onclick=()=>location.reload();
  if($('p2Cont')) $('p2Cont').onclick=()=>p2Begin(true);
  $('p2New').onclick=()=>{ if(sv&&!confirm('Chơi mới sẽ xóa bài lưu Phần 2 trên máy này. Tiếp tục?')) return; let p=p1; const v=$('p2k').value;
    if(v||$('p2kl').checked||$('p2tu').checked||$('p2cg').checked||$('p2ph').checked) p=Object.assign({},p1||{},{ket:v||(p1&&p1.ket)||'hetgio',co:Object.assign({},(p1&&p1.co)||{},{khoa_lat:$('p2kl').checked,tu_lo:$('p2tu').checked,noi_cuocgoi:$('p2cg').checked,phat_nhanchung:$('p2ph').checked})});
    lsDel(P2SAVE); p2Begin(false,p); }; }
async function p2Begin(cont,p1){ ac(); if(P2.starting) return; P2.starting=true; const bar=p2Bar();
  let o=null; if(cont){ try{ o=JSON.parse(lsGet(P2SAVE)||'null'); }catch(e){} }
  try{ const need=[p2LoadImgs(),(async()=>{ for(let i=0;i<300&&!(Object.keys(A).length&&W);i++) await sleep(100); })()]; if(o&&o.map==='trai') need.push(trainImgs()); await p2Track(need,bar); }
  finally{ bar.remove(); P2.starting=false; }
  P2.on=true; p2Install(); p2BgLoad(); trainImgs();
  S=o&&o.p2?Object.assign(fresh(),o):p2Fresh(p1||p2p1()); setME();
  loadNang(); $('cover').hidden=true; started=true; $('hdBtn').hidden=false; $('blBtn').hidden=false; setInterval(()=>{ if(!busy&&!SO.on&&!sleeping) save(); },8000);
  p2SetMap(S.map||'hem'); if(P2.map==='trai') putAt('xngu',.35); else { PL.x=S.vai==='ngan'?at('taphoa',.5):at('basau',.4); snapNPC(); } hud();
  if(!o&&TESTMODE){ S.scene='street'; hud(); }
  else if(!o){ S.scene='room'; hud(); await runS('x_mo'); hideDlg(); await runS('x_hd'); hideDlg(); S.scene='street'; PL.x=S.vai==='ngan'?at('taphoa',.5):at('basau',.4); snapNPC(); fade=1.2; toast('Ngày 1 · '+fmtT(S.min)+(S.nhanh==='A'?' · hôm nay bạn là '+ME:'')); hud(); }
  else if(S.ended){ p2Ending(S.ended); return; }
  else if(S.scene==='room'||S.scene==='place'){ S.scene='street'; S.room=null; }
  save(); await tick(); }
p2Buttons(); new MutationObserver(p2Buttons).observe($('cover'),{childList:true,subtree:true});
/* nhảy nhanh để thử (gõ trong console): P2JUMP(8) vào trại, P2JUMP(19) */
window.P2JUMP=async d=>{ if(!P2.on) return; if(d>=8){ await trainImgs(); buildDs(); S.hoi=d>=19?3:2; setCo('hoi2'); setCo('x_mon_xong'); S.ai_vao=S.ai_vao||'lam'; S.vai=S.ai_vao; setME(); p2SetMap('trai'); S.day=d; S.min=d===8?19*60:7*60; putAt('xngu',.35); hud(); save(); await tick(); } };
/* thành tựu Phần 1 không chấm khi đang chơi Phần 2 */
const ttCheck1=ttCheck; ttCheck=function(){ if(P2.on) return ttCheck2(); return ttCheck1.apply(this,arguments); };
/* thành tựu Phần 2: lưu riêng */
const p2KetGot=()=>{ try{ return JSON.parse(lsGet('tgl_chuong2_ket')||'[]'); }catch(e){ return []; } };
const TT2=[
 {k:'p2_trai',t:'Qua biên giới',d:'Vô tới trại.',f:()=>P2.map==='trai'},
 {k:'p2_may',t:'Máy giấu',d:'Lấy được cái điện thoại dưới thùng nước.',f:()=>hasF('x_may')},
 {k:'p2_tin',t:'Chữ đầu câu',d:'Gửi được một tin giấu chữ ra ngoài.',f:()=>hasF('x_tin_song')||hasF('x_tin_3g')},
 {k:'p2_sodo',t:'Thuộc đường',d:'Vẽ đủ sơ đồ trại.',f:()=>hasF('x_sodo3')},
 {k:'p2_khe',t:'Hai phút',d:'Tìm ra khe hở lúc 3 giờ sáng.',f:()=>hasC('suy_x_khe')},
 {k:'p2_ocl',t:'Ông Chủ Lò',d:'Gom đủ 5 chứng cứ về Ông Chủ Lò.',an:1,f:()=>ocl()>=5},
 {k:'p2_sach',t:'Tay sạch',d:'Tới kết mà không ai mất tiền vì tin bạn gửi.',f:()=>!!S.ended&&!(S.so||[]).length},
 {k:'p2_cato',t:'Cả tổ về',d:'Đưa được cả tổ ra tới sông.',an:1,f:()=>S.ended==='ca_to'},
 {k:'p2_ket1',t:'Bờ bên kia',d:'Mở một kết bất kỳ của Phần 2.',f:()=>!!S.ended},
 {k:'p2_ket4',t:'Đủ bốn ngả',d:'Mở đủ 4 kết Phần 2.',f:()=>p2KetGot().length>=4}];
function ttGot2(){ try{ return JSON.parse(lsGet('tgl_tt2')||'{}')||{}; }catch(e){ return {}; } }
function ttCheck2(){ if(typeof TESTMODE!=='undefined'&&TESTMODE) return; const g=ttGot2(); let n=0;
  TT2.forEach(a=>{ if(g[a.k]) return; let ok=false; try{ ok=a.f(); }catch(e){} if(ok){ g[a.k]=Date.now(); n++; setTimeout(()=>toast('Thành tựu mới: '+a.t),400+n*2200); } });
  if(n) lsSet('tgl_tt2',JSON.stringify(g)); }
/* bảng thành tựu: hiện cả hai phần */
ttOpen=function(){ const row=(L,g)=>L.map(a=>{ const on=!!g[a.k], an=a.an&&!on; return '<div class="tt'+(on?' on':'')+'"><i>'+(on?'★':'☆')+'</i><div><b>'+(an?'Thành tựu ẩn':esc(a.t))+'</b><span>'+(an?'Chơi tới đâu sẽ biết tới đó.':esc(a.d))+'</span></div></div>'; }).join('');
  const g1=ttGot(), g2=ttGot2(), c1=TT.filter(a=>g1[a.k]).length, c2=TT2.filter(a=>g2[a.k]).length;
  const s1='<p class="ppl-n" style="margin:4px 0 8px">Phần 1 · Thế Giới Lặng · '+c1+'/'+TT.length+'</p>'+row(TT,g1), s2='<p class="ppl-n" style="margin:16px 0 8px">Phần 2 · Xứ Lạ · '+c2+'/'+TT2.length+'</p>'+row(TT2,g2);
  panel('Thành tựu',P2.on?s2+s1:s1+s2,(c1+c2)+'/'+(TT.length+TT2.length)); };
/* thẻ khoe kết quả Phần 2 */
const kqCanvas1=kqCanvas; kqCanvas=async function(k){ if(!P2.on) return kqCanvas1(k);
  const W=1080,H=1350, c=document.createElement('canvas'); c.width=W; c.height=H; const g=c.getContext('2d');
  const EB={ca_to:P2REAL['x2-tiec-taphoa']?'x2-tiec-taphoa':'x2-cua-khau-sang',o_lai:'x2-ket-o-lai',mot_minh:'x2-ket-mot-minh',ban_dung:'x2-ket-ban-dung',boi_song:P2REAL['x2-ket-boi-song']?'x2-ket-boi-song':'x2-bo-song-dem'}[k];
  const im=await new Promise(r=>{ if(!EB){ r(null); return; } const i=new Image(); i.onload=()=>r(i); i.onerror=()=>r(null); i.src='img2/'+EB+'.webp?v=1025'; });
  g.fillStyle='#0b0d14'; g.fillRect(0,0,W,H);
  if(im){ const sc=Math.max(W/im.width,H*.62/im.height), w=im.width*sc, h=im.height*sc; g.drawImage(im,(W-w)/2,0,w,h); }
  let gr=g.createLinearGradient(0,0,0,H); gr.addColorStop(0,'rgba(11,13,20,.55)'); gr.addColorStop(.32,'rgba(11,13,20,.15)'); gr.addColorStop(.58,'rgba(11,13,20,.92)'); gr.addColorStop(1,'#0b0d14'); g.fillStyle=gr; g.fillRect(0,0,W,H);
  try{ await Promise.all([document.fonts.load('600 120px Oswald, "Arial Narrow", sans-serif'),document.fonts.load('400 40px "Be Vietnam Pro", sans-serif')]); }catch(e){}
  g.textAlign='center';
  const tua=await new Promise(r=>{ const i=new Image(); i.onload=()=>r(i); i.onerror=()=>r(null); i.src='img2/tua2.webp'; });
  let ly=300; if(tua){ const sh=tua.height, tw=640, th=tw*sh/tua.width; g.shadowColor='rgba(0,0,0,.6)'; g.shadowBlur=24; g.drawImage(tua,0,0,tua.width,sh,(W-tw)/2,40,tw,th); g.shadowBlur=0; g.shadowColor='transparent'; ly=40+th+62; }
  ly-=20;
  g.fillStyle='#d9d3c4'; g.font='500 26px "Be Vietnam Pro", sans-serif'; if('letterSpacing' in g) g.letterSpacing='8px'; g.fillText('PHẦN 2',W/2+4,ly+46); if('letterSpacing' in g) g.letterSpacing='0px';
  g.fillStyle='#a9a493'; g.font='500 30px "Be Vietnam Pro", sans-serif'; if('letterSpacing' in g) g.letterSpacing='6px'; g.fillText('KẾT THÚC · NGÀY '+S.day,W/2,860); if('letterSpacing' in g) g.letterSpacing='0px';
  g.fillStyle='#ffffff'; g.font='600 92px Oswald, "Arial Narrow", sans-serif'; g.fillText(String((ENDS[k]||['',''])[1]).toUpperCase(),W/2,965);
  const st=[[(S.p2ra||[]).length+'/'+(S.p2tong||0),'người ra tới sông'],[ocl()+'/5','chứng cứ Ông Chủ Lò'],[p2KetGot().length+'/4','kết đã mở']];
  st.forEach(([v,l],i)=>{ const x=W/2+(i-1)*300, y=1065; g.fillStyle='rgba(32,38,58,.85)'; g.strokeStyle='rgba(255,255,255,.12)'; g.lineWidth=2; const rw=270,rh=130; if(g.roundRect){ g.beginPath(); g.roundRect(x-rw/2,y-rh/2,rw,rh,18); g.fill(); g.stroke(); } else g.fillRect(x-rw/2,y-rh/2,rw,rh);
    g.fillStyle='#efe8d8'; g.font='600 50px Oswald, "Arial Narrow", sans-serif'; g.fillText(v,x,y+8); g.fillStyle='#959cb2'; g.font='400 24px "Be Vietnam Pro", sans-serif'; g.fillText(l,x,y+46); });
  g.fillStyle='#d9d3c4'; g.font='400 32px "Be Vietnam Pro", sans-serif'; g.fillText('Bạn đưa được bao nhiêu người về?',W/2,1215);
  g.fillStyle='#f0b25c'; g.font='600 34px "Be Vietnam Pro", sans-serif'; g.fillText('www.hem47.asia',W/2,1270);
  return c; };
/* chống kẹt: hết cảnh mà nền phim còn treo thì gỡ; lỗi thì báo lên màn hình để tác giả chụp gửi */
setInterval(()=>{ if(P2.on&&!S.ended&&!busy&&!sleeping&&!camping&&BGNOW&&$('dlg').hidden&&$('game').hidden&&!document.querySelector('.p2cardfull')){ BGNOW=null; fade=.5; } },1500);
addEventListener('error',e=>{ if(P2.on) toast('Lỗi: '+(e.message||'').slice(0,80)); });
addEventListener('unhandledrejection',e=>{ if(P2.on) toast('Lỗi: '+String(e.reason&&e.reason.message||e.reason).slice(0,80)); });
/* nhạc Phần 2: nhac/x2-*.mp3; file nào chưa có (hoặc lỗi) thì dùng nhạc Phần 1 */
const P2NHAC_FB={'x2-mo-dau':'mo-dau','x2-hem':'hem-dem','x2-trai-ngay':'trong-nha','x2-trai-dem':'hem-dem','x2-trai-dem2':'x2-trai-dem','x2-di-dem':'truy-duoi','x2-cuu':'truy-duoi','x2-phim':'phim','x2-cang':'cang-thang',
  'x2-ket-cato':'ket-thuong','x2-ket-olai':'ket-tiecnuoi','x2-ket-motminh':'ket-tiecnuoi','x2-ket-bandung':'ket-kichtinh'};
const nhacMood1=nhacMood;
nhacMood=function(){ const vis=id=>{ const e=$(id); return e&&!e.hidden; };
  if(!P2.on){ if(vis('cover')&&$('p2New')&&!NHAC.bad['x2-mo-dau']) return 'x2-mo-dau'; return nhacMood1(); }
  let k; if(S.ended) k={ca_to:'x2-ket-cato',o_lai:'x2-ket-olai',mot_minh:'x2-ket-motminh',ban_dung:'x2-ket-bandung'}[S.ended]||'x2-ket-olai';
  else if(document.querySelector('.dd2')) k=S.hoi>=3?'x2-cuu':'x2-di-dem';
  else if(vis('game')||S.nghi>=70) k='x2-cang';
  else if(document.querySelector('.p2cardfull')||/^x2-(xe-dem|cong-sat|san-diemdanh|phong-toi|bo-song-dem)/.test(String(BGNOW||''))) k='x2-phim';
  else if(SC_NOW.some(x=>/^x_(mo|hd)$/.test(x))) k='x2-mo-dau';
  else if(P2.map==='trai'){ const h=hour(); k=h>=6&&h<19?'x2-trai-ngay':(S.day%2?'x2-trai-dem':'x2-trai-dem2'); }
  else k='x2-hem';
  while(k&&NHAC.bad[k]&&P2NHAC_FB[k]) k=P2NHAC_FB[k]; return k; };
