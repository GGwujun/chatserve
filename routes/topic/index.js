const router = require('express').Router();

// 中间件
router.use(() => {});

// 获取话题列表
router.get('/', () => {});
// 创建话题
router.post('/', () => {});
// 查看话题
router.get('/:topic_id', () => {});


module.exports = router;
