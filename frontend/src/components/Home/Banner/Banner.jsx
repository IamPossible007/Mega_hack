
import React from "react";

import "./Banner.scss";
import BannerImg from "../../../assets/book-img.png";
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className="hero-banner">
            <div className="content">
                <div className="text-content">
                    <h1>Reading</h1>
                    <p>
                        
Books are gateways to new worlds, offering knowledge, inspiration, and escape. They challenge our thinking, broaden horizons, and ignite imagination, making them invaluable companions in life's journey.
                    </p>
                    
                    <div className="ctas">
                        <div className="banner-cta">Add Book</div>
                        <div className="banner-cta v2">Shop Now</div>
                    </div>
                </div>
                <img className="banner-img" src={BannerImg} />
            </div>
        </div>
    );
};

export default Banner;
