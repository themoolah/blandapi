//requiring dependencies
const express = require('express')

//dabatase helpers
const User = require('./data/dbhelpers');

//set up server and port
const server = express();
const PORT = process.env.PORT || 5000;

server.get('/', (req, res)=>{
    User.find().then(users=> res.status(200).send(users))
})

server.get('/:id', (req, res)=> {
    const id = req.params.id;
    User.findbyid(id).then(user=>res.status(200).send(user))
})

server.listen(PORT, ()=> {
    console.log(`Server is now active on localhost:${PORT}`)
})