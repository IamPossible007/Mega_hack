import React, { useContext, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import { Context } from "../../utils/context";
import axios from 'axios';
import "./Cart.scss";

const Cart = () => {
    const [user, setUser] = useState(null);
    const [jk, setjk] = useState('');
    const [dat, setDat] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0); // Initialize totalPrice state

    useEffect(() => {
        const fetchData = async () => {
            const storedJWT = localStorage.getItem('user');
            if (storedJWT) {
                const jwtToken = JSON.parse(storedJWT)?.token;
                console.log(jwtToken);

                try {
                    const ownerResponse = await axios.get(`http://192.168.188.224:4002/api/owner/${jwtToken}`);
                    console.log('Owner:', ownerResponse.data);
                    setjk(ownerResponse.data);

                    const cartDetailsResponse = await axios.get(`http://192.168.188.224:4002/cart-details/${ownerResponse.data}`);
                    console.log('Cart Details:', cartDetailsResponse.data);
                    setDat(cartDetailsResponse.data);

                    // Calculate total price
                    let totalPrice = 0;
                    cartDetailsResponse.data.forEach(item => {
                        totalPrice += item.products.price;
                    });
                    setTotalPrice(totalPrice);

                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                window.location.href = '/login';
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        }
    }, []);

    const { setShowCart } = useContext(Context);

    return (
        <div className="cart-panel">
            <div className="opac-layer" onClick={() => setShowCart(false)}></div>
            <div className="cart-content">
                <div className="cart-header">
                    <span className="heading">Shopping Cart</span>
                    <span className="close-btn" onClick={() => setShowCart(false)}>
                        <MdClose className="close-btn" />
                        <span className="text">close</span>
                    </span>
                </div>

                {!dat.length ? (
                    <div className="empty-cart">
                        <BsCartX />
                        <span>No products in the cart.</span>
                        <button className="return-cta" onClick={() => {}}>RETURN TO SHOP</button>
                    </div>
                ) : (
                    <div>
                        {dat.map((item, index) => (
                            <div key={index} className="cart-item-row">
                                <div className="item-details">
                                    <div className="ignore">
                                        <p className="item-name">Name: {item.products.name}</p>
                                        <p className="item-price">Price: {item.products.price}</p>
                                        <p>Stock: {item.products.stock}</p>
                                        <p>Category: {item.products.category}</p>
                                        <p>Rating: {item.products.rating}</p>
                                    </div>
                                    <img src={item.products.productImage[0]} alt="" className="item-image" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {dat && <p> ,Total Price:{totalPrice}</p>}
                {dat && <button className="Buy">Buy Now</button>}
            </div>
        </div>
    );
};

export default Cart;
