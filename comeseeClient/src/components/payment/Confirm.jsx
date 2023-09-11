import React, { Component } from "react";
import CPC from '../../css/payment/cpc.module.css';
import Sidebar from "./Sidebar";
import SwitchBtn from "./SwitchBtn";

import TicketContext from "../../TicketContext";


class Confirm extends Component {

  static contextType = TicketContext //設定使用context


  render() {
    const { state } = this.context;

    return (
      <div className={CPC.mainBg}>
        <div className={"container " + CPC.contentBackground}>
          <div className="row">
            <div className={"col-4 " + CPC.cpcSidebar}>
              <Sidebar currentPage="訂票資訊確認" />
            </div>
            <div className={"col-7"}>
              <div className={CPC.movieName}>
                {/* 電影中文名 */}
                <span className={CPC.movieNameC}>{state.nameC}</span>
                {/* 普 0+ */}
                <span className={CPC.grade}>{state.grade}</span>
                {/* 電影英文名 */}
                <p className={CPC.movieNameE}>{state.nameE}</p>
              </div>
              <div className={CPC.movieContentConfirm}>
                <div className={CPC.contentTitle}>
                  影城<span className={CPC.content}> : {state.cinemaName}</span>
                </div>
                <div className={CPC.contentTitle}>
                  影廳<span className={CPC.content}> : {state.theaterName}</span>
                </div>
                <div className={CPC.contentTitle}>
                  時段
                  <span className={CPC.content}> : {state.date} {state.day} {state.startTime}</span>
                </div>
                <div className={CPC.contentTitle}>
                  張數<span className={CPC.content}> : 全票 {state.adultTickets} 張 , 學生票 {state.studentTickets} 張</span>
                </div>
                <div className={CPC.contentTitle}>
                  座位<span className={CPC.content}> : {state.seatNumber}</span>
                </div>
                <div className={CPC.contentTitle}>
                  加購
                  <span className={CPC.content}>
                    : 爆米花(大)*{state.popcornL} , 爆米花(小)*{state.popcornS} , 可樂(大)*{state.colaL} , 可樂(小)*{state.colaS}
                  </span>
                </div>
                <div className={CPC.contentTitle}>
                  優惠
                  <span className={CPC.content}>
                    {" "}
                    : 紅利點數 - 折抵 {state.discount} 元, 優惠券 : {state.selectedCoupon} - 折抵 {state.couponDiscount} 元
                  </span>
                </div>
                <div className={CPC.confirmTitle}>總計： {state.total} 元</div>
              </div>
            </div>
          </div>
          <div>
            <SwitchBtn next="/Payment" />
          </div>

        </div>
      </div>
    );
  }
}

export default Confirm;
