const mongoose = require('mongoose');

const login = mongoose.Schema(
  {
    email: String,
    password: String,
  },
  { timestamps: true }
);

const Login = mongoose.model('Login', login);

module.exports = Login;
