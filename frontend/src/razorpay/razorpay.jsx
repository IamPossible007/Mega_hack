import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Razorpay from 'razorpay';

const CheckoutPage = ({ totalPrice }) => {
  const [orderId, setOrderId] = useState(null);
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('INR');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.post('/create-order', {
          amount: totalPrice * 100, // Convert amount to paise
        });

        setOrderId(response.data.id);
        setAmount(response.data.amount);
        setCurrency(response.data.currency);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [totalPrice]);

  const options = {
    key: 'rzp_test_J0P8GmaY8N10Nh', // Enter your Razorpay key
    amount: amount, // Amount in paise
    currency: currency,
    name: 'Your Business Name',
    description: 'Test Transaction',
    order_id: orderId, // Order ID from the backend
    handler: function (response) {
      // Handle successful payment response
      console.log(response);
      // You can perform further actions here, like updating the order status in your database
    },
    prefill: {
      name: 'John Doe', // Prefill customer name
      email: 'johndoe@example.com', // Prefill customer email
      contact: '9999999999', // Prefill customer contact number
    },
    notes: {
      address: 'Razorpay Corporate Office',
    },
    theme: {
      color: '#3399cc',
    },
  };

  const openPaymentModal = () => {
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div>
      {orderId && amount && currency && (
        <button onClick={openPaymentModal}>Pay Now</button>
      )}
    </div>
  );
};

export default CheckoutPage;