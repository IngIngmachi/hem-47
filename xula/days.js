/* Hẻm 47 · Phần 2 — lịch 21 ngày: việc từng buổi ở ngoài, lịch trại, đêm giải cứu, các kết. */
'use strict';
const ROLE_A={1:'ngan',2:'lam',3:'ngan',4:'lam',5:'ngan',6:'lam',7:'lam'};
const DAYNAME={1:'Mở đầu',2:'',3:'',4:'',5:'',6:'',7:'Đêm cuối ở Sài Gòn'};

/* ---------------- việc ở ngoài (Hồi 1) ---------------- */
/* nh: A/B/*, vai: lam/ngan/*, d:[từ,tới], b: buổi được làm (mặc định 0–3), chinh: việc chính, lap: làm lại được */
const TASKS=[
 // nhánh A
 {id:'a_giaitin',ten:'Giải tin của số lạ',sub:'đọc chữ đầu câu',ai:'Ngân',nh:'A',vai:'ngan',d:[1,1],chinh:1,run:()=>SC.a_giaitin()},
 {id:'a_sodo',ten:'Vẽ lại sơ đồ trại cũ',sub:'từ trí nhớ',ai:'Ngân',nh:'A',vai:'ngan',d:[1,1],b:[2,3,4],chinh:1,run:()=>SC.a_sodo()},
 {id:'a_huong',ten:'Gặp Hương ở quán Thảo Điên',sub:'gọi xe',ai:'Hương',nh:'A',vai:'lam',d:[2,2],chinh:1,run:()=>SC.a_huong()},
 {id:'a_vi',ten:'Lần ví của Anh Hai',sub:'laptop phòng 3',ai:'Lâm',nh:'A',vai:'lam',d:[2,2],chinh:1,run:()=>SC.a_vi()},
 {id:'a_thoa',ten:'Về tạp hóa gặp mẹ',sub:S=>'máy cũ của Ngân',ai:'Cô Thoa',nh:'A',vai:'ngan',d:[3,3],chinh:1,run:()=>SC.a_thoa()},
 {id:'a_giong',ten:'Nghe tin thoại Nhi chuyển ra',sub:'tai nghe, nghe kỹ tiếng nền',ai:'Ngân',nh:'A',vai:'ngan',d:[3,3],b:[2,3,4],chinh:1,run:()=>SC.a_giong()},
 {id:'a_vinh',ten:'Gặp đại úy Vinh',sub:'công an phường',ai:'Đại úy Vinh',nh:'A',vai:'lam',d:[4,4],chinh:1,run:()=>SC.a_vinh()},
 {id:'a_khoa',ten:'Thăm anh Khoa ở trại tạm giam',sub:'đường lên xe đợt mới',ai:'Anh Khoa',nh:'A',vai:'lam',d:[4,4],need:()=>S.co.khoa_lat,chinh:1,run:()=>SC.a_khoa()},
 {id:'a_thoai',ten:'Tìm Tài xế Thoại ở bến',sub:'giá ghe, giờ nước lên',ai:'Tài xế Thoại',nh:'A',vai:'ngan',d:[5,5],chinh:1,run:()=>SC.a_thoai()},
 {id:'a_gom',ten:'Gom tiền trong hẻm',sub:'Bà Sáu, Bin, cô Thoa',ai:'Bà Sáu',nh:'A',vai:'lam',d:[6,6],chinh:1,run:()=>SC.a_gom()},
 {id:'a_noi',ten:'Nối ví với tin thoại',sub:'tìm ra Ông Chủ Lò ở đâu',ai:'Lâm',nh:'A',vai:'lam',d:[6,6],need:()=>has('vi'),chinh:1,run:()=>SC.a_noi()},
 {id:'a_cainhau',ten:'Ai vào trại',sub:'phòng 3, mười một giờ đêm',ai:'Ngân',nh:'A',vai:'*',d:[7,7],chinh:1,run:()=>SC.a_caiNhau()},
 // nhánh B
 {id:'b_basau',ten:'Ngồi với Bà Sáu',sub:'hiên nhà',ai:'Bà Sáu',nh:'B',vai:'lam',d:[1,2],run:async()=>{ await bg('trong-hienbasau'); await L([['Bà Sáu','Con ăn chưa. Ăn đi rồi tính.'],['Bà Sáu','Hồi đó bà đếm mười hai đứa đi từ cái gác đó. Bà chưa từng nghĩ tới đứa thứ mười ba lại là con.']]); tin('basau',1); }},
 {id:'b_tratin',ten:'Tra tin khu Bavet dời đi đâu',sub:'laptop',ai:'Lâm',nh:'B',vai:'lam',d:[2,2],chinh:1,run:async()=>{ await bg('trong-phong3'); await L([['','Báo mạng đưa tin: một khu ở Bavet "tự giải tán" hai tháng trước. Hình chụp từ trên cao: dãy nhà trống, cổng mở toang.'],['','Dưới bài có một bình luận đã bị xóa, còn sót bản chụp màn hình: "dời hết qua Xi Ha rồi, khu cũ casino sát sông".'],['~Lâm','Xi Ha Núc. Hương chắc biết chỗ.']]); }},
 {id:'b_huong',ten:'Gặp Hương ở quán Thảo Điên',sub:'gọi xe',ai:'Hương',nh:'B',vai:'lam',d:[3,3],chinh:1,run:()=>SC.b_huong()},
 {id:'b_vinh',ten:'Gặp đại úy Vinh',sub:'công an phường',ai:'Đại úy Vinh',nh:'B',vai:'lam',d:[3,3],chinh:1,run:()=>SC.b_vinh()},
 {id:'b_sodo',ten:'Dò sơ đồ trại',sub:S=>S.co.phat_nhanchung?'hẹn Phát ở bến':'nhóm người về từ Cam',ai:'Phát',nh:'B',vai:'lam',d:[4,4],chinh:1,run:()=>SC.b_sodo()},
 {id:'b_duong',ten:'Tìm đường lên xe đợt mới',sub:S=>S.co.khoa_lat?'thăm anh Khoa':'nộp hồ sơ ở văn phòng quận khác',ai:'Anh Khoa',nh:'B',vai:'lam',d:[4,4],chinh:1,run:()=>SC.b_duong()},
 {id:'kham',ten:'Đi khám sức khỏe đi làm',sub:'tờ giấy hẹn y như của Ngân',ai:'Lâm',nh:'B',vai:'lam',d:[5,5],chinh:1,run:()=>SC.kham()},
 {id:'tapma',ten:'Tập mã chữ đầu câu với Bin',sub:'Bin đóng vai quản lý',ai:'Bin',nh:'B',vai:'lam',d:[5,5],chinh:1,run:()=>SC.tapma()},
 {id:'b_thoai',ten:'Gặp Tài xế Thoại',sub:'giá ghe',ai:'Tài xế Thoại',nh:'B',vai:'lam',d:[6,6],chinh:1,run:()=>SC.b_thoai()},
 {id:'b_gom',ten:'Gom tiền trong hẻm',sub:'ai còn tin mình',ai:'Bà Sáu',nh:'B',vai:'lam',d:[6,6],chinh:1,run:()=>SC.b_gom()},
 // chung
 {id:'tra_ghe',ten:'Trả tiền ghe cho Tài xế Thoại',sub:'2.500.000đ',ai:'Tài xế Thoại',nh:'*',vai:'*',d:[5,7],need:()=>(S.done.a_thoai||S.done.b_thoai)&&!has('ghe'),run:async()=>{ if(S.tien<2500000){ await say('Tài xế Thoại','Chưa đủ thì thôi. Ghe hổng chờ ai.'); return; } tien(-2500000); flag('ghe'); await say('Tài xế Thoại','Rồi. Đêm nào, mấy giờ, nhắn tui một chữ.'); }},
 {id:'mon',ten:'Chọn món mang theo',sub:'chỉ giấu được một món',ai:'Lâm',nh:'*',vai:'*',d:[7,7],chinh:1,need:()=>S.nhanh==='B'||S.ai_vao,run:()=>SC.monGiau()},
 {id:'gap',ten:'Chạy Gáp kiếm tiền',sub:'+250.000đ một buổi',ai:'Lâm',nh:'*',vai:'lam',d:[1,7],lap:1,run:async()=>{ await bg('x2-hem-mua'); await say('','Mấy cuốc xe đêm. Mưa lất phất. Một khách nữ ngồi sau khóc suốt đoạn đường mà không nói gì.'); tien(250000); }},
 {id:'phu',ten:'Phụ tạp hóa',sub:'+150.000đ',ai:'Cô Thoa',nh:'A',vai:'ngan',d:[1,7],lap:1,run:async()=>{ await bg('trong-taphoa'); await say('','Ngân xếp lại kệ mì gói. Có khách nhận ra cô, bỏ đi không mua.'); tien(150000); }}
];
const subOf=t=>typeof t.sub==='function'?t.sub(S):(t.sub||'');
function tasksNow(){ const d=S.ngay, b=S.buoi;
  return TASKS.filter(t=>(t.nh==='*'||t.nh===S.nhanh)&&(t.vai==='*'||t.vai===S.vai)&&d>=t.d[0]&&d<=t.d[1]&&(t.b||[0,1,2,3]).includes(b)&&(t.lap||!S.done[t.id])&&(!t.need||t.need())); }

