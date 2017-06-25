const user = require('../../model/user');

module.exports = function(req, res) {

    // 要添加的好友用户名
    const username = req.query.username;

    // 找到对应的web socket
    const ws = req.app.user[username];
    if (ws && ws.readyState === 1) {
        // 获取当前用户的信息
        const whereis = { username: req.session.username };
        const fields = {
            _id: 0,
            username: 1,
            pre_friends: 1
        }
        user.find(whereis, fields)
            .then(docs => {
                if (docs.length === 0) {
                    console.log('用户不存在');
                    res.send({
                        code: 99999,
                        status: 'data base error'
                    });
                }
                else {
                    // 保存数据库
                    const pre_friends = docs[0].pre_friends;
                    pre_friends.push(username);

                    user.update(whereis, { pre_friends })
                        .then(raw => {
                            const message = {
                                code: 100,
                                status: 'add friend request',
                                from: req.session.username,
                                content: {
                                    text: req.query.greeting
                                }
                            }
                            // 发送消息
                            ws.send(JSON.stringify(message));
                            // 返回成功信息
                            res.send({
                                code: 10000,
                                status: 'add friend request has send'
                            });
                        })
                        .catch(err => {
                            console.log('数据库错误');
                            res.send({
                                code: 99999,
                                status: 'data base error'
                            });
                        });
                }
            })
            .catch(err => {
                console.log('数据库错误');
                res.send({
                    code: 99999,
                    status: 'data base error'
                });
            })
    }
    else {
        // 用户未登录
        res.send({
            code: 99999,
            status: 'user not login'
        });
    }
}
