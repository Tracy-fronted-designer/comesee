import React, { Component } from "react";

import styles from "../../css/booking/bookingSeat.module.css";

import SwitchBtn from "../payment/SwitchBtn";
import Sidebar from "../payment/Sidebar";
import SeatSelectorClass from "./SeatSelectorClass";

import TicketContext from "../../TicketContext";

class BookingSeat extends Component {

  static contextType = TicketContext //設定使用context

  state = {
    seatinfo: [],
    // seatinfo: [
    //   { rowNumber: 1, seatNumber: 1, seatStatus: "empty" },
    //   { rowNumber: 1, seatNumber: 2, seatStatus: "sold" },
    //   { rowNumber: 1, seatNumber: 3, seatStatus: "empty" },
    //   { rowNumber: 1, seatNumber: 4, seatStatus: "empty" },
    //   { rowNumber: 1, seatNumber: 5, seatStatus: "empty" },
    //   { rowNumber: 1, seatNumber: 6, seatStatus: "empty" },
    //   { rowNumber: 1, seatNumber: 7, seatStatus: "empty" },
    //   { rowNumber: 1, seatNumber: 8, seatStatus: "empty" },
    //   { rowNumber: 1, seatNumber: 9, seatStatus: "empty" },
    //   { rowNumber: 1, seatNumber: 10, seatStatus: "sold" },
    //   { rowNumber: 2, seatNumber: 1, seatStatus: "empty" },
    //   { rowNumber: 2, seatNumber: 2, seatStatus: "sold" },
    //   { rowNumber: 2, seatNumber: 3, seatStatus: "empty" },
    //   { rowNumber: 2, seatNumber: 4, seatStatus: "empty" },
    //   { rowNumber: 2, seatNumber: 5, seatStatus: "empty" },
    //   { rowNumber: 2, seatNumber: 6, seatStatus: "empty" },
    //   { rowNumber: 2, seatNumber: 7, seatStatus: "empty" },
    //   { rowNumber: 2, seatNumber: 8, seatStatus: "empty" },
    //   { rowNumber: 2, seatNumber: 9, seatStatus: "empty" },
    //   { rowNumber: 2, seatNumber: 10, seatStatus: "sold" },
    //   { rowNumber: 3, seatNumber: 1, seatStatus: "empty" },
    //   { rowNumber: 3, seatNumber: 2, seatStatus: "sold" },
    //   { rowNumber: 3, seatNumber: 3, seatStatus: "empty" },
    //   { rowNumber: 3, seatNumber: 4, seatStatus: "empty" },
    //   { rowNumber: 3, seatNumber: 5, seatStatus: "empty" },
    //   { rowNumber: 3, seatNumber: 6, seatStatus: "empty" },
    //   { rowNumber: 3, seatNumber: 7, seatStatus: "empty" },
    //   { rowNumber: 3, seatNumber: 8, seatStatus: "empty" },
    //   { rowNumber: 3, seatNumber: 9, seatStatus: "empty" },
    //   { rowNumber: 3, seatNumber: 10, seatStatus: "sold" },
    // ],
  };

  componentDidMount() {
    this.setState({
      seatinfo: [
        { rowNumber: 1, seatNumber: 1, seatStatus: "empty" },
        { rowNumber: 1, seatNumber: 2, seatStatus: "empty" },
        { rowNumber: 1, seatNumber: 3, seatStatus: "empty" },
        { rowNumber: 1, seatNumber: 4, seatStatus: "empty" },
        { rowNumber: 1, seatNumber: 5, seatStatus: "empty" },
        { rowNumber: 1, seatNumber: 6, seatStatus: "empty" },
        { rowNumber: 1, seatNumber: 7, seatStatus: "empty" },
        { rowNumber: 1, seatNumber: 8, seatStatus: "empty" },
        { rowNumber: 1, seatNumber: 9, seatStatus: "empty" },
        { rowNumber: 1, seatNumber: 10, seatStatus: "sold" },
        { rowNumber: 2, seatNumber: 1, seatStatus: "empty" },
        { rowNumber: 2, seatNumber: 2, seatStatus: "empty" },
        { rowNumber: 2, seatNumber: 3, seatStatus: "empty" },
        { rowNumber: 2, seatNumber: 4, seatStatus: "empty" },
        { rowNumber: 2, seatNumber: 5, seatStatus: "empty" },
        { rowNumber: 2, seatNumber: 6, seatStatus: "empty" },
        { rowNumber: 2, seatNumber: 7, seatStatus: "empty" },
        { rowNumber: 2, seatNumber: 8, seatStatus: "empty" },
        { rowNumber: 2, seatNumber: 9, seatStatus: "empty" },
        { rowNumber: 2, seatNumber: 10, seatStatus: "empty" },
        { rowNumber: 3, seatNumber: 1, seatStatus: "empty" },
        { rowNumber: 3, seatNumber: 2, seatStatus: "sold" },
        { rowNumber: 3, seatNumber: 3, seatStatus: "empty" },
        { rowNumber: 3, seatNumber: 4, seatStatus: "empty" },
        { rowNumber: 3, seatNumber: 5, seatStatus: "empty" },
        { rowNumber: 3, seatNumber: 6, seatStatus: "empty" },
        { rowNumber: 3, seatNumber: 7, seatStatus: "empty" },
        { rowNumber: 3, seatNumber: 8, seatStatus: "empty" },
        { rowNumber: 3, seatNumber: 9, seatStatus: "empty" },
        { rowNumber: 3, seatNumber: 10, seatStatus: "sold" },
        { rowNumber: 4, seatNumber: 1, seatStatus: "empty" },
        { rowNumber: 4, seatNumber: 2, seatStatus: "sold" },
        { rowNumber: 4, seatNumber: 3, seatStatus: "empty" },
        { rowNumber: 4, seatNumber: 4, seatStatus: "empty" },
        { rowNumber: 4, seatNumber: 5, seatStatus: "empty" },
        { rowNumber: 4, seatNumber: 6, seatStatus: "empty" },
        { rowNumber: 4, seatNumber: 7, seatStatus: "empty" },
        { rowNumber: 4, seatNumber: 8, seatStatus: "empty" },
        { rowNumber: 4, seatNumber: 9, seatStatus: "empty" },
        { rowNumber: 4, seatNumber: 10, seatStatus: "empty" },
        { rowNumber: 5, seatNumber: 1, seatStatus: "empty" },
        { rowNumber: 5, seatNumber: 2, seatStatus: "empty" },
        { rowNumber: 5, seatNumber: 3, seatStatus: "empty" },
        { rowNumber: 5, seatNumber: 4, seatStatus: "empty" },
        { rowNumber: 5, seatNumber: 5, seatStatus: "empty" },
        { rowNumber: 5, seatNumber: 6, seatStatus: "empty" },
        { rowNumber: 5, seatNumber: 7, seatStatus: "empty" },
        { rowNumber: 5, seatNumber: 8, seatStatus: "empty" },
        { rowNumber: 5, seatNumber: 9, seatStatus: "empty" },
        { rowNumber: 5, seatNumber: 10, seatStatus: "sold" },
      ],
    });
  }

