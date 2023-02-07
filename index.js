const express = require("express")
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config')   

const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);

const userRoute = require('./routes/userRoute')
const User = require('./model/user');

const SERVER_PORT = process.env.PORT || 8080

// ===== Middlewares =====
app.use(cors());
app.use(express.json())
app.use(express.static(__dirname + 'public'));


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


// app.use('/', userRoute)

// ===== Route =====
app.get(['/', '/login'], (req, res) => {
    res.sendFile(__dirname + '/login.html')
})
app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html')
})



// ===== Model Route =====
app.post('/register', async(req,res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty!"})
    }
    const user_content = new User(req.body)

    try {
        await user_content.save((err) => {
          if(err){
            res.send(err)
          }else{
            res.sendFile(__dirname + '/login.html')
          }
        });
      } catch (err) {
        res.status(500).send(err);
      }
    res.sendFile(__dirname + '/login.html')
})