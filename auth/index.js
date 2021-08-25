const jwt = require('jsonwebtoken');
const config = require('../config');

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
        console.log(decoded);
    },
}

function getToken (auth) {
    // Bearer {{token}}
    if (!auth) {
        throw new Error('No token found on request');
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
};