  updateSeatStatus = (rowNumber, seatNumber, newStatus) => {
    // console.log(rowNumber) //第幾列
    // console.log(seatNumber) //第幾欄
    // console.log(newStatus) //selected
    const updatedSeatinfo = this.state.seatinfo.map((seat) => {
      // console.log(seat)//列出每一列資訊
      if (seat.rowNumber === rowNumber && seat.seatNumber === seatNumber) {
        return { ...seat, seatStatus: newStatus };
      }
      return seat;
    });

    this.setState({ seatinfo: updatedSeatinfo });
    // console.log(this.state.seatinfo);
  };

  // componentDidUpdate(prevProps, prevState) {
  //   console.log(prevProps.location);
  //   console.log(this.props.location);
  //   console.log("123"); // 打印 "123" 到控制台
  //   if (prevProps.location !== this.props.location) {
  //     window.scrollTo(0, 0); // 将页面滚动到顶部
  //     console.log("123"); // 再次打印 "123" 到控制台
  //   }
  // }

  render() {
    const { state } = this.context;
    return (
      <div className={styles.main}>
        {/* 灰底 */}
        <div className={`container ${styles.grayBackground}`}>
          {/* 上半部 */}
          <div className={`${styles.top} d-flex row `}>
            {/* 電影圖 */}
            <div className={`${styles.movieImage} col-3`}>
              <img
                src={state.img}
                alt="movieImage"
              />
            </div>

            {/* 電影資訊 */}
            <div className={`${styles.info} col-9`}>
              {/* 電影中英標題 */}
              <div className="title">
                <span className={styles.cnTitle}>{state.nameC}</span>
                <span className={styles.grade}>{state.grade}</span>
                <p className={styles.enTitle}>{state.nameE}</p>
              </div>

              {/* 電影詳細資訊 */}
              <div className={styles.movieInfo}>
                <div>
                  <span>上映日期 : </span>
                  <span>{state.releaseDate}</span>
                </div>
                <div>
                  <span>片長 : </span>
                  <span>{state.movieLength}</span>
                </div>
                <div>
                  <span>類型 : </span>
                  <span>{state.movieType}</span>
                </div>
                <div>
                  <span>導演 : </span>
                  <span>{state.director}</span>
                </div>
                <div className={styles.actorList}>
                  <span>演員 : </span>
                  <span>
                    {state.actor}
                  </span>
                </div>
              </div>

              {/* 訂票資訊 */}
              <div className={styles.bookingInfo}>
                <div>
                  <span>影城 : </span>
                  <span>{state.cinemaName}</span>
                </div>
                <div>
                  <span>影廳 : </span>
                  <span>{state.theaterName}</span>
                </div>
                <div>
                  <span>時段 : </span>
                  <span>{state.date}</span>&nbsp;
                  <span>{state.day}</span>&nbsp;
                  <span>{state.startTime}</span>
                </div>
                <div>
                  <span>張數 : </span>
                  <span>{state.currentTickets}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 下半部 */}
          <div className={`${styles.down} row`}>
            {/* 左邊步驟 */}
            <div className={`col-3 ${styles.sidebar}`}>
              <Sidebar currentPage="選擇座位" />
            </div>
            {/* 右邊訂票區 */}
            <div className={`col-9 ${styles.seatArea}`}>
              <div className={styles.seatText}>剩餘_個空位可選</div>
              <div className={styles.screen}>screen</div>
              {/* 座位區 */}
              <SeatSelectorClass
                seatinfo={this.state.seatinfo}
                updateSeatStatus={this.updateSeatStatus}
              />
              {/* 標示 */}
              <div className={styles.sample}>
                <div>
                  <div
                    className={styles.square}
                    style={{ background: "#F1EFE9" }}
                  ></div>
                  <span>可選取</span>
                </div>
                <div>
                  <div
                    className={styles.square}
                    style={{ background: "#64A26A" }}
                  ></div>
                  <span>已選取</span>
                </div>
                <div>
                  <div
                    className={styles.square}
                    style={{ background: "#E12C4B" }}
                  ></div>
                  <span>無法選取</span>
                </div>
              </div>
            </div>
          </div>
          {/* 換頁按鈕 */}
          <SwitchBtn next="/TicketType" />
        </div>
      </div>
    );
  }
}

export default BookingSeat;
