const _ = require('lodash');
const common = require('common');
const config = require('config');
const express = require('express');
const HTTP = require('http-status');

const { UserSubscriptions } = require('../lib/mock-data');

const { createUserValidation } = common.middleware;

const router = express.Router();

router.get('/health', (req, res) => {
    res.status(HTTP.OK).end();
});

router.post('/api/subscriptions', [
    createUserValidation({ userServiceUrl: config.get('services.user-service.url') }),
], (req, res) => {
    if (_.isEmpty(req.user)) {
        res.status(HTTP.INTERNAL_SERVER_ERROR).end();
        return;
    }

    res.status(HTTP.CREATED).end();
});

/**
 * [Internal Endpoint]
 */
router.get('/api/subscriptions', (req, res) => {
    if (_.isEmpty(_.get(req, 'query.userId'))) {
        res.status(HTTP.BAD_REQUEST).end();
        return;
    }

    const { userId } = req.query;

    if (_.isEmpty(UserSubscriptions, userId)) {
        res.status(HTTP.NOT_FOUND).end();
        return;
    }

    res.json({
        providerIds: _.map(UserSubscriptions[userId], 'providerId'),
    });
});

module.exports = router;
