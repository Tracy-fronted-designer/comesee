import React , { useState } from "react";
import fee from '../../css/member/fee.module.css'

const Couponticket = () => {
  
  const [coupons, setCoupons] = useState("兌換");
  const changeCouponstate = (canceledOrder) => {
    setCoupons("已兌換");
  };
    
    return (
        <div className={fee.ticketstatus}>
        <div className={fee.ticket}>
        <div>
            <p style={{ fontWeight: 500, fontSize: "large" }}>里程碑活動</p>
            <p style={{ fontWeight: 200, fontSize: "small" }}>消費滿$10,000元</p>  
          </div>
          <p className={fee.text}>優惠電影卷乙張</p>
          <button onClick={() => changeCouponstate(coupons)} className={fee.button}>
            {coupons}
          </button>
          <div className={fee.expire}>
            <p style={{ fontWeight: 500 }}>到期日</p>
            <p style={{ fontWeight: 300 }}>2024/5/28</p>
          </div>
        </div>
      </div>
      );
      
}

export default Couponticket;
