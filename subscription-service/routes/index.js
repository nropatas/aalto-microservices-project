const _ = require('lodash');
const express = require('express');
const HTTP = require('http-status');

const { UserSubscriptions } = require('../lib/mock-data');
const userValidation = require('../middleware/user-validation');

const router = express.Router();

router.get('/health', (req, res) => {
    res.status(HTTP.OK).end();
});

router.post('/api/subscriptions', [userValidation], (req, res) => {
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
