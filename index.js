const express = require("express")
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config')   

const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);

const userRoute = require('./routes/userRoute')

const SERVER_PORT = process.env.PORT || 8080

// ===== Middlewares =====
app.use(cors());
app.use(express.json())


// ===== Mongoose Connection =====
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then( () => {
        app.listen(SERVER_PORT, "0.0.0.0",() =>{
            console.log('server connected');
            console.log(`Server running at http://localhost:${SERVER_PORT}/`)
        })
    })
    .catch( (err) => {
        console.log(err);
    });


app.use('/', userRoute)

// ===== Route =====
app.get(['/', '/login'], (req, res) => {
    res.sendFile(__dirname + '/login.html')
})
app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html')
})