import React, { useEffect, useState } from "react";
import axios from "axios";

import HS from "../../css/home/homePage.module.css";

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
  const [showModal, setShowModal] = useState(false);

  // 後端抓取影城選項
  useEffect(() => {
    axios
      .get("http://localhost:2407/quickorder")
      .then((res) => {
        setOrderCinema(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  // 影城選擇事件處理
  function handleCinemaChange(e) {
    setSelectedCinema(e.target.value);
    setSelectedMovie("");
    setSelectedDate("");
    setSelectedShowtime("");
    setSelectedNumber("");
  };

  // 篩選影片選項
  useEffect(() => {
    axios
      .get(`http://localhost:2407/quickorder/movielist/${selectedCinema}`)
      .then((res) => {
        setOrderMovieList(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [selectedCinema]);

  // 影片選擇事件處理
  function handleMovieChange(e) {
    setSelectedMovie(e.target.value);
    setSelectedDate("");
    setSelectedShowtime("");
    setSelectedNumber("");
  };

  // 篩選日期選項
  useEffect(() => {
    let mt = selectedMovie.split(",");
    axios
      .post("http://localhost:2407/quickorder/getDate", {
        movieID: parseInt(mt[0]),
        cinemaID: selectedCinema,
        theaterID: parseInt(mt[1]),
      })
      .then((res) => {
        // 刪除res.data多餘的內容
        // "date": "2023-09-02T16:00:00.000Z" => 刪去T之後的字串
        // 再map出新的modifiedData 去設置orderDate的state
        const modifiedData = res.data.map((item) => {
          // 將原始日期字串轉換成 JavaScript 的日期物件
          const originalDate = new Date(item.date);
          // 將日期加一天
          originalDate.setDate(originalDate.getDate() + 1);
          // 取得加一天後的日期字串
          const nextDayDate = originalDate.toISOString().split("T")[0];
          return {
            date: nextDayDate,
          };
          // date: item.date.split("T")[0]
        });
        setOrderDate(modifiedData);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [selectedMovie, selectedCinema]);

  // 日期選擇事件處理
  function handleDateChange(e) {
    setSelectedDate(e.target.value);
    setSelectedShowtime("");
    setSelectedNumber("");
  };

  // 篩選場次選項
  useEffect(() => {
    axios
      .post("http://localhost:2407/quickorder/getStartTime", {
        movieID: selectedMovie,
        cinemaID: selectedCinema,
        date: selectedDate,
      })
      .then((res) => {
        setOrderShowTime(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
    console.log(selectedDate);
  }, [selectedMovie, selectedCinema, selectedDate]);

  // 場次選擇事件處理
  function handleShowtimeChange(e) {
    setSelectedShowtime(e.target.value);
    setSelectedNumber("");
  };

  // 人數選擇事件處理
  function handleNumberChange(e) {
    setSelectedNumber(e.target.value);
  };

  // 購票事件處理

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };



  // function BuyNow(e) {
  //   // 在這裡處理購票的邏輯

  //   alert("你好");
  //   e.preventDefault();
  // }

  return (
    <>
      {/* 快速訂票 */}
      <form className={HS.Order}>
        <div className={HS.subtitle} style={{ marginBottom: "40px" }}>
          快速訂票
        </div>

        {/* 選擇影城 */}
        <select
          value={selectedCinema}
          className={HS.mySelect}
          onChange={handleCinemaChange}
        >
          <option value="">請選擇影城</option>
          {/* map options */}
          {orderCinema.map((orderItem, index) => (
            <option key={index} value={orderItem.cinemaID}>
              {orderItem.cinemaName}
            </option>
          ))}
        </select>

        {/* 選擇影片 */}
        <select
          value={selectedMovie}
          className={HS.mySelect}
          onChange={handleMovieChange}
        >
          <option value="">請選擇影片</option>
          {/* map options */}
          {orderMovieList.map((orderItem, index) => (
            <option
              key={index}
              value={orderItem.movieID + "," + orderItem.theaterID}
            >
              {orderItem.movieName}
            </option>
          ))}
        </select>

        {/* 選擇日期 */}
        <select
          value={selectedDate}
          className={HS.mySelect}
          onChange={handleDateChange}
        >
          <option value="">請選擇日期</option>
          {/* map options */}
          {orderDate.map((orderItem, index) => (
            <option key={index} value={orderItem.date}>
              {orderItem.date}
            </option>
          ))}
        </select>

        {/* 選擇場次 */}
        <select
          value={selectedShowtime}
          className={HS.mySelect}
          onChange={handleShowtimeChange}
        >
          <option value="">請選擇場次</option>
          {/* map options */}
          {orderShowTime.map((orderItem, index) => (
            <option key={index} value={orderItem.startTime}>
              {orderItem.startTime}
            </option>
          ))}
        </select>

        <select
          value={selectedNumber}
          className={HS.mySelect}
          onChange={handleNumberChange}
        >
          <option value="">請選擇人數</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>

        <button
          type="button"
          className={HS.quickBtn}
          onClick={openModal}
        // data-bs-toggle="modal"
        // data-bs-target="#Modal"
        >
          即刻購票
        </button>

        <button
          type="button"
          className="btn btn-primary"
          onClick={openModal}
        >
          打開模擬框
        </button>



        {/* 打包 */}
      </form>

      {/* <div
        className="modal fade"
        id="Modal"
        tabindex="-1"
        aria-labelledby="ModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className={`${HS.modalcontent} modal-content`}>
            <div className={`${HS.modalheader} modal-header`}>
              <button
                type="button"
                className={`${HS.modalclose} btn-close`}
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className={`${HS.modalbody} modal-body`}>
              <h3 className={HS.modaltitle}>注意</h3>
              <p className={HS.modaltext}>您目前所選的時段已無空位</p>
              <p className={HS.modaltext}>請重新選擇</p>
            </div>
            <div className={`${HS.modalfooter} modal-footer`}>
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
      </div> */}

      {showModal && (

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  模态框标题
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">模态框内容</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  取消
                </button>
                <button type="button" className="btn btn-primary">
                  确定
                </button>
              </div>
            </div>
          </div>
        </div>

      )}

    </>
  );
};

export default QuickOrder;