async function panelPick(title,goal,items,extra){ return new Promise(async res=>{ hideDlg(); const p=$('panel'); p.hidden=false;
  let h='<h3>'+esc(title)+'</h3>'+(goal?'<p class="goal">'+esc(goal)+'</p>':'')+'<div class="tasks">';
  for(let i=0;i<items.length;i++){ const t=items[i]; const fu=await imgUrl(FACE[t.ai]||'face-lam-1'); h+='<button type="button" class="task'+(t.chinh?' chinh':'')+'" data-i="'+i+'"><img alt="" src="'+fu+'"><span><b>'+esc(t.ten)+'</b><small>'+esc(subOf(t))+'</small></span></button>'; }
  h+='</div><div class="row">'+(extra||[]).map((e,i)=>'<button type="button" class="btn ghost" data-x="'+i+'">'+esc(e)+'</button>').join('')+'</div>';
  p.innerHTML=h; p.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{ p.hidden=true; res({t:items[+b.dataset.i]}); }); p.querySelectorAll('[data-x]').forEach(b=>b.onclick=()=>{ p.hidden=true; res({x:+b.dataset.x}); });
  p.scrollIntoView({block:'nearest',behavior:'smooth'}); }); }

function goalText(){ const d=S.ngay;
  if(d<=7) return S.nhanh==='A'?'Bảy ngày để chuẩn bị: biết chỗ, có tiền ghe, có người bên trong, và chốt ai vào trại.':'Bảy ngày để chuẩn bị: biết trại ở đâu, có đường lên xe, có tiền ghe, và học cách nhắn ra.';
  if(d<=18){ const c=[]; if(S.nhanh==='B'&&!has('tin_song')&&!has('goi_ok')) c.push('báo chỗ ra ngoài (SONG)'); if(!has('tin_3g')) c.push('báo giờ ập vào (3G)'); if(!has('cua')&&!has('rao')) c.push('mở một lối ra sông'); if(S.nhanh==='B'&&(S.tin.ngan||0)<4) c.push('lấy lòng tin Ngân ('+(S.tin.ngan||0)+'/4)');
    return c.length?'Còn phải: '+c.join(' · ')+'.':'Đủ rồi. Giữ yên tới đêm.'; }
  return ''; }

