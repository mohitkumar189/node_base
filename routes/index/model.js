var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: 'string',
});

module.exports = mongoose.model('test', schema);