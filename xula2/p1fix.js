/* Phần 1 · sửa lỗi bỏ lỡ hạn (thử trên trang test):
   - ngủ trước giờ hẹn thì sự kiện "hết hạn đơn" vẫn chạy, không bị mất luôn
   - dòng việc cần làm có hạn thì tự tắt khi quá ngày */
(function(){
  const patch=(ma,add)=>{ const i=IDX[ma]; if(i!=null&&T[i]&&!String(T[i].hien||'').includes(add)) T[i].hien=(T[i].hien?T[i].hien+' ':'')+add; };
  patch('MUC_20','ngay<4'); patch('MUC_21','ngay<6');
  const nightP1=night; night=async function(){ if(typeof P2!=='undefined'&&P2.on) return nightP1.apply(this,arguments);
    if(!sleeping&&!S.ended){ for(const a of AUTO){ if(!a.fail||S.co[autoKey(a)]||typeof a.d!=='number'||S.day<a.d||!inHoi(a)||!cond(a.c)) continue;
      setCo(autoKey(a)); if(a.fail==='tung'&&!S.co.bao_tung){ S.tin.bang_tung=0; setCo('bao_tung'); } try{ await runS(a.k); hideDlg(); }catch(e){} } }
    return nightP1.apply(this,arguments); };
})();
