'use strict'

const apiResponse = require("./helpers/apiResponse");
const tokenValidator = require('./middlewares/tokenValidator');
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');
const rfs = require('rotating-file-stream')
const bearerToken = require('express-bearer-token');
const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');
//const auth = require('express-rbac');

const acl = require('express-acl');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('./helpers/logger');

const db = require('./config/db').connect();

const app = express();

const upload = require('./helpers/fileUploader');

app.post('/upload', (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            res.json(err)
        } else {
            console.log(req.file);
            res.send("file uploaded");
        }
    })
})

const logDirectory = path.join(__dirname, 'log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a rotating write stream
const accessLogStream = rfs('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
})

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// setup the logger
app.use(morgan('combined', {
    stream: accessLogStream
}))

app.use(helmet());
app.use('/api-docss', swaggerUi.serve, swaggerUi.setup(swaggerDocument));//--------------API DOCS------------------

app.use(bearerToken());//It manages the token variable in request
app.use(tokenValidator);//It manages the token variable in request

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cookieParser());

/*
    ------------------------ACL CONFIG START-------------------
*/
let responseObject = {
    status: 'Access Denied',
    message: 'You are not authorized to access this resource'
};

let configObject = {
    baseUrl: '/',
    searchPath: 'decoded.role', //will search for role in req.decoded.role
    defaultRole: 'anonymous'
};

acl.config(configObject, responseObject);

app.use(acl.authorize);

/*
    ------------------------ACL CONFIG END-------------------
*/

/*
app.use(function (req, res) {
    res.json(req.decoded);
});
*/

app.use('/api/v1', require('./router'));
//error handler
app.use((err, req, res, next) => {
    if (err) {
        apiResponse.sendJson(req, res, 500, err.message);
    }
})

/*
process.on('uncaughtException', (exception) => {
    console.log("-----Exception occured---"+exception);
})
process.on('unhandledRejection', (exception) => {
    console.log("-----Exception occured---");
})
*/
module.exports = app;

