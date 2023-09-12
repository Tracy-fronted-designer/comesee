var express = require("express");
var db = require("../db");
var coupon = express.Router();


// 確認可以取得資料
coupon.get("/:userID([0-9]+)", function (req, res) {
  db.exec(
    "SELECT * FROM coupon WHERE userID = ?",
    [req.params.userID],
    function (results, fields) {
      res.send(JSON.stringify(results));
    }
  );
});


// //匯出給是app.js使用
module.exports = coupon;