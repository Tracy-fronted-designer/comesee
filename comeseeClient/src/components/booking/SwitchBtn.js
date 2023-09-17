import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom/cjs/react-router-dom.min";

import TicketContext from "../../TicketContext";

import Swal from "sweetalert2";
class SwitchBtn extends Component {
  static contextType = TicketContext;
  state = {
    prevHovered: false,
    nextHovered: false,
  };
  /* 兩者之間距離 230px */

  switchBtn = {
    padding: "61px 0 61px 0",
    textAlign: "center",
  };

  prevPage = {
    color: "#F1EFE9",
    fontFamily: "Noto Sans TC",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "28px",
    marginRight: "115px",
  };

  nextPage = {
    color: "#F1EFE9",
    fontFamily: "Noto Sans TC",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "28px",
    marginLeft: "115px",
  };

  hovenBtn = {
    fontWeight: "800",
  };

  goToNextPage = () => {
    this.props.history.push(this.props.next);
    window.scrollTo(0, 0);
  };

  render() {
    var { prevHovered, nextHovered } = this.state;
    var seatflag = this.props.seatflag; //傳入的seatflag判斷是否有超過最大選擇座位
    // console.log(seatflag);
    return (
      <div style={this.switchBtn}>
        <Link
          to="#" // 將 "#" 用作連結的 placeholder，因為上一頁不需要指定路由
          onClick={() => this.props.history.goBack()} // 返回上一頁
          className="btn btn-line"
          style={
            prevHovered ? { ...this.prevPage, ...this.hovenBtn } : this.prevPage
          }
          onMouseEnter={this.prevMouseEnter}
          onMouseLeave={this.prevMouseLeave}
        >
          &lt;&emsp;上一頁
        </Link>
        <Link
          // to={this.props.next}
          to="#"
          onClick={() => this.goToNextPage()}
          // onClick={(e) => {
          //   if (!seatflag) {
          //     e.preventDefault();
          //     // alert(`請選擇 ${this.context.state.maxSelectedSeats} 個座位`);
          //     Swal.fire({
          //       title: `請選擇 ${this.context.state.maxSelectedSeats} 個座位`,
          //       icon: "warning",
          //       confirmButtonText: "確定",
          //     });
          //   } else {
          //     this.goToNextPage();
          //   }
          // }}
          className="btn btn-line"
          style={
            nextHovered ? { ...this.nextPage, ...this.hovenBtn } : this.nextPage
          }
          onMouseEnter={this.nextMouseEnter}
          onMouseLeave={this.nextMouseLeave}
        >
          下一頁&emsp;&gt;
        </Link>
      </div>
    );
  }
  prevMouseEnter = () => {
    this.setState({ prevHovered: true });
  };

  prevMouseLeave = () => {
    this.setState({ prevHovered: false });
  };

  nextMouseEnter = () => {
    this.setState({ nextHovered: true });
  };

  nextMouseLeave = () => {
    this.setState({ nextHovered: false });
  };
}

export default withRouter(SwitchBtn);