/* ---------------- một ngày ---------------- */
async function playDay(){ const d=S.ngay; S.f.chitieu=0; S.buoi=0; hud();
  if(d<=7) await outsideDay(); else if(d<=18) await insideDay(); else if(d===19) await day19(); else { await rescueNight(); return; }
  if(S.ket) return;
  if(d>=8&&d<=18&&S.nghi>=100) await phongToi();
  S.ngay++; S.buoi=0; if(S.f.siet>0&&d>=17) S.f.siet--; save(true); }

async function outsideDay(){ const d=S.ngay; S.vai=S.nhanh==='A'?(ROLE_A[d]||'lam'):'lam'; trai(false); cine(false); dark(false); hud();
  if(d===1) await (S.nhanh==='A'?SC.moA():SC.moB());
  else await card('NGÀY '+d+(S.nhanh==='A'?' · '+who().toUpperCase():'')+(DAYNAME[d]?'\n'+DAYNAME[d].toUpperCase():''));
  await bg(S.vai==='ngan'?'x2-taphoa-chieu':(S.nhanh==='B'&&S.ket1==='bocphot'?'x2-hien-basau-dem':'hem-dem'));
  while(S.buoi<5){ hud(); dark(S.buoi>=3);
    const list=tasksNow(); const extra=[S.buoi<4?'Chờ một buổi':'Đi ngủ'];
    const r=await panelPick(BUOI[S.buoi]+' · Ngày '+d+(S.nhanh==='A'?' · '+who():''),goalText(),list,extra);
    if(r.t){ await r.t.run(); if(!r.t.lap) S.done[r.t.id]=1; }
    else if(S.buoi===4) break;
    S.buoi++; hideDlg(); }
  /* việc chính chưa làm thì kịp làm lúc khuya, để truyện không gãy */
  const miss=TASKS.filter(t=>t.chinh&&!S.done[t.id]&&(t.nh==='*'||t.nh===S.nhanh)&&t.d[1]===d&&(!t.need||t.need()));
  for(const t of miss){ const keep=S.vai; if(t.vai!=='*') S.vai=t.vai; await say('','Khuya rồi. Còn một việc không để tới mai được.'); await t.run(); S.done[t.id]=1; S.vai=keep; }
  if(S.nhanh==='A'&&d===5) await SC.a_tin2();
  if(d===7){ await SC.demCuoi(); if(S.nhanh==='A') S.vai=S.ai_vao; }
  dark(false); }

