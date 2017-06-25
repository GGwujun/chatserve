const user = require('../../model/user');

module.exports = function (req, res) {

    const data = req.body;
    // 检查用户
    user.find(data)
        .then(docs => {
            if (docs.length === 0) {
                console.log('用户不存在');
                res.send({
                    code: 99999,
                    status: 'user not exist'
                });
                return;
            }

            // 保存session
            req.session.username = data.username;
            // 返回 成功代码、状态说明
            res.send({
                code: 10000,
                status: 'login success'
            });
            console.log('用户%s已登录', req.session.username);
        })
        .catch(err => {
            console.log('保存数据库出错');
            res.send({
                code: 99999,
                status: 'data base error'
            });
        });
}
