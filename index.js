const express = require("express")
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config')   

const app = express()
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

const userRoute = require('./routes/userRoute')
const User = require('./model/user');
const { use } = require("./routes/userRoute")

const SERVER_PORT = process.env.PORT || 8080

// ===== Middlewares =====
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/css",express.static(__dirname + '/css'));


io.on('connection', (socket) => {
 

})

// ===== Mongoose Connection =====
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
      .then(success => {
        console.log('Server Connect')
      }).catch(err => {
        console.log('Connection Error')
      })


// app.use("/", userRoute)


// ===== Route =====
app.get(['/', '/login'], async (req, res) => {
  res.sendFile(__dirname + '/login.html')
})
app.get('/register', async (req, res) => {
  res.sendFile(__dirname + '/register.html')
})
app.get('/room', (req, res) => {
  res.sendFile(__dirname + '/room.html')
})

 // ===== Model Route =====
app.post('/register', async(req,res) => {
  const user_content = new User(req.body)
    try {
        await user_content.save((err) => {
          if(err){
            res.send(err)
          }else{
            res.sendFile(__dirname + '/login.html')
          }
        })
      } catch (err) {
        res.status(500).send(err);
      }
    res.sendFile(__dirname + '/login.html')

});

app.post('/login', async (req, res) => {
  const user = await User.findOne({username: req.body.username, password: req.body.password})
  try {
      if(user != null){
          res.sendFile(__dirname + "/room.html")
      }
      else{
        res.send(JSON.stringify({status:false, message: "No user found or incorrect username or password"}))
      }
    } catch (err) {
      res.status(500).send(err);
    }
})


// Listen socket server
server.listen(SERVER_PORT, () => {
  console.log(`Socket IO started at ${SERVER_PORT}...`)
})
