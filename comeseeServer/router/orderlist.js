var express = require("express");
var db = require("../db");
var orderlist = express.Router();

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
  const { userID, showtimeID, date, price, bonus,couponID,seat,adult, student } = req.body; // 假設客戶端發送的訂單數據数在請求的 body 中
  console.log(req.body);
  // 新增到資料庫
  db.exec(
    "INSERT INTO orderlist (userID, showtimeID, date, price, bonus,couponID,seat,adult, student) VALUES (?,?,?,?,?,?,?,?,?)",
    [userID, showtimeID, date, price, bonus,couponID,seat,adult, student],
    function (results, fields) {
      if (results.insertId) {
        res.send("successfully : " + JSON.stringify(results));
      } else {
        res.send("insertError");
      }
    }
  );
});

// //匯出給是app.js使用
module.exports = orderlist;