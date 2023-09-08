var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var orderlist = require("./router/orderlist");
var recommend = require("./router/recommend");
var user = require('./router/user')
var cors = require("cors");

//解析json資料
app.use(bodyParser.json());
// 跨域
app.use(cors());


app.use("/orderlist", orderlist);
app.use("/recommend",recommend);
app.use("/user",user);

app.listen(2407, function () {
    console.log("伺服器啟動中");
  });