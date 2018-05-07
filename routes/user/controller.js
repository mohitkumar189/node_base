'use strict'

const Service = require('./service');
const apiResponse = require('../../helpers/apiResponse')
const Model = require('./model');
const logger = require('../../helpers/logger');
const common = require('../../helpers/common');
const constants = require('../../config/constants')
const _ = require('underscore');

module.exports = {
    /*
    /---------------------------ROOT LEVEL-----------------
    */
    getAll: async (req, res, next) => {
        const body = req.query;
        let searchObject = {};

        for (const key in body) {
            if (body.hasOwnProperty(key)) {
                searchObject[key] = body[key];
            }
        }
        try {
            let data = await Service.getAll(searchObject);
            apiResponse.sendJson(req, res, 200, constants.DATA_FETCHED, data);
        } catch (err) {
            next(new Error(constants.FETCHING_ERROR + " " + err.message));
        }
    },
    save: async (req, res, next) => {
        const body = req.body;
        let data = body.data;

        if (!common.isValidPhone(data.phone)) {
            return next(new Error(constants.INVALID_PHONE));
        }
        const searchObject = {
            phone: data.phone
        };
        try {
            let res1 = await Service.getOne(searchObject);
            if (_.isEmpty(res1)) {
                //register user
                logger.logger.info("register here");

                try {
                    let res2 = await Service.save(data);
                    return apiResponse.sendJson(req, res, 201, constants.DATA_SAVED, res2);
                } catch (err) {
                    return next(new Error(constants.SAVING_ERROR + " " + err.message));
                }
            } else {
                //login process starts here
                //destructing userId
                const {
                    _id: userId
                } = res1;

                let {
                    otp,
                    _id
                } = await Service.loginStart(userId);
                //send otp here 
                //use _id for otp verification
                const returnedToClient = {
                    "uid": userId,
                    "oid":_id
                }
                logger.logger.info("login here" + otp + " " + _id);
                return apiResponse.sendJson(req, res, 201, constants.DATA_SAVED, returnedToClient);
            }
        } catch (err) {
            return next(new Error(constants.FETCHING_ERROR + " " + err.message));
        }

    },
    updateAll: async (req, res, next) => {
        const body = req.body;
        let updateObject = body.data;
        let searchObject = body.filter;

        try {
            let data = await Service.updateAll(searchObject, updateObject);
            apiResponse.sendJson(req, res, 201, constants.DATA_UPDATED, data);
        } catch (err) {
            next(new Error(constants.UPDATING_ERROR + " " + err.message));
        }
    },
    patchUpdateAll: async (req, res, next) => {
        const body = req.body;
        let updateObject = body.data;
        let searchObject = body.filter;

        try {
            let data = await Service.updateAll(searchObject, updateObject);
            apiResponse.sendJson(req, res, 201, constants.DATA_UPDATED, data);
        } catch (err) {
            next(new Error(constants.UPDATING_ERROR + " " + err.message));
        }
    },
    //done
    deleteAll: async (req, res, next) => {
        const body = req.body;
        let searchObject = body.filter;
        try {
            let data = await Service.removeAll(searchObject);
            apiResponse.sendJson(req, res, 201, constants.DATA_DELETED, data);
        } catch (err) {
            next(new Error(constants.DELETING_ERROR + " " + err.message));
        }
    },

    /*
    /---------------------------ID LEVEL-----------------
    */
    getById: async (req, res, next) => {
        if (!common.isValidId(req.params.id)) {
            return next(new Error(constants.INVALID_ID))
        }
        try {
            let data = await Service.getById(req.params.id);
            apiResponse.sendJson(req, res, 200, constants.DATA_FETCHED, data);
        } catch (err) {
            next(err);
        }
    },
    saveAtId: async (req, res, next) => {
        const id = req.params.id;
        const body = req.body;
        const data = body.data;
        if (_.isEqual(id, "verify-otp")) {
            //verify otp here
            const otp = data.otp;
            const oid = data.oid;
            const uid = data.uid;
            let result = await Service.verifyOtp(uid, oid, otp);
            logger.logger.info(result);
            res.json(result);
        } else {
            //do what you want
            logger.logger.info("unexpected request");
        }
    },
    updateAtId: async (req, res, next) => {
        const body = req.body;
        let updateObject = body.data;
        if (!common.isValidId(req.params.id)) {
            return next(new Error(constants.INVALID_ID))
        }
        try {
            let data = await Service.updateAtId(req.params.id, updateObject);
            apiResponse.sendJson(req, res, 201, constants.DATA_UPDATED, data);
        } catch (err) {
            next(new Error(constants.UPDATING_ERROR + " " + err.message));
        }
    },
    patchUpdateAtId: (req, res, next) => {

    },
    deleteAtId: async (req, res, next) => {
        if (!common.isValidId(req.params.id)) {
            return next(new Error(constants.INVALID_ID))
        }
        try {
            let data = await Service.deleteAtId(req.params.id);
            apiResponse.sendJson(req, res, 201, constants.DATA_DELETED, data);
        } catch (err) {
            next(new Error(constants.DELETING_ERROR + " " + err.message));
        }
    }
}