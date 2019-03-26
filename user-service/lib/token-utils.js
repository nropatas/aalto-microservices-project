const jwt = require('jsonwebtoken');

const SECRET = 'testsecret'; // FIXME: Improve secret handling

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
