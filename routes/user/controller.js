'use strict'

const mongoose = require('mongoose');
const Service = require('./service');
const apiResponse = require('../../helpers/apiResponse')
const Model = require('./model');
const logger = require('../../helpers/logger');
const common = require('../../helpers/common');

module.exports = {
    getAll: (req, res, next) => {
    },
    getById: (req, res, next) => {

    },
    updateOne: (req, res, next) => {

    },
    updateAll: (req, res, next) => {

    },
    deleteAll: (req, res, next) => {

    },
    deleteOne: (req, res, next) => {

    },
    save: (req, res, next) => {
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
}