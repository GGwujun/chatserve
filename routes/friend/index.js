const router = require('express').Router();

// 解析body
// const bodyParser = require('body-parser');
// const bodys = [
//     bodyParser.json(),
//     bodyParser.urlencoded({ extended: true })
// ];

// 添加好友
router.get('/add', require('./add'));

// 接受添加好友请求
router.get('/accept', require('./accept'));

// 获取好友列表
router.get('/', require('./get'));

module.exports = router;
