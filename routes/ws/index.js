const router = require('express').Router();

router.ws('/', function(ws, req, next) {

    const user = req.session.username
    if (user) {
        // 保存用户
        req.app.user[user] = ws;
        next();
    }
    else {
        ws.upgradeReq.destroy();
    }
}, function(ws, req) {

    const user = req.session.username
    console.log('用户%s已连接！', user);

    // 收到客户端的消息
    ws.on('message', message => {
        // 接收到消息后，解析消息来转发给对应的用户
        message = JSON.parse(message);
        // 添加消息来源
        message.from = user;

        if (message.to === 'all') {
            for (username in req.app.user) {
                const client = req.app.user[username];
                if (client !== ws && client.readyState === 1) {
                    console.log('转发消息到聊天室');
                    delete message.to;

                    client.send(JSON.stringify(Object.assign({
                        code: 300,
                        status: 'chatroom message'
                    }, message)));
                }
            }
            return;
        }

        const toClient = req.app.user[message.to];
        if (toClient && toClient.readyState === 1) {
            console.log('转发消息到', message.to);
            delete message.to;

            toClient.send(JSON.stringify(Object.assign({
                        code: 200,
                        status: 'private message'
                    }, message)));
        }
    });

    // 连接关闭后触发
    ws.on('close', (code, reason) => {
        console.log('用户%s已断开！', user);
        delete req.app.user[user];
    });

    ws.on('error', err => {

    });
    ws.on('headers', (headers, res) => {

    });
});

module.exports = router;
