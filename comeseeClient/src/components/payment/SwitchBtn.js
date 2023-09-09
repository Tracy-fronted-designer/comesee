import React, { Component } from "react";
import { Link,withRouter } from "react-router-dom/cjs/react-router-dom.min";

class SwitchBtn extends Component {
  state = {
    prevHovered: false,
    nextHovered: false
  };
  /* 兩者之間距離 230px */

  switchBtn = {
    padding: "61px 0 61px 0",
    textAlign: "center",
  }

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
  }
  
  
  goToNextPage = () => {
    this.props.history.push(this.props.next);
    window.scrollTo(0,0)
  };

  
  render() {
    var { prevHovered, nextHovered} = this.state;
    var {disabled} = this.props
    return (
      <div style={this.switchBtn}>
        <Link
          onClick={(e) => {
            e.preventDefault();// 防止默認行為 避免先回到底部再回到上一頁
            this.props.history.go(-2);// 返回上一頁
            setTimeout(() => {
              window.scrollTo(0, 0);
            }, 10); // 100毫秒後滾動到頂部
          }} 
          className="btn btn-line"
          style={prevHovered ? {...this.prevPage,...this.hovenBtn} : this.prevPage}
          onMouseEnter={this.prevMouseEnter}
          onMouseLeave={this.prevMouseLeave}
          
        >
          &lt;&emsp;上一頁
        </Link>
        <Link to={this.props.next}
          className="btn btn-line"
          style={nextHovered ? {...this.nextPage,...this.hovenBtn} : this.nextPage}
          onMouseEnter={this.nextMouseEnter}
          onMouseLeave={this.nextMouseLeave}
          disabled={disabled}
          onClick={e => {
            if (disabled) {
              e.preventDefault();
              alert("請輸入正確的電影票張數")
            } else {
              this.goToNextPage();
            }}}
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