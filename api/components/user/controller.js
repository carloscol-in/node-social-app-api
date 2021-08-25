const { nanoid } = require('nanoid');
const auth = require('../auth');

const TABLE = 'user';

module.exports = function (injected_store) {
    let store = injected_store;
    if (!store) {
        store = require('../../../store/dummy');
    }

    function list () {
        return store.list(TABLE);
    }

    function get (id) {
        return store.get(TABLE, id);
    }

    async function upsert (body) {
        const user = {
            name: body.name,
            username: body.username,
        }

        if (body.id) {
            user.id = body.id;
        } else {
            user.id = nanoid();
        }

        if (body.password || body.username) {
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: body.password,
            })
        }

        return store.upsert(TABLE, user);
    }

    function remove (body) {
        return store.remove(TABLE, body.id);
    }

    const follow = (user_from, user_to) => {
        return store.upsert(`${TABLE}_follow`, {
            user_from,
            user_to
        });
    }

    const followers = (user_from) => {
        return store.query(`${TABLE}_follow`, {user_to: user_from});
    }

    return {
        list,
        get,
        upsert,
        remove,
        follow,
        followers,
    };

}