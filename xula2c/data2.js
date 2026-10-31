/* Hẻm 47 · Phần 2 — bảng việc, phòng, người, lịch. Cùng định dạng với bảng của Phần 1.
   Chỉ được nạp vào khung khi bấm nút Phần 2 (xem p2Install trong p2.js). */
'use strict';
/* cảnh nhỏ cần cho bảng việc */
X('x_lich_act','Lịch tuần tra',[['~','Nằm trên giường sắt nhắm mắt lại, nhẩm tính khớp từng khung giờ đi tuần của đám lính gác.'],{game:'lichtuan'}]);
X('x_dt_act','Ai cầm lò',[['~','Nằm trên giường sắt xâu chuỗi lại toàn bộ đường đi của dòng tiền lừa đảo.'],{game:'dongtien'}]);
X('x_gui_act','Gửi tin ra',['{me} lẻn vô buồng tắm, thò tay dưới đáy thùng nước gỡ cái đt màn hình nứt ra.',{game:'gui'}]);
X('x_muachuoc','Đút lót',['Rút tờ tiền gấp mỏng giấu dưới lót đế giày, nhét lẹ qua tay thằng lính gác. Nó liếc nhìn rồi tự động quay mặt đi chỗ khác. Đủ mua sự đui mù của nó trong vài ngày.',{fx:'-tien:500000 -nghi:15'}]);
X('x_het1','Lên xe',[{bg:'x2-xe-hem'},'4h sáng. Chiếc 16 chỗ đậu im lìm đầu hẻm, máy nổ rì rầm nhưng tắt sạch đèn.',{if:'vao:ngan',L:['Ngân xách giỏ bước lên xe, không ngoái đầu nhìn lại.','Lâm đứng nép sau cột điện đầu hẻm nhìn theo cho tới khi chiếc xe quẹo khuất khỏi đường Fan Xích Vô.']},{if:'!vao:ngan',L:['Lâm cúi đầu bước lên xe. Băng ghế sau đã có 5 người ngồi sẵn, ai cũng im thin thít.']}]);
X('x_het2','Đêm mai',['Trời đổ mưa từ xế chiều, tới tối thì gió nổi lên ầm ầm.',['~','Chỉ còn đúng 1 ngày nữa. Nhẩm đếm lại quân số, rà lại đường rút lần cuối.']]);
X('kq_xocl','Ông Chủ Lò',[{if:'tin_bang_xocl>=3',L:[['~','Chứng cứ vầy là cứng ngắc rồi. Chỉ cần sống sót qua tới bờ sông bên kia là giao tận tay Hương với đại úy Vinh. Lần này không thể sai một chữ nào.'],{fx:'+co:x_ocl_xong'}]},{if:'tin_bang_xocl<3',L:[['~','Chuỗi bằng chứng vẫn còn chỗ hở. Kết luận vội vàng kiểu này coi chừng lại đổ oan sai như năm ngoái.']]}]);
X('V_gap_1','Chạy Gáp',['Chạy thêm mấy cuốc xe đêm kiếm tiền. Trời mưa lất phất, con bé khách ngồi sau cứ khóc thút thít suốt dọc đường.',{fx:'+tien:250000'}]);
X('V_gap_2','Chạy Gáp',['Chạy giao 12 ly trà sữa cho một công ty ở Quận 1. Chú bảo vệ thấy ướt mưa nên rót cho ly trà đá.',{fx:'+tien:220000'}]);
X('V_phu_1','Phụ tạp hóa',['Ngân ngồi xếp lại mấy thùng mì gói ngoài tiệm. Có người đi ngang nhận ra mặt cô trên mạng, liền quay ngoắt bỏ đi không mua nữa.',{fx:'+tien:150000'}]);
X('V_phu_2','Phụ tạp hóa',['Cô Thoa đưa cuốn sổ nợ cho Ngân coi. Bà Năm đầu xóm còn thiếu 30 ngàn tiền gạo muối từ hồi Tết tới giờ.',['Cô Thoa','Thôi gạch bỏ luôn đi con. Bả còn nghèo rớt mồng tơi hơn mẹ con mình.'],{fx:'+tien:150000 +tin_thoa'}]);
X('V_xbasau_1','Phụ bà Sáu',['Bắc ghế thay lại cái bóng đèn cầu thang. Bà Sáu đứng dưới chân thang cầm đèn pin rọi lên cho.',['Bà Sáu','Hồi trước cái thằng nhỏ ở phòng số 3 cũng đứng thay bóng đèn chỗ này cho bà nè. Giờ nó đi mất tiêu rồi.'],{fx:'+tin_ba_sau'}]);
X('V_xbasau_2','Phụ bà Sáu',['Phụ bà Sáu đem thau đồ lên sân thượng phơi. Cái radio cũ mở cải lương, bà vừa kẹp áo vừa ca theo trật nhịp hết trơn.',{fx:'+tin_ba_sau'}]);
X('V_xbin_1','Chạy đơn với Bin',['Bin cầm lái, Lâm ngồi sau ôm thùng hàng. Hai anh em quần thảo giao đơn tới tận khuya.',['Bin','Anh tính đi qua bển thiệt hả anh Lâm? Anh đi rồi lấy ai phụ chạy đơn với em.'],{fx:'+tin_bin +tien:120000'}]);

