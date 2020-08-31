const db = require('../db');



function find(){
    return db('users')
}

module.exports = {
    find,
    }