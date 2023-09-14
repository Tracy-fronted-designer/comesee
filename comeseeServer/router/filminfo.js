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




//這個路由匯出以後是app.js使用
module.exports = filminfo;