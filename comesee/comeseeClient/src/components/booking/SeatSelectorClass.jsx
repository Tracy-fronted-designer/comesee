import React, { Component } from "react";

import styles from "../../css/booking/seatSelectorClass.module.css";

class SeatSelectorClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSeats: [], // 初始化已選座位陣列
    };
    // 設置座位最多能選擇的數量
    this.maxSelectedSeats = 3;
  }

  // 獲取座位狀態的函數
  getSeatStatus = (rowNumber, seatNumber) => {
    // 根據傳入的座位資訊this.props.seatinfo與參數的rowNumber, seatNumber比對符合的座位，並輸出第一筆符合的資料
    const seat = this.props.seatinfo.find(
      //seat不等於上面的const seat，它只是遍歷的元素
      (seat) => seat.rowNumber === rowNumber && seat.seatNumber === seatNumber
    );

    // 如果找到座位則返回其狀態，否則返回 "empty"
    return seat ? seat.seatStatus : "empty";
  };

  // 處理座位點擊事件
  selectSeat = (seat) => {
    const { rowNumber, seatNumber } = seat;
    const seatStatus = this.getSeatStatus(rowNumber, seatNumber);

    const { selectedSeats } = this.state;
    const isSelected = selectedSeats.some(
      (selectedSeat) =>
        selectedSeat.rowNumber === rowNumber &&
        selectedSeat.seatNumber === seatNumber
    );

    // 判斷已選擇座位數是否小於最大可選擇座位數
    if (selectedSeats.length < this.maxSelectedSeats) {
      if (seatStatus === "empty") {
        // 處理座位為空的點擊事件
        this.handleEmptySeatClick(isSelected, seat, rowNumber, seatNumber);
      } else if (seatStatus === "selected") {
        // 處理座位已選的點擊事件
        this.handleSelectedSeatClick(isSelected, seat, rowNumber, seatNumber);
      }
    } else {
      // 處理已達到最大選擇座位數的情況
      this.handleMaxSelectedSeats(isSelected, seat, rowNumber, seatNumber);
    }

    // console.log(this.state.selectedSeats);
  };

  // 處理座位為空的點擊事件
  handleEmptySeatClick = (isSelected, seat, rowNumber, seatNumber) => {
    const { selectedSeats } = this.state;
    if (isSelected) {
      // 如果座位已选择，移除该座位的选择状态
      const updatedSelectedSeats = selectedSeats.filter(
        (selectedSeat) =>
          !(
            selectedSeat.rowNumber === rowNumber &&
            selectedSeat.seatNumber === seatNumber
          )
      );
      this.setState({ selectedSeats: updatedSelectedSeats });
      // 更新座位状态为 "empty"
      this.props.updateSeatStatus(rowNumber, seatNumber, "empty");
    } else {
      // 如果座位未选择，添加该座位到已选择数组中，并更新座位状态为 "selected"
      const selectedSeat = { ...seat, seatStatus: "selected" };
      this.setState((prevState) => ({
        selectedSeats: [...prevState.selectedSeats, selectedSeat],
      }));
      this.props.updateSeatStatus(rowNumber, seatNumber, "selected");
    }
  };

  // 处理座位已选的点击事件
  handleSelectedSeatClick = (isSelected, seat, rowNumber, seatNumber) => {
    const { selectedSeats } = this.state;
    // 移除已选择的座位
    const updatedSelectedSeats = selectedSeats.filter(
      (selectedSeat) =>
        !(
          selectedSeat.rowNumber === rowNumber &&
          selectedSeat.seatNumber === seatNumber
        )
    );
    this.setState({ selectedSeats: updatedSelectedSeats });
    // 更新座位状态为 "empty"
    this.props.updateSeatStatus(rowNumber, seatNumber, "empty");
  };

  // 处理达到最大选择座位数的情况
  handleMaxSelectedSeats = (isSelected, seat, rowNumber, seatNumber) => {
    if (isSelected) {
      const { selectedSeats } = this.state;
      // 移除已选择的座位
      const updatedSelectedSeats = selectedSeats.filter(
        (selectedSeat) =>
          !(
            selectedSeat.rowNumber === rowNumber &&
            selectedSeat.seatNumber === seatNumber
          )
      );
      this.setState({ selectedSeats: updatedSelectedSeats });
      // 更新座位状态为 "empty"
      this.props.updateSeatStatus(rowNumber, seatNumber, "empty");
    } else {
      // 输出已达到最大选择座位数的提示
      console.log("已選座位數量已達到最大限制");
    }
  };

  // 渲染座位图的函数
  renderSeatMap = () => {
    const seatsPerRow = 10; // 每行座位数
    const seatRows = Math.ceil(this.props.seatinfo.length / seatsPerRow); // 计算需要多少行

    const rows = []; // 存储渲染的每一行座位
    for (let rowIndex = 0; rowIndex < seatRows; rowIndex++) {
      // 根据当前行号，切片得到属于当前行的座位数组
      const rowSeats = this.props.seatinfo.slice(
        rowIndex * seatsPerRow,
        (rowIndex + 1) * seatsPerRow
      );

      // 生成当前行的 JSX 元素
      const row = (
        <div key={rowIndex} className={styles.seatRow}>
          <div className={styles.rowLabel}>{rowIndex + 1}</div> {/* 显示行号 */}
          {rowSeats.map((seat) => (
            <div
              key={`${seat.rowNumber}-${seat.seatNumber}`}
              className={`${styles.seat} ${
                styles[this.getSeatStatus(seat.rowNumber, seat.seatNumber)]
              } ${
                styles[
                  this.state.selectedSeats.some(
                    (selectedSeat) =>
                      selectedSeat.rowNumber === seat.rowNumber &&
                      selectedSeat.seatNumber === seat.seatNumber
                  )
                    ? "selected"
                    : ""
                ]
              }`}
              onClick={() => this.selectSeat(seat)} // 设置点击事件处理函数
            ></div>
          ))}
        </div>
      );

      rows.push(row); // 将当前行添加到行数组中
    }

    return rows; // 返回存储了所有行的数组
  };

  // 渲染列標籤
  renderColumnLabels = () => {
    const seatsPerRow = 10; // 每排座位數
    const columnLabels = [];

    //總共11格，第0格沒數字
    for (let columnIndex = 0; columnIndex <= seatsPerRow; columnIndex++) {
      columnLabels.push(
        <div key={columnIndex} className={styles.columnLabel}>
          {columnIndex === 0 ? "" : columnIndex}
        </div>
      );
    }

    return columnLabels;
  };

  render() {
    return (
      <div className={styles.seatMap}>
        {this.renderSeatMap()} {/* 渲染座位圖 */}
        <div className={styles.columnLabels}>
          {/* <div className="column-label"></div> 空白占位 */}
          {this.renderColumnLabels()} {/* 渲染列標籤 */}
        </div>
      </div>
    );
  }
}

export default SeatSelectorClass;
