import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import DT from "../../css/payment/discount_tickettype.module.css";
import NumButton from "./NumButton";
import Sidebar from "./Sidebar";
import SwitchBtn from "./SwitchBtn";

import TicketContext from "../../TicketContext";

class Discount extends Component {

  static contextType = TicketContext //設定使用context

  // 一開始的總計等於小計
  componentDidMount() {
    // 在 componentDidMount 中設定 total 的值為 subtotal
    const { subtotal } = this.context.state;
    this.setState({ total: subtotal });
  }

  // 更新總計金額
    componentDidUpdate() {
    const { subtotal, usePoint, couponDiscount } = this.context.state;
    const total = subtotal - (this.discountPoint(usePoint) + couponDiscount);
    if (total !== this.context.state.total) {
      this.context.setTotal(total);
    }
  }
  
  render() {
    const { state } = this.context;

    // 設定最多只能只用幾點紅利點數
    const maxValue = Math.min(state.myPoint, 2000);


    return (
      <div className={DT.mainBg}>
        <div className={"container " + DT.contentBackground}>
          {/* 上半部 */}
          <div className={"row " + DT.movieInfo}>
            <div className={"col-3 " + DT.movieImage}>
              {/* 電影圖片 */}
              <img src={state.img} alt="電影圖片" />
            </div>
            <div className={"col-9 " + DT.movieIfon}>
              <div className={DT.movieName}>
                {/* 電影中文名 */}
                <span className={DT.movieNameC}>{state.nameC}</span>
                {/* 普 0+ */}
                <span className={DT.grade}>{state.grade}</span>
                {/* 電影英文名 */}
                <p className={DT.movieNameE}>{state.nameE}</p>
              </div>
              <div className={DT.movieContent}>
                <div className={DT.contentTitle}>
                  影城
                  <span className={DT.content}> : {state.cinemaName}</span>
                </div>
                <div className={DT.contentTitle}>
                  影廳
                  <span className={DT.content}>
                    {" "}
                    : {state.theaterName}
                  </span>
                </div>
                <div className={DT.contentTitle}>
                  時段
                  <span className={DT.content}>
                    {" "}
                    : {state.date} {state.day} {state.startTime}
                  </span>
                </div>
                <div className={DT.contentTitle}>
                  張數
                  <span className={DT.content}>
                    {" "}
                    : 全票 {state.adultTickets} 張 , 學生票 {state.studentTickets} 張
                  </span>
                </div>
                <div className={DT.contentTitle}>
                  座位
                  <span className={DT.content}> : {state.seatNumber}</span>
                </div>
                <div className={DT.contentTitle}>
                  加購
                  <span className={DT.content}> : 爆米花(大)*{state.popcornL} , 爆米花(小)*{state.popcornS} , 可樂(大)*{state.colaL} , 可樂(小)*{state.colaS}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 中間白線 */}
          <div className={DT.line}></div>

          {/* 下半部 */}
          <div className="row">
            <div className={"col-3 " + DT.mySidebar}>
              <Sidebar currentPage="選擇優惠" />
            </div>
            <div className={"col " + DT.discountConent}>
              {/* col 裡面再分兩個row */}
              <div className={"row " + DT.discountTicket}>
                {/* row 裡面再分4個col */}
                <div className={"col-2 " + DT.discountTitle}>會員紅利</div>
                <div className={"col-3 " + DT.discountList}>
                  <div>你的紅利點數</div>
                  <div>本次可使用紅利點數</div>
                </div>
                <div className={"col " + DT.discountList}>
                  <div className={DT.pLogoBg}>P</div>
                  <div className={DT.pointsP}>
                    目前點數 {state.myPoint} 點
                  </div>
                  <div>
                    本次使用&emsp;
                    <NumButton
                      stepValue="500"
                      value={state.usePoint}
                      maxValue1={maxValue}
                      maxValue2={maxValue}
                      onChange={this.numBtnChange}
                    />{" "}
                    &emsp;點
                  </div>
                  <div className={DT.pointsNote}>
                    500點80元，每次最高可折抵2000點
                  </div>
                </div>
              </div>
              <div className={"row " + DT.discountFood}>
                {/* row 裡面再分4個 col */}
                <div className={"col-2 " + DT.discountTitle}>優 惠 券</div>
                <div className={"col-3 " + DT.discountList}>
                  <div>可使用的優惠券</div>
                </div>
                <div className={"col " + DT.discountList}>
                  <select className={DT.discountSelect} onChange={this.couponChange}  value={state.selectedCoupon}>
                    <option disabled>
                      可使用的優惠券
                    </option>
                    {state.couponID.map((selectedCoupon,index)=>(
                      <option key={index} value={selectedCoupon}>{selectedCoupon}</option>
                    ))}
                  </select>
                </div>
                <div className={"row " + DT.discountAdd}>
                  <div className="col">
                    金額 {state.subtotal} 元，可折抵{" "}
                    {this.discountPoint(state.usePoint)+state.couponDiscount} 元，小計{" "}
                    {state.total} 元
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 上一頁  下一頁 */}
          <SwitchBtn
            next="/confirm"
          />
        </div>
      </div>
    );
  }

  numBtnChange = (newValue) => {
    // console.log( newValue);
    this.context.setState({ usePoint: newValue });
    const newDiscount = this.discountPoint(newValue);
    // console.log(newDiscount)
    this.context.setDiscount(newDiscount);
  };


  discountPoint = (points = 0) => {
    var rate = 80 / 500; // 每點能折抵的金額
    return points * rate; // 點數 x 折抵率
  };


  couponChange = (event) => {
    // console.log(event)
    // console.log(event.target.options)
    // console.log(event.target.options[event.target.selectedIndex])
 
    const selectedOption = event.target.options[event.target.selectedIndex];
    const selectedText = selectedOption.text; //選項的value值
    // const selectedValue = selectedOption.value; // 選項的內容
    
    // console.log(selectedText);  
  
  
    this.context.setSelectedCoupon(selectedText); // 如果你需要value值
  };
}

export default withRouter(Discount);
