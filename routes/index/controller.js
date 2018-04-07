'use strict'

const mongoose = require('mongoose');
const Service = require('./service');
const apiResponse = require('../../helpers/apiResponse')
const Model = require('./model');
const logger = require('../../helpers/logger');
const common = require('../../helpers/common');

module.exports = {
    /*
    /---------------------------ROOT LEVEL-----------------
    */
    getAll: async (req, res, next) => {
        try {
            let data = await Service.getAll();
            apiResponse.sendJson(req, res, 200, "test", data);
        } catch (err) {
            next(err);
        }
    },
    save: async (req, res, next) => {
        let objectToSave = {
            name: 'mohit'
        }
        try {
            let data = await Service.save(objectToSave);
            apiResponse.sendJson(req, res, 201, null, data);
        } catch (err) {
            next(err);
        }
    },
    updateAll: async (req, res, next) => {
        let updateObject = {
            name: 'mohit 2'
        }
        let searchObject = {
            name: "mohit"
        }
        try {
            let data = await Service.updateAll(searchObject, updateObject);
            apiResponse.sendJson(req, res, 201, null, data);
        } catch (err) {
            next(err);
        }

    },
    patchUpdateAll: async (req, res, next) => {

    },
    deleteAll: async (req, res, next) => {

    },

    /*
    /---------------------------ID LEVEL-----------------
    */
    getById: (req, res, next) => {

    },
    saveAtId: (req, res, next) => {

    },
    updateAtId: (req, res, next) => {

    },
    patchUpdateAtId: (req, res, next) => {

    },
    deleteAtId: (req, res, next) => {

    },
    /*
    /---------------------------ACTION LEVEL-----------------
    */
    getAction: (req, res, next) => {

    },
    saveAction: (req, res, next) => {

    },
    updateAction: (req, res, next) => {

    },
    patchUpdateAction: (req, res, next) => {

    },
    deleteAction: (req, res, next) => {

    }
}