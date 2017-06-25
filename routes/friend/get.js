const user = require('../../model/user');

module.exports = function(req, res) {

    user.find({username: req.session.username})
        .then(docs => {
            const friends = docs[0].friends;

            console.log('获取好友列表成功');
            res.send({
                code: 10000,
                status: 'get friends success',
                friends
            });
        })
        .catch(err => {
            console.log('数据库错误');
            res.send({
                code: 99999,
                status: 'data base error'
            });
        });
};
