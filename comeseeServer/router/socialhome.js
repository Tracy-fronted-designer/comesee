var express = require("express");
var db = require("../db");
var socialhome = express.Router();

//取得movie movieNameCN, releaseDate, imageUrl
// socialhome.get("/", function (req, res) {
//     db.exec("SELECT id, movieNameCN, releaseDate, imageUrl FROM movie", [], function (results, fields) {
//         res.send(JSON.stringify(results));
//     });
// });

socialhome.get("/", function (req, res) {
    db.exec("SELECT m.id, m.movieNameCN, m.releaseDate, m.imageUrl, c.comment, c.userID FROM movie m LEFT JOIN commentlist c ON m.id = c.movieID", [], function (results, fields) {
        // 在后端按电影ID分组评论
        const movieComments = {};
        results.forEach((row) => {
            const { id, movieNameCN, releaseDate, imageUrl, comment, userID, userName } = row;
            if (!movieComments[id]) {
                movieComments[id] = {
                    movieNameCN,
                    releaseDate,
                    imageUrl,
                    comments: [],
                };
            }
            if (comment) {
                movieComments[id].comments.push({ userID, userName, comment });
            }
        });
        const movieCommentsArray = Object.values(movieComments);
        res.send(JSON.stringify(movieCommentsArray));
    });
});

socialhome.get("/members", function (req, res) {
    db.exec("SELECT userID, userName FROM member", [], function (results, fields) {
        res.send(JSON.stringify(results));
    });
});



//這個路由匯出以後是app.js使用
module.exports = socialhome;
