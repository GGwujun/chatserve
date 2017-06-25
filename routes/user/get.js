/**
 * 获取用户信息
 * 1. 不带参数：获取所有在线的用户
 * 2. 带参数 username：获取指定用户的详细信息
 */
const user = require('../../model/user');

module.exports = function(req, res) {

    if (req.query && req.query.username) {
        // 返回指定用户详细信息
        // 1. 检查用户是否存在
        const fields = {
            _id: 0,
            name: 1,
            username: 1,
            about_me: 1,
            sex: 1,
            age: 1,
            friends: 1
        };

        user.find(req.query, fields)
            .then(docs => {
                if (docs.length === 0) {
                    // 用户不存在
                    console.log('用户不存在');
                    res.send({
                        code: 99999,
                        status: 'user not exist'
                    });
                    return;
                }

                // 用户存在
                console.log('找到用户：', docs);
                // 判断是否在线
                const online = Object.keys(req.app.user).includes(req.query.username);
                // 判断是否是好友关系
                const friendly = docs[0].friends.includes(req.session.username);

                const user = Object.assign({
                    online,
                    friendly
                    // 防止出错，模拟深度拷贝
                }, JSON.parse(JSON.stringify(docs[0])));
                delete user.friends;

                res.send({
                    code: 10000,
                    status: 'search user success',
                    user
                });
            })
            .catch(err => {
                console.log('数据库出错');
                res.send({
                    code: 99999,
                    status: 'data base error'
                });
            });
    }
    else {
        // 返回在线用户列表
        const user_obj = req.app.user;
        delete user_obj[req.session.username];
        const users = Object.keys(user_obj);

        res.send({
            code: 10000,
            status: 'get online success',
            users
        });
    }

}
