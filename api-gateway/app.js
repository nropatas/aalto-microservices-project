const common = require('common');
const config = require('config');
const cookieParser = require('cookie-parser');
const express = require('express');
const httpProxy = require('http-proxy');
const logger = require('morgan');
const path = require('path');

const indexRouter = require('./routes/index');

const { middleware, getTracer } = common;
const { createTracing } = middleware;

const TRACE_ID_KEY = 'uber-trace-id';

const app = express();
const proxy = httpProxy.createProxyServer({});
const tracer = getTracer({
    serviceName: 'api-gateway',
    agentHost: config.get('api-gateway.jaeger.agent-host'),
});

proxy.on('proxyReq', (proxyReq, req) => {
    proxyReq.setHeader(TRACE_ID_KEY, req.get(TRACE_ID_KEY));
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(createTracing(tracer));

app.post('/api/subscriptions', (req, res) => {
    proxy.web(req, res, { target: config.get('services.subscription-service.url') });
});

app.get('/api/contents', (req, res) => {
    proxy.web(req, res, { target: config.get('services.content-service.url') });
});

app.use('/', indexRouter);

module.exports = app;
