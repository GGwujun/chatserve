const express = require('express');

// Session
const session = require('express-session')({
    name: 'wchat.user',
    secret: 'wchat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
});

module.exports = function (app) {

    // 记录所有在线用户
    app.user = {};
    // 静态资源
    app.use('/', express.static('www'));

    // 解决跨域问题
    app.use((req, res, next) => {
        res.set({
            // 跨域cookie 不能为通配符 *
            'Access-Control-Allow-Origin': 'http://localhost:8808',
            'Access-Control-Allow-Methods': 'GET,POST',
            // 跨域cookie必须为true
            'Access-Control-Allow-Credentials': true
        });
        next();
    });
    // session
    app.use(session);

    // 用户
    app.use('/user', require('./user'));


    const checkLogin = require('./user/check');
    // 好友
    app.use('/friend', checkLogin, require('./friend'));

    // 话题
    app.use('/topic', checkLogin, require('./topic'));

    // 消息管理
    app.use('/message', checkLogin, require('./message'));

    app.use('/ws', require('./ws'));
}

