import React, { useEffect, useState } from "react";
import member from '../../css/member/member.module.css'


const Milestone = () => {
  
  const [Moneystate, setMoneystate] = useState("消費滿$3,000，即可享有95折優惠");
  const [progress, setProgress] = useState(60);


  return (
    <div className={member.milestonesection}>
    <div className={member.milestone}>
      <div className={member.title}>
        <p className={member.username}>里程碑</p>
        <p className={member.subtitle}>{Moneystate}</p>
      </div>
      <div className={member.progressbar}>
        <div className={member.progressbar2} style={{width:`${progress}%`}}></div>
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
