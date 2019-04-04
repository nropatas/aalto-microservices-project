const common = require('common');
const config = require('config');
const express = require('express');
const HTTP = require('http-status');

const { createUserValidation } = common.middleware;

const router = express.Router();

router.get('/health', (req, res) => {
    res.status(HTTP.OK).end();
});

router.get('/api/contents', [
    createUserValidation({ userServiceUrl: config.get('services.user-service.url') }),
], (req, res) => {
    // TODO: Get list of subscriptions from subscription-service

    // TODO: Get contents from APIs
});

module.exports = router;
