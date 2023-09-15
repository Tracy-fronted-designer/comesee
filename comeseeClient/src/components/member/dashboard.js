import React, { useEffect, useState } from "react";
import fee from "../../css/member/fee.module.css";
import Record from "./record";
import Axios from "axios";

const Dashboard = () => {
  const [bonus, setBonus] = useState([]);
  const [bonusRecord, setBonusrecord] = useState([]);

  const bonusStatus = async () => {
    try {
      const response = await Axios.get(`http://localhost:2407/bonus/2`); // 假設userID=2
      const point = response.data[0].myPoint;
      setBonus(point);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    Axios.get("http://localhost:2407/bonus/bonusrecord/2")
      .then((response) => {
        const bonusRecord = response.data;
        setBonusrecord(bonusRecord);
        console.log(bonusRecord);
      })
      .catch((error) => {
        console.log(error);
      });
    bonusStatus();
  }, []);

  return (
    <div className={`row ${fee.dashboard}`}>
      <div className={`col-3 ${fee.leftcontent}`}>
        <span>目前的紅利點數</span>
        <span className={fee.number}>{bonus}</span>
      </div>
      <div className={`col-8 ${fee.recordsec}`}>
        {bonusRecord
          .sort((a, b) => new Date(b.bonusDate) - new Date(a.bonusDate))
          .map((bonus) => (
            <Record key={bonus.orderID} bonusRecord={bonus} />
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
