var express = require("express");
var db = require("../db");
var socialhome = express.Router();

//取得movie movieNameCN, releaseDate, imageUrl
socialhome.get("/", function (req, res) {
    db.exec("SELECT movieNameCN, releaseDate, imageUrl FROM movie", [], function (results, fields) {
        res.send(JSON.stringify(results));
    });
});



//這個路由匯出以後是app.js使用
module.exports = socialhome;