/* ---------------- trong trại ---------------- */
const KHE=[
 {id:'thuyGap',ten:'Buồng tắm, giờ tắm',sub:'Thủy hẹn',ai:'Thủy',when:[3],need:()=>S.nhanh==='B'&&has('thuy_biet')&&!has('thuy_chi_ngan'),run:()=>SC.thuyGap()},
 {id:'nganB1',ten:'Ngồi gần Ngân giờ cơm',sub:'tổ trưởng phòng máy 2',ai:'Ngân',when:[1,3],need:()=>S.nhanh==='B'&&has('thuy_chi_ngan')&&!has('ngan_nghe'),run:()=>SC.nganB1()},
 {id:'canhNgan',ten:'Xin đổi chỗ ngồi cạnh Ngân',sub:'ca chiều, phòng máy 2',ai:'Ngân',when:[1],need:()=>S.nhanh==='B'&&(S.tin.ngan||0)===1&&has('ngan_nghe'),run:async()=>{ await say('','Chị Bảy gật đầu, không hỏi. Chiều nay '+who()+' ngồi bàn sát bàn Ngân.'); flag('canh_ngan'); }},
 {id:'vu3',ten:'Tìm ai báo cho quản lý',sub:'tuần tra đổi giờ bất thường',ai:'Toàn',when:[1,3],need:()=>has('vu3')&&!has('vu3_xong'),run:()=>SC.vu3()},
 {id:'giauGui',ten:'Gửi tin giấu chữ ra ngoài',sub:S=>'cần ghép: '+nextWord(),ai:'Lâm',when:[2],need:()=>has('may')&&!!nextWord(),run:()=>sendWord()},
 {id:'xinchia',ten:'Xin Chị Bảy chìa cửa sau',sub:'chị đã tin mình',ai:'Chị Bảy',when:[3],need:()=>has('bay_lat')&&!has('chia'),run:async()=>{ await L([['Chị Bảy','Chị hổng đưa. Chị để quên trên bàn lầu ba. Đêm nay.'],['','Sáng ra, '+who()+' tìm thấy chiếc chìa dưới gối.']]); flag('chia'); }},
 {id:'muachuoc',ten:'Đút lót lính gác',sub:'500.000đ người ngoài chuyển, bớt bị nghi',ai:'Sẹo',when:[3],need:()=>S.nghi>=40&&S.tien>=500000,run:async()=>{ tien(-500000); nghi(-15); await say('','Lính gác đếm tiền trên điện thoại, nhìn đi chỗ khác. Mấy hôm nay hắn sẽ nhìn đi chỗ khác.'); }}
];
function nextWord(){ if(S.nhanh==='B'&&!has('tin_song')&&!has('goi_ok')) return 'SONG'; if(!has('tin_3g')&&S.ngay>=14) return '3G'; return ''; }
async function sendWord(){ const w=nextWord(); const r=await giauChu(w,S.mon==='sim'?'SIM riêng, quản lý ít đọc':'quản lý đọc lướt');
  if(!r.dung){ await say('~@','Ghép không ra chữ. Bên ngoài sẽ chỉ thấy một tin hỏi thăm bình thường.'); return; }
  if(r.vung&&S.mon!=='sim') nghi(10);
  flag(w==='SONG'?'tin_song':'tin_3g'); flag('cho_xacnhan',w); await say('~@','Đã gửi. Giờ chờ tin rác trả lời.'); }
function kheNow(slot){ const items=[];
  KHE.forEach(k=>{ if(k.when.includes(slot)&&!S.done[k.id+S.ngay]&&!(S.done[k.id]&&k.id!=='giauGui')&&k.need()) items.push(k); });
  if(slot===1||slot===3){ dsCon().forEach(p=>{ if(p.id==='ngan'&&(S.tin.ngan||0)<2) return; if(S.nhanh==='A'&&S.ai_vao==='ngan'&&p.id==='ngan') return; if(S.done['noi_'+p.id+S.ngay]) return;
    items.push({id:'noi_'+p.id,ten:'Nói chuyện với '+p.ten,sub:p.ghi,ai:p.ten==='Anh Lộc'?'Anh Lộc':p.ten,daily:1,run:()=>SC.noi(p.id)}); }); }
  return items; }
async function khe(slot,label){ const items=kheNow(slot); if(!items.length) return;
  const r=await panelPick(label+' · Ngày '+S.ngay,goalText(),items,['Ngồi im, không làm gì']);
  if(r.t){ await r.t.run(); S.done[(r.t.daily?r.t.id:r.t.id)+S.ngay]=1; if(!r.t.daily&&r.t.id!=='giauGui') S.done[r.t.id]=1; } }

