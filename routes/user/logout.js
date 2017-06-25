const url = require('url');

module.exports = function (req, res) {

    const username = req.session.username;
    req.session.destroy(err => {
        if (err) {
            console.log('注销失败');
            res.send({
                code: 99999,
                status: 'logout error'
            });
            return;
        }

        console.log('用户%s已注销', username);
        // 清除cookie
        res.clearCookie();
        res.send({
            code: 10000,
            status: 'logout success'
        });
    });
}
