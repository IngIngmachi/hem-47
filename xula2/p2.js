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
  'x2-xe-dem':'ky-uc-2','x2-cong-sat':'trong-vp12','x2-phong-may':'trong-vp12','x2-san-diemdanh':'hem-dem',
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
  i.src='img2/'+name+'.webp'; }); }
function p2LoadImgs(){ const L=Object.keys(P2FB).map(p2Img);
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
async function trainImgs(){ await Promise.all([...new Set(TPROP.map(p=>p.k))].map(k=>p2Img(k))); for(const hk of TRAI_ORDER){ const k=hk.slice(4); const im=await p2Img(hk); if(!im){ IMG[hk]=facade(k,false); IMG[hk+'-dem']=facade(k,true); } } }

/* ---------------- bản đồ: hẻm 47 hoặc trại ---------------- */
let P1MAP=null;
function p2SetMap(m){ P2.map=m; S.map=m;
  if(!P1MAP) P1MAP={order:HOUSE_ORDER.slice(),lit:Object.assign({},LIT)};
  HOUSE_ORDER.length=0; Object.keys(LIT).forEach(k=>delete LIT[k]);
  if(m==='trai'){ TRAI_ORDER.forEach(h=>HOUSE_ORDER.push(h)); Object.assign(LIT,P2DATA.LIT_TRAI); }
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
  o.money=Math.max(600000,Math.min(((p1&&p1.tien)||650000)+(k==='tien'?20000000:0),40000000));
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
  P2ROWS.forEach(r=>ROWS_DEFAULT.push(r)); rebuild();
  NV.length=0; D.NV.forEach(x=>NV.push(x));
  const hn=$('hNghi'); if(hn){ hn.title='Quản lý trại nghi tới đâu'; if(hn.firstChild&&hn.firstChild.nodeType===3) hn.firstChild.textContent='Bị nghi '; }
  document.title='Hẻm 47 · Xứ Lạ (bản thử)'; }

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
    if(S.room==='phong3'&&(hour()>=18.5||hour()<5.5)&&P2REAL['x2-trong-phong3-dem']) return IMG['x2-trong-phong3-dem'];
    const k=P2ROOMIMG[S.room]; if(k&&P2REAL[k]) return IMG[k]; } return roomIm1(); };
const faceFor1=faceFor;
faceFor=function(name,n){ if(P2.on){ if(name==='Lâm'&&P2.map==='trai'&&P2REAL['face-lam-4']) return 'img2/face-lam-4.webp'; if(name==='Ngân'&&S.nhanh==='A'&&P2.map==='hem'&&P2REAL['face-ngan-4']) return 'img2/face-ngan-4.webp'; if(['Ông Chủ Lò','Người tuyển','Số lạ','Cô gái trẻ','Ông chú'].includes(name)) return faceFor1('?',n); const k=SPK[name]; const f=k&&p2Face(k); if(f) return f; } return faceFor1(name,n); };
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
frame=function(){ if(P2.on&&BGNOW==='den'){ const dpr=Math.min(2,window.devicePixelRatio||1); if(cv.width!==Math.round(cv.clientWidth*dpr)){ cv.width=Math.round(cv.clientWidth*dpr); cv.height=Math.round(cv.clientHeight*dpr); } g.setTransform(1,0,0,1,0,0); g.fillStyle='#000'; g.fillRect(0,0,cv.width,cv.height); return; }
  if(P2.on&&P2.map==='trai'&&!(BGNOW&&IMG[BGNOW])&&(S.scene==='street'||S.scene==='room')) return frameTrai(); return frame1(); };
