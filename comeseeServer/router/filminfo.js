var express = require("express");
var db = require("../db");
var filminfo = express.Router();

// 資訊頁: 設定url // 
// movieID / imageUrl / movieNameCN / movieNameEN
// releaseDate / movieLength / movieType / director / actor

// score / like?
// story / 影片url

// social / comment / 使用者頭貼 / 使用者名稱

// 取得指定電影的相關資訊

filminfo.get("/:id", function (req, res) {
    let id = req.params.id;
    db.exec(
        "SELECT * FROM `movie` WHERE id=?",
        [id],
        function (results, fields) {
            res.send(JSON.stringify(results));
        }
    );
});

filminfo.get("/order", function (req, res) {
    db.exec("SELECT * FROM cinema", [], function (results, fields) {
        res.send(JSON.stringify(results));
    });
});

// 指定電影id 搜尋該電影場次 取得日期、影城、版本(影廳)、時間

// 指定電影id 搜尋該電影場次日期
filminfo.get("/getdate/:movieID", function (req, res) {
    let movieID = req.params.movieID;
    db.exec("SELECT DISTINCT DATE_FORMAT(date, '%Y-%m-%d') AS showtimeDate FROM `showtime` WHERE movieID = ?",
        [movieID],
        function (results, fields) {
            res.send(JSON.stringify(results));
        });
});

// 透過日期搜尋 該電影有上映的影城
filminfo.post("/getcinema", function (req, res) {
    let movieID = req.body.movieID;
    let date = req.body.date;
    db.exec("SELECT DISTINCT cinemaName,c.cinemaID FROM `showtime` AS s LEFT JOIN `cinema` AS c ON s.cinemaID= c.cinemaID WHERE movieID=? AND date=? ",
        [movieID, date],
        function (results, fields) {
            res.send(JSON.stringify(results));
        });
});

// 查看該日期 該影城 有上映的場次
filminfo.post("/getversion", function (req, res) {
    let movieID = req.body.movieID;
    let cinemaID = req.body.cinemaID;
    let date = req.body.date;
    db.exec("SELECT DISTINCT t.version, t.theaterID FROM `theater` AS t INNER JOIN ( SELECT cinemaID, theaterID, startTime FROM `showtime` WHERE movieID = ? AND cinemaID = ? AND date = ? ) AS s ON t.cinemaID = s.cinemaID AND t.theaterID = s.theaterID",
        [movieID, cinemaID, date],
        function (results, fields) {
            res.send(JSON.stringify(results));
        });
});

// 該場次時間
filminfo.post("/getshowtime", function (req, res) {
    let movieID = req.body.movieID;
    let cinemaID = req.body.cinemaID;
    let theaterID = req.body.theaterID;
    let date = req.body.date;
    db.exec("SELECT showtimeID,startTime FROM `showtime` WHERE movieID=? AND cinemaID = ? AND theaterID=? AND date=?",
        [movieID, cinemaID, theaterID, date],
        function (results, fields) {
            res.send(JSON.stringify(results));
        });
});

// 場次ID 顯示詳細資料
filminfo.get("/getcheck/:showtimeID", function (req, res) {
    let showtimeID = req.params.showtimeID;
    db.exec("SELECT * FROM showtime AS s INNER JOIN cinema AS c ON s.cinemaID = c.cinemaID INNER JOIN movie AS m ON s.movieID = m.id INNER JOIN theater AS t ON s.theaterID = t.theaterID WHERE showtimeID = ?",
        [showtimeID],
        function (results, fields) {
            res.send(JSON.stringify(results));
        });
});



//這個路由匯出以後是app.js使用
module.exports = filminfo;