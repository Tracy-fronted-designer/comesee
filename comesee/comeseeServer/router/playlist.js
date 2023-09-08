var express = require("express");
var db = require("../db");
var order = express.Router();

//取得該userID訂單
order.get("/:userID([0-9]+)", function (req, res) {
  let userID = req.params.userID;
  db.exec(
    "SELECT playlistID, listname from playlist WHERE userID = ?",
    [userID],
    function (results, fields) {
      res.send(JSON.stringify(results));
    }
  );
});

//訂單
order.get("/movieCount/:playlistID([0-9]+)", function (req, res) {
  let playlistID = req.params.playlistID;
  db.exec(
    "SELECT COUNT(*) as movieCount from movieinplaylist WHERE playlistID = ?",
    [playlistID],
    function (results, fields) {
      res.send(JSON.stringify(results));
    }
  );
  // db.exec(
  //   "SELECT MovieID from movieinplaylist WHERE playlistID = ?",
  //   [playlistID],
  //   function (results, fields) {
  //     res.send(JSON.stringify(results));
  //   }
  // );
});

//在movieinplaylist資料表中取得該playlistID擁有的電影ID與imageUrl
order.get("/movieinplaylist/:playlistID([0-9]+)", function (req, res) {
  let playlistID = req.params.playlistID;

  db.exec(
    "SELECT m.ID, m.movieNameCN, m.imageUrl FROM movieinplaylist mp LEFT JOIN movie m ON mp.MovieID = m.ID WHERE mp.playlistID = ?",
    [playlistID],
    function (results, fields) {
      res.send(JSON.stringify(results));
    }
  );
});

//這個路由匯出以後是app.js使用
module.exports = playlist;
