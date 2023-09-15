import React, { useEffect, useState } from "react";
import fee from "../../css/member/fee.module.css";
// import Axios from "axios";
import Coupon from "./coupon";
import Coupon88 from "./coupon88";
import Coupon95 from "./coupon95";
import Couponticket from "./couponticket";
import Axios from "axios";

const Ticketstatus = () => {
  const [allSpent, setallSpent] = useState("0");


  useEffect(() => {
    Axios.get("http://localhost:2407/orderlist/totalspent/2") //=>假設是2
      .then((response) => {
        const Spent = response.data[0].totalSpent;
        setallSpent(Spent);
      })
      .catch((error) => {
        console.error(error);
      });

      

  }, []);



  return (
    <div className={fee.ticketstatus}>
      <Coupon />
      <Coupon95
        allSpent={allSpent}
      />

      <Coupon88
        allSpent={allSpent}
      />
      <Couponticket
        allSpent={allSpent}
      />
    </div>
  );
};

export default Ticketstatus;
