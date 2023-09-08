import React, { useEffect, useState } from "react";
import member from "../../css/member/member.module.css";
import Axios from "axios";

const Order = () => {
  const[orderstate,setOrderstate]=useState("取消訂單");
  const changeOrderstate=()=>{
    setOrderstate("重新訂購");
  }

  const [orderdetail, setOrderdetail] = useState({
    movie: 'showtimeID',
    cinema: 'showtimeID/cinemaID',
    theater: 'showtimeID/theaterID',
    showtime: 'showtimeID/date/startID/week(轉)',
    orderlist: '缺',
    seatID: 'seatID',
  });

  const updateOrderStatus = () => {
    Axios.post('/api/update-order-status', { newStatus: orderstate })
      .then(response => {
        console.log("成功更新訂單狀態");
      })
      .catch(error => {
        console.log("更新訂單狀態失敗", error);
      });
  };

  // 後端抓資料
  useEffect(() => {
    Axios({ url: '' })
      .then(response => {
        setOrderstate(response.data);
        console.log("成功獲得資料");
      })
      .catch(error => {
        console.log(error);
      });
      updateOrderStatus();
  }, [orderstate]);

  return (
    <div className={member.order}>
      <div>
        <img className={member.film} src={require("../../img/carouselimg.jpg")} alt=""></img>
      </div>
      <div className={member.orderdetail}>
        <div>
          <table className={member.desc} style={{ lineHeight: "170%" }}>
            <tbody>
              <tr>
                <th scope="row">電影</th>
                <td style={{ paddingLeft: "20px" }}>
                  <span style={{ textDecoration: "underline" }}>
                  {orderdetail ? orderdetail.movie : "err"}
                  </span>
                </td>
              </tr>
              <tr>
                <th scope="row">影城</th>
                <td style={{ paddingLeft: "20px" }}>
                  <span style={{ textDecoration: "underline" }}>
                  {orderdetail ? orderdetail.cinema : "123"}</span>
                </td>
              </tr>
              <tr>
                <th scope="row">影廳</th>
                <td style={{ paddingLeft: "20px" }}>
                  <span style={{ textDecoration: "underline" }}>{orderdetail ? orderdetail.theater : "err"}</span>
                </td>
              </tr>
              <tr>
                <th scope="row">時段</th>
                <td style={{ paddingLeft: "20px" }}>
                  <span style={{ textDecoration: "underline" }}>{orderdetail ? orderdetail.showtime.date : "err"}</span>
                  <span style={{ textDecoration: "underline" }}>{orderdetail ? orderdetail.showtime.weeks : "err"}</span>
                  <span style={{ textDecoration: "underline" }}>{orderdetail ? orderdetail.showtime.startTime : "err"}</span>
                </td>
              </tr>
              <tr>
                <th scope="row">張數</th>
                <td style={{ paddingLeft: "20px" }}>
                  全票:<span style={{ textDecoration: "underline" }}>缺</span>
                  &nbsp;&nbsp;學生票:
                  <span style={{ textDecoration: "underline" }}>缺</span>
                </td>
              </tr>
              <tr>
                <th scope="row">座位</th>
                <td style={{ paddingLeft: "20px" }}>
                  <span style={{ textDecoration: "underline" }}>{orderdetail ? orderdetail.orderlist.seatID : ""}</span>&nbsp;
                  <span style={{ textDecoration: "underline" }}>{orderdetail ? orderdetail.orderlist.seatID : ""}</span>
                </td>
              </tr>
              <tr>
                <th scope="row">優惠</th>
                <td style={{ paddingLeft: "20px" }}>
                  紅利點數折抵
                  <span style={{ textDecoration: "underline" }}>缺</span>元
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
        <div className={member.rightcontent}>
          <div>觀看倒數</div>
          <div className={member.number}>7</div>
          <button onClick={changeOrderstate} className={member.button}>
            {orderstate}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