const P2REAL={};
const P2DATA=(()=>{
  const P1N=Object.assign({},NPC), P1R=Object.assign({},ROOMS);
  const W=(f)=>h=>f(h);
  const inDs=k=>(S.ds||[]).some(p=>p.id===k&&p.con);
  /* ---------- người trong hẻm (Hồi 1) ---------- */
  const NPC_HEM={basau:P1N.basau,thoa:P1N.thoa,hanh:P1N.hanh,tam:P1N.tam,diem:P1N.diem,bin:P1N.bin,
    lam:{n:'Lâm',at:h=>S.nhanh==='A'&&S.vai==='ngan'&&h>=7&&h<22?{u:['basau',.78],f:-1}:null},
    ngan:{n:'Ngân',at:h=>S.nhanh==='A'&&S.vai==='lam'&&h>=7&&h<21?{u:['taphoa',.18]}:null}};
  NPC_HEM.loc={n:'Anh Lộc',at:h=>P1N.loc&&S.p1&&S.p1.co&&S.p1.co.loc_o?P1N.loc.at(h):null};
  /* người Phần 1 có tên trong phòng mà Phần 2 không có mặt: để trống */
  Object.values(P1R).forEach(R=>(R.npc||[]).forEach(k=>{ if(!NPC_HEM[k]) NPC_HEM[k]={n:(P1N[k]&&P1N[k].n)||k,at:()=>null}; }));
  /* ---------- người trong trại (Hồi 2–3) ---------- */
  const work=(k,u)=>({at:h=>{ if(!inDs(k)&&k!=='bay'&&k!=='seo') return null; if(h>=12&&h<13) return {u:['xan',.5],in:1}; if(h>=19&&h<22) return {u}; return null; }});
  const NPC_TRAI={
    bay:{n:'Chị Bảy',at:h=>h>=12&&h<13?{u:['xan',.5],in:1}:h>=19&&h<22?{u:['xvp',.62]}:null},
    seo:{n:'Sẹo',at:h=>h>=6&&h<19?{u:['xcong',.28]}:h>=19&&h<22?{u:['xngu',.92],f:-1}:null},
    nhi:Object.assign({n:'Nhi'},work('nhi',['xngu',.12])),
    toan:Object.assign({n:'Toàn'},work('toan',['xan',.82])),
    hue:Object.assign({n:'Chị Huệ'},work('hue',['xngu',.42])),
    ti:Object.assign({n:'Tí'},work('ti',['xbep',.25])),
    thuy:Object.assign({n:'Thủy'},work('thuy',['xngu',.68])),
    ngan:Object.assign({n:'Ngân'},work('ngan',['xmay',.82])),
    khang:{n:'Khang',at:h=>{ if(!inDs('khang')&&!(S.p1&&S.p1.co.khoa_lat)) return null; if(S.day<15) return null; if(h>=19&&h<22) return {u:S.p1.co.khoa_lat?['xvp',.18]:['xbep',.88],f:-1}; return null; }},
    loc:{n:'Anh Lộc',at:h=>{ if(!inDs('loc')) return null; if(h>=6&&h<19) return {u:['xbep',.5],in:1}; if(h>=19&&h<21) return {u:['xbep',.62]}; return null; }}};
  /* ---------- phòng ---------- */
  const taphoa=Object.assign({},P1R.taphoa,{objs:(P1R.taphoa.objs||[]).concat([{id:'ban_quay',x:.6,y:.64,w:.07,h:.08,l:'Mặt quầy',idle:'Mặt quầy gỗ, trầy mấy chục năm. Chỗ Ngân hay ngồi làm bài hồi nhỏ.'}])});
  const present=L=>function(){ return L.filter(k=>NPC[k]&&(()=>{ const p=NPC[k].at(hour()); return p&&p.in; })()); };
  const R2={
    may:{house:'xmay',door:.09,ten:'Phòng máy',img:'x2-phong-may',npc:['bay'],npos:[.7],lamx:.25,
      objs:[{id:'bang',x:.815,y:.38,w:.1,h:.26,l:'Bảng chỉ tiêu',idle:'Bảng trắng ghi tên từng người. Tên ai thiếu chỉ tiêu thì tô đỏ.'},{id:'chuong',x:.89,y:.29,w:.06,h:.12,l:'Cái chuông đồng',idle:'Cái chuông đồng. Mỗi lần reo là có một người mất tiền.'}]},
    an:{house:'xan',door:.45,ten:'Nhà ăn',img:'x2-nha-an',lamx:.2,objs:[{id:'khay',x:.62,y:.52,w:.18,h:.12,l:'Khay cơm',idle:'Cơm, canh rau muống, một miếng cá khô. Ăn lẹ, một giờ vô ca.'}]},
    ngu:{house:'xngu',door:.1,ten:'Phòng ngủ tổ 3',img:'x2-phong-ngu',npc:[],lamx:.3,
      objs:[{id:'giuong',x:.35,y:.6,w:.2,h:.14,l:'Giường tầng của mình',idle:'Giường tầng, nệm mỏng. Dưới gầm có chỗ giấu đồ.'},{id:'hanhlang',x:.43,y:.47,w:.08,h:.42,l:'Hành lang ra buồng tắm',go:'tam',goc:''}]},
    tam:{house:'xngu',nodoor:1,back:'ngu',ten:'Buồng tắm',img:'x2-buong-tam',lamx:.4,objs:[{id:'thung',x:.47,y:.62,w:.14,h:.26,l:'Thùng nước',idle:'Thùng nước lạnh. Đáy thùng có vết băng keo cũ.'}]},
    bep:{house:'xbep',door:.78,ten:'Bếp',img:'x2-bep',npc:['loc'],npos:[.7],lamx:.25,objs:[{id:'tubep',x:.65,y:.36,w:.22,h:.24,l:'Tủ bếp',idle:'Tủ bếp cao. Trên nóc có gì đó bọc bao tải.'}]},
    vp:{house:'xvp',door:.45,ten:'Văn phòng lầu ba',c:'co:x_chia',img:'x2-tang3',lamx:.3,objs:[{id:'bantang3',x:.62,y:.8,w:.3,h:.16,l:'Bàn quản lý',idle:'Bàn quản lý. Ngăn kéo có khóa. Trưa thì không ai ngồi.'}]}};
  Object.defineProperty(R2.an,'npc',{get:present(['bay','nhi','toan','hue','ti','thuy','ngan','loc']),enumerable:true});
  Object.defineProperty(R2.an,'npos',{get(){ return this.npc.map((_,i)=>.9-i*.12); },enumerable:true});
  const ROOMS2=Object.assign({},P1R,{taphoa,vp12:Object.assign({},P1R.vp12,{nodoor:1})},R2);
  /* ---------- việc ---------- */
  const H1={h:1,hx:1}, H2={h:2,hx:3};
  const ACT=[
    // nhánh A
    {id:'x_a_giaitin',...H1,d:[1,7],who:'o:maycu_thoa',k:'x_a_giaitin',t:'Đọc tin của số lạ',c:'nhanh:A vai:ngan !co:x_a_tin1',until:'co:x_a_tin1',w:[6,23.5],cost:30},
    {id:'x_a_moi',...H1,d:[1,7],who:'lam',k:'x_a_moi',t:'Đưa Lâm coi tin nhắn',c:'nhanh:A vai:ngan co:x_a_tin1 !co:x_hop',cost:40},
    {id:'x_a_sodo',...H1,d:[1,7],who:'o:ban_quay',k:'x_a_sodo',t:'Vẽ lại sơ đồ trại cũ',c:'nhanh:A vai:ngan co:x_hop !co:x_sodo',until:'co:x_sodo',cost:60},
    {id:'x_a_huong',...H1,d:[2,7],w:[8,21],who:'ngo',place:'thaodien',k:'x_a_huong',t:'Gặp Hương ở quán Thảo Điên',c:'nhanh:A vai:lam !co:x_vu_ocl',cost:120},
    {id:'x_a_vi',...H1,d:[2,7],who:'o:laptop',k:'x_a_vi',t:'Lần dòng tiền của Anh Hai',c:'nhanh:A vai:lam co:x_vu_ocl !cc:x_vi',until:'cc:x_vi',cost:60},
    {id:'x_a_thoa',...H1,d:[3,7],who:'thoa',k:'x_a_thoa',t:'Nói chuyện với mẹ',c:'nhanh:A vai:ngan',sau:'+co:x_a_thoa_xong',cost:40},
    {id:'x_a_giong',...H1,d:[3,7],w:[17,23.5],who:'o:maycu_thoa',k:'x_a_giong',t:'Nghe tin thoại Nhi chuyển ra',c:'nhanh:A vai:ngan !cc:x_giong',until:'cc:x_giong',cost:45},
    {id:'x_a_vinh',...H1,d:[2,7],w:[8,17],who:'ngo',place:'congan',k:'x_a_vinh',t:'Gặp đại úy Vinh ở phường',c:'nhanh:A vai:lam co:x_vu_ocl !co:x_vinh',cost:120},
    {id:'x_a_khoa',...H1,d:[2,7],w:[8,16],who:'ngo',place:'trai_giam',k:'x_a_khoa',t:'Thăm Khoa ở trại tạm giam',c:'nhanh:A vai:lam p1:khoa_lat co:x_vinh !co:x_duong_khoa',cost:150},
    {id:'x_a_gom',...H1,d:[5,7],who:'basau',k:'x_a_gom',t:'Gom tiền trong hẻm',c:'nhanh:A vai:lam !co:x_gom',cost:90},
    {id:'x_a_cainhau',...H1,d:[6,7],w:[19,23.5],who:'phong',k:'x_a_cainhau',t:'Chốt ai vào trại',c:'nhanh:A co:x_sodo co:x_vinh !co:x_chot',cost:60},
    // nhánh B
    {id:'x_b_basau',...H1,d:[1,4],who:'basau',k:'x_b_basau',t:'Ngồi với bà Sáu',c:'nhanh:B',cost:40},
    {id:'x_b_tratin',...H1,d:[1,7],who:'o:laptop',k:'x_b_tratin',t:'Tra khu Ba Vẹt dời đi đâu',c:'nhanh:B !cc:x_siha',cost:45},
    {id:'x_b_huong',...H1,d:[1,7],w:[8,21],who:'ngo',place:'thaodien',k:'x_b_huong',t:'Gặp Hương ở quán Thảo Điên',c:'nhanh:B cc:x_siha !co:x_vu_ocl',cost:120},
    {id:'x_b_vinh',...H1,d:[2,7],w:[8,17],who:'ngo',place:'congan',k:'x_b_vinh',t:'Gặp đại úy Vinh ở phường',c:'nhanh:B co:x_vu_ocl !co:x_vinh',cost:120},
    {id:'x_b_sodo',...H1,d:[2,7],who:'o:laptop',k:'x_b_sodo',t:'Dò sơ đồ trại',c:'nhanh:B co:x_vinh !co:x_sodo',until:'co:x_sodo',cost:60},
    {id:'x_b_duong',...H1,d:[3,7],w:[8,16],who:'ngo',place:'trai_giam',k:'x_b_duong',t:'Thăm Khoa, xin đường lên xe',c:'nhanh:B p1:khoa_lat co:x_vinh !co:x_duong',cost:150},
    {id:'x_b_duong2',...H1,d:[3,7],w:[8,17],who:'ngo',place:'vpkhac',k:'x_b_duong',t:'Nộp hồ sơ ở văn phòng quận khác',sub:'phí 1.000.000đ',c:'nhanh:B !p1:khoa_lat co:x_vinh !co:x_duong',need:'tien>=1000000',why:'Cần 1.000.000đ phí hồ sơ.',cost:120},
    {id:'x_kham',...H1,d:[4,7],w:[7,11],who:'ngo',place:'kham',k:'x_kham',t:'Đi khám sức khỏe đi làm',c:'nhanh:B co:x_duong !co:x_kham',cost:120},
    {id:'x_tapma',...H1,d:[3,7],w:[18,20.5],who:'bin',k:'x_tapma',t:'Tập nhắn giấu chữ với Bin',c:'nhanh:B co:x_vinh !co:x_tapma',cost:60},
    {id:'x_b_gom',...H1,d:[5,7],who:'basau',k:'x_b_gom',t:'Gom tiền trong hẻm',c:'nhanh:B !co:x_gom',cost:90},
    // chung
    {id:'x_ghep',...H1,d:[3,7],who:'ngo',k:'x_ghep',t:'Ráp tờ rơi rách ở cột điện',c:'!cc:x_phatdat',until:'cc:x_phatdat',cost:30},
    {id:'x_tra_phatdat',...H1,d:[3,7],who:'o:laptop',k:'x_tra_phatdat',t:'Tra công ty Phát Đạt TN',c:'vai:lam cc:x_phatdat !cc:x_bamy',cost:30},
    {id:'x_thoai',...H1,d:[4,7],w:[6,18],who:'ngo',place:'ben_ghe',k:'x_a_thoai',t:'Tìm Tài xế Thoại ở bến',c:'co:x_vinh !co:x_gap_thoai co:x_bin_thoai|vai:ngan',cost:150},
    {id:'x_tra_ghe',...H1,d:[4,7],w:[6,18],who:'ngo',place:'ben_ghe',k:'x_tra_ghe',t:'Trả tiền ghe cho Tài xế Thoại',sub:'700.000đ',c:'co:x_gap_thoai !co:x_ghe',need:'tien>=700000',why:'Cần 700.000đ. Làm thêm hoặc gom tiền trong hẻm.',until:'co:x_ghe',cost:120},
    {id:'x_kehoach',...H1,d:[3,7],who:'o:laptop',board:'xvinh',t:'Viết kế hoạch gửi đại úy Vinh',c:'vai:lam co:x_vinh cc:x_sodo !co:bao_xvinh',cost:45},
    {id:'x_mon',...H1,d:7,w:[18,23.5],who:'phong',k:'x_mon',t:'Chọn món mang theo',c:'!co:x_mon_xong nhanh:B|co:x_chot',cost:20},
    // trong trại
    {id:'x_thuylai',...H2,d:[10,18],w:[12,13],who:'thuy',k:'x_thuylai',t:'Ngồi gần cô gái hôm qua',c:'nhanh:B co:x_thuy_lo !co:x_thuy_biet',cost:20},
    {id:'x_nganb1',...H2,d:[9,19],w:[12,13],who:'ngan',k:'x_nganb1',t:'Ngồi gần Ngân giờ cơm',c:'nhanh:B co:x_thuy_chi !co:x_ngan_nghe',until:'co:x_ngan_nghe',cost:20},
    {id:'x_canhngan',...H2,d:[9,19],w:[12,13],who:'bay',k:'x_canhngan',t:'Xin đổi chỗ ngồi cạnh Ngân',c:'nhanh:B co:x_ngan_nghe tin_ngan<3 !co:x_canh_ngan !co:x_canhngan_xong',cost:10},
    {id:'x_khang',...H2,d:[15,19],w:[19,22],who:'khang',k:'x_khang',t:'Nói chuyện với Khang',c:'!co:x_khang_gap',cost:40},
    {id:'x_vu3',...H2,d:[12,19],w:[19,22],who:'toan',k:'x_vu3',t:'Hỏi Toàn chuyện tuần tra đổi giờ',c:'co:x_vu3 !co:x_vu3_xong',until:'co:x_vu3_xong',cost:40},
    {id:'x_gui',...H2,d:[9,19],who:'o:thung',k:'x_gui_act',t:'Gửi tin giấu chữ ra ngoài',sub:'cần ghép ra chữ',c:'co:x_may gui:ok !co:x_cho_xn',until:'co:x_tin_3g',cost:30},
    {id:'x_xinchia',...H2,d:[13,19],w:[19,22],who:'bay',k:'x_xinchia',t:'Xin Chị Bảy chìa cửa sau',c:'co:x_bay_lat !co:x_chia',cost:20},
    {id:'x_muachuoc',...H2,d:[9,19],w:[19,22],who:'seo',k:'x_muachuoc',t:'Đút lót lính gác',sub:'500.000đ, bớt bị nghi',c:'nghi>=40',need:'tien>=500000',why:'Cần 500.000đ.',rep:1,cost:20},
    {id:'x_khai_bay',...H2,d:[12,19],w:[19,22],who:'bay',k:'x_bay_goi',khai:'xbay',t:'Lên lầu ba nói chuyện với Chị Bảy',c:'cc:x_giongthat',until:'co:khai_xbay',cost:60},
    {id:'x_soat_vp',...H2,d:[9,19],w:[12,13],who:'o:bantang3',soat:'xvp',t:'Lục văn phòng lúc quản lý đi ăn',c:'co:x_chia',cost:30},
    {id:'x_lich',...H2,d:[9,19],w:[19,22],who:'o:giuong',k:'x_lich_act',t:'Xếp lại lịch tuần tra',c:'co:x_tuan0 !co:x_gio',until:'co:x_gio',cost:20},
    {id:'x_dongtien',...H2,d:[9,19],w:[19,22],who:'o:giuong',k:'x_dt_act',t:'Xâu chuỗi: ai cầm lò?',c:'ccx>=3 !cc:suy_x_my',until:'cc:suy_x_my',cost:20},
    {id:'x_bao_ocl',...H2,d:[9,19],w:[19,22],who:'o:giuong',board:'xocl',t:'Viết sẵn: Ông Chủ Lò là ai',c:'cc:suy_x_my !co:bao_xocl',cost:30}];
  const SIDE=[
    {id:'gap',who:'ngo',t:'Chạy Gáp kiếm tiền',sub:'+250.000đ',c:'hoi<2 vai:lam',cost:180},
    {id:'phu',who:'thoa',t:'Phụ tạp hóa',sub:'+150.000đ',c:'hoi<2 vai:ngan',cost:150},
    {id:'xbasau',who:'basau',t:'Phụ bà Sáu việc nhà',sub:'bà Sáu tin bạn hơn',c:'hoi<2',cost:90},
    {id:'gapd',who:'ngo',t:'Chạy Gáp buổi tối',sub:'+220.000đ',c:'direct hoi<2 vai:lam',w:[17,23.5],cost:180,k:'V_gap_2'},
    {id:'xbin',who:'bin',t:'Chạy đơn với Bin',sub:'+120.000đ · Bin tin bạn hơn',c:'hoi<2 vai:lam',cost:150},
    {id:'xnhi',who:'nhi',t:'Ngồi nói chuyện với Nhi',sub:'Nhi tin bạn hơn',c:'hoi>=2',w:[19,22],cost:30},
    {id:'xtoan',who:'toan',t:'Ngồi nói chuyện với Toàn',sub:'Toàn tin bạn hơn',c:'hoi>=2',w:[19,22],cost:30},
    {id:'xhue',who:'hue',t:'Ngồi với chị Huệ',sub:'chị Huệ tin bạn hơn',c:'hoi>=2',w:[19,22],cost:30},
    {id:'xti',who:'ti',t:'Ngồi với Tí',sub:'Tí tin bạn hơn',c:'hoi>=2',w:[19,22],cost:30},
    {id:'xthuy',who:'thuy',t:'Nói chuyện với Thủy',sub:'Thủy tin bạn hơn',c:'hoi>=2 co:x_thuy_chi',w:[19,22],cost:30},
    {id:'xngan',who:'ngan',t:'Ngồi gần Ngân',sub:'Ngân tin bạn hơn',c:'hoi>=2 tin_ngan>=2',w:[19,22],cost:30},
    {id:'xkhang',who:'khang',t:'Ngồi với Khang',sub:'Khang tin bạn hơn',c:'hoi>=2 co:x_khang_gap',w:[19,22],cost:30},
    {id:'xloc',who:'loc',t:'Phụ anh Lộc dọn bếp',sub:'anh Lộc tin bạn hơn',c:'hoi>=2',w:[19,21],cost:30}];
  const TN={bay:'Chị Bảy',ngan:'Ngân',nhi:'Nhi',toan:'Toàn',hue:'Chị Huệ',ti:'Tí',thuy:'Thủy',khang:'Khang',loc:'Anh Lộc',thoai:'Tài xế Thoại'};
  return {
    NPC_HEM,NPC_TRAI,ROOMS:ROOMS2,ACT,SIDE,AUTO:[],NIGHTS:[{k:'x_a_tin2',d:[5,7],c:'nhanh:A'}],NIGHTLATE:[],MSGS:[],
    ACTN:{1:'Hồi 1 · Bảy ngày',2:'Hồi 2 · Trại',3:'Hồi 3 · Đêm mưa'},
    ACTEND:{1:{c:'co:x_mon_xong ngay>=7',k:'x_het1',ten:'Lên xe',after:async()=>{ await p2VaoTrai(); }},2:{c:'ngay>=18',k:'x_het2',ten:'Đêm mưa'}},
    ENDS:{ca_to:['','Cả tổ về'],o_lai:['','Người ở lại'],mot_minh:['','Ra ngoài một mình'],ban_dung:['','Bị bán đứng'],boi_song:['','Bơi qua sông']},
    BOARDN:{xvinh:'Kế hoạch gửi đại úy Vinh',xocl:'Ông Chủ Lò là ai'},
    TR_NEED:Object.fromEntries(Object.keys(TN).map(k=>[k,[3,'']])),TRUSTN:TN,
    PLACE_IMG:{thaodien:'x2-quan-thaodien',trai_giam:'x2-trai-giam',ben_ghe:'x2-ben-ghe',vpkhac:'x2-vp-quan-khac',kham:'x2-kham-suckhoe',congan:'x2-congan'},
    SPK:{'Chị Bảy':'bay','Sẹo':'seo','Tài xế Thoại':'thoai','Khang':'khang','Tí':'ti','Nhi':'nhi','Toàn':'toan','Chị Huệ':'hue','Anh Lộc':'loc','Khoa':'khoa','Tú':'tu','Ngân':'ngan','Thủy':'thuy','Hương':'huong','Đại úy Vinh':'vinh','Phát':'phat'},
    LIT_TRAI:{},
    SOAT_XVP:{ten:'Lục văn phòng lầu ba',luot:3,items:[{k:'ngan',x:.32,y:.62,l:'Ngăn kéo bàn'},{k:'tu',x:.78,y:.42,l:'Tủ sắt'},{k:'cam',x:.56,y:.26,l:'Màn hình camera'},{k:'rac',x:.14,y:.8,l:'Thùng rác'},{k:'dt',x:.44,y:.5,l:'Điện thoại bàn'}]},
    NV:[['ngan','Ngân','Chủ shop Ngân Order năm xưa. Từng làm tổ trưởng phòng máy 2 ở trại.',['Ngân']],
      ['lam','Lâm','Admin page bóc phốt năm xưa. Người viết bài về Ngân.',['Lâm']],
      ['basau','Bà Sáu','Chủ nhà trọ. Đếm từng người đi ra từ cái gác.',['Sáu']],['thoa','Cô Thoa','Mẹ Ngân. Sạc cái điện thoại cũ của con mỗi ngày.',['Thoa']],
      ['bin','Bin','Chạy giao hàng Gáp.',['Bin']],['huong','Hương','Phóng viên điều tra.',['Hương']],['vinh','Đại úy Vinh','Công an phường.',['Vinh']],
      ['khoa','Khoa','Từng chủ văn phòng số 12. Đang bị tạm giam. Em trai là Khang.',['Khoa']],['thoai','Tài xế Thoại','Chạy ghe ở bến sát biên. Chở ai trả tiền.',['Thoại']],
      ['bay','Chị Bảy','Quản lý phòng máy. Người Việt. Tay áo dài che kín cổ tay.',['Bảy']],['seo','Sẹo','Gác cổng. Vết sẹo từ thái dương xuống cằm.',['Sẹo']],
      ['nhi','Nhi','19 tuổi, Tiền Giang. Gõ chữ "á" cuối câu.',['Nhi']],['toan','Toàn','Thợ hồ, 26 tuổi. Nợ app.',['Toàn']],['hue','Chị Huệ','49 tuổi. Đi thay con trai.',['Huệ']],
      ['ti','Tí','Nhỏ nhất phòng, 19 tuổi. Đêm nào cũng nghe tiếng nước.',['Tí']],['thuy','Thủy','Từng ở phòng 3 nhà bà Sáu.',['Thủy']],['khang','Khang','Em trai Khoa.',['Khang']],
      ['tu','Anh Tú','"Anh Hai". Mặt tiền.',['Tú']],['my','Bà Trần Thị Mỹ','Má anh Tú. Đứng tên Phát Đạt TN.',['Mỹ']]]};
})();
