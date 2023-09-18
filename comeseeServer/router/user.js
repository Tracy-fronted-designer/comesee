var express = require("express");
var db = require("../db");
var user = express.Router();

//取得全部user
user.get("/", function (req, res) {
  db.exec("SELECT * FROM member", [], function (results, fields) {
    res.send(JSON.stringify(results));
  });
});

// 查詢特定userID的資料
user.get("/:userID([0-9]+)", function (req, res) {
  let userID = req.params.userID;
  db.exec(
    "SELECT * FROM member WHERE userID = ?",
    [userID],
    function (results, fields) {
      res.send(JSON.stringify(results));
    }
  );
});

//新增user資訊，註冊會員
user.post("/", function (req, res) {
  let body = req.body;
  let data = [body.userName, body.email];

  db.exec(
    "INSERT INTO member(userName, email) VALUES(?,?)",
    data,
    function (results, fields) {
      if (results.insertId) {
        res.json({ result: 1 });
      } else {
        res.json({ result: 0 });
      }
    }
  );
});

//刪除特定user資料
user.delete("/:userID([0-9]+)", function (req, res) {
  let userID = req.params.userID;
  db.exec(
    "DELETE FROM member WHERE userID = ?",
    [userID],
    function (results, fields) {
      if (results.affectedRows) {
        res.json({ result: 1 });
      } else {
        res.json({ result: 0 });
      }
    }
  );
});

//修改user資訊(url傳入的userID是要針對哪個userID去更改他的userName和email)
user.put("/:userID([0-9]+)", function (req, res) {
  let {
    userName,
    gender,
    birthday,
    selectedCity,
    selectedTown,
    address,
    selfintro,
  } = req.body;
  let userID = req.params.userID;

  let data = [
    userName,
    gender,
    birthday,
    selectedCity,
    selectedTown,
    address,
    selfintro,
    userID,
  ];
  db.exec(
    "UPDATE member SET userName=?, gender=?, birthday=?, addressCity=?, addressTown=?, addressDetail=?, selfintro=? WHERE userID = ?",
    data,
    function (results, fields) {
      if (results.affectedRows) {
        res.json({ result: 1 });
      } else {
        res.json({ result: 0 });
      }
    }
  );
});

//這個路由匯出以後是app.js使用
module.exports = user;
