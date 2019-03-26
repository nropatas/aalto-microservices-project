const express = require('express');
const HTTP = require('http-status');

const router = express.Router();

router.get('/health', (req, res) => {
    res.status(HTTP.OK).end();
});

module.exports = router;