async function caDay(n,label){ if(S.ngay<9) return; const auto=S.ngay>=11?await caMontage():null; const r=auto||await caNhan(n);
  if(has('canh_ngan')&&r.tinh>0&&(S.tin.ngan||0)===1){ await L([['','Ngân liếc qua màn hình bên cạnh. Thấy chữ "chuyễn". Cô nhìn '+who()+' một giây, rồi nhìn lại màn hình mình.'],['Ngân','(nói rất nhỏ) Ai dạy anh cái đó.']]); tin('ngan',1); delete S.f.canh_ngan; } }

const MUC_OK=()=>{ const o=[]; const d=S.ngay;
  const add=k=>o.push(k);
  if(!has('may')&&(has('to_biet')||has('thuy_chi_ngan'))) add('lay_may');
  if(S.nhanh==='B'&&has('ngan_nghe')&&(S.tin.ngan||0)>=2&&!has('ngan_b3')) add('gap_ngan');
  if(!has('tuan0')) add('do_t1');
  if(!has('sodo3')) add('do_t3');
  if(!has('kim')) add('lay_kim');
  if(has('kim')&&!has('rao')) add('cat_rao');
  if(has('chia')&&!has('so_chup')) add('chup_so');
  if(has('chia')&&!has('cua')) add('mo_cua');
  if(d>=12&&!has('nghe_len')) add('nghe_len');
  return o; };
async function diDem(){ const ops=MUC_OK(); if(!ops.length){ await say('','Đêm. Không còn việc gì phải đi. Ngủ.'); return; }
  const r=await panelPick('Đêm · Ngày '+S.ngay,(S.f.siet>0?'Trại đang siết: tuần tra gấp đôi. ':'')+'Đi đêm thì sáng mai mệt, ca nhắn tin khó hơn. Bị thấy là Quản lý nghi +20.',ops.map(k=>({id:k,ten:MUC[k].ten,sub:MUC[k].why,ai:who(),run:null})),['Ngủ']);
  if(!r.t) return; const k=r.t.id; dark(true);
  const res=await sneak({mode:'didem',muc:k,night:S.f.siet>0?2:0,limit:S.f.siet>0?90:110});
  dark(false);
  if(res.kq==='bat'){ await L([['','Đèn pin rọi thẳng mặt. '+who()+' bị lôi về phòng.'],['Sẹo','Lần sau là phòng tối.']]); nghi(20); return; }
  if(res.kq==='het'){ await say('','Trời hửng sáng. Phải quay về trước khi điểm danh, tay không.'); return; }
  if(res.kq==='xong_tre'){ await say('','Về tới phòng thì vừa kịp tiếng chuông. Mồ hôi ướt áo.'); nghi(5); }
  switch(k){
    case 'lay_may': flag('may'); await say('~@','Một cái điện thoại cũ, dán băng keo dưới đáy thùng nước buồng tắm. Có pin, có Za Lô.'); break;
    case 'gap_ngan': flag('ngan_b3'); await SC.nganB3(); break;
    case 'do_t1': flag('tuan0'); await say('~@','Lính gác trệt đi một vòng mất sáu phút. Đi qua cửa sau đúng phút thứ tư.'); break;
    case 'do_t3': flag('sodo3'); await say('~@','Lầu ba: kho bên trái, văn phòng quản lý bên phải. Ngăn kéo bàn có khóa.'); break;
    case 'lay_kim': flag('kim'); await say('~@','Cây kìm cắt kẽm, nặng tay. Giấu dưới gầm giường tầng.'); break;
    case 'cat_rao': flag('rao'); await say('~@','Cắt được một khoảng đủ một người lách qua. Dựng lại cho thẳng, nhìn từ xa không thấy.'); break;
    case 'chup_so': await SC.chupSo(); break;
    case 'mo_cua': flag('cua'); await say('~@','Ổ khóa cửa sau đã mở, chốt trong vẫn gài. Đêm đó chỉ cần rút chốt.'); break;
    case 'nghe_len': await SC.ngheLen(); break; }
}

