const {
    getTracer,
} = require('./lib/tracer-utils');
const createTracing = require('./middleware/tracing');
const createUserValidation = require('./middleware/user-validation');

module.exports = {
    middleware: {
        createTracing,
        createUserValidation,
    },
    getTracer,
};
