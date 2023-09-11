import React, { Component, createRef } from "react";
import CPC from "../../css/payment/cpc.module.css";
import Sidebar from "./Sidebar";
import BtnLarge from "./btnLarge";
import BtnMedium from "./btnMedium";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import PaymentModal from "./PaymentModal";
import axios from 'axios';


import TicketContext from "../../TicketContext";

class Payment extends Component {

  static contextType = TicketContext //設定使用context

  constructor(props) {
    super(props);
    // console.log(props)
    this.state = {
      phone: '0912345678',
      email: 'AA@gmail.com',

      err: false,
      activeRow1: null,
      activeRow2: null,
      showModal: false,
    };
    //鎖定input的ref
    this.input1 = createRef();
    this.input2 = createRef();
    this.input3 = createRef();
    this.input4 = createRef();
    this.input5 = createRef();
    this.input6 = createRef();
    this.input7 = createRef();

    this.phone = createRef();
    this.email = createRef();

  }

  render() {
    return (
      <div>
        <div className={CPC.mainBg}>
          <div className={"container " + CPC.contentBackground}>
            <div className="row">
              <div className={"col-3 " + CPC.cpcSidebar}>
                <Sidebar currentPage="開始結帳" />
              </div>
              <div className={"col " + CPC.paymentRight}>
                <div className="row">
                  {/* 付款工具  */}
                  <p className={CPC.paymentP}>付款工具</p>
                  <div style={{ paddingLeft: "50px" }}>
                    <BtnLarge
                      label="信用卡"
                      isActive={this.state.activeRow1 === "信用卡"}
                      onClick={() => this.btnClick("Row1", "信用卡")}
                    />
                    <BtnLarge
                      label="Line Pay"
                      isActive={this.state.activeRow1 === "Line Pay"}
                      onClick={() => this.btnClick("Row1", "Line Pay")}
                    />
                    <BtnLarge
                      label="現場付款"
                      isActive={this.state.activeRow1 === "現場付款"}
                      onClick={() => this.btnClick("Row1", "現場付款")}
                    />
                  </div>

                  {this.state.activeRow1 === "信用卡" && (
                    <div className={CPC.creditCard}>
                      <div className={CPC.creditTitle}>
                        {/* 信用卡號  */}
                        信用卡號
                        <input
                          className={CPC.creditNum}
                          type="text"
                          placeholder="0000"
                          ref={this.input1}
                          maxLength="4"
                          onChange={(e) => this.inputNum(e, this.input2)}
                        />
                        <input
                          className={CPC.creditNum}
                          type="text"
                          placeholder="0000"
                          ref={this.input2}
                          maxLength="4"
                          onChange={(e) => this.inputNum(e, this.input3)}
                        />
                        <input
                          className={CPC.creditNum}
                          type="text"
                          placeholder="0000"
                          ref={this.input3}
                          maxLength="4"
                          onChange={(e) => this.inputNum(e, this.input4)}
                        />
                        <input
                          className={CPC.creditNum}
                          type="text"
                          placeholder="0000"
                          ref={this.input4}
                          maxLength="4"
                          onChange={(e) => this.inputNum(e, this.input5)}
                        />
                      </div>
                      <div className={CPC.creditTitle}>
                        {/* 信用卡日期  */}
                        到期年/月
                        <input
                          className={CPC.creditDate}
                          type="text"
                          placeholder="年"
                          maxLength="2"
                          ref={this.input5}
                          onChange={(e) => this.inputDate(e, this.input6)}
                        />
                        <input
                          className={CPC.creditDate}
                          type="text"
                          placeholder="月"
                          maxLength="2"
                          ref={this.input6}
                          onChange={(e) => this.inputDate(e, this.input7)}
                        />
                        <span className={CPC.creditCode}>
                          驗證碼
                          <input
                            className={CPC.creditDate}
                            type="text"
                            placeholder="000"
                            maxLength="3"
                            ref={this.input7}
                            onChange={(e) => this.creditCode(e)}
                          />
                        </span>
                        <div style={{ marginTop: "30px" }}>
                          <input type="checkbox" /><span style={{ paddingLeft: "6px" }}>記住我的信用卡資訊</span>
                        </div>
                      </div>
                      <div>
                        {this.state.err && (
                          <p className={CPC.creditP}>※ 請輸入正確信用卡號</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className={"row " + CPC.paymentBill}>
                  {/* 電子發票  */}
                  <p className={CPC.paymentP}>電子發票</p>
                  <div style={{ paddingLeft: "50px" }}>
                    <BtnLarge
                      label="會員載具"
                      isActive={this.state.activeRow2 === "會員載具"}
                      onClick={() => this.btnClick("Row2", "會員載具")}
                    />

                    {this.state.activeRow2 === "會員載具" && (
                      <input
                        style={{ marginLeft: "0", marginRight: "80px" }}
                        type="text"
                        placeholder="/XXXXXXX"
                        className={CPC.memBill}
                      />
                    )}


                    <BtnLarge
                      label="捐贈"
                      isActive={this.state.activeRow2 === "捐贈"}
                      onClick={() => this.btnClick("Row2", "捐贈")}
                    />
                  </div>
                </div>
                <div className={"row " + CPC.memInfo}>
                  {/* 訂購人資料  */}
                  <p className={CPC.paymentP}>訂購人資料</p>
                  <div>
                    <div className={CPC.memPhone}>
                      電&emsp;&emsp;話&emsp;
                      <input
                        type="text"
                        value={this.state.phone}
                        ref={this.phone}
                        onKeyDown={(e) => this.keyEnter(e, this.email)}
                        onChange={(e) => this.setState({ phone: e.target.value })}
                        
                      />
                    </div>
                    <div className={CPC.memEmail}>
                      電子郵件&emsp;
                      <input
                        type="text"
                        value={this.state.email}
                        ref={this.email}
                        onChange={(e) => this.setState({ email: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <div className={CPC.paymentBtn}>
                  <BtnMedium
                    label="結帳"
                    className={CPC.paymentBtn}
                    onClick={this.toggleModal}
                  />
                </div>
                <PaymentModal
                  show={this.state.showModal}
                  onClose={this.toggleModal} //點背景會消失互動視窗
                >
                  <div className={CPC.ticketRule}>
                    <h6>一、訂票及取票規定：</h6>
                    <ol>
                      <li>
                        線上完成訂票後，系統將即時進行信用卡帳戶扣款，凡於訂購場次開演前皆可至影城櫃台取票（取票無時間限制）。
                      </li>
                    </ol>
                    <h6> 二、退換票規定： </h6>
                    <ol>
                      <li>
                        訂票後最晚於場次開演前2小時前，皆可於線上取消訂票，超過此時限，則需最晚於場次開演前30分鐘前，親至訂購影城現場櫃台辦理退票，未辦理取消、退票或逾時未取票，將不退還該筆金額，恕不得要求退款或更改其他場次時間。
                      </li>
                      <li>
                        退換票請持原電影票辨理，電影票遺失恕不補發，亦無法辦理退換票。
                      </li>
                      <li>
                        需攜帶購票之信用卡辦理退票（如未攜帶原購票信用卡，恕無法辦理退換票）。
                      </li>
                      <li>
                        可訂多取少或取票後退票（不限張數）;至影城現場辦理全數退票及取消訂票者，系統將於電影開演後一個工作天退還您的消費款項（訂票手續費恕不退還）；部分退票者（如：訂三張取一張），為配合影城作業時間，將於電影場次開演當月月底統一進行退款（訂票手續費將依原訂票數收取）。
                      </li>
                      <li>
                        使用影城通電影優惠序號，若取消訂票或取票後退票，因應影城系統核對作業時間，將於退票完成後三個工作天，恢復您的優惠序號資格。
                      </li>
                    </ol>
                  </div>
                  <div className={"row " + CPC.ticketRuleBtn}>
                    <BtnMedium label="同意" onClick={this.confirmCheckout} />
                  </div>
                </PaymentModal>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  btnClick = (row, label) => {
    // console.log(row);//第幾個Row
    // console.log(label);// label名稱
    this.setState({ ["active" + row]: label });
  };

  // 檢查是否為數字
  inputNum = (e, next) => {
    // console.log(e.target.value) //輸入的值
    // console.log(next) //鎖定下一格
    var num = /^[0-9]*$/;
    if (!num.test(e.target.value)) {
      // console.log(num.test(e.target.value)); //非數字就會出現false
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
      this.setState({ err: true });
    } else {
      this.setState({ err: false });
    }
    // 檢查是否達到最大長度（4個字符） 大於等於4就跳到下一格
    if (e.target.value.length >= 4) {
      next.current.focus();
    }
  };

  // 檢查是否為數字
  inputDate = (e, next) => {
    // console.log(e.target.value) //輸入的值
    // console.log(next) //鎖定下一格
    var num = /^[0-9]*$/;
    if (!num.test(e.target.value)) {
      // console.log(num.test(e.target.value)); //非數字就會出現false
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
      this.setState({ err: true });
    } else {
      this.setState({ err: false });
    }
    // 檢查是否達到最大長度（4個字符） 大於等於4就跳到下一格
    if (e.target.value.length >= 2) {
      next.current.focus();
    }
  };

  // 檢查是否為數字
  creditCode = (e) => {
    // console.log(e.target.value) //輸入的值
    // console.log(next) //鎖定下一格
    var num = /^[0-9]*$/;
    if (!num.test(e.target.value)) {
      // console.log(num.test(e.target.value)); //非數字就會出現false
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
      this.setState({ err: true });
    } else {
      this.setState({ err: false });
    }
  };

  keyEnter = (e, next) => {
    if (e.key === "Enter") {
      // console.log(e)
      next.current.focus();
    }
  };


  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  confirmCheckout = () => {
    const { state } = this.context;
    // console.log("Context state:", state);
    const dataToBeSent = {
      userID: state.userID,
      showtimeID: state.showtimeID,
      date: state.date,
      price: state.total,
      bonus:state.usePoint,
      couponID: state.selectedCoupon,
      seat:state.seatNumber,
      adult:state.adultTickets,
      student:state.studentTickets,

    };

    axios.post('http://localhost:2407/orderlist/create', dataToBeSent)
      .then(res => {
        // console.log("Data sent successfully:", res.data);
        this.props.history.push("./PaymentCompleted");
        window.scrollTo(0, 0);
      })
      .catch(error => {
        console.log("Error sending data:", error);
      });
  };

  componentDidMount() {
    axios.get(`http://localhost:2407/user/${this.context.state.userID}`)
      .then((res) => {
        // console.log(res.data[0])
        const userphone = res.data[0].phone;
        const useremail = res.data[0].email;
        this.setState({
          phone: userphone,
          email: useremail,
        });

        if(userphone === undefined){
          this.setState({phone: "尚未登入",}) 
        }else if (useremail === undefined){
          this.setState({email: "尚未登入",})
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}


export default withRouter(Payment);
