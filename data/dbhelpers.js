const db = require('../db');



function find(){
    return db('users')
}

function findbyid(id) {
    return db('users').where({id}).first()
}
module.exports = {
    find,
    findbyid
    }