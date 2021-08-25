const db = {
    'user': [
        {id: 1, name: 'Carlos'},
    ]
};

async function list (table) {
    return db[table] || [];
}

async function get (table, id) {
    let col = await list(table);
    return col.filter( item => item.id === id )[0] || null;
}

async function upsert (table, data) {
    if (!db[table]) {
        db[table] = [];
    }

    db[table].push(data);

    return await get(table, data.id);
}

async function remove (table, id) {
    let element = await get(table, id);
    let col = await list(table);
    let idx = col.indexOf(element);
    return db[table].splice(idx, 1);
}

async function query(table, q) {
    let col = await list(table);
    let keys = Object.keys(q);
    let key = keys[0];

    return col.filter( item => item[key] === q[key] )[0] || null;

}

module.exports = {
    list, 
    get, 
    upsert,
    remove,
    query,
}