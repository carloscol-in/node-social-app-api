const bcrypt = require('bcrypt');

const auth = require('../../../auth');
const TABLE = 'auth';

module.exports = function (injected_store) {
    let store = injected_store;
    if (!store) {
        store = require('../../../store/dummy');
    }

    async function login (username, password) {
        const col = await store.query(TABLE, { username: username });
        const data = col[0];

        return bcrypt.compare(password, data.password)
            .then(equal => {
                if (equal) {
                    // Generate token
                    return auth.sign({ ...data });
                } else {
                    throw new Error("Invalid information.");
                }
            })
            .catch((err) => {
                throw new Error("Invalid information");
            })
    }

    async function upsert (data) {
        const auth_data = {
            id: data.id
        }

        if (data.username) {
            auth_data.username = data.username;
        }

        if (data.password) {
            auth_data.password = await bcrypt.hash(data.password, 5);
        }

        return store.upsert(TABLE, auth_data);
    }

    return {
        login,
        upsert,
    };
}