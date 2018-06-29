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
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const config = require('./configs/config')();
const common = require('./helpers/common');

//const auth = require('express-rbac');
require('dotenv').config(); // configure environment variables

const acl = require('express-acl');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('./helpers/logger');

const db = require('./configs/db').connect((err, db) => {
    if (!err) {
        //db connected
    } else {
        //error while connecting db
    }
});

const app = express();

const upload = require('./helpers/fileUploader');

app.post('/upload', upload.single('image'), (req, res) => {
    console.log(req);
})
const authController = require('./helpers/authController');
app.get('/get-token', (req, res, next) => {
    const token = authController.generateToken({
        role: "admin"
    });
    res.json(token);
})

const logDirectory = path.join(common.getRootPath(), 'logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a rotating write stream
const accessLogStream = rfs(config.API_ACCESS_LOGS, {
    interval: '1d', // rotate daily
    path: logDirectory
})

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded

// setup the logger
app.use(morgan('combined', {
    stream: accessLogStream
}))

app.use(helmet());

//--------------API DOCS------------------
app.use('/api-docss', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//It manages the token variable in request
const reqTokenObj = {
    bodyKey: 'access_token',
    queryKey: 'access_token',
    headerKey: 'Bearer',
    reqKey: 'token'
};

app.use(bearerToken(reqTokenObj));

//It validate the token variable in request
app.use(tokenValidator);

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
    defaultRole: 'anonymous',
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

//Route Handler
app.use('/api/v1', require('./routes/router'));

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