'use strict'

const mongoose = require('mongoose');
const Service = require('./service');
const apiResponse = require('../../helpers/apiResponse')
const Model = require('./model');

exports.getAll = function (req, res, next) {
    //res.end('from all')
    //return apiResponse.sendJson(req, res, 200, "predefined message", [])
}

exports.getById = function (req, res, next) {

}

exports.save = function (req, res, next) {
    let fname = req.body.fname;
    let lname = req.body.lname;
    let model = new Model({
        _id: new mongoose.Types.ObjectId(),
        first_name: fname,
        last_name: lname
    })
    model.save((err, result) => {
        if (!err) {
            console.log(result);
            return apiResponse.sendJson(req, res, 200, result, [])
        } else {
            console.log(err);
            return apiResponse.sendJson(req, res, 200, err, [])

        }
    })

}

exports.updateOne = function (req, res, next) {

}

exports.updateAll = function (req, res, next) {

}

exports.deleteAll = function (req, res, next) {

}

exports.deleteOne = function (req, res, next) {

}