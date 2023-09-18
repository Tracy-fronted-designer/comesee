import React, { useState } from "react";
import fee from "../../css/member/fee.module.css";
import Axios from "axios";

const Coupon = ({userID}) => {
  const [coupons, setCoupons] = useState("兌換");

  const changeCouponstate = async () => {
    const title = "入會禮";
    const description = "贈送爆米花一份";

    // 合併title、description=>一個字串
    const combinedString = `${title} - ${description}`;

    var dataToServer = {
      couponID: combinedString,
      userID: userID, 
      money:"50",
      status: "1",
    };
    var s = JSON.stringify(dataToServer);
    await Axios.post(
      "http://localhost:2407/coupon/",
      s,
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
        <p style={{ fontWeight: 500, fontSize: "large" }}>入會禮</p>
        <p className={fee.text}>贈送爆米花一份</p>
        <button
          onClick={() => changeCouponstate(coupons)}
          className={fee.button}>
          {coupons}
        </button>
        <div className={fee.expire}>
          <p style={{ fontWeight: 500 }}>到期日</p>
          <p style={{ fontWeight: 300 }}>2024/5/28</p>
        </div>
      </div>
    </div>
  );
};

export default Coupon;
