'use strict'

const Service = require('./service');
const apiResponse = require('../../helpers/apiResponse')
const Model = require('./model');
const logger = require('../../helpers/logger');
const common = require('../../helpers/common');
const constants = require('../../config/constants')

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
        let objectToSave = body.data;

        /*
        for (const key in body) {
            if (body.hasOwnProperty(key)) {
                objectToSave[key] = body[key];
            }
        }*/

        try {
            let data = await Service.save(objectToSave);
            apiResponse.sendJson(req, res, 201, constants.DATA_SAVED, data);
        } catch (err) {
            next(new Error(constants.SAVING_ERROR + " " + err.message));
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
        if (req.params.id == 'login') {
            //login user
            res.json("login")
        } else if (req.params.id == 'register') {
            //register user
            res.json("register")
        } else if (req.params.id == 'logout') {
            //logout user
        } else {
            let searchObject = {
                _id: req.params.id
            }
            if (!common.isValidId(req.params.id)) {
                return next(new Error(constants.INVALID_ID))
            }
            try {
                let data = await Service.getById(req.params.id);
                apiResponse.sendJson(req, res, 200, constants.DATA_FETCHED, data);
            } catch (err) {
                next(err);
            }

        }
    },
    saveAtId: (req, res, next) => {

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
    },
}