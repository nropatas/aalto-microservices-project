const _ = require('lodash');
const config = require('config');

const providerConfigs = config.get('content-service.providers');

// Data source: https://newsapi.org
const Providers = {
    1: {
        id: 1,
        name: 'BBC News',
        keyName: 'bbc',
        apiUrl: _.get(providerConfigs, 'bbc.api-url'),
        apiKey: _.get(providerConfigs, 'bbc.api-key'),
        data: [
            {
                author: 'BBC News',
                title: 'Mormon church to reverse LGBT policy',
                description: 'The Mormon church will allow the baptism of children of gay parents, reversing its policy since 2015.',
                publishedAt: '2019-04-04T22:15:23Z',
            },
            {
                author: 'BBC News',
                title: 'Mental health tests for NZ attack suspect',
                description: 'Australian Brenton Tarrant is accused of killing 50 people in March attacks on Christchurch mosques.',
                publishedAt: '2019-04-04T21:49:47Z',
            },
        ],
    },
    2: {
        id: 2,
        name: 'Buzzfeed',
        keyName: 'buzzfeed',
        apiUrl: _.get(providerConfigs, 'buzzfeed.api-url'),
        apiKey: _.get(providerConfigs, 'buzzfeed.api-key'),
        data: [
            {
                author: 'Allie Hayes',
                title: '18 Brutal But G-Rated Insults You Should Begin Using Immediately',
                description: '"It is impossible to underestimate you."',
                publishedAt: '2019-04-04T22:58:35Z',
            },
            {
                author: 'Matt Stopera',
                title: 'You Can\'t Make Up How Absurd Lori Loughlin\'s First Court Appearance Was',
                description: 'Just when you thought it all couldn\'t get more absurd. It did.',
                publishedAt: '2019-04-04T21:08:37Z',
            },
        ],
    },
};

module.exports = {
    Providers,
};