async function insideDay(){ const d=S.ngay; if(S.nhanh==='A'){ S.vai=S.ai_vao||'lam'; if(S.ai_vao==='ngan') flag('meo_cailoi'); } trai(true); cine(true); dark(false); hud();
  if(S.f.toi_skip===d){ await card('NGÀY '+d+'\nPHÒNG TỐI'); await say('','Một ngày không có cửa sổ. Không ai tới. Một chai nước.'); return; }
  if(d===8){ await SC.canh1(); await SC.canh2(); await bg('x2-phong-ngu'); await L([['','Tối. Phòng ngủ tổ 3. Ba dãy giường tầng, một bóng đèn vàng. Không ai hỏi tên ai.']]); await khe(3,'Tối'); return; }
  await card('NGÀY '+d+' · 5:00\nCHUÔNG CHÙA BÊN SÔNG');
  /* sáng */
  if(d===9) await SC.canh3();
  await bg('x2-phong-may'); await caDay(2,'Ca sáng');
  /* trưa */
  S.buoi=1; hud(); await bg('x2-nha-an');
  if(d===9){ if(S.nhanh==='B') await SC.thuyNhan(); else if(S.ai_vao==='lam') await SC.toCuLam(); else await SC.toCuNgan(); }
  else if(d===11&&S.nhanh==='B') await SC.nguoiBan();
  else if(d===13) await SC.bay();
  else if(d===14) await SC.canh5();
  else if(d===15) await SC.khang();
  else if(d===18) { if(!S.co.tu_lo) await SC.tuTai(); }
  if(!(S.f.phat_thay===d)) await khe(1,'Trưa');
  /* chiều */
  S.buoi=2; hud(); await bg('x2-phong-may'); await caDay(1,'Ca chiều');
  const thieu=3-(S.f.chitieu||0); if(d>=9){ if(thieu>0){ nghi(8*thieu); noTrai(thieu*2000000); await say('','Bảng chỉ tiêu cuối ngày: thiếu '+thieu+'. Nợ trại cộng thêm.'); } else nghi(-3); }
  await khe(2,'Chiều · có máy thì gửi tin');
  /* tối */
  S.buoi=3; hud(); await bg('x2-phong-ngu');
  if(d===12&&!has('vu3')) await SC.vu3Mo();
  if(d===13) await SC.canh4();
  if(d===16) await SC.canh6();
  if(S.nhanh==='A'&&[11,14,17].includes(d)) await SC.ngoaiA({11:1,14:2,17:3}[d]);
  await khe(3,'Tối');
  /* đêm */
  S.buoi=4; hud(); dark(true);
  if(has('cho_xacnhan')){ const w=S.f.cho_xacnhan; delete S.f.cho_xacnhan;
    const ok=await SC.tinVao(w==='SONG'?'Ông bà mình dạy ở hiền gặp lành.\nKhuyến mãi tháng này giảm 30%.':'Ông bà mình dạy ở hiền gặp lành.\nKhuyến mãi tháng này giảm 30%.','OK');
    if(ok){ lo(-5); await say('~@','OK. Bên ngoài đọc ra rồi.'); if(S.nhanh==='B'&&(S.tin.ngan||0)>=3){ tin('ngan',1); await L([['Ngân','Anh nhắn ra được thiệt hả.'],['Ngân','Vậy anh cầm cái này. Lịch đổi ca của cả trại, tui chép từ bảng của Chị Bảy.']]); flag('sodo3'); flag('tuan0'); } } }
  if(d===17) await SC.canh7();
  if(d===18) await SC.khamPhong();
  if(d<18) await diDem();
  dark(false); }

async function phongToi(){ await card('PHÒNG TỐI'); await L([['','Sẹo dẫn '+who()+' xuống dãy trong. Cửa sắt đóng. Không đèn, không cửa sổ.'],['','Khi được thả ra, '+who()+' mới biết: trong lúc mình ở trong đó, một người của tổ đã bị chuyển khu.']]);
  const p=dsCon().filter(x=>!['ngan','khang'].includes(x.id))[0]; if(p){ p.con=false; S.log.push(p.ten+' bị chuyển khu khi '+who()+' ở phòng tối.'); }
  S.nghi=55; S.f.toi_skip=S.ngay+1; hud(); }

