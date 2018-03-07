var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first_name: 'string',
    last_name: 'string'
});

module.exports = mongoose.model('User', schema);