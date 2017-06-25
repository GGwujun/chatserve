const router = require('express').Router();

// 解析body
const bodyParser = require('body-parser');
const bodys = [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true })
];

const checkLogin = require('./check');

// 获取用户
router.get('/', checkLogin, require('./get'));
// 获取自己的用户信息
router.get('/self', checkLogin, require('./self'));

// 注册
router.post('/register', bodys, require('./register'));
// 登录
router.post('/login', bodys, require('./login'));
// 检查登录
router.get('/login', checkLogin, function(req, res) {
    res.send({
        code: 10000,
        status: 'logged in'
    })
});
// 注销
router.get('/logout', require('./logout'));


module.exports = router;
