const db = require('../db');



function find(){
    return db('users')
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