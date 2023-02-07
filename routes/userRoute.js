const express = require("express")
const mongoose = require("mongoose")
const routes = express.Router()
const User = require('../model/user');


// ============ User Signup ============
routes.post('/register', async(req,res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty!"})
    }
    const user_content = new User({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
        createon: req.body.createon

    })

    await user_content
            .save(user_content)
            .then(data =>{
                res.sendFile(__dirname, '/login.html')
            })
            .catch(err => {
                res.status(500)
                    .send({ message:  err.message || "Some error occurred while creating the Account Details." })
            })
})


module.exports = routes