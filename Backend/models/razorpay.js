const Razorpay = require('razorpay');
const mongoose = require('mongoose');
const razorpay = new Razorpay({
  key_id: 'rzp_test_U51O74GxiYfNMQ',
  key_secret: 'rzp_test_U51O74GxiYfNMQ'
});
module.exports =razorpay;