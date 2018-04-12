'use strict'

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config/config').config();

module.exports = {
    generateSaltPass: (stringPassword) => {
        const salt = bcrypt.genSaltSync(10);
        const hashValue = bcrypt.hashSync(stringPassword, salt);
        return {
            "salt": salt,
            "hashValue": hashValue
        }
    },
    comparePassword: (stringPassword, hashedPassword) => {
        return bcrypt.compareSync(stringPassword, hashedPassword);
    },
    generateToken: (signingObject) => {
        let options = {};
        options.algorithm = 'HS256';
        options.expiresIn = 100;
        options.audience = "WEB";
        options.issuer = "SERVER";

        if (!signingObject) {
            return null;
        }
        try {
            return jwt.sign(signingObject, config.SECRET_KEY, options)
        } catch (error) {
            return null;
        }
    },
    verifyToken: (token) => {
        try {
            return jwt.verify(token, config.SECRET_KEY);
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}