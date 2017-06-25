const user = require('../../model/user');

module.exports = function(req, res) {

    const fields = {
        _id: 0,
        username: 1,
        name: 1,
        age: 1,
        sex: 1,
        about_me: 1
    };
    user.find({username: req.session.username}, fields)
        .then(docs => {
            const user = docs[0];
            console.log('获取用户信息成功');
            res.send({
                code: 10000,
                status: 'get user success',
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
