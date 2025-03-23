const mongoose = require("mongoose");
const jwt = require("jsonwebtoken"); 

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
     
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

  

module.exports = mongoose.model("User", UserSchema);
