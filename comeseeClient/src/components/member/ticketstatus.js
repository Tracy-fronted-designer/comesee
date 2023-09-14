import React from "react";
import fee from '../../css/member/fee.module.css'
// import Axios from "axios";
import Coupon from "./coupon";
import Coupon88 from "./coupon88";
import Coupon95 from "./coupon95";
import Couponticket from "./couponticket";


const Ticketstatus = () => {
  // const initialCoupons = {
  //   coupon1: "兌換",
  //   coupon2: "兌換",
  //   coupon3: "兌換",
  //   coupon4: "兌換",
  // };

  // const [coupons, setCoupons] = useState(initialCoupons);
  // const changeCouponState = async (couponName) => {
  //   try {
  //     // 準備要傳遞給後端的資料
  //     var dataToServer = {
   
  //       // 優惠卷相關資訊
  //     };

  //     var httpResult = await Axios.post("http://localhost:2407/create", dataToServer, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (httpResult.status === 200) {
  //       // 更新狀態或執行其他操作
  //       setCoupons((prevCoupons) => ({
  //         ...prevCoupons,
  //         [couponName]: "已兌換",
  //       }));
  //     } else {
  //       console.error("API請求失敗");
  //     }
  //   } catch (error) {
  //     console.error("發生錯誤:", error);
  //   }
  // };


  return (
    <div className={fee.ticketstatus}>
       <Coupon/>
       <Coupon95/>
       <Coupon88/>
       <Couponticket/>
  </div>
  );
};

export default Ticketstatus;