function frameTrai(){ const dpr=Math.min(2,window.devicePixelRatio||1), cw=cv.clientWidth, ch=cv.clientHeight;
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
  g.fillStyle='rgba(30,34,40,.6)'; g.fillRect(0,GROUND-300,ML-30,320); g.font='600 22px "Oswald","Arial Narrow",sans-serif'; g.fillStyle='#cfd2d6'; g.textAlign='center'; g.fillText('CỔNG RA',(ML-30)/2,GROUND-240); g.textAlign='left';
  drawTProps();
  const D=[];
  for(const k in NPC){ if(npcInRoom(k)) continue; const n=NS[k]; if(n&&n.alpha>0) D.push({y:NFEET,f:()=>drawChar(g,k,n.x,NFEET,n.face,{walk:n.walk,ph:n.ph,t:tsec+k.length,alpha:n.alpha})}); }
  D.push({y:FEET,f:()=>drawChar(g,MEK,PL.x,FEET,PL.face,{walk:PL.walk,ph:PL.ph,t:tsec+1,crouch:PL.hidden})});
  D.sort((a,b)=>a.y-b.y).forEach(d=>d.f());
  g.restore();
  g.globalCompositeOperation='multiply'; g.fillStyle=key(GRK,h)[0]; g.fillRect(0,0,VW,VH);
  g.globalCompositeOperation='saturation'; g.fillStyle='rgba(128,128,128,.45)'; g.fillRect(0,0,VW,VH); g.globalCompositeOperation='source-over';
  if(nn>0){ g.save(); g.translate(-cam,0); g.globalCompositeOperation='lighter'; FL.forEach(x=>{ const gr=g.createRadialGradient(x,GROUND-470,2,x,GROUND-200,420); gr.addColorStop(0,'rgba(230,240,255,'+(.22*nn)+')'); gr.addColorStop(1,'rgba(230,240,255,0)'); g.fillStyle=gr; g.beginPath(); g.moveTo(x-20,GROUND-470); g.lineTo(x+20,GROUND-470); g.lineTo(x+260,FEET+30); g.lineTo(x-260,FEET+30); g.closePath(); g.fill(); }); g.restore(); g.globalCompositeOperation='source-over'; }
  overlays(); }

/* lời thoại: thẻ chữ lớn, dòng hiệu ứng, đổi nền, {me}/{ban} */
function p2Card(text){ return new Promise(res=>{ const d=document.createElement('div'); d.className='p2cardfull'; d.innerHTML='<p>'+esc(text)+'</p>'; document.body.appendChild(d); requestAnimationFrame(()=>d.classList.add('on')); try{ tone(110,.6,.04,'sine'); }catch(e){}
  let done=false; const end=()=>{ if(done) return; done=true; d.classList.remove('on'); setTimeout(()=>{ d.remove(); res(); },600); }; setTimeout(()=>{ d.onclick=end; },400); setTimeout(end,3000); }); }
const show1=show;
show=async function(r){ if(!P2.on) return show1(r);
  if(r.bg!=null){ BGNOW=r.bg||null; fade=.7; }
  if(r.kieu==='fx') return;
  if(r.kieu==='the'){ hideDlg(); await p2Card(p2t(r.loi)); return; }
  return show1(Object.assign({},r,{loi:p2t(r.loi),ai:p2t(r.ai)})); };
const choose1=choose;
choose=function(set,inPhone,title,face){ if(!P2.on) return choose1(set,inPhone,title,face);
  const s0=set[0]||{}; if(!title&&s0.q) title=p2t(s0.q);
  const view=set.map(r=>{ const v=Object.assign({},r,{loi:p2t(r.loi),sub:p2t(r.sub||'')}); if(r.disc&&!cond(r.disc)) v.dis=true; v._o=r; return v; });
  const p=choose1(view,inPhone,title,face).then(v=>v&&v._o?v._o:v);
  const tm=+s0.timer||0; if(!tm) return p;
  const d=$('dlg'); const bar=document.createElement('div'); bar.className='p2timer'; bar.style.width='100%'; d.insertBefore(bar,d.firstChild);
  requestAnimationFrame(()=>requestAnimationFrame(()=>{ bar.style.transition='width '+tm+'s linear'; bar.style.width='0%'; }));
  return new Promise(res=>{ let over=false; const to=setTimeout(()=>{ if(over) return; over=true; bar.remove(); const mac=s0.mac; const box=$('dCh');
      const r=mac>=0&&view[mac]?view[mac]:null; chooseFn=null; box.innerHTML=''; if(r){ toast('Hết giờ'); res(r._o); } else res({ma:'_het',loi:'',sau:''}); },tm*1000);
    p.then(v=>{ if(over) return; over=true; clearTimeout(to); bar.remove(); res(v); }); }); };