/* ---------------- Hồi 3 ---------------- */
async function day19(){ trai(true); cine(true); await card('NGÀY 19\nĐÊM MAI'); await bg('x2-phong-ngu');
  const ok=[]; const no=[];
  (S.nhanh==='A'||has('tin_song')||has('goi_ok')?ok:no).push('Bên ngoài biết chỗ');
  (has('tin_3g')?ok:no).push('Bên ngoài biết giờ ập vào');
  (has('cua')||has('rao')?ok:no).push('Có lối ra sông ('+[has('cua')?'cửa sau':'',has('rao')?'rào sau bếp':''].filter(Boolean).join(', ')+')');
  (has('ghe')?ok:no).push('Có ghe chờ');
  await L([['','Đêm trước đêm cuối. '+who()+' nằm ngửa trên giường tầng, đếm lại trong đầu.'],['~@','Có: '+(ok.join(', ')||'chưa có gì')+'.'],...(no.length?[['~@','Thiếu: '+no.join(', ')+'.']]:[])]);
  if(!has('tin_3g')&&has('may')){ await say('~@','Còn một lần gửi. Ghép ra 3G.'); await sendWord(); }
  if(S.nhanh==='B'){ if((S.tin.ngan||0)>=4) await L([['Ngân','Tổ mình đi nhóm đầu. Tui đi cuối.']]); else await L([['','Ngân đi ngang giường, không nhìn. Đêm mai cô sẽ đi theo ai, '+who()+' không biết.']]); }
  if(S.nhanh==='A'&&S.ai_vao==='lam') await L([['','Máy giấu rung. Một tin của Ngân, gửi từ bờ bên kia.'],['Ngân','Sông lên lúc hai giờ. Ở yên chờ đèn. Nhớ đếm người.']]);
}
async function rescueNight(){ trai(true); cine(true); dark(true);
  await card('NGÀY 20 · 1:00 SÁNG\nMƯA. MẤT ĐIỆN.');
  if(S.lo>=75||S.nghi>=100){ await bg('x2-cong-sat'); await L([['','Mười một giờ đêm, xe tải lùi vô sân. Đèn pin. Tiếng hô. Từng phòng bị lùa ra.'],['','Có người đã báo trước. Khu dời đi trước giờ ập vào.']]); S.ket='ban_dung'; return; }
  await bg('x2-bo-song-dem');
  if(S.nhanh==='A') await L([['','Bên này sông, '+(S.ai_vao==='ngan'?'Lâm':'Ngân')+' ngồi trên mũi ghe cùng Hương, nhìn đèn pin chớp ở bờ bên kia. Không làm gì được, ngoài đếm.']]);
  await L([['','Máy phát điện bên kia tắt. Cả trại tối om. Tiếng mưa trên mái tôn lấp hết tiếng chân.'],['~@','Đếm người. Dẫn từng người. Núp khi đèn pin quét tới.']]);
  const raidOK=has('tin_3g')&&(S.nhanh==='A'||has('tin_song')||has('goi_ok'));
  const shift=Math.floor(S.lo/25)*15; const raid=raidOK?180+shift:9999; const xe=S.lo>=25?270:null;
  if(!raidOK) await say('~@','Bên ngoài không biết giờ. Sẽ không ai ập vào. Chỉ còn mình với cái ghe.');
  const groups=dsCon().filter(p=>!(S.nhanh==='A'&&S.ai_vao==='ngan'&&p.id==='ngan')).map(p=>{ const t=S.tin[p.id]||0; return {id:p.id,ten:p.ten,can:t>=2?0:t===1?1:2,after:p.id==='ngan'&&t<4?240:0}; });
  const ex=[{ten:'Cổng chính',f:0,x:60,cost:has('ghe')?5:20}]; if(has('cua')) ex.push({ten:'Cửa sau',f:0,x:930,cost:has('ghe')?0:15}); if(has('rao')) ex.push({ten:'Rào sau bếp',f:0,x:740,cost:has('ghe')?0:15});
  const res=await sneak({mode:'cuu',groups,exits:ex,raid,xe,end:300,speed:1,night:S.f.siet>0?2:0});
  const outIds=res.out.map(g=>g.id); const con=groups.filter(g=>!outIds.includes(g.id));
  S.f.ra=outIds; S.f.tong=groups.length; S.f.con=con.map(g=>g.id);
  /* ai ở lại chặn cửa */
  let olai=null; if(con.length&&res.out.length){ const c=[]; if(S.nhanh==='A'&&S.ai_vao==='ngan') c.push(['Ngân',9]); if(con.some(g=>g.id==='ngan')&&(S.tin.ngan||0)>=3) c.push(['Ngân',S.tin.ngan]); if(con.some(g=>g.id==='khang')&&(S.tin.khang||0)>=3) c.push(['Khang',S.tin.khang]); if((S.tin.bay||0)>=3) c.push(['Chị Bảy',S.tin.bay]); c.sort((a,b)=>b[1]-a[1]); olai=c[0]?c[0][0]:null; }
  S.f.olai=olai;
  const nganRa=S.nhanh==='A'?true:outIds.includes('ngan');
  if(!res.out.length) S.ket='mot_minh';
  else if(!con.length&&nganRa&&S.cc.length>=4&&S.ds.every(p=>p.con)) S.ket='ca_to';
  else S.ket='o_lai';
  dark(false); }

