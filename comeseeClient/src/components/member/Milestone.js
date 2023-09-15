import React, { useEffect, useState } from "react";
import member from '../../css/member/member.module.css'
import Axios from "axios";

const Milestone = (props) => {
  const [progress, setProgress] = useState(0); 
  const [Moneystate, setMoneystate] = useState(""); 
  const [totalSpent, setTotalSpent] = useState([]); 

  useEffect(() => {
    Axios.get(`http://localhost:2407/orderlist/totalspent/${props.userID}`) //=>假設是2
      .then((response) => {
        const Spent = response.data[0].totalSpent;
        setTotalSpent(Spent);
        console.log(Spent);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  useEffect(() => {
    if (totalSpent >= 10000) {
      setMoneystate("恭喜你獲得電影票卷乙張，請至紅利優惠區兌換");
    } else if (totalSpent >= 6000) {
      setMoneystate("恭喜你獲得88折優惠，請至紅利優惠區兌換。消費滿$10,000，即可獲得電影票卷乙張");
    } else if (totalSpent >= 3000) {
      setMoneystate("恭喜你獲得95折優惠，請至紅利優惠區兌換。消費滿$6,000，即可享有88折優惠");
    } else if(totalSpent < 3000) {
      setMoneystate("消費滿$3,000，即可享有95折優惠");
    }

    // 計算百分比
    const maxProgress = 10000; // 最高總金額
    const calculatedProgress = (totalSpent / maxProgress) * 100;
    setProgress(calculatedProgress);
  }, [totalSpent, setMoneystate]);

  return (
    <div className={member.milestonesection}>
      <div className={member.milestone}>
        <div className={member.title}>
          <p className={member.username}>里程碑</p>
          <p className={member.subtitle}>{Moneystate}</p>
        </div>
        <div className={member.progressbar}>
          <div className={member.progressbar2} style={{ width: `${progress}%` }}></div>
        </div>
        <div className={member.money}>
          <div>
            <p>$3,000</p>
          </div>
          <div>
            <p>$6,000</p>
          </div>
          <div>
            <p>$10,000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Milestone;
