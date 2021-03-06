//requiring dependencies
const express = require('express')
let bcrypt = require('bcryptjs')
let salt = bcrypt.genSaltSync(14);
let bodyParser = require('body-parser')
let generateToken = require('./utils/generateToken');
let cookieParser = require('cookie-parser');
let token;

//dabatase helpers
const User = require('./data/dbhelpers');
const { json } = require('body-parser');

function protected(req, res, next) {
    if (req.cookies.auth){
      next();
    } else {
      res.status(401).json({ message: 'Nice try, omo olope.' });
    }
  }


//set up server and port
const server = express();
server.use(bodyParser.json())
server.use(cookieParser())
const PORT = process.env.PORT || 5000;

// Fetch users. To-do: protect this endpoint
server.get('/', protected, (req, res)=>{
    console.log(res.rawListeners)
    User.find()
    .then(users=> res.status(200).json({users: users}))
    .catch(err=>res.status(404).json({message: err.message}))
})

server.post('/dash', (req,res)=> {
    let id = req.body.id
    console.log('the incoming id is', id)
    User.fetchUserCore(id)
        .then(user=> res.status(200).json({userData: user}))
        .catch(err=>res.status(404).json({fucked_up: err.message}))
})

server.post('/add', (req,res)=> {
    let {id, category, ...payload} = req.body
    User.addEntry(id, category, payload)
        .then(results=>res.status(200).json({results: results}))
        .catch(err=> res.status(400).json({failed_to_add: err.message}))
    
    
})

//Registration endpoint
server.post('/register', (req, res)=> {
    console.log(req.body);
    let hash = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hash;
    User.insert(req.body).then(users=> res.status(200).send(`Successfully added ${req.body.username}`))
});

//login endpoint
server.post('/login', (req, res)=> {
    let {username, password} = req.body;
    User.findbyUsername(username)
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                token = generateToken(user)
                res.cookie('auth', token);
                res.status(200).json({data: user})
            }
            else {
                res.status(401).json({message: `Whoa there, chief. Something's wrong with your creds. I'm gonna need to see ID.`})
            }
        })
        .catch(err=> res.json({error: err.message}))
})

server.get('/logout', (req, res)=> {
    res.clearCookie('auth', token)
    res.status(200).json({message: `You're now logged out`})
})

// server.get('/:id', (req, res)=> {
//     const id = req.params.id;
//     User.findbyid(id).then(user=>res.status(200).send(user))
// })

server.listen(PORT, ()=> {
    console.log(`Server is now active on localhost:${PORT}`)
})