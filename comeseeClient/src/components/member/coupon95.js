import React, { useEffect, useState } from "react";
import fee from "../../css/member/fee.module.css";
import Axios from "axios";

const Coupon95 = ({allSpent,userID} ) => {
  
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [coupons, setCoupons] = useState("兌換");
  //const [couponStatus, setCouponStatus] = useState(0); // 默认值为 0，表示未领取
  const [isCouponRedeemed, setIsCouponRedeemed] = useState(
    localStorage.getItem("isCouponRedeemed") === "true"
  );
  
  useEffect(() => {
    console.log("userID:", userID);
    console.log("totalSpent:", allSpent);
    // 達到條件就可以按按鈕
    if (allSpent >= 3000 && !isCouponRedeemed) {
      setIsButtonEnabled(true);
      console.log("啟動");
      setCoupons("兌換");
    } else {
      setIsButtonEnabled(false);
      console.log("禁用");
      if (isCouponRedeemed) {
        setCoupons("已領取");
      } else {
        setCoupons("未達消費里程優惠");
      }
    }
  }, [userID,allSpent, isCouponRedeemed]);

  const changeCouponState = async () => {
    if (isButtonEnabled) {
      const title = "里程碑活動";
      const description = "95折優惠卷使用";
      const combinedString = `${title} - ${description}`;

      var dataToServer = {
        couponID: combinedString,
        userID: userID,
        money: "0",
        status: "1",
      };
      var s = JSON.stringify(dataToServer);

      await Axios.post("http://localhost:2407/coupon/", s, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsCouponRedeemed(true);
      localStorage.setItem("isCouponRedeemed", "true"); // 将状态存储在localStorage中
    }
  };


  

  return (
    <div className={fee.ticketstatus}>
      <div className={fee.ticket}>
        <div>
          <p style={{ fontWeight: 500, fontSize: "large" }}>里程碑活動</p>
          <p style={{ fontWeight: 200, fontSize: "small" }}>消費滿$3,000元</p>
        </div>
        <p className={fee.text}>95折優惠卷使用</p>
        <button
          onClick={() => changeCouponState()}
          className={fee.button}
          disabled={!isButtonEnabled}
        >
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

export default Coupon95;
