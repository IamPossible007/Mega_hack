const express = require('express');
const mongoose = require('mongoose');
const Login = require('./models/login');
const SignUp = require('./models/signUp');
const bcrypt = require('bcrypt');
const app = express();
var jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const multer = require('multer');
const upload = require('./models/multer')
const uploadOnCloudinary = require('./models/cloudinary.js')
const Product = require('./models/product.js')
// app.use(upload.array('productImages', 10));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
;
app.use(cookieParser());

const salt = 'rajukimatakaharan';

// app.use(express.static('./public'));
app.use(cors());
app.use(express.json());
async function connection() {
  await mongoose.connect('mongodb+srv://itsme:itsme@cluster0.e5ncjgx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log(`helo`);
  });
}

connection();

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


// app.post('/upload-book', upload.single('productImage'), async (req, res) => {
//   const { description, name, price, stock, category, owner } = req.body;

//   // Check if product image was uploaded
//   if (!req.file) {
//     return res.status(400).json({ error: 'Product image is required' });
//   }

//   try {
//     const productImageLocalPath = req.file.path;
//     const productImage = await uploadOnCloudinary(productImageLocalPath);

//     // Check if product image upload was successful
//     if (!productImage || !productImage.url) {
//       return res.status(500).json({ error: 'Error uploading product image' });
//     }

//     // Create a new product with the uploaded image
//     const newProduct = await Product.create({
//       description,
//       name,
//       productImage: productImage.url,
//       price,
//       stock,
//       category,
//       owner
//     });

//     res.status(201).json({ success: true, message: 'Product created successfully', product: newProduct });
//   } catch (error) {
//     console.error('Error uploading product image:', error);
//     res.status(500).json({ error: 'Error uploading product image' });
//   }
// });

app.post('/upload-book', upload.array('productImage', 10), async (req, res) => {
  const { description, name, price, stock, category, owner } = req.body;

  // Check if product images were uploaded
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'Product images are required' });
  }

  try {
    const productImageUrls = await Promise.all(
      req.files.map(async (file) => {
        const productImageLocalPath = file.path;
        const productImage = await uploadOnCloudinary(productImageLocalPath);
        return productImage.url;
      })
    );

    // Create a new product with the uploaded images
    const newProduct = await Product.create({
      description,
      name,
      productImage: productImageUrls, // Assuming productImage is an array field in the schema
      price,
      stock,
      category,
      owner
    });

    res.status(201).json({ success: true, message: 'Product created successfully', product: newProduct });
  } catch (error) {
    console.error('Error uploading product images:', error);
    res.status(500).json({ error: 'Error uploading product images' });
  }
});


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


app.listen(4002, () => {
  console.log(`Servr Stared on Port 3000`);
});
