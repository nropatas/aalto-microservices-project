const config = require('config');
const cookieParser = require('cookie-parser');
const express = require('express');
const httpProxy = require('http-proxy');
const logger = require('morgan');
const path = require('path');

const indexRouter = require('./routes/index');

const app = express();
const proxy = httpProxy.createProxyServer();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/subscriptions', (req, res) => {
    proxy.web(req, res, { target: config.get('services.subscription-service.url') });
});

app.get('/api/contents', (req, res) => {
    proxy.web(req, res, { target: config.get('services.content-service.url') });
});

app.use('/', indexRouter);

module.exports = app;
