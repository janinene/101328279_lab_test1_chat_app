const mongoose = require('mongoose')

const groupMessageSchema = new mongoose.Schema({
  from_user: {
    type: String,
    require: [true, "Please add username"],
  },

  room: {
    type: String,
    require: [true, "Please add room"],
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

groupMessageSchema.pre('save', function (next) {
    this.createon = Date.now()
    next()
})


const GroupMessage = mongoose.model("GroupMessage", groupMessageSchema, "GroupMessage");
module.exports = GroupMessage;
