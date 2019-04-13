const {
    FORMAT_HTTP_HEADERS,
    Tags,
} = require('opentracing');

module.exports = function createTracing(tracer) {
    return function Tracing(req, res, next) {
        const spanContext = tracer.extract(FORMAT_HTTP_HEADERS, req.headers);
        const span = tracer.startSpan('http-reqeust', spanContext
            ? { childOf: spanContext }
            : {});
        span.setTag(Tags.HTTP_URL, req.originalUrl);
        span.setTag(Tags.HTTP_METHOD, req.method);
        tracer.inject(span, FORMAT_HTTP_HEADERS, req.headers);

        res.on('finish', () => {
            span.setTag(Tags.HTTP_STATUS_CODE, res.statusCode);
            span.finish();
        });

        next();
    };
};
