const _ = require('lodash');
const axios = require('axios');
const config = require('config');
const HTTP = require('http-status');

module.exports = async function userValidation(req, res, next) {
    if (_.isEmpty(req.get('Authorization'))) {
        res.status(HTTP.UNAUTHORIZED).end();
        return;
    }

    let response;
    try {
        response = await axios.request({
            method: 'get',
            url: `${config.get('services.user-service.url')}/api/auth/verify`,
            headers: {
                Authorization: req.get('Authorization'),
            },
        });
    } catch (err) {
        res.status(HTTP.INTERNAL_SERVER_ERROR).end();
        return;
    }

    req.user = response.data;
    next();
};
