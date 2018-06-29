'use strict'
const moment = require('moment');
const mongoose = require('mongoose');
const appRoot = require('app-root-path');

exports.currentDate = () => {
    return new moment();
}

exports.isValidId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId);
}
exports.isValidPhone = (phone) => {
    return true;
}
exports.generateOtp = (length) => {
    return '1234';
}
exports.getRootPath = () => {
    return ""+appRoot;
}