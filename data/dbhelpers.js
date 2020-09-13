const db = require('../db');



function findbyUsername(username){
    return db('users')
        .join('wants', 'users.id', '=', 'wants.user_id')
        .join('needs', 'users.id', '=', 'needs.user_id')
        // .where({'users.username': 'vundie'})

}

function insert(what){
    return db('users').insert(what);
}

function find() {
    return db('users')
}
module.exports = {
    find,
    findbyUsername,
    insert
    }