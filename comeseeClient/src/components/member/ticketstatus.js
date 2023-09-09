import React from "react";
import fee from '../../css/member/fee.module.css'

const Ticketstatus = () => {
  return (
    <div className={fee.ticketstatus}>
    <div className={fee.ticket}>
      <p style={{ fontWeight: 500, fontSize: "large" }}>入會禮</p>
      <p className={fee.text}>贈送爆米花一份</p>
      <div className={fee.button}>兌換</div>
      <div className={fee.expire}>
        <p style={{ fontWeight: 500 }}>到期日</p>
        <p style={{ fontWeight: 300 }}>2024/5/28</p>
      </div>
    </div>
    <div className={fee.ticket}>
      <p style={{ fontWeight: 500, fontSize: "large" }}>入會禮</p>
      <p className={fee.text}>贈送爆米花一份</p>
      <div className={fee.button2}>待生效</div>
      <div className={fee.expire}>
        <p style={{ fontWeight: 500 }}>到期日</p>
        <p style={{ fontWeight: 300 }}>2024/5/28</p>
      </div>
    </div>
  </div>
  );
};

export default Ticketstatus;

