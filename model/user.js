const mongoose = require('mongoose');

const User = mongoose.model('user', {
    u_id: mongoose.Schema.Types.ObjectId,
    username: String,    // 注册用户名
    password: String,   // 用户密码

    name: { type: String, default: '默认昵称' },  // 用户昵称
    age: { type: Number, default: Math.round(Math.random() * 100) },
    sex: { type: String, default: 'female' },
    about_me: { type: String, default: '岁月静好，可你还不来' },
    registed_time: {type: Date, default: Date.now },   // 注册时间

    friends: [String],     // 用户好友列表
    pre_friends: [String],   // 已添加但对方还未接受的好友列表
    topics: [String]       // 用户消息列表（话题）
});
// 创建
exports.save = function(data) {
    return new Promise((resolve, reject) => {
        new User(data).save((err, user, num) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(user, num);
            }
        });
    });
};

// 查找
exports.find = function(conditions, fileds, options) {
    return new Promise((resolve, reject) => {
        User.find(conditions, fileds, options, (err, docs) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(docs);
            }
        });
    });
}

// 修改
exports.update = function(conditions, doc, options) {
    return new Promise((resolve, reject) => {
        User.update(conditions, doc, options, (err, raw) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(raw);
            }
        });
    });
}

// 删除
exports.remove = function(conditions) {
    return new Promise((resolve, reject) => {
        User.remove(conditions, (err, err => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        }));
    });
}
