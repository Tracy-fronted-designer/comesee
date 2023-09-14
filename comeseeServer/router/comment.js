var express = require("express");
var db = require("../db");
var comment = express.Router();

//取得movieID, userID, sendTime, comment, score
comment.get("/", function (req, res) {
    db.exec("SELECT movieID, userID, sendTime, comment, score FROM commentlist", [], function (results, fields) {
        res.send(JSON.stringify(results));
    });
});



//這個路由匯出以後是app.js使用
module.exports = comment;
