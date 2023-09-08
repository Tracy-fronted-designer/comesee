var express = require("express");
var db = require("../db");
var Order = express.Router();
const app = express();
const bodyParser = require('body-parser');
const { default: Order } = require("../../src/components/member/order");

//取得該userID擁有的片單(playlistID, listname)
playlist.get("/:userID([0-9]+)", function (req, res) {
  let userID = req.params.userID;
  db.exec(
    "SELECT playlistID, listname from playlist WHERE userID = ?",
    [userID],
    function (results, fields) {
      res.send(JSON.stringify(results));
    }
  );
});

app.use(bodyParser.json());

// POST=>更新訂單
app.post('/api/update-order-status', (req, res) => {
  const newStatus = req.body.newStatus; // 新訂單狀況

  //新狀態進資料庫
  // db.updateOrderStatus(newStatus);

  res.json({ message: '訂單狀態已更新' });
});

//這個路由匯出以後是app.js使用
module.exports = Order;
