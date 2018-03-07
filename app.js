const express = require('express');
const helmet = require('helmet')
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');
const rfs = require('rotating-file-stream')

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('./helpers/logger')

var db = require('./config/db').connect();

var app = express();

const logDirectory = path.join(__dirname, 'log')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a rotating write stream
const accessLogStream = rfs('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
})

// setup the logger
app.use(morgan('combined', {
    stream: accessLogStream
}))
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cookieParser());

app.use('/api/v1', require('./router'));

module.exports = app;