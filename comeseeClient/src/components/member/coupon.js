import React, { useState, useEffect } from "react";
import fee from "../../css/member/fee.module.css";
import Axios from "axios";

const Coupon = ({ userID }) => {
  const [coupons, setCoupons] = useState("兌換");
  const [isCouponRedeemed4, setIsCouponRedeemed4] = useState(
    localStorage.getItem("isCouponRedeemed4") === "true"
  );

  // 初始化localStorage
  useEffect(() => {
    const isRedeemed = localStorage.getItem("isCouponRedeemed4") === "true";
    setIsCouponRedeemed4(isRedeemed);

    // 已兌換，按鈕=> "已兌換"
    if (isRedeemed) {
      setCoupons("已兌換");
    }
  }, []);

  const changeCouponstate = async () => {
    if (!isCouponRedeemed4) {
      const title = "入會禮";
      const description = "贈送爆米花一份";

      // 合併title、description=>一個字串
      const combinedString = `${title} - ${description}`;

      var dataToServer = {
        couponID: combinedString,
        userID: userID,
        money: "50",
        status: "1",
      };
      var s = JSON.stringify(dataToServer);
      await Axios.post("http://localhost:2407/coupon/", s, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      // 设置状态和 localStorage
      setCoupons("已兌換");
      setIsCouponRedeemed4(true);
      localStorage.setItem("isCouponRedeemed4", "true");
    }
  };

  return (
    <div className={fee.ticketstatus}>
      <div className={fee.ticket}>
        <p style={{ fontWeight: 500, fontSize: "large" }}>入會禮</p>
        <p className={fee.text}>贈送爆米花一份</p>
        <button onClick={changeCouponstate} className={fee.button}>
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
