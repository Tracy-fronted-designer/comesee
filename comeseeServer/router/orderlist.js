var express = require("express");
var db = require("../db");
var orderlist = express.Router();
var cors = require("cors");

orderlist.use(cors());


orderlist.get("/", (req, res) => {
  const sql = "SELECT * FROM orderlist";
  db.exec(sql, (err, results) => {
    if (err) return res.json(err);
    return res.send(JSON.stringify(results));
  });
});


//取消訂單=>1變0，當訂單status是0就會說已被取消
orderlist.patch("/orders/:orderID", (req, res) => {
  const orderID = req.params.orderID;
  const sql = "UPDATE `orderlist` SET status = 0 WHERE orderID = ? AND status = 1";

  db.exec(sql, [orderID], (results, fields) => {
    if (results.changedRows) {
      res.status(200).json({ message: "訂單成功取消" });
    } else {
        res.status(404).json({ message: "該訂單已被取消" });}
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
  )});
});


orderlist.get("/:status([0-1]+)", (req, res) => {
  const status = req.params.status;

  const sql = `
  SELECT
  o.orderID,
  o.userID,
  o.showtimeID,
  m.movieNameCN,
  m.movieNameEN,
  m.imageUrl,
  o.seat,
  o.date,
  o.price,
  o.bonus,
  o.couponID,
  o.adult,
  o.student,
  o.status,
  s.movieID,
  c.cinemaName,
  t.theaterName,
  DATE_FORMAT(o.date, '%a') AS dayOfWeek,
  DATE_FORMAT(o.date, '%Y-%m-%d') AS showtimeDate

  FROM
  orderlist o
  JOIN
  showtime s ON o.showtimeID = s.showtimeID
  JOIN
  cinema c ON s.cinemaID = c.cinemaID
  JOIN
  theater t ON s.theaterID = t.theaterID
  JOIN
  movie m ON s.movieID = m.id
  WHERE
  o.status = ?;
`;

  db.exec(sql, [status], (err, data) => {
    if (err) return res.json(err);
    return res.send(JSON.stringify(data));
  });
});

// //匯出給是app.js使用
module.exports = orderlist;
