const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');

const SECRET = config.jwt.secret;

function sign (data) {
    return jwt.sign(data, SECRET);
}

function verify (token) {
    return jwt.verify(token, SECRET);
}

const check = {
    own: function (req, owner) {
        // check the requesting user (by token) is the owner of the user
        const decoded = decodeHeader(req);

        // check if it's owned by requesting user
        if (decoded.id !== owner) {
            throw error("User has no permission to do this.", 401);
        }
    },

    logged: function (req) {
        const decoded = decodeHeader(req);
    }
}

function getToken (auth) {
    // Bearer {{token}}
    if (!auth) {
        throw error('No token found on request', 400);
    }

    if (auth.indexOf('Bearer ') == -1) throw new Error('Format invalid');

    let token = auth.replace('Bearer ', '');

    return token;
}

function decodeHeader (req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;

    return decoded
}

module.exports = {
    sign,
    check,
};