import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom/cjs/react-router-dom.min";

import TicketContext from "../../TicketContext";

import SB from "../../css/payment/SwitchBtn.module.css";
import Swal from "sweetalert2";

class SwitchBtn extends Component {
  static contextType = TicketContext;

  goToNextPage = () => {
    this.props.history.push(this.props.next);
    window.scrollTo(0, 0);
  };

  render() {
    var seatflag = this.props.seatflag; //傳入的seatflag判斷是否有超過最大選擇座位
    return (
      <div className={SB.switchBtn}>
        <Link
          to="#" // 將 "#" 用作連結的 placeholder，因為上一頁不需要指定路由
          onClick={() => this.props.history.goBack()} // 返回上一頁
          className={SB.btnL}
        >
          <svg width="13px" height="10px" viewBox="0 0 13 10">
            <path d="M11,5 L1,5"></path>
            <polyline points="4 1 0 5 4 9"></polyline>
          </svg>
          <span>上一頁</span>
        </Link>
        <Link
          to="#"
          className={SB.btnR}
          onClick={(e) => {
            if (!seatflag) {
              e.preventDefault();
              Swal.fire({
                title: `請選擇 ${this.context.state.maxSelectedSeats} 個座位`,
                icon: "warning",
                confirmButtonText: "確定",
              });
            } else {
              this.goToNextPage();
            }
          }}
        >
          <span>下一頁</span>
          <svg width="13px" height="10px" viewBox="0 0 13 10">
            <path d="M1,5 L11,5"></path>
            <polyline points="8 1 12 5 8 9"></polyline>
          </svg>
        </Link>
      </div>
    );
  }
}

export default withRouter(SwitchBtn);
