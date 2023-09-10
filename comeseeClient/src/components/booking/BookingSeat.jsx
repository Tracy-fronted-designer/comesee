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
  };

  componentDidMount() {
    //獲取該場次1的所有位置資訊
    axios
      .get("http://localhost:2407/seat/1")
      .then((response) => {
        // console.log(response.data);
        this.setState({ ...this.state, seatinfo: response.data });
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
              <img
                src="https://movies.yahoo.com.tw/i/o/production/movies/May2023/Qc1HYHrRQcOf5Vc49EK2-1024x1622.jpg"
                alt="movieImage"
              />
            </div>

            {/* 電影資訊 */}
            <div className={`${styles.info} col-9`}>
              {/* 電影中英標題 */}
              <div className="title">
                <span className={styles.cnTitle}>奧本海默</span>
                <span className={styles.grade}>普 0+</span>
                <p className={styles.enTitle}>Oppenheimer</p>
              </div>

              {/* 電影詳細資訊 */}
              <div className={styles.movieInfo}>
                <div>
                  <span>上映日期 : </span>
                  <span>2023-07-21</span>
                </div>
                <div>
                  <span>片長 : </span>
                  <span>03時00分</span>
                </div>
                <div>
                  <span>類型 : </span>
                  <span>歷史/傳記,劇情</span>
                </div>
                <div>
                  <span>導演 : </span>
                  <span>克里斯多福諾蘭(ChristopherNolan)</span>
                </div>
                <div className={styles.actorList}>
                  <span>演員 : </span>
                  <span>
                    席尼墨菲(CillianMurphy)、艾蜜莉布朗(EmilyBlunt)、麥特戴蒙(MattDamon)、小勞勃道尼(RobertDowneyJr.)、佛蘿倫絲普伊(FlorencePugh)、蓋瑞歐德曼(GaryOldman)、肯尼斯布萊納(KennethBranagh)、詹姆斯瑞馬(JamesRemar)、傑克奎德(JackQuaid)、雷米馬利克(RamiMalek)、喬許哈奈特(JoshHartnett)、高斯塔夫史卡司加德(GustafSkarsgård)、馬提亞斯史維克福(MatthiasSchweighöfer)、奧莉薇雅朵比(OliviaThirlby)
                  </span>
                </div>
              </div>

              {/* 訂票資訊 */}
              <div className={styles.bookingInfo}>
                <div>
                  <span>影城 : </span>
                  <span>台中影城</span>
                </div>
                <div>
                  <span>影廳 : </span>
                  <span>數位</span>
                </div>
                <div>
                  <span>時段 : </span>
                  <span>2023-08-18</span>&nbsp;
                  <span>星期五</span>&nbsp;
                  <span>12:00</span>
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
          <SwitchBtn next="/TicketType" seatflag={this.handleNextStepClick()} />
        </div>
      </div>
    );
  }
}

export default BookingSeat;
