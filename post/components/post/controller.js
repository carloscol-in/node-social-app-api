const TABLE = 'post';

module.exports = function (injected_store) {
    let store = injected_store;
    if (!store) {
        store = require('../../../store/dummy');
    }

    function list () {
        return store.list(TABLE);
    }

    return {
        list,
    };

}