const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SignUp',
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  }
});
const Purchase = mongoose.model('Purchase', purchaseSchema);
module.exports = Purchase;