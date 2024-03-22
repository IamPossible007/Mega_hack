const express = require('express');
const mongoose = require('mongoose');
const Login = require('./models/login');
const SignUp = require('./models/signUp');
const bcrypt = require('bcrypt');
const app = express();
var jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
app.use(cookieParser());

const salt = 'rajukimatakaharan';

// app.use(express.static('./public'));
app.use(cors());
app.use(express.json());
async function connection() {
  await mongoose.connect('mongodb://localhost:27017/login').then(() => {
    console.log(`helo`);
  });
}

app.post('/register-user', async (req, res) => {
  const { email, username, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const User = new SignUp({
    email,
    username,
    password: hash,
  });
  await User.save().then(() => {
    console.log(`User saved`);
  });
  res.status(200).json({ success: true, message: 'Login successful' });
});

const checkUp = (req, res, next) => {
  const checkToken = req.cookies.jwtToken;
  if (checkToken) {
    try {
      var decoded = jwt.verify(checkToken, 'shhhhh');
      res.send(decoded);
    } catch (error) {
      console.error('Error verifying JWT token:', error);
      res.sendStatus(401); // Unauthorized
    }
  } else {
    next(); // Call next middleware if no token is present
  }
};
app.use(checkUp);

app.get('/', (req, res) => {
  res.send('sodiowcmwd');
});

app.get('/home', (req, res) => {
  res.send('eoinweodcn');
});
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await SignUp.findOne({ email });

  const Data = {
    email: email,
    password: password,
  };

  var token = jwt.sign(Data, 'shhhhh');
  console.log(token);

  res.status(200).json({ token });
});

app.get('/verify', async (req, res) => {
  const token = req.cookies.jwtToken;
  if (token) {
    console.log(token);
  }
  // const User = await mongoose.model('Login').findOne({ email: email });
  // console.log(User);
  // if (User) {
  //   const hashedPassword = User.password;
  //   console.log(hashedPassword);
  //   const boll = bcrypt.compareSync(password, hashedPassword);

  //   if (boll) {
  //     res.sendStatus(200);
  //   } else {
  //     res.sendStatus(500);
  //   }
  // }
  res.send(token);
});

app.get('/api/:id', (req, res) => {
  var decoded = jwt.verify(req.params.id, 'shhhhh');
  console.log(decoded);

  res.status(200).json({ decoded });
});

connection();
app.listen(4002, () => {
  console.log(`Servr Stared on Port 3000`);
});
