var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var orderlist = require("./router/orderlist");
var recommend = require("./router/recommend");
var playlist = require("./router/playlist");
var seat = require("./router/seat");
var user = require("./router/user");
var cors = require("cors");

//解析json資料
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 跨域
app.use(cors());

//使用靜態檔案
app.use("/", express.static("public"));

app.use("/orderlist", orderlist);
app.use("/recommend", recommend);
app.use("/user", user);
app.use("/seat", seat);
app.use("/playlist", playlist);

app.listen(2407, function () {
  console.log("伺服器啟動中");
});
