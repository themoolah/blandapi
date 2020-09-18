const db = require('../db');



function findbyUsername(username){
    return db('users')
            .where({username}).first()

}

function addEntry(id, category, payload){
        return db('users')
            .insert(payload)
            .into(category)
            .where({'users.id': id})
}

function fetchUserCore(id) {
    return db('users')
    .join('wants', 'users.id', '=', 'wants.user_id')
    .join('needs', 'users.id', '=', 'needs.user_id')
    .where({'users.id': id})
}

function insert(what){
    return db('users').insert(what);
}

function find() {
    return db('users')
}

//to dos
// 1. write function that adds entry and properly puts it in the wants, needs or investment cat
module.exports = {
    find,
    findbyUsername,
    insert,
    fetchUserCore,
    addEntry
    }