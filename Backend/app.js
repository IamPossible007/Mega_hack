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
const Cart = require('./models/cart');
const Purchase =require('./models/purchase');
const Razorpay = require('razorpay');
const razorpay = new Razorpay({
  key_id: 'rzp_test_J0P8GmaY8N10Nh',
  key_secret: 'zhrnh6hj24ktdmgH9KtFXKVg'
});

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

// Define a route to get all products
app.get('/products', async (req, res) => {
  try {
    // Retrieve all products from the database
    const products = await Product.find();

    // If there are no products, return an empty array
    if (!products || products.length === 0) {
      return res.status(404).json({ error: 'No products found' });
    }

    // If products are found, return them
    res.status(200).json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
});

// Define a route to add a product to the user's cart
// Define a route to add a product to the user's cart
// Define a route to add a product to the user's cart
app.post('/cart/add', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Check if the user exists
    const user = await SignUp.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Create a new cart item and add the product with the specified quantity to it
    const cartItem = await Cart.create({
      user: userId,
      products: [{ productId, quantity: quantity || 1 }] // Default quantity to 1 if not provided
    });

    res.status(200).json({ success: true, message: 'Product added to cart', cartItem });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ error: 'Error adding product to cart' });
  }
});


// Import the Purchase schema from purchase.js


// Create the Purchase model using the purchaseSchema


// Route to handle buying items
// Route to handle buying items
app.post('/cart/buy-now', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Create a new purchase record
    const purchase = await Purchase.create({
      userId,
      productId,
      quantity: quantity || 1 // If quantity is not provided, default to 1
    });

    // Remove the purchased item from the cart
    await Cart.findOneAndDelete({ userId, productId });

    // Update the product stock quantity
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if the product stock is sufficient
    if (product.stock < quantity) {
      return res.status(400).json({ error: 'Insufficient stock for this quantity' });
    }

    // Update the product stock quantity and save changes
    product.stock -= quantity;
    await product.save();

    res.status(200).json({ success: true, message: 'Item bought successfully', purchase });
  } catch (error) {
    console.error('Error buying item:', error);
    res.status(500).json({ error: 'Error buying item' });
  }
});

app.post('/create-order', async (req, res) => {
  const amount = req.body.amount; // Amount in paise
  const currency = 'INR';
  const receipt = 'receipt_id_' + Math.floor(Math.random() * 1000);

  try {
    const order = await razorpay.orders.create({
      amount: amount,
      currency: currency,
      receipt: receipt,
      payment_capture: 1
    });

    res.status(200).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Error creating order', detail: error.message });
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
