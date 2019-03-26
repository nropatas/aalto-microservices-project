const _ = require('lodash');
const express = require('express');
const HTTP = require('http-status');

const userValidation = require('../middleware/user-validation');

const router = express.Router();

router.get('/health', (req, res) => {
    res.status(HTTP.OK).end();
});

router.post('/api/subscriptions', [userValidation], (req, res) => {
    if (!_.isEmpty(req.user)) {
        res.status(HTTP.CREATED).end();
        return;
    }

    res.status(HTTP.INTERNAL_SERVER_ERROR).end();
});

module.exports = router;
