const express = require("express");
const router = express.Router();
const db = require("../db"); // 导入数据库连接模块
const bcrypt = require("bcrypt"); // 用于密码加密
const saltRounds = 10; // 加密强度，可以根据需要调整
const { body, validationResult } = require("express-validator");

// 注册路由
router.post(
  "/",
  [
    // 使用 express-validator 进行请求参数验证
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 6 }),
    body("username").isLength({ min: 1 }),
    body("phonenumber").matches(/^\d{4}\d{3}\d{3}$/),
  ],
  async (req, res) => {
    // 检查验证结果
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    }

    // 从请求中获取用户信息
    const { email, password, username, gender, birthday, phonenumber, addressCity, addressTown, addressDetail, moviePreferences } = req.body;

    try {
      // 检查用户是否已经存在
      const result = await new Promise((resolve, reject) => {
        db.exec("SELECT * FROM member WHERE email = ?", [email], (results, fields) => {
          if (results && results.length > 0) {
            resolve(results);
          } else {
            resolve(null);
          }
        });
      });

      if (result && result.length > 0) {
        return res.status(420).json({ error: "用户已存在" });
      }

      // 使用 bcrypt 加密用户密码
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // 将用户信息插入数据库
      db.exec(
        "INSERT INTO member (email, password, username, gender, birthday, phonenumber, addressCity, addressTown, addressDetail, moviePreferences) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [email, hashedPassword, username, gender, birthday, phonenumber, addressCity, addressTown, addressDetail, moviePreferences],
        (results, fields) => {
          if (results && results.insertId) {
            // 注册成功
            console.log('註冊成功:', results);
            res.status(201).json({ success: true, message: "註冊成功" });
          }
        }
      );
    } catch (error) {
      console.error("註冊時出現錯誤：", error);
      res.status(506).json({ success: false, error: "註冊失敗" });
    }
  }
);

module.exports = router;
