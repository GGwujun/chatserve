// 创建express应用
const app = require('express')();
app.set('trust proxy', 1);

// WebSocket
const expressWS = require('express-ws')(app);

// 路由
require('./routes')(app);

// 启动一个http服务器
app.listen(4000, function() {
    console.log('Server is running on: ', this.address().port);
});

// 连接数据库
const mongoose = require('mongoose');
mongoose.connect('mongodb://root:Gao876337@dds-wz98240a3c3a5cc41.mongodb.rds.aliyuncs.com:3717,dds-wz98240a3c3a5cc42.mongodb.rds.aliyuncs.com:3717/admin?replicaSet=mgset-3215499');

const db = mongoose.connection;
db.on('error', () => {
    console.log('连接数据库失败');
});
db.once('open', () => {
    console.log('连接数据库成功');
});
