const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')
const { createServer } = require('node:http');
const { Server } = require('socket.io');



const app = express()
const server = createServer(app);
const io = new Server(server);


const port = 3002

// setup the ability to see into response bodies
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// setup the express assets path
app.use('/', express.static(path.join(__dirname, '../client')))

// API calls ------------------------------------------------------------------------------------
app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '../client/pages/home.html'));

})
io.on('connection', (socket) => {
    console.log('a user connected');
  });

app.get('/race', async (req, res) => {
    res.sendFile(path.join(__dirname, '../client/pages/race.html'));
})

server.listen(port, () => console.log(`Example app listening on port ${port}!`))
