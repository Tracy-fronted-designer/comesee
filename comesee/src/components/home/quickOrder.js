import React, { Component } from 'react';
import HS from '../../css/home/homePage.module.css';
import Qbtn from './Qbtn';

class QuickOrder extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedValue: ""
    }
  }

  render() {

    // const handleChange = (e) => { 
    //   this.setState({ selectedValue: e.target.value })
    // }

    return (
      <>
        {/* 快速訂票 */}
        <form className={HS.Order}>
          <div className={HS.subtitle} style={{ marginBottom: "40px" }}>快速訂票</div>

          <select className={HS.mySelect}
            // onChange={(e) => handleChange(e)}
          >
            <option selected>請選擇影城</option>
            {/* {this.props.options.map(arrayItem => <option value={arrayItem}>{arrayItem}</option>)} */}
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>

          <select className={HS.mySelect}>
            <option selected>請選擇影片</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>

          <select className={HS.mySelect}>
            <option selected>請選擇日期</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>

          <select className={HS.mySelect}>
            <option selected>請選擇場次</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>

          <select className={HS.mySelect}>
            <option selected>請選擇人數</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>

          <Qbtn label="即刻購票" onClick={this.buyNow} />
        </form>
      </>
    );
  }

  buyNow = () => {
    alert("你好")
  };
}

export default QuickOrder;
