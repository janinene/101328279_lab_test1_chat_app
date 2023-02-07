const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        require: [true, "Please add username"],
        maxlength: 100,
        trim: true,
        lowercase: true
    },
    
    firstname : {
        type: String,
        require: [true, "Please add first name"],
        maxlength: 100

    },

    lastname : {
        type: String,
        require: [true, "Please add last name"],
        maxlength: 50
    },

    password : {
        type: String,
        require: [true, "Please add password"],
        // minlength: [6, "Password must be at least 6 characters"]
    },

    createon: {
        type: Date,
        default: Date.now
      }

})

userSchema.pre('save', function (next) {
    this.createon = Date.now()
    next()
})


const User = mongoose.model("User", userSchema, "User")

module.exports = User