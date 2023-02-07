const mongoose = require('mongoose')

const privateMessageSchema = new mongoose.Schema({
  from_user: {
    type: String,
    require: [true, "Please add from user"],
  },

  to_user: {
    type: String,
    require: [true, "Please add to user"],
  },

  message: {
    type: String,
    require: [true, "Please add message"],
  },

  date_sent: {
    type: Date,
    default: Date.now
  },
});

privateMessageSchema.pre('save', function (next) {
    this.createon = Date.now()
    next()
})


const PrivateMessage = mongoose.model("PrivateMessage", privateMessageSchema, "PrivateMessage");
module.exports = PrivateMessage;
