import React, { useState } from "react";
import member from "../../css/member/member.module.css";

const CancelOrder = () => {
    const[cancelorderstate,setcancelorderstate]=useState("重新訂購");
    const cancelorder=()=>{
        setcancelorderstate("取消訂單");
    }
  return (
    <div className={member.order}>
      <div className={member.film}></div>
      <div className={member.orderdetail}>
        <div>
          <table className={member.desc} style={{ lineHeight: "170%" }}>
            <tbody>
              <tr>
                <th scope="row">電影</th>
                <td style={{ paddingLeft: "20px" }}>
                  <span style={{ textDecoration: "underline" }}>
                    之前的我們
                  </span>
                </td>
              </tr>
              <tr>
                <th scope="row">影城</th>
                <td style={{ paddingLeft: "20px" }}>
                  <span style={{ textDecoration: "underline" }}>
                    台中大遠百威秀影城
                  </span>
                </td>
              </tr>
              <tr>
                <th scope="row">影廳</th>
                <td style={{ paddingLeft: "20px" }}>
                  <span style={{ textDecoration: "underline" }}>2D</span>
                </td>
              </tr>
              <tr>
                <th scope="row">時段</th>
                <td style={{ paddingLeft: "20px" }}>
                  <span style={{ textDecoration: "underline" }}>2023/8/18</span>
                  <span style={{ textDecoration: "underline" }}>星期五</span>
                  <span style={{ textDecoration: "underline" }}>9:45</span>
                </td>
              </tr>
              <tr>
                <th scope="row">張數</th>
                <td style={{ paddingLeft: "20px" }}>
                  全票:<span style={{ textDecoration: "underline" }}>2</span>
                  &nbsp;&nbsp;學生票:
                  <span style={{ textDecoration: "underline" }}>0</span>
                </td>
              </tr>
              <tr>
                <th scope="row">座位</th>
                <td style={{ paddingLeft: "20px" }}>
                  <span style={{ textDecoration: "underline" }}>2A</span>&nbsp;
                  <span style={{ textDecoration: "underline" }}>2B</span>
                </td>
              </tr>
              <tr>
                <th scope="row">優惠</th>
                <td style={{ paddingLeft: "20px" }}>
                  紅利點數折抵
                  <span style={{ textDecoration: "underline" }}>10</span>元
                </td>
              </tr>
              <tr>
                <th />
                <td style={{ paddingLeft: "20px" }}>
                  優惠卷&nbsp;
                  <span style={{ textDecoration: "underline" }}>無</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={member.cancelrightcontent}>
          <div className={member.canceltext}>已取消</div>
          {/* <button onClick={cancelorder} className={member.cancelbutton}>
            {cancelorderstate}
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default CancelOrder;
