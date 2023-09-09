var express = require("express");
var db = require("../db");
var recommend = express.Router();

recommend.get("/:id([0-9]+)", function (req, res) {
  // 找出這部電影的類型
  db.exec(
    "SELECT movieType FROM movie WHERE id = ?",
    // 從URL獲得
    [req.params.id],
    function (results, fields) {
      // res.send(JSON.stringify(results)); // 檢查結果用
      const movieType = results[0].movieType;
      // 找同類型電影(隨機五部)
      db.exec(
        "SELECT * FROM movie WHERE movieType LIKE ? and id != '3' ORDER BY RAND() LIMIT 5",
        [`%${movieType}%`, req.params.id],
        function (results, fields) {
          res.send(JSON.stringify(results));
        }
      );
    }
  );

});



// //匯出給是app.js使用
module.exports = recommend;