const mongoose = require('mongoose');

module.exports = mongoose.model('message', {
    id: String,
    content: String,
    topic_id: String,
    user_id: String,
    create_time: String
});
