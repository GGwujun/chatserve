
module.exports = function (req, res, next) {

    if (req.session.username) {
        next();
    }
    else {
        console.log('未登录');
        res.send({
            code: 10001,
            status: 'not login'
        });
    }
}
