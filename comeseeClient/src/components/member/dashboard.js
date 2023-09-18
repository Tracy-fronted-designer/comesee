import React, { useEffect, useState } from "react";
import fee from "../../css/member/fee.module.css";
import Record from "./record";
import Axios from "axios";

const Dashboard = (user) => {
  const [bonus, setBonus] = useState([]);
  const [bonusRecord, setBonusrecord] = useState([]);
  const [bonusLoaded, setBonusLoaded] = useState(false); 
  const filteredRecords = bonusRecord.filter(record => record.used !== 0); //過濾0
  useEffect(() => {
    const bonusStatus = async () => {
      try {
        if (!bonusLoaded) {
          const response = await Axios.get(`http://localhost:2407/bonus/${user.userID}`);
          const point = response.data[0].myPoint;
          console.log(point)
          setBonus(point);
          setBonusLoaded(true); 
        }
      } catch (error) {
        console.error(error);
      }
    };

    Axios.get(`http://localhost:2407/bonus/bonusrecord/${user.userID}`)
      .then((response) => {
        // 使用红利的紀錄
        const bonusRecord = response.data;
        setBonusrecord(bonusRecord);
        console.log(bonusRecord);
      })
      .catch((error) => {
        console.log(error);
      });

    bonusStatus(); 

  }, [user.userID,bonusLoaded]); 

  return (
    <div className={`row ${fee.dashboard}`}>
      <div className={`col-3 ${fee.leftcontent}`}>
        <span>可使用的紅利點數</span>
        <span className={fee.number}>{bonus}</span>
      </div>
      <div className={`col-8 ${fee.recordsec}`}>
        {filteredRecords
          .sort((a, b) => new Date(b.bonusDate) - new Date(a.bonusDate))
          .map((bonus) => (
            <Record key={bonus.orderID} bonusRecord={bonus} />
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
