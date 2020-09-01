const db = require('../db');



function find(what){
    return db(what)
}

function findbyid(id) {
    return db('users').where({id}).first()
}
module.exports = {
    find,
    findbyid
    }