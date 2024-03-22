
import React, { useEffect, useState } from "react";
import "./Home.scss";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import Products from "../Products/Products";
import { fetchDataFromApi } from "../../utils/api";
import AppContext, { Context } from "../../utils/context";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Newsletter from "../Footer/Newsletter/Newsletter";
import axios from 'axios';

const Home = () => {


  
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);


    useEffect(() => {
        const storedJWT = localStorage.getItem('user');
        if (user) {
          const jwtToken = JSON.parse(storedJWT)?.token;
          console.log(jwtToken);
    
          // const url = http://localhost:4002/api/${jwtToken};
    
          axios.get(`http://192.168.188.224:4002/api/${jwtToken}`)
            .then((response) => {
              // Handle successful response
    
              setUserData(JSON.stringify(response.data)); // Assuming the server responds with JSON data
            })
            .catch((error) => {
              // Handle error
              console.error('Error:', error);
            });
        }
       if(!storedJWT){
        window.location.href = '/login';
       }
      
      }, []);
      useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setUser(foundUser);
        }
      }, []);


    return (
        <div>
            <AppContext>
<Header/>
            <Banner />
            <div className="main-content">
                <div className="layout">
                  
                </div>
            </div>
     
            <Footer/> 
</AppContext>
        </div>
    );
};

export default Home;
