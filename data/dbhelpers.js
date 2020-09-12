const db = require('../db');



function find(){
    return db('users')
        .join('investments', 'users.id', '=', 'investment.user_id')
}

function insert(what){
    return db('users').insert(what);
}

function findbyUsername(username) {
    return db('users').where({username}).first()
}
module.exports = {
    find,
    findbyUsername,
    insert
    }