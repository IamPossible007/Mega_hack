const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SignUp',
    required: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
