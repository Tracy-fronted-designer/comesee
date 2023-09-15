import React from "react";
import member from "../../css/member/member.module.css";

const CancelOrder = ({ orderdetail }) => {

  return (
    <div className={member.order}>
       <div>
        <img
          className={member.film}
          src={orderdetail.imageUrl}
          alt=""
        />
      </div>
      <div className={member.orderdetail}>
        <div>
          <table className={member.desc} style={{ lineHeight: "170%" }}>
            <tbody>
              <tr>
                <th scope="row">電影</th>
                <td style={{ paddingLeft: "20px" }}>
                  <span>
                    {orderdetail.movieNameCN}({orderdetail.movieNameEN})
                  </span>
                </td>
              </tr>
              <tr>
                <th scope="row">影城</th>
                <td style={{ paddingLeft: "20px" }}>
                  <span>
                      {orderdetail.cinemaName}
                  </span>
                </td>
              </tr>
              <tr>
                <th scope="row">影廳</th>
                <td style={{ paddingLeft: "20px" }}>
                  <span>
                    {orderdetail.theaterName}
                  </span>
                </td>
              </tr>
              <tr>
                <th scope="row">時段</th>
                <td style={{ paddingLeft: "20px" }}>
                <span>
                  {orderdetail.showtimeDate}
                  </span>
                  &nbsp;&nbsp;
                  <span>
                    ({orderdetail.dayOfWeek})
                  </span>
                </td>
              </tr>
              <tr>
                <th scope="row">張數</th>
                <td style={{ paddingLeft: "20px" }}>
                  全票:
                  <span>
                    {orderdetail.adult}張
                  </span>
                  &nbsp;&nbsp;學生票:
                  <span>
                    {orderdetail.student}張
                  </span>
                </td>
              </tr>
              <tr>
                <th scope="row">座位</th>
                <td style={{ paddingLeft: "20px" }}>
                  <span>
                    {orderdetail.seat}
                  </span>
                  &nbsp;
                </td>
              </tr>
              <tr>
                <th scope="row">優惠</th>
                <td style={{ paddingLeft: "20px" }}>
                  紅利點數折抵
                  <span style={{ textDecoration: "underline" }}>
                    {orderdetail.bonus}元
                  </span>                
                </td>
              </tr>
              <tr>
                <th />
                <td style={{ paddingLeft: "20px" }}>
                  優惠卷&nbsp;
                  <span style={{ textDecoration: "underline" }}>
                    {orderdetail.couponID}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={member.cancelrightcontent}>
          <div className={member.canceltext}>已取消</div>
        </div>
      </div>
    </div>
  );
};

export default CancelOrder;
