var express = require("express");
var db = require("../db");
var quickorder = express.Router();

// quickorder.get('/', function (req, res) {
//     res.send({
//     });
//     res.end();
// });

// 取得影城 
quickorder.get("/", function (req, res) {
    db.exec("SELECT * FROM cinema", [], function (results, fields) {
        res.send(JSON.stringify(results));
    });
});

// 取得影片
quickorder.get("/movielist/:cinemaID", function (req, res) {
    let cinemaID = req.params.cinemaID
    db.exec("SELECT DISTINCT CONCAT(movieNameCN, '(', version, ')') AS movieName, movieID FROM (SELECT movieID, movieNameCN, theaterID FROM showTime AS s LEFT JOIN movie AS m ON s.movieID = m.id WHERE cinemaID = ?) AS aa LEFT JOIN theater AS t ON aa.theaterID = t.theaterID;", [cinemaID], function (results, fields) {
        res.send(JSON.stringify(results));
    });
});

// 取得日期
quickorder.post("/getDate", function (req, res) {
    let movieID = req.body.movieID;
    let cinemaID = req.body.cinemaID;
    db.exec("SELECT DISTINCT date FROM(SELECT date FROM showtime WHERE movieID = ? AND cinemaID = ?) as aa", [movieID, cinemaID], function (results, fields) {
        res.send(JSON.stringify(results));
    });
});

// 取得場次時間
quickorder.post("/getStartTime", function (req, res) {
    let movieID = req.body.movieID;
    let cinemaID = req.body.cinemaID;
    let date = req.body.date;
    db.exec("SELECT startTime FROM showtime WHERE movieID = ? AND cinemaID = ? AND DATE(date) = ?", [movieID, cinemaID, date], function (results, fields) {
        res.send(JSON.stringify(results));
    });
});















//這個路由匯出以後是app.js使用
module.exports = quickorder;