import React, { useEffect, useState } from "react";
import member from '../../css/member/member.module.css'


const Milestone = () => {
  
  const [Moneystate, setMoneystate] = useState("消費滿$3,000，即可享有95折優惠");
  const [progress, setProgress] = useState(60);

  // 監聽"progress"的變化
  useEffect(() => {
    const fetchDataFromBackend = async () => {
      try {
        const response = await fetch('/api/progress'); 
        const data = await response.json();
        setProgress(data.progress);
      } catch (error) {
        console.error('錯誤訊息:', error);
      }
    };

    fetchDataFromBackend();
    // 先暫時儲progress的值
    const progressValue = 30; // 預設progress值是30=>之後要抓資料=>怎麼換算??

    if (progressValue >= 30) {
      setMoneystate("您已享有95折優惠");
    }else if(progressValue >= 60){
      setMoneystate("您已享有88折優惠");
    }else if(progressValue >= 100){
      setMoneystate("恭喜你達到＄10,000里程優惠")
    }
  }, [progress]); // 在progress值發生變化時執行useEffect


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
