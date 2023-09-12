import React, { Component } from "react";
import TicketContext from "./TicketContext";

export class TicketProvider extends Component {
  constructor(props) {
    super(props);
    const savedState =
      JSON.parse(localStorage.getItem("ticketContextState")) || {};
    // 要共享的 state
    this.state = {
      ...savedState,

      userID: 2,

      // 電影資訊
      movieID: 3,
      releaseDate: "2023-07-21",
      movieLength: "03時00分",
      movieType: "歷史/傳記,劇情",
      director: "克里斯多福諾蘭(ChristopherNolan)",
      actor:
        "席尼墨菲(CillianMurphy)、艾蜜莉布朗(EmilyBlunt)、麥特戴蒙(MattDamon)、小勞勃道尼(RobertDowneyJr.)、佛蘿倫絲普伊(FlorencePugh)、蓋瑞歐德曼(GaryOldman)、肯尼斯布萊納(KennethBranagh)、詹姆斯瑞馬(JamesRemar)、傑克奎德(JackQuaid)、雷米馬利克(RamiMalek)、喬許哈奈特(JoshHartnett)、高斯塔夫史卡司加德(GustafSkarsgård)、馬提亞斯史維克福(MatthiasSchweighöfer)、奧莉薇雅朵比(OliviaThirlby)",

      // 訂票資訊
      adultTickets: 0,
      studentTickets: 0,
      popcornL: 0,
      popcornS: 0,
      colaL: 0,
      colaS: 0,
      canProceed: false,

      img: "https://movies.yahoo.com.tw/i/o/production/movies/May2023/Qc1HYHrRQcOf5Vc49EK2-1024x1622.jpg",
      activeRow1: null,
      nameC: "小美人魚",
      grade: "普 0+",
      nameE: "The Little Mermaid",
      cinemaName: "台中大遠百威秀影城",
      theaterName: "2D",
      date: "2023-08-18",
      day: "星期五",
      startTime: "09:45",
      ticketName: ["全票", "學生票"],
      ticketNum: ["1", "1"],
      ticketMoney: ["350", "300"],
      //maxSelectedSeats由選則人數(首頁開始)頁面更新，預設應為0
      maxSelectedSeats: 5,
      seatNumber: "4A, 3A",
      foodName: ["爆米花(大)", "爆米花(小)", "可樂(大)", "可樂(小)"],
      foodNum: ["1", "1", "1", "1"],
      foodMoney: ["120", "80", "50", "35"],

      // 紅利點數
      discount: 0,
      usePoint: 0,

      // 優惠券
      couponID: ["無", "超級優惠券 100元", "普通優惠券 50元"],
      selectedCoupon: "無", //預設
      couponDiscountMapping: {
        無: 0,
        "超級優惠券 100元": 100,
        "普通優惠券 50元": 50,
      },
      couponDiscount: 0, //預設

      // 折扣加總
      allDiscount: 0,

      // TicketType小計、discount金額
      subtotal: 0,

      //discount小計、confirm總計
      total: 0,

      // 訂票系統(品)選擇時間時會有對應的showtimeID
      showtimeID: 1,

      //----------------------------------------------------------------------

      //浩維選位頁面需要
      //選擇座位頁面以選擇的座位，訂單頁面需要從selectedSeats拿取選到的位置
      selectedSeats: [],


      //若選擇的座位等於maxSelectedSeats則seatflag = true
      seatflag: false,
    };

    this.setStateValue = this.setStateValue.bind(this);
    this.setDiscount = this.setDiscount.bind(this);
    this.setSelectedCoupon = this.setSelectedCoupon.bind(this);
    this.setSubtotal = this.setSubtotal.bind(this);
  }

  componentDidUpdate() {
    // 更新後，將state保存在本地端
    localStorage.setItem("ticketContextState", JSON.stringify(this.state));
  }

  setStateValue = (newState) => {

     // 狀態如果是 selectedSeats
  if ('selectedSeats' in newState) {
    const { selectedSeats } = newState;
    const seatNumbers = selectedSeats.map((seat) => {
    return `${seat.rowNumber}排${seat.seatNumber}位`;
    });
    // selectedSeats 輸出的格式放入seatNumber
    newState.seatNumber = seatNumbers.join(', ');
  }


    this.setState(newState);
  };

  // 紅利點數
  setDiscount = (discount) => {
    this.setState({ discount }, () => {
      this.updateAllDiscount();
    });
    // console.log(discount);
  };

  // 優惠券
  setSelectedCoupon = (selectedCoupon) => {
    const couponDiscount =
      this.state.couponDiscountMapping[selectedCoupon] || 0;
    // console.log(couponDiscount)
    this.setState({ selectedCoupon, couponDiscount }, () => {
      this.updateAllDiscount();
    });
    // console.log(`coupon: ${selectedCoupon}, Discount: ${couponDiscount}`);
  };

  // 優惠總額
  updateAllDiscount = () => {
    const { discount, couponDiscount } = this.state;
    const newAllDiscount = discount + couponDiscount;
    this.setState({ allDiscount: newAllDiscount }, () => {
      console.log(this.state.allDiscount);
    });
  };

  //小計
  setSubtotal(subtotal) {
    this.setState({ subtotal });
  }

  //總計
  setTotal(total) {
    this.setState({ total });
  }

  render() {
    return (
      <TicketContext.Provider
        value={{
          state: this.state,
          setState: this.setStateValue,
          setDiscount: this.setDiscount,
          setSelectedCoupon: this.setSelectedCoupon,
          setSubtotal: this.setSubtotal,
          setTotal: this.setTotal,
        }}
      >
        {this.props.children}
      </TicketContext.Provider>
    );
  }
}
