var jwt = require('jsonwebtoken');
const data = {
  email: 'snehdholia@gmail.com',
  password: 'helo',
};
var token = jwt.sign(data, 'shhhhh');

var decoded = jwt.verify(token, 'shhhhh');
console.log(decoded);
