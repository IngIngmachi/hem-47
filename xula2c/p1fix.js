/* Phần 1 · sửa lỗi bỏ lỡ hạn (thử trên trang test):
   - ngủ trước giờ hẹn thì sự kiện "hết hạn đơn" vẫn chạy, không bị mất luôn
   - dòng việc cần làm có hạn thì tự tắt khi quá ngày */
(function(){
  const patch=(ma,add)=>{ const i=IDX[ma]; if(i!=null&&T[i]&&!String(T[i].hien||'').includes(add)) T[i].hien=(T[i].hien?T[i].hien+' ':'')+add; };
  patch('MUC_20','ngay<4'); patch('MUC_21','ngay<6');
  /* đơn chị Hạnh: đã nộp báo cáo rồi thì thôi đi dò hỏi / tra hỏi anh Lộc nữa (sau báo cáo ổng tự tới nói thật ở việc "Anh Lộc muốn nói chuyện") */
  const addC=(id,c)=>{ const a=ACT.find(x=>x.id===id); if(a&&!String(a.c||'').includes(c)) a.c=(a.c?a.c+' ':'')+c; };
  ['hoihanh','hoitam','hoidiem','khailoc','loc0'].forEach(id=>addC(id,'!co:bao_hanh'));
  /* anh Khoa nghi 60: laptop bị phá, hết dùng tới tối mai (BẢN NHÁP chờ duyệt chữ) */
  if(typeof AUTO!=='undefined'&&!AUTO.some(a=>a.k==='nghi60')){ const i=AUTO.findIndex(a=>a.k==='nghi70'); AUTO.splice(i<0?AUTO.length:i,0,{at:0,k:'nghi60',f:()=>S.nghi>=60}); }
  ACT.filter(a=>a.who==='o:laptop').forEach(a=>addC(a.id,'!co:laptop_hu'));
  /* anh Lộc đã đi theo đợt người thì không còn đứng ở xe bánh mì */
  if(NPC.loc){ const at0=NPC.loc.at; NPC.loc.at=h=>(typeof P2!=='undefined'&&P2.on)?at0(h):(S&&S.co&&S.co.loc_di?null:at0(h)); }
  const nightP1=night; night=async function(){ if(typeof P2!=='undefined'&&P2.on) return nightP1.apply(this,arguments);
    if(!sleeping&&S.co&&S.co.laptop_hu&&S.fd&&S.day>S.fd.laptop_hu){ delete S.co.laptop_hu; try{ toast('Đã lấy laptop sửa xong về'); }catch(e){} }
    if(!sleeping&&!S.ended){ for(const a of AUTO){ if(!a.fail||S.co[autoKey(a)]||typeof a.d!=='number'||S.day<a.d||!inHoi(a)||!cond(a.c)) continue;
      setCo(autoKey(a)); if(a.fail==='tung'&&!S.co.bao_tung){ S.tin.bang_tung=0; setCo('bao_tung'); } try{ await runS(a.k); hideDlg(); }catch(e){} } }
    return nightP1.apply(this,arguments); };
})();
