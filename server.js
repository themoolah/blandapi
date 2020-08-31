//requiring dependencies
const express = require('express')

//set up server and port
const server = express();
const PORT = process.env.PORT || 5000;

server.get('/', (req, res)=>{
    res.status(200).send('The Moolah Project is now online!')
})

server.listen(PORT, ()=> {
    console.log(`Server is now active on localhost:${PORT}`)
})