/* ---------------- kết ---------------- */
const KET={ca_to:'Cả tổ về',o_lai:'Người ở lại',mot_minh:'Ra ngoài một mình',ban_dung:'Bị bán đứng'};
async function finale(){ save(true); const k=S.ket; const ra=(S.f.ra||[]).map(id=>NAME[id]||id); const L2=[];
  const myBat=S.cc.length>=4;
  if(k==='ca_to'){ L2.push('Năm giờ sáng. Chuông chùa bên sông. Chiếc ghe cuối cùng cập bờ bên này.','Ở cửa khẩu Mộc Bài, xe của Hương chờ sẵn. Mỗi người một ổ bánh mì, một chai nước.','Ra được: '+ra.join(', ')+'.');
    L2.push('Ba ngày sau, đúng tiệc mừng thọ sáu mươi tuổi, bà Trần Thị Mỹ bị mời đi làm việc. Bánh kem còn chưa cắt.','Một chiều tháng Mười Hai. Tạp hóa cô Thoa dọn thêm hai cái bàn nhựa ra hiên. Đủ người.','Con mèo mun nằm trên đùi Ngân. Cái chuông trên cổ nó vẫn không kêu.'); }
  else if(k==='o_lai'){ const o=S.f.olai; L2.push('Năm giờ sáng. Chuông chùa bên sông.','Ra được: '+(ra.join(', ')||'không ai')+'.');
    if(o) L2.push(o+' ở lại, đứng chặn cái cửa cho những người khác chạy.','Tài xế Thoại quay ghe lại một lần nữa. Bờ bên kia chỉ còn đèn pin và tiếng chó.','Không ai biết '+o+' có thoát không.');
    else if((S.f.con||[]).length) L2.push('Những người còn lại không kịp ra. Tiếng xe tải chạy về hướng xa hơn lúc trời vừa sáng.');
    else if(S.ds.some(p=>!p.con)) L2.push('Không ai bị bỏ lại đêm đó. Nhưng '+S.ds.filter(p=>!p.con).map(p=>p.ten).join(', ')+' đã bị chuyển đi từ trước. Trên danh sách của Hương, hai cái tên đó vẫn còn bỏ trống.');
    else L2.push('Ra được hết. Nhưng Ông Chủ Lò vẫn chưa có tên trong hồ sơ.');
    if(S.nhanh==='A'&&S.ai_vao==='ngan'&&o==='Ngân') L2.push('Ở hẻm 47, cô Thoa lại cắm sạc cái điện thoại cũ mỗi ngày. Lần thứ hai.');
    L2.push(myBat?'Bà Trần Thị Mỹ bị mời đi làm việc ngay trong tuần.':'Ở Sài Gòn, bà Trần Thị Mỹ vẫn chủ nhật nào cũng ngồi đếm tiền.'); }
  else if(k==='mot_minh'){ L2.push('Năm giờ sáng. '+who()+' lội qua đoạn sông cạn, một mình.','Không dẫn được ai ra.','Một tuần sau, '+who()+' viết một bài. Lần này đúng từng chữ.','Bài viết có 41 lượt xem.'); }
  else { L2.push('Khu dời đi trước giờ ập vào.','Xe tải chạy trong mưa. Không ai biết nó chạy về đâu.','Ba tuần sau, máy giấu đã mất từ lâu, nhưng tài khoản cũ của Ngân nhận được một tin rác.','Ghép chữ đầu câu, ra một cái tên: L. A. M.'); }
  if(k!=='ca_to'&&S.cc.length<5) L2.push('Ở một nơi khác, một bà già sáu mươi tuổi tắt ứng dụng đổi giọng, rót trà, và gọi cho con trai: "Mấy đứa đó để má lo."');
  const got=JSON.parse(lsGet('tgl_chuong2_ket')||'[]'); if(!got.includes(k)) got.push(k); lsSet('tgl_chuong2_ket',JSON.stringify(got));
  const e=$('endc'); e.hidden=false; e.innerHTML='<div class="in" id="eIn"></div>'; const inn=$('eIn');
  for(const l of L2){ const p=document.createElement('p'); p.className='l'; inn.appendChild(p); for(let i=0;i<=l.length;i++){ p.textContent=l.slice(0,i); await wait(18); } await wait(500); }
  inn.insertAdjacentHTML('beforeend','<h2>'+esc(KET[k])+'</h2><div class="sum"><div><b>'+(S.f.ra||[]).length+'/'+(S.f.tong||0)+'</b><span>người ra tới sông</span></div><div><b>'+S.cc.length+'/5</b><span>chứng cứ Ông Chủ Lò</span></div><div><b>'+S.so.length+'</b><span>người mất tiền vì tin bạn gửi</span></div><div><b>'+got.length+'/4</b><span>kết đã mở</span></div></div>'+
   (S.so.length?'<p class="tag">Sổ nạn nhân</p><ol>'+S.so.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ol>':'')+(S.log.length?'<p class="tag">Ghi chép</p><ol>'+S.log.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ol>':'')+
   '<p class="tag" style="margin-top:20px">Thủ đoạn trong game hư cấu từ các vụ việc báo chí đã đăng. Được mời đi làm việc nhẹ lương cao ở nước ngoài, hãy báo công an nơi gần nhất.</p><div class="row"><button class="btn" id="eAgain" type="button">Chơi lại</button><a class="btn ghost" href="./" style="text-decoration:none">Về Phần 1</a></div>');
  $('eAgain').onclick=()=>{ lsDel(SAVE_KEY); e.hidden=true; home(); };
  lsDel(SAVE_KEY); }
