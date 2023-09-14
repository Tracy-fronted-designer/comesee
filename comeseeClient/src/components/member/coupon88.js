import React , { useState } from "react";
import fee from '../../css/member/fee.module.css'
import Axios from "axios";


const Coupon88 = () => {
  
  const [coupons, setCoupons] = useState("兌換");

  const changeCouponstate = async () => {
    const title = "里程碑活動";
    const description = "88折優惠卷使用";

    // 合併title、description=>一個字串
    const combinedString = `${title} - ${description}`;

    var dataToServer = {
      couponID: combinedString,
      userID:"1", //抓user的ID?
      money:"0",
      status: "1",
    };
    var s = JSON.stringify(dataToServer);
    var response = await Axios.post(
      "http://localhost:2407/coupon/",
      dataToServer,
      {
        headers: {
          "Content-Type": "application/json",
        },
      } 
    );
    setCoupons("已兌換");
  };
    
    return (
        <div className={fee.ticketstatus}>
        <div className={fee.ticket}>
          <div>
            <p style={{ fontWeight: 500, fontSize: "large" }}>里程碑活動</p>
            <p style={{ fontWeight: 200, fontSize: "small" }}>消費滿$6,000元</p>  
          </div>
          <p className={fee.text}>88折優惠卷使用</p>
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

export default Coupon88;
