const _ = require('lodash');
const express = require('express');
const HTTP = require('http-status');

const { Users } = require('../lib/mock-data');
const tokenUtils = require('../lib/token-utils');

const router = express.Router();

router.get('/health', (req, res) => {
    res.status(HTTP.OK).end();
});

router.get('/api/auth/verify', (req, res) => {
    const authToken = req.get('Authorization').replace('Bearer ', '');

    let userId;
    try {
        const payload = tokenUtils.verifyAuthToken(authToken);
        userId = payload.id;
    } catch (err) {
        res.status(HTTP.UNAUTHORIZED).end();
        return;
    }

    if (!_.has(Users, userId)) {
        res.status(HTTP.UNAUTHORIZED).end();
        return;
    }

    res.json(Users[userId]);
});

module.exports = router;
