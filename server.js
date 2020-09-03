//requiring dependencies
const express = require('express')
let bcrypt = require('bcryptjs')
let salt = bcrypt.genSaltSync(14);
let bodyParser = require('body-parser')
let jwt = require('jsonwebtoken')
let generateToken = require('./utils/generateToken');

//dabatase helpers
const User = require('./data/dbhelpers');

//jwt secret
const secret = require('./utils/secrets')

//set up server and port
const server = express();
server.use(bodyParser.json())
const PORT = process.env.PORT || 5000;

// Fetch users. To-do: protect this endpoint
server.get('/', (req, res)=>{
    User.find().then(users=> res.status(200).send(users))
})

//Registration endpoint
server.post('/register', (req, res)=> {
    console.log(req.body);
    let hash = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hash;
    User.insert(req.body).then(users=> res.status(200).send(`Successfully added ${req.body.username}`))
});

server.post('/login', (req, res)=> {
    let {username, password} = req.body;
    User.findbyUsername(username)
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user)
                res.status(200).json({message: `Welcome ${user.username}! Here's your token:`, token})
            }
            else {
                res.status(401).json({message: `Whoa there, chief. Something's wrong with your creds. I'm gonna need to see ID.`})
            }
        })
        .catch(err=> res.json({error: err.message}))
})

server.get('/:id', (req, res)=> {
    const id = req.params.id;
    User.findbyid(id).then(user=>res.status(200).send(user))
})

server.listen(PORT, ()=> {
    console.log(`Server is now active on localhost:${PORT}`)
})