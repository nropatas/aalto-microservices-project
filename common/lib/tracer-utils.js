const {
    initTracer,
} = require('jaeger-client');

function getTracer({ serviceName, agentHost }) {
    const config = {
        serviceName,
        reporter: {
            logSpan: true,
            agentHost,
            agentPort: 6832,
        },
        sampler: {
            type: 'const',
            param: 1,
        },
    };

    const tracer = initTracer(config, {});
    return tracer;
}

module.exports = {
    getTracer,
};
