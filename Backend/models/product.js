
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  description:{
    type:String,
    required:true
  },
  name:{
    type:String,
    required:true
  },
  productImage:{
    type:[String],
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  stock:{
    type: Number,
    default:0,
    required:true
  },
  category:{
    type:String,
    required:true
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"signUP",
    required:true
  }

},{timestamp: true})

const Product = mongoose.model("Product",productSchema)
module.exports = Product