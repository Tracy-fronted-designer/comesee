import React, { Component } from "react";
import DT from "../../css/payment/discount_tickettype.module.css";
import NumButton from "./NumButton";
import Sidebar from "./Sidebar";
import SwitchBtn from "./SwitchBtn";

import TicketContext from "../../TicketContext";

class TicketType extends Component {
  static contextType = TicketContext; //設定使用context

  // 小計
  componentDidUpdate() {
    const subtotal = this.ticketCost() + this.foodCost();
    if (subtotal !== this.context.state.subtotal) {
      this.context.setSubtotal(subtotal);
    }
  }

  render() {
    const { state } = this.context;
    
    
    // 只選擇select
    const selectedSeats = state.selectedSeats.filter(seat => seat.seatStatus === "select");
    // 第幾排第幾位的格式
    const seatInfo = selectedSeats.map((seat, index) => {
      return `第 ${seat.rowNumber} 排 ${seat.seatNumber} 位`;
    }).join(', ');


    return (
      <div className={DT.mainBg}>
        <div className={"container " + DT.contentBackground}>
          {/* 上半部 */}
          <div className={"row d-flex " + DT.movieInfo}>
            <div className={"col-3 " + DT.movieImage}>
              {/* 電影圖片 */}
              <img src={state.img} alt="電影圖片" />
            </div>
            <div className="col-9 col-md-6">
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
                  <span className={DT.content}> : {state.theaterName}</span>
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
                  <span className={DT.content}> : {state.seatCount}</span>
                </div>
                <div className={DT.contentTitle}>
                  座位
                  <span className={DT.content}> : {seatInfo}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 下半部 */}
          <div className="row">
            <div className={"col-3 " + DT.mySidebar}>
              <Sidebar currentPage="選擇票種" />
            </div>
            <div className={"col " + DT.discountConent}>
              {/* col 裡面再分兩個row */}
              <div className={"row " + DT.discountTicket}>
                {/* row 裡面再分4個col */}
                <div className={"col-2 " + DT.discountTitle}>選取票種</div>
                {/* 票種 */}
                <div className={"col-3 " + DT.discountList}>
                  {state.ticketName.map((name, index) => (
                    <div key={index}>{name}</div>
                  ))}
                </div>
                {/* 票種金額 */}
                <div className={"col-1 " + DT.discountList}>
                  {state.ticketMoney.map((money, index) => (
                    <div key={index}>${money}</div>
                  ))}
                </div>
                <div className={"col " + DT.discountList}>
                  <div>
                    <NumButton
                      maxValue={state.seatCount}
                      value={state.adultTickets}
                      onChange={(value) =>
                        this.ticketsNum("adultTickets", value)
                      }
                    />
                  </div>
                  <div>
                    <NumButton
                      maxValue={state.seatCount}
                      value={state.studentTickets}
                      onChange={(value) =>
                        this.ticketsNum("studentTickets", value)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className={"row " + DT.discountFood}>
                {/* row 裡面再分4個 col */}
                <div className={"col-2 " + DT.discountTitle}>餐點加購</div>
                {/* 餐點種類 */}
                <div className={"col-3 " + DT.discountList}>
                  {state.foodName.map((food, index) => (
                    <div key={index}>{food}</div>
                  ))}
                </div>
                {/* 餐點金額 */}
                <div className={"col-1 " + DT.discountList}>
                  {state.foodMoney.map((money, index) => (
                    <div key={index}>${money}</div>
                  ))}
                </div>
                <div className={"col " + DT.discountList}>
                  <div>
                    <NumButton
                      maxValue={state.seatCount}
                      value={state.popcornL}
                      onChange={(value) => {
                        this.ticketPopcorn("popcornL", value);
                      }}
                    />
                  </div>
                  <div>
                    <NumButton
                      maxValue={state.seatCount}
                      value={state.popcornS}
                      onChange={(value) => {
                        this.ticketPopcorn("popcornS", value);
                      }}
                    />
                  </div>
                  <div>
                    <NumButton
                      maxValue={state.seatCount}
                      value={state.colaL}
                      onChange={(value) => {
                        this.ticketCola("colaL", value);
                      }}
                    />
                  </div>
                  <div>
                    <NumButton
                      maxValue={state.seatCount}
                      value={state.colaS}
                      onChange={(value) => {
                        this.ticketCola("colaS", value);
                      }}
                    />
                  </div>
                </div>
                <div className={"row " + DT.ticketAdd}>
                  <div className="col">
                    電影票 {this.ticketCost()} 元，餐點加購 {this.foodCost()}{" "}
                    元，小計 {state.subtotal} 元
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 上一頁  下一頁 */}
          <SwitchBtn
            next="/discount"
            disabled={!state.canProceed}
          />
        </div>
      </div>
    );
  }

  // 票的種類數量限制
  ticketsNum = (field, value) => {
    // console.log(field) // 票的種類
    // console.log(value) // 幾張
    // console.log(typeof value)
    var numValue = parseInt(value, 10); //10進位
    var { adultTickets, studentTickets, seatCount } = this.context.state;
    let otherTickets = field === "adultTickets" ? studentTickets : adultTickets;

    // console.log(adultTickets);


    if (numValue + otherTickets > seatCount) {
      alert("請輸入正確的電影票張數");
      return;
    }

    this.context.setState({ [field]: isNaN(numValue) ? 0 : numValue });
    this.checkIfCanProceed();
  };

  // 爆米花種類數量限制
  ticketPopcorn = (field, value) => {
    let numValue = parseInt(value, 10); //10進位.
    let { popcornL, popcornS, seatCount } = this.context.state;
    let otherPopcorn = field === "popcornL" ? popcornS : popcornL;
    // console.log(popcornL);
    // console.log(popcornS);

    if (otherPopcorn + numValue > seatCount) {
      // this.setState({ popcornL: 0, popcornS: 0 });
      // 超過總票數跳出提醒
      alert("爆米花總數量不能超過電影票張數");
      return;
    }

    this.context.setState({ [field]: isNaN(numValue) ? 0 : numValue }, () => {
      this.checkIfCanProceed();
    });
  };

  // 可樂種類數量限制
  ticketCola = (field, value) => {
    let numValue = parseInt(value, 10); //10進位
    let { colaL, colaS, seatCount } = this.context.state;
    let otherCola = field === "colaL" ? colaS : colaL;

    if (otherCola + numValue > seatCount) {
      // 超過總票數跳出提醒
      alert("可樂總數量不能超過電影票張數");
      return;
    }

    this.context.setState({ [field]: isNaN(numValue) ? 0 : numValue }, () => {
      this.checkIfCanProceed();
    });
  };

  ticketCost = () => {
    const { adultTickets, studentTickets } = this.context.state;
    // console.log(adultTickets)
    const adultPrice = 350;
    const studentPrice = 300;

    const totalTicketCost =
      adultTickets * adultPrice + studentTickets * studentPrice;

    const totalCost = totalTicketCost;
    return totalCost;
  };

  foodCost = () => {
    const { popcornL, popcornS, colaL, colaS } = this.context.state;
    const popcornLPrice = 120;
    const popcornSPrice = 80;
    const colaLPrice = 50;
    const colaSPrice = 35;

    const totalPopcornCost =
      popcornL * popcornLPrice + popcornS * popcornSPrice;
    const totalColaCost = colaL * colaLPrice + colaS * colaSPrice;

    const foodTotalCost = totalPopcornCost + totalColaCost;
    return foodTotalCost;
  };

  checkIfCanProceed = (index, value) => {
    const { adultTickets, studentTickets, seatCount } = this.context.state;
    const totalTickets = adultTickets + studentTickets + 1;

    // console.log(adultTickets)
    // console.log(studentTickets)
    // console.log(seatCount)
    // console.log(totalTickets);

    if (totalTickets === seatCount) {
      this.context.setState({ canProceed: true });
    } else {
      this.context.setState({ canProceed: false });
    }
  };
}

export default TicketType;
