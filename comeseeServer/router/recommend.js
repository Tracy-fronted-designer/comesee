var express = require("express");
var db = require("../db");
var recommend = express.Router();

recommend.get("/:movieID([0-9]+)", function (req, res) {
  const movieID = req.params.movieID;

  // 找movieID的movieType
  db.exec(
    "SELECT movieType FROM movie WHERE id = ?",
    [movieID],
    function (results, fields) {
      // res.send(JSON.stringify(results)); // 檢查結果用
      const movieType = results[0].movieType;

      // 子類型拆開
      const subTypes = movieType.split(',');

      // 用like找只要包含其中一個的類型就可以
      const query = subTypes.map(subType => `movieType LIKE '%${subType}%'`).join(' OR ');

      // 使用查询条件来查找推荐电影
      db.exec(
        `SELECT * FROM movie WHERE (${query}) AND id != ? ORDER BY RAND() LIMIT 5`,
        [movieID],
        function (results, fields) {
          res.send(JSON.stringify(results));
        }
      );
    }
  );
});


// 匯出給是app.js使用
module.exports = recommend;