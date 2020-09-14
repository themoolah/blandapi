const db = require('../db');



function findbyUsername(username){
    return db('users')
            .where(username)

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