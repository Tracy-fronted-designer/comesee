var express = require("express");
var db = require("../db");
var orderlist = express.Router();
const orderlist = express();

orderlist.get("/:orderID([0-9]+)", function (req, res) {
  db.exec(
    "SELECT * FROM orderlist WHERE orderID = ?",
    [req.params.orderID],
    function (results, fields) {
      res.send(JSON.stringify(results));
    }
  );
});

orderlist.post("/create", function (req, res) {
  const { userID, showtimeID, seatID, date, price } = req.body; // 假設客戶端發送的訂單數據数在請求的 body 中
  console.log(req.body);
  // 新增到資料庫
  db.exec(
    "INSERT INTO orderlist (userID, showtimeID,seatID,date,price) VALUES (?,?,?,?,?)",
    [userID, showtimeID, seatID, date, price],
    function (results, fields) {
      if (results.insertId) {
        res.send("successfully : " + JSON.stringify(results));
      } else {
        res.send("insertError");
      }
    }
  );
});

orderlist.get('/orderlist', (req, res) => {
  const newStatus = "SELECT * FROM orderlist"; // 新訂單狀況
  db.query(newStatus,(err,data)=>{
    if(err) return res.json(err)
    return res.send(JSON.stringify(data))
  })

  //新狀態進資料庫
  // db.updateOrderStatus(newStatus);

  // res.json({ message: '訂單狀態已更新' });
});

// //匯出給是app.js使用
module.exports = orderlist;