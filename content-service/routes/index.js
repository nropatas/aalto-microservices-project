const _ = require('lodash');
const axios = require('axios');
const common = require('common');
const config = require('config');
const express = require('express');
const HTTP = require('http-status');

const { Providers } = require('../lib/mock-data');

const { createUserValidation } = common.middleware;

const TRACE_ID_KEY = 'uber-trace-id';

const router = express.Router();

router.get('/health', (req, res) => {
    res.status(HTTP.OK).end();
});

router.get('/api/contents', [
    createUserValidation({ userServiceUrl: config.get('services.user-service.url') }),
], async (req, res) => {
    const userId = _.get(req, 'user.id');

    if (!userId) {
        res.status(HTTP.INTERNAL_SERVER_ERROR).end();
        return;
    }

    let response;
    try {
        response = await axios.request({
            method: 'get',
            url: `${config.get('services.subscription-service.url')}/api/subscriptions?userId=${userId}`,
            headers: {
                [TRACE_ID_KEY]: req.get(TRACE_ID_KEY),
            },
        });
    } catch (err) {
        if (_.get(err, 'response.status') === HTTP.NOT_FOUND) {
            res.json({
                contents: [],
            });
            return;
        }

        res.status(HTTP.INTERNAL_SERVER_ERROR).end();
        return;
    }

    const { providerIds } = response.data;
    const contents = _.flatMap(providerIds, (providerId) => {
        if (!_.has(Providers, providerId)) {
            return [];
        }

        const provider = Providers[providerId];
        console.log(`Req: ${provider.apiUrl}, Key: ${provider.apiKey}`);
        return provider.data;
    });

    res.json({
        contents,
    });
});

module.exports = router;
