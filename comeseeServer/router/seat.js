var express = require("express");
var db = require("../db");
var seat = express.Router();

//新增座位(使用postman body->x-www-form-urlencoded  傳入theaterID,cinemaID,showtimeID,seatCount)
seat.post("/", async function (req, res) {
  try {
    let body = req.body;
    let seatCount = body.seatCount;
    let sql =
      "INSERT INTO seatinfo(theaterID, cinemaID, showtimeID, rowNumber, seatNumber, seatStatus) VALUES(?,?,?,?,?,?)";

    for (let i = 1; i <= seatCount / 10; i++) {
      for (let j = 1; j <= 10; j++) {
        // 使用 await 等待 db.exec 完成
        const results = await new Promise((resolve, reject) => {
          db.exec(
            sql,
            [body.theaterID, body.cinemaID, body.showtimeID, i, j, "empty"],
            function (results, fields) {
              if (results.insertId) {
                resolve(results);
              } else {
                reject(new Error("Insert failed"));
              }
            }
          );
        });

        // 在這裡可以處理插入成功的情況
        // ...
      }
    }

    // 所有插入完成後回傳回應
    res.json({ message: "Seat data inserted successfully" });
  } catch (error) {
    // 處理錯誤
    res.status(500).json({ error: error.message });
  }
});

//獲得url上傳入的showtimeID場次的全部座位資訊
seat.get("/:showtimeID([0-9]+)", function (req, res) {
  let showtimeID = req.params.showtimeID;
  let sql =
    "SELECT rowNumber, seatNumber, seatStatus FROM seatinfo WHERE showtimeID = ?";
  db.exec(sql, [showtimeID], function (results, fields) {
    res.send(JSON.stringify(results));
  });
});

//修改座位資訊(已售出) 基本上傳入rowNumber和seatNumber
// seat.put('/:showtimeID([0-9]+)',function(req, res){
//   let showtimeID = req.params.showtimeID;
//   let body = req.body;

// })

//這個路由匯出以後是app.js使用
module.exports = seat;
