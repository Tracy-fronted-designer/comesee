import React, { Component } from "react";
import CPC from "../../css/payment/cpc.module.css";
import Sidebar from "./Sidebar";
import BtnLargeHover from "./btnLargeHover";
import ImgHover from "./ImgHover";
import axios from 'axios';

import TicketContext from "../../TicketContext";

class PaymentCompleted extends Component {

  static contextType = TicketContext //設定使用context

  state = {
    recommendedMovies:[],
  };
  

  render() {
    return (
      <div className={CPC.mainBg}>
        <div className={"container "+CPC.contentBackground}>
          <div className="row">
            <div className={"col-3 "+CPC.cpcSidebar}>
              <Sidebar currentPage="購票完成" />
            </div>
            <div className="col">
              <div className={CPC.completeRight}>
                <p className={CPC.completeP1}>購票完成!</p>
                <p className={CPC.completeP2} style={{ marginTop: "50px" }}>
                  感謝您的訂購
                </p>
                <p className={CPC.completeP2}>可至會員中心查詢訂票紀錄</p>
              </div>
              <div
                className={CPC.completeRight}
                style={{ justifyContent: "center", marginTop: "30px" }}
              >
                <BtnLargeHover label="回首頁" onClick={this.goHome} />
                <BtnLargeHover label="會員中心" onClick={this.goMemberCenter} />
              </div>
              <div className={CPC.recommend}>
                <p>你可能感興趣...</p>

                {this.state.recommendedMovies.map((movieInfo, index) => {
                  // console.log(movieInfo) 
                  return (
                    <span key={index}>
                    <ImgHover
                      src={movieInfo.imageUrl}
                      alt="電影圖"
                      onBuyClick={() => this.goBuy(movieInfo.id)}
                      onMovieClick={() => this.goMovie(movieInfo.id)}
                    />
                  </span>

                  )
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 從後端拿到推薦電影

  async componentDidMount() {
    try {
      const res = await axios.get(`http://localhost:2407/recommend/${this.context.state.movieID}`);
      // console.log(res); //object
      this.setState({ recommendedMovies: res.data }); //data 裡面是 array(電影資料)
    } catch (error) {
      console.error(error);
    }
  }

  goHome = () => {
    this.props.history.push("/");
    window.scrollTo(0, 0);
  };

  goMemberCenter = () => {
    this.props.history.push("/Member");
    window.scrollTo(0, 0);
  };

  goBuy = () => {
    this.props.history.push(`/Info/${this.context.state.movieID}`);
    window.scrollTo(0, 0);
  }

  goMovie = () => {
    this.props.history.push(`/Info/${this.context.state.movieID}`);
    window.scrollTo(0, 0);
  }
}

export default PaymentCompleted;
