import React, { Component } from "react";
import axios from "axios";

import styles from "../../css/booking/bookingSeat.module.css";

import SwitchBtn from "./SwitchBtn";
// import Sidebar from "../payment/Sidebar";
import Sidebar from "./Sidebar";
import SeatSelectorClass from "./SeatSelectorClass";

import TicketContext from "../../TicketContext";

class BookingSeat extends Component {
  static contextType = TicketContext;

  state = {
    seatinfo: [],
    bookingInfo: [],
    numberOfEmptySeats: 0, //empty的座位有幾個
  };

  //更新剩餘幾個座位
  setNumberOfEmptySeats = (numberOfEmptySeats) => {
    this.setState({ numberOfEmptySeats: numberOfEmptySeats });
  };

  componentDidMount() {
    //獲取傳入場次的相關資料放入bookingInfo
    axios
      .get("http://localhost:2407/booking/info/1")
      .then((response) => {
        this.setState({ bookingInfo: response.data[0] });
      })
      .catch((error) => {
        // 在這裡處理錯誤
        console.error("位置讀取錯誤:", error);
      });

    //獲取該場次1的所有位置資訊
    axios
      .get("http://localhost:2407/seat/1") //場次應該由props或context獲取
      .then((response) => {
        // console.log(response.data);
        this.setState({ ...this.state, seatinfo: response.data });

        //以下為找出empty的座位有幾個，並更新
        // 使用filter方法過濾出seatStatus為'empty'的紀錄
        let emptySeats = response.data.filter(
          (seat) => seat.seatStatus === "empty"
        );
        let numberOfEmptySeats = emptySeats.length; //座位為空的有幾個
        this.setNumberOfEmptySeats(numberOfEmptySeats); //使用函式設定numberOfEmptySeats
      })
      .catch((error) => {
        // 在這裡處理錯誤
        console.error("位置讀取錯誤:", error);
      });
  }

  updateSeatStatus = (rowNumber, seatNumber, newStatus) => {
    const updatedSeatinfo = this.state.seatinfo.map((seat) => {
      if (seat.rowNumber === rowNumber && seat.seatNumber === seatNumber) {
        return { ...seat, seatStatus: newStatus };
      }
      return seat;
    });

    this.setState({ seatinfo: updatedSeatinfo });
    // console.log(this.state.seatinfo);
  };

  //判斷已選擇的座位數是否與最大座位應該選擇的數量相等
  handleNextStepClick = () => {
    const { selectedSeats, maxSelectedSeats } = this.context.state;

    // console.log(selectedSeats);

    // 如果已選擇的座位數等於maxSelectedSeats回傳true 不等於回傳false
    if (selectedSeats.length === maxSelectedSeats) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    return (
      <div className={styles.main}>
        {/* 灰底 */}
        <div className={`container ${styles.grayBackground}`}>
          {/* 上半部 */}
          <div className={`${styles.top} d-flex row `}>
            {/* 電影圖 */}
            <div className={`${styles.movieImage} col-3`}>
              <img src={this.state.bookingInfo.imageUrl} alt="movieImage" />
            </div>

            {/* 電影資訊 */}
            <div className={`${styles.info} col-9`}>
              {/* 電影中英標題 */}
              <div className="title">
                <span className={styles.cnTitle}>
                  {this.state.bookingInfo.movieNameCN}
                </span>
                <span className={styles.grade}>普 0+</span>
                <p className={styles.enTitle}>
                  {this.state.bookingInfo.movieNameEN}
                </p>
              </div>

              {/* 電影詳細資訊 */}
              <div className={styles.movieInfo}>
                <div>
                  <span>上映日期 : </span>
                  <span>{this.state.bookingInfo.releaseDate}</span>
                </div>
                <div>
                  <span>片長 : </span>
                  <span>{this.state.bookingInfo.movieLength}</span>
                </div>
                <div>
                  <span>類型 : </span>
                  <span>{this.state.bookingInfo.movieType}</span>
                </div>
                <div>
                  <span>導演 : </span>
                  <span>{this.state.bookingInfo.director}</span>
                </div>
                <div className={styles.actorList}>
                  <span>演員 : </span>
                  <span>{this.state.bookingInfo.actor}</span>
                </div>
              </div>

              {/* 訂票資訊 */}
              <div className={styles.bookingInfo}>
                <div>
                  <span>影城 : </span>
                  <span>{this.state.bookingInfo.cinemaName}</span>
                </div>
                <div>
                  <span>影廳 : </span>
                  <span>{this.state.bookingInfo.theater}</span>
                </div>
                <div>
                  <span>時段 : </span>
                  <span>{this.state.bookingInfo.date}</span>&nbsp;
                  <span>星期五</span>&nbsp;
                  <span>{this.state.bookingInfo.startTime}</span>
                </div>
                <div>
                  <span>張數 : </span>
                  <span>2</span>
                </div>
              </div>
            </div>
          </div>

          {/* 中間白線 */}
          {/* <div className={styles.line}></div> */}

          {/* 下半部 */}
          <div className={`${styles.down} row`}>
            {/* 左邊步驟 */}
            <div className={`col-3 ${styles.sidebar}`}>
              <Sidebar currentPage="選擇座位" />
            </div>
            {/* 右邊訂票區 */}
            <div className={`col-9 ${styles.seatArea}`}>
              <div
                className={styles.seatText}
              >{`剩餘 ${this.state.numberOfEmptySeats} 個空位可選`}</div>
              <div className={styles.screen}>screen</div>
              {/* 座位區 */}
              <SeatSelectorClass
                seatinfo={this.state.seatinfo}
                updateSeatStatus={this.updateSeatStatus}
                numberOfEmptySeats={this.state.numberOfEmptySeats} //剩餘幾個座位
                setNumberOfEmptySeats={this.setNumberOfEmptySeats} //用來更新剩餘幾個座位
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
          <SwitchBtn next="/TicketType" seatflag={this.handleNextStepClick()} />
        </div>
      </div>
    );
  }
}

export default BookingSeat;
