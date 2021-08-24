const { nanoid } = require('nanoid');

const TABLE = 'user';

module.exports = function (injected_store) {
    let store = injected_store;
    if (!store) {
        store = require('../../../store/dummy');
    }

    function list () {
        return store.list(TABLE);
    }

    function get (user_id) {
        let id = parseInt(user_id);
        return store.get(TABLE, id);
    }

    function upsert (body) {
        const user = {
            name: body.name
        }

        user.id = nanoid();

        return store.upsert(TABLE, user);
    }

    function remove (body) {
        return store.remove(TABLE, body.id);
    }

    return {
        list,
        get,
        upsert,
        remove
    };

}