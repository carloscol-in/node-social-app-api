const { nanoid } = require('nanoid');
const auth = require('../../../auth');

const TABLE = 'auth';

module.exports = function (injected_store) {
    let store = injected_store;
    if (!store) {
        store = require('../../../store/dummy');
    }

    async function login (username, password) {
        const data = await store.query(TABLE, { username: username });
        if (data.password === password) {
            // Generate token
            return auth.sign(data);
        } else {
            throw new Error("Invalid information.");
        }
    }

    function upsert (data) {
        const auth_data = {
            id: data.id
        }

        if (data.username) {
            auth_data.username = data.username;
        }

        if (data.password) {
            auth_data.password = data.password;
        }

        return store.upsert(TABLE, auth_data);
    }

    return {
        login,
        upsert,
    };
}