var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    user_type: {
        type: mongoose.Schema.Types.String,
        default: "USER",
        enum: ["USER", "ADMIN", "SYSTEM"]
    },
    status: {
        type: mongoose.Schema.Types.Number,
        default: 1
    },
    user_role: {
        type: mongoose.Schema.Types.String,
        default: 'R' //R -> read only, W -> write, E -> edit, D -> delete
    },
    sort_order: {
        type: mongoose.Schema.Types.Number,
        default: 0
    },
    added_date: {
        type: mongoose.Schema.Types.Date
    }
});

module.exports = mongoose.model('UserTypes', schema);