const mongoose = require("mongoose");

const userinfoSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  confirmpassword: {
    type: String,
    required: true
  }
});

const Register = mongoose.model("Register", userinfoSchema);

module.exports = Register;
