const common = require('common');
const config = require('config');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const { middleware, getTracer } = common;
const { createTracing } = middleware;

const app = express();
const tracer = getTracer({
    serviceName: 'user-service',
    agentHost: config.get('user-service.jaeger.agent-host'),
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(createTracing(tracer));

app.use('/', indexRouter);

module.exports = app;
