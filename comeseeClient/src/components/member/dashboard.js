import React, { useEffect, useState } from "react";
import fee from "../../css/member/fee.module.css";
import Record from "./record";
import Axios from "axios";

const Dashboard = (props) => {
  const [bonus, setBonus] = useState([]);
  const [bonusRecord, setBonusrecord] = useState([]);

  useEffect(() => {
    const bonusStatus = async () => {
      try {
        const response = await Axios.get(`http://localhost:2407/bonus/${props.userID}`);
        const point = response.data[0].myPoint;
        console.log(response);
        setBonus(point);
      } catch (error) {
        console.error(error);
      }
    };

    Axios.get(`http://localhost:2407/bonus/bonusrecord/${props.userID}`)
      .then((response) => {
        const bonusRecord = response.data;
        setBonusrecord(bonusRecord);
        console.log(bonusRecord);
      })
      .catch((error) => {
        console.log(error);
      });

    bonusStatus(); // Call bonusStatus inside useEffect

  }, [props.userID]); // Add props.userID as a dependency

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
