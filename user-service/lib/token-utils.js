const config = require('config');
const jwt = require('jsonwebtoken');

const SECRET = config.get('user-service.auth-token.secret');

function genAuthToken(id) {
    return jwt.sign({ id }, SECRET, { expiresIn: '1y' });
}

function verifyAuthToken(token) {
    return jwt.verify(token, SECRET);
}

module.exports = {
    genAuthToken,
    verifyAuthToken,
};
