const express = require('express');
const HTTP = require('http-status');

const tokenUtils = require('../lib/token-utils');

const router = express.Router();

router.get('/health', (req, res) => {
    res.status(HTTP.OK).end();
});

router.get('/api/auth/verify', (req, res) => {
    const authToken = req.get('Authorization').replace('Bearer ', '');

    try {
        const { id } = tokenUtils.verifyAuthToken(authToken);
        res.json({ id });
    } catch (err) {
        res.status(HTTP.UNAUTHORIZED).end();
    }
});

module.exports = router;
