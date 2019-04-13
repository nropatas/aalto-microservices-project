const _ = require('lodash');
const axios = require('axios');
const HTTP = require('http-status');

module.exports = function createUserValidation({ userServiceUrl }) {
    return async function userValidation(req, res, next) {
        if (_.isEmpty(req.get('Authorization'))) {
            res.status(HTTP.UNAUTHORIZED).end();
            return;
        }

        let response;
        try {
            response = await axios.request({
                method: 'get',
                url: `${userServiceUrl}/api/auth/verify`,
                headers: {
                    Authorization: req.get('Authorization'),
                },
            });
        } catch (err) {
            if (_.get(err, 'response.status') === HTTP.UNAUTHORIZED) {
                res.status(err.response.status).end();
                return;
            }

            res.status(HTTP.INTERNAL_SERVER_ERROR).end();
            return;
        }

        req.user = response.data;
        next();
    };
};