const runS1=runS;
runS=async function(key,opt){ if(!P2.on) return runS1(key,opt); const pre=key+'_';
  if(/^(x_|V_|kh_|noi_x)/.test(key)) Object.keys(S.ch).forEach(k=>{ if(k.startsWith(pre)) delete S.ch[k]; });
  const prev=BGNOW; try{ return await runS1(key,opt); } finally { if(BGNOW!==prev&&!SCENEBG[key]){ BGNOW=prev; fade=.5; } } };

/* ---------------- lịch trại ---------------- */
let camping=false;
const tick1=tick;
tick=async function(){ if(P2.on&&!S.ended&&!camping&&!sleeping&&P2.map==='trai'){ camping=true; try{ await p2Camp(); } finally { camping=false; } if(S.ended) return; }
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
    hideDlg(); hud(); save(); return; }
  if(hour()>=13&&hour()<19&&K('ch')){ if(d===18&&!hasC('x_tu')) await runS('x_tutai'); hideDlg(); BGNOW=null;
    const r=await caCa(1); if(hasF('x_canh_ngan')&&r.tinh>0) await runS('x_canhngan_ok');
    const thieu=3-CT(); if(thieu>0){ S.no=(S.no||0)+thieu*2000000; effects('+nghi:'+(6*thieu)); await runS('x_ca_thieu'); } else { effects('-nghi:3'); await runS('x_ca_du'); }
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
      if(S.day>=8&&S.day<19) await p2DiDem();
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
async function p2NewDay(){ const d=S.day;
  if(S.hoi===1){ S.vai=S.nhanh==='A'?(d%2===1&&d<7?'ngan':'lam'):'lam'; setME(); S.min=DAY_START; S.scene='street'; S.room=null; PL.x=S.vai==='ngan'?at('taphoa',.5):at('basau',.4); snapNPC(); fade=.9; chime();
    toast('Ngày '+d+' · '+fmtT(S.min)+(S.nhanh==='A'?' · hôm nay bạn là '+ME:'')); return; }
  S.vai=S.ai_vao||'lam'; setME();
  if(d===8){ S.min=19*60; putAt('xngu',.35); toast('Ngày 8 · 19:00 · được ra sân tới 22:00'); return; }
  S.min=6*60; S.scene='street'; S.room=null; await p2Card('NGÀY '+d+' · 5:00\nCHUÔNG CHÙA BÊN SÔNG'); S.min=7*60; putAt('xmay',.5); }
async function p2VaoTrai(){ S.vai=S.ai_vao||'lam'; setME(); p2SetMap('trai'); BGNOW=null; await runS('x_canh1'); hideDlg(); await runS('x_canh2'); hideDlg(); }

/* ---------------- đêm giải cứu ---------------- */
async function p2Rescue(){ if((S.lo||0)>=75||S.nghi>=100){ await runS('x_ban_dung'); hideDlg(); return p2Ending('ban_dung'); }
  await runS('x_cuu_mo'); hideDlg();
  const raidOK=hasF('x_tin_3g')&&hasF('x_vinh')&&(S.nhanh==='A'||hasF('x_tin_song')||hasF('x_goi_ok'));
  const raid=raidOK?180+Math.floor((S.lo||0)/25)*15:9999, xe=(S.lo||0)>=25?270:null;
  const groups=dsCon().filter(p=>!(S.nhanh==='A'&&S.ai_vao==='ngan'&&p.id==='ngan')).map(p=>{ const t=S.tin[p.id]||0; return {id:p.id,ten:p.ten,sp:p.id,can:t>=2?0:t===1?1:2,after:p.id==='ngan'&&t<4?240:0}; });
  const ex=[{ten:'Cổng chính',f:0,x:60,cost:hasF('x_ghe')?5:20}]; if(hasF('x_cua')) ex.push({ten:'Cửa sau',f:0,x:905,cost:hasF('x_ghe')?0:15}); if(hasF('x_rao')) ex.push({ten:'Rào sau bếp',f:0,x:740,cost:hasF('x_ghe')?0:15});
  const res=await sneak({mode:'cuu',groups,exits:ex,raid,xe,end:300,speed:1,siet:false});
  const outIds=res.out.map(g=>g.id), con=groups.filter(g=>!outIds.includes(g.id));
  S.p2ra=outIds; S.p2tong=groups.length; S.p2con=con.map(g=>g.id);
  let olai=null; if(con.length&&res.out.length){ const c=[]; if(S.nhanh==='A'&&S.ai_vao==='ngan') c.push(['Ngân',9]); if(con.some(g=>g.id==='ngan')&&(S.tin.ngan||0)>=3) c.push(['Ngân',S.tin.ngan]); if(con.some(g=>g.id==='khang')&&(S.tin.khang||0)>=3) c.push(['Khang',S.tin.khang]); if((S.tin.bay||0)>=3) c.push(['Chị Bảy',S.tin.bay]); c.sort((a,b)=>b[1]-a[1]); olai=c[0]?c[0][0]:null; }
  S.p2olai=olai; const nganRa=S.nhanh==='A'?true:outIds.includes('ngan');
  const k=!res.out.length?'mot_minh':(!con.length&&nganRa&&ocl()>=4&&S.ds.every(p=>p.con))?'ca_to':'o_lai';
  return p2Ending(k); }

/* ---------------- kết ---------------- */
async function p2Ending(k){ S.ended=k; save(); const ra=(S.p2ra||[]).map(id=>((S.ds||[]).find(p=>p.id===id)||{}).ten||id); const L=[]; const my=hasC('suy_x_my')||ocl()>=4;
  if(k==='ca_to'){ L.push('Năm giờ sáng. Chuông chùa bên sông. Chiếc ghe cuối cùng cập bờ bên này.','Ở cửa khẩu Mộc Bài, xe của Hương chờ sẵn. Mỗi người một ổ bánh mì, một chai nước.','Ra được: '+ra.join(', ')+'.','Ba ngày sau, đúng tiệc mừng thọ sáu mươi tuổi, bà Trần Thị Mỹ được mời lên làm việc. Bánh kem còn chưa cắt.','Một chiều tháng Mười Hai. Tạp hóa cô Thoa dọn thêm hai cái bàn nhựa ra hiên. Đủ người.','Con mèo mun nằm trên đùi Ngân. Cái chuông trên cổ nó vẫn không kêu.'); }
  else if(k==='o_lai'){ const o=S.p2olai; L.push('Năm giờ sáng. Chuông chùa bên sông.','Ra được: '+(ra.join(', ')||'không ai')+'.');
    if(o) L.push(o+' ở lại, đứng chặn cánh cửa cho những người khác chạy.','Tài xế Thoại quay ghe lại một lần nữa. Bờ bên kia chỉ còn đèn pin và tiếng chó.','Không ai biết '+o+' có thoát không.');
    else if((S.p2con||[]).length) L.push('Những người còn lại không kịp ra. Tiếng xe tải chạy về hướng xa hơn lúc trời vừa sáng.');
    else if((S.ds||[]).some(p=>!p.con)) L.push('Không ai bị bỏ lại đêm đó. Nhưng '+S.ds.filter(p=>!p.con).map(p=>p.ten).join(', ')+' đã bị chuyển đi từ trước. Trên danh sách của Hương, mấy cái tên đó vẫn còn để trống.');
    else L.push('Ra được hết. Nhưng Ông Chủ Lò vẫn chưa có tên trong hồ sơ.');
    if(S.nhanh==='A'&&S.ai_vao==='ngan'&&o==='Ngân') L.push('Ở hẻm 47, cô Thoa lại cắm sạc cái điện thoại cũ mỗi ngày. Lần thứ hai.');
    L.push(my?'Bà Trần Thị Mỹ được mời lên làm việc ngay trong tuần.':'Ở Sài Gòn, bà Trần Thị Mỹ vẫn tối Chủ nhật nào cũng ngồi đếm tiền.'); }
  else if(k==='mot_minh') L.push('Năm giờ sáng. '+ME+' lội qua đoạn sông cạn, một mình.','Không dẫn được ai ra.','Một tuần sau, '+ME+' viết một bài. Lần này đúng từng chữ.','Bài viết có 41 lượt xem.');
  else L.push('Khu dời đi trước giờ ập vào.','Xe tải chạy trong mưa. Không ai biết nó chạy về đâu.','Ba tuần sau, tài khoản cũ của Ngân nhận được một tin rác.','Ghép chữ đầu câu, ra một cái tên: L. A. M.');
  if(k!=='ca_to'&&!my) L.push('Ở một nơi khác, một bà già sáu mươi tuổi tắt ứng dụng đổi giọng, rót trà, rồi gọi cho con trai: "Mấy đứa đó để má lo."');
  let got=[]; try{ got=JSON.parse(lsGet('tgl_chuong2_ket')||'[]'); }catch(e){} if(!got.includes(k)) got.push(k); lsSet('tgl_chuong2_ket',JSON.stringify(got));
  hideDlg(); closePhone(); const name=(ENDS[k]||['',''])[1];
  const EB={ca_to:P2REAL['x2-tiec-taphoa']?'x2-tiec-taphoa':'x2-cua-khau-sang',o_lai:'x2-ket-o-lai',mot_minh:'x2-ket-mot-minh',ban_dung:'x2-ket-ban-dung'}[k];
  /* 1. chữ chạy, cùng kiểu kết Phần 1 */
  await new Promise(res=>{ let el=$('typeEnd'); if(!el){ el=document.createElement('div'); el.id='typeEnd'; document.body.appendChild(el); }
    el.innerHTML='<div class="te-in"><div class="te-tx" id="teTx"></div><div class="te-c2" id="teC2" hidden><div class="te-k">HẺM 47 · PHẦN 2 · XỨ LẠ</div><div class="te-n">'+esc(name)+'</div><div class="te-s">Kết '+got.length+'/4</div></div><button type="button" class="te-go" id="teGo" hidden>Xem tổng kết</button><div class="te-skip" id="teSkip">bấm để tua nhanh</div></div>';
    el.style.background='linear-gradient(rgba(5,6,10,.78),rgba(5,6,10,.92)),#05060a '+(EB&&P2REAL[EB]?'url(img2/'+EB+'.webp) center/cover':'');
    el.hidden=false; const tx=$('teTx'); let skip=false, li=0, ci=0, cur=null, done=false;
    const fin=()=>{ if(done) return; done=true; tx.innerHTML=L.map((l,i)=>'<p'+(i===L.length-1?' class="te-last"':'')+'>'+esc(l)+'</p>').join(''); $('teSkip').hidden=true; setTimeout(()=>{ $('teC2').hidden=false; tone(110,1.6,.05,'sine'); tone(165,1.6,.03,'sine',.05); setTimeout(()=>{ $('teGo').hidden=false; },1400); },700); };
    el.onclick=e=>{ if(e.target.id==='teGo'){ el.hidden=true; res(); return; } if(!done) skip=true; };
    const step=()=>{ if(skip||li>=L.length){ fin(); return; }
      if(ci===0){ cur=document.createElement('p'); if(li===L.length-1) cur.className='te-last'; tx.appendChild(cur); }
      const line=L[li]; ci+=2; cur.textContent=line.slice(0,ci); if(ci>=line.length){ cur.textContent=line; li++; ci=0; setTimeout(step,650); } else setTimeout(step,22); };
    step(); });
  /* 2. thẻ tổng kết trên màn bìa, cùng khung kết Phần 1 */
  S.scene='place'; S.place=null; BGNOW=(EB&&P2REAL[EB])?EB:BGNOW; fade=1; hud();
  const c=$('cover'); c.hidden=false; c.classList.add('solid');
  const so=S.so||[], mat=(S.ds||[]).filter(p=>!p.con).map(p=>p.ten);
  const allK=['ca_to','o_lai','mot_minh','ban_dung'];
  c.querySelector('.in').innerHTML='<div class="sub">KẾT THÚC PHẦN 2 · NGÀY '+S.day+'</div><h2 class="cl">'+esc(name)+'</h2>'+
    '<div class="sum"><div><b>'+(S.p2ra||[]).length+'/'+(S.p2tong||0)+'</b><span>người ra tới sông</span></div><div><b>'+ocl()+'/5</b><span>chứng cứ Ông Chủ Lò</span></div><div><b>'+so.length+'</b><span>người mất tiền vì tin bạn gửi</span></div></div>'+
    '<p class="sub">'+allK.map(x=>got.includes(x)?esc(ENDS[x][1]):'???').join(' · ')+'</p>'+
    (so.length?'<details class="p2sod"><summary>Sổ nạn nhân · '+so.length+' người</summary><ol>'+so.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ol></details>':'')+
    (mat.length?'<details class="p2sod"><summary>Bị chuyển đi · '+mat.length+' người</summary><ol>'+mat.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ol></details>':'')+
    '<p class="p2">Thủ đoạn trong game hư cấu từ các vụ việc báo chí và cơ quan chức năng đã công bố. Được mời đi làm "việc nhẹ lương cao" ở nước ngoài, hãy báo công an nơi gần nhất.</p>'+
    '<div class="row"><button class="btn" type="button" id="p2Again">Chơi lại Phần 2</button><button class="btn ghost" type="button" id="p2Home">Về màn đầu</button></div>';
  if(!$('p2sodCss')){ const st=document.createElement('style'); st.id='p2sodCss'; st.textContent='.p2sod{max-width:520px;margin:10px auto;text-align:left;color:#b9b3a6;font-size:14px}.p2sod summary{cursor:pointer;color:#efe8d8;padding:6px 0}.p2sod ol{margin:6px 0 0 18px;line-height:1.7}'; document.head.appendChild(st); }
  $('p2Again').onclick=()=>{ lsDel(P2SAVE); location.reload(); }; $('p2Home').onclick=()=>location.reload(); }
const ending1=ending, finale1=finale;
finale=async function(){ if(!P2.on) return finale1(); };
ending=async function(k){ if(!P2.on) return ending1(k); return p2Ending(k); };

/* ---------------- màn đầu: thêm nút Phần 2 ---------------- */
function p2p1(){ try{ return JSON.parse(lsGet('tgl_chuong1')||'null'); }catch(e){ return null; } }
function p2Buttons(){ const row=document.querySelector('#cover .row'); if(!row||$('bP2')||P2.on) return;
  const b=document.createElement('button'); b.className='btn'; b.id='bP2'; b.type='button'; b.textContent='Phần 2 · Xứ Lạ'; b.style.background='#e2645c'; b.style.color='#fff';
  row.insertBefore(b,row.firstChild); b.onclick=()=>p2Menu(); }
function p2Menu(){ const c=$('cover'); const p1=p2p1(), sv=lsGet(P2SAVE); const K={phuong:'Người lên tiếng',imlang:'Im lặng đúng lúc',bocphot:'Bóc phốt',tien:'Nhận tiền',hetgio:'Hết giờ'};
  const k=p1&&p1.ket; const nh=(k==='phuong'||k==='imlang')?'A':'B';
  c.querySelector('.in').innerHTML='<div class="kick">HẺM 47 · PHẦN 2 · BẢN THỬ</div><h2 class="cl" style="font-size:56px">Xứ Lạ</h2><p>Có những người rời hẻm 47 với một tờ giấy khám sức khỏe và một lời hứa lương ba chục triệu. Họ không gọi điện về.</p>'+
    '<p class="sub">'+(p1?'Phần 1 của bạn kết ở: <b>'+esc(K[k]||k)+'</b>. '+(nh==='A'?'Ngân đã về.':'Ngân chưa về.'):'Chưa thấy bài lưu Phần 1 trên máy này: vào như kết "Hết giờ".')+'</p>'+
    '<p class="sub">Chơi thử với kết khác: <select id="p2k" style="font:inherit;background:#20263a;color:#efe8d8;border:1px solid #2e3549;border-radius:8px;padding:4px"><option value="">(theo bài lưu)</option>'+Object.keys(K).map(x=>'<option value="'+x+'">'+K[x]+'</option>').join('')+'</select> <label><input type="checkbox" id="p2kl"> Khoa đã lật</label> <label><input type="checkbox" id="p2tu"> đã vạch anh Tú</label> <label><input type="checkbox" id="p2cg"> nói thật với cô Thoa</label> <label><input type="checkbox" id="p2ph"> Phát làm chứng</label></p>'+
    '<div class="row">'+(sv?'<button class="btn" id="p2Cont" type="button">Chơi tiếp Phần 2</button>':'')+'<button class="btn'+(sv?' ghost':'')+'" id="p2New" type="button">Chơi mới Phần 2</button><button class="btn ghost" id="p2Back" type="button">Về Phần 1</button></div>'+
    '<p class="sub" style="margin-top:16px;border-left:3px solid #e2645c;padding-left:10px">18+. Có nội dung về lừa đảo, mua bán người và giam giữ, không có cảnh bạo lực trực diện. Thủ đoạn trong game được hư cấu lại từ những vụ việc báo chí và cơ quan chức năng đã công bố để cảnh báo. Nhân vật và địa danh là hư cấu. Nếu bạn hoặc người quen được mời đi làm "việc nhẹ lương cao" ở nước ngoài, hãy báo công an nơi gần nhất.</p>';
  $('p2Back').onclick=()=>location.reload();
  if($('p2Cont')) $('p2Cont').onclick=()=>p2Begin(true);
  $('p2New').onclick=()=>{ if(sv&&!confirm('Chơi mới sẽ xóa bài lưu Phần 2 trên máy này. Tiếp tục?')) return; let p=p1; const v=$('p2k').value;
    if(v||$('p2kl').checked||$('p2tu').checked||$('p2cg').checked||$('p2ph').checked) p=Object.assign({},p1||{},{ket:v||(p1&&p1.ket)||'hetgio',co:Object.assign({},(p1&&p1.co)||{},{khoa_lat:$('p2kl').checked,tu_lo:$('p2tu').checked,noi_cuocgoi:$('p2cg').checked,phat_nhanchung:$('p2ph').checked})});
    lsDel(P2SAVE); p2Begin(false,p); }; }
async function p2Begin(cont,p1){ ac(); P2.on=true; await p2LoadImgs(); await trainImgs(); p2Install();
  let o=null; if(cont){ try{ o=JSON.parse(lsGet(P2SAVE)||'null'); }catch(e){} }
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
window.P2JUMP=async d=>{ if(!P2.on) return; if(d>=8){ buildDs(); S.hoi=d>=19?3:2; setCo('hoi2'); setCo('x_mon_xong'); S.ai_vao=S.ai_vao||'lam'; S.vai=S.ai_vao; setME(); p2SetMap('trai'); S.day=d; S.min=d===8?19*60:7*60; putAt('xngu',.35); hud(); save(); await tick(); } };
/* thành tựu Phần 1 không chấm khi đang chơi Phần 2 */
const ttCheck1=ttCheck; ttCheck=function(){ if(P2.on) return; return ttCheck1.apply(this,arguments); };
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
