var express = require("express");
var db = require("../db");
var playlist = express.Router();

//取得該userID擁有的片單(playlistID, listname)
playlist.get("/:userID([0-9]+)", function (req, res) {
  let userID = req.params.userID;

  db.exec(
    "SELECT playlistID, listname from playlist WHERE userID = ?",
    [userID],
    function (results, fields) {
      res.send(JSON.stringify(results));
    }
  );
});

//在movieinplaylist資料表中取得該playlistID擁有的電影數量
playlist.get("/movieCount/:playlistID([0-9]+)", function (req, res) {
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
playlist.get("/movieinplaylist/:playlistID([0-9]+)", function (req, res) {
  let playlistID = req.params.playlistID;

  db.exec(
    "SELECT m.ID, m.movieNameCN, m.imageUrl FROM movieinplaylist mp LEFT JOIN movie m ON mp.MovieID = m.ID WHERE mp.playlistID = ?",
    [playlistID],
    function (results, fields) {
      res.send(JSON.stringify(results));
    }
  );
});

//會員中心新增片單
playlist.post("/create/:userID([0-9]+)", function (req, res) {
  let userID = req.params.userID;
  let listname = req.body.listname; // 使用req.body裝listname

  db.exec(
    "INSERT INTO playlist (userID, listname) VALUES (?, ?)",
    [userID, listname],
    function (results, fields) {
      res.send(JSON.stringify(results));
      console.log(listname);
    }
  );
});

//以userID與movieID判斷該使用者是否有收藏此電影
playlist.get("/like/:userID([0-9]+)/:MovieID([0-9]+)", function (req, res) {
  let MovieID = req.params.MovieID;
  let userID = req.params.userID;

  db.exec(
    "SELECT * FROM movieinplaylist AS mip LEFT JOIN playlist AS p ON mip.playlistID = p.playlistID WHERE MovieID = ? AND userID = ?",
    [MovieID, userID],
    function (results, fields) {
      // console.log(results.length);
      if (results.length > 0) {
        res.json({ result: 1 });
      } else {
        res.json({ result: 0 }); 
      }
    }
  );
});

//這個路由匯出以後是app.js使用
module.exports = playlist;
