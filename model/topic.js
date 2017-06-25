const mongoose = require('mongoose');

module.exports = mongoose.model('message', {
    id: String,
    title: String,
    owner: String,
    create_time: String
});
