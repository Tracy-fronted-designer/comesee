import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom/cjs/react-router-dom.min";

import SB from "../../css/payment/SwitchBtn.module.css"
import Swal from "sweetalert2";

class SwitchBtn extends Component {

  goToNextPage = () => {
    this.props.history.push(this.props.next);
    window.scrollTo(0, 0)
  };


  render() {
    var { disabled } = this.props
    return (
      <div className={SB.switchBtn}>
        <Link
          onClick={(e) => {
            e.preventDefault();// 防止默認行為 避免先回到底部再回到上一頁
            this.props.history.go(-2);// 返回上一頁
            setTimeout(() => {
              window.scrollTo(0, 0);
            }, 10); // 100毫秒後滾動到頂部
          }}
          className={SB.btnL}
          onMouseEnter={this.prevMouseEnter}
          onMouseLeave={this.prevMouseLeave}

        >
          <svg width="13px" height="10px" viewBox="0 0 13 10">
            <path d="M11,5 L1,5"></path>
            <polyline points="4 1 0 5 4 9"></polyline>
          </svg>
          <span>上一頁</span>
        </Link>
        <Link to={this.props.next}
          className={SB.btnR}
          onMouseEnter={this.nextMouseEnter}
          onMouseLeave={this.nextMouseLeave}
          disabled={disabled}
          onClick={(e) => {
            if (disabled) {
              e.preventDefault();
              Swal.fire({
                title: `請輸入正確的電影票張數`,
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