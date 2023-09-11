import React, { useEffect, useState } from "react";
import axios from "axios";

import HS from '../../css/home/homePage.module.css';


const QuickOrder = () => {

  const [orderCinema, setOrderCinema] = useState([]);
  const [orderMovieList, setOrderMovieList] = useState([]);
  const [orderDate, setOrderDate] = useState([]);
  const [orderShowTime, setOrderShowTime] = useState([]);

  // 快速訂票
  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedShowtime, setSelectedShowtime] = useState("");
  const [selectedNumber, setSelectedNumber] = useState("");

  // 後端抓取影城選項
  useEffect(() => {
    axios.get('http://localhost:2407/quickorder')
      .then(res => {
        setOrderCinema(res.data);
      })
      .catch(err => {
        console.log(err.response);
      })
  }, [])

  // 影城選擇事件處理
  function handleCinemaChange(e) {
    setSelectedCinema(e.target.value);
  }

  // 篩選影片選項
  useEffect(() => {
    axios.get(`http://localhost:2407/quickorder/movielist/${selectedCinema}`)
      .then(res => {
        setOrderMovieList(res.data);
      })
      .catch(err => {
        console.log(err.response);
      })
  }, [selectedCinema])

  // 影片選擇事件處理
  function handleMovieChange(e) {
    setSelectedMovie(e.target.value);
  }

  // 篩選日期選項
  useEffect(() => {
    axios.post('http://localhost:2407/quickorder/getDate', {
      movieID: selectedMovie,
      cinemaID: selectedCinema
    })
      .then(res => {
        // 刪除res.data多餘的內容
        // "date": "2023-09-02T16:00:00.000Z" => 刪去T之後的字串
        // 再map出新的modifiedData 去設置orderDate的state
        const modifiedData = res.data.map(item => {

          // 將原始日期字串轉換成 JavaScript 的日期物件
          const originalDate = new Date(item.date);

          // 將日期加一天
          originalDate.setDate(originalDate.getDate() + 1);

          // 取得加一天後的日期字串
          const nextDayDate = originalDate.toISOString().split("T")[0];

          return {
            date: nextDayDate
          };
          // date: item.date.split("T")[0]
        });
        setOrderDate(modifiedData);
      })
      .catch(err => {
        console.log(err.response);
      })
  }, [selectedMovie, selectedCinema])

  // 日期選擇事件處理
  function handleDateChange(e) {
    setSelectedDate(e.target.value);
  }

  // 篩選場次選項
  useEffect(() => {
    axios.post('http://localhost:2407/quickorder/getStartTime', {
      movieID: selectedMovie,
      cinemaID: selectedCinema,
      date: selectedDate
    })
      .then(res => {
        setOrderShowTime(res.data);
      })
      .catch(err => {
        console.log(err.response);
      })
    console.log(selectedDate);
  }, [selectedMovie, selectedCinema, selectedDate])


  // 場次選擇事件處理
  function handleShowtimeChange(e) {
    setSelectedShowtime(e.target.value);
  }

  // 人數選擇事件處理
  function handleNumberChange(e) {
    setSelectedNumber(e.target.value);
  }

  // 購票事件處理
  // function BuyNow() {
  // 在這裡處理購票的邏輯
  // alert("你好");
  // }



  return (
    <>
      {/* 快速訂票 */}
      <form className={HS.Order}>
        <div className={HS.subtitle} style={{ marginBottom: "40px" }}>快速訂票</div>

        {/* 選擇影城 */}
        <select className={HS.mySelect} onChange={handleCinemaChange}>
          <option selected>請選擇影城</option>
          {/* map options */}
          {orderCinema.map((orderItem, index) =>
            <option
              key={index}
              value={orderItem.cinemaID}
            >
              {orderItem.cinemaName}
            </option>
          )}
        </select>


        {/* 選擇影片 */}
        <select className={HS.mySelect} onChange={handleMovieChange}>
          <option selected>請選擇影片</option>
          {/* map options */}
          {orderMovieList.map((orderItem, index) =>
            <option
              key={index}
              value={orderItem.movieID}
            >
              {orderItem.movieName}
            </option>
          )
          }
        </select>

        {/* 選擇日期 */}
        <select className={HS.mySelect} onChange={handleDateChange}>
          <option selected>請選擇日期</option>
          {/* map options */}
          {orderDate.map((orderItem, index) =>
            <option
              key={index}
              value={orderItem.date}
            >
              {orderItem.date}
            </option>
          )
          }
        </select>

        {/* 選擇場次 */}
        <select className={HS.mySelect} onChange={handleShowtimeChange}>
          <option selected>請選擇場次</option>
          {/* map options */}
          {orderShowTime.map((orderItem, index) =>
            <option
              key={index}
              value={orderItem.startTime}
            >
              {orderItem.startTime}
            </option>
          )
          }
        </select>

        <select className={HS.mySelect}>
          <option selected>請選擇人數</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>

        <button
          type="button"
          className={HS.quickBtn} // onClick={BuyNow}
          data-bs-toggle="modal"
          data-bs-target="#Modal"
        >
          即刻購票
        </button>
        {/* 打包 */}
      </form>

      <div
        className="modal fade"
        id="Modal"
        tabIndex={-1}
        aria-labelledby="ModalLabel"
        aria-hidden="true"
      >

        <div className="modal-dialog modal-dialog-centered">
          <div className={HS.modalcontent}>
            <div className={HS.modalheader}>
              <button
                type="button"
                className={`${HS.modalclose} btn-close`}
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className={HS.modalbody}>
              <h3 className={HS.modaltitle}>注意</h3>
              <p className={HS.modaltext}>您目前所選的時段已無空位</p>
              <p className={HS.modaltext}>請重新選擇</p>
            </div>
            <div className={HS.modalfooter}>
              <button
                type="button"
                className={HS.modalcheck}
                data-bs-dismiss="modal"
              >
                確認
              </button>
            </div>
          </div>
        </div>

      </div>








    </>
  );

}

export default QuickOrder;
