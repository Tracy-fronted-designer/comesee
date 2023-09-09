import React, { useState } from "react";
import member from "../../css/member/member.module.css";
import Order from "./order";
import CancelOrder from "./cancelorder";

const Topbutton = () => {
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };


  return (
    <div className={member.contentdetail}>
      <div className={member.topbutton}>
        <div
          className={
            toggleState === 1
              ? `${member.booking} active-tabs`
              : `${member.booking} tabs`
          }
          onClick={() => toggleTab(1)}
        >
          訂購紀錄
        </div>
        <div
          className={
            toggleState === 2
              ? `${member.booking} active-tabs`
              : `${member.booking} tabs`
          }
          onClick={() => toggleTab(2)}
        >
          訂單取消
        </div>
      </div>
      <div
        className={
          toggleState === 1
            ? `${member.activecontent} active-content`
            : `${member.content} content`}>
        <Order />
        <Order />
      </div>
      <div
        className={
          toggleState === 2
            ? `${member.activecontent} active-content`
            : `${member.content} content`}>
        <CancelOrder />
      </div>
    </div>
  );
};

export default Topbutton;
