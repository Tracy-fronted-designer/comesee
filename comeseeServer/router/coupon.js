var express = require("express");
var db = require("../db");
var coupon = express.Router();


coupon.post("/", function (req, res) {
    const body = req.body;
    const data = [body.couponID, body.userID, body.money, body.status];
  
    db.exec(
      "insert into coupon (couponID, userID, money, status) values (?, ?, ?, ?)",
      data,
      function (results, fields) {
        if (results.insertId) {
          res.json({ result: 1 });
        } else {
          res.json({ result: 0 });
        }
      }
    );
  });



// //匯出給是app.js使用
module.exports = coupon;