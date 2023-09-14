var express = require("express");
var db = require("../db");
var comment = express.Router();

//取得movieID, userID, sendTime, comment, score
comment.get("/", function (req, res) {
    const movieNameCN = req.query.movieNameCN; // 获取电影名字作为筛选条件

    // 构建 SQL 查询，仅获取特定电影的评论
    const sql = "SELECT movieID, userID, sendTime, comment, score FROM commentlist WHERE movieID IN (SELECT id FROM movie WHERE movieNameCN = ?)";

    db.exec(sql, [movieNameCN], function (results, fields) {
        res.send(JSON.stringify(results));
    });
});



//這個路由匯出以後是app.js使用
module.exports = comment;
