const url = require('url');
const user = require('../../model/user');

module.exports = function (req, res) {

    const data = req.body;
    // 检查用户是否存在
    user.find({username: data.username})
        .then(docs => {
            if (docs.length > 0) {
                // 用户不存在
                console.log('用户已存在');
                res.send({
                    code: 99999,
                    status: 'user exist'
                });
                return;
            }

            // 保存数据库
            user.save(data)
                .then(user => {
                    console.log('保存数据库成功');
                    // 创建会话
                    req.session.username = user.username;
                    // 返回 成功代码、状态说明
                    res.send({
                        code: 10000,
                        status: 'register success'
                    });
                    console.log('用户%s注册成功并登陆', user.username);
                })
                .catch(err => {
                    console.log('保存数据库出错');
                    res.send({
                        code: 99999,
                        status: 'data base error'
                    });
                });
        })
        .catch(err => {
            res.send({
                code: 99999,
                status: 'data base error'
            });
        });
}
